// v2.8 Re-measure follow-up: four exact gameplay checkpoints for individual + combined
// attribution of SA-Q48 / SA-Q49 / SA-Q50.
//
//   A 6c746c9  pre SA-Q48/49/50
//   B 6d7576e  SA-Q48 only
//   C c0c04ff  SA-Q48 + SA-Q49
//   D 7703177  SA-Q48 + SA-Q49 + SA-Q50
//
// Only dist/systems/shop.js and dist/data/catalog.js are the files any of the three commits
// touch (confirmed by `git log <base>..HEAD -- <path>`); no other commit in that range touches
// either file until the later, unrelated dialogue-recent-repeat commit (ace1380), which only
// adds trailing args to Copy/Dungeon.resolve calls and reads/writes no Gameplay RNG. So each arm
// is built as the CURRENT dist/ tree (current instrumented systems/simulation.js, current
// copy.js, current everything else held fixed) with exactly those two files overlaid from the
// named commit's blob - isolating the three changes from the later Copy/art/dialogue commits,
// per DIRECTOR instruction, instead of checking out each commit's whole tree.
//
// Reuses tools/remeasure-v28-worker.cjs unchanged: every arm is just a distRoot to it.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const REPO = path.join(__dirname, '..');
const SEEDS = Number(process.argv[2]) || 400;
const POLICIES = [
  ['balanced', 'adaptive', 'hybrid'],
  ['greedy', 'overcharge', 'premium'],
  ['protective', 'half', 'vip'],
  ['skilled', 'adaptive', 'expedition'],
];
const ARMS = [
  { key: 'A', commit: '6c746c9', label: 'pre SA-Q48/49/50' },
  { key: 'B', commit: '6d7576e', label: 'SA-Q48 only' },
  { key: 'C', commit: 'c0c04ff', label: 'SA-Q48 + SA-Q49' },
  { key: 'D', commit: '7703177', label: 'SA-Q48 + SA-Q49 + SA-Q50' },
];
const OVERLAY_FILES = ['dist/systems/shop.js', 'dist/data/catalog.js'];
const WORKER = path.join(__dirname, 'remeasure-v28-worker.cjs');

function blobAt(commit, relPath) {
  return execFileSync('git', ['show', `${commit}:${relPath}`], { cwd: REPO, maxBuffer: 1024 * 1024 * 16 });
}

function buildArmRoot(tmp, arm) {
  const root = path.join(tmp, arm.key);
  fs.cpSync(path.join(REPO, 'dist'), path.join(root, 'dist'), { recursive: true });
  for (const rel of OVERLAY_FILES) fs.writeFileSync(path.join(root, rel), blobAt(arm.commit, rel));
  return path.join(root, 'dist');
}

function runAgainst(distRoot) {
  const buf = execFileSync(process.execPath, [WORKER, distRoot, String(SEEDS), JSON.stringify(POLICIES)],
    { maxBuffer: 1024 * 1024 * 128 });
  return JSON.parse(buf.toString());
}

console.log(`v2.8 re-measure follow-up: ${SEEDS} seeds x ${POLICIES.length} policies x ${ARMS.length} arms`);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guild24-remeasure-arms-'));
const results = {};
for (const arm of ARMS) {
  console.log(`running arm ${arm.key} (${arm.commit} - ${arm.label}) ...`);
  const distRoot = buildArmRoot(tmp, arm);
  results[arm.key] = runAgainst(distRoot);
}
fs.rmSync(tmp, { recursive: true, force: true });

const outPath = path.join(REPO, 'tools', 'remeasure-v28-arms-results.json');
fs.writeFileSync(outPath, JSON.stringify({ seeds: SEEDS, policies: POLICIES, arms: ARMS, results }, null, 2));
console.log('written: ' + outPath);
