// Visual / mobile QA harness — UI-Q38 and the §8.1 boundary contract.
// Dev-only. Nothing under dist/ knows this file exists; it drives the shipped game
// from the outside through tools/preview.cjs. Never part of `npm test`.
// Chromium is preinstalled at /opt/pw-browsers — never run `playwright install`.
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
// The gate runs 360 / 390 / 430 x 780. QA_WIDTHS / QA_HEIGHT / QA_SCREENS sweep wider by
// hand — e.g. a landscape phone, a 320 handset, a tablet — without editing this file.
const list=(v,d)=>v?String(v).split(',').map(x=>x.trim()).filter(Boolean):d;
/* UI-Q-v28-26 minimum: 360 / 390 / 412 phone class, the 1024 breakpoint and a 1280-class
   desktop. 430 stays in the gate as an extra phone; it does not stand in for 412, and 1280
   does not stand in for 1024. */
const WIDTHS=list(process.env.QA_WIDTHS,[360,390,412,430,1024,1280]).map(Number);
const HEIGHT=Number(process.env.QA_HEIGHT||780),PORT=Number(process.env.QA_PORT||5199);
const CAPTURE_ONLY=process.env.QA_CAPTURE_ONLY==='1';
const FIXED_NOW=Number(process.env.QA_FIXED_NOW||1790112000000);
// D-35. The gate used to be phones only, so the width the game is most often played at was
// never audited. A desktop width is a different device, not a wide phone: no touch, a
// pointer, and a taller viewport. Anything at or past this is driven as a desktop.
const DESKTOP=Number(process.env.QA_DESKTOP_FROM||1024);
const isDesktop=w=>w>=DESKTOP;
const heightFor=w=>process.env.QA_HEIGHT?HEIGHT:(isDesktop(w)?880:HEIGHT);
const OUT=path.resolve(__dirname,'..',process.env.QA_OUT||'reports/ui');
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
// The seven phase screens, plus the five surfaces D-35 names that the gate never opened:
// the Event notice, the two endings, the codex and the store menu. Modal targets are driven
// to a phase and then opened, so what is audited is the takeover over the screen under it.
/* UI-Q-v28-26 names the full Player surface, so the gate opens all of it: the three surfaces
   that exist before a Run, the seven phase screens, every Boss-information beat, and each
   active modal/overlay. `relic` is Store Support and `final` is Final preparation. */
const SCREENS=list(process.env.QA_SCREENS,['opening','store','morning','order','sale','night','closing',
 'relic','final','end','endfail','event','codex','menu','help','settings',
 'boss5','boss10','boss15','boss20','boss25']);
const MODAL={event:'event',codex:'codex',menu:'menu'};
// Surfaces that exist before a Run does, so drive() stops before DAY 0.
const PRERUN=new Set(['opening','store']);
// The Boss-information beats. Each is a takeover over the Morning it belongs to, reached by
// holding its own seen flag unset on its own Day - never by rendering the plate by hand.
const BOSS_BEAT={boss5:[5,'identitySeen'],boss10:[10,'combatSeen'],boss15:[15,'traitSeen'],
                 boss20:[20,'routeSeen'],boss25:[25,'familySeen']};

// Page-side driver. Starts through the real UI, then advances days through the game's
// own public API, so every screenshot is the shipped build a player would see.
const STEP=`(()=>{
 const g=Guild24.game,s=g.run,D=DATA;
 if(s.phase==='morning'){g.beginOrder();return s.phase;}
 if(s.phase==='order'){
  const wanted=Math.min(s.offers.length,Math.max(3,s.queue.length));
  for(let i=0;i<wanted;i++){const o=s.offers[i];if(!o.quantity)continue;
   try{g.setQuantity(i,Math.min(2,o.quantity));}catch(e){}}
  try{g.confirmOrder();}catch(e){}g.open();return s.phase;}
 if(s.phase==='sell'){
  const n=g.current();let guard=0;
  while(n&&n.pack.length<Adventurer.slots(n)&&guard++<8){
   const st=s.inventory.find(st=>!n.refused.includes(st.item+':full')&&g.interest(n,D.itemBy[st.item],'full').debit<=n.money);
   if(!st)break;try{if(!g.sell(st.id,'full'))break;}catch(e){break;}}
  g.depart();return s.phase;}
 if(s.phase==='night'){g.finishNight();return s.phase;}
 if(s.phase==='closing'){while(s.money<0&&s.inventory.length)g.liquidate(s.inventory[0].id);g.closeDay();return s.phase;}
 return s.phase;
})`;

function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}

