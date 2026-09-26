// Chunk A acceptance: canonical Hazard vocabulary, ACTIVE ITEM CATALOG and Supply Burden.
// Covers DUN-Q01/Q04/Q17/Q18/Q19, ITEM-Q09/Q17/Q19, ITEM-Q02/Q03/Q11, SIM-Q01.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

const CANON_HAZARDS=['poison','bind','corrosion','mire','fire','fear','dark','cold','whiteout'];
const LEGACY=['thirst','caffeine','alcohol','long','wet','armor','undead','slow','food'];
const CATALOG=['삼각김밥','생수','컵라면','간단 도시락','초코바','캔커피','진정 허브티','하급 포션','얼음컵','랜턴 건전지','경량 로프','집중 사탕','불룡볶음면','에너지드링크','용사의 곡주','구급키트','방진마스크','핫팩','방수망토','부식 방지 코팅제','원정용 장화','설원 고글','상급 포션','농축 해독제','귀환석','중급 포션','길드 특제 도시락','쿨링 이온음료','세계수 생환부적','황금 1+1 쿠폰','거미줄 방호세트','연금 방수슈트','성화 랜턴','백설 방한고글','마그마 냉각장비','영웅 결전 도시락','왕도 천연암반수','초고속 에너지드링크','대현자 허브엘릭서','최상급 포션'];

test('DUN-Q04/Q19: exactly the 9 canonical Hazards, mire present, slow absent',()=>{
 assert.deepEqual(Object.keys(DATA.hazards).sort(),[...CANON_HAZARDS].sort());
 assert.ok('mire' in DATA.hazards&&!('slow' in DATA.hazards));
 for(const [id,tiers] of Object.entries(DATA.familyTiers))for(const t of tiers)for(const h of t)assert.ok(CANON_HAZARDS.includes(h),id+' uses noncanonical hazard '+h);
 assert.deepEqual(DATA.familyTiers.fire,[['fire'],['fire'],['fire']],'FIRE second axis is Combat Power, not a Hazard');
});

test('DUN-Q19/ITEM-Q17: no legacy resolution key survives on any active Item',()=>{
 for(const it of DATA.items)for(const k of Object.keys(it.effects))assert.ok(!LEGACY.includes(k),it.id+' carries legacy key '+k);
 for(const d of Object.values(DATA.dungeonBy))for(const h of d.hazards)assert.ok(CANON_HAZARDS.includes(h),d.id+' hazard '+h);
});

test('ITEM-Q71: ACTIVE CATALOG is exactly the canonical 40',()=>{
 assert.equal(DATA.items.length,40);
 assert.ok(!DATA.itemBy.bandage&&!DATA.itemBy.mana,'붕대 and 마석 보조배터리 are retired, not renamed');
 assert.deepEqual(DATA.items.map(i=>i.name),CATALOG);
 assert.equal(new Set(DATA.items.map(i=>i.id)).size,40);
 /* ITEM_v2.8 §ACTIVE RARITY DISTRIBUTION - EXACT. The `bar` repurpose is Uncommon, so the
    active 40 are C11 / U12 / R5 / E11 / L1 and no other Item moves to restore the old counts. */
 assert.deepEqual([0,1,2,3,4].map(v=>DATA.items.filter(i=>i.rarity===v).length),[11,12,5,11,1],
  'active Rarity distribution is the approved C11/U12/R5/E11/L1');
 /* ITEM §DIRECTOR DOCUMENT BASELINE - the six rebaselined active identities, to the digit
    (v2.9.1 balance, User 2026-09-25: Sell = Buy x 2 for every Item; bar/premium buy+effects rose;
    shelf lives from ITEM §SHELF LIFE — EXACT are unchanged). */
 for(const [id,name,rarity,buy,sell,category,days,fx] of [
  ['rice','삼각김밥',0,35,70,'food',2,{survival:6,supply:5}],
  ['water','생수',0,40,80,'drink',2,{survival:10,supply:2}],
  ['bar','간단 도시락',1,100,200,'food',2,{survival:12,supply:6,loot:0.2}],
  ['premium','길드 특제 도시락',2,185,370,'food',2,{survival:16,supply:7,loot:0.4}],
  ['battlelunch','영웅 결전 도시락',3,210,420,'food',2,{survival:18,supply:9}],
  ['herobar','왕도 천연암반수',3,185,370,'drink',3,{survival:24,supply:2}]]){ // 강인함 20 -> 24 (User 2026-09-26, v2.9.6 Epic Drink +4)
  const it=DATA.itemBy[id];
  assert.deepEqual([it.name,it.rarity,it.buy,it.sell,it.category,it.days],[name,rarity,buy,sell,category,days],id+' matches the v2.8 baseline row');
  assert.deepEqual(it.effects,fx,id+' effects match the v2.8 baseline row');
 }
 assert.ok(!DATA.items.some(i=>i.fresh!==undefined),'no active Item carries the retired fresh property');
 /* ITEM_v2.7 §PLAYER-FACING CATEGORY: exactly these six. `medical`, `tool`, `magic` and the
    `fresh` alias are gone. */
 assert.deepEqual([...new Set(DATA.items.map(i=>i.category))].sort(),['drink','food','gear','insurance','potion','special']);
 assert.equal(DATA.items.filter(i=>i.rarity===3).length,11,'ten new Epics plus 세계수 생환부적');
});

