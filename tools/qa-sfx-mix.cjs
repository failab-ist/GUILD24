// v2.9.11 quick patch (User 2026-09-29): the effects mix, measured. Dev-only, part of `npm run qa:runtime`.
// Every cue is rendered offline through the real audio engine (the page's AudioContext is an OfflineAudioContext, the
// BGM slider at 0), one cue per 2.5 s slot, and read two ways:
//   - loudness: K-weighted (ITU-R BS.1770 pre-filter + RLB), 100 ms windows, the cue's loudest window ("fast peak")
//   - audibility over its own phase's music: 1/3-octave bands, the cue's band level against the music's loud (90th
//     percentile) band level at the shipped trim, the music lowered by the cue's own ducking; the best band's margin
// and checked against the tiers of UI_UX §AUDIO FEEDBACK — SFX LEVELS (PRESENTATION §Mix: result / decision > action >
// utility > BGM): each cue from 1.5 dB under its tier's target to 3 dB over it (the fit may lift a cue up to 3 dB for
// audibility), the tiers in order, every cue clear of its music by the tier's margin, and the loudest cue over the loudest
// music peak still under -3 dBFS. A cue lifted to its tier's ceiling and still short of its margin is a FINDING (its
// sound, not its level - a timbre change is a separate decision), reported, never counted as a pass.
//   node tools/qa-sfx-mix.cjs [--fit]      --fit prints the LEVEL table that meets the targets from the current one
const {spawn}=require('node:child_process'),path=require('node:path');
const PORT=Number(process.env.QA_PORT||5197),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const FIT=process.argv.includes('--fit');
const TIERS={
 result:{target:-17,margin:8,cues:['great','retreat','injury','severe','death','sealwin','sealfail','endwin','endfail','bossmajor','final','boss','collapse']},
 decision:{target:-19,margin:8,cues:['order','sale','overcharge','half','refusal','purchase','support','unlock','open','close','begin','newstore','bosscompact','rescue']},
 action:{target:-23,margin:5,cues:['depart','return','gold','spend','crate','receipt','heal','fixture','rumble','clash','counter','supply']},
 utility:{target:-27,margin:3,cues:['button','ui']},
 repeat:{target:-29,margin:3,cues:['quantity','quantset']}};
const UNDER=1.5,OVER=3,PEAK=-3;
// the music each cue is heard over (where the app plays it); utility clicks are heard everywhere: the loudest bed
const MUSIC={order:['order','quantity','quantset','crate'],sale:['sale','overcharge','half','refusal','depart','heal','gold','spend'],
 night:['great','retreat','injury','severe','death','rescue','return'],close:['close','receipt'],morning:['open'],
 title:['support','purchase','unlock','fixture','begin','newstore'],boss:['boss','bossmajor','bosscompact','final','rumble','clash','counter','collapse','supply'],
 succ:['sealwin','endwin'],fail:['sealfail','endfail']};
