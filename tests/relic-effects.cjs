// Relic effect acceptance. This file sat outside `npm test` while its expectations aged out
// from under it - the Fresh Relics were checked against a v2.5 `effects.food` channel that no
// longer exists, and hub's overhead was pinned at a flat +35 the approved bundle replaced with
// a proportion of the base. Both now read current Canonical, and the file is in the suite, so
// a stale expectation here fails loudly instead of sitting unrun.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
function fresh(seed='relic-effects'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.facilities=[];return g;}
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
test('bulk engines require quantity/traffic/previous-day sales, and affect actual cost',()=>{
 const g=fresh(),s=g.run;g.beginOrder();s.offers=[{item:'rice',price:100,quantity:8}];s.cart={0:3};
 const base=g.cartTotal();s.facilities=['bulk'];assert.ok(g.cartTotal()<base);s.cart={0:2};assert.equal(g.cartTotal(),200);
 /* REL-Q-v28-15: the logistics keystone triggers at 6 previous-Day sales (2026-09-23 rebalance),
    and it is the only bulk engine on previous-Day sales - REL-Q-v28-14 took 회전 진열대 off the
    discount path entirely, so it must not move the quote at any sales figure. */
 for(const [id,threshold]of [['logisticsHQ',6]]){s.facilities=[id];s.cart={0:3};s.previousSales=threshold-1;assert.equal(g.cartTotal(),base);s.previousSales=threshold;assert.ok(g.cartTotal()<base);s.bulkUsed=true;assert.ok(g.cartTotal()<base,'not only the first bulk order');s.bulkUsed=false;}
 s.facilities=['rotation'];s.cart={0:3};for(const sales of [0,5,6,7,12]){s.previousSales=sales;assert.equal(g.cartTotal(),base,'rotation never discounts, at '+sales+' previous sales');}
 s.previousSales=0;
 s.facilities=['groupFlyer'];s.queue=Array(5).fill('fixture');assert.equal(g.cartTotal(),base);s.queue.push('fixture');assert.ok(g.cartTotal()<base);
 s.facilities=['dawnBulk'];assert.ok(g.cartTotal()<base);s.offers[0].item='potion';assert.equal(g.cartTotal(),base);
 s.offers[0].item='rice';const quote=g.cartTotal(),before=s.money;g.confirmOrder();assert.equal(before-s.money,quote);assert.equal(s.inventory.slice(-3).reduce((v,x)=>v+x.cost,0),quote);
});
test('offer weights and quantities match relevant product roles',()=>{
 const g=fresh(),s=g.run,potion=DATA.itemBy.potion,premium=DATA.itemBy.premium;
 for(const [id,it]of [['showcase',premium],['medicine',potion],['coldcase',premium]]){s.facilities=[];const base=Relics.offerWeight(g,it);s.facilities=[id];assert.ok(Relics.offerWeight(g,it)>base,id);}
 s.dungeons=[g.makeDungeon('spider',1)];s.facilities=[];const base=Relics.offerWeight(g,DATA.itemBy.antidote);s.facilities=['hazardBoard'];assert.ok(Relics.offerWeight(g,DATA.itemBy.antidote)>base);
 s.facilities=[];let state=g.rng.state,quantity=g.offerFor(potion).quantity;s.facilities=['medicine'];g.rng=new RNG(s.seed,state);assert.equal(g.offerFor(potion).quantity,quantity+1);
 s.facilities=[];g.generateOffers();const n=s.offers.length;s.facilities=['terminal'];g.generateOffers();assert.equal(s.offers.length,n+2);
});
test('fresh Relics enhance nutrition but not unrelated counter/penalty',()=>{
 /* ITEM_v2.7 §FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION: the Fresh Relics raise a Food's
    POSITIVE NATIVE Core Stat and nothing else. There is no `effects.food` channel any more -
    that was the v2.5 shape this assertion was written against - so what is measured is the
    Core Stat the Item actually carries, with the Hazard Counter and the Supply held fixed. */
 const g=fresh(),n={...g.run.npcs[0],traits:[],pack:['lava']},d=g.makeDungeon('snow',2),base=Dungeon.prepare(n,d).effects;
 for(const id of ['kitchen','fresh24']){const e=Dungeon.prepare(n,d,[id]).effects;
  assert.ok(e.survival>base.survival,id+' raises the Food native Core Stat');
  assert.equal(e.cold,base.cold,id+' does not touch the Hazard Counter');
  assert.equal(e.supply,base.supply,id+' does not touch Supply');}
 const it=DATA.itemBy.premium;s=g.run;s.facilities=['fridge'];const f=Relics.shelf(g,it);assert.ok(f>0);s.facilities=['fridge','coldcase','fresh24'];assert.ok(Relics.shelf(g,it)>f);assert.equal(Relics.shelf(g,DATA.itemBy.stone),0);
});
test('premium guarantee obeys wallet, daily limit and never guarantees acceptance',()=>{
 const g=fresh(),n=g.run.npcs[0],it=DATA.itemBy.premium;n.traits=[];n.money=999;
 const base=g.interest(n,it,'overcharge');g.run.facilities=['guarantee'];const credit=g.interest(n,it,'overcharge');assert.equal(credit.price,base.price);assert.ok(credit.debit<base.debit);assert.ok(credit.chance<1);
 n.money=credit.debit-1;assert.equal(g.interest(n,it,'overcharge').chance,0);g.run.guaranteeUsed=true;assert.equal(g.interest(n,it,'overcharge').guarantee,0);
 n.money=999;n.loyalty=60;g.run.facilities=['premiumMember'];const member=g.interest(n,it,'overcharge');g.run.facilities=[];assert.ok(member.chance>g.interest(n,it,'overcharge').chance);assert.ok(member.chance<1);
});
function nightWith(facilities,visits=2,paid=true){const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=visits;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=60;n.money=100;n.destination=0;n.claimedDestination=0;n.history=paid?[{day:s.day,item:'rice',paid:35,mode:'half'}]:[];s.queue=[n.id];s.phase='sell';s.facilities=facilities;s.dayFacilities=facilities;g.night();return {g,n};}
test('return points excludes first visit, no-sale and free transfer',()=>{
 for(const [visits,paid]of [[1,true],[2,false],[2,true]]){const base=nightWith([],visits,paid),boost=nightWith(['returnPoints'],visits,paid),eligible=visits>1&&paid;assert.equal(boost.n.money-base.n.money,eligible?30:0);assert.equal(boost.n.loyalty-base.n.loyalty,eligible?5:0);}
 /* 2026-09-23 rebalance: the Loyalty >= 30 condition is gone - a low-Loyalty paid returner earns it too */
 const low=(facilities)=>{const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=2;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=5;n.money=100;n.destination=0;n.claimedDestination=0;n.history=[{day:s.day,item:'rice',paid:35,mode:'half'}];s.queue=[n.id];s.phase='sell';s.facilities=facilities;s.dayFacilities=facilities;g.night();return n;};
 const lb=low([]),lr=low(['returnPoints']);assert.equal(lr.loyalty-lb.loyalty,5,'no Loyalty threshold');assert.equal(lr.money-lb.money,30);
});
test('lifetime reward cannot repeat by re-resolving Night; overhead matches day effects',()=>{
 const base=nightWith([]),boost=nightWith(['lifetime']);assert.equal(boost.n.money-base.n.money,50);const money=boost.n.money;boost.g.night();assert.equal(boost.n.money,money);
 /* 2026-09-23 rebalance: the condition is 단골 (Loyalty >= 51, the NPC_TRAIT owner), not 60 */
 const at=(loyalty,f)=>{const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=2;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=loyalty;n.money=100;n.destination=0;n.claimedDestination=0;n.history=[];s.queue=[n.id];s.phase='sell';s.facilities=f;s.dayFacilities=f;g.night();return n;};
 for(const start of [20,40,45,48,49,50,51,55]){const plain=at(start,[]),n=at(start,['lifetime']);assert.equal(n.money-plain.money,n.loyalty>=51?50:0,'평생 단골제 at Loyalty '+n.loyalty);}
 /* Two things this line used to get wrong. hub's cost is a PROPORTION of the overhead base
    under the approved bundle, not the flat +35 it was written against; and the operating cost
    is rounded to the nearest 10G, so what the store is actually charged is not the raw
    modifier - a 30G saving lands as 30G off this base. The expected figure is therefore
    derived from the rule AND its rounding, and the raw modifier each Relic contributes is
    asserted separately, so neither half can drift unnoticed. */
 const raw={showcase:0,hub:base.g.overheadBase()*DATA.balance.hubOverheadRate,efficiency:-30};
 const charged=x=>Math.round((base.g.overheadBase()+x)/10)*10;
 for(const [id,modifier] of Object.entries(raw)){
  assert.equal(nightWith([id]).g.run.daily.operating-base.g.run.daily.operating,
   charged(modifier)-charged(0),id+' day overhead');
 }
 assert.equal(raw.hub,base.g.overheadBase()*0.10,'hub is 10% of the overhead base, the approved rate');
});
/* REL-Q-v28-18. The D30 pool is the ordinary eligible pool MINUS an explicit no-effect set, so
   this asserts the whole membership directly rather than sampling windows and hoping: sampling
   can show that something DID appear, never that everything else still CAN. */
