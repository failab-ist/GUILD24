// MEASUREMENT ONLY (User 2026-09-30 confirmed: 3,000 Run x reader/balanced). Final win rate, fire pair vs other pairs, and the
// fire-pair win rate if Boss Power were +b (counterfactual on the same recorded assault; the bots' choices are not re-played).
//   node tools/measure-firepair.cjs <runs> <policy>   (reader 3,000 took 216-234 s)
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const P=Game.prototype,end=P.end,rows=[];const t0=Date.now();
P.end=function(w,why){const s=this.run,first=s.phase!=='end';const r=end.call(this,w,why);
 if(first&&s.day>=30&&s.bossDebug)rows.push({fire:s.final.families.includes('golem'),win:!!s.win,a:s.bossDebug.assault,b:s.bossDebug.bossPower,boss:s.bossId});return r;};
const N=Number(process.argv[2]||3000),policy=process.argv[3]||'reader';
Debug.simulate(N,policy,null,'adaptive','hybrid',{});
const rate=(v,b=0)=>+(100*v.filter(r=>r.a>=r.b+b).length/v.length).toFixed(1);
const fire=rows.filter(r=>r.fire),other=rows.filter(r=>!r.fire);
const ci=(p,n)=>+(1.96*Math.sqrt(p*(100-p)/n)).toFixed(1);
const curve={};for(let b=0;b<=30;b+=2)curve['+'+b]=rate(fire,b);
console.log(JSON.stringify({policy,runs:N,secs:Math.round((Date.now()-t0)/1000),finals:rows.length,
 check:{recordedWinMatches:rows.every(r=>r.win===(r.a>=r.b))},
 fire:{n:fire.length,win:rate(fire),ci:ci(rate(fire),fire.length)},other:{n:other.length,win:rate(other),ci:ci(rate(other),other.length)},
 fireIfBossPlus:curve,meanBoss:+(rows.reduce((s,r)=>s+r.b,0)/rows.length).toFixed(1)}));
