// v3.0 trailer — shoot (User 2026-10-01, reports/trailer-plan.md §9). Dev-only capture, nothing injected into play.
// Loads real-play snapshots (tools/trailer-snapshot.cjs) through the game's own save import, drives the real controls,
// and records per take: JPEG frames (dpr 3) with their time, every Sound.play cue with its time, and the on-screen rect
// of the elements the edit frames (device px). The compositor (tools/trailer-compose.cjs) cuts from this record.
// Capture is deterministic: Playwright's fake clock is paused and stepped 1/30 s per frame, the web-animation timeline is held at
// rate 0 and every animation is advanced by the same step, so motion is sampled at exactly 30 fps whatever the screenshot cost.
// Hidden for capture only: the build marker, the toast and the menu button (chrome, not play).
// One staged value (User 2026-10-01, trailer v4 §11): in the SALE take only, the customer's money is raised to SALE_MONEY so
// all three price keys are live; the key pressed stays the recorded run's (PRICE_MODE). Every other value is the record's.
// REVISIT (optional, snap.revisit): the same customer's later arrival in the same run, as recorded (its own arrival line).
//   SALE_MONEY=300 PRICE_MODE=half node tools/trailer-shoot.cjs <snap.json> <itemName> <npcId> <outDir>
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),PORT=Number(process.env.QA_PORT||5217),EXEC=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',DPR=3;
const [snapPath,itemName,npcId,outArg]=process.argv.slice(2);const outDir=path.resolve(outArg);const snaps=JSON.parse(fs.readFileSync(snapPath,'utf8'));
fs.mkdirSync(outDir,{recursive:true});
const HIDE='.build-mark,#toast,[data-action="menu"]{display:none!important}';
function serve(){const c=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{c.stdout.on('data',d=>String(d).includes('ready')&&res(c));setTimeout(()=>rej(Error('no server')),8000);});}
async function load(ctx,snap,opts={}){const page=await ctx.newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await page.clock.install();
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
 await page.evaluate(()=>{window.__cues=[];const p=Sound.play.bind(Sound);Sound.play=(k,...a)=>{window.__cues.push([k,performance.now()]);return p(k,...a);};});
 const run=JSON.parse(JSON.stringify(snap.run));run.rngState=snap.rng.state;if(opts.cursor!=null)run.nightCursor=opts.cursor;
 if(opts.money!=null){const n=run.npcs.find(x=>x.id===opts.npc);if(n)n.money=opts.money;}
 const account=JSON.parse(JSON.stringify(snap.account));(account.tutorial??={}).skipped=true;
 // hold: the page clock stops before the import, so a line's on-screen timer (SAY_MS) starts with the take, not during the load wait
 if(opts.hold){const now=await page.evaluate(()=>Date.now());await page.clock.pauseAt(now+50);}
 await page.setInputFiles('#save-file',{name:'snap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:9,account,run}))});
 await page.waitForTimeout(700);
 if(opts.dismiss)for(let i=0;i<3;i++){const b=await page.$('#modal-root [data-action="boss-seen"], #modal-root [data-action="approve"], #modal-root [data-action="dismiss"]');if(!b)break;await page.evaluate(el=>el.click(),b);await page.waitForTimeout(400);}
 await page.addStyleTag({content:HIDE});await page.waitForTimeout(300);return page;}
const rectsOf=(page,sels)=>page.evaluate(({sels,dpr})=>{const out={};for(const [k,s] of Object.entries(sels)){const els=[...document.querySelectorAll(s)].filter(e=>e.getClientRects().length);
  out[k]=els.map(e=>{const r=e.getBoundingClientRect();return [r.left*dpr,r.top*dpr,r.width*dpr,r.height*dpr].map(v=>Math.round(v));});}return out;},{sels,dpr:DPR});
async function shoot(page,name,dur,actions){const dir=path.join(outDir,name);fs.mkdirSync(dir,{recursive:true});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Animation.enable');
 const now=await page.evaluate(()=>Date.now());await page.clock.pauseAt(now+20);await cdp.send('Animation.setPlaybackRate',{playbackRate:0});
 const perf0=await page.evaluate(()=>performance.now());const FPS=30,dt=1000/FPS,frames=[],rects=[],marks={};const pending=[...actions].sort((x,y)=>x.t-y.t);
 for(let n=0;n<Math.round(dur*FPS);n++){const t=n/FPS;
  while(pending.length&&t>=pending[0].t-1e-6){const a=pending.shift();
   if(a.rects)rects.push({t,label:a.name,r:await rectsOf(page,a.rects)});
   if(a.fn){const r=await a.fn(page);marks[a.name]=t;if(r&&typeof r==='object')Object.assign(marks,r);}}
  const f=String(n).padStart(5,'0')+'.jpg';fs.writeFileSync(path.join(dir,f),await page.screenshot({type:'jpeg',quality:92}));frames.push(f);
  await page.clock.runFor(dt);await page.evaluate(dt=>{for(const a of document.getAnimations()){if(a.playState==='paused')continue;a.currentTime=(a.currentTime||0)+dt;}},dt);}
 const cues=(await page.evaluate(()=>window.__cues)).map(([k,p])=>[k,+((p-perf0)/1000).toFixed(3)]).filter(c=>c[1]>=0);
 return {name,dir,dur,fps:FPS,frames,cues,rects,marks,size:[405*DPR,720*DPR]};}
const clickJS=(page,sel)=>page.evaluate(s=>{const e=document.querySelector(s);if(e)e.click();return !!e;},sel);
(async()=>{const pw=require('playwright');const server=await serve();const browser=await pw.chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const mk=()=>browser.newContext({viewport:{width:405,height:720},deviceScaleFactor:DPR,isMobile:true,hasTouch:true,locale:'ko-KR'});
 const takes={};const meta={head:require('child_process').execFileSync('git',['rev-parse','--short','HEAD'],{cwd:ROOT}).toString().trim(),seed:snaps.sale.run.seed,npcId,itemName,dpr:DPR};
 try{
  // SALE: the customer arrives, the item is tapped, the price is chosen (the same key the recorded run used)
  const SALE_MONEY=process.env.SALE_MONEY?Number(process.env.SALE_MONEY):null,PRICE_MODE=process.env.PRICE_MODE||'';
  let ctx=await mk();let p=await load(ctx,snaps.sale,{dismiss:true,npc:npcId,money:SALE_MONEY});
  const stockId=await p.evaluate(n=>(Guild24.game.run.inventory.find(x=>DATA.itemBy[x.item]?.name===n)||{}).id,itemName);
  const S={say:'.p-sale .say, .say',portrait:'.who .portrait, .who img, .who',dossier:'.dossier',dest:'.dest-plate',readout:'.readout',item:`[data-action="select"][data-id="${stockId}"]`,
   tray:'.counter-tray',tills:'.tills',delta:'.tray-delta',slots:'.slots',stats:'.detail-stats'};
  takes.sale=await shoot(p,'sale',11,[{t:0.2,name:'r0',rects:S},{t:3.8,name:'scroll',fn:pg=>pg.evaluate(s=>{const e=document.querySelector(s);if(e)e.scrollIntoView({block:'center',behavior:'instant'});},S.item)},{t:3.85,name:'rScroll',rects:S},{t:5.0,name:'tapItem',fn:pg=>clickJS(pg,S.item)},{t:5.9,name:'r1',rects:S},
   {t:8.5,name:'tapPrice',fn:async pg=>{const m=await pg.$$eval('.tills button[data-action="sell"]',(b,want)=>(b.find(x=>x.dataset.mode===want&&!x.disabled)||b.find(x=>x.dataset.mode==='full'&&!x.disabled)||b.find(x=>!x.disabled))?.dataset.mode,PRICE_MODE);await clickJS(pg,`.tills button[data-action="sell"][data-mode="${m}"]`);return {priceMode:m};}},
   {t:8.45,name:'rPrice',rects:{price:`.tills button[data-action="sell"]${PRICE_MODE?`[data-mode="${PRICE_MODE}"]`:':not([disabled])'}`,keys:'.tills button[data-action="sell"]',live:'.tills button[data-action="sell"]:not([disabled])'}},{t:10.0,name:'r2',rects:S}]);
  await ctx.close();
  // NIGHT: the same customer's card
  const nightIdx=snaps.night.run.results.findIndex(r=>r.npcId===npcId);ctx=await mk();p=await load(ctx,snaps.night,{cursor:Math.max(0,nightIdx-1)});
  const N={beat:'.beat',verdict:'.beat .verdict',hero:'.beat .cause li.hero',what:'.beat .what',stand:'.beat .stand-in',name:'.beat .who h3',say:'.beat .say',changes:'.beat-room, .beat .changed'};
  takes.night=await shoot(p,'night',6.5,[{t:0.5,name:'next',fn:pg=>clickJS(pg,'[data-action="night-next"]')},{t:0.55,name:'r0',rects:N},
   {t:3.5,name:'r1',rects:N,fn:pg=>pg.evaluate(dpr=>{const li=document.querySelector('.beat .cause li.hero');if(!li)return {};const rg=document.createRange();rg.selectNodeContents(li);
    const r=rg.getBoundingClientRect();return {heroText:[r.left*dpr,r.top*dpr,r.width*dpr,r.height*dpr].map(v=>Math.round(v))};},DPR)}]);await ctx.close();
  // REVISIT: the same customer, later in the same run, arriving with the line the game gave it
  if(snaps.revisit){ctx=await mk();p=await load(ctx,snaps.revisit,{dismiss:true,hold:true});
   takes.revisit=await shoot(p,'revisit',3.5,[{t:0.2,name:'r0',rects:{say:'.say',portrait:'.who .portrait, .who img, .who',who:'.who',dest:'.dest-plate'}}]);await ctx.close();}
  // FINAL: the boss screen, 마왕성으로 출발, the clash, the END receipt
  ctx=await mk();p=await load(ctx,snaps.finalBefore,{dismiss:true});
  const F={boss:'.boss-art, .p-final .boss, .final-boss',title:'.p-final h1, .p-final h2, .boss-name',threat:'.final-forecast, .threats',go:'[data-action="boss"]',
   cBoss:'.clash-boss',cBar:'.clash-bar',cParty:'.clash-party',cCard:'.clash-card',tape:'.end-tape',closed:'.closed',seal:'.seal',reason:'.reason'};
  takes.final=await shoot(p,'final',15.5,[{t:0.2,name:'r0',rects:F},{t:1.8,name:'boss',fn:pg=>clickJS(pg,'[data-action="boss"]')},
   {t:2.2,name:'bossGo',fn:async pg=>(await clickJS(pg,'#modal-root [data-action="boss-go"]'))||clickJS(pg,'[data-action="boss"]')},
   {t:3.6,name:'r1',rects:F},{t:6.4,name:'r2',rects:F},{t:14.6,name:'r3',rects:F}]);
  meta.endState=await p.evaluate(()=>({phase:Guild24.game.run.phase,win:Guild24.game.run.win}));meta.expectedWin=snaps.finalAfter.run.win;await ctx.close();
 }finally{fs.writeFileSync(path.join(outDir,'shoot.json'),JSON.stringify({meta,takes},null,1));await browser.close();server.kill();}
 for(const [k,t] of Object.entries(takes))console.log(k,'frames',t.frames.length,'cues',JSON.stringify(t.cues),'marks',JSON.stringify(t.marks));
 console.log('end',JSON.stringify(meta));
})().catch(e=>{console.error(e);process.exit(1);});
