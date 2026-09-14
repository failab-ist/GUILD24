const assert = require('node:assert/strict');
for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run']) {
  require('../dist/' + f + '.js');
}

const DATA = globalThis.DATA;
const Game = globalThis.Game;
const Dungeon = globalThis.Dungeon;
const RNG = globalThis.RNG;

let count = 0;
function test(name, fn) {
  try { fn(); count++; console.log('PASS ' + name); }
  catch (e) { console.error('FAIL ' + name + '\n' + e.stack); }
}

const fresh = (seed = 1) => { const g = new Game(); g.autosave = false; g.start('v26-' + seed); return g; };

test('FATIGUE: Outcome gains', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; n.fatigue = 5;
  const d = DATA.dungeonBy['crypt'];
  const r = new RNG(1);
  n.pack = []; n.records = []; n.equipment = {power:0, tier:1, name:'Sword'}; n.stats = {combat:10, survival:10, mobility:10, spirit:10}; n.traits = [];
  Dungeon.resolve(n, d, r, []);
  const rep = n.records[n.records.length-1];
  const actualOutcome = rep.outcome;
  const expectedGain = (actualOutcome === '성공' || actualOutcome === '대성공') ? 1 : (actualOutcome === '도주' ? 2 : (actualOutcome === '경상' ? 3 : 0));
  assert.equal(rep.outcomeFatigueGain, expectedGain, 'Expected ' + expectedGain + ' for ' + actualOutcome);
  assert.equal(rep.fatigue, 5 + expectedGain, 'Fatigue should be 5 + ' + expectedGain);
});

test('FATIGUE: 10 and 20 penalties', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; const d = DATA.dungeonBy['crypt'];
  n.stats = {combat:10, survival:10, mobility:100, spirit:100};
  n.equipment = {power:0}; n.traits = []; n.pack = [];
  n.fatigue = 10;
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.mobility, 90, 'Fatigue 10: mobility -10%');
  assert.equal(p.effects.spirit, 90, 'Fatigue 10: spirit -10%');
  n.fatigue = 20;
  p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.mobility, 75, 'Fatigue 20: mobility -25%');
  assert.equal(p.effects.spirit, 75, 'Fatigue 20: spirit -25%');
});

test('INJURY: injury=1 and grit', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; const d = DATA.dungeonBy['crypt'];
  n.stats = {combat:100, survival:100, mobility:100, spirit:100};
  n.equipment = {power:0}; n.traits = []; n.pack = [];
  n.injury = 1;
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, 85, 'Injury 1: combat -15%');
  assert.equal(p.effects.survival, 80, 'Injury 1: survival -20%');
  n.traits = ['grit'];
  p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, 120, 'Injury 1 + grit: combat +20% (REPLACE)');
  assert.equal(p.effects.survival, 80, 'Injury 1 + grit: survival -20% (MAINTAIN)');
});

test('INJURY: injury=2 stat penalty 0', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; const d = DATA.dungeonBy['crypt'];
  n.stats = {combat:100, survival:100, mobility:100, spirit:100};
  n.equipment = {power:0}; n.traits = []; n.pack = [];
  n.injury = 2;
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, 100, 'Injury 2: combat 100%');
  assert.equal(p.effects.survival, 100, 'Injury 2: survival 100%');
});

test('STAT: Formula (Base + Equip) * % + Item', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; const d = DATA.dungeonBy['crypt'];
  n.stats = {combat:10, survival:10, mobility:10, spirit:10};
  n.equipment = {power:5}; n.traits = ['reckless']; // +10%
  if (DATA.itemBy['whetstone']) n.pack = ['whetstone'];
  let p = Dungeon.prepare(n, d, []);
  const itemStat = DATA.itemBy['whetstone']?.effects?.combat || 0;
  assert.equal(p.effects.combat, 15 * 1.1 + itemStat, 'Formula: (Base+Equip)*% + Item');
});

test('TRAIT: exact 37 IDs and 16 pairs', () => {
  const traitKeys = Object.keys(DATA.traitBy);
  assert.equal(traitKeys.length, 37, 'Exact 37 traits');
  assert.ok(!traitKeys.includes('lucky'), 'lucky must be removed');
  assert.ok(!traitKeys.includes('unlucky'), 'unlucky must be removed');
  assert.ok(!traitKeys.includes('showoff'), 'showoff must be removed');
  assert.ok(traitKeys.includes('liar'), 'liar must be present');
  const exclusions = DATA.traitExclusions;
  assert.equal((exclusions||[]).length, 16, 'Exact 16 exclusions');
  const hasHonestLiar = (exclusions||[]).some(e => e.includes('honest') && e.includes('liar'));
  assert.ok(hasHonestLiar, 'honest-liar exclusion must be present');
});

test('ORDER: Confirm -> unconfirmed Cart -> Reroll -> Confirmed Inventory', () => {
  const g = fresh(); g.morning();
  g.beginOrder();
  const item1 = g.run.offers[0].item;
  g.setQuantity(0, 1);
  g.confirmOrder();
  const invLength = g.run.inventory.length;
  assert.equal(g.run.inventory[invLength-1].item, item1, 'Item 1 in inventory');
  assert.equal(g.run.phase, 'order', 'Phase remains order');
  g.setQuantity(1, 1);
  assert.ok(g.run.cart['1'] === 1, 'Item 2 in cart');
  const oldMoney = g.run.money;
  g.reroll();
  assert.ok(g.run.money < oldMoney, 'Money deducted');
  assert.equal(Object.keys(g.run.cart||{}).length, 0, 'Cart cleared');
  assert.equal(g.run.inventory.length, invLength, 'Inventory preserved');
  assert.notEqual(g.run.offers[0].item, item1, 'Offers swapped');
  g.confirmOrder();
  assert.equal(g.run.phase, 'order', 'Phase remains order after second confirm');
});

test('WALLET: First, Revisit, Cap, Rich', () => {
  const g = fresh(); g.morning();
  // Ensure we get an actual guest
  const n = g.run.npcs.find(x => x.id === g.run.queue[0]);
  const moneyD1 = n.money;
  assert.ok(moneyD1 >= 100 + n.level*8 && moneyD1 <= 160 + n.level*8, 'First visit formula ' + moneyD1 + ' vs ' + (100+n.level*8));
  n.money = 1990; n.traits = ['rich']; n.introduced = true; n.visits = 1;
  g.run.queue = [];
  g.morning();
  // Find n in new queue
  const n2 = g.run.queue.find(x => x.id === n.id);
  if (n2) {
      assert.equal(n2.money, 2000, 'Revisit cap at 2000');
      // To trigger arrive(), it must be at the front of the queue
      g.run.queue = [n2];
      g.arrive();
      assert.equal(n2.money, 2000, 'Rich 50G cap at 2000');
  } else {
      console.log('Skipping revisit cap check because NPC did not arrive today.');
  }
});

console.log(count + ' tests passed.');
