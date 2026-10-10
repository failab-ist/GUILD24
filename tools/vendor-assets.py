#!/usr/bin/env python3
import sys
sys.stdout.reconfigure(encoding='utf-8')

"""Vendor Chunk F presentation assets into dist/ so the game stays static and local.

  Mulmaru (SIL OFL 1.1, (c) 2025 Mushsooni) -> the ATMOSPHERE face: signage, document titles,
    diegetic readouts. It publishes no npm package and its own repository carries no binaries,
    so the upstream WOFF2 pair is vendored into vendor/mulmaru/ and subset from there. The CDN
    that served them is an acquisition source only - nothing is fetched at runtime. Wanted Sans (SIL OFL 1.1, (c) Wanted Lab) -> the INFORMATION face:
    every value, effect line and control label. Both are subset to the glyphs this build can
    actually render; every player-visible string in GUILD24 is a literal in dist/**/*.js, so
    the union of those characters plus ASCII is a complete, safe subset.
  anime.js (MIT, (c) Julian Garnier) -> dist/ui/vendor/anime.umd.min.js
  uisfx `mechanical` (audio CC0-1.0) -> dist/ui/assets/audio/: the material half of the
    Decision SFX. UI_UX_v2.8 asks for mechanical / paper / register / fixture material, which a
    filtered oscillator can imply but cannot be, so those cues play a recorded object. Only the
    twelve files the engine names are copied; the package ships 1872.

Run: npm run assets. The output is committed; the game never fetches anything at runtime.
"""
import io,glob,os,shutil,sys
from fontTools import subset

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'vendor','mulmaru')
PRE=os.path.join(ROOT,'node_modules','wanted-sans','fonts','ttf')
OUT=os.path.join(ROOT,'dist','ui','fonts')
VEN=os.path.join(ROOT,'dist','ui','vendor')
# only the two faces the CSS actually asks for; Mulmaru ships a single weight by design
FACES=['Mulmaru','MulmaruMono']
# NPC / Boss portraits. GUILD24_NPC_PRODUCTION is the source of truth and is never written
# to; dist carries a derived copy only, exactly as the fonts do. WebP q90 with alpha, capped
# at the largest size the UI can actually paint at 2x device pixels — measured in a real
# browser, not guessed: the sale card payload tops out at 246 CSS px and never grows with the
# viewport, and a modal (where the Boss reveal lives) at 640. Art already under its cap is
# copied at native size; nothing is ever enlarged.
ART=os.path.join(ROOT,'GUILD24_NPC_PRODUCTION')
NPC=os.path.join(ROOT,'dist','ui','assets','npc')
CAP={'normal':492,'boss':1280}
QUALITY=90
# encoder effort: 6 costs 5.1s an image for 4% fewer bytes than 4, which costs 0.08s.
# 64x the build time is not worth 4% on a 12MB set, so the whole drop encodes in seconds.
METHOD=4
# UI_UX_v2.7 §TYPOGRAPHY: the INFORMATION face is Wanted Sans. Only the two weights the UI
# actually uses are vendored - the package ships seven, and the rest never reach dist.
UI_FACES=[('WantedSans-Regular','WantedSans'),('WantedSans-SemiBold','WantedSans-SemiBold')]

