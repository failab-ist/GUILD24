// RELIC / META affected descriptions and same-Day operating costs. Browser clicks, no measurement.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-support-meta-text')),before=process.argv.includes('--before'),port=5288,checks=[],findings=[];
const MASTERY='서로 다른 마왕을 토벌할 때, 출전한 직업의 숙련이 쌓인다. 숙련이 높을수록 새로 오는 그 직업의 모험가가 더 높은 레벨로 등장할 수 있다.';
function check(name,ok){assert.ok(ok,name);checks.push(name);}
async function open(p,action){await p.locator('[data-action="menu"]').click();await p.locator('#modal-root [data-action="'+action+'"]').click();}
async function shot(p,name){await p.screenshot({path:path.join(out,'batch6-'+(before?'before':'after')+'-'+name+'.png')});check(name+' 가로 넘침 없음',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
async function setup(p){await p.goto('http://127.0.0.1:'+port);await ready(p);await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-support-meta-text');g.deferFoundationRelic();const s=g.run;Object.assign(s,{phase:'order',day:5,firstRun:false,event:null,facilities:[],dayFacilities:[],loadout:{},queue:[],cursor:0,offers:[],cart:{},money:5000,relicWindow:null});for(const n of s.npcs){n.level=1;n.rarity=0;n.alive=true;}Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});g.account.tutorial.skipped=true;Guild24.render();});}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;try{
await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [390,1280])for(const kind of ['kitchen','royalCert','hub','decor','retired','mastery','wallet']){
 const c=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(before)for(const file of ['ui/app.js','systems/shop.js','data/relics.js','data/decorations.js'])await p.route('**/'+file,r=>r.fulfill({path:path.join(out,'batch6-baseline-'+file.replaceAll('/','-')),contentType:'text/javascript'}));
 await setup(p);
 if(['kitchen','royalCert','hub'].includes(kind)){
  const price={kitchen:200,royalCert:320,hub:340}[kind];await p.evaluate(({kind,price})=>{Guild24.game.run.relicWindow={milestoneDay:5,candidateIds:[kind,'bulk','warehouse'],candidatePrices:[price,130,130],expiryDay:10,purchased:null,focusedRevealSeen:true};Guild24.render();},{kind,price});
  check(width+' '+kind+' 구입 전 운영비170',await p.evaluate(()=>Guild24.game.expectedOperatingCost()===170));await open(p,'relics');await shot(p,kind+'-choice-'+width);
  if(!before)check(width+' '+kind+' 다음 날 문구 없음',!(await p.locator('.relic-plate').filter({has:p.locator('[data-id="'+kind+'"]')}).innerText()).includes('다음 날부터'));
  await p.locator('[data-action="buy-relic"][data-id="'+kind+'"]').click();if(await p.locator('#modal-root [data-action="dismiss"]').count())await p.locator('#modal-root [data-action="dismiss"]').first().click();const cost=await p.evaluate(()=>Guild24.game.expectedOperatingCost());
  if(before)findings.push({width,kind,cost});else check(width+' '+kind+' 구매 당일 운영비190',cost===190);await shot(p,kind+'-order-'+width);
  await p.locator('.dock [data-action="open-store"]').click();await p.locator('.p-closing').waitFor();
  check(width+' '+kind+' 마감 실제 차감',await p.evaluate(({price,want})=>Guild24.game.run.daily.operating===want&&Guild24.game.run.money===5000-price-want,{price,want:before?170:190}));await shot(p,kind+'-closing-'+width);
 }else if(kind==='decor'){
  await p.evaluate(()=>{const g=Guild24.game;g.run=null;g.account.store={capital:3000,owned:['aidCabinet','rerollCoupon','thriftSafe'],loadout:{display:'aidCabinet',counter:'thriftSafe'}};Guild24.render();});await open(p,'codex');await p.locator('[data-action="codex-tab"][data-id="store"]').click();
  for(const name of ['구급품 진열장','지원 교환 쿠폰함','알뜰 금고']){const row=p.locator('.slot-option').filter({hasText:name});await row.scrollIntoViewIfNeeded();const text=await row.innerText();await shot(p,(name==='구급품 진열장'?'aid':name==='지원 교환 쿠폰함'?'coupon':'wallet-decor')+'-'+width);
   if(before)findings.push({width,kind:name,text});else check(width+' '+name+' 적용 예외',text.includes(name==='구급품 진열장'?'(마왕성 제외)':name==='지원 교환 쿠폰함'?'유료 점포지원 구매 기회마다':'(소지금 상한 적용)'));}
 }else if(kind==='retired'){
  await open(p,'codex');await p.locator('[data-action="codex-tab"][data-id="facilities"]').click();const row=p.locator('.unlock').filter({hasText:'단골 묶음혜택'});await row.scrollIntoViewIfNeeded();const text=await row.innerText();await shot(p,'retired-'+width);if(before)findings.push({width,kind,text});else check(width+' 이전 지원 후보 제외 표시',text.includes('현재 후보로 나오지 않음')&&!text.includes('기본 제공'));
 }else if(kind==='mastery'){
  await p.evaluate(()=>{Guild24.game.account.matrix.warrior.WRATH=true;});await open(p,'codex');await p.locator('[data-action="codex-tab"][data-id="progress"]').click();const text=await p.locator('.progress-panel').innerText();await shot(p,'mastery-'+width);if(before)findings.push({width,kind,text});else{check(width+' 숙련 의미',text.includes(MASTERY));check(width+' 숙련 수치 유지',(await p.locator('.matrix .tally').first().innerText())==='1 / 7');}
 }else{
  await p.evaluate(()=>{Guild24.game.run.facilities=['firstVisitCoupon','premiumMember'];Guild24.render();});await open(p,'relics');const text=await p.locator('#modal-root').innerText();await shot(p,'wallet-support-'+width);if(before)findings.push({width,kind,text});else check(width+' 방문 지원 상한 예외',(text.match(/소지금 상한 적용/g)||[]).length===2);
 }
 check(width+' '+kind+' 런타임 오류 없음',!errors.length);await c.close();
}
fs.writeFileSync(path.join(out,'batch6-'+(before?'before':'after')+'-results.json'),JSON.stringify({checks,findings},null,2));console.log((before?'BEFORE':'PASS')+' '+checks.length+' checks / '+findings.length+' findings');
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});