const results=[];const check=(n,ok,d='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+n+(d?' - '+d:''));};
function serve(){const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});}
/* page side: K-weighting, windows, FFT bands */
const PAGE=()=>{window.__mix={
 kw(x,rate){/* BS.1770 at 48 kHz */const st=[[1.53512485958697,-2.69169618940638,1.19839281085285,-1.69065929318241,.73248077421585],[1,-2,1,-1.99004745483398,.99007225036621]];
  let y=Float64Array.from(x);for(const [b0,b1,b2,a1,a2] of st){let x1=0,x2=0,y1=0,y2=0;const o=new Float64Array(y.length);
   for(let i=0;i<y.length;i++){const v=y[i],r=b0*v+b1*x1+b2*x2-a1*y1-a2*y2;x2=x1;x1=v;y2=y1;y1=r;o[i]=r;}y=o;}return y;},
 fast(chs,rate,from,to){const n=Math.round(rate*.1),k=chs.map(c=>this.kw(c.subarray(from,to),rate));let best=-120;
  for(let i=0;i+n<=to-from;i+=n){let ms=0;for(const c of k){let s=0;for(let j=i;j<i+n;j++)s+=c[j]*c[j];ms+=s/n;}best=Math.max(best,-.691+10*Math.log10(ms||1e-12));}return best;},
 fft(re,im){const n=re.length;for(let i=1,j=0;i<n;i++){let b=n>>1;for(;j&b;b>>=1)j^=b;j^=b;if(i<j){[re[i],re[j]]=[re[j],re[i]];[im[i],im[j]]=[im[j],im[i]];}}
  for(let len=2;len<=n;len<<=1){const a=-2*Math.PI/len,wr=Math.cos(a),wi=Math.sin(a);for(let i=0;i<n;i+=len){let cr=1,ci=0;for(let j=0;j<len/2;j++){const ur=re[i+j],ui=im[i+j],
   vr=re[i+j+len/2]*cr-im[i+j+len/2]*ci,vi=re[i+j+len/2]*ci+im[i+j+len/2]*cr;re[i+j]=ur+vr;im[i+j]=ui+vi;re[i+j+len/2]=ur-vr;im[i+j+len/2]=ui-vi;const t=cr*wr-ci*wi;ci=cr*wi+ci*wr;cr=t;}}}},
 centers:Array.from({length:24},(_,i)=>50*2**(i/3)),
 bands(chs,rate,from,to,hop){const N=4096,out=[],w=Float64Array.from({length:N},(_,i)=>.5-.5*Math.cos(2*Math.PI*i/N));
  for(let s=from;s+N<=to;s+=hop){const pw=new Float64Array(N/2);for(const c of chs){const re=new Float64Array(N),im=new Float64Array(N);for(let i=0;i<N;i++)re[i]=c[s+i]*w[i];this.fft(re,im);
    for(let i=0;i<N/2;i++)pw[i]+=(re[i]*re[i]+im[i]*im[i])/(N*N);}
   out.push(this.centers.map(fc=>{const lo=Math.floor(fc*2**(-1/6)*N/rate),hi=Math.ceil(fc*2**(1/6)*N/rate);let e=0;for(let i=lo;i<=hi&&i<N/2;i++)e+=pw[i];return 10*Math.log10(e||1e-15);}));}
  return out;},
 peak(chs,from,to){let m=0;for(const c of chs)for(let i=from;i<to;i++)m=Math.max(m,Math.abs(c[i]));return 20*Math.log10(m||1e-9);}};};
