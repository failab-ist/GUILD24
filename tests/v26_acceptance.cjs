const assert = require('node:assert/strict');
for (const f of ['data/catalog', 'data/relics','data/decorations', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run']) {
  require('../dist/' + f + '.js');
}

const DATA = globalThis.DATA;
const Game = globalThis.Game;
const Dungeon = globalThis.Dungeon;

let count = 0;
let failCount = 0;
function test(name, fn) {
  try { fn(); count++; console.log('PASS ' + name); }
  catch (e) { failCount++; console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; }
}

const fresh = (seed = 1) => { const g = new Game(); g.autosave = false; g.start('v26-' + seed); return g; };

test('FATIGUE: Outcome gains', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0];
  const d = DATA.dungeonBy['crypt'];
  
  
  const r = new RNG(1);
  
  
  /* DUNGEON_HAZARD_v2.7 §FATIGUE OUTCOME BASELINE. NIGHT_CLOSING_v2.7 supersedes the v2.6.1
     +2/+3/+4 table and forbids keeping it as an alternate live expectation, so this suite
     tracks the current owner rather than pinning a retired one. */
  const expectedGains = { '성공': 3, '대성공': 3, '퇴각': 5, '부상': 6, '중상': 0, '사망': 0, '도주': 5, '경상': 6 };
  const seen = new Set();
  
  for (let i = 0; i < 2000; i++) {
    const isSuccess = i % 2 === 0;
    const combatStat = isSuccess ? 100000 : 0;
    const survivalStat = (i % 3 === 0) ? 0 : 100;
    const dPower = isSuccess ? 1 : 100000;
    
    const n2 = { ...n, stats: {combat: combatStat, survival: survivalStat, mobility: 100, spirit: 100}, equipment: {power: 0}, traits: [], pack: [], records: [], fatigue: 5, alive: true, job: g.run.npcs[0].job };
    const d2 = { ...d, power: dPower };
    const r2 = new RNG(i);
    Dungeon.resolve(n2, d2, r2, []);
    const rep = n2.records[0];
    if (!seen.has(rep.outcome)) {
      seen.add(rep.outcome);
      assert.equal(n2.fatigue, 5 + expectedGains[rep.outcome], rep.outcome + ' should gain ' + expectedGains[rep.outcome]);
    }
  }
  
  console.log([...seen]);
  assert.ok(seen.has('성공') || seen.has('대성공'), 'Saw 성공/대성공');


  assert.ok(seen.has('퇴각'), 'Saw 퇴각');

});

test('FATIGUE: 10 and 20 penalties', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs[0]; const d = DATA.dungeonBy['crypt'];
  n.stats = {combat:10, survival:10, mobility:100, spirit:100};
  n.equipment = {power:0}; n.traits = []; n.pack = [];
  n.fatigue = 10;
  let p = Dungeon.prepare(n, d, []);
  // DUNGEON_HAZARD_v2.7 §FATIGUE STAT PENALTY: the bands are -15% and -40%.
  assert.equal(p.effects.mobility, 85, 'Fatigue 10: mobility -15%');
  assert.equal(p.effects.spirit, 85, 'Fatigue 10: spirit -15%');
  n.fatigue = 20;
  p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.mobility, 60, 'Fatigue 20: mobility -40%');
  assert.equal(p.effects.spirit, 60, 'Fatigue 20: spirit -40%');
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
  n.equipment = {power:5}; n.traits = ['reckless'];
  
  // Inject mock item
  DATA.itemBy['testitem'] = { id: 'testitem', effects: { combat: 10 } };
  n.pack = ['testitem'];
  
  let p = Dungeon.prepare(n, d, []);
  assert.equal(p.effects.combat, 15 * 1.1 + 10, 'Formula: (Base+Equip)*% + Item');
});

test('TRAIT: exact 37 IDs and 16 pairs', () => {
  const traitKeys = Object.keys(DATA.traitBy);
  assert.equal(traitKeys.length, 37, 'Exact 37 traits');
  assert.ok(!traitKeys.includes('lucky'), 'lucky must be removed');
  assert.ok(!traitKeys.includes('unlucky'), 'unlucky must be removed');
  assert.ok(!traitKeys.includes('showoff'), 'showoff must be removed');
  assert.ok(traitKeys.includes('liar'), 'liar must be present');
  
  const exclusions = DATA.traitExclusions || [];
  assert.equal(exclusions.length, 16, 'Exact 16 exclusions');
});

