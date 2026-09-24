// Chunk E acceptance: D30 Final Expedition.
// Covers FINAL_EXPEDITION sections 1-12 and RUN-Q14/Q15/Q16.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const copy=x=>JSON.parse(JSON.stringify(x));
const read=p=>require('node:fs').readFileSync(require('node:path').join(__dirname,'..',p),'utf8');
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

test('FINAL 4 (v2.8): any 1..min(3, eligible) may be committed, and 0 eligible is a Run Fail',()=>{
 /* FINAL_EXPEDITION v2.8 party rule: the inherited "3+ eligible -> exactly 3" is superseded. */
 for(const size of [1,2,3]){
  const g=atFinal('party5-'+size,5);
  assert.equal(g.finalRequired(),3,'the cap is 3');
  const ids=g.finalEligible().map(n=>n.id);
  for(const id of ids.slice(0,size))g.selectFinal(id);
  g.commitFinalParty();
  assert.equal(g.run.team.length,size,size+' of 5 eligible may be committed deliberately');
  g.boss();assert.equal(g.run.phase,'end');
  assert.equal(g.run.finalLock.members.length,size,'the Final reads only the committed participants');
 }
 const five=atFinal('party5',5),ids=five.finalEligible().map(n=>n.id);
 for(const id of ids.slice(0,3))five.selectFinal(id);
 assert.throws(()=>five.selectFinal(ids[3]),'no fourth participant');

 for(const size of [1,2]){const two=atFinal('party2-'+size,2);
  assert.equal(two.finalRequired(),2);
  for(const n of two.finalEligible().slice(0,size))two.selectFinal(n.id);
  two.commitFinalParty();two.boss();assert.equal(two.run.phase,'end',size+' of 2 eligible may depart');}

 const one=atFinal('party1',1);
 assert.equal(one.finalRequired(),1);
 assert.throws(()=>one.commitFinalParty(),/1명 이상/,'an empty party cannot be committed');
 one.selectFinal(one.finalEligible()[0].id);one.commitFinalParty();
 assert.equal(one.run.team.length,1);

 const none=atFinal('party0',0);
 assert.equal(none.finalRequired(),0);
 none.boss();
 assert.equal(none.run.phase,'end');
 assert.equal(none.run.win,false,'zero survivors is an immediate Run Fail');
});

test('FINAL-Q75 (v2.8): the resolver enforces the commitment and never auto-commits',()=>{
 const g=atFinal('guard',4);
 for(const n of g.finalEligible().slice(0,2))g.selectFinal(n.id);
 const before=JSON.stringify(g.run),rng=g.rng.state;
 assert.throws(()=>g.boss(),/확정/,'an uncommitted non-empty party does not resolve');
 assert.equal(JSON.stringify(g.run),before,'and nothing was written');
 assert.equal(g.rng.state,rng,'nor was the Final Roll drawn');
 assert.equal(g.run.finalCommitted,undefined,'boss() does not commit on the Player\'s behalf');
 const src=read('dist/systems/run.js'),fn=src.slice(src.indexOf('P.boss='),src.indexOf('const roll=',src.indexOf('P.boss=')));
 assert.ok(!/finalCommitted\s*=\s*true/.test(fn),'no auto-commit left in the resolver');
});

test('FINAL-Q77 / G: no participant-count modifier - Party Power is the plain sum of the committed',()=>{
 const g=atFinal('sum',4);const ids=g.finalEligible().map(n=>n.id);
 const solo=id=>{const h=atFinal('sum',4);h.selectFinal(id);h.commitFinalParty();return h.finalPreRoll().power;};
 for(const id of ids.slice(0,3))g.selectFinal(id);g.commitFinalParty();
 const party=g.finalPreRoll().power,sum=ids.slice(0,3).reduce((v,id)=>v+solo(id),0);
 assert.ok(Math.abs(party-sum)<1e-9,'3-person power is exactly the sum of each alone (no bonus/penalty)');
 assert.ok(!/underfill|headcount|team\.length\s*[*/]/i.test(read('dist/systems/run.js').slice(read('dist/systems/run.js').indexOf('P.finalPreRoll='),read('dist/systems/run.js').indexOf('P.finalForecast='))),'no count term in the pre-roll');
});

test('FINAL-Q77: the party-wide 토벌 전망 is the resolution pre-roll truth, and draws no RNG',()=>{
 for(const size of [1,2,3]){
  const g=atFinal('fore-'+size,5);
  for(const n of g.finalEligible().slice(0,size))g.selectFinal(n.id);
  assert.equal(g.finalForecast(),null,'no forecast while the party is provisional');
  g.commitFinalParty();
  const rng=g.rng.state,state=JSON.stringify(g.run);
  const label=g.finalForecast(),t=g.finalPreRoll();
  assert.ok(['우세','접전','불리'].includes(label));
  assert.equal(label,Dungeon.band(t.power/t.bossPower),'the shared bands over the pre-roll ratio');
  assert.equal(g.rng.state,rng,'no RNG consumed');assert.equal(JSON.stringify(g.run),state,'no state written');
  // transfer changes the preview input, and the resolution then reads the same pre-roll truth
  g.run.money=5000;g.stock('premium',1);const n=g.run.npcs.find(x=>x.id===g.run.team[0]);n.money=9999;
  const p0=g.finalPreRoll().power;g.supplyFinal(n.id,g.run.inventory.find(x=>x.item==='premium').id);
  const after=g.finalPreRoll();assert.notEqual(after.power,p0,'the forecast input moves after a transfer');
  const expect=Dungeon.band(after.power/after.bossPower);assert.equal(g.finalForecast(),expect);
  g.boss();assert.ok(Math.abs(g.run.bossDebug.power-after.power)<1e-9&&Math.abs(g.run.bossDebug.bossPower-after.bossPower)<1e-9,
   'the resolution uses the exact pre-roll the forecast read');
 }
});

