// Chunk G acceptance: the simulation policies and metric set that RUN-Q30, ECO-Q12 and
// DUN-Q20 are answered with. This suite proves the instrument, not the balance: it asserts
// that each minimal-engagement policy really drops the lever it names and that every metric
// the report cites is actually produced. The multi-seed verdict lives in reports/BALANCE.md.
// No canonical numeric is asserted here, and none is tuned by anything here.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const SEEDS=14;
const run=policy=>Debug.simulate(SEEDS,policy,null,'adaptive','hybrid');
const cache={};const cached=p=>cache[p]??=run(p);

test('RUN-Q30 / ECO-Q12: each minimal-engagement policy drops exactly the lever it names',()=>{
 const sale=cached('zero-sale');
 assert.equal(sale.revenue,0,'zero-sale sells nothing at all');
 assert.ok(sale.spend>0,'zero-sale still pays for its orders');
 const order=cached('zero-order');
 assert.equal(order.spend,0,'zero-order never buys from head office');
 assert.ok(order.revenue>0,'zero-order still sells the stock it started with');
 const supply=cached('zero-supply');
 assert.equal(supply.revenue,0,'zero-supply supplies nothing');
 assert.equal(supply.spend,0,'zero-supply buys nothing');
 for(const band of Object.values(supply.bands))assert.equal(band.packed,0,'no expedition in a zero-supply run carries an Item');
 const poverty=cached('poverty');
 assert.ok(poverty.spend>0&&poverty.spend<cached('balanced').spend/4,'poverty spends, but only a fraction of engaged play');
 assert.ok(poverty.revenue>0,'poverty still trades');
});

test('RUN-Q30: no minimal-engagement policy is an efficient permanent-reward farm',()=>{
 const engaged=cached('balanced');
 for(const policy of ['zero-sale','zero-order','zero-supply','poverty']){
  const r=cached(policy);
  assert.ok(r.averageDay<engaged.averageDay,policy+' does not reach as far as engaged play');
  assert.equal(r.masteryPerRun,0,policy+' earns no Job Mastery at all, because it never clears a Final');
  assert.ok(r.knowledgePerRun<engaged.knowledgePerRun,policy+' learns less about the Gates than engaged play');
  // Canonical asks whether minimal engagement ROUTINELY coasts to the late bands, not
  // whether one seed in three hundred ever gets there: the 300-seed run has poverty at
  // 0.7%. Asserting an absolute zero here would be asserting a stronger rule than
  // RUN-Q30 states, and would go red on a seed count the suite does not control.
  assert.ok(r.reachRate<.05,policy+' does not routinely coast to D30');
 }
 // The engagement gap must come from the existing systems, not from a punishment subsystem:
 // every minimal run ends by running out of money, never by a special rule.
 assert.ok(cached('zero-supply').bankrupt===SEEDS,'a zero-engagement run ends through the ordinary economy');
});

