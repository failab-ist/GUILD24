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

function freshStore(){
 /* META_v2.8 §DECORATION COLLECTION / LOADOUT. Ownership and activation are separate, and the
    loadout is keyed by Slot rather than by the four ids, so a Slot can hold alternatives later
    without this shape changing. */
 return {capital:0,owned:[],loadout:Object.fromEntries(D.decorationSlots.map(s=>[s,null]))};
}
function fresh(){
 return {version:3,matrix:freshMatrix(),knowledge:{},discovered:[],
  runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true,bgm:1,sfx:1},unlocks:{premium:false,tree:false},
  store:freshStore(),
  /* Retired v2.7 Franchise payload, kept dormant for data preservation only: no active effect,
     no new progress, no Grade derivation, no discount, no UI. See archive/inactive/v2_7_franchise. */
  franchise:freshFranchise()};
}
/* META_v2.8 §DECORATION COLLECTION / LOADOUT — the Account side. Nothing here reads or writes a
   Relic: a Decoration never enters `run.facilities`, never marks a Relic owned and never consumes
   a Relic slot. */
const store=a=>(a.store??=freshStore());
const decorationOwned=(a,id)=>store(a).owned.includes(id);
function buyDecoration(a,id){
 const d=D.decorationBy[id];if(!d)throw Error('없는 장식입니다.');
 const st=store(a);
 if(st.owned.includes(id))throw Error('이미 보유한 장식입니다.');
 if(st.capital<d.price)throw Error('점포 자본이 부족합니다.');
 st.capital-=d.price;st.owned.push(id);
 /* Buying is not equipping. An empty Slot simply takes the first thing bought for it, which is
    a convenience, not a rule - it can be unequipped again. */
 if(!st.loadout[d.slot])st.loadout[d.slot]=id;
 return d;
}
function equipDecoration(a,slot,id){
 const st=store(a);
 if(!D.decorationSlots.includes(slot))throw Error('없는 자리입니다.');
 if(id!==null){const d=D.decorationBy[id];
  if(!d||d.slot!==slot)throw Error('이 자리에 놓을 수 없는 장식입니다.');
  if(!st.owned.includes(id))throw Error('아직 보유하지 않은 장식입니다.');}
 st.loadout[slot]=id;
 return st.loadout;
}
/* What a Run would start with: one owned Decoration per Slot, empty Slots dropped. A Run freezes
   a copy of this at start and never re-reads the Account. */
function plannedLoadout(a){const st=store(a);
 return Object.fromEntries(D.decorationSlots
  .map(s=>[s,st.loadout[s]&&st.owned.includes(st.loadout[s])?st.loadout[s]:null])
  .filter(([,id])=>id));}
/* META_v2.8 §STORE CAPITAL. The Day the Run reached picks the rate; nothing else does. */
const capitalRate=day=>(D.capitalRates.find(b=>day<=b.maxDay)||D.capitalRates.at(-1)).rate;
function addCapital(a,amount){const st=store(a);st.capital+=Math.max(0,Math.round(amount));return st.capital;}
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

/* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM. Franchise Grade, the ten Achievements, the Grade
   ORDER discount and the Grade-gated Start Contract are retired from active gameplay. The final
   v2.7 implementation is preserved under archive/inactive/v2_7_franchise/ and is never imported.
   Active runtime derives no Grade, applies no discount, credits no Achievement and gates nothing
   on retired state. The account's `franchise` block may persist dormant for data preservation. */
const contractUnlocked=()=>true;

/* What a given progression state has opened. Since the Grade-gated Start Contract is retired,
   the only content unlocks left are the approved distinct-Boss gates. */
function opened(a){
 const n=distinctBossClear(a);
 return {items:D.items.filter(i=>i.metaUnlock&&n>=i.metaUnlock).map(i=>i.id),
  jobs:D.jobs.filter(j=>j.metaUnlock&&n>=j.metaUnlock).map(j=>j.id)};
}

const itemUnlocked=(a,it,day=1)=>{if(it.id==='premium')return !!a.unlocks?.premium&&day>=10;if(it.id==='tree')return !!a.unlocks?.tree&&day>=14;return !it.metaUnlock||distinctBossClear(a)>=it.metaUnlock;};
const jobUnlocked=(a,j)=>!j.metaUnlock||distinctBossClear(a)>=j.metaUnlock;

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
 const before=opened(a);
 const jobs=[...new Set((run.finalReport?.members||[]).map(m=>m.job))];
 const wasMastery=Object.fromEntries(jobs.map(job=>[job,jobMastery(a,job)]));
 for(const job of jobs)if(a.matrix[job]&&run.bossId in a.matrix[job])a.matrix[job][run.bossId]=true;
 run.metaGain={
  jobs:jobs.filter(job=>jobMastery(a,job)>wasMastery[job])
           .map(job=>({job,from:wasMastery[job],to:jobMastery(a,job)})),
  grade:null};
 const after=opened(a);
 const names=[...D.items,...D.jobs];
 return ['items','jobs'].flatMap(k=>after[k].filter(id=>!before[k].includes(id)))
  .map(id=>names.find(x=>x.id===id)?.name).filter(Boolean);
}

const storeCapital=a=>store(a).capital;
const ownedDecorations=a=>[...store(a).owned];
const storeLoadout=a=>({...store(a).loadout});
G.Meta={fresh,freshFranchise,observe,finish,storeCapital,ownedDecorations,storeLoadout,freshMatrix,jobMastery,totalJobMastery,distinctBossClear,
 opened,itemUnlocked,jobUnlocked,contractUnlocked,JOBS,BOSSES,
 freshStore,decorationOwned,buyDecoration,equipDecoration,plannedLoadout,capitalRate,addCapital};
})(globalThis);
