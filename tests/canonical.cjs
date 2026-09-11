// Runtime acceptance evidence; Canonical QA files remain immutable.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation','systems/simulation'])require('../dist/'+f+'.js');
const clone=x=>JSON.parse(JSON.stringify(x));
const originalMorning=Game.prototype.morning,originalBuy=Game.prototype.buyRelic;
let windows=new Map(),days=[],deferredPurchases=0,completed=0;
Game.prototype.morning=function(){
 originalMorning.call(this);
 const s=this.run,w=s.relicWindow;
 days.push(s.day);
 const saved=Save.import(Save.export(this.account,s));
 assert.deepEqual(saved.run.relicWindow,w,'window survives save/load');
 assert.deepEqual(saved.run.dungeons,s.dungeons,'Gate state survives save/load');
 if(windows.has(w.milestoneDay)){
  const prior=windows.get(w.milestoneDay);
  assert.deepEqual(w.candidateIds,prior.candidateIds,'deferred candidates stay fixed');
  assert.deepEqual(w.candidatePrices,prior.candidatePrices,'deferred prices stay fixed');
 }else{
  assert.equal(w.candidateIds.length,3);
  assert.equal(new Set(w.candidateIds).size,3);
  const prior=[...windows.values()].at(-1);
  if(prior)assert.ok(w.candidateIds.every(id=>!prior.candidateIds.includes(id)),'next window cooldown');
  windows.set(w.milestoneDay,clone(w));
 }
 if(s.day===30){
  assert.deepEqual(days,Array.from({length:30},(_,i)=>i+1),'natural daily progression');
  assert.deepEqual([...windows.keys()],[0,5,10,15,20,25,30]);
  assert.ok(w.candidateIds.every(id=>DATA.relicBy[id].finalUseful));
  completed++;
 }
};
Game.prototype.buyRelic=function(id){
 const s=this.run,w=s.relicWindow;
 if(s.phase==='foundation')windows.set(0,clone(w));
 else if(![6,16,26,30].includes(s.day))return; // Player defers; no Day/Gold mutation.
 const before=s.money,cost=w.candidatePrices[w.candidateIds.indexOf(id)];
 originalBuy.call(this,id);
 assert.equal(s.money,before-cost);
 assert.equal(w.purchased,id);
 assert.throws(()=>originalBuy.call(this,id),'second purchase blocked');
 if(w.milestoneDay>0&&s.day>w.milestoneDay)deferredPurchases++;
};
try{
 Debug.simulate(1,'balanced',null,'full','hybrid');
 assert.equal(completed,1,'actual run reaches D30');
 assert.ok(deferredPurchases>0,'deferred purchase exercised');
 console.log('PASS REL-Q01–05 / 07–09 / 13 / 25: natural D0–D30 progression, deferred purchase, expiry, cooldown and Save stability');
}finally{Game.prototype.morning=originalMorning;Game.prototype.buyRelic=originalBuy;}
