// v3.0 prep measurement (User 2026-09-30, rubric §9-4 C1): how many player actions a Run takes. Reads the simulation's own
// interaction-cost proxy (`out.actions`: one tick per action a player performs - an order quantity, a sale, a depart, a phase
// advance, a Final pick) and the Day each Run ended on. Measurement only, nothing written to Canonical.
//   node tools/measure-session-v30.cjs [runs=600]
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const runs=Number(process.argv[2]||600),P=Game.prototype,days=[];const end=P.end;P.end=function(w,why){days.push(this.run.day);return end.call(this,w,why);};
for(const policy of ['balanced','reader']){days.length=0;const r=Debug.simulate(runs,policy,null,'adaptive','hybrid',{});
 const d=[...days].sort((a,b)=>a-b),p=q=>d[Math.floor((d.length-1)*q)];
 console.log(JSON.stringify({policy,runs,actionsPerRun:+r.actionsPerRun.toFixed(1),actionsPerDay:+r.actionsPerDay.toFixed(1),daysMean:+(d.reduce((a,b)=>a+b,0)/d.length).toFixed(1),daysP50:p(.5),daysP90:p(.9),reach30:+(100*r.reachRate).toFixed(1)}));}
