// Control hygiene checks, shared by the QA harnesses (B5-2 closeout; meant to be reused by B5-3
// BOSS CONFIRM). Page-side expressions only - pass them to page.evaluate.
//
// AUDIT(scope, actionSel): every visible <button> under `scope`.
//   - each rendered text node must sit on ONE visual line (a deliberate <br> makes two text
//     nodes, so a designed two-part label is not a wrap; an incidental wrap is)
//   - the button does not clip its content (scrollWidth <= clientWidth) and stays inside the
//     viewport
//   - `actionSel` marks the Action buttons (strict); every other button is content and its
//     wraps are reported as wrap-risk rather than failed
// PAIR(sel): the two footer controls of one decision sheet - same geometry family (height,
//   width, corner, outline/bevel structure with colours masked, clip, type size), and no second
//   visible dismiss in the header.
const AUDIT=(scope,actionSel)=>`(()=>{
 const out={actions:[],content:[],fail:[],risk:[]};
 const vis=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 const linesOf=node=>{const r=document.createRange();r.selectNodeContents(node);
  const tops=[...r.getClientRects()].filter(x=>x.width>0.5).map(x=>Math.round(x.top));
  const uniq=[];for(const t of tops)if(!uniq.some(u=>Math.abs(u-t)<=3))uniq.push(t);return uniq.length;};
 for(const b of document.querySelectorAll(${JSON.stringify(scope)}+' button')){
  if(!vis(b))continue;
  const action=b.matches(${JSON.stringify(actionSel)});
  const label=b.innerText.replace(/\\s+/g,' ').trim().slice(0,40);
  const walker=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);let n,maxLines=0,wrapped=[];
  while((n=walker.nextNode())){if(!n.textContent.trim()||!n.parentElement||!vis(n.parentElement))continue;
   const l=linesOf(n);maxLines=Math.max(maxLines,l);if(l>1)wrapped.push(n.textContent.trim().slice(0,30));}
  const rc=b.getBoundingClientRect();
  const clip=b.scrollWidth>b.clientWidth+1,off=rc.left<-0.5||rc.right>innerWidth+0.5;
  const row={label,action,maxLines,wrapped,clip,off,disabled:b.disabled};
  (action?out.actions:out.content).push(row);
  if(action&&(wrapped.length||clip||off))out.fail.push(row);
  else if(!action&&(clip||off))out.fail.push(row);
  else if(!action&&wrapped.length)out.risk.push(row);
 }
 out.hscroll=document.documentElement.scrollWidth>innerWidth;
 return out;})()`;
const PAIR=`(()=>{const m=document.querySelector('#modal-root .modal');if(!m)return null;
 const f=[...m.querySelectorAll('.modal-footer button')].filter(b=>b.getClientRects().length);
 const shape=b=>{const c=getComputedStyle(b),r=b.getBoundingClientRect();const mask=s=>s.replace(/rgba?\\([^)]*\\)/g,'C');
  return {h:Math.round(r.height),w:Math.round(r.width),radius:c.borderRadius,border:c.borderStyle+' '+c.borderWidth,
   shadow:mask(c.boxShadow),clip:c.clipPath,font:c.fontSize+' '+c.fontFamily,cls:b.className};};
 const s=f.map(shape);
 const headerClose=[...m.querySelectorAll('.modal-header button')].filter(b=>b.getClientRects().length).map(b=>b.innerText.trim());
 const cancels=f.filter(b=>b.dataset.action==='dismiss').length;
 const same=s.length===2&&['h','w','radius','border','shadow','clip','font','cls'].every(k=>s[0][k]===s[1][k]);
 return {count:f.length,same,shapes:s,headerClose,cancels,labels:f.map(b=>b.innerText.trim())};})()`;
module.exports={AUDIT,PAIR};
