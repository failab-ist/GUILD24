// PRIMARY ACTION GRAMMAR (UI_UX §PRIMARY ACTION GRAMMAR; UI-Q-v29-44) - runtime regression.
// Dev-only. A Run is played through 새 점포 준비, MORNING, ORDER, SALE, NIGHT and CLOSING, then taken to FINAL (qa-visual's
// controlled D30 setup) and to the ending, at two phone sizes and the desk. At each, the dock's flow Action is measured at
// rest and held pressed (the pointer leaves before release, so nothing is committed): one hard cast with equal right and
// down offsets at its step's depth, a press that moves the face right and down by the depth less 1 px and keeps a 1 px
// cast, its step's height and label size, and a label on one line. The cast is also read off the screen: against the same
// spot with the Action hidden, the pixels just right of and under the face are the cast for its depth and nothing past it,
// at rest and held (a notch clips a cast the style still declares). Reduced motion.
//   node tools/qa-primary-grammar.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const PORT=Number(process.env.QA_PORT||5198),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',OUT=process.argv[2]?path.resolve(process.argv[2]):null;
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok});console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const SIZES=[[360,640],[390,844],[1280,880]];
// step: 'day' (inside the Day) or 'edge' (across a Day or Run boundary); depth in px; the gate bar keeps its sign face
const ACTION={
 // 첫 점포지원 고르기 keeps 64 / 20 px on a desk: the counter-front plates sit directly above the dock
 prep:{sel:'.p-prep .dock [data-action="start"]',step:'edge',depth:5,desk:[64,20]},
 morning:{sel:'.p-morning .dock .pull',step:'day',depth:4,label:'span'},
 // ORDER's labels may step down to 16 px on the narrowest phones so the commit's Gold figure never wraps
 order:{sel:'.p-order .dock [data-action="open-store"]',step:'day',depth:4,fit:true},
 commit:{sel:'.p-order .dock [data-action="confirm-order"]',step:'day',depth:4,fit:true},
 sell:{sel:'.p-sale .dock [data-action="depart"]',step:'day',depth:3},
 night:{sel:'.p-night .dock .stamp',step:'day',depth:4},
 closing:{sel:'.p-closing .dock .stamp',step:'edge',depth:5},
 // the flow Action, never 원정대 후보 보기 beside it on the last order; with that pair a phone steps both to 16 px (User 2026-09-30)
 final:{sel:'.p-final .dock .stamp:not([disabled]):not([data-action="final-roster"])',step:'edge',depth:5,font:21,pair:16},
 end:{sel:'.p-end .dock .stamp',step:'edge',depth:5}};