async function drive(page,target,seed){
 /* Presentation BEFORE / AFTER must render the same content state. Opening plannedSeed() uses
    Date.now() when no Run exists, so freeze the capture clock before app.js loads. This is
    harness-only and never changes Production Source or gameplay RNG. */
 await page.addInitScript(fixedNow=>{try{localStorage.clear();}catch(e){};Date.now=()=>fixedNow;},FIXED_NOW);
 await page.reload({waitUntil:'load'});
 /* The pre-Run panel used to carry a <details> holding a Seed field, and this drove it. SA-Q35
    retired that control as a dev surface, so both waits hung and the whole gate timed out before
    its first capture. app.js names the supported route in its place, so the harness takes it. */
 /* Plant the seed as the store the pre-Run panel is PLANNING - an unopened store keeps its own
    seed, which app.js states - then press the real button, so the first-run flow is still the
    real one and the Run it opens is deterministic. */
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
 /* opening / pre-Run / Store Management are captured BEFORE a Run exists, so they stop here. */
 if(PRERUN.has(target)){
  // drop back to the no-Run state, which is the opening backdrop under the preparation panel
  await page.evaluate(`(()=>{const g=Guild24.game;g.run=null;g.save();Guild24.render();})()`);
  await page.waitForTimeout(120);
  if(target==='store'){
   await page.click('#modal-root [data-action="store-manage"]');
   await page.waitForTimeout(150);}
  return;
 }
 await page.click('#modal-root [data-action="start"]');      // real first-run flow, on that seed
 await page.click('#modal-root [data-action="buy-relic"]'); // DAY 0 free store support
 // The coach marks are a first-use overlay; by the captured day a player has passed them.
 // UI-Q19/Q20 get their own capture below.
 if(target!=='coach')await page.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
 const until=async pred=>{for(let i=0;i<800;i++){if(await page.evaluate(pred))return true;await page.evaluate(`${STEP}()`);}return false;};
 /* D30 is a ~3% outcome under the approved balance, and this drive plays a cruder policy than
    the measured one: its Run ends legitimately around D15, by RUN FAIL, whatever seed it is
    handed. So the three Final captures are taken on a CONTROLLED D30 SETUP - the same device
    the canonical suite uses for its D30 window ladder - instead of searching seeds until one
    survives, which would make the capture a property of the seed rather than of the screen.
    Everything before the setup is the real path, the Day is moved once, and morning() opens
    the real FINAL phase; nothing about the screen captured is fabricated. */
 const beat=BOSS_BEAT[target];
 const d30=target==='final'||target==='end'||target==='endfail';
 let reached=await until(d30||beat?`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`:GOAL[target]);
 if(reached&&d30)reached=await page.evaluate(`(()=>{const g=Guild24.game;g.run.day=30;g.morning();Guild24.render();return g.run.phase==='final';})()`);
 /* The same CONTROLLED SETUP the D30 captures use, for the same reason: this drive plays a
    cruder policy than the measured one and its Run ends legitimately around D15, so D20 and
    D25 are unreachable by playing. The Day is moved once and morning() opens the real beat. */
 if(reached&&beat)reached=await page.evaluate(day=>{const g=Guild24.game;
   if(g.run.day<day){g.run.day=day;g.morning();}
   Guild24.render();return g.run.phase==='morning';},beat[0]);
 if(!reached)throw Error('could not drive the run to '+target);
 // A milestone Relic window, an Event day and each Boss reveal own one focused reveal.
 // Skipping days without rendering means marking as seen what a player would already
 // have seen; otherwise the capture is a takeover instead of the screen under it.
 // The Boss reveal sits ahead of the Relic window in the chain, so it has to be cleared
 // for every target - including `relic`, whose whole point is to capture the takeover
 // underneath it. Only the Relic window's own seen flag is target-specific.
 /* A Boss-beat capture is the one case where a reveal must NOT be cleared: every EARLIER beat
    is marked seen and this one is left unset, so bossRevealStage() lands on it and the takeover
    on screen is the beat itself over its own Morning. */
 if(beat)await page.evaluate(([day,flag])=>{const s=Guild24.game.run;if(s.event)s.eventSeen=true;
   const order=['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'];
   for(const f of order)s.bossReveal[f]=f!==flag;
   if(flag==='familySeen'&&!s.final)s.final=s.dungeons[0];
   Guild24.render();},beat);
 else await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.event)s.eventSeen=true;
   /* every beat, not the three this line used to name: the cadence grew to D0 / D5 / D10 / D15 /
      D20 / D25, and bossRevealStage() returns the EARLIEST unseen one, so an unnamed beat put its
      own plate over whatever surface was being captured on that Day. */
   if(s.bossReveal)for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;})()`);
 if(target!=='relic')await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;})()`);
 await page.evaluate(`Guild24.render()`);
 // The two endings. `end` sends whoever can go and takes what the Final gives; `endfail`
 // reaches D30 with nobody able to go, which the Final owns as its own failure. Neither
 // fabricates a report - both run the real path and capture the screen it leaves behind.
 if(target==='end'||target==='endfail'){
  if(target==='endfail')await page.evaluate(`(()=>{for(const n of Guild24.game.run.npcs)n.alive=false;})()`);
  else await page.evaluate(`(()=>{const g=Guild24.game;for(const n of g.finalEligible().slice(0,g.finalRequired()))g.selectFinal(n.id);})()`);
  await page.evaluate(`(()=>{Guild24.game.boss();Guild24.render();})()`);
  await page.waitForTimeout(150);
 }
 // The Event notice, the codex and the store menu are takeovers over a screen, reached the
 // way a player reaches them: the notice is still unseen on its Day, the other two are a click.
 if(target==='event')await page.evaluate(`(()=>{const s=Guild24.game.run;s.eventSeen=false;Guild24.render();})()`);
 if(['codex','menu','help','settings'].includes(target)){
  await page.evaluate(`(()=>{document.querySelector('[data-action="menu"]').click();})()`);
  await page.waitForTimeout(120);
  // Help and Settings are reached from the menu the way a player reaches them, not rendered by hand
  for(const leaf of ['codex','help','settings'])if(target===leaf){
   await page.evaluate(`(()=>{document.querySelector('#modal-root [data-action="${leaf}"]').click();})()`);
   await page.waitForTimeout(150);}
 }
 // The store-support window is a takeover, not a screen: force it open so the capture is
 // the thing itself and not the Morning behind it.
 if(target==='relic'){
  await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.relicWindow)s.relicWindow.focusedRevealSeen=false;Guild24.render();})()`);
  await page.waitForTimeout(120);
 }
 await page.waitForTimeout(150);
}

const GOAL={
 morning:`Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`,
 order:  `Guild24.game.run.day>=6&&Guild24.game.run.phase==='order'`,
 sale:   `Guild24.game.run.day>=6&&Guild24.game.run.phase==='sell'&&!!Guild24.game.current()`,
 night:  `Guild24.game.run.day>=6&&Guild24.game.run.phase==='night'&&Guild24.game.run.results.length>0`,
 closing:`Guild24.game.run.day>=6&&Guild24.game.run.phase==='closing'`,
 relic:  `Guild24.game.run.day===10&&Guild24.game.run.phase==='morning'`,
 final:  `Guild24.game.run.phase==='final'`,
 // the Event notice is the Morning opening beat, so it is captured on a Day that has one
 event:  `Guild24.game.run.phase==='morning'&&!!Guild24.game.run.event`,
 // both endings, driven to the screen a player is left on rather than faked
 end:    `Guild24.game.run.phase==='final'`,
 endfail:`Guild24.game.run.phase==='final'`,
 codex:  `Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`,
 menu:   `Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`,
 help:   `Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`,
 settings:`Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`,
 // each Boss beat is captured on the Morning of its own Day, with every earlier beat cleared
 ...Object.fromEntries(Object.entries(BOSS_BEAT).map(([k,[day]])=>
  [k,`Guild24.game.run.day>=${day}&&Guild24.game.run.phase==='morning'`]))
};

/* A capture is only evidence if it is the surface it claims to be. Each entry is something that
   exists on that surface and nowhere else, checked visible before anything else is judged. */
const EXPECT={
 opening:'.stage.p-start .opening-title, #modal-root .welcome-title',
 store:'#modal-root .decoration-panel',
 morning:'.stage.p-morning .band.counter',
 order:'.stage.p-order #order-register',
 sale:'.stage.p-sale .who',
 night:'.stage.p-night .beat',
 closing:'.stage.p-closing .tape',
 relic:'#modal-root [data-action="buy-relic"]',
 final:'.stage.p-final',
 end:'.stage.p-end', endfail:'.stage.p-end',
 event:'#modal-root [data-action="event-seen"]',
 codex:'#modal-root .unlock-grid, #modal-root .tabs',
 menu:'#modal-root [data-action="settings"]',
 help:'#modal-root .stack',
 settings:'#modal-root [data-mix]',
 boss5:'#modal-root [data-action="boss-seen"]',boss10:'#modal-root [data-action="boss-seen"]',
 boss15:'#modal-root [data-action="boss-seen"]',boss20:'#modal-root [data-action="boss-seen"]',
 boss25:'#modal-root [data-action="boss-seen"]'};
const PRESSURE={poison:'강인함',bind:'기동',corrosion:'강인함',mire:'기동',fire:'강인함',fear:'정신',dark:'정신',cold:'강인함',whiteout:'정신'};

async function audit(page,width,screen,desktop){
 return page.evaluate(({width,screen,PRESSURE,desktop,expect})=>{
  const fails=[],warn=[];
  // A takeover is the surface under audit when one is open: sweeping only `.stage` would
  // pass a modal that runs off the edge or stacks its own text.
  const ROOTS='.stage *, #modal-root *';
  const de=document.documentElement;
  if(de.scrollWidth>width+1)fails.push(`horizontal overflow: documentElement ${de.scrollWidth}px > ${width}px`);
  const body=document.querySelector('.stage-scroll,.board');
  if(body&&body.scrollWidth>body.clientWidth+1)fails.push(`scroll surface scrolls sideways (${body.scrollWidth}>${body.clientWidth})`);
  // an element is only on screen if it survives every clipping ancestor, not just the viewport:
  // content scrolled past the end of a scroll surface is clipped, never overlapping the dock
  const vis=el=>{
   const r=el.getBoundingClientRect();
   if(r.width<=0||r.height<=0||r.bottom<=0||r.top>=innerHeight)return false;
   // A closed <details> still lays its content out in Chromium: the rects are real, the
   // pixels are not. Nothing inside one is on screen until the player opens it.
   for(let d=el.closest('details');d;d=d.parentElement?.closest('details'))
    if(!d.open&&!el.closest('summary'))return false;
   for(let n=el.parentElement;n&&n!==document.body;n=n.parentElement){
    const o=getComputedStyle(n);
    if(o.overflowY==='visible'&&o.overflowX==='visible')continue;
    const c=n.getBoundingClientRect();
    if(r.bottom<=c.top+1||r.top>=c.bottom-1||r.right<=c.left+1||r.left>=c.right-1)return false;
   }
   return true;};
  // the rect a player can actually see: intersected with every clipping ancestor, so a row
  // half-scrolled under the dock is not reported as overlapping it
  const clip=el=>{
   let r=el.getBoundingClientRect();
   let box={left:r.left,top:r.top,right:r.right,bottom:r.bottom};
   for(let n=el.parentElement;n&&n!==document.body;n=n.parentElement){
    const o=getComputedStyle(n);
    if(o.overflowY==='visible'&&o.overflowX==='visible')continue;
    const c=n.getBoundingClientRect();
    box={left:Math.max(box.left,c.left),top:Math.max(box.top,c.top),
         right:Math.min(box.right,c.right),bottom:Math.min(box.bottom,c.bottom)};
   }
   return box;};
  const name=el=>(typeof el.className==='string'?el.className:el.getAttribute('class'))||el.tagName;
  // shapes inside an <svg> are clipped by its viewport, so they are not layout overflow
  const layout=el=>!el.closest('svg');
  for(const el of document.querySelectorAll(ROOTS)){
   if(!vis(el)||!layout(el))continue;
   const r=el.getBoundingClientRect();
   if(r.right>width+1)fails.push(`past the right edge: ${name(el)} right=${Math.round(r.right)}`);
   if(r.left<-1)fails.push(`past the left edge: ${name(el)} left=${Math.round(r.left)}`);
   if(fails.length>6)break;
  }
  // an element must stay inside the material it belongs to
  const contained=[['.tag-art','.form'],['.daysign','.band.ceiling'],['.till','.band.counter'],
                   ['.slip','.board'],['.dial','.line'],['.ledger','.form']];
  for(const [inner,outer] of contained){
   for(const el of document.querySelectorAll(inner)){
    if(!vis(el))continue;
    const host=el.closest(outer)||document.querySelector(outer);
    if(!host)continue;
    const a=clip(el),b=host.getBoundingClientRect();
    if(a.right>b.right+1.5||a.left<b.left-1.5||a.bottom>b.bottom+1.5||a.top<b.top-1.5)
     fails.push(`${inner} leaves ${outer} (${Math.round(a.left)},${Math.round(a.top)},${Math.round(a.right)},${Math.round(a.bottom)} vs ${Math.round(b.left)},${Math.round(b.top)},${Math.round(b.right)},${Math.round(b.bottom)})`);
   }
  }
  // no two pieces of text may sit on top of each other
  // scrolling content passing under an opaque pinned layer is not a collision, so only
  // compare text that shares a layer
  const pinned=el=>{for(let n=el;n&&n!==document.body;n=n.parentElement){
   const p=getComputedStyle(n).position;if(p==='sticky'||p==='fixed')return true;}return false;};
  // A takeover paints over the screen it opened from. Text on the screen underneath is not
  // colliding with the modal's text - it is behind it - so the two are never compared.
  const surface=el=>el.closest('#modal-root')?'modal':'stage';
  const leaves=[...document.querySelectorAll(ROOTS)].filter(el=>vis(el)&&layout(el)
   &&el.children.length===0&&(el.textContent||'').trim().length>1
   &&getComputedStyle(el).position!=='absolute');
  const layer=new Map(leaves.map(el=>[el,pinned(el)]));
  // An inline run that wraps has one box per line; its bounding rect is the union of them
  // and spills across lines it does not occupy, which reads as a collision that is not
  // there. Compare the per-line boxes instead.
  const boxes=el=>{const c=clip(el),out=[];
   for(const r of el.getClientRects()){
    const b={left:Math.max(r.left,c.left),right:Math.min(r.right,c.right),
             top:Math.max(r.top,c.top),bottom:Math.min(r.bottom,c.bottom)};
    if(b.right>b.left&&b.bottom>b.top)out.push(b);}
   return out.length?out:[c];};
  const rects=new Map(leaves.map(el=>[el,boxes(el)]));
  outer:for(let i=0;i<leaves.length;i++)for(let j=i+1;j<leaves.length;j++){
   if(layer.get(leaves[i])!==layer.get(leaves[j]))continue;
   if(surface(leaves[i])!==surface(leaves[j]))continue;
   if(leaves[i].contains(leaves[j])||leaves[j].contains(leaves[i]))continue;
   for(const a of rects.get(leaves[i]))for(const b of rects.get(leaves[j])){
    const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left),oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
    if(ox>4&&oy>4){fails.push(`text collision: "${(leaves[i].textContent||'').trim().slice(0,10)}" over "${(leaves[j].textContent||'').trim().slice(0,10)}"`);
     if(fails.length>10)break outer;}
   }
  }
  // the customer card: the frame, the nameplate and the payload must stay in register at
  // every width and height, not only the ones the card was drawn at
  const face=document.querySelector('.who .face');
  if(face){
   const fr=face.getBoundingClientRect(),cs=getComputedStyle(face);
   const inset=parseFloat(cs.paddingLeft)||0;
   const plate=face.querySelector('.nameplate'),port=face.querySelector('.portrait'),art=face.querySelector('.figure');
   if(plate){
    const p=plate.getBoundingClientRect();
    if(p.left<fr.left+inset-2.5||p.right>fr.right-inset+2.5||p.bottom>fr.bottom-inset+2.5||p.top<fr.top+inset-2.5)
     fails.push(`nameplate out of the card frame (plate ${Math.round(p.left)},${Math.round(p.top)},${Math.round(p.right)},${Math.round(p.bottom)} vs card inset ${Math.round(fr.left+inset)},${Math.round(fr.top+inset)},${Math.round(fr.right-inset)},${Math.round(fr.bottom-inset)})`);
   }
   if(plate&&port){
    const p=plate.getBoundingClientRect(),q=port.getBoundingClientRect();
    if(q.bottom>p.top+0.5)fails.push(`the portrait box overlaps the nameplate by ${Math.round(q.bottom-p.top)}px`);
   }
   // The payload used to be required to overhang the card, which suited placeholder stickers
   // that carried their own transparent margin. The production portraits have almost none -
   // median under 2%, many zero on every side - so overhanging meant painted artwork leaving
   // the frame. It is now required to stay inside it, still square and still clear of the plate.
   if(art&&plate){
    const a=art.getBoundingClientRect(),p=plate.getBoundingClientRect();
    if(a.bottom>p.top+0.5)fails.push(`the NPC payload runs into the nameplate by ${Math.round(a.bottom-p.top)}px`);
    if(Math.abs(a.width-a.height)>1.5)fails.push(`the NPC payload box is not square: ${Math.round(a.width)}x${Math.round(a.height)}`);
    const out={left:fr.left-a.left,right:a.right-fr.right,top:fr.top-a.top,bottom:a.bottom-fr.bottom};
    for(const [side,px] of Object.entries(out))
     if(px>1)fails.push(`the NPC payload leaves the card at the ${side} by ${Math.round(px)}px`);
    if(a.width<fr.width*.8)fails.push(`the NPC payload is much narrower than the card (${Math.round(a.width)} vs ${Math.round(fr.width)}): it reads as sealed in`);
   }
   const front=document.querySelector('.front');
   if(front&&art){
    const a=art.getBoundingClientRect(),f=front.getBoundingClientRect();
    if(a.top<f.top-0.5)fails.push(`the NPC payload is clipped by the shop front by ${Math.round(f.top-a.top)}px`);
   }
   const wait=document.querySelector('.line-up .wait');
   if(wait){
    const w=wait.getBoundingClientRect(),rf=fr.width/fr.height,rw=w.width/w.height;
    if(Math.abs(rf-rw)>0.05)fails.push(`the revealed card and the waiting backs are not one deck: ${rf.toFixed(2)} vs ${rw.toFixed(2)}`);
   }
  }
  const bar=document.querySelector('.dock');
  if(bar&&bar.children.length){
   const r=bar.getBoundingClientRect();
   if(r.bottom>innerHeight+1)fails.push(`dock below the fold (bottom=${Math.round(r.bottom)}, viewport=${innerHeight})`);
  }
  const REPEATED='.dial button,.tills button,.good,.npc-card,.rubber,.dock button,.slip,.set button';
  for(const el of document.querySelectorAll('button:not(:disabled), summary')){
   const r=el.getBoundingClientRect();
   if(!r.width||!r.height||!vis(el))continue;
   const primary=el.matches(REPEATED);
   const floor=desktop?32:43.5;
   if(primary&&(r.height<floor||r.width<floor))
    fails.push(`${desktop?'click':'touch'} target ${Math.round(r.width)}x${Math.round(r.height)}: ${(el.textContent||'').trim().slice(0,14)}`);
   else if(!primary&&(r.height<(desktop?24:32)||r.width<(desktop?24:32)))
    warn.push(`small secondary target ${Math.round(r.width)}x${Math.round(r.height)}: ${(el.textContent||'').trim().slice(0,14)}`);
   if(fails.length>12)break;
  }
  const named=[...document.querySelectorAll('.hazards li')];
  for(const li of named){
   const key=li.dataset.hazard,note=(li.querySelector('span')?.textContent||'').trim();
   if(!key)continue;
   if(!note)fails.push(`hazard ${key} has no pressure line`);
   else if(!note.includes(PRESSURE[key]))fails.push(`hazard ${key} pressure line reads "${note}"`);
  }
  if(['morning','sale','final'].includes(screen)&&!named.length)warn.push('no hazard rows rendered on this capture');
  for(const el of document.querySelectorAll('.stage [title], #modal-root [title]'))fails.push(`hover-only title= on ${el.className||el.tagName}`);

  /* ---- UI-Q-v28-26, the PASS rows this sweep did not yet decide ------------------------- */

  // the capture has to BE the surface it is filed under, or nothing above it is evidence
  if(expect){
   const sig=[...document.querySelectorAll(expect)].find(vis);
   if(!sig)fails.push(`surface not reached: nothing matching "${expect}" is visible`);
  }

  // "no fixed header/dock/modal covers decision information". Scrolling content UNDER a dock
  // is correct; content that stays under it once the surface is scrolled to its end is not.
  const modalOpen=!!document.querySelector('#modal-root .modal');
  const scroller=document.querySelector('.stage-scroll');
  const dock2=document.querySelector('.stage .dock');
  // a takeover paints over the dock, so a modal's own scroll end is never measured against it
  if(!modalOpen&&scroller&&dock2&&dock2.children.length&&scroller.scrollHeight>scroller.clientHeight+2){
   const was=scroller.scrollTop;
   scroller.scrollTop=scroller.scrollHeight;
   const d=dock2.getBoundingClientRect();
   for(const el of document.querySelectorAll(ROOTS)){
    if(!vis(el)||!layout(el)||el.children.length||!(el.textContent||'').trim())continue;
    if(el.closest('.dock'))continue;
    const r=clip(el);
    if(r.bottom>d.top+3&&r.top<d.bottom-3&&r.right>d.left&&r.left<d.right){
     fails.push(`dock still covers "${(el.textContent||'').trim().slice(0,14)}" at the end of the scroll`);
     break;}
   }
   scroller.scrollTop=was;
  }

  // "transient content does not reserve permanent empty height after it disappears"
  for(const sel of ['#toast','.say','.speech','.coach-bubble']){
   for(const el of document.querySelectorAll(sel)){
    const cs=getComputedStyle(el),r=el.getBoundingClientRect();
    const showing=cs.visibility!=='hidden'&&cs.opacity!=='0'&&cs.display!=='none';
    if(showing||cs.position==='fixed'||cs.position==='absolute')continue;
    if(r.height>2)fails.push(`${sel} is hidden but still reserves ${Math.round(r.height)}px of height`);
   }
  }

  /* "no avoidable blank/dead region caused by grid/flex track stretching or oversized
     wrappers". Measured only where content is laid out, never on the store scene, whose bands
     are proportional artwork and are SUPPOSED to own their height. A surface that scrolls has
     no dead space by definition - the gap is only dead when there is nothing left to reveal. */
  const DEAD=Math.max(140,Math.round(innerHeight*.22));
  for(const box of document.querySelectorAll('#modal-root .modal-body, .stage-scroll, .board')){
   if(!vis(box)||box.closest('.store'))continue;
   // when a takeover owns the screen, the stage behind it is backdrop, not the audited surface
   if(modalOpen&&!box.closest('#modal-root'))continue;
   if(box.scrollHeight>box.clientHeight+2)continue;
   const kids=[...box.children].filter(vis);
   if(!kids.length)continue;
   const cs=getComputedStyle(box),b=box.getBoundingClientRect();
   const top=b.top+(parseFloat(cs.paddingTop)||0),bottom=b.bottom-(parseFloat(cs.paddingBottom)||0);
   const first=Math.min(...kids.map(k=>k.getBoundingClientRect().top));
   const last=Math.max(...kids.map(k=>k.getBoundingClientRect().bottom));
   if(first-top>DEAD)fails.push(`dead region above the content of ${name(box)}: ${Math.round(first-top)}px`);
   if(bottom-last>DEAD)fails.push(`dead region below the content of ${name(box)}: ${Math.round(bottom-last)}px`);
  }

  /* "desktop does not become a stretched phone layout with excessive empty width/height".
     Only meaningful where a real column exists, so it is read off the laid-out content rather
     than the full-bleed scene: a desktop surface whose content uses under a third of the width
     it was given is a phone column stretched onto a desktop. */
  if(desktop){
   const col=document.querySelector('#modal-root .modal-body')||document.querySelector('.stage-scroll');
   if(col&&vis(col)&&!col.closest('.store')&&!(modalOpen&&!col.closest('#modal-root'))){
    const kids=[...col.querySelectorAll(':scope > *')].filter(vis);
    if(kids.length){
     const l=Math.min(...kids.map(k=>k.getBoundingClientRect().left));
     const r2=Math.max(...kids.map(k=>k.getBoundingClientRect().right));
     const c=col.getBoundingClientRect();
     if(c.width>420&&(r2-l)<c.width*.34)
      /* Reported, not failed: "excessive empty width" is a judgement the measure can only
         point at. A receipt or a ledger is narrow because it is that object, and calling that a
         FAIL would be the harness deciding Design. DIRECTOR reads these against the capture. */
      warn.push(`desktop column uses ${Math.round(r2-l)}px of ${Math.round(c.width)}px: check for a stretched phone layout`);
    }
   }
  }

  /* "no duplicated label/count/explanation competes with the same fact elsewhere on the
     surface". Two visible leaves carrying the same sentence is the checkable half of that; a
     bare number or a one-word control label repeats for good reasons, so only real phrases
     count, and a leaf inside a list of peers (a row repeated per item) is not a duplicate. */
  const phrase=el=>(el.textContent||'').replace(/\s+/g,' ').trim();
  const seen=new Map();
  for(const el of leaves){
   const t=phrase(el);
   if(t.length<8||!/[가-힣]/.test(t))continue;
   if(el.closest('li,tr,.good,.npc-card,.slip,.unlock,.trait-row,.effects,.fams'))continue;
   const key=surface(el)+'|'+t;
   if(seen.has(key)){fails.push(`the same line is stated twice on this surface: "${t.slice(0,24)}"`);
    if(fails.length>14)break;}
   else seen.set(key,el);
  }
  return {fails,warn};
 },{width,screen,PRESSURE,desktop,expect:EXPECT[screen]||null});
}

// Keyboard focus across a redraw. Not a capture: it drives real presses and reads
// document.activeElement, so it lives here, where a real browser is already running, and
// not in the DOM-less node suite. #app is replaced wholesale on every redraw, so focus has
// to be put back by hand — and the handle has to name one control, not a class of them.
/* FINAL-Q70 / REL-Q78 interaction ordering. Not "the string is in app.js": the Run is driven to
   a real D25 Morning in a real browser, and what the player can actually touch is read off the
   DOM. The Final disclosure has to own the screen BEFORE the D25 Relic window, because that
   window is the decision the disclosure exists to inform. D30 then reuses the state and must not
   reveal a Family again. */
async function d25OrderProbe(page){
 const fails=[];
 /* Its own page, deliberately: drive() installs an init script that clears localStorage on
    every navigation, and this probe has to reload INTO a saved Run to prove the disclosure is
    not replayed. */
 await page.evaluate(`(()=>{try{localStorage.clear();}catch(e){}})()`);
 await page.reload({waitUntil:'load'});
 await page.waitForTimeout(200);
 // same retired Seed control as drive(): plant the planned store, then press the real button
 await page.evaluate(`(()=>{Guild24.game.start('qa-d25-order');Guild24.render();})()`);
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{const g=Guild24.game;g.account.tutorial.skipped=true;
  /* every earlier reveal already seen, so what is on screen at D25 is the D25 beat alone.
     The cadence grew after this probe was written - D0, D10 and D20 joined D5 / D15 - and
     bossRevealStage() returns the EARLIEST unseen beat, so leaving any of them unset put D10
     on screen at Day 25 and read as a missing D25 disclosure. Clear them all but familySeen. */
  Object.assign(g.run.bossReveal,{d0Seen:true,identitySeen:true,combatSeen:true,traitSeen:true,routeSeen:true});
  g.run.day=25;g.morning();g.save();Guild24.render();})()`);
 await page.waitForTimeout(150);

 const seen=async()=>page.evaluate(`(()=>{const m=document.querySelector('#modal-root');
  return {title:(m.querySelector('h2,h3')?.textContent||'').trim(),
   family:!!m.querySelector('.boss-reveal.final .fam-card'),
   relicTakeover:!!m.querySelector('.relic-takeover,[data-action="buy-relic"]'),
   buyable:[...m.querySelectorAll('[data-action="buy-relic"]')].filter(b=>!b.disabled).length,
   ack:!!m.querySelector('[data-action="boss-seen"]')};})()`);

 const atD25=await seen();
 if(!atD25.family)fails.push('D25 did not disclose the Final Family Pair (modal title: "'+atD25.title+'")');
 if(!atD25.ack)fails.push('the D25 disclosure has no acknowledgement the player can press');
 if(atD25.buyable)fails.push(`a D25 store support could be bought before the Final disclosure (${atD25.buyable} live buttons)`);

 const families=await page.evaluate(`JSON.stringify(Guild24.game.run.final.families)`);
 const pool=await page.evaluate(`JSON.stringify([...Guild24.game.run.final.hazards].sort())`);

 // acknowledging it is what hands the Day over to the Relic window. If there is nothing to
 // acknowledge the disclosure never happened, which the fails above already say - report them
 // rather than timing out on a button that is not there.
 if(!atD25.ack)return {fails};
 await page.click('#modal-root [data-action="boss-seen"]');
 await page.waitForTimeout(150);
 const after=await seen();
 if(after.family)fails.push('the disclosure repeated itself after being acknowledged');
 if(!after.relicTakeover)fails.push('acknowledging the disclosure did not hand the Day to the D25 Relic window');

 // a reload cannot replay the disclosure, and cannot reroll what it disclosed
 await page.evaluate(`Guild24.game.save()`);
 await page.reload({waitUntil:'load'});
 await page.waitForTimeout(200);
 if(!await page.evaluate(`!!Guild24.game.run`)){fails.push('the Run did not survive a reload at all');return {fails};}
 const reloaded=await seen();
 if(reloaded.family)fails.push('a reload replayed the D25 disclosure');
 if(await page.evaluate(`JSON.stringify(Guild24.game.run.final.families)`)!==families)
  fails.push('a reload rerolled the Family Pair');
 if(await page.evaluate(`JSON.stringify([...Guild24.game.run.final.hazards].sort())`)!==pool)
  fails.push('a reload rerolled the Final Hazard Pool');

 // D30 consumes the same state and stages no second Family reveal
 await page.evaluate(`(()=>{const g=Guild24.game;g.run.day=30;g.morning();Guild24.render();})()`);
 await page.waitForTimeout(200);
 const d30=await seen();
 if(d30.family)fails.push('D30 revealed the Families a second time');
 if(await page.evaluate(`JSON.stringify(Guild24.game.run.dungeons[0].families)`)!==families)
  fails.push('the D30 Final Gate is not the state disclosed on D25');
 return {fails};
}

