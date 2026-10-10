const fs=require('fs'),p=(a,b)=>b?(100*a/b).toFixed(1):'-',S=(a,f)=>a.reduce((v,x)=>v+(f(x)||0),0);
const C=process.argv.slice(2);
for(const pol of ['investor','reader']){console.log('\n## '+pol);
 console.log('조건 | 초 D1-7 · 중 D8-20 · 후 D21-29 | D10 도달 | D30 | 클리어 | 도달시 | 사망/런 | 파산 | 현금/일 | 상위4 성공·나머지 | 상품바꿈 | 상위4몫 | 운배수(운판 n)');
 const pots={};
 for(const c of C){if(!fs.existsSync('f-'+c+'.json'))continue;const rs=require('./f-'+c+'.json').arms['after/fresh/'+pol+'/none'].rows,n=rs.length;
  const b=k=>p(S(rs,r=>r.b3[k][0]),S(rs,r=>r.b3[k][1])),win=S(rs,r=>r.win),reach=S(rs,r=>r.reach);
  const L=rs.filter(r=>r.core.top[1]>=30&&r.core.top[0]/r.core.top[1]>=.8),N=rs.filter(r=>!L.includes(r)),cr=a=>S(a,r=>r.win)/a.length;
  const g=k=>p(S(rs,r=>r.core[k][0]),S(rs,r=>r.core[k][1]));
  const eq=S(rs,r=>r.prep.eq[0]);
  console.log([c,b(0)+' · '+b(1)+' · '+b(2),p(rs.filter(r=>r.day>=10).length,n),p(reach,n),p(win,n),p(win,reach),(S(rs,r=>r.deaths)/n).toFixed(2),p(rs.filter(r=>/자금/.test(r.end)).length,n),(S(rs,r=>r.cash)/n).toFixed(0),g('top')+'·'+g('rest'),p(S(rs,r=>r.prep.changed),eq),p(S(rs,r=>r.prep.topItems),S(rs,r=>r.prep.items)),(cr(L)/cr(N)).toFixed(1)+'('+L.length+')'].join(' | '));
  const t={};for(const r of rs)for(const [k,v] of Object.entries(r.pot||{})){const x=t[k]??=[0,0,0];v.forEach((y,i)=>x[i]+=y);}pots[c]=t;}
 console.log('\n환경 모자란 원정(맨손 기준): 구간별 [포션만 P / 대응템 C / 둘다 PC / 둘다없음 -] 비율 · 성공 · 사망');
 for(const [c,t] of Object.entries(pots))for(const b of [0,1,2]){const tot=['P','C','PC','-'].reduce((v,k)=>v+(t[b+k]?.[0]||0),0);
  console.log(c,['초','중','후'][b],'n='+tot,['P','C','PC','-'].map(k=>{const x=t[b+k]||[0,0,0];return k+' '+p(x[0],tot)+'% (성공 '+p(x[1],x[0])+' 사망 '+p(x[2],x[0])+')';}).join(' | '));}
}
