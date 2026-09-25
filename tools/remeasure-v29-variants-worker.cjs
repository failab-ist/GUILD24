// v2.9.0 balance-option variant worker (measurement only). Loads the repo dist/ with in-memory text patches /
// data overrides for one variant, runs Debug.simulate, prints a compact JSON. Never writes dist/.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const [distRoot, seedsArg, policiesArg, variantArg] = process.argv.slice(2);
const seeds = Number(seedsArg), policies = JSON.parse(policiesArg), V = JSON.parse(variantArg);

// ---- code patches (each must match exactly once) ----
const P = [];
const patch = (file, find, repl, count = 1) => P.push({ file, find, repl, count });
// 1 natural recovery
if (V.rec === 'rest5') patch('systems/shop', "s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;", "s.npcs.forEach(n=>{if(n.recovery>0){n.fatigue=Math.max(0,(n.fatigue||0)-5);n.recovery--;");
const dm = /^d(\d)$/.exec(V.rec || ''); const dm2 = /^rest5d(\d)$/.exec(V.rec || '');
if (dm) patch('systems/shop', "s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;", `s.npcs.forEach(n=>{if(s.day>1)n.fatigue=Math.max(0,(n.fatigue||0)-${dm[1]});if(n.recovery>0){n.recovery--;`);
if (dm2) patch('systems/shop', "s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;", `s.npcs.forEach(n=>{if(s.day>1)n.fatigue=Math.max(0,(n.fatigue||0)-${dm2[1]});if(n.recovery>0){n.fatigue=Math.max(0,(n.fatigue||0)-5);n.recovery--;`);
// 2 severe fatigue
if (V.sev !== undefined && V.sev !== 9) {
  if (V.sev === 0) { // pre-F3 form: 중상 like 사망, no gain at all (trait cannot add)
    patch('systems/dungeon', "const dead=outcome==='사망';", "const dead=outcome==='사망'||outcome==='중상';");
    patch('systems/dungeon', "(outcome==='부상'||outcome==='중상')?9:4", "outcome==='부상'?9:4");
  } else patch('systems/dungeon', "(outcome==='부상'||outcome==='중상')?9:4", `outcome==='부상'?9:outcome==='중상'?${V.sev}:4`);
}
// 3 strain
if (V.strain === 's5c15') patch('systems/dungeon', 'const STRAIN={step:.08,cap:.30,weary:20};', 'const STRAIN={step:.05,cap:.15,weary:20};');
if (V.strain === 'injOnly') patch('systems/dungeon', '+STRAIN.step*Math.max(0,wearyRuns-1));', ');');
if (V.strain === 'injOnly5') { patch('systems/dungeon', 'const STRAIN={step:.08,cap:.30,weary:20};', 'const STRAIN={step:.05,cap:.15,weary:20};'); patch('systems/dungeon', '+STRAIN.step*Math.max(0,wearyRuns-1));', ');'); }
if (V.strain === 'off') patch('systems/dungeon', 'const STRAIN={step:.08,cap:.30,weary:20};', 'const STRAIN={step:0,cap:0,weary:20};');
// 4 operating cost
if (V.op !== undefined && V.op !== 5) patch('systems/shop', 'const dayBase=90+5*(this.run.day-1);', `const dayBase=90+${V.op}*(this.run.day-1);`);
// 6 shelf: no expiry needs the null path back in stock()
if (V.shelf === 'giNone' || V.shelf === 'old') patch('systems/shop', 'expires:this.run.day+it.days+G.Relics.shelf(this,it),', 'expires:it.days?this.run.day+it.days+G.Relics.shelf(this,it):null,');
// 7 wallet
if (V.wallet === 'old') patch('systems/dungeon', "const WALLET_MULT={'대성공':.90,'성공':.90,'퇴각':.35,'부상':.20,'중상':.10,'사망':0};", "const WALLET_MULT={'대성공':1,'성공':1,'퇴각':.08,'부상':.18,'중상':.18,'사망':0};");
// 중상 share of an injury (real resolution + shadow): failed-escape path .42, other injury paths .13
if (V.sevp) { patch('systems/dungeon', 'clamp(.42+', `clamp(${V.sevp[0]}+`, 2); patch('systems/dungeon', 'clamp(.13-', `clamp(${V.sevp[1]}-`, 4); }
// 7-b buffer removal (only when asked)
if (V.buffer === 'off') patch('systems/dungeon', 'const remainingSupplyBuffer=preparedSupply-preRecovery;', 'const remainingSupplyBuffer=0;');

