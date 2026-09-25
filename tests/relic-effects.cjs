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
 /* 2026-09-23 remakes: 단체 주문 창구 and 새벽 회수 계약 no longer discount an order */
 for(const id of ['groupFlyer','dawnBulk']){s.facilities=[id];s.queue=Array(8).fill('fixture');assert.equal(g.cartTotal(),base,id+' discounts nothing');}
 s.facilities=['bulk'];s.queue=[];const quote=g.cartTotal(),before=s.money;g.confirmOrder();assert.equal(before-s.money,quote);assert.equal(s.inventory.slice(-3).reduce((v,x)=>v+x.cost,0),quote);
});
test('offer weights and quantities match relevant product roles',()=>{
 const g=fresh(),s=g.run,potion=DATA.itemBy.potion,premium=DATA.itemBy.premium;
 for(const [id,it]of [['showcase',premium],['coldcase',premium]]){s.facilities=[];const base=Relics.offerWeight(g,it);s.facilities=[id];assert.ok(Relics.offerWeight(g,it)>base,id);}
 s.dungeons=[g.makeDungeon('spider',1)];s.facilities=[];const base=Relics.offerWeight(g,DATA.itemBy.antidote);s.facilities=['hazardBoard'];assert.ok(Relics.offerWeight(g,DATA.itemBy.antidote)>base);
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
 for(const [visits,paid]of [[1,true],[2,false],[2,true]]){const base=nightWith([],visits,paid),boost=nightWith(['returnPoints'],visits,paid),eligible=visits>1&&paid;assert.equal(boost.n.money-base.n.money,eligible?25:0);assert.equal(boost.n.loyalty-base.n.loyalty,eligible?5:0);}
 /* 2026-09-23 rebalance: the Loyalty >= 30 condition is gone - a low-Loyalty paid returner earns it too */
 const low=(facilities)=>{const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=2;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=5;n.money=100;n.destination=0;n.claimedDestination=0;n.history=[{day:s.day,item:'rice',paid:35,mode:'half'}];s.queue=[n.id];s.phase='sell';s.facilities=facilities;s.dayFacilities=facilities;g.night();return n;};
 const lb=low([]),lr=low(['returnPoints']);assert.equal(lr.loyalty-lb.loyalty,5,'no Loyalty threshold');assert.equal(lr.money-lb.money,25);
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
                 'memberBundle','premiumMember','returnPoints','supplyCert','dawnBulk','lifetime',
                 'royalCert','hub','efficiency'];
 assert.deepEqual([...DATA.relicD30NoEffect].sort(),[...EXCLUDED].sort(),'the exclusion set is exactly the RELIC D30 list (16)');
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
 for(const id of ['delivery','terminal','bulk','medicine','showcase','hazardBoard','expeditionCert'])
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
 /* 2026-09-23 rebalance: 4+ previous sales, every rarity; +1 since the 2026-09-24 tuning */
 for(const it of [common,uncommon,rare,epic]){
  for(const sales of [0,2,3]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain,it.id+' is unchanged at '+sales+' previous sales');}
  for(const sales of [4,6,11]){const [plain,got]=quantity(it,['rotation'],sales);
   assert.equal(got,plain+1,it.id+' gets +1 at '+sales+' previous sales');}
 }
 // it adds units, never slots, and never money off
 s.previousSales=9;s.facilities=[];g.generateOffers();const slots=s.offers.length;
 s.facilities=['rotation'];g.generateOffers();assert.equal(s.offers.length,slots,'the offer slot count is unchanged');
 s.offers=[{item:'rice',price:100,quantity:8}];s.cart={0:3};s.bulkUsed=false;
 s.facilities=[];const plainQuote=g.cartTotal();s.facilities=['rotation'];
 assert.equal(g.cartTotal(),plainQuote,'and the support discounts nothing');
});

