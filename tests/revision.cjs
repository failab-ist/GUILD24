const assert=require('node:assert/strict');for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const copy=x=>JSON.parse(JSON.stringify(x));const fresh=seed=>{let g=new Game();g.autosave=false;g.start(seed||'revision-test');g.buyRelic(g.run.relicWindow.candidateIds[0]);g.beginOrder();return g;};let checks=0;function test(name,fn){fn();checks++;console.log('PASS '+name);}function accept(g,fn){const original=g.rng.next.bind(g.rng);g.rng.next=()=>{original();return 0;};try{return fn();}finally{g.rng.next=original;}}
test('pricing and actual acquisition cost; wallet and stock conservation',()=>{for(const mode of Object.keys(DATA.pricing)){const g=fresh();g.order(0);const st=g.run.inventory.at(-1);assert.equal(st.cost,g.run.offers[0].price);g.open();const n=g.current();n.money=9999;const before=g.run.money,wallet=n.money;accept(g,()=>g.sell(st.id,mode));const paid=Math.round(DATA.itemBy[st.item].sell*DATA.pricing[mode].mult);assert.equal(g.run.money-before,paid);assert.equal(wallet-n.money,paid);assert.equal(g.run.daily.cogs,st.cost);assert.ok(n.loyalty>=0);}});
test('all paid modes obey wallet, unknown modes rejected, refusal keys safe',()=>{const g=fresh();g.open();g.current().money=0;for(const mode of Object.keys(DATA.pricing))assert.throws(()=>g.sell(g.run.inventory[0].id,mode));assert.throws(()=>g.interest(g.current(),DATA.itemBy.water,'free'));const n=g.current();n.money=999;const original=g.rng.next;g.rng.next=()=>.999;assert.equal(g.sell(g.run.inventory[0].id,'full'),false);g.rng.next=original;assert.ok(n.refused[0].includes(':full'));assert.throws(()=>g.sell(g.run.inventory[0].id,'full'));});
test('tasting grants first half-price subsidy once',()=>{const g=fresh();g.run.event=DATA.events.find(e=>e.id==='tasting');g.open();g.current().money=999;accept(g,()=>g.sell(g.run.inventory[0].id,'half'));accept(g,()=>g.sell(g.run.inventory[0].id,'half'));assert.equal(g.run.daily.subsidy,50);});
/* Stage 10: the price a Trait's 구매의사 reacts to is the JUDGED price (pricing.intentMult), not
   what is charged. 하급 포션 at 140G used to cross frugalThreshold at 정가 and no longer does -
   it is judged at 91 - so the aversion is shown on an item that still crosses it at 195. */
/* ECONOMY_ORDER_v2.8 §FULL-CHAIN NUMERIC CLOSURE / SA-Q48: the flat 0.80 accessible-mode base
   need plus a near-zero-burden 정가 bonus saturates at the 0.97 cap when the Wallet is far
   above price (the old 9999 fixture) - clamp saturation, not a trait-additivity break. Setting
   the Wallet to the exact price keeps the purchase affordable while pushing burden above the
   0.36 pivot, so the bonus is zero and the frugal priceBias reads as the clean additive shift
   the test asserts. */
test('trait source of truth; frugal changes information only',()=>{const g=fresh(),n=g.run.npcs[0],it=DATA.itemBy.highpotion;n.money=it.sell;n.traits=[];
 assert.ok(Math.round(it.sell*DATA.pricing.full.intentMult)>DATA.balance.frugalThreshold,'the item is judged above the frugal threshold at 정가');
 assert.ok(Math.round(DATA.itemBy.potion.sell*DATA.pricing.full.intentMult)<=DATA.balance.frugalThreshold,'and an ordinary potion at 정가 is not');
 const a=g.interest(n,it).chance;n.traits=['frugal'];assert.ok(Math.abs(g.interest(n,it).chance-a-DATA.traitBy.frugal.effects.priceBias)<1e-9);});
