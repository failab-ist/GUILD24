#!/usr/bin/env node
/* 과잉 보급과 가망 낮은 손님 지출 (User 2026-10-22): every non-Deep departure is put in one of three classes from what the record holds -
   already strong (bare power / Gate requirement 1.12 or more: wins at the top of the combat swing with no Item), hopeless (prepared ratio under 0.85),
   and the rest - and the Items they carried are counted by class (count and buy cost). Human saves are read as they are; `--bot N` plays
   N fresh investor Runs (G24_BOT_ORACLE=1 for the oracle). Reads only; no game value is touched.
   usage: node tools/spend-fit.cjs [--bot N] [save.json ...] */
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,D=G.DATA;
const args=process.argv.slice(2),bi=args.indexOf('--bot'),N=bi>=0?+args[bi+1]:0,files=args.filter((a,i)=>a!=='--bot'&&i!==bi+1);
const CL=['strong','hopeless','rest'],acc=()=>Object.fromEntries(CL.map(c=>[c,{n:0,items:0,gold:0}]));
const read=(a,recs)=>{for(const r of recs){if(r.deep)continue;const bare=r.bareRatio,prep=1+(r.greatMargin??0);if(bare==null)continue;
 const c=bare>=1.12?'strong':prep<0.85?'hopeless':'rest',x=a[c];x.n++;for(const id of r.items||[]){x.items++;x.gold+=D.itemBy[id]?.buy||0;}}};
const line=(k,a)=>{const n=CL.reduce((s,c)=>s+a[c].n,0),f=c=>`${(100*a[c].n/n).toFixed(0)}% · 칸당 상품 ${(a[c].items/Math.max(1,a[c].n)).toFixed(2)}개 · ${(a[c].gold/Math.max(1,a[c].n)).toFixed(0)}G`;
 const g=CL.reduce((s,c)=>s+a[c].gold,0);return `${k.padEnd(10)} 원정 ${String(n).padStart(5)} | 이미 충분 ${f('strong')} | 가망 낮음 ${f('hopeless')} | 나머지 ${f('rest')} | 상품 원가 중 충분·가망 낮음 몫 ${(100*(a.strong.gold+a.hopeless.gold)/Math.max(1,g)).toFixed(0)}%`;};
if(files.length){const H=acc();for(const f of files){const s=JSON.parse(fs.readFileSync(f));read(H,(s.run||s).npcs.flatMap(m=>m.records||[]));}console.log(line('사람',H));}
if(N){const B=acc();const {RANK}=require(path.join(root,'tools/measure-v2100.cjs'));
 const onRun=s=>read(B,s.npcs.flatMap(m=>m.records||[]));
 for(let i=0;i<N;i++){const g=new G.Game(G.Meta.fresh());g.autosave=false;g.start('sf-'+i);G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun});}
 console.log(line(process.env.G24_BOT_ORACLE?'봇 오라클 켬':'봇 끔',B));}
