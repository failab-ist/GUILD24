// UI_UX COUNTER TRAY: catalogue fit, utility/no-change distinction and shelf head alignment.
// UI fixtures only; no balance outcome is measured.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||'reports/ui/sale-ribbon/catalogue');
const port=Number(process.env.QA_PORT||5295),capture=process.env.QA_CAPTURE_ONLY==='1';
const sizes=process.env.QA_SIZES?JSON.parse(process.env.QA_SIZES):[[360,597],[375,548],[390,780],[1280,880]];
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
let checks=0;const check=(ok,label)=>{if(!capture){checks++;assert.ok(ok,label);}};
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.once('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 const results=[];
 try{for(const [width,height]of sizes){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<1024?2:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:'reduce'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  if(process.env.QA_BASELINE_APP)await p.route('**/ui/app.js',r=>r.fulfill({path:process.env.QA_BASELINE_APP,contentType:'text/javascript'}));
  if(process.env.QA_BASELINE_CSS)await p.route('**/ui/ui.css',r=>r.fulfill({path:process.env.QA_BASELINE_CSS,contentType:'text/css'}));
  await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  await p.evaluate(()=>{Guild24.game.start('qa-sale-compare-d5');Guild24.game.account.tutorial.skipped=true;Guild24.render();});
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.locator('#modal-root [data-action="buy-relic"]').first().click();
  for(let i=0;i<500;i++){if(await p.evaluate(()=>Guild24.game.run.phase==='sell'&&Guild24.game.run.day===5))break;await p.evaluate(()=>Guild24.game.run.money=99999);await p.evaluate(`(${STEP})()`);}
  await p.evaluate(()=>{const g=Guild24.game,n=g.current(),s=g.run;g.account.tutorial.skipped=true;n.money=9999;n.pack=[];n.refused=[];
   s.inventory=DATA.items.map((it,i)=>({id:'ribbon-'+i,item:it.id,cost:it.buy,expires:s.day+3}));g.save();Guild24.render();});
  for(let i=0;i<8;i++){const b=p.locator('#modal-root [data-action="boss-seen"],#modal-root [data-action="dismiss"]');if(!await b.count())break;await b.first().click();}
  await p.waitForTimeout(3400);
  const items=await p.evaluate(()=>DATA.items.map(it=>({id:it.id,name:it.name,utility:['kit','coupon','worldcharm'].includes(it.id)})));
  const rows=[];
  for(const it of items){
   const id=await p.evaluate(item=>Guild24.game.run.inventory.find(s=>s.item===item).id,it.id);
   await p.locator('.goods [data-action="select"][data-id="'+id+'"]').dispatchEvent('click');await p.waitForTimeout(80);
   if(await p.locator('.counter-tray.folded').count())await p.locator('.tray-unfold').click();
   const info=await p.evaluate(()=>{
    const r=e=>e.getBoundingClientRect(),tray=document.querySelector('.counter-tray'),tr=r(tray),keys=[...tray.querySelectorAll('.tills button')];
    const text=[...tray.querySelectorAll('.tray-what>b,.tray-stock,.tray-delta,.tills em,.tills em span,.tills strong,.tills small')].filter(e=>r(e).width>0);
    const inside=text.every(e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1&&r(e).left>=tr.left&&r(e).right<=tr.right+1&&r(e).bottom<=tr.bottom);
    const roles=keys.map(k=>({mode:k.dataset.mode,text:k.querySelector('em').innerText.replace(/\s+/g,' ').trim(),label:k.getAttribute('aria-label'),height:r(k).height}));
    const ribbonFit=keys.every(k=>[...k.querySelectorAll('em span')].every(e=>r(e).left>=r(k.querySelector('em')).left&&r(e).right<=r(k.querySelector('em')).right));
    const head=document.querySelector('.shelf-head'),title=head.querySelector('h2'),count=head.querySelector(':scope>span'),support=head.querySelector('.relic-ref');
    const centre=e=>(r(e).top+r(e).bottom)/2;
    return {inside,ribbonFit,roles,height:tr.height,text:tray.innerText,noChange:tray.innerText.includes('현재 준비 변화 없음'),special:!!tray.querySelector('.special'),
     aligned:Math.abs(centre(title)-centre(count))<=1&&Math.abs(centre(title)-centre(support))<=1,header:head.innerText,hscroll:document.documentElement.scrollWidth>innerWidth};
   });
   const tag=`${width}x${height} ${it.id}`;
   check(info.inside&&info.ribbonFit&&!info.hscroll,tag+' all catalogue text fits, including ribbon/price/profit');
   check(info.roles.length===3&&info.roles.every(k=>k.height>=48),tag+' three touch targets');
   check(info.roles.map(k=>k.text).join('|')==='할인 50%|정가|바가지 150%',tag+' role and percentage retained');
   check(info.aligned&&info.header.includes('진열대')&&info.header.includes('점포지원'),tag+' shelf head retained and centred');
   if(it.utility)check(!info.noChange&&info.special,tag+' complete utility replaces redundant no-change row');
   if(width<1024)check(info.height<=200,tag+' phone tray budget');
   if(['rope','coupon','kit','hyperenergy'].includes(it.id))await p.screenshot({path:path.join(out,`${width}x${height}-${it.id}.png`)});
   rows.push({id:it.id,...info});
  }
  // Controlled zero-result presentation boundary, without changing catalogue/game balance.
  // A numeric effect may not lose its no-change warning just because an effect row remains.
  await p.evaluate(()=>{window.__preview=Presentation.preview;Presentation.preview=()=>({direct:[]});});
  const numericId=await p.evaluate(()=>Guild24.game.run.inventory.find(s=>s.item==='rope').id);
  await p.locator('.goods [data-action="select"][data-id="'+numericId+'"]').dispatchEvent('click');
  check((await p.locator('.counter-tray').innerText()).includes('현재 준비 변화 없음'),'numeric no-change warning retained');
  await p.evaluate(()=>{Presentation.preview=window.__preview;});
  // Every production closed-key cause stays intact; each can wrap beneath the ribbon/amount.
  const causes=[['wallet','손님 소지금 부족'],['bag','가방 가득'],['event','오늘 가격 단속'],['refused','오늘 거절됨'],['ceiling','더 싼 값을 거절함']];
  for(const [kind,label]of causes){
   await p.evaluate(kind=>{const g=Guild24.game,n=g.current();n.money=9999;n.pack=[];n.refused=[];n.refusalReasons=[];g.run.event=null;
    if(kind==='wallet')n.money=0;
    if(kind==='bag')n.pack=['rice','water'];
    if(kind==='event')g.run.event={effects:{noOvercharge:true}};
    if(kind==='refused')n.refused=['rope:full'];
    if(kind==='ceiling'){n.refused=['rope:full','rope:overcharge'];n.refusalReasons=[{item:'rope',mode:'half'}];}
    Guild24.render();
   },kind);
   const reason=p.locator('.tills button:disabled small').filter({hasText:label});
   check(await reason.count()>0,`${width}x${height} ${kind} exact disabled cause`);
   check(await reason.evaluateAll(es=>es.every(e=>{const r=e.getBoundingClientRect(),k=e.closest('button').getBoundingClientRect();return e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1&&r.left>=k.left&&r.right<=k.right&&r.bottom<=k.bottom;})),`${width}x${height} ${kind} cause fits key`);
   if(kind==='ceiling')await p.screenshot({path:path.join(out,`${width}x${height}-locked.png`)});
  }
  check(!errors.length,`${width}x${height} no runtime errors`);
  results.push({width,height,rows,errors});await ctx.close();console.log(`${width}x${height} ${items.length} catalogue items + 5 lock causes`);
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
 console.log(`${capture?'CAPTURE':'PASS'} ${checks} checks / ${results.length} viewports`);
})().catch(e=>{console.error(e);process.exitCode=1;});
