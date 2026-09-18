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
/* A store can also end because too many of the people it sent stopped coming back. The count
   is the one night() has always kept - s.stats.deaths rises only where the report leaves the
   adventurer dead, so injuries and recovery were never in it. Checked here rather than in
   night(): by now the whole evening has been read, including the death that reached the line.
   Before the money branch, because that branch offers liquidation to keep trading and there is
   nothing left to keep trading for. */
P.closeDay=function(){const s=this.run;if(s.phase!=='closing')return;
 if(s.stats.deaths>=G.DATA.balance.deathLimit)
  return this.end(false,'소문이 퍼지자 모험가들의 발길이 끊겼고, 더는 장사를 이어갈 수 없었다.');
 if(s.money<0){if(s.inventory.length&&this.canRescue()){s.notice='운영비가 부족합니다. 재고를 정리해 회생하거나 폐점을 선택하세요. (회생 '+(s.rescueUsed||0)+' / '+this.rescueLimit()+')';this.save();return false;}this.end(false,'장사를 이어갈 자금이 바닥났다.');return;}
 this.nextDay();this.save();return true;};
/* DUNGEON_HAZARD_v2.7 §Gate-count forecast: how MANY Gates open tomorrow, off the same rule
   the generator uses. What is never told is which - no Family, no Gate identity, no Hazard. */
P.gateForecast=function(){const day=this.run.day+1;if(day>30)return null;
 if(day===30)return {day,final:true,counts:null,fixed:null};
 const counts=G.Dungeon.gateCountRule(day),p=Math.round(1000/counts.length)/10;
 return {day,final:false,fixed:counts.length===1?counts[0]:null,
  counts:counts.map(c=>({count:c,percent:p}))};};
P.tierForecast=function(){const day=this.run.day+1;if(day>=30)return null;const weights=G.Dungeon.tierWeights(day);return {day,weights,percent:weights.map(x=>Math.round(x*1000)/10)};};
P.nextDay=function(){
  this.run.day++;
  if(this.run.day===10&&!this.account.unlocks?.premium){this.account.unlocks??={};this.account.unlocks.premium=true;this.run.toast='새 상품 해금 · 길드 프리미엄 도시락';}
  if(this.run.day===14&&!this.account.unlocks?.tree){this.account.unlocks??={};this.account.unlocks.tree=true;this.run.toast='새 상품 해금 · 세계수 생환부적';}
  this.morning();
};
P.rerollPrice=function(){const n=this.run.rerollCount||0;return this.has('delivery')&&n===0?0:D.balance.rerollBase*2**Math.min(20,n);};
P.reroll=function(){const s=this.run;if(!['order','final'].includes(s.phase))throw Error('발주 시간에 교환할 수 있습니다.');const price=this.rerollPrice();if(s.money<price)throw Error('교환 비용이 부족합니다.');this.generateOffers({advancePity:false});s.cart={};s.money-=price;s.daily.rerollSpent=(s.daily.rerollSpent||0)+price;s.stats.spent+=price;s.rerollCount=(s.rerollCount||0)+1;this.save();};
/* 재고 정리 is an emergency, not a savings account. It exists so a Closing that came up short
   makes the player decide what to give up, and it stops being available the moment the till is
   square again. The rules are enforced here rather than in the UI: CLOSING only, only while the
   till is short, at half of what THAT stock actually cost to buy, and at most three separate
   deficit Closings per Run. One rescue is one such Closing - inside it any number of items may
   go until the till reaches zero. When the third is spent and the till is short again, the store
   closes with stock still on the shelf. */
P.rescueLimit=function(){return D.balance.rescueLimit;};
P.canRescue=function(){const s=this.run;
 return s.phase==='closing'&&s.money<0&&
  ((s.rescueDay===s.day)||(s.rescueUsed||0)<this.rescueLimit());};
P.liquidate=function(stockId){const s=this.run;
 if(!this.canRescue())return false;
 const i=s.inventory.findIndex(x=>x.id===stockId);if(i<0)return false;
 const st=s.inventory[i],price=Math.round((st.cost??D.itemBy[st.item].buy)*.5);
 if(s.rescueDay!==s.day){s.rescueUsed=(s.rescueUsed||0)+1;s.rescueDay=s.day;}
 s.inventory.splice(i,1);s.money+=price;s.daily.liquidation=(s.daily.liquidation||0)+price;
 s.notice=D.itemBy[st.item].name+' 재고 정리 · '+price+'G 회수'
  +(s.money>=0?' · 회생 완료':'')+' (회생 '+s.rescueUsed+' / '+this.rescueLimit()+')';
 this.save();return true;};
