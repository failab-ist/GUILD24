#!/usr/bin/env python3
"""Vendor Chunk F presentation assets into dist/ so the game stays static and local.

  Galmuri (SIL OFL 1.1, (c) Lee Minseo) -> dist/ui/fonts/*.woff2, subset to the glyphs
    this build can actually render. Every player-visible string in GUILD24 is a literal in
    dist/**/*.js, so the union of those characters plus ASCII is a complete, safe subset.
  anime.js (MIT, (c) Julian Garnier) -> dist/ui/vendor/anime.umd.min.js

Run: npm run assets. The output is committed; the game never fetches anything at runtime.
"""
import io,glob,os,shutil,sys
from fontTools import subset

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'node_modules','galmuri','dist')
OUT=os.path.join(ROOT,'dist','ui','fonts')
VEN=os.path.join(ROOT,'dist','ui','vendor')
FACES=['Galmuri14','Galmuri11','Galmuri11-Bold','GalmuriMono11']

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

main()
