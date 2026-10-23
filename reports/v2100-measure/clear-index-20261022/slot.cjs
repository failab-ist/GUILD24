// 칸별 장식 15판 궤적 (2026-10-22, investor 오라클 끔). 새 계정에서 15판을 이어 가며, 번 점포 자본으로 숙련 1 · 2단과
// 장식 네 칸을 싼 순서로 산다(공짜로 주는 것 없음). 재는 칸은 그 장식을 사거나(empty면 그 칸을 안 삼), 나머지 세 칸은
// 배경 길(economy · survival · operation)의 장식을 산다. 배경 셋에 궤적을 나눠 고정 장식 고른 것이 결론을 정하지 않게 한다.
// 조건: <bg>/<slot>:<decoId|empty>. usage: node slot.cjs <T per bg> <R> <cond,...> [root] [outdir]
const fs=require('fs'),path=require('path'),{fork}=require('child_process');
const [TA,RA,condArg,rootArg,outArg]=process.argv.slice(2);const T=+TA,R=+RA,root=rootArg||'/home/user/GUILD24',out=outArg||process.cwd();
const BG={economy:{sign:'sponsorSign',wall:'honorFrame',counter:'thriftSafe',display:'guildShelf'},survival:{sign:'trainingSign',wall:'infirmaryPlaque',counter:'memorialBook',display:'aidCabinet'},operation:{sign:'cheerBanner',wall:'heroSign',counter:'voucher',display:'rerollCoupon'}};
if(process.env.SW){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,D=G.DATA,{RANK}=require(path.join(root,'tools/measure-v2100.cjs'));
 // continueRun은 count=1이면 늘 'continue-0' 굴림을 쓴다 → 판마다 다른 굴림으로 바꿈
 const R0=G.RNG;G.RNG=class extends R0{constructor(s,st){super(s==='continue-0'&&globalThis.__SEED?globalThis.__SEED:s,st);}};
 const [bg,rest]=process.env.SW.split('/'),[slot,id]=rest.split(':'),FIX={...BG[bg]};if(id==='empty')delete FIX[slot];else FIX[slot]=id;const bgi=Object.keys(BG).indexOf(bg);const rows=[];
 const order=[];const items=[{k:'mastery',p:300},{k:'mastery',p:1200},...Object.entries(FIX).map(([s,d])=>({k:d,p:D.decorationBy[d].price}))].sort((a,b)=>a.p-b.p);
 for(const x of items)order.push(x.k);order.push('mastery','mastery','mastery');
 for(let t=0;t<T;t++){let acc=G.Meta.fresh();const tt=bgi*1000+t;
  for(let i=0;i<R;i++){const g=new G.Game(acc);g.autosave=false;g.lessons=false;g.start('sl-'+tt+'-'+i);globalThis.__SEED='sl-roll-'+tt+'-'+i;
   G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun:(s,gg)=>{gg.end(!!s.win,s.endReason||'측정 종료');acc=gg.account;rows.push({t:tt,i,day:s.day,win:!!s.win,deaths:s.stats.deaths});}});
   let ranks=0;for(const k of order){if(k==='mastery'){if(G.Meta.masteryRank(acc)>ranks++)continue;const nx=D.masteryRanks[G.Meta.masteryRank(acc)];if(!nx||G.Meta.distinctBossClear(acc)<nx.bosses||G.Meta.storeCapital(acc)<nx.price)break;G.Meta.buyMastery(acc);continue;}
    if(G.Meta.decorationOwned(acc,k))continue;if(G.Meta.storeCapital(acc)<D.decorationBy[k].price)break;G.Meta.buyDecoration(acc,k);}
   rows[rows.length-1].owned=acc.store.owned.length;rows[rows.length-1].mastery=G.Meta.masteryRank(acc);}}
 fs.writeFileSync(path.join(out,process.env.SW.replace(/[:/]/g,'_')+'.json'),JSON.stringify(rows));process.exit(0);}
const q=condArg.split(','),t0=Date.now(),W=require('os').cpus().length;let live=0;
const next=()=>{if(!q.length){if(!live)console.error('done '+Math.round((Date.now()-t0)/1000)+'s');return;}const c=q.shift();live++;
 fork(__filename,process.argv.slice(2),{env:{...process.env,SW:c}}).on('exit',code=>{live--;console.error(c+' exit '+code+' '+Math.round((Date.now()-t0)/1000)+'s');next();});};
for(let i=0;i<W;i++)next();
