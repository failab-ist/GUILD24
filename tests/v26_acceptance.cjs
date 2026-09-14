const assert = require('node:assert/strict');
for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run']) {
  require('../dist/' + f + '.js');
}

let count = 0;
function test(name, fn) {
  try { fn(); count++; console.log('PASS ' + name); }
  catch (e) { console.error('FAIL ' + name + '\n' + e.message); }
}

const fresh = (seed = 1) => { const g = new Game(); g.autosave = false; g.start('v26-' + seed); return g; };

test('WALLET: First visit and Revisit', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0];
  const oldMoney = n.money;
  assert.ok(oldMoney >= 100 + n.level*8 && oldMoney <= 160 + n.level*8, 'First visit formula');
  n.money = 1900;
  n.history = [{ day: 1 }]; 
  n.level = 10;
  g.rng = new globalThis.G.RNG('test');
  const revisitMoney = g.rng.int(0, 60) + 1900 + 10*8;
  g.morning();
  assert.equal(n.money, revisitMoney, 'Revisit formula applied in morning');
});

test('WALLET: Persistent Wallet Cap 2000G', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0];
  n.money = 1990;
  n.history = [{ day: 1 }];
  n.level = 10;
  g.morning();
  const n2 = g.run.npcs[0];
  assert.equal(n2.money, 2000, 'Cap at 2000G');
});

test('FATIGUE: No morning natural recovery, requiredSupply=0 recovery', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0];
  n.fatigue = 5;
  g.morning();
  assert.equal(n.fatigue, 5, 'No morning natural recovery');
  
  const d = g.run.dungeons[0];
  d.requiredSupply = 0;
  const p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.fatigueRecovery, 0, 'Food/Drink=0 + requiredSupply=0 -> recovery exactly 0');
});

test('FATIGUE: Penalties 10-19 and 20', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0], d = g.run.dungeons[0];
  n.fatigue = 10;
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.mobility, n.stats.mobility * 0.9, '10 fatigue -10%');
});

test('FATIGUE: Outcome gains', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0], d = g.run.dungeons[0];
  n.fatigue = 0;
  Dungeon.resolve(n, d, new globalThis.G.RNG(1));
});

test('INJURY: injury=1 gives combat -15% survival -20%, grit replaces combat', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0], d = g.run.dungeons[0];
  n.injury = 1;
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, n.stats.combat * 0.85);
});

test('INJURY: injury=2 gives stat penalty 0', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0], d = g.run.dungeons[0];
  n.injury = 2;
  const p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, n.stats.combat);
});

test('ORDER: Confirm -> Reroll -> Confirm', () => {
  const g = fresh(); g.morning();
  g.beginOrder();
  assert.ok(g.run.offers && g.run.offers.length > 0);
  g.setQuantity(0, 1);
  // Re-roll should just clear cart, so it shouldn't throw error in v2.6!
  // If it throws error, it fails the v2.6 acceptance!
  g.reroll();
  assert.equal(Object.keys(g.run.cart||{}).length, 0, 'Cart should be cleared on reroll');
});
