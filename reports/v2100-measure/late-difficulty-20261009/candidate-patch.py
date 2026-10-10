import sys,re
root,flags=sys.argv[1],sys.argv[2]
def sub(path,old,new,count=1):
    p=root+'/'+path;s=open(p,encoding='utf-8').read()
    assert s.count(old)==count,(path,old,s.count(old));s=s.replace(old,new);open(p,'w',encoding='utf-8').write(s)
K='9' if 'x9' in flags else '8'
# 1: gap +6 -> x1.25 (and optional x9 overall)
G='((day&&level>=newcomerMinLevel(day)+6)?1.25:1)' if 'gap' in flags else '1'
sub('dist/systems/adventurer.js','const growthCost=level=>18+level*8;',
 'const growthCost=(level,day)=>(18+level*%s)*%s;'%(K,G))
sub('dist/systems/adventurer.js','function grow(n,xp,r){','function grow(n,xp,r,day){')
sub('dist/systems/adventurer.js','while(n.xp>=growthCost(n.level)){n.xp-=growthCost(n.level);','while(n.xp>=growthCost(n.level,day)){n.xp-=growthCost(n.level,day);')
sub('dist/systems/dungeon.js','const changes=G.Adventurer.grow(n,xp,r);','const changes=G.Adventurer.grow(n,xp,r,run?.day||d.day);')
sub('dist/systems/shop.js','G.Adventurer.grow(n,bonusXp,this.rng)','G.Adventurer.grow(n,bonusXp,this.rng,this.run.day)')
if 'env' in flags:
    sub('dist/systems/dungeon.js',"D.balance.finalHazardThreat:12+(d.day||1)*.35","D.balance.finalHazardThreat:16+(d.day||1)*.35")
    sub('dist/data/catalog.js','finalHazardThreat:28,','finalHazardThreat:32,')
    sub('dist/data/relics.js','expeditionMeal:{hazardDefense:2,','expeditionMeal:{hazardDefense:3,')
    p=root+'/dist/data/catalog.js'
    open(p,'a',encoding='utf-8').write("\n/* CANDIDATE env+4 (measure only) */\n(function(G){const D=G.DATA,H=Object.keys(D.hazards);for(const x of [...D.items,...D.traits])for(const h of H)if((x.effects?.[h]||0)>0)x.effects[h]+=4;})(globalThis);\n")
