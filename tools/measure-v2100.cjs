// v2.10.0 success-meta measurement — MEASUREMENT ONLY, dev tool, never part of npm test (AGENTS §9-A: run on User approval).
// Best-hybrid Supports (relicPriority = the clear ranking of reports/relic-balance/v2913-qp13/EVALUATION.md) with the relic-aware
// layer on, Decorations bought from earned Capital in a named order (cheapest first). Per arm it reports ordinary success by Day band,
// D30 reach / clear by Boss, end reasons, accidents, a zombie line, visit Wallets and every Support's runs.
//   node tools/measure-v2100.cjs [--before <root>] [--traj 200] [--fresh 1000] [--runs 10] [--policies reader,expert] [--decos none,economy] [--out file.json]
// Each Run row also carries its Store Capital settlement (sales, rate, gain).
// --before points at a checkout of the pre-change source (with this harness's relicPriority option); omit it to measure HEAD only.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const RANK=['fresh24','hub','expeditionMeal','kitchen','dawnRecovery','opsRoom','extraOrder','returnPoints','lifetime','member','rotation',
 'firstAidDesk','bulk','board','coldcase','hazardBoard','premiumMember','fieldStretcher','groupOrder','guarantee','royalCert','supplyCert',
 'firstVisitCoupon','fridge','rerollTicket','stamp','warehouse','logisticsHQ','memberBundle','fieldRepair','efficiency','rareContract'];
const DECO={none:[],economy:['guildShelf','thriftSafe','honorFrame','sponsorSign'],survival:['aidCabinet','memorialBook','infirmaryPlaque','trainingSign']};
const BANDS=[[1,7],[8,14],[15,21],[22,29]];

function worker({root,kind,policy,deco,T,R,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,P=G.Game.prototype,end=P.end,open=P.open,seen=new WeakSet(),rows=[];let k=0;const wallets={};
 P.open=function(){const s=this.run;
  for(const id of s.queue){const n=s.npcs.find(x=>x.id===id);if(!n||!n.introduced)continue;const last=(n.records||[]).slice(-2);
   const key=(k%R)+'|'+BANDS.findIndex(([a,b])=>s.day>=a&&s.day<=b)+'|'+(last.length===2&&last.every(r=>!r.won)?'losing':'other');
   (wallets[key]??=new Array(201).fill(0))[Math.min(200,Math.floor(Math.max(0,n.money)/10))]++;}
  return open.apply(this,arguments);};
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(seen.has(s))return r;seen.add(s);
  const recs=s.npcs.flatMap(n=>n.records||[]).filter(x=>!x.deep&&x.day<30),ok=x=>x.outcome==='성공'||x.outcome==='대성공';
  const band=([a,b])=>{const l=recs.filter(x=>x.day>=a&&x.day<=b);return [l.filter(ok).length,l.length];};
  const late=recs.filter(x=>x.day>=20);
  rows.push({idx:k++%R,bands:BANDS.map(band),all:band([1,29]),
   out:['대성공','성공','퇴각','부상','중상','사망'].map(o=>recs.filter(x=>x.outcome===o).length),env:recs.filter(x=>x.environmentHurt).length,
   day:s.day,reach:s.day>=30?1:0,win:s.win?1:0,boss:s.bossId||null,end:s.endReason||'',deaths:s.stats.deaths||0,
   zombie:s.day>=25&&late.length?late.filter(ok).length/late.length<.35:false,
   cash:(s.reportHistory||[]).length?((s.reportHistory.at(-1).balance-700)/s.reportHistory.length):0,
   deco:(this.account.store?.owned||[]).length,sales:s.settlement?.sales??s.stats.revenue,gain:s.settlement?.gain??0,rate:s.settlement?.rate??0,
   relics:(s.relicHistory||[]).filter(w=>w.purchased).map(w=>[w.purchased,w.purchaseDay])});
  return r;};
 G.Debug.trajectory({trajectories:T,runs:R,policy,build:'hybrid',prefix:'v2100-'+kind+'-'+part,purchaseOrder:DECO[deco],relicAware:true,relicPriority:RANK});
 return {rows,wallets};
}

if(process.env.V2100_WORKER){process.on('message',j=>{const res=worker(j);process.send({j,...res},()=>process.exit(0));});}
else if(require.main===module){
 const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
 const here=path.resolve(__dirname,'..'),before=flag('--before',null),TT=+flag('--traj',200),FN=+flag('--fresh',1000),R=+flag('--runs',10),out=flag('--out',null);
 const POL=flag('--policies','reader,expert').split(','),DECOS=flag('--decos',null)?.split(',');
 const cpus=Math.max(1,os.cpus().length),PARTS=4,jobs=[];
 const srcs=[['after',here],...(before?[['before',path.resolve(before)]]:[])];
 for(const [src,root] of srcs){
  for(const policy of POL)for(const deco of DECOS||(src==='after'?['none','economy','survival']:['none','survival']))
   for(let p=0;p<PARTS;p++)jobs.push({src,root,kind:'traj',policy,deco,T:Math.ceil(TT/PARTS),R,part:p});
  for(const policy of ['reader','expert','balanced'])for(let p=0;p<PARTS;p++)jobs.push({src,root,kind:'fresh',policy,deco:'none',T:Math.ceil(FN/PARTS),R:1,part:p});
 }
 const acc={},t0=Date.now();let live=0,done=0;const total=jobs.length;
 const finish=()=>{const res={meta:{TT,FN,R,before,head:here,rank:RANK,deco:DECO,sec:Math.round((Date.now()-t0)/1000)},arms:acc};
  if(out)fs.writeFileSync(out,JSON.stringify(res));console.log(summary(res));};
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,V2100_WORKER:'1'}});
  c.on('message',m=>{const key=[m.j.src,m.j.kind,m.j.policy,m.j.deco].join('/');const a=acc[key]??={rows:[],wallets:{}};a.rows.push(...m.rows);for(const [w,h] of Object.entries(m.wallets)){const t=a.wallets[w]??=new Array(201).fill(0);h.forEach((v,i)=>t[i]+=v);}});
  c.on('exit',()=>{live--;done++;process.stderr.write('\r'+done+'/'+total+' jobs · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<cpus;i++)next();
}

function summary(res){
 const L=[],p=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-',sum=(xs,f)=>xs.reduce((v,x)=>v+f(x),0);
 L.push('','v2.10.0 measure · '+res.meta.sec+'s · traj '+res.meta.TT+'x'+res.meta.R+' · fresh '+res.meta.FN);
 for(const [key,a] of Object.entries(res.arms)){const idxs=key.includes('/traj/')?[0,4,9]:[0];
  for(const i of idxs){const rs=a.rows.filter(r=>r.idx===i);if(!rs.length)continue;
   const b=k=>p(sum(rs,r=>r.bands[k][0]),sum(rs,r=>r.bands[k][1])),reach=sum(rs,r=>r.reach),win=sum(rs,r=>r.win);
   L.push(key+(key.includes('/traj/')?' run'+(i+1):'')+' n='+rs.length+' | 성공 '+[0,1,2,3].map(b).join(' / ')+' | D30 '+p(reach,rs.length)+' 클리어|도달 '+p(win,reach)+' 클리어 '+p(win,rs.length)
    +' | 좀비 '+p(rs.filter(r=>r.zombie).length,rs.length)+' | 사망/런 '+(sum(rs,r=>r.deaths)/rs.length).toFixed(2)+' | 장식 '+(sum(rs,r=>r.deco)/rs.length).toFixed(1));}}
 return L.join('\n');
}
module.exports={RANK,DECO,BANDS};