test('REL-Q-v28-18: D30 is default-include minus the explicit no-effect exclusions',()=>{
 const EXCLUDED=['stamp','member','guarantee','fridge','board','rookieBoard','groupFlyer',
                 'memberBundle','premiumMember','returnPoints','supplyCert','lifetime',
                 'royalCert','hub','efficiency'];
 assert.deepEqual([...DATA.relicD30NoEffect].sort(),[...EXCLUDED].sort(),'the exclusion set is exactly the approved 15');
 /* the model itself: no positive allowlist survives anywhere in the Store Support source */
 const read=f=>require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/'+f),'utf8');
 for(const f of ['data/relics.js','systems/relics.js','systems/shop.js','systems/run.js','ui/app.js']){
  const src=read(f);
  assert.ok(!/finalUseful/.test(src),'no finalUseful allowlist in '+f);
  assert.ok(!/futureRelevant/.test(src),'no futureRelevant allowlist in '+f);
 }
 assert.ok(!/previousSales>=8/.test(read('systems/relics.js')),'and no inherited 8-sale gate');
 assert.ok(DATA.relics.every(r=>!('finalUseful' in r)),'the property is off the rows too');

 /* eligibility, one support at a time and with the RNG taken out of it: a Run that owns
    everything else has exactly one candidate left, so its presence or absence is the answer. */
 const eligibleAtD30=(id,previousSales)=>{
  const g=fresh('d30-'+id);const s=g.run;
  s.facilities=DATA.relics.map(r=>r.id).filter(x=>x!==id).slice(0,29);
  s.previousSales=previousSales;s.day=30;s.relicWindow=null;
  g.relicWindow(30);
  return s.relicWindow.candidateIds.includes(id);
 };
 for(const r of DATA.relics){
  const want=!EXCLUDED.includes(r.id);
  assert.equal(eligibleAtD30(r.id,9),want,r.id+(want?' is D30-eligible':' is excluded from D30'));
 }
 /* REL-Q-v28-14/15 are conditions on when the support PAYS, never on whether D30 may offer it. */
 for(const sales of [0,5,6,7,8])for(const id of ['rotation','logisticsHQ'])
  assert.equal(eligibleAtD30(id,sales),true,id+' is not gated by '+sales+' previous sales at D30');
 /* a support that needs a legal D30 ORDER / Reroll action to pay is still eligible */
 for(const id of ['delivery','terminal','bulk','dawnBulk','medicine','showcase','hazardBoard','expeditionCert'])
  assert.equal(eligibleAtD30(id,0),true,id+' realises its value through a legal D30 action');

 /* a future Store Support is included by DEFAULT, and leaves only by being named */
 const future={id:'futureSupport',name:'미래 점포지원',kind:'utility',tags:[],price:300,description:'테스트 전용.'};
 DATA.relics.push(future);DATA.relicBy[future.id]=future;
 try{
  assert.equal(eligibleAtD30(future.id,0),true,'a newly added support enters D30 without being listed');
  DATA.relicD30NoEffect.push(future.id);
  assert.equal(eligibleAtD30(future.id,0),false,'and is removed only by the explicit no-effect set');
 }finally{
  DATA.relics.pop();delete DATA.relicBy[future.id];
  DATA.relicD30NoEffect.splice(DATA.relicD30NoEffect.indexOf(future.id),1);
 }

 /* and a real D30 window only ever draws from that pool */
 for(let i=0;i<100;i++){const g=fresh('final-offer-'+i);g.run.previousSales=0;g.relicWindow(30);
  for(const id of g.run.relicWindow.candidateIds)
   assert.ok(!EXCLUDED.includes(id),id+' must not reach a D30 window');}
});

