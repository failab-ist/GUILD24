// 직업 측정 집계의 보존·분모·최종 기여 검사. 런을 재생하지 않는다.
const assert=require('node:assert/strict');
require('../dist/data/catalog.js');require('../dist/systems/dungeon.js');
const {jobMetrics,useFirstRunLessons}=require('../tools/measure-v2100.cjs');
const record=(day,outcome,combatWon,environmentHurt)=>({day,outcome,combatWon,environmentHurt});
const a={id:'a',job:'warrior',level:3,rarity:0,potential:1,alive:true,records:[record(1,'성공',true,false),record(8,'부상',true,true),{...record(9,'성공',true,false),deep:{}}]},
 b={id:'b',job:'mage',level:2,rarity:2,potential:1.2,alive:true,records:[record(22,'부상',false,false)]},
 c={id:'c',job:'warrior',level:2,rarity:1,potential:1.1,alive:true,records:[record(2,'성공',true,false),record(30,'성공',true,false)]},
 dead={id:'dead',job:'mage',level:1,rarity:0,potential:1,alive:false,records:[record(3,'사망',false,false)]};
const initial=new WeakMap([[a,{level:1,day:1,mastery:0}],[b,{level:2,day:22,mastery:1}],[c,{level:1,day:2,mastery:0}],[dead,{level:1,day:3,mastery:0}]]);
const s={npcs:[a,b,c,dead,{id:'unused',records:[]}],win:true,dungeons:[{hazards:['poison','bind']}],
 finalLock:{families:['golem','spider'],members:[
  {npcId:'a',hazard:0,regular:true,stats:{combat:10,survival:0,mobility:0,spirit:0}},
  {npcId:'c',hazard:0,regular:false,stats:{combat:10,survival:0,mobility:0,spirit:0}},
  {npcId:'b',hazard:2*Math.sqrt(2),regular:false,stats:{combat:0,survival:10,mobility:0,spirit:0}}]},bossDebug:{power:7.7,bossPower:264},
 finalReport:{members:[{npcId:'a',items:['rice','hood']},{npcId:'b',items:['water']},{npcId:'c',items:['midpotion','candy']}]}};
const unchanged=JSON.stringify(s),r=jobMetrics(s,initial,DATA.jobBy,Dungeon.preparedPower);
assert.equal(JSON.stringify(s),unchanged,'집계는 입력을 변경하지 않음');
assert.equal(r.jobs.warrior.exp,3);assert.equal(r.jobs.warrior.wins,2);assert.equal(r.jobs.warrior.env,1);
assert.equal(r.jobs.warrior.levelGain,3);assert.deepEqual(r.jobs.warrior.bands[0],[2,2,0,0,0]);
assert.equal(r.jobs.mage.combatLoss,2);assert.equal(r.jobs.mage.deaths,1);assert.equal(r.jobs.mage.mastery,1);
assert.equal(r.jobs.warrior.rarities[0].exp,2);assert.equal(r.jobs.warrior.finalPicks,2);
assert.equal(r.jobs.warrior.finalRuns,1,'같은 직업 두 명도 참여 판은 한 번');assert.equal(r.jobs.warrior.finalWins,1);
assert.equal(r.final.fire,true);assert.ok(Math.abs(r.jobs.mage.finalPower+2.3)<1e-9);
assert.equal(r.final.supplied,true);assert.equal(r.final.fullPack,false,'각 1개 이상 지급과 모든 가방 충전은 분리');
assert.deepEqual(r.final.members[0].items,['rice','hood'],'비워진 NPC 가방 대신 최종 판정 보고서의 지급 내역');
for(const m of s.finalReport.members)m.items=[];
assert.equal(jobMetrics(s,initial,DATA.jobBy,Dungeon.preparedPower).final.supplied,false);
assert.equal(Object.values(r.jobs).reduce((sum,j)=>sum+j.exp,0),5,'심층/D30 제외 원정 총수 보존');
console.log('PASS 직업 측정: 노출·구간·희귀도·참여 분모·최종 기여·입력 보존');
for(const f of ['data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
useFirstRunLessons(Game.prototype);
for(const runs of [0,1]){const account=Meta.fresh();account.runs=runs;const g=new Game(account);g.autosave=false;g.lessons=false;g.start('measure-first-run-'+runs);assert.equal(g.run.firstRun,runs===0);}
console.log('PASS 기준 첫 런 보호: 새 계정 ON, 정산한 계정 OFF');
