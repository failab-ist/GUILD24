const assert=require('node:assert/strict');for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const copy=x=>JSON.parse(JSON.stringify(x));const fresh=seed=>{let g=new Game();g.autosave=false;g.start(seed||'revision-test');g.buyRelic(g.run.relicWindow.candidateIds[0]);g.beginOrder();return g;};let checks=0;function test(name,fn){fn();checks++;console.log('PASS '+name);}function accept(g,fn){const original=g.rng.next.bind(g.rng);g.rng.next=()=>{original();return 0;};try{return fn();}finally{g.rng.next=original;}}
test('pricing and actual acquisition cost; wallet and stock conservation',()=>{for(const mode of Object.keys(DATA.pricing)){const g=fresh();g.order(0);const st=g.run.inventory.at(-1);assert.equal(st.cost,g.run.offers[0].price);g.open();const n=g.current();n.money=9999;const before=g.run.money,wallet=n.money;accept(g,()=>g.sell(st.id,mode));const paid=Math.round(DATA.itemBy[st.item].sell*DATA.pricing[mode].mult);assert.equal(g.run.money-before,paid);assert.equal(wallet-n.money,paid);assert.equal(g.run.daily.cogs,st.cost);assert.ok(n.loyalty>=0);}});
test('all paid modes obey wallet, unknown modes rejected, refusal keys safe',()=>{const g=fresh();g.open();g.current().money=0;for(const mode of Object.keys(DATA.pricing))assert.throws(()=>g.sell(g.run.inventory[0].id,mode));assert.throws(()=>g.interest(g.current(),DATA.itemBy.water,'free'));const n=g.current();n.money=999;const original=g.rng.next;g.rng.next=()=>.999;assert.equal(g.sell(g.run.inventory[0].id,'full'),false);g.rng.next=original;assert.ok(n.refused[0].includes(':full'));assert.throws(()=>g.sell(g.run.inventory[0].id,'full'));});
test('tasting grants first half-price subsidy once',()=>{const g=fresh();g.run.event=DATA.events.find(e=>e.id==='tasting');g.open();g.current().money=999;accept(g,()=>g.sell(g.run.inventory[0].id,'half'));accept(g,()=>g.sell(g.run.inventory[0].id,'half'));assert.equal(g.run.daily.subsidy,50);});
test('trait source of truth; showoff changes information only',()=>{const g=fresh(),n=g.run.npcs[0],it=DATA.itemBy.potion;n.money=999;n.traits=[];const a=g.interest(n,it).chance;n.traits=['frugal'];assert.ok(Math.abs(g.interest(n,it).chance-a-DATA.traitBy.frugal.effects.priceBias)<1e-9);n.traits=['showoff'];assert.equal(Dungeon.prepare(n,g.run.dungeons[0]).effects.xpMult,1);assert.equal(DATA.traitBy.showoff.effects.overchargeBias,undefined);assert.equal(DATA.traitBy.showoff.effects.rareBias,undefined);});
test('showoff actual route fixed before sale without price benefit',()=>{const g=fresh();g.run.day=15;g.run.npcs.forEach(n=>n.traits=['showoff']);g.morning();g.beginOrder();g.open();const n=g.current(),dest=n.destination;n.money=999;const yes=g.interest(n,DATA.itemBy.water,'overcharge').chance;n.traits=[];const no=g.interest(n,DATA.itemBy.water,'overcharge').chance;assert.equal(yes,no);g.depart();assert.equal(n.destination,dest);});
test('coupon pending capped; explicit duplication; ordinary effects additive',()=>{const g=fresh(),n={...g.run.npcs[0],traits:[]},d=g.run.dungeons[0];const e=pack=>Dungeon.prepare({...n,pack},d).effects;assert.equal(e(['coupon','coupon','highpotion']).survival,e(['coupon','highpotion']).survival);assert.equal(e(['highpotion','coupon']).survival+27,e(['coupon','highpotion']).survival);assert.equal(e(['lava','water']).thirst,DATA.itemBy.lava.effects.thirst);assert.equal(e(['coupon','tree']).revive,2);});
test('atomic cart validates funds, capacity and supply without mutation',()=>{const g=fresh();const before=copy(g.run);assert.throws(()=>g.setQuantity(0,999));assert.deepEqual(g.run,before);g.setQuantity(0,1);const cost=g.cartTotal();assert.equal(g.run.money,before.money);assert.throws(()=>g.open());g.confirmOrder();assert.equal(g.run.money,before.money-cost);assert.equal(g.cartTotal(),0);const money=g.run.money;g.confirmOrder();assert.equal(g.run.money,money);});
test('warehouse capacity and finite shelf life; slot growth preserved',()=>{const g=fresh();g.run.inventory=[];g.run.facilities=['fridge'];g.stock('battery',24);assert.equal(g.canStock(DATA.itemBy.battery),false);assert.equal(g.canStock(DATA.itemBy.rice),false);g.run.inventory=[];g.stock('rice',2);assert.equal(Adventurer.slots({level:9}),2);assert.equal(Adventurer.slots({level:10}),3);g.run.day=4;g.morning();assert.equal(g.run.inventory.length,0);});
test('night only once, empty night neutral, visitor forecast exact',()=>{const g=fresh();const count=g.run.queue.length;g.open();while(g.run.phase==='sell')g.depart();assert.equal(g.run.results.length,count);const money=g.run.money;g.night();assert.equal(g.run.money,money);const h=fresh();h.run.queue=[];h.open();assert.match(h.run.regionReport,/없었다/);});
test('old prototype rejected; v6 cart and window resume intact',()=>{const g=fresh();g.setQuantity(0,1);g.save();const restored=Save.import(Save.export(g.account,g.run));assert.deepEqual(restored.run.cart,g.run.cart);assert.deepEqual(restored.run.relicWindow,g.run.relicWindow);assert.equal(restored.version,6);assert.throws(()=>Save.import(JSON.stringify({...restored,version:4})));});
test('seed and mid-day save replay deterministic',()=>{let a=fresh('replay2'),b=fresh('replay2');a.order(0);b.order(0);b.save();const state=Save.import(Save.export(b.account,b.run));b=new Game(state.account,state.run);b.autosave=false;a.open();b.open();while(a.run.phase==='sell'){a.depart();b.depart();}assert.deepEqual(a.run,b.run);});
test('bankruptcy, final supply and boss one-shot preserved',()=>{const g=fresh();g.run.phase='closing';g.run.day=5;g.closeDay();assert.equal(g.run.phase,'morning');assert.equal(g.run.day,6);g.run.day=30;const n=g.run.npcs[0];n.recovery=0;n.introduced=true;Adventurer.grow(n,10000,g.rng);g.morning();g.selectFinal(n.id);g.stock("potion",1);g.supplyFinal(n.id,g.run.inventory[0].id);assert.equal(n.history.at(-1).mode,'supply');g.boss();const xp=g.account.xp;g.boss();assert.equal(g.account.xp,xp);const h=fresh();h.run.phase='closing';h.run.money=-1;h.run.inventory=[];h.closeDay();assert.equal(h.run.phase,'end');});
test('all effect keys presented and names readable',()=>{for(const it of DATA.items){const rows=Presentation.rows(it.effects);assert.ok(rows.length);for(const key of Object.keys(it.effects))assert.ok(rows.some(r=>r.key===key)||key==='jobBonus');}const r=new RNG('names');for(let i=0;i<500;i++)assert.ok(!/\s/.test(Adventurer.name(r,0)));});
test('headless 30-day smoke',()=>{const a=Debug.simulate(3,'balanced');assert.equal(a.runs,3);assert.ok(a.reached30>=0);assert.ok(Number.isFinite(a.averageMoney));});


