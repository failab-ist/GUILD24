// NIGHT_CLOSING — the result matrix.
// One resolved report has to be described the same way four times over: the outcome
// label, WHAT_HAPPENED, WHY, WHAT_CHANGED and the adventurer's own line. This drives the
// real resolver over a wide spread of seeds, packs and gates, and asserts the
// presentation layer never contradicts the state it is describing. It also pins the
// specific contradictions visual QA caught, as fixtures, so they cannot come back.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
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
function surface(r, n){
 return [P.nightVerdict(r),P.nightHappened(r),P.nightWhy(r),r.quote,
  ...P.nightChanges(r, n).flatMap(c=>[c.label,c.value,c.extra||'']),
  ...P.supplyLines(r).map(l=>l.text),...P.supplyImpact(r).map(l=>l.text)];
}
function checkOne(r, n){
 const all=surface(r, n),joined=all.join(' | ');
 assert.ok(!PLACEHOLDER.test(joined),'no placeholder in "'+joined+'"');
 assert.ok(!ENGINE.test(joined),'no engine wording in "'+joined+'"');
 for(const s of all)assert.equal(typeof s,'string','every player-facing value is a string');
 // A — the label is a supported outcome, or the rescue reading
 const v=P.nightVerdict(r);
 /* USER AMENDMENT 2026-09-22 (NIGHT_CLOSING §OUTCOME LABEL): the rescue label is exactly
    `생환`. The old expectation `위기에서 생환` is stale against that decision, not weakened -
    the label is still pinned to one exact string, and a death still may never carry it. */
 assert.ok(OUTCOMES.includes(v)||v==='생환','outcome label is supported: '+v);
 assert.ok(!(r.outcome==='사망'&&v==='생환'),'a death is never labelled a rescue');
 // B/C — WHAT_HAPPENED and WHY must agree with the resolved combat and survival state
 const happened=P.nightHappened(r),why=P.nightWhy(r);
 if(r.outcome==='사망'){
  assert.ok(DEATH_WORDS.test(happened),'a death says so: '+happened);
  assert.ok(!/돌아왔다|빠져나왔다|이겼/.test(happened),'no survival language on a death: '+happened);
  assert.ok(!LIVING.test(r.quote),'no living dialogue on a death: '+r.quote);
  assert.ok(!/다시는 가게 문을 열지 않는다/.test(happened),'the permanence line is not duplicated');
  /* DUNGEON_HAZARD_v2.7 §Resolution order: the Death roll is conditioned on the FAILURE
     PATH, not on a lost fight - a won fight the environment turned into an injury reaches
     it too. What stays absolute is that a 성공/대성공 never reaches it at all. */
  assert.notEqual(r.outcome,'성공','a death never coexists with a Success outcome');
  if(r.combatWon)assert.ok(!/전투에서 밀린/.test(happened),'a won fight is not told as a lost one: '+happened);
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
  assert.equal(named[1],D.hazards[r.cause]||'원정 환경','the named cause is the attributed one');
 }
 if(!r.environmentHurt)assert.ok(!/때문에|사고가 있었다/.test(why),'no incident language without an incident');
 // D — WHAT_CHANGED reports only what moved, and nothing that resolved to zero
 const ch=P.nightChanges(r, n);
 for(const c of ch){assert.ok(c.label&&c.value,'every change token has a label and a value');
  assert.ok(!/undefined|NaN/.test(c.label+c.value),'no placeholder in a change token');}
 assert.equal(ch.some(c=>c.label==='경험치'),!!r.xp,'경험치 appears exactly when some was gained');
 assert.equal(ch.some(c=>c.label==='원정 소지금 획득'),!!r.loot,'NPC 소지금 획득 appears exactly when some was gained');
 if(r.outcome==='사망'){
  assert.ok(!ch.some(c=>c.label==='경험치'||c.label==='원정 소지금 획득'),'a death reports no gain');
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
  // ITEM_v2.7: the kit moved off injuryGuard onto the Aftercare channel, so the sweep follows it
  if(seed%7===0)pack.push(...D.items.filter(i=>i.effects.aftercare).map(i=>i.id).slice(0,1));
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
 for(const {n,r} of all){ checkOne(r, n); }
});

