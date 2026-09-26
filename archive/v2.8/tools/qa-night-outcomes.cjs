// NIGHT outcome-state evidence — PRESENTATION BATCH 3 / UI-Q-v28-23.
// Dev-only capture. The Batch 3 base harness photographs one NIGHT result; this one finds the
// materially different Outcomes the game actually resolves and photographs each of them.
// Nothing is fabricated: every Run is the real game played through its public API with the
// same crude policy qa-visual.cjs uses, the resolver decides every Outcome, and the capture
// reaches a result only by pressing the real `다음` control. No DOM text, no Outcome field and
// no RNG is touched.
//   node tools/qa-night-outcomes.cjs <out-dir> [seedCount] [statesFrom.json]
// Passing a states.json from an earlier run skips the scan and replays exactly those results,
// so a BEFORE and an AFTER photograph the same resolved states.
// QA_FRAMES=90,200,... (v2.9.2 H1) also photographs the landing itself with motion on: the anime
// engine is slowed ten times for the result's own entry and a frame is taken at each beat-time
// offset (ms), next to the settled reduced-motion capture. Nothing else about the run changes.
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/night-outcomes');
const SEEDS=Number(process.argv[3]||60),PORT=Number(process.env.QA_PORT||5198);
const FIXED_NOW=1790112000000,EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const WIDTHS=(process.env.QA_WIDTHS||'390,1280').split(',').map(Number);
const STATES=process.argv[4]?path.resolve(__dirname,'..',process.argv[4]):null;
const FRAMES=(process.env.QA_FRAMES||'').split(',').filter(Boolean).map(Number),SLOW=10;
// the same page-side step as qa-visual.cjs, so the Runs are the same kind of Run
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
// what one resolved result is, read only from the record the resolver wrote
const CLASSIFY=`(r=>r.outcome==='사망'?'death':(r.rescued||r.avoidedDeath)?'rescue':r.outcome==='중상'?'severe'
 :r.outcome==='부상'?'injury':r.outcome==='퇴각'?'retreat':r.outcome==='대성공'?'great':'success')`;
const WANT=['success','great','retreat','injury','severe','death','rescue','hero','brink','prepared'];

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
// play until the NIGHT of `day` (or, when day is null, the whole Run, reporting every night)
async function play(page,day,onNight){
 let lastNight=-1;
 for(let i=0;i<1600;i++){
  const st=await page.evaluate(`(()=>{const s=Guild24.game.run;return s?{phase:s.phase,day:s.day}:null;})()`);
  if(!st||!['morning','order','sell','night','closing'].includes(st.phase))return false;
  if(st.phase==='night'&&st.day!==lastNight){lastNight=st.day;
   if(day===st.day)return true;
   if(onNight)await onNight(st.day);}
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
  // SCAN: real Runs, recording where each Outcome family first resolves
  const ctx=await browser.newContext({viewport:{width:390,height:780},locale:'ko-KR',reducedMotion:'reduce'});
  const page=await ctx.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  for(let k=1;!STATES&&k<=SEEDS&&WANT.some(w=>!found[w]);k++){
   const seed='qa-night-'+k;
   await begin(page,seed);
   await play(page,null,async day=>{
    const rows=await page.evaluate(`Guild24.game.run.results.map(r=>({kind:${CLASSIFY}(r),hero:!!Presentation.heroLine(r),brink:!!r.avoidedDeath,prepared:!r.rescued&&(r.events||[]).some(e=>e.id==='prepared'),outcome:r.outcome,name:r.name}))`);
    rows.forEach((r,index)=>{
     if(!found[r.kind])found[r.kind]={seed,day,index,outcome:r.outcome,name:r.name};
     if(r.hero&&!found.hero)found.hero={seed,day,index,outcome:r.outcome,name:r.name};
     // v2.9.2 H1: a Death turned into a return (the reversal whose first print is `사망`)
     if(r.brink&&!found.brink)found.brink={seed,day,index,outcome:r.outcome,name:r.name};
     // User 2026-09-25: a 만반의 준비 Death avoided without the Insurance flags - it reverses too
     if(r.prepared&&!found.prepared)found.prepared={seed,day,index,outcome:r.outcome,name:r.name};
    });
   });
  }
  await ctx.close();
  console.log(JSON.stringify(found,null,1));
  // CAPTURE: replay the same seed at each width and press 다음 up to the result
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
    for(let i=0;i<f.index;i++)await p.click('.p-night .dock [data-action="night-next"]');
    // the pointer that pressed 다음 would otherwise leave the next control in its hover state
    await p.mouse.move(1,1);
    await p.waitForTimeout(700);
    if(FRAMES.length){
     // the same result with motion on, reached the same way (the real 다음); the engine is slowed
     // just before the press (or the NIGHT entry) that brings it on screen, so each frame is exact
     const m=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
      isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'no-preference'});
     const mp=await m.newPage();
     await mp.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
     // begin() freezes Date.now for the Run, and the anime clock keeps the Date.now it finds at load:
     // it gets a wrapper that honours the freeze until the replay switches the real clock back on
     await mp.addInitScript(()=>{const real=Date.now.bind(Date);let frozen=null;
      const now=()=>window.__live||!frozen?real():frozen();
      Object.defineProperty(Date,'now',{configurable:true,get:()=>now,set:f=>{frozen=f;}});});
     await begin(mp,f.seed);
     if(await play(mp,f.day)){
      await mp.evaluate(clearReveals);
      const slow=`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`,mark=`(()=>{window.__t0=performance.now();})()`;
      if(!f.index)await mp.evaluate(slow);
      await mp.evaluate(`Guild24.render()`);
      for(let i=0;i<f.index;i++){if(i===f.index-1)await mp.evaluate(slow);
       await mp.click('.p-night .dock [data-action="night-next"]');}
      await mp.evaluate(mark);await mp.mouse.move(1,1);
      for(const ms of FRAMES){
       await mp.waitForFunction(t=>performance.now()-window.__t0>=t,ms*SLOW);
       await mp.screenshot({path:path.join(OUT,`night-${kind}-${width}-f${String(ms).padStart(4,'0')}.png`)});}
      console.log('FRAMES '+kind+' @'+width+' '+FRAMES.join('/')+' ms');}
     await m.close();}
    const check=await p.evaluate(`(()=>{const s=Guild24.game.run,r=s.results[s.nightCursor||0];return r&&r.name;})()`);
    if(check!==f.name){console.log('DRIFT '+kind+' @'+width+' '+check+' != '+f.name);continue;}
    await p.screenshot({path:path.join(OUT,`night-${kind}-${width}.png`)});
    console.log('CAPTURE '+kind+' @'+width+' '+f.outcome+' '+f.name+' ('+f.seed+' D'+f.day+' #'+f.index+')');
   }
   await c.close();
  }
  fs.writeFileSync(path.join(OUT,'states.json'),JSON.stringify(found,null,1));
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
