// 15판 안 첫 D30 · 첫 클리어가 몇 판째인지 (궤적별, 못 한 궤적은 '없음'으로 셈)
const j=require(require('path').resolve(process.argv[2]||'small-off.json'));const med=a=>{a=[...a].sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
for(const k of ['none','economy','survival','operation']){const R=j.arms['after/traj/investor/'+k].rows;const tr={};for(const r of R)(tr[r.seed.split('-').slice(0,4).join('-')]??=[]).push(r);
 const T=Object.values(tr),N=T.length;const at=f=>T.map(t=>{const x=t.filter(f).map(r=>r.idx+1);return x.length?Math.min(...x):null;});
 const s=(a,lab)=>{const got=a.filter(v=>v!=null);return `${lab} ${(100*got.length/N).toFixed(0)}% · 중앙 ${med(got)}판째 · 평균 ${(got.reduce((p,v)=>p+v,0)/got.length).toFixed(1)}판째`;};
 console.log(k.padEnd(10),s(at(r=>r.day>=30),'첫D30'),'|',s(at(r=>r.win),'첫클리어'));}
