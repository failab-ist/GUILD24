// D30 BOSS CONFIRM evidence (PRESENTATION_POLISH_BATCH5 §B5-3). Dev-only. The qa-final-prep path:
// real run to D5, controlled D30, then real presses - 3 picked, 원정대 확정, one 보급,
// 마왕성으로 출발 opens the confirm. It reuses qa-controls (PAIR / AUDIT) and checks:
//   A open changes nothing · B 보급으로 돌아가기 and C Escape return to preparation unchanged
//   D 최종 원정 시작 resolves once (boss() / Final Lock / Roll / result) · E repeated input does
//   not resolve twice · F/G one-line, no clip, no overflow · H nothing of the Boss / D25 /
//   power is copied into the sheet · audio: open silent, back = ui, commit = final once ·
//   reload with the sheet open does not resolve.
//   node tools/qa-boss-confirm.cjs <out-dir> [widths] [BOSS]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const {AUDIT,PAIR}=require('./qa-controls.cjs');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/boss-confirm');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const BOSS=process.argv[4]||'WRATH';
const PORT=Number(process.env.QA_PORT||5193),FIXED_NOW=1790112000000,KEY='guild24.save.v8';
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
// everything the sheet must not move
const state=`(()=>{const g=Guild24.game,s=g.run;return JSON.stringify({phase:s.phase,committed:!!s.finalCommitted,team:s.team,lock:!!s.finalLock,
 gold:s.money,gross:s.stats.revenue,stock:s.inventory.map(x=>x.id),rng:g.rng.state,
 npcs:s.npcs.filter(n=>s.team.includes(n.id)).map(n=>[n.id,n.pack,n.money])});})()`;
// spies: boss() calls, RNG draws inside them, cues played, Final Lock writes
const SPY=`(()=>{const g=Guild24.game;window.__qa={boss:0,draws:0,cues:[],locks:0};
 const boss=g.boss.bind(g);g.boss=function(){__qa.boss++;const next=g.rng.next.bind(g.rng);g.rng.next=()=>{__qa.draws++;return next();};
  const had=g.run.finalLock;try{return boss();}finally{g.rng.next=next;if(g.run.finalLock&&g.run.finalLock!==had)__qa.locks++;}};
 const play=Sound.play;Sound.play=k=>{__qa.cues.push(k);return play(k);};})()`;
