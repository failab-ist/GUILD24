// v2.8 Re-measure pass worker. Loads ONE dist/ tree (old baseline or current) and runs the
// existing Debug.simulate harness against it, printing the fields the re-measure report needs
// as JSON on stdout. Run as a separate process per dist root because both are global-namespace
// IIFEs (`globalThis.Game`, `globalThis.Simulation`, ...) and two builds cannot share a process.
// Measurement only: this file adds no instrumentation of its own and touches no Source value.
const path = require('node:path');
const distRoot = process.argv[2];
const seeds = Number(process.argv[3]) || 400;
const policies = JSON.parse(process.argv[4]);

for (const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng',
  'systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop',
  'systems/relics','systems/run','systems/simulation']) {
  require(path.join(distRoot, f + '.js'));
}

const pick = (r) => ({
  averageDay: r.averageDay, reachRate: r.reachRate, reach10: r.reach10, reach20: r.reach20,
  reach25: r.reach25, reach30: r.reach30, bossWinGivenReach: r.bossWinGivenReach,
  overallClearRate: r.overallClearRate, averageDeaths: r.averageDeaths,
  deathsMedian: r.deathsMedian, deathsP10: r.deathsP10, deathsP90: r.deathsP90,
  deathFailRate: r.deathFailRate,
  averageMoney: r.averageMoney,
  greatSuccessRate: r.greatSuccessRate, greatStoreGoldPerRun: r.greatStoreGoldPerRun,
  modes: r.modes, refusal: r.refusal,
  modesByBand: r.modesByBand ?? null, modesByLoyalty: r.modesByLoyalty ?? null,
  wallets: r.wallets,
  walletFreshStats: r.walletFreshStats ?? null, walletReturningStats: r.walletReturningStats ?? null,
  walletCapRate: r.walletCapRate ?? null,
  deepOfferedPerRun: r.deepOfferedPerRun, deepSkippedPerRun: r.deepSkippedPerRun,
  deepTakenPerRun: r.deepTakenPerRun, deepSponsorPerRun: r.deepSponsorPerRun,
  deepCostP10: r.deepCostP10, deepCostMedian: r.deepCostMedian, deepCostP90: r.deepCostP90,
  deepByRarity: r.deepByRarity, deepByLevel: r.deepByLevel,
  deepCollapseRate: r.deepCollapseRate ?? null,
  goldIn: r.goldIn, goldOut: r.goldOut, goldInTotal: r.goldInTotal, goldOutTotal: r.goldOutTotal,
  saleOriginShare: r.saleOriginShare,
  npc: r.npc, days: r.days, bands: r.bands,
  // `phase` carries a raw per-expedition ratio[] (DUN-Q20 concern, not this report's); only its
  // small aggregate counts are relevant here.
  phase: Object.fromEntries(Object.entries(r.phase).map(([b, p]) => {
    const { ratio, ...rest } = p; return [b, rest];
  })),
  prepStartGoldMedian: r.prepStartGoldMedian,
  final: r.final, settlement: r.settlement,
  rescue: r.rescue,
  shortage: r.shortage, saleGap: r.saleGap, capacityBlocked: r.capacityBlocked, stockouts: r.stockouts,
});

const out = {};
for (const [policy, pricing, build] of policies) {
  const r = Debug.simulate(seeds, policy, null, pricing, build);
  out[`${policy}:${pricing}:${build}`] = pick(r);
}
process.stdout.write(JSON.stringify(out));
