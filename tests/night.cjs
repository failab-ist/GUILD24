// NIGHT_CLOSING — the result matrix.
// One resolved report has to be described the same way four times over: the outcome
// label, WHAT_HAPPENED, WHY, WHAT_CHANGED and the adventurer's own line. This drives the
// real resolver over a wide spread of seeds, packs and gates, and asserts the
// presentation layer never contradicts the state it is describing. It also pins the
// specific contradictions visual QA caught, as fixtures, so they cannot come back.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
const D=DATA,P=Presentation;
let groups=0;const test=(name,fn)=>{fn();groups++;console.log('PASS '+name);};

const OUTCOMES=['대성공','성공','퇴각','부상','중상','사망'];
// A death must never carry a living adventurer's line. Membership in the living pool is the
// real rule, so it stays true as variants are added; the literal pattern is kept as a second
// net for the pinned fixtures, which are written by hand rather than drawn from a pool.
const LIVING_PATTERN=/쉬고 올게요|다녀왔습니다|다시 올게요|살아 돌아왔어요|못 돌아왔어요|익숙해진|잠깐 쉬어야|늘 먹던|귀환을 도왔어요/;
const LIVING={test:q=>LIVING_PATTERN.test(q)||Copy.livingPool().includes(q)};
const DEATH_WORDS=/돌아오지 못했|마지막 영수증/;
// placeholders, and the engine wording NIGHT_CLOSING forbids in player-facing copy
const PLACEHOLDER=/undefined|NaN|\[object Object\]|\bnull\b/;
const ENGINE=/판정 진행|보정 적용|상태 판정|위험도 계산|영구 사망 처리|\bRNG\b|threshold|coefficient|\bresolve\b/i;

// every player-facing string this screen can print, for one report
function surface(r){
 return [P.nightVerdict(r),P.nightHappened(r),P.nightWhy(r),r.quote,
  ...P.nightChanges(r).flatMap(c=>[c.label,c.value,c.extra||'']),
  ...P.supplyLines(r).map(l=>l.text),...P.supplyImpact(r).map(l=>l.text)];
}
function checkOne(r){
 const all=surface(r),joined=all.join(' | ');
 assert.ok(!PLACEHOLDER.test(joined),'no placeholder in "'+joined+'"');
 assert.ok(!ENGINE.test(joined),'no engine wording in "'+joined+'"');
 for(const s of all)assert.equal(typeof s,'string','every player-facing value is a string');
 // A — the label is a supported outcome, or the rescue reading
 const v=P.nightVerdict(r);
 assert.ok(OUTCOMES.includes(v)||v==='위기에서 생환','outcome label is supported: '+v);
 assert.ok(!(r.outcome==='사망'&&v==='위기에서 생환'),'a death is never labelled a rescue');
 // B/C — WHAT_HAPPENED and WHY must agree with the resolved combat and survival state
 const happened=P.nightHappened(r),why=P.nightWhy(r);
 if(r.outcome==='사망'){
  assert.ok(DEATH_WORDS.test(happened),'a death says so: '+happened);
  assert.ok(!/돌아왔다|빠져나왔다|이겼/.test(happened),'no survival language on a death: '+happened);
  assert.ok(!LIVING.test(r.quote),'no living dialogue on a death: '+r.quote);
  assert.ok(!/다시는 가게 문을 열지 않는다/.test(happened),'the permanence line is not duplicated');
  assert.equal(r.combatWon,false,'a death only follows a lost fight');
 }else{
  assert.ok(!DEATH_WORDS.test(happened),'no death language on a survival: '+happened);
 }
 if(r.combatWon===true){
  assert.ok(!/적을 물리치지 못했다/.test(why),'a won fight is never described as lost: '+why);
  assert.ok(!/원정은 끝내지 못했지만 무사히 빠져나왔다/.test(happened),
   'a won fight does not read as a plain retreat: '+happened);
 }
 if(r.combatWon===false)assert.ok(!/적을 물리쳤다/.test(why),'a lost fight is never described as won: '+why);
 if(['대성공','성공'].includes(r.outcome))assert.equal(r.combatWon,true,'a success only follows a won fight');
 // C — a Hazard is only named as the cause when the resolution attributed it
 const named=/(?:^|\. )([^.]+?) 때문에 원정 내내 고전했다/.exec(why);
 if(named){
  assert.ok(r.environmentHurt,'a cause line only appears when an incident happened');
  assert.ok(r.cause&&r.cause!=='accident','a named cause is a real attributed cause');
  assert.equal(named[1],D.hazards[r.cause]||'보급 부담','the named cause is the attributed one');
 }
 if(!r.environmentHurt)assert.ok(!/때문에|사고가 있었다/.test(why),'no incident language without an incident');
 // D — WHAT_CHANGED reports only what moved, and nothing that resolved to zero
 const ch=P.nightChanges(r);
 for(const c of ch){assert.ok(c.label&&c.value,'every change token has a label and a value');
  assert.ok(!/undefined|NaN/.test(c.label+c.value),'no placeholder in a change token');}
 assert.equal(ch.some(c=>c.label==='경험치'),!!r.xp,'경험치 appears exactly when some was gained');
 assert.equal(ch.some(c=>c.label==='전리품'),!!r.loot,'전리품 appears exactly when some was gained');
 if(r.outcome==='사망'){
  assert.ok(!ch.some(c=>c.label==='경험치'||c.label==='전리품'),'a death reports no gain');
  assert.ok(!ch.some(c=>c.kind==='up'&&c.label==='레벨'),'a death reports no growth');
 }
 assert.equal(ch.some(c=>c.label==='휴식'),!!r.recovery,'휴식 appears exactly when rest was set');
 // E/F — the persistent state the next day must match the outcome that was told
 return all;
}

