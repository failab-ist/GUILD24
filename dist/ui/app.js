(function(){
'use strict';
const D=DATA,E=Art.esc,$=s=>document.querySelector(s),fmt=n=>Math.round(n).toLocaleString('ko-KR');
let stored=Save.read(),game=new Game(stored?.account||Meta.fresh(),stored?.run||null),selected=null,modal=null,codexTab='items',supplyNPC=null,toastTimer,previousFocus=null;
/* USER-APPROVED OPENING. The backdrop names the store that is about to open, so the branch it
   shows must be the branch the Run actually receives. Game.start(seed) takes that name as the
   FIRST draw of a fresh RNG(seed), so the same seed through a throwaway RNG reproduces it
   exactly without touching gameplay state - no second catalogue, no second selection rule and
   no extra draw on the run stream. The seed is memoized so reopening this screen, or a trip
   through Store Management, cannot reroll the store the player was just shown. */
let pendingSeed=null;
const plannedSeed=()=>{const s=game.run;
 if(s&&s.phase==='foundation')return s.seed;   // an unopened store keeps its own seed
 return pendingSeed??=('g24-'+Date.now().toString(36));};
const plannedBranch=()=>new RNG(plannedSeed()).pick(D.brand.branches);
/* SA-Q01. Pre-Run Store Management is opened from the new-Run preparation panel and replaces
   it, so it needs a way back to it. During `foundation` the generic Close is deliberately
   suppressed and `dismiss` is a no-op - correct for the store-support takeover, but it left
   this one panel with an entry and no exit. Remembering where it was opened FROM is the whole
   fix: no new navigation layer, no second panel, and the return is the existing `new` modal. */
let preRunReturn=false;
/* UI_UX_v2.8 §PURCHASE CONFIRMATION. Which Decoration is waiting for a confirmation, if any.
   Deliberately not persisted: a reload is a cancel, so a reopened page can never resume a
   half-finished purchase and spend the Capital a second time. */
let decoPending=null,decoFocus=null;
const badge=(r,npc=false)=>`<span class="rare-badge r${r}">${(npc?D.npcRarities:D.rarities)[r]}</span>`;
const btn=(text,action,cls='',attrs='')=>`<button class="${cls}" data-action="${action}" ${attrs}>${text}</button>`;
const groupStock=()=>{const m=new Map();for(const st of game.run.inventory){if(!m.has(st.item))m.set(st.item,{...st,count:0});const x=m.get(st.item);x.count++;if(st.expires!==null&&(x.expires===null||st.expires<x.expires)){x.id=st.id;x.expires=st.expires;x.cost=st.cost;}}return [...m.values()];};
/* UI_UX §NIGHT LAYOUT — UNLOCK NOTICE: `새 상품 해금 · {상품명}` is two meaning units, so it is set as
   two lines - the fixed label, then the product - instead of one sentence the notice width
   happens to break. The message itself is the same string the Run stored; only its setting
   changes, and any other system message is still one plain line. */
const UNLOCK_LABEL='새 상품 해금';
function toast(msg){const t=$('#toast'),m=String(msg);
 if(m.startsWith(UNLOCK_LABEL+' · ')){t.classList.add('unlock');
  t.innerHTML='<b class="toast-label">'+E(UNLOCK_LABEL)+'</b><span class="toast-name">'+E(m.slice(UNLOCK_LABEL.length+3))+'</span>';}
 else{t.classList.remove('unlock');t.textContent=m;}
 $('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3400);}
function sound(kind='sale'){const st=game.account.settings;Sound.sync(st.muted,game.run?.phase,st);Sound.play(kind);}
/* the heal accent sits behind the arrival's own cue, the same way `rescue` sits behind an Outcome */
function healCue(){const s=game.run,n=s?.phase==='sell'&&game.current();if(n?.healedBy)Sound.play('heal',.22);}
/* UI_UX_v2.8 §NIGHT OUTCOME AUDIO. The Outcome is what the cue says, always. There are two ways
   a result becomes the visible one - the final departure lands on result 0, and 다음 advances to
   the next - and both go through here, so neither can drift into a generic return cue. */
const nightCue=r=>r.outcome==='사망'?'death':r.outcome==='중상'?'severe':r.outcome==='부상'?'injury'
 :r.outcome==='퇴각'?'retreat':r.outcome==='대성공'?'great':'return';
/* The life-saving accent lands BEHIND its own Outcome cue, never instead of it, so a rescued
   퇴각 still reads as a 퇴각. It appears only where the result itself carries the proof, so
   nothing that was not already resolved can be inferred from it. */
function nightSound(result){if(!result)return;sound(nightCue(result));
 if(result.rescued||result.avoidedDeath)Sound.play('rescue',.42);}
/* A redraw replaces a whole surface, and a destroyed control cannot keep the keyboard.
   Remember which control answered the last press by what it does rather than by object
   identity, then put the keyboard back on its replacement. Used by #app and by
   #modal-root, which had no restore at all: a redraw under an open modal dropped focus
   to <body> and made a keyboard user tab back from the top of the document. */
function holdFocus(container){const el=document.activeElement;
 if(!container||!el||el===document.body||!container.contains(el))return null;
 const a=el.dataset.action,id=el.dataset.id;
 if(!a||/["\\]/.test(a)||(id&&/["\\]/.test(id)))return null;
 const key='[data-action="'+a+'"]'+(id?'[data-id="'+id+'"]':'');
 return {key,nth:[...container.querySelectorAll(key)].indexOf(el)};}

/* The control that answered the last press is often disabled by it (a quantity driven to
   zero or to the cap), and a disabled button cannot take focus: fall to its nearest live
   neighbour inside the same group rather than back to the top. */
function restoreFocus(container,hold){if(!container||!hold)return;
 const t=container.querySelectorAll(hold.key)[hold.nth];
 (t&&!t.disabled?t:t?.parentElement?.querySelector('[data-action]:not(:disabled)'))?.focus({preventScroll:true});}

/* Put an ORDER offer row back on the pixel it was on before the redraw. render() restores
   a raw scrollTop, which is right only while everything above the row keeps its height -
   and the dock gains or loses 발주 확정 as the cart stops or starts being empty, so the
   scroller itself changes height around exactly the press that matters. Correcting once
   synchronously means nothing flashes; correcting again on the next frame catches a late
   reflow. A delta of 0 leaves scrollTop alone, so this costs nothing when nothing moved. */
function anchorOffer(key,y0){
 if(key==null||y0==null)return;
 const fix=()=>{const sc=$('.stage-scroll'),back=$('[data-offer="'+CSS.escape(key)+'"]');
  if(!sc||!back)return;const d=back.getBoundingClientRect().top-y0;if(d)sc.scrollTop+=d;};
 fix();requestAnimationFrame(fix);}

/* UI-Q-v28-29 CONTROL / FEEDBACK / LAYOUT CONTINUITY: a sheet hands focus back to the control
   that opened it. `previousFocus` used to be re-read on EVERY call, closing included - and at
   that moment the active element is a control INSIDE the sheet that renderModal() is about to
   remove, so the restore ran on a detached node and focus fell to <body>. It is captured only
   when a sheet opens over the screen, so one sheet opening another (메뉴 -> 영업 설정, 도감 ->
   새 점포 준비) still returns to the single origin the player came from. If that origin is gone
   by the time the sheet closes, the Phase's own content region takes focus rather than nothing. */
function setModal(value){decoPending=null;const jumped=!!value&&!!decoFocus;if(!value)decoFocus=null;if(modal==='event'&&value!=='event'&&game.run&&!game.run.eventSeen){game.run.eventSeen=true;game.save();}$('#coach-root').innerHTML='';if(value&&!modal)previousFocus=document.activeElement;modal=value;renderModal();/* a panel opened ON a Slot has already put focus there; do not yank it back to the top */
 if(value){document.body.style.overflow='hidden';if(!jumped)setTimeout(()=>$('#modal-root button, #modal-root input')?.focus(),0);}
 else{document.body.style.overflow='';const back=previousFocus;previousFocus=null;(back?.isConnected?back:$('#phase-content'))?.focus?.();}
 requestAnimationFrame(showCoach);}
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
/* v2.9.0 UI_UX §TUTORIAL — TASK LINE, DAY 1~3 (COPY_AUDIT §3-8, User 2026-09-24): one fixed text line at the top of
   the phase content on DAY 1~3 while the account tutorial is not skipped. Not a coach mark, no button; it reuses the
   tutorial state and adds no Save field. DAY 0 and DAY 4+ have none. The one approved exception to "the tutorial
   adds no page height": exactly one line, which never wraps at 360 (white-space:nowrap). */
const TASK_LINE={morning:'오늘 할 일 — 열린 게이트의 위험을 본다',order:'오늘 할 일 — 위험에 맞는 능력을 올리는 상품을 발주한다',sell:'오늘 할 일 — 손님이 갈 게이트를 보고 상품과 가격을 정한다',closing:'오늘 할 일 — 오늘 장사를 정리한다',night:'오늘 할 일 — 준비가 어떻게 됐는지 확인한다'};
function taskLine(phase){const s=game.run,t=game.account.tutorial||{};
 if(!s||t.skipped||!(s.day>=1&&s.day<=3)||!TASK_LINE[phase])return '';
 return '<p class="task-line">'+E(TASK_LINE[phase])+'</p>';}
function stage(phase,label,head,body,dock,attrs=''){
 return '<div class="stage p-'+phase+'"'+attrs+'>'+menuFab()+(head||'')
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
 /* BATCH 3 NIGHT: one entry used to carry every Outcome the same way. The record and its tag now
    arrive the way that return actually happened - resolved from the tag tone the Outcome already
    set, never from anything the result does not state. Same family, short, no cinematic layer. */
 if(phase==='night'){
  const beat=$('.beat'),tag=$('.beat .verdict');
  const tone=(beat?.className.match(/\bt-(\w+)/)||[])[1];
  const IN={great:{translateY:[10,0],opacity:[0,1],duration:340},safe:{translateY:[6,0],opacity:[0,1],duration:280},
   pull:{translateX:[-16,0],opacity:[0,1],duration:420},hurt:{translateY:[-8,0],opacity:[0,1],duration:380},
   severe:{translateY:[-14,0],opacity:[0,1],duration:560},gone:{opacity:[0,1],duration:760},
   saved:{scale:[.97,1],opacity:[0,1],duration:420}};
  if(beat)A(beat,{...(IN[tone]||IN.safe),ease:'outQuad'});
  /* the tag is handed over a beat after the figure: a clean return lands it, damage lets it drop */
  if(tag&&tone!=='gone')A(tag,tone==='great'||tone==='saved'
   ?{scale:[1.12,1],opacity:[0,1],duration:260,delay:160,ease:'outQuad'}
   :{translateY:[-6,0],opacity:[0,1],duration:tone==='severe'||tone==='hurt'?380:240,delay:160,ease:'outQuad'});
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
/* Beats that happen inside a Phase rather than on the way into one. A redraw rebuilds the
   whole screen, so an entry animation attached to an element would replay on every click:
   the action names what just happened and the next draw plays that one thing. The marker
   lives for exactly one render and is not state anyone can read back. */
/* v2.9.0 TRANSACTION BEAT (PRESENTATION_PRINCIPLES §TRANSACTION BEAT, User 2026-09-24). `handoff` is
   what the click handler saw on screen just before the state moved - the shelf tile's place, the
   Gold, the four Stat readings - so the draw after it can show the resolved change as an act:
   the icon travels to the Bag, the Gold counts, the changed cells pulse. It lives for exactly one
   render, holds nothing the resolved state does not already hold, and is never saved. */
let cue=null,handoff=null;
/* PRESENTATION §TRANSACTION BEAT A8 / UI_UX §SALE — TRANSACTION RESULT STUB (User 2026-09-24, v2.9.0): one
   receipt stub per successful sale, over the counter band above the dock, `단골도 {±N} · 소지금 {A} → {B}`
   (COPY_AUDIT §4-24) for about 2.5 s; no reserved height, no input held, replaced by the next sale's stub,
   no motion under reduced motion. Presentation only - it reads the resolved state and writes nothing. */
let stub=null,stubTimer=null;
function showStub(){if(!stub)return;const st=stub;stub=null;
 document.querySelector('.receipt-stub')?.remove();clearTimeout(stubTimer);
 const el=document.createElement('div');el.className='receipt-stub';el.setAttribute('role','status');
 el.textContent='단골도 '+(st.loyalty>=0?'+':'')+st.loyalty+' · 소지금 '+st.from+' → '+st.to;
 const dock=$('.p-sale .dock');el.style.bottom=(dock?Math.max(0,Math.round(innerHeight-dock.getBoundingClientRect().top))+8:92)+'px';
 document.body.appendChild(el);
 /* the stamp-in and the fade are playCue()'s (the one guarded place for in-phase motion); this only removes it */
 stubTimer=setTimeout(()=>el.remove(),motionOK()?2800:2500);}
function playCue(){const c=cue;cue=null;const h=handoff||{};handoff=null;
 if(!c||!motionOK())return;
 const A=anime.animate;
 // picking a product puts it on the counter tray - the tray contents arrive, the list does not move
 if(c==='select'){const open=$('.counter-tray .tray-item');if(open)A(open,{opacity:[0,1],translateY:[8,0],duration:190,ease:'outQuad'});}
 /* A1 건네기: the Item icon travels from its shelf row to the Bag slot it now fills (280 ms), the
    slot settles (1.05 -> 1, 240 ms), the dock Gold counts to its new value, and each Stat cell that
    changed pulses once (300 ms) and keeps the new value. A2: the customer nods (4 px, 180 ms x 2).
    Every beat is under 320 ms and the whole sale is under 600 ms; input is never held. */
 if(c==='sale'){
  /* A8 영수증 조각: stamps in (1.12 -> 1, 200 ms) and fades after 2.5 s; showStub() owns its removal */
  const stubEl=$('.receipt-stub');if(stubEl){A(stubEl,{scale:[1.12,1],opacity:[0,1],duration:200,ease:'outQuad'});setTimeout(()=>{if(stubEl.isConnected)A(stubEl,{opacity:[1,0],duration:280,ease:'outQuad'});},2500);}
  const slot=[...document.querySelectorAll('.kit .slots i.full')].pop();
  const settle=()=>{if(slot)A(slot,{scale:[1.05,1],duration:240,ease:'outQuad'});};
  if(slot&&h.from&&h.icon){const to=slot.getBoundingClientRect(),g=document.createElement('i');g.className='handoff';g.innerHTML=h.icon;
   g.style.cssText='left:'+h.from.left+'px;top:'+h.from.top+'px;width:'+h.from.width+'px;height:'+h.from.height+'px';
   document.body.appendChild(g);
   /* the slot's own icon waits, hidden, until the travelling one lands on it - one Item, not two */
   const inner=slot.firstElementChild;if(inner)inner.style.opacity='0';
   const land=()=>{g.remove();if(inner)inner.style.opacity='';};
   A(g,{translateX:to.left+to.width/2-(h.from.left+h.from.width/2),translateY:to.top+to.height/2-(h.from.top+h.from.height/2),
    scale:to.width/Math.max(1,h.from.width),duration:280,ease:'inOutQuad',onComplete:()=>{land();settle();}});
   setTimeout(land,600);}
  else settle();
  const gold=$('.dock .on-hand b');
  if(gold&&h.gold!==undefined&&h.gold!==game.run.money){const box={v:h.gold};A(box,{v:game.run.money,duration:320,ease:'outQuad',onUpdate:()=>{gold.textContent=fmt(box.v);}});}
  if(h.stats)[...document.querySelectorAll('.detail-stats .detail-stat')].forEach((cell,i)=>{
   const now=cell.querySelector('strong')?.textContent;if(h.stats[i]!==undefined&&h.stats[i]!==now)A(cell,{scale:[1,1.04,1],duration:300,ease:'inOutQuad'});});
  const fig=$('.who .figure');if(fig)A(fig,{translateY:[0,4,0,4,0],duration:360,ease:'inOutSine'});
  const said=$('.say');if(said)A(said,{opacity:[0,1],translateY:[6,0],duration:220,ease:'outQuad'});}
 /* A2 / A6: a refusal is the same channel saying no - the balloon and the figure shake their head,
    and the price button that was refused shakes once where it locked (오늘 거절됨 is already on it). */
 if(c==='refuse'){const shake={translateX:[0,-4,4,-2,0],duration:280,ease:'outQuad'};
  const said=$('.say');if(said)A(said,{translateX:[0,-5,4,-2,0],duration:280,ease:'outQuad'});
  const fig=$('.who .figure');if(fig)A(fig,shake);
  const b=h.mode?$('.tills button[data-mode="'+h.mode+'"][disabled]'):null;if(b)A(b,shake);}
}
/* A4 손님 교대: the customer walks off left (240 ms) before the next one is drawn. The state moves
   in `go` exactly as it did without the beat; the beat only delays that call by its own length,
   a second tap during it is dropped rather than departing two customers, and a timer fires `go`
   even if the animation never completes, so the beat can never hold the day. */
let leaving=false;
function playExit(go){
 const who=game.run?.phase==='sell'?$('.who'):null;
 if(leaving)return;
 if(!motionOK()||!who){go();return;}
 leaving=true;let done=false;const fire=()=>{if(done)return;done=true;leaving=false;go();};
 anime.animate(who,{translateX:[0,-40],opacity:[1,0],duration:240,ease:'inQuad',onComplete:fire});
 setTimeout(fire,260);
}
// the approval stamp lands before the phase advances
function stampPress(el){
 if(!motionOK()||!el)return;
 anime.animate(el,{scale:[1.08,1],duration:180,ease:'outQuad'});
}
function render(){
 const s=game.run;Sound.sync(game.account.settings.muted,s?.phase,game.account.settings);
 /* The runless screen is the title card behind the preparation modal, and it carries no dock.
    It used to end on a `첫 영업 준비` stamp that no Player can ever press: with no Run the modal
    prints no 닫기 (`(game.run||modal!=='new')` is false) and Escape is gated by the same test,
    so the preparation modal cannot be dismissed, and the line below re-opens it on every draw
    of this state anyway. The button was only ever an orphan control sitting behind the shade -
    on a desk, in the bottom-left corner of the title card. */
 if(!s){$('#app').innerHTML=stage('start','새 점포','','<div class="opening"><h1 class="opening-title">던전 앞 편의점</h1><p class="opening-branch">'+E(plannedBranch())+'</p></div>'+(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':''),'');if(!modal)setModal('new');return;}
 const phase=s.phase,previousScroll=$('.stage-scroll')?.scrollTop||0;
 /* SA-Q09: every LIVING Night result speaks through the same temporary balloon the SALE
    counter uses - no permanent blockquote, no second speech mechanism. `speech()` already
    ignores a redraw of the line it is already showing (its own sayKey/sayHidden guard), so
    setting this on every render of the same beat does not restart the bubble or its timer.
    Death is narration only, per NIGHT_CLOSING, so it never sets a line here. */
 /* USER AMENDMENT 2026-09-22 (UI_UX §NIGHT LAYOUT — DEATH MESSAGE): narration treatment is
    about VOICE, not position. A death used to set no line at all, so the one message channel
    beside the character went empty and the record's only death words were the Outcome summary
    in the body. The existing Death narration copy now takes the living line's place and weight,
    flagged `status` so it is presented as a neutral status message rather than an utterance. */
 if(phase==='night'){const r=s.results[s.nightCursor||0];
  s.say=(r&&r.quote)?{npc:r.npcId,text:r.quote,status:r.outcome==='사망'}:null;}
 /* Replacing #app wholesale drops focus. On a redraw of the same view it goes back on the
    same control, or a keyboard user is thrown to the top of the screen on every pick.
    The handle is the data-action/data-id the click delegation already uses, plus the
    control's place among its namesakes: the quantity dial alone puts 30 buttons under
    data-action="qty" on one screen with no id, so the key by itself picks the wrong one. */
 const focusHold=holdFocus($('#app'));
 $('#app').innerHTML=phase==='morning'?morningScreen():phase==='order'?orderScreen():phase==='sell'?saleScreen():phase==='night'?nightScreen():phase==='closing'?closingScreen():phase==='final'?finalScreen():phase==='end'?endScreen():stage('start','첫 점포지원','','<div class="relic-open"><span class="label">DAY 0</span><h2>첫 점포지원</h2><p class="muted">이번 영업에 쓸 지원 하나를 고르세요.</p></div>','');
 const viewKey=phase+':'+(phase==='sell'?s.cursor:phase==='night'?s.nightCursor:'');const changed=lastPhase!==viewKey;lastPhase=viewKey;
 const scroller=$('.stage-scroll');if(scroller){scroller.scrollTop=changed?0:previousScroll;if(changed)$('#phase-content').focus({preventScroll:true});}
 /* The control that answered the last press is often disabled by it (a quantity driven to
    zero or to the cap), and a disabled button cannot take focus: fall to its nearest live
    neighbour inside the same group rather than back to the top. */
 if(!changed)restoreFocus($('#app'),focusHold);
 /* The warehouse is a native disclosure, but its preference is an account-level presentation
    choice: it opens for a new player and, once folded, stays folded on later Days and reloads
    until the player opens it again. It is not progression and does not need another state owner. */
 const stock=$('.stock-brief');if(stock){stock.open=game.account.settings.stockBriefOpen!==false;
  stock.addEventListener('toggle',()=>{if(game.account.settings.stockBriefOpen===stock.open)return;
   game.account.settings.stockBriefOpen=stock.open;game.save();});}
 // An Event is the Morning opening beat and comes before Gate detail; a new milestone window opens once.
 /* The Boss reveal joins the beat that already exists rather than becoming a Phase of its
    own (UI_UX: `Boss reveal is not a new permanent Phase`). It goes ahead of the Relic
    window on the same Day, because the Relic decision is the one it is meant to inform
    (REL-Q41, UI-Q40): D5 identity, D15 the exact Trait, D25 the two Families. */
 /* The foundation takeover owns the screen so the first store support gets decided, but it
    used to be a one-way door: the Run was already committed and the only way back was to
    spend it. The pre-Run screen may therefore win over it - nothing has been played yet, so
    going back costs nothing and creates no second Run. */
 if(phase==='foundation'&&modal!=='new')modal='relics';
 else if(bossRevealDue())modal='boss';
 else if(phase==='morning'&&s.event&&!s.eventSeen)modal='event';
 else if(s.relicWindow&&!s.relicWindow.focusedRevealSeen&&['morning','order','final'].includes(phase))modal='relics';
 const sayMs=cue==='sale'||cue==='refuse'?SAY_REPLY_MS:SAY_MS;
 renderModal();requestAnimationFrame(showCoach);if(changed)playPhase(phase);playCue();armSpeech(sayMs);
}
// Every named Hazard states its canonical pressure inline. Nothing is hover-only,
// nothing is left name-only (UI-005, UI-Q35, DUN-Q21).
// Every named Hazard carries its canonical pressure inline — burned into the notice,
// never behind a hover (UI-005, UI-Q35, DUN-Q21).
/* Always-available help: a native <details>, so it is keyboard-reachable without a line of
   script. Shared by the outlook and the destination plate rather than duplicated per surface. */
/* One shared `name` makes the group exclusive, so opening one balloon closes the other rather
   than stacking two of them on the same anchor. Where a browser does not support exclusive
   <details> yet this degrades to the plain overlap, never to a broken control. */
const tip=(label,...lines)=>'<details class="tip" name="sale-tip"><summary aria-label="'+E(label)+' 설명">?</summary>'
 +'<p>'+lines.map(l=>'<span>'+E(l)+'</span>').join('')+'</p></details>';
/* Two different facts about one Hazard, never welded into a sentence like `강인함 압박에 취약`.
   The pressure is fixed information about the Hazard itself - it is true of 독기 whoever is
   standing at the counter. The readiness is this NPC's SALE-entry state against it. The player
   has to be able to read `this danger looks at 강인함` and `this character is 취약 to it right
   now` separately, so they are separate elements with the readiness explicitly labelled. */
/* The short row's two parts: `대응 N 필요` over the smaller `{능력치} n당 대응 1 제공`; CSS joins them on one line at 900px+ (User 2026-09-25). */
const pressCell=h=>h.need?'<span class="press"><b class="need">'+E(h.need)+'</b><small class="rate">'+E(h.rate)+'</small></span>':'<span class="press">'+E(h.pressure)+'</span>';
const hazardList=(keys,states,d)=>keys.length?'<ul class="hazards">'+Presentation.hazardRows(keys,d).map(h=>{
 const st=states&&states.find(x=>x.key===h.key);
 return '<li data-hazard="'+h.key+'"><b>'+E(h.name)+'</b>'+pressCell(h)
  +(st?'<span class="ready"><i>현재 대응</i><em class="'+(['취약','불안'].includes(st.label)?'lack':'')+'">'+st.label+'</em></span>':'')
  +'</li>';}).join('')+'</ul>':'';
// A Gate is a plank notice nailed to the wall: family colour burned along the top edge,
// the gate mark branded into it, the supply requirement stamped underneath.
// A Gate is a paper notice pinned to the board: family colour along the top, the hazard
// pictogram beside each pressure line, the supply requirement stamped at the foot.
/* `full`: Gate detail (the gates modal) reads the full Gate sentence (COPY_AUDIT §4-16); the MORNING plate reads the
   short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공` - the number first (User 2026-09-24). */
function gatePlate(d,full=false){const b=sigilOf(d);
 return '<article class="slip gate" style="--fam:'+(b.color||'#caa46a')+'"><span class="pin"></span>'
 +'<span class="crest">'+Art.mark(b.id||d.id,28)+'</span>'
 +'<b>'+E(d.name)+'</b>'
   +'<ul class="hazards'+(full?' full':'')+'">'+Presentation.hazardRows(Presentation.known(d,game),d).map(h=>full
     ?'<li data-hazard="'+h.key+'">'+Scene.hazardIcon(h.key,18)+'<span class="sentence">'+E(Presentation.hazardSentence(h.key,d))+'</span></li>'
     :'<li data-hazard="'+h.key+'">'+Scene.hazardIcon(h.key,18)+'<i>'+E(h.name)+'</i>'+pressCell(h)+'</li>').join('')+'</ul>'
   +'</article>';}
/* v2.9.0 (User 2026-09-24): no next-day Gate / Tier forecast is shown anywhere - today's Gates, their numbered Hazard rows and
   the per-Gate visitor count are the whole planning context (ECONOMY_ORDER §NEXT-DAY FORECAST — RETIRED). */
/* UI_UX §DEEP SALE UI. Offered only while a nomination is still legal, so it never appears as
   a disabled control the player has to reason about. Once taken it states what left the till
   and that the destination changed - the forecast above has already been recomputed against
   the Deep Gate, because it reads the same Gate the night will resolve. */
function deepOfferUI(n){
 const s=game.run,t=s.deep?.today;if(!t||!n)return '';
 const c=Copy.deep;
 if(t.nomineeId===n.id)
  return '<div class="deep-taken"><b>'+E(c.confirmed)+' · '+E(s.dungeons[t.gateIndex].name)+'</b>'
   +'<p>'+E(c.sponsor)+' '+fmt(t.paid)+'G 지급</p></div>';
 if(t.nomineeId)return '';
 const cost=game.deepCost(n);
 if(game.canNominateDeep(n))
  return '<details class="special-event deep-offer"><summary>'+E(c.term)+' · '+E(c.action)+'</summary>'
   +'<p>'+E(s.dungeons[t.gateIndex].name)+' · '+E(c.sponsor)+' '+fmt(cost)+'G</p>'
   +'<p class="smalltext">'+E(c.terms)+'</p>'
   +btn(E(c.action)+' · '+E(c.sponsor)+' '+fmt(cost)+'G','deep-nominate','danger','data-id="'+n.id+'"')
   +'</details>';
 // not offered: say why in one line rather than showing a dead control
 if(s.money<cost)
  return '<p class="smalltext deep-blocked">'+E(c.term)+' — '+E(c.poor)+'</p>';
 return '';}
// MORNING — situation / open. The day as a plate, Gates as objects, a HUD readout,
// the store as a horizon strip behind it all.
// MORNING — a place, seen from the doorway before the shutter goes up.
// The store scene is the screen; the day hangs in it as a sign and the day's numbers
// are chalked on a slate propped against the counter. Gates are plank notices below.
// MORNING — the store is the screen. The room is built out of horizontal bands
// (ceiling and shutter, shelving wall, notice board, counter) and the interface hangs on
// those surfaces: the day on the shop sign, today's gates pinned to the board, the till
// showing the float, the store support sitting on the counter.
/* The board is hung high on the wall, directly under the day sign, because that is the
   order the morning is read in: DAY, then today's expedition, then the Gates and their
   Hazards, then the float on the counter, then the shutter. The scenery keeps whatever
   room is left over rather than taking its share first. */
function morningScreen(){
 const s=game.run;
 return '<div class="stage p-morning">'+menuFab()
 +'<div class="store">'
  +'<div class="band ceiling"><span class="mount">'+Scene.ceiling()
   +'<span class="daysign" style="'+Scene.anchorStyle('daysign')+'"><i>DAY</i><b>'+String(s.day).padStart(2,'0')+'</b></span></span></div>'
    +'<div class="board" id="phase-content" tabindex="-1" aria-label="아침">'+taskLine('morning')
     +'<p class="board-rail" id="visitor-count">오늘의 원정<b>손님 '+s.queue.length+'</b><b>게이트 '+s.dungeons.length+'</b></p>'
   +'<div class="pinned">'+(s.event?eventSlip(s.event):'')+deepSlip()+s.dungeons.map(gatePlate).join('')+'</div></div>'
  +'<div class="band wall">'+Scene.wall(s.day)+'</div>'
  /* The store plate is furniture, not signage: it is screwed to the counter, so it is a
     counter-band element and is placed in the counter's own coordinates. Presentation only -
     same text, same source, same order on screen. */
  +'<div class="band counter"><span class="mount">'+Scene.counter()
   +'<span class="branchplate">'+E(s.branch)+'</span>'
   +'<span class="till-cap" style="'+Scene.anchorStyle('tillLabel')+'">보유 골드</span>'
   +'<span class="till" style="'+Scene.anchorStyle('till')+'" aria-label="보유 자금 '+fmt(s.money)+'G"><b class="coin">'+fmt(s.money)+'</b><i>G</i></span>'
   +'</span></div>'
  /* The equipped Decorations sit on the PAINTED room, so they are placed in the painting's own
     coordinates (UI_UX §LIVE STORE) in one layer over it, not in the bands' frames. */
  +'<div class="deco-layer">'+D.decorationSlots.map(decoPlate).join('')+'</div>'
 +'</div>'
 +'<div class="dock">'+relicWindowLink()+'<button class="pull" data-action="begin-order"><span>문 열기</span></button></div></div>';
}
// The Event stays on the board as the notice it is, after its focused reveal.
/* UI_UX §DEEP EXPEDITION MORNING. On a Deep Day no Normal Event happens, so this is the Day's
   special operational beat. It is a notice on the same board, not a new Phase or a takeover:
   before committing the Order the player can see that there is one, which Gate it deepens,
   its Family/Tier/known Hazards, that a sponsorship is owed and how it is priced, what the
   adventurer gains, that the Store gains no cash, and that taking it is optional. */
function deepSlip(){
 const s=game.run,t=s.deep?.today;if(!t)return '';
 const c=Copy.deep,base=s.dungeons[t.gateIndex],taken=!!t.nomineeId;
 const who=taken?s.npcs.find(n=>n.id===t.nomineeId):null;
 return '<div class="slip deep"><span class="pin"></span>'
 +'<span class="stamp-line">'+E(c.header)+'</span>'
 +'<b>'+E(c.term)+' · '+E(base.name)+'</b>'
 +(taken
   ? '<span class="body">'+E(c.confirmed)+' · '+E(base.name)+'</span>'
     +'<span class="body">'+E(c.sponsor)+' '+fmt(t.paid)+'G 지급</span>'
   : '<span class="body">'+E(c.brief)+'</span>')
 +'</div>';}
/* EVENT §3-1. Three things have to arrive at once: that something happened today, what
   happened, and what is switched on because of it. The catalog already keeps those last two
   apart - `reveal` is the situation and `description` is the effect - so the notice says both
   and sets them apart instead of showing the effect line alone with no cause. */
function eventSlip(e){
 return '<button class="slip event" data-action="event-again"><span class="pin"></span>'
 +'<span class="stamp-line">오늘의 사건</span><b>'+E(e.name)+'</b>'
 +'<span class="flavor">'+E(e.reveal)+'</span>'
 +'<span class="effect">'+E(e.description)+'</span></button>';}
/* Owned store support used to sit on the counter as a row of brass plates, which is where
   the float is. It crowded the till off its own surface, so the counter now carries the
   register and nothing else and the standing list lives in the store menu instead - the same
   modal, reached from where every other standing reference is reached. */
function relicWindowLink(){const w=game.run.relicWindow;if(!game.canBuyRelic())return '';
 return '<button class="brass" data-action="relics">점포지원<br>'+(w.milestoneDay===0?'무료':'D'+(w.expiryDay-1)+'까지')+'</button>';}
// The readiness readout. Qualitative only: 우세/접전/불리 and 취약/불안/대응/충분.
function readout(n,extra=null,cls=''){
 const d=game.claimedGateFor(n);
 /* SALE_v2.7: the Bag read here is the COMMITTED one. A focused, unpurchased Item may show its
    own exact effects and the deterministic Supply/Fatigue arithmetic, but never a moved
    Forecast/Readiness/Death/signal - so `extra` no longer enters the preparation at all. */
 const v={...n,traits:Presentation.traits(n),pack:n.pack},p=Dungeon.prepare(v,d,game.run.facilities);
 /* ...and the outlook itself is the frozen SALE-entry snapshot, not this live preparation. */
 const o=n.outlook||game.outlookFor(n);
 /* DUNGEON_HAZARD §GREAT SUCCESS signal. It sits in the forecast the player is already reading,
    before departure and while the preparation can still change, and it is recomputed from the
    same margin the roll uses - so it moves as items are added. It says the attempt is worth
    chasing and nothing more: no percentage, no margin, no readiness score. */
 const signal=o.greatSignal;
 /* Two forecasts, said apart. An expedition can fail two different ways - beaten in the fight,
    or worn down by the environment - and one blended verdict hides which. Both read their own
    canonical vocabulary: the fight is Dungeon.estimate (우세/접전/불리), the environment is the
    weakest Hazard state already computed for the rows below (충분/대응/불안/취약). No new label
    and no new calculation: the summary IS the worst of the rows the player can see. */

 const mob=cls==='core-mob';
 return '<div class="readout'+(cls?' '+cls:'')+'">'
 +'<div class="top">'
  +'<span class="fore">전투 전망<b>'+o.combat+'</b>'
  /* v2.9.0 (User 2026-09-24, COPY_AUDIT §4-1): the exact failure-conditioned Death risk is the
     second line of this help, not an always-on cell - the readout reads 전투 전망 and 환경 대응.
     Same frozen SALE-entry value, said as a conditional, never as the chance the expedition
     ends in death. The NPC detail states it too (§5-7). */
   +tip('전투 전망','손님의 힘과 게이트의 요구 전력을 견준 전망. 우세 · 접전 · 불리.','실패 시 사망 위험 '+Math.round(o.deathRisk*100)+'%')+'</span>'
  /* The environment half of the pair the comment above describes. It is `outlook.worst` - the
     weakest of the Hazard states the destination plate lists, in the same canonical
     vocabulary (충분/대응/불안/취약) and off the same frozen SALE-entry snapshot. It reads
     here because it is judged against an Item, beside the other two readings a product is
     bought to move. No new label and no new calculation. */
  +(o.worst?'<span class="fore">환경 대응<b class="env-'+(['취약','불안'].includes(o.worst)?'lack':'ok')+'">'+E(o.worst)+'</b>'
   +tip('환경 대응','게이트의 위험을 얼마나 막을 수 있는지. 충분 · 대응 · 불안 · 취약.')+'</span>':'')
  +'</div>'
 /* v2.9.0 (User 2026-09-24): no always-on Fatigue line under the outlook - current Fatigue is the status strip's
    `피로 N`, the counter tray shows `피로 A → 출발 B` for a chosen Food/Drink that moves it, NIGHT answers the rest. */
 +(signal?'<p class="great-signal">'+E(Copy.great.signal)+'</p>':'')
 /* The environment is NOT repeated here. Every Hazard, its pressure and this NPC's readiness
    against it live in one place - the 예상 목적지 plate below - so the player reads the danger
    where the destination is named instead of meeting a second, differently-worded copy of it
    inside the outlook. The outlook keeps only what is about the expedition as a whole:
    the Combat Forecast and the conditional Death risk. SA-Q30: the permanent forecast
    disclaimer that used to close this panel is gone; existing anchored ?s already cover
    what each figure means, so nothing replaces it. */
 +'</div>';}
/* Returning history is useful reference, not the current decision. It therefore starts folded
   to one line; opening it is local reading state and does not hide current Stats or Traits. */
function returningSummary(n){const r=Presentation.returning(n);if(!r)return '';
 return '<details class="since" aria-label="지난 방문 이후"><summary><b>지난 원정 · DAY '+r.day+' '+E(r.outcome)+'</b></summary>'
  +'<div class="since-body">'+(r.changes.length?'<p>'+r.changes.map(E).join(' · ')+'</p>':'')+(r.impact?'<p>'+E(r.impact)+'</p>':'')+'</div></details>';}
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
   const nextNpcId = s.queue[s.cursor+1];
   const nextNpc = nextNpcId ? s.npcs.find(x=>x.id===nextNpcId) : null;
   const preloadArt = nextNpc ? Scene.npcArt(nextNpc) : null;
   const preloadHtml = preloadArt ? '<img src="'+preloadArt+'" style="display:none" aria-hidden="true">' : '';
   const st=s.inventory.find(x=>x.id===selected);
   return '<div class="stage p-sale">'+menuFab()+preloadHtml+taskLine('sell')
 +'<section class="front" data-npc="'+E(n.id)+'" aria-label="계산대 앞">'
  +'<div class="backwall" aria-hidden="true">'+Scene.shelfStrip()+'</div>'
  /* UI_UX v2.6.1 SALE AUTHORITY: portrait left, Core Decision upper-right. The forecast,
    the expected destination and the customer's wallet belong to one hierarchy beside the
    face, not to a second column underneath it. Only one forecast is ever visible - the
    desktop copy sits here, the phone's rejoins the reading order after the last
    expedition - so nothing is duplicated on screen. */
 +speech(n)+standee(n)+'<div class="front-side">'+kitLine(n)+readout(n,st?st.item:null,'core-desk')+destPlate(n)+waitingLine(waiting)+'</div>'
 +'</section>'
 +'<div class="counter-edge" aria-hidden="true"></div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="영업">'
  /* UI-Q109 §8. Reading order stays what it was - who this is, then what to sell them - but
     the shelf has to be reachable without a scroll, and measured on a phone the Trait rows
     were the block that pushed the first product row past the fold. They are the one thing
     here that a product cannot move: the forecast and the four Core Stats are exactly what
     보급 후 변화 compares against when a product is picked, so they lead, and the Traits read
     as the standing description they are, under the goods. Nothing is dropped, no wording
     changes, and the wide layout still sets both columns side by side. */
  +'<div class="dossier-col">'
   +'<div class="dossier">'+returningSummary(n)+readout(n,st?st.item:null,'core-mob')+statGrid(n)+deepOfferUI(n)+'</div>'
   +'<div class="dossier traits">'+traitRows(n)+'</div>'
   +ownedRelicView()
  +'</div>'
  +shelf()
 +'</main>'
 +tray()
 /* D-34. Every price on this screen is a judgement against what the store has, and the
    store's gold was the one number not on it - Morning, Order and Closing all show it and
    Sale did not. It goes on the strip that is already pinned here, beside the queue, rather
    than becoming a readout of its own. */
 +'<div class="dock"><div class="queue"><span>손님 '+(s.cursor+1)+' / '+s.queue.length+'</span>'+pips(s.queue.length,s.cursor)
 +'<span class="on-hand">보유 골드 <b>'+fmt(s.money)+'</b>G</span></div>'
 +btn(s.cursor+1===s.queue.length?'영업 종료':'손님 보내기','depart','stamp')+'</div></div>';
}
// The waiting line. Every customer still outside is the same back — no face, silhouette,
// colour, rarity or name leaks out of it. Only how many are left is public.
function waitingLine(waiting){
 if(!waiting)return '<div class="line-up last"><span class="left">마지막 손님</span></div>';
 const backs=Array.from({length:Math.min(waiting,4)},(_,i)=>
  '<span class="wait" style="--i:'+i+'" aria-hidden="true">'+Scene.cardBack()+'</span>').join('');
 return '<div class="line-up" aria-label="대기 손님 '+waiting+'명"><span class="fan">'+backs+'</span>'
 +'<span class="left">대기 '+waiting+'</span></div>';}
// The active customer. Layers, bottom to top: light pool -> contact shadow -> the NPC
// sticker itself -> the rarity bracket -> the identity plate. Nothing is baked into the
// artwork and nothing crops it: object-fit contain, standing on the counter line.
/* The customer's line lives above their head with the tail pointing down at them, so it
   reads as this person speaking rather than as a system notice. One bubble serves the whole
   sale: the greeting on arrival, then the purchase or refusal reaction in the same place.
   Only lines attributed to the customer at the counter are shown.

   UI-Q110. On a phone the balloon was a permanent row in the counter band, and the band is
   what pushed the shelf off the screen. It is presentation, so it is drawn as an overlay
   that reserves no height at all, and it leaves on its own after a beat.

   `run.say` stays the dialogue truth and keeps its place in the Save. What is held here is
   only whether THIS UI has already shown a given line - a per-line marker no schema knows
   about. A plain redraw in the same speech state must not bring a dismissed balloon back, so
   the marker is keyed by speaker AND line, and only a genuinely new line clears it. */
const SAY_MS=3000;
/* v2.9.0 TRANSACTION BEAT A2 (User 2026-09-24): the customer's answer to a sale or a refusal stays
   longer than a greeting. Which kind a line is comes from the cue of the draw that first shows it,
   so no speech state is added. */
const SAY_REPLY_MS=5000;
let sayKey=null,sayHidden=false,sayTimer=null,sayArmed=null;
function speech(n){
 const said=game.run.say;
 if(!said||said.npc!==n.id||!said.text)return '';
 const key=said.npc+'\u001f'+said.text;
 if(key!==sayKey){sayKey=key;sayHidden=false;}
 if(sayHidden)return '';
 /* A status message is not dialogue: same position, same weight, but no bubble ground, no
    tail, no quotation marks in its copy, and it does not expire or invite a dismiss tap. */
 if(said.status)return '<p class="say status" role="status" aria-live="polite"><span>'+E(said.text)+'</span></p>';
 /* tapping the balloon dismisses it early. It is a convenience over the timer, never the
    only way the line goes away, so the live region keeps its announcing role. */
 return '<p class="say" role="status" aria-live="polite" data-action="say-hide"><span>'+E(said.text)+'</span></p>';
}
/* The timer is armed by the draw that first puts a line on screen and is left alone by every
   redraw of that same line, so picking through the shelf under an open balloon cannot keep it
   alive indefinitely. Hiding removes the node and sets the marker; no gameplay state moves. */
function hideSpeech(){
 if(sayTimer){clearTimeout(sayTimer);sayTimer=null;}
 sayArmed=null;sayHidden=true;
 const el=$('.say');if(el)el.remove();
}
function armSpeech(ms=SAY_MS){
 if(!$('.say:not(.status)')){if(sayTimer){clearTimeout(sayTimer);sayTimer=null;}sayArmed=null;return;}
 if(sayArmed===sayKey)return;
 if(sayTimer)clearTimeout(sayTimer);
 sayArmed=sayKey;
 sayTimer=setTimeout(hideSpeech,ms);
}
function standee(n){
 const art=Scene.npcArt(n),job=D.jobBy[n.job].name,rank=D.npcRarities[n.rarity]||'';
 return '<button class="who r'+n.rarity+(Presentation.returning(n)?' returning':'')+'" data-action="npc" data-id="'+n.id+'" aria-label="'+E(n.name)+' Lv.'+n.level+' '+job+' 기록 보기">'
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
 +'</span></button>';}
/* SA-Q18 / UI_UX_v2.8 §EVENT TEMPORARY BUDGET. A 급여일 Wallet is two numbers: the persistent
   소지금 and a budget that exists only for today's visit. interest() and sell() spend both, so a
   screen that prints 소지금 alone states an affordability the Player cannot check. The two are
   printed side by side and never summed into one figure - the temporary half is never relabelled
   소지금. The wording is the approved Event Function's own (오늘 방문 모험가 · 현재 소지금의 20%만큼
   추가 구매 가능), so nothing new is invented here. */
function walletChip(n){const b=n.eventBudget||0;
 return '소지 <b>'+fmt(n.money)+'G</b>'+(b>0?' · 추가 구매 <b>+'+fmt(b)+'G</b>':'');}
/* what the customer can actually pay with right now: the same sum interest() and sell() use. */
function spendable(n){return n.money+(n.eventBudget||0);}
/* SA-Q13 / SA-Q46. 단골 has ONE owner: Adventurer.isTrustedRegular, which is Loyalty >= 51.
   Nothing here re-states the number and nothing carries a second UI threshold - the Store
   Support conditions at 30 / 50 / 60 are their own mechanics and do not redefine 단골. The
   compact SALE state carries Injury, Fatigue and Loyalty, with 단골 shown as a state rather
   than as a progress bar. Normal SALE shows the value alone: no separate `?` / Loyalty
   popover trigger competes with the Bag for the same row. The meaning is taught by the
   tutorial/coach and stays available in the compact Help under its own owner. */
function kitLine(n){const slots=Adventurer.slots(n),parts=[n.status];
 /* SA-Q04: n.status is already the Injury state in words (건강 / 부상 / 중상), so a second
    numeric 부상 N beside it said the same thing twice. */
 if(n.fatigue)parts.push('피로 '+n.fatigue);if(n.recovery)parts.push('휴식 '+n.recovery+'일');
 parts.push('단골도 '+n.loyalty+(Adventurer.isTrustedRegular(n)?' · 단골':''));
 /* SALE_v2.6.1 Task 14: the wallet is decision information, not a consequence of having
    already picked a product - it reads here, before pricing, in the same block as the bag. */
 /* UI-Q109 §6. The status lines and the bag are two things, not four stacked rows: grouping
    the lines lets the bag stand beside them in the width they were already leaving idle,
    instead of under them. Same information, same order, same wording. */
 /* SA-Q46: Equipment is proven Core-Stat source information, not compact SALE-top decision
    state - it stays readable in NPC detail and does not compete here with Bag/Wallet for
    the same row. */
 /* META §DECORATION 의무실 현판: an Injury healed at the door says so once, in the customer's own
    state strip, under the bag where no speech balloon or menu pin sits - one line, no modal,
    nothing to dismiss. `healedBy` is reset on every arrival. */
 const heal=n.healedBy==='infirmaryPlaque'?'<p class="heal-note" role="status">의무실 현판 덕분에 부상이 나았다.</p>':'';
 return '<div class="kit"><div class="vitals"><span>상태 <b>'+parts.join('</b> · <b>')+'</b></span>'
 +'<span class="npc-wallet">'+walletChip(n)+'</span></div>'
 /* how many slots are left is a decision on every sale, so it says the count as well as
    showing it - a row of boxes has to be counted before it can be used. The Bag keeps this
    place in the customer's own strip (User 2026-09-24: not moved); the hand-over lands here. */
 +'<span class="slots" aria-label="가방 '+n.pack.length+' / '+slots+'칸"><b class="slot-label">가방 '+n.pack.length+' / '+slots+'</b>'
  +Array.from({length:slots},(_,i)=>'<i class="'+(n.pack[i]?'full':'free')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],24):'')+'</i>').join('')+'</span>'+heal+'</div>';}
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
 const dock=btn('전체 건너뛰기','closing','bare')
 /* USER CONFIRMED 2026-09-22: the last result hands over to the day's close, so it names it. */
 +btn(last?'마감으로':'다음','night-next','stamp');
 return '<div class="stage p-night'+(r&&r.outcome==='사망'?' cold':'')+'">'+menuFab()
 +'<div class="nightband" aria-hidden="true">'+Scene.nightRoom()+'</div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="밤">'
  +taskLine('night')+rail
  +'<div class="beat-room">'
   +(s.pilgrimage?'<p class="event-note">게이트 순례주간 · 실제 변경 '+s.pilgrimage+'명</p>':'')
   +(r?beat(r):'<p class="muted">오늘은 원정에 나선 손님이 없었다.</p>')
  +'</div>'
 +'</main><div class="dock">'+dock+'</div></div>';}
// The tone of a beat is the actual outcome, never a score: 대성공 warm, 퇴각/부상 ember,
// 중상 blood, 사망 bone. 위기에서 생환 keeps its own reading so the rescue is not
// presented as an ordinary success.
function beat(r){
 const n=game.run.npcs.find(x=>x.id===r.npcId),tone=Presentation.nightTone(r),heavy=weighty(r);
 /* NIGHT_CLOSING §RESULT OUTCOMES: six outcomes in three volumes, not two. */
 const rank=Presentation.nightRank(r);
 const verdict=Presentation.nightVerdict(r),why=Presentation.nightWhy(r),hero=Presentation.heroLine(r);
 /* SA-Q09: the character's own line is the temporary SALE-style balloon (speech(n)), never a
    permanent blockquote - a routine return and a rescue both get to speak, not only the
    "heavy" ones, and the line goes away on its own instead of sitting on the card forever. */
 /* UI_UX §NIGHT LAYOUT — OUTCOME PLACEMENT (USER AMENDMENT 2026-09-22): the Outcome belongs to
    the returning adventurer's identity block, directly above the name and one step stronger than
    it. It is the record's primary reading by weight and placement, not by becoming a full-width
    headline row with a rule across the record - that took vertical space of its own for a word. */
 /* NIGHT_CLOSING §RESULT INFORMATION HIERARCHY, read as three tiers rather than five boxes:
    the Outcome, then the one sentence that tells it plus what the Player's own goods did to it
    as its SUB lines, then the fact line, then what the adventurer grew and what the day left
    on them. The proven Hero claim and the supply line used to be two independent blocks with
    their own grounds - a second and third result competing with the first - and the fact line
    was a third block. They are one `.told` group now; nothing was added or removed. */
 /* UI_UX §NIGHT LAYOUT — DEATH PAYLOAD / NIGHT_CLOSING §DEATH IS A CLOSED RESULT (USER
    AMENDMENT 2026-09-22): a death is a finished result, so the record carries the status
    message, the character, `사망`, the name, the Dungeon · Lv and the Outcome summary - and
    stops. No route change, Deep tag, Item cause, incident line, growth or settlement figure,
    and no divider or reserved space where any of those would be. The resolution still recorded
    whatever it recorded; this is a render rule. */
 const gone=r.outcome==='사망';
 return '<article class="beat '+rank+' t-'+tone+(heavy?'':' quiet')+(gone?' gone-beat':'')+'">'
 +'<div class="stand-in">'
  +speech(n)+portrait(n,150,'returner')
  +'<div class="who">'
   +'<p class="verdict">'+E(verdict)+'</p>'
   +'<h3>'+E(r.name)+'</h3><p class="place">'+E(r.dungeonName)+' · Lv.'+r.level+'</p>'
   +(!gone&&r.routeChange?'<p class="route">'+E(r.routeChange)+'</p>':'')
   +(!gone&&r.deep?'<p class="deep-tag">'+E(Copy.deep.result)+'</p>':'')+'</div>'
 +'</div>'
 +'<div class="told">'
  +'<p class="what">'+E(Presentation.nightHappened(r))+'</p>'
  +(gone?'':causeLines(r))
  /* what the Outcome and its summary do NOT already say: an attributed incident, or an event
     that speaks for itself. The fight verdict sentence is no longer among them - UI_UX §NIGHT
     LAYOUT — COMBAT FACT retires it from the player-facing record at every hierarchy. */
  +(!gone&&why?'<p class="why">'+E(why)+'</p>':'')
 +'</div>'
 +(gone?'':'<div class="changed">'+changedRows(r)+'</div>')
 +'</article>';}
// Importance decides how much copy a beat spends, never how big the adventurer is
// (UI-Q31). Presentation owns the rule so screen and tests share it.
const weighty=r=>Presentation.nightWeight(r);
/* WHY THE OUTCOME WAS THIS ONE — the Player's own goods, as sub lines of the Outcome sentence.
   SA-Q33 / NIGHT_CLOSING §HERO ITEM FEEDBACK: the proven claim is the strongest thing that can
   be said about a sold Item, so when the supply line credits exactly the Items that claim
   already names it is the same fact twice and is left out. A supply line for other Items - a
   proven Hazard mitigation, say - still reads, under the claim. */
function causeLines(r){
 const hero=Presentation.heroLine(r),proven=r.heroProof?.outcome?.items||null;
 const supply=Presentation.supplyLines(r).filter(l=>!(hero&&proven
  &&l.items.every(name=>proven.some(id=>D.itemBy[id]?.name===name))));
 const lines=(hero?[hero]:[]).concat(supply.slice(0,1).map(l=>l.text));
 return lines.length?'<ul class="cause">'+lines.map(t=>'<li>'+E(t)+'</li>').join('')+'</ul>':'';}
// WHAT CHANGED — Presentation decides what actually moved; this only stamps it.
function changedRows(r){
 /* NIGHT_CLOSING 2026-09-12: a normal 대성공 also pays the Store, and a 심층원정 pays it
    nothing at all - what it returns is the adventurer's growth and money, reported as their
    change and never as Store income. Both are stated once, beside the ordinary changes. */
 const extra=[];
 if(r.storeBonus)extra.push({kind:'gold',group:'reward',label:'대성공 본사 보상',value:'+'+fmt(r.storeBonus)+'G'});
 if(r.deep&&(r.deep.bonusXp||r.deep.bonusWallet)){
  if(r.deep.bonusXp)extra.push({kind:'level',group:'reward',label:Copy.deep.reward,value:'경험치 +'+r.deep.bonusXp});
  if(r.deep.bonusWallet)extra.push({kind:'gold',group:'reward',label:Copy.deep.reward,value:'손님 소지금 +'+fmt(r.deep.bonusWallet)+'G'});
 }
 const n = game.run.npcs.find(x=>x.id===r.npcId);
 /* NIGHT_CLOSING §FATIGUE RESULT. The settled 귀환 후 피로 token is the only one carrying a
    `detail` - the resolved 출발 -> ... -> 귀환 후 arithmetic - so it alone joins the one shared
    anchored tip (same exclusive group, same out-of-flow balloon, same hover/focus/tap and
    outside-tap/Escape behavior everywhere else on screen already uses). Every other token
    stays the plain stamped chip it always was. */
 const stamp=c=>c.note
  /* v2.9.0 NIGHT next-decision line (COPY_AUDIT §6-6): one sentence under the settled Fatigue, not a chip */
  ?'<p class="next-decision">'+E(c.value+' — '+c.label+' '+c.extra)+'</p>'
  :c.detail
  ?'<details class="tip '+c.kind+'" name="sale-tip"><summary aria-label="'+E(c.label+' '+c.value+' · 피로 변화 보기')+'"><i>'+E(c.label)+'</i><b>'+E(c.value)+'</b></summary>'
   +'<p><span>'+E(c.detail)+'</span></p></details>'
  /* UI_UX §NIGHT LAYOUT — EQUIPMENT / POWER TERM: the identity and the Stat effect were one run
     of words (`장비 보강된 전사 장비 전투 +5`). The effect is its own element after a middle dot
     now, so the two facts read apart without a second card or badge. */
  :'<span class="tok '+c.kind+'"><i>'+E(c.label)+'</i><b>'+E(c.value)+'</b>'
  +(c.extra?'<em>'+E(c.extra)+'</em>':'')+'</span>';
 /* The tokens were one flat run, so a Level sat in the same layer as 귀환 후 피로 and the
    aftermath read as more growth. They are the same tokens in the same owned order - Level /
    Stat, then Fatigue, then EXP / Wallet / other - split into the three groups
    `Presentation.nightChanges` marks: GROWTH, AFTERMATH, REWARD. Spacing and one minimal rule
    tell them apart - no heading, so no new copy, and no reordering across a boundary. */
 const all=[...Presentation.nightChanges(r, n),...extra];
 const band=key=>{const rows=all.filter(c=>(c.group||'grew')===key);
  return rows.length?'<div class="'+key+'">'+rows.map(stamp).join('')+'</div>':'';};
 return band('grew')+band('after')+band('reward');}
// CLOSING — `오늘 장사는 어땠을까?`. Economics only; the expedition story belongs to Night.
// The object is the till roll the register printed when the shutter came down: a narrow
// strip torn at both ends, lying on the dark counter under the same lamp. Not the order
// form — that is a wide sheet a person fills in; this is a tape a machine printed, so
// every figure is monospace and right-aligned on a dotted leader, subtotals rule off,
// and the money actually in the drawer is the last thing stamped on it.
function closingScreen(){
 const s=game.run,d=s.daily,margin=d.revenue-d.cogs;
 const profit=margin+(d.subsidy||0)+(d.commission||0)+(d.greatSuccess||0)+(d.safeGold||0)-d.operating-(d.wasteCost||0)-(d.rerollSpent||0);
 /* a printed zero is still printed - the receipt states every figure - but it is marked so the
    detail rows that did not move stay quiet under the day's result (UI_UX §CLOSING). */
 const line=(label,value,cls='')=>'<div class="row '+cls+(value?'':' nil')+'"><span>'+label+'</span><b>'+fmt(value||0)+'</b></div>';
 /* SA-Q21 / SA-Q34: Closing is economics-only. What an actual sold Item did for an actual
    expedition is NIGHT's own causality, already told there through the Outcome sentence and
    the proven Hero Item line - repeating it here under 오늘의 보급 영향 duplicated it, in a
    place with no adventurer on screen to attribute it to. The explanatory footer taught
    internal accounting the receipt above it already shows in real figures. Neither returns. */
 const body='<div class="tape">'
 +'<div class="tear top" aria-hidden="true"></div>'
 +'<div class="print">'
  +'<div class="head"><b>GUILD24</b><span>DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span><span>영업 종료</span></div>'
  +'<div class="block">'+line('매출',d.revenue)+line('판매 원가',-d.cogs)
   +line('판매 마진',margin,'sum')+'</div>'
  +'<div class="block">'+line('운영비',-d.operating)+line('폐기 원가',-d.wasteCost)
   +line('발주 교환',-d.rerollSpent)+line('본사 지원·수당',(d.subsidy||0)+(d.commission||0))
   +(d.greatSuccess?line('대성공 본사 보상',d.greatSuccess):'')+(d.safeGold?line('알뜰 금고',d.safeGold):'')+'</div>'
  +'<div class="row profit'+(profit<0?' loss':'')+'"><span>영업 손익</span><b>'+(profit>0?'+':'')+fmt(profit)+'</b></div>'
  +'<div class="block">'+line('발주 지출',-d.spent)+line('점포지원 투자',-d.relicSpent)
   +(d.deepSponsor?line(Copy.deep.sponsor,-d.deepSponsor):'')+line('재고 정리',d.liquidation)+'</div>'
  +'<div class="purse"><span>보유 자금</span><b>'+fmt(s.money)+'<i>G</i></b></div>'
 +'</div>'
 +'<div class="tear bottom" aria-hidden="true"></div></div>';
 const rescue=game.canRescue(),spent=(s.rescueUsed||0),cap=game.rescueLimit();
 const dock=(s.money<0
  ?'<p class="danger-text">운영비가 부족하다.'+(rescue?' 회생 '+spent+' / '+cap+'':' 회생을 모두 썼다.')+'</p>'
   +(rescue?btn('재고 정리','stock'):'')+btn('폐점','retire','danger')
  :'')+btn('다음 날','close','stamp');
 return '<div class="stage p-closing">'+menuFab()
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="마감">'+taskLine('closing')+body+'</main>'
 +'<div class="dock">'+dock+'</div></div>';
}
const coachSteps={
 /* UI_UX §FIRST-EVER DEEP EXPEDITION TUTORIAL. It is keyed to the notice, so it appears the
    first time a Deep Expedition actually occurs and never before the feature exists. Completion
    is account-scoped like every other coach mark: a Run abandon keeps it, a full data reset
    clears it and the next first occurrence teaches it again. No new persistence was added. */
 morning:[['visitors','#visitor-count','오늘 올 손님 수. 점포지원·장식·사건에 따라 달라진다.'],['gates','.slip.gate','열린 게이트의 위험을 보고 오늘 필요한 상품을 준비한다.'],['deep','.slip.deep','같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.']],
 /* v2.9.0 (User 2026-09-24): gates -> offer -> quantity -> confirm -> reroll; the 보유 골드 mark is retired, the register reads itself */
 order:[['gates','.brief .when','오늘 열린 게이트와 위험. 위험 보기를 누르면 무엇으로 막는지 나온다.'],['offer','.lines .line','음식은 피로 회복, 음료는 능력치·위험 보조와 약간의 피로 회복, 포션은 투력, 장비는 위험 대응, 보험은 실패 완화.'],['quantity','.dial','오늘 손님과 게이트를 보고 수량을 정한다. ‘최대’는 이 후보에서 지금 발주할 수 있는 최대 수량이다.'],['confirm','[data-action="confirm-order"]','카트의 상품만 발주한다. 확정 뒤에도 추가 발주와 후보 교환이 가능하다.'],['reroll','.rubber','후보 전체를 교환한다. 같은 날 반복하면 비용이 오른다.']],
 /* USER 2026-09-24 (first-sale coach diet): the first SALE teaches four marks - the destination
    (COPY_WORLD_VOICE §Tutorial: the rule that a destination can change is taught here, never
    through one Trait's name), the Hazard rows, the frozen outlook and the price - in the order
    the screen reads. Everything else is contextual: showCoach() shows the first unfinished mark
    whose target is VISIBLE, so a mark anchored to an element that only exists in its situation
    (a Supply line, the Great Success signal, a returning customer's last-expedition line, a
    filled Bag slot) teaches itself the first time that situation exists and never before.
    Exact copy: COPY_AUDIT §3.
    UI_UX §TUTORIAL - READ THE SYSTEM, DO NOT GIVE THE ANSWER: no mark names an Item for a Hazard. */
 sell:[['destination','.dest-plate','이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.'],
 ['hazard','.dest-plate .hazards','이 손님이 갈 게이트의 위험. 위험마다 압박하는 능력이 다르다.'],
 /* COPY_AUDIT §3-7 STATS (User 2026-09-24): the first time a customer's Stats are on screen - what they are, that they
    differ per customer, 투력 for combat, the other three for the Hazards. No number, no verdict. */
 ['stats','.dossier .detail-stats','능력치는 직업·희귀도·레벨마다 다르다. 투력은 전투에 가장 영향력이 크며, 강인함·기동·정신은 각 위험에 대응한다.'],
 /* UI-Q-v28-27. `.top` is the frozen SALE-entry snapshot itself; `.ingredients` and
    `.great-signal` below it move with the committed Bag, so the cutout stops above them. */
 ['forecast','.readout .top','손님이 계산대에 왔을 때의 원정 전망. 팔아도 이 칸은 그대로고, 변화는 상품을 고르면 아래에 나온다.'],
 ['pricing','.tills','50% 할인은 단골도를 크게 올리고, 정가는 조금 올린다. 바가지는 더 남지만 단골도가 깎이고 거절될 수 있다.'],
 /* contextual marks - the hidden Supply-deficit formula is not taught, only the visible consequence */
['supply','.counter-tray .tray-delta .fatigue','음식·음료는 피로를 줄인다. 피로가 10을 넘으면 기동·정신이 떨어진다.'],
 ['great','.great-signal','대성공 신호. 준비가 넉넉할 때 뜨지만, 대성공이 확정되는 건 아니다.'],
 ['returning','.who.returning','다시 온 손님. 지난 원정과 특성, 기록은 손님을 눌러 본다.'],
 ['bag','.slots .full','판 상품은 손님 가방에 들어가 오늘 원정에서 쓰고 사라진다.']],
 night:[['result','.beat','한 명씩 원정 결과와 변화를 확인한다. 전체 건너뛰기로 바로 정산할 수 있다.']],
 /* UI-Q-v28-27. `.tape` is the whole receipt - 653px on a phone, which no cutout can hold
    with the bubble - so the mark cut out its top 265px: the head and the 매출 / 판매 원가 block,
    which is not what this lesson is about. The copy names 영업 손익, so it points at that row;
    the 발주 지출 / 점포지원 투자 block it says is listed apart is the next row group under it. */
 /* FINAL-Q77: the first time the party-wide forecast appears, once per account. */
 final:[['subjugation','.final-forecast .top',Copy.finalPrep.forecastWhy.join(' ')]],
 closing:[['receipt','.tape .row.profit','오늘 영업 손익을 확인한다. 발주·점포지원 지출은 따로 표시된다.']],
 /* USER 2026-09-24: the very first decision of a new store is the DAY 0 Store Support pick, and
    it used to open with no word of what a Store Support is. These three marks read the takeover
    - what it is, how a card reads, what the key does and when more arrive - and never name a
    pick. They run on the DAY 0 takeover only (see showCoach); account-scoped like every mark. */
 relic:[['relic-what','.relic-open','점포지원은 이번 영업 내내 적용되는 효과다. 첫 지원은 하나를 무료로 고른다.'],
  ['relic-card','.relic-choices .relic-plate','카드마다 효과와 가격이 적혀 있다. 이번 영업을 어떻게 꾸릴지 떠올리며 고른다.'],
  ['relic-buy','.relic-choices .relic-plate .stamp','누르면 바로 확보된다. 이후 DAY 5·10·15·20·25·30에 새 후보가 오고, 최대 7개까지 들일 수 있다.']]
};
let activeCoach=null;
let coachSettle=0,coachPainted=null,activeGroup=null;
/* The target's own position, rounded - the one thing the whole overlay is measured from, so it
   is also what tells us whether a repaint is needed. */
const coachKey=el=>{const r=el.getBoundingClientRect();
 return [Math.round(r.top),Math.round(r.left),Math.round(r.width),Math.round(r.height)].join(':');};
/* UI-Q-v28-27: the cutout has to hold the exact content the copy describes. Split out of
   showCoach so the same geometry can be re-struck once the target has stopped moving - see
   settleCoach. Picking the step, and the one scroll, stay in showCoach: this only paints. */
function paintCoach(step,target){
 const root=$('#coach-root');if(!root)return null;
 const b=target.getBoundingClientRect(),left=Math.max(4,b.left-4),top=Math.max(4,b.top-4),width=Math.min(innerWidth-left-4,b.width+8);
 /* UI-Q-v28-27: the bubble may not cover the next required control, and on every phase that
    control is the dock. The usable floor is therefore the dock's top edge, not the viewport's -
    the 진열대 lesson used to be placed just below its product row and ran 29px over 손님 보내기. */
 const dockEl=document.querySelector(modal==='relics'?'.relic-takeover .close':'.stage .dock');
 const floor=dockEl?Math.min(innerHeight,Math.round(dockEl.getBoundingClientRect().top)):innerHeight;
 /* UI-Q113 §10 raised the cutout from a flat 180px to a share of the viewport so the SALE card
    would fit. 34% of a 780px phone is 265px, which the card (241px) clears - but the NIGHT beat
    is 352px and the CLOSING tape 653px, so those two lessons cut out the top of their subject
    and left the rest under the mask: 86px and 388px of the exact content being described.
    The share was never the requirement - the requirement is that the bubble still has a masked
    band to sit in, above or below. So the cap is that room, and the old share stays as the
    floor under it, which is what keeps a short screen from being swallowed.
    RESERVE is the tallest real bubble (143px) plus its two 12px gaps, rounded up. */
 const RESERVE=172;
 const room=top>=RESERVE?floor-top:floor-top-RESERVE;
 const height=Math.min(b.height+8,Math.max(Math.round(innerHeight*.34),room)),bottom=top+height;
 const bw=Math.min(340,innerWidth-24),bh=210,x=Math.max(12,Math.min(innerWidth-bw-12,left)),y=bottom+bh+12<floor?bottom+12:Math.max(12,top-bh-12);
 const block=(l,t,w,h)=>'<div class="coach-block" style="left:'+l+'px;top:'+t+'px;width:'+Math.max(0,w)+'px;height:'+Math.max(0,h)+'px"></div>';
 root.innerHTML='<div class="coach-layer'+(modal==='relics'?' over-takeover':'')+'">'+block(0,0,innerWidth,top)+block(0,bottom,innerWidth,innerHeight-bottom)+block(0,top,left,height)+block(left+width,top,innerWidth-left-width,height)+'<div class="coach-focus" style="left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px"></div><section class="coach-bubble" role="dialog" aria-label="점주 안내" style="left:'+x+'px;top:'+y+'px;width:'+bw+'px"><small>점주 안내</small><p>'+step[2]+'</p><div>'+btn('안내 건너뛰기','coach-skip','coach-skip')+btn(step[3]?'눌러서 살펴보기':'다음','coach-next','stamp')+'</div></section></div>';
 /* `bh` above is only the estimate that keeps the first paint from flashing. A real bubble is
    120-143px, not 210, so a mark placed ABOVE its target sat up to 106px clear of the cutout
    and the copy stopped reading as belonging to the thing it points at. Re-seat it on its own
    measured height, which is why this is a style write and not a second paint. */
 const bub=root.querySelector('.coach-bubble');
 if(bub){const real=bub.getBoundingClientRect().height;
  bub.style.top=(bottom+real+12<floor?bottom+12:Math.max(12,top-real-12))+'px';}
 return coachKey(target);
}
/* The coach is drawn one frame after render() and render() starts the phase-entry animation on
   the same tick, so it used to measure a target that was still moving: ORDER animates `.form`
   translateY 16 -> 0 over 280ms, and the ledger lesson struck its cutout 15px low and stayed
   there, masking the 운영비(예상) row it was pointing at. Wait for the target to hold the same
   rect for two frames, then re-strike once if it has moved. Bounded, and it fixes any cause -
   entry animation, late font, image load - without the coach knowing any duration. */
function settleCoach(step,target){
 let last=null,still=0,frames=0;
 const tick=()=>{
  if(activeCoach!==step)return;
  const key=coachKey(target);
  if(key===last)still++;else{last=key;still=0;}
  if(still>=2){if(key!==coachPainted)coachPainted=paintCoach(step,target);return;}
  if(++frames<48)coachSettle=requestAnimationFrame(tick);
 };
 coachSettle=requestAnimationFrame(tick);
}
function showCoach(){
 const root=$('#coach-root');if(!root)return;root.innerHTML='';activeCoach=null;
 cancelAnimationFrame(coachSettle);
 const tutorial=game.account.tutorial||{};
 /* A mark never sits over a modal - except the DAY 0 Store Support takeover, which IS the first
    screen of a new store and has its own lesson. */
 const relicD0=modal==='relics'&&game.run?.phase==='foundation';
 if(tutorial.skipped||(modal&&!relicD0))return;
 /* Skip a step whose target is not on this screen rather than stopping at it: a contextual
    mark (a Deep notice, a Great Success signal) only exists on some Days, and stopping would
    hold back every mark behind it until that Day came. */
 const steps=relicD0?coachSteps.relic:(coachSteps[game.run?.phase]||[]);activeGroup=steps;
 /* Anchor to a VISIBLE match, not the first one in the DOM. The SALE readout and its
    decision ingredients exist twice - a desktop copy and a phone copy, one of which is always
    display:none - so `$()` handed the coach the hidden one on a phone and those lessons never
    appeared there. */
 const visible=sel=>[...document.querySelectorAll(sel)].find(e=>e.getClientRects().length);
 const step=steps.find(x=>!tutorial['coach-'+x[0]]&&visible(x[1]));if(!step)return;
 const target=visible(step[1]);
 /* A target inside the phase's scroll area is judged against THAT area, not the window: the
    band above it (the SALE customer front, ~240px on a phone and ~400px on a desk) is a fixed
    flex item the scrolled column slides under, so a mark whose target had been scrolled beneath
    it measured as "visible" at y=195 and lit the band instead of the line it teaches
    (UI-Q-v28-27: automatic scroll must not leave the target behind a header). */
 const view=target.getBoundingClientRect(),area=target.closest('.stage-scroll')?.getBoundingClientRect();
 const top=Math.max(80,area?area.top:0),bottom=Math.min(innerHeight-100,area?area.bottom:innerHeight);
 if(view.top<top||view.bottom>bottom){target.scrollIntoView({block:'center',behavior:'instant'});}
 coachPainted=paintCoach(step,target);
 activeCoach=step;
 settleCoach(step,target);
}
function finishCoach(skip=false){
 if(!activeCoach&&!skip)return;const t=game.account.tutorial??={};
 /* USER 2026-09-24: 건너뛰기 skips THIS screen's lesson only - every mark of the group on screen
    is marked done - and the next screen still teaches its own. `skipped` stays the whole-tutorial
    switch (reset / harness), no longer set by this button. */
 if(skip)for(const x of activeGroup||[])t['coach-'+x[0]]=true;else t['coach-'+activeCoach[0]]=true;game.save();$('#coach-root').innerHTML='';activeCoach=null;requestAnimationFrame(showCoach);
}
window.addEventListener('resize',()=>{if(activeCoach)showCoach();});
function effectList(it,compact=false){const rows=Presentation.rows(it.effects,undefined,it.category);const html=r=>`<li class="${r.bad?'effect-bad':''}"><span>${E(r.label)}</span><b>${r.text}</b></li>`;return `<ul class="effects">${rows.slice(0,compact?4:rows.length).map(html).join('')}</ul>${compact&&rows.length>4?`<details><summary>전체 효과</summary><ul class="effects">${rows.slice(4).map(html).join('')}</ul></details>`:''}`;}
function traitRows(n){return `<div class="trait-list">${Presentation.traits(n).map(t=>{const tr=D.traitBy[t];return `<div class="trait-row"><b>${E(tr.name)}</b><span>${Presentation.traitEffects(t).map(r=>`<em class="tone-${r.tone}">${E(r.label+' '+r.text)}</em>`).join('')}${tr.note?`<em class="tone-cost">${E(tr.note)}</em>`:''}</span></div>`;}).join('')}</div>`;}
function destPlate(n){const d=game.claimedGateFor(n);if(!d)return '';const b=sigilOf(d);
 return '<div class="dest-plate" style="--fam:'+(b.color||'#cbd5b6')+'">'+Art.mark(b.id||d.id,32)
 /* The plate says what is fixed about where this customer is going: the Gate, each Hazard it
    carries, and the ability that Hazard presses on. That is true of the place whoever is at
    the counter, so it stays in the band beside them.

    THIS customer's readiness against it is the other kind of fact, and it now reads in the
    forecast instead (UI-Q109). Two reasons, both measured on a phone: per-Hazard readiness
    wrapped every row onto a second line and pulled a third for its own help control - it was
    the tallest thing in the band for the least information - and the readiness is what the
    player weighs an Item against, so it belongs with 전투 전망 and 실패 시 사망 위험 on the
    decision surface rather than a screen above it. Nothing is lost: 환경 대응 states the same
    canonical snapshot, in the same vocabulary, from the same outlook. */
  +'<div><label>예상 목적지</label><div class="dest-name"><h3>'+E(d.name)+'</h3>'
  /* v2.9.0 revision 2 (COPY_AUDIT §4-16): the rows carry this Gate's numbers themselves; the plate has no `?` help (§4-15 retired) */
  +'</div>'
  +hazardList(Presentation.known(d,game),null,d)
 +'</div></div>';}
function statGrid(n){
   const tList = Presentation.traits(n);
   const gate = game.claimedGateFor(n);
   const prep = Dungeon.prepare({...n,traits:tList},gate,game.run.facilities);
   const values = prep.effects;
   /* v2.9.0 (User 2026-09-24, UI_UX §STAT PRESENTATION): under a Stat this customer's Gate
      presses, a small tag with the pressing Hazard name(s) - the one place the grid links to
      the Gate. No number, no verdict; 투력 is never pressed. */
   const pressed = gate ? Presentation.pressedBy(Presentation.known(gate,game)) : {};
   /* One display rule for every stat the player reads: a plain value is a whole number, and a
      value something moved keeps the one decimal that shows it moved. Presentation owns it, so
      this grid and the 보급 후 변화 list below it cannot disagree about 19 versus 19.0.
      The adventurer's own stat is the baseline: whatever a Trait, a Relic or a supplied item has
      added on top is what the decimal is there to show. */
   /* SA-Q14 + the approved Stat-source UX. A moved Stat reads as beneficial or harmful by
      MEANING - for a Core Stat more is better - and keeps its green/red value. The separate 유리
      / 불리 chip and the separate `?` are gone: where the prepared snapshot already knows what
      moved the Stat, the whole cell IS the control, and tapping it opens those real sources.
      It is the same shared anchored tip the compact state and the readout use - one exclusive
      `sale-tip` group, so tapping the same Stat closes it and another Stat switches it, and the
      existing outside-tap / Escape handlers close it - so nothing new is invented and the
      balloon is out of flow, leaving the two-column grid exactly as tall as it was.
      A Stat that did not move, or moved with no provable source, stays a plain non-interactive
      cell: colour but no affordance, and never an empty popup. */
   return '<div class="detail-stats">'+Adventurer.keys.map(k=>{
    const delta = values[k]-n.stats[k], moved = delta!==0;
    const sense = !moved ? '' : delta>0 ? 'up' : 'down';
    /* the prepared snapshot returns its provenance as prep.sources - `prep.effects.sources`
       never existed, which is why the old `?` opened on nothing. Nothing is recomputed here. */
    const list = moved ? (prep.sources?.[k] || []) : [];
    const label = Presentation.labels[k];
    const press = pressed[k] ? '<i class="press">'+pressed[k].map(h=>E(D.hazards[h])).join(' · ')+'</i>' : '';
    const face = '<label>'+label+press+'</label><strong>'+Presentation.stat(values[k],moved)+'</strong>';
    const cls = 'detail-stat'+(sense?' '+sense:'');
    if(!list.length)return '<div class="'+cls+'">'+face+'</div>';
    /* the accessible name carries what colour alone cannot: which way it moved, and that the
       reason can be opened here. */
    const said = label+' '+(sense==='up'?'증가':'감소')+' · 변화 원인 보기';
    return '<details class="'+cls+' tip" name="sale-tip">'
     +'<summary aria-label="'+E(said)+'">'+face+'</summary>'
     +'<p><span>'+E(label+' 변화 원인')+'</span>'
     +list.map(x=>'<span>'+E(x.name+' '+(x.v>0?'+':'')+(x.isPct?Math.round(x.v)+'%':Presentation.stat(x.v,true)))+'</span>').join('')
     +'</p></details>';
   }).join('')+'</div>';
}
// ORDER — a paper, filled. The back room: dark wood and shelving. One order form
// clipped to the board; offers are ruled lines on it with a price tag hanging off the
// right edge and a stamped counter dial. No store scene anywhere in this composition.
/* ECONOMY_ORDER §ORDER. Half of what to order is decided by what is already on the shelf, and
   the form never showed it - each offer row carried a 재고 N for its own SKU and nothing said
   what else was in the warehouse or how much room was left. Same grouping the shelf and the
   stock modal already read. It opens the first time; after the player folds it, that preference
   survives later Days and reloads until they open it again. */
function stockBrief(){const s=game.run,stocks=groupStock(),used=s.inventory.length,cap=game.capacity();
 const opened=game.account.settings.stockBriefOpen!==false;
 return '<details class="stock-brief" '+(opened?'open':'')+'><summary><span class="k">창고</span>'
 +'<b>'+used+' / '+cap+'칸</b>'+(stocks.length?'<i>'+stocks.length+'종</i>':'')+'</summary>'
 +(stocks.length?'<ul>'+stocks.map(st=>{const it=D.itemBy[st.item],left=st.expires-s.day;
   return '<li>'+Art.itemIcon(it.id,20)+'<b>'+E(it.name)+'</b><span>'+st.count+'개</span>'
    +'<em'+(left<=1?' class="soon"':'')+'>'+left+'일</em></li>';}).join('')+'</ul>'
  :'<p class="none">창고가 비어 있다.</p>')+'</details>';}
/* UI-Q-v28-26 / UI-Q-v28-29. The dock is the phase's primary action, and every other phase
   gives it the dock's full width - MORNING's 문 열기, SALE's 손님 보내기, NIGHT's 다음. ORDER wrapped
   its two buttons in an extra `.row wrap` box, and that box, not the buttons, became the dock's
   flex item: `.p-order .dock .stamp{flex:1}` had nothing to stretch, so the action that ends the
   phase rendered 106px wide in the bottom-left corner of a 360px dock and 300px wide under a
   centred 860px form on a desk. The wrapper is removed rather than restyled - the dock already
   is the flex row it was duplicating. */
function orderScreen(){
 const cart = game.cartTotal();
 /* UI_UX §GAME-LIKE INTERACTION LANGUAGE + §ORNAMENT RESTRAINT: committing the order is an
    inked impression on the 발주서 - the material and the press, with no repeated seal mark and
    no tilt. Leaving the desk is a different kind of act, so it takes the steel `.leave` plate. */
 return stage('order','발주',taskLine('order'),orderForm(),
  (cart?'<button class="stamp" data-action="confirm-order">발주 '+fmt(cart)+'G · 확정</button>':'')
  +'<button class="stamp leave" data-action="open-store" '+(cart?'disabled':'')+'>영업 시작</button>');
}
/* v2.9.0 (ECONOMY_ORDER §VISITOR FORECAST, User 2026-09-24): with two or more open Gates the ORDER 오늘 line carries the
   visitor count per Gate, by the destination each customer claims (a liar's or a rerouted customer's true Gate stays
   hidden). Counts only: no name, Job, Trait, Wallet or individual destination leaves this helper. */
function gateCounts(){const s=game.run,c=new Map();for(const id of s.queue){const n=s.npcs.find(x=>x.id===id),g=game.claimedGateFor(n);if(g)c.set(g.id,(c.get(g.id)||0)+1);}return c;}
function orderForm(){const s=game.run,total=game.cartTotal(),after=s.money-total,price=game.rerollPrice(),held=total;
 /* v2.9.0 ORDER today-fit emphasis (UI_UX §ORDER — ITEM INFORMATION HIERARCHY): the same rule as SALE, against today's Gates */
 const counts=s.dungeons.length>=2?gateCounts():null;
 return '<div class="clip"></div><div class="form">'
 /* UI_UX §ORNAMENT RESTRAINT, audited across the whole Player-facing UI: the letterhead's G24
    seal carried no function or state - it filled the head's right margin and nothing else. The
    document is identified by 발주서 and its DAY / branch line. */
 +'<div class="form-head"><h1>발주서</h1><span class="docno">DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span></div>'
   +'<div class="ledger" id="order-register" aria-label="발주 대금">'
   +'<div><span>운영비(예상)</span><b>'+fmt(game.expectedOperatingCost())+'</b></div>'
   +'<div><span>창고 잔여 칸</span><b style="font-size:16px">'+(game.capacity()-s.inventory.length)+' / '+game.capacity()+'</b></div>'
   +'<div><span>보유 골드</span><b>'+fmt(s.money)+'</b></div>'
   +'<div class="pick"><span>발주 금액</span><b>'+(total?'-'+fmt(total):'0')+'</b></div>'
   +'<div class="out'+(after<0?' short':'')+'"><span>발주 후</span><b>'+fmt(after)+'<i>G</i></b></div></div>'
   +'<div class="ref-row">'+relicRef()+'</div>'
   // today only: who is coming and where (no next-day block, User 2026-09-24)
   +'<div class="brief"><div class="when"><span class="k">오늘</span>'
     +'<p><b>'+s.queue.length+'명</b> · '+(counts?s.dungeons.map(d=>E(d.name)+' '+(counts.get(d.id)||0)).join(' · '):E(s.dungeons.map(d=>d.name).join(' / ')))+'<button class="look" data-action="gates">위험 보기</button></p></div></div>'
   /* FINAL_EXPEDITION_v2.7 §D25: from D25 the Final's Family Pair and Hazard Pool are known,
      so they sit with the other planning signals on ORDER rather than arriving on D30. It is
      the persisted state itself - D30 reads the same object, and a reload cannot reroll it. */
   +(s.final?'<div class="brief"><div class="when"><span class="k">마왕성</span>'
     +'<p><b>'+E(s.final.familyNames.join(' / '))+'</b></p>'
     +'<ul class="hazards">'+Presentation.hazardRows(s.final.hazards,s.final).map(h=>
       '<li data-hazard="'+h.key+'"><b>'+E(h.name)+'</b>'+pressCell(h)+'</li>').join('')
     +'</ul></div></div>':'')
   +stockBrief()
   +'<ol class="lines">'+s.offers.map((o,i)=>{const it=D.itemBy[o.item],q=s.cart?.[i]||0,lim=game.quantityLimit(i),max=lim.max,rows=Presentation.rows(it.effects,undefined,it.category).slice(0,3);
    /* UI_UX §ORDER quantity interaction (User 2026-09-24): a control the cap blocks is dim but answers a tap with the reason (§3-9) */
    const block=' aria-disabled="true" data-reason="'+lim.reason+'" data-lack="'+Math.max(0,Math.ceil(lim.lack))+'"';
    const sl = it.days + Relics.shelf(game, it); /* ITEM §SHELF LIFE — EXACT (v2.9.0): every Item expires */
    /* data-offer is the row's handle across a redraw: the qty controls inside it flip
       between enabled and disabled as the quantity hits 0 or the cap, so the pressed
       button is not a stable anchor but its row is. */
    return '<li class="line r'+it.rarity+(q?' on':'')+'" data-offer="'+i+'">'
    +'<span class="no">'+String(i+1).padStart(2,'0')+'</span>'
    +Scene.crate(Art.itemIcon(it.id,30),46)
    +'<span class="col">'
     /* SA-Q19 / EVENT_v2.8 §암시장 상인: the Event-origin row says where it came from, beside
        the name where the Player reads it. Only a row carrying that provenance is marked - an
        ordinary offer has no origin and no source label, so this stays special-offer
        presentation rather than a generic rarity-attribution UI. */
     +'<span class="nm"><b>'+E(it.name)+'</b>'+(o.origin==='blackmarket'?'<i class="origin">암시장</i>':'')+Scene.priceTag(it.sell+'<i>G</i>')+'</span>'
     /* UI_UX §ORDER ITEM INFORMATION HIERARCHY (User 2026-09-24, v2.9.0): the rarity name as one small identity line, not a role chip */
     +'<span class="kind">'+E(D.rarities[it.rarity])+'</span>'
     /* UI-Q39: `야외채집 · 마력 보강 / 주문 제작` is the internal taxonomy the catalogue is
        organised by, not something a player decides with - and it never reaches a render path.
        The data stays: ordering weights and Relic conditions read `category`. What the row
        needs is right underneath it, in the effects summary. */
       +'<span class="fx">'+rows.map(r=>'<i class="'+(r.bad?'cost':'')+'">'+E(r.label+' '+r.text)+'</i>').join('<em> · </em>')+'</span>'
     +'<span class="have">매입 '+o.price+'G · 수익 +'+(it.sell-o.price)+'G · 재고 '+s.inventory.filter(st=>st.item===it.id).length+' · 공급 '+o.quantity+(o.promo?' · 1+1':'')+' · 유통기한 '+sl+'일</span>'
  +'</span>'
  +'<span class="dial">'+btn('-','qty','','data-index="'+i+'" data-q="'+Math.max(0,q-1)+'" aria-label="'+E(it.name)+' 수량 줄이기" '+(q?'':'disabled'))
   +'<output aria-label="'+E(it.name)+' 발주 수량">'+q+'</output>'
   +btn('+','qty','','data-index="'+i+'" data-q="'+(q+1)+'" aria-label="'+E(it.name)+' 수량 늘리기" '+(q>=max?block:''))
   +'<span class="set">'+[1,3].map(v=>btn(v,'qty','','data-index="'+i+'" data-q="'+v+'" aria-label="'+E(it.name)+' '+v+'개" '+(v>max?block:''))).join('')+btn('최대','qty','','data-index="'+i+'" data-q="'+max+'" '+(max?'':block))+'</span></span></li>';
 }).join('')+'</ol>'
 +'<button class="rubber" data-action="reroll" '+(price>s.money?'aria-disabled="true" data-reason="money" data-lack="'+(price-s.money)+'"':'')+'>후보 전체 교환 · '+fmt(price)+'G'+(price?'':' · 발주 교환권')+'</button>'
 +(s.phase==='final'?'<button class="rubber" data-action="confirm-order" '+(held?'':'disabled')+'>발주 확정</button>':'')
 +'</div>';}
/* Sparse player-facing grouping only where the distinction helps comparison. Internal
   category/role taxonomy stays hidden; this reads the item's actual potion marker. */
const itemKind=it=>it.effects?.potion?'포션':'';
/* FINAL_EXPEDITION §3 Item truth. What one participant's Final snapshot (Boss participant-side
   modifier included, ENVY's party-wide target pass included) is now, and would be with this Item
   in the Bag - both read off game.finalPreRoll(), the pre-roll the resolution itself uses, so no
   multiplier is restated here. Pure: no RNG, no write. */
function finalItemTruth(n,item){const s=game.run,i=s.team.indexOf(n.id);if(i<0)return null;
 const a=game.finalPreRoll(),b=game.finalPreRoll({[n.id]:[...n.pack,item]});
 return {before:a.snapshots[i],after:b.snapshots[i]};}
/* The shelf line says the same number the focused preview will: the Item's own Core-Stat rows
   carry the participant's real Final change; every other row is the Item's effect as written. */
function finalItemEffects(n,it){const t=finalItemTruth(n,it.id);if(!t)return it.effects;
 const e={...it.effects};for(const k of ['combat','survival','mobility','spirit'])if(k in e)e[k]=t.after[k]-t.before[k];
 return e;}
function shelf(isFinal=false){
   const s=game.run,stocks=groupStock(),n=isFinal?s.npcs.find(x=>x.id===supplyNPC):game.current(),st=s.inventory.find(x=>x.id===selected);
   /* SALE §MATCHING-EFFECT EMPHASIS — RETIRED (User 2026-09-24, v2.9.0): every effect text keeps the default
      style whatever the customer's Gate; the row states what the Item does, in its fixed category order. */
   const effectText=r=>E(r.label+' '+r.text);
   return '<section class="shelf">'
   +'<div class="shelf-head"><h2>'+(isFinal?(n?E(n.name)+'에게 보급':'대원에게 보급'):'진열대')+'</h2><span>'+stocks.length+'종 · '+s.inventory.length+'개</span>'
   +(isFinal?'':relicRef())+'</div><div class="goods">'
 /* UI_UX §SALE — SHELF ORDER (User 2026-09-25, v2.9.0): nearest discard first, ties in the existing order,
    the same for every customer; each row carries `폐기 N일`, emphasized at 1 day or less. */
 +stocks.slice().sort((a,b)=>a.expires-b.expires).map(st=>{const it=D.itemBy[st.item],open=selected===st.id,kind=itemKind(it),noop=isFinal&&game.finalNoEffect(it.id),left=st.expires-s.day;
  /* FINAL_EXPEDITION §3: in the Final the shelf states the Final price, and an Item with no
     Final effect says so on its row before it is even opened. */
  return '<button class="good r'+it.rarity+(open?' open':'')+(noop?' final-noop':'')+'" data-action="select" data-id="'+st.id+'" '+(isFinal?'aria-expanded':'aria-pressed')+'="'+open+'">'
  +'<span class="tile">'+Art.itemIcon(it.id,32)+'</span><span class="what"><b>'+E(it.name)+(kind?'<i class="item-kind">'+E(kind)+'</i>':'')+'</b><span>'+(noop?'<em class="noop">'+E(Copy.finalPrep.noEffect)+'</em>':Presentation.rows(isFinal&&n?finalItemEffects(n,it):it.effects,undefined,it.category).slice(0,2).map(effectText).join(' · '))+'</span></span>'
  +'<span class="price"><b>'+(isFinal?game.finalPrice(it.id):it.sell)+'G</b><span>재고 '+st.count+'</span><em class="expiry'+(left<=1?' soon':'')+'">폐기 '+left+'일</em></span></button>'+(open&&isFinal?till():'');}).join('')
 +'</div>'+(stocks.length?'':'<p class="muted">진열대가 비었다.</p>')+'</section>';}
const PRICE_ROLE={half:'할인 50%',full:'정가',overcharge:'바가지 150%'};
/* the three price keys of an ordinary sale - one owner for the tray (SALE) and the FINAL panel's twin */
function priceKeys(n,it,st){const full=n.pack.length>=Adventurer.slots(n);
 return ['half','full','overcharge'].map(mode=>{const q=game.interest(n,it,mode),pct=Math.round(D.pricing[mode].mult*100),role=PRICE_ROLE[mode];
   /* SALE_v2.7 requires the reason for a disabled price to be readable, and a price closed by
      the ceiling was never itself refused - saying 오늘 거절됨 there would be untrue. A mode is
      ceiling-locked when this customer refused this SKU at a LOWER price during this visit. */
   const said=(n.refusalReasons||[]).filter(x=>x.item===it.id);
   const ceiling=said.some(x=>D.pricing[x.mode].mult<D.pricing[mode].mult);
   const blocked=q.debit>spendable(n)?'손님 소지금 부족'
    :n.refused.includes(it.id+':'+mode)?(ceiling?'더 싼 값을 거절함':'오늘 거절됨')
    :full?'가방 가득':'';
   /* v2.9.0 PRICE ROLE WORDS (COPY_AUDIT §4-19): the face reads 할인 50% · 35G / 정가 · 70G /
      바가지 150% · 105G, the sub-line 이익 NG or the reason a price is closed. Three modes, no
      extra depth; `pct` stays the mode's number, the word is what the coach already says. */
   return btn('<em>'+role+'</em><strong>'+q.price+'G</strong><small>'+(blocked||'이익 '+(q.price-st.cost)+'G')+'</small>','sell',mode==='full'?'stamp':'',
    'data-mode="'+mode+'" aria-label="'+role+' · '+q.price+'G'+(blocked?' · '+blocked:'')+'" '+(blocked?'disabled':''));}).join('');}
/* v2.9.0 SALE — COUNTER TRAY (User 2026-09-24): the chosen Item sits on a fixed tray above the dock,
   outside the scrolled column - header line, the one delta list on one wrapping line, 특수 효과, then
   the three price keys always in the same place. The shelf rows never change height. A sale clears
   the tray (the Item went into the Bag, and the hand-over starts from the tray icon); a refusal keeps
   the Item here with the refused key locked. Same information as the old per-row panel, one place. */
function tray(){const s=game.run,n=game.current(),st=groupStock().find(x=>x.id===selected);
 /* the empty prompt is onboarding: DAY 1~3 while the account tutorial is not skipped (the same window as the
    task line); afterwards an empty tray has no height and the list gets the room back (User 2026-09-24) */
 if(!n||!st){const t=game.account.tutorial||{};return !t.skipped&&s.day>=1&&s.day<=3?'<div class="counter-tray empty" role="region" aria-label="계산대"><p class="tray-empty">상품을 누르면 계산대에 올라온다.</p></div>':'';}
 const it=D.itemBy[st.item],kind=itemKind(it);
 const moved=Presentation.preview(n,game.claimedGateFor(n),s.facilities,it.id);
 const parts=[...moved.direct.map(r=>'<b class="'+(r.bad?'effect-bad':'')+'">'+E(r.label)+' '+Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after)+'</b>'),
  ...moved.derived.map(r=>'<b>'+E(r.label+' '+r.text)+'</b>')];
 if(moved.departure)parts.push('<b class="fatigue">'+E(moved.departure)+'</b>');
 const shown=new Set(moved.direct.map(r=>r.key)),rest=Presentation.rows(it.effects,undefined,it.category).filter(r=>!shown.has(r.key));
 const life='폐기까지 '+(st.expires-s.day)+'일';
 return '<div class="counter-tray" role="region" aria-label="계산대">'
  +'<div class="tray-item"><span class="tray-icon">'+Art.itemIcon(it.id,32)+'</span>'
  +'<span class="tray-what"><b>'+E(it.name)+(kind?'<i class="item-kind">'+E(kind)+'</i>':'')+'</b><span>'+it.sell+'G · 재고 '+st.count+' · '+life+'</span></span>'
  +'<span class="tray-who"><b>'+E(n.name)+'에게</b> · '+walletChip(n)+'</span></div>'
  +'<p class="tray-delta"><span class="delta-src">판매 후 변화</span>'+(parts.length?parts.join('<i> · </i>'):'<b>현재 준비 변화 없음</b>')+'</p>'
  +(rest.length?'<p class="tray-delta special"><span class="delta-src">특수 효과</span>'+rest.map(r=>'<b class="'+(r.bad?'effect-bad':'')+'">'+E(r.label+' '+r.text)+'</b>').join('<i> · </i>')+'</p>':'')
  +'<div class="tills">'+priceKeys(n,it,st)+'</div></div>';}
function till(){const s=game.run,st=s.inventory.find(x=>x.id===selected),n=s.phase==='final'?s.npcs.find(x=>x.id===supplyNPC):game.current();
 if(!st||!n)return '';
 const it=D.itemBy[st.item],isFinal=s.phase==='final',full=n.pack.length>=Adventurer.slots(n);
 /* The same Gate the forecast below and the night itself use. Reading n.destination directly
    computed a Deep nominee's preview against their ordinary Gate while the forecast two lines
    down was already showing the Deep one. */
 /* FINAL_EXPEDITION §3: in the Final the preview is taken against the Final itself, and a
    Boss that changes what Items give (GLUTTONY) is applied through the same finalSnapshot the
    resolution uses, so the Player assigns Items against the actual Final state. */
 const moved=isFinal?Presentation.preview(n,s.dungeons[0],s.facilities,it.id,finalItemTruth(n,it.id))
  :Presentation.preview(n,game.claimedGateFor(n),s.facilities,it.id);
 const changes=moved.direct;
 /* ECONOMY_ORDER_v2.7: the Final price is fixed to the ordinary 50% amount - no 100/150 choice
    and no refusal roll - but the Wallet is real, so an adventurer who cannot afford it cannot
    be given the Item, and the button says which of the two is stopping it. */
 const finalPrice=isFinal?game.finalPrice(it.id):0;
 const noop=isFinal&&game.finalNoEffect(it.id),poor=isFinal&&n.money<finalPrice;
 /* a short Wallet is a system status on the closed transfer itself - exact need / owned - the
    same place SALE states a disabled price's cause; never a refusal line */
 const finalBlock=isFinal?(noop?Copy.finalPrep.noEffect:full?'가방 가득':poor?Copy.finalPrep.wallet.replace('{need}',finalPrice).replace('{have}',n.money):''):'';
 const actions=isFinal?btn('<em>50%</em><strong>'+finalPrice+'G</strong><small>보급</small>','supply','stamp',
    'aria-label="'+E(n.name)+'에게 보급 '+finalPrice+'G'+(finalBlock?' · '+finalBlock:'')+'" '+(finalBlock?'disabled':''))
 :priceKeys(n,it,st);
 const forwho='<p class="forwho"><span>'+E(n.name)+(isFinal?'에게 보급':'에게 판매')+'</span><b class="wallet" style="margin-left:auto">'+walletChip(n)+'</b></p>';
 /* a Final no-effect Item: the reason and the closed 보급, and no preview of an effect it will not have */
 /* FINAL: why a transfer is closed is the Item's status, said once beside it - never folded
    into the action's face, which stays 50% / price / 보급 in every state */
 const status=finalBlock?'<p class="final-status">'+(noop?'<b>'+E(Copy.finalPrep.noEffect)+'</b> '+E(Copy.finalPrep.noEffectWhy):E(finalBlock))+'</p>':'';
 if(noop)return '<div class="tillpanel">'+forwho+status+'<div class="tills">'+actions+'</div></div>';
 return '<div class="tillpanel">'+forwho
 +(isFinal&&s.bossId==='GLUTTONY'?'<p class="final-boss-note">'+E(Copy.boss.d15.trait.GLUTTONY[0])+' · '+E(Copy.boss.d15.trait.GLUTTONY[1][0])+'</p>':'')
 /* SA-Q30: the rows are still grouped by what actually produced them internally - a Stat that
    rose because this Item's Supply relieved a Supply Deficit, or crossed a Fatigue band, is
    still never presented as if the Item itself granted that Stat - but the two group names
    that used to sit over them (이 상품이 직접 / 보급이 상태에 미치는 영향) were the analytical
    label stack v2.8 removes: one heading now covers the whole list, and only the underlying
    `effects`/`effects derived` class still tells them apart for styling. */
 +'<h4>판매 후 변화</h4>'
 +(changes.length||moved.derived.length?'':'<ul class="effects"><li><span>현재 준비 변화 없음</span><b></b></li></ul>')
 +(changes.length?'<ul class="effects">'
   +changes.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after)+'</b></li>').join('')
   +'</ul>':'')
 +(moved.derived.length?'<ul class="effects derived">'
   +moved.derived.map(r=>'<li><span>'+E(r.label)+'</span><b>'+E(r.text)+'</b></li>').join('')
   +'</ul>':'')
 /* v2.9.0 ONE DELTA LIST: the departure line, only when this Item moves it (COPY_AUDIT §4-17) */
 +(moved.departure?'<ul class="effects derived"><li><span></span><b>'+E(moved.departure)+'</b></li></ul>':'')
 /* SA-Q30: conditional non-delta Item truth - a Counter this customer does not need today, an
    Insurance that only fires on a bad outcome - is still stated plainly rather than folded
    away, under its approved v2.8 heading. */
 +(()=>{const shown=new Set(changes.map(r=>r.key));
   const rest=Presentation.rows(it.effects,undefined,it.category).filter(r=>!shown.has(r.key));
   if(!rest.length)return '';
   return '<p class="delta-src">특수 효과</p><ul class="effects">'
    +rest.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+E(r.text)+'</b></li>').join('')+'</ul>';})()
 +'<p class="smalltext">폐기까지 '+(st.expires-s.day)+'일</p>'
 +status+'<div class="tills">'+actions+'</div></div>';}
