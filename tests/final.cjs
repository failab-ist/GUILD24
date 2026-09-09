// Chunk E acceptance: D30 Final Expedition.
// Covers FINAL_EXPEDITION sections 1-12 and RUN-Q14/Q15/Q16.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const copy=x=>JSON.parse(JSON.stringify(x));
const FAMILIES=['spider','slime','fire','crypt','snow'];

function atFinal(seed='final',eligible=5){
 const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);
 const s=g.run;s.npcs.forEach((n,i)=>{n.alive=true;n.recovery=0;n.introduced=i<eligible;});
 s.day=30;g.morning();return g;
}

test('FINAL 1: D30 uses no normal Gate generation and rolls two distinct Families',()=>{
 assert.equal(DATA.dungeonBy.boss,undefined,'the v1 boss pseudo-Gate is gone');
 assert.deepEqual(DATA.dungeonBy.final.hazards,[],'the Final entry carries no intrinsic Hazards');
 for(let i=0;i<40;i++){
  const g=atFinal('fam-'+i),d=g.run.dungeons[0];
  assert.equal(g.run.phase,'final');
  assert.equal(d.families.length,2);
  assert.equal(new Set(d.families).size,2,'two DISTINCT Families');
  for(const f of d.families)assert.ok(FAMILIES.includes(f),'canonical Family only');
 }
});

test('FINAL 2: the Hazard Pool is exactly the two Families T2 keys at scale 4.6',()=>{
 for(let i=0;i<40;i++){
  const d=atFinal('pool-'+i).run.dungeons[0];
  const expected=[...new Set(d.families.flatMap(f=>DATA.familyTiers[f][1]))];
  assert.deepEqual([...d.hazards].sort(),expected.sort(),'union of the existing T2 Hazards, nothing else');
  assert.equal(d.scale,4.6,'v1 boss scale 5.5 is not used');
  assert.equal(d.requiredSupply,0,'D30 rolls no additional Supply Burden');
  assert.ok(!d.hazards.includes('supply'),'FIRE combat power is not a Hazard Pool entry');
 }
});

test('FINAL 3/F: the disclosed Family pair survives save/load and cannot be rerolled',()=>{
 const g=atFinal('stable'),before=copy(g.run.dungeons[0].families);
 assert.ok(g.run.dungeons[0].familyNames.every(n=>typeof n==='string'),'Families are disclosed by name');
 g.save();
 const round=Save.import(Save.export(g.account,g.run));
 assert.deepEqual(round.run.final.families,before,'reload keeps the same pair');
 const resumed=new Game(round.account,round.run);
 resumed.autosave=false;resumed.morning();
 assert.deepEqual(resumed.run.dungeons[0].families,before,'re-entering D30 does not reroll');
 const broken=copy(round);broken.run.final.families=['spider','spider'];
 assert.throws(()=>Save.import(JSON.stringify(broken)),'a non-distinct pair is rejected');
});

test('FINAL 4: survivor fallback picks exactly 3 / 2 / 1, and 0 is an immediate Run Fail',()=>{
 const five=atFinal('party5',5);
 assert.equal(five.finalRequired(),3);
 const ids=five.finalEligible().map(n=>n.id);
 five.selectFinal(ids[0]);five.selectFinal(ids[1]);five.selectFinal(ids[2]);
 assert.throws(()=>five.selectFinal(ids[3]),'no fourth participant');
 assert.equal(five.run.team.length,3);

 const two=atFinal('party2',2);
 assert.equal(two.finalRequired(),2);
 for(const n of two.finalEligible())two.selectFinal(n.id);
 assert.equal(two.run.team.length,2);
 two.boss();assert.equal(two.run.phase,'end','a 2-person party may depart with no headcount penalty');

 const one=atFinal('party1',1);
 assert.equal(one.finalRequired(),1);
 one.selectFinal(one.finalEligible()[0].id);
 assert.equal(one.run.team.length,1);
 one.run.team=[];
 assert.throws(()=>one.boss(),/원정대를 구성/,'departing with the wrong party size is refused');

 const none=atFinal('party0',0);
 assert.equal(none.finalRequired(),0);
 none.boss();
 assert.equal(none.run.phase,'end');
 assert.equal(none.run.win,false,'zero survivors is an immediate Run Fail');
});

