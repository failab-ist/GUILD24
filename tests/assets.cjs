// Chunk F: vendored presentation assets stay local, licensed and complete.
// The game must be able to render every string it can produce, with no runtime fetch.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);

test('every vendored asset ships with the build and carries its licence',()=>{
 const html=read('dist/index.html'),css=read('dist/ui/ui.css');
 for(const src of [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1])){
  if(src.startsWith('data:'))continue;
  assert.ok(!/^(https?:)?\/\//.test(src),'index.html reference is local: '+src);
  assert.ok(fs.existsSync(path.join(root,'dist',src)),'shipped file exists: '+src);
 }
 for(const url of [...css.matchAll(/url\('([^']+)'\)/g)].map(m=>m[1])){
  assert.ok(!/^(https?:)?\/\//.test(url),'stylesheet reference is local: '+url);
  assert.ok(fs.existsSync(path.join(root,'dist','ui',url)),'shipped font exists: '+url);
 }
 assert.ok(fs.existsSync(path.join(root,'dist/ui/fonts/OFL.md')),'the font licence ships with the font');
 assert.ok(fs.existsSync(path.join(root,'dist/ui/vendor/anime.LICENSE.md')),'the animation licence ships with the library');
 assert.ok(read('reports/ASSETS.md').includes('OFL-1.1'),'the asset manifest records the licences');
});

test('the pixel font subset covers every character this build can render',()=>{
 const chars=new Set();
 for(const file of walk('dist')){
  if(!/\.(js|html)$/.test(file)||file.includes('vendor/'))continue;
  for(const ch of read(file))chars.add(ch);
 }
 const face=path.join(root,'dist/ui/fonts/Galmuri14.woff2');
 const cmap=execFileSync('python3',['-c',
  "import sys\nfrom fontTools.ttLib import TTFont\nf=TTFont(sys.argv[1])\nsys.stdout.buffer.write(''.join(chr(c) for c in f.getBestCmap()).encode('utf-8'))",face],
  {encoding:'utf8',maxBuffer:1<<22});
 const have=new Set(cmap);
 // a character the family itself never carried (data-only symbols) is not a stale subset
 const absent=new Set(JSON.parse(read('dist/ui/fonts/coverage.json')).absentFromFamily);
 const missing=[...chars].filter(c=>!have.has(c)&&!absent.has(c)&&c.trim()!=='');
 assert.deepEqual(missing,[],'run `npm run assets`; the subset is missing: '+missing.join(' '));
});

test('the animation library is presentation only and the game runs without it',()=>{
 for(const file of walk('dist')){
  if(!/\.js$/.test(file)||file.includes('vendor/'))continue;
  if(/systems\/|data\//.test(file))
   assert.ok(!/\banime\b/.test(read(file)),file+' must not depend on the animation library');
 }
 assert.ok(read('dist/ui/app.js').includes("typeof anime"),'the UI degrades gracefully when the library is absent');
});
console.log(count+' asset groups passed');
