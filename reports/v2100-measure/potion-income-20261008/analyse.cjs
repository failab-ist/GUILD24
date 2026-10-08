// 완료된 포션 수입 비교 JSON만 읽는다. 재생·시뮬 없음.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=process.argv[2],baseDir=process.argv[3];
const data={income0:JSON.parse(fs.readFileSync(path.join(baseDir,'potion1.json'),'utf8')),income10:JSON.parse(fs.readFileSync(path.join(dir,'income10.json'),'utf8'))};
const sum=(a,f)=>a.reduce((v,x)=>v+f(x),0),avg=(a,f)=>a.length?sum(a,f)/a.length:null;
const chance=f=>f.power>0?Math.max(0,Math.min(1,(1.08-f.bossPower/f.power)/.16)):0;
const finalMetric=rows=>({n:rows.length,clear:avg(rows,r=>r.win),chance:avg(rows,r=>chance(r.final)),power:avg(rows,r=>r.final.power)});
function metric(rows){const reach=rows.filter(r=>r.reach),supplied=rows.filter(r=>r.final?.supplied),owned=rows.filter(r=>r.relics.some(([id])=>id==='coldcase'));
return {n:rows.length,reach:avg(rows,r=>r.reach),clear:avg(rows,r=>r.win),deaths:avg(rows,r=>r.deaths),cash:avg(rows,r=>r.cash),capital:avg(rows,r=>r.gain),supplied:finalMetric(supplied),
saveLevelParty:finalMetric(supplied.filter(r=>r.final.members.length===3&&Math.min(...r.final.members.map(m=>m.level))>=15&&avg(r.final.members,m=>m.level)>=17)),
contract:{n:owned.length,rate:owned.length/rows.length,day:avg(owned,r=>r.relics.find(([id])=>id==='coldcase')[1]),reach:avg(owned,r=>r.reach),clear:avg(owned,r=>r.win),cash:avg(owned,r=>r.cash),supplied:finalMetric(owned.filter(r=>r.final?.supplied))}};}
const result={conditions:{},pairs:{},validation:{}};
for(const [name,d]of Object.entries(data)){assert.equal(d.meta.schema,4);assert.equal(d.meta.firstRunLessons,true);assert.equal(d.meta.finalGapWeight,2);assert.equal(d.meta.workers,4);assert.equal(Object.keys(d.arms).length,8);let total=0;
const c=result.conditions[name]={seconds:d.meta.sec,arms:{}};for(const [key,a] of Object.entries(d.arms)){assert.equal(a.rows.length,key.includes('/fresh/')?1000:2000);assert.equal(new Set(a.rows.map(r=>r.seed)).size,a.rows.length);total+=a.rows.length;
for(const r of a.rows){assert.equal(r.firstRun,r.idx===0);if(r.firstRun)assert.equal(r.d2,0);assert.equal(sum(Object.values(r.jobs),j=>j.exp),r.all[1]);assert.equal(sum(Object.values(r.jobs),j=>j.wins),r.all[0]);
if(r.final){assert.ok(Math.abs(sum(r.final.members,m=>m.power)-r.final.power)<1e-6);assert.equal(r.final.supplied,r.final.members.every(m=>m.items.length));}}
for(const idx of key.includes('/fresh/')?[0]:[0,4,9])c.arms[key+'/run'+(idx+1)]=metric(a.rows.filter(r=>r.idx===idx));}assert.equal(total,14000);result.validation[name]={rows:total,arms:8};}
for(const [key,a]of Object.entries(data.income0.arms)){const map=new Map(a.rows.map(r=>[r.seed,r]));const b=data.income10.arms[key].rows;assert.ok(b.every(r=>map.has(r.seed)));result.pairs[key]={};
for(const idx of key.includes('/fresh/')?[0]:[0,4,9]){const rows=b.filter(r=>r.idx===idx),out=result.pairs[key][idx+1]={};for(const k of ['reach','win','deaths','cash']){const ds=rows.map(r=>r[k]-map.get(r.seed)[k]),delta=avg(ds,x=>x),se=Math.sqrt(sum(ds,x=>(x-delta)**2)/(ds.length-1)/ds.length);out[k]={delta,lo:delta-1.96*se,hi:delta+1.96*se};}}}
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(result,null,2));console.log('PASS: 수입0/10% 두 조건 각14000행·정책8분할·보호·직업/최종 합계·동일 시드');
for(const p of ['reader','expert'])for(const n of ['income0','income10'])console.log(n+' '+p+' '+JSON.stringify(result.conditions[n].arms['after/fresh/'+p+'/none/run1']));
