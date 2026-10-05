// Narrow D30 presentation fixtures: candidate Wallet, individual Hazard meters, one actual paid transfer.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process'),{chromium}=require('playwright'),{ready}=require('./qa-ready.cjs');
const out=path.resolve(process.argv[2]||'reports/ui/final-feedback'),before=process.argv.includes('--before'),port=5311;
const families=(process.argv.find(x=>x.startsWith('--families='))?.slice(11)||'spider,slime').split(',');
let checks=0;const check=(ok,message)=>{if(!before){assert.ok(ok,message);checks++;}};
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const server=spawn(process.execPath,[path.join(__dirname,'preview.cjs'),'--port',String(port)],{stdio:['ignore','pipe','inherit']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('preview timeout')),8000);server.on('error',reject);server.stdout.on('data',d=>{if(String(d).includes('ready')){clearTimeout(timer);resolve();}});});
 let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.QA_CHROMIUM||chromium.executablePath()});
  for(const width of (process.argv.includes('--phones')?[360,390,430,1280]:[390,1280])){
   const ctx=await browser.newContext({viewport:{width,height:width<1024?780:880},locale:'ko-KR',reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];
   p.on('pageerror',e=>errors.push(e.message));
   if(before)for(const file of ['ui/app.js','ui/ui.css']){
    const body=execFileSync('git',['show','a23a47be:dist/'+file],{encoding:'utf8'});
    await p.route('**/'+file,r=>r.fulfill({body,contentType:file.endsWith('.css')?'text/css':'text/javascript'}));
   }
   await p.goto(`http://127.0.0.1:${port}`);await ready(p);
   await p.evaluate(families=>{
    const g=Guild24.game;g.autosave=false;g.start('final-feedback');g.account.tutorial.skipped=true;g.buyRelic(g.run.relicWindow.candidateIds[0]);
    const s=g.run;s.npcs.forEach((n,i)=>{n.alive=true;n.introduced=i<3;n.recovery=0;n.injury=i===1?1:0;n.fatigue=i===1?15:0;n.traits=[];n.pack=[];n.money=[480,160,220][i]||100;n.level=12;n.stats={combat:75,survival:30+i*35,mobility:25+i*35,spirit:20+i*35};});
    s.day=30;g.morning();s.bossId='WRATH';s.facilities=[];s.relicWindow.focusedRevealSeen=true;Object.keys(s.bossReveal).forEach(k=>{if(k.endsWith('Seen'))s.bossReveal[k]=true;});s.bossReveal.familySeen=true;
    const d=s.dungeons[0];d.families=families;d.familyNames=d.families.map(f=>DATA.dungeonBy[f].name);d.hazards=[...new Set(d.families.flatMap(f=>DATA.familyTiers[f][1]))];s.final=d;
    s.inventory=[];const item=DATA.items.find(it=>(it.effects[d.hazards[0]]||0)>0&&!g.finalNoEffect(it.id));g.stock(item.id,1);window.__finalFeedbackItem=item.id;Guild24.render();
   },families);
   if(await p.locator('#modal-root [data-action="dismiss"]').count())await p.locator('#modal-root [data-action="dismiss"]').first().click();
   await p.locator('[data-action="final-roster"]').click();
   check(await p.locator('.final-candidate-wallet').count()===3,'last-order candidates show Wallet');
   await p.screenshot({path:path.join(out,`candidates-${width}.png`)});
   await p.locator('#modal-root [data-action="dismiss"]').first().click();
   await p.locator('[data-action="final-ordered"]').click();
   check(await p.locator('.final-candidate-wallet').count()===3,'selection candidates show Wallet');
   await p.screenshot({path:path.join(out,`selection-${width}.png`)});
   await p.evaluate(()=>{const g=Guild24.game;g.finalEligible().slice(0,3).forEach(n=>g.selectFinal(n.id));Guild24.render();});
   await p.locator('[data-action="final-commit"]').click();
   const meterTruth=()=>p.evaluate(()=>{
    const g=Guild24.game,t=g.finalPreRoll();
    return t.team.every((n,i)=>{
     const el=document.querySelector('.final-member[data-id="'+n.id+'"]');
     return [...el.querySelectorAll('.env-row')].length===t.preparations[i].hazards.length&&t.preparations[i].hazards.every((h,j)=>{
      const row=el.querySelectorAll('.env-row')[j],want=Math.max(0,Math.floor(h.defense+1e-9))+'/'+Presentation.hazardNeed(h.key,t.d);
      return row.querySelector('i').textContent===DATA.hazards[h.key]&&row.querySelector('b').textContent===want;
     });
    });
   });
   check(await meterTruth(),'each participant meter reads the actual Final preparation');
   check(await p.evaluate(()=>[...document.querySelectorAll('.env-family')].every(g=>{const own=DATA.familyTiers[g.dataset.family]?.[1]||[];return [...g.querySelectorAll('.env-row i')].every(e=>own.some(h=>DATA.hazards[h]===e.textContent));})),'each row groups Hazards from its own Family');
   check(await p.evaluate(()=>[...document.querySelectorAll('.env-family')].every(g=>{const rows=[...g.querySelectorAll('.env-row')];return rows.every(e=>Math.abs(e.getBoundingClientRect().top-rows[0].getBoundingClientRect().top)<1);})), 'same Family Hazards share a horizontal line');
   check(await p.locator('.final-forecast .top').count()===1,'one party forecast');
   await p.locator('.party-head').scrollIntoViewIfNeeded();
   await p.screenshot({path:path.join(out,`preparation-${width}.png`)});
   await p.locator('.final-team').screenshot({path:path.join(out,`party-${width}.png`)});
   const initial=await p.locator('.final-member').first().innerText(),wallet=await p.evaluate(()=>{const g=Guild24.game,n=g.run.npcs.find(n=>n.id===g.run.team[0]);return n.money;});
   const item=await p.evaluate(()=>window.__finalFeedbackItem);
   await p.locator('.goods [data-action="select"]').first().click();
   check((await p.locator('.final-member').first().innerText())===initial,'focused unsold item does not change committed meters');
   await p.locator('[data-action="supply"]').click();
   check(await meterTruth(),'paid transfer updates meters to actual Final preparation');
   check((await p.locator('.final-member').first().innerText())!==initial,'committed preparation visibly changes');
   check(await p.evaluate(({wallet,item})=>{const g=Guild24.game,n=g.run.npcs.find(n=>n.id===g.run.team[0]);return n.money===wallet-g.finalPrice(item)&&n.pack.includes(item);},{wallet,item}),'fixed-price transfer really debits Wallet and fills Bag');
   await p.locator('.final-team').screenshot({path:path.join(out,`party-supplied-${width}.png`)});
   check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');
   check(await p.evaluate(()=>{
    const lum=c=>{const a=c.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});return a[0]*.2126+a[1]*.7152+a[2]*.0722;};
    return [...document.querySelectorAll('.final-environments i,.final-environments small,.env-caption')].every(e=>{const fg=lum(getComputedStyle(e).color),bg=lum(getComputedStyle(e.closest('.final-member')).backgroundColor);return(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)>=4.5;});
   }),'individual meter labels meet 4.5:1 contrast');
   check(!errors.length,'no affected runtime errors');
   await ctx.close();
  }
 }finally{if(browser)await browser.close();server.kill();}
 console.log(`${before?'BEFORE':'PASS'} Final feedback: ${checks} checks; ${out}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