test('seven relic windows, stable offers, phase gating and no duplicate purchase',()=>{const g=new Game();g.autosave=false;g.start('window');assert.equal(g.run.phase,'foundation');const w=copy(g.run.relicWindow);assert.equal(w.candidateIds.length,3);assert.equal(new Set(w.candidateIds).size,3);assert.ok(w.candidateIds.every(id=>DATA.relicBy[id].kind==='foundation'));g.buyRelic(w.candidateIds[0]);for(const day of [5,10,15,20,25,30]){g.run.day=day;g.morning();const offer=copy(g.run.relicWindow);g.save();const restored=Save.import(Save.export(g.account,g.run));assert.deepEqual(restored.run.relicWindow,offer);g.run.money=10000;const id=offer.candidateIds[0];g.buyRelic(id);assert.throws(()=>g.buyRelic(id));}assert.equal(g.run.facilities.length,7);assert.ok(g.run.relicWindow.candidateIds.every(id=>DATA.relicBy[id].finalUseful));});
test('window deferral and expiration; purchases blocked during sale',()=>{const g=fresh();g.run.day=5;g.morning();const w=copy(g.run.relicWindow);g.run.day=9;g.morning();assert.deepEqual(g.run.relicWindow,w);g.beginOrder();g.open();assert.throws(()=>g.buyRelic(w.candidateIds[0]));g.run.day=10;g.morning();assert.equal(g.run.relicWindow.milestoneDay,10);});
test('fridge existing stock only once, future stock and expiry finite',()=>{const g=fresh();g.run.facilities=[];const st=g.run.inventory.find(x=>x.item==='water'),before=st.expires;g.run.relicWindow={milestoneDay:5,candidateIds:['fridge'],candidatePrices:[0],purchased:null,expiryDay:10};g.buyRelic('fridge');assert.equal(st.expires,before+1);g.run.day=2;g.morning();assert.equal(st.expires,before+1);g.stock('water',1);assert.equal(g.run.inventory.at(-1).expires,2+5+1);});
test('no pre-reveal; dead NPCs release active capacity; contradictory traits absent',()=>{const g=fresh();assert.ok(g.run.npcs.every(n=>!n.introduced));g.open();assert.equal(g.run.npcs.filter(n=>n.introduced).length,1);while(g.run.npcs.filter(n=>n.alive).length<22)g.addNPC();g.run.npcs[0].alive=false;assert.ok(g.addNPC());for(const n of g.run.npcs)for(const pair of DATA.traitExclusions)assert.ok(!pair.every(t=>n.traits.includes(t)));});
test('tier bands and family diversity',()=>{for(let seed=0;seed<25;seed++){const g=fresh('tier-'+seed);assert.ok(g.run.dungeons.every(d=>d.tier===1));assert.equal(g.run.familyOrder.length,5);g.run.day=29;g.morning();assert.ok(g.run.dungeons.every(d=>d.tier>=2));if(!g.run.event?.effects.unknown)assert.equal(new Set(g.run.dungeons.map(d=>d.family)).size,g.run.dungeons.length);}});
test('bulk discount quote equals actual debit; reroll does not farm pity',()=>{const g=fresh();g.run.facilities=['bulk','delivery'];g.run.inventory=[];g.run.offers=[{item:'water',price:25,quantity:5}];g.setQuantity(0,3);const total=g.cartTotal(),money=g.run.money;g.confirmOrder();assert.equal(money-g.run.money,total);assert.equal(g.run.inventory.reduce((v,st)=>v+st.cost,0),total);const pity=copy(g.run.pity);g.reroll(0);assert.deepEqual(g.run.pity,pity);});
test('empty provisioning cannot grind knowledge',()=>{const g=fresh();g.open();while(g.run.phase==='sell')g.depart();assert.deepEqual(g.account.knowledge,{});});
test('same SKU bulk across separate offers; board does not change rookie level',()=>{const g=fresh();g.run.facilities=['bulk'];g.run.inventory=[];g.run.offers=[{item:'water',price:25,quantity:2},{item:'water',price:25,quantity:2}];g.setQuantity(0,2);g.setQuantity(1,1);assert.equal(g.cartTotal(),71);g.confirmOrder();assert.equal(g.run.inventory.reduce((a,x)=>a+x.cost,0),71);const a=fresh('board-level'),b=fresh('board-level');a.run.facilities=[];b.run.facilities=['board'];assert.equal(a.addNPC().level,b.addNPC().level);});
test('BOSS-Q01: one Boss per Run, fixed, and dealt without disturbing any other seeded result',()=>{
 const ids=new Set();
 for(let i=0;i<80;i++){const g=fresh('boss-'+i);
  assert.ok(DATA.bossBy[g.run.bossId],'the Run carries a real Boss id');
  ids.add(g.run.bossId);
  assert.deepEqual(g.run.bossReveal,{identitySeen:false,traitSeen:false},'nothing is revealed yet');
  const again=fresh('boss-'+i);
  assert.equal(again.run.bossId,g.run.bossId,'the same seed deals the same Boss');
 }
 assert.equal(ids.size,7,'every Boss is reachable across seeds');
 // The Boss comes from a stream derived from the run seed rather than the main one, so
 // the main stream is untouched. These three are what the build produced for these seeds
 // BEFORE the Boss was added: if dealing a Boss ever consumes a main-stream draw, the
 // run stops matching its own history here.
 for(const [seed,order,intro] of [
  ['sig-0',['fire','slime','spider','crypt','snow'],[4,11]],
  ['sig-1',['slime','crypt','spider','snow','fire'],[4,9]],
  ['sig-2',['crypt','snow','spider','fire','slime'],[4,11]]]){
  const g=new Game();g.autosave=false;g.start(seed);
  assert.deepEqual(g.run.familyOrder,order,seed+' still draws the same Family order');
  assert.deepEqual(g.run.familyIntro,intro,seed+' still draws the same Family introduction Days');
 }
});

