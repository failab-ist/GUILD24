// Visual / mobile QA harness — UI-Q38 and the §8.1 boundary contract.
// Dev-only. Nothing under dist/ knows this file exists; it drives the shipped game
// from the outside through tools/preview.cjs. Never part of `npm test`.
// Chromium is preinstalled at /opt/pw-browsers — never run `playwright install`.
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
// The gate runs 360 / 390 / 430 x 780. QA_WIDTHS / QA_HEIGHT / QA_SCREENS sweep wider by
// hand — e.g. a landscape phone, a 320 handset, a tablet — without editing this file.
const list=(v,d)=>v?String(v).split(',').map(x=>x.trim()).filter(Boolean):d;
const WIDTHS=list(process.env.QA_WIDTHS,[360,390,430,1280]).map(Number);
const HEIGHT=Number(process.env.QA_HEIGHT||780),PORT=Number(process.env.QA_PORT||5199);
// D-35. The gate used to be phones only, so the width the game is most often played at was
// never audited. A desktop width is a different device, not a wide phone: no touch, a
// pointer, and a taller viewport. Anything at or past this is driven as a desktop.
const DESKTOP=Number(process.env.QA_DESKTOP_FROM||1024);
const isDesktop=w=>w>=DESKTOP;
const heightFor=w=>process.env.QA_HEIGHT?HEIGHT:(isDesktop(w)?880:HEIGHT);
const OUT=path.resolve(__dirname,'../reports/ui');
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
// The seven phase screens, plus the five surfaces D-35 names that the gate never opened:
// the Event notice, the two endings, the codex and the store menu. Modal targets are driven
// to a phase and then opened, so what is audited is the takeover over the screen under it.
const SCREENS=list(process.env.QA_SCREENS,['morning','order','sale','night','closing','relic','final',
 'event','end','endfail','codex','menu']);
const MODAL={event:'event',codex:'codex',menu:'menu'};

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
 await page.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
 await page.reload({waitUntil:'load'});
 await page.click('#modal-root details summary');
 await page.fill('#seed',seed);
 await page.click('[data-action="start"]');                 // real first-run flow
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
 const d30=target==='final'||target==='end'||target==='endfail';
 let reached=await until(d30?`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=6`:GOAL[target]);
 if(reached&&d30)reached=await page.evaluate(`(()=>{const g=Guild24.game;g.run.day=30;g.morning();Guild24.render();return g.run.phase==='final';})()`);
 if(!reached)throw Error('could not drive the run to '+target);
 // A milestone Relic window, an Event day and each Boss reveal own one focused reveal.
 // Skipping days without rendering means marking as seen what a player would already
 // have seen; otherwise the capture is a takeover instead of the screen under it.
 // The Boss reveal sits ahead of the Relic window in the chain, so it has to be cleared
 // for every target - including `relic`, whose whole point is to capture the takeover
 // underneath it. Only the Relic window's own seen flag is target-specific.
 await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.event)s.eventSeen=true;if(s.bossReveal){s.bossReveal.identitySeen=true;s.bossReveal.traitSeen=true;s.bossReveal.familySeen=true;}})()`);
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
 if(target==='codex'||target==='menu'){
  await page.evaluate(`(()=>{document.querySelector('[data-action="menu"]').click();})()`);
  await page.waitForTimeout(120);
  if(target==='codex'){await page.evaluate(`(()=>{document.querySelector('#modal-root [data-action="codex"]').click();})()`);await page.waitForTimeout(150);}
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
 menu:   `Guild24.game.run.day>=6&&Guild24.game.run.phase==='morning'`
};

const PRESSURE={poison:'강인함',bind:'기동',corrosion:'강인함',mire:'기동',fire:'강인함',fear:'정신',dark:'정신',cold:'강인함',whiteout:'정신'};

async function audit(page,width,screen,desktop){
 return page.evaluate(({width,screen,PRESSURE,desktop})=>{
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
  return {fails,warn};
 },{width,screen,PRESSURE,desktop});
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
 await page.click('#modal-root details summary');
 await page.fill('#seed','qa-d25-order');
 await page.click('[data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{const g=Guild24.game;g.account.tutorial.skipped=true;
  /* every earlier reveal already seen, so what is on screen at D25 is the D25 beat alone */
  g.run.bossReveal.identitySeen=true;g.run.bossReveal.traitSeen=true;
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
  // Pick the LAST row the store can actually afford to raise: a disabled button cannot take
  // focus at all, so probing a fixed index turns an ordinary poor-run into a false failure.
  const last=await page.evaluate(`(()=>{const rows=[...document.querySelectorAll('#app [data-action="qty"]')]
   .filter(x=>x.textContent.trim()==='+'&&!x.disabled).map(x=>Number(x.dataset.index));
   return rows.length?Math.max(...rows):-1;})()`);
  if(last<0)fails.push('no affordable quantity control on the order screen; the probe needs one');
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
  const ctx=await browser.newContext({viewport:{width:390,height:HEIGHT},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
  const kb=await ctx.newPage();
  kb.on('pageerror',e=>{console.error('  page error @focus: '+e.message);failed++;});
  await kb.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  const focus=await focusProbe(kb);
  failed+=focus.fails.length;
  console.log(`${focus.fails.length?'FAIL':'PASS'} keyboard focus across a redraw${focus.fails.length?'\n  - '+focus.fails.join('\n  - '):''}${focus.warn.length?'\n  ? '+focus.warn.join('\n  ? '):''}`);
  const d25ctx=await browser.newContext({viewport:{width:390,height:HEIGHT},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
  const d25page=await d25ctx.newPage();
  d25page.on('pageerror',e=>{console.error('  page error @d25: '+e.message);failed++;});
  await d25page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  const d25=await d25OrderProbe(d25page);
  await d25ctx.close();
  failed+=d25.fails.length;
  console.log(`${d25.fails.length?'FAIL':'PASS'} D25 Final disclosure precedes the D25 decisions${d25.fails.length?'\n  - '+d25.fails.join('\n  - '):''}`);
  await ctx.close();
 }finally{
  await browser.close();server.kill();
 }
 fs.writeFileSync(path.join(OUT,'qa-visual.json'),JSON.stringify({widths:WIDTHS,height:HEIGHT,captured:new Date().toISOString().slice(0,10),results},null,1));
 console.log(`\n${results.length} captures at ${WIDTHS.join(' / ')} -> reports/ui/`);
 if(failed){console.error(`${failed} visual QA problems`);process.exit(1);}
 console.log('visual QA clean');
})();
