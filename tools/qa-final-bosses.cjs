// D30 FINAL — per-Boss domain backdrop evidence (PRESENTATION_POLISH_BATCH5 §B5-1).
// Dev-only. For each requested Boss it finds a seed whose Run draws that Boss (the Boss is fixed at
// Run start, so this only chooses the subject, never an outcome), plays the real path to D5 with
// the qa-visual policy, then takes qa-visual's controlled D30 setup (Day moved once, morning()
// opens the real FINAL). It asserts the stage binds that Boss's own room file, that the file
// loads at its source 1672x941, and that the room is never sized as a stretched pair; then
// captures the FINAL.
//   node tools/qa-final-bosses.cjs <out-dir> [WRATH,LUST,SLOTH|all] [widths]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-bosses');
const ALL=['WRATH','PRIDE','ENVY','GREED','GLUTTONY','LUST','SLOTH'];
const FILE={WRATH:'B001_WRATH_BACKDROP.png',PRIDE:'B002_PRIDE_BACKDROP.png',ENVY:'B003_ENVY_BACKDROP.png',
 GREED:'B004_GREED_BACKDROP.png',GLUTTONY:'B005_GLUTTONY_BACKDROP.png',LUST:'B006_LUST_BACKDROP.png',SLOTH:'B007_SLOTH_BACKDROP.png'};
const WANT=(!process.argv[3]||process.argv[3]==='all')?ALL:process.argv[3].split(',');
const WIDTHS=(process.argv[4]||'390,1280').split(',').map(Number);
const PORT=Number(process.env.QA_PORT||5192),FIXED_NOW=1790112000000;
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=`(()=>{
 const g=Guild24.game,s=g.run,D=DATA;
 if(s.phase==='morning'){g.beginOrder();return s.phase;}
 if(s.phase==='order'){
  const wanted=Math.min(s.offers.length,Math.max(3,s.queue.length));
  for(let i=0;i<wanted;i++){const o=s.offers[i];if(!o.quantity)continue;
   try{g.setQuantity(i,Math.min(2,o.quantity));}catch(e){}}
  try{g.confirmOrder();}catch(e){}g.open();return s.phase;}
 if(s.phase==='sell'){
  const n=g.current();let guard=0;
  while(n&&n.pack.length<Adventurer.slots(n)&&guard++<8){
   const st=s.inventory.find(st=>!n.refused.includes(st.item+':full')&&g.interest(n,D.itemBy[st.item],'full').debit<=n.money);
   if(!st)break;try{if(!g.sell(st.id,'full'))break;}catch(e){break;}}
  g.depart();return s.phase;}
 if(s.phase==='night'){g.finishNight();return s.phase;}
 if(s.phase==='closing'){while(s.money<0&&s.inventory.length)g.liquidate(s.inventory[0].id);g.closeDay();return s.phase;}
 return s.phase;
})`;
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
async function begin(page,seed){
 await page.addInitScript(t=>{try{localStorage.clear();}catch(e){};Date.now=()=>t;},FIXED_NOW);
 await page.reload({waitUntil:'load'});
 await page.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
 await page.click('#modal-root [data-action="start"]');
 await page.click('#modal-root [data-action="buy-relic"]');
 await page.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
}
async function toFinal(page){
 for(let i=0;i<800;i++){
  if(await page.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;
  await page.evaluate(`${STEP}()`);}
 return page.evaluate(`(()=>{const g=Guild24.game,s=g.run;g.run.day=30;g.morning();
  if(s.event)s.eventSeen=true;s.bossReveal=s.bossReveal||{};
  for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
  if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;Guild24.render();return s.phase==='final';})()`);
}
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  // which seed draws which Boss - read off a fresh Run, nothing played
  const seeds={};const scan=await (await browser.newContext()).newPage();
  await scan.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
  for(let k=1;k<400&&WANT.some(b=>!seeds[b]);k++){
   const id=await scan.evaluate(s=>{Guild24.game.start(s);return Guild24.game.run.bossId;},'qa-final-'+k);
   if(WANT.includes(id)&&!seeds[id])seeds[id]='qa-final-'+k;}
  console.log(JSON.stringify(seeds));
  for(const width of WIDTHS){
   const desktop=width>=1024;
   const c=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   const p=await c.newPage();p.on('pageerror',e=>check('no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   for(const boss of WANT){if(!seeds[boss]){check(boss+' seed found',false);continue;}
    await begin(p,seeds[boss]);
    if(!await toFinal(p)){check(boss+' reaches FINAL @'+width,false);continue;}
    await p.mouse.move(1,1);await p.waitForTimeout(500);
    const r=await p.evaluate(async()=>{const st=document.querySelector('.stage.p-final'),sc=st&&st.querySelector('.stage-scroll');
     const cs=sc&&getComputedStyle(sc);const url=(cs?.backgroundImage.match(/url\("?([^")]+)"?\)/)||[])[1]||'';
     const img=new Image();img.src=url;await img.decode().catch(()=>{});
     return {boss:st?.dataset.boss,url,size:cs?.backgroundSize,w:img.naturalWidth,h:img.naturalHeight};});
    check(`${boss} @${width} binds ${FILE[boss]}`,r.boss===boss&&r.url.endsWith('/assets/presentation/final/'+FILE[boss]),r.url.split('/').pop());
    check(`${boss} @${width} room loads at its source 1672x941`,r.w===1672&&r.h===941,r.w+'x'+r.h);
    /* the room is the second background layer; its size must fix ONE axis only (the other is
       auto - a single value means `W auto`), or the source would be stretched */
    const room=((r.size||'').split(',')[1]||'').trim().split(/\s+/);
    check(`${boss} @${width} room keeps its 1672:941 ratio`,room.length===1&&room[0]!=='auto'||room.length===2&&room.includes('auto')&&room.filter(x=>x==='auto').length===1,r.size);
    await p.screenshot({path:path.join(OUT,`final-${boss}-${width}.png`)});
   }
   await c.close();
  }
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?failed+' FINAL backdrop check(s) FAILED':'all '+results.length+' FINAL backdrop checks passed');
 process.exit(failed?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
