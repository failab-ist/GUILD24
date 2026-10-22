// toggle.cjs 방식(continueRun count=1 → 늘 'continue-0' 굴림)과 판마다 다른 굴림을 비교
const path=require('path');const root='/home/user/GUILD24';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,{RANK}=require(path.join(root,'tools/measure-v2100.cjs'));
const fix=process.argv[2]==='fix',n=+process.argv[3]||600;
if(fix){const R0=G.RNG;G.RNG=class extends R0{constructor(s,st){super(s==='continue-0'&&globalThis.__SEED?globalThis.__SEED:s,st);}};}
const rows=[];for(let seed=0;seed<n;seed++){const g=new G.Game(G.Meta.fresh());g.autosave=false;g.start('tg-'+seed);globalThis.__SEED='roll-'+seed;
 G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun:s=>rows.push(s)});}
const p=f=>(100*rows.filter(f).length/n).toFixed(1);
// 같은 굴림이면 D1 첫 사건 같은 초반 결과가 판끼리 겹치는지: 끝난 날 분포의 겹침
const days={};for(const s of rows)days[s.day]=(days[s.day]||0)+1;
console.log(fix?'판마다 굴림':'continue-0',`n${n} D10 ${p(s=>s.day>=10)} D20 ${p(s=>s.day>=20)} D30 ${p(s=>s.day>=30)} 클리어 ${p(s=>s.win)} 같은 끝난날 최다 ${Math.max(...Object.values(days))}`);
