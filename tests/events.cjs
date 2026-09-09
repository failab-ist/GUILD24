// Chunk B acceptance: Event timing, frequency, eligibility and the canonical 22-event catalog.
// Covers EVENT-001/002/003, EVENT sections 1/2/8/9, and the per-event contracts in section 11.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

function fresh(seed='events'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
function advance(g){const s=g.run;if(s.phase==='end')return;g.beginOrder();g.finishOrder();while(s.phase==='sell')g.depart();g.finishNight();g.closeDay();}
// force WHICH Event fires; the canonical day gate and per-event eligibility still decide WHETHER it fires
const force=(g,id)=>{const e=DATA.events.find(x=>x.id===id);g.rollEvent=()=>g.eventEligibleDay(g.run.day)&&g.eventEligible(e)?e:null;};
const CATALOG=['물류대란','본사 1+1 행사','게이트 순례주간','몬스터 범람','마석 가격 폭등','한파','포션 공급 중단','신입 모험가 시즌','왕립 기사단 방문','암시장 상인','본사 재고 감사','왕도 축제','길드 파업','미확인 게이트','본사 반값 행사','독안개','보급 상단 도착','길드 급여일','치유소 휴무','본사 폐기 지원','늙은 음유시인','본사 야간 근무 수칙'];

test('EVENT-003: catalog is exactly the canonical 22 with the two rare easter eggs at 0.35',()=>{
 assert.equal(DATA.events.length,22);
 assert.deepEqual(DATA.events.map(e=>e.name),CATALOG);
 const rare=DATA.events.filter(e=>e.weight!==1);
 assert.deepEqual(rare.map(e=>e.name),['늙은 음유시인','본사 야간 근무 수칙']);
 for(const e of rare)assert.equal(e.weight,.35);
 assert.ok(!DATA.events.some(e=>e.name==='길드 원정주간'),'noncanonical 길드 원정주간 is retired');
 for(const e of DATA.events)assert.ok(e.reveal&&e.description,e.id+' needs reveal and effect copy');
});

test('EVENT-001: eligible days are D3-D29 minus every Relic window day',()=>{
 const g=fresh();
 for(let day=0;day<=30;day++){
  const want=day>=3&&day<=29&&![5,10,15,20,25].includes(day);
  assert.equal(g.eventEligibleDay(day),want,'day '+day);
 }
 assert.equal([...Array(31).keys()].filter(d=>g.eventEligibleDay(d)).length,22,'22 eligible days');
});

test('EVENT-001: daily chance is 35%, never the retired 74%',()=>{
 const g=fresh('rate');g.run.day=7;
 let fired=0;const N=6000;
 for(let i=0;i<N;i++)if(g.rollEvent())fired++;
 const rate=fired/N;
 assert.ok(Math.abs(rate-.35)<.03,'observed daily event rate '+rate.toFixed(3));
 g.run.day=10;assert.equal([...Array(400)].filter(()=>g.rollEvent()).length,0,'no Event on a Relic window day');
});

test('EVENT-003: rare easter eggs land clearly less often than an ordinary Event',()=>{
 const g=fresh('weight');g.run.day=7;
 const seen={};for(let i=0;i<20000;i++){const e=g.rollEvent();if(e)seen[e.id]=(seen[e.id]||0)+1;}
 const rare=(seen.bard||0)+(seen.nightshift||0);
 const normal=Object.entries(seen).filter(([id])=>!['bard','nightshift'].includes(id));
 const avgNormal=normal.reduce((a,[,v])=>a+v,0)/normal.length;
 assert.ok(rare/2<avgNormal*.6,'rare '+(rare/2).toFixed(0)+' vs avg normal '+avgNormal.toFixed(0));
 assert.ok(rare>0,'rare easter eggs are still reachable');
});

test('EVENT 9-1/9-2: Hazard Events skip ineligible Gates and are excluded when no Gate qualifies',()=>{
 const g=fresh('hazard'),s=g.run;
 const cold=DATA.events.find(e=>e.id==='coldwave'),fog=DATA.events.find(e=>e.id==='poisonfog');
 s.dungeons=[{...g.makeDungeon('snow',2)}];assert.equal(g.eventEligible(cold),false,'cold Gate only -> 한파 excluded');
 s.dungeons=[{...g.makeDungeon('fire',2)}];assert.equal(g.eventEligible(cold),false,'fire Gate only -> 한파 excluded');
 s.dungeons=[{...g.makeDungeon('spider',2)}];assert.equal(g.eventEligible(cold),true);
 assert.equal(g.eventEligible(fog),false,'poison Gate only -> 독안개 excluded');
 s.dungeons=[{...g.makeDungeon('snow',2)}];assert.equal(g.eventEligible(fog),true);
});

test('EVENT 8-1: an Event-revealed Hazard is immediately Known and never doubled',()=>{
 const g=fresh('known');force(g,'coldwave');
 let guard=0;while(guard++<40){advance(g);if(g.run.event?.id==='coldwave')break;}
 assert.equal(g.run.event?.id,'coldwave','coldwave reached');
 const touched=g.run.dungeons.filter(d=>d.hazards.includes('cold'));
 assert.ok(touched.length,'at least one Gate carries cold');
 for(const d of g.run.dungeons){
  assert.equal(d.hazards.filter(h=>h==='cold').length<=1,true,'cold is never doubled');
  if(d.hazards.includes('fire'))assert.ok(!d.hazards.includes('cold'),'fire Gate never receives cold');
 }
 assert.ok(Relics.known(g).includes('cold'),'Event Hazard is inside Known Hazards for coverage/pity logic');
});

test('EVENT 03: 게이트 순례주간 needs two Gates and three expected visitors, and hides the change until Night',()=>{
 const g=fresh('pilgrim'),s=g.run,pil=DATA.events.find(e=>e.id==='pilgrimage');
 s.dungeons=[g.makeDungeon('spider',1)];s.expectedVisitors=5;assert.equal(g.eventEligible(pil),false,'one Gate -> excluded');
 s.dungeons=[g.makeDungeon('spider',1),g.makeDungeon('snow',1)];s.expectedVisitors=2;assert.equal(g.eventEligible(pil),false,'too few visitors -> excluded');
 s.expectedVisitors=3;assert.equal(g.eventEligible(pil),true);

 const h=fresh('pilgrim-run');force(h,'pilgrimage');
 let guard=0;while(guard++<60){advance(h);if(h.run.event?.id==='pilgrimage'&&h.run.pilgrimage>0)break;}
 assert.ok(h.run.pilgrimage>0&&h.run.pilgrimage<=3,'1-3 adventurers actually wander');
 const moved=h.run.queue.map(id=>h.run.npcs.find(n=>n.id===id)).filter(n=>n.pilgrim);
 assert.equal(moved.length,h.run.pilgrimage);
 for(const n of moved){
  assert.notEqual(n.destination,n.claimedDestination,'actual destination changed');
  assert.ok(h.run.dungeons[n.destination],'replacement Gate is a currently open Gate');
 }
});

test('EVENT 18: 길드 급여일 is a today-only budget and never edits the persistent Wallet',()=>{
 const g=fresh('payday');force(g,'payday');
 let guard=0;while(guard++<60){advance(g);if(g.run.event?.id==='payday')break;}
 assert.equal(g.run.event?.id,'payday');
 const visitors=g.run.queue.map(id=>g.run.npcs.find(n=>n.id===id));
 assert.ok(visitors.length&&visitors.every(n=>n.eventBudget>0),'visitors receive a temporary budget');
 for(const n of visitors)assert.equal(n.eventBudget,Math.round(n.money*.2));
 g.rollEvent=()=>null;advance(g);
 assert.ok(g.run.npcs.every(n=>!n.eventBudget),'the Event bonus is gone the next day');
});

test('EVENT 02: 본사 1+1 delivers double units for a single order cost',()=>{
 const g=fresh('promo');force(g,'oneplus');
 let guard=0;while(guard++<60){advance(g);if(g.run.event?.id==='oneplus')break;}
 const s=g.run,i=s.offers.findIndex(o=>o.promo);
 assert.ok(i>=0,'a promo SKU is designated');
 g.beginOrder();
 const before=s.inventory.length,gold=s.money,price=s.offers[i].price;
 g.order(i);
 assert.equal(s.inventory.length,before+2,'two units arrive');
 assert.equal(s.money,gold-price,'only one unit is paid for');
 assert.equal(s.offers.filter(o=>o.promo).length,1,'exactly one designated SKU');
});

test('EVENT 20/22: 본사 폐기 지원 clears waste cost but not waste count; 야간 근무 수칙 zeroes overhead',()=>{
 const g=fresh('subsidy'),s=g.run;force(g,'wastecover');
 while(s.day<2)advance(g);
 g.stock('rice',3);for(const st of s.inventory)if(DATA.itemBy[st.item].days)st.expires=s.day+1;
 const wasteBefore=s.stats.waste;
 advance(g); // next morning expires the stock, then the Event covers its cost
 assert.equal(s.event?.id,'wastecover');
 assert.equal(s.daily.wasteCost,0,'폐기 비용 0G');
 assert.ok(s.daily.waste>0,'폐기 수량은 정상 기록');
 assert.ok(s.stats.waste>wasteBefore,'누적 폐기도 정상 누적');

 const h=fresh('overhead');force(h,'nightshift');
 let guard=0;while(guard++<60){advance(h);if(h.run.event?.id==='nightshift')break;}
 assert.equal(h.run.event?.id,'nightshift');
 const baseline=h.run.reportHistory.at(-1).operating;
 advance(h); // close the 야간 근무 수칙 day so its Closing lands in reportHistory
 assert.ok(baseline>0,'an ordinary day still pays overhead');
 assert.equal(h.run.reportHistory.at(-1).operating,0,'오늘 점포 유지비 0G');
});

test('EVENT 11: 본사 재고 감사 is excluded until cumulative waste reaches 6',()=>{
 const g=fresh('audit'),audit=DATA.events.find(e=>e.id==='audit');
 g.run.stats.waste=5;assert.equal(g.eventEligible(audit),false);
 g.run.stats.waste=6;assert.equal(g.eventEligible(audit),true);
});

test('EVENT 01: 물류대란 raises buy price without cutting the offer count',()=>{
 assert.deepEqual(DATA.events.find(e=>e.id==='logistics').effects,{price:1.15});
 assert.deepEqual(DATA.events.find(e=>e.id==='caravan').effects,{offers:2});
});

console.log(count+' event groups passed');