/* RELIC_v2.8 §ROTATION DISPLAY — SUPPLY ENGINE. The support stopped being a discount and became
   a supply engine: high sales yesterday mean more units on today's ordinary offers, which is what
   makes the separate bulk thresholds reachable. Quantity only - not price, not slot count, not
   Rare+. */
test('REL-Q-v28-14: 회전 진열대 adds +2 supply quantity to every offer on a >=4 sales Day',()=>{
 const g=fresh('rotation-supply'),s=g.run;
 const quantity=(it,facilities,sales)=>{
  s.facilities=[];s.previousSales=sales;const state=g.rng.state,plain=g.offerFor(it).quantity;
  s.facilities=facilities;g.rng=new RNG(s.seed,state);
  return [plain,g.offerFor(it).quantity];
 };
 const common=DATA.items.find(i=>i.rarity===0),uncommon=DATA.items.find(i=>i.rarity===1);
 const rare=DATA.items.find(i=>i.rarity===2),epic=DATA.items.find(i=>i.rarity===3);
 /* 2026-09-23 rebalance: 4+ previous sales, every rarity, +2 */
 for(const it of [common,uncommon,rare,epic]){
  for(const sales of [0,2,3]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain,it.id+' is unchanged at '+sales+' previous sales');}
  for(const sales of [4,6,11]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain+2,it.id+' gets +2 at '+sales+' previous sales');}
 }
 // it adds units, never slots, and never money off
 s.previousSales=9;s.facilities=[];g.generateOffers();const slots=s.offers.length;
 s.facilities=['rotation'];g.generateOffers();assert.equal(s.offers.length,slots,'the offer slot count is unchanged');
 s.offers=[{item:'rice',price:100,quantity:8}];s.cart={0:3};s.bulkUsed=false;
 s.facilities=[];const plainQuote=g.cartTotal();s.facilities=['rotation'];
 assert.equal(g.cartTotal(),plainQuote,'and the support discounts nothing');
});

