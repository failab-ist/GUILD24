// v3.0 trailer — compose (User 2026-10-01, reports/trailer-plan.md §9). Dev-only.
// Cuts the deterministic takes from tools/trailer-shoot.cjs into the 30 s store trailer: one cut per bar of the title
// song (90.03 BPM, taken from 6.06 s), a camera (push / pan / punch) per shot, hit flashes and shakes on the game's own
// cue times, a tap mark on the real taps, word-by-word captions, the logo end card. Every picture is a captured game
// frame or the game's own art (store backdrop, title logo); nothing is drawn that the game does not show except the
// captions, the tap mark and the underline. Renders in a browser canvas, one frame per 1/30 s, then muxes with ffmpeg.
//   FFMPEG=<path> node tools/trailer-compose.cjs <shootDir>
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..'),EXEC=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',FF=process.env.FFMPEG||'ffmpeg';
const dir=path.resolve(process.argv[2]);const shoot=JSON.parse(fs.readFileSync(path.join(dir,'shoot.json'),'utf8'));const T=shoot.takes;
const cue=(take,name,i=0)=>T[take].cues.filter(c=>c[0]===name)[i][1];
const rect=(take,label,key,i=0)=>T[take].rects.find(r=>r.label===label).r[key][i];
const ctr=r=>[r[0]+r[2]/2,r[1]+r[3]/2];
const b=60/90.03,B=4*b;                                 // beat, bar
const SONG_IN=6.06,DUR=30,FPS=30;
// ---- source time maps -------------------------------------------------------------------------------------------
const tapItem=T.sale.marks.tapItem,tapPrice=T.sale.marks.tapPrice,great=cue('night','great');
const clash1=cue('final','clash',0),counter1=cue('final','counter',0),clash3=cue('final','clash',2),counter3=cue('final','counter',2),collapse=cue('final','collapse'),seal=cue('final','sealwin');
const itemR=rect('sale','rScroll','item'),priceR=rect('sale','rPrice','price'),tillsR=rect('sale','r1','tills'),destR=rect('sale','r0','dest'),portraitR=rect('sale','r0','portrait');
const deltaR=rect('sale','r1','delta');const heroR=rect('night','r1','hero'),standR=rect('night','r1','stand'),cardR=rect('final','r2','cCard',0),closedR=rect('final','r3','closed'),sealR=rect('final','r3','seal');
const g=k=>+(k*b).toFixed(4);                          // beat k on the output grid
const S=[];const shot=(t0,t1,take,src,cam,extra={})=>S.push({t0,t1,take,src,cam,...extra});
const lin=(o,s0,speed=1)=>t=>s0+(t-o)*speed;            // output t → source t
// S0 store: the shop, 단 30일.
shot(0,g(4),'store',()=>0,[[0,470,860,1.0],[g(4),470,820,1.10]]);
// S1 the customer arrives
shot(g(4),g(6),'sale',lin(g(4),0.2),[[g(4),265,470,2.29],[g(6),265,480,2.4]],{flash:[g(4),0.14,'255,255,255',0.75]});
// S2 the Boss
shot(g(6),g(8),'final',lin(g(6),0.1),[[g(6),560,700,1.3],[g(6)+0.35,560,700,1.12],[g(8),560,690,1.08]],{flash:[g(6),0.22,'255,70,40',0.65],shake:[[g(6),0.32,22]]});
// S3 who they are, where they go
shot(g(8),g(12),'sale',lin(g(8),1.0),[[g(8),265,470,2.29],[g(8)+0.6,265,470,2.29],[g(12)-0.5,853,620,1.79],[g(12),853,620,1.84]]);
// S4 the shelf: the tap, the tray
const o4=g(13);shot(g(12),g(16),'sale',lin(o4,tapItem),[[g(12),607,ctr(itemR)[1]+120,1.1],[o4,607,ctr(itemR)[1]+120,1.12],[o4+0.55,607,1500,1.06],[g(16),607,1500,1.08]],
 {taps:[[o4,...ctr(itemR)]],whip:true,callouts:[[g(12)+0.12,o4+0.38,itemR,1000,880,-1.6],[o4+0.5,g(16)+0.02,[24,1380,1167,530],1010,980,1.2]]});
