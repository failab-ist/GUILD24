// One rule, one place: support order price, Potion identity and support 등급 / unlock tables.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
function fresh(seed='dedupe'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
function acquire(g,id){const s=g.run,w=s.relicWindow;w.purchased=false;w.consumedBySealBreak=false;w.candidateIds=[id];s.money=99999;g.buyRelic(id);}

test('24시간 신선체계 + 원정 도시락 코너: the order price is one Round whichever support came first',()=>{
 const lunch=DATA.itemBy.lunchbox;
 for(const first of [['fresh24','expeditionMeal'],['expeditionMeal','fresh24']]){
  const g=fresh();g.beginOrder();const s=g.run;s.facilities=s.facilities.filter(f=>f!=='fresh24'&&f!=='expeditionMeal');s.event=null;
  s.offers=[g.offerFor(lunch),g.offerFor(DATA.itemBy.water)];
  assert.equal(s.offers[0].price,lunch.buy);
  for(const id of first)acquire(g,id);
  assert.equal(s.offers[0].price,Math.round(lunch.buy*1.15*1.15),'repriced offer: '+first.join('+'));
  assert.equal(g.offerFor(lunch).price,s.offers[0].price,'a fresh offer prices the same');
  assert.equal(lunch.buy,90);assert.equal(s.offers[0].price,119);
 }
});

test('Potion identity is the category: every Potion reacts to the same events',()=>{
 const potions=DATA.items.filter(i=>i.category==='potion').map(i=>i.id).sort();
 assert.deepEqual(potions,['highpotion','lowpotion','midpotion','toppotion']);
 for(const it of DATA.items)assert.ok(!('potion' in it.effects),it.id+' carries a duplicate potion marker');
 const g=fresh();g.beginOrder();g.run.event={effects:{potionWeight:1e9}};
 const picks=new Set();for(let i=0;i<40;i++)picks.add(DATA.itemBy[g.rollOffer(0).item].category);
 assert.ok(picks.has('potion'),'potionWeight reaches every Potion by category');
});

test('점포지원 등급: every support is named in exactly one 등급 list, every 영웅 has a way to unlock',()=>{
 const epics=DATA.relics.filter(r=>r.rarity===3).map(r=>r.id);
 assert.equal(epics.length,7);
 const pools=[].concat(...Object.values(DATA.relicEpicPools),DATA.relicEpicStart);
 for(const id of epics)assert.ok(pools.includes(id),id+' has no 영웅 unlock path');
 for(const id of pools)assert.ok(DATA.relicBy[id]&&DATA.relicBy[id].rarity===3,id+' unlock list holds a non-영웅 or unknown id');
 for(const id of [...DATA.relicRareStart])assert.ok(DATA.relicBy[id].rarity===2,id+' rare start list');
});

test('장식 이미지: every Decoration has its picture file, and the picture list is built from the Decoration list',()=>{
 const fs=require('node:fs'),path=require('node:path');
 globalThis.document??=undefined;
 for(const d of DATA.decorations)assert.ok(fs.existsSync(path.join(__dirname,'../dist/ui/assets/deco/'+d.id+'.svg')),d.id+' has no picture file');
 assert.match(fs.readFileSync(path.join(__dirname,'../dist/ui/scene.js'),'utf8'),/DECO_IDS=G\.DATA\.decorations\.map/);
});

test('설명 숫자: 「기존」 values and 구급품 진열장 conditions are read from the rule, not typed twice',()=>{
 const P=DATA.decorationParams,card=id=>DATA.decorations.find(d=>d.id===id).effect,Dungeon=globalThis.Dungeon||GUILD24.Dungeon;
 const saved={f:Dungeon.PREPARED.factor,m:Dungeon.PREPARED.maxFatigue,n:Dungeon.PREPARED.minItems};
 Dungeon.PREPARED.factor=.7;Dungeon.PREPARED.maxFatigue=15;Dungeon.PREPARED.minItems=3;
 const text=card('aidCabinet');Object.assign(Dungeon.PREPARED,{factor:saved.f,maxFatigue:saved.m,minItems:saved.n});
 assert.ok(text.includes('피로 15 미만')&&text.includes('상품 3개')&&text.includes('기존 30%'),text);
 const b=P.honorFrame.baseWeights.slice();P.honorFrame.baseWeights[0]=50;
 const t2=card('honorFrame');P.honorFrame.baseWeights[0]=b[0];assert.ok(t2.includes('기존 50%'),t2);
 const fs0=DATA.relicParams.fieldStretcher.baseInjuredCombatPenalty;DATA.relicParams.fieldStretcher.baseInjuredCombatPenalty=.2;
 const d2=DATA.relicBy.fieldStretcher.description;DATA.relicParams.fieldStretcher.baseInjuredCombatPenalty=fs0;assert.ok(d2.includes('기존 20%'),d2);
 assert.equal(Dungeon.injuryPenaltyFor([]),fs0);
});

test('상품 해금: every gated Item names its rule in one place, and a Run day gate stays apart from the account unlock',()=>{
 const Meta=globalThis.Meta||GUILD24.Meta,rules={};
 for(const it of DATA.items){const r=Meta.itemUnlockRule(it);if(r)rules[it.id]=r.kind;}
 assert.deepEqual(rules,{coupon:'boss',guildlunch:'seenDay',worldcharm:'seenDay',highpotion:'reach',toppotion:'reach'});
 const lunch=DATA.itemBy.guildlunch,a={unlocks:{}};
 assert.equal(Meta.itemUnlocked(a,lunch,30),false,'not opened on the account');
 a.unlocks.guildlunch=true;
 assert.equal(Meta.itemUnlocked(a,lunch,9),false,'opened, but this Run has not reached D10');
 assert.equal(Meta.itemUnlocked(a,lunch,10),true);
 assert.equal(Meta.itemUnlocked({unlocks:{}},DATA.itemBy.rice,1),true);
 assert.equal(Meta.itemUnlocked({unlocks:{highpotion:true}},DATA.itemBy.highpotion,1),true,'a reach unlock has no Run day gate');
});

test('결과 문장: the Item name in a result line is read from the Item, and an insurance Item is told by its category',()=>{
 const fs=require('node:fs'),src=fs.readFileSync(require('node:path').join(__dirname,'../dist/systems/dungeon.js'),'utf8');
 for(const n of ['귀환석이','세계수 생환부적이','구급키트가'])assert.ok(!src.includes(n),n+' is typed into a result line');
 const shop=fs.readFileSync(require('node:path').join(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(!/it\.effects\.escape\|\|it\.effects\.revive/.test(shop),'납품 인증 reads the category');
 assert.ok(/it\.category==='insurance'/.test(shop));
});

test('최종 보급: the receipt carries the same trade facts as an ordinary sale, per stock',()=>{
 const g=fresh('final-receipt');const s=g.run;
 s.phase='final';s.finalCommitted=true;
 const npc=s.npcs.find(n=>n.alive)||s.npcs[0];s.team=[npc.id];npc.pack=[];npc.money=200;
 s.inventory=[{id:9001,item:'rice',cost:27,expires:null},{id:9002,item:'rice',cost:31,expires:null},{id:9003,item:'rice',expires:null,costUnknown:true}];
 const price=g.finalPrice('rice');
 for(const [id,cost,unknown,wallet] of [[9001,27,false,200],[9002,31,false,200-price],[9003,undefined,true,200-2*price]]){
  npc.pack=[];g.supplyFinal(npc.id,id);const r=npc.history.at(-1);
  assert.deepEqual([r.day,r.item,r.mode,r.paid,r.wallet,r.cost,r.costUnknown],[30,'rice','half',price,wallet,cost,unknown],'stock '+id);
 }
 assert.equal(npc.money,200-3*price);assert.equal(s.inventory.length,0);
});

test('발주 검증: 자금 부족, 창고 초과, 행사 수량 제한은 그대로 거부한다',()=>{
 const g=fresh('cart');g.beginOrder();const s=g.run;
 s.money=1e6;assert.equal(g.validateCart({}),true);
 assert.throws(()=>g.validateCart({0:s.offers[0].quantity+1}),/수량/);
 s.money=0;assert.throws(()=>g.validateCart({0:1}),/자금/);
 s.money=1e6;s.inventory=Array.from({length:g.capacity()},(_,i)=>({id:i,item:'rice'}));
 assert.throws(()=>g.validateCart({0:1}),/창고/);
});

test('데이터 위치: 특성 충돌·던전 위험·상품 분류는 상품·특성·던전 쪽 파일이 갖고, 상품 정의는 이름 붙은 항목이다',()=>{
 const fs=require('node:fs'),path=require('node:path');
 const rel=fs.readFileSync(path.join(__dirname,'../dist/data/relics.js'),'utf8'),cat=fs.readFileSync(path.join(__dirname,'../dist/data/catalog.js'),'utf8');
 for(const k of ['traitExclusions','familyTiers','categories','roles'])assert.ok(!new RegExp('D\\.'+k+'=').test(rel)&&cat.includes('G.DATA.'+k+'='),k+' lives in catalog.js');
 assert.ok(!/^item\('/m.test(cat),'no positional item() call is left');
 assert.equal(DATA.items.length,44);
 for(const it of DATA.items)assert.deepEqual(Object.keys(it),['id','name','rarity','buy','sell','category','days','icon','brand','description','effects','roles','metaUnlock'],it.id);
});

console.log(count+' dedupe tests passed');
