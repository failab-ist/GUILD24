// v3.0 trailer — compose (User 2026-10-01, reports/trailer-plan.md §9). Dev-only.
// Cuts the deterministic takes from tools/trailer-shoot.cjs into the 30 s store trailer on the title song's beat (90.03 BPM,
// taken from 6.06 s): hard cuts, a settled framing per shot, real UI lifted into cards, one tap mark per choice, word-by-word
// captions, a still logo end card (v3, §10: no edit flashes / shakes / whips). Every picture is a captured game frame or the
// game's own art (store backdrop, title logo); nothing is drawn that the game does not show except the captions, the tap
// mark, the pulse ring and the underline. Renders in a browser canvas, one frame per 1/30 s; the sound is the game's own
// engine rendered offline (renderAudio); ffmpeg muxes.
//   FFMPEG=<path> node tools/trailer-compose.cjs <shootDir>
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..'),EXEC=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',FF=process.env.FFMPEG||'ffmpeg';
const dir=path.resolve(process.argv[2]);const shoot=JSON.parse(fs.readFileSync(path.join(dir,'shoot.json'),'utf8'));const T=shoot.takes;
const cue=(take,name,i=0)=>T[take].cues.filter(c=>c[0]===name)[i][1];
const rect=(take,label,key,i=0)=>T[take].rects.find(r=>r.label===label).r[key][i];
const ctr=r=>[r[0]+r[2]/2,r[1]+r[3]/2];
const b=60/90.03,B=4*b;                                 // beat, bar
const SONG_IN=6.06,FPS=30;                          // the length (DUR) is what the edit comes to (v5)
// ---- source time maps (v4, §11: User + GPT review 2026-10-01 — the sale ends on the hand-over, the night holds 1.2 s after the
// underline, 오름찬's later visit replaces the ready-party card, the clash keeps its own speed, the result is two cuts, logo at 27 s) ----
const tapItem=T.sale.marks.tapItem,tapPrice=T.sale.marks.tapPrice,great=cue('night','great'),collapse=cue('final','collapse');
const itemR=rect('sale','rScroll','item'),priceR=rect('sale','rPrice','price'),destR=rect('sale','r0','dest'),portraitR=rect('sale','r0','portrait');
const heroR=rect('night','r1','hero'),standR=rect('night','r1','stand'),heroText=T.night.marks.heroText;
const g=k=>+(k*b).toFixed(4);                          // beat k on the output grid
const S=[];const shot=(t0,t1,take,src,cam,extra={})=>S.push({t0,t1,take,src,cam,...extra});
const lin=(o,s0,speed=1)=>t=>s0+(t-o)*speed;            // output t → source t
const hold=s0=>()=>s0;
// S0 the empty shop; footsteps come closer (audio), 단 30일.
shot(0,g(4),'store',hold(0),[[0,470,860,1.0],[g(4),470,820,1.10]],{bob:[[0.867,16],[1.467,15],[2.067,9]]});   // walking: the view dips on each step
// S1 the customer arrives on the last step: face and destination in one framing
shot(g(4),g(6),'sale',lin(g(4),0.2),[[g(4),607,1030,1.06]]);   // v7: no spotlight — the caption's own soft band does the work
// S2 the Boss
shot(g(6),g(8),'final',lin(g(6),0.1),[[g(6),560,700,1.22],[g(6)+0.35,560,700,1.12],[g(8),560,690,1.10]]);
// S3 the product, large: tap once (the tray opens over the row on the tap, so the card holds the row as tapped while the mark plays)
const oItem=g(10),itemOff=oItem+0.4,itemCard={taps:[[oItem,...ctr(itemR),'card']],callouts:[[g(8),itemOff,[81,itemR[1],720,itemR[3]],1064,860,0,true]]};
shot(g(8),oItem,'sale',lin(oItem,tapItem),[[g(8),607,1080,1.0]],itemCard);
shot(oItem,itemOff,'sale',hold(tapItem-1/30),[[oItem,607,1080,1.0]],itemCard);
// S4 name + the three live prices in one card, clear of the frame edge: 0.75 s to see the three, the 할인 key's ring 0.9 s, one tap
// (held while the mark plays), then the real sale full screen from the frame the tray has closed: the hand-over, the answer, 0.5 s
const SOLD=tapPrice+4/30,oPrice=itemOff+0.75+0.9,handOff=oPrice+0.26,N0=handOff+(8.8-SOLD)+0.5;
const trayCard={taps:[[oPrice,...ctr(priceR),'card']],pulse:[itemOff+0.75,oPrice,priceR],callouts:[[itemOff,handOff,[40,1372,1135,532],1010,900,0,true]]};
shot(itemOff,oPrice,'sale',lin(oPrice,tapPrice),[[itemOff,607,1080,1.0]],trayCard);
shot(oPrice,handOff,'sale',hold(tapPrice-1/30),[[oPrice,607,1080,1.0]],trayCard);
shot(handOff,N0,'sale',lin(handOff,SOLD),[[handOff,607,1080,1.0]]);
// S5 night (v6): the full frame, still (the v5 push was too small to read as one — User: drop it; the full frame also keeps the
// left margin); the stamp and the face first (the stamp falls on the song's hit near 10.04 s), then the cause line is underlined
// to its own length, 0.9 s to read, cut
const oGreat=N0+(great-0.5),ulT=oGreat+1.4,NE=ulT+0.45+0.9;   // v7: +0.15 s so the swish clears the 대성공 ring
shot(N0,NE,'night',lin(oGreat,great),[[N0,607,1080,1.0]],
 {dark:[N0,N0+0.2,0.18],underline:[ulT,0.45,heroText],spots:[[ulT-0.1,NE,[standR,heroR],0.6]]});
