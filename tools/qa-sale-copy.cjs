// SALE §CURRENT CUSTOMER COMPACT STATE / COPY §4-14 / §8 / §26-2. Affected flows only.
// QA_CHROMIUM=<browser> node tools/qa-sale-copy.cjs [out-dir]
const path=require('node:path'),fs=require('node:fs'),os=require('node:os'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs'),{spawn}=require('node:child_process');
const out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-sale-copy')),port=Number(process.env.QA_PORT||5279),results=[];
function check(name,ok){assert.ok(ok,name);results.push(name);}
async function dismiss(p){await p.locator('#modal-root [data-action="dismiss"]').click();}
async function open(p,name){await p.locator('[data-action="menu"]').click();await p.locator('[data-action="'+name+'"]').click();}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;
 try{
  await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});
  browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  for(const width of [390,1280]){
   const c=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:'+port);await ready(p);
   const fixture=await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-npc-fatigue-preview');g.deferFoundationRelic();const s=g.run;
    s.phase='sell';s.day=6;s.firstRun=false;s.event=null;s.inventory=[];s.facilities=['stamp'];s.queue=s.npcs.slice(0,2).map(n=>n.id);s.cursor=0;s.bossReveal.d0Seen=true;g.account.tutorial.skipped=true;
    const n=g.current();Object.assign(n,{traits:[],stats:{combat:20,survival:20,mobility:20,spirit:20},injury:0,fatigue:10,recovery:0,money:1000,loyalty:50,pack:[],refused:[],history:[],introduced:true,newToday:false,destination:0,claimedDestination:0});n.equipment.power=0;n.outlook=g.outlookFor(n);
    g.stock('rice',1);g.stock('rice',1);g.stock('rope',1);g.rng.next=()=>0;Guild24.render();const {greatSignal,...frozen}=n.outlook;return {npc:n.id,stock:s.inventory.find(st=>st.item==='rice').id,outlook:JSON.stringify(frozen)};});
   const status=()=>p.locator('.kit .vitals').innerText(),stats=()=>p.locator('.detail-stats:visible .detail-stat strong').allTextContents();
   check(width+' 판매 전 피로 10',(await status()).includes('피로 10'));
   check(width+' 판매 전 기동·정신 17',JSON.stringify(await stats())===JSON.stringify(['20','20','17','17']));
   await p.screenshot({path:path.join(out,'batch3-after-before-sale-'+width+'.png')});
   await p.locator('[data-action="select"][data-id="'+fixture.stock+'"]').click();
   check(width+' 선택만으로 피로 변화 없음',(await status()).includes('피로 10'));
   await p.locator('.counter-tray [data-mode="full"]').click();
   check(width+' 판매 후 피로 5',(await status()).includes('피로 5'));
   check(width+' 판매 후 준비 능력치',JSON.stringify(await stats())===JSON.stringify(['20','26','20','20']));
   check(width+' 실제 보정된 단골도 영수증',(await p.locator('.receipt-stub').innerText()).includes('단골도 +2'));
   check(width+' 저장 피로 10 유지',await p.evaluate(()=>Guild24.game.current().fatigue===10));
   check(width+' 전망 스냅샷 유지',await p.evaluate(before=>{const {greatSignal,...frozen}=Guild24.game.current().outlook;return JSON.stringify(frozen)===before;},fixture.outlook));
   await p.screenshot({path:path.join(out,'batch3-after-sale-'+width+'.png')});
   await p.locator('[data-action="npc"]').first().click();const detail=await p.locator('.npc-detail').innerText();
   check(width+' 상세 상품 사용 전 피로',detail.includes('현재 피로 (상품 사용 전): 10'));
   check(width+' 추가 설명 문장 제외',!detail.includes('위 능력치는 가방 속 상품'));
   await p.screenshot({path:path.join(out,'batch3-after-detail-'+width+'.png')});await dismiss(p);
   const second=await p.evaluate(()=>Guild24.game.run.inventory.find(st=>st.item==='rice').id);
   await p.locator('[data-action="select"][data-id="'+second+'"]').click();await p.locator('.counter-tray [data-mode="full"]').click();
   check(width+' 완전 회복 피로 0 표시',(await status()).includes('피로 0'));
   check(width+' 회복 효과 중복 소비 없음',await p.evaluate(()=>Guild24.game.current().fatigue===10&&Dungeon.prepare(Guild24.game.current(),Guild24.game.claimedGateFor(Guild24.game.current()),Guild24.game.run.facilities).effects.fatigueBeforeExpedition===0));
   check(width+' 두 상품 가방 가득',(await p.locator('.kit .slots').innerText()).includes('가방 2 / 2'));
   await p.locator('[data-action="depart"]').click();
   check(width+' 구매 후 출발 단골도 +1',await p.evaluate(id=>Guild24.game.run.npcs.find(n=>n.id===id).loyalty===55,fixture.npc));
   await open(p,'help');await p.locator('details.more > summary').click();const guide=await p.locator('#modal-root').innerText();
   for(const text of ['팔리면 기본 단골도는 각각 +4·+1·-4.','상품을 사고 떠날 때 +1','원정에서 살아 돌아오면 +1','바가지를 거절하면 -2','특성·점포지원과 단골도 한도에 따라 실제 변화량은 달라질 수 있다.'])check(width+' 가이드 '+text,guide.includes(text));
   await p.locator('details.more').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'batch3-after-guide-'+width+'.png')});await dismiss(p);
   await p.evaluate(()=>{const g=Guild24.game,n=g.current();n.loyalty=51;g.account.tutorial={skipped:false};for(const id of ['destination','stats','flow','forecast','envmeter','price','payday','returning','bag','fatigue','price-refused'])g.account.tutorial['coach-'+id]=true;Guild24.render();});
   await p.locator('.coach-bubble').waitFor();check(width+' 단골 코치 역할 설명',(await p.locator('.coach-bubble p').innerText()).includes('단골도가 높을수록 자주 찾아오고 상품도 더 잘 산다.'));
   await p.screenshot({path:path.join(out,'batch3-after-regular-coach-'+width+'.png')});
   check(width+' 피로 안내 경계값',await p.evaluate(()=>Copy.learned.find(([id])=>id==='fatigue')[1]==='피로가 10 이상이면 능력치가 떨어진다. 음식·음료가 피로를 덜어 준다.'));
   check(width+' 이전 저장 규칙 문구 갱신',await p.evaluate(()=>Presentation.eventLine({id:'learn-fatigue',text:'피로가 10을 넘으면 기동·정신이 떨어진다.'})===Copy.learned.find(([id])=>id==='fatigue')[1]));
   check(width+' 가로 넘침 없음',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   check(width+' 런타임 오류 없음',errors.length===0);await c.close();
  }
  fs.writeFileSync(path.join(out,'batch3-after-results.json'),JSON.stringify(results,null,2));console.log('PASS '+results.length+' sale copy browser checks');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
