const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const modules=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
function load(arm){const ctx=vm.createContext({console});for(const f of modules)vm.runInContext(fs.readFileSync(path.join(__dirname,arm,'dist',f+'.js'),'utf8'),ctx,{filename:f});return ctx;}
const original=load('template'),baseline=load('baseline'),both=load('both');
for(const policy of ['reader','expert','balanced']){
 const command=`Debug.simulate(8,'${policy}',null,'adaptive','hybrid',{relicAware:true})`;
 const a=vm.runInContext(command,original),b=vm.runInContext(command,baseline);
 assert.equal(JSON.stringify(b),JSON.stringify(a),'disabled candidate must exactly match '+policy);
}
// Pure boundary checks: no extra random draw and bonus cannot cross the fixed target.
const fixtures=vm.runInContext(`(()=>{
 const g=new Game(Meta.fresh());g.autosave=false;g.lessons=false;g.start('fixture');
 const make=()=>Adventurer.create(new RNG('fixture-npc'),99,14,Meta.fresh());
 const n=make();n.level=6;n.xp=0;n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n._rvCatchup={target:9,day:23};
 const d={id:'fixture',name:'fixture I',day:23,tier:1,power:1,hazards:[],families:[],scale:1,reward:1};
 const r=Dungeon.resolve(n,d,new RNG('fixture-result'),[]);return {level:n.level,xp:n.xp,base:r.baseXP,bonus:r.catchupBonus,active:!!n._rvCatchup};
})()`,both);
assert.equal(fixtures.level,9);assert.equal(fixtures.xp,0);assert.equal(fixtures.active,false);assert.ok(fixtures.bonus>0);assert.ok(fixtures.bonus<=fixtures.base);
// Check diff scope: every unpatched file is byte-for-byte the committed snapshot.
let checked=0;function walk(dir,rel=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(rel,e.name);if(e.isDirectory())walk(path.join(dir,e.name),p);else for(const arm of ['baseline','visit','xp','both']){if(['dist/systems/shop.js','dist/systems/dungeon.js','tools/measure-v2100.cjs'].includes(p.replaceAll('\\','/')))continue;assert.equal(fs.readFileSync(path.join(__dirname,arm,p)).compare(fs.readFileSync(path.join(__dirname,'template',p))),0,p);checked++;}}}
walk(path.join(__dirname,'template'));
console.log(JSON.stringify({status:'PASS',baselineParity:'8 runs × 3 policies',capFixture:fixtures,unchangedFileComparisons:checked}));
