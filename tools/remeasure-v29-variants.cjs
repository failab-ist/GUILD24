// v2.9.0 balance-option driver (measurement only, BALANCE FINDING evidence; never writes dist/).
// Each variant is an in-memory patch set applied by remeasure-v29-variants-worker.cjs to the dist/
// it loads (variant field `dist`, else DIST env, else the repo dist/). Pre-F3 reference: a `git archive 5e69533` dist.
// Usage: node tools/remeasure-v29-variants.cjs <seeds> <all|bal|bs|policiesJSON> <variants.json> <out.json>
//   policies are [policy, pricing, build, {relicAware}?]; a variant with `traj: {T, R, order}` runs the cross-run
//   trajectory (Debug.trajectory, real settlement and Decoration purchase) instead, split into 4 parts by prefix.
const { execFile } = require('node:child_process');
const fs = require('node:fs'), path = require('node:path');
const [seedsArg, polArg, varFile, outFile] = process.argv.slice(2);
const ALL = [['balanced','adaptive','hybrid'],['greedy','overcharge','premium'],['protective','half','vip'],['skilled','adaptive','expedition']];
const policies = polArg === 'all' ? ALL : polArg === 'bal' ? [ALL[0]] : polArg === 'bs' ? [ALL[0], ALL[3]] : JSON.parse(polArg);
const variants = JSON.parse(fs.readFileSync(varFile, 'utf8'));
const results = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const WORKER = path.join(__dirname, 'remeasure-v29-variants-worker.cjs');
const DIST = process.env.DIST || path.join(__dirname, '..', 'dist');
const PARTS = 4;
const pkey = p => p.slice(0, 3).join(':') + (p[3]?.relicAware ? ':aware' : '') + (p[3]?.human ? ':human' : '');
const jobs = [];
for (const [name, v] of Object.entries(variants)) for (const p of policies) {
  if (v.traj) for (let part = 0; part < PARTS; part++)
    jobs.push({ name, p, part, v: { ...v, traj: { ...v.traj, T: Math.ceil(v.traj.T / PARTS), prefix: `${name}-${part}` } } });
  else jobs.push({ name, p, v });
}
const parts = {};
const mean = (xs, f) => xs.reduce((a, x) => a + f(x), 0) / xs.length;
function mergeTraj(list) {
  const T = list.reduce((a, x) => a + x.T, 0);
  const byIndex = list[0].byIndex.map((_, i) => {
    const rows = list.map(x => x.byIndex[i]), o = { runIndex: i };
    for (const k of ['reach20','reach30','clear','averageDay','money','deaths','capitalGained','capitalAtStart','decorationsAtStart','masteryAtStart'])
      o[k] = mean(rows, r => r[k] ?? 0);
    o.endedBy = {}; for (const r of rows) for (const [k, n] of Object.entries(r.endedBy || {})) o.endedBy[k] = (o.endedBy[k] || 0) + n;
    return o;
  });
  const acquisition = list[0].acquisitionRuns.map((a, k) => {
    const runs = list.flatMap(x => x.acquisitionRuns[k].runs);
    const ranked = [...runs].sort((x, y) => (x ?? Infinity) - (y ?? Infinity)), mid = ranked[Math.floor(ranked.length / 2)];
    return { id: a.id, price: a.price, acquired: runs.filter(x => x !== null).length, of: runs.length, medianRun: mid ?? null };
  });
  const firstClearRuns = list.flatMap(x => x.firstClearRuns);
  return { mode: 'trajectory', T, byIndex, acquisition, firstClear: { cleared: firstClearRuns.length, of: T, runIndex: firstClearRuns },
    heal: list.reduce((a, x) => a + x.heal, 0), abandon: list.reduce((a, x) => a + x.abandon, 0) };
}
let i = 0, running = 0;
function next() {
  while (running < 4 && i < jobs.length) {
    const j = jobs[i++]; running++;
    execFile(process.execPath, [WORKER, j.v.dist || DIST, seedsArg, JSON.stringify([j.p]), JSON.stringify(j.v)], { maxBuffer: 1 << 28 }, (err, stdout, stderr) => {
      running--;
      if (err) { console.error(j.name, pkey(j.p), stderr || err.message); next(); return; }
      const r = JSON.parse(stdout), k = pkey(j.p), x = r[k];
      results[j.name] ??= {}; results[j.name].spec = variants[j.name];
      if (x.mode === 'trajectory') {
        const bucket = (parts[j.name + '|' + k] ??= []); bucket.push(x);
        if (bucket.length === PARTS) {
          const m = results[j.name][k] = mergeTraj(bucket);
          console.log(`${j.name.padEnd(30)} ${k.padEnd(34)} run1/5/10/15 D30 ${[0,4,9,14].map(n => m.byIndex[n]?.reach30.toFixed(3)).join('/')} clr ${[0,4,9,14].map(n => m.byIndex[n]?.clear.toFixed(3)).join('/')} deco@15 ${m.byIndex.at(-1).decorationsAtStart.toFixed(2)}`);
        }
      } else {
        results[j.name].seeds = Number(seedsArg); results[j.name][k] = x;
        console.log(`${j.name.padEnd(30)} ${k.padEnd(34)} D20 ${x.reach20.toFixed(3)} D30 ${x.reach30.toFixed(3)} clr ${x.clear.toFixed(3)} $ ${Math.round(x.money)} end ${x.endedBy.deaths}/${x.endedBy.bankrupt} cap ${Math.round(x.capitalPerRun)} heal ${x.heal} aband ${x.abandon}`);
      }
      fs.writeFileSync(outFile, JSON.stringify(results, null, 1));
      next();
    });
  }
}
next();
