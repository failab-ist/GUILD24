/* PLATFORM_RELEASE_v3.0.0: the one place the game talks to the Android app shell. Plugins are read from
   window.Capacitor.Plugins only when the shell provides them (nothing is imported), so the same files run
   unchanged in a browser, where every call here does nothing. */
(function(G){
'use strict';
const plug=name=>{try{return G.Capacitor?.Plugins?.[name]||null;}catch(e){return null;}};
const inApp=()=>{try{return !!G.Capacitor?.isNativePlatform?.();}catch(e){return false;}};
const prefs=()=>inApp()?plug('Preferences'):null;
const HYDRATE_MS=1500;

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
 canVibrate(){return !!(inApp()&&plug('Haptics'))||(typeof navigator!=='undefined'&&!!navigator.vibrate);},
 /* One short buzz. Shell Haptics first, then the browser's own, else nothing. */
 vibrate(ms=40){
  try{const h=inApp()?plug('Haptics'):null;
   if(h){h.vibrate({duration:ms}).catch(()=>{});return;}
   if(typeof navigator!=='undefined'&&navigator.vibrate)navigator.vibrate(ms);}catch(e){}
 },
 /* Android Back. `handle()` closes the topmost surface and returns true; otherwise the app saves and exits. */
 onBack(handle){
  try{const a=inApp()?plug('App'):null;if(!a)return;
   a.addListener('backButton',()=>{let used=false;try{used=handle()===true;}catch(e){}
    if(!used)a.exitApp();});}catch(e){}
 }
};
})(globalThis);
