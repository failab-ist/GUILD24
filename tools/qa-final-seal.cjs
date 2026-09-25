// v2.9.2 H5 FINAL SEAL evidence. Capture-only (not in qa:runtime): the same controlled D30 and real controls as
// qa-final-end (clear = the canonical grown-party fixture, fail = the party as it stands), pressed through to END;
// for each result a settled reduced-motion capture of the tape at the top, and with QA_FRAMES the landing itself
// with motion on (anime slowed ten times, the Run's frozen clock handed back to anime for the replay).
//   QA_FRAMES=100,200,290,400,520 node tools/qa-final-seal.cjs <out-dir> [widths] [BOSS]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const toMuster=async p=>{if(await p.$('.p-final .dock [data-action="final-ordered"]'))await p.click('.p-final .dock [data-action="final-ordered"]');};
const pickFinal=async(p,id)=>{await toMuster(p);await p.click(`.p-final [data-action="final-npc"][data-id="${id}"]`);await p.click('#modal-root [data-action="final-team"]');};
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-seal');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number),BOSS=process.argv[4]||'WRATH';
const PORT=Number(process.env.QA_PORT||5188),FIXED_NOW=1790112000000;
const FRAMES=(process.env.QA_FRAMES||'').split(',').filter(Boolean).map(Number),SLOW=10;
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  let seed=null;{const p=await (await browser.newContext()).newPage();await p.goto(`http://127.0.0.1:${PORT}/index.html`);
   for(let k=1;k<400&&!seed;k++){const id=await p.evaluate(s=>{Guild24.game.start(s);return Guild24.game.run.bossId;},'qa-final-'+k);if(id===BOSS)seed='qa-final-'+k;}}
  console.log('seed',seed,BOSS);
  for(const width of WIDTHS)for(const motion of FRAMES.length?[false,true]:[false])for(const kind of ['clear','fail']){
   const desktop=width>=1024;
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:motion?'no-preference':'reduce'});
   // the Run's clock is frozen; anime keeps the Date.now it finds at load, so it gets a wrapper the replay can switch back
   await ctx.addInitScript(t=>{const real=Date.now.bind(Date);Date.now=()=>window.__live?real():t;try{localStorage.clear();}catch(e){}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGE ERROR '+e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   for(let i=0;i<800;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;await p.evaluate(`(${STEP})()`);}
   await p.evaluate(`(()=>{const g=Guild24.game,s=g.run;s.day=30;g.morning();if(s.event)s.eventSeen=true;s.bossReveal=s.bossReveal||{};
    for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
    if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;
    for(const it of DATA.items.filter(x=>x.sell>0).slice(0,40))s.inventory.push({id:'qa-'+it.id,item:it.id,cost:Math.round(it.sell*.5),expires:null});
    g.save();Guild24.render();})()`);
   const ids=await p.evaluate(`Guild24.game.finalEligible().slice(0,3).map(n=>n.id)`);
   if(kind==='clear')await p.evaluate(`(()=>{const s=Guild24.game.run;for(const id of ${JSON.stringify(ids)}){const n=s.npcs.find(x=>x.id===id);
    n.level=40;n.stats={combat:220,survival:160,mobility:140,spirit:120};}Guild24.game.save();Guild24.render();})()`);
   for(const id of ids)await pickFinal(p,id);
   await p.click('.p-final .dock [data-action="final-commit"]');
   await p.click('.p-final .dock [data-action="boss"]');
   if(motion)await p.evaluate(`(()=>{window.__live=true;anime.engine.speed=1/${SLOW};})()`);
   await p.click('#modal-root [data-action="boss-go"]');
   const t0=await p.evaluate(()=>performance.now());await p.mouse.move(1,1);
   const won=await p.evaluate(`Guild24.game.run.win`);
   if(motion){for(const ms of FRAMES){await p.waitForFunction(([t,x])=>performance.now()-t>=x,[t0,ms*SLOW]);
     await p.screenshot({path:path.join(OUT,`seal-${kind}-${width}-f${String(ms).padStart(4,'0')}.png`)});}
    console.log('FRAMES '+kind+' @'+width+' win='+won);}
   else{await p.waitForTimeout(600);await p.screenshot({path:path.join(OUT,`seal-${kind}-${width}.png`)});console.log('CAPTURE '+kind+' @'+width+' win='+won);}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1);});
