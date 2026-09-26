// Decoration impact, one Decoration at a time - MEASUREMENT ONLY, dev tool, never part of npm test.
// Same seeds for every arm; a fresh account wearing exactly one Decoration vs none. Every Run is new.
// v2.9.6 decoration review (User 2026-09-26): besides D30 / clear, it reports what an economy Decoration moves
// (Store Capital settled per Run, Gross Sales, visitors, end money) and what a survival one moves (end cause,
// deaths, reach, core level), so both kinds read on one table.
// Arms may apply a PROPOSAL in memory only (the files on disk are not touched):
//   premiumCase weights  -> {weights:[..5]}   (the premium rarity draw in adventurer.js)
//   firstAidKit rework   -> {kit:'injury', saves:N[, daily:true]}  (부상 N회 -> 무사 instead of 사망 -> 중상; daily: N a Day)
//   node tools/deco-impact.cjs [runs] --arms 'none,firstAidKit inj10'   runs only the named arms
//   --potential 0.10   every arm runs with Rarity's growth step at 0.10 instead of 0.06 (the rarity proposal)
//   dawn remake arms   {dawn:'buy'|'wallet'|'overhead'}: ORDER buy price -20% / visiting wallet +30% / operating cost -25%
//   node tools/deco-impact.cjs [runs=600] [--out file]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const FILES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const ARMS=[
 ['none',null,{}],['dawnSign','dawnSign',{}],['trainingRack','trainingRack',{}],['guildPlaque','guildPlaque',{}],
 ['infirmaryPlaque','infirmaryPlaque',{}],['thriftSafe','thriftSafe',{}],['memorialBoard','memorialBoard',{}],
 ['premiumCase (cur)','premiumCase',{}],['premiumCase P2','premiumCase',{weights:[40,30,20,7.5,2.5]}],
 ['premiumCase P3','premiumCase',{weights:[35,30,22,9,4]}],
 ['firstAidKit (cur)','firstAidKit',{}],['firstAidKit inj3','firstAidKit',{kit:'injury',saves:3}],['firstAidKit inj5','firstAidKit',{kit:'injury',saves:5}],
 ['firstAidKit inj10','firstAidKit',{kit:'injury',saves:10}],['firstAidKit daily1','firstAidKit',{kit:'injury',saves:1,daily:true}],
 /* 새벽배송 안내판 remake candidates (User 2026-09-26: an economy Decoration as strong as 훈련소 제휴 간판); the +3 offers are off */
 ['dawn buy-20%','dawnSign',{dawn:'buy'}],['dawn wallet+30%','dawnSign',{dawn:'wallet'}],['dawn overhead-25%','dawnSign',{dawn:'overhead'}]];