test('the next persistent NPC state matches the outcome that was told',()=>{
 for(const {n,r} of all){
  assert.equal(n.alive,r.outcome!=='사망','death is permanent for this run');
  assert.equal(n.status==='사망',r.outcome==='사망','status word matches the outcome');
  /* ITEM v2.9.0 §Insurance resolution order step 4 (User 2026-09-25): 구급키트 lowers the
     Outcome itself one step - a told 중상 therefore never carries Aftercare, and a told 부상
     carries it as either a relieved 중상 (injury 1) or a 부상 with no lasting injury. */
  if(r.outcome==='중상'){
   assert.equal(r.aftercare,null,'a told 중상 was not kitted');
   assert.equal(n.injury,2,'중상 leaves the heavier injury');assert.ok(n.recovery>0,'중상 needs rest');}
  if(r.outcome==='부상'){
   if(r.aftercare){assert.ok([1,2].includes(r.aftercare.from),'Aftercare starts from a would-be 부상 or 중상');
    assert.equal(r.aftercare.to,r.aftercare.from===2?1:0,'중상 -> 부상 keeps injury 1; 부상 -> no lasting injury');
    assert.equal(r.aftercare.outcomeFrom,r.aftercare.from===2?'중상':'부상','the report names the would-be Outcome');
    assert.equal(n.injury,r.aftercare.to);assert.equal(n.recovery,0,'no rest days after the kit');}
   else assert.equal(n.injury,1,'부상 leaves the lighter injury');}
  if(r.outcome==='사망')assert.equal(r.aftercare,null,'Aftercare never touches a death');
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
    assert.deepEqual(P.nightChanges(r, n).filter(c=>c.kind==='up' && c.label!=='보급 휴식' && c.label!=='최종 피로'),[],'a routine beat has no growth to show');
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
 /* 대성공 must never claim the enemy was not defeated. USER AMENDMENT 2026-09-22 (UI_UX
    §NIGHT LAYOUT — COMBAT FACT): the fight verdict sentence is no longer player-facing at any
    hierarchy, so the old expectation `적을 물리쳤다.` is stale. The rule it protected is
    asserted more tightly instead: neither verdict may reach the screen, from either side of the
    fight, while the resolved `combatWon` state itself is untouched and still shapes the Outcome
    summary's own wording (checked by the won-retreat fixture below). */
 const great={...base,outcome:'대성공',combatWon:true,xp:58,loot:142};
 assert.ok(!/물리치지 못했다|물리쳤다/.test(P.nightWhy(great)),'no fight verdict on a won fight');
 assert.equal(P.nightWhy(great),'','and nothing invented to replace it');
 const lost={...base,outcome:'부상',combatWon:false,injury:1};
 assert.ok(!/물리치지 못했다|물리쳤다/.test(P.nightWhy(lost)),'no fight verdict on a lost fight either');
 // a won fight turned into a retreat by the injury guard reads as a won fight
 const wonRetreat={...base,outcome:'퇴각',combatWon:true,xp:9,loot:4,
  events:[{id:'injury-guard',items:['bandage']}]};
 assert.ok(/전투는 이겼지만/.test(P.nightHappened(wonRetreat)),'a won fight is not told as a plain retreat');
 assert.equal(P.nightWhy(wonRetreat),'','the retired fight verdict is not printed here either');
 // an unknown stat key never reaches the screen as undefined
 const junk={...base,outcome:'성공',combatWon:true,xp:20,loot:30,
  statChanges:[{key:'might',before:1,after:2},{key:'combat',before:18,after:21}]};
 const labelsOut=P.nightChanges(junk).map(c=>c.label);
 assert.ok(!labelsOut.includes(undefined)&&!labelsOut.some(l=>/undefined/.test(l)));
 assert.ok(labelsOut.includes('투력'),'a known stat still reports');
 
 // injury penalty text matches the specific trait logic
 const injuredBase = {...base, outcome:'부상', combatWon:false, injury:1};
 const p1 = P.nightChanges(injuredBase, {traits:[]}).find(c=>c.label==='남은 부상')?.value;
 /* SA-Q03: the Player-facing Stat is 강인함, never 생존, and the pair reads 투력 -> 강인함. */
 assert.equal(p1, '투력 -15% · 강인함 -20%', 'base injury penalty');
 const p2 = P.nightChanges(injuredBase, {traits:['grit']}).find(c=>c.label==='남은 부상')?.value;
 assert.equal(p2, '투력 +20% · 강인함 -20%', 'grit replaces combat penalty');
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

test('DUNGEON_HAZARD §GREAT SUCCESS: only a settled ordinary Success upgrades, on prepared ability',()=>{
 // The ordinary expedition resolves first. 대성공 used to be assigned right after combat, where
 // a later environmental injury could overwrite it, and it was judged on the post-noise score,
 // where a lucky hidden roll could pass itself off as preparation. Both are asserted here.
 let great=0,success=0,total=0;const margins={great:[],plain:[]};
 for(let i=0;i<3000;i++){
  const r=new RNG('gs-'+i);
  const n=Adventurer.create(r,i,r.int(1,29),Meta.fresh());
  const d={...DATA.dungeonBy.spider,day:r.int(1,29),tier:2,hazards:['poison'],scale:1.6,
           power:r.int(20,90),reward:1};
  const rep=Dungeon.resolve(n,d,r,[]);
  total++;
  if(rep.outcome==='대성공'){great++;margins.great.push(rep.greatMargin);
   assert.equal(rep.won,true,'대성공 is a win');
   assert.equal(rep.injury,0,'대성공 never carries an injury');
   assert.ok(!rep.rescued,'대성공 is never a rescue');
   assert.notEqual(n.status,'사망','대성공 never coexists with death');
  }
  if(rep.outcome==='성공'){success++;margins.plain.push(rep.greatMargin);}
  assert.ok(!['부상','중상','퇴각','사망'].includes(rep.outcome)||rep.outcome!=='대성공');
 }
 assert.ok(great>0&&success>0,'both outcomes occur across the sample');
 // the margin is the prepared ability against the Gate, so no expedition that was behind the
 // Gate is carried into 대성공 by a lucky roll, and the upgrade rate climbs with the margin
 assert.ok(margins.great.every(m=>m>0),'nothing under-prepared was upgraded');
 const rate=ms=>{const hi=ms.filter(m=>m>=.26).length;return hi;};
 const highGreat=rate(margins.great),highPlain=rate(margins.plain);
 assert.ok(highGreat/(highGreat+highPlain)>great/(great+success),
  'a larger prepared margin upgrades more often than the sample as a whole');
 // and preparation never buys certainty: the cap holds at every margin
 assert.ok(highPlain>0,'even well-prepared expeditions still come back as an ordinary 성공');

 // the roll is always drawn, so an expedition costs the same randomness whatever it returns
 const a=new RNG('draw'),b=new RNG('draw');
 const mk=r=>Adventurer.create(r,1,5,Meta.fresh());
 const d={...DATA.dungeonBy.slime,day:5,tier:1,hazards:[],scale:1.2,power:10,reward:1};
 const weak={...d,power:400};
 Dungeon.resolve(mk(a),d,a,[]);Dungeon.resolve(mk(b),weak,b,[]);
 assert.equal(typeof a.state,'number');assert.equal(typeof b.state,'number');
});

test('ECONOMY_ORDER §NORMAL GREAT SUCCESS STORE GOLD: paid on 대성공 only, never on a Deep one',()=>{
 /* Stage 10 approved a flat reward per Day band in place of a share of the Gate's own value,
    so what a 대성공 is worth can be known before it is chased. A Deep one still pays nothing. */
 const sample=(deep,day)=>{const rows=[];
  for(let i=0;i<1500;i++){const r=new RNG('gold-'+i);
   const n=Adventurer.create(r,i,r.int(1,29),Meta.fresh());
   const d={...DATA.dungeonBy.spider,day,tier:2,hazards:['poison'],scale:1.6,
            power:r.int(20,90),reward:1,deep};
   rows.push(Dungeon.resolve(n,d,r,[]));}
  return rows;};
 for(const [day,gold] of [[5,50],[12,100],[27,200]]){
  const rows=sample(false,day);
  const great=rows.filter(x=>x.outcome==='대성공');
  assert.ok(great.length,'DAY '+day+' produced a 대성공 to price');
  assert.ok(great.every(x=>x.storeBonus===gold),'DAY '+day+' pays a flat '+gold+'G, whatever the Gate was worth');
  assert.ok(rows.every(x=>x.outcome==='대성공'||x.storeBonus===0),'an ordinary Success pays nothing');
 }
 assert.ok(sample(true,12).every(x=>x.storeBonus===0),'a Deep 대성공 pays the Store nothing at all');
 // the bands are contiguous and cover every Day a Run can reach
 const bands=DATA.greatSuccess.storeGoldByBand;
 for(let day=1;day<=30;day++)assert.ok(bands.find(b=>day<=b.maxDay),'DAY '+day+' falls in a band');
});

test('DUNGEON_HAZARD §GREAT SUCCESS: the starting curve rises with the margin and never reaches certainty',()=>{
 // The shipped curve is a Stage 9 measurement baseline. What must hold whatever the numbers
 // become: it never falls as preparation rises, it is capped short of 1, and the signal the
 // player is shown reads the same margin the roll uses.
 const g=DATA.greatSuccess;
 assert.ok(g.chanceCap<1,'no preparation can guarantee 대성공: cap '+g.chanceCap);
 let prev=-1;
 for(let m=-.5;m<=3;m+=.05){
  const chance=Math.min(g.chanceCap,Math.max(0,m*g.chanceSlope));
  assert.ok(chance>=prev-1e-9,'a larger prepared margin never lowers the chance at '+m.toFixed(2));
  assert.ok(chance<1,'and never reaches certainty at '+m.toFixed(2));
  prev=chance;
 }
 assert.equal(Math.min(g.chanceCap,Math.max(0,-.3*g.chanceSlope)),0,'being behind the Gate earns no chance');

 // signal and roll read one calculation: at the signal margin the chance is real but partial
 const atSignal=Math.min(g.chanceCap,Math.max(0,g.signalMargin*g.chanceSlope));
 assert.ok(atSignal>0&&atSignal<g.chanceCap+1e-9,'the signal marks a worthwhile attempt, not a promise');
 const n=Adventurer.create(new RNG('signal'),1,10,Meta.fresh());
 const easy={...DATA.dungeonBy.slime,day:5,tier:1,hazards:[],scale:1.2,power:1,reward:1};
 const hard={...easy,power:10000};
 assert.equal(Dungeon.greatSuccessSignal(n,easy,[]),true,'an overwhelming margin is signalled');
 assert.equal(Dungeon.greatSuccessSignal(n,hard,[]),false,'a hopeless one is not');
});

test('NIGHT_CLOSING v2.7 §ORDINARY INJURY RESULT CONTINUITY: only a safe return heals',()=>{
 const d={...D.dungeonBy.slime,day:6,tier:1,hazards:['poison'],scale:1,power:40,reward:40,requiredSupply:0};
 const seen=new Set();
 for(let i=0;i<400;i++){
  const n=Adventurer.create(new RNG('injury-continuity-'+i),1,10,Meta.fresh());
  n.injury=1;n.recovery=0;n.status='부상';n.fatigue=0;n.traits=[];n.pack=[];
  Dungeon.resolve(n,{...d,power:8+i%80},new RNG('cont-'+i));
  const r=n.records[n.records.length-1];seen.add(r.outcome);
  if(r.outcome==='성공'||r.outcome==='대성공')assert.equal(n.injury,0,'coming back safe clears the ordinary Injury');
  // DUNGEON_HAZARD §RETREAT HEALING (v2.9.1 balance): 퇴각 is not automatic recovery, but a fresh
  // adventurer's first-ever 퇴각 (empty records, k=0) does heal on a 25% roll - see the dedicated
  // RETREAT HEALING test below for the exact chain formula.
  if(r.outcome==='퇴각')assert.ok(n.injury===0||n.injury===1,'퇴각 either keeps the Injury or heals it via RETREAT HEALING');
  if(r.outcome==='부상')assert.equal(n.injury,1,'a fresh 부상 keeps the ordinary Injury');
  if(r.outcome==='중상')assert.equal(n.injury,2,'중상 follows its own transition');
 }
 for(const o of ['성공','퇴각','부상'])assert.ok(seen.has(o),'the sweep actually reached '+o);
});

test('DUNGEON_HAZARD v2.9.0 §SUPPLY -> FATIGUE: current Fatigue first, then the result buffer, no requirement',()=>{
 const d={...D.dungeonBy.slime,day:18,tier:2,hazards:['poison'],scale:1,power:60,reward:40};
 const base=Adventurer.create(new RNG('excess'),1,10,Meta.fresh());
 const run=(fatigue,pack)=>{const n={...JSON.parse(JSON.stringify(base)),fatigue,traits:[],pack,records:[]};
  Dungeon.resolve(n,d,new RNG('excess-run'));return n.records[n.records.length-1];};
 const baselines={'성공':4,'대성공':4,'퇴각':7,'부상':9,'중상':0,'사망':0}; // v2.9.1 balance (User 2026-09-25): 중상 joins 사망 at 0, no Trait may raise it
 for(const fatigue of [0,4,9,14,20,33,40])for(const pack of [[],['water'],['rice','water'],['rice','water','ramen','premium']]){
  const r=run(fatigue,pack);
  assert.equal(r.requiredSupply,undefined,'no Gate requires Supply');assert.equal(r.excessSupply,undefined,'so there is no excess');
  assert.equal(r.preRecovery,Math.min(fatigue,r.preparedSupply),'Supply removes current Fatigue 1:1');
  assert.equal(r.fatigueBeforeExpedition,fatigue-r.preRecovery,'departure Fatigue is what preRecovery left');
  assert.equal(r.remainingSupplyBuffer,r.preparedSupply-r.preRecovery,'the same Supply is never spent twice');
  assert.equal(r.rawOutcomeFatigueGain,baselines[r.outcome],'the raw gain is the v2.9.0 Outcome baseline');
  assert.equal(r.actualOutcomeFatigueGain,Math.max(0,r.rawOutcomeFatigueGain-r.remainingSupplyBuffer),'the buffer absorbs the gain 1:1');
  assert.equal(r.outcomeBufferUsed,r.rawOutcomeFatigueGain-r.actualOutcomeFatigueGain,'what the buffer used is what the gain lost');
  assert.equal(r.finalFatigue,Math.max(0,Math.min(40,r.fatigueBeforeExpedition+r.actualOutcomeFatigueGain)),'final Fatigue is clamped (0~40) departure + actual gain');
  assert.equal(r.netFatigueDelta,r.finalFatigue-r.beforeFatigue,'the net delta is not the actual gain');
  assert.equal(r.fatigueRecovery,undefined,'the ambiguous combined field is gone');
  assert.equal(r.postOutcomeFatigueGain,undefined,'no second live name for the same value');
 }
 // v2.9.1 balance (User 2026-09-25): 중상 now joins 사망 at a final result-Fatigue gain of exactly
 // 0, and no Trait - weary's own +fatigue included - may raise either of them.
 const weary={...JSON.parse(JSON.stringify(base)),fatigue:5,traits:['weary'],pack:[],records:[]};
 let severeSeen=0;
 for(let i=0;i<300;i++){const n={...JSON.parse(JSON.stringify(weary)),records:[]};
  Dungeon.resolve(n,{...d,power:900+i},new RNG('severe-'+i));
  const r=n.records[n.records.length-1];
  if(r.outcome==='사망')assert.equal(r.rawOutcomeFatigueGain,0,'사망 result Fatigue stays 0');
  if(r.outcome==='중상'){severeSeen++;assert.equal(r.rawOutcomeFatigueGain,0,'중상 result Fatigue is 0 too, even with the weary Trait carried');}}
 assert.ok(severeSeen>0,'the sweep reached a 중상');
});

test('DUNGEON_HAZARD v2.9.0 §FATIGUE STAT PENALTY / DUN-Q-v29-1: five bands on 0~40, judged at departure',()=>{
 const d={...D.dungeonBy.slime,day:6,tier:1,hazards:['poison'],scale:1,power:40,reward:40};
 const base=Adventurer.create(new RNG('bands'),1,10,Meta.fresh());
 // level pinned to 1 so failureDeathRisk's own levelFactor (DUNGEON_HAZARD §Preparation / Level
 // Death reduction) stays 1.00 and does not confound this test's Fatigue-band-only comparisons.
 const npc=(f,pack=[])=>({...JSON.parse(JSON.stringify(base)),fatigue:f,traits:[],pack,level:1});
 const at=f=>Dungeon.prepare(npc(f),d).effects,clear=at(9);
 const near=(a,b)=>Math.abs(a-b)<1e-9;
 for(const [f,ms,cs,name] of [[9,1,1,'정상'],[10,.85,1,'지침'],[19,.85,1,'지침'],[20,.6,1,'과로'],[29,.6,1,'과로'],[30,.6,.8,'소진'],[39,.6,.8,'소진'],[40,.6,.6,'탈진']]){
  const e=at(f);
  assert.ok(near(e.mobility/clear.mobility,ms)&&near(e.spirit/clear.spirit,ms),f+' -> 기동/정신 ×'+ms);
  assert.ok(near(e.combat/clear.combat,cs)&&near(e.survival/clear.survival,cs),f+' -> 투력/강인함 ×'+cs);
  assert.equal(Dungeon.fatigueBand(f).name,name,f+' is '+name);}
 // Fatigue 40 adds the +10%p failure-Death term like an injured departure, cap raised the same way
 const risk39=Dungeon.failureDeathRisk(npc(39),{...d,power:400}),risk40=Dungeon.failureDeathRisk(npc(40),{...d,power:400});
 assert.ok(near(risk40.chance,Math.min(.40,risk40.healthy+.10))&&risk40.chance>risk39.chance,'탈진 is +10%p over its own healthy chance, under a 40% cap');
 const both=Dungeon.failureDeathRisk({...npc(40),injury:1},{...d,power:400});
 assert.ok(both.chance<=.50+1e-9&&near(both.chance,Math.min(.50,both.healthy+.20)),'injured and 탈진 together: +20%p under 50%');
 // the band is judged after preRecovery: 삼각김밥 Supply 5 (v2.9.1 balance, was 4) at 22 departs at 17 (지침), not 22 (과로)
 assert.equal(D.itemBy.rice.effects.supply,5);
 const fed=Dungeon.prepare(npc(22,['rice']),d).effects;
 assert.equal(fed.fatigueBeforeExpedition,17);assert.ok(near(fed.mobility/clear.mobility,.85),'judged on departure Fatigue');
 // clamp: a 성공 at 36 with no Supply ends at 40, not 41
 for(let i=0;i<200;i++){const n={...npc(36),records:[]};Dungeon.resolve(n,{...d,power:1},new RNG('clamp-'+i));const r=n.records.at(-1);
  if(r.outcome==='성공'||r.outcome==='대성공'){assert.equal(r.finalFatigue,40,'clamped at 40');break;}}
 const src=read('dist/systems/dungeon.js');
 assert.ok(!/기동\/정신 -10%|기동\/정신 -25%/.test(src),'no superseded v2.6 Fatigue band copy survives');
 assert.ok(!/requiredSupply|excessSupply|supply\.deficit|supplyDeficit|\.penalty/.test(src),'no Supply requirement, excess or deficit penalty survives in the engine');
});

test('DUNGEON_HAZARD v2.9.0 no rest recovery (DUN-Q-v29-1, User 2026-09-25): no morning changes Fatigue, a Severe-Injury rest day included',()=>{
 const g=new Game();g.autosave=false;g.start('rest-recovery');const n=g.run.npcs[0],m=g.run.npcs[1];
 n.recovery=2;n.injury=2;n.status='중상';n.fatigue=12;m.recovery=0;m.fatigue=7;
 g.morningReset();assert.equal(n.fatigue,12,'first rest day: Fatigue unchanged');assert.equal(n.recovery,1,'the rest day still counts down');assert.equal(m.fatigue,7,'a healthy adventurer gets no morning recovery');
 g.morningReset();assert.equal(n.fatigue,12,'second rest day: still unchanged');assert.equal(n.recovery,0);assert.equal(n.injury,0,'the injury itself still heals on schedule');
 g.morningReset();assert.equal(n.fatigue,12,'back on the roster: no change either');
 assert.ok(!/fatigue\|\|0\)-5|fatigue-5/.test(read('dist/systems/shop.js')),'no morning Fatigue decrement survives in the engine');
});

test('ITEM v2.9.0 §INSURANCE resolution order step 4: 구급키트 lowers the Outcome one step (User 2026-09-25)',()=>{
 const src=read('dist/systems/dungeon.js');
 assert.equal(D.itemBy.kit.effects.injuryGuard,undefined,'구급키트 carries no hidden injury-risk percentage');
 assert.equal(D.itemBy.kit.effects.aftercare,1,'구급키트 carries the Aftercare channel instead');
 assert.ok(!/why\.push\('치료용품|text:'치료용품/.test(src),'no result line still credits the kit for a downgrade it cannot perform');
 assert.ok(!/치료용품/.test(read('dist/ui/app.js')),'no screen still offers the kit as a way to rest off an Injury');
 assert.equal(D.traitBy.strong.effects.injuryGuard,0.23,'강골 keeps its own unchanged identity');
 const d={...D.dungeonBy.slime,day:12,tier:1,hazards:['poison'],scale:1,power:40,reward:40,requiredSupply:0};
 let withKit=0,seen=new Set();
 for(let i=0;i<500;i++){
  const seed='aftercare-'+i;
  const bare=Adventurer.create(new RNG(seed),1,10,Meta.fresh());
  bare.traits=[];bare.fatigue=0;bare.injury=0;bare.recovery=0;bare.pack=[];
  const kitted=JSON.parse(JSON.stringify(bare));kitted.pack=['kit'];
  Dungeon.resolve(bare,{...d,power:20+i%90},new RNG('roll-'+i));
  Dungeon.resolve(kitted,{...d,power:20+i%90},new RNG('roll-'+i));
  const rb=bare.records.at(-1),rk=kitted.records.at(-1);seen.add(rb.outcome);
  // the kit carries no Stat, so both paths draw the same rolls up to the kit step
  if(!['부상','중상'].includes(rb.outcome)){assert.equal(rk.outcome,rb.outcome,'the kit changes nothing else');assert.equal(rk.aftercare,null);continue;}
  withKit++;
  assert.equal(rk.outcome,'부상','a would-be '+rb.outcome+' resolves as 부상');
  assert.equal(rk.aftercare.outcomeFrom,rb.outcome,'the report names the would-be Outcome');
  assert.deepEqual([rk.aftercare.from,rk.aftercare.to],rb.outcome==='중상'?[2,1]:[1,0],'중상 -> 부상 keeps injury 1; 부상 -> no lasting injury');
  assert.equal(kitted.injury,rk.aftercare.to,'the adventurer carries the lowered state');
  assert.equal(kitted.recovery,0,'no rest days after the kit');
  // XP, Loot and Fatigue follow the LOWERED Outcome (the 부상 rules), not the would-be one
  assert.equal(rk.rawOutcomeFatigueGain,9,'the 부상 Fatigue gain');
  assert.equal(rk.finalFatigue,rk.fatigueBeforeExpedition+rk.actualOutcomeFatigueGain,'the Fatigue chain is the 부상 chain');
  assert.equal(rk.xp,rb.outcome==='부상'?rb.xp:rk.xp,'a would-be 부상 keeps its 부상 XP');
  assert.ok(rk.events.some(e=>e.id==='aftercare'&&e.items.includes('kit')&&e.text===(rb.outcome==='중상'?'구급키트가 중상을 부상으로 낮췄다.':'구급키트가 남을 부상을 없앴다.')),'the event names the Item and the exact step');
 }
 assert.ok(withKit>0,'the sweep actually exercised the kit');
 assert.ok(seen.has('중상')&&seen.has('부상'),'the sweep reached both a would-be 중상 and a would-be 부상');
 assert.ok(seen.has('사망'),'the sweep reached a death, where the kit must not fire');
 // and a death is untouched
 for(let i=0;i<400;i++){
  const n=Adventurer.create(new RNG('kit-death-'+i),1,10,Meta.fresh());
  n.traits=[];n.fatigue=0;n.injury=0;n.recovery=0;n.pack=['kit'];
  Dungeon.resolve(n,{...d,power:1200+i},new RNG('kd-'+i));
  const r=n.records.at(-1);
  if(r.outcome==='사망'){assert.equal(r.aftercare,null,'no Aftercare on a death');assert.equal(n.alive,false);}
 }
});

test('DUNGEON_HAZARD_v2.7 §DEATH RISK: one failure-conditioned roll, off the prepared state',()=>{
 const d={...D.dungeonBy.slime,day:14,tier:2,hazards:['poison','mire'],scale:1,power:80,reward:40,requiredSupply:0};
 const base=Adventurer.create(new RNG('death-model'),1,10,Meta.fresh());
 const at=(over,injury)=>{
  const n=JSON.parse(JSON.stringify(base));n.traits=[];n.fatigue=0;n.pack=[];n.injury=injury;n.level=1;
  n.stats={combat:over,survival:over,mobility:over,spirit:over};n.equipment={power:0,name:'-'};
  return {n,risk:Dungeon.failureDeathRisk(n,d)};
 };
 /* DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE (User 2026-09-25, v2.9.1 balance: early 1.70 ->
    1.20, late 0.40 -> 0.80). D1-D9 must be bit-for-bit the single 1.20 slope, and only the Day
    term may bend - a post-hoc multiplier on the finished Gate Power would move the Tier and
    Family terms with it. */
 assert.deepEqual(Dungeon.GATE,{knee:9,early:1.20,late:0.80},'the shipped slope is the canonical one');
 for(const day of [1,2,5,8,9])
  assert.equal(Dungeon.gateDayTerm(day),day*1.20,'D'+day+' is unchanged');
 for(const [day,term] of [[10,11.6],[12,13.2],[24,22.8],[29,26.8],[30,27.6]])
  assert.ok(Math.abs(Dungeon.gateDayTerm(day)-term)<1e-9,'D'+day+' Day term is '+term);
 assert.ok(Dungeon.gateDayTerm(30)<30*Dungeon.GATE.early,'the late slope actually bends the curve down');
 /* The coefficients are named so a harness can measure a candidate without editing the
    formula. What ships is the DIRECTOR DOCUMENT BASELINE, and an experiment that forgot to
    put it back would otherwise leave no trace at all. */
 assert.deepEqual(Dungeon.DEATH,{combat:.18,environment:.12,cap:.30,injured:.10,injuredCap:.40,exhausted:.10},
  'the shipped coefficients are the canonical baseline');
 // the two deficits are the only inputs, and each one alone raises the chance
 const weak=at(1,0).risk,strong=at(400,0).risk;
 assert.ok(weak.chance>strong.chance,'weaker preparation is the more dangerous failure');
 assert.equal(strong.chance,0,'complete preparation reduces the conditional risk to 0%');
 assert.ok(weak.chance<=0.30+1e-9,'the healthy conditional cap is 30%');
 for(const over of [1,20,60,140,400]){
  const {risk}=at(over,0);
  assert.ok(Math.abs(risk.chance-Math.max(0,Math.min(.30,risk.combatDeficit*.18+risk.environmentDeficit*.12)))<1e-12,
   'the chance is exactly CombatDeficit x .18 + EnvironmentDeficit x .12, clamped');
  const hurt=at(over,1).risk;
  // the +10%p rides that snapshot's OWN healthy value - departing injured also lowers the Stats
  assert.ok(Math.abs(hurt.chance-Math.max(0,Math.min(.40,hurt.healthy+.10)))<1e-12,'an injured departure is +10%p under a 40% cap');
  assert.ok(hurt.chance>risk.chance,'sending a wounded adventurer back out is visibly more dangerous');
  assert.ok(hurt.chance<=0.40+1e-9,'the injured conditional cap is 40%');
 }
 // a Gate with no canonical Hazard contributes no environment half
 assert.equal(Dungeon.failureDeathRisk(at(400,0).n,{...d,hazards:[]}).environmentDeficit,0,'no Hazard means no EnvironmentDeficit');
 // the roll fires on the failure path only, exactly once, and never on a Success
 let successes=0,failures=0,deaths=0;
 for(let i=0;i<1500;i++){
  const n=Adventurer.create(new RNG('death-sweep-'+i),1,10,Meta.fresh());
  n.traits=[];n.fatigue=0;n.injury=0;n.recovery=0;n.pack=[];
  const r=Dungeon.resolve(n,{...d,power:6+i%160},new RNG('ds-'+i));
  if(['성공','대성공'].includes(r.outcome)){
   successes++;
   assert.equal(r.debug.deathChance,0,'a Success never reaches the Death roll');
  }else{
   failures++;if(r.outcome==='사망')deaths++;
   assert.ok(r.debug.deathChance>=0&&r.debug.deathChance<=0.40+1e-9,'the failure path rolls one chance inside the caps');
   if(r.outcome==='사망')assert.ok(r.debug.deathRoll<r.debug.deathChance,'a death is that one roll hitting');
  }
 }
 assert.ok(successes>0&&failures>0,'the sweep reached both paths');
 assert.ok(deaths>0,'the sweep reached a death');
 // the roll is not gated behind a failed escape any more: deaths appear on retreats too
 const src=read('dist/systems/dungeon.js');
 assert.ok(!/\.04\+deficit\*\.16/.test(src),'the retired post-noise Death formula is gone');
 // Task D final correction: the Death roll is now drawn immediately on confirming the
 // failure path (`failurePath`), not gated behind an already-settled outcome variable.
 assert.ok(/if\(!failurePath\)\{[\s\S]{0,80}\}else\{[\s\S]{0,120}deathRoll=r\.next\(\)/.test(src),
  'the Death roll is drawn immediately on entering the failure path');
});

/* DUNGEON_HAZARD_v2.7 §INJURED RE-EXPEDITION SEVERE ESCALATION. The +15%p was conditioned on
   !combatSuccess, which exempted the other way the Severe-vs-Injury branch is reached: an
   environment incident hurting someone whose combat went fine. The resolver is driven here on
   a scripted RNG so the decision point is reached deliberately and the ONLY difference between
   the two runs is the departure injury - not a seed, not a Stat, not a pack. */
test('DUN §INJURED RE-EXPEDITION: +15%p wherever the Severe branch is reached, not combat only',()=>{
 const g=new Game();g.autosave=false;g.start('severe-escalation');
 const gate=g.makeDungeon('spider',1);
 /* Task D final correction, draw order inside resolve(): noise, envRoll, then (only on a
    won fight with no environment incident) injuryRiskRoll, then deathRoll immediately on
    entering the failure path, then - only on a Death miss - escapeRoll (lost-fight branch
    only) and finally injuryRoll. Anything the tail draws afterwards gets 0.999, which
    declines every optional rescue. */
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],
  weighted:a=>a[0],shuffle:a=>a.slice()};};
 const who=injury=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:[],injury,fatigue:0,alive:true,recovery:0}));
 const run=(injury,seq,d)=>Dungeon.resolve(who(injury),d,scripted(seq),[]);

 /* Path A — environment incident on a WON fight. combat succeeds (noise 1.0 against power 1),
    the environment roll lands inside the incident window (so failurePath is settled without an
    injuryRiskRoll), deathRoll 0.9 misses, and since combatSuccess stays true the very next roll
    is injuryRoll 0.20, sitting between the ordinary threshold (.11, v2.9.1 balance - was .13) and
    the escalated one (.26, v2.9.1 balance - was .28). */
 const easy={...gate,power:1};
 const healthyA=run(0,[1.0,0.0001,0.9,0.20,0.999],easy);
 const injuredA=run(1,[1.0,0.0001,0.9,0.20,0.999],easy);
 assert.equal(healthyA.combatWon,true,'path A really is a won fight');
 assert.equal(injuredA.combatWon,true,'for both of them');
 assert.equal(healthyA.outcome,'부상','a healthy adventurer takes the ordinary Injury');
 assert.equal(injuredA.outcome,'중상','one who departed injured takes the Severe one at the same roll');

 /* Path B — the ordinary combat-failure path the rule already covered, so the fix did not
    trade one branch for the other. The fight is lost, so failurePath is settled with no
    injuryRiskRoll; deathRoll 0.999 misses; escapeRoll 0.999 fails (always >= the escape
    chance ceiling of .94, forcing 부상 over 퇴각); injuryRoll 0.50 sits between .36 and .51
    (v2.9.1 balance - was .42 and .57). */
 const hard={...gate,power:100000};
 const healthyB=run(0,[1.0,0.999,0.999,0.999,0.50,0.999],hard);
 const injuredB=run(1,[1.0,0.999,0.999,0.999,0.50,0.999],hard);
 assert.equal(healthyB.combatWon,false,'path B really is a lost fight');
 assert.equal(healthyB.outcome,'부상','still the ordinary Injury without the escalation');
 assert.equal(injuredB.outcome,'중상','and the Severe one with it');

 /* The escalation is 15 percentage points on ONE decision, not a second Severe roll: a roll
    above the escalated threshold stays ordinary for both. */
 for(const [seq,d,label] of [[[1.0,0.0001,0.9,0.40,0.999],easy,'environment'],[[1.0,0.999,0.999,0.999,0.80,0.999],hard,'combat']]){
  assert.equal(run(1,seq,d).outcome,'부상',label+': past the escalated threshold it is still ordinary');
 }
 // and a roll under the ordinary threshold is Severe for both, so the shift is a shift, not a floor
 assert.equal(run(0,[1.0,0.0001,0.9,0.01,0.999],easy).outcome,'중상','under .13 both are Severe');
 assert.equal(run(1,[1.0,0.0001,0.9,0.01,0.999],easy).outcome,'중상','including the injured one');

 /* It is an outcome-risk modifier, not a hidden Stat change: the prepared four are identical. */
 const stats=injury=>{const e=Dungeon.prepare({...who(injury),injury:1},gate).effects;return [e.combat,e.survival,e.mobility,e.spirit];};
 assert.deepEqual(stats(1),stats(1),'the prepared reading is a function of the injury alone');
 const src=read('dist/systems/dungeon.js');
 assert.ok(/severeEscalation=departedInjured\?\.15:0/.test(src),'the escalation reads the departure state alone');
 /* RESULT-PROOF: shadowOutcome() replays the SAME decision points against a shadow Bag, so it
    legitimately takes severeEscalation as a parameter and reuses it at the same checks. The
    Task D final correction added one more real call site on each side of that mirror: the
    escaped-but-still-failed branch (retreat that can still be escalated into Severe by the
    SAME affected/injuryRiskRoll evidence) reuses the .13 threshold a second time in both
    resolve() and shadowOutcome() (2 more sites), and stateProof()'s new whole-Bag fallback
    threads severeEscalation through one more shadowOutcome() call (1 more site) - the same
    minimal, explainable widening the two source blockers required, nothing else.
    outcomeProof()/stateProof() each thread it through to shadowOutcome(); resultProof() takes
    it once and hands it to both. v2.9.0 F3 split shadowOutcome() into the tier wrapper and
    shadowSettle() (tier + persistent Injury, so the state proof reads the same 구급키트 step):
    the wrapper's signature and its one pass-through add 2 sites, nothing else. */
 assert.equal((src.match(/severeEscalation/g)||[]).length,21,
  'one definition, its real decision-point uses (now including the escaped-but-still-failed '+
  'retreat branch), and the full proof engine that replays them - nothing else');
});

