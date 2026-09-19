(function(G){
/* There are no audio files in this build - every sound is synthesised here, so a volume
   control is a gain node and nothing more. Three stages sit between an oscillator and the
   speakers: the voice's own envelope, the bus it belongs to (music or effects), and one
   master. The player owns the two buses; the master stays at unity and exists so a later
   ducking or fade has somewhere to live. Levels are presentation preferences, so they are
   read from account.settings and default at the audio layer when a save predates them. */
let ctx,timer=null,track='',beat=0,enabled=false,master=null,bgmBus=null,sfxBus=null;
const DEFAULT={bgm:1,sfx:1},level={bgm:DEFAULT.bgm,sfx:DEFAULT.sfx};
const clamp=v=>Number.isFinite(v)?Math.min(1,Math.max(0,v)):null;
const tunes={day:[262,330,392,330,294,349,440,349],night:[220,262,294,262,196,247,262,247],boss:[147,165,175,196,147,220,196,165]};
/* Music used to be mixed a quarter as loud as the smallest button click, which is why it
   read as missing rather than as quiet. These are its design maximum now; the slider
   scales down from here.

   UI-Q114: on a real phone at BGM 100 / SFX 100 the music was still barely there, so the two
   music voices are raised toward the effects voice rather than the effects being pulled down.
   Attenuating SFX would have made the mix quieter overall and faked loud music, which the
   owner names as a FAIL. The effects voice is unchanged. */
const BGM_VOICE=.035,BGM_BASS=.044,SFX_VOICE=.035;
/* UI-Q114 §SOFT UI / §STORE SYSTEM. `ui` is the one quiet shared click for reference and
   navigation - opening a panel, a tab, the next coach step - so those stop being silent
   without every press earning a sound of its own. `fixture` is a short double knock for
   putting a Decoration in a Slot or taking it out: deliberately not the purchase fanfare,
   because fitting something you already own is not buying it. */
const sfx={button:[440],ui:[520],fixture:[196,147],quantity:[330],order:[392,523],sale:[523,659],refusal:[220,196],gold:[659,784],spend:[784,659],overcharge:[523,784,988],half:[392,523],relic:[392,523,659,784],level:[523,659,784],discovery:[440,659,880],open:[330,392,523],close:[392,330,262],depart:[392,330],return:[330,392],great:[523,659,784],injury:[262,220],severe:[196,165],death:[147,131],boss:[165,196,147]};
function buses(){if(!ctx)return;
 if(!master){master=ctx.createGain();master.gain.value=1;master.connect(ctx.destination);
  bgmBus=ctx.createGain();sfxBus=ctx.createGain();bgmBus.connect(master);sfxBus.connect(master);}
 bgmBus.gain.value=level.bgm;sfxBus.gain.value=level.sfx;}
function tone(hz,when,duration,volume,type='triangle',bus=null){const o=ctx.createOscillator(),gain=ctx.createGain();o.type=type;o.frequency.value=hz;gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(volume,when+.018);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);o.connect(gain);gain.connect(bus||sfxBus||ctx.destination);o.start(when);o.stop(when+duration+.02);}
/* Reads the two levels off whatever settings object it is handed and applies them live, so
   dragging a slider is audible before anything is saved. A level the save does not carry
   falls back to this module's own default rather than being written into the account. */
function mix(settings){if(settings){const b=clamp(settings.bgm),s=clamp(settings.sfx);
  level.bgm=b===null?DEFAULT.bgm:b;level.sfx=s===null?DEFAULT.sfx:s;buses();}
 return {bgm:level.bgm,sfx:level.sfx};}
/* Most cues are a run of notes at the one effects voice. A few name their own shape, where
   the class they belong to calls for it: the shared UI click has to sit under everything
   else it accompanies, and a fixture is a knock rather than a tone. */
const shape={ui:{gain:.45,dur:.06,type:'square'},fixture:{gain:.8,dur:.09,type:'square',step:.05}};
function play(kind='button'){if(!enabled||!ctx)return;ctx.resume().catch(()=>{});
 const notes=sfx[kind]||sfx.button,sh=shape[kind]||{};
 notes.forEach((hz,i)=>tone(hz,ctx.currentTime+i*(sh.step??.07),sh.dur??.16,SFX_VOICE*(sh.gain??1),sh.type||'triangle',sfxBus));}
function sync(muted,phase,settings){if(settings)mix(settings);enabled=!muted;if(!enabled||document.hidden){if(timer)clearInterval(timer);timer=null;track='';return;}if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){enabled=false;return;}}
 buses();
 const next=phase==='final'||phase==='end'?'boss':phase==='night'?'night':'day';if(track===next&&timer)return;if(timer)clearInterval(timer);track=next;beat=0;timer=setInterval(()=>{if(!enabled||document.hidden||ctx.state!=='running')return;const melody=tunes[track];tone(melody[beat%melody.length],ctx.currentTime,.55,BGM_VOICE,'sine',bgmBus);if(beat%4===0)tone(melody[beat%melody.length]/2,ctx.currentTime,.85,BGM_BASS,'triangle',bgmBus);beat++;},620);}
G.Sound={play,sync,mix,cues:Object.keys(sfx),defaults:{bgm:DEFAULT.bgm,sfx:DEFAULT.sfx}};
})(globalThis);
