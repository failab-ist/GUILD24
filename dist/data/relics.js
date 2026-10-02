(function(G){
const D=G.DATA;
/* What counts as a 고가상품 for 길드 보증 진열대. It was a bare 200 inside shop.js and the
   relic's own description never said it, so the player could not tell which sales it covered.
   Naming it lets the rule and the sentence read the same number - it belongs to this relic,
   not to D.balance: it is the existing threshold given a name, not a new tuning lever. */
const GUARANTEE_MIN_PRICE=200;
/* COPY_AUDIT §11-1 … §11-30 exact (User 2026-09-25, v2.9.0): condition first, then the effect, two clauses at most */
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],130,'같은 상품을 3개 이상 발주하면 3번째부터 · 매입가 -20%.'],
['rotation','회전 진열대','foundation',['rotation'],80,'전날 4건 이상 팔았을 때 · 다음 날 모든 상품 공급 수량 +1.'],
['stamp','단골 스탬프 기계','foundation',['vip'],130,'유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도는 그대로.'],
['member','회원 관리대장','foundation',['vip'],130,'다음 날부터 · 이미 만난 손님의 재방문 가중치 +70%.'],
['rareContract','희귀상품 입고 계약','foundation',['premium'],140,'희귀 이상 상품 · 발주 가중치 +70% · 판매 시 판매가의 10% 추가 지급.'],
['guarantee','길드 보증 진열대','foundation',['premium'],140,'하루 첫 '+GUARANTEE_MIN_PRICE+'G 이상 판매 1건 · 손님은 판매가의 70%만 내고 점주는 전액 받는다.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],60,'오늘 위험에 대응하는 상품의 발주 후보 가중치 +50%.'],
['fieldRepair','야전 정비대','foundation',['expedition'],80,'판매한 상품의 위험 대응 수치 +40%.'],
['fridge','대형 냉장고','foundation',['fresh'],60,'음식·음료 유통기한 +2일 (보유 재고도 1회 연장).'],
['kitchen','즉석식품 코너','foundation',['fresh'],170,'음식·음료의 능력치 효과 +25% (피로 회복·위험 대응은 그대로) · 기본 운영비 +10%.'],
['board','길드 전광판','foundation',['customer'],110,'하루 기본 최소 방문객 4명 (기존 3명).'],
['firstVisitCoupon','첫 방문 쿠폰','foundation',['customer'],110,'처음 온 손님 · 소지금 +30G · 구매 의사 +20%p.'],
['groupOrder','단체 주문 창구','hybrid',['rotation','customer'],200,'매일 아침 20% 확률로 방문객 +1명 · 하루 5번째 판매부터 판매마다 +15G.'],
['memberBundle','단골 묶음혜택','hybrid',['rotation','vip'],190,'단골의 오늘 두 번째 상품 · 손님은 반값만 내고 점주는 전액 받는다.'],
['premiumMember','프리미엄 멤버십','hybrid',['vip','premium'],200,'단골 방문 시 · 소지금 +40G · 희귀 이상 상품 구매 의사 +15%p.'],
['returnPoints','귀환 적립제','hybrid',['vip','expedition'],240,'오늘 유료 구매한 재방문 손님이 생환했을 때 · 단골도 +5 · 소지금 +20G.'],
['expeditionMeal','원정 도시락 코너','hybrid',['fresh','expedition'],200,'음식 1개당 피로 회복 +2 · 음료 1개당 +1 · 갈 게이트의 모든 위험 대응 +2 (마왕성은 가장 취약한 위험 하나) · 음식·음료 매입가 +5G.'],
['coldcase','냉장 유통 계약','hybrid',['fresh','premium'],180,'고급 이상 음식·음료 · 발주 가중치 +80% · 구매 의사 +16%p · 유통기한 +1일 (보유 재고도 1회 연장).'],
['supplyCert','길드 납품 인증','hybrid',['premium','expedition'],220,'오늘 위험에 대응하는 희귀 이상 상품·보험을 팔았을 때 · 정가의 20% 추가 지급 · 그 손님 소지금 +30G.'],
['dawnRecovery','새벽 회수 계약','hybrid',['fresh','rotation'],190,'유통기한이 끝난 음식·음료 · 폐기 대신 매입가의 50% 회수 · 매일 첫 발주 후보에 음식이나 음료 1칸 추가.'],
['logisticsHQ','물류 본부계약','keystone',['rotation'],300,'전날 판매 1건당 · 오늘 모든 발주 매입가 -3% (최대 -30%).'],
['lifetime','평생 단골제','keystone',['vip'],310,'단골 생환 시 · 소지금 +50G · 다음 방문 가중치 +100%.'],
['royalCert','왕도 프리미엄 인증','keystone',['premium'],320,'바가지(150%) 판매 시 · 판매가의 45% 추가 지급 · 바가지 구매 의사 +10%p · 기본 운영비 +10%.'],
['opsRoom','원정 작전실','keystone',['expedition'],290,'위험 대응이 필요 수치를 넘긴 만큼 투력 +, 최대 +30%.'],
['fresh24','24시간 신선체계','keystone',['fresh'],360,'음식·음료의 능력치 효과 +50% (피로 회복·위험 대응은 그대로) · 음식·음료 매입가 +15%.'],
['hub','지역 거점점 계약','keystone',['customer'],340,'다음 날부터 · 방문객 +1명 45% · +2명 15% · 그대로 40% · 기본 운영비 +10%.'],
['warehouse','후방 창고 증설','utility',[],130,'창고 용량 +5칸.'],
['extraOrder','본사 추가발주권','utility',[],130,'다음 후보 생성부터 · 발주 후보 +2개.'],
['rerollTicket','발주 교환권','utility',[],120,'매일 첫 후보 교환 무료 · 이후 50G → 100G → 200G… 순으로 증가.'],
['efficiency','운영 효율 매뉴얼','utility',[],130,'다음 날부터 · 기본 운영비 -30G.'],
/* RELIC 31 / 32 (User 2026-09-28, v2.9.11): two Expedition supports that ease an injury - COPY_AUDIT §11-30b / §11-30c */
['fieldStretcher','야전 들것','foundation',['expedition'],80,'부상 모험가 · 투력 페널티 -15% → -8%.'],
['firstAidDesk','응급 처치대','keystone',['expedition'],300,'부상 모험가가 방문하면 · 20% 확률로 부상 회복.']
];
D.relics=rows.map(([id,name,kind,tags,price,description])=>({id,name,kind,tags,price,description,
 ...(id==='guarantee'?{minPrice:GUARANTEE_MIN_PRICE}:{})}));