// S6 the same customer's later visit (D28, Lv.19, the line the game gave it), lifted with its portrait card only
const C0=NE+2.2,rvR=[30,0,486,816];
shot(NE,C0,'revisit',lin(NE,0.15),[[NE,607,1080,1.0]],{callouts:[[NE,C0,rvR,720,700,0,true]]});
// S7 the clash in one still framing: the battle screen comes in, 0.4 s, the first exchange, then the last exchange through the boss's
// bar running out to the collapse, all at the game's own speed. The supply icons and the second exchange are cut, with their sounds.
const E1=C0+(3.95-2.75),E3=E1+(8.26-6.62),oCol=E3+(collapse-9.32),RES=oCol+(13.8-collapse);
shot(C0,E1,'final',lin(C0,2.75),[[C0,607,1040,1.04]],{inset:[0.82,-80]});
shot(E1,E3,'final',lin(E1,6.62),[[E1,607,1040,1.04]],{inset:[0.82,-80]});
shot(E3,RES,'final',lin(E3,9.32),[[E3,607,1040,1.04]],{inset:[0.82,-80]});
// S8 the result, one shot: the receipt lands with its seal, then one 0.6 s push centred on 마왕이 쓰러졌다. / 우리 점포에서 떠난
// 원정대가 해냈다. (the header and the figures stay at the edge); on the stop a pale gold wash behind the two lines and a short burst of
// gold pixels along the frame edge, with the game's settlement cue; 1 s to read, then the title
const seal=cue('final','sealwin'),rIn=RES+(seal-13.8)+0.12,rOut=rIn+0.6,LOGO=rOut+0.9,LOGO_LAND=LOGO+0.45+0.18,LOGO_HOLD=2.3,DUR=+(LOGO_LAND+1.05+LOGO_HOLD+0.6).toFixed(4);   // v9: landing → glow (to +0.85) → genre line full at +1.05 → 2.3 s still → 0.6 s fade
const line1=[128,452,430,80];
shot(RES,LOGO,'final',lin(RES,13.8),[[RES,631,600,1.18],[rIn,631,600,1.18],[rOut,445,600,1.75]],{glow:[rOut,line1],burst:[rOut,0.7,line1]});
// S9 the logo, still
shot(LOGO,DUR,'logo',hold(0),[[LOGO,0,0,1]]);
// ---- captions: one at a time, placed off the key UI ----------------------------------------------------------------
const CAP=[
 {t0:0.32,t1:g(4)-0.12,font:'MUL',size:200,y:900,lines:[[['단',0],['30일.',1]]]},
 {t0:g(4)+0.05,t1:g(6)-0.01,font:'WSB',size:96,y:1440,band:1,bandIn:0.2,lead:0.1,outDur:0.08,lines:[[['편의점에서',0],['시작되는',0]]]},
 {t0:g(6)+0.04,t1:g(8)-0.1,font:'MUL',size:210,y:1500,lines:[[['마왕',1],['토벌.',1]]],slam:true},
 {t0:g(8)+0.08,t1:oPrice-0.12,font:'WSB',size:84,y:1440,band:1,lines:[[['당신이',0],['건넨',0]],[['물건',1],['하나가',1]]]},
 {t0:oGreat+0.05,t1:ulT-0.08,font:'WSB',size:86,y:1440,band:1,lines:[[['그들의',0],['생사를',1],['가른다.',0]]]},
 {t0:NE+0.05,t1:C0-0.08,font:'WSB',size:84,y:1440,band:1,lines:[[['키워낸',0],['단골들과',1],['함께',0]]]},
 {t0:E1+0.5,t1:oCol-0.3,font:'MUL',size:104,y:1440,band:1,lines:[[['마왕을',1],['쓰러뜨려라.',0]]],slam:true}];   // the shared line, under the raised party
// the game's own cues, each mapped through the shot that shows its source moment (a cue in a cut span is dropped with it);
// the item tap's cue falls in the held frame, so it is placed from the tap
const mapCue=(take,st)=>{for(const s of S){if(s.take!==take)continue;const a=s.src(s.t0),z=s.src(s.t1);if(z>a&&st>=a&&st<z)return s.t0+(st-a)*(s.t1-s.t0)/(z-a);}return null;};
// the result's jingle is the game's run-start fanfare `begin` (G–D–G, triangle) — not `great`, which already carries the night stamp
const CUES=[['button',oItem+(cue('sale','button')-tapItem)],['begin',rOut],['order',LOGO_LAND-0.007],   // `order` = the game's stamp sample (its impact is 0.007 s in)

 ...['sale','night','final'].flatMap(k=>T[k].cues.filter(c=>c[0]!=='button').map(c=>[c[0],mapCue(k,c[1])]).filter(c=>c[1]!=null))];
