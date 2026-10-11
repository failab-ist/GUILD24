// UI_UX UI-Q109 / UI-Q-v29-18 / SHORT PHONE: real SALE comparison and transaction regression.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const out=path.resolve(process.argv[2]||path.join(root,'reports/ui/sale-comparison/after'));
const port=Number(process.env.QA_PORT||5261),motion=process.env.QA_MOTION==='1';
let checks=0;const check=(ok,message)=>{checks++;assert.ok(ok,message);};
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const sizes=process.env.QA_SIZES?JSON.parse(process.env.QA_SIZES):motion?[[390,780],[1280,880]]:[[360,640],[360,597],[375,548],[360,780],[390,780],[412,780],[430,780],[1280,880]];
const cases=[...sizes.map(size=>({size,day:5})),...(process.env.QA_SIZES||motion?sizes:[[360,640],[360,597],[375,548],[390,780],[1280,880]]).map(size=>({size,day:14}))];
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview startup timeout')),8000);server.once('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 const results=[];
 try{for(const {size:[width,height],day}of cases){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<1024?2:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  // the DAY 14 seed is one whose STEP bot still reaches a DAY 14 SALE under v2.10.0's failure rates (the DAY 5 seed's run ends on DAY 7); this one also offers the Deep nomination
  await page.evaluate(seed=>{Guild24.game.start(seed);Guild24.game.account.tutorial.skipped=true;Guild24.render();},day===14?'qa-sale-compare-d14-14':'qa-sale-compare-d5');
  if(await page.locator('.p-prep [data-action="start"]').count())await page.locator('.p-prep [data-action="start"]').click();
  await page.locator('#modal-root [data-action="buy-relic"]').first().click();
  await page.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
  for(let i=0;i<500;i++){
   if(await page.evaluate(d=>Guild24.game.run.phase==='sell'&&Guild24.game.run.day>=d,day))break;
   await page.evaluate(()=>{Guild24.game.run.money=99999;});
   await page.evaluate(`(${STEP})()`);
  }
  await page.evaluate(d=>{const g=Guild24.game,s=g.run,n=g.current();
   if(s.phase!=='sell'||s.day!==d)throw Error('SALE fixture failed');
   n.money=9999;n.pack=[];n.refused=[];
   s.inventory=['cloak','rope','rice','water','lowpotion','kit','goldcoupon'].filter(id=>DATA.itemBy[id]).flatMap((id,i)=>Array.from({length:3},(_,j)=>({id:'compare-'+i+'-'+j,item:id,cost:Math.round(DATA.itemBy[id].sell*.5),expires:s.day+3})));
   g.save();Guild24.render();
  },day);
  for(let i=0;i<8;i++){
   const dismiss=page.locator('#modal-root [data-action="boss-seen"],#modal-root [data-action="dismiss"]');
   if(!await dismiss.count())break;await dismiss.first().click();
  }
  await page.waitForTimeout(3400);
  const entry=await page.evaluate(()=>{const sc=document.querySelector('.shelf-col'),clip=(innerWidth>=1024?sc:document.querySelector('.stage-scroll')).getBoundingClientRect();return {phase:Guild24.game.run.phase,day:Guild24.game.run.day,stock:document.querySelectorAll('.goods [data-action="select"]').length,fullRows:[...document.querySelectorAll('.goods [data-action="select"]')].filter(e=>{const r=e.getBoundingClientRect();return r.top>=clip.top&&r.bottom<=clip.bottom;}).length};});
  await page.screenshot({path:path.join(out,`d${day}-${width}x${height}-entry.png`)});
  await page.locator('.goods [data-action="select"]').first().click();
  await page.waitForTimeout(250);
  const measure=await page.evaluate(()=>{
   const rect=sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,width:r.width};};
   const sc=innerWidth>=1024?document.querySelector('.shelf-col'):document.querySelector('.stage-scroll'),clip=sc.getBoundingClientRect();
   const rows=[...document.querySelectorAll('.goods [data-action="select"]')].map(e=>{const r=e.getBoundingClientRect();return {text:e.innerText,height:r.height,top:r.top,bottom:r.bottom,visible:r.top>=clip.top-1&&r.bottom<=clip.bottom+1};});
   return {front:rect('.front'),kit:rect('.kit'),kitHTML:document.querySelector('.kit').innerHTML,dest:rect('.dest-plate'),dossier:rect('.dossier'),shelf:rect('.shelf'),tray:rect('.counter-tray'),scroll:sc.scrollTop,clip:rect('.stage-scroll'),rows,fullRows:rows.filter(x=>x.visible).length,folded:document.querySelector('.counter-tray').classList.contains('folded'),keys:[...document.querySelectorAll('.tills button')].map(e=>({h:e.getBoundingClientRect().height,text:e.innerText})),hscroll:document.documentElement.scrollWidth>innerWidth};
  });
  await page.screenshot({path:path.join(out,`d${day}-${width}x${height}-selected.png`)});
  const tag=`D${day} ${width}x${height}`;
  const floor=1; // UI_UX §SALE: opening scrolls only when the tray would clip the tapped row, so only that row is guaranteed whole.
  check(entry.phase==='sell'&&entry.day===day&&entry.stock>=6,tag+' representative fixture');
  check(entry.fullRows>=1,tag+' entry shelf row');
  check(measure.fullRows>=floor,tag+' selected comparison floor');
  check(!measure.folded,tag+' comparison measured with expanded tray');
  check(!measure.hscroll,tag+' no horizontal overflow');
  check(measure.keys.length===3&&measure.keys.every(k=>k.h>=44),tag+' three reachable price targets');
  if(width<1024)check(measure.tray.height<=200,tag+' tray height');
  check(await page.locator('.kit .slots i').count()===2,tag+' two Bag slots');
  check(await page.locator('.kit .slots i').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().width>=44&&e.getBoundingClientRect().height>=44)),tag+' Bag targets');
  const geometry=async()=>page.evaluate(()=>{
   const r=e=>e.getBoundingClientRect(),box=e=>({top:r(e).top,bottom:r(e).bottom,left:r(e).left,right:r(e).right,width:r(e).width,height:r(e).height});
   const slots=[...document.querySelectorAll('.kit .slots i')],menu=document.querySelector('.menu-pin');
   const onscreen=e=>r(e).left>=0&&r(e).right<=innerWidth+1&&r(e).top>=0&&r(e).bottom<=innerHeight+1;
   const hit=e=>{const b=r(e);return [document.elementFromPoint(b.left+b.width/2,b.top+b.height/2)].some(t=>t&&(t===e||e.contains(t)||e.closest('button')?.contains(t)));};
   const texts=[...document.querySelectorAll('.tray-what>b,.tray-stock,.tray-who,.tray-delta,.nameplate b,.tills em,.tills em span,.tills strong,.tills small')].filter(e=>r(e).width>0);
   const tray=document.querySelector('.counter-tray'),tr=r(tray);
   const unclipped=texts.every(e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1);
   const shelf=[...document.querySelectorAll('.good .what')].every(e=>e.scrollWidth<=e.clientWidth+1&&e.scrollHeight<=e.clientHeight+1);
   const rr=e=>{const x=r(e);if(!e.matches('.tills .price-role'))return x;const k=r(e.closest('button'));return {left:Math.max(x.left,k.left),right:Math.min(x.right,k.right),top:Math.max(x.top,k.top),bottom:Math.min(x.bottom,k.bottom)};};
   const trayText=texts.filter(e=>tray.contains(e)).every(e=>rr(e).left>=tr.left&&rr(e).right<=tr.right+1&&rr(e).top>=tr.top&&rr(e).bottom<=tr.bottom);
   const stock=document.querySelector('.tray-stock'),who=document.querySelector('.tray-who'),name=document.querySelector('.tray-what>b'),delta=document.querySelector('.tray-delta'),tills=document.querySelector('.tills');
   const fs=sel=>{const e=document.querySelector(sel);return e?parseFloat(getComputedStyle(e).fontSize):null;};
   const contrast=(fg,bg)=>{const lum=c=>c.match(/[\d.]+/g).slice(0,3).map(x=>Number(x)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);const a=lum(fg),b=lum(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
   const priceContrast=[...document.querySelectorAll('.tills button')].flatMap(e=>[...e.querySelectorAll('em,small')].map(t=>{const cs=getComputedStyle(t),bg=t.matches('em')&&cs.backgroundImage!=='none'?getComputedStyle(e).getPropertyValue('--rim-d').trim():cs.backgroundColor==='rgba(0, 0, 0, 0)'?(getComputedStyle(e).backgroundColor==='rgba(0, 0, 0, 0)'?(e.disabled?'#766055':'#8f5030'):getComputedStyle(e).backgroundColor):cs.backgroundColor;const rgb=h=>h[0]==='#'?'rgb('+[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)).join(',')+')':h;return contrast(cs.color,rgb(bg));}));
   const send=document.querySelector('.dock [data-action="depart"]')||document.querySelector('.dock .stamp');
   const plate=document.querySelector('.nameplate'),pc=getComputedStyle(plate),dest=document.querySelector('.dest-plate'),dc=getComputedStyle(dest);
   const insetOnly=e=>getComputedStyle(e).boxShadow.replace(/rgba?\([^)]*\)/g,'color').split(',').every(s=>s==='none'||s.includes('inset'));
   const keys=[...document.querySelectorAll('.tills button')];
   return {face:box(document.querySelector('.face')),slots:slots.map(box),bag:slots.every(e=>onscreen(e)&&hit(e)&&(!menu||r(e).bottom<=r(menu).top||r(e).top>=r(menu).bottom||r(e).right<=r(menu).left||r(e).left>=r(menu).right)),
    unclipped,shelf,trayText,metadata:r(who).width===0&&r(stock).width===0&&r(name).bottom<=r(delta).top-2,
    room:{plate:parseFloat(pc.paddingLeft)>=8&&parseFloat(pc.paddingTop)>=4&&parseFloat(pc.paddingBottom)>=4&&parseFloat(pc.gap)>=2,
     cardShadow:insetOnly(document.querySelector('.face'))&&insetOnly(plate),destination:parseFloat(dc.paddingTop)>=5&&parseFloat(dc.paddingLeft)>=8,
     fullDelta:r(delta).width>=tr.width-36,keysClear:keys.every(e=>r(e).bottom+7<=tr.bottom-2)},
    prices:[...document.querySelectorAll('.tills button')].every(e=>onscreen(e)&&hit(e)),send:onscreen(send)&&hit(send)&&r(send).height>=44,
    fonts:{name:fs('.good .what b'),effect:fs('.good .what span'),outlook:fs('.gs-row>b,.ro-combat>b'),environment:fs('.env-num'),title:fs('.shelf-head h2')},
    priceContrast,deep:!!document.querySelector('.deep-offer'),hscroll:document.documentElement.scrollWidth>innerWidth};
  });
  const geom=await geometry();
  fs.writeFileSync(path.join(out,`d${day}-${width}x${height}-geometry.json`),JSON.stringify(geom,null,2));
  check(geom.bag&&geom.prices&&geom.send,tag+' Bag/menu and action hit geometry');
  check(geom.unclipped&&geom.shelf&&geom.trayText,tag+' text fully fits its containers');
  check(geom.priceContrast.every(c=>c>=4.5),tag+' small price roles and profit meet 4.5:1 contrast');
  if(width<1024){
   const beforeWidth=Math.max(88,Math.min(width*.38,150,height*.9-300));
   check(geom.face.width>=beforeWidth*.85&&geom.face.width<=beforeWidth*.9,tag+' character width 85–90% of original');
   check(geom.metadata,tag+' tray header carries no stock or expiry and no duplicate customer (the shelf row has them)');
   check(geom.room.plate&&geom.room.cardShadow&&geom.room.destination,tag+' text padding and no card cast into neighbours');
   check(geom.room.fullDelta&&geom.room.keysClear,tag+' full-width effects and price depth clear of dock');
   const reading=await page.evaluate(()=>{const c=document.querySelector('.stage-scroll').getBoundingClientRect(),r=document.querySelector('.readout.core-mob').getBoundingClientRect(),p=document.querySelector('.forecast-pin');return {whole:r.top>=c.top-1||r.bottom<=c.top+1,pin:r.bottom>c.top+1||p.classList.contains('show')};});
   check(reading.whole&&reading.pin,tag+' opening leaves whole outlook or its forecast pin');
   check(geom.fonts.name>=14&&geom.fonts.effect>=13&&geom.fonts.outlook>=16&&(geom.fonts.environment===null||geom.fonts.environment>=14)&&geom.fonts.title>=12,tag+' readable local type ladder');
  }
  // A native held press must keep the key face/depth inside the tray; release on its background, without selling.
  const key=await page.locator('.tills button:not(:disabled)').first().boundingBox();
  await page.mouse.move(key.x+key.width/2,key.y+key.height/2);await page.mouse.down();await page.waitForTimeout(40);
  const press=await page.evaluate(()=>{const t=document.querySelector('.counter-tray').getBoundingClientRect(),d=document.querySelector('.dock').getBoundingClientRect();
   return [...document.querySelectorAll('.tills button')].every(e=>{const b=e.getBoundingClientRect(),sh=getComputedStyle(e).boxShadow.replace(/rgba?\([^)]*\)/g,'color').split(',').filter(s=>!s.includes('inset'));
    const depth=Math.max(0,...sh.map(s=>{const n=s.match(/-?[\d.]+px/g)||[];return (parseFloat(n[1])||0)+(parseFloat(n[2])||0)+(parseFloat(n[3])||0);}));return b.bottom+depth<=t.bottom-2&&b.bottom+depth<d.top;});});
  check(press,tag+' held price press and cast depth clear the lip/dock');
  await page.screenshot({path:path.join(out,`d${day}-${width}x${height}-pressed.png`)});
  const housing=await page.locator('.counter-tray').boundingBox();await page.mouse.move(housing.x+2,housing.y+2);await page.mouse.up();
  const rowGeometry=()=>page.locator('.goods [data-action="select"]').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height));
  const heights=await rowGeometry();
  const scrollSelector=width>=1024?'.shelf-col':'.stage-scroll';
  const scrollBefore=await page.locator(scrollSelector).evaluate(e=>e.scrollTop);
  await page.locator('.goods [data-action="select"]').nth(1).dispatchEvent('click');
  await page.waitForTimeout(300);
  check(JSON.stringify(await rowGeometry())===JSON.stringify(heights),tag+' swap does not resize shelf rows');
  check(await page.locator(scrollSelector).evaluate(e=>e.scrollTop)===scrollBefore,tag+' swap preserves scroll');
  if(width<1024){
   await page.locator(scrollSelector).evaluate(e=>e.scrollTop+=80);await page.waitForTimeout(150);
   check(await page.locator('.counter-tray').evaluate(e=>e.classList.contains('folded')),tag+' scroll folds tray');
   await page.locator('.tray-unfold').click();
   await page.waitForTimeout(450);
   check(await page.locator('.counter-tray').evaluate(e=>!e.classList.contains('folded')),tag+' strip reopens tray');
   await page.locator(scrollSelector).evaluate(e=>e.scrollTop+=80);await page.waitForTimeout(150);
   check(await page.locator('.counter-tray').evaluate(e=>e.classList.contains('folded')),tag+' user scroll still folds after settled reopen');
   await page.locator('.tray-unfold').click();await page.waitForTimeout(450);
   check(await page.locator('.counter-tray').evaluate(e=>!e.classList.contains('folded')),tag+' second reopening remains usable');
  }
  let rich=null;
  if(day===14){
   // Production catalogue/name stress only: no balance outcome is measured from this UI fixture.
   await page.evaluate(()=>{const g=Guild24.game,s=g.run,n=g.current();n.name=[...Adventurer.names].sort((a,b)=>b.length-a.length)[0];n.refused=[];
    s.inventory=['hyperenergy','coating','guildlunch','coupon','battlelunch'].map((id,i)=>({id:'long-'+i,item:id,cost:Math.round(DATA.itemBy[id].sell*.5),expires:s.day}));g.save();Guild24.render();});
   await page.locator(scrollSelector).evaluate(e=>e.scrollTop=0);
   for(let index=0;index<5;index++){
    await page.locator('.goods [data-action="select"]').nth(index).dispatchEvent('click');await page.waitForTimeout(120);
    if(width<1024&&await page.locator('.counter-tray.folded').count())await page.locator('.tray-unfold').click();
    const long=await geometry();
    check(long.bag&&long.prices&&long.send&&!long.hscroll,tag+' long item '+index+' actions remain reachable');
    check(long.unclipped&&long.shelf&&long.trayText,tag+' long item '+index+' text wraps intact');
    if(width<1024)check(long.metadata,tag+' long item '+index+' metadata does not overlap');
    if(index===0){rich=long;await page.screenshot({path:path.join(out,`d${day}-${width}x${height}-long.png`)});}
   }
   const deep=page.locator('.deep-offer>summary');
   check(await deep.count()===1,tag+' Deep nomination remains available');
   await deep.scrollIntoViewIfNeeded();await deep.click();
   check(await page.locator('.deep-offer[open]').count()===1,tag+' Deep disclosure opens with a real tap');
   await page.locator('[data-action="deep-nominate"]').click();
   check(await page.locator('.deep-taken').count()===1,tag+' moved Deep nomination works');
   check(await page.evaluate(()=>Guild24.game.run.deep.today.nomineeId===Guild24.game.current().id),tag+' confirmed nominee retained');
   await page.locator(scrollSelector).evaluate(e=>e.scrollTop=0);await page.waitForTimeout(150);
   await page.screenshot({path:path.join(out,`d${day}-${width}x${height}-nominee.png`)});
  }
  if(width<1024&&await page.locator('.counter-tray.folded').count())await page.locator('.tray-unfold').click();
  await page.evaluate(()=>{const g=Guild24.game,original=g.interest.bind(g);g.interest=(...args)=>({...original(...args),chance:0});});
  await page.locator('.tills [data-mode="full"]').click();await page.waitForTimeout(450);
  check(await page.locator('.counter-tray:not(.folded)').count()===1,tag+' refusal keeps tray');
  check(await page.locator('.tills [data-mode="full"]').isDisabled(),tag+' refused price locked');
  check((await geometry()).priceContrast.every(c=>c>=4.5),tag+' locked price remains readable');
  await page.evaluate(()=>{const g=Guild24.game,original=g.interest.bind(g);g.interest=(...args)=>({...original(...args),chance:1});});
  await page.locator('.tills [data-mode="half"]').click();await page.waitForTimeout(600);
  check(await page.locator('.counter-tray:not(.empty)').count()===0,tag+' successful sale clears tray');
  check(await page.evaluate(()=>Guild24.game.current().pack.length===1),tag+' successful hand-over fills one Bag slot');
  check(!errors.length,tag+' no page errors');
  results.push({width,height,day,entry,...measure,geometry:geom,rich,errors});
  console.log(JSON.stringify({width,height,day,rows:measure.fullRows,front:measure.front.height,dossier:measure.dossier.height,tray:measure.tray.height,clip:measure.clip.height,scroll:measure.scroll}));
  await context.close();
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
 console.log(`PASS ${checks} checks / ${results.length} viewports / ${motion?'motion':'reduced-motion'}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
