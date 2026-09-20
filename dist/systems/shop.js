(function(G){
/* Stage 10, approved (§O). Stage 9 measured FIRE as the hardest Family for all six Jobs and by
   a wide margin - the `one Family is always hardest` clause of DUNGEON_HAZARD BALANCE TARGET.
   Its combat requirement is eased; its Hazard identity and Stat mapping are untouched, so what
   makes a fire Gate a fire Gate is unchanged. Provisional: re-measured, and if FIRE is still
   consistently worst by 10%p a further candidate is reported rather than applied. v2.5 final
   (H1): .92 -> .90, which narrowed the gap to the next Family by about a third. fire is still
   the hardest Family and ships that way, on the playtest follow-up. The factor
   itself lives in D.balance.fireCombat so the balance harness can compare a candidate against
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
 const startGold=1000+(Object.values(loadout).includes('thriftSafe')?D.balance.decorationStartGold:0);
 this.rng=new G.RNG(seed);this.run={version:8,seed:String(seed),rngState:this.rng.state,branch:this.rng.pick(D.brand.branches),day:1,phase:'order',money:startGold,contract,loadout,settled:false,inventory:[],npcs:[],facilities:[],offers:[],queue:[],cursor:0,dungeons:[],event:null,results:[],log:[],team:[],region:50,stats:{revenue:0,spent:0,waste:0,deaths:0,rare:0,legendary:0,discoveries:0,regulars:0},daily:{revenue:0,spent:0,waste:0,operating:0},pity:{rare:0,counter:0},nextNPC:1,rerolled:false,rewarded:false,rescueUsed:0,rescueDay:0,reportHistory:[],notice:'제7게이트의 첫 아침. 오늘 갈 던전을 보고 발주해 보세요.'};
 for(const[id,num]of D.openingStock)this.stock(id,num);
 for(let i=0;i<9;i++)this.addNPC();this.run.familyOrder=this.rng.shuffle(['spider','slime','fire','crypt','snow']);this.run.familyIntro=[this.rng.int(4,7),this.rng.int(8,12)];
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
 const boss=new G.RNG(String(seed)+':boss');this.run.bossId=boss.pick(D.bosses).id;this.run.bossReveal={identitySeen:false,traitSeen:false};
 if(this.run.bossId==='SLOTH'){this.run.slothDays=boss.shuffle([15,20,25]).slice(0,2).sort((a,b)=>a-b);this.run.sealBreakCount=0;}
this.run.phase='foundation';this.relicWindow(0);return this.run;
 }
 capacity(){return D.balance.warehouse+(this.has('warehouse')?10:0);}
 /* ECONOMY_ORDER §OPERATING COST (Stage 10, approved). Overhead follows the Day AND the quality
    of the roster the player has actually built, so a store that grows good adventurers keeps
    having to sell well to hold on to them - the pressure does not fall away after the mid-game.
    Averaging the WHOLE pool would reward hoarding level-1 bodies to dilute the figure, so it is
    the Core Roster: the six best adventurers still alive in the pool, by Level then Rarity.
    Recovering adventurers count - they are still on the books. Fewer than six, everyone.
    Nothing is persisted: both averages are derived from the roster as it stands. */
 coreRoster(){return this.run.npcs.filter(n=>n.alive)
  .sort((a,b)=>b.level-a.level||b.rarity-a.rarity).slice(0,6);}
 overheadBase(){const core=this.coreRoster();
  const avgLevel=core.length?core.reduce((a,n)=>a+n.level,0)/core.length:1;
  const avgRarity=core.length?core.reduce((a,n)=>a+n.rarity,0)/core.length:0;
  const dayBase=90+2*(this.run.day-1);
  return dayBase*(1+.02*(avgLevel-1))*(1+.06*avgRarity);}
 expectedOperatingCost(){const s=this.run,ev=s.event?.effects||{};
  /* META_v2.8 §RETIRED: no Start Contract branch survives here. A stale v8 save may still
     carry a `contract` value, and it must change nothing at all. */
  const extras=(s.dayFacilities?.includes('showcase')?10:0)-(s.dayFacilities?.includes('efficiency')?30:0)+(ev.audit&&s.stats.waste>=6?Math.min(100,s.stats.waste*5):0);
  /* RELIC_v2.7 §VISITOR RELICS: hub costs a share of overheadBase, taken on that base alone -
     never on the flat extras, and never compounded with another percentage modifier. */
  const base=this.overheadBase(),hub=s.dayFacilities?.includes('hub')?base*D.balance.hubOverheadRate:0;
  return ev.overheadFree?0:Math.round((base+hub+extras)/10)*10;}
 has(id){return this.run.facilities.includes(id);}
 /* A Decoration is read from the Run's frozen loadout, never from facilities. `has` stays the
    Relic question and the two never answer for each other. */
 wears(id){return Object.values(this.run.loadout||{}).includes(id);}
 canStock(item,count=1){return this.run.inventory.length+count<=this.capacity();}
 stock(id,count,cost=null){const it=D.itemBy[id];for(let i=0;i<count;i++)this.run.inventory.push({id:'stock-'+this.run.day+'-'+this.run.nextNPC+'-'+this.run.inventory.length+'-'+this.rng.int(0,999999),item:id,expires:it.days?this.run.day+it.days+G.Relics.shelf(this,it):null,cost:cost??it.buy});}
 /* COPY_WORLD_VOICE 9: rarely the visitor is a Rare Reference identity instead of an ordinary
    one. Only the name changes - no stat, trait, rarity or reward differs, so the reference is
    the whole easter egg and a player who misses it loses nothing. The roll is always drawn so
    the draw count of creating a customer does not depend on who is left; a given identity is
    offered once per Run, dead or alive, because it is a fixed identity rather than a name. */
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
  s.notice=n.name+' 님이 심층원정에 나섭니다.';this.save();return true;}
 addNPC(opts={}){const s=this.run;if(s.npcs.filter(n=>n.alive).length>=22)return null;let n=G.Adventurer.create(this.rng,s.nextNPC++,s.day,this.account,{premium:this.wears('premiumCase'),...opts});
  const spare=G.Adventurer.EASTER.filter(e=>!s.npcs.some(x=>x.name===e.name));
  if(this.rng.next()<D.balance.easterChance&&spare.length)n.name=this.rng.pick(spare).name;
  else for(let retry=0;s.npcs.some(x=>x.alive&&x.name===n.name)&&retry<200;retry++)n.name=G.Adventurer.name(this.rng,n.rarity);
  s.npcs.push(n);return n;}
 burden(tier){const roll=this.rng.next();return tier===2&&roll<.35?3:tier===3&&roll<.55?5:0;}
 finalEligible(){return this.run.npcs.filter(n=>n.alive&&n.introduced&&!n.recovery);}
 /* FINAL_EXPEDITION_v2.7 §D25 FINAL STATE GENERATION. The Pair is drawn on a stream derived
    from the run seed, the way the Deep Days and the Boss already are, rather than from the run
    stream. That is what makes it the same answer whether it is generated on D25 or read back
    after a reload - a Save/Load can never reroll it - and it costs the run stream no draw, so
    generating it five Days earlier does not move any other seeded result. */
 makeFinal(){const s=this.run,base=D.dungeonBy.final;
  const families=new G.RNG(String(s.seed)+':final').shuffle(['spider','slime','fire','crypt','snow']).slice(0,2);
  const hazards=[...new Set(families.flatMap(id=>D.familyTiers[id][1]))];
  return {...base,families,familyNames:families.map(id=>D.dungeonBy[id].name),hazards,day:30,tier:2,family:'final',scale:4.6,requiredSupply:0,power:D.balance.bossPower/3,reward:2};}
 makeDungeon(id,tier=null){const s=this.run,base=D.dungeonBy[id];
 if(tier===null){const weights=G.Dungeon.tierWeights(s.day);tier=this.rng.weighted([1,2,3],t=>weights[t-1]);}
 return {...base,name:base.name+' '+['','I','II','III'][tier],family:id,tier,hazards:[...D.familyTiers[id][tier-1]],day:s.day,scale:1+s.day*.10+(tier-1)*.6,stars:tier,requiredSupply:this.burden(tier),power:(21+G.Dungeon.gateDayTerm(s.day)+(tier-1)*5+(id==='fire'?6+(tier-1)*8:0)+(base.base-2)*1.3)*(id==='fire'?D.balance.fireCombat:1),reward:base.reward*(1+(tier-1)*.12)};
 }
 eventEligible(e){const s=this.run,fx=e.effects;
  if(fx.cold)return s.dungeons.some(d=>!d.hazards.includes('cold')&&!d.hazards.includes('fire'));
  if(fx.poison)return s.dungeons.some(d=>!d.hazards.includes('poison'));
  if(fx.pilgrimage)return s.dungeons.length>=2&&s.expectedVisitors>=3;
  if(fx.audit)return s.stats.waste>=6;
  if(fx.rookie||fx.royal)return s.npcs.filter(n=>n.alive).length<22;
  return true;}
 /* EVENT §DEEP EXPEDITION DAY EXCLUSION: a Day this Run actually holds a 심층원정 produces no
    Normal Event, whether or not the player later nominates anyone. rollEvent draws before it
    asks this, so suppressing an Event costs the run stream no draw. The 35% chance is NOT
    compensated for the days this removes - Stage 9 measures the real count. */
 eventEligibleDay(day){return day>=3&&day<=29&&![5,10,15,20,25].includes(day)&&!this.deepDay(day);}
 deepDay(day){return (this.run?.deep?.days||[]).includes(day);}
 rollEvent(){const s=this.run,fired=this.rng.next()<.35;if(!this.eventEligibleDay(s.day)||!fired)return null;
  const pool=D.events.filter(e=>this.eventEligible(e));return pool.length?this.rng.weighted(pool,e=>e.weight):null;}
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
  this.save();
 }
 /* Everything the new Day clears or carries over before anything is rolled: the ledger, the
    Day's flags, what spoiled overnight, and each adventurer's own per-Day state. */
 morningReset(){const s=this.run;
  s.previousSales=s.daily.sales||0;s.dayFacilities=[...s.facilities];s.bulkUsed=false;s.guaranteeUsed=false;s.phase=s.day===30?'final':'morning';s.daily={revenue:0,spent:0,waste:0,operating:0,cogs:0,overcharge:0,discount:0,subsidy:0,liquidation:0,wasteCost:0,loyalty:0,sales:0,relicSpent:0,commission:0,greatSuccess:0,deepSponsor:0,unknownCosts:0};s.nightCursor=0;s.say=null;s.closing=false;if(s.deep)s.deep.today=null;s.cart={};s.rerolled=false;s.rerollCount=0;s.tastingUsed=false;s.results=[];s.team=[];s.notice='DAY '+s.day+' · '+s.branch+'의 아침. 오늘의 던전을 확인하세요.';
  const expired=s.inventory.filter(x=>x.expires!==null&&x.expires<=s.day);s.daily.waste=expired.length;s.daily.wasteCost=expired.reduce((a,x)=>a+x.cost,0);s.stats.waste+=expired.length;s.inventory=s.inventory.filter(x=>x.expires===null||x.expires>s.day);
  s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;if(!n.recovery){n.injury=0;n.status='건강';}}n.pack=[];n.refused=[];n.refusalReasons=[];n.pilgrim=false;n.eventBudget=0;});
 }
 /* The milestone window, the Final state, and today's Gates. Returns the Family id pool the
    Event's unknown Gate draws from, or null on the Final Day, which has no more Morning left. */
 morningGates(){const s=this.run;
  if([5,10,15,20,25,30].includes(s.day))this.relicWindow(s.day);
  /* FINAL_EXPEDITION_v2.7 §D25: the Final state is generated and revealed on D25, BEFORE the
     ordinary D25 management decisions that can use it. D30 consumes this exact persisted state
     and never generates a new Pair. D25 grants no Counter Items, no free stock and no shop. */
  if(s.day>=25&&!s.final)s.final=this.makeFinal();
  if(s.day===30){s.event=null;s.eventSeen=true;s.pilgrimage=0;s.dungeons=[s.final||(s.final=this.makeFinal())];s.queue=[];return null;}
  s.familyOrder??=this.rng.shuffle(['spider','slime','fire','crypt','snow']);s.familyIntro??=[5,10];const ids=s.familyOrder.slice(0,3+Number(s.day>=s.familyIntro[0])+Number(s.day>=s.familyIntro[1]));const counts=G.Dungeon.gateCountRule(s.day),count=counts.length===1?counts[0]:this.rng.int(counts[0],counts.at(-1));s.dungeons=this.rng.shuffle(ids).slice(0,count).map(id=>this.makeDungeon(id));
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
  const baseVisitors=s.dayFacilities.includes('board')?Math.max(4,rawVisitors):rawVisitors;
  let hubExtra=0;
  if(s.dayFacilities.includes('hub')){const r=this.rng.next();hubExtra=r<.45?1:r<.60?2:0;}
  /* META_v2.8 wall: its own Morning roll, independent of board and hub. */
  const decoExtra=this.wears('guildPlaque')&&this.rng.next()<D.balance.wallVisitorChance?1:0;
  s.expectedVisitors=baseVisitors+hubExtra+decoExtra;
  return {rawVisitors,baseVisitors,hubExtra,decoExtra};
 }
 /* Today's Event, and everything it does to a Day that is otherwise already decided. */
 morningEvent(ids){const s=this.run;
  s.event=this.rollEvent();s.eventSeen=!s.event;s.pilgrimage=0;const ev=s.event?.effects||{};
  if(ev.unknown){const unused=ids.filter(id=>!s.dungeons.some(d=>d.id===id));const d=this.makeDungeon(this.rng.pick(unused.length?unused:ids));d.name='미확인 '+d.short;d.power*=1.16;d.reward*=1.5;d.temporary=true;s.dungeons.push(d);}
  s.dungeons.forEach(d=>{d.power*=(ev.danger||1)*(1+(50-(s.region??50))*.001);d.reward*=ev.reward||1;
   if(ev.cold&&!d.hazards.includes('cold')&&!d.hazards.includes('fire'))d.hazards.push('cold');
   if(ev.poison&&!d.hazards.includes('poison'))d.hazards.push('poison');});
  if(ev.wasteFree&&s.daily.wasteCost){s.money+=s.daily.wasteCost;s.daily.subsidy+=s.daily.wasteCost;s.daily.wasteCost=0;}
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
 morningQueue({rawVisitors,baseVisitors,hubExtra,decoExtra}){const s=this.run,ev=s.event?.effects||{};
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
  /* SA-Q45. A force-seated newcomer takes an EXISTING slot, so they must not create one. They
     are a body in `available`, and on a Day whose roster is smaller than the intake the slot
     count is that roster - so counting them would let the Day fill one more slot than it could
     have filled without the Event, which is the visitor increase Canonical forbids. The seats
     are therefore counted on the roster as it stood before the arrival. The draw pool itself is
     untouched: on any Day the roster could already fill, capacity===available.length and both
     the slot count and every weighted draw are bit-for-bit what they were. */
  const seats=!!arrival&&(ev.rookie||ev.royal||s.dayFacilities.includes('rookieBoard'));
  const capacity=seats?available.filter(n=>n!==arrival).length:available.length;
  for(let i=0;i<Math.min(visitors,capacity);i++){const pool=available.filter(n=>!selected.includes(n)),existing=pool.filter(n=>n.introduced),fresh=pool.filter(n=>!n.introduced),existingSum=existing.reduce((v,n)=>v+1+n.loyalty*.025,0);const n=this.rng.weighted(pool,n=>{const base=n.introduced?(s.day>20?.8:.62)*(1+n.loyalty*.025)/Math.max(1,existingSum):(s.day>20?.2:.38)/Math.max(1,fresh.length);return base*n.traits.reduce((a,tid)=>a*(D.traitBy[tid].effects.revisitMult||1),1)*(n.introduced&&s.dayFacilities.includes('member')?1.4:1)*(n.loyalty>=60&&s.dayFacilities.includes('lifetime')?1.5:1);});selected.push(n);}
  /* ...and the new face is guaranteed one of those slots, by taking the last one drawn rather
     than by adding a slot. The number of weighted draws is unchanged, so a Day without the
     event is bit-for-bit what it was. */
  /* RELIC_v2.8 §ROOKIE BOARD: 신입 모집 게시판 seats the same way. A new adventurer generated
     today takes one of today's own slots - the support adds no visitor, draws nothing and
     claims no probability. On a Day that generates nobody it does nothing at all.
     SA-Q45 / EVENT_v2.8 §왕립 기사단 방문: so does the royal Event. It already generates exactly
     one royal-profile newcomer above, and its eligibility already refuses to fire without Living
     NPC Cap room, so the only thing it was missing was the seat - 왕립 기사단 방문 could fire
     without the knight ever visiting. One seating rule now serves all three. */
  if((ev.rookie||ev.royal||s.dayFacilities.includes('rookieBoard'))&&arrival&&selected.length&&!selected.includes(arrival))selected[selected.length-1]=arrival;
  s.visitorBreakdown={base:baseVisitors,rawBase:rawVisitors,board:baseVisitors-rawVisitors,hub:hubExtra,decoration:decoExtra,event:ev.visitors||0,available:available.length};s.queue=selected.map(n=>n.id);s.cursor=0;
  for(const n of selected){n.destination=this.rng.int(0,s.dungeons.length-1);n.claimedDestination=n.destination;n.destinationFinal=true;if(n.traits.includes('liar')&&s.dungeons.length>1&&this.rng.next()<0.5){const others=s.dungeons.map((d,i)=>i).filter(i=>i!==n.claimedDestination);if(others.length)n.destination=this.rng.pick(others);}n.money=Math.min(2000,Math.round((n.introduced?n.money:150)+n.level*8+this.rng.int(0,60)));n.newToday=!n.introduced;}
  if(ev.pilgrimage&&s.dungeons.length>1&&selected.length){const targets=this.rng.shuffle(selected).slice(0,Math.min(this.rng.int(1,3),selected.length));
   for(const n of targets){const others=s.dungeons.map((d,i)=>i).filter(i=>i!==n.destination);if(!others.length)continue;n.destination=this.rng.pick(others);n.pilgrim=true;s.pilgrimage++;}}
  /* SA-Q43: the non-Canonical random 길드 지원 opportunity is not generated. The field is still
     cleared every Morning so a stale v8 save cannot carry one back in. */
  s.special=null;
 }
 generateOffers({advancePity=true}={}){const s=this.run,ev=s.event?.effects||{};const num=Math.max(3,D.balance.orderOffers+(this.has('terminal')?2:0)+(this.wears('dawnSign')?1:0)+(ev.offers||0));s.offers=[];for(let i=0;i<num;i++)s.offers.push(this.rollOffer());
 if(ev.double){const x=s.offers.find(o=>D.itemBy[o.item].rarity===0)||s.offers[0];if(x)x.promo=true;}
 /* EVENT 암시장 appends ONE extra Event-origin slot after the ordinary ones. Everything below
    works on the ordinary slots alone, so no Counter guarantee can consume that special offer -
    which is exactly what writing to `s.offers.length-1` used to do the moment the Event fired.
    SA-Q19: the row carries `origin` so the screen can name where it came from. It is set here,
    on the one Event-origin row, and on nothing else - an ordinary offer has no origin and gets
    no source label, because this is special-offer presentation and not a generic rarity
    attribution. */
 if(ev.blackmarket)s.offers.push({...this.rollOffer(2,1.35),origin:'blackmarket'});
 const ordinary=num;
 const rare=s.offers.some(o=>D.itemBy[o.item].rarity>=2);if(advancePity)s.pity.rare=rare?0:s.pity.rare+1;
 const hazards=G.Relics.known(this);s.pity.hazards??={};if(advancePity){for(const h of hazards)s.pity.hazards[h]=s.offers.some(o=>G.Relics.counter(D.itemBy[o.item],[h]))?0:(s.pity.hazards[h]||0)+1;s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}
 /* RELIC_v2.8 §EXPEDITION KEYSTONE — COUNTER COVERAGE (REL-Q-v28-16). The keystone is not
    "is there a Counter at all": with two or more known Hazards it guarantees a minimum BREADTH
    of response. Two distinct keys, two distinct slots, and for guarantee accounting a slot
    answers for one key only - an Item that Counters both fills one of the two, never both.
    A slot that already Counters the key is claimed as it stands; only an unclaimed slot is ever
    overwritten, so the ordinary offer count is preserved and no unknown Hazard is named. */
 const claimed=new Set(),slots=[...Array(ordinary).keys()];
 const guarantee=keys=>{for(const key of keys){
   const standing=slots.find(i=>!claimed.has(i)&&G.Relics.counter(D.itemBy[s.offers[i].item],[key]));
   if(standing!==undefined){claimed.add(standing);continue;}
   const matches=D.items.filter(it=>G.Meta.itemUnlocked(this.account,it,s.day)&&G.Relics.counter(it,[key]));
   const slot=[...slots].reverse().find(i=>!claimed.has(i));
   if(!matches.length||slot===undefined)continue;
   s.offers[slot]=this.offerFor(this.rng.pick(matches));claimed.add(slot);}};
 if(this.has('expeditionCert')&&hazards.length){
  /* the keys the Run has gone longest without an answer to are chosen first; the draw itself
     is still shuffled, so which two are picked is not a fixed reading of the Hazard list. */
  const order=this.rng.shuffle([...hazards]).sort((a,b)=>((s.pity.hazards[b]||0)>=3)-((s.pity.hazards[a]||0)>=3));
  guarantee(order.slice(0,hazards.length>=2?2:1));
 }else if(s.pity.counter>=3&&hazards.length){
  const missing=hazards.filter(h=>s.pity.hazards[h]>=3),target=missing.length?missing:hazards;
  const matches=D.items.filter(it=>G.Meta.itemUnlocked(this.account,it,s.day)&&G.Relics.counter(it,target));
  if(matches.length)s.offers[ordinary-1]=this.offerFor(this.rng.pick(matches));
 }
 if(advancePity&&hazards.length){for(const h of hazards)if(s.offers.some(o=>G.Relics.counter(D.itemBy[o.item],[h])))s.pity.hazards[h]=0;
  s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}
 for(const o of s.offers){const it=D.itemBy[o.item];if(it.rarity>=2)s.stats.rare++;if(it.rarity===4)s.stats.legendary++;if(!this.account.discovered.includes(it.id)){this.account.discovered.push(it.id);s.stats.discoveries++;}}
 }
 /* META_v2.7 §FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE: applied AFTER the existing
    Contract / Event / Offer calculation and inside the same single Math.round, so there is no
    second rounding convention. ORDER stock only - Reroll, Relic, Deep sponsorship and the
    Final transfer each read their own price and are untouched. */
 offerFor(it,price=1){const s=this.run,ev=s.event?.effects||{};return {item:it.id,price:Math.round(it.buy*price*(ev.price||1)*(it.category==='potion'?(ev.potionPrice||1):1)),quantity:(it.rarity>=2?1:this.rng.int(2,4))+(this.has('medicine')&&G.Relics.field(it)?1:0)+(it.rarity<=1&&s.previousSales>=6&&this.has('rotation')?1:0)};}
 rollOffer(min=0,price=1){const s=this.run,ev=s.event?.effects||{};let pool=D.items.filter(it=>G.Meta.itemUnlocked(this.account,it,s.day));/* ECONOMY_ORDER_v2.7 §ORDER RARITY PROGRESSION: the band for the CURRENT Day, so a Reroll
    cannot bypass Day progression - it rolls the same band. The inherited Rare pity rides on
    top of that band rather than restoring the retired fixed table. */
  const band=D.rarityBands.find(b=>s.day<=b.maxDay)||D.rarityBands.at(-1);
  const rates=band.weights.map((w,v)=>v===2?w+(s.pity.rare>=5?3:0):w);const tiers=[0,1,2,3,4].filter(v=>v>=min&&pool.some(it=>it.rarity===v));let rarity=this.rng.weighted(tiers,v=>rates[v]*(this.has('showcase')&&v>=2?1.7:1));pool=pool.filter(it=>it.rarity===rarity);
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
 arrive(){const n=this.current();if(!n)return;n.newToday=!n.introduced;n.introduced=true;n.visits++;n.outlook=this.outlookFor(n);if(n.traits.includes('rich')){n.money=Math.min(2000,n.money+50);}const ev=this.run.event?.effects||{};n.eventBudget=ev.wallet?Math.round(n.money*(ev.wallet-1)):0;const last=n.records.at(-1);this.run.say={npc:n.id,text:G.Copy.arrive(n,this.run.day,!n.newToday&&n.visits%6===0&&!!last?.events?.length)};}
 current(){return this.run.npcs.find(n=>n.id===this.run.queue[this.run.cursor]);}
 interest(n,it,mode='full'){
 const rule=D.pricing[mode];if(!rule)throw Error('알 수 없는 판매 방식입니다.');
 const price=Math.round(it.sell*rule.mult),d=this.gateFor(n)||this.run.dungeons[0],p=it.effects;
 /* What the customer weighs the offer against. Identical to `price` for 할인 and 바가지; for
    정가 it is the lower judged price the approved threshold sets. It never changes what is
    charged or what has to be affordable - only how willingly the offer is taken. */
 const judged=Math.round(it.sell*(rule.intentMult??rule.mult));
 let fit=d.hazards.reduce((v,h)=>v+Math.max(0,p[h]||0),0),need=.53+Math.min(.29,fit*.012);
 /* The healing good an injured adventurer reaches for is Insurance now; `medical` is gone. */
  if(n.injury&&it.category==='insurance')need+=.25;if(n.pack.length)need-=.1;
 for(const id of n.traits){const t=D.traitBy[id].effects;need+=t.buyBias||0;if(judged>D.balance.frugalThreshold)need+=t.priceBias||0;need+=(it.rarity>=2?t.rareBias:t.commonBias)||0;if(mode==='overcharge')need+=t.overchargeBias||0;}
 if(this.has('premiumMember')&&it.rarity>=2&&n.loyalty>=50)need+=.1;
 if(this.run.event?.effects.foodDemand&&['food','drink'].includes(it.category))need+=this.run.event.effects.foodDemand;
 if(this.run.event?.effects.medicalDemand&&it.category==='insurance')need+=this.run.event.effects.medicalDemand;
 const guarantee=this.has('guarantee')&&!this.run.guaranteeUsed&&it.sell>=D.relicBy.guarantee.minPrice?Math.round(it.sell*.2):0;const debit=Math.max(0,price-guarantee);const wallet=n.money+(n.eventBudget||0);const burden=Math.max(0,judged-guarantee)/Math.max(1,wallet);
 /* The judged price reaches the decision here, for the mode that declares a weight for it -
    only 정가 does. Until this existed the approved .65 threshold could not move an acceptance
    at all: chance read the flat per-mode sentiment and nothing about what the offer costs
    against this customer's purse. The term is centred on the measured median 정가 burden, so it
    redistributes rather than taxes - a light offer gains, a heavy one loses. 할인 and 바가지
    declare no weight, so their term is zero and they are decided exactly as they always were. */
 const weight=rule.intentWeight||0;
 const chance=wallet<debit?0:clamp(need+n.loyalty*.002+rule.intent+weight*((rule.intentPivot||0)-burden),.08,.97);
 return {price,debit,guarantee,chance,need:need>=.75?'높음':need>=.5?'보통':'낮음',burden:wallet<debit?'손님 소지금 부족':burden>.7?'높음':burden>.35?'보통':'낮음',label:wallet<debit?'손님 소지금 부족':need>=.75?'필요도 높음':need>=.5?'필요도 보통':'필요도 낮음',reason:wallet<debit?'손님 소지금이 모자랍니다.':mode==='overcharge'||burden>.7?'가격 부담으로 구매를 망설입니다.':need<.5?'필요도가 낮아 구매를 망설입니다.':'이번 제안을 받아들이지 않았습니다.'};
 }
 sell(stockId,mode='full'){
 const s=this.run;if(s.phase!=='sell')return false;const n=this.current();if(!n)throw Error('현재 손님이 없습니다.');if(n.pack.length>=G.Adventurer.slots(n))throw Error('원정 소모품 슬롯이 가득 찼습니다.');const selectedUnit=s.inventory.find(x=>x.id===stockId);const earliest=selectedUnit?s.inventory.filter(x=>x.item===selectedUnit.item).sort((a,b)=>(a.expires??Infinity)-(b.expires??Infinity))[0]:null;const i=s.inventory.findIndex(x=>x===earliest);if(i<0)throw Error('재고가 없습니다.');const st=s.inventory[i],it=D.itemBy[st.item],key=it.id+':'+mode;
 if(n.refused.includes(key))throw Error('이미 거절한 조건입니다. 다른 가격이나 상품을 골라 주세요.');
 const intent=this.interest(n,it,mode);if(n.money+(n.eventBudget||0)<intent.debit)throw Error('손님의 소지금이 부족합니다.');
 const accepted=this.rng.next()<intent.chance;
 if(!accepted){n.refused.push(key);const reason=intent.burden==='높음'||mode==='overcharge'?'price':intent.need==='낮음'?'need':'choice';n.refusalReasons??=[];n.refusalReasons.push({item:it.id,mode,reason});
  /* SALE_v2.7 §SAME-ITEM REFUSAL PRICE CEILING: ANY actual refusal of a SKU closes every
     higher price for that SKU for the rest of the visit - the rule is about retry fishing, so
     it cannot depend on WHY they said no. Source only applied it to a price refusal, which
     left the paradox open: refuse at 50% for a Counter they do not need, then sell at 150%.
     Lower prices stay open, and no other SKU is touched. */
  for(const [other,rule]of Object.entries(D.pricing))if(rule.mult>D.pricing[mode].mult&&!n.refused.includes(it.id+':'+other))n.refused.push(it.id+':'+other);s.say={npc:n.id,text:G.Copy.refuse(n,it.id,reason,s.day)};this.save();return false;}
 s.inventory.splice(i,1);n.pack.push(it.id);const fromEvent=Math.min(n.eventBudget||0,intent.debit);if(fromEvent)n.eventBudget-=fromEvent;n.money-=intent.debit-fromEvent;if(intent.guarantee)this.run.guaranteeUsed=true;s.money+=intent.price;s.daily.revenue+=intent.price;s.stats.revenue+=intent.price;
 if(Number.isFinite(st.cost)&&!st.costUnknown)s.daily.cogs+=st.cost;else {s.daily.unknownCosts=(s.daily.unknownCosts||0)+1;s.daily.unknownRevenue=(s.daily.unknownRevenue||0)+intent.price;}s.daily.sales=(s.daily.sales||0)+1;s.daily.overcharge+=Math.max(0,intent.price-it.sell);s.daily.discount+=Math.max(0,it.sell-intent.price);
 let loyalty=D.pricing[mode].loyalty;if(n.traits.includes('honest')&&['full','half'].includes(mode))loyalty+=1;if(this.has('stamp')&&intent.price>0&&loyalty>0)loyalty=Math.round(loyalty*1.5);
 if(s.event?.effects.tasting&&mode==='half'&&!s.tastingUsed){s.money+=D.balance.tastingSupport;s.daily.subsidy+=D.balance.tastingSupport;s.tastingUsed=true;}
 if(this.has('memberBundle')&&n.visits>1&&n.history.filter(h=>h.day===s.day&&h.paid>0).length===1)loyalty+=2;
 let commission=0;if(this.has('royalCert')&&mode==='overcharge'&&it.rarity>=2)commission+=Math.round(it.sell*.20);if(this.has('supplyCert')&&it.rarity>=2&&(G.Relics.counter(it,G.Relics.known(this))||it.effects.escape||it.effects.revive))commission+=Math.round(it.sell*.12);s.money+=commission;s.daily.commission=(s.daily.commission||0)+commission;
 const before=n.loyalty;this.loyal(n,loyalty);s.daily.loyalty+=n.loyalty-before;
 n.history.push({day:s.day,item:it.id,mode,paid:intent.price,cost:st.cost,costUnknown:!!st.costUnknown,debit:intent.debit,guarantee:intent.guarantee,commission,loyalty:n.loyalty-before});
 /* SA-Q11. A committed purchase is the one thing the Player did, so the Great Success signal
    - and ONLY that signal - is recomputed against the Bag they just changed. The rest of the
    SALE-ENTRY snapshot stays frozen: Combat Forecast, Hazard Readiness and the 실패 시 사망
    위험 % are arrival information, and refreshing them as Items are committed is the
    answer-following SALE_v2.7 §PRE-COMMIT INFORMATION BOUNDARY forbids. A refused or failed
    sale returns above this line, so it cannot reach the recompute at all. */
 if(n.outlook)n.outlook.greatSignal=G.Dungeon.greatSuccessSignal({...n},this.claimedGateFor(n)||s.dungeons[0],s.facilities);
 s.say={npc:n.id,text:G.Copy.buy(n,it.id,mode,s.day)};this.save();return true;
 }
 cartTotal(cart=this.run.cart||{}){return Object.entries(cart).reduce((v,[i,q])=>v+this.relicQuote(Number(i),q,cart),0);}
 validateCart(cart){const s=this.run;if(!['order','final'].includes(s.phase))throw Error('발주 시간이 아닙니다.');let count=0,food=0;for(const [i,q]of Object.entries(cart)){const o=s.offers[i];if(!o||!Number.isInteger(q)||q<0||q>o.quantity)throw Error('발주 수량을 확인해 주세요.');count+=q*(o.promo?2:1);if(['food','drink'].includes(D.itemBy[o.item].category))food+=q;}
 if(this.cartTotal(cart)>s.money)throw Error('발주 자금이 부족합니다.');const existingFood=s.inventory.filter(x=>['food','drink'].includes(D.itemBy[x.item].category)).length;
 if(s.inventory.length+count>this.capacity())throw Error('창고가 가득 찼습니다.');return true;}
 setQuantity(i,q){const cart={...(this.run.cart||{}),[i]:q};this.validateCart(cart);this.run.cart=cart;this.save();}
 maxQuantity(i){let q=0;for(let n=1;n<=this.run.offers[i].quantity;n++){try{this.validateCart({...this.run.cart,[i]:n});q=n;}catch(e){break;}}return q;}
 confirmOrder(){const s=this.run,cart=s.cart||{};this.validateCart(cart);let bulk=Object.keys(cart).some(i=>Object.keys(cart).filter(j=>s.offers[j].item===s.offers[i].item).reduce((n,j)=>n+cart[j],0)>=3);for(const [i,q]of Object.entries(cart)){if(!q)continue;const o=s.offers[i],price=this.relicQuote(Number(i),q,cart);s.money-=price;s.daily.spent+=price;s.stats.spent+=price;o.quantity-=q;const units=q*(o.promo?2:1),unit=Math.floor(price/units);for(let k=0;k<units;k++)this.stock(o.item,1,unit+(k<price%units?1:0));if(q>=3)bulk=true;}if(bulk)s.bulkUsed=true;s.cart={};s.notice='발주 완료.';this.save();}
 loyal(n,amount){const was=G.Adventurer.isTrustedRegular(n);n.loyalty=clamp(n.loyalty+amount,0,100);if(!was&&G.Adventurer.isTrustedRegular(n))this.run.stats.regulars++;}
 depart(){const s=this.run;if(s.phase!=='sell')return;const n=this.current();if(n)this.loyal(n,1);s.cursor++;if(s.cursor>=s.queue.length)this.night();else this.arrive();this.save();}
 night(){const s=this.run;if(s.phase!=='sell')return;const ev=s.event?.effects||{};s.results=[];for(const id of s.queue){const n=s.npcs.find(n=>n.id===id);if(!n?.alive)continue;const d=this.gateFor(n);const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities);if(n.claimedDestination!==undefined&&n.destination!==n.claimedDestination){rep.routeChange=(n.pilgrim?'순례 행렬을 따라 '+n.name+'은 예상 목적지 ':'허세를 부린 '+n.name+'은 말했던 ')+s.dungeons[n.claimedDestination].name+' 대신 '+d.name+'으로 향했다.';n.records.at(-1).routeChange=rep.routeChange;} /* NPC_TRAIT §DEEP EXPEDITION NPC REWARD: on top of the ordinary result, never instead of it.
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
  s.results.push(rep);if(rep.storeBonus){s.money+=rep.storeBonus;s.daily.greatSuccess+=rep.storeBonus;}if(n.alive){this.loyal(n,2);if(n.visits>1&&n.history.some(h=>h.day===s.day&&h.paid>0)&&n.loyalty>=30&&this.has('returnPoints')){this.loyal(n,2);n.money+=30;}if(n.loyalty>=60&&this.has('lifetime'))n.money+=50;}else s.stats.deaths++;G.Meta.observe(this.account,rep,n);}
 s.daily.operating=this.expectedOperatingCost();
 s.money-=s.daily.operating;s.phase='night';s.reportHistory.push({day:s.day,...s.daily,balance:s.money});s.region=Math.max(0,Math.min(100,(s.region??50)+s.results.reduce((v,r)=>v+(r.won?2:r.outcome==='사망'?-4:-1),0)));s.regionReport=!s.results.length?'오늘은 원정에 나선 손님이 없었다.':s.results.filter(r=>r.won).length>=Math.ceil(s.results.length/2)?'공략 성과로 게이트 주변 통행이 안정됐습니다.':'원정대가 고전하며 게이트 앞 경계가 강화됐습니다.';s.notice='밤의 귀환 보고가 도착했습니다.';this.save();}
}
G.Game=Game;
})(globalThis);
