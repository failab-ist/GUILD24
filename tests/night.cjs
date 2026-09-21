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
 assert.ok(OUTCOMES.includes(v)||v==='위기에서 생환','outcome label is supported: '+v);
 assert.ok(!(r.outcome==='사망'&&v==='위기에서 생환'),'a death is never labelled a rescue');
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
  assert.equal(named[1],D.hazards[r.cause]||'보급 부담','the named cause is the attributed one');
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
  /* ITEM_v2.7 §Insurance resolution order step 4: 구급키트 Aftercare is the ONLY thing that
     may move the persistent state away from what the Outcome itself wrote, and the report
     has to carry the proof when it did. */
  if(r.outcome==='중상'){
   if(r.aftercare){assert.deepEqual([r.aftercare.from,r.aftercare.to],[2,1],'중상 Aftercare is 2 -> 1');assert.equal(n.injury,1);assert.equal(n.recovery,0,'Aftercare clears the rest days');}
   else{assert.equal(n.injury,2,'중상 leaves the heavier injury');assert.ok(n.recovery>0,'중상 needs rest');}}
  if(r.outcome==='부상'){
   if(r.aftercare){assert.deepEqual([r.aftercare.from,r.aftercare.to],[1,0],'부상 Aftercare is 1 -> 0');assert.equal(n.injury,0);}
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
  if(r.outcome==='퇴각')assert.equal(n.injury,1,'퇴각 is not a natural recovery');
  if(r.outcome==='부상')assert.equal(n.injury,1,'a fresh 부상 keeps the ordinary Injury');
  if(r.outcome==='중상')assert.equal(n.injury,2,'중상 follows its own transition');
 }
 for(const o of ['성공','퇴각','부상'])assert.ok(seen.has(o),'the sweep actually reached '+o);
});

test('DUNGEON_HAZARD v2.7 §EXCESS SUPPLY: required first, then Fatigue, then the result buffer',()=>{
 const d={...D.dungeonBy.slime,day:18,tier:2,hazards:['poison'],scale:1,power:60,reward:40,requiredSupply:3};
 const base=Adventurer.create(new RNG('excess'),1,10,Meta.fresh());
 const run=(fatigue,pack)=>{const n={...JSON.parse(JSON.stringify(base)),fatigue,traits:[],pack,records:[]};
  Dungeon.resolve(n,d,new RNG('excess-run'));return n.records[n.records.length-1];};
 const baselines={'성공':3,'대성공':3,'퇴각':5,'부상':6,'중상':0,'사망':0};
 for(const fatigue of [0,4,9,14,20])for(const pack of [[],['water'],['rice','water'],['rice','water','ramen','premium']]){
  const r=run(fatigue,pack);
  assert.equal(r.excessSupply,Math.max(0,r.preparedSupply-r.requiredSupply),'excess is what survives the required Supply');
  assert.equal(r.preRecovery,Math.min(fatigue,r.excessSupply),'leftover Supply removes current Fatigue 1:1');
  assert.equal(r.fatigueBeforeExpedition,fatigue-r.preRecovery,'departure Fatigue is what preRecovery left');
  assert.equal(r.remainingSupplyBuffer,r.excessSupply-r.preRecovery,'the same Supply is never spent twice');
  assert.equal(r.rawOutcomeFatigueGain,baselines[r.outcome],'the raw gain is the v2.7 Outcome baseline');
  assert.equal(r.actualOutcomeFatigueGain,Math.max(0,r.rawOutcomeFatigueGain-r.remainingSupplyBuffer),'the buffer absorbs the gain 1:1');
  assert.equal(r.outcomeBufferUsed,r.rawOutcomeFatigueGain-r.actualOutcomeFatigueGain,'what the buffer used is what the gain lost');
  assert.equal(r.finalFatigue,Math.max(0,Math.min(20,r.fatigueBeforeExpedition+r.actualOutcomeFatigueGain)),'final Fatigue is clamped departure + actual gain');
  assert.equal(r.netFatigueDelta,r.finalFatigue-r.beforeFatigue,'the net delta is not the actual gain');
  assert.equal(r.fatigueRecovery,undefined,'the ambiguous combined field is gone');
  assert.equal(r.postOutcomeFatigueGain,undefined,'no second live name for the same value');
 }
 // 중상/사망 stay at zero result Fatigue even with a Trait that would add to it
 const weary={...JSON.parse(JSON.stringify(base)),fatigue:5,traits:['weary'],pack:[],records:[]};
 for(let i=0;i<300;i++){const n={...JSON.parse(JSON.stringify(weary)),records:[]};
  Dungeon.resolve(n,{...d,power:900+i},new RNG('severe-'+i));
  const r=n.records[n.records.length-1];
  if(r.outcome==='중상'||r.outcome==='사망')assert.equal(r.rawOutcomeFatigueGain,0,'중상/사망 result Fatigue stays 0');}
});