// a run's worth of real resolutions, wide enough to hit every branch
function harvest(){
 const seen={},all=[];
 for(let seed=0;seed<900;seed++){
  const rng=new RNG('NIGHT-'+seed);
  const account={unlocked:[]};
  const n=Adventurer.create(rng,seed,1+seed%28,account);
  n.injury=seed%7===0?1:0;n.fatigue=seed%5;n.alive=true;
  const pool=D.items.map(i=>i.id);
  const pack=[];for(let k=0;k<seed%4;k++)pack.push(pool[(seed*7+k*13)%pool.length]);
  // make the insurance branches reachable on purpose
  if(seed%5===0)pack.push(...D.items.filter(i=>i.effects.escape).map(i=>i.id).slice(0,1));
  if(seed%6===0)pack.push(...D.items.filter(i=>i.effects.revive).map(i=>i.id).slice(0,1));
  if(seed%7===0)pack.push(...D.items.filter(i=>i.effects.injuryGuard).map(i=>i.id).slice(0,1));
  n.pack=pack.filter(Boolean);
  const gate=D.dungeons.filter(x=>x.id!=='final')[seed%(D.dungeons.length-1)];
  const d={...gate,day:1+seed%28,power:20+ (seed%26)*6};
  const r=Dungeon.resolve(n,d,rng,[]);
  r.name=r.name||n.name;
  seen[r.outcome]=(seen[r.outcome]||0)+1;
  if(r.rescued)seen.rescued=(seen.rescued||0)+1;
  if(r.avoidedDeath)seen.avoidedDeath=(seen.avoidedDeath||0)+1;
  if(r.combatWon&&r.outcome==='퇴각')seen.wonRetreat=(seen.wonRetreat||0)+1;
  if(r.environmentHurt)seen.environmentHurt=(seen.environmentHurt||0)+1;
  if(r.events?.some(e=>e.id==='hazard'))seen.hazardEvent=(seen.hazardEvent||0)+1;
  if(r.statChanges?.length)seen.statGrowth=(seen.statGrowth||0)+1;
  if(r.changes?.some(c=>c.startsWith('Lv.')))seen.levelUp=(seen.levelUp||0)+1;
  if(r.changes?.some(c=>/전투 \+/.test(c)))seen.equipment=(seen.equipment||0)+1;
  if(!r.changes?.length&&!r.statChanges?.length)seen.noGrowth=(seen.noGrowth||0)+1;
  all.push({n,r,d});
 }
 return {all,seen};
}
const {all,seen}=harvest();
console.log('  matrix coverage: '+JSON.stringify(seen));

test('the sampled matrix actually covers every supported outcome and causal variant',()=>{
 for(const o of OUTCOMES)assert.ok(seen[o]>0,'sampled '+o+' at least once (got '+(seen[o]||0)+')');
 // wonRetreat — a won fight the injury guard turned into a retreat — is real but far too
 // rare to sample reliably, so it is pinned as a fixture below instead of asserted here.
 for(const k of ['rescued','avoidedDeath','environmentHurt','hazardEvent','statGrowth','levelUp','equipment','noGrowth'])
  assert.ok(seen[k]>0,'sampled the '+k+' variant at least once');
});

test('every resolved result is described the same way by label, story, cause and change',()=>{
 for(const {r} of all)checkOne(r);
});

test('the next persistent NPC state matches the outcome that was told',()=>{
 for(const {n,r} of all){
  assert.equal(n.alive,r.outcome!=='사망','death is permanent for this run');
  assert.equal(n.status==='사망',r.outcome==='사망','status word matches the outcome');
  if(r.outcome==='중상'){assert.equal(n.injury,2,'중상 leaves the heavier injury');assert.ok(n.recovery>0,'중상 needs rest');}
  if(r.outcome==='부상')assert.equal(n.injury,1,'부상 leaves the lighter injury');
  assert.equal(r.injury,n.injury,'the report and the adventurer agree on injury');
  assert.equal(r.recovery,n.recovery,'the report and the adventurer agree on rest');
 }
});

