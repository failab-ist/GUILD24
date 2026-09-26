// CROSS-RUN DECORATION ACQUISITION — the measurement behind the acquisition timing reported to
// the Director, checked in so it is reproducible rather than quoted.
//
// Every Gold is earned by the production settlement path - META_v2.8 Gross Sales x the
// reached-Day rate, through Game.end() - and every purchase is a real Meta.buyDecoration,
// inside Debug.trajectory. The two purchase orders are measurement INPUT -
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
 const rows=t.ledgers.flat(),gains=rows.map(r=>r.gain);
 const zero=gains.filter(g=>g===0).length;
 console.log('  Run당 자본 획득: 평균 '+Math.round(gains.reduce((a,b)=>a+b,0)/gains.length)
  +' · 중앙값 '+pctile(gains,.5)+' · p25 '+pctile(gains,.25)+' · p75 '+pctile(gains,.75)
  +' · p90 '+pctile(gains,.9)+' · 0G로 끝난 Run '+(100*zero/gains.length).toFixed(0)+'%');
 /* Where the Capital actually comes from: the Day band reached, and how the Run ended. Both
    are views of the same Runs, so the two tables sum to the same total. */
 const band=d=>d>=30?'D30':d>=25?'D25-29':d>=20?'D20-24':d>=10?'D10-19':'D1-9';
 const group=(key,label)=>{
  const by={};
  for(const r of rows){const k=key(r);(by[k]??={runs:0,sales:0,gain:0});by[k].runs++;by[k].sales+=r.grossSales;by[k].gain+=r.gain;}
  console.log('  '+label);
  for(const k of Object.keys(by).sort()){const v=by[k];
   console.log('    '+String(k).padEnd(26)+'Run '+String(v.runs).padStart(5)
    +' · 평균 총매출 '+String(Math.round(v.sales/v.runs)).padStart(6)
    +' · 평균 자본 '+String(Math.round(v.gain/v.runs)).padStart(5)
    +' · 자본 점유 '+(100*v.gain/Math.max(1,gains.reduce((a,b)=>a+b,0))).toFixed(1)+'%');}
  return by;
 };
 const byBand=group(r=>band(r.dayReached),'Day band별:');
 const byEnd=group(r=>(r.endReason||'(미기록)').slice(0,24),'end reason별:');
 const end=t.accountsEnd;
 console.log('  Run '+R+' 시점 보유 장식: 평균 '+(end.reduce((a,x)=>a+x.decorations,0)/end.length).toFixed(2)
  +' · 4개 완성 '+(100*end.filter(x=>x.decorations===4).length/end.length).toFixed(0)+'%\n');
 detail[label]={order,acquisition:t.acquisition.map(a=>({position:a.position,id:a.id,price:a.price,
  acquired:a.acquired,ofTrajectories:a.ofTrajectories,medianRun:a.medianRun,
  p25:pctile(a.runs.filter(x=>x!==null),.25),p75:pctile(a.runs.filter(x=>x!==null),.75)})),
  gainPerRun:{mean:Math.round(gains.reduce((a,b)=>a+b,0)/gains.length),median:pctile(gains,.5),
   p25:pctile(gains,.25),p75:pctile(gains,.75),p90:pctile(gains,.9),zeroShare:zero/gains.length},
  byBand,byEnd,
  endOwnedMean:end.reduce((a,x)=>a+x.decorations,0)/end.length,
  completed:end.filter(x=>x.decorations===4).length/end.length};
 return med;
}
const s=run(STRONG,'강한 것부터');
const w=run(WEAK,'약한 것부터');
console.log('획득 Run 중앙값  강한 것부터 '+s.map(x=>x??'미획득').join(' / '));
console.log('                약한 것부터 '+w.map(x=>x??'미획득').join(' / '));
/* the expectation lives in META §Approved progression expectation - this line only quotes it (was a stale 2026-09-19 copy) */
console.log('META 기대       첫 장식 Run 4~6 · 네 칸 Run 9 (User 2026-09-24: 네 칸 Run 10~11까지)');
fs.writeFileSync(require('node:path').resolve(__dirname,'acquisition-results-v5.json'),
 JSON.stringify({version:5,trajectories:T,runsPerTrajectory:R,policy:'balanced',
  prices:Object.fromEntries(STRONG.map(id=>[id,D.decorationBy[id].price])),
  rates:D.capitalRates,strongFirst:s,weakFirst:w,detail,
  approvedExpectation:'META: 1st Decoration around Run 4-6, all four Slots around Run 9 (User 2026-09-24: four Slots by Run 10-11)'},null,2));
