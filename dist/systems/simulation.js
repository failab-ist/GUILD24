(function(G){
const D=G.DATA,copy=x=>JSON.parse(JSON.stringify(x));

/* Engagement levers. RUN-Q30 / ECO-Q12 / DUN-Q20 name three — order, sale and expedition
   supply — and a minimal-engagement policy drops exactly the named lever and nothing else,
   so the comparison against engaged play stays like-for-like. `meta-farm` is the adversarial
   case: it drops every lever AND refuses paid Relics, then liquidates the opening stock, so
   the run lasts as long as 1,200G of overhead allows at the lowest possible interaction. */
const ENGAGEMENT={
 'zero-sale':{order:'full',sell:false,finalSupply:true},
 'zero-order':{order:false,sell:true,finalSupply:true},
 'zero-supply':{order:false,sell:false,finalSupply:false},
 'poverty':{order:'minimum',sell:true,finalSupply:true},
 'meta-farm':{order:false,sell:false,finalSupply:false,relics:'free',liquidateOpening:true}};
const levers=policy=>ENGAGEMENT[policy]||{order:'full',sell:true,finalSupply:true};

/* Boss clear is `power * roll >= bossPower` with roll uniform on [0.88, 1.12], so the clear
   chance of a given party is exact arithmetic. Sampling it would only add noise. */
const ROLL_LO=.88,ROLL_HI=1.12;
const clearChance=(power,bossPower)=>power<=0?0:Math.max(0,Math.min(1,(ROLL_HI-bossPower/power)/(ROLL_HI-ROLL_LO)));
/* The same contribution `run.js:boss()` sums, per adventurer. */
const contribution=p=>p.effects.combat*.58+p.effects.survival*.32+p.effects.mobility*.24+p.effects.spirit*.16-p.hazard*.35;

function blank(runs,policy,pricing,build){
 return {runs,policy,pricing,build,relicOffers:{},relicPurchases:{},relicOutcomes:{},jobs:{},dungeons:{},wallets:{},offerRepeats:0,buildCounts:{},relicSpend:0,windowDiversity:[],reached30:0,wins:0,bankrupt:0,deaths:0,money:0,days:{},facilities:{},items:{},modes:{},impact:{samples:0,improved:0,saved:0,characterAbility:0,preparedAbility:0},capacityBlocked:0,stockouts:0,dayReached:{},metaMastery:0,metaDistinct:0,metaGrade:0,knowledge:0,revenue:0,spend:0,actions:0,
  npc:{samples:0,alive:0,level:0,maxLevel:0,loyalty:0,regulars:0,wallet:0,growth:0},bands:{},
  final:{reached:0,party:0,full:0,resolved:0,power:0,assault:0,margin:0,cleared:0},
  /* Party-size counterfactual: the strongest legal 1 / 2 / 3 party at the SAME generated D30
     state, same disclosed Families and Hazards. Measurement only — no Final rule changes. */
  partySize:{1:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0},2:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0},3:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0}},
  /* RUN-Q15: the Final value of an invested regular against a late newcomer, classified from
     the visit and loyalty history the run already keeps. */
  q15:{runs:0,invested:[],newcomer:[],chosenInvested:0,chosenNewcomer:0,powerInvested:0,powerNewcomer:0}};
}
function derive(out,count){
 for(const [day,values]of Object.entries(out.wallets)){if(!Array.isArray(values))continue;values.sort((a,b)=>a-b);out.wallets[day]={count:values.length,mean:values.reduce((a,b)=>a+b,0)/values.length,p10:values[Math.floor(values.length*.1)],median:values[Math.floor(values.length*.5)],p90:values[Math.floor(values.length*.9)]};}
 const days=Object.entries(out.dayReached).reduce((a,[d,n])=>a+Number(d)*n,0);
 return {...out,averageDay:days/count,masteryPerRun:out.metaMastery/count,distinctPerRun:out.metaDistinct/count,clearsPerRun:out.wins/count,actionsPerRun:out.actions/count,actionsPerDay:out.actions/Math.max(1,days),knowledgePerRun:out.knowledge/count,reachRate:out.reached30/count,bossWinGivenReach:out.reached30?out.wins/out.reached30:0,overallClearRate:out.wins/count,averageDeaths:out.deaths/count,averageMoney:out.money/count};
}

