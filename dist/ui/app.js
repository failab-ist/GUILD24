(function(){
'use strict';
const D=DATA,E=Art.esc,$=s=>document.querySelector(s),fmt=n=>Math.round(n).toLocaleString('ko-KR');
let stored=Save.read(),game=new Game(stored?.account||Meta.fresh(),stored?.run||null),selected=null,modal=null,codexTab='items',contract='standard',supplyNPC=null,toastTimer,previousFocus=null;
const badge=(r,npc=false)=>`<span class="rare-badge r${r}">${(npc?D.npcRarities:D.rarities)[r]}</span>`;
const btn=(text,action,cls='',attrs='')=>`<button class="${cls}" data-action="${action}" ${attrs}>${text}</button>`;
const groupStock=()=>{const m=new Map();for(const st of game.run.inventory){if(!m.has(st.item))m.set(st.item,{...st,count:0});const x=m.get(st.item);x.count++;if(st.expires!==null&&(x.expires===null||st.expires<x.expires)){x.id=st.id;x.expires=st.expires;}}return [...m.values()];};
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3400);}
function sound(kind='sale'){Sound.sync(game.account.settings.muted,game.run?.phase);Sound.play(kind==='rare'?'relic':kind);}
function setModal(value){if(modal==='event'&&value!=='event'&&game.run&&!game.run.eventSeen){game.run.eventSeen=true;game.save();}$('#coach-root').innerHTML='';previousFocus=document.activeElement;modal=value;renderModal();if(value){document.body.style.overflow='hidden';setTimeout(()=>$('#modal-root button, #modal-root input')?.focus(),0);}else{document.body.style.overflow='';previousFocus?.focus?.();}requestAnimationFrame(showCoach);}
let lastPhase=null;
// ---- stage primitives ----------------------------------------------------
// The only frame every Phase shares: a non-scrolling 100dvh box, one scroll surface,
// one dock. What goes in them, and how they look, belongs to the Phase.
// ---- stage ----------------------------------------------------------------
// The only frame every Phase shares: a 100dvh box that never scrolls, one scroll
// surface, one dock. What goes in them belongs to the Phase, not to a shell.
const menuFab=()=>'<button class="menu-pin" data-action="menu" aria-label="게임 메뉴">'+Art.glyph('menu',24)+'</button>';
const pips=(total,at)=>'<span class="pips" aria-hidden="true">'+Array.from({length:Math.min(total,12)},(_,k)=>'<i class="'+(k===at?'now':k<at?'on':'')+'"></i>').join('')+'</span>';
const sigilOf=d=>D.dungeonBy[d.family&&d.family!=='final'?d.family:d.id]||D.dungeonBy[d.id]||{};
function stage(phase,label,head,body,dock){
 return '<div class="stage p-'+phase+'">'+menuFab()+(head||'')
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="'+label+'">'+body+'</main>'
 +(dock?'<div class="dock">'+dock+'</div>':'')+'</div>';
}
// ---- game feel ------------------------------------------------------------
// anime.js (MIT, vendored at ui/vendor/) drives the presentation beats: the shutter
// lifting, the till counting up, notices settling on the board, the approval stamp
// landing. Presentation only — every one of these is a no-op when the library is
// absent or the player asked for reduced motion, and none of them touch game state.
const motionOK=()=>typeof anime==='object'&&!!anime.animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastTill=null;
function playPhase(phase){
 if(!motionOK())return;
 const A=anime.animate;
 if(phase==='morning'){
  const shutter=$('.band.ceiling .band-art');
  if(shutter)A(shutter,{translateY:[-14,0],duration:420,ease:'outQuad'});
  const slips=[...document.querySelectorAll('.pinned .slip')];
  if(slips.length)A(slips,{translateY:[-10,0],opacity:[0,1],duration:260,delay:anime.stagger(70),ease:'outQuad'});
  const till=$('.till .coin');
  if(till){const to=game.run.money,from=lastTill===null?to:lastTill;lastTill=to;
   if(from!==to){const box={v:from};A(box,{v:to,duration:520,ease:'outQuad',onUpdate:()=>{till.textContent=fmt(box.v);}});}}
 }
 if(phase==='order'){
  const form=$('.form');
  if(form)A(form,{translateY:[16,0],opacity:[0,1],duration:280,ease:'outQuad'});
 }
 if(phase==='night'){
  const beat=$('.beat');
  if(beat)A(beat,{scale:[.96,1],opacity:[0,1],duration:300,ease:'outQuad'});
 }
}
// the approval stamp lands before the phase advances
function stampPress(el){
 if(!motionOK()||!el)return;
 anime.animate(el,{scale:[1.08,1],duration:180,ease:'outQuad'});
}
function render(){
 const s=game.run;Sound.sync(game.account.settings.muted,s?.phase);
 if(!s){$('#app').innerHTML=stage('start','새 점포','','<p class="eyebrow">GUILD24</p><h2 class="welcome-title">오늘도 문을 연다.</h2><p class="muted">초기 자금 1,200G · 창고 24칸 · 30일 영업</p>'+(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':''),btn('첫 영업 준비','new','stamp'));if(!modal)setModal('new');return;}
 const phase=s.phase,previousScroll=$('.stage-scroll')?.scrollTop||0;
 $('#app').innerHTML=phase==='morning'?morningScreen():phase==='order'?orderScreen():phase==='sell'?saleScreen():phase==='night'?nightScreen():phase==='closing'?closingScreen():phase==='final'?finalScreen():phase==='end'?endScreen():stage('start','첫 점포지원','','<div class="relic-open"><span class="label">DAY 0</span><h2>첫 점포지원</h2><p class="muted">하나를 고르면 영업이 시작된다.</p></div>','');
 const viewKey=phase+':'+(phase==='sell'?s.cursor:phase==='night'?s.nightCursor:'');const changed=lastPhase!==viewKey;lastPhase=viewKey;
 const scroller=$('.stage-scroll');if(scroller){scroller.scrollTop=changed?0:previousScroll;if(changed)$('#phase-content').focus({preventScroll:true});}
 // An Event is the Morning opening beat and comes before Gate detail; a new milestone window opens once.
 if(phase==='foundation')modal='relics';else if(phase==='morning'&&s.event&&!s.eventSeen)modal='event';else if(s.relicWindow&&!s.relicWindow.focusedRevealSeen&&['morning','order','final'].includes(phase))modal='relics';
 renderModal();requestAnimationFrame(showCoach);if(changed)playPhase(phase);
}
// Every named Hazard states its canonical pressure inline. Nothing is hover-only,
// nothing is left name-only (UI-005, UI-Q35, DUN-Q21).
// Every named Hazard carries its canonical pressure inline — burned into the notice,
// never behind a hover (UI-005, UI-Q35, DUN-Q21).
const hazardList=(keys,states)=>keys.length?'<ul class="hazards">'+Presentation.hazardRows(keys).map(h=>{
 const st=states&&states.find(x=>x.key===h.key);
 return '<li data-hazard="'+h.key+'"><b>'+E(h.name)+'</b><span>'+E(h.pressure)+'</span>'+(st?'<em class="'+(['취약','불안'].includes(st.label)?'lack':'')+'">'+st.label+'</em>':'')+'</li>';}).join('')+'</ul>':'';
// A Gate is a plank notice nailed to the wall: family colour burned along the top edge,
// the gate mark branded into it, the supply requirement stamped underneath.
// A Gate is a paper notice pinned to the board: family colour along the top, the hazard
// pictogram beside each pressure line, the supply requirement stamped at the foot.
function gatePlate(d){const b=sigilOf(d);
 return '<article class="slip gate" style="--fam:'+(b.color||'#caa46a')+'"><span class="pin"></span>'
 +'<span class="crest">'+Art.mark(b.id||d.id,28)+'</span>'
 +'<b>'+E(d.name)+'</b>'
 +'<ul class="hazards">'+Presentation.hazardRows(Presentation.known(d,game)).map(h=>
   '<li data-hazard="'+h.key+'">'+Scene.hazardIcon(h.key,18)+'<i>'+E(h.name)+'</i><span>'+E(h.pressure)+'</span></li>').join('')+'</ul>'
 +(d.requiredSupply?'<span class="stamp-line load">보급 '+d.requiredSupply+' 필요</span>':'<span class="foot">보급 부담 없음</span>')
 +'</article>';}
function tierLine(){const f=game.tierForecast();return f?'T1 '+f.percent[0]+'% · T2 '+f.percent[1]+'% · T3 '+f.percent[2]+'%':'마왕성 최종 원정';}
function specialUI(){const s=game.run,e=s.special;if(!e||e.used)return '';if(e.kind==='route'){const n=game.current();if(s.phase!=='sell'||!n||n.pack.length||n.history.some(h=>h.day===s.day)||s.dungeons.length<2)return '';return '<details class="special-event"><summary>길드 원정 배치조정 · 오늘 한 번</summary><p>아직 거래하지 않은 '+E(n.name)+'의 목적지를 바꿀 수 있습니다.</p>'+s.dungeons.map((d,i)=>btn(E(d.name),'special','','data-id="'+n.id+'" data-value="'+i+'"')).join('')+'</details>';}if(!['morning','order'].includes(s.phase))return '';const candidates=s.npcs.filter(n=>n.alive&&n.introduced);return '<details class="special-event"><summary>'+(e.kind==='remove'?'길드 상담 · 특성 하나 정리':'길드 특별 훈련 · 새 특성 배우기')+'</summary>'+candidates.map(n=>{const choices=e.kind==='remove'?n.traits.filter(t=>D.traitBy[t].direction==='negative'):e.candidates.filter(t=>!n.traits.includes(t)&&n.traits.length<Math.min(4,n.traitSlots)&&!D.traitExclusions.some(pair=>pair.includes(t)&&pair.some(id=>n.traits.includes(id))));return choices.length?'<div><b>'+E(n.name)+'</b>'+choices.map(t=>btn(D.traitBy[t].name+' · '+Presentation.traitText(t),'special','','data-id="'+n.id+'" data-value="'+t+'"')).join('')+'</div>':'';}).join('')+'<p>원하지 않으면 선택하지 않아도 됩니다. 오늘 영업 준비가 끝나면 기회가 지나갑니다.</p></details>';}
// MORNING — situation / open. The day as a plate, Gates as objects, a HUD readout,
// the store as a horizon strip behind it all.
// MORNING — a place, seen from the doorway before the shutter goes up.
// The store scene is the screen; the day hangs in it as a sign and the day's numbers
// are chalked on a slate propped against the counter. Gates are plank notices below.
// MORNING — the store is the screen. The room is built out of horizontal bands
// (ceiling and shutter, shelving wall, notice board, counter) and the interface hangs on
// those surfaces: the day on the shop sign, today's gates pinned to the board, the till
// showing the float, the store support sitting on the counter.
function morningScreen(){
 const s=game.run;
 return '<div class="stage p-morning">'+menuFab()
 +'<div class="store">'
  +'<div class="band ceiling"><span class="mount">'+Scene.ceiling()
   +'<span class="daysign" style="'+Scene.anchorStyle('daysign')+'"><i>DAY</i><b>'+String(s.day).padStart(2,'0')+'</b></span></span></div>'
  +'<div class="band wall">'+Scene.wall(s.day)+'<span class="branchplate">'+E(s.branch)+'</span></div>'
  +'<div class="board" id="phase-content" tabindex="-1" aria-label="아침">'
   +'<p class="board-rail" id="visitor-count">오늘의 원정<b>손님 '+s.queue.length+'</b><b>게이트 '+s.dungeons.length+'</b></p>'
   +'<div class="pinned">'+(s.event?eventSlip(s.event):'')+s.dungeons.map(gatePlate).join('')+specialUI()+'</div></div>'
  +'<div class="band counter"><span class="mount">'+Scene.counter()
   +'<span class="till-cap" style="'+Scene.anchorStyle('tillLabel')+'">보유</span>'
   +'<span class="till" style="'+Scene.anchorStyle('till')+'" aria-label="보유 자금 '+fmt(s.money)+'G"><b class="coin">'+fmt(s.money)+'</b><i>G</i></span>'
   +relicTray()+'</span></div>'
 +'</div>'
 +'<div class="dock">'+relicWindowLink()+'<button class="pull" data-action="begin-order"><span>문 열기</span></button></div></div>';
}
// The Event stays on the board as the notice it is, after its focused reveal.
function eventSlip(e){
 return '<button class="slip event" data-action="event-again"><span class="pin"></span>'
 +'<span class="stamp-line">오늘의 게시</span><b>'+E(e.name)+'</b><span class="body">'+E(e.description)+'</span></button>';}
// Store support sits on the counter as small brass plates, not a list.
function relicTray(){const owned=game.ownedRelics();if(!owned.length)return '';
 return '<span class="tray">'+owned.slice(0,5).map(r=>'<button class="plate" data-action="relics">'+E(r.name)+'</button>').join('')
 +(owned.length>5?'<button class="plate more" data-action="relics">+'+(owned.length-5)+'</button>':'')+'</span>';}
// Owned store support reads as small brass plates screwed to the wall, not a list.
function relicStrip(){const owned=game.ownedRelics();if(!owned.length)return '';
 return '<div class="relic-strip"><span class="lab">점포지원</span>'+owned.map(r=>'<button class="plate" data-action="relics">'+E(r.name)+'</button>').join('')+'</div>';}
function relicWindowLink(){const w=game.run.relicWindow;if(!game.canBuyRelic())return '';
 return '<button class="brass" data-action="relics">점포지원<br>'+(w.milestoneDay===0?'무료':'D'+(w.expiryDay-1)+'까지')+'</button>';}
// The readiness readout. Qualitative only: 우세/접전/불리 and 취약/불안/대응/충분.
function readout(n,extra=null){
 const compact=!!extra,d=game.run.dungeons[n.claimedDestination??n.destination]||game.run.dungeons[0];
 const v={...n,traits:Presentation.traits(n),pack:extra?[...n.pack,extra]:n.pack},p=Dungeon.prepare(v,d,game.run.facilities);
 return '<div class="readout"><div class="top"><span>전투 전망<b>'+Dungeon.estimate(v,d,game.run.facilities)+'</b></span>'
 +'<span>'+(p.supply.required?'보급<b>'+Math.round(p.supply.actual)+' / '+p.supply.required+'</b>':'보급 부담 없음')+'</span></div>'
 +hazardList(p.hazards.map(h=>h.key),p.hazards)
 +(compact?'':'<p class="estimate">지금의 능력과 준비로 본 예상. 실제 원정은 달라질 수 있다.</p>')+'</div>';}
function returningSummary(n){const r=Presentation.returning(n);if(!r)return '';
 return '<aside class="since" aria-label="지난 방문 이후"><b>지난 원정 · DAY '+r.day+' '+E(r.outcome)+'</b>'+(r.changes.length?'<p>'+r.changes.map(E).join(' · ')+'</p>':'')+(r.impact?'<p>'+E(r.impact)+'</p>':'')+'</aside>';}
function saleScreen(){
 const s=game.run,n=game.current();
 if(!n)return stage('sale','영업','','<p class="muted">영업을 마치는 중입니다.</p>','');
 const body='<div class="stagelight">'+Art.scene(game)+'</div>'
 +'<button class="customer" data-action="npc" data-id="'+n.id+'"><span class="portrait">'+Art.avatar(n,76)+'</span>'
 +'<span class="who"><span class="name">'+E(n.name)+'</span><span class="job">Lv.'+n.level+' '+D.jobBy[n.job].name+'</span><span class="purse">소지금 '+fmt(n.money)+'G</span></span><span class="go">기록 ></span></button>'
 +'<div class="loyal"><span>단골도</span><span class="track"><span style="width:'+Math.min(100,n.loyalty)+'%"></span></span><span>'+n.loyalty+'</span></div>'
 +returningSummary(n)+destPlate(n)+statGrid(n)+traitRows(n)+kitLine(n)+readout(n)+specialUI()+shelf()+ownedRelicView();
 const dock='<div class="queue"><span>손님 '+(s.cursor+1)+' / '+s.queue.length+'</span>'+pips(s.queue.length,s.cursor)+'</div>'
 +btn(s.cursor+1===s.queue.length?'영업 종료':'손님 보내기','depart','stamp');
 return stage('sale','영업','',body,dock);
}
function kitLine(n){const slots=Adventurer.slots(n),parts=[n.status];
 if(n.injury)parts.push('부상 '+n.injury);if(n.fatigue)parts.push('피로 '+n.fatigue);if(n.recovery)parts.push('휴식 '+n.recovery+'일');
 return '<div class="kit"><span>상태 <b>'+parts.join('</b> · <b>')+'</b></span><span>'+E(n.equipment.name)+'</span>'
 +'<span class="slots" aria-label="보급 '+n.pack.length+' / '+slots+'칸"><b class="slot-label">가방</b>'+Array.from({length:slots},(_,i)=>'<i class="'+(n.pack[i]?'full':'')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],20):'')+'</i>').join('')+'</span></div>';}
