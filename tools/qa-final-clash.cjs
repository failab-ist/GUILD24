// FINAL CLASH SCENE (UI_UX §FINAL — CLASH SCENE; UI-Q-v29-46; PRESENTATION §GAME FEEL BEAT H7) - runtime regression.
// Dev-only. A Run is played to D5 on the qa-visual policy and moved to its D30 FINAL (as qa-final-bosses does); the save
// there is kept and every case starts from it: 1, 2 and 3 members, each as a clear (both bag slots filled), a close failure
// (member i carries i mod 3 items) and a wide failure (empty-handed). The outcome and the bags are fixtures, not a
// measurement: the one roll is pinned to the middle of its range and the pre-roll party and effective Boss Power to 100
// and a multiple of it, so the resolved ratio is 1.05 / 0.93 / 0.5 - the scene only replays what the Final resolved.
// With motion, from `마왕성으로 출발`: the scene sits over the stage, inside it and the screen, one card per member with
// exactly the items that member carried in its bag; the cues run rumble, one supply per item, then clash / counter for
// every member in party order (a counter after the last one too), then collapse on a clear; the red never drops at an
// impact and no amount is marked on the bar; it drops by the member's share after each counter but the last, whose share
// is held: at the last counter the bar still reads the level before it; in the verdict it hesitates near the bottom (5%
// on a clear, the resolved remainder on a failure); the bar only ever falls and ends at 1 - min(1, ratio) - empty on a
// clear, at least 3% on a failure; no figure but the members' Lv; the ending follows with its seal (no length ceiling:
// the scene is skippable). Then a tap mid-scene lands on the same ending at once, a reload mid-scene opens the ending,
// reduced motion shows no scene, and nothing of the scene is in the save.
//   node tools/qa-final-clash.cjs [out-dir] [--video]
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const OUT=process.argv[2]&&!process.argv[2].startsWith('--')?path.resolve(process.argv[2]):null,VIDEO=process.argv.includes('--video');
const PORT=Number(process.env.QA_PORT||5203),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',FIXED_NOW=1790112000000;
const STEP=fs.readFileSync(path.join(__dirname,'qa-final-bosses.cjs'),'utf8').match(/const STEP=`([\s\S]*?)`;/)[1];
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
const OUTCOME={clear:1/1.05,close:1/.93,wide:2};   // effective Boss Power as a multiple of the party's (roll pinned to 1)
// the scene's own timing, read off the source (app.js keeps it inside its closure)
const APP=fs.readFileSync(path.join(__dirname,'..','dist','ui','app.js'),'utf8');
const C={...Object.fromEntries(APP.match(/const CLASH=\{([^}]*)\}/)[1].split(',').map(x=>x.split(':').map(y=>y.trim())).map(([k,v])=>[k,Number(v)])),
 edge:Number(APP.match(/const CLASH_EDGE=([.\d]+)/)[1])};
const RATIO={clear:1.05,close:.93,wide:.5},BAG={clear:()=>2,close:i=>i%3,wide:()=>0};
// reach the D30 FINAL once and hand back the save it left
async function finalSave(browser){
 const c=await browser.newContext({locale:'ko-KR'});const p=await c.newPage();
 await p.addInitScript(t=>{Date.now=()=>t;},FIXED_NOW);
 await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});
 await p.evaluate(()=>{localStorage.clear();(Guild24.game.account.tutorial??={}).skipped=true;Guild24.game.start('qa-h7-1');Guild24.render();});
 await p.click('#modal-root [data-action="buy-relic"]');
 await p.evaluate(()=>{Guild24.game.account.tutorial.skipped=true;Guild24.game.save();});
 for(let i=0;i<800;i++){if(await p.evaluate(`Guild24.game.run.phase==='morning'&&Guild24.game.run.day>=5`))break;await p.evaluate(`(${STEP})()`);}
 const ok=await p.evaluate(()=>{const g=Guild24.game,s=g.run;s.day=30;g.run.inventory=g.run.inventory.filter(x=>x.expires===null||x.expires>30);/* the skipped Nights' discards (v2.9.11) */g.morning();if(s.event)s.eventSeen=true;s.bossReveal=s.bossReveal||{};
  for(const k of ['d0Seen','identitySeen','combatSeen','traitSeen','routeSeen','familySeen'])s.bossReveal[k]=true;
  if(s.relicWindow)s.relicWindow.focusedRevealSeen=true;g.save();return s.phase==='final'&&g.finalEligible().length>=3;});
 const save=await p.evaluate(()=>JSON.stringify(Object.entries(localStorage)));await c.close();return ok?save:null;}
