(function(G){
const D=G.DATA,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
/* DUNGEON_HAZARD_v2.7 §PREPARED POWER. Forecast, Resolve and the Great-Success margin have to
   read the same prepared ability before hidden combat noise, and three copies of the weights
   is how they drifted apart before - so there is one. 투력 remains the strongest single lever,
   and no Player-facing aggregate Power Stat is created from it. */
const preparedPower=e=>e.combat*.50+e.survival*.34+e.mobility*.27+e.spirit*.20;
const STAT_KEYS=['combat','survival','mobility','spirit'];
/* Trait keys that describe how somebody SHOPS, not how they perform on an expedition. They are
   read by the store, never summed into a prepared effect. */
const BEHAVIOUR_KEYS=new Set(['priceBias','buyBias','rareBias','commonBias','revisitMult','recoveryDelta','foodSupplyDelta','supplyPerItem','injuredCombatPercent','combatPercent','survivalPercent','visitGold','loyaltyBonus','overchargeBias']);

/* ---- 1. Trait modifier aggregation ---------------------------------------------------
   Everything the adventurer brings by being who they are: the flat effects, the two native
   multipliers, and the two Supply deltas. Nothing about Items or the Gate is known here. */
function traitModifiers(n){
 const mult={foodMult:1,potionMult:1};
 const e={supply:0,escape:0,injuryGuard:0,injuryRisk:0,loot:0,xpMult:1,variance:0};
 const sum=k=>n.traits.reduce((a,tid)=>a+(D.traitBy[tid].effects[k]||0),0);
 for(const tid of n.traits){for(const[k,v]of Object.entries(D.traitBy[tid].effects)){
  if(k in mult)mult[k]*=v;else if(BEHAVIOUR_KEYS.has(k))continue;else if(k==='xpMult')e.xpMult*=v;else e[k]=(e[k]||0)+v;}}
 return {mult,e,sum,foodSupplyDelta:sum('foodSupplyDelta'),supplyPerItem:sum('supplyPerItem')};
}

/* ---- 2. Native Core-Stat composition --------------------------------------------------
   ITEM_v2.7 §FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION and NPC_TRAIT_v2.7 §POTIONBODY in
   ONE place. This is the whole answer to "what multiplies this Item's POSITIVE NATIVE Core
   Stat", and it is the only place that answers it: Food-affinity, the Fresh Relics, the meal
   corner's Supply half and Potionbody used to be four separate conditionals down the item
   loop, which is how one of them ended up scoped to 강인함 alone for a whole version.

   Food/Drink take ONE base-additive pool - every approved modifier reads the Item table's own
   base and they are summed once, never multiplied as sequential layers. A Potion takes the
   Potionbody factor. Nothing else takes anything.

   Supply, Hazard Counter, Insurance, Loot, Utility and RiskReward penalties are separate
   channels and are deliberately outside this, which is what `STAT_KEYS.includes(k) && v>0`
   says: a positive native Core Stat, and only that. */
function nativeStatFactor(item,k,v,mult,facilities,d){
 if(!STAT_KEYS.includes(k)||v<=0)return 1;
 const isFood=item.category==='food';
 if(isFood||item.category==='drink'){
  let pool=isFood?mult.foodMult-1:0;
  if(facilities.includes('kitchen'))pool+=D.relicParams.kitchen.statBonus;
  if(facilities.includes('fresh24'))pool+=D.relicParams.fresh24.statBonus;
  return 1+pool;
 }
 if(item.category==='potion')return mult.potionMult;
 return 1;
}
/* A Hazard Counter value (an Item effect keyed by a Hazard) under the two Counter supports:
   야전 정비대 x1.40 on Field Gear, 원정 전문 인증 x1.60 on an Item that Counters a Hazard of the
   Gate actually entered. They multiply each other; neither reaches the flat 원정 도시락 코너 +4,
   which is added outside this channel. "Counters" is the Relics.counter predicate, read inline
   because this module loads before systems/relics.js. */
function counterFactor(item,k,v,facilities,d){
 if(!(k in D.hazards)||v<=0)return 1;
 let f=1;
 if(facilities.includes('medicine')&&item.category==='gear')f*=D.relicParams.medicine.counterMult;
 /* 직접 대응 only (RELIC §COUNTER JUDGEMENT, User 2026-09-24, v2.9.0): the 기동-for-속박/진창 exception is retired */
 if(facilities.includes('expeditionCert')&&d.hazards.some(h=>(item.effects[h]||0)>0))f*=D.relicParams.expeditionCert.counterMult;
 return f;
}
/* Supply is its own channel too: the two Trait deltas, and a Food never drops below 1. */
function supplyContribution(item,value,foodSupplyDelta,supplyPerItem){
 if(item.category==='food')value=Math.max(1,value+foodSupplyDelta);
 if(['food','drink'].includes(item.category))value+=supplyPerItem;
 return value;
}

/* ---- 3. Item contribution -------------------------------------------------------------
   Every Item in the bag, through the three channels above. Core Stats are accumulated apart
   from the rest so the condition modifiers below can apply to the adventurer's own base
   without touching what the bag added. */
function itemContributions(n,d,facilities,mult,foodSupplyDelta,supplyPerItem,e,why){
 const itemStats=[],itemE={combat:0,survival:0,mobility:0,spirit:0};
 let duplicate=0,finalSupply=0;
 for(const id of n.pack){
  const item=D.itemBy[id];if(item.effects.duplicate){duplicate=1;continue;}
  const copies=1+duplicate;duplicate=0;if(copies>1)why.push('황금 1+1: '+item.name+' 효과 '+copies+'회');
  const power=copies,from={};
  for(const[k,v]of Object.entries(item.effects)){
   if(k==='potion')continue;
   let value=v*power;
   if(k==='supply')value=supplyContribution(item,value,foodSupplyDelta,supplyPerItem);
   value*=nativeStatFactor(item,k,v,mult,facilities,d);
   value*=counterFactor(item,k,v,facilities,d);
   if(k==='supply')finalSupply+=value;else if(STAT_KEYS.includes(k)){itemE[k]+=value;from[k]=(from[k]||0)+value;}else e[k]=(e[k]||0)+value;
  }
  /* 원정 도시락 코너: per Food/Drink Item in the Bag, a flat Supply +2 and a flat +4 on every
     Hazard of the Gate the adventurer actually goes to. Flat, so no Counter multiplier reads it. */
  if(facilities.includes('expeditionMeal')&&['food','drink'].includes(item.category)){
   const p=D.relicParams.expeditionMeal;finalSupply+=p.supplyPerItem;
   for(const h of d.hazards)e[h]=(e[h]||0)+p.hazardDefense;}
  if(Object.keys(from).length)itemStats.push({item:item.id,rarity:item.rarity,stats:from});
  const matches=d.hazards.filter(h=>(item.effects[h]||0)>0);if(matches.length)why.push(item.name+': '+matches.map(h=>D.hazards[h]).join('·')+' 대응');
  if(item.effects.survival>=10)why.push(item.name+': 생존 능력 보강');
 }
 return {itemStats,itemE,finalSupply};
}

/* ---- 4. Supply / Fatigue state --------------------------------------------------------
   DUNGEON_HAZARD v2.9.0 §SUPPLY -> FATIGUE (User 2026-09-24): every Supply point is Fatigue
   recovery. No Gate requires Supply, so there is no deficit, no penalty and no excess: current
   Fatigue is removed first (1:1, before departure) and only what survives THAT becomes the buffer
   the outcome gain is charged against once the Outcome actually exists. The two halves stay
   separate fields so the same Supply is never spent twice. */
function supplyState(n,finalSupply){
 const preparedSupply=finalSupply,currentFatigue=n.fatigue||0;
 const preRecovery=Math.min(currentFatigue,preparedSupply);
 const fatigueBeforeExpedition=currentFatigue-preRecovery;
 const remainingSupplyBuffer=preparedSupply-preRecovery;
 return {preparedSupply,currentFatigue,preRecovery,fatigueBeforeExpedition,remainingSupplyBuffer,effectiveFatigue:fatigueBeforeExpedition};
}
/* DUNGEON_HAZARD v2.9.0 §FATIGUE STAT PENALTY: five bands on 0~40, judged on fatigueBeforeExpedition.
   One owner for the thresholds, the names, the Stat terms and the player text; NIGHT and the NPC
   detail read the band from here rather than keeping thresholds of their own. */
const FATIGUE_MAX=40;
const FATIGUE_BANDS=[
 {min:40,name:'탈진',mobility:.40,combat:.40,text:'모든 능력치 -40% · 실패 시 사망 위험 +10%p'},
 {min:30,name:'소진',mobility:.40,combat:.20,text:'기동·정신 -40% · 투력·강인함 -20%'},
 {min:20,name:'과로',mobility:.40,combat:0,text:'기동·정신 -40%'},
 {min:10,name:'지침',mobility:.15,combat:0,text:'기동·정신 -15%'},
 {min:0,name:'정상',mobility:0,combat:0,text:''}];
function fatigueBand(f){const b=FATIGUE_BANDS.find(x=>(f||0)>=x.min)||FATIGUE_BANDS[FATIGUE_BANDS.length-1];return {...b,exhausted:b.min>=FATIGUE_MAX};}

/* ---- 5. Condition modifiers -----------------------------------------------------------
   What the adventurer's own condition does to their own base Stats - percentages on the
   person, never on what the bag contributed. */
function conditionModifiers(n,effectiveFatigue,traitSum,why){
 let combatMod=1+traitSum('combatPercent'),survivalMod=1+traitSum('survivalPercent'),mobilityMod=1,spiritMod=1;
 if(n.injury===1){
  /* NPC_TRAIT §INJURY: this branch is injury===1 only. 중상 carries no Stat penalty - it
     keeps the adventurer home instead - so the line may not claim one on its behalf. */
  const grit=traitSum('injuredCombatPercent');if(grit){combatMod+=grit;why.push('악바리: 부상 중 투력 +'+Math.round(grit*100)+'%');}else{combatMod-=0.15;why.push('부상 페널티: 투력 -15%');}
  survivalMod-=0.20;why.push('부상 페널티: 강인함 -20%');
 }
 const band=fatigueBand(effectiveFatigue);
 if(band.mobility){mobilityMod-=band.mobility;spiritMod-=band.mobility;}
 if(band.combat){combatMod-=band.combat;survivalMod-=band.combat;}
 if(band.min>0)why.push('피로 '+effectiveFatigue+' · '+band.name+': '+band.text);
 return {combat:combatMod,survival:survivalMod,mobility:mobilityMod,spirit:spiritMod};
}

/* ---- 6. Presentation provenance -------------------------------------------------------
   Where each Core Stat came from, for the screen. Reads the state the calculation already
   produced and contributes nothing back to it. */
function statSources(n,itemStats,effectiveFatigue,traitSum){
 const sources={combat:[],survival:[],mobility:[],spirit:[]};
 if(n.equipment&&n.equipment.power)sources.combat.push({name:'장비 ('+n.equipment.name+')',v:n.equipment.power});
 for(const tid of n.traits){
  const eff=D.traitBy[tid].effects;
  for(const k of STAT_KEYS)if(eff[k])sources[k].push({name:D.traitBy[tid].name,v:eff[k]});
  if(eff.combatPercent)sources.combat.push({name:D.traitBy[tid].name,v:eff.combatPercent*100,isPct:true});
  if(eff.survivalPercent)sources.survival.push({name:D.traitBy[tid].name,v:eff.survivalPercent*100,isPct:true});
  if(n.injury===1&&eff.injuredCombatPercent)sources.combat.push({name:D.traitBy[tid].name,v:eff.injuredCombatPercent*100,isPct:true});
 }
 if(n.injury===1){
  if(!traitSum('injuredCombatPercent'))sources.combat.push({name:'부상',v:-15,isPct:true});
  sources.survival.push({name:'부상',v:-20,isPct:true});
 }
 for(const st of itemStats)for(const k of STAT_KEYS)
  if(st.stats[k])sources[k].push({name:D.itemBy[st.item].name,v:st.stats[k]});
 const band=fatigueBand(effectiveFatigue),tag='피로 · '+band.name;
 if(band.mobility){sources.mobility.push({name:tag,v:-Math.round(band.mobility*100),isPct:true});sources.spirit.push({name:tag,v:-Math.round(band.mobility*100),isPct:true});}
 if(band.combat){sources.combat.push({name:tag,v:-Math.round(band.combat*100),isPct:true});sources.survival.push({name:tag,v:-Math.round(band.combat*100),isPct:true});}
 return sources;
}

/* The prepared reading of one adventurer against one Gate. It composes the six pieces above
   in the order the Canonical composition rules run: who they are, what they carry, what that
   leaves them for Supply and Fatigue, what their condition costs them, the prepared Stats,
   and the Hazard reading off those Stats. No rule lives here. */
function prepare(n,d,facilities=[]){
 const why=[],events=[];
 const {mult,e,sum:traitSum,foodSupplyDelta,supplyPerItem}=traitModifiers(n);
 const baseE={combat:n.stats.combat+n.equipment.power,survival:n.stats.survival,mobility:n.stats.mobility,spirit:n.stats.spirit};
 const {itemStats,itemE,finalSupply}=itemContributions(n,d,facilities,mult,foodSupplyDelta,supplyPerItem,e,why);
 const sup=supplyState(n,finalSupply);
 const {effectiveFatigue}=sup;
 e.supply=finalSupply;
 const mod=conditionModifiers(n,effectiveFatigue,traitSum,why);
 for(const k of STAT_KEYS)e[k]=baseE[k]*mod[k]+itemE[k];
 if(n.traits.includes('eater')&&n.pack.some(id=>D.itemBy[id].category==='food'))why.push('대식가: 음식 고유 효과 +30% · 음식의 피로 회복 -1');
 const sources=statSources(n,itemStats,effectiveFatigue,traitSum);

 const hazards=d.hazards.map(h=>hazardState(h,e,d));let hazard=hazards.reduce((v,h)=>v+h.gap,0)/Math.max(1,Math.sqrt(hazards.length));
 if(n.traits.includes('eater')&&n.pack.some(id=>D.itemBy[id].category==='food'))events.push({id:'eater-food',text:'대식가가 음식의 고유 효과를 30% 더 얻었다.'});
 if(n.traits.includes('potionbody')&&n.pack.some(id=>D.itemBy[id].effects.potion))events.push({id:'potionbody',text:'포션체질로 포션의 능력치가 15% 올랐다.'});
 e.effectiveFatigue=effectiveFatigue;
 e.beforeFatigue=sup.currentFatigue;e.preparedSupply=sup.preparedSupply;
 e.preRecovery=sup.preRecovery;e.fatigueBeforeExpedition=sup.fatigueBeforeExpedition;e.remainingSupplyBuffer=sup.remainingSupplyBuffer;
 return {effects:e,sources,hazard,hazards,itemStats,supply:{prepared:sup.preparedSupply,preRecovery:sup.preRecovery,remainingBuffer:sup.remainingSupplyBuffer},why,events};
}
/* DUNGEON_HAZARD_v2.7 §NEXT-DAY GATE FORECAST. The inherited Gate-count progression, in one
   place: the generator draws from it and the forecast reads it, so there is no forecast-only
   RNG path and a reload cannot make the two disagree. A band with one count is deterministic
   and is told as confirmed; a band with two is drawn uniformly, exactly as morning() draws it. */
function gateCountRule(day){
 return day<=3?[1]:day<=7?[1,2]:day<=18?[2]:[2,3];
}
function tierWeights(day){
 const anchors=[[1,[1,0,0]],[5,[1,0,0]],[7,[.85,.15,0]],[8,[.70,.30,0]],[12,[.65,.35,0]],[13,[.55,.42,.03]],[18,[.30,.60,.10]],[19,[.26,.60,.14]],[24,[.10,.60,.30]],[25,[.05,.50,.45]],[29,[0,.45,.55]]];
 if(day>=30)return [0,0,0];for(let i=1;i<anchors.length;i++){const [end,b]=anchors[i],[start,a]=anchors[i-1];if(day<=end){const t=clamp((day-start)/(end-start),0,1);return a.map((v,j)=>v+(b[j]-v)*t);}}return anchors.at(-1)[1].slice();
}
/* DUNGEON_HAZARD v2.9.0 §Hazard Defense (User 2026-09-24, revision 3): one non-투력 Stat per Hazard and no Gate's
   Hazards on the same Stat, 3 / 3 / 3 - 강인함 ×1/3 for 독·냉기·부식, 기동 ×1/2 for 속박·진창·어둠, 정신 ×1/2 for
   공포·화이트아웃·화염 (revision 5: 화염 -> 정신; revision 4: integer conversions `{능력치} n당 대응 1`, rounded in the player's favour from ×0.30 / ×0.40).
   One owner: the readiness calculation below and the player-facing Gate sentence (`{능력치} {n}당 대응 1 제공`) read it. */
const HAZARD_RULES={poison:['survival',1/3],cold:['survival',1/3],corrosion:['survival',1/3],bind:['mobility',1/2],mire:['mobility',1/2],fire:['spirit',1/2],fear:['spirit',1/2],dark:['mobility',1/2],whiteout:['spirit',1/2]};
function hazardRule(h){const r=HAZARD_RULES[h]||['survival',.2];return {stat:r[0],coef:r[1]};}
function hazardState(h,e,d){
 const rules=HAZARD_RULES;
 /* DUNGEON_HAZARD_v2.7 §HAZARD THREAT: the curve reads the Day and the Tier directly, so a
    Hazard means the same thing wherever it appears on that Day at that Tier. */
 const rule=rules[h]||['survival',.2],threat=12+(d.day||1)*.35+((d.tier||1)-1)*6,defense=(e[h]||0)+e[rule[0]]*rule[1],gap=Math.max(0,threat-defense),ratio=defense/threat;
 return {key:h,stat:rule[0],threat,defense,gap,label:ratio>=1?'충분':ratio>=.75?'대응':ratio>=.4?'불안':'취약'};
}
/* the shared qualitative forecast bands - the ordinary expedition and the Final party read the same one */
function band(ratio){return ratio>1.2?'우세':ratio>=.8?'접전':'불리';}
function estimate(n,d,facilities){const e=prepare(n,d,facilities).effects,ratio=preparedPower(e)/d.power;return band(ratio);}
/* DUNGEON_HAZARD §GREAT SUCCESS. The chance rises with how far the PREPARED Combat ability ran
   ahead of what the Gate requires, and the cap keeps it short of certainty at every level of
   preparation - no amount of preparation guarantees 대성공.
     marginRatio = (prepared Combat ability - Gate required Power) / Gate required Power
     chance      = min(cap, max(0, marginRatio x slope))
   There is no threshold on the roll: a small positive margin already earns a small chance.
   signalMargin is only where the player is told the attempt is worth chasing, and it reads the
   same margin, so what is signalled and what is rolled cannot drift apart. Stage 9 baseline. */
function greatSuccessChance(margin){
 const g=D.greatSuccess;
 return Math.min(g.chanceCap,Math.max(0,margin*g.chanceSlope));
}
/* Whether this preparation is worth telling the player about. UI_UX owns where it is shown;
   the number lives here so the signal and the roll are read off one calculation. */
function greatSuccessSignal(n,d,facilities=[]){
 const e=prepare(n,d,facilities).effects;
 const margin=preparedPower(e)/d.power-1;
 return margin>=D.greatSuccess.signalMargin;
}
/* DUNGEON_HAZARD_v2.7 §DEATH RISK. One conditional number, read off a prepared snapshot:
   how likely an ordinary FAILED expedition escalates to Death. It is not the chance that the
   expedition ends in Death - a 성공/대성공 never reaches this roll at all. Both halves read
   the same prepared truth the ordinary Forecast reads, so there is no Death-only combat score
   and no Death-only Hazard table. Departing already injured adds a flat +10%p and lifts the
   cap from 30% to 40%. Exported because SALE shows the pre-supply snapshot of this same
   calculation and the two may not drift apart. */
/* DUNGEON_HAZARD_v2.7 §DEATH RISK — DIRECTOR DOCUMENT BASELINE. Named rather than inlined so
   a harness can measure a candidate against the shipped value without editing the formula.
   These are the canonical numbers; nothing in the game writes to this table. */
/* v2.9.0: departing at Fatigue 40 (탈진) adds the same +10%p term as an injured departure and lifts the cap
   the same way (DUNGEON_HAZARD §Healthy / injured failure Death chance): both together 50%. */
/* DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet baseline (User 2026-09-25, v2.9.1 balance):
   대성공/성공 back to 1.00 (were .90). */
/* DUNGEON_HAZARD §Ordinary EXP (User 2026-09-25, v2.9.2 balance): 대성공 EXP multiplier 1.40 -> 1.10 - a Great Success still
   pays (Store Gold, Wallet and the occurrence are unchanged); what shrinks is the snowball of a grown adventurer out-growing
   the rest through it. */
const GREAT={xp:1.10};
const WALLET_MULT={'대성공':1,'성공':1,'퇴각':.35,'부상':.20,'중상':.10,'사망':0};
const DEATH={combat:.18,environment:.12,cap:.30,injured:.10,injuredCap:.40,exhausted:.10};
/* DUNGEON_HAZARD §Healthy / injured failure Death chance - strainEscalation (User 2026-09-25,
   v2.9.1 balance): only CONSECUTIVE injured departures count now. A healthy departure - including
   the return after a Severe-Injury rest - resets the chain; the first injured departure is free,
   every further one adds 8%p, up to 30%p. Fatigue no longer feeds this term - STRAIN.weary stays
   only as the fatigueEscalation threshold read at the call sites below, and departedWeary keeps
   being recorded even though it no longer reaches strainEscalation. trailingRun() also backs the
   NPC-detail "연속 부상 출발 {n}회" row (batch 6): both read the same trailing run off n.records. */
const STRAIN={step:.08,cap:.30,weary:20};
const strainEscalation=c=>Math.min(STRAIN.cap,STRAIN.step*Math.max(0,c-1));
function trailingRun(records,pred){
 const past=records||[];let c=0;
 for(let i=past.length-1;i>=0&&pred(past[i]);i--)c++;
 return c;
}
const injuredStreak=records=>trailingRun(records,x=>x.departedInjured);
const strainFor=(records,departedInjured)=>departedInjured?strainEscalation(injuredStreak(records)+1):0;
/* DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE. The Day term bends at D9: a party's prepared
   ability stops growing long before Day 30 does, so a single slope left every late Gate further
   out of reach than the one before it. Only this term changes (User 2026-09-25, v2.9.1 balance:
   early 1.70 -> 1.20, late 0.40 -> 0.80 - the early Gates no longer outrun adventurer growth, the
   D20~30 Tier-3 pressure rises; v2.9.2 balance, User 2026-09-25: early 1.20 -> 1.50, late kept -
   a fresh first Run cleared the Boss); every other Gate Power term is what it was. */
const GATE={knee:9,early:1.50,late:0.80};
const gateDayTerm=day=>Math.min(day,GATE.knee)*GATE.early+Math.max(0,day-GATE.knee)*GATE.late;
/* DUNGEON_HAZARD §Preparation / Level Death reduction (User 2026-09-25, v2.9.1 balance). The
   failure Death roll is judged against `failureDeathChance x preparedFactor x levelFactor`, not
   the raw failureDeathChance - a miss that only clears the raw chance settles as 중상/부상 instead
   (§1d in the resolve() failure branch below), never a second Death roll. fullyPrepared() is
   exported so the SALE 만반의 준비 tutorial (batch 5) reads the exact same condition. */
const PREPARED={factor:.80,bandSevere:.36};
function fullyPrepared(n,fatigueBeforeExpedition){
 return n.injury===0&&fatigueBeforeExpedition<20&&(n.pack?n.pack.length:0)>=2;
}
function levelFactor(level){return Math.max(.75,1-.015*((level||1)-1));}
/* DUNGEON_HAZARD §RETREAT HEALING (User 2026-09-25, v2.9.1 balance). An adventurer who departed
   already injured and comes back as 퇴각 is healed with a chance that rises with an unbroken run
   of the same (departed injured, ended 퇴각) result - any other preceding expedition resets it. */
const RETREAT_HEAL={chance:.25};
function failureDeathChanceFor(p,d,departedInjured,departedExhausted=(p.effects.fatigueBeforeExpedition||0)>=FATIGUE_MAX,strain=0){
 const required=d.power||1;
 const combatDeficit=clamp((required-preparedPower(p.effects))/required,0,1);
 const environmentDeficit=p.hazards.length
  ?p.hazards.reduce((v,h)=>v+clamp(h.gap/h.threat,0,1),0)/p.hazards.length:0;
 const healthy=clamp(combatDeficit*DEATH.combat+environmentDeficit*DEATH.environment,0,DEATH.cap);
 const extra=(departedInjured?DEATH.injured:0)+(departedExhausted?DEATH.exhausted:0)+(strain||0);
 return {combatDeficit,environmentDeficit,healthy,exhausted:!!departedExhausted,strain:strain||0,
  chance:extra?clamp(healthy+extra,0,DEATH.cap+extra):healthy};
}
/* DUNGEON_HAZARD §Pre-supply player-facing failure Death risk (User 2026-09-25, v2.9.1 balance):
   the SALE snapshot includes levelFactor (NPC state at SALE entry) and never preparedFactor,
   which depends on the Bag the snapshot excludes. */
function failureDeathRisk(n,d,facilities=[]){
 const p=prepare(n,d,facilities),departedInjured=n.injury===1;
 const base=failureDeathChanceFor(p,d,departedInjured,undefined,strainFor(n.records,departedInjured));
 return {...base,chance:base.chance*levelFactor(n.level)};
}
/* RESULT-PROOF COUNTERFACTUAL (DUNGEON_HAZARD §RESULT-PROOF). The real expedition resolves
   exactly once, above, under ordinary rules - this never runs before it and never changes what
   it produced. It only asks, after the fact and using ONLY the raw numbers that resolution
   actually drew (`ev`): with one fewer Item in the Bag, would the SAME recorded rolls have
   settled a worse Outcome? `prepare()` is pure, so recomputing it for a shadow pack costs
   nothing extra and draws nothing. A branch that needs a roll the real run never drew (because
   its own branch never reached that check) returns UNPROVEN rather than inventing one -
   under-reporting is preferred to false causality. */
const OUTCOME_ORDER=['대성공','성공','퇴각','부상','중상','사망'];
const UNPROVEN=Symbol('unproven');
function shadowOutcome(departure,d,facilities,pack,ev,severeEscalation){
 const s=shadowSettle(departure,d,facilities,pack,ev,severeEscalation);
 return s===UNPROVEN?UNPROVEN:s.tier;
}
/* The settled shadow: the Outcome tier AND the persistent Injury it leaves, so the state proof
   reads the same 구급키트 step the real resolution applies (중상 -> 부상 keeps injury 1; a 부상
   leaves none) instead of re-deriving it. */
function shadowSettle(departure,d,facilities,pack,ev,severeEscalation){
 const sp=prepare({...departure,pack},d,facilities),se=sp.effects;
 const sAbility=preparedPower(se);
 const sAssist=ev.assist||0;
 const sNoise=1+(ev.noiseRoll-.5)*(D.balance.combatNoise*2+se.variance*2);
 const sCombatSuccess=sAbility*(1+sAssist)*sNoise>=d.power;
 const sEnvironment=clamp(.06+sp.hazard*.012-se.survival*.001,.02,.48)*(1-sAssist),sAffected=ev.envRoll<sEnvironment;
 const sEscapeChance=clamp(.48+se.mobility*.005+se.escape-(d.scale||1)*.024,.15,.94);
 /* mirrors resolve()'s real order exactly: SUCCESS-vs-FAILURE first (never escape/injury
    evidence to decide THAT), then one Death roll immediately on entering failure, and only a
    Death miss goes on to settle which non-Death tier. Any evidence the actual expedition
    never drew because its own branch never reached it is UNPROVEN here too. */
 let sFailurePath;
 if(!sCombatSuccess){
  sFailurePath=true;
 }else if(sAffected){
  sFailurePath=true;
 }else{
  if(ev.injuryRiskRoll===undefined)return UNPROVEN;
  sFailurePath=ev.injuryRiskRoll<se.injuryRisk;
 }
 let sOutcome;
 if(!sFailurePath){
  sOutcome='성공';
 }else{
  if(ev.deathRoll===undefined)return UNPROVEN;
  const sDeathChance=failureDeathChanceFor(sp,d,severeEscalation>0,undefined,ev.strain||0).chance;
  /* DUNGEON_HAZARD §Preparation / Level Death reduction: the shadow Bag can lose 만반의 준비
     (2+ Items in the Bag) that the real Bag had, which is exactly the path that proves a second
     sold Item kept the death roll out of the removed band. */
  const sPrepared=fullyPrepared({injury:departure.injury,pack},se.fatigueBeforeExpedition)?PREPARED.factor:1;
  const sRolled=sDeathChance*sPrepared*levelFactor(departure.level);
  if(ev.deathRoll<sRolled){
   sOutcome='사망';
  }else if(ev.deathRoll<sDeathChance){
   if(ev.bandRoll===undefined)return UNPROVEN;
   sOutcome=ev.bandRoll<PREPARED.bandSevere?'중상':'부상';
  }else if(!sCombatSuccess){
   if(ev.escapeRoll===undefined)return UNPROVEN;
   sOutcome=ev.escapeRoll<sEscapeChance?'퇴각':'부상';
   if(sOutcome==='부상'){
    if(ev.injuryRoll===undefined)return UNPROVEN;
    if(ev.injuryRoll<clamp(.36+se.injuryRisk-se.injuryGuard*.25+severeEscalation,0,1))sOutcome='중상';
   }else{
    let takesTier=sAffected;
    if(!takesTier){
     if(ev.injuryRiskRoll===undefined)return UNPROVEN;
     takesTier=ev.injuryRiskRoll<se.injuryRisk;
    }
    if(takesTier){
     if(ev.injuryRoll===undefined)return UNPROVEN;
     sOutcome=ev.injuryRoll<clamp(.11-se.injuryGuard*.12+severeEscalation,0,1)?'중상':'부상';
    }
   }
  }else{
   if(ev.injuryRoll===undefined)return UNPROVEN;
   sOutcome=ev.injuryRoll<clamp(.11-se.injuryGuard*.12+severeEscalation,0,1)?'중상':'부상';
  }
 }
 if(['사망','중상'].includes(sOutcome)&&pack.some(id=>D.itemBy[id].effects.escape)){
  if(ev.escapeItemRoll===undefined)return UNPROVEN;
  if(ev.escapeItemRoll<clamp(se.escape,.0,.96))sOutcome='퇴각';
 }
 if(sOutcome==='사망'&&se.revive>=1)sOutcome='중상';
 if(sOutcome==='사망'&&ev.aidKitReady)sOutcome='중상';
 if(['부상','중상'].includes(sOutcome)&&se.injuryGuard>0){
  if(ev.injuryGuardRoll===undefined)return UNPROVEN;
  if(ev.injuryGuardRoll<clamp(se.injuryGuard,0,.9))sOutcome=sOutcome==='중상'?'부상':'퇴각';
 }
 const kit=kitSettle(sOutcome,(se.aftercare||0)>0,departure.injury);sOutcome=kit.tier;
 if(sOutcome==='성공'&&ev.greatRoll<greatSuccessChance(sAbility/d.power-1))sOutcome='대성공';
 return {tier:sOutcome,injury:kit.injury};
}
/* ITEM v2.9.0 §Insurance resolution order step 4 (User 2026-09-25): 구급키트 lowers the settled
   non-death Outcome one step - a would-be 중상 resolves as 부상 (injury 1, no rest days), a
   would-be 부상 resolves as 부상 with no lasting injury. Shared by the real resolution and the
   shadow so both settle the same tier and the same persistent Injury. */
function kitSettle(tier,hasKit,departureInjury){
 if(hasKit&&tier==='중상')return {tier:'부상',injury:1,from:2};
 if(hasKit&&tier==='부상')return {tier:'부상',injury:0,from:1};
 return {tier,injury:tier==='중상'?2:tier==='부상'?1:tier==='퇴각'?departureInjury:0};
}
/* One Item at a time (by Bag slot, not by id, so two copies of the same Item are still two
   separate removals), then the whole Bag if no single Item is individually provable. Ties on
   the SAME resulting worse tier are credited together; a worse tier beats a milder one rather
   than stacking several heroic claims. */
function outcomeProof(departure,pack,d,facilities,ev,severeEscalation,actualOutcome){
 const idx=OUTCOME_ORDER.indexOf(actualOutcome);
 if(!pack.length)return null;
 const per=pack.map((id,i)=>({id,tier:shadowOutcome(departure,d,facilities,pack.filter((_,j)=>j!==i),ev,severeEscalation)}));
 const proven=per.filter(x=>x.tier!==UNPROVEN&&OUTCOME_ORDER.indexOf(x.tier)>idx);
 if(proven.length){
  const worstIdx=Math.max(...proven.map(x=>OUTCOME_ORDER.indexOf(x.tier)));
  const items=[...new Set(proven.filter(x=>OUTCOME_ORDER.indexOf(x.tier)===worstIdx).map(x=>x.id))];
  return {items,worse:OUTCOME_ORDER[worstIdx]};
 }
 const bareTier=shadowOutcome(departure,d,facilities,[],ev,severeEscalation);
 if(bareTier!==UNPROVEN&&OUTCOME_ORDER.indexOf(bareTier)>idx)return {items:null,worse:bareTier};
 return null;
}
/* PERSISTENT-STATE PROOF (구급키트 Aftercare). Canonical: a sold Item may make a proven
   persistent-state difference even when the text Outcome is unchanged. Only relevant when
   Aftercare actually fired on the real resolution - the question per Item is then: with THIS
   item gone, does the shadow settle on the SAME Outcome tier (a different tier is already the
   outcome proof's claim, not this one) but WITHOUT the aftercare gate that only that item
   supplies, leaving a worse persistent Injury than the real, aftercare-relieved one? */
function stateProof(departure,pack,d,facilities,ev,severeEscalation,actualOutcome,actualAftercare){
 if(!actualAftercare||!pack.length)return null;
 const idx=OUTCOME_ORDER.indexOf(actualOutcome);
 const items=[...new Set(pack.map((id,i)=>{
  const shadowPack=pack.filter((_,j)=>j!==i);
  const s=shadowSettle(departure,d,facilities,shadowPack,ev,severeEscalation);
  if(s===UNPROVEN||OUTCOME_ORDER.indexOf(s.tier)!==idx)return null; // a differing tier is outcomeProof's claim, not this one
  return s.injury>actualAftercare.to?id:null;
 }).filter(Boolean))];
 if(items.length)return {items};
 /* Whole-Bag fallback: no single Item alone proves it, but removing the whole Bag might -
    same pattern as outcomeProof's bare-tier fallback. Never invented as one Item's credit. */
 const bare=shadowSettle(departure,d,facilities,[],ev,severeEscalation);
 if(bare===UNPROVEN||OUTCOME_ORDER.indexOf(bare.tier)!==idx)return null;
 if(bare.injury>actualAftercare.to)return {items:null};
 return null;
}
function resultProof(departure,pack,d,facilities,ev,severeEscalation,actualOutcome,actualAftercare){
 const outcome=outcomeProof(departure,pack,d,facilities,ev,severeEscalation,actualOutcome);
 const state=stateProof(departure,pack,d,facilities,ev,severeEscalation,actualOutcome,actualAftercare);
 return outcome||state?{outcome,state}:null;
}
/* `run`, when given, threads COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE recent-repeat tracking
   into the Night line below - see data/copy.js. Omitting it (every direct call in this repo's
   own tests) keeps the plain deterministic pick this function always returned. */
function resolve(n,d,r,facilities=[],run,assist=0){
 const beforeStats={...n.stats},beforeEquipment=n.equipment.power,beforeLevel=n.level;const p=prepare(n,d,facilities),e=p.effects;const bare=prepare({...n,pack:[]},d,facilities);
 /* RESULT-PROOF DEPARTURE SNAPSHOT. This is the ONLY state prepare() actually reads off `n`
    (stats/equipment/traits/fatigue/injury), captured before this resolution touches any of
    it. Every Result-Proof shadow below prepares against THIS, never against the live `n` -
    which by the time resultProof() runs has already been mutated by this same resolution
    (growth, injury/aftercare, fatigue, equipment). Only Bag composition may differ between
    the actual and shadow preparation states. `level` rides along too, for the same shadow
    §Preparation / Level Death reduction reading. */
 const departure={stats:beforeStats,equipment:{power:beforeEquipment,name:n.equipment.name},traits:n.traits,fatigue:n.fatigue,injury:n.injury,level:beforeLevel};
 const departurePack=[...n.pack];

 const ability=preparedPower(e);
 /* RESULT-PROOF: this expedition's real random draws are named as they are drawn, in the
    exact order/count the live path already used - nothing here adds, removes or reorders a
    draw. A conditionally-drawn value (the ones behind && / short-circuit ||) is captured
    through a small check() closure so it is STILL drawn only when the real branch reaches
    it, never eagerly. shadowTier() below reuses these same recorded numbers - never a new
    roll - to prove or fail to prove what a sold Item actually changed. */
 const noiseRoll=r.next();
 const noise=1+(noiseRoll-.5)*(D.balance.combatNoise*2+e.variance*2);
 /* DUNGEON_HAZARD §BAD-LUCK PREPARATION ASSIST (hidden, User 2026-09-25, v2.9.1 balance): a
    per-Night chain-of-bad-luck nudge shop.js's night() computes and passes in - never a global,
    never shown to the Player. It only leans the combat pass/fail check and the environment
    incident chance; the prepared `ability` itself stays the true reading everywhere else
    (Great Success margin included). */
 const score=ability*(1+assist)*noise;const combatSuccess=score>=d.power;
 const envRoll=r.next(),environment=clamp(.06+p.hazard*.012-e.survival*.001, .02,.48)*(1-assist);
 const affected=envRoll<environment;
 const incidentWeights=[{key:'accident',weight:Math.max(.02,.06-e.survival*.001)},...p.hazards.map(h=>({key:h.key,weight:h.gap*.012/Math.max(1,Math.sqrt(d.hazards.length))}))];let incidentCause=null;if(affected){let roll=envRoll/environment*incidentWeights.reduce((v,h)=>v+h.weight,0);for(const h of incidentWeights){roll-=h.weight;if(roll<=0&&h.weight>0){incidentCause=h.key;break;}}}
 if(!combatSuccess)p.why.push('전투에서 밀려 탈출 판정 진행');if(affected)p.why.push('원정 중 환경 사고가 있었다.');
 let escapeRoll,escapeChance,injuryRoll,deathRoll,bandRoll,rescued=false,deathChance=0,avoidedDeath=false;
 const aidKitReady=!!run&&(run.aidKitSaves||0)<D.decorationParams.firstAidKit.saves&&Object.values(run.loadout||{}).includes('firstAidKit');
 let injuryRiskRoll,escapeItemRoll,injuryGuardRoll;
 const escapeItemCheck=()=>{escapeItemRoll=r.next();return escapeItemRoll<clamp(e.escape,.0,.96);};
 const injuryGuardCheck=()=>{injuryGuardRoll=r.next();return injuryGuardRoll<clamp(e.injuryGuard,0,.9);};
 /* DUNGEON_HAZARD_v2.7 §INJURED RE-EXPEDITION SEVERE ESCALATION: applies wherever the
    Severe-vs-ordinary decision is made, on the departure state alone - still one decision
    point, still no second Severe roll, still applied before that branch's clamp. */
 const departedInjured=n.injury===1,severeEscalation=departedInjured?.15:0;
 const departedWeary=(e.fatigueBeforeExpedition||0)>=STRAIN.weary,strain=strainFor(n.records,departedInjured);
 /* DUNGEON_HAZARD_v2.7 §Resolution order, complete: the game decides SUCCESS-PATH vs
    FAILURE-PATH using only noise/envRoll (and, only when genuinely needed to make that one
    decision, injuryRiskRoll) - never escape/injury evidence, which settles WHICH failure this
    is and is never needed to decide THAT it is one. Death is drawn exactly once, immediately
    on entering the failure path, before any escape/injury evidence - a Death hit ends the
    expedition there, consuming nothing else; only a Death miss goes on to settle the ordinary
    non-Death tier. A 성공 draws zero Death rolls and no escape/injury evidence at all. */
 let outcome,failurePath;
 if(!combatSuccess){
  failurePath=true;
 }else if(affected){
  failurePath=true;
 }else{
  injuryRiskRoll=r.next();
  failurePath=injuryRiskRoll<e.injuryRisk;
 }
 if(!failurePath){
  outcome='성공';
 }else{
  deathChance=failureDeathChanceFor(p,d,departedInjured,undefined,strain).chance;
  deathRoll=r.next();
  /* DUNGEON_HAZARD §Preparation / Level Death reduction (User 2026-09-25, v2.9.1 balance): the
     Death roll is judged against failureDeathChance x preparedFactor x levelFactor, not the raw
     chance. A roll that only clears the raw chance - inside failureDeathChance but outside the
     reduced band - is not a second Death roll; it settles 중상/부상 the same as any other
     non-Death failure, via one extra draw (bandRoll). */
  const prepared=fullyPrepared(n,e.fatigueBeforeExpedition)?PREPARED.factor:1;
  const rolledDeathChance=deathChance*prepared*levelFactor(n.level);
  if(deathRoll<rolledDeathChance){
   outcome='사망';
  }else if(deathRoll<deathChance){
   bandRoll=r.next();
   outcome=bandRoll<PREPARED.bandSevere?'중상':'부상';
   if(prepared<1){
    p.why.push('만반의 준비 덕분에 사망 위험을 피함');
    p.events.push({id:'prepared',text:G.Copy.josa(n.name,'은','는')+' 만반의 준비 덕분에 목숨을 건졌다.'});
   }
  }else if(!combatSuccess){
   escapeRoll=r.next();escapeChance=clamp(.48+e.mobility*.005+e.escape-(d.scale||1)*.024,.15,.94);
   outcome=escapeRoll<escapeChance?'퇴각':'부상';
   if(outcome==='부상'){
    injuryRoll=r.next();
    if(injuryRoll<clamp(.36+e.injuryRisk-e.injuryGuard*.25+severeEscalation,0,1))outcome='중상';
   }else{
    /* the escaped-but-still-failed case: the SAME environment/injuryRisk evidence that would
       have decided a won fight's fate can still turn this surviving Retreat into an Injury -
       drawn only now, never to decide failurePath itself, which combatSuccess===false already
       settled above. */
    let takesTier=affected;
    if(!takesTier){
     injuryRiskRoll=r.next();
     takesTier=injuryRiskRoll<e.injuryRisk;
    }
    if(takesTier){
     injuryRoll=r.next();
     outcome=injuryRoll<clamp(.11-e.injuryGuard*.12+severeEscalation,0,1)?'중상':'부상';
    }
   }
  }else{
   injuryRoll=r.next();
   outcome=injuryRoll<clamp(.11-e.injuryGuard*.12+severeEscalation,0,1)?'중상':'부상';
  }
 }
 if(['사망','중상'].includes(outcome)&&n.pack.some(id=>D.itemBy[id].effects.escape)&&escapeItemCheck()){avoidedDeath=outcome==='사망';outcome='퇴각';rescued=true;p.why.push('귀환석이 강제 귀환을 발동');p.events.push({id:'escape',items:n.pack.filter(id=>D.itemBy[id].effects.escape),text:'귀환석이 사망·중상 위기에서 귀환을 도왔다.'});}
 /* 구급품 진열장: up to twice per Run, a Death that no carried Insurance prevented becomes 중상. */
 if(outcome==='사망'&&aidKitReady){avoidedDeath=true;outcome='중상';rescued=true;run.aidKitSaves=(run.aidKitSaves||0)+1;p.why.push('구급품 진열장이 사망을 중상으로 변경');p.events.push({id:'aidKit',items:[],text:'구급품 진열장이 사망을 중상으로 바꿨다.'});}
 if(outcome==='사망'&&e.revive>=1){avoidedDeath=true;outcome='중상';rescued=true;p.why.push('세계수 생환부적이 사망을 중상으로 변경');p.events.push({id:'revive',items:n.pack.filter(id=>D.itemBy[id].effects.revive),text:'세계수 생환부적이 사망을 중상으로 바꿨다.'});}
 /* 강골 alone reaches this branch now. ITEM_v2.7 §INSURANCE HIERARCHY moved 구급키트 off the
    injuryGuard channel entirely - it may not change the resolved Outcome and carries no hidden
    injury-risk percentage - so the line no longer credits 치료용품 for a downgrade it no longer
    performs. The Trait's own `injuryGuard +23%p` identity is unchanged. */
 if(['부상','중상'].includes(outcome)&&injuryGuardCheck()){outcome=outcome==='중상'?'부상':'퇴각';p.why.push('강골이 부상 단계를 완화');p.events.push({id:'injury-guard',text:'강골이 부상 단계를 낮췄다.'});}
 /* ITEM v2.9.0 §Insurance resolution order step 4 (User 2026-09-25): 구급키트 lowers the settled
    non-death Outcome one step. XP, Loot and Fatigue follow the lowered Outcome; the report keeps
    the would-be persistent state so NIGHT_CLOSING can name the proven contribution. */
 let aftercare=null;
 {const kit=kitSettle(outcome,(e.aftercare||0)>0,n.injury);
  if(kit.from){aftercare={from:kit.from,to:kit.injury,outcomeFrom:outcome};outcome=kit.tier;
   p.why.push(kit.from===2?'구급키트가 중상을 부상으로 완화':'구급키트가 남을 부상을 제거');
   p.events.push({id:'aftercare',items:n.pack.filter(id=>D.itemBy[id].effects.aftercare),text:kit.from===2?'구급키트가 중상을 부상으로 낮췄다.':'구급키트가 남을 부상을 없앴다.'});}}
 /* Only now, with the ordinary outcome settled, may a 성공 become 대성공. Assigning it right
    after combat let a later environmental injury overwrite it, and judging it on the post-noise
    score let a lucky hidden roll pass itself off as preparation - so it is judged on `ability`,
    which is the prepared Combat ability before noise. The roll is always drawn, so the draw
    count of an expedition does not depend on its outcome. */
 const greatMargin=ability/d.power-1,greatRoll=r.next();
 if(outcome==='성공'&&greatRoll<greatSuccessChance(greatMargin))outcome='대성공';
 /* ECONOMY_ORDER §NORMAL GREAT SUCCESS STORE GOLD. It follows the Gate/Tier value the
    expedition already carries, and a same-day sale is not required. A Deep Expedition always
    returns 0 Store Gold, so the bonus is suppressed there rather than added and subtracted.
    Scale is PASS3: while unapproved there is no bonus, exactly as an ordinary Success. */
 /* Stage 10, approved. A flat amount for the Day band rather than a share of the Gate's own
    value: the player can know what a Great Success is worth before deciding to chase one. A
    Deep Expedition still pays the Store nothing. */
 const storeBonus=outcome==='대성공'&&!d.deep
  ?(D.greatSuccess.storeGoldByBand.find(b=>d.day<=b.maxDay)?.gold||0):0;
 if(outcome==='사망')n.alive=false;
 /* NPC_TRAIT v2.7 §Natural recovery: an ordinary Injury is cleared only by actually coming
    back safe. 퇴각 is not a safe return, so it keeps the Injury; the old blanket decrement
    let a Retreat read as healing. 중상/사망 keep their own transitions. */
 n.injury=outcome==='중상'?2:outcome==='부상'?(aftercare?aftercare.to:1):outcome==='퇴각'?n.injury:Math.max(0,n.injury-1);
 /* DUNGEON_HAZARD §RETREAT HEALING (User 2026-09-25, v2.9.1 balance): departed injured, came
    back 퇴각 - one extra draw, independent of 구급키트, chance rising with the unbroken run of
    the same (departed injured, ended 퇴각) result. n.records here is still last night's - this
    resolution's own record is only pushed further down. */
 let retreatHealRoll;
 if(outcome==='퇴각'&&departedInjured){
  const k=trailingRun(n.records,x=>x.departedInjured&&x.outcome==='퇴각');
  retreatHealRoll=r.next();
  if(retreatHealRoll<Math.min(1,RETREAT_HEAL.chance*(1+k))){
   n.injury=0;
   p.why.push('물러나 쉬는 동안 부상 회복');
   p.events.push({id:'retreatHeal',text:G.Copy.josa(n.name,'은','는')+' 물러나 쉬는 동안 부상이 나았다.'});
  }
 }
 n.recovery=outcome==='중상'?Math.max(1,r.int(2,4)+n.traits.reduce((a,tid)=>a+(D.traitBy[tid].effects.recoveryDelta||0),0)):0;
 n.status=outcome==='사망'?'사망':n.injury===2?'중상':n.injury?'부상':'건강';
 /* DUNGEON_HAZARD §FATIGUE OUTCOME BASELINE + §EXCESS SUPPLY step G. The buffer is spent only
    now, once the actual Outcome exists, and 사망 stays at 0 no matter what a Trait would add.
    rawOutcomeFatigueGain and actualOutcomeFatigueGain are separate report truths: the buffer
    only shows as a contribution when it actually absorbed something. */
 const dead=outcome==='사망';
 /* DUNGEON_HAZARD §FATIGUE OUTCOME BASELINE: 성공/대성공 +4, 퇴각 +7, 부상 +9, 중상 0, 사망 0;
    clamp 40. 중상 joined 사망 at a final result-Fatigue gain of 0 in v2.9.1 balance (User
    2026-09-25) - a Severe Injury already costs rest days, and its rest day recovers no Fatigue -
    so 중상 is treated as 사망 for these two lines only; every other `dead` meaning below (alive,
    Injury, records) is untouched. */
 const severeOrDead=dead||outcome==='중상';
 const outcomeBaseline=severeOrDead?0:outcome==='퇴각'?7:outcome==='부상'?9:4;
 const rawOutcomeFatigueGain=severeOrDead?0:Math.max(0,outcomeBaseline+(e.fatigue||0));
 const remainingSupplyBuffer=e.remainingSupplyBuffer||0;
 const actualOutcomeFatigueGain=Math.max(0,rawOutcomeFatigueGain-remainingSupplyBuffer);
 const outcomeBufferUsed=rawOutcomeFatigueGain-actualOutcomeFatigueGain;
 const beforeFatigue=e.beforeFatigue!==undefined?e.beforeFatigue:(n.fatigue||0);
 const finalFatigue=clamp(e.fatigueBeforeExpedition+actualOutcomeFatigueGain,0,FATIGUE_MAX);
 const netFatigueDelta=finalFatigue-beforeFatigue;n.fatigue=finalFatigue;
 const won=combatSuccess&&n.alive;let xp=n.alive?Math.round((22+d.day*4.6)*(outcome==='대성공'?GREAT.xp:outcome==='퇴각'?.38:won?1:.5)*e.xpMult):0;
 const changes=G.Adventurer.grow(n,xp,r);/* DUNGEON_HAZARD §expeditionWalletReward (User 2026-09-25, v2.9.0): keyed on the Outcome, 중상 < 부상 < 퇴각 < 성공 */
 let loot=n.alive?Math.round((35+d.day*8)*WALLET_MULT[outcome]*(1+e.loot)*(d.reward||1)):0;
 if(won&&r.next()<.2+(e.rareLoot||0)){n.equipment.tier++;n.equipment.power+=r.int(2,5);n.equipment.name=['보강된','은빛','마력 깃든','고대의','영웅의'][Math.min(4,n.equipment.tier-1)]+' '+D.jobBy[n.job].name+' 장비';changes.push(n.equipment.name+' · 전투 +'+(n.equipment.power-beforeEquipment));}
 n.money+=loot;
 if(p.hazard<bare.hazard){const mitigated=d.hazards.filter(h=>n.pack.some(id=>(D.itemBy[id].effects[h]||0)>0));if(mitigated.length){const prevented=envRoll>=environment&&envRoll<clamp(.06+bare.hazard*.012-bare.effects.survival*.001,.02,.48);
  /* structure only: which Hazards were actually mitigated and which carried Items did it.
     The sentence is composed in the presentation layer so one wording serves Night,
     Closing and the returning-visitor line. */
  p.events.push({id:'hazard',hazards:mitigated,items:n.pack.filter(id=>mitigated.some(h=>(D.itemBy[id].effects[h]||0)>0)),prevented});}}
 /* The real outcome is fully settled above; this only asks, from here, whether a specific
    sold Item is what kept it from being worse - using the same rolls already drawn, never a
    new one. `pack` above was `n.pack` unmutated through the whole resolution. */
 const heroProof=resultProof(departure,departurePack,d,facilities,{noiseRoll,envRoll,escapeRoll,injuryRoll,deathRoll,bandRoll,injuryRiskRoll,escapeItemRoll,injuryGuardRoll,greatRoll,aidKitReady,strain,assist},severeEscalation,outcome,aftercare);
 const report={cause:incidentCause,npcId:n.id,name:n.name,day:d.day,dungeon:d.id,dungeonName:d.name,outcome,won,xp,loot,storeBonus,greatMargin,changes,items:[...n.pack],why:p.why,events:p.events,rescued,avoidedDeath,heroProof,statChanges:G.Adventurer.keys.filter(k=>n.stats[k]!==beforeStats[k]).map(k=>({key:k,before:beforeStats[k],after:n.stats[k]})),equipmentGain:n.equipment.power-beforeEquipment,level:n.level,injury:n.injury,recovery:n.recovery,aftercare,departedInjured,departedWeary,beforeFatigue,preparedSupply:e.preparedSupply,preRecovery:e.preRecovery,fatigueBeforeExpedition:e.fatigueBeforeExpedition,remainingSupplyBuffer:e.remainingSupplyBuffer,rawOutcomeFatigueGain,outcomeBufferUsed,actualOutcomeFatigueGain,effectiveFatigue:e.effectiveFatigue,finalFatigue,netFatigueDelta,combatWon:combatSuccess,environmentHurt:affected,poison:d.hazards.includes('poison')&&(e.poison||0)>10,/* deathRoll is undefined on a 성공 path (Fix 2: no Death roll is drawn there at all) - `null`
    here, not `undefined`, so a JSON save/reload round-trip does not drop the key and disagree
    with the live pre-reload object (JSON has no `undefined`). */
   /* escapeChance/escapeRoll/injuryRoll are now conditional too (only the combat-failure and
      environment/injuryRisk failure branches ever need them) - normalized to null the same
      way deathRoll already is, so a save/reload JSON round-trip cannot disagree with the live
      pre-reload object over a key JSON simply drops. */
   debug:{ability,score,power:d.power,noise,hazard:p.hazard,combatSuccess,environment,envRoll,affected,
    escapeChance:escapeChance===undefined?null:escapeChance,escapeRoll:escapeRoll===undefined?null:escapeRoll,
    injuryRoll:injuryRoll===undefined?null:injuryRoll,deathRoll:deathRoll===undefined?null:deathRoll,deathChance,effects:e}};
 /* The persisted record is the report without its development payload. The key is
   removed, not set to undefined: an own property that JSON drops would make a reloaded
   run structurally different from the run it was saved from (CORE_RUN SAVE/LOAD). */
 {const {debug:_dev,...record}=report;n.records.push(record);}
 /* A death line that implies a shopkeeping history is only used when that history exists;
   otherwise a history-independent variant. Chosen from state, never from a roll, so no
   RNG draw is consumed and every downstream result stays identical. */
 report.quote=G.Copy.night(report,n,run);
 n.pack=[];return report;
}
G.Dungeon={DEATH,WALLET_MULT,GREAT,STRAIN,strainEscalation,injuredStreak,PREPARED,fullyPrepared,levelFactor,RETREAT_HEAL,GATE,FATIGUE_MAX,fatigueBand,hazardRule,gateDayTerm,greatSuccessSignal,prepare,estimate,band,resolve,tierWeights,hazardState,preparedPower,failureDeathRisk,gateCountRule};
})(globalThis);
