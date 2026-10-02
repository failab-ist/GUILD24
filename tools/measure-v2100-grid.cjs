// v2.10.0 second pass — late Gate ease x failure Death grid, with a Boss Power back-solve. MEASUREMENT ONLY, dev tool, never part
// of npm test (AGENTS §9-A: run on User approval). Source is not edited: each arm overrides Dungeon.gateEase and the Dungeon.DEATH
// table in its own worker. Reader bot, fresh accounts, best-hybrid Supports (tools/measure-v2100.cjs RANK), relic-aware on.
// The Boss back-solve reads every reached Run's bossDebug (party power, Boss Power) and finds the one multiplier k on Boss Power
// that makes the clear-given-reach chance 40% under the shipped roll (power x U(.88, 1.12) >= Boss Power).
//   node tools/measure-v2100-grid.cjs [--n 1000] [--out file.json]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const RANK=['fresh24','hub','expeditionMeal','kitchen','dawnRecovery','opsRoom','extraOrder','returnPoints','lifetime','member','rotation',
 'firstAidDesk','bulk','board','coldcase','hazardBoard','premiumMember','fieldStretcher','groupOrder','guarantee','royalCert','supplyCert',
 'firstVisitCoupon','fridge','rerollTicket','stamp','warehouse','logisticsHQ','memberBundle','fieldRepair','efficiency','rareContract'];
const LATE={'0.90':.90,'0.95':.95,'1.00':1.00};
const DEATHS={'현행':{combat:.18,environment:.12,cap:.30},'안1':{combat:.40,environment:.20,cap:.50},'안2':{combat:.60,environment:.25,cap:.70}};
const BANDS=[[1,7],[8,14],[15,21],[22,29]];

function worker({late,death,N,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,Dn=G.Dungeon;
 Dn.gateEase=day=>day>=22?LATE[late]:day>=8?.90:.92;
 Object.assign(Dn.DEATH,DEATHS[death]);
 const P=G.Game.prototype,end=P.end,seen=new WeakSet(),rows=[];
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(seen.has(s))return r;seen.add(s);
  const recs=s.npcs.flatMap(n=>n.records||[]).filter(x=>!x.deep&&x.day<30),ok=x=>x.outcome==='성공'||x.outcome==='대성공';
  const band=([a,b])=>{const l=recs.filter(x=>x.day>=a&&x.day<=b);return [l.filter(ok).length,l.length];};
  const fails=recs.filter(x=>!ok(x)),late20=recs.filter(x=>x.day>=20);
  rows.push({bands:BANDS.map(band),day:s.day,reach:s.day>=30?1:0,win:s.win?1:0,end:s.endReason||'',deaths:s.stats.deaths||0,
   zombie:s.day>=25&&late20.length?late20.filter(ok).length/late20.length<.35:false,
   combatFail:[fails.filter(x=>!x.combatWon).length,fails.filter(x=>!x.combatWon&&x.outcome==='사망').length],
   accidentFail:[fails.filter(x=>x.combatWon).length,fails.filter(x=>x.combatWon&&x.outcome==='사망').length],
   boss:s.bossDebug?{power:s.bossDebug.power,boss:s.bossDebug.bossPower,id:s.bossId}:null});
  return r;};
 G.Debug.trajectory({trajectories:N,runs:1,policy:'reader',build:'hybrid',prefix:'v2100g-'+part,relicAware:true,relicPriority:RANK});
 return rows;
}

if(process.env.V2100G_WORKER){process.on('message',j=>{const rows=worker(j);process.send({j,rows},()=>process.exit(0));});}
else if(require.main===module){
 const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
 const N=+flag('--n',1000),out=flag('--out',null),PARTS=4,jobs=[];
 for(const late of Object.keys(LATE))for(const death of Object.keys(DEATHS))for(let p=0;p<PARTS;p++)jobs.push({late,death,N:Math.ceil(N/PARTS),part:p});
 const acc={},t0=Date.now(),total=jobs.length;let live=0,done=0;
 const finish=()=>{const res={meta:{N,late:LATE,deaths:DEATHS,sec:Math.round((Date.now()-t0)/1000)},arms:acc};if(out)fs.writeFileSync(out,JSON.stringify(res));console.log(summary(res));};
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,V2100G_WORKER:'1'}});
  c.on('message',m=>{(acc[m.j.late+'/'+m.j.death]??=[]).push(...m.rows);});
  c.on('exit',()=>{live--;done++;process.stderr.write('\r'+done+'/'+total+' jobs · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<Math.max(1,os.cpus().length);i++)next();
}

// clear chance for one reached Run at Boss multiplier k: P(power x U(.88,1.12) >= k x boss)
const clearAt=(b,k)=>Math.max(0,Math.min(1,(1.12-k*b.boss/b.power)/.24));
function solveK(bs,target=.40){let lo=.5,hi=3;for(let i=0;i<60;i++){const m=(lo+hi)/2,c=bs.reduce((v,b)=>v+clearAt(b,m),0)/bs.length;if(c>target)lo=m;else hi=m;}return (lo+hi)/2;}
function summary(res){
 const L=[],p=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-',sum=(xs,f)=>xs.reduce((v,x)=>v+f(x),0);
 L.push('','v2.10.0 grid · '+res.meta.sec+'s · n='+res.meta.N+' per arm (late ease D22+ / Death)');
 for(const [key,rs] of Object.entries(res.arms)){const n=rs.length,reach=sum(rs,r=>r.reach),win=sum(rs,r=>r.win);
  const ends={};for(const r of rs){const e=r.win?'클리어':r.reach?'마왕실패':/소문/.test(r.end)?'사망한도':/자금/.test(r.end)?'파산':'기타';ends[e]=(ends[e]||0)+1;}
  const cf=[sum(rs,r=>r.combatFail[0]),sum(rs,r=>r.combatFail[1])],af=[sum(rs,r=>r.accidentFail[0]),sum(rs,r=>r.accidentFail[1])];
  const bs=rs.map(r=>r.boss).filter(Boolean),k=bs.length?solveK(bs):null,now=bs.length?bs.reduce((v,b)=>v+clearAt(b,1),0)/bs.length:0;
  L.push(key.padEnd(9)+' 성공 '+[0,1,2,3].map(i=>p(sum(rs,r=>r.bands[i][0]),sum(rs,r=>r.bands[i][1]))).join(' / ')
   +' | D30 '+p(reach,n)+' 클리어 '+p(win,n)+' (도달시 '+p(win,reach)+', 기대 '+(100*now).toFixed(1)+'%)'
   +' | 종료 '+Object.entries(ends).map(([e,c])=>e+' '+p(c,n)).join(' ')+' | 사망/런 '+(sum(rs,r=>r.deaths)/n).toFixed(2)
   +' | 좀비 '+p(rs.filter(r=>r.zombie).length,n)+' | 실패사망 전투 '+p(cf[1],cf[0])+' 사고 '+p(af[1],af[0])
   +' | k(40%) '+(k?k.toFixed(3):'-')+' → 전체 클리어 '+(k?p(reach*.40,n):'-'));}
 return L.join('\n');
}
module.exports={solveK,clearAt};
