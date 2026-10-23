// 후보 측정 요약: 같은 (계정, 시드) 짝, 흔들림 = 짝 차이 표준오차 x2. 점지는 D5 간 판만.
const fs=require('fs'),path=require('path');const dir=process.argv[2]||'a8r';
const L=c=>JSON.parse(fs.readFileSync(path.join(dir,c.replace(/[:@#=.~+]/g,'_')+'.json')));const B=L('none');
const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN;};
for(const c of process.argv.slice(3)){const R=L(c);const k=R.map((x,i)=>[B[i],x]).filter(([b,x])=>b.day>=5&&x.day>=5),n=k.length;
 const f=g=>{const d=k.map(([b,x])=>(g(x)?1:0)-(g(b)?1:0)),m=d.reduce((a,v)=>a+v,0)/n,v=d.reduce((a,y)=>a+(y-m)**2,0)/(n-1);return (m>=0?'+':'')+(100*m).toFixed(1)+'±'+(200*Math.sqrt(v/n)).toFixed(1);};
 const b15=k.filter(([b,x])=>b.b15!=null&&x.b15!=null).map(([b,x])=>x.b15-b.b15),bm=b15.reduce((a,v)=>a+v,0)/b15.length,bs=Math.sqrt(b15.reduce((a,v)=>a+(v-bm)**2,0)/(b15.length-1)/b15.length)*2;
 const rev=k.reduce((a,[b,x])=>a+x.rev/Math.max(1,x.days)-b.rev/Math.max(1,b.days),0)/n;
 console.log(c.padEnd(58),'D20',f(x=>x.day>=20),'D30',f(x=>x.day>=30),'클리어',f(x=>x.win),'| D15잔액(둘 다 간 판)',(bm>=0?'+':'')+bm.toFixed(0)+'±'+bs.toFixed(0),'매출/일',(rev>=0?'+':'')+rev.toFixed(0));}
