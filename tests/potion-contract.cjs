// 포션 본사 수입의 판매 경계 검사. 런 측정 없음.
const assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),rate=.10;
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require(path.join(root,'dist',f+'.js'));
assert.equal(DATA.relicParams.coldcase.extraOffers,1);assert.equal(DATA.relicParams.coldcase.commissionRate||0,rate);assert.equal(DATA.relicBy.coldcase.price,180);
function check(item,mode,price,accepted=true,other=false){
 const g=new Game();g.autosave=false;g.start('potion-income-boundary');g.buyRelic(g.run.relicWindow.candidateIds[0]);const s=g.run;
 s.facilities=['coldcase',...(other?['rareContract']:[])];s.event={effects:{}};s.phase='sell';s.money=1000;s.stats.revenue=0;
 const n=s.npcs.find(n=>n.id===s.queue[0]);n.pack=[];n.history=[];n.traits=[];n.money=1000;n.loyalty=0;n.refused=[];
 s.inventory=[{id:'unit',item,expires:30,cost:50}];s.daily.commission=0;s.daily.revenue=0;s.daily.sales=0;
 g.interest=()=>({price,debit:price,chance:accepted?1:0,need:'높음',burden:'낮음'});
 const got=g.sell('unit',mode),wanted=accepted?((DATA.itemBy[item].category==='potion'?Math.round(price*rate):0)+(other&&DATA.itemBy[item].rarity>=2?Math.round(price*.10):0)):0;
 assert.equal(got,accepted);assert.equal(n.money,1000-(accepted?price:0),'손님은 원래 결제 금액만');
 assert.equal(s.money,1000+(accepted?price:0)+wanted,'본사 지급은 가게에만');assert.equal(s.daily.commission,wanted);
 assert.equal(s.daily.revenue,accepted?price:0);assert.equal(s.stats.revenue,accepted?price:0,'본사 지급을 매출에 중복하지 않음');
 if(accepted){assert.equal(n.history[0].paid,price);assert.equal(n.history[0].commission,wanted);}else assert.equal(n.history.length,0);
}
check('lowpotion','full',100);check('lowpotion','half',50);check('lowpotion','overcharge',150);check('lowpotion','full',155);
check('water','full',100);check('lowpotion','full',100,false);check('highpotion','full',100,true,true);check('highpotion','full',155,true,true);
console.log('PASS: 포션 '+rate+' 일반 판매·할인·바가지·반올림·거절·비포션·기존 본사수입 합산·손님지출/매출 보존');
