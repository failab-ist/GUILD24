// UI_UX UI-Q109 / UI-Q-v29-18 / SHORT PHONE: real SALE comparison and transaction regression.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const out=path.resolve(process.argv[2]||path.join(root,'reports/ui/sale-comparison/after'));
const port=Number(process.env.QA_PORT||5261),motion=process.env.QA_MOTION==='1';
let checks=0;const check=(ok,message)=>{checks++;assert.ok(ok,message);};
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const sizes=motion?[[390,780],[1280,880]]:[[360,640],[360,597],[375,548],[360,780],[390,780],[412,780],[430,780],[1280,880]];
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview startup timeout')),8000);server.once('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 const results=[];
 try{for(const [width,height]of sizes){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  await page.evaluate(()=>{Guild24.game.start('qa-sale-compare-d5');Guild24.game.account.tutorial.skipped=true;Guild24.render();});
  if(await page.locator('.p-prep [data-action="start"]').count())await page.locator('.p-prep [data-action="start"]').click();
  await page.locator('#modal-root [data-action="buy-relic"]').first().click();
  await page.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
  for(let i=0;i<500;i++){
   if(await page.evaluate(()=>Guild24.game.run.phase==='sell'&&Guild24.game.run.day>=5))break;
   await page.evaluate(()=>{Guild24.game.run.money=99999;});
   await page.evaluate(`(${STEP})()`);
  }
  await page.evaluate(()=>{const g=Guild24.game,s=g.run,n=g.current();
   if(s.phase!=='sell'||s.day<5)throw Error('D5 SALE fixture failed');
   n.money=9999;n.pack=[];n.refused=[];
   s.inventory=['cloak','rope','rice','water','lowpotion','kit','goldcoupon'].filter(id=>DATA.itemBy[id]).flatMap((id,i)=>Array.from({length:3},(_,j)=>({id:'compare-'+i+'-'+j,item:id,cost:Math.round(DATA.itemBy[id].sell*.5),expires:s.day+3})));
   g.save();Guild24.render();
  });
  for(let i=0;i<8;i++){
   const dismiss=page.locator('#modal-root [data-action="boss-seen"],#modal-root [data-action="dismiss"]');
   if(!await dismiss.count())break;await dismiss.first().click();
  }
  await page.waitForTimeout(3400);
  const entry=await page.evaluate(()=>{const sc=document.querySelector('.shelf-col'),clip=(innerWidth>=1024?sc:document.querySelector('.stage-scroll')).getBoundingClientRect();return {phase:Guild24.game.run.phase,day:Guild24.game.run.day,stock:document.querySelectorAll('.goods [data-action="select"]').length,fullRows:[...document.querySelectorAll('.goods [data-action="select"]')].filter(e=>{const r=e.getBoundingClientRect();return r.top>=clip.top&&r.bottom<=clip.bottom;}).length};});
  await page.screenshot({path:path.join(out,`${width}x${height}-entry.png`)});
  await page.locator('.goods [data-action="select"]').first().click();
  await page.waitForTimeout(250);
  const measure=await page.evaluate(()=>{
   const rect=sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,width:r.width};};
   const sc=innerWidth>=1024?document.querySelector('.shelf-col'):document.querySelector('.stage-scroll'),clip=sc.getBoundingClientRect();
   const rows=[...document.querySelectorAll('.goods [data-action="select"]')].map(e=>{const r=e.getBoundingClientRect();return {text:e.innerText,height:r.height,top:r.top,bottom:r.bottom,visible:r.top>=clip.top-1&&r.bottom<=clip.bottom+1};});
   return {front:rect('.front'),kit:rect('.kit'),kitHTML:document.querySelector('.kit').innerHTML,dest:rect('.dest-plate'),dossier:rect('.dossier'),shelf:rect('.shelf'),tray:rect('.counter-tray'),scroll:sc.scrollTop,clip:rect('.stage-scroll'),rows,fullRows:rows.filter(x=>x.visible).length,folded:document.querySelector('.counter-tray').classList.contains('folded'),keys:[...document.querySelectorAll('.tills button')].map(e=>({h:e.getBoundingClientRect().height,text:e.innerText})),hscroll:document.documentElement.scrollWidth>innerWidth};
  });
  await page.screenshot({path:path.join(out,`${width}x${height}-selected.png`)});
  const tag=`${width}x${height}`;
  const floor=height>=640?3:height>=597?2:1;
  check(entry.phase==='sell'&&entry.day>=5&&entry.stock>=6,tag+' representative fixture');
  check(entry.fullRows>=1,tag+' entry shelf row');
  check(measure.fullRows>=floor,tag+' selected comparison floor');
  check(!measure.folded,tag+' comparison measured with expanded tray');
  check(!measure.hscroll,tag+' no horizontal overflow');
  check(measure.keys.length===3&&measure.keys.every(k=>k.h>=44),tag+' three reachable price targets');
  if(width<1024)check(measure.tray.height<=200,tag+' tray height');
  check(await page.locator('.kit .slots i').count()===2,tag+' two Bag slots');
  check(await page.locator('.kit .slots i').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().width>=44&&e.getBoundingClientRect().height>=44)),tag+' Bag targets');
  const rowGeometry=()=>page.locator('.goods [data-action="select"]').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height));
  const heights=await rowGeometry();
  const scrollSelector=width>=1024?'.shelf-col':'.stage-scroll';
  const scrollBefore=await page.locator(scrollSelector).evaluate(e=>e.scrollTop);
  await page.locator('.goods [data-action="select"]').nth(1).dispatchEvent('click');
  await page.waitForTimeout(300);
  check(JSON.stringify(await rowGeometry())===JSON.stringify(heights),tag+' swap does not resize shelf rows');
  check(await page.locator(scrollSelector).evaluate(e=>e.scrollTop)===scrollBefore,tag+' swap preserves scroll');
  if(width<1024){
   await page.locator(scrollSelector).evaluate(e=>e.scrollTop=80);await page.waitForTimeout(150);
   check(await page.locator('.counter-tray').evaluate(e=>e.classList.contains('folded')),tag+' scroll folds tray');
   await page.locator('.tray-unfold').click();
   check(await page.locator('.counter-tray').evaluate(e=>!e.classList.contains('folded')),tag+' strip reopens tray');
  }
  await page.evaluate(()=>{const g=Guild24.game,original=g.interest.bind(g);g.interest=(...args)=>({...original(...args),chance:0});});
  await page.locator('.tills [data-mode="full"]').click();await page.waitForTimeout(450);
  check(await page.locator('.counter-tray:not(.folded)').count()===1,tag+' refusal keeps tray');
  check(await page.locator('.tills [data-mode="full"]').isDisabled(),tag+' refused price locked');
  await page.evaluate(()=>{const g=Guild24.game,original=g.interest.bind(g);g.interest=(...args)=>({...original(...args),chance:1});});
  await page.locator('.tills [data-mode="half"]').click();await page.waitForTimeout(600);
  check(await page.locator('.counter-tray:not(.empty)').count()===0,tag+' successful sale clears tray');
  check(await page.evaluate(()=>Guild24.game.current().pack.length===1),tag+' successful hand-over fills one Bag slot');
  check(!errors.length,tag+' no page errors');
  results.push({width,height,entry,...measure,errors});
  console.log(JSON.stringify({width,height,rows:measure.fullRows,front:measure.front.height,dossier:measure.dossier.height,tray:measure.tray.height,clip:measure.clip.height,scroll:measure.scroll}));
  await context.close();
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
 console.log(`PASS ${checks} checks / ${results.length} viewports / ${motion?'motion':'reduced-motion'}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