// NIGHT — a result beat, not a report. One returning adventurer, the outcome as a
// display word, WHAT_HAPPENED -> WHY -> WHAT_CHANGED read down the page. A routine
// return collapses to a quiet inline line; consequence takes the whole beat.
function nightScreen(){
 const s=game.run,at=s.nightCursor||0,r=s.results[at],last=at+1>=s.results.length;
 const body='<div class="night-head"><span class="label">밤의 귀환</span>'+pips(s.results.length,at)+'</div>'
 +(s.pilgrimage?'<p class="event-note">게이트 순례주간 · 실제 변경 '+s.pilgrimage+'명</p>':'')
 +(r?beat(r):'<p class="muted">오늘은 원정에 나선 손님이 없었다.</p>');
 const dock=btn('건너뛰기','night-skip','bare',last?'disabled':'')+btn('전체 건너뛰기','closing','bare')
 +btn(last?'정산으로':'다음','night-next','stamp');
 return stage('night','밤','',body,dock);
}
function beat(r){
 const n=game.run.npcs.find(x=>x.id===r.npcId),grave=r.outcome==='사망',hurt=['중상','부상','퇴각'].includes(r.outcome);
 const heavy=weighty(r);
 return '<article class="beat '+(grave?'grave ':hurt?'hurt ':'')+(heavy?'':'quiet')+'"><span class="portrait">'+Art.avatar(n,heavy?92:52)+'</span>'
 +'<p class="verdict">'+E(r.rescued&&!grave?'위기에서 귀환':r.outcome)+'</p>'
 +'<h3 class="who">'+E(r.name)+'</h3><p class="place">'+E(r.dungeonName)+' · Lv.'+r.level+'</p>'
 +(r.routeChange?'<p class="route">'+E(r.routeChange)+'</p>':'')
 +'<p class="what">'+E(outcomeReason(r))+'</p>'
 +'<p class="why">'+whyLine(r)+'</p>'
 +'<div class="changed">'+changedRows(r)+'</div>'
 +((r.events||[]).length?'<p class="influence">'+E(r.events[0].text)+'</p>':'')
 +(heavy?'<blockquote>'+E(r.quote)+'</blockquote>':'')+'</article>';
}
// Importance decides presentation weight: a quiet return must not cost the same
// screen time as a death or a level-up (UI-Q31).
function weighty(r){return r.outcome!=='성공'||r.rescued||r.avoidedDeath||(r.events||[]).length>0||(r.changes||[]).some(c=>c.startsWith('Lv.')||c.startsWith('새 특성'));}
function whyLine(r){const bits=[];
 if(r.combatWon===false)bits.push('적을 물리치지 못했다.');else if(r.combatWon===true)bits.push('적을 물리쳤다.');
 if(r.environmentHurt)bits.push(r.cause&&r.cause!=='accident'?(D.hazards[r.cause]||'보급 부담')+' 때문에 원정 내내 고전했다.':'원정 중 예상치 못한 사고가 있었다.');
 return E(bits.join(' '));}
