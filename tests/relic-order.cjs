// Chunk C acceptance: Order reroll, Relic window state, taxonomy boundary and Tier forecast.
// Covers REL-Q24/Q33/Q38/Q39/Q40, ORD-Q04-Q12, ECO-Q02.
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const copy=x=>JSON.parse(JSON.stringify(x));
function fresh(seed='relic-order'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}

test('ORD-Q08: base Full-offer Reroll follows the 30/60/120/240 curve and resets daily',()=>{
 const g=fresh();g.beginOrder();g.run.facilities=[];
 for(const price of [30,60,120,240]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
 g.run.day++;g.morning();g.beginOrder();g.run.facilities=[];
 assert.equal(g.rerollPrice(),30,'next Day resets the cost');
});

test('REL-Q24/ORD-Q12: 발주 교환권 makes the first Reroll free and consumes its step',()=>{
 const g=fresh('reroll-relic');g.beginOrder();g.run.facilities=['delivery'];
 for(const price of [0,60,120,240]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll();assert.equal(before-g.run.money,price);}
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

test('RELIC 17: 원정 도시락 코너 boosts only a matching need',()=>{
 const g=fresh('meal'),n={...g.run.npcs[0],traits:[],pack:['lava']};
 const cold={...g.makeDungeon('snow',2),requiredSupply:0},spider={...g.makeDungeon('spider',2),requiredSupply:0};
 const coldPlain=Dungeon.prepare(n,cold).effects.cold,coldMeal=Dungeon.prepare(n,cold,['expeditionMeal']).effects.cold;
 assert.ok(coldMeal>coldPlain,'matching Hazard Counter is strengthened');
 const offPlain=Dungeon.prepare(n,spider).effects.cold,offMeal=Dungeon.prepare(n,spider,['expeditionMeal']).effects.cold;
 assert.equal(offMeal,offPlain,'unmatched Hazard Counter is untouched');
 const noBurden=Dungeon.prepare(n,spider,['expeditionMeal']).effects.supply;
 const burden=Dungeon.prepare(n,{...spider,requiredSupply:3},['expeditionMeal']).effects.supply;
 assert.ok(burden>noBurden,'Supply is boosted only while a Supply Burden is active');
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
 const st=s.inventory.at(-1),before=s.money;
 s.phase='morning';g.liquidate(st.id);
 assert.equal(s.money-before,Math.round(DATA.itemBy.ramen.buy*.5),'liquidation uses Math.round');
 const src=fs.readFileSync(__dirname+'/../dist/systems/run.js','utf8');
 assert.ok(!/Math\.floor\([^)]*buy/.test(src),'no floor rule survives on a Gold path');
});

console.log(count+' relic/order groups passed');