test('ITEM-Q02/Q03: every Item declares canonical roles and every effect is presentable',()=>{
 // ITEM_v2.7 §INSURANCE HIERARCHY: Aftercare reads as a utility line, not a magnitude.
 const util=new Set(['potion','revive','duplicate','aftercare']);
 for(const it of DATA.items){
  assert.ok(it.roles&&it.roles.length,it.id+' has no functional role');
  for(const r of it.roles)assert.ok(r in DATA.roles,it.id+' unknown role '+r);
  for(const k of Object.keys(it.effects))assert.ok(k in Presentation.labels||util.has(k),it.id+' effect '+k+' is not player-readable');
 }
});

test('ITEM §SHELF LIFE — EXACT (v2.9.0 F4): every Item expires, 2~5 days, to the digit',()=>{
 const shelf={rice:2,ramen:3,bar:2,choco:2,candy:4,lava:3,premium:2,battlelunch:2,water:2,coffee:2,herbtea:2,ice:3,energy:3,wine:4,ion:5,herobar:3,hyperenergy:3,sageelixir:3,
  potion:3,midpotion:4,highpotion:5,toppotion:5,battery:3,rope:3,mask:4,heat:4,cloak:4,coating:4,boots:4,snowgoggles:4,antidote:5,spiderkit:5,slimesuit:5,cryptlantern:5,snowvisor:5,magmagear:5,kit:4,stone:4,tree:5,coupon:5};
 assert.equal(Object.keys(shelf).length,40);
 for(const it of DATA.items){assert.equal(it.days,shelf[it.id],it.id+' shelf life');assert.ok(it.days>=2&&it.days<=5,it.id+' within 2~5 days');}
 // the redistributed Fatigue recovery (ITEM §SUPPLY MODEL contract) and the two price / Stat moves
 // (v2.9.1 balance, User 2026-09-25: rice/ramen/bar/premium/lava Supply each +1)
 const supply={rice:5,ramen:3,bar:6,choco:3,candy:2,lava:3,premium:7,battlelunch:9,water:2,coffee:2,herbtea:2,ice:1,energy:2,wine:1,ion:1,herobar:2,hyperenergy:2,sageelixir:2};
 for(const [id,v] of Object.entries(supply))assert.equal(DATA.itemBy[id].effects.supply,v,id+' 피로 회복');
 for(const it of DATA.items.filter(i=>i.category==='food'))assert.ok(it.effects.supply<=7||it.id==='battlelunch','no Food above 7 except 영웅 결전 도시락');
 for(const it of DATA.items.filter(i=>i.category==='drink'))assert.ok(it.effects.supply>=1&&it.effects.supply<=2,'a Drink recovers 1~2');
 assert.equal(DATA.itemBy.lava.effects.survival,6,'불룡볶음면 강인함 +6 (User 2026-09-26, v2.9.6: 냉기 +12 / 강인함 +6)');
 assert.equal(DATA.itemBy.lava.effects.cold,12,'불룡볶음면 냉기 +12, above 컵라면 +10 and below 핫팩 +24 (v2.9.6)');
 assert.deepEqual([DATA.itemBy.tree.buy,DATA.itemBy.tree.sell],[400,800],'세계수 생환부적 400 / 800');
 // every stocked unit carries a finite expiry
 const g=new Game();g.autosave=false;g.start('shelf-life');g.run.facilities=[];
 for(const it of DATA.items){g.stock(it.id,1);const st=g.run.inventory.at(-1);assert.equal(st.expires,g.run.day+it.days,it.id+' expires on stocking day + shelf life');}
});

