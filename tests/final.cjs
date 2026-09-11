// Chunk E acceptance: D30 Final Expedition.
// Covers FINAL_EXPEDITION sections 1-12 and RUN-Q14/Q15/Q16.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
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

test('FINAL: the shared modifier order runs in order, and with no Trait defined it changes nothing',()=>{
 // Steps 4 and 7 are the only places a Boss attaches. Until one does, step 4 hands back
 // the prepared effects and step 7 hands back the baseline, so the Final is decided by
 // exactly the same numbers the ordinary prepare produced.
 for(let i=0;i<30;i++){
  const g=atFinal('order-'+i),s=g.run,d=s.dungeons[0];
  const team=g.finalEligible().slice(0,g.finalRequired());
  for(const n of team)g.selectFinal(n.id);
  const preps=s.team.map(id=>Dungeon.prepare(s.npcs.find(n=>n.id===id),d,s.facilities));
  const expected=preps.reduce((sum,p)=>sum+p.effects.combat*.58+p.effects.survival*.32
   +p.effects.mobility*.24+p.effects.spirit*.16-p.hazard*.35,0);
  g.boss();
  assert.ok(Math.abs(s.bossDebug.power-expected)<1e-9,'party power is the plain sum of the prepared contributions');
  assert.equal(s.bossDebug.bossPower,DATA.balance.bossPower,'no Boss modifies the baseline yet');
  assert.ok(s.bossDebug.roll>=.88&&s.bossDebug.roll<=1.12,'the Final roll stays in its approved band');
  assert.equal(s.bossDebug.assault,s.bossDebug.power*s.bossDebug.roll);
  assert.equal(s.finalReport.cleared,s.bossDebug.assault>=s.bossDebug.bossPower,'one CLEAR/FAIL, read straight off the comparison');
 }
});

test('FINAL: the Lock freezes what the Final was decided from, and reload cannot move it',()=>{
 const g=atFinal('lock');
 for(const n of g.finalEligible().slice(0,g.finalRequired()))g.selectFinal(n.id);
 const s=g.run,d=s.dungeons[0];
 g.boss();
 const l=s.finalLock;
 assert.equal(l.bossId,s.bossId,'the Boss that was actually fought');
 assert.deepEqual(l.families,d.families,'the Family pair it was fought on');
 assert.equal(l.revenue,s.stats.revenue,'the committed sales figure is the one Economy already keeps');
 assert.equal(l.members.length,s.finalReport.members.length,'every participant is in the lock');
 for(const m of l.members){
  assert.ok(s.npcs.some(n=>n.id===m.npcId),'a participant that exists');
  for(const k of ['combat','survival','mobility','spirit'])assert.ok(Number.isFinite(m.stats[k]),'a frozen '+k);
 }
 assert.equal('sealBreakCount' in l,s.bossId==='SLOTH','only a SLOTH Run locks a break count');
 // the lock survives the round trip intact
 const back=Save.import(Save.export(g.account,s));
 assert.deepEqual(back.run.finalLock,l,'the lock reloads exactly as it was written');
 // and a lock that points at nobody, or carries no sales figure, is refused
 for(const wreck of [x=>x.run.finalLock.members[0].npcId='npc-nope',
                     x=>delete x.run.finalLock.revenue,
                     x=>x.run.finalLock.families=['spider']]){
  const bad=JSON.parse(Save.export(g.account,s));wreck(bad);
  assert.equal(Save.valid(bad),false,'a tampered Final lock is refused');
 }
});

/* The Trait structures are built and parameterised; none of their values is approved, so
   every one of them is null and the Final is the WRATH baseline. These drive the structure
   with injected candidates - the way Stage 9 will - to prove each attaches where the order
   says and nowhere else. Injection is undone after every case; nothing here approves a
   number, and none of these values is a proposal. */
function withTuning(patch,fn){const t=DATA.bossTuning,saved={...t};
 Object.assign(t,patch);try{return fn();}finally{Object.assign(t,saved);}}

function finalWith(seed,bossId,tuning){
 const g=atFinal(seed);g.run.bossId=bossId;
 if(bossId==='SLOTH'){g.run.slothDays=[15,20];g.run.sealBreakCount=g.run.sealBreakCount||0;}
 else {delete g.run.slothDays;delete g.run.sealBreakCount;}
 for(const n of g.finalEligible().slice(0,g.finalRequired()))g.selectFinal(n.id);
 return withTuning(tuning||{},()=>{g.boss();return g;});
}

test('BOSS-Q05/Q14: with nothing approved every Boss resolves as the WRATH baseline',()=>{
 for(const b of DATA.bosses){
  const g=finalWith('base-'+b.id,b.id);
  assert.equal(g.run.bossDebug.bossPower,DATA.balance.bossPower,b.id+' adds no Boss-side modifier');
  const plain=finalWith('base-'+b.id,'WRATH');
  assert.equal(g.run.bossDebug.power,plain.run.bossDebug.power,b.id+' adds no participant-side modifier');
 }
});

