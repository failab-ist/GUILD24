(function(G){
const D=G.DATA,copy=x=>JSON.parse(JSON.stringify(x));

/* Engagement levers. RUN-Q30 / ECO-Q12 / DUN-Q20 name three — order, sale and expedition
   supply — and a minimal-engagement policy drops exactly the named lever and nothing else,
   so the comparison against engaged play stays like-for-like. `meta-farm` is the adversarial
   case: it drops every lever AND refuses paid Relics, then liquidates the opening stock, so
   the run lasts as long as 1,000G of overhead allows at the lowest possible interaction. */
const ENGAGEMENT={
 'zero-sale':{order:'full',sell:false,finalSupply:true},
 'zero-order':{order:false,sell:true,finalSupply:true},
 'zero-supply':{order:false,sell:false,finalSupply:false},
 'poverty':{order:'minimum',sell:true,finalSupply:true},
 'meta-farm':{order:false,sell:false,finalSupply:false,relics:'free',liquidateOpening:true}};
const levers=policy=>ENGAGEMENT[policy]||{order:'full',sell:true,finalSupply:true};

/* How much of its money a policy is willing to commit. The engaged policies were written to
   survive, not to invest: they stop ordering at two items per expected visitor, keep 140G back
   at all times, will not touch a Relic unless 380G remains afterwards, and never reroll an offer
   sheet at all. That is why a skilled run finishes holding gold it had no rule to spend, and it
   makes every measurement of "the survivors are too rich" partly a statement about the policy.
   `spender` is the same policy with those four brakes loosened, using only sinks the game
   already has - Order, supply, Relic, reroll, Deep sponsorship. No new sink, no new system. */
const SPEND={
 'default':{stockPerVisitor:2,stockSlack:2,cashFloor:140,relicReserve:380,reroll:false},
 /* Reroll is the second half of the ordering decision - take this sheet, or pay to look again -
    so an engaged policy has to actually weigh it. Both engaged policies now do, using the poor-
    sheet test that was already here and each policy's own cashFloor as the floor. No reroll
    reserve and no new threshold: the policy rerolls while the sheet is poor and stops as soon as
    it is not, or as soon as the next reroll would take the till under the floor it already
    keeps. The price doubles within a Day and resets the next morning, so this converges. */
 'balanced':{stockPerVisitor:2,stockSlack:2,cashFloor:140,relicReserve:380,reroll:true},
 'spender':{stockPerVisitor:3,stockSlack:3,cashFloor:80,relicReserve:200,reroll:true}};
const spending=policy=>SPEND[policy]||SPEND.default;

/* Boss clear is `power * roll >= bossPower` with roll uniform on [0.88, 1.12], so the clear
   chance of a given party is exact arithmetic. Sampling it would only add noise. */
const ROLL_LO=.88,ROLL_HI=1.12;
const clearChance=(power,bossPower)=>power<=0?0:Math.max(0,Math.min(1,(ROLL_HI-bossPower/power)/(ROLL_HI-ROLL_LO)));
/* The same contribution `run.js:boss()` sums, per adventurer. The four coefficients are not
   restated here at all: they are `Dungeon.preparedPower`, the one helper Forecast, Resolve and
   the Final all read. A copy of them is exactly how this harness came to report every Final
   contribution against the pre-Stage-10 .58/.32/.24/.16 formula the game had already left. */
const contribution=p=>G.Dungeon.preparedPower(p.effects)
 -(p.hazards.length?p.hazards.reduce((v,h)=>v+h.gap,0)/p.hazards.length:0)*1.70;

function blank(runs,policy,pricing,build){
 return {deathsPerRun:[],deathFailDay:[],endedBy:{deaths:0,bankrupt:0,finalFail:0,cleared:0},runs,policy,pricing,build,relicOffers:{},relicPurchases:{},relicOutcomes:{},jobs:{},dungeons:{},wallets:{},offerRepeats:0,buildCounts:{},relicSpend:0,windowDiversity:[],reached30:0,wins:0,bankrupt:0,deaths:0,money:0,days:{},facilities:{},items:{},modes:{},impact:{samples:0,improved:0,saved:0,characterAbility:0,preparedAbility:0},capacityBlocked:0,stockouts:0,dayReached:{},metaMastery:0,metaDistinct:0,metaStore:0,knowledge:0,revenue:0,spend:0,actions:0,easter:0,easterRuns:0,
  /* v2.8 Re-measure pass (SA-Q48/49/50 aggregate impact), measurement only. modesByBand and
     modesByLoyalty are the same acceptance/attempt counters `modes` already keeps, split by the
     Day band the attempt fell in and by the buyer's Loyalty at the moment of the attempt, so the
     150%/overcharge trade-off and the flat-0.80 need change can be read across the Run instead of
     only in aggregate. walletFresh/walletReturning/walletCap split the existing visit-time wallet
     sample by ECONOMY_ORDER_v2.8 §ORDINARY NPC WALLET ON VISIT's own fresh/returning branch and
     flag the 2000 cap it is clamped to. deepCollapse counts a rescue (till went negative and stock
     was liquidated) landing within 3 Days of a Deep sponsorship - an approximation, not a causal
     claim, and stated as such in the report. */
  modesByBand:{},modesByLoyalty:{},walletFresh:[],walletReturning:[],walletCapSamples:0,walletCapHits:0,
  deepCollapse:{samples:0,collapsed:0},
  /* v2.8 Re-measure follow-up. Store Gold at a few fixed Day checkpoints, sampled at the same
     start-of-ORDER point `days[d].cash` already reads, kept as raw per-Run samples (not just a
     mean) so an arm-to-arm comparison can carry sample size, median and spread instead of only
     an ending-Gold mean that mixes Runs which ended on different Days. */
  goldCheckpoints:{5:[],10:[],15:[],20:[],25:[],29:[]},
  /* 2026-09-12 amendment, measurement only. greatByBand buckets Great Success by how far the
     prepared Combat ability ran ahead of the Gate, which is the thing Stage 9 has to judge the
     curve on; prepStartGold samples the D29 close, before any D30 preparation spend. */
  great:{success:0,great:0,storeGold:0,byBand:{}},deepDays:0,deepTaken:0,deepOffered:0,deepSponsor:0,deepCosts:[],deepByRarity:{},deepByLevel:{},deepSkipped:0,
  prepStartGold:[],wallet2Slot:{samples:0,afford:0,used:0},
  npc:{samples:0,alive:0,level:0,maxLevel:0,loyalty:0,regulars:0,wallet:0,growth:0},bands:{},
  final:{reached:0,party:0,full:0,resolved:0,power:0,assault:0,margin:0,cleared:0},
  /* Party-size counterfactual: the strongest legal 1 / 2 / 3 party at the SAME generated D30
     state, same disclosed Families and Hazards. Measurement only — no Final rule changes. */
  partySize:{1:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0},2:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0},3:{samples:0,power:0,chance:0,assaultLo:0,assaultHi:0}},
  /* RUN-Q15: the Final value of an invested regular against a late newcomer, classified from
     the visit and loyalty history the run already keeps. */
  q15:{runs:0,invested:[],newcomer:[],chosenInvested:0,chosenNewcomer:0,powerInvested:0,powerNewcomer:0},
  /* Stage 9 / SC-4. Job performance is not one number: the same Job reads differently against
     a Family than it does against a Boss, and a Job Balance call made from either alone is the
     `one Job acts as a key` failure DUNGEON_HAZARD BALANCE TARGET rejects. Both axes, crossed. */
  familyJob:{},bossJob:{},
  /* Stage 9 / SE-2. How concentrated a Run's investment is: how many distinct people were
     supplied at all, how many were supplied repeatedly, and what share went to the one who
     got the most. A one-NPC funnel and `everyone drifts past equally` are both failures. */
  concentration:{runs:0,supplied:[],repeat:[],topShare:[]},
  /* Stage 9 / SE-4. A loss that missed by a little is a different Run from one that was never
     close, and only the first teaches anything. Measured from the resolved Final margin. */
  nearMiss:{losses:0,margins:[],within10:0,within25:0},
  /* Stage 10 §Q. The Gold ledger the Run already writes per Day (reportHistory), summed by
     where it came from and where it went, so SALE-origin share is read rather than guessed.
     Overhead is sampled with the Core Roster that produced it, so the Day x quality formula
     can be checked against the store it was charged to. spawnByMastery counts what the Job
     Mastery spawn roll actually did, per rank. All measurement-only. */
  goldIn:{sale:0,greatSuccess:0,subsidy:0,liquidation:0},
  goldOut:{order:0,operating:0,relic:0,deepSponsor:0,commission:0,waste:0,reroll:0},
  overhead:{samples:[],byBand:{},coreLevel:[],coreRarity:[]},bossRuns:{},
  /* POLICY SENSITIVITY, measurement only. What the automatic player actually did with the
     preparation levers it has, read off the same prepared states the night already builds -
     no second formula and no information the SALE screen does not disclose. */
  prep:{samples:0,slots:0,packed:0,fullBag:0,emptyBag:0,counterRelevant:0,counterMatched:0,
   bandBefore:{},bandAfter:{},bandImproved:0,bandWorse:0,ratioBare:[],ratioReady:[]},
  /* Where a run's expeditions lose the final outcome, banded by the Day the Director named. */
  phase:{},
  /* Measurement only: nothing here grants or spends Store Capital.
     `sales` is each Run's Gross Sales and `gains` its Store Capital gain, by META_v2.8
     §Run-end settlement structure exactly: round(Gross Sales x the reached-Day rate). The band
     and end-reason totals beside them are views of the same Runs. */
  settlement:{runs:0,gold:0,byBand:{},byEnd:{},sales:[],gains:[]},
  refusal:{},saleGap:{filled:0,noStock:0,wallet:0,refusedAll:0,other:0},
  /* Three different shortages that the old single `stockouts` counter ran together. It rose when
     the shelf happened to be empty after the last customer left, which is neither "the store had
     nothing to sell today" nor "a customer was turned away empty". Counted apart:
       emptyStart      SALE opened with an empty shelf
       earlyDepletion  the shelf ran out while customers were still queued (once per Day)
       saleGap.noStock a customer for whom nothing could be offered at all
     capacityDay is the same correction on the other side: Days where the ceiling refused at
     least one order the policy wanted, counted once, next to the raw attempt count. */
  shortage:{emptyStart:0,earlyDepletion:0,capacityDay:0,saleDays:0,orderDays:0},
  rerollDepth:{},
  /* What a Day's offer sheet actually looks like. Shrinking the sheet only makes ordering a
     decision if the slots left are still a choice, so the counter guarantee - which replaces the
     LAST slot rather than adding one - has to be counted against the sheet it is replacing in. */
  offerShape:{days:0,slots:0,unique:0,dupes:0,counterSlots:0,counterHeavy:0,pityFired:0,
   missingCounterDays:0,rerolls:0,rerollSpend:0,thin:0},
  deepNominee:{count:0,cost:0,levelAtNomination:0,levelAtEnd:0,grew:0,alive:0,finalSeat:0,rarity:0,finalSeats:0},
  rescue:{events:0,gold:0,items:0,runs:0,used:[]},
  reachBy:{10:0,20:0,25:0,30:0}};
}
/* Percentile of a measured sample. Measurement only: nothing in the game reads it. */
function pct(xs,q){if(!xs||!xs.length)return 0;const a=[...xs].sort((x,y)=>x-y);
 return a[Math.min(a.length-1,Math.max(0,Math.round(q*(a.length-1))))];}