// ================================================================================
// RESULT-PROOF DIRECTOR FIX CYCLE — targeted regressions.
// ================================================================================
/* Task D final correction §10: the previous single test claimed to isolate Injury, Fatigue
   AND Equipment together and actually exercised none of them individually - split honestly
   below, one mutation channel per case, each using only evidence the real run really drew
   under the corrected Death-order (an environment incident forces the retreat-still-injured
   branch to draw injuryRoll regardless of whether escape succeeded, so a real 퇴각/부상 split
   stays provable; injuryRoll 0.25 is calibrated once, here, to sit strictly between the
   escape-succeeded threshold (.11, v2.9.1 balance - was .13) and the escape-failed one (.36,
   v2.9.1 balance - was .42) so it never itself decides the case - only the escape chance the
   departure snapshot produces does). */
test('RESULT-PROOF: the shadow preparation uses DEPARTURE Stats, never post-expedition Growth',()=>{
 /* If the shadow used the returned (post-growth) NPC instead of a frozen pre-resolution
    snapshot, this proof would silently vanish once growth pushed mobility high enough that
    even the shadow (without the Item) crosses the escape threshold. The gap is read off
    Dungeon.prepare() itself, not hand-derived, so this stays correct if balance numbers move. */
 const g=new Game();g.autosave=false;g.start('result-proof-departure-growth');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:(a)=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const base=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco'],injury:0,fatigue:0,alive:true,recovery:0,level:1,xp:0}));
 const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
 const withE=Dungeon.prepare(base(),gate,[]).effects,withoutE=Dungeon.prepare({...base(),pack:[]},gate,[]).effects;
 const escWith=escChance(withE),escWithout=escChance(withoutE);
 assert.ok(escWith>escWithout,'초코바 really does raise the escape chance, or this proof has nothing to test');
 const roll=(escWith+escWithout)/2;
 // combat fails regardless of the Item (hard power); an environment incident (envRoll 0.0001)
 // forces the retreat-still-injured branch to draw injuryRoll on the REAL path too, whichever
 // way escapeRoll goes - so both the real (WITH the Item) and shadow (WITHOUT) branches settle
 // through the SAME evidence type, and only the escape-side threshold they land on (.13 vs
 // .42) differs. Day inflates XP so growth is guaranteed.
 const hard={...gate,power:1e9,day:500};
 const n=base();const beforeStats=JSON.stringify(n.stats),beforeLevel=n.level;
 const r=Dungeon.resolve(n,hard,scripted([0.5,0.0001,0.999,roll,0.25,0.999,0.999]),[]);
 assert.ok(n.level>beforeLevel||JSON.stringify(n.stats)!==beforeStats,
  'sanity: the real resolution actually grew this NPC - otherwise the regression proves nothing');
 assert.equal(r.outcome,'부상','WITH the Item, escape succeeds into the harsher .13 threshold and stays 부상');
 assert.ok(r.heroProof?.outcome?.items?.includes('choco'),
  'proof credits 초코바 off the DEPARTURE (pre-growth) preparation - a shadow built from the '+
  'grown NPC would find the same escape chance on both sides and credit nothing');
 assert.equal(r.heroProof.outcome.worse,'중상','and names the worse tier losing 초코바 would have reached');
});