// S5 the price: three keys, one open; the hand-over
const o5=g(17);shot(g(16),g(20),'sale',lin(o5,tapPrice),[[g(16),607,1500,1.08],[o5+0.2,607,1500,1.1],[o5+0.75,607,1080,1.0],[g(20),607,1050,1.04]],
 {taps:[[o5,...ctr(priceR)]],pulse:[g(16)+0.25,o5,priceR],whip:true,callouts:[[g(16),o5+0.14,[24,1500,1167,410],1010,960,-1.2]]});
// S6 night: the same customer comes back, the stamp lands on the beat
const o6=g(21);shot(g(20),g(24),'night',lin(o6,great),[[g(20),607,1110,1.12],[g(24),607,1100,1.24]],
 {dark:[g(20),o6-great+0.62,0.18],flash:[o6,0.16,'255,236,170',0.7],shake:[[o6,0.28,16]]});
// S7 the reason: 불룡볶음면 덕분에 대성공했다.
const s7in=lin(o6,great)(g(24));shot(g(24),g(28),'night',lin(g(24),s7in),[[g(24),607,1100,1.12],[g(28),607,1060,1.05]],
 {underline:[g(24)+0.85,0.45,heroR],spots:[[g(24)+0.55,g(28),[standR,heroR],0.66]]});
// S8 thirty days later: the party, the supplies
shot(g(28),g(32),'final',lin(g(28),3.6),[[g(28),ctr(cardR)[0],ctr(cardR)[1]+40,2.35],[g(30),ctr(cardR)[0],ctr(cardR)[1]+40,2.25],[g(30)+0.45,607,1100,1.0],[g(32),607,1080,1.04]],
 {flash:[g(28),0.12,'255,255,255',0.5]});
// S9 the clash: first blow on the beat, then the last exchange, sped to land the collapse on the bar
const o9=g(33);shot(g(32),g(34),'final',lin(o9,clash1),[[g(32),607,1000,1.04],[g(34),607,980,1.1]],
 {shake:[[o9,0.22,14],[o9+(counter1-clash1),0.26,20]],flash:[o9+(counter1-clash1),0.14,'255,40,30',0.32]});
const sp=(collapse-clash3)/(g(38)-g(34));shot(g(34),g(38),'final',lin(g(34),clash3,sp),[[g(34),607,960,1.12],[g(38)-0.2,607,940,1.2],[g(38),607,940,1.2]],
 {shake:[[g(34),0.22,16],[g(34)+(counter3-clash3)/sp,0.3,24],[g(38),0.45,30]],flash:[g(34)+(counter3-clash3)/sp,0.14,'255,40,30',0.35]});
// S10 the collapse, then the receipt with the seal
const endShow=cue('final','ui',0),o10=g(38);const sp10=1.2,endOut=o10+(endShow-collapse)/sp10;
shot(o10,endOut,'final',lin(o10,collapse,sp10),[[o10,607,940,1.2],[endOut,607,1000,1.0]],{flash:[o10,0.4,'255,255,255',0.95]});
shot(endOut,g(40),'final',lin(o10,collapse,sp10),[[endOut,615,600,1.24],[g(40),615,560,1.16]],
 {shake:[[o10+(seal-collapse)/sp10,0.22,12]]});
