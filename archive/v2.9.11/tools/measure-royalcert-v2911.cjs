// 왕도 프리미엄 인증 (royalCert) value measurement (User 2026-09-29). Measurement only: no game file changes.
// Written against main 81c50cf (60% / intent lifted / no operating cost); the chosen arm (+10%p, 45%, operating +10%) is now in
// Source (User 2026-09-29), so the two patched lines below no longer match and `verify` / `arm` stop with that error by design.
// The rule is varied in a scratch copy of dist/ in which exactly one line is parameterised; every module is loaded from
// that copy only. The card replaces the bot's own pick in the first Store Support window from DAY 10 on in which the
// bot actually buys, under the bot's own reserve (reader 380G), at the base price 320G - never an extra purchase.
//   node tools/measure-royalcert-v2911.cjs verify [runs=300]          patched copy at the current values == original dist
//   node tools/measure-royalcert-v2911.cjs arm <intentBonus|none> <commissionRate> <overheadRate> [runs=3000] <out.json>
//   intentBonus is added to the 바가지 intent (-0.16) while owned: 0.16 = current (0), 0 = removed, 0.10 = -0.06
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const REPO=path.resolve(__dirname,'..');
const FILES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const LINES=[["const flat=mode==='overcharge'&&this.has('royalCert')?0:rule.intent;",
 "const flat=mode==='overcharge'&&this.has('royalCert')?rule.intent+(D.relicParams.royalCert.intentBonus??-rule.intent):rule.intent;"],
 // operating cost: the same share-of-overheadBase rule 지역 거점점 계약 uses, from the next Day (dayFacilities); 0 when unset
 ["const base=this.overheadBase(day),hub=facilities?.includes('hub')?base*D.relicParams.hub.overheadRate:0;",
 "const base=this.overheadBase(day),hub=(facilities?.includes('hub')?base*D.relicParams.hub.overheadRate:0)+(facilities?.includes('royalCert')?base*(D.relicParams.royalCert.overheadRate||0):0);"]];
function scratchDist(){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'g24-royal-'));
 fs.cpSync(path.join(REPO,'dist'),dir,{recursive:true});
 const p=path.join(dir,'systems/shop.js');let src=fs.readFileSync(p,'utf8');
 for(const [a,b] of LINES){if(src.split(a).length!==2)throw Error('expected exactly one line in shop.js: '+a.slice(0,50));src=src.replace(a,b);}
 fs.writeFileSync(p,src);return dir;
}
function load(root){for(const f of FILES)require(path.join(root,f+'.js'));}
function summary(s){const R=s.npcs.flatMap(n=>n.records||[]),H=s.npcs.flatMap(n=>n.history||[]),rh=s.reportHistory||[];
 return {day:s.day,win:!!s.win,end:s.win?'win':/소문/.test(s.endReason||'')?'death':/자금/.test(s.endReason||'')?'bankrupt':'final',
  bal29:(rh.find(x=>x.day===29)||{}).balance??null,commission:rh.reduce((a,x)=>a+(x.commission||0),0),
  over:H.filter(h=>h.mode==='overcharge').length,deaths:R.filter(r=>r.outcome==='사망').length};}
