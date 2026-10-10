/* Content definitions. New items use the same declarative effect vocabulary. */
(function(G){
/* `metaUnlock` is how many distinct Bosses must have been beaten before this may appear.
   ITEM declares exactly one meta-locked Item, so every other entry leaves it unset. */
const pct=v=>Math.round(v*1000)/10;
const item=(id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock=null)=>({id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock});
G.DATA={brand:{name:'GUILD24',korean:'길드24',company:'길드리테일',slogan:'던전 가기 전, 길드24.',branches:['제7게이트점','독거미굴입구점','북부게이트점','왕도외곽점','왕도역앞점','서문역앞점','동문시장점','남문사거리점','북문광장점','중앙시장점','마탑거리점','마탑사거리점','용병길드앞점','모험가길드앞점','대장간골목점','상단거리점','성당앞점','왕궁서문점','성벽길점','여관거리점','제3게이트앞점','서부게이트점','슬라임하수도점','지하묘지입구점','골렘광산입구점','설원전초점','왕도남부점','오래된광장점','붉은다리점','은빛나루점']},
rarities:['일반','고급','희귀','영웅','전설'], npcRarities:['평범','유망','희귀','영웅','전설'],
items:[
/* ITEM_v2.7.0 ACTIVE CATALOG - exactly 40, in the owner's own order. Categories are the
   six v2.7 identities: food / drink / potion / gear / insurance / special. `medical`,
   `tool`, `magic` and the `fresh` alias are gone; 붕대 and 마석 보조배터리 are retired and
   are NOT converted into anything on an older save. Shelf lives and flavour carry over
   from the previous Item wherever the identity is unchanged. */
/* ITEM §ITEM PRICE ALIGNMENT: Sell = Buy x 2 for every Item without exception; a Sell price is never hand-edited apart
   from its Buy price. */
item('rice','삼각김밥',0,35,70,'food',2,'rice','용사픽','김 끝을 잡고 천천히.',{survival:6,supply:5}),
item('water','생수',0,40,80,'drink',2,'water','용사픽','뚜껑까지 챙겨 돌아오세요.',{survival:12,supply:2}),
item('ramen','컵라면',0,55,110,'food',3,'ramen','원정한끼','뚜껑 위에 젓가락을 올려 두고 3분.',{cold:10,supply:3}),
item('lunchbox','간단 도시락',1,90,180,'food',2,'lunchbox','용사픽','반찬은 단출하지만 빈칸은 없다.',{survival:9,supply:6,loot:0.1}),
item('choco','초코바',0,30,60,'food',2,'choco','용사픽','주머니에서 녹기 전에 드세요.',{mobility:6,supply:5}),
/* ITEM §ACTIVE CATALOG: the 정신 Food beside 진정 허브티, as 초코바 is beside 캔커피 */
item('yanggaeng','녹차 양갱',0,30,60,'food',2,'yanggaeng','용사픽','어르신 손님은 꼭 두 개씩 사 간다.',{spirit:6,supply:5}),
item('coffee','캔커피',0,40,80,'drink',2,'coffee','MANA+','따는 소리에 잠이 반쯤 깬다.',{mobility:12,supply:2}),
/* Replaces the retired 붕대 slot as a plain Spirit route - not a fear/dark/whiteout Counter. */
item('herbtea','진정 허브티',0,40,80,'drink',2,'herbtea','MANA+','마시기 전에 심호흡부터 하는 손님이 많다.',{spirit:12,supply:2}),
item('lowpotion','하급 포션',0,70,140,'potion',3,'potion','귀환안심','차갑게 보관하지 않아도 됩니다.',{combat:10,potion:1}),
item('ice','얼음컵',0,35,70,'drink',3,'ice','용사픽','컵에 얼음만 가득 담아 판다. 녹기 전에 도착하길.',{fire:10,supply:1}),
/* ITEM §COUNTER LADDER: the Slime 초반 대응 and the Spider / Crypt 초반 하이브리드 */
item('soda','중화 탄산수',0,40,80,'drink',3,'soda','용사픽','튄 자리에 먼저 붓고, 남으면 마신다.',{corrosion:10,supply:1}),
item('battery','랜턴 건전지',2,95,190,'gear',5,'battery','귀환안심','흔들면 조금 더 간다. 근거는 없다.',{dark:28}),
item('rope','경량 로프',2,95,190,'gear',5,'rope','귀환안심','생각보다 가볍고, 생각보다 질기다.',{bind:28}),
item('candy','집중 사탕',0,50,100,'food',4,'candy','용사픽','시험 전에도 잘 팔린다.',{fear:10,supply:2}),
item('dragonramen','불룡볶음면',2,115,230,'food',3,'ramen','원정한끼','용 그림은 장식이 아니다.',{survival:6,cold:23,supply:3}),
item('energy','에너지드링크',1,80,160,'drink',3,'energy','MANA+','오늘 쓸 기운을 당겨 왔다.',{mobility:17,supply:2}),
item('wine','용사의 곡주',2,100,200,'drink',4,'wine','원정한끼','라벨 속 용사의 얼굴이 해마다 조금씩 바뀐다.',{fear:25,survival:-3,supply:1}),
/* The Aftercare rewrite of this effect line is owned by the Insurance step; this row moves
   only its identity (Insurance / Uncommon / 80-160). */
item('kit','구급키트',1,80,160,'insurance',4,'kit','귀환안심','안 열고 돌아오는 게 가장 좋은 상자.',{aftercare:1}),
item('mask','방진마스크',0,45,90,'gear',3,'mask','귀환안심','쓰고 나면 얼굴 자국이 한참 남는다.',{poison:12}),
/* ITEM §COUNTER LADDER: the Snow 초반 하이브리드; the id `hood` is kept so a saved unit carries over */
item('hood','방한 두건',1,75,150,'gear',4,'hood','귀환안심','환풍구 근처에서는 벗어 두는 게 좋다. 괜한 오해를 산다.',{cold:8,whiteout:12}),
item('webgloves','방독 작업장갑',1,75,150,'gear',4,'gloves','귀환안심','고무가 두 겹이다. 거미줄이 잘 안 붙는다.',{poison:8,bind:12}),
item('holylight','축성 손전등',1,75,150,'gear',4,'holylight','귀환안심','배터리 칸 옆에 성수 칸이 하나 더 있다.',{fear:8,dark:12}),
item('cloak','방수망토',1,75,150,'gear',4,'cloak','귀환안심','비 오는 날엔 우산 대신 사 가는 손님도 있다.',{corrosion:8,mire:12}),
item('coating','부식 방지 코팅제',2,95,190,'gear',5,'coating','귀환안심','장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.',{corrosion:28}),
item('boots','원정용 장화',2,95,190,'gear',5,'boots','귀환안심','벗을 때는 누가 뒤꿈치를 잡아당겨 줘야 한다.',{mire:28}),
item('snowgoggles','설원 고글',2,95,190,'gear',5,'goggles','귀환안심','끈이 헐거우면 눈보라가 벗겨 간다.',{whiteout:28}),
item('highpotion','상급 포션',2,195,390,'potion',5,'potionHigh','길드초이스','작은 병에 진하게 담았다.',{combat:25,potion:1}),
/* Dedicated Poison specialist only: no generic Core Stat, and no poison cure subsystem. */
item('antidote','농축 해독제',2,95,190,'gear',5,'antidote','귀환안심','한 모금이면 충분하다고 적혀 있다. 두 모금은 권하지 않는다.',{poison:28}),
item('stone','귀환석',2,200,400,'insurance',4,'stone','귀환안심','깨뜨리기 전까지는 그냥 매끈한 돌멩이다.',{escape:0.2}),
/* Takes the retired 마석 보조배터리 catalogue slot, but NOT its non-expiring shelf behaviour:
   it keeps the ordinary Potion-family shelf life. */
item('midpotion','중급 포션',1,125,250,'potion',4,'potionMid','귀환안심','하급은 불안하고 상급은 비쌀 때.',{combat:18,potion:1}),
item('guildlunch','길드 특제 도시락',2,165,330,'food',2,'lunch','길드초이스','뚜껑이 잘 안 닫힌다.',{survival:12,supply:7,loot:0.25}),
item('ion','쿨링 이온음료',2,100,200,'drink',5,'ion','MANA+','병을 꺼내면 겉에 이슬부터 맺힌다.',{fire:23,supply:1}),
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
item('battlelunch','영웅 결전 도시락',3,205,410,'food',2,'battlelunch','길드초이스','동쪽 나라의 인심 좋은 어머님이 떠오르는 구성.',{combat:5,survival:15,supply:9}),
item('kingwater','왕도 천연암반수',3,180,360,'drink',3,'kingwater','길드초이스','왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.',{combat:5,survival:20,supply:2}),
item('hyperenergy','초고속 에너지드링크',3,180,360,'drink',3,'hyperenergy','MANA+','마시고 나면 계산대보다 먼저 문을 나선다.',{combat:5,mobility:20,supply:2}),
item('sageelixir','대현자 허브엘릭서',3,180,360,'drink',3,'sageelixir','길드초이스','한 모금 마시면 괜히 턱을 쓰다듬게 된다.',{combat:5,spirit:20,supply:2}),
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
{id:'warrior',name:'전사',color:'#db8857',stats:[17,18,9,10],growth:[2.8,3,1.5,1.6]},
{id:'archer',name:'궁수',color:'#77ac79',stats:[13,12,21,10],growth:[2.3,2.1,3.4,1.6]},
{id:'mage',name:'마법사',color:'#a494dc',stats:[18,9,10,17],growth:[3.1,1.6,1.8,2.7]},
{id:'priest',name:'사제',color:'#e4ca8b',stats:[10,16,9,20],growth:[2.2,2.7,1.6,3]},
{id:'rogue',name:'도적',color:'#79b6b5',stats:[17,10,19,9],growth:[3,1.8,3,1.5],metaUnlock:3},
{id:'berserker',name:'광전사',color:'#db6464',stats:[21,15,13,7],growth:[3.6,2.5,2,1.3],metaUnlock:6}
],
traits:[
// NPC_TRAIT ACTIVE TRAIT CATALOG (FROZEN, 30). `direction` is internal only.
// Every material effect carries an explicit semantic tone; meaning is never inferred from the sign.
['brave','용감함','mixed',{fear:6,escape:-0.06},{fear:'benefit',escape:'cost'}],
['coward','겁쟁이','mixed',{fear:-6,escape:0.19,loot:-0.15},{fear:'cost',escape:'benefit',loot:'cost'}],
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
['pyrophobia','화염공포증','negative',{fire:-6},{fire:'cost'}],
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
['sharpeye','눈썰미','positive',{dark:4,whiteout:4},{dark:'benefit',whiteout:'benefit'}],
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
['heatproof','내열성','positive',{fire:6},{fire:'benefit'}],
['nearsight','약시','negative',{dark:-4,whiteout:-4},{dark:'cost',whiteout:'cost'}]

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
['logistics','물류대란','북문 운송로가 막혔다. 오늘 들어온 상자마다 우회 운임 딱지가 붙어 있다.',e=>`오늘 모든 상품의 발주 매입가가 ${pct(e.price-1)}% 오른다.`,{price:1.15}],
['oneplus','본사 1+1 행사','입고표엔 한 상자였는데 두 상자가 왔다. 본사 행사품이라고 한다.',e=>`오늘 1+1 표시가 붙은 발주 상품 1종은 1개를 주문하면 ${G.DATA.eventRules.promoUnits}개가 입고된다.`,{double:1}],
['pilgrimage','게이트 순례 주간','성지 순례 깃발이 게이트 거리를 메웠다. 행렬을 따라 길을 바꾸는 모험가도 있다.',e=>`오늘 손님 중 ${G.DATA.eventRules.pilgrimageMin}~${G.DATA.eventRules.pilgrimageMax}명이 예상 목적지와 다른 열린 게이트로 갈 수 있다. 실제 경로는 밤에 확인한다.`,{pilgrimage:1}],
['overflow','몬스터 범람','경비병들이 게이트 앞 울타리를 한 겹 더 둘렀다. 안쪽 울음소리가 오늘따라 가깝다.',e=>`오늘 게이트 요구 전력이 ${pct(e.danger-1)}% 오르고, 원정 결과의 손님 소지금 획득이 ${pct(e.reward-1)}% 늘어난다.`,{danger:1.12,reward:1.3}],
['potionPrice','포션 가격 폭등','연금술사 조합의 새 가격표가 붙었다. 어제 붙인 종이 위에.',e=>`오늘 포션의 발주 매입가가 ${pct(e.potionPrice-1)}% 오른다.`,{potionPrice:1.35}],
['coldwave','한파','아침부터 진열대 유리가 서렸다. 게이트 쪽 바닥에는 얇은 얼음이 잡혔다.',()=>"오늘 냉기·화염 위험이 없는 게이트에 냉기 위험이 추가된다.",{cold:1}],
['shortage','포션 공급 중단','배송 마차에서 포션 칸만 비어 있었다.',()=>"오늘 포션은 발주 후보에 매우 드물게 나온다.",{potionWeight:0.08}],
['rookie','신입 모험가 시즌','길드 등록대 앞에 새 장비 냄새가 난다. 이름표가 아직 빳빳한 모험가들이 줄을 섰다.',()=>"오늘 손님 중 1명이 새 모험가로 방문한다.",{rookie:1}],
['royal','왕립 기사단 방문','왕립 문장이 박힌 마차가 길드 앞에 섰다. 주변 모험가들이 슬쩍 길을 비킨다.',()=>"오늘 손님 중 1명이 새 모험가로 방문한다. 보통의 새 모험가보다 시작 레벨이 높고, 높은 등급으로 올 가능성이 커진다.",{royal:1}],
['blackmarket','암시장 상인','개점 전, 뒷문 앞에 주인 없는 상자가 놓여 있었다. 가격표만은 또박또박 붙어 있다.',e=>`오늘 희귀 이상 상품 전용 발주 칸이 1개 추가된다. 그 칸의 매입가는 ${pct(G.DATA.eventRules.blackmarketPrice-1)}% 높다.`,{blackmarket:1}],
['audit','본사 재고 감사','본사 감사관은 인사보다 장부를 먼저 찾았다.',e=>`이번 점포의 누적 폐기가 ${G.DATA.eventRules.auditMinimum}개 이상이면, 오늘 운영비 계산에 누적 폐기 개수 ×${G.DATA.eventRules.auditPerItem}G를 더한다(최대 ${G.DATA.eventRules.auditMaximum}G).`,{audit:1}],
['festival','왕도 축제','왕도 쪽 음악이 게이트 앞까지 넘어온다. 원정 나서는 사람들 손에도 먹을 것이 들렸다.',e=>`오늘 손님의 음식·음료 구매 의사 +${pct(e.foodDemand)}%p`,{foodDemand:0.2}],
['strike','길드 파업','길드 정문에 현수막이 걸리고 접수창구가 닫혔다.',e=>`오늘 손님 수 ${e.visitors}명.`,{visitors:-1}],
['unknown','고위험 게이트 발견','새벽 순찰대가 위험한 게이트를 발견했다. 길드가 높은 보상을 걸었다.',()=>"오늘 요구 전력과 손님 소지금 획득이 더 큰 임시 게이트가 1곳 열린다.",{unknown:1}],
['halfPrice','본사 반값 행사','본사 지원 도장이 찍힌 반값 쿠폰이 한 장 내려왔다.',e=>`오늘 처음으로 상품을 ${pct(1-G.DATA.pricing.half.mult)}% 할인해 팔면, 본사가 보유 골드 ${G.DATA.balance.halfPriceSupport}G를 지원한다.`,{halfPrice:1}],
['poisonfog','독안개','게이트 쪽 공기가 누렇게 흐려졌다. 경비병들이 천으로 입과 코를 가린다.',()=>"오늘 독 위험이 없는 게이트에 독 위험이 추가된다.",{poison:1}],
['caravan','보급 상단 도착','예정보다 이른 상단이 해 뜨기 전에 들어왔다. 창고 앞이 모처럼 북적인다.',e=>`오늘 발주 후보가 ${e.offers}칸 늘어난다.`,{offers:2}],
['payday','길드 급여일','급여일 아침, 길드 출입문마다 동전 주머니 소리가 난다.',e=>`오늘 방문한 손님은 손님 소지금의 ${pct(e.wallet-1)}%만큼 상품을 더 살 수 있다(오늘만 쓰는 추가 구매 금액).`,{wallet:1.2}],
['clinic','치유소 휴무','치유소 문에 휴무 팻말이 걸렸다. 보험 창구 앞줄이 금세 길어졌다.',e=>`오늘 손님의 보험 상품 구매 의사 +${pct(e.medicalDemand)}%p`,{medicalDemand:0.2}],
['wastecover','본사 폐기 유예','유통기한 위에 새 스티커가 붙어 있다. 본사는 모르는 일이라고 한다.',e=>`오늘 아침 보유 재고 중 오늘까지 팔 수 있던 상품의 유통기한이 ${e.wasteDelay}일 늘어난다.`,{wasteDelay:1}],
['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.',e=>`오늘 손님 수 ${e.visitors>=0?"+":""}${e.visitors}명.`,{visitors:2},.35],
['nightshift','본사 야간 근무 수칙','본사 야간 근무 수칙\n1) 마감 전 창고 수량을 확인하십시오.\n2) 폐기 상품은 뒷문 옆 상자에 두십시오.\n3) 뒷문은 반드시 두 번 잠그십시오.\n5) 새벽 2시 이후 뒷문에서 세 번 노크가 들려도 열지 마십시오.\n4번 규정은 없습니다.',()=>"오늘 운영비는 0G다.",{overheadFree:1},.35],
['rite','길드 합동 위령제','길드가 광장에 위령제 제단을 세웠다. 오늘은 모험가들도 말수가 적다.',e=>`이번 점포가 끝날 때까지 사망 한도가 ${e.deathLimit}명 늘어난다.`,{deathLimit:1}],
/* EVENT 24~55 (User 2026-09-28, v2.9.11): the third-draft pool, strict superset / subset pairs removed - COPY_AUDIT §13-24~§13-55 */
['medcorps','길드 의료단 순회','길드 의료단 마차가 게이트 거리를 돈다. 줄 선 모험가들의 붕대가 하나둘 풀린다.',()=>"오늘 부상인 손님이 가게에 오면 부상이 낫는다(중상 제외).",{healVisitors:1}],
['medicshift','길드 의무관 당직','의무관이 오늘 밤은 길드에 남는다고 했다. 붕대 상자가 접수대 옆에 놓였다.',e=>`오늘 밤 부상으로 돌아온 모험가의 남는 부상을 최대 ${e.nightSaves}명까지 없앤다(중상·사망 제외).`,{nightSaves:2}],
['consolation','길드 위로금',"길드가 다친 조합원에게 위로금 봉투를 돌렸다. 봉투에는 '몸조심'이라고만 적혀 있다.",e=>`오늘 방문 때 부상이 남아 있는 손님은 상품을 ${e.injuredBudget}G 더 살 수 있다(오늘만 쓰는 추가 구매 금액).`,{injuredBudget:60}],
['guildbonus','길드 특별 수당','길드가 원정 수당을 앞당겨 풀었다. 봉투가 생각보다 얇지는 않다.',e=>`오늘 방문한 손님은 상품을 ${e.flatBudget}G 더 살 수 있다(오늘만 쓰는 추가 구매 금액).`,{flatBudget:40}],
['hqlogistics','본사 물류 지원','본사 트럭이 운임을 받지 않고 돌아갔다. 기사도 이유는 모른다.',e=>`오늘 모든 상품의 발주 매입가가 ${pct(1-e.price)}% 낮아진다.`,{price:.85}],
['insurebuy','보험 공동 구매','길드 보험 창구가 공동 구매를 돌렸다. 상자마다 할인 도장이 찍혀 있다.',e=>`오늘 보험 상품의 발주 매입가가 ${pct(1-e.categoryPrice.insurance)}% 낮아진다.`,{categoryPrice:{insurance:.7}}],
['gearaid','본사 원정용품 지원','본사가 원정용품 창고를 정리한다며 장비 상자를 싸게 넘겼다.',e=>`오늘 야외장비 상품의 발주 매입가가 ${pct(1-e.categoryPrice.gear)}% 낮아진다.`,{categoryPrice:{gear:.7}}],
['banquet','길드 연회','길드가 연회를 연다며 음식을 챙겨 가라고 했다. 오늘은 한 입이 두 입만큼 든든하다.',e=>`오늘 원정에 쓰는 음식의 피로 회복이 ${e.feast}배가 된다(음료는 그대로).`,{feast:2}],
['shiftrest','원정 교대 근무','길드가 원정대를 두 조로 나눠 교대로 쉬게 했다. 돌아오는 발걸음이 덜 무겁다.',e=>`오늘 원정 결과의 피로 증가량이 ${pct(1-e.outcomeFatigue)}% 줄어든다`,{outcomeFatigue:.5}],
['spaday','길드 휴양일','길드가 온천 이용권을 돌렸다. 오늘 오는 손님들은 어깨가 한결 가볍다.',e=>`오늘 방문하는 모든 손님의 피로가 ${e.arrivalFatigue} 줄어든다.`,{arrivalFatigue:8}],
['regularday','단골의 날','단골손님이 오늘 들르겠다는 쪽지를 친구 편에 보냈다.',()=>"오늘 아직 방문 예정이 아닌 단골이 있으면 1명이 추가로 온다.",{regularVisit:1}],
['bounty','길드 현상금','게시판에 현상금 종이가 새로 붙었다. 액수 앞에서 발걸음이 느려진다.',e=>`오늘 원정 결과의 손님 소지금 획득이 ${pct(e.reward-1)}% 늘어난다.`,{reward:1.2}],
['omen','마왕의 징조','새벽 하늘이 붉게 물들었다. 게이트 안쪽이 조용해서 더 불안하다.',e=>`오늘 게이트 요구 전력이 ${pct(e.danger-1)}% 오른다.`,{danger:1.08}],
['latedelivery','입고 지연','배송 마차 바퀴가 빠졌다. 오늘 들어온 건 사과 편지 한 장.',e=>`오늘 발주 후보가 ${-e.offers}칸 줄어든다.`,{offers:-2}],
['drought','가뭄','우물 앞 줄이 길다. 생수 상자 값이 아침마다 오른다.',e=>`오늘 음료의 발주 매입가가 ${pct(e.categoryPrice.drink-1)}% 오른다.`,{categoryPrice:{drink:1.3}}],
['guildtax','길드 세금 징수','징수원이 영업 시작 전에 왔다. 영수증은 주지 않았다.',e=>`오늘 운영비에 ${e.overheadAdd}G가 더해진다.`,{overheadAdd:50}],
['monsoon','장맛비','비가 그치지 않는다. 우산 든 손님은 봉지를 들 손이 없다.',e=>`오늘 손님의 음식·음료 구매 의사 ${pct(e.foodDemand)}%p`,{foodDemand:-.15}],
['ordercap','본사 발주 제한',"본사 공문: 오늘은 품목당 두 상자까지만. 이유는 '사정상'.",e=>`오늘은 발주 후보 한 칸에서 최대 ${e.orderCap}개까지 주문할 수 있다.`,{orderCap:2}],
['noreroll','포스기 먹통','포스기가 멈췄다. 오늘은 발주서를 바꿔 달라고 전화할 수도 없다.',()=>"오늘 발주 후보 교환을 할 수 없다(무료 교환도 포함).",{noReroll:1}],
['pricewatch','가격 단속','길드 감시관이 가격표를 하나씩 들여다보고 있다.',e=>`오늘은 상품을 바가지(${pct(G.DATA.pricing.overcharge.mult)}%)로 팔 수 없다.`,{noOvercharge:1}],
['collapse','퇴각로 붕괴','게이트 뒤편 샛길이 무너졌다. 오늘은 돌아 나올 길이 하나뿐이다.',e=>`오늘 원정의 기본 퇴각 확률이 ${pct(e.escapeCut)}%p 줄어든다(귀환석의 추가 퇴각 효과는 그대로).`,{escapeCut:.1}],
['summons','길드 소집령','실력자 한 명이 길드에 급히 불려 갔다. 행선지는 비밀이라고 한다.',()=>"오늘 방문할 수 있는 모험가 중 레벨이 가장 높은 1명은 가게에 오지 않는다.",{summons:1}],
['fridgebreak','냉장고 고장','냉장고 모터가 새벽부터 덜컹거린다. 수리 기사는 내일 온다고 했다.',e=>`오늘 아침 가진 음식·음료 재고의 유통기한이 ${e.shelfCut}일 줄어든다(최소 오늘까지).`,{shelfCut:1}],
['nightmarket','야시장','게이트 거리에 야시장이 열렸다. 사람도 많고 자릿세도 붙었다.',e=>`오늘 손님 수 ${e.visitors>=0?"+":""}${e.visitors}명. 운영비에 ${e.overheadAdd}G가 더해진다.`,{visitors:3,overheadAdd:60}],
['draft','원정 징발령','길드가 모험가 몇 명을 징발해 갔다. 남은 사람 몫이 커졌다.',e=>`오늘 원정 결과의 손님 소지금 획득이 ${pct(e.reward-1)}% 늘어난다. 손님 수 ${e.visitors}명.`,{reward:1.4,visitors:-1}],
['clearance','본사 재고 떨이','본사 창고 정리 날이다. 싸게 주지만 고를 수는 없다.',e=>`오늘 모든 상품의 발주 매입가가 ${pct(1-e.price)}% 낮아진다. 발주 후보는 ${-e.offers}칸 줄어든다.`,{price:.75,offers:-3}],
['eliteorder','정예 토벌령','왕도가 정예 토벌령을 내렸다. 게이트가 험해진 만큼 배우는 것도 많다.',e=>`오늘 게이트 요구 전력이 ${pct(e.danger-1)}% 오르고, 원정 경험치가 ${pct(e.xpMult-1)}% 늘어난다.`,{danger:1.15,xpMult:1.5}],
['heatwave','폭염','진열대 유리가 뜨겁다. 음료 칸 앞에서만 사람들이 오래 서 있다.',e=>`오늘 손님의 음료 구매 의사 +${pct(e.drinkDemand)}%p. 음료의 발주 매입가는 ${pct(e.categoryPrice.drink-1)}% 오른다.`,{drinkDemand:.25,categoryPrice:{drink:1.35}}],
['gateclosed','게이트 임시 폐쇄','경비대가 게이트 하나에 밧줄을 쳤다. 그쪽으로 가려던 모험가들이 다른 줄에 선다.',()=>"오늘 열린 게이트 중 1곳이 폐쇄된다.",{closeGate:1}],
['trainingweek','길드 훈련 주간','교관들이 게이트 앞에 진을 쳤다. 배우는 건 많은데 챙겨 오는 건 적다.',e=>`오늘 원정 경험치가 ${pct(e.xpMult-1)}% 늘고, 원정 결과의 손님 소지금 획득은 ${pct(1-e.reward)}% 줄어든다.`,{xpMult:1.5,reward:.7}],
['nearexpiry','유통기한 임박 특가','본사가 날짜 임박 상품을 싸게 돌렸다. 스티커 날짜가 오늘이다.',e=>`오늘 모든 상품의 발주 매입가가 ${pct(1-e.price)}% 낮아진다. 오늘 발주로 입고한 상품은 오늘까지만 팔 수 있다.`,{price:.6,sameDayStock:1}],
['safegates','게이트 안정화 작업','길드 공병대가 밤새 게이트를 다졌다. 안쪽이 조용해진 만큼 챙길 것도 적다.',e=>`오늘 모든 게이트가 티어 I로 열린다. 원정 결과의 손님 소지금 획득은 ${pct(1-e.reward)}% 줄어든다.`,{tierOne:1,reward:.6}]
].map(([id,name,reveal,copy,effects,weight=1])=>Object.defineProperties({id,name,reveal,effects,weight},{
 description:{get(){return copy(this.effects);},enumerable:true},describe:{value:copy}
})),
/* META_v2.8 §RETIRED v2.7 FRANCHISE SYSTEM: the Start Contract table is retired and lives at
   archive/inactive/v2_7_franchise/contracts.js. Nothing active read it any more. A stale v8
   save may still carry a `run.contract` string; it is dormant payload and changes nothing. */
};
/* DUNGEON_HAZARD / ECONOMY_ORDER §GREAT SUCCESS: signal and roll share the margin; ordinary Gate store rewards follow the Day band, Deep pays none. */
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

/* BOSS §BASELINE POWER / participant-side rules: current approved tuning. */
G.DATA.bossTuning={
 prideCombatFactor:0.92, // PRIDE: every participant’s Final combat factor
 envyStatFactor:0.92,           // ENVY: the single ace's four Stats x this
 greedRevenueTarget:18800,      // GREED: cumulative gross sales the Run is measured against
 greedShortfallCap:15,          // GREED: the most that a total shortfall can add to Boss Power
 /* GLUTTONY v2.7: the Rare+ threshold is superseded. EVERY positive Core-Stat contribution
    that came from an Item is halved, whatever its Rarity, after the Item-side amplification
    has produced that contribution. No Rarity threshold remains. */
 gluttonyStatFactor:0.50,       // GLUTTONY: positive Item Core-Stat contribution x this
 lustStatFactor:0.95,           // LUST: a non-regular participant's four Stats x this
 firePairPower:12,              // BOSS §BASELINE POWER: applied before the shared multiplier.
 finalPowerFactor:.95,
 slothBossPower:[267,252,228,199] // SLOTH: effective Boss Power by break count [0,1,2,3]
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
 {maxDay:24,weights:[46,27,17, 9,1]},
 {maxDay:29,weights:[40,25,19,15,1]},
 {maxDay:30,weights:[34,24,21,20,1]}];
// EVENT: shared fixed rules; descriptions and their consumers read the same values.
G.DATA.eventRules={auditMinimum:6,auditPerItem:5,auditMaximum:100,blackmarketPrice:1.35,pilgrimageMin:1,pilgrimageMax:3,promoUnits:2};
G.DATA.balance={finalHazardThreat:28,finalGapPenalty:2,finalRoll:{lo:.92,hi:1.08},loyaltyRevisit:.03,returnLoyalty:1,paidVisitLoyalty:1,visitWallet:{perLevel:4,min:30,max:70},awayWallet:{perLevel:2,base:25,maxDays:3},offerSameItemMax:2,offerCounterMax:4,wallVisitorChance:.35,operating:60,frugalThreshold:120,halfPriceSupport:50,bossPower:240,combatNoise:.12,rerollBase:50,golemCombat:.90,
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
G.DATA.pricing={overcharge:{label:'바가지',mult:1.5,intentMult:1.5,intent:-.16,loyalty:-4,refusalLoyalty:-2},full:{label:'정가',mult:1,intentMult:.65,intent:0,loyalty:1,
  /* ECONOMY_ORDER §PURCHASE INTENT: only 정가 receives the positive affordability bonus. */
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
