// STORE CAPITAL ANTI-FARM VALIDATION — META_v2.8 §STORE CAPITAL.
//
// The formula rewards Gross Sales x survival depth, so the question this answers is whether any
// degenerate way of playing beats engaged play at earning Store Capital. Every arm is an
// EXISTING simulation policy / pricing combination - no new gameplay AI is written here - and
// every Gold is earned through the production settlement path. Nothing tunes a value.
//
// Measured per Run AND per action, because "efficient" for a farm means cheap in real time: a
// short Run repeated is only a strategy if it earns more per unit of play, not per calendar Run.
//
//   node tests/antifarm.cjs          # 200 seeds per arm
//   N=60 node tests/antifarm.cjs
const fs=require('node:fs');
const ROOT=require('node:path').resolve(__dirname,'../dist')+'/';
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(ROOT+f+'.js');
const {Debug,Meta}=globalThis;
const N=Number(process.env.N||200);

const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const ARMS=[
 {key:'balanced',        label:'engaged / balanced',   policy:'balanced',    pricing:'adaptive'},
 {key:'spender',         label:'engaged / spender',    policy:'spender',     pricing:'adaptive'},
 {key:'skilled',         label:'engaged / skilled',    policy:'skilled',     pricing:'adaptive'},
 {key:'overcharge',      label:'overcharge-heavy',     policy:'balanced',    pricing:'overcharge'},
 {key:'meta-farm',       label:'meta-farm / 반복 단축', policy:'meta-farm',   pricing:'adaptive'},
 {key:'zero-supply',     label:'zero-sale / 무활동',    policy:'zero-supply', pricing:'adaptive'},
 {key:'poverty',         label:'minimum order',        policy:'poverty',     pricing:'adaptive'}];

const rows=[];
for(const arm of ARMS){
 const r=Debug.simulate(N,arm.policy,null,arm.pricing,'hybrid');
 const t=r.settlement;
 const gain=mean(t.gains),sales=mean(t.sales);
 rows.push({...arm,gain,sales,
  perAction:gain/Math.max(1e-9,r.actionsPerRun),
  perDay:gain/Math.max(1e-9,r.averageDay),
  actions:r.actionsPerRun,day:r.averageDay,
  zeroShare:t.gains.filter(g=>g===0).length/Math.max(1,t.gains.length),
  reach30:r.reach30});
}
const n0=x=>Math.round(x).toLocaleString();
console.log('N='+N+' seeds per arm, fresh Account per seed, identical seed cohort\n');
console.log('arm                      Run당 자본  총매출   평균 Day  행동/Run  자본/행동  자본/Day  0G Run  D30');
for(const r of rows)
 console.log(r.label.padEnd(24)+n0(r.gain).padStart(9)+n0(r.sales).padStart(9)
  +r.day.toFixed(1).padStart(10)+r.actions.toFixed(0).padStart(9)
  +r.perAction.toFixed(3).padStart(10)+r.perDay.toFixed(2).padStart(10)
  +(100*r.zeroShare).toFixed(0).padStart(6)+'%'+(100*r.reach30).toFixed(1).padStart(6)+'%');

const by=k=>rows.find(r=>r.key===k);
const engaged=[by('balanced'),by('spender'),by('skilled')];
const bestEngagedRun=Math.max(...engaged.map(r=>r.gain));
const worstEngagedRun=Math.min(...engaged.map(r=>r.gain));
const bestEngagedAction=Math.max(...engaged.map(r=>r.perAction));

console.log('\n판정');
const verdicts=[];
const say=(pass,line)=>{verdicts.push({pass,line});console.log('  '+(pass?'PASS  ':'FAIL  ')+line);};

// 1. zero-sale / inactivity earns nothing, or is clearly worse than engaged play
const zero=by('zero-supply');
say(zero.gain===0||zero.gain<worstEngagedRun*0.5,
 'zero-sale / 무활동: Run당 '+n0(zero.gain)+' vs engaged 최저 '+n0(worstEngagedRun)
 +(zero.gain===0?' (0G)':' ('+(100*zero.gain/worstEngagedRun).toFixed(0)+'%)'));

// 2. repeated short Runs are not a more efficient Meta strategy, per Run OR per action
const farm=by('meta-farm');
say(farm.gain<worstEngagedRun&&farm.perAction<bestEngagedAction,
 'meta-farm 반복: Run당 '+n0(farm.gain)+' (engaged 최저 '+n0(worstEngagedRun)+')'
 +' · 자본/행동 '+farm.perAction.toFixed(3)+' (engaged 최고 '+bestEngagedAction.toFixed(3)+')');

// 3. overcharge-heavy does not dominate merely by inflating Gross Sales
const over=by('overcharge');
say(over.gain<=bestEngagedRun*1.15,
 'overcharge-heavy: Run당 '+n0(over.gain)+' vs engaged 최고 '+n0(bestEngagedRun)
 +' ('+(100*over.gain/bestEngagedRun).toFixed(0)+'%)');

// 4. a minimum-order Run is not a shortcut either
const poor=by('poverty');
say(poor.gain<worstEngagedRun,
 'minimum order: Run당 '+n0(poor.gain)+' vs engaged 최저 '+n0(worstEngagedRun));

fs.writeFileSync(require('node:path').resolve(__dirname,'antifarm-results-v5.json'),
 JSON.stringify({version:5,seeds:N,
  rates:globalThis.DATA.capitalRates,
  arms:rows.map(({key,label,policy,pricing,gain,sales,perAction,perDay,actions,day,zeroShare,reach30})=>
   ({key,label,policy,pricing,gain,sales,perAction,perDay,actions,day,zeroShare,reach30})),
  verdicts},null,2));
console.log('\n'+(verdicts.every(v=>v.pass)?'anti-farm validation PASS':'anti-farm validation FAIL'));