const DUCKS=[[rOut,0.8,0.5],[LOGO_LAND,0.5,0.3]];   // the music steps back under the result's jingle and the logo's stamp (on top of a cue's own duck)
const STEPS=[[0.867,0.55,'L'],[1.467,0.68,'R'],[2.067,0.84,'L'],[2.667,1,'R']];   // footsteps (not a game cue): 0.6 s apart, closer each step, the last on the cut
// recorded steps (assets-src/trailer/footsteps/kenney-rpg-audio, CC0): left = footstep00, right = footstep01 — both a heavy sole impact
// with a short floor scuff ~0.1 s after and no click above 2 kHz (v7 §14); `hit` = the impact's offset inside the file
const FOOT={L:{file:'footstep00.ogg',hit:0.028},R:{file:'footstep01.ogg',hit:0.038}},FOOT_DIR=path.join(ROOT,'assets-src/trailer/footsteps/kenney-rpg-audio');
const STROKES=[[ulT,0.42]];   // the underline's swish (not a game cue)
const THUDS=[[LOGO_LAND,1]];   // v8: a short low thud under the logo's stamp (the stamp sample alone is light); gone within 0.15 s
const CONFIG={DUR,FPS,LOGO,shots:S,caps:CAP,room:'file://'+path.join(ROOT,'dist/ui/assets/presentation/final/B006_LUST_BACKDROP.png'),takes:Object.fromEntries(Object.entries(T).map(([k,t])=>[k,{dir:'file://'+t.dir,fps:t.fps,n:t.frames.length,w:t.size[0],h:t.size[1]}])),
 store:'file://'+path.join(ROOT,'dist/ui/assets/presentation/morning/store-bg-phone.png'),logo:'file://'+path.join(ROOT,'dist/ui/assets/presentation/start/title-logo.png'),
 mul:'file://'+path.join(ROOT,'vendor/mulmaru/Mulmaru.woff2'),wsb:'file://'+path.join(ROOT,'node_modules/wanted-sans/fonts/ttf/WantedSans-Black.ttf'),
 wsm:'file://'+path.join(ROOT,'node_modules/wanted-sans/fonts/ttf/WantedSans-SemiBold.ttf')};