/* Sample size, mean and the percentile spread for one measured distribution - the exact shape
   AGENTS.md §7/§16 requires every reported number to carry, not just a single-run mean. */
function sampleStats(xs){if(!xs||!xs.length)return {count:0,mean:0,median:0,p10:0,p90:0};
 return {count:xs.length,mean:xs.reduce((a,b)=>a+b,0)/xs.length,median:pct(xs,.5),p10:pct(xs,.1),p90:pct(xs,.9)};}
function derive(out,count){
 for(const [day,values]of Object.entries(out.wallets)){if(!Array.isArray(values))continue;values.sort((a,b)=>a-b);out.wallets[day]={count:values.length,mean:values.reduce((a,b)=>a+b,0)/values.length,p10:values[Math.floor(values.length*.1)],median:values[Math.floor(values.length*.5)],p90:values[Math.floor(values.length*.9)]};}
 const days=Object.entries(out.dayReached).reduce((a,[d,n])=>a+Number(d)*n,0);
 return {...out,averageDay:days/count,easterPerRun:out.easter/count,deepDaysPerRun:out.deepDays/count,deepTakenPerRun:out.deepTaken/count,deepOfferedPerRun:out.deepOffered/count,deepSponsorPerRun:out.deepSponsor/count,deepSkippedPerRun:out.deepSkipped/count,
  deepCostP10:pct(out.deepCosts,.1),deepCostP25:pct(out.deepCosts,.25),deepCostMedian:pct(out.deepCosts,.5),
  deepCostP75:pct(out.deepCosts,.75),deepCostP90:pct(out.deepCosts,.9),
  greatSuccessRate:out.great.success?out.great.great/out.great.success:0,greatStoreGoldPerRun:out.great.storeGold/count,
  prepStartGoldMedian:pct(out.prepStartGold,.5),prepStartGoldP10:pct(out.prepStartGold,.1),prepStartGoldP25:pct(out.prepStartGold,.25),
  prepStartGoldP75:pct(out.prepStartGold,.75),prepStartGoldP90:pct(out.prepStartGold,.9),easterRunRate:out.easterRuns/count,masteryPerRun:out.metaMastery/count,distinctPerRun:out.metaDistinct/count,
  deathsP10:pct(out.deathsPerRun,.1),deathsMedian:pct(out.deathsPerRun,.5),deathsP90:pct(out.deathsPerRun,.9),
  deathFailRate:out.endedBy.deaths/count,deathFailDayMedian:pct(out.deathFailDay,.5),
  reach10:out.reachBy[10]/count,reach20:out.reachBy[20]/count,reach25:out.reachBy[25]/count,reach30:out.reachBy[30]/count,
  goldInTotal:Object.values(out.goldIn).reduce((a,b)=>a+b,0),
  goldOutTotal:Object.values(out.goldOut).reduce((a,b)=>a+b,0),
  saleOriginShare:(()=>{const t=Object.values(out.goldIn).reduce((a,b)=>a+b,0);return t?out.goldIn.sale/t:0;})(),
  overheadMedian:pct(out.overhead.samples,.5),overheadP10:pct(out.overhead.samples,.1),overheadP90:pct(out.overhead.samples,.9),
  overheadByBand:Object.fromEntries(Object.entries(out.overhead.byBand).map(([b,v])=>[b,{p25:pct(v,.25),median:pct(v,.5),p75:pct(v,.75)}])),
  coreLevelMedian:pct(out.overhead.coreLevel,.5),coreRarityMedian:pct(out.overhead.coreRarity,.5),
  suppliedPerRun:out.concentration.runs?out.concentration.supplied.reduce((a,b)=>a+b,0)/out.concentration.runs:0,
  repeatSuppliedPerRun:out.concentration.runs?out.concentration.repeat.reduce((a,b)=>a+b,0)/out.concentration.runs:0,
  topShareMedian:pct(out.concentration.topShare,.5),
  nearMissWithin10:out.nearMiss.losses?out.nearMiss.within10/out.nearMiss.losses:0,
  nearMissWithin25:out.nearMiss.losses?out.nearMiss.within25/out.nearMiss.losses:0,
  lossMarginMedian:pct(out.nearMiss.margins,.5),lossMarginP90:pct(out.nearMiss.margins,.9),
  endedBy:out.endedBy,clearsPerRun:out.wins/count,actionsPerRun:out.actions/count,actionsPerDay:out.actions/Math.max(1,days),knowledgePerRun:out.knowledge/count,reachRate:out.reached30/count,bossWinGivenReach:out.reached30?out.wins/out.reached30:0,overallClearRate:out.wins/count,averageDeaths:out.deaths/count,averageMoney:out.money/count,
  walletCapRate:out.walletCapSamples?out.walletCapHits/out.walletCapSamples:0,
  walletFreshStats:sampleStats(out.walletFresh),walletReturningStats:sampleStats(out.walletReturning),
  deepCollapseRate:out.deepCollapse.samples?out.deepCollapse.collapsed/out.deepCollapse.samples:0,
  goldCheckpointStats:Object.fromEntries(Object.entries(out.goldCheckpoints).map(([d,xs])=>[d,sampleStats(xs)]))};
}

