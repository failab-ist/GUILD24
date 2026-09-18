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
 return {version:3,matrix:freshMatrix(),knowledge:{},discovered:[],
  runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true,bgm:1,sfx:1},unlocks:{premium:false,tree:false},
  franchise:freshFranchise()};
}
/* META_v2.7 §FRANCHISE ACHIEVEMENTS. Ten binary achievements, each contributing exactly one
   completion; repeating a completed one adds nothing. The cumulative counters live on the
   account because they represent account-level play history; the one-Run ones are judged
   inside a single Run exactly as written. Nothing here is a second progression truth - the
   Grade is derived from the completion count on demand. */
function freshFranchise(){
 return {sales:0,overcharged:0,returning:0,relics:0,families:[],done:[]};
}

/* How many distinct Bosses this Job has beaten, 0..7. */
const jobMastery=(a,job)=>Object.values(a.matrix?.[job]||{}).filter(Boolean).length;

/* 0..42. The Franchise Grade reads this and nothing else. */
const totalJobMastery=a=>JOBS().reduce((sum,job)=>sum+jobMastery(a,job),0);

/* How many Bosses have been beaten at least once, by anyone, 0..7. Beating the same Boss
   with a second Job adds Mastery but not another distinct clear. */
const distinctBossClear=a=>BOSSES().filter(boss=>JOBS().some(job=>a.matrix?.[job]?.[boss])).length;

/* META_v2.7 §FRANCHISE ACHIEVEMENTS — CURRENT APPROVED SET. The baselines are DIRECTOR
   DOCUMENT BASELINE values: QA may report a BALANCE FINDING against them but may not tune
   them here. `run` is judged only for the one-Run achievements, which need a Run to look at. */
const FRANCHISE=[
 {id:'sales',      name:'누적 판매 80회',             done:(a)=>(a.franchise?.sales||0)>=80,
  have:(a)=>a.franchise?.sales||0,                want:80},
 {id:'overcharge', name:'150% 판매 20회 성공',        done:(a)=>(a.franchise?.overcharged||0)>=20,
  have:(a)=>a.franchise?.overcharged||0,          want:20},
 {id:'returning',  name:'재방문 손님에게 20회 판매',   done:(a)=>(a.franchise?.returning||0)>=20,
  have:(a)=>a.franchise?.returning||0,            want:20},
 {id:'relics',     name:'점포지원 누적 15개 구매',     done:(a)=>(a.franchise?.relics||0)>=15,
  have:(a)=>a.franchise?.relics||0,               want:15},
 {id:'families',   name:'다섯 게이트 전부에서 보급 생환',done:(a)=>(a.franchise?.families||[]).length>=5,
  have:(a)=>(a.franchise?.families||[]).length,   want:5},
 {id:'nowaste',    name:'폐기 0개로 DAY 25 도달',      done:(a)=>(a.franchise?.done||[]).includes('nowaste')},
 {id:'nodeath',    name:'사망 0명으로 마왕성 도달',     done:(a)=>(a.franchise?.done||[]).includes('nodeath')},
 {id:'allsupplied',name:'출전 전원 보급 후 마왕 토벌',  done:(a)=>(a.franchise?.done||[]).includes('allsupplied')},
 {id:'grosssales', name:'매출 10,000G + 마왕 토벌',    done:(a)=>(a.franchise?.done||[]).includes('grosssales')},
 {id:'matrix',     name:'직업×마왕 42/42 토벌',       done:(a)=>totalJobMastery(a)>=42}];
/* The cumulative ones carry their own running count so a screen can say how far along the
   account is without re-deriving the threshold from the name. The one-Run ones have no
   running count to show - they are a result, not a tally - and report none. */
const franchiseState=a=>FRANCHISE.map(f=>({id:f.id,name:f.name,done:f.done(a),
 have:f.have?Math.min(f.have(a),f.want):null,want:f.want??null}));