const SIZE={day:{h:[56,60],font:[18,20]},edge:{h:[64,72],font:[20,22]}};
// the cast a control throws: a filter drop when it is clipped (a clipped box-shadow never draws), else either
const READ=`((sel,label)=>{const e=document.querySelector(sel);if(!e)return null;const c=getComputedStyle(e),r=e.getBoundingClientRect();
 const drop=(c.filter.match(/drop-shadow\\([^)]*\\)\\s*(-?[\\d.]+)px\\s+(-?[\\d.]+)px/)||[]).slice(1).map(Number);
 const outer=c.boxShadow.split(/,(?![^(]*\\))/).filter(s=>!/inset/.test(s)).map(s=>(s.match(/\\)\\s*(-?[\\d.]+)px\\s+(-?[\\d.]+)px/)||[]).slice(1).map(Number)).filter(a=>a.length&&(a[0]||a[1]));
 const cast=drop.length?drop:c.clipPath==='none'&&outer.length?outer[0]:[0,0];
 const m=new DOMMatrix(c.transform==='none'?undefined:c.transform);
 const t=label?e.querySelector(label):e,rg=document.createRange();rg.selectNodeContents(t);
 const lines=new Set([...rg.getClientRects()].filter(q=>q.width>1).map(q=>Math.round(q.top))).size;
 return {text:e.textContent.trim(),h:r.height,cast,move:[m.e,m.f],font:parseFloat(getComputedStyle(t).fontSize),weight:getComputedStyle(t).fontWeight,lines,
  box:{x:r.left,y:r.top,w:r.width,h:r.height}};})`;
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none']});
 try{
  for(const [width,height] of SIZES){
   const desk=width>=1024,di=desk?1:0,tag=String(width)+'x'+height;
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:desk?1:2,isMobile:!desk,hasTouch:!desk,locale:'ko-KR',reducedMotion:'reduce'});
   await ctx.addInitScript(()=>{try{if(!sessionStorage.getItem('qa')){localStorage.clear();sessionStorage.setItem('qa','1');}}catch(e){}});
   const p=await ctx.newPage();p.setDefaultTimeout(10000);p.on('pageerror',e=>check(tag+' no page error',false,e.message));
   await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
   await p.evaluate(()=>{(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.save();Guild24.render();});
   const clear=async()=>{for(let k=0;k<6;k++){const b=await p.$('#modal-root [data-action="boss-seen"]')||await p.$('#modal-root [data-action="event-seen"]')||await p.$('#modal-root [data-action="dismiss"]');if(!b)break;await b.click();await p.waitForTimeout(120);}};
   const measure=async ph=>{const A=ACTION[ph];await p.evaluate('Guild24.render()');await clear();await p.waitForTimeout(250);
    const rest=await p.evaluate(`${READ}(${JSON.stringify(A.sel)},${JSON.stringify(A.label||null)})`);
    if(!rest){check(`${tag} ${ph} has its dock Action`,false,A.sel);return;}
    const where=`${tag} ${ph} ${rest.text}`,b=rest.box,cx=Math.max(0,Math.floor(b.x-14)),cy=Math.max(0,Math.floor(b.y-14)),
     clip={x:cx,y:cy,width:Math.min(width,Math.ceil(b.x+b.w+14))-cx,height:Math.min(height,Math.ceil(b.y+b.h+14))-cy};
    const shotRest=await p.screenshot({clip});if(OUT)fs.writeFileSync(path.join(OUT,`${ph}-${width}.png`),shotRest);
    await p.evaluate(sel=>document.querySelector(sel).style.visibility='hidden',A.sel);const shotBare=await p.screenshot({clip});
    if(OUT)fs.writeFileSync(path.join(OUT,`${ph}-${width}-bare.png`),shotBare);
    await p.evaluate(sel=>document.querySelector(sel).style.visibility='',A.sel);
    await p.mouse.move(b.x+b.w/2,b.y+b.h/2);await p.mouse.down();await p.waitForTimeout(200);
    const held=await p.evaluate(`${READ}(${JSON.stringify(A.sel)},${JSON.stringify(A.label||null)})`);
    const shotHeld=await p.screenshot({clip});if(OUT)fs.writeFileSync(path.join(OUT,`${ph}-${width}-pressed.png`),shotHeld);
    await p.mouse.move(1,1);await p.mouse.up();await p.waitForTimeout(120);
    const S=SIZE[A.step],d=A.depth;
    // on screen: a pixel counts as cast when it differs from the same spot with the Action hidden. Probes (CSS px, from the
    // face's right / bottom edge at rest) sit mid-height on the right and mid-width underneath, half a pixel into each column
    const px=await p.evaluate(async({shots,probes,dpr})=>{const load=async b64=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();
      const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);return x.getImageData(0,0,c.width,c.height);};
     const [rest,bare,held]=await Promise.all(shots.map(load));
     const at=(img,x,y)=>{const i=(Math.floor(y*dpr)*img.width+Math.floor(x*dpr))*4;return [img.data[i],img.data[i+1],img.data[i+2]];};
     const cast=(img,[x,y])=>{const a=at(img,x,y),o=at(bare,x,y);return Math.abs(a[0]-o[0])+Math.abs(a[1]-o[1])+Math.abs(a[2]-o[2])>24;};
     return Object.fromEntries(Object.entries(probes).map(([k,[which,pt]])=>[k,cast(which==='rest'?rest:held,pt)]));},
     {shots:[shotRest,shotBare,shotHeld].map(b=>b.toString('base64')),dpr:desk?1:2,probes:(()=>{
      const r=b.x+b.w-clip.x,bt=b.y+b.h-clip.y,my=b.y+b.h/2-clip.y,mx=b.x+b.w/2-clip.x,o={};
      o['rest right, inside the depth']=['rest',[r+d-.5,my]];o['rest right, past the depth']=['rest',[r+d+1.5,my]];
      o['rest under, inside the depth']=['rest',[mx,bt+d-.5]];o['rest under, past the depth']=['rest',[mx,bt+d+1.5]];
      o['held right, the 1 px left']=['held',[r+d-.5,my+d]];o['held right, past it']=['held',[r+d+1.5,my+d]];
      o['held under, the 1 px left']=['held',[mx+d,bt+d-.5]];o['held under, past it']=['held',[mx+d,bt+d+1.5]];return o;})()});
    for(const [k,v] of Object.entries(px))check(`${where} on screen: ${k} ${/past/.test(k)?'is clear':'is cast'}`,/past/.test(k)?!v:v);
    check(`${where} casts one ${d}px diagonal depth`,rest.cast[0]===d&&rest.cast[1]===d,`cast ${rest.cast}`);
    check(`${where} press moves ${d-1}px right and down`,Math.abs(held.move[0]-(d-1))<.01&&Math.abs(held.move[1]-(d-1))<.01,`move ${held.move.map(v=>+v.toFixed(2))}`);
    check(`${where} press keeps a 1px cast`,held.cast[0]===1&&held.cast[1]===1,`cast ${held.cast}`);
    const paired=A.pair&&!desk&&await p.evaluate(sel=>document.querySelectorAll(sel).length>1,A.sel.split(':not(')[0]);
    const H=desk&&A.desk?A.desk[0]:S.h[di],F=paired?A.pair:A.font||(desk&&A.desk?A.desk[1]:S.font[di]);
    check(`${where} is ${H}px tall`,Math.abs(rest.h-H)<.5,`h ${rest.h}`);
    const fits=A.fit&&!desk?rest.font>=16&&rest.font<=18&&Math.abs(rest.font-Math.min(18,Math.max(16,width*.0462)))<.05:rest.font===F;
    check(`${where} label ${A.fit&&!desk?'16-18':F}px, one line`,fits&&rest.lines===1,`font ${rest.font} lines ${rest.lines}`);
    if(ph==='commit'){const long=await p.evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(A.sel)}),t=e.textContent;e.textContent='발주 1,240G · 확정';
     const rg=document.createRange();rg.selectNodeContents(e);const n=new Set([...rg.getClientRects()].filter(q=>q.width>1).map(q=>Math.round(q.top))).size;e.textContent=t;return n;})()`);
     check(`${where} a four-digit order still reads on one line`,long===1,`lines ${long}`);}
    if(!A.font)check(`${where} label weight 600`,rest.weight==='600',`weight ${rest.weight}`);};
   await measure('prep');
   await p.click('.p-prep [data-action="start"]');await p.click('#modal-root [data-action="buy-relic"]');
   await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();Guild24.render();});
   const seen=new Set();
   for(let i=0;i<120&&seen.size<5;i++){const ph=await p.evaluate('Guild24.game.run.phase');
    if(ACTION[ph]&&!seen.has(ph)){seen.add(ph);await measure(ph);
     // 발주 확정 is in the dock only while the cart holds something
     if(ph==='order'){await p.evaluate(`(()=>{const g=Guild24.game,s=g.run;const i=s.offers.findIndex(o=>o.quantity);if(i>=0)g.setQuantity(i,1);})()`);await measure('commit');}}
    await p.evaluate(`(${STEP})()`);}
   check(tag+' reached MORNING, ORDER, SALE, NIGHT and CLOSING',seen.size===5,[...seen].join(','));
   for(let i=0;i<120;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;await p.evaluate(`(${STEP})()`);}
   const atFinal=await p.evaluate(`(()=>{const g=Guild24.game;g.run.day=30;g.run.inventory=g.run.inventory.filter(x=>x.expires===null||x.expires>30);/* the skipped Nights' discards (v2.9.11) */g.morning();Guild24.render();return g.run.phase==='final';})()`);
   check(tag+' reached FINAL',atFinal);if(atFinal)await measure('final');
   await p.evaluate(()=>{Guild24.game.end(false,'운영비를 충당하지 못해 이번 점포를 마감했습니다.');});await measure('end');
   await ctx.close();}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(r=>!r.ok);console.log(`\n${results.length-failed.length}/${results.length} PASS`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
