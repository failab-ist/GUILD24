// Single-Decoration contribution — MEASUREMENT ONLY, dev tool, never part of npm test.
// Same seeds; a fresh account wearing exactly one Decoration vs wearing none. Every Run is new.
//   node tools/deco-single.cjs [seeds=1000] [--policy reader] [--aware] [--rank] [--set '{"memorialBook":{"deathLimitBonus":1}}'] [--sets a+b+c+d,...] [--out file]
// --rank: best-hybrid Supports (tools/measure-v2100.cjs RANK). Also reports ordinary success by Day band, clear-given-reach and
// the zombie line (D25+ with D20+ ordinary success under 35%), read off each Run's records. A second line (└) carries the v2.9.6
// deco-impact metrics: mean Day reached, deaths a Run, bankrupt ends, Store Capital a Run (Δ ± SE), Gross Sales, visitors a Day, end money, core level.
// --sets: measure whole loadouts (ids joined with +) instead of one Decoration each.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function load(){for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;}
if(process.env.DECO_WORKER){
 process.on('message',({id,N,policy,aware,set,rank})=>{const G=load(),P=G.Game.prototype,end=P.end,seen=new WeakSet(),rows=[];
  P.end=function(){const r=end.apply(this,arguments),s=this.run;if(seen.has(s))return r;seen.add(s);
   const recs=s.npcs.flatMap(n=>n.records||[]).filter(x=>!x.deep&&x.day<30),ok=x=>x.outcome==='성공'||x.outcome==='대성공',late=recs.filter(x=>x.day>=20);
   rows.push({b:[[1,7],[8,14],[15,21],[22,29]].map(([a,c])=>{const l=recs.filter(x=>x.day>=a&&x.day<=c);return [l.filter(ok).length,l.length];}),
    reach:s.day>=30?1:0,win:s.win?1:0,zombie:s.day>=25&&late.length&&late.filter(ok).length/late.length<.35?1:0});return r;};if(set)for(const [k,v] of Object.entries(set))Object.assign(G.DATA.decorationParams[k]??={},v);
  const a=G.Meta.fresh();if(id!=='none')for(const x of id.split('+')){G.Meta.addCapital(a,G.DATA.decorationBy[x].price);G.Meta.buyDecoration(a,x);}
  const r=G.Debug.simulate(N,policy,a,'adaptive','hybrid',{relicAware:aware,relicPriority:rank?require('./measure-v2100.cjs').RANK:undefined});
  const sum=f=>rows.reduce((v,x)=>v+f(x),0),bands=[0,1,2,3].map(i=>sum(x=>x.b[i][0])/Math.max(1,sum(x=>x.b[i][1])));
  const mean=v=>v.length?v.reduce((x,y)=>x+y,0)/v.length:0,se=v=>{const m=mean(v);return v.length>1?Math.sqrt(v.reduce((x,y)=>x+(y-m)**2,0)/(v.length-1)/v.length):0;};
  const days=Object.values(r.days),visitors=days.reduce((x,d)=>x+d.visitors,0)/Math.max(1,days.reduce((x,d)=>x+d.samples,0));
  /* v2.9.6 deco-impact metrics (User 2026-10-12: every Decoration read on the same table, economy and survival alike) */
  process.send({id,reach:r.reach30,win:r.clearsPerRun,deaths:r.deathsMedian,deathFail:r.deathFailRate,bands,zombie:sum(x=>x.zombie)/rows.length,
   avgDay:r.averageDay,deathsMean:r.averageDeaths,endBankrupt:r.endedBy.bankrupt/N,capital:mean(r.settlement.gains),capitalSe:se(r.settlement.gains),
   sales:mean(r.settlement.sales),visitors,endMoney:r.averageMoney,coreLevel:r.coreLevelMedian},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),flag=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const N=Number(args.find((a,i)=>/^\d+$/.test(a)&&!['--policy','--set','--out','--sets'].includes(args[i-1])))||1000,policy=flag('--policy')||'reader',aware=args.includes('--aware'),rank=args.includes('--rank');
 const set=flag('--set')?JSON.parse(flag('--set')):null;
 const G0=load(),ids=['none',...(flag('--sets')?flag('--sets').split(','):G0.DATA.decorations.map(d=>d.id))],res={};let live=0;const q=ids.slice();
 const next=()=>{if(!q.length){if(!live)done();return;}const id=q.shift();live++;const c=fork(__filename,[],{env:{...process.env,DECO_WORKER:'1'}});
  c.on('message',m=>{res[m.id]=m;});c.on('exit',()=>{live--;next();});c.send({id,N,policy,aware,set,rank});};
 const done=()=>{const b=res.none;for(const id of ids){const r=res[id];console.log(id.padEnd(16),'D30 '+(100*r.reach).toFixed(1).padStart(5)+'% ('+(r.reach>=b.reach?'+':'')+(100*(r.reach-b.reach)).toFixed(1)+')','clear '+(100*r.win).toFixed(1).padStart(5)+'% ('+(r.win>=b.win?'+':'')+(100*(r.win-b.win)).toFixed(1)+')','deathFail '+(100*r.deathFail).toFixed(0)+'%','| clear|reach '+(r.reach?(100*r.win/r.reach).toFixed(1):'-')+'%','| 성공 '+(r.bands||[]).map(x=>(100*x).toFixed(1)).join(' / '),'| 좀비 '+(100*(r.zombie||0)).toFixed(1)+'%');
  console.log(''.padEnd(16),'└ 평균 도달일 '+r.avgDay.toFixed(1),'| 판당 사망 '+r.deathsMean.toFixed(2),'| 파산 종료 '+(100*r.endBankrupt).toFixed(1)+'%',
   '| 점포자본/판 '+Math.round(r.capital)+' ('+(r.capital>=b.capital?'+':'')+Math.round(r.capital-b.capital)+'±'+Math.round(Math.hypot(r.capitalSe,b.capitalSe))+')',
   '| 매출/판 '+Math.round(r.sales)+' ('+(r.sales>=b.sales?'+':'')+Math.round(r.sales-b.sales)+')','| 하루 방문객 '+r.visitors.toFixed(2),'| 끝 잔액 '+Math.round(r.endMoney),'| 핵심 레벨 '+(+r.coreLevel).toFixed(1));}
  if(flag('--out'))fs.writeFileSync(flag('--out'),JSON.stringify({N,policy,aware,rank,set,results:res},null,1));};
 for(let i=0;i<os.cpus().length;i++)next();}
