// What a QA tool waits for after it loads or reloads the page. The loading screen (`#app .boot`) stays until the art is in;
// with no Run the prologue takes its place first (UI_UX §PROLOGUE), and its 건너뛰기 ends it. A fixed short wait reads the
// loading screen, not the game. Dev-only.
//   const {ready}=require('./qa-ready.cjs'); await page.reload({waitUntil:'load'}); await ready(page);
async function ready(page,{skip=true,timeout=20000}={}){
 await page.waitForFunction(()=>!document.querySelector('#app .boot')||!!document.querySelector('[data-action="prologue-skip"]'),null,{timeout});
 if(!skip)return;
 const b=await page.$('[data-action="prologue-skip"]');if(!b)return;
 await b.click();
 await page.waitForFunction(()=>!document.querySelector('[data-action="prologue-skip"]')&&!document.querySelector('#app .boot'),null,{timeout});
}
module.exports={ready};
