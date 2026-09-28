// v2.9.11 measurement (User 2026-09-28): draft 생존 Store Supports that ease injury, each assumed owned from D10, against the
// shipped rules (early Gate slope 1.40), on the `reader` bot with the same seeds (revision-0..N-1) per arm. Measurement only: two
// numbers inside dungeon.js are read through globals in an in-memory copy; no game file changes.
//   node tools/measure-survival-v2911.cjs <arm> [runs=3000] [out.json]
//   arms: base · heal20 (an injured visitor recovers on arrival, 20%) · pen8 (injured Combat -15% -> -8%) · retreat50 (retreat
//         healing 25% -> 50% base) · noesc (no Severe escalation on an injured departure) · keystone (heal30 + noesc) ·
//         hybrid (a 단골 arriving injured: Wallet +40G and 25% recovery)
const path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');const ROOT=path.resolve(__dirname,'..');
const load=f=>{if(f!=='systems/dungeon')return require(path.join(ROOT,'dist',f+'.js'));
 let src=fs.readFileSync(path.join(ROOT,'dist/systems/dungeon.js'),'utf8');
 const swap=(a,b)=>{if(src.split(a).length!==2)throw Error('dungeon.js changed: '+a);src=src.replace(a,b);};
 swap('injuredCombatPenalty:.15;','injuredCombatPenalty:(globalThis.__injPen??.15);');
 swap('severeEscalation=departedInjured?.15:0','severeEscalation=departedInjured?(globalThis.__sevEsc??.15):0');
 vm.runInThisContext(src,{filename:'dungeon.js'});};
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])load(f);
const arm=process.argv[2]||'base',runs=Number(process.argv[3]||3000),out=process.argv[4],FROM=10;
const A={base:{},heal20:{heal:.20},pen8:{pen:.08},retreat50:{retreat:.50},noesc:{esc:0},keystone:{heal:.30,esc:0},hybrid:{regular:{gold:40,heal:.25}}}[arm];
if(!A)throw Error('unknown arm '+arm);const P=Game.prototype,tally={heals:0,gold:0};
const night=P.night;P.night=function(){const on=this.run.day>=FROM;
 globalThis.__injPen=on&&A.pen!=null?A.pen:undefined;globalThis.__sevEsc=on&&A.esc!=null?A.esc:undefined;
 Dungeon.RETREAT_HEAL.chance=on&&A.retreat?A.retreat:.25;const r=night.apply(this,arguments);Dungeon.RETREAT_HEAL.chance=.25;return r;};
const arrive=P.arrive;P.arrive=function(){const s=this.run,n=s.npcs.find(x=>x.id===s.queue[s.cursor]);
 if(s.day>=FROM&&n&&n.injury===1){
  if(A.heal&&Math.random()<A.heal){n.injury=0;n.status='건강';tally.heals++;}
  if(A.regular&&Adventurer.isTrustedRegular(n)){n.money+=A.regular.gold;tally.gold+=A.regular.gold;if(Math.random()<A.regular.heal){n.injury=0;n.status='건강';tally.heals++;}}}
 return arrive.apply(this,arguments);};
const rows=[],recs=[];const end=P.end;P.end=function(w,why){const s=this.run;const ret=end.call(this,w,why);const R=s.npcs.flatMap(n=>n.records||[]);
 for(const r of R)recs.push([r.day,r.outcome,!!r.departedInjured]);
 rows.push({day:s.day,win:!!s.win,deaths:R.filter(r=>r.outcome==='사망').length,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final'});return ret;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
const N=rows.length,pc=(a,b)=>b?+(100*a/b).toFixed(1):null,win=o=>o==='성공'||o==='대성공',late=recs.filter(r=>r[0]>=FROM&&r[0]<30),I=late.filter(r=>r[2]);
const res={arm,runs:N,d20:pc(rows.filter(r=>r.day>=20).length,N),d30:pc(rows.filter(r=>r.day>=30).length,N),clear:pc(rows.filter(r=>r.win).length,N),
 deathLimitEnd:pc(rows.filter(r=>r.end==='death').length,N),bankruptEnd:pc(rows.filter(r=>r.end==='bankrupt').length,N),deathsPerRun:+(rows.reduce((a,r)=>a+r.deaths,0)/N).toFixed(2),
 fromD10:{injuredShare:pc(I.length,late.length),injuredWin:pc(I.filter(r=>win(r[1])).length,I.length),injuredDeath:pc(I.filter(r=>r[1]==='사망').length,I.length),
  allWin:pc(late.filter(r=>win(r[1])).length,late.length)},perRun:{heals:+(tally.heals/N).toFixed(2),gold:+(tally.gold/N).toFixed(1)}};
console.log(JSON.stringify(res));if(out)fs.writeFileSync(out,JSON.stringify(res,null,1));
