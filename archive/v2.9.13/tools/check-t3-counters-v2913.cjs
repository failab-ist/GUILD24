// v2.9.13 check (User 2026-09-30): one adventurer of each Job at Level 12 against a Tier 3 crypt / snow / golem Gate on D25,
// resolved 2,000 times per Bag. MEASUREMENT ONLY. Shows which Bag closes the gap where that Job is weak.
//   node tools/check-t3-counters-v2913.cjs
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const copy=x=>JSON.parse(JSON.stringify(x));
const GATES={crypt:[[],['candy'],['wine'],['holylight'],['cryptlantern'],['battery'],['herbtea'],['herbtea','battery'],['herbtea','holylight'],['coffee','wine'],['coffee','holylight'],['wine','battery']],
 snow:[[],['ramen'],['snowgoggles'],['hood'],['snowvisor'],['dragonramen'],['herbtea'],['herbtea','dragonramen'],['herbtea','hood'],['water','snowgoggles'],['water','hood'],['dragonramen','snowgoggles']],
 golem:[[],['ice'],['ion'],['magmagear'],['herbtea'],['herbtea','ion'],['energy','ion'],['energy','magmagear']]};
const K=2000;
for(const fam of Object.keys(GATES))for(const [job,lv] of [['warrior',12],['archer',12],['mage',12],['priest',12]]){
 const n0=Adventurer.create(new RNG('t3s',1),1,5,Meta.fresh());const jb=DATA.jobBy[job];
 const n={...copy(n0),job,level:lv,injury:0,fatigue:0,pack:[],traits:[]};
 n.stats=Object.fromEntries(['combat','survival','mobility','spirit'].map((k,i)=>[k,Math.round(jb.stats[i]+(lv-1)*jb.growth[i]*1.1)]));
 const base=DATA.dungeonBy[fam];
 const d={...copy(base),family:fam,tier:3,day:25,hazards:[...DATA.familyTiers[fam][2]],power:(21+Dungeon.gateDayTerm(25)+10+(fam==='golem'?6+16:0)+((base.base||2)-2)*1.3)*(fam==='golem'?.9:1)};
 const bareP=Dungeon.prepare({...n,pack:[]},d,[]);
 console.log(`\n${fam} T3 ${job} Lv${lv} power ratio ${(Dungeon.preparedPower(bareP.effects)/d.power).toFixed(2)} | bare `+bareP.hazards.map(h=>`${h.key} gap ${h.gap.toFixed(1)}/${h.threat.toFixed(1)}`).join(', '));
 for(const pack of GATES[fam]){const p=Dungeon.prepare({...n,pack},d,[]);
  let win=0,hurt=0,death=0;for(let k=0;k<K;k++){const r=Dungeon.resolve({...copy(n),pack:[...pack]},copy(d),new RNG('c',k*7919+1),[]);win+=['성공','대성공'].includes(r.outcome);hurt+=['부상','중상'].includes(r.outcome);death+=r.outcome==='사망';}
  const sum=p.hazards.reduce((a,h)=>a+h.gap,0),cost=pack.reduce((a,id)=>a+DATA.itemBy[id].buy,0);
  console.log(`  ${(pack.join('+')||'(none)').padEnd(22)} ${String(cost).padStart(3)}G gapSum ${sum.toFixed(1).padStart(5)} win ${(100*win/K).toFixed(1).padStart(5)} hurt ${(100*hurt/K).toFixed(1).padStart(5)} death ${(100*death/K).toFixed(1).padStart(4)} | `+p.hazards.map(h=>`${h.key} ${h.gap.toFixed(1)}`).join(' '));}}
