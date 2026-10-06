// 완료 JSON만 읽는 분석. 재생·시뮬 없음.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=process.argv[2],old=process.argv[3];
const sum=(a,f)=>a.reduce((s,x)=>s+f(x),0),avg=(a,f)=>a.length?sum(a,f)/a.length:null;
const chance=f=>f.power>0?Math.max(0,Math.min(1,(1.08-f.bossPower/f.power)/.16)):0;
const q=(xs,p)=>{if(!xs.length)return null;const a=[...xs].sort((x,y)=>x-y),i=(a.length-1)*p;return a[Math.floor(i)]+(a[Math.ceil(i)]-a[Math.floor(i)])*(i%1);};
function finals(rows){return {n:rows.length,clear:avg(rows,r=>r.win),chance:avg(rows,r=>chance(r.final)),power:avg(rows,r=>r.final.power),bossPower:avg(rows,r=>r.final.bossPower),
 level:avg(rows,r=>avg(r.final.members,m=>m.level)),gap:avg(rows,r=>avg(r.final.members,m=>m.gap)),
 memberLevelQuartiles:[.25,.5,.75].map(p=>q(rows.flatMap(r=>r.final.members.map(m=>m.level)),p))};}
function metric(rows){const reached=rows.filter(r=>r.reach),f=rows.filter(r=>r.final),s=f.filter(r=>r.final.supplied),similar=s.filter(r=>r.final.members.length===3&&Math.min(...r.final.members.map(m=>m.level))>=15&&avg(r.final.members,m=>m.level)>=17);
const out={n:rows.length,reach:avg(rows,r=>r.reach),clear:avg(rows,r=>r.win),givenReach:avg(reached,r=>r.win),deaths:avg(rows,r=>r.deaths),
 bands:[0,1,2,3].map(i=>sum(rows,r=>r.bands[i][0])/sum(rows,r=>r.bands[i][1])),zombie:avg(rows,r=>+r.zombie),d10:avg(rows,r=>r.d10),
 final:finals(f),supplied:finals(s),fullPack:finals(f.filter(r=>r.final.fullPack)),saveLevelParty:finals(similar),
 fire:Object.fromEntries([false,true].map(b=>[b,finals(s.filter(r=>r.final.fire===b))])),boss:{}};
for(const boss of [...new Set(s.map(r=>r.boss))])out.boss[boss]=finals(s.filter(r=>r.boss===boss));
if(rows[0]?.boost)out.boost={eventsPerRun:avg(rows,r=>r.boost.n),extraXpPerRun:avg(rows,r=>r.boost.xp)};
if(f[0]?.final.top3){out.top3={n:f.length,levels:[0,1,2].map(i=>avg(f.filter(r=>r.final.top3.length===3),r=>r.final.top3[i].level)),stats:{}};
for(const job of ['warrior','archer','mage','priest','rogue','berserker']){const ms=f.flatMap(r=>r.final.top3.filter(m=>m.job===job));out.top3.stats[job]={n:ms.length,level:avg(ms,m=>m.level),stats:Object.fromEntries(['combat','survival','mobility','spirit'].map(k=>[k,avg(ms,m=>m.stats[k])]))};}}
const jobs={};for(const job of [...new Set(rows.flatMap(r=>Object.keys(r.jobs)))]){const js=rows.map(r=>r.jobs[job]).filter(Boolean),s=k=>sum(js,j=>j[k]);jobs[job]={npcs:s('npcs'),success:s('wins')/s('exp'),lateDeaths:sum(js,j=>j.bands[3][4]),lateExps:sum(js,j=>j.bands[3][1]),finalPicks:s('finalPicks'),finalPower:s('finalPower')/s('finalPicks')};}out.jobs=jobs;return out;}
const data={full5:JSON.parse(fs.readFileSync(path.join(old,'full5.json'),'utf8'))};for(const name of ['env25','env20'])data[name]=JSON.parse(fs.readFileSync(path.join(dir,name+'.json'),'utf8'));
const result={scope:'완료 데이터 분석. saveLevelParty는 참고 집단: 템 지급 3명, 모두Lv15이상·평균Lv17이상. 실제 세이브 재현이나 인과 효과가 아님.',conditions:{},paired:{},validation:{}};
for(const [name,d]of Object.entries(data)){
assert.equal(d.meta.firstRunLessons,true);assert.equal(Object.keys(d.arms).length,8);let total=0;
const c=result.conditions[name]={seconds:d.meta.sec,arms:{}};
for(const [key,a] of Object.entries(d.arms)){assert.equal(a.rows.length,key.includes('/fresh/')?1000:2000);total+=a.rows.length;assert.equal(new Set(a.rows.map(r=>r.seed)).size,a.rows.length);
for(const r of a.rows){assert.equal(r.firstRun,r.idx===0);if(r.firstRun)assert.equal(r.d2,0);assert.equal(sum(Object.values(r.jobs),j=>j.exp),r.all[1]);assert.equal(sum(Object.values(r.jobs),j=>j.wins),r.all[0]);
if(r.final){assert.ok(Math.abs(sum(r.final.members,m=>m.power)-r.final.power)<1e-6);assert.equal(r.final.supplied,r.final.members.every(m=>m.items.length>0));assert.equal(r.final.fullPack,r.final.members.every(m=>m.items.length===2));
if(name!=='full5'){assert.ok(r.final.top3.every((m,i,ms)=>!i||ms[i-1].level>=m.level));for(const m of r.final.members)for(const k of ['combat','survival','mobility','spirit'])assert.ok(Number.isFinite(m.preparedStats[k]));}}
}
for(const idx of key.includes('/fresh/')?[0]:[0,4,9])c.arms[key+'/run'+(idx+1)]=metric(a.rows.filter(r=>r.idx===idx));}
assert.equal(total,14000);result.validation[name]={rows:total,arms:8};}
for(const p of ['reader','expert']){const key='after/fresh/'+p+'/none',a=data.env25.arms[key].rows,b=data.env20.arms[key].rows,m=new Map(a.map(r=>[r.seed,r]));
assert.ok(b.every(r=>m.get(r.seed).reach===r.reach),'환경 후보만 바꾸면 프레시 도달 불변');const ds=b.map(r=>r.win-m.get(r.seed).win),delta=avg(ds,x=>x),se=Math.sqrt(sum(ds,x=>(x-delta)**2)/(ds.length-1)/ds.length);
result.paired[p]={n:ds.length,clearDelta:delta,lo:delta-1.96*se,hi:delta+1.96*se};}
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(result,null,2));
console.log('PASS: 세 조건 각14000행·보호·직업·최종 합계·보급·준비스탯·프레시 도달 일치');
for(const p of ['reader','expert'])for(const name of ['full5','env25','env20'])console.log(name+' '+p+' '+JSON.stringify(result.conditions[name].arms['after/fresh/'+p+'/none/run1']));
