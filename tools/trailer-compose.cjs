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
const SONG_IN=6.06,DUR=30,FPS=30;
// ---- source time maps (v3: User + GPT review 2026-10-01 — no edit flashes / shakes / whips; one tap per choice; fixed framings) ----
const tapItem=T.sale.marks.tapItem,tapPrice=T.sale.marks.tapPrice,great=cue('night','great');
const clash1=cue('final','clash',0),counter1=cue('final','counter',0),clash3=cue('final','clash',2),counter3=cue('final','counter',2),collapse=cue('final','collapse'),seal=cue('final','sealwin');
const itemR=rect('sale','rScroll','item'),priceR=rect('sale','rPrice','price'),destR=rect('sale','r0','dest'),portraitR=rect('sale','r0','portrait');
const heroR=rect('night','r1','hero'),standR=rect('night','r1','stand'),cardR=rect('final','r2','cCard',0);
const g=k=>+(k*b).toFixed(4);                          // beat k on the output grid
const S=[];const shot=(t0,t1,take,src,cam,extra={})=>S.push({t0,t1,take,src,cam,...extra});
const lin=(o,s0,speed=1)=>t=>s0+(t-o)*speed;            // output t → source t
const hold=s0=>()=>s0;
// S0 the empty shop; footsteps come closer (audio), 단 30일.
shot(0,g(4),'store',hold(0),[[0,470,860,1.0],[g(4),470,820,1.10]]);
// S1 the customer arrives on the last step: face and destination in one framing
shot(g(4),g(6),'sale',lin(g(4),0.2),[[g(4),607,1030,1.06]],{spots:[[g(4)+0.15,g(6),[portraitR,destR],0.5]]});
// S2 the Boss (camera punch only)
shot(g(6),g(8),'final',lin(g(6),0.1),[[g(6),560,700,1.22],[g(6)+0.35,560,700,1.12],[g(8),560,690,1.10]]);
// S3 the product, large: tap once
const oItem=g(9),oPrice=g(13);
// (the tray opens over the row on the tap, so the card holds the row as it was tapped while the mark plays)
const itemOff=oItem+0.4,itemCard={taps:[[oItem,...ctr(itemR),'card']],callouts:[[g(8),itemOff,[81,itemR[1],720,itemR[3]],1064,860,0,true]]};
shot(g(8),oItem,'sale',lin(oItem,tapItem),[[g(8),607,1080,1.0]],itemCard);
shot(oItem,itemOff,'sale',hold(tapItem-1/30),[[oItem,607,1080,1.0]],itemCard);
// S4 name + the three prices in one card: tap once (the tray closes on the tap, so the card holds it while the mark plays),
// then the real sale from the tap on, full screen and at its own speed
const handOff=oPrice+0.26,trayCard={taps:[[oPrice,...ctr(priceR),'card']],pulse:[g(11),oPrice,priceR],callouts:[[itemOff,handOff,[40,1372,1135,532],1076,900,0,true]]};
shot(itemOff,oPrice,'sale',lin(oPrice,tapPrice),[[itemOff,607,1080,1.0]],trayCard);
shot(oPrice,handOff,'sale',hold(tapPrice-1/30),[[oPrice,607,1080,1.0]],trayCard);
shot(handOff,g(16),'sale',lin(handOff,tapPrice+4/30),[[handOff,607,1080,1.0]]);   // from the frame the tray has closed: the tray is not shown twice
// S5 night: the same customer; the stamp lands on the beat; the frame then holds
const oGreat=11.07;                                   // on the song's hit (measured onset), not the bare grid
shot(g(16),g(24),'night',lin(oGreat,great),[[g(16),607,1000,1.06]],
 {dark:[g(16),oGreat-great+0.55,0.18],underline:[g(19)+0.2,0.45,heroR],spots:[[g(19),g(24),[standR,heroR],0.6]]});
