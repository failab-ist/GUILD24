const fs=require('node:fs'),path=require('node:path');
const arms=['baseline','visit','xp','both'],sum=(a,f)=>a.reduce((s,x)=>s+(f(x)||0),0),mean=(a,f)=>a.length?sum(a,f)/a.length:null;
const pct=(a,b)=>b?100*a/b:null,quant=(a,q)=>{if(!a.length)return null;const s=[...a].sort((a,b)=>a-b),i=(s.length-1)*q;return s[Math.floor(i)]+(s[Math.ceil(i)]-s[Math.floor(i)])*(i%1);};
function summary(rows,profile=false){
 const returning=rows.flatMap(r=>(profile?r.visits:r.revisit?.visits)||[]).filter(v=>v.known),exposure=rows.map(r=>(profile?r.exposure:r.revisit?.exposure)||{}),reached=rows.filter(r=>r.reach),hasPower=reached.filter(r=>(profile?r.power:r.revisit?.finalPower)!=null);
 const regularEligible=sum(exposure,e=>e.regularEligible),otherEligible=sum(exposure,e=>e.otherEligible),regularVisits=sum(exposure,e=>e.regularVisits),otherVisits=sum(exposure,e=>e.otherVisits);
 const power=r=>profile?r.power:r.revisit.finalPower,boss=r=>profile?r.bossPower:r.revisit.bossPower;
 return {n:rows.length,bands:[0,1,2,3].map(i=>pct(sum(rows,r=>r.bands[i][0]),sum(rows,r=>r.bands[i][1]))),reach:pct(reached.length,rows.length),clear:pct(sum(rows,r=>r.win),rows.length),clearGivenReach:pct(sum(rows,r=>r.win),reached.length),deaths:mean(rows,r=>r.deaths),
  core:profile?null:{top:pct(sum(rows,r=>r.core.top[0]),sum(rows,r=>r.core.top[1])),rest:pct(sum(rows,r=>r.core.rest[0]),sum(rows,r=>r.core.rest[1]))},
  regularDailyVisit:pct(regularVisits,regularEligible),otherDailyVisit:pct(otherVisits,otherEligible),premiumRatio:(regularVisits/regularEligible)/(otherVisits/otherEligible),
  absence7Exposure:pct(sum(exposure,e=>e.absence7),regularEligible+otherEligible),absence10Exposure:pct(sum(exposure,e=>e.absence10),regularEligible+otherEligible),
  returnMissP95:quant(returning.map(v=>v.missed),.95),returnAfter7:pct(returning.filter(v=>v.missed>=7).length,returning.length),
  xpBonusPerRun:mean(rows,r=>profile?r.xpBonus:r.revisit?.xpBonus),xpBoostedPerRun:mean(rows,r=>profile?r.xpBoosted:r.revisit?.xpBoosted),regulars:mean(rows,r=>profile?r.regulars:r.revisit?.regulars),
  finalSamples:hasPower.length,finalPowerMedian:quant(hasPower.map(power),.5),finalRatioMedian:quant(hasPower.map(r=>power(r)/boss(r)),.5),cash:profile?mean(rows,r=>r.money):mean(rows,r=>r.cash)};
}
function compact(rows,profile=false){return rows.map(r=>({seed:r.seed,idx:r.idx,win:r.win?1:0,reach:r.reach?1:0,deaths:r.deaths,power:profile?r.power:r.revisit?.finalPower,bossPower:profile?r.bossPower:r.revisit?.bossPower}));}
function paired(a,b){const map=new Map(a.map(r=>[r.seed,r])),pairs=b.map(r=>[map.get(r.seed),r]);if(pairs.some(p=>!p[0])||map.size!==b.length)throw Error('Paired seed mismatch');
 const interval=key=>{const d=pairs.map(([a,b])=>b[key]-a[key]),m=mean(d,x=>x),sd=Math.sqrt(sum(d,x=>(x-m)**2)/(d.length-1)),e=1.96*sd/Math.sqrt(d.length),factor=['win','reach'].includes(key)?100:1;return {delta:m*factor,lo:(m-e)*factor,hi:(m+e)*factor};};
 const common=pairs.filter(([a,b])=>a.reach&&b.reach&&a.power!=null&&b.power!=null);
 return {n:pairs.length,clearPP:interval('win'),reachPP:interval('reach'),deaths:interval('deaths'),bothReached:common.length,medianFinalPowerDeltaCommon:quant(common.map(([a,b])=>b.power-a.power),.5)};
}
const out={standard:{},profile:{},pairedStandard:{},pairedProfile:{}},stdCompact={},profileCompact={};
for(const arm of arms){
 const file=JSON.parse(fs.readFileSync(path.join(__dirname,arm+'.json'),'utf8'));out.standard[arm]={};stdCompact[arm]={};
 for(const [key,a] of Object.entries(file.arms)){
  const idxs=key.includes('/traj/')?[0,4,9]:[0];for(const idx of idxs){const rows=a.rows.filter(r=>r.idx===idx),name=key.replace('after/','')+(key.includes('/traj/')?'/run'+(idx+1):'');out.standard[arm][name]=summary(rows);stdCompact[arm][name]=compact(rows);}
 }
}
for(const arm of arms)for(const policy of ['reader','expert']){const p=JSON.parse(fs.readFileSync(path.join(__dirname,'profile-'+arm+'-'+policy+'.json'),'utf8'));out.profile[arm]??={};out.profile[arm][policy]=summary(p.rows,true);profileCompact[arm]??={};profileCompact[arm][policy]=compact(p.rows,true);}
for(const arm of arms.filter(a=>a!=='baseline')){out.pairedStandard[arm]={};for(const key of Object.keys(stdCompact.baseline))out.pairedStandard[arm][key]=paired(stdCompact.baseline[key],stdCompact[arm][key]);out.pairedProfile[arm]={};for(const policy of ['reader','expert'])out.pairedProfile[arm][policy]=paired(profileCompact.baseline[policy],profileCompact[arm][policy]);}
fs.writeFileSync(path.join(__dirname,'summary.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify({fresh:Object.fromEntries(arms.map(arm=>[arm,Object.fromEntries(Object.entries(out.standard[arm]).filter(([k])=>k.startsWith('fresh/')))])),profile:out.profile,profileDelta:out.pairedProfile},null,2));
