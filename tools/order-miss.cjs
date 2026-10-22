#!/usr/bin/env node
/* 발주 실패 대 판매 실패 (User 2026-10-22): for each Day that carries the order trace, the Hazards of that Day's Gates, whether
   a Counter for each was on the sheets, and whether one was bought. Human saves are read as they are; `--bot N` plays N fresh
   investor Runs (G24_BOT_ORACLE=1 for the oracle) and reads the same fields. Reads only; no game value is touched.
   usage: node tools/order-miss.cjs [--bot N] [save.json ...] */
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,D=G.DATA;
const args=process.argv.slice(2),bi=args.indexOf('--bot'),N=bi>=0?+args[bi+1]:0,files=args.filter((a,i)=>a!=='--bot'&&i!==bi+1);
const acc=()=>({days:0,need:0,offered:0,bought:0,offeredNotBought:0,noOffer:0,dayCounters:0,rerollDays:0});
const read=(a,hist)=>{for(const h of hist){if(!h.trace||!h.gates)continue;a.days++;if((h.rerolls||0)>0)a.rerollDays++;
 const need=new Set(h.gates.filter(g=>g[0]!=='final'&&D.familyTiers[g[0]]).flatMap(g=>D.familyTiers[g[0]][(g[1]||1)-1]));
 const sheet=h.trace.sheets.flat().map(x=>D.itemBy[x[0]]).filter(Boolean),bought=h.trace.bought.map(x=>D.itemBy[x[0]]).filter(Boolean);
 for(const hz of need){a.need++;const off=sheet.some(it=>G.Relics.directCounter(it,[hz])),buy=bought.some(it=>G.Relics.directCounter(it,[hz]));
  if(off)a.offered++;else a.noOffer++;if(buy)a.bought++;if(off&&!buy)a.offeredNotBought++;}}};
const line=(k,a)=>{const p=x=>(100*x/Math.max(1,a.need)).toFixed(0)+'%';return `${k.padEnd(10)} 기록 ${String(a.days).padStart(4)}일 · 필요한 위험 ${a.need}개 → 진열대에 대응템 있었음 ${p(a.offered)} · 샀음 ${p(a.bought)} · 있었는데 안 삼 ${p(a.offeredNotBought)} · 진열대에 없었음 ${p(a.noOffer)} · 리롤한 날 ${(100*a.rerollDays/Math.max(1,a.days)).toFixed(0)}%`;};
if(files.length){const H=acc();for(const f of files){const s=JSON.parse(fs.readFileSync(f));read(H,(s.run||s).reportHistory||[]);}console.log(line('사람',H));}
if(N){const B=acc();const {RANK}=require(path.join(root,'tools/measure-v2100.cjs'));
 const onRun=s=>read(B,s.reportHistory||[]);
 for(let i=0;i<N;i++){const g=new G.Game(G.Meta.fresh());g.autosave=false;g.start('om-'+i);G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun});}
 console.log(line(process.env.G24_BOT_ORACLE?'봇 오라클 켬':'봇 끔',B));}
