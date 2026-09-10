// COPY_WORLD_VOICE §11 / §12 / §18 acceptance.
// Chunk F adopted terminology, Item Flavor, the name voice and the Night debug-language rule.
// This suite covers the part that was not adopted: the Dialogue and Result Variant Pools,
// the approved Rare Reference names, and the §18 QA questions a Node process can answer.
// Copy owns sentences only — every assertion here is about strings, never about a rule.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const V=Copy.pools.visit,S=Copy.pools.sale,N=Copy.pools.night;
const every=o=>Object.entries(o).flatMap(([k,v])=>Array.isArray(v)?[[k,v]]:Object.entries(v).map(([k2,v2])=>[k+'.'+k2,v2]));
const allPools=[...every(V),...every(S),...every(N)];
const allLines=allPools.flatMap(([,p])=>p);

test('§11.1/§11.2: every repeated situation has a real Variant Pool, not one recorded line',()=>{
 // Canonical asks for roughly 3-5 good variants on the high-frequency situations, and
 // allows 1-3 for a rare callback. Nothing may be a single fixed line any more.
 const rare=['visit.helped'];
 for(const [name,pool] of allPools){
  assert.ok(Array.isArray(pool)&&pool.length>=3,name+' has at least three variants (has '+pool.length+')');
  if(!rare.includes(name))assert.ok(pool.length>=3&&pool.length<=5,name+' stays in the 3-5 band: '+pool.length);
  assert.equal(new Set(pool).size,pool.length,name+' repeats no line');
 }
 assert.equal(new Set(allLines).size,allLines.length,'no line is reused across pools');
});

test('§11.1 BAD: a variant is a different observation, not a synonym swap',()=>{
 // The canonical BAD example is 다쳤어요 / 부상을 입었어요 / 상처를 입었어요 — same sentence,
 // different word. Two variants that share almost all of their content words are that.
 const words=s=>new Set(s.replace(/[“”.,!?…]/g,'').split(/\s+/).filter(w=>w.length>1));
 for(const [name,pool] of allPools)
  for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){
   const a=words(pool[i]),b=words(pool[j]),shared=[...a].filter(w=>b.has(w)).length;
   const overlap=shared/Math.min(a.size,b.size);
   assert.ok(overlap<.7,name+' variants say different things: "'+pool[i]+'" vs "'+pool[j]+'"');
  }
});

test('§11.2: the death pool and the living pool can never cross',()=>{
 const dead=Copy.deathPool(),living=Copy.livingPool();
 assert.ok(dead.length>=3&&living.length>=9,'both pools are populated');
 assert.deepEqual(dead.filter(l=>living.includes(l)),[],'no line belongs to both');
 // A death is stated as DATA; the flavour never puts words in a dead adventurer's mouth.
 for(const l of dead)assert.ok(!l.includes('“'),'a death line is not spoken dialogue: '+l);
 // §12 — the receipt reading is a Callback, so it may only exist in the traded-history pool.
 for(const l of [...Copy.pools.night.deathKnown,...Copy.pools.night.deathStranger])
  assert.ok(!/영수증|예약|계산/.test(l),'no purchase memory without a purchase history: '+l);
});

test('§12: a Callback only speaks about history the run actually has',()=>{
 const g=new Game();g.autosave=false;g.start('copy-callback');
 const n=g.run.npcs[0];
 n.history=[];n.records=[];n.newToday=false;n.injury=0;n.loyalty=0;n.traits=[];
 for(let day=1;day<=12;day++){
  const line=Copy.arrive(n,day,false);
  assert.ok(!V.helped.includes(line),'no "that helped last time" without a last time');
 }
 // With a real history the callback becomes eligible, and it is the callback pool it draws from.
 assert.ok(V.helped.includes(Copy.arrive(n,3,true)),'a real callback draws from the callback pool');
 // A death line describes only the history that exists.
 const report={outcome:'사망',day:5,items:[],changes:[]};
 assert.ok(Copy.pools.night.deathStranger.includes(Copy.night(report,{...n,id:'x',history:[],records:[{}]})),
  'a stranger death gets the stranger line');
 assert.ok(Copy.pools.night.deathTraded.includes(Copy.night(report,{...n,id:'x',history:[{item:'rice'}],records:[{}]})),
  'a customer death may mention the counter');
});

