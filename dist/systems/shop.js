(function(G){
/* CORE_RUN §FIRST-RUN LESSONS (User 2026-09-30): the DAY 3 payday customer - +200G to spend this visit only, +20%p on 150% */
const LESSON={paydayBudget:200};
/* Stage 10, approved (§O). Stage 9 measured FIRE as the hardest Family for all six Jobs and by
   a wide margin - the `one Family is always hardest` clause of DUNGEON_HAZARD BALANCE TARGET.
   Its combat requirement is eased; its Hazard identity and Stat mapping are untouched, so what
   makes a fire Gate a fire Gate is unchanged. Provisional: re-measured, and if FIRE is still
   consistently worst by 10%p a further candidate is reported rather than applied. v2.5 final
   (H1): .92 -> .90, which narrowed the gap to the next Family by about a third. fire is still
   the hardest Family and ships that way, on the playtest follow-up. The factor
   itself lives in D.balance.golemCombat so the balance harness can compare a candidate against
   it without a production edit - the same reason guarantee.minPrice carries a name. */
const D=G.DATA,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
class Game{
 constructor(account=G.Meta.fresh(),run=null){this.account=account;this.run=run;this.rng=run?new G.RNG(run.seed,run.rngState):null;this.autosave=true;}
 save(){if(this.run)this.run.rngState=this.rng.state;if(this.autosave&&typeof localStorage!=='undefined')G.Save.write(this.account,this.run);}
 /* CORE_RUN_v2.8 §PRE-RUN FLOW. Start Contract selection is retired; the Run always runs on the
    neutral baseline and the Account's Decoration loadout is frozen into the Run here. Changing
    the Account loadout afterwards cannot reach a Run that has already started. */
 start(seed){
 const loadout=G.Meta.plannedLoadout(this.account),contract='standard';
 /* 알뜰 금고 is paid by morningReset, which DAY 1 also runs once the DAY 0 pick is made */
 const startGold=700; /* CORE_RUN §START STATE (User 2026-09-25, v2.9.1 balance; was 1000G) */
 this.rng=new G.RNG(seed);this.run={version:9,seed:String(seed),rngState:this.rng.state,branch:this.rng.pick(D.brand.branches),day:1,phase:'order',money:startGold,contract,loadout,settled:false,inventory:[],npcs:[],facilities:[],offers:[],queue:[],cursor:0,dungeons:[],event:null,eventLog:[],results:[],log:[],team:[],region:50,stats:{revenue:0,spent:0,waste:0,deaths:0,rare:0,legendary:0,discoveries:0,regulars:0},daily:{revenue:0,spent:0,waste:0,operating:0},pity:{rare:0,counter:0},nextNPC:1,rerolled:false,rewarded:false,rescueUsed:0,rescueDay:0,reportHistory:[],notice:'제7게이트의 첫 아침. 오늘 갈 던전을 보고 발주해 보세요.'};
  for(const[id,num]of D.openingStock)this.stock(id,num);
  /* CORE_RUN §FIRST-RUN LESSONS: the account's first Run (no Run settled yet). Measurement harnesses set `lessons=false`. */
  this.run.firstRun=this.lessons!==false&&!(this.account.runs>0);
 for(let i=0;i<9;i++)this.addNPC();this.run.familyOrder=this.rng.shuffle(['spider','slime','golem','crypt','snow']);this.run.familyIntro=[this.rng.int(4,7),this.rng.int(8,12)];
 /* DUNGEON_HAZARD §DEEP EXPEDITION. Which Days this Run holds a 심층원정 is decided once, on a
    stream derived from the run seed, so it costs the run stream nothing and a reload cannot
    re-roll it. Exactly one of D7/D14 and one of D21/D28, plus a third on a PASS3 weighting -
    while that weighting is unapproved the Run holds the minimum two rather than a guessed mix.
    Future dates stay hidden: only the Day that has arrived is ever shown. */
 const deep=new G.RNG(String(seed)+':deep');
 {const early=deep.pick([7,14]),late=deep.pick([21,28]),third=deep.next();
  const days=[early,late],odds=D.deepTuning.threeOccurrenceChance;
  if(odds!==null&&third<odds)days.push(deep.pick([7,14,21,28].filter(d=>d!==early&&d!==late)));
  this.run.deep={days:days.sort((a,b)=>a-b),today:null};}
 const boss=new G.RNG(String(seed)+':boss');this.run.bossId=boss.pick(D.bosses).id;this.run.bossReveal={d0Seen:false,identitySeen:false,combatSeen:false,traitSeen:false,routeSeen:false};
 if(this.run.bossId==='SLOTH'){this.run.slothDays=boss.shuffle([15,20,25]).slice(0,2).sort((a,b)=>a-b);this.run.sealBreakCount=0;}
this.run.phase='foundation';this.relicWindow(0);return this.run;
 }
 capacity(){return D.balance.warehouse+(this.has('warehouse')?D.relicParams.warehouse.slots:0);}
 /* ECONOMY_ORDER §OPERATING COST (Stage 10, approved). Overhead follows the Day AND the quality
    of the roster the player has actually built, so a store that grows good adventurers keeps
    having to sell well to hold on to them - the pressure does not fall away after the mid-game.
    Averaging the WHOLE pool would reward hoarding level-1 bodies to dilute the figure, so it is
    the Core Roster: the six best adventurers still alive in the pool, by Level then Rarity.
    Recovering adventurers count - they are still on the books. Fewer than six, everyone.
    Nothing is persisted: both averages are derived from the roster as it stands. */
 coreRoster(){return this.run.npcs.filter(n=>n.alive)
  .sort((a,b)=>b.level-a.level||b.rarity-a.rarity).slice(0,6);}
 overheadBase(day=this.run.day){const core=this.coreRoster();
  const avgLevel=core.length?core.reduce((a,n)=>a+n.level,0)/core.length:1;
  const avgRarity=core.length?core.reduce((a,n)=>a+n.rarity,0)/core.length:0;
  /* ECONOMY_ORDER §BASE OPERATING COST (User 2026-09-25, v2.9.1 balance: heavy from D1, flat
     after - was 90+5*(day-1); level coefficient .02 -> .03). */
  /* v2.9.2 (User 2026-09-26): +12G per Day after DAY 15 - the late store sat on ~5,000G by D29 (User's Run and the
     `reader` harness alike); the D1~15 cost is unchanged. */
  const dayBase=170+1*(day-1)+12*Math.max(0,day-15);
  return dayBase*(1+.03*(avgLevel-1))*(1+.06*avgRarity);}
 expectedOperatingCost({day=this.run.day,facilities=this.run.dayFacilities,event=this.run.event}={}){const s=this.run,ev=event?.effects||{};
  /* META_v2.8 §RETIRED: no Start Contract branch survives here. A stale v8 save may still
     carry a `contract` value, and it must change nothing at all. */
  const extras=-(facilities?.includes('efficiency')?D.relicParams.efficiency.overheadCut:0)+(ev.audit&&s.stats.waste>=6?Math.min(100,s.stats.waste*5):0)+(ev.overheadAdd||0);
  /* RELIC_v2.7 §VISITOR RELICS: hub costs a share of overheadBase, taken on that base alone -
     never on the flat extras, and never compounded with another percentage modifier. */
  /* 왕도 프리미엄 인증 (v2.9.11, User 2026-09-29) and 즉석식품 코너 (User 2026-10-02) take the same share of overheadBase, from
     the next Day, added to hub's */
  const base=this.overheadBase(day),hub=(facilities?.includes('hub')?base*D.relicParams.hub.overheadRate:0)
   +(facilities?.includes('royalCert')?base*D.relicParams.royalCert.overheadRate:0)
   +(facilities?.includes('kitchen')?base*D.relicParams.kitchen.overheadRate:0);
  return ev.overheadFree?0:Math.round((base+hub+extras)/10)*10;}
 /* NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT (User 2026-09-26, v2.9.7): tomorrow's base operating cost - the same rule, the
    next Day, today's Store Support (tomorrow's frozen set) and roster, no Event (tomorrow's is not drawn yet). */
 tomorrowOperatingCost(){const s=this.run;return this.expectedOperatingCost({day:s.day+1,facilities:[...s.facilities],event:null});}
 has(id){return this.run.facilities.includes(id);}
 /* A Decoration is read from the Run's frozen loadout, never from facilities. `has` stays the
    Relic question and the two never answer for each other. */
 wears(id){return Object.values(this.run.loadout||{}).includes(id);}
 canStock(item,count=1){return this.run.inventory.length+count<=this.capacity();}
 stock(id,count,cost=null){const it=D.itemBy[id];for(let i=0;i<count;i++)this.run.inventory.push({id:'stock-'+this.run.day+'-'+this.run.nextNPC+'-'+this.run.inventory.length+'-'+this.rng.int(0,999999),item:id,expires:this.run.event?.effects.sameDayStock&&['order','final'].includes(this.run.phase)?this.run.day+1:this.run.day+it.days+G.Relics.shelf(this,it),/* ITEM §SHELF LIFE — EXACT (v2.9.0): every Item expires */cost:cost??it.buy});}
 /* The Gate a customer actually walks into. A Deep nominee keeps the base Gate's Family, Tier
    and Hazard set - only the required Combat Power rises, by one global factor - and this is the
    single object the forecast and the night result both read, so what the player was shown is
    what was resolved. A later destination reassignment cannot overwrite a confirmed Deep
    destination, because the nomination, not n.destination, is what selects the Gate here. */
 gateFor(n){const s=this.run,t=s.deep?.today;
  if(!n)return null;
  if(!t||t.nomineeId!==n.id)return s.dungeons[n.destination];
  const base=s.dungeons[t.gateIndex];
  return {...base,power:base.power*D.deepTuning.powerFactor,deep:true};}
 /* The Gate the player is shown for a customer. A confirmed Deep nomination is authoritative,
    so it settles any claimed-destination ambiguity a Trait introduced; otherwise what the player
    sees is what the customer claimed. For a nominee this and gateFor return the same Gate, which
    is what keeps the forecast and the night result the same thing. */
 claimedGateFor(n){const s=this.run,t=s.deep?.today;
  if(n&&t&&t.nomineeId===n.id)return this.gateFor(n);
  return s.dungeons[n?.claimedDestination??n?.destination]||s.dungeons[0];}
 /* ECONOMY_ORDER §DEEP EXPEDITION SPONSORSHIP. The price is the adventurer, not the trip:
    a rarer or more experienced NPC costs more to send, so choosing who to invest in is the
    decision. Reads only rarity and current Level - never the Gate, the Day, the Deep Power or
    any item price - and rounds to a readable step. Coefficients are a Stage 9 baseline. */
 deepCost(n){const t=D.deepTuning;
  if(!n)return null;
  const raw=t.sponsorBase*(1+t.sponsorRarityStep*n.rarity)*(1+t.sponsorLevelStep*(n.level-1));
  return Math.round(raw/t.sponsorRounding)*t.sponsorRounding;}
 /* What today's Deep is offering, or null when there is nothing to offer: no Deep today, or
    one already nominated. The price belongs to the candidate, so it is not part of the offer. */
 deepOffer(){const s=this.run,t=s.deep?.today;
  if(!t||t.nomineeId)return null;
  const base=s.dungeons[t.gateIndex];
  return {gate:base,gateIndex:t.gateIndex,required:base.power*D.deepTuning.powerFactor};}
 /* SALE §DEEP EXPEDITION NOMINATION: the current visitor only, before their first committed
    transaction today, and only if the Store can pay. No Job / Level / rarity gate is added. */
 canNominateDeep(n){const s=this.run,offer=this.deepOffer();
  return !!offer&&s.phase==='sell'&&!!n&&this.current()?.id===n.id
   &&!n.pack.length&&!n.history.some(h=>h.day===s.day)&&s.money>=this.deepCost(n);}
 nominateDeep(npcId){const s=this.run,n=s.npcs.find(x=>x.id===npcId),offer=this.deepOffer();
  if(!offer)throw Error('오늘은 추천할 심층원정이 없습니다.');
  if(!this.canNominateDeep(n))throw Error('아직 거래하지 않은 현재 손님만 추천할 수 있습니다.');
  const cost=this.deepCost(n);
  s.money-=cost;s.daily.deepSponsor+=cost;s.stats.spent+=cost;
  s.deep.today.nomineeId=n.id;s.deep.today.paid=cost;
  n.destination=offer.gateIndex;n.claimedDestination=offer.gateIndex;n.destinationFinal=true;
  /* SALE §DEEP EXPEDITION NOMINATION step 5: the one sanctioned re-take of the SALE-entry outlook.
     Nomination comes before any committed transaction, so this is still the pre-supply snapshot -
     now read against the Deep requirement. There is no cancel: the nomination is final. */
  n.outlook=this.outlookFor(n);
  s.notice=n.name+' 님이 심층원정에 나섭니다.';this.save();return true;}
 addNPC(opts={}){const s=this.run;if(s.npcs.filter(n=>n.alive).length>=22)return null;let n=G.Adventurer.create(this.rng,s.nextNPC++,s.day,this.account,{premium:this.wears('honorFrame'),levelBonus:this.wears('trainingSign')&&this.rng.next()<D.decorationParams.trainingSign.chance?D.decorationParams.trainingSign.levelBonus:0,...opts});
  /* The Rare Reference roll is gone (v2.9.11, User 2026-09-28: removed before a paid release); its one draw stays, so a
     seeded Run keeps the stream it had whenever that roll missed. */
  this.rng.next();
  for(let retry=0;s.npcs.some(x=>x.alive&&x.name===n.name)&&retry<200;retry++)n.name=G.Adventurer.name(this.rng,n.rarity);
  s.npcs.push(n);return n;}
 /* v2.9.0 (User 2026-09-24): no Gate requires Supply - the Supply Burden modifier is gone. The one
    draw it used to make is kept as a dead draw so every seeded stream and fixture stays identical. */
 burden(){this.rng.next();return undefined;}
 finalEligible(){return this.run.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery);}
 /* FINAL_EXPEDITION_v2.7 §D25 FINAL STATE GENERATION. The Pair is drawn on a stream derived
    from the run seed, the way the Deep Days and the Boss already are, rather than from the run
    stream. That is what makes it the same answer whether it is generated on D25 or read back
    after a reload - a Save/Load can never reroll it - and it costs the run stream no draw, so
    generating it five Days earlier does not move any other seeded result. */
 makeFinal(){const s=this.run,base=D.dungeonBy.final;
  const families=new G.RNG(String(s.seed)+':final').shuffle(['spider','slime','golem','crypt','snow']).slice(0,2);
  const hazards=[...new Set(families.flatMap(id=>D.familyTiers[id][1]))];
  return {...base,families,familyNames:families.map(id=>D.dungeonBy[id].name),hazards,day:30,tier:2,family:'final',scale:4.6,power:D.balance.bossPower/3,reward:2};}
 makeDungeon(id,tier=null){const s=this.run,base=D.dungeonBy[id];
 if(tier===null){const weights=G.Dungeon.tierWeights(s.day);tier=this.rng.weighted([1,2,3],t=>weights[t-1]);}
 return {...base,name:base.name+' '+['','I','II','III'][tier],family:id,tier,hazards:[...D.familyTiers[id][tier-1]],day:s.day,scale:1+s.day*.10+(tier-1)*.6,stars:tier,...(this.burden(),{}),power:(21+G.Dungeon.gateDayTerm(s.day)+(tier-1)*5+(id==='golem'?6+(tier-1)*8:0)+(base.base-2)*1.3)*(id==='golem'?D.balance.golemCombat:1),reward:base.reward*(1+(tier-1)*.12)};
 }
 eventEligible(e){const s=this.run,fx=e.effects;
  if(fx.cold)return s.dungeons.some(d=>!d.hazards.includes('cold')&&!d.hazards.includes('fire'));
  if(fx.poison)return s.dungeons.some(d=>!d.hazards.includes('poison'));
  if(fx.pilgrimage)return s.dungeons.length>=2&&s.expectedVisitors>=3;
  if(fx.audit)return s.stats.waste>=6;
  if(fx.rookie||fx.royal)return s.npcs.filter(n=>n.alive).length<22;
  /* EVENT 24~55 (v2.9.11): an Event whose subject is absent today is out of the pool (NO FALSE ATTRIBUTION) */
  const ready=s.npcs.filter(n=>n.alive&&!n.recovery);
  if(fx.healVisitors||fx.injuredBudget)return ready.some(n=>n.injury===1);
  if(fx.regularVisit)return ready.some(n=>n.introduced&&G.Adventurer.isTrustedRegular(n));
  if(fx.summons)return ready.length>=2;
  if(fx.closeGate)return s.dungeons.filter(d=>!d.temporary).length>=2;
  if(fx.shelfCut)return s.inventory.some(x=>x.expires!==null&&['food','drink'].includes(D.itemBy[x.item].category));
  return true;}
 /* EVENT §DEEP EXPEDITION DAY EXCLUSION: a Day this Run actually holds a 심층원정 produces no
    Normal Event, whether or not the player later nominates anyone. rollEvent draws before it
    asks this, so suppressing an Event costs the run stream no draw. The 35% chance is NOT
    compensated for the days this removes - Stage 9 measures the real count. */
 eventEligibleDay(day){return day>=3&&day<=29&&![5,10,15,20,25].includes(day)&&!this.deepDay(day);}
 deepDay(day){return (this.run?.deep?.days||[]).includes(day);}
 /* EVENT §EVENT SELECTION (User 2026-09-28, v2.9.11): 40% on an eligible Day (was 35%), and an Event that already happened this
    Run is out of the pool - a Run never meets the same Event twice. The log is written where the Event applies (morningEvent),
    so rolling alone records nothing; a save from before the log reads as an empty one. */
 /* CORE_RUN §FIRST-RUN LESSONS (User 2026-10-01): the account's first Run meets 본사 1+1 행사 on DAY 2, the one Event before
    DAY 3. The ordinary roll still draws and is ignored, and no pick is drawn, so the Run's stream is unchanged. */
 rollEvent(){const s=this.run,fired=this.rng.next()<.40;if(s.firstRun&&s.day===2&&!(s.eventLog||[]).length)return D.events.find(e=>e.id==='oneplus')||null;
  if(!this.eventEligibleDay(s.day)||!fired)return null;
  const seen=s.eventLog||[],pool=D.events.filter(e=>!seen.includes(e.id)&&this.eventEligible(e));return pool.length?this.rng.weighted(pool,e=>e.weight):null;}
 /* The Morning is an orchestration of six things that each belong to a different system, and
    it had them all inline: the Day's state reset, the Gates, the Final state, how many people
    are coming, the Event, and who actually arrives. Each is a method below now, in the order
    the Day happens. Nothing here decides a rule - every rule, every number and every RNG draw
    stayed exactly where it was, in the same sequence - so a Day is bit-for-bit what it was. */
 morning(){const s=this.run;
  this.morningReset();
  const ids=this.morningGates();
  /* D30 is the Final: it has one Gate, no Event, no visitor queue. morningGates() returns null
     to say the Day is already what it is going to be. */
  if(ids===null){this.generateOffers();this.save();return;}
  const visitors=this.morningVisitors();
  this.morningEvent(ids);
  this.morningDeep();
  this.morningQueue(visitors);
  this.firstRunLessons();
  this.save();
 }
 /* CORE_RUN §FIRST-RUN LESSONS (User 2026-09-30): the account's first Run only - lessons met by play, not told. DAY 1: one
    Common Item that counters the first Gate's Hazard joins the warehouse, so the first sale can find the rule itself. */
 firstRunLessons(){const s=this.run;if(!s.firstRun)return;
  if(s.day===1&&!s.lessonCounter){const h=s.dungeons[0]?.hazards?.[0],it=h&&D.items.find(i=>i.rarity===0&&!i.metaUnlock&&(i.effects[h]||0)>0);
   /* the stock id draws from a stream of its own, so the Run's stream - every later Gate, visitor and roll - is untouched */
   if(it){const main=this.rng;this.rng=new G.RNG(s.seed+':lesson');try{this.stock(it.id,1);}finally{this.rng=main;}s.lessonCounter=it.id;}}
  /* The first Day an ordinarily injured adventurer can come (DAY 2 on; User 2026-10-02 - it was DAY 3 only, and a DAY 3 with no
     one hurt never taught it): it comes first, with a 구급키트 in the warehouse (HQ's, like the opening stock). DAY 3: a
     returning customer comes on payday - an extra 200G for this visit and one sure 바가지 (arrive / interest). Draws come from
     a stream of their own; the Day's count of visitors is unchanged. */
  if(s.day>=2&&!s.lessonInjured){const lr=new G.RNG(s.seed+':lesson3');
   let inj=s.queue.map(id=>s.npcs.find(n=>n.id===id)).find(n=>n&&n.alive&&n.injury===1);
   if(!inj&&s.queue.length){const cand=s.npcs.find(n=>n.alive&&n.injury===1&&n.introduced&&!s.queue.includes(n.id));
    /* the swap takes the last returning visitor's seat - a new face the Day (or an Event) seated is never the one sent home */
    const out=cand&&[...s.queue].reverse().map(id=>s.npcs.find(n=>n.id===id)).find(n=>n&&n.introduced);
    if(out){cand.destination=out.destination;cand.claimedDestination=out.claimedDestination;cand.destinationFinal=true;
     cand.money=Math.min(2000,Math.round(cand.money+cand.level*8+lr.int(0,80)));cand.newToday=false;s.queue[s.queue.indexOf(out.id)]=cand.id;inj=cand;}}
   if(inj){s.queue=[inj.id,...s.queue.filter(id=>id!==inj.id)];s.lessonInjured=inj.id;s.lessonKitDay=s.day;
    const main=this.rng;this.rng=lr;try{this.stock('kit',1);}finally{this.rng=main;}}}
  if(s.day===3&&!s.lessonDay3){s.lessonDay3=true;
   /* a healthy returning visitor first (User 2026-09-30), so the payday lesson never reads as a second injury lesson */
   const hurt=s.lessonKitDay===s.day?s.lessonInjured:null;
   const back=s.queue.map(id=>s.npcs.find(n=>n.id===id)).filter(n=>n&&n.introduced&&n.id!==hurt),pay=back.find(n=>!n.injury)||back[0];
   if(pay){pay.lessonPayday=s.day;s.lessonPayday=pay.id;}}
 }
 /* Everything the new Day clears or carries over before anything is rolled: the ledger, the
    Day's flags, and each adventurer's own per-Day state (spoiled stock left the night before - nightDiscard). */
 morningReset(){const s=this.run;
  s.previousSales=s.daily.sales||0;s.dayFacilities=[...s.facilities];s.bulkUsed=false;s.guaranteeUsed=false;s.phase=s.day===30?'final':'morning';s.daily={revenue:0,spent:0,waste:0,operating:0,cogs:0,overcharge:0,discount:0,subsidy:0,liquidation:0,wasteCost:0,loyalty:0,sales:0,relicSpent:0,commission:0,greatSuccess:0,deepSponsor:0,unknownCosts:0};if(this.wears('thriftSafe')){const g=D.decorationParams.thriftSafe.dailyGold;s.money+=g;s.daily.safeGold=g;}s.nightCursor=0;s.say=null;s.closing=false;if(s.deep)s.deep.today=null;s.cart={};s.rerolled=false;s.rerollCount=0;s.halfPriceUsed=false;s.results=[];s.team=[];s.notice='DAY '+s.day+' · '+s.branch+'의 아침. 오늘의 던전을 확인하세요.';
  /* ITEM §SHELF LIFE (User 2026-09-28, v2.9.11): nothing is discarded in the morning any more - see nightDiscard(). */
  /* v2.9.0 rest recovery (DUNGEON_HAZARD §SUPPLY -> FATIGUE 6): a Severe-Injury rest day lowers Fatigue by 5, floor 0 */
  s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;if(!n.recovery){n.injury=0;n.status='건강';}}n.pack=[];n.refused=[];n.refusalReasons=[];n.pilgrim=false;n.eventBudget=0;n.feast=0;});
 }
 /* The milestone window, the Final state, and today's Gates. Returns the Family id pool the
    Event's unknown Gate draws from, or null on the Final Day, which has no more Morning left. */
 morningGates(){const s=this.run;
  if([5,10,15,20,25,30].includes(s.day))this.relicWindow(s.day);
  /* FINAL_EXPEDITION_v2.7 §D25: the Final state is generated and revealed on D25, BEFORE the
     ordinary D25 management decisions that can use it. D30 consumes this exact persisted state
     and never generates a new Pair. D25 grants no Counter Items, no free stock and no shop. */
  if(s.day>=25&&!s.final)s.final=this.makeFinal();
  if(s.day===30){s.event=null;s.eventSeen=true;s.pilgrimage=0;s.closedGates=[];s.dungeons=[s.final||(s.final=this.makeFinal())];s.queue=[];return null;}
  s.familyOrder??=this.rng.shuffle(['spider','slime','golem','crypt','snow']);s.familyIntro??=[5,10];const ids=s.familyOrder.slice(0,3+Number(s.day>=s.familyIntro[0])+Number(s.day>=s.familyIntro[1]));const counts=G.Dungeon.gateCountRule(s.day),odds=G.Dungeon.gateCountOdds(s.day),count=counts.length===1?counts[0]:odds[0]===odds[1]?this.rng.int(counts[0],counts.at(-1)):(this.rng.next()<odds[1]?counts[1]:counts[0]);s.dungeons=this.rng.shuffle(ids).slice(0,count).map(id=>this.makeDungeon(id));
  return ids;
 }
 /* How many people are coming, composed in one place so the order of the four sources can be
    read off a single function: the base roll, the board floor on that roll, the hub's own
    exclusive roll, and the wall Decoration's own roll. The Event's own visitor modifier is not
    here - it is not known yet - and is added where the queue is actually filled. */
 morningVisitors(){const s=this.run;
  /* RELIC_v2.7 §VISITOR RELICS. board raises the floor of the BASE roll - not of the final
     visitor count - and draws nothing. hub makes one roll with three mutually exclusive
     outcomes. The Decoration that touches the same number is applied after, and neither Relic
     knows about it. */
  const rawVisitors=this.rng.int(3,6);
  const baseVisitors=s.dayFacilities.includes('board')?Math.max(D.relicParams.board.minVisitors,rawVisitors):rawVisitors;
  let hubExtra=0;
  if(s.dayFacilities.includes('hub')){const r=this.rng.next(),{p1,p2}=D.relicParams.hub;hubExtra=r<p1?1:r<p1+p2?2:0;}
  /* 단체 주문 창구: its own Morning roll too, independent of board, hub and the wall. */
  const flyerExtra=s.dayFacilities.includes('groupOrder')&&this.rng.next()<D.relicParams.groupOrder.visitorChance?1:0;
  /* META_v2.8 wall: its own Morning roll, independent of board and hub. */
  const decoExtra=this.wears('guildShelf')&&this.rng.next()<D.balance.wallVisitorChance?1:0;
  s.expectedVisitors=baseVisitors+hubExtra+flyerExtra+decoExtra;
  return {rawVisitors,baseVisitors,hubExtra,flyerExtra,decoExtra};
 }
 /* Today's Event, and everything it does to a Day that is otherwise already decided. */
 morningEvent(ids){const s=this.run;
  s.event=this.rollEvent();s.eventSeen=!s.event;if(s.event)(s.eventLog??=[]).push(s.event.id);s.pilgrimage=0;s.closedGates=[];const ev=s.event?.effects||{};
  if(ev.unknown){const unused=ids.filter(id=>!s.dungeons.some(d=>d.id===id));const d=this.makeDungeon(this.rng.pick(unused.length?unused:ids));d.name='미확인 '+d.short;d.power*=1.16;d.reward*=1.5;d.temporary=true;s.dungeons.push(d);}
  /* EVENT 52 게이트 임시 폐쇄 / 55 게이트 안정화 작업 (v2.9.11): before the day's multipliers, so they read the final Gates */
  /* User 2026-09-30: the closed Gate is kept aside for the screens (`오늘 폐쇄`); it takes no visitor and no expedition */
  if(ev.closeGate){const open=s.dungeons.map((d,i)=>i).filter(i=>!s.dungeons[i].temporary);if(open.length>=2)s.closedGates.push(...s.dungeons.splice(this.rng.pick(open),1));}
  if(ev.tierOne)s.dungeons=s.dungeons.map(d=>d.temporary||d.tier===1?d:this.makeDungeon(d.family,1));
  s.dungeons.forEach(d=>{d.power*=(ev.danger||1)*(1+(50-(s.region??50))*.001);d.reward*=ev.reward||1;
   if(ev.cold&&!d.hazards.includes('cold')&&!d.hazards.includes('fire'))d.hazards.push('cold');
   if(ev.poison&&!d.hazards.includes('poison'))d.hazards.push('poison');});
  /* EVENT §20 본사 폐기 유예 (User 2026-09-28, v2.9.10 quick patch; was a refund of the overnight waste's cost, which the
     player never saw and could not act on): stock whose last sale day is today - the shelf's `오늘까지`, discarded tonight
     (nightDiscard, v2.9.11) - gets one more day. Only that stock; nothing bought later today is touched. */
  if(ev.wasteDelay)for(const st of s.inventory)if(st.expires===s.day+1)st.expires+=1;
  /* EVENT 46 냉장고 고장 (v2.9.11): Food/Drink shelf life -1 Day; what becomes due today leaves tonight as usual */
  if(ev.shelfCut)for(const st of s.inventory)if(st.expires!==null&&['food','drink'].includes(D.itemBy[st.item].category))st.expires=Math.max(s.day,st.expires-1);
  if(ev.deathLimit)s.riteBonus=(s.riteBonus||0)+ev.deathLimit;
 }
 /* DUNGEON_HAZARD §DEEP EXPEDITION: today's Deep is one of today's own highest-Tier Gates,
    chosen once the Gates are final so the recorded Power is the real one. The tie is broken on
    a stream derived from the seed and the Day, which keeps the run stream's draw count on a
    Deep Day identical to any other Day. Family, Tier and Hazards are the base Gate's. */
 morningDeep(){const s=this.run;
  if(!this.deepDay(s.day))return;
  const top=Math.max(...s.dungeons.map(d=>d.tier));
  const pool=s.dungeons.map((d,i)=>i).filter(i=>s.dungeons[i].tier===top);
  s.deep.today={day:s.day,gateIndex:new G.RNG(String(s.seed)+':deep:'+s.day).pick(pool),nomineeId:null,paid:0};
 }
 /* Who actually walks in: the day's intake, the shelf they will be sold from, the weighted
    selection out of everyone available, and what each of them arrives wanting. */
 morningQueue({rawVisitors,baseVisitors,hubExtra,flyerExtra=0,decoExtra}){const s=this.run,ev=s.event?.effects||{};
  /* EVENT 신입 모험가 시즌: the event used to create an NPC and stop there - which the third-day
     intake does anyway - and pass a rookie flag that Adventurer.create never reads, so nothing
     about the day actually changed. The arrival is held here and seated below, in one of the
     day's own visit slots. No new Level band and no extra visitor: the Day-based level rule is
     untouched and the headcount is the headcount. */
  const arrival=((s.day>1&&s.day%3===0)||ev.rookie||ev.royal)?this.addNPC({royal:!!ev.royal}):null;
  /* SA-Q44: the hidden NPC pity bump is retired. After 8 quiet Days it used to reach into an
     un-met adventurer and raise their Rarity floor and potential on a 60% roll, invisibly and
     with no routed Design owner. Nothing compensates for it: Rarity and potential are now only
     ever what Adventurer.create rolled. */
  this.generateOffers();
  let visitors=Math.max(1,s.expectedVisitors+(ev.visitors||0));
  let available=s.npcs.filter(n=>n.alive&&!n.recovery),selected=[];
  /* EVENT 45 길드 소집령 (v2.9.11): the highest-Level adventurer does not come today; the headcount is drawn from the rest */
  if(ev.summons&&available.length>=2){const top=available.reduce((a,b)=>b.level>a.level?b:a);available=available.filter(n=>n!==top);}
  /* SA-Q45. A force-seated newcomer takes an EXISTING slot, so they must not create one. They
     are a body in `available`, and on a Day whose roster is smaller than the intake the slot
     count is that roster - so counting them would let the Day fill one more slot than it could
     have filled without the Event, which is the visitor increase Canonical forbids. The seats
     are therefore counted on the roster as it stood before the arrival. The draw pool itself is
     untouched: on any Day the roster could already fill, capacity===available.length and both
     the slot count and every weighted draw are bit-for-bit what they were. */
  const seats=!!arrival&&(ev.rookie||ev.royal);
  const capacity=seats?available.filter(n=>n!==arrival).length:available.length;
  for(let i=0;i<Math.min(visitors,capacity);i++){const pool=available.filter(n=>!selected.includes(n)),existing=pool.filter(n=>n.introduced),fresh=pool.filter(n=>!n.introduced),existingSum=existing.reduce((v,n)=>v+1+n.loyalty*D.balance.loyaltyRevisit,0);const n=this.rng.weighted(pool,n=>{const base=n.introduced?(s.day>20?.8:.62)*(1+n.loyalty*D.balance.loyaltyRevisit)/Math.max(1,existingSum):(s.day>20?.2:.38)/Math.max(1,fresh.length);return base*n.traits.reduce((a,tid)=>a*(D.traitBy[tid].effects.revisitMult||1),1)*(n.introduced&&s.dayFacilities.includes('member')?D.relicParams.member.revisitMult:1);});selected.push(n);}
  /* ...and the new face is guaranteed one of those slots, by taking the last one drawn rather
     than by adding a slot. The number of weighted draws is unchanged, so a Day without the
     event is bit-for-bit what it was. */
  /* SA-Q45 / EVENT_v2.8 §왕립 기사단 방문: the royal Event seats the same way. It already generates
     exactly one royal-profile newcomer above, and its eligibility already refuses to fire without
     Living NPC Cap room, so the only thing it was missing was the seat - 왕립 기사단 방문 could fire
     without the knight ever visiting. One seating rule serves both. (The Store Support that also
     seated here was remade into 첫 방문 쿠폰 on 2026-09-23 and no longer seats anyone.) */
  if((ev.rookie||ev.royal)&&arrival&&selected.length&&!selected.includes(arrival))selected[selected.length-1]=arrival;
  /* EVENT §08 (User 2026-09-25, v2.9.0): a morning with no existing slot to give (every other adventurer dead or
     on recovery days) would seat nobody - the newcomer is then that Day's only visitor. The one case the Event
     adds a visitor, on a Day that would otherwise have none. */
  else if((ev.rookie||ev.royal)&&arrival&&!selected.length)selected.push(arrival);
  /* EVENT 34 단골의 날 (v2.9.11): one trusted regular not already coming joins today's visitors */
  if(ev.regularVisit){const reg=available.filter(n=>!selected.includes(n)&&n.introduced&&G.Adventurer.isTrustedRegular(n));if(reg.length)selected.push(this.rng.pick(reg));}
  s.visitorBreakdown={base:baseVisitors,rawBase:rawVisitors,board:baseVisitors-rawVisitors,hub:hubExtra,flyer:flyerExtra,decoration:decoExtra,event:ev.visitors||0,available:available.length};s.queue=selected.map(n=>n.id);s.cursor=0;
  for(const n of selected){n.destination=this.rng.int(0,s.dungeons.length-1);n.claimedDestination=n.destination;n.destinationFinal=true;if(n.traits.includes('liar')&&s.dungeons.length>1&&this.rng.next()<0.5){const others=s.dungeons.map((d,i)=>i).filter(i=>i!==n.claimedDestination);if(others.length)n.destination=this.rng.pick(others);}/* ECONOMY_ORDER_v2.8 §ORDINARY NPC WALLET ON VISIT / SA-Q49 re-measure amendment: visit income
    narrowed to randomInt(0,80) inclusive (was 0..100) after the four-arm re-measure isolated the
    excess Store-Gold expansion to this step. Fresh base 180, Level x8 and the 2000 cap unchanged. */
n.money=Math.min(2000,Math.round((n.introduced?n.money:180)+n.level*8+this.rng.int(0,80)+this.awayWallet(n)));n.awayDays=0;n.newToday=!n.introduced;}
  /* ECONOMY_ORDER §Away Wallet (User 2026-10-02): an adventurer who could have come and did not earns elsewhere - each such
     Day banks one, up to a few, paid on the next visit. Counted after the draw, so it adds no RNG draw. */
  for(const n of s.npcs)if(n.alive&&!n.recovery&&n.introduced&&!selected.includes(n))n.awayDays=Math.min(D.balance.awayWallet.maxDays,(n.awayDays||0)+1);
  /* NPC_TRAIT destinationDefault / SALE §EXPECTED DESTINATION (User 2026-09-25): every open Gate is claimed by at
     least one visitor whenever there are as many visitors as Gates - the per-Gate count on MORNING / ORDER was
     showing Gates nobody would visit. The ordinary draw above is untouched; only a Day that left a Gate empty
     moves one visitor into it, picked at random from a Gate that holds two or more and never one a 거짓말쟁이
     already sent elsewhere, so the stream of every other Day is unchanged. */
  if(s.dungeons.length>1&&selected.length>=s.dungeons.length)for(let g=0;g<s.dungeons.length;g++){
   if(selected.some(n=>n.claimedDestination===g))continue;
   const movable=selected.filter(n=>n.destination===n.claimedDestination&&selected.filter(m=>m.claimedDestination===n.claimedDestination).length>1);
   if(!movable.length)continue;const n=this.rng.pick(movable);n.destination=n.claimedDestination=g;}
  /* EVENT §03 게이트 순례 주간: "actual destination changes to a different currently open Gate"
     reads against the expected/reported destination (claimedDestination) - the one thing the
     Player was shown - not against the current actual n.destination, which a 거짓말쟁이 may
     already have secretly diverted. Filtering on n.destination let a 거짓말쟁이's own reroute
     land the reroll back on exactly what was shown, silently erasing the Event for them. */
  if(ev.pilgrimage&&s.dungeons.length>1&&selected.length){const targets=this.rng.shuffle(selected).slice(0,Math.min(this.rng.int(1,3),selected.length));
   for(const n of targets){const others=s.dungeons.map((d,i)=>i).filter(i=>i!==n.claimedDestination);if(!others.length)continue;n.destination=this.rng.pick(others);n.pilgrim=true;s.pilgrimage++;}}
  /* SA-Q43: the non-Canonical random 길드 지원 opportunity is not generated. The field is still
     cleared every Morning so a stale v8 save cannot carry one back in. */
  s.special=null;
 }
 generateOffers({advancePity=true}={}){const s=this.run,ev=s.event?.effects||{};const num=Math.max(3,D.balance.orderOffers+(this.has('extraOrder')?D.relicParams.extraOrder.extraOffers:0)+(ev.offers||0));s.offers=[];for(let i=0;i<num;i++)s.offers.push(this.rollOffer());
 /* EVENT §02 (User 2026-09-29): HQ names its 1+1 SKU on the Day's first sheet only. A Reroll ends the promotion - rolling
    again for a 1+1 on the SKU the player wanted is not the Event's play. Same rule as 새벽 회수 계약's extra slot below. */
 if(ev.double&&advancePity){const x=s.offers.find(o=>D.itemBy[o.item].rarity===0)||s.offers[0];if(x)x.promo=true;}
 /* EVENT 암시장 appends ONE extra Event-origin slot after the ordinary ones. Everything below
    works on the ordinary slots alone, so no Counter guarantee can consume that special offer -
    which is exactly what writing to `s.offers.length-1` used to do the moment the Event fired.
    SA-Q19: the row carries `origin` so the screen can name where it came from. It is set here,
    on the one Event-origin row, and on nothing else - an ordinary offer has no origin and gets
    no source label, because this is special-offer presentation and not a generic rarity
    attribution. */
 if(ev.blackmarket)s.offers.push({...this.rollOffer(2,1.35),origin:'blackmarket'});
 /* 새벽 회수 계약: the Day's first generation (never a Reroll) carries one extra Food/Drink slot,
    after the ordinary and Event slots so no guarantee below can consume it. */
 if(advancePity&&this.has('dawnRecovery'))for(let i=0;i<D.relicParams.dawnRecovery.extraOffers;i++)s.offers.push(this.rollOffer(0,1,G.Relics.food));
 const ordinary=num;
 const rare=s.offers.some(o=>D.itemBy[o.item].rarity>=2);if(advancePity)s.pity.rare=rare?0:s.pity.rare+1;
 /* ECONOMY_ORDER §Known-Hazard Counter pity (User 2026-10-02): every sheet drawn counts - the Day's first and each Reroll -
    so three sheets in a row without a Counter for a known Hazard bring one, however they were drawn. Rare pity above
    still counts the Day's first sheet only. */
 const hazards=G.Relics.known(this);s.pity.hazards??={};{for(const h of hazards)s.pity.hazards[h]=s.offers.some(o=>G.Relics.directCounter(D.itemBy[o.item],[h]))?0:(s.pity.hazards[h]||0)+1;s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}
 if(s.pity.counter>=3&&hazards.length){
  const missing=hazards.filter(h=>s.pity.hazards[h]>=3),target=missing.length?missing:hazards;
  const matches=D.items.filter(it=>G.Meta.itemUnlocked(this.account,it,s.day)&&G.Relics.directCounter(it,target));
  /* ECONOMY_ORDER §ORDER OFFER VARIETY (User 2026-10-02): the guarantee picks a Counter not already at the sheet's cap, if any */
  const others=s.offers.filter((o,i)=>i!==ordinary-1),room=matches.filter(it=>others.filter(o=>o.item===it.id).length<D.balance.offerSameItemMax);
  if(matches.length)s.offers[ordinary-1]=this.offerFor(this.rng.pick(room.length?room:matches));
 }
 if(hazards.length){for(const h of hazards)if(s.offers.some(o=>G.Relics.directCounter(D.itemBy[o.item],[h])))s.pity.hazards[h]=0;
  s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}
 for(const o of s.offers){const it=D.itemBy[o.item];if(it.rarity>=2)s.stats.rare++;if(it.rarity===4)s.stats.legendary++;if(!this.account.discovered.includes(it.id)){this.account.discovered.push(it.id);s.stats.discoveries++;}}
 }
 /* META_v2.7 §FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE: applied AFTER the existing
    Contract / Event / Offer calculation and inside the same single Math.round, so there is no
    second rounding convention. ORDER stock only - Reroll, Relic, Deep sponsorship and the
    Final transfer each read their own price and are untouched. */
 /* ECONOMY_ORDER §ORDER OFFER QUANTITY (User 2026-09-27, v2.9.7): Common / Uncommon 2~4, Rare 1~3 (it was 1), Epic /
    Legendary 1 - the Rare mid-Run Counters could not be stocked for more than one customer. */
 offerFor(it,price=1){const s=this.run,ev=s.event?.effects||{};return {item:it.id,price:Math.round(it.buy*price*(ev.price||1)*(it.category==='potion'?(ev.potionPrice||1):1)*(ev.categoryPrice?.[it.category]||1)*(this.has('fresh24')&&G.Relics.food(it)?D.relicParams.fresh24.orderPriceMult:1))
  /* RELIC 원정 도시락 코너 (User 2026-10-02): a flat +5G on every Food/Drink order price, after the percentage modifiers */
  +(this.has('expeditionMeal')&&G.Relics.food(it)?D.relicParams.expeditionMeal.orderPriceAdd:0),quantity:(it.rarity===2?this.rng.int(1,3):it.rarity>=2?1:this.rng.int(2,4))+(s.previousSales>=4&&this.has('rotation')?D.relicParams.rotation.supplyBonus:0)};}
 rollOffer(min=0,price=1,only=null){const s=this.run,ev=s.event?.effects||{};/* FINAL_EXPEDITION §Final-specific Item boundary (User 2026-09-29): D30 has no SALE, and an Item with no Final effect
   cannot go in a Final Bag, so the D30 sheet never offers one - the same explicit no-effect exclusion D30 Store Supports use */
 let pool=D.items.filter(it=>G.Meta.itemUnlocked(this.account,it,s.day)&&(!only||only(it))&&!(s.day>=30&&this.finalNoEffect(it.id)));
 /* ECONOMY_ORDER §ORDER OFFER VARIETY (User 2026-10-02): one sheet holds an Item on at most offerSameItemMax slots - a slot
    already supplies 2~4 units, so a third copy only hides another Item. The sheet being built is s.offers; with nothing left
    under the cap the cap yields rather than leave a slot empty. */
 const roomy=pool.filter(it=>(s.offers||[]).filter(o=>o.item===it.id).length<D.balance.offerSameItemMax);if(roomy.length)pool=roomy;/* ECONOMY_ORDER_v2.7 §ORDER RARITY PROGRESSION: the band for the CURRENT Day, so a Reroll
    cannot bypass Day progression - it rolls the same band. The inherited Rare pity rides on
    top of that band rather than restoring the retired fixed table. */
  const band=D.rarityBands.find(b=>s.day<=b.maxDay)||D.rarityBands.at(-1);
  const rates=band.weights.map((w,v)=>v===2?w+(s.pity.rare>=5?3:0):w);const tiers=[0,1,2,3,4].filter(v=>v>=min&&pool.some(it=>it.rarity===v));let rarity=this.rng.weighted(tiers,v=>rates[v]*(this.has('rareContract')&&v>=2?D.relicParams.rareContract.rareWeightMult:1));pool=pool.filter(it=>it.rarity===rarity);
 const it=this.rng.weighted(pool,it=>{let w=1;if(it.effects.potion)w*=(ev.potionWeight||1);return w*G.Relics.offerWeight(this,it);});return this.offerFor(it,price);}
 order(index){const s=this.run;if(!['order','final'].includes(s.phase))return false;const o=s.offers[index];if(!o||o.quantity<=0)throw Error('품절된 발주입니다.');if(s.money<o.price)throw Error('발주 자금이 부족합니다.');const units=o.promo?2:1;if(!this.canStock(D.itemBy[o.item],units))throw Error('창고가 가득 찼습니다.');s.money-=o.price;s.daily.spent+=o.price;s.stats.spent+=o.price;o.quantity--;for(let k=0;k<units;k++)this.stock(o.item,1,Math.floor(o.price/units)+(k<o.price%units?1:0));this.save();return true;}
 open(){const s=this.run;if(s.phase!=='order')return;if(Object.values(s.cart||{}).some(q=>q>0))throw Error('선택한 발주를 먼저 확정해 주세요.');s.phase='sell';this.arrive();if(!s.queue.length)this.night();this.save();}
 /* SALE_v2.7 §PRE-COMMIT INFORMATION BOUNDARY. The expedition outlook the decision surface
    shows is a SALE-ENTRY snapshot, taken before this visit's first transaction and frozen for
    the whole visit: Combat Forecast, Hazard Readiness, the exact 실패 시 사망 위험 % and the
    Great Success signal. Recomputing any of them as Items are focused or committed turns the
    decision into answer-following, which the owner forbids in both directions. The runtime
    preparation state is NOT frozen - Resolve still reads the final Bag. Nothing here draws
    from the run RNG, so taking the snapshot does not move the seeded stream. */
 /* ECONOMY_ORDER §Away Wallet (User 2026-10-02): per banked Day half an ordinary visit's average income (Level x4 + 20), at most
    maxDays - always below what the visit itself brings (Level x8 + 0~80, plus the expedition's own Wallet reward, growth and
    Loyalty), so coming often stays the better life; a regular simply misses fewer Days. */
 awayWallet(n){const a=D.balance.awayWallet,k=Math.min(a.maxDays,n.awayDays||0);return n.introduced?k*(n.level*a.perLevel+a.base):0;}
 outlookFor(n){
  const d=this.claimedGateFor(n)||this.run.dungeons[0];
  const v={...n};  // the snapshot is a systems-layer calculation; it does not reach for the UI module
  const p=G.Dungeon.prepare(v,d,this.run.facilities);
  const hazards=p.hazards.map(h=>({key:h.key,label:h.label}));
  return {day:this.run.day,gate:d.id,
   combat:G.Dungeon.estimate(v,d,this.run.facilities),
   hazards,
   worst:hazards.length?['취약','불안','대응','충분'].find(l=>hazards.some(h=>h.label===l)):null,
   deathRisk:G.Dungeon.failureDeathRisk(v,d,this.run.facilities).chance,
   greatSignal:G.Dungeon.greatSuccessSignal(v,d,this.run.facilities)};
 }
 /* SA-Q25: `last.events.length` was broader than sold-Item causality - a Trait-only event
    (강골's injury-guard, for one) satisfied it with nothing the Player sold. The callback now
    reads `last.heroProof`, the same persisted DUNGEON_HAZARD RESULT-PROOF record NIGHT itself
    proves a Hero Item line from - never a Trait-only or merely-carried Item. */
 arrive(){const n=this.current();if(!n)return;n.newToday=!n.introduced;n.introduced=true;n.visits++;n.outlook=this.outlookFor(n);if(n.traits.includes('rich')){n.money=Math.min(2000,n.money+50);}if(this.has('premiumMember')&&G.Adventurer.isTrustedRegular(n))n.money+=D.relicParams.premiumMember.arrivalGold;if(n.newToday&&this.has('firstVisitCoupon'))n.money+=D.relicParams.firstVisitCoupon.arrivalGold;n.money=Math.min(2000,n.money);
 /* 의무실 현판: an adventurer who walks in with an ordinary Injury (never 중상) may leave it at the
    door. The roll is drawn only while the Decoration is worn and only for an injured arrival. */
 n.healedBy=null;if(n.injury===1&&this.wears('infirmaryPlaque')&&this.rng.next()<D.decorationParams.infirmaryPlaque.healChance){n.injury=0;n.status='건강';n.healedBy='infirmaryPlaque';this.run.daily.infirmaryHeals=(this.run.daily.infirmaryHeals||0)+1;}
 /* RELIC 응급 처치대 (User 2026-09-28, v2.9.11): the same door heal as the 의무실 현판, at 20%, drawn only for an injured arrival
    and only while the support is owned (after the plaque, so one heal is never rolled twice). */
 if(n.injury===1&&this.has('firstAidDesk')&&this.rng.next()<D.relicParams.firstAidDesk.healChance){n.injury=0;n.status='건강';n.healedBy='firstAidDesk';this.run.daily.firstAidHeals=(this.run.daily.firstAidHeals||0)+1;}
 /* EVENT 24 길드 의료단 순회 / 33 길드 휴양일 / 31 길드 연회 (v2.9.11): at the door, from today's Event */
 {const dv=this.run.event?.effects||{};
  if(n.injury===1&&dv.healVisitors){n.injury=0;n.status='건강';n.healedBy='medcorps';}
  if(dv.arrivalFatigue)n.fatigue=Math.max(0,(n.fatigue||0)-dv.arrivalFatigue);
  n.feast=dv.feast||0;}const ev=this.run.event?.effects||{};
  /* META §sign — 원정 지원금 간판 (User 2026-09-26, v2.9.7): the Event 추가 구매 channel - a share of the purse spendable this
     visit only, never taken from the purse and cleared every night, so nothing compounds; with the Event the shares add. */
  n.eventBudget=Math.round(n.money*((ev.wallet?ev.wallet-1:0)+(this.wears('sponsorSign')?D.decorationParams.sponsorSign.budgetShare:0)))+(ev.flatBudget||0)+(n.injury===1?(ev.injuredBudget||0):0)+(this.run.firstRun&&n.lessonPayday===this.run.day?LESSON.paydayBudget:0)
  /* CORE_RUN §FIRST-RUN LESSONS (User 2026-10-02): the injured visitor of the kit lesson brings the kit's 정가 to spend this
     visit, so the lesson is never lost to an empty purse */
  +(this.run.firstRun&&n.id===this.run.lessonInjured&&(this.run.lessonKitDay??3)===this.run.day?D.itemBy.kit.sell:0);const last=n.records.at(-1);this.run.say={npc:n.id,text:G.Copy.arrive(n,this.run.day,!n.newToday&&n.visits%6===0&&!!last?.heroProof,this.run)};}
 current(){return this.run.npcs.find(n=>n.id===this.run.queue[this.run.cursor]);}
 interest(n,it,mode='full'){
 const rule=D.pricing[mode];if(!rule)throw Error('알 수 없는 판매 방식입니다.');
 const list=it.sell;
 const price=Math.round(list*rule.mult),d=this.gateFor(n)||this.run.dungeons[0],p=it.effects;
 /* What the customer weighs the offer against. Identical to `price` for 할인 and 바가지; for
    정가 it is the lower judged price the approved threshold sets. It never changes what is
    charged or what has to be affordable - only how willingly the offer is taken. */
 /* 단골 묶음혜택: a 단골's second paid purchase today - the customer pays, and is judged on, half
    the charged price; the store still receives the whole of it and HQ pays the other half. */
 const bundle=this.has('memberBundle')&&G.Adventurer.isTrustedRegular(n)&&n.history.filter(h=>h.day===this.run.day&&h.paid>0).length===1?price-Math.round(price*D.relicParams.memberBundle.payShare):0;
 const judged=bundle?price-bundle:Math.round(list*(rule.intentMult??rule.mult));
 /* ECONOMY_ORDER_v2.8 §FULL-CHAIN NUMERIC CLOSURE / SA-Q48: 50% 할인 and 정가 are the
    accessible modes and share one flat base need. 바가지 alone keeps the pre-amendment
    Hazard-fit formula - this patch does not touch overcharge acceptance. */
 let need;
 if(mode==='overcharge'){
  /* 관련 준비 (RELIC §COUNTER JUDGEMENT): the direct Counter values plus the pressed Stats' values */
  const fit=d.hazards.reduce((v,h)=>v+Math.max(0,p[h]||0)+Math.max(0,p[G.Dungeon.hazardRule(h).stat]||0),0);
  need=.53+Math.min(.29,fit*.012);
 }else need=D.balance.accessibleNeed;
 /* The healing good an injured adventurer reaches for is Insurance now; `medical` is gone.
    SA-Q48: the former one-Bag-slot-filled -0.10 modifier is retired - the two-slot Bag is the
    capacity decision by itself. */
  if(n.injury&&it.category==='insurance')need+=.25;
 for(const id of n.traits){const t=D.traitBy[id].effects;need+=t.buyBias||0;if(judged>D.balance.frugalThreshold)need+=t.priceBias||0;need+=(it.rarity>=2?t.rareBias:t.commonBias)||0;if(mode==='overcharge')need+=t.overchargeBias||0;}
 if(this.has('premiumMember')&&it.rarity>=2&&G.Adventurer.isTrustedRegular(n))need+=D.relicParams.premiumMember.rareIntentBonus;
 /* CORE_RUN §FIRST-RUN LESSONS (User 2026-10-02): the DAY 3 payday customer of the account's first Run takes the first
    150% offer it can pay for - once; every later one is decided as any customer's */
 const payday=mode==='overcharge'&&this.run.firstRun&&n.lessonPayday===this.run.day&&!n.lessonPaydayTaken;
 if(this.has('coldcase')&&G.Relics.food(it)&&it.rarity>=1)need+=D.relicParams.coldcase.intentBonus;
 /* 첫 방문 쿠폰: the whole of an adventurer's first-ever visit */
 if(this.has('firstVisitCoupon')&&n.newToday&&n.visits<=1)need+=D.relicParams.firstVisitCoupon.intentBonus;
 if(this.run.event?.effects.foodDemand&&['food','drink'].includes(it.category))need+=this.run.event.effects.foodDemand;
 if(this.run.event?.effects.medicalDemand&&it.category==='insurance')need+=this.run.event.effects.medicalDemand;
 if(this.run.event?.effects.drinkDemand&&it.category==='drink')need+=this.run.event.effects.drinkDemand;
 /* 길드 보증 진열대 reads the CHARGED price, both for the threshold and for the 20%. */
 const guarantee=this.has('guarantee')&&!this.run.guaranteeUsed&&price>=D.relicBy.guarantee.minPrice?Math.round(price*D.relicParams.guarantee.subsidyRate):0;const debit=Math.max(0,price-guarantee-bundle);const wallet=n.money+(n.eventBudget||0);const burden=Math.max(0,judged-guarantee)/Math.max(1,wallet);
 /* The judged price reaches the decision here, for the mode that declares a weight for it -
    only 정가 does. Until this existed the approved .65 threshold could not move an acceptance
    at all: chance read the flat per-mode sentiment and nothing about what the offer costs
    against this customer's purse. The term is pivoted on the measured median 정가 burden, and it
    only ever adds: a light offer may gain a bonus, and at or above the pivot the burden term
    contributes 0 and never subtracts. 할인 and 바가지
    declare no weight, so their term is zero and they are decided exactly as they always were. */
 const weight=rule.intentWeight||0;
 /* The term is a BONUS for a light offer, never a penalty for a heavy one: max(0, ...) floors it
    at zero, so price burden can only ever help 정가 acceptance. A purse that cannot cover the
    debit is already refused above by the wallet<debit gate, which is where affordability is
    decided - it is not this term's job to punish an offer the customer can actually pay for. */
 const burdenIntentBonus=weight*Math.max(0,(rule.intentPivot||0)-burden);
 /* SA-Q48: for an affordable accessible-mode offer (50% 할인 / 정가) that validly Counters at
    least one Hazard of this customer's actual Gate under the canonical Counter predicate, the
    acceptance is floored/capped at 0.97 - even when a negative purchase Trait would otherwise
    lower rawChance. No new Counter floor is added to 바가지. */
 const counters=mode!=='overcharge'&&G.Relics.relatedPrep(it,d.hazards);
 /* 왕도 프리미엄 인증 lifts the flat 바가지 intent penalty by +10%p for its owner (-0.16 -> -0.06; v2.9.11, User 2026-09-29 -
    it lifted the whole penalty before); nothing else about 150% moves. */
 const flat=mode==='overcharge'&&this.has('royalCert')?rule.intent+D.relicParams.royalCert.intentBonus:rule.intent;
 /* ECONOMY_ORDER §PURCHASE INTENT final scale (v2.9.2, User 2026-09-25): only 정가 carries one, applied after the
    floor/clamp so the whole 정가 purchase chance - 0.97 관련 준비 included - drops by the same ratio. */
 const chance=wallet<debit?0:payday?1:(counters?.97:clamp(need+n.loyalty*.002+flat+burdenIntentBonus,.08,.97))*(rule.finalScale||1);
 return {price,debit,guarantee,bundle,chance,need:need>=.75?'높음':need>=.5?'보통':'낮음',burden:wallet<debit?'손님 소지금 부족':burden>.7?'높음':burden>.35?'보통':'낮음',label:wallet<debit?'손님 소지금 부족':need>=.75?'필요도 높음':need>=.5?'필요도 보통':'필요도 낮음',reason:wallet<debit?'손님 소지금이 모자랍니다.':mode==='overcharge'||burden>.7?'가격 부담으로 구매를 망설입니다.':need<.5?'필요도가 낮아 구매를 망설입니다.':'이번 제안을 받아들이지 않았습니다.'};
 }
 sell(stockId,mode='full'){
 const s=this.run;if(s.phase!=='sell')return false;const n=this.current();if(!n)throw Error('현재 손님이 없습니다.');if(n.pack.length>=G.Adventurer.slots(n))throw Error('원정 소모품 슬롯이 가득 찼습니다.');const selectedUnit=s.inventory.find(x=>x.id===stockId);const earliest=selectedUnit?s.inventory.filter(x=>x.item===selectedUnit.item).sort((a,b)=>(a.expires??Infinity)-(b.expires??Infinity))[0]:null;const i=s.inventory.findIndex(x=>x===earliest);if(i<0)throw Error('재고가 없습니다.');const st=s.inventory[i],it=D.itemBy[st.item],key=it.id+':'+mode;
 if(n.refused.includes(key))throw Error('이미 거절한 조건입니다. 다른 가격이나 상품을 골라 주세요.');
 /* EVENT 44 가격 단속 (v2.9.11): 바가지 is closed today - the price key is disabled; a scripted call records it as closed and sells nothing */
 if(mode==='overcharge'&&s.event?.effects.noOvercharge){if(!n.refused.includes(key))n.refused.push(key);return false;}
 const intent=this.interest(n,it,mode);if(n.money+(n.eventBudget||0)<intent.debit)throw Error('손님의 소지금이 부족합니다.');
 const accepted=this.rng.next()<intent.chance;
 if(!accepted){n.refused.push(key);const reason=intent.burden==='높음'||mode==='overcharge'?'price':intent.need==='낮음'?'need':'choice';n.refusalReasons??=[];n.refusalReasons.push({item:it.id,mode,reason});
  /* SALE_v2.7 §SAME-ITEM REFUSAL PRICE CEILING: ANY actual refusal of a SKU closes every
     higher price for that SKU for the rest of the visit - the rule is about retry fishing, so
     it cannot depend on WHY they said no. Source only applied it to a price refusal, which
     left the paradox open: refuse at 50% for a Counter they do not need, then sell at 150%.
     Lower prices stay open, and no other SKU is touched. */
  for(const [other,rule]of Object.entries(D.pricing))if(rule.mult>D.pricing[mode].mult&&!n.refused.includes(it.id+':'+other))n.refused.push(it.id+':'+other);s.say={npc:n.id,text:G.Copy.refuse(n,it.id,reason,s.day,s)};this.save();return false;}
 if(mode==='overcharge'&&this.run.firstRun&&n.lessonPayday===s.day)n.lessonPaydayTaken=true;
 s.inventory.splice(i,1);n.pack.push(it.id);const fromEvent=Math.min(n.eventBudget||0,intent.debit);if(fromEvent)n.eventBudget-=fromEvent;n.money-=intent.debit-fromEvent;if(intent.guarantee)this.run.guaranteeUsed=true;s.money+=intent.price;s.daily.revenue+=intent.price;s.stats.revenue+=intent.price;
 if(Number.isFinite(st.cost)&&!st.costUnknown)s.daily.cogs+=st.cost;else {s.daily.unknownCosts=(s.daily.unknownCosts||0)+1;s.daily.unknownRevenue=(s.daily.unknownRevenue||0)+intent.price;}s.daily.sales=(s.daily.sales||0)+1;s.daily.overcharge+=Math.max(0,intent.price-it.sell);s.daily.discount+=Math.max(0,it.sell-intent.price);
 let loyalty=D.pricing[mode].loyalty;if(n.traits.includes('honest')&&['full','half'].includes(mode))loyalty+=1;if(this.has('stamp')&&intent.price>0&&loyalty>0)loyalty=Math.round(loyalty*D.relicParams.stamp.loyaltyMult);
 if(s.event?.effects.halfPrice&&mode==='half'&&!s.halfPriceUsed){s.money+=D.balance.halfPriceSupport;s.daily.subsidy+=D.balance.halfPriceSupport;s.halfPriceUsed=true;}
 let commission=0;if(this.has('royalCert')&&mode==='overcharge')commission+=Math.round(intent.price*D.relicParams.royalCert.commissionRate);if(this.has('supplyCert')&&it.rarity>=2&&(G.Relics.directCounter(it,G.Relics.known(this))||it.effects.escape||it.effects.revive)){commission+=Math.round(it.sell*D.relicParams.supplyCert.commissionRate);n.money+=D.relicParams.supplyCert.goldBonus;}
 /* 희귀상품 입고 계약 (v2.9.11, User 2026-09-29): a Rare+ sale is charged at the ordinary price and HQ pays the store 10%
    of the charged price on top - the customer is never asked for it (it was a +10% the customer paid). */
 if(this.has('rareContract')&&it.rarity>=2)commission+=Math.round(intent.price*D.relicParams.rareContract.hqBonus);
 if(this.has('groupOrder')&&s.daily.sales>=D.relicParams.groupOrder.commissionFrom)commission+=D.relicParams.groupOrder.commission;
 /* 원정 전문 인증: the buyer of a Counter for their own Gate collects +50G on the next visit, once per purchase Day */
 s.money+=commission;s.daily.commission=(s.daily.commission||0)+commission;
 const before=n.loyalty;this.loyal(n,loyalty);s.daily.loyalty+=n.loyalty-before;
 n.history.push({day:s.day,item:it.id,mode,paid:intent.price,cost:st.cost,costUnknown:!!st.costUnknown,debit:intent.debit,guarantee:intent.guarantee,subsidy:intent.bundle,commission,loyalty:n.loyalty-before});
 /* SA-Q11. A committed purchase is the one thing the Player did, so the Great Success signal
    - and ONLY that signal - is recomputed against the Bag they just changed. The rest of the
    SALE-ENTRY snapshot stays frozen: Combat Forecast, Hazard Readiness and the 실패 시 사망
    위험 % are arrival information, and refreshing them as Items are committed is the
    answer-following SALE_v2.7 §PRE-COMMIT INFORMATION BOUNDARY forbids. A refused or failed
    sale returns above this line, so it cannot reach the recompute at all. */
 if(n.outlook)n.outlook.greatSignal=G.Dungeon.greatSuccessSignal({...n},this.claimedGateFor(n)||s.dungeons[0],s.facilities);
 s.say={npc:n.id,text:G.Copy.buy(n,it.id,mode,s.day,s)};this.save();return true;
 }
 cartTotal(cart=this.run.cart||{}){return Object.entries(cart).reduce((v,[i,q])=>v+this.relicQuote(Number(i),q,cart),0);}
 /* unusedCartFood / unusedStockFood: Food+Drink counts kept for a later balance check. No rule reads them today. */
 validateCart(cart){const s=this.run;if(!['order','final'].includes(s.phase))throw Error('발주 시간이 아닙니다.');let count=0,unusedCartFood=0;for(const [i,q]of Object.entries(cart)){const o=s.offers[i];if(!o||!Number.isInteger(q)||q<0||q>o.quantity)throw Error('발주 수량을 확인해 주세요.');count+=q*(o.promo?2:1);if(['food','drink'].includes(D.itemBy[o.item].category))unusedCartFood+=q;}
 const cap=s.event?.effects.orderCap;if(cap){const per={};for(const [i,q]of Object.entries(cart)){const it=s.offers[i]?.item;if(it)per[it]=(per[it]||0)+q;}if(Object.values(per).some(v=>v>cap))throw Error('오늘은 같은 상품을 '+cap+'개까지만 발주할 수 있습니다.');}
 if(this.cartTotal(cart)>s.money)throw Error('발주 자금이 부족합니다.');const unusedStockFood=s.inventory.filter(x=>['food','drink'].includes(D.itemBy[x.item].category)).length;
 if(s.inventory.length+count>this.capacity())throw Error('창고가 가득 찼습니다.');return true;}
 setQuantity(i,q){const cart={...(this.run.cart||{}),[i]:q};this.validateCart(cart);this.run.cart=cart;this.save();}
 /* UI_UX §ORDER quantity interaction (User 2026-09-24, v2.9.0): the largest quantity this offer takes right now AND what stops
    the next one - `supply` (the offer's own count), `money` (with the Gold still missing for one more) or `space` (warehouse).
    The reason is what the blocked dial control says when tapped (COPY_AUDIT §3-9); maxQuantity keeps its old contract. */
 quantityLimit(i){const s=this.run,o=s.offers[i];let q=0,reason='supply',lack=0;
  for(let n=1;n<=o.quantity;n++){const cart={...(s.cart||{}),[i]:n};try{this.validateCart(cart);q=n;}catch(e){reason=e.message==='발주 자금이 부족합니다.'?'money':/까지만 발주/.test(e.message)?'cap':'space';if(reason==='money')lack=this.cartTotal(cart)-s.money;break;}}
  return {max:q,reason,lack};}
 maxQuantity(i){return this.quantityLimit(i).max;}
 confirmOrder(){const s=this.run,cart=s.cart||{};this.validateCart(cart);let bulk=Object.keys(cart).some(i=>Object.keys(cart).filter(j=>s.offers[j].item===s.offers[i].item).reduce((n,j)=>n+cart[j],0)>=3);for(const [i,q]of Object.entries(cart)){if(!q)continue;const o=s.offers[i],price=this.relicQuote(Number(i),q,cart);s.money-=price;s.daily.spent+=price;s.stats.spent+=price;o.quantity-=q;const units=q*(o.promo?2:1),unit=Math.floor(price/units);for(let k=0;k<units;k++)this.stock(o.item,1,unit+(k<price%units?1:0));if(q>=3)bulk=true;}if(bulk)s.bulkUsed=true;s.cart={};s.notice='발주 완료.';this.save();}
 /* RELIC 평생 단골제 (User 2026-10-02): once a 단골 while it is owned, Loyalty never drops below the 단골 line again */
 loyal(n,amount){const was=G.Adventurer.isTrustedRegular(n);n.loyalty=clamp(n.loyalty+amount,was&&this.has('lifetime')?G.Adventurer.TRUSTED_REGULAR:0,100);if(!was&&G.Adventurer.isTrustedRegular(n))this.run.stats.regulars++;}
 /* SALE / NPC_TRAIT §NON-PURCHASE LOYALTY (2026-09-23): a visit that ends with a paid purchase
    today still adds +1 on departure; a visit without one adds nothing. Survival is +1. */
 depart(){const s=this.run;if(s.phase!=='sell')return;const n=this.current();if(n&&n.history.some(h=>h.day===s.day&&h.paid>0))this.loyal(n,1);s.cursor++;if(s.cursor>=s.queue.length)this.night();else this.arrive();this.save();}
 /* ITEM §SHELF LIFE (User 2026-09-28, v2.9.11; was the next morning): stock whose last sale day is today - the shelf's
    `오늘까지` - and that did not sell is discarded tonight, when SALE closes, so it lands on today's receipt as `오늘 폐기`.
    A save from an earlier build may still hold stock past its day; it goes with tonight's. */
 nightDiscard(){const s=this.run;
  let expired=s.inventory.filter(x=>x.expires!==null&&x.expires<=s.day+1);
  /* 새벽 회수 계약: Food/Drink whose shelf life ends is taken back at 50% of what it cost instead
     of being wasted - it leaves the shelf all the same, but it is not waste. */
  if(this.has('dawnRecovery')){const back=expired.filter(x=>G.Relics.food(D.itemBy[x.item])),refund=back.reduce((a,x)=>a+Math.round((Number(x.cost)||0)*D.relicParams.dawnRecovery.refundRate),0);
   s.money+=refund;s.daily.subsidy+=refund;expired=expired.filter(x=>!back.includes(x));s.inventory=s.inventory.filter(x=>!back.includes(x));}
  s.daily.waste=expired.length;s.daily.wasteCost=expired.reduce((a,x)=>a+x.cost,0);
  /* NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT (v2.9.7): the receipt names what expired, so the Day keeps it per Item */
  s.daily.wasteItems=expired.reduce((m,x)=>(m[x.item]=(m[x.item]||0)+1,m),{});s.stats.waste+=expired.length;s.inventory=s.inventory.filter(x=>x.expires===null||x.expires>s.day+1);}
 night(){const s=this.run;if(s.phase!=='sell')return;const ev=s.event?.effects||{};s.results=[];
  /* DUNGEON_HAZARD §BAD-LUCK PREPARATION ASSIST (hidden, User 2026-09-25, v2.9.1 balance): a
     per-Night chain of carried, non-성공/대성공 ordinary expeditions - reset once a Night, never
     shown to the Player, never persisted past it. Deep expeditions neither count nor are assisted. */
  let badLuckChain=0;
 for(const id of s.queue){const n=s.npcs.find(n=>n.id===id);if(!n?.alive)continue;const d=this.gateFor(n);
  const carried=n.pack.length>0&&!d.deep,assist=carried&&badLuckChain>=3?.10+.05*(badLuckChain-3):0;
  const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities,s,assist);
  if(carried)badLuckChain=['성공','대성공'].includes(rep.outcome)?0:badLuckChain+1;
  if(n.claimedDestination!==undefined&&n.destination!==n.claimedDestination){rep.routeChange=G.Copy.routeChangeLine(n,s.dungeons[n.claimedDestination].name,d.name);n.records.at(-1).routeChange=rep.routeChange;} /* NPC_TRAIT §DEEP EXPEDITION NPC REWARD: on top of the ordinary result, never instead of it.
     Two bands only - Success and Great Success - with no extra Day/Tier multiplier, because the
     ordinary reward already carries that. EXP goes through the ordinary growth curve (no
     automatic Level +1) and the Wallet bonus uses the ordinary persisted money channel, so a
     later visit carries it under the existing Wallet rules. A failed outcome earns no special
     Deep bonus and keeps its ordinary handling. Amounts are PASS3; while unapproved they are 0. */
  if(d.deep&&n.alive&&['성공','대성공'].includes(rep.outcome)){
   const t=D.deepTuning,great=rep.outcome==='대성공';
   const bonusXp=(great?t.greatExp:t.successExp)||0,bonusWallet=(great?t.greatWallet:t.successWallet)||0;
   rep.deep={great,bonusXp,bonusWallet};
   if(bonusXp)rep.changes.push(...G.Adventurer.grow(n,bonusXp,this.rng));
   if(bonusWallet)n.money+=bonusWallet;
  }else if(d.deep)rep.deep={great:false,bonusXp:0,bonusWallet:0};
  s.results.push(rep);if(rep.storeBonus){s.money+=rep.storeBonus;s.daily.greatSuccess+=rep.storeBonus;}if(n.alive){this.loyal(n,1);if(n.visits>1&&n.history.some(h=>h.day===s.day&&h.paid>0)&&this.has('returnPoints')){this.loyal(n,D.relicParams.returnPoints.loyaltyBonus);n.money+=D.relicParams.returnPoints.goldBonus;}}else s.stats.deaths++;G.Meta.observe(this.account,rep,n);}
 this.nightDiscard();
 s.daily.operating=this.expectedOperatingCost();
 s.money-=s.daily.operating;s.phase='night';s.reportHistory.push({day:s.day,...s.daily,balance:s.money});s.region=Math.max(0,Math.min(100,(s.region??50)+s.results.reduce((v,r)=>v+(r.won?2:r.outcome==='사망'?-4:-1),0)));s.regionReport=!s.results.length?'오늘은 원정에 나선 손님이 없었다.':s.results.filter(r=>r.won).length>=Math.ceil(s.results.length/2)?'공략 성과로 게이트 주변 통행이 안정됐습니다.':'원정대가 고전하며 게이트 앞 경계가 강화됐습니다.';s.notice='밤의 귀환 보고가 도착했습니다.';this.save();}
}
G.Game=Game;
})(globalThis);
