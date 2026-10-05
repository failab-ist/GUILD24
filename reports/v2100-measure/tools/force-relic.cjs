// Forced-ownership read of every Store Support: the same fresh seeds, once without and once with one Support
// handed over free on DAY 5 (before that window is drawn, so it is not offered again; the bot still buys from it).
// Bots and relic ranking as tools/measure-v2100.cjs. Scratch tool - plays Runs, so AGENTS §9-A applies.
//   node reports/v2100-measure/tools/force-relic.cjs [--n 500] [--root <dist root>] [--ids a,b] [--tag label] [--out file.json]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const here=path.resolve(__dirname,'../../..'),{RANK}=require(path.join(here,'tools/measure-v2100.cjs'));

function worker({root,policy,force,T,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,P=G.Game.prototype,end=P.end,win=P.relicWindow,seen=new WeakSet(),rows=[];
 if(force)P.relicWindow=function(day){const s=this.run;
  if(day!==5||s.relicWindow?.milestoneDay===5||s.facilities.includes(force))return win.apply(this,arguments);
  s.facilities.push(force);const r=win.apply(this,arguments);s.facilities.pop();      // drawn without it
  const w=s.relicWindow;w.candidateIds.push(force);w.candidatePrices.push(0);const ph=s.phase;s.phase='morning';this.buyRelic(force);s.phase=ph;   // the real acquisition path, free
  w.candidateIds.pop();w.candidatePrices.pop();w.purchased=null;delete w.purchaseDay;return r;};
 // the gift takes one of the seven slots: the bot's last purchase (DAY 30) finds the store full and is skipped
 if(force){const buy=P.buyRelic;P.buyRelic=function(id){if(this.run.facilities.filter(x=>G.DATA.relicBy[x]).length>=7)return;return buy.apply(this,arguments);};}
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(seen.has(s))return r;seen.add(s);
  rows.push({day:s.day,reach:s.day>=30?1:0,win:s.win?1:0,deaths:s.stats.deaths||0,
   cash:(s.reportHistory||[]).length?((s.reportHistory.at(-1).balance-700)/s.reportHistory.length):0,
   sales:s.stats.revenue||0,had:s.facilities.includes(force)?1:0});return r;};
 G.Debug.trajectory({trajectories:T,runs:1,policy,build:'hybrid',prefix:'force-'+policy+'-'+part,relicAware:true,relicPriority:RANK});
 return {rows};
}

if(process.env.FORCE_WORKER){process.on('message',j=>{const res=worker(j);process.send({j,...res},()=>process.exit(0));});}
else{
 const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
 const N=+flag('--n',500),root=path.resolve(flag('--root',here)),out=flag('--out',null),tag=flag('--tag','');
 const ids=flag('--ids',null)?.split(',')||RANK,PARTS=4,jobs=[],acc={},t0=Date.now();
 for(const force of [null,...ids])for(const policy of ['reader','expert'])for(let p=0;p<PARTS;p++)jobs.push({root,policy,force,T:Math.ceil(N/PARTS),part:p});
 let live=0,done=0;const total=jobs.length;
 const finish=()=>{const res={meta:{N,root,tag,sec:Math.round((Date.now()-t0)/1000)},arms:acc};if(out)fs.writeFileSync(out,JSON.stringify(res));console.log(summary(res));};
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,FORCE_WORKER:'1'}});
  let got=false;c.on('message',m=>{got=true;(acc[m.j.force||'-']??=[]).push(...m.rows);});
  c.on('exit',code=>{if(!got){console.error('\nworker failed',JSON.stringify(j));process.exit(1);}live--;done++;process.stderr.write('\r'+done+'/'+total+' jobs · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<os.cpus().length;i++)next();
}

function summary(res){
 const m=(rs,f)=>rs.reduce((v,r)=>v+f(r),0)/rs.length,base=res.arms['-'],L=[];
 const b={reach:m(base,r=>r.reach),win:m(base,r=>r.win),cash:m(base,r=>r.cash),deaths:m(base,r=>r.deaths)};
 L.push('','forced Support at DAY 5 · '+res.meta.sec+'s · reader+expert fresh '+res.meta.N+' each'+(res.meta.tag?' · '+res.meta.tag:''));
 L.push('baseline n='+base.length+' | D30 '+(100*b.reach).toFixed(1)+'% | 클리어 '+(100*b.win).toFixed(1)+'% | 현금/일 '+b.cash.toFixed(0)+' | 사망/런 '+b.deaths.toFixed(2));
 const rows=Object.entries(res.arms).filter(([k])=>k!=='-').map(([id,rs])=>({id,n:rs.length,reach:m(rs,r=>r.reach)-b.reach,win:m(rs,r=>r.win)-b.win,
  cash:m(rs,r=>r.cash)-b.cash,deaths:m(rs,r=>r.deaths)-b.deaths})).sort((x,y)=>y.win-x.win);
 const s=(v,d=1)=>(v>=0?'+':'')+v.toFixed(d);
 for(const r of rows)L.push(r.id.padEnd(16)+' D30 '+s(100*r.reach).padStart(6)+'%p | 클리어 '+s(100*r.win).padStart(6)+'%p | 현금/일 '+s(r.cash,0).padStart(5)+' | 사망/런 '+s(r.deaths,2));
 return L.join('\n');
}
