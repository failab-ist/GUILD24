/* Content definitions. New items use the same declarative effect vocabulary. */
(function(G){
/* `metaUnlock` is how many distinct Bosses must have been beaten before this may appear.
   ITEM declares exactly one meta-locked Item, so every other entry leaves it unset. */
const item=(id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock=null)=>({id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock});
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
item('lava','불룡볶음면',1,65,135,'food',4,'ramen','원정한끼','용 그림은 장식이 아니다.',{combat:8,cold:12,supply:5}),
item('energy','에너지드링크',1,70,150,'drink',5,'energy','MANA+','오늘 쓸 기운을 당겨왔다.',{mobility:13,supply:3}),
item('wine','용사의 곡주',1,60,130,'drink',5,'wine','원정한끼','공포를 잊게 한다. 발걸음은 살짝 꼬인다.',{fear:24,mobility:-5,supply:3}),
item('kit','구급키트',1,120,240,'medicine',7,'kit','귀환안심','중상 위험을 줄여주는 원정 보험.',{survival:10,injuryGuard:0.65}),
item('mask','방진마스크',1,90,180,'tool',0,'mask','귀환안심','독과 가스 환경에 대응한다.',{poison:20}),
item('heat','핫팩',1,55,120,'tool',0,'heat','귀환안심','주머니 안에서 겨울을 버틴다.',{cold:22}),
item('cloak','방수망토',1,75,160,'tool',0,'cloak','귀환안심','부식과 진창에 두루 쓴다. 어느 쪽도 전문가만은 못하다.',{corrosion:14,mire:14}),
item('coating','부식 방지 코팅제',1,70,150,'tool',0,'cloak','귀환안심','장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.',{corrosion:22}),
item('boots','진창용 원정 장화',1,65,135,'tool',0,'battery','귀환안심','밑창에 진흙이 잘 붙지 않는다.',{mire:22,mobility:3}),
item('snowgoggles','설원 고글',1,60,125,'tool',0,'battery','귀환안심','눈보라 속에서도 앞이 남는다.',{whiteout:22}),
item('highpotion','상급 포션',2,150,300,'medicine',7,'potion','길드초이스','작은 병에 진하게 담았다.',{survival:27,potion:1}),
item('antidote','농축 해독제',2,220,450,'medicine',7,'antidote','귀환안심','독 대응을 크게 높인다.',{poison:42,survival:5,curePoison:1}),
item('stone','귀환석',2,260,520,'insurance',0,'stone','귀환안심','탈출 보정. 사망·중상 위기에서도 같은 수치의 추가 귀환 기회 1회.',{escape:0.5}),
item('mana','마석 보조배터리',2,240,500,'magic',0,'mana','MANA+','잡념까지 충전하지는 않는다.',{combat:4,spirit:25}),
item('premium','길드 프리미엄 도시락',2,280,560,'fresh',2,'lunch','길드초이스','뚜껑이 잘 안 닫힌다.',{survival:14,supply:7,loot:0.2}),
item('ion','쿨링 이온음료',2,200,400,'drink',5,'water','MANA+','얼음컵만큼 시원하진 않지만 오래 간다.',{fire:12,supply:4}),
item('tree','세계수 생환부적',3,600,1200,'insurance',0,'stone','길드초이스','사망 판정을 한 번 중상으로 바꾼다.',{revive:1}),
item('coupon','황금 1+1 쿠폰',4,1000,2000,'magic',0,'coupon','길드초이스','먼저 제공하면 다음 소모품의 효과를 복제한다. 슬롯 1칸.',{duplicate:1},1)
],
jobs:[
{id:'warrior',name:'전사',color:'#db8857',stats:[16,17,9,10],growth:[3.2,3,1.4,1.6],ranks:['수습 전사','전사','기사','왕립 수호자']},
{id:'archer',name:'궁수',color:'#77ac79',stats:[14,11,18,10],growth:[2.7,1.9,3.1,1.5],ranks:['견습 궁수','궁수','명사수','바람 추적자']},
{id:'mage',name:'마법사',color:'#a494dc',stats:[19,8,10,16],growth:[3.9,1.4,1.6,2.6],ranks:['견습 마법사','마법사','마도사','대마법사 후보']},
{id:'priest',name:'사제',color:'#e4ca8b',stats:[10,16,9,21],growth:[2,2.9,1.4,3.6],ranks:['수습 사제','사제','주교','빛의 대행자']},
{id:'rogue',name:'도적',color:'#79b6b5',stats:[15,10,22,9],growth:[2.8,1.8,3.7,1.4],ranks:['풋내기 도적','도적','그림자','밤의 유령'],metaUnlock:3},
{id:'berserker',name:'광전사',color:'#db6464',stats:[21,13,12,7],growth:[4,2.4,1.9,1.3],ranks:['투사','광전사','혈전사','전장의 재앙'],metaUnlock:6}
],
traits:[
// NPC_TRAIT ACTIVE TRAIT CATALOG (FROZEN, 30). `direction` is internal only.
// Every material effect carries an explicit semantic tone; meaning is never inferred from the sign.
['brave','용감함','mixed',{fear:9,escape:-0.06},{fear:'benefit',escape:'cost'}],
['coward','겁쟁이','mixed',{combat:-3,escape:0.19,loot:-0.12},{combat:'cost',escape:'benefit',loot:'cost'}],
['eater','대식가','mixed',{foodMult:1.3,foodSupplyDelta:-1},{foodMult:'benefit',foodSupplyDelta:'cost'},'위험 대응·보험·위험보상 효과는 커지지 않습니다.'],
['small','소식가','mixed',{foodMult:0.8,foodSupplyDelta:1},{foodMult:'cost',foodSupplyDelta:'benefit'},'위험 대응·보험·위험보상 효과는 줄어들지 않습니다.'],
['careful','신중함','mixed',{injuryRisk:-0.04,loot:-0.08},{injuryRisk:'benefit',loot:'cost'}],
['reckless','무모함','mixed',{combat:7,escape:-0.08,injuryRisk:0.035},{combat:'benefit',escape:'cost',injuryRisk:'cost'}],
['greed','탐욕','mixed',{loot:0.3,escape:-0.07},{loot:'benefit',escape:'cost'}],
['frugal','구두쇠','negative',{priceBias:-0.16},{priceBias:'cost'},'비싼 상품일수록 구매를 망설입니다.'],
['impulse','충동구매','positive',{buyBias:0.12},{buyBias:'benefit'}],
['showoff','허세','mixed',{},{},'게이트가 여럿이면 말한 목적지가 실제와 다를 수 있습니다. 실제 배정과 가격·상품 취향은 바뀌지 않습니다.'],
['genius','천재','positive',{xpMult:1.25},{xpMult:'benefit'}],
['strong','강골','positive',{injuryGuard:0.23},{injuryGuard:'benefit'}],
['frail','허약함','negative',{survival:-5,recoveryDelta:1},{survival:'cost',recoveryDelta:'cost'}],
['potionbody','포션체질','positive',{potionMult:1.3},{potionMult:'benefit'}],
['pyrophobia','화염공포증','negative',{fire:-9},{fire:'cost'}],
['lucky','행운아','positive',{luck:0.045,loot:0.07},{luck:'benefit',loot:'benefit'}],
['unlucky','불운아','negative',{luck:-0.045,loot:-0.07},{luck:'cost',loot:'cost'},'숨은 전투 변동폭은 바뀌지 않습니다.'],
['collector','수집가','mixed',{rareBias:0.12,commonBias:-0.05},{rareBias:'benefit',commonBias:'cost'}],
['thrifty','실속파','mixed',{commonBias:0.10,rareBias:-0.10},{commonBias:'benefit',rareBias:'cost'}],
['social','사교적인','positive',{revisitMult:1.25},{revisitMult:'benefit'}],
['shy','낯가림','negative',{shyBias:-0.10},{shyBias:'cost'},'세 번째 방문부터는 이 부담이 사라집니다.'],
['mender','회복체질','positive',{recoveryDelta:-1},{recoveryDelta:'benefit'}],
['stamina','지구력','positive',{fatigue:-1},{fatigue:'benefit'}],
['weary','쉽게 지침','negative',{fatigue:1},{fatigue:'cost'}],
['sharpeye','눈썰미','positive',{dark:6,whiteout:6},{dark:'benefit',whiteout:'benefit'}],
['antitoxin','해독가','positive',{poison:8},{poison:'benefit'}],
['coldhand','수족냉증','negative',{cold:-9},{cold:'cost'}],
['prepared','준비성','positive',{supplyPerItem:1},{supplyPerItem:'benefit'}],
['grit','악바리','mixed',{injuredCombat:6,fatigue:1},{injuredCombat:'benefit',fatigue:'cost'},'부상·중상 상태에서만 투력이 오릅니다.'],
['aloof','냉담한','mixed',{revisitMult:0.80,cold:6},{revisitMult:'cost',cold:'benefit'}]
].map(([id,name,direction,effects,tones,note=''])=>({id,name,direction,effects,tones,note})),
dungeons:[
{id:'spider',name:'독거미 동굴',short:'독거미 동굴',base:2,icon:'🕷',color:'#a4b980',hazards:['poison','bind'],monster:'독거미 여왕',weakness:'화염',reward:1},
{id:'fire',name:'화염 골렘 광산',short:'골렘 광산',base:3,icon:'◆',color:'#ea9561',hazards:['fire'],monster:'화염 골렘',weakness:'강한 전투력',reward:1.15},
{id:'crypt',name:'망자역 지하묘지',short:'망자역',base:3,icon:'☾',color:'#b3a1d0',hazards:['fear','dark'],tags:['undead'],monster:'망자역 차장',weakness:'정신과 시야 확보',reward:1.1},
{id:'snow',name:'북부 설원 폐허',short:'설원 폐허',base:4,icon:'❄',color:'#a0d5e0',hazards:['cold','whiteout'],monster:'서리 거인',weakness:'강인함과 정신',reward:1.25},
{id:'slime',name:'슬라임 하수도',short:'슬라임 하수도',base:2,icon:'◉',color:'#8ac3a8',hazards:['corrosion','mire'],monster:'산성 슬라임',weakness:'강인함과 기동',reward:1},
{id:'final',name:'제0게이트 — 마왕성',short:'마왕성',base:5,icon:'♜',color:'#e28e9c',hazards:[],reward:2}
],
hazards:{poison:'독',bind:'속박',corrosion:'부식',mire:'진창',fire:'화염',fear:'공포',dark:'어둠',cold:'냉기',whiteout:'화이트아웃'},
// BOSS ROSTER (BOSS_v2.5.0 / PLAYER-FACING IDENTITY). One of these is dealt per Run and
// never re-rolled. `name` is the authoritative Player-facing name; the production name
// pool binds portraits by the same id but does not own identity.
bosses:[
['WRATH','분노','분노의 마왕 래스'],
['PRIDE','오만','오만의 마왕 프라이드'],
['ENVY','질투','질투의 마왕 엔비'],
['GREED','탐욕','탐욕의 마왕 그리드'],
['GLUTTONY','폭식','폭식의 마왕 글러트니'],
['LUST','색욕','색욕의 마왕 러스트'],
['SLOTH','나태','나태의 마왕 슬로스']
].map(([id,sin,name])=>({id,sin,name})),
facilities:[],
events:[
['logistics','물류대란','길이 막혔다. 물건은 왔다. 평소보다 비쌀 뿐이다.','오늘 매입가 +15%',{price:1.15}],
['oneplus','본사 1+1 행사','본사에서 행사 공문이 내려왔다.','지정 상품 1종 · 발주 수량 2배',{double:1}],
['pilgrimage','게이트 순례주간','순례 행렬이 게이트 구역을 지나간다.','오늘 1~3명의 모험가가 예정된 목적지가 아닌 다른 열린 게이트로 향할 수 있습니다.',{pilgrimage:1}],
['overflow','몬스터 범람','게이트 밖까지 소리가 들린다.','오늘 원정 위험 증가 · 원정 보상 증가',{danger:1.12,reward:1.3}],
['manaPrice','마석 가격 폭등','마석 값이 또 올랐다.','오늘 특수 상품 매입가 +35%',{magicPrice:1.35}],
['coldwave','한파','북쪽 바람이 게이트 구역까지 내려왔다.','적용 가능한 게이트에 냉기 위험 추가',{cold:1}],
['shortage','포션 공급 중단','포션 상자가 오지 않았다.','오늘 포션 발주 등장 확률 크게 감소',{potionWeight:0.08}],
['rookie','신입 모험가 시즌','길드 게시판에 새 이름이 늘었다.','오늘 신규 · 견습 모험가 합류 가능성 증가',{rookie:1}],
['royal','왕립 기사단 방문','왕립 기사단 마차가 멈췄다.','오늘 고레벨 · 희귀 신규 모험가 합류 기회',{royal:1}],
['blackmarket','암시장 상인','정문으로 들어온 사람은 아니다.','오늘 희귀 이상 특별 발주 · 매입가 높음',{blackmarket:1}],
['audit','본사 재고 감사','본사에서 장부를 보러 왔다.','누적 폐기 기준 초과 · 감사 비용 발생',{audit:1}],
['festival','왕도 축제','왕도 축제가 시작됐다.','오늘 음식 · 음료 구매 의사 증가',{foodDemand:0.2}],
['strike','길드 파업','길드 정문에 현수막이 걸렸다.','오늘 방문객 -1',{visitors:-1}],
['unknown','미확인 게이트','지도에 없던 문이 열렸다.','오늘 고위험 · 고보상 임시 게이트 1개 추가',{unknown:1}],
['tasting','본사 반값 행사','오늘 반값은 본사가 한 번 낸다.','오늘 첫 50% 판매 · 본사 지원 +50G',{tasting:1}],
['poisonfog','독안개','게이트 주변에 누런 안개가 깔렸다.','적용 가능한 게이트에 독 위험 추가',{poison:1}],
['caravan','보급 상단 도착','보급 상단이 하루 일찍 도착했다.','오늘 발주 후보 +2',{offers:2}],
['payday','길드 급여일','오늘은 길드 급여일이다.','오늘 방문 모험가 구매 예산 +20%',{wallet:1.2}],
['clinic','치유소 휴무','치유소 앞에 휴무 팻말이 붙었다.','오늘 의료 상품 구매 의사 증가',{medicalDemand:0.2}],
['wastecover','본사 폐기 지원','오늘 폐기비는 본사 부담이다.','오늘 폐기 비용 0G',{wasteFree:1}],
['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.','오늘 방문객 +2',{visitors:2},.35],
['nightshift','본사 야간 근무 수칙','1. 마감 전 창고를 확인한다.\n2. 폐기 상품은 따로 둔다.\n3. 뒷문은 잠근다.\n5. 새벽 두 시 이후에는 창밖을 보지 않는다.\n4번 규정은 없습니다.','오늘 점포 유지비 0G',{overheadFree:1},.35]
].map(([id,name,reveal,description,effects,weight=1])=>({id,name,reveal,description,effects,weight})),
contracts:[{id:'standard',name:'표준 가맹점',description:'기본 조건으로 시작',grade:null},
{id:'delivery',name:'새벽배송 가맹점',description:'발주 +1 · 매입가 +5%',grade:2},
{id:'guild',name:'길드 제휴점',description:'방문객 +1 · 운영비 +20G',grade:3},
{id:'budget',name:'알뜰 가맹점',description:'초기자금 +250G · 희귀 발주 확률 소폭 감소',grade:4},
{id:'premium',name:'프리미엄 상권',description:'희귀 모험가 확률 증가 · 운영비 +25G',grade:5}]
};
/* Boss Trait tuning. Every one of these is PASS3 and none is approved yet, so they are
   null on purpose: a Trait with no value applies nothing, and the Final stays exactly the
   WRATH baseline. Stage 9 measures candidates against the final RNG baseline and Stage 10
   fills these in once they are approved. Writing a plausible-looking number here would
   make an unapproved guess look like a decision. */
