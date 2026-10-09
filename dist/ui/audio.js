(function(G){
/* Two sources reach one mixer. The material cues play a short recorded object from this
   build's own dist/ui/assets/audio; everything else is synthesised here. Either way a volume
   control is a gain node and nothing more: three stages sit between a voice and the speakers -
   the voice's own envelope, the bus it belongs to (music or effects), and one master. The
   player owns the two buses; the master stays at unity and exists so a later ducking or fade
   has somewhere to live. Levels are presentation preferences, so they are
   read from account.settings and default at the audio layer when a save predates them.

   UI_UX_v2.8 §DECISION / PHASE AUDIO is served by widening this same engine, not by adding a
   second one: one more oscillator-side voice (filtered noise), two optional fields on the
   existing tone, a per-cue shape table that was already here, and one sample voice.

   AUDIO VOICE asks the material cues for mechanical / paper / register / fixture sound. An
   oscillator can imply that material; it cannot be it, so those cues play a recorded object
   from dist/ui/assets/audio (CC0-1.0, vendored by tools/vendor-assets.py, recorded in
   reports/ASSETS.md). They ship with the build the way the fonts do, so the game still needs
   no network, which the page promises in its <noscript>. Every sampled cue keeps a synthesised
   shape behind it, so a cold first press, a blocked load or a decode failure is thinner, never
   silent. The tonal families - NIGHT outcomes, the Boss motif - stay synthesised, because those
   have to stay in tune with each other. v3.0 (User 2026-09-29): the phase music is a recorded track
   per phase (see `bgm` below); the synthesised beds stay only as its fallback. */
let ctx,timer=null,track='',beat=0,enabled=false,master=null,bgmBus=null,sfxBus=null,noiseBuf=null,loaded=false;
let appliedBgm=null,appliedSfx=null;
const DEFAULT={bgm:1,sfx:1},level={bgm:DEFAULT.bgm,sfx:DEFAULT.sfx};
const clamp=v=>Number.isFinite(v)?Math.min(1,Math.max(0,v)):null;
/* The synthesised beds - since v3.0 only the fallback for a recorded track that cannot load (`bedFor`).
   UI_UX_v2.8: MORNING / ORDER / SALE / NIGHT / FINAL each get their own bed. Canonical does
   not ask for a unique full track per phase, so identity comes from arrangement - tempo, lead
   voice, how often the bass lands, whether a drone sits under it - over the one sequencer that
   was already here. MORNING / ORDER / SALE stay in the same key so the store still sounds like
   one store across its own day; NIGHT and FINAL drop out of it on purpose. */
const tunes={
 morning:{notes:[262,330,392,330,294,349,440,349],ms:620,wave:'sine',bass:4,bassWave:'triangle',level:1.201},
 order:{notes:[294,392,349,440,392,294,330,392],ms:520,wave:'triangle',bass:2,bassWave:'square',level:.897},
 sale:{notes:[330,392,494,440,392,523,440,392],ms:450,wave:'sine',bass:4,bassWave:'triangle',level:1.201},
 night:{notes:[220,262,294,262,196,247,262,247],ms:700,wave:'sine',bass:4,bassWave:'triangle',level:1.168},
 boss:{notes:[147,165,175,196,147,220,196,165],ms:760,wave:'sine',bass:2,bassWave:'triangle',drone:73.4,level:.662}};
/* USER 2026-09-24: every phase plays at the same loudness. `level` is each track's gain trim,
   measured by rendering the track offline through this sequencer (K-weighted RMS) and matched to
   the five tracks' mean - waveform, bass and drone made them differ by up to ~5 dB. */
/* v3.0 BGM (User 2026-09-29): one recorded track per phase. The app hands the ending in as `end-win` / `end-fail`,
   and anything without a phase of its own - no Run, 첫 점포지원, the store about to open - is the title. */
/* UI_UX §PROLOGUE: `hush` is the prologue's turn - no music at all, not the title. */
const trackFor=phase=>phase==='hush'?'':phase==='final'?'boss':phase==='end-win'?'succ':phase==='end-fail'?'fail'
 :phase==='night'?'night':phase==='order'?'order':phase==='sell'?'sale':phase==='closing'?'close'
 :phase==='morning'?'morning':'title';
/* The recorded set: dist/ui/assets/bgm, the User's Gemini (Lyria) tracks (reports/ASSETS.md). An MP3 cut at a loop point
   would carry encoder padding into the seam, so a track is decoded once and played between its measured points
   s -> e (tools/bgm-loop.py, reports/bgm-loops.md). At e the next pass starts at s while the old one runs on for `xf`
   and fades out under it. s sits 5 ms before its onset, so a 5 ms fade-in keeps the attack whole; BOSS alone joins
   with a 1 s equal-power crossfade (`cross`, User 2026-09-29). `lufs` is each file's measured integrated loudness,
   trimmed to BGM_LUFS so every phase plays at the same loudness (USER 2026-09-24; NIGHT 3 dB under, below). One track is decoded at a time, at
   BGM_RATE to keep a three-minute track in memory on a phone. A file that cannot load falls back to the synthesised
   bed below (`bedFor`), so a phase is never silent because of a network or decode failure.
   The web build ships 128 kb/s copies (User 2026-09-29; tools/vendor-assets.py): they decode sample-aligned with the
   originals the points were measured on, and `lufs` is measured on these copies. While a phase plays, the next phase's
   file is fetched ahead (`nextOf`) - the bytes only, never a second decoded track - so a phase change does not wait on
   the network. */
/* Mix: the music at -30 LUFS - NIGHT a further 3 dB under (`trim`), the
   densest track, which read as the loudest in play - and every effect at its own tier level (LEVEL below), so decision and
   result cues read clearly above it (PRESENTATION §Mix). The effects bus is the player's slider alone.
   A phase change fades the old track out over BGM_SWAP; the next one starts only after it (two keys never overlap) and
   rises over BGM_IN on a squared curve, so it does not start on a hard downbeat. */
const BGM_DIR='ui/assets/bgm/',BGM_LUFS=-30,BGM_RATE=32000,BGM_SWAP=1,BGM_IN=1.5;
/* UI_UX §AUDIO FEEDBACK — SFX LEVELS (User 2026-09-29): each cue's own level, fitted by tools/qa-sfx-mix.cjs so every cue
   sits within 1.5 dB of its tier's target as a phone speaker plays it (100 ms peak, nothing under 300 Hz: result -19 /
   decision -21 / action -25 / utility -29 / rapid repeat -31) and clears the music it is heard over. Round 4: the first
   fit counted bass a phone cannot play, so the low cues were raised until they tore; they now carry `over` / `cut` in
   their shapes. Refit after changing a cue's shape or sample. */
const LEVEL={
 /* result */ saved1:6.729,saved2:7.1,saved3:4.28,great:1.186,retreat:8.199,injury:5.195,severe:1.034,death:4.709,sealwin:6.074,sealfail:7.238,endwin:3.828,endfail:3.774,bossmajor:6.638,final:5.165,boss:4.211,collapse:9.646,
 /* decision */ order:2.759,sale:1.158,overcharge:1.159,half:1.161,refusal:1.997,purchase:1.631,support:4.365,unlock:1.518,open:2.667,close:1.517,gag:5.557,page:1.35,begin:5.733,newstore:1.422,bosscompact:9.578,rescue:4.769,
 /* action */ depart:1.26,return:0.713,gold:4.203,spend:4.191,crate:2.941,receipt:15.137,heal:4.536,fixture:18.203,rumble:17.187,clash:3.933,counter:4.493,supply:8.562,shove:10.094,
 /* utility */ button:0.711,ui:5.564,
 /* repeat */ quantity:6.357,quantset:7.962,};
const bgm={
 title:{s:.069,e:116.704,xf:.01,lufs:-13.8},
 morning:{s:9.748,e:162.88,xf:.01,lufs:-11.8},
 order:{s:.045,e:176.014,xf:.01,lufs:-12.8},
 sale:{s:.069,e:171.966,xf:.01,lufs:-12.3},
 night:{s:.055,e:168.168,xf:.01,lufs:-12.9,trim:-3},
 close:{s:.047,e:118.137,xf:.06,lufs:-12.1},
 boss:{s:9.535,e:171.492,xf:1,cross:true,lufs:-12.8},
 succ:{s:.043,e:176.741,xf:.01,lufs:-13.2},
 fail:{s:.043,e:90.696,xf:.01,lufs:-13.5}};
const bedFor={title:'morning',close:'morning',succ:'boss',fail:'boss'};
const nextOf={title:'morning',morning:'order',order:'sale',sale:'night',night:'close',close:'morning',succ:'title',fail:'title'};
const curve=f=>{const c=new Float32Array(64);for(let i=0;i<64;i++)c[i]=f(i/63*Math.PI/2);return c;};
const RISE=curve(Math.sin),FALL=curve(Math.cos);
/* Music used to be mixed a quarter as loud as the smallest button click, which is why it
   read as missing rather than as quiet. These are its design maximum now; the slider
   scales down from here.

   UI-Q114: on a real phone at BGM 100 / SFX 100 the music was still barely there, so the two
   music voices are raised toward the effects voice rather than the effects being pulled down.
   Attenuating SFX would have made the mix quieter overall and faked loud music, which the
   owner names as a FAIL. The effects voice is unchanged. */
const BGM_VOICE=.035,BGM_BASS=.044,SFX_VOICE=.035,LIMIT=-3;
/* UI-Q114 §SOFT UI / §STORE SYSTEM. `ui` is the one quiet shared click for reference and
   navigation - opening a panel, a tab, the next coach step - so those stop being silent
   without every press earning a sound of its own. `fixture` is a short double knock for
   putting a Decoration in a Slot or taking it out: deliberately not the purchase fanfare,
   because fitting something you already own is not buying it. */
/* Utility family: one quiet, short click for navigation and reference. AUDIO HIERARCHY puts it
   under every Decision cue, which is a gain, not a different idea. */
/* v2.9.11 quick patch (User 2026-09-29, UI_UX §AUDIO FEEDBACK — DISTINCT CUES): cues that mean different things no longer
   share a sound - the Decoration fixture is a wooden knock (not the FINAL clash), the SLOTH seal-break is a crack and a
   shattering glass over a low thud (not the Boss information motif or the Boss's strike), the CLOSING receipt is one short
   printer pass (not the ORDER crate). The UI click (a two-note blip) and the quantity tick (a noise tick) are new and bright,
   with their energy where the music leaves room (2 ~ 5 kHz), and apart from each other: the old recorded ones were masked
   by the music even at their tier's ceiling. */
const sfx={button:[440],ui:[1760,2217],fixture:[233,208],
 /* MATERIAL DECISION CUES. Each of these carries a recorded object; the notes here are the
    accent that sits with it, and the fallback that stands in when the sample is not loaded. */
 quantity:[2794],quantset:[2489],order:[110,164.81],sale:[523,659],refusal:[233,175],
 overcharge:[523,659],half:[523,659],support:[196,262,392],purchase:[392,523],unlock:[523,659,784],
 open:[330,392,523],close:[392,330,262],
 gold:[659,784],spend:[784,659],depart:[392,330],return:[330,392],
 /* UI-Q-v28-23 / NIGHT OUTCOME AUDIO: one family, materially different members. Every name is
    chosen from an Outcome the result object already resolved to. `rescue` is the proven-state
    accent and never plays on its own; it lands behind the Outcome cue. */
 great:[523,659,784,1047],injury:[440,392,330,262],retreat:[262,220],severe:[196,165],
 death:[147,131],rescue:[659,988],
 /* 의무실 현판: a soft rising pair - relief, not a fanfare */
 heal:[587,880],
 /* UI-Q-v28-24 / BOSS / FINAL AUDIO: one motif, two strengths. `bossmajor` and `bosscompact`
    are the same intervals - the major one fuller and longer, the compact one the short read.
    Strength belongs to the beat, never to the Boss behind it, so neither cue can name anything
    the plate has not already shown. `boss` is the seal-break decision, which is not an
    information beat, and `final` is the D30 commit. */
 bossmajor:[165,196,147],bosscompact:[165,196],boss:[1318.5,987.8,740],final:[98,123.47,146.83],
 /* v2.9.2 H5: the Final seal on the ending tape - a clear rings up out of the Boss motif's root, a failure falls
    under it. Both land on the stamp's frame with the NIGHT `hit`; neither plays anywhere else. */
 sealwin:[165,247,330,494],sealfail:[165,147],
 /* User 2026-09-29: the ending's own result cue, played as the result lands on every ending (UI_UX §AUDIO FEEDBACK — ENDING
    CUE) - a clear rises through the Boss motif's root to a held major chord; every failure (the Final lost, bankruptcy, the
    Death limit) falls through a minor line onto a low held root. Longer than a decision cue because it closes the Run. */
 endwin:[330,392,494,659,988],endfail:[330,277,220,165],
 /* v2.9.2 H3: the second and third crate of an ORDER cascade - the `order` stamp's root, short and dry */
 crate:[110],
 /* v2.9.2 H4: the CLOSING receipt prints as one pass, never a tick per row - a single dry paper
    tick, the same `order` stamp root played light and short */
 receipt:[],
 /* v2.9.9 (User 2026-09-27): the two BRICK Actions that had no cue of their own. `begin` opens a Run - a wooden knock and
    a rising G-D-G with a ringing octave, brighter than the Store Support fixture under it; `newstore` leaves the ending
    for the next store - a latch click and a short rising pair, lighter than `begin` and nothing like the falling close */
 begin:[392,587,784],newstore:[220,330],
 /* v2.9.9 H7 FINAL 교전 (UI_UX §FINAL — CLASH SCENE): one cue per landing. `rumble` the Boss card landing, `clash` a
    member's impact (a dry crack), `counter` the Boss's strike (lower and heavier), `collapse` a cleared Boss falling */
 rumble:[55],clash:[196,147],counter:[98,73],collapse:[147,110,82],
 /* v2.9.9 H7: one item landing in a member's bag - a short dry wooden tap, one per item */
 supply:[330],
 /* UI_UX §PROLOGUE scene 3: a falling wah-wah where the music cuts */
 gag:[330,311,294,247],
 /* UI_UX §PROLOGUE: a page turning; the recorded body carries it, no pitched fallback */
 page:[],
 /* UI_UX §NIGHT — SAVED BY THE SALE (User 2026-10-09): the worse verdict lands with a dull thud, the sold Item shoves it off
    with a whoosh, and in place of the Outcome cue a relief lands - fuller the further the result turned
    (1 step / 2 steps / 3 or more). Its own keys, apart from `rescue` (Insurance) and `great`. */
 shove:[],saved1:[392,494],saved2:[440,554,659],saved3:[262,330,392,523]};
/* The sample voice. The shipped name is the cue's ROLE, so swapping an asset never reaches this
   file's logic. A cue with no entry here is synthesised exactly as it always was. */
const SAMPLE_DIR='ui/assets/audio/',SAMPLE_VOICE=.55;
const sample={order:'stamp',sale:'register',overcharge:'register',
 half:'register',refusal:'refuse',support:'secure',purchase:'cart',unlock:'unlock',
 open:'shutter',close:'settle',final:'gate',button:'key',
 /* v2.9.0 TRANSACTION BEAT A4: 손님 보내기 carries a recorded utility object (door / step family) */
 depart:'door',
 /* UI_UX §PROLOGUE: a page turning - Kenney RPG Audio bookFlip2 (CC0), reports/ASSETS.md */
 page:'page',
 /* User 2026-10-09: the recorded body alone carries these; the synthesised notes and noise stay only as the fallback */
 crate:'crate',great:'great',newstore:'newstore',return:'return',severe:'severe'};
const buffers=new Map(),lastAt=new Map();
/* Fetched once, on the first unmuted sync, so a muted player downloads nothing. A failure is
   swallowed on purpose: the synthesised shape is already this cue's fallback. */
function preload(){if(loaded||!ctx||typeof fetch!=='function')return;loaded=true;
 for(const file of new Set(Object.values(sample)))
  fetch(SAMPLE_DIR+file+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject(r.status))
   .then(b=>ctx.decodeAudioData(b)).then(buf=>buffers.set(file,buf)).catch(()=>{});}
function sampleVoice(file,when,volume,bus){const buf=buffers.get(file);if(!buf)return false;
 const src=ctx.createBufferSource();src.buffer=buf;
 const g=ctx.createGain();g.gain.value=volume;src.connect(g);g.connect(bus||sfxBus||ctx.destination);
 src.start(when);return true;}
function buses(force){if(!ctx)return;
 if(!master){master=ctx.createGain();master.gain.value=1;
  /* v2.9.11 (User 2026-09-29, UI_UX §AUDIO FEEDBACK — SFX LEVELS): a limiter after the master, so cues landing together
     never clip the output. Under LIMIT it is transparent: the compressor's own make-up gain (the Web Audio spec's
     0.6 power of its full-range gain) is taken back by the gain after it. */
  const lim=ctx.createDynamicsCompressor(),back=ctx.createGain();lim.threshold.value=LIMIT;lim.knee.value=0;lim.ratio.value=20;
  lim.attack.value=.003;lim.release.value=.15;back.gain.value=10**(.6*LIMIT*(1-1/20)/20);
  master.connect(lim);lim.connect(back);back.connect(ctx.destination);
  /* and the effects lose what a phone speaker cannot play (under 120 Hz), so no cue drives the speaker with it */
  const low=ctx.createBiquadFilter();low.type='highpass';low.frequency.value=120;low.Q.value=.707;
  bgmBus=ctx.createGain();sfxBus=ctx.createGain();bgmBus.connect(master);sfxBus.connect(low);low.connect(master);force=true;}
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
function noiseVoice(when,duration,volume,spec,bus){
 if(!noiseBuf){const n=Math.floor(ctx.sampleRate*.4);noiseBuf=ctx.createBuffer(1,n,ctx.sampleRate);
  const d=noiseBuf.getChannelData(0);let seed=1;
  for(let i=0;i<n;i++){seed=(seed*1103515245+12345)&0x7fffffff;d[i]=seed/0x3fffffff-1;}}
 const src=ctx.createBufferSource();src.buffer=noiseBuf;src.loop=true;
 const f=ctx.createBiquadFilter();f.type=spec.filter||'bandpass';f.frequency.setValueAtTime(spec.hz??1200,when);f.Q.value=spec.q??1;if(spec.to)f.frequency.exponentialRampToValueAtTime(spec.to,when+duration);
 const g=ctx.createGain();g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime(volume,when+.008);g.gain.exponentialRampToValueAtTime(.0001,when+duration);
 src.connect(f);f.connect(g);g.connect(bus||sfxBus||ctx.destination);src.start(when);src.stop(when+duration+.02);}
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
/* Every cue's shape. `sampleGain` scales the recorded body, and the notes beside it are the
   synthesised accent (when `accent` is set) or the fallback the engine falls back to when the
   sample is not there. AUDIO HIERARCHY is carried by these gains alone: utility under ordinary
   action, ordinary action under a material decision.
   `repeat` is the minimum gap a cue will retrigger at, so a held or hammered control cannot
   stack itself into a harsh overlapping tone. */
const shape={
 /* utility: the quietest things in the build */
 ui:{gain:.45,dur:.045,type:'sine',step:.028,attack:.002,repeat:.04},
 button:{gain:.7,dur:.12,type:'triangle',sampleGain:.7},
 fixture:{cut:300,gain:.8,dur:.06,type:'sine',step:.1,attack:.002,noise:[{at:0,dur:.04,gain:1,hz:640,q:1.8,filter:'bandpass'},{at:.1,dur:.04,gain:.8,hz:560,q:1.8,filter:'bandpass'}]},
 /* ORDER quantity: one short bright tick, so a rapid tap is one dry tick and nothing else. Quick-set is the SAME material
    one step down, so a shortcut can never outrank the stepper it stands in for. */
 quantity:{gain:.5,dur:.02,type:'triangle',attack:.001,repeat:.045,noise:{at:0,dur:.012,gain:.45,hz:5200,q:1,filter:'highpass'}},
 quantset:{gain:.42,dur:.02,type:'triangle',attack:.001,repeat:.045,noise:{at:0,dur:.012,gain:.38,hz:4800,q:1,filter:'highpass'}},
 /* ORDER confirmation: a low knock on paper. The recorded stamp is the body; the synthesised
    paper brush and the fifth under it are the accent that makes it a commit rather than a tap. */
 order:{cut:300,gain:1.1,dur:.14,type:'square',over:[.4,.3],step:.09,attack:.003,glide:.97,sampleGain:1,accent:true,
  noise:{at:.02,dur:.11,gain:.8,hz:2600,q:.6,filter:'highpass'},duck:.5},
 /* SALE. Every price mode commits on the same register body at the same level, so no mode is
    made to sound like the correct answer; the accent is the same two notes for all three.
    v2.9.0 TRANSACTION BEAT A5 (User 2026-09-24): the modes are told apart by coin ticks only -
    1 / 2 / 3 short high pings after the register, at one level, so 150% is more coins, not a
    better sound. `ticks` is the count; everything else in the three shapes is identical (v2.9.2 H2 adds only
    바가지's first-tick offset, `tickLate` / `tickLow`). */
 sale:{gain:.7,dur:.16,type:'sine',step:.06,sampleGain:1,accent:true,duck:.35,ticks:2},
 overcharge:{gain:.7,dur:.16,type:'sine',step:.06,sampleGain:1,accent:true,duck:.35,ticks:3,tickLate:.04,tickLow:.75},
 half:{gain:.7,dur:.16,type:'sine',step:.06,sampleGain:1,accent:true,duck:.35,ticks:1},
 /* refusal: clearly not a sale, and deliberately not a failure buzzer - a short dry cancel */
 refusal:{cut:300,gain:.85,dur:.3,type:'sawtooth',over:[.3,.2],step:.13,attack:.035,glide:.93,sampleGain:1,duck:.45},
 /* STORE SUPPORT: securing a fixture into the store. Heavier than the ordinary purchase below,
    and not the same sound as either it or the unlock. */
 support:{cut:300,gain:1,dur:.3,type:'triangle',over:[.5,.3],step:.12,sampleGain:.8,accent:true,
  layer:{ratio:2,at:.2,dur:.9,gain:.26},duck:.55},
 purchase:{gain:.8,dur:.18,type:'triangle',step:.09,sampleGain:.85,accent:true,duck:.35},
 unlock:{gain:.85,dur:.2,type:'sine',step:.09,sampleGain:.9,accent:true,
  layer:{ratio:2,at:.16,dur:.7,gain:.24},duck:.4},
 /* MORNING: a latch and a shutter. CLOSING: the drawer and the page settling, which is a
    closure and not a reward - the accent falls, and nothing rings on after it. */
 open:{cut:300,gain:.7,dur:.22,type:'sine',over:[.4],step:.08,sampleGain:.95,accent:true,duck:.35},
 close:{gain:.7,dur:.2,type:'triangle',step:.085,sampleGain:.95,accent:true,
  noise:{at:.06,dur:.16,gain:.3,hz:3200,q:.8,filter:'highpass'},duck:.35},
 gold:{gain:.9,dur:.16,type:'triangle',step:.07},
 spend:{gain:.9,dur:.16,type:'triangle',step:.07},
 /* the recorded door is the body; the two notes stay as the fallback when it has not loaded */
 depart:{gain:.9,dur:.2,type:'sine',step:.1,sampleGain:.8},
 /* UI_UX §PROLOGUE scene 3: the music cuts and a falling wah-wah answers the joke */
 page:{sampleGain:1},
 gag:{cut:250,gain:.7,dur:.24,type:'square',over:[.3],step:.17,sampleGain:.8},
 return:{solo:1,gain:.95,dur:.22,type:'sine',step:.1,hit:1},
 /* NIGHT outcomes: one family, six readings. Resolution first, then how much it cost.
    v2.9.2 H1: `hit` - the first note is the stamp's landing, so it starts at once and one step
    louder; every note, interval and step is unchanged. 사망 keeps its slow restrained attack. */
 great:{solo:1,hit:1,gain:1.05,dur:.26,type:'sine',step:.09,layer:{ratio:2,at:.2,dur:1.1,gain:.32},noise:{at:.26,dur:.6,gain:.22,hz:6200,q:1,filter:'highpass'},duck:.5},
 injury:{hit:1,gain:1,dur:.11,type:'square',step:.065,attack:.005,noise:{at:0,dur:.34,gain:.4,hz:900,q:.5,filter:'bandpass'},duck:.4},
 retreat:{cut:250,hit:1,gain:1,dur:.24,type:'triangle',over:[.4,.2],step:.11,glide:.96,noise:{at:0,dur:.1,gain:.35,hz:520,q:.8},duck:.35},
 severe:{solo:1,cut:250,hit:1,gain:1.1,dur:.4,type:'sawtooth',over:[.3,.2],step:.16,attack:.04,glide:.94,noise:{at:0,dur:.28,gain:.3,hz:280,q:.7,filter:'lowpass'},duck:.5},
 /* restrained low drop: no boom, no fanfare, and the only cue allowed to be this long */
 death:{cut:200,gain:1.1,dur:1.4,type:'sine',over:[.7,.5,.3],step:.5,attack:.06,layer:{ratio:.5,at:0,dur:2,gain:.45},noise:{at:0,dur:1,gain:.2,hz:180,q:.6,filter:'lowpass'},duck:.75},
 rescue:{gain:.9,dur:.3,type:'sine',step:.09,layer:{ratio:2,at:.12,dur:.7,gain:.28},duck:.3},
 shove:{noise:[{at:0,dur:.22,gain:1.8,hz:500,to:2600,q:.9,filter:'bandpass'},{at:.16,dur:.05,gain:1,hz:1500,q:.8,filter:'bandpass'}],duck:.25},
 saved1:{hit:1,gain:.85,dur:.26,type:'sine',step:.1,attack:.01,duck:.3},
 saved2:{hit:1,gain:.9,dur:.24,type:'triangle',step:.08,layer:{ratio:2,at:.16,dur:.6,gain:.2},duck:.35},
 saved3:{hit:1,gain:.9,dur:.55,type:'triangle',step:.04,attack:.12,layer:{ratio:3,at:.32,dur:.9,gain:.35},duck:.5},
 heal:{gain:.7,dur:.22,type:'sine',step:.1,attack:.02,layer:{ratio:2,at:.1,dur:.45,gain:.18},duck:.2},
 /* Boss motif, two strengths: the major one adds the low layer and the rumble, the compact one
    is the same interval read short. D10 / D20 must stay smaller than D5 / D15 / D25. */
 bossmajor:{cut:250,gain:1.1,dur:.34,type:'sawtooth',over:[.3,.2],step:.13,attack:.03,layer:{ratio:.5,at:0,dur:1,gain:.4},noise:{at:0,dur:.45,gain:.15,hz:230,q:.6,filter:'lowpass'},duck:.55},
 bosscompact:{cut:250,gain:.75,dur:.16,type:'sawtooth',over:[.3,.2],step:.1,attack:.02,duck:.3},
 boss:{gain:.9,dur:.28,type:'triangle',step:.05,attack:.002,glide:.9,noise:[{at:0,dur:.22,gain:1,hz:4200,q:.7,filter:'highpass'},{at:.1,dur:.5,gain:.35,hz:140,q:.6,filter:'lowpass'}],duck:.6},
 /* FINAL commit: the heaviest mechanical close in the build, with the tension under it. It adds
    no information - D25 already revealed everything it stands on. */
 sealwin:{hit:1,gain:1.1,dur:.34,type:'triangle',step:.08,layer:{ratio:2,at:.24,dur:1.2,gain:.3},noise:{at:0,dur:.12,gain:.5,hz:1800,q:.7,filter:'bandpass'},duck:.6},
 sealfail:{cut:250,hit:1,gain:1,dur:.5,type:'sawtooth',over:[.3,.2],step:.2,attack:.02,glide:.95,noise:{at:0,dur:.14,gain:.45,hz:700,q:.6,filter:'bandpass'},duck:.5},
 endwin:{gain:1.15,dur:.9,type:'triangle',step:.12,attack:.01,layer:{ratio:2,at:.04,dur:1.6,gain:.34},noise:{at:.48,dur:.8,gain:.18,hz:6000,q:1,filter:'highpass'},duck:.85},
 endfail:{cut:180,gain:1.1,dur:1.1,type:'sine',over:[.4,.25],step:.26,attack:.04,glide:.985,layer:{ratio:.5,at:0,dur:2.2,gain:.5},noise:{at:0,dur:1.2,gain:.22,hz:180,q:.6,filter:'lowpass'},duck:.85},
 crate:{solo:1,cut:400,hit:1,gain:.8,dur:.07,type:'square',over:[.4,.3],step:.05,attack:.003,glide:.97,noise:{at:0,dur:.05,gain:.7,hz:2600,q:.6,filter:'highpass'},duck:.3},
 /* v2.9.2 H4: one quiet dry tick for the whole receipt body - lighter and shorter than `crate`,
    never repeated per row */
 receipt:{noise:[{at:0,dur:.13,gain:.8,hz:2300,q:1.4,filter:'bandpass'},{at:.1,dur:.02,gain:.6,hz:3600,q:2,filter:'bandpass'}],duck:.15},
 begin:{gain:.95,dur:.24,type:'triangle',step:.09,layer:{ratio:2,at:.2,dur:.8,gain:.22},
  noise:{at:0,dur:.05,gain:.4,hz:900,q:.8,filter:'bandpass'},duck:.5},
 newstore:{solo:1,gain:.8,dur:.18,type:'triangle',step:.11,glide:1.03,noise:{at:0,dur:.04,gain:.45,hz:3000,q:.7,filter:'highpass'},duck:.35},
 rumble:{cut:250,gain:1,dur:.7,type:'sine',attack:.01,noise:[{at:0,dur:.6,gain:.55,hz:150,q:.5,filter:'lowpass'},{at:0,dur:.55,gain:.8,hz:480,q:.8,filter:'bandpass'}],duck:.5},
 clash:{cut:180,hit:1,gain:.9,dur:.09,type:'square',over:[.5,.3],step:.04,attack:.002,glide:.9,noise:{at:0,dur:.08,gain:.75,hz:1800,q:.7,filter:'bandpass'},duck:.4},
 counter:{cut:180,hit:1,gain:1,dur:.16,type:'sawtooth',over:[.5,.4,.3],step:.06,attack:.003,glide:.9,noise:{at:0,dur:.14,gain:.6,hz:420,q:.6,filter:'lowpass'},duck:.45},
 supply:{hit:1,gain:.6,dur:.05,type:'square',attack:.002,noise:{at:0,dur:.04,gain:.4,hz:1500,q:.8,filter:'bandpass'},duck:.2},
 collapse:{cut:300,gain:1,dur:.4,type:'sawtooth',over:[.3,.2],step:.16,attack:.01,glide:.85,noise:{at:0,dur:.9,gain:.3,hz:300,q:.5,filter:'lowpass'},duck:.6},
 final:{cut:300,gain:1.1,dur:1,type:'sawtooth',over:[.5,.4,.3],step:.3,attack:.08,glide:.98,sampleGain:.8,accent:true,
  layer:{ratio:.5,at:0,dur:2.2,gain:.45},noise:{at:0,dur:1.4,gain:.25,hz:160,q:.5,filter:'lowpass'},duck:.8}};
/* `delay` exists for the one case Canonical allows a second cue: a NIGHT result that also
   carries proven rescue evidence plays its own Outcome first and the accent behind it. */
function play(kind='button',delay=0){if(!enabled||!ctx)return;ctx.resume().catch(()=>{});
 const notes=sfx[kind]||sfx.button,sh=shape[kind]||{},t0=ctx.currentTime+(Number(delay)||0);
 /* MIX / RUNTIME: a rapid-repeat control must not build into harsh overlapping sound */
 if(sh.repeat){if(t0-(lastAt.get(kind)||-1)<sh.repeat)return;lastAt.set(kind,t0);}
 /* the cue's own level (LEVEL): every voice of it - sample, notes, noise, ticks - goes through one gain on its way to the
    effects bus, so the cue's loudness is set in one place without touching its timbre */
 /* `cut`: a bass-heavy cue's own low cut - what a phone cannot play is what made it boom and tear once it was brought up to
    its tier (User 2026-09-29, SFX LEVELS); the body above it, and `over`, carry the cue */
 const out=ctx.createGain();out.gain.value=LEVEL[kind]??1;let to=sfxBus;
 if(sh.cut){to=ctx.createBiquadFilter();to.type='highpass';to.frequency.value=sh.cut;to.Q.value=.707;to.connect(sfxBus);}
 out.connect(to);
 const file=sample[kind];
 const body=file?sampleVoice(file,t0,SAMPLE_VOICE*(sh.sampleGain??1),out):false;
 /* The notes are the accent when a recorded body carried the cue, and the whole cue when it
    did not - so a cue is never silent because a file has not arrived yet. */
 if(!body||sh.accent)notes.forEach((hz,i)=>{const at=t0+i*(sh.step??.07),hit=sh.hit&&!i;
  tone(hz,at,sh.dur??.16,SFX_VOICE*(sh.gain??1)*(hit?1.3:1),sh.type||'triangle',out,hit?{...sh,attack:.002}:sh);
  /* `over`: the note's 2nd, 3rd, 4th ... harmonics at these gains, on the note's own envelope - a low note a phone speaker
     cannot play is heard through them at the same pitch (User 2026-09-29, SFX LEVELS) */
  if(sh.over)sh.over.forEach((g,k)=>g&&tone(hz*(k+2),at,sh.dur??.16,SFX_VOICE*(sh.gain??1)*(hit?1.3:1)*g,'sine',out,hit?{...sh,attack:.002}:sh));
  if(sh.layer)tone(hz*sh.layer.ratio,at+(sh.layer.at??.06),sh.layer.dur??.5,SFX_VOICE*(sh.gain??1)*sh.layer.gain,sh.layer.type||'sine',out);});
 if(!(body&&sh.solo))for(const nz of [].concat(sh.noise||[]))noiseVoice(t0+(nz.at??0),nz.dur??.09,SFX_VOICE*(nz.gain??1),nz,out);
 /* coin ticks: the same ping, the same level, only the count differs between price modes. v2.9.2 H2: the first tick is
    the register's impact (x1.3, like `hit`); 바가지's run starts `tickLate` later on a lower first tick (`tickLow`) - the
    whole run moves, so the 70 ms spacing that states the count is kept. */
 if(sh.ticks)for(let i=0;i<sh.ticks;i++)tone(i?2637:2637*(sh.tickLow??1),t0+.14+(sh.tickLate??0)+i*.07,.04,SFX_VOICE*.5*(i?1:1.3),'sine',out,{attack:.002});
 if(sh.duck)duck(t0,sh.duck);}
let swapEnd=0,music=null,pending='',decoded={key:'',buf:null},ahead={key:'',bytes:null};const resumeAt={};
function bgmDecode(bytes){const Off=window.OfflineAudioContext||window.webkitOfflineAudioContext;let dc=ctx;
 try{if(Off)dc=new Off(2,1,BGM_RATE);}catch(e){dc=ctx;}
 return new Promise((ok,no)=>{const p=dc.decodeAudioData(bytes,ok,no);if(p&&p.catch)p.catch(no);});}
const bgmFetch=key=>fetch(BGM_DIR+key+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject(r.status));
function bgmLoad(key){if(decoded.key===key)return Promise.resolve(decoded.buf);
 const bytes=ahead.key===key&&ahead.bytes?ahead.bytes:bgmFetch(key);ahead={key:'',bytes:null};
 return bytes.then(bgmDecode).then(buf=>{decoded={key,buf};return buf;});}
/* the next phase's file, fetched while this one plays; a failed fetch is dropped, the phase change fetches again */
function bgmAhead(key){const k=nextOf[key];if(!k||ahead.key===k||typeof fetch!=='function')return;
 const bytes=bgmFetch(k);ahead={key:k,bytes};bytes.catch(()=>{if(ahead.bytes===bytes)ahead={key:'',bytes:null};});}
/* UI_UX §PROLOGUE: the Boss track is fetched and decoded as the prologue opens, so turning the sound on in scene 1 starts the music at once */
function bgmPrime(key){if(!bgm[key]||decoded.key===key||typeof fetch!=='function')return;bgmLoad(key).catch(()=>{});}
/* One pass from `from` to e. Scheduled on the audio clock; the next pass is queued 2 s ahead of the join. */
function bgmPass(m,at,from,fadeIn){const t=bgm[m.key],src=ctx.createBufferSource(),g=ctx.createGain();
 src.buffer=m.buf;src.connect(g);g.connect(m.out);
 g.gain.setValueCurveAtTime(RISE,at,fadeIn);
 const end=at+(t.e-from);g.gain.setValueCurveAtTime(FALL,end,t.xf);
 src.start(at,from);src.stop(end+t.xf+.05);
 m.passes.push({at,from});if(m.passes.length>2)m.passes.shift();m.srcs.push(src);src.onended=()=>{const i=m.srcs.indexOf(src);if(i>=0)m.srcs.splice(i,1);};
 clearTimeout(m.timer);
 m.timer=setTimeout(()=>{if(music===m)bgmPass(m,end,t.s,t.cross?t.xf:.005);},Math.max(0,(end-ctx.currentTime-2)*1000));}
function bgmStart(key,buf){const t=bgm[key],now=ctx.currentTime,at=Math.max(now,swapEnd),out=ctx.createGain(),
 full=Math.pow(10,(BGM_LUFS-t.lufs+(t.trim||0))/20);
 out.gain.setValueAtTime(0,now);out.gain.setValueAtTime(0,at);
 for(let i=1;i<=8;i++)out.gain.linearRampToValueAtTime(full*(i/8)**2,at+BGM_IN*i/8);out.connect(bgmBus);
 const m={key,buf,out,srcs:[],timer:null,passes:[]};music=m;
 let from=resumeAt[key];if(!(from>=t.s&&from<t.e))from=t.s;delete resumeAt[key];
 bgmPass(m,at+.02,from,.005);}
/* `keep` remembers where the loop was, so hiding the page or muting resumes the track rather than restarting it.
   A phase change starts the next track from its own loop start. */
function bgmStop(fade,keep){const m=music;if(!m||!ctx)return;music=null;clearTimeout(m.timer);const now=ctx.currentTime;swapEnd=now+fade;
 /* the pass playing now - the next one may already be queued for the join */
 const cur=m.passes.filter(q=>q.at<=now).pop();
 if(keep&&cur){const t=bgm[m.key];let p=cur.from+(now-cur.at);if(p>=t.e)p=t.s+(p-t.e);resumeAt[m.key]=p;}
 m.out.gain.cancelScheduledValues(now);m.out.gain.setValueAtTime(m.out.gain.value,now);m.out.gain.linearRampToValueAtTime(0,now+fade);
 for(const src of m.srcs.slice()){try{src.stop(now+fade+.05);}catch(e){}}
 setTimeout(()=>{try{m.out.disconnect();}catch(e){}},(fade+.3)*1000);}
/* The synthesised bed: the fallback when a recorded track is not there. */
function bedStop(){if(timer)clearInterval(timer);timer=null;}
function bedStart(key){bedStop();beat=0;const tune=tunes[bedFor[key]||key]||tunes.morning;
 timer=setInterval(()=>{if(!enabled||document.hidden||ctx.state!=='running')return;const melody=tune.notes,hz=melody[beat%melody.length];
  const lv=tune.level??1;
  tone(hz,ctx.currentTime,tune.ms/1000*.9,BGM_VOICE*lv,tune.wave,bgmBus);
  if(beat%tune.bass===0)tone(hz/2,ctx.currentTime,tune.ms/1000*1.35,BGM_BASS*lv,tune.bassWave,bgmBus);
  if(tune.drone&&beat%4===0)tone(tune.drone,ctx.currentTime,tune.ms/1000*4.2,BGM_BASS*.7*lv,'sine',bgmBus);
  beat++;},tune.ms);}
function sync(muted,phase,settings){if(settings)mix(settings);enabled=!muted;
 if(!enabled||document.hidden){bedStop();bgmStop(.1,true);track='';pending='';return;}
 if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){enabled=false;return;}}
 buses();preload();
 const next=trackFor(phase);if(track===next)return;
 track=next;bedStop();bgmStop(next?BGM_SWAP:.06,false);if(!next){pending='';return;}
 if(!bgm[next]||typeof fetch!=='function'){bedStart(next);return;}
 pending=next;
 bgmLoad(next).then(buf=>{if(pending!==next||track!==next||!enabled)return;pending='';bgmStart(next,buf);bgmAhead(next);})
  .catch(()=>{if(pending===next&&track===next){pending='';bedStart(next);}});}
/* Coming back to the page (a call, another app) tries to resume the context at once rather than waiting for the next tap:
   iOS Safari leaves it `interrupted` (User 2026-09-29). A browser that refuses without a gesture resumes on the next tap (play). */
/* UI_UX §PROLOGUE: sound is on but the browser has not been tapped yet, so nothing can play; `restart` lets the music begin from its start on the first tap */
function locked(){return !!ctx&&ctx.state!=='running';}
function restart(){track='';bgmStop(.02,false);}
function wake(){if(ctx&&enabled&&!document.hidden&&ctx.state!=='running')ctx.resume().catch(()=>{});}
/* iOS Safari starts a context made outside a tap suspended, and `pointerdown` does not count as a gesture there: only
   `touchend` / `click` may resume it. The first such tap resumes it and plays one silent sample, which opens the output.
   The ringer switch is left at the Safari default (User 2026-09-29). */
function unlock(){if(!enabled||!ctx)return;
 if(ctx.state!=='running')ctx.resume().catch(()=>{});
 try{const b=ctx.createBuffer(1,1,22050),s=ctx.createBufferSource();s.buffer=b;s.connect(master||sfxBus);s.start(0);}catch(e){}}
if(typeof document!=='undefined')for(const ev of ['touchend','click'])document.addEventListener(ev,unlock,{capture:true,passive:true});
G.Sound={play,sync,wake,locked,restart,prime:bgmPrime,fades:{out:BGM_SWAP,in:BGM_IN},levels:LEVEL,bgmLufs:BGM_LUFS,ducks:Object.fromEntries(Object.keys(sfx).map(k=>[k,shape[k]?.duck||0])),mix,trackFor,cues:Object.keys(sfx),tracks:Object.keys(tunes),music:JSON.parse(JSON.stringify(bgm)),samples:Object.assign({},sample),defaults:{bgm:DEFAULT.bgm,sfx:DEFAULT.sfx}};
})(globalThis);
