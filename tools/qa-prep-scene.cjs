// NEW STORE PREPARATION — STORE SCENE (UI_UX §NEW STORE PREPARATION — STORE SCENE; UI-Q-v29-42) - runtime regression.
// Dev-only. With no Decoration and with four owned / two equipped, at the phone heights a browser leaves and at the desk
// widths (a short laptop browser and a landscape tablet included): no preparation panel; the branch plate right under the
// logo; the board ends at least 6 px above the places under it and the Capital plate 6 px above the Action; the logo, the branch plate, board, Capital plate, Action, menu, build marker, each Slot place
// (as drawn) and its tag overlap nothing else and stay on screen; every place is a tap target of at least 44 px. Then the ending round trip: 다음 점포
// 열기 -> the scene with 결과 다시 보기 -> a place opens 점포 장식 on its Slot -> back to the scene -> 결과 다시 보기 returns to
// the ending, and the ended Run is untouched throughout; a reload on the scene opened from the ending returns to the ending
// (the scene is not saved). Reduced motion.
//   node tools/qa-prep-scene.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5201),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const SIZES=[[360,640],[360,740],[375,667],[390,664],[390,844],[412,915],[430,740],[768,1024],[900,700],[1023,768],[1024,768],[1280,700],[1280,720],[1366,680],[1280,800],[1280,880],[1920,1080]];
const OWN=['sponsorSign','honorFrame','thriftSafe','guildShelf'],EQUIP=['sponsorSign','guildShelf'];
const MEASURE=`(()=>{const R=e=>{const q=e.getBoundingClientRect();return {x:q.left,y:q.top,r:q.right,b:q.bottom,w:q.width,h:q.height}};
 const st=document.querySelector('.prep-status'),note=document.querySelector('.prep-note'),brd=document.querySelector('.board'),range=document.createRange();
 if(st){range.selectNodeContents(st);}
 const strip=st?{text:R(range),note:R(note),board:R(brd)}:null;
 const items={};for(const k of ['.opening-logo','.branchplate','.board','.capital-plate','.dock [data-action="start"]','.dock [data-action="prep-back"]','.menu-pin','.build-mark']){const e=document.querySelector(k);if(e)items[k]=R(e);}
 const hit={};for(const e of document.querySelectorAll('.prep-slot')){const s=e.dataset.id;items['place '+s]=R(e.querySelector('.deco-art,.slot-empty'));items['tag '+s]=R(e.querySelector('.slot-tag'));hit[s]=R(e);}
 const store=R(document.querySelector('.stage.p-prep .store')),stage=R(document.querySelector('.stage.p-prep'));
 return {store,stage,strip,items,hit,panel:!!document.querySelector('#modal-root .modal'),scene:!!document.querySelector('.stage.p-prep'),vw:innerWidth,vh:innerHeight};})()`;
function judge(tag,m){
 check(tag+' the preparation is the scene, with no panel',m.scene&&!m.panel);
 const ks=Object.keys(m.items),ov=(a,b)=>a.x<b.r-.5&&b.x<a.r-.5&&a.y<b.b-.5&&b.y<a.b-.5,hits=[];
 for(let i=0;i<ks.length;i++)for(let j=i+1;j<ks.length;j++){const A=ks[i],B=ks[j];
  if(A.split(' ')[1]&&A.split(' ')[1]===B.split(' ')[1])continue;          // a place and its own tag
  if(ov(m.items[A],m.items[B]))hits.push(A+' x '+B);}
 check(tag+' nothing overlaps',!hits.length,hits.join(', '));
 const off=ks.filter(k=>{const q=m.items[k];return q.x<-.5||q.y<-.5||q.r>m.vw+.5||q.b>m.vh+.5;});
 check(tag+' everything is on screen',!off.length,off.join(', '));
 // and inside the stage, which a desk caps at 1120 wide: a place or tag past the store's edge is cut off by it
 const out=ks.filter(k=>{const q=m.items[k],B=/^(place|tag) |branchplate|capital|logo|board/.test(k)?m.store:m.stage;return q.x<B.x-.5||q.r>B.r+.5||q.y<B.y-.5||q.b>B.b+.5;});
 check(tag+' everything is inside the stage',!out.length,out.join(', '));
 // v2.9.9 (User 2026-09-27): the store's name is a plate right under the title, centred on it
 const L=m.items['.opening-logo'],P=m.items['.branchplate'];
 check(tag+' the branch plate hangs right under the title',L&&P&&P.y-L.b>=0&&P.y-L.b<=12&&Math.abs((P.x+P.r)/2-(L.x+L.r)/2)<=2,P&&L?`gap ${(P.y-L.b).toFixed(1)}`:'missing');
 // room to read: nothing under the board within 6 px of it, and the Capital plate 6 px clear of the Action
 const B=m.items['.board'],near=ks.filter(k=>/^(place|tag) /.test(k)&&m.items[k].x<B.r&&B.x<m.items[k].r&&m.items[k].y>=B.b-.5&&m.items[k].y-B.b<6);
 check(tag+' the board keeps 6 px above the places under it',!near.length,near.map(k=>k+' '+(m.items[k].y-B.b).toFixed(1)).join(', '));
 // the status line stays inside its own strip: under the note's 4 px drop line and above the board's 12 px inset frame
 // (1 px of line box past either edge is the type's own leading, as on the tall board)
 if(m.strip)check(tag+' the status line fits its strip',m.strip.text.y>=m.strip.note.b+4-1&&m.strip.text.b<=m.strip.board.b-12+1,
  `text ${m.strip.text.y.toFixed(1)}-${m.strip.text.b.toFixed(1)} note foot ${m.strip.note.b.toFixed(1)} board foot ${m.strip.board.b.toFixed(1)}`);
 const C=m.items['.capital-plate'],A=m.items['.dock [data-action="start"]'];
 if(C&&A)check(tag+' the Capital plate keeps 6 px above the Action',A.y-C.b>=6,`gap ${(A.y-C.b).toFixed(1)}`);
 // what is judged for overlap is what is drawn; the tap target may reach past it into bare room
 const small=Object.entries(m.hit).filter(([,q])=>q.w<43.5||q.h<43.5);
 check(tag+' every place is a 44 px target',!small.length,small.map(([s,q])=>s+' '+Math.round(q.w)+'x'+Math.round(q.h)).join(', '));}
