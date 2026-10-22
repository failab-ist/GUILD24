const fs=require('fs'),path=require('path');const dir=process.argv[2];const root='/home/user/GUILD24';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy'])require(path.join(root,'dist',f+'.js'));const D=(globalThis.GUILD24||globalThis).DATA;
const load=c=>JSON.parse(fs.readFileSync(path.join(dir,c.replace(':','_')+'.json')));
const base=load('none');const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
function st(a){const m=a.length,days=a.reduce((p,x)=>p+x.days,0);return {n:m,day:a.reduce((p,x)=>p+x.day,0)/m,d20:100*a.filter(x=>x.day>=20).length/m,d30:100*a.filter(x=>x.day>=30).length/m,win:100*a.filter(x=>x.win).length/m,dth:a.reduce((p,x)=>p+x.deaths,0)/m,rev:a.reduce((p,x)=>p+x.rev,0)/days,b15:med(a.map(x=>x.b15)),b25:med(a.map(x=>x.b25))};}
const f=(v,d=1)=>(v>=0?'+':'')+v.toFixed(d);
const line=(name,price,a,b)=>{const A=st(a),B=st(b);return [name.padEnd(12),String(price).padStart(5),'| 평균끝날 '+f(A.day-B.day),'D20 '+f(A.d20-B.d20),'D30 '+f(A.d30-B.d30),'클리어 '+f(A.win-B.win),'사망 '+f(A.dth-B.dth,2),'매출/일 '+f(A.rev-B.rev,0),'D15잔액 '+f(A.b15-B.b15,0),'D25 '+f(A.b25-B.b25,0)].join(' ');};
const B=st(base);console.log('기준 none n',B.n,'평균끝날',B.day.toFixed(1),'D20',B.d20.toFixed(1),'D30',B.d30.toFixed(1),'클리어',B.win.toFixed(1),'사망',B.dth.toFixed(2),'매출/일',B.rev.toFixed(0),'D15',B.b15,'D25',B.b25);
console.log('\n장식 (새 판 전체)');for(const d of [...D.decorations].sort((x,y)=>x.kind.localeCompare(y.kind)||y.price-x.price))console.log(d.kind.padEnd(10),line(d.name,d.price,load('deco:'+d.id),base));
const alive=base.map((x,i)=>x.day>=5?i:-1).filter(i=>i>=0);
const bA=alive.map(i=>base[i]);const BA=st(bA);console.log('\n점지 D5에 얹음 (D5 간 판만 n '+BA.n+', 기준 D30 '+BA.d30.toFixed(1)+' 클리어 '+BA.win.toFixed(1)+')');
const G=['일반','고급','희귀','영웅'];
for(const r of [...D.relics].sort((x,y)=>y.rarity-x.rarity)){const a=load('relicAt:'+r.id+'@5');console.log(G[r.rarity].padEnd(3),line(r.name,r.price??r.cost??'',alive.map(i=>a[i]),bA));}
