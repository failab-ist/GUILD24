// User-approved balance boundaries; no trajectory measurement.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
const actor=(level=2,xp=0,alive=true)=>({job:'warrior',level,xp,alive,potential:1,stats:{combat:17,survival:18,mobility:9,spirit:10}});
assert.equal(Adventurer.growthCost(1),26);assert.equal(Adventurer.growthCost(20),178);
for(const [day,want]of [[1,1],[4,1],[5,2],[10,4],[20,8],[29,12],[30,12]])assert.equal(Adventurer.newcomerMinLevel(day),want);
assert.equal(Adventurer.catchupXP(actor(),20,10),30);assert.equal(Adventurer.catchupXP(actor(),60,10),76);
assert.equal(Adventurer.catchupXP(actor(),90,10),90,'base EXP is never cut');
assert.equal(Adventurer.catchupXP(actor(3,41),10,10),10);assert.equal(Adventurer.catchupXP(actor(4),20,10),20);
assert.equal(Adventurer.catchupXP(actor(2,0,false),20,10),20,'no bonus after Death');
assert.equal(Adventurer.catchupXP(actor(1),20,4),20);assert.equal(Adventurer.catchupXP(actor(1),20,5),26);
const a=actor();Adventurer.grow(a,Adventurer.catchupXP(a,60,10),{next(){throw Error('growth RNG');}});assert.equal(a.level,4);assert.equal(a.xp,0);
assert.equal(Adventurer.catchupXP(a,60,10),60,'bonus stops at minimum');
for(const h of Object.keys(DATA.hazards))assert.equal(Dungeon.hazardState(h,{survival:0,mobility:0,spirit:0},{day:30,tier:2,family:'final'}).threat,28);
assert.equal(Dungeon.hazardState('cold',{survival:84},{day:30,tier:2,family:'final'}).label,'충분');
assert.ok(Math.abs(Dungeon.hazardState('cold',{survival:0},{day:29,tier:3}).threat-39.65)<1e-9,'ordinary hazard curve unchanged');
assert.ok(Math.abs(Dungeon.gateDayTerm(29)-34.30)<1e-9);assert.deepEqual(DATA.jobBy.mage.growth,[3.1,1.6,1.8,2.7]);
assert.equal(DATA.balance.finalGapPenalty,2);assert.equal(DATA.bossTuning.firePairPower,12);assert.equal(DATA.bossTuning.finalPowerFactor,.95);
for(const [boss,fire,seals,revenue,want]of [['WRATH',false,0,0,228],['WRATH',true,0,0,239.4],['GREED',false,0,0,242.25],['GREED',false,0,18800,228],['SLOTH',false,0,0,253.65],['SLOTH',true,0,0,265.05],['SLOTH',false,3,0,189.05]]){
 const run={bossId:boss,final:{families:fire?['golem','spider']:['spider','snow']},stats:{revenue},sealBreakCount:seals};
 assert.ok(Math.abs(Game.prototype.effectiveBossPower.call({run},0)-want)<1e-9,boss+' effective requirement');}
console.log('PASS 성장·최저레벨·부스트 상한·기본XP·RNG·마왕성28·일반위험·후반·법사·마왕 계수');
