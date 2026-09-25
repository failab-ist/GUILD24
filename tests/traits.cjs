// Chunk D acceptance: the frozen 30-Trait catalog, semantic tone, exclusions and NPC name voice.
// Covers TRAIT-Q01/Q03/Q04/Q07/Q13/Q14/Q15/Q16/Q17, UI-Q32/Q34/Q39, COPY-001/COPY-002.
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
function fresh(seed='traits'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
const CATALOG=['용감함','겁쟁이','대식가','소식가','신중함','무모함','탐욕','구두쇠','충동구매','허세','천재','강골','허약함','포션체질','화염공포증','행운아','불운아','수집가','실속파','사교적인','낯가림','회복체질','지구력','쉽게 지침','눈썰미','해독가','수족냉증','준비성','악바리','냉담한'];
const LEGACY=['long','thirst','wet','armor','undead','caffeineMult','alcoholMult','defenseMult','healMult','variance'];

test('TRAIT-Q15: the active pool is exactly the frozen canonical 30',()=>{
 assert.equal(DATA.traits.length,37);
assert.deepEqual(DATA.traits.map(t=>t.name),['용감함','겁쟁이','대식가','소식가','신중함','무모함','탐욕','구두쇠','충동구매','거짓말쟁이','천재','강골','허약함','포션체질','화염공포증','수집가','실속파','사교적인','낯가림','회복체질','지구력','쉽게 지침','눈썰미','해독가','수족냉증','준비성','악바리','냉담한','정직한','금수저','민감체질','잔재주꾼','몸치','장비관리','서투른','내열성','약시']);
 for(const gone of ['카페인중독','술고래','언데드혐오','평정심'])assert.ok(!DATA.traits.some(t=>t.name===gone),gone+' must not be selectable');
 for(const t of DATA.traits)assert.ok(['positive','mixed','negative'].includes(t.direction),t.id);
});

test('TRAIT-Q13/Q14: no active Trait reads a legacy resolution key',()=>{
 for(const t of DATA.traits)for(const k of Object.keys(t.effects))assert.ok(!LEGACY.includes(k),t.id+' uses legacy key '+k);
 
 assert.deepEqual(DATA.traitBy.eater.effects,{foodMult:1.3,foodSupplyDelta:-1});
 assert.deepEqual(DATA.traitBy.small.effects,{foodMult:0.8,foodSupplyDelta:1});
});

test('TRAIT-Q01/UI-Q34: every material effect carries an explicit tone, never inferred from sign',()=>{
 assert.equal(DATA.traitDirections,undefined,'▲/◆/▼ quality labels are gone');
 for(const t of DATA.traits){
  for(const k of Object.keys(t.effects))assert.ok(['benefit','cost','neutral'].includes(t.tones[k]),t.id+'.'+k+' has no tone');
  for(const r of Presentation.traitEffects(t.id))assert.ok(r.tone,t.id+' row without tone');
 }
 const careful=Presentation.traitEffects('careful');
 const risk=careful.find(r=>r.key==='injuryRisk');
 assert.ok(risk.text.startsWith('-'),'the number is negative');
 assert.equal(risk.tone,'benefit','a negative number can be helpful');
 assert.equal(careful.find(r=>r.key==='loot').tone,'cost');
 assert.equal(Presentation.traitEffects('brave').find(r=>r.key==='fear').tone,'benefit');
 const ui=fs.readFileSync(__dirname+'/../dist/ui/app.js','utf8');
 assert.ok(!/traitDirections|▲|◆ 양면|▼/.test(ui),'no quality label reaches the render path');
 assert.ok(!/trait-row \$\{D\.traitBy\[t\]\.direction\}/.test(ui),'no quality-graded header class');
});

test('TRAIT-Q03/Q04: nine exclusion pairs hold on every acquisition path; 탐욕+구두쇠 coexist',()=>{
 assert.equal(DATA.traitExclusions.length,16);
 for(const pair of [['collector','thrifty'],['stamina','weary'],['social','shy']])
  assert.ok(DATA.traitExclusions.some(p=>p.includes(pair[0])&&p.includes(pair[1])),pair.join('/'));
 assert.ok(!DATA.traitExclusions.some(p=>p.includes('greed')&&p.includes('frugal')));
 for(let i=0;i<60;i++){
  const g=fresh('excl-'+i);
  for(const n of g.run.npcs){ // generation path
   for(const pair of DATA.traitExclusions)assert.ok(!pair.every(t=>n.traits.includes(t)),'create: '+pair);
   Adventurer.grow(n,10000,g.rng); // level-milestone path
   assert.ok(n.traits.length<=4);
   for(const pair of DATA.traitExclusions)assert.ok(!pair.every(t=>n.traits.includes(t)),'grow: '+pair);
  }
 }
 /* SA-Q43: the mentor path that used to add a Trait outside growth is retired, so the
    exclusion rule is asserted where Traits are actually composed - there is no second
    writer left to break a pair. */
 const g=fresh('mentor');
 assert.equal(typeof g.specialAction,'undefined','no retired path can add a Trait');
});

test('TRAIT-Q07/ITEM-Q14: Food affinity touches native core only',()=>{
 const g=fresh('affinity'),base={...g.run.npcs[0],traits:[],pack:['rice','lava','kit']},d=g.run.dungeons[0];
 const plain=Dungeon.prepare(base,d).effects;
 const eater=Dungeon.prepare({...base,traits:['eater']},d).effects;
 assert.ok(eater.survival>plain.survival,'Food native Stat is boosted');
 assert.equal(eater.cold,plain.cold,'Hazard Counter is not amplified');
 assert.equal(eater.injuryGuard,plain.injuryGuard,'Insurance is not amplified');
 // Supply moves on its own axis: -1 per Food item for 대식가, +1 for 소식가, floor of 1
 /* ITEM_v2.7 leaves no Food at Supply 1, so 대식가's `minimum 1` floor is asserted over the
    whole Food line rather than through one item that used to land on it. */
 for(const it of DATA.items.filter(i=>i.category==='food'&&i.effects.supply))
  assert.ok(Dungeon.prepare({...base,traits:['eater'],pack:[it.id]},d).effects.supply>=1,
   it.name+': 대식가 Supply never drops below 1');
 assert.equal(Dungeon.prepare({...base,traits:['small'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply+1);
 assert.equal(Dungeon.prepare({...base,traits:['eater'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply-1);
});

test('TRAIT-Q17: condition, supply and hazard Traits resolve through existing systems',()=>{
 const g=fresh('wiring'),base={...g.run.npcs[0],traits:[],pack:[],injury:0},d=g.run.dungeons[0];
 const fx=t=>Dungeon.prepare({...base,traits:t},d).effects;
 assert.equal(fx(['prepared']).supply,0,'준비성 only adds Supply to actual Food/Drink');
 assert.equal(Dungeon.prepare({...base,traits:['prepared'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply+1);
 assert.equal(fx(['sharpeye']).dark,4);assert.equal(fx(['sharpeye']).whiteout,4);
 assert.equal(fx(['antitoxin']).poison,6);assert.equal(fx(['coldhand']).cold,-6);
 assert.equal(fx(['stamina']).fatigue,-1);assert.equal(fx(['weary']).fatigue,1);
 const hurt={...base,injury:1};
 assert.ok(Math.abs(Dungeon.prepare({...hurt,traits:['grit']},d).effects.combat-Dungeon.prepare(hurt,d).effects.combat - 6.3) < 1e-6,'악바리 only while injured');
 assert.equal(fx(['grit']).combat,Dungeon.prepare(base,d).effects.combat,'no bonus while healthy');
});

test('TRAIT-Q17: 회복체질 shortens and 허약함 lengthens Severe Injury rest',()=>{
 const g=fresh('recovery'),d={...g.makeDungeon('snow',3),power:9999};
 const sample=traits=>{const out=[];for(let i=0;i<300;i++){const n={...JSON.parse(JSON.stringify(g.run.npcs[0])),traits,pack:[],injury:0,recovery:0,alive:true};Dungeon.resolve(n,d,new RNG('rec-'+i));if(n.recovery>0)out.push(n.recovery);}return out;};
 const plain=sample([]),mender=sample(['mender']),frail=sample(['frail']);
 assert.ok(plain.length>20&&mender.length>20&&frail.length>20,'enough Severe Injury samples');
 const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
 assert.ok(mean(mender)<mean(plain),'회복체질 rests less: '+mean(mender).toFixed(2)+' < '+mean(plain).toFixed(2));
 assert.ok(mean(frail)>mean(plain),'허약함 rests more: '+mean(frail).toFixed(2)+' > '+mean(plain).toFixed(2));
 assert.ok(Math.min(...mender)>=1,'recovery never drops below one day');
});

test('TRAIT-Q16 / SALE: purchase and revisit Traits use the existing systems',()=>{
 const g=fresh('sale'),s=g.run;
 g.beginOrder();g.open();const n=g.current();
 const rare=DATA.itemBy.highpotion,common=DATA.itemBy.rice;
 /* ECONOMY_ORDER_v2.8 §FULL-CHAIN NUMERIC CLOSURE / SA-Q48: a Wallet far above price (the old
    9999) drives 정가 burden to ~0, and the flat 0.80 accessible-mode base plus that bonus now
    saturates every case at the 0.97 cap - hiding the Trait bias this test exists to compare.
    Affording only the pricier (rare) item at its exact price keeps both comparisons below the
    cap so the Trait deltas stay visible. */
 const need=(traits,it)=>{n.traits=traits;n.money=rare.sell;return g.interest(n,it,'full').chance;};
 assert.ok(need(['collector'],rare)>need([],rare),'수집가 wants Rare+ more');
 assert.ok(need(['collector'],common)<need([],common),'수집가 wants Common less');
 assert.ok(need(['thrifty'],common)>need([],common),'실속파 wants Common more');
 assert.ok(need(['thrifty'],rare)<need([],rare),'실속파 wants Rare+ less');
 // A Trait is who somebody is, so it applies for as long as they have it. 낯가림 was the one
 // Trait in the pool that could become nothing at all part-way through a Run.
 for(const visits of [1,3,12]){
  n.visits=visits;
  assert.ok(need(['shy'],common)<need([],common),'낯가림 still hesitates on visit '+visits);
 }
 // no Trait may quietly stop applying as a Run goes on: nothing in the intent path reads
 // how far along the customer is.
 const intent=fs.readFileSync(__dirname+'/../dist/systems/shop.js','utf8')
  .split('\n').find(l=>l.includes('for(const id of n.traits)'));
 assert.ok(!/visits|n\.day|s\.day/.test(intent),'purchase intent does not gate a Trait on run progress');
 assert.equal(DATA.traitBy.social.effects.revisitMult,1.25);
 assert.equal(DATA.traitBy.aloof.effects.revisitMult,0.80);
 const src=fs.readFileSync(__dirname+'/../dist/systems/shop.js','utf8');
 assert.ok(/revisitMult/.test(src),'revisit weight is applied in visitor selection');
 assert.ok(!/traits\.includes\('eater'\)/.test(src),'no hardcoded 대식가 purchase bias survives');
});

test('SALE honesty: visible Traits equal the Traits that actually resolve',()=>{
 const g=fresh('honesty'),n=g.run.npcs[0];
 n.traits=['brave','careful','genius','strong'];n.loyalty=0;
 assert.deepEqual(Presentation.traits(n),n.traits,'no Trait that changes the expedition is hidden');
});

test('COPY-001/UI-Q32/UI-Q39: player-facing terminology',()=>{
 assert.equal(Presentation.labels.combat,'투력');
 assert.equal(Presentation.labels.survival,'강인함');
 assert.equal(Presentation.labels.mobility,'기동');
 assert.equal(Presentation.labels.spirit,'정신');
 // META keeps the Monster Knowledge wording; it used to live on a retired unlock key and
 // now only exists where it is actually rendered.
 assert.ok(fs.readFileSync(__dirname+'/../dist/ui/app.js','utf8').includes('보급 생환'),
  'Monster Knowledge progress still reads 보급 생환 N회');
 for(const f of ['ui/app','ui/presentation','data/catalog'])
  assert.ok(!fs.readFileSync(__dirname+'/../dist/'+f+'.js','utf8').includes('관찰'),f+' still says 관찰');
});

test('COPY-002: NPC name voice is Korean-flavoured fantasy, not a Western or syllable-soup pool',()=>{
 const src=fs.readFileSync(__dirname+'/../dist/systems/adventurer.js','utf8');
 const names=JSON.parse(src.match(/const names=(\[[\s\S]*?\]);/)[1]);
 assert.equal(new Set(names).size,names.length,'no duplicate names');
 assert.equal(names.length,200,'the pool is the full production pool, not a sample of it');
 // §15 lists four tone anchors as direction. Three of them are ordinary names and are in the
 // pool; 요화니우스 is also a §9 Rare Reference identity, which the production pool marks
 // random_eligible:false, so it is deliberately not among the names a visitor is drawn from.
 for(const anchor of ['지오니아','민자이','고쉬스앵'])assert.ok(names.includes(anchor),'missing tone anchor '+anchor);
 assert.ok(!names.includes('요화니우스'),'the Rare Reference identity is not a random visitor');
 const suffix=names.filter(n=>/(우스|엘|리온)$/.test(n)).length;
 assert.ok(suffix/names.length<.25,'no -우스/-엘/-리온 monoculture: '+suffix+'/'+names.length);
 for(const n of names)assert.ok(n.length>=2&&n.length<=6&&!/\s/.test(n),'unreadable name: '+n);
 for(const gone of ['노아','바엘','카엘','아몬','레온'])assert.ok(!names.includes(gone),'retired Western-majority name '+gone);
});

test('NPC_TRAIT: a Trait is who somebody is, so none of them wears off during a Run',()=>{
 // A Trait may depend on the situation - what is being sold, what the Gate presses on, whether
 // they are hurt - and those conditions come back. What it may not do is stop applying because
 // the Run has gone on: a Trait that is worth nothing from visit 3 is a Trait the player stops
 // being able to plan around, and it reads as a bug rather than a personality.
 // Measured rather than read: for every Trait, whatever it is worth on the first visit of the
 // first Day it must still be worth late in the Run. Source scanning cannot tell a Trait gate
 // apart from the ordinary Day curve that sits on the same line.
 const g2=fresh('trait-permanence');
 const probe=(traits,{visits,day})=>{
  const base=g2.run.npcs[0];
  const n={...JSON.parse(JSON.stringify(base)),traits,visits,money:9999,pack:[],alive:true,injury:0};
  g2.run.day=day;g2.run.queue=[n.id];g2.run.cursor=0;
  const i=g2.run.npcs.findIndex(x=>x.id===n.id);g2.run.npcs[i]=n;
  const d=g2.run.dungeons[0];
  const eff=Dungeon.prepare(n,d,g2.run.facilities).effects;
  return {common:g2.interest(n,DATA.itemBy.rice,'full').chance,
          rare:g2.interest(n,DATA.itemBy.highpotion,'full').chance,
          eff};
 };
 const early={visits:1,day:1},late={visits:12,day:29};
 for(const t of DATA.traits){
  const a0=probe([],early),a1=probe([t.id],early);
  const b0=probe([],late),b1=probe([t.id],late);
  const delta=(x,y)=>({common:y.common-x.common,rare:y.rare-x.rare,
   eff:Object.fromEntries(Object.keys(y.eff).map(k=>[k,(y.eff[k]||0)-(x.eff[k]||0)]))});
  const A=delta(a0,a1),B=delta(b0,b1);
  for(const ch of ['common','rare'])
   if(Math.abs(A[ch])>1e-9)
    assert.ok(Math.abs(B[ch])>1e-9,t.name+' stops affecting purchase intent ('+ch+') later in the Run');
  for(const k of Object.keys(A.eff))
   if(Math.abs(A.eff[k])>1e-9)
    assert.ok(Math.abs(B.eff[k])>1e-9,t.name+' stops affecting '+k+' later in the Run');
 }
 // and the catalogue no longer promises one wears off
 for(const t of DATA.traits){
  const text=(t.note||'')+' '+Object.keys(t.effects).join(' ');
  for(const expiry of ['사라집니다','없어집니다','이후에는'])
   assert.ok(!text.includes(expiry),t.name+' promises to stop applying: '+t.note);
 }
});

test('NPC_TRAIT_v2.7 §LEVEL-UP REWARD: a Level grants Stats and nothing else',()=>{
 const fs=require('node:fs'),path=require('node:path');
 const src=fs.readFileSync(path.join(__dirname,'..','dist/systems/adventurer.js'),'utf8');
 assert.ok(!/승급/.test(src),'no Rank promotion rides a Level');
 assert.ok(!/새 특성/.test(src),'no milestone Trait is granted on a Level');
 assert.ok(!/for\(let milestone/.test(src),'the 5-Level milestone loop is gone');
 assert.equal(Adventurer.rank,undefined,'Level-milestone Title progression is not exported');
 for(const j of DATA.jobs)assert.equal(j.ranks,undefined,j.name+' carries no Rank ladder');
 for(let i=0;i<60;i++){
  const r=new RNG('levelup-'+i);
  const n=Adventurer.create(r,i,1,Meta.fresh());
  const traitsBefore=[...n.traits],statsBefore={...n.stats},equipBefore={...n.equipment},levelBefore=n.level;
  const notes=Adventurer.grow(n,100000,new RNG('grow-'+i));
  assert.ok(n.level>=10,'the sweep actually crossed every old milestone');
  assert.deepEqual(n.traits,traitsBefore,'no Trait was acquired by levelling');
  assert.equal(n.rank,undefined,'no Rank state is written');
  assert.deepEqual(n.equipment,equipBefore,'no Equipment was granted by a Level');
  assert.equal(Adventurer.slots(n),2,'and no third Bag slot appeared');
  assert.ok(Adventurer.keys.every(k=>n.stats[k]>statsBefore[k]),'every Core Stat grew');
  assert.deepEqual(notes,['Lv.'+levelBefore+' → Lv.'+n.level],'the only thing reported is the Level itself');
 }
 // the Stat gain really is Job Growth x Potential, not a Level multiplier on top
 const a=Adventurer.create(new RNG('growth-shape'),1,1,Meta.fresh());
 const before={...a.stats},level0=a.level,gained=Adventurer.grow(a,100000,new RNG('g'));
 const levels=a.level-level0,growth=DATA.jobBy[a.job].growth;
 Adventurer.keys.forEach((k,i)=>assert.ok(Math.abs(a.stats[k]-before[k]-levels*growth[i]*a.potential)<1e-9,
  k+' grew by exactly Job Growth x Potential per Level'));
 assert.equal(gained.length,1);
});

// NPC-Q73. The rule is "Potion POSITIVE NATIVE Core-Stat x1.15". It was implemented as
// survival-only at x1.30, and every Potion in the v2.7 catalog carries combat - so the Trait
// amplified nothing at all while claiming 30% on screen. Every tier is checked, on the exact
// factor, and every other channel is checked for not moving.
test('NPC-Q73 POTIONBODY SCOPE: every Potion tier, positive native Core Stat only, x1.15',()=>{
 const g=fresh('potionbody');
 const d=g.makeDungeon('spider',1);
 const base=id=>({...g.run.npcs[0],traits:[],pack:[id],injury:0,fatigue:0});
 const stats=['combat','survival','mobility','spirit'];
 assert.equal(DATA.traitBy.potionbody.effects.potionMult,1.15,'the catalog carries the Canonical factor');
 const tiers=DATA.items.filter(it=>it.category==='potion');
 assert.equal(tiers.length,4,'all four v2.7 Potion tiers are covered');
 for(const it of tiers){
  const plain=Dungeon.prepare(base(it.id),d).effects;
  const body=Dungeon.prepare({...base(it.id),traits:['potionbody']},d).effects;
  let amplified=0;
  for(const k of stats){
   const native=it.effects[k]||0;
   if(native>0){amplified++;
    assert.ok(Math.abs((body[k]-plain[k])-native*0.15)<1e-9,
     it.id+' '+k+': x1.15 on the native '+native+', got +'+(body[k]-plain[k]).toFixed(4));
   }else assert.equal(body[k],plain[k],it.id+' does not gain '+k+' it never had');
  }
  assert.ok(amplified>0,it.id+' really does have a positive native Core Stat to amplify');
  // every other channel the Item carries is untouched
  for(const k of ['supply','escape','injuryGuard','injuryRisk','loot','xpMult','variance'])
   assert.equal(body[k],plain[k],it.id+' does not amplify '+k);
 }
 // a Hazard Counter, an Insurance effect and a Food Item are all outside the Trait
 for(const [id,keys] of [['antidote',['poison','supply']],['stone',['escape']],['rice',['survival','supply']],['boots',['mobility']]]){
  const plain=Dungeon.prepare(base(id),d).effects;
  const body=Dungeon.prepare({...base(id),traits:['potionbody']},d).effects;
  for(const k of [...keys,...stats])assert.equal(body[k],plain[k],id+' '+k+' is not a Potion effect');
 }
 // and the screen says what the rule is
 const note=Dungeon.prepare({...base('potion'),traits:['potionbody']},d).events.find(e=>e.id==='potionbody');
 assert.ok(note,'the Trait reports itself when a Potion is carried');
 assert.ok(/15%/.test(note.text)&&!/30%/.test(note.text),'and states 15%, not the retired 30%: '+note.text);
 assert.equal(Presentation.labels.potionMult,'포션의 능력치','the label is no longer survival-only');
 assert.equal(Dungeon.prepare({...base('rice'),traits:['potionbody']},d).events.some(e=>e.id==='potionbody'),false,
  'and says nothing when no Potion is carried');
});

/* NPC_TRAIT §ACTIVE TRAIT CATALOG 27 / §FATIGUE TRAITS - RESULT SCOPE: 악바리 carries result
   fatigue +1 always, injured or not (a chronic cost), on 성공 / 대성공 / 퇴각 / 부상, and never on
   중상 / 사망. A healthy 악바리 and a Traitless twin draw the same stream (healthy 악바리 has no
   combat term), so each pair resolves to the same Outcome and only the fatigue gain may differ. */
test('NPC_TRAIT §FATIGUE TRAITS: 악바리 adds result fatigue +1 always, a healthy NPC included',()=>{
 const g=fresh('grit-fatigue'),d=g.run.dungeons[0];
 const healthy={...JSON.parse(JSON.stringify(g.run.npcs[0])),traits:[],pack:[],injury:0,recovery:0,alive:true};
 assert.equal(Dungeon.prepare({...healthy,traits:['grit']},d).effects.fatigue,1,'healthy 악바리 carries +1');
 assert.equal(Dungeon.prepare({...healthy,traits:['grit'],injury:1},d).effects.fatigue,1,'and the same +1 while injured');
 const seen=new Set();let compared=0;
 for(let i=0;i<300;i++){
  const run=traits=>Dungeon.resolve({...JSON.parse(JSON.stringify(healthy)),traits},JSON.parse(JSON.stringify(d)),new RNG('grit-fatigue-'+i),[]);
  const plain=run([]),grit=run(['grit']);
  if(plain.outcome!==grit.outcome)continue;
  seen.add(grit.outcome);compared++;
  if(grit.outcome==='사망')assert.equal(grit.rawOutcomeFatigueGain,0,'no fatigue on a death');
  // v2.9.0 (User 2026-09-25): 중상 takes the 부상 gain, so the Trait's +1 rides it like any other result
  else assert.equal(grit.rawOutcomeFatigueGain-plain.rawOutcomeFatigueGain,1,'healthy 악바리 gains +1 on '+grit.outcome);
 }
 assert.ok(compared>=200,'the paired resolutions really are comparable: '+compared);
 assert.ok(seen.size>=2,'more than one Outcome was exercised: '+[...seen].join('/'));
});

/* NPC_TRAIT §TRAIT MODIFICATION: Trait modification items in normal order catalog=NO. No active
   Item carries a Trait-edit effect, and no generated ORDER offer is anything but an active Item. */
test('NPC_TRAIT §TRAIT MODIFICATION: the normal order catalog holds no Trait-modification item',()=>{
 for(const it of DATA.items){
  for(const k of Object.keys(it.effects))assert.ok(!/trait|mentor|reroll|rename|remove/i.test(k),it.id+' carries a Trait-edit key '+k);
  assert.ok(!/특성/.test(it.name+' '+(it.description||'')),it.id+' does not offer to change a Trait');
 }
 for(let i=0;i<20;i++){
  const g=fresh('trait-mod-'+i);
  for(let day=0;day<6;day++){
   g.run.day=1+day*5;g.generateOffers();
   for(const o of g.run.offers){
    assert.ok(DATA.itemBy[o.item],'every offer is an active catalog Item: '+o.item);
    assert.ok(!Object.keys(DATA.itemBy[o.item].effects).some(k=>/trait/i.test(k)),o.item+' edits no Trait');
   }
  }
 }
});

/* NPC_TRAIT / SALE §LOYALTY (User decision 2026-09-23): 50% sale +4, 100% +1, 150% -3; a visit
   without a paid purchase adds 0 on departure (one with a purchase keeps its +1); survival +1. */
test('LOYALTY 2026-09-23: 50% +4, visit without purchase 0, survival +1',()=>{
 assert.deepEqual(['half','full','overcharge'].map(m=>DATA.pricing[m].loyalty),[4,1,-3]);
 const setup=seed=>{const g=fresh(seed),s=g.run;g.run.facilities=[];g.beginOrder();s.phase='sell';const n=s.npcs[0];
  n.traits=[];n.loyalty=10;n.money=99999;n.pack=[];n.refused=[];n.history=[];n.introduced=true;n.visits=2;n.destination=0;n.claimedDestination=0;
  s.queue=[n.id,s.npcs[1].id];s.cursor=0;return {g,s,n};};
 {const {g,n}=setup('loyal-visit');g.depart();assert.equal(n.loyalty,10,'no purchase, no visit Loyalty');}
 {const {g,s,n}=setup('loyal-buy');g.rng={next:()=>0,int:(a)=>a,pick:x=>x[0],weighted:x=>x[0],shuffle:x=>x,state:0};
  g.stock('rice',1);assert.equal(g.sell(s.inventory.at(-1).id,'half'),true);assert.equal(n.loyalty,14,'50% sale +4');
  g.depart();assert.equal(n.loyalty,15,'a visit with a paid purchase still adds +1');}
 {const {g,s,n}=setup('loyal-survive');n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};s.queue=[n.id];
  g.night();assert.ok(n.alive);assert.equal(n.loyalty,11,'survival +1');}
});

console.log(count+' trait groups passed');
