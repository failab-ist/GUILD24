// 기존 원자료만 읽어 후반 원정/종료 생존을 집계한다. 재생·시뮬 없음.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=process.argv[2];if(!root)throw Error('기존 원자료 디렉터리 필요');
const out={};
for(const condition of ['baseline','growth']){
 const raw=JSON.parse(fs.readFileSync(path.join(root,condition+'.json'),'utf8'));out[condition]={};
 for(const policy of ['reader','expert']){
  const rows=raw.arms['after/fresh/'+policy+'/none'].rows,reached=rows.filter(r=>r.reach),jobs={};
  for(const id of ['warrior','archer','mage','priest']){
   const js=rows.map(r=>r.jobs[id]).filter(Boolean),end=reached.map(r=>r.jobs[id]).filter(Boolean);
   const sum=(a,k)=>a.reduce((v,j)=>v+j[k],0),late=[0,0,0,0,0];for(const j of js)j.bands[3].forEach((v,i)=>late[i]+=v);
   const exposed=sum(end,'npcs'),alive=sum(end,'alive'),picks=sum(end,'finalPicks');
   assert.ok(alive<=exposed&&picks<=alive,'생존/선발 분모 일치');
   jobs[id]={name:js[0].name,late:{wins:late[0],exp:late[1],combatLoss:late[2],env:late[3],deaths:late[4],success:late[0]/late[1],deathRate:late[4]/late[1]},
    d30:{runs:reached.length,exposedNPCs:exposed,alive,aliveRate:alive/exposed,finalPicks:picks,selectionAmongAlive:picks/alive}};
  }
  out[condition][policy]=jobs;
 }
}
fs.writeFileSync(path.join(__dirname,'job-late-survival.json'),JSON.stringify(out,null,2));
console.log('PASS 기존 데이터: reader/expert 후반 원정·D30 런 종료 생존·선발 분모 집계');
