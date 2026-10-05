(function(G){
/* RELIC_v2.7 §EXPEDITION RELIC CATEGORY MIGRATION (the `field` helper; its original user, 긴급보급
   선반, was remade into 야전 정비대 on 2026-09-23). The helper targets Potion / Field Gear /
   Insurance. The filter still named the v2.5 `medicine` / `tool` categories, which the v2.7
   catalog does not have, so the category clause matched nothing at all and the Relic reached only
   the two Items whose effects happen to carry escape/revive - not one Potion, not one Field Gear,
   and not the third Insurance Item. The categories are named directly now; the effects clause is
   gone with them, because Insurance is a category here rather than a shape.
   `food` named the retired `fresh` category the same way (REL-Q76: no stale legacy `fresh`
   dependency); Food and Drink are the whole of it. */
const D=G.DATA,P=G.Game.prototype,food=it=>['food','drink'].includes(it.category),field=it=>['potion','gear','insurance'].includes(it.category);
function known(g){return [...new Set(g.run.dungeons.flatMap(d=>d.hazards))];}
/* RELIC §COUNTER JUDGEMENT (User 2026-09-24, v2.9.0): two predicates, one owner. 직접 대응 is a positive Counter value
   for one of the Hazards; 관련 준비 adds the Core Stat that Hazard presses. The legacy 기동-for-속박/진창 Counter exception
   is retired: 기동 on those Gates is 관련 준비, never a Counter. */
function directCounter(it,hazards){return hazards.some(h=>(it.effects[h]||0)>0);}
function relatedPrep(it,hazards){return directCounter(it,hazards)||hazards.some(h=>(it.effects[G.Dungeon.hazardRule(h).stat]||0)>0);}
/* RELIC §QUICK VIEW STATUS LINE (User 2026-09-24, v2.9.0): the runtime truth of a condition-type support, read at render
   time - no Save field, no verdict word; an always-on support returns ''. Exact lines COPY_AUDIT §11-32. */
function status(g,id){const s=g.run,p=D.relicParams;if(!s)return '';switch(id){
 case 'rotation':{const n=s.previousSales||0;return '전날 판매 '+n+'건 · '+(n>=4?'오늘 적용 중':'오늘 미적용');}
 case 'logisticsHQ':{const n=s.previousSales||0,f=p.logisticsHQ,d=Math.round(100*Math.min(f.maxDiscount,f.perSale*n));return '전날 판매 '+n+'건 · '+(d>0?'오늘 매입가 -'+d+'%':'오늘 미적용');}
 case 'guarantee':return s.guaranteeUsed?'오늘 지원 사용함':'오늘 지원 1회 남음';
 case 'groupOrder':{const n=s.daily?.sales||0,f=p.groupOrder;return '오늘 판매 '+n+'건 · '+(n>=f.commissionFrom-1?'판매마다 +'+f.commission+'G 지급 중':f.commissionFrom+'번째부터 +'+f.commission+'G');}
 case 'rerollTicket':return (s.rerollCount||0)<p.rerollTicket.freeRerolls?'오늘 무료 교환 남음':'오늘 무료 교환 사용함';
 case 'bulk':{if(!['order','final'].includes(s.phase))return '';const cart=s.cart||{};const skus=[...new Set(Object.keys(cart).filter(i=>cart[i]>0).map(i=>s.offers[i]?.item))];const n=skus.filter(item=>Object.keys(cart).filter(i=>s.offers[i]?.item===item).reduce((a,i)=>a+cart[i],0)>=3).length;return n?'지금 발주에서 '+n+'종 적용':'지금 발주에서 적용 없음';}
 case 'memberBundle':{if(s.phase!=='sell')return '';const n=g.current();if(!n)return '';if(!G.Adventurer.isTrustedRegular(n))return n.name+' · 단골 아님';return n.name+' · 단골 · 오늘 유료 구매 '+n.history.filter(h=>h.day===s.day&&h.paid>0).length+'건';}
 default:return '';}}
/* RELIC_v2.8 §D30 CANDIDATE ELIGIBILITY. D30 subtracts the explicit no-effect set from the
   ordinary pool and does nothing else: no previousSales gate lives here any more. 회전 진열대 and
   물류 본부계약 both read yesterday's sales at the moment they FIRE, and D30 has a yesterday, so a
   quiet D29 is a reason the support may pay nothing - not a reason the player may not be offered
   the choice. Whether a D30 support needs a legal Reroll or ORDER action to realise its value is
   likewise no bar: that action is legal on D30. */
/* The candidate draw, one owner: the window and its reroll read the same pool rules. `avoid` is the set kept off this
   draw when at least three others remain - the previous window's three for a new window, the three on the table for a
   reroll. Picks are drawn first, then prices, so a window draws exactly as it always has. */
/* META 본사 우수 점포 훈장: the DAY 0 free pick is drawn from 영웅 instead of 일반 */
const heroDay0=g=>!!g.wears&&g.wears('heroSign');
/* RELIC §GRADE: each card rolls its 등급 first (DAY 0: 일반 only), then draws within it; a 등급 with nothing left
   falls back to the whole pool. Diversity and build bias work inside the 등급, as they did inside the window. */
const rarityFor=(g,day)=>{if(day===0)return heroDay0(g)?3:0;const c=D.relicRarityChance,x=g.rng.next();return x<c[3]?3:x<c[3]+c[2]?2:0;};
function drawCandidates(g,day,avoid){const s=g.run;let pool=D.relics.filter(r=>!s.facilities.includes(r.id)&&!D.relicRetired.includes(r.id)&&(day!==0||r.rarity===(heroDay0(g)?3:0))&&(day!==30||!D.relicD30NoEffect.includes(r.id)));const cool=pool.filter(r=>!avoid.includes(r.id));if(cool.length>=3)pool=cool;const owned=s.facilities.flatMap(id=>D.relicBy[id]?.tags||[]),chosen=[];for(let i=0;i<3&&pool.length;i++){const tags=chosen.flatMap(r=>r.tags),want=rarityFor(g,day),graded=pool.filter(r=>r.rarity===want),base=graded.length?graded:pool;let eligible=base;if((i===1||day===0&&i===2)&&base.some(r=>r.tags.some(t=>!tags.includes(t))))eligible=base.filter(r=>r.tags.some(t=>!tags.includes(t)));const pick=g.rng.weighted(eligible,r=>1+r.tags.filter(t=>owned.includes(t)).length*.18);chosen.push(pick);pool=pool.filter(r=>r.id!==pick.id);}
 return {candidateIds:chosen.map(r=>r.id),candidatePrices:chosen.map(r=>day===0?0:Math.round(r.price*D.balance.relicPriceScale*(.85+g.rng.next()*.3)))};}
P.relicWindow=function(day){const s=this.run;if(s.relicWindow?.milestoneDay===day)return;const previous=s.relicWindow?.candidateIds||[];s.relicHistory??=[];if(s.relicWindow)s.relicHistory.push({...s.relicWindow});
 s.relicWindow={milestoneDay:day,slothSealOpportunity:this.isSealOpportunity(day),...drawCandidates(this,day,previous),purchased:null,focusedRevealSeen:day===0,expiryDay:day===30?31:day+5};this.save();};
/* RELIC §CANDIDATE REROLL (User 2026-10-02): an open, unspent window from DAY 5 on may redraw its three for Gold - 300G,
   doubling with each reroll of the same window, back to 300G on the next window. The DAY 0 free pick has none. The redraw
   keeps every pool rule and leaves the three on the table out when it can; the spend is 점포지원 investment. */
/* META 지원 교환 쿠폰함: the window's first redraw is free, then the ordinary curve from its first step (0 -> 300 -> 600...) */
P.relicRerollPrice=function(){const w=this.run.relicWindow,n=w?.rerolls||0;if(this.wears('rerollCoupon')){if(!n)return 0;return D.balance.relicReroll.base*2**(n-1);}return D.balance.relicReroll.base*2**n;};
P.canRerollRelics=function(){const w=this.run.relicWindow;return !!w&&w.milestoneDay!==0&&this.canBuyRelic();};
P.rerollRelics=function(){const s=this.run,w=s.relicWindow;if(!this.canRerollRelics())throw Error('지금은 점포지원 후보를 교환할 수 없습니다.');
 const price=this.relicRerollPrice();if(s.money<price)throw Error('점포지원 후보 교환 자금이 부족합니다.');
 s.money-=price;s.daily.relicSpent=(s.daily.relicSpent||0)+price;s.stats.relicSpent=(s.stats.relicSpent||0)+price;
 Object.assign(w,drawCandidates(this,w.milestoneDay,w.candidateIds));w.rerolls=(w.rerolls||0)+1;this.save();};
/* Sloth's seals are not a second choice path: they are the other thing this window's one
   acquisition can be spent on. Two of D15/D20/D25 were drawn with the Run and D30 always
   counts, so the opportunity Days are already fixed before the player sees any of them. */
P.isSealOpportunity=function(day){const s=this.run;
 return s.bossId==='SLOTH'&&(day===30||(s.slothDays||[]).includes(day));};

/* Breaking one costs no Gold and takes the window's acquisition instead. Deferring stays
   the ordinary behaviour - an opportunity that expires unspent awards nothing. */
P.canBreakSeal=function(){const s=this.run,w=s.relicWindow;
 return s.bossId==='SLOTH'&&!!w&&!!w.slothSealOpportunity&&!w.consumedBySealBreak&&!w.purchased
  && (s.sealBreakCount||0)<3
  && ['foundation','morning','order','final'].includes(s.phase)
  && (w.milestoneDay===0||s.day<w.expiryDay);};

P.breakSeal=function(){const s=this.run,w=s.relicWindow;
 if(!this.canBreakSeal())throw Error('지금 봉인을 풀 수 없습니다.');
 w.consumedBySealBreak=true;w.sealBreakCommitted=true;w.purchaseDay=s.day;
 s.sealBreakCount=(s.sealBreakCount||0)+1;
 s.notice='봉인 하나가 풀렸다. 이번 점포지원은 받지 않는다.';
 this.save();};

P.canBuyRelic=function(){const s=this.run,w=s.relicWindow;return ['foundation','morning','order','final'].includes(s.phase)&&w&&!w.purchased&&!w.consumedBySealBreak&&(s.phase==='foundation'||s.day<w.expiryDay)&&s.facilities.filter(id=>D.relicBy[id]).length<7;};
P.buyRelic=function(id){const s=this.run,w=s.relicWindow;if(!this.canBuyRelic()||!w.candidateIds.includes(id)||this.has(id))throw Error('지금 구매할 수 없는 점포지원입니다.');const price=w.candidatePrices[w.candidateIds.indexOf(id)];if(s.money<price)throw Error('점포지원 구매 자금이 부족합니다.');s.money-=price;s.daily.relicSpent=(s.daily.relicSpent||0)+price;s.stats.relicSpent=(s.stats.relicSpent||0)+price;s.facilities.push(id);w.purchased=id;
 /* META_v2.7 §FRANCHISE ACHIEVEMENT 4 */
w.purchaseDay=s.phase==='foundation'?0:s.day;
 const extension=id==='fridge'?D.relicParams[id].shelfDays:0;if(extension)for(const st of s.inventory){const it=D.itemBy[st.item];if(st.expires!==null&&st.expires>s.day&&food(it)&&(id!=='coldcase'||it.rarity>=1)){st.extensions??=[];if(!st.extensions.includes(id)){st.expires+=extension;st.extensions.push(id);}}}
 /* 24시간 신선체계: Food/Drink ORDER price x1.25 from acquisition, so the offers already on the
    table are repriced once here and every later offer is priced by offerFor. */
 if(id==='fresh24')for(const o of s.offers||[])if(food(D.itemBy[o.item]))o.price=Math.round(o.price*D.relicParams.fresh24.orderPriceMult);
 /* 원정 도시락 코너 (User 2026-10-02): the same once-only repricing, a flat +3G */
 if(id==='expeditionMeal')for(const o of s.offers||[])if(food(D.itemBy[o.item]))o.price=Math.round(o.price*D.relicParams.expeditionMeal.orderPriceMult);
 if(s.phase==='foundation')this.morning();else{s.notice=D.relicBy[id].name+' 확보.';/* COPY_AUDIT §11-33 (User 2026-09-24, v2.9.0): the card already says 다음 날부터 where it applies */if(Object.keys(s.cart||{}).length){try{this.validateCart(s.cart);}catch(e){s.cart={};}}}this.save();};
/* RELIC §ACQUISITION WINDOWS D0 (User 2026-10-01, v2.9.13 quick patch 3): the free first pick may wait. Deferring
   opens DAY 1 exactly as a pick does, and the D0 window stays open, still free, until the D5 window replaces it. */
P.deferFoundationRelic=function(){if(this.run.phase!=='foundation')throw Error('지금은 점포지원 선택을 넘길 수 없습니다.');this.morning();this.save();};
P.relicQuote=function(index,quantity,cart=this.run.cart||{}){const s=this.run,o=s.offers[index],it=D.itemBy[o.item];const entries=Object.keys(cart),skuTotal=entries.filter(i=>s.offers[i].item===o.item).reduce((n,i)=>n+cart[i],0),prior=entries.filter(i=>Number(i)<Number(index)&&s.offers[i].item===o.item).reduce((n,i)=>n+cart[i],0);let sum=0;for(let unit=1;unit<=quantity;unit++){let mult=1;if(skuTotal>=3){if(this.has('bulk')&&prior+unit>=3)mult*=1-D.relicParams.bulk.discount;}if(this.has('logisticsHQ')){const f=D.relicParams.logisticsHQ;mult*=1-Math.min(f.maxDiscount,f.perSale*(s.previousSales||0));}sum+=Math.round(o.price*Math.max(.45,mult));}return sum;};
P.ownedRelics=function(){return this.run.facilities.map(id=>D.relicBy[id]).filter(Boolean).map(r=>({id:r.id,name:r.name,rarity:r.rarity,description:r.description}));};
G.Relics={food,field,known,directCounter,relatedPrep,status,offerWeight(g,it){let w=1;const has=id=>g.has(id);if(has('rareContract')&&it.rarity>=2)w*=D.relicParams.rareContract.rareWeightMult;if(has('hazardBoard')&&relatedPrep(it,known(g)))w*=D.relicParams.hazardBoard.weightMult;return w;},shelf(g,it){if(!food(it))return 0;const p=D.relicParams;return g.has('fridge')?p.fridge.shelfDays:0;}};
})(globalThis);