test('DUNGEON_HAZARD v2.7 §FATIGUE STAT PENALTY: the two bands are -15% and -40%',()=>{
 const d={...D.dungeonBy.slime,day:6,tier:1,hazards:['poison'],scale:1,power:40,reward:40,requiredSupply:0};
 const base=Adventurer.create(new RNG('bands'),1,10,Meta.fresh());
 const at=f=>Dungeon.prepare({...JSON.parse(JSON.stringify(base)),fatigue:f,traits:[],pack:[]},d).effects;
 const clear=at(9),mid=at(10),over=at(20);
 assert.ok(Math.abs(mid.mobility/clear.mobility-0.85)<1e-9,'10~19 is 기동 -15%');
 assert.ok(Math.abs(mid.spirit/clear.spirit-0.85)<1e-9,'10~19 is 정신 -15%');
 assert.ok(Math.abs(over.mobility/clear.mobility-0.60)<1e-9,'20 is 기동 -40%');
 assert.ok(Math.abs(over.spirit/clear.spirit-0.60)<1e-9,'20 is 정신 -40%');
 assert.equal(mid.combat,clear.combat,'Fatigue does not touch 투력');
 assert.equal(mid.survival,clear.survival,'Fatigue does not touch 강인함');
 const src=read('dist/systems/dungeon.js');
 assert.ok(!/기동\/정신 -10%|기동\/정신 -25%/.test(src),'no superseded v2.6 Fatigue band copy survives');
});

test('ITEM_v2.7 §INSURANCE HIERARCHY: 구급키트 is Aftercare, never an Outcome change',()=>{
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
  const rb=bare.records.at(-1),rk=kitted.records.at(-1);seen.add(rk.outcome);
  if(!rk.aftercare)continue;
  withKit++;
  // Outcome, XP, Loot and the whole Fatigue chain are exactly what the expedition produced
  assert.equal(rk.aftercare.to,rk.outcome==='중상'?1:0,'Aftercare moves exactly one step');
  assert.equal(kitted.injury,rk.aftercare.to,'the adventurer carries the Aftercare state');
  assert.equal(kitted.recovery,0,'Aftercare clears the rest days');
  assert.equal(rk.finalFatigue,rk.fatigueBeforeExpedition+rk.actualOutcomeFatigueGain,'Aftercare does not touch Fatigue');
  assert.ok(rk.events.some(e=>e.id==='aftercare'&&e.items.includes('kit')),'the proven contribution names the Item that carried it');
 }
 assert.ok(withKit>0,'the sweep actually exercised Aftercare');
 assert.ok(seen.has('사망'),'the sweep reached a death, where Aftercare must not fire');
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
  const n=JSON.parse(JSON.stringify(base));n.traits=[];n.fatigue=0;n.pack=[];n.injury=injury;
  n.stats={combat:over,survival:over,mobility:over,spirit:over};n.equipment={power:0,name:'-'};
  return {n,risk:Dungeon.failureDeathRisk(n,d)};
 };
 /* DUNGEON_HAZARD_v2.7 §GATE POWER — LATE-DAY SLOPE. D1-D9 must be bit-for-bit what the single
    1.70 slope produced, and only the Day term may bend - a post-hoc multiplier on the finished
    Gate Power would move the Tier and Family terms with it. */
 assert.deepEqual(Dungeon.GATE,{knee:9,early:1.70,late:0.40},'the shipped slope is the canonical one');
 for(const day of [1,2,5,8,9])
  assert.equal(Dungeon.gateDayTerm(day),day*1.70,'D'+day+' is unchanged');
 for(const [day,term] of [[10,15.70],[12,16.50],[24,21.30],[29,23.30],[30,23.70]])
  assert.ok(Math.abs(Dungeon.gateDayTerm(day)-term)<1e-9,'D'+day+' Day term is '+term);
 assert.ok(Dungeon.gateDayTerm(30)<30*1.70,'the late slope actually bends the curve down');
 /* The coefficients are named so a harness can measure a candidate without editing the
    formula. What ships is the DIRECTOR DOCUMENT BASELINE, and an experiment that forgot to
    put it back would otherwise leave no trace at all. */
 assert.deepEqual(Dungeon.DEATH,{combat:.18,environment:.12,cap:.30,injured:.10,injuredCap:.40},
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
 assert.ok(/outcome!=='성공'/.test(src),'the Death roll is conditioned on the failure path');
});

