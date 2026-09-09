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
 await page.evaluate(`localStorage.clear()`);
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
  const body=document.querySelector('.screen-body');
  if(body&&body.scrollWidth>body.clientWidth+1)fails.push(`screen-body scrolls sideways (${body.scrollWidth}>${body.clientWidth})`);
  for(const el of document.querySelectorAll('.screen-body *')){
   const r=el.getBoundingClientRect();
   if(r.width&&r.right>width+1)fails.push(`element past the right edge: ${el.className||el.tagName} right=${Math.round(r.right)}`);
   if(fails.length>6)break;
  }
  const header=document.querySelector('.game-header');
  if(header&&header.getBoundingClientRect().top<0)fails.push('header clipped above the viewport');
  const bar=document.querySelector('.phase-action');
  if(bar&&bar.children.length){
   const r=bar.getBoundingClientRect();
   if(r.bottom>innerHeight+1)fails.push(`sticky action below the fold (bottom=${Math.round(r.bottom)}, viewport=${innerHeight})`);
   const primary=bar.querySelector('.primary');
   if(!primary)fails.push('no primary action in the sticky bar');
   else{const p=primary.getBoundingClientRect();if(p.height<44)fails.push(`primary action ${Math.round(p.height)}px tall`);}
  }
  // 44px touch contract on every repeated/primary control that is actually on screen.
  for(const el of document.querySelectorAll('button:not(:disabled), summary')){
   const r=el.getBoundingClientRect();
   if(!r.width||!r.height)continue;
   if(r.height<43.5||r.width<43.5)fails.push(`touch target ${Math.round(r.width)}x${Math.round(r.height)}: ${(el.textContent||'').trim().slice(0,14)}`);
   if(fails.length>12)break;
  }
  // Hazard pressure: every named Hazard on screen states its pressure inline — no hover needed.
  const named=[...document.querySelectorAll('.hazards li')];
  for(const li of named){
   const key=li.dataset.hazard,note=(li.querySelector('span')?.textContent||'').trim();
   if(!key)continue;
   if(!note)fails.push(`hazard ${key} has no pressure line`);
   else if(!note.includes(PRESSURE[key]))fails.push(`hazard ${key} pressure line reads "${note}"`);
  }
  if(['morning','sale','final'].includes(screen)&&!named.length)warn.push('no hazard rows rendered on this capture');
  // Nothing may hide meaning behind a hover-only tooltip.
  for(const el of document.querySelectorAll('.screen-body [title]'))fails.push(`hover-only title= on ${el.className||el.tagName}`);
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
