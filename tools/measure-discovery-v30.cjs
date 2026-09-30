// v3.0 prep measurement (User 2026-09-30, rubric 2판 driver 4 · 3): one account carried across successive Runs with the first-run lessons ON.
// Which Run / Day each NIGHT discovery rule (Copy.learned) first acts, how many new rules a 2nd / 3rd Run still finds, how often the END
// replay line has something to say, and what Events the first Run meets on DAY 1~3. Measurement only, nothing written to Canonical.
//   node tools/measure-discovery-v30.cjs [runsEach=5] [accounts=300] [policy=balanced|reader]
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(ROOT,'dist',f+'.js'));
const T=Number(process.argv[3]||300),R=Number(process.argv[2]||5),policy=process.argv[4]||'balanced';
const accounts=Array.from({length:T},()=>Meta.fresh()),P=Game.prototype,rows=[];
const start=P.start;P.start=function(seed){const i=Number(String(seed).split('-').pop()),t=i%T;this.account=accounts[t];this.lessons=true;this._before=(this.account.discoveries||[]).filter(x=>/^learn-/.test(x.id)).map(x=>x.id);this._ev=[];return start.call(this,seed);};
const me=P.morningEvent;P.morningEvent=function(){const r=me.apply(this,arguments);if(this.run.event)this._ev.push([this.run.day,this.run.event.id]);return r;};
const end=P.end;P.end=function(w,why){const i=Number(String(this.run.seed).split('-').pop()),t=i%T,r=Math.floor(i/T);const before=this._before||[];
 const ret=end.call(this,w,why);const s=this.run;const now=(this.account.discoveries||[]).filter(x=>/^learn-/.test(x.id));
 rows.push({t,r,day:s.day,win:!!s.win,reach:!!s.settlement?.reach,best:s.bestBefore>0&&s.day>s.bestBefore,firstRun:!!s.firstRun,newLearn:now.filter(x=>!before.includes(x.id)).map(x=>[x.id.slice(6),x.day]),ev:this._ev||[]});return ret;};
Debug.simulate(T*R,policy,null,'adaptive','hybrid',{});
const keys=Copy.learned.map(([k])=>k),first={};for(const k of keys)first[k]=[];
for(let t=0;t<T;t++){const mine=rows.filter(x=>x.t===t).sort((a,b)=>a.r-b.r);for(const k of keys){let hit=null;for(const x of mine){const f=x.newLearn.find(y=>y[0]===k);if(f){hit={run:x.r+1,day:f[1]};break;}}first[k].push(hit);}}
const p=(a,q)=>{const v=a.filter(x=>x!=null).sort((x,y)=>x-y);return v.length?v[Math.floor((v.length-1)*q)]:null;};
const out={policy,accounts:T,runsEach:R,rules:{}};
for(const k of keys){const h=first[k];const byRun1=h.filter(x=>x&&x.run===1).length,byRun3=h.filter(x=>x&&x.run<=3).length,ever=h.filter(Boolean).length;
 out.rules[k]={inRun1:+(100*byRun1/T).toFixed(1),byRun3:+(100*byRun3/T).toFixed(1),within5:+(100*ever/T).toFixed(1),run1DayP50:p(h.filter(x=>x&&x.run===1).map(x=>x.day),.5)};}
const r1=rows.filter(x=>x.r===0);out.firstRun={n:r1.length,lessonsOn:r1.filter(x=>x.firstRun).length,dayP50:p(r1.map(x=>x.day),.5),endNudgeLine:+(100*r1.filter(x=>x.reach||x.best).length/r1.length).toFixed(1),reach500:+(100*r1.filter(x=>x.reach).length/r1.length).toFixed(1),
 learnCountP50:p(r1.map(x=>x.newLearn.length),.5),learnCountMean:+(r1.reduce((a,x)=>a+x.newLearn.length,0)/r1.length).toFixed(2),zeroLearn:+(100*r1.filter(x=>x.newLearn.length===0).length/r1.length).toFixed(1)};
const r2=rows.filter(x=>x.r===1);out.secondRun={endNudgeLine:+(100*r2.filter(x=>x.reach||x.best).length/r2.length).toFixed(1),bestLine:+(100*r2.filter(x=>x.best).length/r2.length).toFixed(1),newLearnMean:+(r2.reduce((a,x)=>a+x.newLearn.length,0)/r2.length).toFixed(2)};
const r3=rows.filter(x=>x.r===2);out.thirdRun={endNudgeLine:+(100*r3.filter(x=>x.reach||x.best).length/r3.length).toFixed(1),newLearnMean:+(r3.reduce((a,x)=>a+x.newLearn.length,0)/r3.length).toFixed(2)};
const STORE=new Set(['oneplus','halfPrice','audit','wastecover','nightshift','hqlogistics','gearaid','ordercap','clearance','nearexpiry','fridgebreak','latedelivery','logistics','noreroll','pricewatch','nightmarket']);
const e3=r1.map(x=>x.ev.filter(e=>e[1]&&e[0]<=3));out.firstRunEventsD1to3={anyEvent:+(100*e3.filter(a=>a.length).length/r1.length).toFixed(1),storeFlavored:+(100*e3.filter(a=>a.some(e=>STORE.has(e[1]))).length/r1.length).toFixed(1),eventsPerRunD1to3:+(e3.reduce((a,b)=>a+b.length,0)/r1.length).toFixed(2),d1Event:+(100*r1.filter(x=>x.ev.some(e=>e[0]===1)).length/r1.length).toFixed(1)};
console.log(JSON.stringify(out,null,1));
