// v2.9.2 late Gate slope measurement (User 2026-09-26). Measurement only: `Dungeon.GATE.late` is set inside this process for
// each candidate and no Source or Canonical value changes. Every other balance value is the committed Source (early 1.50,
// 정가 finalScale 0.90, 대성공 EXP 1.00, combat-success 0.90, 퇴각 .38 / other living .5, operating +12 x max(0, Day-15)).
// Fresh account, `reader` policy, the SAME seed set (revision-N) for every candidate, so the candidates differ only by late.
// The User-like D10 cohort keeps the report's definition: D10 top-3 average Level >= 7.67 AND deaths by D10 <= 1.
//   node tools/measure-late-slope-v292.cjs <out.json> [runs=5000] [late=0.80,0.90,1.00] [minCohort=100]
//   (PAR workers in parallel, default = CPU count; seeds are added in blocks until every candidate's cohort reaches minCohort)
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const USER_TOP3_D10=7.666666666666667,USER_DEATHS_D10=1;
if(process.argv[2]==='--worker'){
 const [,,,,late,from,count]=process.argv;
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(__dirname,'..','dist',f+'.js'));
 Dungeon.GATE.late=Number(late);
 const P=Game.prototype,start=P.start,end=P.end,off=Number(from);
 // simulate() numbers its seeds revision-0..count-1; the block offset makes this worker's seeds revision-from..from+count-1
 P.start=function(seed,...x){const m=/^revision-(\d+)$/.exec(seed);return start.call(this,m?'revision-'+(Number(m[1])+off):seed,...x);};
 const rows=[];
 P.end=function(w,y){const s=this.run;const r=end.call(this,w,y);const R=s.npcs.flatMap(n=>n.records||[]);
  const top3=d=>{const lv={};for(const x of R)if(x.day<=d)lv[x.npcId]=x.level;const v=Object.values(lv).sort((a,b)=>b-a).slice(0,3);return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;};
  const deaths=d=>R.filter(x=>x.day<=d&&x.outcome==='사망').length,bal=d=>(s.reportHistory.find(x=>x.day===d)||{}).balance;
  rows.push([Number(/^revision-(\d+)$/.exec(s.seed)?.[1]??-1),s.day,s.stats.deaths>=Meta.deathLimit(s)?'D':s.bossDebug?(s.win?'C':'F'):'B',Math.round(top3(10)*1000)/1000,deaths(10),
   s.day>=20?deaths(20):null,s.day>=29?deaths(29):null,s.day>=20?bal(20)??null:null,s.day>=29?bal(29)??null:null,
   s.day>=20?Math.round(top3(20)*1000)/1000:null,s.day>=29?Math.round(top3(29)*1000)/1000:null]);return r;};
 Debug.simulate(Number(count),'reader',null,'adaptive','hybrid',{});
 process.stdout.write(JSON.stringify(rows));return;}

const out=process.argv[2]||'reports/v292-late-slope.json',runs=Number(process.argv[3]||5000),
 lates=(process.argv[4]||'0.80,0.90,1.00').split(',').map(Number),minCohort=Number(process.argv[5]||100),PAR=Number(process.env.PAR||os.cpus().length),BLOCK=250;
const rowsBy=Object.fromEntries(lates.map(l=>[l,[]]));
const job=(late,from,count)=>new Promise((ok,no)=>{let buf='';const c=spawn(process.execPath,[__filename,'--worker','',late,from,count]);
 c.stdout.on('data',d=>buf+=d);c.stderr.pipe(process.stderr);c.on('close',code=>code?no(Error('worker '+late+'@'+from+' exit '+code)):ok(JSON.parse(buf)));});
async function measure(from,to){const q=[];for(const l of lates)for(let a=from;a<to;a+=BLOCK)q.push([l,a,Math.min(BLOCK,to-a)]);
 let i=0;const run=async()=>{while(i<q.length){const [l,a,n]=q[i++];rowsBy[l].push(...await job(l,a,n));}};
 await Promise.all(Array.from({length:PAR},run));}