test('coupon pending capped; explicit duplication; ordinary effects additive',()=>{const g=fresh(),n={...g.run.npcs[0],traits:[]},d=g.run.dungeons[0];const e=pack=>Dungeon.prepare({...n,pack},d).effects;assert.equal(e(['coupon','coupon','highpotion']).combat,e(['coupon','highpotion']).combat);/* ITEM_v2.7: 상급 포션 is 투력 +16, not the old 강인함 +27. The subject here is the coupon's
   duplication, so the amount is read from the catalogue instead of being restated. */
assert.equal(e(['highpotion','coupon']).combat+DATA.itemBy.highpotion.effects.combat,e(['coupon','highpotion']).combat);assert.equal(e(['lava','water']).thirst,DATA.itemBy.lava.effects.thirst);assert.equal(e(['coupon','tree']).revive,2);});
test('atomic cart validates funds, capacity and supply without mutation',()=>{const g=fresh();const before=copy(g.run);assert.throws(()=>g.setQuantity(0,999));assert.deepEqual(g.run,before);g.setQuantity(0,1);const cost=g.cartTotal();assert.equal(g.run.money,before.money);assert.throws(()=>g.open());g.confirmOrder();assert.equal(g.run.money,before.money-cost);assert.equal(g.cartTotal(),0);const money=g.run.money;g.confirmOrder();assert.equal(g.run.money,money);});
test('warehouse capacity and finite shelf life; the Bag is fixed at two slots',()=>{const g=fresh();g.run.inventory=[];g.run.facilities=['fridge'];g.stock('battery',24);assert.equal(g.canStock(DATA.itemBy.battery),false);assert.equal(g.canStock(DATA.itemBy.rice),false);g.run.inventory=[];g.stock('rice',2);/* SALE_v2.7 §NORMAL CONSUMER BAG: two slots for every NPC regardless of Level, Job, Rarity
 or Trait. The Lv10+ third slot is removed, not disabled or hidden. */
 for(const level of [1,5,9,10,11,30])assert.equal(Adventurer.slots({level,rarity:3,job:'warrior',traits:['eater']}),2,'Lv.'+level+' has two slots');
 assert.ok(!/level>=10/.test(require('node:fs').readFileSync(require('node:path').join(__dirname,'..','dist/systems/adventurer.js'),'utf8')),'no Level threshold survives in the slot rule');
 g.run.day=4;g.morning();assert.equal(g.run.inventory.length,0);});
test('night only once, empty night neutral, visitor forecast exact',()=>{const g=fresh();const count=g.run.queue.length;g.open();while(g.run.phase==='sell')g.depart();assert.equal(g.run.results.length,count);const money=g.run.money;g.night();assert.equal(g.run.money,money);const h=fresh();h.run.queue=[];h.open();assert.match(h.run.regionReport,/없었다/);});
test('old prototype rejected; v6 cart and window resume intact',()=>{const g=fresh();g.setQuantity(0,1);g.save();const restored=Save.import(Save.export(g.account,g.run));assert.deepEqual(restored.run.cart,g.run.cart);assert.deepEqual(restored.run.relicWindow,g.run.relicWindow);assert.equal(restored.version,8);assert.throws(()=>Save.import(JSON.stringify({...restored,version:4})));});
test('seed and mid-day save replay deterministic',()=>{let a=fresh('replay2'),b=fresh('replay2');a.order(0);b.order(0);b.save();const state=Save.import(Save.export(b.account,b.run));b=new Game(state.account,state.run);b.autosave=false;a.open();b.open();while(a.run.phase==='sell'){a.depart();b.depart();}assert.deepEqual(a.run,b.run);});
test('bankruptcy, final supply and boss one-shot preserved',()=>{const g=fresh();g.run.phase='closing';g.run.day=5;g.closeDay();assert.equal(g.run.phase,'morning');assert.equal(g.run.day,6);g.run.day=30;const n=g.run.npcs[0];n.recovery=0;n.introduced=true;Adventurer.grow(n,10000,g.rng);g.morning();g.selectFinal(n.id);g.stock("potion",1);
 /* ECONOMY_ORDER_v2.7 §D30 FINAL PREPARATION: a Final transfer is a real paid transaction at
    the fixed 50% amount, so the participant has to be able to afford it and the receipt
    records that price rather than the retired free-equipment mode. */
 const finalPrice=g.finalPrice('potion');n.money=finalPrice;const goldBefore=g.run.money;
 g.supplyFinal(n.id,g.run.inventory[0].id);
 assert.equal(n.history.at(-1).mode,'half');assert.equal(n.history.at(-1).paid,finalPrice);
 assert.equal(n.money,0);assert.equal(g.run.money,goldBefore+finalPrice);g.boss();const xp=g.account.xp;g.boss();assert.equal(g.account.xp,xp);const h=fresh();h.run.phase='closing';h.run.money=-1;h.run.inventory=[];h.closeDay();assert.equal(h.run.phase,'end');});
/* SA-Q05: `potion` is an internal marker read directly off Item data (potionbody's own trigger
   test), never a player-facing effect. It is now the one key `rows()` deliberately authors no
   row for - a labelless 포션 row was exactly the leak SA-Q05 closes - so it is exempted here
   the same way the derived `jobBonus` key already was. */
