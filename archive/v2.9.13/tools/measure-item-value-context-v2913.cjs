// v2.9.13 measurement (User 2026-09-30): an Item's contribution BY SITUATION and HOW OFTEN each situation comes up in a Run.
// MEASUREMENT ONLY. Every departure of real bot Runs is classed by the adventurer's bare prepared Power against the Gate
// (strong >= 1.0 · mid 0.9~1.0 · weak < 0.9); the share of each class per Day band is counted per bot, and so is the share
// of departures that head into each Hazard. Each Item is then resolved against an empty Bag on the same draws, per class,
// and the expected contribution of one Item in a Run is the class values weighted by how often each class comes up.
// A Counter is scored on Gates whose Hazards it answers; its "use share" is how many departures head into such a Gate.
//   node tools/measure-item-value-context-v2913.cjs [--runs 150] [--per 200] [--k 40] [--out file.json]
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const RUNS=Number(flag('--runs',150)),PER=Number(flag('--per',200)),K=Number(flag('--k',40)),OUT=flag('--out',null);
const acct=JSON.parse(fs.readFileSync(path.join(ROOT,'reports/expert-bot/account-0930-run3-start.json'),'utf8'));
const D=DATA,copy=x=>JSON.parse(JSON.stringify(x)),HZ=Object.keys(D.hazards);
const BANDS=['D1-10','D11-20','D21-29'],CTXS=['strong','mid','weak'];
const band=d=>d<=10?'D1-10':d<=20?'D11-20':'D21-29',ctxOf=r=>r>=1?'strong':r>=.9?'mid':'weak';
/* 1. every departure, tagged by bot, band and class */
const all=[];let policy=null;
const P=Game.prototype,night=P.night;
P.night=function(){const s=this.run;for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(!n||!n.alive)continue;
  const d=this.gateFor(n);if(!d||d.family==='final'||s.day>=30)continue;
  const bare=Dungeon.prepare({...n,pack:[]},d,s.facilities),ratio=Dungeon.preparedPower(bare.effects)/(d.power||1);
  all.push({policy,band:band(s.day),ctx:ctxOf(ratio),n:{...copy(n),pack:[]},d:copy(d),fac:[...s.facilities]});}
 return night.apply(this,arguments);};
policy='reader';Debug.simulate(RUNS,'reader',null,'adaptive','hybrid',{});
policy='expert';Debug.simulate(RUNS,'expert',acct,'adaptive','hybrid',{});
P.night=night;
const pct=(a,b)=>b?+(100*a/b).toFixed(1):0;
const freq={};for(const p of ['reader','expert','both'])for(const b of BANDS){const set=all.filter(x=>x.band===b&&(p==='both'||x.policy===p));
 (freq[p]??={})[b]={departures:set.length,...Object.fromEntries(CTXS.map(c=>[c,pct(set.filter(x=>x.ctx===c).length,set.length)])),
  hazard:Object.fromEntries(HZ.map(h=>[h,pct(set.filter(x=>x.d.hazards.includes(h)).length,set.length)]))};}
/* 2. per class and band, one Item against an empty Bag, same draws */
const thin=(a,cap)=>{const step=Math.max(1,Math.floor(a.length/cap));return a.filter((_,i)=>i%step===0).slice(0,cap);};
const WIN=['성공','대성공'],HURT=['부상','중상'];
function run(sample,pack,k){const n={...copy(sample.n),pack};const rep=Dungeon.resolve(n,copy(sample.d),new RNG('item-value',1000003*k+7),sample.fac);
 return {win:+WIN.includes(rep.outcome),hurt:+HURT.includes(rep.outcome),death:+(rep.outcome==='사망'),fatigue:rep.finalFatigue??n.fatigue};}
const baseOf=new Map(),baseRuns=s=>{if(!baseOf.has(s))baseOf.set(s,Array.from({length:K},(_,k)=>run(s,[],k)));return baseOf.get(s);};
const rows=[];
for(const it of D.items.filter(it=>it.id!=='coupon')){const counters=HZ.filter(h=>(it.effects[h]||0)>0);
 const row={id:it.id,name:it.name,rarity:it.rarity,category:it.category,buy:it.buy,counter:counters.length>0,use:{},ctx:{}};
 for(const b of BANDS){const inBand=all.filter(x=>x.band===b),fits=s=>!counters.length||s.d.hazards.some(h=>counters.includes(h));
  row.use[b]=pct(inBand.filter(fits).length,inBand.length);row.ctx[b]={};
  for(const c of CTXS){const set=thin(inBand.filter(s=>s.ctx===c&&fits(s)),PER),acc={n:0,win:0,hurt:0,death:0,fatigue:0};
   for(const s of set){const base=baseRuns(s);for(let k=0;k<K;k++){const a=base[k],x=run(s,[it.id],k);acc.n++;for(const m of ['win','hurt','death','fatigue'])acc[m]+=x[m]-a[m];}}
   row.ctx[b][c]=acc.n?{samples:acc.n/K,win:+(100*acc.win/acc.n).toFixed(2),hurt:+(100*acc.hurt/acc.n).toFixed(2),death:+(100*acc.death/acc.n).toFixed(2),fatigue:+(acc.fatigue/acc.n).toFixed(2)}:null;}}
 rows.push(row);}
const out={runs:RUNS,per:PER,k:K,freq,rows};
if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));
console.log(JSON.stringify(freq.both));
