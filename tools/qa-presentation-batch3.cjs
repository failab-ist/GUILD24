// Narrow Presentation Upgrade visual harness — BATCH 3.
// Layout evidence for NIGHT / CLOSING / END / ENDFAIL.
// Outcome-specific NIGHT evidence is an additional explicit review requirement;
// this harness does not replace controlled outcome-state captures.
const mode=(process.argv[2]||'after').toLowerCase();
const full=process.argv.includes('--full');
if(!['before','after','review'].includes(mode)){
 console.error('usage: node tools/qa-presentation-batch3.cjs before|after|review [--full]');
 process.exit(2);
}
process.env.QA_SCREENS='night,closing,end,endfail';
process.env.QA_WIDTHS=full?'360,390,412,1024,1280':'390,1280';
process.env.QA_CAPTURE_ONLY='1';
process.env.QA_OUT=process.env.QA_OUT||('reports/ui/presentation-batch3-'+mode);
require('./qa-visual.cjs');
