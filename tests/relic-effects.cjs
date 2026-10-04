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
 /* REL-Q-v28-14 took 회전 진열대 off the discount path entirely, so it must not move the quote at any
    sales figure (물류 본부계약's per-sale discount has its own test since the v2.9.11 remake). */
 s.facilities=['rotation'];s.cart={0:3};for(const sales of [0,5,6,7,12]){s.previousSales=sales;assert.equal(g.cartTotal(),base,'rotation never discounts, at '+sales+' previous sales');}
 s.previousSales=0;
 /* 2026-09-23 remakes: 단체 주문 창구 and 새벽 회수 계약 no longer discount an order */
 for(const id of ['groupOrder','dawnRecovery']){s.facilities=[id];s.queue=Array(8).fill('fixture');assert.equal(g.cartTotal(),base,id+' discounts nothing');}
 s.facilities=['bulk'];s.queue=[];const quote=g.cartTotal(),before=s.money;g.confirmOrder();assert.equal(before-s.money,quote);assert.equal(s.inventory.slice(-3).reduce((v,x)=>v+x.cost,0),quote);
});
test('후방 창고 증설 adds 5 warehouse slots (User 2026-09-26, v2.9.2 fourth pass; was 10)',()=>{
 const g=fresh(),s=g.run;s.facilities=[];assert.equal(g.capacity(),18,'base warehouse 18');
 s.facilities=['warehouse'];assert.equal(g.capacity(),23,'with the Relic 18 + 5');
 s.inventory=[];for(let i=0;i<23;i++)g.stock('rice',1,10);assert.equal(g.canStock(DATA.itemBy.rice),false,'the 24th unit does not fit');
});
test('offer weights and quantities match relevant product roles',()=>{
 const g=fresh(),s=g.run,potion=DATA.itemBy.lowpotion,premium=DATA.itemBy.guildlunch;
 for(const [id,it]of [['rareContract',premium]]){s.facilities=[];const base=Relics.offerWeight(g,it);s.facilities=[id];assert.ok(Relics.offerWeight(g,it)>base,id);}
 // RELIC 고급 식자재 유통 계약 (User 2026-10-04): no order weighting - one extra Uncommon+ Food/Drink slot on the Day's first sheet
 s.facilities=['coldcase'];assert.equal(Relics.offerWeight(g,premium),1,'고급 식자재 does not weight the draw');
 s.facilities=[];g.generateOffers(true);const plainCount=s.offers.length;s.facilities=['coldcase'];g.generateOffers(true);
 assert.equal(s.offers.length,plainCount+1,'one extra slot on the first sheet');const extra=DATA.itemBy[s.offers.at(-1).item];
 assert.ok(['food','drink'].includes(extra.category)&&extra.rarity>=1,'and it is an Uncommon+ Food/Drink');
 s.dungeons=[g.makeDungeon('spider',1)];s.facilities=[];const base=Relics.offerWeight(g,DATA.itemBy.antidote);s.facilities=['hazardBoard'];assert.ok(Relics.offerWeight(g,DATA.itemBy.antidote)>base);
 s.facilities=[];g.generateOffers();const n=s.offers.length;s.facilities=['extraOrder'];g.generateOffers();assert.equal(s.offers.length,n+2);
});
test('fresh Relics enhance nutrition but not unrelated counter/penalty',()=>{
 /* ITEM_v2.7 §FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION: the Fresh Relics raise a Food's
    POSITIVE NATIVE Core Stat and nothing else. There is no `effects.food` channel any more -
    that was the v2.5 shape this assertion was written against - so what is measured is the
    Core Stat the Item actually carries, with the Hazard Counter and the Supply held fixed. */
 const g=fresh(),n={...g.run.npcs[0],traits:[],pack:['dragonramen']},d=g.makeDungeon('snow',2),base=Dungeon.prepare(n,d).effects;
 for(const id of ['kitchen','fresh24']){const e=Dungeon.prepare(n,d,[id]).effects;
  assert.ok(e.survival>base.survival,id+' raises the Food native Core Stat');
  assert.equal(e.cold,base.cold,id+' does not touch the Hazard Counter');
  assert.equal(e.supply,base.supply,id+' does not touch Supply');}
 const it=DATA.itemBy.guildlunch;s=g.run;s.facilities=['fridge'];const f=Relics.shelf(g,it);assert.ok(f>0);s.facilities=['fridge','coldcase','fresh24'];assert.equal(Relics.shelf(g,it),f,'only 대형 냉장고 extends the shelf');assert.equal(Relics.shelf(g,DATA.itemBy.stone),0);
});
test('premium guarantee obeys wallet, daily limit and never guarantees acceptance',()=>{
 const g=fresh(),n=g.run.npcs[0],it=DATA.itemBy.guildlunch;n.traits=[];n.money=999;
 const base=g.interest(n,it,'overcharge');g.run.facilities=['guarantee'];const credit=g.interest(n,it,'overcharge');assert.equal(credit.price,base.price);assert.ok(credit.debit<base.debit);assert.ok(credit.chance<1);
 n.money=credit.debit-1;assert.equal(g.interest(n,it,'overcharge').chance,0);g.run.guaranteeUsed=true;assert.equal(g.interest(n,it,'overcharge').guarantee,0);
 n.money=999;n.loyalty=60;g.run.facilities=['premiumMember'];const member=g.interest(n,it,'overcharge');g.run.facilities=[];assert.ok(member.chance>g.interest(n,it,'overcharge').chance);assert.ok(member.chance<1);
});
function nightWith(facilities,visits=2,paid=true){const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=visits;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=60;n.money=100;n.destination=0;n.claimedDestination=0;n.history=paid?[{day:s.day,item:'rice',paid:35,mode:'half'}]:[];s.queue=[n.id];s.phase='sell';s.facilities=facilities;s.dayFacilities=facilities;g.night();return {g,n};}
/* User 2026-10-04: the returning-customer condition is gone (a first-visit buyer earns it too) and Loyalty is +4 */
test('return points pays a paid buyer who survives, first visit included; excludes no-sale',()=>{
 for(const [visits,paid]of [[1,true],[2,false],[2,true]]){const base=nightWith([],visits,paid),boost=nightWith(['returnPoints'],visits,paid),eligible=paid;assert.equal(boost.n.money-base.n.money,eligible?20:0);assert.equal(boost.n.loyalty-base.n.loyalty,eligible?4:0);}
 /* 2026-09-23 rebalance: the Loyalty >= 30 condition is gone - a low-Loyalty paid returner earns it too */
 const low=(facilities)=>{const g=fresh(),s=g.run,n=s.npcs[0];n.introduced=true;n.visits=2;n.traits=[];n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n.loyalty=5;n.money=100;n.destination=0;n.claimedDestination=0;n.history=[{day:s.day,item:'rice',paid:35,mode:'half'}];s.queue=[n.id];s.phase='sell';s.facilities=facilities;s.dayFacilities=facilities;g.night();return n;};
 const lb=low([]),lr=low(['returnPoints']);assert.equal(lr.loyalty-lb.loyalty,4,'no Loyalty threshold');assert.equal(lr.money-lb.money,20);
});
/* RELIC 22 (User 2026-10-02 remake): 평생 단골제 pays no Gold and weights no visit - a 단골's four Core Stats +10% (shown among
   each Stat's sources, the Final party included), and once a 단골, Loyalty does not drop below 51 while it is owned. */
