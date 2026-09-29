#!/usr/bin/env python3
"""BGM check and loop-point candidates - MEASUREMENT ONLY, dev tool (User 2026-09-29, v3.0 sound).

Loops keep the whole track (User 2026-09-29): no section is excerpted from the middle.
  - Start stays at the first sound unless the track opens with a clearly different short intro
    (quieter than the core by 6 dB AND a different timbre, ending within 15 s); then Start is the
    first onset of the core entry.
  - End stays near the original end: the final hit (the last strong onset before the closing decay,
    where the ending chord would start), with two comparison candidates - the 4-beat group boundary
    from Start, and where the core state last holds when a coda sits before the final hit. End never
    moves earlier than duration - 25 s.
  - Cuts sit 5 ms before an onset on a beat grid refined from Start; the seam needs only a short fade.
Per candidate it reports the trims, % kept, the reasons and seam metrics, and writes a seam preview
MP3 (the 4 s before End, then the 4 s after Start). Similarity is only a supporting measure.
Nothing is written into the game; the source files stay untouched.

  pip install imageio-ffmpeg numpy
  python3 tools/bgm-loop.py [--out DIR] [--json FILE] [--start NAME=SEC ...] [--search-end NAME ...] [FILES...]
"""
import argparse, glob, json, os, subprocess, sys
import numpy as np
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
SR_A = 22050          # analysis rate
HOP = 512             # ~23 ms
NFFT = 2048