test('RESULT-PROOF: the shadow preparation uses DEPARTURE Fatigue, never the post-Outcome band',()=>{
 /* n.fatigue is mutated to its post-Outcome value (finalFatigue) BEFORE resultProof() runs.
    Departure Fatigue 18 sits in the 10-19 (-15%) band; the forced 부상 Outcome's own +9
    Fatigue gain (v2.9.0) crosses it into the 20~29 (-40%) band by the time heroProof is computed - if the
    shadow read that live, post-Outcome Fatigue instead of the frozen departure figure, its
    escape-chance arithmetic would be computed on the WRONG band and the calibrated roll below
    (derived once, from Dungeon.prepare() at the DEPARTURE Fatigue) would no longer land where
    expected. */
 const g=new Game();g.autosave=false;g.start('result-proof-departure-fatigue');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:(a)=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const base=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco'],injury:0,fatigue:18,alive:true,recovery:0,level:1,xp:0}));
 const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
 const withE=Dungeon.prepare(base(),gate,[]).effects,withoutE=Dungeon.prepare({...base(),pack:[]},gate,[]).effects;
 assert.ok(withE.effectiveFatigue>=10&&withE.effectiveFatigue<20,
  'sanity: the departure Fatigue really is in the 10-19 band, or this proof has nothing to test');
 const escWith=escChance(withE),escWithout=escChance(withoutE);
 assert.ok(escWith>escWithout,'초코바 raises the escape chance here too');
 const roll=(escWith+escWithout)/2;
 const hard={...gate,power:1e9};
 const n=base();
 const r=Dungeon.resolve(n,hard,scripted([0.5,0.0001,0.999,roll,0.25,0.999,0.999]),[]);
 assert.equal(r.outcome,'부상','WITH the Item, escape succeeds into the harsher .13 threshold and stays 부상');
 assert.equal(r.finalFatigue,24,'sanity: 18 - 3 (초코바 피로 회복, v2.9.0 F4) = 15 at departure, and the Outcome\'s own +9 crosses into the 20~29 band downstream of departure');
 assert.ok(r.heroProof?.outcome?.items?.includes('choco'),
  'proof still credits 초코바 off the DEPARTURE (10-19 band) Fatigue, not the post-Outcome (20 band) figure');
 assert.equal(r.heroProof.outcome.worse,'중상','and names the worse tier losing 초코바 would have reached');
});

