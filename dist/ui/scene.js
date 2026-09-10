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
/* ---- counter: register, promo standee, stock crates, floor ---- */
function counter(){
 let s=r(0,0,360,120,'#b8b0a0');
 for(let y=68;y<120;y+=16)for(let x=0;x<360;x+=22)s+=r(x,y,21,15,(x/22+y/16)%2?'#bdb5a4':'#b1a998');
 s+=r(104,0,152,46,'#39434b')+r(104,0,152,4,'#5d6a74')                          // register
  +r(112,6,136,32,'#141b1f')+r(116,9,128,26,'#123021')
  +r(104,40,152,6,'#2a333a');
 for(let i=0;i<7;i++)s+=r(112+i*20,48,16,7,'#57636c');
 s+=r(252,4,58,38,'#efe6c8')+r(252,4,58,8,'#d9a447')                            // promo standee
  +r(257,18,46,3,'#8a7f63')+r(257,26,34,3,'#8a7f63')+r(272,42,16,5,'#c9bfa0');
 s+=r(20,52,320,10,'#c6a26c')+r(20,62,320,4,'#8a6435')+r(26,66,308,34,'#6b4a2e') // counter
  +r(26,96,308,6,'#4a3220');
 for(let x=40;x<330;x+=32)s+=r(x,70,24,22,'#5e4028');
 s+=r(4,74,62,42,'#a5763f')+r(4,74,62,4,'#c08d4f')+r(4,88,62,4,'#8a5f31')       // crates
  +r(18,94,34,12,'#8a5f31')+r(23,97,24,6,'#c9a06a');
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
 till:{band:'counter',left:31.1,top:5,width:37.8,height:26.7}
};
const anchorStyle=name=>{const a=anchors[name];return 'left:'+a.left+'%;top:'+a.top+'%;width:'+a.width+'%;height:'+a.height+'%';};
G.Scene={ceiling:()=>slot('store.ceiling',ceiling),wall:()=>slot('store.wall',wall),counter:()=>slot('store.counter',counter),
 seal,crate,priceTag,hazardIcon,manifest,slot,anchors,anchorStyle};
})(globalThis);
