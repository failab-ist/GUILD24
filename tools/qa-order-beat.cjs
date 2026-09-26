// v2.9.2 H3 ORDER confirm evidence. Capture-only (not in qa:runtime): a seeded Run is played to a Day-2 ORDER, the till is
// funded and the cart holds K SKUs (1 / 3 / 6), with the warehouse list open or folded; the real 발주 확정 key is pressed.
// Without QA_FRAMES: a settled reduced-motion capture 500 ms after the press (plus the pre-press sheet); with QA_FRAMES the
// press itself with motion on (anime slowed QA_SLOW times, default 10; the clock runs from before the press).
//   QA_FRAMES=0,90,160,230,320,400 node tools/qa-order-beat.cjs <out-dir> [widths] [cases]   cases: k1-open,k3-open,k6-open,k3-fold
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/order-beat');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const CASES=(process.argv[4]||'k1-open,k3-open,k6-open,k3-fold').split(',');
const PORT=Number(process.env.QA_PORT||5190),FIXED_NOW=1790112000000;
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
   for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='order'&&Guild24.game.run.day>=2`))break;await p.evaluate(`(${STEP})()`);}
   const k=Number(kind.match(/k(\d)/)[1]),open=kind.endsWith('open');
   await p.evaluate(([k,open])=>{const g=Guild24.game,s=g.run;s.money=5000;g.account.settings.stockBriefOpen=open;s.cart={};
    // the real 교환 action until the sheet holds k distinct Items (the 6-SKU case needs a sheet without duplicates)
    for(let r=0;r<30&&new Set(s.offers.filter(o=>o.quantity).map(o=>o.item)).size<k;r++){s.money=5000;g.reroll();}s.money=5000;
    const seen=new Set();let n=0;for(let i=0;i<s.offers.length&&n<k;i++){const o=s.offers[i];if(!o.quantity||seen.has(o.item))continue;try{g.setQuantity(i,1);seen.add(o.item);n++;}catch(e){}}
    if(n<k)throw Error('only '+n+' distinct SKUs on the sheet for '+k);
    g.save();Guild24.render();},[k,open]);
   await p.waitForTimeout(400);
   await p.evaluate(()=>{const b=document.querySelector('.p-order .stock-brief');if(b)b.scrollIntoView({block:'center'});});
   await p.waitForTimeout(200);
   if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
   if(!motion)await p.screenshot({path:path.join(OUT,`order-${kind}-${width}-pre.png`)});
   const t0=await p.evaluate(()=>performance.now());
   await p.click('.p-order .dock [data-action="confirm-order"]');
   if(motion&&!process.env.QA_DOM){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
     await p.screenshot({path:path.join(OUT,`order-${kind}-${width}-f${String(ms).padStart(4,'0')}.png`)});}
    console.log('FRAMES '+kind+' @'+width);}
   if(process.env.QA_DOM){await p.waitForTimeout(motion?FRAMES.at(-1)*SLOW+300:500);console.log('DOM '+kind+' @'+width+' motion='+motion+' '+await p.evaluate(()=>{const f=document.querySelector('.p-order .form');return JSON.stringify([f.querySelector('.stock-brief').innerText,f.querySelector('#order-register').innerText,[...f.querySelectorAll('.stock-brief li')].map(li=>getComputedStyle(li).opacity+'/'+getComputedStyle(li.firstElementChild).opacity+'/'+getComputedStyle(li.firstElementChild).transform).join(',')]);}));}
   else if(!motion){await p.waitForTimeout(500);await p.screenshot({path:path.join(OUT,`order-${kind}-${width}.png`)});console.log('CAPTURE '+kind+' @'+width);}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
