// Visual / mobile QA harness — UI-Q38 and the §8.1 boundary contract.
// Dev-only. Nothing under dist/ knows this file exists; it drives the shipped game
// from the outside through tools/preview.cjs. Never part of `npm test`.
// Chromium is preinstalled at /opt/pw-browsers — never run `playwright install`.
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const WIDTHS=[360,390,430],HEIGHT=780,PORT=Number(process.env.QA_PORT||5199);
const OUT=path.resolve(__dirname,'../reports/ui');
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const SCREENS=['morning','order','sale','night','closing','relic','final'];

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
 // A milestone Relic window and an Event day each own one focused reveal. Skipping days
 // without rendering means marking as seen what a player would already have seen.
 if(target!=='relic')await page.evaluate(`(()=>{const s=Guild24.game.run;if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;if(s.event)s.eventSeen=true;})()`);
 await page.evaluate(`Guild24.render()`);
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
  for(let i=0;i<leaves.length;i++)for(let j=i+1;j<leaves.length;j++){
   if(layer.get(leaves[i])!==layer.get(leaves[j]))continue;
   if(leaves[i].contains(leaves[j])||leaves[j].contains(leaves[i]))continue;
   const a=clip(leaves[i]),b=clip(leaves[j]);
   const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left),oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
   if(ox>4&&oy>4)fails.push(`text collision: "${(leaves[i].textContent||'').trim().slice(0,10)}" over "${(leaves[j].textContent||'').trim().slice(0,10)}"`);
   if(fails.length>10)break;
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
 }finally{
  await browser.close();server.kill();
 }
 fs.writeFileSync(path.join(OUT,'qa-visual.json'),JSON.stringify({widths:WIDTHS,height:HEIGHT,captured:new Date().toISOString().slice(0,10),results},null,1));
 console.log(`\n${results.length} captures at ${WIDTHS.join(' / ')} -> reports/ui/`);
 if(failed){console.error(`${failed} visual QA problems`);process.exit(1);}
 console.log('visual QA clean');
})();
