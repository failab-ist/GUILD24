(function(G){
const D=G.DATA,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
/* DUNGEON_HAZARD_v2.7 §PREPARED POWER. Forecast, Resolve and the Great-Success margin have to
   read the same prepared ability before hidden combat noise, and three copies of the weights
   is how they drifted apart before - so there is one. 투력 remains the strongest single lever,
   and no Player-facing aggregate Power Stat is created from it. */
const preparedPower=e=>e.combat*.50+e.survival*.34+e.mobility*.27+e.spirit*.20;
function prepare(n,d,facilities=[]){
 const statKeys=['combat','survival','mobility','spirit'],why=[],events=[],mult={foodMult:1,potionMult:1};
 const behaviour=new Set(['priceBias','buyBias','rareBias','commonBias','revisitMult','recoveryDelta','foodSupplyDelta','supplyPerItem','injuredCombatPercent','combatPercent','survivalPercent','visitGold','loyaltyBonus','overchargeBias']);
 let baseE={combat:n.stats.combat+n.equipment.power,survival:n.stats.survival,mobility:n.stats.mobility,spirit:n.stats.spirit};
 let e={supply:0,escape:0,injuryGuard:0,injuryRisk:0,loot:0,xpMult:1,variance:0};
 const traitSum=k=>n.traits.reduce((a,tid)=>a+(D.traitBy[tid].effects[k]||0),0);
 const foodSupplyDelta=traitSum('foodSupplyDelta'),supplyPerItem=traitSum('supplyPerItem');
 for(const tid of n.traits){for(const[k,v]of Object.entries(D.traitBy[tid].effects)){if(k in mult)mult[k]*=v;else if(behaviour.has(k))continue;else if(k==='xpMult')e.xpMult*=v;else e[k]=(e[k]||0)+v;}}
 const itemStats=[];let duplicate=0,finalSupply=0;let itemE={combat:0,survival:0,mobility:0,spirit:0};
 for(const id of n.pack){
  const item=D.itemBy[id];if(item.effects.duplicate){duplicate=1;continue;}
  const copies=1+duplicate;duplicate=0;if(copies>1)why.push('황금 1+1: '+item.name+' 효과 '+copies+'회');
  let power=copies;const from={};
  for(const[k,v]of Object.entries(item.effects)){
   if(k==='potion')continue;let value=v*power;const isFood=item.category==='food',isFD=isFood||item.category==='drink';
   if(k==='supply'&&isFood)value=Math.max(1,value+foodSupplyDelta);if(k==='supply'&&isFD)value+=supplyPerItem;
   if(k==='survival'&&isFood)value*=mult.foodMult;
   if(['supply','survival'].includes(k)&&isFD)value*=(facilities.includes('kitchen')?1.2:1)*(facilities.includes('fresh24')?1.25:1);
   if(item.effects.potion&&k==='survival')value*=mult.potionMult;
   if(facilities.includes('expeditionMeal')&&isFD&&v>0&&(d.hazards.includes(k)||k==='supply'&&d.requiredSupply>0))value*=1.25;
   if(k==='supply')finalSupply+=value;else if(statKeys.includes(k)){itemE[k]+=value;from[k]=(from[k]||0)+value;}else e[k]=(e[k]||0)+value;
  }
  if(Object.keys(from).length)itemStats.push({item:item.id,rarity:item.rarity,stats:from});
  const matches=d.hazards.filter(h=>(item.effects[h]||0)>0);if(matches.length)why.push(item.name+': '+matches.map(h=>D.hazards[h]).join('·')+' 대응');
  if(item.effects.survival>=10)why.push(item.name+': 생존 능력 보강');
 }
 /* DUNGEON_HAZARD v2.7 §EXCESS SUPPLY: required Supply is paid first, what is left over
    removes current Fatigue 1:1, and only what survives THAT becomes the buffer the outcome
    gain is charged against once the Outcome actually exists. The old single fatigueRecovery
    spent the same Supply twice over - it cut departure Fatigue and left nothing named for
    the result - so the two halves are separate fields now. */
 const required=d.requiredSupply||0,preparedSupply=finalSupply;
 const excessSupply=Math.max(0,preparedSupply-required);
 const currentFatigue=n.fatigue||0;
 const preRecovery=Math.min(currentFatigue,excessSupply);
 const fatigueBeforeExpedition=currentFatigue-preRecovery;
 const remainingSupplyBuffer=excessSupply-preRecovery;
 const effectiveFatigue=fatigueBeforeExpedition;e.supply=finalSupply;
 let combatMod=1+traitSum('combatPercent'),survivalMod=1+traitSum('survivalPercent'),mobilityMod=1,spiritMod=1;
 if(n.injury===1){
  /* NPC_TRAIT §INJURY: this branch is injury===1 only. 중상 carries no Stat penalty - it
     keeps the adventurer home instead - so the line may not claim one on its behalf. */
  const grit=traitSum('injuredCombatPercent');if(grit){combatMod+=grit;why.push('악바리: 부상 중 투력 +'+Math.round(grit*100)+'%');}else{combatMod-=0.15;why.push('부상 페널티: 투력 -15%');}
  survivalMod-=0.20;why.push('부상 페널티: 강인함 -20%');
 }
 if(effectiveFatigue>=10&&effectiveFatigue<20){mobilityMod-=0.15;spiritMod-=0.15;why.push('피로 누적(10~19): 기동/정신 -15%');}
 else if(effectiveFatigue>=20){mobilityMod-=0.40;spiritMod-=0.40;why.push('극심한 피로(20): 기동/정신 -40%');}
 e.combat=baseE.combat*combatMod+itemE.combat;e.survival=baseE.survival*survivalMod+itemE.survival;e.mobility=baseE.mobility*mobilityMod+itemE.mobility;e.spirit=baseE.spirit*spiritMod+itemE.spirit;
 if(n.traits.includes('eater')&&n.pack.some(id=>D.itemBy[id].category==='food'))why.push('대식가: 음식 고유 효과 +30% · 음식 1개당 보급 -1');
 const actual=finalSupply,deficit=required>0?Math.max(0,required-actual):0,penalty=deficit>0?Math.min(.3,deficit*.06):0;
 if(penalty)for(const k of G.Adventurer.keys)e[k]*=1-penalty;
   const sources = {combat:[], survival:[], mobility:[], spirit:[]};
   if(n.equipment && n.equipment.power) sources.combat.push({name:'장비 ('+n.equipment.name+')', v:n.equipment.power});
   for(const tid of n.traits){
     const eff = D.traitBy[tid].effects;
     for(const k of statKeys){
       if(eff[k]) sources[k].push({name: D.traitBy[tid].name, v: eff[k]});
     }
     if(eff.combatPercent) sources.combat.push({name: D.traitBy[tid].name, v: eff.combatPercent*100, isPct: true});
     if(eff.survivalPercent) sources.survival.push({name: D.traitBy[tid].name, v: eff.survivalPercent*100, isPct: true});
     if(n.injury===1 && eff.injuredCombatPercent) sources.combat.push({name: D.traitBy[tid].name, v: eff.injuredCombatPercent*100, isPct: true});
   }
   if(n.injury===1){
     const grit = traitSum('injuredCombatPercent');
     if(!grit) sources.combat.push({name: '부상', v: -15, isPct: true});
     sources.survival.push({name: '부상', v: -20, isPct: true});
   }
   for(const st of itemStats){
     for(const k of statKeys){
       if(st.stats[k]) sources[k].push({name: D.itemBy[st.item].name, v: st.stats[k]});
     }
   }
   if(effectiveFatigue>=10 && effectiveFatigue<20){
     sources.mobility.push({name: '피로 누적', v: -15, isPct: true});
     sources.spirit.push({name: '피로 누적', v: -15, isPct: true});
   }else if(effectiveFatigue>=20){
     sources.mobility.push({name: '극심한 피로', v: -40, isPct: true});
     sources.spirit.push({name: '극심한 피로', v: -40, isPct: true});
   }
   if(penalty){
     for(const k of statKeys) sources[k].push({name: '보급 부족', v: -Math.round(penalty*100), isPct: true});
   }
   

 const hazards=d.hazards.map(h=>hazardState(h,e,d));let hazard=hazards.reduce((v,h)=>v+h.gap,0)/Math.max(1,Math.sqrt(hazards.length));
 if(n.traits.includes('eater')&&n.pack.some(id=>D.itemBy[id].category==='food'))events.push({id:'eater-food',text:'대식가가 음식의 고유 효과를 30% 더 얻었다.'});
 if(n.traits.includes('potionbody')&&n.pack.some(id=>D.itemBy[id].effects.potion))events.push({id:'potionbody',text:'포션체질로 포션 효과가 30% 증가했다.'});
 e.effectiveFatigue=effectiveFatigue;
 e.beforeFatigue=currentFatigue;e.preparedSupply=preparedSupply;e.excessSupply=excessSupply;
 e.preRecovery=preRecovery;e.fatigueBeforeExpedition=fatigueBeforeExpedition;e.remainingSupplyBuffer=remainingSupplyBuffer;
 return {effects:e,sources,hazard,hazards,itemStats,supply:{required,actual,deficit,penalty,prepared:preparedSupply,excess:excessSupply,preRecovery,remainingBuffer:remainingSupplyBuffer},why,events};
}
function tierWeights(day){
 const anchors=[[1,[1,0,0]],[5,[1,0,0]],[7,[.85,.15,0]],[8,[.70,.30,0]],[12,[.65,.35,0]],[13,[.55,.42,.03]],[18,[.30,.60,.10]],[19,[.26,.60,.14]],[24,[.10,.60,.30]],[25,[.05,.50,.45]],[29,[0,.45,.55]]];
 if(day>=30)return [0,0,0];for(let i=1;i<anchors.length;i++){const [end,b]=anchors[i],[start,a]=anchors[i-1];if(day<=end){const t=clamp((day-start)/(end-start),0,1);return a.map((v,j)=>v+(b[j]-v)*t);}}return anchors.at(-1)[1].slice();
}
function hazardState(h,e,d){
 const rules={poison:['survival',.3],fire:['survival',.32],cold:['survival',.3],corrosion:['survival',.3],bind:['mobility',.4],mire:['mobility',.4],fear:['spirit',.4],dark:['spirit',.3,'mobility',.12],whiteout:['spirit',.3,'mobility',.12]};
 /* DUNGEON_HAZARD_v2.7 §HAZARD THREAT: the curve reads the Day and the Tier directly, so a
    Hazard means the same thing wherever it appears on that Day at that Tier. */
 const rule=rules[h]||['survival',.2],threat=12+(d.day||1)*.35+((d.tier||1)-1)*6,defense=(e[h]||0)+e[rule[0]]*rule[1]+(rule[2]?e[rule[2]]*rule[3]:0),gap=Math.max(0,threat-defense),ratio=defense/threat;
 return {key:h,stat:rule[0],threat,defense,gap,label:ratio>=1?'충분':ratio>=.75?'대응':ratio>=.4?'불안':'취약'};
}
function estimate(n,d,facilities){const e=prepare(n,d,facilities).effects,ratio=preparedPower(e)/d.power;return ratio>1.2?'우세':ratio>=.8?'접전':'불리';}
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
function resolve(n,d,r,facilities=[],options={}){
 const beforeStats={...n.stats},beforeEquipment=n.equipment.power,beforeLevel=n.level;const p=prepare(n,d,facilities),e=p.effects;const bare=prepare({...n,pack:[]},d,facilities);

 const ability=preparedPower(e);
 const noise=1+(r.next()-.5)*(D.balance.combatNoise*2+e.variance*2);
 const score=ability*noise;const combatSuccess=score>=d.power;
 const envRoll=r.next(),environment=clamp(.06+p.hazard*.012-e.survival*.001, .02,.48);
 const affected=envRoll<environment;
 const incidentWeights=[{key:'accident',weight:Math.max(.02,.06-e.survival*.001)},...p.hazards.map(h=>({key:h.key,weight:h.gap*.012/Math.max(1,Math.sqrt(d.hazards.length))})),{key:'supply',weight:p.supply.deficit*.02/Math.max(1,Math.sqrt(d.hazards.length))}];let incidentCause=null;if(affected){let roll=envRoll/environment*incidentWeights.reduce((v,h)=>v+h.weight,0);for(const h of incidentWeights){roll-=h.weight;if(roll<=0&&h.weight>0){incidentCause=h.key;break;}}}
 const escapeRoll=r.next(),escapeChance=clamp(.48+e.mobility*.005+e.escape-(d.scale||1)*.024,.15,.94);
 let outcome=combatSuccess?'성공':(escapeRoll<escapeChance?'퇴각':'부상');
 if(!combatSuccess)p.why.push('전투에서 밀려 탈출 판정 진행');if(affected)p.why.push('원정 중 환경 사고가 있었다.');
 const injuryRoll=r.next(),deathRoll=r.next();let rescued=false,deathChance=0,avoidedDeath=false;
 if(!combatSuccess&&outcome==='부상'){
  const deficit=clamp(1-score/d.power,0,1);deathChance=clamp(.04+deficit*.16-e.survival*.0007,.012,.22);
  if(deathRoll<deathChance)outcome='사망';else if(injuryRoll<.42+e.injuryRisk-e.injuryGuard*.25)outcome='중상';
 }else if(affected||r.next()<e.injuryRisk){outcome=injuryRoll<.13-e.injuryGuard*.12?'중상':'부상';}
 if(['사망','중상'].includes(outcome)&&n.pack.some(id=>D.itemBy[id].effects.escape)&&r.next()<clamp(e.escape,.0,.96)){avoidedDeath=outcome==='사망';outcome='퇴각';rescued=true;p.why.push('귀환석이 강제 귀환을 발동');p.events.push({id:'escape',items:n.pack.filter(id=>D.itemBy[id].effects.escape),text:'귀환석이 사망·중상 위기에서 귀환을 도왔다.'});}
 if(outcome==='사망'&&e.revive>=1){avoidedDeath=true;outcome='중상';rescued=true;p.why.push('세계수 생환부적이 사망을 중상으로 변경');p.events.push({id:'revive',items:n.pack.filter(id=>D.itemBy[id].effects.revive),text:'세계수 생환부적이 사망을 중상으로 바꿨다.'});}
 /* 강골 alone reaches this branch now. ITEM_v2.7 §INSURANCE HIERARCHY moved 구급키트 off the
    injuryGuard channel entirely - it may not change the resolved Outcome and carries no hidden
    injury-risk percentage - so the line no longer credits 치료용품 for a downgrade it no longer
    performs. The Trait's own `injuryGuard +23%p` identity is unchanged. */
 if(['부상','중상'].includes(outcome)&&r.next()<clamp(e.injuryGuard,0,.9)){outcome=outcome==='중상'?'부상':'퇴각';p.why.push('강골이 부상 단계를 완화');p.events.push({id:'injury-guard',text:'강골이 부상 단계를 낮췄다.'});}
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
 n.injury=outcome==='중상'?2:outcome==='부상'?1:outcome==='퇴각'?n.injury:Math.max(0,n.injury-1);
 n.recovery=outcome==='중상'?Math.max(1,r.int(2,4)+n.traits.reduce((a,tid)=>a+(D.traitBy[tid].effects.recoveryDelta||0),0)):0;
 /* ITEM_v2.7 §Insurance resolution order step 4: Aftercare is last, it runs on the settled
    non-death state, and it changes ONLY persistent Injury - Outcome, XP, Loot and Fatigue keep
    whatever the expedition actually produced. The whole chain is not re-run. The report carries
    the would-be state so NIGHT_CLOSING can name a proven contribution instead of a carried Item. */
 let aftercare=null;
 if((e.aftercare||0)>0&&outcome!=='사망'&&n.injury>0){
  const wouldBe={injury:n.injury,recovery:n.recovery};
  n.injury=n.injury===2?1:0;n.recovery=0;
  aftercare={from:wouldBe.injury,to:n.injury,recoveryFrom:wouldBe.recovery};
  p.events.push({id:'aftercare',items:n.pack.filter(id=>D.itemBy[id].effects.aftercare),
   text:n.injury?'구급키트가 중상 후 상태를 부상까지 낮췄다.':'구급키트가 남을 부상을 없앴다.'});
 }
 n.status=outcome==='사망'?'사망':n.injury===2?'중상':n.injury?'부상':'건강';
 /* DUNGEON_HAZARD v2.7 §FATIGUE OUTCOME BASELINE + §EXCESS SUPPLY step G. The buffer is
    spent only now, once the actual Outcome exists, and 중상/사망 stay at 0 no matter what a
    Trait would add. rawOutcomeFatigueGain and actualOutcomeFatigueGain are separate report
    truths: the buffer only shows as a contribution when it actually absorbed something. */
 const severeOrDead=outcome==='중상'||outcome==='사망';
 const outcomeBaseline=severeOrDead?0:outcome==='퇴각'?5:outcome==='부상'?6:3;
 const rawOutcomeFatigueGain=severeOrDead?0:Math.max(0,outcomeBaseline+(e.fatigue||0));
 const remainingSupplyBuffer=e.remainingSupplyBuffer||0;
 const actualOutcomeFatigueGain=Math.max(0,rawOutcomeFatigueGain-remainingSupplyBuffer);
 const outcomeBufferUsed=rawOutcomeFatigueGain-actualOutcomeFatigueGain;
 const beforeFatigue=e.beforeFatigue!==undefined?e.beforeFatigue:(n.fatigue||0);
 const finalFatigue=clamp(e.fatigueBeforeExpedition+actualOutcomeFatigueGain,0,20);
 const netFatigueDelta=finalFatigue-beforeFatigue;n.fatigue=finalFatigue;
 const won=combatSuccess&&n.alive;let xp=n.alive?Math.round((22+d.day*4.6)*(outcome==='대성공'?1.4:outcome==='퇴각'?.38:won?1:.5)*e.xpMult):0;
 const changes=G.Adventurer.grow(n,xp,r);let loot=n.alive?Math.round((35+d.day*8)*(outcome==='퇴각'?.08:won?1:.18)*(1+e.loot)*(d.reward||1)):0;
 if(won&&r.next()<.2+(e.rareLoot||0)){n.equipment.tier++;n.equipment.power+=r.int(2,5);n.equipment.name=['보강된','은빛','마력 깃든','고대의','영웅의'][Math.min(4,n.equipment.tier-1)]+' '+D.jobBy[n.job].name+' 장비';changes.push(n.equipment.name+' · 전투 +'+(n.equipment.power-beforeEquipment));}
 n.money+=loot;
 if(p.hazard<bare.hazard){const mitigated=d.hazards.filter(h=>n.pack.some(id=>(D.itemBy[id].effects[h]||0)>0));if(mitigated.length){const prevented=envRoll>=environment&&envRoll<clamp(.06+bare.hazard*.012-bare.effects.survival*.001,.02,.48);
  /* structure only: which Hazards were actually mitigated and which carried Items did it.
     The sentence is composed in the presentation layer so one wording serves Night,
     Closing and the returning-visitor line. */
  p.events.push({id:'hazard',hazards:mitigated,items:n.pack.filter(id=>mitigated.some(h=>(D.itemBy[id].effects[h]||0)>0)),prevented});}}
 const report={cause:incidentCause,npcId:n.id,name:n.name,day:d.day,dungeon:d.id,dungeonName:d.name,outcome,won,xp,loot,storeBonus,greatMargin,changes,items:[...n.pack],why:p.why,events:p.events,rescued,avoidedDeath,statChanges:G.Adventurer.keys.filter(k=>n.stats[k]!==beforeStats[k]).map(k=>({key:k,before:beforeStats[k],after:n.stats[k]})),equipmentGain:n.equipment.power-beforeEquipment,level:n.level,injury:n.injury,recovery:n.recovery,aftercare,beforeFatigue,requiredSupply:p.supply.required,preparedSupply:e.preparedSupply,excessSupply:e.excessSupply,preRecovery:e.preRecovery,fatigueBeforeExpedition:e.fatigueBeforeExpedition,remainingSupplyBuffer:e.remainingSupplyBuffer,rawOutcomeFatigueGain,outcomeBufferUsed,actualOutcomeFatigueGain,effectiveFatigue:e.effectiveFatigue,finalFatigue,netFatigueDelta,combatWon:combatSuccess,environmentHurt:affected,poison:d.hazards.includes('poison')&&((e.poison||0)>10||(e.curePoison||0)>0),debug:{ability,score,power:d.power,noise,hazard:p.hazard,combatSuccess,environment,envRoll,affected,escapeChance,escapeRoll,injuryRoll,deathRoll,deathChance,effects:e}};
 /* The persisted record is the report without its development payload. The key is
   removed, not set to undefined: an own property that JSON drops would make a reloaded
   run structurally different from the run it was saved from (CORE_RUN SAVE/LOAD). */
 {const {debug:_dev,...record}=report;n.records.push(record);}
 /* A death line that implies a shopkeeping history is only used when that history exists;
   otherwise a history-independent variant. Chosen from state, never from a roll, so no
   RNG draw is consumed and every downstream result stays identical. */
 report.quote=G.Copy.night(report,n);
 n.pack=[];return report;
}
G.Dungeon={greatSuccessSignal,prepare,estimate,resolve,tierWeights,hazardState,preparedPower};
})(globalThis);
