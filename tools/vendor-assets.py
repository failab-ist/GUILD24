#!/usr/bin/env python3
"""Vendor Chunk F presentation assets into dist/ so the game stays static and local.

  Galmuri (SIL OFL 1.1, (c) Lee Minseo) -> the ATMOSPHERE face: signage, document titles,
    diegetic readouts. Pretendard (SIL OFL 1.1, (c) Kil Hyung-jin) -> the INFORMATION face:
    every value, effect line and control label. Both are subset to the glyphs this build can
    actually render; every player-visible string in GUILD24 is a literal in dist/**/*.js, so
    the union of those characters plus ASCII is a complete, safe subset.
  anime.js (MIT, (c) Julian Garnier) -> dist/ui/vendor/anime.umd.min.js

Run: npm run assets. The output is committed; the game never fetches anything at runtime.
"""
import io,glob,os,shutil,sys
from fontTools import subset

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'node_modules','galmuri','dist')
PRE=os.path.join(ROOT,'node_modules','pretendard','dist','public','static')
OUT=os.path.join(ROOT,'dist','ui','fonts')
VEN=os.path.join(ROOT,'dist','ui','vendor')
FACES=['Galmuri14','Galmuri11-Bold','GalmuriMono11']
# NPC / Boss portraits. GUILD24_NPC_PRODUCTION is the source of truth and is never written
# to; dist carries a derived copy only, exactly as the fonts do. WebP q90 with alpha, capped
# at the largest size the UI can actually paint at 2x device pixels — measured in a real
# browser, not guessed: the sale card payload tops out at 246 CSS px and never grows with the
# viewport, and a modal (where the Boss reveal lives) at 640. Art already under its cap is
# copied at native size; nothing is ever enlarged.
ART=os.path.join(ROOT,'GUILD24_NPC_PRODUCTION')
NPC=os.path.join(ROOT,'dist','ui','assets','npc')
CAP={'normal':492,'easter':492,'boss':1280}
QUALITY=90
# encoder effort: 6 costs 5.1s an image for 4% fewer bytes than 4, which costs 0.08s.
# 64x the build time is not worth 4% on a 12MB set, so the whole drop encodes in seconds.
METHOD=4
UI_FACES=[('Pretendard-Regular','Pretendard'),('Pretendard-SemiBold','Pretendard-SemiBold')]

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
        sys.exit('galmuri is not installed. run: npm install')
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
        cut(os.path.join(PRE,src_name+'.otf'),os.path.join(OUT,out_name+'.woff2'))
    shutil.copyfile(os.path.join(ROOT,'node_modules','pretendard','dist','LICENSE.txt'),
                    os.path.join(OUT,'OFL-Pretendard.txt'))
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
    # stale subset apart from a character Galmuri never had (data-only symbols, emoji).
    from fontTools.ttLib import TTFont
    full=TTFont(os.path.join(SRC,'Galmuri14.woff2'))
    have=set(full.getBestCmap());full.close()
    absent=sorted(c for c in text if ord(c) not in have)
    io.open(os.path.join(OUT,'coverage.json'),'w',encoding='utf-8').write(
        '{"requested":%d,"absentFromFamily":%s}\n'%(len(text),__import__('json').dumps(absent,ensure_ascii=False)))
    print('  absent from the family: '+(''.join(absent) or 'none'))
    for name in ['ofl.md']:
        shutil.copyfile(os.path.join(ROOT,'node_modules','galmuri',name),os.path.join(OUT,'OFL.md'))
    anime=os.path.join(ROOT,'node_modules','animejs','dist','bundles','anime.umd.min.js')
    shutil.copyfile(anime,os.path.join(VEN,'anime.umd.min.js'))
    shutil.copyfile(os.path.join(ROOT,'node_modules','animejs','LICENSE.md'),os.path.join(VEN,'anime.LICENSE.md'))
    print(f'  anime.umd.min.js  {os.path.getsize(anime)//1024}K')
    portraits()

def portraits():
    """Derive the shipped portrait set. Source filenames are the binding, so the output
    keeps them; only the container changes."""
    if not os.path.isdir(ART):
        print('  portraits: GUILD24_NPC_PRODUCTION is absent, skipped'); return
    from PIL import Image
    jobs=[]
    for g in ('M','F'):
        for f in sorted(os.listdir(os.path.join(ART,'02_NORMAL_WORK',g))):
            if f.endswith('.png'):jobs.append(('normal',os.path.join(ART,'02_NORMAL_WORK',g,f),
                                               os.path.join(NPC,'normal',g,f[:-4]+'.webp')))
    for f in sorted(os.listdir(os.path.join(ART,'03_EASTER'))):
        # the shipped path stays ASCII: the name lives in the name pool, not in a URL
        if f.endswith('.png'):jobs.append(('easter',os.path.join(ART,'03_EASTER',f),
                                           os.path.join(NPC,'easter',f.split('_')[0]+'.webp')))
    for f in sorted(os.listdir(os.path.join(ART,'04_BOSS'))):
        if f.endswith('.png'):jobs.append(('boss',os.path.join(ART,'04_BOSS',f),
                                           os.path.join(NPC,'boss',f[:-4]+'.webp')))
    # Regenerate wholly, but only what this step owns: dist/ui/assets/npc also holds
    # hand-kept placeholder art that Scene.npcPool still draws from.
    for sub in ('normal','easter','boss'):
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
 normal:{M:100,F:100},                       /* normal/<M|F>/<001..100> */
 easter:['E001','E002','E003'],              /* easter/<id> */
 boss:{WRATH:'B001',PRIDE:'B002',ENVY:'B003',GREED:'B004',
       GLUTTONY:'B005',LUST:'B006',SLOTH:'B007'},
 /* boss/<prefix>_<ID>_D05-D15 | _D30; SLOTH is <prefix>_SLOTH_D05-D15_SB0 for zero
    committed breaks on any day, and <prefix>_SLOTH_D30_SB<1|2|3> otherwise. */
 slothZero:'D05-D15_SB0'};
})(globalThis);
'''

main()