(async()=>{
 const playwright=require('playwright');fs.mkdirSync(OUT,{recursive:true});
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  let seed=null;{const p=await (await browser.newContext()).newPage();await p.goto(`http://127.0.0.1:${PORT}/index.html`);
   for(let k=1;k<400&&!seed;k++){const id=await p.evaluate(s=>{Guild24.game.start(s);return Guild24.game.run.bossId;},'qa-final-'+k);if(id===BOSS)seed='qa-final-'+k;}}
  console.log('seed',seed,BOSS);
  for(const width of WIDTHS){
   const desktop=width>=1024,tag=width+'';
   const ctx=await browser.newContext({viewport:{width,height:desktop?880:780},deviceScaleFactor:desktop?1:2,
    isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(t=>{Date.now=()=>t;if(!sessionStorage.getItem('qa-bc')){localStorage.clear();sessionStorage.setItem('qa-bc','1');}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>check('no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);   // before the DAY 0 lesson can paint
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   for(let i=0;i<800;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;await p.evaluate(`(${STEP})()`);}
   await p.evaluate(`(()=>{const g=Guild24.game,s=g.run;s.day=30;g.morning();if(s.event)s.eventSeen=true;s.bossReveal=s.bossReveal||{};
    for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
    if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;
    for(const it of DATA.items.filter(x=>x.sell>0).slice(0,40))s.inventory.push({id:'qa-'+it.id,item:it.id,cost:Math.round(it.sell*.5),expires:null});
    g.save();Guild24.render();})()`);
   // the real preparation path: 3 picked, 원정대 확정, one 보급
   const ids=await p.evaluate(`Guild24.game.finalEligible().slice(0,3).map(n=>n.id)`);
   for(const id of ids)await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   await p.click('.p-final .dock [data-action="final-commit"]');
   await p.click(`.p-final [data-action="select"][data-id="qa-rice"]`);await p.click('.p-final [data-action="supply"]');
   await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=0`);
   await p.evaluate(SPY);
   const open=async()=>{await p.click('.p-final .dock [data-action="boss"]');await p.mouse.move(1,1);await p.waitForTimeout(250);};
   const s0=await p.evaluate(state);

   // A: opening changes nothing and plays no Final cue
   await open();
   const sheet=await p.evaluate(`(()=>{const m=document.querySelector('#modal-root .modal');const t=m?m.innerText:'';const s=Guild24.game.run,d=s.dungeons[0];
    const names=[...(d.familyNames||[]),...d.hazards.map(h=>DATA.hazardBy?.[h]?.name||h),DATA.bossBy[s.bossId].name];
    return {open:!!m,text:t,imgs:m?m.querySelectorAll('img,.boss-face,.boss-art,[style*="BACKDROP"]').length:-1,
     copied:names.filter(x=>x&&t.includes(x)),digits:(t.replace('제0게이트','').match(/\\d/g)||[]).length,percent:/%/.test(t),
     w:m?Math.round(m.getBoundingClientRect().width):0,h:m?Math.round(m.getBoundingClientRect().height):0,
     backdrop:getComputedStyle(document.querySelector('.stage.p-final .stage-scroll')).backgroundImage.includes('BACKDROP')};})()`);
   check(`A @${tag} opening the confirm changes no state`,await p.evaluate(state)===s0);
   check(`A @${tag} opening plays no Final cue and resolves nothing`,await p.evaluate(`!__qa.cues.includes('final')&&__qa.boss===0`),await p.evaluate(`JSON.stringify(__qa)`));
   check(`H @${tag} the sheet copies no Boss art / backdrop, Family / Hazard / Boss name, number or %`,sheet.open&&sheet.imgs===0&&!sheet.copied.length&&sheet.digits===0&&!sheet.percent,JSON.stringify({imgs:sheet.imgs,copied:sheet.copied,digits:sheet.digits}));
   check(`H @${tag} the D30 room stays behind the shade (one backdrop, on the stage)`,sheet.backdrop);
   console.log(`NOTE @${tag} sheet ${sheet.w}x${sheet.h}: ${sheet.text.replace(/\n+/g,' | ')}`);
   const pair=await p.evaluate(PAIR);
   check(`PAIR @${tag} 최종 원정 시작 / 보급으로 돌아가기: one control family (notch/outline/bevel/corner/clip), full row`,
    !!pair&&pair.count===2&&pair.shapes.every(x=>x.cls===pair.shapes[0].cls&&x.radius===pair.shapes[0].radius&&x.border===pair.shapes[0].border&&x.shadow===pair.shapes[0].shadow&&x.clip===pair.shapes[0].clip&&x.w===pair.shapes[0].w),JSON.stringify(pair&&pair.shapes));
   check(`PAIR @${tag} no visible header 닫기; 보급으로 돌아가기 is the one cancel owner`,!!pair&&!pair.headerClose.length&&pair.cancels===1,JSON.stringify(pair&&{header:pair.headerClose,labels:pair.labels}));
   const hier=await p.evaluate(`(()=>{const go=document.querySelector('#modal-root [data-action="boss-go"]'),back=document.querySelector('#modal-root .modal-footer [data-action="dismiss"]');
    const a=go.getBoundingClientRect(),b=back.getBoundingClientRect();return {goFirst:a.top<b.top,goH:Math.round(a.height),backH:Math.round(b.height)};})()`);
   check(`PAIR @${tag} hierarchy: 최종 원정 시작 reads first and heaviest`,hier.goFirst&&hier.goH>=hier.backH,JSON.stringify(hier));
   const au=await p.evaluate(AUDIT('#modal-root','.modal-footer button'));
   check(`F @${tag} sheet actions one line, nothing clipped / off-screen, no horizontal scroll`,!au.fail.length&&!au.hscroll&&au.actions.length===2,JSON.stringify(au.fail));
   await p.screenshot({path:path.join(OUT,`boss-confirm-${tag}.png`)});

   // B: 보급으로 돌아가기
   await p.click('#modal-root .modal-footer [data-action="dismiss"]');await p.waitForTimeout(150);
   const b=await p.evaluate(`(()=>({open:!!document.querySelector('#modal-root .modal'),focus:document.activeElement&&document.activeElement.dataset.action,cues:__qa.cues.slice(),boss:__qa.boss}))()`);
   check(`B @${tag} 보급으로 돌아가기 returns to preparation, state unchanged, ordinary ui cue`,!b.open&&await p.evaluate(state)===s0&&b.boss===0&&b.cues.at(-1)==='ui'&&!b.cues.includes('final'),JSON.stringify(b));
   check(`B @${tag} focus goes back to 마왕성으로 출발`,b.focus==='boss',String(b.focus));
   await p.click(`.p-final [data-action="supply-target"][data-id="${ids[1]}"]`);
   check(`B @${tag} preparation stays operable (participant switch works)`,await p.evaluate(`document.querySelector('.p-final [data-action="supply-target"][data-id="${ids[1]}"]').classList.contains('active')`));

   // C: Escape
   await open();await p.keyboard.press('Escape');await p.waitForTimeout(150);
   check(`C @${tag} Escape returns to preparation, state unchanged, nothing resolved`,!(await p.evaluate(`!!document.querySelector('#modal-root .modal')`))&&await p.evaluate(state)===s0&&await p.evaluate(`__qa.boss===0`));

   // reload with the sheet open: back in preparation, never resolved
   await open();await p.reload({waitUntil:'load'});await p.waitForTimeout(300);
   const r=await p.evaluate(`(()=>{const s=Guild24.game.run;return {phase:s.phase,lock:!!s.finalLock,committed:!!s.finalCommitted,modal:!!document.querySelector('#modal-root .modal'),prep:!!document.querySelector('.p-final .final-team')};})()`);
   check(`S @${tag} reload with the confirm open: preparation, no Final Lock, no resolution`,r.phase==='final'&&!r.lock&&r.committed&&r.prep,JSON.stringify(r));
   await p.evaluate(SPY);

   // D / E: 최종 원정 시작 - fired as a burst (double click, then Enter repeats on whatever holds focus)
   await open();const pre=await p.evaluate(state);
   await p.dblclick('#modal-root [data-action="boss-go"]').catch(()=>{});
   for(let i=0;i<3;i++){await p.keyboard.press('Enter');await p.keyboard.press('Space');}
   await p.waitForTimeout(400);
   const d=await p.evaluate(`(()=>({...__qa,phase:Guild24.game.run.phase,lock:!!Guild24.game.run.finalLock,win:Guild24.game.run.win,end:!!document.querySelector('.stage.p-end')}))()`);
   const resolved=d.boss>=1&&d.locks===1&&d.draws===1&&d.phase==='end'&&d.lock;
   check(`D @${tag} 최종 원정 시작: one resolution - Final Lock once, Final Roll once, result shown`,resolved&&d.end,JSON.stringify({boss:d.boss,locks:d.locks,draws:d.draws,phase:d.phase,win:d.win}));
   check(`E @${tag} repeated input does not resolve twice (no second Lock / Roll)`,d.locks===1&&d.draws===1,JSON.stringify({boss:d.boss,locks:d.locks,draws:d.draws}));
   check(`AU @${tag} the Final cue plays exactly once`,d.cues.filter(x=>x==='final').length===1,JSON.stringify(d.cues));
   console.log(`NOTE @${tag} pre-commit state ${pre.length} chars; result ${d.win?'CLEAR':'FAIL'}`);
   await ctx.close();
  }
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?failed+' BOSS CONFIRM check(s) FAILED':'all '+results.length+' BOSS CONFIRM checks passed');
 process.exit(failed?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
