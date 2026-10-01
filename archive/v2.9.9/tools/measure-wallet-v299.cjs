// v2.9.9 quick patch measurement (User 2026-09-28): NPC Wallet levers on the `reader` bot, same seeds (revision-0..N-1) per arm.
// Measurement only: every arm is an in-memory patch; no game file is changed.
//   node tools/measure-wallet-v299.cjs <arm> [runs=5000] <out.json>
//   arms: current · pre (0.35 / 0.20 / 0.10) · m45 (0.45 / 0.25 / 0.15) · v5 / v10 / v20 (visit income +N) · lv10 (Level x10) · mid (+20 on D11-20)
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const arm=process.argv[2]||'current',runs=Number(process.argv[3]||5000),out=process.argv[4];
const ARMS={current:{},pre:{mult:{'퇴각':.35,'부상':.20,'중상':.10}},m45:{mult:{'퇴각':.45,'부상':.25,'중상':.15}},
 v5:{visit:()=>5},v10:{visit:()=>10},v20:{visit:()=>20},lv10:{visit:n=>n.level*2},mid:{visit:(n,d)=>d>=11&&d<=20?20:0}};
const A=ARMS[arm];if(!A)throw Error('unknown arm '+arm);const P=Game.prototype;
if(A.mult)Object.assign(Dungeon.WALLET_MULT,A.mult);
if(A.visit){const mq=P.morningQueue;P.morningQueue=function(){const r=mq.apply(this,arguments);const s=this.run;
 for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(n)n.money=Math.min(2000,Math.round(n.money+A.visit(n,s.day)));}return r;};}
const arrivals=[];const ar=P.arrive;P.arrive=function(){const r=ar.apply(this,arguments);const n=this.current();if(n)arrivals.push([this.run.day,n.money,n.injury]);return r;};
const rows=[];const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);const rh=s.reportHistory||[];const bal=d=>(rh.find(x=>x.day===d)||{}).balance??null;
 const R=s.npcs.flatMap(n=>n.records||[]),H=s.npcs.flatMap(n=>n.history||[]),B=R.filter(x=>x.day>10&&x.day<=20);
 const top3=d=>{const lv={};for(const r of R)if(r.day<=d)lv[r.npcId]=r.level;const v=Object.values(lv).sort((a,b)=>b-a).slice(0,3);return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;};
 rows.push({day:s.day,win:!!s.win,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final',
  t10:top3(10),t20:top3(20),d10:R.filter(x=>x.day<=10&&x.outcome==='사망').length,bal10:bal(10),bal20:bal(20),bal29:bal(29),
  bN:B.length,bS:B.filter(x=>x.outcome==='성공'||x.outcome==='대성공').length,bD:B.filter(x=>x.outcome==='사망').length,
  sales:H.length,over:H.filter(h=>h.mode==='overcharge').length,half:H.filter(h=>h.mode==='half').length});return ret;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
if(out)fs.writeFileSync(out,JSON.stringify({arm,runs,rows,arrivals}));
const N=rows.length,pc=(a)=>(100*a/N).toFixed(1),seg=r=>r.day<=10?'A':r.day<=20?'B':r.day<30?'C':'D',e=(s,k)=>rows.filter(r=>r.end===k&&seg(r)===s).length;
const med=a=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?v[(v.length-1)>>1]:'-';};
console.log(`${arm} n${N} · D20 ${pc(rows.filter(r=>r.day>=20).length)} · D30 ${pc(rows.filter(r=>r.day>=30).length)} · clear ${pc(rows.filter(r=>r.win).length)}`+
 ` · bankrupt D1-10/D11-20/D21-29 ${['A','B','C'].map(s=>pc(e(s,'bankrupt'))).join('/')} · death limit ${['A','B','C'].map(s=>pc(e(s,'death'))).join('/')}`+
 ` · Gold p50 D29 ${med(rows.filter(r=>r.day>=29).map(r=>r.bal29))} · injured Wallet p50 D11-20 ${med(arrivals.filter(x=>x[0]>10&&x[0]<=20&&x[2]===1).map(x=>x[1]))}`);
