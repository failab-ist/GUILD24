// FINAL -> END transition evidence (PRESENTATION_POLISH_BATCH5 §B5-4). Dev-only.
// The qa-boss-confirm path, pressed through: real run to D5, qa-visual's controlled D30, then real
// controls - 3 picked, 원정대 확정, one 보급 to the first member (the others go empty-handed),
// 마왕성으로 출발, 최종 원정 시작 (double-clicked, then Enter / Space repeats). The resolver decides:
//   clear - the members get the canonical grown-party fixture (tests/final.cjs FINAL 10 / qa-end-states
//           `grown`: Lv 40, fixed Stats) before they are picked; nothing about the result is written
//   fail  - the qa-visual party as it stands
// and a natural (non-Final) ending from the qa-end-states baseline seed (death limit).
// Checks the resolved truth against END, one resolution / settlement / unlock, the sent-off party and
// its last supply against the Final snapshot, no FINAL leak, and reload idempotence.
//   node tools/qa-final-end.cjs <out-dir> [widths] [BOSS]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-end');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const BOSS=process.argv[4]||'WRATH';
const PORT=Number(process.env.QA_PORT||5189),FIXED_NOW=1790112000000,KEY='guild24.save.v8';
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
const note=(name,detail)=>console.log('NOTE '+name+(detail?' - '+detail:''));
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
// counters on the one-shot calls of an ending
const SPY=`(()=>{const g=Guild24.game;window.__qa={boss:0,draws:0,end:0,settle:0,capital:0,finish:0,cues:[]};
 const wrap=(o,k,key,inner)=>{const f=o[k].bind(o);o[k]=function(...a){__qa[key]++;return inner?inner(f,a):f(...a);};};
 wrap(g,'boss','boss',(f,a)=>{const next=g.rng.next.bind(g.rng);g.rng.next=()=>{__qa.draws++;return next();};try{return f(...a);}finally{g.rng.next=next;}});
 wrap(g,'end','end');wrap(g,'settleStoreCapital','settle');wrap(Meta,'addCapital','capital');wrap(Meta,'finish','finish');
 const play=Sound.play;Sound.play=k=>{__qa.cues.push(k);return play(k);};})()`;
const ACCOUNT=`(()=>{const a=Guild24.game.account;return {capital:Meta.storeCapital(a),runs:a.runs,wins:a.wins,opened:JSON.stringify(Meta.opened(a))};})()`;
const ENDED=`(()=>{const s=Guild24.game.run;return JSON.stringify({phase:s.phase,win:s.win,reason:s.endReason,lock:s.finalLock,debug:s.bossDebug,report:s.finalReport,
 settlement:s.settlement,settled:s.settled,rewarded:s.rewarded,unlocked:s.unlocked,rng:Guild24.game.rng.state});})()`;
