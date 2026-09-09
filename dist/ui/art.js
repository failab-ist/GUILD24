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
 if(['water','potion','antidote','wine'].includes(p)){const c=p==='water'?'#80bfce':p==='potion'?'#e09b9c':p==='antidote'?green:'#b094be';s=rect(16,3,10,5,p==='water'?'#639aa9':'#a68464')+rect(16,8,10,7,base)+rect(11,15,20,21,c)+rect(15,18,3,13,'#dceee1')+rect(18,23,13,9,base)+rect(22,24,3,6,dark)+rect(20,26,7,2,dark);}
 if(['coffee','energy'].includes(p))s=rect(12,7,19,30,p==='coffee'?'#bc9971':'#9abb75')+rect(12,5,19,3,'#cbd9d0')+rect(12,35,19,3,'#9baea6')+rect(14,17,15,11,'#efe3c4')+`<path d="M23 17L17 24H22L18 31L27 22H22Z" fill="${dark}"/>`;
 if(p==='ramen')s=`<path d="M7 14H35L31 37H11Z" fill="${id==='lava'?'#d96958':'#dfa05e'}"/>`+rect(5,11,32,5,'#ede6ce')+rect(10,21,23,9,'#f4e6c5')+rect(15,24,12,3,'#bc6650')+rect(14,5,2,4,'#dbe9d6')+rect(24,3,2,6,'#dbe9d6');
 if(p==='bar')s=rect(19,28,4,12,'#bd9964')+rect(12,7,18,24,id==='dragon'?'#dc6e54':'#c8935e')+rect(14,7,3,21,'#e9b875')+rect(14,13,12,2,'#a36c44')+rect(14,21,12,2,'#a36c44');
 if(p==='choco')s=rect(7,13,30,19,'#8e7267')+rect(10,16,24,13,'#d9af82')+rect(19,13,15,19,'#746158')+rect(23,17,7,11,'#aa8470');
 if(['bandage','kit','mask','heat'].includes(p)){const col=p==='kit'?'#d5dfcc':p==='heat'?'#d69776':'#e0dfc8';s=rect(7,12,30,23,col)+rect(12,9,20,3,col);if(p==='mask')s+=rect(11,17,22,13,'#96b5ab')+rect(12,20,20,2,'#cbdbcf');else s+=rect(19,16,5,15,p==='heat'?'#f5d7a5':'#bd7d6a')+rect(14,21,15,5,p==='heat'?'#f5d7a5':'#bd7d6a');}
 if(p==='ice')s=`<path d="M9 10H34L30 37H13Z" fill="#8dc6cd"/>`+rect(7,8,29,4,'#d5e8df')+rect(13,16,9,9,'#cce5df')+rect(23,22,7,8,'#b7dfdc');
 if(p==='battery'||p==='mana')s=rect(14,5,15,4,'#c6d0c5')+rect(10,9,23,28,p==='mana'?'#a49ad5':'#d0ad69')+rect(10,19,23,15,'#435956')+rect(18,14,7,2,'#f6e4b4')+rect(20,12,2,6,'#f6e4b4')+rect(17,26,9,3,p==='mana'?'#b5dfdf':'#e0c793');
 if(p==='cloak')s=`<path d="M16 5H26L31 14L37 37H6L11 14Z" fill="#7da4a2"/><path d="M16 6L13 14H29L25 6Z" fill="#4b7474"/>`+rect(20,17,2,19,'#a1c2b3');
 if(p==='stone')s=`<path d="M20 4L34 15L29 34L20 40L9 31L6 16Z" fill="#8ebbc1"/><path d="M20 4L17 22L6 16Z" fill="#d0e6d9"/><path d="M17 22L20 40L34 15Z" fill="#6f939e"/>`;
 if(p==='lunch')s=rect(5,13,33,23,id==='tree'?'#abd2a5':'#554f58')+rect(7,15,29,19,'#e9dfc2')+rect(9,17,12,15,'#f1eddb')+rect(24,17,10,6,'#a6b97b')+rect(24,25,10,7,id==='tree'?'#7aad8b':'#d29167')+rect(18,21,3,3,'#9d705e');
 if(p==='coupon')s=rect(4,11,35,23,'#e8c567')+rect(7,14,29,17,'#846d3d')+`<text x="21" y="26" text-anchor="middle" fill="#f7db82" font-family="monospace" font-size="10" font-weight="bold">1+1</text>`;
 return `<svg class="item-art" width="${size}" height="${size}" viewBox="0 0 44 44" shape-rendering="crispEdges" role="img" aria-label="${esc(it.name)}">${s}</svg>`;
}
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
 return `<svg viewBox="0 0 800 430" class="store-art" role="img" aria-label="길드24 매장 내부. 계산대, 손님, 상품 매대, 냉장고와 설치한 설비." shape-rendering="crispEdges">${scenery}</svg>`;
}
G.Art={avatar,itemIcon,scene,esc};
})(globalThis);
