const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const out=path.resolve(process.argv[2]||'reports/ui/gate-coverage'),before=process.argv.includes('--before'),port=5316;
let checks=0;function check(ok,msg){if(!before){assert.ok(ok,msg);checks++;}}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview timeout')),8000);server.on('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});let browser;
 try{browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const width of [390,1280])for(const empty of [false,true]){
 const context=await browser.newContext({viewport:{width,height:width===390?780:880},locale:'ko-KR',reducedMotion:'reduce'}),p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(before)for(const file of ['data/catalog.js','systems/shop.js','ui/app.js'])await p.route('**/'+file,r=>r.fulfill({body:execFileSync('git',['show','a988d4a1:dist/'+file],{encoding:'utf8'}),contentType:'text/javascript'}));
 await p.goto('http://127.0.0.1:'+port);await ready(p);
 await p.evaluate(empty=>{const g=Guild24.game;g.autosave=false;g.start('coverage-screen');g.account.tutorial.skipped=true;g.buyRelic(g.run.relicWindow.candidateIds[0]);const s=g.run;s.firstRun=false;s.npcs=s.npcs.slice(0,empty?3:1);s.npcs.forEach(n=>{n.alive=true;n.traits=[];n.introduced=true;n.injury=empty?2:0;n.recovery=empty?3:0;n.status=empty?'중상':'건강';});s.day=8;s.money=5000;s.deep.days=s.deep.days.filter(d=>d!==8);g.rollEvent=()=>empty?null:DATA.events.find(e=>e.id==='unknown');g.morning();s.eventSeen=true;Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});s.relicWindow.focusedRevealSeen=true;Guild24.render();},empty);
 if(await p.locator('#modal-root [data-action="dismiss"]').count())await p.locator('#modal-root [data-action="dismiss"]').first().click();
 const stem=(empty?'empty':'event')+'-'+width;
 check(await p.evaluate(empty=>Guild24.game.run.dungeons.length===(empty?0:1),empty),'only coverable Gates remain');
 if(!empty){check(await p.evaluate(()=>Guild24.game.run.dungeons[0].temporary),'Event Gate survives');check(await p.evaluate(()=>{const s=Guild24.game.run;return s.queue.every(id=>s.npcs.find(n=>n.id===id).claimedDestination===0);}), 'expected visitor reaches Event Gate');}
 await p.screenshot({path:path.join(out,stem+'-morning.png')});
 await p.locator('[data-action="begin-order"]').click();await p.screenshot({path:path.join(out,stem+'-order.png')});
 if(empty){await p.evaluate(()=>{const g=Guild24.game;g.run.cart={0:1};g.confirmOrder();Guild24.render();});await p.locator('[data-action="open-store"]').click();
 if(before&&await p.evaluate(()=>Guild24.game.run.phase==='night')){await p.screenshot({path:path.join(out,stem+'-night.png')});await p.locator('[data-action="closing"]').click();}
 check(await p.evaluate(()=>Guild24.game.run.phase==='closing'),'Order opens directly into Closing');
 check((await p.locator('.print').innerText()).includes('모두 중상이라 방문할 손님이 없어서 영업을 못했다.'),'receipt explains why trading did not happen');
 check(await p.evaluate(()=>Guild24.game.run.daily.spent>0&&Guild24.game.run.daily.operating>0),'Order payment and ordinary operating costs settle');
 await p.screenshot({path:path.join(out,stem+'-closing.png')});
 await p.evaluate(()=>{const g=Guild24.game;g.save();const parsed=Save.import(Save.export(g.account,g.run));window.__qaRestored=parsed.run;});
 check(await p.evaluate(()=>__qaRestored.phase==='closing'&&__qaRestored.daily.recoveryOnly),'Closing reason survives save/load');}
 check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');check(!errors.length,'no browser runtime errors: '+errors.join(';'));await context.close();}
 console.log(JSON.stringify({before,checks,output:out}));
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
