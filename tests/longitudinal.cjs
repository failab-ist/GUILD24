// Chunk G follow-up: cross-run Meta progression. The fresh-account benchmark in
// tests/balance.cjs answers "what does a first-time account do"; this answers "what does an
// account that has actually played do", by carrying ONE account through successive Runs and
// letting the real Meta system grant whatever it grants. No gameplay power is inserted: Store
// Capital is accumulated through the production settlement path and Decorations are bought with
// the real Meta.buyDecoration.
// Measurement only — no canonical numeric is read from a result here.
const fs=require('node:fs');for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const trajectories=Number(process.argv[2])||60,runs=Number(process.argv[3])||12;
const out={version:5,canonicalSet:'GUILD24_DESIGN_SSOT_v2.5.0',trajectories,runsPerTrajectory:runs,
 note:'One account per trajectory, carried across Runs. Run index 0 is the fresh-account case and is directly comparable to the balance cohorts. Seeds are deterministic and distinct per trajectory and Run index.',
 cohorts:[]};
/* META_v2.8 retired the Start Contract, so the two arms that differed only by which contract
   the account was allowed to pick are one arm now. What replaces them is the axis that
   actually exists: whether the account spends its Store Capital on Decorations, and in which
   order. The order is measurement INPUT - these are the two orders the Final Balance pass
   reported - not a strategy this harness invents.
   `meta-farm` is the adversarial repeat-farm case: does a short low-engagement Run stay
   efficient when it is run over and over on the same account? */
const STRONG_FIRST=['dawnSign','guildPlaque','thriftSafe','premiumCase'];
const WEAK_FIRST=['premiumCase','thriftSafe','guildPlaque','dawnSign'];
const plans=[
 {label:'engaged / 장식 없음',policy:'balanced',pricing:'adaptive',build:'hybrid',purchaseOrder:null,tag:'none'},
 {label:'engaged / 강한 것부터',policy:'balanced',pricing:'adaptive',build:'hybrid',purchaseOrder:STRONG_FIRST,tag:'strong'},
 {label:'engaged / 약한 것부터',policy:'balanced',pricing:'adaptive',build:'hybrid',purchaseOrder:WEAK_FIRST,tag:'weak'},
 {label:'meta-farm / repeated',policy:'meta-farm',pricing:'adaptive',build:'hybrid',purchaseOrder:STRONG_FIRST,tag:'farm'}];
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
for(const plan of plans){
 const r=Debug.trajectory({trajectories,runs,policy:plan.policy,pricing:plan.pricing,build:plan.build,
  purchaseOrder:plan.purchaseOrder,prefix:'meta-'+plan.policy+'-'+plan.tag});
 out.cohorts.push({label:plan.label,...r});
 console.log(JSON.stringify({label:plan.label,
  first:{reach:r.byIndex[0].reachRate,clear:r.byIndex[0].overallClearRate,mastery:Number(r.byIndex[0].masteryAtStart.toFixed(1))},
  last:{reach:r.byIndex.at(-1).reachRate,clear:r.byIndex.at(-1).overallClearRate,
   mastery:Number(r.byIndex.at(-1).masteryAtStart.toFixed(1)),
   decorations:Number(r.byIndex.at(-1).decorationsAtStart.toFixed(2))},
  endDecorations:Number(mean(r.accountsEnd.map(x=>x.decorations)).toFixed(2)),
  endCapital:Math.round(mean(r.accountsEnd.map(x=>x.capital))),
  endMastery:Number(mean(r.accountsEnd.map(x=>x.mastery)).toFixed(1)),
  acquisition:r.acquisition.map(a=>({n:a.position,id:a.id,got:a.acquired+'/'+a.ofTrajectories,median:a.medianRun}))}));
 fs.writeFileSync('tests/longitudinal-results-v5.json',JSON.stringify(out,null,2));
}
