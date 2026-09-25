// v2.9.2 human-policy calibration (User 2026-09-25): run-level numbers a save keeps across Runs (Store Capital from
// revenue, dungeon knowledge, discovered Items, first-discovery Days), measured on the build the User played (Great
// Success EXP 1.40). Measurement only.   node tools/calibrate-human-v292.cjs <policy> [runs=600]
const R=require('node:path').join(__dirname,'..','dist')+'/';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(R+f+'.js');
const [policy='human',runs='600']=process.argv.slice(2);Dungeon.GREAT.xp=1.40;
const P=Game.prototype,end=P.end,rows=[];
P.end=function(win,reason){const s=this.run,a=this.account;const r=end.call(this,win,reason);
 rows.push({win:!!s.win,day:s.day,deaths:s.stats.deaths,revenue:s.stats.revenue,knowledge:Object.values(a.knowledge||{}).reduce((p,q)=>p+q,0),
  discovered:(a.discovered||[]).length,firsts:Object.fromEntries((a.discoveries||[]).map(e=>[e.id,e.day])),
  sold:s.npcs.reduce((p,n)=>p+(n.history||[]).length,0),modes:s.npcs.flatMap(n=>(n.history||[]).map(h=>h.mode)),
  top:Math.max(...s.npcs.filter(n=>n.alive).map(n=>n.level),0)});return r;};
Debug.simulate(Number(runs),policy,null,'adaptive','hybrid',{});
const q=(v,p)=>{v=[...v].sort((a,b)=>a-b);return v.length?v[Math.floor((v.length-1)*p)]:null};
const sum=(g,name)=>{if(!g.length)return console.log(policy,name,'n=0');const f=k=>g.map(r=>r[k]);
 const m=g.flatMap(r=>r.modes),mc=k=>(m.filter(x=>x===k).length/m.length).toFixed(2);
 const fr=id=>{const d=g.map(r=>r.firsts[id]).filter(x=>x!=null);return d.length?`${(d.length/g.length).toFixed(2)}@D${q(d,.5)}`:'-'};
 console.log(policy,name,'n='+g.length,'revenue p25/50/75',q(f('revenue'),.25),q(f('revenue'),.5),q(f('revenue'),.75),
  '| knowledge',q(f('knowledge'),.25),q(f('knowledge'),.5),q(f('knowledge'),.75),'| discovered',q(f('discovered'),.5),
  '| sold',q(f('sold'),.5),'| deaths',q(f('deaths'),.5),'| top',q(f('top'),.5),'| modes half/full/over',mc('half'),mc('full'),mc('overcharge'),
  '| first prepared',fr('prepared'),'kit',fr('aftercare'),'retreatHeal',fr('retreatHeal'));};
sum(rows.filter(r=>r.win),'cleared');sum(rows.filter(r=>r.day>=30),'reachedD30');sum(rows,'all');
