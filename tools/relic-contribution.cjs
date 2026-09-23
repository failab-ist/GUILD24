// Store Support (relic) contribution measurement — MEASUREMENT ONLY, dev tool, never part of npm test.
// User-approved method (2026-09-23): a relic's contribution is the paired difference, on the same
// seeds, between a Run that owns it from DAY 1 and the same Run without it.
//   primary : Store Capital gained by the Run (Gross Sales x reached-Day rate, META)
//   guards  : reached D30 rate, Boss clear rate
// Policy 'balanced' / pricing 'adaptive' / build 'none' (no paid Store Support is bought, so the
// measured relic is the only one besides the free D0 pick). The measured relic is removed from the
// D0 window in BOTH arms, so both arms choose from the same D0 set.
//   node tools/relic-contribution.cjs [seeds=300] [ids=all] [--set '{"bulk":{"discount":0.18}}'] [--out file]
// --builds: instead, play each build strategy (and 'none') with the same seeds and report mean
//   Store Capital gain, reached-D30, clear rate and relic spend per build.
// Workers: one child process per relic batch (os.cpus()).
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function load(){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 return globalThis.GUILD24||globalThis;
}
function runBuild(G,seeds,build,overrides){
 const D=G.DATA;
 if(overrides&&D.relicParams)for(const [id,p] of Object.entries(overrides))Object.assign(D.relicParams[id],p);
 const P=G.Game.prototype,end=P.end,rows=[];
 P.end=function(win,reason){const r=end.call(this,win,reason),s=this.run;
  rows.push({gain:s.settlement?.gain??0,reached:s.day>=30?1:0,win:s.win?1:0,spend:s.stats.relicSpent||0});return r;};
 try{G.Debug.simulate(seeds,'balanced',null,'adaptive',build);}finally{P.end=end;}
 return rows;
}
function runArm(G,seeds,inject,overrides){
 const D=G.DATA;
 if(overrides&&D.relicParams)for(const [id,p] of Object.entries(overrides))Object.assign(D.relicParams[id],p);
 const P=G.Game.prototype,start=P.start,end=P.end,rows=[];
 P.start=function(seed){const r=start.call(this,seed),s=this.run,w=s.relicWindow;
  if(inject.remove&&w){const i=w.candidateIds.indexOf(inject.remove);if(i>=0){w.candidateIds.splice(i,1);w.candidatePrices.splice(i,1);}}
  if(inject.own&&!s.facilities.includes(inject.own))s.facilities.push(inject.own);
  return r;};
 P.end=function(win,reason){const r=end.call(this,win,reason),s=this.run;
  rows.push({gain:s.settlement?.gain??0,reached:s.day>=30?1:0,win:s.win?1:0});return r;};
 try{G.Debug.simulate(seeds,'balanced',null,'adaptive','none');}finally{P.start=start;P.end=end;}
 return rows;
}
if(process.env.RELIC_WORKER){
 process.on('message',({seeds,id,overrides,build})=>{
  const G=load();
  if(build){process.send({id,rows:runBuild(G,seeds,build,overrides)});process.exit(0);}
  const base=runArm(G,seeds,{remove:id},overrides);
  const treat=runArm(G,seeds,{remove:id,own:id},overrides);
  process.send({id,base,treat});process.exit(0);});
}else{
 const args=process.argv.slice(2),flag=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const pos=args.filter((a,i)=>!a.startsWith('--')&&!(i>0&&args[i-1].startsWith('--')));
 const seeds=Number(pos[0])||300,G0=load(),all=G0.DATA.relics.map(r=>r.id);
 const builds=args.includes('--builds');
 const ids=builds?['none','hybrid',...Object.keys(G0.DATA.buildNames)]:pos[1]&&pos[1]!=='all'?pos[1].split(','):all;
 const overrides=flag('--set')?JSON.parse(flag('--set')):null,outFile=flag('--out');
 const stat=(b,t,k)=>{const d=b.map((x,i)=>t[i][k]-x[k]),n=d.length,m=d.reduce((a,v)=>a+v,0)/n,
  sd=Math.sqrt(d.reduce((a,v)=>a+(v-m)**2,0)/Math.max(1,n-1));
  return {base:b.reduce((a,x)=>a+x[k],0)/n,delta:m,se:sd/Math.sqrt(n)};};
 const results={},queue=ids.slice();let live=0;
 const next=()=>{if(!queue.length){if(!live)done();return;}const id=queue.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,RELIC_WORKER:'1'}});
  c.on('message',({id,base,treat,rows})=>{if(rows){const m=k=>rows.reduce((a,x)=>a+x[k],0)/rows.length;
   results[id]={gain:m('gain'),reached:m('reached'),win:m('win'),spend:m('spend')};
   console.log(id.padEnd(11),'gain',m('gain').toFixed(0).padStart(6),' reach',m('reached').toFixed(3),' win',m('win').toFixed(3),' spend',m('spend').toFixed(0));return;}
   results[id]={gain:stat(base,treat,'gain'),reached:stat(base,treat,'reached'),win:stat(base,treat,'win')};
   console.log(id.padEnd(15),'dGain',results[id].gain.delta.toFixed(1).padStart(8),'±',results[id].gain.se.toFixed(1).padStart(6),
    ' dReach',results[id].reached.delta.toFixed(3),' dWin',results[id].win.delta.toFixed(3));});
  c.on('exit',()=>{live--;next();});c.send({seeds,id,overrides,build:builds?id:null});};
 const done=()=>{const out={seeds,policy:'balanced/adaptive/none',overrides,results};
  if(outFile)fs.writeFileSync(outFile,JSON.stringify(out,null,1));};
 for(let i=0;i<Math.max(1,os.cpus().length);i++)next();
}
