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
if (typeof V.op === 'number' && V.op !== 5) patch('systems/shop', 'const dayBase=90+5*(this.run.day-1);', `const dayBase=90+${V.op}*(this.run.day-1);`);
// 6 shelf: no expiry needs the null path back in stock()
if (V.shelf === 'giNone' || V.shelf === 'old') patch('systems/shop', 'expires:this.run.day+it.days+G.Relics.shelf(this,it),', 'expires:it.days?this.run.day+it.days+G.Relics.shelf(this,it):null,');
// 7 wallet
if (V.wallet === 'old') patch('systems/dungeon', "const WALLET_MULT={'대성공':.90,'성공':.90,'퇴각':.35,'부상':.20,'중상':.10,'사망':0};", "const WALLET_MULT={'대성공':1,'성공':1,'퇴각':.08,'부상':.18,'중상':.18,'사망':0};");
// 중상 share of an injury (real resolution + shadow): failed-escape path .42, other injury paths .13
if (V.sevp) { patch('systems/dungeon', 'clamp(.42+', `clamp(${V.sevp[0]}+`, 2); patch('systems/dungeon', 'clamp(.13-', `clamp(${V.sevp[1]}-`, 4); }
// 3' zombie cut, User 2026-09-25 discussion: consecutive injured departures only (a healthy departure resets),
// 2nd on +step, cap unchanged, weary term dropped
if (V.strain === 'consec') patch('systems/dungeon', 'const strainFor=(records,departedInjured,departedWeary)=>{const s=strainRuns(records,departedInjured,departedWeary);return strainEscalation(s.injuredRuns,s.wearyRuns);};',
  "const strainFor=(records,departedInjured)=>{if(!departedInjured)return 0;const past=records||[];let k=1;for(let i=past.length-1;i>=0&&past[i].departedInjured;i--)k++;return Math.min(STRAIN.cap,STRAIN.step*(k-1));};");
// retreat healing, User 2026-09-25 discussion: an injured departure that ends 퇴각 heals with 25% x (1 + previous
// consecutive injured 퇴각), a 부상 result breaks the chain; one extra RNG draw only on that path
if (V.retreatHeal) patch('systems/dungeon', "outcome==='퇴각'?n.injury:Math.max(0,n.injury-1);",
  `outcome==='퇴각'?(departedInjured&&(()=>{let k=0;const rs=n.records||[];for(let i=rs.length-1;i>=0&&rs[i].departedInjured&&rs[i].outcome==='퇴각';i--)k++;const hit=r.next()<Math.min(1,${V.retreatHeal}*(k+1));if(hit)globalThis.__heal=(globalThis.__heal||0)+1;return hit;})()?0:n.injury):Math.max(0,n.injury-1);`);
// injury-aware seller (harness layer, measurement input): a save-able injured customer gets combat / survival /
// 구급키트 / 귀환석 first; an injured customer on the 4th+ consecutive injured visit (zombie stage 3+) or below Lv5 is
// sent out with nothing. Visits = departures, so the sim-side counter matches the consecutive rule on either build.
// injAware: true = the first rule (Lv<5 or zombie stage 3+), 'stage' = zombie stage 3+ only (User 2026-09-25),
// 'save' = never abandon, only the save-able priority
const ABANDON = V.injAware === 'save' ? 'false' : V.injAware === 'stage' ? 'c[n.id]>=4' : 'n.level<5||c[n.id]>=4';
if (V.injAware) {
  patch('systems/simulation', 'const d=g.claimedGateFor(n);let attempts=0;',
    `{const c=(s.__inj??={});c[n.id]=n.injury===1?(c[n.id]||0)+1:0;if(globalThis.__injOn!==false&&n.injury===1&&(${ABANDON})){globalThis.__abandon=(globalThis.__abandon||0)+1;g.depart();act();continue;}}const d=g.claimedGateFor(n);let attempts=0;`);
  patch('systems/simulation', 'v:itemValue(n,it,d)+(st.expires?',
    'v:itemValue(n,it,d)+(globalThis.__injOn!==false&&n.injury===1?((it.effects.combat||0)*.6+(it.effects.survival||0)*.4+(it.effects.aftercare?25:0)+(it.effects.escape?10:0)):0)+(st.expires?');
}
// operating cost 'mid': +5/Day up to D20, +2/Day after (User 2026-09-25 discussion: mid-game wall, calmer late game)
if (V.op === 'mid') patch('systems/shop', 'const dayBase=90+5*(this.run.day-1);', 'const dayBase=90+5*Math.min(this.run.day-1,19)+2*Math.max(0,this.run.day-20);');
// learning schedule for the trajectory: the policy is picked per Run index (runs 1-3 beginner, 4-6 balanced,
// 7+ skilled + relic-aware + injury-aware); the injury layer is on only in the skilled phase
if (V.schedule) patch('systems/simulation', 'playRun(g,byIndex[i],{policy,pricing,build,seed:t,relicAware});',
  "{const P=globalThis.__schedule(i);globalThis.__injOn=!!P.inj;playRun(g,byIndex[i],{policy:P.policy,pricing:P.pricing,build:P.build,seed:t,relicAware:!!P.relicAware});}");
globalThis.__schedule = i => i < 3 ? { policy: 'beginner', pricing: 'adaptive', build: 'hybrid' }
  : i < 6 ? { policy: 'balanced', pricing: 'adaptive', build: 'hybrid' }
  : { policy: 'skilled', pricing: 'adaptive', build: 'expedition', relicAware: true, inj: true };
