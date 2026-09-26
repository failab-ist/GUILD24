// CLOSING state evidence — PRESENTATION BATCH 3 / CLOSING.
// Dev-only capture. The Batch 3 base harness photographs one ordinary Closing receipt; this one
// photographs the materially different receipts real Runs actually print: a profit day, a loss
// day, a day with a Great Success reward row, and a day that ends with negative cash, whose dock
// carries the recovery controls. Same real-game policy as qa-visual.cjs / qa-night-outcomes.cjs;
// every state is reached by playing, never by writing a figure.
//   node tools/qa-closing-states.cjs <out-dir> [seedCount] [statesFrom.json]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/closing-states');
const SEEDS=Number(process.argv[3]||40),PORT=Number(process.env.QA_PORT||5196);
const FIXED_NOW=1790112000000,EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const WIDTHS=(process.env.QA_WIDTHS||'390,1280').split(',').map(Number);
const STATES=process.argv[4]?path.resolve(__dirname,'..',process.argv[4]):null;
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
// what one Closing is, read only from the day's own ledger
const CLASSIFY=`(()=>{const s=Guild24.game.run,d=s.daily,m=d.revenue-d.cogs;
 const p=m+(d.subsidy||0)+(d.commission||0)+(d.greatSuccess||0)-d.operating-(d.wasteCost||0)-(d.rerollSpent||0);
 return s.money<0?'debt':d.greatSuccess?'great':p<0?'loss':'profit';})()`;
const WANT=['profit','loss','great','debt'];

function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
async function begin(page,seed){
 await page.addInitScript(t=>{try{localStorage.clear();}catch(e){};Date.now=()=>t;},FIXED_NOW);
 await page.reload({waitUntil:'load'});
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
 await page.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);   // before the DAY 0 lesson can paint
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
}
const clearReveals=`(()=>{const s=Guild24.game.run;if(!s)return;if(s.event)s.eventSeen=true;
 if(s.bossReveal)for(const k of Object.keys(s.bossReveal))s.bossReveal[k]=true;
 if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;})()`;
// play until the CLOSING of `day`, or through the whole Run reporting every Closing
async function play(page,day,onClosing){
 let last=-1;
 for(let i=0;i<1600;i++){
  const st=await page.evaluate(`(()=>{const s=Guild24.game.run;return s?{phase:s.phase,day:s.day}:null;})()`);
  if(!st||!['morning','order','sell','night','closing'].includes(st.phase))return false;
  if(st.phase==='closing'&&st.day!==last){last=st.day;
   if(day===st.day)return true;
   if(onClosing)await onClosing(st.day);}
  await page.evaluate(`${STEP}()`);
 }
 return false;
}

(async()=>{
 const playwright=require('playwright');
 fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 const found=STATES?JSON.parse(fs.readFileSync(STATES,'utf8')):{};
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:780},locale:'ko-KR',reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  for(let k=1;!STATES&&k<=SEEDS&&WANT.some(w=>!found[w]);k++){
   const seed='qa-closing-'+k;
   await begin(page,seed);
   await play(page,null,async day=>{const kind=await page.evaluate(CLASSIFY);
    if(!found[kind])found[kind]={seed,day};});
  }
  await ctx.close();
  console.log(JSON.stringify(found));
  for(const width of WIDTHS){
   const desktop=width>=1024;
   const c=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   const p=await c.newPage();
   p.on('pageerror',e=>console.error('  page error @'+width+': '+e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   for(const kind of WANT){const f=found[kind];if(!f)continue;
    await begin(p,f.seed);
    if(!await play(p,f.day)){console.log('MISS '+kind+' @'+width);continue;}
    await p.evaluate(clearReveals);
    await p.evaluate(`Guild24.render()`);
    await p.mouse.move(1,1);
    await p.waitForTimeout(400);
    const check=await p.evaluate(CLASSIFY);
    if(check!==kind){console.log('DRIFT '+kind+' @'+width+' '+check);continue;}
    await p.screenshot({path:path.join(OUT,`closing-${kind}-${width}.png`)});
    console.log('CAPTURE '+kind+' @'+width+' ('+f.seed+' D'+f.day+')');
   }
   await c.close();
  }
  fs.writeFileSync(path.join(OUT,'states.json'),JSON.stringify(found,null,1));
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