test('DUN-Q20: preparation is measured per progression band, prepared against bare',()=>{
 const engaged=cached('balanced'),bare=cached('zero-supply');
 /* Stage 10 tightened the Run economy deliberately, and bare play no longer survives into the
    later bands at all - it averages around DAY 10 where it used to reach DAY 15. That is the
    point of the change, so the contract is stated as what it now is: prepared play is sampled
    everywhere and carries Items everywhere; bare play carries nothing in any band it does
    reach, and does not reach the late ones. */
 const bands=['D1-3','D4-7','D8-12','D13-18'];
 for(const band of bands){
  const a=engaged.bands[band];
  assert.ok(a&&a.expeditions>0,band+' is sampled for prepared play');
  assert.ok(a.packed>0,band+' prepared play actually carries Items');
 }
 const bareBands=bands.filter(b=>bare.bands[b]&&bare.bands[b].expeditions>0);
 assert.ok(bareBands.length>=2,'bare play is sampled in the early bands');
 for(const band of bareBands)assert.equal(bare.bands[band].packed,0,band+' bare play carries nothing');
 /* What preparation buys is stated as the bands it reaches rather than as a ratio of fresh-Run
    lifespans. Under the v2.7 failure-conditioned Death model both policies end earlier, and a
    lifespan ratio mostly measures that shared shortening - the band reach is the claim that
    actually says preparation carries a Run somewhere bare play never gets to. The compressed
    lifespan margin itself is recorded as a BALANCE FINDING, not tuned away here. */
 for(const late of ['D13-18','D19-29'])
  assert.ok(!bare.bands[late]||bare.bands[late].expeditions===0,
   'repeated bare play does not reach '+late+' at all');
 assert.ok(engaged.bands['D13-18']&&engaged.bands['D13-18'].expeditions>0,
  'prepared play does reach the band bare play never sees');
 assert.equal(bare.reach20,0,'bare play never reaches DAY 20');
 /* DAY 20 on the prepared side turns on one or two Runs out of SEEDS, so asserting it is
    positive would be reading noise. The band reach above is the same fact at a sample size
    that means something. */
 assert.ok(bare.averageDay<engaged.averageDay,
  'bare play ends short of prepared play, rather than coasting alongside it');
 assert.ok(engaged.impact.samples>0,'the prepared-vs-bare counterfactual is sampled');
 assert.ok(engaged.impact.preparedAbility>engaged.impact.characterAbility,'preparation adds ability over the character alone');
});

test('preparation and phase decomposition are measured, and each one nests inside the run',()=>{
 const r=Debug.simulate(10,'balanced',null,'adaptive','hybrid');
 const P=r.prep;
 assert.ok(P.samples>0,'expeditions were observed at all');
 assert.ok(P.packed<=P.slots,'no bag carries more than its slots');
 assert.ok(P.fullBag+P.emptyBag<=P.samples,'full and empty bags are both subsets of departures');
 assert.ok(P.counterMatched<=P.counterRelevant,'a Counter cannot be matched where none was relevant');
 const sum=o=>Object.values(o).reduce((a,b)=>a+b,0);
 assert.equal(sum(P.bandBefore),sum(P.bandAfter),'every expedition is banded on both sides');
 assert.ok(sum(P.bandBefore)<=P.samples,'and only expeditions that face a Hazard are banded');
 assert.ok(P.bandImproved+P.bandWorse<=sum(P.bandBefore),'a band can move at most once per expedition');
 assert.equal(P.ratioBare.length,P.samples,'the bare Combat ratio is sampled per expedition');
 assert.equal(P.ratioReady.length,P.samples,'and so is the prepared one');
 /* The phase table follows one expedition from the combat roll to its outcome, so the outcomes
    must account for exactly the expeditions counted - a stage that loses a success is only
    readable if nothing falls out of the table on the way. */
 for(const [band,p] of Object.entries(r.phase)){
  assert.equal(p.success+p.retreat+p.injury+p.severe+p.death,p.expeditions,band+' accounts for every expedition');
  assert.ok(p.combatWon<=p.expeditions,band+' cannot win more rolls than it made');
  assert.ok(p.wonThenLost<=p.combatWon,band+' cannot lose a combat it never won');
  assert.ok(p.deathRolls<=p.expeditions-p.success,band+' rolls death only on a failure path');
  assert.equal(Object.values(p.tier).reduce((a,t)=>a+t.expeditions,0),p.expeditions,band+' tiers partition it');
 }
 const banded=Object.values(r.phase).reduce((a,p)=>a+p.expeditions,0);
 assert.equal(banded,P.samples,'and every observed expedition lands in exactly one Day band');
});
test('the extended metric set the report cites is actually produced',()=>{
 const r=cached('balanced');
 for(const key of ['dayReached','metaMastery','metaDistinct','metaStore','knowledge','revenue','spend','npc','bands','final'])
  assert.ok(r[key]!==undefined,'metric present: '+key);
 for(const key of ['averageDay','masteryPerRun','distinctPerRun','clearsPerRun','knowledgePerRun'])
  assert.ok(Number.isFinite(r[key]),'derived metric is a number: '+key);
 assert.equal(Object.values(r.dayReached).reduce((a,b)=>a+b,0),SEEDS,'every run lands in the Day-reached distribution');
 assert.equal(r.npc.samples,SEEDS,'NPC long-term value is sampled once per run');
 assert.ok(r.npc.level>0&&r.npc.growth>=0,'NPC growth is recorded');
 /* Whether a fresh-Account cohort arrives at D30 under its own power is a balance question,
    not a property of the metric set - so the Final metrics are asserted as invariants that hold
    at any reach, and the Boss-resolution path itself is covered on controlled D30 setups in
    tests/final.cjs and tests/integration.cjs rather than by hoping a cohort survives here. */
 assert.equal(r.final.reached,r.reached30,'Final viability counts the runs that reached D30');
 assert.equal(r.final.cleared,r.wins,'Final clears and Run wins agree');
 assert.ok(Number.isFinite(r.final.resolved)&&r.final.resolved>=0,'Final resolutions are counted');
 assert.ok(r.final.resolved<=r.final.reached,'no Final is resolved by a Run that never reached one');
 assert.ok(r.final.cleared<=r.final.resolved,'no Final is cleared without being resolved');
 if(r.final.reached>0)assert.ok(r.final.party/r.final.reached>0,'a party size is recorded for every Final');
});