function eventReveal(){const e=game.run.event;if(!e)return '';return '<div class="event-reveal"><p class="flavor">'+E(e.reveal)+'</p><p class="effect">'+E(e.description)+'</p></div>';}
function ownedRelicView(){const owned=game.ownedRelics();if(!owned.length)return '';return '<details class="owned-relics"><summary>보유 점포지원 '+owned.length+'/7</summary>'+owned.map(r=>{const st=Relics.status(game,r.id);return '<div><b>'+E(r.name)+'</b><p>'+E(r.description)+'</p>'+(st?'<p class="status">'+E(st)+'</p>':'')+'</div>';}).join('')+'</details>';}
/* UI-Q111. Both screens that take a commitment - the order and the sale - need what the
   store is already running to be checkable in one tap before committing, and neither had it:
   ORDER showed nothing, SALE only a disclosure at the very bottom of the scroll. This is one
   compact control, shaped like the 위험 보기 reference already on the order form, reading the
   same game.ownedRelics() truth and opening the detail surface that already existed. No
   second Relic store, and no per-screen copy of the effects. */
const relicRef=extra=>{const owned=game.ownedRelics();
 return '<button class="relic-ref" data-action="owned-relics"'+(extra?' '+extra:'')
  +' aria-label="보유 점포지원 '+owned.length+' / 7 · 효과 보기">점포지원 <b>'+owned.length+' / 7</b></button>';};
