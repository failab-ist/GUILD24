const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=__dirname,previous=JSON.parse(fs.readFileSync(path.join(root,'provenance.json'))),next=JSON.parse(fs.readFileSync(path.join(root,'provenance-xp2.json')));
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for(const arm of ['baseline','xp'])for(const f of previous.arms[arm].files)assert.equal(sha(path.join(root,arm,f.file)),f.sha256,arm+'/'+f.file);
for(const f of next.files)assert.equal(sha(path.join(root,'xp2',f.file)),f.sha256,'xp2/'+f.file);
const rows={};for(const arm of ['baseline','xp','xp2']){
 const source=JSON.parse(fs.readFileSync(path.join(root,arm+'.json')));let total=0;rows[arm]={};
 for(const [key,value] of Object.entries(source.arms)){
  assert.equal(value.rows.length,key.includes('/fresh/')?1000:2000,key);
  total+=value.rows.length;const ids=new Set(value.rows.map(r=>r.seed+'#'+r.idx));assert.equal(ids.size,value.rows.length,'Repeated row '+arm+'/'+key);rows[arm][key]=ids;
 }
 assert.equal(total,15000,arm);
 for(const policy of ['reader','expert']){const file=JSON.parse(fs.readFileSync(path.join(root,'profile-'+arm+'-'+policy+'.json')));assert.equal(file.rows.length,1000);const ids=new Set(file.rows.map(r=>r.seed));assert.equal(ids.size,1000);rows[arm]['profile/'+policy]=ids;}
}
for(const arm of ['xp','xp2'])for(const [key,ids] of Object.entries(rows.baseline))assert.deepEqual([...rows[arm][key]].sort(),[...ids].sort(),arm+'/'+key+' seed parity');
const manifest=JSON.parse(fs.readFileSync('C:/Users/necro/Documents/GitHub/GUILD24/reports/v2100-measure/revisit-xp-20261005/raw-output-manifest.json'));
for(const f of manifest.files)assert.equal(sha(path.join(manifest.artifactRoot,f.file)),f.sha256,'Previous raw '+f.file);
console.log(JSON.stringify({status:'PASS',standardRowsPerArm:15000,profileRowsPerPolicy:1000,arms:['baseline','xp','xp2'],seedSets:'identical',candidateHashes:'unchanged',previousRawHashes:'unchanged'}));