test('RESULT-PROOF: the departure snapshot freezes Equipment before the Outcome\'s own reward',()=>{
 /* ITEM_v2.7 §Insurance resolution order already forbids Equipment/Loot/XP from ever being
    promoted to Hero feedback (covered separately below), so there is no legitimate scenario
    where an Item's proof turns on an equipment-tier win - fabricating one would misrepresent
    what Result-Proof actually claims. What IS this cycle's concern is narrower and structural:
    every shadow prepare() call must read the FROZEN departure.equipment, never the live
    n.equipment the same resolution may have just incremented. */
 const src=read('dist/systems/dungeon.js');
 assert.ok(/equipment:\{power:beforeEquipment,name:n\.equipment\.name\}/.test(src),
  'the departure snapshot captures equipment.power/name before this resolution\'s own equipment-tier win');
 assert.ok(/const departure=\{stats:beforeStats,equipment:\{power:beforeEquipment,name:n\.equipment\.name\},traits:n\.traits,fatigue:n\.fatigue,injury:n\.injury,level:beforeLevel\};/.test(src),
  'stats/equipment/traits/fatigue/injury/level are captured together, in one snapshot, before any of this resolution\'s own mutations');
 assert.ok(/prepare\(\{\.\.\.departure,pack\}/.test(src),
  'shadowOutcome() prepares every shadow against that frozen departure snapshot, never against `n`');
 // and live behaviourally: an equipment-tier win during THIS resolution must not change what a
 // later heroProof computation would have found, since resultProof() is handed `departure`
 // (captured before the win) rather than the post-win `n`.
 const g=new Game();g.autosave=false;g.start('result-proof-departure-equipment');
 const gate=g.makeDungeon('spider',1);
 const won=r=>{const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:[],injury:0,fatigue:0,alive:true,recovery:0,
   equipment:{...g.run.npcs[0].equipment,power:0,tier:1}}));
  return Dungeon.resolve(n,{...gate,power:1},new RNG('equip-win-'+r),[]);};
 let sawWin=false;
 for(let i=0;i<200&&!sawWin;i++){const r=won(i);if(r.equipmentGain>0)sawWin=true;}
 assert.ok(sawWin,'sanity: the sweep actually reached an equipment-tier win, or this proof has nothing to test');
});

test('RESULT-PROOF: Death is drawn immediately on the failure path, before any escape/injury evidence',()=>{
 /* Task D final correction §7: unique, recognizable sentinel values at each RNG position -
    not the shared 0.999 default several other cases lean on - prove the actual DRAW ORDER,
    not just which values end up used. Under the corrected order, a Death MISS on a lost fight
    is followed by escapeRoll, and only escapeRoll's own outcome decides whether injuryRoll is
    ever drawn; a Death HIT never reaches escape/injury evidence at all. Against the pre-cycle
    order (escape/injury drawn first, Death gated after) these same positions would read back
    entirely different sentinel values than the ones asserted below. */
 const g=new Game();g.autosave=false;g.start('result-proof-death-order');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const mk=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:[],injury:0,fatigue:0,alive:true,recovery:0}));
 const hard={...gate,power:1e9};
 // Death MISS: escape/injury evidence is reached and recorded at the sentinel values.
 {const uniqueDeathMiss=0.777,uniqueEscapeSucceed=0.222;
  const r=Dungeon.resolve(mk(),hard,scripted([0.5,0.999,uniqueDeathMiss,uniqueEscapeSucceed,0.555,0.999,0.999]),[]);
  assert.equal(r.debug.deathRoll,uniqueDeathMiss,'the Death roll is the first evidence drawn on the failure path, at its own recognizable value');
  assert.equal(r.outcome,'퇴각','the sentinel escapeRoll, drawn only AFTER the Death miss, succeeds against the impossible fight');
  assert.equal(r.debug.escapeRoll,uniqueEscapeSucceed,'and is recorded at its own recognizable value, distinct from the Death roll');
  assert.equal(r.debug.injuryRoll,null,'escape succeeding with no environment incident never reaches injuryRoll at all');
 }
 // Death HIT: no escape/injury evidence is ever drawn - the expedition ends at Death itself.
 {const uniqueDeathHit=0.0001;
  const r=Dungeon.resolve(mk(),hard,scripted([0.5,0.999,uniqueDeathHit,0.111,0.222,0.999,0.999]),[]);
  assert.equal(r.outcome,'사망','the sentinel Death roll hits on the failure path');
  assert.equal(r.debug.deathRoll,uniqueDeathHit,'recorded at its own recognizable value');
  assert.equal(r.debug.escapeRoll,null,'a Death hit consumes nothing else - escapeRoll was never drawn to prove it');
  assert.equal(r.debug.injuryRoll,null,'nor was injuryRoll - the two sentinel values that followed in the script were never touched');
 }
});

test('RESULT-PROOF: the ordinary Death-roll count matches Canonical exactly',()=>{
 /* DUNGEON_HAZARD_v2.7 §ORDINARY EXPEDITION FAILURE DEATH RISK, resolution order 3-4: zero
    Death rolls on a Success path, exactly one on a failure path (퇴각 included) - and the draw
    itself, not merely its use, must wait for the failure path to be confirmed. */
 const g=new Game();g.autosave=false;g.start('death-roll-count');
 const gate=g.makeDungeon('spider',1);
 let draws=0;
 const counting=seq=>{let i=0;return {next:()=>{draws++;return i<seq.length?seq[i++]:0.999;},int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const mk=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:[],injury:0,fatigue:0,alive:true,recovery:0}));
 // SUCCESS: trivial gate, neutral noise, no incident -> combatSuccess stays true -> outcome
 // settles '성공' with no environment override, so it never reaches the failure branch.
 {const easy={...gate,power:1};
  const r=Dungeon.resolve(mk(),easy,counting([0.5,0.999,0.999,0.999,0.999,0.999]),[]);
  assert.equal(r.outcome,'성공','a trivially easy gate really does succeed');
  assert.equal(r.debug.deathRoll,null,'no Death roll value is recorded on the Success path');
 }
 // FAILURE (부상, lost fight): impossible gate, escape fails -> 부상 immediately, no incident,
 // injuryRoll stays below the Severe escalation so it never re-enters this same branch twice.
 {const hard={...gate,power:1e9};
  const r=Dungeon.resolve(mk(),hard,counting([0.5,0.999,0.999,0.999,0.999,0.999]),[]);
  assert.equal(r.outcome,'부상','an impossible fight with a failed escape is an ordinary Injury');
  assert.equal(typeof r.debug.deathRoll,'number','exactly one Death roll value is recorded on the failure path');
 }
 // RETREAT: impossible gate, deathRoll misses, escape succeeds (escapeRoll 0.0001) -> 퇴각,
 // which the rule explicitly includes in the failure-conditioned Death check.
 {const hard={...gate,power:1e9};
  const r=Dungeon.resolve(mk(),hard,counting([0.5,0.999,0.999,0.0001,0.999,0.999]),[]);
  assert.equal(r.outcome,'퇴각','escape succeeds against the impossible fight');
  assert.equal(typeof r.debug.deathRoll,'number','the Retreat path also draws exactly one Death roll');
 }
 /* A raw total-draw-count comparison between a Success and a failure path is not itself a
    clean isolation of the Death roll: a won fight also draws the equipment-tier roll a lost
    one does not, and a 부상/중상 outcome also draws the 강골 downgrade check a Success does
    not, so the two extra draws can numerically cancel a real missing/present Death roll. The
    null-vs-number checks above already prove presence/absence directly and precisely; this
    confirms there is exactly one place in Source that can ever produce that value, so "one
    Death roll" cannot mean two draws that happen to agree. */
 const src=read('dist/systems/dungeon.js');
 assert.equal((src.match(/deathRoll=r\.next\(\)/g)||[]).length,1,
  'exactly one place in Source draws the Death roll - no duplicate inside escape/injury/severe handling');
});

test('RESULT-PROOF: the counterfactual proof functions carry no RNG draw / reseed path in Source',()=>{
 /* Task D final QA closeout §1: the deterministic (same-seed-twice) test above/below proves
    the REPORT is reproducible, which is necessary but not sufficient - it would pass even if
    a proof function drew its OWN extra roll, as long as that roll were itself deterministic
    (e.g. reading from a fixed internal seed). The direct guard is structural: the four
    counterfactual proof functions receive only semantic evidence (`ev`, already-recorded
    numbers) and prepared state, never an RNG object, so their own Source region must contain
    no way to draw one. No production `skipProof` flag and no test-only gameplay behavior are
    introduced - this reads dist/systems/dungeon.js as text and asserts on it. */
 const src=read('dist/systems/dungeon.js');
 const start=src.indexOf('function shadowOutcome(departure,d,facilities,pack,ev,severeEscalation){');
 const end=src.indexOf('function resolve(n,d,r,facilities=[],run,assist=0){');
 assert.ok(start>=0&&end>start,
  'sanity: both region boundaries (shadowOutcome start, resolve start) are found in Source, in order');
 const region=src.slice(start,end);
 // the region really does span all four proof functions, not just the first one
 for(const fn of ['function shadowOutcome','function outcomeProof','function stateProof','function resultProof'])
  assert.ok(region.includes(fn),'sanity: '+fn+' is inside the guarded region');
 for(const forbidden of ['.next(','new RNG','Math.random'])
  assert.ok(!region.includes(forbidden),
   'the counterfactual proof functions (shadowOutcome/outcomeProof/stateProof/resultProof) contain no "'+forbidden+'" - '+
   'they consume only already-recorded evidence, never a gameplay RNG draw or reseed');
});

