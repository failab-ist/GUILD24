// Chunk B acceptance: Event timing, frequency, eligibility and the canonical 22-event catalog.
// Covers EVENT-001/002/003, EVENT sections 1/2/8/9, and the per-event contracts in section 11.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

function fresh(seed='events'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
function advance(g){const s=g.run;if(s.phase==='end')return;g.beginOrder();g.finishOrder();while(s.phase==='sell')g.depart();g.finishNight();g.closeDay();}
// force WHICH Event fires; the canonical day gate and per-event eligibility still decide WHETHER it fires
const force=(g,id)=>{const e=DATA.events.find(x=>x.id===id);g.rollEvent=()=>g.eventEligibleDay(g.run.day)&&g.eventEligible(e)?e:null;};
const CATALOG=['물류대란','본사 1+1 행사','게이트 순례주간','몬스터 범람','포션 가격 폭등','한파','포션 공급 중단','신입 모험가 시즌','왕립 기사단 방문','암시장 상인','본사 재고 감사','왕도 축제','길드 파업','미확인 게이트','본사 반값 행사','독안개','보급 상단 도착','길드 급여일','치유소 휴무','본사 폐기 지원','늙은 음유시인','본사 야간 근무 수칙'];

test('EVENT-003: catalog is exactly the canonical 22 with the two rare easter eggs at 0.35',()=>{
 assert.equal(DATA.events.length,22);
 assert.deepEqual(DATA.events.map(e=>e.name),CATALOG);
 const rare=DATA.events.filter(e=>e.weight!==1);
 assert.deepEqual(rare.map(e=>e.name),['늙은 음유시인','본사 야간 근무 수칙']);
 for(const e of rare)assert.equal(e.weight,.35);
 assert.ok(!DATA.events.some(e=>e.name==='길드 원정주간'),'noncanonical 길드 원정주간 is retired');
 for(const e of DATA.events)assert.ok(e.reveal&&e.description,e.id+' needs reveal and effect copy');
});

test('EVENT-001 / §DEEP EXPEDITION DAY EXCLUSION: eligible days drop the Relic windows and this Run\'s Deep Days',()=>{
 const g=fresh(),deep=g.run.deep.days;
 assert.ok(deep.length>=2&&deep.length<=3,'the Run holds two or three Deep Days');
 for(let day=0;day<=30;day++){
  const want=day>=3&&day<=29&&![5,10,15,20,25].includes(day)&&!deep.includes(day);
  assert.equal(g.eventEligibleDay(day),want,'day '+day);
 }
 // 22 was the pre-Deep baseline; a Run now carries 19 or 20 eligible Days, and the 35% chance
 // is deliberately NOT raised to compensate - Stage 9 measures what actually happens.
 const eligible=[...Array(31).keys()].filter(d=>g.eventEligibleDay(d)).length;
 assert.equal(eligible,22-deep.length,'each Deep Day removes exactly one eligible Day');
 assert.ok(eligible>=19&&eligible<=20,'19-20 eligible Days per Run: '+eligible);
 // suppression does not depend on anyone being nominated, and costs the run stream no draw
 for(const day of deep)assert.equal(g.eventEligibleDay(day),false,'D'+day+' never rolls an Event');
});

test('EVENT §DEEP EXPEDITION DAY EXCLUSION: suppressing an Event costs the run stream no draw',()=>{
 // rollEvent draws before it asks about eligibility, so a Deep Day consumes the same randomness
 // as any other Day. If that ever stops being true every seed after D7 moves.
 const g=fresh();
 const before=g.rng.state;g.run.day=g.run.deep.days[0];g.rollEvent();const deepCost=g.rng.state;
 const h=fresh();
 const start=h.rng.state;h.run.day=[...Array(30).keys()].find(d=>h.eventEligibleDay(d));h.rollEvent();
 assert.notEqual(before,deepCost,'a draw was still taken on the Deep Day');
 assert.notEqual(start,h.rng.state,'and on an ordinary eligible Day');
});

test('EVENT-001: daily chance is 35%, never the retired 74%',()=>{
 // an ordinary eligible Day for this Run: D7 is a candidate Deep window, and on a Run that
 // actually holds it the chance is 0 by design rather than 35%.
 const g=fresh('rate');g.run.day=[...Array(30).keys()].find(d=>g.eventEligibleDay(d));
 let fired=0;const N=6000;
 for(let i=0;i<N;i++)if(g.rollEvent())fired++;
 const rate=fired/N;
 assert.ok(Math.abs(rate-.35)<.03,'observed daily event rate '+rate.toFixed(3));
 g.run.day=10;assert.equal([...Array(400)].filter(()=>g.rollEvent()).length,0,'no Event on a Relic window day');
});

test('EVENT-003: rare easter eggs land clearly less often than an ordinary Event',()=>{
 const g=fresh('weight');g.run.day=[...Array(30).keys()].find(d=>g.eventEligibleDay(d));
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
   g.beginOrder(); g.open();
   const visitors=[];
   while(g.run.phase==='sell'){
    const n = g.current();
    visitors.push(n);
    assert.ok(n.eventBudget>0,'visitors receive a temporary budget on arrival');
    assert.equal(n.eventBudget,Math.round(n.money*.2));
    g.depart();
   }
   g.rollEvent=()=>null;
   g.finishNight(); g.closeDay();
   g.beginOrder(); g.open();
   assert.ok(g.run.npcs.every(n=>!n.eventBudget),'the Event bonus is gone the next day');
});

test('EVENT 18 + RICH: arrival order applies rich +50, cap 2000, then eventBudget', () => {
   const g = fresh('payday-rich'); force(g, 'payday');
   let guard=0;while(guard++<60){advance(g);if(g.run.event?.id==='payday')break;}
   const n = g.run.npcs[0];
   n.traits = ['rich'];
   n.money = 1980;
   g.run.queue = [n.id];
   g.run.cursor = 0;
   g.beginOrder(); g.open();
   assert.equal(n.money, 2000, 'rich +50 caps at 2000');
   assert.equal(n.eventBudget, Math.round(2000 * 0.2), 'eventBudget is calculated on post-rich capped Wallet');
   g.depart();
   g.rollEvent=()=>null;
   g.finishNight(); g.closeDay();
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

test('EVENT 신입 모험가 시즌: the new face actually turns up, in one of the day own slots',()=>{
 /* The event used to create an NPC and stop there, which the third-day intake does anyway.
    What it owes the player is an arrival they can actually serve today. */
 let days=0,seated=0,sizes=[];
 for(let i=0;i<120;i++){
  const g=fresh('rookie-'+i);force(g,'rookie');
  for(let d=0;d<30&&g.run.phase!=='end';d++){
   const s=g.run;s.money=5000;
   if(s.phase==='morning'&&s.event&&s.event.id==='rookie'){
    days++;
    const newest=s.npcs[s.npcs.length-1];
    if(s.queue.includes(newest.id))seated++;
    sizes.push(s.queue.length);
   }
   advance(g);
  }
 }
 assert.ok(days>=20,'the event fired often enough to mean anything: '+days);
 assert.equal(seated,days,'the new adventurer is in the day queue every time');
 // one of the day's own slots, not an extra one: the headcount stays in its ordinary band
 assert.ok(Math.max(...sizes)<=8,'no visitor was added to make room: max queue '+Math.max(...sizes));
});

test('EVENT 신입 모험가 시즌: the arrival follows the Day-based Level rule, with no band of its own',()=>{
 /* Not "Lv.1-3" - Adventurer.create adds the Day's own progression to that base, so a late
    event arrives higher. What must hold is that rookie gets no rule of its own. */
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/adventurer.js'),'utf8');
 assert.ok(!/opts\.rookie/.test(src),'create reads no rookie flag');
 assert.ok(/r\.int\(1,3\)\+Math\.floor\(\(day-1\)\*\.25\)/.test(src),'the Day-based rule is the one rule');

 const band=day=>[Math.max(1,1+Math.floor((day-1)*.25)),3+Math.floor((day-1)*.25)];
 const seen=[];
 for(let i=0;i<120;i++){
  const g=fresh('rookielv-'+i);force(g,'rookie');
  for(let d=0;d<30&&g.run.phase!=='end';d++){
   const s=g.run;s.money=5000;
   if(s.phase==='morning'&&s.event&&s.event.id==='rookie'){
    const n=s.npcs[s.npcs.length-1],[lo,hi]=band(s.day);
    assert.ok(n.level>=lo&&n.level<=hi,
     'day '+s.day+' arrival is Lv.'+n.level+', outside the Day rule band '+lo+'-'+hi);
    seen.push({day:s.day,level:n.level});
   }
   advance(g);
  }
 }
 assert.ok(seen.length>=20,'enough arrivals to compare: '+seen.length);
 // and the rule really does move with the Day rather than sitting at 1-3
 const late=seen.filter(x=>x.day>=17),early=seen.filter(x=>x.day<=8);
 if(late.length&&early.length)
  assert.ok(Math.min(...late.map(x=>x.level))>=Math.min(...early.map(x=>x.level)),
   'a late arrival never starts below an early one');
});

/* SA-Q45 / EVENT_v2.8 §왕립 기사단 방문. The Event generated the royal-profile newcomer and only
   신입 모험가 시즌 was seated, so 왕립 기사단 방문 could fire without the knight ever visiting that
   Day. It is now seated by the same deterministic existing-slot rule, which is what keeps the
   headcount out of it. */
test('EVENT 왕립 기사단 방문: the royal newcomer is in today queue exactly once',()=>{
 let days=0,seated=0,sizes=[],levels=[],rarities=[];
 const capBreaches=[];
 for(let i=0;i<120;i++){
  const g=fresh('royal-'+i);force(g,'royal');
  for(let d=0;d<30&&g.run.phase!=='end';d++){
   const s=g.run;s.money=5000;
   if(s.phase==='morning'&&s.event&&s.event.id==='royal'){
    days++;
    const newest=s.npcs[s.npcs.length-1];
    const seatedTimes=s.queue.filter(id=>id===newest.id).length;
    assert.ok(seatedTimes<=1,'the royal newcomer is never seated twice');
    if(seatedTimes===1)seated++;
    sizes.push(s.queue.length);
    levels.push({day:s.day,level:newest.level});
    rarities.push(newest.rarity);
    // "exactly one newcomer" is proven directly in the paired-snapshot test below, where the
    // Event is the only difference between the two runs.
    // Living NPC Cap is not bypassed: the Event is only eligible with room, and it takes it
    if(s.npcs.filter(n=>n.alive).length>22)capBreaches.push(s.day);
    // the queue never exceeds who was actually available to come
    assert.ok(s.queue.length<=s.visitorBreakdown.available,'the available cap still holds');
   }
   advance(g);
  }
 }
 assert.ok(days>=20,'the event fired often enough to mean anything: '+days);
 assert.equal(seated,days,'the royal newcomer is in the Day queue every time it fires');
 assert.deepEqual(capBreaches,[],'the Living NPC Cap was never exceeded');
 assert.ok(Math.max(...sizes)<=8,'no visitor was added to make room: max queue '+Math.max(...sizes));

 /* the royal profile itself: Day-based spawn Level +3, and the 40/36/17/6/1 Rarity weights */
 const band=day=>[Math.max(1,1+Math.floor((day-1)*.25))+3,3+Math.floor((day-1)*.25)+3];
 for(const {day,level} of levels){
  const [lo,hi]=band(day);
  assert.ok(level>=lo&&level<=hi,'day '+day+' royal arrival is Lv.'+level+', outside +3 band '+lo+'-'+hi);
 }
 const src=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/adventurer.js'),'utf8');
 assert.ok(/opts\.royal\?\[40,36,17,6,1\]/.test(src),'the royal Rarity weights are 40/36/17/6/1');
 assert.ok(/\(opts\.royal\?3:0\)/.test(src),'and the royal spawn Level is the ordinary one +3');
 assert.ok(rarities.some(r=>r>=1),'the weights really produced something above Common across '+rarities.length+' arrivals');

 /* one seating rule serves rookie, royal and the Rookie Board - there is no second writer */
 const shop=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 const seat=shop.match(/if\(\(ev\.rookie\|\|ev\.royal\|\|s\.dayFacilities\.includes\('rookieBoard'\)\)[^\n]*/g)||[];
 assert.equal(seat.length,1,'exactly one deterministic seating rule');
 assert.ok(/selected\[selected\.length-1\]=arrival/.test(seat[0]),'and it replaces a slot rather than adding one');
});

test('EVENT 왕립 기사단 방문 / 신입 모험가 시즌: neither Event raises the visitor count',()=>{
 /* Both variants are resolved from ONE exported snapshot, so the Event is the only difference
    between them and the headcount can be compared directly. */
 for(const id of ['royal','rookie']){
  let compared=0;
  for(let i=0;i<40&&compared<8;i++){
   const g=fresh('headcount-'+id+'-'+i);
   for(let d=0;d<6&&g.run.phase!=='end';d++){g.run.money=5000;advance(g);}
   if(g.run.phase==='end')continue;
   const snap=Save.export(g.account,g.run);
   const run=withEvent=>{
    const r=Save.import(snap);const h=new Game(r.account,r.run);h.autosave=false;
    if(withEvent)force(h,id);else h.rollEvent=()=>null;
    h.run.day++;h.morning();
    return h.run;
   };
   const plain=run(false),evt=run(true);
   if(evt.event?.id!==id)continue;
   compared++;
   /* the Day's intake is what the Event may not raise, and it is the number the seating rule
      could actually move: the newcomer replaces a drawn slot rather than adding one. */
   assert.equal(evt.expectedVisitors,plain.expectedVisitors,id+': the intake did not change');
   assert.ok(evt.queue.includes(evt.npcs[evt.npcs.length-1].id),id+': the newcomer took a slot');
   assert.equal(evt.queue.filter(x=>x===evt.npcs[evt.npcs.length-1].id).length,1,id+': exactly once');
   assert.equal(evt.npcs.length,plain.npcs.length+1,id+': exactly one newcomer was generated');
   assert.ok(evt.queue.length<=evt.visitorBreakdown.available,id+': the available cap still holds');
   assert.equal(evt.queue.length,plain.queue.length,id+': the visitor count did not change');
  }
  assert.ok(compared>0,id+': no comparable Day was reached');
 }
});

/* SA-Q45, the roster-limited case. Creating the royal newcomer puts a body in `available`, so
   on a Day whose roster is smaller than the intake that body could fill a slot the Day could not
   otherwise have filled - a visitor increase caused by the Event, which EVENT_v2.8 forbids. The
   comparison is made on ONE controlled pre-Morning state, deliberately starved of adventurers,
   with the Event OFF and then ON. */
test('EVENT 왕립 기사단 방문: on a roster-limited Day the Event adds no visitor',()=>{
 const LIMIT=2;                 // only this many existing adventurers can come today
 const build=seed=>{
  const g=fresh(seed);
  for(let d=0;d<5&&g.run.phase!=='end';d++){g.run.money=5000;advance(g);}
  if(g.run.phase==='end')return null;
  // starve the roster: everyone but LIMIT of them is recovering, so the Day cannot fill its intake
  const alive=g.run.npcs.filter(n=>n.alive);
  alive.forEach((n,i)=>{n.recovery=i<LIMIT?0:3;});
  g.run.day=8;                  // not a periodic-intake Day, so the Event is the only newcomer
  return Save.export(g.account,g.run);
 };
 const run=(snap,withEvent)=>{
  const r=Save.import(snap);const h=new Game(r.account,r.run);h.autosave=false;
  if(withEvent)force(h,'royal');else h.rollEvent=()=>null;
  h.morning();
  return {run:h.run,game:h};
 };
 let checked=0;
 for(let i=0;i<40&&checked<6;i++){
  const snap=build('royal-limited-'+i);
  if(!snap)continue;
  const off=run(snap,false),on=run(snap,true);
  if(on.run.event?.id!=='royal')continue;          // the Event must actually have fired
  if(off.queue)throw Error('unreachable');
  const plain=off.run,evt=on.run;
  // the Day really is roster-limited: it wanted more visitors than it had bodies for
  if(plain.queue.length>=plain.expectedVisitors)continue;
  checked++;

  const newcomer=evt.npcs[evt.npcs.length-1];
  // exactly one royal-profile newcomer was generated
  assert.equal(evt.npcs.length,plain.npcs.length+1,'exactly one newcomer was generated');
  assert.ok(!newcomer.introduced||evt.queue.includes(newcomer.id),'the newcomer is the new body');
  // queue length does NOT increase because of the Event
  assert.equal(evt.queue.length,plain.queue.length,
   'a roster-limited Day gains no visitor from the Event: '+evt.queue.length+' vs '+plain.queue.length);
  // the newcomer is in the queue exactly once...
  assert.equal(evt.queue.filter(x=>x===newcomer.id).length,1,'the newcomer visits exactly once');
  // ...by REPLACING an existing selected visitor, not by joining them
  const displaced=plain.queue.filter(x=>!evt.queue.includes(x));
  assert.equal(displaced.length,1,'exactly one already-selected visitor gave up their slot');
  assert.deepEqual(evt.queue.filter(x=>x!==newcomer.id),plain.queue.filter(x=>x!==displaced[0]),
   'and every other slot is the one the Day had already drawn');
  // the intended intake is untouched, and the available cap still holds
  assert.equal(evt.expectedVisitors,plain.expectedVisitors,'the intake did not change');
  assert.ok(evt.queue.length<=evt.visitorBreakdown.available,'the available cap holds');
  // Living NPC Cap is respected - the Event is only eligible with room and takes exactly one
  assert.ok(evt.npcs.filter(n=>n.alive).length<=22,'the Living NPC Cap was not bypassed');
 }
 assert.ok(checked>0,'no roster-limited Day with the royal Event was reached');
});

test('EVENT: the ordinary periodic newcomer is unchanged by the SA-Q45 seat accounting',()=>{
 /* A Day with no Event and no Rookie Board still generates its every-third-Day newcomer, and
    that newcomer takes their chances in the ordinary weighted draw - they are not force-seated,
    so they still count towards the Day's own slot capacity exactly as before. */
 for(let i=0;i<30;i++){
  const g=fresh('periodic-'+i);
  g.rollEvent=()=>null;
  g.run.facilities=[];g.run.dayFacilities=[];   // no Store Support is seating in this case
  let sawPeriodic=false;
  for(let d=0;d<12&&g.run.phase!=='end';d++){
   const s=g.run;s.money=5000;
   if(s.phase==='morning'&&s.day>1&&s.day%3===0){
    sawPeriodic=true;
    assert.ok(!s.dayFacilities.includes('rookieBoard'),'no support is seating here');
    assert.equal(s.event,null,'and no Event is seating here either');
    // the queue is the ordinary min(intake, everyone who could come) - the newcomer included
    const able=s.npcs.filter(n=>n.alive&&!n.recovery).length;
    assert.equal(s.queue.length,Math.min(Math.max(1,s.expectedVisitors),able),
     'D'+s.day+': the ordinary slot count still counts the whole available roster');
   }
   advance(g);
  }
  assert.ok(sawPeriodic||g.run.phase==='end','a periodic intake Day was reached');
 }
});

console.log(count+' event groups passed');
