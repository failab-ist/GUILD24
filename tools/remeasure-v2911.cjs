// v2.9.11 re-measure (User 2026-09-28): v2.9.10 (main) against v2.9.11 on the same seeds and bots. MEASUREMENT ONLY.
// Runs against whatever dist/ sits next to this file, so the same file measures both trees (copy it into a v2.9.10
// worktree). It hooks only functions both versions have (morningEvent, arrive, boss, end) and changes nothing.
//   node tools/remeasure-v2911.cjs <policy=reader|balanced> [runs=3000] [out.json]
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const policy=process.argv[2]||'reader',runs=Number(process.argv[3]||3000),out=process.argv[4];const P=Game.prototype;
const cur={events:[],arrivals:[]};
const me=P.morningEvent;P.morningEvent=function(){const r=me.apply(this,arguments);if(this.run.event)cur.events.push(this.run.event.id);return r;};
const ar=P.arrive;P.arrive=function(){const r=ar.apply(this,arguments);const n=this.current();if(n)cur.arrivals.push([this.run.day,n.money,n.injury]);return r;};
let fin=null;const bo=P.boss;P.boss=function(){if(this.run.phase==='final'){try{const t=this.finalPreRoll();fin={power:t.power,boss:t.bossPower,team:t.team?.length??this.run.team.length};}catch(e){fin=null;}}return bo.apply(this,arguments);};
const rows=[],eventTotals={},arrivals=[];
const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);const R=s.npcs.flatMap(n=>n.records||[]);
 for(const id of cur.events)eventTotals[id]=(eventTotals[id]||0)+1;for(const a of cur.arrivals)arrivals.push(a);
 const seg=d=>d<=10?0:d<=20?1:2,dead=[0,0,0];for(const r of R)if(r.outcome==='사망'&&r.day<30)dead[seg(r.day)]++;
 const inj=[[0,0],[0,0],[0,0]];for(const r of R)if(r.day<30){const b=seg(r.day);inj[b][0]++;if(r.departedInjured)inj[b][1]++;}
 rows.push({day:s.day,win:!!s.win,boss:s.bossId,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final',
  deaths:R.filter(r=>r.outcome==='사망').length,dead,inj,revenue:s.stats.revenue,waste:s.stats.waste,events:cur.events.length,uniqueEvents:new Set(cur.events).size,
  final:fin,bal10:(s.reportHistory.find(x=>x.day===10)||{}).balance??null,bal20:(s.reportHistory.find(x=>x.day===20)||{}).balance??null,
  relics:[...(s.facilities||[])]});
 cur.events=[];cur.arrivals=[];fin=null;return ret;};
Debug.simulate(runs,policy,null,'adaptive','hybrid',{});
const N=rows.length,pc=(a,b=N)=>b?+(100*a/b).toFixed(1):null,med=a=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?+(+v[(v.length-1)>>1]).toFixed(2):null;};
const band=[[1,10],[11,20],[21,29]],names=['D1-10','D11-20','D21-29'];
const bosses=[...new Set(rows.map(r=>r.boss))].sort();
const F=rows.filter(r=>r.final);
const res={policy,runs:N,
 reach:{d10:pc(rows.filter(r=>r.day>=10).length),d20:pc(rows.filter(r=>r.day>=20).length),d30:pc(rows.filter(r=>r.day>=30).length)},
 clear:pc(rows.filter(r=>r.win).length),winGivenD30:pc(rows.filter(r=>r.win).length,rows.filter(r=>r.day>=30).length),
 ends:{deathLimit:pc(rows.filter(r=>r.end==='death').length),bankrupt:pc(rows.filter(r=>r.end==='bankrupt').length),finalLoss:pc(rows.filter(r=>r.end==='final').length)},
 deathsPerRun:+(rows.reduce((a,r)=>a+r.deaths,0)/N).toFixed(2),deathsBySegment:names.map((n,i)=>+(rows.reduce((a,r)=>a+r.dead[i],0)/N).toFixed(2)),
 injuredShare:names.map((n,i)=>pc(rows.reduce((a,r)=>a+r.inj[i][1],0),rows.reduce((a,r)=>a+r.inj[i][0],0))),
 walletP50:names.map((n,i)=>med(arrivals.filter(x=>x[0]>=band[i][0]&&x[0]<=band[i][1]).map(x=>x[1]))),
 injuredWalletP50:names.map((n,i)=>med(arrivals.filter(x=>x[0]>=band[i][0]&&x[0]<=band[i][1]&&x[2]===1).map(x=>x[1]))),
 goldP50:{d10:med(rows.map(r=>r.bal10)),d20:med(rows.map(r=>r.bal20))},revenueP50:med(rows.map(r=>r.revenue)),wastePerRun:+(rows.reduce((a,r)=>a+r.waste,0)/N).toFixed(2),
 events:{perRun:+(rows.reduce((a,r)=>a+r.events,0)/N).toFixed(2),repeatsPerRun:+(rows.reduce((a,r)=>a+r.events-r.uniqueEvents,0)/N).toFixed(2),distinctSeen:Object.keys(eventTotals).length,top:Object.entries(eventTotals).sort((a,b)=>b[1]-a[1]).slice(0,5)},
 final:{runs:F.length,ratioP50:med(F.map(r=>r.final.power/r.final.boss)),ratioP10:(()=>{const v=F.map(r=>r.final.power/r.final.boss).sort((a,b)=>a-b);return v.length?+v[Math.floor(v.length*.1)].toFixed(2):null;})(),
  sureWin:pc(F.filter(r=>r.final.power*.88>=r.final.boss).length,F.length),win:pc(F.filter(r=>r.win).length,F.length)},
 perBoss:Object.fromEntries(bosses.map(b=>{const B=rows.filter(r=>r.boss===b),BF=B.filter(r=>r.final);return [b,{runs:B.length,d30:pc(B.filter(r=>r.day>=30).length,B.length),clear:pc(B.filter(r=>r.win).length,B.length),winGivenD30:pc(B.filter(r=>r.win).length,BF.length),ratioP50:med(BF.map(r=>r.final.power/r.final.boss))}];})),
 relicOwnedShare:(()=>{const c={};for(const r of rows)for(const id of r.relics)c[id]=(c[id]||0)+1;return Object.fromEntries(Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k,pc(v)]));})()};
console.log(JSON.stringify(res));if(out)fs.writeFileSync(out,JSON.stringify(res,null,1));
