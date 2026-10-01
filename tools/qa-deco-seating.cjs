// LIVE STORE DECORATION SEATING (UI_UX §LIVE STORE DECORATION SEATING; UI-Q-v29-40) - runtime regression.
// Dev-only. Both Decoration sets are equipped and a Run is played to its first MORNING at the phone widths in the heights a
// phone browser actually leaves (bars showing: the painting is then cropped at the top and bottom, not the sides) and at the
// portrait and landscape tablet sizes and the desk widths. At each size: the till housing stands on the painted counter top (the painting is
// cropped top and bottom on a tablet, and the counter band follows it), the sign and the plaque sit on the point of the
// painting they are placed by (the sign never above the stage's top edge), the branch plate clears the dock Action, the display and
// counter pieces stand on the till housing's base line at least the gap away from it, and no piece overlaps the housing, its
// label, the DAY sign (and its hangers), the board, the branch plate, the dock or another piece, or leaves the screen; the sign
// keeps the gap from the DAY sign. Reduced motion. And in the Decoration panel, buying and fitting a row keeps it where it was.
//   node tools/qa-deco-seating.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5199),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const SIZES=[[360,640],[360,740],[375,667],[390,664],[390,844],[412,915],[430,740],[768,1024],[820,1180],[900,700],[1023,768],[1024,768],[1280,880],[1920,1080]];
const SETS={economy:['sponsorSign','honorFrame','thriftSafe','guildShelf'],survival:['trainingSign','infirmaryPlaque','memorialBook','aidCabinet']};
// the file's own points (ui.css §.decoplate.sign / .wall), per file
// and the painted counter top the till's feet stand on, as a band of the file's height
const POINT={phone:{ar:941/1672,sign:[.15,.113],wall:[.76,.55],counter:[.742,.762]},wide:{ar:1672/941,sign:[.29,.093],wall:[.629,.44],counter:[.827,.855]}};
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const [width,height] of SIZES)for(const [set,ids] of Object.entries(SETS)){
   const desktop=width>=1024,tag=width+'x'+height+' '+set;
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(ids=>{const g=Guild24.game,a=g.account;(a.tutorial??={}).skipped=true;
    for(const id of ids){Meta.addCapital(a,DATA.decorationBy[id].price);Meta.buyDecoration(a,id);Meta.equipDecoration(a,DATA.decorationBy[id].slot,id);}
    g.start('qa-deco-seating');Guild24.render();},ids);
   await p.$('.p-prep [data-action="start"]').then(b=>b?b.click():p.evaluate('Guild24.render()'));await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();Guild24.render();});
   for(let i=0;i<40;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'`))break;await p.evaluate(`(${STEP})()`);}
   for(let k=0;k<5;k++){const b=await p.$('#modal-root [data-action="boss-seen"]')||await p.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();await p.waitForTimeout(100);}
   await p.waitForTimeout(300);
   const m=await p.evaluate(()=>{const R=el=>{if(!el)return null;const q=el.getBoundingClientRect();return {x:q.left,y:q.top,r:q.right,b:q.bottom,w:q.width,h:q.height};};
    const st=document.querySelector('.p-morning'),cs=getComputedStyle(st),sr=st.getBoundingClientRect();
    const box={x:sr.left+parseFloat(cs.paddingLeft),y:sr.top+parseFloat(cs.paddingTop),w:sr.width-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),h:sr.height-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)};
    const plates=Object.fromEntries([...document.querySelectorAll('.decoplate')].map(el=>[[...el.classList].find(c=>c!=='decoplate'),R(el)]));
    const other=Object.fromEntries(['.till','.till-cap','.daysign','.board','.branchplate','.dock .pull','.dock'].map(k=>[k,R(document.querySelector(k))]));
    other['.daysign hangers']=R(document.querySelector('.daysign'));if(other['.daysign hangers'])other['.daysign hangers'].y-=10;
    return {box,plates,other,gap:parseFloat(getComputedStyle(document.querySelector('.deco-layer')).getPropertyValue('--gap')),vw:innerWidth,vh:innerHeight};});
   // the wide file is the desk's framing and a landscape tablet's (768+ wide, 700+ high, landscape)
   const wide=desktop||(width>=768&&height>=700&&width>height),P=wide?POINT.wide:POINT.phone,ph=Math.max(m.box.h,m.box.w/P.ar),pw=ph*P.ar,px=m.box.x+(m.box.w-pw)/2,py=m.box.y+(m.box.h-ph)/2;
   const till=m.other['.till'];
   if(till){const [c0,c1]=P.counter;check(tag+' till stands on the painted counter top',till.b>=py+c0*ph-1&&till.b<=py+c1*ph+1,
    `feet ${till.b.toFixed(1)} counter ${(py+c0*ph).toFixed(1)}-${(py+c1*ph).toFixed(1)}`);}
   {const bp=m.other['.branchplate'],pl=m.other['.dock .pull'];if(bp&&pl)check(tag+' branch plate clears the dock Action',
    !(bp.x<pl.r&&pl.x<bp.r)||pl.y-bp.b>=6,`plate foot ${bp.b.toFixed(1)} Action top ${pl.y.toFixed(1)}`);}
   // and at least 6 px under a counter piece it would otherwise read as standing on
   {const bp=m.other['.branchplate'];for(const k of ['display','counter']){const q=m.plates[k];if(bp&&q&&bp.x<q.r&&q.x<bp.r)
    check(tag+' branch plate clears the '+k+' piece',bp.y-q.b>=6,`plate top ${bp.y.toFixed(1)} piece foot ${q.b.toFixed(1)}`);}}
   const ov=(a,b)=>a&&b&&a.x<b.r-.5&&b.x<a.r-.5&&a.y<b.b-.5&&b.y<a.b-.5;
   check(tag+' all four Decorations are drawn',['sign','wall','display','counter'].every(s=>m.plates[s]),Object.keys(m.plates).join(','));
   const day=m.other['.daysign'];
   for(const s of ['sign','wall']){const q=m.plates[s];if(!q)continue;const [fx,fy]=P[s],ex=px+fx*pw,ey=s==='sign'?Math.max(m.box.y+m.gap,py+fy*ph):py+fy*ph;
    // the 간판 may stand left of its point, and only as far as keeps the gap from the DAY sign
    const held=s==='sign'&&day&&ex+q.w>day.x-m.gap+.5?day.x-m.gap-q.w:ex;
    check(tag+' '+s+' sits on its point of the painting'+(held!==ex?' (held at the gap from the DAY sign)':''),Math.abs(q.x-held)<=1&&Math.abs(q.y-ey)<=1,`at ${q.x.toFixed(1)},${q.y.toFixed(1)} expected ${held.toFixed(1)},${ey.toFixed(1)}`);
    if(s==='sign'&&day)check(tag+' sign keeps the gap from the DAY sign',day.x-q.r>=m.gap-.5,`gap ${(day.x-q.r).toFixed(1)}`);}
   for(const s of ['display','counter']){const q=m.plates[s];if(!q||!till)continue;const gap=s==='display'?till.x-q.r:q.x-till.r;
    check(tag+' '+s+' stands on the till base line',Math.abs(q.b-till.b)<=1,`foot ${q.b.toFixed(1)} till ${till.b.toFixed(1)}`);
    check(tag+' '+s+' keeps the gap from the till',gap>=m.gap-.5,`gap ${gap.toFixed(1)} min ${m.gap}`);}
   const names=Object.keys(m.plates);
   for(const s of names){const q=m.plates[s];
    const hits=Object.entries(m.other).filter(([,v])=>ov(q,v)).map(([k])=>k).concat(names.filter(o=>o!==s&&ov(q,m.plates[o])));
    check(tag+' '+s+' overlaps nothing',!hits.length,hits.join(' '));
    check(tag+' '+s+' is on screen',q.x>=0&&q.y>=0&&q.r<=m.vw&&q.b<=m.vh);}
   if(OUT)await p.screenshot({path:path.join(OUT,`morning-${width}x${height}-${set}.png`)});
   await ctx.close();}
  /* UI_UX §PURCHASE / EQUIP FLOW (User 2026-09-29: "구매 누르면 스크롤이 위로 올라감"): in the Decoration panel, scrolled to its
     last row, every step of buying and fitting that row - 구매, 구매 확정, 해제, 적용 - keeps the row on the pixel it was on */
  for(const [width,height] of [[360,597],[1280,880]]){const desktop=width>=1024,tag=width+'x'+height+' purchase';
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{localStorage.clear();}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Meta.addCapital(Guild24.game.account,5000);Guild24.render();});
   await p.click('.p-prep [data-action="store-manage"][data-id="counter"]');await p.waitForTimeout(200);
   const id=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal-root [data-action="deco-buy"]')].pop();b.scrollIntoView({block:'center'});return b.dataset.id;});
   const rowY=()=>p.evaluate(id=>document.querySelector('#modal-root [data-id="'+id+'"]').closest('.slot-option').getBoundingClientRect().top,id);
   const y0=await rowY();
   check(tag+' the panel is scrolled down to the row',await p.evaluate(()=>document.querySelector('#modal-root .modal-body').scrollTop>0));
   for(const a of ['deco-buy','deco-confirm','deco-unequip','deco-equip']){const q='#modal-root [data-action="'+a+'"][data-id="'+id+'"]';
    if(!await p.$(q)){check(tag+' '+a+' is offered',false);continue;}
    await p.click(q);await p.waitForTimeout(150);const y=await rowY();
    check(tag+' '+a+' keeps the pressed row where it was',Math.abs(y-y0)<=2,`row ${y0.toFixed(1)} -> ${y.toFixed(1)}`);}
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok);console.log(`\n${results.length-failed.length}/${results.length} PASS`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
