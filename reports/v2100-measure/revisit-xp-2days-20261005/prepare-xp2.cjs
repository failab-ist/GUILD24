const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname,old=path.join(root,'xp'),next=path.join(root,'xp2');
if(fs.existsSync(next))throw Error('Refuse to overwrite existing candidate');
fs.cpSync(old,next,{recursive:true});
const file=path.join(next,'dist/systems/shop.js'),source=fs.readFileSync(file,'utf8'),anchor='RV_XP&&n.introduced&&missed>=5';
assert.equal(source.split(anchor).length,2);fs.writeFileSync(file,source.replace(anchor,'RV_XP&&n.introduced&&missed>=2'));
let unchanged=0;function walk(dir,relative=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const rel=path.join(relative,e.name);if(e.isDirectory())walk(path.join(dir,e.name),rel);else if(rel.replaceAll('\\','/')!=='dist/systems/shop.js'){assert.equal(fs.readFileSync(path.join(old,rel)).compare(fs.readFileSync(path.join(next,rel))),0,rel);unchanged++;}}}walk(old);
const modules=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const ctx=vm.createContext({console});for(const m of modules)vm.runInContext(fs.readFileSync(path.join(next,'dist',m+'.js'),'utf8'),ctx,{filename:m});
const fixtures=vm.runInContext(`(()=>{
 const rows=[];
 for(const [label,missed,known,level,recovery] of [['one-missed',1,true,1,0],['two-missed',2,true,1,0],['new',2,false,1,0],['at-floor',2,true,3,0],['recovering',1,true,1,2]]){
  const g=new Game(Meta.fresh());g.autosave=false;g.lessons=false;g.start('xp2-boundary');g.run.day=8;g.run.event=null;g.run.expectedVisitors=1;
  const n=g.run.npcs[0];n.alive=true;n.introduced=known;n.level=level;n._rvEligibleDays=missed;n.recovery=recovery;delete n._rvCatchup;g.run.npcs=[n];g.generateOffers=()=>{};
  g.morningQueue({rawVisitors:1,baseVisitors:1,hubExtra:0,decoExtra:0});rows.push({label,active:n._rvCatchup||null,missedAfter:n._rvEligibleDays});
 }
 const g=new Game(Meta.fresh());g.autosave=false;g.lessons=false;g.start('xp2-cap');const n=g.run.npcs[0];n.level=6;n.xp=0;n.stats={combat:1000,survival:1000,mobility:1000,spirit:1000};n._rvCatchup={target:9,day:23};
 const r=Dungeon.resolve(n,{id:'fixture',name:'fixture I',day:23,tier:1,power:1,hazards:[],families:[],scale:1,reward:1},new RNG('fixture-result'),[]);
 return {rows,cap:{level:n.level,xp:n.xp,base:r.baseXP,bonus:r.catchupBonus,active:!!n._rvCatchup}};
})()`,ctx);
assert.equal(fixtures.rows[0].active,null);assert.equal(fixtures.rows[1].active.target,3);assert.equal(fixtures.rows[1].missedAfter,0);assert.equal(fixtures.rows[2].active,null);assert.equal(fixtures.rows[3].active,null);assert.equal(fixtures.rows[4].active,null);assert.equal(fixtures.rows[4].missedAfter,1);
assert.equal(fixtures.cap.level,9);assert.equal(fixtures.cap.xp,0);assert.equal(fixtures.cap.active,false);assert.ok(fixtures.cap.bonus>0&&fixtures.cap.bonus<=fixtures.cap.base);
const files=['dist/systems/shop.js','dist/systems/dungeon.js','tools/measure-v2100.cjs'].map(file=>({file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(next,file))).digest('hex')}));
const manifest={commit:'177d1ab297157c96a80da9049674a9f5feeb23a5',previousReportCommit:'ebe7da7052bd4b001d69499fce8d2286742849b0',arm:'xp2',visit:false,xp:true,missedEligibleDays:2,files,verification:{status:'PASS',unchangedFileComparisons:unchanged,fixtures}};
fs.writeFileSync(path.join(root,'provenance-xp2.json'),JSON.stringify(manifest,null,2));
let estimate=fs.readFileSync(path.join(root,'save-estimate.cjs'),'utf8');assert.equal(estimate.split('missed>=5').length,2);
estimate=estimate.replace('missed>=5','missed>=2').replace("'save-estimate.json'","'save-estimate-xp2.json'");fs.writeFileSync(path.join(root,'save-estimate-xp2.cjs'),estimate);
console.log(JSON.stringify(manifest.verification,null,2));
