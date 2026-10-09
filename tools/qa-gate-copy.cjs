// UI_UX §GATE TIER / FIRE GATE TUTORIAL / COPY §3-4, §3-10. Affected browser fixtures only.
// node tools/qa-gate-copy.cjs [out-dir]
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||path.join(os.tmpdir(),'guild24-gate-copy')),port=Number(process.env.QA_PORT||5282),results=[];
const PAIR='II 게이트부터는 기본 위험이 두 가지다. 단, 사건으로 위험이 추가될 수 있다.';
const FIRE='화염 게이트는 II 이후에도 기본 위험이 하나다. 단, 사건으로 위험이 추가될 수 있다.';
const FORE='전투 전망은 손님이 게이트와의 싸움에서 이길지 보여 준다. 상품 판매로는 바뀌지 않는다.';
function check(name,ok){assert.ok(ok,name);results.push(name);}
async function settle(p){await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function board(p,family,tier,event=null){return p.evaluate(({family,tier,event})=>{const g=Guild24.game,s=g.run;s.phase='morning';s.closedGates=[];s.deep.today=null;s.dungeons=[g.makeDungeon(family,tier)];g.rollEvent=()=>event?DATA.events.find(e=>e.id===event):null;g.morningEvent([]);s.eventSeen=true;Guild24.render();return s.dungeons[0].hazards;},{family,tier,event});}
async function text(p){await p.locator('.coach-bubble').waitFor();return p.locator('.coach-bubble p').innerText();}
async function shot(p,name){if(await p.locator('.slip.gate').count()){await p.locator('.slip.gate').first().scrollIntoViewIfNeeded();await settle(p);const visible=await p.locator('.slip.gate').first().evaluate(e=>{const b=e.closest('.board').getBoundingClientRect();return [...e.querySelectorAll('.hazards li')].every(li=>{const r=li.getBoundingClientRect();return r.top>=b.top-1&&r.bottom<=b.bottom+1;});});check(name+' 게시판 스크롤 후 위험 행 판독',visible);}await p.screenshot({path:path.join(out,'batch4-after-'+name+'.png')});}
async function focusCheck(p,sel,name){const m=await p.evaluate(async sel=>{
 const e=[...document.querySelectorAll(sel)].find(el=>el.getClientRects().length),focus=document.querySelector('.coach-focus'),bubble=document.querySelector('.coach-bubble');if(!e||!focus||!bubble)return {missing:true};
 const r=await new Promise(resolve=>{const o=new IntersectionObserver(([entry])=>{o.disconnect();resolve(entry.intersectionRect);});o.observe(e);});
 const rail=e.closest('.board')?.querySelector(':scope > .board-rail'),top=Math.max(r.top,rail?rail.getBoundingClientRect().bottom:0);
 const dock=document.querySelector('.stage .dock'),floor=dock?Math.min(innerHeight,Math.round(dock.getBoundingClientRect().top)):innerHeight;
 const expected={left:Math.max(4,r.left-4),top:Math.max(4,top-4),right:Math.min(innerWidth-4,r.right+4),bottom:Math.min(floor,r.bottom+4)};
 const f=focus.getBoundingClientRect(),b=bubble.getBoundingClientRect(),error=Math.max(...['left','top','right','bottom'].map(k=>Math.abs(f[k]-expected[k])));
 const hit=document.elementFromPoint((f.left+f.right)/2,(f.top+f.bottom)/2),masked=!!hit?.closest('.coach-block,.coach-bubble');
 const overlap=Math.min(b.right,f.right)>Math.max(b.left,f.left)+1&&Math.min(b.bottom,f.bottom)>Math.max(b.top,f.top)+1;
 return {expected,actual:{left:f.left,top:f.top,right:f.right,bottom:f.bottom},error,masked,overlap,onScreen:b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=innerHeight};
},sel);check(name+' 타깃 정렬 '+JSON.stringify(m),!m.missing&&m.error<=1);check(name+' 중심이 마스크에 가리지 않음',!m.masked);check(name+' 말풍선 비가림',!m.overlap&&m.onScreen);}
async function scrollCheck(p,name){await p.locator('.slip.gate').first().scrollIntoViewIfNeeded();await settle(p);await p.locator('[data-action="coach-next"]').focus();
 const board=await p.locator('.board').evaluate(e=>({start:e.scrollTop,range:e.scrollHeight-e.clientHeight}));
 if(!board.range){await focusCheck(p,'.slip.gate',name+' 스크롤 없는 게시판');check(name+' 버튼 키보드 포커스 유지',await p.evaluate(()=>document.activeElement?.dataset.action==='coach-next'));return;}
 const start=board.start;check(name+' 게시판 스크롤 경계 픽스처',start>0);
 await p.locator('.board').evaluate(e=>e.scrollBy(0,-60));
 await p.waitForFunction(before=>document.querySelector('.board').scrollTop<before,start);await settle(p);
 await focusCheck(p,'.slip.gate',name+' 스크롤 후');check(name+' 버튼 키보드 포커스 유지',await p.evaluate(()=>document.activeElement?.dataset.action==='coach-next'));
 await p.locator('.slip.gate').first().scrollIntoViewIfNeeded();await settle(p);await focusCheck(p,'.slip.gate',name+' 스크롤 복귀');}
async function setup(p){await p.goto('http://127.0.0.1:'+port);await ready(p);await p.evaluate(()=>{const g=Guild24.game;g.autosave=false;g.start('qa-gate-coach');g.deferFoundationRelic();const s=g.run;s.day=8;s.firstRun=false;s.event=null;s.closedGates=[];s.relicWindow=null;s.inventory=[];s.facilities=[];s.money=5000;Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});g.account.tutorial={skipped:false,'coach-deep':true,'coach-event':true,'coach-gatepair':true};});}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=spawn(process.execPath,[root+'/tools/preview.cjs','--port',String(port)],{stdio:['ignore','pipe','inherit']});let browser;try{
await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('preview timeout')),8000);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(t);resolve();}});server.on('error',reject);});
browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
for(const width of [390,1280]){
for(const kind of ['pair','fire-flow','fire-event','fire-three','deep']){
const c=await browser.newContext({viewport:{width,height:Number(process.env.QA_HEIGHT||880)},reducedMotion:'reduce'}),p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await setup(p);
if(kind==='pair'){
await p.evaluate(()=>{delete Guild24.game.account.tutorial['coach-gatepair'];Guild24.game.account.tutorial['coach-gatefire']=true;});
check(width+' 일반 II 기본 위험 2',(await board(p,'crypt',2)).length===2);check(width+' 일반 II 코치',await text(p)===PAIR);
await p.evaluate(()=>{Guild24.game.account.tutorial['coach-gatepair']=false;});
check(width+' 사건 포함 일반 II 위험 3',(await board(p,'crypt',2,'coldwave')).length===3);check(width+' 일반 II 사건 예외 설명',await text(p)===PAIR);await scrollCheck(p,'일반 II '+width);await shot(p,'pair-'+width);
}else if(kind==='fire-flow'){
check(width+' 화염 I 기본 위험 1',(await board(p,'golem',1)).length===1);await settle(p);
check(width+' 화염 I 코치 없음',await p.locator('.coach-bubble').count()===0);
check(width+' 화염 I 완료 기록 안 남음',await p.evaluate(()=>!Guild24.game.account.tutorial['coach-gatefire']));await shot(p,'fire-one-'+width);
check(width+' 화염 II 기본 위험 1',(await board(p,'golem',2)).length===1);check(width+' 첫 화염 II에서 코치',await text(p)===FIRE);await shot(p,'fire-two-'+width);
await p.locator('[data-action="coach-next"]').click();check(width+' 화염 코치 완료 저장',await p.evaluate(()=>Guild24.game.account.tutorial['coach-gatefire']===true));
await p.evaluate(()=>{Guild24.game.autosave=true;Guild24.game.save();});await p.reload();await ready(p);await settle(p);
check(width+' 재로드 후 완료 기록 유지',await p.evaluate(()=>Guild24.game.account.tutorial['coach-gatefire']===true));check(width+' 재로드 후 코치 반복 안 함',await p.locator('.coach-bubble').count()===0);
}else if(kind==='fire-event'){
check(width+' 독안개 화염 I 위험 2',(await board(p,'golem',1,'poisonfog')).length===2);await settle(p);check(width+' 위험 늘어도 화염 I 코치 없음',await p.locator('.coach-bubble').count()===0);
await p.evaluate(()=>{Guild24.game.run.eventLog=[];});check(width+' 독안개 화염 II 위험 2',(await board(p,'golem',2,'poisonfog')).length===2);check(width+' 화염 II 사건 예외 설명',await text(p)===FIRE);await scrollCheck(p,'화염 II '+width);await shot(p,'fire-event-'+width);
}else if(kind==='fire-three'){
await p.evaluate(()=>{Guild24.game.run.day=18;});
check(width+' 화염 III 기본 위험 1',(await board(p,'golem',3)).length===1);check(width+' II를 안 봐도 첫 III에서 코치',await text(p)===FIRE);await shot(p,'fire-three-'+width);
}else{
const before=await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.phase='sell';s.dungeons=[g.makeDungeon('spider',1)];s.dungeons[0].power=30;s.deep.today={gateIndex:0,nomineeId:null,paid:0};s.queue=s.npcs.slice(0,2).map(n=>n.id);s.cursor=0;const n=g.current();Object.assign(n,{stats:{combat:20,survival:20,mobility:20,spirit:20},traits:[],fatigue:0,injury:0,pack:[],history:[],refused:[],destination:0,claimedDestination:0,money:1000});n.equipment.power=0;n.outlook=g.outlookFor(n);g.stock('lowpotion',1);g.rng.next=()=>0;for(const id of ['destination','stats','flow','envmeter','price','payday','returning','bag','regular','fatigue','price-refused'])g.account.tutorial['coach-'+id]=true;Guild24.render();return n.outlook.combat;});
check(width+' Canonical 기준 원래 전망 접전',before==='접전');check(width+' 전망 코치 판매 범위만',await text(p)===FORE);check(width+' 전망 코치 심층 문장 없음',!(await text(p)).includes('심층'));await focusCheck(p,'.readout .ro-combat','전망 '+width);await shot(p,'forecast-'+width);
await p.locator('[data-action="coach-next"]').click();await p.locator('.deep-offer summary').click();await p.locator('[data-action="deep-nominate"]').click();
check(width+' 후원 시 기존 재전망 유지',await p.evaluate(()=>Guild24.game.current().outlook.combat==='불리'));await shot(p,'deep-nominated-'+width);
const id=await p.evaluate(()=>Guild24.game.run.inventory[0].id);await p.locator('[data-action="select"][data-id="'+id+'"]').click();await p.locator('.counter-tray [data-mode="full"]').click();
check(width+' 상품 판매 후 전망 유지',await p.evaluate(()=>Guild24.game.current().outlook.combat==='불리'));
}
check(width+' '+kind+' 가로 넘침 없음',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));check(width+' '+kind+' 런타임 오류 없음',errors.length===0);await c.close();}
}
fs.writeFileSync(path.join(out,'batch4-after-results.json'),JSON.stringify(results,null,2));console.log('PASS '+results.length+' gate coach browser checks');
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});