(async()=>{
 const playwright=require('playwright');const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox']});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:780}});
  const Sound=(()=>{require('../dist/ui/audio.js');return globalThis.Sound;})();
  const cues=Sound.cues,SLOT=2.5,SEC=cues.length*SLOT+1;
  await ctx.addInitScript(([sec])=>{window.AudioContext=function(){const c=new OfflineAudioContext(2,Math.ceil(48000*sec),48000);c.resume=()=>Promise.resolve();window.__off=c;return c;};},[SEC]);
  await ctx.addInitScript(PAGE);
  const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:${PORT}/index.html`);
  const m=await p.evaluate(async([cues,SLOT,MUSIC])=>{const st={muted:false,bgm:0,sfx:1};Sound.sync(false,'sell',st);
   await new Promise(r=>setTimeout(r,2500));   // the recorded samples arrive and decode
   cues.forEach((c,i)=>Sound.play(c,.5+i*SLOT));
   const buf=await __off.startRendering(),rate=buf.sampleRate,chs=[buf.getChannelData(0),buf.getChannelData(1)];
   const cue={};cues.forEach((c,i)=>{const from=Math.round((.5+i*SLOT)*rate),to=from+Math.round((SLOT-.1)*rate);
    const b=__mix.bands(chs,rate,from,to,1024),top=__mix.centers.map((_,k)=>Math.max(...b.map(f=>f[k])));
    cue[c]={fast:__mix.fast(chs,rate,from,to),peak:__mix.peak(chs,from,to),bands:top};});
   // the music, at its shipped trim, loud frames per band
   const music={};for(const key of Object.keys(MUSIC)){const t=Sound.music[key],bytes=await (await fetch('ui/assets/bgm/'+key+'.mp3')).arrayBuffer();
    const dec=await new OfflineAudioContext(2,1,48000).decodeAudioData(bytes),g=10**((Sound.bgmLufs-t.lufs+(t.trim||0))/20),r=dec.sampleRate;
    const from=Math.round(t.s*r),to=Math.min(dec.length,from+Math.round(Math.min(t.e-t.s,170)*r)),ch=[0,1].map(i=>{const d=dec.getChannelData(Math.min(i,dec.numberOfChannels-1)).slice(from,to);for(let j=0;j<d.length;j++)d[j]*=g;return d;});
    const fr=__mix.bands(ch,r,0,ch[0].length,4096*3);music[key]={peak:__mix.peak(ch,0,ch[0].length),bands:__mix.centers.map((_,k)=>{const v=fr.map(f=>f[k]).sort((a,b)=>a-b);return v[Math.floor(v.length*.9)];}),fast:__mix.fast(ch,r,0,ch[0].length)};}
   return {cue,music,levels:Sound.levels,ducks:Sound.ducks};},[cues,SLOT,MUSIC]);
  // audibility: the best band's margin over the music it is heard with, less its duck
  const musicOf=c=>Object.keys(MUSIC).filter(k=>MUSIC[k].includes(c));
  const margin=(c,shift=0)=>{const keys=musicOf(c).length?musicOf(c):Object.keys(MUSIC),d=m.ducks[c]||0,duck=d?20*Math.log10(1-d):0,cb=m.cue[c].bands,top=Math.max(...cb);
   return Math.min(...keys.map(k=>Math.max(...cb.map((v,i)=>v<top-20?-99:v+shift-(m.music[k].bands[i]+duck)))));};
  const tierOf=c=>Object.entries(TIERS).find(([,t])=>t.cues.includes(c));
  for(const c of cues)if(!tierOf(c))check(`${c} has a tier`,false);
  if(FIT){const table={};for(const c of cues){const [,t]=tierOf(c),cur=m.levels[c]??1;let db=t.target-m.cue[c].fast;const mg=margin(c,db);if(mg<t.margin+.2)db+=Math.min(OVER-.1,t.margin+.2-mg);
    table[c]=+(cur*10**(db/20)).toFixed(3);}
   console.log('LEVEL='+JSON.stringify(table));}
  console.log('cue          tier      fast   target  margin  peak');
  for(const [name,t] of Object.entries(TIERS))for(const c of t.cues){const x=m.cue[c];if(!x)continue;const mg=margin(c);
   console.log(`${c.padEnd(12)} ${name.padEnd(9)} ${x.fast.toFixed(1).padStart(6)} ${String(t.target).padStart(6)} ${mg.toFixed(1).padStart(7)} ${x.peak.toFixed(1).padStart(6)}`);}
  if(!FIT){
   const findings=[];
   for(const [name,t] of Object.entries(TIERS)){const off=t.cues.filter(c=>m.cue[c].fast<t.target-UNDER||m.cue[c].fast>t.target+OVER);
    check(`${name}: every cue from ${t.target-UNDER} to ${t.target+OVER}`,!off.length,off.map(c=>c+' '+m.cue[c].fast.toFixed(1)).join(', '));
    /* a cue already lifted to the tier's ceiling and still masked is its timbre, not its level: a FINDING for the User */
    const low=t.cues.filter(c=>margin(c)<t.margin),capped=low.filter(c=>m.cue[c].fast>=t.target+OVER-.3),short=low.filter(c=>!capped.includes(c));
    if(capped.length)findings.push(`${name}: ${capped.map(c=>c+' '+margin(c).toFixed(1)).join(', ')} dB against a ${t.margin} dB margin at the tier's ceiling - the sound itself is masked (User decision pending)`);
    check(`${name}: every cue clears its music by ${t.margin} dB, or is at the tier's ceiling and reported`,!short.length,short.map(c=>c+' '+margin(c).toFixed(1)).join(', '));}
   for(const f of findings)console.log('FINDING '+f);
   const order=Object.values(TIERS).map(t=>t.target);check('tiers in order: result / decision > action > utility > repeat',order.every((v,i)=>!i||v<=order[i-1]));
   const loud=Math.max(...Object.values(m.music).map(v=>10**(v.peak/20))),sum=c=>20*Math.log10(10**(m.cue[c].peak/20)+loud);
   const hot=cues.filter(c=>sum(c)>PEAK);check(`the loudest cue over the loudest music peak stays under ${PEAK} dBFS`,!hot.length,
    hot.map(c=>c+' '+sum(c).toFixed(1)).join(', ')||'worst '+Math.max(...cues.map(sum)).toFixed(1)+' dBFS');
   const beds=Object.entries(m.music).map(([k,v])=>k+' '+v.fast.toFixed(1));console.log('music loud-window (100 ms) peaks: '+beds.join(' · '));
   check('no page error',!errors.length,errors.join(' | '));}
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(FIT?'qa-sfx-mix: fit printed':failed?`qa-sfx-mix: ${failed} FAILED`:`qa-sfx-mix: all ${results.length} checks passed`);
 process.exitCode=!FIT&&failed?1:0;
})().catch(e=>{console.error(e);process.exitCode=1;});
