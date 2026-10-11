// v3.0 trailer build (User 2026-10-01, reports/trailer-plan.md §7). Dev-only. Shoots the five takes from a real-play snapshot
// (tools/trailer-snapshot.cjs output), renders caption cards, assembles the 30s rough cut and 1080p samples with ffmpeg.
// Nothing injected into the game; captures hide only .build-mark / #toast and skip the tutorial coach.
//   FFMPEG=<path> node tools/trailer-build.cjs <snap.json> <itemName> <npcId> <outDir>
const {spawn,execFileSync}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),PORT=Number(process.env.QA_PORT||5216),EXEC=process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium';
const FF=process.env.FFMPEG||'ffmpeg';
const [snapPath,itemName,npcId,outDirArg]=process.argv.slice(2);const outDir=path.resolve(outDirArg);const snaps=JSON.parse(fs.readFileSync(snapPath,'utf8'));fs.mkdirSync(outDir,{recursive:true});
const HIDE='.build-mark{display:none!important}#toast{display:none!important}';
function serve(){const c=spawn(process.execPath,[ROOT+'/tools/preview.cjs','--port',String(PORT)],{stdio:['ignore','pipe','inherit']});return new Promise((res,rej)=>{c.stdout.on('data',d=>String(d).includes('ready')&&res(c));setTimeout(()=>rej(Error('no server')),8000);});}
async function load(ctx,snap,opts={}){const page=await ctx.newPage();page.on('pageerror',e=>console.log('PAGEERROR',e.message));
 await page.goto(`http://127.0.0.1:${PORT}/index.html`,{waitUntil:'load'});await page.addStyleTag({content:HIDE});
 const run=JSON.parse(JSON.stringify(snap.run));run.rngState=snap.rng.state;if(opts.cursor!=null)run.nightCursor=opts.cursor;
 const account=JSON.parse(JSON.stringify(snap.account));(account.tutorial??={}).skipped=true;
 await page.setInputFiles('#save-file',{name:'snap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:9,account,run}))});
 if(opts.dismiss){await page.waitForTimeout(700);for(let i=0;i<3;i++){const b=await page.$('#modal-root [data-action="boss-seen"], #modal-root [data-action="approve"], #modal-root [data-action="dismiss"]');if(!b)break;await page.evaluate(el=>el.click(),b);await page.waitForTimeout(400);}}
 return page;}
/* shoot: jpeg frames with wall-clock timestamps; actions fire at their scheduled second (checked between frames) */
async function shoot(page,name,dur,actions){const dir=path.join(outDir,'take-'+name);fs.mkdirSync(dir,{recursive:true});const frames=[];const t0=Date.now();let n=0;const pending=[...actions].sort((a,b)=>a.t-b.t);const marks={};
 while(true){const el=(Date.now()-t0)/1000;if(el>=dur)break;
  while(pending.length&&el>=pending[0].t){const a=pending.shift();const r=await a.fn(page);marks[a.name||('a'+a.t)]=(Date.now()-t0)/1000;if(r&&typeof r==='object')Object.assign(marks,r);}
  const ts=(Date.now()-t0)/1000;const buf=await page.screenshot({type:'jpeg',quality:90});const f=path.join(dir,String(n++).padStart(5,'0')+'.jpg');fs.writeFileSync(f,buf);frames.push({t:ts,f});}
 return {frames,marks,dur};}
function segment(take,a,b,out){const fr=take.frames.filter(x=>x.t<b);let lines=[];for(let i=0;i<fr.length;i++){const t=fr[i].t,next=i+1<fr.length?fr[i+1].t:b;if(next<=a)continue;const s=Math.max(t,a),e=Math.min(next,b);if(e<=s)continue;lines.push(`file '${fr[i].f}'`,`duration ${(e-s).toFixed(4)}`);}
 if(!lines.length)throw Error('no frames for '+out);lines.push(`file '${fr[fr.length-1].f}'`);const list=out+'.txt';fs.writeFileSync(list,lines.join('\n'));
 execFileSync(FF,['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',list,'-vf','fps=30,scale=1080:1920:flags=lanczos,format=yuv420p','-t',(b-a).toFixed(3),'-c:v','libx264','-preset','veryfast','-crf','16','-an',out]);return out;}
function still(png,dur,out){execFileSync(FF,['-hide_banner','-loglevel','error','-y','-loop','1','-i',png,'-vf','scale=1080:1920:flags=lanczos,format=yuv420p','-t',String(dur),'-r','30','-c:v','libx264','-preset','veryfast','-crf','16','-an',out]);return out;}
(async()=>{
 const pw=require('playwright');const server=await serve();const browser=await pw.chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
 const mk=()=>browser.newContext({viewport:{width:405,height:720},deviceScaleFactor:2,isMobile:true,hasTouch:true,locale:'ko-KR'});
 const log={head:execFileSync('git',['rev-parse','--short','HEAD'],{cwd:ROOT}).toString().trim(),seed:snaps.sale.run.seed,npcId,itemName,takes:{}};
 try{
  // T1 SALE 13s: tap item at 7.0, tap the enabled price key at 11.0
  let ctx=await mk();let p=await load(ctx,snaps.sale,{dismiss:true});await p.waitForTimeout(600);await p.addStyleTag({content:HIDE});
  const stockId=await p.evaluate(n=>(Guild24.game.run.inventory.find(x=>DATA.itemBy[x.item]?.name===n)||{}).id,itemName);
  const T1=await shoot(p,'sale',13,[{t:7.0,name:'tapItem',fn:async pg=>{await pg.evaluate(id=>document.querySelector(`[data-action="select"][data-id="${id}"]`)?.click(),stockId);}},
   {t:11.0,name:'tapPrice',fn:async pg=>{const mode=await pg.$$eval('.tills button[data-action="sell"]',b=>(b.find(x=>x.dataset.mode==='full'&&!x.disabled)||b.find(x=>!x.disabled))?.dataset.mode);await pg.evaluate(m=>document.querySelector(`.tills button[data-action="sell"][data-mode="${m}"]`)?.click(),mode);return {priceMode:mode};}}]);
  log.takes.sale={frames:T1.frames.length,marks:T1.marks};await ctx.close();
  // T2 NIGHT 8s: the followed customer's card arrives and stamps
  const nightIdx=snaps.night.run.results.findIndex(r=>r.npcId===npcId);ctx=await mk();p=await load(ctx,snaps.night,{cursor:nightIdx});
  const T2=await shoot(p,'night',8,[]);log.takes.night={frames:T2.frames.length,nightIdx};await ctx.close();
  // T3 FINAL 16s: roster, then 마왕성으로 출발 at 3.5 → boss-go at 4.0; detect the clash end
  ctx=await mk();p=await load(ctx,snaps.finalBefore,{dismiss:true});await p.waitForTimeout(600);await p.addStyleTag({content:HIDE});
  let clashEnd=null,clashStart=null;const T3=await shoot(p,'final',16,[{t:3.5,name:'boss',fn:async pg=>{await pg.evaluate(()=>document.querySelector('[data-action="boss"]')?.click());}},{t:4.0,name:'bossGo',fn:async pg=>{await pg.evaluate(()=>(document.querySelector('#modal-root [data-action="boss-go"]')||document.querySelector('[data-action="boss"]'))?.click());clashStart=(Date.now());}},
   ...Array.from({length:22},(_,i)=>({t:5+i*0.5,name:'probe'+i,fn:async pg=>{const live=await pg.evaluate(()=>!!document.querySelector('.clash'));if(!live&&clashEnd===null&&clashStart)clashEnd=true;return {};}}))]);
  // clash end time = first probe after which .clash is gone
  const probes=Object.entries(T3.marks).filter(([k])=>k.startsWith('probe')).map(([k,v])=>[Number(k.slice(5)),v]).sort((a,b)=>a[0]-b[0]);
  const endState=await p.evaluate(()=>({phase:Guild24.game.run.phase,win:Guild24.game.run.win}));log.takes.final={frames:T3.frames.length,marks:{boss:T3.marks.boss,bossGo:T3.marks.bossGo},endState,expectedWin:snaps.finalAfter.run.win};
  // find clash end by scanning frames? use probes: re-evaluate per probe not stored; fall back to measured 11.8s after bossGo
  const clashDur=11.8;const tEnd=T3.marks.bossGo+clashDur;log.takes.final.clashEndAssumed=tEnd;
  const endPng=path.join(outDir,'end-still.png');await p.screenshot({path:endPng});await ctx.close();
  // T5 title card + caption cards (HTML → PNG, full Wanted Sans Bold from node_modules, Mulmaru from dist)
  const bold='file://'+path.join(ROOT,'node_modules/wanted-sans/fonts/ttf/WantedSans-Bold.ttf'),mul='file://'+path.join(ROOT,'dist/ui/fonts/Mulmaru.woff2');
  const css=`@font-face{font-family:WB;src:url('${bold}')}@font-face{font-family:MUL;src:url('${mul}') format('woff2')}html,body{margin:0;width:1080px;height:1920px;background:transparent;overflow:hidden}.cap{position:absolute;left:0;right:0;text-align:center;font-family:WB;font-weight:700;color:#fff;font-size:72px;line-height:1.25;letter-spacing:-0.5px;text-shadow:0 3px 14px rgba(0,0,0,.95),0 0 3px #000,0 0 28px rgba(0,0,0,.9);padding:18px 60px;word-break:keep-all}.band{background:linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.62) 18%,rgba(0,0,0,.62) 82%,rgba(0,0,0,0))}`;
  const cctx=await browser.newContext({viewport:{width:1080,height:1920},deviceScaleFactor:1});const cp=await cctx.newPage();
  const card=async(name,html)=>{await cp.setContent(`<!doctype html><meta charset=utf-8><style>${css}</style>${html}`);await cp.waitForTimeout(400);const f=path.join(outDir,'cap-'+name+'.png');await cp.screenshot({path:f,omitBackground:true});return f;};
  const caps={
   c1:await card('c1','<div class="cap band" style="top:900px">단 30일.</div>'),
   c2:await card('c2','<div class="cap band" style="top:1560px;font-size:64px">편의점에서 시작되는<br>마왕 토벌.</div>'),
   c3:await card('c3','<div class="cap band" style="top:900px;font-size:64px">당신이 건넨 물건 하나가,</div>'),
   c4:await card('c4','<div class="cap band" style="top:1640px;font-size:64px">그들의 생사를 가른다.</div>'),
   c5:await card('c5','<div class="cap band" style="top:1700px;font-size:60px">키워낸 단골들과 함께,</div>'),
   c6:await card('c6','<div class="cap band" style="top:1700px;font-size:64px">마왕을 쓰러뜨려라.</div>')};
  await cp.setContent(`<!doctype html><meta charset=utf-8><style>${css}html,body{background:#1b1612}.t{position:absolute;left:0;right:0;top:760px;text-align:center;font-family:MUL;font-size:150px;color:#f3e6c8;text-shadow:0 6px 0 #3a2a18,0 0 40px rgba(0,0,0,.6);letter-spacing:4px}.s{position:absolute;left:0;right:0;top:1000px;text-align:center;font-family:WB;font-size:54px;color:#cdbb9a;letter-spacing:6px}</style><div class="t">마왕 잡는 편의점</div><div class="s">턴제 경영 로그라이트</div>`);await cp.waitForTimeout(500);
  const titlePng=path.join(outDir,'title-card.png');await cp.screenshot({path:titlePng});await cctx.close();
  // --- assembly (§7 mapping) ---
  const seg=path.join(outDir,'seg');fs.mkdirSync(seg,{recursive:true});const S=[];
  S.push(segment(T1,0.0,2.0,path.join(seg,'s1.mp4')));S.push(segment(T3,0.0,3.0,path.join(seg,'s2.mp4')));S.push(segment(T1,5.0,12.5,path.join(seg,'s3.mp4')));S.push(segment(T2,0.0,7.5,path.join(seg,'s4.mp4')));
  S.push(segment(T3,1.5,3.0,path.join(seg,'s5.mp4')));S.push(segment(T3,T3.marks.bossGo+0.3,T3.marks.bossGo+1.8,path.join(seg,'s6.mp4')));S.push(segment(T3,tEnd-3.4,tEnd-0.4,path.join(seg,'s7.mp4')));
  S.push(still(endPng,1.0,path.join(seg,'s8.mp4')));S.push(still(titlePng,3.0,path.join(seg,'s9.mp4')));
  const concat=path.join(seg,'all.txt');fs.writeFileSync(concat,S.map(f=>`file '${f}'`).join('\n'));const video=path.join(outDir,'video-30s.mp4');
  execFileSync(FF,['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',concat,'-c','copy',video]);
  // captions + audio
  const bgm=path.join(ROOT,'dist/ui/assets/bgm/title.mp3'),sfx=n=>path.join(ROOT,'dist/ui/assets/audio',n+'.mp3');
  const sfxList=[['door',0.0],['register',5.0],['key',7.0],['cart',11.0],['stamp',12.6],['settle',26.0]];
  const win=[['c1',0.3,2.0],['c2',2.3,5.0],['c3',5.5,9.5],['c4',12.5,15.0],['c5',20.0,21.5],['c6',21.5,24.0]];
  const inputs=['-i',video];win.forEach(([k])=>inputs.push('-i',caps[k]));inputs.push('-i',bgm);sfxList.forEach(([n])=>inputs.push('-i',sfx(n)));
  let fc='[0:v]format=yuv420p[v0];';let prev='v0';win.forEach(([k,a,b],i)=>{fc+=`[${prev}][${i+1}:v]overlay=0:0:enable='between(t,${a},${b})'[v${i+1}];`;prev='v'+(i+1);});
  fc+=`[${prev}]fade=t=in:st=0:d=0.3,fade=t=out:st=29.4:d=0.6[vout];`;
  const bgmIdx=1+win.length;fc+=`[${bgmIdx}:a]atrim=0:30,asetpts=PTS-STARTPTS,volume=0.9,afade=t=in:st=0:d=0.5,afade=t=out:st=28:d=2[bg];`;
  sfxList.forEach(([n,t],i)=>{fc+=`[${bgmIdx+1+i}:a]adelay=${Math.round(t*1000)}|${Math.round(t*1000)},volume=0.8[s${i}];`;});
  fc+=`[bg]${sfxList.map((_,i)=>`[s${i}]`).join('')}amix=inputs=${1+sfxList.length}:duration=first:normalize=0[aout]`;
  const full=path.join(outDir,'trailer-30s-1080x1920.mp4');
  execFileSync(FF,['-hide_banner','-loglevel','error','-y',...inputs,'-filter_complex',fc,'-map','[vout]','-map','[aout]','-t','30','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-movflags','+faststart',full]);
  execFileSync(FF,['-hide_banner','-loglevel','error','-y','-i',full,'-vf','scale=540:960','-c:v','libx264','-preset','veryfast','-crf','24','-c:a','copy',path.join(outDir,'rough-540.mp4')]);
  execFileSync(FF,['-hide_banner','-loglevel','error','-y','-ss','7','-t','5.5','-i',full,'-c','copy',path.join(outDir,'sample-sale-1080.mp4')]);
  execFileSync(FF,['-hide_banner','-loglevel','error','-y','-ss','20','-t','7','-i',full,'-c','copy',path.join(outDir,'sample-clash-1080.mp4')]);
 }catch(e){if(e.stderr)log.ffmpegError=String(e.stderr).slice(-600);log.error=String(e.message||e).slice(0,400);}
 finally{try{const info=require('node:child_process').spawnSync(FF,['-hide_banner','-i',path.join(outDir,'trailer-30s-1080x1920.mp4')]);log.probe=String(info.stderr).split('\n').filter(l=>/Duration|Stream/.test(l)).map(l=>l.trim().slice(0,120));}catch(e){}
  fs.writeFileSync(path.join(outDir,'build-log.json'),JSON.stringify(log,null,1));console.log(JSON.stringify(log,null,1));await browser.close();server.kill();}
})();
