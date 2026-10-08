// 제공 세이브 읽기 + 저장된 종료 상태 평가. 게임 진행/시뮬레이션 없음.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const repo=path.resolve(__dirname,'../../..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(repo,'dist',f+'.js'));
const files={old:process.env.GUILD24_OLD_SAVE||'C:/Users/necro/Downloads/guild24-save-day-30_1005.json',dev:process.env.GUILD24_DEV_SAVE||'C:/Users/necro/Downloads/guild24-save-day-30_dev.json'},out={};
for(const [key,file] of Object.entries(files)){
 const text=fs.readFileSync(file,'utf8'),saved=Save.import(text),s=saved.run,a=saved.account,g=new Game(a,s);g.autosave=false;
 for(const m of s.finalReport.members)s.npcs.find(n=>n.id===m.npcId).pack=m.items.slice();
 const v=g.finalPreRoll();assert.equal(v.power,s.bossDebug.power,key+' saved power');assert.equal(v.bossPower,s.bossDebug.bossPower,key+' saved requirement');
 const records=s.npcs.flatMap(n=>(n.records||[]).filter(r=>!r.deep&&r.day<30));
 const chance=(power,boss)=>Math.max(0,Math.min(1,(DATA.balance.finalRoll.hi-boss/power)/(DATA.balance.finalRoll.hi-DATA.balance.finalRoll.lo)));
 out[key]={file,sha256:crypto.createHash('sha256').update(text).digest('hex'),firstRun:!!s.firstRun,runs:a.runs,wins:a.wins,ownedDecorations:a.store.owned,loadout:s.loadout,settlement:s.settlement,accountClearCells:Object.entries(a.matrix).flatMap(([job,cell])=>Object.entries(cell).filter(([,win])=>win).map(([boss])=>({job,boss}))),
  boss:s.bossId,win:s.win,firstRunLessons:{injured:s.lessonInjured,kitDay:s.lessonKitDay,payday:s.lessonPayday,day3:s.lessonDay3},facilities:s.facilities,
  ordinary:{n:records.length,success:records.filter(r=>['대성공','성공'].includes(r.outcome)).length,great:records.filter(r=>r.outcome==='대성공').length,deaths:s.stats.deaths,deathLimit:Meta.deathLimit(s),d10Deaths:records.filter(r=>r.day<=10&&r.outcome==='사망').length,bands:[[1,7],[8,14],[15,21],[22,29]].map(([lo,hi])=>{const rows=records.filter(r=>r.day>=lo&&r.day<=hi);return {days:[lo,hi],n:rows.length,success:rows.filter(r=>['성공','대성공'].includes(r.outcome)).length};})},
  final:{power:v.power,bossPower:v.bossPower,roll:s.bossDebug.roll,assault:s.bossDebug.assault,minAssault:v.power*DATA.balance.finalRoll.lo,maxAssault:v.power*DATA.balance.finalRoll.hi,chance:chance(v.power,v.bossPower),bossOnly90Percent:{bossPower:v.bossPower*.9,chance:chance(v.power,v.bossPower*.9)},members:v.team.map((n,i)=>({name:n.name,job:n.job,level:n.level,rarity:n.rarity,potential:n.potential,loyalty:n.loyalty,equipment:n.equipment,items:n.pack.map(id=>({id,name:DATA.itemBy[id].name})),meanHazardGap:v.preparations[i].hazards.reduce((a,h)=>a+h.gap,0)/v.preparations[i].hazards.length}))},
  xpCandidateFields:s.npcs.filter(n=>Object.keys(n).some(k=>k.startsWith('_rv'))).length};
}
assert.equal(out.dev.runs,1);assert.equal(out.dev.wins,1);assert.equal(out.dev.ownedDecorations.length,0);assert.equal(out.dev.settlement.capitalAfter,out.dev.settlement.gain);assert.equal(out.dev.firstRun,true);
fs.writeFileSync(path.join(__dirname,'comparison.json'),JSON.stringify(out,null,2));
console.log('PASS: 제공 세이브 종료 전력·요구 전력 일치, 최초 계정 증거 확인. 재생 없음.');