/* UI-Q-v28-27 — the two CONTEXTUAL coach steps. Every other lesson is on a screen the gate
   already opens, but a Deep notice and a Great Success signal exist only on some Days, so the
   marks that teach them were never driven in a browser. Each is brought up the way a player
   meets it, then the overlay is measured: what the text says, what is actually highlighted,
   what the cutout holds, and what the bubble is sitting on top of. */
const COACH_READY=`(()=>{const el=document.querySelector('#coach-root .coach-focus');
 if(!el)return false;const b=document.querySelector('#coach-root .coach-bubble');return !!b;})()`;

async function coachStep(page,phase,stepId,label){
 // mark every step of this phase BEFORE the one under test as seen, so it is the one shown
 await page.evaluate(([phase,stepId])=>{
  const t=Guild24.game.account.tutorial??={};delete t.skipped;
  const ids=(window.__coachIds&&window.__coachIds[phase])||[];
  for(const id of ids){if(id===stepId)break;t['coach-'+id]=true;}
  delete t['coach-'+stepId];
  Guild24.game.save();Guild24.render();},[phase,stepId]);
 for(let i=0;i<40;i++){if(await page.evaluate(COACH_READY))break;await page.waitForTimeout(50);}
 return page.evaluate(([stepId,label])=>{
  const r=el=>{const b=el.getBoundingClientRect();
   return {left:Math.round(b.left),top:Math.round(b.top),right:Math.round(b.right),bottom:Math.round(b.bottom),
           width:Math.round(b.width),height:Math.round(b.height)};};
  const focus=document.querySelector('#coach-root .coach-focus');
  const bubble=document.querySelector('#coach-root .coach-bubble');
  if(!focus||!bubble)return {stepId,label,missing:true};
  const step=(window.__coachSteps||[]).find(x=>x[0]===stepId);
  const sel=step?step[1]:null;
  const all=sel?[...document.querySelectorAll(sel)]:[];
  const shown=all.filter(e=>e.getClientRects().length);
  const dock=document.querySelector('.stage .dock');
  const next=bubble.querySelector('[data-action="coach-next"]');
  return {stepId,label,missing:false,
   copy:(bubble.querySelector('p')?.textContent||'').trim(),
   expected:step?step[2]:null,
   selector:sel,matches:all.length,visibleMatches:shown.length,
   target:shown.length?r(shown[0]):null,
   focus:r(focus),bubble:r(bubble),
   dock:dock?r(dock):null,next:next?r(next):null,
   viewport:{w:innerWidth,h:innerHeight}};},[stepId,label]);
}

