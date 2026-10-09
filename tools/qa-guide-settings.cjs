// UI_UX §GLOBAL HELP / SETTINGS / DEBUG BOUNDARY: affected surfaces only, no simulation.
// QA_CHROMIUM=<browser> node tools/qa-guide-settings.cjs [out-dir] [--before]
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const {ready}=require('./qa-ready.cjs'),{AUDIT}=require('./qa-controls.cjs');
const root=path.resolve(__dirname,'..'),before=process.argv.includes('--before'),tag=before?'before':'after';
const out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-guide-settings'));
const port=Number(process.env.QA_PORT||5276),results=[];
const baseline=before?execFileSync('git',['show','HEAD:dist/ui/app.js'],{cwd:root,encoding:'utf8'}):null;
function check(name,ok){results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name);}
async function open(page,name){await page.locator('[data-action="menu"]').click();await page.locator('[data-action="'+name+'"]').click();}
async function dismiss(page){await page.locator('#modal-root [data-action="dismiss"]').click();}
async function capture(page,name){await page.screenshot({path:path.join(out,tag+'-'+name+'.png')});}
async function switchCheck(page,state,width){
 const label=state==='prep'?'영업 전':state==='morning'?'영업 중':'종료 후 준비',prefix=width+' '+label;
 await page.evaluate(()=>{const t=Guild24.game.account.tutorial;t.skipped=false;t['coach-confirm']=true;t['coach-reroll']=true;t.keepMarker=true;Guild24.game.save();});
 await open(page,'settings');
 if(state==='prep')await capture(page,'settings-on-'+width);
 await page.locator('[data-action="coach-toggle"]').click();
 await page.waitForTimeout(50);
 const off=await page.locator('#modal-root').innerText();
 check(prefix+' OFF 버튼 즉시 갱신',off.includes('도움말 다시 보기'));
 if(!before)check(prefix+' OFF 설명',off.includes('안내가 꺼져 있다. 말풍선과 한 줄 안내가 나오지 않는다.'));
 assert.equal(await page.evaluate(()=>Guild24.game.account.tutorial.skipped),true);
 if(state==='prep')await capture(page,'settings-off-'+width);
 // Reopen separately: the baseline's stale panel must not hide later persistence checks.
 await dismiss(page);await open(page,'settings');
 const controls=await page.evaluate(AUDIT('#modal-root','[data-action="coach-toggle"]'));
 check(prefix+' 버튼 잘림·가로 넘침 없음',!controls.fail.length&&!controls.hscroll);
 await page.reload();await ready(page);
 if(state!=='prep')await page.waitForSelector('.p-'+(state==='morning'?'morning':'end'));
 if(state==='next'){await page.locator('[data-action="new"]').click();await ready(page);}
 assert.equal(await page.evaluate(()=>Guild24.game.account.tutorial.skipped),true);
 check(prefix+' OFF 새로고침 유지',true);
 await open(page,'settings');await page.locator('[data-action="coach-toggle"]').click();
 await page.waitForTimeout(50);
 const on=await page.locator('#modal-root').innerText();
 check(prefix+' ON 버튼 즉시 갱신',on.includes('도움말 끄기'));
 if(!before)check(prefix+' ON 설명',on.includes('필요한 때 말풍선과 한 줄 안내가 나온다.'));
 const tutorial=await page.evaluate(()=>Guild24.game.account.tutorial);
 check(prefix+' ON 코치 기록만 초기화',tutorial.skipped===false&&tutorial.keepMarker===true&&!Object.keys(tutorial).some(k=>k.startsWith('coach-')));
 await dismiss(page);await page.reload();await ready(page);
 if(state==='next'){await page.locator('[data-action="new"]').click();await ready(page);}
 check(prefix+' ON 새로고침 유지',await page.evaluate(()=>Guild24.game.account.tutorial.skipped===false));
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 let browser;
 try{
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview server did not start')),8000);server.on('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
  browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',headless:true});
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:880},reducedMotion:'reduce',locale:'ko-KR'}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   if(before)await page.route('**/ui/app.js',route=>route.fulfill({body:baseline,contentType:'text/javascript'}));
   await page.goto('http://127.0.0.1:'+port);await ready(page);
   await switchCheck(page,'prep',width);
   await open(page,'help');
   check(width+' 가이드 첫 제목',await page.locator('.first-days h3').innerText()===(before?'처음 3일':'하루의 흐름'));
   check(width+' 자세히 기본 접힘',await page.locator('details.more').evaluate(e=>!e.open));
   await capture(page,'guide-'+width);
   await page.locator('details.more > summary').click();
   const guide=await page.locator('#modal-root').innerText();
   check(width+' 회생 현재 한도',guide.includes(before?'한 점포에서 최대 3회.':'한 점포에서 최대 3번의 마감에 이용할 수 있다.'));
   if(!before){
    check(width+' 상품 효과 안내',guide.includes('상품마다 능력치 강화, 위험 대응, 피로 회복, 실패 완화 효과가 다르다. 상품의 효과를 확인한다.'));
    check(width+' 바가지 거절 예외',guide.includes('바가지를 거절하면 그 상품은 그날 그 손님에게 팔 수 없다.'));
   }
   await page.locator('details.more').scrollIntoViewIfNeeded();await capture(page,'guide-detail-'+width);
   check(width+' 가이드 가로 넘침 없음',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await dismiss(page);
   await page.evaluate(()=>{const g=Guild24.game;g.start('qa-guide-settings');g.deferFoundationRelic();g.run.bossReveal.d0Seen=true;g.account.tutorial.skipped=true;g.save();Guild24.render();});
   await switchCheck(page,'morning',width);
   // QA fixture states: exercise the existing Day window without playing or measuring Runs.
   for(const day of [0,1,3,4,5]){
    await page.evaluate(day=>{const g=Guild24.game;g.run.day=day;g.account.tutorial.skipped=false;Guild24.render();},day);
    check(width+' DAY '+day+' 한 줄 안내 경계',await page.locator('.task-line').count()===(day>=1&&day<=3?1:0));
   }
   await page.evaluate(()=>{Guild24.game.run.day=3;Guild24.game.account.tutorial.skipped=true;Guild24.render();});
   check(width+' OFF 한 줄 안내·말풍선 숨김',await page.locator('.task-line,.coach-bubble').count()===0);
   await page.evaluate(()=>{const g=Guild24.game;g.run.phase='end';g.run.win=false;g.run.endReason='QA';g.save();Guild24.render();});
   await page.locator('[data-action="new"]').click();await ready(page);
   await switchCheck(page,'next',width);
   check(width+' 런타임 오류 없음',errors.length===0);
   await context.close();
  }
 }finally{if(browser)await browser.close();server.kill();}
 fs.writeFileSync(path.join(out,tag+'-results.json'),JSON.stringify(results,null,2));
 const failures=results.filter(r=>!r.ok);console.log(tag+': '+(results.length-failures.length)+'/'+results.length+' PASS');
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