/* COPY_AUDIT §1-3: one body for both confirmations that discard the Run's rewards */
const ABANDON_BODY='<p>이번 영업에서 얻을 보상은 없습니다. 모험가·재고·골드·점포지원은 다음 점포로 이어지지 않습니다. 본사 기록·점포 자본·보유 장식은 유지됩니다.</p>';
/* UI_UX §MENU — 이번 영업의 장식 (User 2026-09-24, v2.9.0): the Run's frozen loadout, read-only; an empty Slot reads 비어 있음 (COPY_AUDIT §1-7) */
function loadoutModal(){const lo=game.run?.loadout||{};
 return '<ul class="effects">'+D.decorationSlots.map(slot=>{const d=lo[slot]&&D.decorationBy[lo[slot]];
  return '<li class="deco-line'+(d?'':' empty')+'"><span>'+E(SLOT_COPY[slot]||slot)+'</span><b>'+(d?E(d.name):'비어 있음')+'</b>'+(d?'<p class="smalltext">'+E(d.effect)+'</p>':'')+'</li>';}).join('')+'</ul>';}
function relicsModal(){
   const owned=game.ownedRelics();
   if(!owned.length) return '<div class="owned-relics"><p class="muted" style="padding:16px;text-align:center">보유한 점포지원이 없다.</p></div>';
   /* RELIC §QUICK VIEW STATUS LINE (User 2026-09-24, v2.9.0): one runtime line for a condition-type support, none otherwise */
   return '<div class="owned-relics">'+owned.map(r=>{const st=Relics.status(game,r.id);return '<article class="slip"><b>'+E(r.name)+'</b><p>'+E(r.description)+'</p>'+(st?'<p class="status">'+E(st)+'</p>':'')+'</article>';}).join('')+'</div>';
  }
