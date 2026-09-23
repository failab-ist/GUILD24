// Store Support (relic) contribution measurement — MEASUREMENT ONLY, dev tool, never part of npm test.
// User-approved method (2026-09-23): a relic's contribution is the paired difference, on the same
// seeds, between a Run that owns it from DAY 1 and the same Run without it.
//   primary : Store Capital gained by the Run (Gross Sales x reached-Day rate, META)
//   guards  : reached D30 rate, Boss clear rate
// Policy 'balanced' / pricing 'adaptive' / build 'none' (no paid Store Support is bought, so the
// measured relic is the only one besides the free D0 pick). The measured relic is removed from the
// D0 window in BOTH arms, so both arms choose from the same D0 set.
//   node tools/relic-contribution.cjs [seeds=300] [ids=all | a,b,a+b] [--set '{"bulk":{"discount":0.18}}'] [--out file]
// --builds: instead, play each build strategy (and 'none') with the same seeds and report mean
//   Store Capital gain, reached-D30, clear rate and relic spend per build.
// --policy <name> (default balanced) · --account full : an account owning and wearing every Decoration
// (one per slot) instead of Meta.fresh(). Workers: one child process per relic / build (os.cpus()).
// --aware : the simulated player uses what it owns (simulation.js relic-aware layer); off by default.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function load(){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 return globalThis.GUILD24||globalThis;
}
const METRICS=['gain','reached','win','deaths','regulars','sales','margin','finalRatio','spend'];
// one row per finished Run: the axes each build claims as its strength (RELIC §BUILD AXES)
const rowOf=s=>{const h=s.reportHistory||[],sum=k=>h.reduce((a,d)=>a+(d[k]||0),0);
 return {gain:s.settlement?.gain??0,reached:s.day>=30?1:0,win:s.win?1:0,deaths:s.stats.deaths||0,
  regulars:s.stats.regulars||0,sales:sum('sales'),margin:sum('revenue')-sum('cogs'),
  finalRatio:s.bossDebug?s.bossDebug.power/s.bossDebug.bossPower:0,spend:s.stats.relicSpent||0};};
// overrides: {"<id>":{param:value}} for D.relicParams, plus optional "_price":{"<id>":gold}
function applyOverrides(D,o){if(!o)return;
 for(const [id,p] of Object.entries(o)){if(id==='_price'){for(const [rid,v] of Object.entries(p))D.relicBy[rid].price=v;continue;}
  Object.assign(D.relicParams[id],p);}}
function accountFor(G,kind){if(kind!=='full')return null;const a=G.Meta.fresh();
 G.Meta.addCapital(a,1e7);for(const d of G.DATA.decorations)G.Meta.buyDecoration(a,d.id);return a;}
function runBuild(G,seeds,build,overrides,policy,account,aware){
 const D=G.DATA;
 applyOverrides(D,overrides);
 const P=G.Game.prototype,end=P.end,rows=[];
 P.end=function(win,reason){const r=end.call(this,win,reason),s=this.run;
  rows.push(rowOf(s));return r;};
 try{G.Debug.simulate(seeds,policy,accountFor(G,account),'adaptive',build,{relicAware:aware});}finally{P.end=end;}
 return rows;
}
function runArm(G,seeds,inject,overrides,policy,account,aware){
 const D=G.DATA;
 applyOverrides(D,overrides);
 const P=G.Game.prototype,start=P.start,end=P.end,rows=[];
 // an id may be a combination "a+b": every member is removed from the D0 window and owned together
 const list=v=>v?v.split('+'):[];
 P.start=function(seed){const r=start.call(this,seed),s=this.run,w=s.relicWindow;
  for(const id of list(inject.remove))if(w){const i=w.candidateIds.indexOf(id);if(i>=0){w.candidateIds.splice(i,1);w.candidatePrices.splice(i,1);}}
  for(const id of list(inject.own))if(!s.facilities.includes(id))s.facilities.push(id);
  return r;};
 P.end=function(win,reason){const r=end.call(this,win,reason),s=this.run;
  rows.push(rowOf(s));return r;};
 try{G.Debug.simulate(seeds,policy,accountFor(G,account),'adaptive','none',{relicAware:aware});}finally{P.start=start;P.end=end;}
 return rows;
}
if(process.env.RELIC_WORKER){
 process.on('message',({seeds,id,overrides,build,policy,account,aware})=>{
  const G=load();
  // exit only after the message is flushed: a large payload sent right before exit can be lost
  if(build){process.send({id,rows:runBuild(G,seeds,build,overrides,policy,account,aware)},()=>process.exit(0));return;}
  const base=runArm(G,seeds,{remove:id},overrides,policy,account,aware);
  const treat=runArm(G,seeds,{remove:id,own:id},overrides,policy,account,aware);
  process.send({id,base,treat},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),flag=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const valued=['--set','--out','--policy','--account'],pos=args.filter((a,i)=>!a.startsWith('--')&&!(i>0&&valued.includes(args[i-1])));
 const seeds=Number(pos[0])||300,G0=load(),all=G0.DATA.relics.map(r=>r.id);
 const builds=args.includes('--builds');
 const ids=builds?['none','hybrid',...Object.keys(G0.DATA.buildNames)]:pos[1]&&pos[1]!=='all'?pos[1].split(','):all;
 const policy=flag('--policy')||'balanced',account=flag('--account')||'fresh',aware=args.includes('--aware');
 const setArg=flag('--set'),overrides=setArg?JSON.parse(setArg.startsWith('@')?fs.readFileSync(setArg.slice(1),'utf8'):setArg):null,outFile=flag('--out');
 const stat=(b,t,k)=>{const d=b.map((x,i)=>t[i][k]-x[k]),n=d.length,m=d.reduce((a,v)=>a+v,0)/n,
  sd=Math.sqrt(d.reduce((a,v)=>a+(v-m)**2,0)/Math.max(1,n-1));
  return {base:b.reduce((a,x)=>a+x[k],0)/n,delta:m,se:sd/Math.sqrt(n)};};
 const results={},queue=ids.slice();let live=0;
 const next=()=>{if(!queue.length){if(!live)done();return;}const id=queue.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,RELIC_WORKER:'1'}});
  c.on('message',({id,base,treat,rows})=>{
   if(rows){const m=k=>rows.reduce((a,x)=>a+x[k],0)/rows.length;results[id]=Object.fromEntries(METRICS.map(k=>[k,m(k)]));
    console.log(id.padEnd(11),METRICS.map(k=>k+' '+(+m(k).toFixed(k==='gain'||k==='margin'||k==='spend'?0:3))).join('  '));return;}
   results[id]=Object.fromEntries(METRICS.map(k=>[k,stat(base,treat,k)]));
   console.log(id.padEnd(15),METRICS.filter(k=>k!=='spend').map(k=>'d'+k+' '+results[id][k].delta.toFixed(k==='gain'||k==='margin'?0:3)+'±'+results[id][k].se.toFixed(k==='gain'||k==='margin'?0:3)).join('  '));});
  c.on('exit',()=>{live--;next();});c.send({seeds,id,overrides,build:builds?id:null,policy,account,aware});};
 const done=()=>{const out={seeds,policy,account,aware,pricing:'adaptive',mode:builds?'builds':'relics',overrides,results};
  if(outFile)fs.writeFileSync(outFile,JSON.stringify(out,null,1));};
 for(let i=0;i<Math.max(1,os.cpus().length);i++)next();
}
