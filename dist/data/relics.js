(function(G){
const D=G.DATA;
/* What counts as a 고가상품 for 길드 보증 진열대. It was a bare 200 inside shop.js and the
   relic's own description never said it, so the player could not tell which sales it covered.
   Naming it lets the rule and the sentence read the same number - it belongs to this relic,
   not to D.balance: it is the existing threshold given a name, not a new tuning lever. */
const GUARANTEE_MIN_PRICE=200;
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],260,'같은 상품을 한 번에 3개 이상 발주하면 3번째부터 매입가 15% 할인.'],
['rotation','회전 진열대','foundation',['rotation'],240,'하루 6건 이상 판매하면 다음 날 첫 대량발주가 10% 저렴해진다.'],
['stamp','단골 스탬프 기계','foundation',['vip'],260,'유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.'],
['member','회원 관리대장','foundation',['vip'],260,'다음 날부터 이미 만난 손님의 방문 가중치 +40%.'],
['showcase','프리미엄 쇼케이스','foundation',['premium'],280,'희귀 이상 발주 가중치 +70%. 다음 날부터 운영비 +10G.'],
['guarantee','길드 보증 진열대','foundation',['premium'],280,'하루 한 번, 정가 '+GUARANTEE_MIN_PRICE+'G 이상 상품을 처음 팔 때 본사가 정가의 20%를 부담한다. 점주는 선택한 가격을 전액 받는다.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],260,'알려진 게이트 위험에 대응하는 상품의 발주 가중치 +80%.'],
['medicine','긴급보급 선반','foundation',['expedition'],260,'치료·야외장비·보험 상품 발주 가중치 +60%, 공급 수량 +1.'],
['fridge','대형 냉장고','foundation',['fresh'],260,'음식·음료 유통기한 +1일. 보유 중인 해당 재고도 획득 시 한 번 연장.'],
['kitchen','즉석식품 코너','foundation',['fresh'],280,'음식·음료의 보급·강인함 효과 +20%. 위험 대응과 부작용은 그대로.'],
['board','길드 전광판','foundation',['customer'],260,'다음 날부터 방문객 +1명. 활동 가능한 인원 내에서 방문.'],
['rookieBoard','신입 모집 게시판','foundation',['customer'],240,'다음 날부터 신규 손님 선택 가중치 +70%. 후반 신입도 현재 시기에 맞는 레벨로 합류.'],
['groupFlyer','공동구매 전단','hybrid',['rotation','customer'],400,'오늘 방문객 6명 이상이면 3개 이상 묶음발주 매입가 10% 할인.'],
['memberBundle','단골 묶음혜택','hybrid',['rotation','vip'],380,'재방문 손님의 그날 두 번째 유료 구매에 단골도 +2.'],
['premiumMember','프리미엄 멤버십','hybrid',['vip','premium'],420,'단골도 50 이상 손님의 희귀 상품 구매 의사 +10%p.'],
['returnPoints','귀환 적립제','hybrid',['vip','expedition'],400,'오늘 유료 구매한 재방문 손님이 단골도 30 이상으로 생환하면 단골도 +2, 소지금 +12G.'],
['expeditionMeal','원정 도시락 코너','hybrid',['fresh','expedition'],400,'음식·음료가 원래 가진 위험 대응 효과가 실제 목적지와 맞으면 해당 효과 +25%.'],
['coldcase','냉장 쇼케이스','hybrid',['fresh','premium'],420,'희귀 신선식품 발주 가중치 +80%, 유통기한 +1일.'],
['supplyCert','길드 납품 인증','hybrid',['premium','expedition'],440,'알려진 위험 대응 또는 보험 역할의 희귀 상품 판매 시 정가의 8%를 본사 수당으로 받는다.'],
['dawnBulk','새벽 공동배송','hybrid',['fresh','rotation'],380,'음식·음료를 같은 상품 3개 이상 묶음발주하면 매입가 15% 할인.'],
['logisticsHQ','물류 본부계약','keystone',['rotation'],720,'전날 8건 이상 판매하면 다음 날 첫 대량발주 매입가 25% 할인.'],
['lifetime','평생 단골제','keystone',['vip'],740,'단골도 60 이상 생환 고객에게 하루 한 번 소지금 +25G. 다음 방문 선택 가중치 +50%.'],
['royalCert','왕도 프리미엄 인증','keystone',['premium'],760,'희귀 이상 바가지 판매에 정가의 12% 본사 수당.'],
['expeditionCert','길드24 원정전문점 인증','keystone',['expedition'],700,'알려진 위험이 있으면 발주 후보에 해당 위험 대응 역할을 최소 1종 확보. 교환에도 유지.'],
['fresh24','24시간 신선체계','keystone',['fresh'],740,'음식·음료 유통기한 +2일, 보급·강인함 효과 +25%.'],
['hub','지역 거점점 계약','keystone',['customer'],700,'다음 날부터 방문객 +2명, 운영비 +35G. 활동 가능한 인원 내에서 방문.'],
['warehouse','후방 창고 증설','utility',[],360,'창고 용량 +10칸.'],
['terminal','본사 추가발주권','utility',[],380,'다음 발주 후보 생성부터 후보 +2개.'],
['delivery','발주 교환권','utility',[],340,'매일 첫 발주 교환 무료. 이후 30G부터 교환 비용이 두 배씩 증가.'],
['efficiency','운영 효율 매뉴얼','utility',[],320,'다음 날부터 기본 운영비 15G 절감.']
];
D.relics=rows.map(([id,name,kind,tags,price,description])=>({id,name,kind,tags,price,description,
 ...(id==='guarantee'?{minPrice:GUARANTEE_MIN_PRICE}:{}),finalUseful:['bulk','rotation','logisticsHQ','kitchen','expeditionMeal','dawnBulk','fresh24','delivery','warehouse'].includes(id)}));
