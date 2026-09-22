// Narrow Presentation Upgrade visual harness — BATCH 2 (ORDER / SALE).
// Reuses qa-visual.cjs for deterministic base-state captures.
// Interaction-state review (ORDER active cart, SALE open register / disabled key) remains
// an explicit review requirement in PRESENTATION_POLISH_BATCH2_v2.8.0.md and is captured
// through the real UI during the implementation cycle.
const mode=(process.argv[2]||'after').toLowerCase();
const full=process.argv.includes('--full');
if(!['before','after','review'].includes(mode)){
 console.error('usage: node tools/qa-presentation-batch2.cjs before|after|review [--full]');
 process.exit(2);
}
process.env.QA_SCREENS='order,sale';
process.env.QA_WIDTHS=full?'360,390,412,1024,1280':'390,1280';
process.env.QA_CAPTURE_ONLY='1';
process.env.QA_OUT=process.env.QA_OUT||('reports/ui/presentation-batch2-'+mode);
require('./qa-visual.cjs');
