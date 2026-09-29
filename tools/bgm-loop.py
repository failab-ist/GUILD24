#!/usr/bin/env python3
"""BGM check and loop-point search - MEASUREMENT ONLY, dev tool (User 2026-09-29, v3.0 sound).

For each source MP3 (assets-src/bgm/) it reports length, leading / trailing silence, the intro and
outro (fade) spans, a tempo estimate, a key estimate and loudness, then searches loop candidates:
a start S after the intro and an end E before the outro where the music around E sounds like the
music around S (chroma + band-energy similarity, same loudness), E - S a whole number of beats,
then refined to the sample by waveform cross-correlation. For the top candidate of each track it
writes a seam preview MP3 (the 4 s before E followed by the 4 s after S) so a human can listen to
the join. Nothing is written into the game; the files stay untouched.

  pip install imageio-ffmpeg numpy
  python3 tools/bgm-loop.py [--out DIR] [--md reports/bgm-loops.md] [FILES...]
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


def spans(env, win):
    # silence: below -55 dBFS at the ends; intro / outro: until within 4 dB of the track's median level
    med = np.median(env)
    lead = next((i for i, v in enumerate(env) if v > -55), 0) * win
    tail = next((i for i, v in enumerate(env[::-1]) if v > -55), 0) * win
    # intro / outro: the first point where the NEXT 8 s average reaches within 4 dB of the track's
    # upper-quartile level (a loud first hit over a quiet build does not end the intro), and the same
    # from the end backwards
    ref, k = np.percentile(env, 75), max(1, int(8 / win))
    ahead = [env[i:i + k].mean() for i in range(len(env))]
    behind = [env[max(0, len(env) - i - k):len(env) - i].mean() for i in range(len(env))]
    intro = next((i for i, v in enumerate(ahead) if v > ref - 4), 0) * win
    outro = next((i for i, v in enumerate(behind) if v > ref - 4), 0) * win
    return lead, tail, intro, outro, med


def search(chroma, bands, rms_db, beat_s, dur, intro, outro, top=3):
    fps = SR_A / HOP
    F = np.concatenate([chroma * 3, (bands - bands.mean(0)) / (bands.std(0) + 1e-9) * 0.25], 1)
    F /= np.linalg.norm(F, axis=1, keepdims=True) + 1e-9
    W = int(3 * fps)                      # compare 3 s on each side
    beat = beat_s * fps
    s_lo, s_hi = int((intro + 2) * fps), int(min(intro + 40, dur * 0.4) * fps)
    e_hi = int((dur - outro - 3) * fps)
    min_len = max(45.0, dur * 0.45) * fps
    cands = []
    for s in np.arange(s_lo, s_hi, beat / 2):
        s = int(round(s))
        if s - W < 0:
            continue
        A = F[s - W:s + W]
        nbeats = np.arange(int(min_len / beat), int((e_hi - s) / beat) + 1)
        for nb in nbeats:
            e = int(round(s + nb * beat))
            if e + W >= len(F) or e > e_hi:
                continue
            B = F[e - W:e + W]
            sim = float((A * B).sum(1).mean())
            lvl = abs(float(rms_db[s] - rms_db[e]))
            score = sim - 0.02 * lvl + 0.02 * (nb * beat_s) / dur   # prefer longer loops a little
            cands.append((score, sim, lvl, s / fps, e / fps, int(nb)))
    cands.sort(reverse=True)
    picked = []
    for c in cands:
        if all(abs(c[3] - p[3]) > 4 or abs(c[4] - p[4]) > 4 for p in picked):
            picked.append(c)
        if len(picked) == top:
            break
    return picked


def refine(full, sr, s, e, beat_s):
    # move E by up to half a beat so the waveform after E lines up with the waveform after S
    L = int(0.25 * sr)
    si = int(s * sr)
    a = full[si:si + L]
    best = (-1, int(e * sr))
    rad = int(beat_s / 2 * sr)
    ei0 = int(e * sr)
    for d in range(-rad, rad + 1, 8):
        b = full[ei0 + d:ei0 + d + L]
        if len(b) < L:
            continue
        c = float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))
        if c > best[0]:
            best = (c, ei0 + d)
    # then to the sample around that
    ei = best[1]
    for d in range(-8, 9):
        b = full[ei + d:ei + d + L]
        c = float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))
        if c > best[0]:
            best = (c, ei + d)
    return best[1] / sr, best[0]


def seam(stereo, sr, s, e, path, pre=4.0, post=4.0, xf=0.03):
    si, ei, n = int(s * sr), int(e * sr), int(xf * sr)
    head = stereo[max(0, ei - int(pre * sr)):ei + n].copy()
    tail = stereo[si:si + int(post * sr)].copy()
    t = np.linspace(0, np.pi / 2, n)[:, None]
    head[-n:] = head[-n:] * np.cos(t) + tail[:n] * np.sin(t)
    out = np.concatenate([head, tail[n:]]).astype('<f4')
    subprocess.run([FF, '-v', 'error', '-y', '-f', 'f32le', '-ac', '2', '-ar', str(sr), '-i', '-',
                    '-b:a', '192k', path], input=out.tobytes(), check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='*')
    ap.add_argument('--out', default='/tmp/guild24-bgm-seams')
    ap.add_argument('--md')
    ap.add_argument('--json')
    a = ap.parse_args()
    files = a.files or sorted(glob.glob('assets-src/bgm/*.mp3'))
    os.makedirs(a.out, exist_ok=True)
    rows = []
    for f in files:
        name = os.path.splitext(os.path.basename(f))[0]
        mono = decode(f, SR_A, 1)
        dur = len(mono) / SR_A
        mag = stft_mag(mono)
        chroma, bands = features(mag)
        bpm, beat_s = tempo(mag)
        env, w = envelope(mono, SR_A)
        lead, tail, intro, outro, med = spans(env, w)
        rms_db = np.repeat(env, int(w * SR_A / HOP) + 1)[:len(chroma)]
        rms_db = np.pad(rms_db, (0, max(0, len(chroma) - len(rms_db))), mode='edge')
        k, kc = key(chroma)
        lufs, lra = loudness(f)
        cands = search(chroma, bands, rms_db, beat_s, dur, intro, outro)
        full = decode(f, 44100, 1)
        stereo = decode(f, 44100, 2)
        out = []
        for i, (score, sim, lvl, s, e, nb) in enumerate(cands):
            e2, corr = refine(full, 44100, s, e, beat_s)
            item = dict(rank=i + 1, start=round(s, 3), end=round(e2, 3), length=round(e2 - s, 2), beats=nb,
                        similarity=round(sim, 3), level_diff_db=round(lvl, 1), wave_corr=round(corr, 3))
            if i == 0:
                p = os.path.join(a.out, name + '-seam1.mp3')
                seam(stereo, 44100, s, e2, p)
                item['seam'] = p
            out.append(item)
        rows.append(dict(file=f, name=name, duration=round(dur, 2), lead_silence=lead, tail_silence=tail,
                         intro=intro, outro=outro, bpm=round(bpm, 1), beat=round(beat_s, 3), key=k, key_fit=kc,
                         lufs=lufs, lra=lra, candidates=out))
        print(name, json.dumps(rows[-1], ensure_ascii=False))
    if a.json:
        json.dump(rows, open(a.json, 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