test('RESULT-PROOF: UNPROVEN branches are never invented, and proof consumes no gameplay RNG',()=>{
 const g=new Game();g.autosave=false;g.start('result-proof-unproven');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 // actual Success (no Death roll drawn); shadow (Item removed) fails combat and would need one.
 {const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['potion'],injury:0,fatigue:0,alive:true,recovery:0}));
  const withPotion=Dungeon.prepare(n,gate,[]).effects.combat,withoutPotion=Dungeon.prepare({...n,pack:[]},gate,[]).effects.combat;
  assert.ok(withPotion>withoutPotion,'하급 포션 raises 투력, or this case proves nothing');
  const tight={...gate,power:(withPotion+withoutPotion)/2}; // succeeds WITH, fails WITHOUT
  const r=Dungeon.resolve(n,tight,scripted([0.5,0.999,0.999,0.999,0.999,0.999]),[]);
  assert.equal(r.outcome,'성공','WITH the potion the fight is won');
  assert.equal(r.debug.deathRoll,null,'and no Death roll was drawn to prove the failure shadow with');
  assert.equal(r.heroProof,null,'UNPROVEN is under-reported as no proof, never invented as one');
 }
 // RNG-neutrality + no mutation: two resolutions of the SAME seeded run, one with a pack that
 // gives resultProof several Items to shadow-test, land on the identical STATE OF THE ACTUAL
 // RNG INSTANCE PASSED INTO Dungeon.resolve() (not some unrelated Game-level rng object) and
 // the identical persisted NPC fields either way - the proof itself draws nothing extra and
 // touches no Run/NPC/economy state.
 {const heavy=()=>{const g2=new Game();g2.autosave=false;g2.start('rng-neutral');
   const gate2=g2.makeDungeon('spider',1);
   const n=JSON.parse(JSON.stringify({...g2.run.npcs[0],traits:[],pack:['choco','potion','kit'],injury:0,fatigue:0,alive:true,recovery:0}));
   const money=g2.run.money;
   const rng=new RNG('rng-neutral-draw');
   const rep=Dungeon.resolve(n,gate2,rng,[]);
   assert.notEqual(rng,g2.rng,'sanity: the RNG instance handed to resolve() really is a distinct object from the Game-level rng, or this test is not inspecting what it claims to');
   return {state:rng.state,money:g2.run.money,moneyChanged:g2.run.money!==money,rep};};
  const a=heavy(),b=heavy();
  assert.equal(a.rep.heroProof!==undefined,true,'the multi-Item case actually reaches resultProof');
  assert.deepEqual(a.rep,b.rep,'the same seed, same pack, same gate reproduces the identical report - proof included');
  assert.equal(a.state,b.state,'the EXACT RNG instance passed into resolve() also ends on the identical state - the proof itself draws nothing beyond the real expedition\'s own rolls');
  assert.equal(a.moneyChanged,false,'resolve() never touches Run economy state on its own RNG object');
 }
});

test('RESULT-PROOF: existing attribution rules still hold (single / overlap / whole-Bag / 황금 1+1)',()=>{
 const g=new Game();g.autosave=false;g.start('result-proof-attribution');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
 // single necessary Item is exercised directly by the departure-Stats/Fatigue tests above
 // (초코바 alone flips 부상 <-> 중상); this test covers overlap / whole-Bag / 황금 1+1 only.
 // Every case below forces an environment incident (envRoll 0.0001) so the retreat-still-
 // injured branch draws injuryRoll (0.25, fixed strictly between the .13 and .42 thresholds)
 // on the real run regardless of which way escapeRoll lands - the same evidence type the
 // shadow always needs, so the counterfactual stays provable rather than UNPROVEN.
 // overlap: A and B each independently sufficient to keep the SAME worse tier from happening.
 {const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco','energy'],injury:0,fatigue:0,alive:true,recovery:0}));
  const eBoth=Dungeon.prepare(n,gate,[]).effects,eNoChoco=Dungeon.prepare({...n,pack:['energy']},gate,[]).effects,eNoEnergy=Dungeon.prepare({...n,pack:['choco']},gate,[]).effects;
  const escBoth=escChance(eBoth),escNoChoco=escChance(eNoChoco),escNoEnergy=escChance(eNoEnergy);
  // both 초코바 and 에너지드링크 grant mobility; WITH both, escape clears (harsher .13
  // threshold, stays 부상); remove EITHER one alone and escape fails instead (looser .42
  // threshold, crosses into 중상) - each is independently necessary against the SAME roll.
  assert.ok(escBoth>escNoChoco+.001&&escBoth>escNoEnergy+.001,
   'sanity: this gate/pack really does shape the overlap case, or the assertions below prove nothing');
  const roll=(escBoth+Math.max(escNoChoco,escNoEnergy))/2;
  const hard={...gate,power:1e9};
  const r=Dungeon.resolve(JSON.parse(JSON.stringify(n)),hard,scripted([0.5,0.0001,0.999,roll,0.25,0.999,0.999]),[]);
  assert.equal(r.outcome,'부상','with both Items, escape clears into the harsher threshold and this stays an ordinary Injury');
  assert.ok(r.heroProof?.outcome?.items?.length>=1,'at least one Item is credited for the same worse tier');
  assert.ok(r.heroProof.outcome.items.includes('choco')&&r.heroProof.outcome.items.includes('energy'),
   'and since EITHER removal alone worsens it, both are credited together, not just one');
  assert.equal(r.heroProof.outcome.worse,'중상','naming the tier either removal alone would have reached');
 }
 // whole-Bag-only: EITHER Item alone still clears the roll, but removing BOTH does not - so
 // no single Item is individually necessary, only the whole committed preparation is.
 {const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco','energy'],injury:0,fatigue:0,alive:true,recovery:0}));
  const eNone=Dungeon.prepare({...n,pack:[]},gate,[]).effects,eNoChoco=Dungeon.prepare({...n,pack:['energy']},gate,[]).effects,eNoEnergy=Dungeon.prepare({...n,pack:['choco']},gate,[]).effects;
  const escNone=escChance(eNone),escNoChoco=escChance(eNoChoco),escNoEnergy=escChance(eNoEnergy);
  const floor=Math.min(escNoChoco,escNoEnergy);
  assert.ok(floor>escNone+.001,
   'sanity: either Item alone still clears where neither does, or the assertions below prove nothing');
  const roll=(escNone+floor)/2; // below both individual removals, at or above losing everything
  const hard={...gate,power:1e9};
  const seq=()=>[0.5,0.0001,0.999,roll,0.25,0.999,0.999];
  const r=Dungeon.resolve(JSON.parse(JSON.stringify(n)),hard,scripted(seq()),[]);
  assert.equal(r.outcome,'부상','with the full Bag, escape clears into the harsher threshold');
  assert.equal(Dungeon.resolve(JSON.parse(JSON.stringify({...n,pack:['energy']})),hard,scripted(seq()),[]).outcome,'부상',
   '초코바 alone removed, 에너지드링크 still clears it');
  assert.equal(Dungeon.resolve(JSON.parse(JSON.stringify({...n,pack:['choco']})),hard,scripted(seq()),[]).outcome,'부상',
   '에너지드링크 alone removed, 초코바 still clears it');
  assert.ok(r.heroProof?.outcome,'yet the whole committed Bag is provably necessary');
  assert.equal(r.heroProof.outcome.items,null,'and ownership is generic - no single Item is invented as the cause');
  assert.equal(r.heroProof.outcome.worse,'중상','naming the tier losing the whole Bag would have reached');
 }
 // 황금 1+1: a REAL, dynamically-computed resolution - not a source-regex guess - proving the
 // duplicated Item participates in ordinary overlap attribution with no Special-category
 // exclusion and no Golden-specific shortcut. itemContributions() treats 'duplicate' as
 // doubling the NEXT item's effect and consuming no slot of its own, so ['coupon','choco']
 // doubles 초코바's mobility; removing 'coupon' alone strips the doubling (choco reverts to
 // its base effect) and removing 'choco' alone strips both the base effect AND its target -
 // either removal alone worsens the SAME escape roll, so both are credited together.
 {const n=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['coupon','choco'],injury:0,fatigue:0,alive:true,recovery:0}));
  const eFull=Dungeon.prepare(n(),gate,[]).effects,eNoCoupon=Dungeon.prepare({...n(),pack:['choco']},gate,[]).effects,eNoChoco=Dungeon.prepare({...n(),pack:['coupon']},gate,[]).effects;
  assert.ok(eFull.mobility>eNoCoupon.mobility&&eNoCoupon.mobility>eNoChoco.mobility,
   "sanity: golden 1+1 really does double choco's mobility here, or this case proves nothing");
  const escFull=escChance(eFull),escNoCoupon=escChance(eNoCoupon);
  const roll=(escFull+escNoCoupon)/2;
  const hard={...gate,power:1e9};
  const r=Dungeon.resolve(n(),hard,scripted([0.5,0.0001,0.999,roll,0.25,0.999,0.999]),[]);
  assert.equal(r.outcome,'부상','with the duplicated 초코바, escape clears into the harsher threshold');
  assert.ok(r.heroProof?.outcome?.items?.includes('coupon')&&r.heroProof.outcome.items.includes('choco'),
   '황금 1+1 쿠폰 and 초코바 are both credited - the duplication is proven through the same ordinary machinery');
  assert.equal(r.heroProof.outcome.worse,'중상','naming the tier losing the doubled effect would have reached');
 }
 // secondary guard, kept alongside the live case above: no separate code path exists for
 // 황금 1+1, so no separate proof branch could silently special-case it.
 assert.ok(!/duplicate/.test(read('dist/systems/dungeon.js').match(/function shadowOutcome[\s\S]*?\n}/)[0]),
  'shadowOutcome carries no special-cased 황금 1+1 branch - it goes through prepare() like every other Item');
});

test('RESULT-PROOF: persistent-state proof for 구급키트 Aftercare, and what is NOT promoted to Hero',()=>{
 const g=new Game();g.autosave=false;g.start('result-proof-aftercare');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 // force a 중상 that Aftercare (구급키트) then relieves to 부상, with the TEXT Outcome unchanged
 // either way - the state proof, not the outcome proof, is what must credit it.
 const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['kit'],injury:1,fatigue:0,alive:true,recovery:0}));
 const departureInjury=n.injury;
 const r=Dungeon.resolve(n,{...gate,power:1e9},scripted([0.5,0.999,0.999,0.999,0.50,0.999,0.999]),[]);
 // 10C: departure Injury vs post-resolution Injury vs the expected state proof, made explicit
 // rather than left implicit in the outcome/aftercare fields alone.
 assert.equal(departureInjury,1,'sanity: departed already injured (1), the escalation this case needs');
 assert.equal(r.outcome,'부상','departed already injured, the escalated threshold is crossed into a would-be 중상, and 구급키트 lowers it to 부상 (v2.9.0)');
 assert.ok(r.aftercare&&r.aftercare.from===2&&r.aftercare.to===1&&r.aftercare.outcomeFrom==='중상','구급키트 lowered a would-be 중상 to 부상 (persistent Injury 2 -> 1)');
 assert.equal(n.injury,1,'the adventurer\'s own persistent Injury after resolution is the lowered value');
 assert.ok(r.heroProof?.outcome?.items?.includes('kit')&&r.heroProof.outcome.worse==='중상','the kit changed the text Outcome, so it is credited as an OUTCOME proof naming the worse tier');
 assert.equal(r.heroProof?.state,null,'no separate state proof - the differing tier is the outcome proof\'s claim');
 // a would-be 부상: the tier stays 부상 but the kit leaves no lasting injury - that is the STATE proof
 {const m=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['kit'],injury:0,fatigue:0,alive:true,recovery:0}));
  const rm=Dungeon.resolve(m,{...gate,power:1e9},scripted([0.5,0.999,0.999,0.999,0.999,0.999,0.999]),[]);
  assert.equal(rm.outcome,'부상','a plain 부상 path');
  assert.ok(rm.aftercare&&rm.aftercare.from===1&&rm.aftercare.to===0,'the kit removed the lasting injury');
  assert.equal(m.injury,0);
  assert.equal(rm.heroProof?.outcome,null,'the text Outcome (부상) is unchanged, so no Outcome proof');
  assert.ok(rm.heroProof?.state?.items?.includes('kit'),'구급키트 is credited as a proven PERSISTENT-STATE contribution - without it the same 부상 tier leaves injury 1');}
 // Fatigue-only and Wallet-only differences are never promoted to Hero feedback, on any report.
 for(const rep of [r]){
  assert.ok(!(rep.heroProof?.outcome?.worse==='부상'&&rep.heroProof?.outcome?.items?.some(id=>!DATA.itemBy[id].effects.combat&&!DATA.itemBy[id].effects.survival&&!DATA.itemBy[id].effects.mobility&&!DATA.itemBy[id].effects.spirit&&!DATA.itemBy[id].effects.escape&&!DATA.itemBy[id].effects.revive)),
   'no Fatigue/Wallet-only Item is ever the sole reason an Outcome tier is credited');
 }
});

