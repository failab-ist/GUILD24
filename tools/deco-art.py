# The four 운영형 Decoration pictures (cheerBanner on the sign, heroSign on the wall, voucher, rerollCoupon), drawn as art-pixel grids and
# written as the SVG files the store reads. The drawing rules are UI_UX §DECORATION ART. Dev tool, not part of npm test.
#   python3 tools/deco-art.py dist/ui/assets/deco
# Each art pixel is 2x2 file units; the silhouette gets the light outline (half an art pixel, #1b130c at 55%) the room
# shows through. A standing piece (counter / display) keeps its last row - the foot line and legs - whole and opaque.
import sys,os
PAL={'K':'#1b130c','W':'#6b4a2e','w':'#9a7148','B':'#3f2a1a','G':'#c8a35e','g':'#e3b23c','Y':'#ecd59a',
 'R':'#a8322f','r':'#dc5d55','M':'#62201c','P':'#7c5ea8','p':'#a58bd0','C':'#f4efe6','c':'#d9cfb2',
 'E':'#2f7a4d','e':'#7fb069','T':'#6f9ea6','t':'#b8dde2','S':'#3a444c','s':'#8e9aa3','O':'#d98a3d','H':'#86652a','n':'#b9a982','Q':'#4f3a72','F':'#fbf4e2','N':'#283a5c','V':'#1c2840'}
class Pic:
    def __init__(s,cols,rows): s.c,s.r=cols,rows; s.g=[[None]*cols for _ in range(rows)]
    def set(s,x,y,k):
        if 0<=x<s.c and 0<=y<s.r: s.g[y][x]=k
    def rect(s,x,y,w,h,k):
        for yy in range(y,y+h):
            for xx in range(x,x+w): s.set(xx,yy,k)
    def box(s,x,y,w,h,edge,fill):
        s.rect(x,y,w,h,edge); s.rect(x+1,y+1,w-2,h-2,fill)
    def stamp(s,x0,y0,rows):
        for j,row in enumerate(rows):
            for i,ch in enumerate(row):
                if ch!='.': s.set(x0+i,y0+j,ch)
def svg(p,standing):
    p.r=max(y for y in range(p.r) if any(p.g[y]))+1
    W=p.c*2+4; H=p.r*2+(2 if standing else 4)
    u=[[None]*W for _ in range(H)]
    for y in range(p.r):
        for x in range(p.c):
            k=p.g[y][x]
            if k:
                for dy in (0,1):
                    for dx in (0,1): u[2+2*y+dy][2+2*x+dx]=(PAL[k],None)
    ring=[[False]*W for _ in range(H)]
    for y in range(H):
        for x in range(W):
            if u[y][x]: continue
            if standing and y>=H-2: continue
            if any(0<=y+dy<H and 0<=x+dx<W and u[y+dy][x+dx] and u[y+dy][x+dx][1] is None for dy in (-1,0,1) for dx in (-1,0,1)): ring[y][x]=True
    for y in range(H):
        for x in range(W):
            if ring[y][x]: u[y][x]=('#1b130c','0.55')
    out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" shape-rendering="crispEdges">'%(W,H,W*2,H*2)]
    for y in range(H):
        x=0
        while x<W:
            if not u[y][x]: x+=1; continue
            k=u[y][x]; x0=x
            while x<W and u[y][x]==k: x+=1
            op=' opacity="%s"'%k[1] if k[1] else ''
            out.append('<rect x="%d" y="%d" width="%d" height="1" fill="%s"%s/>'%(x0,y,x-x0,k[0],op))
    out.append('</svg>')
    return ''.join(out)

def heroSign():
    # wall Slot: 본사 우수 점포 훈장 - the same gold frame as 명예 모험가 액자 and 의무실 현판 (rows and columns as they are),
    # with a star medal on a red ribbon on navy velvet inside
    p=Pic(20,19)
    p.rect(0,0,20,19,'G'); p.rect(0,0,20,1,'Y'); p.rect(0,1,1,17,'Y'); p.rect(19,1,1,17,'H'); p.rect(0,18,20,1,'H')
    p.rect(2,2,16,15,'K'); p.rect(3,3,14,13,'N'); p.rect(3,3,14,1,'V')
    # the ribbon: two straps from the top of the frame down behind the star, red with a gold stripe
    for k,y in enumerate(range(3,6)):
        p.rect(4+k,y,3,1,'R'); p.set(5+k,y,'g')
        p.rect(13-k,y,3,1,'M'); p.set(14-k,y,'g')
    # the star, drawn by hand on its two centre columns so both halves match: the left facet lit, the right shaded
    STAR=[".....##.....",
          ".....##.....",
          "....####....",
          "...######...",
          "############",
          ".##########.",
          "..########..",
          "..########..",
          ".####..####.",
          ".###....###.",
          "##........##"]
    x0,y0=4,4
    cells={(x+x0,y+y0) for y,row in enumerate(STAR) for x,c in enumerate(row) if c=='#'}
    for (x,y) in cells:
        k='g' if x<=9 else 'O'
        if (x-1,y) not in cells or (x,y-1) not in cells: k='Y'
        if (x+1,y) not in cells or (x,y+1) not in cells: k='H'
        p.set(x,y,k)
    return p
