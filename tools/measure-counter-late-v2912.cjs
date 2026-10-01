// v2.9.12 measurement (User 2026-09-30): raise every Item's direct Hazard Counter value, and/or the DAY 21~30 Gate slope.
// Measurement only: an in-memory patch, no game file changes. Same seeds (revision-0..N-1) per arm.
//   node tools/measure-counter-late-v2912.cjs <counterMult=1> <late=0.80> <policy=reader> [runs=300] [--account account.json]
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const argv=process.argv.slice(2),ai=argv.indexOf('--account'),account=ai>=0?JSON.parse(fs.readFileSync(argv.splice(ai,2)[1],'utf8')):null;
const mult=Number(argv[0]||1),late=Number(argv[1]||.8),policy=argv[2]||'reader',runs=Number(argv[3]||300);
const D=DATA,HAZARDS=['poison','cold','corrosion','bind','mire','fire','fear','dark','whiteout'];
/* every Item that carries a direct Counter: that value x mult, rounded; Stats, supply and everything else untouched */
let patched=0;for(const it of D.items){let hit=false;for(const h of HAZARDS)if((it.effects[h]||0)>0){it.effects[h]=Math.round(it.effects[h]*mult);hit=true;}patched+=hit;}
Dungeon.GATE.late=late;
const P=Game.prototype,rows=[],end=P.end;
P.end=function(w,why){const s=this.run;const r=end.call(this,w,why);const R=s.npcs.flatMap(n=>n.records||[]);
 rows.push({day:s.day,win:!!s.win,revenue:s.stats.revenue,capital:Math.round(s.stats.revenue*Meta.capitalRate(s.day)),deaths:s.stats.deaths,
  ratio:s.bossDebug?s.bossDebug.power/s.bossDebug.bossPower:null,
  late:R.filter(x=>x.day>=21&&x.day<30).map(x=>['성공','대성공'].includes(x.outcome)?1:0)});return r;};
Debug.simulate(runs,policy,account,'adaptive','hybrid',{});
const N=rows.length,pc=(a)=>+(100*a/N).toFixed(1),med=a=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?+(+v[(v.length-1)>>1]).toFixed(2):null;},mean=a=>a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):null;
const lateRec=rows.flatMap(r=>r.late),d30=rows.filter(r=>r.day>=30);
console.log(JSON.stringify({mult,late,policy,account:!!account,runs:N,patchedItems:patched,
 d10:pc(rows.filter(r=>r.day>=10).length),d20:pc(rows.filter(r=>r.day>=20).length),d30:pc(d30.length),clear:pc(rows.filter(r=>r.win).length),
 lateWin:lateRec.length?+(100*lateRec.reduce((a,b)=>a+b,0)/lateRec.length).toFixed(1):null,deaths:mean(rows.map(r=>r.deaths)),
 capitalMean:mean(rows.map(r=>r.capital)),capitalD30Mean:mean(d30.map(r=>r.capital)),revenueD30P50:med(d30.map(r=>r.revenue)),ratioP50:med(rows.map(r=>r.ratio))}));
