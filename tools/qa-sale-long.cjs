// SALE long combinations: longest name/effects x 중상·부상·단골·피로 x every price-lock reason; nothing clips, overflows or leaves the viewport.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');const {chromium}=require('playwright');
const out=path.resolve(process.argv[2]||'reports/ui/sale-long/after'),port=Number(process.env.QA_PORT||5291);
const STEP=fs.readFileSync(path.join(root,'tools/qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const sizes=JSON.parse(process.env.SIZES||'[[360,640],[375,548],[390,780],[430,780],[1280,700],[1280,880]]');
const days=JSON.parse(process.env.DAYS||'[5,14]');
const variants=(process.env.VARIANTS||'sev,hurt,hurt1,regular,budget,lockfull,lockrefuse,lockrefuse2,lockevent').split(',');
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit'],cwd:root});
 await new Promise((res,rej)=>{setTimeout(()=>rej(Error('timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready'))res();});});
 const browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox','--font-render-hinting=none']});
 const findings=[];
 try{for(const day of days)for(const [width,height] of sizes){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:width<1024?2:1,isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:'reduce'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'load'});
  await p.evaluate(()=>{Guild24.game.start('qa-sale-compare-d5');Guild24.game.account.tutorial.skipped=true;Guild24.render();});
  if(await p.locator('.p-prep [data-action="start"]').count())await p.locator('.p-prep [data-action="start"]').click();
  await p.locator('#modal-root [data-action="buy-relic"]').first().click();
  await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
  for(let i=0;i<500;i++){if(await p.evaluate(d=>Guild24.game.run.phase==='sell'&&Guild24.game.run.day>=d,day))break;await p.evaluate(()=>Guild24.game.run.money=99999);await p.evaluate(`(${STEP})()`);}
  for(const v of variants){
   await p.evaluate(({v})=>{const g=Guild24.game,s=g.run,n=g.current();
    n.name=[...Adventurer.names].sort((a,b)=>b.length-a.length)[0];n.pack=[];n.refused=[];n.money=9999;n.eventBudget=0;n.healedBy=null;
    // longest rendered item names then longest effect text
    const items=[...DATA.items].sort((a,b)=>b.name.length-a.name.length);
    const picks=items.slice(0,3).concat(DATA.items.filter(it=>!items.slice(0,3).includes(it)).slice(0,3));
    s.inventory=picks.map((it,i)=>({id:'long-'+i,item:it.id,cost:Math.round(it.sell*.5),expires:s.day+3}));
    if(v==='sev'){n.injury=2;n.status='중상';n.recovery=9;n.fatigue=99;n.loyalty=100;}
    if(v==='hurt'||v==='hurt1'){n.injury=1;n.status='부상';n.recovery=0;n.fatigue=88;n.loyalty=100;n.records=Array.from({length:v==='hurt'?12:1},()=>({departedInjured:true}));}
    if(v==='regular'){n.injury=0;n.status='건강';n.fatigue=0;n.loyalty=51;}
    if(v==='locks'){n.injury=1;n.status='부상';n.fatigue=60;n.loyalty=100;n.money=5;}
    if(v==='budget'){n.injury=2;n.status='중상';n.recovery=9;n.fatigue=99;n.loyalty=100;n.eventBudget=19999;n.healedBy='medcorps';}
    const first=s.inventory[0].item;
    if(v==='lockfull'){n.injury=2;n.status='중상';n.recovery=9;n.fatigue=99;n.loyalty=100;n.pack=Array.from({length:Adventurer.slots(n)},()=>'water');}
    if(v==='lockrefuse'){n.injury=1;n.status='부상';n.fatigue=88;n.loyalty=100;const ids=[...new Set(s.inventory.map(x=>x.item))];n.refused=ids.flatMap(i=>['half','full','overcharge'].map(m=>i+':'+m));n.refusalReasons=ids.flatMap(i=>['half','full','overcharge'].map(m=>({item:i,mode:m,reason:'price'})));}
    if(v==='lockrefuse2'){n.injury=1;n.status='부상';n.fatigue=88;n.loyalty=100;const ids=[...new Set(s.inventory.map(x=>x.item))];n.refused=ids.map(i=>i+':half');n.refusalReasons=ids.map(i=>({item:i,mode:'half',reason:'price'}));}
    if(v==='lockevent'){n.injury=1;n.status='부상';n.fatigue=88;n.loyalty=100;s.event={...(s.event||{}),effects:{...((s.event||{}).effects||{}),noOvercharge:1}};}
    g.save();Guild24.render();},{v});
   for(let i=0;i<8;i++){const b=p.locator('#modal-root [data-action="boss-seen"],#modal-root [data-action="dismiss"]');if(!await b.count())break;await b.first().click();}
   await p.waitForTimeout(v===variants[0]?3400:600);
   if(!await p.locator('.tills button').count()){await p.locator('.goods [data-action="select"]').first().dispatchEvent('click');await p.waitForTimeout(300);}
   if(await p.locator('.counter-tray.folded').count()){await p.locator('.tray-unfold').click();await p.waitForTimeout(200);}
   if(v==='locks'){ // refuse one overcharge price + full bag test
    await p.evaluate(()=>{const n=Guild24.game.current(),it=n.pack;});
   }
   const r=await p.evaluate(()=>{
    const vw=innerWidth,vh=innerHeight,bad=[];
    const scope=document.querySelector('.stage')||document.body;
    const clipRoot=e=>e.closest('.stage-scroll,.dossier-col,.shelf-col');
    for(const e of scope.querySelectorAll('*')){
     const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')continue;
     const b=e.getBoundingClientRect();if(!b.width||!b.height)continue;
     const txt=(e.children.length===0?e.textContent:'').trim();
     const clipped=(cs.overflow!=='visible'||cs.textOverflow==='ellipsis')&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)&&txt;
     const out=b.right>vw+1||b.left<-1;
     if(clipped||(out&&txt))bad.push({sel:e.tagName.toLowerCase()+'.'+[...e.classList].join('.'),text:txt.slice(0,40),clipped:!!clipped,out,sw:e.scrollWidth,cw:e.clientWidth,sh:e.scrollHeight,ch:e.clientHeight,l:Math.round(b.left),r:Math.round(b.right)});
    }
    const sc=innerWidth>=1024?document.querySelector('.shelf-col'):document.querySelector('.stage-scroll'),clip=sc.getBoundingClientRect();
    const rows=[...document.querySelectorAll('.goods [data-action="select"]')].filter(e=>{const r=e.getBoundingClientRect();return r.top>=clip.top-1&&r.bottom<=clip.bottom+1}).length;
    const keys=[...document.querySelectorAll('.tills button')].map(k=>({t:k.innerText.replace(/\n/g,' / '),h:Math.round(k.getBoundingClientRect().height),dis:k.disabled}));
    const pin=document.querySelector('.forecast-pin'),pr=pin&&pin.getBoundingClientRect(),st=document.querySelector('.pin-strain'),sr=st&&st.getBoundingClientRect(),pf=pin&&getComputedStyle(pin).display;const pinInfo=pin?{display:pf,show:pin.classList.contains('show'),pin:pr&&[pr.left,pr.top,pr.right,pr.bottom].map(Math.round),strain:sr&&[sr.left,sr.top,sr.right,sr.bottom].map(Math.round),plates:[...pin.querySelectorAll('.pin-plate')].map(x=>{const r=x.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round)})}:null;return {pinInfo,bad,rows,hscroll:document.documentElement.scrollWidth>vw+1,keys,kit:document.querySelector('.kit')?.innerText.replace(/\n/g,' | ')};
   });
   const tag=`d${day}-${width}x${height}-${v}`;
   await p.screenshot({path:path.join(out,tag+'.png')});
   findings.push({tag,errors:[...errors],...r});
  }
  await ctx.close();
 }}finally{await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,'findings.json'),JSON.stringify(findings,null,1));
 const fail=findings.filter(f=>f.bad.length||f.hscroll||f.errors.length||(f.pinInfo&&f.pinInfo.show&&f.pinInfo.strain&&(f.pinInfo.strain[2]>f.pinInfo.pin[2]||f.pinInfo.strain[1]<f.pinInfo.plates[0][3]-1)));
 for(const f of fail)console.log('FAIL',f.tag,JSON.stringify(f.bad),f.hscroll,f.errors,JSON.stringify(f.pinInfo));
 console.log(`${fail.length?'FAIL':'PASS'} ${findings.length} sale states; ${fail.length} findings`);
 assert.equal(fail.length,0);
})().catch(e=>{console.error(e);process.exitCode=1;});
