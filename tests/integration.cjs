// Chunk G acceptance: the Save contract, determinism, save→load→continue equivalence and
// the Night Skip contract. Covers CORE_RUN §SAVE/LOAD §GATE/DUNGEON STATE §RUN RANDOMNESS,
// CORE_RUN_QA RUN-Q10/Q11/Q12/Q13/Q19/Q20 and NIGHT_CLOSING §SKIP CONTRACT §SAVE/RESUME.
// These drive the real engine: a round trip is asserted by continuing the run, never by
// comparing serialised shape alone.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
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
   if(team.length)g.boss();else g.end(false,'출전 가능한 모험가 없음');
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
  assert.equal(Meta.grade(after),1,'and the Franchise Grade');
  assert.deepEqual(after.knowledge,{},'Monster Knowledge is gone');
  assert.deepEqual(after.tutorial,{},'and the guide is offered again, with no reset-only code to do it');
  assert.equal(after.runs,0,'the run count does not survive either');
  // The reset is the only destructive path: it never invents a partial variant.
  assert.equal(typeof Save.reset,'function');
  assert.equal(Object.keys(Save).filter(k=>/reset/i.test(k)).length,1,'there is exactly one reset entry point');
 }finally{delete global.localStorage;}
});

test('DUNGEON_HAZARD / CORE_RUN §DEEP EXPEDITION: the schedule and the Gate are decided once',()=>{
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
 const t=DATA.deepTuning,keep={...t};
 Object.assign(t,{successExp:40,greatExp:90,successWallet:60,greatWallet:150});
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
    assert.equal(rep.deep.bonusXp,great?90:40,'the EXP bonus has two bands and no Day/Tier multiplier');
    assert.equal(rep.deep.bonusWallet,great?150:60,'and so does the Wallet bonus');
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
 }finally{Object.assign(DATA.deepTuning,keep);DATA.greatSuccess.storeGoldScale=scale;}
});