# UI_UX_v2.8 §AUDIO VOICE / §MATERIAL DECISION CUES. Source theme is `mechanical`: short, dry,
# readable transients, no sci-fi beeps and no arcade chiptune. The shipped name says the ROLE, not
# the vendor's UI vocabulary, so a later asset swap is a one-line change here and nothing in
# dist/ui/audio.js moves. mp3 only: it is the one container every current mobile browser decodes.
SFX=os.path.join(ROOT,'node_modules','uisfx')
AUD=os.path.join(ROOT,'dist','ui','assets','audio')
# (User 2026-09-29: `typing` -> tick and `hover` -> soft retired - masked by the music; those cues are synthesised now)
AUDIO=[('press','stamp'),        # ORDER confirmation: a low knock under the paper layer
       ('purchase','register'),  # SALE commit, shared by every price mode so none sounds correct
       ('cancel','refuse'),      # SALE refusal: restrained, not a failure buzzer
       ('lock','secure'),        # Store Support: securing a fixture, heavier than a purchase
       ('add-to-cart','cart'),   # ordinary Decoration purchase
       ('unlock','unlock'),      # 본사 해금
       ('open','shutter'),       # MORNING opening
       ('blocked','gate'),       # FINAL commit: the heaviest mechanical close in the set
       ('select','key'),         # ordinary pick
       ('send','door'),          # SALE 손님 보내기: the customer leaves (v2.9.0 TRANSACTION BEAT A4)
       # User 2026-10-09: the sounds below were picked by ear from reports/sfx-candidates. A third item names another uisfx theme.
       ('drop','crate'),         # ORDER: the second and third crate landing
       ('checkpoint','newstore'),  # ending -> next store
       ('success','return'),     # NIGHT 성공
       ('error','severe','cinematic'),  # NIGHT 중상: the longest sample before 사망
       ('start','settle','organic')]  # CLOSING 다음 날: a new day starting, not a closure (User 2026-10-09)

# v3.0 BGM (User 2026-09-29): the Gemini (Lyria) tracks the User generated for this project, kept untouched under
# assets-src/bgm/. dist is the web build, so it gets 128 kb/s re-encodes under the ROLE name (User 2026-09-29: 33 MB -> 22 MB
# for the web; the app ships the originals). LAME's gapless header keeps the decoded audio sample-aligned with the original
# (0-sample shift and the same length, measured in ffmpeg and Chromium), so the loop points in dist/ui/audio.js - measured
# on the originals by tools/bgm-loop.py (reports/bgm-loops.md) - hold. BOSS2 was evaluated and not adopted, so it never
# reaches dist.
BGM_SRC=os.path.join(ROOT,'assets-src','bgm')
BGM_OUT=os.path.join(ROOT,'dist','ui','assets','bgm')
BGM=[('TITLE_beneath_the_root','title'),                   # no Run / 첫 점포지원 / the store about to open
     ('MORNING_the_sunken_courtyard','morning'),
     ('ORDER_before_the_next_turn','order'),
     ('SALE_copper_key','sale'),
     ('NIGHT_valley_of_sunken_bells','night'),
     ('CLOSE_the_stone_path','close'),
     ('BOSS_beneath_the_stone_floor','boss'),               # FINAL
     ('SUCC_step_into_the_canopy','succ'),                  # the ending, a cleared Run
     ('FAIL_late_shift_at_the_dungeon_gate','fail')]        # the ending, any failed Run

def glyphs():
    chars=set()
    for path in glob.glob(os.path.join(ROOT,'dist','**','*.js'),recursive=True)+ \
                glob.glob(os.path.join(ROOT,'dist','*.html')):
        chars|=set(io.open(path,encoding='utf-8').read())
    chars|=set(chr(c) for c in range(0x20,0x7f))          # every ASCII printable
    chars|=set('·…—–→←↑↓×÷±°％%‰₩€$¥“”‘’「」『』【】〈〉《》')  # punctuation the copy may reach for
    chars|=set('0123456789')
    chars-=set('\n\r\t')
    return ''.join(sorted(chars))

