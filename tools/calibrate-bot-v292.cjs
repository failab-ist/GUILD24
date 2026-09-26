// v2.9.2 bot calibration against a real Run (User 2026-09-26: improve the harness before judging balance with it).
// Measurement only. The same metrics are read from the User's exported save and from simulated Runs, from the same
// fields (npc.records / npc.history / run.reportHistory), so the two sides cannot measure different things.
//   node tools/calibrate-bot-v292.cjs --profile <save.json> <profile.json>   extract the User's profile (derived numbers only)
//   node tools/calibrate-bot-v292.cjs <policy> [runs=300] [profile.json]      simulate and print bot vs User
const fs=require('node:fs'),path=require('node:path');
function metrics(run,deathLimit){
 const R=run.npcs.flatMap(n=>n.records||[]),H=run.npcs.flatMap(n=>n.history||[]),rh=run.reportHistory||[];
 const early=R.filter(r=>r.day<=10),eh=H.filter(h=>h.day<=10),er=rh.filter(r=>r.day<=10);
 const share=(a,f)=>a.length?a.filter(f).length/a.length:null,mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
 const med=a=>{if(!a.length)return null;const v=[...a].sort((x,y)=>x-y);return v[(v.length-1)>>1];};
 const top3=day=>{const lv={};for(const r of R)if(r.day<=day)lv[r.npcId]=r.level;const v=Object.values(lv).sort((a,b)=>b-a).slice(0,3);return v.length?mean(v):null;};
 return {
  endDay:run.day,cleared:!!run.win,deaths:run.stats.deaths,deathLimit,
  e_itemsPerExped:mean(early.map(r=>r.items.length)),e_bare:share(early,r=>!r.items.length),
  e_full:share(eh,h=>h.mode==='full'),e_half:share(eh,h=>h.mode==='half'),e_over:share(eh,h=>h.mode==='overcharge'),
  e_success:share(early,r=>r.outcome==='성공'||r.outcome==='대성공'),e_great:share(early,r=>r.outcome==='대성공'),
  e_retreat:share(early,r=>r.outcome==='퇴각'),e_hurt:share(early,r=>r.outcome==='부상'||r.outcome==='중상'),e_death:share(early,r=>r.outcome==='사망'),
  e_ready:med(early.map(r=>1+(r.greatMargin||0))),e_level:med(early.map(r=>r.level)),
  e_salesPerDay:mean(er.map(r=>r.sales||0)),e_revenuePerDay:mean(er.map(r=>r.revenue||0)),
  e_profitPerDay:mean(er.map(r=>(r.revenue||0)-(r.spent||0)-(r.operating||0))),e_deathsByD10:early.filter(r=>r.outcome==='사망').length,
  top3_D10:top3(10),top3_D20:run.day>=20?top3(20):null,top3_D30:run.day>=30?top3(30):null,
  bossRatio:run.bossDebug?run.bossDebug.power/run.bossDebug.bossPower:null};
}
const KEYS=['e_itemsPerExped','e_bare','e_full','e_half','e_over','e_ready','e_level','e_success','e_great','e_retreat','e_hurt','e_death',
 'e_salesPerDay','e_revenuePerDay','e_profitPerDay','e_deathsByD10','top3_D10','top3_D20','top3_D30','bossRatio','deaths','endDay'];
const load=()=>{for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(__dirname,'..','dist',f+'.js'));};
if(process.argv[2]==='--profile'){load();const j=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
 const m=metrics(j.run,Meta.deathLimit(j.run));fs.writeFileSync(process.argv[4],JSON.stringify({source:path.basename(process.argv[3]),seed:j.run.seed,...m},null,1)+'\n');
 console.log(m);return;}
load();
const policy=process.argv[2]||'reader',runs=Number(process.argv[3]||300),prof=process.argv[4]?JSON.parse(fs.readFileSync(process.argv[4],'utf8')):null;
const P=Game.prototype,end=P.end,rows=[];
P.end=function(w,why){const s=this.run;const r=end.call(this,w,why);rows.push(metrics(s,Meta.deathLimit(s)));return r;};
Debug.simulate(runs,policy,null,'adaptive','hybrid',{});
const agg=(set,k)=>{const v=set.map(r=>r[k]).filter(x=>x!==null&&x!==undefined&&!Number.isNaN(x));if(!v.length)return null;const s=[...v].sort((a,b)=>a-b);return {mean:v.reduce((a,b)=>a+b,0)/v.length,p50:s[(s.length-1)>>1],p90:s[Math.floor((s.length-1)*.9)],n:v.length};};
const reached10=rows.filter(r=>r.endDay>=10);
/* A User-like start: by D10 at least the User's top-3 level and at most one death. The User's two fresh Runs both cleared,
   so this lens asks how often a start like theirs ends in a clear on the build being measured. */
const likeUser=prof?reached10.filter(r=>r.top3_D10>=prof.top3_D10-1e-9&&r.e_deathsByD10<=1):[];
const f=x=>x===null||x===undefined?'-':Math.abs(x)>=100?x.toFixed(0):x.toFixed(2);
console.log(`${policy} ${runs} runs · reach10 ${(reached10.length/rows.length).toFixed(2)} · reach20 ${(rows.filter(r=>r.endDay>=20).length/rows.length).toFixed(2)} · reach30 ${(rows.filter(r=>r.endDay>=30).length/rows.length).toFixed(2)} · clear ${(rows.filter(r=>r.cleared).length/rows.length).toFixed(3)}`);
if(prof)console.log(`User-like starts (D10 top-3 >= ${prof.top3_D10.toFixed(2)}, <= 1 death by D10): ${likeUser.length} of ${rows.length} · reach30 ${likeUser.length?(likeUser.filter(r=>r.endDay>=30).length/likeUser.length).toFixed(2):'-'} · clear ${likeUser.length?(likeUser.filter(r=>r.cleared).length/likeUser.length).toFixed(2):'-'}`);
console.log('metric'.padEnd(18)+'User'.padStart(9)+'bot mean'.padStart(10)+'bot p50'.padStart(9)+'bot p90'.padStart(9)+'   (early = D1-10, runs that reached D10)');
for(const k of KEYS){const set=k.startsWith('e_')||k==='top3_D10'?reached10:rows,a=agg(set,k);
 console.log(k.padEnd(18)+f(prof?.[k]).padStart(9)+(a?f(a.mean):'-').padStart(10)+(a?f(a.p50):'-').padStart(9)+(a?f(a.p90):'-').padStart(9)+(a?'   n'+a.n:''));}