// 만반의 준비 (User 2026-09-25): departed without injury, departure Fatigue < 20 and 2+ Items in the Bag -> the
// failure Death chance x prep; a roll inside the removed band becomes 부상/중상 (중상 at the failed-escape share)
if (V.prep) patch('systems/dungeon', "  deathRoll=r.next();\n  if(deathRoll<deathChance){\n   outcome='사망';\n  }else if(!combatSuccess){",
  `  deathRoll=r.next();const __prep=!departedInjured&&(e.fatigueBeforeExpedition||0)<20&&n.pack.length>=2;
  if(deathRoll<deathChance*(__prep?${V.prep}:1)){
   outcome='사망';
  }else if(deathRoll<deathChance){
   injuryRoll=r.next();outcome=injuryRoll<${(V.sevp || [0.42])[0]}?'중상':'부상';globalThis.__prepSaved=(globalThis.__prepSaved||0)+1;
  }else if(!combatSuccess){`);
// SLOTH seal-break policy for the simulated player: 'always' breaks whenever a window allows it; 'rule' breaks
// when the policy would buy nothing from this window anyway (reserve / price) or from D25 on
if (V.seal) patch('systems/simulation', 'function buySupport(){const w=s.relicWindow;if(!w||w.purchased)return;',
  "function buySupport(){const w=s.relicWindow;if(!w||w.purchased||w.consumedBySealBreak)return;if(g.canBreakSeal&&g.canBreakSeal()){const __any=w.candidateIds.some((id,i)=>s.money-w.candidatePrices[i]>=(s.phase==='foundation'?0:s.day===30?180:spend.relicReserve));"
  + (V.seal === 'always' ? "if(true" : "if(!__any||s.day>=25") + "){g.breakSeal();act();globalThis.__seal=(globalThis.__seal||0)+1;return;}}");
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
  if (V.capRates) D.capitalRates = V.capRates;
  // Decoration prices by Slot (both kinds of a Slot share the price)
  if (V.decoPrices) for (const d of D.decorations) { if (V.decoPrices[d.slot] == null) throw Error('no price for ' + d.slot); d.price = V.decoPrices[d.slot]; }
  // Boss: WRATH base Boss Power, and the Bosses that hold their own absolute Power numbers scaled with it
  if (V.boss) { D.balance.bossPower = V.boss.power; if (V.boss.sloth) D.bossTuning.slothBossPower = V.boss.sloth; if (V.boss.greedCap != null) D.bossTuning.greedShortfallCap = V.boss.greedCap; }
}
const out = {};
const slim = (r) => {
  const ph = {};
  for (const [b, p] of Object.entries(r.phase || {})) { const { ratio, ...rest } = p; ph[b] = rest; }
  const st = r.settlement || {};
  return {
    averageDay: r.averageDay, reach10: r.reach10, reach20: r.reach20, reach25: r.reach25, reach30: r.reach30,
    clear: r.overallClearRate, bossWinGivenReach: r.bossWinGivenReach, deaths: r.averageDeaths, deathFail: r.deathFailRate,
    money: r.averageMoney, endedBy: r.endedBy, fatigue: r.fatigue, phase: ph,
    capitalPerRun: st.runs ? Object.values(st.byBand || {}).reduce((a, b) => a + (b.gain || 0), 0) / st.runs : null,
    goldInTotal: r.goldInTotal, goldOutTotal: r.goldOutTotal, goldOut: r.goldOut, goldIn: r.goldIn,
    waste: r.shortage?.waste ?? null, stockouts: r.stockouts, bands: r.bands, npc: r.npc, final: r.final, days: r.days,
    bossRuns: r.bossRuns, endDay: r.dayReached,
    deathEndDay: (r.deathFailDay || []).reduce((h, d) => (h[d] = (h[d] || 0) + 1, h), {}),
  };
};
for (const [policy, pricing, build, opts = {}] of policies) {
  globalThis.__heal = 0; globalThis.__abandon = 0; globalThis.__prepSaved = 0; globalThis.__seal = 0;
  const key = `${policy}:${pricing}:${build}` + (opts.relicAware ? ':aware' : '');
  if (V.traj) {
    const t = Debug.trajectory({ trajectories: V.traj.T, runs: V.traj.R, policy, pricing, build, prefix: V.traj.prefix, purchaseOrder: V.traj.order, relicAware: !!opts.relicAware });
    out[key] = { mode: 'trajectory', T: V.traj.T, byIndex: t.byIndex.map(b => ({
      runIndex: b.runIndex, reach20: b.reach20, reach30: b.reach30, clear: b.overallClearRate, averageDay: b.averageDay,
      money: b.averageMoney, deaths: b.averageDeaths, endedBy: b.endedBy, capitalGained: b.capitalGained,
      capitalAtStart: b.capitalAtStart, decorationsAtStart: b.decorationsAtStart, masteryAtStart: b.masteryAtStart })),
      acquisitionRuns: t.acquisition.map(a => ({ id: a.id, price: a.price, runs: a.runs })),
      firstClearRuns: t.firstClear.runIndex, heal: globalThis.__heal, abandon: globalThis.__abandon };
  } else {
    let account = null;
    if (V.loadout) { account = Meta.fresh(); account.store.capital = 1e9; for (const id of V.loadout) Meta.buyDecoration(account, id); account.store.capital = 0; }
    if (V.injAware) globalThis.__injOn = opts.inj !== false;
    const r = Debug.simulate(seeds, policy, account, pricing, build, { relicAware: !!opts.relicAware });
    out[key] = { ...slim(r), heal: globalThis.__heal, abandon: globalThis.__abandon, prepSaved: globalThis.__prepSaved, seal: globalThis.__seal };
  }
}
process.stdout.write(JSON.stringify(out));
