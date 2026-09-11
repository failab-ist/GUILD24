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
 // SALE reveal: the next back walks up to the counter and turns face up. It only ever
 // moves layers that are already laid out, so nothing shifts and no reflow is queued.
 if(phase==='sell'){
  const face=$('.who .face'),fig=$('.who .figure'),tag=$('.who .nameplate'),br=$('.bracket'),pool=$('.pool');
  if(face)A(face,{translateX:[22,0],opacity:[0,1],duration:240,ease:'outQuad'});
  if(fig)A(fig,{translateY:[10,0],opacity:[0,1],duration:280,delay:60,ease:'outQuad'});
  if(pool)A(pool,{opacity:[0,.42],duration:340,ease:'outQuad'});
  if(br)A(br,{opacity:[0,1],scale:[1.06,1],duration:220,delay:150,ease:'outQuad'});
  if(tag)A(tag,{translateY:[10,0],opacity:[0,1],duration:200,delay:120,ease:'outQuad'});
  const waits=[...document.querySelectorAll('.line-up .wait')];
  if(waits.length)A(waits,{translateX:[16,0],duration:240,delay:anime.stagger(45),ease:'outQuad'});
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
 /* Replacing #app wholesale drops focus. On a redraw of the same view it goes back on the
    same control, or a keyboard user is thrown to the top of the screen on every pick.
    The handle is the data-action/data-id the click delegation already uses, plus the
    control's place among its namesakes: the quantity dial alone puts 30 buttons under
    data-action="qty" on one screen with no id, so the key by itself picks the wrong one. */
 const focusHold=(()=>{const el=document.activeElement;
  if(!el||el===document.body||!$('#app')?.contains(el))return null;
  const a=el.dataset.action,id=el.dataset.id;
  if(!a||/["\\]/.test(a)||(id&&/["\\]/.test(id)))return null;
  const key='[data-action="'+a+'"]'+(id?'[data-id="'+id+'"]':'');
  return {key,nth:[...$('#app').querySelectorAll(key)].indexOf(el)};})();
 $('#app').innerHTML=phase==='morning'?morningScreen():phase==='order'?orderScreen():phase==='sell'?saleScreen():phase==='night'?nightScreen():phase==='closing'?closingScreen():phase==='final'?finalScreen():phase==='end'?endScreen():stage('start','첫 점포지원','','<div class="relic-open"><span class="label">DAY 0</span><h2>첫 점포지원</h2><p class="muted">하나를 고르면 영업이 시작된다.</p></div>','');
 const viewKey=phase+':'+(phase==='sell'?s.cursor:phase==='night'?s.nightCursor:'');const changed=lastPhase!==viewKey;lastPhase=viewKey;
 const scroller=$('.stage-scroll');if(scroller){scroller.scrollTop=changed?0:previousScroll;if(changed)$('#phase-content').focus({preventScroll:true});}
 /* The control that answered the last press is often disabled by it (a quantity driven to
    zero or to the cap), and a disabled button cannot take focus: fall to its nearest live
    neighbour inside the same group rather than back to the top. */
 if(!changed&&focusHold){const t=$('#app').querySelectorAll(focusHold.key)[focusHold.nth];
  (t&&!t.disabled?t:t?.parentElement?.querySelector('[data-action]:not(:disabled)'))?.focus({preventScroll:true});}
 // An Event is the Morning opening beat and comes before Gate detail; a new milestone window opens once.
 /* The Boss reveal joins the beat that already exists rather than becoming a Phase of its
    own (UI_UX: `Boss reveal is not a new permanent Phase`). It goes ahead of the Relic
    window on the same Day, because the Relic decision is the one it is meant to inform
    (REL-Q41, UI-Q40): D5 identity, D15 the exact Trait, D30 the two Families. */
 if(phase==='foundation')modal='relics';
 else if(bossRevealDue())modal='boss';
 else if(phase==='morning'&&s.event&&!s.eventSeen)modal='event';
 else if(s.relicWindow&&!s.relicWindow.focusedRevealSeen&&['morning','order','final'].includes(phase))modal='relics';
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
// Every player-facing NPC portrait resolves here, so a customer keeps the same face
// walking from Sale to Night to the notebook to the Final muster. The production sticker
// is roughly square and is only ever contained inside a square box — no crop, no stretch,
// nothing baked in. Art.avatar is the fallback for an NPC with no production asset yet.
function portrait(n,size,cls=''){
 const art=n&&Scene.npcArt(n);
 return art?'<img class="pfp '+cls+'" src="'+art+'" alt="" draggable="false" style="--pfp:'+size+'px">'
           :'<span class="pfp fallback '+cls+'" style="--pfp:'+size+'px">'+Art.avatar(n,size)+'</span>';
}
// SALE — the customer is at the counter. Three layers read down the screen:
// WHO IS HERE (the waiting line as identical backs, the active customer as the single
// large foreground object), WHAT IS KNOWN about them (the counter surface), and WHAT TO
// SELL (the display case and the register). The NPC payload is an immutable, roughly
// square transparent sticker: it is placed, never boxed — contained at its own aspect
// ratio, standing on the counter line, silhouette free on every side. Rarity, identity
// and reveal are separate layers over it, so a production sticker with any margin drops
// in with no per-NPC layout work.
function saleScreen(){
 const s=game.run,n=game.current();
 if(!n)return '<div class="stage p-sale">'+menuFab()+'<main class="stage-scroll" id="phase-content" tabindex="-1"><p class="muted">영업을 마치는 중입니다.</p></main></div>';
 const waiting=Math.max(0,s.queue.length-s.cursor-1);
 return '<div class="stage p-sale">'+menuFab()
 +'<section class="front" data-npc="'+E(n.id)+'" aria-label="계산대 앞">'
  +'<div class="backwall" aria-hidden="true">'+Scene.shelfStrip()+'</div>'
  +speech(n)+standee(n)+waitingLine(waiting)
 +'</section>'
 +'<div class="counter-edge" aria-hidden="true"></div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="영업">'
  +'<div class="dossier">'+returningSummary(n)+destPlate(n)+statGrid(n)+traitRows(n)+kitLine(n)+readout(n)+specialUI()+'</div>'
  +shelf()+ownedRelicView()
 +'</main>'
 +'<div class="dock"><div class="queue"><span>손님 '+(s.cursor+1)+' / '+s.queue.length+'</span>'+pips(s.queue.length,s.cursor)+'</div>'
 +btn(s.cursor+1===s.queue.length?'영업 종료':'손님 보내기','depart','stamp')+'</div></div>';
}
// The waiting line. Every customer still outside is the same back — no face, silhouette,
// colour, rarity or name leaks out of it. Only how many are left is public.
function waitingLine(waiting){
 if(!waiting)return '<div class="line-up last"><span class="left">마지막 손님</span></div>';
 const backs=Array.from({length:Math.min(waiting,4)},(_,i)=>
  '<span class="wait" style="--i:'+i+'" aria-hidden="true">'+Scene.cardBack()+'</span>').join('');
 return '<div class="line-up" aria-label="대기 손님 '+waiting+'명"><span class="fan">'+backs+'</span>'
 +'<span class="left">대기 '+waiting+'</span></div>';
}
// The active customer. Layers, bottom to top: light pool -> contact shadow -> the NPC
// sticker itself -> the rarity bracket -> the identity plate. Nothing is baked into the
// artwork and nothing crops it: object-fit contain, standing on the counter line.
/* The customer's line lives above their head with the tail pointing down at them, so it
   reads as this person speaking rather than as a system notice. One bubble serves the whole
   sale: the greeting on arrival, then the purchase or refusal reaction in the same place.
   It is never dismissed on a timer — it is replaced by the next thing this customer says,
   or by the next customer, so a reaction can still be read while the remaining slots are
   being decided. Only lines attributed to the customer at the counter are shown. */