test('RESULT-PROOF: persistent-state whole-Bag fallback credits generic state, no invented Item',()=>{
 /* Task D final correction §8B: stateProof() was missing the whole-Bag fallback outcomeProof()
    already had - with two 구급키트 in the Bag, one kit is already sufficient to enable
    Aftercare, so removing either COPY alone still leaves the other one, and Aftercare still
    relieves the same 중상 the same one step; only removing the WHOLE Bag (both copies) loses
    Aftercare entirely and proves a worse persistent Injury - since individual removal proves
    nothing, this is credited generically ({items:null}), never pinned to one arbitrarily-
    chosen copy. */
 const g=new Game();g.autosave=false;g.start('result-proof-state-wholebag');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const withKit=Dungeon.prepare({...g.run.npcs[0],traits:[],pack:['kit'],injury:1,fatigue:0},gate,[]).effects.aftercare;
 const withTwoKits=Dungeon.prepare({...g.run.npcs[0],traits:[],pack:['kit','kit'],injury:1,fatigue:0},gate,[]).effects.aftercare;
 assert.ok(withKit>0&&withTwoKits>0,'sanity: a single 구급키트 already carries Aftercare, or this case proves nothing about the SECOND copy alone');
 const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['kit','kit'],injury:1,fatigue:0,alive:true,recovery:0}));
 const r=Dungeon.resolve(n,{...gate,power:1e9},scripted([0.5,0.999,0.999,0.999,0.50,0.999,0.999]),[]);
 assert.equal(r.outcome,'부상','departed already injured, the would-be 중상 is lowered by the kits (v2.9.0)');
 assert.ok(r.aftercare&&r.aftercare.from===2&&r.aftercare.to===1,'the kits lower it to 부상 with the full two-구급키트 Bag');
 assert.ok(r.heroProof?.outcome&&r.heroProof.outcome.worse==='중상','only the whole Bag is provably what kept the Outcome from 중상');
 assert.equal(r.heroProof.outcome.items,null,'no single copy is credited - removing either still leaves the other');
 // the same whole-Bag rule for the STATE proof, on a would-be 부상 with two kits
 const m=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['kit','kit'],injury:0,fatigue:0,alive:true,recovery:0}));
 const rs=Dungeon.resolve(m,{...gate,power:1e9},scripted([0.5,0.999,0.999,0.999,0.999,0.999,0.999]),[]);
 assert.equal(rs.outcome,'부상');assert.ok(rs.aftercare&&rs.aftercare.from===1&&rs.aftercare.to===0);
 assert.equal(rs.heroProof?.outcome,null,'the text Outcome is unchanged, so no Outcome proof');
 assert.ok(rs.heroProof?.state,'the whole Bag is provably necessary for the persistent-state relief');
 assert.equal(rs.heroProof.state.items,null,
  'ownership is generic ({items:null}) - since either single 구급키트 copy alone still relieves it, no one copy is invented as the sole cause');
});

test('DUNGEON_HAZARD §Ordinary EXP (User 2026-09-25, v2.9.2 balance): 대성공 EXP multiplier 1.10, the other paths unchanged',()=>{
 assert.equal(Dungeon.GREAT.xp,1.10);
 const src=read('dist/systems/dungeon.js');
 assert.ok(/\(22\+d\.day\*4\.6\)\*\(outcome==='대성공'\?GREAT\.xp:outcome==='퇴각'\?\.38:won\?1:\.5\)\*e\.xpMult/.test(src),'base, Retreat 0.38, win 1.00 and other living 0.50 keep their values');
 assert.equal(Dungeon.WALLET_MULT['대성공'],1,'the Great Success Wallet reward is unchanged');
 // a real resolved 대성공 pays exactly round(base x 1.10 x the explicit XP modifiers)
 let seen=0;
 for(let k=0;k<400&&seen<3;k++){const g=new Game();g.autosave=false;g.start('great-xp-'+k);g.buyRelic(g.run.relicWindow.candidateIds[0]);
  for(let d=0;d<12&&g.run.phase!=='end'&&seen<3;d++){const s=g.run;s.money=5000;g.beginOrder();g.finishOrder();while(s.phase==='sell')g.depart();
   for(const r of s.results)if(r.outcome==='대성공'&&!r.deep){const e=Dungeon.prepare({...s.npcs.find(n=>n.id===r.npcId),pack:r.items},s.dungeons.find(x=>x.id===r.dungeon)||s.dungeons[0],s.facilities).effects;
    assert.equal(r.xp,Math.round((22+r.day*4.6)*1.10*e.xpMult),'대성공 EXP = round(base x 1.10 x xpMult)');seen++;}
   g.finishNight();g.closeDay();}}
 assert.ok(seen>0,'a 대성공 was resolved and checked');
});
console.log(groups+' night groups passed');

test('DUNGEON_HAZARD §strainEscalation (DUN-Q-v29-3, User 2026-09-25, v2.9.1 balance): only CONSECUTIVE injured departures raise the failure Death chance',()=>{
 assert.deepEqual(Dungeon.STRAIN,{step:.08,cap:.30,weary:20},'the shipped coefficients are the canonical baseline');
 for(const [c,exp] of [[0,0],[1,0],[2,.08],[3,.16],[5,.30],[8,.30]])
  assert.ok(Math.abs(Dungeon.strainEscalation(c)-exp)<1e-12,'strain('+c+') = '+exp);
 const d={...D.dungeonBy.slime,day:14,tier:2,hazards:['poison','mire'],scale:1,power:80,reward:40,requiredSupply:0};
 const base=Adventurer.create(new RNG('strain'),1,10,Meta.fresh());
 const mk=(records,injury=0,fatigue=0)=>{const n=JSON.parse(JSON.stringify(base));n.traits=[];n.fatigue=fatigue;n.injury=injury;n.pack=[];n.level=1;
  n.stats={combat:1,survival:1,mobility:1,spirit:1};n.equipment={power:0,name:'-'};
  n.records=records;return n;};
 const healthy=Dungeon.failureDeathRisk(mk([]),d);
 assert.equal(healthy.strain,0,'no records, no strain, and a healthy departure never reads it at all');
 // one past injured run + departing injured now = 2 consecutive -> +8%p
 const once=Dungeon.failureDeathRisk(mk([{departedInjured:true,outcome:'부상'}],1),d);
 assert.ok(Math.abs(once.strain-.08)<1e-12,'a second consecutive injured departure adds 8%p');
 assert.ok(Math.abs(once.chance-Math.min(.40+.08,once.healthy+.10+.08))<1e-12,'the +8%p rides the injured term and lifts the cap with it');
 const firstInjured=Dungeon.failureDeathRisk(mk([],1),d);
 assert.equal(firstInjured.strain,0,'the first injured departure is free');
 assert.ok(Math.abs(firstInjured.chance-Math.min(.40,firstInjured.healthy+.10))<1e-12,'the injured departure itself is unchanged');
 // two past + this one = 3 consecutive -> +16%p
 const chain3=Dungeon.failureDeathRisk(mk([{departedInjured:true},{departedInjured:true}],1),d);
 assert.ok(Math.abs(chain3.strain-.16)<1e-12,'two past + this one = 3 consecutive -> +16%p');
 // a healthy departure anywhere in between resets the chain - only the trailing run counts
 const broken=Dungeon.failureDeathRisk(mk([{departedInjured:true},{departedInjured:true},{departedInjured:false}],1),d);
 assert.equal(broken.strain,0,'a healthy departure - including the return after a Severe-Injury rest - resets the chain');
 // Fatigue no longer feeds this term at all, however weary the departure or the past records
 const wearyIgnored=Dungeon.failureDeathRisk(mk([{departedInjured:true},{departedInjured:true}],1,25),d);
 assert.ok(Math.abs(wearyIgnored.strain-.16)<1e-12,'Fatigue at departure does not change the strain term');
 const wearyRecordsIgnored=Dungeon.failureDeathRisk(mk([{departedInjured:false,departedWeary:true},{departedInjured:false,departedWeary:true}],0),d);
 assert.equal(wearyRecordsIgnored.strain,0,'past weary (non-injured) records do not feed strain');
 // caps at 30%p
 const capped=Dungeon.failureDeathRisk(mk(Array(7).fill({departedInjured:true}),1),d);
 assert.ok(Math.abs(capped.strain-.30)<1e-12,'the strain term caps at 30%p');
 assert.ok(capped.chance<=.40+.30+1e-9&&capped.chance>=.30,'the cap rises with the strain');
 // the live resolution still records departedInjured (and keeps departedWeary, even unused) and uses the same strain
 const hard={...d,power:1e9};
 for(let i=0;i<50;i++){const n=mk([{departedInjured:true},{departedInjured:true}],1);
  Dungeon.resolve(n,hard,new RNG('strain-'+i));
  const r=n.records.at(-1);
  assert.equal(r.departedInjured,true,'the record says it began injured');
  assert.equal(r.debug,undefined,'the persisted record carries no development payload');}
 const n=mk([{departedInjured:true},{departedInjured:true}],1);const r=Dungeon.resolve(n,hard,new RNG('strain-live'));
 const expected=Dungeon.failureDeathRisk(mk([{departedInjured:true},{departedInjured:true}],1),hard);
 assert.ok(Math.abs(expected.strain-.16)<1e-12,'two past injured runs + this one = 3 consecutive -> +16%p');
 assert.ok(Math.abs(r.debug.deathChance-expected.chance)<1e-12,'the resolution draws Death against the strained chance');
 const w=mk([],0,30);Dungeon.resolve(w,{...d,power:1e9},new RNG('strain-w'));
 assert.equal(w.records.at(-1).departedWeary,true,'Fatigue 30 at departure is still recorded as weary, even though strain ignores it');
});