test('RELIC 22: 평생 단골제 - 단골 Stats +10% and the 단골 line holds; no Gold, no revisit weight',()=>{
 const g=fresh('lifetime'),n={...g.run.npcs[0],traits:[],injury:0,fatigue:0,pack:[]},d={...g.run.dungeons[0],requiredSupply:0};
 const reg={...n,loyalty:51},plain=Dungeon.prepare(reg,d,[]),owned=Dungeon.prepare(reg,d,['lifetime']);
 for(const k of ['combat','survival','mobility','spirit']){
  assert.ok(Math.abs(owned.effects[k]-plain.effects[k]*1.1)<1e-9,k+' +10% for a 단골');
  assert.ok(owned.sources[k].some(x=>x.name==='평생 단골제'&&x.isPct&&x.v===10),k+' lists the source');}
 const not={...n,loyalty:50};assert.deepEqual(Dungeon.prepare(not,d,['lifetime']).effects,Dungeon.prepare(not,d,[]).effects,'below 51: nothing');
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/relicParams\.lifetime\.(goldBonus|revisitMult)/.test(src),'no Gold, no revisit weight');
 assert.ok(!DATA.relicD30NoEffect.includes('lifetime'),'it now reaches the Final party, so it may be offered on DAY 30');
 const h=fresh('lifetime-floor'),m=h.run.npcs[0];m.loyalty=55;h.run.facilities=['lifetime'];h.loyal(m,-10);assert.equal(m.loyalty,51,'a 단골 stops at 51');
 m.loyalty=55;h.run.facilities=[];h.loyal(m,-10);assert.equal(m.loyalty,45,'without it Loyalty falls as before');
 m.loyalty=40;h.run.facilities=['lifetime'];h.loyal(m,-10);assert.equal(m.loyalty,30,'not yet a 단골: no floor');
 m.loyalty=49;h.loyal(m,5);assert.equal(m.loyalty,54);h.loyal(m,-20);assert.equal(m.loyalty,51,'the floor holds once the line is crossed');
});
test('overhead matches day effects',()=>{
 const base=nightWith([]);
 /* Two things this line used to get wrong. hub's cost is a PROPORTION of the overhead base
    under the approved bundle, not the flat +35 it was written against; and the operating cost
    is rounded to the nearest 10G, so what the store is actually charged is not the raw
    modifier - a 30G saving lands as 30G off this base. The expected figure is therefore
    derived from the rule AND its rounding, and the raw modifier each Relic contributes is
    asserted separately, so neither half can drift unnoticed. */
 const raw={rareContract:0,hub:base.g.overheadBase()*DATA.balance.hubOverheadRate,efficiency:-30};
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
 const EXCLUDED=['stamp','member','guarantee','fridge','board','firstVisitCoupon','groupOrder',
                 'memberBundle','premiumMember','returnPoints','supplyCert','dawnRecovery',
                 'royalCert','hub','efficiency','firstAidDesk','rumorBoard','postcard','rescueContract'];
 assert.deepEqual([...DATA.relicD30NoEffect].sort(),[...EXCLUDED].sort(),'the exclusion set is exactly the RELIC D30 list (19)');
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
  s.facilities=DATA.relics.map(r=>r.id).filter(x=>x!==id);
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
 for(const id of ['rerollTicket','extraOrder','bulk','fieldRepair','rareContract','hazardBoard','opsRoom'])
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

test('REL-Q-v28-15: 물류 본부계약 takes 3% off every ORDER per previous-Day sale, at most 30% (v2.9.11 remake)',()=>{
 const g=fresh('logistics-hq'),s=g.run;g.beginOrder();
 s.offers=[{item:'rice',price:100,quantity:8},{item:'rice',price:100,quantity:8},{item:'water',price:40,quantity:8}];
 s.facilities=[];s.cart={0:1};const base=g.cartTotal();assert.equal(base,100);
 s.facilities=['logisticsHQ'];
 s.previousSales=0;assert.equal(g.cartTotal(),base,'no discount after a Day without sales');
 for(const [sales,mult] of [[1,.97],[4,.88],[6,.82],[9,.73],[10,.70],[15,.70]]){s.previousSales=sales;
  assert.equal(g.cartTotal(),Math.round(100*mult),sales+' previous sales -> x'+mult);}
 // no quantity, SKU or rarity condition: a single unit and a second SKU are both discounted
 s.previousSales=5;s.cart={0:1,2:2};assert.equal(g.cartTotal(),Math.round(100*.85)+2*Math.round(40*.85),'every ORDER line');
 // with 묶음발주 계약 the two multiply and the internal 45% floor is not reached
 s.previousSales=10;s.facilities=['logisticsHQ','bulk'];s.cart={0:3};assert.equal(g.cartTotal(),70+70+Math.round(100*.7*.8));
 assert.equal(DATA.relicBy.logisticsHQ.price,300,'the price is kept');
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

/* RELIC 31 / 32 (User 2026-09-28, v2.9.11): 야전 들것 and 응급 처치대 ease an injury. */
test('RELIC 31 야전 들것: an ordinary Injury costs 투력 8% instead of 15%, and only while owned',()=>{
 const g=fresh('stretcher'),s=g.run,n=s.npcs.find(x=>!x.traits.length)||s.npcs[0],d=s.dungeons[0];n.traits=[];n.pack=[];n.fatigue=0;
 const combat=(inj,fac)=>{n.injury=inj;return Dungeon.prepare(n,d,fac).effects.combat;};
 const base=n.stats.combat+n.equipment.power;
 assert.ok(Math.abs(combat(1,[])-base*.85)<1e-9,'without it an Injury is 투력 -15%');
 assert.ok(Math.abs(combat(1,['fieldStretcher'])-base*.92)<1e-9,'with it the Injury is 투력 -8%');
 assert.equal(combat(0,['fieldStretcher']),combat(0,[]),'a healthy adventurer is untouched');
 n.injury=1;const src=Dungeon.prepare(n,d,['fieldStretcher']).sources.combat.find(x=>x.name==='부상');
 assert.equal(src.v,-8,'the SALE / NPC source line reads the same -8%');
 assert.equal(DATA.relicBy.fieldStretcher.kind,'foundation');assert.deepEqual(DATA.relicBy.fieldStretcher.tags,['expedition']);
 assert.ok(!DATA.relicD30NoEffect.includes('fieldStretcher'),'the D30 Final reads preparation too, so it stays D30-eligible');
});

test('RELIC 32 응급 처치대: an injured arrival recovers at 20%, only while owned, and says so',()=>{
 const run=(fac,seed)=>{const g=fresh(seed),s=g.run,n=s.npcs[0];n.traits=[];n.injury=1;n.status='부상';s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return n;};
 let healed=0;const N=4000;for(let i=0;i<N;i++){const n=run(['firstAidDesk'],'aid-'+i);if(n.injury===0){healed++;assert.equal(n.healedBy,'firstAidDesk');assert.equal(n.status,'건강');}}
 assert.ok(Math.abs(healed/N-.20)<.025,'about 20% of injured arrivals: '+(healed/N).toFixed(3));
 for(let i=0;i<200;i++)assert.equal(run([],'aid-'+i).injury,1,'without it nothing heals at the door');
 assert.equal(DATA.relicBy.firstAidDesk.kind,'keystone');assert.deepEqual(DATA.relicBy.firstAidDesk.tags,['expedition']);
 assert.equal(DATA.relicBy.firstAidDesk.price,300);
 const app=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/ui/app.js'),'utf8');
 assert.ok(app.includes("n.healedBy==='firstAidDesk'?'<p class=\"heal-note\" role=\"status\">응급 처치대로 부상 회복</p>'"),'COPY_AUDIT §9-4b on the state strip');
});

/* 2026-09-23 remake: 첫 방문 쿠폰 replaces 신입 모집 게시판 (REL-Q-v28-3 seating retired with it).
   An adventurer's first-ever visit: +30G on arrival and purchase intent +20%p for that visit. */
test('REMAKE 첫 방문 쿠폰: first-ever visit +30G on arrival and intent +20%p, and no seating',()=>{
 const arrive=(introduced,fac)=>{const g=fresh('coupon'),s=g.run,n=s.npcs[0];n.traits=[];n.money=100;n.introduced=introduced;n.visits=introduced?3:0;s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return {g,n};};
 assert.equal(arrive(false,['firstVisitCoupon']).n.money-arrive(false,[]).n.money,30,'first visit +30G');
 assert.equal(arrive(true,['firstVisitCoupon']).n.money-arrive(true,[]).n.money,0,'a returning adventurer gets nothing');
 for(const introduced of [false,true]){
  const {g,n}=arrive(introduced,[]);n.injury=0;n.money=9999;g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
  const it=DATA.itemBy.rope,a=g.interest(n,it,'overcharge').chance;g.run.facilities=['firstVisitCoupon'];
  const b=g.interest(n,it,'overcharge').chance;
  assert.ok(Math.abs(b-a-(introduced?0:.20))<1e-9,(introduced?'returning':'first visit')+' intent');
 }
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/dayFacilities\.includes\('firstVisitCoupon'\)/.test(src),'the support no longer seats anyone');
});

/* 2026-09-23 remake: 단체 주문 창구 - its own 20% Morning roll for +1 visitor, and +15G commission
   on every sale from the Day's 5th. */
test('REMAKE 단체 주문 창구: own 20% Morning roll +1 visitor; +15G per sale from the 5th',()=>{
 const g=fresh('group-window'),s=g.run;
 for(const [r,want] of [[0,1],[.1999,1],[.2,0],[.9,0]]){
  s.dayFacilities=['groupOrder'];g.rng={int:()=>3,next:()=>r};const v=g.morningVisitors();
  assert.equal(v.flyerExtra,want,'r='+r);assert.equal(s.expectedVisitors,3+want);assert.equal(v.baseVisitors,3,'the base roll is untouched');
 }
 s.dayFacilities=[];g.rng={int:()=>3,next:()=>0};assert.equal(g.morningVisitors().flyerExtra,0,'not owned, no roll');
 // commission: sales 1-4 nothing, 5th and later +15G each
 const g2=fresh('group-commission'),t=g2.run;t.facilities=['groupOrder'];t.dayFacilities=['groupOrder'];t.phase='sell';t.daily.commission=0;
 g2.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
 const got=[];
 for(let i=0;i<7;i++){const n=t.npcs[i%t.npcs.length];n.traits=[];n.money=99999;n.pack=[];n.refused=[];n.history=[];n.destination=0;n.claimedDestination=0;
  t.queue=[n.id];t.cursor=0;g2.stock('rice',1);const c=t.daily.commission;assert.equal(g2.sell(t.inventory.at(-1).id,'full'),true);got.push(t.daily.commission-c);}
 assert.deepEqual(got,[0,0,0,0,15,15,15]);
});

/* 2026-09-23 remake: 새벽 회수 계약 - expiring Food/Drink is taken back at 50% of its cost instead
   of being wasted, and each Day's first offer generation carries one extra Food/Drink slot. */
test('REMAKE 새벽 회수 계약: 50% recovery of expiring Food/Drink, and +1 Food/Drink slot on the first generation',()=>{
 const g=fresh('dawn-recovery'),s=g.run;s.facilities=['dawnRecovery'];s.inventory=[];
 g.stock('rice',2,40);g.stock('rope',1,50);for(const st of s.inventory)st.expires=s.day+1;
 const money=s.money,waste=s.stats.waste;g.nightDiscard(); // v2.9.11: the Night of the last sale day, not the next morning
 assert.equal(s.money-money,40,'2 x 50% of 40G');assert.equal(s.daily.subsidy,40);
 assert.equal(s.daily.waste,1,'only the non-Food is waste');assert.equal(s.stats.waste-waste,1);assert.equal(s.daily.wasteCost,50);
 assert.equal(s.inventory.length,0,'all of it left the shelf');
 const h=fresh('dawn-offers'),t=h.run;t.facilities=[];t.event=null;h.generateOffers();const n=t.offers.length;
 for(let i=0;i<30;i++){t.facilities=['dawnRecovery'];h.generateOffers();assert.equal(t.offers.length,n+1,'one extra slot');
  assert.ok(Relics.food(DATA.itemBy[t.offers.at(-1).item]),'and it is Food/Drink');}
 t.phase='order';t.money=99999;h.reroll();assert.equal(t.offers.length,n,'a Reroll is not the first generation');
});

/* SA-Q16 / REL-Q-v28-9. The acquisition-time predicate named a retired `fresh` property, so it
   disagreed with the future-stock shelf path that has always keyed on Food/Drink. */
test('SA-Q16: buying 고급 식자재 유통 계약 extends no stock; 대형 냉장고 extends owned Food/Drink once, on category',()=>{
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
 assert.deepEqual(s.inventory.map(st=>st.expires),before,'고급 식자재 유통 계약 leaves every date alone');
 s.relicWindow={milestoneDay:10,slothSealOpportunity:false,candidateIds:['fridge'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('fridge');
 for(let i=0;i<s.inventory.length;i++){
  const st=s.inventory[i],it=DATA.itemBy[st.item];
  const eligible=['food','drink'].includes(it.category)&&before[i]!==null&&before[i]>s.day;
  assert.equal(s.inventory[i].expires-before[i],eligible?2:0,st.item+' takes 대형 냉장고 (+2) once');
 }
 assert.ok(!DATA.items.some(it=>'fresh' in it),'no Item carries the retired fresh property');
});

/* REL-Q-v28-5 / REL-Q-v28-7. Both commissions are a share of LIST price, so each is resolved
   through an actual accepted sale and read off the Day ledger rather than off the source. */
test('REL-Q-v28-5 / 7: HQ commission is 40% of list (supplyCert), 40% of the charged 150% price (royalCert), 15% of the price (고급 식자재)',()=>{
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
 assert.equal(sale(['supplyCert'],'full',insured),Math.round(insured.sell*.40),'supplyCert pays 40% of list (User 2026-10-04)');
 const fineFood=DATA.items.find(i=>['food','drink'].includes(i.category)&&i.rarity>=1),plainFood=DATA.items.find(i=>['food','drink'].includes(i.category)&&i.rarity===0);
 assert.equal(sale(['coldcase'],'full',fineFood),Math.round(fineFood.sell*.15),'고급 식자재 pays 15% of an Uncommon+ Food/Drink price');
 assert.equal(sale(['coldcase'],'full',plainFood),0,'and nothing on a Common one');
 assert.equal(sale([],'overcharge',plain),0,'no support, no commission');
 // neither inherited rate survives on the Gold path
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/it\.sell\*\.08/.test(src),'the inherited 8% supplyCert rate is gone');
 assert.ok(!/mode==='overcharge'&&it\.rarity>=2\)commission\+=Math\.round\(it\.sell\*\.12\)/.test(src),
  'and so is the inherited 12% royalCert rate');
});

/* RELIC §23 (v2.9.11, User 2026-09-29): the owner's 바가지 intent penalty -0.16 becomes -0.06, and the card takes 10% of
   overheadBase from the next Day - the 지역 거점점 계약 rule, added to it, never compounded. */
test('REL §23: 왕도 프리미엄 인증 - 바가지 intent +10%p and base operating cost +10%',()=>{
 const g=fresh('royal-intent'),s=g.run,n=s.npcs[0];
 n.traits=[];n.money=99999;n.loyalty=0;n.injury=0;n.pack=[];
 const it=DATA.items.find(i=>i.rarity===0&&i.category==='food');
 s.facilities=[];const without=g.interest(n,it,'overcharge').chance;
 s.facilities=['royalCert'];const owned=g.interest(n,it,'overcharge').chance;
 assert.ok(without>.08&&owned<.97,'sanity: neither reading is clamped');
 assert.ok(Math.abs(owned-without-.10)<1e-9,'the owner reads +0.10 on a 150% offer (was +0.16)');
 assert.equal(g.interest(n,it,'full').chance,(s.facilities=[],g.interest(n,it,'full').chance),'정가 is untouched');
 const base=g.overheadBase(15),cost=f=>g.expectedOperatingCost({day:15,facilities:f,event:null});
 assert.equal(cost(['royalCert']),Math.round(base*1.10/10)*10,'operating cost +10% of overheadBase');
 assert.equal(cost(['royalCert','hub']),Math.round(base*1.20/10)*10,'with 지역 거점점 계약: the two shares add');
 assert.equal(cost([]),Math.round(base/10)*10,'without it, unchanged');
});

/* RELIC §17 (v2.9.11, User 2026-09-29): at the 마왕성 each Food/Drink's +2 lands on the adventurer's most 취약 Hazard only;
   an ordinary Gate still takes +2 on every Hazard. */
test('REL §17: 원정 도시락 코너 - the 마왕성 takes the +2 on the most 취약 Hazard only',()=>{
 const g=fresh('meal-final'),n={...g.run.npcs[0],traits:[],injury:0,fatigue:0,pack:['rice','water']};
 const final={...DATA.dungeonBy.spider,family:'final',hazards:['poison','bind','cold','whiteout'],tier:2,day:30,scale:4.6,power:60,reward:2};
 const gate={...DATA.dungeonBy.snow,family:'snow',hazards:['cold','whiteout'],tier:2,day:20,scale:3,power:40,reward:1};
 const diff=(d)=>{const a=Dungeon.prepare(n,d,[]).effects,b=Dungeon.prepare(n,d,['expeditionMeal']).effects;
  return d.hazards.map(h=>(b[h]||0)-(a[h]||0));};
 const bare=Dungeon.prepare(n,final,[]),gaps=final.hazards.map(h=>Dungeon.hazardState(h,bare.effects,final).gap);
 const worst=gaps.indexOf(Math.max(...gaps)),fin=diff(final);
 assert.deepEqual(fin,final.hazards.map((h,i)=>i===worst?4:0),'two Food/Drink -> +4 on the largest gap, nothing elsewhere');
 assert.deepEqual(diff(gate),[4,4],'an ordinary Gate: +2 per Food/Drink on every Hazard, as before');
});

test('REL-Q-v28-2 / 4 / 6 / 8: the approved Store Support prices are in the catalogue',()=>{
 /* User-approved Store Support rebalance 2026-09-23; 즉석식품 200 · 추가발주권 190 with their move to 희귀 (User 2026-10-04) */
 for(const [id,price] of [['bulk',130],['rotation',80],['stamp',130],['member',130],['rareContract',140],
                          ['guarantee',140],['hazardBoard',60],['fieldRepair',80],['fridge',60],['kitchen',200],
                          ['board',110],['firstVisitCoupon',110],['groupOrder',200],['memberBundle',190],
                          ['premiumMember',200],['returnPoints',240],['expeditionMeal',200],['coldcase',180],
                          ['supplyCert',220],['dawnRecovery',190],['logisticsHQ',300],['lifetime',310],
                          ['royalCert',320],['opsRoom',290],['fresh24',360],['hub',340],
                          ['warehouse',130],['extraOrder',190],['rerollTicket',120],['efficiency',130],
                          ['fieldStretcher',80],['firstAidDesk',300]])
  assert.equal(DATA.relicBy[id].price,price,id+' price');
});

/* ---- User-approved Store Support rebalance 2026-09-23: structural reworks ------------------ */
/* One accepted sale on a stubbed stream, read off the ledger / wallet / history. */
function sellOnce(facilities,mode,itemId,{loyalty=0,history=[],money=99999,newToday}={}){
 const g=fresh('rework-sale'),s=g.run,n=s.npcs[0];
 s.facilities=[...facilities];s.dayFacilities=[...facilities];
 n.traits=[];n.money=money;n.introduced=true;n.visits=2;n.pack=[];n.refused=[];n.loyalty=loyalty;
 n.history=history.map(h=>({day:s.day,...h}));n.destination=0;n.claimedDestination=0;if(newToday!==undefined)n.newToday=newToday;
 s.queue=[n.id];s.cursor=0;s.phase='sell';s.daily.commission=0;
 g.stock(itemId,1);
 g.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
 const before={store:s.money,wallet:n.money};
 assert.equal(g.sell(s.inventory.at(-1).id,mode),true,itemId+' sale was accepted');
 return {g,s,n,store:s.money-before.store,paid:before.wallet-n.money,last:n.history.at(-1)};
}
test('REWORK 길드 보증 진열대: the CHARGED price must reach 200G, and HQ covers 30% of it',()=>{
 const g=fresh('guarantee-charged'),n=g.run.npcs[0];n.traits=[];n.money=9999;g.run.facilities=['guarantee'];
 const bar=DATA.itemBy.lunchbox,premium=DATA.itemBy.guildlunch;           // list 180 / 330
 const over=g.interest(n,bar,'overcharge');                          // charged 270 on a 180 list price
 assert.equal(over.price,270);assert.equal(over.guarantee,Math.round(270*.3),'a 150% sale over 200G is covered, 30% of charged');
 assert.equal(over.debit,270-81);
 assert.equal(g.interest(n,bar,'full').guarantee,0,'180G charged is under the threshold');
 // a 200G list price lands exactly on the threshold, which the >= check covers
 assert.equal(g.interest(n,{...bar,sell:200},'full').guarantee,Math.round(200*.3),'200G charged reaches the threshold (>=)');
 assert.equal(g.interest(n,premium,'half').guarantee,0,'a 200G+ list Item sold at 165G is not covered');
 assert.equal(g.interest(n,premium,'full').guarantee,Math.round(330*.3));
 const r=sellOnce(['guarantee'],'overcharge','lunchbox');
 assert.equal(r.store,270,'the store still receives the full charged price');assert.equal(r.paid,189,'the customer pays 70%');
 assert.equal(r.g.interest(r.n,bar,'overcharge').guarantee,0,'once per Day');
});
test('즉석식품 코너 takes overheadBase +10% (User 2026-10-02), added to hub\'s 10%, never compounded',()=>{
 const base=nightWith([]),kitchen=nightWith(['kitchen']),both=nightWith(['kitchen','hub']);
 const b=base.g.overheadBase(),charged=x=>Math.round((b+x)/10)*10;
 assert.equal(DATA.relicParams.kitchen.overheadRate,.10);
 assert.equal(kitchen.g.run.daily.operating,charged(b*.10),'kitchen takes 10% of the base');
 assert.equal(both.g.run.daily.operating,charged(b*.20),'with hub: 10% + 10% of the same base');
});
test('원정 도시락 코너: Food/Drink ORDER price x1.15 (User 2026-10-04), with 24시간 신선체계 x1.15 too; other Items untouched',()=>{
 const g=fresh('meal-price'),s=g.run;
 for(const id of ['rice','guildlunch','lowpotion','rope']){const it=DATA.itemBy[id],f=['food','drink'].includes(it.category);
  s.facilities=[];const plain=g.offerFor(it).price;s.facilities=['expeditionMeal'];
  assert.equal(g.offerFor(it).price,f?Math.round(it.buy*1.15):plain,id+' x1.15 only on Food/Drink');
  s.facilities=['expeditionMeal','fresh24'];assert.equal(g.offerFor(it).price,f?Math.round(it.buy*1.15*1.15):plain,id+' with 24시간 신선체계');}
 // acquisition reprices the Food/Drink offers already on the table, once
 s.facilities=[];s.phase='order';s.money=9999;s.offers=[{item:'rice',price:35,quantity:3},{item:'rope',price:50,quantity:3}];
 s.relicWindow={milestoneDay:5,slothSealOpportunity:false,candidateIds:['expeditionMeal'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('expeditionMeal');assert.deepEqual(s.offers.map(o=>o.price),[Math.round(35*1.15),50]);
});
test('REWORK 24시간 신선체계: Food/Drink ORDER price x1.15 (v2.9.11; was x1.25), no shelf life, no overhead',()=>{
 const g=fresh('fresh24'),s=g.run;s.facilities=['fresh24'];
 for(const id of ['rice','guildlunch','lowpotion','rope']){const it=DATA.itemBy[id];s.facilities=[];const plain=g.offerFor(it).price;s.facilities=['fresh24'];
  assert.equal(g.offerFor(it).price,['food','drink'].includes(it.category)?Math.round(it.buy*1.15):plain,id+' order price');}
 assert.equal(Relics.shelf(g,DATA.itemBy.rice),0,'no shelf-life effect');
 s.inventory=[];g.stock('rice',1);assert.equal(s.inventory[0].expires,s.day+DATA.itemBy.rice.days);
 assert.equal(nightWith(['fresh24']).g.run.daily.operating,nightWith([]).g.run.daily.operating,'no overhead');
 // acquisition reprices the Food/Drink offers already on the table, once
 s.facilities=[];s.phase='order';s.money=9999;s.offers=[{item:'rice',price:35,quantity:3},{item:'rope',price:50,quantity:3}];
 s.relicWindow={milestoneDay:5,slothSealOpportunity:false,candidateIds:['fresh24'],candidatePrices:[0],purchased:null,focusedRevealSeen:true,expiryDay:99};
 g.buyRelic('fresh24');assert.deepEqual(s.offers.map(o=>o.price),[Math.round(35*1.15),50]);
});
test('REWORK 고급 식자재 유통 계약 (User 2026-10-04): no purchase intent, no stat effect',()=>{
 const g=fresh('coldcase-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=0;n.injury=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 const delta=id=>{g.run.facilities=[];const a=g.interest(n,DATA.itemBy[id],'overcharge').chance;g.run.facilities=['coldcase'];return g.interest(n,DATA.itemBy[id],'overcharge').chance-a;};
 for(const id of ['energy','lunchbox','rice','rope'])assert.equal(delta(id),0,id+' intent untouched');
 const p={...n,pack:['guildlunch']},d=g.run.dungeons[0];
 assert.deepEqual(Dungeon.prepare(p,d,['coldcase']).effects,Dungeon.prepare(p,d,[]).effects,'no stat effect');
});
test('REWORK 단골 묶음혜택: a 단골 second paid purchase is half for the customer, full for the store',()=>{
 // premium sell 330
 const first=[{item:'rice',paid:70,mode:'full'}];
 const r=sellOnce(['memberBundle'],'full','guildlunch',{loyalty:60,history:first});
 assert.equal(r.store,330,'store receives the full charged price');
 assert.equal(r.paid,165,'the customer pays half');
 assert.equal(r.last.subsidy,165,'HQ pays the other half, recorded on the sale');
 for(const [why,opts] of [['not 단골',{loyalty:50,history:first}],['first purchase',{loyalty:60,history:[]}],
                          ['third purchase',{loyalty:60,history:[...first,...first]}]]){
  const x=sellOnce(['memberBundle'],'full','guildlunch',opts);assert.equal(x.paid,330,why+': full price');assert.equal(x.last.subsidy,0);}
 const g=fresh('bundle-judge'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=60;n.history=[{day:g.run.day,item:'rice',paid:70,mode:'full'}];
 g.run.facilities=['memberBundle'];const q=g.interest(n,DATA.itemBy.guildlunch,'overcharge');
 assert.equal(q.price,495);assert.equal(q.debit,248,'at 150% too, half of the charged price');
 g.run.facilities=[];assert.equal(g.interest(n,DATA.itemBy.guildlunch,'overcharge').debit,495);
});
test('REWORK 프리미엄 멤버십 (User 2026-10-04): a returning customer arrives with +25G, Rare+ intent +15%p, and a Rare+ purchase at 100% / 50% adds 단골도 +10',()=>{
 const arrive=(introduced,fac)=>{const g=fresh('premium-member'),s=g.run,n=s.npcs[0];n.traits=[];n.loyalty=0;n.introduced=introduced;n.money=100;s.facilities=fac;s.queue=[n.id];s.cursor=0;g.arrive();return n.money;};
 assert.equal(arrive(true,['premiumMember'])-arrive(true,[]),25,'다시 온 손님 +25G');
 assert.equal(arrive(false,['premiumMember'])-arrive(false,[]),0,'a first visit gets nothing');
 const g=fresh('premium-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.injury=0;n.loyalty=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 const it=DATA.items.find(i=>i.rarity>=2&&!['food','drink'].includes(i.category)&&!i.effects.fear);
 const delta=fresh=>{n.newToday=fresh;g.run.facilities=[];const a=g.interest(n,it,'overcharge').chance;g.run.facilities=['premiumMember'];return g.interest(n,it,'overcharge').chance-a;};
 assert.ok(Math.abs(delta(false)-.15)<1e-9,'다시 온 손님 +15%p');assert.equal(delta(true),0,'not on a first visit');
 const rare=it.id,gain=(fac,mode,newToday=false)=>sellOnce(fac,mode,rare,{loyalty:10,newToday}).last.loyalty;
 assert.equal(gain(['premiumMember'],'full')-gain([],'full'),10,'정가 Rare+ purchase +10');
 assert.equal(gain(['premiumMember'],'half')-gain([],'half'),10,'할인 Rare+ purchase +10');
 assert.equal(gain(['premiumMember'],'overcharge'),gain([],'overcharge'),'바가지 takes no bonus');
 assert.equal(gain(['premiumMember'],'full',true),gain([],'full',true),'a first visit takes none');
 assert.equal(sellOnce(['premiumMember'],'full','rice',{loyalty:10,newToday:false}).last.loyalty,sellOnce([],'full','rice',{loyalty:10,newToday:false}).last.loyalty,'a Common purchase takes none');
 assert.equal(gain(['premiumMember','stamp'],'full'),Math.round((1+10)*DATA.relicParams.stamp.loyaltyMult),'단골 스탬프 기계 multiplies it too');
});
test('REWORK 길드 납품 인증 / 왕도 프리미엄 인증: buyer +30G; 150% flat intent penalty eased by +10%p',()=>{
 const insured=DATA.items.find(i=>i.rarity>=2&&(i.effects.escape||i.effects.revive));
 const plain=sellOnce([],'full',insured.id),cert=sellOnce(['supplyCert'],'full',insured.id);
 assert.equal(cert.n.money-plain.n.money,30,'the buyer of a qualifying sale gets +30G');
 assert.equal(cert.s.daily.commission,Math.round(insured.sell*.40));
 const common=sellOnce(['supplyCert'],'full','rice');assert.equal(common.n.money,sellOnce([],'full','rice').n.money,'a non-qualifying sale gives nothing');
 // 왕도 프리미엄 인증: +10%p on 150% only; the price burden and the 바가지 Loyalty -4 stay
 const g=fresh('royal-intent'),n=g.run.npcs[0];n.traits=[];n.money=9999;n.loyalty=0;n.injury=0;
 g.run.dungeons=[{...g.makeDungeon('crypt',1),hazards:['fear']}];n.destination=0;n.claimedDestination=0;
 for(const id of ['rice','rope','guildlunch']){const it=DATA.itemBy[id];
  g.run.facilities=[];const a=g.interest(n,it,'overcharge'),f=g.interest(n,it,'full').chance;
  g.run.facilities=['royalCert'];const b=g.interest(n,it,'overcharge');
  assert.ok(Math.abs(b.chance-Math.min(.97,a.chance+.10))<1e-9,id+' 150% intent +10%p');assert.equal(b.price,a.price);assert.equal(b.debit,a.debit);
  assert.equal(g.interest(n,it,'full').chance,f,id+' 100% unchanged');}
 const r=sellOnce(['royalCert'],'overcharge','rice',{loyalty:10});assert.equal(r.last.loyalty,-4,'Loyalty -4 unchanged');
});

/* RELIC 33 · 34 · 35 and the retired 단골 묶음혜택 (User 2026-10-04) */
test('소문 수집 게시판: every Normal Event Day rolls an Event; window and 심층원정 Days stay quiet',()=>{
 const g=fresh('rumor'),s=g.run;s.facilities=['rumorBoard'];s.firstRun=false;
 const day=[...Array(30).keys()].find(d=>d>=3&&g.eventEligibleDay(d));s.day=day;
 let fired=0;for(let i=0;i<300;i++)if(g.rollEvent())fired++;assert.equal(fired,300,'an Event every eligible morning');
 s.day=10;assert.equal(g.rollEvent(),null,'none on a Store Support window Day');
 s.firstRun=true;assert.equal(g.eventEligibleDay(1),true,'the first Run DAY 1 opens too, as the card promises');
 s.facilities=[];assert.equal(g.eventEligibleDay(1),false,'without it the first Run DAY 1 stays quiet');
});
test('단골 추천 엽서함: a 단골 visit lifts every other visitor of the Day by 단골도 +5 at Night',()=>{
 const night=(fac,regLoyalty)=>{const g=fresh('postcard'),s=g.run;const [a,b,c]=s.npcs;
  for(const n of [a,b,c]){n.alive=true;n.introduced=true;n.history=[];n.pack=[];n.traits=[];n.recovery=0;n.destination=0;n.claimedDestination=0;n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};}
  g.rng={next:()=>.5,int:a=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
  a.loyalty=regLoyalty;b.loyalty=10;c.loyalty=20;s.queue=[a.id,b.id,c.id];s.cursor=3;s.phase='sell';s.facilities=fac;s.dayFacilities=fac;
  const before=[a,b,c].map(n=>n.loyalty);g.night();return [a,b,c].map((n,i)=>n.loyalty-before[i]);};
 const base=night([],60),card=night(['postcard'],60),none=night(['postcard'],40);
 assert.deepEqual(card.map((v,i)=>v-base[i]),[0,5,5],'the others +5, the 단골 itself nothing');
 assert.deepEqual(none,night([],40),'no 단골 that Day, no gain');
});
test('길드 구조대 계약: a Death that gets past the Items turns into 중상 on its own 30% roll',()=>{
 assert.equal(DATA.relicParams.rescueContract.chance,.30);
 const g=fresh('rescue'),base=g.run.npcs[0],copy=x=>JSON.parse(JSON.stringify(x));
 const weak={...copy(base),traits:[],injury:0,fatigue:0,pack:[],level:1,stats:{combat:1,survival:1,mobility:1,spirit:1},equipment:{...base.equipment,power:0}};
 const d={...g.makeDungeon('spider',3),hazards:['poison'],day:12,power:400};
 const zero=()=>{let k=0;return {next:()=>(k++,0),int:a=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0,count:()=>k};};
 const out=fac=>{const r=zero();const rep=Dungeon.resolve(copy(weak),d,r,fac,{firstRun:false,day:12});return {o:rep.outcome,draws:r.count(),why:rep.why};};
 const plain=out([]);assert.equal(plain.o,'사망','sanity: the fixture dies');
 const saved=out(['rescueContract']);assert.equal(saved.o,'중상','a roll under 30% carries the adventurer home in 중상');
 assert.ok(saved.why.includes('길드 구조대가 사망을 중상으로 바꿈'),'and the report says so');
 const keep=DATA.relicParams.rescueContract.chance;DATA.relicParams.rescueContract.chance=0;
 try{assert.equal(out(['rescueContract']).o,'사망','a roll at or over the chance stays 사망');}finally{DATA.relicParams.rescueContract.chance=keep;}
});
test('단골 묶음혜택 is retired: never offered in any window, still readable on an owned save',()=>{
 assert.deepEqual(DATA.relicRetired,['memberBundle']);
 const g=fresh('retired'),s=g.run;s.facilities=DATA.relics.map(r=>r.id).filter(x=>x!=='memberBundle'&&x!=='bulk'&&x!=='rotation');
 for(const day of [5,10,20]){s.day=day;s.relicWindow=null;g.relicWindow(day);assert.ok(!s.relicWindow.candidateIds.includes('memberBundle'),'D'+day+' never offers it');}
 assert.ok(DATA.relicBy.memberBundle.description,'an owned copy still reads its card');
});
console.log(count+' Relic effect groups passed');

/* v2.9.11 (User 2026-09-29): 희귀상품 입고 계약 no longer raises the price the customer sees. A Rare+ sale is charged at
   the ordinary price and HQ pays the store 10% of the charged price on top (it was a +10% the customer paid, 2026-09-24). */
test('희귀상품 입고 계약: Rare+ sale at the ordinary price, HQ pays +10% of it',()=>{
 const g=fresh('showcase-price'),n=g.run.npcs[0];n.traits=[];n.money=9999;
 const rare=DATA.items.find(i=>i.rarity>=2),common=DATA.items.find(i=>i.rarity===0);
 const q=(it,mode,fac)=>{g.run.facilities=fac;return g.interest(n,it,mode);};
 for(const mode of ['half','full','overcharge']){
  const plain=q(rare,mode,[]),lifted=q(rare,mode,['rareContract']);
  assert.equal(lifted.price,plain.price,mode+': the customer is charged the ordinary price');
  assert.equal(lifted.chance,plain.chance,mode+': and judges it the same');}
 const r=sellOnce(['rareContract'],'full',rare.id);
 assert.equal(r.paid,rare.sell,'the customer pays list');
 assert.equal(r.s.daily.commission,Math.round(rare.sell*.10),'HQ pays 10% of the charged price');
 const c=sellOnce(['rareContract'],'full',common.id);
 assert.equal(c.s.daily.commission||0,0,'below Rare nothing is paid');
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
 const plain=Dungeon.prepare(n,s.dungeons[0],[]).effects,fr=Dungeon.prepare(n,s.dungeons[0],['fieldRepair']).effects;
 assert.equal(fr.mobility,plain.mobility,'야전 정비대 does not multiply a pressed Stat');
 const withRope={...n,pack:['rope']};
 assert.ok(Dungeon.prepare(withRope,s.dungeons[0],['fieldRepair']).effects.bind>Dungeon.prepare(withRope,s.dungeons[0],[]).effects.bind,'it multiplies a direct Counter');
 // SALE acceptance floor reads 관련 준비
 s.phase='sell';s.queue=[n.id];const cust=s.npcs[0];cust.money=9999;cust.destination=0;cust.claimedDestination=0;cust.traits=[];
 /* v2.9.2 (User 2026-09-25): the final 정가 chance carries x 0.90, the 관련 준비 floor included; 50% keeps the bare floor. */
 assert.ok(Math.abs(g.interest(cust,coffee,'full').chance-.97*.90)<1e-9,'a 기동 Drink for a 속박 Gate takes the 관련 준비 floor');
 assert.equal(g.interest(cust,coffee,'half').chance,.97,'and 50% keeps the bare floor');
 assert.ok(g.interest(cust,rice,'full').chance<.97*.90,'an unrelated Item does not');
 assert.equal(DATA.balance.accessibleNeed,.72,'ECONOMY_ORDER: base need 0.72');
});

test('RELIC §QUICK VIEW STATUS LINE (User 2026-09-24, v2.9.0): the runtime truth, COPY_AUDIT §11-32 exact',()=>{
 const g=fresh('status'),s=g.run;s.facilities=['rotation','logisticsHQ','guarantee','groupOrder','rerollTicket','bulk','memberBundle','fieldRepair'];
 s.previousSales=3;assert.equal(Relics.status(g,'rotation'),'전날 판매 3건 · 오늘 미적용');s.previousSales=4;assert.equal(Relics.status(g,'rotation'),'전날 판매 4건 · 오늘 적용 중');
 assert.equal(Relics.status(g,'logisticsHQ'),'전날 판매 4건 · 오늘 매입가 -12%');s.previousSales=12;assert.equal(Relics.status(g,'logisticsHQ'),'전날 판매 12건 · 오늘 매입가 -30%');s.previousSales=0;assert.equal(Relics.status(g,'logisticsHQ'),'전날 판매 0건 · 오늘 미적용');s.previousSales=6;
 s.guaranteeUsed=false;assert.equal(Relics.status(g,'guarantee'),'오늘 지원 1회 남음');s.guaranteeUsed=true;assert.equal(Relics.status(g,'guarantee'),'오늘 지원 사용함');
 s.daily.sales=2;assert.equal(Relics.status(g,'groupOrder'),'오늘 판매 2건 · 5번째부터 +15G');s.daily.sales=4;assert.equal(Relics.status(g,'groupOrder'),'오늘 판매 4건 · 판매마다 +15G 지급 중');
 s.rerollCount=0;assert.equal(Relics.status(g,'rerollTicket'),'오늘 무료 교환 남음');s.rerollCount=1;assert.equal(Relics.status(g,'rerollTicket'),'오늘 무료 교환 사용함');
 s.phase='sell';assert.equal(Relics.status(g,'bulk'),'','묶음발주 계약 speaks only at ORDER');
 s.phase='order';g.generateOffers();s.cart={};assert.equal(Relics.status(g,'bulk'),'지금 발주에서 적용 없음');s.cart={0:3};assert.equal(Relics.status(g,'bulk'),'지금 발주에서 1종 적용');
 assert.equal(Relics.status(g,'memberBundle'),'','단골 묶음혜택 speaks only at SALE');
 s.phase='sell';const n=s.npcs[0];s.queue=[n.id];s.cursor=0;n.loyalty=10;n.history=[];assert.equal(Relics.status(g,'memberBundle'),n.name+' · 단골 아님');
 n.loyalty=60;n.history=[{day:s.day,paid:50}];assert.equal(Relics.status(g,'memberBundle'),n.name+' · 단골 · 오늘 유료 구매 1건');
 assert.equal(Relics.status(g,'fieldRepair'),'','an always-on support carries no line');
 assert.equal(Relics.status(g,'lifetime'),'','평생 단골제 has no daily use state to read');
});
