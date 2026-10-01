// v3.0 trailer tooling (User 2026-10-01). Dev-only, measurement/capture only - nothing injected, no Canonical written. See reports/trailer-plan.md.
// Re-run one real bot game (same seed, same policy, lessons ON) and snapshot {account,run} at the trailer moments. No injection.
//   node snapshot.cjs <seed> <npcId> <day> <out.json> [revisitDay]   (revisitDay: also keep the same customer's arrival that day, trailer v4 §11)
const path=require('node:path'),fs=require('node:fs');const ROOT=require('node:path').resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const [seed,npcId,dayS,outPath,revS]=process.argv.slice(2);const day=Number(dayS),revisitDay=Number(revS||0);const idx=Number(seed.split('-').pop());
const P=Game.prototype,snaps={};const copy=g=>JSON.parse(JSON.stringify({account:g.account,run:g.run,rng:g.rng}));
const st=P.start;P.start=function(s){this.lessons=true;return st.call(this,s);};
const ar=P.arrive;P.arrive=function(){const r=ar.apply(this,arguments);const s=this.run;if(s.seed===seed&&s.day===day&&s.phase==='sell'&&!snaps.sale){const n=this.current();if(n&&n.id===npcId)snaps.sale=copy(this);}
 if(revisitDay&&s.seed===seed&&s.day===revisitDay&&s.phase==='sell'&&!snaps.revisit){const n=this.current();if(n&&n.id===npcId)snaps.revisit=copy(this);}return r;};
const fn=P.finishNight;P.finishNight=function(){const s=this.run;if(s.seed===seed&&s.day===day&&!snaps.night)snaps.night=copy(this);return fn.apply(this,arguments);};
const bo=P.boss;P.boss=function(){const s=this.run;if(s.seed===seed&&!snaps.finalBefore)snaps.finalBefore=copy(this);const r=bo.apply(this,arguments);if(s.seed===seed&&!snaps.finalAfter)snaps.finalAfter=copy(this);return r;};
Debug.simulate(idx+1,'reader',null,'adaptive','hybrid',{});
const info={seed,npcId,day,have:Object.keys(snaps),win:snaps.finalAfter?.run?.win,endDay:snaps.finalAfter?.run?.day,team:snaps.finalBefore?.run?.team,rngKeys:snaps.sale?Object.keys(snaps.sale.rng||{}):null,
 saleCustomer:snaps.sale?snaps.sale.run.npcs.find(n=>n.id===npcId)?.name:null,saleInventory:snaps.sale?snaps.sale.run.inventory.map(x=>DATA.itemBy[x.item]?.name).filter((v,i,a)=>a.indexOf(v)===i):null,
 nightResultsNpcs:snaps.night?snaps.night.run.results.map(r=>r.name+':'+r.outcome):null};
fs.writeFileSync(outPath,JSON.stringify(snaps));console.log(JSON.stringify(info,null,1));