test('REL-Q-v28-15: 물류 본부계약 takes 25% off every same-SKU 3+ order, from 6 previous sales',()=>{
 const g=fresh('logistics-hq'),s=g.run;g.beginOrder();
 s.offers=[{item:'rice',price:100,quantity:8},{item:'rice',price:100,quantity:8},{item:'water',price:40,quantity:8}];
 s.facilities=[];s.cart={0:3};const base=g.cartTotal();
 s.facilities=['logisticsHQ'];
 for(const sales of [0,4,5]){s.previousSales=sales;assert.equal(g.cartTotal(),base,'no discount at '+sales+' previous sales');}
 s.previousSales=6;assert.equal(g.cartTotal(),Math.round(100*.75)*3,'exactly -25% at 6');
 s.cart={0:2};assert.equal(g.cartTotal(),200,'a 2-unit order is not a bulk order');
 // every bulk SKU of the Day, not only the first, and after an earlier bulk order
 s.cart={0:3,2:3};assert.equal(g.cartTotal(),Math.round(100*.75)*3+Math.round(40*.75)*3,'both 3+ SKUs are discounted');
 s.bulkUsed=true;s.cart={0:3};assert.equal(g.cartTotal(),Math.round(100*.75)*3,'an earlier bulk order today does not use it up');
 // with 묶음발주 계약 the two stack and the internal 45% floor is not reached
 s.facilities=['logisticsHQ','bulk'];s.cart={0:3};assert.equal(g.cartTotal(),75+75+Math.round(100*.75*.8));
 assert.equal(DATA.relicBy.logisticsHQ.price,300,'the rebalanced price');
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
 assert.equal(DATA.relicBy.hub.price,340);
 assert.equal(DATA.balance.hubOverheadRate,.10,'the operating modifier stays overheadBase +10%');
});

/* 2026-09-23 remake: 첫 방문 쿠폰 replaces 신입 모집 게시판 (REL-Q-v28-3 seating retired with it).
   An adventurer's first-ever visit: +30G on arrival and purchase intent +20%p for that visit. */
test('REMAKE 첫 방문 쿠폰: first-ever visit +30G on arrival and intent +20%p, and no seating',()=>{
 const arrive=(introduced,fac)=>{const g=fresh('coupon'),s=g.run,n=s.npcs[0];n.traits=[];n.money=100;n.introduced=introduced;n.visits=introduced?3:0;s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return {g,n};};
 assert.equal(arrive(false,['rookieBoard']).n.money-arrive(false,[]).n.money,30,'first visit +30G');
 assert.equal(arrive(true,['rookieBoard']).n.money-arrive(true,[]).n.money,0,'a returning adventurer gets nothing');
 for(const introduced of [false,true]){
  const {g,n}=arrive(introduced,[]);n.injury=0;n.money=9999;g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
  const it=DATA.itemBy.rope,a=g.interest(n,it,'overcharge').chance;g.run.facilities=['rookieBoard'];
  const b=g.interest(n,it,'overcharge').chance;
  assert.ok(Math.abs(b-a-(introduced?0:.20))<1e-9,(introduced?'returning':'first visit')+' intent');
 }
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/dayFacilities\.includes\('rookieBoard'\)/.test(src),'the support no longer seats anyone');
});

/* 2026-09-23 remake: 단체 주문 창구 - its own 20% Morning roll for +1 visitor, and +15G commission
   on every sale from the Day's 5th. */
test('REMAKE 단체 주문 창구: own 20% Morning roll +1 visitor; +15G per sale from the 5th',()=>{
 const g=fresh('group-window'),s=g.run;
 for(const [r,want] of [[0,1],[.1999,1],[.2,0],[.9,0]]){
  s.dayFacilities=['groupFlyer'];g.rng={int:()=>3,next:()=>r};const v=g.morningVisitors();
  assert.equal(v.flyerExtra,want,'r='+r);assert.equal(s.expectedVisitors,3+want);assert.equal(v.baseVisitors,3,'the base roll is untouched');
 }
 s.dayFacilities=[];g.rng={int:()=>3,next:()=>0};assert.equal(g.morningVisitors().flyerExtra,0,'not owned, no roll');
 // commission: sales 1-4 nothing, 5th and later +15G each
 const g2=fresh('group-commission'),t=g2.run;t.facilities=['groupFlyer'];t.dayFacilities=['groupFlyer'];t.phase='sell';t.daily.commission=0;
 g2.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
 const got=[];
 for(let i=0;i<7;i++){const n=t.npcs[i%t.npcs.length];n.traits=[];n.money=99999;n.pack=[];n.refused=[];n.history=[];n.destination=0;n.claimedDestination=0;
  t.queue=[n.id];t.cursor=0;g2.stock('rice',1);const c=t.daily.commission;assert.equal(g2.sell(t.inventory.at(-1).id,'full'),true);got.push(t.daily.commission-c);}
 assert.deepEqual(got,[0,0,0,0,15,15,15]);
});

