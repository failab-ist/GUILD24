// v2.9.2 late Gate slope, D10 fork measurement (User 2026-09-26). Measurement only - no Source or Canonical change.
// Every candidate replays the same seed through DAY 1~10 on the committed Production (late 0.80), then, at the moment DAY 11's
// morning() is about to roll the next Gates, the snapshot is fingerprinted and `Dungeon.GATE.late` is set to the candidate for
// DAY 11~30. The D10 state and the RNG state at the fork are therefore identical for every candidate (checked: the fingerprint
// of run + account + RNG state must match across candidates for every seed), and only D11+ differs - a paired comparison.
// (The Day term's knee is DAY 9, so DAY 10's Gates already carry one step of `late`; they are played at Production 0.80 here.)
// Storing the snapshots would be ~100 KB each, so the bank is replayed rather than written: same seed + same policy = same D10.
//   node tools/measure-late-fork-v292.cjs <out.json> [seeds=5000] [late=0.80,0.90,1.00]      (PAR workers, default CPU count)
// Cohorts: OLD_USER_MATCH (reference only) = D10 top-3 avg Level >= 7.67 AND D10 deaths <= 1 (the old EXP structure's User value);
// CURRENT_SKILLED_D10 = D10 deaths <= 1 AND D10 top-3 avg Level in the top 10% / 15% of the Production D10 bank (a percentile of
// the bank itself, never a fixed Level).
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
if(process.argv[2]==='--worker'){
 const [,,,,late,from,count]=process.argv,PROD=.80;
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(__dirname,'..','dist',f+'.js'));
 const P=Game.prototype,start=P.start,end=P.end,morning=P.morning,off=Number(from),rows=[];
 const hash=str=>{let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h.toString(16);};
 const top3=(R,d)=>{const lv={};for(const x of R)if(x.day<=d)lv[x.npcId]=x.level;const v=Object.values(lv).sort((a,b)=>b-a).slice(0,3);return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;};
 P.start=function(seed,...x){Dungeon.GATE.late=PROD;this.__fork=null;const m=/^revision-(\d+)$/.exec(seed);return start.call(this,m?'revision-'+(Number(m[1])+off):seed,...x);};
 P.morning=function(...x){const s=this.run;
  if(s.day===11&&!this.__fork){const R=s.npcs.flatMap(n=>n.records||[]);
   this.__fork={fp:hash(JSON.stringify(s)+'|'+JSON.stringify(this.account)+'|'+this.rng.state),top3:Math.round(top3(R,10)*1000)/1000,deaths:R.filter(r=>r.day<=10&&r.outcome==='사망').length,gold:s.money};
   Dungeon.GATE.late=Number(late);}
  return morning.apply(this,x);};
 P.end=function(w,y){const s=this.run;const r=end.call(this,w,y);const R=s.npcs.flatMap(n=>n.records||[]),f=this.__fork;
  const deaths=d=>R.filter(x=>x.day<=d&&x.outcome==='사망').length,bal=d=>(s.reportHistory.find(x=>x.day===d)||{}).balance??null;
  rows.push(f?[Number(/^revision-(\d+)$/.exec(s.seed)?.[1]??-1),f.fp,f.top3,f.deaths,s.day,s.stats.deaths>=Meta.deathLimit(s)?'D':s.bossDebug?(s.win?'C':'F'):'B',
   s.day>=20?deaths(20):null,s.day>=29?deaths(29):null,s.day>=20?bal(20):null,s.day>=29?bal(29):null,
   s.day>=20?Math.round(top3(R,20)*1000)/1000:null,s.day>=29?Math.round(top3(R,29)*1000)/1000:null]:[Number(/^revision-(\d+)$/.exec(s.seed)?.[1]??-1),null]);
  Dungeon.GATE.late=PROD;return r;};
 Debug.simulate(Number(count),'reader',null,'adaptive','hybrid',{});
 process.stdout.write(JSON.stringify(rows));return;}

const out=process.argv[2]||'reports/v292-late-fork.json',seeds=Number(process.argv[3]||5000),lates=(process.argv[4]||'0.80,0.90,1.00').split(',').map(Number),
 PAR=Number(process.env.PAR||os.cpus().length),BLOCK=250;
