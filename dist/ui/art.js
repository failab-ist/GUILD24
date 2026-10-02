/* Procedural local SVG components: deterministic appearance, replaceable asset boundary. */
(function(G){
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rect=(x,y,w,h,fill,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${more}/>`;
function avatar(n,size=96){if(!n)return '';const v=n.appearance,job=DATA.jobBy[n.job],skin=['#efc097','#d9a475','#b7805b','#f4d4af'][v%4],hair=['#49332b','#bd8451','#c3bec6','#292e39','#815744'][Math.floor(v/5)%5],shirt=job.color;let shapes=rect(9,5,14,13,hair)+rect(8,8,16,6,hair)+rect(10,9,12,10,skin)+rect(10,7,12,4,hair)+rect(12,13,2,2,'#333338')+rect(19,13,2,2,'#333338')+rect(14,17,5,1,'#b47969')+rect(12,20,10,11,shirt)+rect(9,21,4,9,shirt)+rect(22,21,4,9,shirt)+rect(9,30,4,3,skin)+rect(23,30,3,3,skin)+rect(13,31,4,7,'#454758')+rect(19,31,4,7,'#454758')+rect(11,37,6,3,'#2b3038')+rect(19,37,6,3,'#2b3038')+rect(12,29,11,2,'#6c5948');
 if(n.job==='mage'){shapes+=`<path d="M6 10H27V7H23V3H21V0H17V4H12V7H6Z" fill="${shirt}"/>`+rect(7,9,19,2,'#d9c292')+rect(28,14,2,24,'#b19069')+rect(26,10,6,6,'#8ce1d8')+rect(28,9,2,2,'#d8fff1');}
 if(n.job==='warrior'||n.job==='berserker')shapes+=rect(12,21,10,7,'#9fa5aa')+rect(15,21,3,7,'#c4c9c4')+rect(27,15,3,18,'#bdcbd0')+rect(24,31,8,2,'#d5ae68')+rect(27,33,3,4,'#826647');
 if(n.job==='archer'||n.job==='rogue')shapes+=`<path d="M25 16 Q37 25 25 35" fill="none" stroke="#d9b080" stroke-width="2"/>`+rect(25,17,1,18,'#cec6a7')+rect(9,6,17,4,shirt)+rect(20,3,3,5,'#e4c985');
 if(n.job==='priest')shapes+=rect(15,21,4,11,'#efe9d3')+rect(13,23,8,2,'#bb9653')+rect(27,17,2,20,'#dfc08a')+rect(24,19,8,2,'#dfc08a')+rect(8,6,17,3,'#efeadb');
 if(n.level>=10)shapes+=rect(8,20,3,16,'#e2c274')+rect(24,20,3,15,'#e2c274');if(n.injury)shapes+=rect(17,10,6,2,'#f4eee0');
 return `<svg class="avatar" width="${size}" height="${size*1.1}" viewBox="0 0 36 42" role="img" aria-label="${esc(n.name)} ${job.name}" shape-rendering="crispEdges">${shapes}</svg>`;
}
function itemIcon(id,size=52){const it=DATA.itemBy[id];if(!it)return '';const p=it.icon;let s='';const base='#e5e8dc',dark='#344642',pink='#d897a0',green='#66bda3';
 if(p==='rice')s=`<path d="M6 34L20 8L34 34V38H6Z" fill="${base}"/><path d="M14 29H26V38H14Z" fill="${dark}"/>`+rect(14,20,13,5,'#eaaa67')+rect(17,21,7,2,'#f6ecd1');
 /* SA-Q51: 왕도 천연암반수 shares the bottled-water silhouette this language already has for
    every bottle-shaped drink, distinguished by its own colour rather than a recoloured cousin. */
 if(['water','potion','antidote','wine','kingwater'].includes(p)){const c=p==='water'?'#80bfce':p==='potion'?'#e09b9c':p==='antidote'?green:p==='kingwater'?'#4f86b0':'#b094be';s=rect(16,3,10,5,p==='water'||p==='kingwater'?'#639aa9':'#a68464')+rect(16,8,10,7,base)+rect(11,15,20,21,c)+rect(15,18,3,13,'#dceee1')+rect(18,23,13,9,base)+rect(22,24,3,6,dark)+rect(20,26,7,2,dark);}
 if(['coffee','energy'].includes(p))s=rect(12,7,19,30,p==='coffee'?'#bc9971':'#9abb75')+rect(12,5,19,3,'#cbd9d0')+rect(12,35,19,3,'#9baea6')+rect(14,17,15,11,'#efe3c4')+`<path d="M23 17L17 24H22L18 31L27 22H22Z" fill="${dark}"/>`;
 if(p==='ramen')s=`<path d="M7 14H35L31 37H11Z" fill="${id==='dragonramen'?'#d96958':'#dfa05e'}"/>`+rect(5,11,32,5,'#ede6ce')+rect(10,21,23,9,'#f4e6c5')+rect(15,24,12,3,'#bc6650')+rect(14,5,2,4,'#dbe9d6')+rect(24,3,2,6,'#dbe9d6');
 /* SA-Q51: 간단 도시락 is a simple single-tier meal box - its own silhouette, distinct from the
    다칸 길드 특제 도시락 ('lunch') and the stacked 영웅 결전 도시락 ('battlelunch') - replacing
    the retired Hotbar/skewered-stick shape this ID used to carry. */
 if(p==='lunchbox')s=rect(7,14,30,22,'#4f5847')+rect(9,16,26,18,'#e9dfc2')+rect(9,25,26,2,'#cbb98a')+rect(11,18,11,6,'#f4eedb')+rect(24,18,9,6,'#a6b97b');
 if(p==='choco')s=rect(7,13,30,19,'#8e7267')+rect(10,16,24,13,'#d9af82')+rect(19,13,15,19,'#746158')+rect(23,17,7,11,'#aa8470');
 /* 녹차 양갱 (v2.9.13 quick patch): a green-tea jelly bar in a paper wrap twisted at both ends */
 if(p==='yanggaeng')s=rect(4,15,5,17,'#e3d9bd')+rect(35,15,5,17,'#e3d9bd')+rect(8,14,28,19,'#56743f')+rect(8,14,28,3,'#86a86a')+rect(30,17,6,16,'#435d31')+rect(14,21,13,6,'#efe3c4')+rect(16,23,9,2,'#86a86a');
 if(['bandage','kit','mask'].includes(p)){const col=p==='kit'?'#d5dfcc':'#e0dfc8';s=rect(7,12,30,23,col)+rect(12,9,20,3,col);if(p==='mask')s+=rect(11,17,22,13,'#96b5ab')+rect(12,20,20,2,'#cbdbcf');else s+=rect(19,16,5,15,'#bd7d6a')+rect(14,21,15,5,'#bd7d6a');}
 /* ITEM §COUNTER LADDER (User 2026-09-27, v2.9.7): 중화 탄산수 is a fizzing can; 방독 작업장갑 a two-layer rubber glove;
    축성 손전등 a torch with a holy-water window and a light fan; 방한 두건 (the old 핫팩 id) a knit balaclava with a tinted eye slit. */
 if(p==='soda')s=rect(15,1,2,2,'#cfe6e0')+rect(21,2,2,2,'#cfe6e0')+rect(26,0,2,2,'#cfe6e0')+rect(12,7,19,30,'#8fc4b5')+rect(12,5,19,3,'#dfe9e4')+rect(12,35,19,3,'#6f9c8f')
  +rect(12,15,19,13,'#f0efe0')+rect(16,18,3,3,'#7fb8cc')+rect(22,21,4,4,'#7fb8cc')+rect(17,24,2,2,'#7fb8cc')+rect(24,17,2,2,'#7fb8cc');
 if(p==='gloves')s=rect(12,8,4,10,'#d3c25e')+rect(17,5,4,13,'#d3c25e')+rect(22,6,4,12,'#d3c25e')+rect(27,9,4,10,'#d3c25e')+rect(6,20,7,6,'#d3c25e')
  +rect(11,16,20,19,'#d3c25e')+rect(14,21,14,11,'#b09d3e')+rect(17,24,8,5,'#d3c25e')+rect(10,34,22,7,'#5f7d57')+rect(10,36,22,2,'#86a37a');
 if(p==='holylight')s=rect(4,17,22,11,'#56666e')+rect(4,19,22,2,'#6f8088')+rect(26,14,8,17,'#8a9aa2')+rect(34,16,3,13,'#f6e4b4')
  +`<path d="M37 17L44 12V33L37 28Z" fill="#f6e4b4" opacity=".45"/>`+rect(16,19,6,7,'#8dc6cd')+rect(17,20,2,2,'#cfe6e0');
 if(p==='hood')s=rect(19,1,6,4,'#e7eef2')+rect(16,4,12,3,'#b55a4c')+rect(13,7,18,3,'#b55a4c')+rect(11,10,22,22,'#b55a4c')+rect(12,32,20,3,'#b55a4c')
  +rect(13,15,18,7,'#2b3238')+rect(14,16,16,5,'#9fd0dc')+rect(15,17,5,2,'#d7eef3')+rect(15,24,14,2,'#a44f43')
  +rect(8,35,28,8,'#8f4136')+rect(11,36,2,7,'#7a372e')+rect(16,36,2,7,'#7a372e')+rect(21,36,2,7,'#7a372e')+rect(26,36,2,7,'#7a372e')+rect(31,36,2,7,'#7a372e');
 if(p==='ice')s=`<path d="M9 10H34L30 37H13Z" fill="#8dc6cd"/>`+rect(7,8,29,4,'#d5e8df')+rect(13,16,9,9,'#cce5df')+rect(23,22,7,8,'#b7dfdc');
 if(p==='battery')s=rect(14,5,15,4,'#c6d0c5')+rect(10,9,23,28,'#d0ad69')+rect(10,19,23,15,'#435956')+rect(18,14,7,2,'#f6e4b4')+rect(20,12,2,6,'#f6e4b4')+rect(17,26,9,3,'#e0c793');
 if(p==='cloak')s=`<path d="M16 5H26L31 14L37 37H6L11 14Z" fill="#7da4a2"/><path d="M16 6L13 14H29L25 6Z" fill="#4b7474"/>`+rect(20,17,2,19,'#a1c2b3');
 if(p==='stone')s=`<path d="M20 4L34 15L29 34L20 40L9 31L6 16Z" fill="#8ebbc1"/><path d="M20 4L17 22L6 16Z" fill="#d0e6d9"/><path d="M17 22L20 40L34 15Z" fill="#6f939e"/>`;
 if(p==='lunch')s=rect(5,13,33,23,'#554f58')+rect(7,15,29,19,'#e9dfc2')+rect(9,17,12,15,'#f1eddb')+rect(24,17,10,6,'#a6b97b')+rect(24,25,10,7,'#d29167')+rect(18,21,3,3,'#9d705e');
 if(p==='coupon')s=rect(4,11,35,23,'#e8c567')+rect(7,14,29,17,'#846d3d')+`<text x="21" y="26" text-anchor="middle" fill="#f7db82" font-family="monospace" font-size="10" font-weight="bold">1+1</text>`;
 /* D-27. Seven products were drawn as something else: a rope, a pair of boots, goggles and a
    tube of coating all wore the lantern battery, the focus sweets wore the chocolate bar, the
    ion drink wore the water bottle and the world-tree charm wore the return stone. At the size
    these render, that is the same picture. Each has its own now, on the same 4px grid. */
 if(p==='potionHigh')s=rect(15,2,14,6,'#d8b465')+rect(17,8,10,5,base)+rect(12,13,20,4,'#8f2f2e')
  +rect(9,17,26,20,'#b0413f')+rect(9,17,26,2,'#d4726d')+rect(12,20,4,14,'#e07b78')
  +rect(15,23,16,10,base)+rect(17,25,12,2,'#8f2f2e')+rect(17,29,12,2,'#8f2f2e');
 if(p==='ion')s=rect(18,3,8,4,'#cfd9cf')+rect(15,7,14,6,'#7fb6c4')+rect(13,13,18,24,'#9fd4dc')
  +rect(13,19,18,6,'#4e8ba0')+rect(16,26,12,3,'#eff7f4')+rect(13,13,4,24,'#d7eef0');
 if(p==='candy')s=`<path d="M4 13L13 21L4 31Z" fill="#e9b9cc"/><path d="M40 13L31 21L40 31Z" fill="#e9b9cc"/>`
  +rect(11,19,3,7,'#c98aa4')+rect(30,19,3,7,'#c98aa4')+rect(13,11,18,21,'#f0dce6')
  +rect(16,15,12,13,'#d3708f')+rect(19,19,6,5,'#f7eef3');
 if(p==='rope')s=`<path d="M22 9C34 9 39 15 39 22C39 29 34 35 22 35C10 35 5 29 5 22C5 15 10 9 22 9ZM22 16C15 16 12 19 12 22C12 25 15 28 22 28C29 28 32 25 32 22C32 19 29 16 22 16Z" fill="#c2a173" fill-rule="evenodd"/>`
  +rect(14,10,3,4,'#8e7049')+rect(21,9,3,4,'#8e7049')+rect(28,10,3,4,'#8e7049')
  +rect(14,30,3,4,'#8e7049')+rect(28,30,3,4,'#8e7049')+rect(6,20,3,4,'#8e7049')+rect(35,20,3,4,'#8e7049')
  +rect(20,33,4,8,'#b18d5c')+rect(19,40,6,3,'#8e7049');
 if(p==='boots')s=rect(11,4,14,4,'#a8856a')+rect(12,8,12,18,'#7a5c45')+rect(12,26,22,8,'#6d5340')
  +rect(32,28,4,6,'#6d5340')+rect(10,34,28,5,'#2f261f')+rect(14,12,8,2,'#d9c3a6')+rect(14,18,8,2,'#d9c3a6');
 if(p==='goggles')s=rect(2,18,40,6,'#4a5a63')+rect(5,12,34,17,'#697c86')+rect(8,15,11,11,'#7fb8cc')
  +rect(25,15,11,11,'#7fb8cc')+rect(19,19,6,3,'#4a5a63')+rect(9,16,4,4,'#dff2f6')+rect(26,16,4,4,'#dff2f6');
 if(p==='coating')s=rect(17,2,10,5,'#8d968c')+rect(27,4,5,3,'#8d968c')+rect(13,8,18,29,'#cfd6cc')
  +rect(13,8,5,29,'#e8eee6')+rect(15,16,14,10,'#6d8c6d')+rect(18,19,8,4,'#e8eee6')
  +rect(34,3,2,2,'#9fb6a4')+rect(37,6,2,2,'#9fb6a4')+rect(34,9,2,2,'#9fb6a4');
 if(p==='amulet')s=rect(14,5,16,2,'#8a7a5a')+rect(20,7,4,4,'#8a7a5a')
  +`<path d="M22 10C35 14 35 32 22 40C9 32 9 14 22 10Z" fill="#8fc79a"/>`
  +`<path d="M22 14C30 18 30 30 22 36Z" fill="#5f9d71"/>`+rect(21,15,2,21,'#dff0dd');
 /* ITEM_v2.7 brings twelve products the shelf did not have. Each is drawn as itself rather
    than as a recoloured cousin: the point of D-27 is the picture a player sees, and a
    거미줄 방호세트 wearing the dust mask's face is the same failure as before, tinted. Every
    one of these differs from its nearest sibling in SILHOUETTE, not only in colour. */
 if(p==='herbtea')s=rect(15,8,14,3,'#cdd6c6')+rect(13,11,18,3,'#dfe3d6')
  +`<path d="M14 14H30L27 38H17Z" fill="#eef1e6"/>`+rect(16,22,12,4,'#8fae7c')
  +`<path d="M22 16C26 17 27 21 22 23C18 21 18 17 22 16Z" fill="#6f9a63"/>`
  +rect(21,17,1,6,'#4f7248')+rect(17,3,2,4,'#cfe0d2')+rect(25,2,2,5,'#cfe0d2');
 if(p==='potionMid')s=rect(19,4,6,4,'#a68464')+rect(18,8,8,4,base)
  +`<path d="M17 12H27L33 24C33 33 28 38 22 38C16 38 11 33 11 24Z" fill="#d8a24f"/>`
  +rect(15,20,3,9,'#f0d49a')+rect(16,28,12,5,base)+rect(18,30,8,1,'#8a5f2a');
 if(p==='spiderkit')s=`<path d="M22 8L36 22L22 36L8 22Z" fill="#5e6b5c"/>`
  +rect(21,12,2,20,'#e2e8d6')+rect(12,21,20,2,'#e2e8d6')
  +`<path d="M22 15L29 22L22 29L15 22Z" fill="none" stroke="#e2e8d6" stroke-width="2"/>`
  +rect(9,6,6,4,'#48533f')+rect(29,6,6,4,'#48533f');
 if(p==='slimesuit')s=`<path d="M22 5C29 5 33 9 33 15L35 36H9L11 15C11 9 15 5 22 5Z" fill="#7fa06a"/>`
  +rect(15,10,14,10,'#d7e6cf')+rect(17,12,4,4,'#f2f8ef')+rect(9,22,26,3,'#5b7a4c')
  +rect(5,24,6,10,'#5b7a4c')+rect(33,24,6,10,'#5b7a4c')+rect(18,27,8,9,'#66895a');
 if(p==='cryptlantern')s=rect(20,2,4,3,'#8a7a5a')+rect(14,5,16,3,'#b9a06a')+rect(12,8,20,4,'#8a7a5a')
  +rect(13,12,18,21,'#3d4a46')+rect(16,15,12,15,'#f6dfa0')
  +`<path d="M22 16C25 20 25 26 22 29C19 26 19 20 22 16Z" fill="#f3a85c"/>`
  +rect(21,19,2,8,'#fff6df')+rect(12,33,20,4,'#b9a06a')+rect(14,37,16,3,'#8a7a5a');
 if(p==='snowvisor')s=rect(1,20,42,4,'#5d6a72')+rect(4,12,36,19,'#e7eef2')
  +rect(2,16,2,11,'#e7eef2')+rect(40,16,2,11,'#e7eef2')+rect(4,8,36,4,'#f9fdff')
  +rect(7,16,30,11,'#3f5866')+rect(9,18,26,4,'#8fd0e8')+rect(6,29,32,3,'#c5d4dc');
 if(p==='magmagear')s=rect(6,12,4,18,'#8b979c')+rect(34,12,4,18,'#8b979c')+rect(10,8,24,26,'#6f7b80')
  +rect(12,10,20,8,'#39464b')+rect(13,11,18,2,'#96a5aa')+rect(13,15,18,2,'#96a5aa')
  +rect(14,21,16,9,'#2e3a3e')+rect(17,23,10,5,'#f0894e')+rect(19,24,6,3,'#ffd9a3')
  +rect(4,30,10,4,'#5b676c')+rect(30,30,10,4,'#5b676c');
 if(p==='battlelunch')s=rect(6,10,32,11,'#5a3f36')+rect(8,12,28,7,'#efe3c5')
  +rect(6,22,32,12,'#4a332c')+rect(8,24,28,8,'#e7d8b8')+rect(10,25,10,6,'#f3efdd')
  +rect(22,25,12,3,'#a6b97b')+rect(22,29,12,3,'#d29167')
  +rect(20,8,4,28,'#b8452f')+rect(16,18,12,4,'#b8452f')+rect(19,17,6,6,'#d96a4f');
 if(p==='hyperenergy')s=rect(16,2,12,3,'#cbd9d0')+rect(15,5,14,34,'#2f3f57')+rect(15,5,4,34,'#4a6486')
  +`<path d="M18 13L24 18L18 23Z" fill="#7fe3d0"/><path d="M23 13L29 18L23 23Z" fill="#7fe3d0"/>`
  +rect(15,27,14,5,'#e9f4f0')+rect(16,36,12,3,'#9baea6');
 if(p==='sageelixir')s=rect(20,2,4,4,'#8a7a5a')+rect(18,6,8,3,'#b9a06a')+rect(19,9,6,6,'#cfd9cf')
  +`<path d="M17 15H27L34 26C34 34 29 39 22 39C15 39 10 34 10 26Z" fill="#7f6bb0"/>`
  +rect(14,22,3,10,'#b9a8dd')
  +`<path d="M16 28C20 24 24 32 28 28" fill="none" stroke="#e2d7f5" stroke-width="2"/>`
  +rect(15,32,14,4,'#e6dff5');
 if(p==='toppotion')s=`<path d="M17 4L20 1L22 4L24 1L27 4Z" fill="#f0d78a"/>`
  +rect(17,5,10,4,'#d8b465')+rect(19,9,6,4,'#cfd9cf')
  +`<path d="M16 13H28L36 25L30 38H14L8 25Z" fill="#3f8fbf"/>`
  +`<path d="M16 13L20 25L14 38Z" fill="#6fc0e4"/>`
  +rect(18,22,8,8,'#e7f4fb')+rect(20,24,4,4,'#bfe6f7');
 return `<svg class="item-art" width="${size}" height="${size}" viewBox="0 0 44 44" shape-rendering="crispEdges" role="img" aria-label="${esc(it.name)}">${s}</svg>`;
}
// Gate marks and UI glyphs. Pixel sprites on the same 4px grid as the rest of the art —
// the interface never falls back to emoji for a game object (UI_UX ACCESSIBILITY/SIGNALS).
function mark(family,size=32){const c=DATA.dungeonBy[family]?.color||'#cbd5b6';let s='';
 if(family==='spider')s=rect(12,10,8,8,c)+rect(10,14,12,4,c)+rect(4,8,4,4,c)+rect(8,12,2,2,c)+rect(24,8,4,4,c)+rect(22,12,2,2,c)+rect(4,20,4,4,c)+rect(8,18,2,2,c)+rect(24,20,4,4,c)+rect(22,18,2,2,c)+rect(14,20,4,6,c)+rect(13,4,2,4,c)+rect(17,4,2,4,c);
 if(family==='golem')s=rect(14,4,4,4,c)+rect(12,8,8,4,c)+rect(8,12,16,6,c)+rect(6,18,20,8,c)+rect(10,26,12,2,'#f3d78a')+rect(12,14,8,8,'#f6e3ab')+rect(14,18,4,4,'#fffbe8');
 if(family==='crypt')s=rect(10,4,12,4,c)+rect(6,8,4,16,c)+rect(22,8,4,16,c)+rect(10,20,12,4,c)+rect(12,8,8,12,'#2a2436')+rect(14,10,4,4,c)+rect(4,24,24,4,c);
 if(family==='snow')s=rect(14,2,4,28,c)+rect(2,14,28,4,c)+rect(6,6,4,4,c)+rect(22,6,4,4,c)+rect(6,22,4,4,c)+rect(22,22,4,4,c)+rect(10,10,12,12,'#e6f6fb')+rect(14,14,4,4,c);
 if(family==='slime')s=rect(8,12,16,4,c)+rect(4,16,24,10,c)+rect(10,8,10,4,c)+rect(10,18,4,4,'#22392f')+rect(18,18,4,4,'#22392f')+rect(6,26,20,2,'#2c4a3d');
 if(family==='final')s=rect(4,4,6,8,c)+rect(14,4,4,8,c)+rect(22,4,6,8,c)+rect(4,12,24,4,c)+rect(8,16,16,14,c)+rect(14,20,4,10,'#2b1418')+rect(10,18,4,4,'#2b1418')+rect(18,18,4,4,'#2b1418');
 if(!s)s=rect(8,8,16,16,c);
 return `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;}
function glyph(name,size=24){const c='currentColor';let s='';
 if(name==='menu')s=rect(3,5,18,3,c)+rect(3,11,18,3,c)+rect(3,17,18,3,c);
 if(name==='coin')s=rect(8,3,8,2,c)+rect(5,5,14,2,c)+rect(3,7,18,10,c)+rect(5,17,14,2,c)+rect(8,19,8,2,c)+rect(10,8,4,8,'#1c1815')+rect(8,10,8,4,'#1c1815');
 if(name==='person')s=rect(9,3,6,6,c)+rect(6,11,12,7,c)+rect(4,13,2,5,c)+rect(18,13,2,5,c)+rect(7,18,4,3,c)+rect(13,18,4,3,c);
 if(name==='next')s=rect(6,3,3,3,c)+rect(9,6,3,3,c)+rect(12,9,3,6,c)+rect(9,15,3,3,c)+rect(6,18,3,3,c);
 if(name==='stamp')s=rect(4,4,16,3,c)+rect(4,7,3,10,c)+rect(17,7,3,10,c)+rect(4,17,16,3,c)+rect(9,9,6,6,c);
 return `<svg class="glyph" width="${size}" height="${size}" viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;}
G.Art={avatar,itemIcon,mark,glyph,esc};
})(globalThis);