function changedRows(r){const out=[];
 (r.changes||[]).slice(0,3).forEach(c=>out.push('<p class="up">'+E(c)+'</p>'));
 (r.statChanges||[]).slice(0,4).forEach(x=>out.push('<p class="up">'+Presentation.labels[x.key]+' '+Math.round(x.before)+' → '+Math.round(x.after)+'</p>'));
 if(r.recovery)out.push('<p class="down">휴식 '+r.recovery+'일</p>');
 else if(r.injury)out.push('<p class="down">남은 부상 · 강인함 -'+(r.injury*5)+' · 투력 -'+(r.injury*3)+'</p>');
 out.push('<p>경험치 +'+r.xp+' · 전리품 '+r.loot+'G</p>');
 return out.join('');}
// CLOSING — economics. The one place a ledger belongs, so it is a slip of paper.
function closingScreen(){
 const s=game.run,d=s.daily,margin=d.revenue-d.cogs;
 const profit=margin+(d.subsidy||0)+(d.commission||0)-d.operating-(d.wasteCost||0)-(d.rerollSpent||0);
 const line=(label,value)=>'<div><span>'+label+'</span><b>'+fmt(value||0)+'</b></div>';
 const impact=s.results.filter(r=>r.events?.length).slice(0,3);
 const body='<div class="slip"><div class="head"><b>GUILD24</b><span>DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span></div>'
 +'<div class="lines">'+line('매출',d.revenue)+line('판매 원가',-d.cogs)
 +'<div class="sum"><span>판매 마진</span><b>'+fmt(margin)+'</b></div>'
 +line('운영비',-d.operating)+line('폐기 원가',-d.wasteCost)+line('발주 교환',-d.rerollSpent)+line('본사 지원·수당',(d.subsidy||0)+(d.commission||0))+'</div>'
 +'<div class="profit'+(profit<0?' loss':'')+'"><span>영업 손익</span><b>'+(profit>0?'+':'')+fmt(profit)+'</b></div>'
 +'<div class="lines">'+line('발주 지출',-d.spent)+line('점포지원 투자',-d.relicSpent)+line('재고 정리',d.liquidation)+'</div>'
 +'<div class="purse"><span>보유 자금</span><b>'+fmt(s.money)+'G</b></div>'
 +(impact.length?'<div class="impact"><h4>오늘의 보급 영향</h4>'+impact.map(r=>'<p><b>'+E(r.name)+'</b> '+E(r.events[0].text)+'</p>').join('')+'</div>':'')
 +'<p class="foot">미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.</p></div><div class="slip-edge" aria-hidden="true"></div>';
 const dock=(s.money<0?'<p class="danger-text">운영비가 부족하다.</p>'+btn('재고 정리','stock')+btn('폐점','retire','danger'):'')+btn('다음 날','close','stamp');
 return stage('closing','마감','',body,dock);
}
const coachSteps={
 morning:[['visitors','#visitor-count','오늘 방문할 인원이다. 시설·계약·사건에 따라 달라진다.'],['gates','.notices','열린 게이트가 어떤 능력을 압박하는지 보고 준비할 상품을 생각해 보자.']],
 order:[['gold','#order-register','수량을 고르는 동안 보유 자금과 발주 후 자금이 여기 남는다.'],['quantity','.dial','수량을 고른다. 같은 상품을 여러 개 발주할 수 있다.'],['reroll','.rubber','발주 후보 전체를 교환한다. 같은 날 반복할수록 비용이 올라간다.'],['confirm','.dock .stamp','발주를 확정하면 현재 재고로 영업을 시작한다.']],
 sell:[['npc','.customer','손님을 눌러 특성과 원정 기록을 살펴보자.','npc'],['destination','.dest-plate','이 손님이 향할 게이트다. 특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.'],['forecast','.readout','원정 전망은 지금의 능력과 준비로 본 예상이다. 실제 결과는 예상과 달라질 수 있다.'],['inventory','.good','진열대 전체에서 고른다. 판매한 소비품은 오늘 원정에서 쓰인다.'],['pricing','.tills','50%는 손님에게 투자, 100%는 기본 거래, 150%는 지금의 수입을 늘리는 선택이다.']],
 night:[['result','.beat','한 명씩 결과와 원인, 변화를 확인한다. 건너뛰기로 넘기거나 전체 건너뛰기로 정산에 갈 수 있다.']],
 closing:[['receipt','.slip','판매 마진에서 운영비와 폐기를 뺀 영업 손익이다. 발주와 점포지원 투자는 아래에 따로 적힌다.']]
};
let activeCoach=null;
function showCoach(){
 const root=$('#coach-root');if(!root)return;root.innerHTML='';activeCoach=null;
 const tutorial=game.account.tutorial||{};if(tutorial.skipped||modal)return;
 const steps=coachSteps[game.run?.phase]||[],step=steps.find(x=>!tutorial['coach-'+x[0]]);if(!step)return;
 const target=$(step[1]);if(!target||!target.getClientRects().length)return;
 const view=target.getBoundingClientRect();if(view.top<80||view.bottom>innerHeight-100){target.scrollIntoView({block:'center',behavior:'instant'});}
 const b=target.getBoundingClientRect(),left=Math.max(4,b.left-4),top=Math.max(4,b.top-4),width=Math.min(innerWidth-left-4,b.width+8),height=Math.min(b.height+8,180),bottom=top+height;
 const bw=Math.min(340,innerWidth-24),bh=210,x=Math.max(12,Math.min(innerWidth-bw-12,left)),y=bottom+bh+12<innerHeight?bottom+12:Math.max(12,top-bh-12);
 const block=(l,t,w,h)=>'<div class="coach-block" style="left:'+l+'px;top:'+t+'px;width:'+Math.max(0,w)+'px;height:'+Math.max(0,h)+'px"></div>';
 root.innerHTML='<div class="coach-layer">'+block(0,0,innerWidth,top)+block(0,bottom,innerWidth,innerHeight-bottom)+block(0,top,left,height)+block(left+width,top,innerWidth-left-width,height)+'<div class="coach-focus" style="left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px"></div><section class="coach-bubble" role="dialog" aria-label="점주 안내" style="left:'+x+'px;top:'+y+'px;width:'+bw+'px"><small>점주 안내</small><p>'+step[2]+'</p><div>'+btn('안내 건너뛰기','coach-skip','coach-skip')+btn(step[3]?'눌러서 살펴보기':'다음','coach-next','stamp')+'</div></section></div>';
 activeCoach=step;
}
function finishCoach(skip=false){
 if(!activeCoach&&!skip)return;game.account.tutorial??={};if(skip)game.account.tutorial.skipped=true;else game.account.tutorial['coach-'+activeCoach[0]]=true;game.save();$('#coach-root').innerHTML='';activeCoach=null;requestAnimationFrame(showCoach);
}
window.addEventListener('resize',()=>{if(activeCoach)showCoach();});
function effectList(it,compact=false){const rows=Presentation.rows(it.effects);const html=r=>`<li class="${r.bad?'effect-bad':''}"><span>${E(r.label)}</span><b>${r.text}</b></li>`;return `<ul class="effects">${rows.slice(0,compact?4:rows.length).map(html).join('')}</ul>${compact&&rows.length>4?`<details><summary>전체 효과</summary><ul class="effects">${rows.slice(4).map(html).join('')}</ul></details>`:''}`;}
function traitRows(n){return `<div class="trait-list">${Presentation.traits(n).map(t=>{const tr=D.traitBy[t];return `<div class="trait-row"><b>${E(tr.name)}</b><span>${Presentation.traitEffects(t).map(r=>`<em class="tone-${r.tone}">${E(r.label+' '+r.text)}</em>`).join('')}</span>${tr.note?`<small>${E(tr.note)}</small>`:''}</div>`;}).join('')}</div>`;}
function destPlate(n){const d=game.run.dungeons[n.claimedDestination??n.destination];if(!d)return '';const b=sigilOf(d);
 return '<div class="dest-plate" style="--fam:'+(b.color||'#cbd5b6')+'">'+Art.mark(b.id||d.id,32)
 +'<div><label>예상 목적지</label><h3>'+E(d.name)+'</h3>'+hazardList(Presentation.known(d,game))+'</div></div>';}
