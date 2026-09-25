// Chunk G acceptance: the Save contract, determinism, save→load→continue equivalence and
// the Night Skip contract. Covers CORE_RUN §SAVE/LOAD §GATE/DUNGEON STATE §RUN RANDOMNESS,
// CORE_RUN_QA RUN-Q10/Q11/Q12/Q13/Q19/Q20 and NIGHT_CLOSING §SKIP CONTRACT §SAVE/RESUME.
// These drive the real engine: a round trip is asserted by continuing the run, never by
// comparing serialised shape alone.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const copy=x=>JSON.parse(JSON.stringify(x));
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const source=p=>require('node:fs').readFileSync(require('node:path').resolve(__dirname,'..',p),'utf8');

// A deterministic driver: given the same state it always takes the same action, so any
// difference between two runs is the engine's, never the script's.
function step(g){
 const s=g.run;
 switch(s.phase){
  case'foundation':g.buyRelic(s.relicWindow.candidateIds[0]);return true;
  case'morning':g.beginOrder();return true;
  case'order':{
   for(let i=0;i<s.offers.length;i++){const o=s.offers[i];if(!o.quantity)continue;
    try{if(s.money-g.cartTotal()-o.price>=400)g.setQuantity(i,1);}catch(e){}}
   g.finishOrder();return true;}
  case'sell':{
   const n=g.current();
   for(const st of [...s.inventory]){
    if(n.pack.length>=Adventurer.slots(n))break;
    try{g.sell(st.id,'full');}catch(e){}}
   g.depart();return true;}
  case'night':g.finishNight();return true;
  /* closeDay refuses while the till is short and offers stock clearance instead - the same
     choice the Closing screen puts in front of the player. The driver has to take it, or a Run
     that goes into the red simply never advances. With nothing left to clear, the store closes. */
  case'closing':{
   if(g.closeDay()!==false)return true;
   if(s.inventory.length){g.liquidate(s.inventory[0].id);return true;}
   g.end(false,'운영비를 충당하지 못해 이번 점포를 마감했습니다.');return true;}
  case'final':{
   const team=s.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery).sort((a,b)=>b.level-a.level).slice(0,g.finalRequired());
   for(const n of team)g.selectFinal(n.id);
   if(team.length){g.commitFinalParty();g.boss();}else g.end(false,'출전 가능한 모험가 없음');
   return true;}
  default:return false;}
}
function play(g,limit=4000){let turns=0;while(g.run.phase!=='end'&&turns++<limit)if(!step(g))break;return g;}
function fresh(seed){const g=new Game();g.autosave=false;g.start(seed);return g;}
// Drive a Run to the Sale phase of one of its own Deep Days, with a customer at the counter.
function drivenToDeepSale(){
 for(let i=0;i<60;i++){
  const g=fresh('deep-sale-'+i);
  for(let n=0;n<400&&g.run.phase!=='end';n++){
   const s=g.run;
   if(s.phase==='sell'&&s.deep.today&&g.current()&&!g.current().pack.length
      &&!g.current().history.some(h=>h.day===s.day))return g;
   if(!step(g))break;
  }
 }
 throw Error('no Run reached the Sale phase of a Deep Day');
}
/* CONTROLLED D30 SETUP. Whether a fresh Account survives 30 Days under its own power is a
   balance question measured on a cross-run trajectory, not a precondition for testing what the
   Final generates and persists - so this driver removes the two things that can end a Run early
   rather than re-rolling seeds until one happens to survive. Every Day is played normally
   (Order, arrivals, Closing) except that the till is held solvent and nobody is sent into a
   Gate, so the D30 state is reached for certain. It proves nothing about survivability. */
function controlledStep(g){
 const s=g.run;
 s.money=Math.max(s.money,5000);  // controlled: the economy is not the subject here
 if(s.phase==='sell'){
  // everyone still meets the player at the counter; nobody departs into a Gate
  while(s.cursor<s.queue.length-1)g.depart();
  s.queue=[];g.depart();
  return true;
 }
 return step(g);
}
function controlledPlay(g,limit=6000){let t=0;while(g.run.phase!=='end'&&t++<limit)if(!controlledStep(g))break;return g;}
function controlledToFinal(prefix){
 const g=fresh(prefix);g.buyRelic(g.run.relicWindow.candidateIds[0]);
 for(let n=0;n<6000&&g.run.day<30&&g.run.phase!=='end';n++)if(!controlledStep(g))break;
 if(g.run.phase!=='final')throw Error('the controlled D30 setup did not reach the Final: '+g.run.phase+' D'+g.run.day);
 return g;
}
function reload(g){g.save();const s=Save.import(Save.export(g.account,g.run));const h=new Game(s.account,s.run);h.autosave=false;return h;}

// --- SAVE CONTRACT -----------------------------------------------------------------

test('CORE_RUN §SAVE/LOAD: every persisted v2.4 field survives, and a damaged one is refused',()=>{
 const g=fresh('save-contract');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 while(g.run.phase!=='sell')step(g);
 g.run.event={...DATA.events[0]};g.run.eventSeen=false;
 g.run.special={kind:'route',used:false,candidates:[]};
 g.save();
 const raw=JSON.parse(Save.export(g.account,g.run));
 assert.ok(Save.valid(raw),'a live run validates');
 const round=Save.import(Save.export(g.account,g.run));
 for(const key of ['relicWindow','dungeons','offers','inventory','npcs','queue','cart','event','special','stats','daily','pity'])
  assert.deepEqual(round.run[key],g.run[key],key+' round-trips byte for byte');
 assert.equal(round.run.eventSeen,false,'the Event reveal is still pending after a reload');
 assert.equal(round.run.rngState,g.rng.state,'the RNG position is persisted, not re-seeded');
 assert.deepEqual(round.account.tutorial,g.account.tutorial,'tutorial state round-trips');
 // Each clause is load-bearing: break exactly one field and the save must be refused.
 const broken=(mutate)=>{const s=copy(raw);mutate(s);return Save.valid(s);};
 assert.equal(broken(s=>s.run.relicWindow.focusedRevealSeen='yes'),false,'reveal flag must be boolean');
 assert.equal(broken(s=>s.run.relicWindow.milestoneDay=7),false,'a window day outside D0/5/10/15/20/25/30 is refused');
 assert.equal(broken(s=>s.run.relicWindow.candidateIds[0]='not-a-relic'),false,'unknown relic id refused');
 assert.equal(broken(s=>s.run.event={id:'not-an-event'}),false,'unknown Event id refused');
 assert.equal(broken(s=>s.run.eventSeen=1),false,'the reveal flag must be boolean');
 assert.equal(broken(s=>s.run.nightCursor=s.run.results.length+3),false,'a Night cursor past the reports is refused');
 assert.equal(broken(s=>s.run.cursor=s.run.queue.length+1),false,'a sale cursor past the queue is refused');
 assert.equal(broken(s=>s.account.tutorial='skipped'),false,'tutorial state must be an object');
 assert.equal(broken(s=>s.run.special={kind:'route'}),false,'a half-written guild offer is refused');
 assert.equal(broken(s=>s.run.dungeons[0].hazards.push('slow')),false,'a legacy Hazard key is refused');
});

test('CORE_RUN §SAVE/LOAD: the Final state a D30 run generated is part of the save',()=>{
 const g=controlledToFinal('save-final');
 assert.equal(g.run.phase,'final','the driver reached the Final');
 const round=Save.import(Save.export(g.account,g.run));
 assert.deepEqual(round.run.final,g.run.final,'the generated Final survives');
 assert.equal(round.run.final.families.length,2);
 const broken=copy(JSON.parse(Save.export(g.account,g.run)));
 broken.run.final.families=[broken.run.final.families[0],broken.run.final.families[0]];
 assert.equal(Save.valid(broken),false,'a duplicated Family pair is refused');
 step(g);
 assert.equal(g.run.phase,'end');
 const ended=JSON.parse(Save.export(g.account,g.run));
 assert.ok(Save.valid(ended),'a finished run still validates');
 assert.ok(ended.run.finalReport,'the Final report is persisted');
 ended.run.win=undefined;
 assert.equal(Save.valid(ended),false,'an ended run without a verdict is refused');
});

test('CORE_RUN §SAVE/LOAD: a v2.4 save is never read as a v2.5 save',()=>{
 const store=new Map();
 global.localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
 try{
  const g=fresh('v5-reject');
  // what v2.4 actually wrote: its own version, its own key, and no Boss on the run
  const account={version:1,xp:0,grade:1,unlocked:[],knowledge:{},progress:{},discovered:[],
   runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true},lastUnlocks:[]};
  const run={...g.run,version:5};delete run.bossId;delete run.bossReveal;
  for(const [label,payload] of [
   ['an in-progress run',JSON.stringify({version:5,account,run})],
   ['an account-only save',JSON.stringify({version:5,account,run:null})]]){
   store.clear();Save.error=null;
   store.set('guild24.save.v5',payload);
   assert.equal(Save.read(),null,label+' written by v2.4 does not load');
   assert.ok(Save.error&&/새 점포/.test(Save.error),label+': the player is told, not shown an error code');
   assert.equal(store.get('guild24.save.v5'),payload,label+': the v5 bytes are left untouched');
   assert.equal(store.get('guild24.save.v8'),undefined,label+': nothing is migrated into the v7 key');
  }
  // the same shape is refused by the validator itself, not only by the key it sits under
  assert.equal(Save.valid({version:5,account,run:null}),false,'a v5 payload is not a valid v6 save');
  assert.equal(Save.valid({version:6,account,run}),false,'a run with no Boss is refused');
 }finally{delete global.localStorage;}
});

test('CORE_RUN §SAVE/LOAD: an older schema is refused cleanly and the original bytes are preserved',()=>{
 const store=new Map();
 global.localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
 try{
  const g=fresh('v4-reject');
  const legacy=JSON.stringify({version:4,account:g.account,run:g.run});
  store.set('guild24.save.v4',legacy);
  Save.error=null;
  assert.equal(Save.read(),null,'a v4 save does not load');
  assert.ok(Save.error&&/새 점포/.test(Save.error),'the player is told in their own language, not with an error code');
  assert.equal(store.get('guild24.save.v4'),legacy,'the v4 bytes are left untouched');
  // A v6 write over an existing v6 save keeps the previous bytes under .backup.
  g.autosave=true;g.save();
  const first=store.get('guild24.save.v8');
  g.run.money+=1;g.save();
  assert.equal(store.get('guild24.save.v8.backup'),first,'the previous save is preserved as a backup');
  assert.equal(store.get('guild24.save.v4'),legacy,'the v4 bytes are still there afterwards');
  // A corrupted head falls back to the backup rather than losing the run.
  store.set('guild24.save.v8','{not json');
  const recovered=Save.read();
  assert.ok(recovered&&recovered.version===8,'the backup is read when the head is unreadable');
  assert.equal(recovered.run.money,g.run.money-1,'the recovered run is the previous save, not an invention');
 }finally{delete global.localStorage;}
});

