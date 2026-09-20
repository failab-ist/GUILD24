// Chunk C acceptance: Order reroll, Relic window state, taxonomy boundary and Tier forecast.
// Covers REL-Q24/Q33/Q38/Q39/Q40, ORD-Q04-Q12, ECO-Q02.
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const copy=x=>JSON.parse(JSON.stringify(x));
function fresh(seed='relic-order'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}

test('ORD-Q08: base Full-offer Reroll doubles within the Day and resets the next morning',()=>{
 const g=fresh();g.beginOrder();g.run.facilities=[];
 const base=DATA.balance.rerollBase;
 for(const price of [base,base*2,base*4,base*8]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
 g.run.day++;g.morning();g.beginOrder();g.run.facilities=[];
 assert.equal(g.rerollPrice(),base,'next Day resets the cost');
});

test('REL-Q24/ORD-Q12: 발주 교환권 makes the first Reroll free and consumes its step',()=>{
 const g=fresh('reroll-relic');g.beginOrder();g.run.facilities=['delivery'];
 const base=DATA.balance.rerollBase;
 for(const price of [0,base*2,base*4,base*8]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
 g.run.day++;g.morning();g.beginOrder();g.run.facilities=['delivery'];
 assert.equal(g.rerollPrice(),0,'next Day restores the free first Reroll');
});

test('ORD-Q06/Q07: Reroll regenerates every slot, keeps legality and never advances pity',()=>{
 const g=fresh('reroll-pity');g.beginOrder();g.run.facilities=[];
 const pity=copy(g.run.pity);
 for(let i=0;i<3;i++){
  g.reroll();
  assert.deepEqual(g.run.pity,pity,'Reroll does not advance or farm pity');
  assert.equal(g.run.offers.length>=6,true,'the whole offer list is regenerated');
  for(const o of g.run.offers){const it=DATA.itemBy[o.item];assert.ok(it,'offer is a real Item');assert.ok(!it.unlock||g.account.unlocked.includes(it.unlock),'unlock rules preserved');}
 }
});

test('REL-Q38: a milestone window is revealed once and reload cannot replay or reroll it',()=>{
 const g=fresh('reveal');
 assert.equal(g.run.relicWindow.milestoneDay,0);
 assert.equal(g.run.relicWindow.focusedRevealSeen,true,'D0 is the start flow, not an extra reveal');
 while(g.run.day<5){g.beginOrder();g.finishOrder();while(g.run.phase==='sell')g.depart();g.finishNight();g.closeDay();}
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
 g.run.facilities=['fridge','terminal'];
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

test('REL-Q33: 냉장 쇼케이스 targets Uncommon+ Food/Drink, not a one-SKU Rare pool',()=>{
 const g=fresh('coldcase');g.run.facilities=['coldcase'];
 const eligible=DATA.items.filter(it=>['food','drink'].includes(it.category)&&it.rarity>=1);
 assert.ok(eligible.length>=4,'multi-SKU pool, got '+eligible.length);
 for(const it of eligible)assert.ok(Relics.offerWeight(g,it)>1,it.id+' should be favoured');
 for(const it of DATA.items.filter(i=>['food','drink'].includes(i.category)&&i.rarity===0))assert.equal(Relics.offerWeight(g,it),1,it.id+' common Food/Drink is not favoured');
 assert.ok(Relics.shelf(g,DATA.itemBy.lava)>0,'shelf-life relief reaches Uncommon Food');
});

// REL-Q77. The filter named the v2.5 `medicine` / `tool` categories, which v2.7 does not have,
// so the category clause matched nothing and the Relic reached only the two Items whose effects
// happen to carry escape/revive. Both halves of the Relic - the offer weighting and the +1 supply
// quantity - are checked against the exact Canonical target set.
test('REL-Q77: 긴급보급 선반 targets exactly Potion / Field Gear / Insurance',()=>{
 const g=fresh('expedition-shelf');
 const target=DATA.items.filter(it=>['potion','gear','insurance'].includes(it.category));
 const outside=DATA.items.filter(it=>!['potion','gear','insurance'].includes(it.category));
 assert.ok(target.length>=15&&outside.length>=15,'both sides of the filter are real pools');
 for(const cat of ['potion','gear','insurance'])
  assert.ok(target.some(it=>it.category===cat),'the target pool includes '+cat);
 for(const it of target)assert.equal(Relics.field(it),true,it.id+' ('+it.category+') is a shelf target');
 for(const it of outside)assert.equal(Relics.field(it),false,it.id+' ('+it.category+') is not');
 // no stale category name survives anywhere in the filter's source
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/relics.js'),'utf8');
 for(const stale of ['medicine\',\'tool','\'fresh\''])assert.ok(!src.includes(stale),'no stale category '+stale);
 // half one: the offer weighting favours every target and nothing else
 g.run.facilities=[];
 const base=Object.fromEntries(DATA.items.map(it=>[it.id,Relics.offerWeight(g,it)]));
 g.run.facilities=['medicine'];
 for(const it of target)assert.ok(Relics.offerWeight(g,it)>base[it.id],it.id+' is weighted up');
 for(const it of outside)assert.equal(Relics.offerWeight(g,it),base[it.id],it.id+' is not');
 // half two: supply quantity +1, on the same RNG draw, for a target and not for an outsider
 for(const [it,delta] of [[DATA.itemBy.potion,1],[DATA.itemBy.boots,1],[DATA.itemBy.stone,1],[DATA.itemBy.rice,0]]){
  g.run.facilities=[];const state=g.rng.state,plain=g.offerFor(it).quantity;
  g.run.facilities=['medicine'];g.rng=new RNG(g.run.seed,state);
  assert.equal(g.offerFor(it).quantity,plain+delta,it.id+' supply quantity');
 }
});

test('RELIC 17: 원정 도시락 코너 boosts only a matching need',()=>{
 const g=fresh('meal'),n={...g.run.npcs[0],traits:[],pack:['lava']};
 const cold={...g.makeDungeon('snow',2),requiredSupply:0},spider={...g.makeDungeon('spider',2),requiredSupply:0};
 const coldPlain=Dungeon.prepare(n,cold).effects.cold,coldMeal=Dungeon.prepare(n,cold,['expeditionMeal']).effects.cold;
 assert.ok(coldMeal>coldPlain,'matching Hazard Counter is strengthened');
 const offPlain=Dungeon.prepare(n,spider).effects.cold,offMeal=Dungeon.prepare(n,spider,['expeditionMeal']).effects.cold;
 assert.equal(offMeal,offPlain,'unmatched Hazard Counter is untouched');
 /* RELIC_v2.7: the Supply-Burden half raises the POSITIVE NATIVE Core Stat of a Food/Drink
    that supplies >0, and says "Supply itself unchanged". The v2.6 reading, where the condition
    boosted Supply, is superseded. */
 const stat=(gate,fac)=>Dungeon.prepare(n,gate,fac).itemStats.find(x=>x.item==='lava').stats.survival;
 const noBurden=stat(spider,['expeditionMeal']),burden=stat({...spider,requiredSupply:3},['expeditionMeal']);
 assert.ok(Math.abs(burden/noBurden-1.20)<1e-9,'an active Supply Burden adds +20% to the native Stat pool');
 assert.equal(stat(spider,[]),noBurden,'and without the Burden the Relic adds nothing here');
 assert.equal(Dungeon.prepare(n,{...spider,requiredSupply:3},['expeditionMeal']).effects.supply,
              Dungeon.prepare(n,{...spider,requiredSupply:3},[]).effects.supply,'Supply itself is unchanged');
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
 // the owner's own worked examples, to the digit
 const cases=[
  [food.id,[],['kitchen','fresh24'],1.80],
  [food.id,['eater'],['kitchen','fresh24'],2.10],
  [food.id,['eater'],['kitchen','fresh24','expeditionMeal'],2.30],
  [food.id,['small'],['kitchen','fresh24','expeditionMeal'],1.80],
  [drink.id,[],['kitchen','fresh24','expeditionMeal'],2.00],
  [drink.id,['eater'],['kitchen','fresh24','expeditionMeal'],2.00],
 ];
 for(const [id,traits,fac,want] of cases)
  assert.ok(Math.abs(contribution(id,traits,fac).survival/base(id)-want)<1e-9,
   id+' '+JSON.stringify(traits)+' '+JSON.stringify(fac)+' is base x'+want);
 // sequential multiplication would give 1.3 x 1.3 x 1.5 = 2.535, which is what this rules out
 assert.ok(Math.abs(contribution(food.id,['eater'],['kitchen','fresh24']).survival/base(food.id)-1.3*1.3*1.5)>1e-6,
  'the layers are summed, never multiplied one after another');
 // and the pool is the POSITIVE NATIVE Core Stat only
 assert.equal(Dungeon.prepare({...bare,traits:['eater'],pack:[food.id]},gate,['kitchen','fresh24','expeditionMeal']).effects.supply,
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
  assert.ok(common[i]<common[i-1],'Common falls every band');
 }
 assert.ok(epic[4]>=epic[3]*2,'D20-24 is where Epic becomes a normal consideration');
 assert.ok(epic[0]>0,'and early Epic is possible, just rare');
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
 for(const it of epics)assert.equal(it.metaUnlock??null,it.id==='tree'?null:null,it.name+' needs no unlock of its own');
});

console.log(count+' relic/order groups passed');