/* One Run, played by `ctx.policy` on the account the caller owns. The account is NOT copied
   here: `simulate` hands in a fresh one per seed, `trajectory` hands in the same one every
   time so real Meta progression carries forward. */
function playRun(g,out,ctx){
 const {policy,pricing,build,seed}=ctx,engagement=levers(policy),s=g.run;
 let turns=0;const seenWindows=new Set();let previousCandidates=[];
 /* Interaction-cost proxy: one tick per action a player would actually have to perform. */
 const act=(n=1)=>{out.actions+=n;};
 const stat=d=>out.days[d]??={samples:0,cash:0,wallet:0,level:0,inventory:0,peak:0,visitors:0,actual:0,consumed:0,slots:0,waste:0,revenue:0,cogs:0,spent:0,operating:0,loyalty:0,injury:0,death:0,overAffordable:0,fullAffordable:0,halfOnly:0,offers:0};
 function itemValue(n,it,d){const known=policy==='skilled'?d.hazards:G.Presentation?G.Presentation.known(d,g):d.hazards;let v=(it.effects.combat||0)*.55+(it.effects.survival||0)*.6+(it.effects.mobility||0)*.25+(it.effects.spirit||0)*.3+(d.requiredSupply||0)*(it.effects.supply||0)*.2+known.reduce((a,h)=>a+Math.max(0,it.effects[h]||0)*.5,0);if(policy==='beginner')return it.sell*.03;if(policy==='greedy')return it.sell*.09;if(policy==='random')return (it.buy*13+seed+s.day)%37;if(policy==='skilled'){if(n?.traits.includes('eater')&&it.category==='food')v+=((it.effects.supply||0)+(it.effects.survival||0))*.4;}if(policy==='protective')v+=(it.effects.escape||0)*35+(it.effects.revive||0)*45;return v;}
 const originalSell=g.sell.bind(g);g.sell=(id,mode)=>{const m=out.modes[mode]??={attempts:0,accepted:0,revenue:0,profit:0,loyalty:0};m.attempts++;act();const n=g.current(),st=s.inventory.find(x=>x.id===id),old=n.loyalty;const ok=originalSell(id,mode);if(ok){m.accepted++;m.revenue+=n.history.at(-1).paid;m.profit+=n.history.at(-1).paid-(st.cost||0);m.loyalty+=n.loyalty-old;(out.items[st.item]??={ordered:0,sold:0}).sold++;}return ok;};
 const originalNight=g.night.bind(g);g.night=()=>{const day=stat(s.day);day.slots+=s.queue.reduce((a,id)=>a+G.Adventurer.slots(s.npcs.find(n=>n.id===id)),0);day.consumed+=s.queue.reduce((a,id)=>a+s.npcs.find(n=>n.id===id).pack.length,0);
 for(const id of s.queue){const n=s.npcs.find(n=>n.id===id),d=s.dungeons[n.destination],a=G.Dungeon.prepare({...n,pack:[]},d,s.facilities),b=G.Dungeon.prepare(n,d,s.facilities);const ability=p=>p.effects.combat*.58+p.effects.survival*.32+p.effects.mobility*.24+p.effects.spirit*.16;out.impact.characterAbility+=ability(a);out.impact.preparedAbility+=ability(b);out.impact.samples++;const rng=new G.RNG(s.seed,g.rng.state),bare=G.Dungeon.resolve({...copy(n),pack:[]},d,new G.RNG(s.seed,rng.state),s.facilities),ready=G.Dungeon.resolve(copy(n),d,rng,s.facilities);const rank={'사망':0,'중상':1,'부상':2,'퇴각':3,'성공':4,'대성공':5};if(rank[ready.outcome]>rank[bare.outcome])out.impact.improved++;if(bare.outcome==='사망'&&ready.outcome!=='사망')out.impact.saved++;}
 originalNight();for(const report of s.results){const band=s.day<=3?'D1-3':s.day<=7?'D4-7':s.day<=12?'D8-12':s.day<=18?'D13-18':'D19-29';const bd=out.bands[band]??={expeditions:0,packed:0,items:0,success:0,retreat:0,injury:0,severe:0,death:0};bd.expeditions++;bd.items+=report.items.length;bd.packed+=Number(report.items.length>0);bd.success+=Number(['성공','대성공'].includes(report.outcome));bd.retreat+=Number(report.outcome==='퇴각');bd.injury+=Number(report.outcome==='부상');bd.severe+=Number(report.outcome==='중상');bd.death+=Number(report.outcome==='사망');const npc=s.npcs.find(n=>n.id===report.npcId),d=s.dungeons.find(d=>d.id===report.dungeon);for(const [table,key] of [[out.jobs,npc.job],[out.dungeons,(d?.family||report.dungeon)+':'+(d?.tier||1)]]){const bucket=table[key]??={expeditions:0,success:0,retreat:0,injury:0,severe:0,death:0,consumed:0};bucket.expeditions++;bucket.success+=Number(['성공','대성공'].includes(report.outcome));bucket.retreat+=Number(report.outcome==='퇴각');bucket.injury+=Number(report.outcome==='부상');bucket.severe+=Number(report.outcome==='중상');bucket.death+=Number(report.outcome==='사망');bucket.consumed+=report.items.length;}}day.actual+=s.results.length;day.death+=s.results.filter(r=>r.outcome==='사망').length;day.injury+=s.results.filter(r=>r.outcome==='중상').length;for(const k of ['waste','revenue','cogs','spent','operating'])day[k]+=s.daily[k]||0;
 };
 function buySupport(){const w=s.relicWindow;if(!w||w.purchased)return;if(!seenWindows.has(w.milestoneDay)){seenWindows.add(w.milestoneDay);out.offerRepeats+=w.candidateIds.filter(id=>previousCandidates.includes(id)).length;previousCandidates=[...w.candidateIds];for(const id of w.candidateIds)out.relicOffers[id]=(out.relicOffers[id]||0)+1;out.windowDiversity.push(new Set(w.candidateIds.flatMap(id=>D.relicBy[id].tags)).size);}if(build==='none'&&s.phase!=='foundation')return;if(engagement.relics==='free'&&s.phase!=='foundation')return;const candidates=w.candidateIds.slice().sort((a,b)=>{const val=id=>{const r=D.relicBy[id],tags=s.facilities.flatMap(id=>D.relicBy[id]?.tags||[]);return (build==='hybrid'?r.tags.filter(t=>tags.includes(t)).length:r.tags.includes(build)?3:0)+(r.kind==='keystone'?.5:0);};return val(b)-val(a);});for(const id of candidates){const cost=w.candidatePrices[w.candidateIds.indexOf(id)];if(s.money-cost<(s.phase==='foundation'?0:s.day===30?180:380))continue;const purchaseDay=s.phase==='foundation'?0:s.day;g.buyRelic(id);act();out.relicSpend+=cost;const r=out.relicPurchases[id]??={count:0,day:0,spend:0};r.count++;r.day+=purchaseDay;r.spend+=cost;break;}}

 /* --- D30 measurement, run on copies before the real Final is committed. -----------------
    Nothing here touches g.rng or any live object: the Boss chance is arithmetic, and every
    party it tries is built from a deep copy of the eligible roster and the inventory. */
 function measureFinal(){
  const d=s.dungeons[0],eligible=s.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery);
  if(!eligible.length)return;
  const bossPower=D.balance.bossPower;
  const bare=n=>contribution(G.Dungeon.prepare({...copy(n),pack:[]},d,s.facilities));
  /* Party-size counterfactual. The strongest legal N picks the N highest bare contributors,
     then supplies them from one shared copy of the stock — so a smaller party genuinely gets
     to concentrate the same inventory, which is the whole question a survivor fallback asks. */
  for(const size of [1,2,3]){
   if(eligible.length<size)continue;
   const party=eligible.slice().sort((a,b)=>bare(b)-bare(a)).slice(0,size).map(copy);
   const stock=copy(s.inventory);
   for(const n of party)while(n.pack.length<G.Adventurer.slots(n)&&stock.length){
    const best=stock.slice().sort((a,b)=>itemValue(n,D.itemBy[b.item],d)-itemValue(n,D.itemBy[a.item],d))[0];
    n.pack.push(best.item);stock.splice(stock.indexOf(best),1);}
   const power=party.reduce((sum,n)=>sum+contribution(G.Dungeon.prepare(n,d,s.facilities)),0);
   const bucket=out.partySize[size];
   bucket.samples++;bucket.power+=power;bucket.chance+=clearChance(power,bossPower);
   bucket.assaultLo+=power*ROLL_LO;bucket.assaultHi+=power*ROLL_HI;
  }
  /* RUN-Q15. The two groups are read off the run's own history — a regular is someone who
     kept coming back and reached the canonical 단골 threshold; a newcomer has been to the
     counter at most once. No new NPC-value system: the value is the Final contribution
     `boss()` itself would sum, measured bare so it describes the adventurer, not the stock. */
  const invested=s.npcs.filter(n=>n.alive&&n.introduced&&n.visits>=5&&G.Adventurer.isTrustedRegular(n));
  const newcomer=s.npcs.filter(n=>n.alive&&n.visits<=1);
  if(!invested.length&&!newcomer.length)return;
  out.q15.runs++;
  for(const n of invested)out.q15.invested.push(Math.round(bare(n)*10)/10);
  for(const n of newcomer)out.q15.newcomer.push(Math.round(bare(n)*10)/10);
  /* Does the automated best-3 actually end up made of newcomers? */
  const chosen=eligible.slice().sort((a,b)=>bare(b)-bare(a)).slice(0,Math.min(3,eligible.length));
  for(const n of chosen){
   const isInvested=n.introduced&&n.visits>=5&&G.Adventurer.isTrustedRegular(n),isNew=n.visits<=1;
   if(isInvested){out.q15.chosenInvested++;out.q15.powerInvested+=bare(n);}
   else if(isNew){out.q15.chosenNewcomer++;out.q15.powerNewcomer+=bare(n);}
  }
 }

 while(s.phase!=='end'&&turns++<1000){
  if(s.phase==='foundation'){buySupport();continue;}
  if(s.phase==='morning'){g.beginOrder();act();continue;}
  if(s.phase==='order'){buySupport();
   const day=stat(s.day);day.samples++;day.cash+=s.money;day.inventory+=s.inventory.length;day.visitors+=s.queue.length;const visitors=s.queue.map(id=>s.npcs.find(n=>n.id===id));(out.wallets[s.day]??=[]).push(...visitors.map(n=>n.money));day.wallet+=visitors.reduce((a,n)=>a+n.money,0);day.level+=visitors.reduce((a,n)=>a+n.level,0);day.loyalty+=visitors.reduce((a,n)=>a+n.loyalty,0);
   for(const n of visitors)for(const o of s.offers){const it=D.itemBy[o.item];day.offers++;if(n.money>=Math.round(it.sell*D.pricing.overcharge.mult))day.overAffordable++;if(n.money>=it.sell)day.fullAffordable++;else if(n.money>=Math.round(it.sell*.5))day.halfOnly++;}
   const offers=s.offers.map((o,i)=>({o,i})).sort((a,b)=>{const v=o=>itemValue(null,D.itemBy[o.item],s.dungeons[0])/Math.sqrt(o.price)+(D.itemBy[o.item].sell-o.price)/o.price;return v(b.o)-v(a.o);});
   if(engagement.order==='minimum'){const cheap=s.offers.map((o,i)=>({o,i})).filter(x=>x.o.quantity).sort((a,b)=>a.o.price-b.o.price)[0];if(cheap&&s.money-cheap.o.price>=600&&g.canStock(D.itemBy[cheap.o.item]))try{g.setQuantity(cheap.i,1);act();(out.items[cheap.o.item]??={ordered:0,sold:0}).ordered++;}catch(e){}}
   else if(engagement.order)for(let round=0;round<4;round++)for(const {o,i}of offers){if(s.inventory.length+Object.values(s.cart||{}).reduce((a,b)=>a+b,0)>=s.queue.length*(policy==='protective'?2.5:2)+2)break;if(o.quantity&&s.money-g.cartTotal()-o.price>=140){if(!g.canStock(D.itemBy[o.item])){out.capacityBlocked++;continue;}try{g.setQuantity(i,(s.cart?.[i]||0)+1);act();(out.items[o.item]??={ordered:0,sold:0}).ordered++;}catch(e){}}}
   g.confirmOrder();act();day.peak+=s.inventory.length;g.open();act();
  }else if(s.phase==='sell'){
   const n=g.current();if(!engagement.sell){g.depart();act();continue;}if(policy==='neglect'&&n.level<Math.max(...s.npcs.filter(x=>x.alive).map(x=>x.level))-2){g.depart();act();continue;}const d=s.dungeons[n.claimedDestination??n.destination];let attempts=0;
   while(n.pack.length<G.Adventurer.slots(n)&&attempts++<15){const options=[];for(const st of s.inventory){const it=D.itemBy[st.item];let mode=pricing==='overcharge'?'overcharge':pricing==='full'?'full':pricing==='half'?'half':pricing==='vip'?(n.level>=Math.max(...s.npcs.map(x=>x.level))-1?'half':'full'):policy==='greedy'?'overcharge':policy==='protective'?'half':n.level>=6&&n.loyalty<50?'half':'full';if(pricing==='adaptive'&&policy!=='protective'&&policy!=='greedy'&&n.money>it.sell*2&&n.loyalty>50)mode='overcharge';if(pricing==='adaptive'&&n.money<g.interest(n,it,mode).debit)mode='half';const intent=g.interest(n,it,mode);if(intent.debit>n.money||n.refused.includes(it.id+':'+mode))continue;options.push({st,mode,v:itemValue(n,it,d)+(st.expires?5/(st.expires-s.day+1):0)});}
   options.sort((a,b)=>b.v-a.v);if(!options.length)break;g.sell(options[0].st.id,options[0].mode);}
   if(!s.inventory.length)out.stockouts++;g.depart();act();
  }else if(s.phase==='night'){g.finishNight();act();}
  else if(s.phase==='closing'){
   /* The opening stock is the only stock a meta-farm run ever holds; turning it into cash on
      the first Closing is an ordinary 재고 정리 action and buys more days per interaction. */
   if(engagement.liquidateOpening)while(s.inventory.length){g.liquidate(s.inventory[0].id);act();}
   while(s.money<0&&s.inventory.length){g.liquidate(s.inventory[0].id);act();}
   g.closeDay();act();
  }
  else if(s.phase==='final'){buySupport();if(engagement.order)for(let i=0;i<s.offers.length;i++){const o=s.offers[i];if(o.quantity&&s.money-o.price>=80&&g.canStock(D.itemBy[o.item])){g.order(i);act();}}out.reached30++;const day=stat(30);day.samples++;day.cash+=s.money;day.inventory+=s.inventory.length;
   measureFinal();
   const team=s.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery).sort((a,b)=>b.level-a.level).slice(0,3);day.visitors+=team.length;day.level+=team.reduce((a,n)=>a+n.level,0);day.wallet+=team.reduce((a,n)=>a+n.money,0);out.final.reached++;out.final.party+=team.length;out.final.full+=Number(team.length>=3);
   for(const n of team){g.selectFinal(n.id);act();while(engagement.finalSupply&&n.pack.length<G.Adventurer.slots(n)&&s.inventory.length){const st=s.inventory.slice().sort((a,b)=>itemValue(n,D.itemBy[b.item],s.dungeons[0])-itemValue(n,D.itemBy[a.item],s.dungeons[0]))[0];g.supplyFinal(n.id,st.id);act();}}
   if(team.length){g.boss();act();}else g.end(false,'출전 가능한 모험가 없음');}
 }
 if(turns>=1000)throw Error('Simulation stalled at DAY '+s.day+' '+s.phase);
 for(const tag of Object.keys(D.buildNames)){const n=s.facilities.filter(id=>D.relicBy[id]?.tags.includes(tag)).length;const bins=out.buildCounts[tag]??={};const k=Math.min(5,n);bins[k]=(bins[k]||0)+1;}
 for(const id of s.facilities){const b=out.relicOutcomes[id]??={runs:0,wins:0,death:0,gold:0};b.runs++;b.wins+=Number(!!s.win);b.death+=s.stats.deaths;b.gold+=s.money;}
 for(const npc of s.npcs.filter(n=>s.team.includes(n.id))){(out.jobs[npc.job]??={}).bossParticipation=((out.jobs[npc.job]||{}).bossParticipation||0)+1;}
 out.dayReached[s.day]=(out.dayReached[s.day]||0)+1;out.metaMastery+=G.Meta.totalJobMastery(g.account);out.metaDistinct+=G.Meta.distinctBossClear(g.account);out.metaGrade+=G.Meta.grade(g.account);out.knowledge+=Object.values(g.account.knowledge).reduce((a,b)=>a+b,0);out.revenue+=s.stats.revenue;out.spend+=s.stats.spent;
 {const alive=s.npcs.filter(n=>n.alive&&n.introduced);out.npc.samples++;out.npc.alive+=alive.length;out.npc.level+=alive.reduce((a,n)=>a+n.level,0);out.npc.maxLevel+=alive.length?Math.max(...alive.map(n=>n.level)):0;out.npc.loyalty+=alive.reduce((a,n)=>a+n.loyalty,0);out.npc.regulars+=s.stats.regulars;out.npc.wallet+=alive.reduce((a,n)=>a+n.money,0);out.npc.growth+=alive.reduce((a,n)=>a+n.level-1,0);}
 if(s.bossDebug){out.final.resolved++;out.final.power+=s.bossDebug.power;out.final.assault+=s.bossDebug.assault;out.final.margin+=s.bossDebug.assault-s.bossDebug.bossPower;out.final.cleared+=Number(!!s.win);}
 out.wins+=Number(!!s.win);out.bankrupt+=Number(s.day<30);out.deaths+=s.stats.deaths;out.money+=s.money;
 return s;
}

