// COPY_WORLD_VOICE §11 / §12 / §18 acceptance.
// Chunk F adopted terminology, Item Flavor, the name voice and the Night debug-language rule.
// This suite covers the part that was not adopted: the Dialogue and Result Variant Pools,
// the removed Rare Reference names (v2.9.11), and the §18 QA questions a Node process can answer.
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
 'visit.trait.impulse':6,'visit.trait.rich':6,'visit.trait.honest':6,'visit.trait.pyrophobia':6,
 'visit.trait.coldhand':6,'visit.trait.potionbody':6,'visit.trait.clumsy':6,'visit.trait.reckless':6,
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
   absence let the v2.8 expansion ship unapproved lines (archive/v2.8/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md). */
const POOL_SECTION={'visit.first':'16-1','visit.back':'16-2','visit.hurt':'16-3','visit.regular':'16-4','visit.helped':'16-5',
 'visit.trait.frugal':'17-1','visit.trait.thrifty':'17-2','visit.trait.coward':'17-3','visit.trait.liar':'17-4','visit.trait.eater':'17-5',
 'visit.trait.greed':'17-6','visit.trait.shy':'17-7','visit.trait.social':'17-8','visit.trait.collector':'17-9','visit.trait.aloof':'17-10',
 'visit.trait.impulse':'17-11','visit.trait.rich':'17-12','visit.trait.honest':'17-13','visit.trait.pyrophobia':'17-14',
 'visit.trait.coldhand':'17-15','visit.trait.potionbody':'17-16','visit.trait.clumsy':'17-17','visit.trait.reckless':'17-18',
 'sale.full':'18-1','sale.half':'18-2','sale.overcharge':'18-3','sale.refuse.price':'18-4','sale.refuse.overcharge':'18-4a','sale.refuse.need':'18-5','sale.refuse.choice':'18-6',
 'night.plain':'19-1','night.great':'19-2','night.retreat':'19-3','night.hurt':'19-4','night.severe':'19-5','night.avoided':'19-6',
 'night.rescued':'19-7','night.grew':'19-8','night.savedDeathWin':'19-10','night.savedDeathRetreat':'19-11','night.savedDeathHurt':'19-12','night.savedSevereWin':'19-13','night.savedPrepared':'19-14','night.savedHurt':'19-15','night.savedRetreat':'19-16','night.deathTraded':'20-1','night.deathKnown':'20-2','night.deathStranger':'20-3'};
