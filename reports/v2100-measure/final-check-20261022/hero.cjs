const fs=require('fs');const NAME={fresh24:'24시간 신선체계',logisticsHQ:'물류 본부계약',firstAidDesk:'응급 처치대',opsRoom:'원정 작전실',lifetime:'평생 단골제',royalCert:'왕도 프리미엄 인증',hub:'지역 거점점 계약'};
const st=a=>{const m=a.length,days=a.reduce((p,x)=>p+x.days,0);return {day:a.reduce((p,x)=>p+x.day,0)/m,d20:100*a.filter(x=>x.day>=20).length/m,d30:100*a.filter(x=>x.day>=30).length/m,win:100*a.filter(x=>x.win).length/m,rev:a.reduce((p,x)=>p+x.rev,0)/days};};
const f=(v,d=1)=>(v>=0?'+':'')+v.toFixed(d);const out={};
for(const m of ['off','on']){const L=c=>JSON.parse(fs.readFileSync(`hero-${m}/${c}.json`));const base=L('none');const idx=base.map((x,i)=>x.day>=5?i:-1).filter(i=>i>=0);const B=st(idx.map(i=>base[i]));
 for(const id in NAME){const A=st(idx.map(i=>L('relicAt_'+id+'@5')[i]));(out[id]??={})[m]=[A.day-B.day,A.d20-B.d20,A.d30-B.d30,A.win-B.win,A.rev-B.rev];}}
const rows=Object.entries(out).sort((x,y)=>(y[1].off[1]+y[1].on[1])-(x[1].off[1]+x[1].on[1]));
for(const [id,v] of rows)console.log(NAME[id].padEnd(12),'끔',v.off.map((x,i)=>f(x,i==4?0:1)).join(' · '),'| 켬',v.on.map((x,i)=>f(x,i==4?0:1)).join(' · '));