// what an ending must not carry from the Final
const LEAK=`(()=>{const s=Guild24.game.run,d=s.dungeons&&s.dungeons[0]||{},st=document.querySelector('.stage');const t=st?st.innerText:'';
 const trait=Copy.boss.d15.trait[s.bossId]&&Copy.boss.d15.trait[s.bossId][0];
 const names=[...(d.familyNames||[]),...(d.hazards||[]).map(h=>DATA.hazardBy&&DATA.hazardBy[h]?DATA.hazardBy[h].name:null),trait,'확인된 위협','토벌 전망'].filter(Boolean);
 const bg=st?getComputedStyle(st.querySelector('.stage-scroll')||st).backgroundImage:'';
 return {pEnd:!!document.querySelector('.stage.p-end'),pFinal:!!document.querySelector('.p-final'),dataBoss:!!document.querySelector('[data-boss]'),
  backdrop:/BACKDROP/.test(bg),bossImg:[...document.querySelectorAll('.stage img')].filter(i=>/boss|BACKDROP/i.test(i.src)).length,
  modal:!!document.querySelector('#modal-root .modal'),bodyLock:document.body.style.overflow,
  finalUi:['.final-team','.final-forecast','.shelf','.final-order','[data-action="team"]','[data-action="boss"]','[data-action="supply"]'].filter(q=>document.querySelector(q)),
  copied:names.filter(x=>t.includes(x)),power:/투력 합|전투력|확률|Final Roll/.test(t)};})()`;
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
   await ctx.addInitScript(t=>{Date.now=()=>t;if(!sessionStorage.getItem('qa-fe')){localStorage.clear();sessionStorage.setItem('qa-fe','1');}},FIXED_NOW);
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
   const d30=await p.evaluate(k=>localStorage.getItem(k),KEY),acct0=await p.evaluate(k=>localStorage.getItem(k),KEY);
   const restore=async raw=>{await p.evaluate(([k,v])=>{Guild24.game.autosave=false;localStorage.setItem(k,v);},[KEY,raw]);await p.reload({waitUntil:'load'});await p.waitForTimeout(250);};

   for(const kind of ['clear','fail']){
    await restore(d30);
    const ids=await p.evaluate(`Guild24.game.finalEligible().slice(0,3).map(n=>n.id)`);
    if(kind==='clear')await p.evaluate(`(()=>{const s=Guild24.game.run;for(const id of ${JSON.stringify(ids)}){const n=s.npcs.find(x=>x.id===id);
     n.level=40;n.stats={combat:220,survival:160,mobility:140,spirit:120};}Guild24.game.save();Guild24.render();})()`);
    for(const id of ids)await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
    await p.click('.p-final .dock [data-action="final-commit"]');
    await p.click(`.p-final [data-action="supply-target"][data-id="${ids[0]}"]`);
    const rev0=await p.evaluate(`Guild24.game.run.stats.revenue`),price=await p.evaluate(`Guild24.game.finalPrice('rice')`);
    await p.click(`.p-final [data-action="select"][data-id="qa-rice"]`);await p.click('.p-final [data-action="supply"]');
    const pre=await p.evaluate(`(()=>{const s=Guild24.game.run;return {revenue:s.stats.revenue,gold:s.money,stock:s.inventory.length,
     team:s.team.map(id=>{const n=s.npcs.find(x=>x.id===id);return {id,name:n.name,level:n.level,job:n.job,pack:[...n.pack]};})};})()`);
    const a0=await p.evaluate(ACCOUNT);
    await p.evaluate(SPY);
    await p.click('.p-final .dock [data-action="boss"]');
    await p.dblclick('#modal-root [data-action="boss-go"]').catch(()=>{});
    for(let i=0;i<3;i++){await p.keyboard.press('Enter');await p.keyboard.press('Space');}
    await p.mouse.move(1,1);await p.waitForTimeout(500);
    const q=await p.evaluate(`window.__qa`),s=JSON.parse(await p.evaluate(ENDED)),a1=await p.evaluate(ACCOUNT);
    const won=kind==='clear';
    // 1-2 resolved truth, and END reads it
    const dom=await p.evaluate(`(()=>{const g=q=>(document.querySelector(q)||{}).innerText||'';return {closed:g('.end-tape .closed'),reason:g('.end-tape .reason'),head:g('.end-tape .head'),
     sentH:g('.sent-off h3'),goers:[...document.querySelectorAll('.sent-off .goer')].map(x=>({name:x.querySelector('b').innerText,who:x.querySelector('.who-line').innerText,carried:x.querySelector('.carried').innerText})),
     opened:[...document.querySelectorAll('.end-tape .opened')].map(x=>x.innerText),toast:[...document.querySelectorAll('.toast')].map(x=>x.innerText)};})()`);
    check(`${kind} @${tag} resolved ${won?'CLEAR':'FAIL'}: win / finalReport.cleared / Lock / bossDebug agree`,
     s.phase==='end'&&s.win===won&&s.report&&s.report.cleared===won&&!!s.lock&&!!s.debug&&(s.debug.assault>=s.debug.bossPower)===won,
     JSON.stringify({win:s.win,cleared:s.report&&s.report.cleared,assault:s.debug&&Math.round(s.debug.assault*10)/10,bossPower:s.debug&&s.debug.bossPower}));
    check(`${kind} @${tag} END headline / reason read the resolved result`,dom.closed===(won?'마왕이 쓰러졌다.':'마왕을 토벌하지 못했다.')&&dom.reason===s.reason&&dom.head.includes(won?'제0게이트 폐쇄':'영업 종료'),JSON.stringify({closed:dom.closed,reason:dom.reason}));
    // 3 one resolution
    check(`${kind} @${tag} one resolution: boss() 1, Final Roll 1, end() 1, settlement 1, Meta.finish 1, Store Capital added 1`,
     q.boss===1&&q.draws===1&&q.end===1&&q.settle===1&&q.finish===1&&q.capital===1,JSON.stringify({boss:q.boss,roll:q.draws,end:q.end,settle:q.settle,finish:q.finish,capital:q.capital}));
    check(`${kind} @${tag} the Final cue once, nothing replays it on END`,q.cues.filter(x=>x==='final').length===1,JSON.stringify(q.cues));
    // 4 party and last supply = the Final snapshot
    const expect=await p.evaluate(team=>team.map(m=>({name:m.name,who:'Lv.'+m.level+' '+DATA.jobBy[m.job].name,
     carried:m.pack.length?'마지막 보급 · '+m.pack.map(i=>DATA.itemBy[i].name).join(' · '):'빈손으로 갔다'})),pre.team);
    check(`${kind} @${tag} sent-off heading follows the result`,dom.sentH===(won?'제0게이트를 닫고 온 사람들':'마왕성으로 보낸 사람들'),dom.sentH);
    check(`${kind} @${tag} exactly the departed members, their Final Lv / Job, their actual last Bag`,JSON.stringify(dom.goers)===JSON.stringify(expect),JSON.stringify(dom.goers));
    check(`${kind} @${tag} the evidence is the finalReport snapshot (live packs are already cleared)`,
     await p.evaluate(`Guild24.game.run.team.every(id=>Guild24.game.run.npcs.find(n=>n.id===id).pack.length===0)`)&&JSON.stringify(s.report.members.map(m=>m.items))===JSON.stringify(pre.team.map(m=>m.pack)));
    // 9 settlement truth
    const st=s.settlement;
    check(`${kind} @${tag} settlement reads the recorded Gross Sales (Final transfer included) - not Gold or Inventory`,
     st&&st.sales===pre.revenue&&pre.revenue===rev0+price&&st.gain===Math.round(st.sales*st.rate)&&a1.capital===a0.capital+st.gain&&Object.keys(st).sort().join()==='capitalAfter,day,gain,rate,sales',
     JSON.stringify({sales:st&&st.sales,transfer:price,gain:st&&st.gain,capital:[a0.capital,a1.capital],gold:pre.gold,stock:pre.stock}));
    // 10 unlock
    check(`${kind} @${tag} ${won?'the clear credits once; runs +1, wins +1':'a fail credits a run only'}`,a1.runs===a0.runs+1&&a1.wins===a0.wins+(won?1:0),JSON.stringify({a0,a1}));
    if(won)check(`${kind} @${tag} unlocks (if any) are shown once, on the END statement, with no toast`,(s.unlocked||[]).length?dom.opened.length===1&&dom.opened[0].includes(s.unlocked.join(' · '))&&!dom.toast.length:!dom.opened.length&&!dom.toast.length,
     JSON.stringify({unlocked:s.unlocked,opened:dom.opened,toast:dom.toast}));
    // 7 / 8 / 14 no Final leak
    const leak=await p.evaluate(LEAK);
    check(`${kind} @${tag} END owns the stage: no .p-final / data-boss / backdrop / Boss art / FINAL controls`,leak.pEnd&&!leak.pFinal&&!leak.dataBoss&&!leak.backdrop&&!leak.bossImg&&!leak.finalUi.length,JSON.stringify(leak));
    check(`${kind} @${tag} no BOSS CONFIRM left, body scroll unlocked`,!leak.modal&&leak.bodyLock==='',JSON.stringify({modal:leak.modal,body:leak.bodyLock}));
    check(`${kind} @${tag} no D25 / Boss trait / power / probability copied onto END`,!leak.copied.length&&!leak.power,JSON.stringify(leak.copied));
    await p.screenshot({path:path.join(OUT,`end-${kind}-${tag}.png`)});
    if(await p.evaluate(`(()=>{const e=document.querySelector('.stage-scroll');return e.scrollHeight>e.clientHeight+2;})()`)){
     await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=1e6`);await p.waitForTimeout(150);
     await p.screenshot({path:path.join(OUT,`end-${kind}-${tag}-scrolled.png`)});}
    // 13 reload
    await p.reload({waitUntil:'load'});await p.waitForTimeout(300);
    const s2=await p.evaluate(ENDED),a2=await p.evaluate(ACCOUNT);
    check(`${kind} @${tag} reload: still ended, same Lock / Roll / report / settlement / unlocks, account unchanged`,s2===JSON.stringify(s)&&JSON.stringify(a2)===JSON.stringify(a1),JSON.stringify({a1,a2}));
    check(`${kind} @${tag} reload shows the same END`,await p.evaluate(`!!document.querySelector('.stage.p-end')&&!document.querySelector('.p-final')&&(document.querySelector('.end-tape .closed')||{}).innerText===${JSON.stringify(dom.closed)}`));
    // the next Run starts from the settled account: reset the account for the next kind
    await restore(acct0);
   }

   // NON-FINAL: a natural Run to its own end from the qa-end-states baseline seed
   await p.evaluate(`(()=>{Guild24.game.autosave=false;})()`);
   await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},'qa-end-1');
   await p.evaluate(`(()=>{(Guild24.game.account.tutorial??={}).skipped=true;})()`);   // before the DAY 0 lesson can paint
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   for(let i=0;i<2400;i++){const ph=await p.evaluate(`Guild24.game.run.phase`);if(ph==='end'||!['morning','order','sell','night','closing'].includes(ph))break;await p.evaluate(`(${STEP})()`);}
   await p.evaluate(`(()=>{const s=Guild24.game.run;s.bossReveal=s.bossReveal||{};for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
    if(s.event)s.eventSeen=true;if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;Guild24.render();})()`);
   await p.mouse.move(1,1);await p.waitForTimeout(400);
   const nf=await p.evaluate(`(()=>{const s=Guild24.game.run,sc=document.querySelector('.stage-scroll');
    const kids=sc?[...sc.querySelectorAll(':scope > *, :scope > * > *')].filter(e=>e.getClientRects().length):[];
    const empty=kids.filter(e=>!e.innerText.trim()&&!e.querySelector('img,svg,canvas')&&e.getBoundingClientRect().height>8&&!/tear/.test(e.className));
    const tape=document.querySelector('.end-tape').getBoundingClientRect(),last=[...sc.children].at(-1).getBoundingClientRect();
    return {phase:s.phase,day:s.day,deaths:s.stats.deaths,report:!!s.finalReport,sent:!!document.querySelector('.sent-off'),closed:(document.querySelector('.end-tape .closed')||{}).innerText,
     empty:empty.map(e=>e.className||e.tagName),tail:Math.round(sc.scrollHeight-(last.bottom-sc.getBoundingClientRect().top+sc.scrollTop)),lastIsTape:last.bottom===tape.bottom||[...sc.children].length===1};})()`);
   check(`nonfinal @${tag} natural END (DAY ${nf.day}, deaths ${nf.deaths}): no finalReport, no sent-off region`,nf.phase==='end'&&!nf.report&&!nf.sent,JSON.stringify(nf));
   check(`nonfinal @${tag} no empty heading / container, nothing after the statement`,!nf.empty.length&&nf.lastIsTape,JSON.stringify({empty:nf.empty,tail:nf.tail}));
   const leak=await p.evaluate(LEAK);
   check(`nonfinal @${tag} no Final UI / backdrop / modal on END`,leak.pEnd&&!leak.pFinal&&!leak.dataBoss&&!leak.backdrop&&!leak.finalUi.length&&!leak.modal,JSON.stringify(leak));
   note(`nonfinal @${tag}`,nf.closed);
   await p.screenshot({path:path.join(OUT,`end-nonfinal-${tag}.png`)});
   await ctx.close();
  }
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?failed+' FINAL->END check(s) FAILED':'all '+results.length+' FINAL->END checks passed');
 process.exit(failed?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