function statGrid(n){const values=Dungeon.prepare({...n,traits:Presentation.traits(n)},game.run.dungeons[n.claimedDestination??n.destination]||game.run.dungeons[0],game.run.facilities).effects;
 return '<div class="detail-stats">'+Adventurer.keys.map(k=>'<div class="detail-stat"><label>'+Presentation.labels[k]+'</label><strong>'+Math.round(values[k])+'</strong></div>').join('')+'</div>';}
// ORDER — a paper, filled. The back room: dark wood and shelving. One order form
// clipped to the board; offers are ruled lines on it with a price tag hanging off the
// right edge and a stamped counter dial. No store scene anywhere in this composition.
function orderScreen(){
 return stage('order','발주','',orderForm(),'<button class="stamp" data-action="finish-order">'+(game.cartTotal()?'발주 '+fmt(game.cartTotal())+'G · 확정':'영업 시작')+'</button>');
}
function orderForm(){const s=game.run,total=game.cartTotal(),after=s.money-total,price=game.rerollPrice(),held=total;
 return '<div class="clip"></div><div class="form">'
 +'<div class="form-head"><h1>발주서</h1><span class="docno">DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span>'
 +'<span class="seal">'+Scene.seal(48,'#2f7a4d')+'</span></div>'
 // the ledger: labels step back, the three figures align on one column, the result leads
 +'<div class="ledger" id="order-register" aria-label="발주 자금">'
 +'<div><span>보유</span><b>'+fmt(s.money)+'</b></div>'
 +'<div class="pick"><span>선택 발주</span><b>'+(total?'-'+fmt(total):'0')+'</b></div>'
 +'<div class="out'+(after<0?' short':'')+'"><span>발주 후</span><b>'+fmt(after)+'<i>G</i></b></div></div>'
 // two groups: what today needs, and the signal for tomorrow's order
 +'<div class="brief"><div class="when"><span class="k">오늘</span>'
 +'<p><b>'+s.queue.length+'명</b> · '+E(s.dungeons.map(d=>d.name).join(' / '))+'<button class="look" data-action="gates">위험 보기</button></p></div>'
 +'<div class="when"><span class="k">내일</span><p class="tier">'+tierLine()+'</p></div></div>'
 +'<ol class="lines">'+s.offers.map((o,i)=>{const it=D.itemBy[o.item],q=s.cart?.[i]||0,max=game.maxQuantity(i),rows=Presentation.rows(it.effects).slice(0,3);
  return '<li class="line r'+it.rarity+(q?' on':'')+'">'
  +'<span class="no">'+String(i+1).padStart(2,'0')+'</span>'
  +Scene.crate(Art.itemIcon(it.id,30),46)
  +'<span class="col">'
   +'<span class="nm"><b>'+E(it.name)+'</b>'+Scene.priceTag(it.sell+'<i>G</i>')+'</span>'
   +'<span class="kind">'+D.categories[it.category]+' · '+it.roles.map(r=>D.roles[r]).join(' / ')+'</span>'
   +'<span class="fx">'+rows.map(r=>'<i class="'+(r.bad?'cost':'')+'">'+E(r.label+' '+r.text)+'</i>').join('<em> · </em>')+'</span>'
   +'<span class="have">매입 '+o.price+'G · 이익 +'+(it.sell-o.price)+'G · 재고 '+s.inventory.filter(st=>st.item===it.id).length+' · 공급 '+o.quantity+(o.promo?' · 1+1':'')+'</span>'
  +'</span>'
  +'<span class="dial">'+btn('-','qty','','data-index="'+i+'" data-q="'+Math.max(0,q-1)+'" aria-label="'+E(it.name)+' 수량 줄이기" '+(q?'':'disabled'))
   +'<output aria-label="'+E(it.name)+' 발주 수량">'+q+'</output>'
   +btn('+','qty','','data-index="'+i+'" data-q="'+(q+1)+'" aria-label="'+E(it.name)+' 수량 늘리기" '+(q>=max?'disabled':''))
   +'<span class="set">'+[1,3].map(v=>btn(v,'qty','','data-index="'+i+'" data-q="'+v+'" aria-label="'+E(it.name)+' '+v+'개" '+(v>max?'disabled':''))).join('')+btn('최대','qty','','data-index="'+i+'" data-q="'+max+'"')+'</span></span></li>';
 }).join('')+'</ol>'
 +'<button class="rubber" data-action="reroll" '+(price>s.money||held?'disabled':'')+'>후보 전체 교환 · '+fmt(price)+'G'+(price?'':' · 발주 교환권')+'</button>'
 +(held?'<p class="note">선택한 수량을 0으로 되돌리면 후보를 교환할 수 있다.</p>':'')
 +(s.phase==='final'?'<button class="rubber" data-action="confirm-order" '+(held?'':'disabled')+'>발주 확정</button>':'')
 +'</div>';}
