// Pair confirmation by forking - MEASUREMENT ONLY (User 2026-10-12 OK).
// Source pass: fresh investor games with random Store Support picks; at a window (DAY 5+) where X is owned and Y is on offer
// and affordable (till stays >= 500), the state just before the pick is copied. Each copy is played on 4 ways with the same
// continuation seeds: X+Y (buy Y), X only (pass), Y only (X removed, buy Y), neither (X removed, pass).
// Synergy = (X+Y - X) - (Y - neither).
//   node fork.cjs pairs.json --src 4000 --per 50 --cont 10 --out fork.json
const fs=require('node:fs'),path=require('node:path'),{fork}=require('node:child_process');
const {install,rowOf,load}=require('./syn.cjs');
const root=path.resolve(process.env.ROOT||path.resolve(__dirname,'../../../..'));
const copy=o=>JSON.parse(JSON.stringify(o));
if(process.env.FK_WORKER){process.on('message',msg=>{const G=load(),P=G.Game.prototype,RANK=require(path.join(root,'tools/measure-v2100.cjs')).RANK;
 if(msg.kind==='src'){const {pairs,T,part,per}=msg,snaps={},buy=P.buyRelic;
  install(G,()=>'src');const inner=P.buyRelic;
  P.buyRelic=function(id){const s=this.run,w=s.relicWindow;
   if(s.phase!=='foundation'&&s.day>=5&&s.day<30)for(const [a,b] of pairs)for(const [x,y] of [[a,b],[b,a]]){const k=a+'+'+b,i=w.candidateIds.indexOf(y);
    if(i>=0&&s.facilities.includes(x)&&s.money-w.candidatePrices[i]>=500&&(snaps[k]??=[]).length<per)snaps[k].push({x,y,price:w.candidatePrices[i],account:copy(this.account),run:copy(s)});}
   return inner.call(this,id);};
  G.Debug.trajectory({trajectories:T,runs:1,policy:'investor',build:'hybrid',prefix:'fsrc-'+part,purchaseOrder:[],relicAware:true,relicPriority:RANK});
  fs.writeFileSync(msg.out,JSON.stringify(snaps));process.send('ok',()=>process.exit(0));return;}
 // arms
 const {jobs,cont,out}=msg,res=[];let k=0;const end=P.end,seen=new WeakSet();let rows=[];
 install(G,()=>'c'+k);
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(!seen.has(s)){seen.add(s);rows.push(rowOf(G,s));k++;}return r;};
 for(const j of jobs){const snap=j.snap,d=snap.run.day,arms={};
  for(const arm of ['both','x','y','none']){const run=copy(snap.run),w=run.relicWindow;
   if(arm==='y'||arm==='none')run.facilities=run.facilities.filter(f=>f!==snap.x);
   if(arm==='both'||arm==='y'){w.candidateIds=[snap.y];w.candidatePrices=[snap.price];}else{w.candidateIds=[];w.candidatePrices=[];}
   rows=[];k=0;G.Debug.continueRun(copy(snap.account),run,cont,'investor',{relicPriority:RANK});arms[arm]=rows.map(r=>({d,...r}));}
  res.push({pair:j.pair,x:snap.x,y:snap.y,d,arms});}
 fs.writeFileSync(out,JSON.stringify(res));process.send('ok',()=>process.exit(0));});}
else{const a=process.argv,flag=(n,v)=>a.includes(n)?a[a.indexOf(n)+1]:v,pairs=JSON.parse(fs.readFileSync(a[2],'utf8'));
 const SRC=+flag('--src',4000),PER=+flag('--per',50),CONT=+flag('--cont',10),OUT=flag('--out','fork.json'),W=4,t0=Date.now();
 const run=(msgs)=>Promise.all(msgs.map(m=>new Promise(ok=>{const c=fork(__filename,[],{env:{...process.env,FK_WORKER:'1'}});c.send(m);c.on('exit',ok);})));
 (async()=>{
  await run([0,1,2,3].map(p=>({kind:'src',pairs,T:Math.ceil(SRC/W),part:p,per:Math.ceil(PER/W),out:OUT+'.src'+p})));
  const jobs=[];for(let p=0;p<W;p++){const s=JSON.parse(fs.readFileSync(OUT+'.src'+p,'utf8'));fs.unlinkSync(OUT+'.src'+p);for(const [pair,list] of Object.entries(s))for(const snap of list)jobs.push({pair,snap});}
  console.log('snapshots '+jobs.length+' ('+Math.round((Date.now()-t0)/1000)+'s): '+pairs.map(([x,y])=>x+'+'+y+' '+jobs.filter(j=>j.pair===x+'+'+y).length).join(', '));
  const parts=[0,1,2,3].map(p=>jobs.filter((_,i)=>i%W===p));
  await run(parts.map((js,p)=>({kind:'arms',jobs:js,cont:CONT,out:OUT+'.arm'+p})));
  const all=[];for(let p=0;p<W;p++){all.push(...JSON.parse(fs.readFileSync(OUT+'.arm'+p,'utf8')));fs.unlinkSync(OUT+'.arm'+p);}
  fs.writeFileSync(OUT,JSON.stringify(all));console.log('done '+Math.round((Date.now()-t0)/1000)+'s');})();}