function speech(n){
 const said=game.run.say;
 if(!said||said.npc!==n.id||!said.text)return '';
 return '<p class="say" role="status" aria-live="polite"><span>'+E(said.text)+'</span></p>';
}
function standee(n){
 const art=Scene.npcArt(n),job=D.jobBy[n.job].name,rank=D.npcRarities[n.rarity]||'';
 return '<button class="who r'+n.rarity+'" data-action="npc" data-id="'+n.id+'" aria-label="'+E(n.name)+' Lv.'+n.level+' '+job+' 기록 보기">'
 +'<span class="face">'
  +'<span class="portrait">'
   +'<span class="pool" aria-hidden="true"></span>'
   +(art?'<img class="figure" src="'+art+'" alt="" draggable="false">'
        :'<span class="figure fallback">'+Art.avatar(n,140)+'</span>')
   +'<span class="stand" aria-hidden="true"></span>'
   +'<span class="bracket" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
  +'</span>'
  +'<span class="nameplate">'+(rank?'<i class="rank">'+E(rank)+'</i>':'')
   +'<b>'+E(n.name)+'</b><span>Lv.'+n.level+' '+job+'</span></span>'
 +'</span></button>';
}
function kitLine(n){const slots=Adventurer.slots(n),parts=[n.status];
 if(n.injury)parts.push('부상 '+n.injury);if(n.fatigue)parts.push('피로 '+n.fatigue);if(n.recovery)parts.push('휴식 '+n.recovery+'일');
 return '<div class="kit"><span>상태 <b>'+parts.join('</b> · <b>')+'</b></span><span>'+E(n.equipment.name)+'</span>'
 +'<span class="slots" aria-label="보급 '+n.pack.length+' / '+slots+'칸"><b class="slot-label">가방</b>'+Array.from({length:slots},(_,i)=>'<i class="'+(n.pack[i]?'full':'')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],20):'')+'</i>').join('')+'</span></div>';}