test('CORE_RUN §CURRENT RUN ABANDON: starting a new Run settles nothing from the old one',()=>{
 // The engine contract, checked where the abandon actually happens: start() on a Game that
 // already has a live run. app.js reaches this by calling start() and nothing else.
 const g=fresh('abandon');
 for(let i=0;i<40&&g.run.phase!=='end';i++)step(g);   // play far enough to have something to lose
 assert.ok(g.run.day>1,'the precondition is a run with progress in it');
 g.account.matrix.warrior.WRATH=true;g.account.knowledge.snow=3;
 g.account.tutorial.skipped=true;g.account.settings.muted=false;
 const before=copy(g.account),liveRun=g.run;

 g.start('abandon-next');

 assert.deepEqual(copy(g.account),before,'the abandoned Run credits the account with nothing at all');
 assert.equal(g.account.runs,before.runs,'runs does not count an abandoned Run');
 assert.equal(g.account.wins,before.wins,'and neither does wins');
 assert.equal(liveRun.rewarded,false,'Meta.finish never ran: the settle-once guard is still unset');
 assert.equal(liveRun.phase!=='end',true,'the old Run was discarded, not ended through the settlement path');
 // Account-scoped state survives; run-scoped state is a fresh Run, not a patched old one.
 assert.equal(Meta.totalJobMastery(g.account),1,'Job Mastery is exactly what was already earned');
 assert.deepEqual(g.account.knowledge,before.knowledge,'Monster Knowledge is preserved');
 assert.equal(g.account.knowledge.snow,3,'including what the abandoned Run itself had recorded');
 assert.deepEqual(g.account.tutorial,{skipped:true},'so is Tutorial completion');
 assert.equal(g.account.settings.muted,false,'and Settings');
 assert.equal(g.run.day,1,'the new Run starts at Day 1 through the ordinary fresh-Run path');
 assert.notEqual(g.run.seed,liveRun.seed,'it is a new Run, not the old one rewound');

 // A Run that really ends still settles: abandon is not a way to disable settlement.
 const h=fresh('settles');
 h.end(false,'운영비를 지급하지 못해 폐점했습니다.');
 assert.equal(h.account.runs,1,'an ordinary end still counts the Run');
 assert.equal(h.run.rewarded,true,'and still settles exactly once');
});

test('CORE_RUN §SAVE/LOAD: a full data reset leaves a true first launch behind',()=>{
 const store=new Map();
 global.localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
 try{
  const g=fresh('reset');
  // an account that has actually progressed, plus a run in flight and every legacy key present
  g.account.matrix.warrior.WRATH=true;g.account.knowledge.snow=4;g.account.tutorial.skipped=true;
  g.account.runs=3;g.autosave=true;g.save();
  for(const v of ['v1','v2','v3','v4','v5'])store.set('guild24.save.'+v,'{"version":'+v.slice(1)+'}');
  g.run.money+=1;g.save();   // so the .backup key exists too
  assert.ok(store.get('guild24.save.v8')&&store.get('guild24.save.v8.backup'),'the precondition is a real save');

  assert.equal(Save.reset(),true,'the reset reports success');
  assert.equal(store.size,0,'every key this game owns is gone - current, backup and legacy alike');

  // What a player does next: a fresh account, then a reload. Nothing comes back.
  Save.error=null;
  assert.equal(Save.read(),null,'there is nothing left to read');
  assert.equal(Save.error,null,'and no leftover legacy key makes it warn about an older save');
  const after=Meta.fresh();
  assert.equal(Meta.totalJobMastery(after),0,'Job Mastery is back to zero');
  assert.equal(Meta.distinctBossClear(after),0,'so is Distinct Boss Clear');
  assert.equal(Meta.storeCapital(after),0,'Store Capital is back to zero');
 assert.deepEqual(Meta.ownedDecorations(after),[],'and every Decoration is unowned again');
  assert.deepEqual(after.knowledge,{},'Monster Knowledge is gone');
  assert.deepEqual(after.tutorial,{},'and the guide is offered again, with no reset-only code to do it');
  assert.equal(after.runs,0,'the run count does not survive either');
  // The reset is the only destructive path: it never invents a partial variant.
  assert.equal(typeof Save.reset,'function');
  assert.equal(Object.keys(Save).filter(k=>/reset/i.test(k)).length,1,'there is exactly one reset entry point');
 }finally{delete global.localStorage;}
});

test('DUNGEON_HAZARD / CORE_RUN §DEEP EXPEDITION: the schedule and the Gate are decided once',()=>{
 /* SA-Q42 acceptance: the occurrence count is exactly 2 or 3, weighted 50/50. The odds live
    in DATA.deepTuning.threeOccurrenceChance and the schedule is drawn on its own ':deep' RNG,
    so a wide seed sweep is the honest way to read the weighting back out. */
 assert.equal(DATA.deepTuning.threeOccurrenceChance,.5,'Deep occurrence is weighted 50/50');
 {let three=0;const N=400;
  for(let i=0;i<N;i++){const d=fresh('deep-odds-'+i).run.deep.days;
   assert.ok(d.length===2||d.length===3,'Deep occurrence is exactly 2 or 3');
   if(d.length===3)three++;}
  assert.ok(Math.abs(three/N-.5)<.08,'the three-occurrence share sits on the 50/50 weighting, saw '+three+'/'+N);}
 for(let i=0;i<40;i++){
  const g=fresh('deep-'+i),d=g.run.deep.days;
  assert.ok(d.length===2||d.length===3,'exactly two or three occurrences');
  assert.equal(new Set(d).size,d.length,'no Day twice');
  assert.ok(d.every(x=>[7,14,21,28].includes(x)),'only the four candidate windows');
  assert.ok(d.some(x=>x===7||x===14),'at least one of D7/D14');
  assert.ok(d.some(x=>x===21||x===28),'at least one of D21/D28');
  assert.deepEqual(fresh('deep-'+i).run.deep.days,d,'the same seed schedules the same Days');
  assert.deepEqual(reload(g).run.deep.days,d,'and a reload does not re-roll them');
 }
});

test('DUNGEON_HAZARD §DEEP EXPEDITION: only the required Power changes, and only for the nominee',()=>{
 {
  const g=drivenToDeepSale();
  const t=g.run.deep.today,base=g.run.dungeons[t.gateIndex],n=g.current();
  g.run.money=5000;
  assert.ok(g.canNominateDeep(n),'an untraded current visitor can be nominated');
  const moneyBefore=g.run.money,cost=g.deepCost(n);
  g.nominateDeep(n.id);
  assert.equal(g.run.money,moneyBefore-cost,'the sponsorship is charged exactly once');
  assert.equal(g.run.deep.today.nomineeId,n.id,'today is assigned');
  // SALE step 5 (User decision 2026-09-23): the pre-supply outlook is re-taken against the Deep Gate
  assert.equal(n.outlook.combat,Dungeon.estimate({...n},g.gateFor(n),g.run.facilities),'the shown Combat Forecast reads the Deep requirement');
  assert.equal(n.outlook.deathRisk,Dungeon.failureDeathRisk({...n},g.gateFor(n),g.run.facilities).chance,'and so does the failure-conditioned Death risk');
  assert.equal(typeof g.unnominateDeep,'undefined','and there is no way to cancel the nomination');

  const deep=g.gateFor(n);
  assert.equal(deep.family,base.family,'Family is the base Gate\'s');
  assert.equal(deep.tier,base.tier,'so is Tier');
  assert.deepEqual(deep.hazards,base.hazards,'and the Hazard set');
  assert.equal(deep.power,base.power*DATA.deepTuning.powerFactor,'only the required Power rises');
  assert.equal(deep.deep,true,'and it is marked as the Deep variant');
  // the forecast the player reads and the Gate the night resolves are the same object
  assert.deepEqual(g.claimedGateFor(n),deep,'the shown Gate is the resolved Gate');
  // everyone else walks into their ordinary Gate
  for(const other of g.run.npcs)if(other.id!==n.id)
   assert.ok(!g.gateFor(other)?.deep,'a Deep Gate is not handed to anyone else: '+other.name);

  // a confirmed Deep destination is not overwritten by a later reassignment
  if(g.run.dungeons.length>1){
   n.destination=n.destination===0?1:0;
   assert.equal(g.gateFor(n).power,deep.power,'a later destination change does not move the nominee');
  }
  // and nobody else can be nominated afterwards
  assert.equal(g.deepOffer(),null,'there is nothing left to offer once today is assigned');
  const reloaded=reload(g);
  assert.equal(reloaded.run.deep.today.nomineeId,n.id,'the nomination survives a reload');
  assert.equal(reloaded.run.deep.today.paid,cost,'and so does the sponsorship, without refund');
  assert.equal(reloaded.deepOffer(),null,'a reload cannot reopen a spent nomination');
 }
});

test('ECONOMY_ORDER §DEEP EXPEDITION SPONSORSHIP: the price is the adventurer, and nothing else',()=>{
 const g=fresh('cost'),t=DATA.deepTuning;
 const cost=(rarity,level)=>g.deepCost({rarity,level});
 // exactly the approved starting formula, rounded to a readable step
 for(const rarity of [0,1,2,3,4])for(const level of [1,3,7,12,20]){
  const raw=t.sponsorBase*(1+t.sponsorRarityStep*rarity)*(1+t.sponsorLevelStep*(level-1));
  assert.equal(cost(rarity,level),Math.round(raw/t.sponsorRounding)*t.sponsorRounding,
   'r'+rarity+' Lv.'+level);
  assert.equal(cost(rarity,level)%t.sponsorRounding,0,'and lands on the rounding step');
 }
 // it rises with both axes, so who you send is a real decision
 for(const level of [1,10,20])for(const r of [0,1,2,3])
  assert.ok(cost(r+1,level)>cost(r,level),'a rarer adventurer costs more at Lv.'+level);
 for(const rarity of [0,2,4])for(const lv of [1,5,10,15])
  assert.ok(cost(rarity,lv+1)>=cost(rarity,lv),'an abler adventurer never costs less at r'+rarity);
 // and it reads nothing else: not the Gate, the Day, the Deep Power or any item price
 const before=cost(2,10);
 g.run.day=29;g.run.dungeons.forEach(d=>{d.tier=3;d.power*=4;d.reward*=3;});
 const keep=t.powerFactor;t.powerFactor=9;
 try{assert.equal(cost(2,10),before,'the price does not move with Day, Tier, reward or Deep Power');}
 finally{t.powerFactor=keep;}
});