const mode=process.argv[2];
if(mode==='verify'){
 const runs=Number(process.argv[3]||300);const {execFileSync}=require('node:child_process');
 const a=JSON.parse(execFileSync(process.execPath,[__filename,'__raw','orig',String(runs)],{maxBuffer:1<<28}).toString());
 const b=JSON.parse(execFileSync(process.execPath,[__filename,'__raw','copy',String(runs)],{maxBuffer:1<<28}).toString());
 const same=a.filter((r,i)=>JSON.stringify(r)===JSON.stringify(b[i])).length;
 console.log(`verify: patched copy (intentBonus unset = current rule) vs original dist, ${runs} runs: identical ${same}/${runs}`);
 process.exitCode=same===runs?0:1;return;
}
if(mode==='__raw'){ // child for verify: plain bot, no card forcing
 const root=process.argv[3]==='copy'?scratchDist():path.join(REPO,'dist');load(root);
 if(process.argv[3]==='copy'&&!(Game.prototype.interest.toString().includes('intentBonus')&&Game.prototype.expectedOperatingCost.toString().includes('royalCert')))throw Error('scratch copy not loaded');
 const rows=[],end=Game.prototype.end;Game.prototype.end=function(w,why){const s=this.run,r=end.call(this,w,why);rows.push(summary(s));return r;};
 Debug.simulate(Number(process.argv[4]),'reader',null,'adaptive','hybrid',{});process.stdout.write(JSON.stringify(rows));return;
}
if(mode!=='arm')throw Error('usage: verify | arm <intentBonus|none> <commissionRate> <overheadRate> [runs] <out.json>');
const bonusArg=process.argv[3],rate=Number(process.argv[4]),overhead=Number(process.argv[5]),runs=Number(process.argv[6]||3000),out=process.argv[7];
const NONE=bonusArg==='none',PRICE=320,RESERVE=380;
load(scratchDist());if(!(Game.prototype.interest.toString().includes('intentBonus')&&Game.prototype.expectedOperatingCost.toString().includes('royalCert')))throw Error('scratch copy not loaded');
if(!NONE){DATA.relicParams.royalCert.intentBonus=Number(bonusArg);DATA.relicParams.royalCert.commissionRate=rate;DATA.relicParams.royalCert.overheadRate=overhead;}
const P=Game.prototype;let replaced=0,charged=0,ownSkips=0;const offers={n:0,accepted:0,chance:0,chanceNoCard:0};
if(!NONE){const br=P.buyRelic;P.buyRelic=function(id){const s=this.run,w=s.relicWindow;
  if(this.has('royalCert')&&id==='royalCert'){w.purchased=id;ownSkips++;return;}   // already owned: the window is spent, nothing bought
  if(!this.has('royalCert')&&w&&w.milestoneDay>=10&&s.money-PRICE>=RESERVE&&s.facilities.filter(x=>DATA.relicBy[x]).length<7){
   s.money-=PRICE;s.daily.relicSpent=(s.daily.relicSpent||0)+PRICE;s.stats.relicSpent=(s.stats.relicSpent||0)+PRICE;s.facilities.push('royalCert');w.purchased='royalCert';replaced++;charged+=PRICE;return;}
  return br.apply(this,arguments);};}
// 바가지 acceptance: every overcharge offer the bot makes while owning the card, and the same offer's chance without the card
const sell=P.sell;P.sell=function(stockId,m='full'){
 if(m==='overcharge'&&this.has('royalCert')){const s=this.run,n=this.current(),u=s.inventory.find(x=>x.id===stockId),it=u&&DATA.itemBy[u.item];
  if(n&&it&&!s.event?.effects.noOvercharge){const c=this.interest(n,it,'overcharge').chance;const i=s.facilities.indexOf('royalCert');s.facilities.splice(i,1);
   const c0=this.interest(n,it,'overcharge').chance;s.facilities.splice(i,0,'royalCert');offers.n++;offers.chance+=c;offers.chanceNoCard+=c0;
   const before=n.pack.length,r=sell.apply(this,arguments);if(n.pack.length>before)offers.accepted++;return r;}}
 return sell.apply(this,arguments);};
const rows=[],end=P.end;P.end=function(w,why){const s=this.run,r=end.call(this,w,why);const m=summary(s);m.owned=s.facilities.includes('royalCert');rows.push(m);return r;};
Debug.simulate(runs,'reader',null,'adaptive','hybrid',{});
const meta={arm:NONE?'none':{intentBonus:Number(bonusArg),commissionRate:rate,overheadRate:overhead},runs,replaced,charged,chargedCheck:charged===replaced*PRICE,ownSkips,
 offers:{n:offers.n,acceptedRate:offers.n?offers.accepted/offers.n:null,meanChance:offers.n?offers.chance/offers.n:null,meanChanceNoCard:offers.n?offers.chanceNoCard/offers.n:null}};
fs.writeFileSync(out,JSON.stringify({meta,rows}));console.error(JSON.stringify(meta));