/* One Run, played by `ctx.policy` on the account the caller owns. The account is NOT copied
   here: `simulate` hands in a fresh one per seed, `trajectory` hands in the same one every
   time so real Meta progression carries forward. */
function playRun(g,out,ctx){
 const {policy,pricing,build,seed}=ctx,engagement=levers(policy),spend=spending(policy),s=g.run;
 /* RELIC-AWARE LAYER, measurement only (ctx.relicAware, default off). The policies above were
    written before most Store Supports existed, so a Support whose value comes from a choice the
    player makes (150% sales, 3-of-a-SKU orders, a Counter for the Gate) read as ~0 because the
    simulated player never makes that choice. When on, and ONLY while that Support is owned, a
    few small rules make the choice from state the player can see. Off, nothing below changes. */
 const aware=!!ctx.relicAware,owns=id=>aware&&g.has(id),RP=D.relicParams;
 let turns=0;const seenWindows=new Set();let previousCandidates=[];let deepWatches=[];
 /* Interaction-cost proxy: one tick per action a player would actually have to perform. */
 const act=(n=1)=>{out.actions+=n;};
 const stat=d=>out.days[d]??={samples:0,cash:0,wallet:0,level:0,inventory:0,peak:0,visitors:0,actual:0,consumed:0,slots:0,waste:0,revenue:0,cogs:0,spent:0,operating:0,loyalty:0,injury:0,death:0,overAffordable:0,fullAffordable:0,halfOnly:0,offers:0};
 function itemValue(n,it,d){const known=policy==='skilled'?d.hazards:G.Presentation?G.Presentation.known(d,g):d.hazards;const hz=known.reduce((a,h)=>a+Math.max(0,it.effects[h]||0)*.5,0);let v=(it.effects.combat||0)*.55+(it.effects.survival||0)*.6+(it.effects.mobility||0)*.25+(it.effects.spirit||0)*.3+(d.requiredSupply||0)*(it.effects.supply||0)*.2+hz;
 /* aware: 야전 정비대 / 원정 전문 인증 multiply the Counter an Item brings to the Gate this
    adventurer enters - value that Hazard term by the same factor the game will apply. Only when
    supplying an adventurer (n given), not when ranking the order sheet. */
 if(aware&&n&&hz){const f=(owns('medicine')&&it.category==='gear'?RP.medicine.counterMult:1)*(owns('expeditionCert')&&G.Relics.counter(it,d.hazards)?RP.expeditionCert.counterMult:1);v+=hz*(f-1);}if(policy==='beginner')return it.sell*.03;if(policy==='greedy')return it.sell*.09;if(policy==='random')return (it.buy*13+seed+s.day)%37;if(policy==='skilled'){if(n?.traits.includes('eater')&&it.category==='food')v+=((it.effects.supply||0)+(it.effects.survival||0))*.4;}if(policy==='protective')v+=(it.effects.escape||0)*35+(it.effects.revive||0)*45;return v;}
 /* The counter guarantee overwrites the last slot, so whether it fired can only be read from the
    state BEFORE the sheet is rolled. Measurement only - the call is passed straight through. */
 const nominees={};
 /* Per-Day flags for the shortage and capacity metrics, cleared as each Day's ORDER opens. */
 let capacityHit=false,depletedToday=false;
 /* The candidate order the ordering loop below uses. Shared with the planner so the two cannot
    drift: whatever the loop would work through is what the plan walks. */
 const sortedOffers=()=>s.offers.map((o,i)=>({o,i})).sort((a,b)=>{
  const v=o=>itemValue(null,D.itemBy[o.item],s.dungeons[0])/Math.sqrt(o.price)+(D.itemBy[o.item].sell-o.price)/o.price;
  return v(b.o)-v(a.o);});
 /* What that loop would spend on the sheet as it stands, computed without touching any state.
    Same rounds, same stock target, same floor, same capacity rule - it is the ordering loop,
    dry. The reroll decision leaves room for this, so looking again can never cost the store the
    money it was about to buy stock with. Prices are summed as listed; the cart's relic quote can
    come out slightly under, which makes the plan a conservative estimate rather than a loose one. */
 const plannedOrderSpend=(sorted,money)=>{
  let cost=0,count=0;const left={};
  const target=s.queue.length*(policy==='protective'?2.5:spend.stockPerVisitor)+spend.stockSlack;
  for(let round=0;round<4;round++)for(const {o,i} of sorted){
   if(s.inventory.length+count>=target)return cost;
   const remaining=left[i]===undefined?o.quantity:left[i];
   if(!remaining)continue;
   if(money-cost-o.price<spend.cashFloor)continue;
   if(s.inventory.length+count+1>g.capacity())continue;
   left[i]=remaining-1;cost+=o.price;count++;
  }
  return cost;};
 const originalOffers=g.generateOffers.bind(g);g.generateOffers=(opts)=>{
  const armed=(s.pity.counter||0)>=3;
  const r=originalOffers(opts);if(armed)out.offerShape.pityFired++;return r;};
 const saleBand=d=>d<=9?'D1-9':d<=19?'D10-19':d<=24?'D20-24':'D25-29';
 const loyaltyBand=v=>v<20?'<20':v<=50?'20-50':'51+';
 const originalSell=g.sell.bind(g);g.sell=(id,mode)=>{const m=out.modes[mode]??={attempts:0,accepted:0,revenue:0,profit:0,loyalty:0};m.attempts++;act();const n=g.current(),st=s.inventory.find(x=>x.id===id),old=n.loyalty;
  const mb=(out.modesByBand[saleBand(s.day)]??={})[mode]??=(out.modesByBand[saleBand(s.day)][mode]={attempts:0,accepted:0});mb.attempts++;
  const ml=(out.modesByLoyalty[loyaltyBand(old)]??={})[mode]??=(out.modesByLoyalty[loyaltyBand(old)][mode]={attempts:0,accepted:0});ml.attempts++;
  const ok=originalSell(id,mode);if(ok){m.accepted++;mb.accepted++;ml.accepted++;m.revenue+=n.history.at(-1).paid;m.profit+=n.history.at(-1).paid-(st.cost||0);m.loyalty+=n.loyalty-old;(out.items[st.item]??={ordered:0,sold:0}).sold++;}
  /* Why an offer did not close, measurement only. The purchase-intent threshold moved for 정가
     and the acceptance rate did not, so the refusal has to be decomposed before anyone moves a
     second number: the reason the shop already records is price burden / low need / the roll. */
  else{const r=n.refusalReasons?.at(-1)?.reason||'choice';const g2=out.refusal[mode]??={price:0,need:0,roll:0};
   g2[r==='price'?'price':r==='need'?'need':'roll']++;}
  return ok;};
 const originalNight=g.night.bind(g);g.night=()=>{const day=stat(s.day);day.slots+=s.queue.reduce((a,id)=>a+G.Adventurer.slots(s.npcs.find(n=>n.id===id)),0);day.consumed+=s.queue.reduce((a,id)=>a+s.npcs.find(n=>n.id===id).pack.length,0);
 for(const id of s.queue){const n=s.npcs.find(n=>n.id===id),d=s.dungeons[n.destination],a=G.Dungeon.prepare({...n,pack:[]},d,s.facilities),b=G.Dungeon.prepare(n,d,s.facilities);
  /* The bag as it actually departs, the Hazard readiness before and after what was given, and
     how far the prepared Combat ability stands against what this Gate asks. The readiness band
     is the weakest Hazard - the same one the SALE readout shows - so improving it means the
     expedition's worst exposure actually moved. */
  {const P=out.prep,slots=G.Adventurer.slots(n);
   P.samples++;P.slots+=slots;P.packed+=n.pack.length;
   P.fullBag+=Number(n.pack.length>=slots);P.emptyBag+=Number(n.pack.length===0);
   const worst=e=>{const rank={'취약':0,'불안':1,'대응':2,'충분':3};
    return d.hazards.map(h=>G.Dungeon.hazardState(h,e,d))
     .reduce((w,x)=>w&&rank[w.label]<=rank[x.label]?w:x,null);};
   const wb=worst(a.effects),wa=worst(b.effects);
   if(wb&&wa){const rank={'취약':0,'불안':1,'대응':2,'충분':3};
    P.bandBefore[wb.label]=(P.bandBefore[wb.label]||0)+1;
    P.bandAfter[wa.label]=(P.bandAfter[wa.label]||0)+1;
    P.bandImproved+=Number(rank[wa.label]>rank[wb.label]);
    P.bandWorse+=Number(rank[wa.label]<rank[wb.label]);}
   /* A Counter is "relevant" when this Gate has a Hazard at all and the shelf could have
      answered it; "matched" when what actually departed answers one of them. */
   if(d.hazards.length){
    const shelf=s.inventory.map(x=>D.itemBy[x.item]);
    if(shelf.some(it=>G.Relics.counter(it,d.hazards))||n.pack.some(id=>G.Relics.counter(D.itemBy[id],d.hazards)))P.counterRelevant++;
    if(n.pack.some(id=>G.Relics.counter(D.itemBy[id],d.hazards)))P.counterMatched++;}
   P.ratioBare.push(G.Dungeon.preparedPower(a.effects)/(d.power||1));
   P.ratioReady.push(G.Dungeon.preparedPower(b.effects)/(d.power||1));}const ability=p=>G.Dungeon.preparedPower(p.effects);out.impact.characterAbility+=ability(a);out.impact.preparedAbility+=ability(b);out.impact.samples++;const rng=new G.RNG(s.seed,g.rng.state),bare=G.Dungeon.resolve({...copy(n),pack:[]},d,new G.RNG(s.seed,rng.state),s.facilities),ready=G.Dungeon.resolve(copy(n),d,rng,s.facilities);const rank={'사망':0,'중상':1,'부상':2,'퇴각':3,'성공':4,'대성공':5};if(rank[ready.outcome]>rank[bare.outcome])out.impact.improved++;if(bare.outcome==='사망'&&ready.outcome!=='사망')out.impact.saved++;}
 originalNight();
 /* 2026-09-12 amendment measurement. Banding by prepared Combat margin is what lets Stage 9
    judge the Great Success curve on evidence instead of on the shipped number. */
 for(const report of s.results){
  if(['성공','대성공'].includes(report.outcome)){out.great.success++;
   const m=report.greatMargin,band=m<0?'<0':m<.1?'0-.1':m<.26?'.1-.26':m<.5?'.26-.5':m<1?'.5-1':'1+';
   const bb=out.great.byBand[band]??={success:0,great:0};bb.success++;
   if(report.outcome==='대성공'){out.great.great++;bb.great++;}}
  out.great.storeGold+=report.storeBonus||0;
  if(report.deep)out.deepTaken++;
 }
 /* DUN §DAY BAND decomposition: one expedition followed from the combat roll through the
    environment and injury steps to the outcome it ended on, so the stage that loses the
    success can be named rather than inferred. Everything here is what resolve already
    recorded on the report. */
 for(const report of s.results){const g2=report.debug;if(!g2)continue;
  const pb=s.day<=9?'D1-9':s.day<=19?'D10-19':s.day<=24?'D20-24':'D25-29';
  const P=out.phase[pb]??={expeditions:0,combatWon:0,affected:0,wonThenLost:0,ratio:[],tier:{},
   success:0,retreat:0,injury:0,severe:0,death:0,deathChance:0,deathRolls:0,combatDeficit:0,envDeficit:0,injuredStart:0};
  P.expeditions++;P.combatWon+=Number(g2.combatSuccess);P.affected+=Number(g2.affected);
  P.ratio.push(g2.ability/(g2.power||1));
  P.wonThenLost+=Number(g2.combatSuccess&&!['성공','대성공'].includes(report.outcome));
  P.success+=Number(['성공','대성공'].includes(report.outcome));
  P.retreat+=Number(report.outcome==='퇴각');P.injury+=Number(report.outcome==='부상');
  P.severe+=Number(report.outcome==='중상');P.death+=Number(report.outcome==='사망');
  const dg=s.dungeons.find(x=>x.id===report.dungeon),tier=dg?.tier||1;
  const T=P.tier[tier]??={expeditions:0,combatWon:0,affected:0};
  T.expeditions++;T.combatWon+=Number(g2.combatSuccess);T.affected+=Number(g2.affected);
  if(typeof g2.deathChance==='number'&&!['성공','대성공'].includes(report.outcome)){
   P.deathRolls++;P.deathChance+=g2.deathChance;
   const risk=G.Dungeon.failureDeathRisk({...s.npcs.find(n=>n.id===report.npcId),injury:report.injury},dg||{power:g2.power,hazards:[]},s.facilities);
   P.combatDeficit+=risk.combatDeficit;P.envDeficit+=risk.environmentDeficit;}
 }
 for(const report of s.results){const band=s.day<=3?'D1-3':s.day<=7?'D4-7':s.day<=12?'D8-12':s.day<=18?'D13-18':'D19-29';const bd=out.bands[band]??={expeditions:0,packed:0,items:0,success:0,retreat:0,injury:0,severe:0,death:0};bd.expeditions++;bd.items+=report.items.length;bd.packed+=Number(report.items.length>0);bd.success+=Number(['성공','대성공'].includes(report.outcome));bd.retreat+=Number(report.outcome==='퇴각');bd.injury+=Number(report.outcome==='부상');bd.severe+=Number(report.outcome==='중상');bd.death+=Number(report.outcome==='사망');const npc=s.npcs.find(n=>n.id===report.npcId),d=s.dungeons.find(d=>d.id===report.dungeon);for(const [table,key] of [[out.jobs,npc.job],[out.dungeons,(d?.family||report.dungeon)+':'+(d?.tier||1)],[out.familyJob,(d?.family||report.dungeon)+':'+npc.job]]){const bucket=table[key]??={expeditions:0,success:0,retreat:0,injury:0,severe:0,death:0,consumed:0};bucket.expeditions++;bucket.success+=Number(['성공','대성공'].includes(report.outcome));bucket.retreat+=Number(report.outcome==='퇴각');bucket.injury+=Number(report.outcome==='부상');bucket.severe+=Number(report.outcome==='중상');bucket.death+=Number(report.outcome==='사망');bucket.consumed+=report.items.length;}}day.actual+=s.results.length;day.death+=s.results.filter(r=>r.outcome==='사망').length;day.injury+=s.results.filter(r=>r.outcome==='중상').length;for(const k of ['waste','revenue','cogs','spent','operating'])day[k]+=s.daily[k]||0;
 };
 function buySupport(){const w=s.relicWindow;if(!w||w.purchased)return;if(!seenWindows.has(w.milestoneDay)){seenWindows.add(w.milestoneDay);out.offerRepeats+=w.candidateIds.filter(id=>previousCandidates.includes(id)).length;previousCandidates=[...w.candidateIds];for(const id of w.candidateIds)out.relicOffers[id]=(out.relicOffers[id]||0)+1;out.windowDiversity.push(new Set(w.candidateIds.flatMap(id=>D.relicBy[id].tags)).size);}if(build==='none'&&s.phase!=='foundation')return;if(engagement.relics==='free'&&s.phase!=='foundation')return;const candidates=w.candidateIds.slice().sort((a,b)=>{const val=id=>{const r=D.relicBy[id],tags=s.facilities.flatMap(id=>D.relicBy[id]?.tags||[]);return (build==='hybrid'?r.tags.filter(t=>tags.includes(t)).length:r.tags.includes(build)?3:0)+(r.kind==='keystone'?.5:0);};return val(b)-val(a);});for(const id of candidates){const cost=w.candidatePrices[w.candidateIds.indexOf(id)];if(s.money-cost<(s.phase==='foundation'?0:s.day===30?180:spend.relicReserve))continue;const purchaseDay=s.phase==='foundation'?0:s.day;g.buyRelic(id);act();out.relicSpend+=cost;const r=out.relicPurchases[id]??={count:0,day:0,spend:0};r.count++;r.day+=purchaseDay;r.spend+=cost;break;}}

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
  if(s.phase==='order'){buySupport();capacityHit=false;depletedToday=false;out.shortage.orderDays++;
   {const o=out.offerShape,known=G.Relics.known(g),items=s.offers.map(x=>D.itemBy[x.item]);
    const uniq=new Set(s.offers.map(x=>x.item)).size;
    const counters=items.filter(it=>G.Relics.counter(it,known)).length;
    const need=[...new Set(s.dungeons.flatMap(d=>d.hazards||[]))].filter(h=>known.includes(h));
    o.days++;o.slots+=s.offers.length;o.unique+=uniq;o.dupes+=s.offers.length-uniq;
    o.counterSlots+=counters;o.counterHeavy+=Number(counters*2>=s.offers.length);
    o.thin+=Number(s.offers.length-counters<=3);
    o.missingCounterDays+=Number(need.some(h=>!items.some(it=>G.Relics.counter(it,[h]))));}
   /* Take this sheet or pay to look again. Same poor-sheet test as before, re-applied after each
      reroll, and the price is now weighed against what the store is about to spend on stock as
      well as against the floor: the till has to still clear cashFloor AFTER both the next reroll
      and the order this sheet would produce. That is what stops looking from eating the buying.
      Not "reroll until the wanted item shows up" - it stops the moment the sheet is not poor. */
   if(spend.reroll){let used=0;
    const poor=()=>s.offers.reduce((a,o)=>o.quantity?Math.max(a,itemValue(null,D.itemBy[o.item],s.dungeons[0])):a,0)<8;
    while(poor()&&used<20){
     const cost=g.rerollPrice(),planned=plannedOrderSpend(sortedOffers(),s.money);
     if(s.money-cost-planned<spend.cashFloor)break;
     try{g.reroll();}catch(e){break;}
     act();used++;out.offerShape.rerolls++;out.offerShape.rerollSpend+=cost;}
    out.rerollDepth[Math.min(4,used)]=(out.rerollDepth[Math.min(4,used)]||0)+1;}
   const day=stat(s.day);day.samples++;day.cash+=s.money;day.inventory+=s.inventory.length;day.visitors+=s.queue.length;if(out.goldCheckpoints[s.day])out.goldCheckpoints[s.day].push(s.money);const visitors=s.queue.map(id=>s.npcs.find(n=>n.id===id));(out.wallets[s.day]??=[]).push(...visitors.map(n=>n.money));day.wallet+=visitors.reduce((a,n)=>a+n.money,0);day.level+=visitors.reduce((a,n)=>a+n.level,0);day.loyalty+=visitors.reduce((a,n)=>a+n.loyalty,0);
   for(const n of visitors){(n.introduced?out.walletReturning:out.walletFresh).push(n.money);out.walletCapSamples++;if(n.money>=2000)out.walletCapHits++;}
   for(const n of visitors)for(const o of s.offers){const it=D.itemBy[o.item];day.offers++;if(n.money>=Math.round(it.sell*D.pricing.overcharge.mult))day.overAffordable++;if(n.money>=it.sell)day.fullAffordable++;else if(n.money>=Math.round(it.sell*.5))day.halfOnly++;}
   const offers=sortedOffers();
   if(engagement.order==='minimum'){const cheap=s.offers.map((o,i)=>({o,i})).filter(x=>x.o.quantity).sort((a,b)=>a.o.price-b.o.price)[0];if(cheap&&s.money-cheap.o.price>=600&&g.canStock(D.itemBy[cheap.o.item]))try{g.setQuantity(cheap.i,1);act();(out.items[cheap.o.item]??={ordered:0,sold:0}).ordered++;}catch(e){}}
   else if(engagement.order)for(let round=0;round<4;round++)for(const {o,i}of offers){if(s.inventory.length+Object.values(s.cart||{}).reduce((a,b)=>a+b,0)>=s.queue.length*(policy==='protective'?2.5:spend.stockPerVisitor)+spend.stockSlack)break;if(o.quantity&&s.money-g.cartTotal()-o.price>=spend.cashFloor){if(!g.canStock(D.itemBy[o.item])){out.capacityBlocked++;capacityHit=true;continue;}
    /* canStock only weighs what is already on the shelf, so the cart is what actually hits the
       warehouse ceiling - and setQuantity throws for it. Counting only the pre-check reported a
       flat zero while the ceiling was really binding, so the throw is counted here too. */
    try{g.setQuantity(i,(s.cart?.[i]||0)+1);act();(out.items[o.item]??={ordered:0,sold:0}).ordered++;
     /* aware: 묶음발주 계약, or 물류 본부계약 once yesterday's sales armed it - an Item the policy
        already chose is rounded up to 3 of that SKU when this offer holds enough, the till still
        clears cashFloor after the discounted quote, and the warehouse takes it (validateCart). */
     if(owns('bulk')||owns('logisticsHQ')&&s.previousSales>=6){
      const cart=s.cart||{},same=Object.keys(cart).filter(j=>s.offers[j].item===o.item).reduce((a,j)=>a+cart[j],0),want=cart[i]+3-same;
      if(same<3&&want<=o.quantity&&s.money-g.cartTotal({...cart,[i]:want})>=spend.cashFloor)
       try{g.setQuantity(i,want);act();out.items[o.item].ordered+=3-same;}catch(e){}}}
    catch(e){if(String(e?.message||'').includes('창고')){out.capacityBlocked++;capacityHit=true;}}}}
   if(capacityHit)out.shortage.capacityDay++;
   g.confirmOrder();act();day.peak+=s.inventory.length;g.open();act();
   /* SALE opened. An empty shelf here is a different failure from running out mid-Day. */
   if(s.phase==='sell'||s.queue.length){out.shortage.saleDays++;if(!s.inventory.length)out.shortage.emptyStart++;}
  }else if(s.phase==='sell'){
   const n=g.current();if(!engagement.sell){g.depart();act();continue;}if(policy==='neglect'&&n.level<Math.max(...s.npcs.filter(x=>x.alive).map(x=>x.level))-2){g.depart();act();continue;}
   /* 2026-09-12 amendment, measurement only. An engaged shop takes the Deep Expedition when it
      is offered and affordable, which is the upper bound on participation rather than a model of
      how a player chooses - Stage 9 reports offers and takes separately so both are visible. */
   if(s.deep?.today&&!s.deep.today.nomineeId)out.deepOffered+=Number(!!g.canNominateDeep(n));
   if(s.deep?.today&&!s.deep.today.nomineeId&&!g.canNominateDeep(n)&&s.money<g.deepCost(n))out.deepSkipped++;
   if(engagement.order&&g.canNominateDeep(n)){const cost=g.deepCost(n);g.nominateDeep(n.id);act();
    out.deepSponsor+=cost;out.deepCosts.push(cost);
    const byR=out.deepByRarity[n.rarity]??={takes:0,gold:0,level:0};byR.takes++;byR.gold+=cost;byR.level+=n.level;
    const band=n.level<5?'1-4':n.level<10?'5-9':n.level<15?'10-14':'15+';
    const byL=out.deepByLevel[band]??={takes:0,gold:0};byL.takes++;byL.gold+=cost;
    /* Who was sponsored, and what became of them. A sponsorship is an investment in one
       adventurer, so the sink can only be judged next to the growth and the Final seat it buys. */
    (nominees[n.id]??={levelAtNomination:n.level,rarity:n.rarity,cost:0}).cost+=cost;out.deepCollapse.samples++;deepWatches.push(s.day);}
   const d=g.claimedGateFor(n);let attempts=0;
   while(n.pack.length<G.Adventurer.slots(n)&&attempts++<15){const options=[];for(const st of s.inventory){const it=D.itemBy[st.item];let mode=pricing==='overcharge'?'overcharge':pricing==='full'?'full':pricing==='half'?'half':pricing==='vip'?(n.level>=Math.max(...s.npcs.map(x=>x.level))-1?'half':'full'):policy==='greedy'?'overcharge':policy==='protective'?'half':n.level>=6&&n.loyalty<50?'half':'full';if(pricing==='adaptive'&&policy!=='protective'&&policy!=='greedy'&&n.money>it.sell*2&&n.loyalty>50)mode='overcharge';/* aware: 왕도 프리미엄 인증 - 150% whenever the wallet comfortably covers it, by the same
    wallet test the adaptive rule already uses (more than twice the list price), without its
    loyalty gate; not re-offered at 150% once this customer refused it. */
 if(pricing==='adaptive'&&policy!=='protective'&&policy!=='greedy'&&owns('royalCert')&&n.money>it.sell*2&&!n.refused.includes(it.id+':overcharge'))mode='overcharge';
 if(pricing==='adaptive'&&n.money<g.interest(n,it,mode).debit)mode='half';const intent=g.interest(n,it,mode);if(intent.debit>n.money||n.refused.includes(it.id+':'+mode))continue;options.push({st,mode,v:itemValue(n,it,d)+(st.expires?5/(st.expires-s.day+1):0),
    /* aware: 길드 납품 인증 pays on a rare+ Item that Counters this adventurer's Gate, or on
       rare+ insurance, so those are offered first; value decides within each group. (단골 묶음혜택
       needs no rule: this loop already fills a 단골's second slot, and interest() already
       prices that second Item at the bundled debit.) */
    pref:aware?Number(owns('supplyCert')&&it.rarity>=2&&(G.Relics.counter(it,d.hazards)||!!it.effects.escape||!!it.effects.revive)):0});}
   if(aware)options.sort((a,b)=>(b.pref-a.pref)||(b.v-a.v));else options.sort((a,b)=>b.v-a.v);if(!options.length)break;g.sell(options[0].st.id,options[0].mode);}
   if(!s.inventory.length)out.stockouts++;
   /* The shelf ran out with customers still to come. Once per Day: the flag is cleared when the
      Day's SALE opens, not here, so a Day with three empty-handed customers still counts one. */
   if(!s.inventory.length&&s.cursor+1<s.queue.length&&!depletedToday){depletedToday=true;out.shortage.earlyDepletion++;}
   /* And the same question one level up: a visitor who leaves with an empty slot. Slot pressure,
      an empty shelf and a wallet that cannot reach any shelf price are different problems from a
      refusal, and only this split says which one the 정가 threshold was ever able to touch. */
   {const gap=out.saleGap;
    if(n.pack.length>=G.Adventurer.slots(n))gap.filled++;
    else if(!s.inventory.length)gap.noStock++;
    else{const purse=n.money+(n.eventBudget||0);
     let affordable=0,fresh=0;
     for(const st of s.inventory){const it=D.itemBy[st.item];
      if(purse>=g.interest(n,it,'full').debit)affordable++;
      if(!n.refused.includes(it.id+':full'))fresh++;}
     if(!affordable)gap.wallet++;else if(!fresh)gap.refusedAll++;else gap.other++;}}
   g.depart();act();
  }else if(s.phase==='night'){g.finishNight();act();}
  else if(s.phase==='closing'){
   /* Stage 10 §Q. The roster the overhead was charged against, sampled on the Day it was
      charged, so the Day x quality formula can be read back against the store it billed. */
   {const core=g.coreRoster();
    out.overhead.coreLevel.push(core.length?core.reduce((a,n)=>a+n.level,0)/core.length:1);
    out.overhead.coreRarity.push(core.length?core.reduce((a,n)=>a+n.rarity,0)/core.length:0);}
   /* The opening stock is the only stock a meta-farm run ever holds; turning it into cash on
      the first Closing is an ordinary 재고 정리 action and buys more days per interaction. */
   /* 재고 정리 is now a Closing-only rescue, capped per Run, so the adversarial policy can no
      longer cash the opening shelf out on DAY 1 - it can only trade its way out of a short
      Closing, the same as anyone else. The loop stops when the till is square or the rule
      refuses, and the refusal is what ends a Run that has spent its three rescues. */
   const rescueBefore=s.rescueUsed||0,liquidBefore=s.daily.liquidation||0;
   while(s.money<0&&s.inventory.length&&g.liquidate(s.inventory[0].id)){act();out.rescue.items++;}
   const rescuedToday=(s.rescueUsed||0)>rescueBefore;
   deepWatches=deepWatches.filter(day=>{if(s.day-day>3)return false;if(rescuedToday){out.deepCollapse.collapsed++;return false;}return true;});
   if(rescuedToday){out.rescue.events++;
    /* The rescue happens AFTER closeDay has already written the day into reportHistory, so the
       gold it raised is not in that row - it is counted here or it is counted nowhere. */
    const raised=(s.daily.liquidation||0)-liquidBefore;
    out.rescue.gold+=raised;out.goldIn.liquidation+=raised;}
   /* ECONOMY_ORDER §D29 CLOSING -> D30 PREP START GOLD. Sampled after the D29 settlement and
      before any D30 preparation spend, which is the only point that answers whether D30 choices
      are constrained. Measurement only. */
   const wasDay=s.day;g.closeDay();act();
   if(wasDay===29)out.prepStartGold.push(s.money);
  }
  else if(s.phase==='final'){buySupport();if(engagement.order)for(let i=0;i<s.offers.length;i++){const o=s.offers[i];if(o.quantity&&s.money-o.price>=80&&g.canStock(D.itemBy[o.item])){g.order(i);act();}}out.reached30++;const day=stat(30);day.samples++;day.cash+=s.money;day.inventory+=s.inventory.length;
   measureFinal();
   const team=s.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery).sort((a,b)=>b.level-a.level).slice(0,3);day.visitors+=team.length;day.level+=team.reduce((a,n)=>a+n.level,0);day.wallet+=team.reduce((a,n)=>a+n.money,0);out.final.reached++;out.final.party+=team.length;out.final.full+=Number(team.length>=3);
   /* FINAL-Q75: the party is selected and confirmed first, then prepared one at a time. */
   for(const n of team){g.selectFinal(n.id);act();}
   if(team.length){g.commitFinalParty();act();}
   for(const n of team){while(engagement.finalSupply&&n.pack.length<G.Adventurer.slots(n)&&s.inventory.length){
    /* ECONOMY_ORDER_v2.7: a Final transfer is a real purchase at the fixed 50% amount, so the
       harness can only hand over what the participant can actually afford - it measures the
       rule rather than bypassing it. Nothing affordable left means the slot stays empty. */
    const afford=s.inventory.filter(x=>!g.finalNoEffect(x.item)&&n.money>=g.finalPrice(x.item));
    if(!afford.length)break;
    const st=afford.slice().sort((a,b)=>itemValue(n,D.itemBy[b.item],s.dungeons[0])-itemValue(n,D.itemBy[a.item],s.dungeons[0]))[0];
    g.supplyFinal(n.id,st.id);act();}}
   if(team.length){g.boss();act();}else g.end(false,'출전 가능한 모험가 없음');}
 }
 if(turns>=1000)throw Error('Simulation stalled at DAY '+s.day+' '+s.phase);
 for(const tag of Object.keys(D.buildNames)){const n=s.facilities.filter(id=>D.relicBy[id]?.tags.includes(tag)).length;const bins=out.buildCounts[tag]??={};const k=Math.min(5,n);bins[k]=(bins[k]||0)+1;}
 for(const id of s.facilities){const b=out.relicOutcomes[id]??={runs:0,wins:0,death:0,gold:0};b.runs++;b.wins+=Number(!!s.win);b.death+=s.stats.deaths;b.gold+=s.money;}
 for(const npc of s.npcs.filter(n=>s.team.includes(n.id))){(out.jobs[npc.job]??={}).bossParticipation=((out.jobs[npc.job]||{}).bossParticipation||0)+1;}
 /* SC-4 item 5: which Jobs actually went against which Boss, and whether that Final cleared.
    Read off the report the Final already wrote, so it counts who was sent, not who was alive. */
 if(s.finalReport&&s.bossId)for(const m of s.finalReport.members||[]){
  const b=out.bossJob[s.bossId+':'+m.job]??={sent:0,cleared:0};b.sent++;b.cleared+=Number(!!s.win);}
 /* SE-2: how the Run's supply was spread across the people who came in. Counted from each
    adventurer's own purchase history, which is the only record of what was actually sold. */
 {const seen=s.npcs.map(n=>(n.history||[]).length).filter(k=>k>0);
  const total=seen.reduce((a,b)=>a+b,0);
  out.concentration.runs++;out.concentration.supplied.push(seen.length);
  out.concentration.repeat.push(seen.filter(k=>k>=3).length);
  out.concentration.topShare.push(total?Math.max(...seen,0)/total:0);}
 /* Stage 10 §Q. Where the Gold came from and where it went, read off the per-Day ledger the
    Run already keeps rather than a second set of counters inside play. */
 for(const d of s.reportHistory||[]){
  out.goldIn.sale+=d.revenue||0;out.goldIn.greatSuccess+=d.greatSuccess||0;
  out.goldIn.subsidy+=d.subsidy||0;out.goldIn.liquidation+=d.liquidation||0;
  out.goldOut.order+=d.spent||0;out.goldOut.operating+=d.operating||0;
  out.goldOut.relic+=d.relicSpent||0;out.goldOut.deepSponsor+=d.deepSponsor||0;
  out.goldOut.commission+=d.commission||0;out.goldOut.waste+=d.wasteCost||0;
  out.goldOut.reroll+=d.rerollSpent||0;
  if(d.operating){out.overhead.samples.push(d.operating);
   (out.overhead.byBand[d.day<=10?'D1-10':d.day<=20?'D11-20':'D21-30']??=[]).push(d.operating);}
 }
 /* D25 is the Final Family/Hazard reveal, so it is its own band. */
 for(const d of [10,20,25,30])if(s.day>=d)out.reachBy[d]++;
 out.dayReached[s.day]=(out.dayReached[s.day]||0)+1;out.metaMastery+=G.Meta.totalJobMastery(g.account);out.metaDistinct+=G.Meta.distinctBossClear(g.account);out.metaStore+=(g.account.store?.owned||[]).length;out.knowledge+=Object.values(g.account.knowledge).reduce((a,b)=>a+b,0);out.revenue+=s.stats.revenue;out.spend+=s.stats.spent;
 /* measurement only - how often a Rare Reference identity actually turns up, so the starting
    chance can be judged on evidence in Stage 9 rather than on the number itself. */
 {const seen=s.npcs.filter(n=>G.Adventurer.EASTER.some(e=>e.name===n.name)).length;out.easter+=seen;out.easterRuns+=Number(seen>0);}
 out.deepDays+=(s.deep?.days||[]).length;
 {const alive=s.npcs.filter(n=>n.alive&&n.introduced);out.npc.samples++;out.npc.alive+=alive.length;out.npc.level+=alive.reduce((a,n)=>a+n.level,0);out.npc.maxLevel+=alive.length?Math.max(...alive.map(n=>n.level)):0;out.npc.loyalty+=alive.reduce((a,n)=>a+n.loyalty,0);out.npc.regulars+=s.stats.regulars;out.npc.wallet+=alive.reduce((a,n)=>a+n.money,0);out.npc.growth+=alive.reduce((a,n)=>a+n.level-1,0);}
 if(s.bossDebug){out.final.resolved++;out.final.power+=s.bossDebug.power;out.final.assault+=s.bossDebug.assault;out.final.margin+=s.bossDebug.assault-s.bossDebug.bossPower;out.final.cleared+=Number(!!s.win);
  /* SE-4: for a Final that failed, how far short it fell, as a share of what was required.
     A loss inside a tenth is one the player can reason about; one at 60% never was close. */
  if(!s.win&&s.bossDebug.bossPower>0){const short=(s.bossDebug.bossPower-s.bossDebug.assault)/s.bossDebug.bossPower;
   out.nearMiss.losses++;out.nearMiss.margins.push(short);
   out.nearMiss.within10+=Number(short<=.10);out.nearMiss.within25+=Number(short<=.25);}}
 out.wins+=Number(!!s.win);out.bankrupt+=Number(s.day<30);out.deaths+=s.stats.deaths;out.money+=s.money;
 /* Measurement only for the death limit (Stage 9 baseline 10, not a settled number): how many
    a Run loses, how often that ends one, on which Day, and how the four endings divide. The
    production rule reads D.balance.deathLimit - nothing here feeds back into play. */
 /* What each sponsorship bought: the Levels that adventurer went on to gain, whether they lived,
    and whether they took one of the three Final seats. */
 for(const [id,rec] of Object.entries(nominees)){
  const n=s.npcs.find(x=>x.id===id),d=out.deepNominee;
  d.count++;d.cost+=rec.cost;d.levelAtNomination+=rec.levelAtNomination;d.rarity+=rec.rarity;
  if(n){d.levelAtEnd+=n.level;d.grew+=n.level-rec.levelAtNomination;d.alive+=Number(n.alive);
   d.finalSeat+=Number((s.team||[]).includes(id));}}
 out.deepNominee.finalSeats+=(s.team||[]).length;
 out.rescue.used.push(s.rescueUsed||0);out.rescue.runs+=Number((s.rescueUsed||0)>0);
 out.deathsPerRun.push(s.stats.deaths);
 /* The existing Closing rule values stock at half what that stock cost, so Meta settlement
    reads the same number rather than inventing a second valuation. */
 {const band=s.day>=30?'D30':s.day>=25?'D25-29':s.day>=20?'D20-24':s.day>=10?'D10-19':'D1-9';
  const t=out.settlement;t.runs++;t.gold+=s.money;
  const b=t.byBand[band]??={runs:0,gold:0,sales:0};b.runs++;b.gold+=s.money;b.sales+=s.stats.revenue;
  /* META_v2.8 §Run-end settlement structure: Gross Sales x the reached-Day rate, per Run. The
     Ending Gold beside it is Run-result information, never a Store Capital input. */
  t.sales.push(s.stats.revenue);t.gains.push(Math.round(s.stats.revenue*G.Meta.capitalRate(s.day)));
  t.byEnd[s.bossDebug?(s.win?'cleared':'finalFail'):(s.stats.deaths>=D.balance.deathLimit?'deaths':'bankrupt')]
   ??={runs:0,sales:0,gain:0};
  const e=t.byEnd[s.bossDebug?(s.win?'cleared':'finalFail'):(s.stats.deaths>=D.balance.deathLimit?'deaths':'bankrupt')];
  e.runs++;e.sales+=s.stats.revenue;e.gain+=Math.round(s.stats.revenue*G.Meta.capitalRate(s.day));
  const bg=t.byBand[band];bg.gain=(bg.gain||0)+Math.round(s.stats.revenue*G.Meta.capitalRate(s.day));}
 const byDeaths=s.stats.deaths>=D.balance.deathLimit;
 out.endedBy[byDeaths?'deaths':s.bossDebug?(s.win?'cleared':'finalFail'):'bankrupt']++;
 /* Per-Boss conditional clear: only Runs whose Final actually resolved, so WRATH (no Trait) can
    be read apart from the six that carry one. */
 if(s.bossDebug){const b=out.bossRuns[s.bossId]??={resolved:0,cleared:0,margin:0};
  b.resolved++;b.cleared+=Number(!!s.win);b.margin+=s.bossDebug.assault-s.bossDebug.bossPower;}
 if(byDeaths)out.deathFailDay.push(s.day);
 return s;
}

