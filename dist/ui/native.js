/* PLATFORM_RELEASE_v3.0.0: the one place the game talks to the Android app shell. Plugins are read from
   window.Capacitor.Plugins only when the shell provides them (nothing is imported), so the same files run
   unchanged in a browser, where every call here does nothing. */
(function(G){
'use strict';
const plug=name=>{try{return G.Capacitor?.Plugins?.[name]||null;}catch(e){return null;}};
const inApp=()=>{try{return !!G.Capacitor?.isNativePlatform?.();}catch(e){return false;}};
const prefs=()=>inApp()?plug('Preferences'):null;
const HYDRATE_MS=1500,CLOUD_MS=30000;
const CLOUD_OK='guild24.cloudok';
const webVibrate=()=>{try{return typeof navigator!=='undefined'&&!!navigator.vibrate&&!!matchMedia('(pointer:coarse)').matches;}catch(e){return false;}};
const okMark=()=>{try{localStorage.setItem(CLOUD_OK,'1');}catch(e){}};
let pending=null,timer=null,cloudRev=null;

try{if(inApp())document.documentElement.classList.add('in-app');}catch(e){}

G.Native={
 inApp,
 /* The save lives in localStorage while the game runs; in the app a copy is kept in the shell's own storage
    (Preferences), which survives the WebView's data being cleared. */
 put(key,value){try{prefs()?.set({key,value}).catch(()=>{});}catch(e){}},
 drop(key){try{prefs()?.remove({key}).catch(()=>{});}catch(e){}},
 /* Before the game reads its save: a key missing from localStorage is restored from Preferences. A key that is
    present is kept (it is never older than the copy) and mirrored. Never blocks the start for long. */
 hydrate(keys){
  const p=prefs();if(!p||typeof localStorage==='undefined')return Promise.resolve();
  const work=Promise.all(keys.map(async key=>{
   try{
    const have=localStorage.getItem(key);
    if(have!==null){p.set({key,value:have}).catch(()=>{});return;}
    const {value}=await p.get({key});
    if(typeof value==='string'&&value)localStorage.setItem(key,value);
   }catch(e){}
  }));
  return Promise.race([work,new Promise(r=>setTimeout(r,HYDRATE_MS))]);
 },
 /* Google Play Games Saved Games, through a native plugin named PlayGamesSaves (load / save / clear). Nothing here may block play:
    every call has a time limit and any failure is dropped. The game never uploads a copy older than the one already in the cloud. */
 cloudPull(ms){
  const c=inApp()?plug('PlayGamesSaves'):null;if(!c)return Promise.resolve(null);
  const work=(async()=>{try{const r=await c.load();okMark();
   if(r&&r.found&&typeof r.data==='string'){cloudRev=Number(r.rev)||0;return r.data;}
   if(r&&r.found===false)cloudRev=0;
  }catch(e){}return null;})();
  return Promise.race([work,new Promise(r=>setTimeout(()=>r(null),ms))]);
 },
 cloudPush(data,rev,at){
  if(!(inApp()&&plug('PlayGamesSaves')))return;
  pending={data,rev,at};if(!timer)timer=setTimeout(()=>G.Native.cloudFlush(),CLOUD_MS);
 },
 async cloudFlush(){
  clearTimeout(timer);timer=null;const c=inApp()?plug('PlayGamesSaves'):null,job=pending;pending=null;if(!c||!job)return;
  try{
   if(cloudRev===null){const r=await c.load();cloudRev=r&&r.found?Number(r.rev)||0:0;}
   if(job.rev<cloudRev)return;
   await c.save({data:job.data,rev:job.rev,at:job.at});okMark();cloudRev=job.rev;
  }catch(e){}
 },
 cloudClear(){
  pending=null;clearTimeout(timer);timer=null;
  try{const c=inApp()?plug('PlayGamesSaves'):null;if(c){cloudRev=0;c.clear().catch(()=>{});}}catch(e){}
 },
 /* True only after the plugin has answered a real load or save once, so a build whose Play Games sign-in is not set up never claims a backup. */
 cloudWorks(){try{return !!(inApp()&&plug('PlayGamesSaves'))&&localStorage.getItem(CLOUD_OK)==='1';}catch(e){return false;}},
 /* The browser's own buzz, only on a phone or tablet: desktop Chrome and Edge define navigator.vibrate and do nothing with it, so a toggle there would be a control that does not work. */
 canVibrate(){return !!(inApp()&&plug('Haptics'))||webVibrate();},
 /* One short buzz. Shell Haptics first, then the browser's own, else nothing. A browser that has not been tapped yet refuses the call, so it is skipped quietly. */
 vibrate(ms=40){
  try{const h=inApp()?plug('Haptics'):null;
   if(h){h.vibrate({duration:ms}).catch(()=>{});return;}
   if(webVibrate()&&!(navigator.userActivation&&!navigator.userActivation.hasBeenActive))navigator.vibrate(ms);}catch(e){}
 },
 /* Android Back. `handle()` closes the topmost surface and returns true; otherwise the app saves and exits. */
 onBack(handle){
  try{const a=inApp()?plug('App'):null;if(!a)return;
   a.addListener('backButton',()=>{let used=false;try{used=handle()===true;}catch(e){}
    if(!used)a.exitApp();});}catch(e){}
 }
};
})(globalThis);