test('SALE §DEEP EXPEDITION NOMINATION: the current visitor only, and only before they trade',()=>{
 {
  const g=drivenToDeepSale(),n=g.current();
  g.run.money=5000;
  const other=g.run.npcs.find(x=>x.id!==n.id);
  assert.equal(g.canNominateDeep(other),false,'someone who is not at the counter cannot be nominated');
  assert.throws(()=>g.nominateDeep(other.id),'and asking anyway is refused');
  // once they have bought something today the window is closed
  n.history.push({day:g.run.day,item:'rice',mode:'full',paid:10});
  assert.equal(g.canNominateDeep(n),false,'not after the first committed transaction');
  n.history.pop();
  // and the Store must be able to pay
  const money=g.run.money;g.run.money=10;
  assert.equal(g.canNominateDeep(n),false,'not without the sponsorship in the till');
  g.run.money=money;
  assert.equal(g.canNominateDeep(n),true,'otherwise it is offered, with no Job or Level gate');
  // skipping costs nothing at all
  g.depart();
  assert.equal(g.run.deep.today.nomineeId,null,'skipping leaves today unassigned');
  assert.equal(g.run.deep.today.paid,0,'and charges nothing');
 }
});

test('NPC_TRAIT §DEEP EXPEDITION NPC REWARD: the return is the NPC\'s, and the Store gets nothing',()=>{
 /* SA-Q42 acceptance. This used to overwrite DATA.deepTuning with a harness-local
    40/90/60/150 before asserting it back, so the production baseline was never checked.
    The approved v2.8 baseline is read from the owner data instead, and the Canonical
    relation - a Great Success Deep bonus is exactly 2x the Success bonus - is asserted
    on top of it. The other approved Deep tuning must stay where the owner put it. */
 const t=DATA.deepTuning;
 assert.deepEqual([t.successExp,t.greatExp,t.successWallet,t.greatWallet],[40,80,60,120],
  'the approved v2.8 Deep reward baseline');
 assert.equal(t.greatExp,t.successExp*2,'Great Success Deep EXP is exactly 2x Success');
 assert.equal(t.greatWallet,t.successWallet*2,'Great Success Deep Wallet is exactly 2x Success');
 /* ECONOMY_ORDER_v2.8 §DEEP SPONSORSHIP / SA-Q50: sponsorBase 350 -> 200 for accessibility.
    Rarity step, Level step and rounding are unchanged. */
 assert.deepEqual([t.powerFactor,t.threeOccurrenceChance,t.sponsorBase,t.sponsorRarityStep,
                   t.sponsorLevelStep,t.sponsorRounding],[1.5,.5,200,.20,.05,10],
  'the other approved Deep tuning is unchanged except the approved SA-Q50 sponsorBase');
 const scale=DATA.greatSuccess.storeGoldScale;DATA.greatSuccess.storeGoldScale=.5;
 try{
  let checked=0;
  for(let i=0;i<40&&checked<3;i++){
   let g;try{g=drivenToDeepSale();}catch(e){break;}
   g.run.money=5000;
   const n=g.current(),before={money:g.run.money,wallet:n.money,xp:n.xp,level:n.level};
   g.nominateDeep(n.id);
   const paid=before.money-g.run.money;
   while(g.run.phase==='sell')g.depart();
   const rep=g.run.results.find(r=>r.npcId===n.id);
   if(!rep)continue;
   checked++;
   assert.ok(rep.deep,'the result knows it was a Deep Expedition');
   assert.equal(rep.storeBonus,0,'a Deep Expedition returns the Store no Gold, 대성공 included');
   if(['성공','대성공'].includes(rep.outcome)){
    const great=rep.outcome==='대성공';
    assert.equal(rep.deep.bonusXp,great?t.greatExp:t.successExp,'the EXP bonus has two bands and no Day/Tier multiplier');
    assert.equal(rep.deep.bonusWallet,great?t.greatWallet:t.successWallet,'and so does the Wallet bonus');
    assert.ok(n.money>=before.wallet+rep.deep.bonusWallet-rep.loot||n.money>before.wallet,
     'the Wallet bonus lands in the ordinary persisted money channel');
   }else{
    assert.equal(rep.deep.bonusXp,0,'a failed outcome earns no special Deep EXP');
    assert.equal(rep.deep.bonusWallet,0,'and no special Deep Wallet');
   }
   assert.ok(paid>0,'the sponsorship left the till');
   assert.ok(!('deepWallet' in n),'no second Wallet pool was created');
  }
  assert.ok(checked>0,'at least one Deep Expedition actually resolved');
 }finally{DATA.greatSuccess.storeGoldScale=scale;}
});

/* SA-Q43 retired the route support, which was the only explicit Player destination
   reassignment in Source. What survives of this case is the half that is Canonical: a
   confirmed Deep destination is final, and it is final because nothing else can write
   n.destination after the nomination. */
test('SALE §DEEP EXPEDITION NOMINATION: a confirmed Deep destination is final, and nothing can reassign it',()=>{
 const h=drivenToDeepSale(),m=h.current();
 h.nominateDeep(m.id);
 assert.equal(h.run.deep.today.nomineeId,m.id,'the nomination is the only Deep state');
 assert.equal(h.gateFor(m).deep,true,'the nominee walks into the Deep Gate');
 assert.equal(h.canNominateDeep(m),false,'and cannot be nominated twice');
 const src=source('dist/systems/shop.js')+source('dist/systems/run.js')+source('dist/ui/app.js');
 assert.ok(!/specialAction/.test(src),'the retired reassignment action is gone');
 assert.ok(!/special\?\.kind==='route'/.test(src),'and no Deep guard still reads it');
});

// --- DETERMINISM -------------------------------------------------------------------

test('CORE_RUN §RUN RANDOMNESS: the same seed and the same inputs produce the same run',()=>{
 for(const seed of ['det-1','det-2','det-3']){
  const a=play(fresh(seed)),b=play(fresh(seed));
  assert.deepEqual(b.run,a.run,seed+': identical run state');
  assert.deepEqual(b.account,a.account,seed+': identical account state');
 }
 // A different seed must actually diverge, or the check above proves nothing.
 const x=play(fresh('det-1')),y=play(fresh('det-9'));
 assert.notDeepEqual(y.run,x.run,'different seeds produce different runs');
});

test('RUN-Q19 / RUN-Q20: save → load → continue equals an uninterrupted run, at every phase',()=>{
 const phases=['foundation','morning','order','sell','night','closing','final'];
 /* The Final phase only exists on a Run that is standing at D30, which a fresh Account under
    this scripted policy does not reach under its own power - and whether it does is a balance
    question, not part of the save contract. That one phase is therefore driven on the
    controlled D30 setup, the same deterministic driver on both sides of the cut, so the
    save/load claim is the thing being tested rather than a seed's luck. */
 for(const at of phases){
  const controlled=at==='final';
  const seed='resume-'+at;
  const advance=controlled?controlledStep:step,finish=controlled?controlledPlay:play;
  const straight=finish(fresh(seed));
  const g=fresh(seed);
  let turns=0,cut=false;
  while(g.run.phase!=='end'&&turns++<6000){
   if(!cut&&g.run.phase===at){cut=true;const h=reload(g);
    assert.deepEqual(h.run,g.run,at+': the reloaded run is the same run');
    assert.equal(h.rng.state,g.rng.state,at+': the RNG resumes where it stopped');
    finish(h);
    assert.deepEqual(h.run,straight.run,at+': continuing from the save lands on the same run');
    assert.deepEqual(h.account,straight.account,at+': and on the same account');
    break;}
   if(!advance(g))break;
  }
  assert.ok(cut,at+': the phase was actually reached and cut at');
 }
});

test('RUN-Q10 / RUN-Q11 / RUN-Q12: reload is not a Gate, Order or Relic reroll',()=>{
 const g=fresh('no-reroll');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 for(let day=0;day<6;day++){
  while(g.run.phase!=='order')step(g);
  const gate=copy(g.run.dungeons),offers=copy(g.run.offers),window=copy(g.run.relicWindow),money=g.run.money;
  for(let again=0;again<3;again++){
   const h=reload(g);
   assert.deepEqual(h.run.dungeons,gate,'Gate/Family/Tier state is unchanged by a reload');
   assert.deepEqual(h.run.offers,offers,'the current offer state is unchanged by a reload');
   assert.deepEqual(h.run.relicWindow,window,'the Relic candidates and prices are unchanged by a reload');
   assert.equal(h.run.money,money,'a reload does not move Gold');
  }
  // A canonical reroll action is the only thing that may replace the offers.
  const before=copy(g.run.offers);
  g.reroll();
  assert.notDeepEqual(g.run.offers,before,'the canonical Full-offer Reroll does replace the offers');
  step(g);
 }
});

test('RUN-Q13 / NIGHT_CLOSING §SAVE/RESUME: a reload mid-report neither changes nor duplicates a result',()=>{
 const g=fresh('night-resume');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 let nights=0;
 while(g.run.phase!=='end'&&nights<6){
  while(g.run.phase!=='night'&&g.run.phase!=='end')step(g);
  if(g.run.phase!=='night')break;
  nights++;
  const results=copy(g.run.results),npcs=copy(g.run.npcs),money=g.run.money,
   matrix=copy(g.account.matrix),knowledge=copy(g.account.knowledge),deaths=g.run.stats.deaths;
  for(let cursor=0;cursor<=g.run.results.length;cursor++){
   g.run.nightCursor=cursor;
   const h=reload(g);
   assert.deepEqual(h.run.results,results,'outcome, EXP, loot, injury and death are stable across a reload');
   assert.deepEqual(h.run.npcs,npcs,'no NPC state is recalculated on resume');
   assert.equal(h.run.money,money,'no Closing revenue is duplicated');
   assert.equal(h.run.stats.deaths,deaths,'no death is counted twice');
   assert.deepEqual(h.account.matrix,matrix,'no progression cell is written twice');
   assert.deepEqual(h.account.knowledge,knowledge,'no Knowledge is duplicated');

   assert.equal(h.run.nightCursor,cursor,'the reading position is what resumes, not the resolution');
  }
  g.run.nightCursor=0;
  step(g);
 }
 assert.ok(nights>=3,'several Nights were exercised');
});

// --- SKIP CONTRACT -----------------------------------------------------------------

test('NIGHT_CLOSING §SKIP CONTRACT: "다음" and "전체 건너뛰기" only, no single skip, nightSkip removed', () => {
  assert.equal(Presentation.nightSkip, undefined, 'nightSkip API must be completely removed');
  
  const app = require('fs').readFileSync('dist/ui/app.js', 'utf8');
  assert.ok(app.includes("btn('전체 건너뛰기'"), '전체 건너뛰기 UI button must exist');
  assert.ok(app.includes("'다음'"), '다음 UI button must exist');
  assert.ok(!app.includes("btn('건너뛰기'"), 'No standalone skip button');
});


