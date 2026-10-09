// Event copy and ORDER cap: controlled UI states, native clicks, no expedition resolution or balance measurement.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn,execFileSync}=require('node:child_process');
const {chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-event-text-audit')),after=process.argv.includes('--after'),port=5292,checks=[],evidence=[];
const check=(name,ok)=>{assert.ok(ok,name);checks.push(name);};
const norm=s=>s.replace(/\s+/g,' ').trim();
const shot=(p,name)=>p.screenshot({path:path.join(out,'batch8-'+(after?'after':'before')+'-'+name+'.png')});
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;try{
 await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 for(const width of [390,1280]){const c=await browser.newContext({viewport:{width,height:880},isMobile:width<1024,hasTouch:width<1024,reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(!after)for(const file of ['data/catalog.js','systems/shop.js','ui/presentation.js','ui/app.js']){const body=execFileSync('git',['show','93251c8f:dist/'+file],{cwd:root,encoding:'utf8'});await p.route('**/'+file,r=>r.fulfill({body,contentType:'text/javascript'}));}
 await p.goto('http://127.0.0.1:'+port);await ready(p);
 await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-event-text-audit');g.deferFoundationRelic();g.account.tutorial.skipped=true;g.account.settings.coach=false;const s=g.run;s.day=6;s.phase='morning';s.relicWindow=null;for(const k in s.bossReveal)s.bossReveal[k]=true;s.eventSeen=true;});
 const ids=await p.evaluate(()=>DATA.events.map(e=>e.id));
 for(const id of ids){const expected=await p.evaluate(id=>{const s=Guild24.game.run,e=DATA.events.find(e=>e.id===id);s.event=JSON.parse(JSON.stringify(e));s.eventSeen=true;Guild24.render();return e.description;},id);
 check(width+' '+id+' 게시판 효과',norm(await p.locator('.slip.event .effect > span').innerText())===expected);await p.locator('[data-action="event-again"]').click();
 check(width+' '+id+' 상세 효과',norm(await p.locator('.event-reveal .effect > span').innerText())===expected);check(width+' '+id+' 효과 글자 가로 잘림 없음',await p.evaluate(()=>[document.documentElement,document.querySelector('.event-reveal .effect > span')].every(el=>el.scrollWidth<=el.clientWidth+1)));
 if(['royal','ordercap','fridgebreak','clinic','nightshift'].includes(id))await shot(p,id+'-'+width);
 await p.locator('[data-action="event-seen"]').click();check(width+' '+id+' 닫고 게시판 복귀',await p.locator('#modal-root .event-reveal').count()===0);
 }
 await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.event={...JSON.parse(JSON.stringify(DATA.events.find(e=>e.id==='clinic'))),description:'예전 저장 설명',effects:{medicalDemand:.35}};s.eventSeen=true;Guild24.render();});
 const old=await p.locator('.slip.event .effect > span').innerText();evidence.push({width,oldSavedEvent:old});if(after)check(width+' 이전 저장 실제 효과로 설명 갱신',old==='오늘 손님의 보험 상품 구매 의사 +35%p');
 await p.evaluate(()=>{Guild24.game.autosave=true;Guild24.game.save();});await p.reload();await ready(p);if(after)check(width+' 이전 저장 새로고침 유지',await p.locator('.slip.event .effect > span').innerText()==='오늘 손님의 보험 상품 구매 의사 +35%p');
 await p.evaluate(()=>{const g=Guild24.game,s=g.run;g.autosave=false;s.phase='order';s.facilities=[];s.dayFacilities=[];s.inventory=[];s.cart={};s.money=10000;s.previousSales=0;s.event=JSON.parse(JSON.stringify(DATA.events.find(e=>e.id==='ordercap')));s.eventSeen=true;s.offers=[g.offerFor(DATA.itemBy.rice),g.offerFor(DATA.itemBy.rice)];Guild24.render();});
 if(after){await p.evaluate(()=>{const g=Guild24.game;g.run.offers.forEach(o=>o.quantity=4);g.autosave=true;g.save();});await p.reload();await ready(p);check(width+' 이전 저장 공급도 칸당2개',await p.evaluate(()=>Guild24.game.run.offers.every(o=>o.quantity===2)));}
 const supply=await p.evaluate(()=>Guild24.game.run.offers.map(o=>o.quantity));evidence.push({width,supply});if(after)check(width+' 각 칸 공급 최대2',supply.every(q=>q===2));
 for(let k=0;k<2;k++)await p.locator('[data-action="qty"][data-index="0"]').filter({hasText:'+'}).click();
 const other=await p.evaluate(()=>Guild24.game.quantityLimit(1));evidence.push({width,secondSlot:other});if(after){check(width+' 동일 상품 다른 칸도2개 가능',other.max===2);for(let k=0;k<2;k++)await p.locator('[data-action="qty"][data-index="1"]').filter({hasText:'+'}).click();
 await p.locator('[data-action="qty"][data-index="0"]').filter({hasText:'+'}).click({force:true});check(width+' 최대수량 버튼 이유',(await p.locator('body').innerText()).includes('발주 후보 한 칸에서 2개까지만'));check(width+' 초과 클릭 수량 유지',await p.evaluate(()=>Guild24.game.run.cart[0]===2));}
 if(after)await p.waitForTimeout(1600);await shot(p,'duplicate-order-'+width);
 if(after){await p.locator('[data-action="confirm-order"]').click();check(width+' 두 칸 실제4개 입고와 비용',await p.evaluate(()=>{const s=Guild24.game.run;return s.inventory.length===4&&s.inventory.every(x=>x.item==='rice')&&s.money===9860&&s.offers.every(o=>o.quantity===0);}));
 await p.evaluate(()=>{Guild24.game.autosave=true;Guild24.game.save();});await p.reload();await ready(p);check(width+' 발주 저장 유지',await p.evaluate(()=>Guild24.game.run.inventory.length===4&&Guild24.game.run.offers.every(o=>o.quantity===0)));const reroll=p.locator('[data-action="reroll"]');await reroll.click();check(width+' 발주 후보 교환 뒤 공급 제한',await p.evaluate(()=>Guild24.game.run.offers.every(o=>o.quantity<=2)));}
 check(width+' 런타임 오류 없음',errors.length===0);await c.close();}
 fs.writeFileSync(path.join(out,'batch8-'+(after?'after':'before')+'-results.json'),JSON.stringify({checks,evidence},null,2));console.log('PASS '+checks.length+' checks / '+evidence.length+' evidence rows');
 }finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});