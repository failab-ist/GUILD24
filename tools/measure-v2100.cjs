// The standard balance measurement (AGENTS §9-B) — MEASUREMENT ONLY, dev tool, never part of npm test (AGENTS §9-A: run on
// User approval). Best-hybrid Supports (relicPriority = the clear ranking of archive/v2.9.13/relic-balance/EVALUATION.md) with the relic-aware
// layer on, Decorations bought from earned Capital in a named order (cheapest first). Per arm it reports ordinary success by Day band,
// D30 reach / clear, deaths, a zombie line and the Decorations bought; a second line the end reasons (death limit, bankruptcy,
// Final lost), the median end Day, deaths by DAY 10, injured departures and their deaths, the four highest-Level adventurers
// against the rest, cash per Day and the Capital gain. The JSON (--out) also keeps accidents, visit Wallets and every Support's runs.
//   node tools/measure-v2100.cjs [--before <root>] [--traj 200] [--fresh 1000] [--runs 10] [--policies reader,expert] [--decos none,economy] [--out file.json]
// Each Run row also carries its Store Capital settlement (sales, rate, gain).
// --before points at a checkout of the pre-change source (with this harness's relicPriority option); omit it to measure HEAD only.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const RANK=['fresh24','hub','expeditionMeal','kitchen','dawnRecovery','opsRoom','extraOrder','returnPoints','lifetime','member','rotation',
 'firstAidDesk','bulk','board','coldcase','hazardBoard','premiumMember','fieldStretcher','groupOrder','guarantee','royalCert','supplyCert',
 'firstVisitCoupon','fridge','rerollTicket','stamp','warehouse','logisticsHQ','memberBundle','fieldRepair','efficiency','rareContract'];
const DECO={none:[],economy:['guildShelf','thriftSafe','honorFrame','sponsorSign'],survival:['aidCabinet','memorialBook','infirmaryPlaque','trainingSign']};
const BANDS=[[1,7],[8,14],[15,21],[22,29]];
// The four highest-Level adventurers at the Run's end against everyone else: [wins, expeditions, deaths] each
function split(npcs,ok){const top=new Set([...npcs].sort((a,b)=>b.level-a.level).slice(0,4)),out={top:[0,0,0],rest:[0,0,0]};
 for(const n of npcs){const t=out[top.has(n)?'top':'rest'];for(const x of n.records||[]){if(x.deep||x.day>=30)continue;t[1]++;if(ok(x))t[0]++;if(x.outcome==='사망')t[2]++;}}
 return out;}
const endKind=r=>r.win?'클리어':r.reach?'마왕실패':/소문/.test(r.end)?'사망한도':/자금/.test(r.end)?'파산':'기타';

// 기준 측정은 플레이어와 같은 첫 계정 보호를 사용한다. 다음 런 여부는 Game.start가 판단한다.
function useFirstRunLessons(P){const start=P.start;P.start=function(){this.lessons=true;return start.apply(this,arguments);};}

