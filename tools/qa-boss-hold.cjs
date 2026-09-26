// BOSS REVEAL AFTER MORNING LANDS (UI_UX §BOSS REVEAL — MORNING LANDS FIRST, UI-Q-v29-35) - runtime regression.
// Dev-only. The real DAY 0 첫 점포지원 -> 구매 press at 390 and 1280, motion on and reduced motion; the dossier's presence is
// read 120 ms and 600 ms after the press (wall clock - the hold is a plain timer). With an out-dir it also saves both frames.
//   motion on: no dossier at 120 ms, the dossier by 600 ms; reduced motion: the dossier at 120 ms. Then 확인 continues the Day.
//   node tools/qa-boss-hold.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5198),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox']});
 try{
  for(const width of [390,1280])for(const motion of [true,false]){
   const desktop=width>=1024,tag=width+(motion?' motion':' reduced');
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
   await ctx.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.start('qa-boss-hold');Guild24.render();});
   await p.click('#modal-root [data-action="start"]');await p.waitForSelector('#modal-root [data-action="buy-relic"]');
   const t0=await p.evaluate(()=>performance.now());
   await p.click('#modal-root [data-action="buy-relic"]');
   const at=async ms=>{await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms]);
    const r=await p.evaluate(()=>({phase:Guild24.game.run.phase,dossier:!!document.querySelector('#modal-root [data-action="boss-seen"]'),other:document.querySelector('#modal-root')?.innerHTML.length||0}));
    if(OUT)await p.screenshot({path:path.join(OUT,`boss-hold-${width}-${motion?'motion':'reduced'}-${ms}.png`)});return r;};
   // a second tap where 구매 was - on 390 it lands on DAY 1's 문 열기 - must not move the Day past the owed reveal
   const dock=await p.$('.p-morning .dock button');const box=dock&&await dock.boundingBox();
   if(motion&&box){await p.waitForFunction(([t])=>performance.now()-t>=60,[t0]);await p.mouse.click(box.x+box.width/2,box.y+box.height/2);}
   const early=await at(120),late=await at(600);
   if(motion)check(tag+': a tap on 문 열기 during the hold does nothing - still MORNING when the dossier opens',!!box&&late.phase==='morning');
   check(tag+': DAY 1 MORNING is on screen at 120 ms',early.phase==='morning');
   if(motion)check(tag+': no dossier (and no other modal) at 120 ms - MORNING lands first',!early.dossier&&early.other===0);
   else check(tag+': reduced motion opens the dossier at once',early.dossier);
   check(tag+': the dossier is open by 600 ms',late.dossier);
   await p.click('#modal-root [data-action="boss-seen"]');
   const after=await p.evaluate(()=>({seen:!document.querySelector('#modal-root [data-action="boss-seen"]'),phase:Guild24.game.run.phase}));
   check(tag+': 확인 closes it once and the Day continues',after.seen&&after.phase==='morning');
   await p.waitForTimeout(500);
   check(tag+': it does not come back',!(await p.$('#modal-root [data-action="boss-seen"]')));
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok).length;
 console.log(failed?`${failed} boss-hold checks failed`:`all ${results.length} boss-hold checks passed`);process.exitCode=failed?1:0;
})().catch(e=>{console.error(e);process.exit(1);});