/* FRESH-ACCOUNT BENCHMARK — kept unchanged as the regression baseline. Every seed starts from
   Meta.fresh() (or a copy of the supplied account), so nothing a Run earns carries anywhere.
   Its Final numbers describe a first-time account and must not be read as the game's ceiling. */
/* opts.relicAware (default false) turns on playRun's relic-aware layer; off is the baseline. */
function simulate(count=100,policy='balanced',account=null,pricing='adaptive',build='hybrid',opts={}){
 const out=blank(count,policy,pricing,build);
 for(let seed=0;seed<count;seed++){
  const g=new G.Game(account?copy(account):G.Meta.fresh());g.autosave=false;g.start('revision-'+seed);
  playRun(g,out,{policy,pricing,build,seed,relicAware:!!opts?.relicAware});
 }
 return derive(out,count);
}

/* CROSS-RUN META PROGRESSION — the same account played through successive Runs, exactly as a
   returning player accumulates it. No gameplay power is inserted: every unlock, every Mastery
   point and every Gold of Store Capital comes from the real Meta system reacting to real results.

   META_v2.8 retired Franchise Grade, the ten Achievements and the Start Contract, so what this
   measures is the cross-run truth that actually exists:

     Store Capital · owned Decoration count · the Decoration loadout ·
     Job Mastery · distinct Boss clears

   The Grade bucket that used to sit beside these is gone with the system. It was also vacuous:
   the trajectory never bought a Decoration, so every account stayed at the fresh Grade and
   every "grade" cohort was the same cohort under another name.

   Store Capital is accumulated through the PRODUCTION settlement path - `Game.end()` settles
   the Run the way the shipped game does - and Decorations are bought with the real
   `Meta.buyDecoration`. Nothing here reimplements either.

   `purchaseOrder` is measurement INPUT, not a strategy this harness invents: the caller names
   the order, and the trajectory buys the next one whenever the Capital it actually earned
   covers the price. Passing null buys nothing, which is the pure-Meta arm. */
