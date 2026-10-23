(function(G){
/* PLATFORM_RELEASE anonymous run statistics: when a Run ends (or is abandoned) one summary of the numbers goes to the
   developer's collector, so balance can be read off real play as well as off the bots. No name, account, device id,
   location or screen log is ever in it; the only id is a random code made on this device. The Player's switch is
   account.settings.stats (on unless set false). With no endpoint, or outside the Android app (the web build sends nothing), nothing is sent. Failed sends wait in a short queue
   and go out at the next launch or with the next report; the collector drops a repeated rid. */
const QUEUE='guild24.stats.queue',MAX_QUEUE=3;
const D=()=>G.DATA;
const on=a=>!!a&&a.settings?.stats!==false;
const r2=x=>Math.round(x*100)/100;
function anon(a){if(!a.anonId){let id='';try{const b=new Uint8Array(8);crypto.getRandomValues(b);id=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');}catch(e){id=Math.random().toString(16).slice(2,18);}a.anonId=id;}return a.anonId;}
const depLv=x=>{const m=(x.changes||[]).map(c=>/^Lv\.(\d+) → Lv\.(\d+)$/.exec(c)).find(Boolean);return m?+m[1]:x.level;};
const rec=x=>({d:x.day,g:x.dungeon,o:x.outcome,lv0:depLv(x),lv:x.level,xp:x.xp,loot:x.loot,sb:x.storeBonus||undefined,it:x.items?.length?x.items:undefined,br:x.bareRatio!=null?r2(x.bareRatio):undefined,gm:x.greatMargin!=null?r2(x.greatMargin):undefined,
 inj:x.departedInjured?1:undefined,wea:x.departedWeary?1:undefined,fb:x.beforeFatigue||undefined,ff:x.finalFatigue,hp:x.heroProof?.outcome?1:undefined,ch:x.combatHero?1:undefined,res:x.rescued?1:undefined,
 av:x.avoidedDeath?1:undefined,ev:x.events?.length?x.events:undefined,cause:x.cause||undefined,deep:x.deep?1:undefined});
const npc=n=>({job:n.job,rar:n.rarity,lv:n.level,pot:n.potential,tr:n.traits,st:n.stats,eq:n.equipment&&{power:n.equipment.power,tier:n.equipment.tier},al:n.alive?1:0,intro:n.introduced?1:0,loy:n.loyalty,inj:n.injury||undefined,fat:n.fatigue,money:n.money,rec:(n.records||[]).map(rec)});
const MODES={full:0,half:1,overcharge:2};
/* per Day: [count, gold] for 제값 / 반값 / 바가지, read off the adventurers' purchase history */
function salesByDay(npcs){const out={};for(const n of npcs)for(const h of n.history||[]){if(!(h.mode in MODES)||!(h.paid>0))continue;const d=out[h.day]??=[0,0,0,0,0,0],i=MODES[h.mode]*2;d[i]++;d[i+1]+=h.paid;}return out;}
function build(game,kind){
 const s=game.run,a=game.account;if(!s)return null;anon(a);const sbd=salesByDay(s.npcs);
 const B=G.GUILD24_BUILD||{};
 return{schema:1,rid:s.seed+'-'+a.anonId.slice(0,6),at:new Date().toISOString(),kind,build:B.version,commit:B.commit,app:!!G.Native?.inApp?.(),anon:a.anonId,
  account:{runs:a.runs,wins:a.wins,bestDay:a.bestDay,bestSales:a.bestSales,asc:a.ascension,decos:D().decorations.filter(d=>G.Meta.decorationOwned(a,d.id)).map(d=>d.id),discovered:(a.discovered||[]).length},
  run:{seed:s.seed,day:s.day,phase:s.phase,win:!!s.win,end:s.endReason,first:!!s.firstRun,asc:s.ascension||0,contract:s.contract,loadout:s.loadout,money:s.money,stats:s.stats,boss:s.bossId,
   supports:s.facilities,rerolls:s.rerollCount||0,playMs:s.playMs||0,relics:(s.relicHistory||[]).concat(s.relicWindow?[s.relicWindow]:[]).map(w=>({d:w.milestoneDay,c:w.candidateIds.map(id=>[id,D().relicBy[id]?.rarity]),p:w.purchased,rr:w.rerolls||undefined,x:w.seen?.length?w.seen.map(ids=>ids.map(id=>[id,D().relicBy[id]?.rarity])):undefined})),
   events:s.eventLog,settlement:s.settlement,final:s.finalReport?{cleared:s.finalReport.cleared,families:s.finalReport.families,revenue:s.finalLock?.revenue,power:s.final?.power,members:s.finalReport.members.map(m=>({job:m.job,lv:m.level,it:m.items,h:m.hazard}))}:undefined,
   days:(s.reportHistory||[]).map(h=>({d:h.day,rev:h.revenue,sp:h.spent,op:h.operating,cogs:h.cogs,sales:h.sales,waste:h.waste,bal:h.balance,rr:h.rerolls,g:h.gates,gs:h.greatSuccess,disc:h.discount,oc:h.overcharge,ref:h.refuse||undefined,refP:h.refusePrice||undefined,m:sbd[h.day],pm:h.playMs||undefined,nov:h.noVisitors?1:undefined}))},
  npcs:s.npcs.map(npc)};
}
const readQ=()=>{try{return JSON.parse(localStorage.getItem(QUEUE)||'[]');}catch(e){return[];}};
const writeQ=q=>{try{localStorage.setItem(QUEUE,JSON.stringify(q.slice(-MAX_QUEUE)));}catch(e){}};
let busy=false;
/* the queue is read again around every send, so a report added while one is in flight stays queued and goes out after it */
async function flush(){
 if(!T.endpoint||busy||typeof fetch!=='function')return;
 busy=true;
 try{for(let body;(body=readQ()[0])!==undefined;){const r=await fetch(T.endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body});if(!r.ok)break;
  const q=readQ(),i=q.indexOf(body);if(i>=0)q.splice(i,1);writeQ(q);}}
 catch(e){}
 busy=false;
}
function report(game,kind){
 try{
  if(!T.endpoint||!G.Native?.inApp?.()||!on(game.account))return;
  anon(game.account);
  const p=build(game,kind);if(!p)return;
  const q=readQ();q.push(JSON.stringify(p));writeQ(q);flush();
 }catch(e){}
}
/* the collector's address (tools/stats-collector/README-cloudflare.md) */
const T=G.Telemetry={endpoint:'https://guild24-stats.f-ai-shion-lab.workers.dev/',on,build,report,flush};
})(globalThis);
