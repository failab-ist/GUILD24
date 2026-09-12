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

 // The shipped identities are the production ones, and each addresses its own fixed asset -
 // never one of the 200 normal slots, so an Easter visitor consumes no normal binding.
 require('../dist/data/catalog.js');require('../dist/data/relics.js');require('../dist/systems/rng.js');
 require('../dist/systems/meta.js');require('../dist/systems/adventurer.js');
 require('../dist/ui/assets/npc/manifest.js');require('../dist/ui/art.js');require('../dist/ui/scene.js');
 const A=globalThis.Adventurer;
 assert.deepEqual(A.EASTER,pool.easter.map(e=>({id:e.id,name:e.name})),
  'the shipped identities are the production ones, ids and names, in order');
 for(const e of pool.easter){
  assert.deepEqual(A.portraitOf(e.name),{easter:e.id},e.name+' resolves to its own fixed asset id');
  assert.equal(globalThis.Scene.npcArt({id:'npc-e',name:e.name}),'ui/assets/npc/easter/'+e.id+'.webp',
   'and the shipped build addresses that file: '+e.id);
  assert.ok(fs.existsSync(path.resolve(__dirname,'..','dist/ui/assets/npc/easter',e.id+'.webp')),
   'the shipped asset exists: '+e.id);
 }
});

