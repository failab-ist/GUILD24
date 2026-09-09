(function(G){
const D=G.DATA,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
class Game{
 constructor(account=G.Meta.fresh(),run=null){this.account=account;this.run=run;this.rng=run?new G.RNG(run.seed,run.rngState):null;this.autosave=true;}
 save(){if(this.run)this.run.rngState=this.rng.state;if(this.autosave&&typeof localStorage!=='undefined')G.Save.write(this.account,this.run);}
 start(seed,contract='standard'){
 if(!D.contracts.some(c=>c.id===contract&&(!c.unlock||this.account.unlocked.includes(c.unlock))))throw Error('잠겨 있는 시작 계약입니다.');
 this.rng=new G.RNG(seed);this.run={version:4,seed:String(seed),rngState:this.rng.state,branch:this.rng.pick(D.brand.branches),day:1,phase:'order',money:1200+(this.account.grade>=2?50:0)+(contract==='budget'?250:0),contract,inventory:[],npcs:[],facilities:[],offers:[],queue:[],cursor:0,dungeons:[],event:null,results:[],log:[],team:[],region:50,stats:{revenue:0,spent:0,waste:0,deaths:0,rare:0,legendary:0,discoveries:0,regulars:0},daily:{revenue:0,spent:0,waste:0,operating:0},pity:{rare:0,npc:0,counter:0},nextNPC:1,rerolled:false,rewarded:false,reportHistory:[],notice:'제7게이트의 첫 아침. 오늘 갈 던전을 보고 발주해 보세요.'};
 for(const[id,num]of[['rice',2],['water',2],['bandage',1],['potion',1]])this.stock(id,num);
 if(this.account.grade>=3)this.stock(this.rng.pick(D.items.filter(i=>i.rarity===0)).id,1);
 for(let i=0;i<9;i++)this.addNPC();this.run.familyOrder=this.rng.shuffle(['spider','slime','fire','crypt','snow']);this.run.familyIntro=[this.rng.int(4,7),this.rng.int(8,12)];this.run.phase='foundation';this.relicWindow(0);return this.run;
 }
 capacity(){return 24+(this.account.grade>=4?2:0)+(this.has('warehouse')?10:0);}
 has(id){return this.run.facilities.includes(id);}
 canStock(item,count=1){return this.run.inventory.length+count<=this.capacity();}
 stock(id,count,cost=null){const it=D.itemBy[id];for(let i=0;i<count;i++)this.run.inventory.push({id:'stock-'+this.run.day+'-'+this.run.nextNPC+'-'+this.run.inventory.length+'-'+this.rng.int(0,999999),item:id,expires:it.days?this.run.day+it.days+G.Relics.shelf(this,it):null,cost:cost??it.buy});}
 addNPC(opts={}){const s=this.run;if(s.npcs.filter(n=>n.alive).length>=22)return null;let n=G.Adventurer.create(this.rng,s.nextNPC++,s.day,this.account,{premium:s.contract==='premium',...opts});for(let retry=0;s.npcs.some(x=>x.alive&&x.name===n.name)&&retry<200;retry++)n.name=G.Adventurer.name(this.rng,n.rarity);s.npcs.push(n);return n;}
 makeDungeon(id,tier=null){const s=this.run,base=D.dungeonBy[id];if(id==='boss')return {...base,hazards:[...base.hazards],day:30,scale:5.5,tier:3,family:id,power:90,reward:2};
 if(tier===null){const weights=G.Dungeon.tierWeights(s.day);tier=this.rng.weighted([1,2,3],t=>weights[t-1]);}
 return {...base,name:base.name+' '+['','I','II','III'][tier],family:id,tier,hazards:[...D.familyTiers[id][tier-1]],day:s.day,scale:1+s.day*.10+(tier-1)*.6,stars:tier,supplyPressure:this.rng.int(0,2),power:21+s.day*1.7+(tier-1)*5+(id==='fire'?6:0)+(base.base-2)*1.3,reward:base.reward*(1+(tier-1)*.12)};
 }
 morning(){const s=this.run;s.previousSales=s.daily.sales||0;s.dayFacilities=[...s.facilities];s.bulkUsed=false;s.guaranteeUsed=false;s.phase=s.day===30?'final':'morning';s.daily={revenue:0,spent:0,waste:0,operating:0,cogs:0,overcharge:0,discount:0,subsidy:0,liquidation:0,wasteCost:0,loyalty:0,sales:0,relicSpent:0,commission:0,unknownCosts:0};s.nightCursor=0;s.closing=false;s.cart={};s.rerolled=false;s.rerollCount=0;s.tastingUsed=false;s.results=[];s.team=[];s.notice='DAY '+s.day+' · '+s.branch+'의 아침. 오늘의 던전을 확인하세요.';
 const expired=s.inventory.filter(x=>x.expires!==null&&x.expires<=s.day);s.daily.waste=expired.length;s.daily.wasteCost=expired.reduce((a,x)=>a+x.cost,0);s.stats.waste+=expired.length;s.inventory=s.inventory.filter(x=>x.expires===null||x.expires>s.day);
 s.npcs.forEach(n=>{if(n.recovery>0){n.recovery--;if(!n.recovery){n.injury=Math.max(0,n.injury-1);n.status=n.injury?'부상':'건강';}}n.fatigue=Math.max(0,n.fatigue-2);n.pack=[];n.refused=[];n.refusalReasons=[];});
 if([5,10,15,20,25,30].includes(s.day))this.relicWindow(s.day);if(s.day===30){s.event=null;s.dungeons=[this.makeDungeon('boss')];s.queue=[];this.generateOffers();this.save();return;}
 s.event=s.day<=2?null:this.rng.next()<.74?this.rng.pick(D.events):null;const ev=s.event?.effects||{};
 if((s.day>1&&s.day%3===0)||ev.rookie||ev.royal)this.addNPC({rookie:!!ev.rookie,royal:!!ev.royal});
 if(s.pity.npc>=8){const fresh=s.npcs.filter(n=>!n.introduced);if(fresh.length&&this.rng.next()<.6){fresh[0].rarity=Math.max(1,fresh[0].rarity);fresh[0].potential+=.05;}}
 s.familyOrder??=this.rng.shuffle(['spider','slime','fire','crypt','snow']);s.familyIntro??=[5,10];const ids=s.familyOrder.slice(0,3+Number(s.day>=s.familyIntro[0])+Number(s.day>=s.familyIntro[1]));const count=s.day<=3?1:s.day<=7?this.rng.int(1,2):s.day<=18?2:this.rng.int(2,3);s.dungeons=this.rng.shuffle(ids).slice(0,count).map(id=>this.makeDungeon(id));
 if(ev.unknown){const unused=ids.filter(id=>!s.dungeons.some(d=>d.id===id));const d=this.makeDungeon(this.rng.pick(unused.length?unused:ids));d.name='미확인 '+d.short;d.power*=1.16;d.reward*=1.5;d.temporary=true;s.dungeons.push(d);}
 s.dungeons.forEach(d=>{d.power*=(ev.danger||1)*(1+(50-(s.region??50))*.001);d.reward*=ev.reward||1;if(ev.cold&&!d.hazards.includes('cold'))d.hazards.push('cold');});
 this.generateOffers();
 const baseVisitors=this.rng.int(3,6);let visitors=baseVisitors+(s.dayFacilities.includes('board')?1:0)+(s.dayFacilities.includes('hub')?2:0)+(s.contract==='guild'?1:0)+(ev.visitors||0);
 let available=s.npcs.filter(n=>n.alive&&!n.recovery),selected=[];
 for(let i=0;i<Math.min(visitors,available.length);i++){const pool=available.filter(n=>!selected.includes(n)),existing=pool.filter(n=>n.introduced),fresh=pool.filter(n=>!n.introduced),existingSum=existing.reduce((v,n)=>v+1+n.loyalty*.025,0);const n=this.rng.weighted(pool,n=>{const base=n.introduced?(s.day>20?.8:.62)*(1+n.loyalty*.025)/Math.max(1,existingSum):(s.day>20?.2:.38)/Math.max(1,fresh.length);return base*(n.introduced&&s.dayFacilities.includes('member')?1.4:1)*(!n.introduced&&s.dayFacilities.includes('rookieBoard')?1.7:1)*(n.loyalty>=60&&s.dayFacilities.includes('lifetime')?1.5:1);});selected.push(n);}
 s.visitorBreakdown={base:baseVisitors,board:(s.dayFacilities.includes('board')?1:0)+(s.dayFacilities.includes('hub')?2:0),contract:s.contract==='guild'?1:0,event:ev.visitors||0,available:available.length};s.queue=selected.map(n=>n.id);s.cursor=0;let promising=false;
 for(const n of selected){if(!n.introduced&&n.rarity>=1)promising=true;n.destination=this.rng.int(0,s.dungeons.length-1);n.claimedDestination=n.destination;n.destinationFinal=true;if(n.traits.includes('showoff')&&s.dungeons.length>1&&this.rng.next()<D.balance.showoffLie){const bigger=s.dungeons.map((d,i)=>({d,i})).filter(x=>x.i!==n.destination&&x.d.power>=s.dungeons[n.destination].power);if(bigger.length)n.claimedDestination=this.rng.pick(bigger).i;}n.money=Math.min(1800,Math.round(D.balance.walletBase+n.level*D.balance.walletLevel+this.rng.int(0,75)+n.money*D.balance.walletCarry));n.newToday=!n.introduced;}
 s.special=null;if(s.day>=4&&!s.specialUsed&&this.rng.next()<.045){const kind=this.rng.pick(['route','remove','mentor']);s.special={kind,used:false,candidates:kind==='mentor'?this.rng.shuffle(D.traits.filter(t=>t.direction==='positive')).slice(0,3).map(t=>t.id):[]};}s.pity.npc=promising?0:s.pity.npc+1;G.Meta.bump(this.account,'day10',s.day,true);this.save();
 }
 generateOffers({advancePity=true}={}){const s=this.run,ev=s.event?.effects||{};const num=Math.max(3,6+(this.has('terminal')?2:0)+(s.contract==='delivery'?1:0)+(ev.offers||0));s.offers=[];for(let i=0;i<num;i++)s.offers.push(this.rollOffer());
 if(ev.double){const x=s.offers.find(o=>D.itemBy[o.item].rarity===0);if(x)x.quantity*=2;}
 if(ev.blackmarket)s.offers.push(this.rollOffer(2,1.35));
 const rare=s.offers.some(o=>D.itemBy[o.item].rarity>=2);if(advancePity)s.pity.rare=rare?0:s.pity.rare+1;
 const hazards=G.Relics.known(this);s.pity.hazards??={};if(advancePity){for(const h of hazards)s.pity.hazards[h]=s.offers.some(o=>G.Relics.counter(D.itemBy[o.item],[h]))?0:(s.pity.hazards[h]||0)+1;s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}
 if(s.pity.counter>=3||this.has('expeditionCert')){const missing=hazards.filter(h=>s.pity.hazards[h]>=3),target=missing.length?missing:hazards;const matches=D.items.filter(it=>(!it.unlock||this.account.unlocked.includes(it.unlock))&&G.Relics.counter(it,target));if(matches.length){const item=this.rng.pick(matches);s.offers[s.offers.length-1]=this.offerFor(item);if(advancePity){for(const h of target)if(G.Relics.counter(item,[h]))s.pity.hazards[h]=0;s.pity.counter=Math.max(0,...hazards.map(h=>s.pity.hazards[h]));}}}
 for(const o of s.offers){const it=D.itemBy[o.item];if(it.rarity>=2)s.stats.rare++;if(it.rarity===4)s.stats.legendary++;if(!this.account.discovered.includes(it.id)){this.account.discovered.push(it.id);s.stats.discoveries++;}}
 }
 offerFor(it,price=1){const s=this.run,ev=s.event?.effects||{};return {item:it.id,price:Math.round(it.buy*price*(ev.price||1)*(s.contract==='delivery'?1.05:1)*(it.category==='magic'?(ev.magicPrice||1):1)),quantity:(it.rarity>=2?1:this.rng.int(2,4))+(this.has('medicine')&&G.Relics.field(it)?1:0)};}
 rollOffer(min=0,price=1){const s=this.run,ev=s.event?.effects||{};let pool=D.items.filter(it=>!it.unlock||this.account.unlocked.includes(it.unlock));const rates=[55,27,12+(s.pity.rare>=5?3:0),5,1];const tiers=[0,1,2,3,4].filter(v=>v>=min&&pool.some(it=>it.rarity===v));let rarity=this.rng.weighted(tiers,v=>rates[v]*(this.has('showcase')&&v>=2?1.7:1)*(s.contract==='budget'&&v>=2?.8:1));pool=pool.filter(it=>it.rarity===rarity);
 const it=this.rng.weighted(pool,it=>{let w=1;if(it.effects.potion)w*=(ev.potionWeight||1);return w*G.Relics.offerWeight(this,it);});return this.offerFor(it,price);}
 order(index){const s=this.run;if(!['order','final'].includes(s.phase))return false;const o=s.offers[index];if(!o||o.quantity<=0)throw Error('품절된 발주입니다.');if(s.money<o.price)throw Error('발주 자금이 부족합니다.');if(!this.canStock(D.itemBy[o.item]))throw Error('창고가 가득 찼습니다.');s.money-=o.price;s.daily.spent+=o.price;s.stats.spent+=o.price;o.quantity--;this.stock(o.item,1,o.price);this.save();return true;}
 open(){const s=this.run;if(s.phase!=='order')return;if(Object.values(s.cart||{}).some(q=>q>0))throw Error('선택한 발주를 먼저 확정해 주세요.');s.phase='sell';this.arrive();if(!s.queue.length)this.night();this.save();}
 arrive(){const n=this.current();if(!n)return;n.newToday=!n.introduced;n.introduced=true;n.visits++;const last=n.records.at(-1);this.run.notice=!n.newToday&&n.visits%6===0&&last?.events?.length?'“지난번에 챙긴 거, 도움이 됐어요.”':n.newToday?'“여기가 길드24인가요?”':n.injury?'“아직 조금 욱신거리네요.”':n.loyalty>=60?'“늘 보던 얼굴이네요.”':'“다시 왔어요.”';}
 current(){return this.run.npcs.find(n=>n.id===this.run.queue[this.run.cursor]);}
 interest(n,it,mode='full'){
 const rule=D.pricing[mode];if(!rule)throw Error('알 수 없는 판매 방식입니다.');
 const price=Math.round(it.sell*rule.mult),d=this.run.dungeons[n.destination]||this.run.dungeons[0],p=it.effects;
 let fit=d.hazards.reduce((v,h)=>v+Math.max(0,p[h]||0),0),need=.53+Math.min(.29,fit*.012);
 if(n.injury&&it.category==='medicine')need+=.25;if(n.pack.length)need-=.1;
 for(const id of n.traits){const t=D.traitBy[id].effects;need+=t.buyBias||0;if(price>D.balance.frugalThreshold)need+=t.priceBias||0;}
 if(n.traits.includes('eater')&&['food','fresh'].includes(it.category))need+=.12;
 if(n.traits.includes('caffeine')&&p.caffeine)need+=.2;
 if(this.has('premiumMember')&&it.rarity>=2&&n.loyalty>=50)need+=.1;
 if(this.run.event?.effects.foodDemand&&['food','fresh','drink'].includes(it.category))need+=this.run.event.effects.foodDemand;
 const guarantee=this.has('guarantee')&&!this.run.guaranteeUsed&&it.sell>=200?Math.round(it.sell*.2):0;const debit=Math.max(0,price-guarantee);const burden=debit/Math.max(1,n.money),chance=n.money<debit?0:clamp(need+n.loyalty*.002+rule.intent,.08,.97);
 return {price,debit,guarantee,chance,need:need>=.75?'높음':need>=.5?'보통':'낮음',burden:n.money<debit?'소지금 부족':burden>.7?'높음':burden>.35?'보통':'낮음',label:n.money<debit?'소지금 부족':need>=.75?'필요도 높음':need>=.5?'필요도 보통':'필요도 낮음',reason:n.money<debit?'소지금 부족':mode==='overcharge'||burden>.7?'가격 부담으로 구매를 망설입니다.':need<.5?'필요도가 낮아 구매를 망설입니다.':'이번 제안을 받아들이지 않았습니다.'};
 }
 sell(stockId,mode='full'){
 const s=this.run;if(s.phase!=='sell')return false;const n=this.current();if(!n)throw Error('현재 손님이 없습니다.');if(n.pack.length>=G.Adventurer.slots(n))throw Error('원정 소모품 슬롯이 가득 찼습니다.');const selectedUnit=s.inventory.find(x=>x.id===stockId);const earliest=selectedUnit?s.inventory.filter(x=>x.item===selectedUnit.item).sort((a,b)=>(a.expires??Infinity)-(b.expires??Infinity))[0]:null;const i=s.inventory.findIndex(x=>x===earliest);if(i<0)throw Error('재고가 없습니다.');const st=s.inventory[i],it=D.itemBy[st.item],key=it.id+':'+mode;
 if(n.refused.includes(key))throw Error('이미 거절한 조건입니다. 다른 가격이나 상품을 골라 주세요.');
 const intent=this.interest(n,it,mode);if(n.money<intent.debit)throw Error('손님의 소지금이 부족합니다.');
 const accepted=this.rng.next()<intent.chance;
 if(!accepted){n.refused.push(key);const reason=intent.burden==='높음'||mode==='overcharge'?'price':intent.need==='낮음'?'need':'choice';n.refusalReasons??=[];n.refusalReasons.push({item:it.id,mode,reason});if(reason==='price')for(const [other,rule]of Object.entries(D.pricing))if(rule.mult>D.pricing[mode].mult&&!n.refused.includes(it.id+':'+other))n.refused.push(it.id+':'+other);s.notice=reason==='price'?'“그 가격에는 못 사겠어요.”':reason==='need'?'“그건 오늘 필요 없어요.”':'“이번엔 안 살게요.”';this.save();return false;}
 s.inventory.splice(i,1);n.pack.push(it.id);n.money-=intent.debit;if(intent.guarantee)this.run.guaranteeUsed=true;s.money+=intent.price;s.daily.revenue+=intent.price;s.stats.revenue+=intent.price;
 if(Number.isFinite(st.cost)&&!st.costUnknown)s.daily.cogs+=st.cost;else {s.daily.unknownCosts=(s.daily.unknownCosts||0)+1;s.daily.unknownRevenue=(s.daily.unknownRevenue||0)+intent.price;}s.daily.sales=(s.daily.sales||0)+1;s.daily.overcharge+=Math.max(0,intent.price-it.sell);s.daily.discount+=Math.max(0,it.sell-intent.price);
 let loyalty=D.pricing[mode].loyalty;if(this.has('stamp')&&intent.price>0&&loyalty>0)loyalty=Math.round(loyalty*1.5);
 if(s.event?.effects.tasting&&mode==='half'&&!s.tastingUsed){s.money+=D.balance.tastingSupport;s.daily.subsidy+=D.balance.tastingSupport;s.tastingUsed=true;}
 if(this.has('memberBundle')&&n.visits>1&&n.history.filter(h=>h.day===s.day&&h.paid>0).length===1)loyalty+=2;
 let commission=0;if(this.has('royalCert')&&mode==='overcharge'&&it.rarity>=2)commission+=Math.round(it.sell*.12);if(this.has('supplyCert')&&it.rarity>=2&&(G.Relics.counter(it,G.Relics.known(this))||it.effects.escape||it.effects.revive))commission+=Math.round(it.sell*.08);s.money+=commission;s.daily.commission=(s.daily.commission||0)+commission;
 const before=n.loyalty;this.loyal(n,loyalty);s.daily.loyalty+=n.loyalty-before;
 n.history.push({day:s.day,item:it.id,mode,paid:intent.price,cost:st.cost,costUnknown:!!st.costUnknown,debit:intent.debit,guarantee:intent.guarantee,commission,loyalty:n.loyalty-before});G.Meta.bump(this.account,'revenue3000',intent.price);G.Meta.check(this.account);
 s.notice=mode==='overcharge'?'“가격이 좀 올랐네요.”':mode==='half'?'“다녀와서 또 들를게요.”':'“이걸로 주세요.”';this.save();return true;
 }
 cartTotal(cart=this.run.cart||{}){return Object.entries(cart).reduce((v,[i,q])=>v+this.relicQuote(Number(i),q,cart),0);}
 validateCart(cart){const s=this.run;if(!['order','final'].includes(s.phase))throw Error('발주 시간이 아닙니다.');let count=0,food=0;for(const [i,q]of Object.entries(cart)){const o=s.offers[i];if(!o||!Number.isInteger(q)||q<0||q>o.quantity)throw Error('발주 수량을 확인해 주세요.');count+=q;if(['food','fresh','drink'].includes(D.itemBy[o.item].category))food+=q;}
 if(this.cartTotal(cart)>s.money)throw Error('발주 자금이 부족합니다.');const existingFood=s.inventory.filter(x=>['food','fresh','drink'].includes(D.itemBy[x.item].category)).length;
 if(s.inventory.length+count>this.capacity())throw Error('창고가 가득 찼습니다.');return true;}
 setQuantity(i,q){const cart={...(this.run.cart||{}),[i]:q};this.validateCart(cart);this.run.cart=cart;this.save();}
 maxQuantity(i){let q=0;for(let n=1;n<=this.run.offers[i].quantity;n++){try{this.validateCart({...this.run.cart,[i]:n});q=n;}catch(e){break;}}return q;}
 confirmOrder(){const s=this.run,cart=s.cart||{};this.validateCart(cart);let bulk=Object.keys(cart).some(i=>Object.keys(cart).filter(j=>s.offers[j].item===s.offers[i].item).reduce((n,j)=>n+cart[j],0)>=3);for(const [i,q]of Object.entries(cart)){if(!q)continue;const o=s.offers[i],price=this.relicQuote(Number(i),q,cart);s.money-=price;s.daily.spent+=price;s.stats.spent+=price;o.quantity-=q;const unit=Math.floor(price/q);for(let k=0;k<q;k++)this.stock(o.item,1,unit+(k<price%q?1:0));if(q>=3)bulk=true;}if(bulk)s.bulkUsed=true;s.cart={};s.notice='발주 완료.';this.save();}
 loyal(n,amount){const old=n.loyalty;n.loyalty=clamp(n.loyalty+amount,0,100);if(old<51&&n.loyalty>=51){this.run.stats.regulars++;G.Meta.bump(this.account,'regular3');}}
 depart(){const s=this.run;if(s.phase!=='sell')return;const n=this.current();if(n)this.loyal(n,1);s.cursor++;if(s.cursor>=s.queue.length)this.night();else this.arrive();this.save();}
 night(){const s=this.run;if(s.phase!=='sell')return;s.results=[];for(const id of s.queue){const n=s.npcs.find(n=>n.id===id);if(!n?.alive)continue;const d=s.dungeons[n.destination];const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities);if(n.claimedDestination!==undefined&&n.destination!==n.claimedDestination){rep.routeChange='허세를 부린 '+n.name+'은 말했던 '+s.dungeons[n.claimedDestination].name+' 대신 '+d.name+'으로 향했다.';n.records.at(-1).routeChange=rep.routeChange;}s.results.push(rep);if(n.alive){this.loyal(n,2);if(n.visits>1&&n.history.some(h=>h.day===s.day&&h.paid>0)&&n.loyalty>=30&&this.has('returnPoints')){this.loyal(n,2);n.money+=12;}if(n.loyalty>=60&&this.has('lifetime'))n.money+=25;}else s.stats.deaths++;G.Meta.observe(this.account,rep,n);}
 s.daily.operating=D.balance.operating+(s.contract==='guild'?20:0)+(s.contract==='premium'?25:0)+(s.dayFacilities?.includes('showcase')?10:0)+(s.dayFacilities?.includes('hub')?35:0)-(s.dayFacilities?.includes('efficiency')?15:0)+(s.event?.effects.audit&&s.stats.waste>=6?Math.min(100,s.stats.waste*5):0);
 s.money-=s.daily.operating;s.phase='night';s.reportHistory.push({day:s.day,...s.daily,balance:s.money});s.region=Math.max(0,Math.min(100,(s.region??50)+s.results.reduce((v,r)=>v+(r.won?2:r.outcome==='사망'?-4:-1),0)));s.regionReport=!s.results.length?'오늘은 원정에 나선 손님이 없었다.':s.results.filter(r=>r.won).length>=Math.ceil(s.results.length/2)?'공략 성과로 게이트 주변 통행이 안정됐습니다.':'원정대가 고전하며 게이트 앞 경계가 강화됐습니다.';s.notice='밤의 귀환 보고가 도착했습니다.';this.save();}
}
G.Game=Game;
})(globalThis);
