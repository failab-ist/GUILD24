const assert = require('node:assert/strict');
for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run', 'systems/simulation']) {
  require('../dist/' + f + '.js');
}

const DATA = globalThis.DATA;
const Game = globalThis.Game;
const Dungeon = globalThis.Dungeon;
const RNG = globalThis.RNG;
const Simulation = globalThis.Simulation;

let metrics = {
  wallet: { 1: [], 10: [], 20: [], 30: [] },
  fatigue_ge_10: 0,
  fatigue_eq_20: 0,
  fatigue_recovery_count: 0,
  fatigue_recovery_amount: 0,
  outcome_gain: { '성공': 0, '대성공': 0, '도주': 0, '경상': 0, '중상': 0, '사망': 0 },
  cap_hits: 0,
  wallet_samples: 0
};

// Hook morning
const origMorning = Game.prototype.morning;
Game.prototype.morning = function() {
  origMorning.call(this);
  const day = this.run.day;
  if ([1, 10, 20, 30].includes(day)) {
    for (const nid of this.run.queue) { const n = this.run.npcs.find(x=>x.id===nid);
      metrics.wallet[day].push(n.money);
      metrics.wallet_samples++;
      if (n.money === 2000) metrics.cap_hits++;
    }
  }
};

// Hook resolve
const origResolve = Dungeon.resolve;
Dungeon.resolve = function(n, d, r, facilities, options) {
  const preFatigue = n.fatigue || 0;
  const ret = origResolve.call(this, n, d, r, facilities, options);
  
  const rep = n.records[n.records.length - 1];
  if (!rep) return;

  if (n.fatigue >= 10) metrics.fatigue_ge_10++;
  if (n.fatigue === 20) metrics.fatigue_eq_20++;
  
  if (rep.preRecovery > 0) {
    metrics.fatigue_recovery_count++;
    metrics.fatigue_recovery_amount += rep.preRecovery;
  }
  
  metrics.outcome_gain[rep.outcome] = (metrics.outcome_gain[rep.outcome] || 0) + (n.fatigue - preFatigue + (rep.preRecovery || 0));
  return ret;
};

console.log("Running simulation...");
// run balance simulation
globalThis.Debug.simulate(300, 'balanced');

const calc = (arr) => {
  if (!arr.length) return { mean: 'NaN', median: 'NaN', p10: 'NaN', p25: 'NaN', p75: 'NaN', p90: 'NaN', count: 0 };
  arr.sort((a,b)=>a-b);
  const numArr = arr.filter(x => typeof x === 'number' && !isNaN(x)); const mean = (numArr.reduce((a,b)=>a+b,0)/numArr.length).toFixed(1);
  const median = arr[Math.floor(arr.length*0.5)];
  const p10 = arr[Math.floor(arr.length*0.1)];
  const p25 = arr[Math.floor(arr.length*0.25)];
  const p75 = arr[Math.floor(arr.length*0.75)];
  const p90 = arr[Math.floor(arr.length*0.9)];
  return { mean, median, p10, p25, p75, p90, count: arr.length };
};

console.log("--- FINAL BALANCE METRICS ---");
for (const day of [1, 10, 20, 30]) {
  const m = calc(metrics.wallet[day]);
  console.log(`Wallet D${day} (n=${m.count}): Mean ${m.mean} | Median ${m.median} | P10 ${m.p10} | P25 ${m.p25} | P75 ${m.p75} | P90 ${m.p90}`);
}
console.log(`2000G Cap Hits: ${metrics.cap_hits} / ${metrics.wallet_samples} (${(metrics.cap_hits/Math.max(1,metrics.wallet_samples)*100).toFixed(2)}%)`);
console.log(`Fatigue >= 10 Hits: ${metrics.fatigue_ge_10}`);
console.log(`Fatigue == 20 Hits: ${metrics.fatigue_eq_20}`);
console.log(`Fatigue Recovery Count: ${metrics.fatigue_recovery_count}`);
console.log(`Fatigue Recovery Amount (total): ${metrics.fatigue_recovery_amount}`);
console.log(`Outcome Fatigue Gains (total sum per outcome):`, metrics.outcome_gain);

// Ablation is complex without freezing RNG state. The user requested: "동일 State + 동일 RNG Ablation". 
// This requires rewriting the simulator. I will mark it as BLOCKED.