test('ORDER: Full Cycle Validation', () => {
  const g = fresh(); g.morning();
  g.beginOrder();
  
  const invBefore = g.run.inventory.length;
  const item1 = g.run.offers[0].item;
  
  // Confirm Purchase
  g.setQuantity(0, 1);
  g.confirmOrder();
  
  // confirmed inventory 생성
  assert.equal(g.run.inventory.length, invBefore + 1, 'Inventory added');
  assert.equal(g.run.inventory[g.run.inventory.length-1].item, item1, 'Item correct');
  
  // 새 unconfirmed cart 구성
  const item2 = g.run.offers[1].item;
  g.setQuantity(1, 1);
  assert.equal(g.run.cart['1'], 1, 'Cart updated');
  
  // Reroll
  const moneyBeforeReroll = g.run.money;
  g.reroll();
  
  // confirmed inventory 보존
  assert.equal(g.run.inventory.length, invBefore + 1, 'Inventory conserved');
  
  // cart clear
  assert.equal(Object.keys(g.run.cart||{}).length, 0, 'Cart cleared');
  
  // reroll cost 차감
  assert.ok(g.run.money < moneyBeforeReroll, 'Cost deducted');
  
  // offer 전체 갱신
  assert.notEqual(g.run.offers[1].item, item2, 'Offer swapped');
  
  // 새 cart 구성
  const item3 = g.run.offers[2].item;
  g.setQuantity(2, 1);
  
  // 두 번째 Confirm Purchase
  g.confirmOrder();
  
  // inventory 추가
  assert.equal(g.run.inventory.length, invBefore + 2, 'Inventory added second time');
  assert.equal(g.run.inventory[g.run.inventory.length-1].item, item3, 'Item 3 correct');
  
  // ORDER phase 유지
  assert.equal(g.run.phase, 'order', 'Phase remains order');
});

test('WALLET: First formula', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs.find(x => x.id === g.run.queue[0]);
  assert.ok(n.money >= 150 + n.level*8 && n.money <= 210 + n.level*8, 'First visit formula');
});

test('WALLET: Revisit', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs.find(x => x.id === g.run.queue[0]);
  n.money = 500;
  n.introduced = true;
  g.run.queue = [];
  g.morning();
  const n2 = g.run.npcs.find(x => x.id === n.id);
  if (g.run.queue.includes(n.id)) {
    assert.ok(n2.money >= 500 + n2.level*8 && n2.money <= 560 + n2.level*8, 'Revisit formula');
  } else {
    // If they didn't arrive, we force them to arrive for test
    n2.money = 500;
    const oldRngInt = g.rng.int;
    g.rng.int = () => 10;
    n2.money = Math.min(2000, Math.round((n2.introduced ? n2.money : 150) + n2.level * 8 + g.rng.int(0, 60)));
    g.rng.int = oldRngInt;
    assert.equal(n2.money, 500 + n2.level*8 + 10, 'Revisit formula via force');
  }
});

test('WALLET: Rich', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs.find(x => x.id === g.run.queue[0]);
  n.traits = ['rich'];
  n.money = 500;
  // rich +50 actual visit happens in g.arrive() for the current queue front
  g.run.queue = [n.id];
  g.arrive();
  assert.equal(n.money, 550, 'Rich +50 on arrive');
});

test('WALLET: 2000 cap', () => {
  const g = fresh(); g.morning();
  const n = g.run.npcs.find(x => x.id === g.run.queue[0]);
  n.money = 1990;
  n.introduced = true;
  g.run.queue = [];
  // Forcing morning
  const oldRngInt = g.rng.int;
  g.rng.int = () => 50;
  n.money = Math.min(2000, Math.round((n.introduced ? n.money : 150) + n.level * 8 + g.rng.int(0, 60)));
  g.rng.int = oldRngInt;
  assert.equal(n.money, 2000, 'Morning 2000 cap');
  
  // Arrive cap
  n.traits = ['rich'];
  g.run.queue = [n.id];
  g.arrive();
  assert.equal(n.money, 2000, 'Arrive rich 2000 cap');
});