def cheerBanner():
    # sign Slot (80 wide like the other signs): 단골 감사 현수막 - a cream banner the size of the other two signs' boards
    # (art rows 6~19), hung on the same two grey rods (SIGN_HANGERS, added to the file as they are), a red heart between
    # brown thank-you lines (cream, so it is not mistaken for the red 훈련소 sign or the teal 지원금 sign)
    p=Pic(38,20)
    p.rect(0,6,38,14,'C'); p.rect(0,6,38,1,'F'); p.rect(0,19,38,1,'c'); p.rect(37,7,1,12,'c')
    p.rect(2,8,34,1,'R'); p.rect(2,17,34,1,'R')
    # the ends are cut in a notch, as a banner's are
    for y,w in ((11,1),(12,2),(13,2),(14,1)):
        for x in range(0,w): p.g[y][x]=None
        for x in range(38-w,38): p.g[y][x]=None
    p.stamp(15,10,[".KK..KK.","KRRKKRRK","KRrRRRRK","KRRRRRRK",".KRRRRK.","..KRRK.."])
    p.rect(4,12,8,1,'W'); p.rect(5,14,6,1,'w'); p.rect(26,12,8,1,'W'); p.rect(27,14,6,1,'w')
    for x in range(1,37,3): p.set(x,19,'g')
    return p
# the two grey rods every sign hangs from, as the other signs' files draw them (x 12 and 66, rows 0~12)
SIGN_HANGERS=''.join('<rect x="%d" y="%d" width="2" height="1" fill="%s"%s/>'%(x,y,c,o) for x in (12,66) for y,c,o in
    [(y,'#8e9aa3','') for y in range(10)]+[(10,'#6f7d87',''),(11,'#6f7d87',''),(12,'#1b130c',' opacity="0.55"')])
def voucher():
    # counter Slot (48 wide like the safe): 휴식 바우처 꽂이 - a stepped wooden brochure stand, one voucher standing in each of
    # its three pockets, the back pocket highest (a stair-step outline, not a box on legs)
    p=Pic(22,18)
    for n,(x,top,band) in enumerate(((1,7,'E'),(8,3,'T'),(15,0,'P'))):
        # the voucher: paper, a coloured band, two lines; its pocket hides its foot
        p.rect(x,top,6,9,'C'); p.rect(x+5,top+1,1,8,'c'); p.rect(x,top,6,1,'F')
        p.rect(x+1,top+2,4,1,band); p.rect(x+1,top+4,3,1,'c'); p.rect(x+1,top+6,4,1,'c')
    # the pockets, each a step higher than the one in front of it
    for x,y in ((0,11),(7,8),(14,5)):
        w=22-x; p.rect(x,y,w,3,'w'); p.rect(x,y,w,1,'G'); p.rect(x,y+2,w,1,'W'); p.set(21,y+1,'W')
    p.rect(0,14,22,3,'w'); p.rect(0,14,22,1,'G'); p.rect(0,16,22,1,'W'); p.rect(14,8,8,6,'W'); p.rect(7,11,15,3,'W')
    p.rect(0,17,22,1,'K')
    return p
def rerollCoupon():
    # display Slot (52 wide like the shelf and the cabinet): 지원 교환 쿠폰함 - a tall purple ticket dispenser with a rounded top,
    # the swap arrows on its face and a strip of coupons running out of its mouth (not a box of papers, and not red and white
    # like the 구급품 진열장's kits)
    p=Pic(24,24)
    p.rect(6,0,12,1,'P'); p.rect(4,1,16,1,'P'); p.rect(3,2,18,1,'P'); p.rect(2,3,20,19,'P')
    p.rect(6,0,12,1,'p'); p.rect(4,1,2,1,'p'); p.rect(3,2,1,1,'p'); p.rect(2,3,1,19,'p')
    p.rect(18,1,2,1,'Q'); p.set(20,2,'Q'); p.rect(21,3,1,19,'Q'); p.rect(2,21,20,1,'Q')
    p.rect(3,12,18,1,'G')
    # the face: a cream disc with the swap arrows
    p.stamp(7,2,["..CCCCCC..",
                 ".CCCCCRCC.",
                 "CRRRRRRRCC",
                 "CCCCCCRCCC",
                 "CCCCCCCCCC",
                 "CCCRCCCCCC",
                 "CCRRRRRRRC",
                 ".CCRCCCCC.",
                 "..CCCCCC.."])
    # the mouth and the coupon strip running out of it, down the front
    p.rect(5,13,14,2,'K'); p.rect(6,14,12,8,'Y'); p.rect(6,14,12,1,'C')
    for y in (16,19): p.rect(6,y,12,1,'H')
    p.rect(8,15,3,1,'O'); p.rect(8,17,4,1,'O'); p.rect(8,20,3,1,'O')
    p.rect(17,15,1,7,'H')
    p.rect(1,22,22,1,'K'); p.rect(2,23,3,1,'K'); p.rect(19,23,3,1,'K')
    return p
out=sys.argv[1]
for name,fn,standing in (('heroSign',heroSign,False),('cheerBanner',cheerBanner,False),('voucher',voucher,True),('rerollCoupon',rerollCoupon,True)):
    art=svg(fn(),standing)
    if name=='cheerBanner': art=art.replace('shape-rendering="crispEdges">','shape-rendering="crispEdges">'+SIGN_HANGERS,1)
    open(os.path.join(out,name+'.svg'),'w').write(art)
    print(name,'ok')