function relicTakeover(){const s=game.run,w=s.relicWindow;
 if(!w)return '<div class="relic-takeover" role="dialog" aria-modal="true" aria-label="점포지원"><div class="scroll"><div class="relic-open"><span class="label">점포지원</span><h2>지금 고를 지원이 없다</h2><p>다음 지원은 5일 단위 영업일에 도착한다.</p></div></div><div class="close">'+btn('닫기','dismiss','stamp')+'</div></div>';
 if(!w.focusedRevealSeen){w.focusedRevealSeen=true;game.save();}
 const first=w.milestoneDay===0,until=w.expiryDay===31?'마왕성 출발 전까지':'DAY '+(w.expiryDay-1)+'까지';
 return '<div class="relic-takeover" role="dialog" aria-modal="true" aria-label="점포지원"><div class="scroll">'
 /* SA-Q47 / BOSS_v2.8 §SAME-DAY ORDERING: the D0 Boss objective is not printed on this Store
    Support decision surface. It is a separate Boss-information beat that follows the first
    choice - see bossRevealStage()/bossReveal() for D0. */
 +'<div class="relic-open"><span class="label">'+(first?'DAY 0':'DAY '+w.milestoneDay)+'</span><h2>'+(first?'첫 점포지원':'점포지원이 도착했다')+'</h2>'
 /* D-34. With all seven slots filled every 구매 greys out, and this line went on saying the
    window was open until DAY N. A disabled action says why it is disabled, on the line that
    would otherwise contradict it. The seven is the same literal ownedRelicView prints - it
    is the rule's own number, not a balance parameter to be promoted. */
 +'<p>'+(first?'이번 영업에 쓸 지원 하나를 고르세요.'
   :game.ownedRelics().length>=7?'점포지원 7개를 모두 들였다. 더 들일 자리가 없다.'
   :until+' 구매할 수 있다 · 자금 '+fmt(s.money)+'G')+'</p></div>'
 +(w.purchased?'<p class="discovery">확보 완료 · '+E(D.relicBy[w.purchased].name)+'</p>':'')
 /* Three states, and the card has to say which one it is before the Player reads the label:
    the one taken (`owned`), one still open, and one that cannot be taken right now because the
    window is spent or the Store cannot pay (`unavailable`). Both classes are derived from the
    state the window already holds - no new field, no new rule, and the blocked condition is the
    same expression the button's own `disabled` uses. */
 +'<div class="relic-choices">'+w.candidateIds.map((id,i)=>{const r=D.relicBy[id],price=w.candidatePrices[i],mine=w.purchased===id;
  const spent=!game.canBuyRelic(),poor=s.money<price,blocked=spent||poor;
  /* COPY_AUDIT §11-31: a disabled action names its own cause. Leaving 구매 on a control that
     cannot be pressed says nothing - the window being over and the wallet being short are
     different facts, and the Player needs to know which one applies. */
  const label=mine?'보유 중':spent?'선택 종료':poor?'골드 부족':'구매';
  return '<article class="relic-plate'+(mine?' owned':blocked?' unavailable':'')+'"><h3>'+E(r.name)+'</h3><p>'+E(r.description)+'</p>'
  +'<span class="cost">'+(price?fmt(price)+'G':'무료')+'</span>'
  +btn(label,'buy-relic','stamp','data-id="'+id+'" '+(blocked?'disabled':''))+'</article>';}).join('')+'</div></div>'
 /* UI_UX §MENU (User 2026-09-24, v2.9.0): the DAY 0 choice is mandatory and has no way back - the
    return button to the pre-Run screen is retired; Decorations are managed from 새 점포 준비, before a Run. */
 +sealChoice() +'<div class="close">'+(first?'':'<p>보류해도 후보와 가격은 그대로 남는다.</p>'+btn('나중에 결정','dismiss','stamp'))+'</div></div>';}

