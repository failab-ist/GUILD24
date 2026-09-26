// REPLAY NUDGE (UI_UX §END — REPLAY NUDGE, §Pre-Run Decoration empty-slot interaction; UI-Q-v29-37) - runtime regression.
// Dev-only. One account through five endings on a real page, 390 and 1280, reduced motion; the Day, the Gross Sales and the
// D10 record are set before the real ending so each END states one case (end() itself settles and records):
//   1 first ending, small settlement            -> no line
//   2 settlement crosses 500 (unowned 500s)      -> 점포 자본으로 새 장식을 들일 수 있다.  (and a purchase from END keeps it)
//   3 no crossing, a higher Day                  -> 지금까지 가장 오래 버틴 점포다 · DAY 18   (and a reload prints it again)
//   4 a tie with the best Day                    -> no line
//   5 the Run opened 길드 특제 도시락 at D10       -> 본사 해금 lists it, no line
// then 새 점포 준비: only the display Slot (500) carries 들일 수 있음 at a capital of 500~749.
//   node tools/qa-replay-nudge.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5196),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox']});
 try{
  for(const width of [390,1280]){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{if(!sessionStorage.getItem('qa-nudge')){localStorage.clear();sessionStorage.setItem('qa-nudge','1');}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(width+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   const ending=async(i,day,revenue,d10)=>{
    await p.evaluate(([i,day,revenue,d10])=>{const g=Guild24.game;(g.account.tutorial??={}).skipped=true;g.start('qa-nudge-'+i);
     if(d10)(g.run.dayUnlocked??=[]).push(DATA.itemBy.premium.name);g.run.day=day;g.run.stats.revenue=revenue;g.end(false,'qa');Guild24.render();},[i,day,revenue,d10]);
    for(let k=0;k<4;k++){const b=await p.$('#modal-root [data-action="boss-seen"]')||await p.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();}
    await p.waitForSelector('.p-end');
    if(OUT)await p.screenshot({path:path.join(OUT,`nudge-${width}-${i}.png`),fullPage:true});
    return p.evaluate(()=>({line:document.querySelector('.end-tape .replay')?.textContent||'',opened:document.querySelector('.end-tape .opened b')?.textContent||''}));};
   let r=await ending(1,12,1000);check(width+' 1 the first ending prints no line',r.line===''&&r.opened==='',JSON.stringify(r));
   r=await ending(2,15,30000);check(width+' 2 a settlement that crosses an unowned price names no Decoration',r.line==='점포 자본으로 새 장식을 들일 수 있다.',r.line);
   // a Decoration bought from the ending does not rewrite the receipt (judged once at the settlement); the purchase is undone
   // after so the rest of the account story is unchanged
   const after=await p.evaluate(()=>{const a=Guild24.game.account,kept=JSON.parse(JSON.stringify(a.store));Meta.buyDecoration(a,'premiumCase');Guild24.render();
    const line=document.querySelector('.end-tape .replay')?.textContent||'';a.store=kept;Guild24.game.save();Guild24.render();return line;});
   check(width+' 2 a purchase from the ending leaves the printed line as it was',after==='점포 자본으로 새 장식을 들일 수 있다.',after);
   r=await ending(3,18,1000);check(width+' 3 a new best Day',r.line==='지금까지 가장 오래 버틴 점포다 · DAY 18',r.line);
   await p.reload({waitUntil:'load'});await p.waitForSelector('.p-end');
   const again=await p.evaluate(()=>document.querySelector('.end-tape .replay')?.textContent||'');check(width+' 3 a reload of the ended Run prints the same line',again===r.line,again);
   r=await ending(4,18,1000);check(width+' 4 a tie prints nothing',r.line==='',r.line);
   r=await ending(5,12,1000,true);check(width+' 5 a D10 open is listed in 본사 해금 and no line is added',r.opened.includes(await p.evaluate(()=>DATA.itemBy.premium.name))&&r.line==='',JSON.stringify(r));
   // 새 점포 준비: capital 500~749 -> the display Slot only
   await p.click('[data-action="new"]');await p.waitForSelector('#modal-root .deco-line');
   const marks=await p.evaluate(()=>({capital:Meta.storeCapital(Guild24.game.account),slots:[...document.querySelectorAll('#modal-root .deco-line')].map(li=>!!li.querySelector('.can-buy'))}));
   if(OUT)await p.screenshot({path:path.join(OUT,`nudge-${width}-prerun.png`)});
   check(width+' pre-run: only the Slot the capital covers carries 들일 수 있음',marks.capital>=500&&marks.capital<750&&JSON.stringify(marks.slots)===JSON.stringify([false,false,false,true]),JSON.stringify(marks));
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok).length;
 console.log(failed?`${failed} replay-nudge checks failed`:`all ${results.length} replay-nudge checks passed`);process.exitCode=failed?1:0;
})().catch(e=>{console.error(e);process.exit(1);});
