// Chunk G acceptance: the simulation policies and metric set that RUN-Q30, ECO-Q12 and
// DUN-Q20 are answered with. This suite proves the instrument, not the balance: it asserts
// that each minimal-engagement policy really drops the lever it names and that every metric
// the report cites is actually produced. The multi-seed verdict lives in reports/BALANCE.md.
// No canonical numeric is asserted here, and none is tuned by anything here.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const SEEDS=12;
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

console.log(count+' simulation groups passed');
