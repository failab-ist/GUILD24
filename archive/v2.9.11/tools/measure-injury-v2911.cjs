// v2.9.11 measurement (User 2026-09-28): the injury spiral - 부상 -> 못 이김 -> 돈 없음 -> 아이템 못 들려줌 -> 못 이김.
// Measurement only: every arm is an in-memory patch on the `reader` bot, same seeds (revision-0..N-1) per arm; no game file changes.
//   node tools/measure-injury-v2911.cjs <arm> [runs=3000] [out.json]
//   arms: current     - today's rules
//         shallow     - Store Support draft ①: from D10, an injured visitor goes to the shallowest open Gate (lowest tier, then Power)
//         subsidy     - Store Support draft ②: from D10, an injured visitor who cannot afford Insurance at 50% buys it, the store
//                       pays the shortfall (store Gold goes down by it)
//         kitceiling  - ceiling, not a proposal: from D10, every injured departure with a free Bag slot carries a 구급키트 for free
//         clinic      - Event draft 치유소 순회 진료: added to the pool (weight 1) - today's injured visitors are healed on arrival
const path=require('node:path'),fs=require('node:fs');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const arm=process.argv[2]||'current',runs=Number(process.argv[3]||3000),out=process.argv[4];
if(!['current','shallow','subsidy','kitceiling','clinic'].includes(arm))throw Error('unknown arm '+arm);
const P=Game.prototype,FROM=10;
const tally={subsidySales:0,subsidyGold:0,kitsGiven:0,clinicDays:0,clinicHeals:0};
if(arm==='shallow'){const mq=P.morningQueue;P.morningQueue=function(){const r=mq.apply(this,arguments);const s=this.run;if(s.day<FROM)return r;
 const open=s.dungeons.map((d,i)=>({d,i})).filter(x=>!x.d.deep&&!x.d.temporary);if(!open.length)return r;
 const best=open.sort((a,b)=>(a.d.tier-b.d.tier)||(a.d.power-b.d.power))[0].i;
 for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(n&&n.injury===1){n.destination=best;n.claimedDestination=best;}}return r;};}
if(arm==='subsidy'){const pend=new Map(),inter=P.interest;
 P.interest=function(n,it,mode='full'){const s=this.run,r=inter.call(this,n,it,mode);
  if(!(s.day>=FROM&&n.injury===1&&it.category==='insurance'&&mode==='half'))return r;
  const wallet=n.money+(n.eventBudget||0);if(wallet>=r.debit)return r;
  const short=r.debit-wallet;n.money+=short;const q=inter.call(this,n,it,mode);n.money-=short;
  pend.set(n.id+':'+it.id,short);return {...q,debit:q.debit-short};};
 const sell=P.sell;P.sell=function(stockId,mode){const s=this.run,n=this.current(),st=s.inventory.find(x=>x.id===stockId);
  const key=n&&st?n.id+':'+st.item:null;const ok=sell.call(this,stockId,mode);
  if(ok&&key&&pend.has(key)){const short=pend.get(key);s.money-=short;s.daily.spent+=short;tally.subsidySales++;tally.subsidyGold+=short;}
  if(key)pend.delete(key);return ok;};}
if(arm==='kitceiling'){const night=P.night;P.night=function(){const s=this.run;if(s.phase==='sell'&&s.day>=FROM)
  for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(n&&n.alive&&n.injury===1&&n.pack.length<2&&!n.pack.includes('kit')){n.pack.push('kit');tally.kitsGiven++;}}
  return night.apply(this,arguments);};}
if(arm==='clinic'){DATA.events.push({id:'clinicvisit',name:'치유소 순회 진료',reveal:'',description:'오늘 방문하는 부상 모험가 · 부상 회복',effects:{clinic:1},weight:1});
 const el=P.eventEligible;P.eventEligible=function(e){if(e.effects.clinic)return this.run.npcs.some(n=>n.alive&&n.injury===1&&!n.recovery);return el.call(this,e);};
 const me=P.morningEvent;P.morningEvent=function(){const r=me.apply(this,arguments);if(this.run.event?.effects.clinic)tally.clinicDays++;return r;};
 const ar=P.arrive;P.arrive=function(){const s=this.run,n=s.npcs.find(x=>x.id===s.queue[s.cursor]);
  if(s.event?.effects.clinic&&n&&n.injury===1){n.injury=0;n.status='건강';tally.clinicHeals++;}return ar.apply(this,arguments);};}