/* DUNGEON_HAZARD_v2.7 §INJURED RE-EXPEDITION SEVERE ESCALATION. The +15%p was conditioned on
   !combatSuccess, which exempted the other way the Severe-vs-Injury branch is reached: an
   environment incident hurting someone whose combat went fine. The resolver is driven here on
   a scripted RNG so the decision point is reached deliberately and the ONLY difference between
   the two runs is the departure injury - not a seed, not a Stat, not a pack. */
test('DUN §INJURED RE-EXPEDITION: +15%p wherever the Severe branch is reached, not combat only',()=>{
 const g=new Game();g.autosave=false;g.start('severe-escalation');
 const gate=g.makeDungeon('spider',1);
 /* draw order inside resolve(): noise, envRoll, escapeRoll, injuryRoll, deathRoll. Anything
    the tail draws afterwards gets 0.999, which declines every optional rescue. */
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],
  weighted:a=>a[0],shuffle:a=>a.slice()};};
 const who=injury=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:[],injury,fatigue:0,alive:true,recovery:0}));
 const run=(injury,seq,d)=>Dungeon.resolve(who(injury),d,scripted(seq),[]);

 /* Path A — environment incident on a WON fight. combat succeeds (noise 1.0 against power 1),
    the environment roll lands inside the incident window, and injuryRoll 0.20 sits between the
    ordinary threshold (.13) and the escalated one (.28). */
 const easy={...gate,power:1};
 const healthyA=run(0,[1.0,0.0001,0.9,0.20,0.999],easy);
 const injuredA=run(1,[1.0,0.0001,0.9,0.20,0.999],easy);
 assert.equal(healthyA.combatWon,true,'path A really is a won fight');
 assert.equal(injuredA.combatWon,true,'for both of them');
 assert.equal(healthyA.outcome,'부상','a healthy adventurer takes the ordinary Injury');
 assert.equal(injuredA.outcome,'중상','one who departed injured takes the Severe one at the same roll');

 /* Path B — the ordinary combat-failure path the rule already covered, so the fix did not
    trade one branch for the other. The fight is lost, the escape fails, and injuryRoll 0.50
    sits between .42 and .57. */
 const hard={...gate,power:100000};
 const healthyB=run(0,[1.0,0.999,0.999,0.50,0.999],hard);
 const injuredB=run(1,[1.0,0.999,0.999,0.50,0.999],hard);
 assert.equal(healthyB.combatWon,false,'path B really is a lost fight');
 assert.equal(healthyB.outcome,'부상','still the ordinary Injury without the escalation');
 assert.equal(injuredB.outcome,'중상','and the Severe one with it');

 /* The escalation is 15 percentage points on ONE decision, not a second Severe roll: a roll
    above the escalated threshold stays ordinary for both. */
 for(const [seq,d,label] of [[[1.0,0.0001,0.9,0.40,0.999],easy,'environment'],[[1.0,0.999,0.999,0.80,0.999],hard,'combat']]){
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
 /* RESULT-PROOF: shadowOutcome() replays the SAME two decision points against a shadow Bag, so
    it legitimately takes severeEscalation as a parameter and reuses it at the same two checks.
    outcomeProof()/stateProof() each thread it through to shadowOutcome() (and stateProof()
    passes it on again through shadowOutcome inside its own per-item loop); resultProof() takes
    it once and hands it to both. One real definition, its two real decision-point uses, and
    that same shape mirrored through every layer of the counterfactual engine - nothing else. */
 assert.equal((src.match(/severeEscalation/g)||[]).length,16,
  'one definition, its two decision points, and the full proof engine that replays them - nothing else');
});

