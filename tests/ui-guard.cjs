// Chunk F acceptance: the parts of the UI contract a Node process can prove.
// Covers UI-Q02/Q19/Q24/Q26/Q32/Q34/Q35/Q39, REL-Q39, DUN-Q21 and the
// V2_4_EXECUTION_PLAN §8.1 Playwright boundary contract.
// Everything that needs a real viewport lives in `npm run qa:visual` (UI-Q38), never here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const app=read('dist/ui/app.js'),css=read('dist/ui/ui.css'),html=read('dist/index.html'),pkg=JSON.parse(read('package.json'));
const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);

test('§8.1: Playwright is a devDependency and never enters the shipped build',()=>{
 assert.ok(pkg.devDependencies?.playwright,'playwright is declared in devDependencies');
 assert.ok(!pkg.dependencies,'the game itself has no runtime dependencies');
 for(const file of walk('dist'))
  assert.ok(!read(file).toLowerCase().includes('playwright'),file+' references playwright');
 assert.ok(!pkg.scripts.test.includes('qa:visual')&&!pkg.scripts.test.includes('qa-visual'),'npm test does not depend on the browser harness');
 assert.equal(pkg.scripts['qa:visual'],'node tools/qa-visual.cjs');
 const harness=read('tools/qa-visual.cjs');
 assert.ok(!/exec\w*\(['"`][^'"`]*playwright install/.test(harness),'the harness never downloads a browser');
 assert.ok(harness.includes('executablePath'),'it launches the preinstalled Chromium by path');
});

test('CORE_RUN: the build still runs from the filesystem with one local stylesheet',()=>{
 const sheets=[...html.matchAll(/<link[^>]+stylesheet[^>]*>/g)].map(m=>m[0]);
 assert.equal(sheets.length,1,'exactly one stylesheet is linked');
 assert.ok(sheets[0].includes('ui/ui.css'),'it is the consolidated sheet');
 assert.ok(!/https?:\/\//.test(html.replace(/<meta[^>]*>/g,'')),'no external origin is fetched');
 assert.equal((css.match(/^:root\{/gm)||[]).length,1,'the sheet defines exactly one :root token block');
 for(const dead of ['.stage-grid','.layout{','.store-panel','.sell-toolbar','.statsbar','.item-grid'])
  assert.ok(!css.includes(dead),'dead legacy selector '+dead+' is gone');
});

test('UI §RESPONSIVE RULE: the sheet is authored mobile-first',()=>{
 const min=(css.match(/@media\(min-width/g)||[]).length,max=(css.match(/@media\(max-width/g)||[]).length;
 assert.ok(min>=2,'tablet/desktop are added with min-width queries');
 assert.equal(max,0,'nothing is a desktop layout shrunk down with max-width');
 assert.ok(/button\{[^}]*min-height:44px/.test(css),'the 44px touch contract is in the base sheet');
 assert.ok(css.includes('env(safe-area-inset-bottom)')&&css.includes('env(safe-area-inset-top)'),'safe areas are honoured');
});

test('UI-Q35 / DUN-Q21: all 9 Hazards carry a canonical pressure line',()=>{
 const pressure={poison:'강인함',bind:'기동',corrosion:'강인함',mire:'기동',fire:'강인함',fear:'정신',dark:'정신',cold:'강인함',whiteout:'정신'};
 assert.deepEqual(Object.keys(Presentation.hazardPressure).sort(),Object.keys(DATA.hazards).sort(),'every canonical Hazard is explained');
 for(const [key,stat] of Object.entries(pressure)){
  assert.ok(Presentation.hazardPressure[key].includes(stat),key+' pressures '+stat);
  assert.ok(Presentation.hazardPressure[key].includes('압박'),key+' states the pressure');
 }
 for(const key of ['dark','whiteout'])
  assert.ok(Presentation.hazardPressure[key].includes('중심')&&Presentation.hazardPressure[key].includes('보조'),key+' names a primary and a secondary axis');
 assert.equal(Presentation.hazardRows(['cold']).at(0).name,'냉기');
});
console.log(count+' ui guard groups passed');
