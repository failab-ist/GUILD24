// 저장된 측정 JSON만 읽는다. 재생/시뮬/Production 변경 없음.
// node reports/v2100-measure/fresh-candidates-20261006/analyse.cjs <원자료 디렉터리>
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=process.argv[2];if(!dir)throw Error('원자료 디렉터리 필요');
const names=['baseline','growth','late100','late105'];
const raw=Object.fromEntries(names.map(n=>[n,JSON.parse(fs.readFileSync(path.join(dir,n+'.json'),'utf8'))]));
const sum=(rs,f)=>rs.reduce((a,r)=>a+f(r),0),mean=(rs,f)=>rs.length?sum(rs,f)/rs.length:null;
const ratio=(a,b)=>b?a/b:null;
const chance=f=>f.power<=0?0:Math.max(0,Math.min(1,(1.08-f.bossPower/f.power)/.16));
const median=xs=>{xs.sort((a,b)=>a-b);const n=xs.length;return n?n%2?xs[(n-1)/2]:(xs[n/2-1]+xs[n/2])/2:null;};
function measure(rs){const reached=rs.filter(r=>r.reach),final=rs.filter(r=>r.final),np=sum(rs,r=>Object.values(r.jobs).reduce((a,j)=>a+j.npcs,0));
 return {n:rs.length,reach:mean(rs,r=>r.reach),clear:mean(rs,r=>r.win),clearGivenReach:mean(reached,r=>r.win),
  endDay:mean(rs,r=>r.day),endDayMedian:median(rs.map(r=>r.day)),
  bands:[0,1,2,3].map(i=>ratio(sum(rs,r=>r.bands[i][0]),sum(rs,r=>r.bands[i][1]))),
  success:ratio(sum(rs,r=>r.all[0]),sum(rs,r=>r.all[1])),environment:ratio(sum(rs,r=>r.env),sum(rs,r=>r.all[1])),deaths:mean(rs,r=>r.deaths),d10:mean(rs,r=>r.d10),
  topSuccess:ratio(sum(rs,r=>r.core.top[0]),sum(rs,r=>r.core.top[1])),restSuccess:ratio(sum(rs,r=>r.core.rest[0]),sum(rs,r=>r.core.rest[1])),
  topDeaths:mean(rs,r=>r.core.top[2]),restDeaths:mean(rs,r=>r.core.rest[2]),cash:mean(rs,r=>r.cash),
  finalN:final.length,finalPower:mean(final,r=>r.final.power),finalBossPower:mean(final,r=>r.final.bossPower),
  finalRatio:mean(final,r=>r.final.power/r.final.bossPower),finalChance:mean(final,r=>chance(r.final)),finalLevel:ratio(sum(final,r=>sum(r.final.members,m=>m.level)),sum(final,r=>r.final.members.length)),
  finalGap:ratio(sum(final,r=>sum(r.final.members,m=>m.gap)),sum(final,r=>r.final.members.length)),
  exposedNPCs:np,levelGain:ratio(sum(rs,r=>Object.values(r.jobs).reduce((a,j)=>a+j.levelGain,0)),np)};}
function jobs(rs){const ids=[...new Set(rs.flatMap(r=>Object.keys(r.jobs)))],out={};for(const id of ids){const js=rs.map(r=>r.jobs[id]).filter(Boolean),s=k=>sum(js,j=>j[k]),n=s('npcs'),e=s('exp'),f=s('finalPicks');
 const rarities={};for(const j of js)for(const [rarity,x]of Object.entries(j.rarities)){const a=rarities[rarity]??={npcs:0,exp:0,wins:0,combatLoss:0,env:0,deaths:0};for(const k of Object.keys(a))a[k]+=x[k];}
 out[id]={name:js[0].name,npcs:n,exp:e,success:ratio(s('wins'),e),combatLoss:ratio(s('combatLoss'),e),env:ratio(s('env'),e),deaths:s('deaths'),
  firstLevel:ratio(s('firstLevel'),n),level:ratio(s('level'),n),levelGain:ratio(s('levelGain'),n),potential:ratio(s('potential'),n),mastery:ratio(s('mastery'),n),firstDay:ratio(s('firstDay'),n),
  finalPicks:f,finalRuns:s('finalRuns'),finalClear:ratio(s('finalWins'),s('finalRuns')),finalPower:ratio(s('finalPower'),f),finalGap:ratio(s('finalGap'),f),finalLevel:ratio(s('finalLevel'),f),
  bands:[0,1,2,3].map(i=>{const v=[0,0,0,0,0];for(const j of js)j.bands[i].forEach((x,k)=>v[k]+=x);return {n:v[1],success:ratio(v[0],v[1]),combatLoss:ratio(v[2],v[1]),env:ratio(v[3],v[1]),deaths:v[4]};}),rarities};}return out;}
function paired(base,after,key){const map=new Map(base.map(r=>[r.seed,r]));assert.equal(map.size,base.length);const ds=after.map(r=>{const b=map.get(r.seed);assert.ok(b,'시드 불일치');return r[key]-b[key];});
 const delta=mean(ds,x=>x),v=sum(ds,x=>(x-delta)**2)/(ds.length-1),se=Math.sqrt(v/ds.length);return {n:ds.length,delta,se,lo:delta-1.96*se,hi:delta+1.96*se};}
