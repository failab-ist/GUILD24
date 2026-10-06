// 승인된 측정 후보의 경계값 검사. 런 진행·시뮬 없음.
const assert=require('node:assert/strict'),path=require('node:path');
const root=process.argv[2],weight=+process.argv[3];
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(root,'dist',f+'.js'));
const n=(level=2,xp=0,alive=true)=>({job:'warrior',level,xp,alive,potential:1,stats:{combat:17,survival:18,mobility:9,spirit:10}});
assert.equal(Adventurer.catchupXP(n(),20,10),30);
assert.equal(Adventurer.catchupXP(n(),60,10),76,'추가분만 최저 Lv4까지');
assert.equal(Adventurer.catchupXP(n(),90,10),90,'원래 경험치는 상한으로 자르지 않음');
assert.equal(Adventurer.catchupXP(n(3,41),10,10),10,'원래 경험치만으로 도달하면 추가 없음');
assert.equal(Adventurer.catchupXP(n(4),20,10),20);
assert.equal(Adventurer.catchupXP(n(2,0,false),20,10),20);
assert.equal(Adventurer.catchupXP(n(1),20,4),20);
assert.equal(Adventurer.catchupXP(n(1),20,5),26);
const low=n();Adventurer.grow(low,Adventurer.catchupXP(low,60,10));assert.equal(low.level,4);assert.equal(low.xp,0);
assert.equal(Adventurer.catchupXP(low,60,10),60,'도달 뒤 종료');
const boundary=n(1);Adventurer.grow(boundary,25);assert.equal(boundary.level,1);Adventurer.grow(boundary,1);assert.equal(boundary.level,2);
assert.deepEqual(DATA.jobBy.mage.growth,[3.1,1.6,1.8,2.7]);assert.equal(DATA.bossTuning.firePairPower,12);
assert.ok(Math.abs(Dungeon.gateDayTerm(29)-34.3)<1e-9);
for(const [boss,fire,seals,want] of [['WRATH',false,0,228],['WRATH',true,0,239.4],['GREED',false,0,242.25],['SLOTH',false,0,253.65],['SLOTH',false,3,189.05]]){
 const run={bossId:boss,final:{families:fire?['golem','snow']:['spider','snow']},stats:{revenue:0},sealBreakCount:seals};
 assert.ok(Math.abs(Game.prototype.effectiveBossPower.call({run},0)-want)<1e-9,boss);}
const actor={...n(3),id:'a',rarity:0,traits:[],fatigue:0,injury:0,loyalty:0,equipment:{power:0},pack:[],records:[],stats:{combat:100,survival:60,mobility:30,spirit:30}};
const run={team:['a'],npcs:[actor],dungeons:[{family:'final',day:30,tier:2,hazards:['poison','bind']}],facilities:[],bossId:'WRATH',stats:{revenue:0},final:{families:['spider','snow']}};
const pre=Game.prototype.finalPreRoll.call({run,wears:()=>false,finalSnapshot:Game.prototype.finalSnapshot,effectiveBossPower:Game.prototype.effectiveBossPower});
assert.ok(Math.abs(pre.power-(82.4-13.5*weight))<1e-9,'최종 차감 계수');
run.finalLock={families:run.final.families,members:[{npcId:'a',hazard:27/Math.sqrt(2),regular:false,stats:pre.snapshots[0]}]};run.bossDebug={power:pre.power,bossPower:228};run.finalReport={members:[{npcId:'a',items:['highpotion']}]};
const {jobMetrics}=require(path.join(root,'tools/measure-v2100.cjs'));const before=JSON.stringify(run);
const metric=jobMetrics(run,new WeakMap(),DATA.jobBy,Dungeon.preparedPower);
assert.equal(JSON.stringify(run),before);assert.equal(metric.final.top3[0].level,3);assert.equal(metric.final.members[0].equipment,0);
assert.deepEqual(metric.final.members[0].preparedStats,pre.snapshots[0]);assert.deepEqual(metric.final.hazards,['poison','bind']);
console.log('PASS: 부스트 상한/기본 XP 보존/종료/생환, 성장·후반·법사·화염·마왕, 최종 계수·집계 보존 '+weight);
