/* GUILD24 scene assets — the store itself, drawn as pixel art.
   These are presentation assets, not gameplay: a room built out of horizontal bands so the
   screen is a place first and the interface attaches to its surfaces. Every band slices
   horizontally, so 360 / 390 / 430 crop the same room instead of scaling a picture.
   Authored locally on the project's own 4px grid — no external asset, no external request. */
(function(G){
const r=(x,y,w,h,f,o='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${o?' '+o:''}/>`;
const svg=(w,h,body,cls,anchor='xMidYMid')=>`<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${anchor} slice" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
const rng=n=>{let s=n*2654435761%2147483647;return()=>(s=s*48271%2147483647)/2147483647;};

/* ---- ceiling: shutter still down, panel lights, the shop sign the DAY hangs on ---- */
function ceiling(){
 let s=r(0,0,360,92,'#20262b');
 for(let y=0;y<26;y+=6)s+=r(0,y,360,4,'#3b444c')+r(0,y+4,360,2,'#232a30');
 s+=r(0,26,360,3,'#141a1f');
 for(let x=0;x<360;x+=46)s+=r(x,29,44,22,'#2b3238')+r(x,51,44,2,'#1a2025');
 s+=r(24,35,108,8,'#f2e7c2')+r(24,43,108,2,'#8d8467')
  +r(228,35,108,8,'#f2e7c2')+r(228,43,108,2,'#8d8467');
 s+=r(126,53,3,8,'#4d5157')+r(231,53,3,8,'#4d5157');
 s+=r(112,60,136,32,'#2f7a4d')+r(112,60,136,4,'#7ddc9f')+r(112,88,136,4,'#12301f');
 return svg(360,92,s,'band-art');
}
/* ---- back wall: store fixtures top to bottom, anchored to the counter ---- */
function wall(seed=7){
 const rd=rng(seed);
 let s=r(0,0,360,250,'#c6bda8');
 for(let y=-6;y<250;y+=18)for(let x=0;x<360;x+=24)s+=r(x,y,23,17,((x/24)+((y+6)/18))%2?'#cbc3ae':'#c2b9a4');
 // air handler
 s+=r(16,10,92,34,'#dfe0d8')+r(16,10,92,4,'#f2f3ec')+r(16,40,92,4,'#a8aaa2');
 for(let i=0;i<6;i++)s+=r(22+i*15,18,10,18,'#b9bcb4');
 // wall clock
 s+=r(166,12,34,34,'#3b4249')+r(170,16,26,26,'#eef0e6')+r(182,20,2,10,'#3b4249')+r(182,28,8,2,'#3b4249');
 // convex security mirror
 s+=r(298,10,48,48,'#8f9aa0')+r(302,14,40,40,'#cfd9dc')+r(306,18,14,14,'#eef4f6');
 // hanging 1+1 banner
 s+=r(126,0,110,8,'#8a6a2c')+r(130,8,102,62,'#c4453c')+r(130,8,102,4,'#e3776c')
  +`<text x="181" y="46" text-anchor="middle" fill="#fff4e2" font-family="ui-monospace,monospace" font-size="26" font-weight="bold">1+1</text>`;
 // PB signage over the shelving
 s+=r(8,84,124,17,'#2f7a4d')+r(8,84,124,3,'#7ddc9f')
  +`<text x="16" y="97" fill="#e9f7ee" font-family="ui-monospace,monospace" font-size="10" font-weight="bold" letter-spacing="1">GUILD24 PB</text>`;
 const goods=['#d9a05e','#c0705c','#8fb4a0','#d8c98a','#a58bbd','#7fa8c4','#cf8f8f','#9dbb7c'];
 for(let t=0;t<3;t++){const y=106+t*38;
  s+=r(6,y+26,128,4,'#a8834f')+r(6,y+30,128,3,'#7c5c34');
  for(let i=0;i<7;i++){const c=goods[Math.floor(rd()*goods.length)];
   s+=r(10+i*18,y+7,13,19,c)+r(12+i*18,y+10,9,5,'#f0ead6')+r(10+i*18,y+7,13,2,'#ffffff3d');}}
 // dawn window
 s+=r(148,96,102,92,'#5f7d95')+r(152,100,94,84,'#7f9db2')
  +r(152,100,94,28,'#94b1c0')+r(152,150,94,34,'#e0b579')+r(152,172,94,12,'#f5d79c')
  +r(195,96,6,92,'#4a6070')+r(148,138,102,5,'#4a6070')+r(148,92,102,5,'#3f5260');
 // price board and taped POP
 s+=r(258,100,44,52,'#efe6c8')+r(258,100,44,9,'#d05a45')
  +r(263,114,34,3,'#8a7f63')+r(263,122,26,3,'#8a7f63')+r(263,130,30,3,'#8a7f63')
  +r(272,96,16,7,'#ffffff59');
 // cold case
 s+=r(306,90,48,152,'#2c3a40')+r(310,94,40,144,'#4d6b73')
  +r(313,98,17,136,'#8fb9c0',' opacity="0.5"')+r(332,98,17,136,'#8fb9c0',' opacity="0.5"')
  +r(329,94,3,144,'#222e33');
 for(let t=0;t<4;t++){const y=102+t*34;s+=r(313,y+22,36,3,'#9fb0b4');
  for(let i=0;i<5;i++)s+=r(315+i*7,y,5,20,['#c8dbe0','#e3c78c','#c97f74','#a9c9a0'][Math.floor(rd()*4)]);}
 s+=r(306,238,48,5,'#1d262a');
 return svg(360,250,s,'band-art','xMidYMax');
}
/* ---- counter: the register, the counter body it stands on, floor ---- */
/* The counter carries the float, and nothing else. A promo standee and a stack of crates used
   to flank the register and the store-support plates sat on top of it, so the till - the one
   thing on this surface the player reads - was the smallest object on it, and the counter
   stopped short of the floor so the whole thing read as hovering. The dressing is gone, the
   register takes that width back, and the counter is a solid body standing on a plinth: its
   own drawers instead of props, landed on the floor rather than floating over it. */
function counter(){
 /* Above the counter the art draws nothing: the band's own wall shows through, so the room
    behind the register is the same surface on the art as it is either side of it. */
 let s=r(64,0,232,56,'#39434b')+r(64,0,232,4,'#66737d')+r(64,52,232,4,'#232a30')     // register casing
  +r(70,18,220,34,'#20272c')+r(74,20,212,30,'#101a15')+r(76,22,208,26,'#0d2418')  // recessed display
  +r(74,20,212,2,'#000000')+r(64,4,232,14,'#3f4952');                             // bezel + caption strip
 /* The counter runs the width of the room. Its edge column is a plain vertical stack, so the
    band continues it either side of the art in CSS and the register reads as standing on one
    long fixture rather than on an island floating in the middle of the floor. */
 s+=r(0,50,360,10,'#c6a26c')+r(0,60,360,5,'#8a6435')      // counter top slab and its front edge
  +r(0,65,360,47,'#6b4a2e')+r(0,112,360,8,'#3c2817');     // body, standing on a plinth
 for(let i=0;i<4;i++){const x=74+i*56;                    // the till station's own drawers
  s+=r(x,72,44,16,'#5e4028')+r(x,92,44,14,'#5e4028')
   +r(x+16,78,12,3,'#8a6435')+r(x+16,97,12,3,'#8a6435');}
 for(let i=0;i<9;i++)s+=r(76+i*24,52,20,6,'#57636c');     // keys, on the slab in front
 return svg(360,120,s,'band-art');
}
/* ---- GUILD24 corporate seal, used on the order form and the approval stamp ---- */
function seal(size=56,ink='#2f7a4d'){
 let s='';
 for(let i=0;i<4;i++)s+=r([6,44,6,6][i],[6,6,6,44][i],[44,6,6,44][i],[6,44,44,6][i],ink);
 s+=r(12,12,32,4,ink)+r(12,40,32,4,ink)+r(12,12,4,32,ink)+r(40,12,4,32,ink)
  +`<text x="28" y="33" text-anchor="middle" fill="${ink}" font-family="ui-monospace,monospace" font-size="13" font-weight="bold">G24</text>`;
 return `<svg class="seal-art" width="${size}" height="${size}" viewBox="0 0 56 56" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
}
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
 if(A&&at)return A.base+(at.easter?'easter/'+at.easter
                                 :'normal/'+at.gender+'/'+String(at.slot).padStart(3,'0'))+A.ext;
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
/* ---- night ---------------------------------------------------------------------
   The shop after closing, seen from inside: the street door, the window beside it and a
   single lamp still burning over the counter. Nothing of the trading day is in it — no
   shelves, no board, no counter — so Night cannot be mistaken for Morning or Sale. */
function nightRoom(seed=7){
 const rd=rng(seed);let s=r(0,0,360,120,'#0e0a06');
 /* the shop window: frame, then the street through it */
 s+=r(18,10,222,80,'#0b1020');
 for(let i=0;i<30;i++){const x=Math.floor(rd()*212)+22,y=Math.floor(rd()*40)+14;s+=r(x,y,2,2,rd()>.6?'#cdd8ef':'#6d7a9c');}
 s+=r(66,20,12,12,'#e8e4c8')+r(64,23,2,6,'#e8e4c8')+r(78,23,2,6,'#e8e4c8')+r(69,17,6,2,'#e8e4c8')+r(69,32,6,2,'#e8e4c8');
 for(const [x0,w,h] of [[20,30,24],[54,16,30],[74,26,18],[106,20,28],[132,30,20],[168,18,32],[192,26,22],[222,18,26]]){
  s+=r(x0,90-h,w,h,'#0a0f1c');
  for(let k=0;k<2;k++){const wx=x0+4+k*(w-11),wy=94-h+k*7;if(wx+5<x0+w)s+=r(wx,wy,5,5,rd()>.45?'#e0b464':'#141b2c');}}
 for(let i=0;i<24;i++)s+=r(Math.floor(rd()*212)+22,Math.floor(rd()*62)+14,1,7,'#2f4066');
 s+=r(14,6,230,5,'#2a2118')+r(14,6,5,86,'#2a2118')+r(236,6,5,86,'#2a2118')+r(126,10,3,80,'#2a2118')
  +r(14,86,230,6,'#3b2f21');
 /* the street door beside it */
 s+=r(256,4,84,92,'#2a2118')+r(261,9,74,87,'#4a3928')+r(268,16,60,34,'#0b1020');
 for(let i=0;i<8;i++){const x=Math.floor(rd()*52)+272,y=Math.floor(rd()*26)+20;s+=r(x,y,2,2,'#6d7a9c');}
 s+=r(268,16,60,3,'#2a2118')+r(268,50,60,3,'#2a2118')+r(272,60,52,26,'#3f3020')+r(322,62,6,6,'#c8a35e');
 /* the wall and floor inside, and the one lamp still burning over where they stand */
 s+=r(0,92,360,28,'#160f08')+r(0,92,360,3,'#2a2118')+r(0,112,360,8,'#241a10')+r(0,112,360,2,'#3b2f21');
 /* the lamp hangs in the room, in front of the glass. Its light belongs to the figure
    standing under it, not to the street, so no cone is drawn into the window. */
 s+=r(126,0,3,14,'#3b2f21')+r(114,14,27,5,'#6b5029')+r(117,19,21,9,'#f2d999')+r(121,28,13,4,'#d0a960')
  +r(124,32,7,3,'#ffeec2');
 return svg(360,120,s,'band-art','xMidYMax');
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
   matter how many seals are already broken, and on D30 shows the form its break count
   earned. Zero breaks reuses the base form - there is no D30 SB0 art and none is needed
   (BOSS: `Gameplay truth is bossId + sealBreakCount, not an asset filename`). */
function bossArt(bossId,day,sealBreakCount){
 const a=G.NPCAssets,prefix=a&&a.boss&&a.boss[bossId];
 if(!prefix)return null;
 const form=bossId!=='SLOTH' ? (day>=30?'D30':'D05-D15')
   : (day<30||!sealBreakCount ? a.slothZero : 'D30_SB'+sealBreakCount);
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
 tillLabel:{band:'counter',left:18.9,top:3.3,width:62.2,height:11.7},
 till:{band:'counter',left:21.1,top:18.3,width:57.8,height:25}
};
const anchorStyle=name=>{const a=anchors[name];return 'left:'+a.left+'%;top:'+a.top+'%;width:'+a.width+'%;height:'+a.height+'%';};
G.Scene={ceiling:()=>slot('store.ceiling',ceiling),wall:()=>slot('store.wall',wall),counter:()=>slot('store.counter',counter),
 seal,crate,priceTag,hazardIcon,manifest,slot,anchors,anchorStyle,
 npcArt,npcPool,bossArt,cardBack,shelfStrip,nightRoom,returnTag};
})(globalThis);
