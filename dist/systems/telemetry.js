(function(G){
/* PLATFORM_RELEASE anonymous run statistics: when a Run ends (or is abandoned) one summary of the numbers goes to the
   developer's collector, so balance can be read off real play as well as off the bots. No name, account, device id,
   location or screen log is ever in it; the only id is a random code made on this device. The Player's switch is
   account.settings.stats (on unless set false). With no endpoint, or outside the Android app and the web demo (the full web build sends nothing), nothing is sent. Failed sends wait in a short queue
   and go out at the next launch or with the next report; the collector drops a repeated rid. */
const QUEUE='guild24.stats.queue',MAX_QUEUE=12,PART_DAYS=3,LIVE='guild24.stats.live';
const D=()=>G.DATA;
const on=a=>!!a&&a.settings?.stats!==false;
/* Where reports go out: the Android app, and the web demo (demo/demo.js, User 2026-10-22), whose reports carry demo:1 */
const demo=()=>!!G.GUILD24_DEMO,sends=()=>!!G.Native?.inApp?.()||demo();
const r3=x=>Math.round(x*1000)/1000;
function anon(a){if(!a.anonId){let id='';try{const b=new Uint8Array(8);crypto.getRandomValues(b);id=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');}catch(e){id=Math.random().toString(16).slice(2,18);}a.anonId=id;}return a.anonId;}
const depLv=x=>{const m=(x.changes||[]).map(c=>/^Lv\.(\d+) → Lv\.(\d+)$/.exec(c)).find(Boolean);return m?+m[1]:x.level;};
const rec=x=>({d:x.day,g:x.dungeon,dn:x.dungeonName,o:x.outcome,lv0:depLv(x),lv:x.level,xp:x.xp,loot:x.loot,sb:x.storeBonus||undefined,it:x.items?.length?x.items:undefined,br:x.bareRatio!=null?r3(x.bareRatio):undefined,gm:x.greatMargin!=null?r3(x.greatMargin):undefined,
 inj:x.departedInjured?1:undefined,wea:x.departedWeary?1:undefined,fb:x.beforeFatigue||undefined,ff:x.finalFatigue,hp:x.heroProof?.outcome?1:undefined,hw:x.heroProof?.outcome?.worse||undefined,ch:x.combatHero?1:undefined,res:x.rescued?1:undefined,
 av:x.avoidedDeath?1:undefined,ev:x.events?.length?x.events:undefined,cause:x.cause||undefined,deep:x.deep?1:undefined});
const npc=n=>({job:n.job,rar:n.rarity,lv:n.level,pot:n.potential,tr:n.traits,st:n.stats,eq:n.equipment&&{power:n.equipment.power,tier:n.equipment.tier},al:n.alive?1:0,intro:n.introduced?1:0,loy:n.loyalty,inj:n.injury||undefined,rcv:n.recovery||undefined,fat:n.fatigue,money:n.money,rec:(n.records||[]).map(rec),h:(n.history||[]).map(sale)});
const MODES={full:0,half:1,overcharge:2};
/* every sale as [day, item, mode, paid, customer's in-game wallet] - what tools/stats-check.cjs reads the discounts off (User 2026-10-23) */
const sale=h=>[h.day,h.item,MODES[h.mode]??h.mode,h.paid,h.wallet];
/* per Day: [count, gold] for 제값 / 반값 / 바가지, read off the adventurers' purchase history */
function salesByDay(npcs){const out={};for(const n of npcs)for(const h of n.history||[]){if(!(h.mode in MODES)||!(h.paid>0))continue;const d=out[h.day]??=[0,0,0,0,0,0],i=MODES[h.mode]*2;d[i]++;d[i+1]+=h.paid;}return out;}
/* BALANCE DETAIL (User 2026-10-23): what only balance analysis reads - the Day's order / sale trace and, per expedition, why the
   Bag moved it, the stat before/after and the fatigue ledger - is taken by the statistics as each Day closes and kept in its own
   store (LIVE), one write a Day, never in the save. The Run's end report carries it and clears it. */
const r2=x=>Math.round(x*100)/100;
const readLive=()=>{try{return JSON.parse(localStorage.getItem(LIVE)||'null');}catch(e){return null;}};
const writeLive=v=>{try{if(v)localStorage.setItem(LIVE,JSON.stringify(v));else localStorage.removeItem(LIVE);}catch(e){}};
const ridOf=(s,a)=>s.seed+'-'+anon(a).slice(0,6);
function detail(s,r){return{d:r.day,n:s.npcs.findIndex(n=>n.id===r.npcId),why:r.why?.length?r.why:undefined,
 sc:r.statChanges?.length?r.statChanges.map(c=>[c.key,r2(c.after-c.before)]):undefined,fl:r.fatigueLedger?.map(x=>[x.label,x.value??x.delta])};}
function day(game,trace,totals){
 try{
  const s=game.run,a=game.account;if(!s||!sends()||!on(a))return;
  const rid=ridOf(s,a);let live=readLive();if(!live||live.rid!==rid)live={rid,days:[]};
  const recs=[];s.npcs.forEach((n,i)=>{for(const r of n.records||[])if(r.day===s.day)recs.push({n:i,...rec(r)});});
  live.days=live.days.filter(x=>x.d!==s.day);live.days.push({d:s.day,tr:trace,x:(s.results||[]).map(r=>detail(s,r)),r:recs,t:totals&&{rev:totals.revenue,sp:totals.spent,op:totals.operating,sales:totals.sales,waste:totals.waste,m:salesByDay(s.npcs)[s.day]}});
  writeLive(live);if(live.days.filter(x=>!x.sent).length>=PART_DAYS)part(game);
 }catch(e){}
}
/* A Run that stops before its end still has to be readable: every PART_DAYS Days (and when the app goes to the background) the Days not yet sent
   go out as one small 'part' - the first one also carries the Run's head. The end report is still the whole Run; the collector keeps both. */
function part(game){
 try{
  const s=game.run,a=game.account;if(!s||!T.endpoint||!sends()||!on(a)||s.phase==='end')return;
  const live=readLive();if(!live||live.rid!==ridOf(s,a))return;
  const days=live.days.filter(x=>!x.sent);if(!days.length)return;
  const B=G.GUILD24_BUILD||{},head=live.head?undefined:{seed:s.seed,branch:s.branch,startBuild:s.startBuild,expected:s.expectedVisitors,asc:s.ascension||0,contract:s.contract,loadout:s.loadout,first:!!s.firstRun,
   decos:D().decorations.filter(d=>G.Meta.decorationOwned(a,d.id)).map(d=>d.id),runs:a.runs,wins:a.wins};
  const body={schema:2,rid:live.rid,kind:'part',demo:demo()?1:undefined,at:new Date().toISOString(),build:B.version,commit:B.commit,anon:a.anonId,head,day:s.day,money:s.money,supports:s.facilities,playMs:s.playMs||0,days,
   npcs:s.npcs.map(n=>({...npc(n),rec:undefined}))};
  for(const d of days)d.sent=1;live.head=1;writeLive(live);
  const q=readQ();q.push(JSON.stringify(body));writeQ(q);flush(a);
 }catch(e){}
}
function build(game,kind){
 const s=game.run,a=game.account;if(!s)return null;anon(a);const sbd=salesByDay(s.npcs);
 const live=readLive(),own=live&&live.rid===ridOf(s,a)?live.days:[],liveDay=d=>own.find(x=>x.d===d);
 const B=G.GUILD24_BUILD||{};
 return{schema:1,rid:ridOf(s,a),at:new Date().toISOString(),kind,build:B.version,commit:B.commit,app:!!G.Native?.inApp?.(),demo:demo()?1:undefined,anon:a.anonId,
  account:{runs:a.runs,wins:a.wins,bestDay:a.bestDay,bestSales:a.bestSales,asc:a.ascension,decos:D().decorations.filter(d=>G.Meta.decorationOwned(a,d.id)).map(d=>d.id),discovered:(a.discovered||[]).length},
  run:{seed:s.seed,branch:s.branch,startBuild:s.startBuild,expected:s.expectedVisitors,day:s.day,phase:s.phase,win:!!s.win,end:s.endReason,first:!!s.firstRun,asc:s.ascension||0,contract:s.contract,loadout:s.loadout,money:s.money,stats:s.stats,boss:s.bossId,
   supports:s.facilities,rerolls:s.rerollCount||0,playMs:s.playMs||0,relics:(s.relicHistory||[]).concat(s.relicWindow?[s.relicWindow]:[]).map(w=>({d:w.milestoneDay,c:w.candidateIds.map(id=>[id,D().relicBy[id]?.rarity]),p:w.purchased,rr:w.rerolls||undefined,x:w.seen?.length?w.seen.map(ids=>ids.map(id=>[id,D().relicBy[id]?.rarity])):undefined})),
   events:s.eventLog,settlement:s.settlement,final:s.finalReport?{cleared:s.finalReport.cleared,families:s.finalReport.families,revenue:s.finalLock?.revenue,
   /* the Final as it was decided (run.js boss()): party power, the Boss's power, the roll and party power x roll - not re-computed */
   pp:s.bossDebug&&r2(s.bossDebug.power),bp:s.bossDebug&&r2(s.bossDebug.bossPower),roll:s.bossDebug&&r3(s.bossDebug.roll),as:s.bossDebug&&r2(s.bossDebug.assault),members:s.finalReport.members.map(m=>({job:m.job,lv:m.level,it:m.items,h:m.hazard}))}:undefined,
   days:(s.reportHistory||[]).map(h=>({d:h.day,rev:h.revenue,sp:h.spent,op:h.operating,cogs:h.cogs,sales:h.sales,waste:h.waste,bal:h.balance,rr:h.rerolls,g:h.gates,gs:h.greatSuccess,disc:h.discount,oc:h.overcharge,ref:h.refuse||undefined,refP:h.refusePrice||undefined,m:sbd[h.day],pm:h.playMs||undefined,nov:h.noVisitors?1:undefined,
   com:h.commission||undefined,rrs:h.rerollSpent||undefined,rls:h.relicSpent||undefined,wc:h.wasteCost||undefined,sub:h.subsidy||undefined,liq:h.liquidation||undefined,tr:h.trace??liveDay(h.day)?.tr}))},
  detail:own.flatMap(x=>x.x),
  npcs:s.npcs.map(npc)};
}
const readQ=()=>{try{return JSON.parse(localStorage.getItem(QUEUE)||'[]');}catch(e){return[];}};
const writeQ=q=>{try{localStorage.setItem(QUEUE,JSON.stringify(q.slice(-MAX_QUEUE)));}catch(e){}};
let busy=false,acct=null;
/* the queue is read again around every send, so a report added while one is in flight stays queued and goes out after it.
   The Player's switch is read again before every send too: switched off mid-queue, nothing more goes out (privacy.html 제2조의2). */
async function flush(a){
 if(a)acct=a;
 if(!T.endpoint||busy||typeof fetch!=='function')return;
 busy=true;
 try{for(let body;on(acct)&&(body=readQ()[0])!==undefined;){const r=await fetch(T.endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body});if(!r.ok)break;
  const q=readQ(),i=q.indexOf(body);if(i>=0)q.splice(i,1);writeQ(q);}}
 catch(e){}
 busy=false;
}
/* switched off: what was waiting to go out is dropped, not kept for later */
function clear(){writeQ([]);writeLive(null);}
function report(game,kind){
 try{
  if(!T.endpoint||!sends()||!on(game.account))return;acct=game.account;
  anon(game.account);
  const p=build(game,kind);if(!p)return;
  const q=readQ();q.push(JSON.stringify(p));writeQ(q);writeLive(null);flush();
 }catch(e){}
}
/* the collector's address (tools/stats-collector/README-cloudflare.md) */
const T=G.Telemetry={endpoint:'https://guild24-stats.f-ai-shion-lab.workers.dev/',on,build,report,flush,day,part,clear};
})(globalThis);