test('SALE §DEEP EXPEDITION NOMINATION: Deep and an explicit destination reassignment exclude each other',()=>{
 const g=drivenToDeepSale(),n=g.current();
 // the route support is the only explicit Player destination reassignment in the Source, and
 // it happens in the same window as a nomination: the current visitor, before they trade.
 g.run.special={kind:'route',used:false,candidates:[]};
 if(g.run.dungeons.length>1){
  const other=g.run.dungeons.map((d,i)=>i).find(i=>i!==n.destination);
  g.specialAction(n.id,other);
  assert.equal(g.run.special.npcId,n.id,'the reassignment records who it was spent on');
  assert.equal(g.canNominateDeep(n),false,'a reassigned NPC can no longer be nominated');
  assert.throws(()=>g.nominateDeep(n.id),/배치를 조정/,'and asking anyway is refused by name');
 }
 // the other direction: a confirmed Deep destination is final, so a later reassignment is
 // refused rather than quietly ignored
 const h=drivenToDeepSale(),m=h.current();
 h.run.special={kind:'route',used:false,candidates:[]};
 h.nominateDeep(m.id);
 if(h.run.dungeons.length>1){
  const other=h.run.dungeons.map((d,i)=>i).find(i=>i!==m.destination);
  assert.throws(()=>h.specialAction(m.id,other),/심층원정/,'the Deep destination cannot be reassigned');
  assert.equal(h.gateFor(m).deep,true,'and the nominee still walks into the Deep Gate');
 }
 // the rule is enforced by the two existing actions refusing each other, not by a third one
 assert.equal(h.run.special.kind,'route','the existing guild support is still the only reassignment');
 assert.equal(h.run.deep.today.nomineeId,m.id,'and the nomination is still the only Deep state');
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
 assert.deepEqual(n.outlook,entry,'a committed Item does not move the frozen outlook');
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

test('META_v2.7 §FRANCHISE ACHIEVEMENTS: each one is credited by the play it names',()=>{
 // 1/2/3 are counted where a sale actually commits, and a refusal credits nothing
 const g=fresh('franchise-sales');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 assert.equal(g.account.franchise.relics,1,'a Relic purchase counts once');
 for(let turn=0;turn<600&&g.run.phase!=='sell';turn++)if(!step(g))break;
 const fr=g.account.franchise;
 let sold=0,refused=0;
 for(let turn=0;turn<900&&g.run.day<4;turn++){
  if(g.run.phase!=='sell'){step(g);continue;}
  const n=g.current(),before={...fr};
  const st=g.run.inventory[0];
  if(!st||n.pack.length>=Adventurer.slots(n)){g.depart();continue;}
  let ok=false;
  try{ok=g.sell(st.id,'full');}catch(e){g.depart();continue;}
  if(ok){sold++;
   assert.equal(fr.sales,before.sales+1,'a committed sale counts exactly one');
   assert.equal(fr.overcharged,before.overcharged,'a 정가 sale is not a 150% one');
   assert.equal(fr.returning,before.returning+(n.visits>1?1:0),'a returning customer counts only when returning');
  }else{refused++;
   assert.deepEqual({...fr},before,'a refusal credits nothing at all');
  }
 }
 assert.ok(sold>0,'the sweep actually sold something');
 // 5 is the same supplied survival knowledge already recognises, per Family
 const a=Meta.fresh();
 const rep={day:3,dungeon:'spider',items:['rice'],outcome:'성공',events:[]};
 Meta.observe(a,rep,null);
 assert.deepEqual(a.franchise.families,['spider'],'a supplied survival records its Family');
 Meta.observe(a,{...rep},null);
 assert.deepEqual(a.franchise.families,['spider'],'the same Family does not count twice');
 Meta.observe(a,{...rep,dungeon:'snow'},null);
 assert.equal(a.franchise.families.length,2,'a different Family does');
 Meta.observe(a,{...rep,dungeon:'fire',outcome:'사망'},null);
 assert.equal(a.franchise.families.length,2,'a death is not a survival');
 Meta.observe(a,{...rep,dungeon:'fire',items:[]},null);
 assert.equal(a.franchise.families.length,2,'and an unsupplied survival is not one either');
 // 6/7/8/9 need a Run that actually kept a record
 const one=(run,win)=>{const acc=Meta.fresh();Meta.finish(acc,run,win);return acc.franchise.done;};
 assert.deepEqual(one({rewarded:false,bossId:'WRATH'},true),[],'a Run with no record credits nothing');
 const base={rewarded:false,bossId:'WRATH',day:30,stats:{waste:0,deaths:0,revenue:0}};
 assert.ok(one({...base,finalReport:{members:[]}},false).includes('nowaste'),'reaching the Final with no waste counts');
 assert.ok(one({...base,finalReport:{members:[]}},false).includes('nodeath'),'and with nobody lost');
 assert.ok(!one({...base,stats:{waste:1,deaths:0,revenue:0},finalReport:{members:[]}},false).includes('nowaste'),'one discarded stock is not zero');
 assert.ok(!one({...base,stats:{waste:0,deaths:1,revenue:0},finalReport:{members:[]}},false).includes('nodeath'),'one death is not zero');
 const supplied={...base,finalReport:{members:[{job:'warrior',items:['rice']},{job:'mage',items:['potion']}]}};
 assert.ok(one(supplied,true).includes('allsupplied'),'every participant supplied, then a CLEAR');
 assert.ok(!one({...supplied,finalReport:{members:[{job:'warrior',items:['rice']},{job:'mage',items:[]}]}},true).includes('allsupplied'),
  'one empty Bag is not every participant');
 assert.ok(!one(supplied,false).includes('allsupplied'),'and it needs the CLEAR');
 assert.ok(one({...base,stats:{waste:0,deaths:0,revenue:10000},finalReport:{members:[{job:'warrior',items:['rice']}]}},true).includes('grosssales'),
  'exactly 10,000G with a CLEAR counts');
 assert.ok(!one({...base,stats:{waste:0,deaths:0,revenue:9999},finalReport:{members:[{job:'warrior',items:['rice']}]}},true).includes('grosssales'),
  'a gold short does not');
 // the whole account state survives a save, and an account without the block still reads
 g.save();
 const round=Save.import(Save.export(g.account,g.run));
 assert.deepEqual(round.account.franchise,g.account.franchise,'the Franchise record survives a reload');
 assert.ok(Save.valid(JSON.parse(Save.export(g.account,g.run))),'and the save still validates');
 const legacy=Meta.fresh();delete legacy.franchise;
 assert.equal(Meta.grade(legacy),1,'an account with no Franchise block reads as Grade 1');
 assert.equal(Meta.orderDiscount(legacy),0,'with no discount');
});

console.log(count+' integration groups passed');