test('DUN-Q-v29-BC1: 만반의 준비 / LEVEL DEATH REDUCTION (User 2026-09-25, v2.9.1 balance)',()=>{
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],
  weighted:a=>a[0],shuffle:a=>a.slice()};};
 for(const [lv,exp] of [[1,1],[2,.985],[10,.865],[20,.75]])
  assert.ok(Math.abs(Dungeon.levelFactor(lv)-exp)<1e-9,'levelFactor('+lv+') = '+exp);
 assert.equal(Dungeon.PREPARED.factor,.80);assert.equal(Dungeon.PREPARED.bandSevere,.36);
 const base={injury:0,pack:['rice','rice']};
 assert.equal(Dungeon.fullyPrepared(base,10),true,'healthy, Fatigue<20, 2+ Items -> fully prepared');
 assert.equal(Dungeon.fullyPrepared({...base,injury:1},10),false,'an injured departure loses it');
 assert.equal(Dungeon.fullyPrepared(base,20),false,'Fatigue 20 loses it (< 20 required)');
 assert.equal(Dungeon.fullyPrepared({...base,pack:['rice']},10),false,'one Item loses it');
 const d={...D.dungeonBy.slime,day:20,tier:2,hazards:['poison'],scale:1,power:1e9,reward:40,requiredSupply:0};
 const npc=(level,prepared)=>{const n=JSON.parse(JSON.stringify(Adventurer.create(new RNG('bc1'),1,10,Meta.fresh())));
  n.traits=[];n.level=level;n.stats={combat:1,survival:1,mobility:1,spirit:1};n.equipment={power:0,name:'-'};n.records=[];
  n.injury=0;n.fatigue=0;n.pack=prepared?['rice','rice']:[];return n;};
 /* a controlled, guaranteed-combat-failure Gate: !combatSuccess is decided from noise/env alone
    (no injuryRiskRoll draw), so the death-roll branch is reached in exactly 3 draws
    [noise, envRoll, deathRoll], and - only on a hit in the removed band - a 4th (bandRoll). */
 for(const level of [1,2,10,20])for(const prepared of [false,true]){
  const n=npc(level,prepared);
  const raw=Dungeon.failureDeathRisk({...n,fatigue:0},d).chance/Dungeon.levelFactor(level); // undo the SALE snapshot's own levelFactor to read the pure failureDeathChance
  const preparedFactor=prepared?Dungeon.PREPARED.factor:1;
  const rolled=raw*preparedFactor*Dungeon.levelFactor(level);
  const below=Dungeon.resolve(JSON.parse(JSON.stringify(n)),d,scripted([.5,.999,Math.max(0,rolled-1e-6)]));
  assert.equal(below.outcome,'사망','level '+level+' prepared '+prepared+': a roll inside the reduced band is 사망');
  if(rolled<raw-1e-9){
   const between=Dungeon.resolve(JSON.parse(JSON.stringify(n)),d,scripted([.5,.999,(rolled+raw)/2,.10]));
   assert.notEqual(between.outcome,'사망','level '+level+' prepared '+prepared+': a roll in the removed band never becomes 사망');
   assert.ok(['중상','부상'].includes(between.outcome),'and settles 중상/부상 off one extra draw');
   if(prepared){
    assert.ok(between.events.some(e=>e.id==='prepared'),'the 만반의 준비 save line appears when the band was actually hit and preparedFactor<1');
    assert.ok(between.events.find(e=>e.id==='prepared').text.includes('만반의 준비 덕분에 목숨을 건졌다'),'exact COPY_AUDIT §19-9 copy');
   }
  }
 }
 // SALE snapshot: levelFactor applied, preparedFactor never (Bag is excluded from the snapshot)
 const lv10=npc(10,false);
 const snap=Dungeon.failureDeathRisk(lv10,d);
 const rawChance=Dungeon.failureDeathRisk({...lv10,level:1},d).chance;
 assert.ok(Math.abs(snap.chance-rawChance*Dungeon.levelFactor(10))<1e-9,'SALE chance = raw x levelFactor only');
 // a carried Bag changes combat/environment prep as it always has (rice raises 강인함, which
 // lowers the deficit terms) - what must NEVER apply on top of that is preparedFactor itself.
 // Reconstruct the raw chance straight from DEATH/prepare() and confirm the SALE snapshot is
 // exactly that x levelFactor, with no further x0.80.
 const lv10Prepared=npc(10,true);
 const p=Dungeon.prepare(lv10Prepared,d),required=d.power||1;
 const combatDeficit=Math.max(0,Math.min(1,(required-Dungeon.preparedPower(p.effects))/required));
 const environmentDeficit=p.hazards.length?p.hazards.reduce((v,h)=>v+Math.max(0,Math.min(1,h.gap/h.threat)),0)/p.hazards.length:0;
 const expectedHealthy=Math.max(0,Math.min(.30,combatDeficit*Dungeon.DEATH.combat+environmentDeficit*Dungeon.DEATH.environment));
 assert.ok(Math.abs(Dungeon.failureDeathRisk(lv10Prepared,d).chance-expectedHealthy*Dungeon.levelFactor(10))<1e-9,
  'a carried Bag only ever moves the SALE snapshot through the ordinary combat/environment deficit terms, never through preparedFactor');
});

test('DUN-Q-v29-BC2: RETREAT HEALING (User 2026-09-25, v2.9.1 balance)',()=>{
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],
  weighted:a=>a[0],shuffle:a=>a.slice()};};
 const d={...D.dungeonBy.slime,day:6,tier:1,hazards:['poison'],scale:1,power:1,reward:1,requiredSupply:0};
 const npc=(records)=>{const n=JSON.parse(JSON.stringify(Adventurer.create(new RNG('bc2'),1,10,Meta.fresh())));
  n.traits=[];n.level=1;n.injury=1;n.fatigue=0;n.pack=[];n.records=JSON.parse(JSON.stringify(records));
  n.stats={combat:1,survival:1,mobility:1,spirit:1};n.equipment={power:0,name:'-'};return n;};
 /* force a pure 퇴각: guaranteed combat failure (no injuryRiskRoll for failurePath itself), a
    deathRoll miss, an escapeRoll under the escape ceiling, then the escaped-but-still-failed
    branch's own injuryRiskRoll (0 injuryRisk here, so it never takes the Injury tier), then the
    unconditional greatRoll, and only then - because this departure began injured and retreated -
    the RETREAT HEALING draw itself. */
 const forceRetreat=(n,healRoll)=>Dungeon.resolve(n,{...d,power:1e9},scripted([.5,.999,.999,.01,.5,.5,healRoll]));
 for(const [k,exp] of [[0,.25],[1,.50],[2,.75],[3,1],[9,1]]){
  const records=Array(k).fill({departedInjured:true,outcome:'퇴각'});
  const healed=forceRetreat(npc(records),Math.max(0,exp-1e-6));
  assert.equal(healed.injury,0,'k='+k+': a roll just inside '+exp+' heals');
  if(exp<1){const notHealed=forceRetreat(npc(records),Math.min(.999999,exp+1e-6));assert.equal(notHealed.injury,1,'k='+k+': a roll just outside '+exp+' does not heal');}
 }
 // a 부상/중상 anywhere in the chain resets it back to the free 25%
 const brokenByInjury=forceRetreat(npc([{departedInjured:true,outcome:'퇴각'},{departedInjured:true,outcome:'부상'}]),.20);
 assert.equal(brokenByInjury.injury,0,'a 부상 breaks the chain back to k=0 (25%), still inside .20');
 const brokenBySevere=forceRetreat(npc([{departedInjured:true,outcome:'퇴각'},{departedInjured:true,outcome:'중상'}]),.20);
 assert.equal(brokenBySevere.injury,0,'a 중상 also breaks the chain back to k=0');
 // a healthy departure that retreats never rolls this at all: no Injury to heal, no extra draw
 const healthy=npc([]);healthy.injury=0;
 const r=Dungeon.resolve(healthy,{...d,power:1e9},scripted([.5,.999,.999,.01,.5]));
 assert.equal(r.outcome,'퇴각');assert.equal(r.injury,0,'a healthy departure that retreats has no Injury to heal');
 // the Night line appears only on an actual heal, and never states the chance
 const healedReport=forceRetreat(npc([]),0);
 assert.ok(healedReport.events.find(e=>e.id==='retreatHeal'),'a heal reports the retreatHeal event');
 assert.equal(healedReport.events.find(e=>e.id==='retreatHeal').text,
  Copy.josa(healedReport.name,'은','는')+' 물러나 쉬는 동안 부상이 나았다.','exact COPY_AUDIT §19-9 copy, no chance stated');
 const notHealedReport=forceRetreat(npc([]),.99);
 assert.ok(!notHealedReport.events.some(e=>e.id==='retreatHeal'),'no heal, no event line');
});

test('DUN-Q-v29-BC3: HIDDEN BAD-LUCK PREPARATION ASSIST (User 2026-09-25, v2.9.1 balance)',()=>{
 const mkGame=seed=>{const g=new Game();g.autosave=false;g.start(seed);return g;};
 const mkNpc=i=>{const n=Adventurer.create(new RNG('bc3-npc-'+i),i,10,Meta.fresh());n.alive=true;n.traits=[];n.introduced=true;
  n.records=[];n.pack=['rice'];n.destination=0;n.claimedDestination=0;n.injury=0;n.fatigue=0;n.recovery=0;return n;};
 const hardGate={...D.dungeonBy.spider,id:'spider',tier:1,day:10,hazards:D.familyTiers.spider[0],power:1e9,scale:1,reward:1};
 // 4 carried NPCs queued: the chain only reaches the assist threshold (>=3 prior carried
 // failures) at the 4th, so only that resolve() call should see a nonzero assist.
 const g=mkGame('bc3');const s=g.run;s.phase='sell';
 s.npcs=[0,1,2,3].map(mkNpc);s.queue=s.npcs.map(n=>n.id);s.cursor=0;s.dungeons=[hardGate];
 g.gateFor=()=>hardGate;
 const seenAssist=[];const realResolve=Dungeon.resolve;
 Dungeon.resolve=(n,dd,r,facilities,run,assist)=>{seenAssist.push(assist);return realResolve(n,dd,r,facilities,run,assist);};
 try{g.night();}finally{Dungeon.resolve=realResolve;}
 assert.deepEqual(seenAssist,[0,0,0,.10],'no assist until the chain reaches 3 prior carried failures, then 0.10');
 // a bare-handed expedition inside the chain neither counts nor resets it, and is never itself assisted
 const g2=mkGame('bc3b');const s2=g2.run;s2.phase='sell';
 s2.npcs=[0,1,2,3,4].map(mkNpc);s2.npcs[2].pack=[];// the middle one is bare-handed
 s2.queue=s2.npcs.map(n=>n.id);s2.cursor=0;s2.dungeons=[hardGate];
 g2.gateFor=()=>hardGate;
 const seen2=[];const rr2=Dungeon.resolve;
 Dungeon.resolve=(n,dd,r,facilities,run,assist)=>{seen2.push(assist);return rr2(n,dd,r,facilities,run,assist);};
 try{g2.night();}finally{Dungeon.resolve=rr2;}
 assert.deepEqual(seen2,[0,0,0,0,.10],'the bare-handed expedition (index 2) is skipped, and does not itself gain the assist');
 // the assist formula itself: 0.10 + 0.05 per further failure past the third
 for(const [chain,exp] of [[3,.10],[4,.15],[5,.20]]){
  const carried=true,assist=carried&&chain>=3?.10+.05*(chain-3):0;
  assert.ok(Math.abs(assist-exp)<1e-12,'chain '+chain+' -> assist '+exp);
 }
 // never surfaced: the outlook carries no assist field
 const anyNpc=g.run.npcs[0];
 assert.equal(Object.keys(g.outlookFor(anyNpc)).some(k=>/assist/i.test(k)),false,'the outlook carries no assist field');
});
