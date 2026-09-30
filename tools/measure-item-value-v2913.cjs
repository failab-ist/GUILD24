// v2.9.13 measurement (User 2026-09-30): what one Item adds to one expedition, for a price review across every category.
// MEASUREMENT ONLY - nothing in the game changes. Departures are sampled from real bot Runs (the adventurer and the Gate
// they were heading to, the store's Supports), then each sample is resolved K times with an empty Bag and with that one
// Item, on the same random draws (common random numbers), so the difference is the Item's alone.
// A Counter is only scored on Gates whose Hazards it answers (it is bought for them); every other Item on every sample.
//   node tools/measure-item-value-v2913.cjs [--runs 60] [--per-band 150] [--k 30] [--full-use] [--out file.json]
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const RUNS=Number(flag('--runs',60)),PER=Number(flag('--per-band',150)),K=Number(flag('--k',30)),OUT=flag('--out',null);
/* --full-use (User 2026-09-30): a Counter is scored only where nothing of it is wasted - every Hazard it answers on that Gate
   has a bare gap at least its value - so the measurement reads what a point of Counter does, not an overshoot */
const FULL=args.includes('--full-use');
const acct=JSON.parse(fs.readFileSync(path.join(ROOT,'reports/expert-bot/account-0930-run3-start.json'),'utf8'));
const D=DATA,copy=x=>JSON.parse(JSON.stringify(x)),band=d=>d<=10?'D1-10':d<=20?'D11-20':'D21-29';
const HZ=Object.keys(D.hazards);
/* 1. departures from real Runs: reader on a fresh account and expert on the User's 0930 account, every other visitor */
const pool={'D1-10':[],'D11-20':[],'D21-29':[]};let tick=0;
const P=Game.prototype,night=P.night;
P.night=function(){const s=this.run;for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(!n||!n.alive)continue;
  const d=this.gateFor(n);if(!d||d.family==='final'||s.day>=30)continue;if(!FULL&&(tick++)%2)continue;
  const gap=Object.fromEntries(Dungeon.prepare({...n,pack:[]},d,s.facilities).hazards.map(h=>[h.key,h.gap]));
  pool[band(s.day)].push({n:{...copy(n),pack:[]},d:copy(d),fac:[...s.facilities],gap});}
 return night.apply(this,arguments);};
Debug.simulate(RUNS,'reader',null,'adaptive','hybrid',{});
Debug.simulate(RUNS,'expert',acct,'adaptive','hybrid',{});
P.night=night;
const all={};const thin=(a,cap)=>{const step=Math.max(1,Math.floor(a.length/cap));return a.filter((_,i)=>i%step===0).slice(0,cap);};
for(const b of Object.keys(pool)){all[b]=pool[b];pool[b]=thin(pool[b],PER);}
/* 2. one Item against an empty Bag, same draws */
const WIN=['성공','대성공'],HURT=['부상','중상'];
function run(sample,pack,k){const n={...copy(sample.n),pack};const r=new RNG('item-value',1000003*k+7);
 const rep=Dungeon.resolve(n,copy(sample.d),r,sample.fac);
 return {win:+WIN.includes(rep.outcome),hurt:+HURT.includes(rep.outcome),death:+(rep.outcome==='사망'),great:+(rep.outcome==='대성공'),fatigue:rep.finalFatigue??n.fatigue,loot:rep.loot||0};}
const baseOf=new Map(),baseRuns=s=>{if(!baseOf.has(s))baseOf.set(s,Array.from({length:K},(_,k)=>run(s,[],k)));return baseOf.get(s);};
const items=D.items.filter(it=>it.id!=='coupon');
const rows=[];
for(const it of items){const counters=HZ.filter(h=>(it.effects[h]||0)>0);const row={id:it.id,name:it.name,rarity:it.rarity,category:it.category,buy:it.buy,counter:counters.length>0,bands:{}};
 for(const b of Object.keys(pool)){const acc={n:0,win:0,hurt:0,death:0,great:0,fatigue:0,loot:0};
  const fits=s=>s.d.hazards.some(h=>counters.includes(h))&&(!FULL||counters.filter(h=>s.d.hazards.includes(h)).every(h=>(s.gap[h]||0)>=it.effects[h]));
  const set=counters.length?thin((FULL?all[b]:pool[b]).filter(fits),PER):pool[b];
  set.forEach(s=>{const base=baseRuns(s);
   for(let k=0;k<K;k++){const a=base[k],x=run(s,[it.id],k);acc.n++;for(const m of ['win','hurt','death','great','fatigue','loot'])acc[m]+=x[m]-a[m];}});
  row.bands[b]=acc.n?{samples:acc.n/K,win:+(100*acc.win/acc.n).toFixed(2),hurt:+(100*acc.hurt/acc.n).toFixed(2),death:+(100*acc.death/acc.n).toFixed(2),
   great:+(100*acc.great/acc.n).toFixed(2),fatigue:+(acc.fatigue/acc.n).toFixed(2),loot:+(acc.loot/acc.n).toFixed(1)}:null;}
 rows.push(row);}
const out={runs:RUNS,perBand:PER,k:K,fullUse:FULL,samples:Object.fromEntries(Object.entries(pool).map(([b,a])=>[b,a.length])),departures:Object.fromEntries(Object.entries(all).map(([b,a])=>[b,a.length])),rows};
if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));
console.log(JSON.stringify(out.samples));
for(const r of rows)console.log(r.id.padEnd(13),r.buy,Object.entries(r.bands).map(([b,x])=>b+' '+(x?`win ${x.win} hurt ${x.hurt} death ${x.death} fat ${x.fatigue}`:'-')).join(' | '));
