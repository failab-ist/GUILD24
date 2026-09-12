// Stage 10 §Q — the re-measurement the balance adoption requires. MEASUREMENT ONLY.
// Nothing here writes a canonical value, and the production unlock rules are never changed:
// where a Job has to be forced open to be measured at all, it is forced inside this harness
// and put back, exactly as §A-1 asks.
//
// The Stage 9 report answered "what does a fresh account do" and then could not answer
// anything about 도적 / 광전사, because a fresh account never unlocks them. This file measures
// the thing the targets are actually written against: ACCOUNT PROGRESSION.
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const D=globalThis.DATA,seeds=Number(process.argv[2])||300;

/* The five tiers of §C. Each is built through the real matrix, so the Grade it implies, the
   Jobs it opens and the items it unlocks are the real ones - nothing is inserted by hand.
   `jobs x bosses` says how much of the matrix is filled, row-major. */
const TIERS=[
 {key:'fresh',   label:'Fresh First Run',   jobs:0, bosses:0},
 {key:'early',   label:'Early Meta',        jobs:2, bosses:2, trim:1},
 {key:'mid',     label:'Mid Meta',          jobs:4, bosses:3},
 {key:'late',    label:'Late Meta',         jobs:4, bosses:6},
 {key:'near',    label:'Near-complete Meta',jobs:5, bosses:7}];

function accountFor(t){
 const a=globalThis.Meta.fresh(),JOBS=globalThis.Meta.JOBS(),BOSSES=globalThis.Meta.BOSSES();
 let filled=0;
 for(let j=0;j<t.jobs;j++)for(let b=0;b<t.bosses;b++){
  if(t.trim&&filled>=t.jobs*t.bosses-t.trim)break;
  a.matrix[JOBS[j]][BOSSES[b]]=true;filled++;}
 return a;
}

/* §A-1. 도적 and 광전사 exist behind distinct-Boss gates, so a fresh account never sees them and
   Stage 9 could not measure them at all. Opening them for the duration of a measurement is a
   harness act: production unlock rules are untouched and the patch is always removed. */
function withAllJobs(fn){
 const real=globalThis.Meta.jobUnlocked;
 globalThis.Meta.jobUnlocked=()=>true;
 try{return fn();}finally{globalThis.Meta.jobUnlocked=real;}
}

const pct=x=>Number.isFinite(x)?(x*100).toFixed(1)+'%':'—';
const out={version:1,canonicalSet:'GUILD24_DESIGN_SSOT_v2.5.0',seedsPerTier:seeds,
 note:'Account progression tiers built through the real Job x Boss matrix. Deterministic strategy heuristics, not human play.',
 tiers:[],forcedUnlock:null};

console.log('tier'.padEnd(20),'등급 숙련 distinct   D10    D20    D30   D30후Final  전체Clear  평균사망');
for(const t of TIERS){
 const account=accountFor(t);
 const r=globalThis.Debug.simulate(seeds,'balanced',account,'adaptive','hybrid');
 const row={...t,grade:globalThis.Meta.grade(account),mastery:globalThis.Meta.totalJobMastery(account),
  distinct:globalThis.Meta.distinctBossClear(account),
  reach10:r.reach10,reach20:r.reach20,reach30:r.reach30,
  finalGivenReach:r.bossWinGivenReach,clear:r.overallClearRate,deaths:r.averageDeaths,
  endedBy:r.endedBy,deathFailDayMedian:r.deathFailDayMedian,
  goldIn:r.goldIn,goldOut:r.goldOut,saleOriginShare:r.saleOriginShare,
  overheadP10:r.overheadP10,overheadMedian:r.overheadMedian,overheadP90:r.overheadP90,
  coreLevelMedian:r.coreLevelMedian,coreRarityMedian:r.coreRarityMedian,
  prepStartGoldP25:r.prepStartGoldP25,prepStartGoldMedian:r.prepStartGoldMedian,prepStartGoldP75:r.prepStartGoldP75,
  great:r.great,greatSuccessRate:r.greatSuccessRate,greatStoreGoldPerRun:r.greatStoreGoldPerRun,
  deepOfferedPerRun:r.deepOfferedPerRun,deepTakenPerRun:r.deepTakenPerRun,deepSponsorPerRun:r.deepSponsorPerRun,
  familyJob:r.familyJob,bossJob:r.bossJob,npcLevel:r.npc.alive?r.npc.level/r.npc.alive:0};
 out.tiers.push(row);
 console.log(t.label.padEnd(20),String(row.grade).padStart(2),String(row.mastery).padStart(4),
  String(row.distinct).padStart(6),pct(row.reach10).padStart(8),pct(row.reach20).padStart(7),
  pct(row.reach30).padStart(7),pct(row.finalGivenReach).padStart(10),pct(row.clear).padStart(10),
  row.deaths.toFixed(2).padStart(9));
 fs.writeFileSync('tests/progression-results-v5.json',JSON.stringify(out,null,2));
}

/* 도적 / 광전사 against the base four, at Mastery 0 so the Job is the only difference. */
console.log('\n=== §A-1 forced-unlock Job comparison (Mastery 0, simulation only) ===');
const forced=withAllJobs(()=>globalThis.Debug.simulate(seeds,'balanced',globalThis.Meta.fresh(),'adaptive','hybrid'));
out.forcedUnlock={familyJob:forced.familyJob,bossJob:forced.bossJob,jobs:forced.jobs,
 reach30:forced.reach30,clear:forced.overallClearRate};
const KO={warrior:'전사',archer:'궁수',mage:'마법사',priest:'사제',rogue:'도적',berserker:'광전사'};
console.log('job'.padEnd(8),'원정수   성공률   사망률   Final파견  Final클리어');
for(const id of Object.keys(KO)){
 const j=forced.jobs[id];if(!j){console.log(KO[id].padEnd(8),'(등장 없음)');continue;}
 const bj=Object.entries(forced.bossJob).filter(([k])=>k.endsWith(':'+id))
  .reduce((a,[,v])=>({sent:a.sent+v.sent,cleared:a.cleared+v.cleared}),{sent:0,cleared:0});
 console.log(KO[id].padEnd(8),String(j.expeditions).padStart(7),
  pct(j.success/j.expeditions).padStart(8),pct(j.death/j.expeditions).padStart(8),
  String(bj.sent).padStart(10),pct(bj.sent?bj.cleared/bj.sent:NaN).padStart(12));
}
fs.writeFileSync('tests/progression-results-v5.json',JSON.stringify(out,null,2));
console.log('\nwritten: tests/progression-results-v5.json');
