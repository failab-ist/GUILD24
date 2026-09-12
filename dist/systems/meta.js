(function(G){
const D=G.DATA;

/* The account: what is left once a Run ends. v2.5 replaces the old Global XP ladder with a
   single record of what has actually been beaten - one boolean per Job x Boss pair - and
   derives everything else from it. Nothing here is a second progression truth: Job Mastery,
   Distinct Boss Clear and the Franchise Grade are all computed on demand, so there is no
   cached number that can drift from the matrix or restore progress the matrix does not have.
   ASCII comments on purpose: the subset check scans every character in dist/. */

const JOBS=()=>D.jobs.map(j=>j.id);
const BOSSES=()=>D.bosses.map(b=>b.id);

/* Exactly the current Job x Boss set, every cell false. Not sparse: a partial matrix is a
   malformed one, and Save validation says so rather than reading it as progress. */
function freshMatrix(){
 const m={};
 for(const job of JOBS()){m[job]={};for(const boss of BOSSES())m[job][boss]=false;}
 return m;
}

function fresh(){
 return {version:2,matrix:freshMatrix(),knowledge:{},discovered:[],
  runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true}};
}

/* How many distinct Bosses this Job has beaten, 0..7. */
const jobMastery=(a,job)=>Object.values(a.matrix?.[job]||{}).filter(Boolean).length;

/* 0..42. The Franchise Grade reads this and nothing else. */
const totalJobMastery=a=>JOBS().reduce((sum,job)=>sum+jobMastery(a,job),0);

/* How many Bosses have been beaten at least once, by anyone, 0..7. Beating the same Boss
   with a second Job adds Mastery but not another distinct clear. */
const distinctBossClear=a=>BOSSES().filter(boss=>JOBS().some(job=>a.matrix?.[job]?.[boss])).length;

/* Prestige and the gate on which Start Contracts may be selected - never a bonus of its
   own. Seven Mastery per step, capped at six. */
const grade=a=>Math.min(6,Math.floor(totalJobMastery(a)/7)+1);

/* What a given progression state has opened. The only three content unlocks are the
   approved distinct-Boss gates; Start Contracts are gated by Grade and listed in the
   catalogue, so both are derived here rather than stored as a list of keys. */
function opened(a){
 const n=distinctBossClear(a),g=grade(a);
 return {items:D.items.filter(i=>i.metaUnlock&&n>=i.metaUnlock).map(i=>i.id),
  jobs:D.jobs.filter(j=>j.metaUnlock&&n>=j.metaUnlock).map(j=>j.id),
  contracts:D.contracts.filter(c=>!c.grade||g>=c.grade).map(c=>c.id)};
}

const itemUnlocked=(a,it)=>!it.metaUnlock||distinctBossClear(a)>=it.metaUnlock;
const jobUnlocked=(a,j)=>!j.metaUnlock||distinctBossClear(a)>=j.metaUnlock;
const contractUnlocked=(a,c)=>!c.grade||grade(a)>=c.grade;

/* What one expedition leaves on the account. Dungeon knowledge accrues only when a supplied
   adventurer comes home alive: there is no route that farms knowledge by sending people out
   bare. Day advancement on its own leaves nothing at all (RUN-Q30). */
function observe(a,report,n){
 a.discoveries??=[];
 report.discoveries=[];
 for(const e of report.events||[])
  if(!a.discoveries.some(x=>x.id===e.id)){a.discoveries.push({...e,day:report.day});report.discoveries.push(e);}
 const d=D.dungeonBy[report.dungeon]||D.dungeonBy.spider;
 if(report.items.length && report.outcome!=='사망')a.knowledge[d.id]=(a.knowledge[d.id]||0)+1;
}

/* End of run. A run settles exactly once (the rewarded guard). A clear marks one cell for
   each distinct Job that actually went - repeating a pair it already holds adds nothing,
   and a failure adds nothing at all. */
/* The result screen may only report what actually moved, so the credit step records the
   before/after of the values it changes. This is run-scoped presentation, not a second
   progression truth: matrix stays the only authority and every number here is derived from
   it on the spot. A Job that was already credited for this Boss moved nothing and is not
   listed. Run abandon never reaches this function, so it records nothing either. */
function finish(a,run,win){
 if(run.rewarded)return [];
 run.rewarded=true;
 a.runs++;
 run.metaGain=null;
 if(!win)return [];
 a.wins++;
 const before=opened(a),wasGrade=grade(a);
 const jobs=[...new Set((run.finalReport?.members||[]).map(m=>m.job))];
 const wasMastery=Object.fromEntries(jobs.map(job=>[job,jobMastery(a,job)]));
 for(const job of jobs)if(a.matrix[job]&&run.bossId in a.matrix[job])a.matrix[job][run.bossId]=true;
 run.metaGain={
  jobs:jobs.filter(job=>jobMastery(a,job)>wasMastery[job])
           .map(job=>({job,from:wasMastery[job],to:jobMastery(a,job)})),
  grade:grade(a)>wasGrade?{from:wasGrade,to:grade(a)}:null};
 const after=opened(a);
 const names=[...D.items,...D.jobs,...D.contracts];
 return ['items','jobs','contracts'].flatMap(k=>after[k].filter(id=>!before[k].includes(id)))
  .map(id=>names.find(x=>x.id===id)?.name).filter(Boolean);
}

G.Meta={fresh,freshMatrix,observe,finish,jobMastery,totalJobMastery,distinctBossClear,grade,
 opened,itemUnlocked,jobUnlocked,contractUnlocked,JOBS,BOSSES};
})(globalThis);
