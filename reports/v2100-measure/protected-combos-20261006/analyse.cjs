// 원자료 JSON만 읽는다. 재생/시뮬 없음.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=process.argv[2];if(!dir)throw Error('원자료 디렉터리 필요');
const names=['baseline','combo','boss5','boss10','mage31','full5'];
const raw=Object.fromEntries(names.map(n=>[n,JSON.parse(fs.readFileSync(path.join(dir,n+'.json'),'utf8'))]));
const sum=(rs,f)=>rs.reduce((a,r)=>a+f(r),0),avg=(rs,f)=>rs.length?sum(rs,f)/rs.length:null,rate=(a,b)=>b?a/b:null;
const chance=f=>f.power<=0?0:Math.max(0,Math.min(1,(1.08-f.bossPower/f.power)/.16));
function finalMetric(rs){return {n:rs.length,clear:avg(rs,r=>r.win),chance:avg(rs,r=>chance(r.final)),power:avg(rs,r=>r.final.power),
 level:rate(sum(rs,r=>sum(r.final.members,m=>m.level)),sum(rs,r=>r.final.members.length)),gap:rate(sum(rs,r=>sum(r.final.members,m=>m.gap)),sum(rs,r=>r.final.members.length))};}
function metric(rs){const reached=rs.filter(r=>r.reach),f=rs.filter(r=>r.final),sorted=rs.map(r=>r.day).sort((a,b)=>a-b);
 return {n:rs.length,reach:avg(rs,r=>r.reach),clear:avg(rs,r=>r.win),clearGivenReach:avg(reached,r=>r.win),endMedian:sorted[sorted.length>>1],deaths:avg(rs,r=>r.deaths),
 bands:[0,1,2,3].map(i=>rate(sum(rs,r=>r.bands[i][0]),sum(rs,r=>r.bands[i][1]))),top:rate(sum(rs,r=>r.core.top[0]),sum(rs,r=>r.core.top[1])),rest:rate(sum(rs,r=>r.core.rest[0]),sum(rs,r=>r.core.rest[1])),
 final:finalMetric(f),supplied:finalMetric(f.filter(r=>r.final.supplied)),fullPack:finalMetric(f.filter(r=>r.final.fullPack)),
 empty:finalMetric(f.filter(r=>r.final.members.every(m=>m.items.length===0))),mixed:finalMetric(f.filter(r=>!r.final.supplied&&!r.final.members.every(m=>m.items.length===0)))};}
function jobs(rs){const out={};for(const id of [...new Set(rs.flatMap(r=>Object.keys(r.jobs)))]){
 const js=rs.map(r=>r.jobs[id]).filter(Boolean),at30=rs.filter(r=>r.reach).map(r=>r.jobs[id]).filter(Boolean),s=k=>sum(js,j=>j[k]),z=k=>sum(at30,j=>j[k]),late=[0,0,0,0,0];for(const j of js)j.bands[3].forEach((x,i)=>late[i]+=x);
 out[id]={name:js[0].name,npcs:s('npcs'),exp:s('exp'),success:rate(s('wins'),s('exp')),combatLoss:rate(s('combatLoss'),s('exp')),env:rate(s('env'),s('exp')),
 firstLevel:rate(s('firstLevel'),s('npcs')),potential:rate(s('potential'),s('npcs')),mastery:rate(s('mastery'),s('npcs')),levelGain:rate(s('levelGain'),s('npcs')),
 late:{n:late[1],success:rate(late[0],late[1]),death:rate(late[4],late[1])},at30:{npcs:z('npcs'),alive:z('alive'),aliveRate:rate(z('alive'),z('npcs')),selected:z('finalPicks')},
 finalRuns:s('finalRuns'),finalPicks:s('finalPicks'),finalPower:rate(s('finalPower'),s('finalPicks')),finalGap:rate(s('finalGap'),s('finalPicks'))};}
 return out;}
function firstClear(rs){const groups=new Map();for(const r of rs){const key=r.seed.replace(/-\d+$/,'');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);}assert.equal(groups.size,200);
 const hist=Array(10).fill(0);let rogue=0,berserker=0;for(const rows of groups.values()){rows.sort((a,b)=>a.idx-b.idx);assert.equal(rows.length,10);assert.ok(rows.every((r,i)=>r.idx===i));const won=rows.find(r=>r.win);if(won)hist[won.idx]++;
 const distinct=new Set(rows.filter(r=>r.win).map(r=>r.boss)).size;rogue+=distinct>=3;berserker+=distinct>=6;}
 let n=0,median=null;for(let i=0;i<10;i++){n+=hist[i];if(median===null&&n>=100)median=i+1;}return {n:200,hist,by5:sum(hist.slice(0,5),x=>x)/200,by10:sum(hist,x=>x)/200,median:median??'>10',rogue,berserker};}