const approved=(()=>{const out={};let sec=null,mode=null;
 for(const l of read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md').split('\n')){let h;
  if((h=l.match(/^##\s+(\d+-\d+[a-z]?)\./))){sec=h[1];out[sec]=[];mode=null;continue;}
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
/* COPY_WORLD_VOICE §DIALOGUE EXPOSURE — OCCASIONAL (User 2026-10-04): the `가끔` list under a §16-§18 pool is the set
   of its long lines that come up on 1 pick in 5; every other pick uses the pool's other lines. */
const occasionalDoc=(()=>{const out={};let sec=null,mode=null;
 for(const l of read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md').split('\n')){let h;
  if((h=l.match(/^##\s+(\d+-\d+[a-z]?)\./))){sec=h[1];mode=null;continue;}
  if(/^#\s/.test(l)){sec=null;continue;}if(!sec)continue;
  if((h=l.match(/^\*\*([^*]+)\*\*/))&&!l.startsWith('>')){mode=h[1];continue;}
  const q=l.match(/^>\s*(.+?)\s*$/);if(q&&mode==='가끔')(out[sec]??=[]).push(q[1]);}
 return out;})();
test('COPY_AUDIT `가끔`: occasional lines are the approved list, each in its own pool, picked 1 in 5',()=>{
 assert.deepEqual([...Copy.occasional].sort(),Object.values(occasionalDoc).flat().sort(),'Source OCCASIONAL is every COPY_AUDIT 가끔 line');
 for(const [sec,lines] of Object.entries(occasionalDoc))for(const l of lines)assert.ok(approved[sec].includes(l),l+' is also in §'+sec+' 현재');
 for(const [name,pool] of allPools){const occ=pool.filter(l=>Copy.occasional.has(l));if(!occ.length)continue;
  assert.ok(occ.length<pool.length,name+' keeps ordinary lines');
  let hit=0;for(let i=0;i<2000;i++)if(Copy.occasional.has(Copy.pick(pool,'k'+i)))hit++;
  assert.ok(hit>2000*.15&&hit<2000*.25,name+': occasional lines come up about 1 pick in 5 ('+hit+'/2000)');}
 const frequent=['sale.full','sale.half','sale.overcharge','sale.refuse.price','sale.refuse.overcharge','sale.refuse.need','sale.refuse.choice','visit.back','visit.regular'];
 for(const [name,pool] of allPools)if(frequent.includes(name))for(const l of pool)if(!Copy.occasional.has(l))
  assert.ok(l.replace(/[“”]/g,'').length<=16,name+': a frequent line fits one balloon row (16 letters): '+l);
});
test('COPY_AUDIT §17: every Trait arrival pool belongs to a Trait the build has',()=>{
 const cat=read('dist/data/catalog.js');
 for(const id of Object.keys(V.trait))assert.ok(cat.includes("['"+id+"','"),id+' is an active Trait');
});
test('COPY_AUDIT: the letter-suffixed section id parses without attributing to its parent',()=>{
 assert.deepEqual(approved['11-31'],['확보 완료 · {점포지원명}','보유 중']);
});

/* COPY_AUDIT §25 / COPY_WORLD_VOICE §RARE REFERENCE NPC (User 2026-09-28, v2.9.11): the Rare Reference customers and their
   lines were removed before a paid release - no approved line is left and nothing in the build still speaks for them */
test('COPY_AUDIT §25 (v2.9.11): the Rare Reference lines are gone',()=>{
 assert.equal(Copy.rare,undefined,'copy.js exports no Rare Reference lines');
 assert.equal(Object.keys(approved).filter(k=>k.startsWith('25-')).length,0,'COPY_AUDIT §25 approves no line');
 assert.ok(!/rare\[n\.name\]/.test(read('dist/data/copy.js')),'no line is picked by a Rare Reference name');
});

/* The rest of COPY_AUDIT (every section outside the §16-§20 pools): each literal `현재…` line must
   appear verbatim somewhere in shipped Source. Lines with a {placeholder} are skipped. A line that
   Source builds from parts cannot be found as one literal, so it is listed here with where it is
   built; the set must match exactly, so a newly unadopted line fails instead of joining it. */
const COMPOSED={
 '4-10':"app.js lastSaleDay(): '폐기까지 '+N+'일' / '내일까지' / '오늘까지' (v2.9.10)",
 '5-4':"presentation.js labels: '방문 시 소지금' + the signed Trait value (User 2026-10-02: no longer coincident with the retired 원정 전문 인증 text)",
 '4-18':'presentation.js rows(): labels.foodSupplyDelta / labels.supplyPerItem + the signed Trait value',
 '4-20':"app.js statGrid: the pressing Hazard names (D.hazards) joined with ' · '",
 '5-4':"presentation.js labels.visitGold + formatted value",
 '5-5':"presentation.js labels.loyaltyBonus + formatted value",
 '13-41':"shop.js validateCart / app.js BLOCK_REASON.cap: '오늘은 발주 후보 한 칸에서 '+cap+'개까지만 발주할 수 있습니다.' - the cap is the Event's own number (v2.9.11)",
 '8-4':"app.js help(): the 단골 line wraps Copy.loyalty.rule() and the 단골 threshold (Adventurer.TRUSTED_REGULAR) (User 2026-10-04)"};
/* A composed line whose words ALSO occur, by coincidence, inside another shipped literal - so the
   substring search finds it although its own surface is still composed. Named, so the exact-set
   comparison below stays exact. */
const COINCIDENT={};
test('COPY_AUDIT: every other literal `현재` line is in shipped Source',()=>{
 const walk=d=>fs.readdirSync(path.join(root,d),{withFileTypes:true}).flatMap(e=>e.isDirectory()?
  (e.name==='vendor'?[]:walk(d+'/'+e.name)):/\.(js|html)$/.test(e.name)?[d+'/'+e.name]:[]);
 const src=walk('dist').map(read).join('\n').replace(/\\`/g,'`');
 /* Decoration / Store Support / Loyalty copy is built from the live values (User 2026-10-04), so the shipped line is the
    rendered one: the data getters and Copy.loyalty are read here as the Player sees them. */
 const rendered=[...DATA.events.map(e=>e.description),...DATA.relics.map(r=>r.description),...DATA.decorations.map(d=>d.name+' — '+d.effect),
  Copy.loyalty.sale(),Copy.loyalty.coach()].join('\n');
 const missing=new Set();let checked=0,sec=null,mode=null;
 for(const l of read('design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md').split('\n')){let h;
  if((h=l.match(/^##\s+((\d+)-\d+[a-z]?)\./))){sec=h[1];mode=null;if(+h[2]>=16&&+h[2]<=20)sec=null;continue;}
  if(/^#\s/.test(l)){sec=null;continue;}
  if((h=l.match(/^\*\*([^*]+)\*\*/))&&!l.startsWith('>')){mode=h[1];continue;}
  if(/^#{2,3}\s/.test(l)){mode=null;continue;}
  const q=l.match(/^>\s*(.+?)\s*$/);if(!q||!sec||!mode||!mode.startsWith('현재')||/[{}]|\*\*/.test(q[1]))continue;
  checked++;if(!src.includes(q[1])&&!rendered.includes(q[1]))missing.add(sec);}
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
 assert.ok(Copy.pools.night.deathTraded.includes(Copy.night(report,{...n,id:'x',history:[{item:'rice',day:5}],records:[{}]})),
  'a customer death may mention the counter');
 /* deathTraded speaks of TODAY's receipt (`오늘 산 물건이 마지막 구매가 됐다`), so a purchase from an earlier Day does not
    make it eligible (User 2026-10-01 review) */
 assert.ok(!Copy.pools.night.deathTraded.includes(Copy.night(report,{...n,id:'x',history:[{item:'rice',day:3}],records:[{},{}]})),
  'a customer who last bought days ago gets no receipt line');
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
  n.records=[{outcome:'부상',items:['kit'],events:[{id:'aftercare',items:['kit'],text:'구급키트가 남을 부상을 없앴다.'}],
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
  n.records=[{outcome:'부상',items:['kit','kit'],events:[{id:'aftercare',items:['kit'],text:'구급키트가 남을 부상을 없앴다.'}],
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

test('COPY-002 (v2.9.11): no Rare Reference name is left anywhere in the build',()=>{
 const src=read('dist/systems/adventurer.js');
 const names=JSON.parse(src.match(/const names=(\[[\s\S]*?\]);/)[1]);
 for(const name of ['요화니우스','상혀크','진호르']){
  assert.ok(!names.includes(name),'not a pool name: '+name);
  for(const file of ['dist/systems/adventurer.js','dist/data/copy.js','dist/ui/app.js','dist/ui/presentation.js','dist/systems/shop.js','dist/systems/dungeon.js'])
   assert.ok(!read(file).includes(name),file+' does not name '+name);}
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
  assert.ok(Copy.inPool(pool,r.quote),'a '+r.outcome+' line comes from the matching pool: '+r.quote);
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
 /* v2.9.0 D-3: the timer is the duration the draw hands in - SAY_MS (3 s) for a greeting, SAY_REPLY_MS (5 s) for a reply */
 assert.ok(/setTimeout\(hideSpeech,ms\)/.test(arm)&&/function armSpeech\(ms=SAY_MS\)/.test(arm),'the balloon is dismissed on a timer');
 assert.ok(/SAY_MS=3000/.test(app)&&/SAY_REPLY_MS=5000/.test(app),'the canonical three seconds, five for a reply');
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
 assert.ok(/arrive\(\)\{.*?\.say=/.test(shop.replace(/\r?\n/g,'')),'a new customer sets their own line');
 assert.ok(/s\.say=null/.test(shop),'the line is cleared when the day turns over, not by a timer');
});

test('D-5 / EVENT §3-1: an Event says what it switched on, at the precision the rest of the catalog uses',()=>{
 const by=id=>DATA.events.find(e=>e.id===id);
 assert.ok(/요구 전력이 12% 오르고, 원정 결과의 손님 소지금 획득이 30% 늘어난다/.test(by('overflow').description),'몬스터 범람 states both multipliers');
 assert.equal(by('overflow').effects.danger,1.12);assert.equal(by('overflow').effects.reward,1.3);
 assert.ok(/구매 의사 \+20%p/.test(by('festival').description),'왕도 축제 states the intent it adds');assert.equal(by('festival').effects.foodDemand,.2);
 assert.ok(/구매 의사 \+20%p/.test(by('clinic').description),'치유소 휴무 too');assert.equal(by('clinic').effects.medicalDemand,.2);
 // EVENT §11 / COPY_AUDIT §13-11: cumulative item count, threshold and capped charge.
 assert.ok(/누적 폐기가 6개 이상이면, 오늘 운영비 계산에 누적 폐기 개수 ×5G를 더한다\(최대 100G\)/.test(by('audit').description),'본사 재고 감사 states the trigger and the cap');
 const g=new Game();g.autosave=false;g.start('copy-event-cost');g.run.facilities=[];g.run.dayFacilities=[];g.run.event=by('audit');g.overheadBase=()=>170;
 for(const [waste,cost]of [[5,170],[6,200],[40,270]]){g.run.stats.waste=waste;assert.equal(g.expectedOperatingCost(),cost,'audit threshold and maximum');assert.equal(g.eventEligible(by('audit')),waste>=6);}
 assert.ok(/전용 발주 칸이 1개 추가된다. 그 칸의 매입가는 35% 높다/.test(by('blackmarket').description),'암시장 상인 states the markup');
 g.run.event=by('blackmarket');assert.equal(DATA.eventRules.blackmarketPrice,1.35);assert.equal(g.offerFor(DATA.itemBy.rice,DATA.eventRules.blackmarketPrice).price,47,'35G purchase with 35% event slot markup');
 for(const e of DATA.events)assert.ok(!/(위험|보상|의사|매입가) (증가|감소)$/.test(e.description),e.name+' still describes its effect in the abstract');
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
  assert.ok(/올려 주는 능력치가 \d+% 더 오른다/.test(DATA.relicBy[id].description),id+' names the channel it does move (COPY_AUDIT §11-10 / §11-25 wording, User 2026-10-04)');
  assert.ok(/피로 회복·위험 대응은 그대로/.test(DATA.relicBy[id].description)&&!/피로 회복 \+/.test(DATA.relicBy[id].description),
   id+' does not claim the Fatigue recovery it leaves unchanged (v2.9.0 wording)');
 }

 /* D-16: the description slot is flavour. Where it only restated the effect line it told the
    player nothing they could not read one line up. Rules that live ONLY there are kept. */
 for(const [id,banned] of [['ice','화염 대응'],['kit','중상 위험을 줄여'],
                           ['antidote','독 대응을 크게'],['mask','독과 가스 환경에 대응'],
                           ['battery','어둠 속 시야를 확보'],['worldcharm','사망 판정을 한 번 중상으로'],
                           ['coupon','다음 소모품의 효과를 복제']]){
  const it=DATA.items.find(x=>x.id===id);
  assert.ok(it,'the catalog still has an item called '+id);
  assert.ok(!it.description.includes(banned),it.name+' flavour no longer restates its own effect line');
 }
 /* v2.9.6 (User 2026-09-26, COPY_AUDIT §4-22 / §12-4): the return stone's crisis roll used to live only in its flavour;
    it moved to its own effect row, and the flavour is flavour again */
 const stone=DATA.items.find(x=>x.id==='stone');
 assert.ok(stone&&!/위기|한 번 더/.test(stone.description),'the return stone flavour no longer carries the rule');
 const esc=Presentation.rows(stone.effects,undefined,stone.category).find(r=>r.key==='escape');
 const p=Math.round(stone.effects.escape*100);
 assert.equal(esc&&esc.label,'성공하지 못하면 퇴각 확률 +'+p+'%p','its escape row states what it does (v2.9.10, User 2026-09-28)');
 for(const id of ['ramen','wine','cloak','coffee','boots'])
  assert.ok(!/대응|냉기|공포|부식|진창|발걸음|저항/.test(DATA.itemBy[id].description),DATA.itemBy[id].name+' flavour does not restate its effect line');

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
  kingwater:'왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.',
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

/* COPY_AUDIT_APPROVED_v2.8.0 §11 — STORE SUPPORT 32/32 (rewritten User 2026-10-04: who gains first, numbers read from relicParams). The approved amendment is exact Player
   text, so this is equality, not a pattern: a paraphrase, a dropped middot or a stale number is
   a FAIL here rather than something a looser assertion can absorb. Price and name are pinned in
   the same table because §11 renames two rows and RELIC_v2.8 re-prices two more, and a row that
   reads right at the wrong price is still the wrong row. */
test('COPY_AUDIT §11: all 30 Store Support names / prices / descriptions are the approved text',()=>{
 const SUPPORTS=[
  ['bulk','묶음발주 계약',130,'같은 상품을 한 번에 3개 이상 발주하면, 3번째부터 매입가가 20% 싸진다.'],
  ['rotation','회전 진열대',80,'전날 4개 이상 팔았으면, 오늘 발주 후보마다 들일 수 있는 수량이 1개 늘어난다.'],
  ['stamp','단골 스탬프 기계',130,'손님의 구매로 오르는 단골도: 정가 +2 (기존 +1), 50% 할인 +7 (기존 +4). 원정 뒤에 오르는 단골도는 그대로.'],
  ['member','회원 관리대장',130,'단골도가 손님이 다시 올 가능성에 주는 효과가 2배가 된다.'],
  ['rareContract','희귀상품 입고 계약',140,'발주 후보에 희귀 이상 상품이 1.7배 자주 나온다. 희귀 이상 상품을 팔면 가게가 판매가의 10%를 더 받는다.'],
  ['guarantee','길드 보증 진열대',140,'하루 한 번, 200G 이상에 파는 상품은 손님이 판매가의 70%만 내고 가게는 전액을 받는다.'],
  ['hazardBoard','원정 위험 게시판',60,'오늘 게이트 위험에 맞는 상품이 발주 후보에 1.5배 자주 나온다.'],
  ['fieldRepair','야전 정비대',80,'가게에서 판 상품의 위험 대응 수치가 40% 높아진다.'],
  ['fridge','대형 냉장고',60,'음식·음료의 유통기한이 2일 늘어난다. 이미 가진 재고도 한 번 늘어난다.'],
  ['kitchen','즉석식품 코너',200,'음식·음료가 올려 주는 능력치가 25% 더 오른다 (피로 회복·위험 대응은 그대로). 대신 기본 운영비가 10% 오른다.'],
  ['board','길드 전광판',110,'손님 수가 적게 나와도 하루 기본 4명은 온다 (기존 3명).'],
  ['firstVisitCoupon','첫 방문 쿠폰',110,'처음 온 손님의 손님 소지금 +30G (소지금 상한 적용), 그 손님의 구매 의사 +20%p.'],
  ['groupOrder','단체 주문 창구',200,'매일 아침 20% 확률로 손님이 1명 더 온다. 하루 5번째 판매부터는 팔 때마다 가게가 15G를 더 받는다.'],
  ['memberBundle','단골 묶음혜택',190,'단골 손님이 오늘 두 번째 상품을 살 때, 손님은 반값만 내고 가게는 전액을 받는다.'],
  ['premiumMember','프리미엄 멤버십',200,'다시 온 손님의 손님 소지금 +25G (소지금 상한 적용), 희귀 이상 상품 구매 의사 +15%p. 그 손님이 희귀 이상 상품을 정가나 할인으로 사면 단골도가 10 더 오른다.'],
  ['returnPoints','귀환 적립제',240,'오늘 상품을 산 손님이 원정에서 살아 돌아오면, 그 손님의 단골도 +4, 손님 소지금 +20G.'],
  ['expeditionMeal','원정 도시락 코너',200,'모든 음식·음료가 기존 위험 대응이 없어도 모든 위험 대응을 2 올린다. 마왕성에서는 가장 약한 위험 하나만 올린다. 대신 음식·음료 매입가가 15% 오른다.'],
  ['coldcase','전문 포션 유통 계약',180,'포션만 나오는 발주 칸이 1칸 늘어난다. 포션을 팔면 본사가 판매금액의 10%를 가게에 추가 지급한다.'],
  ['supplyCert','길드 납품 인증',220,'희귀 이상 상품 중 오늘 위험에 맞는 것이나 보험을 팔면, 가게가 정가의 40%를 더 받고 그 손님의 손님 소지금도 +30G.'],
  ['dawnRecovery','새벽 회수 계약',190,'유통기한이 지난 음식·음료는 버리는 대신 매입가의 50%를 돌려받는다. 음식이나 음료만 나오는 발주 칸이 1칸 늘어난다.'],
  ['logisticsHQ','물류 본부계약',300,'전날 판 상품 1개마다 오늘 발주 매입가가 3% 싸진다 (최대 30%).'],
  ['lifetime','평생 단골제',310,'단골 손님의 능력치가 모두 10% 오른다. 한 번 단골이 되면 단골도가 51 아래로 떨어지지 않는다.'],
  ['royalCert','왕도 프리미엄 인증',320,'바가지(150%)로 팔면 가게가 판매가의 40%를 더 받고, 손님의 바가지 구매 의사 +10%p. 대신 기본 운영비가 10% 오른다.'],
  ['opsRoom','원정 작전실',290,'손님의 위험 대응이 필요한 수치를 넘긴 만큼 투력이 오른다 (최대 +30%).'],
  ['fresh24','24시간 신선체계',360,'음식·음료가 올려 주는 능력치가 50% 더 오른다 (피로 회복·위험 대응은 그대로). 대신 음식·음료 매입가 +15%.'],
  ['hub','지역 거점점 계약',340,'매일 아침 손님이 45% 확률로 1명, 15% 확률로 2명 더 온다. 대신 기본 운영비가 10% 오른다.'],
  ['warehouse','후방 창고 증설',130,'창고에 둘 수 있는 상품이 5칸 늘어난다.'],
  ['extraOrder','본사 추가발주권',190,'발주 칸이 2칸 늘어난다.'],
  ['rerollTicket','발주 교환권',120,'매일 첫 발주 후보 교환은 무료. 그다음부터 50G → 100G → 200G… 로 오른다.'],
  ['efficiency','운영 효율 매뉴얼',130,'다음 날부터 하루 기본 운영비가 30G 적어진다.'],
  /* v2.9.11 (User 2026-09-28): COPY_AUDIT §11-30b / §11-30c */
  ['fieldStretcher','야전 들것',80,'부상당한 손님의 투력 감소 8% (기존 15%).'],
  ['firstAidDesk','응급 처치대',300,'부상당한 손님이 가게에 오면 20% 확률로 부상이 낫는다 (중상은 제외).'],
  /* User 2026-10-04: COPY_AUDIT §11-30d / §11-30e / §11-30f */
  ['rumorBoard','소문 수집 게시판',60,'점포지원이 오는 날과 심층원정 날만 빼고, 매일 아침 사건이 꼭 생긴다.'],
  ['postcard','단골 추천 엽서함',80,'단골 손님이 온 날에는 그날 온 다른 손님의 단골도가 모두 5 오른다.'],
  ['rescueContract','길드 구조대 계약',240,'원정에서 사망 결과가 나오면 15% 확률로 중상으로 바뀌어 돌아온다.']];
 /* v2.9.0 I-4 (User 2026-09-25): condition first, then the effect - COPY_AUDIT §11-1 … §11-30c exact (32 since v2.9.11) */
 assert.equal(SUPPORTS.length,35,'§11 audits all 35 Store Supports (단골 묶음혜택 retired but still readable)');
 assert.deepEqual(DATA.relics.map(r=>r.id),SUPPORTS.map(r=>r[0]),'the catalogue is exactly those 35, in order');
 for(const [id,name,price,description] of SUPPORTS){
  const r=DATA.relicBy[id];
  assert.ok(r,'the catalogue still has '+id);
  assert.equal(r.name,name,id+' name is the approved §11 text');
  assert.equal(r.price,price,id+' price is the approved baseline');
  assert.equal(r.description,description,id+' description is the approved §11 text, verbatim');
 }
 /* REL-Q-v28-1: the two renamed rows really dropped 쇼케이스, and the Decoration that owns the
    word keeps it. */
 for(const id of ['rareContract','coldcase'])assert.ok(!DATA.relicBy[id].name.includes('쇼케이스'),id+' no longer reuses 쇼케이스');
 /* v2.9.7 (User 2026-09-26): the Decoration once named 프리미엄 쇼케이스 is 명예 모험가 액자 (RELIC §name collision, REL-Q-v28-1) */
 assert.equal(DATA.decorationBy.honorFrame.name,'명예 모험가 액자','the Decoration once named 프리미엄 쇼케이스 is 명예 모험가 액자');
 /* REL-Q-v28-10 / SA-Q26: the exact stale phrases the amendment retires, gone from every row. */
 const all=DATA.relics.map(r=>r.description).join('\n');
 /* '+25G' left this list with the 2026-09-23 rebalance: 프리미엄 멤버십's approved copy now says 소지금 +25G */
 /* '바가지' left this list with v2.9.0 (COPY_AUDIT §4-19 price role words / §11-23): 왕도 프리미엄 인증 now says 바가지(150%) by approval */
 for(const stale of ['무료 보급','치료·야외장비','50G부터','최소 4명','8건 이상','+12G','8%를','15G 절감','신선식품 발주'])
  assert.ok(!all.includes(stale),'no Store Support row still says "'+stale+'"');
 /* §11-31: the acquired state reads as 확보/보유, not 설치 - 계약·인증·매뉴얼 are not installed. */
 const app=read('dist/ui/app.js');
 assert.ok(app.includes('확보 완료 · ')&&!app.includes('설치 완료 · '),'the purchased banner says 확보 완료');
 assert.ok(app.includes("mine?'보유 중'")&&!app.includes("mine?'설치됨'"),'an owned row reads 보유 중');
 assert.ok(app.includes("poor?'골드 부족':price?'구매':'선택'"),'a free card is chosen (선택), a priced one bought (구매) - COPY_AUDIT §11-31b');
});

/* COPY_AUDIT §9-5 (User 2026-10-04): the eight Decoration lines, who gains first and no closing period; and a copy number is
   the live value - changing a parameter rewrites the line (User 2026-10-04: copy follows the code value). */
test('COPY_AUDIT §9-5 / §11: Decoration lines are the approved text, and Decoration / Store Support / Loyalty copy follows the values',()=>{
 const EFFECTS={
  sponsorSign:'손님이 방문할 때마다 손님 소지금의 50%만큼 더 쓸 수 있다',
  honorFrame:'새로 오는 모험가가 평범보다 높은 등급일 확률 60% (기존 40%)',
  thriftSafe:'매일 먼저 온 손님 2명은 손님 소지금이 200G씩 늘어난다 (소지금 상한 적용)',
  guildShelf:'매일 아침 35% 확률로 그날 손님이 1명 더 온다',
  trainingSign:'처음 찾아오는 모험가는 55% 확률로 레벨 +1로 온다',
  infirmaryPlaque:'부상당한 손님이 가게에 오면 40% 확률로 부상이 낫는다 (중상은 제외)',
  memorialBook:'폐점까지 버틸 수 있는 사망자 수(사망 한도)가 1명 늘어난다',
  aidCabinet:'부상 없이, 피로 20 미만, 가방에 상품 2개 이상을 챙겨 떠난 손님은 투력 +5%. 원정에 실패해도 죽을 확률이 40% 줄어든다 (기존 20%) (마왕성 제외)',
  /* 운영형 (User 2026-10-04) */
  heroSign:'첫 점포지원을 영웅 등급 3장 중에서 고른다',
  cheerBanner:'손님의 투력이 단골도 10마다 3% 오른다',
  voucher:'밤마다 살아 있는 모든 손님의 피로가 6 줄어든다',
  rerollCoupon:'유료 점포지원 구매 기회마다 첫 후보 교환이 무료'};
 assert.deepEqual(DATA.decorations.map(d=>d.id).sort(),Object.keys(EFFECTS).sort(),'all twelve Decorations are audited');
 for(const d of DATA.decorations)assert.equal(d.effect,EFFECTS[d.id],d.id+' effect is the approved §9-5 text, verbatim');
 for(const d of DATA.decorations)assert.ok(!d.effect.endsWith('.'),d.id+' has no closing period');
 const swap=(obj,key,value,read)=>{const was=obj[key];obj[key]=value;try{return read();}finally{obj[key]=was;}};
 assert.ok(swap(DATA.decorationParams.thriftSafe,'firstWallet',300,()=>DATA.decorationBy.thriftSafe.effect).includes('300G씩'),'알뜰 금고 reads its wallet value');
 assert.ok(swap(DATA.relicParams.returnPoints,'loyaltyBonus',6,()=>DATA.relicBy.returnPoints.description).includes('단골도 +6'),'귀환 적립제 reads its Loyalty value');
 assert.ok(swap(DATA.relicParams.stamp,'loyaltyMult',2,()=>DATA.relicBy.stamp.description).includes('정가 +2 (기존 +1), 50% 할인 +8 (기존 +4)'),'단골 스탬프 기계 rounds the live multiplier');
 assert.ok(swap(DATA.pricing.overcharge,'loyalty',-5,()=>Copy.loyalty.sale()).endsWith('+4·+1·-5.'),'the guide reads the 150% Loyalty');
 assert.equal(Copy.loyalty.sale(),'상품 가격은 50%·100%·150% 중에서 정한다. 팔리면 기본 단골도는 각각 +4·+1·-4.');
 assert.equal(Copy.loyalty.rule(),'기본 단골도는 상품을 살 때 정가 +1, 50% 할인 +4, 150% 바가지 -4로 바뀐다. 상품을 사고 떠날 때 +1, 원정에서 살아 돌아오면 +1, 바가지를 거절하면 -2다. 특성·점포지원과 단골도 한도에 따라 실제 변화량은 달라질 수 있다.');
 assert.equal(Copy.loyalty.coach(),'단골 손님. 단골도 51부터 단골이 된다. 단골도가 높을수록 자주 찾아오고 상품도 더 잘 산다.');
});

test('Fatigue lesson and discovery follow the same penalty threshold',()=>{
 const lesson=()=>Copy.learned.find(([id])=>id==='fatigue')[1];
 assert.equal(Dungeon.fatiguePenaltyFrom(),10,'Canonical penalty starts at 10');
 assert.equal(lesson(),'피로가 10 이상이면 능력치가 떨어진다. 음식·음료가 피로를 덜어 준다.');
 /* User 2026-10-10: the 실패 시 사망 위험 causes are SALE marks of their own, numbers read from DEATH / STRAIN / FATIGUE_MAX */
 assert.equal(Copy.risk.hurt(),'다친 손님이다. 다친 채 원정을 떠나면 실패 시 사망 위험이 '+Math.round(Dungeon.DEATH.injured*100)+'%p 오른다.');
 assert.equal(Copy.risk.exhausted(),'탈진한 손님이다. 피로 '+Dungeon.FATIGUE_MAX+'으로 떠나면 실패 시 사망 위험이 '+Math.round(Dungeon.DEATH.exhausted*100)+'%p 오른다. 음식·음료가 피로를 덜어 준다.');
 assert.equal(Presentation.eventLine({id:'learn-fatigue',text:'피로가 10을 넘으면 기동·정신이 떨어진다.'}),lesson(),'old saved lessons display the current rule');
 assert.equal(Presentation.eventLine({id:'old-event',text:'저장된 원정 결과'}),'저장된 원정 결과','historical outcome text is preserved');
 const from=Dungeon.fatiguePenaltyFrom;
 try{Dungeon.fatiguePenaltyFrom=()=>12;
  assert.equal(lesson(),'피로가 12 이상이면 능력치가 떨어진다. 음식·음료가 피로를 덜어 준다.');
  for(const [value,expected]of [[11,false],[12,true]]){
   const report={day:1,outcome:'퇴각',events:[],items:[],dungeon:'spider',fatigueBeforeExpedition:value};
   Meta.observe(Meta.fresh(),report,{});assert.equal(report.acted.includes('fatigue'),expected,'discovery boundary follows the threshold');
  }
 }finally{Dungeon.fatiguePenaltyFrom=from;}
});

test('Paid visit Loyalty copy follows the same value departure awards',()=>{
 assert.equal(DATA.balance.paidVisitLoyalty,1,'Canonical paid-visit increment');
 const old=DATA.balance.paidVisitLoyalty;
 try{DATA.balance.paidVisitLoyalty=3;
  assert.ok(Copy.loyalty.rule().includes('상품을 사고 떠날 때 +3'));
  const g=new Game();g.autosave=false;g.start('paid-visit-copy');
  const s=g.run,n=s.npcs[0];s.phase='sell';s.queue=[n.id];s.cursor=0;n.loyalty=10;n.history=[{day:s.day,paid:70}];
  g.night=()=>{};g.depart();assert.equal(n.loyalty,13,'departure reads the shared value');
 }finally{DATA.balance.paidVisitLoyalty=old;}
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
  [V.trait.coward,'“무사히 다녀오는 게 목표입니다.”'],
  [V.trait.eater,'“원정 끝나면 밥부터 먹어야겠어요.”'],
  [V.trait.eater,'“배고픈 채 돌아오는 건 질색이에요.”'],
  [V.trait.greed,'“빈손으로는 안 돌아옵니다.”'],
  [V.trait.greed,'“이번엔 전리품 좀 챙겨 와야죠.”'],   // 대사 길이 정리 (User 2026-10-04)
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
test('Event descriptions follow actual effects and preserve saved Event data',()=>{
 const by=id=>DATA.events.find(e=>e.id===id);
 const cases=[['logistics',{price:1.25},'25%'],['overflow',{danger:1.2,reward:1.5},'20% 오르고'],['potionPrice',{potionPrice:1.4},'40%'],['festival',{foodDemand:.35},'+35%p'],['strike',{visitors:-2},'-2명'],['caravan',{offers:4},'4칸'],['payday',{wallet:1.3},'30%'],['clinic',{medicalDemand:.35},'+35%p'],['wastecover',{wasteDelay:2},'2일'],['bard',{visitors:4},'+4명'],['rite',{deathLimit:2},'2명'],['medicshift',{nightSaves:3},'3명'],['consolation',{injuredBudget:80},'80G'],['guildbonus',{flatBudget:90},'90G'],['hqlogistics',{price:.8},'20%'],['insurebuy',{categoryPrice:{insurance:.6}},'40%'],['gearaid',{categoryPrice:{gear:.6}},'40%'],['banquet',{feast:3},'3배'],['shiftrest',{outcomeFatigue:.7},'30%'],['spaday',{arrivalFatigue:10},'10 줄어'],['bounty',{reward:1.4},'40%'],['omen',{danger:1.2},'20%'],['latedelivery',{offers:-4},'4칸'],['drought',{categoryPrice:{drink:1.5}},'50%'],['guildtax',{overheadAdd:80},'80G'],['monsoon',{foodDemand:-.3},'-30%p'],['ordercap',{orderCap:3},'3개'],['collapse',{escapeCut:.2},'20%p'],['fridgebreak',{shelfCut:2},'2일'],['nightmarket',{visitors:4,overheadAdd:80},'80G'],['draft',{reward:1.5,visitors:-2},'-2명'],['clearance',{price:.5,offers:-4},'4칸'],['eliteorder',{danger:1.2,xpMult:1.8},'80%'],['heatwave',{drinkDemand:.4,categoryPrice:{drink:1.5}},'+40%p'],['trainingweek',{xpMult:1.8,reward:.5},'50% 줄어'],['nearexpiry',{price:.5},'50%'],['safegates',{reward:.5},'50%']];
 for(const [id,effects,part]of cases){const original=by(id),saved={...JSON.parse(JSON.stringify(original)),description:'예전 저장 설명',effects};
  assert.ok(Presentation.eventDescription(saved).includes(part),id+' uses saved effects');
  const before=original.effects;try{original.effects=effects;assert.ok(original.description.includes(part),id+' getter follows current effects');}finally{original.effects=before;}
  assert.equal(saved.description,'예전 저장 설명','display does not modify save');
 }
 const rules=DATA.eventRules,original={...rules};try{Object.assign(rules,{auditMinimum:7,auditPerItem:6,auditMaximum:120,blackmarketPrice:1.4,pilgrimageMin:2,pilgrimageMax:4,promoUnits:3});
  assert.equal(by('audit').description,'이번 점포의 누적 폐기가 7개 이상이면, 오늘 운영비 계산에 누적 폐기 개수 ×6G를 더한다(최대 120G).');
  assert.ok(by('blackmarket').description.includes('40%'));assert.ok(by('pilgrimage').description.includes('2~4명'));assert.ok(by('oneplus').description.includes('3개가 입고'));
 }finally{Object.assign(rules,original);}
 const subsidy=DATA.balance.halfPriceSupport;try{DATA.balance.halfPriceSupport=80;assert.ok(by('halfPrice').description.includes('80G'));}finally{DATA.balance.halfPriceSupport=subsidy;}
 assert.equal(Presentation.eventDescription({id:'unknown-id',description:'기존 설명',effects:{}}),'기존 설명');assert.equal(Presentation.eventDescription(null),'');
 for(const e of DATA.events){const saved=JSON.parse(JSON.stringify(e));assert.deepEqual(Object.keys(saved).sort(),['description','effects','id','name','reveal','weight']);assert.equal(saved.description,e.description);assert.equal(saved.describe,undefined);}
});

test('SA-Q37 / COPY_AUDIT §13: all 55 Events carry the approved Flavor and Function',()=>{
 const APPROVED=[
  ['logistics','물류대란','북문 운송로가 막혔다. 오늘 들어온 상자마다 우회 운임 딱지가 붙어 있다.','오늘 모든 상품의 발주 매입가가 15% 오른다.'],
  ['oneplus','본사 1+1 행사','입고표엔 한 상자였는데 두 상자가 왔다. 본사 행사품이라고 한다.','오늘 1+1 표시가 붙은 발주 상품 1종은 1개를 주문하면 2개가 입고된다.'],
  ['pilgrimage','게이트 순례 주간','성지 순례 깃발이 게이트 거리를 메웠다. 행렬을 따라 길을 바꾸는 모험가도 있다.','오늘 손님 중 1~3명이 예상 목적지와 다른 열린 게이트로 갈 수 있다. 실제 경로는 밤에 확인한다.'],
  ['overflow','몬스터 범람','경비병들이 게이트 앞 울타리를 한 겹 더 둘렀다. 안쪽 울음소리가 오늘따라 가깝다.','오늘 게이트 요구 전력이 12% 오르고, 원정 결과의 손님 소지금 획득이 30% 늘어난다.'],
  ['potionPrice','포션 가격 폭등','연금술사 조합의 새 가격표가 붙었다. 어제 붙인 종이 위에.','오늘 포션의 발주 매입가가 35% 오른다.'],
  ['coldwave','한파','아침부터 진열대 유리가 서렸다. 게이트 쪽 바닥에는 얇은 얼음이 잡혔다.','오늘 냉기·화염 위험이 없는 게이트에 냉기 위험이 추가된다.'],
  ['shortage','포션 공급 중단','배송 마차에서 포션 칸만 비어 있었다.','오늘 포션은 발주 후보에 매우 드물게 나온다.'],
  ['rookie','신입 모험가 시즌','길드 등록대 앞에 새 장비 냄새가 난다. 이름표가 아직 빳빳한 모험가들이 줄을 섰다.','오늘 손님 중 1명이 새 모험가로 방문한다.'],
  ['royal','왕립 기사단 방문','왕립 문장이 박힌 마차가 길드 앞에 섰다. 주변 모험가들이 슬쩍 길을 비킨다.','오늘 손님 중 1명이 새 모험가로 방문한다. 보통의 새 모험가보다 시작 레벨이 높고, 높은 등급으로 올 가능성이 커진다.'],
  ['blackmarket','암시장 상인','개점 전, 뒷문 앞에 주인 없는 상자가 놓여 있었다. 가격표만은 또박또박 붙어 있다.','오늘 희귀 이상 상품 전용 발주 칸이 1개 추가된다. 그 칸의 매입가는 35% 높다.'],
  ['audit','본사 재고 감사','본사 감사관은 인사보다 장부를 먼저 찾았다.','이번 점포의 누적 폐기가 6개 이상이면, 오늘 운영비 계산에 누적 폐기 개수 ×5G를 더한다(최대 100G).'],
  ['festival','왕도 축제','왕도 쪽 음악이 게이트 앞까지 넘어온다. 원정 나서는 사람들 손에도 먹을 것이 들렸다.','오늘 손님의 음식·음료 구매 의사 +20%p'],
  ['strike','길드 파업','길드 정문에 현수막이 걸리고 접수창구가 닫혔다.','오늘 손님 수 -1명.'],
  ['unknown','고위험 게이트 발견','새벽 순찰대가 위험한 게이트를 발견했다. 길드가 높은 보상을 걸었다.','오늘 요구 전력과 손님 소지금 획득이 더 큰 임시 게이트가 1곳 열린다.'],
  ['halfPrice','본사 반값 행사','본사 지원 도장이 찍힌 반값 쿠폰이 한 장 내려왔다.','오늘 처음으로 상품을 50% 할인해 팔면, 본사가 보유 골드 50G를 지원한다.'],
  ['poisonfog','독안개','게이트 쪽 공기가 누렇게 흐려졌다. 경비병들이 천으로 입과 코를 가린다.','오늘 독 위험이 없는 게이트에 독 위험이 추가된다.'],
  ['caravan','보급 상단 도착','예정보다 이른 상단이 해 뜨기 전에 들어왔다. 창고 앞이 모처럼 북적인다.','오늘 발주 후보가 2칸 늘어난다.'],
  ['payday','길드 급여일','급여일 아침, 길드 출입문마다 동전 주머니 소리가 난다.','오늘 방문한 손님은 손님 소지금의 20%만큼 상품을 더 살 수 있다(오늘만 쓰는 추가 구매 금액).'],
  ['clinic','치유소 휴무','치유소 문에 휴무 팻말이 걸렸다. 보험 창구 앞줄이 금세 길어졌다.','오늘 손님의 보험 상품 구매 의사 +20%p'],
  ['wastecover','본사 폐기 유예','유통기한 위에 새 스티커가 붙어 있다. 본사는 모르는 일이라고 한다.','오늘 아침 보유 재고 중 오늘까지 팔 수 있던 상품의 유통기한이 1일 늘어난다.'],
  ['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.','오늘 손님 수 +2명.'],
  ['nightshift','본사 야간 근무 수칙','본사 야간 근무 수칙\n1) 마감 전 창고 수량을 확인하십시오.\n2) 폐기 상품은 뒷문 옆 상자에 두십시오.\n3) 뒷문은 반드시 두 번 잠그십시오.\n5) 새벽 2시 이후 뒷문에서 세 번 노크가 들려도 열지 마십시오.\n4번 규정은 없습니다.','오늘 운영비는 0G다.'],
  ['rite','길드 합동 위령제','길드가 광장에 위령제 제단을 세웠다. 오늘은 모험가들도 말수가 적다.','이번 점포가 끝날 때까지 사망 한도가 1명 늘어난다.'],
  /* §13-24 … §13-55 (User 2026-09-28, v2.9.11) */
  ["medcorps","길드 의료단 순회","길드 의료단 마차가 게이트 거리를 돈다. 줄 선 모험가들의 붕대가 하나둘 풀린다.","오늘 부상인 손님이 가게에 오면 부상이 낫는다(중상 제외)."],
  ["medicshift","길드 의무관 당직","의무관이 오늘 밤은 길드에 남는다고 했다. 붕대 상자가 접수대 옆에 놓였다.","오늘 밤 부상으로 돌아온 모험가의 남는 부상을 최대 2명까지 없앤다(중상·사망 제외)."],
  ["consolation","길드 위로금","길드가 다친 조합원에게 위로금 봉투를 돌렸다. 봉투에는 '몸조심'이라고만 적혀 있다.","오늘 방문 때 부상이 남아 있는 손님은 상품을 60G 더 살 수 있다(오늘만 쓰는 추가 구매 금액)."],
  ["guildbonus","길드 특별 수당","길드가 원정 수당을 앞당겨 풀었다. 봉투가 생각보다 얇지는 않다.","오늘 방문한 손님은 상품을 40G 더 살 수 있다(오늘만 쓰는 추가 구매 금액)."],
  ["hqlogistics","본사 물류 지원","본사 트럭이 운임을 받지 않고 돌아갔다. 기사도 이유는 모른다.","오늘 모든 상품의 발주 매입가가 15% 낮아진다."],
  ["insurebuy","보험 공동 구매","길드 보험 창구가 공동 구매를 돌렸다. 상자마다 할인 도장이 찍혀 있다.","오늘 보험 상품의 발주 매입가가 30% 낮아진다."],
  ["gearaid","본사 원정용품 지원","본사가 원정용품 창고를 정리한다며 장비 상자를 싸게 넘겼다.","오늘 야외장비 상품의 발주 매입가가 30% 낮아진다."],
  ["banquet","길드 연회","길드가 연회를 연다며 음식을 챙겨 가라고 했다. 오늘은 한 입이 두 입만큼 든든하다.","오늘 원정에 쓰는 음식의 피로 회복이 2배가 된다(음료는 그대로)."],
  ["shiftrest","원정 교대 근무","길드가 원정대를 두 조로 나눠 교대로 쉬게 했다. 돌아오는 발걸음이 덜 무겁다.","오늘 원정 결과의 피로 증가량이 50% 줄어든다"],
  ["spaday","길드 휴양일","길드가 온천 이용권을 돌렸다. 오늘 오는 손님들은 어깨가 한결 가볍다.","오늘 방문하는 모든 손님의 피로가 8 줄어든다."],
  ["regularday","단골의 날","단골손님이 오늘 들르겠다는 쪽지를 친구 편에 보냈다.","오늘 아직 방문 예정이 아닌 단골이 있으면 1명이 추가로 온다."],
  ["bounty","길드 현상금","게시판에 현상금 종이가 새로 붙었다. 액수 앞에서 발걸음이 느려진다.","오늘 원정 결과의 손님 소지금 획득이 20% 늘어난다."],
  ["omen","마왕의 징조","새벽 하늘이 붉게 물들었다. 게이트 안쪽이 조용해서 더 불안하다.","오늘 게이트 요구 전력이 8% 오른다."],
  ["latedelivery","입고 지연","배송 마차 바퀴가 빠졌다. 오늘 들어온 건 사과 편지 한 장.","오늘 발주 후보가 2칸 줄어든다."],
  ["drought","가뭄","우물 앞 줄이 길다. 생수 상자 값이 아침마다 오른다.","오늘 음료의 발주 매입가가 30% 오른다."],
  ["guildtax","길드 세금 징수","징수원이 영업 시작 전에 왔다. 영수증은 주지 않았다.","오늘 운영비에 50G가 더해진다."],
  ["monsoon","장맛비","비가 그치지 않는다. 우산 든 손님은 봉지를 들 손이 없다.","오늘 손님의 음식·음료 구매 의사 -15%p"],
  ["ordercap","본사 발주 제한","본사 공문: 오늘은 품목당 두 상자까지만. 이유는 '사정상'.","오늘은 발주 후보 한 칸에서 최대 2개까지 주문할 수 있다."],
  ["noreroll","포스기 먹통","포스기가 멈췄다. 오늘은 발주서를 바꿔 달라고 전화할 수도 없다.","오늘 발주 후보 교환을 할 수 없다(무료 교환도 포함)."],
  ["pricewatch","가격 단속","길드 감시관이 가격표를 하나씩 들여다보고 있다.","오늘은 상품을 바가지(150%)로 팔 수 없다."],
  ["collapse","퇴각로 붕괴","게이트 뒤편 샛길이 무너졌다. 오늘은 돌아 나올 길이 하나뿐이다.","오늘 원정의 기본 퇴각 확률이 10%p 줄어든다(귀환석의 추가 퇴각 효과는 그대로)."],
  ["summons","길드 소집령","실력자 한 명이 길드에 급히 불려 갔다. 행선지는 비밀이라고 한다.","오늘 방문할 수 있는 모험가 중 레벨이 가장 높은 1명은 가게에 오지 않는다."],
  ["fridgebreak","냉장고 고장","냉장고 모터가 새벽부터 덜컹거린다. 수리 기사는 내일 온다고 했다.","오늘 아침 가진 음식·음료 재고의 유통기한이 1일 줄어든다(최소 오늘까지)."],
  ["nightmarket","야시장","게이트 거리에 야시장이 열렸다. 사람도 많고 자릿세도 붙었다.","오늘 손님 수 +3명. 운영비에 60G가 더해진다."],
  ["draft","원정 징발령","길드가 모험가 몇 명을 징발해 갔다. 남은 사람 몫이 커졌다.","오늘 원정 결과의 손님 소지금 획득이 40% 늘어난다. 손님 수 -1명."],
  ["clearance","본사 재고 떨이","본사 창고 정리 날이다. 싸게 주지만 고를 수는 없다.","오늘 모든 상품의 발주 매입가가 25% 낮아진다. 발주 후보는 3칸 줄어든다."],
  ["eliteorder","정예 토벌령","왕도가 정예 토벌령을 내렸다. 게이트가 험해진 만큼 배우는 것도 많다.","오늘 게이트 요구 전력이 15% 오르고, 원정 경험치가 50% 늘어난다."],
  ["heatwave","폭염","진열대 유리가 뜨겁다. 음료 칸 앞에서만 사람들이 오래 서 있다.","오늘 손님의 음료 구매 의사 +25%p. 음료의 발주 매입가는 35% 오른다."],
  ["gateclosed","게이트 임시 폐쇄","경비대가 게이트 하나에 밧줄을 쳤다. 그쪽으로 가려던 모험가들이 다른 줄에 선다.","오늘 열린 게이트 중 1곳이 폐쇄된다."],
  ["trainingweek","길드 훈련 주간","교관들이 게이트 앞에 진을 쳤다. 배우는 건 많은데 챙겨 오는 건 적다.","오늘 원정 경험치가 50% 늘고, 원정 결과의 손님 소지금 획득은 30% 줄어든다."],
  ["nearexpiry","유통기한 임박 특가","본사가 날짜 임박 상품을 싸게 돌렸다. 스티커 날짜가 오늘이다.","오늘 모든 상품의 발주 매입가가 40% 낮아진다. 오늘 발주로 입고한 상품은 오늘까지만 팔 수 있다."],
  ["safegates","게이트 안정화 작업","길드 공병대가 밤새 게이트를 다졌다. 안쪽이 조용해진 만큼 챙길 것도 적다.","오늘 모든 게이트가 티어 I로 열린다. 원정 결과의 손님 소지금 획득은 40% 줄어든다."],
 ];
 assert.equal(APPROVED.length,55,'§13 audits all 55 Events (23 → 55 in v2.9.11)');
 assert.deepEqual(DATA.events.map(e=>e.id),APPROVED.map(r=>r[0]),'the catalogue is exactly those 55, in order');
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
 // mechanics are untouched: every Event keeps the exact effects and weight it had (wastecover changed on purpose:
 // User 2026-09-28, v2.9.10 quick patch - a refund became a one-day delay)
 const EFFECTS={logistics:{price:1.15},oneplus:{double:1},pilgrimage:{pilgrimage:1},
  overflow:{danger:1.12,reward:1.3},potionPrice:{potionPrice:1.35},coldwave:{cold:1},
  shortage:{potionWeight:0.08},rookie:{rookie:1},royal:{royal:1},blackmarket:{blackmarket:1},
  audit:{audit:1},festival:{foodDemand:0.2},strike:{visitors:-1},unknown:{unknown:1},
  halfPrice:{halfPrice:1},poisonfog:{poison:1},caravan:{offers:2},payday:{wallet:1.2},
  clinic:{medicalDemand:0.2},wastecover:{wasteDelay:1},bard:{visitors:2},nightshift:{overheadFree:1},
  rite:{deathLimit:1},
  /* v2.9.11 */
  medcorps:{"healVisitors": 1},
  medicshift:{"nightSaves": 2},
  consolation:{"injuredBudget": 60},
  guildbonus:{"flatBudget": 40},
  hqlogistics:{"price": 0.85},
  insurebuy:{"categoryPrice": {"insurance": 0.7}},
  gearaid:{"categoryPrice": {"gear": 0.7}},
  banquet:{"feast": 2},
  shiftrest:{"outcomeFatigue": 0.5},
  spaday:{"arrivalFatigue": 8},
  regularday:{"regularVisit": 1},
  bounty:{"reward": 1.2},
  omen:{"danger": 1.08},
  latedelivery:{"offers": -2},
  drought:{"categoryPrice": {"drink": 1.3}},
  guildtax:{"overheadAdd": 50},
  monsoon:{"foodDemand": -0.15},
  ordercap:{"orderCap": 2},
  noreroll:{"noReroll": 1},
  pricewatch:{"noOvercharge": 1},
  collapse:{"escapeCut": 0.1},
  summons:{"summons": 1},
  fridgebreak:{"shelfCut": 1},
  nightmarket:{"visitors": 3, "overheadAdd": 60},
  draft:{"reward": 1.4, "visitors": -1},
  clearance:{"price": 0.75, "offers": -3},
  eliteorder:{"danger": 1.15, "xpMult": 1.5},
  heatwave:{"drinkDemand": 0.25, "categoryPrice": {"drink": 1.35}},
  gateclosed:{"closeGate": 1},
  trainingweek:{"xpMult": 1.5, "reward": 0.7},
  nearexpiry:{"price": 0.6, "sameDayStock": 1},
  safegates:{"tierOne": 1, "reward": 0.6},
  };
 for(const e of DATA.events)assert.deepEqual(e.effects,EFFECTS[e.id],e.id+' mechanics are unchanged');
 assert.deepEqual(DATA.events.filter(e=>e.weight!==1).map(e=>e.id).sort(),['bard','nightshift'],
  'and so are the two rare weights');
});

console.log(count+' copy groups passed');
