// NIGHT_CLOSING / CORE_RUN: affected copy and closing controls. No expedition resolution or measurement.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-night-closing-text')),before=process.argv.includes('--before'),port=5285,checks=[],findings=[];
const INJ='부상을 입었다. 다친 채 다시 떠나면 투력·강인함이 깎인 채로 싸운다(특성에 따라 달라질 수 있다). 원정에 성공하면 반드시 낫고, 퇴각하면 확률로 낫는다.';
const syncSource=before?null:fs.readFileSync(root+'/dist/systems/shop.js','utf8').match(/function syncDeepReport[\s\S]*?(?=\r?\nclass Game\{)/)[0];
const GREAT='준비가 넉넉하면 대성공이 난다. 일반 원정의 대성공은 가게에도 보너스 골드를 남긴다.';
function check(name,ok){assert.ok(ok,name);checks.push(name);}
async function setup(p){await p.goto('http://127.0.0.1:'+port);await ready(p);await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-night-closing-text');g.deferFoundationRelic();const s=g.run;Object.assign(s,{phase:'closing',day:9,firstRun:false,event:null,relicWindow:null,inventory:[],money:-10,facilities:[],loadout:{}});s.stats.revenue=10000;s.stats.deaths=0;g.account.store.capital=10;g.account.tutorial.skipped=true;Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});Guild24.render();});}
async function shot(p,name){if(!before){const fit=await p.evaluate(()=>{
 const region=document.querySelector('.coach-bubble')||document.querySelector('.modal-footer')||document.querySelector('.stage .dock');
 const buttons=region?[...region.querySelectorAll('button')]:[];
 const keys=buttons.every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1&&r.height>=44;});
 const bubble=document.querySelector('.coach-bubble'),b=bubble?.getBoundingClientRect();
 return {keys,bubble:!b||(b.left>=0&&b.right<=innerWidth+1&&b.top>=0&&b.bottom<=innerHeight+1&&bubble.scrollHeight<=bubble.clientHeight+1)};
 });check(name+' 버튼 잘림 없음',fit.keys);check(name+' 말풍선 잘림 없음',fit.bubble);}
 await p.screenshot({path:path.join(out,'batch5-'+(before?'before':'after')+'-'+name+'.png')});}
