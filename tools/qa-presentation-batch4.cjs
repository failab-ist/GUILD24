// Presentation Upgrade visual harness — BATCH 4 / Boss Report cadence.
const mode=(process.argv[2]||'after').toLowerCase();
const full=process.argv.includes('--full');
if(!['before','after','review'].includes(mode)){
 console.error('usage: node tools/qa-presentation-batch4.cjs before|after|review [--full]');
 process.exit(2);
}
process.env.QA_SCREENS='boss5,boss10,boss15,boss20,boss25';
process.env.QA_WIDTHS=full?'360,390,412,1024,1280':'390,1280';
process.env.QA_CAPTURE_ONLY='1';
process.env.QA_OUT=process.env.QA_OUT||('reports/ui/presentation-batch4-'+mode);
require('./qa-visual.cjs');
