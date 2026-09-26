// v2.9.2 balance review (User 2026-09-25): three levers, candidates compared RELATIVE to each other - the simulation's
// absolute D30 numbers do not match real play (the User cleared the Boss on a fresh first Run), so no candidate is judged
// against a target rate. Measurement only: the candidate values are applied at runtime inside this process and no
// Source value changes.
//   node tools/remeasure-v292.cjs <out.json> [runs=1000] [policies=balanced,human]
// Arms (Great Success EXP 1.10 is the User-confirmed value; `base` is the build before it):
//   base            GS EXP 1.40, early slope 1.20, 정가 ×1.00
//   gs110           GS EXP 1.10
//   gs110-s14/-s15  + Gate early slope 1.40 / 1.50 (late 0.80 kept)
//   ...-i90/-i80    + the final 정가 purchase chance ×0.90 / ×0.80 (the 0.97 관련 준비 case included; 50% / 150% untouched)
const {spawnSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ARMS={base:{xp:1.40,early:1.20,full:1},gs110:{xp:1.10,early:1.20,full:1},
 'gs110-s14':{xp:1.10,early:1.40,full:1},'gs110-s15':{xp:1.10,early:1.50,full:1},
 'gs110-s14-i90':{xp:1.10,early:1.40,full:.90},'gs110-s14-i80':{xp:1.10,early:1.40,full:.80},
 'gs110-s15-i90':{xp:1.10,early:1.50,full:.90},'gs110-s15-i80':{xp:1.10,early:1.50,full:.80}};
if(process.argv[2]==='--worker'){
 const [,,,,arm,policy,runs]=process.argv,a=ARMS[arm];
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(__dirname,'..','dist',f+'.js'));
 Dungeon.GREAT.xp=a.xp;Dungeon.GATE.early=a.early;
 const P=Game.prototype,interest=P.interest,sell=P.sell,boss=P.boss;
 P.interest=function(n,it,mode){const r=interest.call(this,n,it,mode);if(mode==='full'&&a.full!==1)r.chance=r.chance*a.full;return r;};
 const offers={half:[0,0],full:[0,0],overcharge:[0,0]},party=[],d20=[];
 P.sell=function(id,mode='full'){const ok=sell.call(this,id,mode);if(offers[mode]){offers[mode][0]++;if(ok)offers[mode][1]++;}return ok;};
 P.boss=function(...x){const s=this.run;party.push(s.team.map(id=>s.npcs.find(n=>n.id===id).level));return boss.apply(this,x);};
 const close=P.closeDay;P.closeDay=function(...x){const s=this.run;if(s.day===20){const lv=s.npcs.filter(n=>n.alive&&n.introduced).map(n=>n.level).sort((p,q)=>q-p);d20.push(lv.slice(0,3));}return close.apply(this,x);};
 const r=Debug.simulate(Number(runs),policy,null,'adaptive','hybrid',{});
 const mean=v=>v.length?v.reduce((p,q)=>p+q,0)/v.length:null,flat=v=>v.flat();
 process.stdout.write(JSON.stringify({arm,policy,runs:Number(runs),reach10:r.reach10,reach20:r.reach20,reach30:r.reach30,
  bossWinGivenReach:r.bossWinGivenReach,clear:r.overallClearRate,deaths:r.averageDeaths,endedBy:r.endedBy,avgDay:r.averageDay,
  greatSuccessRate:r.greatSuccessRate,partyLevel:mean(flat(party)),partyTop:mean(party.map(p=>Math.max(...p))),d20Top3:mean(flat(d20)),
  accept:Object.fromEntries(Object.entries(offers).map(([k,[t,o]])=>[k,t?o/t:null])),offers:Object.fromEntries(Object.entries(offers).map(([k,[t]])=>[k,t]))}));
 return;}
const out=process.argv[2]||'reports/v292-balance-review.json',runs=process.argv[3]||'1000',pols=(process.argv[4]||'balanced,human').split(',');
const jobs=[];for(const arm of Object.keys(ARMS))for(const p of pols)jobs.push([arm,p]);
const res=[];let i=0;const par=Number(process.env.PAR||4);
const {spawn}=require('node:child_process');
function next(){if(i>=jobs.length)return null;const [arm,p]=jobs[i++];return new Promise(ok=>{let buf='';
 const c=spawn(process.execPath,[__filename,'--worker','',arm,p,runs]);c.stdout.on('data',d=>buf+=d);c.stderr.pipe(process.stderr);
 c.on('close',()=>{try{const j=JSON.parse(buf);res.push(j);console.log(arm,p,'clear',j.clear,'reach30',j.reach30);}catch(e){console.log('FAIL',arm,p,buf.slice(0,200));}ok(next());});});}
Promise.all(Array.from({length:par},()=>next())).then(async()=>{while(res.length<jobs.length&&i<jobs.length)await next();
 fs.writeFileSync(out,JSON.stringify({generated:'v2.9.2 balance review',runs:Number(runs),arms:ARMS,results:res},null,1));console.log('wrote',out);});
