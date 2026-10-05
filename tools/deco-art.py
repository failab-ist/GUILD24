# The four 운영형 Decoration pictures (cheerBanner on the sign, heroSign on the wall, voucher, rerollCoupon), drawn as art-pixel grids and
# written as the SVG files the store reads. The drawing rules are UI_UX §DECORATION ART. Dev tool, not part of npm test.
#   python3 tools/deco-art.py dist/ui/assets/deco
# Each art pixel is 2x2 file units; the silhouette gets the light outline (half an art pixel, #1b130c at 55%) the room
# shows through. A standing piece (counter / display) keeps its last row - the foot line and legs - whole and opaque.
import sys,os
PAL={'K':'#1b130c','W':'#6b4a2e','w':'#9a7148','B':'#3f2a1a','G':'#c8a35e','g':'#e3b23c','Y':'#ecd59a',
 'R':'#a8322f','r':'#dc5d55','M':'#62201c','P':'#7c5ea8','p':'#a58bd0','C':'#f4efe6','c':'#d9cfb2',
 'E':'#2f7a4d','e':'#7fb069','T':'#6f9ea6','t':'#b8dde2','S':'#3a444c','s':'#8e9aa3','O':'#d98a3d','H':'#86652a','n':'#b9a982','Q':'#4f3a72'}
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
    # wall Slot (44 wide like the frame and the plaque): 본사 우수 점포 훈장 - a star medal on a neck ribbon, hung from a wall hook
    import math
    p=Pic(20,20)
    # the ribbon: two broad straps from the hook's corners down to the medal, purple with a gold edge stripe
    for k,y in enumerate(range(0,8)):
        a=1+k; w=5
        p.rect(a,y,w,1,'P'); p.set(a,y,'p'); p.set(a+w-1,y,'G')
        b=18-k; p.rect(b-w+1,y,w,1,'Q'); p.set(b-w+1,y,'G'); p.set(b,y,'P')
    p.rect(7,7,6,2,'P'); p.rect(7,7,6,1,'p')
    # the star: five points around (9.5, 12.6), lit top-left, shaded bottom-right, a purple gem in the middle
    cx,cy,R,r=9.5,12.6,9.4,4.1
    pts=[(cx+(R if i%2==0 else r)*math.sin(i*math.pi/5),cy-(R if i%2==0 else r)*math.cos(i*math.pi/5)) for i in range(10)]
    def inside(x,y):
        c=False
        for i in range(10):
            (x1,y1),(x2,y2)=pts[i],pts[(i+1)%10]
            if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1: c=not c
        return c
    cells={(x,y) for y in range(20) for x in range(20) if inside(x+.5,y+.5) and y>=6}
    for (x,y) in cells:
        k='g'
        if (x-1,y) not in cells or (x,y-1) not in cells: k='Y'
        if (x+1,y) not in cells or (x,y+1) not in cells: k='H'
        p.set(x,y,k)
    p.rect(9,12,2,2,'P'); p.set(9,12,'p'); p.set(10,13,'Q')
    return p
def cheerBanner():
    # sign Slot (80 wide like the other signs): 단골 감사 현수막 - a long banner hung from the ceiling on two chains
    p=Pic(38,20)
    for y in range(5): p.set(6,y,'s' if y%2==0 else 'S'); p.set(31,y,'s' if y%2==0 else 'S')
    p.rect(1,5,36,1,'W'); p.set(0,5,'G'); p.set(37,5,'G')
    p.rect(1,6,36,12,'R'); p.rect(1,6,36,1,'r'); p.rect(1,7,1,11,'r'); p.rect(36,7,1,11,'M'); p.rect(1,17,36,1,'M')
    p.rect(3,8,32,1,'g'); p.rect(3,15,32,1,'g')
    # the ends are cut in a notch, as a banner's are
    for y,w in ((10,1),(11,2),(12,1)):
        for x in range(1,1+w): p.g[y][x]=None
        for x in range(37-w,37): p.g[y][x]=None
    p.stamp(15,9,[".KK..KK.","KCCKKCCK","KCrCCCCK","KCCCCCCK",".KCCCCK.","..KCCK.."])
    p.rect(5,11,8,1,'C'); p.rect(6,13,6,1,'c'); p.rect(25,11,8,1,'C'); p.rect(26,13,6,1,'c')
    p.rect(1,18,36,1,'g'); p.set(1,18,'G'); p.set(36,18,'H')
    for x in range(2,36,3): p.set(x,19,'g')
    return p
def voucher():
    # counter Slot: 48 wide like the safe; the stand fills the width and the vouchers stand tall in it
    p=Pic(22,19)
    def card(x,y,w,band):
        p.rect(x,y,w,13-y,'C'); p.rect(x+w-1,y+1,1,12-y,'c')
        p.rect(x+1,y+2,w-2,1,band); p.rect(x+1,y+4,w-3,1,'c'); p.rect(x+1,y+6,w-2,1,'c'); p.rect(x+1,y+8,w-3,1,'c')
    card(1,3,6,'E'); card(7,0,7,'T'); card(14,2,7,'P')
    p.rect(9,4,3,1,'g'); p.rect(10,5,1,1,'g'); p.rect(9,6,3,1,'g')
    p.rect(0,11,22,6,'w'); p.rect(0,11,22,1,'G'); p.rect(0,12,1,5,'G'); p.rect(21,12,1,5,'W'); p.rect(0,16,22,1,'W')
    p.rect(3,13,16,1,'W'); p.rect(3,14,16,1,'B')
    p.rect(0,17,22,1,'K'); p.rect(1,18,2,1,'K'); p.rect(19,18,2,1,'K')
    return p
def rerollCoupon():
    # display Slot: 52 wide like the shelf and the cabinet; a coupon box with its tickets standing up
    p=Pic(24,24)
    p.rect(4,2,6,10,'C'); p.rect(4,2,6,1,'Y'); p.rect(9,3,1,9,'c'); p.rect(5,5,4,1,'e'); p.rect(5,7,3,1,'c')
    p.rect(11,0,7,12,'Y'); p.rect(11,0,7,1,'e'); p.rect(17,1,1,11,'O'); p.rect(12,3,5,1,'O'); p.rect(12,5,4,1,'g')
    p.rect(1,10,22,12,'R'); p.rect(1,10,22,1,'r'); p.rect(1,11,1,11,'r'); p.rect(22,11,1,11,'M'); p.rect(1,21,22,1,'M')
    p.rect(2,13,20,1,'g'); p.rect(2,19,20,1,'g')
    p.stamp(7,15,["CCCCCCCCCC","C.CC.CC.CC","CCCCCCCCCC"])
    p.rect(1,22,22,1,'K'); p.rect(2,23,2,1,'K'); p.rect(20,23,2,1,'K')
    return p

out=sys.argv[1]
for name,fn,standing in (('heroSign',heroSign,False),('cheerBanner',cheerBanner,False),('voucher',voucher,True),('rerollCoupon',rerollCoupon,True)):
    open(os.path.join(out,name+'.svg'),'w').write(svg(fn(),standing))
    print(name,'ok')