function judgeCoach(info,fails,warn){
 const at=info.label+' '+info.stepId;
 if(info.missing){fails.push(`${at}: the coach never painted for this step`);return;}
 if(!info.visibleMatches){fails.push(`${at}: nothing matching ${info.selector} is visible to highlight`);return;}
 if(info.copy!==info.expected)fails.push(`${at}: the bubble reads "${info.copy.slice(0,24)}" but the step teaches "${(info.expected||'').slice(0,24)}"`);
 if(info.matches>info.visibleMatches&&info.visibleMatches===0)
  fails.push(`${at}: only the hidden breakpoint duplicate matched`);
 const t=info.target,f=info.focus,b=info.bubble;
 // the cutout must hold the whole meaningful target
 const pad=6;
 if(t.left<f.left-pad||t.right>f.right+pad||t.top<f.top-pad||t.bottom>f.bottom+pad)
  fails.push(`${at}: the spotlight cuts the target (target ${t.left},${t.top},${t.right},${t.bottom} vs cutout ${f.left},${f.top},${f.right},${f.bottom})`);
 // ...without swallowing the neighbourhood
 const ta=Math.max(1,t.width*t.height),fa=f.width*f.height;
 if(fa>ta*2.6+8000)warn.push(`${at}: the cutout is ${(fa/ta).toFixed(1)}x the target area`);
 // the bubble may not cover the target, the cutout, or the next required control
 const hit=(a,c)=>a&&c&&Math.min(a.right,c.right)-Math.max(a.left,c.left)>4&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>4;
 if(hit(b,f))fails.push(`${at}: the bubble covers its own spotlight`);
 if(hit(b,info.dock))fails.push(`${at}: the bubble covers the dock, which holds the next required control`);
 // after the automatic scroll both have to still be readable together
 const on=x=>x.bottom>0&&x.top<info.viewport.h&&x.right>0&&x.left<info.viewport.w;
 if(!on(t))fails.push(`${at}: the target is off screen after the automatic scroll`);
 if(!on(b))fails.push(`${at}: the bubble is off screen after the automatic scroll`);
 if(!info.next||info.next.width<=0)fails.push(`${at}: the bubble offers no way on`);
}

