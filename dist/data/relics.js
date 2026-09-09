(function(G){
const D=G.DATA;
const rows=[
['bulk','묶음발주 계약','foundation',['rotation'],260,'같은 상품을 한 번에 3개 이상 발주하면 3번째부터 매입가 15% 할인.'],
['rotation','회전 진열대','foundation',['rotation'],240,'하루 6건 이상 판매하면 다음 날 첫 대량발주가 10% 저렴해진다.'],
['stamp','단골 스탬프 기계','foundation',['vip'],260,'유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.'],
['member','회원 관리대장','foundation',['vip'],260,'다음 날부터 이미 만난 손님의 방문 가중치 +40%.'],
['showcase','프리미엄 쇼케이스','foundation',['premium'],280,'희귀 이상 발주 가중치 +70%. 다음 날부터 운영비 +10G.'],
['guarantee','길드 보증 진열대','foundation',['premium'],280,'하루 첫 고가상품 판매 1건에 본사가 정가의 20%를 부담. 점주는 선택 가격 전액 수령.'],
['hazardBoard','원정 위험 게시판','foundation',['expedition'],260,'알려진 게이트 위험에 대응하는 상품의 발주 가중치 +80%.'],
['medicine','긴급보급 선반','foundation',['expedition'],260,'치료·야외장비·보험 상품 발주 가중치 +60%, 공급 수량 +1.'],
['fridge','대형 냉장고','foundation',['fresh'],260,'음식·음료 유통기한 +1일. 보유 중인 해당 재고도 획득 시 한 번 연장.'],
['kitchen','즉석식품 코너','foundation',['fresh'],280,'음식·음료의 포만감·보급·강인함 효과 +20%. 저항과 부작용은 그대로.'],
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
['fresh24','24시간 신선체계','keystone',['fresh'],740,'음식·음료 유통기한 +2일, 포만감·보급·강인함 효과 +25%.'],
['hub','지역 거점점 계약','keystone',['customer'],700,'다음 날부터 방문객 +2명, 운영비 +35G. 활동 가능한 인원 내에서 방문.'],
['warehouse','후방 창고 증설','utility',[],360,'창고 용량 +10칸.'],
['terminal','본사 추가발주권','utility',[],380,'다음 발주 후보 생성부터 후보 +2개.'],
['delivery','발주 교환권','utility',[],340,'매일 첫 발주 교환 무료. 이후 30G부터 교환 비용이 두 배씩 증가.'],
['efficiency','운영 효율 매뉴얼','utility',[],320,'다음 날부터 기본 운영비 15G 절감.']
];
D.relics=rows.map(([id,name,kind,tags,price,description])=>({id,name,kind,tags,price,description,finalUseful:['bulk','rotation','logisticsHQ','kitchen','expeditionMeal','dawnBulk','fresh24','delivery','warehouse'].includes(id)}));
D.relicBy=Object.fromEntries(D.relics.map(r=>[r.id,r]));D.facilities=D.relics;
D.buildNames={rotation:'박리다매',vip:'단골 육성',premium:'고마진',expedition:'원정 전문',fresh:'신선식품',customer:'상권'};
D.balance.relicPriceScale=1;D.balance.walletBase=70;D.balance.walletLevel=18;D.balance.walletCarry=.28;
D.traitExclusions=[['brave','coward'],['eater','small'],['careful','reckless'],['frugal','impulse'],['strong','frail'],['lucky','unlucky']];
D.familyTiers={spider:[['poison'],['poison','bind'],['poison','bind']],slime:[['corrosion'],['corrosion','slow'],['corrosion','slow']],fire:[['fire'],['fire'],['fire']],crypt:[['fear'],['fear','dark'],['fear','dark']],snow:[['cold'],['cold','whiteout'],['cold','whiteout']]};
// Coverage gaps: existing goods retain IDs and prices; useful across professions.
D.itemBy.battery.effects.spirit=3;
const item=(id,name,buy,sell,category,effects,description)=>({id,name,rarity:0,buy,sell,category,days:category==='food'?5:0,icon:category==='food'?'choco':'battery',brand:'귀환안심',effects,description});
D.items.push(item('rope','경량 로프',50,105,'tool',{mobility:4,bind:12},'매듭을 풀고 감았다. 다시 묶어야 한다.'),item('candy','집중 사탕',35,75,'food',{spirit:7,fear:5,food:1},'시험 전에도 잘 팔린다.'));
D.items.push(item('boots','진창 장화',65,135,'tool',{slow:22,mobility:3},'밑창에 진흙이 잘 붙지 않는다.'),item('compass','방풍 나침반',60,125,'tool',{whiteout:22},'바늘을 가리지 말 것.'),item('goggles','탐사 고글',75,155,'tool',{dark:10,whiteout:10,bind:6},'시야가 좁아도 길은 남아 있다.'));
D.categories={food:'음식',drink:'음료',medicine:'의료',tool:'야외장비',insurance:'보험',magic:'특수'};
D.roles={stat:'능력 보강',direct:'전문 대응',hybrid:'복합 대응',condition:'컨디션',insurance:'생환 보험',risk:'위험·보상',economy:'원정 수익'};
for(const it of D.items){it.fresh=it.category==='fresh';if(it.fresh)it.category='food';const e=it.effects,counters=Object.keys(e).filter(k=>k in D.hazards&&k!=='supply'&&e[k]>0);it.roles=it.id==='coupon'?['economy']:it.id==='dragon'?['risk']:['ramen','lava','candy'].includes(it.id)?['hybrid']:e.escape||e.revive||e.injuryGuard?['insurance']:counters.length>1?['hybrid']:counters.length===1?['direct']:e.fatigue?['condition']:['stat'];if(e.injuryRisk||e.thirst)it.roles.push('risk');if(e.loot)it.roles.push('economy');}
const positive=['eater','impulse','genius','strong','potionbody','drinker','lucky'],negative=['frugal','pyrophobia'];
for(const t of D.traits)t.direction=positive.includes(t.id)?'positive':negative.includes(t.id)?'negative':'mixed';
D.traitDirections={positive:'▲ 이점',mixed:'◆ 양면',negative:'▼ 약점'};
D.itemBy=Object.fromEntries(D.items.map(i=>[i.id,i]));
})(globalThis);
