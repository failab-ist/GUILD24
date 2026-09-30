// v2.9.12 measurement (User 2026-09-30): D21~29 Gate slope with DAY 1~10 kept, and a Hazard Threat / Counter re-fit.
// MEASUREMENT ONLY - every value below is an in-memory patch; the files on disk are untouched. Same seeds per arm.
//   node tools/measure-hazard-refit-v2912.cjs [--late 1.10] [--mid 1.10] [--refit none|full|half|v2k|v2|v3|v3b] [--final-tier 3] [--policy reader]
//        [--runs 300] [--account account.json]
// --late / --mid: DAY 21+ / DAY 11~20 slopes. DAY 1~9 (1.45) and the DAY 9~10 step (0.80) stay as shipped.
// --refit: Hazard Threat x a Stat-group factor (강인함 / 기동 / 정신), Counter values re-set per Ladder rung, Trait Counters
//   x the same factor. The ÷3 / ÷2 Stat conversion is unchanged (User 2026-09-30). --final-plain keeps the Final's Threat as shipped.
const path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');const ROOT=path.resolve(__dirname,'..');
const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
const LATE_ARG=flag('--late',null),MID_ARG=flag('--mid',null),REFIT=flag('--refit','none'),policy=flag('--policy','reader'),runs=Number(flag('--runs',300));
const acct=flag('--account',null),account=acct?JSON.parse(fs.readFileSync(acct,'utf8')):null;
/* Threat factor by the pressed Stat, and Counter value by Ladder rung (ITEM §COUNTER LADDER), shipped value -> trial value */
const REFITS={
 full:{factor:{survival:1.15,mobility:1.45,spirit:1.7},
  counter:{survival:{10:12,12:13,16:18,21:22,23:24},mobility:{9:16,14:22,21:30},spirit:{8:17,9:19,12:26,18:35}}},
 half:{factor:{survival:1.05,mobility:1.2,spirit:1.35},
  counter:{survival:{10:10,12:11,16:15,21:20,23:21},mobility:{9:11,14:16,21:22},spirit:{8:11,9:12,12:18,18:25}}},
 /* User 2026-09-30: half, 강인함 Counters kept as shipped */
 v2k:{factor:{survival:1.05,mobility:1.2,spirit:1.35},
  counter:{survival:{10:10,12:12,16:16,21:21,23:23},mobility:{9:11,14:16,21:22},spirit:{8:11,9:12,12:18,18:25}}},
 /* User 2026-09-30: v2k with the Ladder changed so 초반 대응 stays the T1 answer - 초반 하이브리드 sits below it on the
    Gate's first Hazard (강인함 12 -> 9, 정신 kept 9 under 초반 대응 11) */
 v2:{factor:{survival:1.05,mobility:1.2,spirit:1.35},
  counter:{survival:{10:10,12:9,16:16,21:21,23:23},mobility:{9:11,14:16,21:22},spirit:{8:11,9:9,12:18,18:25}}},
 /* User 2026-09-30: a milder v2 - Threat x 1.0 / 1.1 / 1.2; Counters kept except the v2 Ladder (초반 하이브리드 under
    초반 대응 on the first Hazard) and 정신 rungs above the 대현자 허브엘릭서 natural value (14) */
 v3:{factor:{survival:1.0,mobility:1.1,spirit:1.2},
  counter:{survival:{10:10,12:9,16:16,21:21,23:23},mobility:{9:9,14:14,21:21},spirit:{8:10,9:9,12:15,18:20}}},
 /* User 2026-09-30: v3 with every Counter raised as far as its Hazard's Threat rose (강인함 x1.0, 기동 x1.1, 정신 x1.2),
    the v2 Ladder kept (초반 하이브리드 under 초반 대응 on a Gate's first Hazard - 방한 두건's 화이트아웃 is a second Hazard) */
 v3b:{factor:{survival:1.0,mobility:1.1,spirit:1.2},
  counter:{survival:{10:10,12:9,16:16,21:21,23:23},mobility:{9:10,14:15,21:23},spirit:{8:10,9:9,12:15,18:22}},
  item:{hood:{whiteout:11}}}};
const R=REFITS[REFIT]||null;globalThis.__HF=R?R.factor:{};
/* --final-plain: the Final keeps the shipped Threat (no Stat-group factor), so a re-fit can be read apart from its Final effect */
globalThis.__FINAL_PLAIN=args.includes('--final-plain');
/* --final-tier 3: the Final reads its Hazards at that Tier instead of T2 (User 2026-09-30: the Final's environment only) */
globalThis.__FINAL_TIER=Number(flag('--final-tier',0))||0;
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation']){
 const file=path.join(ROOT,'dist',f+'.js');
 if(f==='systems/dungeon'){let src=fs.readFileSync(file,'utf8');const at='threat=12+(d.day||1)*.35+((d.tier||1)-1)*6,';
  if(src.split(at).length!==2)throw Error('threat patch point x'+(src.split(at).length-1));
  src=src.replace(at,'threat=(12+(d.day||1)*.35+(((d.family===\'final\'&&globalThis.__FINAL_TIER)||d.tier||1)-1)*6)*(d.family===\'final\'&&globalThis.__FINAL_PLAIN?1:((globalThis.__HF||{})[rule[0]]||1)),');vm.runInThisContext(src,{filename:file});}
 else require(file);}
