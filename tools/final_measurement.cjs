const fs = require('fs');
for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run', 'systems/simulation']) {
  require('C:/Users/necro/Documents/GitHub/GUILD24/dist/' + f + '.js');
}

const DATA = globalThis.DATA;
const Game = globalThis.Game;
const Dungeon = globalThis.Dungeon;
const Adventurer = globalThis.Adventurer;
const RNG = globalThis.RNG;
const Simulation = globalThis.Simulation;

const calc = (arr) => {
  if (!arr.length) return { mean: 'NaN', median: 'NaN', p10: 'NaN', p25: 'NaN', p75: 'NaN', p90: 'NaN', count: 0 };
  arr.sort((a,b)=>a-b);
  const mean = (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1);
  const median = arr[Math.floor(arr.length*0.5)];
  const p10 = arr[Math.floor(arr.length*0.1)];
  const p25 = arr[Math.floor(arr.length*0.25)];
  const p75 = arr[Math.floor(arr.length*0.75)];
  const p90 = arr[Math.floor(arr.length*0.9)];
  return { mean, median, p10, p25, p75, p90, count: arr.length, min: arr[0], max: arr[arr.length-1] };
};

console.log("=========================================");
console.log("FINAL EXECUTION - MEASUREMENT PHASE");
console.log("=========================================\n");

// --------------------------------------------------
// 1. FATIGUE / WALLET (from Simulation)
// --------------------------------------------------
console.log("Running Base Simulation for Wallet & Fatigue (300 runs)...");
let metrics = {
  wallet: { 1: [], 10: [], 20: [], 30: [] },
  reach: { 1: 0, 10: 0, 20: 0, 30: 0 },
  cap_hits: 0,
  wallet_samples: 0,
  
  total_expeditions: 0,
  fatigue_ge_10: 0,
  fatigue_eq_20: 0,
  fatigue_recovery_count: 0,
  fatigue_recovery_amount: [],
  outcome: { '성공': {c:0,g:[]}, '대성공': {c:0,g:[]}, '퇴각': {c:0,g:[]}, '부상': {c:0,g:[]}, '중상': {c:0,g:[]}, '사망': {c:0,g:[]} }
};

const origMorning = Game.prototype.morning;
Game.prototype.morning = function() {
  origMorning.call(this);
  const day = this.run.day;
  if ([1, 10, 20, 30].includes(day)) {
    metrics.reach[day]++;
    for (const nid of this.run.queue) {
      const n = this.run.npcs.find(x => x.id === nid);
      if(n) {
        metrics.wallet[day].push(n.money);
        metrics.wallet_samples++;
        if (n.money >= 2000) metrics.cap_hits++;
      }
    }
  }
};

const origResolve = Dungeon.resolve;
Dungeon.resolve = function(n, d, r, facilities, options) {
  const ret = origResolve.call(this, n, d, r, facilities, options);
  const rep = n.records[n.records.length - 1];
  if (!rep) return ret;

  metrics.total_expeditions++;
  if (n.fatigue >= 10) metrics.fatigue_ge_10++;
  if (n.fatigue === 20) metrics.fatigue_eq_20++;
  
  if (rep.fatigueRecovery > 0) {
    metrics.fatigue_recovery_count++;
    metrics.fatigue_recovery_amount.push(rep.fatigueRecovery);
  }
  
  const outcomeFatigue = {'성공':2, '대성공':2, '퇴각':3, '부상':4, '중상':0, '사망':0}[rep.outcome] || 0;
  const e = Dungeon.prepare(n, d);
  const actualOutcomeFatigueGain = rep.outcome === '사망' ? 0 : Math.max(0, outcomeFatigue + (e.effects.fatigue || 0));
  
  if(metrics.outcome[rep.outcome]) {
    metrics.outcome[rep.outcome].c++;
    metrics.outcome[rep.outcome].g.push(actualOutcomeFatigueGain);
  }
  
  return ret;
};

globalThis.Debug.simulate(300, 'balanced');

// Restore hooks
Game.prototype.morning = origMorning;
Dungeon.resolve = origResolve;