const franchiseCount=a=>FRANCHISE.reduce((n,f)=>n+(f.done(a)?1:0),0);
/* META_v2.7 §FRANCHISE GRADE: the Grade is the completion count, not Total Job Mastery.
   0/10 base, then a step at 2, 4, 6 and 8, and the honour grade at 10/10. */
const GRADE_STEPS=[0,2,4,6,8,10];
/* How many completions a Grade costs, and the Grade a count buys - one ladder read from both
   ends, so a screen that shows the progress toward a Grade cannot disagree with the judgment
   that opens it. Grade 1 is the base and asks for nothing. */
const gradeRequirement=g=>GRADE_STEPS[Math.max(0,Math.min(GRADE_STEPS.length-1,g-1))];
const grade=a=>{const n=franchiseCount(a);
 let g=1;for(let i=1;i<GRADE_STEPS.length;i++)if(n>=GRADE_STEPS[i])g=i+1;return g;};
/* META_v2.7 §FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE. Always applied, ORDER only. */
const orderDiscount=a=>(grade(a)-1)*0.02;

/* What a given progression state has opened. The only three content unlocks are the
   approved distinct-Boss gates; Start Contracts are gated by Grade and listed in the
   catalogue, so both are derived here rather than stored as a list of keys. */
function opened(a){
 const n=distinctBossClear(a),g=grade(a);
 return {items:D.items.filter(i=>i.metaUnlock&&n>=i.metaUnlock).map(i=>i.id),
  jobs:D.jobs.filter(j=>j.metaUnlock&&n>=j.metaUnlock).map(j=>j.id),
  contracts:D.contracts.filter(c=>!c.grade||g>=c.grade).map(c=>c.id)};
}

const itemUnlocked=(a,it,day=1)=>{if(it.id==='premium')return !!a.unlocks?.premium&&day>=10;if(it.id==='tree')return !!a.unlocks?.tree&&day>=14;return !it.metaUnlock||distinctBossClear(a)>=it.metaUnlock;};
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
 if(report.items.length && report.outcome!=='사망'){a.knowledge[d.id]=(a.knowledge[d.id]||0)+1;
  /* META_v2.7 §FRANCHISE ACHIEVEMENT 5: an actual supplied survival, per Dungeon Family. It
     recognises the same event knowledge does - no hidden Relic or build taxonomy. */
  const fr=a.franchise??=freshFranchise();
  const fam=d.family||d.id;if(fam&&!fr.families.includes(fam))fr.families.push(fam);}
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
 /* META_v2.7 §FRANCHISE ACHIEVEMENTS 7-9. Judged inside this one Run exactly as written, and
    marked once - a completed achievement never credits again. 7 is about REACHING the Final,
    so it settles whether or not the Boss fell; 8 and 9 require the CLEAR. 6 is not here at
    all: it settles at DAY 25, in the morning that reaches it, long before a Run ends. */
 {const fr=a.franchise??=freshFranchise();
  const mark=id=>{if(!fr.done.includes(id))fr.done.push(id);};
  /* A missing record is not evidence of a clean Run. These four read what the Run actually
     kept, so a Run with no stats record credits nothing rather than everything. */
  const st=run.stats;
  const reachedFinal=!!run.finalReport||run.day>=30;
  if(st&&reachedFinal&&!st.deaths)mark('nodeath');
  if(win&&st){
   const members=run.finalReport?.members||[];
   if(members.length&&members.every(m=>(m.items||[]).length))mark('allsupplied');
   if((st.revenue||0)>=10000)mark('grosssales');
  }}
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

G.Meta={fresh,freshFranchise,FRANCHISE,franchiseState,franchiseCount,orderDiscount,observe,finish,freshMatrix,jobMastery,totalJobMastery,distinctBossClear,grade,
 opened,itemUnlocked,jobUnlocked,contractUnlocked,gradeRequirement,JOBS,BOSSES};
})(globalThis);
