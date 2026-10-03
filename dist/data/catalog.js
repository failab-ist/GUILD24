/* Content definitions. New items use the same declarative effect vocabulary. */
(function(G){
/* `metaUnlock` is how many distinct Bosses must have been beaten before this may appear.
   ITEM declares exactly one meta-locked Item, so every other entry leaves it unset. */
const item=(id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock=null)=>({id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock});
G.DATA={brand:{name:'GUILD24',korean:'길드24',company:'길드리테일',slogan:'던전 가기 전, 길드24.',branches:['제7게이트점','독거미굴입구점','북부게이트점','왕도외곽점','왕도역앞점','서문역앞점','동문시장점','남문사거리점','북문광장점','중앙시장점','마탑거리점','마탑사거리점','용병길드앞점','모험가길드앞점','대장간골목점','상단거리점','성당앞점','왕궁서문점','성벽길점','여관거리점','제3게이트앞점','서부게이트점','슬라임하수도점','지하묘지입구점','골렘광산입구점','설원전초점','왕도남부점','오래된광장점','붉은다리점','은빛나루점']},
rarities:['일반','고급','희귀','영웅','전설'], npcRarities:['평범','유망','희귀','영웅','전설'],
items:[
/* ITEM_v2.7.0 ACTIVE CATALOG - exactly 40, in the owner's own order. Categories are the
   six v2.7 identities: food / drink / potion / gear / insurance / special. `medical`,
   `tool`, `magic` and the `fresh` alias are gone; 붕대 and 마석 보조배터리 are retired and
   are NOT converted into anything on an older save. Shelf lives and flavour carry over
   from the previous Item wherever the identity is unchanged. */
/* ITEM_v2.8.0 §ITEM PRICE ALIGNMENT (User 2026-09-25, v2.9.1 balance): Sell = Buy x 2 for every
   Item without exception, so a shipped Sell price is never hand-edited apart from its Buy price
   again. */
item('rice','삼각김밥',0,35,70,'food',2,'rice','용사픽','김 끝을 잡고 천천히.',{survival:6,supply:5}),
item('water','생수',0,40,80,'drink',2,'water','용사픽','뚜껑까지 챙겨 돌아오세요.',{survival:10,supply:2}),
item('ramen','컵라면',0,45,90,'food',3,'ramen','원정한끼','뚜껑 위에 젓가락을 올려 두고 3분.',{cold:12,supply:3}),
item('lunchbox','간단 도시락',1,100,200,'food',2,'lunchbox','용사픽','반찬은 단출하지만 빈칸은 없다.',{survival:12,supply:6,loot:0.2}),
item('choco','초코바',0,30,60,'food',2,'choco','용사픽','주머니에서 녹기 전에 드세요.',{mobility:6,supply:5}),
/* ITEM §ACTIVE CATALOG (User 2026-10-01, v2.9.13 quick patch): the 정신 Food beside 진정 허브티, as 초코바 is beside 캔커피 */
item('yanggaeng','녹차 양갱',0,30,60,'food',2,'yanggaeng','용사픽','어르신 손님은 꼭 두 개씩 사 간다.',{spirit:8,supply:5}),
item('coffee','캔커피',0,40,80,'drink',2,'coffee','MANA+','따는 소리에 잠이 반쯤 깬다.',{mobility:12,supply:2}),
/* Replaces the retired 붕대 slot as a plain Spirit route - not a fear/dark/whiteout Counter. */
item('herbtea','진정 허브티',0,40,80,'drink',2,'herbtea','MANA+','마시기 전에 심호흡부터 하는 손님이 많다.',{spirit:15,supply:2}),
item('lowpotion','하급 포션',0,70,140,'potion',3,'potion','귀환안심','차갑게 보관하지 않아도 됩니다.',{combat:10,potion:1}),
item('ice','얼음컵',0,30,60,'drink',3,'ice','용사픽','컵에 얼음만 가득 담아 판다. 녹기 전에 도착하길.',{fire:12,supply:1}),
/* ITEM §COUNTER LADDER (User 2026-09-27, v2.9.7): the Slime 초반 대응 and the Spider / Crypt 초반 하이브리드 */
item('soda','중화 탄산수',0,35,70,'drink',3,'soda','용사픽','튄 자리에 먼저 붓고, 남으면 마신다.',{corrosion:12,supply:1}),
item('battery','랜턴 건전지',2,95,190,'gear',5,'battery','귀환안심','흔들면 조금 더 간다. 근거는 없다.',{dark:23}),
item('rope','경량 로프',2,95,190,'gear',5,'rope','귀환안심','생각보다 가볍고, 생각보다 질기다.',{bind:23}),
item('candy','집중 사탕',0,35,70,'food',4,'candy','용사픽','시험 전에도 잘 팔린다.',{fear:12,supply:2}),
item('dragonramen','불룡볶음면',2,95,190,'food',3,'ramen','원정한끼','용 그림은 장식이 아니다.',{survival:6,cold:21,supply:3}),
item('energy','에너지드링크',1,80,160,'drink',3,'energy','MANA+','오늘 쓸 기운을 당겨 왔다.',{mobility:17,supply:2}),
item('wine','용사의 곡주',2,95,190,'drink',4,'wine','원정한끼','라벨 속 용사의 얼굴이 해마다 조금씩 바뀐다.',{fear:22,survival:-3,supply:1}),
/* The Aftercare rewrite of this effect line is owned by the Insurance step; this row moves
   only its identity (Insurance / Uncommon / 80-160). */
item('kit','구급키트',1,80,160,'insurance',4,'kit','귀환안심','안 열고 돌아오는 게 가장 좋은 상자.',{aftercare:1}),
item('mask','방진마스크',0,45,90,'gear',3,'mask','귀환안심','쓰고 나면 얼굴 자국이 한참 남는다.',{poison:12}),
/* was 핫팩 (냉기 +24): the id stays so a saved unit carries over as the Snow 초반 하이브리드 (User 2026-09-27) */
item('hood','방한 두건',1,75,150,'gear',4,'hood','귀환안심','환풍구 근처에서는 벗어 두는 게 좋다. 괜한 오해를 산다.',{cold:11,whiteout:13}),
item('webgloves','방독 작업장갑',1,75,150,'gear',4,'gloves','귀환안심','고무가 두 겹이다. 거미줄이 잘 안 붙는다.',{poison:11,bind:12}),
item('holylight','축성 손전등',1,75,150,'gear',4,'holylight','귀환안심','배터리 칸 옆에 성수 칸이 하나 더 있다.',{fear:11,dark:12}),
item('cloak','방수망토',1,75,150,'gear',4,'cloak','귀환안심','비 오는 날엔 우산 대신 사 가는 손님도 있다.',{corrosion:11,mire:12}),
item('coating','부식 방지 코팅제',2,95,190,'gear',5,'coating','귀환안심','장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.',{corrosion:23}),
item('boots','원정용 장화',2,95,190,'gear',5,'boots','귀환안심','벗을 때는 누가 뒤꿈치를 잡아당겨 줘야 한다.',{mire:23}),
item('snowgoggles','설원 고글',2,95,190,'gear',5,'goggles','귀환안심','끈이 헐거우면 눈보라가 벗겨 간다.',{whiteout:22}),
item('highpotion','상급 포션',2,195,390,'potion',5,'potionHigh','길드초이스','작은 병에 진하게 담았다.',{combat:25,potion:1}),
/* Dedicated Poison specialist only: no generic Core Stat, and no poison cure subsystem. */
item('antidote','농축 해독제',2,95,190,'gear',5,'antidote','귀환안심','한 모금이면 충분하다고 적혀 있다. 두 모금은 권하지 않는다.',{poison:23}),
item('stone','귀환석',2,200,400,'insurance',4,'stone','귀환안심','깨뜨리기 전까지는 그냥 매끈한 돌멩이다.',{escape:0.2}),
/* Takes the retired 마석 보조배터리 catalogue slot, but NOT its non-expiring shelf behaviour:
   it keeps the ordinary Potion-family shelf life. */
item('midpotion','중급 포션',1,125,250,'potion',4,'potionMid','귀환안심','하급은 불안하고 상급은 비쌀 때.',{combat:18,potion:1}),
item('guildlunch','길드 특제 도시락',2,185,370,'food',2,'lunch','길드초이스','뚜껑이 잘 안 닫힌다.',{survival:16,supply:7,loot:0.4}),
item('ion','쿨링 이온음료',2,95,190,'drink',5,'ion','MANA+','병을 꺼내면 겉에 이슬부터 맺힌다.',{fire:22,supply:1}),
item('worldcharm','세계수 생환부적',3,300,600,'insurance',5,'amulet','길드초이스','잎맥이 아직 마르지 않았다.',{revive:1}),
item('coupon','황금 1+1 쿠폰',4,500,1000,'special',5,'coupon','길드초이스','본사 도장이 선명하다. 유효기간은 적혀 있지 않다.',{duplicate:1},1),
/* Epic Family hybrids: one slot answers a Family's pair, always below the dedicated Main
   specialist on each covered Hazard. FIRE keeps one Hazard plus its combat identity rather
   than inventing a second FIRE Hazard, and its 투력 +6 is an explicit catalogue exception. */
item('spiderkit','거미줄 방호세트',3,135,270,'gear',5,'spiderkit','귀환안심','손목을 앞으로 내밀어도 아무것도 나오진 않는다.',{poison:18,bind:18}),
item('slimesuit','연금 방수슈트',3,135,270,'gear',5,'slimesuit','귀환안심','방수 테스트에 쓴 액체는 묻지 않는 게 좋다.',{corrosion:18,mire:18}),
item('cryptlantern','성화 랜턴',3,135,270,'gear',5,'cryptlantern','귀환안심','성당 납품용이었는데 어쩌다 편의점까지 왔다.',{fear:18,dark:18}),
item('snowvisor','백설 방한고글',3,135,270,'gear',5,'snowvisor','귀환안심','김은 안 서린다. 눈썹은 얼 수 있다.',{cold:18,whiteout:18}),
item('magmagear','마그마 냉각장비',3,145,290,'gear',5,'magmagear','귀환안심','설명서 첫 줄: 마그마에 직접 넣지 마시오.',{fire:18,combat:10}),
/* Epic top-end preparation: what one slot can do late in a Run, not a third Bag slot. */
item('battlelunch','영웅 결전 도시락',3,210,420,'food',2,'battlelunch','길드초이스','동쪽 나라의 인심 좋은 어머님이 떠오르는 구성.',{survival:18,supply:9}),
item('kingwater','왕도 천연암반수',3,185,370,'drink',3,'kingwater','길드초이스','왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.',{survival:24,supply:2}),
item('hyperenergy','초고속 에너지드링크',3,175,350,'drink',3,'hyperenergy','MANA+','마시고 나면 계산대보다 먼저 문을 나선다.',{mobility:26,supply:2}),
item('sageelixir','대현자 허브엘릭서',3,175,350,'drink',3,'sageelixir','길드초이스','한 모금 마시면 괜히 턱을 쓰다듬게 된다.',{spirit:28,supply:2}),
item('toppotion','최상급 포션',3,235,470,'potion',5,'toppotion','길드초이스','병은 작다. 값은 작지 않다.',{combat:35,potion:1})
],
/* Stage 10, approved. NPC_TRAIT:102 held the v2.4 table as a deliberate placeholder until a
   full-run rebaseline existed; this is that rebaseline. The shape of the change: a Job with a
   strong opening trades away slope, a Job with a weak opening gets it back, and the spread
   between the four base Jobs stays narrow enough that abandoning a grown NPC to re-roll into
   another Job is never the automatic answer. 도적 is a small unlock reward over the base four
   and 광전사 a clear step above 도적 - without either becoming mandatory.
   Stat order: 투력 / 강인함 / 기동 / 정신. */
jobs:[
{id:'warrior',name:'전사',color:'#db8857',stats:[17,18,9,10],growth:[2.8,2.6,1.5,1.6]},
{id:'archer',name:'궁수',color:'#77ac79',stats:[14,11,19,10],growth:[2.6,2,3,1.6]},
{id:'mage',name:'마법사',color:'#a494dc',stats:[18,9,10,17],growth:[3.3,1.6,1.8,2.7]},
{id:'priest',name:'사제',color:'#e4ca8b',stats:[10,16,9,20],growth:[2.2,2.7,1.6,3]},
{id:'rogue',name:'도적',color:'#79b6b5',stats:[15,11,21,9],growth:[2.8,2,3.4,1.5],metaUnlock:3},
{id:'berserker',name:'광전사',color:'#db6464',stats:[21,14,12,7],growth:[3.6,2.4,1.9,1.3],metaUnlock:6}
],
traits:[
// NPC_TRAIT ACTIVE TRAIT CATALOG (FROZEN, 30). `direction` is internal only.
// Every material effect carries an explicit semantic tone; meaning is never inferred from the sign.
['brave','용감함','mixed',{fear:7,escape:-0.06},{fear:'benefit',escape:'cost'}],
['coward','겁쟁이','mixed',{fear:-7,escape:0.19,loot:-0.15},{fear:'cost',escape:'benefit',loot:'cost'}],
['eater','대식가','mixed',{foodMult:1.3,foodSupplyDelta:-1},{foodMult:'benefit',foodSupplyDelta:'cost'}],
['small','소식가','mixed',{foodMult:0.8,foodSupplyDelta:1},{foodMult:'cost',foodSupplyDelta:'benefit'}],
['careful','신중함','mixed',{injuryRisk:-0.04,loot:-0.10},{injuryRisk:'benefit',loot:'cost'}],
['reckless','무모함','mixed',{combatPercent:0.10,escape:-0.08,injuryRisk:0.035},{combatPercent:'benefit',escape:'cost',injuryRisk:'cost'}],
['greed','탐욕','mixed',{loot:0.3,escape:-0.07},{loot:'benefit',escape:'cost'}],
['frugal','구두쇠','negative',{priceBias:-0.16},{priceBias:'cost'}],
['impulse','충동구매','positive',{buyBias:0.12},{buyBias:'benefit'}],
['liar','거짓말쟁이','mixed',{},{},'50% 확률로 실제 목적지가 다른 열린 게이트로 바뀝니다.'],
['genius','천재','positive',{xpMult:1.25},{xpMult:'benefit'}],
['strong','강골','positive',{injuryGuard:0.23},{injuryGuard:'benefit'}],
['frail','허약함','negative',{survivalPercent:-0.10,recoveryDelta:1},{survivalPercent:'cost',recoveryDelta:'cost'}],
['potionbody','포션체질','positive',{potionMult:1.15},{potionMult:'benefit'}],
['pyrophobia','화염공포증','negative',{fire:-7},{fire:'cost'}],
['collector','수집가','mixed',{rareBias:0.12,commonBias:-0.05},{rareBias:'benefit',commonBias:'cost'}],
['thrifty','실속파','mixed',{commonBias:0.10,rareBias:-0.10},{commonBias:'benefit',rareBias:'cost'}],
['social','사교적인','positive',{revisitMult:1.25},{revisitMult:'benefit'}],
/* A Trait is who somebody is, so it does not wear off. This one used to stop applying from
   the third visit, which left the only Trait in the pool that could become nothing at all
   mid-run. It is the same hurdle, permanently. */
['shy','낯가림','negative',{buyBias:-0.10},{buyBias:'cost'}],
['mender','회복체질','positive',{recoveryDelta:-1},{recoveryDelta:'benefit'}],
['stamina','지구력','positive',{fatigue:-1},{fatigue:'benefit'}],
['weary','쉽게 지침','negative',{fatigue:1},{fatigue:'cost'}],
['sharpeye','눈썰미','positive',{dark:4,whiteout:5},{dark:'benefit',whiteout:'benefit'}],
['antitoxin','해독가','positive',{poison:6},{poison:'benefit'}],
['coldhand','수족냉증','negative',{cold:-6},{cold:'cost'}],
['prepared','준비성','positive',{supplyPerItem:1},{supplyPerItem:'benefit'}],
['grit','악바리','mixed',{injuredCombatPercent:0.20,fatigue:1},{injuredCombatPercent:'benefit',fatigue:'cost'}],
['aloof','냉담한','mixed',{revisitMult:0.80,cold:6},{revisitMult:'cost',cold:'benefit'}]
,
['honest','정직한','mixed',{loyaltyBonus:1,overchargeBias:-0.10},{loyaltyBonus:'benefit',overchargeBias:'cost'}],
['rich','금수저','positive',{visitGold:50},{visitGold:'benefit'}],
['sensitive','민감체질','negative',{poison:-6},{poison:'cost'}],
['nimble','잔재주꾼','positive',{bind:4,mire:4},{bind:'benefit',mire:'benefit'}],
['clumsy','몸치','negative',{bind:-4,mire:-4},{bind:'cost',mire:'cost'}],
['maintain','장비관리','positive',{corrosion:6},{corrosion:'benefit'}],
['butterfingers','서투른','negative',{corrosion:-6},{corrosion:'cost'}],
['heatproof','내열성','positive',{fire:7},{fire:'benefit'}],
['nearsight','약시','negative',{dark:-4,whiteout:-5},{dark:'cost',whiteout:'cost'}]

].map(([id,name,direction,effects,tones,note=''])=>({id,name,direction,effects,tones,note})),
dungeons:[
{id:'spider',name:'독거미 동굴',short:'독거미 동굴',base:2,icon:'🕷',color:'#a4b980',hazards:['poison','bind'],reward:1},
{id:'golem',name:'화염 골렘 광산',short:'골렘 광산',base:3,icon:'◆',color:'#ea9561',hazards:['fire'],reward:1.15},
{id:'crypt',name:'망자역 지하묘지',short:'망자역',base:3,icon:'☾',color:'#b3a1d0',hazards:['fear','dark'],tags:['undead'],reward:1.1},
{id:'snow',name:'북부 설원 폐허',short:'설원 폐허',base:4,icon:'❄',color:'#a0d5e0',hazards:['cold','whiteout'],reward:1.25},
{id:'slime',name:'슬라임 하수도',short:'슬라임 하수도',base:2,icon:'◉',color:'#8ac3a8',hazards:['corrosion','mire'],reward:1},
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
/* BOSS_v2.7 §BOSS IDENTITY TERMINOLOGY OVERRIDE: the inherited v2.5 player-facing name is
   superseded. The internal id is unchanged; only what the player reads moved. */
['GLUTTONY','탐식','탐식의 마왕 글러트니'],
['LUST','색욕','색욕의 마왕 러스트'],
['SLOTH','나태','나태의 마왕 슬로스']
].map(([id,sin,name])=>({id,sin,name})),
facilities:[],
events:[
['logistics','물류대란','북문 운송로가 막혔다. 오늘 들어온 상자마다 우회 운임 딱지가 붙어 있다.','오늘 모든 발주 매입가 +15%',{price:1.15}],
['oneplus','본사 1+1 행사','입고표엔 한 상자였는데 두 상자가 왔다. 본사 행사품이라고 한다.','오늘 지정 발주 상품 1종 · 1개 발주 시 2개 입고',{double:1}],
['pilgrimage','게이트 순례 주간','성지 순례 깃발이 게이트 거리를 메웠다. 행렬을 따라 길을 바꾸는 모험가도 있다.','오늘 방문객 중 1~3명의 목적지가 다른 열린 게이트로 바뀔 수 있음',{pilgrimage:1}],
['overflow','몬스터 범람','경비병들이 게이트 앞 울타리를 한 겹 더 둘렀다. 안쪽 울음소리가 오늘따라 가깝다.','오늘 게이트 요구 전력 +12% · 원정 보상 +30%',{danger:1.12,reward:1.3}],
['potionPrice','포션 가격 폭등','연금술사 조합의 새 가격표가 붙었다. 어제 붙인 종이 위에.','오늘 포션 매입가 +35%',{potionPrice:1.35}],
['coldwave','한파','아침부터 진열대 유리가 서렸다. 게이트 쪽 바닥에는 얇은 얼음이 잡혔다.','오늘 적용 가능한 게이트에 냉기 위험 추가',{cold:1}],
['shortage','포션 공급 중단','배송 마차에서 포션 칸만 비어 있었다.','오늘 포션 발주 등장률 대폭 감소',{potionWeight:0.08}],
['rookie','신입 모험가 시즌','길드 등록대 앞에 새 장비 냄새가 난다. 이름표가 아직 빳빳한 모험가들이 줄을 섰다.','오늘 신규 모험가 1명 방문',{rookie:1}],
['royal','왕립 기사단 방문','왕립 문장이 박힌 마차가 길드 앞에 섰다. 주변 모험가들이 슬쩍 길을 비킨다.','오늘 신규 모험가 1명 방문 · 레벨·희귀도 상향',{royal:1}],
['blackmarket','암시장 상인','개점 전, 뒷문 앞에 주인 없는 상자가 놓여 있었다. 가격표만은 또박또박 붙어 있다.','오늘 희귀 이상 특별 발주 1건 · 매입가 +35%',{blackmarket:1}],
['audit','본사 재고 감사','본사 감사관은 인사보다 장부를 먼저 찾았다.','오늘 누적 폐기 6건 이상이면 운영비 +폐기 수 ×5G · 최대 100G',{audit:1}],
['festival','왕도 축제','왕도 쪽 음악이 게이트 앞까지 넘어온다. 원정 나서는 사람들 손에도 먹을 것이 들렸다.','오늘 음식·음료 구매 의사 +20%p',{foodDemand:0.2}],
['strike','길드 파업','길드 정문에 현수막이 걸리고 접수창구가 닫혔다.','오늘 방문객 -1',{visitors:-1}],
['unknown','미확인 게이트','새벽 순찰대가 지도에 없는 게이트를 발견했다. 아직 이름도 없다.','오늘 고위험·고보상 임시 게이트 +1',{unknown:1}],
['halfPrice','본사 반값 행사','본사 지원 도장이 찍힌 반값 쿠폰이 한 장 내려왔다.','오늘 첫 50% 할인 판매 · 본사 지원 +50G',{halfPrice:1}],
['poisonfog','독안개','게이트 쪽 공기가 누렇게 흐려졌다. 경비병들이 천으로 입과 코를 가린다.','오늘 적용 가능한 게이트에 독 위험 추가',{poison:1}],
['caravan','보급 상단 도착','예정보다 이른 상단이 해 뜨기 전에 들어왔다. 창고 앞이 모처럼 북적인다.','오늘 발주 후보 +2',{offers:2}],
['payday','길드 급여일','급여일 아침, 길드 출입문마다 동전 주머니 소리가 난다.','오늘 방문 모험가 · 현재 소지금의 20%만큼 추가 구매 가능',{wallet:1.2}],
['clinic','치유소 휴무','치유소 문에 휴무 팻말이 걸렸다. 보험 창구 앞줄이 금세 길어졌다.','오늘 보험 상품 구매 의사 +20%p',{medicalDemand:0.2}],
['wastecover','본사 폐기 유예','유통기한 위에 새 스티커가 붙어 있다. 본사는 모르는 일이라고 한다.','오늘 밤 폐기될 상품 유통기한 +1일',{wasteDelay:1}],
['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.','오늘 방문객 +2',{visitors:2},.35],
['nightshift','본사 야간 근무 수칙','본사 야간 근무 수칙\n1) 마감 전 창고 수량을 확인하십시오.\n2) 폐기 상품은 뒷문 옆 상자에 두십시오.\n3) 뒷문은 반드시 두 번 잠그십시오.\n5) 새벽 2시 이후 뒷문에서 세 번 노크가 들려도 열지 마십시오.\n4번 규정은 없습니다.','오늘 운영비 0G',{overheadFree:1},.35],
['rite','길드 합동 위령제','길드가 광장에 위령제 제단을 세웠다. 오늘은 모험가들도 말수가 적다.','남은 영업 동안 사망 한도 +1',{deathLimit:1}],
/* EVENT 24~55 (User 2026-09-28, v2.9.11): the third-draft pool, strict superset / subset pairs removed - COPY_AUDIT §13-24~§13-55 */
['medcorps','길드 의료단 순회','길드 의료단 마차가 게이트 거리를 돈다. 줄 선 모험가들의 붕대가 하나둘 풀린다.','오늘 방문 부상 모험가 · 부상 회복',{healVisitors:1}],
['medicshift','길드 의무관 당직','의무관이 오늘 밤은 길드에 남는다고 했다. 붕대 상자가 접수대 옆에 놓였다.','오늘 밤 원정 결과 부상 최대 2회 · 무사로',{nightSaves:2}],
['consolation','길드 위로금',"길드가 다친 조합원에게 위로금 봉투를 돌렸다. 봉투에는 '몸조심'이라고만 적혀 있다.",'오늘 방문 부상 모험가 · 60G 추가 구매 가능',{injuredBudget:60}],
['guildbonus','길드 특별 수당','길드가 원정 수당을 앞당겨 풀었다. 봉투가 생각보다 얇지는 않다.','오늘 방문 모험가 · 40G 추가 구매 가능',{flatBudget:40}],
['hqlogistics','본사 물류 지원','본사 트럭이 운임을 받지 않고 돌아갔다. 기사도 이유는 모른다.','오늘 모든 발주 매입가 -15%',{price:.85}],
['insurebuy','보험 공동 구매','길드 보험 창구가 공동 구매를 돌렸다. 상자마다 할인 도장이 찍혀 있다.','오늘 보험 매입가 -30%',{categoryPrice:{insurance:.7}}],
['gearaid','본사 원정용품 지원','본사가 원정용품 창고를 정리한다며 장비 상자를 싸게 넘겼다.','오늘 야외장비 매입가 -30%',{categoryPrice:{gear:.7}}],
['banquet','길드 연회','길드가 연회를 연다며 음식을 챙겨 가라고 했다. 오늘은 한 입이 두 입만큼 든든하다.','오늘 음식의 피로 회복 ×2',{feast:2}],
['shiftrest','원정 교대 근무','길드가 원정대를 두 조로 나눠 교대로 쉬게 했다. 돌아오는 발걸음이 덜 무겁다.','오늘 원정으로 쌓이는 피로 절반',{outcomeFatigue:.5}],
['spaday','길드 휴양일','길드가 온천 이용권을 돌렸다. 오늘 오는 손님들은 어깨가 한결 가볍다.','오늘 방문 모험가 · 피로 -8',{arrivalFatigue:8}],
['regularday','단골의 날','단골손님이 오늘 들르겠다는 쪽지를 친구 편에 보냈다.','오늘 단골 1명 추가 방문',{regularVisit:1}],
['bounty','길드 현상금','게시판에 현상금 종이가 새로 붙었다. 액수 앞에서 발걸음이 느려진다.','오늘 원정 보상 +20%',{reward:1.2}],
['omen','마왕의 징조','새벽 하늘이 붉게 물들었다. 게이트 안쪽이 조용해서 더 불안하다.','오늘 게이트 요구 전력 +8%',{danger:1.08}],
['latedelivery','입고 지연','배송 마차 바퀴가 빠졌다. 오늘 들어온 건 사과 편지 한 장.','오늘 발주 후보 -2',{offers:-2}],
['drought','가뭄','우물 앞 줄이 길다. 생수 상자 값이 아침마다 오른다.','오늘 음료 매입가 +30%',{categoryPrice:{drink:1.3}}],
['guildtax','길드 세금 징수','징수원이 영업 시작 전에 왔다. 영수증은 주지 않았다.','오늘 운영비 +50G',{overheadAdd:50}],
['monsoon','장맛비','비가 그치지 않는다. 우산 든 손님은 봉지를 들 손이 없다.','오늘 음식·음료 구매 의사 -15%p',{foodDemand:-.15}],
['ordercap','본사 발주 제한',"본사 공문: 오늘은 품목당 두 상자까지만. 이유는 '사정상'.",'오늘 같은 상품 발주 최대 2개',{orderCap:2}],
['noreroll','포스기 먹통','포스기가 멈췄다. 오늘은 발주서를 바꿔 달라고 전화할 수도 없다.','오늘 발주 교환 불가',{noReroll:1}],
['pricewatch','가격 단속','길드 감시관이 가격표를 하나씩 들여다보고 있다.','오늘 바가지(150%) 판매 불가',{noOvercharge:1}],
['collapse','퇴각로 붕괴','게이트 뒤편 샛길이 무너졌다. 오늘은 돌아 나올 길이 하나뿐이다.','오늘 원정 퇴각 확률 -10%p',{escapeCut:.1}],
['summons','길드 소집령','실력자 한 명이 길드에 급히 불려 갔다. 행선지는 비밀이라고 한다.','오늘 방문 예정이었던 최고 레벨 모험가 대신 다른 모험가 방문',{summons:1}],
['fridgebreak','냉장고 고장','냉장고 모터가 새벽부터 덜컹거린다. 수리 기사는 내일 온다고 했다.','오늘 음식·음료 재고 유통기한 -1일',{shelfCut:1}],
['nightmarket','야시장','게이트 거리에 야시장이 열렸다. 사람도 많고 자릿세도 붙었다.','오늘 방문객 +3 · 운영비 +60G',{visitors:3,overheadAdd:60}],
['draft','원정 징발령','길드가 모험가 몇 명을 징발해 갔다. 남은 사람 몫이 커졌다.','오늘 원정 보상 +40% · 방문객 -1',{reward:1.4,visitors:-1}],
['clearance','본사 재고 떨이','본사 창고 정리 날이다. 싸게 주지만 고를 수는 없다.','오늘 모든 발주 매입가 -25% · 발주 후보 -3',{price:.75,offers:-3}],
['eliteorder','정예 토벌령','왕도가 정예 토벌령을 내렸다. 게이트가 험해진 만큼 배우는 것도 많다.','오늘 게이트 요구 전력 +15% · 원정 경험치 +50%',{danger:1.15,xpMult:1.5}],
['heatwave','폭염','진열대 유리가 뜨겁다. 음료 칸 앞에서만 사람들이 오래 서 있다.','오늘 음료 구매 의사 +25%p · 음료 매입가 +35%',{drinkDemand:.25,categoryPrice:{drink:1.35}}],
['gateclosed','게이트 임시 폐쇄','경비대가 게이트 하나에 밧줄을 쳤다. 그쪽으로 가려던 모험가들이 다른 줄에 선다.','오늘 열린 게이트 1곳 폐쇄',{closeGate:1}],
['trainingweek','길드 훈련 주간','교관들이 게이트 앞에 진을 쳤다. 배우는 건 많은데 챙겨 오는 건 적다.','오늘 원정 경험치 +50% · 원정 보상 -30%',{xpMult:1.5,reward:.7}],
['nearexpiry','유통기한 임박 특가','본사가 날짜 임박 상품을 싸게 돌렸다. 스티커 날짜가 오늘이다.','오늘 모든 발주 매입가 -40% · 오늘 들어온 재고는 오늘까지',{price:.6,sameDayStock:1}],
['safegates','게이트 안정화 작업','길드 공병대가 밤새 게이트를 다졌다. 안쪽이 조용해진 만큼 챙길 것도 적다.','오늘 모든 게이트 1단계 · 원정 보상 -40%',{tierOne:1,reward:.6}]
].map(([id,name,reveal,description,effects,weight=1])=>({id,name,reveal,description,effects,weight})),
/* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM: the Start Contract table is retired and lives at
   archive/inactive/v2_7_franchise/contracts.js. Nothing active read it any more. A stale v8
   save may still carry a `run.contract` string; it is dormant payload and changes nothing. */
};
/* Boss Trait tuning. Every one of these is PASS3 and none is approved yet, so they are
   null on purpose: a Trait with no value applies nothing, and the Final stays exactly the
   WRATH baseline. Stage 9 measures candidates against the final RNG baseline and Stage 10
   fills these in once they are approved. Writing a plausible-looking number here would
   make an unapproved guess look like a decision. */
/* DUNGEON_HAZARD / ECONOMY_ORDER / NPC_TRAIT, 2026-09-12 amendment.
   EVERY VALUE HERE IS A STAGE 9 MEASUREMENT BASELINE, NOT A SETTLED ONE. The Director set
   them so the integrated measurement has something real to measure; Stage 9 reports the actual
   distributions and proposes candidates, and Stage 10 applies exactly one approved set.
   signalMargin is not a gate on the roll - it is only where the player is told the attempt is
   worth chasing, so it has to be read off the same margin the roll uses. The cap keeps Great
   Success below certainty at every level of preparation. */
/* Stage 10, approved. The curve is gentler than the Stage 9 baseline (slope 1.2 / cap .45)
   and the Store reward stops scaling with the Gate's own value: a Great Success now pays a
   flat amount for the Day band it happened in, so the reward is legible before it is earned.
   Deep Expeditions still pay 0. ECONOMY_ORDER / SA-Q41 sets the v2.8 baseline at 50/100/200:
   the well-grown-NPC Great Success loop is kept, the second-order Store snowball is reduced.
   signalMargin .26, chanceSlope .80 and chanceCap .30 are explicitly unchanged. */
G.DATA.greatSuccess={signalMargin:.26,chanceSlope:.8,chanceCap:.30,
 storeGoldByBand:[{maxDay:10,gold:50},{maxDay:20,gold:100},{maxDay:30,gold:200}]};
G.DATA.deepTuning={powerFactor:1.5,threeOccurrenceChance:.5,
 /* 원정 후원금 = sponsorBase x (1 + rarityStep x rarity) x (1 + levelStep x (Level - 1)),
    rounded to 10G. Who you send is the decision, so the price is the NPC's rarity and current
    Level and nothing else - not the Gate Tier, not the Day, not the Deep Power, not any item
    price, and not a hidden worth score.
    ECONOMY_ORDER_v2.8 §DEEP SPONSORSHIP / SA-Q50: base reduced 350 -> 200 for accessibility.
    Rarity step, Level step and rounding are unchanged; no compensating reward/difficulty change. */
 sponsorBase:200,sponsorRarityStep:.20,sponsorLevelStep:.05,sponsorRounding:10,
 successExp:40,greatExp:80,successWallet:60,greatWallet:120};

/* v2.5 final (F1). The Stage 10 factors ease once more, as the five-arm ablation measured them:
   PRIDE .85->.90, ENVY .88->.92, GLUTTONY .70->.80, LUST .90->.95, GREED shortfall cap 20->15,
   SLOTH 225/195/180/165 -> 220/190/175/160. WRATH's 200 and the revenue target do not move, so
   the baseline Boss is unchanged and only the gimmicks soften. SLOTH is still the hardest Boss
   by a wide margin and ships that way - that is on the playtest follow-up, not in this change.
   Stage 10, approved. Until now every field was null and the production Traits were inert,
   which is why the Stage 9 per-Boss spread was Family and Gate variance rather than gimmick.
   greedRevenueTarget is the one value that could not be approved in advance: it is 90% of the
   median cumulative gross sales an engaged Run makes under the NEW economy, so it was measured
   after the rest of this adoption landed and filled in from that measurement. */
G.DATA.bossTuning={
 prideCombatFactor:0.92,        // PRIDE: every participant's Final 투력 x this (v2.7, supersedes 0.90)
 envyStatFactor:0.92,           // ENVY: the single ace's four Stats x this
 greedRevenueTarget:18800,      // GREED: cumulative gross sales the Run is measured against
                                //   = 90% of the median engaged Run's gross sales measured on
                                //   the Stage 10 economy (median 20,909 across the engaged
                                //   strategies, 200 seeds each), rounded to 100G.
 greedShortfallCap:15,          // GREED: the most that a total shortfall can add to Boss Power (v2.10.0, User 2026-10-03: 11 -> 15, scaled with WRATH 180 -> 248)
 /* GLUTTONY v2.7: the Rare+ threshold is superseded. EVERY positive Core-Stat contribution
    that came from an Item is halved, whatever its Rarity, after the Item-side amplification
    has produced that contribution. No Rarity threshold remains. */
 gluttonyStatFactor:0.50,       // GLUTTONY: positive Item Core-Stat contribution x this
 lustStatFactor:0.95,           // LUST: a non-regular participant's four Stats x this
 firePairPower:25,              // FINAL_EXPEDITION §FAMILY-PAIR BALANCE AUDIT: a Final pair holding FIRE adds this to every Boss (User 2026-09-30; v2.10.0 18 -> 25 with WRATH)
 slothBossPower:[276,261,236,205] // SLOTH: effective Boss Power by break count [0,1,2,3] (v2.10.0, User 2026-10-03: 234/221/200/174 x 1.18 with WRATH 210 -> 248)
};
/* golemCombat is the §O easing of the 화염 골렘 광산 (golem) Family's combat requirement. It is named here rather
   than held as a constant inside shop.js so a balance candidate can be compared against it from
   the harness without editing production. The value is unchanged by that move. */
/* ECONOMY_ORDER_v2.7 §ORDER RARITY PROGRESSION. The inherited fixed all-Run table is
   superseded: the ORDER offer Rarity shifts by Day band, so the catalogue itself communicates
   progression and the new Epic preparation Items need no separate D20 hard unlock. D1-7 lean on
   Common and offer no Epic (User 2026-10-02: a T1 Day's customer cannot pay for one); Legendary
   stays exceptional and never scales past 1%. Each row is the exact normalized percentage and sums to 100. */
G.DATA.rarityBands=[
 {maxDay:3, weights:[76,20, 4, 0,0]},
 {maxDay:7, weights:[68,24, 8, 0,0]},
 {maxDay:12,weights:[58,27,12, 2,1]},
 {maxDay:19,weights:[53,27,15, 4,1]},
 {maxDay:24,weights:[46,26,17,10,1]},
 {maxDay:29,weights:[39,25,19,16,1]},
 {maxDay:30,weights:[34,24,21,20,1]}];
G.DATA.balance={loyaltyRevisit:.03,visitWallet:{perLevel:3,min:20,max:60},awayWallet:{perLevel:1.5,base:20,maxDays:3},offerSameItemMax:2,wallVisitorChance:.45,operating:60,frugalThreshold:120,halfPriceSupport:50,bossPower:248,combatNoise:.175,rerollBase:50,golemCombat:.90,
 /* CORE_RUN §DEATH LIMIT — SEGMENTED (User 2026-09-25, v2.9.1 balance): the cumulative Death
    count that ends a Run steps up with the Day it happened on; it never resets at a boundary. */
 deathLimitSegments:[{maxDay:10,limit:5},{maxDay:20,limit:8},{maxDay:30,limit:11}],
 /* ECONOMY_ORDER_v2.8 §FULL-CHAIN NUMERIC CLOSURE / SA-Q48: flat base purchase need for the
    accessible SALE modes (50% 할인 / 정가). 바가지 keeps its own Hazard-fit formula. */
 accessibleNeed:.72};/* ECONOMY_ORDER §PURCHASE ACCEPTANCE (User 2026-09-24, v2.9.0): 0.72, was 0.80 - measured, not tuned */
/* ECONOMY_ORDER §PURCHASE INTENT (Stage 10, approved).
   `mult` is what the customer is charged and is unchanged. `intentMult` is the price the
   customer JUDGES the offer at - the purchase-intent threshold. For 할인 and 바가지 the two are
   the same number, so nothing about them moves. 정가 is judged at 65 while still being charged
   100: a properly prepared product sold at list stops failing on intent RNG, because the
   economy's difficulty is meant to sit in what was ordered, what was kept in stock, and how
   each sale was priced - not in a die roll against a fair offer. */
G.DATA.pricing={overcharge:{label:'바가지',mult:1.5,intentMult:1.5,intent:-.16,loyalty:-3},full:{label:'정가',mult:1,intentMult:.65,intent:0,loyalty:1,
  /* Only 정가 weighs the judged price against the purse. PROVISIONAL, reported for approval:
     intentPivot is the measured median 정가 burden and intentWeight is what a deviation from it
     is worth, so the term redistributes around ordinary weight instead of taxing every offer.
     할인 and 바가지 carry no weight and are decided exactly as they were before this existed -
     their acceptance is not this patch's to move. */
  intentPivot:.36,intentWeight:.5,
  /* v2.9.2 balance (User 2026-09-25): the FINAL 정가 purchase chance, the 0.97 관련 준비 case included, is scaled
     by 0.90 - a ~10% relative cut, not percentage points. 할인 and 바가지 carry no scale; the shared need is untouched. */
  finalScale:.90},half:{label:'50% 할인',mult:.5,intentMult:.5,intent:.18,loyalty:4}};

/* Three shapes of the ordering decision, named here so a balance candidate can be measured
   against them from the harness without a production edit: how many candidates a Day offers,
   how much the store can hold, and what it opens with. v2.5 final: 6 candidates, 18 slots and a
   four-item opening shelf. The five-arm ablation kept six candidates - a five-slot sheet cost
   5-8 points of skilled D30 reach and raised rescue dependence by 7 - and took the 18 slots,
   which produce about one capacity decision per eight order Days at almost no survival cost. */
G.DATA.balance.orderOffers=6;G.DATA.balance.warehouse=18;
G.DATA.openingStock=[['rice',1],['water',1],['herbtea',1],['lowpotion',1]];
G.DATA.itemBy=Object.fromEntries(G.DATA.items.map(x=>[x.id,x]));G.DATA.jobBy=Object.fromEntries(G.DATA.jobs.map(x=>[x.id,x]));G.DATA.traitBy=Object.fromEntries(G.DATA.traits.map(x=>[x.id,x]));G.DATA.dungeonBy=Object.fromEntries(G.DATA.dungeons.map(x=>[x.id,x]));G.DATA.bossBy=Object.fromEntries(G.DATA.bosses.map(x=>[x.id,x]));
})(globalThis);
