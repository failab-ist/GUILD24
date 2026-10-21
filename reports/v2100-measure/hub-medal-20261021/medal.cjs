// fresh account, one condition, n fresh runs (new investor bot): none | deco:heroSign | add:<relic>
const fs=require('fs'),path=require('path');const root=process.env.ROOT||'/home/user/GUILD24';
const [cond,nArg]=process.argv.slice(2);const n=+nArg||1000;
const {RANK}=require(root+'/tools/measure-v2100.cjs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,D=G.DATA;const [op,id]=cond.split(':');
const rows=[];
const onRun=(s)=>{const H=s.reportHistory||[];let dep=0;for(const m of s.npcs)for(const x of m.records||[])if(!x.deep)dep++;
  const d0=(s.relicHistory||[]).concat(s.relicWindow?[s.relicWindow]:[]).find(w=>w.milestoneDay===0);
  rows.push({day:s.day,win:!!s.win,deaths:s.stats.deaths,bank:/자금/.test(s.endReason||''),rev:H.reduce((a,h)=>a+h.revenue,0),days:H.length,dep,b15:(H.find(h=>h.day===15)||{}).balance,b10:(H.find(h=>h.day===10)||{}).balance,pick:d0?.purchased||'-'});};
for(let seed=0;seed<n;seed++){const a=G.Meta.fresh();if(op==='deco'||op==='force'){const d=D.decorationBy['heroSign'];a.store.owned.push('heroSign');a.store.loadout[d.slot]='heroSign';}
 const g=new G.Game(a);g.autosave=false;g.start('medal-'+seed);
 if(op==='force'){const w=g.run.relicWindow;w.candidateIds=[id];w.candidatePrices=[0];}
 G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun});}
if(op==='add'){}
fs.writeFileSync(path.join(path.dirname(process.argv[1]),'medal-'+cond.replace(':','_')+'.json'),JSON.stringify(rows));
const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:'-'};
const sum=(k,a)=>{const m=a.length;const reach=d=>(100*a.filter(x=>x.day>=d).length/m).toFixed(1);
 const days=a.reduce((p,x)=>p+x.days,0);
 return `${k.padEnd(14)} n ${String(m).padStart(4)} | 끝난날 중앙 ${med(a.map(x=>x.day))} | D20 ${reach(20)}% D30 ${reach(30)}% 클리어 ${(100*a.filter(x=>x.win).length/m).toFixed(1)}% | 사망 ${(a.reduce((p,x)=>p+x.deaths,0)/m).toFixed(2)} 파산 ${a.filter(x=>x.bank).length} | 손님/일 ${(a.reduce((p,x)=>p+x.dep,0)/days).toFixed(2)} 매출/일 ${(a.reduce((p,x)=>p+x.rev,0)/days).toFixed(0)} | D10 잔액 ${med(a.map(x=>x.b10))} D15 ${med(a.map(x=>x.b15))}`;};
console.log(sum(cond,rows));
if(op==='deco'){const by={};for(const r of rows)(by[r.pick]??=[]).push(r);for(const [k,a] of Object.entries(by).sort((p,q)=>q[1].length-p[1].length))console.log(' 첫날 '+sum(k,a));}
