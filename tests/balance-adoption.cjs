// User-approved balance boundaries; no trajectory measurement.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
const actor=(level=2,xp=0,alive=true)=>({job:'warrior',level,xp,alive,potential:1,stats:{combat:17,survival:18,mobility:9,spirit:10}});
assert.equal(Adventurer.growthCost(1),27);assert.equal(Adventurer.growthCost(20),198);
for(const [day,want]of [[1,1],[4,1],[5,2],[10,4],[20,8],[29,12],[30,12]])assert.equal(Adventurer.newcomerMinLevel(day),want);
assert.equal(Adventurer.catchupXP(actor(),20,10),30);assert.equal(Adventurer.catchupXP(actor(),60,10),81);
assert.equal(Adventurer.catchupXP(actor(),90,10),90,'base EXP is never cut');
assert.equal(Adventurer.catchupXP(actor(3,41),10,10),10);assert.equal(Adventurer.catchupXP(actor(4),20,10),20);
assert.equal(Adventurer.catchupXP(actor(2,0,false),20,10),20,'no bonus after Death');
assert.equal(Adventurer.catchupXP(actor(1),20,4),20);assert.equal(Adventurer.catchupXP(actor(1),20,5),27);
const a=actor();Adventurer.grow(a,Adventurer.catchupXP(a,60,10),{next(){throw Error('growth RNG');}});assert.equal(a.level,4);assert.equal(a.xp,0);
assert.equal(Adventurer.catchupXP(a,60,10),60,'bonus stops at minimum');
// 실패 생환(퇴각·부상·중상)만: ×1.5 보너스와 최저선까지 모자란 경험치 25% 중 큰 쪽, 추가분 상한 유지.
assert.equal(Adventurer.catchupXP(actor(2),28,10,'퇴각'),48);assert.equal(Adventurer.catchupXP(actor(2),28,10,'성공'),42);
assert.equal(Adventurer.catchupXP(actor(6),57,25,'부상'),143);assert.equal(Adventurer.catchupXP(actor(6),57,25,'중상'),143);
assert.equal(Adventurer.catchupXP(actor(6),151,25,'성공'),227);assert.equal(Adventurer.catchupXP(actor(6),151,25,'대성공'),227);
assert.equal(Adventurer.catchupXP(actor(7),20,20,'퇴각'),40);assert.equal(Adventurer.catchupXP(actor(7),60,20,'퇴각'),81,'bonus still stops at the minimum');
assert.equal(Adventurer.catchupXP(actor(2,0,false),28,10,'퇴각'),28,'no bonus after Death');
assert.equal(Adventurer.catchupXP(actor(4),28,10,'퇴각'),28,'no bonus at the minimum');
for(const h of Object.keys(DATA.hazards))assert.equal(Dungeon.hazardState(h,{survival:0,mobility:0,spirit:0},{day:30,tier:2,family:'final'}).threat,28);
assert.equal(Dungeon.hazardState('cold',{survival:84},{day:30,tier:2,family:'final'}).label,'충분');
assert.ok(Math.abs(Dungeon.hazardState('cold',{survival:0},{day:29,tier:3}).threat-39.65)<1e-9,'ordinary hazard curve unchanged');
assert.ok(Math.abs(Dungeon.gateDayTerm(29)-34.30)<1e-9);assert.deepEqual(DATA.jobBy.mage.growth,[3.1,1.6,1.8,2.7]);
assert.equal(DATA.balance.finalGapPenalty,2);assert.equal(DATA.bossTuning.firePairPower,12);assert.equal(DATA.bossTuning.finalPowerFactor,.95);
for(const [boss,fire,seals,revenue,want]of [['WRATH',false,0,0,228],['WRATH',true,0,0,239.4],['GREED',false,0,0,242.25],['GREED',false,0,18800,228],['SLOTH',false,0,0,253.65],['SLOTH',true,0,0,265.05],['SLOTH',false,3,0,189.05]]){
 const run={bossId:boss,final:{families:fire?['golem','spider']:['spider','snow']},stats:{revenue},sealBreakCount:seals};
 assert.ok(Math.abs(Game.prototype.effectiveBossPower.call({run},0)-want)<1e-9,boss+' effective requirement');}
// 승인된 변경 폭의 절반: 앵커/보간/유지와 화염 계열을 함께 확인한다.
for(const [day,offset]of [[1,.125],[4,.25],[10,.5],[11,.55],[15,.75],[20,1],[21,1.1],[22,1.2],[25,1.5],[26,1.5],[29,1.5]]){
 for(const [family,base]of [['spider',2],['slime',2],['golem',3],['crypt',3],['snow',4]])for(const tier of [1,2,3]){
  let calls=0;const dungeon=Game.prototype.makeDungeon.call({run:{day},burden(){calls++;}},family,tier);
  const isFire=family==='golem',scale=(isFire?.9:1)*(day<=21?.9:.95),term=21+Dungeon.gateDayTerm(day)+(tier-1)*5+(base-2)*1.3;
  const old=(term+(isFire?[6,14,22][tier-1]:0))*scale;
  const full=(term+offset*2+(isFire?[6,13,20][tier-1]:0))*scale;
  const half=(term+offset+(isFire?[6,13.5,21][tier-1]:0))*scale;
  /* DUNGEON_HAZARD §GATE POWER: Tier I is one common requirement for every Family (User 2026-10-10) */
  const t1=(21+Dungeon.gateDayTerm(day)+offset+DATA.balance.gateTier1Term)*(day<=21?.9:.95);
  if(tier===1)assert.ok(Math.abs(dungeon.power-t1)<1e-9,'1티어 공통 게이트 '+day+'/'+family);
  else{assert.ok(Math.abs(dungeon.power-half)<1e-9,'승인된 절반 게이트 '+day+'/'+family+'/'+tier);
  assert.ok(Math.abs((dungeon.power-old)*2-(full-old))<1e-9,'기존→실험안 변화의 정확한 절반');}
  assert.equal(calls,1,'기존 burden 호출 보존');assert.deepEqual(dungeon.hazards,DATA.familyTiers[family][tier-1]);
 }
}
const final=Game.prototype.makeFinal.call({run:{seed:'half-gate-final',day:30}});assert.equal(final.family,'final');assert.equal(final.power,DATA.balance.bossPower/3);assert.equal(final.scale,4.6);
console.log('PASS 절반 게이트·화염·성장 유지·최저레벨·부스트 상한·기본XP·RNG·마왕성28·일반위험·후반·법사·마왕 계수');