def main():
    if not os.path.isdir(SRC):
        sys.exit('vendor/mulmaru is missing. the ATMOSPHERE WOFF2 pair is vendored in-repo.')
    os.makedirs(OUT,exist_ok=True); os.makedirs(VEN,exist_ok=True)
    text=glyphs()
    print(f'subsetting to {len(text)} glyphs')
    def cut(src,dst):
        opts=subset.Options(flavor='woff2',desubroutinize=True,layout_features=['*'],
                            notdef_outline=True,recalc_bounds=True)
        font=subset.load_font(src,opts)
        sub=subset.Subsetter(options=opts); sub.populate(text=text); sub.subset(font)
        subset.save_font(font,dst,opts); font.close()
        print(f'  {os.path.basename(dst)}  {os.path.getsize(src)//1024}K -> {os.path.getsize(dst)//1024}K')
    for src_name,out_name in UI_FACES:
        cut(os.path.join(PRE,src_name+'.ttf'),os.path.join(OUT,out_name+'.woff2'))
    shutil.copyfile(os.path.join(ROOT,'node_modules','wanted-sans','fonts','OFL.txt'),
                    os.path.join(OUT,'OFL-WantedSans.txt'))
    for face in FACES:
        src=os.path.join(SRC,face+'.woff2')
        dst=os.path.join(OUT,face+'.woff2')
        opts=subset.Options(flavor='woff2',desubroutinize=True,layout_features=['*'],
                            notdef_outline=True,recalc_bounds=True)
        font=subset.load_font(src,opts)
        subsetter=subset.Subsetter(options=opts)
        subsetter.populate(text=text)
        subsetter.subset(font)
        subset.save_font(font,dst,opts)
        font.close()
        print(f'  {face}.woff2  {os.path.getsize(src)//1024}K -> {os.path.getsize(dst)//1024}K')
    # record what the family genuinely does not carry, so tests/assets.cjs can tell a
    # stale subset apart from a character the ATMOSPHERE family never had (data-only symbols, emoji).
    from fontTools.ttLib import TTFont
    full=TTFont(os.path.join(SRC,'Mulmaru.woff2'))
    have=set(full.getBestCmap());full.close()
    absent=sorted(c for c in text if ord(c) not in have)
    io.open(os.path.join(OUT,'coverage.json'),'w',encoding='utf-8').write(
        '{"requested":%d,"absentFromFamily":%s}\n'%(len(text),__import__('json').dumps(absent,ensure_ascii=False)))
    print('  absent from the family: '+(''.join(absent) or 'none'))
    # upstream Mulmaru OFL notice travels with the faces it licenses
    shutil.copyfile(os.path.join(SRC,'OFL.txt'),os.path.join(OUT,'OFL.md'))
    anime=os.path.join(ROOT,'node_modules','animejs','dist','bundles','anime.umd.min.js')
    shutil.copyfile(anime,os.path.join(VEN,'anime.umd.min.js'))
    shutil.copyfile(os.path.join(ROOT,'node_modules','animejs','LICENSE.md'),os.path.join(VEN,'anime.LICENSE.md'))
    print(f'  anime.umd.min.js  {os.path.getsize(anime)//1024}K')
    audio()
    bgm()
    portraits()

def audio():
    """Copy the named cue files out of the uisfx package. They are already short and dry, so
    nothing is re-encoded: the shipped bytes are the CC0 bytes, which keeps the licence record
    simple (`modification: none, renamed only`)."""
    if not os.path.isdir(SFX):
        print('  audio: node_modules/uisfx is absent, skipped'); return
    os.makedirs(AUD,exist_ok=True)
    total=0
    for src_name,role,*theme in AUDIO:
        theme=theme[0] if theme else 'mechanical'
        src=os.path.join(SFX,'sounds',theme,src_name+'.mp3')
        if not os.path.exists(src):
            sys.exit('uisfx is missing sounds/%s/%s.mp3'%(theme,src_name))
        dst=os.path.join(AUD,role+'.mp3')
        shutil.copyfile(src,dst); total+=os.path.getsize(dst)
    # the CC0 dedication travels with the files it releases, exactly as the OFL does
    shutil.copyfile(os.path.join(SFX,'LICENSE-AUDIO'),os.path.join(AUD,'LICENSE-CC0.txt'))
    print(f'  audio  {len(AUDIO)} cues  {total//1024}K')

