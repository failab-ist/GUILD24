const fs=require('fs'),p=(a,b)=>b?(100*a/b).toFixed(1):'-';
console.log('조건 루트 | 10런째 도달·클리어 | 첫클리어 10런안 · 중앙 | 갱신/궤적 | 무갱신 최장 중앙·75% | 아까운판 1런·5런·10런 | 사망/런 | 장식 10런째');
for(const c of process.argv.slice(2)){const f='t-'+c+'.json';if(!fs.existsSync(f))continue;const j=require('./'+f);
 for(const [k,a] of Object.entries(j.arms)){const g={};for(const r of a.rows){const id=r.seed.replace(/-\d+$/,'');(g[id]=g[id]||[])[r.idx]=r;}
  const T=Object.values(g).filter(t=>t.length===10&&t.every(Boolean));const R=10;
  const fc=T.map(t=>{const i=t.findIndex(r=>r.win);return i<0?99:i+1;}).sort((x,y)=>x-y);
  let rec=0;const dry=[],near=Array(R).fill(0);
  for(const t of T){let best=0,since=0,mx=0;for(let i=0;i<R;i++){const r=t[i];if(!r.win&&r.day>=25)near[i]++;if(i>0&&t[i-1].win)break;const sc=r.win?31:r.day;if(sc>best){if(i>0)rec++;best=sc;since=0}else{since++;mx=Math.max(mx,since)}}dry.push(mx);}
  dry.sort((x,y)=>x-y);const l=T.map(t=>t[9]);
  const q=(a,x)=>a[Math.floor(a.length*x)];
  console.log([c+' '+k.split('/').pop(),p(l.filter(r=>r.reach).length,T.length)+'·'+p(l.filter(r=>r.win).length,T.length),p(fc.filter(x=>x<=10).length,T.length)+' · '+(q(fc,.5)>10?'10+':q(fc,.5)),(rec/T.length).toFixed(2),q(dry,.5)+'·'+q(dry,.75),[0,4,9].map(i=>p(near[i],T.length)).join('·'),(l.reduce((v,r)=>v+r.deaths,0)/T.length).toFixed(2),(l.reduce((v,r)=>v+r.deco,0)/T.length).toFixed(1)].join(' | '));}}
