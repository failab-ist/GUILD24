// D30 FINAL party selection / preparation evidence (PRESENTATION_POLISH_BATCH5 §B5-2,
// FINAL_EXPEDITION §D30 PLAYER FLOW / FINAL ACCOUNTING / Final-specific Item boundary).
// Dev-only. Real path to D5 with the qa-visual policy, qa-visual's controlled D30 setup, then
// every step is a real control press: pick members, 원정대 확정 (when the build has it), focus a
// member, pick a stock line, 보급. It captures each state and checks the rules:
//   - team add / remove before the party is committed
//   - team change refused after a Final transfer (party lock)
//   - one transfer moves stock -1, Wallet -p, Gold +p, Gross Sales +p exactly once, p = 50%
//   - reload keeps the lock, the transfer and the accounting
//   - an unaffordable line and a Final-no-effect line cannot be committed
//   node tools/qa-final-prep.cjs <out-dir> [widths] [BOSS]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=path.resolve(__dirname,'..',process.argv[2]||'reports/ui/final-prep');
const WIDTHS=(process.argv[3]||'390,1280').split(',').map(Number);
const BOSS=process.argv[4]||'WRATH';
const PORT=Number(process.env.QA_PORT||5191),FIXED_NOW=1790112000000;
const EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
const note=(name,detail)=>console.log('NOTE '+name+(detail?' - '+detail:''));
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
const acct=`(()=>{const s=Guild24.game.run;return {gold:s.money,gross:s.stats.revenue,daily:s.daily.revenue,stock:s.inventory.length,
 team:[...s.team],committed:!!s.finalCommitted,rng:Guild24.game.rng.state,threat:JSON.stringify([s.dungeons[0].families,s.dungeons[0].hazards]),packs:Object.fromEntries(s.team.map(id=>{const n=s.npcs.find(x=>x.id===id);return [id,{pack:[...n.pack],money:n.money}]}))};})()`;
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
    /* the controlled setup gives the store the stock a real D30 would carry into the Final:
       one of every line the catalog sells, including the three Final-no-effect Insurance
       lines, so the boundary is exercised; nothing about the Final itself is written */
    for(const it of DATA.items.filter(x=>x.sell>0).slice(0,40))s.inventory.push({id:'qa-'+it.id,item:it.id,cost:Math.round(it.sell*.5),expires:null});
    g.save();Guild24.render();})()`);
   await p.mouse.move(1,1);await p.waitForTimeout(300);
   const shot=async n=>{await p.mouse.move(1,1);await p.waitForTimeout(250);await p.evaluate(`document.querySelector('.stage-scroll').scrollTop=0`);
    await p.screenshot({path:path.join(OUT,`prep-${n}-${tag}.png`)});
    /* the part below the approved hero, where selection / preparation live */
    await p.evaluate(`(()=>{const t=document.querySelector('.party-head')||document.querySelector('.final-team');if(t)t.scrollIntoView({block:'start'});})()`);
    await p.waitForTimeout(150);await p.screenshot({path:path.join(OUT,`prep-${n}-${tag}-below.png`)});};
   const need=await p.evaluate(`Guild24.game.finalRequired()`);
   const t0=(await p.evaluate(acct)).threat;
   await shot('1-team0');
   const ids=await p.evaluate(`Guild24.game.finalEligible().slice(0,${need}).map(n=>n.id)`);
   // A: add / remove before commit
   await p.click(`.p-final [data-action="team"][data-id="${ids[0]}"]`);
   await p.click(`.p-final [data-action="team"][data-id="${ids[0]}"]`);
   check(`A @${tag} a member can be removed before the party is committed`,(await p.evaluate(acct)).team.length===0);
   for(const id of ids)await p.click(`.p-final [data-action="team"][data-id="${id}"]`);
   check(`A @${tag} the party fills to ${need}`,(await p.evaluate(acct)).team.length===need);
   await shot('2-full');
   const hasCommit=await p.evaluate(`!!document.querySelector('.p-final [data-action="final-commit"]')`);
   note(`@${tag} build has an explicit 원정대 확정`,String(hasCommit));
   if(hasCommit){const before=await p.evaluate(acct);
    await p.click('.p-final [data-action="final-commit"]');
    const after=await p.evaluate(acct);
    check(`B @${tag} 원정대 확정 commits the party and moves no RNG / Gold / stock / Wallet`,after.committed&&after.rng===before.rng&&after.gold===before.gold&&after.stock===before.stock&&after.gross===before.gross&&JSON.stringify(after.packs)===JSON.stringify(before.packs));
    check(`F @${tag} departure is open with every Bag slot still empty`,await p.evaluate(`!document.querySelector('.p-final .dock [data-action="boss"]').disabled`));
    check(`B @${tag} the full roster is gone once the party is committed`,await p.evaluate(`!document.querySelector('.p-final [data-action="team"]')`));
    await shot('3-prep');}
   // D: one transfer, exactly once
   await p.click(`.p-final [data-action="supply-target"][data-id="${ids[0]}"]`).catch(()=>{});
   const line=await p.evaluate(`(()=>{const s=Guild24.game.run,n=s.npcs.find(x=>x.id==='${ids[0]}'),g=Guild24.game;
    const st=s.inventory.find(x=>!['kit','stone','tree'].includes(x.item)&&g.finalPrice(x.item)<=n.money);return st&&{id:st.id,item:st.item,price:g.finalPrice(st.item),half:Math.round(DATA.itemBy[st.item].sell*.5)};})()`);
   const b=await p.evaluate(acct);
   await p.click(`.p-final [data-action="select"][data-id="${line.id}"]`);
   await p.click('.p-final [data-action="supply"]');
   const a=await p.evaluate(acct),w0=b.packs[ids[0]].money,w1=a.packs[ids[0]].money;
   check(`D @${tag} Final price is the 50% amount`,line.price===line.half,line.item+' '+line.price+'G');
   check(`D @${tag} one transfer: stock -1, Wallet -p, Gold +p, Gross Sales +p`,a.stock===b.stock-1&&w0-w1===line.price&&a.gold-b.gold===line.price&&a.gross-b.gross===line.price&&a.packs[ids[0]].pack.length===b.packs[ids[0]].pack.length+1,
    JSON.stringify({stock:[b.stock,a.stock],wallet:[w0,w1],gold:[b.gold,a.gold],gross:[b.gross,a.gross]}));
   await shot('4-transfer1');
   // C: after a transfer, can the team still change?
   const lockTry=await p.evaluate(`(()=>{try{Guild24.game.selectFinal('${ids[0]}');return 'changed';}catch(e){return 'refused: '+e.message;}})()`);
   const t2=await p.evaluate(acct);
   check(`C @${tag} after a Final transfer the party can no longer change`,t2.team.length===need&&t2.team.includes(ids[0]),lockTry);
   if(t2.team.length!==need){note('BUG REPRO','removed a supplied member: team '+JSON.stringify(t2.team)+', their pack still '+JSON.stringify(t2.packs[ids[0]]?.pack||'(not in team)'));
    await p.evaluate(`Guild24.render()`);await shot('bug-after-remove');
    await p.evaluate(`Guild24.game.selectFinal('${ids[0]}')`);}
   // G / H: blocked lines
   const blockKinds=await p.evaluate(`(()=>{const s=Guild24.game.run,g=Guild24.game,n=s.npcs.find(x=>x.id==='${ids[0]}');
    const poor=s.inventory.find(x=>!['kit','stone','tree'].includes(x.item)&&g.finalPrice(x.item)>n.money),noop=s.inventory.find(x=>['kit','stone','tree'].includes(x.item));
    const tryIt=st=>{if(!st)return 'n/a';const was=n.pack.length;try{g.supplyFinal(n.id,st.id);}catch(e){return 'refused: '+e.message;}return n.pack.length>was?'COMMITTED':'no-op';};
    return {poor:poor?tryIt(poor):'n/a (none unaffordable)',noop:tryIt(noop),noopItem:noop&&noop.item};})()`);
   check(`G @${tag} an unaffordable line cannot be committed`,blockKinds.poor.startsWith('refused')||blockKinds.poor.startsWith('n/a'),blockKinds.poor);
   check(`H @${tag} a Final-no-effect line cannot be committed`,blockKinds.noop.startsWith('refused'),blockKinds.noopItem+': '+blockKinds.noop);
   const noopUi=await p.evaluate(`(()=>{const b=[...document.querySelectorAll('.p-final .good')].find(x=>/구급키트|귀환석|세계수 생환부적/.test(x.textContent));return b?b.textContent.includes('Final 효과 없음'):null;})()`);
   check(`H @${tag} the shelf says why (Final 효과 없음)`,noopUi===true,String(noopUi));
   // H: the reason is on the till too, and its commit button is closed
   const noopId=await p.evaluate(`(Guild24.game.run.inventory.find(x=>['kit','stone','tree'].includes(x.item))||{}).id`);
   if(noopId){await p.click(`.p-final [data-action="select"][data-id="${noopId}"]`);
    const t=await p.evaluate(`(()=>{const b=document.querySelector('.p-final .tillpanel [data-action="supply"]');return {dis:!!b&&b.disabled,txt:(document.querySelector('.p-final .tillpanel')||{}).innerText||''};})()`);
    check(`H @${tag} the till names the reason and its 보급 is disabled`,t.dis&&t.txt.includes('Final 효과 없음'),t.txt.split('\n').slice(0,3).join(' | '));
    await p.evaluate(`document.querySelector('.p-final .good.open').scrollIntoView({block:'start'})`);await p.mouse.move(1,1);await p.waitForTimeout(200);
    await p.screenshot({path:path.join(OUT,`prep-6-noop-${tag}.png`)});
    await p.click(`.p-final [data-action="select"][data-id="${noopId}"]`);}
   // I: GLUTTONY - the till preview is the Final truth (positive Item core stats x0.5, the rest unchanged)
   if(BOSS==='GLUTTONY'){
    const pv=await p.evaluate(`(()=>{const g=Guild24.game,s=g.run,d=s.dungeons[0],n=s.npcs.find(x=>x.id==='${ids[1]||ids[0]}');
     const core=['combat','survival','mobility','spirit'];
     for(const st of s.inventory){if(['kit','stone','tree'].includes(st.item))continue;
      const raw=Presentation.preview(n,d,s.facilities,st.item),fin=Presentation.preview(n,d,s.facilities,st.item,prep=>g.finalSnapshot(n,prep,d,null));
      const r=raw.direct.find(x=>core.includes(x.key)&&x.after>x.before);if(!r)continue;
      const f=fin.direct.find(x=>x.key===r.key);
      const other=raw.direct.filter(x=>!core.includes(x.key)).every(x=>{const y=fin.direct.find(z=>z.key===x.key);return y&&Math.abs((y.after-y.before)-(x.after-x.before))<1e-9;});
      return {id:st.id,item:st.item,key:r.key,rawGain:r.after-r.before,finGain:f?f.after-f.before:0,finAfter:Presentation.amount(r.key,f.after),other,npc:n.id};}
     return null;})()`);
    check('I GLUTTONY preview: a positive Item core stat shows at 50%',pv&&Math.abs(pv.finGain-pv.rawGain*0.5)<1e-6,JSON.stringify(pv));
    check('I GLUTTONY preview: non-core rows are unchanged',pv&&pv.other);
    if(pv){await p.click(`.p-final [data-action="supply-target"][data-id="${pv.npc}"]`);await p.click(`.p-final [data-action="select"][data-id="${pv.id}"]`);
     const txt=await p.evaluate(`(document.querySelector('.p-final .tillpanel')||{}).innerText||''`);
     check(`I @${tag} the till shows the GLUTTONY-adjusted value and the Boss reason`,txt.includes(pv.finAfter)&&txt.includes('탐식의 권능'),pv.finAfter);
     await p.evaluate(`document.querySelector('.p-final .good.open').scrollIntoView({block:'start'})`);await p.mouse.move(1,1);await p.waitForTimeout(200);
     await p.screenshot({path:path.join(OUT,`prep-7-gluttony-${tag}.png`)});
     await p.click(`.p-final [data-action="select"][data-id="${pv.id}"]`);}}
   // E: reload
   const pre=await p.evaluate(acct);await p.reload({waitUntil:'load'});await p.waitForTimeout(300);
   const post=await p.evaluate(acct);
   check(`E @${tag} reload keeps the party, the transfer and the accounting`,JSON.stringify(pre)===JSON.stringify(post));
   if(hasCommit)check(`E @${tag} reload stays in preparation (no roster to reselect)`,post.committed&&await p.evaluate(`!document.querySelector('.p-final [data-action="team"]')`));
   // fill the first member's second slot for the finished-member capture
   await p.click(`.p-final [data-action="supply-target"][data-id="${ids[0]}"]`).catch(()=>{});
   const line2=await p.evaluate(`(()=>{const s=Guild24.game.run,n=s.npcs.find(x=>x.id==='${ids[0]}'),g=Guild24.game;if(n.pack.length>=Adventurer.slots(n))return null;const st=s.inventory.find(x=>!['kit','stone','tree'].includes(x.item)&&g.finalPrice(x.item)<=n.money);return st&&st.id;})()`);
   if(line2){await p.click(`.p-final [data-action="select"][data-id="${line2}"]`);await p.click('.p-final [data-action="supply"]');}
   await shot('5-member-done');
   // J: the D25 Family / Hazard state is untouched by selection, confirmation, transfers and reload
   check(`J @${tag} D25 Families / Hazards unchanged`,(await p.evaluate(acct)).threat===t0);
   await ctx.close();
  }
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?failed+' FINAL prep check(s) FAILED':'all '+results.length+' FINAL prep checks passed');
 process.exit(0);
})().catch(e=>{console.error(e);process.exit(1);});