// S11 the logo
shot(g(40),DUR,'logo',()=>0,[[g(40),0,0,1]]);
// ---- captions ------------------------------------------------------------------------------------------------------
const CAP=[
 {t0:0.32,t1:g(4)-0.12,font:'MUL',size:200,y:900,lines:[[['단',0],['30일.',1]]]},
 {t0:g(4)+0.05,t1:g(6)-0.02,font:'WSB',size:96,y:1530,lines:[[['편의점에서',0],['시작되는',0]]]},
 {t0:g(6)+0.04,t1:g(8)-0.1,font:'MUL',size:210,y:1500,lines:[[['마왕',1],['토벌.',1]]],slam:true},
 {t0:g(8)+0.1,t1:g(12)-0.12,font:'WSB',size:84,y:1590,lines:[[['당신이',0],['건넨',0]],[['물건',1],['하나가,',1]]]},
 {t0:o6+0.06,t1:g(24)-0.15,font:'WSB',size:86,y:250,lines:[[['그들의',0],['생사를',1],['가른다.',0]]]},
 {t0:g(28)+0.05,t1:g(32)-0.12,font:'WSB',size:84,y:1735,lines:[[['키워낸',0],['단골들과',1],['함께,',0]]]},
 {t0:g(34)+0.04,t1:g(38)-0.25,font:'MUL',size:104,y:1250,lines:[[['마왕을',1],['쓰러뜨려라.',0]]],slam:true}];
const CONFIG={DUR,FPS,shots:S,caps:CAP,takes:Object.fromEntries(Object.entries(T).map(([k,t])=>[k,{dir:'file://'+t.dir,fps:t.fps,n:t.frames.length,w:t.size[0],h:t.size[1]}])),
 store:'file://'+path.join(ROOT,'dist/ui/assets/presentation/morning/store-bg-phone.png'),logo:'file://'+path.join(ROOT,'dist/ui/assets/presentation/start/title-logo.png'),
 mul:'file://'+path.join(ROOT,'vendor/mulmaru/Mulmaru.woff2'),wsb:'file://'+path.join(ROOT,'node_modules/wanted-sans/fonts/ttf/WantedSans-Black.ttf'),
 wsm:'file://'+path.join(ROOT,'node_modules/wanted-sans/fonts/ttf/WantedSans-SemiBold.ttf'),logoT:g(40)};
