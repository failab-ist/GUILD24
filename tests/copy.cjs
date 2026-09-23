// COPY_WORLD_VOICE §11 / §12 / §18 acceptance.
// Chunk F adopted terminology, Item Flavor, the name voice and the Night debug-language rule.
// This suite covers the part that was not adopted: the Dialogue and Result Variant Pools,
// the approved Rare Reference names, and the §18 QA questions a Node process can answer.
// Copy owns sentences only — every assertion here is about strings, never about a rule.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const V=Copy.pools.visit,S=Copy.pools.sale,N=Copy.pools.night;
const every=o=>Object.entries(o).flatMap(([k,v])=>Array.isArray(v)?[[k,v]]:Object.entries(v).map(([k2,v2])=>[k+'.'+k2,v2]));
/* named `visit.first` etc. - the same keys POOL_MIN and POOL_SECTION use (without the prefix, POOL_MIN
   matched nothing and the v2.8 minimum-size assertion never ran) */
const allPools=[...every(V).map(([k,p])=>['visit.'+k,p]),...every(S).map(([k,p])=>['sale.'+k,p]),...every(N).map(([k,p])=>['night.'+k,p])];
const allLines=allPools.flatMap(([,p])=>p);

/* COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT replaces the old rough 3-5 band
   with exact named minimums per Pool, sized for the recent-repeat rule to actually have room
   to work with across a repeated Run. */
const POOL_MIN={
 'visit.first':8,'visit.back':16,'visit.hurt':10,'visit.regular':12,'visit.helped':8,
 'visit.trait.frugal':6,'visit.trait.thrifty':6,'visit.trait.coward':6,'visit.trait.liar':6,
 'visit.trait.eater':6,'visit.trait.greed':6,'visit.trait.shy':6,'visit.trait.social':6,
 'visit.trait.collector':6,'visit.trait.aloof':6,
 'sale.full':20,'sale.half':20,'sale.overcharge':20,
 'sale.refuse.price':12,'sale.refuse.need':12,'sale.refuse.choice':12,
 'night.plain':16,'night.great':10,'night.retreat':12,'night.hurt':12,'night.severe':8,
 'night.avoided':8,'night.rescued':8,'night.grew':10,
 'night.deathTraded':6,'night.deathKnown':6,'night.deathStranger':6};
test('§11.1/§11.2: every repeated situation has a real Variant Pool at its v2.8 minimum size',()=>{
 for(const [name,pool] of allPools){
  assert.ok(Array.isArray(pool)&&pool.length>=3,name+' has at least three variants (has '+pool.length+')');
  const min=POOL_MIN[name];
  if(min!==undefined)assert.ok(pool.length>=min,name+' reaches its v2.8 minimum of '+min+' (has '+pool.length+')');
  assert.equal(new Set(pool).size,pool.length,name+' repeats no line');
 }
 assert.equal(new Set(allLines).size,allLines.length,'no line is reused across pools');
});

/* COPY_WORLD_VOICE_v2.8: "Exact active ARRIVAL / TRAIT / SALE / NIGHT / DEATH pools are owned by
   COPY_AUDIT_APPROVED". Each Source pool IS that owner's `현재` list, line for line - the guard whose
   absence let the v2.8 expansion ship unapproved lines (reports/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md). */
const POOL_SECTION={'visit.first':'16-1','visit.back':'16-2','visit.hurt':'16-3','visit.regular':'16-4','visit.helped':'16-5',
 'visit.trait.frugal':'17-1','visit.trait.thrifty':'17-2','visit.trait.coward':'17-3','visit.trait.liar':'17-4','visit.trait.eater':'17-5',
 'visit.trait.greed':'17-6','visit.trait.shy':'17-7','visit.trait.social':'17-8','visit.trait.collector':'17-9','visit.trait.aloof':'17-10',
 'sale.full':'18-1','sale.half':'18-2','sale.overcharge':'18-3','sale.refuse.price':'18-4','sale.refuse.need':'18-5','sale.refuse.choice':'18-6',
 'night.plain':'19-1','night.great':'19-2','night.retreat':'19-3','night.hurt':'19-4','night.severe':'19-5','night.avoided':'19-6',
 'night.rescued':'19-7','night.grew':'19-8','night.deathTraded':'20-1','night.deathKnown':'20-2','night.deathStranger':'20-3'};
