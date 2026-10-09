// ECONOMY_ORDER §ORDER DECISION INFORMATION / META §D10 / D14 PRODUCT UNLOCK — EXACT.
// Affected browser fixtures only: no Run measurement. node tools/qa-order-text.cjs [out-dir]
const root=require('node:path').resolve(__dirname,'..'),path=require('node:path'),fs=require('node:fs'),os=require('node:os');
const {chromium}=require('playwright'),{ready}=require('./qa-ready.cjs'),{AUDIT}=require('./qa-controls.cjs');
const {spawn}=require('node:child_process'),assert=require('node:assert/strict');
const out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-order-text')),port=Number(process.env.QA_PORT||5278),results=[];
function check(name,ok){assert.ok(ok,name);results.push(name);}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(root,'tools/preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;
 try{
  await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});
  browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  for(const width of [390,1280]){
   const c=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:'+port);await ready(p);
   await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-order-text');g.deferFoundationRelic();const s=g.run;s.phase='order';s.day=4;s.money=5000;s.event=DATA.events.find(e=>e.id==='nearexpiry');s.eventSeen=true;s.inventory=[];s.facilities=['fridge','rerollTicket'];s.offers=[g.offerFor(DATA.itemBy.rope),g.offerFor(DATA.itemBy.rice)];s.cart={};Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});g.account.tutorial.skipped=true;Guild24.render();});
   for(const i of [0,1])check(width+' 임박 특가 후보 '+i,(await p.locator('[data-offer="'+i+'"] .have').innerText()).includes('유통기한 1일'));
   check(width+' 창고는 발주서 밖',await p.locator('.form .stock-side,.form .wh-slots').count()===0);
   await p.screenshot({path:path.join(out,'batch2-after-order-'+width+'.png')});
   await p.locator('[data-action="qty"][data-index="0"][data-q="1"]').first().click();
   await p.locator('[data-action="confirm-order"]').click();
   check(width+' 실제 입고 오늘까지',await p.evaluate(()=>Guild24.game.run.inventory.at(-1).expires-Guild24.game.run.day===1));
   if(width<1024)await p.locator('[data-action="stock-sheet"]').click();
   check(width+' 창고의 실제 기한',await p.locator('.wh-slot em').first().innerText()==='1일');
   await p.screenshot({path:path.join(out,'batch2-after-stock-'+width+'.png')});
   if(width<1024)await p.locator('[data-action="stock-sheet"]').click();
   await p.evaluate(()=>{const g=Guild24.game;g.run.event=null;g.run.rerollCount=0;g.account.tutorial={skipped:false,'coach-confirm':true};Guild24.render();});
   await p.locator('.coach-bubble').waitFor();
   check(width+' 교환 코치 비용 기준',(await p.locator('.coach-bubble p').innerText()).includes('이번 교환 비용은 버튼에 표시된다.'));
   check(width+' 첫 무료 비용 표시',(await p.locator('[data-action="reroll"]').innerText()).includes('0G'));
   await p.screenshot({path:path.join(out,'batch2-after-reroll-coach-'+width+'.png')});
   await p.locator('[data-action="coach-next"]').click();
   await p.locator('[data-action="reroll"]').click();
   check(width+' 무료 뒤 실제 비용 50',(await p.locator('[data-action="reroll"]').innerText()).includes('50G'));
   await p.locator('[data-action="reroll"]').click();
   check(width+' 유료 뒤 실제 비용 100',(await p.locator('[data-action="reroll"]').innerText()).includes('100G'));
   const controls=await p.evaluate(AUDIT('.form','[data-action="reroll"]'));
   check(width+' 버튼 잘림 없음',controls.fail.length===0);
   await p.evaluate(()=>{const g=Guild24.game;g.account.tutorial.skipped=true;g.account.unlocks={guildlunch:true,worldcharm:true};Guild24.render();});
   await p.locator('[data-action="menu"]').click();await p.locator('[data-action="codex"]').click();await p.locator('[data-action="codex-tab"][data-id="items"]').click();
   for(const [name,id,day]of [['길드 특제 도시락','guildlunch',10],['세계수 생환부적','worldcharm',14]]){
    const card=p.locator('.unlock').filter({has:p.getByRole('heading',{name,exact:true})});
    await card.scrollIntoViewIfNeeded();
    check(width+' '+name+' 해금·출현 설명',await card.locator('.gold-text').innerText()==='해금 완료 · 각 점포 DAY '+day+'부터 발주 후보');
    const boundary=await p.evaluate(({id,day})=>{const a=Guild24.game.account,it=DATA.itemBy[id];return [Meta.itemUnlocked(a,it,day-1),Meta.itemUnlocked(a,it,day)];},{id,day});
    check(width+' '+name+' 실제 출현 경계',boundary[0]===false&&boundary[1]===true);
    await p.screenshot({path:path.join(out,'batch2-after-unlock-'+id+'-'+width+'.png')});
   }
   check(width+' 가로 넘침 없음',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   check(width+' 런타임 오류 없음',errors.length===0);await c.close();
  }
  fs.writeFileSync(path.join(out,'batch2-after-results.json'),JSON.stringify(results,null,2));console.log('PASS '+results.length+' order text browser checks');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