function firstClear(rs){const by=new Map();for(const r of rs){const k=r.seed.replace(/-\d+$/,'');if(!by.has(k))by.set(k,[]);by.get(k).push(r);}assert.equal(by.size,200);
 const hist=Array(10).fill(0);let unlockedRogue=0,unlockedBerserker=0,maxDistinct=0;
 for(const rows of by.values()){rows.sort((a,b)=>a.idx-b.idx);assert.equal(rows.length,10);assert.ok(rows.every((r,i)=>r.idx===i));const won=rows.find(r=>r.win);if(won)hist[won.idx]++;
  const distinct=new Set(rows.filter(r=>r.win).map(r=>r.boss)).size;unlockedRogue+=distinct>=3;unlockedBerserker+=distinct>=6;maxDistinct=Math.max(maxDistinct,distinct);}
 let cumulative=0,median=null;for(let i=0;i<10;i++){cumulative+=hist[i];if(median===null&&cumulative>=100)median=i+1;}
 return {n:by.size,hist,by1:hist[0]/200,by5:sum(hist.slice(0,5),x=>x)/200,by10:sum(hist,x=>x)/200,median:median??'>10',unlockedRogue,unlockedBerserker,maxDistinct};}
const result={conditions:{},paired:{}};
for(const n of names){const data=raw[n];assert.equal(data.meta.schema,2);assert.equal(data.meta.TT,200);assert.equal(data.meta.FN,1000);assert.equal(Object.keys(data.arms).length,9);
 const out=result.conditions[n]={seconds:data.meta.sec,arms:{},firstClear:{}};let total=0;
 for(const [key,a]of Object.entries(data.arms)){assert.equal(a.rows.length,key.includes('/fresh/')?1000:2000);assert.equal(new Set(a.rows.map(r=>r.seed)).size,a.rows.length);total+=a.rows.length;
  for(const r of a.rows){assert.equal(Object.values(r.jobs).reduce((s,j)=>s+j.exp,0),r.all[1],'직업 원정 합계');assert.equal(Object.values(r.jobs).reduce((s,j)=>s+j.wins,0),r.all[0],'직업 성공 합계');
   for(const j of Object.values(r.jobs))for(const k of ['exp','wins','levelGain','potential','finalPower'])assert.ok(Number.isFinite(j[k]),'직업 유한 값');
   if(r.final){assert.ok(Number.isFinite(r.final.power)&&Number.isFinite(r.final.bossPower));for(const m of r.final.members)assert.ok(Number.isFinite(m.power)&&Number.isFinite(m.gap));assert.ok(Math.abs(sum(r.final.members,m=>m.power)-r.final.power)<1e-6);}}
  for(const idx of key.includes('/fresh/')?[0]:[0,4,9]){const rs=a.rows.filter(r=>r.idx===idx),reached=rs.filter(r=>r.reach),arm=out.arms[key+'/run'+(idx+1)]={...measure(rs),jobs:jobs(rs),bosses:{},fire:{}};
   for(const id of [...new Set(reached.map(r=>r.boss))])arm.bosses[id]=measure(reached.filter(r=>r.boss===id));
   for(const fire of [false,true])arm.fire[fire]=measure(reached.filter(r=>r.final?.fire===fire));
  }
  if(key.includes('/traj/'))out.firstClear[key]=firstClear(a.rows);
 }
 assert.equal(total,15000);out.total=total;
}
for(const n of names.slice(1)){result.paired[n]={};for(const [key,a]of Object.entries(raw[n].arms))for(const idx of key.includes('/fresh/')?[0]:[0,4,9]){
 const base=raw.baseline.arms[key].rows.filter(r=>r.idx===idx),after=a.rows.filter(r=>r.idx===idx),lookup=new Map(base.map(r=>[r.seed,r]));
 const common=after.filter(r=>r.final&&lookup.get(r.seed)?.final&&r.boss===lookup.get(r.seed).boss&&r.final.fire===lookup.get(r.seed).final.fire);
 const memberMean=(r,k)=>mean(r.final.members,m=>m[k]);
 result.paired[n][key+'/run'+(idx+1)]={reach:paired(base,after,'reach'),clear:paired(base,after,'win'),deaths:paired(base,after,'deaths'),
  commonFinal:{n:common.length,powerDelta:mean(common,r=>r.final.power-lookup.get(r.seed).final.power),chanceDelta:mean(common,r=>chance(r.final)-chance(lookup.get(r.seed).final)),
   levelDelta:mean(common,r=>memberMean(r,'level')-memberMean(lookup.get(r.seed),'level')),gapDelta:mean(common,r=>memberMean(r,'gap')-memberMean(lookup.get(r.seed),'gap')),
   hazardPenaltyDelta:mean(common,r=>-2.5*(sum(r.final.members,m=>m.gap)-sum(lookup.get(r.seed).final.members,m=>m.gap)))}};}}
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({runs:names.reduce((a,n)=>a+result.conditions[n].total,0),fresh:Object.fromEntries(names.map(n=>[n,Object.fromEntries(Object.entries(result.conditions[n].arms).filter(([k])=>k.includes('/fresh/')).map(([k,v])=>[k,{reach:v.reach,clear:v.clear,bands:v.bands,deaths:v.deaths,finalLevel:v.finalLevel,finalGap:v.finalGap}]))]))},null,2));
