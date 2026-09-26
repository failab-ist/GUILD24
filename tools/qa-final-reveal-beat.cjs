// v2.9.2 H6 FINAL boss reveal entry evidence. Capture-only (not in qa:runtime): a seeded Run is fast-forwarded
// to D29's CLOSING (money and deaths kept afloat only so the Run reaches D30 - the outcome of the Final
// battle itself is not controlled), then the real 다음 날 press is used, which lands directly on D30's FINAL
// screen (no separate Morning). Without QA_FRAMES: a settled reduced-motion capture some ms after the press
// (plus the pre-press sheet); with QA_FRAMES the press itself with motion on (anime slowed QA_SLOW times,
// default 10; the clock runs from before the press).
//   QA_FRAMES=0,60,120,180,220,320 node tools/qa-final-reveal-beat.cjs <out-dir> [widths]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-reveal-beat');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const PORT=Number(process.env.QA_PORT||5194),FIXED_NOW=1790112000000;
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
  for(const width of WIDTHS)for(const motion of FRAMES.length?[false,true]:[false]){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
   await ctx.addInitScript(t=>{const real=Date.now.bind(Date);Date.now=()=>window.__live?real():t;try{localStorage.clear();}catch(e){}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGE ERROR '+e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-final-reveal-1');
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.save();})()`);
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   const dismissBoss=async()=>{for(let i=0;i<5;i++){const b=await p.$('#modal-root [data-action="boss-seen"]');if(!b)break;await b.click();}};

   // fast-forward to D29's CLOSING, keeping the till afloat so a real bankruptcy never derails the capture -
   // topped up BEFORE each STEP call, since STEP's own closing branch can end the Run inside that same call
   for(let i=0;i<2000;i++){
    const at=await p.evaluate(`({day:Guild24.game.run.day,phase:Guild24.game.run.phase})`);
    if(at.day>=29&&at.phase==='closing')break;
    if(at.phase==='end')throw Error('the Run ended before reaching D29 - '+JSON.stringify(await p.evaluate('Guild24.game.run.endReason')));
    await p.evaluate(()=>{const s=Guild24.game.run;if(s.money<300)s.money=800;s.stats.deaths=0;});
    await p.evaluate(`(${STEP})()`);
   }
   // STEP never touches the DOM, so the page is still showing whatever it last rendered before the
   // fast-forward; render() once to catch it up before reading or clicking anything
   await p.evaluate(()=>Guild24.render());
   await dismissBoss();

   if(motion)await p.evaluate(()=>{window.__live=true;});
   if(!motion)await p.screenshot({path:path.join(OUT,`final-reveal-${width}-pre.png`)});
   if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
   const t0=await p.evaluate(()=>performance.now());
   await p.click('.p-closing .dock [data-action="close"]');
   if(motion){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
     await p.screenshot({path:path.join(OUT,`final-reveal-${width}-f${String(ms).padStart(4,'0')}.png`)});}
    console.log('FRAMES @'+width);}
   else{await p.waitForTimeout(500);await p.screenshot({path:path.join(OUT,`final-reveal-${width}.png`)});console.log('CAPTURE @'+width);}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
