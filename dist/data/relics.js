(function(G){
const D=G.DATA;
/* What counts as a 고가상품 for 길드 보증 진열대. It was a bare 200 inside shop.js and the
   relic's own description never said it, so the player could not tell which sales it covered.
   Naming it lets the rule and the sentence read the same number - it belongs to this relic,
   not to D.balance: it is the existing threshold given a name, not a new tuning lever. */
const GUARANTEE_MIN_PRICE=200;
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],260,'같은 상품 3개 이상 발주 시 3번째부터 매입가 -15%.'],
['rotation','회전 진열대','foundation',['rotation'],240,'전날 6건 이상 판매하면 다음 날 일반·고급 상품의 공급 수량 +1.'],
['stamp','단골 스탬프 기계','foundation',['vip'],260,'유료 구매로 오르는 단골도 +50% · 생환으로 오르는 단골도 제외.'],
['member','회원 관리대장','foundation',['vip'],260,'다음 날부터 이미 만난 손님의 재방문 가중치 +40%.'],
['showcase','희귀상품 입고 계약','foundation',['premium'],280,'희귀 이상 상품 발주 가중치 +70% · 다음 날부터 운영비 +10G.'],
['guarantee','길드 보증 진열대','foundation',['premium'],280,'하루 1회 · 정가 '+GUARANTEE_MIN_PRICE+'G 이상 상품 첫 판매 시 본사가 정가의 20%를 손님 대신 부담. 점주는 선택한 판매가 전액 수령.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],260,'현재 알려진 위험에 대응하는 상품이 발주 후보에 나올 가중치 +80%.'],
['medicine','긴급보급 선반','foundation',['expedition'],260,'포션·야외장비·보험 발주 가중치 +60% · 해당 상품 공급 수량 +1.'],
['fridge','대형 냉장고','foundation',['fresh'],200,'음식·음료 유통기한 +1일 · 처음 확보할 때 보유 중인 해당 재고도 1회 연장.'],
['kitchen','즉석식품 코너','foundation',['fresh'],280,'음식·음료가 원래 가진 능력치 증가 효과 +30% · 보급·위험 대응·부작용 제외.'],
['board','길드 전광판','foundation',['customer'],260,'기본 방문객이 3명인 날 4명으로 올린다.'],
['rookieBoard','신입 모집 게시판','foundation',['customer'],240,'신규 모험가가 생긴 날, 그 모험가가 오늘 방문객 중 1명으로 반드시 등장 · 총 방문객 수는 늘지 않음.'],
['groupFlyer','공동구매 전단','hybrid',['rotation','customer'],400,'오늘 방문객 6명 이상이면 같은 상품 3개 이상 발주 시 매입가 -10%.'],
['memberBundle','단골 묶음혜택','hybrid',['rotation','vip'],380,'재방문 손님의 오늘 두 번째 유료 구매에 단골도 +2.'],
['premiumMember','프리미엄 멤버십','hybrid',['vip','premium'],420,'단골도 50 이상 손님의 희귀 이상 상품 구매 의사 +10%p.'],
['returnPoints','귀환 적립제','hybrid',['vip','expedition'],400,'오늘 유료 구매한 재방문 손님이 단골도 30 이상으로 생환하면 단골도 +2 · 소지금 +30G.'],
['expeditionMeal','원정 도시락 코너','hybrid',['fresh','expedition'],400,'실제 목적지와 맞는 음식·음료의 위험 대응 +25% · 보급이 필요한 날, 보급을 주는 음식·음료의 원래 능력치 증가 효과 +20%.'],
['coldcase','냉장 유통 계약','hybrid',['fresh','premium'],420,'고급 이상 음식·음료 발주 가중치 +80% · 유통기한 +1일 · 처음 확보할 때 보유 중인 해당 재고도 1회 연장.'],
['supplyCert','길드 납품 인증','hybrid',['premium','expedition'],440,'현재 알려진 위험에 맞는 희귀 이상 상품 또는 희귀 이상 보험 판매 시 정가의 12% 본사 수당.'],
['dawnBulk','새벽 공동배송','hybrid',['fresh','rotation'],380,'같은 음식·음료 3개 이상 발주 시 매입가 -15%.'],
['logisticsHQ','물류 본부계약','keystone',['rotation'],720,'전날 7건 이상 판매하면 다음 날 첫 묶음발주 매입가 -25%.'],
['lifetime','평생 단골제','keystone',['vip'],740,'단골도 60 이상 손님이 생환하면 하루 1회 소지금 +50G · 다음 방문 가중치 +50%.'],
['royalCert','왕도 프리미엄 인증','keystone',['premium'],760,'희귀 이상 상품을 150%에 판매하면 정가의 20% 본사 수당.'],
['expeditionCert','길드24 원정전문점 인증','keystone',['expedition'],700,'알려진 위험 1종이면 대응 상품 후보 1칸 보장 · 2종 이상이면 서로 다른 위험 2종의 대응 상품을 2칸 보장 · 후보를 교환해도 유지.'],
['fresh24','24시간 신선체계','keystone',['fresh'],740,'음식·음료 유통기한 +2일 · 원래 가진 능력치 증가 효과 +50% · 보급·위험 대응·부작용 제외.'],
['hub','지역 거점점 계약','keystone',['customer'],700,'다음 날부터 방문객 +1명 45% · +2명 15% · 증가 없음 40% · 기본 운영비 +10%.'],
['warehouse','후방 창고 증설','utility',[],360,'창고 용량 +10칸.'],
['terminal','본사 추가발주권','utility',[],380,'다음 발주 후보 생성부터 발주 후보 +2개.'],
['delivery','발주 교환권','utility',[],340,'매일 첫 후보 전체 교환 무료 · 이후 100G → 200G → 400G… 순으로 증가.'],
['efficiency','운영 효율 매뉴얼','utility',[],260,'다음 날부터 기본 운영비 -30G.']
];
D.relics=rows.map(([id,name,kind,tags,price,description])=>({id,name,kind,tags,price,description,
 ...(id==='guarantee'?{minPrice:GUARANTEE_MIN_PRICE}:{}),finalUseful:['bulk','rotation','logisticsHQ','kitchen','expeditionMeal','dawnBulk','fresh24','delivery','warehouse'].includes(id)}));
D.relicBy=Object.fromEntries(D.relics.map(r=>[r.id,r]));D.facilities=D.relics;
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
