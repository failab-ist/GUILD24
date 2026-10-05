(function(G){
const D=G.DATA;
/* What counts as a 고가상품 for 길드 보증 진열대. It was a bare 200 inside shop.js and the
   relic's own description never said it, so the player could not tell which sales it covered.
   Naming it lets the rule and the sentence read the same number - it belongs to this relic,
   not to D.balance: it is the existing threshold given a name, not a new tuning lever. */
const GUARANTEE_MIN_PRICE=200;
/* COPY_AUDIT §11 (User 2026-10-04): who gains comes first, in plain words a newcomer reads at once. Every number is read
   from relicParams / D.balance / D.pricing when the card is drawn (User 2026-10-04: copy follows the value, one place to
   change), so a description is a function of the live tables, not a literal. A changed value reads `새 값 (기존 값)`. */
const pct=x=>Math.round(x*100)+'%',pp=x=>Math.round(x*100)+'%p',times=x=>x+'배';
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],130,p=>'같은 상품을 한 번에 3개 이상 발주하면, 3번째부터 매입가가 '+pct(p.bulk.discount)+' 싸진다.'],
['rotation','회전 진열대','foundation',['rotation'],80,p=>'전날 4개 이상 팔았으면, 오늘 발주 후보마다 들일 수 있는 수량이 '+p.rotation.supplyBonus+'개 늘어난다.'],
['stamp','단골 스탬프 기계','foundation',['vip'],130,p=>{const up=m=>Math.round(D.pricing[m].loyalty*p.stamp.loyaltyMult);
 return '손님의 구매로 오르는 단골도: 정가 +'+up('full')+' (기존 +'+D.pricing.full.loyalty+'), 50% 할인 +'+up('half')+' (기존 +'+D.pricing.half.loyalty+'). 원정 뒤에 오르는 단골도는 그대로.';}],
