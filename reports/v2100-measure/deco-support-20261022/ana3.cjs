// trajectory leave-one-out summary: node ana3.cjs s3-off.json
const j=require(require('path').resolve(process.argv[2]));const P={guildShelf:500,aidCabinet:500,rerollCoupon:500,thriftSafe:750,memorialBook:750,voucher:750,honorFrame:1000,infirmaryPlaque:1000,heroSign:1000,sponsorSign:1500,trainingSign:1500,cheerBanner:1500};
const NAME={guildShelf:'추천 매대',thriftSafe:'알뜰 금고',honorFrame:'명예 액자',sponsorSign:'지원금 간판',aidCabinet:'구급품 진열장',memorialBook:'추모 방명록',infirmaryPlaque:'의무실 현판',trainingSign:'훈련소 간판',rerollCoupon:'교환 쿠폰함',voucher:'휴식 바우처',heroSign:'우수 점포 훈장',cheerBanner:'감사 현수막'};
const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
function st(rows){const tr={};for(const r of rows){const k=r.seed.split('-').slice(0,4).join('-');(tr[k]??=[]).push(r);}
 const T=Object.values(tr);const n=T.length;const first=f=>100*T.filter(t=>t.some(f)).length/n;
 const reach=rows.filter(r=>r.day>=30),fin=rows.filter(r=>r.final);
 const days=rows.reduce((p,r)=>p+r.day,0);
 return {n,d30:first(r=>r.day>=30),clr:first(r=>r.win),cr:reach.length?100*rows.filter(r=>r.win).length/reach.length:0,dth:rows.reduce((p,r)=>p+r.deaths,0)/rows.length,
  sale:rows.reduce((p,r)=>p+r.sales,0)/days,b25:med(rows.map(r=>r.bal[4])),grade:fin.length?fin.reduce((p,r)=>p+r.final.members.reduce((a,m)=>a+m.rarity,0)/r.final.members.length,0)/fin.length:NaN,
  pw:fin.length?fin.reduce((p,r)=>p+r.final.power/r.final.bossPower,0)/fin.length:NaN,mr:rows.filter(r=>r.idx===9).reduce((p,r)=>p+r.mr,0)/n,dc:rows.filter(r=>r.idx===9).reduce((p,r)=>p+r.deco,0)/n,reachN:reach.length};}
const A=j.arms,g=k=>st(A['after/traj/investor/'+k].rows);
const f=(v,d=0)=>(v>=0?'+':'')+v.toFixed(d);
const row=(lab,s)=>`${lab.padEnd(14)} 첫D30 ${s.d30.toFixed(0)}% 첫클리어 ${s.clr.toFixed(0)}% | D30판 ${s.reachN} 도달시클리어 ${s.cr.toFixed(0)}% 파티등급 ${s.grade.toFixed(2)} 전력/마왕 ${s.pw.toFixed(2)} | 사망 ${s.dth.toFixed(2)} 매출/일 ${s.sale.toFixed(0)} D25잔액 ${s.b25} | 10판째 숙련 ${s.mr.toFixed(1)}단 장식 ${s.dc.toFixed(1)}개`;
console.log(row('없음(숙련만)',g('none')));
for(const r of ['economy','survival','operation']){const F=g(r);console.log('\n'+row(r+' 전체',F));
 for(const x of Object.keys(P).filter(x=>A['after/traj/investor/'+r+'-'+x])){const L=g(r+'-'+x);
  console.log(`  ${NAME[x]} ${P[x]} 빼면 몫: 첫D30 ${f(F.d30-L.d30)} 첫클리어 ${f(F.clr-L.clr)} 도달시클리어 ${f(F.cr-L.cr)} 파티등급 ${f(F.grade-L.grade,2)} 사망 ${f(F.dth-L.dth,2)} 매출/일 ${f(F.sale-L.sale)} D25잔액 ${f(F.b25-L.b25)} | 1000G당 첫클리어 ${f((F.clr-L.clr)*1000/P[x],1)}`);}}
