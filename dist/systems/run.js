(function(G){
const D=G.DATA,P=G.Game.prototype;
P.beginOrder=function(){if(this.run.phase!=='morning')return;this.run.phase='order';this.save();};
P.finishOrder=function(){if(this.run.phase!=='order')return;this.confirmOrder();this.open();};
P.finishNight=function(){if(this.run.phase!=='night')return;this.run.phase='closing';this.save();};
/* SA-Q43. The D4+ random 길드 지원 path - destination reassignment, Trait removal and Trait
   tutoring - had no routed Design owner in v2.8. Adoption deactivates it rather than keeping it
   as gameplay because it happens to be in Source; if it is wanted it comes back as its own
   Design proposal. The action, its generator and its UI are all gone, so there is nothing left
   for a stale save to re-enter through. */
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
  if(this.run.day===10&&!this.account.unlocks?.premium){this.account.unlocks??={};this.account.unlocks.premium=true;this.run.toast='새 상품 해금 · 길드 특제 도시락';}
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
/* META_v2.8 §Run-end settlement structure:
     Store Capital Gain = round(Gross Sales x Day-reach conversion rate)
   Gross Sales is `stats.revenue`, the sales accounting the Run already keeps - credited once by
   an ordinary Sale and once by a Final fixed-price transfer, and never recounted here. No
   second Meta-only sales counter exists.

   Ending Gold and remaining Inventory are NOT inputs. They still decide liquidity, rescue and
   bankruptcy inside the Run; Meta simply does not reward that same end-state wealth again. The
   two terms are what Store Growth rewards: how much business the store did, and how long that
   business survived.

   Settled exactly once. The guard lives on the Run, so a reload of an ended Run reads the
   recorded settlement instead of earning it again. A manual abandon never reaches end(), which
   is what makes abandon worth nothing. */
P.settleStoreCapital=function(){const s=this.run;
 if(s.settled)return s.settlement;
 const sales=s.stats.revenue,rate=G.Meta.capitalRate(s.day);
 const gain=Math.round(sales*rate);
 s.settled=true;
 s.settlement={day:s.day,sales,rate,gain,capitalAfter:G.Meta.addCapital(this.account,gain)};
 return s.settlement;};
P.end=function(win,reason){const s=this.run;if(s.phase==='end')return;s.win=win;s.endReason=reason;s.phase='end';s.unlocked=G.Meta.finish(this.account,s,win);this.settleStoreCapital();this.save();};
/* FINAL_EXPEDITION v2.8 party rule: the CAP of the party. Any 1..cap may be committed - a 1- or
   2-person challenge is a valid choice even with 3+ eligible - and 0 eligible is a Run Fail.
   No participant-count bonus, penalty, multiplier or auto-fill exists anywhere. */
P.finalRequired=function(){return Math.min(3,this.finalEligible().length);};
P.selectFinal=function(id){const s=this.run;if(s.phase!=='final')return;if(s.finalCommitted)throw Error('원정대가 확정되어 바꿀 수 없습니다.');const n=s.npcs.find(n=>n.id===id);if(!n?.alive||!n.introduced||n.recovery>0)throw Error('현재 원정에 참가할 수 없습니다.');if(s.team.includes(id)){s.team=s.team.filter(x=>x!==id);return this.save();}const cap=this.finalRequired();if(s.team.length>=cap)throw Error('최대 '+cap+'명까지 선택할 수 있습니다.');s.team.push(id);this.save();};
/* FINAL_EXPEDITION FINAL-Q75: participant selection is confirmed before Final preparation begins.
   Confirming only closes the roster - no RNG, no Gold, no Inventory - and is saved, so once a
   transfer has been paid the party that received it cannot be swapped out, and a reload comes
   back to preparation rather than selection. */
P.commitFinalParty=function(){const s=this.run;if(s.phase!=='final'||s.finalCommitted)return;
 const cap=this.finalRequired();
 if(!cap||!s.team.length||s.team.length>cap)throw Error('원정대를 1명 이상 선택해 주세요.');
 s.finalCommitted=true;this.save();};
/* FINAL_EXPEDITION §3: Insurance that has no Final effect, blocked from a Final Bag. */
const FINAL_NO_EFFECT=new Set(['kit','stone','tree']);
P.finalNoEffect=function(item){return FINAL_NO_EFFECT.has(item);};
/* ECONOMY_ORDER_v2.7 §D30 FINAL PREPARATION PRICE / WALLET / GOLD OVERRIDE. A Final transfer
   is a real paid transaction, not free equipment: the price is fixed to the ordinary 50% mode
   amount, there is no 100%/150% choice and no purchase/refusal roll, and the Wallet is real -
   an adventurer who cannot afford the fixed amount cannot be given the Item. Committing moves
   exactly that amount three ways, once: out of the Wallet, into Gold, and into Gross Sales,
   which is the total GREED reads at Final Lock. */
P.finalPrice=function(item){return Math.round(G.DATA.itemBy[item].sell*G.DATA.pricing.half.mult);};
P.supplyFinal=function(npcId,stockId){const s=this.run;if(s.phase!=='final'||!s.team.includes(npcId))return;
 if(!s.finalCommitted)throw Error('먼저 원정대를 확정해 주세요.');
 const n=s.npcs.find(n=>n.id===npcId);if(n.pack.length>=G.Adventurer.slots(n))throw Error('보급 슬롯이 가득 찼습니다.');
 const i=s.inventory.findIndex(x=>x.id===stockId);if(i<0)throw Error('재고가 없습니다.');
 const item=s.inventory[i].item,price=this.finalPrice(item);
 if(this.finalNoEffect(item))throw Error('Final 효과 없음 - 마왕성 원정에서는 쓰이지 않습니다.');
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
/* The same four coefficients Forecast and Resolve read, so they are read from the one helper
   rather than written out a third time - a copy of them is what let the balance harness drift
   a whole Stage behind the game. */
const individualPower=(e,meanGap)=>G.Dungeon.preparedPower(e)-meanGap*1.70;

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
 /* BOSS_v2.7 §GLUTTONY: every POSITIVE Core-Stat contribution that came from an Item is
    halved, whatever the Item's Rarity - the Rare+ threshold is superseded. It reads the
    per-item breakdown, which is already the amplified contribution, so Food/Drink/Potion
    Trait and Relic amplification has happened before this. A harmful Item Stat is left alone,
    and the NPC's own Stats, Counters, Supply, Insurance, Utility and Loot are untouched. */
 if(boss==='GLUTTONY'&&t.gluttonyStatFactor!=null)
  for(const c of prep.itemStats||[])
   for(const k of STATS)if(c.stats[k]>0)e[k]-=c.stats[k]*(1-t.gluttonyStatFactor);
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

/* The shared Final order (BOSS / FINAL_EXPEDITION), steps 1-7: everything before the Roll.
   Steps 1-3 are the ordinary prepare: locked NPC state, locked Item/Supply/equipment, then the
   Family Hazard result. Final reuses it; there is no Final-only combat or survival judgement.
   A Boss Trait attaches at exactly two places, step 4 and step 7. It is pure - no RNG, no
   write - so the resolution, the party-wide 토벌 전망 and the Item previews all read this one
   truth. `packs` optionally replaces Bags ({npcId:[items]}) for a hypothetical preview. */
P.finalPreRoll=function(packs){const s=this.run,d=s.dungeons[0];
 const team=s.team.map(id=>{const n=s.npcs.find(n=>n.id===id);return packs&&packs[id]?{...n,pack:packs[id]}:n;});
 const preparations=team.map(n=>G.Dungeon.prepare(n,d,s.facilities));              // 1-3
 const context=s.bossId==='ENVY'?{envyTargetNpcId:this.envyTarget(team,preparations)}:null; // 4 target pass
 const snapshots=preparations.map((p,i)=>this.finalSnapshot(team[i],p,d,context));  // 4
 const power=snapshots.reduce((sum,e,i)=>sum+individualPower(e,finalMeanHazardGap(preparations[i])),0); // 5-6
 const bossPower=this.effectiveBossPower(power,{revenue:s.stats.revenue,sealBreakCount:s.sealBreakCount}); // 7
 return {d,team,preparations,context,snapshots,power,bossPower};};
/* FINAL-Q77: the one party-wide 토벌 전망 - the committed party's pre-roll truth against the
   effective Boss, in the shared 우세/접전/불리 bands. Null until the party is committed. */
P.finalForecast=function(){const s=this.run;if(s.phase!=='final'||!s.finalCommitted||!s.team.length)return null;
 const t=this.finalPreRoll();return G.Dungeon.band(t.power/t.bossPower);};
P.boss=function(){const s=this.run;if(s.phase!=='final')return;
 const cap=this.finalRequired();
 if(!cap)return this.end(false,'출전할 수 있는 모험가가 없어 마왕성 원정을 시작하지 못했습니다.');
 /* The resolver enforces the commitment boundary itself: a non-empty party is never
    auto-committed here, and an uncommitted one does not resolve. */
 if(!s.finalCommitted)throw Error('먼저 원정대를 확정해 주세요.');
 if(!s.team.length||s.team.length>cap)throw Error('원정대를 1명 이상 선택해 주세요.');
 const {d,team,preparations,context,snapshots,power,bossPower}=this.finalPreRoll();
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
