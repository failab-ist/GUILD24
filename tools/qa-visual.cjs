// Visual / mobile QA harness — UI-Q38 and the §8.1 boundary contract.
// Dev-only. Nothing under dist/ knows this file exists; it drives the shipped game
// from the outside through tools/preview.cjs. Never part of `npm test`.
// Chromium is preinstalled at /opt/pw-browsers — never run `playwright install`.
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
// The gate runs 360 / 390 / 430 x 780. QA_WIDTHS / QA_HEIGHT / QA_SCREENS sweep wider by
// hand — e.g. a landscape phone, a 320 handset, a tablet — without editing this file.
const list=(v,d)=>v?String(v).split(',').map(x=>x.trim()).filter(Boolean):d;
const WIDTHS=list(process.env.QA_WIDTHS,[360,390,430]).map(Number);
const HEIGHT=Number(process.env.QA_HEIGHT||780),PORT=Number(process.env.QA_PORT||5199);
const OUT=path.resolve(__dirname,'../reports/ui');
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const SCREENS=list(process.env.QA_SCREENS,['morning','order','sale','night','closing','relic','final']);

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
 const reached=await until(GOAL[target]);
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
 final:  `Guild24.game.run.phase==='final'`
};

const PRESSURE={poison:'강인함',bind:'기동',corrosion:'강인함',mire:'기동',fire:'강인함',fear:'정신',dark:'정신',cold:'강인함',whiteout:'정신'};

async function audit(page,width,screen){
 return page.evaluate(({width,screen,PRESSURE})=>{
  const fails=[],warn=[];
  const de=document.documentElement;
  if(de.scrollWidth>width+1)fails.push(`horizontal overflow: documentElement ${de.scrollWidth}px > ${width}px`);
  const body=document.querySelector('.stage-scroll,.board');
  if(body&&body.scrollWidth>body.clientWidth+1)fails.push(`scroll surface scrolls sideways (${body.scrollWidth}>${body.clientWidth})`);
  // an element is only on screen if it survives every clipping ancestor, not just the viewport:
  // content scrolled past the end of a scroll surface is clipped, never overlapping the dock
  const vis=el=>{
   const r=el.getBoundingClientRect();
   if(r.width<=0||r.height<=0||r.bottom<=0||r.top>=innerHeight)return false;
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
  for(const el of document.querySelectorAll('.stage *')){
   if(!vis(el)||!layout(el))continue;
   const r=el.getBoundingClientRect();
   if(r.right>width+1)fails.push(`past the right edge: ${name(el)} right=${Math.round(r.right)}`);
   if(r.left<-1)fails.push(`past the left edge: ${name(el)} left=${Math.round(r.left)}`);
   if(fails.length>6)break;
  }
  // an element must stay inside the material it belongs to
  const contained=[['.tag-art','.form'],['.daysign','.band.ceiling'],['.till','.band.counter'],
                   ['.slip','.board'],['.tray','.band.counter'],['.dial','.line'],['.ledger','.form']];
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
  const leaves=[...document.querySelectorAll('.stage *')].filter(el=>vis(el)&&layout(el)
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
   // the payload overhangs the card on three sides but must never reach the plate,
   // and must never be scaled to a non-square box
   if(art&&plate){
    const a=art.getBoundingClientRect(),p=plate.getBoundingClientRect();
    if(a.bottom>p.top+0.5)fails.push(`the NPC payload runs into the nameplate by ${Math.round(a.bottom-p.top)}px`);
    if(Math.abs(a.width-a.height)>1.5)fails.push(`the NPC payload box is not square: ${Math.round(a.width)}x${Math.round(a.height)}`);
    if(a.width<fr.width)fails.push(`the NPC payload is narrower than the card (${Math.round(a.width)} < ${Math.round(fr.width)}): it reads as sealed in`);
    if(a.top>fr.top-1)fails.push('the NPC payload no longer overhangs the top of the card');
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
   if(primary&&(r.height<43.5||r.width<43.5))
    fails.push(`touch target ${Math.round(r.width)}x${Math.round(r.height)}: ${(el.textContent||'').trim().slice(0,14)}`);
   else if(!primary&&(r.height<32||r.width<32))
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
  for(const el of document.querySelectorAll('.stage [title]'))fails.push(`hover-only title= on ${el.className||el.tagName}`);
  return {fails,warn};
 },{width,screen,PRESSURE});
}

// Keyboard focus across a redraw. Not a capture: it drives real presses and reads
// document.activeElement, so it lives here, where a real browser is already running, and
// not in the DOM-less node suite. #app is replaced wholesale on every redraw, so focus has
// to be put back by hand — and the handle has to name one control, not a class of them.
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
  // carries no data-id, so a first-match restore lands on the wrong product's minus key
  const last=dial>10?Math.floor(dial/5)-1:0;
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
   const context=await browser.newContext({viewport:{width,height:HEIGHT},deviceScaleFactor:2,isMobile:true,hasTouch:true,locale:'ko-KR'});
   const page=await context.newPage();
   page.on('pageerror',e=>{console.error(`  page error @${width}: ${e.message}`);failed++;});
   await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   for(const screen of SCREENS){
    await drive(page,screen,'qa-v24-'+screen);
    const file=path.join(OUT,`${screen}-${width}.png`);
    await page.screenshot({path:file});
    const {fails,warn}=await audit(page,width,screen);
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
  await ctx.close();
 }finally{
  await browser.close();server.kill();
 }
 fs.writeFileSync(path.join(OUT,'qa-visual.json'),JSON.stringify({widths:WIDTHS,height:HEIGHT,captured:new Date().toISOString().slice(0,10),results},null,1));
 console.log(`\n${results.length} captures at ${WIDTHS.join(' / ')} -> reports/ui/`);
 if(failed){console.error(`${failed} visual QA problems`);process.exit(1);}
 console.log('visual QA clean');
})();
