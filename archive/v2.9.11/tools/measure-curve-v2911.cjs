// v2.9.11 measurement (User 2026-09-28): is the injury spiral a growth-curve problem? The DAY 1~9 Gate slope (GATE.early, now 1.50)
// against 1.40 / 1.30 on the `reader` bot, same seeds (revision-0..N-1) per arm. Measurement only: an in-memory patch, no game file changes.
//   node tools/measure-curve-v2911.cjs <early=1.50> [runs=3000] [out.json]
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const early=Number(process.argv[2]||1.5),runs=Number(process.argv[3]||3000),out=process.argv[4];
Dungeon.GATE.early=early;const P=Game.prototype;
/* every departure: Day, prepared Power / Gate Power (the readiness the SALE outlook reads), injured or not */
const dep=[];const night=P.night;P.night=function(){const s=this.run;if(s.phase==='sell')for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(!n||!n.alive)continue;
 const d=this.gateFor(n);if(!d)continue;dep.push({day:s.day,ratio:Dungeon.preparedPower(Dungeon.prepare(n,d,s.facilities).effects)/d.power,inj:n.injury===1,npc:n.id,run:s.seed});}
 return night.apply(this,arguments);};
const arrivals=[];const ar=P.arrive;P.arrive=function(){const r=ar.apply(this,arguments);const n=this.current();if(n)arrivals.push([this.run.day,n.money,n.injury]);return r;};
const rows=[],recs=[];const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);
 const R=s.npcs.flatMap(n=>n.records||[]);for(const r of R)recs.push([r.day,r.outcome,!!r.departedInjured]);
 rows.push({day:s.day,win:!!s.win,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final',deaths:R.filter(r=>r.outcome==='사망').length,
  bal10:(s.reportHistory.find(x=>x.day===10)||{}).balance??null});return ret;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
const N=rows.length,pc=(a,b)=>b?+(100*a/b).toFixed(1):null,med=a=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?+(+v[(v.length-1)>>1]).toFixed(2):null;};
const seg=d=>d<=10?'D1-10':d<=20?'D11-20':'D21-29',S=['D1-10','D11-20','D21-29'],win=o=>o==='성공'||o==='대성공';
const by=S.map(b=>{const R=recs.filter(r=>seg(r[0])===b&&r[0]<30),H=R.filter(r=>!r[2]),I=R.filter(r=>r[2]),Dp=dep.filter(x=>seg(x.day)===b&&x.day<30),A=arrivals.filter(x=>seg(x[0])===b);
 return [b,{departures:R.length,injuredShare:pc(I.length,R.length),healthyWin:pc(H.filter(r=>win(r[1])).length,H.length),healthyInjuredAfter:pc(H.filter(r=>['부상','중상'].includes(r[1])).length,H.length),
  injuredWin:pc(I.filter(r=>win(r[1])).length,I.length),deathShareInjured:pc(I.filter(r=>r[1]==='사망').length,R.filter(r=>r[1]==='사망').length),
  readinessHealthyP50:med(Dp.filter(x=>!x.inj).map(x=>x.ratio)),healthyUnder08:pc(Dp.filter(x=>!x.inj&&x.ratio<.8).length,Dp.filter(x=>!x.inj).length),
  walletP50:med(A.map(x=>x[1])),injuredWalletP50:med(A.filter(x=>x[2]===1).map(x=>x[1]))}];});
const endIn=(k,b)=>pc(rows.filter(r=>r.end===k&&seg(Math.min(r.day,29))===b).length,N);
const res={early,runs:N,d10:pc(rows.filter(r=>r.day>=10).length,N),d20:pc(rows.filter(r=>r.day>=20).length,N),d30:pc(rows.filter(r=>r.day>=30).length,N),clear:pc(rows.filter(r=>r.win).length,N),
 deathsPerRun:+(rows.reduce((a,r)=>a+r.deaths,0)/N).toFixed(2),goldD10P50:med(rows.map(r=>r.bal10)),
 ends:Object.fromEntries(S.map(b=>[b,{deathLimit:endIn('death',b),bankrupt:endIn('bankrupt',b)}])),bands:Object.fromEntries(by)};
console.log(JSON.stringify(res));if(out)fs.writeFileSync(out,JSON.stringify(res,null,1));
