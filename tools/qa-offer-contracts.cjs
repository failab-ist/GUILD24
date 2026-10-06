const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const out=path.resolve(process.argv[2]||'reports/ui/offer-contracts'),before=process.argv.includes('--before'),port=5317;let checks=0;
function check(ok,msg){if(!before){assert.ok(ok,msg);checks++;}}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});let b;
try{b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [360,390,1280]){const c=await b.newContext({viewport:{width,height:width<1024?780:880},locale:'ko-KR',reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
if(before)for(const file of ['data/relics.js','systems/relics.js','systems/shop.js','ui/app.js','ui/ui.css'])await p.route('**/'+file,r=>r.fulfill({body:execFileSync('git',['show','ece4a6c4:dist/'+file],{encoding:'utf8'}),contentType:file.endsWith('css')?'text/css':'text/javascript'}));
await p.goto('http://127.0.0.1:'+port);await ready(p);
await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('contract-ui');g.account.tutorial.skipped=true;g.buyRelic(g.run.relicWindow.candidateIds[0]);const s=g.run;s.day=10;s.firstRun=false;s.phase='order';s.facilities=['dawnRecovery'];s.event=null;s.money=2000;g.generateOffers();s.relicWindow={milestoneDay:10,expiryDay:15,candidateIds:['coldcase'],candidatePrices:[180],purchased:null,focusedRevealSeen:true,slothSealOpportunity:false};Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});Guild24.render();window.__contractOld=JSON.stringify(s.offers);});
await p.locator('[data-action="qty"][data-index="0"][data-q="1"]').first().click();
await p.locator('[data-action="menu"]').click();await p.locator('[data-action="relics"]').click();await p.screenshot({path:path.join(out,'contract-card-'+width+'.png')});
await p.locator('[data-action="buy-relic"][data-id="coldcase"]').click();
check(await p.evaluate(()=>Guild24.game.run.offers.length===8),'acquisition adds slot today');
check(await p.evaluate(()=>JSON.stringify(Guild24.game.run.offers.slice(0,7))===__contractOld),'existing sheet is retained');
check(await p.evaluate(()=>Guild24.game.run.cart[0]===1),'cart retained after buying support');
check(await p.locator('.offer-source').count()===2,'both contracts have source labels');
check(await p.evaluate(()=>[...document.querySelectorAll('.offer-source')].every(e=>{const tags=e.parentElement.querySelector('.tag-art');return e.getBoundingClientRect().bottom<=tags.getBoundingClientRect().top+1&&parseFloat(getComputedStyle(e).fontSize)===13;})),'source labels are above purchase tags at guide size');
const count=await p.locator('.line[data-offer]').count();await p.locator('[data-offer="'+(count-2)+'"]').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'added-rows-'+width+'.png')});
await p.evaluate(()=>{const g=Guild24.game;g.run.cart={};Guild24.render();});await p.locator('[data-action="reroll"]').click();
check(await p.evaluate(()=>{const s=Guild24.game.run;return s.offers.length===8&&s.offers.filter(o=>o.origin==='dawnRecovery').length===1&&s.offers.filter(o=>o.origin==='coldcase').length===1;}),'Reroll keeps both independent slots');
check(await p.evaluate(()=>{const g=Guild24.game;const s=Save.import(Save.export(g.account,g.run)).run;return s.offers.length===8&&s.offers.at(-1).origin==='coldcase';}),'category provenance persists');
check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');check(!errors.length,'runtime errors: '+errors.join(';'));await c.close();}
console.log(JSON.stringify({before,checks,output:out}));}finally{await b?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});
