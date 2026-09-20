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
 /* REL-Q-v28-15: the first-bulk keystone now triggers at 7 previous-Day sales, and it is the
    only bulk engine left on previous-Day sales - REL-Q-v28-14 took 회전 진열대 off the discount
    path entirely, so it must not move the quote at any sales figure. */
 for(const [id,threshold]of [['logisticsHQ',7]]){s.facilities=[id];s.cart={0:3};s.previousSales=threshold-1;assert.equal(g.cartTotal(),base);s.previousSales=threshold;assert.ok(g.cartTotal()<base);s.bulkUsed=true;assert.equal(g.cartTotal(),base);s.bulkUsed=false;}
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
 for(const [visits,paid]of [[1,true],[2,false],[2,true]]){const base=nightWith([],visits,paid),boost=nightWith(['returnPoints'],visits,paid),eligible=visits>1&&paid;assert.equal(boost.n.money-base.n.money,eligible?30:0);assert.equal(boost.n.loyalty-base.n.loyalty,eligible?2:0);}
});
test('lifetime reward cannot repeat by re-resolving Night; overhead matches day effects',()=>{
 const base=nightWith([]),boost=nightWith(['lifetime']);assert.equal(boost.n.money-base.n.money,50);const money=boost.n.money;boost.g.night();assert.equal(boost.n.money,money);
 /* Two things this line used to get wrong. hub's cost is a PROPORTION of the overhead base
    under the approved bundle, not the flat +35 it was written against; and the operating cost
    is rounded to the nearest 10G, so what the store is actually charged is not the raw
    modifier - a 30G saving lands as 30G off this base. The expected figure is therefore
    derived from the rule AND its rounding, and the raw modifier each Relic contributes is
    asserted separately, so neither half can drift unnoticed. */
 const raw={showcase:10,hub:base.g.overheadBase()*DATA.balance.hubOverheadRate,efficiency:-30};
 const charged=x=>Math.round((base.g.overheadBase()+x)/10)*10;
 for(const [id,modifier] of Object.entries(raw)){
  assert.equal(nightWith([id]).g.run.daily.operating-base.g.run.daily.operating,
   charged(modifier)-charged(0),id+' day overhead');
 }
 assert.equal(raw.hub,base.g.overheadBase()*0.10,'hub is 10% of the overhead base, the approved rate');
});
test('D30 excludes throughput Relics whose condition cannot be met anymore',()=>{
 for(let i=0;i<100;i++){const g=fresh('final-offer-'+i);g.run.previousSales=0;g.relicWindow(30);assert.ok(g.run.relicWindow.candidateIds.every(id=>!['rotation','logisticsHQ'].includes(id)));}
});

/* RELIC_v2.8 §ROTATION DISPLAY — SUPPLY ENGINE. The support stopped being a discount and became
   a supply engine: high sales yesterday mean more units on today's ordinary offers, which is what
   makes the separate bulk thresholds reachable. Quantity only - not price, not slot count, not
   Rare+. */
test('REL-Q-v28-14: 회전 진열대 adds supply quantity to Common/Uncommon offers on a >=6 sales Day',()=>{
 const g=fresh('rotation-supply'),s=g.run;
 const quantity=(it,facilities,sales)=>{
  s.facilities=[];s.previousSales=sales;const state=g.rng.state,plain=g.offerFor(it).quantity;
  s.facilities=facilities;g.rng=new RNG(s.seed,state);
  return [plain,g.offerFor(it).quantity];
 };
 const common=DATA.items.find(i=>i.rarity===0),uncommon=DATA.items.find(i=>i.rarity===1);
 const rare=DATA.items.find(i=>i.rarity===2),epic=DATA.items.find(i=>i.rarity===3);
 for(const it of [common,uncommon]){
  for(const sales of [0,3,5]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain,it.id+' is unchanged at '+sales+' previous sales');}
  for(const sales of [6,7,11]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain+1,it.id+' gets +1 at '+sales+' previous sales');}
 }
 for(const it of [rare,epic])for(const sales of [6,12]){
  const [plain,got]=quantity(it,['rotation'],sales);
  assert.equal(got,plain,it.id+' (Rare+) quantity is never touched');
 }
 // it adds units, never slots, and never money off
 s.previousSales=9;s.facilities=[];g.generateOffers();const slots=s.offers.length;
 s.facilities=['rotation'];g.generateOffers();assert.equal(s.offers.length,slots,'the offer slot count is unchanged');
 s.offers=[{item:'rice',price:100,quantity:8}];s.cart={0:3};s.bulkUsed=false;
 s.facilities=[];const plainQuote=g.cartTotal();s.facilities=['rotation'];
 assert.equal(g.cartTotal(),plainQuote,'and the support discounts nothing');
});

