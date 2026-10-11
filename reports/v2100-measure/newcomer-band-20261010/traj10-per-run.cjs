const res=JSON.parse(require('fs').readFileSync(process.argv[2]));const R=res.meta.R,p=(a,b)=>b?(100*a/b).toFixed(1):'-';
for(const [key,a] of Object.entries(res.arms)){if(!key.includes('/traj/'))continue;const rs=a.rows,T=rs.length/R;
 console.log('\n'+key+' 궤적 '+T);
 console.log('런 | D10 D15 D20 D25 D30 | 클리어 | 사망/런 | 장식 | 상위4 성공');
 for(let i=0;i<R;i++){const x=rs.filter(r=>r.idx===i),n=x.length,ge=d=>p(x.filter(r=>r.day>=d).length,n);
  const tw=x.reduce((v,r)=>v+(r.core?.top[0]||0),0),te=x.reduce((v,r)=>v+(r.core?.top[1]||0),0);
  console.log(String(i+1).padStart(2)+' | '+[10,15,20,25,30].map(ge).join(' ')+' | '+p(x.filter(r=>r.win).length,n)+' | '+(x.reduce((v,r)=>v+r.deaths,0)/n).toFixed(2)+' | '+(x.reduce((v,r)=>v+r.deco,0)/n).toFixed(1)+' | '+p(tw,te));}
 const first=[];for(let t=0;t<T;t++){const g=rs.slice(t*R,(t+1)*R);if(g.some((r,j)=>r.idx!==j))throw Error('order');const f=g.findIndex(r=>r.win);first.push(f<0?null:f+1);}
 const got=first.filter(f=>f),cum=[];for(let i=1;i<=R;i++)cum.push(p(got.filter(f=>f<=i).length,T));
 got.sort((a,b)=>a-b);console.log('첫 클리어: 10런 안에 '+p(got.length,T)+'% · 중앙 런 '+(got[got.length>>1]??'-')+' · 누적 '+cum.join(' / '));
 const wins=[];for(let t=0;t<T;t++)wins.push(rs.slice(t*R,(t+1)*R).filter(r=>r.win).length);
 console.log('궤적당 클리어 횟수 분포 '+JSON.stringify([0,1,2,3,4,5].map(c=>wins.filter(w=>c===5?w>=5:w===c).length)));}