test('all effect keys presented and names readable',()=>{for(const it of DATA.items){const rows=Presentation.rows(it.effects);assert.ok(rows.length);for(const key of Object.keys(it.effects))assert.ok(rows.some(r=>r.key===key)||key==='jobBonus'||key==='potion');}const r=new RNG('names');for(let i=0;i<500;i++)assert.ok(!/\s/.test(Adventurer.name(r,0)));});
test('headless 30-day smoke',()=>{const a=Debug.simulate(3,'balanced');assert.equal(a.runs,3);assert.ok(a.reached30>=0);assert.ok(Number.isFinite(a.averageMoney));});


test('seven relic windows, stable offers, phase gating and no duplicate purchase',()=>{const g=new Game();g.autosave=false;g.start('window');assert.equal(g.run.phase,'foundation');const w=copy(g.run.relicWindow);assert.equal(w.candidateIds.length,3);assert.equal(new Set(w.candidateIds).size,3);assert.ok(w.candidateIds.every(id=>DATA.relicBy[id].kind==='foundation'));g.buyRelic(w.candidateIds[0]);for(const day of [5,10,15,20,25,30]){g.run.day=day;g.morning();const offer=copy(g.run.relicWindow);g.save();const restored=Save.import(Save.export(g.account,g.run));assert.deepEqual(restored.run.relicWindow,offer);g.run.money=10000;const id=offer.candidateIds[0];g.buyRelic(id);assert.throws(()=>g.buyRelic(id));}assert.equal(g.run.facilities.length,7);assert.ok(g.run.relicWindow.candidateIds.every(id=>!DATA.relicD30NoEffect.includes(id)));});
test('window deferral and expiration; purchases blocked during sale',()=>{const g=fresh();g.run.day=5;g.morning();const w=copy(g.run.relicWindow);g.run.day=9;g.morning();assert.deepEqual(g.run.relicWindow,w);g.beginOrder();g.open();assert.throws(()=>g.buyRelic(w.candidateIds[0]));g.run.day=10;g.morning();assert.equal(g.run.relicWindow.milestoneDay,10);});
/* Stage 10: the Job Mastery spawn roll draws once per NPC, so the seeded stream moved and the
   DAY 0 window can now offer a shelf-life relic - which would leave the opening stock already
   extended and silently make this test about the wrong thing. The clean state this test needs
   is both: no facility, and no extension already recorded on the stock. */
