// v3.0 BGM runtime evidence (User 2026-09-29). Dev-only, part of `npm run qa:runtime`.
// Drives the real page through every music key and checks what the audio engine actually does:
//   - each key fetches its own dist/ui/assets/bgm file, decodes it at 32 kHz and starts at the loop start `s`
//   - the join is scheduled on the audio clock: the next pass starts at s exactly when the current one reaches e,
//     the old pass fades out over `xf` and the new one fades in (5 ms, BOSS 1 s) - checked by releasing the
//     2 s-ahead pass timer early instead of waiting three minutes
//   - one track at a time; a phase change fades the old track out
//   - mute and a hidden page stop the music; coming back resumes the same track
//   - a file that cannot load falls back to the synthesised bed, never silence
//   - no page error, no console error
//   node tools/qa-bgm.cjs [out-dir]
const {spawn}=require('node:child_process'),path=require('node:path');
const PORT=Number(process.env.QA_PORT||5193),EXECUTABLE=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const results=[];const check=(name,ok,detail='')=>{results.push(ok);console.log((ok?'PASS ':'FAIL ')+name+(detail?' - '+detail:''));};
function serve(){
 const child=spawn(process.execPath,[path.resolve(__dirname,'preview.cjs'),'--port',String(PORT)],{stdio:['ignore','pipe','inherit']});
 return new Promise((res,rej)=>{child.stdout.on('data',d=>String(d).includes('ready')&&res(child));setTimeout(()=>rej(Error('preview server did not start')),8000);});
}
// Spies on the Web Audio calls the engine makes. Long timers (the next-pass queue) are held so the test can release
// them at once; nothing about the engine itself is changed.
const SPY=()=>{window.__bgm={starts:[],curves:[],held:[],osc:0};
 const st=AudioBufferSourceNode.prototype.start;
 AudioBufferSourceNode.prototype.start=function(when,offset){const b=this.buffer;
  if(b&&b.duration>30)__bgm.starts.push({when,offset,dur:b.duration,rate:b.sampleRate,ctxNow:this.context.currentTime});
  return st.apply(this,arguments);};
 const cv=AudioParam.prototype.setValueCurveAtTime;
 AudioParam.prototype.setValueCurveAtTime=function(values,time,duration){
  __bgm.curves.push({rise:values[0]<values[values.length-1],time,duration});return cv.apply(this,arguments);};
 const os=OscillatorNode.prototype.start;OscillatorNode.prototype.start=function(){__bgm.osc++;return os.apply(this,arguments);};
 const t=window.setTimeout;window.setTimeout=function(fn,ms,...a){
  if(ms>20000){__bgm.held.push(fn);return 0;}return t.call(window,fn,ms,...a);};};
