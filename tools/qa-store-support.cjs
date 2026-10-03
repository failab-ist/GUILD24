// UI_UX RELIC VISUAL: supplied background, candidate fit, footer and D0/D5 interactions.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||'reports/ui/support/after');
const port=Number(process.env.QA_PORT||5320),capture=process.env.QA_CAPTURE_ONLY==='1',motion=process.env.QA_MOTION==='1';
const sizes=process.env.QA_SIZES?JSON.parse(process.env.QA_SIZES):[[360,640],[375,548],[390,780],[430,780],[1280,700],[1280,880]];
let checks=0;const results=[],check=(ok,label)=>{if(!capture){checks++;assert.ok(ok,label);}};
for(const r of JSON.parse(fs.readFileSync(path.join(root,'reports/references/store-support-2026-10-03/originals.json'),'utf8'))){
 const data=fs.readFileSync(path.join(root,r.repository_path));
 check(data.length===r.bytes&&require('node:crypto').createHash('sha256').update(data).digest('hex')===r.sha256,r.repository_path+' original bytes retained');
}
(async()=>{fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.once('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 try{for(const [width,height]of sizes){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<1024?2:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  if(process.env.QA_BASELINE_CSS)await p.route('**/ui.css',r=>r.fulfill({contentType:'text/css',body:fs.readFileSync(process.env.QA_BASELINE_CSS,'utf8')}));
  await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.start('qa-support-design');Guild24.render();});
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.waitForTimeout(300);
  const tag=`${width}x${height}`,geometry=()=>p.evaluate(()=>{
   const box=e=>e.getBoundingClientRect(),panel=document.querySelector('.relic-takeover'),scroll=panel.querySelector('.scroll'),footer=panel.querySelector('.close');
   const texts=[...panel.querySelectorAll('h2,h3,p,.cost,button')];
   const fit=texts.every(e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1);
   const f=box(footer),sc=box(scroll),buttons=[...footer.querySelectorAll('button')],cards=[...panel.querySelectorAll('.relic-plate')];
   const hit=e=>{const b=box(e),t=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);return !!t&&(e===t||e.contains(t));};
   return {fit,background:getComputedStyle(panel).backgroundImage,head:box(panel.querySelector('.relic-open')).height,
    footer:{top:f.top,bottom:f.bottom,height:f.height},scroll:{bottom:sc.bottom,height:sc.height},
    actions:buttons.every(e=>box(e).height>=44&&box(e).left>=0&&box(e).right<=innerWidth&&box(e).bottom<=innerHeight&&hit(e)),
    cards:cards.map(e=>{const key=box(e.querySelector('button')),price=box(e.querySelector('.cost')),effect=box(e.querySelector('p'));
     return {height:box(e).height,width:box(e).width,buttonWidth:key.width,buttonHeight:key.height,
      actionClear:price.right+8<=key.left&&effect.bottom+8<=Math.min(price.top,key.top),description:e.querySelector('p').innerText};}),
    columns:innerWidth>=1024?new Set(cards.map(e=>box(e).left)).size:1,hscroll:document.documentElement.scrollWidth>innerWidth};
  });
  const d0=await geometry();
  check(d0.fit&&!d0.hscroll&&d0.actions&&d0.scroll.bottom<=d0.footer.top+1,tag+' D0 text/footer fit');
  check(d0.cards.length===3&&d0.cards.every(c=>c.buttonHeight>=48&&c.actionClear),tag+' three candidates with separated effect/cost/selection');
  check(d0.background.includes(width<1024?'backroom-phone.jpg':'backroom-wide.jpg'),tag+' correct supplied background');
  check(width<1024?d0.cards.every(c=>c.buttonWidth>=120&&c.buttonWidth<c.width/2):d0.columns===3,tag+' compact choice tag / desktop three peers');
  check(await p.locator('.relic-plate .cost').allTextContents().then(a=>a.every(t=>t==='무료')),tag+' D0 live free prices');
  for(let i=0;i<3;i++){const key=p.locator('.relic-plate button').nth(i);await key.scrollIntoViewIfNeeded();check(await key.evaluate(e=>{const b=e.getBoundingClientRect(),f=document.querySelector('.relic-takeover .close').getBoundingClientRect();return b.top>=0&&b.bottom+3<=f.top;}),tag+' candidate '+i+' scrolls clear of footer');}
  await p.locator('.relic-takeover .scroll').evaluate(e=>e.scrollTop=0);await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-d0.png`)});
  if(capture){
   await p.locator('[data-action="defer-relic"]').click();await p.waitForTimeout(750);await p.reload({waitUntil:'load'});
   if(await p.locator('#modal-root [data-action="boss-seen"]').count())await p.locator('#modal-root [data-action="boss-seen"]').click();
   await p.evaluate(()=>{const g=Guild24.game,s=g.run;Object.assign(s.bossReveal,{d0Seen:true,identitySeen:true});s.phase='morning';s.day=5;s.money=9999;g.relicWindow(5);Guild24.render();});
   if(!await p.locator('.relic-takeover').count())await p.locator('[data-action="relics"]').first().click();
   await p.waitForTimeout(150);
   await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-d5.png`)});
   results.push({width,height,d0,errors});await ctx.close();continue;}
  const original=await p.evaluate(()=>JSON.stringify([Guild24.game.run.relicWindow.candidateIds,Guild24.game.run.relicWindow.candidatePrices]));
  await p.locator('[data-action="defer-relic"]').click();await p.waitForTimeout(750);
  check(await p.evaluate(()=>Guild24.game.run.day===1&&Guild24.game.run.phase==='morning'),tag+' native defer opens DAY 1');
  await p.reload({waitUntil:'load'});check(await p.evaluate(()=>JSON.stringify([Guild24.game.run.relicWindow.candidateIds,Guild24.game.run.relicWindow.candidatePrices]))===original,tag+' deferred candidates/prices persist');
  if(await p.locator('#modal-root [data-action="boss-seen"]').count())await p.locator('#modal-root [data-action="boss-seen"]').click();
  // D5 state uses the production window draw. This is a UI fixture, not a balance run.
  await p.evaluate(()=>{const g=Guild24.game,s=g.run;g.account.tutorial.skipped=true;Object.assign(s.bossReveal,{d0Seen:true,identitySeen:true});s.phase='morning';s.day=5;s.money=9999;g.relicWindow(5);Guild24.render();});
  if(!await p.locator('.relic-takeover').count())await p.locator('[data-action="relics"]').first().click();
  await p.waitForTimeout(150);const d5=await geometry();check(d5.fit&&d5.actions,tag+' D5 footer and text fit');
  check(await p.locator('.relic-plate .cost').allTextContents().then(async a=>JSON.stringify(a)===JSON.stringify(await p.evaluate(()=>Guild24.game.run.relicWindow.candidatePrices.map(n=>n.toLocaleString('ko-KR')+'G')))),tag+' D5 prices follow actual candidate data');
  await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-d5.png`)});
  const money=await p.evaluate(()=>Guild24.game.run.money);await p.locator('[data-action="reroll-relics"]').click();
  check(await p.evaluate(m=>Guild24.game.run.money===m-300&&Guild24.game.run.relicWindow.rerolls===1,money),tag+' native reroll uses existing cost');
  check(await p.locator('.relic-plate .cost').allTextContents().then(async a=>JSON.stringify(a)===JSON.stringify(await p.evaluate(()=>Guild24.game.run.relicWindow.candidatePrices.map(n=>n.toLocaleString('ko-KR')+'G')))),tag+' redrawn live prices');
  const redrawn=await p.evaluate(()=>JSON.stringify([Guild24.game.run.relicWindow.candidateIds,Guild24.game.run.relicWindow.candidatePrices]));
  await p.locator('.relic-takeover [data-action="dismiss"]').click();await p.reload({waitUntil:'load'});
  check(await p.evaluate(()=>JSON.stringify([Guild24.game.run.relicWindow.candidateIds,Guild24.game.run.relicWindow.candidatePrices]))===redrawn,tag+' reroll/defer/reload preserves candidates');
  await p.locator('[data-action="relics"]').first().click();
  await p.evaluate(()=>{Guild24.game.run.money=0;Guild24.render();});
  check(await p.locator('.relic-plate.unavailable button:disabled').count()===3,tag+' poor state has three disabled causes');
  check((await geometry()).fit,tag+' poor descriptions/costs fit');await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-poor.png`)});
  await p.evaluate(()=>{const g=Guild24.game;g.run.money=9999;g.buyRelic(g.run.relicWindow.candidateIds[0]);Guild24.render();});
  check(await p.locator('.relic-plate.owned button:disabled').innerText()==='보유 중',tag+' owned state');
  check((await geometry()).fit,tag+' owned state full text');await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-owned.png`)});
  const ids=await p.evaluate(()=>DATA.relics.map(r=>r.id));
  for(let i=0;i<ids.length;i+=3){await p.evaluate(batch=>{const s=Guild24.game.run,w=s.relicWindow;w.purchased=null;w.candidateIds=batch;w.candidatePrices=batch.map(id=>Math.round(DATA.relicBy[id].price*DATA.balance.relicPriceScale));Guild24.render();},ids.slice(i,i+3));
   const all=await geometry();check(all.fit&&!all.hscroll&&all.actions&&all.cards.every(c=>c.actionClear),tag+' catalogue batch '+i+' full name/condition/cost fit and separation');
  }
  await p.evaluate(()=>{const s=Guild24.game.run;s.bossId='SLOTH';s.sealBreakCount=0;s.relicWindow.slothSealOpportunity=true;Guild24.render();});
  check((await geometry()).fit&&(await geometry()).actions,tag+' seal alternative and footer fit');
  await p.locator('.seal-fold').click();check(await p.locator('.seal-chip').count()===1,tag+' seal folds');
  await p.locator('.relic-plate button').last().scrollIntoViewIfNeeded();check(await p.locator('.relic-plate button').last().evaluate(e=>e.getBoundingClientRect().bottom<document.querySelector('.seal-chip').getBoundingClientRect().top),tag+' last candidate clear of folded seal');
  await p.locator('.seal-chip').click();check(await p.locator('.seal-choice').count()===1,tag+' seal reopens');
  const purchase=await p.evaluate(()=>{const s=Guild24.game.run,w=s.relicWindow;return {money:s.money,id:w.candidateIds[0],price:w.candidatePrices[0]};});
  await p.locator('.relic-plate button').first().click();
  check(await p.evaluate(x=>Guild24.game.run.money===x.money-x.price&&Guild24.game.run.relicWindow.purchased===x.id,purchase),tag+' native paid purchase charges its displayed candidate price');
  await p.reload({waitUntil:'load'});
  check(await p.evaluate(x=>Guild24.game.run.money===x.money-x.price&&Guild24.game.run.relicWindow.purchased===x.id,purchase),tag+' native paid purchase persists');
  await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=false;Guild24.game.start('qa-support-coach');Guild24.render();});
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.waitForTimeout(400);
  const coach=await p.evaluate(()=>{const layer=document.querySelector('.coach-layer'),bubble=layer?.querySelector('.coach-bubble'),target=document.querySelector('.relic-open'),dock=document.querySelector('.relic-takeover .close');
   if(!bubble)return false;const b=bubble.getBoundingClientRect(),t=target.getBoundingClientRect(),d=dock.getBoundingClientRect();
   return b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=d.top&&!(b.top<t.bottom&&b.bottom>t.top)&&bubble.scrollWidth<=bubble.clientWidth+1;});
  check(coach,tag+' D0 coach visible and clear of title/footer');await p.mouse.move(0,0);await p.screenshot({path:path.join(out,`${tag}-coach.png`)});
  check(!errors.length,tag+' no runtime errors');results.push({width,height,d0,d5,errors});await ctx.close();console.log(tag+' D0/D5/poor/owned checked');
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(`${capture?'CAPTURE':'PASS'} ${checks} checks / ${results.length} viewports / ${motion?'motion':'reduced-motion'}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