['member','회원 관리대장','foundation',['vip'],130,p=>'단골도가 손님이 다시 올 가능성에 주는 효과가 '+times(p.member.loyaltyRevisitMult)+'가 된다.'],
['rareContract','희귀상품 입고 계약','foundation',['premium'],140,p=>'발주 후보에 희귀 이상 상품이 '+times(p.rareContract.rareWeightMult)+' 자주 나온다. 희귀 이상 상품을 팔면 가게가 판매가의 '+pct(p.rareContract.hqBonus)+'를 더 받는다.'],
['guarantee','길드 보증 진열대','foundation',['premium'],140,p=>'하루 한 번, '+GUARANTEE_MIN_PRICE+'G 이상에 파는 상품은 손님이 판매가의 '+pct(1-p.guarantee.subsidyRate)+'만 내고 가게는 전액을 받는다.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],60,p=>'오늘 게이트 위험에 맞는 상품이 발주 후보에 '+times(p.hazardBoard.weightMult)+' 자주 나온다.'],
['fieldRepair','야전 정비대','foundation',['expedition'],80,p=>'가게에서 판 상품의 위험 대응 수치가 '+pct(p.fieldRepair.counterMult-1)+' 높아진다.'],
['fridge','대형 냉장고','foundation',['fresh'],60,p=>'음식·음료의 유통기한이 '+p.fridge.shelfDays+'일 늘어난다. 이미 가진 재고도 한 번 늘어난다.'],
['kitchen','즉석식품 코너','foundation',['fresh'],200,p=>'음식·음료가 올려 주는 능력치가 '+pct(p.kitchen.statBonus)+' 더 오른다 (피로 회복·위험 대응은 그대로). 대신 기본 운영비가 '+pct(p.kitchen.overheadRate)+' 오른다.'],
['board','길드 전광판','foundation',['customer'],110,p=>'손님 수가 적게 나와도 하루 기본 '+p.board.minVisitors+'명은 온다 (기존 3명).'],
['firstVisitCoupon','첫 방문 쿠폰','foundation',['customer'],110,p=>'처음 온 손님의 손님 소지금 +'+p.firstVisitCoupon.arrivalGold+'G, 그 손님의 구매 의사 +'+pp(p.firstVisitCoupon.intentBonus)+'.'],
['groupOrder','단체 주문 창구','hybrid',['rotation','customer'],200,p=>'매일 아침 '+pct(p.groupOrder.visitorChance)+' 확률로 손님이 1명 더 온다. 하루 '+p.groupOrder.commissionFrom+'번째 판매부터는 팔 때마다 가게가 '+p.groupOrder.commission+'G를 더 받는다.'],
['memberBundle','단골 묶음혜택','hybrid',['rotation','vip'],190,p=>'단골 손님이 오늘 두 번째 상품을 살 때, 손님은 '+(p.memberBundle.payShare===.5?'반값':'판매가의 '+pct(1-p.memberBundle.payShare))+'만 내고 가게는 전액을 받는다.'],
['premiumMember','프리미엄 멤버십','hybrid',['vip','premium'],200,p=>'다시 온 손님의 손님 소지금 +'+p.premiumMember.arrivalGold+'G, 희귀 이상 상품 구매 의사 +'+pp(p.premiumMember.rareIntentBonus)+'. 그 손님이 희귀 이상 상품을 정가나 할인으로 사면 단골도가 '+p.premiumMember.rareLoyalty+' 더 오른다.'],
['returnPoints','귀환 적립제','hybrid',['vip','expedition'],240,p=>'오늘 상품을 산 손님이 원정에서 살아 돌아오면, 그 손님의 단골도 +'+p.returnPoints.loyaltyBonus+', 손님 소지금 +'+p.returnPoints.goldBonus+'G.'],
['expeditionMeal','원정 도시락 코너','hybrid',['fresh','expedition'],200,p=>'모든 음식·음료가 기존 위험 대응이 없어도 모든 위험 대응을 '+p.expeditionMeal.hazardDefense+' 올린다. 마왕성에서는 가장 약한 위험 하나만 올린다. 대신 음식·음료 매입가가 '+pct(p.expeditionMeal.orderPriceMult-1)+' 오른다.'],
['coldcase','고급 식자재 유통 계약','hybrid',['fresh','premium'],180,p=>'매일 첫 발주 후보에 고급 이상 음식·음료가 '+p.coldcase.extraOffers+'칸 더 나온다. 고급 이상 음식·음료를 팔면 가게가 판매가의 '+pct(p.coldcase.commissionRate)+'를 더 받는다.'],
['supplyCert','길드 납품 인증','hybrid',['premium','expedition'],220,p=>'희귀 이상 상품 중 오늘 위험에 맞는 것이나 보험을 팔면, 가게가 정가의 '+pct(p.supplyCert.commissionRate)+'를 더 받고 그 손님의 손님 소지금도 +'+p.supplyCert.goldBonus+'G.'],
['dawnRecovery','새벽 회수 계약','hybrid',['fresh','rotation'],190,p=>'유통기한이 지난 음식·음료는 버리는 대신 매입가의 '+pct(p.dawnRecovery.refundRate)+'를 돌려받는다. 매일 첫 발주 후보에 음식이나 음료가 '+p.dawnRecovery.extraOffers+'칸 더 나온다.'],
['logisticsHQ','물류 본부계약','keystone',['rotation'],300,p=>'전날 판 상품 1개마다 오늘 발주 매입가가 '+pct(p.logisticsHQ.perSale)+' 싸진다 (최대 '+pct(p.logisticsHQ.maxDiscount)+').'],
['lifetime','평생 단골제','keystone',['vip'],310,p=>'단골 손님의 능력치가 모두 '+pct(p.lifetime.statBonus)+' 오른다. 한 번 단골이 되면 단골도가 '+G.Adventurer.TRUSTED_REGULAR+' 아래로 떨어지지 않는다.'],
['royalCert','왕도 프리미엄 인증','keystone',['premium'],320,p=>'바가지(150%)로 팔면 가게가 판매가의 '+pct(p.royalCert.commissionRate)+'를 더 받고, 손님의 바가지 구매 의사 +'+pp(p.royalCert.intentBonus)+'. 대신 기본 운영비가 '+pct(p.royalCert.overheadRate)+' 오른다.'],
['opsRoom','원정 작전실','keystone',['expedition'],290,p=>'손님의 위험 대응이 필요한 수치를 넘긴 만큼 투력이 오른다 (최대 +'+pct(p.opsRoom.overshootCap*p.opsRoom.mult)+').'],
['fresh24','24시간 신선체계','keystone',['fresh'],360,p=>'음식·음료가 올려 주는 능력치가 '+pct(p.fresh24.statBonus)+' 더 오른다 (피로 회복·위험 대응은 그대로). 대신 음식·음료 매입가 +'+pct(p.fresh24.orderPriceMult-1)+'.'],
['hub','지역 거점점 계약','keystone',['customer'],340,p=>'다음 날부터 매일 손님이 '+pct(p.hub.p1)+' 확률로 1명, '+pct(p.hub.p2)+' 확률로 2명 더 온다. 대신 기본 운영비가 '+pct(p.hub.overheadRate)+' 오른다.'],
['warehouse','후방 창고 증설','utility',[],130,p=>'창고에 둘 수 있는 상품이 '+p.warehouse.slots+'칸 늘어난다.'],
['extraOrder','본사 추가발주권','utility',[],190,p=>'다음 발주부터 발주 후보가 '+p.extraOrder.extraOffers+'개 늘어난다.'],
['rerollTicket','발주 교환권','utility',[],120,()=>{const b=D.balance.rerollBase;return '매일 첫 발주 후보 교환은 무료. 그다음부터 '+b+'G → '+b*2+'G → '+b*4+'G… 로 오른다.';}],
['efficiency','운영 효율 매뉴얼','utility',[],130,p=>'다음 날부터 하루 기본 운영비가 '+p.efficiency.overheadCut+'G 적어진다.'],
/* RELIC 31 / 32 (User 2026-09-28, v2.9.11): two Expedition supports that ease an injury - COPY_AUDIT §11-30b / §11-30c */
['fieldStretcher','야전 들것','foundation',['expedition'],80,p=>'부상당한 손님의 투력 감소 '+pct(p.fieldStretcher.injuredCombatPenalty)+' (기존 15%).'],
['firstAidDesk','응급 처치대','keystone',['expedition'],300,p=>'부상당한 손님이 가게에 오면 '+pct(p.firstAidDesk.healChance)+' 확률로 부상이 낫는다 (중상은 제외).'],
/* RELIC 33 · 34 · 35 (User 2026-10-04): a troll pick, a 단골 build piece, and the 희귀 survival line */
['rumorBoard','소문 수집 게시판','utility',[],60,()=>'점포지원이 오는 날과 심층원정 날만 빼고, 매일 아침 사건이 꼭 생긴다.'],
['postcard','단골 추천 엽서함','foundation',['vip'],80,p=>'단골 손님이 온 날에는 그날 온 다른 손님의 단골도가 모두 '+p.postcard.loyalty+' 오른다.'],
['rescueContract','길드 구조대 계약','hybrid',['expedition'],240,p=>'원정에서 사망 결과가 나오면 '+pct(p.rescueContract.chance)+' 확률로 중상으로 바뀌어 돌아온다.']
];
/* description is a getter: it reads relicParams (defined below) at the moment a card is drawn */
/* RELIC §GRADE (User 2026-10-04): the Player-facing 등급, matched to measured contribution, held as an Item rarity index
   (0 일반 · 2 희귀 · 3 영웅) so it reads the Item rarity names and colours. kind / tags stay the internal build taxonomy; a
   window draws a rarity per card first (D.relicRarityChance), then a support of that rarity. */