D.relicBy=Object.fromEntries(D.relics.map(r=>[r.id,r]));D.facilities=D.relics;
/* Effect STRENGTH of every support, read by its use sites. The trigger conditions (3+ of one
   SKU, 6+ visitors, loyalty thresholds, rarity gates, previous-day sales) stay at the use site;
   only how strong the effect is lives here. Descriptions above are still literal copy - a
   change here does not rewrite them. */
D.relicParams={
 bulk:{discount:.20},
 rotation:{supplyBonus:1},
 stamp:{loyaltyMult:1.75},
 member:{revisitMult:1.7},
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
 premiumMember:{rareIntentBonus:.15,arrivalGold:40},
 returnPoints:{loyaltyBonus:5,goldBonus:20}, /* User 2026-10-02: was 25G */
 expeditionMeal:{supplyPerItem:2,drinkSupplyPerItem:1,hazardDefense:2,orderPriceAdd:5}, /* User 2026-10-02: a flat Food/Drink order price +5G */
 coldcase:{weightMult:1.8,shelfDays:1,intentBonus:.16},
 supplyCert:{commissionRate:.20,goldBonus:30},
 dawnRecovery:{refundRate:.5,extraOffers:1},
 logisticsHQ:{perSale:.03,maxDiscount:.30}, /* v2.9.11 remake (User 2026-09-29): was same-SKU 3+ -25% after 6 sales */
 lifetime:{goldBonus:50,revisitMult:2.0}, /* v2.9.11 (User 2026-09-29): was 1.5 */
 royalCert:{commissionRate:.45,intentBonus:.10,overheadRate:.10},
 opsRoom:{overshootCap:.5,mult:.6,final:true}, /* User 2026-10-02: 원정 전문 인증 remade; 투력 +30% at most */
 fresh24:{statBonus:.50,orderPriceMult:1.15},
 hub:{p1:.45,p2:.15,overheadRate:.10},
 warehouse:{slots:5}, /* v2.9.2 fourth pass (User 2026-09-26): +10 -> +5 */
 extraOrder:{extraOffers:2},
 rerollTicket:{freeRerolls:1},
 efficiency:{overheadCut:30}
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
D.relicD30NoEffect=['stamp','member','guarantee','fridge','board','firstVisitCoupon','groupOrder','memberBundle','premiumMember','returnPoints','supplyCert','dawnRecovery','lifetime','royalCert','hub','efficiency','firstAidDesk'];
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