// NIGHT — the shop after closing, one lamp still on, and whoever came back standing in
// the doorway. Not a report and not a card: no paper, no shelf, no frame. The outcome is
// the loudest thing on screen as a display word, then WHY on the slate, then WHAT CHANGED
// as brass tokens. A routine return is a short beat; a death takes the whole room and the
// lamp goes cold. The rail of return tags is the night's progress — one tag per
// adventurer who went out, and a tag says nothing about a result not yet read.
function nightScreen(){
 const s=game.run,at=s.nightCursor||0,r=s.results[at],last=at+1>=s.results.length;
 const rail=s.results.length?'<div class="rail" aria-label="귀환 '+Math.min(at+1,s.results.length)+' / '+s.results.length+'">'
  +s.results.slice(0,12).map((_,k)=>'<span class="rtag">'+Scene.returnTag(k===at?'now':k<at?'done':'wait')+'</span>').join('')
  +'<span class="count">'+Math.min(at+1,s.results.length)+' / '+s.results.length+'</span></div>':'';
 const dock=btn('건너뛰기','night-skip','bare',last?'disabled':'')+btn('전체 건너뛰기','closing','bare')
 +btn(last?'정산으로':'다음','night-next','stamp');
 return '<div class="stage p-night'+(r&&r.outcome==='사망'?' cold':'')+'">'+menuFab()
 +'<div class="nightband" aria-hidden="true">'+Scene.nightRoom()+'</div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="밤">'
  +rail
  +'<div class="beat-room">'
   +(s.pilgrimage?'<p class="event-note">게이트 순례주간 · 실제 변경 '+s.pilgrimage+'명</p>':'')
   +(r?beat(r):'<p class="muted">오늘은 원정에 나선 손님이 없었다.</p>')
  +'</div>'
 +'</main><div class="dock">'+dock+'</div></div>';
}
// The tone of a beat is the actual outcome, never a score: 대성공 warm, 퇴각/부상 ember,
// 중상 blood, 사망 bone. 위기에서 생환 keeps its own reading so the rescue is not
// presented as an ordinary success.
function beat(r){
 const n=game.run.npcs.find(x=>x.id===r.npcId),tone=Presentation.nightTone(r),heavy=weighty(r);
 const verdict=Presentation.nightVerdict(r),why=Presentation.nightWhy(r);
 return '<article class="beat t-'+tone+(heavy?'':' quiet')+'">'
 +'<div class="stand-in">'
  +portrait(n,150,'returner')
  +'<div class="who"><p class="verdict">'+E(verdict)+'</p>'
   +'<h3>'+E(r.name)+'</h3><p class="place">'+E(r.dungeonName)+' · Lv.'+r.level+'</p>'
   +(r.routeChange?'<p class="route">'+E(r.routeChange)+'</p>':'')+'</div>'
 +'</div>'
 +'<p class="what">'+E(Presentation.nightHappened(r))+'</p>'
 +(why?'<p class="why"><i aria-hidden="true"></i>'+E(why)+'</p>':'')
 +'<div class="changed">'+changedRows(r)+'</div>'
 +supplyNote(r)
 +(heavy?'<blockquote>'+E(r.quote)+'</blockquote>':'')+'</article>';
}
// Importance decides how much copy a beat spends, never how big the adventurer is
// (UI-Q31). Presentation owns the rule so screen and tests share it.
const weighty=r=>Presentation.nightWeight(r);
// The one line that says what the player's own product did for this adventurer.
function supplyNote(r){const lines=Presentation.supplyLines(r);
 return lines.length?'<p class="influence">'+E(lines[0].text)+'</p>':'';}
