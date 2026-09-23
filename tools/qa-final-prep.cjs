// D30 FINAL party selection / preparation evidence (PRESENTATION_POLISH_BATCH5 §B5-2,
// FINAL_EXPEDITION v2.8 §D30 PLAYER FLOW / §2.1 subjugation forecast / §3 Item boundary,
// UI-Q-v28-32). Dev-only. Real path to D5 with the qa-visual policy, qa-visual's controlled D30
// setup, then that D30 save is replayed for each party size and every step is a real control
// press: pick members, 원정대 확정 (and the sub-3 confirm), focus a member, pick a stock line, 보급.
//   node tools/qa-final-prep.cjs <out-dir> [widths] [BOSS]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-prep');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const BOSS=process.argv[4]||'WRATH';
const PORT=Number(process.env.QA_PORT||5191),FIXED_NOW=1790112000000,KEY='guild24.save.v8';
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const NOOP=['kit','stone','tree'];
const {AUDIT,PAIR}=require('./qa-controls.cjs');
/* Action buttons of the B5-2 surfaces: the dock, sheet footers, the transfer, and the 마지막 발주
   controls. Everything else (NPC cards, participant switches, shelf lines) is content. */
const ACTIONS='.dock button, .modal-footer button, [data-action="supply"], .final-order button';
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
const note=(name,detail)=>console.log('NOTE '+name+(detail?' - '+detail:''));
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
const acct=`(()=>{const g=Guild24.game,s=g.run;return {gold:s.money,gross:s.stats.revenue,stock:s.inventory.length,phase:s.phase,
 team:[...s.team],committed:!!s.finalCommitted,rng:g.rng.state,threat:JSON.stringify([s.dungeons[0].families,s.dungeons[0].hazards]),
 packs:Object.fromEntries(s.team.map(id=>{const n=s.npcs.find(x=>x.id===id);return [id,{pack:[...n.pack],money:n.money}]}))};})()`;
