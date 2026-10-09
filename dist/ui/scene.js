/* GUILD24 scene assets — the store itself, drawn as pixel art.
   These are presentation assets, not gameplay: a room built out of horizontal bands so the
   screen is a place first and the interface attaches to its surfaces. Every band slices
   horizontally, so 360 / 390 / 430 crop the same room instead of scaling a picture.
   Authored locally on the project's own 4px grid — no external asset, no external request. */
(function(G){
const r=(x,y,w,h,f,o='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${o?' '+o:''}/>`;
const svg=(w,h,body,cls,anchor='xMidYMid')=>`<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${anchor} slice" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
const rng=n=>{let s=n*2654435761%2147483647;return()=>(s=s*48271%2147483647)/2147483647;};

/* ---- ceiling / back wall / counter: empty frames -------------------------------------------
   The production backdrop (assets/presentation/morning/store-bg-*.png) draws the whole room, and these
   bands' own art is hidden on MORNING and the preparation scene (director-review.css). The ceiling and
   counter frames still size their mounts (the DAY sign and the till anchor to them), so they keep their
   viewBox and aspect; the wall frame keeps its own. */
function ceiling(){return svg(360,92,'','band-art');}
function wall(){return svg(360,250,'','band-art','xMidYMax');}
function counter(){return svg(360,90,'','band-art');}
/* ---- Decorations: one authored picture per Decoration --------------------------------
   UI_UX_v2.8 §LIVE STORE. Each Decoration is a pixel-art SVG asset file under
   assets/deco/ (User 2026-09-24: authored art, not drawing code). They are drawn on the
   painted room's palette with a dark outline, so an equipped Decoration reads as a fitting of
   this store. No <text> in the files: the name is read in 점포 관리. The picture resolves through
   slot() like every other scene asset, so replacing a file changes no screen. */
const DECO_IDS=['sponsorSign','guildShelf','thriftSafe','honorFrame','trainingSign','infirmaryPlaque','memorialBook','aidCabinet','heroSign','cheerBanner','voucher','rerollCoupon'];
const decoArt=Object.fromEntries(DECO_IDS.map(id=>[id,'ui/assets/deco/'+id+'.svg']));
function decoration(id){if(!decoArt[id])return '';manifest['deco.'+id]??=decoArt[id];return slot('deco.'+id,()=>'','deco-art');}
/* ---- a cardboard stock box that holds an item pictogram ---- */
function crate(inner,size=48){
 return `<span class="crate-art" style="--sz:${size}px"><svg viewBox="0 0 48 48" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">`
 +r(2,8,44,36,'#b98549')+r(2,8,44,5,'#d0a163')+r(2,39,44,5,'#96683a')
 +r(2,20,44,4,'#a0703c')+r(20,8,8,36,'#a97b41')
 +`</svg><span class="crate-in">${inner}</span></span>`;
}
/* ---- a punched price tag on a string ---- */
function priceTag(text,tone='sign'){
 return `<span class="tag-art tone-${tone}"><svg viewBox="0 0 78 32" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">`
 +`<path d="M13 0H78V32H13L0 16Z" fill="currentColor"/>`+r(7,13,5,5,'#00000059')
 +`</svg><b>${text}</b></span>`;
}
/* ---- hazard pictograms: one sign per canonical Hazard, readable at 20px ---- */
function hazardIcon(key,size=20){
 const c='currentColor';let s='';
 if(key==='poison')s=r(8,2,4,4,c)+r(6,6,8,4,c)+r(4,10,12,8,c)+r(7,12,3,3,'#0000')+r(9,9,2,2,'#00000080')+r(6,13,2,2,'#00000080')+r(12,13,2,2,'#00000080');
 if(key==='bind')s=r(2,4,6,4,c)+r(2,12,6,4,c)+r(12,4,6,4,c)+r(12,12,6,4,c)+r(8,8,4,4,c)+r(6,6,2,2,c)+r(12,6,2,2,c)+r(6,12,2,2,c)+r(12,12,2,2,c);
 if(key==='corrosion')s=r(6,2,8,3,c)+r(4,5,12,6,c)+r(6,11,3,4,c)+r(11,11,3,6,c)+r(8,15,2,3,c);
 if(key==='mire')s=r(2,10,16,3,c)+r(4,13,12,3,c)+r(6,4,3,6,c)+r(11,2,3,8,c)+r(2,16,16,2,c);
 if(key==='fire')s=r(9,2,3,4,c)+r(7,6,6,3,c)+r(5,9,10,5,c)+r(4,14,12,4,c)+r(8,10,4,6,'#00000047');
 if(key==='fear')s=r(5,2,10,12,c)+r(3,5,2,6,c)+r(15,5,2,6,c)+r(7,6,2,3,'#00000080')+r(11,6,2,3,'#00000080')+r(6,15,8,3,c)+r(8,10,4,2,'#00000080');
 if(key==='dark')s=r(4,2,12,3,c)+r(2,5,3,10,c)+r(15,5,3,10,c)+r(4,15,12,3,c)+r(7,7,6,6,c);
 if(key==='cold')s=r(9,1,3,18,c)+r(1,9,18,3,c)+r(4,4,3,3,c)+r(13,4,3,3,c)+r(4,13,3,3,c)+r(13,13,3,3,c);
 if(key==='whiteout')s=r(1,3,18,3,c)+r(3,8,14,3,c)+r(1,13,18,3,c)+r(6,3,3,13,'#00000047');
 if(!s)s=r(5,5,10,10,c);
 return `<svg class="hz-icon" width="${size}" height="${size}" viewBox="0 0 20 20" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}


/* ---- customer cards ----------------------------------------------------------
   NPC art is an immutable payload: an approximately square transparent PNG holding a
   character plus their own lifestyle vignette. The card never crops or distorts it —
   the art is contained, so hair, props and the vignette all survive whatever margins a
   given sticker happens to have. Production art drops into npcPool (or a manifest that
   replaces it) with no layout work; the card layers stay independent of the image. */
const npcPool=['ui/assets/npc/npc-01.png','ui/assets/npc/npc-02.png','ui/assets/npc/npc-03.png',
               'ui/assets/npc/npc-04.png','ui/assets/npc/npc-05.png'];
/* A customer's portrait is their name. The production pool binds each name to one
   gender folder and slot, so the address is derived rather than stored: nothing per-NPC
   has to be saved, and a save carried forward cannot point at a slot that moved.
   Scene.manifest still overrides by NPC id, which is how a fixed identity (an Easter
   portrait) is bound without giving the pool a second addressing rule. */
function npcArt(n){
 if(!n)return null;
 const override=manifest['npc.'+n.id];
 if(override)return override;
 const A=G.NPCAssets,at=G.Adventurer?.portraitOf(n.name);
 if(A&&at)return A.base+'normal/'+at.gender+'/'+String(at.slot).padStart(3,'0')+A.ext;
 return npcPool.length?npcPool[Math.abs(n.appearance||0)%npcPool.length]:null;
}
/* One card back for every unrevealed customer. It carries the store's mark and nothing
   else: no silhouette, no colour, no rarity, no per-customer variation of any kind. */
function cardBack(){
 let s=r(0,0,120,150,'#2a2118')+r(4,4,112,142,'#3b2f21')+r(8,8,104,134,'#241c14');
 for(let y=14;y<138;y+=12)for(let x=14;x<108;x+=12)s+=r(x,y,4,4,'#2f2618');
 s+=r(26,54,68,42,'#4a3b28')+r(30,58,60,34,'#2a2118');
 s+=`<path d="M44 66H76L58 88Z" fill="#8a7038"/>`+r(44,62,32,3,'#8a7038');
 s+=r(4,4,112,3,'#54432d')+r(4,143,112,3,'#161009');
 return `<svg class="back-art" viewBox="0 0 120 150" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}
/* A short back-wall strip: enough store to place the counter, never competing with the customer. */
function shelfStrip(seed=3){
 const rd=rng(seed);let s=r(0,0,360,64,'#c6bda8');
 for(let y=-6;y<64;y+=18)for(let x=0;x<360;x+=24)s+=r(x,y,23,17,((x/24)+((y+6)/18))%2?'#cbc3ae':'#c2b9a4');
 const goods=['#d9a05e','#c0705c','#8fb4a0','#d8c98a','#a58bbd','#7fa8c4'];
 for(const [x0,w] of [[6,120],[236,118]]){
  s+=r(x0,40,w,4,'#a8834f')+r(x0,44,w,3,'#7c5c34');
  for(let i=0;i*18<w-10;i++)s+=r(x0+4+i*18,20,13,20,goods[Math.floor(rd()*goods.length)])+r(x0+6+i*18,23,9,5,'#f0ead6');}
 /* a bracket lamp over the waiting line — light, not signage: the customer owns the wall */
 s+=r(216,0,4,9,'#4a3a24')+r(200,9,36,5,'#6b5029')+r(203,14,30,9,'#f2d999')+r(206,23,24,4,'#d0a960');
 for(let i=0;i<6;i++)s+=r(198-i*5,27+i*6,40+i*10,6,i<2?'#ffe6ad26':'#ffe6ad12');
 s+=r(0,58,360,6,'#a2977f');
 return svg(360,64,s,'band-art','xMidYMax');
}
/* A return tag on the rail: one per adventurer who went out today. It says nothing about
   the result until that beat is reached — only which one is being read now. */
function returnTag(state){
 const face=state==='now'?'#efdfb4':state==='done'?'#6b5b3f':'#332c20';
 const ink=state==='now'?'#2a2118':'#0f0c07';
 let s=r(0,0,14,2,'#6b5029')+r(6,2,2,4,'#8a7038');
 s+=r(1,6,12,18,face)+r(1,6,12,2,'#ffffff33')+r(1,22,12,2,'#00000066');
 s+=r(4,11,6,2,ink)+r(4,15,4,2,ink);
 if(state==='now')s+=r(0,5,14,1,'#ffe6ad')+r(0,24,14,1,'#00000080');
 return `<svg class="tag-art" viewBox="0 0 14 25" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}

/* ---- Boss art ----------------------------------------------------------------
   The Boss is a game object in its own right, so it resolves the same way a portrait
   does: from the Run state, never from a stored filename. Day comes first. Six Bosses
   wear their battle form only on the last day; SLOTH wears its base form until then no
   matter how many seals are already strengthened, and on D30 shows a form that wakes as seals are
   left unstrengthened (3 held = base form, 0 held = SB3). There is no D30 SB0 art and none is needed
   (BOSS: `Gameplay truth is bossId + sealBreakCount, not an asset filename`). */
function bossArt(bossId,day,sealBreakCount){
 const a=G.NPCAssets,prefix=a&&a.boss&&a.boss[bossId];
 if(!prefix)return null;
 const awake=3-(sealBreakCount||0);   // 봉인 강화 count: the more seals held, the deeper the sleep
 const form=bossId!=='SLOTH' ? (day>=30?'D30':'D05-D15')
   : (day<30||awake<1 ? a.slothZero : 'D30_SB'+awake);
 return a.base+'boss/'+prefix+'_'+bossId+'_'+form+a.ext;
}

/* ---- asset slots -------------------------------------------------------------
   Every scene asset resolves through slot(), so a production PNG/SVG can replace a
   procedural one later by registering it in Scene.manifest without touching any screen.
   Nothing is registered yet: the procedural asset is the current art. */
const manifest={};   /* e.g. manifest['store.wall']='assets/store-wall.png' */
function slot(name,fallback,cls='band-art'){
 const file=manifest[name];
 return file?`<img class="${cls}" src="${file}" alt="" aria-hidden="true">`:fallback();
}

/* Where the interface may sit on the art, as a percentage of each band. Published with
   the art so a production replacement only has to restate these, never touch a screen. */
const anchors={
 daysign:{band:'ceiling',left:31.1,top:65.2,width:37.8,height:34.8},
 tillLabel:{band:'counter',left:15,top:11.1,width:70,height:15.6},
 till:{band:'counter',left:17.5,top:31.1,width:65,height:33.3}
};
const anchorStyle=name=>{const a=anchors[name];return 'left:'+a.left+'%;top:'+a.top+'%;width:'+a.width+'%;height:'+a.height+'%';};
G.Scene={ceiling:()=>slot('store.ceiling',ceiling),wall:()=>slot('store.wall',wall),counter:()=>slot('store.counter',counter),
 crate,priceTag,hazardIcon,manifest,slot,anchors,anchorStyle,decoration,decoArt,
 npcArt,npcPool,bossArt,cardBack,shelfStrip,returnTag};
})(globalThis);