test('BOSS-Q11: SLOTH carries two distinct opportunity Days and no breaks yet; others carry no SLOTH state',()=>{
 let sloth=0,other=0;
 for(let i=0;i<400&&(sloth<8||other<8);i++){const g=fresh('sloth-'+i),r=g.run;
  if(r.bossId==='SLOTH'){sloth++;
   assert.equal(r.slothDays.length,2,'exactly two opportunity Days');
   assert.equal(new Set(r.slothDays).size,2,'the two Days are distinct');
   assert.ok(r.slothDays.every(d=>[15,20,25].includes(d)),'chosen from D15/D20/D25 only');
   assert.ok(!r.slothDays.includes(10),'D10 is never an opportunity');
   assert.equal(r.sealBreakCount,0,'a fresh Run has broken no seal');
   assert.deepEqual(fresh('sloth-'+i).run.slothDays,r.slothDays,'the same seed picks the same Days');
  }else{other++;
   assert.equal(r.slothDays,undefined,'a non-SLOTH Run stores no opportunity Days');
   assert.equal(r.sealBreakCount,undefined,'a non-SLOTH Run stores no break count');
  }
  assert.ok(Save.valid(JSON.parse(Save.export(g.account,g.run))),'the Boss state saves and validates');
 }
 assert.ok(sloth>0&&other>0,'both shapes were actually exercised');
});

