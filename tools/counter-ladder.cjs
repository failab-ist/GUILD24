// Counter ladder variants - MEASUREMENT ONLY, dev tool, never part of npm test.
// User 2026-09-27: 초반 대응 (1단계 완막) / 초반 하이브리드 / 중반 대응 / 후반 하이브리드 - three arms on the same seeds.
//   V0  the current catalog
//   V1  the ladder as defined: early 10 / 8, early hybrid 12 / 9 / 9, mid 21 / 19 / 16, late hybrid 14 / 12 / 10
//   V2  V1 with the mid and late rungs +2
//   V1u V1 with the mid rung left at 고급 (isolates the 희귀 move)
//   any arm + Q (V0+Q, V1+Q, V2+Q): a 희귀 ORDER slot holds 1~3 units instead of 1
//   then + P (V1+Q+P): 상급 포션 195G / 최상급 포션 235G
//   then + R (V2+Q+P+R): the Rarity bands give 희귀 +3 / +8 / +10 / +10 / +10 from D8, taken from 일반
//   then + L (…+L): early hybrid 75G, late hybrid 135G, 마그마 145G
//   then + C (…+C): the reader store stocks one direct Counter per Hazard on today's Gates first (reader only)
// Every arm is applied to DATA in memory right after the catalog loads; the files on disk are untouched. New Items
// (중화 탄산수 / 방독 작업장갑 / 축성 손전등) are appended, 핫팩 becomes 방한 두건 under its id, the mid rung moves to 희귀.
//   node tools/counter-ladder.cjs [runs=600] [--policy reader|skilled] [--arms V0,V1,V2] [--out file]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const FILES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const BANDS=[[1,10],[11,20],[21,29]],HZ=['poison','cold','corrosion','bind','mire','dark','fear','whiteout','fire'];
const STATS={survival:3,mobility:2,spirit:2};
// [rarity, buy, days, hazard counters, other effects kept/set]
function ladder(mid,late,mr=[2,95,5]){return {
 // 초반 대응 (일반)
 mask:[0,45,3,{poison:10}],ramen:[0,45,3,{cold:10}],candy:[0,35,4,{fear:8}],ice:[0,30,3,{fire:8}],
 soda:[0,35,3,{corrosion:10},{supply:1},{name:'중화 탄산수',category:'drink',brand:'용사픽',icon:'ice'}],
 // 초반 하이브리드 (고급)
 webgloves:[1,80,4,{poison:12,bind:9},{},{name:'방독 작업장갑',category:'gear',brand:'귀환안심',icon:'mask'}],
 cloak:[1,80,4,{corrosion:12,mire:9}],
 holylight:[1,80,4,{fear:9,dark:9},{},{name:'축성 손전등',category:'gear',brand:'귀환안심',icon:'battery'}],
 hood:[1,80,4,{cold:12,whiteout:9},{},{name:'방한 두건'}],
 // 중반 대응 (희귀)
 antidote:[...mr,{poison:mid[0]}],coating:[...mr,{corrosion:mid[0]}],dragonramen:[mr[0],mr[1],4,{cold:mid[0]-2}],
 rope:[...mr,{bind:mid[1]}],boots:[...mr,{mire:mid[1]}],battery:[...mr,{dark:mid[1]}],
 wine:[...mr,{fear:mid[2]}],ion:[...mr,{fire:mid[2]}],snowgoggles:[...mr,{whiteout:mid[2]}],
 // 후반 하이브리드 (영웅) - price and Rarity unchanged
 spiderkit:[3,null,null,{poison:late[0],bind:late[1]}],slimesuit:[3,null,null,{corrosion:late[0],mire:late[1]}],
 cryptlantern:[3,null,null,{fear:late[2],dark:late[1]}],snowvisor:[3,null,null,{cold:late[0],whiteout:late[2]}],
 magmagear:[3,null,null,{fire:late[2]}]};}