// WHAT CHANGED — Presentation decides what actually moved; this only stamps it.
function changedRows(r){
 return Presentation.nightChanges(r).map(c=>'<span class="tok '+c.kind+'"><i>'+E(c.label)+'</i><b>'
  +E(c.value)+(c.extra?' <em>'+E(c.extra)+'</em>':'')+'</b></span>').join('');}
// CLOSING — `오늘 장사는 어땠을까?`. Economics only; the expedition story belongs to Night.
// The object is the till roll the register printed when the shutter came down: a narrow
// strip torn at both ends, lying on the dark counter under the same lamp. Not the order
// form — that is a wide sheet a person fills in; this is a tape a machine printed, so
// every figure is monospace and right-aligned on a dotted leader, subtotals rule off,
// and the money actually in the drawer is the last thing stamped on it.
function closingScreen(){
 const s=game.run,d=s.daily,margin=d.revenue-d.cogs;
 const profit=margin+(d.subsidy||0)+(d.commission||0)-d.operating-(d.wasteCost||0)-(d.rerollSpent||0);
 const line=(label,value,cls='')=>'<div class="row '+cls+'"><span>'+label+'</span><b>'+fmt(value||0)+'</b></div>';
 /* only what an actual sold item actually did, named product first. A sale with no
    meaningful expedition contribution simply does not appear. */
 const impact=s.results.flatMap(r=>Presentation.supplyImpact(r)).slice(0,4);
 const body='<div class="tape">'
 +'<div class="tear top" aria-hidden="true"></div>'
 +'<div class="print">'
  +'<div class="head"><b>GUILD24</b><span>DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span><span>영업 종료</span></div>'
  +'<div class="block">'+line('매출',d.revenue)+line('판매 원가',-d.cogs)
   +line('판매 마진',margin,'sum')+'</div>'
  +'<div class="block">'+line('운영비',-d.operating)+line('폐기 원가',-d.wasteCost)
   +line('발주 교환',-d.rerollSpent)+line('본사 지원·수당',(d.subsidy||0)+(d.commission||0))+'</div>'
  +'<div class="row profit'+(profit<0?' loss':'')+'"><span>영업 손익</span><b>'+(profit>0?'+':'')+fmt(profit)+'</b></div>'
  +'<div class="block">'+line('발주 지출',-d.spent)+line('점포지원 투자',-d.relicSpent)+line('재고 정리',d.liquidation)+'</div>'
  +'<div class="purse"><span>보유 자금</span><b>'+fmt(s.money)+'<i>G</i></b></div>'
  +(impact.length?'<div class="impact"><h4>오늘의 보급 영향</h4>'
    +impact.map(l=>'<p><b>'+E(l.items.join(' · '))+'</b><span>'+E(l.who)+'의 '+E(l.effect)+'</span></p>').join('')+'</div>':'')
  +'<p class="foot">미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.</p>'
 +'</div>'
 +'<div class="tear bottom" aria-hidden="true"></div></div>';
 const dock=(s.money<0?'<p class="danger-text">운영비가 부족하다.</p>'+btn('재고 정리','stock')+btn('폐점','retire','danger'):'')+btn('다음 날','close','stamp');
 return '<div class="stage p-closing">'+menuFab()
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="마감">'+body+'</main>'
 +'<div class="dock">'+dock+'</div></div>';
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
 return '<div class="tillpanel">'+(isFinal?'':'<p class="forwho">'+E(n.name)+'에게 판매</p>')
 +'<h4>보급 후 변화</h4><ul class="effects">'
 +(changes.length?changes.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after)+'</b></li>').join(''):'<li><span>이 손님의 준비는 달라지지 않는다</span><b></b></li>')
 +'</ul>'+readout(n,it.id)
 +'<details><summary>전체 효과 · 상품 설명</summary>'+effectList(it)+'<p class="smalltext">'+E(it.description)+'</p></details>'
 +'<p class="smalltext">'+(st.expires===null?'유통기한 없음':'폐기까지 '+(st.expires-s.day)+'일')+' · 가장 먼저 폐기될 재고부터 나간다</p>'
 +'<div class="tills">'+actions+'</div></div>';}
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
function npcCard(n,action='npc'){const s=game.run;return `<button class="npc-card r${n.rarity} ${!n.alive?'dead':''} ${s.team.includes(n.id)?'chosen':''}" data-action="${action}" data-id="${n.id}" ${action==='team'&&(!n.alive||n.recovery)?'disabled':''}><div class="row">${portrait(n,60)}<div>${badge(n.rarity,true)}<h3 style="margin-top:5px">${E(n.name)}</h3><p>Lv.${n.level} ${Adventurer.rank(n)}</p><p>${n.status}${n.recovery?' · '+n.recovery+'일 휴식':''} · 방문 ${n.visits}회</p></div></div><div class="loyalty"><div class="row between"><span>단골도 ${n.loyalty}</span><span>${action==='team'?(s.team.includes(n.id)?'선택됨':'원정대 선택'):'기록 보기'}</span></div><div class="bar"><span style="width:${n.loyalty}%"></span></div></div></button>`;}
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
function npcDetail(id){const n=game.run.npcs.find(n=>n.id===id);if(!n)return '';return `<div class="npc-detail"><div class="identity">${portrait(n,96)}<div>${badge(n.rarity,true)}<h2>${E(n.name)} · Lv.${n.level}</h2><p>${Adventurer.rank(n)} · ${n.status}</p><p>단골도 ${n.loyalty} · 방문 ${n.visits}회</p></div></div>${game.run.phase==='sell'&&game.current()?.id===n.id?destPlate(n):''}${statGrid(n)}${traitRows(n)}<p>${E(n.equipment.name)} · 투력 +${n.equipment.power}</p><p>남은 부상 ${n.injury} · 피로 ${n.fatigue} · 휴식 ${n.recovery}일</p><p class="muted">${n.loyalty>=51?'성장 잠재력: '+(n.potential>=1.18?'빠른 성장':n.potential>=1.1?'꾸준한 성장':'착실한 성장'):'더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.'}</p><h3>원정 기록</h3>${n.records.slice().reverse().map(r=>`<div class="history-row"><b>DAY ${r.day} · ${E(r.dungeonName)} · ${r.outcome}</b><p>${r.items.map(i=>D.itemBy[i].name).join(' + ')||'보급 없음'}</p>${r.routeChange?`<p>${E(r.routeChange)}</p>`:''}</div>`).join('')||'<p>아직 원정 기록이 없다.</p>'}<h3>구매 영수증</h3>${n.history.slice(-12).reverse().map(h=>`<div class="history-row">DAY ${h.day} · ${D.itemBy[h.item].name} · ${Presentation.modeLabel(h.mode)} ${fmt(h.paid)}G</div>`).join('')}</div>`;}
function unlockProgress(key){if(!key)return '기본 제공';const [label,target]=D.unlocks[key];const val=game.account.progress[key]||0;return game.account.unlocked.includes(key)?'해금 완료':`${label} ${Math.min(val,target)}/${target}`;}
function codex(){const a=game.account;let list=codexTab==='items'?D.items:codexTab==='jobs'?D.jobs:codexTab==='facilities'?D.relics:codexTab==='contracts'?D.contracts:[];return `<div class="row between wrap" style="margin-bottom:18px"><div><h3>본사 가맹등급 ${a.grade} · ${fmt(a.xp)} XP</h3><p class="smalltext">${['','신입 점주','초기자금 +50G','일반 상품 +1 추가','기본 창고 +2 추가','리롤 비용 감소 추가','첫 던전 정보 +1 추가'][a.grade]} · 이전 등급 혜택 누적</p></div><span class="muted">${a.runs}회 영업 · ${a.wins}회 마왕 토벌</span></div><details><summary>발견 수첩 · ${(a.discoveries||[]).length}개</summary>${(a.discoveries||[]).map(e=>`<p class="discovery">${E(e.text)}</p>`).join('')||'<p>아직 기록된 발견이 없다.</p>'}</details><div class="tabs">${[['items','상품 '+D.items.length],['jobs','직업 6'],['facilities','점포지원 '+D.relics.length],['monsters','몬스터 지식'],['contracts','시작 계약']].map(([id,label])=>btn(label,'codex-tab',codexTab===id?'small active':'small',`data-id="${id}"`)).join('')}</div><div class="unlock-grid">${codexTab==='monsters'?D.dungeons.filter(d=>d.id!=='final').map(d=>{const seen=a.knowledge[d.id]||0;return `<div class="unlock ${seen?'':'locked'}"><h3>${seen?d.monster:'???'}</h3><p>${d.name} · 보급 생환 ${seen}회</p><p>${seen?d.hazards.slice(0,seen>=3?3:1).map(h=>D.hazards[h]).join(' · '):'위험 특성 ???'}</p><p>${seen>=5?'약점: '+d.weakness:'약점 ???'}</p></div>`;}).join(''):list.map(it=>`<div class="unlock ${it.unlock&&!a.unlocked.includes(it.unlock)?'locked':''}">${codexTab==='items'?Art.itemIcon(it.id,42):''}<h3>${E(it.name)}</h3><p>${E(it.description||'길드 등록 직업.')}</p>${it.effects?effectList(it):''}<p class="gold-text" style="margin-top:8px">${unlockProgress(it.unlock)}</p></div>`).join('')}</div>`;}
function stockModal(){const s=game.run;return `<p class="muted" style="margin-bottom:15px">유통기한은 입고일부터 계산합니다. 재고 정리는 상품 기본 매입가의 50%를 회수합니다.</p><div class="unlock-grid">${groupStock().map(st=>{const it=D.itemBy[st.item];return `<div class="unlock">${Art.itemIcon(it.id,43)}<h3>${it.name} ×${st.count}</h3><p>${st.expires===null?'유통기한 없음':(st.expires-s.day)+'일 남음'}</p>${['morning','order','night','closing','final'].includes(s.phase)?btn('1개 정리 +'+Math.floor(it.buy*.5)+'G','liquidate','small',`data-id="${st.id}"`):''}</div>`;}).join('')||'<p>창고가 비어 있습니다.</p>'}</div>`;}
function newRun(){return `<div class="eyebrow">길드리테일 가맹 계약</div><h2 class="welcome-title">오늘도 문을 연다.</h2><p class="muted">기본 자금 1,200G · 창고 24칸 · 마왕성 개방까지 30일.</p><div class="welcome-band">계약서를 접어 카운터 아래 넣었다. 시작 재고는 창고에 있다.</div><h3 style="margin-bottom:10px">시작 계약</h3><div class="contract-grid">${D.contracts.map(c=>{const locked=c.unlock&&!game.account.unlocked.includes(c.unlock);return `<button class="contract ${contract===c.id?'active':''}" data-action="contract" data-id="${c.id}" ${locked?'disabled':''}><strong>${c.name}${locked?' · 잠김':''}</strong><span class="muted">${c.description}</span>${locked?'<br><small>'+unlockProgress(c.unlock)+'</small>':''}</button>`;}).join('')}</div><details style="margin-top:15px"><summary class="smalltext">재현용 Seed 지정</summary><label class="smalltext" for="seed">비워 두면 새로운 Seed로 시작합니다.</label><input id="seed" class="seed-field" placeholder="예: guild24-first-shift" maxlength="80"></details>${game.run&&game.run.phase!=='end'?'<p class="danger-text" style="margin-top:14px">진행 중인 점포는 여기서 마감됩니다. 점주 XP를 받고 새로운 런을 시작합니다.</p>':''}`;}
function settings(){return `<div class="stack"><p>자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.</p><div class="row wrap">${btn('저장 내보내기','export','stamp')}${btn('저장 가져오기','import')}</div><div class="row wrap">${btn(game.account.settings.muted?'소리 켜기':'소리 끄기','sound')}</div><hr style="border:0;border-top:1px solid var(--line);width:100%"><p class="muted">게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.</p>${game.run&&game.run.phase!=='end'?btn('현재 런 마감 · 새 점포 준비','new','danger'):''}<small>버전 0.4 · 로컬 실행 지원 · 외부 연결 없음</small></div>`;}
function help(){return `<div class="stack"><h3>점포지원</h3><p>DAY 0에는 무료로 하나를 선택합니다. DAY 5·10·15·20·25·30에는 자금을 써서 구매합니다. 사지 않은 후보는 다음 구매 기회 전날까지 보류할 수 있습니다. 판매 중에는 구매할 수 없습니다.</p><h3>발주</h3><p>기본 방문객은 3~6명. 시설·계약·이벤트와 활동 가능한 모험가 수에 따라 달라집니다. 아침에 표시된 인원은 오늘 실제 방문할 인원입니다. 게이트는 초반 1곳에서 후반 최대 3곳까지 열리고, 임시 게이트가 추가될 수 있습니다.</p><p>수량을 고른 뒤 발주를 확정합니다. 남은 재고와 유통기한, 운영비도 확인하세요.</p><h3>판매와 관계</h3><p>목적지·능력·특성을 보고 상품을 고릅니다. 바가지는 수입과 관계를 맞바꾸고, 반값은 이익을 포기해 손님에게 투자합니다. 정가는 기본 거래입니다. 같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.</p><p>단골도는 구매 의사와 재방문에 영향을 줍니다. 능력을 직접 올리지는 않습니다. 손님의 특성은 처음부터 전부 표시되며, 표시된 특성이 원정에서 실제로 작용하는 특성입니다.</p><h3>원정과 마감</h3><p>판매한 소비품은 그날 원정에서 사용됩니다. 기본 2칸, Lv.10부터 최대 3칸입니다. 밤에는 귀환 결과를 보고, 마감에서 거래와 보급의 작용을 확인합니다.</p><p>사망은 이번 영업에서 영구적입니다. 중상은 며칠의 휴식이 필요합니다. 30일에는 마지막 발주와 점포지원을 결정하고, 최대 3명에게 보급해 마왕성으로 보냅니다.</p><p>영업이 끝나면 상품 해금·몬스터 지식·발견·가맹등급은 남습니다. 모험가·재고·돈·설비는 다음 영업에 이어지지 않습니다.</p><p>적자일 때는 재고 정리로 운영비를 충당할 수 있습니다. 시간을 재촉하는 제한은 없습니다.</p></div>`;}
/* Which reveal this Day owes the player, if any. Seen state is persisted, so a reload
   cannot replay a reveal or reorder it (BOSS-Q02, UI-Q40). */
