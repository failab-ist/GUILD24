for (const f of ['data/catalog', 'data/relics', 'data/copy', 'systems/rng', 'systems/adventurer', 'systems/dungeon', 'systems/meta', 'systems/save', 'systems/shop', 'systems/relics', 'systems/run']) {
  require('../dist/' + f + '.js');
}

for (const seed of ['sig-0', 'sig-1', 'sig-2']) {
  const g = new Game();
  g.autosave = false;
  g.start(seed);
  console.log(seed);
  console.log('order:', g.run.familyOrder);
  console.log('intro:', g.run.familyIntro);
}