const arrivals=[];const ar2=P.arrive;P.arrive=function(){const r=ar2.apply(this,arguments);const n=this.current();if(n)arrivals.push([this.run.day,n.money,n.injury]);return r;};
const rows=[];const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);
 const R=s.npcs.flatMap(n=>n.records||[]),inj=R.filter(r=>r.departedInjured);
 const byOut=o=>inj.filter(r=>r.outcome===o).length,kit=inj.filter(r=>r.items.includes('kit'));
 /* injured spells: from the night an adventurer comes back 부상 to the first later record that departs healthy (or the Run's end) */
 const spells=[];for(const n of s.npcs){const rs=n.records||[];for(let i=0;i<rs.length;i++){if(rs[i].injury!==1||(i>0&&rs[i-1].injury===1))continue;
  let j=i+1;while(j<rs.length&&rs[j].departedInjured)j++;spells.push({days:(j<rs.length?rs[j].day:s.day)-rs[i].day,death:j>i+1&&rs[j-1]?.outcome==='사망'});}}
 rows.push({day:s.day,win:!!s.win,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final',
  deaths:R.filter(r=>r.outcome==='사망').length,injDep:inj.length,injWin:byOut('성공')+byOut('대성공'),injRetreat:byOut('퇴각'),injHurt:byOut('부상'),injSevere:byOut('중상'),injDeath:byOut('사망'),
  kitDep:kit.length,kitWin:kit.filter(r=>['성공','대성공'].includes(r.outcome)).length,kitDeath:kit.filter(r=>r.outcome==='사망').length,
  spellDays:spells.map(x=>x.days),spellDeaths:spells.filter(x=>x.death).length,spells:spells.length});return ret;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
const N=rows.length,sum=k=>rows.reduce((a,r)=>a+r[k],0),pc=(a,b)=>b?(100*a/b).toFixed(1):'-',med=a=>{const v=a.slice().sort((x,y)=>x-y);return v.length?v[(v.length-1)>>1]:'-';};
const inj=arrivals.filter(x=>x[2]===1),band=(lo,hi)=>inj.filter(x=>x[0]>=lo&&x[0]<=hi),under=(a,g)=>pc(a.filter(x=>x[1]<g).length,a.length);
const res={arm,runs:N,d30:pc(rows.filter(r=>r.day>=30).length,N),clear:pc(rows.filter(r=>r.win).length,N),deathLimit:pc(rows.filter(r=>r.end==='death').length,N),bankrupt:pc(rows.filter(r=>r.end==='bankrupt').length,N),
 deathsPerRun:(sum('deaths')/N).toFixed(2),injDepPerRun:(sum('injDep')/N).toFixed(2),
 injOutcome:{win:pc(sum('injWin'),sum('injDep')),retreat:pc(sum('injRetreat'),sum('injDep')),hurt:pc(sum('injHurt'),sum('injDep')),severe:pc(sum('injSevere'),sum('injDep')),death:pc(sum('injDeath'),sum('injDep'))},
 injDeathShare:pc(sum('injDeath'),sum('deaths')),kitDepShare:pc(sum('kitDep'),sum('injDep')),kitOutcome:{win:pc(sum('kitWin'),sum('kitDep')),death:pc(sum('kitDeath'),sum('kitDep'))},
 spellDaysP50:med(rows.flatMap(r=>r.spellDays)),spellDeathRate:pc(sum('spellDeaths'),sum('spells')),
 injWallet:{'D1-10':{p50:med(band(1,10).map(x=>x[1])),under80:under(band(1,10),80),under160:under(band(1,10),160)},
  'D11-20':{p50:med(band(11,20).map(x=>x[1])),under80:under(band(11,20),80),under160:under(band(11,20),160)},
  'D21-29':{p50:med(band(21,29).map(x=>x[1])),under80:under(band(21,29),80),under160:under(band(21,29),160)}},tally};
console.log(JSON.stringify(res));if(out)fs.writeFileSync(out,JSON.stringify(res,null,1));