test('the retired single-Boss identity is gone and nothing was invented to replace it',()=>{
 const final=DATA.dungeonBy.final;
 assert.equal(final.monster,undefined,'the Final gate no longer names a fixed Boss');
 assert.equal(final.weakness,undefined,'and carries no placeholder weakness line');
 const ui=require('node:fs').readFileSync(require('node:path').join(__dirname,'../dist/ui/app.js'),'utf8');
 assert.ok(/monsters'\?D\.dungeons\.filter\(d=>d\.id!=='final'\)/.test(ui.replace(/\s+/g,'')),
  'Monster Knowledge lists only Families that can actually accrue it');
 for(const f of ['dist/data/catalog.js','dist/ui/app.js'])
  assert.ok(!require('node:fs').readFileSync(require('node:path').join(__dirname,'..',f),'utf8').includes('아르카돈'),
   f+' carries no trace of the retired identity');
});

/* META v2.5: the Job x Boss matrix is the only progression truth. */
const clear=(a,bossId,jobs)=>Meta.finish(a,{rewarded:false,bossId,finalReport:{members:jobs.map(job=>({job}))}},true);

test('META-Q02/Q03/Q04/Q05: a clear credits each distinct Job that went, once, and a failure credits nothing',()=>{
 const a=Meta.fresh();
 clear(a,'WRATH',['warrior','warrior','archer']);      // Q04 + the duplicate-in-party case
 assert.equal(Meta.jobMastery(a,'warrior'),1,'a Job represented twice still earns one cell');
 assert.equal(Meta.jobMastery(a,'archer'),1,'each distinct Job in the party earns its own');
 assert.equal(Meta.totalJobMastery(a),2);
 clear(a,'WRATH',['warrior']);                          // Q03 duplicate pair
 assert.equal(Meta.jobMastery(a,'warrior'),1,'repeating a pair already held adds nothing');
 clear(a,'PRIDE',['warrior']);
 assert.equal(Meta.jobMastery(a,'warrior'),2,'a new Boss with the same Job does add');
 const before=Meta.totalJobMastery(a);
 Meta.finish(a,{rewarded:false,bossId:'ENVY',finalReport:{members:[{job:'mage'}]}},false);
 assert.equal(Meta.totalJobMastery(a),before,'a failed Final credits nothing at all');
 // and a run settles exactly once
 const run={rewarded:false,bossId:'ENVY',finalReport:{members:[{job:'mage'}]}};
 clear(a,'ENVY',['mage']);Meta.finish(a,run,true);Meta.finish(a,run,true);
 assert.equal(Meta.jobMastery(a,'mage'),1,'the rewarded guard still holds');
});