/* The harness reported every Final contribution against the pre-Stage-10 .58/.32/.24/.16
   formula for as long as it kept its own copy of the coefficients. A copy is the defect, so
   this asserts there is none - not that the copy currently happens to be right. */
test('the harness measures Prepared Power with the game helper, never its own copy',()=>{
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/simulation.js'),'utf8');
 const code=src.replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'');
 for(const stale of ['.58','.32','.24','.16'])
  assert.ok(!code.includes('combat*'+stale)&&!code.includes('survival*'+stale)
   &&!code.includes('mobility*'+stale)&&!code.includes('spirit*'+stale),
   'no Core-Stat coefficient '+stale+' is written out in the harness');
 for(const live of ['.50','.34','.27','.20'])
  assert.ok(!code.includes('combat*'+live)&&!code.includes('survival*'+live),
   'not even the CURRENT coefficient '+live+' is copied - the helper is read');
 assert.equal((code.match(/G\.Dungeon\.preparedPower\(/g)||[]).length>=3,true,
  'the helper is what the harness reads');
 // and the helper it reads is the approved one
 assert.equal(Dungeon.preparedPower({combat:100,survival:50,mobility:30,spirit:20}),
  100*.50+50*.34+30*.27+20*.20,'with the approved v2.7 coefficients');
});

test('the simulation observes the run and never rewrites it',()=>{
 // Two identical cohorts must agree exactly: the harness adds measurement, not behaviour.
 const a=Debug.simulate(4,'balanced',null,'adaptive','hybrid');
 const b=Debug.simulate(4,'balanced',null,'adaptive','hybrid');
 assert.deepEqual(b.days,a.days,'the same seeds produce the same per-Day measurements');
 assert.deepEqual(b.bands,a.bands,'and the same per-band measurements');
 assert.equal(b.metaMastery,a.metaMastery,'and the same Meta reward');
 assert.equal(b.final.margin,a.final.margin,'and the same Final margin');
});

/* Stage 10 approved a new WRATH baseline (230 -> 200) as part of the balance adoption. What
   this gate still holds is what it was written for: the harness MEASURES against whatever the
   approved baseline is and never writes one of its own. */
test('PASS3 GATE: the harness reports Boss Power evidence and leaves the value alone',()=>{
 const r=cached('balanced');
 assert.equal(DATA.balance.bossPower,200,'the approved Source baseline is untouched by simulation');
 /* The gate is that the harness MEASURES and never writes a baseline of its own, so it is
    asserted on the baseline and on the reporting - not on whether a fresh-Account cohort
    happened to reach a Final to measure against, which is a balance question. */
 const before=JSON.stringify(DATA.balance);
 Debug.simulate(3,'balanced',null,'adaptive','hybrid');
 assert.equal(JSON.stringify(DATA.balance),before,'running the harness writes nothing back into Source balance');
 assert.ok(Number.isFinite(r.final.assault),'the assault the Boss was met with is reported');
 assert.ok(r.final.assault>=0,'and it is never negative');
 if(r.final.resolved>0)assert.ok(Number.isFinite(r.final.assault/r.final.resolved),'the per-Final margin is a number');
});