def decode(path, sr, ch):
    out = subprocess.run([FF, '-v', 'error', '-i', path, '-f', 'f32le', '-ac', str(ch), '-ar', str(sr), '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(out, dtype='<f4')
    return a.reshape(-1, ch) if ch > 1 else a


def loudness(path):
    r = subprocess.run([FF, '-hide_banner', '-i', path, '-af', 'ebur128=framelog=quiet', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    i = [l for l in r.splitlines() if l.strip().startswith('I:')]
    lra = [l for l in r.splitlines() if l.strip().startswith('LRA:')]
    return float(i[-1].split()[1]) if i else None, float(lra[-1].split()[1]) if lra else None


def stft_mag(x):
    win = np.hanning(NFFT).astype(np.float32)
    n = 1 + (len(x) - NFFT) // HOP
    idx = np.arange(NFFT)[None, :] + HOP * np.arange(n)[:, None]
    return np.abs(np.fft.rfft(x[idx] * win, axis=1)).astype(np.float32)   # frames x bins


def features(mag):
    freqs = np.fft.rfftfreq(NFFT, 1 / SR_A)
    # chroma
    valid = (freqs > 55) & (freqs < 5000)
    pc = np.round(12 * np.log2(freqs[valid] / 440.0) + 69).astype(int) % 12
    p = mag[:, valid] ** 2
    chroma = np.zeros((mag.shape[0], 12), np.float32)
    for k in range(12):
        chroma[:, k] = p[:, pc == k].sum(1)
    chroma /= chroma.sum(1, keepdims=True) + 1e-9
    # log band energies (16 log-spaced bands)
    edges = np.geomspace(40, 10000, 17)
    bands = np.stack([np.log1p(mag[:, (freqs >= edges[i]) & (freqs < edges[i + 1])].sum(1)) for i in range(16)], 1)
    return chroma, bands


def tempo(mag):
    flux = np.maximum(0, np.diff(np.log1p(mag), axis=0)).sum(1)
    flux = (flux - flux.mean()) / (flux.std() + 1e-9)
    fps = SR_A / HOP
    ac = np.correlate(flux, flux, 'full')[len(flux) - 1:]
    lags = np.arange(len(ac))
    bpm = 60 * fps / np.maximum(lags, 1)
    ok = (bpm >= 60) & (bpm <= 180)
    # weight toward ~100 BPM to settle octave choice
    w = ac * ok * np.exp(-0.5 * (np.log2(np.maximum(bpm, 1) / 100) / 1.0) ** 2)
    lag = int(np.argmax(w))
    return 60 * fps / lag, lag / fps


KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
MAJ = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MIN = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])


def key(chroma):
    c = chroma.mean(0)
    best = max(((np.corrcoef(c, np.roll(prof, k))[0, 1], KEYS[k] + (' major' if m else ' minor'))
                for k in range(12) for m, prof in ((1, MAJ), (0, MIN))))
    return best[1], round(float(best[0]), 2)


def envelope(x, sr, win=0.5):
    n = int(sr * win)
    m = len(x) // n
    return 20 * np.log10(np.sqrt((x[:m * n].reshape(m, n) ** 2).mean(1)) + 1e-9), win


BLK = 0.5             # level / similarity block, seconds
S_MAX = 15.0          # Start never moves past this (User 2026-09-29)
E_WIN = 25.0          # End never moves earlier than duration - this


def blocks(F, env, fps):
    # 0.5 s blocks: timbre / harmony similarity to the core profile (the middle 70 % of the track)
    k = int(BLK * fps)
    m = min(len(F) // k, len(env))
    B = F[:m * k].reshape(m, k, -1).mean(1)
    B /= np.linalg.norm(B, axis=1, keepdims=True) + 1e-9
    lo, hi = int(m * .15), int(m * .85)
    core = B[lo:hi].mean(0)
    core /= np.linalg.norm(core)
    sim = B @ core
    lvl = env[:m]
    return sim, lvl, float(np.percentile(sim[lo:hi], 5)), float(np.median(lvl[lo:hi]))


def onset_env(mag):
    o = np.maximum(0, np.diff(np.log1p(mag), axis=0)).sum(1)
    o = np.concatenate([[0], o])
    return o / (np.percentile(o, 99) + 1e-9)


def onset_near(o, fps, t, before=0.25, after=0.5, strong=0.35):
    # first clear onset (local flux peak above `strong`) in [t - before, t + after]
    a, b = max(1, int((t - before) * fps)), min(len(o) - 1, int((t + after) * fps))
    for i in range(a, b):
        if o[i] >= strong and o[i] >= o[i - 1] and o[i] >= o[i + 1]:
            return i / fps, float(o[i])
    return None, 0.0


def hires(x44, t, rad=0.03):
    # sharpen an onset to ~2 ms: steepest rise of the 2 ms RMS envelope within +-rad, minus 5 ms pre-roll
    sr, h = 44100, 88
    a = max(0, int((t - rad - 0.01) * sr))
    seg = x44[a:int((t + rad) * sr)]
    n = len(seg) // h
    if n < 4:
        return t
    e = np.sqrt((seg[:n * h].reshape(n, h) ** 2).mean(1) + 1e-12)
    d = np.diff(20 * np.log10(e))
    return max(0.0, (a + (int(np.argmax(d)) + 1) * h) / sr - 0.005)


def beat_period(o, fps, beat0, s):
    # refine the beat period to ~0.01 %: comb sum of the onset envelope on a grid anchored at S
    om = np.maximum(np.maximum(o, np.roll(o, 1)), np.roll(o, -1))
    idx = np.arange(len(om))
    best = (-1, beat0)
    for r in np.arange(0.97, 1.03, 0.0001):
        p = beat0 * r * fps
        k = np.arange(-int(s * fps / p), int((len(om) - s * fps) / p))
        g = s * fps + k * p
        g = g[(g >= 0) & (g < len(om) - 1)]
        v = float(np.interp(g, idx, om).mean())
        if v > best[0]:
            best = (v, beat0 * r)
    return best[1], best[0]


def pick_start(sim, lvl, p5, M, o, fps, first):
    """0 s unless the track opens with a clearly different short intro: quieter than the core by 6 dB
    AND a different timbre (similarity under the core's 5th percentile), ending within S_MAX."""
    pw = 10 * np.log10(np.array([np.mean(10 ** (lvl[i:i + 8] / 10)) for i in range(len(lvl))]) + 1e-12)
    Mp = float(np.median(pw[int(len(pw) * .15):int(len(pw) * .85)]))
    f0 = int(first / BLK)
    if pw[f0] >= Mp - 6:
        return first, None, dict(kind='none', reason='첫 소리부터 core 음량(4초 평균 %.0f dB, core %.0f dB)이라 intro로 보지 않음 → 0초 유지' % (pw[f0], Mp))
    # the quiet opening ends where the forward 4 s power reaches the core, at the first block that is itself loud
    j = next((i for i in range(f0, len(pw)) if pw[i] >= Mp - 6), None)
    k = next((i for i in range(j, len(lvl)) if lvl[i] >= M - 6), j)
    intro_end = k * BLK
    isim = float(sim[f0:k].mean())
    gap = max((len(r) for r in ''.join('1' if v < M - 20 else '0' for v in lvl[f0:k]).split('0')), default=0) * BLK
    desc = '앞 %.1f초가 core보다 조용함(4초 평균 %.0f dB, core %.0f dB), 음색·화성 유사도 %.2f(core 하위 5%% %.2f)' % (
        intro_end, pw[f0], Mp, isim, p5)
    if gap >= 1.5:
        desc += ', 그 안에 %.1f초 동안 core −20 dB 아래로 잦아드는 구간' % gap
    if isim >= p5:
        return first, None, dict(kind='none', reason=desc + ' → 음색은 core와 같아 intro로 보지 않음 → 0초 유지')
    if intro_end > S_MAX:
        return first, None, dict(kind='long', reason=desc + ' → %.0f초 넘게 이어지는 곡 구성 구간이라 자르지 않음(Start는 %.0f초 이내 규칙) → 0초 유지' % (S_MAX, S_MAX))
    t, st = onset_near(o, fps, intro_end)
    s = t if t is not None else intro_end
    return s, first, dict(kind='intro', intro_end=intro_end, reason=desc + ' → 이질적 intro로 판정, core 첫 진입 온셋을 Start로')


def pick_ends(sim, lvl, p5, M, o, fps, dur, s, beat, x44):
    """End candidates, latest first, all within the last E_WIN seconds:
    (a) the final hit - the last strong onset before the closing decay, i.e. where the ending chord
        would start; the loop jumps to S there instead (on the beat grid from S, else the beat before);
    (b) the 4-beat grid from S at or before (a), when (a) is not a whole number of 4-beat groups;
    (c) where the core state last holds, when a coda / ending gesture sits between it and (a)."""
    last = next(i for i in range(len(lvl) - 1, -1, -1) if lvl[i] >= M - 20)
    # final hit: last strong onset at a level still within 20 dB of the core
    fh = None
    for i in range(min(len(o) - 2, int((last + 1) * BLK * fps)), int((dur - E_WIN) * fps), -1):
        if o[i] >= 0.35 and o[i] >= o[i - 1] and o[i] >= o[i + 1] and lvl[min(len(lvl) - 1, int(i / fps / BLK))] >= M - 20:
            fh = i / fps
            break
    # last core block: 1 s level within 6 dB of the core and 2 s similarity at least the core's 5th percentile
    lc = None
    for i in range(last, int((dur - E_WIN) / BLK), -1):
        if 10 * np.log10(np.mean(10 ** (lvl[i - 1:i + 1] / 10))) >= M - 6 and sim[i - 3:i + 1].mean() >= p5:
            lc = (i + 1) * BLK
            break
    out = []

    def add(nb, why):
        e = s + nb * beat
        ot, st = onset_near(o, fps, e, before=0.06, after=0.06, strong=0.2)
        e2 = hires(x44, ot) if ot is not None else e
        if e2 < dur - E_WIN or any(abs(e2 - c['end']) < beat / 2 for c in out):
            return
        out.append(dict(end=round(e2, 3), beats=int(nb), grid_end=round(e, 3), onset_at_end=ot is not None,
                        onset_err_ms=round((ot - e) * 1000) if ot is not None else None, reason=why))
    if fh is not None:
        fb = (fh - s) / beat
        off = fb - round(fb)
        if abs(off) <= 0.15:
            add(round(fb), '마지막 강한 온셋(마무리 타격) %.2f초가 S에서 정확히 %d박 뒤(오차 %+.2f박) → 마무리 타격 자리에서 S로 돌아감, 그 뒤 %.1f초(마무리 화음·잔향) 제외' % (fh, round(fb), off, dur - fh))
        else:
            add(np.floor(fb), '마지막 강한 온셋(마무리 타격) %.2f초가 S 기준 박 격자에서 %+.2f박 어긋남(당김 또는 템포 배수 오판 가능) → 그 앞 박 격자점, 그 뒤 %.1f초 제외' % (fh, off, dur - fh))
        add(4 * np.floor((fb + 0.15) / 4), '위 (마무리 타격) 자리를 S 기준 4박 묶음 경계로 내린 것(마디 위상 보정용 비교안)')
    if lc is not None and (fh is None or fh - lc > 2 * beat):
        add(4 * np.floor(((lc - s) / beat + 0.15) / 4), 'core 상태(1초 음량 core −6 dB 이내 · 2초 유사도 하위 5%% 이상)가 마지막으로 이어지는 %.1f초 → 그 앞 4박 경계, 그 뒤 %.1f초(코다·마무리 제스처) 제외' % (lc, dur - lc))
    return out, dict(final_hit=fh, last_core=lc, last_sound=(last + 1) * BLK)


def search_ends(F, fps, x44, o, s, beat, dur, fh, M, top=3):
    """End re-search inside the last E_WIN seconds (User 2026-09-29, for joins that sound cut off,
    off-harmony or like a sudden mood change): every beat-grid point from S up to the final hit is
    scored by how much the original music right after E resembles the music right after S (harmony +
    timbre), how loud the sound is that the cut stops, and the level step. Start stays as it is."""
    sr = 44100

    def vec(a, b):
        v = F[max(0, int(a * fps)):max(1, int(b * fps))].mean(0)
        return v / (np.linalg.norm(v) + 1e-9)

    def db(a, b):
        seg = x44[max(0, int(a * sr)):int(b * sr)]
        return 20 * np.log10(np.sqrt((seg ** 2).mean()) + 1e-9) if len(seg) else -120.0
    after_s, before_s = vec(s, s + 2), (vec(s - 2, s) if s >= 2 else None)
    lvl_s = db(s, s + 0.5)
    last = fh if fh is not None else dur - 3
    out = []
    for n in range(int(np.ceil((dur - E_WIN - s) / beat)), int(np.floor((last - s) / beat + 0.15)) + 1):
        e = s + n * beat
        cont = float(vec(e, e + 2) @ after_s)
        pre = float(vec(e - 2, e) @ before_s) if before_s is not None else 0.0
        ring = db(e - 0.05, e)
        step = db(e, e + 0.5) - lvl_s
        ot, _ = onset_near(o, fps, e, before=0.06, after=0.06, strong=0.2)
        cut = max(0.0, ring - (M - 10)) * (0.5 if ot is not None else 1.0)
        score = cont + 0.3 * pre - 0.03 * abs(step) - 0.02 * cut + (0.05 if n % 4 == 0 else 0)
        out.append((score, n, e, ot, cont, pre, ring, step))
    out.sort(reverse=True)
    picked = []
    for c in out:
        if all(abs(c[1] - q[1]) >= 2 for q in picked):
            picked.append(c)
        if len(picked) == top:
            break
    res = []
    for score, n, e, ot, cont, pre, ring, step in picked:
        e2 = hires(x44, ot) if ot is not None else e
        res.append(dict(end=round(e2, 3), beats=int(n), grid_end=round(e, 3), onset_at_end=ot is not None,
                        onset_err_ms=round((ot - e) * 1000) if ot is not None else None, score=round(score, 3),
                        reason='끝 구간 재탐색: E 뒤 원곡 2초가 S 뒤 2초와 닮은 정도 %.2f%s, 끊기는 소리 %.0f dB(core %.0f dB)%s, E 뒤 원곡 대비 S 음량 차 %+.1f dB, %d박(나머지 %d) → 점수 %.2f' % (
                            cont, ', E 앞 2초와 S 앞 2초 %.2f' % pre if before_s is not None else '', ring, M,
                            ', E에 온셋 있음' if ot is not None else '', -step, n, n % 4, score)))
    return res


def seam_metrics(stereo, sr, s, e, M):
    def db(a):
        return 20 * np.log10(np.sqrt((a ** 2).mean()) + 1e-9)
    m = stereo.mean(1)
    pre, post = m[int((e - 0.25) * sr):int(e * sr)], m[int(s * sr):int((s + 0.25) * sr)]
    d = db(pre) - db(post)
    # harmony: 2 s chroma before E vs after S
    def chroma(a):
        mag = stft_mag(a[::2].astype(np.float32))
        return features(mag)[0].mean(0)
    ca, cb = chroma(m[int((e - 2) * sr):int(e * sr)]), chroma(m[int(s * sr):int((s + 2) * sr)])
    hc = float(ca @ cb / (np.linalg.norm(ca) * np.linalg.norm(cb) + 1e-9))
    return dict(pre_db=round(db(pre), 1), post_db=round(db(post), 1), level_diff_db=round(d, 1), harmony=round(hc, 2))


def seam(stereo, sr, s, e, path, pre=4.0, post=4.0, xf=0.01):
    # E-4 s .. E, then S .. S+4 s. S gets a 5 ms fade-in (S already sits 5 ms before its onset, so the
    # attack is intact); the original continuation after E fades out under it over xf.
    si, ei, n, fi = int(s * sr), int(e * sr), int(xf * sr), int(0.005 * sr)
    head = stereo[max(0, ei - int(pre * sr)):ei].copy()
    cont = stereo[ei:ei + n] * np.cos(np.linspace(0, np.pi / 2, n))[:, None]
    tail = stereo[si:si + int(post * sr)].copy()
    tail[:fi] *= np.sin(np.linspace(0, np.pi / 2, fi))[:, None]
    tail[:n] += cont
    out = np.concatenate([head, tail]).astype('<f4')
    subprocess.run([FF, '-v', 'error', '-y', '-f', 'f32le', '-ac', '2', '-ar', str(sr), '-i', '-',
                    '-b:a', '192k', path], input=out.tobytes(), check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='*')
    ap.add_argument('--out', default='/tmp/guild24-bgm-seams')
    ap.add_argument('--json')
    ap.add_argument('--search-end', action='append', default=[], metavar='NAME',
                    help='also re-search End over the last 25 s on the beat grid (top 3 per Start)')
    ap.add_argument('--start', action='append', default=[], metavar='NAME=SEC',
                    help='extra Start to compare, e.g. a listener\'s suggestion; snapped to the onset at SEC -0.1/+0.3 s')
    a = ap.parse_args()
    manual = {}
    for m in a.start:
        n, t = m.rsplit('=', 1)
        manual.setdefault(n, []).append(float(t))
    files = a.files or sorted(glob.glob('assets-src/bgm/*.mp3'))
    os.makedirs(a.out, exist_ok=True)
    fps = SR_A / HOP
    rows = []
    for f in files:
        name = os.path.splitext(os.path.basename(f))[0]
        mono = decode(f, SR_A, 1)
        dur = len(mono) / SR_A
        mag = stft_mag(mono)
        chroma, bands = features(mag)
        bpm0, beat0 = tempo(mag)
        env, _ = envelope(mono, SR_A, BLK)
        F = np.concatenate([chroma * 3, (bands - bands.mean(0)) / (bands.std(0) + 1e-9) * 0.25], 1)
        sim, lvl, p5, M = blocks(F, env, fps)
        o = onset_env(mag)
        k, kc = key(chroma)
        lufs, lra = loudness(f)
        stereo = decode(f, 44100, 2)
        x44 = stereo.mean(1)
        first_t, _ = onset_near(o, fps, next(i for i, v in enumerate(lvl) if v > -50) * BLK, before=0.5, after=1.0, strong=0.1)
        first = hires(x44, first_t or 0.0)
        starts = []
        s, alt, sinfo = pick_start(sim, lvl, p5, M, o, fps, first)
        s = hires(x44, s) if sinfo['kind'] == 'intro' else first
        starts.append((s, sinfo['reason'] + ' (%.3f초)' % s, True, False))
        if alt is not None:
            starts.append((first, '비교용: intro까지 모두 보존(첫 소리 %.2f초), End는 첫 후보만' % first, False, False))
        for t in manual.get(name, []):
            ot, _ = onset_near(o, fps, t, before=0.1, after=0.3, strong=0.15)
            if ot is None:
                print('skip manual start %s=%.2f: no onset near it' % (name, t), file=sys.stderr)
                continue
            ms = hires(x44, ot)
            if ms > S_MAX:
                print('skip manual start %s=%.2f: past %.0f s' % (name, ms, S_MAX), file=sys.stderr)
                continue
            i = int(ms / BLK)
            pre = 10 * np.log10(np.mean(10 ** (lvl[:i] / 10))) if i else float('nan')
            starts.append((ms, '제안 Start: %.2f초 부근 → 온셋 %.3f초. 그 앞 0~%.1f초는 평균 %.0f dB(core %.0f dB), 음색·화성 유사도 %.2f(core 하위 5%% %.2f)' % (
                t, ms, ms, pre, M, float(sim[:i].mean()) if i else float('nan'), p5), True, True))
        cands = []
        for si, (s, sr_, all_ends, man) in enumerate(starts):
            # a suggested Start may sit on a weak onset: keep the beat period measured from the automatic Start
            if not man:
                beat, comb = beat_period(o, fps, beat0, s)
                if si == 0:
                    beat1 = beat
            else:
                beat = beat1
            ends, einfo = pick_ends(sim, lvl, p5, M, o, fps, dur, s, beat, x44)
            for ei, e in enumerate(ends if all_ends else ends[:1]):
                sm = seam_metrics(stereo, 44100, s, e['end'], M)
                # a cut just before an onset only needs the pre-roll faded; a cut inside a held sound, a little more
                sm['xfade_ms'] = 10 if e['onset_at_end'] else 60
                tag = 'S%dE%d' % (si + 1, ei + 1)
                p = os.path.join(a.out, '%s-%s.mp3' % (name, tag))
                seam(stereo, 44100, s, e['end'], p, xf=sm['xfade_ms'] / 1000)
                cands.append(dict(id=tag, start=round(s, 3), start_reason=sr_, end=e['end'], end_reason=e['reason'],
                                  beats=e['beats'], beats_mod4=e['beats'] % 4, onset_at_end=bool(e['onset_at_end']),
                                  onset_err_ms=e['onset_err_ms'], length=round(e['end'] - s, 2),
                                  kept_pct=round(100 * (e['end'] - s) / dur, 1), trim_start=round(s, 2),
                                  trim_end=round(dur - e['end'], 2), beat=round(beat, 4), bpm=round(60 / beat, 2),
                                  ok_start=bool(s <= S_MAX), ok_end=bool(e['end'] >= dur - E_WIN), seam=p, **sm))
            if name in a.search_end and all_ends:
                found = [e for e in search_ends(F, fps, x44, o, s, beat, dur, einfo['final_hit'], M)
                         if not any(c['start'] == round(s, 3) and abs(c['end'] - e['end']) < beat / 2 for c in cands)]
                for ri, e in enumerate(found):
                    sm = seam_metrics(stereo, 44100, s, e['end'], M)
                    sm['xfade_ms'] = 10 if e['onset_at_end'] else 60
                    tag = 'S%dR%d' % (si + 1, ri + 1)
                    p = os.path.join(a.out, '%s-%s.mp3' % (name, tag))
                    seam(stereo, 44100, s, e['end'], p, xf=sm['xfade_ms'] / 1000)
                    cands.append(dict(id=tag, start=round(s, 3), start_reason=sr_, end=e['end'], end_reason=e['reason'],
                                      beats=e['beats'], beats_mod4=e['beats'] % 4, onset_at_end=bool(e['onset_at_end']),
                                      onset_err_ms=e['onset_err_ms'], length=round(e['end'] - s, 2),
                                      kept_pct=round(100 * (e['end'] - s) / dur, 1), trim_start=round(s, 2),
                                      trim_end=round(dur - e['end'], 2), beat=round(beat, 4), bpm=round(60 / beat, 2),
                                      ok_start=bool(s <= S_MAX), ok_end=bool(e['end'] >= dur - E_WIN), seam=p, **sm))
        rows.append(dict(file=f, name=name, duration=round(dur, 2), bpm_est=round(bpm0, 1), key=k, key_fit=kc,
                         lufs=lufs, lra=lra, core_level=round(M, 1), core_sim_p5=round(p5, 2), end_info=einfo, candidates=cands))
        print(name, json.dumps(rows[-1], ensure_ascii=False, default=float))
    if a.json:
        json.dump(rows, open(a.json, 'w'), ensure_ascii=False, indent=1, default=float)


if __name__ == '__main__':
    main()
