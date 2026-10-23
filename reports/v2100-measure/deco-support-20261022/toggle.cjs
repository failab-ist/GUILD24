// fresh account, new investor bot, same seeds per condition: none | deco:<id> | relic:<id>
// usage: node toggle.cjs <n> <cond,cond,...> [root] [outdir]
const fs=require('fs'),path=require('path'),{fork}=require('child_process');
const [nArg,condArg,rootArg,outArg]=process.argv.slice(2);const n=+nArg||1000,root=rootArg||'/home/user/GUILD24',out=outArg||__dirname;
if(process.env.TW){
 const cond=process.env.TW;const {RANK}=require('/home/user/GUILD24/tools/measure-v2100.cjs');
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,D=G.DATA;let [op,id]=cond.split(':');const rows=[];
 // relicAt:<id>@<day>: same Run up to that window, then the Support is added free when the window opens (only Runs that reached the day count)
 if(op==='relicAt'){const [rid,dd]=id.split('@'),N=+dd,P=G.Game.prototype,orig=P.relicWindow;
  P.relicWindow=function(day){const r=orig.apply(this,arguments),s=this.run;if(day===N&&s&&!s.facilities.includes(rid)){s.facilities.push(rid);const w=s.relicWindow;const k=w?w.candidateIds.indexOf(rid):-1;if(k>=0){w.candidateIds.splice(k,1);w.candidatePrices.splice(k,1);}}return r;};}
 const onRun=(s)=>{const H=s.reportHistory||[];let dep=0,fat=0,fatHi=0;for(const m of s.npcs)for(const x of m.records||[])if(!x.deep){dep++;}
  rows.push({day:s.day,win:!!s.win,deaths:s.stats.deaths,bank:/자금/.test(s.endReason||''),rev:H.reduce((a,h)=>a+h.revenue,0),days:H.length,dep,
   b10:(H.find(h=>h.day===10)||{}).balance,b15:(H.find(h=>h.day===15)||{}).balance,b20:(H.find(h=>h.day===20)||{}).balance,b25:(H.find(h=>h.day===25)||{}).balance,
   epic:s.facilities.filter(x=>D.relicBy[x]?.rarity===3).length,rare:s.npcs.filter(m=>m.introduced!==false&&m.rarity>=2).length,
   // 손님 수급 (2026-10-22): 원정을 한 손님 수, 그 손님들의 재방문 원정, 레벨 상위 4명 평균, 최종 파티
   npcs:s.npcs.filter(m=>(m.records||[]).some(x=>!x.deep)).length,top4:[...s.npcs].sort((a,b)=>b.level-a.level).slice(0,4).reduce((a,m,_,l)=>a+m.level/l.length,0),
   party:(s.finalLock?.members||[]).map(x=>{const n=s.npcs.find(n=>n.id===x.npcId);return n?[n.rarity,n.level]:null;}).filter(Boolean),pw:s.bossDebug?s.bossDebug.power/s.bossDebug.bossPower:null});};
 for(let seed=0;seed<n;seed++){const a=G.Meta.fresh();
  if(op==='deco'){const d=D.decorationBy[id];a.store.owned.push(id);a.store.loadout[d.slot]=id;}
  const g=new G.Game(a);g.autosave=false;g.start('tg-'+seed);
  if(op==='relic'){const s=g.run;if(!s.facilities.includes(id))s.facilities.push(id);const w=s.relicWindow;if(w){const k=w.candidateIds.indexOf(id);if(k>=0){w.candidateIds.splice(k,1);w.candidatePrices.splice(k,1);}}}
  G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun});}
 fs.writeFileSync(path.join(out,cond.replace(':','_')+'.json'),JSON.stringify(rows));process.exit(0);
}else{
 const q=condArg.split(',');let live=0;const t0=Date.now();const W=require('os').cpus().length;
 const next=()=>{if(!q.length){if(!live){console.error('done '+Math.round((Date.now()-t0)/1000)+'s');}return;}const c=q.shift();live++;
  fork(__filename,process.argv.slice(2),{env:{...process.env,TW:c}}).on('exit',code=>{live--;console.error(c+' exit '+code+' '+Math.round((Date.now()-t0)/1000)+'s');next();});};
 for(let i=0;i<W;i++)next();
}