test('supply impact names a real product and a real effect, or says nothing',()=>{
 const names=new Set(D.items.map(i=>i.name));
 let attributed=0;
 for(const {r} of all){
  for(const l of P.supplyImpact(r)){
   attributed++;
   assert.ok(l.items.length,'an impact line always names at least one product');
   for(const item of l.items)assert.ok(names.has(item),'the named product is a real catalog item: '+item);
   assert.ok(r.items.includes(D.items.find(i=>i.name===l.items[0]).id),'the product was actually carried');
   assert.equal(l.who,r.name,'the impact is attributed to the adventurer it happened to');
   assert.ok(!/환경 부담|대응 보급이/.test(l.text),'the rejected generic wording is gone: '+l.text);
   assert.ok(l.text.includes(' → '),'the line reads product -> result: '+l.text);
  }
  // an event with nothing carried to attribute is never forced into the summary
  for(const ev of r.events||[])
   if(!(ev.items||[]).length)assert.ok(!P.supplyImpact(r).some(l=>l.effect&&ev.id==='hazard'&&l.effect.includes('위험 감소')&&!(ev.items||[]).length),
    'an unattributable event is not reported');
 }
 assert.ok(attributed>0,'the sample produced at least one real supply attribution');
});

// The exact combinations visual QA caught, pinned so they cannot return.
test('presentation weight is about copy, and death flavour matches the actual history',()=>{
 let quiet=0,loud=0;
 for(const {n,r} of all){
  const heavy=P.nightWeight(r);heavy?loud++:quiet++;
  // any growth the resolution actually recorded counts as meaningful, not only a level-up
  if((r.statChanges||[]).length||(r.changes||[]).length)
   assert.ok(heavy,'a result showing real growth is not treated as routine');
  if(r.outcome!=='성공')assert.ok(heavy,'only a plain success can be routine');
  if(!heavy){
   assert.equal(r.outcome,'성공','a routine beat is a plain success');
   assert.deepEqual(P.nightChanges(r).filter(c=>c.kind==='up'),[],'a routine beat has no growth to show');
  }
  if(r.outcome==='사망'){
   const receipt=/영수증/.test(r.quote);
   assert.equal(receipt,n.history.length>0,'a receipt line only appears when there were purchases');
   assert.ok(r.quote.length>0,'a death always carries one flavour line');
  }
 }
 assert.ok(quiet>0&&loud>0,'both weights occur in the sample (quiet '+quiet+', weighted '+loud+')');
});

test('the contradictions found in visual QA stay fixed',()=>{
 const base={name:'테스트',dungeonName:'슬라임 하수도 I',level:3,xp:0,loot:0,changes:[],statChanges:[],
  events:[],injury:0,recovery:0,environmentHurt:false,cause:null,rescued:false,avoidedDeath:false};
 // 사망 must never carry living dialogue or survival language
 const dead={...base,outcome:'사망',combatWon:false,quote:'마지막 영수증만 카운터에 남았다.'};
 assert.ok(DEATH_WORDS.test(P.nightHappened(dead)));
 assert.ok(!LIVING.test(dead.quote));
 assert.equal(P.nightVerdict(dead),'사망');
 assert.deepEqual(P.nightChanges(dead),[],'a death reports no gain at all');
 // 대성공 must never claim the enemy was not defeated
 const great={...base,outcome:'대성공',combatWon:true,xp:58,loot:142};
 assert.ok(!/물리치지 못했다/.test(P.nightWhy(great)));
 assert.equal(P.nightWhy(great),'적을 물리쳤다.');
 // a won fight turned into a retreat by the injury guard reads as a won fight
 const wonRetreat={...base,outcome:'퇴각',combatWon:true,xp:9,loot:4,
  events:[{id:'injury-guard',items:['bandage']}]};
 assert.ok(/전투는 이겼지만/.test(P.nightHappened(wonRetreat)),'a won fight is not told as a plain retreat');
 assert.equal(P.nightWhy(wonRetreat),'적을 물리쳤다.');
 // an unknown stat key never reaches the screen as undefined
 const junk={...base,outcome:'성공',combatWon:true,xp:20,loot:30,
  statChanges:[{key:'might',before:1,after:2},{key:'combat',before:18,after:21}]};
 const labelsOut=P.nightChanges(junk).map(c=>c.label);
 assert.ok(!labelsOut.includes(undefined)&&!labelsOut.some(l=>/undefined/.test(l)));
 assert.ok(labelsOut.includes('투력'),'a known stat still reports');
 // a hazard event with no carried item is not attributed to anything
 const bare={...base,outcome:'성공',combatWon:true,xp:20,loot:30,
  events:[{id:'hazard',hazards:['poison'],items:[],prevented:true}]};
 assert.deepEqual(P.supplyImpact(bare),[],'nothing carried means nothing claimed');
 // visible stat growth is material: it must not be filed as a routine result
 assert.ok(P.nightWeight({...base,outcome:'성공',combatWon:true,xp:26,loot:86,
  statChanges:[{key:'combat',before:18,after:21},{key:'survival',before:14,after:15}]}),
  'a success showing stat growth is emphasised, not treated as routine');
 assert.ok(!P.nightWeight({...base,outcome:'성공',combatWon:true,xp:26,loot:86}),
  'a plain success with nothing to report stays routine');
 // the permanence line is carried by the label and WHAT_HAPPENED, not by an extra line
 assert.ok(!read('dist/ui/app.js').includes('다시는 가게 문을 열지 않는다'),
  'the duplicated death line is gone from the screen');
});

console.log(groups+' night groups passed');