def bgm():
    """Re-encode the adopted BGM sources out of assets-src/bgm/ for the web build: MP3 128 kb/s CBR, 44.1 kHz stereo, no
    tags. Nothing is trimmed - the loop is played from the decoded buffer. The app build ships the originals instead."""
    import subprocess, imageio_ffmpeg
    ff=imageio_ffmpeg.get_ffmpeg_exe()
    os.makedirs(BGM_OUT,exist_ok=True)
    total=0
    for src_name,role in BGM:
        src=os.path.join(BGM_SRC,src_name+'.mp3')
        if not os.path.exists(src):
            sys.exit('assets-src/bgm is missing %s.mp3'%src_name)
        dst=os.path.join(BGM_OUT,role+'.mp3')
        # no ID3 tag (the gapless LAME header stays). The source's C2PA manifest is bound to the source bytes and cannot
        # carry over; the web copies go without it and the AI disclosure rides the credits (User 2026-09-29, ASSETS.md)
        subprocess.run([ff,'-v','error','-y','-i',src,'-map_metadata','-1','-id3v2_version','0','-c:a','libmp3lame',
                        '-b:a','128k','-ar','44100','-ac','2',dst],check=True)
        total+=os.path.getsize(dst)
    print(f'  bgm  {len(BGM)} tracks  {total//1024}K (128 kb/s)')

def portraits():
    """Derive the shipped portrait set. Source filenames are the binding, so the output
    keeps them; only the container changes."""
    if not os.path.isdir(ART):
        print('  portraits: GUILD24_NPC_PRODUCTION is absent, skipped'); return
    try:
        from PIL import Image
    except ImportError:
        # checked before anything is removed, so the committed portraits stay intact
        print('  portraits: Pillow is not installed (pip install Pillow), skipped'); return
    jobs=[]
    for g in ('M','F','X'):
        for f in sorted(os.listdir(os.path.join(ART,'02_NORMAL_WORK',g))):
            if f.endswith('.png'):jobs.append(('normal',os.path.join(ART,'02_NORMAL_WORK',g,f),
                                               os.path.join(NPC,'normal',g,f[:-4]+'.webp')))
    for f in sorted(os.listdir(os.path.join(ART,'04_BOSS'))):
        if f.endswith('.png'):jobs.append(('boss',os.path.join(ART,'04_BOSS',f),
                                           os.path.join(NPC,'boss',f[:-4]+'.webp')))
    # Regenerate wholly, but only what this step owns: dist/ui/assets/npc also holds
    # hand-kept placeholder art that Scene.npcPool still draws from.
    for sub in ('normal','easter','boss'):  # 'easter' only clears the folder the removed Rare Reference art (v2.9.11) left
        if os.path.isdir(os.path.join(NPC,sub)):shutil.rmtree(os.path.join(NPC,sub))
    src_bytes=out_bytes=0;shrunk=0
    for kind,src,dst in jobs:
        os.makedirs(os.path.dirname(dst),exist_ok=True)
        im=Image.open(src);cap=CAP[kind]
        if max(im.size)>cap:
            im.thumbnail((cap,cap),Image.LANCZOS);shrunk+=1
        im.save(dst,format='WEBP',quality=QUALITY,method=METHOD)
        src_bytes+=os.path.getsize(src);out_bytes+=os.path.getsize(dst)
    io.open(os.path.join(NPC,'manifest.js'),'w',encoding='utf-8').write(MANIFEST)
    print(f'  portraits  {len(jobs)} images  {src_bytes//(1<<20)}M -> {out_bytes//(1<<20)}M'
          f'  ({100*out_bytes//src_bytes}%, {shrunk} resized to fit the UI)')

# Addressing only. The name <-> slot binding belongs to the name pool and is adopted with
# the names themselves; keeping it out of here keeps every shipped path ASCII, which costs
# the subset font nothing and keeps file:// URLs free of encoding.
MANIFEST='''(function(G){
/* generated by tools/vendor-assets.py - do not edit */
G.NPCAssets={
 base:'ui/assets/npc/',ext:'.webp',
 normal:{M:100,F:100,X:1},                  /* normal/<M|F|X>/<001..100> */
 boss:{WRATH:'B001',PRIDE:'B002',ENVY:'B003',GREED:'B004',
       GLUTTONY:'B005',LUST:'B006',SLOTH:'B007'},
 /* boss/<prefix>_<ID>_D05-D15 | _D30; SLOTH is <prefix>_SLOTH_D05-D15_SB0 for zero
    committed breaks on any day, and <prefix>_SLOTH_D30_SB<1|2|3> otherwise. */
 slothZero:'D05-D15_SB0'};
})(globalThis);
'''

main()