const PAGE=`<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:#000;overflow:hidden}canvas{display:block}</style><canvas id=c width=1080 height=1920></canvas><script>
const C=__CONFIG__;const cv=document.getElementById('c'),x=cv.getContext('2d');const W=1080,H=1920;
const cache=new Map();function img(src){if(cache.has(src))return cache.get(src);const p=new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});cache.set(src,p);
 if(cache.size>12){cache.delete(cache.keys().next().value);}return p;}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),outBack=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
function camAt(k,t){if(t<=k[0][0])return k[0].slice(1);for(let i=1;i<k.length;i++)if(t<=k[i][0]){const a=k[i-1],b=k[i],u=ease((t-a[0])/Math.max(1e-6,b[0]-a[0]));return [a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u,a[3]+(b[3]-a[3])*u];}return k[k.length-1].slice(1);}
function rnd(n){const s=Math.sin(n*127.1)*43758.5453;return s-Math.floor(s);}
// a footfall: the view drops fast (0.12 s) and comes back with a small damped overshoot; content moves up as the view drops
function bobAt(bb,t){let v=0;for(const [ts,A] of bb||[]){const u=t-ts;if(u<0)continue;v+=u<0.12?-A*ease(u/0.12):-A*Math.exp(-3*(u-0.12))*Math.cos(Math.PI*(u-0.12)/0.4);}return v;}
function shakeAt(sh,t){let dx=0,dy=0;for(const [t0,d,a] of sh||[]){if(t<t0||t>t0+d)continue;const u=1-(t-t0)/d,amp=a*u*u;const k=Math.floor(t*60);dx+=(rnd(k)-.5)*2*amp;dy+=(rnd(k+99)-.5)*2*amp;}return [dx,dy];}
let FONTS=false;async function fonts(){if(FONTS)return;for(const [n,u,w] of [['MUL',C.mul,'400'],['WSB',C.wsb,'900'],['WSM',C.wsm,'600']]){const f=new FontFace(n,'url('+u+')',{weight:w});await f.load();document.fonts.add(f);}FONTS=true;}
async function render(t){await fonts();x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.filter='none';x.fillStyle='#000';x.fillRect(0,0,W,H);
 const s=C.shots.find(s=>t>=s.t0&&t<s.t1)||C.shots[C.shots.length-1];
 if(s.take==='logo'){await logo(t);}else{
  let im,sw,sh;if(s.take==='store'){im=await img(C.store);sw=im.width;sh=im.height;}else{const tk=C.takes[s.take];const st=new Function('t','return ('+s.srcFn+')(t)')(t);
   const n=clamp(Math.round(st*tk.fps),0,tk.n-1);im=await img(tk.dir+'/'+String(n).padStart(5,'0')+'.jpg');sw=tk.w;sh=tk.h;}
  const [cx,cy,z]=camAt(s.cam,t);const [dx,dy0]=shakeAt(s.shake,t);const dy=dy0+bobAt(s.bob,t);const over=(s.shake||s.bob)?1.035:1;
  let cw=sw/(z*over),ch=cw*H/W;if(ch>sh){ch=sh;cw=ch*W/H;}const sx=clamp(cx-cw/2,0,sw-cw),sy=clamp(cy-ch/2,0,sh-ch);
  const nx=C.shots[C.shots.indexOf(s)+1];let wx=0,wb=0;if(s.whip&&t<s.t0+0.13){const u=1-(t-s.t0)/0.13;wx=170*u*u;wb=18*u;}if(nx&&nx.whip&&t>s.t1-0.1){const u=(t-(s.t1-0.1))/0.1;wx=-170*u*u;wb=18*u;}
  x.imageSmoothingQuality='high';if(wb>0.5)x.filter='blur('+wb.toFixed(1)+'px)';x.drawImage(im,sx,sy,cw,ch,dx+wx,dy,W,H);x.filter='none';
  if(s.inset){/* the whole game frame shrunk and raised, over the same boss room (the game's backdrop art) enlarged and darkened; the
     frame's sides and foot are feathered into the room so no new edge is drawn */
   const [k,oy]=s.inset;const fr=document.createElement('canvas');fr.width=W;fr.height=H;const f=fr.getContext('2d');f.drawImage(cv,0,0);
   f.globalCompositeOperation='destination-in';const gv=f.createLinearGradient(0,0,0,H);gv.addColorStop(0,'#000');gv.addColorStop(0.9,'#000');gv.addColorStop(1,'rgba(0,0,0,0)');f.fillStyle=gv;f.fillRect(0,0,W,H);
   const gh=f.createLinearGradient(0,0,W,0);gh.addColorStop(0,'rgba(0,0,0,0)');gh.addColorStop(0.05,'#000');gh.addColorStop(0.95,'#000');gh.addColorStop(1,'rgba(0,0,0,0)');f.fillStyle=gh;f.fillRect(0,0,W,H);
   const bd=await img(C.room);const bh=H*1.12,bw=bd.width*bh/bd.height;x.fillStyle='#000';x.fillRect(0,0,W,H);
   x.save();x.filter='blur(5px) brightness(0.36)';x.drawImage(bd,(W-bw)/2,(H-bh)/2,bw,bh);x.restore();
   x.drawImage(fr,(W-W*k)/2,oy,W*k,H*k);}
  const map=(px,py)=>[(px-sx)/cw*W+dx,(py-sy)/ch*H+dy],mapR=r=>{const [a,b2]=map(r[0],r[1]),[c,d]=map(r[0]+r[2],r[1]+r[3]);return [a,b2,c-a,d-b2];};
  if(s.take==='store'){x.fillStyle='rgba(10,6,4,'+(0.30+0.25*clamp(t/1.2,0,1))+')';x.fillRect(0,0,W,H);}
  for(const sp of s.spots||[]){if(t<sp[0]||t>sp[1])continue;const a=sp[3]*Math.min(clamp((t-sp[0])/0.3,0,1),clamp((sp[1]-t)/0.2,0,1));x.save();x.fillStyle='rgba(0,0,0,'+a+')';x.beginPath();x.rect(0,0,W,H);for(const r of sp[2]){const [a1,b1,c1,d1]=mapR(r);x.roundRect(a1-12,b1-10,c1+24,d1+20,18);}x.fill('evenodd');x.restore();}
  if(s.underline&&t>=s.underline[0]){const [a1,b1,c1,d1]=mapR(s.underline[2]);const u=ease(clamp((t-s.underline[0])/s.underline[1],0,1));x.save();x.shadowColor='rgba(255,205,90,.95)';x.shadowBlur=30;x.fillStyle='#ffd65e';x.fillRect(a1,b1+d1+5,c1*u,12);x.restore();}
  let co=null;for(const c of s.callouts||[]){if(t>=c[0]&&t<c[1]){co=c;break;}}
  let mapP=null;if(co){const [t0c,t1c,r,tw,ty,rot,noPop]=co;const u=noPop?1:clamp((t-t0c)/0.24,0,1),ex=noPop?1:clamp((t1c-t)/0.14,0,1);const pop=noPop?1:(0.86+0.14*outBack(u))*(0.94+0.06*ex),A=Math.min(1,u*1.8)*ex;
   x.save();x.globalAlpha=A;x.filter='blur(12px) brightness(0.42)';x.drawImage(cv,0,0);x.restore();
   const ow=tw,oh=r[3]*tw/r[2],R=rot*Math.PI/180;x.save();x.globalAlpha=A;x.translate(W/2,ty);x.rotate(R);x.scale(pop,pop);
   x.shadowColor='rgba(0,0,0,.85)';x.shadowBlur=60;x.shadowOffsetY=24;x.fillStyle='#000';x.beginPath();x.roundRect(-ow/2,-oh/2,ow,oh,22);x.fill();x.shadowColor='transparent';
   x.save();x.clip();x.drawImage(im,r[0],r[1],r[2],r[3],-ow/2,-oh/2,ow,oh);x.restore();
   x.lineWidth=5;x.strokeStyle='rgba(255,214,120,0.85)';x.beginPath();x.roundRect(-ow/2,-oh/2,ow,oh,22);x.stroke();x.restore();
   const k=tw/r[2]*pop;mapP=(px,py)=>{const lx=(px-(r[0]+r[2]/2))*k,ly=(py-(r[1]+r[3]/2))*k;return [W/2+lx*Math.cos(R)-ly*Math.sin(R),ty+lx*Math.sin(R)+ly*Math.cos(R)];};}
  const onCard=!!mapP;mapP=mapP||map;const mapRP=r=>{const [a,b2]=mapP(r[0],r[1]),[c,d]=mapP(r[0]+r[2],r[1]+r[3]);return [a,b2,c-a,d-b2];};
  if(s.pulse&&t>=s.pulse[0]&&t<s.pulse[1]+0.25){const [a1,b1,c1,d1]=mapRP(s.pulse[2]);const k=((t-s.pulse[0])%0.55)/0.55;x.save();x.strokeStyle='rgba(255,214,110,'+(0.95*(1-k))+')';x.lineWidth=8;x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=20;
   x.beginPath();x.roundRect(a1-6-14*k,b1-6-14*k,c1+12+28*k,d1+12+28*k,22);x.stroke();x.restore();}
  for(const tp of s.taps||[]){const u=(t-tp[0])/0.42;if(u<-0.05||u>1)continue;if(tp[3]==='card'&&!onCard)continue;const [px,py]=mapP(tp[1],tp[2]);x.save();
   if(u<0.25){x.fillStyle='rgba(255,255,255,'+(0.75*(1-u/0.25))+')';x.beginPath();x.arc(px,py,38,0,7);x.fill();}
   if(u>=0){x.strokeStyle='rgba(255,255,255,'+(0.9*(1-u))+')';x.lineWidth=7;x.beginPath();x.arc(px,py,38+110*ease(clamp(u,0,1)),0,7);x.stroke();}x.restore();}
  if(s.glow&&t>=s.glow[0]){const a=clamp((t-s.glow[0])/0.25,0,1);const [a1,b1,c1,d1]=mapR(s.glow[1]);
   /* multiply: the gold sits behind the dark type of the line, as a marker would; in over 0.25 s and held */
   x.save();x.globalCompositeOperation='multiply';x.globalAlpha=0.85*a;const gr=x.createLinearGradient(a1-30,0,a1+c1+30,0);gr.addColorStop(0,'rgba(240,170,50,0)');gr.addColorStop(0.08,'#f0b03c');gr.addColorStop(0.92,'#f0b03c');gr.addColorStop(1,'rgba(240,170,50,0)');
   x.fillStyle=gr;x.beginPath();x.roundRect(a1-30,b1-10,c1+60,d1+20,18);x.fill();x.restore();}
  if(s.burst&&t>=s.burst[0]&&t<s.burst[0]+s.burst[1]){const u=(t-s.burst[0])/s.burst[1],e=t-s.burst[0];const [a1,b1,c1,d1]=mapR(s.burst[2]);x.save();
   /* one burst either side of the line, outward and up, so nothing crosses the words; big pixels with a dark rim to read on paper */
   for(let i=0;i<36;i++){const right=i%2,r1=rnd(i*3.1+1),r2=rnd(i*7.7+2),r3=rnd(i*1.9+3);
    const ox=right?a1+c1+28:a1+16,oy=right?b1+d1/2:b1-16,vx=right?110+r1*300:-70+r1*170,vy=-(right?160+r2*420:300+r2*380);   /* the left margin is narrow: the left burst starts just above the line's head and rises */
    const px=ox+vx*e,py=oy+vy*e+720*e*e,sz=Math.round(12+r3*12),a=u<0.7?1:(1-u)/0.3;
    x.globalAlpha=a;x.fillStyle='#4a2a06';x.fillRect(px-sz/2-3,py-sz/2-3,sz+6,sz+6);x.fillStyle=i%3===0?'#fff4b8':i%3===1?'#ffc21a':'#ff9a00';x.fillRect(px-sz/2,py-sz/2,sz,sz);}
   x.restore();}
  if(s.dark&&t<s.dark[1]){const a=t<s.dark[1]-s.dark[2]?1:(s.dark[1]-t)/s.dark[2];x.fillStyle='rgba(6,10,26,'+clamp(a,0,1)+')';x.fillRect(0,0,W,H);}
  if(s.flash&&t>=s.flash[0]&&t<s.flash[0]+s.flash[1]){const u=1-(t-s.flash[0])/s.flash[1];x.fillStyle='rgba('+s.flash[2]+','+(s.flash[3]*u*u)+')';x.fillRect(0,0,W,H);}
 }
 vignette();captions(t);
 if(t<0.45){x.fillStyle='rgba(0,0,0,'+(1-t/0.45)+')';x.fillRect(0,0,W,H);}if(t>C.DUR-0.6){x.fillStyle='rgba(0,0,0,'+((t-(C.DUR-0.6))/0.6)+')';x.fillRect(0,0,W,H);}
 return true;}
function vignette(){const g=x.createRadialGradient(W/2,H*0.48,H*0.28,W/2,H*0.5,H*0.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.5)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function captions(t){for(const c of C.caps){if(t<c.t0||t>c.t1)continue;const fam=c.font==='MUL'?'MUL':'WSB';x.font=(fam==='MUL'?'400 ':'900 ')+c.size+'px '+fam;x.textBaseline='middle';
  const lh=c.size*(fam==='MUL'?1.12:1.22),total=lh*c.lines.length;let wi=0;const od=c.outDur??0.18,out=(c.t1-t)<od?(c.t1-t)/od:1;
  // v7: a local dim behind the caption only — the footage under it blurred and pressed hard, feathered on all four sides — that
  // settles (0.25 s) before the words come in, so the eye goes to the words and the whole frame never darkens with them
  const lead=c.lead??(c.band?0.2:0);
  if(c.band){const fa=clamp((t-c.t0)/(c.bandIn??0.25),0,1)*out,pad=70,y0=Math.round(c.y-total/2-pad),hh=Math.round(total+2*pad);
   const o=document.createElement('canvas');o.width=W;o.height=hh;const g=o.getContext('2d');g.filter='blur(14px) brightness(0.3)';g.drawImage(cv,0,y0,W,hh,0,0,W,hh);g.filter='none';
   g.fillStyle='rgba(6,4,2,0.5)';g.fillRect(0,0,W,hh);g.globalCompositeOperation='destination-in';
   const gv=g.createLinearGradient(0,0,0,hh);gv.addColorStop(0,'rgba(0,0,0,0)');gv.addColorStop(0.34,'#000');gv.addColorStop(0.66,'#000');gv.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gv;g.fillRect(0,0,W,hh);
   const gh=g.createLinearGradient(0,0,W,0);gh.addColorStop(0,'rgba(0,0,0,0)');gh.addColorStop(0.16,'#000');gh.addColorStop(0.84,'#000');gh.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gh;g.fillRect(0,0,W,hh);
   x.save();x.globalAlpha=fa;x.drawImage(o,0,y0);x.restore();}
  c.lines.forEach((line,li)=>{const sp=x.measureText(' ').width*(fam==='MUL'?0.9:1);const ws=line.map(w=>x.measureText(w[0]).width);const tw=ws.reduce((a,v)=>a+v,0)+sp*(line.length-1);
   let px=W/2-tw/2;const py=c.y-total/2+lh*(li+0.5);
   line.forEach((w,i)=>{const t0=c.t0+lead+wi*(c.slam?0.09:0.07);wi++;const u=clamp((t-t0)/(c.slam?0.2:0.16),0,1);if(u<=0){px+=ws[i]+sp;return;}
    const sc=c.slam?(1+0.55*(1-outBack(u))):(1+0.22*(1-outBack(u)));const a=Math.min(1,u*1.6)*out;const cx=px+ws[i]/2;x.save();x.translate(cx,py-(1-out)*14);x.scale(sc,sc);x.globalAlpha=a;
    x.lineJoin='round';x.lineWidth=fam==='MUL'?c.size*0.11:c.size*0.13;x.strokeStyle='rgba(20,12,6,0.95)';x.shadowColor='rgba(0,0,0,0.85)';x.shadowBlur=26;x.shadowOffsetY=8;
    x.textAlign='center';x.strokeText(w[0],0,0);x.shadowColor='transparent';x.fillStyle=w[1]?(fam==='MUL'?'#ffcf4a':'#ffd36b'):'#fff6e6';x.fillText(w[0],0,0);x.restore();px+=ws[i]+sp;});});}}
async function logo(t){const st=await img(C.store);const u0=clamp((t-C.LOGO)/0.5,0,1),br=0.16+0.26*ease(u0);
 x.save();x.filter='blur(18px) brightness('+br.toFixed(3)+') saturate(1.1)';x.drawImage(st,-60,-100,W+120,H+200);x.restore();
 // the shop lights come up (0.5 s), then the whole logo lands once like a stamp (below), then 0.17 s later the genre line in the
 // game's pixel body face; logo and line then hold still to the end
 const lg=await img(C.logo);const lw=900,lh=lw*lg.height/lg.width,tl=C.LOGO+0.45,LD=0.18,u=clamp((t-tl)/LD,0,1),ei=u*u;
 // v8: 111 % → 100 % in 0.18 s, accelerating into the landing (so it lands, not floats), with a 10 px drop; then exactly still.
 // At 111 % the logo is 999 px wide, so it and its shadow stay inside the frame.
 if(t>=tl){const sc=1.11-0.11*ei,dy=-10*(1-ei);x.save();x.globalAlpha=clamp((t-tl)/0.06,0,1);x.translate(W/2,860+dy);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=40;x.drawImage(lg,-lw/2,-lh/2,lw,lh);x.restore();
  // v9: the gold rim lights once after the landing like a shop sign coming on — up in 0.12 s, held to +0.5 s, eased off by +0.85 s
  const e=t-(tl+LD),gl=e<0?0:e<0.12?e/0.12:e<0.5?1:1-ease(clamp((e-0.5)/0.35,0,1));
  if(gl>0){x.save();x.translate(W/2,860);x.globalAlpha=gl;x.shadowColor='rgba(255,190,80,1)';x.shadowBlur=34;for(let k=0;k<2;k++)x.drawImage(lg,-lw/2,-lh/2,lw,lh);x.restore();}}
 const ga=clamp((t-(tl+LD+0.85))/0.2,0,1);/* the genre line once the glow has had its moment */if(ga>0){
 x.save();x.globalAlpha=ga;x.font='400 64px MUL';x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';x.shadowColor='rgba(0,0,0,.85)';x.shadowBlur=18;x.shadowOffsetY=4;
 x.lineWidth=12;x.strokeStyle='rgba(20,12,6,0.95)';x.strokeText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.shadowColor='transparent';
 x.lineWidth=2.2;x.strokeStyle='#f1e3c2';x.strokeText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.fillStyle='#f1e3c2';x.fillText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.restore();}}
window.render=render;</script>`;
const AUDIO_GAIN=Number(process.env.AUDIO_GAIN||9);   // the engine renders at the game's in-app level (≈ -24 LUFS); the store clip is lifted and limited
async function renderAudio(outWav){const {spawn}=require('node:child_process'),PORT=Number(process.env.QA_PORT||5219);
 const server=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 await new Promise((res,rej)=>{server.stdout.on('data',d=>String(d).includes('ready')&&res());setTimeout(()=>rej(Error('no server')),8000);});
 const pw=require('playwright');const browser=await pw.chromium.launch({executablePath:EXEC,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{const page=await browser.newPage();page.on('pageerror',e=>console.log('AUDIO PAGEERROR',e.message));
  await page.route('**/__trailer-audio.html',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><meta charset=utf-8><script src="ui/audio.js"></script>'}));
  await page.addInitScript(({DUR,SONG_IN})=>{const R=44100,off=new OfflineAudioContext(2,Math.ceil(R*DUR),R);window.__off=off;window.AudioContext=function(){return off;};
   // play() resumes its context first; offline, that would let the render run on while the cue is still being scheduled — so only the renderer resumes
   window.__resume=off.resume.bind(off);off.resume=()=>Promise.resolve();
   // the music bus carries the title song from SONG_IN; an edit-only gain sits between the song and its bus (low under the footsteps, the closing fade)
   const start=AudioBufferSourceNode.prototype.start,connect=AudioNode.prototype.connect;
   AudioNode.prototype.connect=function(dst,...a){if(this instanceof AudioBufferSourceNode&&this.buffer&&this.buffer.duration>60&&!this.__env){const env=off.createGain();this.__env=env;window.__env=env;connect.call(env,dst,...a);return connect.call(this,env);}return connect.call(this,dst,...a);};
   AudioBufferSourceNode.prototype.start=function(at,from,...a){if(this.buffer&&this.buffer.duration>60)return start.call(this,0,SONG_IN);return start.call(this,at,from,...a);};},{DUR,SONG_IN});
  await page.goto(`http://127.0.0.1:${PORT}/__trailer-audio.html`);
  const res=await page.evaluate(async({CUES,STEPS,DUR,DUCKS,FOOT,STROKES,THUDS})=>{const off=window.__off;const S=window.Sound;
   S.sync(false,'title',{bgm:1,sfx:1});
   const t0=Date.now();while(!window.__env&&Date.now()-t0<15000)await new Promise(r=>setTimeout(r,100));await new Promise(r=>setTimeout(r,1500));
   // a 2.2 s fade-in that stays low under the first steps (0.67 / 1.33 s) and reaches the full level as the customer arrives (2.67 s);
   // only the level moves — the song's position (SONG_IN) is what the later cuts are timed to. The closing fade ends with the clip.
   const e=window.__env.gain;e.setValueAtTime(0.0001,0);e.exponentialRampToValueAtTime(0.1,1.0);e.linearRampToValueAtTime(0.4,2.2);e.linearRampToValueAtTime(1,2.67);
   for(const [t0,dur,lv] of DUCKS){e.setValueAtTime(1,t0-0.06);e.linearRampToValueAtTime(lv,t0);e.setValueAtTime(lv,t0+dur);e.linearRampToValueAtTime(1,t0+dur+0.3);}
   e.setValueAtTime(1,DUR-1.6);e.linearRampToValueAtTime(0.0001,DUR);
   // footsteps (v7): the recorded steps, left and right from different files, the impact on the step time, louder each step
   const nb=off.createBuffer(1,Math.round(off.sampleRate*0.6),off.sampleRate),d=nb.getChannelData(0);let q=12345;for(let i=0;i<d.length;i++){q=(q*1103515245+12345)&0x7fffffff;d[i]=q/0x3fffffff-1;}
   const foot={};for(const [k,f] of Object.entries(FOOT)){const bin=atob(f.b64),u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);foot[k]={buf:await off.decodeAudioData(u8.buffer),hit:f.hit};}
   for(const [t,v,side] of STEPS){const f=foot[side],src=off.createBufferSource(),g=off.createGain();src.buffer=f.buf;g.gain.value=0.5*v;src.connect(g);g.connect(off.destination);src.start(Math.max(0,t-f.hit));}
   for(const [t,v] of THUDS){const o=off.createOscillator();o.type='sine';o.frequency.setValueAtTime(92,t);o.frequency.exponentialRampToValueAtTime(46,t+0.11);const g=off.createGain();
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.32*v,t+0.004);g.gain.exponentialRampToValueAtTime(0.0001,t+0.12);o.connect(g);g.connect(off.destination);o.start(t);o.stop(t+0.15);
    const n=off.createBufferSource();n.buffer=nb;const f=off.createBiquadFilter();f.type='lowpass';f.frequency.value=240;const gn=off.createGain();
    gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(0.22*v,t+0.003);gn.gain.exponentialRampToValueAtTime(0.0001,t+0.06);n.connect(f);f.connect(gn);gn.connect(off.destination);n.start(t);n.stop(t+0.1);}
   // the underline's swish: soft noise through a band that rises with the stroke (a marker on paper), small under the music
   for(const [t,dur] of STROKES){const n=off.createBufferSource();n.buffer=nb;const f=off.createBiquadFilter();f.type='bandpass';f.Q.value=1.1;
    f.frequency.setValueAtTime(1400,t);f.frequency.exponentialRampToValueAtTime(2800,t+dur);const g=off.createGain();
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.09,t+0.06);g.gain.setValueAtTime(0.09,t+dur-0.12);g.gain.linearRampToValueAtTime(0,t+dur);
    n.connect(f);f.connect(g);g.connect(off.destination);n.start(t);n.stop(t+dur+0.05);}
   // the game's cues at their kept times: the render suspends 0.1 s ahead and the engine schedules the cue with its own delay
   const by=new Map();for(const [k,t] of CUES){const s=Math.max(0,Math.round((t-0.1)*off.sampleRate/128)*128/off.sampleRate);if(!by.has(s))by.set(s,[]);by.get(s).push([k,t-s]);}
   const fired=[];for(const [s,list] of by)off.suspend(s).then(()=>{for(const [k,dl] of list){S.play(k,dl);fired.push([k,+(off.currentTime+dl).toFixed(3)]);}window.__resume();});
   const buf=await off.startRendering();
   const L=buf.getChannelData(0),Rr=buf.getChannelData(1),n=L.length,ab=new ArrayBuffer(44+n*4),v=new DataView(ab);const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
   ws(0,'RIFF');v.setUint32(4,36+n*4,true);ws(8,'WAVE');ws(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,off.sampleRate,true);v.setUint32(28,off.sampleRate*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,n*4,true);
   let peak=0;for(let i=0;i<n;i++){peak=Math.max(peak,Math.abs(L[i]),Math.abs(Rr[i]));v.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,Rr[i]))*32767,true);}
   const u8=new Uint8Array(ab);let bin='';for(let i=0;i<u8.length;i+=0x8000)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return {b64:btoa(bin),fired,peak};},{CUES,STEPS,DUR,DUCKS,STROKES,THUDS,FOOT:Object.fromEntries(Object.entries(FOOT).map(([k,f])=>[k,{hit:f.hit,b64:fs.readFileSync(path.join(FOOT_DIR,f.file)).toString('base64')}]))});
  fs.writeFileSync(outWav,Buffer.from(res.b64,'base64'));console.log('audio peak',res.peak.toFixed(3),'cues',JSON.stringify(res.fired));}
 finally{await browser.close();server.kill();}}