test('the fresh-account benchmark is labelled as one, and progression is measured separately',()=>{
 // The regression baseline: every simulate() seed starts from a first-time account, so its
 // Final numbers must never be read as the game's ceiling. trajectory() is the other half.
 const seen=[];
 const originalFresh=Meta.fresh;
 Meta.fresh=function(){seen.push(1);return originalFresh.apply(this,arguments);};
 try{Debug.simulate(3,'balanced',null,'adaptive','hybrid');}finally{Meta.fresh=originalFresh;}
 assert.equal(seen.length,3,'simulate() builds one fresh account per seed');
 assert.equal(typeof Debug.trajectory,'function','the longitudinal mode exists alongside it');
});

test('CROSS-RUN META: one account really carries forward, and nothing is inserted into it',()=>{
 const t=Debug.trajectory({trajectories:4,runs:5,prefix:'test-meta'});
 assert.equal(t.byIndex.length,5,'one cohort per Run index');
 /* META_v2.8 retired the Grade, the Achievements and the Start Contract, so what a returning
    player carries is Store Capital, the owned Decorations and their loadout, Job Mastery and
    distinct Boss clears. Those are what is asserted; the Grade bucket that used to sit here
    was also vacuous, because this trajectory never bought a Decoration and so every account
    stayed at the fresh Grade. */
 assert.equal(t.byIndex[0].masteryAtStart,0,'Run 0 starts with no Job Mastery');
 assert.equal(t.byIndex[0].distinctAtStart,0,'and no Boss beaten');
 assert.equal(t.byIndex[0].decorationsAtStart,0,'and no Decoration owned');
 assert.equal(t.byIndex[0].capitalAtStart,0,'and no Store Capital');
 for(const gone of ['gradeAtStart','maxGradeAtStart','gradeDist','franchiseAtStart','contractsAvailable','contracts'])
  assert.equal(gone in t.byIndex[0],false,'no retired field survives on the cohort: '+gone);
 for(const gone of ['byGrade','contractMode'])
  assert.equal(gone in t,false,'nor on the result: '+gone);
 // Progression is earned only by clearing a Final, so a cohort that never clears one stays at
 // the fresh state - which is the property, not a failure to progress.
 const cleared=t.accountsEnd.some(a=>a.distinct>0);
 if(cleared)assert.ok(t.byIndex.at(-1).masteryAtStart>=t.byIndex[0].masteryAtStart,'Mastery never goes backwards');
 for(let i=1;i<t.byIndex.length;i++){
  assert.ok(t.byIndex[i].masteryAtStart>=t.byIndex[i-1].masteryAtStart,'Job Mastery never goes backwards');
  assert.ok(t.byIndex[i].decorationsAtStart>=t.byIndex[i-1].decorationsAtStart,'owned Decorations never go backwards');
 }
 for(const a of t.accountsEnd){
  assert.ok(a.mastery>=0&&a.mastery<=42,'Total Job Mastery stays in range');
  assert.ok(a.distinct>=0&&a.distinct<=7,'Distinct Boss Clear stays in range');
  assert.ok(a.decorations>=0&&a.decorations<=DATA.decorations.length,'the owned Decoration count stays in range');
  assert.ok(a.capital>=0,'Store Capital never goes negative');
  for(const slot of DATA.decorationSlots){
   const id=a.loadout[slot];
   if(id===null)continue;
   assert.equal(DATA.decorationBy[id].slot,slot,'an equipped Decoration is in its own Slot');
  }
 }
 // With no purchase order the trajectory buys nothing at all, and says so.
 assert.deepEqual(t.purchaseOrder,[],'the pure-Meta arm names no purchase order');
 assert.deepEqual(t.acquisition,[],'and acquires nothing');
 for(const l of t.ledgers)for(const r of l)assert.deepEqual(r.bought,[],'no Decoration is bought without one');
});