function shelf(isFinal=false){const s=game.run,stocks=groupStock();
 return '<section class="shelf"><div class="shelf-head"><h2>'+(isFinal?'대원에게 보급':'진열대')+'</h2><span>'+stocks.length+'종 · '+s.inventory.length+'개</span></div><div class="goods">'
 +stocks.map(st=>{const it=D.itemBy[st.item],open=selected===st.id;
  return '<button class="good r'+it.rarity+(open?' open':'')+'" data-action="select" data-id="'+st.id+'" aria-expanded="'+open+'">'
  +'<span class="tile">'+Art.itemIcon(it.id,32)+'</span><span class="what"><b>'+E(it.name)+'</b><span>'+Presentation.rows(it.effects).slice(0,2).map(r=>E(r.label+' '+r.text)).join(' · ')+'</span></span>'
  +'<span class="price"><b>'+it.sell+'G</b><span>재고 '+st.count+'</span></span></button>'+(open?till():'');}).join('')
 +'</div>'+(stocks.length?'':'<p class="muted">진열대가 비었다.</p>')+'</section>';}
function till(){const s=game.run,st=s.inventory.find(x=>x.id===selected),n=s.phase==='final'?s.npcs.find(x=>x.id===supplyNPC):game.current();
 if(!st||!n)return '';
 const it=D.itemBy[st.item],isFinal=s.phase==='final',full=n.pack.length>=Adventurer.slots(n);
 const changes=Presentation.preview(n,s.dungeons[n.claimedDestination??n.destination]||s.dungeons[0],s.facilities,it.id);
 const actions=isFinal?btn('<strong>'+E(n.name)+'에게 보급</strong>','supply','stamp',full?'disabled':'')
 :['half','full','overcharge'].map(mode=>{const q=game.interest(n,it,mode),pct=Math.round(D.pricing[mode].mult*100);
   const blocked=q.debit>n.money?'소지금 부족':n.refused.includes(it.id+':'+mode)?'오늘 거절됨':full?'가방 가득':'';
   return btn('<em>'+pct+'%</em><strong>'+q.price+'G</strong><small>'+(blocked||'이익 '+(q.price-st.cost)+'G')+'</small>','sell',mode==='full'?'stamp':'',
    'data-mode="'+mode+'" aria-label="'+pct+'% '+q.price+'G'+(blocked?' · '+blocked:'')+'" '+(blocked?'disabled':''));}).join('');
 return '<div class="tillpanel"><h4>보급 후 변화</h4><ul class="effects">'
 +(changes.length?changes.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after)+'</b></li>').join(''):'<li><span>이 손님의 준비는 달라지지 않는다</span><b></b></li>')
 +'</ul>'+readout(n,it.id)
 +'<details><summary>전체 효과 · 상품 설명</summary>'+effectList(it)+'<p class="smalltext">'+E(it.description)+'</p></details>'
 +'<p class="smalltext">'+(st.expires===null?'유통기한 없음':'폐기까지 '+(st.expires-s.day)+'일')+' · 가장 먼저 폐기될 재고부터 나간다</p>'
 +'<div class="tills">'+actions+'</div></div>';}
function outcomeReason(r){if(r.outcome==='사망')return '전투에서 밀린 뒤 돌아오지 못했다.';if(r.avoidedDeath)return '보급이 마지막 순간의 사망을 막았다.';if(r.outcome==='중상')return '큰 부상을 입었다. 회복할 시간이 필요하다.';if(r.outcome==='퇴각')return '원정은 끝내지 못했지만 무사히 빠져나왔다.';if(r.outcome==='부상')return (r.combatWon??r.debug?.combatSuccess)?'전투를 이겼지만 돌아오는 길은 험했다.':'원정을 끝내지 못하고 다친 채 돌아왔다.';return r.outcome==='대성공'?'예상보다 일찍 게이트에서 나왔다.':'원정을 마치고 돌아왔다.';}
function eventReveal(){const e=game.run.event;if(!e)return '';return '<div class="event-reveal"><p class="flavor">'+E(e.reveal)+'</p><p class="effect">'+E(e.description)+'</p></div>';}
function ownedRelicView(){const owned=game.ownedRelics();if(!owned.length)return '';return '<details class="owned-relics"><summary>보유 점포지원 '+owned.length+'/7</summary>'+owned.map(r=>'<div><b>'+E(r.name)+'</b><p>'+E(r.description)+'</p></div>').join('')+'</details>';}
function relicTakeover(){const s=game.run,w=s.relicWindow;
 if(!w)return '<div class="relic-takeover" role="dialog" aria-modal="true" aria-label="점포지원"><div class="scroll"><div class="relic-open"><span class="label">점포지원</span><h2>지금 고를 지원이 없다</h2><p>다음 지원은 5일 단위 영업일에 도착한다.</p></div></div><div class="close">'+btn('닫기','dismiss','stamp')+'</div></div>';
 if(!w.focusedRevealSeen){w.focusedRevealSeen=true;game.save();}
 const first=w.milestoneDay===0,until=w.expiryDay===31?'마왕성 출발 전까지':'DAY '+(w.expiryDay-1)+'까지';
 return '<div class="relic-takeover" role="dialog" aria-modal="true" aria-label="점포지원"><div class="scroll">'
 +'<div class="relic-open"><span class="label">'+(first?'DAY 0':'DAY '+w.milestoneDay)+'</span><h2>'+(first?'첫 점포지원을 고른다':'점포지원이 도착했다')+'</h2>'
 +'<p>'+(first?'하나는 무료다. 고르면 영업이 시작된다.':until+' 구매할 수 있다 · 자금 '+fmt(s.money)+'G')+'</p></div>'
 +(w.purchased?'<p class="discovery">설치 완료 · '+E(D.relicBy[w.purchased].name)+'</p>':'')
 +'<div class="relic-choices">'+w.candidateIds.map((id,i)=>{const r=D.relicBy[id],price=w.candidatePrices[i],mine=w.purchased===id;
  return '<article class="relic-plate'+(mine?' owned':'')+'"><h3>'+E(r.name)+'</h3><p>'+E(r.description)+'</p>'
  +'<span class="cost">'+(price?fmt(price)+'G':'무료')+'</span>'
  +btn(mine?'설치됨':'구매','buy-relic','stamp','data-id="'+id+'" '+(!game.canBuyRelic()||s.money<price?'disabled':''))+'</article>';}).join('')+'</div></div>'
 +'<div class="close">'+(first?'<p>하나를 골라야 영업이 시작된다.</p>':'<p>보류해도 후보와 가격은 그대로 남는다.</p>'+btn('나중에 결정','dismiss','stamp'))+'</div></div>';}
