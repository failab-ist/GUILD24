// Cross-run Decoration progression — MEASUREMENT ONLY, dev tool, never part of npm test.
// One account plays Runs in a row (Debug.trajectory: real settlement, real Meta.buyDecoration).
// Each purchase order is measurement INPUT. Reports, at Run 1 / 5 / 10 / 15: D30 reach, Boss
// clear, Decorations owned at start, and the acquisition ladder.
//   node tools/deco-trajectory.cjs [trajectories=200] [runs=15] [--policy balanced] [--build hybrid] [--aware] [--out file]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const ORDERS={
 none:[],
 economy:['premiumCase','thriftSafe','guildPlaque','dawnSign'],
 survival:['firstAidKit','memorialBoard','infirmaryPlaque','trainingRack'],
 // mixed: the stronger single of each Slot, cheapest first (User 2026-09-24 combination check)
 mixA:['premiumCase','memorialBoard','infirmaryPlaque','trainingRack'],
 // mixed the other way round: economy where the economy piece is closest
 mixB:['firstAidKit','thriftSafe','infirmaryPlaque','dawnSign'],
};
function load(){for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;}
if(process.env.DECO_WORKER){
 process.on('message',({name,T,R,policy,build,aware,part})=>{const G=load();
  const t=G.Debug.trajectory({trajectories:T,runs:R,policy,build,prefix:'deco-'+part,purchaseOrder:ORDERS[name],relicAware:aware});
  const idx=t.byIndex.map(b=>({reach:b.reach30*T,win:b.clearsPerRun*T,deco:b.decorationsAtStart*T,capital:b.capitalGained*T,deaths:b.deathsMedian}));
  process.send({name,part,T,idx,acq:t.acquisition.map(a=>a.runs),first:t.firstClear.runIndex},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),flag=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const pos=args.filter((a,i)=>!a.startsWith('--')&&!(i>0&&['--policy','--build','--out','--orders'].includes(args[i-1])));
 const T=Number(pos[0])||200,R=Number(pos[1])||15,policy=flag('--policy')||'balanced',build=flag('--build')||'hybrid',aware=args.includes('--aware');
 const PARTS=Math.max(1,Math.floor(os.cpus().length/Object.keys(ORDERS).length))||1,per=Math.ceil(T/PARTS);
 const only=flag('--orders')?flag('--orders').split(','):Object.keys(ORDERS);
 const jobs=[];for(const name of only)for(let p=0;p<PARTS;p++)jobs.push({name,part:p,T:per});
 const acc={};let live=0;
 const next=()=>{if(!jobs.length){if(!live)done();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,DECO_WORKER:'1'}});
  c.on('message',m=>{const a=acc[m.name]??={T:0,idx:null,acq:null,first:[]};a.T+=m.T;
   a.idx=a.idx?a.idx.map((x,i)=>Object.fromEntries(Object.keys(x).map(k=>[k,x[k]+m.idx[i][k]]))):m.idx;
   a.acq=a.acq?a.acq.map((r,i)=>r.concat(m.acq[i])):m.acq;a.first=a.first.concat(m.first);});
  c.on('exit',()=>{live--;next();});c.send({...j,R,policy,build,aware});};
 const med=xs=>{const r=[...xs].sort((a,b)=>(a??1e9)-(b??1e9));const m=r[Math.floor(r.length/2)];return m??'>'+R;};
 const done=()=>{const out={T,R,policy,build,aware,orders:ORDERS,results:{}};
  for(const [name,a] of Object.entries(acc)){
   const rows=a.idx.map((x,i)=>({run:i+1,reach30:x.reach/a.T,clear:x.win/a.T,decoAtStart:x.deco/a.T,capitalGain:x.capital/a.T}));
   const acq=a.acq.map((runs,k)=>({position:k+1,id:ORDERS[name][k],medianRun:med(runs),p25:med(runs.slice().sort((x,y)=>(x??1e9)-(y??1e9)).slice(0,Math.ceil(runs.length/2))),share:runs.filter(x=>x!==null).length/runs.length}));
   const cum=rows.reduce((s,r)=>s+r.clear,0);
   out.results[name]={rows,acq,firstClearRuns:a.first.map(x=>x+1),clearedWithin:a.first.length/a.T,cumulativeClears:cum};
   console.log('== '+name+' ('+(ORDERS[name].join(' > ')||'no purchase')+')');
   for(const r of rows)if([1,3,5,8,10,12,15].includes(r.run))console.log('  run '+String(r.run).padStart(2)+'  D30 '+(100*r.reach30).toFixed(1).padStart(5)+'%  clear '+(100*r.clear).toFixed(1).padStart(5)+'%  decorations '+r.decoAtStart.toFixed(2)+'  capital +'+Math.round(r.capitalGain));
   for(const q of acq)console.log('  #'+q.position+' '+q.id.padEnd(16)+' median Run '+q.medianRun+'  acquired '+(100*q.share).toFixed(0)+'%');
   console.log('  first clear within '+R+' Runs: '+(100*a.first.length/a.T).toFixed(1)+'%  median first-clear Run '+med(a.first.map(x=>x+1).concat(Array(a.T-a.first.length).fill(null))));}
  if(flag('--out'))fs.writeFileSync(flag('--out'),JSON.stringify(out,null,1));};
 for(let i=0;i<os.cpus().length;i++)next();
}
