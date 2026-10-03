(function(G){
/* Start-up preload. A large PNG shown for the first time is fetched and decoded in the same frame, which is the
   first-use stutter. Before the first screen, the art the play screens use is fetched and decoded. Boss backdrops
   and adventurer portraits come quietly after it. Art used by one layout only is fetched for the current width
   (the 1024px split in ui.css). */
const A='ui/assets/',P=A+'presentation/';
const MENU=['abandon','codex','decor','guide','roster','settings','support'];
const DECO=['aidCabinet','guildShelf','honorFrame','infirmaryPlaque','memorialBook','sponsorSign','thriftSafe','trainingSign'];
const BOSS=['B001_WRATH','B002_PRIDE','B003_ENVY','B004_GREED','B005_GLUTTONY','B006_LUST','B007_SLOTH'];
const WIDE='(min-width:1024px)',CAP=15000;
const keep=[];                       // hold the decoded images
function one(src){return new Promise(done=>{const img=new Image();keep.push(img);img.decoding='async';
 img.onerror=()=>done(false);
 img.onload=()=>(img.decode?img.decode().catch(()=>{}):Promise.resolve()).then(()=>done(true));
 img.src=src;});}
function required(wide){
 return [P+'start/title-logo.png',P+'sale/regular-badge.png',
  ...(wide?[P+'morning/store-bg-wide.png',P+'sale/sale-bg.png',P+'night/store-rain-wide.jpg',P+'support/backroom-wide.jpg']
          :[P+'morning/store-bg-phone.png',P+'sale/sale-bg-phone.png',P+'night/store-rain-phone.jpg',P+'support/backroom-phone.jpg']),
  P+'night/store-night.png',P+'sale/shelf-plank.png',
  ...['discount','markup','off','regular'].map(n=>P+'sale/till-'+n+'.png'),
  P+'settings/wood-panel.png',P+'settings/blue-key.png',P+'settings/red-key.png',P+'settings/supply-backdrop.png',
  P+'support/order-paper.png',P+'support/choice-tag-blank.png',P+'support/return-tag-blank.png',
  ...MENU.map(n=>P+'menu/'+n+'.png'),
  ...DECO.map(n=>A+'deco/'+n+'.svg'),
  ...[1,2,3,4,5].map(n=>A+'npc/npc-0'+n+'.png')];}
function later(){
 const n=G.NPCAssets,out=BOSS.map(b=>P+'final/'+b+'_BACKDROP.png');
 if(n){for(const sex of['M','F'])for(let i=1;i<=n.normal[sex];i++)out.push(n.base+'normal/'+sex+'/'+String(i).padStart(3,'0')+n.ext);}
 return out;}
/* onProgress(done,total). On a slow link the game starts after CAP and the rest keeps loading behind it. */
function run(onProgress){
 const list=required(matchMedia(WIDE).matches),total=list.length;let n=0;
 const fonts=document.fonts?.ready||Promise.resolve();
 const all=Promise.all(list.map(s=>one(s).then(()=>onProgress(++n,total))));
 return Promise.race([Promise.all([all,fonts]),new Promise(r=>setTimeout(r,CAP))]).then(()=>{onProgress(total,total);warm();});}
/* After the first screen, when idle: four at a time so input is never held up. */
function warm(){const q=later();let i=0;
 const next=()=>{if(i>=q.length)return;const s=q[i++];one(s).then(()=>setTimeout(next,0));};
 const go=()=>{for(let k=0;k<4;k++)next();};
 (G.requestIdleCallback||(f=>setTimeout(f,800)))(go);}
G.Preload={run,required,later};
})(globalThis);
