// 중반 계정 클리어 차이 요약: 같은 (계정, 시드) 짝끼리 비교, 흔들림 = 짝 차이의 표준오차 x2
const fs=require('fs'),path=require('path');const dir=process.argv[2]||'a8';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy'])require(require('path').join(__dirname,'../../../dist',f+'.js'));
const D=(globalThis.GUILD24||globalThis).DATA;const L=c=>{const p=path.join(dir,c.replace(/[:@]/g,'_')+'.json');return fs.existsSync(p)?JSON.parse(fs.readFileSync(p)):null;};
const base=L('none');const key=r=>r.t+'-'+r.k;const B=new Map(base.map(r=>[key(r),r]));
const st=(rows,filt)=>{const ps=rows.map(r=>[B.get(key(r)),r]).filter(([b,r])=>filt(b,r));const n=ps.length;
 const f=(g)=>{const d=ps.map(([b,r])=>(g(r)?1:0)-(g(b)?1:0)),m=d.reduce((a,x)=>a+x,0)/n,v=d.reduce((a,x)=>a+(x-m)**2,0)/(n-1);return [100*m,200*Math.sqrt(v/n)];};
 return {n,clear:f(r=>r.win),d30:f(r=>r.day>=30),d20:f(r=>r.day>=20),base:100*ps.filter(([b])=>b.win).length/n};};
const s=(x)=>(x[0]>=0?'+':'')+x[0].toFixed(1);const RN=['일반','','희귀','영웅'];
console.log(`기준(none) n${base.length} 클리어 ${(100*base.filter(r=>r.win).length/base.length).toFixed(1)}% D30 ${(100*base.filter(r=>r.day>=30).length/base.length).toFixed(1)}% D20 ${(100*base.filter(r=>r.day>=20).length/base.length).toFixed(1)}%`);
console.log('\n장식 (칸별, 클리어 ±흔들림 · D30 · D20)');
for(const sl of D.decorationSlots){for(const d of D.decorations.filter(d=>d.slot===sl).sort((a,b)=>a.price-b.price)){const r=L('deco:'+d.id);if(!r)continue;const x=st(r,()=>true);
 console.log(`${sl.padEnd(8)}${d.name.padEnd(14)} ${d.price} 클리어 ${s(x.clear)} ±${x.clear[1].toFixed(1)} · D30 ${s(x.d30)} · D20 ${s(x.d20)}`);}}
console.log('\n점포지원 (D5 창, D5 간 판만, 클리어 · 100G당 · D30 · D20)');const out=[];
for(const rl of D.relics){const r=L('relicAt:'+rl.id+'@5');if(!r)continue;const x=st(r,(b,r)=>b.day>=5&&r.day>=5);out.push([rl,x]);}
out.sort((a,b)=>b[1].clear[0]/b[0].price-a[1].clear[0]/a[0].price);
for(const [rl,x] of out)console.log(`${RN[rl.rarity].padEnd(3)}${rl.name.padEnd(14)} ${rl.price} 클리어 ${s(x.clear)} ±${x.clear[1].toFixed(1)} · 100G당 ${s([100*x.clear[0]/rl.price])} · D30 ${s(x.d30)} · D20 ${s(x.d20)} (n${x.n})`);
