// v2.9.11 measurement (User 2026-09-28): 응급 처치대 as a Keystone against the six shipped Keystones. Each arm owns ONE support from
// the D10 window on (added at the D10 Morning, no Gold paid), on the `reader` bot, same seeds (revision-0..N-1). Measurement only.
//   node tools/measure-keystone-v2911.cjs <arm> [runs=3000] [out.json]
//   arms: base · logisticsHQ · lifetime · royalCert · expeditionCert · fresh24 · hub · firstAid20 · firstAid30
//   firstAid<N>: an injured visitor recovers on arrival with N% (a separate random source, so the game's seed stream is untouched)
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const arm=process.argv[2]||'base',runs=Number(process.argv[3]||3000),out=process.argv[4],FROM=10;
const heal=/^firstAid(\d+)$/.test(arm)?Number(arm.slice(8))/100:0,own=heal||arm==='base'?null:arm;
if(own&&!DATA.relicBy[own])throw Error('unknown arm '+arm);const P=Game.prototype,tally={heals:0};
const mr=P.morningReset;P.morningReset=function(){const r=mr.apply(this,arguments);const s=this.run;if(own&&s.day===FROM&&!s.facilities.includes(own))s.facilities.push(own);return r;};
/* the forced support may also turn up in a window; the bot then leaves it (already owned) instead of erroring */
const buy=P.buyRelic;P.buyRelic=function(id){if(own&&(this.has(id)||!this.canBuyRelic()))return false;return buy.apply(this,arguments);};
const arrive=P.arrive;P.arrive=function(){const s=this.run,n=s.npcs.find(x=>x.id===s.queue[s.cursor]);
 if(heal&&s.day>=FROM&&n&&n.injury===1&&Math.random()<heal){n.injury=0;n.status='건강';tally.heals++;}return arrive.apply(this,arguments);};
const rows=[];const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);const R=s.npcs.flatMap(n=>n.records||[]);
 rows.push({day:s.day,win:!!s.win,deaths:R.filter(r=>r.outcome==='사망').length,revenue:s.stats.revenue,bal20:(s.reportHistory.find(x=>x.day===20)||{}).balance??null});return ret;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
const N=rows.length,pc=(a)=>+(100*a/N).toFixed(1),med=a=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?v[(v.length-1)>>1]:null;};
const res={arm,runs:N,d20:pc(rows.filter(r=>r.day>=20).length),d30:pc(rows.filter(r=>r.day>=30).length),clear:pc(rows.filter(r=>r.win).length),
 deathsPerRun:+(rows.reduce((a,r)=>a+r.deaths,0)/N).toFixed(2),revenueP50:med(rows.map(r=>r.revenue)),goldD20P50:med(rows.map(r=>r.bal20)),healsPerRun:+(tally.heals/N).toFixed(2)};
console.log(JSON.stringify(res));if(out)fs.writeFileSync(out,JSON.stringify(res,null,1));