(async()=>{
 // functions cannot ride JSON: keep each shot's source map as the expression text
 for(const s of S){const probe0=s.src(s.t0),probe1=s.src(s.t1);const speed=(probe1-probe0)/Math.max(1e-6,s.t1-s.t0);s.srcFn=`(t=>${probe0.toFixed(5)}+(t-${s.t0.toFixed(5)})*${speed.toFixed(6)})`;delete s.src;}
 const html=path.join(dir,'compose.html');fs.writeFileSync(html,PAGE.replace('__CONFIG__',JSON.stringify(CONFIG)));
 const pw=require('playwright');const browser=await pw.chromium.launch({executablePath:EXEC,args:['--no-sandbox','--allow-file-access-from-files']});
 const page=await (await browser.newContext({viewport:{width:1080,height:1920},deviceScaleFactor:1})).newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,200));});
 await page.goto('file://'+html);const out=path.join(dir,'comp');const t0=Date.now();if(!process.env.SKIP_VIDEO){fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);}
 for(let n=0;n<(process.env.SKIP_VIDEO?0:Math.round(DUR*FPS));n++){await page.evaluate(t=>window.render(t),n/FPS);fs.writeFileSync(path.join(out,String(n).padStart(5,'0')+'.jpg'),await page.screenshot({type:'jpeg',quality:94}));}
 await browser.close();console.log('rendered',Math.round(DUR*FPS),'frames in',((Date.now()-t0)/1000).toFixed(0),'s');
 // audio: rendered by the game's own engine (dist/ui/audio.js) in an OfflineAudioContext. The title song plays through the engine's
 // music bus from its first bar at SONG_IN, so every cue's level against the music and every cue's own duck (half, great, sealwin …)
 // is the game's; the cues fire at their kept times (CUES). Added for the edit only: the footsteps before the first customer
 // (no game cue exists for them), the music held low under them, and the closing fade.
 const wav=path.join(dir,'mix.wav');await renderAudio(wav);
 const mp4=path.join(dir,'trailer-v9-1080x1920.mp4');
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-framerate',String(FPS),'-i',path.join(out,'%05d.jpg'),'-i',wav,
  '-af',`volume=${AUDIO_GAIN}dB,alimiter=limit=0.89:level=false`,'-map','0:v','-map','1:a','-t',String(DUR),'-r',String(FPS),'-c:v','libx264','-profile:v','high','-preset','slow','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',mp4]);
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-i',mp4,'-vf','scale=540:960','-c:v','libx264','-preset','veryfast','-crf','23','-c:a','copy',path.join(dir,'trailer-v9-540.mp4')]);
 fs.writeFileSync(path.join(dir,'edl.json'),JSON.stringify({beat:b,bar:B,songIn:SONG_IN,shots:S.map(s=>({t0:+s.t0.toFixed(3),t1:+s.t1.toFixed(3),take:s.take,src:s.srcFn})),cues:CUES,steps:STEPS},null,1));
 console.log('done',mp4);
})().catch(e=>{console.error(e);process.exit(1);});
