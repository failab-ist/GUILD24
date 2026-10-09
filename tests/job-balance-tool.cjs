// 도구 검증만 한다: 확률 측정/Debug.simulate/궤적 실행 없음. 고정된 원정 1건은 판정 연결 회귀 검사다.
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),os=require('node:os');
const T=require('../tools/measure-jobs.cjs'),G=T.load(path.resolve(__dirname,'..')),D=G.DATA;
const o=T.options([]),source=T.current(G),candidate=T.profile(G,require('../tools/job-balance-candidate.json'));
const before=JSON.stringify(D),refs=D.jobs.map(j=>[j.stats,j.growth]);
for(const [id,want] of Object.entries({
 warrior:{stats:[17,18,9,10],growth:[2.8,3,1.5,1.6]},
 archer:{stats:[13,12,21,10],growth:[2.3,2.1,3.4,1.6]},
 mage:{stats:[18,9,10,17],growth:[3.1,1.6,1.8,2.7]},
 priest:{stats:[10,16,9,20],growth:[2.2,2.7,1.6,3]},
 rogue:{stats:[17,10,19,9],growth:[3,1.8,3,1.5]},
 berserker:{stats:[21,15,13,7],growth:[3.6,2.5,2,1.3]}
}))assert.deepEqual(source.jobs[id],want,'승인 직업 Source '+id);
assert.deepEqual(candidate.jobs.warrior.growth,[2.8,3,1.5,1.6]);
assert.deepEqual(candidate.jobs.archer,{stats:[13,12,21,10],growth:[2.3,2.1,3.4,1.6]});
assert.deepEqual(candidate.jobs.rogue,{stats:[17,10,19,9],growth:[3,1.8,3,1.5]});
assert.deepEqual(candidate.jobs.berserker,{stats:[21,15,13,7],growth:[3.6,2.5,2,1.3]});
assert.deepEqual(candidate.jobs.mage,source.jobs.mage,'미변경 직업은 현재 Source를 상속한다');
for(const jobs of [{unknown:{stats:[1,1,1,1],growth:[1,1,1,1]}},{constructor:{stats:[1,1,1,1],growth:[1,1,1,1]}},{archer:{stats:[1,1,1,NaN],growth:[1,1,1,1]}},{archer:{stats:[1,1,1,1],growth:[1,1,1,1],bonus:1}}])assert.throws(()=>T.profile(G,{name:'bad',jobs}));
assert.throws(()=>T.profile(G,{name:'bad',jobs:{},bossPower:1}));
assert.throws(()=>T.withProfile(G,candidate,()=>{throw Error('정상 복구 확인');}),/복구/);
assert.equal(JSON.stringify(D),before);D.jobs.forEach((j,i)=>{assert.equal(j.stats,refs[i][0]);assert.equal(j.growth,refs[i][1]);});
const stats=T.statRows(G,candidate,o),find=(id,level)=>stats.find(r=>r.job===id&&r.level===level),close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,a+' != '+b);
assert.equal(stats.length,30);close(find('warrior',20).power,76.383);close(find('archer',1).power,18.11);close(find('archer',20).power,76.383);
close(find('rogue',1).power,18.76);close(find('rogue',20).power,79.579);close(find('archer',20).powerGrowth,3.067);
assert.equal(Object.keys(find('archer',20).defense).length,9);close(find('archer',20).defense.bind.value,85.6/3);
close(find('archer',20).defense.poison.value,51.9/3);close(find('archer',20).defense.fire.value,40.4/3);
for(const r of stats)close(r.power,find(r.job,1).power+(r.level-1)*r.powerGrowth);
const n=T.actor(G,'archer',20,o),d=T.gate(G,4,'slime',1);
assert.equal(d.day,4);assert.equal(d.tier,1);assert.equal(d.family,'slime');close(d.power,(21+.25+4*1.45)*.9);
assert.deepEqual(T.choosePack(G,n,d,'none',0),[]);assert.deepEqual(T.choosePack(G,n,d,'same',0),[]);
const affordable=T.choosePack(G,n,d,'budget',o.budget);assert.ok(affordable.length<=2);assert.ok(affordable.reduce((v,id)=>v+D.itemBy[id].buy,0)<=o.budget);
assert.equal(JSON.stringify(n),JSON.stringify(T.actor(G,'archer',20,o)),'보급 선택은 원정 상태를 바꾸지 않는다');
const fixed={next:()=>.99,int:a=>a},rep=G.Dungeon.resolve(n,d,fixed,[],undefined,0);
assert.equal(rep.outcome,'성공');assert.equal(rep.combatWon,true);assert.equal(rep.environmentHurt,false);assert.equal(n.records.length,1);assert.equal(n.level,20);
const m=T.counter();T.add(m,rep,0);assert.equal(T.finish(m).successRate,1);assert.equal(T.finish(T.counter()).deathRate,null);
const recovering=T.actor(G,'warrior',3,o);recovering.injury=2;recovering.recovery=2;recovering.fatigue=19;
T.resetMorning(G,recovering,5);assert.equal(recovering.recovery,1);assert.equal(recovering.fatigue,19);assert.equal(recovering.level,3);
T.resetMorning(G,recovering,6);assert.equal(recovering.recovery,0);assert.equal(recovering.injury,0);assert.equal(recovering.fatigue,19);
const saved={create:G.Adventurer.create,unlocked:G.Meta.jobUnlocked,mastery:G.Meta.jobMastery,start:G.Game.prototype.start,open:G.Game.prototype.open,end:G.Game.prototype.end};
assert.throws(()=>T.runArm(G,candidate,{...o,runs:1},'reader','archer',()=>{throw Error('가짜 봇 실패');}),/가짜 봇/);
assert.equal(G.Adventurer.create,saved.create);assert.equal(G.Meta.jobUnlocked,saved.unlocked);assert.equal(G.Meta.jobMastery,saved.mastery);assert.equal(G.Game.prototype.end,saved.end);
const fakeRng={next:()=>.5,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()};
const arm=T.runArm(G,candidate,{...o,runs:1},'reader','archer',(count,policy,account,pricing,build,opts)=>{
 assert.equal(count,1);assert.equal(policy,'reader');assert.equal(pricing,'adaptive');assert.equal(build,'hybrid');assert.ok(opts.relicAware);
 assert.equal(G.Meta.jobUnlocked(null,D.jobBy.berserker),true);assert.equal(G.Meta.jobMastery(null,'archer'),0);
 const npc=G.Adventurer.create(fakeRng,1,1,G.Meta.fresh());assert.equal(npc.job,'archer');assert.deepEqual(npc.stats,{combat:13,survival:12,mobility:21,spirit:10});
 assert.deepEqual(npc.traits,[]);assert.equal(npc.potential,1);assert.equal(npc.rarity,0);
 const s={seed:'fixture',phase:'end',day:1,npcs:[npc],stats:{deaths:0},dungeons:[],win:false};
 G.Game.prototype.end.call({run:s});G.Game.prototype.end.call({run:s});
 return {runs:1,reached30:0,wins:0,deaths:0,averageDay:1};
});
assert.equal(arm.rows.length,1,'동일 런을 이중 집계하지 않는다');assert.equal(JSON.stringify(D),before);
assert.equal(G.Game.prototype.start,saved.start);assert.equal(G.Game.prototype.open,saved.open);assert.equal(G.Adventurer.create,saved.create);
// 실제 확률 엔진 대신 고정 결과를 넣어 루프·누적·사망 종료의 분모를 검증한다.
const realResolve=G.Dungeon.resolve,realRng=G.RNG;
try{
 G.RNG=class {next(){return .5;}int(a){return a;}pick(a){return a[0];}weighted(a){return a[0];}};
 G.Dungeon.resolve=(npc,dungeon)=>{
  const dead=dungeon.day===5,severe=dungeon.day===1;const xp=dead?0:26;
  G.Adventurer.grow(npc,xp,{next(){throw Error('성장 RNG 없음');}});
  if(dead)npc.alive=false;if(severe){npc.injury=2;npc.recovery=2;}else npc.injury=0;
  const report={day:dungeon.day,outcome:dead?'사망':severe?'중상':'성공',combatWon:!dead,environmentHurt:false,departedInjured:false,xp,loot:0,greatMargin:.25};
  npc.records.push(report);npc.pack=[];return report;
 };
 const controlled=T.expeditions(G,candidate,{...o,samples:1});assert.equal(controlled.length,720);assert.ok(controlled.every(x=>x.n===1));
 const chains=T.growth(G,candidate,{...o,samples:1});assert.equal(chains.length,18);
 assert.ok(chains.every(x=>x.n===4&&x.restDays===1&&x.level===3&&!x.alive),'성장 유지·중상 휴식·사망 뒤 교체 없음');
 assert.ok(chains.every(x=>x.snapshots.at(-1).day===5&&x.deaths===1));
 assert.ok(chains.every(x=>x.bands.reduce((s,b)=>s+b.n,0)===x.n),'구간과 전체 분모 보존');
}finally{G.Dungeon.resolve=realResolve;G.RNG=realRng;}
assert.equal(JSON.stringify(D),before);
for(const args of [['--mode','runs'],['--mode','all','--execute'],['--samples','0'],['--budget','-1'],['--policies','balanced'],['--policies','reader,reader'],['--wat'],['--mode','oops'],['--rarity','9'],['--potential','NaN'],['--seed',' '],['--out',path.resolve(__dirname,'../dist/blocked.json')]])assert.throws(()=>T.options(args));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'guild24-job-tool-'));try{const out=path.join(tmp,'existing.json');fs.writeFileSync(out,'fixture');assert.throws(()=>T.options(['--out',out]),/덮어쓰지/);}finally{fs.unlinkSync(path.join(tmp,'existing.json'));fs.rmdirSync(tmp);}
const plan=T.planned(o);assert.equal(plan.independentResolutions,144000);assert.equal(plan.growthTrajectories,3600);assert.equal(plan.fullRuns,2800);assert.equal(plan.estimatedSeconds,null);
assert.ok(T.markdown({mode:'stats',head:'fixture',stats,plan,profiles:[source,candidate]}).includes('전력 성장'));
console.log('PASS 직업 후보·공식·9종 대응·예산·원정 연결·회복·훅 복구·중복 집계·측정 차단');
