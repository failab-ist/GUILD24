// FULL RESET CLEARS THE PENDING RUN SEED — runtime regression (bug fix 2026-09-26).
// Dev-only. Drives the real controls in a real browser on a controlled clock: the page's Date.now reads window.__now, so every
// planned seed is `g24-` + the base-36 time the plan was made at, and each case moves the clock between steps on purpose - a
// stale seed and a fresh one can never coincide by timing luck.
//   A  END -> 다음 점포 열기 (plan at T1) -> 닫기 -> menu -> 설정 -> 전체 데이터 초기화 -> 전부 지우기 (clock T2) -> start
//      => the new Run's seed is planned at T2, never the pre-reset T1
//   B  reopening the preparation panel without a reset keeps the T1 plan
//   C  a trip through Store Management before start keeps the T1 plan
//   D  once start consumed a plan, the next Run plans its own (T3)
//   E  an in-progress Run reloads on its own persisted seed
//   node tools/qa-reset-seed.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path');
const PORT=Number(process.env.QA_PORT||5197),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const T1=1790112000000,T2=T1+86400000,T3=T2+86400000,T4=T3+86400000,seedAt=t=>'g24-'+t.toString(36);
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const at=(page,t)=>page.evaluate(t=>{window.__now=t;},t);
const seed=page=>page.evaluate(()=>Guild24.game.run&&Guild24.game.run.seed);
// a finished Run on the END screen, the state a player opens the next store from
async function endNow(page){
 // a Run started from the panel opens on its DAY 0 Store Support: take it with the real button so no locked panel is left over END
 if(await page.$('#modal-root [data-action="buy-relic"]'))await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(()=>{const g=Guild24.game;(g.account.tutorial??={}).skipped=true;g.end(false,'qa');Guild24.render();});
 // the Run was ended from its first screen, so that screen's panel may still be up over END
 // (the DAY 1 boss briefing is acknowledged with its own 확인, boss-seen; other panels close)
 for(let i=0;i<4;i++){const b=await page.$('#modal-root [data-action="boss-seen"]')||await page.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();}
 await page.waitForSelector('[data-action="new"]');}
async function toEnd(page,s){await page.evaluate(s=>Guild24.game.start(s),s);await endNow(page);}
const click=async(page,sel)=>{await page.waitForSelector(sel);await page.click(sel);};
(async()=>{
 const playwright=require('playwright'),server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox']});
 try{
  const open=async()=>{const ctx=await browser.newContext({viewport:{width:390,height:780},locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(t=>{const real=Date.now.bind(Date);window.__now=window.__now??t;Date.now=()=>window.__now??real();
    if(!sessionStorage.getItem('qa-reset')){localStorage.clear();sessionStorage.setItem('qa-reset','1');}},T1);
   const page=await ctx.newPage();page.on('pageerror',e=>check('no page error',false,e.message));
   await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});return {ctx,page};};
  // A - the bug path
  {const {ctx,page}=await open();await toEnd(page,'qa-reset-a');await at(page,T1);
   await click(page,'[data-action="new"]');                                       // plan at T1
   await click(page,'#modal-root [data-action="dismiss"]');await at(page,T2);
   await click(page,'[data-action="menu"]');await click(page,'#modal-root [data-action="settings"]');
   await click(page,'#modal-root [data-action="reset"]');await click(page,'#modal-root [data-action="reset-go"]');
   await click(page,'#modal-root [data-action="start"]');
   const s=await seed(page);check('A full reset clears the pending seed: the next Run is planned after the reset',s===seedAt(T2),'seed '+s+' (pre-reset plan '+seedAt(T1)+')');
   await ctx.close();}
  // B - reopening without a reset keeps the plan
  {const {ctx,page}=await open();await toEnd(page,'qa-reset-b');await at(page,T1);
   await click(page,'[data-action="new"]');await click(page,'#modal-root [data-action="dismiss"]');await at(page,T2);
   await click(page,'[data-action="new"]');await click(page,'#modal-root [data-action="start"]');
   const s=await seed(page);check('B reopening the preparation panel keeps its memoized seed',s===seedAt(T1),'seed '+s);await ctx.close();}
  // C - Store Management before start keeps the plan
  {const {ctx,page}=await open();await toEnd(page,'qa-reset-c');await at(page,T1);
   await click(page,'[data-action="new"]');await at(page,T2);
   await click(page,'#modal-root [data-action="store-manage"]');await click(page,'#modal-root [data-action="store-return"]');
   await click(page,'#modal-root [data-action="start"]');
   const s=await seed(page);check('C a Store Management trip does not reroll the planned seed',s===seedAt(T1),'seed '+s);await ctx.close();}
  // D - start consumes the plan; the next Run plans its own
  {const {ctx,page}=await open();await toEnd(page,'qa-reset-d');await at(page,T1);
   await click(page,'[data-action="new"]');await click(page,'#modal-root [data-action="start"]');const first=await seed(page);
   await endNow(page);await at(page,T3);
   await click(page,'[data-action="new"]');await click(page,'#modal-root [data-action="start"]');const second=await seed(page);
   check('D a started Run consumed its plan and the next Run plans its own',first===seedAt(T1)&&second===seedAt(T3),first+' -> '+second);await ctx.close();}
  // E - an in-progress Run keeps its persisted seed across a reload
  {const {ctx,page}=await open();await toEnd(page,'qa-reset-e');await at(page,T1);
   await click(page,'[data-action="new"]');await click(page,'#modal-root [data-action="start"]');const before=await seed(page);
   await page.evaluate(()=>Guild24.game.save());await at(page,T4);await page.reload({waitUntil:'load'});
   const after=await seed(page);check('E an in-progress Run reloads on its own persisted seed',before===after&&after===seedAt(T1),before+' / '+after);await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok).length;
 console.log(failed?`${failed} reset-seed checks failed`:`all ${results.length} reset-seed checks passed`);process.exitCode=failed?1:0;
})().catch(e=>{console.error(e);process.exit(1);});