/* Job Mastery isolation, HARNESS ONLY. Mastery is a spawn-Level bonus on the owning Job's new
   adventurers, and an account that has it also has unlocked Jobs and items - so a tier-to-tier
   difference cannot say which of the two did the work. This neutralises the bonus table while
   leaving every unlock in place, so the same account can be measured with and without it. The
   roll is still drawn either way, so the seeded stream does not move. */
function masterySpawnPatch(){
 const table=G.Adventurer.MASTERY_SPAWN,saved=table.map(row=>row.slice());
 for(let i=0;i<table.length;i++)table[i]=[];
 return ()=>{for(let i=0;i<saved.length;i++)table[i]=saved[i];};
}
function trajectory({trajectories=20,runs=12,policy='balanced',pricing='adaptive',build='hybrid',prefix='meta',purchaseOrder=null}={}){
 const byIndex=[],accountsEnd=[],firstClear=[],ledgers=[];
 const order=purchaseOrder?purchaseOrder.slice():[];
 for(const id of order)if(!D.decorationBy[id])throw Error('없는 장식입니다: '+id);
 for(let i=0;i<runs;i++)byIndex.push(blank(trajectories,policy,pricing,build));
 for(let t=0;t<trajectories;t++){
  const account=G.Meta.fresh();
  /* When this account first beat a Boss, and what it actually held at that moment. Recorded
     once per trajectory from real results - nothing is seeded. */
  let clearedAt=null;
  const ledger=[];
  for(let i=0;i<runs;i++){
   const before={mastery:G.Meta.totalJobMastery(account),distinct:G.Meta.distinctBossClear(account),
    decorations:(account.store?.owned||[]).length,capital:G.Meta.storeCapital(account),
    loadout:{...G.Meta.storeLoadout(account)}};
   const g=new G.Game(account);g.autosave=false;
   g.start(prefix+'-'+t+'-'+i);
   playRun(g,byIndex[i],{policy,pricing,build,seed:t});
   /* The Run is settled through the shipped path. `end` is idempotent and `settleStoreCapital`
      carries its own once-only guard, so a Run playRun already ended is not settled twice. */
   g.end(!!g.run.win,g.run.endReason||'측정 종료');
   const settlement=g.run.settlement||{sales:0,gain:0,rate:0,day:g.run.day};
   /* The purchase: the named order, the real Meta call, and only what the earned Capital
      covers. No Capital is granted and no price is touched. */
   const bought=[];
   for(const id of order){
    if(G.Meta.decorationOwned(account,id))continue;
    if(G.Meta.storeCapital(account)<D.decorationBy[id].price)break;
    G.Meta.buyDecoration(account,id);bought.push(id);
   }
   ledger.push({run:i,capitalStart:before.capital,grossSales:settlement.sales,
    rate:settlement.rate,dayReached:g.run.day,endReason:g.run.endReason||'',gain:settlement.gain,
    capitalAfterSettlement:before.capital+settlement.gain,
    bought,capitalEnd:G.Meta.storeCapital(account),
    ownedBefore:before.decorations,ownedAfter:(account.store?.owned||[]).length,
    loadout:{...G.Meta.storeLoadout(account)}});

   byIndex[i].expeditions=(byIndex[i].expeditions||0)+g.run.npcs.reduce((n,x)=>n+x.records.length,0);
   byIndex[i].expDeaths=(byIndex[i].expDeaths||0)+g.run.stats.deaths;
   if(g.run.win&&clearedAt===null)
    clearedAt={runIndex:i,decorations:before.decorations,capital:before.capital,mastery:before.mastery};
   byIndex[i].masteryAtStart??=0;byIndex[i].masteryAtStart+=before.mastery;
   byIndex[i].distinctAtStart??=0;byIndex[i].distinctAtStart+=before.distinct;
   byIndex[i].decorationsAtStart??=0;byIndex[i].decorationsAtStart+=before.decorations;
   byIndex[i].capitalAtStart??=0;byIndex[i].capitalAtStart+=before.capital;
   byIndex[i].capitalGained??=0;byIndex[i].capitalGained+=settlement.gain;
   /* Which Slots were actually filled entering this Run, as a distribution: a mean over
      trajectories hides an account that bought nothing at all. */
   byIndex[i].loadoutDist??={};
   const key=G.DATA.decorationSlots.map(sl=>before.loadout[sl]||'-').join('/');
   byIndex[i].loadoutDist[key]=(byIndex[i].loadoutDist[key]||0)+1;
  }
  accountsEnd.push({decorations:(account.store?.owned||[]).length,capital:G.Meta.storeCapital(account),
   loadout:{...G.Meta.storeLoadout(account)},
   mastery:G.Meta.totalJobMastery(account),distinct:G.Meta.distinctBossClear(account)});
  firstClear.push(clearedAt);
  ledgers.push(ledger);
 }
 /* The acquisition ladder, read off the ledgers rather than projected from a mean: for each
    purchase position, the Run index on which that many Decorations were actually owned. */
 const acquisition=order.map((id,k)=>{
  const at=ledgers.map(l=>{const row=l.find(r=>r.ownedAfter>=k+1);return row?row.run+1:null;});
  const got=at.filter(x=>x!==null);
  /* CENSORED. A trajectory that never got this far has no Run number, and dropping it would
     make the median a median of the lucky - the shorter the measurement, the earlier the
     answer. It is kept in the sample as "later than every Run measured", so the median is a
     real Run only when MORE THAN HALF the trajectories actually acquired; otherwise it is
     null, which reads as "not within `runs` Runs" rather than as a number. */
  const ranked=[...at].sort((a,b)=>(a===null?Infinity:a)-(b===null?Infinity:b));
  const mid=ranked[Math.floor(ranked.length/2)];
  return {position:k+1,id,price:D.decorationBy[id].price,
   acquired:got.length,ofTrajectories:ledgers.length,
   medianRun:mid===null?null:mid,
   /* The mean is over the acquirers only and cannot be censored the same way, so it is named
      for what it is and never read as "when a player gets this". */
   meanRunAmongAcquirers:got.length?got.reduce((a,b)=>a+b,0)/got.length:null,
   runs:at};
 });
 return {mode:'trajectory',policy,pricing,build,trajectories,runsPerTrajectory:runs,
  purchaseOrder:order,
  byIndex:byIndex.map((o,i)=>({runIndex:i,...derive(o,trajectories),
   expeditions:o.expeditions||0,expDeaths:o.expDeaths||0,
   expeditionDeathRate:o.expeditions?o.expDeaths/o.expeditions:0,
   masteryAtStart:o.masteryAtStart/trajectories,distinctAtStart:o.distinctAtStart/trajectories,
   decorationsAtStart:(o.decorationsAtStart||0)/trajectories,
   capitalAtStart:(o.capitalAtStart||0)/trajectories,
   capitalGained:(o.capitalGained||0)/trajectories,
   loadoutDist:o.loadoutDist||{}})),
  /* First CLEAR, from real accumulation: which Run index it happened on and what the account
     actually held then. `null` entries are trajectories that never cleared within `runs`. */
  firstClear:{samples:firstClear.length,cleared:firstClear.filter(Boolean).length,
   runIndex:firstClear.filter(Boolean).map(c=>c.runIndex),
   decorations:firstClear.filter(Boolean).map(c=>c.decorations),
   capital:firstClear.filter(Boolean).map(c=>c.capital)},
  acquisition,ledgers,accountsEnd};
}

/* masterySpawnPatch is exported so a measurement script can hold an account FIXED and ask what
   the Mastery bonus alone contributes, with the unlocks it came with held constant. Harness only. */
G.Debug={simulate,trajectory,clearChance,contribution,masterySpawnPatch};
})(globalThis);