const PAGE=`<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:#000;overflow:hidden}canvas{display:block}</style><canvas id=c width=1080 height=1920></canvas><script>
const C=__CONFIG__;const cv=document.getElementById('c'),x=cv.getContext('2d');const W=1080,H=1920;
const cache=new Map();function img(src){if(cache.has(src))return cache.get(src);const p=new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});cache.set(src,p);
 if(cache.size>12){cache.delete(cache.keys().next().value);}return p;}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),outBack=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
function camAt(k,t){if(t<=k[0][0])return k[0].slice(1);for(let i=1;i<k.length;i++)if(t<=k[i][0]){const a=k[i-1],b=k[i],u=ease((t-a[0])/Math.max(1e-6,b[0]-a[0]));return [a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u,a[3]+(b[3]-a[3])*u];}return k[k.length-1].slice(1);}
function rnd(n){const s=Math.sin(n*127.1)*43758.5453;return s-Math.floor(s);}
function shakeAt(sh,t){let dx=0,dy=0;for(const [t0,d,a] of sh||[]){if(t<t0||t>t0+d)continue;const u=1-(t-t0)/d,amp=a*u*u;const k=Math.floor(t*60);dx+=(rnd(k)-.5)*2*amp;dy+=(rnd(k+99)-.5)*2*amp;}return [dx,dy];}
let FONTS=false;async function fonts(){if(FONTS)return;for(const [n,u,w] of [['MUL',C.mul,'400'],['WSB',C.wsb,'900'],['WSM',C.wsm,'600']]){const f=new FontFace(n,'url('+u+')',{weight:w});await f.load();document.fonts.add(f);}FONTS=true;}
async function render(t){await fonts();x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.filter='none';x.fillStyle='#000';x.fillRect(0,0,W,H);
 const s=C.shots.find(s=>t>=s.t0&&t<s.t1)||C.shots[C.shots.length-1];
 if(s.take==='logo'){await logo(t);}else{
  let im,sw,sh;if(s.take==='store'){im=await img(C.store);sw=im.width;sh=im.height;}else{const tk=C.takes[s.take];const st=new Function('t','return ('+s.srcFn+')(t)')(t);
   const n=clamp(Math.round(st*tk.fps),0,tk.n-1);im=await img(tk.dir+'/'+String(n).padStart(5,'0')+'.jpg');sw=tk.w;sh=tk.h;}
  const [cx,cy,z]=camAt(s.cam,t);const [dx,dy]=shakeAt(s.shake,t);const over=(dx||dy)?1.035:1;
  let cw=sw/(z*over),ch=cw*H/W;if(ch>sh){ch=sh;cw=ch*W/H;}const sx=clamp(cx-cw/2,0,sw-cw),sy=clamp(cy-ch/2,0,sh-ch);
  const nx=C.shots[C.shots.indexOf(s)+1];let wx=0,wb=0;if(s.whip&&t<s.t0+0.13){const u=1-(t-s.t0)/0.13;wx=170*u*u;wb=18*u;}if(nx&&nx.whip&&t>s.t1-0.1){const u=(t-(s.t1-0.1))/0.1;wx=-170*u*u;wb=18*u;}
  x.imageSmoothingQuality='high';if(wb>0.5)x.filter='blur('+wb.toFixed(1)+'px)';x.drawImage(im,sx,sy,cw,ch,dx+wx,dy,W,H);x.filter='none';
  const map=(px,py)=>[(px-sx)/cw*W+dx,(py-sy)/ch*H+dy],mapR=r=>{const [a,b2]=map(r[0],r[1]),[c,d]=map(r[0]+r[2],r[1]+r[3]);return [a,b2,c-a,d-b2];};
  if(s.take==='store'){x.fillStyle='rgba(10,6,4,'+(0.30+0.25*clamp(t/1.2,0,1))+')';x.fillRect(0,0,W,H);}
  for(const sp of s.spots||[]){if(t<sp[0]||t>sp[1])continue;const a=sp[3]*Math.min(clamp((t-sp[0])/0.3,0,1),clamp((sp[1]-t)/0.2,0,1));x.save();x.fillStyle='rgba(0,0,0,'+a+')';x.beginPath();x.rect(0,0,W,H);for(const r of sp[2]){const [a1,b1,c1,d1]=mapR(r);x.roundRect(a1-12,b1-10,c1+24,d1+20,18);}x.fill('evenodd');x.restore();}
  if(s.underline&&t>=s.underline[0]){const [a1,b1,c1,d1]=mapR(s.underline[2]);const u=ease(clamp((t-s.underline[0])/s.underline[1],0,1));x.save();x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=24;x.fillStyle='#ffc94d';x.fillRect(a1,b1+d1+6,c1*u,9);x.restore();}
  let co=null;for(const c of s.callouts||[]){if(t>=c[0]&&t<c[1]){co=c;break;}}
  let mapP=map;if(co){const [t0c,t1c,r,tw,ty,rot]=co;const u=clamp((t-t0c)/0.24,0,1),ex=clamp((t1c-t)/0.14,0,1);const pop=(0.86+0.14*outBack(u))*(0.94+0.06*ex),A=Math.min(1,u*1.8)*ex;
   x.save();x.globalAlpha=A;x.filter='blur(12px) brightness(0.42)';x.drawImage(cv,0,0);x.restore();
   const ow=tw,oh=r[3]*tw/r[2],R=rot*Math.PI/180;x.save();x.globalAlpha=A;x.translate(W/2,ty);x.rotate(R);x.scale(pop,pop);
   x.shadowColor='rgba(0,0,0,.85)';x.shadowBlur=60;x.shadowOffsetY=24;x.fillStyle='#000';x.beginPath();x.roundRect(-ow/2,-oh/2,ow,oh,22);x.fill();x.shadowColor='transparent';
   x.save();x.clip();x.drawImage(im,r[0],r[1],r[2],r[3],-ow/2,-oh/2,ow,oh);x.restore();
   x.lineWidth=5;x.strokeStyle='rgba(255,214,120,0.85)';x.beginPath();x.roundRect(-ow/2,-oh/2,ow,oh,22);x.stroke();x.restore();
   const k=tw/r[2]*pop;mapP=(px,py)=>{const lx=(px-(r[0]+r[2]/2))*k,ly=(py-(r[1]+r[3]/2))*k;return [W/2+lx*Math.cos(R)-ly*Math.sin(R),ty+lx*Math.sin(R)+ly*Math.cos(R)];};}
  const mapRP=r=>{const [a,b2]=mapP(r[0],r[1]),[c,d]=mapP(r[0]+r[2],r[1]+r[3]);return [a,b2,c-a,d-b2];};
  if(s.pulse&&t>=s.pulse[0]&&t<s.pulse[1]+0.25){const [a1,b1,c1,d1]=mapRP(s.pulse[2]);const k=((t-s.pulse[0])%0.55)/0.55;x.save();x.strokeStyle='rgba(255,214,110,'+(0.95*(1-k))+')';x.lineWidth=8;x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=20;
   x.beginPath();x.roundRect(a1-6-14*k,b1-6-14*k,c1+12+28*k,d1+12+28*k,22);x.stroke();x.restore();}
  for(const tp of s.taps||[]){const u=(t-tp[0])/0.42;if(u<-0.05||u>1)continue;const [px,py]=mapP(tp[1],tp[2]);x.save();
   if(u<0.25){x.fillStyle='rgba(255,255,255,'+(0.75*(1-u/0.25))+')';x.beginPath();x.arc(px,py,38,0,7);x.fill();}
   if(u>=0){x.strokeStyle='rgba(255,255,255,'+(0.9*(1-u))+')';x.lineWidth=7;x.beginPath();x.arc(px,py,38+110*ease(clamp(u,0,1)),0,7);x.stroke();}x.restore();}
  if(s.dark&&t<s.dark[1]){const a=t<s.dark[1]-s.dark[2]?1:(s.dark[1]-t)/s.dark[2];x.fillStyle='rgba(6,10,26,'+clamp(a,0,1)+')';x.fillRect(0,0,W,H);}
  if(s.flash&&t>=s.flash[0]&&t<s.flash[0]+s.flash[1]){const u=1-(t-s.flash[0])/s.flash[1];x.fillStyle='rgba('+s.flash[2]+','+(s.flash[3]*u*u)+')';x.fillRect(0,0,W,H);}
 }
 vignette();captions(t);
 if(t<0.45){x.fillStyle='rgba(0,0,0,'+(1-t/0.45)+')';x.fillRect(0,0,W,H);}if(t>C.DUR-0.6){x.fillStyle='rgba(0,0,0,'+((t-(C.DUR-0.6))/0.6)+')';x.fillRect(0,0,W,H);}
 return true;}
function vignette(){const g=x.createRadialGradient(W/2,H*0.48,H*0.28,W/2,H*0.5,H*0.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.5)');x.fillStyle=g;x.fillRect(0,0,W,H);}
function captions(t){for(const c of C.caps){if(t<c.t0||t>c.t1)continue;const fam=c.font==='MUL'?'MUL':'WSB';x.font=(fam==='MUL'?'400 ':'900 ')+c.size+'px '+fam;x.textBaseline='middle';
  const lh=c.size*(fam==='MUL'?1.12:1.22),total=lh*c.lines.length;let wi=0;const out=(c.t1-t)<0.18?(c.t1-t)/0.18:1;
  // a soft band behind body captions so they read on any footage
  if(fam==='WSB'){const fa=clamp((t-c.t0)/0.2,0,1)*out,y0=c.y-total/2-34,hh=total+68;x.save();x.globalAlpha=fa;x.filter='blur(16px) brightness(0.38)';x.drawImage(cv,0,y0,W,hh,0,y0,W,hh);x.restore();
   x.save();x.globalAlpha=0.62*clamp((t-c.t0)/0.2,0,1)*out;
   const gb=x.createLinearGradient(0,0,W,0);gb.addColorStop(0,'rgba(0,0,0,0)');gb.addColorStop(0.18,'rgba(8,5,3,0.9)');gb.addColorStop(0.82,'rgba(8,5,3,0.9)');gb.addColorStop(1,'rgba(0,0,0,0)');
   x.fillStyle=gb;x.fillRect(0,c.y-total/2-26,W,total+52);x.restore();}
  if(fam==='WSB'){/* frosted: the footage behind the caption is blurred and darkened so UI text never shows through */}
  c.lines.forEach((line,li)=>{const sp=x.measureText(' ').width*(fam==='MUL'?0.9:1);const ws=line.map(w=>x.measureText(w[0]).width);const tw=ws.reduce((a,v)=>a+v,0)+sp*(line.length-1);
   let px=W/2-tw/2;const py=c.y-total/2+lh*(li+0.5);
   line.forEach((w,i)=>{const t0=c.t0+wi*(c.slam?0.09:0.07);wi++;const u=clamp((t-t0)/(c.slam?0.2:0.16),0,1);if(u<=0){px+=ws[i]+sp;return;}
    const sc=c.slam?(1+0.55*(1-outBack(u))):(1+0.22*(1-outBack(u)));const a=Math.min(1,u*1.6)*out;const cx=px+ws[i]/2;x.save();x.translate(cx,py-(1-out)*14);x.scale(sc,sc);x.globalAlpha=a;
    x.lineJoin='round';x.lineWidth=fam==='MUL'?c.size*0.11:c.size*0.13;x.strokeStyle='rgba(20,12,6,0.95)';x.shadowColor='rgba(0,0,0,0.85)';x.shadowBlur=26;x.shadowOffsetY=8;
    x.textAlign='center';x.strokeText(w[0],0,0);x.shadowColor='transparent';x.fillStyle=w[1]?(fam==='MUL'?'#ffcf4a':'#ffd36b'):'#fff6e6';x.fillText(w[0],0,0);x.restore();px+=ws[i]+sp;});});}}
async function logo(t){const st=await img(C.store);x.save();x.filter='blur(18px) brightness(0.42) saturate(1.1)';x.drawImage(st,-60,-100,W+120,H+200);x.restore();
 const lg=await img(C.logo);const u=clamp((t-C.logoT-0.04)/0.32,0,1);const sc=1+0.18*(1-outBack(u));const lw=940,lh=lw*lg.height/lg.width;
 const off=document.createElement('canvas');off.width=lw;off.height=lh;const o=off.getContext('2d');o.drawImage(lg,0,0,lw,lh);
 const sw=(t-C.logoT-0.55)/0.7;if(sw>0&&sw<1){o.globalCompositeOperation='source-atop';const gx=-200+(lw+400)*sw;const gr=o.createLinearGradient(gx-120,0,gx+120,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(0.5,'rgba(255,250,225,0.75)');gr.addColorStop(1,'rgba(255,255,255,0)');o.fillStyle=gr;o.fillRect(0,0,lw,lh);}
 x.save();x.globalAlpha=Math.min(1,u*1.4);x.translate(W/2,860);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=40;x.drawImage(off,-lw/2,-lh/2);x.restore();
 const v=clamp((t-C.logoT-0.55)/0.4,0,1);x.save();x.globalAlpha=v;x.font='600 50px WSM';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#e9d9b6';x.letterSpacing='14px';x.fillText('턴제 경영 로그라이트',W/2+7,1080+(1-v)*16);x.restore();}
window.render=render;</script>`;
(async()=>{
 // functions cannot ride JSON: keep each shot's source map as the expression text
 for(const s of S){const probe0=s.src(s.t0),probe1=s.src(s.t1);const speed=(probe1-probe0)/Math.max(1e-6,s.t1-s.t0);s.srcFn=`(t=>${probe0.toFixed(5)}+(t-${s.t0.toFixed(5)})*${speed.toFixed(6)})`;delete s.src;}
 const html=path.join(dir,'compose.html');fs.writeFileSync(html,PAGE.replace('__CONFIG__',JSON.stringify(CONFIG)));
 const pw=require('playwright');const browser=await pw.chromium.launch({executablePath:EXEC,args:['--no-sandbox','--allow-file-access-from-files']});
 const page=await (await browser.newContext({viewport:{width:1080,height:1920},deviceScaleFactor:1})).newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,200));});
 await page.goto('file://'+html);const out=path.join(dir,'comp');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);const t0=Date.now();
 for(let n=0;n<DUR*FPS;n++){await page.evaluate(t=>window.render(t),n/FPS);fs.writeFileSync(path.join(out,String(n).padStart(5,'0')+'.jpg'),await page.screenshot({type:'jpeg',quality:94}));}
 await browser.close();console.log('rendered',DUR*FPS,'frames in',((Date.now()-t0)/1000).toFixed(0),'s');
 // audio: the title song from its first bar at 6.06 s, the game's own recorded cues on the hits
 const sfx=n=>path.join(ROOT,'dist/ui/assets/audio',n+'.mp3');
 const hits=[['door',0.05,0.55],['tick',0.32,0.8],['stamp',g(6),0.9],['gate',g(6)+0.02,0.6],['key',o4,0.8],['cart',o4+0.15,0.5],['key',o5,0.8],['cart',o5+0.3,0.7],
  ['stamp',o6,1.0],['soft',g(24)+1.0,0.6],['stamp',o9,0.8],['stamp',g(34),0.85],['stamp',g(38),1.0],['gate',g(38)+0.02,0.7],['stamp',o10+(seal-collapse)/sp10,0.9],['unlock',g(40)+0.05,0.8]];
 const ins=['-framerate',String(FPS),'-i',path.join(out,'%05d.jpg'),'-ss',String(SONG_IN),'-t',String(DUR),'-i',path.join(ROOT,'dist/ui/assets/bgm/title.mp3')];hits.forEach(h=>ins.push('-i',sfx(h[0])));
 let fc=`[1:a]volume=0.95,afade=t=out:st=${DUR-1.6}:d=1.6[bg];`;hits.forEach((h,i)=>{const ms=Math.round(h[1]*1000);fc+=`[${i+2}:a]adelay=${ms}|${ms},volume=${h[2]}[s${i}];`;});
 fc+=`[bg]${hits.map((_,i)=>`[s${i}]`).join('')}amix=inputs=${hits.length+1}:duration=first:normalize=0,alimiter=limit=0.95[a]`;
 const mp4=path.join(dir,'trailer-v2-30s-1080x1920.mp4');
 execFileSync(FF,['-hide_banner','-loglevel','error','-y',...ins,'-filter_complex',fc,'-map','0:v','-map','[a]','-t',String(DUR),'-c:v','libx264','-preset','slow','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart',mp4]);
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-i',mp4,'-vf','scale=540:960','-c:v','libx264','-preset','veryfast','-crf','23','-c:a','copy',path.join(dir,'trailer-v2-540.mp4')]);
 fs.writeFileSync(path.join(dir,'edl.json'),JSON.stringify({beat:b,bar:B,songIn:SONG_IN,shots:S.map(s=>({t0:+s.t0.toFixed(3),t1:+s.t1.toFixed(3),take:s.take,src:s.srcFn})),hits},null,1));
 console.log('done',mp4);
})().catch(e=>{console.error(e);process.exit(1);});
