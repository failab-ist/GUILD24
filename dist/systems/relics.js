(function(G){
/* RELIC_v2.7 §EXPEDITION RELIC CATEGORY MIGRATION. `긴급보급 선반` targets Potion / Field Gear /
   Insurance. The filter still named the v2.5 `medicine` / `tool` categories, which the v2.7
   catalog does not have, so the category clause matched nothing at all and the Relic reached only
   the two Items whose effects happen to carry escape/revive - not one Potion, not one Field Gear,
   and not the third Insurance Item. The categories are named directly now; the effects clause is
   gone with them, because Insurance is a category here rather than a shape.
   `food` named the retired `fresh` category the same way (REL-Q76: no stale legacy `fresh`
   dependency); Food and Drink are the whole of it. */
const D=G.DATA,P=G.Game.prototype,food=it=>['food','drink'].includes(it.category),field=it=>['potion','gear','insurance'].includes(it.category);
function known(g){return [...new Set(g.run.dungeons.flatMap(d=>d.hazards))];}
function counter(it,hazards){return hazards.some(h=>(it.effects[h]||0)>0||(h==='bind'||h==='mire')&&(it.effects.mobility||0)>0);}
P.relicWindow=function(day){const s=this.run;if(s.relicWindow?.milestoneDay===day)return;const previous=s.relicWindow?.candidateIds||[];s.relicHistory??=[];if(s.relicWindow)s.relicHistory.push({...s.relicWindow});let pool=D.relics.filter(r=>!s.facilities.includes(r.id)&&(day!==0||r.kind==='foundation')&&(r.kind!=='keystone'||day>=10)&&(day!==30||r.finalUseful&&(r.id!=='rotation'||s.previousSales>=6)&&(r.id!=='logisticsHQ'||s.previousSales>=8)));const cool=pool.filter(r=>!previous.includes(r.id));if(cool.length>=3)pool=cool;const owned=s.facilities.flatMap(id=>D.relicBy[id]?.tags||[]),chosen=[];for(let i=0;i<3&&pool.length;i++){const tags=chosen.flatMap(r=>r.tags);let eligible=pool;if((i===1||day===0&&i===2)&&pool.some(r=>r.tags.some(t=>!tags.includes(t))))eligible=pool.filter(r=>r.tags.some(t=>!tags.includes(t)));const pick=this.rng.weighted(eligible,r=>1+r.tags.filter(t=>owned.includes(t)).length*.18);chosen.push(pick);pool=pool.filter(r=>r.id!==pick.id);}
 s.relicWindow={milestoneDay:day,slothSealOpportunity:this.isSealOpportunity(day),candidateIds:chosen.map(r=>r.id),candidatePrices:chosen.map(r=>day===0?0:Math.round(r.price*D.balance.relicPriceScale*(.85+this.rng.next()*.3))),purchased:null,focusedRevealSeen:day===0,expiryDay:day===30?31:day===0?1:day+5};this.save();};
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

P.canBuyRelic=function(){const s=this.run,w=s.relicWindow;return ['foundation','morning','order','final'].includes(s.phase)&&w&&!w.purchased&&!w.consumedBySealBreak&&(w.milestoneDay===0||s.day<w.expiryDay)&&s.facilities.filter(id=>D.relicBy[id]).length<7;};
P.buyRelic=function(id){const s=this.run,w=s.relicWindow;if(!this.canBuyRelic()||!w.candidateIds.includes(id)||this.has(id))throw Error('지금 구매할 수 없는 점포지원입니다.');const price=w.candidatePrices[w.candidateIds.indexOf(id)];if(s.money<price)throw Error('점포지원 구매 자금이 부족합니다.');s.money-=price;s.daily.relicSpent=(s.daily.relicSpent||0)+price;s.stats.relicSpent=(s.stats.relicSpent||0)+price;s.facilities.push(id);w.purchased=id;
 /* META_v2.7 §FRANCHISE ACHIEVEMENT 4 */
w.purchaseDay=s.phase==='foundation'?0:s.day;
 const extension=id==='fridge'?1:id==='fresh24'?2:id==='coldcase'?1:0;if(extension)for(const st of s.inventory){const it=D.itemBy[st.item];if(st.expires!==null&&st.expires>s.day&&food(it)&&(id!=='coldcase'||it.rarity>=2&&it.fresh)){st.extensions??=[];if(!st.extensions.includes(id)){st.expires+=extension;st.extensions.push(id);}}}
 if(s.phase==='foundation')this.morning();else{s.notice=D.relicBy[id].name+' 확보. 방문객·운영비 효과는 다음 날부터 적용됩니다.';if(Object.keys(s.cart||{}).length){try{this.validateCart(s.cart);}catch(e){s.cart={};}}}this.save();};
P.relicQuote=function(index,quantity,cart=this.run.cart||{}){const s=this.run,o=s.offers[index],it=D.itemBy[o.item];const entries=Object.keys(cart),skuTotal=entries.filter(i=>s.offers[i].item===o.item).reduce((n,i)=>n+cart[i],0),prior=entries.filter(i=>Number(i)<Number(index)&&s.offers[i].item===o.item).reduce((n,i)=>n+cart[i],0),firstSKU=entries.map(i=>s.offers[i].item).find(id=>entries.filter(i=>s.offers[i].item===id).reduce((n,i)=>n+cart[i],0)>=3),first=o.item===firstSKU;let sum=0;for(let unit=1;unit<=quantity;unit++){let mult=1;if(skuTotal>=3){if(this.has('bulk')&&prior+unit>=3)mult*=.85;if(this.has('groupFlyer')&&s.queue.length>=6)mult*=.9;if(food(it)&&this.has('dawnBulk'))mult*=.85;if(!s.bulkUsed&&first&&s.previousSales>=6&&this.has('rotation'))mult*=.9;if(!s.bulkUsed&&first&&s.previousSales>=8&&this.has('logisticsHQ'))mult*=.75;}sum+=Math.round(o.price*Math.max(.45,mult));}return sum;};
P.ownedRelics=function(){return this.run.facilities.map(id=>D.relicBy[id]).filter(Boolean).map(r=>({id:r.id,name:r.name,description:r.description}));};
G.Relics={food,field,known,counter,offerWeight(g,it){let w=1;const has=id=>g.has(id);if(has('showcase')&&it.rarity>=2)w*=1.7;if(has('hazardBoard')&&counter(it,known(g)))w*=1.8;if(has('medicine')&&field(it))w*=1.6;if(has('coldcase')&&food(it)&&it.rarity>=1)w*=1.8;return w;},shelf(g,it){if(!food(it))return 0;return (g.has('fridge')?1:0)+(g.has('fresh24')?2:0)+(g.has('coldcase')&&it.rarity>=1?1:0);}};
})(globalThis);
