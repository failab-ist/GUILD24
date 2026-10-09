// 검증만 수행한다. 궤적·확률 측정 없음.
const assert=require('node:assert/strict'),path=require('node:path');
const [root,profile]=process.argv.slice(2);assert.ok(['A','B','C','D'].includes(profile));
const gate=['B','D'].includes(profile),growth=['C','D'].includes(profile);
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.resolve(root,'dist',f+'.js'));
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,a+' != '+b);
const jobs={warrior:[[17,18,9,10],[2.8,3,1.5,1.6]],archer:[[13,12,21,10],[2.3,2.1,3.4,1.6]],mage:[[18,9,10,17],[3.1,1.6,1.8,2.7]],priest:[[10,16,9,20],[2.2,2.7,1.6,3]],rogue:[[17,10,19,9],[3,1.8,3,1.5]],berserker:[[21,15,13,7],[3.6,2.5,2,1.3]]};
for(const [id,[stats,gain]]of Object.entries(jobs)){assert.deepEqual(DATA.jobBy[id].stats,stats);assert.deepEqual(DATA.jobBy[id].growth,gain);}
for(const [level,old,next]of [[1,26,26],[4,50,50],[5,58,58],[6,66,67],[10,98,101],[15,138,143],[20,178,186]])assert.equal(Adventurer.growthCost(level),growth?next:old);
assert.equal(Adventurer.CATCHUP_MULT,growth?1.75:1.5);
for(const [day,want]of [[1,1],[4,1],[5,2],[10,4],[20,8],[25,10],[29,12],[30,12]])assert.equal(Adventurer.newcomerMinLevel(day),want);
const actor=(level=2,xp=0,alive=true)=>({job:'warrior',level,xp,alive,potential:1,stats:{combat:17,survival:18,mobility:9,spirit:10}});
assert.equal(Adventurer.catchupXP(actor(),20,10),growth?35:30);
assert.equal(Adventurer.catchupXP(actor(),60,10),76);
assert.equal(Adventurer.catchupXP(actor(),90,10),90);
assert.equal(Adventurer.catchupXP(actor(3,41),10,10),10);
assert.equal(Adventurer.catchupXP(actor(4),20,10),20);
assert.equal(Adventurer.catchupXP(actor(2,0,false),20,10),20);
assert.equal(Adventurer.catchupXP(actor(1),20,4),20);
assert.equal(Adventurer.catchupXP(actor(1),20,5),26);
const n=actor(10);Adventurer.grow(n,101,{next(){throw Error('성장 RNG 추가');}});assert.equal(n.level,11);assert.equal(n.xp,growth?0:3);close(n.stats.survival,21);
const offsets={1:.25,5:7/12,10:1,15:1.5,20:2,22:2.4,25:3,29:3};
for(const [dayS,offset]of Object.entries(offsets)){const day=+dayS;
 const term=Math.min(day,9)*1.45+Math.max(0,Math.min(day,10)-9)*.8+Math.max(0,Math.min(day,20)-10)*1.1+Math.max(0,day-20)*1.05;
 close(Dungeon.gateDayTerm(day),term);
 for(const id of ['spider','slime','golem','crypt','snow'])for(const tier of [1,2,3]){
  let calls=0;const d=Game.prototype.makeDungeon.call({run:{day},burden(){calls++;}},id,tier);
  const fire=id==='golem'?(gate?[6,13,20]:[6,14,22])[tier-1]:0;
  close(d.power,(21+term+(tier-1)*5+fire+(DATA.dungeonBy[id].base-2)*1.3+(gate?offset:0))*(id==='golem'?.9:1)*(day<=21?.9:.95));
  assert.equal(calls,1);assert.deepEqual(d.hazards,DATA.familyTiers[id][tier-1]);
 }}
close(Dungeon.hazardState('cold',{survival:0},{day:29,tier:3}).threat,39.65);
for(const h of Object.keys(DATA.hazards))assert.equal(Dungeon.hazardState(h,{survival:0,mobility:0,spirit:0},{day:30,tier:2,family:'final'}).threat,28);
assert.equal(DATA.balance.golemCombat,.9);assert.equal(DATA.balance.finalGapPenalty,2);assert.equal(DATA.bossTuning.firePairPower,12);assert.equal(DATA.bossTuning.finalPowerFactor,.95);
for(const [boss,fire,seals,want]of [['WRATH',false,0,228],['WRATH',true,0,239.4],['SLOTH',false,0,253.65],['SLOTH',true,0,265.05],['SLOTH',false,3,189.05]]){
 close(Game.prototype.effectiveBossPower.call({run:{bossId:boss,final:{families:fire?['golem','spider']:['spider','snow']},stats:{revenue:0},sealBreakCount:seals}},0),want);
}
const final=Game.prototype.makeFinal.call({run:{seed:'boundary-fixed',day:30}});assert.equal(final.day,30);assert.equal(final.family,'final');assert.equal(final.scale,4.6);assert.equal(final.power,DATA.balance.bossPower/3);
console.log('PASS '+profile+' 공통6직업·8일차×5계열×3티어·실제성장·부스트상한·일반위험·마왕전 보존');
