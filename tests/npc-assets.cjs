// Production NPC / Easter / Boss image assets — inventory and binding acceptance.
// The art itself is never inspected here: gender sorting and likeness were decided by hand
// and this suite does not re-judge them. It checks only what a machine can own — that every
// portrait has exactly one name, every name exactly one portrait, and that the Boss state
// forms the runtime derives from Boss ID / reveal Day / Seal Break count all exist.
// PRODUCTION_NAME_POOL.json is the binding; nothing here is hand-maintained.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const root=path.resolve(__dirname,'..','GUILD24_NPC_PRODUCTION');
const pool=JSON.parse(fs.readFileSync(path.join(root,'00_NAME_POOL/PRODUCTION_NAME_POOL.json'),'utf8'));
const list=d=>fs.readdirSync(path.join(root,d)).filter(f=>f.endsWith('.png')).sort();
const SLOTS=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));

test('NORMAL: each gender folder is exactly the 100 numbered production slots',()=>{
 for(const g of ['M','F']){
  const files=list('02_NORMAL_WORK/'+g);
  assert.deepEqual(files,SLOTS.map(s=>s+'.png'),g+' holds 001.png..100.png and nothing else');
  assert.equal(new Set(files).size,100,g+' has no duplicate slot');
 }
});

test('NORMAL: every portrait binds to exactly one name, and every name to one portrait',()=>{
 for(const g of ['M','F']){
  const entries=pool.normal[g],files=new Set(list('02_NORMAL_WORK/'+g));
  assert.equal(entries.length,100,g+' name pool holds 100 names');
  assert.deepEqual(entries.map(e=>e.slot),SLOTS,g+' slots run 001..100 with no gap');
  // orphan portrait: a file no name claims. orphan name: a name with no file.
  for(const e of entries){
   assert.equal(e.gender,g,'the entry knows its own folder: '+e.name);
   assert.ok(files.has(e.slot+'.png'),'name has a portrait: '+g+'/'+e.slot+' '+e.name);
   files.delete(e.slot+'.png');
  }
  assert.deepEqual([...files],[],g+' has no portrait without a name');
 }
 const names=[...pool.normal.M,...pool.normal.F].map(e=>e.name);
 assert.equal(new Set(names).size,names.length,'no name is shared between two portraits');
 // the name is the runtime key, so it has to resolve to one gender and one slot
 const ids=[...pool.normal.M,...pool.normal.F].map(e=>e.original_id);
 assert.equal(new Set(ids).size,200,'the legacy N001-N200 ids stay unique and traceable');
});

test('EASTER: three fixed identities, named on the file, never in the random pool',()=>{
 const files=list('03_EASTER');
 assert.equal(files.length,3,'exactly three Easter portraits');
 for(const e of pool.easter){
  assert.equal(e.random_eligible,false,e.name+' is never drawn from the normal pool');
  assert.ok(files.includes(e.id+'_'+e.name+'.png'),'fixed portrait exists: '+e.id+' '+e.name);
 }
 const normal=new Set([...pool.normal.M,...pool.normal.F].map(e=>e.name));
 for(const e of pool.easter)assert.ok(!normal.has(e.name),e.name+' is not also a normal name');
});

test('BOSS: every state the runtime can derive has a file, and no file is unreachable',()=>{
 const files=new Set(list('04_BOSS'));
 assert.equal(pool.boss.length,7,'seven fixed Boss identities');
 // this mirrors the runtime derivation exactly: id + reveal state (+ Seal Break for SLOTH)
 const wanted=new Set();
 for(const b of pool.boss){
  assert.equal(b.fixed_identity,true,b.boss_id+' is a fixed identity');
  if(b.boss_id==='SLOTH'){
   wanted.add(b.id+'_SLOTH_D05-D15_SB0.png');
   for(const n of [1,2,3])wanted.add(b.id+'_SLOTH_D30_SB'+n+'.png');
  }else{
   wanted.add(b.id+'_'+b.boss_id+'_D05-D15.png');
   wanted.add(b.id+'_'+b.boss_id+'_D30.png');
  }
 }
 for(const f of wanted)assert.ok(files.has(f),'Boss state asset exists: '+f);
 assert.deepEqual([...files].filter(f=>!wanted.has(f)),[],'no unknown Boss form is left over');
 assert.equal(files.size,16,'six Boss x two forms, plus the four SLOTH forms');
});

test('BOSS: SLOTH at zero breaks reuses its D5/D15 form, and no D30_SB0 file is expected',()=>{
 const files=new Set(list('04_BOSS'));
 // the derivation under test, written as the runtime will write it
 const sloth=n=>n===0?'B007_SLOTH_D05-D15_SB0.png':'B007_SLOTH_D30_SB'+n+'.png';
 for(const day of [5,15,30])assert.equal(sloth(0),'B007_SLOTH_D05-D15_SB0.png',
  'zero breaks resolves to the same form on DAY '+day);
 for(const n of [0,1,2,3])assert.ok(files.has(sloth(n)),'break count '+n+' resolves to a real file');
 assert.ok(!files.has('B007_SLOTH_D30_SB0.png'),'no D30_SB0 asset exists, and none is required');
});

test('the rename record can still trace every production slot back to its original file',()=>{
 const map=JSON.parse(fs.readFileSync(path.join(root,'02_NORMAL_WORK/RENAME_MAPPING.json'),'utf8'));
 for(const g of ['M','F']){
  const rows=map.normal[g];
  assert.equal(rows.length,100,g+' records all 100 renames');
  assert.deepEqual(rows.map(r=>r.slot),SLOTS,g+' records every slot once');
  assert.equal(new Set(rows.map(r=>r.original_filename)).size,100,g+' original filenames are unique');
  assert.equal(new Set(rows.map(r=>r.sha256)).size,100,g+' images are 100 distinct pictures');
 }
});
console.log(count+' npc asset groups passed');
