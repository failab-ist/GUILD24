// usage: node ana2.cjs deco <dir> | node ana2.cjs relic <dir> <day>
const fs=require('fs'),path=require('path');const [mode,dir,dd]=process.argv.slice(2);const root='/home/user/GUILD24';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy'])require(path.join(root,'dist',f+'.js'));const D=(globalThis.GUILD24||globalThis).DATA;
const load=c=>JSON.parse(fs.readFileSync(path.join(dir,c.replace(':','_')+'.json')));
const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
const st=a=>{const m=a.length,days=a.reduce((p,x)=>p+x.days,0);return {n:m,day:a.reduce((p,x)=>p+x.day,0)/m,d10:100*a.filter(x=>x.day<=10).length/m,d20:100*a.filter(x=>x.day>=20).length/m,d30:100*a.filter(x=>x.day>=30).length/m,win:100*a.filter(x=>x.win).length/m,dth:a.reduce((p,x)=>p+x.deaths,0)/m,rev:a.reduce((p,x)=>p+x.rev,0)/days,b15:med(a.map(x=>x.b15)),b25:med(a.map(x=>x.b25)),rare:a.reduce((p,x)=>p+x.rare,0)/m,cr:(a.filter(x=>x.day>=30).length?100*a.filter(x=>x.win).length/a.filter(x=>x.day>=30).length:0)};};
const f=(v,d=1)=>(v>=0?'+':'')+v.toFixed(d);
const line=(name,price,a,b)=>{const A=st(a),B=st(b);return [name.padEnd(12),String(price).padStart(5),'| 평균끝날 '+f(A.day-B.day),'D20 '+f(A.d20-B.d20),'D30 '+f(A.d30-B.d30),'클리어 '+f(A.win-B.win),'사망 '+f(A.dth-B.dth,2),'매출/일 '+f(A.rev-B.rev,0),'D15잔액 '+f(A.b15-B.b15,0),'D25 '+f(A.b25-B.b25,0),'희귀+손님 '+f(A.rare-B.rare,2),'도달시클리어 '+A.cr.toFixed(0)+'/'+B.cr.toFixed(0),'| 1000G당 D20 '+f((A.d20-B.d20)*1000/price),'D30 '+f((A.d30-B.d30)*1000/price)].join(' ');};
const base=load('none');
if(mode==='deco'){const B=st(base);console.log('기준 n',B.n,'평균끝날',B.day.toFixed(1),'D20',B.d20.toFixed(1),'D30',B.d30.toFixed(1),'클리어',B.win.toFixed(1),'사망',B.dth.toFixed(2),'매출/일',B.rev.toFixed(0),'D15',B.b15,'D25',B.b25);
 for(const d of [...D.decorations].sort((x,y)=>x.kind.localeCompare(y.kind)||y.price-x.price))console.log(d.kind.padEnd(10),line(d.name,d.price,load('deco:'+d.id),base));}
else{const N=+dd,alive=base.map((x,i)=>x.day>=N?i:-1).filter(i=>i>=0),bA=alive.map(i=>base[i]),B=st(bA);
 console.log('D'+N+'에 얹음, D'+N+' 간 판만 n',B.n,'기준 D20',B.d20.toFixed(1),'D30',B.d30.toFixed(1),'클리어',B.win.toFixed(1));
 for(const r of D.relics){const p=path.join(dir,'relicAt_'+r.id+'@'+N+'.json');if(!fs.existsSync(p))continue;const a=JSON.parse(fs.readFileSync(p));console.log(line(r.name,r.price,alive.map(i=>a[i]),bA));}}