/* Sloth's seal is not a second choice path: it is the other thing this window's one
   acquisition can be spent on, so it sits beside the candidates and says as much.
   Shown only on a Run that is actually facing SLOTH, and only on an opportunity Day. */
function sealChoice(){const s=game.run,w=s.relicWindow;
 if(!w||!w.slothSealOpportunity)return '';
 const broken=s.sealBreakCount||0;
 if(w.consumedBySealBreak)return '<div class="seal-choice done"><b>봉인 해제 '+broken+' / 3</b><p>이번 점포지원은 받지 않는다.</p></div>';
 return '<div class="seal-choice"><b>봉인 해제 '+broken+' / 3</b>'
  +'<p>점포지원을 받는 대신 봉인 하나를 풀 수 있다. 둘 중 하나만 고를 수 있다.</p>'
  +btn('봉인 해제','break-seal','stamp',game.canBreakSeal()?'':'disabled')+'</div>';}
/* The end of a store is a statement from head office, so it is printed on the same tape the
   player reads every night rather than announced on a landing banner. The English eyebrow,
   the hero headline and the loose row of numbers under it are gone: what closed the store is
   the first line, and the standing totals sit in the ledger where standing totals live. */
function endBanner(){const s=game.run,a=game.account;
 return '<div class="tape end-tape"><div class="tear top"></div><div class="print">'
 +'<div class="head"><b>GUILD24</b><span>'+(s.win?'제0게이트 폐쇄':'영업 종료')+' · '+E(s.branch)+'</span></div>'
 +'<p class="closed">'+E(endHeadline())+'</p>'
 +'<p class="reason">'+E(s.endReason)+'</p>'
 +ledger()+'</div><div class="tear bottom"></div></div>';}
/* A store closes for a reason, and the headline is the reason. One win/fail pair cannot say
   it: a DAY 9 bankruptcy would read 마왕을 토벌하지 못했다 for a store that never met the Boss.
   Every branch below is read off state the Run already carries - finalReport exists only once
   the Final has resolved, and the death count is the one the night has been keeping. */
function endHeadline(){const s=game.run;
 if(s.finalReport)return s.win?'마왕이 쓰러졌다.':'마왕을 토벌하지 못했다.';
 if(s.stats.deaths>=Meta.deathLimit(s))return '너무 많은 모험가가 돌아오지 못했다.';
 if(s.money<0)return '운영비를 마련하지 못해 점포 문을 닫았다.';
 return '이번 점포의 영업이 끝났다.';}
/* META §PROGRESSION UI. The statement reports what this Run moved and nothing else. A number
   that did not change is not a result: on a failure the standing totals are not the story,
   and on a clear a Job already credited for this Boss moved nothing, so it is not listed as
   though it had. Meta.finish records the before/after; the whole state lives in the codex,
   reachable from the store menu at any time. */
