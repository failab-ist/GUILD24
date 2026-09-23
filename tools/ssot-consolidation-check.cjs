// SSOT consolidation line accounting (User-approved 2026-09-23 pre-v2.9 consolidation).
// For each ledger in reports/ssot-consolidation/*.md:
//   BASELINE=<commit>   the tree the chain is read from (before this owner was consolidated)
//   TARGET=<path>       the consolidated current owner
//   CHAIN=<path>,<path> the pre-consolidation owner and every file it inherited, as of BASELINE
// Every content line of every CHAIN file must be either verbatim in TARGET (trimmed) or listed
// inside a ```text fence of the ledger (dropped: superseded, legacy/history, or the original of a
// reworded line - the reason in the heading above the fence). Every line of TARGET found in no CHAIN
// file must be declared inside a ```new fence (a heading, or the new form of a reworded line).
// Exit 1 on any unaccounted chain line or undeclared new line.
//   node tools/ssot-consolidation-check.cjs [ledger ...]
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const norm=l=>l.replace(/\s+$/,'').trim();
const skip=l=>!l||/^-{3,}$/.test(l)||/^`{3}/.test(l);
// the KEY=VALUE header before a file's first "## " heading is file metadata, not a rule
const content=text=>{let head=true;return text.split('\n').map(norm).filter(l=>{
 if(/^##\s/.test(l))head=false;return !skip(l)&&!(head&&(/^[A-Z_]+=/.test(l)||/^#\s/.test(l)));});};
const ledgers=process.argv.slice(2).length?process.argv.slice(2):
 fs.readdirSync(path.join(root,'reports/ssot-consolidation')).filter(f=>f.endsWith('.md')&&f!=='README.md')
  .map(f=>'reports/ssot-consolidation/'+f);
let bad=0;
for(const lp of ledgers){
 const L=fs.readFileSync(path.join(root,lp),'utf8');
 const key=k=>(L.match(new RegExp('^'+k+'=(.+)$','m'))||[])[1]?.trim();
 const base=key('BASELINE'),target=key('TARGET'),chain=(key('CHAIN')||'').split(',').map(s=>s.trim()).filter(Boolean);
 if(!base||!target||!chain.length){console.log('FAIL '+lp+': BASELINE / TARGET / CHAIN missing');bad++;continue;}
 const dropped=new Set(),declared=new Set();let fence=null;
 for(const l of L.split('\n')){const f=l.match(/^```(\w*)/);if(f){fence=fence?null:(f[1]||'text');continue;}
  if(fence&&!skip(norm(l)))(fence==='new'?declared:dropped).add(norm(l));}
 const tgt=new Set(content(fs.readFileSync(path.join(root,target),'utf8')));
 const all=new Set(),missing=[];
 for(const c of chain){
  const t=execFileSync('git',['show',base+':'+c],{cwd:root,encoding:'utf8'});
  for(const l of content(t)){all.add(l);if(!tgt.has(l)&&!dropped.has(l))missing.push(c+': '+l);}}
 const stale=[...dropped].filter(l=>!all.has(l)),added=[...tgt].filter(l=>!all.has(l));
 const undeclared=added.filter(l=>!declared.has(l)),unused=[...declared].filter(l=>!tgt.has(l));
 const ok=!missing.length&&!stale.length&&!undeclared.length&&!unused.length;if(!ok)bad++;
 console.log(`${ok?'PASS':'FAIL'} ${target}  chain lines ${all.size} · kept ${[...all].filter(l=>tgt.has(l)).length} · dropped ${dropped.size} · new ${added.length}`);
 for(const m of missing)console.log('  UNACCOUNTED '+m);
 for(const s of stale)console.log('  LEDGER LINE NOT IN CHAIN '+s);
 for(const u of undeclared)console.log('  UNDECLARED NEW '+u);
 for(const u of unused)console.log('  DECLARED NEW NOT IN TARGET '+u);
 if(process.env.SHOW_NEW)for(const a of added)console.log('  NEW '+a);
}
process.exitCode=bad?1:0;
