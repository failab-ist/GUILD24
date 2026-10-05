const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const base=__dirname;
const replace=(s,a,b,label)=>{if(s.split(a).length!==2)throw Error('Expected one match: '+label);return s.replace(a,b);};
const provenance={commit:'177d1ab297157c96a80da9049674a9f5feeb23a5',arms:{},changes:[]};
for(const [arm,visit,xp] of [['baseline',false,false],['visit',true,false],['xp',false,true],['both',true,true]]){
 const root=path.join(base,arm);if(fs.existsSync(root))throw Error('Arm already exists: '+arm);
 fs.cpSync(path.join(base,'template'),root,{recursive:true});
 let shop=fs.readFileSync(path.join(root,'dist/systems/shop.js'),'utf8');
 shop=replace(shop,'(function(G){',`(function(G){\n// ISOLATED MEASUREMENT CANDIDATE. Not production.\nconst RV_VISIT=${visit},RV_XP=${xp};\nconst rvFloor=day=>day<=4?1:1+Math.floor((day-1)*.4);\nconst rvBonus=n=>RV_VISIT?Math.min(.5,Math.max(0,((n._rvEligibleDays||0)-4)*.1)):0;`,'flags');
 shop=replace(shop,'existing.reduce((v,n)=>v+1+n.loyalty*lr,0)','existing.reduce((v,n)=>v+1+n.loyalty*lr+rvBonus(n),0)','normalization');
 shop=replace(shop,'(1+n.loyalty*lr)/Math.max(1,existingSum)','(1+n.loyalty*lr+rvBonus(n))/Math.max(1,existingSum)','weight');
 const anchor='s.visitorBreakdown={base:baseVisitors';
 shop=replace(shop,anchor,`// Instrument the real morning selection, including explicit event seats.\n  const exp=s._rvExposure??={regularEligible:0,regularVisits:0,otherEligible:0,otherVisits:0,absence7:0,absence10:0};\n  for(const n of available.filter(n=>n.introduced)){const reg=G.Adventurer.isTrustedRegular(n);exp[reg?'regularEligible':'otherEligible']++;if(selected.includes(n))exp[reg?'regularVisits':'otherVisits']++;if((n._rvEligibleDays||0)>=7)exp.absence7++;if((n._rvEligibleDays||0)>=10)exp.absence10++;}\n  const visits=s._rvVisits??=[];\n  for(const n of selected){const missed=n._rvEligibleDays||0;visits.push({id:n.id,day:s.day,known:n.introduced,loyalty:n.loyalty,level:n.level,missed});\n   if(RV_XP&&n.introduced&&missed>=5&&n.level<rvFloor(s.day)&&!n._rvCatchup)n._rvCatchup={day:s.day,target:rvFloor(s.day)};n._rvEligibleDays=0;}\n  for(const n of available)if(n.introduced&&!selected.includes(n))n._rvEligibleDays=(n._rvEligibleDays||0)+1;\n  ${anchor}`,'tracking');
 fs.writeFileSync(path.join(root,'dist/systems/shop.js'),shop);
 let dungeon=fs.readFileSync(path.join(root,'dist/systems/dungeon.js'),'utf8');
 dungeon=replace(dungeon,'const changes=G.Adventurer.grow(n,xp,r);',`const baseXP=xp;let catchupBonus=0;const catchupTarget=n._rvCatchup?.target??null;\n if(n._rvCatchup&&n.alive&&!d.deep&&d.day<30){let needed=-n.xp;for(let lv=n.level;lv<catchupTarget;lv++)needed+=18+lv*7;catchupBonus=Math.min(baseXP,Math.max(0,needed-baseXP));xp+=catchupBonus;}\n const changes=G.Adventurer.grow(n,xp,r);\n if(n._rvCatchup&&n.level>=catchupTarget)delete n._rvCatchup;`,'xp');
 dungeon=replace(dungeon,'outcome,won,xp,loot,storeBonus,greatMargin,changes,items:','outcome,won,xp,baseXP,catchupBonus,catchupTarget,loot,storeBonus,greatMargin,changes,items:','xp-record');
 fs.writeFileSync(path.join(root,'dist/systems/dungeon.js'),dungeon);
 let measure=fs.readFileSync(path.join(root,'tools/measure-v2100.cjs'),'utf8');
 measure=replace(measure,"rows.push({idx:k++%R,bands:","rows.push({seed:s.seed,idx:k++%R,bands:",'seed');
 measure=replace(measure,"relics:(s.relicHistory||[])",`revisit:{exposure:s._rvExposure||{},visits:s._rvVisits||[],xpBonus:recs.reduce((v,r)=>v+(r.catchupBonus||0),0),xpBoosted:recs.filter(r=>r.catchupBonus>0).length,finalPower:s.bossDebug?.power??null,bossPower:s.bossDebug?.bossPower??null,team:(s.finalReport?.members||[]).map(m=>({name:m.name,level:m.level,id:m.npcId})),regulars:s.npcs.filter(n=>n.alive&&n.introduced&&G.Adventurer.isTrustedRegular(n)).length},\n   relics:(s.relicHistory||[])`,'measurement');
 fs.writeFileSync(path.join(root,'tools/measure-v2100.cjs'),measure);
 provenance.arms[arm]={visit,xp,files:['dist/systems/shop.js','dist/systems/dungeon.js','tools/measure-v2100.cjs'].map(f=>({file:f,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')}))};
}
fs.writeFileSync(path.join(base,'provenance.json'),JSON.stringify(provenance,null,2));
console.log('Prepared four isolated candidates from '+provenance.commit);
