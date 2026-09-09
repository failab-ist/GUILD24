(function(G){
let ctx,timer=null,track='',beat=0,enabled=false;
const tunes={day:[262,330,392,330,294,349,440,349],night:[220,262,294,262,196,247,262,247],boss:[147,165,175,196,147,220,196,165]};
const sfx={button:[440],quantity:[330],order:[392,523],sale:[523,659],refusal:[220,196],gold:[659,784],overcharge:[523,784,988],half:[392,523],relic:[392,523,659,784],level:[523,659,784],discovery:[440,659,880],depart:[392,330],return:[330,392],great:[523,659,784],injury:[262,220],severe:[196,165],death:[147,131],boss:[165,196,147]};
function tone(hz,when,duration,volume,type='triangle'){const o=ctx.createOscillator(),gain=ctx.createGain();o.type=type;o.frequency.value=hz;gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(volume,when+.018);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);o.connect(gain);gain.connect(ctx.destination);o.start(when);o.stop(when+duration+.02);}
function play(kind='button'){if(!enabled||!ctx)return;ctx.resume().catch(()=>{});(sfx[kind]||sfx.button).forEach((hz,i)=>tone(hz,ctx.currentTime+i*.07,.16,.035));}
function sync(muted,phase){enabled=!muted;if(!enabled||document.hidden){if(timer)clearInterval(timer);timer=null;track='';return;}if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){enabled=false;return;}}
 const next=phase==='final'||phase==='end'?'boss':phase==='night'?'night':'day';if(track===next&&timer)return;if(timer)clearInterval(timer);track=next;beat=0;timer=setInterval(()=>{if(!enabled||document.hidden||ctx.state!=='running')return;const melody=tunes[track];tone(melody[beat%melody.length],ctx.currentTime,.55,.008,'sine');if(beat%4===0)tone(melody[beat%melody.length]/2,ctx.currentTime,.85,.009,'triangle');beat++;},620);}
G.Sound={play,sync};
})(globalThis);