G.DATA.bossTuning={
 prideCombatFactor:null,        // PRIDE: every participant's Final 투력 x this
 envyStatFactor:null,           // ENVY: the single ace's four Stats x this
 greedRevenueTarget:null,       // GREED: cumulative gross sales the Run is measured against
 greedShortfallSlope:null,      // GREED: Boss Power added per Gold of shortfall
 greedShortfallCap:null,        // GREED: the most that shortfall can ever add
 gluttonyRarityThreshold:null,  // GLUTTONY: supplies at or above this rarity are attenuated
 gluttonyStatFactor:null,       // GLUTTONY: their raw-Stat contribution x this
 lustStatFactor:null,           // LUST: a non-regular participant's four Stats x this
 slothBossPower:null            // SLOTH: effective Boss Power by break count [0,1,2,3]
};
/* easterChance is an approved STARTING VALUE, not a settled one: Stage 9 measures how often a
   Rare Reference identity actually turns up per Run and reports candidates. Do not retune it here. */
G.DATA.balance={operating:60,frugalThreshold:120,tastingSupport:50,showoffLie:.6,bossPower:230,combatNoise:.175,rerollBase:30,easterChance:.01};
G.DATA.pricing={overcharge:{label:'바가지',mult:1.5,intent:-.16,loyalty:-3},full:{label:'정가',mult:1,intent:0,loyalty:1},half:{label:'50% 할인',mult:.5,intent:.18,loyalty:6}};
G.DATA.itemBy=Object.fromEntries(G.DATA.items.map(x=>[x.id,x]));G.DATA.jobBy=Object.fromEntries(G.DATA.jobs.map(x=>[x.id,x]));G.DATA.traitBy=Object.fromEntries(G.DATA.traits.map(x=>[x.id,x]));G.DATA.dungeonBy=Object.fromEntries(G.DATA.dungeons.map(x=>[x.id,x]));G.DATA.bossBy=Object.fromEntries(G.DATA.bosses.map(x=>[x.id,x]));
})(globalThis);
