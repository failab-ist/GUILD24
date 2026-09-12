// Chunk D acceptance: the frozen 30-Trait catalog, semantic tone, exclusions and NPC name voice.
// Covers TRAIT-Q01/Q03/Q04/Q07/Q13/Q14/Q15/Q16/Q17, UI-Q32/Q34/Q39, COPY-001/COPY-002.
const assert=require('node:assert/strict');
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
function fresh(seed='traits'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
const CATALOG=['용감함','겁쟁이','대식가','소식가','신중함','무모함','탐욕','구두쇠','충동구매','허세','천재','강골','허약함','포션체질','화염공포증','행운아','불운아','수집가','실속파','사교적인','낯가림','회복체질','지구력','쉽게 지침','눈썰미','해독가','수족냉증','준비성','악바리','냉담한'];
const LEGACY=['long','thirst','wet','armor','undead','caffeineMult','alcoholMult','defenseMult','healMult','variance'];

test('TRAIT-Q15: the active pool is exactly the frozen canonical 30',()=>{
 assert.equal(DATA.traits.length,30);
 assert.deepEqual(DATA.traits.map(t=>t.name),CATALOG);
 for(const gone of ['카페인중독','술고래','언데드혐오','평정심'])assert.ok(!DATA.traits.some(t=>t.name===gone),gone+' must not be selectable');
 for(const t of DATA.traits)assert.ok(['positive','mixed','negative'].includes(t.direction),t.id);
});

test('TRAIT-Q13/Q14: no active Trait reads a legacy resolution key',()=>{
 for(const t of DATA.traits)for(const k of Object.keys(t.effects))assert.ok(!LEGACY.includes(k),t.id+' uses legacy key '+k);
 assert.ok(!('variance' in DATA.traitBy.unlucky.effects),'불운아 does not modify hidden combat variance');
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
 assert.equal(DATA.traitExclusions.length,9);
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
 // rare mentor Event path
 const g=fresh('mentor'),n=g.run.npcs[0];
 n.traits=['social'];n.introduced=true;g.run.phase='morning';
 g.run.special={kind:'mentor',used:false,candidates:['shy']};
 assert.throws(()=>g.specialAction(n.id,'shy'),'mentor cannot break an exclusion pair');
});

test('TRAIT-Q07/ITEM-Q14: Food affinity touches native core only',()=>{
 const g=fresh('affinity'),base={...g.run.npcs[0],traits:[],pack:['rice','lava','bandage']},d=g.run.dungeons[0];
 const plain=Dungeon.prepare(base,d).effects;
 const eater=Dungeon.prepare({...base,traits:['eater']},d).effects;
 assert.ok(eater.survival>plain.survival,'Food native Stat is boosted');
 assert.equal(eater.cold,plain.cold,'Hazard Counter is not amplified');
 assert.equal(eater.injuryGuard,plain.injuryGuard,'Insurance is not amplified');
 // Supply moves on its own axis: -1 per Food item for 대식가, +1 for 소식가, floor of 1
 const one={...base,pack:['candy']};
 assert.equal(Dungeon.prepare({...one,traits:['eater']},d).effects.supply,1,'Supply never drops below 1');
 assert.equal(Dungeon.prepare({...base,traits:['small'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply+1);
 assert.equal(Dungeon.prepare({...base,traits:['eater'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply-1);
});

test('TRAIT-Q17: condition, supply and hazard Traits resolve through existing systems',()=>{
 const g=fresh('wiring'),base={...g.run.npcs[0],traits:[],pack:[],injury:0},d=g.run.dungeons[0];
 const fx=t=>Dungeon.prepare({...base,traits:t},d).effects;
 assert.equal(fx(['prepared']).supply,undefined,'준비성 only adds Supply to actual Food/Drink');
 assert.equal(Dungeon.prepare({...base,traits:['prepared'],pack:['rice']},d).effects.supply,DATA.itemBy.rice.effects.supply+1);
 assert.equal(fx(['sharpeye']).dark,6);assert.equal(fx(['sharpeye']).whiteout,6);
 assert.equal(fx(['antitoxin']).poison,8);assert.equal(fx(['coldhand']).cold,-9);
 assert.equal(fx(['stamina']).fatigue,-1);assert.equal(fx(['weary']).fatigue,1);
 const hurt={...base,injury:1};
 assert.equal(Dungeon.prepare({...hurt,traits:['grit']},d).effects.combat-Dungeon.prepare(hurt,d).effects.combat,6,'악바리 only while injured');
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
 const need=(traits,it)=>{n.traits=traits;n.money=9999;return g.interest(n,it,'full').chance;};
 assert.ok(need(['collector'],rare)>need([],rare),'수집가 wants Rare+ more');
 assert.ok(need(['collector'],common)<need([],common),'수집가 wants Common less');
 assert.ok(need(['thrifty'],common)>need([],common),'실속파 wants Common more');
 assert.ok(need(['thrifty'],rare)<need([],rare),'실속파 wants Rare+ less');
 n.visits=1;assert.ok(need(['shy'],common)<need([],common),'낯가림 hesitates early');
 n.visits=3;assert.equal(need(['shy'],common),need([],common),'낯가림 penalty ends from the third visit');
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

console.log(count+' trait groups passed');
