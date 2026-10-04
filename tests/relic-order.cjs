// Chunk C acceptance: Order reroll, Relic window state, taxonomy boundary and Tier forecast.
// Covers REL-Q24/Q33/Q38/Q39/Q40, ORD-Q04-Q12, ECO-Q02.
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const copy=x=>JSON.parse(JSON.stringify(x));
function fresh(seed='relic-order'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}

test('ORD-Q08: base Full-offer Reroll doubles within the Day and resets the next morning',()=>{
 const g=fresh();g.beginOrder();g.run.facilities=[];g.run.money=5000;
 const base=DATA.balance.rerollBase;
 for(const price of [base,base*2,base*4,base*8]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
 g.run.day++;g.morning();g.beginOrder();g.run.facilities=[];
 assert.equal(g.rerollPrice(),base,'next Day resets the cost');
});

test('REL-Q24/ORD-Q12: 발주 교환권 makes the first Reroll free, then the ordinary curve from its first step',()=>{
 const g=fresh('reroll-relic');g.beginOrder();g.run.facilities=['rerollTicket'];g.run.money=5000;
 const base=DATA.balance.rerollBase;
 for(const price of [0,base,base*2,base*4,base*8]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
 g.run.day++;g.morning();g.beginOrder();g.run.facilities=['rerollTicket'];
 assert.equal(g.rerollPrice(),0,'next Day restores the free first Reroll');
});

/* User 2026-10-02: a Reroll is a drawn sheet for the Known-Hazard Counter pity (ECONOMY_ORDER); Rare pity still ignores it */
test('ORD-Q06/Q07: Reroll regenerates every slot, keeps legality and never advances Rare pity',()=>{
 const g=fresh('reroll-pity');g.beginOrder();g.run.facilities=[];g.run.money=5000;
 const pity=copy(g.run.pity);
 for(let i=0;i<3;i++){
  g.reroll();
  assert.equal(g.run.pity.rare,pity.rare,'Reroll does not advance or farm Rare pity');
  assert.equal(g.run.offers.length>=6,true,'the whole offer list is regenerated');
  for(const o of g.run.offers){const it=DATA.itemBy[o.item];assert.ok(it,'offer is a real Item');assert.ok(!it.unlock||g.account.unlocked.includes(it.unlock),'unlock rules preserved');}
 }
});

test('REL-Q38: a milestone window is revealed once and reload cannot replay or reroll it',()=>{
 const g=fresh('reveal');
 assert.equal(g.run.relicWindow.milestoneDay,0);
 assert.equal(g.run.relicWindow.focusedRevealSeen,true,'D0 is the start flow, not an extra reveal');
 while(g.run.day<5){g.run.money=5000;g.beginOrder();g.finishOrder();while(g.run.phase==='sell')g.depart();g.finishNight();g.closeDay();}
 const w=g.run.relicWindow;
 assert.equal(w.milestoneDay,5);
 assert.equal(w.focusedRevealSeen,false,'a new milestone window starts unrevealed');
 w.focusedRevealSeen=true;g.save();
 const round=Save.import(Save.export(g.account,g.run));
 assert.equal(round.run.relicWindow.focusedRevealSeen,true,'the reveal flag survives save/load');
 assert.deepEqual(round.run.relicWindow.candidateIds,w.candidateIds,'reload does not reroll candidates');
 assert.deepEqual(round.run.relicWindow.candidatePrices,w.candidatePrices,'reload does not reroll prices');
 const broken=copy(round);broken.run.relicWindow.focusedRevealSeen='yes';
 assert.throws(()=>Save.import(JSON.stringify(broken)),'reveal state is validated');
});

test('REL-Q39: internal taxonomy never reaches a player-facing render path',()=>{
 const ui=fs.readFileSync(__dirname+'/../dist/ui/app.js','utf8');
 assert.ok(!ui.includes('buildNames'),'Build Axis names are not rendered');
 for(const label of ['기반','복합','핵심 ',"'보조'"])assert.ok(!ui.includes("kind"+"]")||!ui.includes(label),'kind labels are not rendered');
 assert.ok(!/foundation:'기반'/.test(ui),'Foundation/Hybrid/Keystone/Utility labels are gone');
 assert.ok(DATA.buildNames&&Object.keys(DATA.buildNames).length===6,'the taxonomy still exists internally for balance work');
 assert.deepEqual([...new Set(DATA.relics.map(r=>r.kind))].sort(),['foundation','hybrid','keystone','utility']);
});

test('REL-Q40: owned Relic quick view is read-only name/effect data',()=>{
 const g=fresh('quickview');
 g.run.facilities=['fridge','extraOrder'];
 const owned=g.ownedRelics();
 assert.equal(owned.length,2);
 for(const r of owned){
  assert.deepEqual(Object.keys(r).sort(),['description','id','name'],'no internal taxonomy leaks through the quick view');
  assert.ok(r.description.length);
 }
 // Sale must not permit a purchase; the window itself stays closed to buying there.
 g.run.phase='sell';assert.equal(g.canBuyRelic(),false,'no Relic purchase during Sale');
 g.run.phase='night';assert.equal(g.canBuyRelic(),false,'no Relic purchase during Night');
});

test('REL-Q33: 고급 식자재 유통 계약 targets Uncommon+ Food/Drink, not a one-SKU Rare pool',()=>{
 const g=fresh('coldcase');
 const eligible=DATA.items.filter(it=>['food','drink'].includes(it.category)&&it.rarity>=1);
 assert.ok(eligible.length>=4,'multi-SKU pool, got '+eligible.length);
 // the extra first-sheet slot draws from that pool across Days (User 2026-10-04: no weighting, no shelf life)
 const seen=new Set();g.run.facilities=['coldcase'];
 for(let i=0;i<40;i++){g.generateOffers(true);const it=DATA.itemBy[g.run.offers.at(-1).item];assert.ok(['food','drink'].includes(it.category)&&it.rarity>=1,it.id);seen.add(it.id);}
 assert.ok(seen.size>=2,'more than one SKU reaches the slot: '+[...seen]);
 for(const it of DATA.items)assert.equal(Relics.offerWeight(g,it),Relics.offerWeight({...g,has:id=>false},it),it.id+' weight untouched');
 assert.equal(Relics.shelf(g,DATA.itemBy.dragonramen),0,'no shelf-life effect');
});

// REL-Q77 kept only as the category helper check: Relics.field() still names Potion / Field Gear /
// Insurance directly with no stale v2.5 category. The Store Support that used it (긴급보급 선반)
// was remade into 야전 정비대 on 2026-09-23, tested below.
test('REL-Q77: the field-category helper names exactly Potion / Field Gear / Insurance',()=>{
 const target=DATA.items.filter(it=>['potion','gear','insurance'].includes(it.category));
 const outside=DATA.items.filter(it=>!['potion','gear','insurance'].includes(it.category));
 for(const it of target)assert.equal(Relics.field(it),true,it.id+' ('+it.category+')');
 for(const it of outside)assert.equal(Relics.field(it),false,it.id+' ('+it.category+')');
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/relics.js'),'utf8');
 for(const stale of ['medicine\',\'tool','\'fresh\''])assert.ok(!src.includes(stale),'no stale category '+stale);
});

/* 2026-09-23 remake: 야전 정비대 - the Hazard Counter values of Field Gear the adventurer carries
   x1.40. It no longer weights offers or adds supply quantity. */
/* User 2026-10-02: every Item's Counter, Food and Drink too */
test('REMAKE 야전 정비대: Hazard Counter values x1.40 in any category, nothing else',()=>{
 const g=fresh('field-maint'),n={...g.run.npcs[0],traits:[]};
 const gate={...g.makeDungeon('spider',2),requiredSupply:0};                 // poison + bind
 for(const [id,h] of [['rope','bind'],['antidote','poison']]){
  const it=DATA.itemBy[id],p={...n,pack:[id]};
  const plain=Dungeon.prepare(p,gate).effects[h],with_=Dungeon.prepare(p,gate,['fieldRepair']).effects[h];
  assert.ok(it.effects[h]>0,id+' carries a '+h+' Counter');
  assert.ok(Math.abs((with_-plain)-it.effects[h]*.40)<1e-9,id+' '+h+' Counter +40%');
 }
 const food={...n,pack:['ramen']},cold={...g.makeDungeon('snow',1),requiredSupply:0};
 {const a=Dungeon.prepare(food,cold).effects,b=Dungeon.prepare(food,cold,['fieldRepair']).effects;
  assert.ok(Math.abs((b.cold-a.cold)-DATA.itemBy.ramen.effects.cold*.40)<1e-9,'a Food Counter (컵라면 냉기) +40% too');
  for(const k of ['combat','survival','mobility','spirit'])assert.equal(b[k],a[k],k+' unchanged');}
 {const drink={...n,pack:['ice']},fire={...g.makeDungeon('golem',1),requiredSupply:0};
  assert.ok(Math.abs(Dungeon.prepare(drink,fire,['fieldRepair']).effects.fire-Dungeon.prepare(drink,fire).effects.fire-DATA.itemBy.ice.effects.fire*.40)<1e-9,'a Drink Counter (얼음컵 화염) +40% too');}
 // no offer weight, no quantity
 for(const it of DATA.items){g.run.facilities=[];const w=Relics.offerWeight(g,it);g.run.facilities=['fieldRepair'];assert.equal(Relics.offerWeight(g,it),w,it.id+' weight');}
 for(const it of [DATA.itemBy.lowpotion,DATA.itemBy.boots]){g.run.facilities=[];const st=g.rng.state,q=g.offerFor(it).quantity;g.run.facilities=['fieldRepair'];g.rng=new RNG(g.run.seed,st);assert.equal(g.offerFor(it).quantity,q);}
});

test('RELIC 17: 원정 도시락 코너 gives +2 on every destination Hazard per Food/Drink, and no Supply (User 2026-10-04)',()=>{
 const g=fresh('meal'),n={...g.run.npcs[0],traits:[],pack:['dragonramen']};
 const cold={...g.makeDungeon('snow',2),requiredSupply:3},spider={...g.makeDungeon('spider',2),requiredSupply:0};
 for(const gate of [cold,spider]){
  const plain=Dungeon.prepare(n,gate),meal=Dungeon.prepare(n,gate,['expeditionMeal']);
  for(const h of gate.hazards)assert.equal((meal.effects[h]||0)-(plain.effects[h]||0),2,gate.family+' '+h+' +2');
  assert.equal(meal.effects.supply,plain.effects.supply,'no Supply (피로 회복) bonus');
  const off=['poison','fire','cold','corrosion','bind','mire','fear','dark','whiteout'].filter(h=>!gate.hazards.includes(h));
  for(const h of off)assert.equal(meal.effects[h]||0,plain.effects[h]||0,h+' is not a Hazard of this Gate and is untouched');
  assert.deepEqual(meal.itemStats,plain.itemStats,'no native Core-Stat bonus remains');
 }
 // a Drink alone -> the same +2 Hazard defence; a Food and a Drink -> +4; a non-Food Item -> nothing
 const drink={...n,pack:['water']};
 for(const h of cold.hazards)assert.equal(Dungeon.prepare(drink,cold,['expeditionMeal']).effects[h]-(Dungeon.prepare(drink,cold).effects[h]||0),2,h+' +2 for a Drink');
 const two={...n,pack:['dragonramen','water']};
 for(const h of cold.hazards)assert.equal(Dungeon.prepare(two,cold,['expeditionMeal']).effects[h]-(Dungeon.prepare(two,cold).effects[h]||0),4,h+' +4 for two');
 const gear={...n,pack:['rope']};
 assert.deepEqual(Dungeon.prepare(gear,cold,['expeditionMeal']).effects,Dungeon.prepare(gear,cold).effects,'a non-Food/Drink Item takes nothing');
});

test('ORD-Q09/Q10/Q11: next-day Tier forecast is exact and exposes nothing else',()=>{
 const g=fresh('forecast');
 for(let day=1;day<29;day++){
  g.run.day=day;const f=g.tierForecast();
  assert.equal(f.day,day+1);
  assert.deepEqual(f.weights,Dungeon.tierWeights(day+1),'forecast equals the actual generation weights');
  assert.deepEqual(Object.keys(f).sort(),['day','percent','weights'],'no Family / Gate / visitor information is exposed');
  assert.ok(Math.abs(f.percent.reduce((a,b)=>a+b,0)-100)<.5);
 }
 g.run.day=29;assert.equal(g.tierForecast(),null,'D30 has no normal Tier progression to forecast');
 g.run.day=30;assert.equal(g.tierForecast(),null);
});

test('ECO-Q02: one rounding rule across every Gold path',()=>{
 const g=fresh('rounding');const s=g.run;
 g.stock('ramen',1); // buy 45 -> liquidation must round, not floor
 const st=s.inventory.at(-1);
 /* 재고 정리 is a Closing rescue now, so the rounding is checked where the rule allows it. */
 s.phase='morning';assert.equal(g.liquidate(st.id),false,'no cashing out outside a short Closing');
 s.phase='closing';assert.equal(g.liquidate(st.id),false,'and not while the till is square');
 s.money=-10;const before=s.money;
 assert.equal(g.liquidate(st.id),true);
 assert.equal(s.money-before,Math.round(st.cost*.5),'liquidation uses Math.round');
 assert.equal(st.cost,DATA.itemBy.ramen.buy,'and it is what that stock cost, not the catalog price');
 const src=fs.readFileSync(__dirname+'/../dist/systems/run.js','utf8');
 assert.ok(!/Math\.floor\([^)]*buy/.test(src),'no floor rule survives on a Gold path');
});

/* Sloth reuses the Relic window's whole lifecycle rather than adding a choice path of its
   own (REL-Q42/43/44). These drive that reuse; the difficulty numbers behind it are PASS3
   and unset, so nothing here approves a value. */
function slothRun(seed){const g=new Game();g.autosave=false;g.start(seed);
 g.run.bossId='SLOTH';g.run.slothDays=[15,20];g.run.sealBreakCount=0;
 g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}

test('REL-Q42: a SLOTH Run gets exactly three opportunities, two of D15/D20/D25 plus D30, and never D10',()=>{
 const seen=new Set();
 for(let i=0;i<300&&seen.size<7;i++){const g=new Game();g.autosave=false;g.start('sched-'+i);
  seen.add(g.run.bossId);
  if(g.run.bossId!=='SLOTH')continue;
  const days=g.run.slothDays;
  assert.equal(days.length,2);
  assert.ok(days.every(d=>[15,20,25].includes(d)),'drawn from D15/D20/D25 only');
  const opportunities=[0,5,10,15,20,25,30].filter(d=>g.isSealOpportunity(d));
  assert.deepEqual(opportunities,[...days,30].sort((a,b)=>a-b),'three opportunities, and D30 is always one');
  assert.ok(!g.isSealOpportunity(10),'D10 is never an opportunity');
  assert.ok(!g.isSealOpportunity(5),'and neither is D5');
 }
 // a Run facing anyone else is offered none of it
 for(let i=0;i<40;i++){const g=new Game();g.autosave=false;g.start('nosloth-'+i);
  if(g.run.bossId==='SLOTH')continue;
  for(const d of [0,5,10,15,20,25,30])assert.equal(g.isSealOpportunity(d),false,'no seal on a '+g.run.bossId+' Run');
 }
});

test('REL-Q43: one window yields at most one of [Relic, Seal Break], and reload cannot take both',()=>{
 const g=slothRun('excl');
 g.run.day=15;g.morning();
 const w=g.run.relicWindow;
 assert.equal(w.milestoneDay,15);
 assert.ok(w.slothSealOpportunity,'D15 is an opportunity for this Run');
 assert.ok(g.canBuyRelic()&&g.canBreakSeal(),'both branches are open before either is taken');
 const gold=g.run.money;
 g.breakSeal();
 assert.equal(g.run.money,gold,'breaking a seal costs no Gold');
 assert.equal(g.run.sealBreakCount,1);
 assert.equal(g.canBuyRelic(),false,'the window has no acquisition left');
 assert.equal(g.canBreakSeal(),false,'and the seal cannot be broken twice from one window');
 assert.throws(()=>g.buyRelic(w.candidateIds[0]),'the Relic is refused outright');
 const back=Save.import(Save.export(g.account,g.run));
 assert.equal(back.run.sealBreakCount,1,'the commitment persists');
 assert.equal(back.run.relicWindow.consumedBySealBreak,true,'and so does what it consumed');
 const h=new Game(back.account,back.run);h.autosave=false;
 assert.equal(h.canBuyRelic(),false,'reloading does not hand the Relic back');
 // the reverse order is just as exclusive
 const g2=slothRun('excl2');g2.run.day=15;g2.morning();
 g2.buyRelic(g2.run.relicWindow.candidateIds[0]);
 assert.equal(g2.canBreakSeal(),false,'taking the Relic spends the same one acquisition');
 assert.throws(()=>g2.breakSeal());
});

test('REL-Q44: deferring stays ordinary, and an unspent opportunity awards nothing',()=>{
 const g=slothRun('defer');
 g.run.day=15;g.morning();
 assert.ok(g.canBreakSeal(),'the opportunity is open');
 g.run.day=20;g.morning();            // walked past D15 without committing either branch
 assert.equal(g.run.sealBreakCount,0,'no seal is awarded for letting it lapse');
 assert.ok(g.run.relicWindow.slothSealOpportunity,'D20 is the next opportunity');
 assert.equal(g.run.relicWindow.consumedBySealBreak,undefined,'the fresh window is unspent');
 // D30 is always the last one, and the count cannot pass three
 g.run.sealBreakCount=3;g.run.day=30;g.morning();
 assert.ok(g.run.relicWindow.slothSealOpportunity,'D30 is an opportunity');
 assert.equal(g.canBreakSeal(),false,'but there is no fourth seal to break');
});

test('a Save that claims both a Relic and a Seal Break from one window is refused',()=>{
 const g=slothRun('tamper');g.run.day=15;g.morning();
 g.breakSeal();
 const bad=JSON.parse(Save.export(g.account,g.run));
 bad.run.relicWindow.purchased=bad.run.relicWindow.candidateIds[0];
 assert.equal(Save.valid(bad),false,'one window cannot have produced both');
});

test('ITEM_v2.7 / RELIC_v2.7: Trait affinity and the Fresh Relics are ONE base-additive pool',()=>{
 const g=fresh('native-pool');
 const bare={...g.run.npcs[0],traits:[],pack:[]};
 const gate={...g.makeDungeon('spider',2),requiredSupply:3,hazards:['bind']};
 const contribution=(id,traits,fac)=>{
  const p=Dungeon.prepare({...bare,traits,pack:[id]},gate,fac);
  return p.itemStats.find(x=>x.item===id)?.stats||{};
 };
 const food=DATA.items.find(i=>i.category==='food'&&i.effects.supply>0&&i.effects.survival>0);
 const drink=DATA.items.find(i=>i.category==='drink'&&i.effects.supply>0&&i.effects.survival>0);
 const base=id=>DATA.itemBy[id].effects.survival;
 // the owner's own worked examples, to the digit (즉석식품 코너 +25%, 24시간 신선체계 +50%)
 const cases=[
  [food.id,[],['kitchen','fresh24'],1.75],
  [food.id,['eater'],['kitchen','fresh24'],2.05],
  // 원정 도시락 코너 no longer joins the native pool (2026-09-23 rework)
  [food.id,['eater'],['kitchen','fresh24','expeditionMeal'],2.05],
  [food.id,['small'],['kitchen','fresh24','expeditionMeal'],1.55],
  [drink.id,[],['kitchen','fresh24','expeditionMeal'],1.75],
  [drink.id,['eater'],['kitchen','fresh24','expeditionMeal'],1.75],
 ];
 for(const [id,traits,fac,want] of cases)
  assert.ok(Math.abs(contribution(id,traits,fac).survival/base(id)-want)<1e-9,
   id+' '+JSON.stringify(traits)+' '+JSON.stringify(fac)+' is base x'+want);
 // sequential multiplication would give 1.3 x 1.25 x 1.5 = 2.4375, which is what this rules out
 assert.ok(Math.abs(contribution(food.id,['eater'],['kitchen','fresh24']).survival/base(food.id)-1.3*1.25*1.5)>1e-6,
  'the layers are summed, never multiplied one after another');
 // and the pool is the POSITIVE NATIVE Core Stat only
 assert.equal(Dungeon.prepare({...bare,traits:['eater'],pack:[food.id]},gate,['kitchen','fresh24']).effects.supply,
              Dungeon.prepare({...bare,traits:['eater'],pack:[food.id]},gate,[]).effects.supply,
              'no Fresh Relic touches Supply');
 const counterFood=DATA.items.find(i=>['food','drink'].includes(i.category)&&gate.hazards.some(h=>(i.effects[h]||0)>0));
 if(counterFood){
  const h=gate.hazards.find(x=>(counterFood.effects[x]||0)>0);
  const withAll=Dungeon.prepare({...bare,traits:['eater'],pack:[counterFood.id]},gate,['kitchen','fresh24']).effects[h];
  const plain=Dungeon.prepare({...bare,traits:[],pack:[counterFood.id]},gate,[]).effects[h];
  assert.equal(withAll,plain,'no Trait or Fresh Relic amplifies a Hazard Counter');
 }
 // a negative native Stat is not in the pool either
 const penalty=DATA.items.find(i=>['food','drink'].includes(i.category)&&['combat','survival','mobility','spirit'].some(k=>(i.effects[k]||0)<0));
 if(penalty){
  const k=['combat','survival','mobility','spirit'].find(x=>(penalty.effects[x]||0)<0);
  assert.equal(contribution(penalty.id,['eater'],['kitchen','fresh24'])[k],penalty.effects[k],
   'a harmful native Stat is not amplified by the pool');
 }
});

/* User 2026-10-02: one sheet holds an Item on at most two slots - Day sheets, Rerolls and the Counter guarantee alike */
test('ECONOMY_ORDER §ORDER OFFER VARIETY: an Item is on at most offerSameItemMax slots of a sheet',()=>{
 assert.equal(DATA.balance.offerSameItemMax,2,'the cap is 2');
 const g=fresh('offer-variety');
 for(const day of [1,3,6,15,29]){g.run.day=day;
  for(let i=0;i<600;i++){g.generateOffers({advancePity:i%2===0});const c={};for(const o of g.run.offers)c[o.item]=(c[o.item]||0)+1;
   assert.ok(Math.max(...Object.values(c))<=2,'D'+day+': no Item past two slots');}}
 const src=require('node:fs').readFileSync(require('node:path').join(__dirname,'..','dist/systems/shop.js'),'utf8');
 assert.ok(/const roomy=pool\.filter\(it=>\(s\.offers\|\|\[\]\)\.filter\(o=>o\.item===it\.id\)\.length<D\.balance\.offerSameItemMax\);if\(roomy\.length\)pool=roomy;/.test(src),'every rolled slot reads the sheet being built');
 assert.ok(/room=matches\.filter\(it=>others\.filter\(o=>o\.item===it\.id\)\.length<D\.balance\.offerSameItemMax\)/.test(src),'the Counter guarantee respects it');
});

test('ECONOMY_ORDER_v2.7 §ORDER RARITY PROGRESSION: the offer Rarity follows the Day band',()=>{
 const rows=DATA.rarityBands;
 assert.equal(rows.length,7,'seven Day bands');
 assert.deepEqual(rows.map(r=>r.maxDay),[3,7,12,19,24,29,30],'the exact band edges');
 for(const r of rows){
  assert.equal(r.weights.reduce((a,b)=>a+b,0),100,'D<='+r.maxDay+' sums to exactly 100%');
  assert.equal(r.weights[4],r.maxDay<=7?0:1,'Legendary is 0% early and exactly 1% after, never more');
 }
 // the shape the owner describes: Epic rises materially from D20, Common falls all the way
 const epic=rows.map(r=>r.weights[3]),common=rows.map(r=>r.weights[0]);
 for(let i=1;i<rows.length;i++){
  assert.ok(epic[i]>=epic[i-1],'Epic never falls as the Run goes on');
  if(rows[i].maxDay<=7)assert.equal(epic[i],0,'no Epic before D8');
  assert.ok(common[i]<common[i-1],'Common falls every band');
 }
 assert.ok(epic[4]>=epic[3]*2,'D20-24 is where Epic becomes a normal consideration');
 /* User 2026-10-02: D1-7 lean on Common with no Epic - a T1 Day's customer cannot pay for one; Epic starts rare at D8 */
 assert.deepEqual(rows[0].weights,[76,20,4,0,0],'D1-3');assert.deepEqual(rows[1].weights,[68,24,8,0,0],'D4-7');
 assert.equal(epic[0],0,'no Epic in D1-3');assert.ok(epic[2]>0,'Epic is possible, just rare, from D8');
 // the generator really draws from the current Day's band, and a Reroll does not escape it
 const g=fresh('rarity-band');
 const measure=(day,rolls)=>{
  g.run.day=day;g.run.pity.rare=0;
  const seen=[0,0,0,0,0];
  for(let i=0;i<rolls;i++){g.run.pity.rare=0;const o=g.rollOffer();seen[DATA.itemBy[o.item].rarity]++;}
  return seen.map(x=>x/rolls*100);
 };
 for(const [day,band] of [[2,0],[10,2],[22,4],[27,5]]){
  const want=DATA.rarityBands[band].weights,got=measure(day,4000);
  for(const v of [0,1,2,3]){
   if(want[v]===0){assert.equal(got[v],0,'D'+day+' rarity '+v+' is impossible');continue;}
   assert.ok(Math.abs(got[v]-want[v])<4,
    'D'+day+' rarity '+v+' drew '+got[v].toFixed(1)+'% against the band\'s '+want[v]+'%');
  }
 }
 // Reroll rolls the same band rather than bypassing Day progression
 const src=require('node:fs').readFileSync(require('node:path').join(__dirname,'..','dist/systems/shop.js'),'utf8');
 assert.ok(!/rates=\[55,27/.test(src),'the retired fixed all-Run table is gone');
 assert.ok(/D\.rarityBands\.find\(b=>s\.day<=b\.maxDay\)/.test(src),'the band is chosen by the CURRENT Day');
 assert.ok(/rollOffer\(/.test(src));
 const before=g.run.day;g.run.day=2;
 const rolled=[];for(let i=0;i<500;i++)rolled.push(DATA.itemBy[g.rollOffer().item].rarity);
 assert.ok(!rolled.some(r=>r===4),'a D1-3 Reroll cannot reach Legendary, which its band forbids');
 g.run.day=before;
 // the new Epics ride the ordinary Epic pool - no separate D20 hard unlock
 const epics=DATA.items.filter(i=>i.rarity===3);
 assert.ok(epics.length>=10);
 for(const it of epics)assert.equal(it.metaUnlock??null,it.id==='worldcharm'?null:null,it.name+' needs no unlock of its own');
});

/* User 2026-10-02: 원정 전문 인증 is remade as 원정 작전실 - no Counter multiplier, no next-visit Gold. Each of the Gate's Hazards
   answered past its Threat adds its overshoot (capped 0.5) to an average over all the Gate's Hazards, and 투력 gains 0.6 x that
   average (+30% at most), at the Final too - shown as one of 투력's sources, no other Stat touched. */
test('REMAKE 원정 작전실: overshoot averaged over the Gate\'s Hazards lifts 투력, +30% at most; no Counter multiplier',()=>{
 const g=fresh('ops-room'),n={...g.run.npcs[0],traits:[],injury:0,fatigue:0};
 const spider={...g.makeDungeon('spider',2),requiredSupply:0},snow={...g.makeDungeon('snow',1),requiredSupply:0};
 const prep=(pack,gate,fac)=>Dungeon.prepare({...n,pack},gate,fac);
 assert.equal(prep(['rope'],spider,['opsRoom']).effects.bind,prep(['rope'],spider,[]).effects.bind,'no Counter multiplier any more');
 for(const [pack,gate] of [[[],snow],[['ramen'],snow],[['spiderkit','spiderkit'],spider],[['rope'],spider]]){
  const p=prep(pack,gate,['opsRoom']),avg=p.hazards.reduce((v,h)=>v+Math.min(.5,Math.max(0,h.defense/h.threat-1)),0)/p.hazards.length;
  assert.ok(Math.abs(p.effects.opsBonus-.6*avg)<1e-12,'0.6 x the averaged, capped overshoot');
  assert.ok(p.effects.opsBonus<=.30+1e-12,'never past +30%');
  const plain=prep(pack,gate,[]);assert.equal(plain.effects.opsBonus,0,'nothing without the support');
  assert.ok(Math.abs(p.effects.combat-plain.effects.combat*(1+p.effects.opsBonus))<1e-9,'투력 scales');
  for(const k of ['survival','mobility','spirit'])assert.equal(p.effects[k],plain.effects[k],k+' untouched');
  const line=p.sources.combat.find(x=>x.name==='원정 작전실');
  if(p.effects.opsBonus>0)assert.ok(line&&line.isPct&&Math.abs(line.v-p.effects.opsBonus*100)<1e-9,'listed among 투력 sources');
  else assert.equal(line,undefined,'no empty source line');}
 assert.ok(prep(['spiderkit','spiderkit'],spider,['opsRoom']).effects.opsBonus>0,'a covered Gate actually lifts 투력');
 // an unanswered Hazard counts as 0 in the average: a second, uncovered Hazard halves the bonus of the same overshoot
 const one={...snow,hazards:['cold']},two={...snow,hazards:['cold','poison']};
 const big=prep(['dragonramen','dragonramen'],one,['opsRoom']).effects.opsBonus,half=prep(['dragonramen','dragonramen'],two,['opsRoom']).effects.opsBonus;
 assert.ok(big>0&&Math.abs(half-big/2)<1e-9,'the average runs over every Hazard of the Gate');
 // the Final reads it too, and the measured switch turns it off there only
 const fin={...g.makeFinal(),requiredSupply:0};const finP=prep(['spiderkit','spiderkit'],fin,['opsRoom']).effects.opsBonus;
 assert.ok(finP>=0);DATA.relicParams.opsRoom.final=false;assert.equal(prep(['spiderkit','spiderkit'],fin,['opsRoom']).effects.opsBonus,0);
 assert.ok(prep(['spiderkit','spiderkit'],spider,['opsRoom']).effects.opsBonus>=0);DATA.relicParams.opsRoom.final=true;
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/certGoldDay|nextVisitGold/.test(src),'the next-visit Gold is gone');
});

/* The pity Counter guarantee (ECONOMY_ORDER base pity) may never overwrite the Black Market row. */
test('SA-Q19 / 암시장: the pity Counter guarantee never overwrites the Black Market special offer',()=>{
 const ordinaryCount=g=>DATA.balance.orderOffers+(g.has('extraOrder')?2:0)+(g.wears('sponsorSign')?DATA.decorationParams.sponsorSign.extraOffers:0)+((g.run.event?.effects||{}).offers||0);
 for(let i=0;i<40;i++){
  const g=fresh('pity-blackmarket-'+i);g.run.facilities=[];g.run.dungeons=[{id:'fixture',hazards:['poison']}];
  g.run.event={id:'blackmarket',effects:{blackmarket:true}};
  g.run.pity={rare:0,npc:0,counter:5,hazards:{poison:5}};
  g.generateOffers();
  const n=ordinaryCount(g),special=g.run.offers[n],it=DATA.itemBy[special.item];
  assert.equal(g.run.offers.length,n+1);
  assert.ok(it.rarity>=2,'pity relief does not consume the Event row either');
  assert.equal(special.price,Math.round(it.buy*1.35));
 }
});

/* SA-Q19 / EVENT_v2.8 §암시장 상인. The mechanic added the row and threw its origin away, so the
   Player-facing row could not say where it came from. Provenance is deterministic state on the
   one Event-origin offer - not a source label derived for ordinary offers. */
test('SA-Q19: the Black Market row carries 암시장 provenance, and only that row does',()=>{
 const fsx=require('node:fs'),pathx=require('node:path');
 const app=fsx.readFileSync(pathx.resolve(__dirname,'../dist/ui/app.js'),'utf8');
 const shop=fsx.readFileSync(pathx.resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 const ordinaryCount=g=>DATA.balance.orderOffers+(g.has('extraOrder')?2:0)+(g.wears('sponsorSign')?DATA.decorationParams.sponsorSign.extraOffers:0)
  +((g.run.event?.effects||{}).offers||0);

 for(const facilities of [[],['extraOrder']]){
  for(let i=0;i<25;i++){
   const g=fresh('provenance-'+facilities.join('')+i);
   g.run.facilities=[...facilities];
   g.run.event={id:'blackmarket',effects:{blackmarket:true}};
   g.generateOffers();
   const n=ordinaryCount(g),offers=g.run.offers;
   // Task A mechanics are preserved, with the guarantee running alongside
   assert.equal(offers.length,n+1,'exactly one extra Event-origin slot');
   const special=offers[n],it=DATA.itemBy[special.item];
   assert.ok(it.rarity>=2,'the special offer is Rare+');
   assert.equal(special.price,Math.round(it.buy*1.35),'and carries the +35% buy price');
   // provenance is on that row and on no other
   assert.equal(special.origin,'blackmarket','the Event-origin row is labelled');
   assert.deepEqual(offers.slice(0,n).map(o=>o.origin),Array(n).fill(undefined),
    'no ordinary offer carries an origin');
   assert.equal(offers.filter(o=>o.origin).length,1,'exactly one row has provenance');
  }
 }
 // a Day with no Black Market has no provenance anywhere
 for(let i=0;i<20;i++){
  const g=fresh('no-blackmarket-'+i);g.run.facilities=[];g.run.event=null;g.generateOffers();
  assert.equal(g.run.offers.filter(o=>o.origin).length,0,'no Event, no source label');
 }
 // it survives the save round trip, so the row still reads 암시장 after a reload
 const k=fresh('provenance-save');
 k.run.event={id:'blackmarket',effects:{blackmarket:true}};k.generateOffers();
 const raw=Save.export(k.account,k.run);
 assert.ok(Save.valid(JSON.parse(raw)),'a run carrying provenance still validates');
 const back=Save.import(raw);
 assert.equal(back.run.offers.at(-1).origin,'blackmarket','provenance survives a reload');

 // the screen names the source from that state, and only for a row that has it
 assert.ok(/o\.origin==='blackmarket'\?'<i class="origin">암시장<\/i>':''/.test(app),
  'the row prints 암시장 from the offer provenance');
 const appCode=app.replace(/\/\*[\s\S]*?\*\//g,'');
 assert.equal((appCode.match(/암시장/g)||[]).length,1,'and there is no second source label in the screen');
 assert.ok(!/origin==='ordinary'|rarityOrigin|sourceLabel/.test(appCode),
  'nothing generalises this into attribution for ordinary offers');
 assert.ok(/origin:'blackmarket'/.test(shop),'the provenance is set where the Event row is created');
 assert.equal((shop.match(/origin:/g)||[]).length,1,'and nowhere else');
});

/* ECONOMY_ORDER §GOLDEN 1+1: exact economy buy 500 / sell 1000 (ITEM row 30: Special L, 500 / 1000). */
test('ECONOMY_ORDER §GOLDEN 1+1: 황금 1+1 쿠폰 buys at 500G and sells at 1000G',()=>{
 const it=DATA.itemBy.coupon;
 assert.equal(it.name,'황금 1+1 쿠폰');
 assert.equal(it.buy,500,'buy 500');
 assert.equal(it.sell,1000,'sell 1000');
 const g=fresh('golden');g.beginOrder();g.open();
 assert.equal(g.interest(g.current(),it,'full').price,1000,'정가 charges the 1000G list price');
});

/* ECONOMY_ORDER §SPECIAL ZERO-PRICE ACTION: Free/service is not a normal Sale Price Mode, Normal
   Sale exposes no implicit Free button, and no zero-price action may farm Loyalty. The current
   Canonical defines no explicit zero-price action, so the only modes are the three paid ones. */
test('ECONOMY_ORDER §SPECIAL ZERO-PRICE ACTION: no free mode, every sale is paid, no Loyalty for nothing',()=>{
 assert.deepEqual(Object.keys(DATA.pricing).sort(),['full','half','overcharge'],'only 바가지 / 정가 / 50% 할인');
 for(const [mode,rule] of Object.entries(DATA.pricing))
  for(const it of DATA.items)assert.ok(Math.round(it.sell*rule.mult)>0,mode+' '+it.id+' is never a zero price');
 const g=fresh('zero-price');g.beginOrder();g.open();
 const n=g.current(),before={loyalty:n.loyalty,money:g.run.money,inv:g.run.inventory.length,history:n.history.length};
 n.money=99999;
 for(const mode of ['free','service','zero'])
  assert.throws(()=>g.sell(g.run.inventory[0].id,mode),'no '+mode+' Price Mode exists');
 assert.deepEqual({loyalty:n.loyalty,money:g.run.money,inv:g.run.inventory.length,history:n.history.length},before,
  'a refused zero-price attempt moves no Loyalty, Gold or stock');
 const app=fs.readFileSync(__dirname+'/../dist/ui/app.js','utf8');
 assert.ok(!/data-action="sell"[^>]*data-mode="(free|service)"|['"]무료 (제공|증정)['"]/.test(app),'the Sale surface draws no Free button');
});

/* ECONOMY_ORDER §RELIC GOLD SINK + RELIC §KEY / §PRICE: D0 cost=0; D5+ currency=G, price =
   basePrice x a limited band (about +-15-20%), fixed for the window; buy<=1; maxOwned/run=7. */
/* RELIC §CANDIDATE REROLL (User 2026-10-02): from DAY 5 an open window redraws its three for 300G, doubling within the
   window and back to 300G on the next; never on DAY 0; the spend is Store Support investment and survives a reload. */
test('RELIC §GRADE (User 2026-10-04): 일반 17 · 희귀 10 · 영웅 7; DAY 0 offers 일반 only; D5+ cards roll 60 / 28 / 12',()=>{
 const offered=DATA.relics.filter(r=>!DATA.relicRetired.includes(r.id)),count=gr=>offered.filter(r=>r.grade===gr).length;
 assert.deepEqual([count('common'),count('rare'),count('epic')],[17,10,7]);
 assert.deepEqual(DATA.relicGradeChance,{common:.60,rare:.28,epic:.12});
 assert.deepEqual(DATA.relicGradeNames,{common:'일반',rare:'희귀',epic:'영웅'});
 for(let i=0;i<40;i++){const g=new Game();g.autosave=false;g.start('grade-d0-'+i);assert.ok(g.run.relicWindow.candidateIds.every(id=>DATA.relicBy[id].grade==='common'),'D0 is 일반 only');}
 const g=new Game();g.autosave=false;g.start('grade-share');const n={common:0,rare:0,epic:0};let cards=0;
 for(let i=0;i<1500;i++){g.run.facilities=[];g.run.relicWindow=null;g.relicWindow(5);for(const id of g.run.relicWindow.candidateIds){n[DATA.relicBy[id].grade]++;cards++;}}
 for(const [gr,want] of Object.entries(DATA.relicGradeChance))assert.ok(Math.abs(n[gr]/cards-want)<.03,gr+' share '+(n[gr]/cards).toFixed(3));
 // 영웅 can come from D5 (the retired Keystone-from-D10 rule is gone)
 assert.ok(n.epic>0,'영웅 on D5');
});
test('RELIC §CANDIDATE REROLL: 300G then 600G within a window, reset on the next, none on DAY 0',()=>{
 const g=new Game();g.autosave=false;g.start('relic-reroll');
 assert.equal(g.canRerollRelics(),false,'the DAY 0 free pick has no reroll');
 assert.throws(()=>g.rerollRelics());
 g.buyRelic(g.run.relicWindow.candidateIds[0]);
 g.run.day=5;g.morning();const w=g.run.relicWindow;g.run.money=2000;
 assert.equal(g.canRerollRelics(),true);assert.equal(g.relicRerollPrice(),300);
 const first=[...w.candidateIds],spent=g.run.stats.relicSpent||0;
 g.rerollRelics();
 assert.equal(g.run.money,1700,'the first reroll costs 300G');assert.equal(g.run.stats.relicSpent,spent+300,'counted as Store Support investment');
 assert.equal(w.candidateIds.length,3);assert.ok(w.candidateIds.every(id=>!first.includes(id)),'the three on the table are left out when the pool allows');
 assert.ok(w.candidateIds.every(id=>!DATA.relicRetired.includes(id)&&!g.run.facilities.includes(id)),'pool rules hold: nothing retired or owned');
 assert.ok(w.candidatePrices.every(p=>p>0),'redrawn cards are priced');
 assert.equal(g.relicRerollPrice(),600,'the second doubles');
 const back=Save.import(Save.export(g.account,g.run));assert.equal(back.run.relicWindow.rerolls,1,'a reload keeps the count');
 g.run.money=500;assert.throws(()=>g.rerollRelics(),'short of 600G');assert.equal(g.run.money,500);
 g.run.money=5000;g.buyRelic(w.candidateIds[0]);assert.equal(g.canRerollRelics(),false,'a spent window cannot reroll');
 g.run.day=10;g.morning();assert.equal(g.relicRerollPrice(),300,'the next window starts at 300G again');
});

test('ECONOMY_ORDER §RELIC GOLD SINK: D0 is free, every D5+ Store Support costs Gold and buying it spends it',()=>{
 const g=new Game();g.autosave=false;g.start('gold-sink');
 const w0=g.run.relicWindow;
 assert.deepEqual(w0.candidatePrices,[0,0,0],'D0 is free');
 const m0=g.run.money;g.buyRelic(w0.candidateIds[0]);assert.equal(g.run.money,m0,'and costs no Gold');
 for(const day of [5,10,15,20,25,30]){
  g.run.day=day;g.morning();
  const w=g.run.relicWindow;
  assert.equal(w.milestoneDay,day);
  w.candidateIds.forEach((id,i)=>{const base=DATA.relicBy[id].price,p=w.candidatePrices[i];
   assert.ok(p>0,'D'+day+' '+id+' costs Gold');
   assert.ok(p>=Math.floor(base*.8)&&p<=Math.ceil(base*1.2),'D'+day+' '+id+' '+p+'G stays within the limited band of '+base+'G');});
  g.run.money=10000;const spentBefore=g.run.stats.relicSpent||0;
  const id=w.candidateIds[0],price=w.candidatePrices[0];
  g.buyRelic(id);
  assert.equal(g.run.money,10000-price,'D'+day+': the purchase spends exactly the shown price');
  assert.equal(g.run.stats.relicSpent,spentBefore+price,'and is booked as Relic spend');
 }
 assert.equal(g.run.facilities.filter(id=>DATA.relicBy[id]).length,7,'seven windows, seven Store Supports');
 // maxOwned/run=7: an eighth is refused even when a window is open and the till can pay
 g.run.relicWindow={...g.run.relicWindow,purchased:null,candidateIds:[DATA.relics.find(r=>!g.run.facilities.includes(r.id)).id],candidatePrices:[1],expiryDay:99};
 g.run.money=10000;
 assert.equal(g.canBuyRelic(),false,'the eighth Store Support cannot be bought');
 const kept=g.run.facilities.pop();
 assert.equal(g.canBuyRelic(),true,'the same window is buyable at six owned, so the cap is what refuses it');
 g.run.facilities.push(kept);
 assert.throws(()=>g.buyRelic(g.run.relicWindow.candidateIds[0]),'and the purchase is refused');
});

console.log(count+' relic/order groups passed');