test('ITEM SUPPLY MODEL: every active Food/Drink has Supply > 0',()=>{
 const fd=DATA.items.filter(i=>['food','drink'].includes(i.category));
 assert.ok(fd.length>=12);
 for(const it of fd)assert.ok(it.effects.supply>0,it.id+' Food/Drink without Supply');
 for(const it of DATA.items)assert.ok(!('fatigue' in it.effects),it.id+' must not carry an item fatigue chain');
});

test('ITEM-Q11: Return Stone escape bonus is the approved +50%p',()=>{
 assert.equal(DATA.itemBy.stone.effects.escape,.5);
 assert.deepEqual(DATA.itemBy.stone.roles,['insurance']);
 assert.equal(DATA.itemBy.tree.effects.revive,1);
});

test('SIM-Q01: combat variance uses the approved v2.4 starting value',()=>{
 assert.equal(DATA.balance.combatNoise,.175);
});

test('DUN-Q18: every Hazard keeps a Main specialist plus >=2 alternative routes',()=>{
 /* ITEM_v2.7 §HAZARD COUNTER BASELINE moves the Fire Main to 쿨링 이온음료 +18; 얼음컵 +10 is
    the Lower response. Every other Main is unchanged. The catalog's per-item Hazard Role
    (ITEM_v2.8.0 §ACTIVE CATALOG) still names these as the dedicated Main - a raw-value search
    alone no longer finds them for bind/dark now that an Epic hybrid may outscore a Common Main
    (see the ITEM-Q83 note just below), so the search excludes the known Epic hybrids. */
 const main={poison:'antidote',bind:'rope',corrosion:'coating',mire:'boots',fire:'ion',fear:'wine',dark:'battery',cold:'heat',whiteout:'snowgoggles'};
 const stat={poison:'survival',corrosion:'survival',cold:'survival',fire:'spirit',bind:'mobility',mire:'mobility',fear:'spirit',dark:'mobility',whiteout:'spirit'};/* v2.9.0: 어둠 presses 기동, 화염 presses 정신 (revision 5) */
 const EPIC_HYBRIDS=['spiderkit','slimesuit','cryptlantern','snowvisor','magmagear'];
 for(const h of CANON_HAZARDS){
  const counters=DATA.items.filter(i=>(i.effects[h]||0)>0);
  assert.ok(counters.length>=1,h+' has no counter item');
  const best=counters.filter(i=>!EPIC_HYBRIDS.includes(i.id)).reduce((a,b)=>(b.effects[h]>a.effects[h]?b:a));
  assert.equal(best.id,main[h],h+' Main specialist should be '+main[h]);
  const statRoute=DATA.items.filter(i=>(i.effects[stat[h]]||0)>0&&!(i.effects[h]>0));
  assert.ok(counters.length-1+statRoute.length>=2,h+' lacks two alternative routes');
 }
 /* ITEM-Q73/ITEM-Q83/ITEM-Q15 (User 2026-09-25, v2.9.1 balance): a Hybrid stays weaker per
    target than any dedicated specialist of the SAME OR HIGHER Rarity - it may now exceed a
    Rarity strictly below its own. An Epic hybrid may therefore outscore a Common Main
    (속박/어둠 +18 over 경량 로프/랜턴 건전지 +16 is the explicit named exception); it still may
    not outscore any Uncommon-or-above specialist on that Hazard. */
 for(const id of EPIC_HYBRIDS){
  const hybridRarity=DATA.itemBy[id].rarity;
  for(const h of CANON_HAZARDS){const v=DATA.itemBy[id].effects[h]||0;if(!v)continue;
   for(const spec of DATA.items){
    if(spec.id===id||spec.rarity<hybridRarity)continue;
    const sv=spec.effects[h]||0;if(!sv)continue;
    assert.ok(v<sv,DATA.itemBy[id].name+' stays under '+spec.name+' on '+h+' (same-or-higher Rarity)');
   }
  }
 }
 // Hybrid must not beat either dedicated Main on its own Hazard - 방수망토 is Uncommon, so both
 // corrosion/mire Mains (coating U, boots U) are same-Rarity and the plain rule still applies.
 for(const h of ['corrosion','mire'])assert.ok(DATA.itemBy.cloak.effects[h]<DATA.itemBy[main[h]].effects[h],'방수망토 must not outperform the '+h+' Main');
 /* v2.7 inverts this pair: 쿨링 이온음료 +18 is the Fire Main and 얼음컵 +10 the Lower
    response, so the Lower one is the one that has to stay under. */
 assert.ok(DATA.itemBy.ice.effects.fire<DATA.itemBy.ion.effects.fire,'얼음컵 is the Lower Fire response');
 assert.ok(DATA.itemBy.lava.effects.cold<DATA.itemBy.heat.effects.cold,'HotPack remains the stronger pure-Cold specialist');
});

