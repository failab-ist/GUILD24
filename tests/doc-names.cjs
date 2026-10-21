// AGENTS §10-A / SPEC_INDEX §VERSION POLICY: a design_ssot owner keeps its name stem forever, and its
// _v<version> suffix moves to the current version whenever the owner is edited. These checks catch a rename
// whose links were not followed, and an edited owner whose DOC_VERSION moved without the filename.
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{execSync}=require('child_process');
const root=path.join(__dirname,'..');
let n=0;const test=(name,fn)=>{fn();n++;console.log('PASS '+name);};
const owners=fs.readdirSync(path.join(root,'design_ssot')).filter(f=>f.endsWith('.md')&&f!=='CHANGELOG.md');
const NAME=/^([A-Z_]+)_v(\d+\.\d+\.\d+)\.md$/;
test('every owner is <STEM>_v<version>.md, one file per stem',()=>{
 const stems=new Set();
 for(const f of owners){const m=f.match(NAME);assert.ok(m,f+' is <STEM>_v<version>.md');assert.ok(!stems.has(m[1]),'one file for '+m[1]);stems.add(m[1]);}
});
test('a renamed owner carries the same DOC_VERSION as its filename',()=>{
 for(const f of owners){const [,stem,v]=f.match(NAME);if(v==='2.8.0'||stem==='PLATFORM_RELEASE')continue;
  const dv=(fs.readFileSync(path.join(root,'design_ssot',f),'utf8').match(/^DOC_VERSION=(.+)$/m)||[])[1];
  assert.equal(dv,v,f+': DOC_VERSION follows the filename');}
});
test('outside archive/, every design_ssot filename that is named exists',()=>{
 const live=new Set(owners);
 const files=execSync('git ls-files',{cwd:root,encoding:'utf8'}).split('\n').filter(f=>f&&!f.startsWith('archive/')&&!f.startsWith('node_modules/')&&/\.(md|cjs|js|json|html)$/.test(f)&&!f.startsWith('dist/ui/assets/'));
 const bad=[];
 for(const f of files){let t;try{t=fs.readFileSync(path.join(root,f),'utf8');}catch{continue;}
  for(const m of t.matchAll(/\b([A-Z][A-Z_]+_v\d+\.\d+\.\d+)(\.md)?\b/g)){
   const name=m[1]+'.md',stem=m[1].replace(/_v[\d.]+$/,''),ver=m[1].match(/_v(\d+)\.(\d+)/);
   if(+ver[1]*100+ +ver[2]<208)continue;/* pre-v2.8 lineage names in Source comments are history, not links */
   if(owners.some(o=>o.startsWith(stem+'_v'))&&!live.has(name))bad.push(f+': '+m[1]);}}
 assert.deepEqual(bad,[],'old owner names left behind (AGENTS §10-A): rename them to the current file');
});
console.log(n+' doc-name checks passed');