// 직업 비교는 노출/희귀도/시작 레벨을 함께 읽는다. 서로 다른 직업의 성과를 인과 효과로 해석하지 않는다.
function jobMetrics(s,initial,jobBy,preparedPower){
 const jobs={},get=id=>jobs[id]??={name:jobBy[id].name,npcs:0,alive:0,exp:0,wins:0,combatLoss:0,env:0,deaths:0,
  firstLevel:0,level:0,levelGain:0,potential:0,mastery:0,firstDay:0,bands:BANDS.map(()=>[0,0,0,0,0]),rarities:{},
  finalRuns:0,finalWins:0,finalPicks:0,finalLevel:0,finalGap:0,finalPower:0};
 for(const n of s.npcs){const rs=(n.records||[]).filter(r=>!r.deep&&r.day<30);if(!rs.length)continue;
  const start=initial.get(n);if(!start)throw Error('직업 시작 상태 누락: '+n.id);
  const b=get(n.job);b.npcs++;b.alive+=!!n.alive;b.firstLevel+=start.level;b.level+=n.level;b.levelGain+=n.level-start.level;
  b.potential+=n.potential;b.mastery+=start.mastery;b.firstDay+=start.day;
  const rarity=b.rarities[n.rarity]??={npcs:0,exp:0,wins:0,combatLoss:0,env:0,deaths:0};rarity.npcs++;
  for(const r of rs){const win=Number(r.outcome==='성공'||r.outcome==='대성공'),loss=Number(r.combatWon===false),env=Number(!!r.environmentHurt),dead=Number(r.outcome==='사망');
   for(const x of [b,rarity]){x.exp++;x.wins+=win;x.combatLoss+=loss;x.env+=env;x.deaths+=dead;}
   const band=BANDS.findIndex(([a,z])=>r.day>=a&&r.day<=z);const t=b.bands[band];t[0]+=win;t[1]++;t[2]+=loss;t[3]+=env;t[4]+=dead;}}
 const members=[],hazards=s.dungeons[0]?.hazards||[];
 for(const m of s.finalLock?.members||[]){const n=s.npcs.find(n=>n.id===m.npcId);if(!n||!hazards.length)throw Error('최종 직업 상태 누락');
  const gap=m.hazard/Math.sqrt(hazards.length),power=preparedPower(m.stats)-2.5*gap,b=get(n.job);
  b.finalPicks++;b.finalLevel+=n.level;b.finalGap+=gap;b.finalPower+=power;
  const items=[...(s.finalReport?.members.find(x=>x.npcId===n.id)?.items||[])];
  members.push({job:n.job,level:n.level,rarity:n.rarity,potential:n.potential,regular:m.regular,gap,power,items});}
 for(const id of new Set(members.map(m=>m.job))){const b=get(id);b.finalRuns++;b.finalWins+=!!s.win;}
 const final=members.length?{power:s.bossDebug.power,bossPower:s.bossDebug.bossPower,fire:s.finalLock.families.includes('golem'),
  supplied:members.every(m=>m.items.length>0),fullPack:members.every(m=>m.items.length===2),members}:null;
 if(final&&Math.abs(members.reduce((a,m)=>a+m.power,0)-final.power)>1e-6)throw Error('최종 직업 기여 합계 불일치');
 return {jobs,final};
}

