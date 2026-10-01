/* ARCHIVED 2026-10-01 (User): drawing code no screen shows any more. Moved verbatim, not maintained, not loaded.
   - ceiling() / wall(seed) / counter(): from dist/ui/scene.js. The painted backdrop replaced them; their art was
     visibility:hidden on MORNING and the preparation scene. scene.js keeps empty frames of the same viewBox.
   - scene(game): from dist/ui/art.js (G.Art.scene). Nothing called it.
   They depend on scene.js / art.js helpers (r, svg, rng, rect, avatar, itemIcon) and do not run on their own. */

/* ===== dist/ui/scene.js ===== */
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
/* ---- counter: the register, standing on its own low plinth ---- */
/* The float is the only thing on this part of the screen the player reads, and it kept
   losing to the furniture around it - first a promo standee and a crate stack, then the
   store-support plates, then a full-width counter with drawers that turned the register
   into a fitting on someone else's cabinet. There is no counter now. The register is the
   object, at the size that makes it readable at a glance, on a plinth just deep enough to
   stand on. Either side of it the store floor is left alone. */
function counter(){
 // the register: casing, recessed display, caption strip, keypad
 let s=r(54,6,252,60,'#39434b')+r(54,6,252,4,'#66737d')+r(54,62,252,4,'#232a30')
  +r(59,24,242,38,'#20272c')+r(61,26,238,34,'#101a15')+r(63,28,234,30,'#0d2418')
  +r(61,26,238,2,'#000000')+r(54,10,252,14,'#3f4952');
 for(let i=0;i<9;i++)s+=r(74+i*24,58,20,6,'#57636c');
 // a short, shallow plinth - enough that the register is standing rather than hovering
 s+=r(48,66,264,7,'#c6a26c')+r(56,73,248,11,'#6b4a2e')+r(52,84,256,6,'#3c2817');
 /* The band ends where the plinth does, so the register comes down onto the action bar
    instead of hovering over a strip of empty floor above it. */
 return svg(360,90,s,'band-art');
}

