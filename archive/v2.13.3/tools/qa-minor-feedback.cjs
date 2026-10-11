// Targeted UI fixtures and browser interactions; no balance measurement.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const out=path.resolve(process.argv[2]||'reports/ui/minor-feedback'),before=process.argv.includes('--before');
const port=5307;let checks=0;
const check=(ok,msg)=>{if(!before){assert.ok(ok,msg);checks++;}};
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview timeout')),8000);server.on('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
 let browser;
 try{browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||chromium.executablePath()});for(const width of (process.argv.includes('--phones')?[360,390,430,1280]:[390,1280])){
  const ctx=await browser.newContext({viewport:{width,height:width<1024?780:880},reducedMotion:'reduce',locale:'ko-KR'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  if(before)for(const file of ['ui/app.js','ui/presentation.js','ui/ui.css','systems/shop.js','systems/dungeon.js']){
   const body=execFileSync('git',['show','a23a47be:dist/'+file],{encoding:'utf8'});
   await p.route('**/'+file,route=>route.fulfill({body,contentType:file.endsWith('.css')?'text/css':'text/javascript'}));
  }
  await p.goto(`http://127.0.0.1:${port}`);
  if(await p.locator('[data-action="prologue-skip"]').count())await p.locator('[data-action="prologue-skip"]').click();
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.evaluate(()=>{window.__live=true;const g=Guild24.game;g.autosave=false;g.start('minor-feedback');g.account.tutorial.skipped=true;g.buyRelic(g.run.relicWindow.candidateIds[0]);g.run.bossReveal.d0Seen=true;g.run.event=null;g.beginOrder();Guild24.render();});
  await p.screenshot({path:path.join(out,`order-${width}.png`)});
  const aligned=await p.evaluate(()=>{const a=document.querySelector('.form [data-action="gates"]').getBoundingClientRect(),b=document.querySelector('.form .ref-row').getBoundingClientRect();return a.top>=b.top&&a.bottom<=b.bottom+1;});
  check(aligned,'risk control shares support row');
  check(await p.evaluate(()=>Math.abs(document.querySelector('.form [data-action="gates"]').getBoundingClientRect().left-document.querySelector('.brief .when p').getBoundingClientRect().left)<1),'risk aligns with visitor count');
  if(!before)check(await p.locator('.form [data-action="gates"]').evaluate(e=>getComputedStyle(e).textDecorationStyle==='dotted'),'risk dotted underline');
  await p.evaluate(()=>document.querySelector('.form [data-action="reroll"]').scrollIntoView({block:'center'}));await p.waitForTimeout(100);await p.screenshot({path:path.join(out,`reroll-${width}.png`)});
  await p.locator('.form [data-action="gates"]').click();check(await p.locator('#modal-root').innerText().then(t=>t.includes('오늘 열린 게이트')),'risk opens');await p.locator('#modal-root [data-action="dismiss"]').first().click();
  await p.evaluate(()=>{const g=Guild24.game;g.open();const n=g.current();n.fatigue=10;n.injury=0;n.status='건강';n.loyalty=20;n.money=9999;g.run.say=null;g.stock('water',2,40);Guild24.render();});
  check(!(await p.locator('.kit .vitals').innerText()).includes('건강'),'healthy label absent');
  await p.screenshot({path:path.join(out,`sale-${width}.png`)});
  await p.evaluate(()=>{const g=Guild24.game,interest=g.interest.bind(g);g.interest=(...args)=>({...interest(...args),chance:0});});
  await p.locator('.goods [data-action="select"]').first().click();await p.locator('.tills [data-mode="overcharge"]').click();
  check(await p.locator('.receipt-stub').count()===1,'refusal delta appears');
  if(!before)check((await p.locator('.receipt-stub').innerText())==='단골도 -2','actual refusal loyalty');
  if(!before){
   check(await p.locator('.receipt-stub').evaluate(e=>getComputedStyle(e,'::before').display!=='none'&&getComputedStyle(e).fontWeight==='600'),'refusal retains receipt font and yellow badge');
   check(await p.locator('.receipt-stub .loyalty-delta').evaluate(e=>getComputedStyle(e).color!==getComputedStyle(e.parentElement).color),'only the loss number changes colour');
  }
  await p.screenshot({path:path.join(out,`refusal-${width}.png`)});
  await p.screenshot({path:path.join(out,`refusal-detail-${width}.png`),clip:{x:0,y:width<1024?560:660,width,height:220}});
  if(!before)await p.locator('.receipt-stub').screenshot({path:path.join(out,`refusal-stub-${width}.png`)});
  await p.evaluate(()=>{document.querySelector('.receipt-stub')?.remove();const g=Guild24.game,n=g.current();g.run.phase='night';g.run.nightCursor=0;g.run.results=[{npcId:n.id,name:n.name,day:1,dungeonName:'독거미 동굴 II',outcome:'퇴각',level:6,changes:[],statChanges:[],xp:25,loot:44,items:[],why:[],events:[],beforeFatigue:15,preRecovery:5,fatigueBeforeExpedition:10,rawOutcomeFatigueGain:7,outcomeBufferUsed:0,actualOutcomeFatigueGain:7,finalFatigue:17,netFatigueDelta:2,fatigueLedger:[{label:'오늘 시작',value:15},{label:'음식·음료 · 출발 전',delta:-5},{label:'퇴각',delta:7},{label:'휴식 바우처 꽂이',delta:-6}],settledFatigue:11}];n.fatigue=11;Guild24.render();});
  await p.screenshot({path:path.join(out,`night-${width}.png`)});
  await p.locator('.fatigue-row').click();
  if(before){await p.screenshot({path:path.join(out,`fatigue-${width}.png`)});}
  else{
   const text=await p.locator('#modal-root').innerText();check(text.includes('휴식 바우처 꽂이')&&text.includes('퇴각')&&text.includes('탈진'),'ledger and bands overlay');
   check(await p.evaluate(()=>{
    const luminance=c=>{const a=c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return a[0]*.2126+a[1]*.7152+a[2]*.0722;};
    const bg=luminance(getComputedStyle(document.querySelector('.modal-body')).backgroundColor);
    return [...document.querySelectorAll('.fatigue-overview span,.fatigue-overview b,.fatigue-ledger span,.fatigue-ledger b,.fatigue-bands p,.fatigue-bands b')].every(e=>{const fg=luminance(getComputedStyle(e).color);return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)>=4.5;});
   }),'Fatigue text contrast at least 4.5:1');
   check(await p.locator('.fatigue-bands p').first().evaluate(e=>Number.parseFloat(getComputedStyle(e).fontSize)>=14&&getComputedStyle(e).fontWeight==='600'),'band rules use readable effect typography');
   check(!(await p.locator('.next-decision').innerText()).includes('피로 11'),'duplicate absent');
   await p.screenshot({path:path.join(out,`fatigue-${width}.png`)});
   await p.locator('#modal-root [data-action="dismiss"]').first().click();
   check(await p.locator('.fatigue-row').evaluate(e=>e===document.activeElement),'focus restored');
  }
  if(before){
   await p.evaluate(()=>{const g=Guild24.game;g.run.phase='order';g.run.day=2;g.account.tutorial={skipped:false,'coach-confirm':true};Guild24.render();});
   await p.waitForTimeout(100);await p.screenshot({path:path.join(out,`reroll-coach-${width}.png`)});
  }else{
   await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.phase='order';s.day=2;g.account.tutorial={skipped:false,'coach-confirm':true};Guild24.render();});
   await p.waitForTimeout(100);check(!(await p.locator('#coach-root').innerText()).includes('후보가 마음에'),'no DAY 2 reroll coach');
   await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.day=4;s.firstRun=true;s.lessonInjured=s.queue[0];s.lessonKitDay=4;g.stock('kit',1,80);Guild24.render();});
   await p.waitForTimeout(100);check((await p.locator('#coach-root').innerText()).includes('구급키트'),'other ORDER coach still shows');
   await p.locator('[data-action="coach-next"]').click();await p.waitForTimeout(100);
   check((await p.locator('#coach-root').innerText()).includes('후보가 마음에'),'DAY 4 reroll follows other ORDER coach the same day');
   await p.screenshot({path:path.join(out,`reroll-coach-${width}.png`)});
  }
  check(!errors.length,'no runtime errors');await ctx.close();
 }
 }finally{if(browser)await browser.close();server.kill();}
 console.log(`${before?'BEFORE':'PASS'} minor feedback: ${checks} checks; ${out}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
