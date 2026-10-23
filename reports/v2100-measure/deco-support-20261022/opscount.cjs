const path=require('path');const root=process.argv[2];const {RANK}=require('/home/user/GUILD24/tools/measure-v2100.cjs');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis;const P=G.Game.prototype,orig=P.relicWindow;
P.relicWindow=function(day){const r=orig.apply(this,arguments),s=this.run;if(day===5&&s&&!s.facilities.includes('opsRoom')){s.facilities.push('opsRoom');const w=s.relicWindow,k=w?w.candidateIds.indexOf('opsRoom'):-1;if(k>=0){w.candidateIds.splice(k,1);w.candidatePrices.splice(k,1);}}return r;};
let resolvedN=0,resolvedPos=0,resolvedSum=0;
const onRun=s=>{};for(let i=0;i<150;i++){const g=new G.Game(G.Meta.fresh());g.autosave=false;g.start('tg-'+i);G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun});}
const o=globalThis.__OPS;console.log(root,'calls',o.n,'bonus>0',(100*o.pos/o.n).toFixed(1)+'%','mean bonus',(100*o.sum/o.n).toFixed(2)+'%');