const ARMS={V0:null,V1:ladder([21,19,16],[14,12,10]),V2:ladder([23,21,18],[16,14,12]),
 /* V1 with the mid rung kept at 고급 (80G, 4 days) - separates the Rarity move from the values */
 V1u:ladder([21,19,16],[14,12,10],[1,80,4])};
function apply(D,arm){if(!arm)return;
 for(const [id,[rarity,buy,days,ctr,extra={},meta]] of Object.entries(arm)){let it=D.itemBy[id];
  if(!it){it={id,rarity,buy,sell:buy*2,days,description:'',effects:{},metaUnlock:null,...meta};D.items.push(it);D.itemBy[id]=it;}
  else if(meta)Object.assign(it,meta);
  it.rarity=rarity;if(buy!=null){it.buy=buy;it.sell=buy*2;}if(days!=null)it.days=days;
  for(const h of HZ)delete it.effects[h];Object.assign(it.effects,ctr,extra);}}
const one=(src,a,b)=>{const n=src.split(a).length-1;if(n!==1)throw Error('patch point x'+n+': '+a.slice(0,60));return src.replace(a,b);};
function load(arm){const ll=/\+L$/.test(arm);arm=arm.replace(/\+L$/,'');const cc=/\+C$/.test(arm);arm=arm.replace(/\+C$/,'');const rr=/\+R$/.test(arm);arm=arm.replace(/\+R$/,'');const pp=/\+P$/.test(arm);arm=arm.replace(/\+P$/,'');const q=/\+Q$/.test(arm);arm=arm.replace(/\+Q$/,'');for(const f of FILES){let src=fs.readFileSync(path.join(root,'dist',f+'.js'),'utf8');
  /* +Q: a 희귀 ORDER slot holds 1~3 units instead of 1 (User 2026-09-27 proposal); 영웅 / 전설 stay 1 */
  if(f==='systems/shop'&&q)src=one(src,'quantity:(it.rarity>=2?1:this.rng.int(2,4))','quantity:(it.rarity===2?this.rng.int(1,3):it.rarity>=2?1:this.rng.int(2,4))');
  if(f==='systems/shop')src=one(src,'const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities,s,assist);',
   'const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities,s,assist);if(globalThis.__HZ)globalThis.__HZ(rep,d,s);');
  /* +C: the reader store first stocks one direct Counter for each Hazard on today's Gates that the shelf has none of -
     the strongest offered - before its meals (a player reading the Gates does this; the bot otherwise rarely orders a
     95G Counter). Measurement only. */
  if(f==='systems/simulation'&&cc)src=one(src,'if(reader){const meals=offers.filter(',
   "if(reader){for(const h of [...new Set(s.dungeons.flatMap(d=>d.hazards))]){if(s.inventory.some(x=>(D.itemBy[x.item].effects[h]||0)>0))continue;const x=offers.filter(x=>x.o.quantity&&(D.itemBy[x.o.item].effects[h]||0)>0&&(s.cart?.[x.i]||0)<x.o.quantity).sort((a,b)=>D.itemBy[b.o.item].effects[h]-D.itemBy[a.o.item].effects[h])[0];if(x&&s.money-g.cartTotal()-x.o.price>=spend.cashFloor){try{g.setQuantity(x.i,(s.cart?.[x.i]||0)+1);act();(out.items[x.o.item]??={ordered:0,sold:0}).ordered++;}catch(e){}}}}\n   if(reader){const meals=offers.filter(");
  if(f==='systems/simulation')src=one(src,'for(let seed=0;seed<count;seed++){','for(let seed=opts?.from||0;seed<(opts?.from||0)+count;seed++){');
  vm.runInThisContext(src,{filename:f+'.js'});
  if(f==='data/catalog'){apply(globalThis.DATA,ARMS[arm]);
   /* +P: 상급 포션 175 -> 195, 최상급 포션 210 -> 235 (User 2026-09-27: 상급 above 길드 특제 도시락 185) */
   if(pp){const B=globalThis.DATA.itemBy;B.highpotion.buy=195;B.highpotion.sell=390;B.toppotion.buy=235;B.toppotion.sell=470;}
   /* +L: 초반 하이브리드 80 -> 75G, 후반 하이브리드 165 -> 135G, 마그마 냉각장비 175 -> 145G (User 2026-09-27 price review) */
   if(ll){const B=globalThis.DATA.itemBy;for(const id of ['cloak','webgloves','holylight','hood'])if(B[id]&&B[id].rarity===1&&Object.keys(B[id].effects).filter(k=>HZ.includes(k)).length===2){B[id].buy=75;B[id].sell=150;}
    for(const id of ['spiderkit','slimesuit','cryptlantern','snowvisor']){B[id].buy=135;B[id].sell=270;}B.magmagear.buy=145;B.magmagear.sell=290;}
   /* +R: 희귀 rises from mid-Run, taken from 일반 (User 2026-09-27: 희귀 should turn up from the middle) */
   if(rr)globalThis.DATA.rarityBands=[{maxDay:3,weights:[68,24,7,1,0]},{maxDay:7,weights:[63,25,11,1,0]},{maxDay:12,weights:[55,27,15,2,1]},
    {maxDay:19,weights:[45,27,23,4,1]},{maxDay:24,weights:[36,26,27,10,1]},{maxDay:29,weights:[29,25,29,16,1]},{maxDay:30,weights:[24,24,31,20,1]}];}}}
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
if(process.env.CL_WORKER){
 process.on('message',({arm,policy,from,to})=>{globalThis.window=globalThis;load(arm);const D=DATA,acc={},items={};let exp=0,ctrCarried=0,statCarried=0;
  const cell=(h,b)=>((acc[h]??={})[b]??={exp:0,ratio:0,covered:0,carried:0});
  globalThis.__HZ=(rep,d,s)=>{if(d.deep||d.id==='final'||!rep.debug)return;const day=d.day||s.day,b=BANDS.findIndex(([a,z])=>day>=a&&day<=z);if(b<0)return;
   const e=rep.debug.effects;exp++;for(const id of rep.items){items[id]=(items[id]||0)+1;const ef=D.itemBy[id].effects;
    if(HZ.some(h=>ef[h]>0))ctrCarried++;if(Object.keys(STATS).some(k=>ef[k]>0))statCarried++;}
   for(const h of d.hazards){const c=cell(h,b),r=Dungeon.hazardRule(h),threat=12+day*.35+Math.max(0,day-7)*.25+((d.tier||1)-1)*6,def=(e[h]||0)+(e[r.stat]||0)*r.coef;
    c.exp++;c.ratio+=def/threat;if(def>=threat)c.covered++;if(rep.items.some(id=>(D.itemBy[id].effects[h]||0)>0))c.carried++;}};
  const r=Debug.simulate(to-from,policy,null,'adaptive','hybrid',{relicAware:true,from});
  process.send({acc,items,trade:r.items,exp,ctrCarried,statCarried,runs:to-from,reach20:r.reach20*(to-from),reach30:r.reach30*(to-from),clear:r.clearsPerRun*(to-from),
   day:r.averageDay*(to-from),bankrupt:r.endedBy.bankrupt,deathsEnd:r.endedBy.deaths,deaths:r.averageDeaths*(to-from),capital:mean(r.settlement.gains)*(to-from)},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),opt=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const N=Number(args.find(a=>/^\d+$/.test(a))||600),policy=opt('--policy')||'reader',arms=(opt('--arms')||'V0,V1,V2').split(','),W=os.cpus().length,res={};
 const jobs=[];for(const arm of arms)for(let i=0;i<W;i++)jobs.push({arm,policy,from:Math.floor(N*i/W),to:Math.floor(N*(i+1)/W)});
 let live=0;const next=()=>{if(!jobs.length){if(!live)done();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,CL_WORKER:'1'}});c.on('message',m=>{(res[j.arm]??=[]).push(m);});c.on('exit',()=>{live--;next();});c.send(j);};
 for(let i=0;i<W;i++)next();
 const done=()=>{globalThis.window=globalThis;load('V0');const names={soda:'중화 탄산수',webgloves:'방독 작업장갑',holylight:'축성 손전등'};const nm=id=>(id==='hood'?'핫팩/방한 두건':names[id]||DATA.itemBy[id]?.name||id);
  const sum={};for(const arm of arms){const p=res[arm]||[],t={acc:{},items:{}};for(const k of ['runs','exp','ctrCarried','statCarried','reach20','reach30','clear','day','bankrupt','deathsEnd','deaths','capital'])t[k]=p.reduce((v,m)=>v+m[k],0);
   t.trade={};for(const m of p)for(const id in m.trade){const x=(t.trade[id]??={ordered:0,sold:0});x.ordered+=m.trade[id].ordered||0;x.sold+=m.trade[id].sold||0;}
   for(const m of p){for(const h in m.acc)for(const b in m.acc[h]){const c=m.acc[h][b],x=((t.acc[h]??={})[b]??={exp:0,ratio:0,covered:0,carried:0});for(const k in c)x[k]+=c[k];}for(const id in m.items)t.items[id]=(t.items[id]||0)+m.items[id];}
   sum[arm]=t;}
  const pc=x=>(100*x).toFixed(1)+'%';
  console.log('policy',policy,'runs',N);
  console.log('arm  D20     D30     clear   avgDay  bankrupt  end:deaths  deaths/run  capital/run  counter/exp  stat/exp');
  for(const arm of arms){const t=sum[arm];console.log(arm.padEnd(4),pc(t.reach20/t.runs).padEnd(7),pc(t.reach30/t.runs).padEnd(7),pc(t.clear/t.runs).padEnd(7),(t.day/t.runs).toFixed(2).padEnd(7),pc(t.bankrupt/t.runs).padEnd(9),pc(t.deathsEnd/t.runs).padEnd(11),(t.deaths/t.runs).toFixed(2).padEnd(11),Math.round(t.capital/t.runs).toString().padEnd(12),(t.ctrCarried/t.exp).toFixed(2).padEnd(12),(t.statCarried/t.exp).toFixed(2));}
  console.log('\nhazard / band : covered% (carried%) per arm');
  for(const h of HZ)for(let b=0;b<3;b++){const row=arms.map(arm=>{const c=sum[arm].acc[h]?.[b];return c?(pc(c.covered/c.exp)+' ('+pc(c.carried/c.exp)+')').padEnd(18):'-'.padEnd(18);});
   console.log((DATA.hazards[h]+' D'+BANDS[b][0]+'-'+BANDS[b][1]).padEnd(14),row.join(' '));}
  console.log('\ncounter items carried per 100 expeditions');
  const ids=[...new Set(arms.flatMap(a=>Object.keys(sum[a].items)))].filter(id=>{const it=DATA.itemBy[id];return !it||HZ.some(h=>it.effects[h]>0)||['soda','webgloves','holylight'].includes(id);});
  for(const id of ids.sort())console.log(nm(id).padEnd(12),arms.map(a=>(100*(sum[a].items[id]||0)/sum[a].exp).toFixed(1).padStart(6)).join(' '));
  console.log('\ncounter items ordered / sold per Run (sold% of ordered)');
  for(const id of ids.sort())console.log(nm(id).padEnd(12),arms.map(a=>{const x=sum[a].trade[id]||{ordered:0,sold:0};return ((x.ordered/sum[a].runs).toFixed(1)+'/'+(x.sold/sum[a].runs).toFixed(1)+' ('+(x.ordered?Math.round(100*x.sold/x.ordered):0)+'%)').padStart(16);}).join(' '));
  if(opt('--out'))fs.writeFileSync(opt('--out'),JSON.stringify({N,policy,arms,sum},null,1));};
}