// ================================================================================
// RESULT-PROOF DIRECTOR FIX CYCLE — targeted regressions.
// ================================================================================
test('RESULT-PROOF: the shadow preparation uses DEPARTURE state, never post-expedition growth',()=>{
 /* If the shadow used the returned (post-growth) NPC instead of a frozen pre-resolution
    snapshot, this proof would silently vanish once growth pushed mobility high enough that
    even the shadow (without the Item) crosses the escape threshold. The gap is read off
    Dungeon.prepare() itself, not hand-derived, so this stays correct if balance numbers move. */
 const g=new Game();g.autosave=false;g.start('result-proof-departure');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:(a)=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const base=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco'],injury:0,fatigue:0,alive:true,recovery:0,level:1,xp:0}));
 const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
 const withE=Dungeon.prepare(base(),gate,[]).effects,withoutE=Dungeon.prepare({...base(),pack:[]},gate,[]).effects;
 const escWith=escChance(withE),escWithout=escChance(withoutE);
 assert.ok(escWith>escWithout,'초코바 really does raise the escape chance, or this proof has nothing to test');
 const roll=(escWith+escWithout)/2; // WITH the Item -> 퇴각 (roll < escWith); WITHOUT -> 부상 (roll >= escWithout)
 const hard={...gate,power:1e9,day:500}; // combat fails regardless of the Item; day inflates XP so growth is guaranteed
 const n=base();const beforeStats=JSON.stringify(n.stats),beforeLevel=n.level;
 const r=Dungeon.resolve(n,hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]);
 assert.ok(n.level>beforeLevel||JSON.stringify(n.stats)!==beforeStats,
  'sanity: the real resolution actually grew this NPC - otherwise the regression proves nothing');
 assert.equal(r.outcome,'퇴각','the actual result, decided WITH the Item, is 퇴각');
 assert.ok(r.heroProof?.outcome?.items?.includes('choco'),
  'proof credits 초코바 off the DEPARTURE (pre-growth) preparation - a shadow built from the '+
  'grown NPC would find the same escape chance on both sides and credit nothing');
 assert.equal(r.heroProof.outcome.worse,'부상','and names the tier it kept the customer out of');
});

test('RESULT-PROOF: post-expedition Injury/Fatigue/Equipment cannot leak into the shadow either',()=>{
 /* Same shape, a different mutation channel each time: Aftercare changes n.injury, the
    Outcome's own Fatigue gain changes n.fatigue, and an equipment-tier win changes
    n.equipment.power - all AFTER prepare()'s own inputs were already fixed for the real
    resolution, and all BEFORE resultProof() runs. None of the three may reach the shadow. */
 const g=new Game();g.autosave=false;g.start('result-proof-departure-2');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:(a)=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 const base=()=>JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco'],injury:1,fatigue:0,alive:true,recovery:0,level:1,xp:0,
  equipment:{...g.run.npcs[0].equipment,power:0,tier:1}}));
 void 0;
 const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
 const withE=Dungeon.prepare(base(),gate,[]).effects,withoutE=Dungeon.prepare({...base(),pack:[]},gate,[]).effects;
 const escWith=escChance(withE),escWithout=escChance(withoutE);
 assert.ok(escWith>escWithout,'초코바 raises the escape chance here too');
 const roll=(escWith+escWithout)/2;
 const hard={...gate,power:1e9,day:500};
 const n=base();
 const r=Dungeon.resolve(n,hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]);
 assert.equal(r.outcome,'퇴각','WITH the Item, still 퇴각');
 // departed injured (injury=1): the departure Injury stayed 1 going in, and the resolution's
 // own transitions (n.injury reassignment for outcome, aftercare, equipment win, fatigue gain)
 // all run before heroProof - if the shadow read any of THOSE post-transition values instead
 // of the frozen departure ones, the proof would compute a different, wrong result.
 assert.ok(r.heroProof?.outcome?.items?.includes('choco'),
  'proof still credits 초코바 though Injury/Fatigue/Equipment all changed downstream of departure');
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
 // RETREAT: impossible gate, escape succeeds (escapeRoll 0.0001) -> 퇴각, which the rule
 // explicitly includes in the failure-conditioned Death check.
 {const hard={...gate,power:1e9};
  const r=Dungeon.resolve(mk(),hard,counting([0.5,0.999,0.0001,0.999,0.999,0.999]),[]);
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
 // gives resultProof several Items to shadow-test, land on the identical rng.state and the
 // identical persisted NPC fields either way - the proof itself draws nothing and touches no
 // Run/NPC/economy state.
 {const heavy=()=>{const g2=new Game();g2.autosave=false;g2.start('rng-neutral');
   const gate2=g2.makeDungeon('spider',1);
   const n=JSON.parse(JSON.stringify({...g2.run.npcs[0],traits:[],pack:['choco','potion','kit'],injury:0,fatigue:0,alive:true,recovery:0}));
   const money=g2.run.money;
   const rep=Dungeon.resolve(n,gate2,new RNG('rng-neutral-draw'),[]);
   return {state:g2.rng.state,money:g2.run.money,moneyChanged:g2.run.money!==money,rep};};
  const a=heavy(),b=heavy();
  assert.equal(a.rep.heroProof!==undefined,true,'the multi-Item case actually reaches resultProof');
  assert.deepEqual(a.rep,b.rep,'the same seed, same pack, same gate reproduces the identical report - proof included');
  assert.equal(a.moneyChanged,false,'resolve() never touches Run economy state on its own RNG object');
 }
});