D.relicBy=Object.fromEntries(D.relics.map(r=>[r.id,r]));D.facilities=D.relics;
D.buildNames={rotation:'박리다매',vip:'단골 육성',premium:'고마진',expedition:'원정 전문',fresh:'신선식품',customer:'상권'};
/* ECONOMY_ORDER §NPC WALLET GLOBAL BASELINE raises the baseline from D1 so the default two
   purchase slots more often carry a real decision. 90 is the Stage 9 measurement baseline, not
   the settled figure. Level contribution, carry and per-NPC variation are unchanged, and no
   Day-based Wallet inflation was added - this one number is the whole lever. */
D.balance.relicPriceScale=1;D.balance.walletBase=90;D.balance.walletLevel=18;D.balance.walletCarry=.28;
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
D.categories={food:'음식',drink:'음료',medicine:'의료',tool:'야외장비',insurance:'보험',magic:'특수'};
D.roles={stat:'능력 보강',supply:'보급',direct:'전문 대응',hybrid:'복합 대응',condition:'컨디션',insurance:'생환 보험',risk:'위험·보상',economy:'원정 수익',utility:'특수 운용'};
// Functional roles are declared per ITEM ACTIVE CATALOG, not inferred from effect shape.
D.itemRoles={rice:['supply'],water:['supply'],ramen:['supply','hybrid'],bar:['supply','stat'],choco:['supply','stat'],coffee:['supply','stat'],bandage:['insurance'],potion:['stat'],ice:['supply','direct'],battery:['direct'],rope:['direct','stat'],candy:['supply','stat','hybrid'],lava:['supply','stat','hybrid'],energy:['supply','stat'],wine:['supply','direct','risk'],kit:['insurance'],mask:['direct'],heat:['direct'],cloak:['hybrid'],coating:['direct'],boots:['direct'],snowgoggles:['direct'],highpotion:['stat'],antidote:['direct'],stone:['insurance'],mana:['stat'],premium:['supply','economy'],ion:['supply','hybrid'],tree:['insurance'],coupon:['utility']};
for(const it of D.items){it.fresh=it.category==='fresh';if(it.fresh)it.category='food';it.roles=D.itemRoles[it.id]||[];}
})(globalThis);