const likeOf=r=>r[1]>=10&&r[3]>=USER_TOP3_D10-1e-9&&r[4]<=USER_DEATHS_D10;
(async()=>{
 let seeds=0;await measure(0,runs);seeds=runs;
 while(lates.some(l=>rowsBy[l].filter(likeOf).length<minCohort)&&seeds<runs*4){await measure(seeds,seeds+1000);seeds+=1000;}
 const med=v=>{v=v.filter(x=>x!==null&&x!==undefined).sort((a,b)=>a-b);return v.length?v[(v.length-1)>>1]:null;};
 const share=(set,f)=>set.length?set.filter(f).length/set.length:null;
 const band=d=>d<=10?'D1-10':d<=20?'D11-20':d<=29?'D21-29':'D30';
 const res={generated:'v2.9.2 late Gate slope measurement',policy:'reader',account:'fresh',seeds:'revision-0..'+(seeds-1),runs:seeds,
  cohort:'D10 top-3 avg Level >= 7.67 AND deaths by D10 <= 1',candidates:{}};
 for(const l of lates){const R=rowsBy[l],r10=R.filter(r=>r[1]>=10),r20=R.filter(r=>r[1]>=20),C=R.filter(likeOf),c20=C.filter(r=>r[1]>=20),c29=C.filter(r=>r[1]>=29);
  const ends={};for(const r of R.filter(r=>r[2]==='D'||r[2]==='B')){const k=band(r[1]);ends[k]??={deathLimit:0,bankrupt:0};ends[k][r[2]==='D'?'deathLimit':'bankrupt']++;}
  for(const k in ends){ends[k].deathLimit/=R.length;ends[k].bankrupt/=R.length;}
  res.candidates[l]={all:{n:R.length,reach10:r10.length/R.length,reach20:r20.length/R.length,reach30:share(R,r=>r[1]>=30),
    d10to20:share(r10,r=>r[1]>=20),d20to30:share(r20,r=>r[1]>=30),endsByBand:ends,clear:share(R,r=>r[2]==='C')},
   cohort:{n:C.length,reach20:share(C,r=>r[1]>=20),reach30:share(C,r=>r[1]>=30),d10to20:share(C,r=>r[1]>=20),d20to30:share(c20,r=>r[1]>=30),
    deathsD20:med(c20.map(r=>r[5])),deathsD29:med(c29.map(r=>r[6])),deathsD20mean:c20.length?c20.reduce((a,r)=>a+r[5],0)/c20.length:null,deathsD29mean:c29.length?c29.reduce((a,r)=>a+r[6],0)/c29.length:null,
    cashD20:med(c20.map(r=>r[7])),cashD29:med(c29.map(r=>r[8])),top3D20:med(c20.map(r=>r[9])),top3D29:med(c29.map(r=>r[10])),
    clear:share(C,r=>r[2]==='C'),endsDeathLimit:share(C,r=>r[2]==='D'),endsBankrupt:share(C,r=>r[2]==='B')}};}
 /* PAIRED: the baseline candidate's (first listed) User-like seeds, followed under every candidate - the same Runs, only late differs */
 const base=new Set(rowsBy[lates[0]].filter(likeOf).map(r=>r[0]));res.paired={baseline:lates[0],n:base.size,candidates:{}};
 for(const l of lates){const P=rowsBy[l].filter(r=>base.has(r[0])),p20=P.filter(r=>r[1]>=20);
  res.paired.candidates[l]={n:P.length,stillLike:share(P,likeOf),reach20:share(P,r=>r[1]>=20),reach30:share(P,r=>r[1]>=30),d20to30:share(p20,r=>r[1]>=30),clear:share(P,r=>r[2]==='C')};}
 /* seed-level flips against the baseline: reached D30 at baseline but not here, and the reverse */
 const at=l=>new Map(rowsBy[l].filter(r=>base.has(r[0])).map(r=>[r[0],r[1]>=30]));const b0=at(lates[0]);
 for(const l of lates.slice(1)){const m=at(l);let lost=0,gained=0;for(const [k,v] of b0){if(v&&!m.get(k))lost++;if(!v&&m.get(k))gained++;}res.paired.candidates[l].lostD30=lost;res.paired.candidates[l].gainedD30=gained;}

 fs.writeFileSync(out,JSON.stringify(res,null,1)+'\n');console.log(JSON.stringify(res,null,1));
})().catch(e=>{console.error(e);process.exit(1);});
