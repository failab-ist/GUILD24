// D0 FIRST-MORNING BRIEFING — flow evidence (CORE_RUN §D0 FIRST-MORNING BOSS BRIEFING — EXACT).
// Dev-only. Drives the real game in a real browser and keeps the save between reloads:
//   1 first Store Support resolved -> DAY 1 MORNING -> D0 is the first thing shown, before any
//     Event / Gate / ORDER, and Escape / 닫기 do not get past it
//   2 reload with D0 still owed -> D0 again
//   3 확인 -> only d0Seen changes, saved; reload -> no D0
//   4 a save already past DAY 1 whose bossReveal lacks the D0 marker (the pre-D0 save shape)
//     -> no retroactive D0
// Captures D0 at 390 and 1280.   node tools/qa-d0-flow.cjs <out-dir>
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/d0-flow');
const PORT=Number(process.env.QA_PORT||5194),FIXED_NOW=1790112000000;
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
const state=`(()=>{const s=Guild24.game.run;const m=document.querySelector('#modal-root .modal');
 return {day:s&&s.day,phase:s&&s.phase,d0Seen:s&&s.bossReveal&&s.bossReveal.d0Seen,
  modal:m?(m.querySelector('.boss-reveal')?.className||m.getAttribute('aria-label')):null,
  close:!!document.querySelector('#modal-root .modal-header [data-action="dismiss"]'),
  bossArt:!!document.querySelector('#modal-root .boss-art, #modal-root .boss-id'),
  text:m?m.innerText:''};})()`;
/* one clean browser per scenario: storage is cleared on its FIRST load only, so every later
   reload keeps the save the way a player's browser would (the page also saves on unload, so
   clearing an already-running page would only have the Run written straight back) */
async function scenario(browser,width,seed){
 const desktop=width>=1024;
 const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
  isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
 await ctx.addInitScript(t=>{Date.now=()=>t;if(!sessionStorage.getItem('qa-d0')){localStorage.clear();sessionStorage.setItem('qa-d0','1');}},FIXED_NOW);
 const page=await ctx.newPage();
 page.on('pageerror',e=>check('no page error',false,e.message));
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
 await fresh(page,seed);
 return {ctx,page};}
async function fresh(page,seed){
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
 await page.click('#modal-root [data-action="start"]');
 await page.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
 await page.click('#modal-root [data-action="buy-relic"]');   // the first Store Support choice
 await page.waitForTimeout(600);   // let the shade finish settling before anything is read or captured
}
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  // 1
  let {ctx,page}=await scenario(browser,390,'qa-d0-1');
  let st=await page.evaluate(state);
  check('1 after the first Store Support the Run is on DAY 1 MORNING',st.day===1&&st.phase==='morning',JSON.stringify({day:st.day,phase:st.phase}));
  check('1 D0 is the open report, ahead of any ordinary Morning surface',/\bd0\b/.test(st.modal||''),String(st.modal));
  check('1 D0 shows no Boss art or name',!st.bossArt&&!st.text.includes(await page.evaluate(`DATA.bossBy[Guild24.game.run.bossId].name`)));
  check('1 D0 offers no 닫기',!st.close);
  await page.screenshot({path:path.join(OUT,'d0-390.png')});
  const before=await page.evaluate(`JSON.stringify(Guild24.game.run)`);
  await page.keyboard.press('Escape');await page.waitForTimeout(100);
  st=await page.evaluate(state);
  check('1 Escape does not close or consume D0',/\bd0\b/.test(st.modal||'')&&!st.d0Seen);
  // 2
  await page.reload({waitUntil:'load'});await page.waitForTimeout(200);
  st=await page.evaluate(state);
  check('2 reload with D0 unacknowledged: D0 again',/\bd0\b/.test(st.modal||'')&&st.day===1&&!st.d0Seen);
  check('2 opening and reloading D0 changed nothing in the Run',await page.evaluate(`JSON.stringify(Guild24.game.run)`)===before);
  // 3
  await page.click('#modal-root [data-action="boss-seen"]');await page.waitForTimeout(150);
  const after=JSON.parse(await page.evaluate(`JSON.stringify(Guild24.game.run)`)),was=JSON.parse(before);
  const onlyMarker=JSON.stringify({...after,bossReveal:{...after.bossReveal,d0Seen:false}})===JSON.stringify({...was,bossReveal:{...was.bossReveal,d0Seen:false}});
  check('3 확인 records D0 seen and nothing else',after.bossReveal.d0Seen===true&&onlyMarker);
  check('3 the seen marker is in the save',await page.evaluate(`(()=>{for(const k of Object.keys(localStorage)){const v=localStorage.getItem(k);if(v&&v.includes('"d0Seen":true'))return true;}return false;})()`));
  st=await page.evaluate(state);
  check('3 after 확인 the ordinary Morning resumes (no Boss report open)',!/boss-reveal/.test(st.modal||'')&&st.phase==='morning',String(st.modal));
  await page.reload({waitUntil:'load'});await page.waitForTimeout(200);
  st=await page.evaluate(state);
  check('3 reload after 확인: no D0',!/\bd0\b/.test(st.modal||''),String(st.modal));
  await ctx.close();
  // 4
  ({ctx,page}=await scenario(browser,390,'qa-d0-4'));
  await page.click('#modal-root [data-action="boss-seen"]');
  await page.evaluate(`(()=>{const g=Guild24.game,s=g.run;for(let i=0;i<60&&!(s.day>=3&&s.phase==='morning');i++){
   if(s.phase==='morning')g.beginOrder();else if(s.phase==='order'){try{g.confirmOrder();}catch(e){}g.open();}
   else if(s.phase==='sell'){g.depart();}else if(s.phase==='night')g.finishNight();else if(s.phase==='closing')g.closeDay();}
   delete s.bossReveal.d0Seen; if(s.event)s.eventSeen=true; g.save();})()`);
  await page.reload({waitUntil:'load'});await page.waitForTimeout(200);
  st=await page.evaluate(state);
  check('4 a save past DAY 1 without the D0 marker gets no retroactive D0',st.day>=3&&!/\bd0\b/.test(st.modal||''),JSON.stringify({day:st.day,modal:st.modal}));
  await ctx.close();
  // desktop capture of the same beat
  const {ctx:dctx,page:dp}=await scenario(browser,1280,'qa-d0-1');await dp.mouse.move(1,1);
  await dp.screenshot({path:path.join(OUT,'d0-1280.png')});
  await dctx.close();
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok).length;
 console.log(failed?failed+' D0 check(s) FAILED':'all '+results.length+' D0 checks passed');
 process.exit(failed?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
