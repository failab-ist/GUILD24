// v2.9.13 measurement (User 2026-09-30): re-inspect the Counter values and the Counter Ladder with what the price review
// taught - an Item's worth depends on who carries it (strong / weak against the Gate), on how big the gap it meets actually
// is, and on what shares the Bag with it. MEASUREMENT ONLY.
//  1. the bare Hazard gap a departure meets, by Tier, pressed Stat and situation (percentiles), against each rung's value;
//  2. one- and two-slot Bags per Gate family, Tier and situation, resolved against an empty Bag on the same draws.
//   node tools/measure-counter-ladder-v2913.cjs [--runs 150] [--per 60] [--k 30] [--profiles-only] [--out file.json]
//  3. which side of a two-Hazard Gate is open (both / first / second), how often, by Job, and the Bags for each side.
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const RUNS=Number(flag('--runs',150)),PER=Number(flag('--per',60)),K=Number(flag('--k',30)),OUT=flag('--out',null);
const acct=JSON.parse(fs.readFileSync(path.join(ROOT,'reports/expert-bot/account-0930-run3-start.json'),'utf8'));
const D=DATA,copy=x=>JSON.parse(JSON.stringify(x));
const ctxOf=r=>r>=1?'strong':r>=.9?'mid':'weak';
/* ITEM §COUNTER LADDER by family: first-Hazard 초반 대응, 초반 하이브리드, 중반 대응 (first / second Hazard), 후반 하이브리드 */
const FAM={spider:{basic:'mask',eh:'webgloves',mid1:'antidote',mid2:'rope',lh:'spiderkit'},
 slime:{basic:'soda',eh:'cloak',mid1:'coating',mid2:'boots',lh:'slimesuit'},
 crypt:{basic:'candy',eh:'holylight',mid1:'wine',mid2:'battery',lh:'cryptlantern'},
 snow:{basic:'ramen',eh:'hood',mid1:'dragonramen',mid2:'snowgoggles',lh:'snowvisor'},
 golem:{basic:'ice',mid1:'ion',lh:'magmagear'}};
const all=[];
const P=Game.prototype,night=P.night;
P.night=function(){const s=this.run;for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(!n||!n.alive)continue;
  const d=this.gateFor(n);if(!d||!FAM[d.family]||s.day>=30)continue;
  const bare=Dungeon.prepare({...n,pack:[]},d,s.facilities),ratio=Dungeon.preparedPower(bare.effects)/(d.power||1);
  all.push({job:n.job,fam:d.family,tier:d.tier||1,ctx:ctxOf(ratio),gaps:bare.hazards.map(h=>({key:h.key,stat:h.stat,gap:h.gap})),n:{...copy(n),pack:[]},d:copy(d),fac:[...s.facilities]});}
 return night.apply(this,arguments);};
Debug.simulate(RUNS,'reader',null,'adaptive','hybrid',{});
Debug.simulate(RUNS,'expert',acct,'adaptive','hybrid',{});
P.night=night;
/* 1. gap percentiles by Tier x Stat group x situation, and the share of departures at each */
const q=(a,p)=>{if(!a.length)return null;const v=[...a].sort((x,y)=>x-y);return +v[Math.floor((v.length-1)*p)].toFixed(1);};
const gaps={},share={};
for(const t of [1,2,3]){const inT=all.filter(x=>x.tier===t);share['T'+t]={departures:inT.length,...Object.fromEntries(['strong','mid','weak'].map(c=>[c,+(100*inT.filter(x=>x.ctx===c).length/Math.max(1,inT.length)).toFixed(1)]))};
 for(const st of ['survival','mobility','spirit'])for(const c of ['strong','weak']){
  const g=inT.filter(x=>x.ctx===c).flatMap(x=>x.gaps.filter(h=>h.stat===st).map(h=>h.gap));
  gaps[`T${t}:${st}:${c}`]={n:g.length,p25:q(g,.25),p50:q(g,.5),p75:q(g,.75),p90:q(g,.9)};}}
/* 2. Bags per family x Tier x situation */
const thin=(a,cap)=>{const step=Math.max(1,Math.floor(a.length/cap));return a.filter((_,i)=>i%step===0).slice(0,cap);};
const WIN=['성공','대성공'],HURT=['부상','중상'];
function run(s,pack,k){const n={...copy(s.n),pack};const rep=Dungeon.resolve(n,copy(s.d),new RNG('ladder',1000003*k+7),s.fac);
 return {win:+WIN.includes(rep.outcome),hurt:+HURT.includes(rep.outcome),death:+(rep.outcome==='사망')};}
const baseOf=new Map(),baseRuns=s=>{if(!baseOf.has(s))baseOf.set(s,Array.from({length:K},(_,k)=>run(s,[],k)));return baseOf.get(s);};
const bags=f=>{const L=FAM[f],b=[[L.basic],[L.mid1],[L.lh],['energy'],['lowpotion'],[L.mid1,'energy'],[L.lh,'energy']];
 if(L.eh)b.push([L.eh],[L.eh,'energy'],[L.basic,L.mid2],[L.eh,L.mid2]);if(L.mid2)b.push([L.mid2],[L.mid1,L.mid2]);return b;};
