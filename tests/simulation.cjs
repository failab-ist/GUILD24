// Chunk G acceptance: the simulation policies and metric set that RUN-Q30, ECO-Q12 and
// DUN-Q20 are answered with. This suite proves the instrument, not the balance: it asserts
// that each minimal-engagement policy really drops the lever it names and that every metric
// the report cites is actually produced. The multi-seed verdict lives in reports/BALANCE.md.
// No canonical numeric is asserted here, and none is tuned by anything here.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
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
  assert.ok(r.metaXPPerRun<engaged.metaXPPerRun,policy+' earns less Meta XP per run than engaged play');
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
 const bands=['D1-3','D4-7','D8-12','D13-18'];
 for(const band of bands){
  const a=engaged.bands[band],b=bare.bands[band];
  assert.ok(a&&a.expeditions>0,band+' is sampled for prepared play');
  assert.ok(b&&b.expeditions>0,band+' is sampled for bare play');
  assert.ok(a.packed>0,band+' prepared play actually carries Items');
  assert.equal(b.packed,0,band+' bare play carries nothing');
 }
 assert.ok(engaged.impact.samples>0,'the prepared-vs-bare counterfactual is sampled');
 assert.ok(engaged.impact.preparedAbility>engaged.impact.characterAbility,'preparation adds ability over the character alone');
});

test('the extended metric set the report cites is actually produced',()=>{
 const r=cached('balanced');
 for(const key of ['dayReached','metaXP','metaUnlocks','metaGrade','knowledge','revenue','spend','npc','bands','final'])
  assert.ok(r[key]!==undefined,'metric present: '+key);
 for(const key of ['averageDay','metaXPPerRun','metaXPPerDay','metaXPPerKiloGold','knowledgePerRun'])
  assert.ok(Number.isFinite(r[key]),'derived metric is a number: '+key);
 assert.equal(Object.values(r.dayReached).reduce((a,b)=>a+b,0),SEEDS,'every run lands in the Day-reached distribution');
 assert.equal(r.npc.samples,SEEDS,'NPC long-term value is sampled once per run');
 assert.ok(r.npc.level>0&&r.npc.growth>=0,'NPC growth is recorded');
 assert.equal(r.final.reached,r.reached30,'Final viability counts the runs that reached D30');
 assert.ok(r.final.resolved>0,'the Boss was actually resolved');
 assert.equal(r.final.cleared,r.wins,'Final clears and Run wins agree');
 assert.ok(r.final.party/r.final.reached>0,'a party size is recorded for every Final');
});

test('the simulation observes the run and never rewrites it',()=>{
 // Two identical cohorts must agree exactly: the harness adds measurement, not behaviour.
 const a=Debug.simulate(4,'balanced',null,'adaptive','hybrid');
 const b=Debug.simulate(4,'balanced',null,'adaptive','hybrid');
 assert.deepEqual(b.days,a.days,'the same seeds produce the same per-Day measurements');
 assert.deepEqual(b.bands,a.bands,'and the same per-band measurements');
 assert.equal(b.metaXP,a.metaXP,'and the same Meta reward');
 assert.equal(b.final.margin,a.final.margin,'and the same Final margin');
});

