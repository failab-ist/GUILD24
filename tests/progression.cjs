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
const CANDIDATE=process.argv.includes('--candidate');

/* The next balance pass, E1 + F1 + H1, injected HARNESS-ONLY. Nothing below is written to the
   catalog on disk: D.balance and D.bossTuning are plain data so they are assigned and restored
   here, and the overhead formula is reached through Game.prototype exactly the way this file
   already reaches Meta.jobUnlocked. Production keeps the approved Stage 10 values either way,
   and the two sides of the comparison run the same seeds.
     E1  the fixed Day pressure eases and the maintenance of a grown Roster carries more of it
     F1  the six Boss Traits ease; WRATH, the Final formula and the revenue target do not move
     H1  fire's combat requirement eases again; the environment coefficient is not touched */
function withCandidate(fn){
 if(!CANDIDATE)return fn();
 const t=D.bossTuning,b=D.balance,proto=globalThis.Game.prototype;
 const saved={tuning:{...t},sloth:t.slothBossPower.slice(),fire:b.fireCombat,overhead:proto.overheadBase};
 t.prideCombatFactor=0.90;t.envyStatFactor=0.92;t.gluttonyStatFactor=0.80;t.lustStatFactor=0.95;
 t.greedShortfallCap=15;t.slothBossPower=[220,190,175,160];
 b.fireCombat=0.90;
 proto.overheadBase=function(){const core=this.coreRoster();
  const avgLevel=core.length?core.reduce((a,n)=>a+n.level,0)/core.length:1;
  const avgRarity=core.length?core.reduce((a,n)=>a+n.rarity,0)/core.length:0;
  return (90+1*(this.run.day-1))*(1+.05*(avgLevel-1))*(1+.12*avgRarity);};
 try{return fn();}
 finally{Object.assign(t,saved.tuning);t.slothBossPower=saved.sloth;b.fireCombat=saved.fire;
  proto.overheadBase=saved.overhead;}
}

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
const ARM=CANDIDATE?'candidate':'baseline';
const FILE='tests/progression-results-v5'+(CANDIDATE?'-candidate':'')+'.json';
const out={version:2,canonicalSet:'GUILD24_DESIGN_SSOT_v2.5.0',seedsPerTier:seeds,arm:ARM,
 note:'Account progression tiers built through the real Job x Boss matrix. Deterministic strategy heuristics, not human play. `arm` says whether the E1+F1+H1 candidate was injected for the duration of the measurement.',
 tiers:[],forcedUnlock:null};
console.log('== arm:',ARM,'==');

/* Two play qualities, because the targets are written against the first of them. `beginner` is
   the first-run-like policy the Fresh D30 target is read from; `balanced` is skilled play, an
   analysis axis rather than a target. Both are heuristics, not people. */
const POLICIES=[['beginner','배우는 중'],['balanced','숙련']];
console.log('tier'.padEnd(20),'정책      등급 숙련 distinct   D10    D20    D30   D30후Final  전체Clear  평균사망');
for(const [policy,policyLabel] of POLICIES)
for(const t of TIERS){
 const account=accountFor(t);
 const r=withCandidate(()=>globalThis.Debug.simulate(seeds,policy,account,'adaptive','hybrid'));
 const row={...t,policy,grade:globalThis.Meta.grade(account),mastery:globalThis.Meta.totalJobMastery(account),
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
  familyJob:r.familyJob,bossJob:r.bossJob,npcLevel:r.npc.alive?r.npc.level/r.npc.alive:0,
  overheadByBand:r.overheadByBand,bossRuns:r.bossRuns,modes:r.modes,
  goldInTotal:r.goldInTotal,goldOutTotal:r.goldOutTotal,relicSpendPerRun:r.relicSpend/seeds};
 out.tiers.push(row);
 console.log(t.label.padEnd(20),policyLabel.padEnd(9),String(row.grade).padStart(2),String(row.mastery).padStart(4),
  String(row.distinct).padStart(6),pct(row.reach10).padStart(8),pct(row.reach20).padStart(7),
  pct(row.reach30).padStart(7),pct(row.finalGivenReach).padStart(10),pct(row.clear).padStart(10),
  row.deaths.toFixed(2).padStart(9));
 fs.writeFileSync(FILE,JSON.stringify(out,null,2));
}

/* 도적 / 광전사 against the base four, at Mastery 0 so the Job is the only difference. */
console.log('\n=== §A-1 forced-unlock Job comparison (Mastery 0, simulation only) ===');
const forced=withCandidate(()=>withAllJobs(()=>globalThis.Debug.simulate(seeds,'balanced',globalThis.Meta.fresh(),'adaptive','hybrid')));
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
fs.writeFileSync(FILE,JSON.stringify(out,null,2));
console.log('\nwritten: '+FILE);