const one=(src,a,b)=>{const n=src.split(a).length-1;if(n!==1)throw Error('patch point x'+n+': '+a.slice(0,60));return src.replace(a,b);};
function load(p){for(const f of FILES){let src=fs.readFileSync(path.join(root,'dist',f+'.js'),'utf8');
  if(f==='systems/adventurer'&&p.potential)src=one(src,'potential=1+rarity*.06+r.next()*.10','potential=1+rarity*'+p.potential+'+r.next()*.10');
  if(f==='systems/shop'&&p.dawn==='buy')src=one(src,'return {item:it.id,price:Math.round(it.buy*price','return {item:it.id,price:Math.round((this.wears(\'dawnSign\')?.8:1)*it.buy*price');
  if(f==='systems/shop'&&p.dawn==='wallet')src=one(src,"if(n.traits.includes('rich')){n.money=Math.min(2000,n.money+50);}","if(n.traits.includes('rich')){n.money=Math.min(2000,n.money+50);}if(this.wears('dawnSign'))n.money=Math.min(2000,Math.round(n.money*1.3));");
  if(f==='systems/shop'&&p.dawn==='overhead')src=one(src,'return dayBase*(1+.03*(avgLevel-1))*(1+.06*avgRarity);','return (this.wears(\'dawnSign\')?.75:1)*dayBase*(1+.03*(avgLevel-1))*(1+.06*avgRarity);');
  if(f==='systems/adventurer'&&p.weights)src=one(src,'opts.premium?[45,31.5,17.5,4.75,1.25]','opts.premium?['+p.weights+']');
  if(f==='systems/dungeon'&&p.kit==='injury'){
   src=one(src,"if(outcome==='사망'&&aidKitReady){","if(false){");
   src=one(src,"  if(kit.from){aftercare={from:kit.from,to:kit.injury,outcomeFrom:outcome};outcome=kit.tier;",
    "  if(!kit.from&&outcome==='부상'&&aidKitReady){kit.from=1;kit.injury=0;run.aidKitSaves=(run.aidKitSaves||0)+1;}\n  if(kit.from){aftercare={from:kit.from,to:kit.injury,outcomeFrom:outcome};outcome=kit.tier;");}
  if(f==='systems/shop'&&p.daily)src=one(src,'s.bulkUsed=false;s.guaranteeUsed=false;','s.bulkUsed=false;s.guaranteeUsed=false;s.aidKitSaves=0;');
  vm.runInThisContext(src,{filename:f+'.js'});}
 if(p.saves)globalThis.DATA.decorationParams.firstAidKit.saves=p.saves;
 if(p.dawn)globalThis.DATA.decorationParams.dawnSign.extraOffers=0;}
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
if(process.env.DECO_WORKER){
 process.on('message',({label,id,p,N})=>{globalThis.window=globalThis;load(p);
  const a=Meta.fresh();if(id){Meta.addCapital(a,DATA.decorationBy[id].price);Meta.buyDecoration(a,id);}
  const r=Debug.simulate(N,'reader',a,'adaptive','hybrid',{relicAware:true});
  const days=Object.values(r.days),vis=days.reduce((x,d)=>x+d.visitors,0)/Math.max(1,days.reduce((x,d)=>x+d.samples,0));
  process.send({label,N,avgDay:r.averageDay,reach10:r.reach10,reach20:r.reach20,reach30:r.reach30,clear:r.clearsPerRun,
   endDeaths:r.endedBy.deaths/N,endBankrupt:r.endedBy.bankrupt/N,deaths:r.averageDeaths,
   capital:mean(r.settlement.gains),sales:mean(r.settlement.sales),visitorsPerDay:vis,endMoney:r.averageMoney,
   coreLevel:r.coreLevelMedian,coreRarity:r.coreRarityMedian,great:r.greatSuccessRate},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),POT=args.indexOf('--potential')>=0?Number(args[args.indexOf('--potential')+1]):null,N=Number(args.find(a=>/^\d+$/.test(a))||600),oi=args.indexOf('--out'),res={};let live=0;const pick=args.indexOf('--arms')>=0?args[args.indexOf('--arms')+1].split(','):null,q=ARMS.filter(a=>!pick||pick.includes(a[0]));
 const next=()=>{if(!q.length){if(!live)done();return;}const [label,id,p]=q.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,DECO_WORKER:'1'}});c.on('message',m=>{res[m.label]=m;});c.on('exit',()=>{live--;next();});c.send({label,id,p:{...p,potential:POT},N});};
 const f=(x,d=1)=>x.toFixed(d),pp=(x,b)=>(x>=b?'+':'')+f(100*(x-b));
 const done=()=>{const b=res.none;
  console.log('arm'.padEnd(20),'D30','(Δ%p)','clear','(Δ%p)','avgDay','deaths','end:death','end:bankrupt','capital/run','(Δ)','sales/run','visitors/day','coreLv');
  for(const [label] of ARMS){if(pick&&!pick.includes(label))continue;const r=res[label];if(!r){console.log(label,'FAILED');continue;}
   console.log(label.padEnd(20),f(100*r.reach30)+'%',pp(r.reach30,b.reach30),f(100*r.clear)+'%',pp(r.clear,b.clear),f(r.avgDay),f(r.deaths,2),f(100*r.endDeaths,0)+'%',f(100*r.endBankrupt,0)+'%',
    Math.round(r.capital),(r.capital>=b.capital?'+':'')+Math.round(r.capital-b.capital),Math.round(r.sales),f(r.visitorsPerDay,2),f(r.coreLevel));}
  if(oi>=0)fs.writeFileSync(args[oi+1],JSON.stringify({N,policy:'reader',aware:true,results:res},null,1));};
 for(let i=0;i<os.cpus().length;i++)next();}
