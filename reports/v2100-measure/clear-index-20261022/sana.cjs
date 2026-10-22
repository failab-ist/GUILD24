// 칸별 15판 궤적 요약: 궤적마다 15판 안 클리어 횟수, 같은 궤적 시드끼리 빈칸과 짝 비교, 흔들림 = 짝 차이 표준오차 x2
const fs=require('fs'),path=require('path');const dir=process.argv[2]||'st';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy'])require(require('path').join(__dirname,'../../../dist',f+'.js'));
const D=(globalThis.GUILD24||globalThis).DATA;const BGS=['economy','survival','operation'];
const L=(bg,c)=>{const p=path.join(dir,(bg+'/'+c).replace(/[:/]/g,'_')+'.json');return fs.existsSync(p)?JSON.parse(fs.readFileSync(p)):null;};
const per=rows=>{const m=new Map();for(const r of rows){const x=m.get(r.t)||{c:0,first:null,d30:0};if(r.win){x.c++;if(x.first===null)x.first=r.i+1;}if(r.day>=30)x.d30++;m.set(r.t,x);}return m;};
const med=a=>{a=[...a].sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN;};
for(const sl of D.decorationSlots){
 const E=[].concat(...BGS.map(bg=>L(bg,sl+':empty')||[]));if(!E.length)continue;const Em=per(E);
 const eC=[...Em.values()].reduce((a,x)=>a+x.c,0)/Em.size,eF=100*[...Em.values()].filter(x=>x.first).length/Em.size;
 console.log(`\n${sl} 빈칸: 15판 클리어 ${eC.toFixed(2)}회 · 첫 클리어 ${eF.toFixed(0)}% (궤적 ${Em.size})`);
 for(const d of D.decorations.filter(d=>d.slot===sl)){const A=[].concat(...BGS.map(bg=>L(bg,sl+':'+d.id)||[]));if(!A.length)continue;const Am=per(A);
  const diff=[...Am.keys()].filter(t=>Em.has(t)).map(t=>Am.get(t).c-Em.get(t).c),n=diff.length,m=diff.reduce((a,x)=>a+x,0)/n,v=diff.reduce((a,x)=>a+(x-m)**2,0)/(n-1);
  const byBg=BGS.map(bg=>{const a=per(L(bg,sl+':'+d.id)||[]),e=per(L(bg,sl+':empty')||[]);const k=[...a.keys()];return (k.reduce((s,t)=>s+a.get(t).c-(e.get(t)?.c||0),0)/k.length).toFixed(2);});
  const F=[...Am.values()];const fr=F.filter(x=>x.first).map(x=>x.first);
  console.log(`  ${d.name.padEnd(14)} ${d.price} 클리어 ${(m>=0?'+':'')+m.toFixed(2)}회 ±${(2*Math.sqrt(v/n)).toFixed(2)} · 첫 클리어 ${(100*fr.length/F.length).toFixed(0)}% (중앙 ${med(fr)}판째) · 배경별 경제/생존/운영 ${byBg.join(' / ')}`);}}
