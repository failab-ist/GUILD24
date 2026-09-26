// v2.9.2 H2 SALE counter-feel evidence. Capture-only (not in qa:runtime): a seeded Run is played to a Day-2 SALE, the
// current customer is given a Wallet that covers every key, and one real price key is pressed per capture - 50% / 정가 /
// 150% as a sale and 정가 as a refusal. The outcome is pinned by the capture (the customer's chance is forced to 1 or 0
// on the page's own Game instance), so the frames show the beat, not a die roll. Without QA_FRAMES: a settled
// reduced-motion capture 400 ms after the press; with QA_FRAMES the press itself with motion on (anime slowed ten
// times - QA_SLOW=1 for an end-state capture at real speed, since the stub's own timers run on the wall clock).
//   QA_FRAMES=0,60,120,200,320 node tools/qa-sale-beat.cjs <out-dir> [widths] [cases]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/sale-beat');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const CASES=(process.argv[4]||'half,full,overcharge,refuse').split(',');
const PORT=Number(process.env.QA_PORT||5189),FIXED_NOW=1790112000000;
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
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-sale-1');
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='sell'&&Guild24.game.run.day>=2`))break;await p.evaluate(`(${STEP})()`);}
   await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,n=g.current();n.money=9999;n.pack=[];n.refused=[];
    for(const id of ['potion','rice','water','herbtea'])s.inventory.push({id:'qa-'+id,item:id,cost:Math.round(DATA.itemBy[id].sell*.5),expires:s.day+3});
    const orig=g.interest.bind(g);g.interest=(a,b,c)=>{const r=orig(a,b,c);return {...r,chance:window.__force??r.chance};};
    g.save();Guild24.render();})()`);
   await p.waitForTimeout(500);
   // the clock runs from the pick on, so the pick's own tray entry (190 ms) has finished before the press is slowed
   if(motion)await p.evaluate(()=>{window.__live=true;});
   await p.click('.p-sale .goods [data-action="select"]');await p.waitForTimeout(400);
   const mode=kind==='refuse'?'full':kind;
   await p.evaluate(f=>{window.__force=f;},kind==='refuse'?0:1);
   if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
   const key=`.tills button[data-mode="${mode}"]`;
   if(!motion)await p.screenshot({path:path.join(OUT,`sale-${kind}-${width}-pre.png`)});
   const t0=await p.evaluate(()=>performance.now());
   await p.click(key);
   if(motion){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
     await p.screenshot({path:path.join(OUT,`sale-${kind}-${width}-f${String(ms).padStart(4,'0')}.png`)});}
    console.log('FRAMES '+kind+' @'+width);}
   else{await p.waitForTimeout(400);await p.screenshot({path:path.join(OUT,`sale-${kind}-${width}.png`)});console.log('CAPTURE '+kind+' @'+width);}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
