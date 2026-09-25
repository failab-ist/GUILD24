// v2.9.0 balance-option driver (measurement only, BALANCE FINDING evidence; never writes dist/).
// Each variant is an in-memory patch set applied by remeasure-v29-variants-worker.cjs to the dist/
// it loads (DIST env, default the repo dist/). Pre-F3 reference: DIST=<git archive 5e69533>/dist.
// Usage: node tools/remeasure-v29-variants.cjs <seeds> <all|bal|bs|policiesJSON> <variants.json> <out.json>
const { execFile } = require('node:child_process');
const fs = require('node:fs'), path = require('node:path');
const [seedsArg, polArg, varFile, outFile] = process.argv.slice(2);
const ALL = [['balanced','adaptive','hybrid'],['greedy','overcharge','premium'],['protective','half','vip'],['skilled','adaptive','expedition']];
const policies = polArg === 'all' ? ALL : polArg === 'bal' ? [ALL[0]] : polArg === 'bs' ? [ALL[0], ALL[3]] : JSON.parse(polArg);
const variants = JSON.parse(fs.readFileSync(varFile, 'utf8'));
const results = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const WORKER = path.join(__dirname, 'remeasure-v29-variants-worker.cjs');
const DIST = process.env.DIST || path.join(__dirname, '..', 'dist');
const jobs = [];
for (const [name, v] of Object.entries(variants)) for (const p of policies) jobs.push({ name, v, p });
let i = 0, running = 0;
function next() {
  while (running < 4 && i < jobs.length) {
    const j = jobs[i++]; running++;
    execFile(process.execPath, [WORKER, DIST, seedsArg, JSON.stringify([j.p]), JSON.stringify(j.v)], { maxBuffer: 1 << 28 }, (err, stdout, stderr) => {
      running--;
      if (err) { console.error(j.name, j.p.join(':'), stderr || err.message); }
      else { const r = JSON.parse(stdout); results[j.name] ??= { spec: j.v, seeds: Number(seedsArg) }; results[j.name].seeds = Number(seedsArg); results[j.name].spec = j.v; Object.assign(results[j.name], r);
        const k = j.p.join(':'), x = r[k];
        console.log(`${j.name.padEnd(28)} ${k.padEnd(28)} D20 ${x.reach20.toFixed(3)} D30 ${x.reach30.toFixed(3)} clr ${x.clear.toFixed(3)} $ ${Math.round(x.money)} end ${x.endedBy.deaths}/${x.endedBy.bankrupt} cap ${Math.round(x.capitalPerRun)}`);
        fs.writeFileSync(outFile, JSON.stringify(results, null, 1)); }
      next();
    });
  }
}
next();