function endBanner(){const s=game.run,a=game.account;
 return '<div class="end-banner"><span class="eyebrow">'+(s.win?'THE GATE IS CLOSED':'END OF THIS RUN')+'</span><h2>'+(s.win?'우리가 키운 애들이, 해냈다.':'이번 점포의 영업이 끝났다.')+'</h2><p>'+E(s.endReason)+'</p>'
 +'<div class="row wrap"><span class="meta-xp">점주 XP +'+(s.metaReward||0)+'</span><span class="muted">가맹등급 '+a.grade+' · 누적 '+a.xp+' XP · '+a.runs+'번째 런</span>'+btn('해금 확인','codex','bare')+'</div></div>';}
function npcCard(n,action='npc'){const s=game.run;return `<button class="npc-card r${n.rarity} ${!n.alive?'dead':''} ${s.team.includes(n.id)?'chosen':''}" data-action="${action}" data-id="${n.id}" ${action==='team'&&(!n.alive||n.recovery)?'disabled':''}><div class="row">${Art.avatar(n,56)}<div>${badge(n.rarity,true)}<h3 style="margin-top:5px">${E(n.name)}</h3><p>Lv.${n.level} ${Adventurer.rank(n)}</p><p>${n.status}${n.recovery?' · '+n.recovery+'일 휴식':''} · 방문 ${n.visits}회</p></div></div><div class="loyalty"><div class="row between"><span>단골도 ${n.loyalty}</span><span>${action==='team'?(s.team.includes(n.id)?'선택됨':'원정대 선택'):'기록 보기'}</span></div><div class="bar"><span style="width:${n.loyalty}%"></span></div></div></button>`;}
// FINAL — climax. Both Families are disclosed above every choice; party and supply
// follow; the D30 Relic decision is reachable before lock (FINAL_EXPEDITION §3, §4.1).
function finalScreen(){
 const s=game.run,d=s.dungeons[0],need=game.finalRequired();
 if(!s.team.includes(supplyNPC))supplyNPC=s.team[0]||null;
 const roster=s.npcs.filter(n=>n.alive&&n.introduced).sort((a,b)=>b.level-a.level);
 const body='<div class="gate-zero">'+Art.mark('final',56)+'<span class="label">제 0 게이트</span><h1>마왕성</h1></div>'
 +'<section class="threat"><h2>확인된 위협</h2><div class="fams">'
 +(d.families||[]).map(id=>{const b=D.dungeonBy[id];return '<span class="fam" style="--fam:'+b.color+'">'+Art.mark(b.id,24)+E(b.name)+'</span>';}).join('')
 +'</div>'+hazardList(d.hazards)+'</section>'
 +'<div class="party-head"><h2>원정대</h2><span class="count">'+s.team.length+' / '+need+'</span></div>'
 +'<div class="npc-grid">'+roster.map(n=>npcCard(n,'team')).join('')+'</div>'
 +(s.team.length?'<div class="final-team">'+s.team.map(id=>{const n=s.npcs.find(x=>x.id===id);
   return '<button class="final-member'+(supplyNPC===id?' active':'')+'" data-action="supply-target" data-id="'+id+'"><b>'+E(n.name)+'</b><div class="pack">'
   +Array.from({length:Adventurer.slots(n)},(_,i)=>'<div class="slot '+(n.pack[i]?'filled':'')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],28):'빈 칸')+'</div>').join('')+'</div></button>';}).join('')+'</div>':'')
 +shelf(true)
 +'<details class="final-order"><summary>마지막 발주 · 상품과 점포지원 사이의 선택</summary>'+orderForm()+'</details>'
 +ownedRelicView();
 const dock=relicWindowLink()+(need?btn('마왕성으로 출발','boss','stamp',s.team.length===need?'':'disabled'):btn('출전 불가 · 런 종료','retire','danger'));
 return stage('final','최종 원정','',body,dock);
}
function endScreen(){const s=game.run;
 return stage('end','영업 종료','',endBanner()+s.results.map(beat).join(''),btn('다음 점포 열기','new','stamp'));}
function rosterList(){const s=game.run;if(!s)return '<p class="muted">첫 영업을 시작하면 모험가 수첩이 열린다.</p>';
 return '<p class="smalltext">이름을 누르면 마지막 보급과 원정 기록을 볼 수 있다. 사망한 모험가의 기록도 남는다.</p><div class="npc-grid">'
 +s.npcs.filter(n=>n.introduced).sort((a,b)=>Number(b.alive)-Number(a.alive)||b.loyalty-a.loyalty).map(n=>npcCard(n)).join('')+'</div>';}
