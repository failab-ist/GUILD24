const assert=require('node:assert/strict');for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
const D=globalThis.DATA,near=(a,b,m)=>assert.ok(Math.abs(a-b)<1e-9,m+' '+a+' vs '+b);
/* META §ASCENSION: the ten levels stack, and level 0 is the unchanged game */
assert.equal(D.ascension.length,10);assert.deepEqual(D.ascension.map(a=>a.id),[1,2,3,4,5,6,7,8,9,10]);
const zero=D.ascent(0);for(const k in zero)assert.equal(zero[k],0,'level 0 changes nothing: '+k);
near(D.ascent(1).foe,.01,'1');near(D.ascent(5).foe,.02,'5');near(D.ascent(9).foe,.03,'9');near(D.ascent(10).foe,.03,'10 foe');
near(D.ascent(10).boss,.05,'boss');assert.equal(D.ascent(10).hazard,2);near(D.ascent(10).op,.10,'op');assert.equal(D.ascent(10).offers,-2);
assert.equal(D.ascent(10).relics,-1);assert.equal(D.ascent(10).reroll,50);assert.equal(D.ascent(10).warehouse,-3);near(D.ascent(10).wallet,-.05,'wallet');
assert.deepEqual(D.ascent(99),D.ascent(10),'a level past the top reads as the top');assert.deepEqual(D.ascent(undefined),zero);
/* each level adds only its own effect on top of the one before (levels 1 / 5 / 9 / 10 move the power, the others do not) */
assert.equal(D.ascent(2).foe,D.ascent(1).foe);assert.equal(D.ascent(6).foe,D.ascent(5).foe);assert.equal(D.ascent(3).op,D.ascent(2).op);

/* the account: nothing is open until the first Boss clear; the pick never passes what is open */
{const a=Meta.fresh();assert.deepEqual(a.ascension,{max:0,pick:0});assert.equal(Meta.setAscension(a,5),0);
 a.ascension.max=3;assert.equal(Meta.setAscension(a,5),3);assert.equal(Meta.setAscension(a,2),2);assert.equal(Meta.ascensionPick(a),2);assert.ok(Save.valid(JSON.parse(Save.export(a,null))),'a fresh account with an open level is a valid save');
 const old=Meta.fresh();delete old.ascension;old.wins=1;Meta.seedAscension(old);assert.equal(old.ascension.max,1,'an account that already won opens 승천 1');
 const none=Meta.fresh();delete none.ascension;Meta.seedAscension(none);assert.equal(none.ascension.max,0);}
{const bad=Meta.fresh();bad.ascension={max:2,pick:5};assert.equal(Save.valid(JSON.parse(Save.export(bad,null))),false,'a pick past the open level is refused');}
/* clearing 승천 N opens N+1; a failure and a lower level open nothing; the top stays 10 */
function clearAt(level,max,win=true){const g=new Game();g.autosave=false;g.account.ascension={max,pick:Math.min(level,max)};g.start('asc-'+level+'-'+max);assert.equal(g.run.ascension,Math.min(level,max));
 g.run.finalReport={members:[{job:'warrior'}]};Meta.finish(g.account,g.run,win);return g;}
assert.equal(clearAt(0,0).account.ascension.max,1);assert.equal(clearAt(1,1).account.ascension.max,2);assert.equal(clearAt(3,5).account.ascension.max,5);
assert.equal(clearAt(10,10).account.ascension.max,10);assert.equal(clearAt(2,2,false).account.ascension.max,2);assert.equal(clearAt(0,0).run.ascensionOpened,1);assert.equal(clearAt(3,5).run.ascensionOpened,0);

/* the Run freezes its level at start and the effects read it */
function at(level,seed='asc-fx'){const g=new Game();g.autosave=false;g.account.ascension={max:10,pick:level};g.start(seed);return g;}
{const base=at(0),hi=at(10);assert.equal(base.capacity()-hi.capacity(),3,'승천 8: warehouse -3');
 assert.equal(base.run.relicWindow.candidateIds.length,3);assert.equal(at(6).run.relicWindow.candidateIds.length,2,'승천 6: one Store Support candidate fewer');assert.equal(at(5).run.relicWindow.candidateIds.length,3);
 assert.equal(base.rerollPrice(),50);assert.equal(at(6).rerollPrice(),50);assert.equal(at(7).rerollPrice(),100,'승천 7: ORDER reroll +50G');
 const card=()=>D.relics.find(r=>r.id==='rerollTicket').description;at(6);assert.ok(card().includes('50G → 100G'));at(7);assert.ok(card().includes('100G → 200G'),'승천 7: the 발주 교환권 card names the 100G base');at(0);
 base.run.day=12;const g2=at(2);g2.run.day=12;{const x=base.expectedOperatingCost(),y=g2.expectedOperatingCost();assert.ok(y>x&&Math.abs(y-x*1.1)<=10,'승천 2: operating cost x1.1 ('+x+' -> '+y+')');}
 const g1=at(1);g1.run.day=12;const a=base.makeDungeon('spider',1).power,b=g1.makeDungeon('spider',1).power;near(b/a,1.01,'승천 1: Gate x1.01');
 const g10=at(10);assert.equal(g10.makeFinal().threat,30);assert.equal(base.makeFinal().threat,28,'승천 10: Final Hazard Threat +2');
 const bp=g=>{g.run.bossId='WRATH';g.run.final=g.makeFinal();return g.effectiveBossPower(0,null);};near(bp(g10)/bp(base),1.03*1.05,'승천 10: Boss power x1.03 x1.05');near(bp(at(1))/bp(base),1.01,'승천 1: Boss x1.02');
 {const n={level:10},r={int:(lo,hi)=>hi},x=base.visitIncome(n,r),y=at(4).visitIncome(n,r);assert.equal(x,110);assert.equal(y,Math.round(110*.95),'승천 4: wallet income -5%');assert.equal(at(3).visitIncome(n,r),110);}
 const og=n=>{const g=at(n);g.run.phase='order';g.generateOffers({advancePity:false});return g.run.offers.length;};assert.equal(og(0),6);assert.equal(og(3),4,'승천 3: ORDER offers 6 -> 4');}
console.log('PASS ascension: levels stack, unlock on clear, effects at each level, level 0 unchanged');
