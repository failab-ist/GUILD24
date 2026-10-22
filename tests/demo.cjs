// 체험판 전용 규칙 (demo/demo.js): every demo Run meets 프라이드, a Run that closes DAY 20 standing ends there without a
// Boss clear and settles its Store Capital, the next Run starts as usual, Job Mastery stops at rank 2, and the same seed
// plays the same way. The full game never loads demo.js; the other suites cover it as it is.
const assert=require('node:assert/strict'),path=require('node:path'),root=path.join(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));
require(path.join(root,'demo','demo.js'));
const G=globalThis,DEMO=G.GUILD24_DEMO,P=G.Game.prototype;
assert.ok(DEMO,'demo.js defines GUILD24_DEMO');
assert.equal(G.DATA.masteryRanks.length,2,'Job Mastery ranks 1 and 2 only');
{const A=G.Adventurer,F=DEMO.faces;
 assert.equal(A.names.length,F.M+F.F+1,'the demo keeps the names whose portraits it ships');
 for(const n of A.names){const p=A.portraitOf(n);assert.ok(p.gender==='X'||p.slot<=F[p.gender],n+' keeps its own portrait');}}

const play=prefix=>{const ends=[],end=P.end;
 P.end=function(win,reason){const s=this.run,first=s.phase!=='end',before=G.Meta.storeCapital(this.account);const r=end.apply(this,arguments);
  if(first)ends.push({day:s.day,win:s.win,reason:s.endReason,boss:s.bossId,gain:s.settlement?.gain??0,capital:G.Meta.storeCapital(this.account)-before,
   clears:G.Meta.distinctBossClear(this.account),best:this.account.bestDay});return r;};
 try{G.Debug.trajectory({trajectories:8,runs:3,policy:'investor',prefix});}finally{P.end=end;}
 return ends;};

const a=play('demo-test');
assert.equal(a.length,24,'every Run ends');
for(const e of a){
 assert.equal(e.boss,'PRIDE','the demo Boss is 프라이드');
 assert.ok(e.day<=DEMO.endDay,'no Run goes past DAY '+DEMO.endDay+' (ended on '+e.day+')');
 assert.equal(e.win,false,'no Run is a clear');
 assert.equal(e.clears,0,'no Boss clear is recorded');
 assert.ok(e.best<=DEMO.endDay,'bestDay stays within the demo');
 assert.equal(e.capital,e.gain,'Store Capital settles once, as usual');}
const reached=a.filter(e=>e.reason===DEMO.reason);
assert.ok(reached.length>0,'some Run reaches the DAY '+DEMO.endDay+' ending');
for(const e of reached){assert.equal(e.day,DEMO.endDay);assert.ok(e.gain>0,'a DAY '+DEMO.endDay+' Run earns Capital');}
assert.ok(a.some(e=>e.reason!==DEMO.reason),'a death-limit or bankrupt close still ends the usual way');
assert.deepEqual(play('demo-test').map(e=>[e.day,e.reason,e.gain]),a.map(e=>[e.day,e.reason,e.gain]),'the same seeds play the same way');
console.log('demo rules ok · '+a.length+' Runs, '+reached.length+' reached DAY '+DEMO.endDay);
