// 포션 계약의 실제 발주 생성·리롤 경계 검사. 런 진행 측정 없음.
const assert=require('node:assert/strict'),path=require('node:path');
const root=process.argv[2],slots=+process.argv[3];
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(root,'dist',f+'.js'));
assert.equal(DATA.relicParams.coldcase.extraOffers,slots);assert.equal(DATA.relicParams.coldcase.commissionRate,undefined);
assert.equal(DATA.relicBy.coldcase.name,'전문 포션 유통 계약');assert.equal(DATA.relicBy.coldcase.price,180);
const g=new Game();g.autosave=false;g.start('potion-contract-boundary');g.buyRelic(g.run.relicWindow.candidateIds[0]);g.beginOrder();
const s=g.run;s.facilities=[];s.money=5000;s.cart={};const offers=JSON.stringify(s.offers),before=s.offers.length;
s.facilities.push('coldcase');g.appendSupportOffers('coldcase',true);
assert.equal(s.offers.length,before+slots);assert.equal(JSON.stringify(s.offers.slice(0,before)),offers,'기존 발주 유지');
assert.ok(s.offers.filter(o=>o.origin==='coldcase').every(o=>DATA.itemBy[o.item].category==='potion'));
for(let i=0;i<2;i++){g.reroll();assert.equal(s.offers.filter(o=>o.origin==='coldcase').length,slots);assert.ok(s.offers.filter(o=>o.origin==='coldcase').every(o=>DATA.itemBy[o.item].category==='potion'));}
s.facilities=['dawnRecovery','coldcase','extraOrder'];g.generateOffers();assert.equal(s.offers.filter(o=>o.origin==='coldcase').length,slots);assert.equal(s.offers.filter(o=>o.origin==='dawnRecovery').length,1);
assert.equal(s.offers.length,DATA.balance.orderOffers+2+1+slots+(s.event?.effects.offers||0)+(s.event?.effects.blackmarket?1:0));
console.log('PASS: 포션 계약 '+slots+'칸, 기존 발주 보존·리롤·다른 추가 칸과 공존, 판매 추가수입 없음');