/* the shipped slopes unless --late / --mid is given (v2.9.13 ships late 1.10 with its own DAY 9~10 step) */
const LATE=LATE_ARG===null?Dungeon.GATE.late:Number(LATE_ARG),MID=MID_ARG===null?Dungeon.GATE.mid:Number(MID_ARG);
Dungeon.gateDayTerm=day=>Math.min(day,9)*1.45+Math.max(0,Math.min(day,10)-9)*.80+Math.max(0,Math.min(day,20)-10)*MID+Math.max(0,day-20)*LATE;
const HZ=Object.keys(DATA.hazards);
if(R){for(const it of DATA.items)for(const h of HZ){const v=it.effects[h]||0;if(v<=0)continue;const st=Dungeon.hazardRule(h).stat,nv=R.counter[st][v];
  if(nv===undefined)throw Error('no rung for '+it.id+' '+h+' '+v);it.effects[h]=R.item?.[it.id]?.[h]??nv;}
 for(const t of DATA.traits){const e=t.effects||{};for(const h of HZ)if(e[h])e[h]=Math.round(e[h]*R.factor[Dungeon.hazardRule(h).stat]);}}
/* ITEM §COUNTER LADDER rungs a DAY 1~5 Bag can carry */
const BASIC=['mask','soda','ramen','candy','ice'],HYBRID=['webgloves','cloak','holylight','hood'];
const P=Game.prototype,rows=[],seg=d=>d<=10?0:d<=20?1:2,lab={};
const night=P.night;P.night=function(){const s=this.run;for(const id of s.queue||[]){const n=s.npcs.find(x=>x.id===id);if(!n||!n.alive)continue;const d=this.gateFor(n);if(!d||d.family==='final')continue;
  const t=d.tier||1,bare=Dungeon.prepare({...n,pack:[]},d,s.facilities).hazards,ready=Dungeon.prepare(n,d,s.facilities).hazards;
  for(let i=0;i<bare.length;i++){const b=lab['T'+t+':'+bare[i].stat.slice(0,3)]??={n:0,bare:0,ready:0};b.n++;b.bare+=bare[i].label==='충분';b.ready+=ready[i].label==='충분';}}
 return night.apply(this,arguments);};
let fin=null;const boss=P.boss;P.boss=function(){const s=this.run;try{const t=this.finalPreRoll(),e=this.finalPreRoll(Object.fromEntries(s.team.map(id=>[id,[]])));
  fin={ratio:t.power/t.bossPower,bare:e.power/e.bossPower,gap:t.preparations.reduce((a,p)=>a+p.hazards.reduce((v,h)=>v+h.gap,0)/p.hazards.length,0)/t.preparations.length};}catch(err){fin=null;}
 return boss.apply(this,arguments);};
const end=P.end;P.end=function(w,why){const s=this.run;const r=end.call(this,w,why);const Rc=s.npcs.flatMap(n=>n.records||[]);
 const bySeg=[0,1,2].map(k=>{const x=Rc.filter(r=>r.day<30&&seg(r.day)===k);return [x.length,x.filter(r=>r.outcome==='사망').length,x.filter(r=>['부상','중상'].includes(r.outcome)).length,x.filter(r=>['성공','대성공'].includes(r.outcome)).length];});
 const early=Rc.filter(r=>r.day<=5).flatMap(r=>r.items);
 rows.push({early:{n:Rc.filter(r=>r.day<=5).length,basic:early.filter(id=>BASIC.includes(id)).length,hybrid:early.filter(id=>HYBRID.includes(id)).length},day:s.day,win:!!s.win,deathEnd:s.stats.deaths>=Meta.deathLimit(s),capital:Math.round(s.stats.revenue*Meta.capitalRate(s.day)),bySeg,fin:s.bossDebug?fin:null});fin=null;return r;};
Debug.simulate(runs,policy,account,'adaptive','hybrid',{});
const N=rows.length,pc=(a,b=N)=>b?+(100*a/b).toFixed(1):null,q=(a,p)=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?+v[Math.floor((v.length-1)*p)].toFixed(2):null;};
const F=rows.filter(r=>r.fin).map(r=>r.fin),sum=(k,i)=>rows.reduce((a,r)=>a+r.bySeg[k][i],0);
console.log(JSON.stringify({late:LATE,mid:MID,refit:REFIT,finalPlain:globalThis.__FINAL_PLAIN,finalTier:globalThis.__FINAL_TIER||2,policy,account:!!account,runs:N,
 d10:pc(rows.filter(r=>r.day>=10).length),d20:pc(rows.filter(r=>r.day>=20).length),d30:pc(rows.filter(r=>r.day>=30).length),clear:pc(rows.filter(r=>r.win).length),
 deathEnd:pc(rows.filter(r=>r.deathEnd).length),
 seg:[0,1,2].map(k=>({exp:sum(k,0),win:pc(sum(k,3),sum(k,0)),hurt:pc(sum(k,2),sum(k,0)),death:pc(sum(k,1),sum(k,0))})),
 suffBare:Object.fromEntries(Object.entries(lab).map(([t,b])=>[t,pc(b.bare,b.n)])),suffReady:Object.fromEntries(Object.entries(lab).map(([t,b])=>[t,pc(b.ready,b.n)])),
 final:{n:F.length,ratioP50:q(F.map(f=>f.ratio),.5),ratioP10:q(F.map(f=>f.ratio),.1),sure:pc(F.filter(f=>f.ratio>=1/.88).length,F.length),bareP50:q(F.map(f=>f.bare),.5),bareSure:pc(F.filter(f=>f.bare>=1/.88).length,F.length),gapP50:q(F.map(f=>f.gap),.5)},
 d1to5per100:{basic:+(100*rows.reduce((a,r)=>a+r.early.basic,0)/Math.max(1,rows.reduce((a,r)=>a+r.early.n,0))).toFixed(1),
  hybrid:+(100*rows.reduce((a,r)=>a+r.early.hybrid,0)/Math.max(1,rows.reduce((a,r)=>a+r.early.n,0))).toFixed(1)},
 capitalMean:+(rows.reduce((a,r)=>a+r.capital,0)/N).toFixed(0)}));