async function open(browser,save,[width,height],motion,video){
 const desktop=width>=1024;
 const c=await browser.newContext({viewport:{width,height},deviceScaleFactor:desktop?1:2,isMobile:!desktop,hasTouch:!desktop,locale:'ko-KR',
  reducedMotion:motion?'no-preference':'reduce',...(video?{recordVideo:{dir:video,size:{width,height}}}:{})});
 await c.addInitScript(([entries,t])=>{Date.now=()=>t;if(!sessionStorage.getItem('qa')){localStorage.clear();for(const [k,v] of JSON.parse(entries))localStorage.setItem(k,v);sessionStorage.setItem('qa','1');}},[save,FIXED_NOW]);
 const p=await c.newPage();p.setDefaultTimeout(8000);p.on('pageerror',e=>check(`${width}x${height} no page error`,false,e.message));
 await p.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await p.waitForTimeout(200);
 return {c,p};}
// muster k members, pin the outcome, and press the real 마왕성으로 출발 -> confirm
async function depart(p,k,outcome){
 const bag=Array.from({length:k},(_,i)=>BAG[outcome](i));
 await p.evaluate(([k,mult,bag])=>{const g=Guild24.game,s=g.run;for(const n of g.finalEligible().slice(0,k))g.selectFinal(n.id);g.commitFinalParty();
  s.team.forEach((id,i)=>{s.npcs.find(n=>n.id===id).pack=DATA.items.slice(i*2,i*2+bag[i]).map(it=>it.id);});
  const next=g.rng.next.bind(g.rng);let once=true;g.rng.next=()=>{if(once){once=false;return .5;}return next();};
  const pre=g.finalPreRoll.bind(g);g.finalPreRoll=packs=>({...pre(packs),power:100,bossPower:100*mult});
  /* the cue log and a per-frame reading of the bar, both on the page clock */
  window.__cues=[];const play=Sound.play;Sound.play=(kind,d)=>{window.__cues.push([kind,performance.now()]);return play(kind,d);};
  window.__bar=[];const tick=()=>{const hp=document.querySelector('.clash-bar .hp'),bar=document.querySelector('.clash-bar');
   const ck=document.querySelector('.clash .crack');
   if(hp&&bar)window.__bar.push([performance.now(),hp.getBoundingClientRect().width/(bar.getBoundingClientRect().width-2),ck?+getComputedStyle(ck).opacity:0]);requestAnimationFrame(tick);};tick();
  Guild24.render();},[k,OUTCOME[outcome],bag]);
 await p.click('.dock [data-action="boss"]');await p.click('#modal-root [data-action="boss-go"]');
 await p.evaluate(()=>{window.__t0=performance.now();});return bag;}