test('BOSS-Q06: PRIDE moves only 투력, and only on the Final snapshot',()=>{
 const before=finalWith('pride','PRIDE');
 const after=finalWith('pride','PRIDE',{prideCombatFactor:.5});
 assert.ok(after.run.bossDebug.power<before.run.bossDebug.power,'a weaker 투력 lowers the party');
 // the other three are untouched: halving 투력 may only remove its own 0.58 share
 const lost=before.run.bossDebug.power-after.run.bossDebug.power;
 const combat=before.run.finalLock.members.reduce((a,m)=>a+m.stats.combat,0);
 assert.ok(Math.abs(lost-combat*.5*.58)<1e-9,'exactly half of the 투력 contribution, and nothing else');
 for(const m of after.run.finalLock.members)
  assert.ok(after.run.npcs.find(n=>n.id===m.npcId).stats.combat>0,'the stored NPC Stat is untouched');
});

test('BOSS-Q07: ENVY picks one ace before its own penalty, and does not re-pick after it',()=>{
 const g=finalWith('envy','ENVY',{envyStatFactor:.5});
 const l=g.run.finalLock,target=l.envyTargetNpcId;
 assert.ok(target&&l.members.some(m=>m.npcId===target),'exactly one participant is the target');
 // the pre-ENVY ranking is what chose it: recompute it independently
 const s=g.run,d=s.final||s.dungeons[0];
 const ranked=l.members.map(m=>{const n=s.npcs.find(x=>x.id===m.npcId);
  const p=Dungeon.prepare(n,d,s.facilities);
  return {id:n.id,power:p.effects.combat*.58+p.effects.survival*.32+p.effects.mobility*.24+p.effects.spirit*.16-p.hazard*.35};})
  .sort((a,b)=>b.power-a.power||(a.id<b.id?-1:1));
 assert.equal(target,ranked[0].id,'the largest pre-ENVY contributor, not the largest after');
 assert.ok(ranked.length<2||ranked[0].power>ranked[1].power*.5,
  'and its own penalty would have made it no longer the largest, which does not move the target');
});

test('BOSS-Q09: GLUTTONY takes only high-end supply Stats, and leaves Counter/Supply/Insurance alone',()=>{
 const g=atFinal('glut');g.run.bossId='GLUTTONY';
 const team=g.finalEligible().slice(0,g.finalRequired());
 for(const n of team){g.selectFinal(n.id);n.pack=['highpotion','ice','rice','stone'];}
 const d=g.run.dungeons[0];
 const prep=Dungeon.prepare(team[0],d,g.run.facilities);
 const high=prep.itemStats.filter(c=>c.rarity>=2).reduce((a,c)=>a+(c.stats.survival||0),0);
 assert.ok(high>0,'the case actually contains a high-end supply');
 const cut=withTuning({gluttonyRarityThreshold:2,gluttonyStatFactor:.5},
  ()=>g.finalSnapshot(team[0],prep,d,null));
 assert.ok(Math.abs((prep.effects.survival-cut.survival)-high*.5)<1e-9,
  'exactly half of the high-end raw-Stat contribution comes off');
 // the low-end supply and the non-Stat effects are not in the reckoning at all
 const lowOnly=withTuning({gluttonyRarityThreshold:9,gluttonyStatFactor:.5},
  ()=>g.finalSnapshot(team[0],prep,d,null));
 assert.equal(lowOnly.survival,prep.effects.survival,'nothing below the boundary is touched');
 assert.equal(cut.fire,prep.effects.fire,'the 얼음컵 Counter is untouched');
 assert.equal(cut.escape,prep.effects.escape,'the 귀환석 Insurance is untouched');
 assert.equal(cut.supply,prep.effects.supply,'Supply is untouched');
});

test('BOSS-Q10: LUST reads the existing 단골 state and leaves regulars alone',()=>{
 const g=atFinal('lust');g.run.bossId='LUST';
 const team=g.finalEligible().slice(0,g.finalRequired());
 for(const n of team)g.selectFinal(n.id);
 team[0].loyalty=Adventurer.TRUSTED_REGULAR;team[1].loyalty=0;
 const d=g.run.dungeons[0];
 for(const [n,expectCut] of [[team[0],false],[team[1],true]]){
  const prep=Dungeon.prepare(n,d,g.run.facilities);
  const out=withTuning({lustStatFactor:.5},()=>g.finalSnapshot(n,prep,d,null));
  for(const k of ['combat','survival','mobility','spirit'])
   assert.equal(out[k],expectCut?prep.effects[k]*.5:prep.effects[k],
    (expectCut?'a non-regular loses ':'a regular keeps ')+k);
 }
 assert.ok(!require('node:fs').readFileSync(require('node:path').join(__dirname,'../dist/systems/run.js'),'utf8').includes('51'),
  'LUST keeps no threshold of its own; it asks the NPC');
});

test('BOSS-Q08: GREED reads the committed sales the shop already keeps, capped',()=>{
 const g=finalWith('greed','GREED');
 const base=DATA.balance.bossPower,revenue=g.run.finalLock.revenue;
 assert.equal(revenue,g.run.stats.revenue,'the figure is the one Economy keeps, not a second counter');
 const tuned={greedRevenueTarget:revenue+1000,greedShortfallSlope:.01,greedShortfallCap:50};
 const raised=withTuning(tuned,()=>g.effectiveBossPower(0,{revenue}));
 assert.equal(raised,base+10,'the shortfall strengthens the Boss in proportion');
 assert.equal(withTuning({...tuned,greedShortfallCap:5},()=>g.effectiveBossPower(0,{revenue})),base+5,'and no further than the cap');
 assert.equal(withTuning(tuned,()=>g.effectiveBossPower(0,{revenue:revenue+9999})),base,'meeting the target adds nothing, and exceeding it is not a bonus');
});

console.log(count+' final groups passed');
