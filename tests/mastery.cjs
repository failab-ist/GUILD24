// Job Mastery — what the spawn-Level bonus actually does, per rank. MEASUREMENT ONLY.
// The structure question is closed: Mastery is neither a Base nor a Growth multiplier but a
// single mutually exclusive roll for +1/+2/+3 spawn Levels on the owning Job's new adventurers.
// So this file no longer compares structures. It answers the three questions that are left:
//   1. does the table fire at the rates it declares          -> direct roll census
//   2. what does that do to the Level a Job actually arrives at
//   3. what does it contribute to reaching D30 and clearing  -> same account, bonus on vs off
// (3) holds the account fixed and neutralises only the bonus table, because an account that has
// Mastery also has unlocked Jobs and contracts - comparing two accounts would confuse the two.
// Nothing here is read by the game and no canonical numeric is written.
const fs=require('node:fs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const seeds=Number(process.argv[2])||120,rolls=Number(process.argv[3])||60000;
const D=globalThis.DATA,Meta=globalThis.Meta,Adventurer=globalThis.Adventurer;

/* An account whose every Job has cleared the same `rank` distinct Bosses. Built through the real
   matrix, so the Grade, the Job pool and the item unlocks it implies are the real ones. */
function atRank(rank){
 const a=Meta.fresh();
 for(const job of D.jobs)for(let b=0;b<rank;b++)a.matrix[job.id][D.bosses[b].id]=true;
 return a;
}
/* One Level in Final terms, for the owning Job, under the shipped coefficients. Reported so the
   spawn bonus can be read as combat value and not only as a Level count. */
const FINAL_COEF=[.50,.34,.27,.20];
const perLevel=job=>job.growth.reduce((v,g,i)=>v+g*FINAL_COEF[i],0);

const out={version:2,canonicalSet:'GUILD24_DESIGN_SSOT_v2.5.0',seedsPerCell:seeds,rollsPerRank:rolls,
 note:'Harness-only Job Mastery measurement. The Mastery channel is a spawn-Level bonus roll on the owning Job; this reports its observed rate, the Level it buys and what it contributes to D30 reach and clear with unlocks held constant.',
 table:[],contribution:[]};

// 1 + 2 — the roll census and the spawn Level it produces. Day is fixed so the ordinary
// Day-driven part of the spawn Level is constant and only the Mastery term varies.
const DAY=12,job=D.jobBy.warrior,per=perLevel(job);
console.log('rank  +1%    +2%    +3%   any%   평균 추가Lv  평균 SpawnLv  Final 기여');
for(let rank=0;rank<=7;rank++){
 const a=atRank(rank),r=new globalThis.RNG('mastery-roll-'+rank);
 const hit={1:0,2:0,3:0};let bonus=0,level=0;
 for(let i=0;i<rolls;i++){
  const b=Adventurer.masterySpawnBonus(r,a,job.id);
  if(b)hit[b]++;bonus+=b;
  level+=Math.max(1,r.int(1,3)+Math.floor((DAY-1)*.25))+b;
 }
 const row={rank,declared:Adventurer.MASTERY_SPAWN[rank],
  rate1:hit[1]/rolls,rate2:hit[2]/rolls,rate3:hit[3]/rolls,
  anyRate:(hit[1]+hit[2]+hit[3])/rolls,avgBonus:bonus/rolls,avgSpawnLevel:level/rolls,
  finalPerLevel:per,finalGain:bonus/rolls*per};
 out.table.push(row);
 console.log(String(rank).padEnd(5),(row.rate1*100).toFixed(1).padStart(5),(row.rate2*100).toFixed(1).padStart(6),
  (row.rate3*100).toFixed(1).padStart(6),(row.anyRate*100).toFixed(1).padStart(6),
  row.avgBonus.toFixed(3).padStart(12),row.avgSpawnLevel.toFixed(3).padStart(13),
  ('+'+row.finalGain.toFixed(2)).padStart(12));
}
console.log('(전사 기준 1 Level = Final +'+per.toFixed(2)+')\n');

// 3 — contribution. Same account, same seeds, bonus table on and then neutralised.
console.log('rank  mastery  reach   clear   deaths  finalPower  avgLevel  gold');
for(const rank of [0,2,4,6]){
 for(const on of [true,false]){
  const account=atRank(rank);
  const undo=on?()=>{}:globalThis.Debug.masterySpawnPatch();
  let r;try{r=globalThis.Debug.simulate(seeds,'balanced',account,'adaptive','expedition');}finally{undo();}
  const row={rank,mastery:on?'on':'off',reach:r.reachRate,clear:r.overallClearRate,deaths:r.averageDeaths,
   finalPower:r.final.resolved?r.final.power/r.final.resolved:0,
   finalMargin:r.final.resolved?r.final.margin/r.final.resolved:0,
   avgLevel:r.npc.alive?r.npc.level/r.npc.alive:0,gold:r.averageMoney,
   distinctAtStart:Meta.distinctBossClear(account),decorations:Meta.ownedDecorations(account).length};
  out.contribution.push(row);
  console.log(String(rank).padEnd(5),row.mastery.padEnd(8),row.reach.toFixed(3).padEnd(7),
   row.clear.toFixed(3).padEnd(7),row.deaths.toFixed(2).padEnd(7),
   row.finalPower.toFixed(1).padEnd(11),row.avgLevel.toFixed(2).padEnd(9),Math.round(row.gold));
  fs.writeFileSync('tests/mastery-results-v5.json',JSON.stringify(out,null,2));
 }
}