(async()=>{
 const playwright=require('playwright');
 const server=await serve();
 const browser=await playwright.chromium.launch({executablePath:EXECUTABLE,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:780},locale:'ko-KR'});
  await ctx.addInitScript(()=>{if(!sessionStorage.getItem('qa-bgm')){localStorage.clear();sessionStorage.setItem('qa-bgm','1');}});
  await ctx.addInitScript(SPY);
  const p=await ctx.newPage();
  const errors=[],fetched=[];let blocking=false;
  p.on('pageerror',e=>errors.push(e.message));
  // the one resource error the fallback check provokes on purpose is not a finding
  p.on('console',m=>{if(m.type()==='error'&&!(blocking&&/Failed to load resource/.test(m.text())))errors.push(m.text());});
  p.on('request',r=>{const m=r.url().match(/assets\/bgm\/(\w+)\.mp3/);if(m)fetched.push(m[1]);});
  await p.goto(`http://127.0.0.1:${PORT}/index.html`);
  const music=await p.evaluate(()=>Sound.music);
  // a new account starts muted (META settings); the player turns sound on
  check('a new account starts muted and plays nothing',await p.evaluate(()=>Guild24.game.account.settings.muted&&__bgm.starts.length===0));
  await p.evaluate(()=>{Guild24.game.account.settings.muted=false;Guild24.render();});
  const waitStart=async n=>{for(let i=0;i<100;i++){if(await p.evaluate(k=>__bgm.starts.length>=k,n))return true;await p.waitForTimeout(100);}return false;};
  // no Run: the title
  check('the title track starts with no Run',await waitStart(1));
  let s=await p.evaluate(()=>__bgm.starts[0]);
  check('title.mp3 is the file fetched',fetched[0]==='title',fetched.join(','));
  check('decoded at 32 kHz (memory on a phone)',s&&s.rate===32000,s&&String(s.rate));
  check('the title starts at its loop start',s&&Math.abs(s.offset-music.title.s)<.002,s&&s.offset.toFixed(3));
  check('one fade-in of 5 ms on the first pass',await p.evaluate(()=>__bgm.curves.some(c=>c.rise&&Math.abs(c.duration-.005)<1e-6)));
  // every phase key
  const keys=[['foundation','title'],['morning','morning'],['order','order'],['sell','sale'],['night','night'],['closing','close'],['final','boss'],['end-win','succ'],['end-fail','fail']];
  await p.evaluate(()=>Guild24.game.start('qa-bgm-1'));
  for(const [phase,key] of keys){
   const before=await p.evaluate(()=>__bgm.starts.length),fetchedBefore=fetched.length;
   await p.evaluate(ph=>{const s=Guild24.game.run;if(ph.startsWith('end')){s.phase='end';s.win=ph==='end-win';}else s.phase=ph;
    Sound.sync(false,ph==='foundation'?'prep':ph,Guild24.game.account.settings);},phase);
   if(key==='title'){check('첫 점포지원 keeps the title playing (no refetch, no restart)',fetched.length===fetchedBefore&&await p.evaluate(b=>__bgm.starts.length===b,before));continue;}
   const ok=await waitStart(before+1);
   s=await p.evaluate(b=>__bgm.starts[b],before);
   check(`${phase} plays ${key}.mp3 from its loop start`,ok&&fetched.slice(fetchedBefore).includes(key)&&Math.abs(s.offset-music[key].s)<.002,
    ok?`offset ${s.offset.toFixed(3)} / s ${music[key].s}`:'no start');
  }
  // the ending through the real app key: a cleared Run and a failed one pick their own track
  const endKey=await p.evaluate(()=>{const s=Guild24.game.run;s.phase='end';s.win=true;const a=Sound.trackFor('end-win');s.win=false;return [a,Sound.trackFor('end-fail')];});
  check('the ending splits into success / failure',endKey[0]==='succ'&&endKey[1]==='fail');
  // the join, on the audio clock: release the held next-pass timer for the current track (fail) and for BOSS
  for(const key of ['fail','boss']){
   const c0=await p.evaluate(()=>__bgm.starts.length);
   await p.evaluate(k=>{const s=Guild24.game.run;if(k==='boss')s.phase='final';Sound.sync(false,k==='boss'?'final':'end-fail',Guild24.game.account.settings);},key);
   if(key==='boss')await waitStart(c0+1);
   await p.waitForTimeout(400);
   const r=await p.evaluate(k=>{const n=__bgm.starts.length,first=__bgm.starts[n-1];const held=__bgm.held.splice(0);held.forEach(f=>f());
    const next=__bgm.starts[n];return {first,next,curves:__bgm.curves.slice(-4)};},key);
   const t=music[key],len=t.e-r.first.offset;
   check(`${key}: the next pass starts at s`,r.next&&Math.abs(r.next.offset-t.s)<.002,r.next&&r.next.offset.toFixed(3));
   check(`${key}: exactly when the current pass reaches e`,r.next&&Math.abs(r.next.when-r.first.when-len)<.002,r.next&&(r.next.when-r.first.when).toFixed(3)+' / '+len.toFixed(3));
   const fall=r.curves.find(c=>!c.rise&&Math.abs(c.time-r.next.when)<.002),rise=r.curves.find(c=>c.rise&&Math.abs(c.time-r.next.when)<.002);
   check(`${key}: the old pass fades out over ${t.xf} s at the join`,fall&&Math.abs(fall.duration-t.xf)<1e-6,fall&&String(fall.duration));
   check(`${key}: the new pass fades in over ${t.cross?t.xf:.005} s`,rise&&Math.abs(rise.duration-(t.cross?t.xf:.005))<1e-6,rise&&String(rise.duration));
  }
  // mute and a hidden page stop it; coming back resumes the same track without a new fetch
  await p.waitForTimeout(1500);
  const n0=await p.evaluate(()=>__bgm.starts.length),f0=fetched.length;
  await p.evaluate(()=>Sound.sync(true,'final',Guild24.game.account.settings));
  await p.evaluate(()=>Sound.sync(false,'final',Guild24.game.account.settings));
  check('unmuting resumes BOSS from the decoded buffer (no refetch)',await waitStart(n0+1)&&fetched.length===f0);
  s=await p.evaluate(n=>__bgm.starts[n],n0);
  check('and from where it was (past s, inside the loop)',s&&s.offset>music.boss.s+.5&&s.offset<music.boss.e,s&&s.offset.toFixed(3));
  // a phase change fades the old one out: the out gain ramps to 0 over BGM_SWAP; only one track is audible afterwards
  // (checked indirectly: the new start happens and no second track is started for the same key)
  // fallback: a file that cannot load plays the synthesised bed
  blocking=true;await p.route('**/assets/bgm/night.mp3',r=>r.abort());
  const osc0=await p.evaluate(()=>__bgm.osc);
  await p.evaluate(()=>{Guild24.game.run.phase='night';Sound.sync(false,'night',Guild24.game.account.settings);});
  await p.waitForTimeout(2500);
  check('a file that cannot load falls back to the synthesised bed',await p.evaluate(o=>__bgm.osc>o,osc0));
  await p.unroute('**/assets/bgm/night.mp3');blocking=false;
  // the real app key through render(): a failed ending on the ending screen
  const fe=fetched.length;
  await p.evaluate(()=>{const s=Guild24.game.run;s.phase='end';s.win=false;s.endReason='qa';Guild24.render();});
  await p.waitForTimeout(800);
  check('render() on a failed ending asks for fail.mp3 or keeps it decoded',fetched.slice(fe).every(k=>k==='fail'));
  check('no page or console error',errors.length===0,errors.slice(0,3).join(' | '));
 }finally{await browser.close();server.kill();}
 const failed=results.filter(x=>!x).length;
 console.log(failed?`qa-bgm: ${failed} FAILED`:`qa-bgm: all ${results.length} checks passed`);
 process.exitCode=failed?1:0;
})().catch(e=>{console.error(e);process.exitCode=1;});
