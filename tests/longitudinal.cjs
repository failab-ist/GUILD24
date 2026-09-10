// Chunk G follow-up: cross-run Meta progression. The fresh-account benchmark in
// tests/balance.cjs answers "what does a first-time account do"; this answers "what does an
// account that has actually played do", by carrying ONE account through successive Runs and
// letting the real Meta system grant whatever it grants. No gameplay power is inserted.
// Measurement only — no canonical numeric is read from a result here.
const fs=require('node:fs');for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const trajectories=Number(process.argv[2])||60,runs=Number(process.argv[3])||12;
const out={version:5,canonicalSet:'GUILD24_CANONICAL_v2.4.0',trajectories,runsPerTrajectory:runs,
 note:'One account per trajectory, carried across Runs. Run index 0 is the fresh-account case and is directly comparable to the balance cohorts. Seeds are deterministic and distinct per trajectory and Run index.',
 cohorts:[]};
// `standard` holds the start contract fixed so the only thing that changes across Runs is what
// Meta itself granted; `best` lets the account also use the contracts it has earned.
// `meta-farm` is the adversarial repeat-farm case: does a short low-engagement Run stay
// efficient when it is run over and over on the same account?
const plans=[
 {label:'engaged / standard contract',policy:'balanced',pricing:'adaptive',build:'hybrid',contract:'standard'},
 {label:'engaged / best unlocked contract',policy:'balanced',pricing:'adaptive',build:'hybrid',contract:'best'},
 {label:'meta-farm / repeated',policy:'meta-farm',pricing:'adaptive',build:'hybrid',contract:'standard'}];
for(const plan of plans){
 const r=Debug.trajectory({trajectories,runs,policy:plan.policy,pricing:plan.pricing,build:plan.build,contract:plan.contract,prefix:'meta-'+plan.policy+'-'+plan.contract});
 out.cohorts.push({label:plan.label,...r});
 console.log(JSON.stringify({label:plan.label,
  first:{reach:r.byIndex[0].reachRate,clear:r.byIndex[0].overallClearRate,grade:r.byIndex[0].gradeAtStart,xp:Math.round(r.byIndex[0].metaXPPerRun)},
  last:{reach:r.byIndex.at(-1).reachRate,clear:r.byIndex.at(-1).overallClearRate,grade:Number(r.byIndex.at(-1).gradeAtStart.toFixed(1)),xp:Math.round(r.byIndex.at(-1).metaXPPerRun)},
  endGrade:Number((r.accountsEnd.reduce((a,x)=>a+x.grade,0)/r.accountsEnd.length).toFixed(1)),
  endUnlocks:Number((r.accountsEnd.reduce((a,x)=>a+x.unlocked.length,0)/r.accountsEnd.length).toFixed(1))}));
 fs.writeFileSync('tests/longitudinal-results-v5.json',JSON.stringify(out,null,2));
}
