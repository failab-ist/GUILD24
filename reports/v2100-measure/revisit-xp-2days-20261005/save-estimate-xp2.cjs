const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(__dirname,'template','dist',f+'.js'));
const saved=Save.import(fs.readFileSync(process.env.REVISIT_SAVE||'C:/Users/necro/Downloads/guild24-save-day-30_1005.json','utf8'));
const copy=x=>JSON.parse(JSON.stringify(x)),floor=d=>d<=4?1:1+Math.floor((d-1)*.4);
const departure=r=>{const m=r.changes.map(c=>/^Lv\.(\d+) → Lv\.(\d+)$/.exec(c)).find(Boolean);return m?+m[1]:r.level;};
const details=[];
for(const n of saved.run.npcs){
 const recs=[...n.records].sort((a,b)=>a.day-b.day);if(!recs.length)continue;
 assert.ok(recs.every(r=>!r.deep),'This estimate expects this save with no deep records');
 const ordinary={level:departure(recs[0]),xp:0,stats:{combat:0,survival:0,mobility:0,spirit:0},job:n.job,potential:n.potential};
 const boost=copy(ordinary),events=[];let active=null,total=0;
 for(let i=0;i<recs.length;i++){
  const r=recs[i],previous=recs[i-1];
  const missed=previous?Math.max(0,r.day-previous.day-1-Math.max(0,(previous.recovery||0)-1)):0;
  if(i&&missed>=2&&boost.level<floor(r.day)&&!active){active={day:r.day,target:floor(r.day)};events.push({kind:'start',day:r.day,missed,level:boost.level,target:active.target});}
  Adventurer.grow(ordinary,r.xp,null);
  let bonus=0;if(active&&r.outcome!=='사망'){let need=-boost.xp;for(let lv=boost.level;lv<active.target;lv++)need+=18+lv*7;bonus=Math.min(r.xp,Math.max(0,need-r.xp));}
  total+=bonus;Adventurer.grow(boost,r.xp+bonus,null);
  if(bonus)events.push({kind:'bonus',day:r.day,base:r.xp,bonus,level:boost.level,target:active.target});
  if(active&&boost.level>=active.target){events.push({kind:'complete',day:r.day,level:boost.level,target:active.target});active=null;}
 }
 assert.equal(ordinary.level,n.level,'Recorded XP reconstructs level: '+n.name);
 assert.equal(ordinary.xp,n.xp,'Recorded XP reconstructs remainder: '+n.name);
 details.push({id:n.id,name:n.name,alive:n.alive,oldLevel:n.level,newLevel:boost.level,oldXP:n.xp,newXP:boost.xp,extraXP:total,events});
}
function final(withBoost){const s=copy(saved),g=new Game(s.account,s.run);g.autosave=false;
 if(withBoost)for(const change of details){const n=s.run.npcs.find(n=>n.id===change.id),diff=change.newLevel-n.level;n.level=change.newLevel;n.xp=change.newXP;Adventurer.keys.forEach((k,i)=>n.stats[k]+=diff*DATA.jobBy[n.job].growth[i]*n.potential);}
 for(const m of s.run.finalReport.members)s.run.npcs.find(n=>n.id===m.npcId).pack=m.items.slice();
 const v=g.finalPreRoll();return {power:v.power,bossPower:v.bossPower,maxAssault:v.power*DATA.balance.finalRoll.hi,actualAssault:v.power*s.run.bossDebug.roll,party:v.team.map(n=>({id:n.id,name:n.name,level:n.level})),target:v.context?.envyTargetNpcId};}
const baseline=final(false),xp=final(true);assert.equal(baseline.power,saved.run.bossDebug.power);assert.equal(baseline.bossPower,saved.run.bossDebug.bossPower);
const result={method:'저장 방문·상품·결과 고정, 성장 경험치만 가산. 방문 변화·생존 변화는 재현하지 않는다.',baseline,xp,details,changed:details.filter(n=>n.extraXP>0)};
fs.writeFileSync(path.join(__dirname,'save-estimate-xp2.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({baseline,xp,changed:result.changed},null,2));