function bossRevealDue(){const s=game.run;if(!s||!s.bossId||!s.bossReveal)return false;
 if(s.day>=30&&s.phase==='final')return !s.bossReveal.familySeen;
 if(!['morning','order'].includes(s.phase))return false;
 if(s.day>=15&&!s.bossReveal.traitSeen)return true;
 return s.day>=5&&!s.bossReveal.identitySeen;}

function bossRevealStage(){const s=game.run;
 if(s.day>=30&&s.phase==='final')return 'd30';
 return s.day>=15&&!s.bossReveal.traitSeen?'d15':'d5';}

/* Boss art is a game object here, not an icon beside a card (UI_UX). The decision the
   reveal leads into stays above the fold on a phone, so the art sits under the facts. */
function bossReveal(){const s=game.run,b=D.bossBy[s.bossId],c=Copy.boss,stage=bossRevealStage();
 const art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount);
 const plate=art?'<figure class="boss-art"><img src="'+art+'" alt="'+E(b.name)+'"></figure>':'';
 if(stage==='d30'){const d=s.dungeons[0];
  return '<div class="boss-reveal d30"><p class="lede">'+E(c.d30.intro)+'</p>'
   +'<div class="fams">'+(d.families||[]).map(id=>{const f=D.dungeonBy[id];
     return '<article class="fam-card" style="--fam:'+f.color+'"><b>'+E(f.name)+'</b>'
      +hazardList(D.familyTiers[id][1])+'</article>';}).join('')
   +'</div>'+plate+'</div>';}
 if(stage==='d15'){const [name,lines]=c.d15.trait[s.bossId];
  return '<div class="boss-reveal d15"><p class="lede">'+E(c.d15.intro)+'</p>'
   +'<h3 class="boss-name">'+E(b.name)+'</h3>'
   +'<p class="trait-name">특성 — '+E(name)+'</p>'
   +'<div class="trait-body">'+lines.map(l=>'<p>'+E(l)+'</p>').join('')+'</div>'
   +plate+'</div>';}
 return '<div class="boss-reveal d5"><p class="lede">'+E(c.d5.sub)+'</p>'
  +'<h3 class="boss-name">'+E(b.name)+'</h3>'
  +plate+'<p class="flavor">'+E(c.d5.flavor[s.bossId])+'</p></div>';}

