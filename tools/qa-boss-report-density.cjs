// 조사 보고의 화면 밀도·공통 이미지 크기·확인 동작을 검사한다. --before는 승인 전 main 기준 캡처다.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'..'),mode=process.argv.includes('--before')?'before':'after',out=path.resolve(process.argv[2]||'reports/ui/boss-report-density/'+mode),port=5315;
const {ready}=require(path.join(ROOT,'tools/qa-ready.cjs'));
const bosses=['WRATH','PRIDE','ENVY','GREED','GLUTTONY','LUST','SLOTH'];
const flags={1:'d0Seen',5:'identitySeen',10:'combatSeen',15:'traitSeen',20:'routeSeen',25:'familySeen'};
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(ROOT,'tools/preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{server.on('error',reject);server.stdout.on('data',d=>String(d).includes('ready')&&resolve());});
 let browser;const results=[];
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const widths=process.argv.find(v=>v.startsWith('--widths='))?.slice(9).split(',').map(Number);
  for(const [width,height] of [[360,640],[390,780],[412,824],[1024,768],[1280,880]].filter(([w])=>!widths||widths.includes(w))){
   const ctx=await browser.newContext({viewport:{width,height},isMobile:width<720,hasTouch:width<720,locale:'ko-KR',reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   if(mode==='before')for(const file of ['ui/ui.css','data/copy.js'])await page.route('**/'+file,r=>r.fulfill({body:execFileSync('git',['show','a988d4a1:dist/'+file],{cwd:ROOT,encoding:'utf8'}),contentType:file.endsWith('.css')?'text/css':'text/javascript'}));
   await page.goto(`http://127.0.0.1:${port}`);await ready(page);
   for(const guide of [false,true])for(const boss of bosses)for(const day of (process.argv.includes('--typography')?[25]:[1,5,10,15,20,25])){
    await page.evaluate(({boss,day,flag,guide})=>{
     const g=Guild24.game;g.autosave=false;g.start('boss-report-review');const s=g.run;
     g.account.tutorial={skipped:!guide};s.firstRun=false;s.phase='morning';s.day=day;s.bossId=boss;s.relicWindow=null;s.event=null;s.eventSeen=true;
     s.bossReveal={d0Seen:true,identitySeen:true,combatSeen:true,traitSeen:true,routeSeen:true,familySeen:true};s.bossReveal[flag]=false;
     s.final=day===25?g.makeFinal():null;
     if(s.final){s.final.families=['spider','snow'];s.final.familyNames=s.final.families.map(f=>DATA.dungeonBy[f].name);s.final.hazards=[...new Set(s.final.families.flatMap(f=>DATA.familyTiers[f][1]))];}
     Guild24.render();
    },{boss,day,flag:flags[day],guide});
    await page.locator('.boss-reveal').waitFor();
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.boss-art img')].map(img=>img.decode()));});
    const row=await page.evaluate(()=>{
     const el=document.querySelector('.modal.doc'),body=el.querySelector('.modal-body'),img=el.querySelector('.boss-art img'),button=el.querySelector('[data-action="boss-seen"]'),text=el.querySelector('.boss-reveal'),flavor=el.querySelector('.flavor'),info=el.querySelector('.info-line');
     const rect=el.getBoundingClientRect(),b=button.getBoundingClientRect(),ir=img?.getBoundingClientRect();
     return {scroll:body.scrollHeight-body.clientHeight,modalHeight:rect.height,artHeight:ir?.height||0,artRatio:ir?ir.width/ir.height:null,naturalRatio:img?img.naturalWidth/img.naturalHeight:null,buttonVisible:b.top>=0&&b.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,aligned:!flavor||Math.abs(flavor.getBoundingClientRect().left-info.getBoundingClientRect().left+parseFloat(getComputedStyle(flavor).paddingLeft))<1,text:text.innerText};
    });
    results.push({boss,day,width,height,guide,...row});
    assert.ok(row.buttonVisible,`${boss} D${day} ${width}: confirmation visible`);
    assert.ok(!row.overflow,`${boss} D${day} ${width}: horizontal fit`);
    if(row.artRatio)assert.ok(Math.abs(row.artRatio-row.naturalRatio)<.01,`${boss} D${day}: image proportion`);
    if(mode==='after'&&day===5)assert.ok(row.aligned,`${boss} D5: text aligned`);
    if(mode==='after'&&!guide)assert.ok(row.scroll<=1,`${boss} D${day} ${width}: report fits without first-time guidance (${row.scroll}px)`);
    if(mode==='after'&&day===25){
     const fonts=await page.evaluate(()=>{
      const lum=c=>{const rgb=c.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
      const bg=lum(getComputedStyle(document.querySelector('.modal.doc')).backgroundColor);
      return [...document.querySelectorAll('.boss-reveal.final .hazards b,.boss-reveal.final .hazards .rate')].map(e=>{const s=getComputedStyle(e),fg=lum(s.color);return {rate:e.classList.contains('rate'),size:parseFloat(s.fontSize),family:s.fontFamily,contrast:(Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05)};});
     });
     assert.ok(fonts.every(f=>f.family.includes('WantedSans')&&f.size===(f.rate?13:width<720?14:15)),`${boss} D25 ${width}: hazard typography follows the information guide`);
     assert.ok(fonts.every(f=>f.contrast>=4.5),`${boss} D25 ${width}: required information contrast`);
    }
    if(boss==='LUST'&&day===5||boss==='GREED'&&day===15||boss==='WRATH'&&day===25)
     await page.screenshot({path:path.join(out,`${boss}-D${day}-${width}${guide?'-guide':''}.png`)});
    if(!guide&&day===5&&width===390)await page.locator('.boss-art').screenshot({path:path.join(out,`art-${boss}-390.png`)});
    await page.locator('[data-action="boss-seen"]').click();
    assert.ok(await page.evaluate(flag=>Guild24.game.run.bossReveal[flag],flags[day]),`${boss} D${day}: confirmed state`);
    assert.equal(await page.locator('.boss-reveal').count(),0,`${boss} D${day}: report closes`);
   }
   assert.deepEqual(errors,[],`${width}: runtime errors`);await ctx.close();
  }
 }finally{await browser?.close();server.kill();}
 if(mode==='after')for(const width of new Set(results.map(r=>r.width))){
  const heights=results.filter(r=>r.width===width&&r.day!==1).map(r=>r.artHeight);
  assert.ok(Math.max(...heights)-Math.min(...heights)<1,`${width}: all Bosses and investigation Days share the same art height`);
 }
 fs.writeFileSync(path.join(out,'metrics.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify({mode,cases:results.length,scrolling:results.filter(r=>r.scroll>1).map(({boss,day,width,scroll,guide})=>({boss,day,width,scroll,guide})),out}));
})().catch(e=>{console.error(e);process.exitCode=1;});
