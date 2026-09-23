(function(G){
const D=G.DATA;
/* What counts as a 고가상품 for 길드 보증 진열대. It was a bare 200 inside shop.js and the
   relic's own description never said it, so the player could not tell which sales it covered.
   Naming it lets the rule and the sentence read the same number - it belongs to this relic,
   not to D.balance: it is the existing threshold given a name, not a new tuning lever. */
const GUARANTEE_MIN_PRICE=200;
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],180,'같은 상품 3개 이상 발주 시 3번째부터 매입가 -20%.'],
['rotation','회전 진열대','foundation',['rotation'],120,'전날 4건 이상 판매 시 다음 날 모든 상품 공급 수량 +2.'],
['stamp','단골 스탬프 기계','foundation',['vip'],180,'유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도 제외.'],
['member','회원 관리대장','foundation',['vip'],180,'다음 날부터 이미 만난 손님의 재방문 가중치 +70%.'],
['showcase','희귀상품 입고 계약','foundation',['premium'],200,'희귀 이상 상품 발주 가중치 +70%.'],
['guarantee','길드 보증 진열대','foundation',['premium'],200,'하루 1회 · '+GUARANTEE_MIN_PRICE+'G 이상에 판 첫 상품 판매가의 20%를 본사가 손님 대신 부담 · 점주는 판매가 전액 수령.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],120,'오늘 게이트의 위험에 대응하는 상품의 발주 후보 가중치 +50%.'],
['medicine','야전 정비대','foundation',['expedition'],150,'판매한 야외장비의 위험 대응 수치 +40%.'],
['fridge','대형 냉장고','foundation',['fresh'],120,'음식·음료 유통기한 +2일 · 확보 시 보유 중인 해당 재고도 1회 연장.'],
['kitchen','즉석식품 코너','foundation',['fresh'],240,'음식·음료가 원래 가진 능력치 증가 효과 +25% · 보급·위험 대응·부작용 제외 · 다음 날부터 기본 운영비 +10%.'],
['board','길드 전광판','foundation',['customer'],150,'하루 기본 최소 방문객을 4명으로 변경 (기존 3명).'],
['rookieBoard','첫 방문 쿠폰','foundation',['customer'],150,'처음 방문한 손님의 소지금 +30G 추가 · 구매 의사 +20%p.'],
['groupFlyer','단체 주문 창구','hybrid',['rotation','customer'],280,'매일 아침 20% 확률로 방문객 +1명 · 하루 5번째 판매부터 판매마다 +15G 추가 지급.'],
['memberBundle','단골 묶음혜택','hybrid',['rotation','vip'],270,'단골 손님마다 오늘 두 번째로 사는 상품은 손님이 판매가의 절반만 지불 · 나머지 절반은 본사가 채워 점주는 판매가 전액 수령.'],
['premiumMember','프리미엄 멤버십','hybrid',['vip','premium'],290,'단골 손님 방문 시 소지금 +25G · 희귀 이상 상품 구매 의사 +15%p.'],
['returnPoints','귀환 적립제','hybrid',['vip','expedition'],340,'오늘 유료 구매한 재방문 손님 생환 시 단골도 +5 · 소지금 +30G.'],
['expeditionMeal','원정 도시락 코너','hybrid',['fresh','expedition'],280,'음식·음료 1개당 보급 +2 · 갈 게이트의 모든 위험 대응 +4.'],
['coldcase','냉장 유통 계약','hybrid',['fresh','premium'],250,'고급 이상 음식·음료 발주 가중치 +80% · 구매 의사 +16%p · 유통기한 +1일 · 확보 시 보유 중인 해당 재고도 1회 연장.'],
['supplyCert','길드 납품 인증','hybrid',['premium','expedition'],310,'오늘 게이트의 위험에 대응하는 희귀 이상 상품 또는 희귀 이상 보험 판매 시 정가의 20% 추가 지급 · 그 손님 소지금 +30G.'],
['dawnBulk','새벽 회수 계약','hybrid',['fresh','rotation'],270,'유통기한이 끝난 음식·음료는 폐기 대신 매입가의 50% 회수 · 매일 첫 발주 후보에 음식 또는 음료 1칸 추가.'],
['logisticsHQ','물류 본부계약','keystone',['rotation'],430,'전날 6건 이상 판매 시 오늘 같은 상품 3개 이상 발주 매입가 -30%.'],
['lifetime','평생 단골제','keystone',['vip'],440,'단골 손님 생환 시 하루 1회 소지금 +50G · 다음 방문 가중치 +50%.'],
['royalCert','왕도 프리미엄 인증','keystone',['premium'],460,'150% 가격 판매 시 판매가의 20% 추가 지급 · 150% 가격 구매 의사 +16%p.'],
['expeditionCert','원정 전문 인증','keystone',['expedition'],420,'위험 대응 상품의 위험 대응 수치 +60% · 그 상품을 산 손님 다음 방문 시 소지금 +50G.'],
['fresh24','24시간 신선체계','keystone',['fresh'],520,'음식·음료가 원래 가진 능력치 증가 효과 +50% · 보급·위험 대응·부작용 제외 · 음식·음료 매입가 +25%.'],
['hub','지역 거점점 계약','keystone',['customer'],490,'다음 날부터 방문객 +1명 45% · +2명 15% · 증가 없음 40% · 기본 운영비 +10%.'],
['warehouse','후방 창고 증설','utility',[],180,'창고 용량 +10칸.'],
['terminal','본사 추가발주권','utility',[],190,'다음 발주 후보 생성부터 발주 후보 +2개.'],
['delivery','발주 교환권','utility',[],170,'매일 첫 후보 전체 교환 무료 · 이후 50G → 100G → 200G… 순으로 증가.'],
['efficiency','운영 효율 매뉴얼','utility',[],180,'다음 날부터 기본 운영비 -30G.']
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
 rotation:{supplyBonus:2},
 stamp:{loyaltyMult:1.75},
 member:{revisitMult:1.7},
 showcase:{rareWeightMult:1.7},
 guarantee:{subsidyRate:.2},
 hazardBoard:{weightMult:1.5},
 medicine:{counterMult:1.4},
 fridge:{shelfDays:2},
 kitchen:{statBonus:.25,overheadRate:.10},
 board:{minVisitors:4},
 rookieBoard:{arrivalGold:30,intentBonus:.20},
 groupFlyer:{visitorChance:.20,commissionFrom:5,commission:15},
 memberBundle:{payShare:.5},
 premiumMember:{rareIntentBonus:.15,arrivalGold:25},
 returnPoints:{loyaltyBonus:5,goldBonus:30},
 expeditionMeal:{supplyPerItem:2,hazardDefense:4},
 coldcase:{weightMult:1.8,shelfDays:1,intentBonus:.16},
 supplyCert:{commissionRate:.20,goldBonus:30},
 dawnBulk:{refundRate:.5,extraOffers:1},
 logisticsHQ:{discount:.30},
 lifetime:{goldBonus:50,revisitMult:1.5},
 royalCert:{commissionRate:.20},
 expeditionCert:{counterMult:1.6,nextVisitGold:50},
 fresh24:{statBonus:.50,orderPriceMult:1.25},
 hub:{p1:.45,p2:.15,overheadRate:.10},
 warehouse:{slots:10},
 terminal:{extraOffers:2},
 delivery:{freeRerolls:1},
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
D.relicD30NoEffect=['stamp','member','guarantee','fridge','board','rookieBoard','groupFlyer','memberBundle','premiumMember','returnPoints','supplyCert','lifetime','royalCert','hub','efficiency'];
D.buildNames={rotation:'박리다매',vip:'단골 육성',premium:'고마진',expedition:'원정 전문',fresh:'신선식품',customer:'상권'};
/* ECONOMY_ORDER §NPC WALLET GLOBAL BASELINE raises the baseline from D1 so the default two
   purchase slots more often carry a real decision. 90 is the Stage 9 measurement baseline, not
   the settled figure. Level contribution, carry and per-NPC variation are unchanged, and no
   Day-based Wallet inflation was added - this one number is the whole lever. */
D.balance.relicPriceScale=1;
/* How many adventurers can fail to come back before a store is finished. Stage 9 measurement
   baseline, not a settled number: the rate, the Day it lands on and how it differs between
   bare and prepared play are measured before anyone moves it. */
D.balance.deathLimit=10;
/* How many deficit Closings a Run may trade its way out of by clearing stock. Three, so the
   shelf is an emergency and not a deposit account: one rescue is one short Closing, and inside
   it the player keeps choosing what to give up until the till reaches zero. */
D.balance.rescueLimit=3;
D.traitExclusions=[['brave','coward'],['eater','small'],['careful','reckless'],['frugal','impulse'],['strong','frail'],['collector','thrifty'],['stamina','weary'],['social','shy'],['frail','mender'],['antitoxin','sensitive'],['nimble','clumsy'],['maintain','butterfingers'],['heatproof','pyrophobia'],['sharpeye','nearsight'],['aloof','coldhand'],['honest','liar']];
D.familyTiers={spider:[['poison'],['poison','bind'],['poison','bind']],slime:[['corrosion'],['corrosion','mire'],['corrosion','mire']],fire:[['fire'],['fire'],['fire']],crypt:[['fear'],['fear','dark'],['fear','dark']],snow:[['cold'],['cold','whiteout'],['cold','whiteout']]};
D.categories={food:'음식',drink:'음료',potion:'포션',gear:'야외장비',insurance:'보험',special:'특수'};
D.roles={stat:'능력 보강',supply:'보급',direct:'전문 대응',hybrid:'복합 대응',condition:'컨디션',insurance:'생환 보험',risk:'위험·보상',economy:'원정 수익',utility:'특수 운용'};
// Functional roles are declared per ITEM ACTIVE CATALOG, not inferred from effect shape.
D.itemRoles={rice:['supply'],water:['supply'],ramen:['supply','direct'],bar:['supply','stat'],choco:['supply','stat'],coffee:['supply','stat'],herbtea:['supply','stat'],potion:['stat'],ice:['supply','direct'],battery:['direct'],rope:['direct'],candy:['supply','direct'],lava:['supply','stat','hybrid'],energy:['supply','stat'],wine:['supply','direct','risk'],kit:['insurance'],mask:['direct'],heat:['direct'],cloak:['hybrid'],coating:['direct'],boots:['direct'],snowgoggles:['direct'],highpotion:['stat'],antidote:['direct'],stone:['insurance'],midpotion:['stat'],premium:['supply','economy'],ion:['supply','direct'],tree:['insurance'],coupon:['utility'],spiderkit:['hybrid'],slimesuit:['hybrid'],cryptlantern:['hybrid'],snowvisor:['hybrid'],magmagear:['hybrid','stat'],battlelunch:['supply','stat'],herobar:['supply','stat'],hyperenergy:['supply','stat'],sageelixir:['supply','stat'],toppotion:['stat']};
/* The `fresh` category alias is retired with v2.7: Food is a category, not a flag. */
for(const it of D.items){it.roles=D.itemRoles[it.id]||[];}
})(globalThis);