test('REL-Q-v28-15: 물류 본부계약 takes 30% off every same-SKU 3+ order, from 6 previous sales',()=>{
 const g=fresh('logistics-hq'),s=g.run;g.beginOrder();
 s.offers=[{item:'rice',price:100,quantity:8},{item:'rice',price:100,quantity:8},{item:'water',price:40,quantity:8}];
 s.facilities=[];s.cart={0:3};const base=g.cartTotal();
 s.facilities=['logisticsHQ'];
 for(const sales of [0,4,5]){s.previousSales=sales;assert.equal(g.cartTotal(),base,'no discount at '+sales+' previous sales');}
 s.previousSales=6;assert.equal(g.cartTotal(),Math.round(100*.70)*3,'exactly -30% at 6');
 s.cart={0:2};assert.equal(g.cartTotal(),200,'a 2-unit order is not a bulk order');
 // every bulk SKU of the Day, not only the first, and after an earlier bulk order
 s.cart={0:3,2:3};assert.equal(g.cartTotal(),Math.round(100*.7)*3+Math.round(40*.7)*3,'both 3+ SKUs are discounted');
 s.bulkUsed=true;s.cart={0:3};assert.equal(g.cartTotal(),Math.round(100*.70)*3,'an earlier bulk order today does not use it up');
 // with 묶음발주 계약 the two stack and the internal 45% floor is not reached
 s.facilities=['logisticsHQ','bulk'];s.cart={0:3};assert.equal(g.cartTotal(),70+70+Math.round(100*.7*.8));
 assert.equal(DATA.relicBy.logisticsHQ.price,430,'the rebalanced price');
});

/* REL-Q-v28-17. The three outcomes are one roll and mutually exclusive, so the boundaries are
   pinned on a stubbed stream rather than inferred from a sample - a distribution test cannot
   tell 45/15/40 from a 44/16/40 that happens to land the same way. */
test('REL-Q-v28-17: 지역 거점점 계약 rolls +1 45% / +2 15% / +0 40%, exclusively',()=>{
 const g=fresh('region-hub'),s=g.run;s.dayFacilities=['hub'];
 const at=r=>{g.rng={int:()=>3,next:()=>r};return g.morningVisitors();};
 for(const [r,want] of [[0,1],[.2,1],[.4499,1],[.45,2],[.5,2],[.5999,2],[.6,0],[.9,0],[.9999,0]]){
  const v=at(r);
  assert.equal(v.hubExtra,want,'r='+r+' gives +'+want);
  assert.equal(v.baseVisitors,3,'and the base roll is untouched by the hub');
  assert.equal(s.expectedVisitors,3+want,'exactly one outcome reaches the visitor count');
 }
 // the stated mean, straight off the approved rates
 assert.ok(Math.abs((.45*1+.15*2+.40*0)-0.75)<1e-12,'+0.75 visitors per applicable Day');
 assert.equal(DATA.relicBy.hub.price,490);
 assert.equal(DATA.balance.hubOverheadRate,.10,'the operating modifier stays overheadBase +10%');
});

/* REL-Q-v28-3 / SA-Q17. The probability-only +70% is gone. What is left is deterministic
   seating: a new adventurer generated today takes one of today's own slots. */