function ledger(){const s=game.run,a=game.account,gain=s.metaGain;
 const row=(label,value)=>'<div class="row"><span>'+label+'</span><b>'+value+'</b></div>';
 const moved=(gain?.jobs||[]).map(g=>row(E(D.jobBy[g.job]?.name||g.job)+' 숙련',g.from+' → '+g.to)).join('');
 const opened=(s.unlocked||[]).length
  ?'<div class="opened"><span>본사 해금</span><b>'+E(s.unlocked.join(' · '))+'</b></div>':'';
 /* UI_UX_v2.8 §RUN-END SETTLEMENT FEEDBACK. Read in the order it is computed:
    총매출 -> (도달일 비율) -> 얻은 점포 자본 -> 현재 점포 자본. Ending Gold and the
    remaining stock may appear elsewhere as Run results, but never as inputs to this - they are
    not inputs. Printed from the settlement the Run recorded, not recomputed here, so a reload
    shows the same figures and cannot appear to earn again. */
 const st=s.settlement;
 const settle=st?'<div class="block settlement"><h4>점포 자본 정산</h4>'
  +row('총매출',st.sales.toLocaleString()+'G')
  +row('DAY '+st.day+' 도달 비율','×'+Math.round(st.rate*100)+'%')
  +row('얻은 점포 자본','+'+st.gain.toLocaleString())
  +row('현재 점포 자본',st.capitalAfter.toLocaleString())+'</div>':'';
 return '<div class="block">'+moved+row('지금까지 연 점포',a.runs)+'</div>'+settle+opened
  +(moved||opened||settle?btn('도감에서 보기','codex','bare'):'');}
/* UI_UX §CONTROL / FEEDBACK HYGIENE: a muster row that cannot be sent used to keep offering
   원정대 선택 - a dead promise on an unavailable control, the same defect the approved Store
   Support state fixed by not leaving a dead 구매. The row already states the cause on the line
   above (중상 · N일 휴식), so the affordance label is simply dropped rather than restated. */
function npcCard(n,action='npc'){const s=game.run,blocked=action==='team'&&(!n.alive||n.recovery);
 const call=action!=='team'?'기록 보기':blocked?'':(s.team.includes(n.id)?'선택됨':'원정대 선택');
 return `<button class="npc-card r${n.rarity} ${!n.alive?'dead':''} ${s.team.includes(n.id)?'chosen':''}" data-action="${action}" data-id="${n.id}" ${blocked?'disabled':''}><div class="row">${portrait(n,60)}<div>${badge(n.rarity,true)}<h3 style="margin-top:5px">${E(n.name)}</h3><p>Lv.${n.level} ${D.jobBy[n.job].name}</p><p>${n.status}${n.recovery?' · '+n.recovery+'일 휴식':''} · 방문 ${n.visits}회</p></div></div><div class="loyalty"><div class="row between"><span>단골도 ${n.loyalty}</span><span>${call}</span></div><div class="bar"><span style="width:${n.loyalty}%"></span></div></div></button>`;}
// FINAL — climax. Both Families are disclosed above every choice; party and supply
// follow; the D30 Relic decision is reachable before lock (FINAL_EXPEDITION §3, §4.1).
/* FINAL-Q77: the one party-wide 토벌 전망, in the place and treatment the ordinary 전투 전망 reads
   (.readout .top .fore + its ?). It replaces the one-NPC readout in the Final; the explanation is
   the ? and a one-time coach, not a standing line. */
function finalForecastView(){const f=game.finalForecast(),c=Copy.finalPrep;if(!f)return '';
 return '<div class="readout final-forecast"><div class="top"><span class="fore">'+E(c.forecast)+'<b>'+E(f)+'</b>'
  +tip(c.forecast,...c.forecastWhy)+'</span></div></div>';}
function finalScreen(){
 const s=game.run,d=s.dungeons[0],need=game.finalRequired(),committed=!!s.finalCommitted;
 const pickCount='선택 '+s.team.length+'명 · 최대 '+need+'명';
 if(!s.team.includes(supplyNPC))supplyNPC=s.team[0]||null;
 const roster=s.npcs.filter(n=>n.alive&&n.introduced).sort((a,b)=>b.level-a.level);
 /* UI_UX: the Boss is a primary game object, and on the day the player finally faces it the
    standing screen has to say which one. It used to open on a generic 마왕성 plate with a
    28px procedural mark, so every Run's last day looked identical. Identity and art resolve
    from the Run exactly as the D5 / D15 reveals do - Scene.bossArt reads bossId, day and
    sealBreakCount, so SLOTH shows the form its broken seals earned and the others their
    battle form - and the castle stays as the place, under the name of who is in it. */
 const b=D.bossBy[s.bossId],art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount);
 const body='<div class="gate-zero">'
 +(art?'<figure class="boss-face"><img src="'+art+'" alt="'+E(b.name)+'"></figure>'
      :'<span class="boss-face fallback">'+Art.mark('final',56)+'</span>')
 +'<div class="who"><span class="label">제0게이트 · 마왕성</span><h1>'+E(b.name)+'</h1></div></div>'
 /* BATCH 5-1: each Family owns its Hazards. The persisted Final pool is the union of the two
    Families' tier-II Hazards (shop.js), so each column takes the pool filtered by its own
    Family, in the pool's order - nothing added, nothing recomputed. A phone still reads the two
    Families and then the Hazards (the columns are laid out flat there); a desk puts each
    Family's Hazards under it. Anything the pool held outside both Families would still print. */
 +'<section class="threat"><h2>확인된 위협</h2><div class="fams">'
 +(d.families||[]).map(id=>{const b=D.dungeonBy[id],own=(D.familyTiers[id]||[])[1]||[];
   return '<div class="fam-col"><span class="fam" style="--fam:'+b.color+'">'+Art.mark(b.id,24)+E(b.name)+'</span>'
    +hazardList(d.hazards.filter(h=>own.includes(h)),null,d)+'</div>';}).join('')
 +'</div>'+hazardList(d.hazards.filter(h=>!(d.families||[]).some(id=>((D.familyTiers[id]||[])[1]||[]).includes(h))),null,d)+'</section>'
 /* B5-2 / FINAL-Q75: 출전 NPC 선택 -> FINAL 준비. Until the party is confirmed the screen is the
    muster only; once confirmed (saved) the roster is gone and only the confirmed members are
    prepared, one at a time, against the shelf. */
 +(!committed
  ?'<div class="party-head"><h2>원정대 선택</h2><span class="count">'+E(pickCount)+'</span></div>'
   /* v2.8: the party is provisional - capacity, not a quota, and where the forecast will be */
   +'<div class="readout final-forecast pending"><p>'+E(Copy.finalPrep.cap)+'<br>'+E(Copy.finalPrep.unlock)+'</p></div>'
   +'<div class="npc-grid">'+roster.map(n=>npcCard(n,'team')).join('')+'</div>'
  :'<div class="party-head"><h2>원정대 준비</h2><span class="count">확정 '+s.team.length+'명</span></div>'
   +finalForecastView()
   +'<div class="final-team">'+s.team.map(id=>{const n=s.npcs.find(x=>x.id===id),slots=Adventurer.slots(n);
    return '<button class="final-member'+(supplyNPC===id?' active':'')+'" data-action="supply-target" data-id="'+id+'" aria-pressed="'+(supplyNPC===id)+'">'
    +'<span class="who">'+portrait(n,44)+'<span><b>'+E(n.name)+'</b><small>Lv.'+n.level+' '+E(D.jobBy[n.job].name)+'</small></span>'
    +'<span class="wallet">'+walletChip(n)+'</span></span>'
    +'<span class="bag-label">가방 '+n.pack.length+' / '+slots+'</span><div class="pack">'
    +Array.from({length:slots},(_,i)=>'<div class="slot '+(n.pack[i]?'filled':'')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],28)+'<span class="slot-name">'+E(D.itemBy[n.pack[i]].name)+'</span>':'빈 칸')+'</div>').join('')+'</div></button>';}).join('')+'</div>'
   +shelf(true)
   +'<details class="final-order"><summary>마지막 발주 · 상품과 점포지원 사이의 선택</summary>'+orderForm()+'</details>')
 +ownedRelicView();
 /* UI_UX §PER-PHASE (FINAL) — DISABLED COMMIT CAUSE (USER AMENDMENT 2026-09-22): the fixed dock
    states why the sortie cannot start, on the control itself, rather than leaving a dead
    `마왕성으로 출발` whose reason is a screen-length away in the muster head. The muster's own
    count stays where it is; this is the disabled Action's immediate cause feedback. */
 /* any 1..need may be committed; with nobody picked the action is closed and the count it
    waits on is the head's 선택 0명 (stating it on the dock too printed the same line twice) */
 const ready=s.team.length>0&&s.team.length<=need;
 const dock=relicWindowLink()+(need
  ?committed?btn('마왕성으로 출발','boss','stamp')
   :btn('원정대 확정','final-commit','stamp',ready?'':'disabled')
  :btn('출전 불가 · 런 종료','boss','danger'));
 /* BATCH 5-1 / PRESENTATION_POLISH §BOSS DOMAIN BACKDROP ASSET ROLE: D30 is where the Run finally
    stands in the Boss's own domain. The stage names which Boss so the stylesheet can hang that
    Boss's authored room behind it - the only place any of those rooms is used. */
 return stage('final','최종 원정','',body,dock,' data-boss="'+E(s.bossId)+'"');
}
/* Whoever went to the castle is the ending. run.js clears s.results when the Final resolves,
   so after D30 the end screen had the statement and then nothing - the people the player
   spent thirty days raising, and the last thing the store handed them, were computed into
   finalReport and never shown. They close the screen now, with the faces the player knows. */
function sentOff(){const s=game.run,rep=s.finalReport;if(!rep?.members?.length)return '';
 return '<section class="sent-off"><h3>'+(rep.cleared?'제0게이트를 닫고 온 사람들':'마왕성으로 보낸 사람들')+'</h3>'
 +'<div class="went">'+rep.members.map(m=>{const n=s.npcs.find(x=>x.id===m.npcId);
   const carried=(m.items||[]).map(id=>D.itemBy[id]?.name).filter(Boolean);
   return '<article class="goer">'+portrait(n,88)
    +'<div><b>'+E(m.name)+'</b><span class="who-line">Lv.'+m.level+' '+E(D.jobBy[m.job]?.name||m.job)+'</span>'
    +'<span class="carried">'+(carried.length?'마지막 보급 · '+E(carried.join(' · ')):'빈손으로 갔다')+'</span></div>'
    +'</article>';}).join('')+'</div></section>';}
/* BATCH 3 END: a bankruptcy or death-limit closure is decided at closeDay(), after the last
   NIGHT and CLOSING were already read, yet the ending printed that whole night again under the
   tape - every record, its growth chips, even a speech balloon left over from the day. The
   owned ending is statement -> reason -> what this Run moved -> the Final party when there is
   one -> the next store (PRESENTATION_POLISH_BATCH3 §END); NIGHT stays the owner of those
   records. A Final ending never had them (run.js clears s.results there). */
function endScreen(){
 return stage('end','영업 종료','',endBanner()+sentOff(),btn('다음 점포 열기','new','stamp'));}
/* The failure line is not a hidden threshold: the book that already lists the dead says how
   many that is, and how many the store has. */
function rosterList(){const s=game.run;if(!s)return '<p class="muted">첫 영업을 시작하면 모험가 수첩이 열린다.</p>';
 const lost=s.stats.deaths,limit=Meta.deathLimit(s);
 return '<p class="lost-count'+(lost>=limit-2?' near':'')+'">돌아오지 못한 사람 <b>'+lost+' / '+limit+'</b>'
 +'<span>'+limit+'명에 이르면 소문이 퍼져 이 점포의 영업이 끝난다.</span></p>'
 +'<p class="smalltext">이름을 누르면 마지막 보급과 원정 기록을 볼 수 있다. 사망한 모험가의 기록도 남는다.</p><div class="npc-grid">'
 +s.npcs.filter(n=>n.introduced).sort((a,b)=>Number(b.alive)-Number(a.alive)||b.loyalty-a.loyalty).map(n=>npcCard(n)).join('')+'</div>';}
function npcDetail(id){const n=game.run.npcs.find(n=>n.id===id);if(!n)return '';
 let cond=[];
 if(n.injury){
  if(n.injury===1){
   let combat=n.traits.includes('grit')?'+20%':'-15%';
   cond.push('부상 효과: 투력 '+combat+' · 강인함 -20%');
  }
  if(n.recovery)cond.push('남은 휴식: '+n.recovery+'일');
  /* NPC_TRAIT v2.7 §Natural recovery + ITEM_v2.7 §INSURANCE HIERARCHY. An ordinary Injury is
     no longer cleared by resting a day - it clears by actually coming back from a 성공/대성공 -
     and 구급키트 is Aftercare on the next expedition's result, not a cure sold to a resting
     adventurer. Both readings state what actually clears the state. */
  cond.push(n.injury===2?'회복 방법: '+n.recovery+'일 대기'
                        :'회복 방법: 다음 원정에서 성공·대성공으로 귀환 또는 구급키트 애프터케어');
 }
 if(n.fatigue||n.fatigue===0){
  /* DUNGEON_HAZARD v2.9.0 §FATIGUE STAT PENALTY: five bands on 0~40, one owner; COPY_AUDIT §4-14 for the recovery line */
  const band=Dungeon.fatigueBand(n.fatigue);
  cond.push('현재 피로: '+n.fatigue+(band.min>0?' · '+band.name+' ('+band.text+')':' (페널티 없음)'));
  cond.push('피로 회복: 음식·음료');
 }
 /* v2.9.0 (COPY_AUDIT §5-7): the frozen SALE-entry Death risk reads here as well as in the help. */
 if(n.outlook)cond.push('실패 시 사망 위험 '+Math.round(n.outlook.deathRisk*100)+'%');
 /* DUNGEON_HAZARD v2.9.0 §strainEscalation (User 2026-09-25): an information row, no verdict -
    expeditions this adventurer began injured or at Fatigue 20+. */
 cond.push('무리한 출발 '+(n.records||[]).filter(r=>r.departedInjured||r.departedWeary).length+'회');
 let condHtml = '<div style="background:var(--soil-2);padding:12px;border-radius:4px;margin:8px 0;line-height:1.5;">'+cond.map(E).join('<br>')+'</div>';
 return `<div class="npc-detail"><div class="identity">${portrait(n,96)}<div>${badge(n.rarity,true)}<h2>${E(n.name)} · Lv.${n.level}</h2><p>${D.jobBy[n.job].name} · ${n.status}</p><p>단골도 ${n.loyalty} · 방문 ${n.visits}회</p></div></div>${game.run.phase==='sell'&&game.current()?.id===n.id?destPlate(n):''}${statGrid(n)}${traitRows(n)}<p>${E(n.equipment.name)} · 투력 +${n.equipment.power}</p>${condHtml}<h3>원정 기록</h3>${n.records.slice().reverse().map(r=>`<div class="history-row"><b>DAY ${r.day} · ${E(r.dungeonName)} · ${r.outcome}</b><p>${r.items.map(i=>D.itemBy[i].name).join(' + ')||'보급 없음'}</p>${r.routeChange?`<p>${E(r.routeChange)}</p>`:''}</div>`).join('')||'<p>아직 원정 기록이 없다.</p>'}<h3>구매 영수증</h3>${n.history.slice(-12).reverse().map(h=>`<div class="history-row">DAY ${h.day} · ${D.itemBy[h.item].name} · ${Presentation.modeLabel(h.mode)} ${fmt(h.paid)}G</div>`).join('')}</div>`;}
/* What a locked entry is still waiting for. Both axes are derived from the matrix, so
   this reads the same truth the gate itself reads. */
function unlockProgress(entry){const a=game.account;
 if(entry.metaUnlock)return Meta.distinctBossClear(a)>=entry.metaUnlock?'해금 완료'
  :'서로 다른 마왕 토벌 '+Meta.distinctBossClear(a)+'/'+entry.metaUnlock;
  return '기본 제공';}
const isLocked=e=>!!(e.metaUnlock&&Meta.distinctBossClear(game.account)<e.metaUnlock);

/* META §PROGRESSION UI, in the codex the player already has rather than a new screen: the
   grade, the mastery of each Job, the Job x Boss grid those two are derived from, and what
   the next threshold opens. Nothing here is stored - matrix is the only progression truth
   and every figure is computed from it when the panel renders. */
/* Standing progression is a list, not a notification. What is already open and what is not
   yet open read at the same level here - the moment something opens is the result screen's
   job, and that one only ever appears on the Run that opened it. */
function gatedContent(){return [...D.items,...D.jobs].filter(e=>e.metaUnlock)
 .map(e=>({name:e.name,need:'서로 다른 마왕 '+e.metaUnlock+'종 토벌',
   have:Meta.distinctBossClear(game.account),want:e.metaUnlock,rank:e.metaUnlock,kind:'boss'}))
 /* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM: the Grade-gated Start Contract is retired, so the
    distinct-Boss gates are all that remain with progress toward them. */
 .sort((x,y)=>x.rank-y.rank);}
/* The two thresholds run on different counters, so "next" is the nearest of each rather than
   the first two overall - otherwise the Boss-gated ones crowd the grade line off the list. */
function unlockLists(){const all=gatedContent(),open=all.filter(e=>e.have<e.want);
 return {done:all.filter(e=>e.have>=e.want),next:open.slice(0,2)};}
/* UI_UX_v2.8 §DECORATION UI. The retired Start Contract area becomes 점포 장식 (tab label per User 2026-09-24, v2.9.0), inside the codex
   the player already has - no new top-level screen. Everything numeric is read from the
   Decoration data and the Account, never written out here a second time.
   The markup is Slot -> owned options -> selected, not four hard-coded booleans, so a Slot that
   later holds alternatives renders without this changing. */
const SLOT_COPY={sign:'간판',wall:'벽면',counter:'계산대',display:'진열대'};
/* UI_UX_v2.8 §LIVE STORE. Only what this Run actually equipped is visible on the store screen,
   each drawn at its own Slot's location — the notice board by the entrance, the plaque on the
   wall, the safe at the register, the showcase in front of the shelving. The loadout is read
   from the Run, never from the Account, so what is on screen is what this Run started with. */
function decoPlate(slot){const id=game.run?.loadout?.[slot];if(!id)return '';
 const d=D.decorationBy[id],art=Scene.decoration(id);if(!d||!art)return '';
 /* No hover-only title: the effect is read in 점포 장식. A tooltip would be the only place a
    touch player could not reach. The name lives in the label, for anyone not reading the art. */
 return '<span class="decoplate '+slot+'" role="img" aria-label="'+E(SLOT_COPY[slot]||slot)+' · '+E(d.name)+'">'+art+'</span>';}
function storePanel(){const a=game.account,inRun=!!(game.run&&game.run.phase!=='end');
 const loadout=Meta.storeLoadout(a);
 return '<div class="decoration-panel">'
 +'<p class="smalltext">점포 자본 <b class="gold-text">'+Meta.storeCapital(a).toLocaleString()+'</b>'
 +' · '+(inRun?'이번 영업의 장식은 고정됨.':'장식은 영업 시작 전에 변경할 수 있습니다.')+'</p>'
 +D.decorationSlots.map(slot=>{
   const options=D.decorations.filter(d=>d.slot===slot),active=loadout[slot];
   /* a stable handle so a Slot row elsewhere can open this panel already on that Slot */
   return '<div class="slot" data-slot="'+E(slot)+'" tabindex="-1"><h4>'+E(SLOT_COPY[slot]||slot)+'</h4>'
    +options.map(d=>{const owned=Meta.decorationOwned(a,d.id),on=active===d.id;
      return '<div class="slot-option'+(on?' on':'')+(owned?'':' locked')+'">'
       /* SA-Q36: this is a decision surface, so it carries only what the decision is made on -
          name, exact effect, price / ownership and equipped state. The Flavor prose is not
          deleted anywhere: d.text stays in the Decoration data for Codex / lore use, it simply
          does not compete with the effect line while the player is comparing options. */
       +'<div><b>'+E(d.name)+'</b><span class="smalltext">'+E(d.effect)+'</span></div>'
       +(owned
         ? (inRun?'<span class="muted">'+(on?'이번 영업에 적용 중':'미적용')+'</span>'
                 :btn(on?'해제':'적용',on?'deco-unequip':'deco-equip','small'+(on?'':' active'),'data-id="'+d.id+'"'))
         : (inRun?'<span class="muted">'+d.price.toLocaleString()+' 자본</span>'
                 :decoPending===d.id
                  /* The confirmation replaces the buy button rather than opening a second modal:
                     there is no way to click the original button again while it is up. */
                  ?'<div class="deco-confirm"><p class="smalltext">'+E(d.name)+' · '
                    +d.price.toLocaleString()+' 자본을 씁니다. 남는 자본 '
                    +Math.max(0,Meta.storeCapital(a)-d.price).toLocaleString()+'.</p>'
                    +btn('구매 확정','deco-confirm','small active','data-id="'+d.id+'"')
                    +btn('취소','deco-cancel','small')+'</div>'
                  :btn(d.price.toLocaleString()+' 자본으로 구매','deco-buy','small','data-id="'+d.id+'"'
                      +(Meta.storeCapital(a)<d.price?' disabled':''))))
       +'</div>';}).join('')
    +'</div>';}).join('')
 +'</div>';}
function progressPanel(){const a=game.account;
 /* the grade, the total and the distinct count are already stated in the codex header
    directly above this, so the panel does not say them a second time. */
 return '<div class="progress-panel">'
 +'<table class="matrix"><thead><tr><th scope="col">직업</th>'
 +D.bosses.map(b=>'<th scope="col">'+E(b.sin)+'</th>').join('')
 +'<th scope="col">숙련</th></tr></thead><tbody>'
 +D.jobs.map(j=>{const locked=!Meta.jobUnlocked(a,j);
   return '<tr'+(locked?' class="locked"':'')+'><th scope="row">'+E(j.name)+'</th>'
    +D.bosses.map(b=>{const done=!!a.matrix?.[j.id]?.[b.id];
      return '<td class="'+(done?'done':'open')+'"><span aria-label="'+E(b.name)+' '
       +(done?'토벌':'미토벌')+'">'+(done?'●':'·')+'</span></td>';}).join('')
    +'<td class="tally">'+Meta.jobMastery(a,j.id)+' / 7</td></tr>';}).join('')
 +'</tbody></table>'
 +unlockBoard()+'</div>';}
