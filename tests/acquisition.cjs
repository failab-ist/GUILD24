// CROSS-RUN DECORATION ACQUISITION — the measurement behind the acquisition timing reported to
// the Director, checked in so it is reproducible rather than quoted.
//
// Every Gold is earned by the production settlement path and every purchase is a real
// Meta.buyDecoration, inside Debug.trajectory. The two purchase orders are measurement INPUT -
// the ones the Final Balance pass reported - not a strategy this file invents. No price and no
// conversion rate is touched; nothing here writes a Canonical value.
//
//   node tests/acquisition.cjs           # 120 trajectories x 20 Runs
//   T=40 R=12 node tests/acquisition.cjs # smaller, same shape
const fs=require('node:fs');
const ROOT=require('node:path').resolve(__dirname,'../dist')+'/';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(ROOT+f+'.js');
const {Debug,DATA:D}=globalThis;
const T=Number(process.env.T||120),R=Number(process.env.R||20);

const STRONG=['dawnSign','guildPlaque','thriftSafe','premiumCase'];
const WEAK=['premiumCase','thriftSafe','guildPlaque','dawnSign'];
console.log('가격 확인: '+STRONG.map(id=>id+' '+D.decorationBy[id].price).join(' / '));
console.log('trajectories='+T+', runs per trajectory='+R+', policy=balanced\n');

const pctile=(xs,q)=>{if(!xs.length)return null;const a=[...xs].sort((x,y)=>x-y);return a[Math.min(a.length-1,Math.floor(q*(a.length-1)))];};
const detail={};
function run(order,label){
 const t=Debug.trajectory({trajectories:T,runs:R,policy:'balanced',prefix:'acq-'+label,purchaseOrder:order});
 console.log('== '+label+' ('+order.join(' → ')+') ==');
 console.log('  순서  장식            가격   획득 궤적      획득 Run  p25 / 중앙값 / p75');
 const med=[];
 for(const a of t.acquisition){
  const got=a.runs.filter(x=>x!==null);
  med.push(a.medianRun);
  console.log('   '+a.position+'    '+a.id.padEnd(14)+String(a.price).padStart(4)
   +'   '+(a.acquired+'/'+a.ofTrajectories).padStart(8)+' ('+(100*a.acquired/a.ofTrajectories).toFixed(0)+'%)'
   +'   '+String(a.medianRun??'미획득').padStart(7)
   +'   '+[pctile(got,.25),pctile(got,.5),pctile(got,.75)].map(x=>x??'—').join(' / ')
   +'  (p-값은 획득한 궤적만)');
 }
 // per-Run Capital, to show what the ladder is actually climbing
 const gains=t.ledgers.flat().map(r=>r.gain);
 const zero=gains.filter(g=>g===0).length;
 console.log('  Run당 자본 획득: 평균 '+Math.round(gains.reduce((a,b)=>a+b,0)/gains.length)
  +' · 중앙값 '+pctile(gains,.5)+' · p75 '+pctile(gains,.75)+' · p90 '+pctile(gains,.9)
  +' · 0G로 끝난 Run '+(100*zero/gains.length).toFixed(0)+'%');
 const end=t.accountsEnd;
 console.log('  Run '+R+' 시점 보유 장식: 평균 '+(end.reduce((a,x)=>a+x.decorations,0)/end.length).toFixed(2)
  +' · 4개 완성 '+(100*end.filter(x=>x.decorations===4).length/end.length).toFixed(0)+'%\n');
 detail[label]={order,acquisition:t.acquisition.map(a=>({position:a.position,id:a.id,price:a.price,
  acquired:a.acquired,ofTrajectories:a.ofTrajectories,medianRun:a.medianRun,
  p25:pctile(a.runs.filter(x=>x!==null),.25),p75:pctile(a.runs.filter(x=>x!==null),.75)})),
  gainPerRun:{mean:Math.round(gains.reduce((a,b)=>a+b,0)/gains.length),median:pctile(gains,.5),
   p75:pctile(gains,.75),p90:pctile(gains,.9),zeroShare:zero/gains.length},
  endOwnedMean:end.reduce((a,x)=>a+x.decorations,0)/end.length,
  completed:end.filter(x=>x.decorations===4).length/end.length};
 return med;
}
const s=run(STRONG,'강한 것부터');
const w=run(WEAK,'약한 것부터');
console.log('획득 Run 중앙값  강한 것부터 '+s.map(x=>x??'미획득').join(' / '));
console.log('                약한 것부터 '+w.map(x=>x??'미획득').join(' / '));
console.log('승인된 기대      3~4 / 6 / 8~9 / 10~11');
fs.writeFileSync(require('node:path').resolve(__dirname,'acquisition-results-v5.json'),
 JSON.stringify({version:5,trajectories:T,runsPerTrajectory:R,policy:'balanced',
  prices:Object.fromEntries(STRONG.map(id=>[id,D.decorationBy[id].price])),
  rates:D.capitalRates,strongFirst:s,weakFirst:w,detail,
  approvedExpectation:'3~4 / 6 / 8~9 / 10~11'},null,2));