function renderModal(){const root=$('#modal-root');if(!modal){root.innerHTML='';document.body.style.overflow='';return;}
 if(modal==='relics'){root.innerHTML=relicTakeover();document.body.style.overflow='hidden';return;}
 let title='',body='',footer='',narrow=false;const s=game.run;
 if(modal==='boss'){const c=Copy.boss,stage=bossRevealStage();
  title=stage==='d30'?c.d30.header:stage==='d15'?'길드 정보 보고':c.d5.header;
  body=bossReveal();
  footer=btn(stage==='d30'?c.d30.button:stage==='d15'?c.d15.button:c.d5.button,'boss-seen','stamp');
  narrow=stage!=='d30';}
 else if(modal==='new'){title='새 점포 준비';body=(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':'')+newRun();footer=btn('첫 점포지원 고르기','start','stamp');narrow=true;}
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
 case'boss-seen':{const st=bossRevealStage();
  if(st==='d30')s.bossReveal.familySeen=true;else if(st==='d15')s.bossReveal.traitSeen=true;else s.bossReveal.identitySeen=true;
  game.save();setModal(null);render();break;}
 case'menu':setModal('menu');break;
 case'begin-order':game.beginOrder();render();break;
 case'finish-order':game.finishOrder();render();break;
 case'shop':setModal(null);break;
 case'new':contract='standard';setModal('new');break;
 case'contract':contract=id;renderModal();break;
 case'start':{const seed=$('#seed')?.value.trim()||'g24-'+Date.now().toString(36);if(s&&s.phase!=='end')game.end(false,'점주가 영업을 마감했습니다.');game.start(seed,contract);selected=null;setModal(null);render();break;}
 case'qty':game.setQuantity(Number(el.dataset.index),Number(el.dataset.q));sound('quantity');render();break;
 case'confirm-order':game.confirmOrder();sound('order');render();break;
 case'night-skip':{s.nightCursor=Presentation.nightSkip(s.results,s.nightCursor);if(s.nightCursor>=s.results.length)game.finishNight();game.save();render();break;}
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
 case'sell':{const success=game.sell(selected,el.dataset.mode);if(success){sound(el.dataset.mode==='overcharge'?'overcharge':el.dataset.mode==='half'?'half':'sale');selected=null;}else{sound('refusal');}render();break;}
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
