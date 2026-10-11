// v3.0 trailer tooling (User 2026-10-01). Dev-only, measurement/capture only - nothing injected, no Canonical written. See reports/trailer-plan.md.
// Batch 1: load real-play snapshots into the real page, capture the five cuts' first frames, verify the boss result reproduces,
// and run the 5-second capture test two ways (screenshot frames vs recordVideo) on the SALE sequence.
//   node trailer-frames.cjs <snap.json> <itemName> <npcId> <outDir> [--test]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ROOT=require('node:path').resolve(__dirname,'..'),PORT=5213,EXEC='/opt/pw-browsers/chromium';
const [snapPath,itemName,npcId,outDir]=process.argv.slice(2);const TEST=process.argv.includes('--test');
const snaps=JSON.parse(fs.readFileSync(snapPath,'utf8'));fs.mkdirSync(outDir,{recursive:true});
function serve(){const c=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{c.stdout.on('data',d=>String(d).includes('ready')&&res(c));setTimeout(()=>rej(Error('no server')),8000);});}
const HIDE='.build-mark{display:none!important}#toast{display:none!important}';
async function load(ctx,snap,opts={}){const page=await ctx.newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await page.addStyleTag({content:HIDE});
 const run=JSON.parse(JSON.stringify(snap.run));run.rngState=snap.rng.state;if(opts.cursor!=null)run.nightCursor=opts.cursor;
 const account=JSON.parse(JSON.stringify(snap.account));(account.tutorial??={}).skipped=true;
 const json=JSON.stringify({version:9,account,run});
 await page.setInputFiles('#save-file',{name:'snap.json',mimeType:'application/json',buffer:Buffer.from(json)});
 await page.waitForTimeout(900);await page.addStyleTag({content:HIDE});
 for(let i=0;i<3;i++){const b=await page.$('#modal-root [data-action="boss-seen"], #modal-root [data-action="approve"], #modal-root [data-action="dismiss"]');if(!b)break;await b.click();await page.waitForTimeout(300);}
 return page;}
const st=p=>p.evaluate(()=>{const s=Guild24.game.run;return {day:s.day,phase:s.phase,cursor:s.cursor,current:Guild24.game.current()?.name,win:s.win,committed:s.finalCommitted,team:s.team};});
(async()=>{
 const playwright=require('playwright');const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const mk=(dpr,extra={})=>browser.newContext({viewport:{width:405,height:720},deviceScaleFactor:dpr,isMobile:true,hasTouch:true,locale:'ko-KR',...extra});
 const log=[];
 try{
  // --- cuts ---
  let ctx=await mk(3);let p=await load(ctx,snaps.sale);let s=await st(p);log.push({cut:'sale-arrive',...s});
  await p.screenshot({path:path.join(outDir,'cut1-sale-arrive.png')});
  const stockId=await p.evaluate(n=>{const s=Guild24.game.run;return (s.inventory.find(x=>DATA.itemBy[x.item]?.name===n)||{}).id;},itemName);
  log.push({stockId});
  await p.click(`[data-action="select"][data-id="${stockId}"]`);await p.waitForTimeout(600);await p.screenshot({path:path.join(outDir,'cut2-sale-tray.png')});
  const tills=await p.$$eval('.tills button[data-action="sell"]',b=>b.map(x=>({mode:x.dataset.mode,label:x.getAttribute('aria-label'),disabled:x.disabled})));log.push({tills});
  await p.click('.tills button[data-action="sell"][data-mode="full"]');await p.waitForTimeout(900);await p.screenshot({path:path.join(outDir,'cut2b-sale-handed.png')});
  s=await st(p);log.push({cut:'after-sale',...s});await ctx.close();
  // night: cursor at X
  const nightIdx=snaps.night.run.results.findIndex(r=>r.npcId===npcId||r.name===snaps.night.run.npcs.find(n=>n.id===npcId)?.name);log.push({nightIdx,result:snaps.night.run.results[nightIdx]?.outcome});
  ctx=await mk(3);p=await load(ctx,snaps.night,{cursor:nightIdx});await p.waitForTimeout(1500);await p.screenshot({path:path.join(outDir,'cut3-night-x.png')});await ctx.close();
  // final before: roster + boss; then run the real clash and verify the result
  ctx=await mk(3);p=await load(ctx,snaps.finalBefore);s=await st(p);log.push({cut:'final-before',...s});
  await p.screenshot({path:path.join(outDir,'cut4-final-before.png')});
  const bossBtn=await p.$('[data-action="boss"]');if(bossBtn){await bossBtn.click();await p.waitForTimeout(400);const go=await p.$('#modal-root [data-action="boss-go"]');if(go){await go.click();}
   const t0=Date.now();let shot=0;for(let i=0;i<60;i++){await p.waitForTimeout(500);const live=await p.evaluate(()=>!!document.querySelector('.clash'));if(live&&i%4===1&&shot<4){await p.screenshot({path:path.join(outDir,'cut4b-clash-'+(shot++)+'.png')});}if(!live&&i>2)break;}
   log.push({clashMs:Date.now()-t0});await p.waitForTimeout(600);await p.screenshot({path:path.join(outDir,'cut5-final-after.png')});
   s=await st(p);log.push({cut:'final-after',...s,expectedWin:snaps.finalAfter.run.win,reproduced:s.win===snaps.finalAfter.run.win});}
  else log.push({cut:'final-before',note:'no boss button',html:(await p.$$eval('.dock [data-action]',b=>b.map(x=>x.dataset.action)))});
  await ctx.close();
  // --- 5-second test, two ways ---
  if(TEST){
   const doSeq=async(page,tick)=>{const t0=Date.now();const at=async(ms,fn)=>{const d=t0+ms-Date.now();if(d>0)await page.waitForTimeout(d);await fn();};
    await at(600,()=>page.click(`[data-action="select"][data-id="${stockId}"]`));await at(2400,()=>page.click('.tills button[data-action="sell"][data-mode="full"]'));await at(5000,()=>{});};
   // (a) frames
   ctx=await mk(3);p=await load(ctx,snaps.sale);const fdir=path.join(outDir,'frames-a');fs.mkdirSync(fdir,{recursive:true});
   let n=0;const times=[];let stop=false;const loop=(async()=>{const t0=Date.now();while(!stop){const t=Date.now()-t0;await p.screenshot({path:path.join(fdir,String(n++).padStart(4,'0')+'.png')});times.push(Date.now()-t0-t);}})();
   await doSeq(p);stop=true;await loop;log.push({testA:{frames:n,seconds:5,avgIntervalMs:+(5000/n).toFixed(1),maxCaptureMs:Math.max(...times)}});await ctx.close();
   // (b) recordVideo
   ctx=await mk(3,{recordVideo:{dir:path.join(outDir,'video-b'),size:{width:1080,height:1920}}});p=await load(ctx,snaps.sale);await doSeq(p);const vpath=await p.video().path();await ctx.close();log.push({testB:{video:vpath}});}
  fs.writeFileSync(path.join(outDir,'log.json'),JSON.stringify(log,null,1));console.log(JSON.stringify(log,null,1));
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