/* 2026-09-23 remake: 새벽 회수 계약 - expiring Food/Drink is taken back at 50% of its cost instead
   of being wasted, and each Day's first offer generation carries one extra Food/Drink slot. */
test('REMAKE 새벽 회수 계약: 50% recovery of expiring Food/Drink, and +1 Food/Drink slot on the first generation',()=>{
 const g=fresh('dawn-recovery'),s=g.run;s.facilities=['dawnBulk'];s.inventory=[];
 g.stock('rice',2,40);g.stock('rope',1,50);for(const st of s.inventory)st.expires=s.day+1;
 const money=s.money,waste=s.stats.waste;s.day++;g.morningReset();
 assert.equal(s.money-money,40,'2 x 50% of 40G');assert.equal(s.daily.subsidy,40);
 assert.equal(s.daily.waste,1,'only the non-Food is waste');assert.equal(s.stats.waste-waste,1);assert.equal(s.daily.wasteCost,50);
 assert.equal(s.inventory.length,0,'all of it left the shelf');
 const h=fresh('dawn-offers'),t=h.run;t.facilities=[];t.event=null;h.generateOffers();const n=t.offers.length;
 for(let i=0;i<30;i++){t.facilities=['dawnBulk'];h.generateOffers();assert.equal(t.offers.length,n+1,'one extra slot');
  assert.ok(Relics.food(DATA.itemBy[t.offers.at(-1).item]),'and it is Food/Drink');}
 t.phase='order';t.money=99999;h.reroll();assert.equal(t.offers.length,n,'a Reroll is not the first generation');
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
test('REL-Q-v28-5 / 7: HQ commission is 20% of list (supplyCert) and 40% of the charged 150% price (royalCert)',()=>{
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
 assert.equal(sale(['royalCert'],'overcharge',plain),Math.round(Math.round(plain.sell*1.5)*.40),'royalCert pays 40% of the charged 150% price');
 assert.equal(sale(['royalCert'],'overcharge',common),Math.round(Math.round(common.sell*1.5)*.40),'at any rarity');
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
 for(const [id,price] of [['bulk',130],['rotation',80],['stamp',130],['member',130],['showcase',140],
                          ['guarantee',140],['hazardBoard',60],['medicine',80],['fridge',60],['kitchen',170],
                          ['board',110],['rookieBoard',110],['groupFlyer',200],['memberBundle',190],
                          ['premiumMember',200],['returnPoints',240],['expeditionMeal',200],['coldcase',180],
                          ['supplyCert',220],['dawnBulk',190],['logisticsHQ',300],['lifetime',310],
                          ['royalCert',320],['expeditionCert',290],['fresh24',360],['hub',340],
                          ['warehouse',130],['terminal',130],['delivery',120],['efficiency',130]])
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
test('REWORK 길드 보증 진열대: the CHARGED price must reach 200G, and HQ covers 30% of it',()=>{
 const g=fresh('guarantee-charged'),n=g.run.npcs[0];n.traits=[];n.money=9999;g.run.facilities=['guarantee'];
 const bar=DATA.itemBy.bar,premium=DATA.itemBy.premium;           // list 180 / 340
 const over=g.interest(n,bar,'overcharge');                          // charged 270 on a sub-200 list price
 assert.equal(over.price,270);assert.equal(over.guarantee,Math.round(270*.3),'a 150% sale over 200G is covered, 30% of charged');
 assert.equal(over.debit,270-81);
 assert.equal(g.interest(n,bar,'full').guarantee,0,'180G charged is under the threshold');
 assert.equal(g.interest(n,premium,'half').guarantee,0,'a 200G+ list Item sold at 170G is not covered');
 assert.equal(g.interest(n,premium,'full').guarantee,Math.round(340*.3));
 const r=sellOnce(['guarantee'],'overcharge','bar');
 assert.equal(r.store,270,'the store still receives the full charged price');assert.equal(r.paid,189,'the customer pays 70%');
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
test('REWORK 프리미엄 멤버십: a 단골 arrives with +40G, and Rare+ intent +15%p for 단골 only',()=>{
 const arrive=(loyalty,fac)=>{const g=fresh('premium-member'),s=g.run,n=s.npcs[0];n.traits=[];n.loyalty=loyalty;n.money=100;s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return n.money;};
 assert.equal(arrive(51,['premiumMember'])-arrive(51,[]),40);
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

/* 2026-09-24 tuning (User): 희귀상품 입고 계약 raises a Rare+ Item's sale price 10% in every mode.
   The customer pays it from their own Wallet - no HQ subsidy, no commission - and is judged on it. */
test('희귀상품 입고 계약: Rare+ sale price +10%, paid by the customer, nothing from HQ',()=>{
 const g=fresh('showcase-price'),n=g.run.npcs[0];n.traits=[];n.money=9999;
 const rare=DATA.items.find(i=>i.rarity>=2),common=DATA.items.find(i=>i.rarity===0);
 const q=(it,mode,fac)=>{g.run.facilities=fac;return g.interest(n,it,mode);};
 const list=Math.round(rare.sell*1.1);
 for(const mode of ['half','full','overcharge']){
  const plain=q(rare,mode,[]),lifted=q(rare,mode,['showcase']);
  assert.equal(lifted.price,Math.round(list*DATA.pricing[mode].mult),mode+' charges 110% of list');
  assert.equal(lifted.debit,lifted.price,mode+': the customer pays all of it');
  assert.ok(lifted.chance<=plain.chance,mode+': a dearer offer is never easier to accept');}
 assert.equal(q(common,'full',['showcase']).price,common.sell,'below Rare nothing changes');
 const r=sellOnce(['showcase'],'full',rare.id);
 assert.equal(r.store,list,'the store receives the lifted price');assert.equal(r.paid,list,'all of it from the customer');
 assert.equal(r.last.subsidy||0,0,'HQ fills nothing');assert.equal(r.s.daily.commission||0,0,'and pays no commission');
});

test('RELIC §COUNTER JUDGEMENT (User 2026-09-24, v2.9.0): 직접 대응 vs 관련 준비, and the 기동 exception is gone',()=>{
 const coffee=DATA.itemBy.coffee,rope=DATA.itemBy.rope,rice=DATA.itemBy.rice;
 assert.equal(Relics.directCounter(coffee,['bind']),false,'기동 is not a Counter for 속박 any more');
 assert.equal(Relics.relatedPrep(coffee,['bind']),true,'but it is 관련 준비 (the Stat 속박 presses)');
 assert.equal(Relics.directCounter(rope,['bind']),true);assert.equal(Relics.relatedPrep(rope,['bind']),true);
 assert.equal(Relics.relatedPrep(rice,['bind']),false,'강인함 is not what 속박 presses');
 assert.equal(Relics.relatedPrep(rice,['poison']),true,'강인함 is what 독 presses');
 assert.equal('counter' in Relics,false,'no third predicate survives');
 // 원정 위험 게시판 reads 관련 준비; the multipliers, pity and cert rewards read 직접 대응
 const g=fresh('judgement'),s=g.run;s.dungeons=[{...g.makeDungeon('spider',1),hazards:['bind']}];
 s.facilities=[];const base=Relics.offerWeight(g,coffee);s.facilities=['hazardBoard'];
 assert.ok(Relics.offerWeight(g,coffee)>base,'게시판 weights a 기동 Drink on a 속박 Gate (관련 준비)');
 const n={...s.npcs[0],traits:[],pack:['coffee'],injury:0,fatigue:0};
 const plain=Dungeon.prepare(n,s.dungeons[0],[]).effects,cert=Dungeon.prepare(n,s.dungeons[0],['expeditionCert']).effects;
 assert.equal(cert.mobility,plain.mobility,'원정 전문 인증 does not multiply a pressed Stat');
 const withRope={...n,pack:['rope']};
 assert.ok(Dungeon.prepare(withRope,s.dungeons[0],['expeditionCert']).effects.bind>Dungeon.prepare(withRope,s.dungeons[0],[]).effects.bind,'it still multiplies a direct Counter');
 // SALE acceptance floor reads 관련 준비
 s.phase='sell';s.queue=[n.id];const cust=s.npcs[0];cust.money=9999;cust.destination=0;cust.claimedDestination=0;cust.traits=[];
 assert.equal(g.interest(cust,coffee,'full').chance,.97,'a 기동 Drink for a 속박 Gate takes the 관련 준비 floor');
 assert.ok(g.interest(cust,rice,'full').chance<.97,'an unrelated Item does not');
 assert.equal(DATA.balance.accessibleNeed,.72,'ECONOMY_ORDER: base need 0.72');
});

test('RELIC §QUICK VIEW STATUS LINE (User 2026-09-24, v2.9.0): the runtime truth, COPY_AUDIT §11-32 exact',()=>{
 const g=fresh('status'),s=g.run;s.facilities=['rotation','logisticsHQ','guarantee','groupFlyer','delivery','bulk','memberBundle','medicine'];
 s.previousSales=3;assert.equal(Relics.status(g,'rotation'),'전날 판매 3건 · 오늘 미적용');s.previousSales=4;assert.equal(Relics.status(g,'rotation'),'전날 판매 4건 · 오늘 적용 중');
 assert.equal(Relics.status(g,'logisticsHQ'),'전날 판매 4건 · 오늘 미적용');s.previousSales=6;assert.equal(Relics.status(g,'logisticsHQ'),'전날 판매 6건 · 오늘 적용 중');
 s.guaranteeUsed=false;assert.equal(Relics.status(g,'guarantee'),'오늘 지원 1회 남음');s.guaranteeUsed=true;assert.equal(Relics.status(g,'guarantee'),'오늘 지원 사용함');
 s.daily.sales=2;assert.equal(Relics.status(g,'groupFlyer'),'오늘 판매 2건 · 5번째부터 +15G');s.daily.sales=4;assert.equal(Relics.status(g,'groupFlyer'),'오늘 판매 4건 · 판매마다 +15G 지급 중');
 s.rerollCount=0;assert.equal(Relics.status(g,'delivery'),'오늘 무료 교환 남음');s.rerollCount=1;assert.equal(Relics.status(g,'delivery'),'오늘 무료 교환 사용함');
 s.phase='sell';assert.equal(Relics.status(g,'bulk'),'','묶음발주 계약 speaks only at ORDER');
 s.phase='order';g.generateOffers();s.cart={};assert.equal(Relics.status(g,'bulk'),'지금 발주에서 적용 없음');s.cart={0:3};assert.equal(Relics.status(g,'bulk'),'지금 발주에서 1종 적용');
 assert.equal(Relics.status(g,'memberBundle'),'','단골 묶음혜택 speaks only at SALE');
 s.phase='sell';const n=s.npcs[0];s.queue=[n.id];s.cursor=0;n.loyalty=10;n.history=[];assert.equal(Relics.status(g,'memberBundle'),n.name+' · 단골 아님');
 n.loyalty=60;n.history=[{day:s.day,paid:50}];assert.equal(Relics.status(g,'memberBundle'),n.name+' · 단골 · 오늘 유료 구매 1건');
 assert.equal(Relics.status(g,'medicine'),'','an always-on support carries no line');
 assert.equal(Relics.status(g,'lifetime'),'','평생 단골제 has no daily use state to read');
});