P.end=function(win,reason){const s=this.run;if(s.phase==='end')return;s.win=win;s.endReason=reason;s.phase='end';s.unlocked=G.Meta.finish(this.account,s,win);this.save();};
P.finalRequired=function(){return Math.min(3,this.finalEligible().length);};
P.selectFinal=function(id){const s=this.run;if(s.phase!=='final')return;const n=s.npcs.find(n=>n.id===id);if(!n?.alive||!n.introduced||n.recovery>0)throw Error('현재 원정에 참가할 수 없습니다.');if(s.team.includes(id)){s.team=s.team.filter(x=>x!==id);return this.save();}const cap=this.finalRequired();if(s.team.length>=cap)throw Error('최대 '+cap+'명까지 선택할 수 있습니다.');s.team.push(id);this.save();};
/* ECONOMY_ORDER_v2.7 §D30 FINAL PREPARATION PRICE / WALLET / GOLD OVERRIDE. A Final transfer
   is a real paid transaction, not free equipment: the price is fixed to the ordinary 50% mode
   amount, there is no 100%/150% choice and no purchase/refusal roll, and the Wallet is real -
   an adventurer who cannot afford the fixed amount cannot be given the Item. Committing moves
   exactly that amount three ways, once: out of the Wallet, into Gold, and into Gross Sales,
   which is the total GREED reads at Final Lock. */
P.finalPrice=function(item){return Math.round(G.DATA.itemBy[item].sell*G.DATA.pricing.half.mult);};
P.supplyFinal=function(npcId,stockId){const s=this.run;if(s.phase!=='final'||!s.team.includes(npcId))return;
 const n=s.npcs.find(n=>n.id===npcId);if(n.pack.length>=G.Adventurer.slots(n))throw Error('보급 슬롯이 가득 찼습니다.');
 const i=s.inventory.findIndex(x=>x.id===stockId);if(i<0)throw Error('재고가 없습니다.');
 const item=s.inventory[i].item,price=this.finalPrice(item);
 if(n.money<price)throw Error('이 모험가의 소지금으로는 살 수 없습니다.');
 n.money-=price;s.money+=price;s.daily.revenue+=price;s.stats.revenue+=price;
 n.pack.push(item);n.history.push({day:30,item,mode:'half',paid:price});
 s.inventory.splice(i,1);this.save();};
/* FINAL_EXPEDITION: one participant's contribution. Internal only - Final Power is never
   surfaced as another Player Stat. */
/* Stage 10, approved. 투력 was running away with the Final: at .58 it was worth nearly four
   times 정신, so a Job's Final value was close to its 투력 alone and Hazard preparation barely
   registered. The four weights are flattened and the environment penalty is deliberately NOT
   reduced - a Job that answers Hazards well has to keep carrying that value into the Final,
   which is where 사제 earns back what its raw Stats do not.
   This is the FINAL formula. The expedition's own combat check in dungeon.js keeps the
   coefficients it had: this adoption changes the Final, and moving D1-29 difficulty by the
   same edit would confound the two. See reports/STAGE10.md. */
/* FINAL_EXPEDITION_v2.7 §FINAL HAZARD AGGREGATION. The ordinary expedition divides the summed
   gap by sqrt(count), which punishes a Family pair merely for carrying more Hazard entries -
   a two-Family Final can hold three or four. The Final uses the MEAN gap instead, so what is
   measured is how badly each Hazard is answered rather than how many there are, and a specialist
   Counter that closes a large matching gap is worth what it actually closes. */
const finalMeanHazardGap=p=>p.hazards.length?p.hazards.reduce((v,h)=>v+h.gap,0)/p.hazards.length:0;
const individualPower=(e,meanGap)=>e.combat*.50+e.survival*.34+e.mobility*.27+e.spirit*.20-meanGap*1.70;

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
 team.forEach((n,i)=>{const p=individualPower(preparations[i].effects,finalMeanHazardGap(preparations[i]));
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
 /* Stage 10, approved. Measured as a SHARE of the target rather than per Gold of shortfall, so
    the penalty means the same thing whatever the target is set to: a Run that sold nothing takes
    the full cap, a Run at target takes none, and it is linear between. */
 if(s.bossId==='GREED'&&t.greedRevenueTarget>0&&t.greedShortfallCap!=null){
  const revenue=lock?lock.revenue:s.stats.revenue;
  const shortfallRatio=Math.max(0,(t.greedRevenueTarget-revenue)/t.greedRevenueTarget);
  return base+Math.min(t.greedShortfallCap,shortfallRatio*t.greedShortfallCap);
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
 const power=snapshots.reduce((sum,e,i)=>sum+individualPower(e,finalMeanHazardGap(preparations[i])),0); // 5-6
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
 /* The ending is about this store and the people who kept coming back to it, not about a
    result code. Thirty days of ordering, pricing and supplying is what put them at that gate. */
 this.end(cleared,cleared
  ?'우리 점포에서 떠난 원정대가 해냈다.'
  :'이 점포에서 할 수 있는 일은 여기까지였다.');};
})(globalThis);
