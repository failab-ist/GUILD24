// Narrow D30 coach flow, account persistence and stage-specific skip; no expedition simulation.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const out=path.resolve(process.argv[2]||'reports/ui/final-coach'),port=5312;
let checks=0;const check=(ok,message)=>{assert.ok(ok,message);checks++;};
const ids=['final-intro','final-order','final-no-effect','final-roster','final-commit','final-environment','subjugation'];
async function fixture(p,reset=true){await p.evaluate(reset=>{
 const g=Guild24.game;g.autosave=false;g.start('final-coach');g.buyRelic(g.run.relicWindow.candidateIds[0]);
 if(reset)g.account.tutorial={'coach-relic-what':true};g.account.tutorial.skipped=false;
 Guild24.render(); // render the new Run before the controlled D30 entry, clearing the previous Run's local selection UI
 const s=g.run;s.npcs.forEach((n,i)=>{n.alive=true;n.introduced=i<3;n.recovery=0;n.injury=i===1?1:0;n.fatigue=i===1?15:0;n.pack=[];n.money=300;});
 s.day=30;g.morning();Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});s.bossReveal.familySeen=true;
 g.autosave=true;g.save();Guild24.render();
},reset);}
async function mark(p,key,width){
 const want=await p.evaluate(key=>key==='forecast'?Copy.finalPrep.coach.preparation:Copy.finalPrep.coach[key],key);
 await p.waitForFunction(want=>document.querySelector('.coach-bubble p')?.textContent.replace(/\s+/g,' ').trim()===want,want);
 check(await p.locator('.coach-bubble').count()===1,key+' coach is reachable');
 check(await p.evaluate(()=>{const b=document.querySelector('.coach-bubble').getBoundingClientRect();return b.left>=0&&b.right<=innerWidth+1&&b.top>=0&&b.bottom<=innerHeight+1;}),key+' bubble fits viewport');
 if(key==='forecast')check(await p.locator('.coach-bubble p').evaluate(e=>{const s=getComputedStyle(e);return s.fontSize==='14px'&&s.fontWeight==='400';}),'preparation coach uses existing 14px body typography');
 await p.screenshot({path:path.join(out,`${key}-${width}.png`)});
 await p.locator('[data-action="coach-next"]').click();
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview timeout')),8000);server.on('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
 let browser;try{
  browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||chromium.executablePath()});
  for(const width of [390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:width<1024?780:880},isMobile:width<1024,hasTouch:width<1024,locale:'ko-KR',reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto(`http://127.0.0.1:${port}`);await ready(p);await fixture(p);
   await mark(p,'intro',width);await p.locator('.relic-takeover [data-action="dismiss"]').click();
   await mark(p,'order',width);await mark(p,'noEffect',width);
   check(await p.evaluate(()=>Guild24.game.run.offers.every(o=>!Guild24.game.finalNoEffect(o.item))),'no-effect Items absent from actual last order');
   await p.locator('[data-action="final-ordered"]').click();await mark(p,'roster',width);await mark(p,'commit',width);
   await p.locator('.final-roster .npc-card').first().click();
   check(await p.locator('#modal-root').innerText().then(t=>t.includes('소지금')&&t.includes('피로')),'highlighted candidate opens notebook with Wallet and Fatigue');
   await p.locator('#modal-root [data-action="final-team"]').click();
   await p.evaluate(()=>{const g=Guild24.game;g.finalEligible().slice(0,3).filter(n=>!g.run.team.includes(n.id)).forEach(n=>g.selectFinal(n.id));Guild24.render();});
   await p.locator('[data-action="final-commit"]').click();await mark(p,'environment',width);await mark(p,'forecast',width);
   const help=p.locator('.final-forecast .tip summary');if(width<1024)await help.tap();else await help.hover();
   check(await p.locator('.final-forecast .tip').evaluate(e=>e.open),'forecast Help still opens through its existing question mark');
   check(await p.locator('.final-forecast .tip p span').allTextContents().then(async lines=>JSON.stringify(lines)===JSON.stringify(await p.evaluate(()=>Copy.finalPrep.forecastWhy))),'forecast Help preserves the detailed explanation');
   await p.keyboard.press('Escape');
   check(await p.evaluate(ids=>ids.every(id=>Guild24.game.account.tutorial['coach-'+id]),ids),'completed stage flags use existing account tutorial');
   await p.reload();await ready(p);await p.waitForTimeout(150);
   check(await p.locator('.coach-bubble').count()===0,'completed preparation coach does not repeat after reload');
   check(await p.evaluate(ids=>ids.every(id=>Guild24.game.account.tutorial['coach-'+id]),ids),'seen flags survive actual save/load');
   await fixture(p,false);await p.waitForTimeout(150);
   check(await p.locator('.coach-bubble').count()===0,'completed support coach does not repeat in a new Run');
   await p.locator('.relic-takeover [data-action="dismiss"]').click();await p.waitForTimeout(150);
   check(await p.locator('.final-order').count()===1,'new Run returns to last order rather than the previous selection UI');
   check(await p.locator('.coach-bubble').count()===0,'completed last-order coach does not repeat in a new Run');
   await fixture(p);await p.locator('[data-action="coach-skip"]').click();
   check(await p.evaluate(()=>Guild24.game.account.tutorial['coach-final-intro']&&!Guild24.game.account.tutorial['coach-final-order']),'support skip does not consume last-order group');
   await p.locator('.relic-takeover [data-action="dismiss"]').click();await p.locator('[data-action="coach-skip"]').click();
   check(await p.evaluate(()=>{const t=Guild24.game.account.tutorial;return t['coach-final-order']&&t['coach-final-no-effect']&&!t['coach-final-roster'];}),'last-order skip does not consume roster group');
   await p.locator('[data-action="final-ordered"]').click();await p.locator('[data-action="coach-skip"]').click();
   check(await p.evaluate(()=>{const t=Guild24.game.account.tutorial;return t['coach-final-roster']&&t['coach-final-commit']&&!t['coach-final-environment']&&!t['coach-subjugation'];}),'roster skip does not consume preparation group');
   await p.locator('[data-action="menu"]').click();await p.locator('[data-action="settings"]').click();await p.locator('[data-action="coach-toggle"]').click();
   check(await p.evaluate(()=>Guild24.game.account.tutorial.skipped===true),'settings turns existing tutorial off');
   await p.locator('#modal-root [data-action="dismiss"]').first().click();await p.waitForTimeout(150);check(await p.locator('.coach-bubble').count()===0,'skipped tutorial suppresses coaches');
   await p.locator('[data-action="menu"]').click();await p.locator('[data-action="settings"]').click();await p.locator('[data-action="coach-toggle"]').click();
   check(await p.evaluate(()=>{const t=Guild24.game.account.tutorial;return !t.skipped&&!Object.keys(t).some(k=>k.startsWith('coach-'));}),'reenable clears existing account coach flags');
   await p.locator('#modal-root [data-action="dismiss"]').first().click();await p.waitForFunction(()=>!!document.querySelector('.coach-bubble'));
   check((await p.locator('.coach-bubble p').textContent()).includes('피로·부상'),'reenable shows current-stage roster coach again');
   check(!errors.length,'no affected runtime errors');await ctx.close();
  }
 }finally{if(browser)await browser.close();server.kill();}
 console.log(`PASS Final coach: ${checks} checks; ${out}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