function unlockBoard(){const {done,next}=unlockLists();
 // something already open does not need a counter saying it is open
 const line=(e,show)=>'<p><b>'+E(e.name)+'</b><span>'+E(e.need)+(show?' · '+E(e.unit||'')+e.have+' / '+e.want:'')+'</span></p>';
 return '<div class="unlocks">'
 +'<div><h4>해금 완료</h4>'+(done.length?done.map(e=>line(e,false)).join('')
   :'<p class="none">아직 본사에서 내려온 것이 없다.</p>')+'</div>'
 +'<div><h4>다음 해금</h4>'+(next.length?next.map(e=>line(e,true)).join('')
   :'<p class="none">본사가 내줄 것은 다 내줬다. 남은 것은 아직 잡지 못한 마왕뿐이다.</p>')+'</div>'
 +'</div>';}
/* Not every recorded discovery authors its own sentence - a Hazard mitigation carries the
   Hazards it covered instead, and printed raw it read as the literal word "undefined" in the
   notebook. Presentation owns turning an event into words; anything it cannot describe is
   not counted or shown. */
const discoveryLines=a=>(a.discoveries||[]).map(e=>Presentation.eventLine(e)).filter(Boolean);
function codex(){const a=game.account;let list=codexTab==='items'?D.items:codexTab==='jobs'?D.jobs:codexTab==='facilities'?D.relics:[];return `<div class="row between wrap" style="margin-bottom:18px"><div><h3>본사 기록</h3><p class="smalltext">점포 자본 ${Meta.storeCapital(a).toLocaleString()} · 보유 장식 ${Meta.ownedDecorations(a).length} / ${D.decorations.length}</p><p class="smalltext">직업 숙련 ${Meta.totalJobMastery(a)} / 42 · 서로 다른 마왕 토벌 ${Meta.distinctBossClear(a)} / 7</p></div><span class="muted">${a.runs}회 영업 · ${a.wins}회 마왕 토벌</span></div><details><summary>발견 수첩 · ${discoveryLines(a).length}개</summary>${discoveryLines(a).map(t=>`<p class="discovery">${E(t)}</p>`).join('')||'<p>아직 기록된 발견이 없다.</p>'}</details><div class="tabs">${[['progress','진행도'],['items','상품 '+D.items.length],['jobs','직업 6'],['facilities','점포지원 '+D.relics.length],['monsters','몬스터 지식'],['store','점포 장식']].map(([id,label])=>btn(label,'codex-tab',codexTab===id?'small active':'small',`data-id="${id}"`)).join('')}</div><div class="unlock-grid">${codexTab==='progress'?progressPanel():codexTab==='store'?storePanel():codexTab==='monsters'?D.dungeons.filter(d=>d.id!=='final').map(d=>{const seen=a.knowledge[d.id]||0;return `<div class="unlock ${seen?'':'locked'}"><h3>${seen?d.monster:'???'}</h3><p>${d.name} · 보급 생환 ${seen}회</p><p>${seen?d.hazards.slice(0,seen>=3?3:1).map(h=>D.hazards[h]).join(' · '):'위험 특성 ???'}</p><p>${seen>=5?'약점: '+d.weakness:'약점 ???'}</p></div>`;}).join(''):list.map(it=>`<div class="unlock ${isLocked(it)?'locked':''}">${codexTab==='items'?Art.itemIcon(it.id,42):''}<h3>${E(it.name)}</h3>${it.effects?effectList(it):''}<p class="tale">${E(it.description||'길드 등록 직업.')}</p><p class="gold-text" style="margin-top:8px">${unlockProgress(it)}</p></div>`).join('')}</div>`;}
function stockModal(){const s=game.run;return `<p class="muted" style="margin-bottom:15px">유통기한은 입고일부터 계산합니다. 재고 정리는 <b>운영비가 모자란 마감</b>에만 할 수 있고, 그 재고를 사들인 값의 50%를 회수합니다. 잔고가 0 이상이 되면 그 자리에서 끝납니다. 한 영업에서 ${game.rescueLimit()}번까지, 지금까지 ${s.rescueUsed||0}번 썼습니다.</p><div class="unlock-grid">${groupStock().map(st=>{const it=D.itemBy[st.item];return `<div class="unlock">${Art.itemIcon(it.id,43)}<h3>${it.name} ×${st.count}</h3><p>${(st.expires-s.day)+'일 남음'}</p>${game.canRescue()?btn('1개 정리 +'+Math.round((st.cost??it.buy)*.5)+'G','liquidate','small',`data-id="${st.id}"`):''}</div>`;}).join('')||'<p>창고가 비어 있습니다.</p>'}</div>`;}
/* CORE_RUN_v2.8 §PRE-RUN FLOW. Start Contract selection is retired. What the player confirms
   before a Run is the Decoration loadout, read from the Account and frozen at start. */
function newRun(){const a=game.account,loadout=Meta.plannedLoadout(a),owned=Meta.ownedDecorations(a);
 /* An empty Slot is a neutral state, not a warning. It used to be marked .effect-bad, whose
    own rule prefixes `주의 · ` and colours the value as a cost, so a player who simply owns
    no 간판 yet was told `주의 · 간판 비움` in red. A Slot with nothing in it says so plainly.

    Every Slot is also a control here, empty ones included: the row is what a player reaches
    for when they want to change it, so it opens the 점포 장식 panel already scrolled to that
    Slot rather than making them find it. During a Run the loadout is frozen, so the row is
    still readable and still opens the panel - which states that it is read-only. */
 const lines=D.decorationSlots.map(slot=>{const id=loadout[slot],d=id&&D.decorationBy[id];
  return '<li class="deco-line'+(d?'':' empty')+'">'
   +'<button class="deco-jump" data-action="store-manage" data-id="'+E(slot)+'"'
   +' aria-label="'+E(SLOT_COPY[slot]||slot)+' '+(d?E(d.name):'비움')+' · 점포 장식에서 보기">'
   +'<span>'+E(SLOT_COPY[slot]||slot)+'</span><b>'+(d?E(d.name):'비움')+'</b></button></li>';}).join('');
 return `<h2 class="welcome-title">30일 동안 던전 앞 편의점을 운영한다.</h2><p class="muted">찾아오는 모험가를 보급하고, 성장시킨다.</p><div class="welcome-band">마지막 날, 성장한 모험가들을 마왕 토벌에 보낸다.</div><h3 style="margin-bottom:10px">이번 영업의 장식</h3><ul class="effects">${lines}</ul><p class="smalltext">${owned.length?'영업이 시작되면 이번 영업에는 고정됩니다.':'보유 장식 없음'}</p><p class="store-capital"><i class="coin-mark" aria-hidden="true"></i>점포 자본 ${Meta.storeCapital(a).toLocaleString()}</p>${game.run&&!['end','foundation'].includes(game.run.phase)?'<p class="danger-text" style="margin-top:14px">지금 진행 상황을 모두 포기하고 새로운 점포를 시작합니다. <b>점포 자본을 포함해 보상은 전혀 없습니다.</b></p><p class="smalltext">본사 기록은 그대로 남습니다. 도감 · 점포 자본 · 보유 장식은 지워지지 않습니다.</p>':''}`;}
/* Two levels, one row each, with the number said out loud beside the control - the slider
   position alone is not a readable value. The master switch above them is the existing
   mute, so this adds controls and no fourth channel: there are no voices to balance. */
function mixer(){const st=game.account.settings,d=Sound.defaults;
 const row=(key,label,value)=>`<div class="mix-row"><label for="mix-${key}">${label}</label>`
  +`<input id="mix-${key}" type="range" min="0" max="100" step="5" data-mix="${key}" value="${Math.round(value*100)}" aria-describedby="mix-${key}-val">`
  +`<b id="mix-${key}-val" class="gold-text">${Math.round(value*100)}%</b></div>`;
 return `<div class="mixer" role="group" aria-label="소리 믹서">`
  +row('bgm','BGM',Number.isFinite(st.bgm)?st.bgm:d.bgm)
  +row('sfx','SFX',Number.isFinite(st.sfx)?st.sfx:d.sfx)
  +`</div>`;}
function settings(){return `<div class="stack"><p>자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.</p><div class="row wrap">${btn('저장 내보내기','export')}${btn('저장 가져오기','import')}</div><div class="row wrap">${btn(game.account.settings.muted?'소리 켜기':'소리 끄기','sound')}</div>${mixer()}<hr style="border:0;border-top:1px solid var(--line);width:100%"><p class="muted">게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.</p><div class="row wrap">${btn('전체 데이터 초기화','reset','danger')}</div></div>`;}
/* COPY_AUDIT_APPROVED_v2.8.0 §8 is the exact owner of the global guide. The long-form manual
   it replaces described retired rules, understated the refusal ceiling, and repeated what the
   anchored popovers and coach marks already say in context. Approved text, verbatim. */
/* v2.9.0 (COPY_AUDIT §8-0, UI_UX §GLOBAL HELP): the guide opens on 처음 3일 - five lines - and keeps the eight sections
   under a 자세히 disclosure, collapsed by default. The disclosure lives only inside this modal. */
function help(){return `<div class="stack"><div class="first-days"><h3>처음 3일</h3><p>아침 — 오늘 열린 게이트의 위험을 본다.</p><p>발주 — 그 위험에 맞는 능력을 올리는 상품을 들인다.</p><p>판매 — 손님이 갈 게이트를 보고 상품과 가격을 정한다. 판 상품은 손님 가방에 들어간다.</p><p>밤 — 원정 결과와 손님의 변화를 본다.</p><p>마감 — 손익을 정리하고 다음 날로 간다.</p><p class="grammar">음식은 피로 회복, 음료는 능력치·위험 보조와 약간의 피로 회복, 포션은 투력, 장비는 위험 대응, 보험은 실패 완화.</p></div><details class="more"><summary>자세히</summary><h3>점포지원</h3><p>DAY 0 무료 1개. 이후 DAY 5·10·15·20·25·30에 구매 기회가 온다. 보류한 후보와 가격은 다음 구매 기회 전날까지 유지된다.</p><h3>발주</h3><p>오늘 손님과 게이트를 보고 수량을 정한다. 발주 확정 뒤에도 추가 발주와 후보 교환이 가능하다.</p><h3>판매</h3><p>상품 가격은 50%·100%·150% 중에서 정한다. 팔리면 단골도는 각각 +4·+1·-3.</p><p>손님이 한 번 거절한 가격과 그보다 비싼 가격은, 같은 상품으로 그날 다시 제안할 수 없다.</p><h3>단골</h3><p>단골도가 높을수록 다시 찾아올 가능성과 상품을 살 마음이 커진다. 단골도 51부터 \`단골\`로 표시된다.</p><h3>원정</h3><p>판매한 상품은 그날 원정에서 쓰고 사라진다. 결과는 밤에 확인한다.</p><h3>점포 종료</h3><p>적자 마감은 재고 정리로 회생할 수 있다. 한 영업 최대 3회. 돌아오지 못한 모험가가 ${D.balance.deathLimit}명이 되면 폐점한다. DAY 30 최종 원정이 끝나면 이번 점포 영업도 끝난다.</p><h3>다음 점포</h3><p>다음 점포에도 본사 기록·해금·직업 숙련·점포 자본·보유 장식은 남는다. 모험가·재고·골드·점포지원은 새로 시작한다.</p><h3>시간</h3><p>실시간 제한 없음.</p></details></div>`;}
/* Which reveal this Day owes the player, if any. Seen state is persisted, so a reload
   cannot replay a reveal or reorder it (BOSS-Q02, UI-Q40). */
function bossRevealDue(){const s=game.run;if(!s||!s.bossId||!s.bossReveal)return false;
 if(!['morning','order','final'].includes(s.phase))return false;
 /* FINAL_EXPEDITION_v2.7 §D25 FINAL STATE GENERATION: the exact Family Pair and Hazard Pool are
    revealed on D25, BEFORE the ordinary D25 decisions that could use the information. The reveal
    used to wait for D30, which put the D25 Relic window - the decision it exists to inform -
    ahead of it. The seen flag is persisted and the state is the same object either Day, so D30
    reuses it and never reveals a Family a second time; a save made before D25 disclosure existed
    still gets it on the D30 Final, which is why the guard is the flag and not the Day. */
 return !!bossRevealStage();}

/* BOSS_v2.8 §INFORMATION CADENCE: D5 identity, D10 the combat question, D15 the Trait, D20 the
   route question, D25 the Final state. D30 adds nothing - it reuses what D25 already persisted.
   The EARLIEST unseen beat wins, so a player who arrives late still reads them in order, and
   every stage has its own persisted marker so a reload cannot replay one. */
const BOSS_BEATS=[[5,'d5','identitySeen'],[10,'d10','combatSeen'],[15,'d15','traitSeen'],
                  [20,'d20','routeSeen'],[25,'final','familySeen']];
/* The beats Canonical allows the stronger acknowledgement. D25 is the 'final' stage id. */
const BOSS_MAJOR=new Set(['d5','d15','final']);
function bossRevealStage(){const s=game.run;if(!s?.bossReveal)return null;
 /* SA-Q47 / BOSS_v2.8 §SAME-DAY ORDERING: D0 is the deliberate exception to the D5-D25
    milestone-day cadence below - it fires exactly once, on the DAY 1 morning that follows the
    first Store Support choice, never by a `>=` day threshold. Gating on `s.day===1` (rather
    than folding it into BOSS_BEATS) keeps an existing mid-Run save from replaying it: such a
    save is never on Day 1 again, so an unset d0Seen there cannot resurface the beat. */
 if(s.day===1&&!s.bossReveal.d0Seen)return 'd0';
 for(const [day,stage,flag] of BOSS_BEATS){
  if(s.day<day||s.bossReveal[flag])continue;
  if(stage==='final'&&!s.final)continue;
  return stage;}
 return null;}

/* Boss art is a game object here, not an icon beside a card (UI_UX). The decision the
   reveal leads into stays above the fold on a phone, so the art sits under the facts. */
/* UI_UX §GAME-LIKE INTERACTION LANGUAGE: the record's own filing line, so the report reads as
   a filed document rather than a card. It is built only from the Day and the fixed department
   name - never the Boss, the Trait or the Final state - so a beat cannot leak what its own
   reveal has not disclosed yet. */
/* CORE_RUN §D0 FIRST-MORNING BOSS BRIEFING: the ordinary DAY 1 Morning may not go on past the
   briefing until it is acknowledged, and closing it must not consume it. Closing a modal does
   not redraw the Morning under it, so a closed D0 used to leave 발주 reachable with the beat
   still owed. While D0 is the open report, 확인 is its only way out. */
const d0Owed=()=>modal==='boss'&&bossRevealStage()==='d0';
function bossFiled(){return '<p class="filed"><span>길드 조사부</span><b>DAY '
 +String(game.run.day).padStart(2,'0')+'</b></p>';}
function bossReveal(){const s=game.run,b=D.bossBy[s.bossId],c=Copy.boss,stage=bossRevealStage();
 const art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount);
 const plate=art?'<figure class="boss-art"><img src="'+art+'" alt="'+E(b.name)+'"></figure>':'';
 /* UI_UX §BOSS INFORMATION PRESENTATION, amended: on a major reveal / preparation beat the Boss
    is the centred visual anchor and registers BEFORE the owned information, which then reads
    directly below it. The art used to close these two reports, so the Player finished the
    payload and only then met the subject. The information itself is unchanged and in the same
    order; only where the visual sits moved. */
 if(stage==='final'){const d=s.final||s.dungeons[0];
  return '<div class="boss-reveal final">'+bossFiled()+'<p class="lede">'+E(c.final.intro)+'</p>'
   +plate
   +'<div class="fams">'+(d.families||[]).map(id=>{const f=D.dungeonBy[id];
     return '<article class="fam-card" style="--fam:'+f.color+'"><b>'+E(f.name)+'</b>'
      +hazardList(D.familyTiers[id][1],null,d)+'</article>';}).join('')
   +'</div></div>';}
 if(stage==='d15'){const [name,lines]=c.d15.trait[s.bossId];
  return '<div class="boss-reveal d15">'+bossFiled()+'<p class="lede">'+E(c.d15.intro)+'</p>'
   +'<h3 class="boss-name">'+E(b.name)+'</h3>'
   +plate
   /* BATCH 4A: the Trait is D15's payload, so its name is set as the record's second subject
      under a small 특성 label, with its explanation attached in the same ruled entry - one
      entry, not a card. The line's text is unchanged; the dash only stops being visible
      once the label sits on its own line. */
   +'<div class="trait"><p class="trait-name"><span class="trait-k">특성</span><span class="trait-sep"> — </span><b>'+E(name)+'</b></p>'
   +'<div class="trait-body">'+lines.map(l=>'<p>'+E(l)+'</p>').join('')+'</div></div></div>';}
 /* D10 / D20 are one-tap information beats: they open the question the next report answers and
    disclose nothing new about the Boss. BATCH 4B (UI_UX §D5 / D10 / D15 / D20 / D25): the Boss
    stays the same full figure D5 and D15 show - the investigation is about the same subject -
    and the beat stays concise through its one line, its note and a quieter hierarchy, not by
    shrinking the Boss to a 64px thumbnail. Neither draws anything from the run stream. */
 if(stage==='d10'||stage==='d20'){const t=stage==='d10'?c.d10:c.d20;
  return '<div class="boss-reveal '+stage+'">'+bossFiled()
   +plate
   +'<p class="lede">'+E(t.line.replace('{보스명}',b.name))+'</p>'
   +'<p class="next-report">'+E(t.next)+'</p></div>';}
 /* SA-Q47 / BOSS_v2.8 §D0 INFORMATION BOUNDARY: the Run objective and the investigation cadence
    only - no Boss identity, no art, no Trait, no Final state. That is D5's beat onward. The two
    Days are told apart by type on the same record, not by timeline cards. */
 /* v2.9.0 (COPY_AUDIT §14-1): the body is two lines; the closing sentence is gone */
 if(stage==='d0')return '<div class="boss-reveal d0">'+bossFiled()+'<p class="lede">'+E(c.d0.lead)+'</p>'
  +c.d0.lines.map(l=>'<p class="d0-line">'+E(l)+'</p>').join('')+'</div>';
 return '<div class="boss-reveal d5">'+bossFiled()+'<p class="lede">'+E(c.d5.sub)+'</p>'
  +'<h3 class="boss-name">'+E(b.name)+'</h3>'
  +plate+'<p class="flavor">'+E(c.d5.flavor[s.bossId])+'</p></div>';}

/* A decision sheet whose footer already carries its way back shows no second 닫기: the footer
   control is the one cancel owner (돌아가기 / 보급으로 돌아가기). Escape still dismisses it (the
   keydown handler is separate). */
