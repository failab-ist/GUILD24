// Chunk A acceptance: canonical Hazard vocabulary, ACTIVE ITEM CATALOG and Supply Burden.
// Covers DUN-Q01/Q04/Q17/Q18/Q19, ITEM-Q09/Q17/Q19, ITEM-Q02/Q03/Q11, SIM-Q01.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

const CANON_HAZARDS=['poison','bind','corrosion','mire','fire','fear','dark','cold','whiteout'];
const LEGACY=['thirst','caffeine','alcohol','long','wet','armor','undead','slow','food'];
const CATALOG=['삼각김밥','생수','컵라면','핫바','초코바','캔커피','진정 허브티','하급 포션','얼음컵','랜턴 건전지','경량 로프','집중 사탕','불룡볶음면','에너지드링크','용사의 곡주','구급키트','방진마스크','핫팩','방수망토','부식 방지 코팅제','원정용 장화','설원 고글','상급 포션','농축 해독제','귀환석','중급 포션','길드 프리미엄 도시락','쿨링 이온음료','세계수 생환부적','황금 1+1 쿠폰','거미줄 방호세트','연금 방수슈트','성화 랜턴','백설 방한고글','마그마 냉각장비','결전 특선 도시락','용사 특식 핫바','초고속 에너지드링크','대현자 허브엘릭서','최상급 포션'];

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
 /* ITEM_v2.7 §PLAYER-FACING CATEGORY: exactly these six. `medical`, `tool`, `magic` and the
    `fresh` alias are gone. */
 assert.deepEqual([...new Set(DATA.items.map(i=>i.category))].sort(),['drink','food','gear','insurance','potion','special']);
 assert.equal(DATA.items.filter(i=>i.rarity===3).length,11,'ten new Epics plus 세계수 생환부적');
});

test('ITEM-Q02/Q03: every Item declares canonical roles and every effect is presentable',()=>{
 // ITEM_v2.7 §INSURANCE HIERARCHY: Aftercare reads as a utility line, not a magnitude.
 const util=new Set(['potion','curePoison','revive','duplicate','aftercare']);
 for(const it of DATA.items){
  assert.ok(it.roles&&it.roles.length,it.id+' has no functional role');
  for(const r of it.roles)assert.ok(r in DATA.roles,it.id+' unknown role '+r);
  for(const k of Object.keys(it.effects))assert.ok(k in Presentation.labels||util.has(k),it.id+' effect '+k+' is not player-readable');
 }
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
    the Lower response. Every other Main is unchanged. */
 const main={poison:'antidote',bind:'rope',corrosion:'coating',mire:'boots',fire:'ion',fear:'wine',dark:'battery',cold:'heat',whiteout:'snowgoggles'};
 const stat={poison:'survival',corrosion:'survival',fire:'survival',cold:'survival',bind:'mobility',mire:'mobility',fear:'spirit',dark:'spirit',whiteout:'spirit'};
 for(const h of CANON_HAZARDS){
  const counters=DATA.items.filter(i=>(i.effects[h]||0)>0);
  assert.ok(counters.length>=1,h+' has no counter item');
  const best=counters.reduce((a,b)=>(b.effects[h]>a.effects[h]?b:a));
  assert.equal(best.id,main[h],h+' Main specialist should be '+main[h]);
  const statRoute=DATA.items.filter(i=>(i.effects[stat[h]]||0)>0&&!(i.effects[h]>0));
  assert.ok(counters.length-1+statRoute.length>=2,h+' lacks two alternative routes');
 }
 /* ITEM-Q83: an Epic Family hybrid trades peak strength for one-slot breadth, so it never
    outperforms the dedicated Main on any Hazard it covers. */
 for(const id of ['spiderkit','slimesuit','cryptlantern','snowvisor','magmagear'])
  for(const h of CANON_HAZARDS){const v=DATA.itemBy[id].effects[h]||0;if(!v)continue;
   assert.ok(v<DATA.itemBy[main[h]].effects[h],DATA.itemBy[id].name+' stays under the '+h+' Main');}
 // Hybrid must not beat either dedicated Main on its own Hazard.
 for(const h of ['corrosion','mire'])assert.ok(DATA.itemBy.cloak.effects[h]<DATA.itemBy[main[h]].effects[h],'방수망토 must not outperform the '+h+' Main');
 /* v2.7 inverts this pair: 쿨링 이온음료 +18 is the Fire Main and 얼음컵 +10 the Lower
    response, so the Lower one is the one that has to stay under. */
 assert.ok(DATA.itemBy.ice.effects.fire<DATA.itemBy.ion.effects.fire,'얼음컵 is the Lower Fire response');
 assert.ok(DATA.itemBy.lava.effects.cold<DATA.itemBy.heat.effects.cold,'HotPack remains the stronger pure-Cold specialist');
});

test('DUN-Q17: Supply Burden eligibility and the single shared deficit penalty',()=>{
 const g=new Game();g.autosave=false;g.start('vocab-supply');
 const seen={1:new Set(),2:new Set(),3:new Set()};
 for(let day=1;day<30;day++){g.run.day=day;for(const id of ['spider','slime','fire','crypt','snow'])for(const tier of [1,2,3])seen[tier].add(g.makeDungeon(id,tier).requiredSupply);}
 assert.deepEqual([...seen[1]],[0],'T1 never receives Supply Burden');
 assert.deepEqual([...seen[2]].sort(),[0,3],'T2 starts from required Supply 3');
 assert.deepEqual([...seen[3]].sort(),[0,5],'T3 starts from required Supply 5');
 assert.equal(g.makeFinal().requiredSupply,0,'D30 Final rolls no extra Supply Burden');

 const n={...g.run.npcs[0],traits:[],pack:[]},d={...g.makeDungeon('spider',2),requiredSupply:5};
 const bare=Dungeon.prepare(n,d),fed=Dungeon.prepare({...n,pack:['rice','premium']},d);
 assert.equal(bare.supply.required,5);assert.ok(bare.supply.deficit>0&&bare.supply.penalty>0);
 assert.equal(fed.supply.deficit,0,'meeting required Supply removes the deficit');
 assert.equal(fed.supply.penalty,0);
 // one shared penalty across the four core stats, and no bonus for excess Supply
 const over=Dungeon.prepare({...n,pack:['premium','premium']},{...d,requiredSupply:1});
 const none=Dungeon.prepare({...n,pack:['premium','premium']},{...d,requiredSupply:0});
 for(const k of Adventurer.keys)assert.equal(over.effects[k],none.effects[k],'excess Supply grants no extra bonus');
});

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