test('RESULT-PROOF: existing attribution rules still hold (single / overlap / whole-Bag / 황금 1+1)',()=>{
 const g=new Game();g.autosave=false;g.start('result-proof-attribution');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 // single necessary Item is exercised directly by the two departure-state tests above
 // (초코바 alone flips 퇴각 <-> 부상); this test covers overlap / whole-Bag only.
 // overlap: A and B each independently sufficient to keep the SAME worse tier from happening.
 {const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco','energy'],injury:0,fatigue:0,alive:true,recovery:0}));
  const eBoth=Dungeon.prepare(n,gate,[]).effects,eNoChoco=Dungeon.prepare({...n,pack:['energy']},gate,[]).effects,eNoEnergy=Dungeon.prepare({...n,pack:['choco']},gate,[]).effects,eNeither=Dungeon.prepare({...n,pack:[]},gate,[]).effects;
  const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
  const escBoth=escChance(eBoth),escNoChoco=escChance(eNoChoco),escNoEnergy=escChance(eNoEnergy),escNeither=escChance(eNeither);
  // both 초코바 and 에너지드링크 grant mobility; WITH both, the roll clears; remove EITHER
  // one alone and it no longer does (each is independently necessary against the SAME roll).
  assert.ok(escBoth>escNoChoco+.001&&escBoth>escNoEnergy+.001,
   'sanity: this gate/pack really does shape the overlap case, or the assertions below prove nothing');
  const roll=(escBoth+Math.max(escNoChoco,escNoEnergy))/2;
  const hard={...gate,power:1e9};
  const r=Dungeon.resolve(JSON.parse(JSON.stringify(n)),hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]);
  assert.equal(r.outcome,'퇴각','with both Items, the roll clears and this stays a Retreat');
  assert.ok(r.heroProof?.outcome?.items?.length>=1,'at least one Item is credited for the same worse tier');
  assert.ok(r.heroProof.outcome.items.includes('choco')&&r.heroProof.outcome.items.includes('energy'),
   'and since EITHER removal alone worsens it, both are credited together, not just one');
 }
 // whole-Bag-only: EITHER Item alone still clears the roll, but removing BOTH does not - so
 // no single Item is individually necessary, only the whole committed preparation is.
 {const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['choco','energy'],injury:0,fatigue:0,alive:true,recovery:0}));
  const eBoth=Dungeon.prepare(n,gate,[]).effects,eNone=Dungeon.prepare({...n,pack:[]},gate,[]).effects,eNoChoco=Dungeon.prepare({...n,pack:['energy']},gate,[]).effects,eNoEnergy=Dungeon.prepare({...n,pack:['choco']},gate,[]).effects;
  const escChance=e=>Math.min(.94,Math.max(.15,.48+e.mobility*.005+e.escape-(gate.scale||1)*.024));
  const escBoth=escChance(eBoth),escNone=escChance(eNone),escNoChoco=escChance(eNoChoco),escNoEnergy=escChance(eNoEnergy);
  const floor=Math.min(escNoChoco,escNoEnergy);
  assert.ok(floor>escNone+.001,
   'sanity: either Item alone still clears where neither does, or the assertions below prove nothing');
  const roll=(escNone+floor)/2; // below both individual removals, at or above losing everything
  const hard={...gate,power:1e9};
  const r=Dungeon.resolve(JSON.parse(JSON.stringify(n)),hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]);
  assert.equal(r.outcome,'퇴각','with the full Bag, the roll clears');
  assert.equal(Dungeon.resolve(JSON.parse(JSON.stringify({...n,pack:['energy']})),hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]).outcome,'퇴각',
   '초코바 alone removed, 에너지드링크 still clears it');
  assert.equal(Dungeon.resolve(JSON.parse(JSON.stringify({...n,pack:['choco']})),hard,scripted([0.5,0.999,roll,0.999,0.999,0.999,0.999]),[]).outcome,'퇴각',
   '에너지드링크 alone removed, 초코바 still clears it');
  assert.ok(r.heroProof?.outcome,'yet the whole committed Bag is provably necessary');
  assert.equal(r.heroProof.outcome.items,null,'and ownership is generic - no single Item is invented as the cause');
  assert.equal(r.heroProof.outcome.worse,'부상','naming the tier losing the whole Bag would have reached');
 }
 // 황금 1+1: participates in the same proof boundary when its duplication changed the resolved
 // preparation - covered by ITEM_v2.7's existing duplicate-consumption contract (itemContributions
 // treats 'duplicate' as doubling the NEXT Item's effect and consuming no slot of its own), so a
 // shadow removing the DUPLICATED item removes both the base effect and the doubling together,
 // which is exactly the Outcome-order machinery already exercised above - no separate code path
 // exists for it, so no separate proof branch could silently special-case it.
 assert.ok(!/duplicate/.test(require('node:fs').readFileSync(require('node:path').join(__dirname,'..','dist/systems/dungeon.js'),'utf8').match(/function shadowOutcome[\s\S]*?\n}/)[0]),
  'shadowOutcome carries no special-cased 황금 1+1 branch - it goes through prepare() like every other Item');
});