test('PASS3 GATE: Chunk G reports Boss Power evidence and leaves the value alone',()=>{
 const r=cached('balanced');
 assert.equal(DATA.balance.bossPower,230,'the retained Source baseline is untouched by simulation');
 assert.ok(r.final.resolved>0,'the margin against it is measured');
 assert.ok(Number.isFinite(r.final.assault/r.final.resolved),'the assault the Boss was met with is reported as a number');
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
 assert.equal(t.byIndex[0].gradeAtStart,1,'Run 0 starts at the fresh grade');
 assert.equal(t.byIndex[0].unlockedAtStart,0,'Run 0 starts with nothing unlocked');
 assert.ok(t.byIndex.at(-1).gradeAtStart>1,'the account actually gained grade across Runs');
 assert.ok(t.byIndex.at(-1).unlockedAtStart>0,'and actually gained unlocks');
 for(let i=1;i<t.byIndex.length;i++){
  assert.ok(t.byIndex[i].gradeAtStart>=t.byIndex[i-1].gradeAtStart,'grade never goes backwards');
  assert.ok(t.byIndex[i].xpAtStart>t.byIndex[i-1].xpAtStart,'Meta XP accumulates across Runs');
 }
 // Every unlock held at the end is one the unlock table can actually grant, and every grade
 // is one the XP thresholds actually produce — nothing was written into the account directly.
 for(const a of t.accountsEnd){
  assert.ok(a.unlocked.every(k=>k in DATA.unlocks),'only real unlock keys');
  assert.equal(a.grade,[0,120,300,550,850,1250].filter(x=>a.xp>=x).length,'grade follows the XP thresholds');
 }
 // The contract mode may only ever pick something the account has unlocked.
 const best=Debug.trajectory({trajectories:2,runs:3,contract:'best',prefix:'test-best'});
 for(const idx of best.byIndex)for(const id of Object.keys(idx.contracts)){
  const c=DATA.contracts.find(c=>c.id===id);
  assert.ok(c,'a real contract');
  if(c.unlock)assert.ok(idx.unlockedAtStart>0,'a gated contract only appears once something is unlocked');
 }
});

test('RUN-Q30: the adversarial meta-farm is measured per action, not only per Run',()=>{
 const farm=cached('meta-farm'),engaged=cached('balanced');
 assert.equal(farm.revenue,0,'the farm sells nothing');
 assert.equal(farm.spend,0,'and buys nothing');
 assert.equal(farm.relicSpend,0,'and never pays for a Relic');
 assert.ok(farm.actionsPerRun<engaged.actionsPerRun,'the farm costs fewer player actions per Run');
 assert.ok(Number.isFinite(farm.metaXPPerAction)&&Number.isFinite(engaged.metaXPPerAction),'both report XP per action');
 assert.ok(farm.metaXPPerRun<engaged.metaXPPerRun,'per Run the farm still earns less');
});

test('FINAL party size 1 / 2 / 3 is measured at the same D30 state without changing it',()=>{
 const r=cached('balanced');
 for(const size of [1,2,3]){
  const b=r.partySize[size];
  assert.ok(b.samples>0,size+'-person party sampled');
  assert.ok(b.power>0,size+'-person party has power');
  assert.ok(b.assaultLo<b.assaultHi,size+'-person assault has a spread');
 }
 const p=size=>r.partySize[size].power/r.partySize[size].samples;
 assert.ok(p(3)>p(2)&&p(2)>p(1),'more legal adventurers is more party power');
 // The counterfactual is arithmetic on copies: the run that produced it is unaffected.
 assert.equal(r.final.reached,r.partySize[3].samples>0?r.reached30:r.final.reached,'the real Final still resolved normally');
 assert.equal(r.final.cleared,r.wins,'and its clears still agree with the Run wins');
 // clearChance is the exact probability of power*roll >= bossPower for roll ~ U(0.88,1.12).
 assert.equal(Debug.clearChance(100,230),0,'a hopeless party clears never');
 assert.equal(Debug.clearChance(1000,230),1,'an overwhelming party clears always');
 assert.ok(Math.abs(Debug.clearChance(230,230)-.5)<1e-9,'power equal to Boss Power is a coin flip');
});

test('RUN-Q15: invested regulars and late newcomers are classified from the run own history',()=>{
 const r=cached('balanced');
 assert.ok(r.q15.runs>0,'D30 states were classified');
 assert.ok(r.q15.invested.length>0,'invested regulars were found');
 assert.ok(r.q15.invested.every(Number.isFinite)&&r.q15.newcomer.every(Number.isFinite),'values are numbers');
 assert.ok(r.q15.chosenInvested+r.q15.chosenNewcomer>0,'the strongest legal party was classified too');
});

console.log(count+' simulation groups passed');
