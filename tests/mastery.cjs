// Stage 9 / §C-5 / §B-8 — Job Mastery structure comparison. MEASUREMENT ONLY.
// No document says whether Mastery adjusts a Job's visible Base, its Growth, or both. The
// three candidates are compared here so the Director can pick exactly one, which Stage 10
// then implements. Nothing here is read by the game and no canonical numeric is written.
//
// Two different questions live under "compare the structures", and they must not be mixed:
//   1. how fast Mastery accrues in play   -> tests/longitudinal.cjs, which carries an account
//   2. what a structure DOES at a rank    -> here, with the rank held fixed
// At the measured clear rate the first swamps the second, so this one pins the account and
// varies only the structure. Every mode runs the same seeds against the SAME account, so the
// unlocks, the contracts and the item pool are identical and the structure is the only
// difference. `step` is a harness magnitude for the comparison, not a proposed value: the real
// table is PASS3_AFTER_JOB_BASE_GROWTH_REBALANCE and stays unset until Stage 10.
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const seeds=Number(process.argv[2])||120,step=Number(process.argv[3])||0.04;
const D=globalThis.DATA;

/* An account whose every Job has cleared the same `rank` distinct Bosses. Built through the
   real matrix, so the Grade, the Job pool and the item unlocks it implies are the real ones. */
function atRank(rank){
 const a=globalThis.Meta.fresh();
 for(const job of D.jobs)for(let b=0;b<rank;b++)a.matrix[job.id][D.bosses[b].id]=true;
 return a;
}
const out={version:1,canonicalSet:'GUILD24_DESIGN_SSOT_v2.5.0',seedsPerCell:seeds,harnessStep:step,
 note:'Harness-only Mastery structure comparison. `harnessStep` is the per-rank multiplier used to make the three structures comparable; it is NOT a proposed value. Rank is held fixed per row so the structure is the only difference within a row.',
 rows:[]};
console.log('rank  mode     clear   reach   deaths  finalPower  avgLevel  gold');
for(const rank of [0,1,3,6]){
 for(const mode of ['none','base','growth','both']){
  const account=atRank(rank);
  const undo=globalThis.Debug.masteryPatch(account,mode,step);
  let r;try{r=globalThis.Debug.simulate(seeds,'skilled',account,'adaptive','expedition');}finally{undo();}
  const row={rank,mode,clear:r.overallClearRate,reach:r.reachRate,deaths:r.averageDeaths,
   finalPower:r.final.resolved?r.final.power/r.final.resolved:0,
   finalMargin:r.final.resolved?r.final.margin/r.final.resolved:0,
   avgLevel:r.npc.samples?r.npc.level/r.npc.alive:0,gold:r.averageMoney,
   distinctAtStart:globalThis.Meta.distinctBossClear(account),grade:globalThis.Meta.grade(account)};
  out.rows.push(row);
  console.log(String(rank).padEnd(5),mode.padEnd(8),row.clear.toFixed(3).padEnd(7),
   row.reach.toFixed(3).padEnd(7),row.deaths.toFixed(2).padEnd(7),
   row.finalPower.toFixed(1).padEnd(11),row.avgLevel.toFixed(2).padEnd(9),Math.round(row.gold));
  fs.writeFileSync('tests/mastery-results-v5.json',JSON.stringify(out,null,2));
 }
}