const SIZES=[[360,640],[390,844],[1280,880],[1920,1080]];
(async()=>{
 const playwright=require('playwright'),server=await serve();if(OUT)fs.mkdirSync(OUT,{recursive:true});
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--font-render-hinting=none','--autoplay-policy=no-user-gesture-required']});
 try{
  const save=await finalSave(browser);check('a D30 FINAL with three eligible members is reached',!!save);if(!save)return;
  const cases=[];for(const k of [1,2,3])for(const o of ['clear','close','wide'])cases.push([[390,844],k,o]);
  for(const size of [[360,640],[1280,880],[1920,1080]])cases.push([size,3,'clear'],[size,1,'close']);
  for(const [size,k,o] of cases){const tag=`${size.join('x')} ${k}명 ${o}`;
   const vid=VIDEO&&OUT&&size[0]===390||VIDEO&&OUT&&size[0]===1280?path.join(OUT,'video'):null;
   const {c,p}=await open(browser,save,size,true,vid);
   const bag=await depart(p,k,o),items=bag.reduce((a,b)=>a+b,0);
   // read the scene just before the first lunge: the party has risen and every bag is filled
   const lunge=C.dim+C.drop+C.presence+C.rise+(k-1)*C.stagger+C.settle+(items?items*C.item+C.supplied:0);
   await p.waitForFunction(ms=>performance.now()-window.__t0>=ms,lunge-120,{timeout:15000});
   const m=await p.evaluate(()=>{const R=e=>{const q=e.getBoundingClientRect();return {x:q.left,y:q.top,r:q.right,b:q.bottom};};
    const sc=document.querySelector('.clash'),st=document.querySelector('.stage.p-final');if(!sc)return null;
    const parts=[...sc.querySelectorAll('.clash-boss,.clash-card')].map(R),text=[...sc.querySelectorAll('.clash-boss b,.clash-card b')].map(e=>e.textContent).join(' ');
    return {stage:R(st),scene:R(sc),parts,vw:innerWidth,vh:innerHeight,text,
     inert:[...st.children].filter(e=>e!==sc).every(e=>e.inert),cards:sc.querySelectorAll('.clash-card').length,
     got:[...sc.querySelectorAll('.clash-card')].map(c=>[...c.querySelectorAll('.got')].filter(g=>+getComputedStyle(g).opacity>.95).length),
     marks:sc.querySelectorAll('.clash-bar i').length};});
   check(tag+' the scene stands over the FINAL stage, the stage under it inert',!!m&&m.inert&&m.scene.x<=m.stage.x+.5&&m.scene.r>=m.stage.r-.5);
   if(m){check(tag+' one card per member',m.cards===k,String(m.cards));
    const off=m.parts.filter(q=>q.x<m.stage.x-.5||q.r>m.stage.r+.5||q.y<-.5||q.b>m.vh+.5);
    check(tag+' the cards stand inside the stage and the screen',!off.length,JSON.stringify(off));
    check(tag+' no figure on the scene (names only; the Lv is on the members)',!/\d/.test(m.text),m.text);
    check(tag+' each member is handed exactly what they carried',JSON.stringify(m.got)===JSON.stringify(bag),JSON.stringify(m.got));
    check(tag+' the bar is the red alone: no amount is marked on it',m.marks===1,String(m.marks));}
   await p.waitForFunction(()=>!!document.querySelector('.stage.p-end'),null,{timeout:25000}).catch(()=>{});
   await p.waitForTimeout(600);
   // the capture is of the ending it lands on: a capture mid-scene would hold its frames back and skew the readings
   if(OUT&&!vid)await p.screenshot({path:path.join(OUT,`clash-end-${size.join('x')}-${k}-${o}.png`)});
   const r=await p.evaluate(()=>({cues:window.__cues.map(([k,t])=>[k,Math.round(t-window.__t0)]),bar:window.__bar.map(([t,v,ck])=>[Math.round(t-window.__t0),v,ck]),
    end:!!document.querySelector('.stage.p-end'),seal:!!document.querySelector('.end-tape .seal'),scene:!!document.querySelector('.clash'),
    win:Guild24.game.run.win,d:Guild24.game.run.bossDebug}));
   const names=r.cues.map(x=>x[0]).filter(x=>x!=='final'&&x!=='unlock');   // the press's own cues (an unlock is sounded when credited)
   const want=['rumble',...Array.from({length:items},()=>'supply'),...Array.from({length:k},()=>['clash','counter']).flat(),...(o==='clear'?['collapse']:[]),o==='clear'?'sealwin':'sealfail'];
   /* User 2026-09-29 (UI_UX §ENDING CUE): the ending's result cue rides the seal's landing, 150 ms behind it on the audio
      clock - it is asked for in the same frame, so it may be logged just before or after the seal */
   const endCue=o==='clear'?'endwin':'endfail',rest=names.filter(x=>x!==endCue);
   check(tag+' the supply, one item at a time; each member lunges and the Boss counters every time; the verdict; the seal',JSON.stringify(rest)===JSON.stringify(want),names.join(' '));
   check(tag+' the ending cue plays once, with the seal',names.filter(x=>x===endCue).length===1&&Math.abs(names.indexOf(endCue)-names.indexOf(want.at(-1)))===1,names.join(' '));
   check(tag+' the outcome is the fixture',r.win===(o==='clear')&&Math.abs(r.d.assault/r.d.bossPower-RATIO[o])<.002,(r.d.assault/r.d.bossPower).toFixed(3));
   const left=o==='clear'?0:Math.max(.03,1-RATIO[o]),share=(1-left)/k,at=t=>{let v=1;for(const [tt,x] of r.bar)if(tt<=t)v=x;return v;};
   const counters=r.cues.filter(x=>x[0]==='counter').map(x=>x[1]),clashes=r.cues.filter(x=>x[0]==='clash').map(x=>x[1]);
   // the red never drops at an impact: right after each clash the bar still reads the level before it
   const hold=clashes.map((t,i)=>[at(t+80),1-i*share]);
   check(tag+' the red does not drop at an impact',hold.every(([v,w])=>Math.abs(v-w)<.02),JSON.stringify(hold.map(([v,w])=>v.toFixed(3)+'/'+w.toFixed(3))));
   // after each counter but the last the red has dropped to the member's mark; at the last one it has not moved yet
   const after=counters.map((t,i)=>[at(t+800),i===k-1?1-(k-1)*share:1-(i+1)*share]);
   check(tag+' the red drops after each counter, the last only after the stillness',after.every(([v,w])=>Math.abs(v-w)<.02),JSON.stringify(after.map(([v,w])=>v.toFixed(3)+'/'+w.toFixed(3))));
   // the verdict hesitates near the bottom: 5% on a clear, where the roll left it on a failure
   const edge=o==='clear'?C.edge:left,mid=counters[k-1]+(C.counter-C.strikeAt)+C.wait+C.run+C.hesitate/2;
   check(tag+' the verdict hesitates near the bottom before it breaks or stays',Math.abs(at(mid)-edge)<.015,at(mid).toFixed(3)+'/'+edge.toFixed(3));
   // v3.0 prep §2-4-5: on a clear the crack shows only once the red has run out, never a frame before it
   if(o==='clear'){const f=r.bar.find(([,,ck])=>ck>.05);
    check(tag+' the crack shows only after the bar is empty',!!f&&f[1]<.01,f?'bar '+f[1].toFixed(3)+' at the first crack frame':'no crack');}
   const rise=r.bar.findIndex(([,v],i)=>i&&v>r.bar[i-1][1]+.003);
   check(tag+' the bar only ever falls',rise<0,rise<0?'':JSON.stringify(r.bar.slice(rise-1,rise+1)));
   const last=r.bar.length?r.bar[r.bar.length-1][1]:NaN;
   check(tag+' the bar ends at the resolved ratio ('+(o==='clear'?'empty':'at least 3% left')+')',Math.abs(last-left)<.015&&(o==='clear'?last<.01:last>=.029),last.toFixed(3));
   const seal=r.cues.find(x=>/^seal/.test(x[0]));
   check(tag+' the ending and its seal follow the scene',r.end&&r.seal&&!r.scene&&!!seal,seal?seal[1]+' ms':'none');
   const file=vid&&await p.video()?.path();await c.close();
   if(file)fs.renameSync(file,path.join(vid,`clash-${size.join('x')}-${k}-${o}.webm`));}
  // a tap mid-scene, a reload mid-scene, reduced motion, and the save
  {const {c,p}=await open(browser,save,[390,844],true);await depart(p,3,'close');await p.waitForTimeout(1500);
   await p.click('.clash',{position:{x:30,y:300}});await p.waitForTimeout(80);
   const r=await p.evaluate(()=>({end:!!document.querySelector('.stage.p-end'),seal:!!document.querySelector('.end-tape .seal.lost'),scene:!!document.querySelector('.clash')}));
   check('a tap mid-scene lands on the same ending at once',r.end&&r.seal&&!r.scene);
   await p.waitForTimeout(500);check('the tap does not reach the ending under it',await p.evaluate(()=>!!document.querySelector('.stage.p-end')&&!document.querySelector('.stage.p-prep')));
   await c.close();}
  {const {c,p}=await open(browser,save,[390,844],true);await depart(p,2,'clear');await p.waitForTimeout(2000);
   check('nothing of the scene is in the save',await p.evaluate(()=>!Object.values(localStorage).some(v=>/clash/i.test(v||''))));
   await p.reload({waitUntil:'load'});await p.waitForTimeout(400);
   check('a reload mid-scene opens the ending',await p.evaluate(()=>!!document.querySelector('.stage.p-end')&&!document.querySelector('.clash')&&Guild24.game.run.win===true));
   await c.close();}
  {const {c,p}=await open(browser,save,[390,844],false);await depart(p,3,'clear');await p.waitForTimeout(120);
   check('reduced motion shows no scene: the ending at once',await p.evaluate(()=>!!document.querySelector('.stage.p-end')&&!document.querySelector('.clash')));
   await c.close();}
 }finally{await browser.close();server.kill();
  const failed=results.filter(x=>!x).length;console.log((results.length-failed)+'/'+results.length+' PASS');process.exitCode=failed?1:0;}
})().catch(e=>{console.error(e);process.exit(1);});