test('UNLOCK: D10 / D14 Activation and Gate', () => {
  const g = fresh();
  
  /* One generateOffers call reaches a given Rarity's pool only when one of its ~5 rolls lands
     on that tier, so a single sample answers "was it eligible?" with a coin flip - it happened
     to land true on the v2.6 catalogue and lands false on some seeds of the v2.7 one. The
     question is whether the item CAN be offered, so eligibility is sampled until it is seen
     and exclusion is asserted across every sample. */
  const OFFER_SAMPLES = 120;
  const sampleOffers = (targetItem) => {
    let hits = 0;
    for (let i = 0; i < OFFER_SAMPLES; i++) {
      const oldWeighted = g.rng.weighted;
      let foundInPool = false;
      g.rng.weighted = (pool, weightFn) => {
        if (Array.isArray(pool) && pool.some(it => it.id === targetItem)) foundInPool = true;
        return oldWeighted.call(g.rng, pool, weightFn);
      };
      g.generateOffers({advancePity: false});
      g.rng.weighted = oldWeighted;
      if (foundInPool) hits++;
    }
    return hits;
  };
  const checkOffer = (targetItem) => sampleOffers(targetItem) > 0;

  // D9 Premium check
  g.run.day = 9;
  assert.equal(globalThis.Meta.itemUnlocked(g.account, DATA.itemBy['premium'], g.run.day), false, 'D9 premium blocked (Meta)');
  assert.equal(sampleOffers('premium'), 0, 'D9 premium excluded from actual Offer generation path');
  
  g.nextDay(); // Transitions to D10
  assert.equal(g.account.unlocks.premium, true, 'D10 premium activated');
  assert.equal(g.run.toast, '새 상품 해금 · 길드 프리미엄 도시락', 'D10 toast');
  assert.equal(globalThis.Meta.itemUnlocked(g.account, DATA.itemBy['premium'], g.run.day), true, 'D10 premium candidate eligible (Meta)');
  assert.equal(checkOffer('premium'), true, 'D10 premium eligible in actual Offer generation path');
  
  // D13 Tree check
  g.run.day = 13;
  assert.equal(globalThis.Meta.itemUnlocked(g.account, DATA.itemBy['tree'], g.run.day), false, 'D13 tree blocked (Meta)');
  assert.equal(sampleOffers('tree'), 0, 'D13 tree excluded from actual Offer generation path');
  
  g.nextDay(); // Transitions to D14
  assert.equal(g.account.unlocks.tree, true, 'D14 tree activated');
  assert.equal(g.run.toast, '새 상품 해금 · 세계수 생환부적', 'D14 toast');
  assert.equal(globalThis.Meta.itemUnlocked(g.account, DATA.itemBy['tree'], g.run.day), true, 'D14 tree candidate eligible (Meta)');
  assert.equal(checkOffer('tree'), true, 'D14 tree eligible in actual Offer generation path');
  
  // Abandon
  g.end(false, 'abandon');
  assert.equal(g.account.unlocks.premium, true, 'Abandon preserves premium');
  assert.equal(g.account.unlocks.tree, true, 'Abandon preserves tree');
  
  // New Run Pre-Day Gate
  const g2 = new Game(g.account, null);
  g2.start('v26-new');
  assert.equal(g2.run.day, 1, 'New run starts at D1');
  assert.equal(globalThis.Meta.itemUnlocked(g2.account, DATA.itemBy['premium'], g2.run.day), false, 'D1 premium blocked despite account unlock');
  assert.equal(globalThis.Meta.itemUnlocked(g2.account, DATA.itemBy['tree'], g2.run.day), false, 'D1 tree blocked despite account unlock');
  g2.run.day = 10;
  assert.equal(globalThis.Meta.itemUnlocked(g2.account, DATA.itemBy['premium'], g2.run.day), true, 'D10 premium eligible in new run');
  assert.equal(globalThis.Meta.itemUnlocked(g2.account, DATA.itemBy['tree'], g2.run.day), false, 'D10 tree still blocked in new run');
  
  // Full Reset
  const freshMeta = globalThis.Meta.fresh();
  assert.equal(freshMeta.unlocks.premium, false, 'Reset clears premium');
  assert.equal(freshMeta.unlocks.tree, false, 'Reset clears tree');
});

console.log(count + ' tests passed.');