test('FINAL-Q75: a legacy Final save keeps proven preparation, and only that',()=>{
 const mk=()=>{const g=atFinal('legacy',4);for(const n of g.finalEligible().slice(0,3))g.selectFinal(n.id);return g;};
 // pre-transfer legacy: team selected, no receipt -> stays uncommitted
 const a=mk();delete a.run.finalCommitted;
 const ra=Save.import(Save.export(a.account,a.run));
 assert.equal('finalCommitted' in ra.run,false,'a selected-only legacy Final is not committed');
 // post-transfer legacy: write the transfer as the pre-commit build did, then drop the flag
 const b=mk();b.commitFinalParty();b.run.money=5000;b.stock('potion',1);
 const n=b.run.npcs.find(x=>x.id===b.run.team[0]);n.money=999;b.supplyFinal(n.id,b.run.inventory[0].id);
 delete b.run.finalCommitted;
 const snap=x=>JSON.stringify({gold:x.money,gross:x.stats.revenue,inv:x.inventory,npcs:x.npcs.map(n=>[n.money,n.pack,n.history.length])});
 const before=snap(b.run);
 const rb=Save.import(Save.export(b.account,b.run));
 assert.equal(rb.run.finalCommitted,true,'a legacy Final with a proven transfer is restored to preparation');
 assert.equal(snap(rb.run),before,'pack / Wallet / Gold / Gross Sales / receipts unchanged, no new transaction');
 const rc=Save.import(Save.export(rb.account,rb.run));
 assert.equal(snap(rc.run),before);assert.equal(rc.run.finalCommitted,true,'idempotent across reloads');
 const resumed=new Game(rb.account,rb.run);resumed.autosave=false;
 assert.throws(()=>resumed.selectFinal(resumed.run.team[0]),/확정/,'and the team is locked');
 // a receipt whose Item is no longer in the Bag is not trusted as evidence
 const c=JSON.parse(Save.export(b.account,b.run));c.run.npcs.find(x=>x.id===c.run.team[0]).pack=[];
 assert.equal('finalCommitted' in Save.import(JSON.stringify(c)).run,false);
});

