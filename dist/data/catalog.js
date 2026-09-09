/* Content definitions. New items use the same declarative effect vocabulary. */
(function(G){
const item=(id,name,rarity,buy,sell,category,days,icon,brand,description,effects,unlock=null)=>({id,name,rarity,buy,sell,category,days,icon,brand,description,effects,unlock});
G.DATA={brand:{name:'GUILD24',korean:'길드24',company:'길드리테일',slogan:'던전 가기 전, 길드24.',branches:['제7게이트점','독거미점','북부게이트점','왕도외곽점']},
rarities:['일반','고급','희귀','영웅','전설'], npcRarities:['평범','유망','희귀','영웅','전설'],
items:[
item('rice','삼각김밥',0,35,70,'fresh',2,'rice','용사픽','김 끝을 잡고 천천히.',{survival:3,supply:5}),
item('water','생수',0,25,55,'drink',5,'water','용사픽','뚜껑까지 챙겨 돌아오세요.',{survival:2,supply:3}),
item('ramen','컵라면',0,45,90,'food',4,'ramen','원정한끼','뜨거운 국물과 약간의 냉기 저항.',{survival:3,cold:8,supply:5}),
item('bar','핫바',0,40,80,'fresh',2,'bar','용사픽','꼬치는 매장 앞 수거함에.',{combat:4,survival:5,supply:4}),
item('choco','초코바',0,30,65,'food',5,'choco','용사픽','주머니에서 녹기 전에 드세요.',{mobility:6,supply:2}),
item('coffee','캔커피',0,35,75,'drink',5,'coffee','MANA+','발걸음이 조금 가벼워진다.',{mobility:7,supply:2}),
item('bandage','붕대',0,50,100,'medicine',7,'bandage','귀환안심','부상을 한 단계 완화할 기회가 생긴다.',{survival:3,injuryGuard:0.35}),
item('potion','하급 포션',0,70,140,'medicine',7,'potion','귀환안심','차갑게 보관하지 않아도 됩니다.',{survival:12,potion:1}),
item('ice','얼음컵',0,25,60,'drink',4,'ice','용사픽','화염 대응. 가장 싸고 확실한 한 컵.',{fire:17,supply:2}),
item('battery','랜턴 건전지',0,40,85,'tool',0,'battery','귀환안심','어둠 속 시야를 확보한다.',{dark:17,spirit:3}),
item('rope','경량 로프',0,50,105,'tool',0,'battery','귀환안심','매듭을 풀고 감았다. 다시 묶어야 한다.',{mobility:4,bind:12}),
item('candy','집중 사탕',0,35,75,'food',5,'choco','용사픽','시험 전에도 잘 팔린다.',{spirit:7,fear:5,supply:1}),
item('lava','불룡볶음면',1,65,135,'food',4,'ramen','원정한끼','용 그림은 장식이 아니다.',{combat:8,cold:12,supply:5},'cold5'),
item('energy','에너지드링크',1,70,150,'drink',5,'energy','MANA+','오늘 쓸 기운을 당겨왔다.',{mobility:13,supply:3}),
item('wine','용사의 곡주',1,60,130,'drink',5,'wine','원정한끼','공포를 잊게 한다. 발걸음은 살짝 꼬인다.',{fear:24,mobility:-5,supply:3},'fear5'),
item('kit','구급키트',1,120,240,'medicine',7,'kit','귀환안심','중상 위험을 줄여주는 원정 보험.',{survival:10,injuryGuard:0.65}),
item('mask','방진마스크',1,90,180,'tool',0,'mask','귀환안심','독과 가스 환경에 대응한다.',{poison:20}),
item('heat','핫팩',1,55,120,'tool',0,'heat','귀환안심','주머니 안에서 겨울을 버틴다.',{cold:22}),
item('cloak','방수망토',1,75,160,'tool',0,'cloak','귀환안심','부식과 진창에 두루 쓴다. 어느 쪽도 전문가만은 못하다.',{corrosion:14,mire:14}),
item('coating','부식 방지 코팅제',1,70,150,'tool',0,'cloak','귀환안심','장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.',{corrosion:22}),
item('boots','진창용 원정 장화',1,65,135,'tool',0,'battery','귀환안심','밑창에 진흙이 잘 붙지 않는다.',{mire:22,mobility:3}),
item('snowgoggles','설원 고글',1,60,125,'tool',0,'battery','귀환안심','눈보라 속에서도 앞이 남는다.',{whiteout:22}),
item('highpotion','상급 포션',2,150,300,'medicine',7,'potion','길드초이스','작은 병에 진하게 담았다.',{survival:27,potion:1}),
item('antidote','농축 해독제',2,220,450,'medicine',7,'antidote','귀환안심','독 대응을 크게 높인다.',{poison:42,survival:5,curePoison:1},'poison10'),
item('stone','귀환석',2,260,520,'insurance',0,'stone','귀환안심','탈출 보정. 사망·중상 위기에서도 같은 수치의 추가 귀환 기회 1회.',{escape:0.5}),
item('mana','마석 보조배터리',2,240,500,'magic',0,'mana','MANA+','잡념까지 충전하지는 않는다.',{combat:4,spirit:25}),
item('premium','길드 프리미엄 도시락',2,280,560,'fresh',2,'lunch','길드초이스','뚜껑이 잘 안 닫힌다.',{survival:14,supply:7,loot:0.2}),
item('ion','쿨링 이온음료',2,200,400,'drink',5,'water','MANA+','얼음컵만큼 시원하진 않지만 오래 간다.',{fire:12,supply:4}),
item('tree','세계수 생환부적',3,600,1200,'insurance',0,'stone','길드초이스','사망 판정을 한 번 중상으로 바꾼다.',{revive:1},'level15'),
item('coupon','황금 1+1 쿠폰',4,1000,2000,'magic',0,'coupon','길드초이스','먼저 제공하면 다음 소모품의 효과를 복제한다. 슬롯 1칸.',{duplicate:1},'boss1')
],
jobs:[
{id:'warrior',name:'전사',color:'#db8857',stats:[16,17,9,10],growth:[3.2,3,1.4,1.6],ranks:['수습 전사','전사','기사','왕립 수호자']},
{id:'archer',name:'궁수',color:'#77ac79',stats:[14,11,18,10],growth:[2.7,1.9,3.1,1.5],ranks:['견습 궁수','궁수','명사수','바람 추적자']},
{id:'mage',name:'마법사',color:'#a494dc',stats:[19,8,10,16],growth:[3.9,1.4,1.6,2.6],ranks:['견습 마법사','마법사','마도사','대마법사 후보']},
{id:'priest',name:'사제',color:'#e4ca8b',stats:[10,16,9,21],growth:[2,2.9,1.4,3.6],ranks:['수습 사제','사제','주교','빛의 대행자']},
{id:'rogue',name:'도적',color:'#79b6b5',stats:[15,10,22,9],growth:[2.8,1.8,3.7,1.4],ranks:['풋내기 도적','도적','그림자','밤의 유령'],unlock:'escape10'},
{id:'berserker',name:'광전사',color:'#db6464',stats:[21,13,12,7],growth:[4,2.4,1.9,1.3],ranks:['투사','광전사','혈전사','전장의 재앙'],unlock:'wounded5'}
],
traits:[
['brave','용감함','공포 저항 증가, 퇴각이 늦음',{fear:9,escape:-0.06}],['coward','겁쟁이','잘 도망치지만 전투·보상 감소',{combat:-3,escape:0.19,loot:-0.12}],['eater','대식가','음식의 포만감·보급·강인함 +40%',{foodMult:1.4}],['small','소식가','음식 효용 감소, 보급 +5',{foodMult:0.7,supply:5}],['careful','신중함','상품 강인함 효과 증가, 전리품 감소',{defenseMult:1.25,loot:-0.08}],['reckless','무모함','전투 증가, 위험한 퇴각 판단',{combat:7,escape:-0.08,injuryRisk:0.035}],['greed','탐욕','전리품 증가, 퇴각 지연',{loot:0.3,escape:-0.07}],['frugal','구두쇠','120G 초과 상품 구매 의사 −16%p',{priceBias:-0.16}],['impulse','충동구매','추가 상품 구매에 적극적',{buyBias:0.12}],['showoff','허세','목적지를 과장해서 말할 수 있음 · 실제 목적지는 바뀌지 않음',{}],['genius','천재','경험치 획득 +25%',{xpMult:1.25}],['strong','강골','중상 확률 감소',{injuryGuard:0.23}],['frail','허약함','강인함 감소, 상품 강인함 효과 증가',{survival:-5,healMult:1.35}],['potionbody','포션체질','포션 효과 +40%',{potionMult:1.4}],['caffeine','카페인중독','카페인 기동 효과 +40% · 원정 후 피로 -3',{caffeineMult:1.4,fatigue:-3}],['drinker','술고래','곡주 저항 효과 증가, 기동 페널티 완화',{alcoholMult:1.45}],['pyrophobia','화염공포증','화염 저항 −9',{fire:-9}],['undead','언데드혐오','언데드 전투 증가, 공포 취약',{undead:10,fear:-5}],['lucky','행운아','작은 판정·전리품 보너스',{luck:0.045,loot:0.07}],['unlucky','불운아','결과 변동폭 증가, 극희귀 전리품 기회',{variance:0.1,rareLoot:0.025}]
].map(([id,name,description,effects])=>({id,name,description,effects})),
dungeons:[
{id:'spider',name:'독거미 동굴',short:'독거미 동굴',base:2,icon:'🕷',color:'#a4b980',hazards:['poison','bind'],monster:'독거미 여왕',weakness:'화염',reward:1},
{id:'fire',name:'화염 골렘 광산',short:'골렘 광산',base:3,icon:'◆',color:'#ea9561',hazards:['fire'],monster:'화염 골렘',weakness:'강한 전투력',reward:1.15},
{id:'crypt',name:'망자역 지하묘지',short:'망자역',base:3,icon:'☾',color:'#b3a1d0',hazards:['fear','dark'],tags:['undead'],monster:'망자역 차장',weakness:'정신과 시야 확보',reward:1.1},
{id:'snow',name:'북부 설원 폐허',short:'설원 폐허',base:4,icon:'❄',color:'#a0d5e0',hazards:['cold','whiteout'],monster:'서리 거인',weakness:'강인함과 정신',reward:1.25},
{id:'slime',name:'슬라임 하수도',short:'슬라임 하수도',base:2,icon:'◉',color:'#8ac3a8',hazards:['corrosion','mire'],monster:'산성 슬라임',weakness:'강인함과 기동',reward:1},
{id:'boss',name:'제0게이트 — 마왕성',short:'마왕성',base:5,icon:'♜',color:'#e28e9c',hazards:['fear','fire','dark'],monster:'마왕 아르카돈',weakness:'아직 기록 없음',reward:2}
],
hazards:{poison:'독',bind:'속박',corrosion:'부식',mire:'진창',fire:'화염',fear:'공포',dark:'어둠',cold:'냉기',whiteout:'화이트아웃'},
facilities:[],
events:[
['logistics','물류대란','발주 후보 -2 · 매입가 +15%',{offers:-2,price:1.15}],['oneplus','본사 1+1 행사','일반 상품 한 종의 발주 수량 2배',{double:1}],['expedition','길드 원정주간','방문객 +2',{visitors:2}],['overflow','몬스터 범람','던전 위험과 보상 동시 증가',{danger:1.12,reward:1.3}],['manaPrice','마석 가격 폭등','마법 상품 매입가 +35%',{magicPrice:1.35}],['coldwave','한파','모든 원정에 냉기 위험 추가',{cold:1}],['shortage','포션 공급 중단','포션 발주 확률 급감',{potionWeight:0.08}],['rookie','신입 모험가 시즌','새로운 견습 모험가 합류',{rookie:1}],['royal','왕립 기사단 방문','고레벨 · 희귀 모험가 합류 기회',{royal:1}],['blackmarket','암시장 상인','희귀 이상 특별 발주 · 높은 매입가',{blackmarket:1}],['audit','본사 재고 감사','누적 폐기 6개 이상이면 감사 비용 발생',{audit:1}],['festival','왕도 축제','음식과 음료 구매 의사 증가',{foodDemand:0.2}],['strike','길드 파업','방문객 -1',{visitors:-1}],['unknown','미확인 게이트','고위험 · 고보상 임시 던전 추가',{unknown:1}],['tasting','본사 반값 행사','오늘 첫 반값 판매에 본사 50G 지원',{tasting:1}]
].map(([id,name,description,effects])=>({id,name,description,effects})),
contracts:[{id:'standard',name:'표준 가맹점',description:'기본 조건으로 시작',unlock:null},{id:'delivery',name:'새벽배송 가맹점',description:'발주 +1 · 매입가 +5%',unlock:'day10'},{id:'guild',name:'길드 제휴점',description:'방문객 +1 · 운영비 +20G',unlock:'regular3'},{id:'budget',name:'알뜰 가맹점',description:'초기자금 +250G · 희귀 발주 확률 소폭 감소',unlock:'run1'},{id:'premium',name:'프리미엄 상권',description:'희귀 모험가 확률 증가 · 운영비 +25G',unlock:'level15'}],
unlocks:{cold5:['설원 생환',5],fear5:['공포 원정 생환',5],poison10:['독 치료·예방',10],mage10:['마법사 최고 레벨',10],level15:['모험가 최고 레벨',15],fire12:['화염 골렘 처치',12],boss1:['마왕 토벌',1],escape10:['성공적인 탈출',10],wounded5:['중상에서 생환',5],revenue3000:['누적 매출',3000],knowledge15:['몬스터 관찰',15],regular3:['단골 달성',3],day10:['최고 도달 DAY',10],run1:['런 완료',1]}
};
G.DATA.balance={operating:60,frugalThreshold:120,tastingSupport:50,showoffLie:.6,bossPower:230,combatNoise:.175,rerollBase:30};
G.DATA.pricing={overcharge:{label:'바가지',mult:1.5,intent:-.16,loyalty:-3},full:{label:'정가',mult:1,intent:0,loyalty:1},half:{label:'50% 할인',mult:.5,intent:.18,loyalty:6}};
G.DATA.itemBy=Object.fromEntries(G.DATA.items.map(x=>[x.id,x]));G.DATA.jobBy=Object.fromEntries(G.DATA.jobs.map(x=>[x.id,x]));G.DATA.traitBy=Object.fromEntries(G.DATA.traits.map(x=>[x.id,x]));G.DATA.dungeonBy=Object.fromEntries(G.DATA.dungeons.map(x=>[x.id,x]));
})(globalThis);