// a load with no Run opens on the prologue (UI_UX §PROLOGUE) once the loading screen is done; its 건너뛰기 ends it on the
// preparation scene. A load with a Run (the ending) has none; 다음 점포 열기 from the ending plays it again.
async function skipPrologue(p){
 const has=()=>!!document.querySelector('[data-action="prologue-skip"]')||!!document.querySelector('.stage.p-prep')||!!(window.Guild24&&Guild24.game.run);
 await p.waitForFunction(has,null,{timeout:15000});
 const b=await p.$('[data-action="prologue-skip"]');if(b){await b.click();await p.waitForSelector('.stage.p-prep',{timeout:15000});}}
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const [width,height] of SIZES)for(const st of ['bare','dressed']){
   const desktop=width>=1024,tag=width+'x'+height+' '+st;
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{if(!sessionStorage.getItem('qa')){localStorage.clear();sessionStorage.setItem('qa','1');}}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await skipPrologue(p);
   if(st==='dressed'){await p.evaluate(([own,eq])=>{const a=Guild24.game.account;for(const id of own){Meta.addCapital(a,DATA.decorationBy[id].price);Meta.buyDecoration(a,id);}
     for(const id of eq)Meta.equipDecoration(a,DATA.decorationBy[id].slot,id);Guild24.game.save();},[OWN,EQUIP]);await p.reload({waitUntil:'load'});await skipPrologue(p);}
   await p.waitForTimeout(250);judge(tag,await p.evaluate(MEASURE));
   if(OUT)await p.screenshot({path:path.join(OUT,`prep-${width}x${height}-${st}.png`)});
   await ctx.close();}
  // the ending round trip
  for(const [width,height] of [[390,844],[1280,880]]){
   const desktop=width>=1024,tag=width+'x'+height+' ending';
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{if(!sessionStorage.getItem('qa')){localStorage.clear();sessionStorage.setItem('qa','1');}}catch(e){}});
   const p=await ctx.newPage();p.setDefaultTimeout(8000);p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await skipPrologue(p);
   await p.evaluate(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.save();});
   await p.click('.p-prep [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(()=>{Guild24.game.end(false,'운영비를 충당하지 못해 이번 점포를 마감했습니다.');Guild24.render();});
   for(let k=0;k<4;k++){const b=await p.$('#modal-root [data-action="boss-seen"]')||await p.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();await p.waitForTimeout(100);}
   const before=await p.evaluate(()=>JSON.stringify(Guild24.game.run));
   // 다음 점포 열기 plays the prologue too
   await p.click('.p-end [data-action="new"]');await p.click('[data-action="prologue-skip"]');await p.waitForSelector('.stage.p-prep');await p.waitForTimeout(200);
   const m=await p.evaluate(MEASURE);judge(tag,m);
   check(tag+' 결과 다시 보기 is offered from the ending',!!m.items['.dock [data-action="prep-back"]']);
   await p.click('.p-prep .prep-slot[data-id="wall"]');await p.waitForTimeout(250);
   check(tag+' a place opens 점포 장식 on its Slot',await p.evaluate(()=>!!document.querySelector('#modal-root .decoration-panel')&&!!document.querySelector('#modal-root .slot[data-slot="wall"]')));
   await p.click('#modal-root [data-action="store-return"]');await p.waitForTimeout(200);
   check(tag+' the way back uncovers the scene',await p.evaluate(()=>!document.querySelector('#modal-root .modal')&&!!document.querySelector('.stage.p-prep')));
   await p.click('.p-prep [data-action="prep-back"]');await p.waitForTimeout(200);
   check(tag+' 결과 다시 보기 returns to the ending',await p.evaluate(()=>!!document.querySelector('.stage.p-end')&&!document.querySelector('.stage.p-prep')));
   check(tag+' the ended Run is untouched',before===await p.evaluate(()=>JSON.stringify(Guild24.game.run)));
   // a reload on the preparation scene opened from the ending lands back on the ending: the scene is a view, not saved state
   await p.click('.p-end [data-action="new"]');await p.waitForTimeout(200);
   await p.reload({waitUntil:'load'});await p.waitForSelector('.stage',{timeout:15000});await p.waitForTimeout(300);
   for(let k=0;k<4;k++){const b=await p.$('#modal-root [data-action="boss-seen"]')||await p.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();await p.waitForTimeout(100);}
   check(tag+' a reload on the scene opened from the ending returns to the ending (nothing of the scene is saved)',await p.evaluate(()=>
    !!document.querySelector('.stage.p-end')&&!document.querySelector('.stage.p-prep')&&!Object.values(localStorage).some(v=>/prepOpen/.test(v||''))));
   if(OUT)await p.screenshot({path:path.join(OUT,`ending-${width}.png`)});
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok);console.log(`\n${results.length-failed.length}/${results.length} PASS`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