const GRADE={epic:['fresh24','logisticsHQ','lifetime','royalCert','opsRoom','hub','firstAidDesk'],
 rare:['kitchen','extraOrder','returnPoints','dawnRecovery','groupOrder','premiumMember','expeditionMeal','supplyCert','coldcase','rescueContract','memberBundle']};
const rarityOf=id=>GRADE.epic.includes(id)?3:GRADE.rare.includes(id)?2:0;
D.relics=rows.map(([id,name,kind,tags,price,copy])=>Object.defineProperty({id,name,kind,rarity:rarityOf(id),tags,price,
 ...(id==='guarantee'?{minPrice:GUARANTEE_MIN_PRICE}:{})},'description',{get:()=>copy(D.relicParams),enumerable:true}));
D.relicRarityChance={0:.60,2:.28,3:.12};
D.relicBy=Object.fromEntries(D.relics.map(r=>[r.id,r]));D.facilities=D.relics;
/* Effect STRENGTH of every support, read by its use sites. The trigger conditions (3+ of one
   SKU, 6+ visitors, loyalty thresholds, rarity gates, previous-day sales) stay at the use site;
   only how strong the effect is lives here, and the descriptions above read it. */
D.relicParams={
 bulk:{discount:.20},
 rotation:{supplyBonus:1},
 stamp:{loyaltyMult:1.75},
 member:{loyaltyRevisitMult:2},
 rareContract:{rareWeightMult:1.7,hqBonus:.10}, /* v2.9.11 (User 2026-09-29): was saleMult 1.1 paid by the customer */
 guarantee:{subsidyRate:.3},
 hazardBoard:{weightMult:1.5},
 fieldRepair:{counterMult:1.4},
 fieldStretcher:{injuredCombatPenalty:.08},
 firstAidDesk:{healChance:.20},
 fridge:{shelfDays:2},
 kitchen:{statBonus:.25,overheadRate:.10}, /* User 2026-10-02: the +10% operating cost is back - the Fresh line clears more, pays more */
 board:{minVisitors:4},
 firstVisitCoupon:{arrivalGold:30,intentBonus:.20},
 groupOrder:{visitorChance:.20,commissionFrom:5,commission:15},
 memberBundle:{payShare:.5},
 premiumMember:{rareIntentBonus:.15,arrivalGold:25,rareLoyalty:10},
 returnPoints:{loyaltyBonus:4,goldBonus:20}, /* User 2026-10-04: Loyalty 5 -> 4 with the returning-customer condition gone */
 expeditionMeal:{hazardDefense:2,orderPriceMult:1.15},
 coldcase:{extraOffers:1,commissionRate:.15},
 supplyCert:{commissionRate:.40,goldBonus:30},
 dawnRecovery:{refundRate:.5,extraOffers:1},
 logisticsHQ:{perSale:.03,maxDiscount:.30}, /* v2.9.11 remake (User 2026-09-29): was same-SKU 3+ -25% after 6 sales */
 lifetime:{statBonus:.10}, /* User 2026-10-02 remake: no Gold, no revisit weight - 단골 Stats +10%, and the 단골 line holds */
 royalCert:{commissionRate:.40,intentBonus:.10,overheadRate:.10},
 opsRoom:{overshootCap:.5,mult:.6,final:true}, /* User 2026-10-02: 원정 전문 인증 remade; 투력 +30% at most */
 fresh24:{statBonus:.50,orderPriceMult:1.15},
 hub:{p1:.45,p2:.15,overheadRate:.10},
 warehouse:{slots:5}, /* v2.9.2 fourth pass (User 2026-09-26): +10 -> +5 */
 extraOrder:{extraOffers:2},
 rerollTicket:{freeRerolls:1},
 efficiency:{overheadCut:30},
 rumorBoard:{eventChance:1},
 postcard:{loyalty:5},
 rescueContract:{chance:.15}
};
/* The hub overhead rate used to be its own D.balance literal; it now reads through to the
   relic's parameter so there is one lever, under the old name as well. */
