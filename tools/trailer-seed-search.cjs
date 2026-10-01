// v3.0 trailer tooling (User 2026-10-01). Dev-only, measurement/capture only - nothing injected, no Canonical written. See reports/trailer-plan.md.
// Trailer seed search: real bot play (reader), first-run lessons ON. Find runs that WIN and have a customer X who
// (a) bought a counter item on some day d and that night's record shows it acted (hazard event with the item), outcome 성공/대성공,
// (b) is in the final party. Prints candidates. Nothing injected.
const path=require('node:path');const ROOT=require('node:path').resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const N=Number(process.argv[2]||600),policy=process.argv[3]||'reader';const P=Game.prototype;const out=[];
const st=P.start;P.start=function(s){this.lessons=true;return st.call(this,s);};
const en=P.end;P.end=function(w,why){const s=this.run;const ret=en.call(this,w,why);
 if(s.win&&s.finalReport?.members){const members=new Set(s.finalReport.members.map(m=>m.npcId));
  for(const n of s.npcs){if(!members.has(n.id))continue;
   for(const r of (n.records||[])){const hz=(r.events||[]).find(e=>e.id==='hazard'&&e.items&&e.items.length);
    if(hz&&(r.outcome==='성공'||r.outcome==='대성공'))out.push({seed:s.seed,day:r.day,npc:n.name,npcId:n.id,level:n.level,outcome:r.outcome,items:hz.items.map(i=>DATA.itemBy[i]?.name||i),hazards:hz.hazards,dungeon:r.dungeonName,finalLevel:n.level,members:s.finalReport.members.length});}}}
 return ret;};
Debug.simulate(N,policy,null,'adaptive','hybrid',{});
const wins=new Set(out.map(o=>o.seed));
console.log(JSON.stringify({runs:N,policy,winningSeedsWithCandidate:wins.size,candidates:out.length}));
for(const o of out.slice(0,60))console.log(JSON.stringify(o));
