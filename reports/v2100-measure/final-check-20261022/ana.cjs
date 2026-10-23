const fs=require('fs');const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
for(const m of ['off','on']){const j=JSON.parse(fs.readFileSync(require('path').resolve(process.argv[2]||'.','small-'+m+'.json')));console.log('=== '+m);
 const F=j.arms['after/fresh/investor/none'].rows,n=F.length,p=f=>(100*F.filter(f).length/n).toFixed(1);
 console.log(`새판 n${n} D10 ${p(r=>r.day>=10)} D20 ${p(r=>r.day>=20)} D30 ${p(r=>r.day>=30)} 클리어 ${p(r=>r.win)} 중앙 ${med(F.map(r=>r.day))} 사망 ${(F.reduce((a,r)=>a+r.deaths,0)/n).toFixed(2)} D15잔액 ${med(F.map(r=>r.bal[2]))} D25 ${med(F.map(r=>r.bal[4]))}`);
 for(const k of ['none','economy','survival','operation']){const R=j.arms['after/traj/investor/'+k].rows;const tr={};for(const r of R)(tr[r.seed.split('-').slice(0,4).join('-')]??=[]).push(r);
  const T=Object.values(tr),N=T.length,first=(f,lim=99)=>(100*T.filter(t=>t.some(r=>r.idx<lim&&f(r))).length/N).toFixed(0);
  const fin=R.filter(r=>r.final),reach=R.filter(r=>r.day>=30);
  const byIdx=i=>{const x=R.filter(r=>r.idx===i);return `${i+1}판째 D20 ${(100*x.filter(r=>r.day>=20).length/x.length).toFixed(0)} D30 ${(100*x.filter(r=>r.day>=30).length/x.length).toFixed(0)}`;};
  const last=R.filter(r=>r.idx===14);
  console.log(`${k.padEnd(10)} 15판안 첫D20 ${first(r=>r.day>=20)} 첫D30 ${first(r=>r.day>=30)} 첫클리어 ${first(r=>r.win)} (4판안 D20 ${first(r=>r.day>=20,4)}) | 도달시클리어 ${(100*R.filter(r=>r.win).length/reach.length).toFixed(0)}% (${reach.length}) 파티등급 ${(fin.reduce((p,r)=>p+r.final.members.reduce((a,m)=>a+m.rarity,0)/r.final.members.length,0)/fin.length).toFixed(2)} 전력/마왕 ${(fin.reduce((p,r)=>p+r.final.power/r.final.bossPower,0)/fin.length).toFixed(2)} | 사망 ${(R.reduce((a,r)=>a+r.deaths,0)/R.length).toFixed(2)} D15 ${med(R.map(r=>r.bal[2]))} D25 ${med(R.map(r=>r.bal[4]))} | ${byIdx(0)} · ${byIdx(3)} · ${byIdx(9)} · ${byIdx(14)} | 15판째 장식 ${(last.reduce((a,r)=>a+r.deco,0)/last.length).toFixed(1)}`);}}