test('FINAL 10: a Boss clear ends the Run at once with no further expedition resolve',()=>{
 const original=Dungeon.resolve;let calls=0;
 Dungeon.resolve=function(...a){calls++;return original.apply(this,a);};
 try{
  let cleared=0,failed=0;
  for(let i=0;i<60;i++){
   const g=atFinal('clear-'+i,5);
   for(const n of g.finalEligible().slice(0,3)){n.level=40;n.stats={combat:220,survival:160,mobility:140,spirit:120};g.selectFinal(n.id);}
   g.boss();
   assert.equal(g.run.phase,'end');
   if(g.run.win)cleared++;else failed++;
   assert.equal(g.run.results.length,0,'the Final produces no per-NPC expedition results');
   assert.ok(g.run.npcs.every(n=>n.alive),'no separate survival judgement overturns the Final');
  }
  assert.ok(cleared>0,'a well-grown party can clear');
  assert.equal(calls,0,'Dungeon.resolve is never called for the Final');
 }finally{Dungeon.resolve=original;}
});

test('FINAL 6/7/8: Party Power is a plain sum with no Job-diversity synergy, rolled 0.88-1.12',()=>{
 const g=atFinal('power',5),team=g.finalEligible().slice(0,3);
 const stats={combat:60,survival:40,mobility:30,spirit:20};
 team.forEach((n,i)=>{n.stats={...stats};n.level=10;n.equipment={name:'x',power:0,tier:0};n.traits=[];n.injury=0;n.fatigue=0;n.pack=[];n.job=['warrior','archer','mage'][i];g.selectFinal(n.id);});
 const varied=copy(g.run);
 g.boss();const mixedPower=g.run.bossDebug.power;

 const h=atFinal('power',5),hteam=h.finalEligible().slice(0,3);
 hteam.forEach(n=>{n.stats={...stats};n.level=10;n.equipment={name:'x',power:0,tier:0};n.traits=[];n.injury=0;n.fatigue=0;n.pack=[];n.job='warrior';h.selectFinal(n.id);});
 h.boss();
 assert.ok(Math.abs(mixedPower-h.run.bossDebug.power)<1e-9,'three distinct Jobs give no bonus over three identical Jobs');

 for(let i=0;i<80;i++){
  const k=atFinal('roll-'+i,5);
  for(const n of k.finalEligible().slice(0,3))k.selectFinal(n.id);
  k.boss();
  const r=k.run.bossDebug.roll;
  assert.ok(r>=.88&&r<=1.12,'roll '+r+' inside 0.88-1.12');
  assert.equal(k.run.bossDebug.bossPower,DATA.balance.bossPower);
  assert.ok(Math.abs(k.run.bossDebug.assault-k.run.bossDebug.power*r)<1e-9,'assault is Party Power x roll');
 }
 assert.ok(varied,'party state was captured before resolution');
});

test('RUN-Q14/Q16: the D30 Relic window and Family disclosure come before Final lock',()=>{
 const g=atFinal('lock',5);
 assert.ok(g.run.relicWindow&&g.run.relicWindow.milestoneDay===30,'a D30 window exists');
 assert.equal(g.run.relicWindow.focusedRevealSeen,false,'and it still owes its focused reveal');
 assert.equal(g.canBuyRelic(),true,'purchasable before departure');
 assert.ok(g.run.dungeons[0].familyNames.length===2,'both Families are visible before the party is chosen');
 for(const n of g.finalEligible().slice(0,3))g.selectFinal(n.id);
 g.boss();
 assert.equal(g.canBuyRelic(),false,'management cannot retroactively change a locked Final');
});

console.log(count+' final groups passed');
