// SALE STRAIN LINE (UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK - EXACT, `연속 부상 출발 {n}회`; UI-Q-v29-38) - runtime regression.
// Dev-only. A seeded Run is played to a Day-2 SALE and the current customer's state is set on the page's own Game instance, so
// each case states one condition: healthy with an injured chain behind it (no line), injured with no chain (no line - the first
// injured departure adds nothing), injured with a chain of 2 (`연속 부상 출발 2회` directly under the readout `.top`, the same
// number the NPC detail row reads). 390 and 1280, reduced motion.
//   node tools/qa-strain-line.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5197),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const CASES=[['healthy',0,2,null],['first',1,0,null],['chain',1,2,'연속 부상 출발 2회']];
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const width of [390,1280]){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(width+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(()=>{const g=Guild24.game;(g.account.tutorial??={}).skipped=true;g.start('qa-strain-1');Guild24.render();});
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
   for(let i=0;i<200;i++){if(await p.evaluate(`Guild24.game.run.phase==='sell'&&Guild24.game.run.day>=2`))break;await p.evaluate(`(${STEP})()`);}
   for(const [name,injury,chain,want] of CASES){
    const got=await p.evaluate(([injury,chain])=>{const g=Guild24.game,s=g.run,n=g.current();
     n.injury=injury;n.status=injury?'부상':'건강';n.records=(n.records||[]).filter(r=>!r.qa);
     for(let i=0;i<chain;i++)n.records.push({qa:true,day:s.day-chain+i,npcId:n.id,outcome:'퇴각',items:[],level:n.level,departedInjured:true});
     g.save();Guild24.render();
     const lines=[...document.querySelectorAll('.p-sale .readout .strain')].filter(l=>l.offsetParent);
     return {count:lines.length,text:lines.map(l=>l.textContent),afterTop:lines.every(l=>l.previousElementSibling?.classList.contains('top')),
      streak:Dungeon.injuredStreak(n.records)};},[injury,chain]);
    const ok=want?got.count===1&&got.text[0]===want&&got.afterTop&&got.text[0]==='연속 부상 출발 '+got.streak+'회':got.count===0;
    check(width+' '+name+(want?' shows `'+want+'` under the readout .top':' shows no line'),ok,JSON.stringify(got));
    // desk and dossier each carry a readout; one of them is hidden at each width
    if(OUT){for(const el of await p.$$('.p-sale .readout'))if(await el.isVisible()){await el.scrollIntoViewIfNeeded();break;}
     await p.screenshot({path:path.join(OUT,`strain-${width}-${name}.png`)});}
   }
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok).length;
 console.log(failed?`${failed} strain-line checks failed`:`all ${results.length} strain-line checks passed`);process.exitCode=failed?1:0;
})().catch(e=>{console.error(e);process.exit(1);});
