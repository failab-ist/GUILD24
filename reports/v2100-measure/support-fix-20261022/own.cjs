// 중반 계정 기준 판(아무것도 안 얹음)에서 봇이 스스로 가진 점포지원 비율
const path=require('path'),fs=require('fs');const root='/home/user/GUILD24';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,{RANK}=require(path.join(root,'tools/measure-v2100.cjs'));const accs=process.argv[2]==='fresh'?null:JSON.parse(fs.readFileSync('a8/accounts.json'));
const cnt={},cnt5={};let n=0;const N=+process.argv[3]||300;
for(let i=0;i<N;i++){const a=accs?JSON.parse(JSON.stringify(accs[i%100])):G.Meta.fresh();const g=new G.Game(a);g.autosave=false;g.lessons=!accs;g.start('own-'+i);
 G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun:s=>{n++;for(const id of new Set(s.facilities))cnt[id]=(cnt[id]||0)+1;}});}
console.log((accs?'중반':'새 판')+' n'+n,Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+' '+(100*v/n).toFixed(0)+'%').join(', '));