test('NIGHT_CLOSING §SKIP CONTRACT: reading every beat and skipping every beat end the same day',()=>{
 const read=fresh('skip-equal'),skip=fresh('skip-equal');
 read.buyRelic(read.run.relicWindow.candidateIds[0]);
 skip.buyRelic(skip.run.relicWindow.candidateIds[0]);
 for(let day=0;day<8;day++){
  while(read.run.phase!=='night'&&read.run.phase!=='end')step(read);
  while(skip.run.phase!=='night'&&skip.run.phase!=='end')step(skip);
  if(read.run.phase!=='night')break;
  // One reads every report; the other skips straight to Closing.
  for(let i=0;i<=read.run.results.length;i++)read.run.nightCursor=i;
  read.finishNight();
  skip.run.nightCursor=skip.run.results.length;
  skip.finishNight();
  assert.deepEqual(skip.run.results,read.run.results,'the same reports');
  assert.equal(skip.run.money,read.run.money,'the same Gold');
  assert.deepEqual(skip.account,read.account,'the same Meta state');
  step(read);step(skip);
 }
 assert.deepEqual(skip.run.npcs,read.run.npcs,'and the same roster afterwards');
});

test('CORE_RUN §SAVE/LOAD: the validator reads as named checks, and each one still bites',()=>{
 // Save.valid was one 5,278-character line of 126 conditions — the function that guards
 // save integrity, and the one this project keeps extending. It is now named checks. This
 // pins the readability so it cannot silently collapse back, and re-asserts that the
 // clauses still reject: the structure changed, the behaviour must not.
 const src=fs.readFileSync(path.join(__dirname,'..','dist/systems/save.js'),'utf8');
 const longest=Math.max(...src.split('\n').map(l=>l.length));
 assert.ok(longest<400,'no line in the validator is a wall of conditions (longest '+longest+')');
 for(const name of ['accountOk','runShapeOk','rosterOk','npcOk','stockOk','progressOk','finalOk','relicWindowOk'])
  assert.ok(src.includes('function '+name),'the check is named: '+name);
 // Behaviour, not shape: one broken field per clause, each must be refused.
 const g=fresh('validator');while(g.run.phase!=='sell')step(g);
 g.run.event={...DATA.events[0]};g.run.say={npc:g.run.npcs[0].id,text:'x'};g.save();
 const raw=JSON.parse(Save.export(g.account,g.run));
 assert.ok(Save.valid(raw),'the live run still validates');
 const broken=m=>{const c=copy(raw);m(c);return Save.valid(c);};
 for(const [why,mutate] of [
  // The matrix is the only progression truth, so a partial or mistyped one is malformed
  // rather than partial progress, and is refused rather than read as a smaller account.
  ['account: a missing Job row',s=>delete s.account.matrix[DATA.jobs[0].id]],
  ['account: a missing Boss cell',s=>delete s.account.matrix[DATA.jobs[0].id][DATA.bosses[0].id]],
  ['account: an unknown Job row',s=>s.account.matrix.sorcerer={}],
  ['account: a non-boolean cell',s=>s.account.matrix[DATA.jobs[0].id][DATA.bosses[0].id]=1],
  ['account: no matrix at all',s=>delete s.account.matrix],
  ['run shape',s=>s.run.day=31],
  ['roster',s=>s.run.queue.push('nope')],['npc',s=>s.run.npcs[0].job='nope'],
  ['stock',s=>s.run.inventory[0]&&(s.run.inventory[0].item='nope')],
  ['progress',s=>s.run.cursor=-1],['relic window',s=>s.run.relicWindow.milestoneDay=7],
  ['spoken line',s=>s.run.say.npc='nope'],['event',s=>s.run.event={id:'nope'}]])
  assert.equal(broken(mutate),false,'still refused: '+why);
});

test('CORE_RUN §RUN FAIL: a store ends when too many of the people it sent stop coming back',()=>{
 const limit=DATA.balance.deathLimit;
 assert.ok(Number.isInteger(limit)&&limit>0,'the failure line is a named constant');

 // one short of it the store keeps trading; on it, it does not
 const below=fresh('deaths-below');below.run.phase='closing';below.run.stats.deaths=limit-1;
 assert.equal(below.closeDay(),true,'one short of the line the day still closes');
 assert.notEqual(below.run.phase,'end','and the store is still open');

 const at=fresh('deaths-at');at.run.phase='closing';at.run.stats.deaths=limit;
 at.closeDay();
 assert.equal(at.run.phase,'end','on the line the store closes');
 assert.equal(at.run.win,false,'as a failure');
 assert.ok(at.run.endReason.includes('소문'),'named for what happened: '+at.run.endReason);

 /* Money is not the reason and cannot rescue it: the liquidation offer exists to keep trading,
    and there is nothing left to keep trading for. */
 const rich=fresh('deaths-rich');rich.run.phase='closing';rich.run.stats.deaths=limit;
 rich.run.money=9999;rich.closeDay();
 assert.equal(rich.run.phase,'end','a full till does not hold the doors open');
 const broke=fresh('deaths-broke');broke.run.phase='closing';broke.run.stats.deaths=limit;
 broke.run.money=-500;broke.closeDay();
 assert.equal(broke.run.phase,'end','and an empty one is not offered a way back');
 assert.ok(!/운영비|재고/.test(broke.run.notice||''),'no liquidation prompt for a Run already over');
 assert.ok(broke.run.endReason.includes('소문'),'the cause reported is the deaths, not the money');
});

test('CORE_RUN §RUN FAIL: only a death counts, and the night that reaches the line is read in full',()=>{
 const limit=DATA.balance.deathLimit;
 /* s.stats.deaths is the count night() has always kept - it rises only where the report left
    the adventurer dead, so an injury or a stay in recovery was never in it. */
 const shop=source('dist/systems/shop.js'),dungeon=source('dist/systems/dungeon.js');
 assert.ok(/else s\.stats\.deaths\+\+/.test(shop),'the counter is the existing one');
 assert.ok(/if\(outcome==='사망'\)n\.alive=false/.test(dungeon),'and alive drops only on a death');

 // the check is in closeDay, which runs after the night has been finished and read
 const run=source('dist/systems/run.js');
 const close=run.slice(run.indexOf('P.closeDay='),run.indexOf('P.tierForecast='));
 assert.ok(close.includes('deathLimit'),'the line is checked as the day closes');
 assert.ok(close.indexOf('deathLimit')<close.indexOf('s.money<0'),
  'before the money branch, so a finished Run is never offered liquidation');
 const night=source('dist/systems/shop.js');
 assert.ok(!night.includes('deathLimit'),'night() still reports the whole evening before anything ends it');

 // a Run at the line still carries its full set of results from that night
 const g=fresh('deaths-night');g.run.phase='closing';g.run.stats.deaths=limit;
 const before=g.run.results.length;g.closeDay();
 assert.equal(g.run.results.length,before,'the evening that reached the line is left intact');
});