Object.defineProperty(D.balance,'hubOverheadRate',{get:()=>D.relicParams.hub.overheadRate,enumerable:true,configurable:true});
/* RELIC_v2.8 §D30 CANDIDATE ELIGIBILITY — DEFAULT INCLUDE / EXPLICIT EXCLUDE. The inherited
   positive final-useful allowlist is superseded, and it is gone rather than kept beside this:
   an allowlist silently drops every support nobody remembered to add, including every future
   one, which is the defect REL-Q-v28-18 names. D30 is now the ordinary eligible pool MINUS this
   set, so a support belongs here only when there is NO legal action or state between a D30
   acquisition and the Final Lock through which it could change anything - not merely when it
   looks weak that late. A future support joins D30 by existing; it leaves only by being added
   here after its own D30-to-Final review. */
D.relicD30NoEffect=['stamp','member','guarantee','fridge','board','firstVisitCoupon','groupOrder','memberBundle','premiumMember','returnPoints','supplyCert','dawnRecovery','royalCert','hub','efficiency','firstAidDesk','rumorBoard','postcard','rescueContract'];
/* RELIC §RETIRED (User 2026-10-04): no longer offered; kept so a save that owns it still reads and plays it */
D.relicRetired=['memberBundle'];
D.buildNames={rotation:'박리다매',vip:'단골 육성',premium:'고마진',expedition:'원정 전문',fresh:'신선식품',customer:'상권'};
/* ECONOMY_ORDER §NPC WALLET GLOBAL BASELINE raises the baseline from D1 so the default two
   purchase slots more often carry a real decision. 90 is the Stage 9 measurement baseline, not
   the settled figure. Level contribution, carry and per-NPC variation are unchanged, and no
   Day-based Wallet inflation was added - this one number is the whole lever. */