test('the line is chosen from saved state, so it costs no randomness and survives a reload',()=>{
 const a=new Game();a.autosave=false;a.start('copy-determinism');
 const before=a.rng.state;
 const n=a.run.npcs[0];
 const line=Copy.arrive(n,a.run.day,false);
 assert.equal(a.rng.state,before,'picking a line consumes no RNG');
 assert.equal(Copy.arrive(n,a.run.day,false),line,'the same state gives the same line');
 // Same NPC, next day: the situation repeats but the line is free to move.
 const across=new Set(Array.from({length:12},(_,d)=>Copy.arrive(n,d+1,false)));
 assert.ok(across.size>1,'the same situation does not print one recorded line every day');
 // A reload must not reword anything the player already read.
 a.save();
 const s=Save.import(Save.export(a.account,a.run));
 const b=new Game(s.account,s.run);b.autosave=false;
 assert.equal(Copy.arrive(b.run.npcs[0],b.run.day,false),line,'a reload keeps the same line');
});

test('COPY-002 / §9: the approved Rare Reference names are in the pool, with no dedicated meme',()=>{
 const src=read('dist/systems/adventurer.js');
 for(const name of ['요화니우스','상혀크','진호르'])
  assert.ok(src.includes('"'+name+'"'),'canonical Rare Reference name is adoptable: '+name);
 // §9 — the name itself is the easter egg. No reference NPC may own special copy yet, and
 // nothing may print a meme at an unrelated NPC or through a system message.
 for(const file of ['dist/data/copy.js','dist/ui/app.js','dist/ui/presentation.js','dist/systems/shop.js','dist/systems/dungeon.js'])
  for(const name of ['상혀크','진호르'])
   assert.ok(!read(file).includes(name),file+' carries no dedicated copy for '+name);
});

test('§18: the help panel describes the rules the build actually has',()=>{
 const app=read('dist/ui/app.js');
 // v2.4 shows every current Trait; the loyalty-gated reveal it used to describe is gone.
 assert.ok(!app.includes('숨겨진 특성은 관계가 쌓이면 공개됩니다'),'the retired hidden-Trait rule is not still taught');
 assert.ok(/표시된 특성이 원정에서 실제로 작용하는 특성/.test(app),'the help panel states the rule that replaced it');
 // §13.2 — the destination lesson teaches the system rule, not one Trait name.
 assert.ok(app.includes('특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다'),
  'the canonical destination wording is used verbatim');
 assert.ok(!/허세를 부리는 손님은[^<]*목적지/.test(app),'the lesson is not taught through one Trait name');
});

test('§7.5 / §7.6: no AI-ish or app-onboarding copy reached the player',()=>{
 const banned=[/해보세요!/,/효율적인 플레이/,/최적의/,/알아보세요/,/시작해 볼까요/,/함께 알아/,/팁:/,/포인트는/];
 const surfaces=allLines.concat([read('dist/ui/app.js').match(/function help\(\)\{[\s\S]*?\n\}/)[0]]);
 for(const s of surfaces)for(const bad of banned)
  assert.ok(!bad.test(s),'app-onboarding tone: '+s.slice(0,60));
 // §18 — a player-facing line never leaks engine wording or a broken interpolation.
 for(const l of allLines){
  assert.ok(!/undefined|NaN|\[object Object\]/.test(l),'no placeholder: '+l);
  assert.ok(!/\bRNG\b|판정 진행|보정 적용|threshold|resolve/i.test(l),'no engine wording: '+l);
  assert.ok(l.trim()===l&&l.length>0,'a line is a finished sentence: "'+l+'"');
 }
});

test('the variant layer changes sentences only — it touches no rule and no number',()=>{
 // The whole point of picking from saved state: an identical run stays identical.
 const play=seed=>{const g=new Game();g.autosave=false;g.start(seed);
  g.buyRelic(g.run.relicWindow.candidateIds[0]);
  let turns=0;
  while(g.run.phase!=='end'&&turns++<400){const s=g.run;
   if(s.phase==='morning')g.beginOrder();
   else if(s.phase==='order')g.open();
   else if(s.phase==='sell')g.depart();
   else if(s.phase==='night')g.finishNight();
   else if(s.phase==='closing')g.closeDay();
   else break;}
  return g;};
 const a=play('copy-neutral'),b=play('copy-neutral');
 assert.deepEqual(b.run,a.run,'two identical runs stay identical');
 assert.equal(a.run.notice.length>0,true,'the player still gets a line');
 // Every Night report carries exactly one line, from the pool that matches its outcome.
 const g=play('copy-night');
 for(const npc of g.run.npcs)for(const r of npc.records){
  if(!r.quote)continue;
  const pool=r.outcome==='사망'?Copy.deathPool():Copy.livingPool();
  assert.ok(pool.includes(r.quote),'a '+r.outcome+' line comes from the matching pool: '+r.quote);
 }
});

console.log(count+' copy groups passed');