/* ===== dist/ui/art.js ===== */
function scene(game){const s=game.run,n=s.phase==='sell'?game.current():null,night=['night','end'].includes(s.phase),entering=scene.lastId!==n?.id;scene.lastId=n?.id;const rects=[];let scenery='';const shelf=(x,y)=>{let z=rect(x,y,123,86,'#566e60')+rect(x+5,y+6,113,72,'#2b4b43');for(let j=0;j<3;j++){z+=rect(x+3,y+23+j*25,117,5,'#bcae8c');for(let k=0;k<7;k++){const c=['#bcd9af','#d9b281','#cc8771','#9ac2bc','#e2d5a9'][(j+k)%5];z+=rect(x+10+k*15,y+9+j*25,9,13,c)+rect(x+12+k*15,y+12+j*25,5,4,'#e8e4cd');}}return z;};
 for(let y=207;y<390;y+=24)for(let x=16;x<783;x+=32)rects.push(rect(x,y,31,23,((x/32+y/24)|0)%2?'#c6c6aa':'#bdbfa4'));
 scenery+=rect(0,0,800,430,night?'#152b30':'#283d39')+rect(16,18,768,70,'#315d4f')+rect(17,23,766,5,'#e0bd74')+rect(17,80,766,7,'#b9784f')+`<text x="47" y="64" fill="#f2eed4" font-size="33" font-family="monospace" font-weight="bold" letter-spacing="2">GUILD<tspan fill="#dfb46d">24</tspan></text><text x="750" y="59" text-anchor="end" fill="#d4dfca" font-size="15" font-family="sans-serif">던전 가기 전, 길드24.</text>`;
 scenery+=rect(16,91,768,116,'#8caa94')+rect(16,91,768,9,'#698877')+rects.join('');
 scenery+=rect(28,111,99,155,'#36554c')+rect(35,119,85,138,'#789e94')+rect(40,124,74,106,night?'#243d49':'#456561')+rect(75,123,4,111,'#abc4b0')+rect(99,173,4,17,'#d7d9ba')+rect(48,136,23,3,'#72928a')+rect(51,139,13,34,'#72928a');
 scenery+=shelf(151,112)+shelf(292,112)+rect(449,106,122,102,'#d5d6ba')+rect(455,113,110,82,'#415e58')+rect(508,113,4,83,'#b6c9b8');
 for(let j=0;j<3;j++)for(let k=0;k<6;k++)scenery+=rect(461+k*16,123+j*24,10,16,['#a3c8b9','#c1a3ad','#d2caa0'][j])+rect(463+k*16,122+j*24,6,3,'#e3e6cc');
 scenery+=rect(589,110,174,63,'#547665')+rect(595,116,162,51,'#d6d4b4')+`<text x="676" y="136" text-anchor="middle" fill="#476357" font-family="sans-serif" font-size="11">길드 원정 안내</text><text x="676" y="156" text-anchor="middle" fill="#3a4c45" font-family="sans-serif" font-size="14">${esc(s.dungeons[0]?.short||'제7게이트')}</text>`;
 scenery+=rect(603,210,151,49,'#8f9d80')+rect(595,204,169,9,'#dbceb0')+rect(603,252,151,11,'#536c5a');
 for(let i=0;i<8;i++)scenery+=rect(608+i*18,190,12,14,['#d19e73','#b8c19c','#b38f94'][i%3]);
 // Future visitors are never rendered before reaching the counter.
 const clerk={appearance:377,job:'warrior',name:'점주',level:1};scenery+=`<g transform="translate(439 223)">${avatar(clerk,51)}</g>`;
 scenery+=rect(309,291,267,63,'#718871')+rect(300,278,285,17,'#dfd3b2')+rect(309,304,267,8,'#c5b996')+rect(322,318,48,25,'#386355')+`<text x="346" y="335" text-anchor="middle" font-size="11" font-family="monospace" fill="#d9dfc3">G24</text>`+rect(468,255,40,25,'#314640')+rect(474,259,28,13,'#9fc9a2')+rect(480,280,36,6,'#6a7c64');
 if(n&&s.phase!=='night')scenery+=`<g class="${entering?'scene-customer':''}" transform="translate(366 304)"><ellipse cx="29" cy="69" rx="26" ry="7" fill="#8e987f"/>${avatar(n,64)}</g>`;
 if(n?.pack.length&&s.phase==='sell')n.pack.forEach((id,i)=>scenery+=`<g transform="translate(${330+i*37} 249)">${itemIcon(id,37)}</g>`);
 const installed=s.facilities;installed.forEach((id,i)=>{const x=30+(i%3)*82,y=292+Math.floor(i/3)*40;scenery+=rect(x,y,70,30,'#42685a')+rect(x+3,y+3,64,7,'#e2bc72')+`<text x="${x+35}" y="${y+23}" text-anchor="middle" fill="#e4e5ca" font-size="9" font-family="sans-serif">${esc(DATA.facilities.find(f=>f.id===id).name)}</text>`;});
 scenery+=rect(16,390,768,8,'#577666')+rect(16,398,768,32,'#34544a')+`<text x="41" y="419" fill="#a8bdac" font-family="monospace" font-size="11">${night?'CLOSED · SEE YOU TOMORROW':'OPEN · ADVENTURERS WELCOME'}</text><text x="759" y="419" text-anchor="end" fill="#c9c8a5" font-size="11" font-family="sans-serif">${esc(s.branch)}</text>`;
 return `<svg viewBox="0 0 800 430" preserveAspectRatio="xMidYMax slice" class="store-art" role="img" aria-label="길드24 매장 내부. 계산대, 손님, 상품 매대, 냉장고와 설치한 설비." shape-rendering="crispEdges">${scenery}</svg>`;
}