// S6 thirty days later: 오름찬, grown, then the ready party (supplies already in)
const ready=6.6,cardC=ctr(cardR);
shot(g(24),g(26),'final',hold(ready),[[g(24),cardC[0],cardC[1]+40,2.3],[g(26),cardC[0],cardC[1]+40,2.24]]);
shot(g(26),g(28),'final',hold(ready),[[g(26),607,1040,1.04]]);                 // hard cut to the ready party
// S7 the clash, one still framing: first attack → counter, the last attack → counter, the boss's bar running out (2.35× — nothing
// moves but the bar), the collapse at its own speed. The second exchange and the supply icons are cut, with their sounds.
const A0=g(28),A1=A0+(8.26-ready),B1=A1+(10.67-9.32),oCol=23.38,drain=(collapse-10.67)/(oCol-B1);
shot(A0,A1,'final',lin(A0,ready),[[A0,607,1040,1.04]]);
shot(A1,B1,'final',lin(A1,9.32),[[A1,607,1040,1.04]]);
shot(B1,oCol,'final',lin(B1,10.67,drain),[[B1,607,1040,1.04]]);
// S8 the collapse, the receipt and its seal (the seal lands on the beat), then a cut in on 마왕이 쓰러졌다. held 2 s
const endShow=cue('final','ui',0),oEnd=oCol+(endShow-collapse),big=oCol+(endShow-collapse)+0.62;  // the collapse on the song's hit at 23.38 s, the seal lands, then 1.5 s of the line
shot(oCol,oEnd,'final',lin(oCol,collapse),[[oCol,607,1040,1.04]]);
shot(oEnd,big,'final',lin(oEnd,endShow),[[oEnd,631,600,1.18]]);
shot(big,g(40),'final',lin(oEnd,endShow),[[big,496,684,1.6]]);   // header, line and reason whole; the seal and the right column fall outside
// S9 the logo, still
shot(g(40),DUR,'logo',hold(0),[[g(40),0,0,1]]);
// ---- captions: one at a time, placed off the key UI ----------------------------------------------------------------
const CAP=[
 {t0:0.32,t1:g(4)-0.12,font:'MUL',size:200,y:900,lines:[[['단',0],['30일.',1]]]},
 {t0:g(4)+0.05,t1:g(6)-0.02,font:'WSB',size:96,y:1560,lines:[[['편의점에서',0],['시작되는',0]]]},
 {t0:g(6)+0.04,t1:g(8)-0.1,font:'MUL',size:210,y:1500,lines:[[['마왕',1],['토벌.',1]]],slam:true},
 {t0:g(8)+0.08,t1:oPrice-0.12,font:'WSB',size:84,y:1430,lines:[[['당신이',0],['건넨',0]],[['물건',1],['하나가',1]]]},
 {t0:oGreat+0.05,t1:g(19)-0.1,font:'WSB',size:86,y:250,lines:[[['그들의',0],['생사를',1],['가른다.',0]]]},
 {t0:g(24)+0.05,t1:g(26)-0.06,font:'WSB',size:84,y:1735,lines:[[['키워낸',0],['단골들과',1],['함께',0]]]},
 {t0:A1+0.04,t1:oCol-0.3,font:'MUL',size:104,y:1250,lines:[[['마왕을',1],['쓰러뜨려라.',0]]],slam:true}];
// the game's own cues on the events the edit kept (rendered from dist/ui/audio.js, see audioTrack below)
const CUES=[['button',oItem+(cue('sale','button')-tapItem)],[T.sale.marks.priceMode,handOff+(cue('sale',T.sale.marks.priceMode)-(tapPrice+4/30))],['great',oGreat],
 ['clash',A0+(clash1-ready)],['counter',A0+(counter1-ready)],['clash',A1+(clash3-9.32)],['counter',A1+(counter3-9.32)],['collapse',oCol],
 ...T.final.cues.filter(c=>c[0]==='ui'||c[0]==='sealwin').map(c=>[c[0],oEnd+(c[1]-endShow)])];