console.log("\n[ WALLET ]");
for (const day of [1, 10, 20, 30]) {
  const m = calc(metrics.wallet[day]);
  if (day === 30 && metrics.reach[day] > 0 && m.count === 0) {
    console.log(`D30: Reach ${metrics.reach[day]}/300 (${(metrics.reach[day]/300*100).toFixed(1)}%) | Samples: 0`);
    console.log("     N/A - FINAL DAY, NO NORMAL SALE VISITOR (Queue emptied by game logic)");
  } else {
    console.log(`D${day}: Reach ${metrics.reach[day]}/300 (${(metrics.reach[day]/300*100).toFixed(1)}%) | Samples: ${m.count} | Mean: ${m.mean} | Median: ${m.median} | P10: ${m.p10} | P25: ${m.p25} | P75: ${m.p75} | P90: ${m.p90}`);
  }
}
console.log(`2000G Cap Hits: ${metrics.cap_hits} / ${metrics.wallet_samples} (${(metrics.cap_hits/Math.max(1,metrics.wallet_samples)*100).toFixed(2)}%)`);

console.log("\n[ FATIGUE ]");
console.log(`Total Expeditions: ${metrics.total_expeditions}`);
console.log(`Fatigue >= 10: ${metrics.fatigue_ge_10} (${(metrics.fatigue_ge_10/Math.max(1,metrics.total_expeditions)*100).toFixed(1)}%)`);
console.log(`Fatigue == 20: ${metrics.fatigue_eq_20} (${(metrics.fatigue_eq_20/Math.max(1,metrics.total_expeditions)*100).toFixed(1)}%)`);
console.log(`Recovery Events: ${metrics.fatigue_recovery_count} (${(metrics.fatigue_recovery_count/Math.max(1,metrics.total_expeditions)*100).toFixed(1)}%)`);
if (metrics.fatigue_recovery_count > 0) {
  const mRec = calc(metrics.fatigue_recovery_amount);
  console.log(`Recovery Amount: Mean ${mRec.mean} | Min ${mRec.min} | Max ${mRec.max}`);
}
for (const [out, obj] of Object.entries(metrics.outcome)) {
  if (obj.c > 0) {
    const m = calc(obj.g);
    console.log(`Outcome [${out}]: Count ${obj.c} | Gain Mean ${m.mean} | Min ${m.min} | Max ${m.max}`);
  }
}

// --------------------------------------------------
// 2. ECONOMY (WALLET/TRAIT)
// --------------------------------------------------
console.log("\n[ ECONOMY ]");
const g = new Game(); g.start('economy'); g.morning();
const nEco = g.run.npcs[0]; nEco.money = 100; nEco.level = 1;
const dEco = g.run.dungeons[0];

const measureGain = (traits) => {
  let s = 0;
  for(let i=0; i<1000; i++) {
    const clone = JSON.parse(JSON.stringify(nEco)); clone.traits = traits;
    Dungeon.resolve(clone, dEco, new RNG('e'+i));
    s += clone.records[clone.records.length-1].loot || 0;
  }
  return (s/1000).toFixed(1);
};
console.log(`baseline expedition wallet gain: ${measureGain([])}`);
console.log(`greed: ${measureGain(['greed'])}`);
console.log(`coward: ${measureGain(['coward'])}`);
console.log(`careful: ${measureGain(['careful'])}`);

g.run.queue = [nEco.id]; nEco.traits = []; nEco.money = 100; g.arrive();
console.log(`arrive baseline money: ${nEco.money}`);
nEco.traits = ['rich']; nEco.money = 100; g.arrive();
console.log(`rich arrive money: ${nEco.money}`);

nEco.traits = []; const honestBase = g.interest(nEco, DATA.itemBy.water, 'overcharge').chance;
nEco.traits = ['honest']; const honestTrait = g.interest(nEco, DATA.itemBy.water, 'overcharge').chance;
console.log(`honest overcharge chance: base ${(honestBase*100).toFixed(1)}%, honest ${(honestTrait*100).toFixed(1)}% (Diff: ${((honestTrait - honestBase)*100).toFixed(1)}%p)`);

// --------------------------------------------------
// 3. HAZARD / TRAIT ABLATION
// --------------------------------------------------
console.log("\n[ HAZARD ABLATION ]");
const cAbl = JSON.parse(JSON.stringify(g.run.npcs[0]));
cAbl.level = 1; cAbl.stats = {combat: 20, survival: 20, mobility: 20, spirit: 20}; cAbl.pack = [];
const crypt = g.makeDungeon('crypt'); crypt.tier = 2; crypt.hazards = ['dark'];
const fire = g.makeDungeon('fire'); fire.tier = 2; fire.hazards = ['hot', 'dark'];