const files = ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
for (const f of files) {
  let src = fs.readFileSync(path.join(distRoot, f + '.js'), 'utf8');
  for (const p of P.filter(p => p.file === f)) {
    const n = src.split(p.find).length - 1;
    if (n !== p.count) throw Error(`patch ${f}: expected ${p.count} match(es), got ${n}: ${p.find}`);
    src = src.split(p.find).join(p.repl);
  }
  vm.runInThisContext(src, { filename: f + '.js' });
}
// ---- data overrides (after all loaded; objects are shared with itemBy) ----
{
  const D = globalThis.DATA;
  const I = D.itemBy;
  const setSup = (id, v) => { if (!I[id]) throw Error('no item ' + id); I[id].effects.supply = v; };
  if (V.food === 'old') { setSup('rice', 5); setSup('ramen', 5); setSup('bar', 6); setSup('choco', 4); setSup('candy', 3); setSup('lava', 4); I.lava.effects.survival = 8; setSup('premium', 7); }
  if (V.food === 'mid') { setSup('ramen', 3); setSup('lava', 3); }
  if (V.food === 'u1') { setSup('rice', 5); setSup('ramen', 3); setSup('bar', 6); setSup('lava', 3); setSup('premium', 7); }
  if (V.food === 'mid2') { setSup('rice', 5); setSup('ramen', 3); setSup('lava', 3); setSup('choco', 4); }
  if (V.shelf === 'gi7') for (const it of D.items) if (it.category === 'gear' || it.category === 'insurance') it.days = 7;
  if (V.shelf === 'giNone') for (const it of D.items) if (it.category === 'gear' || it.category === 'insurance') it.days = 0;
  if (V.shelf === 'old') { const old = { water: 5, ramen: 4, choco: 5, coffee: 5, herbtea: 5, potion: 7, ice: 4, candy: 5, lava: 4, energy: 5, wine: 5, kit: 7, highpotion: 7, antidote: 7, midpotion: 7, herobar: 5, hyperenergy: 5, sageelixir: 5, toppotion: 7, stone: 0, tree: 0, coupon: 0 };
    for (const it of D.items) { if (it.category === 'gear' && it.id !== 'antidote') it.days = 0; if (old[it.id] !== undefined) it.days = old[it.id]; } }
  if (V.need) D.balance.accessibleNeed = V.need;
}
const out = {};
for (const [policy, pricing, build] of policies) {
  const r = Debug.simulate(seeds, policy, null, pricing, build);
  const ph = {};
  for (const [b, p] of Object.entries(r.phase || {})) { const { ratio, ...rest } = p; ph[b] = rest; }
  const st = r.settlement || {};
  out[`${policy}:${pricing}:${build}`] = {
    averageDay: r.averageDay, reach10: r.reach10, reach20: r.reach20, reach25: r.reach25, reach30: r.reach30,
    clear: r.overallClearRate, bossWinGivenReach: r.bossWinGivenReach, deaths: r.averageDeaths, deathFail: r.deathFailRate,
    money: r.averageMoney, endedBy: r.endedBy, fatigue: r.fatigue, phase: ph,
    capitalPerRun: st.runs ? Object.values(st.byBand || {}).reduce((a, b) => a + (b.gain || 0), 0) / st.runs : null,
    goldInTotal: r.goldInTotal, goldOutTotal: r.goldOutTotal, goldOut: r.goldOut, goldIn: r.goldIn,
    waste: r.shortage?.waste ?? null, stockouts: r.stockouts,
  };
}
process.stdout.write(JSON.stringify(out));