const approved=(()=>{const out={};let sec=null,mode=null;
 for(const l of read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md').split('\n')){let h;
  if((h=l.match(/^##\s+(\d+-\d+)\./))){sec=h[1];out[sec]=[];mode=null;continue;}
  if(/^#\s/.test(l)){sec=null;continue;}if(!sec)continue;
  if((h=l.match(/^\*\*([^*]+)\*\*/))&&!l.startsWith('>')){mode=h[1];continue;}
  const q=l.match(/^>\s*(.+?)\s*$/);if(q&&mode==='현재')out[sec].push(q[1]);}
 return out;})();
test('COPY_AUDIT §16-§20: every dialogue pool is exactly the approved `현재` list',()=>{
 for(const [name,pool] of allPools){const sec=POOL_SECTION[name];
  assert.ok(sec,name+' has an approved owner section');
  assert.deepEqual(pool,approved[sec],name+' is COPY_AUDIT '+sec+' verbatim');}
 assert.equal(allPools.length,Object.keys(POOL_SECTION).length,'no pool outside the approved set');
});

/* The rest of COPY_AUDIT (every section outside the §16-§20 pools): each literal `현재…` line must
   appear verbatim somewhere in shipped Source. Lines with a {placeholder} are skipped. A line that
   Source builds from parts cannot be found as one literal, so it is listed here with where it is
   built; the set must match exactly, so a newly unadopted line fails instead of joining it. */
const COMPOSED={
 '3-5':'not in Source: the coach ships the later §3-7 SUPPLY line instead (whether §3-5 is the same surface is a User question, not settled here)',
 '4-10':"'폐기까지 '+days+'일' (app.js stock row)",
 '5-4':"presentation.js labels.visitGold + formatted value",
 '5-5':"presentation.js labels.loyaltyBonus + formatted value",
 '6-5':"presentation.js heroLine(): who+' 덕분에 '+said",
 '8-6':'app.js guide: ${D.balance.deathLimit} (10) in the template',
 '11-6':"relics.js: HQ price floor constant concatenated into the effect text"};
/* A composed line whose words ALSO occur, by coincidence, inside another shipped literal - so the
   substring search finds it although its own surface is still composed. Named, so the exact-set
   comparison below stays exact. */
const COINCIDENT={
 '5-4':"'방문 시 소지금 +50G' also sits inside 원정 전문 인증's approved §11-24 text (…다음 방문 시 소지금 +50G.)"};
test('COPY_AUDIT: every other literal `현재` line is in shipped Source',()=>{
 const walk=d=>fs.readdirSync(path.join(root,d),{withFileTypes:true}).flatMap(e=>e.isDirectory()?
  (e.name==='vendor'?[]:walk(d+'/'+e.name)):/\.(js|html)$/.test(e.name)?[d+'/'+e.name]:[]);
 const src=walk('dist').map(read).join('\n').replace(/\\`/g,'`');
 const missing=new Set();let checked=0,sec=null,mode=null;
 for(const l of read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md').split('\n')){let h;
  if((h=l.match(/^##\s+(\d+)-\d+\./))){sec=h[0].match(/\d+-\d+/)[0];mode=null;if(+h[1]>=16&&+h[1]<=20)sec=null;continue;}
  if(/^#\s/.test(l)){sec=null;continue;}
  if((h=l.match(/^\*\*([^*]+)\*\*/))&&!l.startsWith('>')){mode=h[1];continue;}
  if(/^#{2,3}\s/.test(l)){mode=null;continue;}
  const q=l.match(/^>\s*(.+?)\s*$/);if(!q||!sec||!mode||!mode.startsWith('현재')||/[{}]|\*\*/.test(q[1]))continue;
  checked++;if(!src.includes(q[1]))missing.add(sec);}
 assert.ok(checked>=150,'the audit parse found the literal lines ('+checked+')');
 assert.deepEqual([...missing].sort(),Object.keys(COMPOSED).filter(k=>!(k in COINCIDENT)).sort(),'only the listed composed lines are absent as one literal');
});

test('§11.1 BAD: a variant is a different observation, not a synonym swap',()=>{
 // The canonical BAD example is 다쳤어요 / 부상을 입었어요 / 상처를 입었어요 — same sentence,
 // different word. Two variants that share almost all of their content words are that.
 // A line the User approved verbatim in COPY_AUDIT is held by the exact-copy guard above instead:
 // this word-overlap heuristic judges any line that is NOT approved copy.
 const words=s=>new Set(s.replace(/[“”.,!?…]/g,'').split(/\s+/).filter(w=>w.length>1));
 const isApproved=l=>Object.values(approved).some(a=>a.includes(l));
 for(const [name,pool] of allPools)
  for(let i=0;i<pool.length;i++)for(let j=i+1;j<pool.length;j++){
   if(isApproved(pool[i])&&isApproved(pool[j]))continue;
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

test('SA-Q25: the helped-return callback needs COMPLETE proven sold-Item contribution',()=>{
 /* `n.events.length` used to gate this - a Trait-only event (강골's injury-guard downgrade,
    for one) satisfied it with nothing the Player sold. It now reads n.records.at(-1).heroProof,
    the same persisted DUNGEON_HAZARD RESULT-PROOF record NIGHT itself proves a Hero Item line
    from - {outcome, state}, either half possibly null - never events.length, Bag presence or
    generic Item history. Every 6th visit is the only Day this gate is even checked (§11.2), so
    every case here is built on visit 6. */
 const setup=()=>{const g=new Game();g.autosave=false;g.start('copy-helped');g.morning();
  const n=g.run.npcs.find(x=>x.id===g.run.queue[0]);n.introduced=true;n.newToday=false;n.injury=0;n.loyalty=0;n.traits=[];n.visits=5;
  g.run.queue=[n.id];g.run.cursor=0;return {g,n};};
 // A — a previous result with only a Trait contribution (heroProof null) is not proof of a sale
 {const {g,n}=setup();
  n.records=[{outcome:'퇴각',items:[],events:[{id:'injury-guard',text:'강골이 부상 단계를 낮췄다.'}],heroProof:null}];
  g.arrive();
  assert.ok(!V.helped.includes(g.run.say.text),'A: a Trait-only previous result draws no helped callback');
  assert.ok(V.back.includes(g.run.say.text),'and falls through to the ordinary return pool');
 }
 // B — an Item was carried but produced no proven contribution (heroProof null either way)
 {const {g,n}=setup();
  n.records=[{outcome:'성공',items:['rice'],events:[],heroProof:null}];
  g.arrive();
  assert.ok(!V.helped.includes(g.run.say.text),'B: a carried, unproven Item draws no helped callback');
 }
 // C — a proven Outcome contribution from a sold Item IS eligible
 {const {g,n}=setup();
  n.records=[{outcome:'퇴각',items:['bandage'],events:[{id:'hazard',hazards:['poison'],items:['bandage'],prevented:true}],
   heroProof:{outcome:{items:['bandage'],worse:'부상'},state:null}}];
  g.arrive();
  assert.ok(V.helped.includes(g.run.say.text),'C: a proven Outcome contribution makes the callback eligible');
 }
 // D — a proven persistent-state (구급키트 Aftercare) contribution IS eligible, even though the
 // text Outcome is unchanged (outcome:null)
 {const {g,n}=setup();
  n.records=[{outcome:'중상',items:['kit'],events:[{id:'aftercare',items:['kit'],text:'구급키트가 중상 후 상태를 부상까지 낮췄다.'}],
   heroProof:{outcome:null,state:{items:['kit']}}}];
  g.arrive();
  assert.ok(V.helped.includes(g.run.say.text),'D: a proven Aftercare state contribution makes the callback eligible too');
 }
 // E — Save -> Load preserves eligibility: the same persisted proof produces the same callback
 // decision after a full JSON round-trip, not just in the live in-memory object.
 {const {g,n}=setup();
  n.records=[{outcome:'퇴각',items:['bandage'],events:[{id:'hazard',hazards:['poison'],items:['bandage'],prevented:true}],
   heroProof:{outcome:{items:['bandage'],worse:'부상'},state:null}}];
  g.save();
  const reloaded=Save.import(Save.export(g.account,g.run));
  const h=new Game(reloaded.account,reloaded.run);h.autosave=false;
  h.arrive();
  assert.ok(V.helped.includes(h.run.say.text),'E: the reloaded run still finds the same proof and the same eligibility');
 }
 // F — Task D final correction §8B/§9: a GENERIC whole-Bag persistent-state proof
 // (state:{items:null}, no single Item named) is eligible too - the callback does not require
 // a named Item, only a proven state contribution.
 {const {g,n}=setup();
  n.records=[{outcome:'중상',items:['kit','kit'],events:[{id:'aftercare',items:['kit'],text:'구급키트가 중상 후 상태를 부상까지 낮췄다.'}],
   heroProof:{outcome:null,state:{items:null}}}];
  g.arrive();
  assert.ok(V.helped.includes(g.run.say.text),'F: a proven but generic (whole-Bag) state contribution is still eligible, with no named Item required');
 }
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

test('COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT: tracked picks avoid the last 3 Surface beats and an NPC\'s own last line',()=>{
 // Omitting `run` (every call above) must stay exactly the old pure pick - the guard the
 // determinism test above already locks in. Only an explicit `run` turns tracking on.
 const run={},n={id:'recent-1',traits:[],injury:0,newToday:false};
 const seen=[];
 for(let day=1;day<=8;day++){
  const line=Copy.arrive(n,day,false,run);
  assert.ok(!seen.slice(-3).includes(line),'day '+day+': not one of the last 3 shown on ARRIVAL: '+line);
  seen.push(line);
 }
 assert.ok(run.recentLines.arrival.length<=3,'the tracked Surface buffer never grows past 3');
 // A second NPC reads the SAME Run-level Surface buffer - the exclusion is cross-NPC.
 const m={id:'recent-2',traits:[],injury:0,newToday:false};
 const justShown=run.recentLines.arrival.slice();
 const otherLine=Copy.arrive(m,9,false,run);
 assert.ok(!justShown.includes(otherLine),'a different NPC on the same Surface avoids the same recent lines too');
 // Omitting `run` never mutates anything the tracked calls above rely on, and the plain
 // pick is still exactly the deterministic hash function it always was.
 const untouched={id:'recent-3',traits:[],injury:0,newToday:false};
 const bare1=Copy.arrive(untouched,3,false),bare2=Copy.arrive(untouched,3,false);
 assert.equal(bare1,bare2,'an untracked call stays a pure function of its own arguments');
 assert.equal(untouched.lastLine,undefined,'an untracked call writes no state onto the NPC');
});

test('COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT — SALE and NIGHT Surfaces, independent buffers, same-NPC immediate repeat blocked',()=>{
 const nn=id=>({id,traits:[],injury:0,newToday:false});
 // SALE: buy() and refuse() share one 'sale' Surface bucket.
 const run={},shopper=nn('sale-1');
 const seenSale=[];
 for(let day=1;day<=8;day++){
  const line=Copy.buy(shopper,'rice','full',day,run);
  assert.ok(!seenSale.slice(-3).includes(line),'SALE day '+day+': not one of the last 3 shown: '+line);
  seenSale.push(line);
 }
 const justShown=run.recentLines.sale.slice();
 const refuseLine=Copy.refuse(shopper,'rice','price',9,run);
 assert.ok(!justShown.includes(refuseLine),'refuse() reads the SAME SALE Surface buffer buy() already filled');
 // cross-NPC exclusion on SALE
 const other=nn('sale-2'),beforeOther=run.recentLines.sale.slice();
 const otherLine=Copy.buy(other,'rice','full',10,run);
 assert.ok(!beforeOther.includes(otherLine),'a different NPC on SALE avoids the same recent lines too');

 // NIGHT, tracked on the SAME shared `run` used for SALE above, to prove the two Surface
 // buffers are independent rather than one shared bucket.
 const traveler=nn('night-1'),seenNight=[];
 for(let day=1;day<=8;day++){
  const line=Copy.night({outcome:'퇴각',day,items:[],changes:[]},traveler,run);
  assert.ok(!seenNight.slice(-3).includes(line),'NIGHT day '+day+': not one of the last 3 shown: '+line);
  seenNight.push(line);
 }
 assert.ok(run.recentLines.night.every(l=>N.retreat.includes(l)),'the NIGHT buffer holds only NIGHT lines');
 assert.ok(run.recentLines.sale.every(l=>!N.retreat.includes(l)),'NIGHT tracking never touched the SALE buffer');
 assert.equal((run.recentLines.arrival||[]).length,0,'ARRIVAL stayed untouched - nothing here ever called arrive()');

 // Same-NPC immediate repeat, proven on all three tracked Surfaces: calling the identical
 // situation (same NPC, same day) twice in a row means the deterministic hash key is IDENTICAL
 // both times, so an untracked pick would trivially repeat - only the recent-repeat rule can
 // be the reason the second call differs.
 const arriveTwice=(()=>{const r={},p=nn('repeat-arrival');
  const first=Copy.arrive(p,5,false,r);return [first,Copy.arrive(p,5,false,r)];})();
 assert.notEqual(arriveTwice[0],arriveTwice[1],'ARRIVAL: the same NPC does not immediately repeat its own last line');
 const saleTwice=(()=>{const r={},p=nn('repeat-sale');
  const first=Copy.buy(p,'rice','full',5,r);return [first,Copy.buy(p,'rice','full',5,r)];})();
 assert.notEqual(saleTwice[0],saleTwice[1],'SALE: the same NPC does not immediately repeat its own last line');
 const nightTwice=(()=>{const r={},p=nn('repeat-night'),rep={outcome:'중상',day:5,items:[],changes:[]};
  const first=Copy.night(rep,p,r);return [first,Copy.night(rep,p,r)];})();
 assert.notEqual(nightTwice[0],nightTwice[1],'NIGHT: the same NPC does not immediately repeat its own last line');

 // No Gameplay RNG is read or written by any tracked SALE/NIGHT pick either.
 const g=new Game();g.autosave=false;g.start('recent-rng-sale-night');
 const before=g.rng.state,buyer=g.run.npcs[0],rr={};
 for(let d=1;d<=5;d++)Copy.buy(buyer,'rice','full',d,rr);
 for(let d=1;d<=5;d++)Copy.night({outcome:'퇴각',day:d,items:[],changes:[]},buyer,rr);
 assert.equal(g.rng.state,before,'tracked SALE and NIGHT picks consume no Gameplay RNG');
});

test('COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT — Save/Load regression, and an older save with no tracking fields still loads',()=>{
 const a=new Game();a.autosave=false;a.start('recent-save');a.buyRelic(a.run.relicWindow.candidateIds[0]);
 a.beginOrder();a.open();
 // Drive several real tracked ARRIVAL beats through the actual Run flow, then land back on
 // the NPC currently at the counter so its own `lastLine` is guaranteed to be set.
 for(let i=0;i<3&&a.run.phase==='sell'&&a.run.cursor<a.run.queue.length-1;i++)a.depart();
 const n=a.current();
 const preLine=a.run.say.text;
 assert.ok(a.run.recentLines&&a.run.recentLines.arrival.length>0,'a real arrival populates the tracked Surface buffer');
 assert.equal(n.lastLine.arrival,preLine,'the NPC\'s own last ARRIVAL line is recorded');
 a.save();
 const loaded=Save.import(Save.export(a.account,a.run));
 assert.deepEqual(loaded.run.recentLines,a.run.recentLines,'run.recentLines survives a Save export/import round trip');
 const reloadedNpc=loaded.run.npcs.find(x=>x.id===n.id);
 assert.deepEqual(reloadedNpc.lastLine,n.lastLine,'the NPC\'s lastLine survives the round trip');
 const b=new Game(loaded.account,loaded.run);b.autosave=false;
 assert.equal(b.run.say.text,preLine,'a reload does not reword the line the Player already read');
 // The next tracked pick after reload still obeys the SAME exclusion state - re-asking for the
 // identical situation (same NPC, same Day) must not trivially repeat the just-reloaded line.
 const nextLine=Copy.arrive(b.run.npcs.find(x=>x.id===n.id),b.run.day,false,b.run);
 assert.notEqual(nextLine,preLine,'the next tracked pick after reload still honors the reloaded exclusion state');

 // An older valid v8 save with no recentLines/lastLine at all (pre-adoption) must still load -
 // no new save version or migration layer was added for this amendment.
 const legacy=JSON.parse(Save.export(a.account,a.run));
 delete legacy.run.recentLines;
 for(const np of legacy.run.npcs)delete np.lastLine;
 assert.ok(Save.valid(legacy),'a pre-adoption v8 save with no tracking fields at all is still a valid save');
 const restored=Save.import(JSON.stringify(legacy));
 const c=new Game(restored.account,restored.run);c.autosave=false;
 assert.doesNotThrow(()=>c.arrive(),'a reload from a pre-adoption save can still take a tracked ARRIVAL beat');
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
 /* COPY_AUDIT §8-4 replaced that guide paragraph, and SA-Q02 removed the promise it answered.
    With no surface claiming Traits are hidden, the guide has nothing left to deny. */
 for(const promise of ['숨겨진 특성','남은 특성','더 친해지면'])
  assert.ok(!app.includes(promise),'no surface promises a hidden-Trait reveal: '+promise);
 /* §13.2 — the destination lesson teaches the system rule, not one Trait name. The approved
    hotfix copy says the same rule in one sentence; what the guard protects is that the rule
    is stated at all and that no single Trait is named as the reason. */
 assert.ok(app.includes('특성·당일 상황에 따라 바뀔 수 있다'),
  'the canonical destination wording is used verbatim');
 for(const t of Object.values(DATA.traitBy||{}))
  if(t&&t.name)assert.ok(!app.includes('특성·당일 상황에 따라 바뀔 수 있다'+t.name),
   'and no single Trait is named as the reason: '+t.name);
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

test('SALE: a reaction leaves the screen without leaving the Run',()=>{
 /* UI-Q110. The balloon used to stay until the engine replaced it, which on a phone meant a
    permanent row in the counter band. It is transient now - three seconds, or a tap - but
    that is a presentation timer only: what it may do is take the node off the screen. The
    dialogue itself stays where it was, owned by the engine and written into the Save, so a
    hidden balloon is never a cleared line. */
 const app=read('dist/ui/app.js');
 const hide=app.slice(app.indexOf('function hideSpeech('),app.indexOf('function armSpeech('));
 const arm=app.slice(app.indexOf('function armSpeech('),app.indexOf('\n// NIGHT'));
 assert.ok(/setTimeout\(hideSpeech,SAY_MS\)/.test(arm),'the balloon is dismissed on a timer');
 assert.ok(/SAY_MS=3000/.test(app),'that timer is the canonical three seconds');
 for(const src of [hide,arm]){
  assert.ok(!/\.say\s*=/.test(src),'hiding the balloon never writes the dialogue');
  assert.ok(!/game\.save\(\)|Save\./.test(src),'hiding the balloon never touches the Save');
 }
 // Only a genuinely new line clears the hidden marker, so a plain redraw cannot resurrect
 // a balloon the player already dismissed.
 assert.ok(/if\(key!==sayKey\)\{sayKey=key;sayHidden=false;\}/.test(app),
  'only a new speaker/line pair re-shows the balloon');
 // What writes a line is the engine: the next thing this customer says, or the next customer.
 const shop=read('dist/systems/shop.js');
 assert.ok(/arrive\(\)\{.*?\.say=/.test(shop.replace(/\n/g,'')),'a new customer sets their own line');
 assert.ok(/s\.say=null/.test(shop),'the line is cleared when the day turns over, not by a timer');
});

test('D-5 / EVENT §3-1: an Event says what it switched on, at the precision the rest of the catalog uses',()=>{
 const by=id=>DATA.events.find(e=>e.id===id);
 /* These five described their effect in the abstract while every other Event in the catalog
    gave a figure, so the player could not tell what had actually changed. Each number below
    is the one its own rule applies. */
 assert.ok(/요구 전력 \+12% · 원정 보상 \+30%/.test(by('overflow').description),'몬스터 범람 states both multipliers');
 assert.equal(by('overflow').effects.danger,1.12);assert.equal(by('overflow').effects.reward,1.3);
 assert.ok(/구매 의사 \+20%p/.test(by('festival').description),'왕도 축제 states the intent it adds');
 assert.equal(by('festival').effects.foodDemand,.2);
 assert.ok(/구매 의사 \+20%p/.test(by('clinic').description),'치유소 휴무 too');
 assert.equal(by('clinic').effects.medicalDemand,.2);
 /* COPY_AUDIT §13-11 states the same rule as a total rather than per-item: the charge is
    min(100G, waste x 5G) once cumulative waste reaches 6. */
 assert.ok(/6건 이상이면 총 폐기 수 ×5G[^·]*· 최대 100G/.test(by('audit').description),'본사 재고 감사 states the trigger and the cap');
 assert.ok(/waste>=6\?Math\.min\(100,s\.stats\.waste\*5\)/.test(read('dist/systems/shop.js')),'which is the rule it applies');
 assert.ok(/특별 발주 1건 · 매입가 \+35%/.test(by('blackmarket').description),'암시장 상인 states the markup');
 assert.ok(/rollOffer\(2,1\.35\)/.test(read('dist/systems/shop.js')),'which is the offer it rolls');
 // and nothing in the catalog went back to describing an effect without saying what it is
 for(const e of DATA.events)
  assert.ok(!/(위험|보상|의사|매입가) (증가|감소)$/.test(e.description),e.name+' still describes its effect in the abstract');
});

test('D-16 / D-19 / D-20 / D-25: the words match the channel the engine actually moves',()=>{
 /* Each multiplier names the channel it actually moves, never 음식/포션 고유 효과, which would
    claim every effect the item has. Under ITEM_v2.7 foodMult joins the positive native
    Core-Stat pool - all four Stats, not 강인함 alone - so the label widened with it.
    potionMult was written as survival-only at x1.30 while NPC_TRAIT_v2.7 §POTIONBODY says a
    Potion's POSITIVE NATIVE Core Stat x1.15 - and every v2.7 Potion carries combat, so the
    Trait moved nothing. Both assertions below described that stale implementation; they now
    describe the Canonical one, and the label widened for the same reason foodMult's did. */
 const dungeon=read('dist/systems/dungeon.js');
 /* Both multipliers live in one function now - `nativeStatFactor` is the whole answer to what
    multiplies an Item's positive native Core Stat - so the channel each one names is read off
    that function rather than off four scattered conditionals. */
 const factor=dungeon.slice(dungeon.indexOf('function nativeStatFactor('),dungeon.indexOf('function hazardCounterFactor('));
 assert.ok(/if\(!STAT_KEYS\.includes\(k\)\|\|v<=0\)return 1;/.test(factor),'the pool is positive native Core Stat only');
 assert.ok(/pool=isFood\?mult\.foodMult-1:0/.test(factor),'foodMult enters the native Core-Stat pool');
 assert.ok(/item\.category==='potion'\)return mult\.potionMult/.test(factor),'potionMult reaches a Potion positive native Core Stat');
 assert.ok(!/mult\.(food|potion)Mult/.test(dungeon.replace(factor,'').replace(/foodMult:1,potionMult:1/g,'')),
  'and neither multiplier is applied anywhere else');
 assert.equal(Presentation.labels.foodMult,'음식의 능력치','so the label names that channel');
 assert.equal(Presentation.labels.potionMult,'포션의 능력치','and so does the potion one');
 for(const id of ['eater','small'])
  assert.ok(!DATA.traitBy[id].note,'with the channel named, '+id+' no longer needs a note denying the others');

 /* A threshold the player is subject to is not written out by hand next to the rule that
    uses it - both read the same constant, so the sentence cannot drift from the behaviour. */
 assert.ok(Presentation.labels.priceBias.startsWith(String(DATA.balance.frugalThreshold)),
  'the frugal label is built from the threshold it describes');
 const guarantee=DATA.relicBy.guarantee;
 assert.ok(guarantee.description.includes(guarantee.minPrice+'G'),'the guild guarantee states what 고가상품 means');
 assert.ok(read('dist/systems/shop.js').includes('D.relicBy.guarantee.minPrice'),'from the same number the rule reads');
 /* the existing threshold given a name, not a new tuning lever: it belongs to the relic whose
    rule it is, and never became a Balance/PASS3 parameter */
 assert.ok(!('guaranteeMinPrice' in DATA.balance),'it is not owned by D.balance');
 assert.ok(!read('dist/data/relics.js').includes('D.balance.guaranteeMinPrice'),'and nothing puts it there');

 /* 포만감 was a third named effect in two Relic descriptions. There is no such channel.
    Under RELIC_v2.7 these two move the native Core Stat and leave Supply alone, so the
    description has to say the channel it moves and the ones it does not. */
 for(const id of ['kitchen','fresh24']){
  assert.ok(!DATA.relicBy[id].description.includes('포만감'),id+' no longer names an effect that does not exist');
  assert.ok(/능력치 증가 효과/.test(DATA.relicBy[id].description),id+' names the channel it does move');
  assert.ok(/보급/.test(DATA.relicBy[id].description)&&!/보급·능력치|보급 효과 \+/.test(DATA.relicBy[id].description),
   id+' does not claim the Supply it leaves unchanged');
 }

 /* D-16: the description slot is flavour. Where it only restated the effect line it told the
    player nothing they could not read one line up. Rules that live ONLY there are kept. */
 for(const [id,banned] of [['ice','화염 대응'],['kit','중상 위험을 줄여'],
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

 /* The ten v2.7 Epics shipped with the flavour slot empty because Canonical gave names and no
    prose. The approved copy is now in, and it is flavour: it may not name a channel, a number
    or a Hazard, because the effect line one row up is where that truth lives. */
 const EPIC_FLAVOUR={
  spiderkit:'손목을 앞으로 내밀어도 아무것도 나오진 않는다.',
  slimesuit:'방수 테스트에 쓴 액체는 묻지 않는 게 좋다.',
  cryptlantern:'성당 납품용이었는데 어쩌다 편의점까지 왔다.',
  snowvisor:'김은 안 서린다. 눈썹은 얼 수 있다.',
  magmagear:'설명서 첫 줄: 마그마에 직접 넣지 마시오.',
  battlelunch:'동쪽 나라의 인심 좋은 어머님이 떠오르는 구성.',
  herobar:'왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.',
  hyperenergy:'마시고 나면 계산대보다 먼저 문을 나선다.',
  sageelixir:'한 모금 마시면 괜히 턱을 쓰다듬게 된다.',
  toppotion:'병은 작다. 값은 작지 않다.'};
 for(const [id,text] of Object.entries(EPIC_FLAVOUR)){
  const it=DATA.itemBy[id];
  assert.ok(it,'the catalog still has '+id);
  assert.equal(it.description,text,it.name+' carries the approved flavour verbatim');
  assert.ok(!/[0-9]/.test(it.description),it.name+' flavour states no number');
  for(const label of Object.values(Presentation.labels))
   assert.ok(!it.description.includes(label),it.name+' flavour names no effect channel: '+label);
  for(const hz of Object.values(DATA.hazards))
   assert.ok(!it.description.includes(hz),it.name+' flavour names no Hazard: '+hz);
 }
 /* The last two v2.7 additions received their approved copy too, so the flavour slot is now
    filled for the whole active catalogue and a blank one is a regression. */
 assert.equal(DATA.itemBy.herbtea.description,'마시기 전에 심호흡부터 하는 손님이 많다.');
 assert.equal(DATA.itemBy.midpotion.description,'하급은 불안하고 상급은 비쌀 때.');
 for(const it of DATA.items)assert.ok(it.description&&it.description.trim(),it.name+' has flavour');
});

/* COPY_AUDIT_APPROVED_v2.8.0 §11 — STORE SUPPORT 30/30. The approved amendment is exact Player
   text, so this is equality, not a pattern: a paraphrase, a dropped middot or a stale number is
   a FAIL here rather than something a looser assertion can absorb. Price and name are pinned in
   the same table because §11 renames two rows and RELIC_v2.8 re-prices two more, and a row that
   reads right at the wrong price is still the wrong row. */
test('COPY_AUDIT §11: all 30 Store Support names / prices / descriptions are the approved text',()=>{
 const SUPPORTS=[
  ['bulk','묶음발주 계약',130,'같은 상품 3개 이상 발주 시 3번째부터 매입가 -20%.'],
  ['rotation','회전 진열대',80,'전날 4건 이상 판매 시 다음 날 모든 상품 공급 수량 +2.'],
  ['stamp','단골 스탬프 기계',130,'유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도 제외.'],
  ['member','회원 관리대장',130,'다음 날부터 이미 만난 손님의 재방문 가중치 +70%.'],
  ['showcase','희귀상품 입고 계약',140,'희귀 이상 상품 발주 가중치 +70%.'],
  ['guarantee','길드 보증 진열대',140,'하루 1회 · 200G 이상에 판 첫 상품 판매가의 20%를 본사가 손님 대신 부담 · 점주는 판매가 전액 수령.'],
  ['hazardBoard','원정 위험 게시판',80,'오늘 게이트의 위험에 대응하는 상품의 발주 후보 가중치 +50%.'],
  ['medicine','야전 정비대',110,'판매한 야외장비의 위험 대응 수치 +40%.'],
  ['fridge','대형 냉장고',80,'음식·음료 유통기한 +2일 · 확보 시 보유 중인 해당 재고도 1회 연장.'],
  ['kitchen','즉석식품 코너',170,'음식·음료가 원래 가진 능력치 증가 효과 +25% · 보급·위험 대응·부작용 제외 · 다음 날부터 기본 운영비 +10%.'],
  ['board','길드 전광판',110,'하루 기본 최소 방문객을 4명으로 변경 (기존 3명).'],
  ['rookieBoard','첫 방문 쿠폰',110,'처음 방문한 손님의 소지금 +30G 추가 · 구매 의사 +20%p.'],
  ['groupFlyer','단체 주문 창구',200,'매일 아침 20% 확률로 방문객 +1명 · 하루 5번째 판매부터 판매마다 +15G 추가 지급.'],
  ['memberBundle','단골 묶음혜택',190,'단골 손님마다 오늘 두 번째로 사는 상품은 손님이 판매가의 절반만 지불 · 나머지 절반은 본사가 채워 점주는 판매가 전액 수령.'],
  ['premiumMember','프리미엄 멤버십',200,'단골 손님 방문 시 소지금 +25G · 희귀 이상 상품 구매 의사 +15%p.'],
  ['returnPoints','귀환 적립제',240,'오늘 유료 구매한 재방문 손님 생환 시 단골도 +5 · 소지금 +30G.'],
  ['expeditionMeal','원정 도시락 코너',200,'음식·음료 1개당 보급 +2 · 갈 게이트의 모든 위험 대응 +4.'],
  ['coldcase','냉장 유통 계약',180,'고급 이상 음식·음료 발주 가중치 +80% · 구매 의사 +16%p · 유통기한 +1일 · 확보 시 보유 중인 해당 재고도 1회 연장.'],
  ['supplyCert','길드 납품 인증',220,'오늘 게이트의 위험에 대응하는 희귀 이상 상품 또는 희귀 이상 보험 판매 시 정가의 20% 추가 지급 · 그 손님 소지금 +30G.'],
  ['dawnBulk','새벽 회수 계약',190,'유통기한이 끝난 음식·음료는 폐기 대신 매입가의 50% 회수 · 매일 첫 발주 후보에 음식 또는 음료 1칸 추가.'],
  ['logisticsHQ','물류 본부계약',300,'전날 6건 이상 판매 시 오늘 같은 상품 3개 이상 발주 매입가 -30%.'],
  ['lifetime','평생 단골제',310,'단골 손님 생환 시 하루 1회 소지금 +50G · 다음 방문 가중치 +50%.'],
  ['royalCert','왕도 프리미엄 인증',320,'150% 가격 판매 시 판매가의 20% 추가 지급 · 150% 가격 구매 의사 +16%p.'],
  ['expeditionCert','원정 전문 인증',290,'위험 대응 상품의 위험 대응 수치 +60% · 그 상품을 산 손님 다음 방문 시 소지금 +50G.'],
  ['fresh24','24시간 신선체계',360,'음식·음료가 원래 가진 능력치 증가 효과 +50% · 보급·위험 대응·부작용 제외 · 음식·음료 매입가 +25%.'],
  ['hub','지역 거점점 계약',340,'다음 날부터 방문객 +1명 45% · +2명 15% · 증가 없음 40% · 기본 운영비 +10%.'],
  ['warehouse','후방 창고 증설',130,'창고 용량 +10칸.'],
  ['terminal','본사 추가발주권',130,'다음 발주 후보 생성부터 발주 후보 +2개.'],
  ['delivery','발주 교환권',120,'매일 첫 후보 전체 교환 무료 · 이후 50G → 100G → 200G… 순으로 증가.'],
  ['efficiency','운영 효율 매뉴얼',130,'다음 날부터 기본 운영비 -30G.']];
 assert.equal(SUPPORTS.length,30,'§11 audits all 30 Store Supports');
 assert.deepEqual(DATA.relics.map(r=>r.id),SUPPORTS.map(r=>r[0]),'the catalogue is exactly those 30, in order');
 for(const [id,name,price,description] of SUPPORTS){
  const r=DATA.relicBy[id];
  assert.ok(r,'the catalogue still has '+id);
  assert.equal(r.name,name,id+' name is the approved §11 text');
  assert.equal(r.price,price,id+' price is the approved baseline');
  assert.equal(r.description,description,id+' description is the approved §11 text, verbatim');
 }
 /* REL-Q-v28-1: the two renamed rows really dropped 쇼케이스, and the Decoration that owns the
    word keeps it. */
 for(const id of ['showcase','coldcase'])assert.ok(!DATA.relicBy[id].name.includes('쇼케이스'),id+' no longer reuses 쇼케이스');
 assert.ok(DATA.decorations.some(d=>d.name==='프리미엄 쇼케이스'),'the Decoration of that name is untouched');
 /* REL-Q-v28-10 / SA-Q26: the exact stale phrases the amendment retires, gone from every row. */
 const all=DATA.relics.map(r=>r.description).join('\n');
 /* '+25G' left this list with the 2026-09-23 rebalance: 프리미엄 멤버십's approved copy now says 소지금 +25G */
 for(const stale of ['무료 보급','치료·야외장비','50G부터','최소 4명','8건 이상','+12G','8%를','바가지','15G 절감','신선식품 발주'])
  assert.ok(!all.includes(stale),'no Store Support row still says "'+stale+'"');
 /* §11-31: the acquired state reads as 확보/보유, not 설치 - 계약·인증·매뉴얼 are not installed. */
 const app=read('dist/ui/app.js');
 assert.ok(app.includes('확보 완료 · ')&&!app.includes('설치 완료 · '),'the purchased banner says 확보 완료');
 assert.ok(app.includes("mine?'보유 중'")&&!app.includes("mine?'설치됨'"),'an owned row reads 보유 중');
});

/* SA-Q23 / Q24 — FALSE DIALOGUE IMPLICATIONS. Six lines implied a mechanic the game does not
   have: an Item the customer is asking for, a price rule, or a remembered favourite SKU. They
   were replaced one for one (a since-superseded pool-size snapshot used to pin that here); the
   COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE pass has since grown every one of these Pools to its
   own approved minimum, checked in §11.1/§11.2 above - the approved replacement lines just need
   to still be present in their own Pool. */
test('SA-Q23/Q24: no arrival line implies a mechanic the game does not have',()=>{
 const lines=allLines.join('\n');
 for(const gone of ['귀환석 있습니까','많이 든 걸로 주세요','먹을 게 제일 급해요',
                    '비싼 게 좋은 거 아닌가요','이왕이면 좋은 걸로 봅시다','늘 먹던 걸로 주세요'])
  assert.ok(!lines.includes(gone),'the false implication is gone: '+gone);
 for(const [pool,line] of [
  [V.trait.coward,'“오늘은 무사히 다녀오는 게 목표입니다.”'],
  [V.trait.eater,'“원정 끝나면 밥부터 먹어야겠어요.”'],
  [V.trait.eater,'“배고픈 채로 돌아오는 건 딱 질색입니다.”'],
  [V.trait.greed,'“오늘은 빈손으로 돌아올 생각 없습니다.”'],
  [V.trait.greed,'“이번엔 전리품 좀 제대로 챙겨와야죠.”'],
  [V.regular,'“이 정도면 단골 맞죠?”']])
  assert.ok(pool.includes(line),'the approved replacement is in its own pool: '+line);
 // no Favorite-SKU state was invented by the replacement, then or since
 assert.ok(!/favorite|favouriteItem|lastItem|usualItem/i.test(read('dist/systems/adventurer.js')+read('dist/data/copy.js')),
  'no Favorite-SKU state was created');
 // no line names an Item, which is what made the old ones read as a request
 for(const it of DATA.items)assert.ok(!lines.includes(it.name),'no arrival line names an Item: '+it.name);
});

/* SA-Q37 — EVENT 22/22. COPY_AUDIT_APPROVED §13 is the exact owner of every Event's Flavor and
   Function. This is a 1:1 equality table: a paraphrase, a missed row or a stale example is a
   FAIL here rather than something a pattern absorbs. Mechanics are out of scope and untouched -
   the effects objects are asserted to be exactly what they were. */
test('SA-Q37 / COPY_AUDIT §13: all 22 Events carry the approved Flavor and Function',()=>{
 const APPROVED=[
  ['logistics','물류대란','북문 운송로가 막혔다. 오늘 들어온 상자마다 우회 운임 딱지가 붙어 있다.','오늘 모든 발주 매입가 +15%'],
  ['oneplus','본사 1+1 행사','입고표엔 한 상자였는데 두 상자가 왔다. 본사 행사품이라고 한다.','지정 발주 상품 1종 · 1개 발주 시 2개 입고'],
  ['pilgrimage','게이트 순례주간','성지 순례 깃발이 게이트 거리를 메웠다. 행렬을 따라 길을 바꾸는 모험가도 있다.','오늘 방문객 중 1~3명의 목적지가 다른 열린 게이트로 바뀔 수 있음'],
  ['overflow','몬스터 범람','경비병들이 게이트 앞 울타리를 한 겹 더 둘렀다. 안쪽 울음소리가 오늘따라 가깝다.','오늘 게이트 요구 전력 +12% · 원정 보상 +30%'],
  ['potionPrice','포션 가격 폭등','연금술사 조합의 새 가격표가 붙었다. 어제 붙인 종이 위에.','오늘 포션 매입가 +35%'],
  ['coldwave','한파','아침부터 진열대 유리가 서렸다. 게이트 쪽 바닥에는 얇은 얼음이 잡혔다.','적용 가능한 게이트에 냉기 위험 추가'],
  ['shortage','포션 공급 중단','배송 마차에서 포션 칸만 비어 있었다.','오늘 포션 발주 등장률 대폭 감소'],
  ['rookie','신입 모험가 시즌','길드 등록대 앞에 새 장비 냄새가 난다. 이름표가 아직 빳빳한 모험가들이 줄을 섰다.','오늘 신규 모험가 1명 방문'],
  ['royal','왕립 기사단 방문','왕립 문장이 박힌 마차가 길드 앞에 섰다. 주변 모험가들이 슬쩍 길을 비킨다.','오늘 신규 모험가 1명 방문 · 레벨·희귀도 상향'],
  ['blackmarket','암시장 상인','개점 전, 뒷문 앞에 주인 없는 상자가 놓여 있었다. 가격표만은 또박또박 붙어 있다.','오늘 희귀 이상 특별 발주 1건 · 매입가 +35%'],
  ['audit','본사 재고 감사','본사 감사관은 인사보다 장부를 먼저 찾았다.','누적 폐기 6건 이상이면 총 폐기 수 ×5G 운영비 추가 · 최대 100G'],
  ['festival','왕도 축제','왕도 쪽 음악이 게이트 앞까지 넘어온다. 원정 나서는 사람들 손에도 먹을 것이 들렸다.','오늘 음식·음료 구매 의사 +20%p'],
  ['strike','길드 파업','길드 정문에 현수막이 걸리고 접수창구가 닫혔다.','오늘 방문객 -1'],
  ['unknown','미확인 게이트','새벽 순찰대가 지도에 없는 게이트를 발견했다. 아직 이름도 없다.','오늘 고위험·고보상 임시 게이트 +1'],
  ['tasting','본사 반값 행사','본사 지원 도장이 찍힌 반값 쿠폰이 한 장 내려왔다.','오늘 첫 50% 할인 판매 · 본사 지원 +50G'],
  ['poisonfog','독안개','게이트 쪽 공기가 누렇게 흐려졌다. 경비병들이 천으로 입과 코를 가린다.','적용 가능한 게이트에 독 위험 추가'],
  ['caravan','보급 상단 도착','예정보다 이른 상단이 해 뜨기 전에 들어왔다. 창고 앞이 모처럼 북적인다.','오늘 발주 후보 +2'],
  ['payday','길드 급여일','급여일 아침, 길드 출입문마다 동전주머니 소리가 난다.','오늘 방문 모험가 · 현재 소지금의 20%만큼 추가 구매 가능'],
  ['clinic','치유소 휴무','치유소 문에 휴무 팻말이 걸렸다. 보험 창구 앞줄이 금세 길어졌다.','오늘 보험 상품 구매 의사 +20%p'],
  ['wastecover','본사 폐기 지원','본사가 오늘 폐기비를 대신 낸다. 점주는 공문 날짜를 두 번 확인했다.','오늘 폐기 비용 0G'],
  ['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.','오늘 방문객 +2'],
  ['nightshift','본사 야간 근무 수칙','본사 야간 근무 수칙\n1) 마감 전 창고 수량을 확인하십시오.\n2) 폐기 상품은 뒷문 옆 상자에 두십시오.\n3) 뒷문은 반드시 두 번 잠그십시오.\n5) 새벽 2시 이후 뒷문에서 세 번 노크가 들려도 열지 마십시오.\n4번 규정은 없습니다.','오늘 운영비 0G'],
 ];
 assert.equal(APPROVED.length,22,'§13 audits all 22 Events');
 assert.deepEqual(DATA.events.map(e=>e.id),APPROVED.map(r=>r[0]),'the catalogue is exactly those 22, in order');
 for(const [id,name,reveal,description] of APPROVED){
  const e=DATA.events.find(x=>x.id===id);
  assert.ok(e,'the catalogue still has '+id);
  assert.equal(e.name,name,id+' name');
  assert.equal(e.reveal,reveal,id+' Flavor is the approved §13 text, verbatim');
  assert.equal(e.description,description,id+' Function is the approved §13 text, verbatim');
 }
 // the two stale examples the amendment calls out by name
 const all=DATA.events.map(e=>e.reveal+'|'+e.description).join('\n');
 assert.ok(!all.includes('오늘 첫 50% 판매 · 본사 지원 +50G'),'the 50% 할인 correction is in');
 assert.ok(!all.includes('오늘 의료 상품 구매 의사 +20%p'),'and the 보험 correction is in');
 assert.ok(!/의료 상품/.test(all),'no Event still says 의료 상품');
 // §13-22 keeps the 1 -> 2 -> 3 -> 5 gap on screen, which is the whole joke
 const night=DATA.events.find(e=>e.id==='nightshift').reveal;
 assert.ok(/1\)[\s\S]*2\)[\s\S]*3\)[\s\S]*5\)/.test(night)&&!/\n4\)/.test(night),'the missing rule 4 survives');
 // mechanics are untouched: every Event keeps the exact effects and weight it had
 const EFFECTS={logistics:{price:1.15},oneplus:{double:1},pilgrimage:{pilgrimage:1},
  overflow:{danger:1.12,reward:1.3},potionPrice:{potionPrice:1.35},coldwave:{cold:1},
  shortage:{potionWeight:0.08},rookie:{rookie:1},royal:{royal:1},blackmarket:{blackmarket:1},
  audit:{audit:1},festival:{foodDemand:0.2},strike:{visitors:-1},unknown:{unknown:1},
  tasting:{tasting:1},poisonfog:{poison:1},caravan:{offers:2},payday:{wallet:1.2},
  clinic:{medicalDemand:0.2},wastecover:{wasteFree:1},bard:{visitors:2},nightshift:{overheadFree:1}};
 for(const e of DATA.events)assert.deepEqual(e.effects,EFFECTS[e.id],e.id+' mechanics are unchanged');
 assert.deepEqual(DATA.events.filter(e=>e.weight!==1).map(e=>e.id).sort(),['bard','nightshift'],
  'and so are the two rare weights');
});

console.log(count+' copy groups passed');
