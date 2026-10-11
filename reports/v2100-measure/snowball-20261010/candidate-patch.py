import sys
root,flags=sys.argv[1],sys.argv[2]
def sub(path,old,new,count=1):
    p=root+'/'+path;s=open(p,encoding='utf-8').read()
    assert s.count(old)==count,(path,old,s.count(old));s=s.replace(old,new);open(p,'w',encoding='utf-8').write(s)
if "env" in flags.split(',') or "env1" in flags.split(','):
    k=1 if "env1" in flags.split(',') else 2
    sub('dist/systems/dungeon.js',"D.balance.finalHazardThreat:12+(d.day||1)*.35","D.balance.finalHazardThreat:%d+(d.day||1)*.35"%(12+k))
    sub('dist/data/catalog.js','finalHazardThreat:28,','finalHazardThreat:%d,'%(28+k))
    open(root+'/dist/data/catalog.js','a',encoding='utf-8').write("\n/* CANDIDATE env+%d (measure only) */\n(function(G){const D=G.DATA,H=Object.keys(D.hazards);for(const x of [...D.items,...D.traits])for(const h of H)if((x.effects?.[h]||0)>0)x.effects[h]+=%d;})(globalThis);\n"%(k,k))
if 'hero' in flags:
    sub('dist/data/catalog.js',' {maxDay:19,weights:[53,27,15, 4,1]},',' {maxDay:19,weights:[53,28,15, 3,1]},')
    sub('dist/data/catalog.js',' {maxDay:24,weights:[46,26,17,10,1]},',' {maxDay:24,weights:[47,27,18, 7,1]},')
    sub('dist/data/catalog.js',' {maxDay:29,weights:[39,25,19,16,1]},',' {maxDay:29,weights:[40,25,20,14,1]},')
if 'equip' in flags:
    sub('dist/systems/dungeon.js','if(won&&r.next()<.2+(e.rareLoot||0)){','if(won&&r.next()<((run?.day??d.day)>=3?[.30,.20,.15,.10][Math.min(n.equipment.tier||0,3)]:0)+(e.rareLoot||0)){')