function worker({root,kind,policy,deco,T,R,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,P=G.Game.prototype,end=P.end,open=P.open,seen=new WeakSet(),initial=new WeakMap(),rows=[];let k=0;const wallets={};
 useFirstRunLessons(P);
 P.open=function(){const s=this.run;
  for(const id of s.queue){const n=s.npcs.find(x=>x.id===id);if(!n)continue;
   if(!initial.has(n))initial.set(n,{level:n.level,day:s.day,mastery:G.Meta.jobMastery(this.account,n.job)});
   if(!n.introduced)continue;const last=(n.records||[]).slice(-2);
   const key=(k%R)+'|'+BANDS.findIndex(([a,b])=>s.day>=a&&s.day<=b)+'|'+(last.length===2&&last.every(r=>!r.won)?'losing':'other');
   (wallets[key]??=new Array(201).fill(0))[Math.min(200,Math.floor(Math.max(0,n.money)/10))]++;}
  return open.apply(this,arguments);};
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(seen.has(s))return r;seen.add(s);
  const recs=s.npcs.flatMap(n=>n.records||[]).filter(x=>!x.deep&&x.day<30),ok=x=>x.outcome==='성공'||x.outcome==='대성공';
  const band=([a,b])=>{const l=recs.filter(x=>x.day>=a&&x.day<=b);return [l.filter(ok).length,l.length];};
  const late=recs.filter(x=>x.day>=20);
  rows.push({seed:s.seed,idx:k++%R,firstRun:!!s.firstRun,bands:BANDS.map(band),all:band([1,29]),...jobMetrics(s,initial,G.DATA.jobBy,G.Dungeon.preparedPower),
   out:['대성공','성공','퇴각','부상','중상','사망'].map(o=>recs.filter(x=>x.outcome===o).length),env:recs.filter(x=>x.environmentHurt).length,
   day:s.day,reach:s.day>=30?1:0,win:s.win?1:0,boss:s.bossId||null,end:s.endReason||'',deaths:s.stats.deaths||0,
   zombie:s.day>=25&&late.length?late.filter(ok).length/late.length<.35:false,
   d10:recs.filter(x=>x.day<=10&&x.outcome==='사망').length,injDep:recs.filter(x=>x.departedInjured).length,
   d2:recs.filter(x=>x.day<=2&&x.outcome==='사망').length,
   injDeath:recs.filter(x=>x.departedInjured&&x.outcome==='사망').length,
   core:split(s.npcs,ok),
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
  for(const policy of POL)for(let p=0;p<PARTS;p++)jobs.push({src,root,kind:'fresh',policy,deco:'none',T:Math.ceil(FN/PARTS),R:1,part:p});
 }
 const acc={},t0=Date.now();let live=0,done=0,failed=false;const total=jobs.length;
 const finish=()=>{if(failed){process.exitCode=1;return;}const res={meta:{TT,FN,R,before,head:here,rank:RANK,deco:DECO,sec:Math.round((Date.now()-t0)/1000),schema:3,firstRunLessons:true},arms:acc};
  if(out)fs.writeFileSync(out,JSON.stringify(res));console.log(summary(res));};
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,V2100_WORKER:'1'}});let received=false;
  c.on('message',m=>{received=true;const key=[m.j.src,m.j.kind,m.j.policy,m.j.deco].join('/');const a=acc[key]??={rows:[],wallets:{}};a.rows.push(...m.rows);for(const [w,h] of Object.entries(m.wallets)){const t=a.wallets[w]??=new Array(201).fill(0);h.forEach((v,i)=>t[i]+=v);}});
  c.on('exit',code=>{if(code||!received){failed=true;process.stderr.write('\n측정 worker 실패: '+JSON.stringify(j)+' code='+code+'\n');}live--;done++;process.stderr.write('\r'+done+'/'+total+' jobs · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<cpus;i++)next();
}

function summary(res){
 const L=[],p=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-',sum=(xs,f)=>xs.reduce((v,x)=>v+f(x),0);
 L.push('','balance measure · '+res.meta.sec+'s · traj '+res.meta.TT+'x'+res.meta.R+' · fresh '+res.meta.FN);
 for(const [key,a] of Object.entries(res.arms)){const idxs=key.includes('/traj/')?[0,4,9]:[0];
  for(const i of idxs){const rs=a.rows.filter(r=>r.idx===i);if(!rs.length)continue;
   const b=k=>p(sum(rs,r=>r.bands[k][0]),sum(rs,r=>r.bands[k][1])),reach=sum(rs,r=>r.reach),win=sum(rs,r=>r.win);
   L.push(key+(key.includes('/traj/')?' run'+(i+1):'')+' n='+rs.length+' | 성공 '+[0,1,2,3].map(b).join(' / ')+' | D30 '+p(reach,rs.length)+' 클리어|도달 '+p(win,reach)+' 클리어 '+p(win,rs.length)
    +' | 좀비 '+p(rs.filter(r=>r.zombie).length,rs.length)+' | 사망/런 '+(sum(rs,r=>r.deaths)/rs.length).toFixed(2)+' | 장식 '+(sum(rs,r=>r.deco)/rs.length).toFixed(1));
   const ends={};for(const r of rs)ends[endKind(r)]=(ends[endKind(r)]||0)+1;const ds=rs.map(r=>r.day).sort((a,b)=>a-b),avg=f=>(sum(rs,f)/rs.length);
   const grp=g=>p(sum(rs,r=>r.core?.[g][0]||0),sum(rs,r=>r.core?.[g][1]||0))+' · 사망 '+avg(r=>r.core?.[g][2]||0).toFixed(2);
   L.push('  └ 종료 '+Object.entries(ends).sort((a,b)=>b[1]-a[1]).map(([e,c])=>e+' '+p(c,rs.length)).join(' ')+' | 끝난 날 중앙 '+ds[ds.length>>1]
    +' | D10까지 사망 '+avg(r=>r.d10||0).toFixed(2)+' | 부상 출발/런 '+avg(r=>r.injDep||0).toFixed(1)+' (사망 '+p(sum(rs,r=>r.injDeath||0),sum(rs,r=>r.injDep||0))+')'
    +' | 상위 4명 성공 '+grp('top')+' · 나머지 '+grp('rest')+' | 현금/일 '+avg(r=>r.cash).toFixed(0)+' | 자본 '+avg(r=>r.gain).toFixed(0));}}
 return L.join('\n');
}
module.exports={RANK,DECO,BANDS,split,endKind,jobMetrics,useFirstRunLessons};
