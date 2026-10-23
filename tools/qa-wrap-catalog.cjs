// Wrap audit over every catalogue string (MEASUREMENT ONLY, dev tool, never part of npm test).
// Renders each Hangul string of DATA (items, relics, decorations, events, jobs, traits, copy ...) alone in a box at several
// widths with the game's own body font and word-break, and lists the strings that break inside a (...) group, between a number
// and its unit, or leave a closing mark / one syllable alone on a line. It shows which texts could break badly on some screen;
// The game's own text glue (the MutationObserver in app.js) works on the boxes too. qa-text.cjs shows the breaks that really happen on the screens.
//   QA_OUT=<dir> node tools/qa-wrap-catalog.cjs [out.json]      QA_WRAP_WIDTHS=200,240,280,320,360,420  QA_WRAP_CSS=<css>
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const {ready}=require('./qa-ready.cjs');
const PORT=Number(process.env.QA_PORT||5198),OUT=process.argv[2]||path.resolve(process.env.QA_OUT||'/tmp/guild24-wrap','wrap-catalog.json');
const WIDTHS=(process.env.QA_WRAP_WIDTHS||'200,240,280,320,360,420').split(',').map(Number);
const AUDIT=async function(widths,css){
 const H=/[가-힣]/,seen=new Set(),res=[];const out=new Map();
 const strings=new Set();
 const walk=(v,d)=>{if(d>7||v==null)return;if(typeof v==='string'){if(/[가-힣]/.test(v)&&v.length>=10&&v.length<300)strings.add(v);}else if(typeof v==='object'&&!(v instanceof Node))for(const k of Object.keys(v)){try{walk(v[k],d+1);}catch(e){}}};
 walk(DATA,0);
 const st=document.createElement('style');st.textContent='#wrapbox{position:fixed;left:0;top:0;visibility:hidden;padding:0;margin:0;font:400 14px/1.5 var(--ui);word-break:keep-all;overflow-wrap:break-word;white-space:normal}'+(css||'');document.head.appendChild(st);
 const box=document.createElement('div');box.id='wrapbox';document.body.appendChild(box);const r=document.createRange();
 for(const text0 of strings){const bad=new Set();
  for(const w of widths){box.style.width=w+'px';box.textContent=text0;await Promise.resolve();const n=box.firstChild,text=n.nodeValue;let prev=null,lines=[''];
   for(let i=0;i<text.length;i++){r.setStart(n,i);r.setEnd(n,i+1);const rc=r.getClientRects();if(!rc.length)continue;const top=Math.round(rc[0].top);
    if(prev!==null&&top>prev+3){const before=text.slice(0,i).replace(/\s+$/,''),after=text.slice(i).replace(/^\s+/,'');
     const depth=(before.match(/[(\[「『]/g)||[]).length-(before.match(/[)\]」』]/g)||[]).length;
     if(H.test(text[i-1])&&H.test(text[i]))bad.add('midword@'+w);
     else if(depth>0)bad.add('paren@'+w+':'+text.slice(Math.max(0,i-6),i)+'|'+text.slice(i,i+6));
     else if(/[0-9]$/.test(before)&&/^(G|명|일|개|판|회|번|종|장|칸|%|원|단|Lv|HP|배)/.test(after))bad.add('numunit@'+w);
     else if(/^[)\].,;:!?」』%]/.test(after))bad.add('punctstart@'+w);
     lines.push('');}
    lines[lines.length-1]+=text[i];prev=top;}
   const last=lines[lines.length-1].trim();if(lines.length>1&&last.length===1&&H.test(last))bad.add('orphan@'+w);}
  if(bad.size)res.push({text:text0,bad:[...bad]});}
 return {total:strings.size,res};
};
(async()=>{
 const srv=spawn('node',[path.join(__dirname,'preview.cjs'),'--port',PORT],{stdio:'ignore'});await new Promise(r=>setTimeout(r,800));
 const {chromium}=require('playwright');
 const b=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium'});
 const page=await(await b.newContext({viewport:{width:384,height:832}})).newPage();
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await ready(page);
 const {total,res}=await page.evaluate(`(${AUDIT.toString()})(${JSON.stringify(WIDTHS)},${JSON.stringify(process.env.QA_WRAP_CSS||'')})`);
 fs.mkdirSync(path.dirname(OUT),{recursive:true});fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 const by={};for(const x of res)for(const k of new Set(x.bad.map(s=>s.split('@')[0])))by[k]=(by[k]||0)+1;
 console.log('WRAP CATALOG',total,'strings',JSON.stringify(by),'->',OUT);
 await b.close();srv.kill();
})();