test('FINAL: reaching D30 with nobody to send is a Final failure, not an unpaid overhead',()=>{
 /* The UI used to send this to retire, which closes the store for overheads it had in fact
    paid. boss() has always owned this ending. */
 const app=source('dist/ui/app.js');
 assert.ok(/출전 불가 · 런 종료','boss'/.test(app),'the button goes to the Final, not to retire');
 assert.ok(/case'boss':if\(!game\.finalRequired\(\)\)\{game\.boss\(\)/.test(app),
  'and with nobody to send there is no party to confirm first');

 const g=fresh('final-empty');
 g.run.phase='final';g.run.day=30;g.run.team=[];
 for(const n of g.run.npcs)n.alive=false;
 g.run.money=5000;
 g.boss();
 assert.equal(g.run.phase,'end','the Run ends');
 assert.ok(g.run.endReason.includes('출전할 수 있는 모험가가 없어'),
  'for the reason it actually happened: '+g.run.endReason);
 assert.ok(!/운영비/.test(g.run.endReason),'never for overheads that were paid');
});

/* 회생 / 재고 정리. The shelf is an emergency, not a deposit account: the rule is enforced by
   the engine, not by whether the UI happens to draw a button. */
test('RESCUE: clearing stock is a short-Closing action, priced at what that stock cost',()=>{
 const g=fresh('rescue-rule'),s=g.run;
 g.stock('ramen',1);const st=s.inventory.at(-1);st.cost=80;
 for(const phase of ['morning','order','sell','night','final']){
  s.phase=phase;s.money=-100;
  assert.equal(g.liquidate(st.id),false,'no clearing in '+phase);}
 s.phase='closing';s.money=50;
 assert.equal(g.liquidate(st.id),false,'and none while the till is square');
 s.money=-100;const before=s.money;
 assert.equal(g.liquidate(st.id),true);
 assert.equal(s.money-before,40,'half of what that stock cost, rounded');
 assert.equal(s.rescueUsed,1,'one short Closing is one rescue');
});

test('RESCUE: it ends the moment the till reaches zero, and three Closings is the whole Run',()=>{
 const g=fresh('rescue-cap'),s=g.run;
 for(let i=0;i<12;i++)g.stock('ramen',1);
 s.phase='closing';s.money=-10;
 const ids=s.inventory.map(x=>x.id);
 assert.equal(g.liquidate(ids[0]),true,'the first clears the deficit');
 assert.ok(s.money>=0);
 assert.equal(g.liquidate(ids[1]),false,'and nothing more may be sold once it is square');

 /* The Closing above was the first rescue, so two remain; the one after that is refused with
    stock still on the shelf. */
 for(const day of [4,5]){s.day=day;s.money=-10;
  assert.equal(g.liquidate(s.inventory[0].id),true,'rescue on DAY '+day);}
 assert.equal(s.rescueUsed,DATA.balance.rescueLimit);
 s.day=7;s.money=-10;
 assert.equal(g.liquidate(s.inventory[0].id),false,'the fourth is refused');
 assert.ok(s.inventory.length,'with stock still on the shelf');
 assert.equal(g.canRescue(),false);
 g.closeDay();
 assert.equal(s.phase,'end','and the store closes');
});

test('RESCUE: the count survives a save and a load, and a forged one is refused',()=>{
 const g=fresh('rescue-save'),s=g.run;
 g.stock('ramen',1);s.phase='closing';s.money=-10;g.liquidate(s.inventory[0].id);
 assert.equal(s.rescueUsed,1);
 const round=copy({version:8,account:g.account,run:s});
 assert.ok(Save.valid(round),'a run carrying a rescue count is valid');
 assert.equal(round.run.rescueUsed,1,'and the count is what is written');
 for(const bad of [{rescueUsed:DATA.balance.rescueLimit+1},{rescueUsed:-1},{rescueUsed:1.5},{rescueUsed:undefined}]){
  const forged=copy(round);Object.assign(forged.run,bad);
  assert.equal(Save.valid(forged),false,'refused: '+JSON.stringify(bad));}
});

test('NPC-Q66 — MAJOR INJURY RECOVERY', () => {
 const g = new Game();
 g.autosave = false;
 g.start('q66-test');
 g.buyRelic(g.run.relicWindow.candidateIds[0]);
 const n = g.run.npcs[0];
 n.alive = true;
 n.introduced = true;
 n.injury = 2;
 n.status = '중상';
 n.recovery = 1;
 g.beginOrder();
 g.open();
 while(g.run.phase === 'sell') g.depart();
 g.finishNight();
 g.closeDay();
 assert.equal(n.recovery, 0, 'recovery reaches completion');
 assert.equal(n.injury, 0, 'injury becomes 0 directly');
 assert.equal(n.status, '건강', 'status becomes healthy');
});

test('SAVE V7 EXACT CONTRACT', () => {
 const g = new Game();
 g.autosave = false;
 g.start('v8-contract');
 
 // 1. new Run -> run.version === 8
 assert.equal(g.run.version, 8, 'a new run is created at version 8');
 
 // 2. Save.valid()가 run.version !== 8 reject
 const raw = JSON.parse(Save.export(g.account, g.run));
 assert.ok(Save.valid(raw), 'the exported v8 shape is valid');
 raw.run.version = 6;
 assert.equal(Save.valid(raw), false, 'a run.version !== 7 is rejected');
 raw.run.version = 7;
 
 // 3. unlocks.premium non-boolean -> Save.valid() === false
 raw.account.unlocks.premium = "true";
 assert.equal(Save.valid(raw), false, 'premium as string is refused');
 delete raw.account.unlocks.premium;
 assert.equal(Save.valid(raw), false, 'missing premium is refused');
 raw.account.unlocks.premium = false;
 
 // 4. unlocks.tree non-boolean -> Save.valid() === false
 raw.account.unlocks.tree = 1;
 assert.equal(Save.valid(raw), false, 'tree as number is refused');
 delete raw.account.unlocks.tree;
 assert.equal(Save.valid(raw), false, 'missing tree is refused');
 raw.account.unlocks.tree = false;
 
 // 5. Meta.fresh() -> premium === false, tree === false, valid account shape
 const fresh = Meta.fresh();
 assert.equal(fresh.unlocks.premium, false, 'fresh account premium is false boolean');
 assert.equal(fresh.unlocks.tree, false, 'fresh account tree is false boolean');
 assert.ok(Save.valid({version:8, account:fresh, run:null}), 'fresh account alone is a valid save payload');
 
 // 5.1 extra keys in unlocks do not invalidate
 const extraRaw = JSON.parse(Save.export(g.account, g.run));
 extraRaw.account.unlocks.unrelatedKey = true;
 assert.ok(Save.valid(extraRaw), 'extra key in unlocks does not invalidate the save');
 
 // 6. fresh account + new Run -> export/save -> import/load -> 정상
 const h = new Game(Meta.fresh());
 h.start('fresh-test');
 const payload = Save.export(h.account, h.run);
 const loaded = Save.import(payload);
 assert.equal(loaded.account.unlocks.premium, false);
 assert.equal(loaded.run.version, 8);
});

test('SALE_v2.7 §PRE-COMMIT / POST-COMMIT: the expedition outlook is frozen for the visit',()=>{
 const g=fresh('outlook');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 g.beginOrder();
 for(let i=0;i<g.run.offers.length;i++){try{g.setQuantity(i,1);}catch(e){}}
 g.finishOrder();
 assert.equal(g.run.phase,'sell');
 const n=g.current();
 const entry=copy(n.outlook);
 assert.ok(entry,'the snapshot is taken when the customer reaches the counter');
 for(const k of ['combat','worst','deathRisk','greatSignal','hazards'])
  assert.ok(k in entry,'the snapshot carries '+k);
 assert.ok(entry.deathRisk>=0&&entry.deathRisk<=0.40,'the Death risk is the conditional one, inside its caps');
 // it is the SALE-entry state: the same calculation on the untouched NPC
 const fresh0=g.outlookFor({...n,pack:[]});
 assert.deepEqual({...entry,gate:undefined,day:undefined},{...fresh0,gate:undefined,day:undefined},
  'the snapshot is the pre-supply state, not a post-Item one');
 // selling into the Bag must not move any of it
 let sold=0;
 for(const st of [...g.run.inventory]){
  if(n.pack.length>=Adventurer.slots(n))break;
  try{g.sell(st.id,'half');sold++;}catch(e){}
 }
 assert.ok(sold>0,'the test actually committed a purchase');
 /* SA-Q11: a committed purchase refreshes the Great Success signal and NOTHING else, so the
    frozen half is compared with that one field held out. */
 assert.deepEqual({...n.outlook,greatSignal:null},{...entry,greatSignal:null},
  'a committed Item does not move the frozen half of the outlook');
 assert.equal(n.outlook.greatSignal,
  Dungeon.greatSuccessSignal({...n},g.claimedGateFor(n),g.run.facilities),
  'and the Great Success signal is the engine calculation on the Bag as it now stands');
 // ...but the runtime preparation is NOT frozen
 const prepared=Dungeon.prepare({...n},g.claimedGateFor(n),g.run.facilities);
 const bare=Dungeon.prepare({...n,pack:[]},g.claimedGateFor(n),g.run.facilities);
 assert.notDeepEqual(prepared.effects,bare.effects,'the real preparation did change');
 // and it survives a save/load
 g.save();
 const round=Save.import(Save.export(g.account,g.run));
 assert.ok(Save.valid(JSON.parse(Save.export(g.account,g.run))),'a run carrying the snapshot still validates');
 assert.deepEqual(round.run.npcs.find(x=>x.id===n.id).outlook,entry,'the frozen outlook survives a reload');
 // the next customer gets their own snapshot
 const before=n.id;g.depart();
 const next=g.current();
 if(next){
  assert.notEqual(next.id,before);
  assert.ok(next.outlook,'the next customer is snapshotted on arrival');
 }
});

/* SA-Q11 — GREAT SUCCESS SIGNAL FROZEN AFTER PURCHASE. The signal shared one frozen snapshot
   object with the rest of the arrival information, so buying the very Item that would make a
   大成功 reachable could not say so. Only that one field moves, and only on a committed sale. */
test('SA-Q11: a successful purchase refreshes the Great Success signal and nothing else',()=>{
 const drive=seed=>{
  const g=fresh(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);
  g.beginOrder();
  for(let i=0;i<g.run.offers.length;i++){try{g.setQuantity(i,1);}catch(e){}}
  g.finishOrder();
  return g;
 };
 const FROZEN=['day','gate','combat','hazards','worst','deathRisk'];
 const frozenOf=o=>JSON.stringify(FROZEN.map(k=>o[k]));

 // 1. a committed sale: the frozen fields hold, greatSignal is recomputed against the new Bag
 const g=drive('greatsignal');
 const n=g.current();
 const entry=copy(n.outlook);
 let sold=0;
 for(const st of [...g.run.inventory]){
  if(n.pack.length>=Adventurer.slots(n))break;
  try{if(g.sell(st.id,'half'))sold++;}catch(e){}
 }
 assert.ok(sold>0,'a purchase was actually committed');
 assert.equal(frozenOf(n.outlook),frozenOf(entry),'Combat / Hazard / Death / gate / day are untouched');
 assert.equal(n.outlook.greatSignal,
  Dungeon.greatSuccessSignal({...n},g.claimedGateFor(n),g.run.facilities),
  'the signal is recomputed on the committed Bag');
 assert.equal(typeof n.outlook.greatSignal,'boolean','and it is still the plain signal, not a score');

 // 2. the recompute really can change the answer - a strong enough Bag flips a false signal true
 const h=drive('greatsignal-flip');
 const m=h.current();
 m.outlook.greatSignal=false;
 const wouldBe=Dungeon.greatSuccessSignal({...m,pack:['toppotion','toppotion']},h.claimedGateFor(m),h.run.facilities);
 h.stock('toppotion',2);m.money=999999;m.refused=[];
 let flipped=0;
 for(const st of h.run.inventory.filter(x=>x.item==='toppotion')){
  if(m.pack.length>=Adventurer.slots(m))break;
  try{if(h.sell(st.id,'half'))flipped++;}catch(e){}
 }
 if(flipped){
  assert.equal(m.outlook.greatSignal,
   Dungeon.greatSuccessSignal({...m},h.claimedGateFor(m),h.run.facilities),
   'the refreshed signal tracks the Bag that was actually committed');
  if(wouldBe)assert.equal(m.outlook.greatSignal,true,'a Bag that reaches the margin says so');
 }

 // 3. a REFUSED sale refreshes nothing at all
 const r=drive('greatsignal-refuse');
 const p=r.current();
 const beforeRefusal=copy(p.outlook);
 const target=r.run.inventory[0];
 assert.ok(target,'there is stock to offer');
 p.money=0;                                   // cannot afford it: the sale is refused outright
 let threw=false;
 try{assert.equal(r.sell(target.id,'overcharge'),false,'the sale did not go through');}
 catch(e){threw=true;}
 assert.deepEqual(p.outlook,beforeRefusal,
  'a refused'+(threw?'/rejected':'')+' sale leaves the whole snapshot frozen');

 // 4. and so does simply arriving and departing without buying anything
 const q=drive('greatsignal-nopurchase');
 const v=q.current();
 const untouched=copy(v.outlook);
 assert.deepEqual(v.outlook,untouched,'no purchase, no refresh');
 q.depart();
 const next=q.current();
 if(next)assert.ok(next.outlook,'the next arrival gets its own full snapshot');

 // 5. the recompute is on the committed-sale path only, and touches one field
 const src=source('dist/systems/shop.js');
 const sell=src.slice(src.indexOf(' sell(stockId,'),src.indexOf(' night(){'));
 const hits=sell.match(/n\.outlook\.[a-zA-Z]+=/g)||[];
 assert.deepEqual(hits,['n.outlook.greatSignal='],'sell() writes exactly one outlook field');
});

test('SALE_v2.7 §SAME-ITEM REFUSAL PRICE CEILING: any refusal closes every higher price',()=>{
 const mults=Object.fromEntries(Object.entries(DATA.pricing).map(([k,v])=>[k,v.mult]));
 const order=['half','full','overcharge'].sort((a,b)=>mults[a]-mults[b]);
 assert.deepEqual(order,['half','full','overcharge'],'the three ordinary modes, cheapest first');
 /* Drive real visits until each of the three modes has been refused at least once, whatever
    the reason was, and check the ceiling every time. The old rule only fired on a price
    refusal, so a 거절 for need or for choice left the higher prices open. */
 const seen=new Set();
 let visits=0;
 for(let seed=0;seed<60&&seen.size<3;seed++){
  const g=fresh('ceiling-'+seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);
  for(let turn=0;turn<600&&g.run.phase!=='end';turn++){
   const s=g.run;
   if(s.phase!=='sell'){if(!step(g))break;continue;}
   const n=g.current();
   visits++;
   for(const st of [...s.inventory]){
    for(const mode of order){
     const key=st.item+':'+mode;
     if(n.refused.includes(key))continue;
     if(n.pack.length>=Adventurer.slots(n))break;
     let threw=false;
     try{g.sell(st.id,mode);}catch(e){threw=true;}
     if(threw)continue;
     const said=(n.refusalReasons||[]).filter(x=>x.item===st.item);
     const mine=said.find(x=>x.mode===mode);
     if(!mine)break;  // accepted, this stock is gone
     seen.add(mine.reason);
     // every higher price for THIS SKU is now closed, whatever the reason was
     for(const higher of order.filter(m=>mults[m]>mults[mode]))
      assert.ok(n.refused.includes(st.item+':'+higher),
       mine.reason+' refusal at '+mode+' must close '+higher);
     // every lower price is still open
     for(const lower of order.filter(m=>mults[m]<mults[mode]))
      assert.ok(!n.refused.includes(st.item+':'+lower),
       'a refusal at '+mode+' leaves '+lower+' open');
     // and nothing is locked for a SKU this customer never actually refused
     const refusedSkus=new Set((n.refusalReasons||[]).map(x=>x.item));
     for(const key of n.refused)
      assert.ok(refusedSkus.has(key.split(':')[0]),'an unrelated SKU is never locked: '+key);
     break;
    }
   }
   g.depart();
  }
 }
 assert.ok(visits>0,'the sweep actually reached the counter');
 assert.ok(seen.has('price')&&seen.size>=2,'the sweep saw a price refusal and at least one other reason: '+[...seen]);
 // a new visit starts from a clean pricing state
 const g=fresh('ceiling-reset');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 for(let turn=0;turn<600&&g.run.phase!=='sell';turn++)if(!step(g))break;
 const n=g.current();
 if(n&&g.run.inventory.length){
  const st=g.run.inventory[0];
  try{g.sell(st.id,'half');}catch(e){}
  if(n.refused.length){
   g.depart();
   for(let turn=0;turn<600&&g.run.day<2;turn++)if(!step(g))break;
   assert.ok(g.run.npcs.every(x=>!x.refused.length),'a new day begins from a clean pricing state');
  }
 }
});

/* META_v2.8 §Run-end settlement structure:
     Store Capital Gain = round(Gross Sales x Day-reach conversion rate)
   Gross Sales is the Run's own sales accounting - `stats.revenue` - and Ending Gold and the
   remaining Inventory are NOT inputs. These cases replace the retired net-asset ones, which
   asserted the superseded `Ending Gold + liquidation` formula. */
test('META_v2.8 §STORE CAPITAL: Gross Sales x the reached-Day rate, once, and never on abandon',()=>{
 const at=(sales,day,money=1000)=>{const g=fresh('sc-'+sales+'-'+day+'-'+money);
  g.run.day=day;g.run.stats.revenue=sales;g.run.money=money;return g;};

 // A. no sales, no Store Capital - whatever Day it reached, whatever it is holding
 for(const day of [5,15,22,27,30]){
  const g=at(0,day,9999),before=Meta.storeCapital(g.account);
  assert.equal(g.settleStoreCapital().gain,0,'D'+day+' with no sales earns nothing');
  assert.equal(Meta.storeCapital(g.account),before,'and credits the Account nothing');
 }

 // B. each Day band converts at its exact Canonical rate
 const BANDS=[[1,.01],[9,.01],[10,.02],[19,.02],[20,.03],[24,.03],[25,.04],[29,.04],[30,.05]];
 for(const [day,rate] of BANDS){
  assert.equal(Meta.capitalRate(day),rate,'D'+day+' converts at '+rate);
  const g=at(10000,day);
  const st=g.settleStoreCapital();
  assert.equal(st.rate,rate,'D'+day+' settles at that rate');
  assert.equal(st.sales,10000,'on the Run own Gross Sales');
  assert.equal(st.gain,Math.round(10000*rate),'D'+day+' gain');
 }

 // C. the same Gross Sales earns strictly more the deeper the band reached
 const byBand=[9,19,24,29,30].map(day=>at(10000,day).settleStoreCapital().gain);
 for(let i=1;i<byBand.length;i++)
  assert.ok(byBand[i]>byBand[i-1],'a deeper band earns more on the same sales: '+byBand.join(' < '));

 // J. Ending Gold and Inventory are not inputs: same sales, same Day, different end state
 const poor=at(8000,22,-4000),rich=at(8000,22,9000);
 rich.run.inventory=[];                          // and nothing on the shelf either
 const a1=poor.settleStoreCapital(),a2=rich.settleStoreCapital();
 assert.equal(a1.gain,a2.gain,'Ending Gold and Inventory change nothing: '+a1.gain+' vs '+a2.gain);
 assert.equal(a1.gain,Math.round(8000*0.03),'and the gain is the sales at the band rate');
 assert.equal('gold' in a1,false,'the recorded settlement states no Gold input');
 assert.equal('stock' in a1,false,'and no stock input');
 assert.equal('value' in a1,false,'and no net-asset Settlement Value');
 assert.equal(typeof fresh('sc-helper').settlementValue,'undefined',
  'the retired net-asset helper is gone from the prototype');

 // G. Boss CLEAR is not a multiplier
 const win=at(12000,30);win.run.win=true;
 const lose=at(12000,30);
 const w=win.settleStoreCapital(),l=lose.settleStoreCapital();
 assert.equal(w.rate,l.rate,'a CLEAR uses the same rate');
 assert.equal(w.gain,l.gain,'and the same gain - Boss CLEAR is not a multiplier');

 // I. exactly once, and a reload of an ended Run reads it instead of earning it
 const g=at(7000,22),before=Meta.storeCapital(g.account);
 const first=g.settleStoreCapital();
 assert.equal(Meta.storeCapital(g.account),before+first.gain,'it reaches the Account once');
 assert.equal(g.settleStoreCapital().gain,first.gain,'settling again returns the recorded settlement');
 assert.equal(Meta.storeCapital(g.account),before+first.gain,'and credits nothing further');
 g.end(false,'테스트 종료');
 assert.equal(Meta.storeCapital(g.account),before+first.gain,'end() does not settle a second time');
 const round=reload(g);
 assert.equal(Meta.storeCapital(round.account),before+first.gain,'a reload does not double-credit');
 round.settleStoreCapital();
 assert.equal(Meta.storeCapital(round.account),before+first.gain,'and the guard survives the round trip');
 assert.equal(round.run.settled,true,'the guard itself is persisted');
 assert.equal(round.run.settlement.sales,7000,'the recorded Gross Sales survives too');

 // H. a manual abandon never reaches end(), which is what makes it worth nothing
 const dropped=at(20000,26);
 const capital=Meta.storeCapital(dropped.account);
 dropped.start('sc-abandon-2');
 assert.equal(Meta.storeCapital(dropped.account),capital,'abandoning a live Run settles nothing');
});

/* D / E / F. A failed Run is still a Run that did business. Bankruptcy, the Death limit and a
   lost Final are ordinary endings: they lose the Gold, the stock and the adventurers, and they
   keep the store-operation progress the sales already demonstrated. Each is driven through the
   real `end()` rather than by writing a flag. */
test('META_v2.8 §STORE CAPITAL: a failed Run still earns on what it actually sold',()=>{
 const drive=(seed,day,sales,setup)=>{const g=fresh(seed);
  g.run.day=day;g.run.stats.revenue=sales;setup&&setup(g);
  const before=Meta.storeCapital(g.account);
  g.end(false,'테스트 종료');
  return {g,before,gain:g.run.settlement.gain,st:g.run.settlement};};

 // D. bankrupt: no Gold, nothing on the shelf, but it sold 6,000G worth on the way down
 const bank=drive('sc-bankrupt',22,6000,g=>{g.run.money=-500;g.run.inventory=[];});
 assert.equal(bank.gain,Math.round(6000*0.03),'a bankrupt Run earns on its Gross Sales');
 assert.ok(bank.gain>0,'which is not zero');
 assert.equal(Meta.storeCapital(bank.g.account),bank.before+bank.gain,'and the Account receives it');

 // E. the Death limit closed the store
 const dead=drive('sc-deaths',15,4000,g=>{g.run.stats.deaths=DATA.balance.deathLimit;});
 assert.equal(dead.gain,Math.round(4000*0.02),'a Death-limit closure uses the ordinary formula');

 // F. reached D30 and lost the Final
 const failed=drive('sc-finalfail',30,9000,g=>{g.run.win=false;});
 assert.equal(failed.gain,Math.round(9000*0.05),'a lost Final uses the ordinary formula');
 assert.equal(failed.st.rate,0.05,'at the D30 rate it actually reached');

 // the failures are still failures: none of them kept anything Run-scoped
 for(const r of [bank,dead,failed]){
  assert.equal(r.g.run.phase,'end','the Run really ended');
  assert.equal(r.g.run.settled,true,'and settled exactly once');
 }
});

/* K. Gross Sales is the Run's own accounting, credited once per transaction by the two paths
   that make a sale - an ordinary SALE and a Final fixed-price transfer - and never recounted
   by Meta. Driven through the real sell()/supplyFinal() rather than by writing the counter. */
test('META_v2.8 §STORE CAPITAL: Gross Sales counts each real sale exactly once',()=>{
 const g=fresh('sc-gross');
 while(g.run.phase!=='sell')step(g);
 const start=g.run.stats.revenue;
 let sold=0,paid=0;
 for(let turn=0;turn<400&&sold<3;turn++){
  if(g.run.phase!=='sell'){step(g);continue;}
  const n=g.current(),st=g.run.inventory[0];
  if(!n||!st||n.pack.length>=Adventurer.slots(n)){g.depart();continue;}
  const before=g.run.stats.revenue,quote=g.interest(n,DATA.itemBy[st.item],'full');
  let ok=false;try{ok=g.sell(st.id,'full');}catch(e){g.depart();continue;}
  const delta=g.run.stats.revenue-before;
  if(ok){assert.equal(delta,quote.price,'an accepted Sale credits its price exactly once');sold++;paid+=quote.price;}
  else assert.equal(delta,0,'a refusal credits nothing');
 }
 assert.ok(sold>0,'the sweep actually sold something');
 assert.equal(g.run.stats.revenue-start,paid,'Gross Sales is the sum of what was actually paid');

 /* The Final transfer is the other path into the same counter. */
 const f=fresh('sc-final');
 f.run.day=30;f.morning();
 const n=f.run.npcs.find(x=>x.alive&&x.introduced)||f.run.npcs[0];
 n.alive=true;n.introduced=true;n.recovery=0;n.pack=[];n.money=99999;
 f.run.team=[n.id];f.run.finalCommitted=true;
 const stock=f.run.inventory[0];
 if(stock){
  const before=f.run.stats.revenue,price=f.finalPrice(stock.item);
  f.supplyFinal(n.id,stock.id);
  assert.equal(f.run.stats.revenue-before,price,'a Final transfer credits its fixed price once');
 }
 /* And Meta reads that counter rather than adding to it. */
 const capBefore=Meta.storeCapital(f.account),salesBefore=f.run.stats.revenue;
 const st=f.settleStoreCapital();
 assert.equal(f.run.stats.revenue,salesBefore,'settling does not touch Gross Sales');
 assert.equal(st.sales,salesBefore,'it reads exactly what the Run accumulated');
 assert.equal(Meta.storeCapital(f.account),capBefore+st.gain,'and credits the gain once');
});

test('CORE_RUN_v2.8 §PRE-RUN FLOW: the loadout is frozen at start and the Run never re-reads it',()=>{
 const a=Meta.fresh();
 Meta.addCapital(a,DATA.decorationBy.thriftSafe.price+DATA.decorationBy.dawnSign.price);
 Meta.buyDecoration(a,'thriftSafe');
 const g=new Game(a);g.autosave=false;g.start('loadout-freeze');
 assert.equal(g.run.money,1000,'nothing is paid before DAY 1 opens');
 g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.facilities=[];
 assert.equal(g.run.money,1000+DATA.decorationParams.thriftSafe.dailyGold,'DAY 1 morning pays the counter once');
 assert.equal(g.run.daily.safeGold,DATA.decorationParams.thriftSafe.dailyGold,'and the DAY 1 ledger says so');
 assert.deepEqual(g.run.loadout,{counter:'thriftSafe'},'and the loadout is frozen onto the Run');
 assert.equal(g.wears('thriftSafe'),true,'the Run reads its own frozen copy');
 // changing the Account mid-Run must not reach the Run that already started
 Meta.buyDecoration(a,'dawnSign');
 assert.equal(g.wears('dawnSign'),false,'a Decoration bought mid-Run does not join this Run');
 Meta.equipDecoration(a,'counter',null);
 assert.equal(g.wears('thriftSafe'),true,'and unequipping mid-Run does not remove it either');
 assert.deepEqual(reload(g).run.loadout,g.run.loadout,'the frozen loadout survives a reload');
 // a Decoration is never a Relic
 assert.ok(!g.run.facilities.includes('thriftSafe'),'no Decoration id is injected into facilities');
 assert.equal(g.has('thriftSafe'),false,'and `has` - the Relic question - does not answer for it');
 const next=new Game(a);next.autosave=false;next.start('loadout-freeze-2');
 assert.deepEqual(next.run.loadout,{sign:'dawnSign'},'the next Run picks up the current Account loadout');
 assert.equal(next.run.money,1000,'and the unequipped counter no longer pays out');
});

test('RELIC_v2.8 §VISITOR RELICS: board floors the base roll, hub rolls one exclusive outcome',()=>{
 const src=source('dist/systems/shop.js');
 /* board is a floor on the BASE roll, applied before every other modifier, and draws nothing. */
 assert.ok(src.includes("const baseVisitors=s.dayFacilities.includes('board')?Math.max(D.relicParams.board.minVisitors,rawVisitors):rawVisitors;"),
  'board floors the base roll at its parameter and leaves higher rolls alone');
 assert.equal(DATA.relicParams.board.minVisitors,4,'board raises the base roll to 4 and leaves 5 and 6 alone');
 /* hub: one roll, three mutually exclusive outcomes. */
 assert.ok(src.includes("const r=this.rng.next(),{p1,p2}=D.relicParams.hub;hubExtra=r<p1?1:r<p1+p2?2:0;"),
  'hub makes exactly one roll against its two parameters');
 const {p1,p2}=DATA.relicParams.hub;
 assert.deepEqual([p1,p2],[.45,.15],'hub makes exactly one roll: REL-Q-v28-17 45% +1, 15% +2, otherwise none');
 const seen=new Set();
 const rate=[0,0,0];for(let i=0;i<1000;i++){const r=i/1000,x=r<p1?1:r<p1+p2?2:0;seen.add(x);rate[x]++;}
 assert.deepEqual(rate,[400,450,150],'the approved 45 / 15 / 40 split, and it sums to one roll');
 assert.deepEqual([...seen].sort(),[0,1,2],'all three outcomes are reachable and exclusive');
 /* hub's cost is a share of overheadBase alone - never of the flat extras. */
 assert.equal(DATA.balance.hubOverheadRate,.10,'the approved rate ships');
 const g=fresh('visitor-relics');
 const plain=g.expectedOperatingCost();
 g.run.facilities.push('hub');g.run.dayFacilities=[...g.run.facilities];
 const withHub=g.expectedOperatingCost();
 assert.equal(withHub,Math.round((g.overheadBase()*(1+DATA.balance.hubOverheadRate))/10)*10,
  'overhead is base + 10% of base, then the existing rounding');
 assert.ok(withHub>plain,'and it really is a cost');
 assert.ok(!src.includes("includes('hub')?35:0"),'the retired flat +35G is gone');
 /* board, hub and the wall Decoration are independent: none marks another owned or shares a slot. */
 assert.equal(g.wears('guildPlaque'),false,'holding the Relic does not equip the Decoration');
 const deco=Meta.fresh();Meta.addCapital(deco,DATA.decorationBy.guildPlaque.price);
 Meta.buyDecoration(deco,'guildPlaque');
 const h=new Game(deco);h.autosave=false;h.start('deco-not-relic');
 assert.ok(!h.run.facilities.includes('board'),'and equipping the Decoration does not grant the Relic');
});

test('CORE_RUN_v2.8 §SAVE: the new Account and Run state fits inside v8 with safe defaults',()=>{
 /* The Decoration package adds Account state (capital, owned, loadout) and Run state (the
    frozen loadout, the settlement guard). None of it is a schema blocker, so v8 stands and no
    migration layer is invented for internal-development saves. */
 const fresh0=Meta.fresh();
 assert.equal(JSON.parse(Save.export(fresh0,null)).version,8,'the save generation is unchanged');
 assert.ok(Save.valid(JSON.parse(Save.export(fresh0,null))),'an Account-only save validates');
 /* An existing v8 Account written before any of this must load and behave, not crash. */
 const legacy=Meta.fresh();delete legacy.store;
 const raw={version:8,account:legacy,run:null};
 assert.ok(Save.valid(raw),'a v8 Account with no store block is still valid');
 const back=Save.import(JSON.stringify(raw));
 assert.equal(Meta.storeCapital(back.account),0,'capital defaults to zero');
 assert.deepEqual(Meta.ownedDecorations(back.account),[],'owned defaults to empty');
 assert.deepEqual(Meta.plannedLoadout(back.account),{},'and the loadout to empty');
 const g=new Game(back.account);g.autosave=false;g.start('legacy-v8-start');
 assert.equal(g.run.money,1000,'a Run from it starts on the neutral baseline');
 /* A Run saved before the loadout existed must not claim to wear anything. */
 const older=copy(g.run);delete older.loadout;delete older.settled;
 const h=new Game(back.account,older);h.autosave=false;
 assert.equal(h.wears('thriftSafe'),false,'a Run with no frozen loadout wears nothing');
 h.run.day=12;h.run.stats.revenue=3000;
 const legacySettle=h.settleStoreCapital();
 assert.equal(legacySettle.rate,0.02,'and it still settles on the Day it reached');
 assert.equal(legacySettle.gain,Math.round(3000*0.02),'on its own Gross Sales');
 /* A live Run round-trips with both new fields intact. */
 const live=fresh('save-decoration');
 Meta.addCapital(live.account,DATA.decorationBy.dawnSign.price);
 Meta.buyDecoration(live.account,'dawnSign');
 live.run.loadout={sign:'dawnSign'};
 const round=reload(live);
 assert.deepEqual(round.run.loadout,live.run.loadout,'the frozen loadout survives export/import');
 assert.equal(Meta.storeCapital(round.account),0,'and the Account capital round-trips');
 assert.deepEqual(Meta.ownedDecorations(round.account),['dawnSign'],'with what it owns');
 assert.deepEqual(Meta.storeLoadout(round.account),Meta.storeLoadout(live.account),'and its planned loadout');
});

test('META_v2.8 §RETIRED: a stale Contract or Franchise payload changes nothing at all',()=>{
 /* Removing the picker is not the requirement. A v8 save can still carry `contract` and a
    filled `franchise` block, and a Run loaded from it must play identically to the neutral
    baseline - otherwise retired rules are still live for anyone with an old save. */
 const seed='stale-payload';
 const base=fresh(seed);
 const shape=g=>({money:g.run.money,offers:g.run.offers.length,overhead:g.expectedOperatingCost(),
  visitors:g.run.expectedVisitors,rarities:g.run.offers.map(o=>DATA.itemBy[o.item].rarity).join(','),
  prices:g.run.offers.map(o=>o.price).join(',')});
 for(const contract of ['guild','premium','delivery','budget','standard']){
  const g=new Game(Meta.fresh());g.autosave=false;g.start(seed);
  g.run.contract=contract;           // exactly what a stale v8 save would carry
  g.run.dayFacilities=[...g.run.facilities];
  g.generateOffers({advancePity:false});
  const b2=new Game(Meta.fresh());b2.autosave=false;b2.start(seed);
  b2.run.dayFacilities=[...b2.run.facilities];
  b2.generateOffers({advancePity:false});
  assert.deepEqual(shape(g),shape(b2),'a stale `'+contract+'` Run plays as the neutral baseline');
 }
 /* A filled retired Franchise block must not unlock, discount or gate anything. */
 const filled=Meta.fresh();
 filled.franchise={sales:9999,overcharged:9999,returning:9999,relics:9999,
  families:['spider','slime','fire','crypt','snow'],done:['nowaste','nodeath','allsupplied','grosssales']};
 const withPayload=new Game(filled);withPayload.autosave=false;withPayload.start(seed);
 assert.deepEqual(shape(withPayload),shape(base),'a filled Franchise payload changes no Run value');
 assert.deepEqual(Meta.opened(filled),Meta.opened(Meta.fresh()),'and unlocks nothing');
});

test('META_v2.8 §RETIRED: active play writes no retired Franchise progress',()=>{
 const g=fresh('no-retired-writes');
 const snap=()=>JSON.stringify(g.account.franchise);
 const before=snap();
 g.buyRelic(g.run.relicWindow.candidateIds[0]);          // Relic purchase used to count
 assert.equal(snap(),before,'a Relic purchase credits nothing');
 while(g.run.phase!=='sell')step(g);
 let sold=0;
 for(let turn=0;turn<600&&g.run.day<4;turn++){
  if(g.run.phase!=='sell'){step(g);continue;}
  const n=g.current(),st=g.run.inventory[0];
  if(!st||n.pack.length>=Adventurer.slots(n)){g.depart();continue;}
  try{if(g.sell(st.id,'overcharge')||g.sell(st.id,'full'))sold++;}catch(e){g.depart();}
 }
 assert.ok(sold>0,'the sweep actually sold something');
 assert.equal(snap(),before,'and no sale - at any price, to any customer - credits a counter');
 /* Achievement 6 used to be marked on the DAY 25 morning. Drive past it with a clean record. */
 const h=fresh('no-retired-d25');h.run.stats.waste=0;h.run.day=25;
 const mark=JSON.stringify(h.account.franchise);
 h.morning();
 assert.equal(JSON.stringify(h.account.franchise),mark,'reaching DAY 25 clean marks nothing');
});

/* UI-Q-v28-6. The confirmation itself is a UI step and ui-guard proves its shape; what belongs
   here is the Account side it drives — that the spend happens once and only once, whatever the
   caller does, and that a Decoration is never a Relic. */
test('META_v2.8 §DECORATION: Capital is spent exactly once, and ownership is permanent',()=>{
 const a=Meta.fresh(),d=DATA.decorationBy.thriftSafe,start=d.price+250;
 Meta.addCapital(a,start);
 assert.equal(Meta.decorationOwned(a,d.id),false,'nothing is owned to begin with');
 Meta.buyDecoration(a,d.id);
 assert.equal(Meta.storeCapital(a),start-d.price,'the price is deducted once');
 assert.equal(Meta.decorationOwned(a,d.id),true,'and the Decoration is owned');
 assert.equal(Meta.storeLoadout(a)[d.slot],d.id,'an empty Slot of that kind takes it');
 /* A second confirmation - a double click, a stale button, a replayed action - is refused at
    the Account layer, so the UI is not the only thing standing between it and a second spend. */
 assert.throws(()=>Meta.buyDecoration(a,d.id),/이미 보유/,'a second purchase is refused');
 assert.equal(Meta.storeCapital(a),start-d.price,'and deducts nothing');
 /* Cancel is the absence of a call, so what it must leave alone is measured here as the state
    a purchase never made: another Decoration is untouched by this one. */
 const other=DATA.decorationBy.dawnSign;
 assert.equal(Meta.decorationOwned(a,other.id),false,'an unconfirmed purchase owns nothing');
 assert.equal(Meta.storeLoadout(a)[other.slot],null,'and equips nothing');
 assert.throws(()=>Meta.buyDecoration(a,other.id),/자본이 부족/,'what cannot be afforded cannot be bought');
 assert.equal(Meta.storeCapital(a),start-d.price,'a refused purchase deducts nothing');
 /* Reload: a save round trip carries ownership and the loadout, and carries no pending state. */
 const save={account:a,run:null,version:8};
 assert.equal(Save.valid(JSON.parse(JSON.stringify(save))),true,'the Account with a Decoration is a valid save');
 const back=JSON.parse(JSON.stringify(save)).account;
 assert.equal(Meta.decorationOwned(back,d.id),true,'ownership survives the reload');
 assert.equal(Meta.storeLoadout(back)[d.slot],d.id,'so does the Slot');
 assert.equal(Meta.storeCapital(back),start-d.price,'and the Capital is not credited back');
 assert.equal(JSON.stringify(back).includes('decoPending'),false,'no half-finished purchase is stored');
 /* Decoration ≠ Relic: buying one touches no Relic state anywhere on the Account. */
 assert.deepEqual(Meta.opened(a),Meta.opened(Meta.fresh()),'a Decoration unlocks nothing');
});

/* CORE_RUN §DAILY ECONOMIC BASE / ECONOMY_ORDER §BASE OPERATING COST. Expected values are worked
   by hand from the Canonical formula, not read back from the engine:
   Core Roster = alive only, Level desc then Rarity desc, top 6; recovering adventurers count.
   D11 roster (alive): L7R3 L7R2 L5R1 L4R0 L3R4(recovering) L3R1 | L3R0 L1R0, plus a dead L10R4.
   top 6 levels 7,7,5,4,3,3 -> avg 29/6; rarities 3,2,1,0,4,1 -> avg 11/6.
   dayBase = 90 + 5 x 10 = 140 (v2.9.0 F4); base = 140 x (1 + .02 x 23/6) x (1 + .06 x 11/6) = 167.314
   charged = round(16.7314) x 10 = 170G. */
test('CORE_RUN §DAILY ECONOMIC BASE: Core-Roster daily overhead follows the Canonical formula',()=>{
 const g=fresh('core-roster-overhead'),s=g.run;
 const proto=copy(s.npcs[0]);
 const mk=(id,level,rarity,extra={})=>({...copy(proto),id,level,rarity,alive:true,recovery:0,injury:0,...extra});
 s.npcs=[mk(1,7,3),mk(2,7,2),mk(3,5,1),mk(4,4,0),mk(5,3,4,{recovery:2,injury:2}),mk(6,3,1),mk(7,3,0),mk(8,1,0),
         mk(9,10,4,{alive:false})];
 s.day=11;s.dayFacilities=[];s.facilities=[];s.event=null;
 assert.deepEqual(g.coreRoster().map(n=>n.id).sort((a,b)=>a-b),[1,2,3,4,5,6],
  'the six best living: the dead L10 is out, the recovering L3R4 is in, and L3R1 beats L3R0 on Rarity');
 const want=140*(1+.02*(29/6-1))*(1+.06*(11/6));
 assert.ok(Math.abs(g.overheadBase()-want)<1e-9,'overheadBase '+g.overheadBase()+' = '+want);
 assert.equal(g.expectedOperatingCost(),170,'charged rounded to 10G');
 // fewer than six alive: all of them; an empty roster reads Level 1 / Rarity 0
 s.npcs=[mk(1,5,2),mk(2,3,0),mk(3,9,4,{alive:false})];s.day=1;
 assert.ok(Math.abs(g.overheadBase()-90*(1+.02*3)*(1+.06*1))<1e-9,'all living adventurers when fewer than six');
 assert.equal(g.expectedOperatingCost(),100,'90 x 1.06 x 1.06 = 101.124 -> 100G');
 s.npcs=[mk(3,9,4,{alive:false})];s.day=30;
 assert.equal(g.overheadBase(),90+5*29,'empty Core Roster: the Day base alone');
 assert.equal(g.expectedOperatingCost(),240,'235 -> 240G');
});

/* ---- META §DECORATION survival alternatives (User decision 2026-09-24) ---------------------- */
const wearing=(ids,seed)=>{const a=Meta.fresh();for(const id of ids){Meta.addCapital(a,DATA.decorationBy[id].price);Meta.buyDecoration(a,id);Meta.equipDecoration(a,DATA.decorationBy[id].slot,id);}
 const g=new Game(a);g.autosave=false;g.start(seed);return past0(g);};
/* past the D0 Store Support pick, so the Day's Gates exist for an arrival to read */
const past0=g=>{g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.facilities=[];return g;};
test('추모 방명록: the Death line that ends a Run is one higher while it is worn',()=>{
 const base=DATA.balance.deathLimit,g=wearing(['memorialBoard'],'memorial');
 assert.equal(Meta.deathLimit(g.run),base+1);
 assert.equal(Meta.deathLimit(fresh('memorial-plain').run),base,'without it the line is unchanged');
 g.run.phase='closing';g.run.stats.deaths=base;assert.equal(g.closeDay(),true,'at the old line the store still trades');
 const h=wearing(['memorialBoard'],'memorial-2');h.run.phase='closing';h.run.stats.deaths=base+1;h.closeDay();
 assert.equal(h.run.phase,'end','one past it, it closes');
});
test('의무실 현판: an ordinarily injured arrival may be healed at the door, 중상 never',()=>{
 let healed=0,tries=0;
 for(let i=0;i<200;i++){const g=wearing(['infirmaryPlaque'],'infirmary-'+i),s=g.run,n=s.npcs[0];
  n.injury=1;n.status='부상';s.queue=[n.id];s.cursor=0;g.arrive();tries++;
  if(n.healedBy){healed++;assert.equal(n.injury,0);assert.equal(n.status,'건강');assert.equal(s.daily.infirmaryHeals,1);}
  else assert.equal(n.injury,1,'a miss leaves the Injury');}
 const rate=healed/tries;assert.ok(rate>.25&&rate<.45,'about 35% heal: '+rate);
 const g=wearing(['infirmaryPlaque'],'infirmary-severe'),n=g.run.npcs[0];n.injury=2;n.recovery=2;g.run.queue=[n.id];g.run.cursor=0;g.arrive();
 assert.equal(n.injury,2,'중상 is not touched');assert.equal(n.healedBy,null);
 const p=past0(fresh('infirmary-none')),m=p.run.npcs[0];m.injury=1;p.run.queue=[m.id];p.run.cursor=0;p.arrive();
 assert.equal(m.injury,1,'without the Decoration nothing heals');
});
test('구급품 진열장: a Death becomes 중상, up to twice per Run',()=>{
 const g=past0(fresh('aidkit')),d={...g.run.dungeons[0],power:9999};
 const weak=()=>{const n=copy(g.run.npcs[0]);n.stats={combat:1,survival:1,mobility:1,spirit:1};n.traits=[];n.pack=[];n.injury=0;return n;};
 let seed=null;for(let i=0;i<500&&seed===null;i++){const n=weak();Dungeon.resolve(n,d,new RNG('aid-'+i));if(!n.alive)seed='aid-'+i;}
 assert.ok(seed,'a Death case exists');
 const run={loadout:{counter:'firstAidKit'}};
 const saved=weak(),rep=Dungeon.resolve(saved,d,new RNG(seed),[],run);
 assert.equal(saved.alive,true,'the kit keeps them alive');assert.equal(rep.outcome,'중상');
 assert.equal(rep.avoidedDeath,true);assert.equal(run.aidKitSaves,1,'one of two is spent');
 assert.ok(rep.events.some(e=>e.id==='aidKit'),'the record says why');
 const second=weak();Dungeon.resolve(second,d,new RNG(seed),[],run);assert.equal(second.alive,true,'the second Death is caught too');
 assert.equal(run.aidKitSaves,2);
 const third=weak();Dungeon.resolve(third,d,new RNG(seed),[],run);assert.equal(third.alive,false,'a third is not');
 const bare=weak();Dungeon.resolve(bare,d,new RNG(seed),[],{loadout:{}});assert.equal(bare.alive,false,'without it the Death stands');
});
test('훈련소 제휴 간판: an adventurer created while it is worn is one Level higher with 50% chance',()=>{
 const P=DATA.decorationParams.trainingRack,saved=P.chance;
 try{
  // the roll is drawn either way while it is worn, so chance 1 and chance 0 share one stream
  P.chance=1;const hit=wearing(['trainingRack'],'rack').run.npcs.map(n=>n.level);
  P.chance=0;const miss=wearing(['trainingRack'],'rack').run.npcs.map(n=>n.level);
  assert.deepEqual(hit,miss.map(l=>l+1),'a hit is exactly +1 Level');
 }finally{P.chance=saved;}
 assert.equal(P.chance,.5);
 let up=0,all=0;for(let i=0;i<40;i++){const g=wearing(['trainingRack'],'rack-rate-'+i);
  P.chance=0;const base=wearing(['trainingRack'],'rack-rate-'+i).run.npcs.map(n=>n.level);P.chance=saved;
  g.run.npcs.forEach((n,k)=>{all++;if(n.level>base[k])up++;});}
 assert.ok(up/all>.4&&up/all<.6,'about half: '+(up/all));
});
test('알뜰 금고: 40G every morning, on the receipt',()=>{
 const g=wearing(['thriftSafe'],'safe'),s=g.run;
 s.phase='closing';g.closeDay();
 assert.equal(s.day,2,'the Day turned');assert.equal(s.daily.safeGold,40,'the new morning pays into a fresh ledger');
 assert.ok(source('dist/ui/app.js').includes("(d.safeGold?line('알뜰 금고',d.safeGold):'')"),'and the receipt names it');
});

console.log(count+' integration groups passed');
