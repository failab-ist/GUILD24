// MORNING DAY SIGN FLIP (UI_UX §MORNING — DAY SIGN FLIP, UI-Q-v29-48; User 2026-09-29) - runtime evidence. Dev-only, part of
// `npm run qa:runtime`. A Run is played to a CLOSING and `다음 날` is pressed like a player: arriving at the next MORNING rolls
// the sign from yesterday's number to today's, it lands on the plain number (the DOM as it began), a redraw of the same
// MORNING and a reload do not roll it, reduced motion never starts it, and nothing errors. 390 and 1280; 390 reduced.
//   node tools/qa-day-flip.cjs [out-dir]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=process.argv[2]||null,PORT=Number(process.env.QA_PORT||5253);
const EXE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(ROOT+'/tools/qa-final-bosses.cjs','utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const res=[];const check=(n,ok,d='')=>{res.push(ok);console.log((ok?'PASS ':'FAIL ')+n+(d?' - '+d:''));};
(async()=>{const srv=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 await new Promise(r=>srv.stdout.on('data',d=>String(d).includes('ready')&&r()));
 if(OUT)fs.mkdirSync(OUT,{recursive:true});const pw=require('playwright');const b=await pw.chromium.launch({executablePath:EXE,args:['--no-sandbox']});
 try{for(const [w,h,m,rm] of [[390,844,true,'no-preference'],[1280,880,false,'no-preference'],[390,844,true,'reduce']]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:m,hasTouch:m,locale:'ko-KR',reducedMotion:rm});const p=await c.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',x=>{if(x.type()==='error')errs.push(x.text());});
  await p.goto(`http://127.0.0.1:${PORT}/index.html`);
  await p.evaluate(()=>{localStorage.clear();(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.start('qa-flip-2');Guild24.render();});
  await p.click('#modal-root [data-action="buy-relic"]').catch(()=>{});
  // play to a CLOSING, then press 다음 날 like a player
  for(let i=0;i<400;i++){if(await p.evaluate(`Guild24.game.run.phase==='closing'&&Guild24.game.run.day>=2`))break;await p.evaluate(`(${STEP})()`);}
  for(let k=0;k<5;k++){const btn=await p.$('#modal-root .modal [data-action]');if(!btn)break;await btn.click().catch(()=>{});await p.waitForTimeout(200);}
  await p.evaluate(()=>Guild24.render());const day=await p.evaluate(()=>Guild24.game.run.day);
  await p.click('.dock [data-action="close"]');
  if(rm!=='reduce'){const box=await p.evaluate(()=>{document.querySelectorAll('.daysign b span').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=120;}));
    const r=document.querySelector('.daysign').getBoundingClientRect();return {x:r.left-20,y:r.top-12,width:r.width+40,height:r.height+24};});
   if(OUT)await p.screenshot({path:path.join(OUT,`day-flip-mid-${w}.png`),clip:box});
   await p.evaluate(()=>document.querySelectorAll('.daysign b span').forEach(e=>e.getAnimations().forEach(a=>a.play())));}
  const t0=await p.evaluate(()=>{const b=document.querySelector('.daysign b');return b?{flip:b.classList.contains('flip'),html:b.innerHTML,phase:Guild24.game.run.phase,day:Guild24.game.run.day}:null;});
  const tag=w+(rm==='reduce'?' reduced':'');
  if(rm==='reduce')check(tag+' reduced motion: no roll, the plain number',!!t0&&!t0.flip&&t0.html===String(t0.day).padStart(2,'0'),JSON.stringify(t0));
  else{check(tag+' arriving at the next MORNING rolls the sign (yesterday -> today)',!!t0&&t0.flip&&t0.html.includes('>'+String(t0.day-1).padStart(2,'0')+'<')&&t0.day===day+1,JSON.stringify(t0).slice(0,160));
   await p.waitForTimeout(450);
   const t1=await p.evaluate(()=>{const b=document.querySelector('.daysign b');return {flip:b.classList.contains('flip'),html:b.innerHTML};});
   check(tag+' it lands on the plain number (DOM as it began)',!t1.flip&&t1.html===String(t0.day).padStart(2,'0'),JSON.stringify(t1));
   // a redraw of the same MORNING does not roll again
   await p.evaluate(()=>Guild24.render());
   check(tag+' a redraw of the same MORNING does not roll again',await p.evaluate(()=>!document.querySelector('.daysign b').classList.contains('flip')));
   // a reload lands on the still sign
   await p.reload();await p.waitForTimeout(300);
   check(tag+' a reload lands on the still sign',await p.evaluate(()=>{const b=document.querySelector('.daysign b');return !!b&&!b.classList.contains('flip');}));
   if(OUT)await p.screenshot({path:path.join(OUT,`day-flip-${w}.png`)});}
  check(tag+' no page or console error',errs.length===0,errs.slice(0,2).join(' | '));await c.close();}}
 finally{await b.close();srv.kill();}
 const f=res.filter(x=>!x).length;console.log(f?'qa-day-flip: '+f+' FAILED':'qa-day-flip: all '+res.length+' checks passed');process.exitCode=f?1:0;})().catch(e=>{console.error(e);process.exitCode=1;});