function pair(a,b,key){const m=new Map(a.map(r=>[r.seed,r]));assert.equal(m.size,a.length);const ds=b.map(r=>{assert.ok(m.has(r.seed));return r[key]-m.get(r.seed)[key];}),delta=avg(ds,x=>x),se=Math.sqrt(sum(ds,x=>(x-delta)**2)/(ds.length-1)/ds.length);return {n:ds.length,delta,lo:delta-1.96*se,hi:delta+1.96*se};}
const result={conditions:{},pairs:{},validation:{}};
for(const name of names){const d=raw[name];assert.equal(d.meta.schema,3);assert.equal(d.meta.firstRunLessons,true);assert.equal(Object.keys(d.arms).length,8);
 const out=result.conditions[name]={seconds:d.meta.sec,arms:{},firstClear:{}};let total=0;
 for(const [key,a]of Object.entries(d.arms)){assert.equal(a.rows.length,key.includes('/fresh/')?1000:2000);assert.equal(new Set(a.rows.map(r=>r.seed)).size,a.rows.length);total+=a.rows.length;
 for(const r of a.rows){assert.equal(r.firstRun,r.idx===0,'첫 계정에만 보호');if(r.firstRun)assert.equal(r.d2,0,'보호 첫 이틀 사망 없음');assert.equal(sum(Object.values(r.jobs),j=>j.exp),r.all[1]);assert.equal(sum(Object.values(r.jobs),j=>j.wins),r.all[0]);
 if(r.final){assert.ok(Number.isFinite(r.final.power));assert.ok(Math.abs(sum(r.final.members,m=>m.power)-r.final.power)<1e-6);assert.equal(r.final.supplied,r.final.members.every(m=>m.items.length>0));assert.equal(r.final.fullPack,r.final.members.every(m=>m.items.length===2));}}
 for(const idx of key.includes('/fresh/')?[0]:[0,4,9]){const rows=a.rows.filter(r=>r.idx===idx),v=out.arms[key+'/run'+(idx+1)]={...metric(rows),jobs:jobs(rows),boss:{},fire:{}};
 for(const boss of [...new Set(rows.filter(r=>r.reach).map(r=>r.boss))])v.boss[boss]=metric(rows.filter(r=>r.reach&&r.boss===boss));
 for(const fire of [false,true])v.fire[fire]=metric(rows.filter(r=>r.final?.fire===fire));}
 if(key.includes('/traj/'))out.firstClear[key]=firstClear(a.rows);
 }
 assert.equal(total,14000);out.total=total;
}
for(const [before,after]of [['baseline','combo'],['combo','boss5'],['combo','boss10'],['combo','mage31'],['boss5','full5'],['mage31','full5']]){
 const out=result.pairs[before+'→'+after]={};for(const [key,a]of Object.entries(raw[after].arms))for(const idx of key.includes('/fresh/')?[0]:[0,4,9]){
 const b=raw[before].arms[key].rows.filter(r=>r.idx===idx),z=a.rows.filter(r=>r.idx===idx);out[key+'/run'+(idx+1)]={reach:pair(b,z,'reach'),clear:pair(b,z,'win')};}
}
for(const [a,b]of [['combo','boss5'],['combo','boss10'],['mage31','full5']])for(const p of ['reader','expert']){
 const key='after/fresh/'+p+'/none',map=new Map(raw[a].arms[key].rows.map(r=>[r.seed,r]));assert.ok(raw[b].arms[key].rows.every(r=>r.reach===map.get(r.seed).reach),'마왕만 바꾸면 프레시 도달은 유지');}
result.validation={runs:84000,firstRunProtection:true,jobCounts:true,finalPower:true,providedItems:true,bossOnlyFreshReach:true};
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(result,null,2));
for(const [name,c]of Object.entries(result.conditions))for(const [key,v]of Object.entries(c.arms))if(key.includes('/fresh/'))console.log(JSON.stringify({name,key,reach:v.reach,clear:v.clear,conditional:v.clearGivenReach,supplied:v.supplied,fullPack:v.fullPack}));
