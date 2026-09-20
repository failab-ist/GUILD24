const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const copy=x=>JSON.parse(JSON.stringify(x));
function fresh(seed='delta'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
test('five persisted phases, no morning skip and atomic order to sale',()=>{const g=fresh();assert.equal(g.run.phase,'morning');g.open();assert.equal(g.run.phase,'morning');assert.throws(()=>g.setQuantity(0,1));g.beginOrder();g.setQuantity(0,1);g.finishOrder();assert.equal(g.run.phase,'sell');while(g.run.phase==='sell')g.depart();g.closeDay();assert.equal(g.run.day,1);g.finishNight();assert.equal(g.run.phase,'closing');g.save();const save=Save.import(Save.export(g.account,g.run));assert.equal(save.run.phase,'closing');g.closeDay();assert.equal(g.run.phase,'morning');});
test('same stats and traits produce same preparation and purchase for all six jobs',()=>{const g=fresh(),n={...g.run.npcs[0],injury:1,money:9999,traits:[],pack:['midpotion','ramen']},d={...g.run.dungeons[0],tags:['undead'],hazards:['fear','dark']};const base=Dungeon.prepare(n,d,['kitchen']);const intent=g.interest(n,DATA.itemBy.midpotion);for(const job of DATA.jobs){const other={...n,job:job.id};assert.deepEqual(Dungeon.prepare(other,d,['kitchen']),base);assert.deepEqual(g.interest(other,DATA.itemBy.midpotion),intent);}});
test('ordinary items additive; no pair, threshold or order bonus',()=>{const g=fresh(),n={...g.run.npcs[0],traits:[],pack:[]},d=g.run.dungeons[0],prep=pack=>Dungeon.prepare({...n,pack},d).effects;const bare=prep([]);for(const a of DATA.items.filter(i=>i.id!=='coupon'))for(const b of DATA.items.filter(i=>i.id!=='coupon')){const x=prep([a.id]),y=prep([b.id]),both=prep([a.id,b.id]);assert.deepEqual(both,prep([b.id,a.id]));for(const k of Object.keys(both)){assert.ok(Math.abs(both[k]-(x[k]||0)-(y[k]||0)+(bare[k]||0))<1e-8,a.id+'+'+b.id+':'+k);}}assert.equal(prep(['lava','water']).thirst,undefined,'thirst is not a canonical system');assert.equal(prep(['coffee','energy']).fatigue,undefined,'no caffeine stacking or item fatigue chain');assert.equal(prep(['rice','water']).supply,DATA.itemBy.rice.effects.supply+DATA.itemBy.water.effects.supply,'Supply is plainly additive');});
test('food traits/relics enhance nutrition without amplifying counters or side effects',()=>{const g=fresh(),n={...g.run.npcs[0],traits:[],pack:['lava']},d=g.run.dungeons[0],base=Dungeon.prepare(n,d).effects,boost=Dungeon.prepare({...n,traits:['eater']},d,['kitchen','fresh24']).effects;assert.equal(boost.cold,base.cold,'Hazard Counter is not amplified');assert.equal(boost.combat,base.combat,'unrelated Stat is not amplified');assert.equal(boost.thirst,undefined,'no legacy thirst key survives');
 /* ITEM_v2.7 / RELIC_v2.7: the pool is the POSITIVE NATIVE Core Stat and nothing else. The
    Fresh Relics say Supply unchanged, so the only thing that may move Supply here is the
    Trait's own foodSupplyDelta - the v2.6 reading, where 즉석식품 코너 and 24시간 신선체계 also
    multiplied Supply, is superseded. */
 const itemSurvival=(traits,fac)=>Dungeon.prepare({...n,traits},d,fac).itemStats.find(x=>x.item==='lava').stats.survival;
 const bare=itemSurvival([],[]);
 assert.equal(bare,DATA.itemBy.lava.effects.survival,'the pool reads the Item table base');
 assert.ok(Math.abs(itemSurvival(['eater'],['kitchen','fresh24'])/bare-2.5)<1e-9,'대식가 +30% and the two Fresh Relics add to base x2.50');
 assert.ok(Math.abs(itemSurvival([],['kitchen','fresh24'])/bare-2.2)<1e-9,'the two Fresh Relics alone are base x2.20');
 assert.ok(Math.abs(itemSurvival(['small'],['kitchen','fresh24'])/bare-2.0)<1e-9,'소식가 -20% subtracts from the same pool');
 const relicsOnly=Dungeon.prepare(n,d,['kitchen','fresh24']).effects;
 assert.equal(relicsOnly.supply,base.supply,'the Fresh Relics leave Supply exactly as the Item table wrote it');
 assert.equal(boost.supply,base.supply+DATA.traitBy.eater.effects.foodSupplyDelta,'only the Trait moves Supply');
 assert.equal(relicsOnly.cold,base.cold,'and they leave the Hazard Counter alone too');});
test('fatigue persists as an NPC condition; no active Item alters it',()=>{const g=fresh(),base={...copy(g.run.npcs[0]),fatigue:10,traits:[],pack:[]},d=g.run.dungeons[0],a=copy(base),b={...copy(base),pack:['water']};Dungeon.resolve(a,d,new RNG('fatigue'));Dungeon.resolve(b,d,new RNG('fatigue'));/* DUNGEON_HAZARD v2.7 §FATIGUE OUTCOME BASELINE: 부상 is +6, not the superseded v2.6.1 +4. */assert.equal(a.fatigue,16);assert.ok(b.fatigue < a.fatigue, 'supply from water reduces fatigue');const rb=b.records[b.records.length-1];assert.equal(rb.preRecovery,2,'leftover Supply removes departure Fatigue 1:1');assert.equal(rb.remainingSupplyBuffer,0,'Supply spent on preRecovery cannot also buffer the result');assert.equal(rb.finalFatigue,rb.fatigueBeforeExpedition+rb.actualOutcomeFatigueGain,'final Fatigue is departure Fatigue plus the actual gain');});
test('family identity, distinct stat routes and exact shared next-day weights',()=>{const g=fresh();assert.equal(DATA.items.length,40);assert.equal(DATA.relics.length,30);assert.ok(DATA.familyTiers.snow[1].includes('whiteout'));assert.deepEqual(DATA.familyTiers.fire[2],['fire']);assert.deepEqual(DATA.familyTiers.slime[2],['corrosion','mire']);assert.ok(DATA.dungeonBy.crypt.tags.includes('undead'));for(let day=1;day<30;day++){const w=Dungeon.tierWeights(day);assert.ok(Math.abs(w.reduce((a,b)=>a+b,0)-1)<1e-8);assert.ok(w.every(x=>x>=0));g.run.day=day;for(const id of ['spider','slime','fire','crypt','snow']){const d=g.makeDungeon(id);assert.ok(w[d.tier-1]>0);assert.ok(d.tier===1?d.requiredSupply===0:d.requiredSupply===0||d.requiredSupply===(d.tier===2?3:5),'Supply Burden: T1 never, T2 req 3, T3 req 5');assert.ok(!d.hazards.some(h=>['fatigue','long','undead','wet','armor','slow','thirst','supply'].includes(h)));}}assert.notDeepEqual(Dungeon.tierWeights(13),Dungeon.tierWeights(18));assert.deepEqual(Dungeon.tierWeights(30),[0,0,0]);const state=g.rng.state;Dungeon.tierWeights(20);assert.equal(g.rng.state,state);});
test('reroll escalating cost, first free relic, stable pity and reload',()=>{const g=fresh();g.beginOrder();g.run.facilities=[];const pity=copy(g.run.pity);for(const price of [DATA.balance.rerollBase,DATA.balance.rerollBase*2,DATA.balance.rerollBase*4]){assert.equal(g.rerollPrice(),price);const before=g.run.money;g.reroll(0);assert.equal(before-g.run.money,price);assert.deepEqual(g.run.pity,pity);}g.save();let r=Save.import(Save.export(g.account,g.run)),restored=new Game(r.account,r.run);assert.equal(restored.rerollPrice(),DATA.balance.rerollBase*8);g.run.day++;g.morning();g.beginOrder();g.run.facilities=['delivery'];assert.equal(g.rerollPrice(),0);g.reroll();assert.equal(g.rerollPrice(),DATA.balance.rerollBase*2,'free use consumes the first step');});
test('trait direction and conflicts, greed+frugal permitted, max four traits',()=>{assert.equal(DATA.traitBy.frugal.name,'구두쇠');assert.ok(DATA.traitExclusions.some(p=>p.includes('frugal')&&p.includes('impulse')));assert.ok(!DATA.traitExclusions.some(p=>p.includes('greed')&&p.includes('frugal')));for(let i=0;i<100;i++){const g=fresh('traits-'+i);for(const n of g.run.npcs){Adventurer.grow(n,10000,g.rng);assert.ok(n.traits.length<=4);for(const pair of DATA.traitExclusions)assert.ok(!pair.every(t=>n.traits.includes(t)));}}for(const t of DATA.traits)assert.ok(['positive','mixed','negative'].includes(t.direction),t.id+' internal direction');assert.equal(DATA.traitDirections,undefined,'player-facing trait quality labels are gone');});
test('rare player destination intervention is once, manual and before trade',()=>{const g=fresh();g.beginOrder();g.run.dungeons=[g.makeDungeon('spider'),g.makeDungeon('snow')];g.open();const n=g.current();n.destination=0;n.claimedDestination=0;g.run.special={kind:'route',used:false};g.specialAction(n.id,1);assert.equal(n.destination,1);assert.equal(n.claimedDestination,1);assert.throws(()=>g.specialAction(n.id,0));g.run.special={kind:'route',used:false};n.pack=['water'];assert.throws(()=>g.specialAction(n.id,0));});
test('rare trait events use explicit eligible choices and persist',()=>{const g=fresh(),n=g.run.npcs[0];n.introduced=true;n.traits=['frugal'];g.run.special={kind:'remove',used:false};g.specialAction(n.id,'frugal');assert.deepEqual(n.traits,[]);g.run.special={kind:'mentor',used:false,candidates:['genius']};assert.throws(()=>g.specialAction(n.id,'strong'));g.specialAction(n.id,'genius');assert.deepEqual(n.traits,['genius']);g.save();assert.ok(Save.valid(JSON.parse(Save.export(g.account,g.run))));});
test('insurance/potion hierarchy and all effects have honest presentation',()=>{/* ITEM_v2.7 §POTION LINE: the ladder is 투력, not the old 강인함, and it is four tiers deep.
   Each tier is raw Power only - no Supply, no Counter, no Insurance. */
const ladder=['potion','midpotion','highpotion','toppotion'].map(id=>DATA.itemBy[id]);
for(let i=1;i<ladder.length;i++)assert.ok(ladder[i].effects.combat>ladder[i-1].effects.combat,
 ladder[i].name+' sits above '+ladder[i-1].name+' on 투력');
for(const it of ladder){assert.equal(it.category,'potion');
 assert.ok(!it.effects.supply&&!it.effects.injuryGuard,it.name+' is raw Power only');}
assert.ok(DATA.itemBy.heat.effects.cold>DATA.itemBy.lava.effects.cold);assert.equal(DATA.itemBy.tree.category,'insurance');assert.equal(DATA.itemBy.tree.rarity,3);assert.equal(DATA.itemBy.midpotion.effects.jobBonus,undefined);for(const it of DATA.items){assert.ok(DATA.categories[it.category]);assert.ok(it.roles.length);for(const key of Object.keys(it.effects))assert.ok(Presentation.rows(it.effects).some(r=>r.key===key));}});
test('canonical full-offer reroll replaces every slot, preserves pity and legality',()=>{const g=fresh();g.beginOrder();g.run.facilities=['expeditionCert'];const before=g.run.offers.slice(),pity=copy(g.run.pity),gold=g.run.money;g.reroll();assert.equal(g.run.offers.length,before.length);assert.ok(g.run.offers.every(o=>!before.includes(o)));assert.deepEqual(g.run.pity,pity);assert.equal(gold-g.run.money,DATA.balance.rerollBase);assert.ok(g.run.offers.some(o=>Relics.counter(DATA.itemBy[o.item],Relics.known(g))));assert.ok(g.run.offers.every(o=>!DATA.itemBy[o.item].unlock||g.account.unlocked.includes(DATA.itemBy[o.item].unlock)));g.setQuantity(0,1);g.reroll();assert.equal(Object.keys(g.run.cart||{}).length,0);});
test('returning summary uses actual recorded changes without modifying NPC',()=>{const g=fresh(),n=g.run.npcs[0];n.introduced=true;n.newToday=false;n.injury=0;n.recovery=0;n.records=[{day:2,outcome:'부상',injury:1,recovery:2,changes:['Lv.2 → Lv.3'],events:[{text:'핫팩이 냉기 대응에 도움이 됐다.'}]}];const before=copy(n),r=Presentation.returning(n);assert.equal(r.day,2);assert.ok(r.changes.includes('부상 회복'));assert.ok(r.changes.includes('휴식 종료'));assert.deepEqual(n,before);n.newToday=true;assert.equal(Presentation.returning(n),null);});
test('DUNGEON_HAZARD_v2.7 §NEXT-DAY GATE FORECAST: how many, never which',()=>{
 const g=fresh('gate-forecast');
 /* The forecast and the generator read ONE rule, so there is no forecast-only RNG path. The
    distribution is checked against what the generator actually produces, not against a second
    copy of the bands written here. */
 for(let day=1;day<=29;day++){
  g.run.day=day-1;
  const f=g.gateForecast();
  assert.equal(f.day,day);
  const rule=Dungeon.gateCountRule(day);
  assert.deepEqual(f.counts.map(c=>c.count),rule,'D'+day+' forecasts exactly the rule\'s counts');
  assert.equal(f.fixed,rule.length===1?rule[0]:null,'a single-count band is confirmed, a drawn one is not');
  assert.ok(Math.abs(f.counts.reduce((a,c)=>a+c.percent,0)-100)<0.11,'the distribution sums to 100%');
 }
 g.run.day=29;assert.equal(g.gateForecast().final,true,'D30 is the Final, not a Gate count');
 g.run.day=30;assert.equal(g.gateForecast(),null,'and there is no day after it');
 // the generator really does land inside its own forecast, every Day, over many seeds
 for(let seed=0;seed<25;seed++){
  const h=fresh('gen-'+seed);
  for(let day=1;day<=29;day++){
   h.run.day=day-1;
   const f=h.gateForecast();
   h.run.day=day;h.morning();
   const base=h.run.dungeons.filter(d=>!d.temporary).length;
   assert.ok(f.counts.some(c=>c.count===base),
    'D'+day+' generated '+base+' base Gates, which the forecast allowed');
   if(f.fixed!==null)assert.equal(base,f.fixed,'a confirmed count is actually confirmed');
  }
 }
 // it says how many and how dangerous, never what
 g.run.day=5;
 const line=JSON.stringify(g.gateForecast());
 for(const fam of ['spider','slime','fire','crypt','snow'])
  assert.ok(!line.includes(fam),'no Family is revealed');
 for(const hz of Object.keys(DATA.hazards))assert.ok(!line.includes(hz),'no Hazard is revealed');
 // and a reload does not reroll it independently of the actual next Day
 const h=fresh('forecast-reload');
 h.run.day=12;
 const before=JSON.stringify(h.gateForecast());
 h.save();const r=Save.import(Save.export(h.account,h.run));
 const resumed=new Game(r.account,r.run);resumed.autosave=false;
 assert.equal(JSON.stringify(resumed.gateForecast()),before,'the forecast survives a reload unchanged');
});

console.log(count+' DELTA groups passed');