const res={};
if(!args.includes('--profiles-only'))for(const f of Object.keys(FAM))for(const t of [1,2,3])for(const c of ['strong','weak']){
 const set=thin(all.filter(x=>x.fam===f&&x.tier===t&&x.ctx===c),PER);if(set.length<15)continue;
 const key=`${f}:T${t}:${c}`;res[key]={samples:set.length,bags:{}};
 for(const bag of bags(f)){const acc={n:0,win:0,hurt:0,death:0};
  for(const s of set){const base=baseRuns(s);for(let k=0;k<K;k++){const a=base[k],x=run(s,bag,k);acc.n++;for(const m of ['win','hurt','death'])acc[m]+=x[m]-a[m];}}
  const cost=bag.reduce((v,id)=>v+D.itemBy[id].buy,0);
  res[key].bags[bag.join('+')]={cost,win:+(100*acc.win/acc.n).toFixed(1),hurt:+(100*acc.hurt/acc.n).toFixed(1),death:+(100*acc.death/acc.n).toFixed(1)};}}
/* 3. (User 2026-09-30) which side of a two-Hazard Gate is open: an adventurer whose own Stat already answers one Hazard
   (a 사제's 정신) needs one strong Counter on the other, not a hybrid. open = bare gap >= 8, covered = <= 3. */
const profOf=x=>{if(x.gaps.length<2)return null;const [a,b]=x.gaps.map(h=>h.gap);const o=g=>g>=8,c=g=>g<=3;
 return o(a)&&o(b)?'both':o(a)&&c(b)?'first':c(a)&&o(b)?'second':c(a)&&c(b)?'none':'partial';};
const STAT_ITEM={survival:'water',mobility:'coffee',spirit:'herbtea'};
const prof={},profJob={},profRes={};
for(const t of [2,3]){const inT=all.filter(x=>x.tier===t&&x.gaps.length===2);
 prof['T'+t]=Object.fromEntries(['both','first','second','partial','none'].map(p=>[p,+(100*inT.filter(x=>profOf(x)===p).length/Math.max(1,inT.length)).toFixed(1)]));
 for(const j of [...new Set(inT.map(x=>x.job))]){const inJ=inT.filter(x=>x.job===j);
  profJob[`T${t}:${j}`]=Object.fromEntries(['both','first','second','partial','none'].map(p=>[p,+(100*inJ.filter(x=>profOf(x)===p).length/Math.max(1,inJ.length)).toFixed(1)]));}
 for(const f of ['spider','slime','crypt','snow'])for(const p of ['first','second']){
  const set=thin(inT.filter(x=>x.fam===f&&profOf(x)===p),PER);if(set.length<15)continue;const L=FAM[f],open=set[0].gaps[p==='first'?0:1],cov=set[0].gaps[p==='first'?1:0];
  const mid=p==='first'?L.mid1:L.mid2,list=[[mid],[L.eh],[L.lh],[STAT_ITEM[open.stat]],[mid,'energy'],[L.lh,'energy'],[L.eh,'energy'],[mid,STAT_ITEM[cov.stat]]];if(p==='first')list.push([L.basic]);
  const key=`${f}:T${t}:${p}-open(${open.key})`;profRes[key]={samples:set.length,strongShare:+(100*set.filter(x=>x.ctx==='strong').length/set.length).toFixed(0),bags:{}};
  for(const bag of list){const acc={n:0,win:0,hurt:0,death:0};
   for(const s2 of set){const base=baseRuns(s2);for(let k=0;k<K;k++){const a=base[k],x=run(s2,bag,k);acc.n++;for(const m of ['win','hurt','death'])acc[m]+=x[m]-a[m];}}
   profRes[key].bags[bag.join('+')]={cost:bag.reduce((v,id)=>v+D.itemBy[id].buy,0),win:+(100*acc.win/acc.n).toFixed(1),hurt:+(100*acc.hurt/acc.n).toFixed(1),death:+(100*acc.death/acc.n).toFixed(1)};}}}
/* 4. (User 2026-09-30) one slot already spent on the Stat Item that answers one side (허브티 for a 정신 Hazard, and so on):
   what should the second slot be - the other side's 중반 대응, the family's 후반 하이브리드 or 초반 하이브리드? */
const cover={};
for(const t of [2,3])for(const f of ['spider','slime','crypt','snow']){const set=thin(all.filter(x=>x.tier===t&&x.fam===f&&x.gaps.length===2),PER);if(set.length<15)continue;
 const L=FAM[f],[h1,h2]=set[0].gaps;
 for(const [covered,openSide,mid] of [[h1,h2,L.mid2],[h2,h1,L.mid1]]){const st=STAT_ITEM[covered.stat],key=`${f}:T${t}:${st} covers ${covered.key}, open ${openSide.key}`;
  cover[key]={samples:set.length,bags:{}};
  for(const bag of [[st],[st,mid],[st,L.lh],[st,L.eh],[mid,L.eh]]){const acc={n:0,win:0,hurt:0,death:0};
   for(const s2 of set){const base=baseRuns(s2);for(let k=0;k<K;k++){const a=base[k],x=run(s2,bag,k);acc.n++;for(const m of ['win','hurt','death'])acc[m]+=x[m]-a[m];}}
   cover[key].bags[bag.join('+')]={cost:bag.reduce((v,id)=>v+D.itemBy[id].buy,0),win:+(100*acc.win/acc.n).toFixed(1),hurt:+(100*acc.hurt/acc.n).toFixed(1),death:+(100*acc.death/acc.n).toFixed(1)};}}}
const out={runs:RUNS,per:PER,k:K,share,gaps,res,prof,profJob,profRes,cover};
if(OUT)fs.writeFileSync(OUT,JSON.stringify(out,null,1));
console.log(JSON.stringify(share));