test('REL-Q-v28-15: 물류 본부계약 takes 25% off the first bulk order once, from 7 previous sales',()=>{
 const g=fresh('logistics-hq'),s=g.run;g.beginOrder();
 s.offers=[{item:'rice',price:100,quantity:8},{item:'rice',price:100,quantity:8}];
 s.facilities=[];s.cart={0:3};const base=g.cartTotal();
 s.facilities=['logisticsHQ'];
 for(const sales of [0,5,6]){s.previousSales=sales;s.bulkUsed=false;assert.equal(g.cartTotal(),base,'no discount at '+sales+' previous sales');}
 s.previousSales=7;s.bulkUsed=false;assert.equal(g.cartTotal(),Math.round(100*.75)*3,'exactly -25% at 7');
 s.bulkUsed=true;assert.equal(g.cartTotal(),base,'and only the first bulk order of the Day');
 assert.equal(DATA.relicBy.logisticsHQ.price,720,'the price is unchanged');
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
 assert.equal(DATA.relicBy.hub.price,700);
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
  assert.equal(s.inventory[i].expires-again[i],eligible?1:0,st.item+' takes 대형 냉장고 once, and coldcase not twice');
 }
 assert.ok(!DATA.items.some(it=>'fresh' in it),'no Item carries the retired fresh property');
});

/* REL-Q-v28-5 / REL-Q-v28-7. Both commissions are a share of LIST price, so each is resolved
   through an actual accepted sale and read off the Day ledger rather than off the source. */
test('REL-Q-v28-5 / 7: HQ commission is 12% (supplyCert) and 20% (royalCert) of list price',()=>{
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
 assert.ok(plain&&insured,'the catalogue has both a plain Rare+ and a Rare+ insurance role');
 assert.equal(sale(['royalCert'],'overcharge',plain),Math.round(plain.sell*.20),'royalCert pays 20% of list');
 assert.equal(sale(['royalCert'],'full',plain),0,'and only on a 바가지 sale');
 assert.equal(sale(['supplyCert'],'full',insured),Math.round(insured.sell*.12),'supplyCert pays 12% of list');
 assert.equal(sale([],'overcharge',plain),0,'no support, no commission');
 // neither inherited rate survives on the Gold path
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/it\.sell\*\.08/.test(src),'the inherited 8% supplyCert rate is gone');
 assert.ok(!/mode==='overcharge'&&it\.rarity>=2\)commission\+=Math\.round\(it\.sell\*\.12\)/.test(src),
  'and so is the inherited 12% royalCert rate');
});

test('REL-Q-v28-2 / 4 / 6 / 8: the approved Store Support prices are in the catalogue',()=>{
 for(const [id,price] of [['fridge',200],['efficiency',260],['rotation',240],['logisticsHQ',720],
                          ['returnPoints',400],['lifetime',740],['supplyCert',440],['royalCert',760],
                          ['hub',700],['expeditionCert',700]])
  assert.equal(DATA.relicBy[id].price,price,id+' price');
});

console.log(count+' Relic effect groups passed');