async function coachProbe(page,label){
 const fails=[],warn=[],captured=[];
 // publish the shipped step table to the page so the probe reads the real copy and selectors
 await page.addInitScript(()=>{
  addEventListener('load',()=>{try{
   const src=[...document.scripts].map(x=>x.src).find(x=>/app\.js$/.test(x));
   fetch(src).then(r=>r.text()).then(t=>{
    const body=t.slice(t.indexOf('const coachSteps={'),t.indexOf('let activeCoach=null;'));
    window.__coachTable=new Function('return '+body.replace(/^const coachSteps=/,'').replace(/;\s*$/,''))();
   });}catch(e){}});});
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(`!!window.Guild24&&!!window.__coachTable`);

 // ---- Deep Expedition coach: a Morning that actually carries a Deep notice
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-coach-'+label);
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{const g=Guild24.game;g.account.tutorial.skipped=true;g.save();})()`);
 let reached=false;
 for(let i=0;i<900;i++){
  if(await page.evaluate(`Guild24.game.run.phase==='morning'&&!!Guild24.game.run.deep?.today`)){reached=true;break;}
  await page.evaluate(`${STEP}()`);
 }
 if(!reached)fails.push(`${label}: no Morning in this Run carried a Deep Expedition notice`);
 else{
  await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.event)s.eventSeen=true;
   if(s.bossReveal)for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
   if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;Guild24.render();})()`);
  await page.evaluate(`(()=>{window.__coachIds={};for(const k of Object.keys(window.__coachTable))window.__coachIds[k]=window.__coachTable[k].map(x=>x[0]);
   window.__coachSteps=window.__coachTable[Guild24.game.run.phase]||[];})()`);
  const info=await coachStep(page,'morning','deep',label);
  captured.push(info);judgeCoach(info,fails,warn);
  /* a contextual mark that has no target must not hold back the lessons behind it: clear the
     notice, leave the Deep step unseen, and the NEXT phase's lessons still have to appear */
  await page.evaluate(`(()=>{const g=Guild24.game;g.run.deep.today=null;
   delete g.account.tutorial['coach-deep'];g.account.tutorial['coach-visitors']=true;
   g.account.tutorial['coach-gates']=true;g.save();g.beginOrder();Guild24.render();
   window.__coachSteps=window.__coachTable[g.run.phase]||[];})()`);
  await page.waitForTimeout(250);
  const after=await page.evaluate(`(()=>{const b=document.querySelector('#coach-root .coach-bubble');
   return {phase:Guild24.game.run.phase,copy:(b?.querySelector('p')?.textContent||'').trim()};})()`);
  const orderFirst=await page.evaluate(`window.__coachTable.order[0][2]`);
  if(after.phase!=='order')fails.push(`${label}: could not reach ORDER to prove the skip does not block`);
  else if(after.copy!==orderFirst)
   fails.push(`${label}: an absent Deep target blocked the next lesson (ORDER showed "${after.copy.slice(0,24)}")`);
 }

 /* ---- Great Success coach: a counter where the signal is actually up.
    Its own Run - the Deep segment above has already played this one out - and a CONTROLLED
    SETUP, the same device the D30 captures use and for the same reason: the signal needs a
    customer prepared well past their Gate, which this crude driver does not reliably reach
    inside one Run. The NPC's own Stats are raised at a REAL counter and then a REAL sale is
    committed, so the signal is still computed by the shipped Dungeon.greatSuccessSignal off a
    real prepared snapshot. Nothing about the mark, its target or its copy is fabricated. */
 // a fresh Run, opened through the same real first-run flow the Deep segment used: start()
 // alone leaves the store on its DAY 0 support choice, which the step driver cannot advance
 await page.evaluate(`(()=>{const g=Guild24.game;g.run=null;g.save();})()`);
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(`!!window.Guild24&&!!window.__coachTable`);
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-coach-great-'+label);
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{const g=Guild24.game;g.account.tutorial.skipped=true;g.save();Guild24.render();})()`);
 // walk counters until one of them raises the signal: which Items a Day happens to stock is a
 // property of the seed, and the lesson is not
 let signal=false;
 for(let i=0;i<400&&!signal;i++){
  if(await page.evaluate(`Guild24.game.run.phase==='end'`))break;
  if(await page.evaluate(`Guild24.game.run.phase==='sell'&&!!Guild24.game.current()&&!!Guild24.game.current().outlook`)){
   signal=await page.evaluate(`(()=>{const g=Guild24.game,s=g.run,D=DATA,n=g.current();
     for(const k of Adventurer.keys)n.stats[k]=Math.max(n.stats[k],90);
     n.level=Math.max(n.level,12);
     const st=s.inventory.find(st=>!n.refused.includes(st.item+':full')&&g.interest(n,D.itemBy[st.item],'full').debit<=n.money);
     if(st){try{g.sell(st.id,'full');}catch(e){}}
     Guild24.render();return !!g.current()?.outlook?.greatSignal;})()`);
   if(signal)break;}
  await page.evaluate(`${STEP}()`);
 }
 if(signal){
  // the same takeovers the Deep capture clears, for the same reason: showCoach stands down
  // while a modal owns the screen, so the mark would never paint under one
  await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.event)s.eventSeen=true;
   if(s.bossReveal)for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
   if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;
   window.__coachIds={};for(const k of Object.keys(window.__coachTable))window.__coachIds[k]=window.__coachTable[k].map(x=>x[0]);
   window.__coachSteps=window.__coachTable[s.phase]||[];Guild24.render();})()`);
  await page.waitForTimeout(150);
 }
 if(!signal)fails.push(`${label}: no customer in this Run raised a Great Success signal to teach`);
 else{
  await page.evaluate(`(()=>{window.__coachSteps=window.__coachTable[Guild24.game.run.phase]||[];})()`);
  const info=await coachStep(page,'sell','great',label);
  captured.push(info);judgeCoach(info,fails,warn);
 }
 return {fails,warn,captured};
}