const STEPS=[[g(1),0.35],[g(2),0.55],[g(3),0.75],[g(4),0.95]];   // footsteps (not a game cue): closer each beat, the last on the cut
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
 // still: a hard cut in, no pop / sweep; the genre line in the game's pixel body face, set under the logo, no motion of its own
 const lg=await img(C.logo);const lw=940,lh=lw*lg.height/lg.width;x.save();x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=40;x.drawImage(lg,W/2-lw/2,860-lh/2,lw,lh);x.restore();
 x.save();x.font='400 64px MUL';x.textAlign='center';x.textBaseline='middle';x.lineJoin='round';x.shadowColor='rgba(0,0,0,.85)';x.shadowBlur=18;x.shadowOffsetY=4;
 x.lineWidth=12;x.strokeStyle='rgba(20,12,6,0.95)';x.strokeText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.shadowColor='transparent';
 x.lineWidth=2.2;x.strokeStyle='#f1e3c2';x.strokeText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.fillStyle='#f1e3c2';x.fillText('턴제 경영 로그라이트',W/2,860+lh/2+56);x.restore();}
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
  const res=await page.evaluate(async({CUES,STEPS,DUR})=>{const off=window.__off;const S=window.Sound;
   S.sync(false,'title',{bgm:1,sfx:1});
   const t0=Date.now();while(!window.__env&&Date.now()-t0<15000)await new Promise(r=>setTimeout(r,100));await new Promise(r=>setTimeout(r,1500));
   const e=window.__env.gain;e.setValueAtTime(0.38,0);e.setValueAtTime(0.38,2.5);e.linearRampToValueAtTime(1,3.0);e.setValueAtTime(1,DUR-1.6);e.linearRampToValueAtTime(0.0001,DUR);
   // footsteps: filtered noise scuff + low body thump, from a fixed sequence (no Math.random), louder each step
   const nb=off.createBuffer(1,Math.round(off.sampleRate*0.2),off.sampleRate),d=nb.getChannelData(0);let q=12345;for(let i=0;i<d.length;i++){q=(q*1103515245+12345)&0x7fffffff;d[i]=q/0x3fffffff-1;}
   for(const [t,v] of STEPS)for(const [dt,k] of [[0,1],[0.055,0.45]]){const at=t-0.012+dt;
    const n=off.createBufferSource();n.buffer=nb;const f=off.createBiquadFilter();f.type='lowpass';f.frequency.value=650;f.Q.value=0.7;const g=off.createGain();
    g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(0.33*v*k,at+0.004);g.gain.exponentialRampToValueAtTime(0.0001,at+0.13);n.connect(f);f.connect(g);g.connect(off.destination);n.start(at);n.stop(at+0.2);
    const o=off.createOscillator();o.type='sine';o.frequency.setValueAtTime(95,at);o.frequency.exponentialRampToValueAtTime(48,at+0.1);const og=off.createGain();
    og.gain.setValueAtTime(0,at);og.gain.linearRampToValueAtTime(0.42*v*k,at+0.005);og.gain.exponentialRampToValueAtTime(0.0001,at+0.12);o.connect(og);og.connect(off.destination);o.start(at);o.stop(at+0.15);}
   // the game's cues at their kept times: the render suspends 0.1 s ahead and the engine schedules the cue with its own delay
   const by=new Map();for(const [k,t] of CUES){const s=Math.max(0,Math.round((t-0.1)*off.sampleRate/128)*128/off.sampleRate);if(!by.has(s))by.set(s,[]);by.get(s).push([k,t-s]);}
   const fired=[];for(const [s,list] of by)off.suspend(s).then(()=>{for(const [k,dl] of list){S.play(k,dl);fired.push([k,+(off.currentTime+dl).toFixed(3)]);}window.__resume();});
   const buf=await off.startRendering();
   const L=buf.getChannelData(0),Rr=buf.getChannelData(1),n=L.length,ab=new ArrayBuffer(44+n*4),v=new DataView(ab);const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
   ws(0,'RIFF');v.setUint32(4,36+n*4,true);ws(8,'WAVE');ws(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,off.sampleRate,true);v.setUint32(28,off.sampleRate*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,n*4,true);
   let peak=0;for(let i=0;i<n;i++){peak=Math.max(peak,Math.abs(L[i]),Math.abs(Rr[i]));v.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,Rr[i]))*32767,true);}
   const u8=new Uint8Array(ab);let bin='';for(let i=0;i<u8.length;i+=0x8000)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return {b64:btoa(bin),fired,peak};},{CUES,STEPS,DUR});
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
 for(let n=0;n<(process.env.SKIP_VIDEO?0:DUR*FPS);n++){await page.evaluate(t=>window.render(t),n/FPS);fs.writeFileSync(path.join(out,String(n).padStart(5,'0')+'.jpg'),await page.screenshot({type:'jpeg',quality:94}));}
 await browser.close();console.log('rendered',DUR*FPS,'frames in',((Date.now()-t0)/1000).toFixed(0),'s');
 // audio: rendered by the game's own engine (dist/ui/audio.js) in an OfflineAudioContext. The title song plays through the engine's
 // music bus from its first bar at SONG_IN, so every cue's level against the music and every cue's own duck (half, great, sealwin …)
 // is the game's; the cues fire at their kept times (CUES). Added for the edit only: the footsteps before the first customer
 // (no game cue exists for them), the music held low under them, and the closing fade.
 const wav=path.join(dir,'mix.wav');await renderAudio(wav);
 const mp4=path.join(dir,'trailer-v3-30s-1080x1920.mp4');
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-framerate',String(FPS),'-i',path.join(out,'%05d.jpg'),'-i',wav,
  '-af',`volume=${AUDIO_GAIN}dB,alimiter=limit=0.89:level=false`,'-map','0:v','-map','1:a','-t',String(DUR),'-r',String(FPS),'-c:v','libx264','-profile:v','high','-preset','slow','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',mp4]);
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-i',mp4,'-vf','scale=540:960','-c:v','libx264','-preset','veryfast','-crf','23','-c:a','copy',path.join(dir,'trailer-v3-540.mp4')]);
 fs.writeFileSync(path.join(dir,'edl.json'),JSON.stringify({beat:b,bar:B,songIn:SONG_IN,shots:S.map(s=>({t0:+s.t0.toFixed(3),t1:+s.t1.toFixed(3),take:s.take,src:s.srcFn})),cues:CUES,steps:STEPS},null,1));
 console.log('done',mp4);
})().catch(e=>{console.error(e);process.exit(1);});