test('NORMAL: the shipped name pool is the production pool, in the order that binds it',()=>{
 // The pool is not hand-maintained: it is the production binding, so it is checked against
 // the production binding rather than against a copy of itself. Order carries the binding -
 // the array position IS the gender folder and the slot - so order is asserted, not membership.
 require('../dist/data/catalog.js');require('../dist/data/relics.js');require('../dist/systems/rng.js');
 require('../dist/systems/meta.js');require('../dist/systems/adventurer.js');
 require('../dist/ui/assets/npc/manifest.js');require('../dist/ui/art.js');require('../dist/ui/scene.js');
 const A=globalThis.Adventurer,expected=[...pool.normal.M,...pool.normal.F].map(e=>e.name);
 assert.equal(expected.length,200,'the production pool is 200 normal names');
 assert.deepEqual(A.names,expected,'the shipped pool is the production pool, in binding order');
 assert.equal(new Set(A.names).size,200,'no name appears twice, so no name addresses two portraits');

 for(const g of ['M','F'])for(const e of pool.normal[g]){
  const at=A.portraitOf(e.name);
  assert.deepEqual(at,{gender:g,slot:Number(e.slot)},'name binds to its own slot: '+g+'/'+e.slot+' '+e.name);
  assert.equal(globalThis.Scene.npcArt({id:'npc-x',name:e.name}),
   'ui/assets/npc/normal/'+g+'/'+e.slot+'.webp','and the shipped build addresses that file: '+e.name);
 }

 // random_eligible:false means exactly that - the three fixed identities are not in the pool
 // a visitor is drawn from, and the runtime has no slot to give them.
 for(const e of pool.easter){
  assert.ok(!A.names.includes(e.name),e.name+' is never drawn from the normal pool');
  assert.ok(!A.portraitOf(e.name).slot,e.name+' holds no normal slot; it carries its own asset id');
 }
 // a fixed identity is still bindable, by NPC id through the manifest, not by name
 globalThis.Scene.manifest['npc.npc-easter']='ui/assets/npc/easter/E001.webp';
 assert.equal(globalThis.Scene.npcArt({id:'npc-easter',name:A.names[0]}),'ui/assets/npc/easter/E001.webp',
  'the id override still wins over the derived address');
 delete globalThis.Scene.manifest['npc.npc-easter'];
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

test('BOSS: the shipped derivation reads the Day first, so a broken seal never leaks the battle form early',()=>{
 require('../dist/ui/assets/npc/manifest.js');require('../dist/ui/art.js');require('../dist/ui/scene.js');
 const dist=path.resolve(__dirname,'..','dist');
 const art=(id,day,breaks)=>Scene.bossArt(id,day,breaks);
 const shipped=f=>fs.existsSync(path.join(dist,f));
 const BASE='B007_SLOTH_D05-D15_SB0';
 // Seals are broken on D15/D20/D25, so the count is already above zero well before the
 // Final. The Day decides the form; the count only chooses which D30 form.
 for(const [day,breaks] of [[15,1],[20,2],[25,2],[29,3]])
  assert.ok(art('SLOTH',day,breaks).includes(BASE),
   'DAY '+day+' with '+breaks+' break(s) still shows the base form');
 assert.ok(art('SLOTH',5,0).includes(BASE),'and so does DAY 5 with none');
 assert.ok(art('SLOTH',30,0).includes(BASE),'zero breaks reuses the base form on DAY 30 too');
 for(const n of [1,2,3])
  assert.ok(art('SLOTH',30,n).includes('B007_SLOTH_D30_SB'+n),'DAY 30 with '+n+' break(s) shows SB'+n);
 // every form the runtime can reach is a file that ships, and D30_SB0 is neither
 for(const [id,day,breaks] of [['SLOTH',5,0],['SLOTH',15,1],['SLOTH',30,0],['SLOTH',30,1],['SLOTH',30,2],['SLOTH',30,3]])
  assert.ok(shipped(art(id,day,breaks)),id+' D'+day+'/'+breaks+' resolves to a shipped file');
 assert.ok(!shipped('ui/assets/npc/boss/B007_SLOTH_D30_SB0.webp'),'no D30_SB0 asset exists, and none is required');
 // the six ordinary Bosses wear their battle form only on the last day
 for(const id of ['WRATH','PRIDE','ENVY','GREED','GLUTTONY','LUST']){
  for(const day of [5,15,29]) assert.ok(art(id,day).includes('_D05-D15'),id+' keeps its base form on DAY '+day);
  assert.ok(art(id,30).includes('_D30'),id+' wears its battle form on DAY 30');
  for(const day of [5,30]) assert.ok(shipped(art(id,day)),id+' DAY '+day+' resolves to a shipped file');
 }
 assert.equal(art('NOBODY',30),null,'an unknown identity resolves to nothing rather than a broken path');
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
test('the shipped build carries a derived portrait for every production image',()=>{
 // dist never holds the art itself: `npm run assets` derives WebP from the production drop,
 // capped at the largest size the UI can paint at 2x. Sources under the cap are copied at
 // native size. This checks the derivation covers the drop exactly and stayed addressable.
 const dist=path.resolve(__dirname,'..','dist/ui/assets/npc');
 const webp=d=>fs.readdirSync(path.join(dist,d)).filter(f=>f.endsWith('.webp')).sort();
 for(const g of ['M','F'])
  assert.deepEqual(webp('normal/'+g),SLOTS.map(s=>s+'.webp'),'shipped normal/'+g+' mirrors the 100 slots');
 assert.deepEqual(webp('easter'),pool.easter.map(e=>e.id+'.webp'),'shipped Easter is addressed by id, ASCII only');
 assert.deepEqual(webp('boss'),list('04_BOSS').map(f=>f.replace(/\.png$/,'.webp')),
  'shipped Boss keeps every production state filename');
 // the placeholder pool the current build still draws from must survive regeneration
 for(let i=1;i<=5;i++)
  assert.ok(fs.existsSync(path.join(dist,'npc-0'+i+'.png')),'the placeholder portrait survives: npc-0'+i);
 assert.ok(fs.readFileSync(path.join(dist,'manifest.js'),'utf8').includes('G.NPCAssets'),
  'the generated manifest registers itself');
 assert.ok(fs.readFileSync(path.resolve(__dirname,'..','dist/index.html'),'utf8')
   .includes('ui/assets/npc/manifest.js'),'the build loads the manifest');
});

console.log(count+' npc asset groups passed');
