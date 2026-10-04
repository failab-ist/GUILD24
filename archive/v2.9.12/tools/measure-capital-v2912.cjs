// v2.9.12 measurement (User 2026-09-30): Store Capital pace with a flatter top of the rate table and a weaker 훈련소 제휴 간판.
// MEASUREMENT ONLY - in-memory patches; files on disk are untouched. One account plays Runs in a row (Debug.trajectory:
// the shipped settlement and Meta.buyDecoration), buying in the User's order: 훈련소 제휴 간판 first, then cheapest first.
//   node tools/measure-capital-v2912.cjs [--policy reader] [--traj 40] [--runs 12] [--rates 1,2,3,4,5] [--sign 0.65]
// --rates: % for reached Day <=9 / <=19 / <=24 / <=29 / 30. --sign: 훈련소 제휴 간판 chance of +1 Level.
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const policy=flag('--policy','reader'),T=Number(flag('--traj',40)),R=Number(flag('--runs',12)),rates=flag('--rates','1,2,3,4,5').split(',').map(Number),sign=Number(flag('--sign',.65));
if(rates.length!==DATA.capitalRates.length)throw Error('rates needs '+DATA.capitalRates.length+' values');
DATA.capitalRates.forEach((b,i)=>b.rate=rates[i]/100);DATA.decorationParams.trainingSign.chance=sign;
const order=['trainingSign','aidCabinet','memorialBook','infirmaryPlaque'];
const t=Debug.trajectory({trajectories:T,runs:R,policy,prefix:'cap-'+policy,purchaseOrder:order});
const at=i=>t.byIndex[i]?{d30:+(100*t.byIndex[i].reach30).toFixed(1),clear:+(100*t.byIndex[i].clearsPerRun).toFixed(1),capital:Math.round(t.byIndex[i].capitalGained),deco:+t.byIndex[i].decorationsAtStart.toFixed(2)}:null;
const fc=[...t.firstClear.runIndex].sort((a,b)=>a-b);
console.log(JSON.stringify({policy,rates,sign,traj:T,runs:R,acquisition:t.acquisition.map(a=>({id:a.id,medianRun:a.medianRun,acquired:a.acquired})),
 capitalPerRun:Math.round(t.byIndex.reduce((a,b)=>a+b.capitalGained,0)/t.byIndex.length),
 run1:at(0),run4:at(3),run8:at(7),run12:at(R-1),firstClear:{cleared:t.firstClear.cleared,of:T,medianRun:fc.length?fc[Math.floor(fc.length/2)]+1:null}}));
