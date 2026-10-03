// Chunk B acceptance: Event timing, frequency, eligibility and the canonical 23-event catalog.
// Covers EVENT-001/002/003, EVENT sections 1/2/8/9, and the per-event contracts in section 11.
const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('../dist/'+f+'.js');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

function fresh(seed='events'){const g=new Game();g.autosave=false;g.start(seed);g.buyRelic(g.run.relicWindow.candidateIds[0]);return g;}
function advance(g){const s=g.run;if(s.phase==='end')return;g.beginOrder();g.finishOrder();while(s.phase==='sell')g.depart();g.finishNight();g.closeDay();}
// force WHICH Event fires; the canonical day gate and per-event eligibility still decide WHETHER it fires
const force=(g,id)=>{const e=DATA.events.find(x=>x.id===id);g.rollEvent=()=>g.eventEligibleDay(g.run.day)&&g.eventEligible(e)?e:null;};
const CATALOG=['물류대란','본사 1+1 행사','게이트 순례 주간','몬스터 범람','포션 가격 폭등','한파','포션 공급 중단','신입 모험가 시즌','왕립 기사단 방문','암시장 상인','본사 재고 감사','왕도 축제','길드 파업','미확인 게이트','본사 반값 행사','독안개','보급 상단 도착','길드 급여일','치유소 휴무','본사 폐기 유예','늙은 음유시인','본사 야간 근무 수칙','길드 합동 위령제',
 "길드 의료단 순회","길드 의무관 당직","길드 위로금","길드 특별 수당","본사 물류 지원","보험 공동 구매","본사 원정용품 지원","길드 연회","원정 교대 근무","길드 휴양일","단골의 날","길드 현상금","마왕의 징조","입고 지연","가뭄","길드 세금 징수","장맛비","본사 발주 제한","포스기 먹통","가격 단속","퇴각로 붕괴","길드 소집령","냉장고 고장","야시장","원정 징발령","본사 재고 떨이","정예 토벌령","폭염","게이트 임시 폐쇄","길드 훈련 주간","유통기한 임박 특가","게이트 안정화 작업"];

test('EVENT-003: catalog is exactly the canonical 55 (23 → 55 in v2.9.11) with the two rare easter eggs at 0.35',()=>{
 assert.equal(DATA.events.length,55);
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
 // 22 was the pre-Deep baseline; a Run now carries 19 or 20 eligible Days. The chance was not raised to compensate; it is
 // 40% since v2.9.11 (User 2026-09-28), a decision taken with the larger Event pool, not a compensation.
 const eligible=[...Array(31).keys()].filter(d=>g.eventEligibleDay(d)).length;
 assert.equal(eligible,22-deep.length,'each Deep Day removes exactly one eligible Day');
 assert.ok(eligible>=19&&eligible<=20,'19-20 eligible Days per Run: '+eligible);
 // suppression does not depend on anyone being nominated, and costs the run stream no draw
 for(const day of deep)assert.equal(g.eventEligibleDay(day),false,'D'+day+' never rolls an Event');
});

test('EVENT §EVENT SELECTION (User 2026-09-28, v2.9.11): a Run never meets the same Event twice, and the log survives a save',()=>{
 let events=0,repeats=0;
 for(let i=0;i<60;i++){const g=fresh('norepeat-'+i),s=g.run;s.money=99999;
  for(let d=0;d<30&&s.phase!=='end'&&s.day<29;d++){s.money=99999;s.stats.deaths=0;advance(g);}
  const log=s.eventLog;events+=log.length;repeats+=log.length-new Set(log).size;
  assert.ok(log.every(id=>DATA.events.some(e=>e.id===id)),'the log holds catalogue ids only');}
 assert.ok(events>60,'Events did fire across the Runs: '+events);
 assert.equal(repeats,0,'no Event fired twice in one Run');
 // rolling alone records nothing: only the Morning that applies an Event writes the log
 const g=fresh('norepeat-roll'),s=g.run;s.day=[...Array(30).keys()].find(d=>g.eventEligibleDay(d));
 for(let i=0;i<50;i++)g.rollEvent();assert.deepEqual(s.eventLog,[],'rollEvent writes no log');
 // an Event in the log is out of the pool, the others are not
 const first=DATA.events.find(e=>g.eventEligible(e));s.eventLog=[first.id];
 for(let i=0;i<400;i++){const e=g.rollEvent();assert.ok(!e||e.id!==first.id,'the logged Event never comes back');}
 // the log is saved, and a save without it still loads (read as empty)
 const h=fresh('norepeat-save');h.run.eventLog=['logistics','bard'];h.save();
 const back=Save.import(Save.export(h.account,h.run));assert.deepEqual(back.run.eventLog,['logistics','bard'],'the log round-trips');
 const old=JSON.parse(Save.export(h.account,h.run));delete old.run.eventLog;
 assert.doesNotThrow(()=>Save.import(JSON.stringify(old)),'a save from before the log still loads');
 const bad=JSON.parse(Save.export(h.account,h.run));bad.run.eventLog=['no-such-event'];
 assert.throws(()=>Save.import(JSON.stringify(bad)),'an unknown id in the log is refused');
});