/* DUN-Q17 (Supply Burden / deficit penalty) was deleted in v2.9.0: no Gate requires Supply (DUNGEON_HAZARD §SUPPLY -> FATIGUE). */
test('DUN-Q70/Q71: prepared Power weights and the Hazard Threat curve',()=>{
 /* One source, read by Forecast, Resolve and the Great-Success margin alike. A stale
    .58/.32/.24/.16 stat weighting anywhere is invalid in v2.7. */
 assert.equal(Dungeon.preparedPower({combat:100,survival:100,mobility:100,spirit:100}),131);
 assert.equal(Dungeon.preparedPower({combat:1,survival:0,mobility:0,spirit:0}),.50);
 assert.equal(Dungeon.preparedPower({combat:0,survival:1,mobility:0,spirit:0}),.34);
 assert.equal(Dungeon.preparedPower({combat:0,survival:0,mobility:1,spirit:0}),.27);
 assert.equal(Dungeon.preparedPower({combat:0,survival:0,mobility:0,spirit:1}),.20);
 const src=require('node:fs').readFileSync(require('node:path').join(__dirname,'..','dist/systems/dungeon.js'),'utf8');
 assert.ok(!/(combat|survival|mobility|spirit)\s*\*\s*\.(58|32|24|16)\b/.test(src),'no stale ordinary-expedition stat weight survives');
 /* Threat = 12 + Day*.35 + (Tier-1)*6, at the owner's own anchors. */
 for(const [day,tier,want] of [[1,1,12.35],[12,1,16.20],[18,2,24.30],[24,2,26.40],[29,3,34.15],[30,2,28.50]])
  assert.ok(Math.abs(Dungeon.hazardState('poison',{},{day,tier}).threat-want)<1e-9,
   'D'+day+' T'+tier+' threat is '+want);
 // the gate's own scale no longer moves a Hazard's threat
 assert.equal(Dungeon.hazardState('poison',{},{day:30,tier:2,scale:4.6}).threat,
              Dungeon.hazardState('poison',{},{day:30,tier:2}).threat);
});

console.log(count+' vocabulary groups passed');