/* FRESH-ACCOUNT BENCHMARK — kept unchanged as the regression baseline. Every seed starts from
   Meta.fresh() (or a copy of the supplied account), so nothing a Run earns carries anywhere.
   Its Final numbers describe a first-time account and must not be read as the game's ceiling. */
function simulate(count=100,policy='balanced',account=null,pricing='adaptive',build='hybrid'){
 const out=blank(count,policy,pricing,build);
 for(let seed=0;seed<count;seed++){
  const g=new G.Game(account?copy(account):G.Meta.fresh());g.autosave=false;g.start('revision-'+seed);
  playRun(g,out,{policy,pricing,build,seed});
 }
 return derive(out,count);
}

/* CROSS-RUN META PROGRESSION — the same account played through successive Runs, exactly as a
   returning player accumulates it. No gameplay power is inserted: grade, unlocks and starting
   contract all come from the real Meta system reacting to real results.
   Returns one cohort per Run index, so FRESH ACCOUNT and PROGRESSED ACCOUNT Final viability
   can be read apart, plus the same cohorts bucketed by the grade actually held. */
function trajectory({trajectories=20,runs=12,policy='balanced',pricing='adaptive',build='hybrid',prefix='meta',contract='standard'}={}){
 const byIndex=[],byGrade={},accountsEnd=[];
 for(let i=0;i<runs;i++)byIndex.push(blank(trajectories,policy,pricing,build));
 for(let t=0;t<trajectories;t++){
  const account=G.Meta.fresh();
  for(let i=0;i<runs;i++){
   const before={grade:G.Meta.grade(account),mastery:G.Meta.totalJobMastery(account),distinct:G.Meta.distinctBossClear(account)};
   const g=new G.Game(account);g.autosave=false;
   /* Which start contract the trajectory uses is a strategy choice, not a Meta fact, so it is
      the caller's: 'standard' holds it constant and isolates what grade and unlocks alone do,
      'best' takes the most advanced contract the account has actually earned. `start` rejects
      a locked contract, so neither mode can grant something the account has not unlocked. */
   let started=contract;
   if(contract==='best'){started='standard';for(const c of D.contracts)if(G.Meta.contractUnlocked(account,c))started=c.id;}
   const available=D.contracts.filter(c=>G.Meta.contractUnlocked(account,c)).length;
   g.start(prefix+'-'+t+'-'+i,started);
   const grade=before.grade;
   const bucket=byGrade[grade]??=blank(0,policy,pricing,build);
   playRun(g,byIndex[i],{policy,pricing,build,seed:t});
   /* The grade bucket re-reads the same Run from the per-index cohort's last entry rather
      than replaying it: one Run, counted once in each view. */
   bucket.runs++;bucket.dayReached[g.run.day]=(bucket.dayReached[g.run.day]||0)+1;
   bucket.reached30+=Number(g.run.day===30);bucket.wins+=Number(!!g.run.win);
   bucket.metaMastery+=before.mastery;bucket.metaDistinct+=before.distinct;bucket.metaGrade+=grade;
   if(g.run.bossDebug){bucket.final.resolved++;bucket.final.power+=g.run.bossDebug.power;bucket.final.assault+=g.run.bossDebug.assault;bucket.final.margin+=g.run.bossDebug.assault-g.run.bossDebug.bossPower;bucket.final.cleared+=Number(!!g.run.win);}
   bucket.money+=g.run.money;bucket.deaths+=g.run.stats.deaths;
   byIndex[i].contracts??={};byIndex[i].contracts[started]=(byIndex[i].contracts[started]||0)+1;
   byIndex[i].gradeAtStart??=0;byIndex[i].gradeAtStart+=grade;
   byIndex[i].masteryAtStart??=0;byIndex[i].masteryAtStart+=before.mastery;
   byIndex[i].distinctAtStart??=0;byIndex[i].distinctAtStart+=before.distinct;
   byIndex[i].contractsAvailable??=0;byIndex[i].contractsAvailable+=available;
  }
  accountsEnd.push({grade:G.Meta.grade(account),mastery:G.Meta.totalJobMastery(account),distinct:G.Meta.distinctBossClear(account)});
 }
 return {mode:'trajectory',policy,pricing,build,contractMode:contract,trajectories,runsPerTrajectory:runs,
  byIndex:byIndex.map((o,i)=>({runIndex:i,...derive(o,trajectories),gradeAtStart:o.gradeAtStart/trajectories,masteryAtStart:o.masteryAtStart/trajectories,distinctAtStart:o.distinctAtStart/trajectories,contractsAvailable:o.contractsAvailable/trajectories,contracts:o.contracts})),
  byGrade:Object.fromEntries(Object.entries(byGrade).map(([grade,o])=>[grade,derive(o,o.runs)])),
  accountsEnd};
}

G.Debug={simulate,trajectory,clearChance,contribution};
})(globalThis);
