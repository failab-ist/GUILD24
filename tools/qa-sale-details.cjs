// SALE presentation repair: card typography, rarity edge, every SALE coach target (UI-Q-v28-27).
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {chromium}=require('playwright'),root=path.resolve(__dirname,'..');
const out=path.resolve(process.argv[2]||'reports/ui/sale-details/after'),port=Number(process.env.QA_PORT||5264);
const capture=process.env.QA_CAPTURE_ONLY==='1',motion=process.env.QA_MOTION==='1';
const sizes=process.env.QA_SIZES?JSON.parse(process.env.QA_SIZES):[[360,640],[360,597],[375,548],[390,780],[430,780],[1280,700],[1280,880]];
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const app=fs.readFileSync(process.env.QA_BASELINE_APP||path.join(root,'dist/ui/app.js'),'utf8');
const table=app.slice(app.indexOf('const coachSteps={'),app.indexOf('let activeCoach=null;')).replace(/^const coachSteps=/,'').replace(/;\s*$/,'');
const nightMarks=app.match(/^const NIGHT_MARKS=.*$/m)[0];
let checks=0;const failures=[],results=[];
const check=(ok,message)=>{checks++;if(!ok){failures.push(message);if(!capture)assert.ok(ok,message);}};
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview startup timeout')),8000);server.once('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 try{for(const [width,height]of sizes){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<1024?2:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  if(process.env.QA_BASELINE_CSS)await p.route('**/ui/ui.css',r=>r.fulfill({path:process.env.QA_BASELINE_CSS,contentType:'text/css'}));
  if(process.env.QA_BASELINE_APP)await p.route('**/ui/app.js',r=>r.fulfill({path:process.env.QA_BASELINE_APP,contentType:'text/javascript'}));
  await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  await p.evaluate(({t,nightMarks})=>{window.__saleCoaches=new Function(nightMarks+'return '+t)().sell;Guild24.game.start('qa-sale-compare-d5');Guild24.game.account.tutorial.skipped=true;Guild24.render();},{t:table,nightMarks});
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.locator('#modal-root [data-action="buy-relic"]').first().click();
  await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
  for(let i=0;i<500;i++){if(await p.evaluate(()=>Guild24.game.run.phase==='sell'&&Guild24.game.run.day===5))break;await p.evaluate(()=>Guild24.game.run.money=99999);await p.evaluate(`(${STEP})()`);}
  await p.evaluate(()=>{const g=Guild24.game,n=g.current(),s=g.run;n.money=9999;n.pack=[];n.refused=[];n.name=[...Adventurer.names].sort((a,b)=>b.length-a.length)[0];
   s.inventory=DATA.items.filter((it,i,all)=>all.findIndex(x=>x.rarity===it.rarity)===i).map((it,i)=>({id:'detail-'+i,item:it.id,cost:Math.round(it.sell*.5),expires:s.day+3}));g.save();Guild24.render();});
  for(let i=0;i<8;i++){const b=p.locator('#modal-root [data-action="boss-seen"],#modal-root [data-action="dismiss"]');if(!await b.count())break;await b.first().click();}
  await p.waitForTimeout(3400);
  const tag=`${width}x${height}`;
  const icons=[];
  for(let i=0;i<5;i++){
   await p.evaluate(r=>{Guild24.game.current().rarity=r;Guild24.render();},i);
   await p.locator('.goods [data-action="select"]').nth(i).dispatchEvent('click');await p.waitForTimeout(300);
   const icon=await p.evaluate(()=>{const e=document.querySelector('.tray-icon'),s=e.querySelector('svg'),b=e.getBoundingClientRect(),v=s.getBoundingClientRect(),plate=document.querySelector('.nameplate');
    const texts=[...plate.children].map(x=>({text:x.textContent,font:parseFloat(getComputedStyle(x).fontSize),clipped:x.scrollWidth>x.clientWidth+1||x.scrollHeight>x.clientHeight+1}));
    return {rarity:Guild24.game.current().rarity,item:document.querySelector('.tray-what>b').innerText,box:{left:b.left,top:b.top,right:b.right,bottom:b.bottom},svg:{left:v.left,top:v.top,right:v.right,bottom:v.bottom},shadow:getComputedStyle(e).boxShadow,color:getComputedStyle(e).getPropertyValue('--rare'),itemRarity:Number([...e.classList].find(c=>/^r[0-4]$/.test(c)).slice(1)),shelfColor:getComputedStyle(document.querySelector('.good.open')).getPropertyValue('--rare'),texts};});
   check(icon.svg.left>=icon.box.left&&icon.svg.right<=icon.box.right&&icon.svg.top>=icon.box.top&&icon.svg.bottom<=icon.box.bottom-3,tag+' rarity '+i+' SVG leaves the complete rarity edge clear');
   check(icon.texts.every(t=>!t.clipped),tag+' rarity '+i+' full card text');
   if(width<1024)check(icon.texts.some(t=>t.font===14)&&icon.texts.some(t=>t.font===9)&&icon.texts.some(t=>t.font===11),tag+' rarity '+i+' scaled card type');
   check(icon.color===icon.shelfColor,tag+' item rarity matches the shelf');
   icons.push(icon);await p.screenshot({path:path.join(out,`${tag}-rarity-${i}.png`)});
  }
  check(new Set(icons.map(x=>x.itemRarity)).size===5,tag+' all five item rarity colors covered');
  await p.evaluate(()=>{const g=Guild24.game,n=g.current(),s=g.run;n.rarity=0;n.pack=[];n.refused=[];n.introduced=true;n.newToday=false;n.records=[{day:4,outcome:'성공',injury:0,recovery:0,changes:[],events:[]}];s.inventory=['rope','coating','guildlunch','coupon','lowpotion','water'].map((id,i)=>({id:'coach-'+i,item:id,cost:Math.round(DATA.itemBy[id].sell*.5),expires:s.day+3}));g.save();Guild24.render();});
  await p.locator('.goods [data-action="select"]').first().dispatchEvent('click');await p.waitForTimeout(300);
  const show=async id=>{await p.evaluate(id=>{const t=Guild24.game.account.tutorial;t.skipped=false;for(const x of window.__saleCoaches)t['coach-'+x[0]]=x[0]!==id;Guild24.game.save();Guild24.render();},id);await p.waitForTimeout(motion?600:150);};
  const coach=async (id,suffix='')=>{
   const info=await p.evaluate(id=>{const step=window.__saleCoaches.find(x=>x[0]===id),target=[...document.querySelectorAll(step[1])].find(e=>e.getClientRects().length),f=document.querySelector('.coach-focus'),b=document.querySelector('.coach-bubble'),dock=document.querySelector('.stage .dock');
    const r=e=>{const v=e.getBoundingClientRect();return {left:v.left,right:v.right,top:v.top,bottom:v.bottom,width:v.width,height:v.height};};
    if(!target||!f||!b)return {id,missing:true,selector:step[1]};
    const sc=[target.closest('.stage-scroll'),target.closest('.dossier-col'),target.closest('.shelf-col')].find(e=>e&&e.getBoundingClientRect().height>0),clip=sc?sc.getBoundingClientRect():null;
    return {id,selector:step[1],target:r(target),focus:r(f),bubble:r(b),dock:r(dock),copy:b.querySelector('p').textContent,expected:step[2],clip:clip?{top:clip.top,bottom:clip.bottom}:null,
     bubbleClipped:b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1,keys:[...b.querySelectorAll('button')].map(r),viewport:{width:innerWidth,height:innerHeight}};},id);
   check(!info.missing,tag+' '+id+' coach is present');
   if(!info.missing){const {target:t,focus:f,bubble:b,dock:d}=info,hit=(a,c)=>Math.min(a.right,c.right)-Math.max(a.left,c.left)>1&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>1;
    check(info.copy===info.expected,tag+' '+id+' exact approved copy');
    check(t.left>=f.left&&t.right<=f.right&&t.top>=f.top&&t.bottom<=f.bottom,tag+' '+id+' full target');
    check(f.width<=t.width+9&&f.height<=t.height+9,tag+' '+id+' focus hugs the resized target');
    check(!hit(b,f)&&!hit(b,d),tag+' '+id+' bubble clears focus and dock');
    check(b.left>=0&&b.right<=info.viewport.width&&b.top>=0&&b.bottom<=info.viewport.height&&!info.bubbleClipped,tag+' '+id+' whole bubble on screen');
    check(!info.clip||(t.top>=info.clip.top-1&&t.bottom<=info.clip.bottom+1),tag+' '+id+' target clears fixed header/tray');
    check(info.keys.every(k=>k.height>=44&&k.bottom<=info.viewport.height),tag+' '+id+' next/skip reachable');
   }
   await p.screenshot({path:path.join(out,`${tag}-coach-${id}${suffix}.png`)});return info;
  };
  const coaches=[];
  for(const id of ['destination','stats','forecast','envmeter','returning']){if(id==='stats'){await p.locator(width>=1024?'.dossier-col':'.stage-scroll').evaluate(e=>e.scrollTop=e.scrollHeight);await p.waitForTimeout(400);}await show(id);coaches.push(await coach(id));if(id==='returning'){await p.setViewportSize({width,height:height+32});await p.waitForTimeout(motion?700:300);coaches.push(await coach(id,'-resized'));await p.setViewportSize({width,height});await p.waitForTimeout(motion?700:300);}await p.locator('[data-action="coach-next"]').click();}
  // The payday anchor is the production first-run DAY 3 condition; the rest of this visual fixture stays unchanged.
  await p.evaluate(()=>{Guild24.game.run.day=3;Guild24.game.current().lessonPayday=3;Guild24.render();});
  await show('payday');coaches.push(await coach('payday'));await p.locator('[data-action="coach-next"]').click();
  await p.evaluate(()=>{Guild24.game.run.day=5;Guild24.game.account.tutorial.skipped=true;Guild24.render();});
  if(!await p.locator('.tills button').count())await p.locator('.goods [data-action="select"]').first().dispatchEvent('click');
  if(await p.locator('.counter-tray.folded').count())await p.locator('.tray-unfold').click();
  // COPY_AUDIT §3-14: the price-key mark, the first time the three keys show
  await p.evaluate(()=>{const t=Guild24.game.account.tutorial;t.skipped=false;for(const x of window.__saleCoaches)t['coach-'+x[0]]=x[0]!=='price';Guild24.render();});
  await p.waitForTimeout(motion?700:200);coaches.push(await coach('price'));await p.locator('[data-action="coach-next"]').click();
  await p.evaluate(()=>{const g=Guild24.game,orig=g.interest.bind(g);g.interest=(...args)=>({...orig(...args),chance:0});const t=g.account.tutorial;t.skipped=false;for(const x of window.__saleCoaches)t['coach-'+x[0]]=x[0]!=='price-refused';});
  await p.locator('.tills [data-mode="overcharge"]').click();await p.waitForTimeout(motion?700:200);
  coaches.push(await coach('price-refused'));await p.locator('[data-action="coach-next"]').click();
  await p.evaluate(()=>{const g=Guild24.game,orig=g.interest.bind(g);g.interest=(...args)=>({...orig(...args),chance:1});const t=g.account.tutorial;delete t['coach-bag'];});
  // a refused 바가지 closes that Item (SALE §SAME-ITEM REFUSAL PRICE CEILING), so the 50% sale is another Item's
  await p.locator('.goods [data-action="select"]').nth(1).dispatchEvent('click');await p.waitForTimeout(200);
  await p.locator('.tills [data-mode="half"]').click();
  if(motion){
   const fly=await p.locator('.handoff').evaluate(e=>{const a=e.getBoundingClientRect(),b=e.querySelector('svg').getBoundingClientRect();return {width:a.width,height:a.height,contained:b.left>=a.left-1&&b.right<=a.right+1&&b.top>=a.top-1&&b.bottom<=a.bottom+1};});
   check(fly.contained,tag+' hand-over SVG stays inside its travelling footprint');
   await p.screenshot({path:path.join(out,`${tag}-handoff.png`)});
  }
  await p.waitForTimeout(motion?700:200);
  coaches.push(await coach('bag'));await p.locator('[data-action="coach-next"]').click();await p.waitForTimeout(150);
  await p.reload({waitUntil:'load'});await p.waitForTimeout(motion?700:200);
  check(await p.evaluate(()=>Guild24.game.account.tutorial['coach-price']===true),tag+' completed coach persists after reload');
  check(!await p.locator('.coach-focus').count(),tag+' completed SALE coaches do not reappear after reload');
  check(!errors.length,tag+' no page errors');results.push({width,height,icons,coaches,errors});console.log(tag+' captured 9 SALE coaches + resized returning card');await ctx.close();
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({checks,failures,results},null,2));
 console.log(`${failures.length?'FAIL':'PASS'} ${checks} checks / ${results.length} viewports / ${motion?'motion':'reduced-motion'}; ${failures.length} findings`);
})().catch(e=>{console.error(e);process.exitCode=1;});