test('REL-Q-v28-3: 신입 모집 게시판 seats the Day newcomer without adding a visitor',()=>{
 /* Both variants are resolved from ONE snapshot, so they share the Day, the roster and the RNG
    state and the only difference between them is the support. */
 const walk=until=>{const g=new Game();g.autosave=false;g.start('rookie-board');
  g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.facilities=[];
  while(g.run.day<until){g.beginOrder();g.finishOrder();while(g.run.phase==='sell')g.depart();g.finishNight();g.closeDay();}
  return Save.export(g.account,g.run);};
 const from=(snap,facilities)=>{const r=Save.import(snap);const h=new Game(r.account,r.run);h.autosave=false;
  h.run.facilities=[...facilities];h.run.dayFacilities=[...facilities];h.morning();return h;};
 // a Day that generates a new adventurer
 const arrivalDay=walk(3),base=from(arrivalDay,[]),boost=from(arrivalDay,['rookieBoard']);
 const newcomer=boost.run.npcs.at(-1);
 assert.ok(!newcomer.introduced,'the newcomer really is the adventurer generated today');
 assert.ok(!base.run.queue.includes(newcomer.id),'and the Day did not seat them anyway');
 assert.ok(boost.run.queue.includes(newcomer.id),'with the support they take a slot');
 assert.equal(boost.run.queue.length,base.run.queue.length,'the visitor count does not rise');
 assert.equal(boost.run.expectedVisitors,base.run.expectedVisitors,'nor does the intake it is drawn from');
 assert.equal(boost.run.npcs.length,base.run.npcs.length,'and no extra adventurer is created');
 assert.deepEqual(boost.run.queue.slice(0,-1),base.run.queue.slice(0,-1),'one existing slot is taken, the rest stand');
 assert.deepEqual(boost.run.visitorBreakdown,base.run.visitorBreakdown,'the support is no part of the visitor sum');
 assert.ok(boost.run.queue.length<=base.run.visitorBreakdown.available,'the available-adventurer cap still holds');
 // a Day that generates nobody: the support does nothing at all
 const quietDay=walk(4),quiet=from(quietDay,[]),quietBoard=from(quietDay,['rookieBoard']);
 assert.equal(quietBoard.run.npcs.length,quiet.run.npcs.length,'no adventurer was generated to seat');
 assert.deepEqual(quietBoard.run.queue,quiet.run.queue,'so no visitor is added and no slot is taken');
 // and no weight multiplier survives in the selection
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 const selection=src.slice(src.indexOf('morningQueue({'),src.indexOf('generateOffers({'));
 assert.ok(!/rookieBoard\?1\.7/.test(selection),'the +70% selection weight is gone');
});

/* SA-Q16 / REL-Q-v28-9. The acquisition-time predicate named a retired `fresh` property, so it
   disagreed with the future-stock shelf path that has always keyed on Food/Drink. */