function npcDetail(id){const n=game.run.npcs.find(n=>n.id===id);if(!n)return '';return `<div class="npc-detail"><div class="identity">${Art.avatar(n,92)}<div>${badge(n.rarity,true)}<h2>${E(n.name)} · Lv.${n.level}</h2><p>${Adventurer.rank(n)} · ${n.status}</p><p>단골도 ${n.loyalty} · 방문 ${n.visits}회</p></div></div>${game.run.phase==='sell'&&game.current()?.id===n.id?destPlate(n):''}${statGrid(n)}${traitRows(n)}<p>${E(n.equipment.name)} · 투력 +${n.equipment.power}</p><p>남은 부상 ${n.injury} · 피로 ${n.fatigue} · 휴식 ${n.recovery}일</p><p class="muted">${n.loyalty>=51?'성장 잠재력: '+(n.potential>=1.18?'빠른 성장':n.potential>=1.1?'꾸준한 성장':'착실한 성장'):'더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.'}</p><h3>원정 기록</h3>${n.records.slice().reverse().map(r=>`<div class="history-row"><b>DAY ${r.day} · ${E(r.dungeonName)} · ${r.outcome}</b><p>${r.items.map(i=>D.itemBy[i].name).join(' + ')||'보급 없음'}</p>${r.routeChange?`<p>${E(r.routeChange)}</p>`:''}</div>`).join('')||'<p>아직 원정 기록이 없다.</p>'}<h3>구매 영수증</h3>${n.history.slice(-12).reverse().map(h=>`<div class="history-row">DAY ${h.day} · ${D.itemBy[h.item].name} · ${Presentation.modeLabel(h.mode)} ${fmt(h.paid)}G</div>`).join('')}</div>`;}
function unlockProgress(key){if(!key)return '기본 제공';const [label,target]=D.unlocks[key];const val=game.account.progress[key]||0;return game.account.unlocked.includes(key)?'해금 완료':`${label} ${Math.min(val,target)}/${target}`;}
function codex(){const a=game.account;let list=codexTab==='items'?D.items:codexTab==='jobs'?D.jobs:codexTab==='facilities'?D.relics:codexTab==='contracts'?D.contracts:[];return `<div class="row between wrap" style="margin-bottom:18px"><div><h3>본사 가맹등급 ${a.grade} · ${fmt(a.xp)} XP</h3><p class="smalltext">${['','신입 점주','초기자금 +50G','일반 상품 +1 추가','기본 창고 +2 추가','리롤 비용 감소 추가','첫 던전 정보 +1 추가'][a.grade]} · 이전 등급 혜택 누적</p></div><span class="muted">${a.runs}회 영업 · ${a.wins}회 마왕 토벌</span></div><details><summary>발견 수첩 · ${(a.discoveries||[]).length}개</summary>${(a.discoveries||[]).map(e=>`<p class="discovery">${E(e.text)}</p>`).join('')||'<p>아직 기록된 발견이 없다.</p>'}</details><div class="tabs">${[['items','상품 '+D.items.length],['jobs','직업 6'],['facilities','점포지원 '+D.relics.length],['monsters','몬스터 지식'],['contracts','시작 계약']].map(([id,label])=>btn(label,'codex-tab',codexTab===id?'small active':'small',`data-id="${id}"`)).join('')}</div><div class="unlock-grid">${codexTab==='monsters'?D.dungeons.map(d=>{const seen=a.knowledge[d.id]||0;return `<div class="unlock ${seen?'':'locked'}"><h3>${seen?d.monster:'???'}</h3><p>${d.name} · 보급 생환 ${seen}회</p><p>${seen?d.hazards.slice(0,seen>=3?3:1).map(h=>D.hazards[h]).join(' · '):'위험 특성 ???'}</p><p>${seen>=5?'약점: '+d.weakness:'약점 ???'}</p></div>`;}).join(''):list.map(it=>`<div class="unlock ${it.unlock&&!a.unlocked.includes(it.unlock)?'locked':''}">${codexTab==='items'?Art.itemIcon(it.id,42):''}<h3>${E(it.name)}</h3><p>${E(it.description||'길드 등록 직업.')}</p>${it.effects?effectList(it):''}<p class="gold-text" style="margin-top:8px">${unlockProgress(it.unlock)}</p></div>`).join('')}</div>`;}
function stockModal(){const s=game.run;return `<p class="muted" style="margin-bottom:15px">유통기한은 입고일부터 계산합니다. 재고 정리는 상품 기본 매입가의 50%를 회수합니다.</p><div class="unlock-grid">${groupStock().map(st=>{const it=D.itemBy[st.item];return `<div class="unlock">${Art.itemIcon(it.id,43)}<h3>${it.name} ×${st.count}</h3><p>${st.expires===null?'유통기한 없음':(st.expires-s.day)+'일 남음'}</p>${['morning','order','night','closing','final'].includes(s.phase)?btn('1개 정리 +'+Math.floor(it.buy*.5)+'G','liquidate','small',`data-id="${st.id}"`):''}</div>`;}).join('')||'<p>창고가 비어 있습니다.</p>'}</div>`;}
function newRun(){return `<div class="eyebrow">길드리테일 가맹 계약</div><h2 class="welcome-title">오늘도 문을 연다.</h2><p class="muted">기본 자금 1,200G · 창고 24칸 · 마왕성 개방까지 30일.</p><div class="welcome-band">계약서를 접어 카운터 아래 넣었다. 시작 재고는 창고에 있다.</div><h3 style="margin-bottom:10px">시작 계약</h3><div class="contract-grid">${D.contracts.map(c=>{const locked=c.unlock&&!game.account.unlocked.includes(c.unlock);return `<button class="contract ${contract===c.id?'active':''}" data-action="contract" data-id="${c.id}" ${locked?'disabled':''}><strong>${c.name}${locked?' · 잠김':''}</strong><span class="muted">${c.description}</span>${locked?'<br><small>'+unlockProgress(c.unlock)+'</small>':''}</button>`;}).join('')}</div><details style="margin-top:15px"><summary class="smalltext">재현용 Seed 지정</summary><label class="smalltext" for="seed">비워 두면 새로운 Seed로 시작합니다.</label><input id="seed" class="seed-field" placeholder="예: guild24-first-shift" maxlength="80"></details>${game.run&&game.run.phase!=='end'?'<p class="danger-text" style="margin-top:14px">진행 중인 점포는 여기서 마감됩니다. 점주 XP를 받고 새로운 런을 시작합니다.</p>':''}`;}
function settings(){return `<div class="stack"><p>자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.</p><div class="row wrap">${btn('저장 내보내기','export','stamp')}${btn('저장 가져오기','import')}</div><div class="row wrap">${btn(game.account.settings.muted?'소리 켜기':'소리 끄기','sound')}</div><hr style="border:0;border-top:1px solid var(--line);width:100%"><p class="muted">게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.</p>${game.run&&game.run.phase!=='end'?btn('현재 런 마감 · 새 점포 준비','new','danger'):''}<small>버전 0.4 · 로컬 실행 지원 · 외부 연결 없음</small></div>`;}
function help(){return `<div class="stack"><h3>점포지원</h3><p>DAY 0에는 무료로 하나를 선택합니다. DAY 5·10·15·20·25·30에는 자금을 써서 구매합니다. 사지 않은 후보는 다음 구매 기회 전날까지 보류할 수 있습니다. 판매 중에는 구매할 수 없습니다.</p><h3>발주</h3><p>기본 방문객은 3~6명. 시설·계약·이벤트와 활동 가능한 모험가 수에 따라 달라집니다. 아침에 표시된 인원은 오늘 실제 방문할 인원입니다. 게이트는 초반 1곳에서 후반 최대 3곳까지 열리고, 임시 게이트가 추가될 수 있습니다.</p><p>수량을 고른 뒤 발주를 확정합니다. 남은 재고와 유통기한, 운영비도 확인하세요.</p><h3>판매와 관계</h3><p>목적지·능력·특성을 보고 상품을 고릅니다. 바가지는 수입과 관계를 맞바꾸고, 반값은 이익을 포기해 손님에게 투자합니다. 정가는 기본 거래입니다. 같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.</p><p>단골도는 구매 의사와 재방문에 영향을 줍니다. 능력을 직접 올리지는 않습니다. 숨겨진 특성은 관계가 쌓이면 공개됩니다.</p><h3>원정과 마감</h3><p>판매한 소비품은 그날 원정에서 사용됩니다. 기본 2칸, Lv.10부터 최대 3칸입니다. 밤에는 귀환 결과를 보고, 마감에서 거래와 보급의 작용을 확인합니다.</p><p>사망은 이번 영업에서 영구적입니다. 중상은 며칠의 휴식이 필요합니다. 30일에는 마지막 발주와 점포지원을 결정하고, 최대 3명에게 보급해 마왕성으로 보냅니다.</p><p>영업이 끝나면 상품 해금·몬스터 지식·발견·가맹등급은 남습니다. 모험가·재고·돈·설비는 다음 영업에 이어지지 않습니다.</p><p>적자일 때는 재고 정리로 운영비를 충당할 수 있습니다. 시간을 재촉하는 제한은 없습니다.</p></div>`;}
function renderModal(){const root=$('#modal-root');if(!modal){root.innerHTML='';document.body.style.overflow='';return;}
 if(modal==='relics'){root.innerHTML=relicTakeover();document.body.style.overflow='hidden';return;}
 let title='',body='',footer='',narrow=false;const s=game.run;
 if(modal==='new'){title='새 점포 준비';body=(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':'')+newRun();footer=btn('첫 점포지원 고르기','start','stamp');narrow=true;}
 else if(modal==='event'){title=E(s.event?.name||'오늘의 사건');body=eventReveal();footer=btn('오늘 상황 보기','event-seen','stamp');narrow=true;}
 else if(modal==='gates'){title='오늘 열린 게이트';body='<div class="gate-plates">'+s.dungeons.map(gatePlate).join('')+'</div>';}
 else if(modal==='menu'){title='점포 메뉴';body='<div class="menu-list">'+btn('모험가 수첩','roster')+btn('본사 · 도감','codex')+btn('점주 가이드','help')+btn('설정 · 저장','settings')+btn('소리 켜기 / 끄기','sound')+'</div>';narrow=true;}
 else if(modal==='roster'){title='모험가 수첩';body=rosterList();}
 else if(modal.startsWith('npc:')){title='우리 점포의 모험가';body=npcDetail(modal.slice(4));footer=btn('수첩으로','roster');}
 else if(modal==='codex'){title='본사 · 해금 도감';body=codex();}
 else if(modal==='stock'){title='창고 재고';body=stockModal();}
 else if(modal==='help'){title='점주 가이드';body=help();narrow=true;}
 else if(modal==='settings'){title='영업 설정';body=settings();narrow=true;}
 else if(modal==='bossConfirm'){title='제0게이트 — 마지막 출발';body='<p>선택한 원정대가 마왕성으로 출발합니다. 남은 슬롯과 보급을 확인하셨나요?</p>';footer=btn('보급으로 돌아가기','dismiss')+btn('최종 원정 시작','boss-go','stamp');narrow=true;}
 else if(modal==='retireConfirm'){title='이번 영업을 마감할까요?';body='<p>현재 런의 자원과 모험가는 다음 런으로 이어지지 않습니다. 지금까지의 활동으로 점주 XP를 받습니다.</p>';footer=btn('계속 영업','dismiss')+btn('폐점 · 보상 받기','retire-go','danger');narrow=true;}
 else if(modal==='importConfirm'){title='저장 파일 가져오기';body='<p>현재 브라우저의 진행을 가져온 저장으로 교체합니다. 기존 진행을 남기려면 먼저 내보내 주세요.</p>';footer=btn('저장 내보내기','export')+btn('파일 선택','import-go','stamp');narrow=true;}
 else if(modal==='debug'){title='개발용 Debug · 일반 플레이 비노출';body=`<pre class="debug">${E(JSON.stringify({seed:s.seed,rngState:s.rngState,lastRNG:game.rng.last,offers:s.offers.map(o=>({...o,rarity:D.itemBy[o.item].rarity})),npc:game.current(),dungeons:s.dungeons,results:s.results.map(r=>({name:r.name,outcome:r.outcome,...r.debug})),boss:s.bossDebug},null,2))}</pre>`;}
 root.innerHTML=`<div class="modal-shade"><section class="modal ${narrow?'narrow':''}" role="dialog" aria-modal="true" aria-label="${E(title)}"><div class="modal-header"><h2>${title}</h2>${game.run?.phase!=='foundation'&&(game.run||modal!=='new')?btn('닫기','dismiss','bare','aria-label="창 닫기"'):''}</div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}</section></div>`;document.body.style.overflow='hidden';
}
async function action(el){const a=el.dataset.action,id=el.dataset.id,s=game.run;const oldUnlocks=[...game.account.unlocked];try{
 if(activeCoach&&activeCoach[3]===a)finishCoach();
 switch(a){
 case'coach-skip':finishCoach(true);break;
 case'coach-next':{const actionName=activeCoach?.[3];finishCoach();if(actionName==='npc')setModal('npc:'+game.current().id);break;}
 case'special':game.specialAction(id,el.dataset.value);render();break;
 case'menu':setModal('menu');break;
 case'begin-order':game.beginOrder();render();break;
 case'finish-order':game.finishOrder();render();break;
 case'shop':setModal(null);break;
 case'new':contract='standard';setModal('new');break;
 case'contract':contract=id;renderModal();break;
 case'start':{const seed=$('#seed')?.value.trim()||'g24-'+Date.now().toString(36);if(s&&s.phase!=='end')game.end(false,'점주가 영업을 마감했습니다.');game.start(seed,contract);selected=null;setModal(null);render();break;}
 case'qty':game.setQuantity(Number(el.dataset.index),Number(el.dataset.q));sound('quantity');render();break;
 case'confirm-order':game.confirmOrder();sound('order');render();break;
 case'night-skip':{let i=(s.nightCursor||0)+1;while(i<s.results.length&&!weighty(s.results[i]))i++;s.nightCursor=Math.min(s.results.length,i);if(s.nightCursor>=s.results.length)game.finishNight();game.save();render();break;}
 case'night-next':s.nightCursor=Math.min(s.results.length,(s.nightCursor||0)+1);if(s.nightCursor>=s.results.length)game.finishNight();game.save();render();const result=s.results[s.nightCursor];if(result)sound(result.outcome==='사망'?'death':result.outcome==='중상'?'severe':result.outcome==='부상'?'injury':result.outcome==='대성공'?'great':result.discoveries?.length?'discovery':result.changes?.length?'level':'return');break;
 case'event-seen':setModal(null);render();break;
 case'event-again':setModal('event');break;
 case'gates':setModal('gates');break;
 case'relics':setModal('relics');break;
 case'buy-relic':game.buyRelic(id);setModal(null);render();sound('rare');break;
 case'closing':game.finishNight();game.save();render();break;
 case'tip':game.account.tutorial??={};game.account.tutorial[id]=true;game.save();render();break;
 case'open':game.open();selected=null;render();break;
 case'select':selected=selected===id?null:id;render();sound('button');if(selected)requestAnimationFrame(()=>$('.sale-product.open')?.scrollIntoView({block:'nearest'}));break;
 case'sell':{const success=game.sell(selected,el.dataset.mode);if(success){sound(el.dataset.mode==='overcharge'?'overcharge':el.dataset.mode==='half'?'half':'sale');selected=null;}else{sound('refusal');toast(game.run.notice);}render();break;}
 case'depart':game.depart();selected=null;render();sound(s.phase==='night'?'return':'depart');break;
 case'close':game.closeDay();selected=null;render();if(s.money<0&&s.phase==='closing')setModal('stock');break;
 case'reroll':game.reroll();render();break;
 case'stock':setModal('stock');break;
 case'liquidate':game.liquidate(id);render();break;
 case'roster':setModal('roster');break;
 case'npc':setModal('npc:'+id);break;
 case'codex':setModal('codex');break;
 case'codex-tab':codexTab=id;renderModal();break;
 case'help':setModal('help');break;
 case'settings':setModal('settings');break;
 case'sound':game.account.settings.muted=!game.account.settings.muted;game.save();sound();render();break;
 case'dismiss':if(s?.phase==='foundation')return;setModal(null);break;
 case'team':game.selectFinal(id);supplyNPC=s.team.includes(id)?id:s.team[0];render();break;
 case'supply-target':supplyNPC=id;render();break;
 case'supply':game.supplyFinal(supplyNPC,selected);selected=null;sound();render();break;
 case'boss':setModal('bossConfirm');break;
 case'boss-go':sound('boss');game.boss();setModal(null);render();sound('rare');break;
 case'retire':setModal('retireConfirm');break;
 case'retire-go':game.end(false,'운영비를 충당하지 못해 이번 점포를 마감했습니다.');setModal(null);render();break;
 case'export':{const blob=new Blob([Save.export(game.account,s)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='guild24-save-day-'+(s?.day||0)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('저장 파일을 내보냈습니다.');break;}
 case'import':setModal('importConfirm');break;
 case'import-go':$('#save-file').click();break;

 }
 const newly=game.account.unlocked.filter(k=>!oldUnlocks.includes(k));if(newly.length){const names=[...D.items,...D.jobs,...D.facilities,...D.contracts].filter(x=>newly.includes(x.unlock)).map(x=>x.name);toast('본사 해금 · '+names.join(' · '));sound('rare');}
 }catch(err){toast(err.message);}
}
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-action]');if(el&&!el.disabled){if(el.classList.contains('stamp')||el.classList.contains('pull'))stampPress(el);action(el);}});
document.addEventListener('keydown',ev=>{if(ev.ctrlKey&&ev.shiftKey&&ev.code==='KeyD'&&game.run){ev.preventDefault();setModal('debug');return;}if(ev.key==='Escape'&&modal&&game.run?.phase!=='foundation'&&(game.run||modal!=='new'))setModal(null);if(ev.key==='Tab'&&modal){const els=[...$('#modal-root').querySelectorAll('button:not(:disabled),input,select,summary,[tabindex="0"]')].filter(e=>e.getClientRects().length),first=els[0],last=els.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus();}}});
$('#save-file').addEventListener('change',async ev=>{const file=ev.target.files[0];if(!file)return;try{const save=Save.import(await file.text());game=new Game(save.account,save.run);game.save();selected=null;setModal(null);render();toast('이어서 영업할 준비가 됐습니다.');}catch(e){toast('저장 파일을 읽지 못했습니다. '+e.message);}ev.target.value='';});
window.addEventListener('pagehide',()=>{game.save();Sound.sync(true,game.run?.phase);});document.addEventListener('visibilitychange',()=>{if(document.hidden)game.save();Sound.sync(game.account.settings.muted,game.run?.phase);});
window.Guild24={get game(){return game;},render,simulate:Debug.simulate,showDebug:()=>setModal('debug')};render();
})();
