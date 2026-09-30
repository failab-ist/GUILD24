// v3.0 prep measurement (User 2026-09-30, rubric §9-4 B1): a fresh account with the tutorial ON, on a 390x844 phone, from the first
// screen to the first completed sale by the shortest path (every coach mark read with 다음, one Item ordered, 정가). Counts the taps
// and the characters the player is asked to read (coach bubbles and modals; the screens' own text is logged separately). Dev-only,
// drives the real game in a real browser, captures each step. Measurement only, nothing written to Canonical.
//   node tools/measure-first-sale-v30.cjs [out-dir=reports/ui/first-sale]
const {spawn}=require('node:child_process'),fs=require('node:fs');const path=require('node:path');const ROOT=path.resolve(__dirname,'..'),PORT=Number(process.env.QA_PORT||5211),EXEC=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=path.resolve(process.argv[2]||path.join(ROOT,'reports/ui/first-sale'));
function serve(){const c=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{c.stdout.on('data',d=>String(d).includes('ready')&&res(c));setTimeout(()=>rej(Error('no server')),8000);});}
(async()=>{
 const playwright=require('playwright');const server=await serve();fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,locale:'ko-KR',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{if(!sessionStorage.getItem('qa-b1')){localStorage.clear();sessionStorage.setItem('qa-b1','1');}});
 const page=await ctx.newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await page.waitForTimeout(500);
 const log=[];let taps=0,mustRead=0,screens=0,shot=0;
 const st=()=>page.evaluate(()=>{const s=Guild24.game.run;const m=document.querySelector('#modal-root .modal, #modal-root .relic-takeover');
  return {day:s?.day,phase:s?.phase,cursor:s?.cursor,revenue:s?.stats?.revenue,modal:m?m.getAttribute('aria-label'):null,coach:!!document.querySelector('#coach-root [data-action="coach-next"]'),
   screenChars:(document.querySelector('#app')?.innerText||'').replace(/\s+/g,'').length};});
 const snap=async(name)=>{await page.screenshot({path:`${OUT}/${String(++shot).padStart(2,'0')}-${name}.png`});};
 const tap=async(sel,label)=>{const el=await page.$(sel);if(!el){log.push('MISSING '+sel);return false;}try{await el.click({timeout:5000});}catch(e){log.push('click fallback '+(label||sel)+': '+e.message.split('\n')[0]);try{await el.click({force:true,timeout:3000});}catch(e2){log.push('FAIL '+(label||sel));await snap('fail');return false;}}taps++;await page.waitForTimeout(350);log.push(`tap#${taps} ${label||sel}`);return true;};
 const text=sel=>page.evaluate(s=>(document.querySelector(s)?.innerText||'').replace(/\s+/g,' ').trim(),sel);
 const drainCoach=async(label)=>{let n=0;while(await page.$('#coach-root [data-action="coach-next"]')){const t=await text('#coach-root');mustRead+=t.replace(/\s/g,'').length;
   log.push(`coach[${label}] ${t.replace(/\s/g,'').length}자 "${t.slice(0,70)}"`);if(n===0)await snap(label+'-coach');await tap('#coach-root [data-action="coach-next"]','다음');if(++n>14)break;}return n;};
 const drainModals=async(label)=>{let n=0;for(;;){const s=await st();if(!s.modal)break;
   if(await page.$('#modal-root [data-action="buy-relic"]')){await drainCoach('relic');const t=await text('#modal-root');mustRead+=t.replace(/\s/g,'').length;log.push(`modal[${s.modal}] ${t.replace(/\s/g,'').length}자`);await snap('relic');await tap('#modal-root [data-action="buy-relic"]','점포지원 선택');n++;continue;}
   const t=await text('#modal-root');mustRead+=t.replace(/\s/g,'').length;log.push(`modal[${s.modal}] ${t.replace(/\s/g,'').length}자 "${t.slice(0,60)}"`);await snap(label+'-modal-'+n);
   const ok=await tap('#modal-root [data-action="boss-seen"], #modal-root [data-action="approve"], #modal-root [data-action="dismiss"]','모달 확인');if(!ok)break;if(++n>10)break;}return n;};
 // 1 first screen
 let s=await st();screens++;log.push(`screen prep ${s.screenChars}자 (화면 전체)`);await snap('prep');
 await page.evaluate(()=>{Guild24.game.start('b1-fresh');Guild24.render();});   // fixed seed; tutorial NOT skipped
 await drainCoach('prep');
 if(await page.$('.p-prep [data-action="start"]'))await tap('.p-prep [data-action="start"]','문 열기');else await page.evaluate('Guild24.render()');
 await drainModals('day0');
 // morning
 s=await st();screens++;log.push(`screen ${s.phase} D${s.day} ${s.screenChars}자 (화면 전체)`);await snap('morning');
 await drainModals('morning');await drainCoach('morning');
 await tap('[data-action="begin-order"]','발주 시작');
 s=await st();screens++;log.push(`screen ${s.phase} D${s.day} ${s.screenChars}자 (화면 전체)`);await snap('order');
 await drainModals('order');await drainCoach('order');
 await tap('[data-action="qty"][data-q="1"]:not([disabled])','수량 1');await drainCoach('order-after-qty');
 await tap('[data-action="confirm-order"]:not([disabled])','발주 확정');await drainCoach('order-after-confirm');
 s=await st();if(s.phase==='order'){await tap('[data-action="open-store"]','문 열기');await drainCoach('order-after-open');}
 s=await st();screens++;log.push(`screen ${s.phase} D${s.day} ${s.screenChars}자 (화면 전체)`);await snap('sale');
 await drainModals('sale');await drainCoach('sale');
 await tap('[data-action="select"]','상품 선택');await drainCoach('sale-tray');await snap('sale-tray');
 s=await st();log.push('tray state '+JSON.stringify({phase:s.phase,cursor:s.cursor}));await snap('sale-tray');
 await tap('.tills button[data-action="sell"][data-mode="full"]:not([disabled]), .tills button[data-action="sell"]:not([disabled])','정가 판매');
 await page.waitForTimeout(800);s=await st();await snap('after-sale');
 console.log(log.join('\n'));
 console.log(JSON.stringify({taps,mustReadChars:mustRead,screens,finalState:s},null,1));
 await browser.close();server.kill();
})().catch(e=>{console.error(e);process.exit(1);});
