const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{fork}=require('node:child_process');
const base=__dirname,copy=x=>JSON.parse(JSON.stringify(x));
function worker(arm,policy,part){
 const root=path.join(base,arm);
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(root,'dist',f+'.js'));
 const code=fs.readFileSync(path.join(root,'dist/systems/simulation.js'),'utf8');
 if(code.split('G.Debug={simulate,trajectory,').length!==2)throw Error('Export anchor changed');
 vm.runInThisContext(code.replace('G.Debug={simulate,trajectory,','G.Debug={blank,playRun,simulate,trajectory,'),{filename:'simulation-profile-export.js'});
 const save=Save.import(fs.readFileSync(process.env.REVISIT_SAVE||'C:/Users/necro/Downloads/guild24-save-day-30_1005.json','utf8'));
 const account=copy(save.account);account.runs=Math.max(1,account.runs-1);account.store.capital-=save.run.settlement.gain;account.store.loadout=copy(save.run.loadout);
 const rank=require(path.join(base,'template','tools/measure-v2100.cjs')).RANK;
 const P=Game.prototype,end=P.end,start=P.start,rows=[],seen=new WeakSet();
 P.start=function(seed){const r=start.call(this,seed);this.run.bossId='ENVY';return r;};
 P.end=function(){const ret=end.apply(this,arguments),s=this.run;if(seen.has(s))return ret;seen.add(s);
  const recs=s.npcs.flatMap(n=>n.records||[]).filter(r=>!r.deep&&r.day<30),ok=r=>['성공','대성공'].includes(r.outcome);
  rows.push({seed:s.seed,win:!!s.win,reach:s.day>=30,day:s.day,deaths:s.stats.deaths,revenue:s.stats.revenue,money:s.money,regulars:s.npcs.filter(n=>n.alive&&n.introduced&&Adventurer.isTrustedRegular(n)).length,
   bands:[[1,7],[8,14],[15,21],[22,29]].map(([a,b])=>{const r=recs.filter(r=>r.day>=a&&r.day<=b);return[r.filter(ok).length,r.length];}),
   exposure:s._rvExposure,visits:s._rvVisits,xpBonus:recs.reduce((v,r)=>v+(r.catchupBonus||0),0),xpBoosted:recs.filter(r=>r.catchupBonus>0).length,
   power:s.bossDebug?.power??null,bossPower:s.bossDebug?.bossPower??null,finalChance:s.bossDebug?Debug.clearChance(s.bossDebug.power,s.bossDebug.bossPower):null,
   party:(s.finalReport?.members||[]).map(n=>({id:n.npcId,level:n.level,job:n.job})),end:s.endReason});return ret;};
 const out=Debug.blank(250,policy,'adaptive','hybrid'),t0=Date.now();
 for(let seed=part*250;seed<(part+1)*250;seed++){const g=new Game(copy(account));g.autosave=false;g.lessons=false;g.start('save-profile-'+seed);Debug.playRun(g,out,{policy,pricing:'adaptive',build:'hybrid',seed,relicAware:true,relicPriority:rank});}
 if(rows.length!==250)throw Error('Profile slice incomplete: '+rows.length);
 const result={meta:{arm,policy,part,runs:250,sec:Math.round((Date.now()-t0)/1000),boss:'ENVY',loadout:save.run.loadout,mastery:Meta.totalJobMastery(account),sameAccountEachRun:true},rows};
 fs.writeFileSync(path.join(base,'profile-'+arm+'-'+policy+'-part'+part+'.json'),JSON.stringify(result));
}
if(process.argv[2]==='--slice')worker(process.argv[3],process.argv[4],+process.argv[5]);
else if(process.argv[2]==='--worker')(async()=>{
 const arm=process.argv[3],policy=process.argv[4],t0=Date.now();
 await Promise.all([0,1,2,3].map(part=>new Promise((resolve,reject)=>{const p=fork(__filename,['--slice',arm,policy,String(part)],{windowsHide:true,stdio:['ignore','inherit','inherit','ipc']});p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error('profile slice exit '+code)));})));
 const slices=[0,1,2,3].map(part=>JSON.parse(fs.readFileSync(path.join(base,'profile-'+arm+'-'+policy+'-part'+part+'.json')))),rows=slices.flatMap(s=>s.rows);
 if(rows.length!==1000||new Set(rows.map(r=>r.seed)).size!==1000)throw Error('Profile seeds missing or repeated');
 const result={meta:{...slices[0].meta,part:null,runs:1000,sec:Math.round((Date.now()-t0)/1000)},rows};
 fs.writeFileSync(path.join(base,'profile-'+arm+'-'+policy+'.json'),JSON.stringify(result));console.log('DONE profile '+arm+'/'+policy+' · '+result.meta.sec+'s');
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
else (async()=>{
 console.log('Profile waits for all standard arms, then runs two policies concurrently per arm.');
 while(!fs.existsSync(path.join(base,'both.json')))await new Promise(r=>setTimeout(r,10000));
 for(const arm of ['baseline','visit','xp','both']){
  console.log('START profile '+arm);
  await Promise.all(['reader','expert'].map(policy=>new Promise((resolve,reject)=>{const p=fork(__filename,['--worker',arm,policy],{windowsHide:true,stdio:['ignore','inherit','inherit','ipc']});p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(arm+'/'+policy+' exit '+code)));})));
 }
 console.log('COMPLETE save profile · 8000 runs');
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