/* EVENT 24~55 (User 2026-09-28, v2.9.11): each new effect does what its Function says, on the channel it names. */
test('EVENT 24~55: every new Event effect moves its own channel',()=>{
 const E=id=>DATA.events.find(e=>e.id===id);
 const withEvent=(g,id,fn)=>{const s=g.run,was=s.event;s.event=id?E(id):null;try{return fn();}finally{s.event=was;}};
 const g=fresh('new-events'),s=g.run;s.day=4;
 // buy price by category, and on every Item
 const price=(id,it)=>withEvent(g,id,()=>{const st=g.rng.state,p=g.offerFor(it).price;g.rng=new RNG(s.seed,st);return p;});
 for(const [id,it,m] of [['insurebuy','kit',.7],['gearaid','rope',.7],['drought','water',1.3],['heatwave','water',1.35],['hqlogistics','rice',.85],['clearance','rice',.75],['nearexpiry','rice',.6]]){
  const a=price(null,DATA.itemBy[it]),b=price(id,DATA.itemBy[it]);assert.ok(Math.abs(b-a*m)<=1,id+': '+it+' '+a+' -> '+b);}
 assert.equal(price('insurebuy',DATA.itemBy.rice),price(null,DATA.itemBy.rice),'a category price leaves the other categories alone');
 // operating cost
 for(const [id,add] of [['guildtax',50],['nightmarket',60]])
  assert.equal(g.expectedOperatingCost({event:E(id)})-g.expectedOperatingCost({event:null}),add,id+' +'+add+'G');
 // the door: budget, heal, fatigue, feast
 const door=(id,prep)=>{const h=fresh('door-'+id),t=h.run,n=t.npcs[0];n.traits=[];n.money=100;n.injury=0;n.status='건강';n.fatigue=12;prep&&prep(n);t.event=id?E(id):null;t.queue=[n.id];t.cursor=0;h.arrive();return n;};
 assert.equal(door('guildbonus').eventBudget,40,'길드 특별 수당 +40G to spend');
 assert.equal(door('consolation',n=>{n.injury=1;}).eventBudget,60,'길드 위로금 +60G for an injured visitor');
 assert.equal(door('consolation').eventBudget,0,'and nothing for a healthy one');
 const healed=door('medcorps',n=>{n.injury=1;n.status='부상';});assert.equal(healed.injury,0);assert.equal(healed.healedBy,'medcorps','길드 의료단 heals at the door');
 assert.equal(door('spaday').fatigue,4,'길드 휴양일 피로 -8');assert.equal(door('spaday',n=>{n.fatigue=3;}).fatigue,0,'never below 0');
 const fed=door('banquet'),d0=s.dungeons[0];fed.pack=['rice'];const plain={...fed,feast:0};
 assert.equal(Dungeon.prepare(fed,d0,[]).effects.supply,2*Dungeon.prepare(plain,d0,[]).effects.supply,'길드 연회: a Food recovers double');
 fed.pack=['water'];assert.equal(Dungeon.prepare(fed,d0,[]).effects.supply,Dungeon.prepare({...fed,feast:0},d0,[]).effects.supply,'a Drink is untouched');
 // the night: fatigue halved, EXP x1.5, retreat -10%p, up to two injuries saved - same rolls with and without the Event
 const night=(id,seed)=>{const h=fresh('night-'+seed),t=h.run,n=t.npcs[0],d=t.dungeons[0];n.traits=[];n.pack=[];n.fatigue=0;n.injury=0;
  const run={event:id?E(id):null,daily:{},loadout:{},records:[]};return Dungeon.resolve(n,d,new RNG('same-'+seed),[],run);};
 let fatigueSeen=0,xpSeen=0,escSeen=0,saved=0;
 for(let i=0;i<300;i++){
  const a=night(null,i),b=night('shiftrest',i);if(a.outcome===b.outcome&&a.rawOutcomeFatigueGain>0){assert.equal(b.rawOutcomeFatigueGain,Math.ceil(a.rawOutcomeFatigueGain*.5));fatigueSeen++;}
  const x=night('trainingweek',i);if(a.outcome===x.outcome&&a.xp>0){assert.ok(Math.abs(x.xp-a.xp*1.5)<=1,'EXP x1.5');xpSeen++;}
  const c=night('collapse',i);if(a.debug.escapeChance!=null&&c.debug.escapeChance!=null&&a.debug.escapeChance>.25&&a.debug.escapeChance<.94){assert.ok(Math.abs(a.debug.escapeChance-c.debug.escapeChance-.1)<1e-9,'퇴각 -10%p');escSeen++;}
  const m=night('medicshift',i);if(a.outcome==='부상'&&!a.aftercare){assert.equal(m.injury,0,'길드 의무관: 부상 -> 무사');assert.ok(m.events.some(e=>e.id==='medic'));saved++;}
 }
 assert.ok(fatigueSeen&&xpSeen&&escSeen&&saved,'each night effect was observed: '+[fatigueSeen,xpSeen,escSeen,saved]);
 const cap={event:E('medicshift'),daily:{medicSaves:2},loadout:{},records:[]};
 for(let i=0;i<300;i++){const h=fresh('cap-'+i),n=h.run.npcs[0],d=h.run.dungeons[0];n.traits=[];n.pack=[];n.fatigue=0;n.injury=0;const r=Dungeon.resolve(n,d,new RNG('same-'+i),[],cap);assert.ok(!r.events.some(e=>e.id==='medic'),'no third save');}
 // the Morning: gates, shelf life, the visitor list
 const morning=(id,seed,prep)=>{const h=fresh(seed),t=h.run;force(h,id);prep&&prep(h);for(let k=0;k<40&&t.event?.id!==id;k++){t.money=99999;t.stats.deaths=0;advance(h);if(t.phase==='end')break;}return h;};
 // the Morning, applied directly: a forced Event on a Morning whose Gates and shelf are set up by hand
 const apply=(id,prep)=>{const h=fresh('ev-m-'+id),t=h.run;t.day=6;prep(h,t);h.rollEvent=()=>E(id);h.morningEvent(t.dungeons.map(d=>d.family));return t;};
 {const t=apply('gateclosed',(h,t)=>{t.dungeons=['spider','slime','golem'].map(f=>h.makeDungeon(f,2));});
  assert.equal(t.dungeons.length,2,'게이트 임시 폐쇄: one of three Gates closes');
  /* User 2026-09-30: the closed Gate is kept aside for the screens (`오늘 폐쇄`), not among the open ones */
  assert.equal(t.closedGates.length,1,'the closed Gate is recorded');
  assert.ok(!t.dungeons.some(d=>d.id===t.closedGates[0].id)&&['spider','slime','golem'].includes(t.closedGates[0].family),'it is one of the three and no longer open');}
 {const t=apply('safegates',(h,t)=>{t.dungeons=['spider','slime'].map(f=>h.makeDungeon(f,3));t.closedGates=[h.makeDungeon('golem',1)];});
  assert.deepEqual(t.closedGates,[],'a Morning without the Event clears the record of the one before');}
 {const t=apply('safegates',(h,t)=>{t.dungeons=['spider','slime'].map(f=>h.makeDungeon(f,3));});
  assert.ok(t.dungeons.every(d=>d.tier===1),'게이트 안정화 작업: every Gate Tier 1');
  assert.deepEqual(t.dungeons.map(d=>d.family),['spider','slime'],'the Families stay');}
 {const t=apply('fridgebreak',(h,t)=>{t.inventory=[];h.stock('rice',1);h.stock('rope',1);});
  const [rice,rope]=t.inventory;assert.equal(rice.expires,6+2-1,'냉장고 고장: Food -1 Day');assert.equal(rope.expires,6+5,'Field Gear untouched');}
 {const h=fresh('ev-near'),t=h.run;t.phase='order';t.event=E('nearexpiry');h.stock('rope',1);assert.equal(t.inventory.at(-1).expires,t.day+1,'유통기한 임박 특가: today only');t.event=null;}
 // ORDER: same-SKU cap, no reroll
 {const h=fresh('ev-order'),t=h.run;t.phase='order';t.money=99999;t.event=E('ordercap');const i=t.offers.findIndex(o=>o.quantity>=3);
  if(i>=0){assert.throws(()=>h.validateCart({[i]:3}),/2개까지만 발주/);assert.doesNotThrow(()=>h.validateCart({[i]:2}));assert.equal(h.quantityLimit(i).reason,'cap');}
  t.event=E('noreroll');assert.throws(()=>h.reroll(),/발주 교환을 할 수 없습니다/);t.event=null;}
 // SALE: 바가지 closed, drink intent up
 {const h=fresh('ev-sale'),t=h.run;t.phase='sell';const n=t.npcs[0];n.traits=[];n.money=9999;n.pack=[];n.refused=[];t.queue=[n.id];t.cursor=0;h.stock('water',1);
  t.event=E('pricewatch');assert.equal(h.sell(t.inventory.at(-1).id,'overcharge'),false,'가격 단속: no 바가지 sale');assert.equal(n.pack.length,0);
  /* a drink that does not meet the Gate's Hazard, so its chance is not the Counter ceiling */
  const drink=['coffee','herbtea','energy'].find(id=>{t.event=null;return h.interest(n,DATA.itemBy[id],'full').chance<.87;});
  t.event=null;const a=h.interest(n,DATA.itemBy[drink],'full').chance;t.event=E('heatwave');const b=h.interest(n,DATA.itemBy[drink],'full').chance;assert.ok(b>a,'폭염 raises drink intent: '+drink+' '+a+' -> '+b);t.event=null;}
 // eligibility: an Event whose subject is absent today is out of the pool
 {const h=fresh('ev-elig'),t=h.run;for(const n of t.npcs){n.injury=0;n.loyalty=0;}t.inventory=[];
  for(const id of ['medcorps','consolation','regularday','fridgebreak'])assert.equal(h.eventEligible(E(id)),false,id+' needs its subject');
  t.npcs[0].injury=1;assert.equal(h.eventEligible(E('medcorps')),true);t.npcs[1].loyalty=80;t.npcs[1].introduced=true;assert.equal(h.eventEligible(E('regularday')),true);
  h.stock('rice',1);assert.equal(h.eventEligible(E('fridgebreak')),true);
  t.dungeons=t.dungeons.slice(0,1);assert.equal(h.eventEligible(E('gateclosed')),false,'one Gate cannot close');}
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

test('EVENT-001: daily chance is 40% (v2.9.11; was 35%), never the retired 74%',()=>{
 // an ordinary eligible Day for this Run: D7 is a candidate Deep window, and on a Run that
 // actually holds it the chance is 0 by design rather than 40%.
 const g=fresh('rate');g.run.day=[...Array(30).keys()].find(d=>g.eventEligibleDay(d));
 let fired=0;const N=6000;
 for(let i=0;i<N;i++)if(g.rollEvent())fired++;
 const rate=fired/N;
 assert.ok(Math.abs(rate-.40)<.03,'observed daily event rate '+rate.toFixed(3));
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
 s.dungeons=[{...g.makeDungeon('golem',2)}];assert.equal(g.eventEligible(cold),false,'fire Gate only -> 한파 excluded');
 s.dungeons=[{...g.makeDungeon('spider',2)}];assert.equal(g.eventEligible(cold),true);
 assert.equal(g.eventEligible(fog),false,'poison Gate only -> 독안개 excluded');
 s.dungeons=[{...g.makeDungeon('snow',2)}];assert.equal(g.eventEligible(fog),true);
});

test('EVENT 8-1: an Event-revealed Hazard is immediately Known and never doubled',()=>{
 const g=fresh('known');force(g,'coldwave');
 let guard=0;while(guard++<40){g.run.money=5000;advance(g);if(g.run.event?.id==='coldwave')break;}
 assert.equal(g.run.event?.id,'coldwave','coldwave reached');
 const touched=g.run.dungeons.filter(d=>d.hazards.includes('cold'));
 assert.ok(touched.length,'at least one Gate carries cold');
 for(const d of g.run.dungeons){
  assert.equal(d.hazards.filter(h=>h==='cold').length<=1,true,'cold is never doubled');
  if(d.hazards.includes('fire'))assert.ok(!d.hazards.includes('cold'),'fire Gate never receives cold');
 }
 assert.ok(Relics.known(g).includes('cold'),'Event Hazard is inside Known Hazards for coverage/pity logic');
});

test('EVENT 03: 게이트 순례 주간 needs two Gates and three expected visitors, and hides the change until Night',()=>{
 const g=fresh('pilgrim'),s=g.run,pil=DATA.events.find(e=>e.id==='pilgrimage');
 s.dungeons=[g.makeDungeon('spider',1)];s.expectedVisitors=5;assert.equal(g.eventEligible(pil),false,'one Gate -> excluded');
 s.dungeons=[g.makeDungeon('spider',1),g.makeDungeon('snow',1)];s.expectedVisitors=2;assert.equal(g.eventEligible(pil),false,'too few visitors -> excluded');
 s.expectedVisitors=3;assert.equal(g.eventEligible(pil),true);

 const h=fresh('pilgrim-run');force(h,'pilgrimage');
 let guard=0;while(guard++<60){h.run.money=5000;advance(h);if(h.run.event?.id==='pilgrimage'&&h.run.pilgrimage>0)break;}
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
   let guard=0;while(guard++<60){g.run.money=5000;advance(g);if(g.run.event?.id==='payday')break;}
   assert.equal(g.run.event?.id,'payday');
   g.beginOrder(); g.open();
   const visitors=[];
   while(g.run.phase==='sell'){
    const n = g.current();
    visitors.push(n);
    assert.ok(n.eventBudget>0,'visitors receive a temporary budget on arrival');
    // CORE_RUN §FIRST-RUN LESSONS DAY 3: the payday lesson's +200G stacks on the Event budget for that visit
    assert.equal(n.eventBudget,Math.round(n.money*.2)+(g.run.firstRun&&n.lessonPayday===g.run.day?200:0));
    g.depart();
   }
   g.rollEvent=()=>null;
   g.finishNight(); g.closeDay();
   g.beginOrder(); g.open();
   assert.ok(g.run.npcs.every(n=>!n.eventBudget),'the Event bonus is gone the next day');
});

test('EVENT 18 + RICH: arrival order applies rich +50, cap 2000, then eventBudget', () => {
   const g = fresh('payday-rich'); force(g, 'payday');
   let guard=0;while(guard++<60){g.run.money=5000;advance(g);if(g.run.event?.id==='payday')break;}
   const n = g.run.npcs[0];
   n.traits = ['rich'];
   n.money = 1980;
   g.run.queue = [n.id];
   g.run.cursor = 0;
   g.beginOrder(); g.open();
   assert.equal(n.money, 2000, 'rich +50 caps at 2000');
   assert.equal(n.eventBudget, Math.round(2000 * 0.2)+(g.run.firstRun&&n.lessonPayday===g.run.day?200:0), 'eventBudget is calculated on post-rich capped Wallet');
   g.depart();
   g.rollEvent=()=>null;
   g.finishNight(); g.closeDay();
});

test('EVENT 02: 본사 1+1 delivers double units for a single order cost',()=>{
 const g=fresh('promo');force(g,'oneplus');
 let guard=0;while(guard++<60){g.run.money=5000;advance(g);if(g.run.event?.id==='oneplus')break;}
 const s=g.run,i=s.offers.findIndex(o=>o.promo);
 assert.ok(i>=0,'a promo SKU is designated');
 g.beginOrder();
 const before=s.inventory.length,gold=s.money,price=s.offers[i].price;
 g.order(i);
 assert.equal(s.inventory.length,before+2,'two units arrive');
 assert.equal(s.money,gold-price,'only one unit is paid for');
 assert.equal(s.offers.filter(o=>o.promo).length,1,'exactly one designated SKU');
 // User 2026-09-29: a Reroll ends the promotion - the new sheet carries no 1+1, and a second Reroll does not bring it back
 s.money=5000;g.reroll();assert.equal(s.offers.filter(o=>o.promo).length,0,'a Reroll ends the 1+1');
 g.reroll();assert.equal(s.offers.filter(o=>o.promo).length,0,'and it does not come back');
});

test('EVENT 10: 암시장 keeps its one special slot through a Reroll (User 2026-09-29)',()=>{
 const g=fresh('bm');force(g,'blackmarket');
 let guard=0;while(guard++<60){g.run.money=5000;g.run.stats.deaths=0;advance(g);if(g.run.event?.id==='blackmarket'||g.run.phase==='end')break;}
 const s=g.run;assert.equal(s.event?.id,'blackmarket','the Event was reached');
 g.beginOrder();assert.equal(s.offers.filter(o=>o.origin==='blackmarket').length,1,'one special slot');
 s.money=5000;g.reroll();assert.equal(s.offers.filter(o=>o.origin==='blackmarket').length,1,'still one after a Reroll');
});

test('EVENT 20/22: 본사 폐기 유예 gives only tonight\'s waste one more day; 야간 근무 수칙 zeroes overhead',()=>{
 /* v2.9.10 quick patch (User 2026-09-28): the Event was a refund of the overnight waste's cost; it is now a one-day delay
    for the stock whose last sale day is today, and only that stock */
 const g=fresh('subsidy'),s=g.run;force(g,'wastecover');
 while(s.day<2)advance(g);
 g.stock('rice',3);g.stock('ramen',2);
 const rice=s.inventory.filter(st=>st.item==='rice'),ramen=s.inventory.filter(st=>st.item==='ramen');
 for(const st of rice)st.expires=s.day+2;   // its last sale day is tomorrow, the Event's Day
 for(const st of ramen)st.expires=s.day+3;  // it still has a day to spare then
 advance(g); // the Event's morning
 assert.equal(s.event?.id,'wastecover');
 assert.equal(s.event.name,'본사 폐기 유예');
 for(const st of rice)assert.equal(st.expires,s.day+2,'tonight\'s waste now lasts until tomorrow');
 for(const st of ramen)assert.equal(st.expires,s.day+2,'stock that was not due tonight is untouched');
 assert.equal(s.daily.subsidy||0,0,'no refund any more');
 // the delayed units (a customer may buy some along the way - those simply leave with the customer)
 const ids=new Set(rice.map(st=>st.id));
 g.rollEvent=()=>null;s.money=5000;advance(g); // the next morning: the delayed stock is still on the shelf, on its last sale day
 assert.ok(s.inventory.filter(st=>ids.has(st.id)).every(st=>st.expires===s.day+1),'kept one more day, not more');
 s.money=5000;advance(g); // one more: the delay is spent and the stock goes as waste does
 assert.ok(!s.inventory.some(st=>ids.has(st.id)),'the delayed stock leaves when its day runs out');

 const h=fresh('overhead');force(h,'nightshift');
 let guard=0;while(guard++<60){h.run.money=5000;advance(h);if(h.run.event?.id==='nightshift')break;}
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
 /* the Day-based rule is the one rule: the same draws give the same Level with or without a rookie flag */
 for(const day of [2,9,21])for(let i=0;i<20;i++){const a=globalThis.Meta.fresh(),seed='rookie-rule-'+day+'-'+i;
  assert.equal(globalThis.Adventurer.create(new globalThis.RNG(seed),i,day,a,{rookie:true}).level,globalThis.Adventurer.create(new globalThis.RNG(seed),i,day,a).level,'the Day-based rule is the one rule');}

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

 /* one seating rule serves rookie and royal - there is no second writer (the Rookie Board seat
    left with the 2026-09-23 remake to 첫 방문 쿠폰) */
 const shop=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../dist/systems/shop.js'),'utf8');
 const seat=shop.match(/if\(\(ev\.rookie\|\|ev\.royal\)&&arrival[^\n]*/g)||[];
 /* v2.9.0 (User 2026-09-25): plus the one empty-morning case, where the newcomer is the Day's only visitor */
 assert.equal(seat.length,2,'one deterministic seating rule and its empty-morning case');
 assert.ok(/selected\[selected\.length-1\]=arrival/.test(seat[0]),'and it replaces a slot rather than adding one');
 assert.ok(/&&!selected\.length\)selected\.push\(arrival\)/.test(seat[1]),'the empty morning seats the newcomer alone');
});

test('EVENT §08 v2.9.0 (User 2026-09-25): on a morning with no existing slot the newcomer is the Day\'s only visitor',()=>{
 let seen=0;
 for(let i=0;i<40&&seen<3;i++){
  const g=fresh('no-slot-'+i);
  // reach a morning that can hold a Normal Event and is not a third-day intake (which would add a drawable body)
  for(let d=0;d<12&&g.run.phase!=='end'&&!(g.eventEligibleDay(g.run.day+1)&&(g.run.day+1)%3!==0);d++){g.run.money=5000;advance(g);}
  if(g.run.phase==='end'||!g.eventEligibleDay(g.run.day+1))continue;
  for(const n of g.run.npcs){n.recovery=3;n.injury=2;}      // nobody can be drawn tomorrow
  const snap=Save.export(g.account,g.run);
  const run=withEvent=>{const r=Save.import(snap);const h=new Game(r.account,r.run);h.autosave=false;if(withEvent)force(h,'rookie');else h.rollEvent=()=>null;h.run.day++;h.morning();return h.run;};
  const plain=run(false),evt=run(true);
  if(evt.event?.id!=='rookie')continue;
  seen++;
  assert.equal(plain.queue.length,0,'without the Event the Day seats nobody');
  const newcomer=evt.npcs[evt.npcs.length-1];
  assert.deepEqual(evt.queue,[newcomer.id],'the newcomer is the only visitor');
  assert.equal(evt.expectedVisitors,plain.expectedVisitors,'the intake itself did not change');
 }
 assert.ok(seen>0,'the no-slot morning was reached');
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
   /* EVENT §08 v2.9.0 (User 2026-09-25): a morning that would seat nobody seats the newcomer alone */
   if(plain.queue.length===0){assert.deepEqual(evt.queue,[evt.npcs[evt.npcs.length-1].id],id+': on an empty morning the newcomer is the only visitor');continue;}
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
    assert.ok(!s.dayFacilities.includes('firstVisitCoupon'),'no support is seating here');
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

test('NPC_TRAIT destinationDefault (User 2026-09-25): with as many visitors as Gates, every open Gate is claimed by someone',()=>{
 let days=0,covered=0,fixes=0;
 for(let k=1;k<=40;k++){const g=fresh('gate-cover-'+k);
  for(let d=0;d<30&&g.run.phase!=='end';d++){const s=g.run;
   if(s.phase==='morning'&&s.dungeons.length>1&&s.queue.length>=s.dungeons.length){days++;
    const claimed=new Set(s.queue.map(id=>s.npcs.find(n=>n.id===id).claimedDestination));
    if(claimed.size===s.dungeons.length)covered++;}
   s.money=5000;advance(g);}}
 assert.ok(days>50,'enough multi-Gate Days were seen: '+days);
 assert.equal(covered,days,'every multi-Gate Day with enough visitors covers every Gate');
 const src=require('node:fs').readFileSync(require('node:path').join(__dirname,'../dist/systems/shop.js'),'utf8');
 assert.ok(/n\.destination===n\.claimedDestination&&selected\.filter/.test(src),'a visitor a 거짓말쟁이 roll already diverted is never the one moved');
});
console.log(count+' event groups passed');
