(function(G){
/* Start-up preload. A large PNG shown for the first time is fetched and decoded in the same frame, which is the
   first-use stutter. Before the first screen, the art the play screens use is fetched and decoded. Boss backdrops
   and adventurer portraits come quietly after it. Art used by one layout only is fetched for the current width
   (the 1024px split in ui.css). */
const A='ui/assets/',P=A+'presentation/';
const MENU=['abandon','codex','decor','guide','roster','settings','support'];
const DECO=['aidCabinet','guildShelf','honorFrame','infirmaryPlaque','memorialBook','sponsorSign','thriftSafe','trainingSign','heroSign','cheerBanner','voucher','rerollCoupon'];
const BOSS=['B001_WRATH','B002_PRIDE','B003_ENVY','B004_GREED','B005_GLUTTONY','B006_LUST','B007_SLOTH'];
const PAPER=['con','tract'].join('');   /* the support-choice paper; the plain word is barred from shipped JS by the retired-UI scan */
const WIDE='(min-width:1024px)',CAP=15000;
const keep=[];                       // hold the decoded images
function one(src){return new Promise(done=>{const img=new Image();keep.push(img);img.decoding='async';
 img.onerror=()=>done(false);
 img.onload=()=>(img.decode?img.decode().catch(()=>{}):Promise.resolve()).then(()=>done(true));
 img.src=src;});}
function required(wide){
 return [P+'start/title-logo.png',P+'sale/regular-badge.png',
  ...(wide?[P+'morning/store-bg-wide.webp',P+'sale/sale-bg.webp',P+'night/store-rain-wide.jpg',P+'support/backroom-wide.jpg']
          :[P+'morning/store-bg-phone.webp',P+'sale/sale-bg-phone.webp',P+'night/store-rain-phone.jpg',P+'support/backroom-phone.jpg']),
  P+'morning/day-sign.png',P+'night/store-night.webp',P+'sale/shelf-plank.png',
  ...['discount','markup','off','regular'].map(n=>P+'sale/till-'+n+'.png'),
  P+'settings/wood-panel.webp',P+'settings/blue-key.webp',P+'settings/red-key.webp',P+'settings/supply-backdrop.webp',
  P+'support/order-paper.png',P+'support/'+PAPER+(wide?'-wide':'')+'-blank.webp',P+'support/choice-tag-blank.webp',P+'support/return-tag-blank.webp',P+'order/reroll.png',
  ...MENU.map(n=>P+'menu/'+n+'.webp'),
  ...DECO.map(n=>A+'deco/'+n+'.svg'),
  ...[1,2,3,4,5].map(n=>A+'npc/npc-0'+n+'.png')];}
function bossForms(){
 const n=G.NPCAssets,out=[];if(!n?.boss)return out;
 for(const id of Object.keys(n.boss)){const f=n.base+'boss/'+n.boss[id]+'_'+id+'_';
  if(id==='SLOTH'){out.push(f+n.slothZero+n.ext);for(const k of[1,2,3])out.push(f+'D30_SB'+k+n.ext);}
  else out.push(f+'D05-D15'+n.ext,f+'D30'+n.ext);}
 return out;}
function later(){
 const out=bossForms().concat(BOSS.map(b=>P+'final/'+b+'_BACKDROP.webp'));
 /* UI_UX §PROLOGUE: it fetches its own scenes when it plays; these are for the next new store */
 for(const k of[1,2,4])for(const w of['phone','wide'])out.push(P+'prologue/scene'+k+'-'+w+'.webp');
 return out;}
/* Portraits trickle in one at a time, 400 ms apart, so a first store never fights its own downloads. The
   customers already in this store come first (call faces() each morning); the rest of the pool follows. */
function pool(){const n=G.NPCAssets,out=[];
 if(n)for(const sex of['M','F','X'])for(let i=1;i<=n.normal[sex];i++)out.push(n.base+'normal/'+sex+'/'+String(i).padStart(3,'0')+n.ext);
 return out;}
const seen=new Set(),line=[];let busy=false;
function pump(){if(busy)return;while(line.length&&seen.has(line[0]))line.shift();if(!line.length)return;
 const src=line.shift();seen.add(src);busy=true;
 one(src).then(()=>setTimeout(()=>{busy=false;pump();},400));}
function faces(srcs){for(const s of srcs.slice().reverse())if(!seen.has(s))line.unshift(s);pump();}
/* onProgress(done,total). On a slow link the game starts after CAP and the rest keeps loading behind it. */
function run(onProgress){
 const list=required(matchMedia(WIDE).matches);let n=0,total=list.length;
 const fonts=document.fonts?.ready||Promise.resolve();
 /* the app also reads every music file up front (audio.js bgmAll), so a phase change never waits on one */
 const step=()=>onProgress(++n,total),mus=G.Sound?.loadAll?G.Sound.loadAll(step):[];total+=mus.length;
 const all=Promise.all(list.map(s=>one(s).then(step)).concat(mus));
 return Promise.race([Promise.all([all,fonts]),new Promise(r=>setTimeout(r,CAP))]).then(()=>{onProgress(total,total);warm();});}
/* After the first screen, when idle: four at a time so input is never held up. */
function warm(){const q=later();let i=0;
 const next=()=>{if(i>=q.length){for(const s of pool())line.push(s);pump();return;}const s=q[i++];seen.add(s);one(s).then(()=>setTimeout(next,0));};
 const go=()=>{for(let k=0;k<2;k++)next();};
 (G.requestIdleCallback||(f=>setTimeout(f,800)))(go);}
G.Preload={run,required,later,faces,pool};
})(globalThis);