test('META-Q06/Q11: distinct clears count Bosses, and the Grade is derived from Mastery alone',()=>{
 const a=Meta.fresh();
 clear(a,'WRATH',['warrior']);clear(a,'WRATH',['archer']);clear(a,'WRATH',['mage']);
 assert.equal(Meta.distinctBossClear(a),1,'the same Boss with three Jobs is still one Boss');
 assert.equal(Meta.totalJobMastery(a),3,'but three Mastery');
 for(const [mastery,expected] of [[0,1],[6,1],[7,2],[13,2],[14,3],[21,4],[28,5],[34,5],[35,6],[42,6]]){
  const b=Meta.fresh();let n=0;
  outer:for(const job of Meta.JOBS())for(const boss of Meta.BOSSES()){if(n>=mastery)break outer;b.matrix[job][boss]=true;n++;}
  assert.equal(Meta.totalJobMastery(b),mastery);
  assert.equal(Meta.grade(b),expected,mastery+' Mastery is Grade '+expected);
 }
 assert.equal(Meta.grade({matrix:Meta.freshMatrix()}),1,'a fresh account is Grade 1');
});

test('META-Q07/Q08/Q09/Q10 + NPC-Q09: the 1/3/6 gates open exactly what they say, and nothing before',()=>{
 const a=Meta.fresh();
 assert.deepEqual(DATA.jobs.filter(j=>Meta.jobUnlocked(a,j)).map(j=>j.id),['warrior','archer','mage','priest'],
  'a fresh account generates only the four starting Jobs');
 assert.equal(DATA.items.filter(i=>Meta.itemUnlocked(a,i)).length,29,'and 29 of the 30 Items are eligible');
 assert.equal(Meta.itemUnlocked(a,DATA.itemBy.coupon),false,'the coupon is the one that is not');
 const bosses=Meta.BOSSES();
 const beat=n=>{const b=Meta.fresh();for(let i=0;i<n;i++)clear(b,bosses[i],['warrior']);return b;};
 assert.equal(Meta.itemUnlocked(beat(1),DATA.itemBy.coupon),true,'one distinct clear opens the coupon');
 assert.equal(Meta.jobUnlocked(beat(2),DATA.jobBy.rogue),false,'two does not open 도적');
 assert.equal(Meta.jobUnlocked(beat(3),DATA.jobBy.rogue),true,'three does');
 assert.equal(Meta.jobUnlocked(beat(5),DATA.jobBy.berserker),false,'five does not open 광전사');
 assert.equal(Meta.jobUnlocked(beat(6),DATA.jobBy.berserker),true,'six does');
});

test('META-Q11/Q15/Q16: the Grade gates Start Contracts and grants nothing else',()=>{
 const a=Meta.fresh();
 assert.deepEqual(DATA.contracts.filter(c=>Meta.contractUnlocked(a,c)).map(c=>c.id),['standard'],
  'a fresh account may only take the default contract');
 for(const [grade,id] of [[2,'delivery'],[3,'guild'],[4,'budget'],[5,'premium']]){
  const b={matrix:Meta.freshMatrix()};let n=0;
  outer:for(const job of Meta.JOBS())for(const boss of Meta.BOSSES()){if(n>=(grade-1)*7)break outer;b.matrix[job][boss]=true;n++;}
  assert.equal(Meta.grade(b),grade);
  assert.ok(Meta.contractUnlocked(b,DATA.contracts.find(c=>c.id===id)),'Grade '+grade+' opens '+id);
 }
 // Grade 6 opens no further contract - it is prestige, not another unlock
 const six={matrix:Meta.freshMatrix()};for(const job of Meta.JOBS())for(const boss of Meta.BOSSES())six.matrix[job][boss]=true;
 assert.equal(Meta.grade(six),6);
 assert.deepEqual(Meta.opened(six).contracts,DATA.contracts.map(c=>c.id),'every contract is open by Grade 5 already');
 // the Grade is never a bonus: starting gold and capacity do not move with it
 const g1=new Game(Meta.fresh());g1.autosave=false;g1.start('grade-1');
 const g6=new Game(six.matrix?{...Meta.fresh(),matrix:six.matrix}:Meta.fresh());g6.autosave=false;g6.start('grade-1');
 assert.equal(g6.run.money,g1.run.money,'starting funds do not move with the Grade');
 assert.equal(g6.capacity(),g1.capacity(),'and neither does warehouse capacity');
 assert.equal(g6.run.inventory.length,g1.run.inventory.length,'and no extra stock is handed out');
});

