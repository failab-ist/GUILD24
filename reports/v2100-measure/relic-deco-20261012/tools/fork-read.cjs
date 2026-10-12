// Read fork.cjs output. Per snapshot: arm means over continuations; synergy = (both - x) - (y - none), SE across snapshots.
const res=require(require('node:path').resolve(process.argv[2]));
const after=(r,d)=>{const e=r.exps.filter(x=>x[0]>d),b0=(r.bal.find(x=>x[0]===d)||[0,null])[1],last=r.bal.at(-1);
 return {succ:e.length?e.reduce((a,x)=>a+x[1],0)/e.length:null,death:e.reduce((a,x)=>a+x[2],0),cash:b0!=null&&last&&last[0]>d?(last[1]-b0)/(last[0]-d):null,reach:r.reach,win:r.win};};
const KEYS=['succ','death','cash','reach','win'],ARMS=['both','x','y','none'];
const mean=v=>v.reduce((a,b)=>a+b,0)/v.length,se=v=>{const m=mean(v);return Math.sqrt(v.reduce((a,b)=>a+(b-m)**2,0)/(v.length-1)/v.length);};
const fmt=(k,v)=>{const m=mean(v),s=se(v),sc=k==='death'||k==='cash'?1:100,dg=k==='cash'?1:k==='death'?2:1;return k+' '+(m>=0?'+':'')+(m*sc).toFixed(dg)+'±'+(s*sc).toFixed(dg)+(Math.abs(m)>2*s?'*':'');};
const pairs=[...new Set(res.map(r=>r.pair))];
console.log('짝 시너지 확인 (같은 순간 복사 → 네 갈래 × 이어 하기 '+(res[0]?.arms.both.length)+'번). 시너지 = (둘 다 − X만) − (Y만 − 둘 다 없음). * = 2SE 밖');
for(const p of pairs){const snaps=res.filter(r=>r.pair===p);const per={};for(const k of KEYS)per[k]={syn:[],xEff:[],yEff:[],both:[]};
 for(const s of snaps){const m={};for(const a of ARMS){m[a]={};for(const k of KEYS){const v=s.arms[a].map(r=>after(r,s.d)[k]).filter(v=>v!=null);m[a][k]=v.length?mean(v):null;}}
  for(const k of KEYS){if(ARMS.some(a=>m[a][k]==null))continue;per[k].syn.push((m.both[k]-m.x[k])-(m.y[k]-m.none[k]));per[k].yEff.push(m.y[k]-m.none[k]);per[k].xEff.push(m.x[k]-m.none[k]);per[k].both.push(m.both[k]-m.none[k]);}}
 const day=mean(snaps.map(s=>s.d));
 console.log('\n'+p+'  (복사 '+snaps.length+'개, 평균 DAY '+day.toFixed(1)+')');
 for(const [lab,key] of [['  시너지    ','syn'],['  둘 다     ','both'],['  먼저 것만 ','xEff'],['  새 것만   ','yEff']])console.log(lab,KEYS.map(k=>per[k][key].length>2?fmt(k,per[k][key]).padEnd(19):(k+' -').padEnd(19)).join(''));}
