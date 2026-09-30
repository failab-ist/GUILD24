// v3.0 prep §8 measurements (User 2026-09-30: "측정 2개 ㄱ"). MEASUREMENT ONLY - nothing on disk or in DATA is changed.
//   curve <policy> <runs> <none|economy|survival>
//       GAME_VISION §Difficulty Curve: D30 reach / clear on a fresh account (none) or one that owns all eight Decorations
//       with a loadout equipped (economy / survival; survival is also each Slot's strongest single piece, remeasure §5),
//       and RUN-Q15 (CORE_RUN_QA): the invested regulars against the newcomers at D30, from Debug.simulate's own q15.
//   nudge <trajectories> <runs> [order=strong|weak|all]
//       v3.0-prep §3-1: on a fresh account played Run after Run, how often the END replay line is empty (the Run opened
//       nothing, the settlement crossed no unowned Decoration's price, no new best Day - UI_UX §END — REPLAY NUDGE, the
//       same conditions as app.js ledger() / replayLine()), and the longest runs of empty endings.
const path=require('node:path');const ROOT=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(ROOT,'dist',f+'.js'));
const SETS={economy:['sponsorSign','honorFrame','thriftSafe','guildShelf'],survival:['trainingSign','infirmaryPlaque','memorialBook','aidCabinet']};
const pc=(a,b)=>b?+(100*a/b).toFixed(1):null,ci=(k,n)=>n?+(196*Math.sqrt((k/n)*(1-k/n)/n)).toFixed(1):null;
const q=(v,p)=>{const s=v.slice().sort((a,b)=>a-b);return s.length?s[Math.min(s.length-1,Math.floor(p*s.length))]:null;};
const mean=v=>v.length?+(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1):null;
const [mode,...args]=process.argv.slice(2);
if(mode==='curve'){
 const [policy='balanced',runs='3000',set='none']=args,N=Number(runs);
 let account=null;
 if(set!=='none'){if(!SETS[set])throw Error('set: none | economy | survival');
  account=Meta.fresh();
  for(const d of DATA.decorations){Meta.addCapital(account,d.price);Meta.buyDecoration(account,d.id);}
  for(const id of SETS[set])Meta.equipDecoration(account,DATA.decorationBy[id].slot,id);}
 const ends={};const P=Game.prototype,end=P.end;
 P.end=function(w,why){const s=this.run,first=s.phase!=='end';const r=end.call(this,w,why);
  if(first){const k=s.win?'win':/소문/.test(s.endReason||'')?'deathLimit':/자금/.test(s.endReason||'')?'bankrupt':s.day>=30?'finalLoss':'other';ends[k]=(ends[k]||0)+1;}return r;};
 const r=Debug.simulate(N,policy,account,'adaptive','hybrid',{});
 const d30=Math.round(r.reachRate*N),win=Math.round(r.clearsPerRun*N),Q=r.q15;
 console.log(JSON.stringify({policy,runs:N,set,owned:account?Meta.ownedDecorations(account).length:0,loadout:account?Meta.storeLoadout(account):null,
  d30:pc(d30,N),d30ci:ci(d30,N),clear:pc(win,N),clearCi:ci(win,N),winGivenD30:pc(win,d30),
  ends:Object.fromEntries(Object.entries(ends).map(([k,v])=>[k,pc(v,N)])),
  q15:{runs:Q.runs,invested:{n:Q.invested.length,mean:mean(Q.invested),p50:q(Q.invested,.5),p90:q(Q.invested,.9)},
   newcomer:{n:Q.newcomer.length,mean:mean(Q.newcomer),p50:q(Q.newcomer,.5),p90:q(Q.newcomer,.9)},
   chosenInvested:Q.chosenInvested,chosenNewcomer:Q.chosenNewcomer,
   chosenInvestedPower:Q.chosenInvested?+(Q.powerInvested/Q.chosenInvested).toFixed(1):null,
   chosenNewcomerPower:Q.chosenNewcomer?+(Q.powerNewcomer/Q.chosenNewcomer).toFixed(1):null}}));
}else if(mode==='nudge'){
 const [T='120',R='20',order='strong']=args;
 // the two purchase orders tests/acquisition.cjs measures with (its STRONG / WEAK); `reach` still counts every unowned piece
 // `all` keeps buying past the fourth piece: with a four-piece order the bot stops buying and its Capital climbs past every
 // price, so `reach` can no longer fire and the late Runs read emptier than a player who keeps buying would see
 const ORDER={strong:['sponsorSign','guildShelf','thriftSafe','honorFrame'],weak:['honorFrame','thriftSafe','guildShelf','sponsorSign'],
  all:['sponsorSign','guildShelf','thriftSafe','honorFrame','aidCabinet','memorialBook','infirmaryPlaque','trainingSign']}[order];
 const seen=new WeakSet(),log=[];const P=Game.prototype,end=P.end;
 P.end=function(w,why){const s=this.run;const r=end.call(this,w,why);
  if(!seen.has(s)){seen.add(s);const opened=[...(s.unlocked||[]),...(s.dayUnlocked||[])].length>0,reach=!!s.settlement?.reach,best=s.bestBefore>0&&s.day>s.bestBefore;
   log.push(opened?'opened':reach?'reach':best?'best':'empty');}
  return r;};
 const t=Debug.trajectory({trajectories:Number(T),runs:Number(R),policy:'balanced',prefix:'nudge',purchaseOrder:ORDER});
 const n=Number(T),m=Number(R);if(log.length!==n*m)throw Error('logged '+log.length+' endings, expected '+n*m);
 const byRun=Array.from({length:m},(_,i)=>{const c={opened:0,reach:0,best:0,empty:0};for(let k=0;k<n;k++)c[log[k*m+i]]++;return c;});
 const longest=[],first=[];
 for(let k=0;k<n;k++){let run=0,max=0;const row=log.slice(k*m,k*m+m);for(const x of row){run=x==='empty'?run+1:0;max=Math.max(max,run);}longest.push(max);}
 const all={opened:0,reach:0,best:0,empty:0};for(const x of log)all[x]++;
 console.log(JSON.stringify({trajectories:n,runs:m,order,
  share:Object.fromEntries(Object.entries(all).map(([k,v])=>[k,pc(v,log.length)])),
  emptyByRun:byRun.map(c=>pc(c.empty,n)),
  longestEmpty:{p50:q(longest,.5),p90:q(longest,.9),max:Math.max(...longest)},
  ownedAtEnd:mean(t.accountsEnd.map(a=>a.decorations??0))}));
}else{console.error('usage: node tools/measure-v3prep.cjs curve <policy> <runs> <none|economy|survival> | nudge <T> <R> [strong|weak|all]');process.exit(2);}
