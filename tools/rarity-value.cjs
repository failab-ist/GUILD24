// Does NPC Rarity pay for itself? - MEASUREMENT ONLY, dev tool, never part of npm test.
// User 2026-09-26: Rarity raises the operating cost (core-six average Rarity x6%) and the Deep sponsorship
// (+20% a step); does what it gives (growth potential +0.06 a step, a third Trait at Rare+) earn that back?
// Same seeds for every arm, `reader` policy, fresh account, no Decoration. Arms change one side in memory only:
//   cur          - the rules as they are
//   benefitOff   - Rarity gives nothing (potential term 0, Trait count as a Common's)
//   costOff      - Rarity costs nothing (operating cost and Deep sponsorship ignore it)
//   allCommon    - every adventurer is 평범 (the rarity draw is [100,0,0,0,0])
//   premium*     - the same four under the proposed 명예 모험가 액자 weights [40,30,20,7.5,2.5], where Rarity is common
//   node tools/rarity-value.cjs [runs=600] [--out file]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const FILES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const PREMIUM='40,30,20,7.5,2.5';
const ARMS=[['cur',{}],['benefitOff',{benefitOff:1}],['costOff',{costOff:1}],['allCommon',{weights:'100,0,0,0,0'}],
 ['premium cur',{weights:PREMIUM}],['premium benefitOff',{weights:PREMIUM,benefitOff:1}],['premium costOff',{weights:PREMIUM,costOff:1}]];
const one=(src,a,b)=>{const n=src.split(a).length-1;if(n!==1)throw Error('patch point x'+n+': '+a.slice(0,60));return src.replace(a,b);};
function load(p){for(const f of FILES){let src=fs.readFileSync(path.join(root,'dist',f+'.js'),'utf8');
  if(f==='systems/adventurer'){
   if(p.weights)src=one(src,':[60,27,10,2.5,.5]);',':['+p.weights+']);');
   if(p.benefitOff){src=one(src,'potential=1+rarity*.06+r.next()*.10','potential=1+r.next()*.10');src=one(src,'target=r.int(1,rarity>1?3:2)','target=r.int(1,2)');}}
  if(f==='systems/shop'&&p.costOff){src=one(src,'*(1+.06*avgRarity)','');src=one(src,'(1+t.sponsorRarityStep*n.rarity)','1');}
  vm.runInThisContext(src,{filename:f+'.js'});}}
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
if(process.env.RARITY_WORKER){
 process.on('message',({label,p,N})=>{globalThis.window=globalThis;load(p);
  const r=Debug.simulate(N,'reader',null,'adaptive','hybrid',{relicAware:true});
  process.send({label,N,avgDay:r.averageDay,reach20:r.reach20,reach30:r.reach30,clear:r.clearsPerRun,deaths:r.averageDeaths,
   endBankrupt:r.endedBy.bankrupt/N,capital:mean(r.settlement.gains),overhead:r.overheadMedian,coreLevel:r.coreLevelMedian,coreRarity:r.coreRarityMedian},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),N=Number(args.find(a=>/^\d+$/.test(a))||600),oi=args.indexOf('--out'),res={};let live=0;const q=ARMS.slice();
 const next=()=>{if(!q.length){if(!live)done();return;}const [label,p]=q.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,RARITY_WORKER:'1'}});c.on('message',m=>{res[m.label]=m;});c.on('exit',()=>{live--;next();});c.send({label,p,N});};
 const f=(x,d=1)=>x.toFixed(d);
 const done=()=>{console.log('arm'.padEnd(20),'D20','D30','clear','avgDay','deaths','end:bankrupt','capital/run','overhead(med)','coreLv','coreRarity');
  for(const [label] of ARMS){const r=res[label];if(!r){console.log(label,'FAILED');continue;}
   console.log(label.padEnd(20),f(100*r.reach20)+'%',f(100*r.reach30)+'%',f(100*r.clear)+'%',f(r.avgDay),f(r.deaths,2),f(100*r.endBankrupt,0)+'%',Math.round(r.capital),f(r.overhead||0),f(r.coreLevel),f(r.coreRarity,2));}
  if(oi>=0)fs.writeFileSync(args[oi+1],JSON.stringify({N,results:res},null,1));};
 for(let i=0;i<os.cpus().length;i++)next();}
