// v2.9.2 H6 evidence (PRESENTATION §GAME FEEL BEAT H6). Capture-only, decides nothing: the four
// candidate hard cuts - CLOSING, FINAL, END, the DAY 0 screen - as they exist today, each shown as
// the actual last frame before the real control press and the actual first frame right after it
// (no motion is authored for the cut itself; H1/H4/H5 already animate CONTENT inside CLOSING/NIGHT/END,
// but the outer screen swap is still instant). One continuous seeded Run supplies all four cuts:
// DAY 0 (foundation -> Day 1 morning), CLOSING (last NIGHT verdict -> 마감으로), FINAL (D29 마감 ->
// D30 다음 날), END (D30 boss confirm -> boss-go). Money is kept afloat during the fast-forward only
// so the Run reaches D30 - the outcome of the Final battle itself is not controlled.
//   node tools/qa-h6-transitions.cjs <out-dir> [widths] [cases]   cases: day0,closing,final,end
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/h6-transitions');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const CASES=(process.argv[4]||'day0,closing,final,end').split(',');
const PORT=Number(process.env.QA_PORT||5193),FIXED_NOW=1790112000000;
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const toMuster=async p=>{if(await p.$('.p-final .dock [data-action="final-ordered"]'))await p.click('.p-final .dock [data-action="final-ordered"]');};
const pickFinal=async(p,id)=>{await toMuster(p);await p.click(`.p-final [data-action="final-npc"][data-id="${id}"]`);await p.click('#modal-root [data-action="final-team"]');};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const width of WIDTHS){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'no-preference'});
   await ctx.addInitScript(t=>{const real=Date.now.bind(Date);Date.now=()=>window.__live?real():t;try{localStorage.clear();}catch(e){}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGE ERROR '+e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   // anime.js reads Date.now() for its own clock, which the init script above freezes; this tool
   // captures real-time settled frames (no slow-motion sequence), so the live clock stays on for
   // the whole session - frozen, an entry animation that started at opacity 0 would stay invisible
   // forever no matter how long a real waitForTimeout runs (H2/H3 함정, repeated here once already)
   await p.evaluate(()=>{window.__live=true;});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-h6-1');
   // the coach marks over this same DAY 0 takeover would intercept the real clicks below; the cut
   // itself is the screen swap, not the tutorial layer, so it is skipped before any press (as every
   // other capture tool in this repo already does)
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.save();})()`);
   const dismissBoss=async()=>{for(let i=0;i<5;i++){const b=await p.$('#modal-root [data-action="boss-seen"]');if(!b)break;await b.click();}};

   // DAY 0: the mandatory Store Support takeover ('첫 점포지원', modal==='relics') is the actual
   // DAY 0 screen; the preceding '새 점포 준비' panel is the ordinary pre-Run launcher, not DAY 0 itself
   await p.click('#modal-root [data-action="start"]');
   if(CASES.includes('day0')){
    await p.screenshot({path:path.join(OUT,`day0-${width}-before.png`)});
    await p.click('#modal-root [data-action="buy-relic"]');
    await p.waitForTimeout(120);
    await p.screenshot({path:path.join(OUT,`day0-${width}-after.png`)});
    // this cut lands on Day 1 MORNING, which already has its own pre-existing entry (shutter 420 ms,
    // staggered slips, till count-up 520 ms) - same settle-frame reasoning as CLOSING/END below
    await p.waitForTimeout(600);
    await p.screenshot({path:path.join(OUT,`day0-${width}-settled.png`)});
    console.log('CAPTURE day0 @'+width);
   }else{
    await p.click('#modal-root [data-action="buy-relic"]');
   }

   // CLOSING: the last NIGHT verdict -> 마감으로 (the ordinary night-next press on the last result)
   if(CASES.includes('closing')){
    for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='night'`))break;await p.evaluate(`(${STEP})()`);}
    await dismissBoss();
    // jump the cursor directly (skips the H1 stamp animation on every result but the last one we
    // actually care about, instead of racing real clicks through it) and let that last stamp settle
    const results=await p.evaluate('Guild24.game.run.results.length');
    await p.evaluate(n=>{Guild24.game.run.nightCursor=Math.max(0,n-1);Guild24.render();},results);
    await p.waitForTimeout(850);
    await p.screenshot({path:path.join(OUT,`closing-${width}-before.png`)});
    await p.click('.p-night .dock [data-action="night-next"]');
    await p.waitForTimeout(30);
    await p.screenshot({path:path.join(OUT,`closing-${width}-after.png`)});
    // H4 already animates this screen's own content (200 ms print + 190 ms stamp landing + dip); the
    // instant-after frame above is honest about the cut itself but says nothing about the settled
    // result, so a second frame once that motion is done is required for a fair before/after read
    await p.waitForTimeout(600);
    await p.screenshot({path:path.join(OUT,`closing-${width}-settled.png`)});
    console.log('CAPTURE closing @'+width);
    await p.evaluate(()=>{if(Guild24.game.run.phase==='closing')Guild24.game.closeDay();Guild24.render();});
   }

   if(CASES.includes('final')||CASES.includes('end')){
    // fast-forward to D29's CLOSING, keeping the till afloat so a real bankruptcy never derails the
    // capture - topped up BEFORE each STEP call, since STEP's own closing branch can end the Run
    // (liquidate then closeDay) inside that same call if money is already negative when it runs
    for(let i=0;i<2000;i++){
     const at=await p.evaluate(`({day:Guild24.game.run.day,phase:Guild24.game.run.phase})`);
     if(at.day>=29&&at.phase==='closing')break;
     if(at.phase==='end')throw Error('the Run ended before reaching D29 - '+JSON.stringify(await p.evaluate('Guild24.game.run.endReason')));
     await p.evaluate(()=>{const s=Guild24.game.run;if(s.money<300)s.money=800;s.stats.deaths=0;});
     await p.evaluate(`(${STEP})()`);
    }
    // STEP never touches the DOM, so the page is still showing whatever it last rendered before the
    // fast-forward (Day 1 or 2); render() once to catch it up before reading or clicking anything
    await p.evaluate(()=>Guild24.render());
    await dismissBoss();

    // FINAL: D29's 마감 -> 다음 날, which lands directly on D30's FINAL screen (no separate Morning)
    if(CASES.includes('final')){
     await p.waitForTimeout(120);
     await p.screenshot({path:path.join(OUT,`final-${width}-before.png`)});
     await p.click('.p-closing .dock [data-action="close"]');
     await p.waitForTimeout(30);
     await p.screenshot({path:path.join(OUT,`final-${width}-after.png`)});
     console.log('CAPTURE final @'+width);
    }else{
     await p.evaluate(()=>{Guild24.game.closeDay();Guild24.render();});
    }

    // END: the boss confirm modal -> boss-go, which resolves the battle and lands directly on END
    if(CASES.includes('end')){
     await dismissBoss();
     // D30's own Store Support milestone reveal ('나중에 결정') blocks the muster the same way
     for(let i=0;i<5;i++){const d=await p.$('#modal-root [data-action="dismiss"]');if(!d)break;await d.click();}
     const ids=await p.evaluate('Guild24.game.finalEligible().slice(0,3).map(n=>n.id)');
     for(const id of ids)await pickFinal(p,id);
     await p.click('.p-final .dock [data-action="final-commit"]');
     // a party under 3 asks for confirmation first (this seed's D30 roster may be short of 3)
     const under=await p.$('#modal-root [data-action="final-commit-go"]');if(under)await under.click();
     await p.click('.p-final .dock [data-action="boss"]');
     await p.waitForTimeout(120);
     await p.screenshot({path:path.join(OUT,`end-${width}-before.png`)});
     await p.click('#modal-root [data-action="boss-go"]');
     await p.waitForTimeout(30);
     const won=await p.evaluate(`Guild24.game.run.win`);
     await p.screenshot({path:path.join(OUT,`end-${width}-after.png`)});
     // H5 already animates this screen's own content (200 ms hold + 90 ms seal fall + tape dip); same
     // reasoning as CLOSING above - the instant frame alone would overstate how bare this cut still is
     await p.waitForTimeout(600);
     await p.screenshot({path:path.join(OUT,`end-${width}-settled.png`)});
     console.log('CAPTURE end @'+width+' win='+won);
    }
   }
   await ctx.close();
  }
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