D.balance.relicPriceScale=1;
/* RELIC §CANDIDATE REROLL (User 2026-10-02): the first reroll of a window costs this; each further one doubles it */
D.balance.relicReroll={base:300};
/* CORE_RUN §DEATH LIMIT — SEGMENTED (v2.9.1 balance): the flat D.balance.deathLimit=10 baseline
   is retired - D.balance.deathLimitSegments (catalog.js) and Meta.deathLimit(run) are the only
   truth now. */
/* How many deficit Closings a Run may trade its way out of by clearing stock. Three, so the
   shelf is an emergency and not a deposit account: one rescue is one short Closing, and inside
   it the player keeps choosing what to give up until the till reaches zero. */
D.balance.rescueLimit=3;
D.traitExclusions=[['brave','coward'],['eater','small'],['careful','reckless'],['frugal','impulse'],['strong','frail'],['collector','thrifty'],['stamina','weary'],['social','shy'],['frail','mender'],['antitoxin','sensitive'],['nimble','clumsy'],['maintain','butterfingers'],['heatproof','pyrophobia'],['sharpeye','nearsight'],['aloof','coldhand'],['honest','liar']];
D.familyTiers={spider:[['poison'],['poison','bind'],['poison','bind']],slime:[['corrosion'],['corrosion','mire'],['corrosion','mire']],golem:[['fire'],['fire'],['fire']],crypt:[['fear'],['fear','dark'],['fear','dark']],snow:[['cold'],['cold','whiteout'],['cold','whiteout']]};
D.categories={food:'음식',drink:'음료',potion:'포션',gear:'야외장비',insurance:'보험',special:'특수'};
D.roles={stat:'능력 보강',supply:'보급',direct:'전문 대응',hybrid:'복합 대응',condition:'컨디션',insurance:'생환 보험',risk:'위험·보상',economy:'원정 수익',utility:'특수 운용'};
// Functional roles are declared per ITEM ACTIVE CATALOG, not inferred from effect shape.
D.itemRoles={rice:['supply'],water:['supply'],ramen:['supply','direct'],lunchbox:['supply','stat'],choco:['supply','stat'],yanggaeng:['supply','stat'],coffee:['supply','stat'],herbtea:['supply','stat'],lowpotion:['stat'],ice:['supply','direct'],soda:['supply','direct'],battery:['direct'],rope:['direct'],candy:['supply','direct'],dragonramen:['supply','stat','direct'],energy:['supply','stat'],wine:['supply','direct','risk'],kit:['insurance'],mask:['direct'],hood:['hybrid'],webgloves:['hybrid'],holylight:['hybrid'],cloak:['hybrid'],coating:['direct'],boots:['direct'],snowgoggles:['direct'],highpotion:['stat'],antidote:['direct'],stone:['insurance'],midpotion:['stat'],guildlunch:['supply','economy'],ion:['supply','direct'],worldcharm:['insurance'],coupon:['utility'],spiderkit:['hybrid'],slimesuit:['hybrid'],cryptlantern:['hybrid'],snowvisor:['hybrid'],magmagear:['hybrid','stat'],battlelunch:['supply','stat'],kingwater:['supply','stat'],hyperenergy:['supply','stat'],sageelixir:['supply','stat'],toppotion:['stat']};
/* The `fresh` category alias is retired with v2.7: Food is a category, not a flag. */
for(const it of D.items){it.roles=D.itemRoles[it.id]||[];}
})(globalThis);
