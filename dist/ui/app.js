(function(){
'use strict';
const D=DATA,E=Art.esc,$=s=>document.querySelector(s),fmt=n=>Math.round(n).toLocaleString('ko-KR');
/* UI_UX §BUILD MARKER (v2.9.3): the build a report was played on - the opening screen's corner and the console */
const BUILD=window.GUILD24_BUILD||{version:'dev',commit:'dev'};console.info('GUILD24 v'+BUILD.version+' · '+BUILD.commit);
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
/* UI_UX §NEW STORE PREPARATION — STORE SCENE (v2.9.9): the ending's `다음 점포 열기` shows the preparation scene over a Run
   that has ended, with a way back to its result; nothing about the Run changes until `첫 점포지원 고르기`. */
let prepOpen=false;
/* UI_UX §PROLOGUE (User 2026-10-04): five scenes before every new store - at start-up with no Run (in place of the
   loading screen; the art keeps loading behind it) and after `다음 점포 열기`. A tap goes on (every scene says so), 건너뛰기 ends it.
   Scenes 1~2 play the Boss track, scene 3 is silence, and from scene 4 the title runs on into the store screen. */
let prologue=null;
const PRO_ART='ui/assets/presentation/prologue/',PRO_CUE=['rumble','final',null,'page','page'];
/* Auto-advance (User 2026-10-04): each scene moves on by itself after its reading time (ms); a tap still goes on at once. */
const PRO_HOLD=[5500,7000,5000,4500,7500];
const proSpeaker=m=>'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/>'+(m?'<path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>':'<path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>')+'</svg>';
const proSoundBtn=()=>{const m=game.account.settings.muted||(!prologue.woke&&Sound.locked());return '<button type="button" class="pro-sound" data-action="prologue-sound" aria-label="'+(m?'소리 켜기':'소리 끄기')+'">'+proSpeaker(m)+'</button>';};
function proTimer(){clearTimeout(prologue.t);const at=prologue.i;prologue.t=setTimeout(()=>{if(prologue&&prologue.i===at)prologueStep(false);},PRO_HOLD[at]);}
const proWide=()=>matchMedia('(min-width:1024px)').matches;
const proArt=n=>PRO_ART+'scene'+n+'-'+(proWide()?'wide':'phone')+'.webp';
/* The browser keeps sound locked until the first tap: the speaker shows it as off, and that first tap starts the music from its beginning */
function prologueWake(){if(!prologue||prologue.woke)return;prologue.woke=true;if(!game.account.settings.muted&&Sound.locked()){Sound.restart();sound('ui');}}
/* scene 3: the gag lands when the caption has finished fading in, and the music cuts with it */
function proGag(){clearTimeout(prologue.g);prologue.cut=false;prologue.g=setTimeout(()=>{if(prologue&&prologue.i===2){prologue.cut=true;sound('gag');}},1600);}
function startPrologue(done){prologue={i:0,done};if(modal)setModal(null);[1,2,4].forEach(n=>warm(proArt(n)));Sound.prime('boss');render();sound(PRO_CUE[0]);proTimer();}
function prologueStep(skip){if(!prologue)return;clearTimeout(prologue.t);clearTimeout(prologue.g);
 if(!skip&&prologue.i<Copy.prologue.scenes.length-1){prologue.i++;const cue=PRO_CUE[prologue.i];render();if(cue)sound(cue);if(prologue.i===2)proGag();proTimer();return;}
 const done=prologue.done;if(!skip)sound('page');prologue=null;done();}
function prologueScreen(){const i=prologue.i,art=[1,2,null,4][i],
  img=art?'<img class="pro-art" src="'+proArt(art)+'" alt="">'
   :i===4?'<img class="pro-art" src="ui/assets/presentation/morning/store-bg-'+(proWide()?'wide':'phone')+'.webp" alt=""><img class="pro-npc" src="ui/assets/npc/normal/F/003.webp" alt="">':'';
 return '<div class="prologue" data-scene="'+(i+1)+'" data-action="prologue-next">'+img
  +'<div class="pro-cap">'+Copy.prologue.scenes[i].map(l=>'<p>'+E(l)+'</p>').join('')+'</div>'
  +'<p class="pro-hint">'+E(matchMedia('(hover:hover) and (pointer:fine)').matches?Copy.prologue.click:Copy.prologue.tap)+'</p>'
  +proSoundBtn()+'<button type="button" class="pro-skip" data-action="prologue-skip">'+E(Copy.prologue.skip)+'</button></div>';}
/* v3.0 BGM (User 2026-09-29): the key the music follows. The ending plays the success or the failure track, and the
   screens with no phase of their own - no Run, 첫 점포지원, the store about to open - play the title. */
function audioPhase(){if(prologue)return prologue.i<2||(prologue.i===2&&!prologue.cut)?'final':prologue.i===2?'hush':'prep';
 const s=game.run;if(!s||s.phase==='foundation'||(s.phase==='end'&&prepOpen))return 'prep';
 if(s.phase==='end'&&!endRevealed)return endFrom;
 return s.phase==='end'?(s.win?'end-win':'end-fail'):s.phase;}
/* UI_UX §AUDIO FEEDBACK — PHASE BGM (User 2026-09-29): arriving at the ending, the music of the screen it came from (BOSS
   after the Final, CLOSE after a bankruptcy, NIGHT after the Death limit) plays on until the result lands - the Final seal's
   landing frame, or a short hold on any other ending - and only then do the ending cue (`endwin` / `endfail`) and the
   SUCC / FAIL track come in, so neither can tell the result before the screen does. A reload of the ending is already
   revealed. */
let endRevealed=true,endFrom='final',endAt=null;
function endReveal(){const s=game.run;clearTimeout(endAt);
 const land=!motionOK()?0:s?.finalReport?FINAL_SEAL.hold+STAMP_FALL:ENDING_HOLD;
 endAt=setTimeout(()=>{if(game.run?.phase!=='end'||endRevealed)return;endRevealed=true;const st=game.account.settings;
  Sound.play(game.run.win?'endwin':'endfail',game.run.finalReport?.15:0);Sound.sync(st.muted,audioPhase(),st);},land);}
/* UI_UX_v2.8 §PURCHASE CONFIRMATION. Which Decoration is waiting for a confirmation, if any.
   Deliberately not persisted: a reload is a cancel, so a reopened page can never resume a
   half-finished purchase and spend the Capital a second time. */
let decoPending=null,decoFocus=null;
const badge=(r,npc=false)=>`<span class="rare-badge r${r}">${(npc?D.npcRarities:D.rarities)[r]}</span>`;
/* the sheet header's close control: a bare X, named 창 닫기 for assistive tech */
const CLOSE_X='<svg class="x-icon" viewBox="0 0 14 14" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" fill="none"/></svg>';
/* User 2026-10-04: the ORDER 발주 후보 교환 key keeps its name and gains this refresh mark */
const REROLL_ICON='<img class="reroll-icon" src="ui/assets/presentation/order/reroll.png" width="16" height="16" alt="" aria-hidden="true" draggable="false">';
const closeX=()=>btn(CLOSE_X,'dismiss','takeover-x','aria-label="창 닫기"');
const btn=(text,action,cls='',attrs='')=>`<button class="${cls}" data-action="${action}" ${attrs}>${text}</button>`;
/* v2.9.10 (User 2026-09-27/28): shelf life on stock counts down `폐기까지 N일` and then names its last two days - `내일까지`,
   `오늘까지` - so the day it is still sellable is never in doubt. (ORDER keeps `유통기한 N일`.) */
const lastSaleDay=left=>left<=1?'오늘까지':left===2?'내일까지':'폐기까지 '+left+'일';
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
function sound(kind='sale'){const st=game.account.settings;Sound.sync(st.muted,audioPhase(),st);Sound.play(kind);}
/* the heal accent sits behind the arrival's own cue, the same way `rescue` sits behind an Outcome */
function healCue(){const s=game.run,n=s?.phase==='sell'&&game.current();if(n?.healedBy)Sound.play('heal',.22);}
/* UI_UX_v2.8 §NIGHT OUTCOME AUDIO. The Outcome is what the cue says, always. There are two ways
   a result becomes the visible one - the final departure lands on result 0, and 다음 advances to
   the next - and both go through here, so neither can drift into a generic return cue. */
const nightCue=r=>r.outcome==='사망'?'death':r.outcome==='중상'?'severe':r.outcome==='부상'?'injury'
 :r.outcome==='퇴각'?'retreat':r.outcome==='대성공'?'great':'return';
/* v2.9.2 H1 (UI_UX §NIGHT LAYOUT — VERDICT STAMP): one timing table for the stamp and its cue, by the
   tone the Outcome already set. entry = the card's arrival, hold = the stillness before the stamp
   (none at 일반), `from` = the stamp's fall, dip = the card's give on the landing frame. 생환 holds
   for the first print of the turned-away Outcome; 사망 has no stamp and lays a tape instead. */
const STAMP_FALL=90,NIGHT_STAMP={
 safe:{entry:200,hold:0,from:1.6,dip:4,y:6},pull:{entry:240,hold:0,from:1.3,dip:2,x:-16},
 great:{entry:220,hold:100,from:1.6,dip:4,y:10},hurt:{entry:240,hold:120,from:1.6,dip:4,y:-8},
 severe:{entry:280,hold:160,from:1.6,dip:4,y:-14},saved:{entry:240,hold:180,from:1.6,dip:4,scale:.97,print:true},
 gone:{entry:240,hold:60,tape:440}};
const stampLand=st=>st.entry+st.hold+STAMP_FALL;
/* User 2026-09-25: a reversal is shown only when a death was turned away. 만반의 준비 turns a Death into 부상 / 중상 without
   the Insurance flags, so its result prints `사망` first and its own Outcome overstamps it - the same first print and
   hold as 생환, the Outcome cue on the overstamp and no `rescue` accent (that stays with the flags). 강골 and 구급키트 only
   lower an injury, so they never reverse. */
const preparedBrink=r=>!!r&&!r.rescued&&!r.avoidedDeath&&(r.events||[]).some(e=>e.id==='prepared');
const nightStampOf=r=>{const st=NIGHT_STAMP[Presentation.nightTone(r)]||NIGHT_STAMP.safe;
 return preparedBrink(r)?{...st,hold:NIGHT_STAMP.saved.hold,print:true,brink:true}:st;};
/* H5: the Final seal reuses the same fall. Both verdicts are climax weight: a 200 ms hold on the standing tape; the clear
   is the heaviest landing in the game (from 2 ×, the tape gives 6 px), the failure a lighter, crooked one (1.6 ×, 3 px). */
const FINAL_SEAL={hold:200,won:{from:2,dip:6},lost:{from:1.6,dip:3}};
const ENDING_HOLD=320;   // an ending with no seal (bankruptcy, the Death limit) lands its result after one beat
let sealCueAt=null;
/* v2.9.2 H3 ORDER confirm: one crate per ordered SKU lands on the warehouse list in a cascade capped at ORDER_BEAT.total ms
   (the step shrinks as SKUs grow; ORDER_BEAT.step is its ceiling); only the first ORDER_BEAT.hits landings are audible - the
   first is the existing `order` stamp, the next are the short `crate` of the same family - and the till counts down in
   ORDER_BEAT.till ms. 일반 intensity: no hold. */
const ORDER_BEAT={total:320,step:70,hits:3,till:220};
let orderCueAt=[];
/* v2.9.2 H4 CLOSING receipt: the body prints as one pass, and only the profit/loss row stamps -
   reusing the NIGHT stamp's own fall, a fixed 100 ms hold (중요, this screen repeats every Day). */
const CLOSING_STAMP={hold:100,dip:4};
let closingCueAt=null;
/* one printer tick for the whole receipt, then the profit/loss row's own cue on its landing frame;
   the direction is read off the rendered row so this never re-derives the day's figures itself */
function closingSound(){clearTimeout(closingCueAt);const s=game.run;if(!s||s.phase!=='closing')return;
 sound('receipt');
 const row=$('.p-closing .tape .purse');if(!row)return;
 const kind=row.classList.contains('loss')?'spend':'gold';
 if(!motionOK()){sound(kind);return;}
 closingCueAt=setTimeout(()=>sound(kind),CLOSING_STAMP.hold+STAMP_FALL);}
function sealSound(){clearTimeout(sealCueAt);const s=game.run;if(!s?.finalReport)return;const kind=s.win?'sealwin':'sealfail';
 if(!motionOK()){Sound.play(kind);return;}
 sealCueAt=setTimeout(()=>Sound.play(kind),FINAL_SEAL.hold+STAMP_FALL);}
/* v2.9.9 H7 FINAL 교전 (UI_UX §FINAL — CLASH SCENE; PRESENTATION §GAME FEEL BEAT H7 - the one scene exempt from the
   per-beat length and the inside-the-card rule). `마왕성으로 출발` has already resolved and saved the Final; this plays
   that result out once over the FINAL stage before the ending: the Boss lands, the party rises, each member is handed
   what they carry (one item at a time, so a full party takes longer rather than faster), then each member lunges in
   party order and the Boss counters every time, the last exchange included. An impact only says it landed; the red
   drops by that member's share after the counter - except the last member's, which is held for the verdict: after a
   stillness the red runs down, slows, and hesitates near the bottom (a clear at 5%, a failure where the roll left it),
   then a clear breaks to empty and a failure stays. The bar only ever falls and ends at the resolved Final's own ratio
   (a failure keeps at least 3%); no figure is shown and nothing is written. A tap or a key skips to the ending;
   reduced motion never starts it. */
const CLASH={dim:400,drop:500,presence:300,rise:400,stagger:100,settle:400,item:300,supplied:400,
 lunge:700,hitAt:370,counter:550,strikeAt:220,gap:100,drain:300,wait:900,run:850,hesitate:500,snap:160,verdict:900,tail:300};
const CLASH_EDGE=.05;   // where a clear hesitates before it breaks
let clash=null;
function clashMarkup(s,b,art,rep){
 return '<div class="clash-boss">'+(art?'<img src="'+art+'" alt="" draggable="false">':Art.mark('final',96))
  +'<b>'+E(b?.name||'')+'</b><span class="clash-bar"><i class="hp"></i></span>'
  +'<svg class="crack" viewBox="0 0 40 30" preserveAspectRatio="none" shape-rendering="crispEdges"><path d="M20 0v2h1v2h1v2h-1v2h-2v2h-1v2h-1v2h1v2h2v2h1v2h1v2h-1v2h-1v2h1v2M18 12h-2v1h-2v1h-1v2h-2v1h-2v2M22 20h2v1h1v1h2v2h1v1"/></svg></div>'
  +'<div class="clash-party">'+rep.members.map(m=>{const npc=s.npcs.find(x=>x.id===m.npcId),items=m.items||[],slots=Math.max(items.length,Adventurer.slots(npc));
   return '<div class="clash-card">'+portrait(npc,76)+'<b>'+E(m.name)+'</b><small>Lv.'+m.level+' '+E(D.jobBy[m.job]?.name||'')+'</small>'
    +'<span class="clash-bag">'+Array.from({length:slots},(_,i)=>'<span class="slot">'+(items[i]?'<i class="got">'+Art.itemIcon(items[i],22)+'</i>':'')+'</span>').join('')+'</span>'
    +'<i class="flash"></i></div>';}).join('')
  +'</div>';
}
function clashScene(){
 const s=game.run,d=s?.bossDebug,rep=s?.finalReport,host=$('.stage.p-final');
 if(!motionOK()||!host||!rep?.members?.length||!d||!(d.bossPower>0))return false;
 const b=D.bossBy[s.bossId],art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount),n=rep.members.length;
 const left=s.win?0:Math.max(.03,1-Math.max(0,Math.min(1,d.assault/d.bossPower))),share=(1-left)/n;   // a party that did no harm leaves it full
 const el=document.createElement('div');el.className='clash';el.setAttribute('aria-hidden','true');
 el.innerHTML=clashMarkup(s,b,art,rep);
 for(const c of host.children)c.inert=true;
 host.appendChild(el);
 const timers=[],anims=[];clash={el,timers,anims};
 const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
 const go=(node,frames,opt)=>{const a=node.animate(frames,{fill:'both',...opt});anims.push(a);return a;};
 const boss=el.querySelector('.clash-boss'),cards=[...el.querySelectorAll('.clash-card')],bar=el.querySelector('.clash-bar'),
  hp=bar.querySelector('.hp'),C=CLASH,pc=v=>(v*100).toFixed(2)+'%';
 const flash=(host,color,ms)=>go(host.querySelector(':scope>.flash'),[{opacity:0,background:color},{opacity:.8,background:color,offset:.15},{opacity:0,background:color}],{duration:ms});
 const drain=(from,to,ms,easing='ease-in-out')=>go(hp,[{width:pc(from)},{width:pc(to)}],{duration:ms,easing});
 const tremble=ms=>go(bar,[0,-2,2,-2,1,-1,2,-2,1,0].map(x=>({transform:'translateX('+x+'px)'})),{duration:ms});
 // entry: the room darkens, the Boss card lands heavily and holds, then the party rises and settles
 go(el,[{opacity:0},{opacity:1}],{duration:C.dim,easing:'ease-out'});
 go(boss,[{transform:'translateY(-72px)',opacity:0,easing:'cubic-bezier(.55,0,1,.45)'},{transform:'none',opacity:1,offset:.78},
  {transform:'translateY(3px) scaleY(.95)',offset:.88},{transform:'none',opacity:1}],{duration:C.drop,delay:C.dim});
 at(C.dim+C.drop*.78,()=>Sound.play('rumble'));
 const up=C.dim+C.drop+C.presence;
 cards.forEach((c,i)=>go(c,[{transform:'translateY(48px)',opacity:0},{transform:'none',opacity:1}],{duration:C.rise,delay:up+i*C.stagger,easing:'ease-out'}));
 let t=up+C.rise+(n-1)*C.stagger+C.settle;
 // the supply: what each member carries comes up from the counter into their bag, one item at a time
 const got=cards.flatMap(c=>[...c.querySelectorAll('.got')]);
 got.forEach((icon,i)=>{const card=icon.closest('.clash-card');
  at(t+i*C.item,()=>{const er=el.getBoundingClientRect(),ir=icon.getBoundingClientRect(),
    dx=er.left+er.width/2-(ir.left+ir.width/2),dy=er.bottom-(ir.top+ir.height/2);
   card.style.zIndex=2;
   go(icon,[{transform:'translate('+dx+'px,'+dy+'px) scale(.7)',opacity:0,easing:'cubic-bezier(.2,.6,.4,1)'},{opacity:1,offset:.25},
    {transform:'translateY(-4px) scale(1.25)',opacity:1,offset:.8},{transform:'none',opacity:1}],{duration:C.item});});
  at(t+i*C.item+C.item*.8,()=>{Sound.play('supply');card.style.zIndex='';});});
 if(got.length)t+=got.length*C.item+C.supplied;
 // the exchanges: each member lunges, the Boss counters; the red falls after the counter, the last member's held back
 let level=1;
 cards.forEach((card,i)=>{const from=level,to=1-(i+1)*share,last=i===n-1;if(!last)level=to;
  at(t,()=>{const br=boss.getBoundingClientRect(),cr=card.getBoundingClientRect(),
    dx=br.left+br.width/2-(cr.left+cr.width/2),dy=br.bottom-cr.top-2,hit='translate('+dx+'px,'+dy+'px)';
   card.style.zIndex=2;
   go(card,[{transform:'none',easing:'ease-out'},{transform:'translateY(14px) scale(.94)',offset:.3,easing:'cubic-bezier(.6,0,1,.6)'},
    {transform:hit,offset:.525},{transform:hit,offset:.68,easing:'ease-out'},{transform:'none'}],{duration:C.lunge});});
  at(t+C.hitAt,()=>{// a glint on the Boss's art alone and a jolt of its bar: it landed - how much is told after the counter
   const face=boss.firstElementChild,f0=getComputedStyle(face).filter,f1=(f0==='none'?'':f0+' ')+'brightness(1.7)';
   go(face,[{filter:f0},{filter:f1,offset:.25},{filter:f0}],{duration:120});
   go(boss,[{transform:'none'},{transform:'translate(5px,-3px)'},{transform:'translate(-4px,2px)'},{transform:'none'}],{duration:180});
   go(hp,[{filter:'none'},{filter:'brightness(1.8)',offset:.2},{filter:'none'}],{duration:180});tremble(220);
   Sound.play('clash');});
  at(t+C.lunge,()=>{card.style.zIndex='';const br=boss.getBoundingClientRect(),cr=card.getBoundingClientRect(),
    dx=(cr.left+cr.width/2-(br.left+br.width/2))*.25;
   go(boss,[{transform:'none',easing:'ease-out'},{transform:'translateY(-12px)',offset:.2,easing:'cubic-bezier(.6,0,1,.6)'},
    {transform:'translate('+dx+'px,44px)',offset:.4,easing:'ease-out'},{transform:'none'}],{duration:C.counter});});
  at(t+C.lunge+C.strikeAt,()=>{flash(card,'#d23a2a',260);
   go(card,[{transform:'none'},{transform:'translateX(-7px)'},{transform:'translateX(6px)'},{transform:'translateX(-4px)'},{transform:'translateX(3px)'},{transform:'none'}],{duration:300});
   Sound.play('counter');});
  if(!last)at(t+C.lunge+C.counter,()=>drain(from,to,C.drain));
  t+=C.lunge+C.counter+(last?0:C.gap);});
 // the verdict: a stillness, the red runs down and slows, hesitates near the bottom, then breaks - or stays
 const edge=s.win?Math.min(CLASH_EDGE,level):left;
 at(t,()=>tremble(C.wait));
 at(t+C.wait,()=>drain(level,edge,C.run,'cubic-bezier(.25,.8,.35,1)'));
 at(t+C.wait+C.run,()=>tremble(C.hesitate));
 t+=C.wait+C.run+C.hesitate;
 // a clear: the red runs out first, and only then does the crack show and the Boss fall (v3.0 prep §2-4-5 - the crack
 // used to start with the snap and showed while 5% of the red was still there)
 if(s.win)at(t,()=>drain(edge,0,C.snap,'ease-in'));
 at(s.win?t+C.snap:t,()=>{if(s.win){Sound.play('collapse');
   go(boss.querySelector('.crack'),[{opacity:0},{opacity:1}],{duration:120});
   go(boss,[{transform:'none',filter:'none',opacity:1},{transform:'translateX(-4px)',offset:.08},{transform:'translateX(4px)',offset:.16},
    {transform:'translateX(-2px)',filter:'brightness(.8)',opacity:1,offset:.26},{transform:'translateY(6px) rotate(-1.5deg)',offset:.4,easing:'cubic-bezier(.5,0,1,.5)'},
    {transform:'translateY(64px) rotate(4deg) scale(.96)',filter:'brightness(.25)',opacity:.55}],{duration:C.verdict});}
  else{go(boss,[{transform:'none'},{transform:'translateY(-8px) scale(1.05)',offset:.3},{transform:'translate(-3px,-6px) scale(1.05)',offset:.45},
    {transform:'translate(3px,-6px) scale(1.05)',offset:.6},{transform:'none'}],{duration:C.verdict*.6});
   cards.forEach(c=>go(c,[{transform:'none',filter:'none'},{transform:'translateY(18px)',filter:'brightness(.45) grayscale(.6)'}],{duration:C.verdict*.55,delay:C.verdict*.3,easing:'ease-out'}));}});
 at(t+C.verdict+C.tail,finishClash);
 el.addEventListener('click',finishClash);document.addEventListener('keydown',clashKey);
 return true;}
function clashKey(e){if(e.key==='Tab'||e.key==='Shift')return;e.preventDefault();finishClash();}
function finishClash(){if(!clash)return;const c=clash;clash=null;c.timers.forEach(clearTimeout);c.anims.forEach(a=>a.cancel());
 document.removeEventListener('keydown',clashKey);c.el.remove();render();sealSound();}
/* The life-saving accent lands BEHIND its own Outcome cue, never instead of it, so a rescued
   퇴각 still reads as a 퇴각. It appears only where the result itself carries the proof, so
   nothing that was not already resolved can be inferred from it.
   With motion the Outcome cue waits for the stamp's landing frame (a death's for its tape, a
   reversal's for its first print, `rescue` then on the overstamp); a waiting cue is dropped when
   the next result or the next screen comes first, so it is never heard over it. */
let nightCueAt=[];
function nightSound(result){nightCueAt.forEach(clearTimeout);nightCueAt=[];if(!result)return;
 const st=motionOK()&&nightStampOf(result);
 if(!st){sound(nightCue(result));if(result.rescued||result.avoidedDeath)Sound.play('rescue',.42);return;}
 nightCueAt=[setTimeout(()=>sound(nightCue(result)),st.tape?st.entry+st.hold:st.print&&!st.brink?st.entry:stampLand(st))];
 if(st.print&&!st.brink)nightCueAt.push(setTimeout(()=>Sound.play('rescue'),stampLand(st)));}
/* A redraw replaces a whole surface, and a destroyed control cannot keep the keyboard.
   Remember which control answered the last press by what it does rather than by object
   identity, then put the keyboard back on its replacement. Used by #app and by
   #modal-root, which had no restore at all: a redraw under an open modal dropped focus
   to <body> and made a keyboard user tab back from the top of the document. */
/* UI_UX §PURCHASE / EQUIP FLOW (User 2026-09-29): every step of a purchase or an equip redraws the Decoration panel, and the
   redraw put its scroll back at the top - the row just bought left the screen and read as something else. The pressed row
   goes back on the pixel it was on (as a SALE shelf row does), whatever the step added to or took from it. */
function keepDecoRow(el){const rows=()=>[...document.querySelectorAll('#modal-root .slot-option')],row=el.closest('.slot-option'),
  i=rows().indexOf(row),y0=row?row.getBoundingClientRect().top:0;
 return ()=>{const sc=$('#modal-root .modal-body'),back=rows()[i];if(sc&&back&&i>=0)sc.scrollTop+=back.getBoundingClientRect().top-y0;};}
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
   when a sheet opens over the screen, so one sheet opening another (메뉴 -> 설정, 도감 ->
   새 점포 준비) still returns to the single origin the player came from. If that origin is gone
   by the time the sheet closes, the Phase's own content region takes focus rather than nothing. */
// Plain prose breaks between sentences, never inside one when it fits (User 2026-10-03). A sentence longer than the
// line still wraps within itself, so nothing overflows. Any text-only block is eligible; one with its own authored
// line breaks (\n), a one-line clip (nowrap, ellipsis, line clamp) or a flex/grid box keeps its setting, and a
// button or heading keeps its label whole.
const SENT_SKIP='button,summary,h1,h2,h3,h4,label,option,.sent';
function sentenceBreaks(root){if(!root)return;for(const p of root.querySelectorAll('p,span,div,li,small,em')){
 if(p.childElementCount||p.dataset.sent||!/[.!?][”’]?\s+\S/.test(p.textContent)||p.textContent.includes('\n')||p.matches(SENT_SKIP))continue;
 const cs=getComputedStyle(p);if(cs.whiteSpace==='nowrap'||cs.textOverflow==='ellipsis'||cs.display.includes('flex')||cs.display.includes('grid')||(cs.webkitLineClamp&&cs.webkitLineClamp!=='none'))continue;
 const parts=[];for(const t of p.textContent.trim().split(/(?<=[.!?][”’]?)\s+/))if(parts.length&&parts[parts.length-1].length<4)parts[parts.length-1]+=' '+t;else parts.push(t);
 if(parts.length<2)continue;p.dataset.sent='1';p.textContent='';parts.forEach((t,i)=>{const e=document.createElement('span');e.className='sent';e.textContent=t;p.append(e);if(i<parts.length-1)p.append(' ');});}}
function setModal(value){decoPending=null;if(value==='relics')sealFolded=false;const jumped=!!value&&!!decoFocus;if(!value)decoFocus=null;if(modal==='event'&&value!=='event'&&game.run&&!game.run.eventSeen){game.run.eventSeen=true;game.save();}$('#coach-root').innerHTML='';if(value&&!modal)previousFocus=document.activeElement;modal=value;renderModal();/* a panel opened ON a Slot has already put focus there; do not yank it back to the top */
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
function stage(phase,label,head,body,dock,attrs='',classes=''){
 return '<div class="stage p-'+phase+(classes?' '+classes:'')+'"'+attrs+'>'+menuFab()+(head||'')
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
const BOSS_HOLD=200;let bossHold=null; // UI_UX §BOSS REVEAL — MORNING LANDS FIRST
/* v2.9.10 (User 2026-09-27): a card's art used to be fetched only when its card was drawn. The art the next beats will show
   is fetched and decoded ahead - the Boss's for today, and every living adventurer's (today's customers included, the
   moment SALE opens) - and a held Boss reveal waits for its art as well as the shutter, never longer than BOSS_WAIT. */
const BOSS_WAIT=1200,warmed=new Map();
function warm(src){if(!src)return Promise.resolve();if(!warmed.has(src)){const im=new Image();im.src=src;warmed.set(src,(im.decode?im.decode():Promise.resolve()).catch(()=>{}));}return warmed.get(src);}
const TILL_ART=['regular','discount','markup','off'].map(k=>'ui/assets/presentation/sale/till-'+k+'.png');
function warmAhead(s,phase){warm(Scene.bossArt(s.bossId,s.day,s.sealBreakCount));
 if(['morning','order','sell'].includes(phase))TILL_ART.forEach(warm); // the price keys' art is first needed the moment a product is tapped
 if(['morning','order','sell'].includes(phase))for(const n of s.npcs)if(n.alive)warm(Scene.npcArt(n));}
function phaseMorning(A){
  const shutter=$('.band.ceiling .band-art');
  if(shutter)A(shutter,{translateY:[-14,0],duration:420,ease:'outQuad'});
  const slips=[...document.querySelectorAll('.pinned .slip')];
  if(slips.length)A(slips,{translateY:[-10,0],opacity:[0,1],duration:260,delay:anime.stagger(70),ease:'outQuad'});
  const till=$('.till .coin');
  if(till){const to=game.run.money,from=lastTill===null?to:lastTill;lastTill=to;
   if(from!==to){const box={v:from};A(box,{v:to,duration:520,ease:'outQuad',onUpdate:()=>{till.textContent=fmt(box.v);}});}}
}
function phaseOrder(A){
  const form=$('.form');
  if(form)A(form,{translateY:[16,0],opacity:[0,1],duration:280,ease:'outQuad'});
}
 /* v2.9.2 H6 FINAL boss reveal entry (UI_UX §FINAL — BOSS REVEAL ENTRY): the boss art and name plate
    settle in as one movement - the only H6 target the four-cut capture and report left in scope. */
function phaseFinal(A){
  const gate=$('.gate-zero');
  if(gate)A(gate,{translateY:[10,0],opacity:[0,1],duration:220,ease:'outQuad'});
}
 /* v2.9.2 H4 CLOSING receipt (UI_UX §CLOSING — RECEIPT STAMP): every row of the two figure blocks
    settles together in one 200 ms pass - never a tick per row - and only the 보유 골드 figure (v2.9.7) lands as
    a stamp on a fixed 100 ms hold, reusing the NIGHT stamp's own 90 ms fall and card dip. */
function phaseClosing(A){
  const printed=[...document.querySelectorAll('.p-closing .tape .print>.block')];
  if(printed.length)A(printed,{opacity:[0,1],translateY:[-4,0],duration:200,ease:'outQuad'});
  const row=$('.p-closing .tape .purse'),val=row?.querySelector(':scope>b'),tape=$('.p-closing .tape'),land=CLOSING_STAMP.hold+STAMP_FALL;
  if(row)A(row,{opacity:{from:0,to:1,duration:40,delay:CLOSING_STAMP.hold,ease:'linear'}});
  if(val)A(val,{scale:{from:1.6,to:1,duration:STAMP_FALL,delay:CLOSING_STAMP.hold,ease:'in(3)'}});
  if(tape)A(tape,{translateY:[{from:0,to:0,duration:land},{to:CLOSING_STAMP.dip,duration:40,ease:'in(2)'},{to:0,duration:150,ease:'outQuad'}]});
}
 /* v2.9.2 H1 NIGHT VERDICT STAMP (UI_UX §NIGHT LAYOUT — VERDICT STAMP, PRESENTATION §GAME FEEL BEAT).
    The card arrives the way that return happened (BATCH 3), stands, and the tag is stamped onto
    it: one hard 90 ms fall, the card dipping under it on the landing frame. Weight follows the
    Outcome - no hold for the everyday 성공 / 퇴각, a short one for the rest - and the one response
    after the landing belongs to the cause when there is one (the Hero Item line settles) and to
    the money only when there is not (REWARD figures count up). A reversal prints what the
    Insurance turned away and overstamps it; a death gets a tape, not a stamp. Everything reads
    the tone and the result already resolved; nothing here is state. */
function phaseNight(A){
  const beat=$('.beat'),tag=$('.beat .verdict');
  const tone=(beat?.className.match(/\bt-(\w+)/)||[])[1],r=game.run.results[game.run.nightCursor||0];
  const st=r?nightStampOf(r):NIGHT_STAMP[tone]||NIGHT_STAMP.safe,at=st.entry+st.hold,land=stampLand(st);
  if(beat){const p={opacity:{from:0,to:1,duration:st.entry,ease:'outQuad'},
    translateY:[{from:st.y||0,to:0,duration:st.entry,ease:'outQuad'}].concat(st.tape?[]
     :[{to:0,duration:land-st.entry},{to:st.dip,duration:40,ease:'in(2)'},{to:0,duration:150,ease:'outQuad'}])};
   if(st.x)p.translateX={from:st.x,to:0,duration:st.entry,ease:'outQuad'};
   if(st.scale)p.scale={from:st.scale,to:1,duration:st.entry,ease:'outQuad'};
   A(beat,p);}
  /* 사망: the word comes with the card and a black tape lays across under it - no stamp */
  if(tag&&st.tape)A(tag,{'--tape':{from:0,to:1,duration:st.tape,delay:at,ease:'inOut(2)'}});
  else if(tag){
   A(tag,{scale:{from:st.from,to:1,duration:STAMP_FALL,delay:at,ease:'in(3)'},
    opacity:{from:0,to:1,duration:40,delay:at,ease:'linear'}});
   if(tone==='hurt')A(tag,{'--ink':{from:.35,to:1,duration:220,delay:land,ease:'outQuad'}});
   /* the reversal: the Outcome the Insurance turned away starts to print in its own tag, then the
      resolved label lands over it and the faint print goes */
   if(st.print&&r){const g=document.createElement('p');g.setAttribute('aria-hidden','true');
    const fromDeath=r.avoidedDeath||st.brink;
    g.className='verdict ghost t-'+(fromDeath?'gone':'severe');g.textContent=fromDeath?'사망':'중상';
    g.style.left=tag.offsetLeft+'px';g.style.top=tag.offsetTop+'px';tag.before(g);
    A(g,{opacity:[{from:0,to:.4,duration:st.hold,delay:st.entry},{to:.4,duration:STAMP_FALL},{to:0,duration:120}],
     scale:{from:1.15,to:1,duration:st.hold,delay:st.entry,ease:'outQuad'},onComplete:()=>g.remove()});}
  }
  /* after-motion has one owner: the reversal's proof lines cut in on the overstamp; else the Hero
     Item line settles; else the REWARD figures count up. A death has none. */
  const told=[...document.querySelectorAll('.beat .told .cause,.beat .told .why')],hero=$('.beat .cause li.hero');
  if(st.print)told.forEach(el=>A(el,{opacity:{from:0,to:1,duration:1,delay:land}}));
  /* the claim's accent bar belongs to its list: when the claim is the list's only line, the list settles */
  else if(hero)A(hero.parentElement.children.length===1?hero.parentElement:hero,{opacity:{from:0,to:1,duration:160,delay:land,ease:'outQuad'},
   translateY:{from:-4,to:0,duration:160,delay:land,ease:'outQuad'}});
  else if(!st.tape)document.querySelectorAll('.beat .changed .reward .tok b').forEach(b=>{
   const text=b.textContent,m=text.match(/\d[\d,]*/);if(!m)return;
   const to=Number(m[0].replace(/,/g,'')),box={v:0},put=()=>{b.textContent=text.replace(m[0],fmt(box.v));};
   put();A(box,{v:to,duration:220,delay:land,ease:'outQuad',onUpdate:put,onComplete:()=>{b.textContent=text;}});});
}
 /* v2.9.2 H5: the Final seal lands on the standing tape and the ending's own sentence follows it */
function phaseEnd(A){const seal=$('.end-tape .seal'),tape=$('.end-tape');
  if(seal){const v=FINAL_SEAL[seal.classList.contains('won')?'won':'lost'],at=FINAL_SEAL.hold,land=at+STAMP_FALL;
   /* the ink ends where the stylesheet leaves it (a failure is faint), so reduced motion and motion end alike */
   A(seal,{scale:{from:v.from,to:1,duration:STAMP_FALL,delay:at,ease:'in(3)'},opacity:{from:0,to:parseFloat(getComputedStyle(seal).opacity)||1,duration:40,delay:at,ease:'linear'}});
   if(tape)A(tape,{translateY:[{from:0,to:0,duration:land},{to:v.dip,duration:40,ease:'in(2)'},{to:0,duration:170,ease:'outQuad'}]});
   document.querySelectorAll('.end-tape .closed,.end-tape .reason').forEach(el=>A(el,{opacity:{from:0,to:1,duration:160,delay:land,ease:'outQuad'},
    translateY:{from:-4,to:0,duration:160,delay:land,ease:'outQuad'}}));}
  /* v2.9.2 H4: 점포 자본 정산's 현재 점포 자본 counts up to its resolved figure - one quiet `ui`
     click for each Decoration price it passes, read off the live price list rather than a second
     copy of the numbers. 일반 intensity: no hold. */
  const settle=game.run?.settlement,capRow=settle&&[...document.querySelectorAll('.end-tape .settlement .row')]
   .find(r=>r.firstElementChild?.textContent==='현재 점포 자본')?.querySelector('b');
  if(capRow){const from=settle.capitalAfter-settle.gain,to=settle.capitalAfter;
   if(to>from){const lines=[...new Set(D.decorations.map(d=>d.price))].filter(p=>p>from&&p<=to);
    let last=from;const box={v:from};
    A(box,{v:to,duration:320,ease:'outQuad',onUpdate:()=>{
     capRow.textContent=Math.round(box.v).toLocaleString();
     for(const p of lines)if(last<p&&box.v>=p)sound('ui');
     last=box.v;},onComplete:()=>{capRow.textContent=to.toLocaleString();}});}}
}
 // SALE reveal: the next back walks up to the counter and turns face up. It only ever
 // moves layers that are already laid out, so nothing shifts and no reflow is queued.
function phaseSell(A){
  const face=$('.who .face'),fig=$('.who .figure'),tag=$('.who .nameplate'),br=$('.bracket'),pool=$('.pool');
  /* v2.9.10 (User 2026-09-28): the customer's card walks up to the counter - a few steps in from the side - and a
     newcomer's portrait, fetched only as they arrive, rises into it once decoded (at most 1.5 s); until then the card holds
     their silhouette, so a slow network reads as someone still stepping up, not as a stalled screen. */
  const WALK=560,waiting=fig&&fig.tagName==='IMG'&&!(fig.complete&&fig.naturalWidth);
  if(face){A(face,{translateX:[72,0],duration:WALK,ease:'outSine'});A(face,{translateY:[0,-6,0,-6,0,-4,0],duration:WALK,ease:'linear'});
   A(face,{opacity:[0,1],duration:160,ease:'outQuad'});}
  const rise=delay=>A(fig,{translateY:[10,0],opacity:[0,1],duration:280,delay,ease:'outQuad'});
  if(waiting){face.classList.add('waiting');fig.style.opacity=0;
   Promise.race([fig.decode().catch(()=>{}),new Promise(r=>setTimeout(r,1500))]).then(()=>{if(!fig.isConnected)return;
    face.classList.remove('waiting');fig.style.opacity='';rise(0);});}
  else if(fig)rise(WALK-220);
  if(pool)A(pool,{opacity:[0,.42],duration:340,ease:'outQuad'});
  if(br)A(br,{opacity:[0,1],scale:[1.06,1],duration:220,delay:150,ease:'outQuad'});
  if(tag)A(tag,{translateY:[10,0],opacity:[0,1],duration:200,delay:120,ease:'outQuad'});
  const waits=[...document.querySelectorAll('.line-up .wait')];
  if(waits.length)A(waits,{translateX:[16,0],duration:240,delay:anime.stagger(45),ease:'outQuad'});
}
function playPhase(phase){
 if(!motionOK())return;
 const run={morning:phaseMorning,order:phaseOrder,final:phaseFinal,closing:phaseClosing,night:phaseNight,end:phaseEnd,sell:phaseSell}[phase];
 if(run)run(anime.animate);
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
/* UI_UX §SALE — FORECAST PIN (User 2026-09-25, v2.9.0): whether the Player folded the floating 전망 line to its chip.
   Presentation only, cleared whenever the readout is back on screen - no Save or account field. */
let pinFolded=false,pinWatch=null,orderWatch=null,sheetWatch=null,railShown='';
/* UI_UX §SALE — COUNTER TRAY FOLD (User 2026-09-25): on a phone the filled tray folds to its header line while the
   player scrolls the shelf or taps elsewhere, and any shelf row (the same one included) or the folded tray opens it
   again. Presentation only: which Item is selected does not change, and nothing here is saved. */
let trayFolded=false,trayArm=0,trayBase=0;
/* FINAL_EXPEDITION §D30 PLAYER FLOW (User 2026-09-25): the last order comes first, the way an ordinary Day starts.
   Which step is showing is presentation: the muster opens once the player moves on from the order - or at once when
   a saved party pick exists - and the confirmed party is the prep. Nothing new is saved. */
let finalOrdered=null,finalPinFolded=false,finalPinWatch=null;
function syncTray(){const t=$('.p-sale .counter-tray');if(!t)return;t.classList.toggle('folded',trayFolded);
 t.querySelector('.tray-unfold')?.setAttribute('aria-expanded',String(!trayFolded));}
function foldTray(){if(!selected||trayFolded||innerWidth>=1024||game.run?.phase!=='sell')return;trayFolded=true;syncTray();}
function watchTray(){const sc=$('.p-sale .stage-scroll');if(!sc)return;trayArm=performance.now()+300;trayBase=sc.scrollTop;
 sc.addEventListener('scroll',()=>{if(performance.now()<trayArm){trayBase=sc.scrollTop;return;}
  if(Math.abs(sc.scrollTop-trayBase)>32)foldTray();},{passive:true});}
function showStub(){if(!stub)return;const st=stub;stub=null;
 document.querySelector('.receipt-stub')?.remove();clearTimeout(stubTimer);
 /* `half`: the first 50% sale's lesson anchors to this line (UI_UX §SALE PRICE LESSONS) */
 const el=document.createElement('div');el.className='receipt-stub'+(st.mode==='half'?' half':'');el.setAttribute('role','status');
 if(st.refused)el.classList.add('refused');
 const delta=(st.loyalty>=0?'+':'')+st.loyalty;
 el.textContent='단골도 ';
 if(st.refused){const value=document.createElement('span');value.className='loyalty-delta';value.textContent=delta;el.appendChild(value);}
 else el.appendChild(document.createTextNode(delta+' · 소지금 '+st.from+' → '+st.to));
 const dock=$('.p-sale .dock');el.style.bottom=(dock?Math.max(0,Math.round(innerHeight-dock.getBoundingClientRect().top))+8:92)+'px';
 document.body.appendChild(el);
 /* the stamp-in and the fade are playCue()'s (the one guarded place for in-phase motion); this only removes it */
 /* while a coach mark is open the line stays - the 50% lesson may be waiting behind the Bag mark - and goes once they close */
 const drop=()=>{if(activeCoach){stubTimer=setTimeout(drop,400);return;}el.remove();};
 stubTimer=setTimeout(drop,motionOK()?2800+KEY_PRESS.down:2500);}
 // picking a product puts it on the counter tray - the tray contents arrive, the list does not move
function cueSelect(A){const open=$('.counter-tray .tray-item');if(open)A(open,{opacity:[0,1],translateY:[8,0],duration:190,ease:'outQuad'});}
 /* A1 건네기: the Item icon travels from its shelf row to the Bag slot it now fills (280 ms), the
    slot settles (1.05 -> 1, 240 ms), the dock Gold counts to its new value, and each Stat cell that
    changed pulses once (300 ms) and keeps the new value. A2: the customer nods (4 px, 180 ms x 2).
    Every beat is under 320 ms and the whole sale is under 600 ms; input is never held. */
 /* H3 ORDER confirm (UI_UX §ORDER — WAREHOUSE DISCLOSURE, UI-Q-v29-32): each ordered SKU's crate - its warehouse row's icon -
    falls onto its row with the NIGHT stamp's fall, and that row's count goes from its prior value straight to the resolved one on
    the landing frame (one crate per SKU, never one per unit); a SKU new to the warehouse brings its row in with it. A folded list
    shows the `N / M칸` summary only, which moves on the last landing. The till's 보유 골드 counts down to the resolved value. */
function cueOrder(A,h){const k=h.skus||[],step=Math.min(ORDER_BEAT.step,(ORDER_BEAT.total-STAMP_FALL)/Math.max(1,k.length-1));
  /* the list on screen takes the crates: the desk's column or the phone's open 창고 sheet (UI_UX §ORDER — WAREHOUSE PANEL;
     a folded sheet shows the handle's figures only); every `N / M칸` and `N종` figure moves on the last landing */
  const side=$('.p-order .stock-side'),sheet=$('#stock-sheet'),list=side?.getClientRects().length?side:sheet&&!sheet.hidden?sheet:null;
  /* User 2026-10-01: the phone sheet draws only held units, so an order that passes a row makes it taller - it rises to the new
     height over the first beat (the new row shows from the dock up) instead of jumping a row in one frame */
  if(list===sheet&&h.sheetH!=null){const to=sheet.getBoundingClientRect().height;
   if(to>h.sheetH+1){sheet.style.overflow='hidden';A(sheet,{height:{from:h.sheetH,to,duration:STAMP_FALL*2,ease:'outQuad'},
    onComplete:()=>{sheet.style.height='';sheet.style.overflow='';}});}}
  k.forEach((item,i)=>{const at=Math.round(i*step),land=at+STAMP_FALL;
   /* the SKU's new cells - the ones past what it held before - take its crate, all on the same fall */
   const cells=list?[...list.querySelectorAll('li.wh-slot[data-item="'+item+'"]')].slice(h.before?.[item]||0):[];
   for(const cell of cells){const icon=cell.querySelector('summary')?.firstElementChild;if(!icon)continue;
    A(icon,{translateY:{from:-10,to:0,duration:STAMP_FALL,delay:at,ease:'in(3)'},opacity:{from:0,to:1,duration:40,delay:at,ease:'linear'}});}
   if(i<ORDER_BEAT.hits)orderCueAt.push(setTimeout(()=>Sound.play(i?'crate':'order'),land));});
  if(!k.length)Sound.play('order');
  /* the warehouse figures - the summary's `N / M칸` and `N종`, and the register's 창고 잔여 칸 - are one fact; all three move on the last landing */
  if(k.length){const last=Math.round((k.length-1)*step)+STAMP_FALL,
    room=[...document.querySelectorAll('#order-register>div')].find(d=>d.firstElementChild?.textContent==='창고 잔여 칸')?.querySelector('b'),
    held=[...[...document.querySelectorAll('.p-order .stock-head b')].map(el=>[el,h.used+' / '+game.capacity()+'칸']),
     ...[...document.querySelectorAll('.p-order .stock-head em')].map(el=>[el,Object.keys(h.before||{}).length+'종']),
     [room,(game.capacity()-h.used)+' / '+game.capacity()]].filter(([el])=>el);
   const now=held.map(([el])=>el.textContent);held.forEach(([el,was])=>{el.textContent=was;});
   A({t:0},{t:1,duration:last,onComplete:()=>{held.forEach(([el],i)=>{el.textContent=now[i];});}});}
  const gold=[...document.querySelectorAll('#order-register>div')].find(d=>d.firstElementChild?.textContent==='보유 골드')?.querySelector('b');
  if(gold&&h.gold!==undefined&&h.gold!==game.run.money){const now=gold.textContent,box={v:h.gold};
   A(box,{v:game.run.money,duration:ORDER_BEAT.till,ease:'outQuad',onUpdate:()=>{gold.textContent=fmt(Math.round(box.v));},onComplete:()=>{gold.textContent=now;}});}
}
function cueSale(A,h){
  /* A8 영수증 조각: stamps in (1.12 -> 1, 200 ms) and fades after 2.5 s; showStub() owns its removal */
  const stubEl=$('.receipt-stub');if(stubEl){A(stubEl,{scale:{from:1.12,to:1,duration:200,delay:KEY_PRESS.down,ease:'outQuad'},opacity:{from:0,to:1,duration:40,delay:KEY_PRESS.down,ease:'linear'}});setTimeout(()=>{if(stubEl.isConnected)A(stubEl,{opacity:[1,0],duration:280,ease:'outQuad'});},2500+KEY_PRESS.down);}
  /* H2: a successful sale draws the counter without its tray, so the tray that was pressed is put back where it stood,
     inert (it no longer answers input - the next tap reaches the new screen), for the key's press and return only;
     its Item already travels as the A1 hand-over, so the tray's own icon is hidden. */
  const stage=$('.p-sale'),held=h.tray,key=held&&held.querySelector('.tills button[data-mode="'+h.mode+'"]');
  if(stage&&key){const now=stage.querySelector(':scope>.counter-tray'),dock=stage.querySelector(':scope>.dock');
   held.inert=true;held.setAttribute('aria-hidden','true');held.classList.add('held');
   const icon=held.querySelector('.tray-icon');if(icon&&h.icon)icon.style.visibility='hidden';
   if(now)now.replaceWith(held);else stage.insertBefore(held,dock);
   let gone=false;const put=()=>{if(gone)return;gone=true;if(now)held.replaceWith(now);else held.remove();};
   keyPress(A,key,{onComplete:put});setTimeout(put,1500);}
  const slot=[...document.querySelectorAll('.kit .slots i.full')].pop();
  const settle=()=>{if(slot)A(slot,{scale:[1.05,1],duration:240,ease:'outQuad'});};
  if(slot&&h.from&&h.icon){const to=(slot.firstElementChild||slot).getBoundingClientRect(),g=document.createElement('i');g.className='handoff';g.innerHTML=h.icon;
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
  const said=$('.say');if(said)A(said,{opacity:[0,1],translateY:[6,0],duration:220,ease:'outQuad'});
}
 /* A2 / A6: a refusal is the same channel saying no - the balloon and the figure shake their head,
    and the price button that was refused shakes once where it locked (오늘 거절됨 is already on it). */
function cueRefuse(A,h){const shake={translateX:[0,-4,4,-2,0],duration:280,ease:'outQuad'};
  const said=$('.say');if(said)A(said,{translateX:[0,-5,4,-2,0],duration:280,ease:'outQuad'});
  const fig=$('.who .figure');if(fig)A(fig,shake);
  /* H2: the refused key is pressed like any other (3 px, 60 + 60 ms) while it shakes where it locked */
  const b=h.mode?$('.tills button[data-mode="'+h.mode+'"][disabled]'):null;if(b){keyPress(A,b);A(b,shake);}
}
function playCue(){const c=cue;cue=null;const h=handoff||{};handoff=null;
 if(!c||!motionOK())return;
 const run={select:cueSelect,order:cueOrder,sale:cueSale,refuse:cueRefuse}[c];
 if(run)run(anime.animate,h);
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
/* v2.9.2 H2 SALE counter feel: the pressed price key travels KEY_PRESS.y px for KEY_PRESS.down ms and returns in
   KEY_PRESS.up ms; the A8 stub lands on that key's landing frame (KEY_PRESS.down). 일반 intensity: no hold. */
const KEY_PRESS={y:3,down:60,up:60};
/* every button carries `transition:transform .08s steps(2)` for its :active press; left on, it would swallow each frame this
   writes (and A6's shake with it), so the key drops it for the rest of its life - it is redrawn on the next render */
const keyPress=(A,key,more={})=>(key.style.transition='none',A(key,{translateY:[{from:0,to:KEY_PRESS.y,duration:KEY_PRESS.down,ease:'out(2)'},{to:0,duration:KEY_PRESS.up,ease:'outQuad'}],...more}));
// the approval stamp lands before the phase advances
/* UI_UX §MORNING — DAY SIGN FLIP (User 2026-09-29, v2.9.11): arriving at a new Day's MORNING within the session, the
   sign's number rolls - yesterday's rises out as today's rises in, one curve for both so they stay one line apart and
   never overlap - inside the sign (its own overflow), 300 ms, no sound (the MORNING shutter already sounds). A reload
   lands on the still sign; reduced motion never starts it. The number's own text is put back when it lands, so the DOM
   ends as it began. Presentation only: it reads s.day and writes nothing. */
function dayFlip(day){
 const b=$('.daysign b');if(!b||!motionOK()||day<1)return;
 const now=b.textContent,prev=String(day-1).padStart(2,'0');
 b.classList.add('flip');b.innerHTML='<span class="old" aria-hidden="true">'+prev+'</span><span class="new">'+now+'</span>';
 const ease='cubic-bezier(.45,0,.2,1)',o=b.querySelector('.old'),n=b.querySelector('.new');
 o.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:300,easing:ease,fill:'forwards'});
 n.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:300,easing:ease,fill:'forwards'})
  .finished.then(()=>{if(b.isConnected){b.classList.remove('flip');b.textContent=now;}},()=>{});
}
function stampPress(el){
 if(!motionOK()||!el)return;
 anime.animate(el,{scale:[1.08,1],duration:180,ease:'outQuad'});
}
function render(){
 if(clash)return finishClash(); // a redraw during the FINAL clash lands on the ending it was playing toward
 const s=game.run;
 /* arriving at the ending from a live screen: hold its music until the result lands (endReveal) */
 if(s?.phase==='end'&&lastPhase!==null&&!String(lastPhase).startsWith('end:')){endRevealed=false;endFrom=String(lastPhase).split(':')[0];}
 Sound.sync(game.account.settings.muted,audioPhase(),game.account.settings);
 /* UI_UX §NEW STORE PREPARATION — STORE SCENE (v2.9.9): with no Run - and from the ending after `다음 점포 열기` - the
    screen is the store about to open, not a panel over a title card. It has no way back when there is no Run: its
    Action starts one. */
 if(prologue){$('#app').innerHTML=prologueScreen();const c=$('#coach-root');if(c)c.innerHTML='';return;}
 if(!s||(s.phase==='end'&&prepOpen)){$('#app').innerHTML=prepScreen();sentenceBreaks($('#app'));requestAnimationFrame(showCoach);return;} // no lesson here: a mark left from the screen before is cleared
 const phase=s.phase,previousScroll=$('.stage-scroll')?.scrollTop||0;warmAhead(s,phase);
 const pop=document.getElementById('wh-pop');if(pop)pop.hidden=true; // its cell is redrawn closed
 /* UI_UX §SALE — DESK LAYOUT: on a desk the SALE columns are their own scrollers, so a redraw keeps theirs too */
 const previousCols=['.p-sale .dossier-col','.p-sale .shelf-col'].map(q=>$(q)?.scrollTop||0);
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
 $('#app').innerHTML=phaseScreen(phase);sentenceBreaks($('#app'));
 if(phase!=='final')finalOrdered=null;
 const viewKey=phase+':'+(phase==='sell'?s.cursor:phase==='night'?s.nightCursor:'');const changed=lastPhase!==viewKey,arrived=lastPhase!==null&&changed;lastPhase=viewKey;
 if(phase==='morning'&&arrived)dayFlip(s.day);
 if(phase==='end'&&arrived)endReveal();
 const scroller=$('.stage-scroll');if(scroller){scroller.scrollTop=changed?0:previousScroll;if(changed)$('#phase-content').focus({preventScroll:true});}
 ['.p-sale .dossier-col','.p-sale .shelf-col'].forEach((q,i)=>{const el=$(q);if(el)el.scrollTop=changed?0:previousCols[i];});
 /* The control that answered the last press is often disabled by it (a quantity driven to
    zero or to the cap), and a disabled button cannot take focus: fall to its nearest live
    neighbour inside the same group rather than back to the top. */
 if(!changed)restoreFocus($('#app'),focusHold);
 openOwedModal(s,phase,changed);
 const sayMs=cue==='sale'||cue==='refuse'?SAY_REPLY_MS:SAY_MS;
 renderModal();requestAnimationFrame(showCoach);if(changed)playPhase(phase);playCue();placeSpeech();armSpeech(sayMs);
 syncWatchers(phase);
}
function phaseScreen(phase){
 return phase==='morning'?morningScreen():phase==='order'?orderScreen():phase==='sell'?saleScreen():phase==='night'?nightScreen():phase==='closing'?closingScreen():phase==='final'?finalScreen():phase==='end'?endScreen():stage('start','첫 점포지원','','<div class="relic-open"><span class="label">DAY 0</span><h2>첫 점포지원</h2><p class="muted">이번 점포에 쓸 지원 하나를 고르세요.</p></div>','');
}
/* The warehouse is a native disclosure, but its preference is an account-level presentation
   choice: it opens for a new player and, once folded, stays folded on later Days and reloads
   until the player opens it again. It is not progression and does not need another state owner. */
// An Event is the Morning opening beat and comes before Gate detail; a new milestone window opens once.
/* The Boss reveal joins the beat that already exists rather than becoming a Phase of its
   own (UI_UX: `Boss reveal is not a new permanent Phase`). It goes ahead of the Relic
   window on the same Day, because the Relic decision is the one it is meant to inform
   (REL-Q41, UI-Q40): D5 identity, D15 the exact Trait, D25 the two Families. */
/* The foundation takeover owns the screen so the first store support gets decided, but it
   used to be a one-way door: the Run was already committed and the only way back was to
   spend it. The pre-Run screen may therefore win over it - nothing has been played yet, so
   going back costs nothing and creates no second Run. */
/* a Boss-reveal hold belongs to the MORNING it started on: if the Day has left it (only a scripted path can) or nothing is
   owed any more, the hold ends at once rather than leaving the screen inert */
function openOwedModal(s,phase,changed){
 if(bossHold&&(phase!=='morning'||!bossRevealDue())){clearTimeout(bossHold);bossHold=null;$('#app').inert=false;}
 if(phase==='foundation')modal='relics';
 /* UI_UX §BOSS REVEAL — MORNING LANDS FIRST (User 2026-09-26): a reveal due on a fresh MORNING entry waits for the
    shutter to land (BOSS_HOLD), so the dossier never opens in the same frame as the cut. Reduced motion opens it at once.
    The screen takes no input while it waits: the Day may not advance past an owed reveal (CORE_RUN §D0 briefing). */
 else if(bossRevealDue()){if(bossHold){}else if(changed&&phase==='morning'&&motionOK()){$('#app').inert=true;
  bossHold=setTimeout(()=>Promise.race([warm(Scene.bossArt(s.bossId,s.day,s.sealBreakCount)),new Promise(r=>setTimeout(r,BOSS_WAIT))])
   .then(()=>{if(!bossHold)return;bossHold=null;$('#app').inert=false;render();}),BOSS_HOLD);}else modal='boss';}
 else if(phase==='morning'&&s.event&&!s.eventSeen)modal='event';
 else if(s.relicWindow&&!s.relicWindow.focusedRevealSeen&&['morning','order','final'].includes(phase))modal='relics';
}
function syncWatchers(phase){
 if(phase==='sell'){watchForecastPin();watchTray();}else{pinWatch?.disconnect();pinWatch=null;}
 if(phase==='order'||phase==='final'&&finalIsOrdering(game.run)){watchOrderToday();watchStockSheet();}else{orderWatch?.disconnect();orderWatch=null;railShown='';sheetWatch?.disconnect();sheetWatch=null;}
 if(phase==='final'&&game.run.finalCommitted)watchFinalPin();else{finalPinWatch?.disconnect();finalPinWatch=null;finalPinFolded=false;}
}
/* UI_UX §ORDER — WAREHOUSE PANEL (User 2026-10-02): the rows under an open phone sheet scroll up above it, and the room left
   under the 발주서 is the sheet's own height - it takes only the rows the stock needs - not the 45% it may reach at most,
   which left an empty stretch under a short sheet. The sheet reports its height as it opens, grows or closes. */
function watchStockSheet(){sheetWatch?.disconnect();sheetWatch=null;
 const sh=$('#stock-sheet'),host=$('.p-order');if(!sh||!host||typeof ResizeObserver!=='function')return;
 sheetWatch=new ResizeObserver(()=>host.style.setProperty('--sheet-h',Math.ceil(sh.getBoundingClientRect().height)+'px'));sheetWatch.observe(sh);}
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
   short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공` - the number first (User 2026-09-24).
   MORNING calls it with the Gate alone: handed to .map directly, the array index arrived as `full`
   and every Gate after the first printed the Gate-detail sentence (User 2026-09-25). */
function gatePlate(d,full=false){const b=sigilOf(d);
 /* data-tier / data-family: the anchors of the two Gate lessons (a tier II Gate, a FIRE Gate); no style reads them. User 2026-10-02:
    the tier, not the Hazard count - a 한파 / 독안개 Event adds a Hazard to a tier I Gate, which then held two and drew the II mark */
 return '<article class="slip gate" data-tier="'+(d.tier||1)+'" data-family="'+E(d.family||'')+'" style="--fam:'+(b.color||'#caa46a')+'"><span class="pin"></span>'
 +'<span class="crest">'+Art.mark(b.id||d.id,28)+'</span>'
 +'<b>'+E(d.name)+'</b>'
   +'<ul class="hazards'+(full?' full':'')+'">'+Presentation.hazardRows(Presentation.known(d,game),d).map(h=>full
     ?'<li data-hazard="'+h.key+'">'+Scene.hazardIcon(h.key,18)+'<span class="sentence">'+E(Presentation.hazardSentence(h.key,d))+'</span></li>'
     :'<li data-hazard="'+h.key+'">'+Scene.hazardIcon(h.key,18)+'<i>'+E(h.name)+'</i>'+pressCell(h)+'</li>').join('')+'</ul>'
   +'</article>';}
/* User 2026-09-30: a Gate the day's Event closed stays on the list, faded and stamped `오늘 폐쇄`, with no Hazard rows - no one
   can go there today, so it carries no decision, only the fact of which Gate it was (EVENT 게이트 임시 폐쇄) */
function closedPlates(){return (game.run.closedGates||[]).map(d=>{const b=sigilOf(d);
 return '<article class="slip gate closed"><span class="pin"></span>'
 +'<span class="crest">'+Art.mark(b.id||d.id,28)+'</span><b>'+E(d.name)+'</b><span class="closed-stamp">오늘 폐쇄</span></article>';}).join('');}
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
/* UI_UX §DEATH LIMIT — ALWAYS VISIBLE (MORNING/ORDER, v2.9.1 balance): one compact item, the
   same line on both screens - count / current segment limit / the Day it ends. The limit already
   includes 추모 방명록 and 위령제 (Meta.deathLimit). Warning color only at count = limit - 1. */
/* `labelled`: the ORDER floating box sets 사망 as its line label, in the column 오늘 and 발주 후 share (User 2026-09-29) -
   the same words, split into label and value */
const railFolded=()=>game.account.settings.orderRailFolded===true;
function deathLimitItem(labelled){const s=game.run,n=s.stats.deaths,limit=Meta.deathLimit(s),end=Meta.deathLimitSegmentEnd(s),warn=n===limit-1?' warn':'';
 return labelled?'<i>사망</i><b class="death-limit'+warn+'">'+n+' / '+limit+' · D'+end+'까지</b>'
  :'<b class="death-limit'+warn+'">사망 '+n+' / '+limit+' · D'+end+'까지</b>';}
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
     +'<p class="board-rail" id="visitor-count">오늘의 원정<b>손님 '+s.queue.length+'</b><b>게이트 '+s.dungeons.length+'</b>'+deathLimitItem()+'</p>'
   +'<div class="pinned">'+(s.event?eventSlip(s.event):'')+deepSlip()+s.dungeons.map(d=>gatePlate(d)).join('')+closedPlates()+'</div></div>'
  +'<div class="band wall">'+Scene.wall(s.day)+'</div>'
  /* The store plate is furniture, not signage: it is screwed to the counter, so it is a
     counter-band element and is placed in the counter's own coordinates. Presentation only -
     same text, same source, same order on screen. */
  +'<div class="band counter"><span class="mount">'+Scene.counter()
   +'<span class="branchplate">'+E(s.branch)+'</span>'
   +'<span class="till-cap" style="'+Scene.anchorStyle('tillLabel')+'">보유 골드</span>'
   +'<span class="till" style="'+Scene.anchorStyle('till')+'" aria-label="보유 골드 '+fmt(s.money)+'G"><b class="coin">'+fmt(s.money)+'</b><i>G</i></span>'
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
 +'<span class="effect"><i>효과</i><span>'+E(Presentation.eventDescription(e))+'</span></span>'
 +'<span class="flavor"><span>'+E(e.reveal)+'</span></span></button>';}
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
 /* UI_UX §SALE — ENVIRONMENT METER (User 2026-10-02): the selected, unsold Item previews where the 환경 대응 number would land
    (`6 → 16`), the resolver's own number with that Item in the Bag - Stat-route shares included, so nothing is left to add up.
    Only 환경 대응 previews; 전투 전망 and its death % stay the SALE-entry snapshot. */
 const pre=extra&&n.pack.length<Adventurer.slots(n)?Dungeon.prepare({...v,pack:[...n.pack,extra]},d,game.run.facilities):null;
 /* ...and the outlook itself is the frozen SALE-entry snapshot, not this live preparation. */
 const o=n.outlook||game.outlookFor(n);
 /* DUNGEON_HAZARD §GREAT SUCCESS signal. It sits in the forecast the player is already reading,
    before departure and while the preparation can still change, and it is recomputed from the
    same margin the roll uses - so it moves as items are added. It says the attempt is worth
    chasing and nothing more: no percentage, no margin, no readiness score. */
 const signal=o.greatSignal;
 /* v2.9.5 (User 2026-09-26, COPY_AUDIT §4-25): the % in the 전투 전망 help did not register in play, so the chain that raises it
    is said in the 전투 전망 box (v2.9.14 quick patch) - only for an injured departure with a chain behind it (the first adds
    nothing), the NPC detail row's own wording and number. Words only; the % stays in the help. */
 const strain=n.injury===1?Dungeon.injuredStreak(n.records):0,strainText='연속 부상 출발 '+strain+'회';
 /* Two forecasts, said apart. An expedition can fail two different ways - beaten in the fight,
    or worn down by the environment - and one blended verdict hides which. Both read their own
    canonical vocabulary: the fight is Dungeon.estimate (우세/접전/불리), the environment is the
    weakest Hazard state already computed for the rows below (충분/대응/불안/취약). No new label
    and no new calculation: the summary IS the worst of the rows the player can see. */

 const mob=cls==='core-mob';
 /* UI_UX §SALE — OUTLOOK BOXES (User 2026-10-02): 전투 전망 and 환경 대응 are two boxes of their own (`ro2`), equal halves while
    both fit - one stamped word that does not move, one number that does - so neither reads as part of the other */
 return '<div class="readout ro2'+(cls?' '+cls:'')+'">'
 +'<div class="top">'
  /* User 2026-10-01: back to `전투 전망` - `도착 시 전투 전망` filled a half cell on a phone, so the two readings stacked;
     the outlook coach mark says when the reading is taken again */
  +'<span class="fore ro-combat"><span class="ro-head">전투 전망'
  /* v2.9.0 (User 2026-09-24, COPY_AUDIT §4-1): the exact failure-conditioned Death risk is the
     second line of this help, not an always-on cell - the readout reads 전투 전망 and 환경 대응.
     Same frozen SALE-entry value, said as a conditional, never as the chance the expedition
     ends in death. The NPC detail states it too (§5-7). */
   +tip('전투 전망','손님의 힘과 게이트의 요구 전력을 견준 전망. 우세 · 접전 · 불리.','실패 시 사망 위험 '+Math.round(o.deathRisk*100)+'%')+'</span>'
   /* User 2026-10-02 (UI_UX §GREAT SUCCESS OPPORTUNITY SIGNAL): the signal lives in this box, not on a line of its own under the
      pair - a phone shows the short tag beside the word (the sentence stays for a screen reader), a desk the sentence under it */
   /* v2.9.14 quick patch (User 2026-10-02): the 연속 부상 출발 line joins it the same way - it is what raises this box's death % */
   +(signal||strain?'<span class="gs-row"><b>'+o.combat+'</b><span class="ro-tags">'+(strain?'<i class="st-tag" aria-hidden="true">'+E(strainText)+'</i>':'')
     +(signal?'<i class="gs-tag" aria-hidden="true">'+E(Copy.great.tag)+'</i>':'')+'</span></span>'
     +(strain?'<span class="ro-strain">'+E(strainText)+'</span>':'')+(signal?'<span class="great-signal">'+E(Copy.great.signal)+'</span>':'')
     :'<b>'+o.combat+'</b>')+'</span>'
  /* The environment half of the pair the comment above describes. It is `outlook.worst` - the
     weakest of the Hazard states the destination plate lists, in the same canonical
     vocabulary (충분/대응/불안/취약) and off the same frozen SALE-entry snapshot. It reads
     here because it is judged against an Item, beside the other two readings a product is
     bought to move. No new label and no new calculation. From a two-Hazard Gate it reads each Hazard's own state
     instead (envReading, v2.9.13). */
  /* User 2026-10-02 (UI_UX §SALE — ENVIRONMENT METER): 환경 대응 is now the number itself, live with the committed Bag - a
     display window of its own beside the stamped 전투 전망, so a cell that moves never reads like the one that does not */
  +(p.hazards.length?'<span class="fore ro-env env-each env-meter"><span class="ro-head">환경 대응'
   +tip('환경 대응','손님의 능력치·특성에 판 상품의 위험 대응을 더한 값. 뒤는 필요한 수치다.','필요한 수치까지 채우면 그 위험으로 생기는 사고를 막는다.')+'</span>'+envMeter(p,d,pre)+'</span>':'')
  +'</div>'
 /* v2.9.0 (User 2026-09-24): no always-on Fatigue line under the outlook - current Fatigue is the status strip's
    `피로 N`, the counter tray lists a Food/Drink's own `피로 회복 N` row (no `피로 A → 출발 B` line), NIGHT answers the rest. */
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
   if(deskSale())return saleDesk(n,st,waiting,preloadHtml);
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
 +'<div class="counter-edge" aria-hidden="true"></div>'+forecastPin(n,st?st.item:null)
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="영업">'
  /* UI-Q109 §8. Reading order stays what it was - who this is, then what to sell them - but
     the shelf has to be reachable without a scroll, and measured on a phone the Trait rows
     were the block that pushed the first product row past the fold. They are the one thing
     here that a product cannot move: the forecast and the four Core Stats are exactly what
     보급 후 변화 compares against when a product is picked, so they lead, and the Traits read
     as the standing description they are, under the goods. Nothing is dropped, no wording
     changes, and the wide layout still sets both columns side by side. */
  +'<div class="dossier-col">'
   +'<div class="dossier">'+returningSummary(n)+readout(n,st?st.item:null,'core-mob')+statGrid(n)+'</div>'
   +'<div class="dossier traits">'+traitRows(n)+'</div>'
   /* UI-Q-v29-16 (User 2026-09-24, v2.9.0): no second owned-Relic block in SALE at any width - the shelf-head control is the one reference */
  +'</div>'
  +'<div class="shelf-col">'+shelf()+'</div>'
  +'<div class="sale-deep">'+deepOfferUI(n)+'</div>'
 +'</main>'
 +tray()
 /* D-34. Every price on this screen is a judgement against what the store has, and the
    store's gold was the one number not on it - Morning, Order and Closing all show it and
    Sale did not. It goes on the strip that is already pinned here, beside the queue, rather
    than becoming a readout of its own. */
 +'<div class="dock"><div class="queue"><span class="q-line" role="img" aria-label="손님 '+(s.cursor+1)+' / '+s.queue.length+'">손님'+pips(s.queue.length,s.cursor)+'</span>'
 +'<span class="on-hand">보유 골드 <b>'+fmt(s.money)+'</b>G</span></div>'
 +btn(s.cursor+1===s.queue.length?'영업 종료':'손님 보내기','depart','stamp')+'</div></div>';
}
/* UI_UX §SALE — DESK LAYOUT (User 2026-09-30, "PC판 전용으로 분리"): a desk draws its own SALE, not the phone's column
   re-flowed. The customer stands large behind the counter with the state, the outlook and the destination beside them and
   the waiting line at the far end; under the counter top the player's side is three areas - the customer's ledger (the
   stats, Traits and last expedition), the counter tray in the middle on the counter, and the shelf. The pieces are the
   phone's own (the same functions, so the same text, keys and actions); what the phone needs only on a phone - its second
   readout in the column and the forecast pin - is not drawn here. */
const deskSale=()=>typeof matchMedia==='function'&&matchMedia('(min-width:1024px)').matches;
function saleDesk(n,st,waiting,preloadHtml){const s=game.run;
 return '<div class="stage p-sale sale-desk">'+menuFab()+preloadHtml+taskLine('sell')
 +'<section class="front" data-npc="'+E(n.id)+'" aria-label="계산대 앞">'
  +'<div class="backwall" aria-hidden="true">'+Scene.shelfStrip()+'</div>'
  +speech(n)+standee(n)+'<div class="front-side">'+kitLine(n)+readout(n,st?st.item:null,'core-desk')+destPlate(n)+'</div>'
  +waitingLine(waiting)
 +'</section>'
 +'<div class="counter-edge" aria-hidden="true"></div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="영업">'
  +'<div class="dossier-col">'
   +'<div class="dossier">'+returningSummary(n)+statGrid(n)+deepOfferUI(n)+'</div>'
   +'<div class="dossier traits">'+traitRows(n)+'</div>'
  +'</div>'
  +'<div class="shelf-col">'+shelf()+'</div>'
 +'</main>'
 +'<div class="counter-mat" aria-hidden="true"></div>'+tray()
 +'<div class="dock"><div class="queue"><span class="q-line" role="img" aria-label="손님 '+(s.cursor+1)+' / '+s.queue.length+'">손님'+pips(s.queue.length,s.cursor)+'</span>'
 +'<span class="on-hand">보유 골드 <b>'+fmt(s.money)+'</b>G</span></div>'
 +btn(s.cursor+1===s.queue.length?'영업 종료':'손님 보내기','depart','stamp')+'</div></div>';}
/* crossing the desk breakpoint mid-SALE draws the other layout */
let deskWas=deskSale();
window.addEventListener('resize',()=>{const d=deskSale();if(deskWas!==null&&d!==deskWas&&game.run?.phase==='sell')render();deskWas=d;});
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
/* SALE phone balloon: it goes up over the backwall when it leaves the customer's money
   readable, and hangs under the wallet line (ui.css .p-sale .say) when it would cover a G amount. */
function placeSpeech(){
 const say=$('.p-sale .say');if(!say||matchMedia('(min-width:900px)').matches)return;
 say.classList.add('up');
 const r=say.getBoundingClientRect();
 if([...document.querySelectorAll('.p-sale .npc-wallet b')].some(b=>{const w=b.getBoundingClientRect();
  return w.right>r.left&&w.left<r.right&&w.bottom>r.top&&w.top<r.bottom;}))say.classList.remove('up');
}
function armSpeech(ms=SAY_MS){
 if(!$('.say:not(.status)')){if(sayTimer){clearTimeout(sayTimer);sayTimer=null;}sayArmed=null;return;}
 if(sayArmed===sayKey)return;
 if(sayTimer)clearTimeout(sayTimer);
 sayArmed=sayKey;
 sayTimer=setTimeout(hideSpeech,ms);
}
function standee(n){
 const art=Scene.npcArt(n),job=D.jobBy[n.job].name,rank=D.npcRarities[n.rarity]||'',regular=Adventurer.isTrustedRegular(n);
 return '<button class="who r'+n.rarity+(Presentation.returning(n)?' returning':'')+'" data-action="npc" data-id="'+n.id+'" aria-label="'+E(n.name)+' Lv.'+n.level+' '+job+(regular?' 단골':'')+' 기록 보기">'
 +'<span class="face">'
  +'<span class="portrait">'
   +'<span class="pool" aria-hidden="true"></span>'
   +(art?'<span class="figure-wait" aria-hidden="true"></span><img class="figure" src="'+art+'" alt="" draggable="false">'
        :'<span class="figure fallback">'+Art.avatar(n,140)+'</span>')
   +'<span class="stand" aria-hidden="true"></span>'
   +'<span class="bracket" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
  +'</span>'
  +'<span class="nameplate'+(regular?' regular':'')+'">'+(regular?'<img class="regular-badge" src="ui/assets/presentation/sale/regular-badge.png" alt="" aria-hidden="true" draggable="false">':'')+(rank?'<i class="rank">'+E(rank)+'</i>':'')
   +'<b>'+E(n.name)+'</b><span>Lv.'+n.level+' '+job+'</span></span>'
 +'</span></button>';}
/* SA-Q18 / UI_UX_v2.8 §EVENT TEMPORARY BUDGET. A 급여일 Wallet is two numbers: the persistent
   소지금 and a budget that exists only for today's visit. interest() and sell() spend both, so a
   screen that prints 소지금 alone states an affordability the Player cannot check. The two are
   printed side by side and never summed into one figure - the temporary half is never relabelled
   소지금. The wording is the approved Event Function's own (오늘 방문 모험가 · 현재 소지금의 20%만큼
   추가 구매 가능), so nothing new is invented here. */
function walletChip(n,full){const b=n.eventBudget||0,base=(full?'손님 소지금':'소지')+' <b>'+fmt(n.money)+'G</b>';
 return b>0?'<span class="wp">'+base+'</span> <span class="wp">추가 구매 <b>+'+fmt(b)+'G</b></span>':base;}
/* what the customer can actually pay with right now: the same sum interest() and sell() use. */
function spendable(n){return n.money+(n.eventBudget||0);}
/* SA-Q13 / SA-Q46. 단골 has ONE owner: Adventurer.isTrustedRegular, which is Loyalty >= 51.
   Nothing here re-states the number and nothing carries a second UI threshold - the Store
   Support conditions at 30 / 50 / 60 are their own mechanics and do not redefine 단골. The
   compact SALE state carries Injury, Fatigue and Loyalty, with 단골 shown as a state rather
   than as a progress bar. Normal SALE shows the value alone: no separate `?` / Loyalty
   popover trigger competes with the Bag for the same row. The meaning is taught by the
   tutorial/coach and stays available in the compact Help under its own owner. */
function kitLine(n){const slots=Adventurer.slots(n),parts=n.injury?[n.status]:[];
 /* SALE §CURRENT CUSTOMER COMPACT STATE: only an active Injury is named. */
 if(n.fatigue)parts.push('피로 '+Dungeon.prepare({...n,traits:Presentation.traits(n)},game.claimedGateFor(n),game.run.facilities).effects.fatigueBeforeExpedition);if(n.recovery)parts.push('휴식 '+n.recovery+'일');
 parts.push('단골도 '+n.loyalty);
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
 const heal=n.healedBy==='infirmaryPlaque'?'<p class="heal-note" role="status">의무실 현판으로 부상 회복</p>'
  :n.healedBy==='firstAidDesk'?'<p class="heal-note" role="status">응급 처치대로 부상 회복</p>'
  :n.healedBy==='medcorps'?'<p class="heal-note" role="status">길드 의료단으로 부상 회복</p>':'';
 return '<div class="kit"><div class="vitals"><span class="vit"><i>상태</i><span>'+parts.map(x=>'<b>'+x+'</b>').join(' · ')+'</span></span>'
 /* CORE_RUN §FIRST-RUN LESSONS (User 2026-10-02): the first Run's DAY 3 payday customer carries the `payday` mark's anchor */
 +'<span class="npc-wallet'+(game.run.firstRun&&n.lessonPayday===game.run.day?' payday':'')+'">'+walletChip(n,true)+'</span></div>'
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
 +'<div class="nightband" aria-hidden="true"></div>'
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="밤">'
  +taskLine('night')+rail
  +'<div class="beat-room">'
   +(s.pilgrimage?'<p class="event-note">게이트 순례 주간 · 실제 변경 '+s.pilgrimage+'명</p>':'')
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
 /* NIGHT_CLOSING §DISCOVERY LINE: the taught rules that acted on this record are state classes only - the NIGHT
    coach marks anchor to them (coachSteps.night) */
 +'<div class="told'+(r.acted||[]).map(k=>' learn-'+k).join('')+'">'
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
 /* the proven claim is marked so the verdict stamp can hand it the landing's after-motion (H1) */
 return lines.length?'<ul class="cause">'+lines.map((t,i)=>'<li'+(hero&&!i?' class="hero"':'')+'>'+E(t)+'</li>').join('')+'</ul>':'';}
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
 /* NIGHT_CLOSING §FATIGUE RESULT: the settled value opens the recorded daily causes. */
 const stamp=c=>c.note
  /* v2.9.0 NIGHT next-decision line (COPY_AUDIT §6-6): one sentence under the settled Fatigue, not a chip */
  ?'<p class="next-decision">'+E(c.value+' — '+c.label+' '+c.extra)+'</p>'
  :c.detail
  ?'<button class="fatigue-row tok '+c.kind+'" data-action="fatigue" data-id="'+E(r.npcId)+'" aria-label="'+E(c.label+' '+c.value+' · 피로 변화 보기')+'"><i>'+E(c.label)+'</i><b>'+E(c.value)+'</b></button>'
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
 const all=[...Presentation.nightChanges(r, n, game.run.facilities),...extra];
 const band=key=>{const rows=all.filter(c=>(c.group||'grew')===key);
  return rows.length?'<div class="'+key+'">'+rows.map(stamp).join('')+'</div>':'';};
 return band('grew')+band('after')+band('reward');}
// CLOSING — `오늘 장사는 어땠을까?`. Economics only; the expedition story belongs to Night.
// The object is the till roll the register printed when the shutter came down: a narrow
// strip torn at both ends, lying on the dark counter under the same lamp. Not the order
// form — that is a wide sheet a person fills in; this is a tape a machine printed, so
// every figure is monospace and right-aligned on a dotted leader, subtotals rule off,
// and the money actually in the drawer is the last thing stamped on it.
function closingReceipt(s){
 /* NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT: the receipt is the Day's cash - what the store
    started with, the Gold that moved, what it ends with - not an income statement. The opening is derived from the Day's own
    flows (end - ins + outs), so the tape always adds up. Stock and waste are counts: an expired Item was paid for when it was
    ordered, and printing its cost as a loss read as Gold leaving the drawer twice. */
 const d=s.daily;
 const ins=[['매출',d.revenue,true],['본사 지원·수당',(d.subsidy||0)+(d.commission||0)],['대성공 본사 보상',d.greatSuccess],['재고 정리',d.liquidation]];
 const outs=[['발주',d.spent,true],['발주 후보 교환',d.rerollSpent],['점포지원 투자',d.relicSpent],[Copy.deep.sponsor,d.deepSponsor],['운영비',d.operating,true]];
 const total=rows=>rows.reduce((t,r)=>t+(r[1]||0),0),change=total(ins)-total(outs),open=s.money-change;
 const line=(r,sign)=>r[1]||r[2]?'<div class="row"><span>'+E(r[0])+'</span><b>'+(r[1]?sign:'')+fmt(r[1]||0)+'</b></div>':'';
 const tomorrow=s.day<29?game.tomorrowOperatingCost():null,tone=change>0?'gain':change<0?'loss':'even';
 /* what expired: a name alone for one, `×n` from two, three kinds at most and the rest as `외 N종` so it stays one line */
 const wasted=Object.entries(d.wasteItems||{}).sort((x,y)=>y[1]-x[1]),wasteNames=wasted.length?' · '+wasted.slice(0,3).map(([id,n])=>E(D.itemBy[id]?.name||id)+(n>1?' ×'+n:'')).join(' · ')+(wasted.length>3?' 외 '+(wasted.length-3)+'종':''):'';
 return '<div class="tape">'
 +'<div class="tear top" aria-hidden="true"></div>'
 +'<div class="print">'
  +'<div class="head"><b>GUILD24</b><span>DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span><span>영업 종료</span></div>'
  +(d.noVisitors?'<div class="block"><p>'+E(d.recoveryOnly?'모두 중상이라 방문할 손님이 없어서 영업을 못했다.':'오늘은 원정에 나선 손님이 없었다.')+'</p></div>':'')
  +'<div class="block"><div class="row open"><span>영업 시작 골드</span><b>'+fmt(open)+'<i>G</i></b></div></div>'
  +'<div class="block ins">'+ins.map(r=>line(r,'+')).join('')+'</div>'
  +'<div class="block outs">'+outs.map(r=>line(r,'-')).join('')+'</div>'
  /* the stamped figure (UI_UX §CLOSING — RECEIPT STAMP) is 보유 골드, the Gold the Day ends with, in the purse box at the
     largest size and one colour; only 영업 손익 is coloured - green up, red down, gold at exactly 0 */
  +'<div class="purse '+tone+'"><span>보유 골드</span><b>'+fmt(s.money)+'<i>G</i></b>'
   +'<p class="pl"><span>영업 손익</span><b>'+(change>0?'+':'')+fmt(change)+'<i>G</i></b></p></div>'
  +'<div class="block info"><p>창고 재고 '+s.inventory.length+'개</p>'
   +(d.waste?'<p>오늘 폐기 '+d.waste+'개'+wasteNames+'</p>':'')
   +(tomorrow!==null?'<p>내일 운영비 예상 '+fmt(tomorrow)+'G</p>':'')+'</div>'
 +'</div>'
 +'<div class="tear bottom" aria-hidden="true"></div></div>';
}
function closingDock(s){
 if(s.stats.deaths>=Meta.deathLimit(s))return '<p class="danger-text">사망 한도에 도달했다.</p>'+btn('점포 종료','close','stamp');
 const rescue=game.canRescue(),spent=(s.rescueUsed||0),cap=game.rescueLimit();
 return (s.money<0
  ?'<p class="danger-text">운영비가 부족하다.'+(rescue?' 회생 '+spent+' / '+cap+'':' 회생을 모두 썼다.')+'</p>'
   +(rescue?btn('재고 정리','stock'):'')+btn('폐점','retire','danger')
  /* v2.9.14 quick patch (User 2026-10-02): a rescue started tonight stays open past zero, so the key stays until the Closing ends */
  :rescue?btn('재고 정리','stock'):'')+btn('다음 날','close','stamp');
}
function closingScreen(){
 const s=game.run;
 return '<div class="stage p-closing">'+menuFab()
 +'<main class="stage-scroll" id="phase-content" tabindex="-1" aria-label="마감">'+taskLine('closing')+closingReceipt(s)+'</main>'
 +'<div class="dock">'+closingDock(s)+'</div></div>';
}
const NIGHT_MARKS=['death','severe','injured','prepared','earn','great','counter','fatigue'];
const coachSteps={
 /* UI_UX §FIRST-EVER DEEP EXPEDITION TUTORIAL. It is keyed to the notice, so it appears the
    first time a Deep Expedition actually occurs and never before the feature exists. Completion
    is account-scoped like every other coach mark: a Run abandon keeps it, a full data reset
    clears it and the next first occurrence teaches it again. No new persistence was added. */
 /* UI_UX §TUTORIAL — COACH DIET (User 2026-09-30): 방문객 and 게이트 are retired - the sign's 손님 N and the DAY 1~3 task line say them */
 morning:[['deep','.slip.deep','같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.'],
  /* User 2026-09-30: contextual, the first time the board holds such a Gate - the rule only, never which Item answers it */
  /* UI_UX §FIRST EVENT TUTORIAL (User 2026-10-01): the first Event slip on the board, once per account (the first Run's DAY 2) */
  ['event','.slip.event','아침마다 사건이 생길 수 있다. 사건마다 영향과 적용 기간이 다르다. 사건의 효과를 확인한다.'],
  /* User 2026-10-02: the first tier II Gate only - not a tier I Gate an Event gave a second Hazard, not a III, not FIRE II (one base Hazard) */
  ['gatepair','.slip.gate[data-tier="2"]:not([data-family="golem"])','II 게이트부터는 기본 위험이 두 가지다. 단, 사건으로 위험이 추가될 수 있다.'],
  ['gatefire','.slip.gate[data-family="golem"][data-tier="2"],.slip.gate[data-family="golem"][data-tier="3"]','화염 게이트는 II 이후에도 기본 위험이 하나다. 단, 사건으로 위험이 추가될 수 있다.']],
 /* COACH DIET (User 2026-09-30): the first ORDER keeps 발주 확정 alone - the 오늘 line and 위험 보기, the 창고 head, each offer's
    effect line, the 최대 key and the priced 발주 후보 교환 key say the retired gates / stock / offer / quantity / reroll marks */
 order:[['confirm','[data-action="confirm-order"]','카트의 상품만 발주한다. 확정 뒤에도 추가 발주와 발주 후보 교환이 가능하다.'],
  /* COPY_AUDIT §3-12 (User 2026-10-02): the first Run's DAY 3 HQ kit is told where it lands - its cell, or the folded sheet's handle */
  ['kit','.stock-side .wh-slot.lesson-kit,.p-order .dock .stock-handle.lesson-kit','본사가 구급키트 1개를 보냈다. 원정에서 다쳐도 한 단계 가볍게 끝난다.'],
  /* COPY_AUDIT §3-14: DAY 4, independently of other ORDER marks. */
  ['reroll','.p-order [data-action="reroll"]','후보가 마음에 안 들면 발주 후보 교환으로 새로 받는다. 이번 교환 비용은 버튼에 표시된다.',,4]],
 /* UI_UX §TUTORIAL — COACH DIET (User 2026-09-30): the first SALE teaches two marks - the destination (COPY_WORLD_VOICE
    §Tutorial: the rule that a destination can change is taught here, never through one Trait's name) and the Stats.
    The Hazard and price marks are retired: the Hazard rows say what answers them and price is taught after the fact.
    The outlook mark is back (User 2026-10-01): it says the readout is the SALE-entry snapshot, so the title stays short. Everything else is contextual: showCoach() shows the first
    unfinished mark whose target is VISIBLE, so a mark anchored to an element that only exists in its situation (a
    returning customer, a filled Bag slot, a refused 바가지 key, a 50% sale's change line) teaches itself the first time
    that situation exists and never before. Exact copy: COPY_AUDIT §3 / §26-3.
    UI_UX §TUTORIAL - READ THE SYSTEM, DO NOT GIVE THE ANSWER: no mark names an Item for a Hazard. */
 sell:[['destination','.dest-plate','이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.'],
 /* COPY_AUDIT §3-7 STATS: the first time a customer's Stats are on screen - what they are, that they differ per customer,
    투력 for combat, the other three for the Hazards and each one's side role. No number, no verdict. */
 ['stats','.dossier .detail-stats','투력은 전투를, 강인함·기동·정신은 위험을 막는다. 포션은 투력을 올린다. 강인함은 사고, 기동은 부상, 정신은 사망을 조금 줄인다.'],
 /* User 2026-10-04: how an expedition is decided, before the two outlook boxes that read it - the rule only, never an Item */
 ['flow','.readout','게이트 안에는 적이 있고, 환경도 위험하다. 둘 다 넘어야 원정에 성공한다. 하나라도 못 넘기면 다치거나 죽을 수 있다.'],
 /* COPY_AUDIT §3-4 (User 2026-10-01, back): `.top` is the frozen SALE-entry snapshot itself; what moves with the Bag sits below it */
 ['forecast','.readout .ro-combat','전투 전망은 손님이 게이트와의 싸움에서 이길지 보여 준다. 상품 판매로는 바뀌지 않는다.',,2],
 /* User 2026-10-02: the outlook mark is two - one per box */
 ['envmeter','.readout .ro-env','환경 대응 = 손님 능력치 + 상품. 필요한 수치를 채우면 위험을 막는다.',,3],
 /* COPY_AUDIT §3-14: the first time the price keys show - a refused 바가지 closes the Item, so it is known before the choice */
 ['price','.counter-tray .tills','세 가격 중 하나로 판다. 할인은 단골도를 올리고, 바가지는 거절되면 그 상품을 오늘 못 판다.'],
 /* contextual marks */
 /* COPY_AUDIT §3-13 (User 2026-10-02): the first Run's DAY 3 payday customer - an invitation to try 150%, with its two costs */
 ['payday','.npc-wallet.payday','보수를 받은 손님이다. 바가지(150%)를 해 볼 만하다. 다만 거절되면 그 상품은 오늘 못 팔고, 팔려도 단골도가 깎인다.'],
 ['returning','.who.returning','다시 온 손님. 단골도가 높을수록 자주 찾아오고, 상품도 더 잘 산다. 지난 원정과 기록은 손님을 눌러 본다.',,4],
 ['bag','.slots .full','판 상품은 손님 가방에 들어가 오늘 원정에서 쓰고 사라진다.',,4],
 /* COPY_AUDIT §3 단골 (User 2026-10-04): the first 단골 badge on the counter, DAY 6 at the earliest - two days clear of the
    DAY 4 returning / Bag marks - names the line and how Loyalty moves, numbers read from the tables (Copy.loyalty) */
 ['regular','.nameplate.regular',Copy.loyalty.coach(),,6],
 /* UI_UX §SALE PRICE LESSONS: the first refused 바가지 is marked again where it happened */
 ['price-refused','.counter-tray [data-mode="overcharge"].refused','거절된 상품은 오늘 이 손님에게 못 판다. 바가지는 팔려도 거절돼도 단골도가 깎인다.']],
 /* NIGHT_CLOSING §DISCOVERY LINE (User 2026-09-30): a rule is taught after it first acts - a mark on the returning record
    it acted on, once per account; contextual like the SALE marks (only a record carrying its class shows it).
    COACH DIET (User 2026-09-30): the `한 명씩` result mark is retired - the record and its 전체 건너뛰기 key say it */
 /* User 2026-10-02: a mark lights what it is about - the Fatigue rule the record's 귀환 후 피로 row (`.fatigue-row`, the only
    token carrying the Fatigue arithmetic), every other rule the record's outcome block it acted on */
 /* User 2026-10-04: one NIGHT mark a night, the most serious rule first (death ends the Run, a Severe Injury costs days, ...); the
    rest wait for the next night they act. `earn` is the Wallet gain row - the first win that raised a customer's Wallet. */
 night:[...Copy.learned.map(([k,text])=>['learn-'+k,k==='fatigue'?'.beat .told.learn-fatigue ~ .changed .fatigue-row':'.beat .told.learn-'+k,text]),
  ['earn','.changed .tok.gain','이긴 손님은 소지금이 늘어난다. 그 돈은 이 가게에서 쓴다.',,2]]
  .sort((a,b)=>NIGHT_MARKS.indexOf(a[0].replace('learn-',''))-NIGHT_MARKS.indexOf(b[0].replace('learn-',''))),
 /* UI-Q-v28-27. `.tape` is the whole receipt - 653px on a phone, which no cutout can hold
    with the bubble - so the mark cut out its top 265px: the head and the 매출 / 판매 원가 block,
    which is not what this lesson is about. v2.9.7: the copy compares the Day's opening and end Gold, so it points at the
    purse box that carries both 보유 골드 and 영업 손익. */
 /* UI_UX §FIRST-EVER FINAL EXPEDITION COACH; COPY_AUDIT §14-9. Each stage has its own skip boundary. */
 finalRelic:[['final-intro','.relic-open',Copy.finalPrep.coach.intro]],
 finalOrder:[['final-order','[data-action="final-roster"]',Copy.finalPrep.coach.order],
  ['final-no-effect','.final-order .form-head',Copy.finalPrep.coach.noEffect]],
 finalRoster:[['final-roster','.final-roster .npc-card',Copy.finalPrep.coach.roster],
  ['final-commit','[data-action="final-commit"]',Copy.finalPrep.coach.commit]],
 final:[['final-environment','.final-environments',Copy.finalPrep.coach.environment],
  ['subjugation','.final-forecast .top',Copy.finalPrep.coach.preparation]],
 /* COACH DIET (User 2026-09-30): the first clause only - the warehouse clause is dropped and the receipt gains no row */
 /* User 2026-10-04: the first Run end whose settlement carries 점포 자본 across a Decoration's price (settleStoreCapital's `reach`) - the
    one place the 점포 자본 is explained, once: it can buy a Decoration, and how it builds up */
 end:[['capital','.p-end .settlement.reach','점포 자본으로 장식을 들일 수 있다. 점포 자본은 보유 골드와 별개로, 영업이 끝날 때 총매출의 일부가 쌓인다. 영업한 날이 길수록 그 비율이 오른다.']],
 closing:[['receipt','.tape .purse','영업 시작 골드와 보유 골드를 비교한다.']],
 /* USER 2026-09-24: the very first decision of a new store is the DAY 0 Store Support pick, and
    it used to open with no word of what a Store Support is. The mark reads the takeover and never
    names a pick; it runs on the DAY 0 takeover only (see showCoach); account-scoped like every mark.
    COACH DIET (User 2026-09-30): one mark - each card prints its effect and price, and the key and `점포지원 N / 7` say the rest */
 relic:[['relic-what','.relic-open','점포지원은 영업 내내 적용된다. 첫 지원은 무료, DAY 4까지 고를 수 있다.']]
};
let activeCoach=null;
let nightMarked=null;
let coachSettle=0,coachPainted=null,activeGroup=null;
/* PRESENTATION §Tutorial / coach target truth: clip the target to its visible scrollports. */
function coachBounds(el){const r=el.getBoundingClientRect();
 let left=Math.max(0,r.left),top=Math.max(0,r.top),right=Math.min(innerWidth,r.right),bottom=Math.min(innerHeight,r.bottom);
 for(let p=el.parentElement;p;p=p.parentElement){const css=getComputedStyle(p),x=/auto|scroll|hidden|clip/.test(css.overflowX),y=/auto|scroll|hidden|clip/.test(css.overflowY);
  if(css.display==='contents'||(!x&&!y))continue;const b=p.getBoundingClientRect();
  if(x){left=Math.max(left,b.left);right=Math.min(right,b.right);}if(y){top=Math.max(top,b.top);bottom=Math.min(bottom,b.bottom);
   const rail=p.classList.contains('board')&&p.querySelector(':scope > .board-rail');if(rail&&!rail.contains(el))top=Math.max(top,rail.getBoundingClientRect().bottom);}}
 return {left,top,right,bottom,width:Math.max(0,right-left),height:Math.max(0,bottom-top)};}
const coachKey=el=>{const r=coachBounds(el);
 return [Math.round(r.top),Math.round(r.left),Math.round(r.width),Math.round(r.height)].join(':');};
/* UI_UX §TUTORIAL: repaint the visible target without changing the active lesson. */
function paintCoach(step,target){
 const root=$('#coach-root');if(!root)return null;
 const hold=holdFocus(root),b=coachBounds(target);
 if(!b.width||!b.height){root.innerHTML='';return coachKey(target);}
 const left=Math.max(4,b.left-4),top=Math.max(4,b.top-4),width=Math.max(0,Math.min(innerWidth-4,b.right+4)-left);
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
 const height=target.closest('.p-sale')?Math.min(floor,b.bottom+4)-top
  :Math.min(b.bottom+4-top,Math.max(Math.round(innerHeight*.34),room)),bottom=top+height;
 /* User 2026-10-01: the bubble takes the width its words need, up to the screen (560 px on a desk), so a line that fits
    is one line and the bubble grows only by the lines it needs; bw is the cap, the real width is measured below */
 const bw=Math.min(560,innerWidth-24),bh=210,x=Math.max(12,Math.min(innerWidth-bw-12,left)),y=bottom+bh+12<floor?bottom+12:Math.max(12,top-bh-12);
 const block=(l,t,w,h)=>'<div class="coach-block" style="left:'+l+'px;top:'+t+'px;width:'+Math.max(0,w)+'px;height:'+Math.max(0,h)+'px"></div>';
 root.innerHTML='<div class="coach-layer'+(modal==='relics'?' over-takeover':'')+'">'+block(0,0,innerWidth,top)+block(0,bottom,innerWidth,innerHeight-bottom)+block(0,top,left,height)+block(left+width,top,innerWidth-left-width,height)+'<div class="coach-focus" style="left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px"></div><section class="coach-bubble" role="dialog" aria-label="점주 안내" style="left:'+x+'px;top:'+y+'px;width:max-content;min-width:'+Math.min(260,bw)+'px;max-width:'+bw+'px"><small>점주 안내</small><p>'+step[2]+'</p><div>'+btn('안내 건너뛰기','coach-skip','coach-skip')+btn(step[3]?'눌러서 살펴보기':'다음','coach-next','stamp')+'</div></section></div>';
 /* `bh` above is only the estimate that keeps the first paint from flashing. A real bubble is
    120-143px, not 210, so a mark placed ABOVE its target sat up to 106px clear of the cutout
    and the copy stopped reading as belonging to the thing it points at. Re-seat it on its own
    measured height, which is why this is a style write and not a second paint. */
 const bub=root.querySelector('.coach-bubble');sentenceBreaks(bub);
 if(bub){const real=bub.getBoundingClientRect().height,rw=bub.getBoundingClientRect().width;
  bub.style.left=Math.max(12,Math.min(innerWidth-rw-12,left))+'px';
  bub.style.top=(bottom+real+12<floor?bottom+12:Math.max(12,top-real-12))+'px';}
 restoreFocus(root,hold);
 return coachKey(target);
}
/* UI_UX §TUTORIAL: track geometry while moving, then sleep until scroll or resize. */
function settleCoach(step,target){
 cancelAnimationFrame(coachSettle);let last=null,still=0,frames=0;
 const tick=()=>{
  if(activeCoach!==step||!target.isConnected)return;
  const key=coachKey(target);
  if(key!==coachPainted)coachPainted=paintCoach(step,target);
  if(key===last)still++;else{last=key;still=0;}
  if(still<2&&++frames<48)coachSettle=requestAnimationFrame(tick);
 };
 coachSettle=requestAnimationFrame(tick);
}
function showCoach(){
 const root=$('#coach-root');if(!root)return;root.innerHTML='';activeCoach=null;
 cancelAnimationFrame(coachSettle);
 const tutorial=game.account.tutorial||{};
 /* UI_UX §FIRST-EVER FINAL EXPEDITION COACH: only the D0 / D30 support takeovers admit a coach. */
 const relicD0=modal==='relics'&&game.run?.phase==='foundation';
 const s=game.run,relicD30=modal==='relics'&&s?.phase==='final'&&s.day===30&&s.relicWindow?.milestoneDay===30;
 if(tutorial.skipped||(modal&&!relicD0&&!relicD30)||bossHold)return;
 const finalGroup=s?.finalCommitted?'final':finalIsOrdering(s)?'finalOrder':'finalRoster';
 const steps=relicD0?coachSteps.relic:relicD30?coachSteps.finalRelic:s?.phase==='final'?coachSteps[finalGroup]:(coachSteps[s?.phase]||[]);activeGroup=steps;
 /* Anchor to a VISIBLE match, not the first one in the DOM. The SALE readout and its
    decision ingredients exist twice - a desktop copy and a phone copy, one of which is always
    display:none - so `$()` handed the coach the hidden one on a phone and those lessons never
    appeared there. */
 const visible=sel=>[...document.querySelectorAll(sel)].find(e=>e.getClientRects().length);
 const day=game.run?.day||0,nightDone=game.run?.phase==='night'&&nightMarked?.[0]===game.run&&nightMarked[1]===day;
 /* x[4] = the first DAY a mark may show; a NIGHT mark waits once one has been told this night */
 const step=steps.find(x=>!tutorial['coach-'+x[0]]&&!(x[4]>day)&&!nightDone&&visible(x[1]));if(!step)return;
 const target=visible(step[1]);
 /* A target inside the phase's scroll area is judged against THAT area, not the window: the
    band above it (the SALE customer front, ~240px on a phone and ~400px on a desk) is a fixed
    flex item the scrolled column slides under, so a mark whose target had been scrolled beneath
    it measured as "visible" at y=195 and lit the band instead of the line it teaches
    (UI-Q-v28-27: automatic scroll must not leave the target behind a header). */
 const view=target.getBoundingClientRect(),scrollArea=[target.closest('.board'),target.closest('.stage-scroll'),target.closest('.dossier-col'),target.closest('.shelf-col')]
  .find(el=>el&&el.getBoundingClientRect().height>0),area=scrollArea?.getBoundingClientRect();
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
 if(skip)for(const x of activeGroup||[])t['coach-'+x[0]]=true;else{t['coach-'+activeCoach[0]]=true;if(game.run?.phase==='night')nightMarked=[game.run,game.run.day];}game.save();$('#coach-root').innerHTML='';activeCoach=null;requestAnimationFrame(showCoach);
}
document.addEventListener('scroll',()=>{if(!activeCoach)return;
 const target=[...document.querySelectorAll(activeCoach[1])].find(el=>el.getClientRects().length);
 if(target)settleCoach(activeCoach,target);},true);
window.addEventListener('resize',()=>{if(activeCoach)showCoach();});
function effectList(it,compact=false){const rows=Presentation.rows(it.effects,undefined,it.category);const html=r=>`<li class="${r.bad?'effect-bad':''}"><span>${E(r.label)}</span><b>${r.text}</b></li>`;return `<ul class="effects">${rows.slice(0,compact?4:rows.length).map(html).join('')}</ul>${compact&&rows.length>4?`<details><summary>전체 효과</summary><ul class="effects">${rows.slice(4).map(html).join('')}</ul></details>`:''}`;}
function traitRows(n){return `<div class="trait-list">${Presentation.traits(n).map(t=>{const tr=D.traitBy[t];return `<div class="trait-row"><b>${E(tr.name)}</b><span>${Presentation.traitEffects(t).map(r=>`<em class="tone-${r.tone}">${E(r.label+' '+r.text)}</em>`).join('')}${tr.note?`<em class="tone-cost">${E(tr.note)}</em>`:''}</span></div>`;}).join('')}</div>`;}
const rateTip=d=>{const rows=Presentation.hazardRows(Presentation.known(d,game),d).filter(h=>h.rate);return rows.length?tip(d.name,...rows.map(h=>h.name+' · '+h.rate)).replace('class="tip"','class="tip rate-tip"'):'';};
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
  /* UI_UX §SALE destination plate (User 2026-10-03): on a phone the `{능력치} n당 대응 1 제공` lines of every row read in one `?`; from 900px they are the row's own ` · ` tail */
  +rateTip(d)
  +'</div>'
  +hazardList(Presentation.known(d,game),null,d)
 +'</div></div>';}
// UI_UX §FINAL MODIFIER PREVIEW: read the same snapshots as resolution, without changing preparation.
function statDisplay(n){const s=game.run,i=s.phase==='final'&&s.finalCommitted?s.team.indexOf(n.id):-1;
 if(i<0)return Dungeon.prepare({...n,traits:Presentation.traits(n)},game.claimedGateFor(n),s.facilities);
 const t=game.finalPreRoll(),prep=t.preparations[i],boss=game.finalSnapshot(t.team[i],prep,t.d,t.context),values=t.snapshots[i];
 const sources=Object.fromEntries(Adventurer.keys.map(k=>[k,[...(prep.sources?.[k]||[])]]));
 for(const k of Adventurer.keys){
  if(boss[k]!==prep.effects[k])sources[k].push({name:Copy.boss.d15.trait[s.bossId][0],v:boss[k]-prep.effects[k]});
  if(values[k]!==boss[k])sources[k].push({name:D.decorationBy.cheerBanner.name,v:values[k]-boss[k]});
 }
 return {...prep,effects:values,sources,beforeEffects:prep.effects};
}
function statGrid(n){
   const prep = statDisplay(n);
   const values = prep.effects;
   /* v2.9.0 (User 2026-09-24, UI_UX §STAT PRESENTATION): under a Stat this customer's Gate
      presses, a small tag with the pressing Hazard name(s) - the one place the grid links to
      the Gate. No number, no verdict; 투력 is never pressed. */
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
    const before = prep.beforeEffects?.[k], applied = before!==undefined&&before!==values[k];
    const delta = values[k]-(applied?before:n.stats[k]), moved = delta!==0;
    const sense = !moved ? '' : delta>0 ? 'up' : 'down';
    /* the prepared snapshot returns its provenance as prep.sources - `prep.effects.sources`
       never existed, which is why the old `?` opened on nothing. Nothing is recomputed here. */
    const list = moved ? (prep.sources?.[k] || []) : [];
    const label = Presentation.labels[k];
    const face = '<label>'+label+'</label><strong>'+(applied?Presentation.stat(before,true)+' → ':'')+Presentation.stat(values[k],moved)+'</strong>';
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
/* the warehouse as a rack of 칸 (User 2026-09-29): one cell per slot the store has, each held unit in its own cell - the
   same `N / M칸` the ledger counts - grouped by Item in the order the shelf reads them, with its days left; the empty cells
   are the room left. The icon is the one the offer rows show; the Item's name is the cell's reader label. */
/* User 2026-10-01: on a phone only the held units are drawn, so the sheet is as many rows as they need (one while they fit) and
   the room left reads in the head's `N / M칸`; the desk column has the room, so it shows every 칸 with the empty ones (`full`) */
/* CORE_RUN §FIRST-RUN LESSONS (User 2026-10-02): the first Run's 구급키트 from HQ - on the first Day someone injured comes - is
   told once that Day: the ORDER `kit` mark sits on its cell (desk) or the 창고 handle (phone, where the sheet starts folded).
   A save from before `lessonKitDay` had the lesson on DAY 3. */
const lessonKit=()=>{const s=game.run;return !!(s?.firstRun&&s.lessonInjured&&(s.lessonKitDay??3)===s.day);};
function stockSlots(full=false){const s=game.run,cap=game.capacity(),order=shelfOrder(groupStock()).map(g=>g.item),units=[];let kit=lessonKit();
 for(const item of order)units.push(...s.inventory.filter(x=>x.item===item).sort((a,b)=>(a.expires??99)-(b.expires??99)));
 return '<ol class="wh-slots">'+units.map((st,i)=>{const it=D.itemBy[st.item],left=st.expires===null?null:st.expires-s.day,
   label=E(it.name)+(left===null?'':' · '+left+'일');
   /* User 2026-10-02: a cell is a tip - a tap (a hover on desk) shows what the Item does, in the floating #wh-pop (whPop) */
   const mark=kit&&it.id==='kit'?(kit=false,' lesson-kit'):'';
   return '<li class="wh-slot'+mark+'" data-item="'+it.id+'"><details class="tip wh-tip" name="wh-tip"><summary aria-label="'+label+'">'+Art.itemIcon(it.id,32)
    +(left===null?'':'<em'+(left<=1?' class="soon"':'')+'>'+left+'일</em>')+'</summary></details></li>';}).join('')
  +(full?'<li class="wh-slot empty" aria-hidden="true"></li>'.repeat(Math.max(0,cap-units.length)):'')+'</ol>';}
/* UI_UX §ORDER — WAREHOUSE PANEL (User 2026-09-29): the warehouse is not on the 발주서 any more; it is held apart like an
   inventory, so it can be read against the offer rows while ordering. Desk: a large column beside the form, always open.
   Phone: a slim handle on top of the dock - part of the dock, so it never covers an offer row - stating 창고 N / M칸 · K종,
   that opens the list as a sheet rising from it, up to 45% of the screen. The sheet does not dim or lock the form - the
   rows above it still scroll and take taps - and only the handle or Escape closes it (a quantity tap must not). Open or
   folded is still the account's presentation choice (UI-Q-v29-17, `stockBriefOpen`): it starts folded and stays as the
   player last left it. A steel rack of 칸, apart from the brown floating box and the 발주서's paper. */
/* UI_UX §TUTORIAL — COACH DIET (User 2026-09-30): the retired 창고 mark's one fact - on DAY 1, before anything is ordered, the
   warehouse holds only what HQ put there, and the head says so */
function stockHead(){const s=game.run,n=groupStock().length,hq=s.day===1&&!(s.daily?.spent>0);
 return '<i>창고</i><b>'+s.inventory.length+' / '+game.capacity()+'칸</b>'+(n?'<em>'+(hq?'본사 기본 상품 ':'')+n+'종</em>':'');}
function stockSide(){return '<aside class="stock-side" aria-label="창고"><p class="stock-head">'+stockHead()+'</p>'+stockSlots(true)+'</aside>';}
const sheetOpen=()=>game.account.settings.stockBriefOpen===true;
function stockSheetKey(){const open=sheetOpen();
 return '<section class="stock-sheet" id="stock-sheet" aria-label="창고"'+(open?'':' hidden')+'>'+stockSlots()+'</section>'
  +'<button type="button" class="stock-handle stock-head'+(lessonKit()?' lesson-kit':'')+'" data-action="stock-sheet" aria-controls="stock-sheet" aria-expanded="'+open+'">'
  +stockHead()+'<span class="stock-toggle">'+(open?'닫기':'열기')+'</span></button>';}
function setStockSheet(open){const st=game.account.settings;if((st.stockBriefOpen===true)!==open){st.stockBriefOpen=open;game.save();}
 const sh=$('#stock-sheet'),k=$('.stock-handle');if(!sh)return;sh.hidden=!open;
 k?.setAttribute('aria-expanded',String(open));const t=k?.querySelector('.stock-toggle');if(t)t.textContent=open?'닫기':'열기';}
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
 return stage('order','발주',taskLine('order'),'<div class="order-desk">'+orderForm()+'</div>'+stockSide(),
  stockSheetKey()+(cart?'<button class="stamp" data-action="confirm-order">발주 '+fmt(cart)+'G · 확정</button>':'')
  +'<button class="stamp leave" data-action="open-store" '+(cart?'disabled':'')+'>영업 시작</button>');
}
/* v2.9.0 (ECONOMY_ORDER §VISITOR FORECAST, User 2026-09-24): with two or more open Gates the ORDER 오늘 line carries the
   visitor count per Gate, by the destination each customer claims (a liar's or a rerouted customer's true Gate stays
   hidden). Counts only: no name, Job, Trait, Wallet or individual destination leaves this helper. */
function gateCounts(){const s=game.run,c=new Map();for(const id of s.queue){const n=s.npcs.find(x=>x.id===id),g=game.claimedGateFor(n);if(g)c.set(g.id,(c.get(g.id)||0)+1);}return c;}
/* today's visitors and where they claim to go - one owner for the 오늘 block and its floating copy */
/* User 2026-10-04: the Gates read as their Hazards - `부식I 3명` (name and Tier set tight, then the visitors) - so what is bought
   against is what is counted. `전체 N명` leads, stronger, in a column of its own; the Hazards run beside it and, when the line
   runs out, wrap under the first Hazard rather than under the total. Each reading is one unbreakable chip; a Tier II-III Gate's
   two Hazards sit side by side, both carrying the Gate's one count; a closed Gate comes last. */
function todayLine(counts,tag='em'){const s=game.run,hz=d=>d.hazards.map(h=>E(D.hazards[h])+['','I','II','III'][d.tier||1]),
 chips=s.dungeons.flatMap(d=>hz(d).map(t=>'<span class="tl">'+t+(counts?' '+(counts.get(d.id)||0)+'명':'')+'</span>'))
  .concat((s.closedGates||[]).map(d=>'<span class="tl shut">'+hz(d).join(' · ')+' 오늘 폐쇄</span>'));
 return '<span class="tl-line"><'+tag+' class="tl-total">전체 '+s.queue.length+'명</'+tag+'><span class="tl-chips">'+chips.join('')+'</span></span>';}
/* v2.9.11 quick patch (User 2026-09-29): the ledger's 발주 후 line rides at the rail's foot the same way, once the
   ledger has gone under it. Each copy watches its own source (the ledger leaves before the 오늘 block does). A line
   joining or leaving changes the rail's height, so the watch is set again against the new edge - otherwise the 오늘 block
   could sit hidden under a grown rail without being counted as gone. What is shown is carried across the redraw a
   quantity tap makes (`railShown`), so the rail does not blink on every tap. */
function watchOrderToday(){orderWatch?.disconnect();orderWatch=null;
 const rail=$('.p-order .death-limit-row'),brief=$('.p-order .form .brief'),out=$('.p-order #order-register .out'),sc=$('.p-order .stage-scroll');
 if(!rail||!brief||!sc||typeof IntersectionObserver!=='function')return;
 /* the stuck rail sits under the scroll box's top padding, so its lower edge is that padding plus its own height */
 const h=rail.offsetHeight,edge=(parseFloat(getComputedStyle(sc).paddingTop)||0)+h;
 orderWatch=new IntersectionObserver(es=>{for(const e of es){const gone=!e.isIntersecting&&e.boundingClientRect.top<(e.rootBounds?.top??0)+edge;
   rail.classList.toggle(e.target===brief?'show-today':'show-gold',gone);}
  railShown=['show-today','show-gold'].filter(c=>rail.classList.contains(c)).map(c=>' '+c).join('');
  if(rail.offsetHeight!==h)watchOrderToday();},
  {root:sc,rootMargin:'-'+edge+'px 0px 0px 0px',threshold:0});
 orderWatch.observe(brief);if(out)orderWatch.observe(out);}
function orderOffer(s,o,i){const it=D.itemBy[o.item],q=s.cart?.[i]||0,lim=game.quantityLimit(i),max=lim.max,rows=Presentation.rows(it.effects,undefined,it.category).slice(0,3);
    /* UI_UX §ORDER quantity interaction (User 2026-09-24): a control the cap blocks is dim but answers a tap with the reason (§3-9) */
    const block=' aria-disabled="true" data-reason="'+lim.reason+'" data-lack="'+Math.max(0,Math.ceil(lim.lack))+'"';
    const sl = game.stockLife(it); /* ITEM §SHELF LIFE — EXACT (v2.9.0): every Item expires */
    /* data-offer is the row's handle across a redraw: the qty controls inside it flip
       between enabled and disabled as the quantity hits 0 or the cap, so the pressed
       button is not a stable anchor but its row is. */
    /* v2.9.10 (User 2026-09-27): an offer whose whole supply was already ordered today reads as sold out - a quiet
       stamp where the quantity controls were and the paper a shade worked - so it is not tapped again for more */
    const out=o.quantity<=0;
    return '<li class="line r'+it.rarity+(q?' on':'')+(out?' soldout':'')+'" data-offer="'+i+'">'
    +'<span class="no">'+String(i+1).padStart(2,'0')+'</span>'
    +Scene.crate(Art.itemIcon(it.id,30),46)
    +'<span class="col">'
     /* UI_UX §ORDER — ITEM INFORMATION HIERARCHY (User 2026-09-26, v2.9.6, COPY_AUDIT §4-26): the tag is what 발주 spends, labelled;
         the sale price is the smaller muted tag under it; floated so the name, rarity and effects wrap beside it */
     +'<span class="prices">'+(o.origin==='dawnRecovery'||o.origin==='coldcase'?'<i class="offer-source">'+(o.origin==='dawnRecovery'?'새벽 회수':'포션 계약')+'</i>':'')+Scene.priceTag('<small>매입</small>'+o.price+'<i>G</i>')+Scene.priceTag('<small>판매</small>'+it.sell+'<i>G</i>','sell')
      /* EVENT §02 본사 1+1 행사 (User 2026-09-28, v2.9.10 quick patch): the promoted offer wears a red 1+1 sticker on its
         매입 tag, as a store shelf does - it was a `· 1+1` fragment inside the muted metadata line and went unseen */
      +(o.promo?'<em class="promo-sticker" aria-label="1+1 행사">1+1</em>':'')+'</span>'
     /* SA-Q19 / EVENT_v2.8 §암시장 상인: the Event-origin row says where it came from, beside
        the name where the Player reads it. Only a row carrying that provenance is marked - an
        ordinary offer has no origin and no source label, so this stays special-offer
        presentation rather than a generic rarity-attribution UI. */
     +'<span class="nm"><b>'+E(it.name)+'</b>'+(o.origin==='blackmarket'?'<i class="origin">암시장</i>':'')+'</span>'
     /* UI_UX §ORDER ITEM INFORMATION HIERARCHY (User 2026-09-24, v2.9.0): the rarity name as one small identity line, not a role chip */
     +'<span class="kind">'+E(itemKind(it))+' · <i class="rar r'+it.rarity+'">'+E(D.rarities[it.rarity])+'</i></span>'
     /* UI-Q39: `야외채집 · 마력 보강 / 주문 제작` is the internal taxonomy the catalogue is
        organised by, not something a player decides with - and it never reaches a render path.
        The data stays: ordering weights and Relic conditions read `category`. What the row
        needs is right underneath it, in the effects summary. */
       +'<span class="fx">'+rows.map(r=>'<i class="'+(r.bad?'cost':'')+'">'+E(r.label+' '+r.text)+'</i>').join('<em> · </em>')+'</span>'
     +'<span class="have">수익 +'+(it.sell-o.price)+'G · 재고 '+s.inventory.filter(st=>st.item===it.id).length+' · 공급 '+o.quantity+' · <i>유통기한 '+sl+'일</i></span>'
  +'</span>'
  +(out?'<span class="dial"><em class="soldout-mark">품절</em></span></li>':'<span class="dial">'+btn('-','qty','','data-index="'+i+'" data-q="'+Math.max(0,q-1)+'" aria-label="'+E(it.name)+' 수량 줄이기" '+(q?'':'disabled'))
   +'<output aria-label="'+E(it.name)+' 발주 수량">'+q+'</output>'
   +btn('+','qty','','data-index="'+i+'" data-q="'+(q+1)+'" aria-label="'+E(it.name)+' 수량 늘리기" '+(q>=max?block:''))
   +'<span class="set">'+[1,3].map(v=>btn(v,'qty','','data-index="'+i+'" data-q="'+v+'" aria-label="'+E(it.name)+' '+v+'개" '+(v>max?block:''))).join('')+btn('최대','qty','','data-index="'+i+'" data-q="'+max+'" '+(max?'':block))+'</span></span></li>');
}
function finalRiskSummary(d){const groups=(d.families||[]).map(id=>d.hazards.filter(h=>(D.familyTiers[id]?.[1]||[]).includes(h)));
 const other=d.hazards.filter(h=>!groups.some(g=>g.includes(h)));if(other.length)groups.push(other);
 return '<span class="final-risk-summary">'+groups.filter(g=>g.length).map(g=>'<span class="final-risk-family">'+g.map(h=>'<span class="tl" data-hazard="'+h+'">'+E(D.hazards[h])+' <strong>'+Presentation.hazardNeed(h,d)+'</strong></span>').join('')+'</span>').join('')+'</span>';
}
function orderForm(){const s=game.run,total=game.cartTotal(),after=s.money-total,price=game.rerollPrice();
 /* v2.9.0 ORDER today-fit emphasis (UI_UX §ORDER — ITEM INFORMATION HIERARCHY): the same rule as SALE, against today's Gates */
 /* User 2026-10-02: on a day an Event closed a Gate the one Gate left open also shows its count, beside the closed one */
 const isFinal=s.phase==='final',counts=s.dungeons.length>=2||(s.closedGates||[]).length?gateCounts():null;
 const today=isFinal?finalRiskSummary(s.dungeons[0]):todayLine(counts);
 return '<div class="clip"></div><div class="form">'
 /* UI_UX §ORNAMENT RESTRAINT, audited across the whole Player-facing UI: the letterhead's G24
    seal carried no function or state - it filled the head's right margin and nothing else. The
    document is identified by 발주서 and its DAY / branch line. */
 +'<div class="form-head"><h1>발주서</h1>'+(isFinal?btn('원정대 후보 보기','final-roster','look candidate-look'):'')+'<span class="docno">DAY '+String(s.day).padStart(2,'0')+' · '+E(s.branch)+'</span></div>'
   /* UI_UX §ORDER — FLOATING TODAY LINE (User 2026-09-25): the rail floats while the order is scrolled; once the
      `오늘` block has gone under it, the same line rides in the rail's own box under a rule, so the Gates and their
      visitors stay in view while the player orders. Hidden while the block itself is on screen. */
   /* v2.9.11 quick patch (User 2026-09-29): with the warehouse beside it the order rows can feel squeezed, so the whole box
      folds to a small `요약` chip and back - the Death line folds with it, by the User's call (§DEATH LIMIT — ALWAYS VISIBLE
      makes this one exception); folded is the account's choice, kept across Days and reloads until the player opens it */
   +'<p class="board-rail death-limit-row'+railShown+(railFolded()?' folded':'')+'">'
     +'<button type="button" class="rail-fold" data-action="rail-fold" aria-expanded="'+!railFolded()+'" aria-label="'+(railFolded()?'요약 열기':'요약 접기')+'">'
     +'<span class="rail-chip">요약</span></button>'
     +'<span class="rail-line">'+(isFinal?'<i>위험</i><b>'+today+'</b>':deathLimitItem(true))+'</span>'
     +(isFinal?'':'<span class="rail-line rail-today" aria-hidden="true"><i>오늘</i><b>'+today+'</b></span>')
     +'<span class="rail-line rail-gold'+(after<0?' short':'')+'" aria-hidden="true"><i>발주 후</i><b>'+fmt(after)+'G</b></span></p>'
   +'<div class="ledger" id="order-register" aria-label="발주 대금">'
   +'<div><span>운영비(예상)</span><b>'+fmt(game.expectedOperatingCost())+'</b></div>'
   +'<div><span>창고 잔여 칸</span><b style="font-size:16px">'+(game.capacity()-s.inventory.length)+' / '+game.capacity()+'</b></div>'
   +'<div><span>보유 골드</span><b>'+fmt(s.money)+'</b></div>'
   +'<div class="pick"><span>발주 금액</span><b>'+(total?'-'+fmt(total):'0')+'</b></div>'
   +'<div class="out'+(after<0?' short':'')+'"><span>발주 후</span><b>'+fmt(after)+'<i>G</i></b></div></div>'
   +'<div class="ref-row"><button class="look" data-action="gates">위험 보기</button>'+relicRef()+'</div>'
   // today only: who is coming and where (no next-day block, User 2026-09-24)
   +'<div class="brief"><div class="when"><span class="k">'+(isFinal?'위험':'오늘')+'</span>'
     +'<p>'+(isFinal?today:todayLine(counts,'b'))+'</p></div></div>'
   /* FINAL_EXPEDITION_v2.7 §D25: from D25 the Final's Family Pair and Hazard Pool are known,
      so they sit with the other planning signals on ORDER rather than arriving on D30. It is
      the persisted state itself - D30 reads the same object, and a reload cannot reroll it. */
   +(s.final&&!isFinal?'<div class="brief"><div class="when"><span class="k">마왕성</span>'
     +'<p><b>'+E(s.final.familyNames.join(' / '))+'</b></p>'
     +'<ul class="hazards">'+Presentation.hazardRows(s.final.hazards,s.final).map(h=>
       '<li data-hazard="'+h.key+'"><b>'+E(h.name)+'</b>'+pressCell(h)+'</li>').join('')
     +'</ul></div></div>':'')
   +'<ol class="lines">'+s.offers.map((o,i)=>orderOffer(s,o,i)).join('')+'</ol>'
 +'<button class="rubber" data-action="reroll" '+(s.event?.effects.noReroll?'aria-disabled="true" data-reason="noReroll"':price>s.money?'aria-disabled="true" data-reason="money" data-lack="'+(price-s.money)+'"':'')+'>'+REROLL_ICON+'발주 후보 교환 · '+fmt(price)+'G'+(price?'':' · 발주 교환권')+'</button>'

 +'</div>';}
/* v2.9.10 (User 2026-09-27): every Item names its category (음식 / 음료 / 포션 / 야외장비 / 보험), the words the Events and
   the Store Supports already speak in (`음식·음료`, `보험`, `야외장비`) - without it a first Run cannot tell which Items they
   mean. The role taxonomy stays hidden. */
const itemKind=it=>D.categories[it.category]||'';
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
/* UI_UX §SALE — SHELF ORDER (User 2026-09-26, v2.9.7): 대응 장비 -> 음식 -> 음료 -> 포션 -> 보험 -> 특수 - the player
   looks for a Gate's Counter first; inside a kind the nearest discard first, then the higher Rarity. The discard day an
   Item is sorted by is the one it showed when the Day's shelf first appeared, so selling out a batch never moves a row
   mid-Day (the v2.9.0 order did: an Item jumped down when its oldest units sold); a row only leaves when it sells out,
   and the next Day sorts afresh. */
const SHELF_KIND=['gear','food','drink','potion','insurance','special'];let shelfHeld={key:null,at:{}};
/* the Hazards of today's open Gates, in Gate order - what an Item is first sorted by (User 2026-10-04) */
const todayHazards=()=>[...new Set(game.run.dungeons.flatMap(d=>d.hazards))];
function shelfOrder(stocks,byHazard=true){const s=game.run,key=s.seed+':'+s.day+':'+s.phase,hz=byHazard?todayHazards():[];
 if(shelfHeld.key!==key)shelfHeld={key,at:{}};const at=shelfHeld.at;
 for(const st of stocks)if(!(st.item in at))at[st.item]=st.expires;
 const rank=st=>{const it=D.itemBy[st.item],c=Object.keys(it.effects).map(k=>hz.indexOf(k)).filter(i=>i>=0);
  return [c.length?Math.min(...c):hz.length,SHELF_KIND.indexOf(it.category),at[st.item],-it.rarity];};
 return stocks.slice().sort((a,b)=>{const x=rank(a),y=rank(b);return x[0]-y[0]||x[1]-y[1]||x[2]-y[2]||x[3]-y[3];});}
function shelf(isFinal=false){
   const s=game.run,stocks=groupStock(),n=isFinal?s.npcs.find(x=>x.id===supplyNPC):game.current(),st=s.inventory.find(x=>x.id===selected);
   /* SALE §MATCHING-EFFECT EMPHASIS — RETIRED (User 2026-09-24, v2.9.0): every effect text keeps the default
      style whatever the customer's Gate; the row states what the Item does, in its fixed category order. */
   const effectText=r=>E(r.label+' '+r.text);
   return '<section class="shelf">'
   +'<div class="shelf-head"><h2>'+(isFinal?(n?E(n.name)+'에게 보급':'대원에게 보급'):'진열대')+'</h2>'+(isFinal?'<span>'+stocks.length+'종 · '+s.inventory.length+'개</span>':'')
   +(isFinal?'':relicRef())+'</div><div class="goods">'
 /* UI_UX §SALE — SHELF ORDER (User 2026-09-26, v2.9.7): by kind, then nearest discard, then higher Rarity,
    held for the Day (shelfOrder); the same for every customer; each row carries `폐기 N일`, emphasized at 1 day or less. */
 +shelfOrder(stocks,!isFinal).map(st=>{const it=D.itemBy[st.item],open=selected===st.id,kind=itemKind(it),noop=isFinal&&game.finalNoEffect(it.id),left=st.expires-s.day;
  /* FINAL_EXPEDITION §3: in the Final the shelf states the Final price, and an Item with no
     Final effect says so on its row before it is even opened. */
  return '<button class="good r'+it.rarity+(open?' open':'')+(noop?' final-noop':'')+'" data-action="select" data-id="'+st.id+'" '+(isFinal?'aria-expanded':'aria-pressed')+'="'+open+'">'
  +'<span class="tile">'+Art.itemIcon(it.id,32)+'</span><span class="what"><b>'+E(it.name)+(kind?'<i class="item-kind">'+E(kind)+'</i>':'')+'</b>'+(noop?'<span><em class="noop">'+E(Copy.finalPrep.noEffect)+'</em></span>':shelfEffects(Presentation.rows(isFinal&&n?finalItemEffects(n,it):it.effects,undefined,it.category)))+'</span>'
  +'<span class="price"><b>'+(isFinal?game.finalPrice(it.id):it.sell)+(isFinal?'G':'<span class="price-unit">G</span>')+'</b><span>재고 '+st.count+'</span><em class="expiry'+(left<=1?' soon':'')+'">'+lastSaleDay(left)+'</em></span></button>'+(open&&isFinal?till():'');}).join('')
 +'</div>'+(stocks.length?'':'<p class="muted">진열대가 비었다.</p>')+'</section>';}
/* ITEM §PRESENTATION ORDER / UI_UX §SALE (User 2026-09-25): the shelf row states EVERY effect line, like the ORDER row
   and the codex - it used to stop at two, so a third effect (불룡볶음면's 냉기 대응) only appeared on the tray. The row
   keeps one effect line: a longer line takes one or two type steps down instead of wrapping or being cut. */
/* User 2026-09-25: the two utility Items read their core on the shelf only - the approved line's own words, the
   condition in brackets left to the tray's 특수 효과 and the codex, which keep the full line */
const SHELF_CORE={aftercare:'중상 → 부상 · 부상 → 무사',duplicate:'다음 소모품 효과 2회'};
function shelfEffects(rows){const t=rows.map(r=>SHELF_CORE[r.key]||(r.utility?r.label.replace(/ \([^)]*\)$/,''):(r.label+' '+r.text).trim())).join(' · '),len=[...t].length;
 return '<span'+(len>28?' class="densest"':len>24?' class="dense"':len>19?' class="tight"':'')+'>'+E(t)+'</span>';}
const PRICE_ROLE={half:'할인 50%',full:'정가',overcharge:'바가지 150%'};
/* the three price keys of an ordinary sale - one owner for the tray (SALE) and the FINAL panel's twin */
function priceKeys(n,it,st){const full=n.pack.length>=Adventurer.slots(n);
 return ['half','full','overcharge'].map(mode=>{const q=game.interest(n,it,mode),pct=Math.round(D.pricing[mode].mult*100),role=PRICE_ROLE[mode];
   /* SALE §SAME-ITEM REFUSAL PRICE CEILING: the reason a price is closed stays readable - 오늘 거절됨 for the refused price,
      더 싼 값을 거절함 for one closed by a refusal at a LOWER price, 바가지를 거절함 for one closed by a refused 바가지. */
   const said=(n.refusalReasons||[]).filter(x=>x.item===it.id);
   const ceiling=said.some(x=>D.pricing[x.mode].mult<D.pricing[mode].mult),overRefused=!said.some(x=>x.mode===mode)&&said.some(x=>x.mode==='overcharge');
   const blocked=mode==='overcharge'&&game.run.event?.effects.noOvercharge?'오늘 가격 단속'
    :q.debit>spendable(n)?'손님 소지금 부족'
    :n.refused.includes(it.id+':'+mode)?(ceiling?'더 싼 값을 거절함':overRefused?'바가지를 거절함':'오늘 거절됨')
    :full?'가방 가득':'';
   /* v2.9.0 PRICE ROLE WORDS (COPY_AUDIT §4-19): the face reads 할인 50% · 35G / 정가 · 70G /
      바가지 150% · 105G, the sub-line 이익 NG or the reason a price is closed. Three modes, no
      extra depth; `pct` stays the mode's number, the word is what the coach already says. */
   /* `refused`: the first 바가지 refusal's lesson anchors here (UI_UX §SALE PRICE LESSONS) */
   const face=game.run.phase==='sell'?'<em class="price-role"><span>'+role.split(' ')[0]+'</span>'+(mode==='full'?'':' <span class="price-rate">'+pct+'%</span>')+'</em>':'<em>'+role+'</em>';
   return btn(face+'<strong>'+q.price+'<span class="price-unit">G</span></strong><small'+(blocked?' class="price-block"':'')+'>'+(blocked||'이익 '+(q.price-st.cost)+'G')+'</small>','sell',[mode==='full'?'stamp':'',blocked==='오늘 거절됨'?'refused':''].filter(Boolean).join(' '),
    'data-mode="'+mode+'" aria-label="'+role+' · '+q.price+'G'+(blocked?' · '+blocked:'')+'" '+(blocked?'disabled':''));}).join('');}
/* v2.9.0 SALE — COUNTER TRAY (User 2026-09-24): the chosen Item sits on a fixed tray above the dock,
   outside the scrolled column - header line, the one delta list on one wrapping line, 특수 효과, then
   the three price keys always in the same place. The shelf rows never change height. A sale clears
   the tray (the Item went into the Bag, and the hand-over starts from the tray icon); a refusal keeps
   the Item here with the refused key locked. Same information as the old per-row panel, one place. */
/* v2.9.13 (User 2026-09-30, SALE §FROZEN OUTLOOK): on a Gate with two Hazards (T2 on) the sum of both gaps decides the
   environment, so one worst label hid which side is open. 환경 대응 then names each Hazard with its own state - the same
   frozen `outlook.hazards` rows, the same four labels and colours; still no number, threshold or Item pointer. A one-Hazard
   Gate reads the single label as before. */
/* UI_UX §SALE — ENVIRONMENT METER (User 2026-10-02): per Hazard of the customer's Gate, the Counter the expedition is judged
   on - the customer's own Stat share and Traits plus the committed Bag's Counters (Dungeon.prepare, the resolver's own
   number) - over the Gate's public need (`대응 N 필요`). Whole numbers, never below 0; no word, no colour by state, no
   breakdown. It moves when a sale commits; a selected, unsold Item moves only the tray. */
/* Gold by default, green only once the number reaches the need (User 2026-10-02) - the whole number against the rounded-up need,
   so green never shows before the resolver's own 충분. `pre`: the selected Item's preview, `6 → 16`, coloured the same way. */
function envMeter(p,d,pre=null){const whole=x=>Math.max(0,Math.floor(x+1e-9));
 return '<span class="env-list env-meter-list">'+p.hazards.map((h,i)=>{const need=Presentation.hazardNeed(h.key,d),now=whole(h.defense),
  then=pre?whole(pre.hazards[i].defense):null;
  return '<span class="env-row"><i>'+E(D.hazards[h.key])+'</i>'
  +'<b class="env-num'+(now>=need?' ok':'')+'">'+now+(then!==null&&then!==now?'<em>→</em><span class="pre'+(then>=need?' ok':'')+'">'+then+'</span>':'')
  +'<small>/'+need+'</small></b></span>';}).join('')+'</span>';}
function finalEnvironment(p,d){
 const groups=(d.families||[]).map(id=>({id,hazards:p.hazards.filter(h=>(D.familyTiers[id]?.[1]||[]).includes(h.key))}));
 const other=p.hazards.filter(h=>!groups.some(g=>g.hazards.includes(h)));
 if(other.length)groups.push({id:'',hazards:other});
 return groups.filter(g=>g.hazards.length).map(g=>'<span class="env-family" data-family="'+E(g.id)+'"'+(g.id?' aria-label="'+E(D.dungeonBy[g.id].name)+'"':'')+'>'+envMeter({hazards:g.hazards},d)+'</span>').join('');
}
function envReading(o){const b=l=>'<b class="env-'+(['취약','불안'].includes(l)?'lack':'ok')+'">'+E(l)+'</b>';
 return o.hazards.length>1?'<span class="env-list">'+o.hazards.map(h=>'<span class="env-row"><i>'+E(D.hazards[h.key])+'</i>'+b(h.label)+'</span>').join('')+'</span>':b(o.worst);}
/* UI_UX §SALE — FORECAST PIN (User 2026-09-25, v2.9.0). On a phone the readout scrolls away with the dossier while
   the Player works the shelf, so the same two readings float at the top of the scrolled column, where the readout
   sat - only while the readout itself is off screen, the same frozen SALE-entry values and colours, never a second
   source. One tap folds it to a `전망` chip and back. The anchor has no height: it reserves nothing in the layout.
   v2.9.9 quick patch (User 2026-09-28): the readout's strain line rides along under the two readings - the same condition,
   words and number (an injured departure with a chain behind it); the folded chip stays `전망`. */
function forecastPin(n,extra=null){const o=n.outlook||game.outlookFor(n),streak=n.injury===1?Dungeon.injuredStreak(n.records):0,
 d=game.claimedGateFor(n),v={...n,traits:Presentation.traits(n),pack:n.pack},p=Dungeon.prepare(v,d,game.run.facilities),
 pre=extra&&n.pack.length<Adventurer.slots(n)?Dungeon.prepare({...v,pack:[...n.pack,extra]},d,game.run.facilities):null;
 return '<div class="forecast-pin-anchor"><button type="button" class="forecast-pin" data-action="forecast-pin" aria-expanded="true" aria-label="전망 접기">'
  /* User 2026-10-02: one strip, the boxes' short names - `전투` | `환경` - so a preview still fits at 360 */
  /* v2.9.14 quick patch (User 2026-10-02): the readout's chips - 연속 부상 출발, 대성공 기회 - ride at the bottom right of the strip,
     in the room the 환경 meter leaves, stacked when both show, never over the meter */
  +'<span class="pin-full"><span class="pin-fore pin-plate">전투<b>'+E(o.combat)+'</b></span>'+(p.hazards.length||streak>0||o.greatSignal?'<span class="pin-fore pin-plate env-meter">'+(p.hazards.length?'환경'+envMeter(p,d,pre):'')
   +(streak>0||o.greatSignal?'<span class="pin-tags">'+(streak>0?'<i class="st-tag">연속 부상 출발 '+streak+'회</i>':'')+(o.greatSignal?'<i class="gs-tag">'+E(Copy.great.tag)+'</i>':'')+'</span>':'')+'</span>':'')+'</span>'
  +'<span class="pin-chip">전망</span></button></div>';}
function syncForecastPin(){const pin=$('.forecast-pin');if(!pin)return;pin.classList.toggle('folded',pinFolded);
 pin.setAttribute('aria-expanded',String(!pinFolded));pin.setAttribute('aria-label',pinFolded?'전망 보기':'전망 접기');}
/* A redraw replaces the pin, and the observer only answers a frame later: for that frame the list's text sat where the pin
   belongs and the pin then popped over it on every tap. The same measure, taken at once, keeps the pin in place across the redraw. */
function pinNow(){const pin=$('.forecast-pin'),src=$('.readout.core-mob'),sc=$('.stage-scroll');if(!pin||!src||!sc)return;
 const r=src.getBoundingClientRect(),c=sc.getBoundingClientRect();pin.classList.toggle('show',!(r.bottom>=c.top&&r.top<=c.bottom));}
function watchForecastPin(){pinWatch?.disconnect();pinWatch=null;const pin=$('.forecast-pin'),src=$('.readout.core-mob'),sc=$('.stage-scroll');
 if(!pin||!src||!sc||typeof IntersectionObserver!=='function')return;syncForecastPin();
 /* the fold is for this stretch of scrolling only: once the readout is back on screen the next pin opens unfolded */
 pinNow();
 pinWatch=new IntersectionObserver(([e])=>{pin.classList.toggle('show',!e.isIntersecting);if(e.isIntersecting&&pinFolded){pinFolded=false;syncForecastPin();}},{root:sc,threshold:0});pinWatch.observe(src);}
function tray(){const s=game.run,n=game.current(),st=groupStock().find(x=>x.id===selected);
 /* the empty prompt is onboarding: DAY 1~3 while the account tutorial is not skipped (the same window as the
    task line); afterwards an empty tray has no height and the list gets the room back (User 2026-09-24) */
 if(!n||!st){trayFolded=false;const t=game.account.tutorial||{};return !t.skipped&&s.day>=1&&s.day<=3?'<div class="counter-tray empty" role="region" aria-label="계산대"><p class="tray-empty">상품을 누르면 계산대에 올라온다.</p></div>':'';}
 const it=D.itemBy[st.item],kind=itemKind(it);
 const moved=Presentation.preview(n,game.claimedGateFor(n),s.facilities,it.id);
 /* User 2026-09-25: the Item's own effects only (the retired `피로 A → 출발 B` line is not back). */
 /* User 2026-10-02 (UI_UX §SALE — ENVIRONMENT METER): a Hazard Counter row is this Item's own share, `공포 대응 +10` - the
    total it adds to lives in the 환경 대응 meter, so the tray no longer shows a running count starting from 0 */
 const parts=moved.direct.map(r=>'<b class="'+(r.bad?'effect-bad':'')+'">'
  +E(r.label)+' '+(r.key in D.hazards?(r.after-r.before>=0?'+':'')+Math.round(r.after-r.before)
   :Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after))+'</b>');
 const shown=new Set(moved.direct.map(r=>r.key)),rest=Presentation.rows(it.effects,undefined,it.category).filter(r=>!shown.has(r.key));
 /* A numberless utility's full condition is the useful explanation. Retain the no-change warning
    for an unapplied numeric effect; merely having a remaining effect is not sufficient to hide it. */
 const utilityOnly=!parts.length&&rest.length>0&&rest.every(r=>r.utility);
 const life=lastSaleDay(st.expires-s.day);
 return '<div class="counter-tray'+(trayFolded?' folded':'')+'" role="region" aria-label="계산대">'
  +'<button type="button" class="tray-unfold" data-action="tray-open" aria-expanded="'+!trayFolded+'" aria-label="계산대 열기"></button>'
  +'<div class="tray-item"><span class="tray-icon r'+it.rarity+'">'+Art.itemIcon(it.id,32)+'</span>'
  +'<span class="tray-what"><b>'+E(it.name)+(kind?'<i class="item-kind">'+E(kind)+'</i>':'')+'</b><span class="tray-stock"><span class="stock-base">'+it.sell+'G · </span><span class="stock-count">재고 '+st.count+'</span><span class="stock-sep"> · </span><span class="stock-life">'+life+'</span></span></span>'
  +'<span class="tray-who"><b>'+E(n.name)+'에게</b> · '+walletChip(n)+'</span></div>'
  +(utilityOnly?'':'<p class="tray-delta"><span class="delta-src">판매 후 변화</span>'+(parts.length?parts.join('<i> · </i>'):'<b>현재 준비 변화 없음</b>')+'</p>')
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
 const actions=isFinal?btn('<em class="price-role"><span>보급</span><span class="price-rate">50%</span></em><strong>'+finalPrice+'<span class="price-unit">G</span></strong><small>50%</small>','supply','final-supply-key',
    'aria-label="'+E(n.name)+'에게 보급 '+finalPrice+'G'+(finalBlock?' · '+finalBlock:'')+'" '+(finalBlock?'disabled':''))
 :priceKeys(n,it,st);
 const forwho='<p class="forwho"><span>'+E(n.name)+(isFinal?'에게 보급':'에게 판매')+'</span><b class="wallet" style="margin-left:auto">'+walletChip(n)+'</b></p>';
 /* a Final no-effect Item: the reason and the closed 보급, and no preview of an effect it will not have */
 /* FINAL: why a transfer is closed is the Item's status, said once beside it - never folded
    into the action's face, which stays 50% / price / 보급 in every state */
 const status=finalBlock?'<p class="final-status">'+(noop?'<b>'+E(Copy.finalPrep.noEffect)+'</b> '+E(Copy.finalPrep.noEffectWhy):E(finalBlock))+'</p>':'';
 if(noop)return '<div class="tillpanel'+(isFinal?' counter-tray final-till':'')+'">'+forwho+status+'<div class="tills">'+actions+'</div></div>';
 return '<div class="tillpanel'+(isFinal?' counter-tray final-till':'')+'">'+forwho
 +(isFinal&&s.bossId==='GLUTTONY'?'<p class="final-boss-note">'+E(Copy.boss.d15.trait.GLUTTONY[0])+' · '+E(traitLines('GLUTTONY')[0])+'</p>':'')
 /* SA-Q30: the rows are still grouped by what actually produced them internally - a Stat that
    rose because this Item's Supply relieved a Supply Deficit, or crossed a Fatigue band, is
    still never presented as if the Item itself granted that Stat - but the two group names
    that used to sit over them (이 상품이 직접 / 보급이 상태에 미치는 영향) were the analytical
    label stack v2.8 removes: one heading now covers the whole list. Since User 2026-09-25 the list
    holds the Item's own effects only - no derived row and no departure line are left under it. */
 +'<h4>'+(isFinal?'보급 후 변화':'판매 후 변화')+'</h4>'
 +(changes.length?'':'<ul class="effects"><li><span>현재 준비 변화 없음</span><b></b></li></ul>')
 +(changes.length?'<ul class="effects">'
   +changes.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+Presentation.amount(r.key,r.before)+' → '+Presentation.amount(r.key,r.after)+'</b></li>').join('')
   +'</ul>':'')
 /* SA-Q30: conditional non-delta Item truth - a Counter this customer does not need today, an
    Insurance that only fires on a bad outcome - is still stated plainly rather than folded
    away, under its approved v2.8 heading. */
 +(()=>{const shown=new Set(changes.map(r=>r.key));
   const rest=Presentation.rows(it.effects,undefined,it.category).filter(r=>!shown.has(r.key));
   if(!rest.length)return '';
   return '<p class="delta-src">특수 효과</p><ul class="effects">'
    +rest.map(r=>'<li class="'+(r.bad?'effect-bad':'')+'"><span>'+E(r.label)+'</span><b>'+E(r.text)+'</b></li>').join('')+'</ul>';})()
 +(isFinal?'':'<p class="smalltext">'+lastSaleDay(st.expires-s.day)+'</p>')
 +status+'<div class="tills">'+actions+'</div></div>';}
function eventReveal(){const e=game.run.event;if(!e)return '';return '<div class="event-reveal"><p class="effect"><i>효과</i><span>'+E(Presentation.eventDescription(e))+'</span></p><p class="flavor"><span>'+E(e.reveal)+'</span></p></div>';}
/* RELIC §GRADE: the 등급 word under the name, in the Item rarity name and colour */
const relicRarity=r=>'<span class="relic-rarity r'+r.rarity+'">'+E(D.rarities[r.rarity])+'</span>';
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
const ABANDON_BODY='<p>이번 점포에서 얻을 보상은 없다.<br>모험가·재고·골드·점포지원은 다음 점포로 이어지지 않는다.<br>본사 기록·점포 자본·보유 장식은 유지된다.</p>';
/* UI_UX §MENU — 이번 점포의 장식 (User 2026-09-24, v2.9.0): the Run's frozen loadout, read-only; an empty Slot reads 비어 있음 (COPY_AUDIT §1-7) */
function loadoutModal(){const lo=game.run?.loadout||{};
 return '<ul class="effects">'+D.decorationSlots.map(slot=>{const d=lo[slot]&&D.decorationBy[lo[slot]];
  return '<li class="deco-line'+(d?'':' empty')+'"><span>'+E(SLOT_COPY[slot]||slot)+'</span><b>'+(d?E(d.name):'비어 있음')+'</b>'+(d?'<p class="smalltext">'+E(d.effect)+'</p>':'')+'</li>';}).join('')+'</ul>';}
/* v2.9.10 quick patch (User 2026-09-28): on a SLOTH Run whose seals are revealed (the D15 Trait), the owned list says how
   many seals are broken - they took Store Support windows but hold no slot, so neither the 점포지원 N / 7 chip nor the list
   showed them. The chip itself stays as it is. */
function sealCount(){const s=game.run;if(s?.bossId!=='SLOTH'||!s.bossReveal?.traitSeen)return '';
 return '<p class="seal-count">슬로스 봉인 해제 <b>'+(s.sealBreakCount||0)+' / 3</b></p>';}
function relicsModal(){
   const owned=game.ownedRelics();
   if(!owned.length) return '<div class="owned-relics">'+sealCount()+'<p class="muted" style="padding:16px;text-align:center">보유한 점포지원이 없다.</p></div>';
   /* RELIC §QUICK VIEW STATUS LINE (User 2026-09-24, v2.9.0): one runtime line for a condition-type support, none otherwise */
   return '<div class="owned-relics">'+sealCount()+owned.map(r=>{const st=Relics.status(game,r.id);return '<article class="slip"><b>'+relicRarity(r)+E(r.name)+'</b><p>'+E(r.description)+'</p>'+(st?'<p class="status">'+E(st)+'</p>':'')+'</article>';}).join('')+'</div>';
  }
function relicTakeover(){const s=game.run,w=s.relicWindow;
 if(!w)return '<div class="relic-takeover" role="dialog" aria-modal="true" aria-label="점포지원"><div class="scroll"><div class="relic-open"><span class="label">점포지원</span><h2>지금 고를 지원이 없다</h2><p>다음 지원은 DAY 5·10·15·20·25·30에 도착한다.</p></div></div>'+closeX()+'</div>';
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
 +'<p>'+(first?(s.phase==='foundation'?'이번 점포에 쓸 지원 하나를 고르세요.':until+' 무료로 고를 수 있다.')
   :game.ownedRelics().length>=7?'점포지원 7개를 모두 들였다. 더 들일 자리가 없다.'
   :until+' 구매할 수 있다 · 보유 골드 '+fmt(s.money)+'G')+'</p></div>'
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
  /* COPY_AUDIT §11-31b (User 2026-10-02): a free card is chosen, not bought - its key reads 선택 under the 무료 price */
  const label=mine?'보유 중':spent?'선택 종료':poor?'골드 부족':price?'구매':'선택';
  return '<article class="relic-plate'+(mine?' owned':blocked?' unavailable':'')+'"><h3>'+relicRarity(r)+'<span>'+E(r.name)+'</span></h3><p>'+E(r.description)+'</p>'
  +'<span class="cost">'+(price?fmt(price)+'G':'무료')+'</span>'
  +btn(label,'buy-relic','stamp','data-id="'+id+'" '+(blocked?'disabled':''))+'</article>';}).join('')+'</div></div>'
 /* UI_UX §MENU (User 2026-09-24, v2.9.0): the DAY 0 choice has no way back (it may be deferred, User 2026-10-01) - the
    return button to the pre-Run screen is retired; Decorations are managed from 새 점포 준비, before a Run. */
 /* a window already spent (bought, or a Sloth seal broken) has nothing left to defer: it closes plainly */
 +sealChoice() +(w.purchased||w.consumedBySealBreak?closeX():'')+'<div class="close">'+(w.purchased||w.consumedBySealBreak?''
  /* RELIC §ACQUISITION WINDOWS D0 (User 2026-10-01): the free first pick may wait until DAY 4; on DAY 0 deferring opens DAY 1 */
  :first?btn('나중에 결정',s.phase==='foundation'?'defer-relic':'dismiss','stamp')
  :'<p>보류해도 후보와 가격은 그대로 남는다.</p>'+relicReroll()+btn('나중에 결정','dismiss','stamp'))+'</div></div>';}

/* RELIC §CANDIDATE REROLL (User 2026-10-02): a footer key beside 나중에 결정, the same rank and look, one line, while the window
   can still be bought from (never DAY 0). A short wallet greys it the way ORDER's 발주 후보 교환 does - the label keeps its one
   line and a tap says the cause and the shortfall (COPY_AUDIT §11-31c) */
function relicReroll(){if(!game.canRerollRelics())return '';const price=game.relicRerollPrice(),lack=price-game.run.money;
 return btn('후보 교환 · '+fmt(price)+'G','reroll-relics','stamp',lack>0?'aria-disabled="true" data-reason="relicMoney" data-lack="'+lack+'"':'');}
/* Sloth's seal is not a second choice path: it is the other thing this window's one
   acquisition can be spent on, so it sits beside the candidates and says as much.
   Shown only on a Run that is actually facing SLOTH, and only on an opportunity Day. */
/* v2.9.10 quick patch (User 2026-09-28): on a phone the seal panel sits under the list and hides the last candidate, so a
   tap on the panel itself - anywhere but its 봉인 해제 key - folds it to a chip, and the chip unfolds it. A window opens
   unfolded; the candidates never fold it. */
let sealFolded=false;
/* the small 접기 key at the plate's top right says the plate folds; the rest of the plate folds it too (User 2026-09-28) */
const SEAL_FOLD_KEY='<button class="seal-fold" data-action="seal-fold" aria-label="봉인 칸 접기">접기</button>';
function sealChoice(){const s=game.run,w=s.relicWindow;
 if(!w||!w.slothSealOpportunity)return '';
 const broken=s.sealBreakCount||0;
 if(sealFolded)return '<button class="seal-chip" data-action="seal-fold" aria-expanded="false">봉인 해제 '+broken+' / 3</button>';
 if(w.consumedBySealBreak)return '<div class="seal-choice done" data-action="seal-fold" aria-expanded="true">'+SEAL_FOLD_KEY+'<b>봉인 해제 '+broken+' / 3</b><p>이번 점포지원은 받지 않는다.</p></div>';
 return '<div class="seal-choice" data-action="seal-fold" aria-expanded="true">'+SEAL_FOLD_KEY+'<b>봉인 해제 '+broken+' / 3</b>'
  +'<p>점포지원을 받는 대신 봉인 하나를 풀 수 있다. 둘 중 하나만 고를 수 있다.</p>'
  +btn('봉인 해제','break-seal','stamp',game.canBreakSeal()?'':'disabled')+'</div>';}
/* The end of a store is a statement from head office, so it is printed on the same tape the
   player reads every night rather than announced on a landing banner. The English eyebrow,
   the hero headline and the loose row of numbers under it are gone: what closed the store is
   the first line, and the standing totals sit in the ledger where standing totals live. */
/* v2.9.2 H5 FINAL SEAL (UI_UX §FINAL RESULT — SEAL STAMP, PRESENTATION §GAME FEEL BEAT): one seal bearing the Boss's
   name on the tape of a Final ending - struck clean on a clear, faint and crooked on a failure. Never one per member
   (the party is 1~3) and never the NIGHT death tape: the Final verdict is the Run's, not a member's. The headline
   below says the result; the seal is aria-hidden and names nothing the Run has not already revealed. */
function finalSeal(){const s=game.run;if(!s.finalReport)return '';const b=D.bossBy[s.bossId];
 return '<span class="seal '+(s.win?'won':'lost')+'" aria-hidden="true"><b>'+E(b?.name||'')+'</b></span>';}
function endBanner(){const s=game.run,a=game.account;
 return '<div class="tape end-tape"><div class="tear top"></div><div class="print">'+finalSeal()
 +'<div class="head"><b>GUILD24</b><span>'+(s.win?'제0게이트 폐쇄':'점포 종료')+' · '+E(s.branch)+'</span></div>'
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
 /* UI_UX §END — REPLAY NUDGE (User 2026-09-26, v2.9.4): 본사 해금 lists everything this Run opened - the distinct-Boss
    unlocks Meta.finish credited and the D10 / D14 products the Run recorded as they opened. */
 const openedNames=[...(s.unlocked||[]),...(s.dayUnlocked||[])];
 const opened=openedNames.length
  ?'<div class="opened"><span>본사 해금</span><b>'+E(openedNames.join(' · '))+'</b></div>':'';
 /* UI_UX_v2.8 §RUN-END SETTLEMENT FEEDBACK. Read in the order it is computed:
    총매출 -> (도달일 비율) -> 얻은 점포 자본 -> 현재 점포 자본. Ending Gold and the
    remaining stock may appear elsewhere as Run results, but never as inputs to this - they are
    not inputs. Printed from the settlement the Run recorded, not recomputed here, so a reload
    shows the same figures and cannot appear to earn again. */
 const st=s.settlement;
 const settle=st?'<div class="block settlement'+(st.reach?' reach':'')+'"><h4>점포 자본 정산</h4>'
  +row('총매출',st.sales.toLocaleString()+'<i>G</i>')
  +row('DAY '+st.day+' 도달 비율','×'+Math.round(st.rate*100)+'%')
  +row('얻은 점포 자본','+'+st.gain.toLocaleString())
  +row('현재 점포 자본',st.capitalAfter.toLocaleString())+'</div>':'';
 const nudge=opened?'':replayLine();
 return '<div class="block">'+moved+row('지금까지 연 점포',a.runs)+'</div>'+runBlock(row)+settle+opened
  /* User 2026-09-30: what the Run left behind reads before the link to the codex, and reads as the point */
  +(nudge?'<p class="replay">'+E(nudge)+'</p>':'')
  +(moved||opened||settle?btn('도감에서 보기','codex','bare'):'');}
/* UI_UX §END — REPLAY NUDGE: when the Run opened nothing, at most one fact it left behind - the settlement crossed the price
   of a Decoration the account did not own at that settlement (judged once, in settleStoreCapital), else a new best Day
   (META §BEST DAY) - else nothing. Both are recorded on the Run, so a reload or a purchase from the ending prints the same
   line. Never names a Decoration (two per Slot). */
/* UI_UX §END — THIS RUN BLOCK (User 2026-09-30, A안): what kind of store this Run was, read off what the Run already holds -
   no save field. The lost are a number (the notebook lists their names); a Run with no expedition prints no 원정 row. */
function runBlock(row){const s=game.run,met=s.npcs.filter(n=>n.introduced),recs=s.npcs.flatMap(n=>n.records||[]);
 const top=met.reduce((b,n)=>!b||n.level>b.level||(n.level===b.level&&n.loyalty>b.loyalty)?n:b,null);
 return '<div class="block this-run"><h4>이 점포의 기록</h4>'
  +row('버틴 날','DAY '+s.day)
  +row('손님',met.length+' · 단골 '+(s.stats.regulars||0))
  +row('돌아오지 못한 사람',s.stats.deaths||0)
  +(top?row('가장 성장한 손님',E(top.name)+' Lv.'+top.level):'')
  +(recs.length?row('원정',recs.length+'건 · 대성공 '+recs.filter(r=>r.outcome==='대성공').length):'')+'</div>';}
function replayLine(){const s=game.run,st=s.settlement;
 if(st?.reach)return '점포 자본으로 새 장식을 들일 수 있다.';
 if(s.bestBefore>0&&s.day>s.bestBefore)return '지금까지 가장 오래 버틴 점포다 · DAY '+s.day;
 if(s.salesBefore>0&&st?.sales>s.salesBefore)return '지금까지 가장 많이 판 점포다 · 총매출 '+st.sales.toLocaleString()+'G';
 return '';}
/* UI_UX §CONTROL / FEEDBACK HYGIENE: a muster row that cannot be sent used to keep offering
   원정대 선택 - a dead promise on an unavailable control, the same defect the approved Store
   Support state fixed by not leaving a dead 구매. The row already states the cause on the line
   above (중상 · N일 휴식), so the affordance label is simply dropped rather than restated. */
function npcCard(n,action='npc'){const s=game.run,muster=action==='final-npc',finalView=muster||action==='final-view',blocked=muster&&(!n.alive||n.recovery);
 /* the FINAL muster card opens the adventurer's notebook; picking happens there (User 2026-09-25) */
 const condition=finalView?[n.injury===2?'중상':n.injury===1?'부상':'',n.recovery?n.recovery+'일 휴식':'',(n.fatigue||0)>=Dungeon.fatiguePenaltyFrom()?'피로 '+n.fatigue+' · '+Dungeon.fatigueBand(n.fatigue).name:''].filter(Boolean).join(' · '):n.status+(n.recovery?' · '+n.recovery+'일 휴식':'');
 const call=!muster?'기록 보기':s.team.includes(n.id)?'선택됨':'기록 보기';
 return `<button class="npc-card r${n.rarity} ${!n.alive?'dead':''} ${s.team.includes(n.id)?'chosen':''}" data-action="${action}" data-id="${n.id}" ${blocked?'disabled':''}><div class="row">${portrait(n,60)}<div>${badge(n.rarity,true)}<h3 style="margin-top:5px">${E(n.name)}</h3><p>Lv.${n.level} ${D.jobBy[n.job].name}</p><p>${condition?E(condition)+' · ':''}방문 ${n.visits}회</p>${finalView?'<p class="final-candidate-wallet">'+walletChip(n,true)+'</p>':''}</div></div><div class="loyalty"><div class="row between"><span>단골도 ${n.loyalty}</span><span>${call}</span></div><div class="bar"><span style="width:${n.loyalty}%"></span></div></div></button>`;}
// FINAL — climax. Both Families are disclosed above every choice; party and supply
// follow; the D30 Relic decision is reachable before lock (FINAL_EXPEDITION §3, §4.1).
/* FINAL-Q77: the one party-wide 토벌 전망, in the place and treatment the ordinary 전투 전망 reads
   (.readout .top .fore + its ?). It replaces the one-NPC readout in the Final; the explanation is
   the ? and a one-time coach, not a standing line. */
function finalForecastView(){const f=game.finalForecast(),c=Copy.finalPrep;if(!f)return '';
 return '<div class="readout final-forecast"><div class="top"><span class="fore">'+E(c.forecast)+'<b>'+E(f)+'</b>'
  +tip(c.forecast,...c.forecastWhy)+'</span></div></div>';}
function finalTrait(){const s=game.run;if(!s.bossReveal?.traitSeen)return '';const c=Copy.boss.d15.trait[s.bossId];
 return '<details class="final-trait"><summary><span>마왕 권능</span><b>'+E(c[0])+'</b></summary><div>'+traitLines(s.bossId).map(l=>'<p>'+E(l)+'</p>').join('')+(s.bossId==='SLOTH'?sealCount():s.bossId==='GREED'?greedSales(true):'')+'</div></details>';
}
function finalThreat(d){
 /* BATCH 5-1: each Family owns its Hazards. The persisted Final pool is the union of the two
    Families' tier-II Hazards (shop.js), so each column takes the pool filtered by its own
    Family, in the pool's order - nothing added, nothing recomputed. A phone still reads the two
    Families and then the Hazards (the columns are laid out flat there); a desk puts each
    Family's Hazards under it. Anything the pool held outside both Families would still print. */
 return '<section class="threat"><h2>확인된 위협</h2><div class="fams">'
 +(d.families||[]).map(id=>{const b=D.dungeonBy[id],own=(D.familyTiers[id]||[])[1]||[];
   return '<div class="fam-col"><span class="fam" style="--fam:'+b.color+'">'+Art.mark(b.id,24)+E(b.name)+'</span>'
    +hazardList(d.hazards.filter(h=>own.includes(h)),null,d)+'</div>';}).join('')
 +'</div>'+hazardList(d.hazards.filter(h=>!(d.families||[]).some(id=>((D.familyTiers[id]||[])[1]||[]).includes(h))),null,d)+finalTrait()+'</section>';
}
function finalMemberBody(n,p,d){const slots=Adventurer.slots(n);
 return '<span class="who">'+portrait(n,44)+'<span><b>'+E(n.name)+'</b><small>Lv.'+n.level+' '+E(D.jobBy[n.job].name)+'</small></span><span class="wallet">'+walletChip(n)+'</span></span>'
 +'<div class="final-loadout"><div><span class="bag-label">가방 '+n.pack.length+' / '+slots+'</span><div class="pack">'
 +Array.from({length:slots},(_,i)=>'<div class="slot '+(n.pack[i]?'filled':'')+'">'+(n.pack[i]?Art.itemIcon(n.pack[i],28)+'<span class="slot-name">'+E(D.itemBy[n.pack[i]].name)+'</span>':'빈 칸')+'</div>').join('')+'</div></div>'
 +'<span class="final-environments"><span class="env-caption">환경 대응 (권능 적용 전)</span>'+finalEnvironment(p,d)+'</span></div>';
}
function finalMemberPin(){const s=game.run,t=game.finalPreRoll(),index=s.team.indexOf(supplyNPC),n=s.npcs.find(n=>n.id===supplyNPC);if(!n||index<0)return '';
 return '<div class="final-pin-host"><button type="button" class="final-pin final-member board-rail'+(finalPinFolded?' folded':'')+'" data-action="final-pin" aria-expanded="'+!finalPinFolded+'" aria-label="'+(finalPinFolded?'요약 열기':'요약 접기')+'">'+finalMemberBody(n,t.preparations[index],t.d)+'</button></div>';
}
function watchFinalPin(){finalPinWatch?.disconnect();finalPinWatch=null;const pin=$('.final-pin'),host=$('.final-pin-host'),src=$('.final-member[data-action="supply-target"][data-id="'+supplyNPC+'"]'),sc=$('.p-final .stage-scroll');
 if(!pin||!src||!sc)return;const sync=()=>{const show=src.getBoundingClientRect().bottom<=sc.getBoundingClientRect().top+2;pin.classList.toggle('show',show);host.style.height=show?Math.ceil(pin.getBoundingClientRect().height+4)+'px':'0px';};
 sync();if(typeof IntersectionObserver==='function'){finalPinWatch=new IntersectionObserver(sync,{root:sc,threshold:0});finalPinWatch.observe(src);}
}
function finalIsOrdering(s){return !!s&&!s.finalCommitted&&(finalOrdered===false||(finalOrdered===null&&!s.team.length));}
function finalMuster(s,need,committed){
 const pickCount='선택 '+s.team.length+'명 · 최대 '+need+'명',roster=s.npcs.filter(n=>n.alive&&n.introduced).sort((a,b)=>b.level-a.level),preparation=committed?game.finalPreRoll():null;
 return (finalIsOrdering(s)
 ?'<div class="party-head"><h2>마지막 발주</h2></div><div class="final-order-layout"><div class="order-desk final-order open">'+orderForm()+'</div>'+stockSide()+'</div>'
 :!committed
 ?'<div class="party-head"><h2>원정대 꾸리기</h2><span class="count">'+E(pickCount)+'</span></div>'
 +'<div class="readout final-forecast pending"><p>'+E(Copy.finalPrep.cap)+'<br>'+E(Copy.finalPrep.unlock)+'<br>'+E(Copy.finalPrep.returnNote)+'</p></div>'
 +'<div class="npc-grid final-roster">'+roster.map(n=>npcCard(n,'final-npc')).join('')+'</div>'
 :'<div class="party-head"><h2>원정대 준비</h2><span class="count">확정 '+s.team.length+'명</span></div>'+finalForecastView()
 +'<div class="final-team">'+s.team.map((id,index)=>{const n=s.npcs.find(x=>x.id===id);return '<button class="final-member'+(supplyNPC===id?' active':'')+'" data-action="supply-target" data-id="'+id+'" aria-pressed="'+(supplyNPC===id)+'">'+finalMemberBody(n,preparation.preparations[index],preparation.d)+'</button>';}).join('')+'</div>'
 +(supplyNPC?'<div class="final-stats">'+statGrid(s.npcs.find(x=>x.id===supplyNPC))+btn('자세히 보기','final-detail','bare more','data-id="'+supplyNPC+'"')+'</div>':'')+'<div class="final-supply p-sale">'+shelf(true)+'</div>');
}
function finalDock(s,need,committed){const ready=s.team.length>0&&s.team.length<=need,held=Object.values(s.cart||{}).some(q=>q>0);
 if(!need)return relicWindowLink()+btn('출전 불가 · 점포 종료','boss','danger');
 if(finalIsOrdering(s))return stockSheetKey()+btn('발주 확정','confirm-order','stamp',held?'':'disabled')+btn('원정대 꾸리기','final-ordered','stamp leave',held?'disabled':'');
 return relicWindowLink()+(committed?btn('최종 원정 보내기','boss','stamp'):btn(Copy.finalPrep.returnOrder,'final-order-back','stamp final-order-back')+btn('원정대 확정','final-commit','stamp',ready?'':'disabled'));
}
function finalScreen(){
 const s=game.run,d=s.dungeons[0],need=game.finalRequired(),committed=!!s.finalCommitted;
 if(!s.team.includes(supplyNPC))supplyNPC=s.team[0]||null;
 /* UI_UX: the Boss is a primary game object, and on the day the player finally faces it the
    standing screen has to say which one. It used to open on a generic 마왕성 plate with a
    28px procedural mark, so every Run's last day looked identical. Identity and art resolve
    from the Run exactly as the D5 / D15 reveals do - Scene.bossArt reads bossId, day and
    sealBreakCount, so SLOTH shows the form its broken seals earned and the others their
    battle form - and the castle stays as the place, under the name of who is in it. */
 const ordering=finalIsOrdering(s),b=D.bossBy[s.bossId],art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount);
 const body='<div class="gate-zero">'
 +(art?'<figure class="boss-face"><img src="'+art+'" alt="'+E(b.name)+'"></figure>'
      :'<span class="boss-face fallback">'+Art.mark('final',56)+'</span>')
 +'<div class="who"><span class="label">제0게이트 · 마왕성</span><h1>'+E(b.name)+'</h1></div></div>'
 +finalThreat(d)+finalMuster(s,need,committed)
 +ownedRelicView();
 /* BATCH 5-1 / PRESENTATION_POLISH §BOSS DOMAIN BACKDROP ASSET ROLE: D30 is where the Run finally
    stands in the Boss's own domain. The stage names which Boss so the stylesheet can hang that
    Boss's authored room behind it - the only place any of those rooms is used. */
 return stage('final','최종 원정',committed?finalMemberPin():'',body,finalDock(s,need,committed),' data-boss="'+E(s.bossId)+'"',ordering?'p-order final-order-stage':'');
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
    +'<span class="carried">'+(carried.length?'마지막 상품 · '+E(carried.join(' · ')):'빈손으로 갔다')+'</span></div>'
    +'</article>';}).join('')+'</div></section>';}
/* BATCH 3 END: a bankruptcy or death-limit closure is decided at closeDay(), after the last
   NIGHT and CLOSING were already read, yet the ending printed that whole night again under the
   tape - every record, its growth chips, even a speech balloon left over from the day. The
   owned ending is statement -> reason -> what this Run moved -> the Final party when there is
   one -> the next store (PRESENTATION_POLISH_BATCH3 §END); NIGHT stays the owner of those
   records. A Final ending never had them (run.js clears s.results there). */
function endScreen(){
 return stage('end','점포 종료','',endBanner()+sentOff(),btn('다음 점포 열기','new','stamp'));}
/* The failure line is not a hidden threshold: the book that already lists the dead says how
   many that is, and how many the store has. */
function rosterList(){const s=game.run;if(!s)return '<p class="muted">첫 영업을 시작하면 모험가 수첩이 열린다.</p>';
 const lost=s.stats.deaths,limit=Meta.deathLimit(s);
 return '<p class="lost-count'+(lost>=limit-2?' near':'')+'">돌아오지 못한 사람 <b>'+lost+' / '+limit+'</b>'
 +'<span>'+limit+'명에 이르면 소문이 퍼져 이 점포의 영업이 끝난다.</span></p>'
 +'<p class="smalltext">이름을 누르면 마지막 상품과 원정 기록을 볼 수 있다. 사망한 모험가의 기록도 남는다.</p><div class="npc-grid">'
 +s.npcs.filter(n=>n.introduced).sort((a,b)=>Number(b.alive)-Number(a.alive)||b.loyalty-a.loyalty).map(n=>npcCard(n)).join('')+'</div>';}
function npcDetail(id){const n=game.run.npcs.find(n=>n.id===id);if(!n)return '';
 let cond=[];
 if(n.injury){
  if(n.injury===1){
   let combat=n.traits.includes('grit')?'+20%':'-'+Math.round(Dungeon.injuryPenaltyFor(game.run.facilities)*100)+'%';
   cond.push('부상 효과: 투력 '+combat+' · 강인함 -20%');
  }
  if(n.recovery)cond.push('남은 휴식: '+n.recovery+'일');
  /* NPC_TRAIT v2.7 §Natural recovery + ITEM_v2.7 §INSURANCE HIERARCHY. An ordinary Injury is
     no longer cleared by resting a day - it clears by actually coming back from a 성공/대성공 -
     and 구급키트 is Aftercare on the next expedition's result, not a cure sold to a resting
     adventurer. Both readings state what actually clears the state. */
  cond.push(n.injury===2?'회복 방법: '+n.recovery+'일 대기'
                        :'회복 방법: 원정 성공·대성공 · 퇴각 귀환 때 확률 회복 · 구급키트');
 }
 if(n.fatigue||n.fatigue===0){
  /* DUNGEON_HAZARD v2.9.0 §FATIGUE STAT PENALTY: five bands on 0~40, one owner; COPY_AUDIT §4-14 for the recovery line */
  const band=Dungeon.fatigueBand(n.fatigue);
  cond.push('현재 피로 (상품 사용 전): '+n.fatigue+(band.min>0?' · '+band.name+' ('+band.text+')':' (페널티 없음)'));
  cond.push('피로 회복: 음식·음료');
 }
 /* v2.9.0 (COPY_AUDIT §5-7): the frozen SALE-entry Death risk reads here as well as in the help. */
 if(n.outlook&&n.outlook.day===game.run.day)cond.push('실패 시 사망 위험 '+Math.round(n.outlook.deathRisk*100)+'%');
 if(game.run.phase==='final')cond.push('손님 소지금 '+fmt(n.money)+'G');
 /* DUNGEON_HAZARD §STRAIN (v2.9.1 balance): an information row, no verdict - consecutive
    expeditions this adventurer began injured, counted back from the most recent record and
    reset to 0 by a healthy departure. Same helper STRAIN itself reads (Dungeon.injuredStreak). */
 cond.push('연속 부상 출발 '+Dungeon.injuredStreak(n.records)+'회');
 let condHtml = '<div style="background:var(--soil-2);padding:12px;border-radius:4px;margin:8px 0;line-height:1.5;">'+cond.map(E).join('<br>')+'</div>';
 return `<div class="npc-detail"><div class="identity">${portrait(n,96)}<div>${badge(n.rarity,true)}<h2>${E(n.name)} · Lv.${n.level}</h2><p>${D.jobBy[n.job].name} · ${n.status}</p><p>단골도 ${n.loyalty} · 방문 ${n.visits}회</p></div></div>${game.run.phase==='sell'&&game.current()?.id===n.id?destPlate(n):''}${statGrid(n)}${traitRows(n)}<p>${E(n.equipment.name)} · 투력 +${n.equipment.power}</p>${condHtml}<h3>원정 기록</h3>${n.records.slice().reverse().map(r=>`<div class="history-row"><b>DAY ${r.day} · ${E(r.dungeonName)} · ${r.outcome}</b><p>${r.items.map(i=>D.itemBy[i].name).join(' + ')||'상품 없음'}</p>${r.routeChange?`<p>${E(r.routeChange)}</p>`:''}</div>`).join('')||'<p>아직 원정 기록이 없다.</p>'}<h3>구매 영수증</h3>${n.history.slice(-12).reverse().map(h=>`<div class="history-row">DAY ${h.day} · ${D.itemBy[h.item].name} · ${Presentation.modeLabel(h.mode)} ${fmt(h.paid)}G</div>`).join('')}</div>`;}
/* What a locked entry is still waiting for. Both axes are derived from the matrix, so
   this reads the same truth the gate itself reads. */
/* 길드 특제 도시락 / 세계수 생환부적 open on the account flag the run sets on reaching DAY 10 / 14 (Meta.itemUnlocked), not on metaUnlock. */
const DAY_UNLOCK=Meta.ITEM_UNLOCK_DAY;
function unlockProgress(entry){const a=game.account;
 if(D.relicRetired.includes(entry.id))return '현재 후보로 나오지 않음';
 if(DAY_UNLOCK[entry.id])return a.unlocks?.[entry.id]?'해금 완료 · 각 점포 DAY '+DAY_UNLOCK[entry.id]+'부터 발주 후보':'DAY '+DAY_UNLOCK[entry.id]+' 도달 시 해금';
 if(entry.metaUnlock)return Meta.distinctBossClear(a)>=entry.metaUnlock?'해금 완료'
  :'서로 다른 마왕 토벌 '+Meta.distinctBossClear(a)+'/'+entry.metaUnlock;
  return '기본 제공';}
const isLocked=e=>DAY_UNLOCK[e.id]?!game.account.unlocks?.[e.id]:!!(e.metaUnlock&&Meta.distinctBossClear(game.account)<e.metaUnlock);

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
 const d=D.decorationBy[id],art=Scene.decoration(id);if(!d||!art||d.slot!==slot)return ''; /* v2.9.7: art belongs to its own Slot */
 /* No hover-only title: the effect is read in 점포 장식. A tooltip would be the only place a
    touch player could not reach. The name lives in the label, for anyone not reading the art. */
 return '<span class="decoplate '+slot+'" role="img" aria-label="'+E(SLOT_COPY[slot]||slot)+' · '+E(d.name)+'">'+art+'</span>';}
function storePanel(){const a=game.account,inRun=!!(game.run&&game.run.phase!=='end');
 const loadout=Meta.storeLoadout(a);
 return '<div class="decoration-panel">'
 +'<p class="smalltext">점포 자본 <b class="gold-text">'+Meta.storeCapital(a).toLocaleString()+'</b>'
 +' · '+(inRun?'이번 점포의 장식은 고정됨.':'장식은 점포를 열기 전에 변경할 수 있습니다.')+'</p>'
 +D.decorationSlots.map(slot=>{
   const options=D.decorations.filter(d=>d.slot===slot),active=loadout[slot];
   /* a stable handle so a Slot row elsewhere can open this panel already on that Slot */
   return '<div class="slot" data-slot="'+E(slot)+'" tabindex="-1"><h4>'+E(SLOT_COPY[slot]||slot)+'</h4>'
    +options.map(d=>{const owned=Meta.decorationOwned(a,d.id),on=active===d.id;
      return '<div class="slot-option'+(on?' on':'')+(owned?'':' locked')+'">'
       /* UI_UX §DECORATION DECISION SURFACE: name, exact effect, price / ownership and equipped state only (d.text stays
          in the data); the key sits beside the name and the effect line runs the card's full width below them */
       +'<b class="deco-name">'+E(d.name)+'</b>'
       +(owned
         ? (inRun?'<span class="muted">'+(on?'이번 점포에 적용 중':'미적용')+'</span>'
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
                  :btn('구매 <small>'+d.price.toLocaleString()+' 자본</small>','deco-buy','small','data-id="'+d.id+'"'
                      +(Meta.storeCapital(a)<d.price?' disabled':''))))
       +'<span class="smalltext deco-effect">'+E(d.effect)+'</span>'
       +'</div>';}).join('')
    +'</div>';}).join('')
 +'</div>';}
function progressPanel(){const a=game.account;
 /* the grade, the total and the distinct count are already stated in the codex header
    directly above this, so the panel does not say them a second time. */
 return '<div class="progress-panel">'
 +'<p class="smalltext">서로 다른 마왕을 토벌할 때, 출전한 직업의 숙련이 쌓인다. 숙련이 높을수록 새로 오는 그 직업의 모험가가 더 높은 레벨로 등장할 수 있다.</p>'
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
function codex(){const a=game.account;let list=codexTab==='items'?D.items:codexTab==='jobs'?D.jobs:codexTab==='facilities'?D.relics:[];return `<div class="row between wrap" style="margin-bottom:18px"><div><h3>본사 기록</h3><p class="smalltext">점포 자본 ${Meta.storeCapital(a).toLocaleString()} · 보유 장식 ${Meta.ownedDecorations(a).length} / ${D.decorations.length}</p><p class="smalltext">직업 숙련 ${Meta.totalJobMastery(a)} / 42 · 서로 다른 마왕 토벌 ${Meta.distinctBossClear(a)} / 7</p></div><span class="muted">${a.runs}회 영업 · ${a.wins}회 마왕 토벌</span></div><details><summary>발견 수첩 · ${discoveryLines(a).length}개</summary>${discoveryLines(a).map(t=>`<p class="discovery">${E(t)}</p>`).join('')||'<p>아직 기록된 발견이 없다.</p>'}</details><div class="tabs">${[['progress','진행도'],['items','상품 '+D.items.length],['jobs','직업 6'],['facilities','점포지원 '+D.relics.length],['boss','마왕'],['store','점포 장식']].map(([id,label])=>btn(label,'codex-tab',codexTab===id?'small active':'small',`data-id="${id}"`)).join('')}</div><div class="unlock-grid">${codexTab==='progress'?progressPanel():codexTab==='store'?storePanel():codexTab==='boss'?bossCodex():list.map(it=>`<div class="unlock ${isLocked(it)?'locked':''}">${codexTab==='items'?Art.itemIcon(it.id,42):''}<h3>${E(it.name)}</h3>${it.effects?effectList(it):''}<p class="tale">${E(it.description||'길드 등록 직업.')}</p><p class="gold-text" style="margin-top:8px">${unlockProgress(it)}</p></div>`).join('')}</div>`;}
/* UI_UX §CODEX BOSS TAB: the Bosses the Player has met, this Run's Boss first once its identity is shown. Only the Trait is kept -
   the Final Hazards change every Run - and a Boss never met is not listed at all. */
function bossCodex(){const a=game.account,s=game.run,c=Copy.boss,r=s?.bossReveal||{},cur=r.identitySeen?s?.bossId:null;
 const known=id=>{const k=Meta.bossKnown(a,id);return id===cur?{identity:k.identity||!!r.identitySeen,trait:k.trait||!!r.traitSeen}:k;};
 const ids=D.bosses.map(b=>b.id).filter(id=>known(id).identity);
 if(!ids.length)return '<p class="boss-none">'+E(c.codex.none)+'</p>';
 if(ids.includes(cur))ids.sort((x,y)=>(y===cur)-(x===cur));
 return ids.map(id=>{const art=Scene.bossArt(id,1,0),now=id===cur,[name,raw]=c.d15.trait[id];
  const trait=known(id).trait
   ?'<p class="trait-name">'+(raw.length?'<span class="trait-k">'+E(c.codex.label)+'</span>':'')+'<b>'+E(name)+'</b></p>'
    +traitLines(id).map(l=>'<p>'+E(l)+'</p>').join('')+(id==='GREED'?greedSales(now):'')
   :'<p class="lock">'+E(now?c.codex.pending:c.codex.unknown)+'</p>';
  return '<article class="boss-card'+(now?' now':'')+'">'+(art?'<img src="'+art+'" alt="">':'')
   +'<div class="bc-text"><h3>'+E(D.bossBy[id].name)+(now?'<span class="now-tag">'+E(c.codex.now)+'</span>':'')+'</h3>'+trait+'</div></article>';}).join('');}
function stockModal(){const s=game.run;return `<p class="muted" style="margin-bottom:15px">유통기한은 입고일부터 계산합니다. 재고 정리는 <b>운영비가 모자란 마감</b>에 시작할 수 있고, 그 재고를 사들인 값의 50%를 회수합니다. 시작한 마감에서는 잔고가 0 이상이 된 뒤에도 계속 정리할 수 있습니다. 한 점포에서 ${game.rescueLimit()}번의 마감까지 이용할 수 있고, 지금까지 ${s.rescueUsed||0}번의 마감에 이용했습니다.</p><div class="unlock-grid">${groupStock().map(st=>{const it=D.itemBy[st.item];return `<div class="unlock">${Art.itemIcon(it.id,43)}<h3>${it.name} ×${st.count}</h3><p>${lastSaleDay(st.expires-s.day)}</p>${game.canRescue()?btn('1개 정리 +'+Math.round((st.cost??it.buy)*.5)+'G','liquidate','small',`data-id="${st.id}"`):''}</div>`;}).join('')||'<p>창고가 비어 있습니다.</p>'}</div>`;}
/* CORE_RUN_v2.8 §PRE-RUN FLOW. Start Contract selection is retired. What the player confirms
   before a Run is the Decoration loadout, read from the Account and frozen at start. */
/* UI_UX §NEW STORE PREPARATION — STORE SCENE (User 2026-09-27, v2.9.9). The store the Run is about to open, as the
   same painted room MORNING uses: the name hangs from its ceiling, the board carries the three lines of the game, each
   Decoration Slot is its own place in the room, and the Store Capital is a small plate on the counter where the till
   will stand. The loadout is the Account's planned one (the Run's is frozen only at start). An empty Slot is a neutral
   state, not a warning; every Slot - empty ones included - opens 점포 장식 already on that Slot. */
function prepScreen(){const a=game.account,loadout=Meta.plannedLoadout(a),owned=Meta.ownedDecorations(a),capital=Meta.storeCapital(a);
 /* UI_UX §Pre-Run Decoration empty-slot interaction (v2.9.4): a Slot whose unowned Decoration the capital covers now says
    so - a current state, not a "new" flag, and no Decoration named. */
 const canBuy=slot=>D.decorations.some(x=>x.slot===slot&&!Meta.decorationOwned(a,x.id)&&x.price<=capital);
 const place=slot=>{const id=loadout[slot],d=id&&D.decorationBy[id],art=d&&Scene.decoration(id),mark=canBuy(slot);
  return '<button class="decoplate '+slot+' prep-slot'+(art?'':' empty')+'" data-action="store-manage" data-id="'+E(slot)+'"'
   +' aria-label="'+E(SLOT_COPY[slot]||slot)+' '+(d?E(d.name):'비움')+(mark?' · 들일 수 있음':'')+' · 점포 장식에서 보기">'
   +(art||'<span class="slot-empty" aria-hidden="true"></span>')
   +'<span class="slot-tag"><i>'+E(SLOT_COPY[slot]||slot)+'</i><b>'+(d?E(d.name):'비움')+'</b>'+(mark?'<em class="can-buy">들일 수 있음</em>':'')+'</span></button>';};
 const fromEnd=!!game.run;
 return '<div class="stage p-morning p-prep">'+menuFab()
 +'<p class="build-mark">v'+E(BUILD.version)+' · '+E(BUILD.commit)+'</p>'
 /* no DAY sign on this ceiling, so the 간판 is held by nothing but its own painted spot */
 +'<div class="store" style="--daysign-x:1">'
  +'<div class="band ceiling"><span class="mount">'+Scene.ceiling()
   /* the store's name is a plate right under the title (User 2026-09-27): the counter front carries the Store Capital */
   +'<div class="opening"><h1 class="opening-title"><img class="opening-logo" src="ui/assets/presentation/start/title-logo.png" width="960" height="179" alt="던전 앞 편의점"></h1>'
   +'<span class="branchplate">'+E(plannedBranch())+'</span></div></span></div>'
  +'<div class="board" id="phase-content" tabindex="-1" aria-label="새 점포 준비">'
   +'<p class="board-rail">새 점포 준비</p>'
   +'<div class="pinned">'+(Save.error?'<p class="save-alert">'+E(Save.error)+'</p>':'')
    +'<div class="slip prep-note"><span class="pin"></span><b class="welcome-title">30일 동안 던전 앞 편의점을 운영한다.</b>'
    +'<span class="flavor">찾아오는 모험가를 보급하고, 성장시킨다.</span><span class="welcome-band">마지막 날, 성장한 모험가들을 마왕 토벌에 보낸다.</span></div>'
    +'<p class="prep-status">'+(owned.length?'점포를 열면 이번 점포에는 고정됩니다.':'보유 장식 없음')+'</p></div></div>'
  +'<div class="band wall">'+Scene.wall(1)+'</div>'
  +'<div class="band counter"><span class="mount">'+Scene.counter()
   +'<span class="store-capital capital-plate"><i class="coin-mark" aria-hidden="true"></i>점포 자본 <b>'+capital.toLocaleString()+'</b></span></span></div>'
  +'<div class="deco-layer">'+D.decorationSlots.map(place).join('')+'</div>'
 +'</div>'
 +'<div class="dock">'+(fromEnd?btn('결과 다시 보기','prep-back','bare'):'')+btn('첫 점포지원 고르기','start','stamp')+'</div></div>';}
/* Two levels, one row each, with the number said out loud beside the control - the slider
   position alone is not a readable value. The master switch above them is the existing
   mute, so this adds controls and no fourth channel: there are no voices to balance. */
function mixer(){const st=game.account.settings,d=Sound.defaults;
 const row=(key,label,value)=>`<div class="mix-row"><label for="mix-${key}">${label}</label>`
  +`<input id="mix-${key}" type="range" min="0" max="100" step="5" data-mix="${key}" value="${Math.round(value*100)}" style="--mix-level:${Math.round(value*100)}%" aria-describedby="mix-${key}-val">`
  +`<b id="mix-${key}-val" class="gold-text">${Math.round(value*100)}%</b></div>`;
 return `<div class="mixer" role="group" aria-label="소리 믹서">`
  +row('bgm','BGM',Number.isFinite(st.bgm)?st.bgm:d.bgm)
  +row('sfx','SFX',Number.isFinite(st.sfx)?st.sfx:d.sfx)
  +`</div>`;}
const coachOff=()=>game.account.tutorial?.skipped===true;
function settings(){return `<div class="settings-content">
 <section class="settings-group" aria-labelledby="settings-sound"><div class="settings-heading"><h3 id="settings-sound">소리</h3>${btn(game.account.settings.muted?'소리 켜기':'소리 끄기','sound')}</div>${mixer()}</section>
 <section class="settings-group" aria-labelledby="settings-coach"><div class="settings-heading"><h3 id="settings-coach">안내</h3>${btn(coachOff()?'안내 다시 보기':'안내 끄기','coach-toggle')}</div><p>${coachOff()?'안내가 꺼져 있다. 말풍선과 한 줄 안내가 나오지 않는다.':'필요한 때 말풍선과 한 줄 안내가 나온다.'}</p></section>
 <section class="settings-group" aria-labelledby="settings-save"><h3 id="settings-save">저장</h3><p>자동저장은 현재 브라우저에 보관된다. 다른 기기로 옮길 때는 저장 파일을 내보낸다.</p><div class="settings-save-actions">${btn('저장 내보내기','export')}${btn('저장 가져오기','import')}</div></section>
 <section class="settings-group settings-reset" aria-labelledby="settings-reset"><h3 id="settings-reset">데이터 초기화</h3>${btn('전체 데이터 초기화','reset','danger')}</section>
 <p class="settings-note">게임의 시간은 행동할 때만 흐른다. 소리는 처음에 꺼져 있다.</p><p class="build-line">v${E(BUILD.version)} · ${E(BUILD.commit)}</p></div>`;}
/* COPY_AUDIT §8 / UI_UX §GLOBAL HELP: five flow lines, then eight sections under collapsed 자세히. */
function help(){return `<div class="stack"><div class="first-days"><h3>하루의 흐름</h3><p>아침 — 오늘 열린 게이트의 위험을 본다.</p><p>발주 — 그 위험에 맞는 능력을 올리는 상품을 들인다.</p><p>판매 — 손님이 갈 게이트를 보고 상품과 가격을 정한다. 판 상품은 손님 가방에 들어간다.</p><p>밤 — 원정 결과와 손님의 변화를 본다.</p><p>마감 — 오늘 번 돈과 쓴 돈을 확인하고 다음 날로 간다.</p><p class="grammar">상품마다 능력치 강화, 위험 대응, 피로 회복, 실패 완화 효과가 다르다. 상품의 효과를 확인한다.</p></div><details class="more"><summary>자세히</summary><h3>점포지원</h3><p>DAY 0 무료 1개는 DAY 4까지 고를 수 있다. 이후 DAY 5·10·15·20·25·30에 구매 기회가 온다. 보류한 후보와 가격은 다음 구매 기회 전날까지 유지된다.</p><h3>발주</h3><p>오늘 손님과 위험을 보고, 보유 골드 안에서 상품 수량을 정한다. 발주 확정 뒤에도 추가 발주와 발주 후보 교환이 가능하다.</p><h3>판매</h3><p>${E(Copy.loyalty.sale())}</p><p>손님이 한 번 거절한 가격과 그보다 비싼 가격은, 같은 상품으로 그날 다시 제안할 수 없다. 바가지를 거절하면 그 상품은 그날 그 손님에게 팔 수 없다.</p><h3>단골</h3><p>단골도가 높을수록 다시 찾아올 가능성과 상품을 살 마음이 커진다. ${E(Copy.loyalty.rule())} 단골도 ${Adventurer.TRUSTED_REGULAR}부터 ‘단골’로 표시된다.</p><h3>원정</h3><p>판매한 상품은 그날 원정에서 쓰고 사라진다. 손님은 게이트의 적과 환경을 둘 다 넘어야 한다. 적은 싸워서 이기고, 환경은 대응으로 버틴다. 하나라도 못 넘기면 실패하고, 다치거나 죽을 수 있다. 결과는 밤에 확인한다.</p><h3>점포 종료</h3><p>적자 마감은 재고 정리로 회생할 수 있다. 한 점포에서 최대 ${game.rescueLimit()}번의 마감에 이용할 수 있다. 회생 기회나 재고가 없어 적자를 해결하지 못하면 폐점한다. 돌아오지 못한 모험가가 사망 한도에 이르면 폐점한다. DAY 30 최종 원정이 끝나면 이번 점포도 끝난다.</p><h3>점포 자본</h3><p>영업이 끝날 때 총매출의 일부가 쌓인다. 영업한 날이 길수록 그 비율이 오른다. 보유 골드와는 별개로, 다음 점포로 이어진다. 장식을 들이는 데 쓴다.</p><h3>다음 점포</h3><p>다음 점포에도 본사 기록·해금·직업 숙련·점포 자본·보유 장식은 남는다. 모험가·재고·보유 골드·점포지원은 새로 시작한다.</p></details></div>`;}
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
/* BOSS §TRAIT NUMBERS: the figures in the Trait lines come from game.traitNumbers(), so a retune cannot leave the screen behind */
function traitFill(text){const n=game.traitNumbers(),f={...n,target:n.target.toLocaleString(),revenue:(game.run?.stats.revenue||0).toLocaleString()};
 return text.replace(/\{(\w+)\}/g,(_,k)=>f[k]);}
const traitLines=id=>Copy.boss.d15.trait[id][1].map(traitFill);
const greedSales=live=>'<dl class="greed-sales">'+(live?[Copy.boss.d15.salesTarget,Copy.boss.d15.salesNow]:[Copy.boss.d15.salesTarget]).map(r=>'<div><dt>'+E(r[0])+'</dt><dd>'+E(traitFill(r[1]))+'</dd></div>').join('')+'</dl>';
/* CODEX BOSS TAB: a shown D5 / D15 beat is kept on the Account, and the one-time guide line of a D15 / D25 report is spent */
function logBossBeat(st){const s=game.run;
 if(st==='d5'||st==='d15')Meta.markBoss(game.account,s.bossId,st==='d5'?'identity':'trait');
 if(st==='d15'||st==='final')(game.account.tutorial??={})['coach-'+(st==='d15'?'traitCoach':'finalCoach')]=true;}
function bossGuide(key,text){const tu=game.account.tutorial||{};return (tu.skipped||tu['coach-'+key])?'':'<p class="boss-guide"><b>'+E(Copy.boss.guideLabel)+'</b>'+E(text)+'</p>';}
function bossReveal(){const s=game.run,b=D.bossBy[s.bossId],c=Copy.boss,stage=bossRevealStage();
 const art=Scene.bossArt(s.bossId,s.day,s.sealBreakCount);
 const plate=art?'<figure class="boss-art"><img src="'+art+'" alt="'+E(b.name)+'"></figure>':'';
 /* UI_UX §BOSS INFORMATION PRESENTATION, amended: on a major reveal / preparation beat the Boss
    is the centred visual anchor and registers BEFORE the owned information, which then reads
    directly below it. The art used to close these two reports, so the Player finished the
    payload and only then met the subject. The information itself is unchanged and in the same
    order; only where the visual sits moved. */
 if(stage==='final'){const d=s.final||s.dungeons[0];
  return '<div class="boss-reveal final">'+bossFiled()+'<p class="lede">'+E(c.final.intro)+'</p>'+bossGuide('finalCoach',c.final.guide)
   +plate
   +'<div class="fams">'+(d.families||[]).map(id=>{const f=D.dungeonBy[id];
     return '<article class="fam-card" style="--fam:'+f.color+'"><b>'+E(f.name)+'</b>'
      +hazardList(D.familyTiers[id][1],null,d)+'</article>';}).join('')
   +'</div></div>';}
 if(stage==='d15'){const name=c.d15.trait[s.bossId][0],lines=traitLines(s.bossId);
  return '<div class="boss-reveal d15">'+bossFiled()+'<p class="lede">'+E(c.d15.intro)+'</p>'+bossGuide('traitCoach',c.d15.guide)
   +'<h3 class="boss-name">'+E(b.name)+'</h3>'
   +plate
   /* BATCH 4A: the Trait is D15's payload, so its name is set as the record's second subject
      under a small 특성 label, with its explanation attached in the same ruled entry - one
      entry, not a card. The line's text is unchanged; the dash only stops being visible
      once the label sits on its own line. */
   +'<div class="trait"><p class="trait-name">'+(lines.length?'<span class="trait-k">'+E(c.d15.label)+'</span><span class="trait-sep"> — </span>':'')+'<b>'+E(name)+'</b></p>'
   +'<div class="trait-body">'+lines.map(l=>'<p>'+E(l)+'</p>').join('')+(s.bossId==='GREED'?greedSales(true)+'<p>'+E(c.d15.salesNote)+'</p>':'')+'</div></div></div>';}
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
  /* COPY_AUDIT §14-1 (User 2026-09-25): the DAY 05 / DAY 30 anchors read on their own LED label above each line */
  +c.d0.steps.map(([day,lines])=>'<div class="d0-step"><b>'+E(day)+'</b>'+lines.map(l=>'<p>'+E(l)+'</p>').join('')+'</div>').join('')+'</div>';
 return '<div class="boss-reveal d5">'+bossFiled()+'<p class="lede">'+E(c.d5.sub)+'</p>'
  +'<h3 class="boss-name">'+E(b.name)+'</h3>'
  +plate+'<p class="info-line">'+E(c.d5.next)+'</p><p class="flavor">'+E(c.d5.flavor[s.bossId])+'</p></div>';}

/* A decision sheet whose footer already carries its way back shows no second 닫기: the footer
   control is the one cancel owner (돌아가기 / 보급으로 돌아가기). Escape still dismisses it (the
   keydown handler is separate). */
const ownCancel=new Set(['underConfirm','bossConfirm']);
let dossierShown=null;const stageKey=()=>game.run?game.run.day+':'+bossRevealStage():null;
function fatigueModal(r){
 const settled=r.settledFatigue??r.finalFatigue,rows=Presentation.fatigueRows(r),start=rows[0];
 const row=(label,value,kind='')=>'<div class="'+kind+'"><span>'+E(label)+'</span><b>'+E(value)+'</b></div>';
 const changes=rows.slice(1).map(x=>row(x.label,(x.delta>0?'+':'')+x.delta,x.delta>0?'harm':'benefit'));
 return '<div class="fatigue-overview"><div><span>'+E(start.label)+'</span><b>'+E(start.value)+'</b></div><i aria-hidden="true">→</i><div><span>귀환 후 피로</span><b>'+E(settled)+'</b></div></div>'
 +'<div class="fatigue-ledger">'+changes.join('')+'</div>'
 +'<div class="fatigue-bands"><h3>피로 단계</h3>'+Dungeon.fatigueBands().map(b=>'<p><b>'+E(b.name)+' '+b.min+(b.max>b.min?'~'+b.max:'')+'</b><span>'+E(b.text||'페널티 없음')+'</span></p>').join('')+'</div>';
}
function renderModal(){const root=$('#modal-root');if(!modal){dossierShown=null;root.innerHTML='';document.body.style.overflow='';return;}
 const hold=holdFocus(root);
 if(modal==='relics'){root.innerHTML=relicTakeover();sentenceBreaks(root);document.body.style.overflow='hidden';restoreFocus(root,hold);return;}
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
   if(itemV)body+='<div class="row wrap" style="justify-content:space-between"><span>상품 보강</span><strong>'+(itemV>0?'+':'')+Presentation.stat(itemV,true)+'</strong></div>';
   body+='<hr style="border:0;border-top:1px solid var(--line);margin:4px 0"><div class="row wrap" style="justify-content:space-between"><span>현재 적용값</span><strong>'+Presentation.stat(p.effects[k],true)+'</strong></div>';
   if(p.why.length)body+='<div class="muted" style="margin-top:12px;font-size:13px;line-height:1.4">변화 원인<br>'+p.why.map(w=>'- '+E(w)).join('<br>')+'</div>';
   body+='</div>';footer=btn('확인','shop','stamp');narrow=true;
  }
 }
 else if(modal==='event'){title=E(s.event?.name||'오늘의 사건');body=eventReveal();footer=btn('오늘 상황 보기','event-seen','stamp');narrow=true;}
 else if(modal==='owned'){title='보유 점포지원';body=relicsModal();footer=btn('확인','dismiss','stamp');narrow=true;}
else if(modal==='gates'){title='오늘 열린 게이트';body=s.phase==='final'?finalThreat(s.final):'<div class="gate-plates">'+s.dungeons.map(d=>gatePlate(d,true)).join('')+closedPlates()+'</div>';}
else if(modal?.startsWith('fatigue:')){const r=s.results.find(x=>x.npcId===modal.slice(8));title='오늘 피로 변화';body=r?fatigueModal(r):'';narrow=true;}
   /* UI_UX §MENU / SETTINGS — EXACT COMPOSITION (User 2026-09-24, v2.9.0): 점포지원 routes to the selection
      only while a window is purchasable; 이번 점포의 장식 is the frozen loadout, read-only; 현재 지점 포기 confirms
      (§1-3) and then discards the Run at once. */
   else if(modal==='menu'){title='점포 메뉴';body='<div class="menu-list">'+btn('모험가 수첩','roster')+btn('도감','codex')+(game.run?btn('점포지원','relics')+btn('이번 점포의 장식','loadout'):'')+btn('점주 가이드','help')+btn('설정','settings')
      +(game.run?btn('현재 지점 포기','abandon','danger'):'')+'</div>';
      const icons={roster:'roster',codex:'codex',relics:'support',loadout:'decor',help:'guide',settings:'settings',abandon:'abandon'};
      body=body.replace(/(<button[^>]*data-action="([^"]+)"[^>]*>)([^<]+)/g,(_,open,action,label)=>open+'<img class="menu-icon" src="ui/assets/presentation/menu/'+icons[action]+'.webp" alt="" aria-hidden="true"><span class="menu-label">'+label+'</span>');
      narrow=true;}
   else if(modal==='loadout'){title='이번 점포의 장식';body=loadoutModal();footer=btn('확인','dismiss','stamp');narrow=true;}
   else if(modal==='abandonConfirm'){title='현재 지점을 포기할까요?';body=ABANDON_BODY;footer=btn('계속 영업','dismiss')+btn('지점 포기','abandon-go','danger');narrow=true;}
 else if(modal==='roster'){title='모험가 수첩';body=rosterList();}
 /* D30 last order (User 2026-09-30): the muster's own candidates, read only - each card opens the notebook, nothing is picked */
 else if(modal==='finalRoster'){const s=game.run;title='원정대 후보';
  body='<p class="smalltext">'+E(Copy.finalPrep.cap)+'</p><div class="npc-grid">'
   +s.npcs.filter(n=>n.alive&&n.introduced).sort((a,b)=>b.level-a.level).map(n=>npcCard(n,'final-view')).join('')+'</div>';}
 else if(modal.startsWith('npc:')){const id=modal.slice(4),s=game.run,n=s?.npcs.find(x=>x.id===id);title='우리 점포의 모험가';body=npcDetail(id);
  /* FINAL muster (User 2026-09-25): the notebook is where a member is taken on or let go */
  if(s?.phase==='final'&&!s.finalCommitted&&n&&!finalIsOrdering(s)){const inTeam=s.team.includes(id),out=!n.alive||!n.introduced||n.recovery>0,full=!inTeam&&s.team.length>=game.finalRequired();
   footer=btn(inTeam?'원정대에서 빼기':'원정대 선택','final-team','stamp','data-id="'+id+'" '+(out||full?'disabled':''));}
  /* read only on D30 before the muster (back to the candidates) and after the party is confirmed (back to the prep) */
  else if(s?.phase==='final'&&!s.finalCommitted)footer=btn('원정대 후보 보기','final-roster');
  else if(s?.phase==='final')footer=btn(Copy.finalPrep.back,'dismiss');
  else footer=btn('수첩으로','roster');}
 else if(modal==='codex'){title='도감';body=codex();if(preRunReturn)footer=btn('새 점포 준비로 돌아가기','store-return','stamp');}
 else if(modal==='stock'){title='창고 재고';body=stockModal();}
 else if(modal==='help'){title='점주 가이드';body=help();narrow=true;}
 else if(modal==='settings'){title='설정';body=settings();narrow=true;}
 else if(modal==='bossConfirm'){title='제0게이트 — 마지막 출발';body='<p>선택한 원정대가 마왕성으로 출발합니다.<br>현재 보급 상태를 확인하셨나요?</p>';footer=btn('보급으로 돌아가기','dismiss','stamp')+btn('최종 원정 시작','boss-go','stamp');narrow=true;}
 else if(modal==='underConfirm'){const c=Copy.finalPrep;title=c.underTitle;body='<p>'+E(c.underBody.replace('{N}',game.run.team.length))+'</p>';footer=btn(c.back,'dismiss','stamp')+btn(c.under,'final-commit-go','stamp');narrow=true;}
 else if(modal==='retireConfirm'){title='이 점포를 폐점할까요?';body='<p>이번 점포의 영업을 끝내고 점포 자본을 정산한다.<br>모험가·재고·골드·점포지원은 다음 점포로 이어지지 않는다.<br>본사 기록·보유 점포 자본·보유 장식은 유지된다.</p>';footer=btn('계속 영업','dismiss')+btn('폐점','retire-go','danger');narrow=true;}
 else if(modal==='resetConfirm'){title='전체 데이터를 초기화할까요?';body='<p>현재 영업과 본사 기록을 포함한 이 브라우저의 GUILD24 저장 데이터를 모두 지운다. 되돌릴 수 없다.</p>';footer=btn('저장 내보내기','export')+btn('취소','dismiss')+btn('전부 지우기','reset-go','danger');narrow=true;}
 else if(modal==='importConfirm'){title='저장 파일 가져오기';body='<p>현재 브라우저의 진행을 가져온 저장으로 교체한다. 기존 진행을 남기려면 먼저 내보내야 한다.</p>';footer=btn('저장 내보내기','export')+btn('파일 선택','import-go','stamp');narrow=true;}
 else if(modal==='debug'){title='개발용 Debug · 일반 플레이 비노출';body=`<pre class="debug">${E(JSON.stringify({seed:s.seed,rngState:s.rngState,lastRNG:game.rng.last,offers:s.offers.map(o=>({...o,rarity:D.itemBy[o.item].rarity})),npc:game.current(),dungeons:s.dungeons,results:s.results.map(r=>({name:r.name,outcome:r.outcome,...r.debug})),boss:s.bossDebug},null,2))}</pre>`;}
 const utility=modal==='menu'?'menu-panel':['roster','codex','help','loadout','abandonConfirm'].includes(modal)?'wood-frame':['settings','resetConfirm','importConfirm'].includes(modal)?'settings-wood '+(modal==='settings'?'settings-panel':''):'';
 root.innerHTML=`<div class="modal-shade"><section class="modal ${narrow?'narrow':''} ${doc?'doc doc-'+doc:''} ${utility}" role="dialog" aria-modal="true" aria-label="${E(title)}"><div class="modal-header"><h2>${title}</h2>${(preRunReturn||game.run?.phase!=='foundation')&&!ownCancel.has(modal)&&!d0Owed()?btn(CLOSE_X,'dismiss','bare','aria-label="창 닫기"'):''}</div><div class="modal-body">${body}</div>${footer?`<div class="modal-footer">${footer}</div>`:''}</section></div>`;document.body.style.overflow='hidden';restoreFocus(root,hold);
 sentenceBreaks(root);
 /* A Slot row asked for this panel, so it opens on that Slot instead of at the top. The
    request is consumed here: a later redraw of the same panel must not keep yanking the
    player back to it while they read something else. */
 if(decoFocus){const target=root.querySelector('.slot[data-slot="'+decoFocus+'"]');decoFocus=null;
  if(target){target.scrollIntoView({block:'start',behavior:'instant'});target.focus({preventScroll:true});}}
 /* v2.9.10 (User 2026-09-27): the Boss dossier used to appear in one cut after the hold and read as a stutter. When it
    opens it arrives: the shade is there at once and the sheet rises into place, the Boss's art with it (a separate,
    later settle of the art read as a second stutter - User 2026-09-28). Only on the draw that opens it - a redraw of an
    open dossier does not replay it. Reduced motion: at once, as before. */
 const opened=modal==='boss'&&dossierShown!==stageKey();dossierShown=modal==='boss'?stageKey():null;
 if(opened&&motionOK()){const sheet=root.querySelector('.modal');
  if(sheet)sheet.animate([{transform:'translateY(18px)',opacity:0},{transform:'none',opacity:1}],{duration:260,easing:'cubic-bezier(.33,1,.68,1)'});}
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
 case'boss-seen':{const st=bossRevealStage();logBossBeat(st);
  if(st==='d0')s.bossReveal.d0Seen=true;
  else{const beat=BOSS_BEATS.find(x=>x[1]===st);if(beat)s.bossReveal[beat[2]]=true;}
  /* UI_UX_v2.8 §BOSS / FINAL AUDIO: one motif, two strengths. D5 / D15 / D25 carry the major
     acknowledgement; D0 / D10 / D20 stay compact. The strength is read off the BEAT, never off
     the Boss behind it, so no cue names anything the plate has not already shown. */
  sound(BOSS_MAJOR.has(st)?'bossmajor':'bosscompact');
  game.save();setModal(null);render();break;}
 /* v2.9.10 quick patch (User 2026-09-28, RUNTIME UX BUG): breaking a seal spends the window exactly as 구매 does, so it
    closes the window as 구매 does - it used to redraw in place and leave `나중에 결정` under a decision already made */
 case'break-seal':game.breakSeal();setModal(null);render();sound('boss');break;
 case'seal-fold':sealFolded=!sealFolded;sound('ui');render();break;
 case'menu':sound('ui');setModal('menu');break;
 case'begin-order':game.beginOrder();sound('open');render();break;
 case'confirm-order':{/* H3: what the warehouse and the till held before the commit, for the cascade after it (playCue) */
  const before=Object.fromEntries(groupStock().map(st=>[st.item,st.count])),used=s.inventory.length,gold=s.money,
   skus=[...new Set(Object.entries(s.cart||{}).filter(([,q])=>q).map(([i])=>s.offers[i].item))],
   /* the open phone sheet's height before the commit: a new rack row grows in instead of appearing in one frame */
   sheetEl=$('#stock-sheet'),sheetH=sheetEl&&!sheetEl.hidden?sheetEl.getBoundingClientRect().height:null;
  orderCueAt.forEach(clearTimeout);orderCueAt=[];game.confirmOrder();
  if(motionOK()){cue='order';handoff={before,used,gold,skus,sheetH};Sound.sync(game.account.settings.muted,audioPhase(),game.account.settings);}else sound('order');
  render();break;}
 case'open-store':game.open();sound('open');render();break;
 case'shop':setModal(null);break;
 case'new':prepOpen=true;sound('newstore');startPrologue(render);break;
 case'prologue-next':prologueWake();prologueStep(false);break;
 case'prologue-skip':prologueWake();prologueStep(true);break;
 case'prologue-sound':{const st=game.account.settings,was=!st.muted&&!prologue.woke&&Sound.locked();prologueWake();if(!was)st.muted=!st.muted;game.save();sound('ui');const b=$('.pro-sound');if(b){b.innerHTML=proSpeaker(st.muted);b.setAttribute('aria-label',st.muted?'소리 켜기':'소리 끄기');}break;}
 case'prep-back':prepOpen=false;sound('ui');render();break;
 /* UI_UX_v2.8 §PURCHASE / EQUIP FLOW: buying and equipping are only legal outside a Run, and
    outside a Run this screen is the only one there is - so the way into 점포 장식 has to be on
    it. Without this the panel is unreachable exactly when it is the one usable. */
 /* the Slot the player asked for, so the panel opens on it. UI-local, never saved. */
 case'store-manage':preRunReturn=!game.run||prepOpen;codexTab='store';decoFocus=el.dataset.id||null;sound('ui');setModal('codex');break;
 /* Back to preparation. It only changes which panel is open: nothing is spent, no Decoration
    state is re-rolled, the Run is neither reseeded nor started. */
 case'store-return':preRunReturn=false;codexTab='items';sound('ui');setModal(null);break;
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
  preRunReturn=false;prepOpen=false;game.start(seed);selected=null;setModal(null);sound('begin');render();break;}
 /* UI_UX_v2.8 §PURCHASE / EQUIP FLOW. Both are Account actions and both refuse during a Run;
    the Capital is deducted exactly once, inside Meta. A purchase takes two steps — the button
    only asks, and `deco-confirm` is the single place that spends. */
 case'deco-buy':{const back=keepDecoRow(el);decoPending=id;renderModal();back();break;}
 case'deco-cancel':{const back=keepDecoRow(el);decoPending=null;renderModal();back();break;}
 case'deco-confirm':case'deco-equip':case'deco-unequip':{const back=keepDecoRow(el);
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
  game.save();renderModal();render();back();break;}
 /* UI_UX_v2.8 §ORDER: `.set` holds the 1 / 3 / 최대 shortcuts, so they take the stepper's own
    tick one step quieter and never outrank it; audio.js holds both to a minimum retrigger gap. */
 case'stock-sheet':setStockSheet(!sheetOpen());sound('ui');break;
 case'rail-fold':{const st=game.account.settings,f=!railFolded();st.orderRailFolded=f;game.save();const r=$('.p-order .death-limit-row');
  if(r){r.classList.toggle('folded',f);const b=r.querySelector('.rail-fold');b?.setAttribute('aria-expanded',String(!f));b?.setAttribute('aria-label',f?'요약 열기':'요약 접기');}
  sound('ui');watchOrderToday();break;}
 case'qty':{const row=el.closest('[data-offer]'),key=row?.dataset.offer,y0=row?.getBoundingClientRect().top;
  game.setQuantity(Number(el.dataset.index),Number(el.dataset.q));sound(el.closest('.set')?'quantset':'quantity');render();
  anchorOffer(key,y0);break;}
 case'night-next':s.nightCursor=Math.min(s.results.length,(s.nightCursor||0)+1);if(s.nightCursor>=s.results.length)game.finishNight();game.save();render();
  nightSound(s.results[s.nightCursor]);if(s.phase==='closing')closingSound();break;
 case'event-seen':setModal(null);render();break;
 case'event-again':sound('ui');setModal('event');break;
 case'gates':sound('ui');setModal('gates');break;
 case'fatigue':sound('ui');setModal('fatigue:'+id);break;
 case'relics':sound('ui');setModal(game.canBuyRelic()?'relics':'owned');break;
 case'loadout':sound('ui');setModal('loadout');break;
 case'abandon':sound('ui');setModal('abandonConfirm');break;
 /* CORE_RUN §CURRENT RUN ABANDON: no settlement, no new Run - the no-Run pre-Run screen follows. */
 case'abandon-go':game.abandon();selected=null;preRunReturn=false;setModal(null);render();break;
 case'stat-detail':sound('ui');setModal('stat:'+id);break;
 /* §STORE SUPPORT: acquisition is heavier than an ordinary purchase and reads as securing a
    fixture into the store. Deliberately not the Decoration cue and not the unlock cue. */
 case'buy-relic':game.buyRelic(id);setModal(null);render();sound('support');break;
 case'reroll-relics':game.rerollRelics();sound('spend');render();break;
 case'defer-relic':game.deferFoundationRelic();setModal(null);render();sound('ui');break;
 case'closing':game.finishNight();game.save();render();nightSound(null);closingSound();break;
 case'open':game.open();selected=null;render();healCue();break;
 /* SALE scroll continuity. Opening one good closes another, and when the one that closes
    sits above the viewport the shelf below it slides up by the height of the panel that
    went away - the row the player just tapped walks off under their thumb. Restoring the
    raw scrollTop cannot help: the same offset now points at different content. Anchor on
    the tapped row instead and put it back on the pixel it was on, which is what "keep the
    product area you were looking at" actually means. */
 case'select':{
  const y0=el.getBoundingClientRect().top;
  /* a folded tray opens on any shelf row - the one already on it too - rather than letting that row clear it */
  const opening=!selected||trayFolded;
  const reopen=trayFolded&&selected===id;trayFolded=false;
  selected=reopen||selected!==id?id:null;cue=selected?'select':null;render();sound('button');
  const sc=$('.stage-scroll'),back=$('[data-action="select"][data-id="'+CSS.escape(id)+'"]');
  if(sc&&back)sc.scrollTop+=back.getBoundingClientRect().top-y0;
  /* The tray's opening shrinks the list, so the tapped row may land under it: scroll only as far as keeps that row
     in view, and leave the list alone when it already is (a reader looking at the stats stays where they are). */
  if(s.phase==='sell'&&opening&&selected&&innerWidth<1024&&sc&&back){const clip=sc.getBoundingClientRect(),row=back.getBoundingClientRect(),was=sc.scrollTop;
   if(row.bottom>clip.bottom-4)sc.scrollTop+=row.bottom-clip.bottom+4;
   else if(row.top<clip.top+4)sc.scrollTop+=row.top-clip.top-4;
   const reading=$('.readout.core-mob')?.getBoundingClientRect(); // a correction that cuts the outlook's heading clears the whole outlook (forecast pin keeps it)
   if(sc.scrollTop!==was&&reading&&reading.top<clip.top&&reading.bottom>clip.top)sc.scrollTop+=reading.bottom-clip.top+1;
   trayBase=sc.scrollTop;}
  pinNow();
  break;}
 /* v2.9.0 TRANSACTION BEAT: what the screen showed before the commit, for the draw after it (playCue) */
 case'sell':{const tile=$('.counter-tray .tray-icon'),seen={mode:el.dataset.mode,from:tile?(tile.querySelector('svg')||tile).getBoundingClientRect():null,icon:tile?tile.innerHTML:'',gold:s.money,tray:el.closest('.counter-tray'),
   stats:[...document.querySelectorAll('.detail-stats .detail-stat strong')].map(x=>x.textContent)};
  /* SALE §TRANSACTION RESULT — PER CUSTOMER (User 2026-09-24, v2.9.0): the customer's own Loyalty and Wallet
     before the commit, so the receipt stub can state the real result of this price choice. */
  const who=game.current(),wasM=who?who.money:0,wasL=who?who.loyalty:0;
  const success=game.sell(selected,el.dataset.mode);if(success){sound(el.dataset.mode==='overcharge'?'overcharge':el.dataset.mode==='half'?'half':'sale');selected=null;cue='sale';stub={loyalty:who.loyalty-wasL,from:wasM,to:who.money,mode:el.dataset.mode};}else{sound('refusal');cue='refuse';if(who.loyalty!==wasL)stub={loyalty:who.loyalty-wasL,refused:true};}handoff=seen;showStub();render();break;}
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
 case'coach-toggle':{const t=game.account.tutorial??={};if(t.skipped){t.skipped=false;for(const k of Object.keys(t))if(k.startsWith('coach-'))delete t[k];}else{t.skipped=true;$('#coach-root').innerHTML='';activeCoach=null;}game.save();sound('ui');render();
  // UI_UX §SETTINGS / DEBUG BOUNDARY: preparation returns before the settings panel refresh.
  if(!s||(s.phase==='end'&&prepOpen))renderModal();break;}
 case'sound':game.account.settings.muted=!game.account.settings.muted;game.save();sound('ui');render();
  // Preparation rendering returns before modal refresh; keep its mute label current too.
  if(!s||(s.phase==='end'&&prepOpen))renderModal();break;
 case'dismiss':if(preRunReturn&&modal==='codex'){preRunReturn=false;codexTab='items';sound('ui');setModal(null);break;}if(s?.phase==='foundation'||d0Owed())return;sound('ui');setModal(null);break;
 case'team':game.selectFinal(id);supplyNPC=s.team.includes(id)?id:s.team[0];sound('button');render();break;
 case'final-order-back':if(s.phase!=='final'||s.finalCommitted)break;finalOrdered=false;sound('button');render();break;
 case'final-ordered':finalOrdered=true;sound('button');render();break;
 case'final-npc':sound('ui');setModal('npc:'+id);break;
 case'final-roster':sound('ui');setModal('finalRoster');break;
 case'final-view':case'final-detail':sound('ui');setModal('npc:'+id);break;
 /* picked from the notebook, the choice is confirmed where the adventurer was read, and the muster shows it */
 case'final-team':game.selectFinal(id);supplyNPC=s.team.includes(id)?id:s.team[0];sound('button');setModal(null);render();break;
 /* FINAL-Q75 v2.8: a sub-3 party is a valid choice, confirmed once before the boundary */
 case'final-commit':if(s.team.length<3){setModal('underConfirm');break;}   // a full party falls through
 case'final-commit-go':game.commitFinalParty();supplyNPC=s.team[0];selected=null;setModal(null);sound('button');render();break;
 case'forecast-pin':pinFolded=!pinFolded;syncForecastPin();break;
 case'tray-open':trayFolded=false;syncTray();trayBase=$('.p-sale .stage-scroll')?.scrollTop||0;trayArm=performance.now()+300;sound('ui');break;
 case'final-pin':finalPinFolded=!finalPinFolded;{const pin=$('.final-pin');pin?.classList.toggle('folded',finalPinFolded);pin?.setAttribute('aria-expanded',String(!finalPinFolded));pin?.setAttribute('aria-label',finalPinFolded?'요약 열기':'요약 접기');watchFinalPin();}sound('ui');break;
 case'supply-target':supplyNPC=id;finalPinFolded=false;sound('button');render();break;
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
 case'boss-go':sound('final');game.boss();setModal(null);if(!clashScene()){render();sealSound();}break;
 case'retire':setModal('retireConfirm');break;
 case'retire-go':game.end(false,'운영비를 충당하지 못해 이번 점포를 마감했다.');sound('close');setModal(null);render();break;
 case'export':{const blob=new Blob([Save.export(game.account,s)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='guild24-save-day-'+(s?.day||0)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('저장 파일을 내보냈습니다.');break;}
 case'import':setModal('importConfirm');break;
 case'reset':setModal('resetConfirm');break;
 /* Nothing is touched until this point. Erasing every key and starting from Meta.fresh()
    is exactly the first-launch path, so no separate reset state exists to go stale. */
 case'reset-go':{const ok=Save.reset();game=new Game(Meta.fresh(),null);selected=null;pendingSeed=null;setModal(null);render();toast(ok?'전체 데이터가 초기화되었습니다. 새 점포를 시작합니다.':Save.error);break;}
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
const BLOCK_REASON={money:lack=>'발주 자금이 부족합니다. '+fmt(lack)+'G 부족.',relicMoney:lack=>'점포지원 후보 교환 자금이 부족합니다. '+fmt(lack)+'G 부족.',space:()=>'창고 칸이 부족합니다.',supply:()=>'오늘 공급 최대 수량입니다.',
 /* EVENT 42 본사 발주 제한 / 43 포스기 먹통 (v2.9.11) */
 cap:()=>'오늘은 발주 후보 한 칸에서 '+(game.run.event?.effects.orderCap||2)+'개까지만 발주할 수 있습니다.',noReroll:()=>'오늘은 발주 후보 교환을 할 수 없습니다.'};
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-action]');if(!el||el.disabled)return;
 if(el.getAttribute('aria-disabled')==='true'){const say=BLOCK_REASON[el.dataset.reason];if(say)toast(say(Number(el.dataset.lack||0)));return;}
 /* H2: a price key has its own press (KEY_PRESS, playCue) - the 정가 key's `stamp` class must not add a second one */
 if((el.classList.contains('stamp')||el.classList.contains('pull'))&&el.dataset.action!=='sell')stampPress(el);action(el);});
/* A tooltip is dismissed by tapping outside it, the way every other popover on the phone is.
   <details> closes on its own summary already, and the shared name closes a sibling, so this
   only has to handle the outside tap and Escape. */
const closeTips=except=>{for(const t of document.querySelectorAll('.tip[open]'))if(t!==except)t.open=false;};
/* UI_UX §ORDER — WAREHOUSE PANEL (User 2026-10-02): a warehouse cell's tip is one floating balloon on <body>, so neither the
   sheet's own scroll nor the desk column clips it. It sits right on its cell and points at it (above it, below when there is
   no room), and may cover the rack around it; kept inside the screen. Its lines are the offer row's own - name, kind · rarity, effects. Any scroll or resize closes it. */
function whPop(){const t=document.querySelector('.wh-tip[open]'),cell=t?.closest('.wh-slot');
 let p=document.getElementById('wh-pop');
 if(!t||!cell){if(p)p.hidden=true;return;}
 if(!p){p=document.createElement('div');p.id='wh-pop';p.setAttribute('role','tooltip');document.body.appendChild(p);}
 const it=D.itemBy[cell.dataset.item],rows=Presentation.rows(it.effects,undefined,it.category).slice(0,3);
 p.innerHTML='<b>'+E(it.name)+'</b><span class="kind">'+E(itemKind(it))+' · <i class="r'+it.rarity+'">'+E(D.rarities[it.rarity])+'</i></span>'
  +'<span class="fx">'+rows.map(r=>'<i class="'+(r.bad?'cost':'')+'">'+E(r.label+' '+r.text)+'</i>').join('<em> · </em>')+'</span>';
 p.hidden=false;
 const c=cell.getBoundingClientRect(),m=8,gap=9,w=p.offsetWidth,h=p.offsetHeight,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
 const above=c.top-gap-h>=m,x=cl(c.left+c.width/2-w/2,m,innerWidth-w-m),y=above?c.top-gap-h:Math.min(c.bottom+gap,innerHeight-h-m);
 p.dataset.side=above?'top':'bottom';p.style.left=x+'px';p.style.top=y+'px';
 p.style.setProperty('--at',cl(c.left+c.width/2-x,12,w-12)+'px');}
document.addEventListener('toggle',ev=>{if(ev.target.classList?.contains('wh-tip'))whPop();},true);
const whClose=()=>{for(const t of document.querySelectorAll('.wh-tip[open]'))t.open=false;whPop();};
addEventListener('scroll',whClose,{capture:true,passive:true});addEventListener('resize',whClose);
document.addEventListener('pointerdown',ev=>{const inside=ev.target.closest('.tip');closeTips(inside);
 /* a tap anywhere but the tray itself, a shelf row, the dock or an overlay folds the tray (UI_UX §SALE — COUNTER TRAY FOLD) */
 if(!ev.target.closest('.counter-tray,[data-action="select"],.dock,.sale-deep,#modal-root,#coach-root'))foldTray();},true);
/* The phone Deep disclosure sits below the shelf: folding on pointerdown would move its summary
   before pointerup and swallow the tap. Keep the outside-tap fold, after the native click. */
document.addEventListener('click',ev=>{if(ev.target.closest('.sale-deep'))setTimeout(foldTray,0);});
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
document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeTips(null);if(ev.key==='Escape'&&game.run?.phase==='order'&&sheetOpen())setStockSheet(false);if(ev.ctrlKey&&ev.shiftKey&&ev.code==='KeyD'&&game.run){ev.preventDefault();setModal('debug');return;}if(ev.key==='Escape'&&modal&&game.run?.phase!=='foundation'&&!d0Owed())setModal(null);if(ev.key==='Tab'&&modal){const els=[...$('#modal-root').querySelectorAll('button:not(:disabled),input,select,summary,[tabindex="0"]')].filter(e=>e.getClientRects().length),first=els[0],last=els.at(-1);if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last?.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first?.focus();}}});
$('#save-file').addEventListener('change',async ev=>{const file=ev.target.files[0];if(!file)return;try{const save=Save.import(await file.text());game=new Game(save.account,save.run);game.save();selected=null;setModal(null);render();toast('이어서 영업할 준비가 됐습니다.');}catch(e){toast('저장 파일을 읽지 못했습니다. '+e.message);}ev.target.value='';});
window.addEventListener('pagehide',()=>{game.save();Sound.sync(true,audioPhase());});document.addEventListener('visibilitychange',()=>{if(document.hidden)game.save();Sound.sync(game.account.settings.muted,audioPhase(),game.account.settings);Sound.wake();});
/* The two volume sliders. Dragging one is audible at once and saved when it is let go, so a
   drag is not a hundred writes to storage. Neither slider re-renders the screen: a redraw
   would replace the control under the pointer and end the drag. */
document.addEventListener('input',ev=>{const el=ev.target.closest('[data-mix]');if(!el)return;
 const key=el.dataset.mix,v=Math.min(100,Math.max(0,Number(el.value)||0))/100;
 game.account.settings[key]=v;
 el.style.setProperty('--mix-level',Math.round(v*100)+'%');
 Sound.sync(game.account.settings.muted,audioPhase(),game.account.settings);
 const out=$('#'+el.id+'-val');if(out)out.textContent=Math.round(v*100)+'%';});
document.addEventListener('change',ev=>{const el=ev.target.closest('[data-mix]');if(!el)return;
 game.save();if(el.dataset.mix==='sfx')sound('button');});
window.Guild24={get game(){return game;},render,build:BUILD,simulate:Debug.simulate,showDebug:()=>setModal('debug')};
/* Assets are preloaded before the first screen (ui/preload.js); the bar shows only when that takes a while. */
/* UI_UX §PROLOGUE: with no Run the prologue takes the loading screen's place; if it ends before the art is in, the
   loading screen comes back until it is. */
(()=>{const boot=$('#app').innerHTML;let ready=false;
 const loaded=Preload.run((n,t)=>{const bar=document.querySelector('.boot-bar');if(!bar)return;const pct=Math.round(n/t*100);bar.firstElementChild.style.width=pct+'%';bar.setAttribute('aria-valuenow',pct);});
 loaded.then(()=>{ready=true;},()=>{ready=true;});
 if(!game.run)startPrologue(()=>{if(ready)render();else{$('#app').innerHTML=boot;loaded.then(render,render);}});
 else loaded.then(render,render);})();
})();