const bDark = Dungeon.prepare(cAbl, crypt).hazard;
const bSharpeyeDark = Dungeon.prepare({...cAbl, traits: ['sharpeye']}, crypt).hazard; // Mitigates dark
console.log(`Single [+6] (sharpeye on dark): Hazard Baseline ${bDark.toFixed(3)} vs Sharpeye ${bSharpeyeDark.toFixed(3)} (Delta: ${(bSharpeyeDark-bDark).toFixed(3)})`);

const bDual = Dungeon.prepare(cAbl, fire).hazard;
const bHeatproofDual = Dungeon.prepare({...cAbl, traits: ['heatproof']}, fire).hazard;
const bNearsightDual = Dungeon.prepare({...cAbl, traits: ['nearsight']}, fire).hazard;
console.log(`Dual [+4] (heatproof on hot+dark): Hazard Baseline ${bDual.toFixed(3)} vs Heatproof ${bHeatproofDual.toFixed(3)} (Delta: ${(bHeatproofDual-bDual).toFixed(3)})`);
console.log(`Dual [-4] (nearsight on hot+dark): Hazard Baseline ${bDual.toFixed(3)} vs Nearsight ${bNearsightDual.toFixed(3)} (Delta: ${(bNearsightDual-bDual).toFixed(3)})`);

console.log("\n[ RECKLESS / FRAIL / GRIT ABLATION ]");
let stats = { Base: { 사망:0, 부상:0, 중상:0 }, Reckless: { 사망:0, 부상:0, 중상:0 } };
for(let i=0; i<10000; i++) {
  const clone1 = JSON.parse(JSON.stringify({...cAbl, pack: ['rice','water','water']}));
  Dungeon.resolve(clone1, crypt, new RNG('x'+i));
  const out1 = clone1.records[clone1.records.length-1].outcome;
  if(stats.Base[out1]!==undefined) stats.Base[out1]++;
  
  const clone2 = JSON.parse(JSON.stringify({...cAbl, traits: ['reckless'], pack: ['rice','water','water']}));
  Dungeon.resolve(clone2, crypt, new RNG('x'+i));
  const out2 = clone2.records[clone2.records.length-1].outcome;
  if(stats.Reckless[out2]!==undefined) stats.Reckless[out2]++;
}
console.log(`Base: 사망 ${stats.Base.사망}, 부상 ${stats.Base.부상}, 중상 ${stats.Base.중상}`);
console.log(`Reckless: 사망 ${stats.Reckless.사망}, 부상 ${stats.Reckless.부상}, 중상 ${stats.Reckless.중상}`);

// --------------------------------------------------
// 4. INFLUENCE HIERARCHY
// --------------------------------------------------
console.log("\n[ INFLUENCE HIERARCHY ]");
const getWinRate = (modN, modD, options) => {
  let wins = 0;
  for(let i=0; i<10000; i++) {
    const clone = JSON.parse(JSON.stringify(modN));
    Dungeon.resolve(clone, modD, new RNG('h'+i), [], options);
    const rep = clone.records[clone.records.length-1];
    if(rep.outcome === '성공' || rep.outcome === '대성공') wins++;
  }
  return wins / 10000;
};
// Use a tougher crypt (power 26) so we don't hit 98% instantly
const cryptHard = g.makeDungeon('crypt'); cryptHard.tier = 2; cryptHard.power = 26;
const cH = JSON.parse(JSON.stringify({...cAbl, pack: ['rice','water','water'], stats: {combat: 20, survival: 20, mobility: 20, spirit: 20}}));

const wBase = getWinRate(cH, cryptHard);
const wLevel = getWinRate({...cH, level: 6, stats: {combat: 45, survival: 45, mobility: 45, spirit: 45}}, cryptHard); // Simulate Level+5
const wItem = getWinRate({...cH, pack: ['rice','water','water','potion']}, cryptHard);
const wSupport = getWinRate(cH, cryptHard, { support: 'prayer' });
const wTrait = getWinRate({...cH, traits: ['strong']}, cryptHard);

console.log(`Base Win Rate: ${(wBase*100).toFixed(1)}%`);
console.log(`Level Up (+5): ${((wLevel-wBase)*100).toFixed(1)}%p`);
console.log(`Sold Item (potion): ${((wItem-wBase)*100).toFixed(1)}%p`);
console.log(`Store Support (prayer): ${((wSupport-wBase)*100).toFixed(1)}%p`);
console.log(`Trait (strong): ${((wTrait-wBase)*100).toFixed(1)}%p`);