test('SA-Q16: 냉장 유통 계약 extends owned Uncommon+ Food/Drink exactly once, on category',()=>{
 const g=fresh('coldcase-acquire'),s=g.run;
 const uncommonFood=DATA.items.find(i=>['food','drink'].includes(i.category)&&i.rarity>=1&&i.days);
 const commonFood=DATA.items.find(i=>['food','drink'].includes(i.category)&&i.rarity===0&&i.days);
 const gear=DATA.items.find(i=>!['food','drink'].includes(i.category)&&i.days);
 assert.ok(uncommonFood&&commonFood,'the catalogue has both sides of the rarity boundary');
 s.inventory=[];g.stock(uncommonFood.id,2);g.stock(commonFood.id,1);if(gear)g.stock(gear.id,1);
 const expired=s.inventory[0];expired.expires=s.day-1;                 // already past its date
 const before=s.inventory.map(st=>st.expires);
 s.phase='order';s.money=9999;
 s.relicWindow={milestoneDay:5,slothSealOpportunity:false,candidateIds:['coldcase'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('coldcase');
 const after=s.inventory.map(st=>st.expires);
 for(let i=0;i<s.inventory.length;i++){
  const st=s.inventory[i],it=DATA.itemBy[st.item];
  const eligible=['food','drink'].includes(it.category)&&it.rarity>=1&&before[i]!==null&&before[i]>s.day;
  assert.equal(after[i]-before[i],eligible?1:0,st.item+' ('+it.rarity+') extension');
 }
 assert.equal(after[0],before[0],'an already-expired stock is not revived');
 // exactly once: replaying the acquisition path cannot extend the same stock again
 const again=s.inventory.map(st=>st.expires);
 s.relicWindow={milestoneDay:10,slothSealOpportunity:false,candidateIds:['fridge'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('fridge');
 for(let i=0;i<s.inventory.length;i++){
  const st=s.inventory[i],it=DATA.itemBy[st.item];
  const eligible=['food','drink'].includes(it.category)&&before[i]!==null&&before[i]>s.day;
  assert.equal(s.inventory[i].expires-again[i],eligible?2:0,st.item+' takes 대형 냉장고 (+2) once, and coldcase not twice');
 }
 assert.ok(!DATA.items.some(it=>'fresh' in it),'no Item carries the retired fresh property');
});

/* REL-Q-v28-5 / REL-Q-v28-7. Both commissions are a share of LIST price, so each is resolved
   through an actual accepted sale and read off the Day ledger rather than off the source. */
test('REL-Q-v28-5 / 7: HQ commission is 20% of list (supplyCert) and 20% of the charged 150% price (royalCert)',()=>{
 const sale=(facilities,mode,item)=>{
  const g=fresh('commission'),s=g.run,n=s.npcs[0];
  s.facilities=[...facilities];s.dayFacilities=[...facilities];
  n.traits=[];n.money=99999;n.introduced=true;n.visits=2;n.pack=[];n.refused=[];n.history=[];
  n.destination=0;n.claimedDestination=0;
  s.queue=[n.id];s.cursor=0;s.phase='sell';s.daily.commission=0;
  g.stock(item.id,1);
  g.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
  assert.equal(g.sell(s.inventory.at(-1).id,mode),true,item.id+' sale was accepted');
  return s.daily.commission;
 };
 const plain=DATA.items.find(i=>i.rarity>=2&&!i.effects.escape&&!i.effects.revive);
 const insured=DATA.items.find(i=>i.rarity>=2&&(i.effects.escape||i.effects.revive));
 const common=DATA.items.find(i=>i.rarity===0);
 assert.ok(plain&&insured,'the catalogue has both a plain Rare+ and a Rare+ insurance role');
 assert.equal(sale(['royalCert'],'overcharge',plain),Math.round(Math.round(plain.sell*1.5)*.20),'royalCert pays 20% of the charged 150% price');
 assert.equal(sale(['royalCert'],'overcharge',common),Math.round(Math.round(common.sell*1.5)*.20),'at any rarity');
 assert.equal(sale(['royalCert'],'full',plain),0,'and only on a 150% sale');
 assert.equal(sale(['supplyCert'],'full',insured),Math.round(insured.sell*.20),'supplyCert pays 20% of list');
 assert.equal(sale([],'overcharge',plain),0,'no support, no commission');
 // neither inherited rate survives on the Gold path
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/it\.sell\*\.08/.test(src),'the inherited 8% supplyCert rate is gone');
 assert.ok(!/mode==='overcharge'&&it\.rarity>=2\)commission\+=Math\.round\(it\.sell\*\.12\)/.test(src),
  'and so is the inherited 12% royalCert rate');
});

test('REL-Q-v28-2 / 4 / 6 / 8: the approved Store Support prices are in the catalogue',()=>{
 /* User-approved Store Support rebalance 2026-09-23 */
 for(const [id,price] of [['bulk',180],['rotation',120],['stamp',180],['member',180],['showcase',200],
                          ['guarantee',200],['hazardBoard',120],['medicine',150],['fridge',120],['kitchen',240],
                          ['board',150],['rookieBoard',150],['groupFlyer',280],['memberBundle',270],
                          ['premiumMember',290],['returnPoints',340],['expeditionMeal',280],['coldcase',250],
                          ['supplyCert',310],['dawnBulk',270],['logisticsHQ',430],['lifetime',440],
                          ['royalCert',460],['expeditionCert',420],['fresh24',520],['hub',490],
                          ['warehouse',180],['terminal',190],['delivery',170],['efficiency',180]])
  assert.equal(DATA.relicBy[id].price,price,id+' price');
});

/* ---- User-approved Store Support rebalance 2026-09-23: structural reworks ------------------ */
/* One accepted sale on a stubbed stream, read off the ledger / wallet / history. */
function sellOnce(facilities,mode,itemId,{loyalty=0,history=[],money=99999}={}){
 const g=fresh('rework-sale'),s=g.run,n=s.npcs[0];
 s.facilities=[...facilities];s.dayFacilities=[...facilities];
 n.traits=[];n.money=money;n.introduced=true;n.visits=2;n.pack=[];n.refused=[];n.loyalty=loyalty;
 n.history=history.map(h=>({day:s.day,...h}));n.destination=0;n.claimedDestination=0;
 s.queue=[n.id];s.cursor=0;s.phase='sell';s.daily.commission=0;
 g.stock(itemId,1);
 g.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
 const before={store:s.money,wallet:n.money};
 assert.equal(g.sell(s.inventory.at(-1).id,mode),true,itemId+' sale was accepted');
 return {g,s,n,store:s.money-before.store,paid:before.wallet-n.money,last:n.history.at(-1)};
}
test('REWORK 길드 보증 진열대: the CHARGED price must reach 200G, and HQ covers 20% of it',()=>{
 const g=fresh('guarantee-charged'),n=g.run.npcs[0];n.traits=[];n.money=9999;g.run.facilities=['guarantee'];
 const bar=DATA.itemBy.bar,premium=DATA.itemBy.premium;           // list 180 / 340
 const over=g.interest(n,bar,'overcharge');                          // charged 270 on a sub-200 list price
 assert.equal(over.price,270);assert.equal(over.guarantee,Math.round(270*.2),'a 150% sale over 200G is covered, 20% of charged');
 assert.equal(over.debit,270-54);
 assert.equal(g.interest(n,bar,'full').guarantee,0,'180G charged is under the threshold');
 assert.equal(g.interest(n,premium,'half').guarantee,0,'a 200G+ list Item sold at 170G is not covered');
 assert.equal(g.interest(n,premium,'full').guarantee,Math.round(340*.2));
 const r=sellOnce(['guarantee'],'overcharge','bar');
 assert.equal(r.store,270,'the store still receives the full charged price');assert.equal(r.paid,216,'the customer pays 80%');
 assert.equal(r.g.interest(r.n,bar,'overcharge').guarantee,0,'once per Day');
});
test('REWORK 즉석식품 코너: overheadBase +10% from the next Day, beside hub and never compounded',()=>{
 const base=nightWith([]),kitchen=nightWith(['kitchen']),both=nightWith(['kitchen','hub']);
 const b=base.g.overheadBase(),charged=x=>Math.round((b+x)/10)*10;
 assert.equal(kitchen.g.run.daily.operating,charged(b*.10));
 assert.equal(both.g.run.daily.operating,charged(b*.10+b*.10),'kitchen and hub each take 10% of the base');
 const g=fresh();g.run.dayFacilities=[];g.run.facilities=['kitchen'];
 assert.equal(g.expectedOperatingCost(),charged(0),'bought today: no overhead until the next Day');
});
test('REWORK 24시간 신선체계: Food/Drink ORDER price x1.25, no shelf life, no overhead',()=>{
 const g=fresh('fresh24'),s=g.run;s.facilities=['fresh24'];
 for(const id of ['rice','premium','potion','rope']){const it=DATA.itemBy[id];s.facilities=[];const plain=g.offerFor(it).price;s.facilities=['fresh24'];
  assert.equal(g.offerFor(it).price,['food','drink'].includes(it.category)?Math.round(it.buy*1.25):plain,id+' order price');}
 assert.equal(Relics.shelf(g,DATA.itemBy.rice),0,'no shelf-life effect');
 s.inventory=[];g.stock('rice',1);assert.equal(s.inventory[0].expires,s.day+DATA.itemBy.rice.days);
 assert.equal(nightWith(['fresh24']).g.run.daily.operating,nightWith([]).g.run.daily.operating,'no overhead');
 // acquisition reprices the Food/Drink offers already on the table, once
 s.facilities=[];s.phase='order';s.money=9999;s.offers=[{item:'rice',price:35,quantity:3},{item:'rope',price:50,quantity:3}];
 s.relicWindow={milestoneDay:5,slothSealOpportunity:false,candidateIds:['fresh24'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('fresh24');assert.deepEqual(s.offers.map(o=>o.price),[Math.round(35*1.25),50]);
});
test('REWORK 냉장 유통 계약: Uncommon+ Food/Drink purchase intent +16%p, no stat effect',()=>{
 const g=fresh('coldcase-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=0;n.injury=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 /* read at 150%, where no 0.97 cap or Counter floor hides the term */
 const delta=id=>{g.run.facilities=[];const a=g.interest(n,DATA.itemBy[id],'overcharge').chance;g.run.facilities=['coldcase'];return g.interest(n,DATA.itemBy[id],'overcharge').chance-a;};
 assert.ok(Math.abs(delta('energy')-.16)<1e-9,'Uncommon drink +16%p');
 assert.ok(Math.abs(delta('bar')-.16)<1e-9,'Uncommon food +16%p');
 assert.equal(delta('rice'),0,'Common food untouched');assert.equal(delta('rope'),0,'non-Food untouched');
 const p={...n,pack:['premium']},d=g.run.dungeons[0];
 assert.deepEqual(Dungeon.prepare(p,d,['coldcase']).effects,Dungeon.prepare(p,d,[]).effects,'no stat effect');
});
test('REWORK 단골 묶음혜택: a 단골 second paid purchase is half for the customer, full for the store',()=>{
 const first=[{item:'rice',paid:70,mode:'full'}];
 const r=sellOnce(['memberBundle'],'full','premium',{loyalty:60,history:first});
 assert.equal(r.store,340,'store receives the full charged price');
 assert.equal(r.paid,170,'the customer pays half');
 assert.equal(r.last.subsidy,170,'HQ pays the other half, recorded on the sale');
 for(const [why,opts] of [['not 단골',{loyalty:50,history:first}],['first purchase',{loyalty:60,history:[]}],
                          ['third purchase',{loyalty:60,history:[...first,...first]}]]){
  const x=sellOnce(['memberBundle'],'full','premium',opts);assert.equal(x.paid,340,why+': full price');assert.equal(x.last.subsidy,0);}
 const g=fresh('bundle-judge'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=60;n.history=[{day:g.run.day,item:'rice',paid:70,mode:'full'}];
 g.run.facilities=['memberBundle'];const q=g.interest(n,DATA.itemBy.premium,'overcharge');
 assert.equal(q.price,510);assert.equal(q.debit,255,'at 150% too, half of the charged price');
 g.run.facilities=[];assert.equal(g.interest(n,DATA.itemBy.premium,'overcharge').debit,510);
});
test('REWORK 프리미엄 멤버십: a 단골 arrives with +25G, and Rare+ intent +15%p for 단골 only',()=>{
 const arrive=(loyalty,fac)=>{const g=fresh('premium-member'),s=g.run,n=s.npcs[0];n.traits=[];n.loyalty=loyalty;n.money=100;s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return n.money;};
 assert.equal(arrive(51,['premiumMember'])-arrive(51,[]),25);
 assert.equal(arrive(50,['premiumMember'])-arrive(50,[]),0,'not 단골, no Gold');
 const g=fresh('premium-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.injury=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 const it=DATA.items.find(i=>i.rarity>=2&&!['food','drink'].includes(i.category)&&!i.effects.fear);
 const delta=l=>{n.loyalty=l;g.run.facilities=[];const a=g.interest(n,it,'overcharge').chance;g.run.facilities=['premiumMember'];return g.interest(n,it,'overcharge').chance-a;};
 assert.ok(Math.abs(delta(51)-.15)<1e-9,'단골 +15%p');assert.equal(delta(50),0,'Loyalty 50 is not 단골');
});
test('REWORK 길드 납품 인증 / 왕도 프리미엄 인증: buyer +30G; 150% flat intent penalty lifted',()=>{
 const insured=DATA.items.find(i=>i.rarity>=2&&(i.effects.escape||i.effects.revive));
 const plain=sellOnce([],'full',insured.id),cert=sellOnce(['supplyCert'],'full',insured.id);
 assert.equal(cert.n.money-plain.n.money,30,'the buyer of a qualifying sale gets +30G');
 assert.equal(cert.s.daily.commission,Math.round(insured.sell*.20));
 const common=sellOnce(['supplyCert'],'full','rice');assert.equal(common.n.money,sellOnce([],'full','rice').n.money,'a non-qualifying sale gives nothing');
 // 왕도 프리미엄 인증: +16%p back on 150% only; the price burden and Loyalty -3 stay
 const g=fresh('royal-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=0;n.injury=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 for(const id of ['rice','rope','premium']){const it=DATA.itemBy[id];
  g.run.facilities=[];const a=g.interest(n,it,'overcharge'),f=g.interest(n,it,'full').chance;
  g.run.facilities=['royalCert'];const b=g.interest(n,it,'overcharge');
  assert.ok(Math.abs(b.chance-Math.min(.97,a.chance+.16))<1e-9,id+' 150% intent +16%p');assert.equal(b.price,a.price);assert.equal(b.debit,a.debit);
  assert.equal(g.interest(n,it,'full').chance,f,id+' 100% unchanged');}
 const r=sellOnce(['royalCert'],'overcharge','rice',{loyalty:10});assert.equal(r.last.loyalty,-3,'Loyalty -3 unchanged');
});

console.log(count+' Relic effect groups passed');
