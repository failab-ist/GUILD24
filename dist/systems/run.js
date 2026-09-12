(function(G){
const D=G.DATA,P=G.Game.prototype;
P.beginOrder=function(){if(this.run.phase!=='morning')return;this.run.phase='order';this.save();};
P.finishOrder=function(){if(this.run.phase!=='order')return;this.confirmOrder();this.open();};
P.finishNight=function(){if(this.run.phase!=='night')return;this.run.phase='closing';this.save();};
P.specialAction=function(npcId,value){const s=this.run,e=s.special,n=s.npcs.find(n=>n.id===npcId);if(!e||e.used||!n?.alive||!n.introduced)throw Error('선택 가능한 모험가가 아닙니다.');if(e.kind==='route'){if(s.phase!=='sell'||this.current()?.id!==npcId||n.pack.length||n.history.some(h=>h.day===s.day))throw Error('아직 거래하지 않은 현재 손님만 배치 조정할 수 있습니다.');
  /* SALE §DEEP EXPEDITION NOMINATION: a Deep nomination and any other explicit destination
     reassignment are mutually exclusive for the same NPC on the same Day. A confirmed Deep
     destination is final, so the reassignment is refused rather than silently ignored. */
  if(s.deep?.today?.nomineeId===npcId)throw Error('심층원정에 나서기로 한 손님의 배치는 바꿀 수 없습니다.');
  const index=Number(value);if(!Number.isInteger(index)||!s.dungeons[index]||index===n.destination)throw Error('다른 게이트를 선택해 주세요.');n.destination=index;n.claimedDestination=index;e.npcId=npcId;}else{if(!['morning','order'].includes(s.phase))throw Error('영업 준비 중에 선택할 수 있습니다.');if(e.kind==='remove'){if(!n.traits.includes(value)||D.traitBy[value]?.direction!=='negative')throw Error('제거할 약점을 선택해 주세요.');n.traits=n.traits.filter(t=>t!==value);}else{if(!e.candidates.includes(value)||n.traits.includes(value)||n.traits.length>=Math.min(4,n.traitSlots)||D.traitExclusions.some(pair=>pair.includes(value)&&pair.some(t=>n.traits.includes(t))))throw Error('이 특성을 배울 수 없습니다.');n.traits.push(value);}}e.used=true;s.specialUsed=true;s.notice='길드 지원을 받았습니다.';this.save();};
P.closeDay=function(){const s=this.run;if(s.phase!=='closing')return;if(s.money<0){if(s.inventory.length){s.notice='운영비가 부족합니다. 재고를 정리해 회생하거나 폐점을 선택하세요.';this.save();return false;}this.end(false,'운영비를 지급하지 못해 폐점했습니다.');return;}
 this.nextDay();this.save();return true;};
P.tierForecast=function(){const day=this.run.day+1;if(day>=30)return null;const weights=G.Dungeon.tierWeights(day);return {day,weights,percent:weights.map(x=>Math.round(x*1000)/10)};};
P.nextDay=function(){this.run.day++;this.morning();};
P.rerollPrice=function(){const n=this.run.rerollCount||0;return this.has('delivery')&&n===0?0:D.balance.rerollBase*2**Math.min(20,n);};
P.reroll=function(){const s=this.run;if(!['order','final'].includes(s.phase))throw Error('발주 시간에 교환할 수 있습니다.');if(Object.values(s.cart||{}).some(Boolean))throw Error('선택한 수량을 먼저 발주하거나 0으로 바꿔 주세요.');const price=this.rerollPrice();if(s.money<price)throw Error('교환 비용이 부족합니다.');this.generateOffers({advancePity:false});s.cart={};s.money-=price;s.daily.rerollSpent=(s.daily.rerollSpent||0)+price;s.stats.spent+=price;s.rerollCount=(s.rerollCount||0)+1;this.save();};
P.liquidate=function(stockId){const s=this.run;if(!['morning','order','night','closing','final'].includes(s.phase))return;let i=s.inventory.findIndex(x=>x.id===stockId);if(i<0)return;const st=s.inventory[i],price=Math.round(D.itemBy[st.item].buy*.5);s.inventory.splice(i,1);s.money+=price;s.daily.liquidation=(s.daily.liquidation||0)+price;s.notice=D.itemBy[st.item].name+' 재고 정리 · '+price+'G 회수';this.save();};
P.end=function(win,reason){const s=this.run;if(s.phase==='end')return;s.win=win;s.endReason=reason;s.phase='end';s.unlocked=G.Meta.finish(this.account,s,win);this.save();};
P.finalRequired=function(){return Math.min(3,this.finalEligible().length);};
P.selectFinal=function(id){const s=this.run;if(s.phase!=='final')return;const n=s.npcs.find(n=>n.id===id);if(!n?.alive||!n.introduced||n.recovery>0)throw Error('현재 원정에 참가할 수 없습니다.');if(s.team.includes(id)){s.team=s.team.filter(x=>x!==id);return this.save();}const cap=this.finalRequired();if(s.team.length>=cap)throw Error('최대 '+cap+'명까지 선택할 수 있습니다.');s.team.push(id);this.save();};
P.supplyFinal=function(npcId,stockId){const s=this.run;if(s.phase!=='final'||!s.team.includes(npcId))return;const n=s.npcs.find(n=>n.id===npcId);if(n.pack.length>=G.Adventurer.slots(n))throw Error('보급 슬롯이 가득 찼습니다.');const i=s.inventory.findIndex(x=>x.id===stockId);if(i<0)throw Error('재고가 없습니다.');n.pack.push(s.inventory[i].item);n.history.push({day:30,item:s.inventory[i].item,mode:'supply',paid:0});s.inventory.splice(i,1);this.save();};
/* FINAL_EXPEDITION: one participant's contribution. Internal only - Final Power is never
   surfaced as another Player Stat. */
const individualPower=(e,hazard)=>e.combat*.58+e.survival*.32+e.mobility*.24+e.spirit*.16-hazard*.35;

const STATS=['combat','survival','mobility','spirit'];

/* Step 4 of the shared Final order: the participant-side Boss modifier. Each Boss rewrites
   this Final-only snapshot and nothing else - the NPC's stored Stats are never touched, so
   a Run that fails leaves its adventurers exactly as they were. Steps 1-3 have already
   settled, which is why GLUTTONY subtracts from the snapshot here instead of shrinking the
   supply earlier: attenuating an Item before step 3 would quietly weaken its Hazard
   preparation too, and Counter, Supply, Insurance and Utility are explicitly out of scope.
   Every factor below is PASS3 and unset, so today every Boss returns the snapshot intact. */
P.finalSnapshot=function(n,prep,d,context){
 const t=D.bossTuning,boss=this.run.bossId,e={...prep.effects};
 if(boss==='PRIDE'&&t.prideCombatFactor!=null)e.combat*=t.prideCombatFactor;
 if(boss==='ENVY'&&t.envyStatFactor!=null&&context&&context.envyTargetNpcId===n.id)
  for(const k of STATS)e[k]*=t.envyStatFactor;
 if(boss==='LUST'&&t.lustStatFactor!=null&&!G.Adventurer.isTrustedRegular(n))
  for(const k of STATS)e[k]*=t.lustStatFactor;
 if(boss==='GLUTTONY'&&t.gluttonyStatFactor!=null&&t.gluttonyRarityThreshold!=null)
  for(const c of prep.itemStats||[]){
   if(c.rarity<t.gluttonyRarityThreshold)continue;
   for(const k of STATS)if(c.stats[k])e[k]-=c.stats[k]*(1-t.gluttonyStatFactor);
  }
 return e;
};

/* ENVY targets the single largest pre-ENVY contributor. The order puts the modifier at
   step 4 and the individual power at step 5, so the target has to be chosen from a pass of
   step 5 run before step 4 - and once chosen it does not move, even though its own penalty
   makes it no longer the largest. Ties fall to the stable NPC id. */
P.envyTarget=function(team,preparations){
 let best=null,bestPower=-Infinity;
 team.forEach((n,i)=>{const p=individualPower(preparations[i].effects,preparations[i].hazard);
  if(p>bestPower||(p===bestPower&&best&&n.id<best))
   {bestPower=p;best=n.id;}});
 return best;
};

/* Step 7: the Boss-side modifier. GREED strengthens the Boss by whatever the Run failed to
   earn, capped; SLOTH weakens it by however many seals were broken; WRATH is the baseline
   that adds nothing. The sales figure is the one the shop already keeps - GREED reads it,
   it does not count again. Every value is PASS3 and unset, so today this is the baseline
   for all seven. */
P.effectiveBossPower=function(partyPower,lock){
 const t=D.bossTuning,s=this.run,base=D.balance.bossPower;
 if(s.bossId==='GREED'&&t.greedRevenueTarget!=null&&t.greedShortfallSlope!=null&&t.greedShortfallCap!=null){
  const shortfall=Math.max(0,t.greedRevenueTarget-(lock?lock.revenue:s.stats.revenue));
  return base+Math.min(shortfall*t.greedShortfallSlope,t.greedShortfallCap);
 }
 if(s.bossId==='SLOTH'&&Array.isArray(t.slothBossPower)){
  const v=t.slothBossPower[lock?lock.sealBreakCount:s.sealBreakCount];
  if(v!=null)return v;
 }
 return base;
};

P.boss=function(){const s=this.run;if(s.phase!=='final')return;
 const required=this.finalRequired();
 if(!required)return this.end(false,'출전할 수 있는 모험가가 없어 마왕성 원정을 시작하지 못했습니다.');
 if(s.team.length!==required)throw Error(required+'명으로 원정대를 구성해 주세요.');
 const d=s.dungeons[0],team=s.team.map(id=>s.npcs.find(n=>n.id===id));
 /* The shared Final order (BOSS / FINAL_EXPEDITION). Steps 1-3 are the ordinary prepare:
    locked NPC state, locked Item/Supply/equipment, then the Family Hazard result. Final
    reuses it; there is no Final-only combat or survival judgement. A Boss Trait attaches
    at exactly two places, step 4 and step 7, and the rest of the order does not move. */
 const preparations=team.map(n=>G.Dungeon.prepare(n,d,s.facilities));              // 1-3
 const context=s.bossId==='ENVY'?{envyTargetNpcId:this.envyTarget(team,preparations)}:null; // 4 target pass
 const snapshots=preparations.map((p,i)=>this.finalSnapshot(team[i],p,d,context));  // 4
 const power=snapshots.reduce((sum,e,i)=>sum+individualPower(e,preparations[i].hazard),0); // 5-6
 const bossPower=this.effectiveBossPower(power,{revenue:s.stats.revenue,sealBreakCount:s.sealBreakCount}); // 7
 const roll=.88+this.rng.next()*.24,assault=power*roll,cleared=assault>=bossPower; // 8-9
 /* Final Lock: what the Final was actually decided from, frozen. Reload may not re-roll
    it, re-target it, or re-read a later state (BOSS-Q02). Boss-specific entries join this
    as their Traits land; the committed sales figure is the one Economy already keeps. */
 s.finalLock={bossId:s.bossId,families:[...d.families],revenue:s.stats.revenue,
  members:team.map((n,i)=>({npcId:n.id,hazard:preparations[i].hazard,regular:G.Adventurer.isTrustedRegular(n),
   stats:{combat:snapshots[i].combat,survival:snapshots[i].survival,
          mobility:snapshots[i].mobility,spirit:snapshots[i].spirit}}))};
 if(s.sealBreakCount!==undefined)s.finalLock.sealBreakCount=s.sealBreakCount;
 if(context)s.finalLock.envyTargetNpcId=context.envyTargetNpcId;
 s.bossDebug={power,roll,assault,bossPower};s.results=[];
 s.finalReport={cleared,families:d.familyNames,members:team.map((n,i)=>({npcId:n.id,name:n.name,level:n.level,job:n.job,items:[...n.pack],hazard:Math.round(preparations[i].hazard*10)/10,why:preparations[i].why.slice(0,3)}))};
 for(const n of team)n.pack=[];
 this.end(cleared,cleared?'마왕 토벌 성공. 마지막 보급이 왕도를 지켰습니다.':'마왕성 원정 실패. 남은 이야기는 다음 점주에게 이어집니다.');};
})(globalThis);