test('fridge existing stock only once, future stock and expiry finite',()=>{const g=fresh();g.run.facilities=[];for(const x of g.run.inventory)delete x.extensions;const st=g.run.inventory.find(x=>x.item==='water'),before=st.expires;g.run.relicWindow={milestoneDay:5,candidateIds:['fridge'],candidatePrices:[0],purchased:null,expiryDay:10};g.buyRelic('fridge');assert.equal(st.expires,before+1);g.run.day=2;g.morning();assert.equal(st.expires,before+1);g.stock('water',1);assert.equal(g.run.inventory.at(-1).expires,2+5+1);});
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
  assert.deepEqual(g.run.bossReveal,{d0Seen:false,identitySeen:false,combatSeen:false,traitSeen:false,routeSeen:false},'nothing is revealed yet');
  const again=fresh('boss-'+i);
  assert.equal(again.run.bossId,g.run.bossId,'the same seed deals the same Boss');
 }
 assert.equal(ids.size,7,'every Boss is reachable across seeds');
 // The Boss comes from a stream derived from the run seed rather than the main one. That
 // is asserted directly: the same derived stream, rebuilt from the seed alone, deals the
 // same Boss - so the Boss is not read off the main stream at all.
 for(const seed of ['sig-0','sig-1','sig-2','sig-3']){
  const g=new Game();g.autosave=false;g.start(seed);
  assert.equal(g.run.bossId,new RNG(String(seed)+':boss').pick(DATA.bosses).id,
   seed+': the Boss is dealt by the derived stream, not by the run stream');
 }
 // And these are the main stream's own anchors. They moved twice in Stage 8, both times for a
 // recorded reason: the 200-name pool changed how often `addNPC` re-rolls a colliding name,
 // and the Rare Reference roll added one always-drawn value per customer created. A move here
 // that no intended RNG change explains means something leaked into the run stream.
 /* Stage 10 re-baselined these once for the Job Mastery spawn roll. The v2.5 final adoption
    moved them again, for one reason: the opening shelf is four items instead of six, and each
    stocked item draws an id from the run stream, so two draws that used to happen before the
    roster is built no longer do. Any future move here without a change to point at means
    something leaked into the run stream. */
 for(const [seed,order,intro] of [
  ['sig-0',['snow','spider','fire','slime','crypt'],[4,10]],
  ['sig-1',['slime','spider','snow','fire','crypt'],[6,10]],
  ['sig-2',['crypt','slime','spider','fire','snow'],[6,10]]]){
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

test('META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM: distinct clears count Bosses, and nothing derives a Grade',()=>{
 const a=Meta.fresh();
 clear(a,'WRATH',['warrior']);clear(a,'WRATH',['archer']);clear(a,'WRATH',['mage']);
 assert.equal(Meta.distinctBossClear(a),1,'the same Boss with three Jobs is still one Boss');
 assert.equal(Meta.totalJobMastery(a),3,'but three Mastery');
 /* The Decoration Package retires Franchise Grade, the ten Achievements, the Grade ORDER
    discount and the Grade-gated Start Contract. The active runtime must not expose any of them -
    the final implementation lives in archive/inactive/v2_7_franchise and is never imported. */
 for(const gone of ['grade','franchiseCount','franchiseState','orderDiscount','gradeRequirement','FRANCHISE'])
  assert.equal(Meta[gone],undefined,'Meta.'+gone+' is retired from the active runtime');
 assert.deepEqual(Object.keys(Meta.opened(a)),['items','jobs'],'no Contract unlock list is derived');
 /* A dormant Franchise payload may persist for data preservation. Dormant means no effect:
    writing the old counters changes nothing the game reads. */
 const dormant=Meta.fresh();
 dormant.franchise.sales=100000;dormant.franchise.done=['nowaste','nodeath','allsupplied','grosssales'];
 assert.deepEqual(Meta.opened(dormant),Meta.opened(Meta.fresh()),'a filled dormant block unlocks nothing');
 assert.equal(Meta.storeCapital(dormant),0,'and earns no Store Capital');
 /* The Contract table and its unlock gate are gone from active Source rather than neutralised:
    nothing read either once the Start Contract was retired, and the final implementation lives
    at archive/inactive/v2_7_franchise/contracts.js. A neutralised gate is still a gate to keep
    correct; an absent one cannot be got wrong. */
 assert.equal(DATA.contracts,undefined,'no Contract table is active');
 assert.equal(Meta.contractUnlocked,undefined,'and no Contract unlock gate is exported');
 const archived=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../archive/inactive/v2_7_franchise/contracts.js'),'utf8');
 for(const id of ['standard','delivery','guild','budget','premium'])
  assert.ok(archived.includes('"'+id+'"'),'the archive still holds '+id+' for the historical record');
 /* A stale v8 save may still carry run.contract. That is dormant payload, which the
    behavioural regression in integration.cjs proves changes nothing measurable. */
 assert.ok(/contract='standard'/.test(require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8')),
  'a new Run writes the dormant field and nothing reads it');
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/index.html'),'utf8');
 assert.ok(!/archive\//.test(src),'the shipped page does not load the inactive archive');
});

test('META_v2.8 §DECORATION COLLECTION / LOADOUT: owning, equipping and the Slot rule',()=>{
 const a=Meta.fresh();
 assert.equal(Meta.storeCapital(a),0,'a fresh Account owns no capital');
 assert.deepEqual(Meta.ownedDecorations(a),[],'and no Decoration');
 assert.deepEqual(Meta.plannedLoadout(a),{},'so an empty loadout is legal');
 const wall=DATA.decorationBy.guildPlaque;
 assert.throws(()=>Meta.buyDecoration(a,wall.id),/자본/,'no capital, no purchase');
 assert.throws(()=>Meta.equipDecoration(a,'wall',wall.id),/보유/,'unowned cannot be equipped');
 Meta.addCapital(a,wall.price);
 Meta.buyDecoration(a,wall.id);
 assert.equal(Meta.storeCapital(a),0,'the price is deducted exactly once');
 assert.throws(()=>Meta.buyDecoration(a,wall.id),/이미/,'and it cannot be bought twice');
 assert.deepEqual(Meta.plannedLoadout(a),{wall:wall.id},'an empty Slot takes the first thing bought for it');
 Meta.equipDecoration(a,'wall',null);
 assert.deepEqual(Meta.plannedLoadout(a),{},'a Slot can be emptied again while still owning it');
 assert.deepEqual(Meta.ownedDecorations(a),[wall.id],'unequipping does not sell it back');
 Meta.equipDecoration(a,'wall',wall.id);
 assert.throws(()=>Meta.equipDecoration(a,'sign',wall.id),/자리/,'a Decoration only fits its own Slot');
 /* At most one active per Slot. The loadout is keyed by Slot, so a second entry cannot exist -
    and the shape is Slot -> id rather than four booleans, which is what lets a Slot hold
    alternatives later. */
 assert.equal(Object.keys(Meta.storeLoadout(a)).length,DATA.decorationSlots.length,'one entry per Slot, always');
 for(const d of DATA.decorations)assert.ok(DATA.decorationSlots.includes(d.slot),d.id+' belongs to a real Slot');
 // the four approved effects and prices, read from the data rather than restated
 assert.deepEqual(DATA.decorations.map(d=>[d.slot,d.price]),
  [['sign',800],['wall',700],['counter',650],['display',550]],'the approved prices ship');
});

test('META_v2.8 §STORE CAPITAL: the Day-reach rate table',()=>{
 /* META_v2.8 §Day-reach conversion rate, DIRECTOR DOCUMENT BASELINE. These multiply Gross
    Sales, not an end-state net worth, which is why they are a fraction of the retired
    net-asset table this line used to carry. */
 for(const [day,rate] of [[1,.01],[9,.01],[10,.02],[19,.02],[20,.03],[24,.03],[25,.04],[29,.04],[30,.05]])
  assert.equal(Meta.capitalRate(day),rate,'D'+day+' converts at '+rate);
 assert.equal(Meta.capitalRate(31),.05,'past D30 stays on the last band rather than falling off');
 const a=Meta.fresh();
 Meta.addCapital(a,120);assert.equal(Meta.storeCapital(a),120,'capital accumulates');
 Meta.addCapital(a,-500);assert.equal(Meta.storeCapital(a),120,'and never goes backwards');
});
test('META-Q07/Q08/Q09/Q10 + NPC-Q09: the 1/3/6 gates open exactly what they say, and nothing before',()=>{
 const a=Meta.fresh();
 assert.deepEqual(DATA.jobs.filter(j=>Meta.jobUnlocked(a,j)).map(j=>j.id),['warrior','archer','mage','priest'],
  'a fresh account generates only the four starting Jobs');
 assert.equal(DATA.items.filter(i=>Meta.itemUnlocked(a,i)).length, DATA.items.length - 3, 'all but coupon, premium, tree');
assert.equal(Meta.itemUnlocked(a,DATA.itemBy.coupon),false);
assert.equal(Meta.itemUnlocked(a,DATA.itemBy.premium),false);
assert.equal(Meta.itemUnlocked(a,DATA.itemBy.tree),false);
 const bosses=Meta.BOSSES();
 const beat=n=>{const b=Meta.fresh();for(let i=0;i<n;i++)clear(b,bosses[i],['warrior']);return b;};
 assert.equal(Meta.itemUnlocked(beat(1),DATA.itemBy.coupon),true,'one distinct clear opens the coupon');
 assert.equal(Meta.jobUnlocked(beat(2),DATA.jobBy.rogue),false,'two does not open 도적');
 assert.equal(Meta.jobUnlocked(beat(3),DATA.jobBy.rogue),true,'three does');
 assert.equal(Meta.jobUnlocked(beat(5),DATA.jobBy.berserker),false,'five does not open 광전사');
 assert.equal(Meta.jobUnlocked(beat(6),DATA.jobBy.berserker),true,'six does');
});

test('META_v2.8: the Decoration effects are the Start Contract positives, without their costs',()=>{
 /* The four Decorations deliberately reuse the positive channels the retired Start Contracts
    used. None of the negative sides comes with them, which is the whole point of the reuse. */
 const eff=Object.fromEntries(DATA.decorations.map(d=>[d.slot,d]));
 assert.equal(eff.counter.id,'thriftSafe');
 assert.equal(DATA.balance.decorationStartGold,300,'counter is the approved starting Gold');
 assert.equal(DATA.balance.wallVisitorChance,.10,'wall is the approved Morning chance');
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(/wears\('dawnSign'\)\?1:0/.test(src),'sign adds exactly one ORDER candidate');
 assert.ok(/wears\('premiumCase'\)/.test(src),'display reuses the premium rare-NPC weighting');
 /* META_v2.8 §RETIRED START CONTRACT: removing the picker is not the requirement. A stale v8
    save may still carry `contract`, so no Contract branch may survive in the active path -
    otherwise a loaded `guild` or `premium` Run silently plays by retired rules. */
 for(const branch of ["contract==='guild'","contract==='premium'","contract==='delivery'","contract==='budget'"])
  assert.ok(!src.includes(branch),'no active Contract branch: '+branch);
 /* A Decoration is never a Relic: it is read from the Run's frozen loadout, and `has` - the
    Relic question - never answers for it. */
 assert.ok(/wears\(id\)\{return Object\.values\(this\.run\.loadout\|\|\{\}\)\.includes\(id\)/.test(src),
  'a Decoration is read from the loadout, not from facilities');
 for(const f of ['dist/systems/run.js','dist/systems/relics.js','dist/systems/adventurer.js','dist/ui/app.js']){
  const other=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'..',f),'utf8');
  for(const branch of ["contract==='guild'","contract==='premium'","contract==='delivery'","contract==='budget'"])
   assert.ok(!other.includes(branch),f+' carries no active Contract branch: '+branch);}
 const ids=new Set(DATA.relics.map(r=>r.id));
 for(const d of DATA.decorations)assert.ok(!ids.has(d.id),d.id+' does not collide with a Relic id');
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
 assert.equal(Meta.storeCapital(g.account),0,'and no Store Capital - it settles at Run end, not by advancing Days');
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
 /* META_v2.8 keeps Mastery separate from Store growth: playing well does not buy Decorations
    and Decorations do not buy Mastery. */
 assert.equal(Meta.storeCapital(masterly),0,'which buys no Store Capital');
 assert.deepEqual(Meta.ownedDecorations(masterly),[],'and owns no Decoration');
 assert.equal(Meta.distinctBossClear(masterly),2,'but below every content gate');
 assert.deepEqual(DATA.jobs.filter(j=>Meta.jobUnlocked(masterly,j)).map(j=>j.id),
                  DATA.jobs.filter(j=>Meta.jobUnlocked(plain,j)).map(j=>j.id),'so the Job pool is unchanged');
 const a=new Game(plain),b=new Game(masterly);a.autosave=b.autosave=false;
 a.start('mastery');b.start('mastery');
 assert.equal(b.run.money,a.run.money,'and the same starting funds');
 assert.equal(b.capacity(),a.capacity(),'and the same warehouse');
 /* Stage 10 gives Mastery its approved channel: the owning Job's people turn up at a higher
    spawn Level more often. What NPC-Q10 / NPC-Q03 still forbid is everything else, and this is
    where that is held. Mastery on ONE Job must leave every other Job's adventurer untouched -
    the bonus roll is drawn for every NPC whatever its Job, so the stream cannot shift and any
    difference outside the mastered Job would be a leak. */
 const one=Meta.fresh();
 for(const boss of Meta.BOSSES().slice(0,2))one.matrix.warrior[boss]=true;
 assert.equal(Meta.jobMastery(one,'warrior'),2,'one Job carries Mastery');
 for(const j of DATA.jobs)if(j.id!=='warrior')assert.equal(Meta.jobMastery(one,j.id),0,j.id+' has none');
 assert.equal(Meta.distinctBossClear(one),2,'and it stays below every content gate, so the Job pool is identical');
 const c=new Game(one);c.autosave=false;c.start('mastery');
 const strip=n=>({job:n.job,level:n.level,stats:n.stats,potential:n.potential});
 assert.deepEqual(c.run.npcs.map(n=>n.job),a.run.npcs.map(n=>n.job),'the same Jobs are drawn in the same order');
 for(let i=0;i<a.run.npcs.length;i++){
  if(a.run.npcs[i].job==='warrior')continue;
  assert.deepEqual(strip(c.run.npcs[i]),strip(a.run.npcs[i]),
   'Mastery in 전사 did not touch the '+a.run.npcs[i].job+' at index '+i);
 }
 for(let i=0;i<a.run.npcs.length;i++)if(a.run.npcs[i].job==='warrior')
  assert.ok(c.run.npcs[i].level>=a.run.npcs[i].level,'a mastered 전사 is never spawned lower');
 // and the power still arrives as Level, never as a stat channel on the Job table
 for(const j of DATA.jobs)assert.equal(j.masteryBonus,undefined,j.id+' has no mastery power field');
 /* the bonus is a single mutually exclusive roll, and its expected value is the approved one */
 for(const [rank,expected] of [[0,0],[1,.05],[3,.25],[6,.85],[7,1.15]]){
  const acct=Meta.fresh();
  for(let k=0;k<rank;k++)acct.matrix.warrior[Meta.BOSSES()[k]]=true;
  const r=new RNG('mastery-ev-'+rank);let sum=0;
  for(let k=0;k<40000;k++){const v=Adventurer.masterySpawnBonus(r,acct,'warrior');
   assert.ok(v===0||v===1||v===2||v===3,'one roll yields one of +0/+1/+2/+3');sum+=v;}
  assert.ok(Math.abs(sum/40000-expected)<.03,'Mastery '+rank+' averages about +'+expected+' Levels');
 }
});

test('v0.1 fixture intentionally rejected without reinterpretation',()=>{const fs=require('node:fs');const old=fs.readFileSync(require('node:path').join(__dirname,'fixtures/v01-sale.json'),'utf8');assert.throws(()=>Save.import(old));});
test('COPY §9: a Rare Reference identity turns up rarely, once per Run, and changes nothing but the name',()=>{
 const EASTER=Adventurer.EASTER.map(e=>e.name),seen=new Set();
 let runs=0,visits=0,dupRuns=0;
 for(let i=0;i<250;i++){
  const g=new Game();g.autosave=false;g.start('easter-'+i);
  for(let step=0;step<45&&g.run.phase!=='end';step++){const s=g.run;
   if(s.phase==='morning')g.beginOrder();else if(s.phase==='order')g.open();
   else if(s.phase==='sell')g.depart();else if(s.phase==='night')g.finishNight();
   else if(s.phase==='closing'){if(g.closeDay()===false)break;}else break;}
  const found=g.run.npcs.filter(n=>EASTER.includes(n.name)).map(n=>n.name);
  found.forEach(n=>seen.add(n));
  if(new Set(found).size!==found.length)dupRuns++;
  runs++;visits+=found.length;
 }
 assert.equal(dupRuns,0,'the same identity never appears twice in one Run');
 assert.ok(visits>0,'the identities are reachable at all');
 assert.equal(seen.size,3,'all three are reachable across Runs, not just the first');
 // rare, and rare because of the chance rather than because it is nearly impossible
 assert.ok(visits/runs<1,'a Rare Reference visitor stays rare: '+(visits/runs).toFixed(3)+' per Run');
 assert.equal(DATA.balance.easterChance,.01,'the approved starting chance, unchanged by Work');

 // Only the name differs. The identity is the whole easter egg: no stat, trait, rarity or
 // level rides on it, so a player who misses the reference loses nothing.
 const build=chance=>{const g=new Game();g.autosave=false;g.start('easter-shape');
  DATA.balance.easterChance=chance;const n=g.addNPC();DATA.balance.easterChance=.01;return n;};
 const plain=build(0),rare=build(1);
 assert.ok(EASTER.includes(rare.name),'forcing the roll produces a Rare Reference visitor');
 assert.ok(!EASTER.includes(plain.name),'not forcing it produces an ordinary one');
 for(const k of ['job','rarity','level','traits','stats','potential','traitSlots'])
  assert.deepEqual(rare[k],plain[k],'the identity changes nothing but the name: '+k);

 // it is a name, not a system: no phase, currency or unlock came with it
 const src=require('node:fs').readFileSync(__dirname+'/../dist/systems/shop.js','utf8');
 assert.ok(!/easterPhase|easterCurrency|easterUnlock/.test(src),'no Easter subsystem was introduced');
});

/* ECONOMY_ORDER §PURCHASE INTENT. The judged price is 정가's mechanism and only 정가's: the
   threshold has to reach the decision, and 할인 / 바가지 have to decide exactly as they did
   before that wiring existed. Both halves are asserted, because the first one alone is what
   made the term leak into the other two modes. */
test('정가 threshold reaches the decision, and 할인/바가지 are untouched by it',()=>{
 const g=fresh();g.open();const n=g.current();n.money=400;n.traits=[];
 const rule=DATA.pricing.full;
 assert.ok(rule.intentWeight>0&&rule.intentPivot>0,'정가 declares a weight for the judged price');
 for(const mode of ['half','overcharge'])
  assert.ok(!DATA.pricing[mode].intentWeight,mode+' declares none');

 /* Turning 정가's weight off is exactly the pre-wiring decision, so it is the control. */
 const off=(fn)=>{const w=rule.intentWeight;rule.intentWeight=0;try{return fn();}finally{rule.intentWeight=w;}};
 let fullMoved=0;
 for(const it of DATA.items){
  for(const mode of ['half','overcharge'])
   assert.deepEqual(g.interest(n,it,mode),off(()=>g.interest(n,it,mode)),
    mode+' decides the same as before the judged price reached chance');
  if(g.interest(n,it,'full').chance!==off(()=>g.interest(n,it,'full')).chance)fullMoved++;
 }
 assert.ok(fullMoved>DATA.items.length/2,'and 정가 actually moves - '+fullMoved+' of '+DATA.items.length);

 /* And what moves it is the threshold: judged at 1.00 the same offer is weighed more heavily.
    The burden term is a bonus floored at zero, so it only separates the two judgements where it
    is live - at a purse where BOTH burdens sit under the pivot. Above the pivot both contribute
    nothing, which is the rule, not a missing effect. */
 const it=DATA.itemBy.highpotion;n.money=1200;
 const judgedAt=j=>{const m=rule.intentMult;rule.intentMult=j;
  try{return g.interest(n,it,'full').chance;}finally{rule.intentMult=m;}};
 const at65=judgedAt(.65),at100=judgedAt(1);
 assert.ok(Math.round(it.sell)/n.money<rule.intentPivot,'the control sits where the term is live');
 assert.ok(at65>at100,'.65 is worth something to the customer: '+at65.toFixed(3)+' vs '+at100.toFixed(3));
 n.money=400;
});

/* ECONOMY_ORDER §PURCHASE INTENT. The burden term is a BONUS only: a light offer is helped, a
   heavy one is simply not helped. It may never subtract, because affordability is already
   decided by the wallet gate and an offer the customer CAN pay for should not also be taxed. */
test('the 정가 burden term is a bonus only, and never a penalty',()=>{
 const g=fresh();g.open();const n=g.current();n.traits=[];n.loyalty=0;
 const rule=DATA.pricing.full,it=DATA.itemBy.highpotion;
 assert.equal(rule.intentPivot,.36);assert.equal(rule.intentWeight,.5);
 assert.equal(rule.mult,1,'full price charged is unchanged');
 assert.equal(rule.intentMult,.65,'and the judged multiplier is unchanged');
 // the bonus, measured against the same offer with the term switched off
 const bonusAt=money=>{n.money=money;
  const on=g.interest(n,it,'full').chance;
  const w=rule.intentWeight;rule.intentWeight=0;
  const off=g.interest(n,it,'full').chance;rule.intentWeight=w;
  return {burden:Math.round(it.sell*rule.intentMult)/Math.max(1,money),delta:on-off,on,off};};
 // burden < pivot -> positive
 const light=bonusAt(4000);
 assert.ok(light.burden<.36,'the light case really is under the pivot: '+light.burden.toFixed(3));
 assert.ok(light.delta>0,'a light offer gains: +'+light.delta.toFixed(4));
 assert.ok(Math.abs(light.delta-.5*(.36-light.burden))<1e-9,'and gains exactly weight x (pivot - burden)');
 // burden = pivot -> exactly 0
 const atPivot=Math.round(it.sell*rule.intentMult)/.36;
 const even=bonusAt(atPivot);
 assert.ok(Math.abs(even.burden-.36)<1e-9,'the control sits exactly on the pivot');
 assert.equal(even.delta,0,'at the pivot the term contributes exactly nothing');
 // burden > pivot -> exactly 0, never negative
 for(const money of [Math.round(atPivot*.9),600,400,300,200]){
  const heavy=bonusAt(money);
  if(heavy.burden<=.36)continue;
  assert.equal(heavy.delta,0,'burden '+heavy.burden.toFixed(3)+' must contribute exactly 0, got '+heavy.delta);
  assert.ok(heavy.delta>=0,'and can never be negative');
 }
 // across the whole catalogue and a spread of purses, the term is never a penalty
 for(const money of [50,120,300,700,1500,9000])
  for(const x of DATA.items){
   n.money=money;
   const on=g.interest(n,x,'full').chance;
   const w=rule.intentWeight;rule.intentWeight=0;
   const off=g.interest(n,x,'full').chance;rule.intentWeight=w;
   assert.ok(on>=off,x.id+' at '+money+'G: the burden term lowered acceptance ('+on+' < '+off+')');
  }
 // the source says so too, so the floor cannot be dropped silently
 const src=require('node:fs').readFileSync(__dirname+'/../dist/systems/shop.js','utf8');
 assert.ok(/const burdenIntentBonus=weight\*Math\.max\(0,\(rule\.intentPivot\|\|0\)-burden\);/.test(src),
  'the bonus is floored at zero in Source');
});

test('the 정가 burden bonus changes nothing else about acceptance',()=>{
 const g=fresh();g.open();const n=g.current();n.traits=[];
 const it=DATA.itemBy.highpotion;
 // unaffordable -> 0, whatever the burden would have said
 n.money=1;
 for(const mode of ['half','full','overcharge'])
  assert.equal(g.interest(n,it,mode).chance,0,mode+': an unaffordable debit is still refused outright');
 // 할인 and 바가지 are decided exactly as before: they declare no weight, so no term exists
 n.money=4000;
 const rule=DATA.pricing.full;
 for(const mode of ['half','overcharge']){
  assert.ok(!DATA.pricing[mode].intentWeight,mode+' declares no weight');
  const before=g.interest(n,it,mode);
  const p=DATA.pricing[mode].intentPivot;DATA.pricing[mode].intentPivot=.9;
  const after=g.interest(n,it,mode);DATA.pricing[mode].intentPivot=p;
  assert.deepEqual(after,before,mode+' is untouched by the burden term');
 }
 // the clamp still bounds the result even with the bonus at its largest
 n.money=1000000;n.loyalty=100;
 const c=g.interest(n,it,'full').chance;
 assert.ok(c<=.97&&c>=.08,'the clamp still holds: '+c);
 assert.ok(Math.round(it.sell*DATA.pricing.full.mult)===it.sell,'full price charged is still list');
 void rule;
});

console.log(checks+' revision groups passed');