const ownCancel=new Set(['underConfirm','bossConfirm']);
function renderModal(){const root=$('#modal-root');if(!modal){root.innerHTML='';document.body.style.overflow='';return;}
 const hold=holdFocus(root);
 if(modal==='relics'){root.innerHTML=relicTakeover();document.body.style.overflow='hidden';restoreFocus(root,hold);return;}
 let title='',body='',footer='',narrow=false,doc='';const s=game.run;
 /* UI_UX §GAME-LIKE INTERACTION LANGUAGE. A Boss beat is not the utility drawer the modal
    shell was written to be - it is a guild investigation record, so the shell takes its one
    document variant here and the report becomes the screen rather than a card stack inside a
    panel. The acknowledgement is an inked impression on that record (`.approve`), not a filled
    bar across the bottom and, per §ORNAMENT RESTRAINT, not a seal mark either. 닫기 stays the
    plain utility control the same section says it may stay. */
 if(modal==='boss'){const c=Copy.boss,stage=bossRevealStage();
  /* No beat left to report - it was acknowledged, or the run moved past it between the draw
     that opened this and this one. `c[null].header` threw a TypeError and blanked the screen;
     the same early-return the top of this function already uses for `!modal` closes it
     instead. Reproduced only by mutating the run while the report is open, which no Player
     control does, but the guard is one line and the failure was total. */
  if(!stage){modal=null;root.innerHTML='';document.body.style.overflow='';return;}
  const k=stage==='final'?'final':stage;
  title=c[k].header;
  body=bossReveal();
  footer=btn(E(c[k].button),'boss-seen','approve');
  narrow=stage!=='final';doc='dossier';}
 else if(modal.startsWith('stat:')){
  const k=modal.split(':')[1], n=game.current();
  if(n){
   title=Presentation.labels[k]+' 출처 상세';
   const p=Dungeon.prepare({...n,traits:Presentation.traits(n)},game.claimedGateFor(n),game.run.facilities);
   let itemV=0;for(const st of p.itemStats)if(st.stats[k])itemV+=st.stats[k];
   body='<div class="stack"><div class="row wrap" style="justify-content:space-between"><span>기본</span><strong>'+n.stats[k]+'</strong></div>';
   if(k==='combat'&&n.equipment.power)body+='<div class="row wrap" style="justify-content:space-between"><span>장비</span><strong>+'+n.equipment.power+'</strong></div>';
   if(itemV)body+='<div class="row wrap" style="justify-content:space-between"><span>아이템 보강</span><strong>'+(itemV>0?'+':'')+Presentation.stat(itemV,true)+'</strong></div>';
   body+='<hr style="border:0;border-top:1px solid var(--line);margin:4px 0"><div class="row wrap" style="justify-content:space-between"><span>현재 적용값</span><strong>'+Presentation.stat(p.effects[k],true)+'</strong></div>';
   if(p.why.length)body+='<div class="muted" style="margin-top:12px;font-size:13px;line-height:1.4">변화 원인<br>'+p.why.map(w=>'- '+E(w)).join('<br>')+'</div>';
   body+='</div>';footer=btn('확인','shop','stamp');narrow=true;
  }
 }
 else if(modal==='new'){title='새 점포 준비';body=(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':'')+newRun();footer=btn('첫 점포지원 고르기','start','stamp');narrow=true;}
 else if(modal==='event'){title=E(s.event?.name||'오늘의 사건');body=eventReveal();footer=btn('오늘 상황 보기','event-seen','stamp');narrow=true;}
 else if(modal==='owned'){title='보유 점포지원';body=relicsModal();footer=btn('확인','dismiss','stamp');narrow=true;}
else if(modal==='gates'){title='오늘 열린 게이트';body='<div class="gate-plates">'+s.dungeons.map(d=>gatePlate(d,true)).join('')+'</div>';}
   /* UI_UX §MENU / SETTINGS — EXACT COMPOSITION (User 2026-09-24, v2.9.0): 점포지원 routes to the selection
      only while a window is purchasable; 이번 영업의 장식 is the frozen loadout, read-only; 현재 지점 포기 confirms
      (§1-3) and then discards the Run at once. */
   else if(modal==='menu'){title='점포 메뉴';body='<div class="menu-list">'+btn('모험가 수첩','roster')+btn('도감','codex')+(game.run?btn('점포지원','relics')+btn('이번 영업의 장식','loadout'):'')+btn('점주 가이드','help')+btn('설정','settings')
      +(game.run?btn('현재 지점 포기','abandon','danger'):'')+'</div>';narrow=true;}
   else if(modal==='loadout'){title='이번 영업의 장식';body=loadoutModal();footer=btn('확인','dismiss','stamp');narrow=true;}
   else if(modal==='abandonConfirm'){title='현재 지점을 포기할까요?';body=ABANDON_BODY;footer=btn('계속 영업','dismiss')+btn('지점 포기','abandon-go','danger');narrow=true;}
 else if(modal==='roster'){title='모험가 수첩';body=rosterList();}
 else if(modal.startsWith('npc:')){title='우리 점포의 모험가';body=npcDetail(modal.slice(4));footer=btn('수첩으로','roster');}
 else if(modal==='codex'){title='도감';body=codex();if(preRunReturn)footer=btn('새 점포 준비로 돌아가기','store-return','stamp');}
 else if(modal==='stock'){title='창고 재고';body=stockModal();}
 else if(modal==='help'){title='점주 가이드';body=help();narrow=true;}
 else if(modal==='settings'){title='영업 설정';body=settings();narrow=true;}
 else if(modal==='bossConfirm'){title='제0게이트 — 마지막 출발';body='<p>선택한 원정대가 마왕성으로 출발합니다.<br>현재 보급 상태를 확인하셨나요?</p>';footer=btn('보급으로 돌아가기','dismiss','stamp')+btn('최종 원정 시작','boss-go','stamp');narrow=true;}
 else if(modal==='underConfirm'){const c=Copy.finalPrep;title=c.underTitle;body='<p>'+E(c.underBody.replace('{N}',game.run.team.length))+'</p>';footer=btn(c.back,'dismiss','stamp')+btn(c.under,'final-commit-go','stamp');narrow=true;}
 else if(modal==='retireConfirm'){title='현재 지점을 포기할까요?';body=ABANDON_BODY;footer=btn('계속 영업','dismiss')+btn('지점 포기','retire-go','danger');narrow=true;}
 else if(modal==='resetConfirm'){title='전체 데이터를 초기화할까요?';body='<p>현재 영업과 본사 기록을 포함한 이 브라우저의 GUILD24 저장 데이터를 모두 지웁니다. 되돌릴 수 없습니다.</p>';footer=btn('저장 내보내기','export')+btn('취소','dismiss')+btn('전부 지우기','reset-go','danger');narrow=true;}
 else if(modal==='importConfirm'){title='저장 파일 가져오기';body='<p>현재 브라우저의 진행을 가져온 저장으로 교체합니다. 기존 진행을 남기려면 먼저 내보내 주세요.</p>';footer=btn('저장 내보내기','export')+btn('파일 선택','import-go','stamp');narrow=true;}
 else if(modal==='debug'){title='개발용 Debug · 일반 플레이 비노출';body=`<pre class="debug">${E(JSON.stringify({seed:s.seed,rngState:s.rngState,lastRNG:game.rng.last,offers:s.offers.map(o=>({...o,rarity:D.itemBy[o.item].rarity})),npc:game.current(),dungeons:s.dungeons,results:s.results.map(r=>({name:r.name,outcome:r.outcome,...r.debug})),boss:s.bossDebug},null,2))}</pre>`;}
 root.innerHTML=`<div class="modal-shade"><section class="modal ${narrow?'narrow':''} ${doc?'doc doc-'+doc:''}" role="dialog" aria-modal="true" aria-label="${E(title)}"><div class="modal-header"><h2>${title}</h2>${(preRunReturn||game.run?.phase!=='foundation')&&(game.run||modal!=='new')&&!ownCancel.has(modal)&&!d0Owed()?btn('닫기','dismiss','bare','aria-label="창 닫기"'):''}</div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}</section></div>`;document.body.style.overflow='hidden';restoreFocus(root,hold);
 /* A Slot row asked for this panel, so it opens on that Slot instead of at the top. The
    request is consumed here: a later redraw of the same panel must not keep yanking the
    player back to it while they read something else. */
 if(decoFocus){const target=root.querySelector('.slot[data-slot="'+decoFocus+'"]');decoFocus=null;
  if(target){target.scrollIntoView({block:'start',behavior:'instant'});target.focus({preventScroll:true});}}
}
async function action(el){const a=el.dataset.action,id=el.dataset.id,s=game.run;
 /* What the Run had opened before this click. Unlocks are credited by Meta.finish, which
    assigns a fresh array - so an identity change is exactly the moment one happened. */
 const wasOpen=game.run?.unlocked;
 try{
 if(activeCoach&&activeCoach[3]===a)finishCoach();
 switch(a){
 case'coach-skip':finishCoach(true);break;
 /* presentation only - the line stays in run.say, so nothing here is saved or re-rendered */
 case'say-hide':hideSpeech();break;
 case'coach-next':{const actionName=activeCoach?.[3];sound('ui');finishCoach();if(actionName==='npc')setModal('npc:'+game.current().id);break;}
 case'deep-nominate':game.nominateDeep(id);sound('spend');render();break;
 case'boss-seen':{const st=bossRevealStage();
  if(st==='d0')s.bossReveal.d0Seen=true;
  else{const beat=BOSS_BEATS.find(x=>x[1]===st);if(beat)s.bossReveal[beat[2]]=true;}
  /* UI_UX_v2.8 §BOSS / FINAL AUDIO: one motif, two strengths. D5 / D15 / D25 carry the major
     acknowledgement; D0 / D10 / D20 stay compact. The strength is read off the BEAT, never off
     the Boss behind it, so no cue names anything the plate has not already shown. */
  sound(BOSS_MAJOR.has(st)?'bossmajor':'bosscompact');
  game.save();setModal(null);render();break;}
 case'break-seal':game.breakSeal();sound('boss');render();break;
 case'menu':sound('ui');setModal('menu');break;
 case'begin-order':game.beginOrder();sound('open');render();break;
 case'confirm-order':game.confirmOrder();sound('order');render();break;
 case'open-store':game.open();sound('open');render();break;
 case'shop':setModal(null);break;
 case'new':setModal('new');break;
 /* UI_UX_v2.8 §PURCHASE / EQUIP FLOW: buying and equipping are only legal outside a Run, and
    outside a Run this screen is the only one there is - so the way into 점포 장식 has to be on
    it. Without this the panel is unreachable exactly when it is the one usable. */
 /* the Slot the player asked for, so the panel opens on it. UI-local, never saved. */
 case'store-manage':preRunReturn=modal==='new';codexTab='store';decoFocus=el.dataset.id||null;sound('ui');setModal('codex');break;
 /* Back to preparation. It only changes which panel is open: nothing is spent, no Decoration
    state is re-rolled, the Run is neither reseeded nor started. */
 case'store-return':preRunReturn=false;codexTab='items';sound('ui');setModal('new');break;
 case'owned-relics':sound('ui');setModal('owned');break;
 /* CORE_RUN §CURRENT RUN ABANDON: starting a new Run while one is active abandons the
    current Run with no settlement. end() is deliberately NOT called - it is what settles the
    run through Meta.finish and Store Capital, so an abandon earns nothing at all. start() replaces run wholesale, so the run-scoped
    state is discarded by the ordinary fresh-Run path and the account is left untouched.
    Running out of money is a different thing and still ends the run normally (retire). */
 case'start':{
  /* SA-Q35: the reproducibility Seed is a QA/dev affordance and has no Player control here; the
     supported route is Guild24.game.start('<seed>'); Guild24.render().
     The Run opens on exactly the seed the backdrop already planned, so the store the player was
     shown is the store they get. Returning from an unopened store still reuses that store's own
     seed rather than re-rolling the DAY 0 support they have already seen. */
  const seed=plannedSeed();
  pendingSeed=null;                    // spent: a later new Run plans its own
  preRunReturn=false;game.start(seed);selected=null;setModal(null);render();break;}
 /* UI_UX_v2.8 §PURCHASE / EQUIP FLOW. Both are Account actions and both refuse during a Run;
    the Capital is deducted exactly once, inside Meta. A purchase takes two steps — the button
    only asks, and `deco-confirm` is the single place that spends. */
 case'deco-buy':decoPending=id;renderModal();break;
 case'deco-cancel':decoPending=null;renderModal();break;
 case'deco-confirm':case'deco-equip':case'deco-unequip':{
  if(game.run&&game.run.phase!=='end')throw Error('영업 중에는 장식을 바꿀 수 없습니다.');
  const d=D.decorationBy[id];
  if(a==='deco-confirm'){
   /* Clear the pending id before spending, so a repeated click, a reopened modal or a thrown
      Meta guard all leave the panel back on the plain buy button rather than on a live confirm. */
   decoPending=null;
   /* §STORE SUPPORT: a Decoration is the ORDINARY purchase of the three. */
   Meta.buyDecoration(game.account,id);toast(d.name+' 구매 · 점포 자본 '+Meta.storeCapital(game.account).toLocaleString()+' 남음');sound('purchase');}
  /* fitting something already owned into a Slot, or taking it out. Deliberately not the
     purchase fanfare above: it costs nothing and nothing was acquired. */
  else {Meta.equipDecoration(game.account,d.slot,a==='deco-equip'?id:null);sound('fixture');}
  game.save();renderModal();render();break;}
 /* UI_UX_v2.8 §ORDER: `.set` holds the 1 / 3 / 최대 shortcuts, so they take the stepper's own
    tick one step quieter and never outrank it; audio.js holds both to a minimum retrigger gap. */
 case'qty':{const row=el.closest('[data-offer]'),key=row?.dataset.offer,y0=row?.getBoundingClientRect().top;
  game.setQuantity(Number(el.dataset.index),Number(el.dataset.q));sound(el.closest('.set')?'quantset':'quantity');render();
  anchorOffer(key,y0);break;}
 case'night-next':s.nightCursor=Math.min(s.results.length,(s.nightCursor||0)+1);if(s.nightCursor>=s.results.length)game.finishNight();game.save();render();
  nightSound(s.results[s.nightCursor]);break;
 case'event-seen':setModal(null);render();break;
 case'event-again':sound('ui');setModal('event');break;
 case'gates':sound('ui');setModal('gates');break;
 case'relics':sound('ui');setModal(game.canBuyRelic()?'relics':'owned');break;
 case'loadout':sound('ui');setModal('loadout');break;
 case'abandon':sound('ui');setModal('abandonConfirm');break;
 /* CORE_RUN §CURRENT RUN ABANDON: no settlement, no new Run - the no-Run pre-Run screen follows. */
 case'abandon-go':game.abandon();selected=null;preRunReturn=false;setModal(null);render();break;
 case'stat-detail':sound('ui');setModal('stat:'+id);break;
 /* §STORE SUPPORT: acquisition is heavier than an ordinary purchase and reads as securing a
    fixture into the store. Deliberately not the Decoration cue and not the unlock cue. */
 case'buy-relic':game.buyRelic(id);setModal(null);render();sound('support');break;
 case'closing':game.finishNight();game.save();render();break;
 case'open':game.open();selected=null;render();healCue();break;
 /* SALE scroll continuity. Opening one good closes another, and when the one that closes
    sits above the viewport the shelf below it slides up by the height of the panel that
    went away - the row the player just tapped walks off under their thumb. Restoring the
    raw scrollTop cannot help: the same offset now points at different content. Anchor on
    the tapped row instead and put it back on the pixel it was on, which is what "keep the
    product area you were looking at" actually means. */
 case'select':{
  const y0=el.getBoundingClientRect().top;
  selected=selected===id?null:id;cue=selected?'select':null;render();sound('button');
  const sc=$('.stage-scroll'),back=$('[data-action="select"][data-id="'+CSS.escape(id)+'"]');
  if(sc&&back)sc.scrollTop+=back.getBoundingClientRect().top-y0;
  break;}
 /* v2.9.0 TRANSACTION BEAT: what the screen showed before the commit, for the draw after it (playCue) */
 case'sell':{const tile=$('.counter-tray .tray-icon'),seen={mode:el.dataset.mode,from:tile?tile.getBoundingClientRect():null,icon:tile?tile.innerHTML:'',gold:s.money,
   stats:[...document.querySelectorAll('.detail-stats .detail-stat strong')].map(x=>x.textContent)};
  /* SALE §TRANSACTION RESULT — PER CUSTOMER (User 2026-09-24, v2.9.0): the customer's own Loyalty and Wallet
     before the commit, so the receipt stub can state the real result of this price choice. */
  const who=game.current(),wasM=who?who.money:0,wasL=who?who.loyalty:0;
  const success=game.sell(selected,el.dataset.mode);if(success){sound(el.dataset.mode==='overcharge'?'overcharge':el.dataset.mode==='half'?'half':'sale');selected=null;cue='sale';stub={loyalty:who.loyalty-wasL,from:wasM,to:who.money};}else{sound('refusal');cue='refuse';}handoff=seen;showStub();render();break;}
 /* The last departure of the day IS the entry to NIGHT, and it lands on result 0 already
    displayed - so it owes that result its own Outcome cue. It used to play the generic return
    cue instead, which made a 사망 or a 퇴각 at the head of the queue sound like an ordinary
    return until the player pressed 다음. */
 case'depart':playExit(()=>{game.depart();selected=null;render();document.querySelector('.receipt-stub')?.remove();
  if(s.phase==='night')nightSound(s.results[s.nightCursor||0]);else sound('depart');healCue();});break;
 case'close':game.closeDay();selected=null;sound('close');render();if(s.money<0&&s.phase==='closing')setModal('stock');break;
 case'reroll':game.reroll();sound('spend');render();break;
 case'stock':sound('ui');setModal('stock');break;
 case'liquidate':game.liquidate(id);sound('gold');render();break;
 case'roster':sound('ui');setModal('roster');break;
 case'npc':sound('ui');setModal('npc:'+id);break;
 case'codex':sound('ui');setModal('codex');break;
 case'codex-tab':codexTab=id;decoPending=null;sound('ui');renderModal();break;
 case'help':sound('ui');setModal('help');break;
 case'settings':sound('ui');setModal('settings');break;
 /* §AUDIO HIERARCHY: Settings is Utility. Unmuting used to answer with the default cue, which
    is the SALE register - the loudest thing in the build, for a control that sold nothing. The
    quiet utility click confirms the switch instead; muting stays silent on its own, because
    sync() has already disabled playback by the time the cue is asked for. */
 case'sound':game.account.settings.muted=!game.account.settings.muted;game.save();sound('ui');render();break;
 case'dismiss':if(preRunReturn&&modal==='codex'){preRunReturn=false;codexTab='items';sound('ui');setModal('new');break;}if(s?.phase==='foundation'||d0Owed())return;sound('ui');setModal(null);break;
 case'team':game.selectFinal(id);supplyNPC=s.team.includes(id)?id:s.team[0];sound('button');render();break;
 /* FINAL-Q75 v2.8: a sub-3 party is a valid choice, confirmed once before the boundary */
 case'final-commit':if(s.team.length<3){setModal('underConfirm');break;}   // a full party falls through
 case'final-commit-go':game.commitFinalParty();supplyNPC=s.team[0];selected=null;setModal(null);sound('button');render();break;
 case'supply-target':supplyNPC=id;sound('button');render();break;
 case'supply':game.supplyFinal(supplyNPC,selected);selected=null;sound();render();break;
 /* With nobody able to go there is no party to confirm, and the Final already owns this
    ending - boss() answers !finalRequired() with its own reason. It used to be wired to
    retire, which closed the store for unpaid overheads that were in fact paid. */
 case'boss':if(!game.finalRequired()){game.boss();setModal(null);render();break;}
  setModal('bossConfirm');break;
 /* the unlock cue belongs to the unlock, which the shared handler below sounds exactly once
    when one is actually credited - this fired every Final, unlock or not, and twice with one */
 /* §BOSS / FINAL AUDIO: the Final commit is the run's heaviest short action cue - a gate
    closing - and it adds no new-information signal; everything it stands on was revealed at D25. */
 case'boss-go':sound('final');game.boss();setModal(null);render();break;
 case'retire':setModal('retireConfirm');break;
 case'retire-go':game.end(false,'운영비를 충당하지 못해 이번 점포를 마감했습니다.');sound('close');setModal(null);render();break;
 case'export':{const blob=new Blob([Save.export(game.account,s)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='guild24-save-day-'+(s?.day||0)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('저장 파일을 내보냈습니다.');break;}
 case'import':setModal('importConfirm');break;
 case'reset':setModal('resetConfirm');break;
 /* Nothing is touched until this point. Erasing every key and starting from Meta.fresh()
    is exactly the first-launch path, so no separate reset state exists to go stale. */
 case'reset-go':{const ok=Save.reset();game=new Game(Meta.fresh(),null);selected=null;setModal(null);render();toast(ok?'전체 데이터가 초기화되었습니다. 새 점포를 시작합니다.':Save.error);break;}
 case'import-go':$('#save-file').click();break;

 }
 /* Unlocks are credited by Meta.finish, which only runs as a Run ends - so this always lands
    on the ending, where the statement already names what opened and keeps naming it. A toast
    would say the same thing in a second channel and then take it away.
    The ending keeps the list on screen, so the list alone cannot gate the cue: opening the
    codex or moving a tab would sound it again. The cue belongs to the click that created it. */
 const opened=game.run?.unlocked||[];
 if(opened.length&&opened!==wasOpen)sound('unlock');
 if(opened.length&&game.run.phase!=='end'){toast('본사 해금 · '+opened.join(' · '));game.run.unlocked=[];}
 if(game.run?.toast){toast(game.run.toast);delete game.run.toast;game.save();}
 }catch(err){toast(err.message);}
}
/* COPY_AUDIT §3-9: a blocked ORDER control is dim but not dead - the tap says why it is blocked. No subject noun: the tapped row
   is the subject, so two rows of the same Item cannot be confused. */
const BLOCK_REASON={money:lack=>'발주 자금이 부족합니다. '+fmt(lack)+'G 부족.',space:()=>'창고 칸이 부족합니다.',supply:()=>'오늘 공급이 끝났습니다.'};
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-action]');if(!el||el.disabled)return;
 if(el.getAttribute('aria-disabled')==='true'){const say=BLOCK_REASON[el.dataset.reason];if(say)toast(say(Number(el.dataset.lack||0)));return;}
 if(el.classList.contains('stamp')||el.classList.contains('pull'))stampPress(el);action(el);});
/* A tooltip is dismissed by tapping outside it, the way every other popover on the phone is.
   <details> closes on its own summary already, and the shared name closes a sibling, so this
   only has to handle the outside tap and Escape. */
const closeTips=except=>{for(const t of document.querySelectorAll('.tip[open]'))if(t!==except)t.open=false;};
document.addEventListener('pointerdown',ev=>{const inside=ev.target.closest('.tip');closeTips(inside);},true);
/* UI_UX_QA §UI-Q-v28-6. A popover a mouse has to click is a phone control wearing a desktop
   coat: on a pointer device the explanation opens on hover, and for a keyboard it opens on
   focus. Both drive the SAME <details> the tap toggles - no second popover mechanism, no CSS
   :hover reveal that a tap would then fight, and the balloon is still out of flow, so nothing
   the pointer does can change a panel's height.
   Hover is taken only from a real mouse on a device that actually hovers, so a touch never
   gets a phantom open and the tap toggle keeps behaving exactly as it did.
   Focus opens only for :focus-visible - a keyboard focus. A click focuses the summary too, and
   opening there would race the native toggle and swallow the tap. */
const hovers=()=>typeof matchMedia==='function'&&matchMedia('(hover:hover) and (pointer:fine)').matches;
const tipOf=t=>t&&t.closest?t.closest('.tip'):null;
document.addEventListener('pointerover',ev=>{
 if(ev.pointerType!=='mouse'||!hovers())return;
 const t=tipOf(ev.target);if(!t||t===tipOf(ev.relatedTarget))return;
 closeTips(t);t.open=true;});
document.addEventListener('pointerout',ev=>{
 if(ev.pointerType!=='mouse'||!hovers())return;
 const t=tipOf(ev.target);if(!t||t===tipOf(ev.relatedTarget)||t.contains(document.activeElement))return;
 t.open=false;});
document.addEventListener('focusin',ev=>{
 const t=tipOf(ev.target);if(!t||!ev.target.matches?.(':focus-visible'))return;
 closeTips(t);t.open=true;});
document.addEventListener('focusout',ev=>{
 const t=tipOf(ev.target);if(!t||t===tipOf(ev.relatedTarget)||t.matches(':hover'))return;
 t.open=false;});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeTips(null);if(ev.ctrlKey&&ev.shiftKey&&ev.code==='KeyD'&&game.run){ev.preventDefault();setModal('debug');return;}if(ev.key==='Escape'&&modal&&game.run?.phase!=='foundation'&&(game.run||modal!=='new')&&!d0Owed())setModal(null);if(ev.key==='Tab'&&modal){const els=[...$('#modal-root').querySelectorAll('button:not(:disabled),input,select,summary,[tabindex="0"]')].filter(e=>e.getClientRects().length),first=els[0],last=els.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus();}}});
$('#save-file').addEventListener('change',async ev=>{const file=ev.target.files[0];if(!file)return;try{const save=Save.import(await file.text());game=new Game(save.account,save.run);game.save();selected=null;setModal(null);render();toast('이어서 영업할 준비가 됐습니다.');}catch(e){toast('저장 파일을 읽지 못했습니다. '+e.message);}ev.target.value='';});
window.addEventListener('pagehide',()=>{game.save();Sound.sync(true,game.run?.phase);});document.addEventListener('visibilitychange',()=>{if(document.hidden)game.save();Sound.sync(game.account.settings.muted,game.run?.phase,game.account.settings);});
/* The two volume sliders. Dragging one is audible at once and saved when it is let go, so a
   drag is not a hundred writes to storage. Neither slider re-renders the screen: a redraw
   would replace the control under the pointer and end the drag. */
document.addEventListener('input',ev=>{const el=ev.target.closest('[data-mix]');if(!el)return;
 const key=el.dataset.mix,v=Math.min(100,Math.max(0,Number(el.value)||0))/100;
 game.account.settings[key]=v;
 Sound.sync(game.account.settings.muted,game.run?.phase,game.account.settings);
 const out=$('#'+el.id+'-val');if(out)out.textContent=Math.round(v*100)+'%';});
document.addEventListener('change',ev=>{const el=ev.target.closest('[data-mix]');if(!el)return;
 game.save();if(el.dataset.mix==='sfx')sound('button');});
window.Guild24={get game(){return game;},render,simulate:Debug.simulate,showDebug:()=>setModal('debug')};render();
})();
