// v2.9.2 H4 CLOSING receipt evidence. Capture-only (not in qa:runtime): a seeded Run is played to NIGHT's last
// result, the day's own figures are forced to a controlled profit or loss, and the real 마감으로 press (night-next
// on the last result, the same button 전체 건너뛰기 also reaches) starts the beat - the sequence this batch bridges
// with H1: last NIGHT verdict -> 마감으로 -> receipt printing -> 다음 날. A third case reaches END through the real
// 폐점 confirm with the account's prior Store Capital and this Run's Gross Sales controlled so the settlement count
// crosses every Decoration price line. Without QA_FRAMES: a settled reduced-motion capture some ms after the press
// (plus the pre-press sheet); with QA_FRAMES the press itself with motion on (anime slowed QA_SLOW times, default
// 10; the clock runs from before the press).
//   QA_FRAMES=0,100,150,190,230,390 node tools/qa-closing-beat.cjs <out-dir> [widths] [cases]   cases: profit,loss,settlement
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/closing-beat');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const CASES=(process.argv[4]||'profit,loss,settlement').split(',');
const PORT=Number(process.env.QA_PORT||5191),FIXED_NOW=1790112000000;
const FRAMES=(process.env.QA_FRAMES||'').split(',').filter(Boolean).map(Number),SLOW=Number(process.env.QA_SLOW||10);
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const width of WIDTHS)for(const motion of FRAMES.length?[false,true]:[false])for(const kind of CASES){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
   await ctx.addInitScript(t=>{const real=Date.now.bind(Date);Date.now=()=>window.__live?real():t;try{localStorage.clear();}catch(e){}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGE ERROR '+e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-closing-1');
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);

   // the D0 Boss briefing auto-opens on Day 1 and, unlike STEP's own direct method calls, blocks a real DOM click
   const dismissBoss=async()=>{for(let i=0;i<5;i++){const b=await p.$('#modal-root [data-action="boss-seen"]');if(!b)break;await b.click();}};

   if(kind==='settlement'){
    for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='closing'`))break;await p.evaluate(`(${STEP})()`);}
    await dismissBoss();
    // prior Store Capital 10, Gross Sales 150000 at the Day-9 1% band -> gain 1500, capitalAfter 1510: the count
    // crosses every Decoration price line (500 / 750 / 1000 / 1250) on the way up
    await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.money=-1;s.day=9;s.stats.revenue=150000;
     g.account.store=Meta.freshStore();g.account.store.capital=10;g.save();Guild24.render();});
    await p.click('.p-closing .dock [data-action="retire"]');
    if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
    if(!motion)await p.screenshot({path:path.join(OUT,`closing-settlement-${width}-pre.png`)});
    const t0=await p.evaluate(()=>performance.now());
    await p.click('#modal-root [data-action="retire-go"]');
    if(motion){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
      await p.screenshot({path:path.join(OUT,`closing-settlement-${width}-f${String(ms).padStart(4,'0')}.png`)});}
     console.log('FRAMES settlement @'+width);}
    else{await p.waitForTimeout(500);await p.screenshot({path:path.join(OUT,`closing-settlement-${width}.png`)});console.log('CAPTURE settlement @'+width);}
    await ctx.close();continue;
   }

   // profit / loss: the daily receipt sequence - last NIGHT verdict -> 마감으로 -> receipt printing -> 다음 날
   for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='night'`))break;await p.evaluate(`(${STEP})()`);}
   await dismissBoss();
   await p.evaluate(kind=>{const g=Guild24.game,s=g.run,d=s.daily;
    if(kind==='profit'){d.revenue=1000;d.cogs=400;d.operating=100;}else{d.revenue=100;d.cogs=50;d.operating=500;}
    d.wasteCost=0;d.rerollSpent=0;d.subsidy=0;d.commission=0;d.greatSuccess=0;d.safeGold=0;d.spent=0;d.relicSpent=0;d.liquidation=0;
    g.save();Guild24.render();},kind);
   const results=await p.evaluate('Guild24.game.run.results.length');
   for(let i=0;i<results-1;i++)await p.click('.p-night .dock [data-action="night-next"]');
   await p.waitForTimeout(200);
   if(!motion)await p.screenshot({path:path.join(OUT,`closing-${kind}-${width}-pre.png`)});
   if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
   const t0=await p.evaluate(()=>performance.now());
   await p.click('.p-night .dock [data-action="night-next"]');
   if(motion){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
     await p.screenshot({path:path.join(OUT,`closing-${kind}-${width}-f${String(ms).padStart(4,'0')}.png`)});}
    console.log('FRAMES '+kind+' @'+width);}
   else{await p.waitForTimeout(500);await p.screenshot({path:path.join(OUT,`closing-${kind}-${width}.png`)});console.log('CAPTURE '+kind+' @'+width);
    await p.click('.p-closing .dock [data-action="close"]');await p.waitForTimeout(300);
    await p.screenshot({path:path.join(OUT,`closing-${kind}-${width}-nextday.png`)});}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