const ui=`(()=>{const st=document.querySelector('.stage.p-final');const t=st?st.innerText:'';
 const f=document.querySelector('.p-final .final-forecast:not(.pending) .top b');
 return {forecast:f?f.textContent:null,forecasts:document.querySelectorAll('.p-final .final-forecast:not(.pending)').length,
  pending:!!document.querySelector('.p-final .final-forecast.pending'),count:(document.querySelector('.p-final .party-head .count')||{}).textContent,
  combat:t.includes('전투 전망'),death:t.includes('실패 시 사망 위험'),finalWord:/Final/.test(t),roster:!!document.querySelector('.p-final [data-action="team"]'),
  text:t};})()`;
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
   await ctx.addInitScript(t=>{Date.now=()=>t;if(!sessionStorage.getItem('qa-fp')){localStorage.clear();sessionStorage.setItem('qa-fp','1');}},FIXED_NOW);
   const p=await ctx.newPage();p.on('pageerror',e=>check('no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(s=>{Guild24.game.start(s);Guild24.render();},seed);
   await p.click('#modal-root [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);
   for(let i=0;i<800;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;await p.evaluate(`(${STEP})()`);}
   await p.evaluate(`(()=>{const g=Guild24.game,s=g.run;s.day=30;g.morning();if(s.event)s.eventSeen=true;s.bossReveal=s.bossReveal||{};
    for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
    if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;
    /* the controlled setup gives the store the stock a real D30 would carry into the Final: one of
       every line the catalog sells, the three no-effect Insurance lines included; nothing about
       the Final itself is written */
    for(const it of DATA.items.filter(x=>x.sell>0).slice(0,40))s.inventory.push({id:'qa-'+it.id,item:it.id,cost:Math.round(it.sell*.5),expires:null});
    g.save();Guild24.render();})()`);
   const d30=await p.evaluate(k=>localStorage.getItem(k),KEY);
   /* the page saves on pagehide, so autosave is switched off in the page before the D30 save goes back */
   const restore=async()=>{await p.evaluate(([k,v])=>{Guild24.game.autosave=false;localStorage.setItem(k,v);},[KEY,d30]);await p.reload({waitUntil:'load'});await p.waitForTimeout(250);};
   const shot=async(n,below=true)=>{await p.mouse.move(1,1);await p.waitForTimeout(250);await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=0`);
    if(!below){await p.screenshot({path:path.join(OUT,`prep-${n}-${tag}.png`)});return;}
    await p.evaluate(`(()=>{const t=document.querySelector('.p-final .party-head');if(t)t.scrollIntoView({block:'start'});})()`);
    await p.waitForTimeout(150);await p.screenshot({path:path.join(OUT,`prep-${n}-${tag}.png`)});};
   const focus=async()=>{await p.evaluate(`document.querySelector('.p-final .good.open')?.scrollIntoView({block:'start'})`);await p.mouse.move(1,1);await p.waitForTimeout(200);};
   const risks=new Map();
   const audit=async state=>{for(const scope of ['.stage.p-final','#modal-root']){const r=await p.evaluate(AUDIT(scope,ACTIONS));
     if(scope==='.stage.p-final')check(`CTRL @${tag} ${state}: no horizontal overflow`,!r.hscroll);
     if(!r.actions.length&&!r.content.length)continue;
     check(`CTRL @${tag} ${state} ${scope}: ${r.actions.length} action label(s) one line, nothing clipped / off-screen`,!r.fail.length,
      r.fail.map(x=>x.label+(x.wrapped.length?' wraps['+x.wrapped.join('|')+']':'')+(x.clip?' clip':'')+(x.off?' off':'')).join('; '));
     for(const x of r.risk)risks.set(x.label,x.wrapped.join('|'));}};
   const blocked=async reason=>{const r=await p.evaluate(`(()=>{const b=document.querySelector('.p-final .tillpanel [data-action="supply"]'),st=document.querySelector('.p-final .tillpanel .final-status');
     return {dis:!!b&&b.disabled,face:b?b.innerText.replace(/\\s+/g,' ').trim():'',status:st?st.innerText:'',inside:!!st&&!!b&&b.contains(st)};})()`);
    check(`BR @${tag} ${reason}: status outside the button, the button keeps its action face, disabled`,
     r.dis&&!r.inside&&r.status.includes(reason)&&/^50% \d+G 보급$/.test(r.face)&&!r.face.includes(reason),JSON.stringify({face:r.face,status:r.status}));};
   const cap=await p.evaluate(`Guild24.game.finalRequired()`),ids=await p.evaluate(`Guild24.game.finalEligible().map(n=>n.id)`);
   const t0=(await p.evaluate(acct)).threat;
   check(`setup @${tag} ${ids.length} eligible, cap ${cap}`,ids.length>=3&&cap===3);

   // ---- selection: 0, then 1 picked
   let u=await p.evaluate(ui);
   check(`S @${tag} capacity reads 선택 0명 · 최대 3명`,u.count==='선택 0명 · 최대 3명',u.count);
   check(`S @${tag} guidance, no forecast / 전투 전망 / 사망 위험`,u.pending&&u.text.includes('최대 3명까지 출전할 수 있다.')&&u.text.includes('원정대를 확정하면 토벌 전망을 확인할 수 있다.')&&!u.forecasts&&!u.combat&&!u.death);
   check(`S @${tag} 원정대 확정 closed with nobody picked`,await p.evaluate(`document.querySelector('.p-final .dock [data-action="final-commit"]').disabled`));
   await shot('1-select0',false);await shot('1-select0-below');
   await p.click(`.p-final [data-action="team"][data-id="${ids[0]}"]`);
   u=await p.evaluate(ui);
   const frames=await p.evaluate(`[...document.querySelectorAll('.p-final .npc-card')].map(c=>({chosen:c.classList.contains('chosen'),dis:c.disabled,sh:getComputedStyle(c).boxShadow}))`);
   const plain=frames.filter(f=>!f.chosen&&!f.dis),pick=frames.filter(f=>f.chosen);
   check(`R @${tag} unselected cards share one neutral edge (no rarity frame)`,plain.length>0&&new Set(plain.map(f=>f.sh)).size===1&&/rgb\(58, 49, 41\) 0px 0px 0px 2px inset/.test(plain[0].sh),plain[0]&&plain[0].sh);
   check(`R @${tag} the chosen card owns the strong frame`,pick.length===1&&/0px 0px 0px 4px inset/.test(pick[0].sh),pick[0]&&pick[0].sh);
   const nameVsRare=await p.evaluate(`(()=>{const c=document.querySelector('.p-final .npc-card');const r=parseFloat(getComputedStyle(c.querySelector('.rare-badge')).fontSize),h=parseFloat(getComputedStyle(c.querySelector('h3')).fontSize);return {r,h,over:document.documentElement.scrollWidth>innerWidth};})()`);
   check(`R @${tag} rarity text stays under the name, no overflow`,nameVsRare.r<nameVsRare.h&&!nameVsRare.over,JSON.stringify(nameVsRare));
   check(`S @${tag} 선택 1명 · 최대 3명, still no forecast`,u.count==='선택 1명 · 최대 3명'&&!u.forecasts&&!u.combat);
   await shot('2-select1');
   await audit('selection');

   // ---- A: 1-person, sub-3 confirm: 돌아가기 keeps selection, 이대로 확정 commits
   const before=await p.evaluate(acct);
   await p.click('.p-final .dock [data-action="final-commit"]');
   const modal=await p.evaluate(`(document.querySelector('#modal-root .modal')||{}).innerText||''`);
   check(`A @${tag} sub-3 confirm shows the approved copy`,modal.includes('3명보다 적은 인원으로 출전할까요?')&&modal.includes('선택한 1명만 마왕성으로 향합니다.')&&modal.includes('돌아가기')&&modal.includes('이대로 확정'),modal.replace(/\n/g,' | '));
   await p.mouse.move(1,1);await p.waitForTimeout(200);await p.screenshot({path:path.join(OUT,`prep-3-under-confirm-${tag}.png`)});
   const pair=await p.evaluate(PAIR);
   check(`PAIR @${tag} under-3 confirm: two footer actions of one geometry family (height/width/corner/bevel/type)`,pair&&pair.count===2&&pair.same,JSON.stringify(pair&&pair.shapes));
   check(`PAIR @${tag} no visible header 닫기; 돌아가기 is the one cancel owner`,pair&&!pair.headerClose.length&&pair.cancels===1,JSON.stringify(pair&&{header:pair.headerClose,labels:pair.labels}));
   await audit('under-3 confirm');
   await p.keyboard.press('Escape');await p.waitForTimeout(150);
   check(`PAIR @${tag} Escape still dismisses the sheet`,!(await p.evaluate(`!!document.querySelector('#modal-root .modal')`))&&!(await p.evaluate(acct)).committed);
   await p.click('.p-final .dock [data-action="final-commit"]');
   await p.click('#modal-root [data-action="dismiss"]');
   let a=await p.evaluate(acct);
   check(`A @${tag} 돌아가기 keeps the provisional selection`,!a.committed&&a.team.length===1&&(await p.evaluate(ui)).roster);
   await p.click('.p-final .dock [data-action="final-commit"]');await p.click('#modal-root [data-action="final-commit-go"]');
   a=await p.evaluate(acct);u=await p.evaluate(ui);
   check(`A @${tag} 이대로 확정 commits a 1-person party, no RNG / Gold / stock / Wallet moved`,a.committed&&a.team.length===1&&a.rng===before.rng&&a.gold===before.gold&&a.stock===before.stock&&JSON.stringify(a.packs)===JSON.stringify(before.packs));
   check(`FC @${tag} 1-person: exactly one 토벌 전망, no one-NPC readout`,u.forecasts===1&&['우세','접전','불리'].includes(u.forecast)&&!u.combat&&!u.death,u.forecast);
   check(`FC @${tag} 1-person label is the engine's`,await p.evaluate(`Guild24.game.finalForecast()`)===u.forecast);
   await p.reload({waitUntil:'load'});await p.waitForTimeout(250);
   check(`A @${tag} reload stays in preparation with the 1-person party`,(await p.evaluate(acct)).committed&&!(await p.evaluate(ui)).roster);

   // ---- B: 2-person
   await restore();
   for(const id of ids.slice(0,2))await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   await p.click('.p-final .dock [data-action="final-commit"]');
   const modal2=await p.evaluate(`(document.querySelector('#modal-root .modal')||{}).innerText||''`);
   await p.click('#modal-root [data-action="final-commit-go"]');
   a=await p.evaluate(acct);u=await p.evaluate(ui);
   check(`B @${tag} 2-person: confirm names 2, commits 2, one 토벌 전망`,modal2.includes('선택한 2명만')&&a.committed&&a.team.length===2&&u.forecasts===1,u.forecast);

   // ---- C: 3-person, no confirm
   await restore();
   for(const id of ids.slice(0,3))await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   await p.click('.p-final .dock [data-action="final-commit"]');
   a=await p.evaluate(acct);u=await p.evaluate(ui);
   check(`C @${tag} 3-person commits directly, no confirm`,a.committed&&a.team.length===3&&!(await p.evaluate(`!!document.querySelector('#modal-root .modal')`)));
   check(`C @${tag} 3-person: one 토벌 전망, roster gone, no one-NPC readout, no 'Final'`,u.forecasts===1&&!u.roster&&!u.combat&&!u.death&&!u.finalWord,u.forecast);
   check(`F @${tag} departure open with every Bag slot empty`,await p.evaluate(`!document.querySelector('.p-final .dock [data-action="boss"]').disabled`));
   await shot('4-prep');
   await audit('preparation');
   await p.evaluate(`document.querySelector('.p-final .final-order').open=true`);await audit('마지막 발주 open');
   await p.evaluate(`document.querySelector('.p-final .final-order').open=false`);

   // ---- D: the transfer that moves the forecast input most, exactly once
   const tgt=ids[0];
   await p.click(`.p-final [data-action="supply-target"][data-id="${tgt}"]`);
   const line=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,n=s.npcs.find(x=>x.id==='${tgt}'),base=g.finalPreRoll().power;let best=null;
    for(const st of s.inventory){if(${JSON.stringify(NOOP)}.includes(st.item)||g.finalPrice(st.item)>n.money)continue;
     const pw=g.finalPreRoll({[n.id]:[...n.pack,st.item]}).power;if(!best||pw>best.pw)best={id:st.id,item:st.item,pw};}
    return best&&{...best,base,price:g.finalPrice(best.item),half:Math.round(DATA.itemBy[best.item].sell*.5)};})()`);
   const foreBefore=(await p.evaluate(ui)).forecast;
   await p.click(`.p-final [data-action="select"][data-id="${line.id}"]`);
   const tillText=await p.evaluate(`(document.querySelector('.p-final .tillpanel')||{}).innerText||''`);
   check(`D @${tag} focused till carries no one-NPC forecast / death risk`,!tillText.includes('전투 전망')&&!tillText.includes('실패 시 사망 위험'));
   await focus();await p.screenshot({path:path.join(OUT,`prep-7a-transfer-before-${tag}.png`)});
   await audit('normal transfer');
   check(`N @${tag} a valid transfer: no status line, action face 50% / price / 보급, enabled`,await p.evaluate(`(()=>{const b=document.querySelector('.p-final .tillpanel [data-action="supply"]');return !b.disabled&&!document.querySelector('.p-final .tillpanel .final-status')&&/^50% \\d+G 보급$/.test(b.innerText.replace(/\\s+/g,' ').trim());})()`));
   const b=await p.evaluate(acct);
   await p.click('.p-final [data-action="supply"]');
   a=await p.evaluate(acct);
   const w0=b.packs[tgt].money,w1=a.packs[tgt].money;
   check(`D @${tag} fixed price is the 50% amount`,line.price===line.half,line.item+' '+line.price+'G');
   check(`D @${tag} one transfer: stock -1, Wallet -p, Gold +p, Gross Sales +p`,a.stock===b.stock-1&&w0-w1===line.price&&a.gold-b.gold===line.price&&a.gross-b.gross===line.price&&a.packs[tgt].pack.length===b.packs[tgt].pack.length+1,
    JSON.stringify({stock:[b.stock,a.stock],wallet:[w0,w1],gold:[b.gold,a.gold],gross:[b.gross,a.gross]}));
   check(`D @${tag} a valid affordable transfer drew no RNG`,a.rng===b.rng);
   u=await p.evaluate(ui);const foreEng=await p.evaluate(`(()=>{const t=Guild24.game.finalPreRoll();return {label:Guild24.game.finalForecast(),ratio:t.power/t.bossPower};})()`);
   check(`FC @${tag} forecast recomputed after the transfer (engine label shown)`,u.forecast===foreEng.label,`${foreBefore} -> ${u.forecast} · QA-only pre-roll power ${line.base.toFixed(1)} -> ${line.pw.toFixed(1)}, ratio ${foreEng.ratio.toFixed(3)}`);
   await shot('7b-transfer-after');

   // ---- lock
   const lockTry=await p.evaluate(`(()=>{try{Guild24.game.selectFinal('${tgt}');return 'changed';}catch(e){return 'refused: '+e.message;}})()`);
   check(`L @${tag} after a transfer the party cannot change`,(await p.evaluate(acct)).team.length===3&&lockTry.startsWith('refused'),lockTry);

   // ---- no-effect
   const noopId=await p.evaluate(`(Guild24.game.run.inventory.find(x=>${JSON.stringify(NOOP)}.includes(x.item))||{}).id`);
   const shelfNoop=await p.evaluate(`[...document.querySelectorAll('.p-final .good')].filter(x=>/구급키트|귀환석|세계수 생환부적/.test(x.textContent)).every(x=>x.textContent.includes('마왕성에서는 효과 없음'))`);
   check(`H @${tag} shelf marks no-effect Insurance 마왕성에서는 효과 없음`,shelfNoop);
   await p.click(`.p-final [data-action="select"][data-id="${noopId}"]`);
   let t=await p.evaluate(`(()=>{const b=document.querySelector('.p-final .tillpanel [data-action="supply"]');return {dis:!!b&&b.disabled,txt:(document.querySelector('.p-final .tillpanel')||{}).innerText||''};})()`);
   check(`H @${tag} till: approved reason, 보급 closed`,t.dis&&t.txt.includes('마왕성에서는 효과 없음')&&t.txt.includes('이번 원정에서는 효과를 발휘하지 않아 챙겨갈 수 없다.'),t.txt.replace(/\n/g,' | ').slice(0,140));
   const noopEng=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,n=s.npcs.find(x=>x.id==='${tgt}'),b=JSON.stringify([s.money,s.stats.revenue,s.inventory.length,n.money,n.pack]);let m='';
    for(const item of ${JSON.stringify(NOOP)}){const st=s.inventory.find(x=>x.item===item);if(!st)continue;try{g.supplyFinal(n.id,st.id);m+=item+':COMMITTED ';}catch(e){m+=item+':refused ';}}
    return {m,same:b===JSON.stringify([s.money,s.stats.revenue,s.inventory.length,n.money,n.pack])};})()`);
   check(`H @${tag} engine refuses all three, nothing moves`,!noopEng.m.includes('COMMITTED')&&noopEng.same,noopEng.m);
   await focus();await p.screenshot({path:path.join(OUT,`prep-5-noeffect-${tag}.png`)});
   await blocked('마왕성에서는 효과 없음');await audit('no-effect');
   await p.click(`.p-final [data-action="select"][data-id="${noopId}"]`);

   // ---- insufficient Wallet
   const poor=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run;for(const id of s.team){const n=s.npcs.find(x=>x.id===id);if(n.pack.length>=2)continue;
    const st=s.inventory.find(x=>!${JSON.stringify(NOOP)}.includes(x.item)&&g.finalPrice(x.item)>n.money);if(st)return {npc:id,id:st.id,price:g.finalPrice(st.item),have:n.money};}return null;})()`);
   if(poor){await p.click(`.p-final [data-action="supply-target"][data-id="${poor.npc}"]`);await p.click(`.p-final [data-action="select"][data-id="${poor.id}"]`);
    t=await p.evaluate(`(()=>{const b=document.querySelector('.p-final .tillpanel [data-action="supply"]');return {dis:!!b&&b.disabled,txt:(document.querySelector('.p-final .tillpanel')||{}).innerText||''};})()`);
    const exact=`소지금 부족 · ${poor.price}G 필요 / ${poor.have}G 보유`;
    check(`W @${tag} insufficient Wallet: exact inline status, 보급 closed, no modal`,t.dis&&t.txt.includes(exact)&&!(await p.evaluate(`!!document.querySelector('#modal-root .modal')`)),exact);
    await focus();await p.screenshot({path:path.join(OUT,`prep-6-wallet-${tag}.png`)});
    await blocked(exact);await audit('short Wallet');
    await p.click(`.p-final [data-action="select"][data-id="${poor.id}"]`);}
   else check(`W @${tag} an unaffordable line exists to show`,false);

   // ---- Bag full: fill the first member's second slot through the real control, then focus a line
   await p.click(`.p-final [data-action="supply-target"][data-id="${tgt}"]`);
   const fill=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,n=s.npcs.find(x=>x.id==='${tgt}');if(n.pack.length>=2)return null;
    const st=s.inventory.filter(x=>!${JSON.stringify(NOOP)}.includes(x.item)&&g.finalPrice(x.item)<=n.money).sort((a,b)=>g.finalPrice(a.item)-g.finalPrice(b.item))[0];return st&&st.id;})()`);
   if(fill){await p.click(`.p-final [data-action="select"][data-id="${fill}"]`);await p.click('.p-final [data-action="supply"]');}
   const any=await p.evaluate(`(Guild24.game.run.inventory.find(x=>!${JSON.stringify(NOOP)}.includes(x.item))||{}).id`);
   await p.click(`.p-final [data-action="select"][data-id="${any}"]`);
   await focus();await p.screenshot({path:path.join(OUT,`prep-10-bagfull-${tag}.png`)});
   await blocked('가방 가득');await audit('Bag full');
   await p.click(`.p-final [data-action="select"][data-id="${any}"]`);

   // ---- shelf summary == focused preview (Core-Stat rows) for the current target
   const cmp=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,out=[];const CORE={combat:'투력',survival:'강인함',mobility:'기동',spirit:'정신'};
    const n=s.npcs.find(x=>x.id===s.team[1]);const i=s.team.indexOf(n.id),a=g.finalPreRoll();
    for(const st of s.inventory){const it=DATA.itemBy[st.item];if(${JSON.stringify(NOOP)}.includes(st.item))continue;for(const k of Object.keys(CORE))if(k in it.effects){
     const b=g.finalPreRoll({[n.id]:[...n.pack,st.item]});out.push({id:st.id,item:st.item,k,label:CORE[k],d:Math.round((b.snapshots[i][k]-a.snapshots[i][k])*10)/10,
      before:Presentation.amount(k,a.snapshots[i][k]),after:Presentation.amount(k,b.snapshots[i][k])});}}return {npc:n.id,rows:out};})()`);
   await p.click(`.p-final [data-action="supply-target"][data-id="${cmp.npc}"]`);
   let agree=0,tot=0,bad='';
   for(const r of cmp.rows.slice(0,6)){tot++;
    const shelfTxt=await p.evaluate(id=>document.querySelector(`.p-final [data-action="select"][data-id="${id}"] .what`).innerText,r.id);
    await p.click(`.p-final [data-action="select"][data-id="${r.id}"]`);
    const till=await p.evaluate(`(document.querySelector('.p-final .tillpanel')||{}).innerText||''`);
    const want=r.label+' '+(r.d>0?'+':'')+r.d;
    const ok=shelfTxt.includes(want)&&(r.d===0||till.includes(r.before+' → '+r.after));
    if(ok)agree++;else bad+=`${r.item}:${want} shelf[${shelfTxt.replace(/\n/g,' ')}] `;
    await p.click(`.p-final [data-action="select"][data-id="${r.id}"]`);}
   check(`I @${tag} (${BOSS}) shelf Core-Stat == engine truth == focused before→after`,tot>0&&agree===tot,`${agree}/${tot} ${bad}`);
   if(BOSS==='GLUTTONY'){const r=cmp.rows.find(x=>x.item==='rice'&&x.k==='survival');if(r){await p.click(`.p-final [data-action="select"][data-id="${r.id}"]`);await focus();
    await p.screenshot({path:path.join(OUT,`prep-8-gluttony-${tag}.png`)});await p.click(`.p-final [data-action="select"][data-id="${r.id}"]`);note(`@${tag} GLUTTONY rice 강인함 on shelf`,(r.d>0?'+':'')+r.d);}}

   // ---- reload keeps everything, not back to selection
   const pre=await p.evaluate(acct);await p.reload({waitUntil:'load'});await p.waitForTimeout(300);
   const post=await p.evaluate(acct);
   check(`E @${tag} reload keeps party, transfer and accounting`,JSON.stringify(pre)===JSON.stringify(post));
   check(`E @${tag} reload stays in preparation`,post.committed&&!(await p.evaluate(ui)).roster);
   check(`J @${tag} D25 Families / Hazards unchanged`,post.threat===t0);

   // ---- one-time coach on the forecast
   /* from the top of the screen, as after 원정대 확정: the coach itself brings its target into view */
   await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=0`);
   await p.evaluate(`(()=>{const a=Guild24.game.account;a.tutorial={...a.tutorial,skipped:false};delete a.tutorial['coach-subjugation'];Guild24.game.save();Guild24.render();})()`);
   await p.mouse.move(1,1);await p.waitForTimeout(900);
   const coach=await p.evaluate(`(document.querySelector('#coach-root')||{}).innerText||''`);
   check(`K @${tag} first forecast: the coach explains it once`,coach.includes('확정된 원정대의 능력과 보급')&&coach.includes('보급이 바뀌면 전망도 함께 갱신된다.'),coach.replace(/\n/g,' ').slice(0,90));
   await p.screenshot({path:path.join(OUT,`prep-9-coach-${tag}.png`)});
   const btns=await p.evaluate(`[...document.querySelectorAll('#coach-root [data-action]')].map(b=>b.dataset.action)`);
   const next=btns.find(x=>x!=='coach-skip');if(next)await p.click(`#coach-root [data-action="${next}"]`);
   await p.evaluate(`Guild24.render()`);await p.waitForTimeout(600);
   check(`K @${tag} seen once, not repeated`,await p.evaluate(`!!(Guild24.game.account.tutorial||{})['coach-subjugation']&&!(document.querySelector('#coach-root')||{}).innerText`),btns.join(','));
   const tipTxt=await p.evaluate(`(()=>{const d=document.querySelector('.p-final .final-forecast .tip');if(!d)return '';d.open=true;return d.innerText;})()`);
   check(`K @${tag} the ? keeps the same explanation`,tipTxt.includes('확정된 원정대의 능력과 보급')&&tipTxt.includes('보급이 바뀌면 전망도 함께 갱신된다.'));
   await p.evaluate(`(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();})()`);

   // ---- Save/Load in the browser: pre-commit, and the two legacy shapes (no finalCommitted field)
   const load=async raw=>{await p.evaluate(([k,v])=>{Guild24.game.autosave=false;localStorage.setItem(k,v);},[KEY,raw]);await p.reload({waitUntil:'load'});await p.waitForTimeout(250);};
   await restore();await p.click(`.p-final [data-action="team"][data-id="${ids[0]}"]`);await p.click(`.p-final [data-action="team"][data-id="${ids[1]}"]`);
   const preRaw=await p.evaluate(k=>localStorage.getItem(k),KEY);
   await p.reload({waitUntil:'load'});await p.waitForTimeout(250);
   a=await p.evaluate(acct);
   check(`SL @${tag} pre-commit reload: still selection, picks kept, uncommitted`,!a.committed&&a.team.length===2&&(await p.evaluate(ui)).roster);
   const legacyPre=JSON.parse(preRaw);delete legacyPre.run.finalCommitted;
   await load(JSON.stringify(legacyPre));a=await p.evaluate(acct);
   check(`SL @${tag} legacy pre-transfer save stays in selection`,!a.committed&&(await p.evaluate(ui)).roster&&!(await p.evaluate(`'finalCommitted' in Guild24.game.run`)));
   await restore();for(const id of ids.slice(0,3))await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   await p.click('.p-final .dock [data-action="final-commit"]');
   await p.click(`.p-final [data-action="select"][data-id="qa-rice"]`);await p.click('.p-final [data-action="supply"]');
   const postRaw=JSON.parse(await p.evaluate(k=>localStorage.getItem(k),KEY));delete postRaw.run.finalCommitted;
   const legacyAcct=JSON.stringify([postRaw.run.money,postRaw.run.stats.revenue,postRaw.run.inventory.length,postRaw.run.npcs.map(n=>[n.money,n.pack,n.history.length])]);
   await load(JSON.stringify(postRaw));
   const back=await p.evaluate(`(()=>{const r=Guild24.game.run;return {c:r.finalCommitted,a:JSON.stringify([r.money,r.stats.revenue,r.inventory.length,r.npcs.map(n=>[n.money,n.pack,n.history.length])])};})()`);
   check(`SL @${tag} legacy post-transfer save restores preparation, nothing re-transacted`,back.c===true&&back.a===legacyAcct&&!(await p.evaluate(ui)).roster);
   await p.reload({waitUntil:'load'});await p.waitForTimeout(250);
   check(`SL @${tag} and a second reload is the same (idempotent)`,await p.evaluate(`(()=>{const r=Guild24.game.run;return JSON.stringify([r.money,r.stats.revenue,r.inventory.length,r.npcs.map(n=>[n.money,n.pack,n.history.length])]);})()`)===legacyAcct);

   // ---- X: a visible label change. Controlled setup (like qa-end-states "grown"): the three members'
   //      투력 is raised by one flat amount, chosen as the first at which the single best
   //      affordable transfer crosses the shared 0.8 line - the label then moves 불리 -> 접전
   //      through the real 보급 press, nothing about the Final is written.
   await restore();
   for(const id of ids.slice(0,3))await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   await p.click('.p-final .dock [data-action="final-commit"]');
   const x=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,team=s.team.map(id=>s.npcs.find(n=>n.id===id)),orig=team.map(n=>n.stats.combat),n=team[0];
    const best=()=>{let b=null;for(const st of s.inventory){if(${JSON.stringify(NOOP)}.includes(st.item)||g.finalPrice(st.item)>n.money)continue;
     const t=g.finalPreRoll({[n.id]:[...n.pack,st.item]}),r=t.power/t.bossPower;if(!b||r>b.r)b={id:st.id,item:st.item,r};}return b;};
    for(let k=0;k<2000;k++){team.forEach((m,i)=>m.stats.combat=orig[i]+k);const t=g.finalPreRoll(),r=t.power/t.bossPower,b=best();
     if(r<0.8&&b&&b.r>=0.8){g.save();Guild24.render();return {k,r,after:b.r,id:b.id,item:b.item,npc:n.id};}}
    team.forEach((m,i)=>m.stats.combat=orig[i]);return null;})()`);
   if(x){await p.click(`.p-final [data-action="supply-target"][data-id="${x.npc}"]`);
    const l0=(await p.evaluate(ui)).forecast;await shot('7c-cross-before');
    await p.click(`.p-final [data-action="select"][data-id="${x.id}"]`);await p.click('.p-final [data-action="supply"]');
    const l1=(await p.evaluate(ui)).forecast;await shot('7d-cross-after');
    check(`X @${tag} a real transfer moves the shown 토벌 전망`,l0==='불리'&&l1==='접전',`${l0} -> ${l1} (QA-only: 투력 +${x.k} each, ratio ${x.r.toFixed(3)} -> ${x.after.toFixed(3)}, ${x.item})`);}
   else check(`X @${tag} a crossing setup was found`,false);
   for(const [label,w] of risks)note(`wrap-risk @${tag} content control`,`${label} -> ${w}`);
   await ctx.close();
  }
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?failed+' FINAL prep check(s) FAILED':'all '+results.length+' FINAL prep checks passed');
 process.exit(failed?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
