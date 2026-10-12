// Read syn.cjs rows (no play). node syn-read.cjs rows.json [--top 25]
// Single: at windows offering X, runs that picked X vs runs that picked another card (random pick, same window).
// Pair: effect of picking B when A is already owned minus effect of picking B when A is not owned (both orders pooled).
const rows=require(require('node:path').resolve(process.argv[2])),TOP=+(process.argv[process.argv.indexOf('--top')+1]||25);
const D={};{globalThis.GUILD24={DATA:{balance:{},pricing:{}}};}
const after=(r,d)=>{const e=r.exps.filter(x=>x[0]>d),b0=d===0?700:(r.bal.find(x=>x[0]===d)||[0,null])[1],last=r.bal.at(-1);
 return {succ:e.length?e.reduce((a,x)=>a+x[1],0)/e.length:null,death:e.reduce((a,x)=>a+x[2],0),
  cash:b0!=null&&last&&last[0]>d?(last[1]-b0)/(last[0]-d):null,reach:r.reach,win:r.win};};
const KEYS=['succ','death','cash','reach','win'];
const obs=[];// one per (run, window with a pick)
for(const r of rows){const owned=[];for(const [d,offer,pick] of r.windows){if(pick){obs.push({d,offer,pick,owned:owned.slice(),o:after(r,d)});owned.push(pick);}}}
function diff(a,b){const out={n1:a.length,n0:b.length};for(const k of KEYS){const x=a.map(o=>o.o[k]).filter(v=>v!=null),y=b.map(o=>o.o[k]).filter(v=>v!=null);
 if(x.length<5||y.length<5){out[k]=[NaN,NaN];continue;}const m=v=>v.reduce((s,z)=>s+z,0)/v.length,va=v=>{const mm=m(v);return v.reduce((s,z)=>s+(z-mm)**2,0)/(v.length-1);};
 out[k]=[m(x)-m(y),Math.sqrt(va(x)/x.length+va(y)/y.length)];}return out;}
const f=(k,v)=>{const [m,se]=v;if(isNaN(m))return k+' -';const s=k==='death'||k==='cash'?m.toFixed(2):(100*m).toFixed(1);const e=k==='death'||k==='cash'?se.toFixed(2):(100*se).toFixed(1);return k+' '+(m>=0?'+':'')+s+'±'+e+(Math.abs(m)>2*se?'*':'');};
const ids=[...new Set(obs.flatMap(o=>o.offer))].sort();
console.log('runs '+rows.length+' · picks '+obs.length+' · D30 '+(100*rows.filter(r=>r.reach).length/rows.length).toFixed(1)+'% · 클리어 '+(100*rows.filter(r=>r.win).length/rows.length).toFixed(1)+'%');
console.log('\n[하나씩] 같은 창에서 X를 집은 판 - 다른 걸 집은 판 (succ·reach·win %p, death 명, cash G/일; * = 2SE 밖)');
const single={};
for(const id of ids){const w=obs.filter(o=>o.offer.includes(id));const res=diff(w.filter(o=>o.pick===id),w.filter(o=>o.pick!==id));single[id]=res;
 const day=w.filter(o=>o.pick===id).reduce((a,o)=>a+o.d,0)/Math.max(1,res.n1);
 console.log(id.padEnd(16),('n '+res.n1+'/'+res.n0).padEnd(13),('평균일 '+day.toFixed(1)).padEnd(10),KEYS.map(k=>f(k,res[k]).padEnd(18)).join(''));}
console.log('\n[짝] B 집은 효과(A 있을 때) - B 집은 효과(A 없을 때), 두 방향 합침. succ z 순');
const pairs=[];
for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=ids[i],B=ids[j],acc={};let nmin=Infinity;
 for(const [x,y] of [[A,B],[B,A]]){const w=obs.filter(o=>o.offer.includes(y)&&!o.owned.includes(y)&&o.pick!==x);
  const withX=w.filter(o=>o.owned.includes(x)),without=w.filter(o=>!o.owned.includes(x));
  const e1=diff(withX.filter(o=>o.pick===y),withX.filter(o=>o.pick!==y)),e0=diff(without.filter(o=>o.pick===y),without.filter(o=>o.pick!==y));
  nmin=Math.min(nmin,e1.n1);
  for(const k of KEYS){const [m1,s1]=e1[k],[m0,s0]=e0[k];if(isNaN(m1)||isNaN(m0))continue;const v=(acc[k]??=[]);v.push([m1-m0,Math.hypot(s1,s0)]);}}
 const res={A,B,n:nmin};for(const k of KEYS){const v=acc[k];if(!v||!v.length){res[k]=[NaN,NaN];continue;}
  const w=v.map(([,s])=>1/(s*s||1e-9)),W=w.reduce((a,b)=>a+b,0);res[k]=[v.reduce((a,[m],i)=>a+m*w[i],0)/W,Math.sqrt(1/W)];}
 pairs.push(res);}
const z=p=>isNaN(p.succ[0])?-Infinity:p.succ[0]/p.succ[1];
const good=pairs.filter(p=>!isNaN(p.succ[0])).sort((a,b)=>z(b)-z(a));
for(const p of good.slice(0,TOP))console.log((p.A+'+'+p.B).padEnd(30),('n≥'+p.n).padEnd(7),KEYS.map(k=>f(k,p[k]).padEnd(18)).join(''));
console.log('... 아래쪽(서로 깎는 짝)');
for(const p of good.slice(-8))console.log((p.A+'+'+p.B).padEnd(30),('n≥'+p.n).padEnd(7),KEYS.map(k=>f(k,p[k]).padEnd(18)).join(''));
const zs=good.map(z);console.log('\n짝 '+good.length+'개 중 |z|>2: '+zs.filter(x=>Math.abs(x)>2).length+' (우연이면 약 '+Math.round(good.length*.046)+'개), |z|>3: '+zs.filter(x=>Math.abs(x)>3).length);
if(process.argv.includes('--json'))require('node:fs').writeFileSync(process.argv[process.argv.indexOf('--json')+1],JSON.stringify({single,pairs:good},null,1));