async function focusProbe(page){
 const fails=[],warn=[];
 const where=()=>page.evaluate(`(()=>{const el=document.activeElement;if(!el)return {tag:'none'};
  return {tag:el.tagName,id:el.id||'',action:el.dataset.action||'',index:el.dataset.index??'',
   text:(el.textContent||'').trim().slice(0,12),inModal:!!el.closest('#modal-root')};})()`);

 await drive(page,'order','qa-focus-keyboard');
 const dial=await page.evaluate(`document.querySelectorAll('#app [data-action="qty"]').length`);
 if(dial<6)fails.push(`the quantity dial rendered ${dial} controls; the probe needs the order screen`);
 else{
  // the densest repeat control in the game: every button here shares one data-action and
  // carries no data-id, so a first-match restore lands on the wrong product's minus key.
  // Pick the LAST row the store can afford to raise TWICE. Raising a row to its own cap
  // disables the + that was just pressed, and a disabled button cannot hold focus - the
  // fall to its live neighbour is the designed behaviour, and the next case below is what
  // tests it. Probing a row whose offer stocks one unit turns that into a false failure.
  const last=await page.evaluate(`(()=>{const all=[...document.querySelectorAll('#app [data-action="qty"]')];
   const rows=all.filter(x=>x.textContent.trim()==='+'&&!x.disabled).map(x=>Number(x.dataset.index))
    .filter(i=>{const plus=all.filter(x=>x.dataset.index===String(i)&&x.textContent.trim()==='+')[0];
     const cap=all.filter(x=>x.dataset.index===String(i)&&x.textContent.trim()==='최대')[0];
     return plus&&cap&&Number(cap.dataset.q)>=Number(plus.dataset.q)+1;});
   return rows.length?Math.max(...rows):-1;})()`);
  if(last<0)warn.push('no quantity row on this order screen can be raised twice; the same-view restore was not probed');
  else{
  await page.evaluate(`(()=>{const b=[...document.querySelectorAll('#app [data-action="qty"]')]
   .filter(x=>x.dataset.index==='${last}'&&x.textContent.trim()==='+')[0];b.focus();})()`);
  const before=await where();
  await page.evaluate(`document.activeElement.click()`);
  const after=await where();
  if(after.action!=='qty'||after.index!==before.index||after.text!==before.text)
   fails.push(`a same-view redraw moved the keyboard from ${before.action}[${before.index}]"${before.text}" to ${after.action}[${after.index}]"${after.text}"`);

  // pressing minus to zero disables the key that was just pressed; a disabled button
  // cannot hold focus, so the fall-back must stay inside the same dial
  await page.evaluate(`(()=>{const b=[...document.querySelectorAll('#app [data-action="qty"]')]
   .filter(x=>x.dataset.index==='${last}'&&x.textContent.trim()==='-')[0];if(b&&!b.disabled)b.click();})()`);
  const zeroed=await where();
  if(zeroed.action!=='qty'||zeroed.index!==String(last))
   fails.push(`disabling the pressed control dropped the keyboard to ${zeroed.tag}#${zeroed.id} instead of its neighbour`);
  }
 }

 // a modal owns focus, and the restore correctly declines to reach into it. What it cannot
 // help with is renderModal() rebuilding #modal-root wholesale on every redraw, which
 // destroys the focused control inside it. That predates the focus work and lives in a
 // different owner, so it is reported (TODO C04) rather than failed on here.
 await page.click('#app [data-action="menu"]');
 await page.waitForTimeout(60);
 const opened=await where();
 if(!opened.inModal)fails.push('opening the menu did not move focus into the modal');
 await page.evaluate(`Guild24.render()`);
 const kept=await where();
 if(!kept.inModal)warn.push(`C04: a redraw under an open modal drops focus to ${kept.tag}#${kept.id} (renderModal rebuilds #modal-root)`);
 await page.evaluate(`(()=>{document.querySelector('#modal-root [data-action="dismiss"]')?.click();})()`);

 // a changed view belongs to no previous control: it focuses its own body
 await drive(page,'sale','qa-focus-keyboard');
 await page.evaluate(`(()=>{document.querySelector('#app [data-action="select"]')?.focus();})()`);
 await page.evaluate(`(()=>{Guild24.game.depart();Guild24.render();})()`);
 const moved=await where();
 if(moved.id!=='phase-content'&&!moved.inModal)
  fails.push(`a changed view left the keyboard on ${moved.tag}#${moved.id}"${moved.text}" instead of the screen body`);
 return {fails,warn};
}

