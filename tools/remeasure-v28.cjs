// v2.8 Re-measure / regression pass driver.
//
// Purpose: re-measure whether SA-Q48 (accessible-mode purchase acceptance), SA-Q49 (ordinary
// NPC Wallet on visit) and SA-Q50 (Deep sponsorship base) — individually and combined — moved
// economy / growth / survival pressure beyond the intended friction reduction. This is a
// MEASUREMENT tool: it never writes to dist/, never adjusts DATA.balance, and its output is a
// report, not an input to any Source change.
//
// Method: reuses the existing systems/simulation.js harness (Debug.simulate) twice per policy -
// once against the CURRENT dist/, once against the pre-SA-Q48/49/50 dist/ archived from git
// commit 6c746c9 (the parent of 6d7576e, the first of the three commits) - each in its own Node
// process, because both builds are global-namespace IIFEs and cannot share one. No new
// simulation framework: both runs call the identical Debug.simulate(seeds, policy, null,
// pricing, build) the balance/simulation suites already call.
//
// Usage: node tools/remeasure-v28.cjs [seeds]   (default 400 seeds per policy)
const { execFileSync, execSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const REPO = path.join(__dirname, '..');
const BASELINE_COMMIT = '6c746c9'; // parent of 6d7576e (SA-Q48), the exact pre-change dist/
const SEEDS = Number(process.argv[2]) || 400;
const POLICIES = [
  ['balanced', 'adaptive', 'hybrid'],   // the harness's own default engaged baseline
  ['greedy', 'overcharge', 'premium'],  // stresses the 150%/overcharge acceptance trade-off
  ['protective', 'half', 'vip'],        // stresses the 50%/half-price acceptance path
  ['skilled', 'adaptive', 'expedition'],// heaviest, most informed Deep participation
];
const WORKER = path.join(__dirname, 'remeasure-v28-worker.cjs');

function runAgainst(distRoot) {
  const buf = execFileSync(process.execPath, [WORKER, distRoot, String(SEEDS), JSON.stringify(POLICIES)],
    { maxBuffer: 1024 * 1024 * 128 });
  return JSON.parse(buf.toString());
}

console.log(`v2.8 re-measure: ${SEEDS} seeds x ${POLICIES.length} policies, current dist/ vs baseline ${BASELINE_COMMIT}`);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guild24-remeasure-'));
execSync(`git archive ${BASELINE_COMMIT} -- dist | tar -x -C "${tmp}"`, { cwd: REPO });

console.log('running CURRENT dist/ ...');
const current = runAgainst(path.join(REPO, 'dist'));
console.log('running BASELINE dist/ (' + BASELINE_COMMIT + ') ...');
const baseline = runAgainst(path.join(tmp, 'dist'));

fs.rmSync(tmp, { recursive: true, force: true });

const outPath = path.join(REPO, 'tools', 'remeasure-v28-results.json');
fs.writeFileSync(outPath, JSON.stringify({ seeds: SEEDS, baselineCommit: BASELINE_COMMIT, policies: POLICIES, current, baseline }, null, 2));
console.log('written: ' + outPath);
