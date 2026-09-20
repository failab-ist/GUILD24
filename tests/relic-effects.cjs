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
  s.cart={0:3};s.facilities=['rotation'];s.previousSales=6;assert.equal(g.cartTotal(),base,'rotation does not discount cart total');
  for(const [id,threshold]of [['logisticsHQ',7]]){s.facilities=[id];s.cart={0:3};s.previousSales=threshold-1;assert.equal(g.cartTotal(),base);s.previousSales=threshold;assert.ok(g.cartTotal()<base);s.bulkUsed=true;assert.equal(g.cartTotal(),base);s.bulkUsed=false;}
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
 const raw={showcase:10,hub:base.g.overheadBase()*DATA.balance.hubOverheadRate,efficiency:-30};
 const charged=x=>Math.round((base.g.overheadBase()+x)/10)*10;
 for(const [id,modifier] of Object.entries(raw)){
  assert.equal(nightWith([id]).g.run.daily.operating-base.g.run.daily.operating,
   charged(modifier)-charged(0),id+' day overhead');
 }
 assert.equal(raw.hub,base.g.overheadBase()*0.10,'hub is 10% of the overhead base, the approved rate');
});
test('D30 excludes throughput Relics whose condition cannot be met anymore',()=>{
 for(let i=0;i<100;i++){const g=fresh('final-offer-'+i);g.run.previousSales=0;g.relicWindow(30);assert.ok(g.run.relicWindow.candidateIds.every(id=>!['stamp','member','guarantee','fridge','board','rookieBoard','groupFlyer','memberBundle','premiumMember','returnPoints','supplyCert','lifetime','royalCert','hub','efficiency'].includes(id)));}
});
console.log(count+' Relic effect groups passed');