test('META-Q01/Q14 + RUN-Q30: the legacy XP ladder and its fourteen keys are gone, with nothing left accruing',()=>{
 assert.equal(DATA.unlocks,undefined,'the legacy unlock table is removed');
 for(const name of ['bump','check'])assert.equal(Meta[name],undefined,'Meta.'+name+' is gone');
 const a=Meta.fresh();
 for(const k of ['xp','grade','unlocked','progress','lastUnlocks'])
  assert.ok(!(k in a),'a fresh account carries no '+k);
 // advancing Days earns no progression whatsoever
 const g=new Game(Meta.fresh());g.autosave=false;g.start('farm');
 g.buyRelic(g.run.relicWindow.candidateIds[0]);
 for(let i=0;i<8&&g.run.phase!=='end';i++){
  if(g.run.phase==='morning')g.beginOrder();else if(g.run.phase==='order')g.open();
  else if(g.run.phase==='sell')g.depart();else if(g.run.phase==='night')g.finishNight();
  else if(g.run.phase==='closing'&&g.closeDay()===false)break;
 }
 assert.equal(Meta.totalJobMastery(g.account),0,'no Mastery from advancing Days');
 assert.equal(Meta.grade(g.account),1,'and no Grade');
 for(const f of ['dist/systems/shop.js','dist/systems/run.js','dist/ui/app.js'])
  assert.ok(!require('node:fs').readFileSync(require('node:path').join(__dirname,'..',f),'utf8').includes('account.xp'),
   f+' reads no account XP');
});

test('NPC-Q10: Job Mastery has no power channel yet, and no hidden account-wide multiplier exists',()=>{
 // Mastery that does not cross an unlock gate must change nothing at all. Twelve Mastery
 // across only two distinct Bosses leaves the Job pool exactly as it was, so any difference
 // in the adventurers it rolls would be a bonus leaking in where none is approved.
 const plain=Meta.fresh(),masterly=Meta.fresh();
 for(const job of Meta.JOBS())for(const boss of Meta.BOSSES().slice(0,2))masterly.matrix[job][boss]=true;
 assert.equal(Meta.totalJobMastery(masterly),12,'real Mastery');
 assert.equal(Meta.grade(masterly),2,'and a real Grade');
 assert.equal(Meta.distinctBossClear(masterly),2,'but below every content gate');
 assert.deepEqual(DATA.jobs.filter(j=>Meta.jobUnlocked(masterly,j)).map(j=>j.id),
                  DATA.jobs.filter(j=>Meta.jobUnlocked(plain,j)).map(j=>j.id),'so the Job pool is unchanged');
 const a=new Game(plain),b=new Game(masterly);a.autosave=b.autosave=false;
 a.start('mastery');b.start('mastery');
 const strip=n=>({job:n.job,level:n.level,stats:n.stats,potential:n.potential});
 assert.deepEqual(b.run.npcs.map(strip),a.run.npcs.map(strip),
  'twelve Mastery rolls exactly the same adventurers with exactly the same Stats');
 assert.equal(b.run.money,a.run.money,'and the same starting funds');
 assert.equal(b.capacity(),a.capacity(),'and the same warehouse');
 // the Job table itself carries no per-account channel to begin with
 for(const j of DATA.jobs)assert.equal(j.masteryBonus,undefined,j.id+' has no mastery power field yet');
});

test('v0.1 fixture intentionally rejected without reinterpretation',()=>{const fs=require('node:fs');const old=fs.readFileSync(require('node:path').join(__dirname,'fixtures/v01-sale.json'),'utf8');assert.throws(()=>Save.import(old));});
console.log(checks+' revision groups passed');