async function open(p,action){await p.locator('[data-action="menu"]').click();await p.locator('#modal-root [data-action="'+action+'"]').click();}
async function dismiss(p){await p.locator('#modal-root [data-action="dismiss"]').click();}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;try{
await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});
browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [390,1280])for(const kind of ['closure','death-limit','rescue','injured','great','deep-record','abandon']){
 const c=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 if(before)for(const file of ['ui/app.js','data/copy.js'])await p.route('**/'+file,r=>r.fulfill({path:path.join(out,'baseline-'+path.basename(file)),contentType:'text/javascript'}));
 await setup(p);
 if(kind==='closure'){
  await p.locator('[data-action="retire"]').click();const text=await p.locator('#modal-root').innerText();await shot(p,'closure-'+width);
  if(before)findings.push({width,kind,text});else{check(width+' 폐점 정산 설명',text.includes('이 점포를 폐점할까요?')&&text.includes('점포 자본을 정산한다.')&&!text.includes('보상은 없다'));check(width+' 폐점 확인 버튼',await p.locator('#modal-root [data-action="retire-go"]').innerText()==='폐점');}
  await p.locator('[data-action="retire-go"]').click();check(width+' 폐점 D9 총매출10000의 1% 정산',await p.evaluate(()=>Guild24.game.run.settlement.gain===100&&Guild24.game.account.store.capital===110));await shot(p,'settlement-'+width);
  await p.evaluate(()=>{Guild24.game.autosave=true;Guild24.game.save();});await p.reload();await ready(p);check(width+' 폐점 정산 재로드 중복 없음',await p.evaluate(()=>Guild24.game.account.store.capital===110));
 }else if(kind==='death-limit'){
  await p.evaluate(()=>{const s=Guild24.game.run;s.stats.deaths=5;s.inventory=[{id:'death-stock',item:'rope',cost:80,expires:12}];Guild24.render();});const text=await p.locator('.p-closing .dock').innerText();await shot(p,'death-limit-'+width);
  if(before)findings.push({width,kind,text});else{check(width+' 한도 종료 안내',text.includes('사망 한도에 도달했다.'));check(width+' 한도 종료 버튼',await p.locator('[data-action="close"]').innerText()==='점포 종료');check(width+' 한도 이후 회생 키 없음',await p.locator('.dock [data-action="stock"],.dock [data-action="retire"]').count()===0);}
  await p.locator('[data-action="close"]').click();check(width+' 사망 한도 종료 원인 유지',await p.evaluate(()=>Guild24.game.run.phase==='end'&&Guild24.game.run.endReason.includes('소문')));
 }else if(kind==='rescue'){
  await p.evaluate(()=>{const s=Guild24.game.run;s.inventory=[0,1].map(i=>({id:'rescue-'+i,item:'rope',cost:80,expires:12}));Guild24.render();});await p.locator('.dock [data-action="stock"]').click();await shot(p,'rescue-'+width);
  const text=await p.locator('#modal-root').innerText();if(!before)check(width+' 회생 마감 단위',text.includes('3번의 마감'));
  await p.locator('[data-action="liquidate"]').first().click();check(width+' 첫 재고 매입가50% 회수',await p.evaluate(()=>Guild24.game.run.money===30&&Guild24.game.run.rescueUsed===1));
  await p.locator('[data-action="liquidate"]').first().click();check(width+' 같은 마감 두 번째 정리도 회생1회',await p.evaluate(()=>Guild24.game.run.money===70&&Guild24.game.run.rescueUsed===1));await dismiss(p);
  await open(p,'help');await p.locator('.more summary').click();await p.locator('.more').evaluate(e=>e.scrollIntoView({block:'end'}));await shot(p,'guide-'+width);
  if(!before)check(width+' 가이드 적자 조건과 마감 단위',(await p.locator('#modal-root').innerText()).includes('최대 3번의 마감에 이용할 수 있다. 회생 기회나 재고가 없어 적자를 해결하지 못하면 폐점한다.'));
 }else if(kind==='deep-record'){
  await p.evaluate(syncSource=>{const s=Guild24.game.run,n=s.npcs[0];s.phase='night';s.nightCursor=0;
   Object.assign(n,{level:3,stats:{combat:16,survival:13,mobility:12,spirit:17},injury:0,recovery:0,fatigue:0,traits:[]});
   const r={npcId:n.id,name:n.name,day:9,level:2,dungeonName:s.dungeons[0].name,outcome:'성공',injury:0,recovery:0,changes:['Lv.1 → Lv.2','Lv.2 → Lv.3'],statChanges:[{key:'combat',before:10,after:12}],events:[],items:[],xp:58,loot:20,deep:{great:false,bonusXp:40,bonusWallet:60},quote:''};
   n.records=[{...r}];if(syncSource)new Function('G',syncSource+';return syncDeepReport')(window)(n,r,{combat:10,survival:11,mobility:12,spirit:13});
   s.results=[r];Guild24.render();},syncSource);
  await shot(p,'deep-record-'+width);const label=await p.locator('.beat .place').innerText();
  if(before)findings.push({width,kind,label});else{check(width+' 심층 최종레벨 표시',label.includes('Lv.3'));check(width+' 심층 실제 최종능력치 표시',(await p.locator('.changed').innerText()).includes('10 → 16'));check(width+' 심층 일반/추가 경험치 표시',(await p.locator('.changed').innerText()).includes('+58')&&(await p.locator('.changed').innerText()).includes('경험치 +40'));}
 }else if(kind==='abandon'){
  await open(p,'abandon');check(width+' 메뉴 포기 무정산 설명',(await p.locator('#modal-root').innerText()).includes('이번 점포에서 얻을 보상은 없다.'));await p.locator('[data-action="abandon-go"]').click();check(width+' 메뉴 포기 무정산 실제 유지',await p.evaluate(()=>Guild24.game.run===null&&Guild24.game.account.store.capital===10));
 }else{
  await p.evaluate(kind=>{const g=Guild24.game,s=g.run,n=s.npcs[0];s.phase='night';s.nightCursor=0;Object.assign(n,{injury:kind==='injured'?1:0,recovery:0,fatigue:14,traits:kind==='injured'?['grit']:[]});
   const r={npcId:n.id,name:n.name,day:9,level:n.level,dungeonName:s.dungeons[0].name,outcome:kind==='injured'?'부상':'대성공',injury:n.injury,recovery:0,changes:[],statChanges:[],events:[],items:[],acted:[kind==='injured'?'injured':'great'],xp:20,loot:10,beforeFatigue:5,fatigueBeforeExpedition:5,finalFatigue:14,settledFatigue:14,rawOutcomeFatigueGain:9,actualOutcomeFatigueGain:9,outcomeBufferUsed:0,fatigueLedger:[{label:'오늘 시작',value:5},{label:'원정',delta:9}],storeBonus:kind==='great'?50:0,quote:''};s.results=[r];g.account.tutorial={'coach-earn':true};Guild24.render();},kind);
  await p.locator('.coach-bubble').waitFor();const text=await p.locator('.coach-bubble p').innerText();await shot(p,kind+'-'+width);if(before)findings.push({width,kind,text});else check(width+' '+kind+' 승인 코칭 문구',text===(kind==='injured'?INJ:GREAT));
  await p.locator('[data-action="coach-next"]').click();check(width+' '+kind+' 완료 기록',await p.evaluate(kind=>Guild24.game.account.tutorial['coach-learn-'+(kind==='injured'?'injured':'great')]===true,kind));
 }
 check(width+' '+kind+' 가로 넘침 없음',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));check(width+' '+kind+' 런타임 오류 없음',!errors.length);await c.close();
}
fs.writeFileSync(path.join(out,'batch5-'+(before?'before':'after')+'-results.json'),JSON.stringify({checks,findings},null,2));console.log((before?'BEFORE':'PASS')+' '+checks.length+' checks / '+findings.length+' baseline findings');
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});