(async()=>{
 let playwright;try{playwright=require('playwright');}catch(e){console.error('playwright is a devDependency. run: npm install');process.exit(1);}
 if(!fs.existsSync(EXECUTABLE)){console.error('chromium not found at '+EXECUTABLE);process.exit(1);}
 fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 const results=[];let failed=0;
 try{
  for(const width of WIDTHS){
   const desktop=isDesktop(width),height=heightFor(width);
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR'});
   const page=await context.newPage();
   page.on('pageerror',e=>{console.error(`  page error @${width}: ${e.message}`);failed++;});
   await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   for(const screen of SCREENS){
    await drive(page,screen,'qa-v24-'+screen);
    const file=path.join(OUT,`${screen}-${width}.png`);
    await page.screenshot({path:file});
    const {fails,warn}=await audit(page,width,screen,desktop);
    results.push({screen,width,fails,warn});
    failed+=fails.length;
    console.log(`${fails.length?'FAIL':'PASS'} ${screen} @${width}${fails.length?'\n  - '+fails.join('\n  - '):''}${warn.length?'\n  ? '+warn.join('\n  ? '):''}`);
   }
   await context.close();
  }
  if(!CAPTURE_ONLY){
  const ctx=await browser.newContext({viewport:{width:390,height:HEIGHT},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
  const kb=await ctx.newPage();
  kb.on('pageerror',e=>{console.error('  page error @focus: '+e.message);failed++;});
  await kb.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  const focus=await focusProbe(kb);
  failed+=focus.fails.length;
  console.log(`${focus.fails.length?'FAIL':'PASS'} keyboard focus across a redraw${focus.fails.length?'\n  - '+focus.fails.join('\n  - '):''}${focus.warn.length?'\n  ? '+focus.warn.join('\n  ? '):''}`);
  /* UI-Q-v28-27: the two contextual marks, on a phone and on a desktop, because the step has to
     stay semantically correct at both and the SALE readout exists twice across the breakpoint. */
  const coachSeen=[];
  for(const [label,vp] of [['phone 390',{width:390,height:HEIGHT,isMobile:true,hasTouch:true,deviceScaleFactor:1}],
                           ['desktop 1280',{width:1280,height:880,isMobile:false,hasTouch:false,deviceScaleFactor:1}]]){
   const cctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:vp.deviceScaleFactor,
    isMobile:vp.isMobile,hasTouch:vp.hasTouch,locale:'ko-KR'});
   const cpage=await cctx.newPage();
   cpage.on('pageerror',e=>{console.error(`  page error @coach ${label}: ${e.message}`);failed++;});
   await cpage.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   const c=await coachProbe(cpage,label);
   coachSeen.push(...c.captured);
   failed+=c.fails.length;
   console.log(`${c.fails.length?'FAIL':'PASS'} contextual coach · ${label}${c.fails.length?'\n  - '+c.fails.join('\n  - '):''}${c.warn.length?'\n  ? '+c.warn.join('\n  ? '):''}`);
   await cctx.close();
  }
  /* the same step has to mean the same thing at both layouts: same target, same copy */
  for(const id of ['deep','great']){
   const both=coachSeen.filter(x=>x.stepId===id&&!x.missing);
   if(both.length===2){
    if(both[0].copy!==both[1].copy)console.log(`FAIL contextual coach ${id}: the two layouts teach different copy`),failed++;
    if(both[0].selector!==both[1].selector)console.log(`FAIL contextual coach ${id}: the two layouts target different UI`),failed++;
   }else{console.log(`FAIL contextual coach ${id}: captured on ${both.length} of 2 layouts`);failed++;}
  }
  fs.writeFileSync(path.join(OUT,'coach-contextual.json'),JSON.stringify(coachSeen,null,1));
  const d25ctx=await browser.newContext({viewport:{width:390,height:HEIGHT},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
  const d25page=await d25ctx.newPage();
  d25page.on('pageerror',e=>{console.error('  page error @d25: '+e.message);failed++;});
  await d25page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  const d25=await d25OrderProbe(d25page);
  await d25ctx.close();
  failed+=d25.fails.length;
  console.log(`${d25.fails.length?'FAIL':'PASS'} D25 Final disclosure precedes the D25 decisions${d25.fails.length?'\n  - '+d25.fails.join('\n  - '):''}`);
  await ctx.close();
  }
 }finally{
  await browser.close();server.kill();
 }
 fs.writeFileSync(path.join(OUT,'qa-visual.json'),JSON.stringify({widths:WIDTHS,height:HEIGHT,captured:new Date().toISOString().slice(0,10),results},null,1));
 console.log(`\n${results.length} captures at ${WIDTHS.join(' / ')} -> reports/ui/`);
 if(failed){console.error(`${failed} visual QA problems`);process.exit(1);}
 console.log('visual QA clean');
})();