const by=Object.fromEntries(lates.map(l=>[l,new Map()]));
const job=(late,from,count)=>new Promise((ok,no)=>{let buf='';const c=spawn(process.execPath,[__filename,'--worker','',late,from,count]);
 c.stdout.on('data',d=>buf+=d);c.stderr.pipe(process.stderr);c.on('close',code=>code?no(Error('worker '+late+'@'+from+' exit '+code)):ok(JSON.parse(buf)));});
(async()=>{
 const q=[];for(const l of lates)for(let a=0;a<seeds;a+=BLOCK)q.push([l,a,Math.min(BLOCK,seeds-a)]);let i=0;
 await Promise.all(Array.from({length:PAR},async()=>{while(i<q.length){const [l,a,n]=q[i++];for(const r of await job(l,a,n))by[l].set(r[0],r);}}));
 const base=by[lates[0]],bank=[...base.values()].filter(r=>r[1]),ids=bank.map(r=>r[0]);
 // the fork has to be the same D10 for every candidate
 let same=0,diff=0;for(const id of ids){const fp=base.get(id)[1];if(lates.every(l=>by[l].get(id)?.[1]===fp))same++;else diff++;}
 const q_=(v,p)=>{v=[...v].sort((a,b)=>a-b);return v.length?v[Math.min(v.length-1,Math.floor((v.length-1)*p))]:null;};
 const top=bank.map(r=>r[2]),pct={p50:q_(top,.5),p75:q_(top,.75),p80:q_(top,.8),p85:q_(top,.85),p90:q_(top,.9),p95:q_(top,.95)};
 const low=bank.filter(r=>r[3]<=1),atLeast=t=>low.filter(r=>r[2]>=t-1e-9).length;
 const cohorts={ALL_D10:ids,OLD_USER_MATCH:bank.filter(r=>r[2]>=7.666666666666667-1e-9&&r[3]<=1).map(r=>r[0]),
  CURRENT_SKILLED_D10_top15:low.filter(r=>r[2]>=pct.p85-1e-9).map(r=>r[0]),CURRENT_SKILLED_D10_top10:low.filter(r=>r[2]>=pct.p90-1e-9).map(r=>r[0])};
 const med=v=>q_(v.filter(x=>x!==null&&x!==undefined),.5),share=(set,f)=>set.length?set.filter(f).length/set.length:null;
 const res={generated:'v2.9.2 late Gate slope, D10 fork (paired)',policy:'reader',account:'fresh',seeds:'revision-0..'+(seeds-1),production:{late:.80},candidates:lates,
  d10Bank:{snapshots:bank.length,identicalAcrossCandidates:same,mismatched:diff,top3LevelPercentiles:pct,
   deathsLe1:low.length,deathsLe1AtOrAbove:Object.fromEntries(Object.entries(pct).map(([k,t])=>[k+' ('+t+')',atLeast(t)]))},cohorts:{}};
 for(const [name,set] of Object.entries(cohorts)){const c={n:set.length,byLate:{}};
  for(const l of lates){const R=set.map(id=>by[l].get(id)).filter(Boolean),r20=R.filter(r=>r[4]>=20),r29=R.filter(r=>r[4]>=29);
   c.byLate[l]={reach20:share(R,r=>r[4]>=20),reach30:share(R,r=>r[4]>=30),d10to20:share(R,r=>r[4]>=20),d20to30:share(r20,r=>r[4]>=30),
    endDeathLimit:share(R,r=>r[5]==='D'),endBankrupt:share(R,r=>r[5]==='B'),clearRef:share(R,r=>r[5]==='C'),
    deathsD20:med(r20.map(r=>r[6])),deathsD29:med(r29.map(r=>r[7])),goldD20:med(r20.map(r=>r[8])),goldD29:med(r29.map(r=>r[9])),top3D20:med(r20.map(r=>r[10])),top3D29:med(r29.map(r=>r[11]))};
   if(l!==lates[0]){let lost=0,gained=0;for(const id of set){const a=by[lates[0]].get(id)?.[4]>=30,b=by[l].get(id)?.[4]>=30;if(a&&!b)lost++;if(!a&&b)gained++;}c.byLate[l].vsBaselineD30={lost,gained};}}
  res.cohorts[name]=c;}
 fs.writeFileSync(out,JSON.stringify(res,null,1)+'\n');console.log(JSON.stringify(res.d10Bank,null,1));
})().catch(e=>{console.error(e);process.exit(1);});