/* META_v2.8 §STORE CAPITAL + §DECORATION COLLECTION, measured across Runs. The acquisition
   timing reported to the Director has to be reproducible from a checked-in harness, so this
   drives it: real settlement through Game.end(), real Meta.buyDecoration, and the purchase
   order as an explicit input rather than a strategy the harness invents. */
test('CROSS-RUN DECORATION: Capital is earned by the production path and spent by the real Meta call',()=>{
 const order=['dawnSign','guildPlaque','thriftSafe','premiumCase'];
 const t=Debug.trajectory({trajectories:4,runs:8,prefix:'test-deco',purchaseOrder:order});
 assert.deepEqual(t.purchaseOrder,order,'the order is measurement input, echoed back');
 assert.equal(t.acquisition.length,4,'one acquisition row per purchase position');
 assert.equal(t.ledgers.length,4,'one ledger per trajectory');

 for(const ledger of t.ledgers){
  assert.equal(ledger.length,8,'one row per Run');
  let owned=0,capital=0;
  for(const r of ledger){
   // the ledger is a ledger: what it starts with is what the previous Run left
   assert.equal(r.capitalStart,capital,'Run '+r.run+' starts on the previous Run close');
   assert.equal(r.ownedBefore,owned,'and on the Decorations it already had');
   // the gain is the shipped rule, on the reached Day, from the Run's own settlement
   assert.ok(r.grossSales>=0,'Gross Sales is never negative');
   assert.equal(r.gain,Math.round(r.grossSales*Meta.capitalRate(r.dayReached)),
    'the gain is Gross Sales at the reached-Day rate');
   assert.ok(r.grossSales>0||r.gain===0,'a Run that sold nothing earns nothing');
   assert.equal(r.capitalAfterSettlement,r.capitalStart+r.gain,'and it is added once');
   // what was bought was affordable, in the named order, and actually paid for
   const spend=r.bought.reduce((a,id)=>a+DATA.decorationBy[id].price,0);
   assert.equal(r.capitalEnd,r.capitalAfterSettlement-spend,'every purchase is paid out of that Capital');
   assert.ok(r.capitalEnd>=0,'and nothing is bought that the Capital did not cover');
   assert.equal(r.ownedAfter,r.ownedBefore+r.bought.length,'the owned count moves by what was bought');
   for(let k=0;k<r.bought.length;k++)
    assert.equal(r.bought[k],order[owned+k],'purchases follow the named order');
   // buying fills its own Slot, and only its own
   for(const id of r.bought)assert.equal(r.loadout[DATA.decorationBy[id].slot],id,id+' took its Slot');
   owned=r.ownedAfter;capital=r.capitalEnd;
  }
 }
 // the acquisition rows are read off those ledgers, not projected from a mean
 for(const row of t.acquisition){
  assert.equal(row.runs.length,t.ledgers.length,'one entry per trajectory');
  for(let i=0;i<row.runs.length;i++){
   const at=row.runs[i];
   if(at===null){assert.ok(t.ledgers[i].at(-1).ownedAfter<row.position,'null means it was never reached');continue;}
   assert.ok(t.ledgers[i][at-1].ownedAfter>=row.position,'the recorded Run really holds that many');
   if(at>1)assert.ok(t.ledgers[i][at-2].ownedAfter<row.position,'and it is the FIRST such Run');
  }
  assert.equal(row.acquired,row.runs.filter(x=>x!==null).length,'the count matches the entries');
 }
 // reproducible: the same input gives the same ledger, byte for byte
 const again=Debug.trajectory({trajectories:4,runs:8,prefix:'test-deco',purchaseOrder:order});
 assert.deepEqual(again.ledgers,t.ledgers,'the same seed and order reproduce the same ledger');
 assert.deepEqual(again.acquisition,t.acquisition,'and the same acquisition timing');
 // and the order is an input: a different one is followed
 const reverse=Debug.trajectory({trajectories:2,runs:4,prefix:'test-deco',purchaseOrder:[...order].reverse()});
 for(const l of reverse.ledgers)for(const r of l)
  for(const id of r.bought)assert.ok(order.includes(id),'still a real Decoration');
 assert.deepEqual(reverse.purchaseOrder,[...order].reverse(),'the reversed order is what it was given');
 assert.throws(()=>Debug.trajectory({trajectories:1,runs:1,purchaseOrder:['nope']}),/없는 장식/,
  'and an id that is not a Decoration is refused');
});

