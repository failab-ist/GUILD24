(function(G){
/* There are no audio files in this build - every sound is synthesised here, so a volume
   control is a gain node and nothing more. Three stages sit between an oscillator and the
   speakers: the voice's own envelope, the bus it belongs to (music or effects), and one
   master. The player owns the two buses; the master stays at unity and exists so a later
   ducking or fade has somewhere to live. Levels are presentation preferences, so they are
   read from account.settings and default at the audio layer when a save predates them.

   UI_UX_v2.8 §DECISION / PHASE AUDIO is served by widening this same engine, not by adding a
   second one: one more voice (filtered noise), two optional fields on the existing tone, and
   a per-cue shape table that was already here. No loader, no asset fetch, no new framework -
   the build still plays with no network, which the page promises in its <noscript>. */
let ctx,timer=null,track='',beat=0,enabled=false,master=null,bgmBus=null,sfxBus=null,noiseBuf=null;
let appliedBgm=null,appliedSfx=null;
const DEFAULT={bgm:1,sfx:1},level={bgm:DEFAULT.bgm,sfx:DEFAULT.sfx};
const clamp=v=>Number.isFinite(v)?Math.min(1,Math.max(0,v)):null;
/* UI_UX_v2.8: MORNING / ORDER / SALE / NIGHT / FINAL each get their own bed. Canonical does
   not ask for a unique full track per phase, so identity comes from arrangement - tempo, lead
   voice, how often the bass lands, whether a drone sits under it - over the one sequencer that
   was already here. MORNING / ORDER / SALE stay in the same key so the store still sounds like
   one store across its own day; NIGHT and FINAL drop out of it on purpose. */
const tunes={
 morning:{notes:[262,330,392,330,294,349,440,349],ms:620,wave:'sine',bass:4,bassWave:'triangle'},
 order:{notes:[294,392,349,440,392,294,330,392],ms:520,wave:'triangle',bass:2,bassWave:'square'},
 sale:{notes:[330,392,494,440,392,523,440,392],ms:450,wave:'sine',bass:4,bassWave:'triangle'},
 night:{notes:[220,262,294,262,196,247,262,247],ms:700,wave:'sine',bass:4,bassWave:'triangle'},
 boss:{notes:[147,165,175,196,147,220,196,165],ms:760,wave:'sine',bass:2,bassWave:'triangle',drone:73.4}};
const trackFor=phase=>phase==='final'||phase==='end'?'boss'
 :phase==='night'?'night':phase==='order'?'order':phase==='sell'?'sale':'morning';
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
const sfx={button:[440],ui:[520],fixture:[196,147],quantity:[330],
 /* UI-Q-v28-22 decision classes. The four material decisions are separated by contour AND by
    timbre, because four triangle arpeggios at different pitches still read as one UI click:
    ORDER falls onto a low knock, SALE rises and rings, refusal falls and stays dull, and a
    Store Support acquisition is the only one that keeps a tail. */
 order:[110,164.81],sale:[523,659,784],refusal:[233,175],relic:[392,523,659,784],
 gold:[659,784],spend:[784,659],overcharge:[523,784,988],half:[392,523],
 level:[523,659,784],discovery:[440,659,880],open:[330,392,523],close:[392,330,262],
 depart:[392,330],return:[330,392],
 /* UI-Q-v28-23 NIGHT results. Presentation only - each name is chosen from an Outcome the
    result object already carries. `rescue` is the proven-state accent and never plays on its
    own; it lands after the outcome cue the result actually resolved to. */
 great:[523,659,784,1047],retreat:[440,392,330,262],injury:[262,220],severe:[196,165],
 death:[147,131],rescue:[659,988],
 /* UI-Q-v28-24. One acknowledgement for every Boss-information beat, so the cue itself tells
    the player nothing the beat has not already shown; `final` is the D30 entry. */
 reveal:[294,392],boss:[165,196,147],final:[98,123.47,146.83]};
function buses(force){if(!ctx)return;
 if(!master){master=ctx.createGain();master.gain.value=1;master.connect(ctx.destination);
  bgmBus=ctx.createGain();sfxBus=ctx.createGain();bgmBus.connect(master);sfxBus.connect(master);force=true;}
 /* Only written when the player actually moved a slider. render() syncs on every redraw, and
    assigning .value there would cancel a ducking ramp mid-flight on every frame of a redraw. */
 if(force||appliedBgm!==level.bgm){bgmBus.gain.cancelScheduledValues(ctx.currentTime);bgmBus.gain.value=level.bgm;appliedBgm=level.bgm;}
 if(force||appliedSfx!==level.sfx){sfxBus.gain.value=level.sfx;appliedSfx=level.sfx;}}
function tone(hz,when,duration,volume,type='triangle',bus=null,opt){const o=ctx.createOscillator(),gain=ctx.createGain();o.type=type;o.frequency.setValueAtTime(hz,when);
 if(opt&&opt.glide)o.frequency.exponentialRampToValueAtTime(Math.max(20,hz*opt.glide),when+duration);
 const atk=opt&&opt.attack!==undefined?opt.attack:.018;
 gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(volume,when+atk);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);o.connect(gain);gain.connect(bus||sfxBus||ctx.destination);o.start(when);o.stop(when+duration+.02);}
/* The second voice. A stamp on paper, a coin edge, a body hitting stone and a low rumble are
   all noise through a filter, and none of them can be spelled with an oscillator. The sample
   is generated once from a fixed integer sequence rather than Math.random, so a cue is the
   same sound every time and nothing here can be mistaken for - or drift into - a draw from
   the seeded Gameplay RNG, which lives in systems/rng.js and is never touched from this file. */
function noiseVoice(when,duration,volume,spec){
 if(!noiseBuf){const n=Math.floor(ctx.sampleRate*.4);noiseBuf=ctx.createBuffer(1,n,ctx.sampleRate);
  const d=noiseBuf.getChannelData(0);let seed=1;
  for(let i=0;i<n;i++){seed=(seed*1103515245+12345)&0x7fffffff;d[i]=seed/0x3fffffff-1;}}
 const src=ctx.createBufferSource();src.buffer=noiseBuf;src.loop=true;
 const f=ctx.createBiquadFilter();f.type=spec.filter||'bandpass';f.frequency.value=spec.hz??1200;f.Q.value=spec.q??1;
 const g=ctx.createGain();g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime(volume,when+.008);g.gain.exponentialRampToValueAtTime(.0001,when+duration);
 src.connect(f);f.connect(g);g.connect(sfxBus||ctx.destination);src.start(when);src.stop(when+duration+.02);}
/* A decision cue has to be readable over its own phase bed on a phone speaker. Pulling the
   music down for half a second is the one thing the master stage was left here for, and it is
   cheaper and quieter than raising every effect. The ramp returns to the player's own level,
   so ducking can never become a permanent volume change. */
function duck(when,depth){if(!bgmBus)return;const g=bgmBus.gain,full=Math.max(.0001,level.bgm);
 g.cancelScheduledValues(when);g.setValueAtTime(Math.max(.0001,g.value),when);
 g.linearRampToValueAtTime(Math.max(.0001,full*(1-depth)),when+.05);
 g.linearRampToValueAtTime(full,when+.62);}
/* Reads the two levels off whatever settings object it is handed and applies them live, so
   dragging a slider is audible before anything is saved. A level the save does not carry
   falls back to this module's own default rather than being written into the account. */
function mix(settings){if(settings){const b=clamp(settings.bgm),s=clamp(settings.sfx);
  level.bgm=b===null?DEFAULT.bgm:b;level.sfx=s===null?DEFAULT.sfx:s;buses();}
 return {bgm:level.bgm,sfx:level.sfx};}
/* Most cues are a run of notes at the one effects voice. A cue that carries a decision names
   its own shape: `type` is its timbre, `glide` bends each note by a ratio, `layer` adds the
   ringing octave a payoff needs, `noise` is the physical half of the sound, and `duck` says
   how far the phase bed steps back while it plays. */
const shape={ui:{gain:.45,dur:.06,type:'square'},fixture:{gain:.8,dur:.09,type:'square',step:.05},
 order:{gain:1.3,dur:.14,type:'square',step:.09,attack:.003,glide:.97,noise:{at:.005,dur:.12,gain:1,hz:2600,q:.6,filter:'highpass'},duck:.5},
 sale:{gain:1,dur:.2,type:'sine',step:.055,layer:{ratio:2,at:.1,dur:.55,gain:.34},noise:{at:.15,dur:.05,gain:.45,hz:5400,q:2.5},duck:.35},
 refusal:{gain:1.15,dur:.36,type:'sawtooth',step:.14,attack:.035,glide:.93,duck:.45},
 relic:{gain:1,dur:.24,type:'triangle',step:.1,layer:{ratio:2,at:.16,dur:1,gain:.3},noise:{at:.3,dur:.5,gain:.2,hz:6800,q:1.2,filter:'highpass'},duck:.55},
 overcharge:{gain:1.05,dur:.15,type:'square',step:.07,duck:.3},
 half:{gain:.95,dur:.22,type:'sine',step:.08,duck:.25},
 return:{gain:.95,dur:.22,type:'sine',step:.1},
 great:{gain:1.05,dur:.26,type:'sine',step:.09,layer:{ratio:2,at:.2,dur:1.1,gain:.32},noise:{at:.26,dur:.6,gain:.22,hz:6200,q:1,filter:'highpass'},duck:.5},
 retreat:{gain:1,dur:.11,type:'square',step:.065,attack:.005,noise:{at:0,dur:.34,gain:.4,hz:900,q:.5,filter:'bandpass'},duck:.4},
 injury:{gain:1,dur:.24,type:'triangle',step:.11,glide:.96,noise:{at:0,dur:.1,gain:.35,hz:520,q:.8},duck:.35},
 severe:{gain:1.1,dur:.4,type:'sawtooth',step:.16,attack:.04,glide:.94,noise:{at:0,dur:.28,gain:.55,hz:280,q:.7,filter:'lowpass'},duck:.5},
 death:{gain:1.15,dur:1.5,type:'sine',step:.55,attack:.06,layer:{ratio:.5,at:0,dur:2.2,gain:.5},noise:{at:0,dur:1.2,gain:.25,hz:180,q:.6,filter:'lowpass'},duck:.75},
 rescue:{gain:.9,dur:.3,type:'sine',step:.09,layer:{ratio:2,at:.12,dur:.7,gain:.28},duck:.3},
 reveal:{gain:.9,dur:.3,type:'triangle',step:.12,layer:{ratio:2,at:.14,dur:.6,gain:.22},duck:.35},
 boss:{gain:1.15,dur:.36,type:'sawtooth',step:.13,attack:.03,layer:{ratio:.5,at:0,dur:1.1,gain:.45},noise:{at:0,dur:.5,gain:.35,hz:220,q:.6,filter:'lowpass'},duck:.6},
 final:{gain:1.2,dur:1.1,type:'sawtooth',step:.3,attack:.08,glide:.98,layer:{ratio:.5,at:0,dur:2.4,gain:.5},noise:{at:0,dur:1.6,gain:.3,hz:160,q:.5,filter:'lowpass'},duck:.8}};
/* `delay` exists for the one case Canonical allows a second cue: a NIGHT result that also
   carries proven rescue evidence plays its own Outcome first and the accent behind it. */
function play(kind='button',delay=0){if(!enabled||!ctx)return;ctx.resume().catch(()=>{});
 const notes=sfx[kind]||sfx.button,sh=shape[kind]||{},t0=ctx.currentTime+(Number(delay)||0);
 notes.forEach((hz,i)=>{const at=t0+i*(sh.step??.07);
  tone(hz,at,sh.dur??.16,SFX_VOICE*(sh.gain??1),sh.type||'triangle',sfxBus,sh);
  if(sh.layer)tone(hz*sh.layer.ratio,at+(sh.layer.at??.06),sh.layer.dur??.5,SFX_VOICE*(sh.gain??1)*sh.layer.gain,sh.layer.type||'sine',sfxBus);});
 if(sh.noise)noiseVoice(t0+(sh.noise.at??0),sh.noise.dur??.09,SFX_VOICE*(sh.noise.gain??1),sh.noise);
 if(sh.duck)duck(t0,sh.duck);}
function sync(muted,phase,settings){if(settings)mix(settings);enabled=!muted;if(!enabled||document.hidden){if(timer)clearInterval(timer);timer=null;track='';return;}if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){enabled=false;return;}}
 buses();
 const next=trackFor(phase);if(track===next&&timer)return;if(timer)clearInterval(timer);track=next;beat=0;
 const tune=tunes[track];
 timer=setInterval(()=>{if(!enabled||document.hidden||ctx.state!=='running')return;const melody=tune.notes,hz=melody[beat%melody.length];
  tone(hz,ctx.currentTime,tune.ms/1000*.9,BGM_VOICE,tune.wave,bgmBus);
  if(beat%tune.bass===0)tone(hz/2,ctx.currentTime,tune.ms/1000*1.35,BGM_BASS,tune.bassWave,bgmBus);
  if(tune.drone&&beat%4===0)tone(tune.drone,ctx.currentTime,tune.ms/1000*4.2,BGM_BASS*.7,'sine',bgmBus);
  beat++;},tune.ms);}
G.Sound={play,sync,mix,cues:Object.keys(sfx),tracks:Object.keys(tunes),defaults:{bgm:DEFAULT.bgm,sfx:DEFAULT.sfx}};
})(globalThis);
