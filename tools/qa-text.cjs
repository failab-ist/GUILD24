// Text layout audit (User 2026-09-28, v3.0 polish): where does Korean text break badly? MEASUREMENT ONLY, dev tool.
// It reuses tools/qa-visual.cjs's own drive (loaded in memory with one hook added at its capture step, the file on disk
// untouched) and, on every screen x width, measures each visible character's line box to find:
//   midword  a line break between two Hangul syllables of one word        (e.g. `붕대 / 가`)
//   midtoken a line break inside a number / Latin token                      (e.g. `+50 / G`)
//   orphan   a paragraph whose last line is a single syllable
//   button   a control label that wraps to a second line
//   clipped  text cut by its box (overflow hidden and wider content)
//   spill    text wider than its own box and drawn past it (overflow visible)
// The Event screen also cycles all Events and the Store Support screen all supports, so every catalogue text is seen.
//   hscroll  the page scrolls sideways (checked after QA_TEXT_CSS is applied)
// QA_TEXT_CSS=<css> injects a trial stylesheet before the audit (e.g. a global keep-all) - the game files stay untouched.
//   QA_OUT=<dir> node tools/qa-text.cjs [out.json]       (widths via QA_WIDTHS like qa-visual)
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const OUTJSON=process.argv[2]||path.resolve(process.env.QA_OUT||'/tmp/guild24-qa-text','text-audit.json');
process.env.QA_OUT=process.env.QA_OUT||'/tmp/guild24-qa-text';
const AUDIT=function(){
 const out=[],H=/[가-힣]/,T=/[0-9A-Za-z%+.,]/,seen=new Set(),r=document.createRange();
 const visible=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;}
  const b=el.getBoundingClientRect();return b.width>0&&b.height>0&&b.bottom>0&&b.top<innerHeight*3;};
 const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while((n=tw.nextNode())){const t=n.nodeValue;if(!t||!/\S/.test(t))continue;const el=n.parentElement;if(!el||!visible(el))continue;
  let prev=null,line='',lines=[];
  for(let i=0;i<t.length;i++){r.setStart(n,i);r.setEnd(n,i+1);const rc=r.getClientRects();if(!rc.length)continue;const top=Math.round(rc[0].top);
   if(prev!==null&&top>prev+3){const a=t[i-1],b=t[i],ctx=t.slice(Math.max(0,i-10),i)+' ⏎ '+t.slice(i,i+10);
    if(H.test(a)&&H.test(b))out.push({kind:'midword',ctx});else if(T.test(a)&&T.test(b))out.push({kind:'midtoken',ctx});
    lines.push(line);line='';}
   line+=t[i];prev=top;}
  lines.push(line);
  const last=lines[lines.length-1].trim();
  if(lines.length>1&&last.length===1&&H.test(last))out.push({kind:'orphan',ctx:t.slice(-14)});
  if(lines.length>1&&el.closest('button,[role=button]'))out.push({kind:'button',ctx:t.trim().slice(0,24)});}
 for(const el of document.querySelectorAll('body *')){if(!el.childNodes.length||!visible(el))continue;const cs=getComputedStyle(el);
  if(['hidden','clip'].includes(cs.overflowX)&&el.scrollWidth>el.clientWidth+1&&/\S/.test(el.textContent)&&el.children.length<3)
   out.push({kind:'clipped',ctx:el.textContent.trim().replace(/\s+/g,' ').slice(0,30)});
  else if(cs.overflowX==='visible'&&[...el.childNodes].some(c=>c.nodeType===3&&/\S/.test(c.nodeValue))&&el.scrollWidth>el.clientWidth+1&&el.clientWidth>0&&cs.display!=='inline')
   out.push({kind:'spill',ctx:el.textContent.trim().replace(/\s+/g,' ').slice(0,30)});}
 return out.filter(x=>{const k=x.kind+'|'+x.ctx;if(seen.has(k))return false;seen.add(k);return true;});
};
const found=[];
globalThis.__qaTextHook=async(page,width,screen)=>{
 const rec=list=>{for(const x of list)found.push({screen,width,...x});};
 if(process.env.QA_TEXT_CSS)await page.evaluate(css=>{let s=document.getElementById('qa-text-css');if(!s){s=document.createElement('style');s.id='qa-text-css';document.head.appendChild(s);}s.textContent=css;},process.env.QA_TEXT_CSS);
 if(process.env.QA_TEXT_CSS)await page.screenshot({path:path.join(process.env.QA_OUT,screen+'-'+width+'-css.png'),fullPage:false});
 const hs=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(hs>1)found.push({screen,width,kind:'hscroll',ctx:'page +'+hs+'px'});
 rec(await page.evaluate(AUDIT));
 if(screen==='event')for(const id of await page.evaluate(()=>DATA.events.map(e=>e.id))){
  await page.evaluate(id=>{const s=Guild24.game.run;s.event=DATA.events.find(e=>e.id===id);s.eventSeen=false;Guild24.render();},id);
  await page.waitForTimeout(60);const l=await page.evaluate(AUDIT);for(const x of l)found.push({screen:'event:'+id,width,...x});}
 if(screen==='relic'){const ids=await page.evaluate(()=>DATA.relics.map(r=>r.id));
  for(let i=0;i<ids.length;i+=3){await page.evaluate(g=>{const w=Guild24.game.run.relicWindow;if(!w)return;w.candidateIds=g;w.candidatePrices=g.map(id=>DATA.relicBy[id].price);Guild24.render();},ids.slice(i,i+3));
   await page.waitForTimeout(60);const l=await page.evaluate(AUDIT);for(const x of l)found.push({screen:'relic:'+ids.slice(i,i+3).join(','),width,...x});}}
};
let src=fs.readFileSync(path.join(__dirname,'qa-visual.cjs'),'utf8');
const hookAt="    results.push({screen,width,fails,warn});";
if(src.split(hookAt).length!==2)throw Error('qa-visual.cjs capture step moved - update the hook');
src=src.replace(hookAt,hookAt+"\n    await globalThis.__qaTextHook(page,width,screen);");
process.on('exit',()=>{fs.mkdirSync(path.dirname(OUTJSON),{recursive:true});fs.writeFileSync(OUTJSON,JSON.stringify(found,null,1));
 const by={};for(const f of found)by[f.kind]=(by[f.kind]||0)+1;console.log('TEXT AUDIT',JSON.stringify(by),'->',OUTJSON);});
vm.runInThisContext(require('node:module').wrap(src))(exports,require,module,path.join(__dirname,'qa-visual.cjs'),__dirname);