test('RUN-Q30: the adversarial meta-farm is measured per action, not only per Run',()=>{
 const farm=cached('meta-farm'),engaged=cached('balanced');
 assert.equal(farm.revenue,0,'the farm sells nothing');
 assert.equal(farm.spend,0,'and buys nothing');
 assert.equal(farm.relicSpend,0,'and never pays for a Relic');
 assert.ok(farm.actionsPerRun<engaged.actionsPerRun,'the farm costs fewer player actions per Run');
 assert.equal(farm.masteryPerRun,0,'and earns no permanent progression whatsoever');
 assert.equal(farm.distinctPerRun,0,'no Boss is beaten by advancing Days');
});

test('FINAL party size 1 / 2 / 3 is measured at the same D30 state without changing it',()=>{
 const r=cached('balanced');
 /* The counterfactual only has a D30 state to read when a fresh-Account cohort reached one,
    which is a balance question rather than a property of the counterfactual. Party sizes
    1/2/3 themselves are covered on controlled D30 setups in tests/final.cjs; what is asserted
    here is that whatever WAS sampled is well-formed, monotonic, and left the Run alone. */
 for(const size of [1,2,3]){
  const b=r.partySize[size];
  assert.ok(b&&Number.isFinite(b.samples)&&b.samples>=0,size+'-person party band is reported');
  if(!b.samples)continue;
  assert.ok(b.power>0,size+'-person party has power');
  assert.ok(b.assaultLo<b.assaultHi,size+'-person assault has a spread');
 }
 const sampled=[1,2,3].filter(size=>r.partySize[size].samples>0);
 const p=size=>r.partySize[size].power/r.partySize[size].samples;
 if(sampled.length===3)assert.ok(p(3)>p(2)&&p(2)>p(1),'more legal adventurers is more party power');
 // The counterfactual is arithmetic on copies: the run that produced it is unaffected.
 assert.equal(r.final.reached,r.reached30,'the real Final still resolved normally');
 assert.equal(r.final.cleared,r.wins,'and its clears still agree with the Run wins');
 // clearChance is the exact probability of power*roll >= bossPower for roll ~ U(0.88,1.12).
 assert.equal(Debug.clearChance(100,230),0,'a hopeless party clears never');
 assert.equal(Debug.clearChance(1000,230),1,'an overwhelming party clears always');
 assert.ok(Math.abs(Debug.clearChance(230,230)-.5)<1e-9,'power equal to Boss Power is a coin flip');
});

test('RUN-Q15: invested regulars and late newcomers are classified from the run own history',()=>{
 const r=cached('balanced');
 /* The harness classifies at D30, so a fresh-Account cohort that does not get there produces
    no sample - a balance fact, not a classification fault. The classification itself is
    asserted on a controlled D30 setup in tests/final.cjs; here it is asserted well-formed. */
 assert.ok(Number.isFinite(r.q15.runs)&&r.q15.runs>=0,'D30 classification is reported');
 assert.ok(r.q15.invested.every(Number.isFinite)&&r.q15.newcomer.every(Number.isFinite),'values are numbers');
 assert.equal(r.q15.runs>0&&!r.q15.invested.length&&!r.q15.newcomer.length,false,'a classified state names at least one group');
 if(r.q15.runs>0)assert.ok(r.q15.chosenInvested+r.q15.chosenNewcomer>0,'the strongest legal party was classified too');
});

console.log(count+' simulation groups passed');