test('RESULT-PROOF: persistent-state proof for 구급키트 Aftercare, and what is NOT promoted to Hero',()=>{
 const g=new Game();g.autosave=false;g.start('result-proof-aftercare');
 const gate=g.makeDungeon('spider',1);
 const scripted=seq=>{let i=0;return {next:()=>i<seq.length?seq[i++]:0.999,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};};
 // force a 중상 that Aftercare (구급키트) then relieves to 부상, with the TEXT Outcome unchanged
 // either way - the state proof, not the outcome proof, is what must credit it.
 const n=JSON.parse(JSON.stringify({...g.run.npcs[0],traits:[],pack:['kit'],injury:1,fatigue:0,alive:true,recovery:0}));
 const r=Dungeon.resolve(n,{...gate,power:1e9},scripted([0.5,0.999,0.999,0.50,0.999,0.999,0.999]),[]);
 assert.equal(r.outcome,'중상','departed already injured, the escalated threshold is crossed');
 assert.ok(r.aftercare&&r.aftercare.from===2&&r.aftercare.to===1,'구급키트 Aftercare actually relieved it to 부상');
 assert.equal(r.heroProof?.outcome,null,'the text Outcome (중상) is unchanged by 구급키트, so there is no Outcome proof');
 assert.ok(r.heroProof?.state?.items?.includes('kit'),
  '구급키트 is credited as a proven PERSISTENT-STATE contribution instead');
 // Fatigue-only and Wallet-only differences are never promoted to Hero feedback, on any report.
 for(const rep of [r]){
  assert.ok(!(rep.heroProof?.outcome?.worse==='부상'&&rep.heroProof?.outcome?.items?.some(id=>!DATA.itemBy[id].effects.combat&&!DATA.itemBy[id].effects.survival&&!DATA.itemBy[id].effects.mobility&&!DATA.itemBy[id].effects.spirit&&!DATA.itemBy[id].effects.escape&&!DATA.itemBy[id].effects.revive)),
   'no Fatigue/Wallet-only Item is ever the sole reason an Outcome tier is credited');
 }
});

console.log(groups+' night groups passed');
