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

test('COPY-002 / §9: the approved Rare Reference names are reserved, with no dedicated meme',()=>{
 const src=read('dist/systems/adventurer.js');
 // §9 keeps these three as Rare Reference identities and makes their special copy eligible
 // only when such an NPC is actually in the Run. The production pool marks all three
 // random_eligible:false and gives each its own fixed portrait, so they are reserved rather
 // than drawn: no random visitor may ever be one of them.
 const names=JSON.parse(src.match(/const names=(\[[\s\S]*?\]);/)[1]);
 for(const name of ['요화니우스','상혀크','진호르'])
  assert.ok(!names.includes(name),'Rare Reference name is reserved, not dealt at random: '+name);
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

test('§11 / SALE: a spoken line fits the bubble in at most two rows',()=>{
 // The bubble does not clip, ellipsise or shrink text — so "at most two rows" has to be a
 // rule about the writing. 360px is the narrowest supported width; the bubble spans the
 // scene's gutters there, and Pretendard at 15px puts well over 24 Korean glyphs on a row.
 // A generous per-row budget still catches a line long enough to push the customer down.
 const ROWS=2,PER_ROW=24;
 const spoken=[...Object.values(V).filter(Array.isArray).flat(),
  ...Object.values(V.trait).flat(),
  ...['full','half','overcharge'].flatMap(k=>S[k]),
  ...Object.values(S.refuse).flat()];
 for(const line of spoken){
  const n=line.replace(/[“”]/g,'').length;
  assert.ok(n<=ROWS*PER_ROW,'a spoken line stays within two rows of the bubble ('+n+'자): '+line);
 }
 // The Night lines share the same discipline in their own block.
 for(const line of [...Copy.deathPool(),...Copy.livingPool()]){
  const n=line.replace(/[“”]/g,'').length;
  assert.ok(n<=ROWS*PER_ROW,'a Night line stays within two rows ('+n+'자): '+line);
 }
});

test('SALE: the customer speaks, the system does not speak through them',()=>{
 const app=read('dist/ui/app.js');
 // One bubble, and it only renders a line attributed to the customer at the counter.
 assert.ok(/function speech\(n\)/.test(app),'the sale screen has a single speech bubble');
 assert.ok(/said\.npc!==n\.id/.test(app),'a line belonging to another customer is not shown');
 assert.equal((app.match(/class="say"/g)||[]).length,1,'exactly one bubble exists');
 // An NPC reaction never goes through the global toast — one owner, no duplicate.
 assert.ok(!/toast\(game\.run\.notice\)/.test(app),'NPC reactions do not use the toast');
 assert.ok(!/toast\(.*run\.say/.test(app),'the spoken line never goes to the toast');
 // The system channel and the customer channel are separate fields, so a system message
 // cannot be attributed to a customer.
 const shop=read('dist/systems/shop.js');
 for(const call of ['Copy.arrive','Copy.buy','Copy.refuse'])
  assert.ok(new RegExp('s(?:\\.run)?\\.say=\\{npc:[^}]*'+call.replace('.','\\.')).test(shop),
   call+' writes the customer channel, not the system one');
 assert.ok(/s\.notice='발주 완료\.'/.test(shop),'system messages still use the system channel');
});

test('SALE: a reaction is replaced, never expired on a timer',()=>{
 const app=read('dist/ui/app.js');
 const speech=app.slice(app.indexOf('function speech('),app.indexOf('function standee('));
 assert.ok(!/setTimeout|setInterval/.test(speech),'the bubble runs on no timer of its own');
 // What replaces it is the engine writing the next line: the next thing this customer says,
 // or the next customer arriving. Nothing clears it in between, so a reaction stays readable
 // while the remaining supply slots are decided.
 const shop=read('dist/systems/shop.js');
 assert.ok(/arrive\(\)\{[^}]*\.say=/.test(shop.replace(/\n/g,'')),'a new customer sets their own line');
 assert.ok(/s\.say=null/.test(shop),'the line is cleared when the day turns over, not by a timer');
});

test('D-16 / D-19 / D-20 / D-25: the words match the channel the engine actually moves',()=>{
 /* foodMult and potionMult multiply exactly one contribution - survival, from food and from
    potions. They were labelled 음식/포션 고유 효과, which claims every effect the item has. */
 const dungeon=read('dist/systems/dungeon.js');
 assert.ok(/k==='survival'&&isFood\)value\*=mult\.foodMult/.test(dungeon),'foodMult reaches survival only');
 assert.ok(/item\.effects\.potion&&k==='survival'\)value\*=mult\.potionMult/.test(dungeon),'and so does potionMult');
 assert.equal(Presentation.labels.foodMult,'음식의 강인함','so the label names that channel');
 assert.equal(Presentation.labels.potionMult,'포션의 강인함','and so does the potion one');
 for(const id of ['eater','small'])
  assert.ok(!DATA.traitBy[id].note,'with the channel named, '+id+' no longer needs a note denying the others');

 /* A threshold the player is subject to is not written out by hand next to the rule that
    uses it - both read the same constant, so the sentence cannot drift from the behaviour. */
 assert.ok(Presentation.labels.priceBias.startsWith(String(DATA.balance.frugalThreshold)),
  'the frugal label is built from the threshold it describes');
 const guarantee=DATA.relicBy.guarantee.description;
 assert.ok(guarantee.includes(DATA.balance.guaranteeMinPrice+'G'),'the guild guarantee states what 고가상품 means');
 assert.ok(read('dist/systems/shop.js').includes('D.balance.guaranteeMinPrice'),'from the same constant the rule reads');

 /* 포만감 was a third named effect in two Relic descriptions. There is no such channel. */
 for(const id of ['kitchen','fresh24']){
  assert.ok(!DATA.relicBy[id].description.includes('포만감'),id+' no longer names an effect that does not exist');
  assert.ok(/보급·강인함/.test(DATA.relicBy[id].description),'and names the two it does move');
 }

 /* D-16: the description slot is flavour. Where it only restated the effect line it told the
    player nothing they could not read one line up. Rules that live ONLY there are kept. */
 for(const [id,banned] of [['ice','화염 대응'],['bandage','부상을 한 단계'],['kit','중상 위험을 줄여'],
                           ['antidote','독 대응을 크게'],['mask','독과 가스 환경에 대응'],
                           ['battery','어둠 속 시야를 확보'],['tree','사망 판정을 한 번 중상으로'],
                           ['coupon','다음 소모품의 효과를 복제']]){
  const it=DATA.items.find(x=>x.id===id);
  assert.ok(it,'the catalog still has an item called '+id);
  assert.ok(!it.description.includes(banned),it.name+' flavour no longer restates its own effect line');
 }
 const stone=DATA.items.find(x=>x.id==='stone');
 assert.ok(stone&&/한 번 더 돌아올 기회/.test(stone.description),
  'the return stone keeps the rule that is only written there');
});

console.log(count+' copy groups passed');
