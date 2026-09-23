// END / ENDFAIL state evidence — PRESENTATION BATCH 3 / END.
// Dev-only capture. The Batch 3 base harness photographs one Final failure with a party (`end`)
// and one Final with nobody able to go (`endfail`). This adds the other endings the game owns:
//   clear       - the Boss falls. The qa-visual party (Lv 2-3) cannot clear, so this uses the
//                 canonical suite's own well-grown-party fixture (tests/final.cjs FINAL 10:
//                 Lv 40, fixed stats) on the SAME controlled D30 setup qa-visual.cjs uses for its
//                 Final captures; boss() still resolves the Final itself, and seeds are walked
//                 only until that resolution is a clear. No result field is written.
//   finalfail   - the same setup, a Final that resolves a failure with a party
//   noparty     - the same setup with nobody able to go (as qa-visual `endfail`)
//   supplied    - the finalfail party, each member first handed stock through the real Final
//                 supply API (game.supplyFinal), so the ending owns a last carried supply
//   deathlimit / bankrupt / other - a Run played to its natural end with the qa-visual policy
//   node tools/qa-end-states.cjs <out-dir> [seedCount] [statesFrom.json]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/end-states');
const SEEDS=Number(process.argv[3]||40),PORT=Number(process.env.QA_PORT||5195);
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
const CLASSIFY=`(()=>{const s=Guild24.game.run;if(!s||s.phase!=='end')return null;
 if(s.finalReport&&(s.finalReport.members||[]).some(m=>(m.items||[]).length))return 'supplied';
 if(!s.finalReport&&s.day===30)return 'noparty';
 if(s.finalReport)return s.win?'clear':(s.finalReport.members||[]).length?'finalfail':'noparty';
 if(s.stats.deaths>=DATA.balance.deathLimit)return 'deathlimit';
 return s.money<0?'bankrupt':'other';})()`;
const WANT=['clear','finalfail','noparty','deathlimit','bankrupt'];
// the scan stops once the owned Final endings and one natural ending are in hand; a bankruptcy is
// recorded if a natural Run happens to reach one, but no policy is bent to force it
const SCAN_WANT=['clear','finalfail','noparty','deathlimit','supplied'];

function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
async function begin(page,seed){
 await page.addInitScript(t=>{try{localStorage.clear();}catch(e){};Date.now=()=>t;},FIXED_NOW);
 await page.reload({waitUntil:'load'});
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
}
const clearReveals=`(()=>{const s=Guild24.game.run;if(!s)return;if(s.event)s.eventSeen=true;
 if(s.bossReveal)for(const k of Object.keys(s.bossReveal))s.bossReveal[k]=true;
 if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;})()`;
async function step(page){await page.evaluate(`${STEP}()`);}
// a Run to its own end, with the qa-visual policy
async function natural(page){
 for(let i=0;i<2400;i++){
  const ph=await page.evaluate(`Guild24.game.run?.phase`);
  if(ph==='end')return true;
  if(!['morning','order','sell','night','closing'].includes(ph))return false;
  await step(page);}
 return false;}
// qa-visual's controlled D30 setup, then the Final sent (or nobody able to go)
async function final(page,noparty,grown,supplied){
 for(let i=0;i<800;i++){
  if(await page.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;
  if(await page.evaluate(`Guild24.game.run.phase==='end'`))return false;
  await step(page);}
 if(!await page.evaluate(`(()=>{const g=Guild24.game;g.run.day=30;g.morning();return g.run.phase==='final';})()`))return false;
 await page.evaluate(clearReveals);
 if(noparty)await page.evaluate(`(()=>{for(const n of Guild24.game.run.npcs)n.alive=false;})()`);
 else await page.evaluate(grown=>{const g=Guild24.game;for(const n of g.finalEligible().slice(0,g.finalRequired())){
  if(grown){n.level=40;n.stats={combat:220,survival:160,mobility:140,spirit:120};}g.selectFinal(n.id);}},!!grown);
 if(supplied)await page.evaluate(`(()=>{const g=Guild24.game,s=g.run;if(s.team.length)g.commitFinalParty();
  for(const id of s.team){const n=s.npcs.find(x=>x.id===id);
   for(let i=0;i<Adventurer.slots(n)&&s.inventory.length;i++){const before=s.inventory.length;
    try{g.supplyFinal(id,s.inventory[0].id);}catch(e){}if(s.inventory.length===before)break;}}})()`);
 await page.evaluate(`(()=>{const g=Guild24.game;if(g.run.team.length&&!g.run.finalCommitted)g.commitFinalParty();g.boss();Guild24.render();})()`);
 return true;}
async function reach(page,f){
 await begin(page,f.seed);
 const ok=f.path==='natural'?await natural(page):await final(page,f.path==='noparty',f.path==='grown',f.path==='supplied');
 if(!ok)return false;
 /* a player read every Boss beat on its own Morning; this drive never drew them, so they are
    marked seen exactly as qa-visual.cjs does, or the next unseen beat covers the ending */
 await page.evaluate(`(()=>{const s=Guild24.game.run;s.bossReveal=s.bossReveal||{};
  for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
  if(s.event)s.eventSeen=true;if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;})()`);
 await page.evaluate(`Guild24.render()`);
 if(await page.evaluate(`!!document.querySelector('#modal-root .modal')`))console.log('  a modal is still open over the ending');
 return await page.evaluate(CLASSIFY)===f.kind;}

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
  for(let k=1;!STATES&&k<=SEEDS&&SCAN_WANT.some(w=>!found[w]);k++){
   const seed='qa-end-'+k;
   for(const p of ['final','grown','noparty','natural','supplied']){
    if(p==='supplied'&&found.supplied)continue;
    if(p==='noparty'&&found.noparty)continue;
    if(p==='final'&&found.finalfail)continue;
    if(p==='grown'&&found.clear)continue;
    if(p==='natural'&&found.deathlimit&&found.bankrupt)continue;
    await begin(page,seed);
    const ok=p==='natural'?await natural(page):await final(page,p==='noparty',p==='grown',p==='supplied');
    const kind=ok?await page.evaluate(CLASSIFY):null;
    if(kind&&!found[kind])found[kind]={seed,path:p,kind};
   }
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
   for(const [kind,f] of Object.entries(found)){
    if(!await reach(p,f)){console.log('MISS '+kind+' @'+width);continue;}
    await p.mouse.move(1,1);
    await p.waitForTimeout(400);
    await p.screenshot({path:path.join(OUT,`end-${kind}-${width}.png`)});
    // the whole ending, top to bottom, for review: a scrolled capture of the same surface
    const full=await p.evaluate(`(()=>{const e=document.querySelector('.stage-scroll');return e?e.scrollHeight>e.clientHeight+2:false})()`);
    if(full){await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=1e6`);await p.waitForTimeout(150);
     await p.screenshot({path:path.join(OUT,`end-${kind}-${width}-scrolled.png`)});}
    console.log('CAPTURE '+kind+' @'+width+' ('+f.seed+' '+f.path+')'+(full?' +scrolled':''));
   }
   await c.close();
  }
  fs.writeFileSync(path.join(OUT,'states.json'),JSON.stringify(found,null,1));
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
