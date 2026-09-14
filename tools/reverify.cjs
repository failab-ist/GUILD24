const fs = require('fs');
for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run', 'systems/simulation']) {
  require('C:/Users/necro/Documents/GitHub/GUILD24/dist/' + f + '.js');
}

const DATA = globalThis.DATA;
const Game = globalThis.Game;
const Dungeon = globalThis.Dungeon;
const Adventurer = globalThis.Adventurer;
const RNG = globalThis.RNG;

const g = new Game(); g.start('re-eval'); g.morning();

console.log("=========================================");
console.log("FINAL EXECUTION - RE-VERIFICATION");
console.log("=========================================\n");

// --------------------------------------------------
// 1. HAZARD ABLATION (Correct Pairs)
// --------------------------------------------------
console.log("[ HAZARD ABLATION (Proper Pairs) ]");
const nHaz = JSON.parse(JSON.stringify(g.run.npcs[0]));
nHaz.level = 1; nHaz.stats = {combat:20, survival:20, mobility:20, spirit:20}; nHaz.pack=[];

// Single: poison (antitoxin / sensitive)
const dPoison = g.makeDungeon('crypt'); dPoison.tier = 2; dPoison.hazards = ['poison'];
const hPoisonBase = Dungeon.prepare(nHaz, dPoison).hazard;
const hAntitoxin = Dungeon.prepare({...nHaz, traits:['antitoxin']}, dPoison).hazard;
const hSensitive = Dungeon.prepare({...nHaz, traits:['sensitive']}, dPoison).hazard;
console.log(`Single Hazard [poison]:`);
console.log(`  Base: ${hPoisonBase.toFixed(3)}`);
console.log(`  antitoxin: ${hAntitoxin.toFixed(3)} (Delta: ${(hAntitoxin-hPoisonBase).toFixed(3)})`);
console.log(`  sensitive: ${hSensitive.toFixed(3)} (Delta: ${(hSensitive-hPoisonBase).toFixed(3)})`);

// Dual: dark + whiteout (sharpeye / nearsight)
const dSnow = g.makeDungeon('snow'); dSnow.tier = 2; dSnow.hazards = ['dark', 'whiteout'];

const hSnowBase = Dungeon.prepare(nHaz, dSnow);
const baseDark = hSnowBase.hazards.find(h=>h.key==='dark').gap;
const baseWhiteout = hSnowBase.hazards.find(h=>h.key==='whiteout').gap;

const hSharpeye = Dungeon.prepare({...nHaz, traits:['sharpeye']}, dSnow);
const sharpDark = hSharpeye.hazards.find(h=>h.key==='dark').gap;
const sharpWhiteout = hSharpeye.hazards.find(h=>h.key==='whiteout').gap;

const hNearsight = Dungeon.prepare({...nHaz, traits:['nearsight']}, dSnow);
const nearDark = hNearsight.hazards.find(h=>h.key==='dark').gap;
const nearWhiteout = hNearsight.hazards.find(h=>h.key==='whiteout').gap;

console.log(`Dual Hazard Component Breakdown [dark + whiteout]:`);
console.log(`Base:`);
console.log(`  - dark component gap: ${baseDark}`);
console.log(`  - whiteout component gap: ${baseWhiteout}`);
console.log(`sharpeye:`);
console.log(`  - dark component gap: ${sharpDark} (Delta: ${sharpDark - baseDark})`);
console.log(`  - whiteout component gap: ${sharpWhiteout} (Delta: ${sharpWhiteout - baseWhiteout})`);
console.log(`nearsight:`);
console.log(`  - dark component gap: ${nearDark} (Delta: ${nearDark - baseDark})`);
console.log(`  - whiteout component gap: ${nearWhiteout} (Delta: ${nearWhiteout - baseWhiteout})`);

// --------------------------------------------------
// 2. INFLUENCE HIERARCHY
// --------------------------------------------------
console.log("\n[ INFLUENCE HIERARCHY ]");

const getWinRate = (modN, modD, facilities=[]) => {
  let wins = 0;
  for(let i=0; i<10000; i++) {
    const clone = JSON.parse(JSON.stringify(modN));
    Dungeon.resolve(clone, modD, new RNG('h'+i), facilities);
    const rep = clone.records[clone.records.length-1];
    if(rep.outcome === '성공' || rep.outcome === '대성공') wins++;
  }
  return wins / 10000;
};

const dHier = g.makeDungeon('crypt'); dHier.tier = 2; dHier.power = 30; dHier.hazards = ['dark', 'fear'];
const nBase = JSON.parse(JSON.stringify(nHaz));
nBase.pack = ['water', 'candy']; // Has drink and food (mitigates fear)

const wBase = getWinRate(nBase, dHier);
console.log(`Baseline Win Rate: ${(wBase*100).toFixed(1)}%`);

const nLevel = {...nBase, level: 3, stats: {combat:30, survival:30, mobility:30, spirit:30}};
const wLevel = getWinRate(nLevel, dHier);
console.log(`+ Level (+2, +10 stats): ${(wLevel*100).toFixed(1)}% (Delta: ${((wLevel-wBase)*100).toFixed(1)}%p)`);

const nGrow = JSON.parse(JSON.stringify(nBase));
Adventurer.grow(nGrow, 500, new RNG('grow'));
const wGrow = getWinRate(nGrow, dHier);
console.log(`+ Growth (+500 XP): ${(wGrow*100).toFixed(1)}% (Delta: ${((wGrow-wBase)*100).toFixed(1)}%p)`);

const nEquip = {...nBase, equipment: { power: 10, name: 'sword' }};
const wEquip = getWinRate(nEquip, dHier);
console.log(`+ Equipment (Power +10): ${(wEquip*100).toFixed(1)}% (Delta: ${((wEquip-wBase)*100).toFixed(1)}%p)`);

const nItem = {...nBase, pack: ['water', 'candy', 'battery']};
const wItem = getWinRate(nItem, dHier);
console.log(`+ Sold Item (battery, mitigates dark): ${(wItem*100).toFixed(1)}% (Delta: ${((wItem-wBase)*100).toFixed(1)}%p)`);

const wSupport = getWinRate(nBase, dHier, ['kitchen']);
console.log(`+ Store Support (kitchen, buffs water/candy): ${(wSupport*100).toFixed(1)}% (Delta: ${((wSupport-wBase)*100).toFixed(1)}%p)`);

const wEvent = getWinRate(nBase, dHier, ['expeditionMeal']);
console.log(`+ Event (expeditionMeal, buffs candy fear mitigation): ${(wEvent*100).toFixed(1)}% (Delta: ${((wEvent-wBase)*100).toFixed(1)}%p)`);

const nTrait = {...nBase, traits: ['sharpeye']}; // mitigates dark
const wTrait = getWinRate(nTrait, dHier);
console.log(`+ Trait (sharpeye, mitigates dark): ${(wTrait*100).toFixed(1)}% (Delta: ${((wTrait-wBase)*100).toFixed(1)}%p)`);
