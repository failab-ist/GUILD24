// Runtime QA suite — runs the assertion-based browser harnesses in sequence and fails if any fails.
// Dev-only, never part of `npm test`. Screenshots go to a temp dir (pass an out-dir to keep them);
// the tracked reports/ui evidence is never overwritten. Capture-only harnesses (qa-visual,
// qa-presentation-batch*, qa-*-states, qa-night-outcomes) are review tools, not pass/fail, and are
// not run here.
const {spawnSync}=require('node:child_process'),os=require('node:os'),path=require('node:path');
const HARNESSES=['qa-d0-flow','qa-final-prep','qa-boss-confirm','qa-final-end','qa-final-bosses','qa-reset-seed','qa-boss-hold'];
const OUT=process.argv[2]||path.join(os.tmpdir(),'guild24-qa-runtime');
const failed=[];
for(const h of HARNESSES){
 const t=Date.now();
 const r=spawnSync(process.execPath,[path.join(__dirname,h+'.cjs'),path.join(OUT,h)],{stdio:['ignore','pipe','inherit'],encoding:'utf8'});
 const last=(r.stdout||'').trim().split('\n').pop();
 console.log(`${r.status===0?'PASS':'FAIL'} ${h} (${Math.round((Date.now()-t)/1000)}s) ${last}`);
 if(r.status!==0){failed.push(h);process.stdout.write(r.stdout||'');}
}
console.log(failed.length?`runtime QA FAILED: ${failed.join(', ')}`:`runtime QA: all ${HARNESSES.length} harnesses passed (screens: ${OUT})`);
process.exitCode=failed.length?1:0;
