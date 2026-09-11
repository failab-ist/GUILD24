// Chunk G acceptance: the Save contract, determinism, save→load→continue equivalence and
// the Night Skip contract. Covers CORE_RUN §SAVE/LOAD §GATE/DUNGEON STATE §RUN RANDOMNESS,
// CORE_RUN_QA RUN-Q10/Q11/Q12/Q13/Q19/Q20 and NIGHT_CLOSING §SKIP CONTRACT §SAVE/RESUME.
// These drive the real engine: a round trip is asserted by continuing the run, never by
// comparing serialised shape alone.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const copy=x=>JSON.parse(JSON.stringify(x));
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

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
  case'closing':g.closeDay();return true;
  case'final':{
   const team=s.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery).sort((a,b)=>b.level-a.level).slice(0,g.finalRequired());
   for(const n of team)g.selectFinal(n.id);
   if(team.length)g.boss();else g.end(false,'출전 가능한 모험가 없음');
   return true;}
  default:return false;}
}
function play(g,limit=4000){let turns=0;while(g.run.phase!=='end'&&turns++<limit)if(!step(g))break;return g;}
function fresh(seed){const g=new Game();g.autosave=false;g.start(seed);return g;}
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
 const g=fresh('save-final');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 while(g.run.day<30&&g.run.phase!=='end')step(g);
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
   assert.equal(store.get('guild24.save.v6'),undefined,label+': nothing is migrated into the v6 key');
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
  const first=store.get('guild24.save.v6');
  g.run.money+=1;g.save();
  assert.equal(store.get('guild24.save.v6.backup'),first,'the previous save is preserved as a backup');
  assert.equal(store.get('guild24.save.v4'),legacy,'the v4 bytes are still there afterwards');
  // A corrupted head falls back to the backup rather than losing the run.
  store.set('guild24.save.v6','{not json');
  const recovered=Save.read();
  assert.ok(recovered&&recovered.version===6,'the backup is read when the head is unreadable');
  assert.equal(recovered.run.money,g.run.money-1,'the recovered run is the previous save, not an invention');
 }finally{delete global.localStorage;}
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
 for(const at of phases){
  const seed='resume-'+at;
  const straight=play(fresh(seed));
  const g=fresh(seed);
  let turns=0,cut=false;
  while(g.run.phase!=='end'&&turns++<4000){
   if(!cut&&g.run.phase===at){cut=true;const h=reload(g);
    assert.deepEqual(h.run,g.run,at+': the reloaded run is the same run');
    assert.equal(h.rng.state,g.rng.state,at+': the RNG resumes where it stopped');
    play(h);
    assert.deepEqual(h.run,straight.run,at+': continuing from the save lands on the same run');
    assert.deepEqual(h.account,straight.account,at+': and on the same account');
    break;}
   if(!step(g))break;
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

test('NIGHT_CLOSING §SKIP CONTRACT: Skip and Skip All move the reading position and nothing else',()=>{
 const g=fresh('skip');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 let nights=0,skipped=0;
 while(g.run.phase!=='end'&&nights<8){
  while(g.run.phase!=='night'&&g.run.phase!=='end')step(g);
  if(g.run.phase!=='night')break;
  nights++;
  const before={results:copy(g.run.results),npcs:copy(g.run.npcs),money:g.run.money,
   inventory:copy(g.run.inventory),stats:copy(g.run.stats),daily:copy(g.run.daily),
   rngState:g.rng.state,account:copy(g.account)};
  // Skip, the real rule the Night screen calls, walked to the end of the list.
  let cursor=0,guard=0;
  while(cursor<g.run.results.length&&guard++<64){
   const next=Presentation.nightSkip(g.run.results,cursor);
   assert.ok(next>cursor,'Skip always advances');
   assert.ok(next<=g.run.results.length,'Skip stops at the end of the list');
   for(let i=cursor+1;i<next;i++)
    assert.equal(Presentation.nightWeight(g.run.results[i]),false,'Skip only passes over routine beats');
   cursor=next;skipped++;
  }
  assert.equal(cursor,g.run.results.length,'Skip reaches the end');
  assert.deepEqual(g.run.results,before.results,'no resolved outcome, EXP, loot, injury or death changed');
  assert.deepEqual(g.run.npcs,before.npcs,'no Wallet or NPC state changed');
  assert.equal(g.rng.state,before.rngState,'Skip consumes no randomness');
  assert.deepEqual(g.account,before.account,'Skip grants no Meta reward');
  // Skip All: the same move with the end of the list as its target.
  g.run.nightCursor=0;
  g.finishNight();
  assert.equal(g.run.phase,'closing');
  assert.deepEqual(g.run.results,before.results,'Skip All leaves every resolved result alone');
  assert.deepEqual(g.run.npcs,before.npcs,'Skip All changes no NPC state');
  assert.equal(g.run.money,before.money,'Skip All moves no Gold');
  assert.deepEqual(g.run.inventory,before.inventory,'Skip All consumes no stock');
  assert.deepEqual(g.run.stats,before.stats,'Skip All changes no Run total');
  assert.deepEqual(g.run.daily,before.daily,'Skip All changes no daily settlement');
  assert.equal(g.rng.state,before.rngState,'Skip All is not a different resolution path');
  assert.deepEqual(g.account,before.account,'Skip All grants no Meta reward');
  step(g);
 }
 assert.ok(nights>=4&&skipped>0,'several Nights were skipped through');
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
  skip.run.nightCursor=Presentation.nightSkip(skip.run.results,skip.run.results.length);
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

console.log(count+' integration groups passed');