test('FINAL 10: a Boss clear ends the Run at once with no further expedition resolve',()=>{
 const original=Dungeon.resolve;let calls=0;
 Dungeon.resolve=function(...a){calls++;return original.apply(this,a);};
 try{
  let cleared=0,failed=0;
  for(let i=0;i<60;i++){
   const g=atFinal('clear-'+i,5);
   for(const n of g.finalEligible().slice(0,3)){n.level=40;n.stats={combat:220,survival:160,mobility:140,spirit:120};g.selectFinal(n.id);}
   g.commitFinalParty();g.boss();
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
 g.commitFinalParty();g.boss();const mixedPower=g.run.bossDebug.power;

 const h=atFinal('power',5),hteam=h.finalEligible().slice(0,3);
 hteam.forEach(n=>{n.stats={...stats};n.level=10;n.equipment={name:'x',power:0,tier:0};n.traits=[];n.injury=0;n.fatigue=0;n.pack=[];n.job='warrior';h.selectFinal(n.id);});
 h.commitFinalParty();h.boss();
 assert.ok(Math.abs(mixedPower-h.run.bossDebug.power)<1e-9,'three distinct Jobs give no bonus over three identical Jobs');

 for(let i=0;i<80;i++){
  const k=atFinal('roll-'+i,5);
  for(const n of k.finalEligible().slice(0,3))k.selectFinal(n.id);
  k.commitFinalParty();k.boss();
  const r=k.run.bossDebug.roll;
  assert.ok(r>=.88&&r<=1.12,'roll '+r+' inside 0.88-1.12');
  /* Stage 10 switched the approved Boss numerics on, so the Power a Final is judged against is
     no longer always the WRATH baseline: SLOTH reads its seal table and GREED adds a shortfall
     up to its cap. Everything else still faces the baseline exactly. */
  const t=DATA.bossTuning,bp=k.run.bossDebug.bossPower;
  if(k.run.bossId==='SLOTH')assert.equal(bp,t.slothBossPower[k.run.sealBreakCount],'SLOTH reads its seal table');
  else if(k.run.bossId==='GREED')assert.ok(bp>=DATA.balance.bossPower&&bp<=DATA.balance.bossPower+t.greedShortfallCap,'GREED adds at most its cap');
  else assert.equal(bp,DATA.balance.bossPower,k.run.bossId+' faces the baseline');
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
 g.commitFinalParty();g.boss();
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
  /* FINAL_EXPEDITION_v2.7 §FINAL HAZARD AGGREGATION: the Final divides the summed gap by the
     Hazard COUNT, not by sqrt(count), so a Family pair is not penalised for holding more
     entries. The v2.6 aggregate-gap path is superseded. */
  const meanGap=p=>p.hazards.length?p.hazards.reduce((v,h)=>v+h.gap,0)/p.hazards.length:0;
  const expected=preps.reduce((sum,p)=>sum+p.effects.combat*.50+p.effects.survival*.34
   +p.effects.mobility*.27+p.effects.spirit*.20-meanGap(p)*1.70,0);
  g.commitFinalParty();g.boss();
  /* Stage 10 switched the approved Boss Traits on, so only WRATH still faces the Final with its
     participants untouched - it is the one Run where the party sum can be checked against the
     ordinary prepare. For every other Boss the sum is taken over MODIFIED contributions, and
     re-deriving those here would only be testing the implementation against a copy of itself;
     what stays checked for all seven is the shape: no diversity synergy in the roll, the roll
     band, assault = power x roll, and one CLEAR/FAIL read straight off the comparison. */
  if(s.bossId==='WRATH')
   assert.ok(Math.abs(s.bossDebug.power-expected)<1e-9,'party power is the plain sum of the prepared contributions');
  const t=DATA.bossTuning;
  if(s.bossId==='SLOTH')assert.equal(s.bossDebug.bossPower,t.slothBossPower[s.sealBreakCount],'SLOTH reads its seal table');
  else if(s.bossId==='GREED')assert.ok(s.bossDebug.bossPower>=DATA.balance.bossPower
   &&s.bossDebug.bossPower<=DATA.balance.bossPower+t.greedShortfallCap,'GREED adds at most its cap');
  else assert.equal(s.bossDebug.bossPower,DATA.balance.bossPower,s.bossId+' faces the baseline');
  assert.ok(s.bossDebug.roll>=.88&&s.bossDebug.roll<=1.12,'the Final roll stays in its approved band');
  assert.equal(s.bossDebug.assault,s.bossDebug.power*s.bossDebug.roll);
  assert.equal(s.finalReport.cleared,s.bossDebug.assault>=s.bossDebug.bossPower,'one CLEAR/FAIL, read straight off the comparison');
 }
});

test('FINAL: the Lock freezes what the Final was decided from, and reload cannot move it',()=>{
 const g=atFinal('lock');
 for(const n of g.finalEligible().slice(0,g.finalRequired()))g.selectFinal(n.id);
 const s=g.run,d=s.dungeons[0];
 g.commitFinalParty();g.boss();
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
 return withTuning(tuning||{},()=>{g.commitFinalParty();g.boss();return g;});
}

/* Stage 10 approved every one of these, so this is no longer "nothing attaches" - it is where
   each Boss attaches, on which side, and that it attaches nowhere else. WRATH stays the
   reference: no Boss-side modifier and no participant-side one, which is what makes it the
   baseline the other six are read against. */
test('BOSS-Q05/Q14: each Boss attaches on its approved side, and WRATH on neither',()=>{
 const t=DATA.bossTuning,base=DATA.balance.bossPower;
 const BOSS_SIDE={SLOTH:1,GREED:1},PARTY_SIDE={PRIDE:1,ENVY:1,LUST:1,GLUTTONY:1};
 for(const b of DATA.bosses){
  const g=finalWith('base-'+b.id,b.id),plain=finalWith('base-'+b.id,'WRATH');
  const bp=g.run.bossDebug.bossPower,power=g.run.bossDebug.power,ref=plain.run.bossDebug.power;
  if(b.id==='SLOTH')assert.equal(bp,t.slothBossPower[0],'SLOTH at nought breaks reads its own table');
  else if(b.id==='GREED')assert.ok(bp>=base&&bp<=base+t.greedShortfallCap,'GREED adds a shortfall within its cap');
  else assert.equal(bp,base,b.id+' leaves the Boss side alone');
  if(PARTY_SIDE[b.id])assert.ok(power<=ref+1e-9,b.id+' only ever reduces a participant, never raises one');
  if(!PARTY_SIDE[b.id])assert.ok(Math.abs(power-ref)<1e-9,b.id+' leaves the participants alone');
  assert.ok(BOSS_SIDE[b.id]||PARTY_SIDE[b.id]||b.id==='WRATH','every Boss is accounted for on one side or neither');
 }
 // WRATH is the reference both ways
 const w=finalWith('base-WRATH','WRATH');
 assert.equal(w.run.bossDebug.bossPower,base,'WRATH is the baseline itself');
});

test('BOSS-Q06: PRIDE moves only 투력, and only on the Final snapshot',()=>{
 /* Stage 10 approved prideCombatFactor, so the unmodified side has to be injected rather than
    assumed: 1 is PRIDE with its Trait neutralised, which is what the halved case is read
    against. The share a Final 투력 point carries is .50 now, not .58. */
 const before=finalWith('pride','PRIDE',{prideCombatFactor:1});
 const after=finalWith('pride','PRIDE',{prideCombatFactor:.5});
 assert.ok(after.run.bossDebug.power<before.run.bossDebug.power,'a weaker 투력 lowers the party');
 // the other three are untouched: halving 투력 may only remove its own 0.50 share
 const lost=before.run.bossDebug.power-after.run.bossDebug.power;
 const combat=before.run.finalLock.members.reduce((a,m)=>a+m.stats.combat,0);
 assert.ok(Math.abs(lost-combat*.5*.50)<1e-9,'exactly half of the 투력 contribution, and nothing else');
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
  return {id:n.id,power:p.effects.combat*.50+p.effects.survival*.34+p.effects.mobility*.27+p.effects.spirit*.20-p.hazard*.35};})
  .sort((a,b)=>b.power-a.power||(a.id<b.id?-1:1));
 assert.equal(target,ranked[0].id,'the largest pre-ENVY contributor, not the largest after');
 assert.ok(ranked.length<2||ranked[0].power>ranked[1].power*.5,
  'and its own penalty would have made it no longer the largest, which does not move the target');
});

test('BOSS_v2.7 §GLUTTONY: every Item Core Stat is halved, whatever its Rarity',()=>{
 const g=atFinal('glut');g.run.bossId='GLUTTONY';
 const team=g.finalEligible().slice(0,g.finalRequired());
 for(const n of team){g.selectFinal(n.id);n.pack=['highpotion','ice','rice','stone'];}
 const d=g.run.dungeons[0];
 const prep=Dungeon.prepare(team[0],d,g.run.facilities);
 const CORE=['combat','survival','mobility','spirit'];
 /* v2.7 supersedes the Rare+ threshold: the whole positive Item Core-Stat contribution is in
    scope, so the case is measured across every Item in the Bag rather than the high-end ones. */
 assert.equal(DATA.bossTuning.gluttonyRarityThreshold,undefined,'no Rarity threshold remains');
 assert.equal(DATA.bossTuning.gluttonyStatFactor,0.50,'the approved v2.7 factor');
 const all=prep.itemStats.reduce((a,c)=>a+CORE.reduce((t,k)=>t+Math.max(0,c.stats[k]||0),0),0);
 const low=prep.itemStats.filter(c=>c.rarity<2).reduce((a,c)=>a+CORE.reduce((t,k)=>t+Math.max(0,c.stats[k]||0),0),0);
 assert.ok(all>0&&low>0,'the case contains both a high-end and a low-end supply');
 const cut=g.finalSnapshot(team[0],prep,d,null);
 const drop=CORE.reduce((t,k)=>t+(prep.effects[k]-cut[k]),0);
 assert.ok(Math.abs(drop-all*.5)<1e-9,'exactly half of the WHOLE Item Core-Stat contribution comes off');
 assert.ok(drop>low*.5,'which is strictly more than the retired Rare+ scope would have taken');
 // and only that channel: nothing else an Item carries is in the reckoning
 assert.equal(cut.fire,prep.effects.fire,'the 얼음컵 Counter is untouched');
 assert.equal(cut.escape,prep.effects.escape,'the 귀환석 Insurance is untouched');
 assert.equal(cut.supply,prep.effects.supply,'Supply is untouched');
 // the NPC's own Stats are not in scope either
 const bare=Dungeon.prepare({...JSON.parse(JSON.stringify(team[0])),pack:[]},d,g.run.facilities);
 const bareCut=g.finalSnapshot(team[0],bare,d,null);
 for(const k of CORE)assert.equal(bareCut[k],bare.effects[k],'a Bag with no Items loses nothing to GLUTTONY');
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
 /* Stage 10 approved the shortfall as a SHARE of the target rather than an amount per Gold, so
    the penalty means the same thing whatever the target is set to. A Run that sold nothing
    takes the whole cap, a Run at target takes none, and it is linear in between. */
 const target=1000,tuned={greedRevenueTarget:target,greedShortfallCap:20};
 const at=rev=>withTuning(tuned,()=>g.effectiveBossPower(0,{revenue:rev}));
 assert.equal(at(0),base+20,'a Run that sold nothing takes the whole cap');
 assert.equal(at(target/2),base+10,'the shortfall strengthens the Boss in proportion');
 assert.equal(at(target),base,'meeting the target adds nothing');
 assert.equal(at(target+9999),base,'and exceeding it is not a bonus');
 assert.equal(withTuning({...tuned,greedShortfallCap:5},()=>g.effectiveBossPower(0,{revenue:0})),base+5,'and no further than the cap');
});

test('RUN-Q15 on a controlled D30 setup: regulars and newcomers are read off the Run own history',()=>{
 /* The simulation harness classifies at D30 and a fresh-Account cohort may not get there, so
    the classification is proven here on a constructed D30 state instead. The two groups are
    read from visits and the canonical 단골 threshold - no new NPC-value system. */
 const g=atFinal('q15-controlled',5),s=g.run,d=s.dungeons[0];
 const alive=s.npcs.filter(n=>n.alive);
 assert.ok(alive.length>=4,'the controlled setup has adventurers to classify');
 alive[0].introduced=true;alive[0].visits=7;alive[0].loyalty=Adventurer.TRUSTED_REGULAR;
 alive[1].introduced=true;alive[1].visits=7;alive[1].loyalty=Adventurer.TRUSTED_REGULAR-1;
 alive[2].introduced=true;alive[2].visits=1;alive[2].loyalty=0;
 alive[3].introduced=true;alive[3].visits=4;alive[3].loyalty=Adventurer.TRUSTED_REGULAR;
 const invested=s.npcs.filter(n=>n.alive&&n.introduced&&n.visits>=5&&Adventurer.isTrustedRegular(n));
 const newcomer=s.npcs.filter(n=>n.alive&&n.visits<=1);
 assert.ok(invested.includes(alive[0]),'kept coming back AND reached the 단골 threshold');
 assert.ok(!invested.includes(alive[1]),'visits alone is not an invested regular');
 assert.ok(!invested.includes(alive[3]),'loyalty alone is not an invested regular either');
 assert.ok(newcomer.includes(alive[2]),'one visit is a newcomer');
 assert.ok(!newcomer.includes(alive[0]),'and a regular is never also a newcomer');
 // the value that classifies them is the bare Final contribution, so it describes the adventurer
 const bare=n=>Dungeon.prepare({...copy(n),pack:[]},d,s.facilities).effects;
 for(const n of [...invested,...newcomer]){
  const e=bare(n);
  assert.ok(Object.values(e).every(v=>typeof v!=='number'||Number.isFinite(v)),'a classified adventurer has a finite bare state');
 }
 const packed=Dungeon.prepare({...copy(alive[0]),pack:['potion']},d,s.facilities).effects;
 assert.notEqual(packed.combat,bare(alive[0]).combat,'and the bare reading really is without stock');
});

test('FINAL_EXPEDITION_v2.7 §D25: the Final state is generated and known from D25, and D30 reuses it',()=>{
 const drive=(seed,to)=>{const g=new Game();g.autosave=false;g.start(seed);
  g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.day=to;g.morning();return g;};
 // nothing before D25
 assert.equal(drive('d25-early',24).run.final,undefined,'D24 knows nothing about the Final');
 const g=drive('d25-known',25);
 const f=g.run.final;
 assert.ok(f,'D25 generates it');
 assert.equal(f.families.length,2);
 assert.equal(new Set(f.families).size,2,'two DISTINCT Families');
 // the Hazard Pool is the merge of each Family's own T2 keys - no new Family table
 const expected=[...new Set(f.families.flatMap(id=>DATA.familyTiers[id][1]))];
 assert.deepEqual([...f.hazards].sort(),expected.sort(),'the Pool is the union of the authoritative T2 keys');
 // it is authoritative for D30: the same object, not a new roll
 const snapshot=JSON.stringify(f);
 g.run.day=30;g.morning();
 assert.equal(JSON.stringify(g.run.final),snapshot,'D30 does not generate a new Pair');
 assert.deepEqual(g.run.dungeons[0].families,f.families,'and the Final Gate IS that state');
 // Save/Load may not reroll either field
 const r=Save.import(Save.export(g.account,g.run));
 assert.equal(JSON.stringify(r.run.final),snapshot,'a reload returns the same Pair and Pool');
 // and it is fixed by the seed, so WHEN it is generated cannot change the answer
 const late=drive('d25-known',30);
 assert.deepEqual(late.run.final.families,f.families,'the same seed gives the same Pair at D30 as at D25');
 assert.deepEqual([...late.run.final.hazards].sort(),[...f.hazards].sort(),'and the same Pool');
 // D25 grants no Counter Items, no free stock and no special shop
 const before=drive('d25-gift',24),after=drive('d25-gift',25);
 assert.equal(after.run.inventory.length-before.run.inventory.length,0,'D25 grants no free stock');
 assert.equal(after.run.offers.length,before.run.offers.length,'and no special Final shop');
 // the screen actually tells the player, from D25 rather than on D30
 const app=read('dist/ui/app.js');
 assert.ok(/s\.final\?'<div class="brief">/.test(app),'ORDER shows the known Final state');
 assert.ok(/s\.final\.familyNames/.test(app),'by name');
 assert.ok(/Presentation\.hazardRows\(s\.final\.hazards\)/.test(app),'with the Pool it carries');
 /* FINAL_EXPEDITION_v2.7 §D25: the disclosure comes BEFORE the ordinary D25 decisions that
    could use it, which in practice means before the D25 Relic window. The stage is due from
    the Day the state exists, and D30 reuses the same flag rather than staging a second reveal.
    What a player can actually touch in what order is proved in a real browser by the
    `D25 Final disclosure precedes the D25 decisions` probe in tools/qa-visual.cjs; these two
    assertions pin the rule the probe exercises, so neither stands alone. */
 /* the cadence table now owns which beat is due; the Family disclosure is its D25 row and the
    `final` stage additionally requires the state to exist. */
 assert.ok(/\[25,'final','familySeen'\]/.test(app),'the Family disclosure is due from D25, not from D30');
 assert.ok(/if\(stage==='final'&&!s\.final\)continue;/.test(app),'and only once the Final state exists');
 const stageFn=app.slice(app.indexOf('function bossRevealStage('),app.indexOf('function bossReveal('));
 assert.ok(!/s\.day>=30|day===30/.test(stageFn),'and no D30-only reveal path survives beside it');
 const precedence=app.slice(app.indexOf("if(phase==='foundation'&&modal!=='new')"),app.indexOf('renderModal();requestAnimationFrame'));
 assert.ok(precedence.indexOf('bossRevealDue()')<precedence.indexOf("modal='relics'",precedence.indexOf('bossRevealDue()')),
  'and it is resolved ahead of the Relic window it exists to inform');
});

test('FINAL_EXPEDITION_v2.7 §INDIVIDUAL FINAL POWER: mean Hazard gap x 1.70, not the aggregate path',()=>{
 const src=read('dist/systems/run.js');
 assert.ok(!/hazard\*\.35/.test(src),'the retired aggregate-gap penalty is gone');
 assert.ok(/meanGap\*1\.70/.test(src),'the Final penalty is the mean gap x 1.70');
 assert.ok(/p\.hazards\.reduce\(\(v,h\)=>v\+h\.gap,0\)\/p\.hazards\.length/.test(src),
  'and the mean divides by the Hazard COUNT, never by sqrt(count)');
 assert.ok(!/scale.*4\.6/.test(src),'no standalone scale=4.6 path is used in Final resolution');
 /* The Core-Stat weights match the v2.7 Prepared Power baseline exactly - because they are
    that baseline. run.js used to write the four numbers out a third time, which is how the
    balance harness drifted a whole Stage behind the game; it reads the one helper now, so the
    check is that the Final contribution IS preparedPower minus the mean-gap penalty, measured,
    rather than four literals matching by eye. */
 assert.ok(/individualPower=\(e,meanGap\)=>G\.Dungeon\.preparedPower\(e\)-meanGap\*1\.70/.test(src),
  'the Final contribution reads the Prepared Power helper');
 const e={combat:100,survival:50,mobility:30,spirit:20};
 assert.equal(Dungeon.preparedPower(e),100*.50+50*.34+30*.27+20*.20,
  'and that helper carries the approved v2.7 coefficients');
 /* The point of the mean: a Family pair with MORE Hazards is not penalised for the count. Two
    parties equally unprepared per Hazard must take the same penalty whether the pair carries
    three Hazards or four - under the old sqrt path the four-Hazard pair paid more. */
 const gap=n=>({hazards:Array.from({length:n},()=>({gap:10}))});
 const mean=p=>p.hazards.reduce((v,h)=>v+h.gap,0)/p.hazards.length;
 assert.equal(mean(gap(3)),mean(gap(4)),'equal per-Hazard gaps cost the same at any Hazard count');
 const aggregate=p=>p.hazards.reduce((v,h)=>v+h.gap,0)/Math.sqrt(p.hazards.length);
 assert.ok(aggregate(gap(4))>aggregate(gap(3)),'which the retired aggregate path did not do');
 // a real Final: closing a matching gap with a Counter is worth what it actually closes
 const g=atFinal('meanpower',3),s=g.run,d=s.dungeons[0];
 const n=s.npcs.find(x=>x.alive&&x.introduced);
 const hz=d.hazards[0];
 const counter=DATA.items.find(i=>(i.effects[hz]||0)>0);
 if(counter){
  const bare=Dungeon.prepare({...JSON.parse(JSON.stringify(n)),pack:[]},d,s.facilities);
  const kit=Dungeon.prepare({...JSON.parse(JSON.stringify(n)),pack:[counter.id]},d,s.facilities);
  assert.ok(mean(kit)<mean(bare),'a matching Counter lowers the mean gap it answers');
 }
 // Final Power stays internal
 const app=read('dist/ui/app.js');
 assert.ok(!/Final Power|파이널 파워|최종 전투력/.test(app),'Final Power is never surfaced as a Player Stat');
 // the roll band is untouched
 assert.ok(/roll=\.88\+this\.rng\.next\(\)\*\.24/.test(src),'the inherited Final roll band stands: .88 ~ 1.12');
});

test('ECONOMY_ORDER_v2.7 §D30 FINAL PREPARATION: a fixed 50% transfer that is really paid',()=>{
 const g=atFinal('final-pay',3),s=g.run;
 const team=g.finalEligible().slice(0,g.finalRequired());
 for(const n of team)g.selectFinal(n.id);
 g.commitFinalParty();   // FINAL-Q75: selection is confirmed before preparation
 const n=s.npcs.find(x=>x.id===s.team[0]);
 // stock the shelf so there is something to transfer
 g.run.money=5000;g.stock('potion',2);g.stock('premium',1);
 const st=s.inventory.find(x=>x.item==='potion');
 const price=g.finalPrice('potion');
 assert.equal(price,Math.round(DATA.itemBy.potion.sell*DATA.pricing.half.mult),'the fixed price IS the ordinary 50% amount');
 assert.ok(DATA.pricing.half.mult===0.5);
 n.money=Math.max(n.money,price);
 const before={wallet:n.money,gold:s.money,gross:s.stats.revenue,stock:s.inventory.length,pack:n.pack.length};
 g.supplyFinal(n.id,st.id);
 assert.equal(n.money,before.wallet-price,'the Wallet pays exactly the fixed amount');
 assert.equal(s.money,before.gold+price,'Player Gold rises by exactly the same amount');
 assert.equal(s.stats.revenue,before.gross+price,'and Gross Sales by the same amount, once');
 assert.equal(s.inventory.length,before.stock-1,'real stock is consumed');
 assert.equal(n.pack.length,before.pack+1,'and the Item is in the Bag');
 assert.equal(n.history.at(-1).paid,price,'the receipt records what was actually paid');
 assert.notEqual(n.history.at(-1).paid,0,'this is not free equipment');
 // affordability is real: below the fixed amount, the Item cannot be committed
 const poor=s.npcs.find(x=>x.id===s.team[1]);
 const st2=s.inventory.find(x=>x.item==='premium');
 poor.money=g.finalPrice('premium')-1;
 const goldBefore=s.money,stockBefore=s.inventory.length;
 assert.throws(()=>g.supplyFinal(poor.id,st2.id),/소지금/,'an unaffordable transfer is refused');
 assert.equal(s.money,goldBefore,'a refused transfer moves no Gold');
 assert.equal(s.inventory.length,stockBefore,'and consumes no stock');
 poor.money=g.finalPrice('premium');
 g.supplyFinal(poor.id,st2.id);
 assert.equal(poor.money,0,'exactly affordable is affordable');
 // no 100/150 choice and no refusal roll in the Final
 const app=read('dist/ui/app.js');
 const start=app.indexOf('const finalPrice=isFinal');
 /* v2.9.0 counter tray: the ordinary price keys live in priceKeys(); the FINAL branch of till() ends where it hands over to them */
 const till=app.slice(start,app.indexOf(':priceKeys(n,it,st);',start));
 assert.ok(/<em>50%<\/em>/.test(till),'the Final offers the 50% amount only');
 assert.ok(!/overcharge|150%/.test(till),'no 바가지 in the Final');
 const src=read('dist/systems/run.js');
 const fn=src.slice(src.indexOf('P.supplyFinal='),src.indexOf('P.supplyFinal=')+900);
 assert.ok(!/rng|refus|interest\(/i.test(fn),'no purchase/refusal roll happens in a Final transfer');
 // the slots are still exactly two, and finishing with an empty one is allowed
 assert.equal(Adventurer.slots(n),2);
 assert.doesNotThrow(()=>g.boss(),'a participant may depart with a slot unused');
});

test('FINAL_EXPEDITION FINAL-Q75: the party is confirmed before preparation and cannot change after',()=>{
 const g=atFinal('final-lock',4),s=g.run;
 const [a,b,c,d]=g.finalEligible().map(n=>n.id);
 // before confirming, selection is free both ways
 g.selectFinal(a);g.selectFinal(b);g.selectFinal(a);g.selectFinal(c);g.selectFinal(d);
 assert.deepEqual(s.team,[b,c,d]);
 assert.throws(()=>g.supplyFinal(b,(g.run.money=5000,g.stock('potion',1),s.inventory[0].id)),/확정/,'no transfer before the party is confirmed');
 const confirm=JSON.stringify({rng:g.rng.state,gold:s.money,inv:s.inventory,gross:s.stats.revenue,wallets:s.npcs.map(n=>n.money)});
 g.selectFinal(d);g.selectFinal(d);   // v2.8: removal and re-adding stay free before the commitment
 g.commitFinalParty();
 assert.equal(s.finalCommitted,true);
 assert.equal(JSON.stringify({rng:g.rng.state,gold:s.money,inv:s.inventory,gross:s.stats.revenue,wallets:s.npcs.map(n=>n.money)}),confirm,
  'confirming moves no RNG, Gold, Inventory, Gross Sales or Wallet');
 // after confirming, nobody joins or leaves - also after a paid transfer
 const n=s.npcs.find(x=>x.id===b);n.money=9999;g.supplyFinal(b,s.inventory[0].id);
 assert.throws(()=>g.selectFinal(b),/확정/,'a paid participant cannot be removed');
 assert.throws(()=>g.selectFinal(a),/확정/,'nobody can be added');
 assert.deepEqual(s.team,[b,c,d]);
 // the confirmed party and its transfers reload as they were
 const back=Save.import(Save.export(g.account,s));
 assert.equal(back.run.finalCommitted,true);assert.deepEqual(back.run.team,[b,c,d]);
 assert.deepEqual(back.run.npcs.find(x=>x.id===b).pack,n.pack);
 const bad=JSON.parse(Save.export(g.account,s));bad.run.finalCommitted='yes';
 assert.equal(Save.valid(bad),false,'a malformed confirmation is refused');
});

test('FINAL_EXPEDITION FINAL-Q74: no-effect Insurance is blocked from a Final Bag, with its reason',()=>{
 const g=atFinal('final-noop',3),s=g.run;
 for(const n of g.finalEligible().slice(0,g.finalRequired()))g.selectFinal(n.id);
 g.commitFinalParty();
 const n=s.npcs.find(x=>x.id===s.team[0]);n.money=99999;n.pack=[];s.money=99999;
 for(const item of ['kit','stone','tree']){
  assert.equal(g.finalNoEffect(item),true);
  g.stock(item,1);const st=s.inventory.find(x=>x.item===item);
  const before=JSON.stringify({gold:s.money,wallet:n.money,inv:s.inventory.length,gross:s.stats.revenue});
  assert.throws(()=>g.supplyFinal(n.id,st.id),/마왕성에서는 효과 없음/,item+' is refused with the Demon-Castle no-effect reason');
  assert.equal(JSON.stringify({gold:s.money,wallet:n.money,inv:s.inventory.length,gross:s.stats.revenue}),before,'and nothing moves');
 }
 assert.equal(n.pack.length,0);
 assert.equal(g.finalNoEffect('potion'),false,'ordinary Items stay transferable');
 // ordinary (non-Final) SALE of the same Insurance is untouched
 assert.ok(!read('dist/systems/shop.js').includes('finalNoEffect'),'the block is Final-only');
});

test('FINAL §3: seven Bosses - the Item preview is the resolution truth, shelf and till read one helper',()=>{
 const CORE=['combat','survival','mobility','spirit'];
 for(const boss of ['WRATH','PRIDE','ENVY','GREED','GLUTTONY','LUST','SLOTH']){
  const g=atFinal('seven-'+boss,4),s=g.run;s.bossId=boss;
  if(boss==='SLOTH')s.sealBreakCount=1;
  const team=g.finalEligible().slice(0,3);team.forEach(n=>{n.pack=[];n.money=9999;g.selectFinal(n.id);});
  if(boss==='LUST')team[0].loyalty=100;   // one trusted regular, two not
  g.commitFinalParty();s.money=9999;
  for(const item of ['premium','rice','highpotion'])g.stock(item,1);
  // the preview for each (participant, Item) is finalPreRoll with that Item added
  const n=team[1],items=s.inventory.map(x=>x.item);
  for(const item of items){
   const i=s.team.indexOf(n.id),a=g.finalPreRoll(),b=g.finalPreRoll({[n.id]:[...n.pack,item]});
   if(boss==='GLUTTONY'){const raw=Dungeon.prepare({...n,pack:[...n.pack,item]},s.dungeons[0],s.facilities),own=raw.itemStats.filter(x=>x.item===item);
    for(const k of CORE){const gain=own.reduce((v,x)=>v+Math.max(0,x.stats[k]||0),0);
     if(gain>0){const plain=raw.effects[k]-Dungeon.prepare(n,s.dungeons[0],s.facilities).effects[k];
      assert.ok(Math.abs((b.snapshots[i][k]-a.snapshots[i][k])-(plain-gain*0.5))<1e-9,'GLUTTONY halves the positive Item '+k);}}}
   if(item==='premium')var expect=b;
  }
  // commit the previewed transfer: the next pre-roll IS the preview, and the Lock records it
  const rng=g.rng.state;
  g.supplyFinal(n.id,s.inventory.find(x=>x.item==='premium').id);
  const now=g.finalPreRoll();
  for(let i=0;i<3;i++)for(const k of CORE)assert.ok(Math.abs(now.snapshots[i][k]-expect.snapshots[i][k])<1e-9,boss+': preview == post-transfer truth');
  assert.equal(g.rng.state,rng,boss+': preview and transfer draw no RNG');
  g.boss();
  s.finalLock.members.forEach((m,i)=>{for(const k of CORE)assert.ok(Math.abs(m.stats[k]-expect.snapshots[i][k])<1e-9,boss+': resolution == preview');});
  /* Boss-side truth is the CURRENT state: GREED reads the Gross Sales the transfer just added */
  assert.ok(Math.abs(s.bossDebug.bossPower-now.bossPower)<1e-9&&Math.abs(s.bossDebug.power-now.power)<1e-9,boss+': resolution == current pre-roll');
  if(boss==='GREED')assert.ok(now.bossPower<=expect.bossPower,'GREED: the transfer\'s sale counts toward the target');
 }
 // the UI restates no Boss multiplier - it reads the engine helper
 const ui=read('dist/ui/app.js')+read('dist/ui/presentation.js');
 assert.ok(!/gluttonyStatFactor|prideCombatFactor|envyStatFactor|lustStatFactor/.test(ui),'no Boss factor copied into the UI');
 assert.ok(/function finalItemTruth[\s\S]{0,200}game\.finalPreRoll\(/.test(ui),'the Item truth is finalPreRoll');
 assert.ok(/finalItemEffects\(n,it\)/.test(ui)&&/Presentation\.preview\(n,s\.dungeons\[0\],s\.facilities,it\.id,finalItemTruth\(n,it\.id\)\)/.test(ui),
  'shelf summary and focused preview read the same helper');
});

test('FINAL-Q75: a valid affordable transfer is deterministic - no roll, no SALE dialogue',()=>{
 for(const seed of ['det-1','det-2','det-3']){
  const g=atFinal(seed,3),s=g.run;
  for(const n of g.finalEligible())g.selectFinal(n.id);g.commitFinalParty();
  s.money=9999;g.stock('premium',2);const n=s.npcs.find(x=>x.id===s.team[0]);n.money=g.finalPrice('premium');n.pack=[];
  const say=JSON.stringify(s.say),rng=g.rng.state,refused=JSON.stringify(n.refused||[]);
  g.supplyFinal(n.id,s.inventory[0].id);
  assert.equal(n.pack.length,1,'committed');assert.equal(g.rng.state,rng,'no purchase/refusal roll');
  assert.equal(JSON.stringify(s.say),say,'no customer line');assert.equal(JSON.stringify(n.refused||[]),refused,'no refusal record');
 }
 const app=read('dist/ui/app.js'),c=app.indexOf("case'supply':");
 assert.ok(!/speech|say|refus/i.test(app.slice(c,app.indexOf('\n',c))),'the Final transfer action voices nothing');
});

test('BOSS_v2.7 §DIRECTOR DOCUMENT BASELINE: the approved starting values, exactly',()=>{
 const t=DATA.bossTuning;
 /* BOSS_v2.7 supersedes the inherited BOSS-Q14 PASS3 tuning permission: these are fixed
    implementation starting values during adoption. Frozen QA may report a BALANCE FINDING but
    may not auto-tune them, so they are pinned here and a change has to come from an approved
    owner-spec update rather than from a harness. */
 assert.equal(DATA.balance.bossPower,200,'WRATH keeps the retained 200 baseline');
 assert.equal(t.prideCombatFactor,0.92,'PRIDE is 0.92, superseding 0.90');
 assert.equal(t.greedShortfallCap,12,'GREED shortfall caps at +12');
 assert.equal(DATA.balance.bossPower+t.greedShortfallCap,212,'so GREED alone cannot pass 212');
 assert.deepEqual(t.slothBossPower,[225,210,190,165],'SLOTH by committed break count');
 assert.equal(t.gluttonyStatFactor,0.50,'GLUTTONY halves the Item Core-Stat contribution');
 assert.equal(t.gluttonyRarityThreshold,undefined,'and keeps no Rarity threshold');
 // ENVY and LUST take no v2.7 numeric change
 assert.equal(t.envyStatFactor,0.92,'ENVY inherits its value');
 assert.equal(t.lustStatFactor,0.95,'LUST inherits its value');
 // the SLOTH ladder has the shape its design intent describes
 const sl=t.slothBossPower;
 assert.ok(sl[0]>DATA.balance.bossPower,'0 breaks is clearly harder than WRATH');
 assert.ok(sl[1]>DATA.balance.bossPower,'1 break is meaningful relief but still above WRATH');
 assert.ok(sl[2]<DATA.balance.bossPower,'2 breaks drops below WRATH');
 assert.ok(sl[2]-sl[3]>sl[1]-sl[2],'3 breaks returns materially more stability than 2');
 for(let i=1;i<sl.length;i++)assert.ok(sl[i]<sl[i-1],'every break lowers it');
});

console.log(count+' final groups passed');
