// Fresh account -> everything: one account plays Runs until it owns all 8 Decorations and the whole Job x Boss matrix
// (total Mastery 42), or hits MAX runs. Same bot setup as tools/measure-v2100.cjs (best-hybrid Supports, relic-aware).
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),{fork}=require('node:child_process');
const ROOT=require('node:path').resolve(__dirname,'../../..'),{RANK}=require(ROOT+'/tools/measure-v2100.cjs');
// one of each Slot cheapest first (the measurement's economy order), then the other four
const ORDER=['guildShelf','thriftSafe','honorFrame','sponsorSign','aidCabinet','memorialBook','infirmaryPlaque','trainingSign'];
function worker({policy,T,MAX,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(ROOT,'dist',f+'.js'));
 vm.runInThisContext(fs.readFileSync(ROOT+'/dist/systems/simulation.js','utf8').replace('G.Debug={simulate,','G.Debug={playRun,blank,simulate,'));
 const G=globalThis,D=G.DATA,out=[];
 for(let t=0;t<T;t++){const account=G.Meta.fresh(),runs=[];
  for(let i=0;i<MAX;i++){const g=new G.Game(account);g.autosave=false;g.lessons=false;g.start('full-'+policy+'-'+part+'-'+t+'-'+i);
   G.Debug.playRun(g,G.Debug.blank(1,policy,'adaptive','hybrid'),{policy,pricing:'adaptive',build:'hybrid',seed:part*1000+t,relicAware:true,relicPriority:RANK});
   g.end(!!g.run.win,g.run.endReason||'측정 종료');
   for(const id of ORDER){if(G.Meta.decorationOwned(account,id))continue;if(G.Meta.storeCapital(account)<D.decorationBy[id].price)break;G.Meta.buyDecoration(account,id);}
   const m=G.Meta.totalJobMastery(account),deco=(account.store?.owned||[]).length;
   runs.push([g.run.day,g.run.win?1:0,m,deco,G.Meta.distinctBossClear(account)]);
   if(m>=42&&deco>=8)break;}
  out.push(runs);}
 return out;}
if(process.env.FULL_WORKER){process.on('message',j=>{const r=worker(j);process.send({j,r},()=>process.exit(0));});}
else{
 const POL=(process.env.POL||'reader,expert').split(','),T=+(process.env.T||60),MAX=+(process.env.MAX||300),PARTS=+(process.env.PARTS||12);
 const jobs=[];for(const policy of POL)for(let p=0;p<PARTS;p++)jobs.push({policy,T:Math.ceil(T/PARTS),MAX,part:p});
 const acc={},t0=Date.now();let live=0,done=0,total=jobs.length;
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;const c=fork(__filename,[],{env:{...process.env,FULL_WORKER:'1'}});
  c.on('message',m=>(acc[m.j.policy]??=[]).push(...m.r));c.on('exit',()=>{live--;done++;process.stderr.write('\r'+done+'/'+total+' · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<os.cpus().length;i++)next();
 function finish(){fs.writeFileSync(process.env.OUT||path.join(__dirname,'full.json'),JSON.stringify({T,MAX,sec:Math.round((Date.now()-t0)/1000),acc}));console.log('\ndone '+Math.round((Date.now()-t0)/1000)+'s');}
}
