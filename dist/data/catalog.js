/* Content definitions. New items use the same declarative effect vocabulary. */
(function(G){
/* `metaUnlock` is how many distinct Bosses must have been beaten before this may appear.
   ITEM declares exactly one meta-locked Item, so every other entry leaves it unset. */
const item=(id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock=null)=>({id,name,rarity,buy,sell,category,days,icon,brand,description,effects,metaUnlock});
G.DATA={brand:{name:'GUILD24',korean:'길드24',company:'길드리테일',slogan:'던전 가기 전, 길드24.',branches:['제7게이트점','독거미점','북부게이트점','왕도외곽점']},
rarities:['일반','고급','희귀','영웅','전설'], npcRarities:['평범','유망','희귀','영웅','전설'],
items:[
/* ITEM_v2.7.0 ACTIVE CATALOG - exactly 40, in the owner's own order. Categories are the
   six v2.7 identities: food / drink / potion / gear / insurance / special. `medical`,
   `tool`, `magic` and the `fresh` alias are gone; 붕대 and 마석 보조배터리 are retired and
   are NOT converted into anything on an older save. Shelf lives and flavour carry over
   from the previous Item wherever the identity is unchanged. */
item('rice','삼각김밥',0,35,70,'food',2,'rice','용사픽','김 끝을 잡고 천천히.',{survival:6,supply:5}),
item('water','생수',0,40,85,'drink',5,'water','용사픽','뚜껑까지 챙겨 돌아오세요.',{survival:10,supply:2}),
item('ramen','컵라면',0,45,90,'food',4,'ramen','원정한끼','뜨거운 국물과 약간의 냉기 저항.',{cold:10,supply:5}),
item('bar','간단 도시락',1,85,180,'food',2,'bar','용사픽','반찬은 단출하지만 빈칸은 없다.',{survival:10,supply:6,loot:0.2}),
item('choco','초코바',0,30,65,'food',5,'choco','용사픽','주머니에서 녹기 전에 드세요.',{mobility:8,supply:4}),
item('coffee','캔커피',0,40,85,'drink',5,'coffee','MANA+','발걸음이 조금 가벼워진다.',{mobility:12,supply:2}),
/* Replaces the retired 붕대 slot as a plain Spirit route - not a fear/dark/whiteout Counter. */
item('herbtea','진정 허브티',0,40,85,'drink',5,'herbtea','MANA+','마시기 전에 심호흡부터 하는 손님이 많다.',{spirit:15,supply:2}),
item('potion','하급 포션',0,70,140,'potion',7,'potion','귀환안심','차갑게 보관하지 않아도 됩니다.',{combat:8,potion:1}),
item('ice','얼음컵',0,30,65,'drink',4,'ice','용사픽','컵에 얼음만 가득 담아 판다. 녹기 전에 도착하길.',{fire:10,supply:1}),
item('battery','랜턴 건전지',0,45,95,'gear',0,'battery','귀환안심','흔들면 조금 더 간다. 근거는 없다.',{dark:16}),
item('rope','경량 로프',0,50,105,'gear',0,'rope','귀환안심','매듭을 풀고 감았다. 다시 묶어야 한다.',{bind:16}),
item('candy','집중 사탕',0,35,75,'food',5,'candy','용사픽','시험 전에도 잘 팔린다.',{fear:10,supply:3}),
item('lava','불룡볶음면',1,65,135,'food',4,'ramen','원정한끼','용 그림은 장식이 아니다.',{survival:8,cold:6,supply:4}),
item('energy','에너지드링크',1,70,150,'drink',5,'energy','MANA+','오늘 쓸 기운을 당겨왔다.',{mobility:15,supply:2}),
item('wine','용사의 곡주',1,60,130,'drink',5,'wine','원정한끼','공포를 잊게 한다. 발걸음은 살짝 꼬인다.',{fear:18,mobility:-4,supply:1}),
/* The Aftercare rewrite of this effect line is owned by the Insurance step; this row moves
   only its identity (Insurance / Uncommon / 100-210). */
item('kit','구급키트',1,100,210,'insurance',7,'kit','귀환안심','열어 본 사람은 대개 그날을 오래 기억한다.',{survival:10,aftercare:1}),
item('mask','방진마스크',1,65,135,'gear',0,'mask','귀환안심','쓰고 나면 얼굴 자국이 한참 남는다.',{poison:12}),
item('heat','핫팩',1,60,130,'gear',0,'heat','귀환안심','주머니 안에서 겨울을 버틴다.',{cold:18}),
item('cloak','방수망토',1,75,160,'gear',0,'cloak','귀환안심','부식과 진창에 두루 쓴다. 어느 쪽도 전문가만은 못하다.',{corrosion:6,mire:6}),
item('coating','부식 방지 코팅제',1,70,150,'gear',0,'coating','귀환안심','장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.',{corrosion:18}),
item('boots','원정용 장화',1,65,135,'gear',0,'boots','귀환안심','밑창에 진흙이 잘 붙지 않는다.',{mire:16}),
item('snowgoggles','설원 고글',1,60,125,'gear',0,'goggles','귀환안심','눈보라 속에서도 앞이 남는다.',{whiteout:16}),
item('highpotion','상급 포션',2,150,300,'potion',7,'potionHigh','길드초이스','작은 병에 진하게 담았다.',{combat:16,potion:1}),
/* Dedicated Poison specialist only: no generic Core Stat, and no poison cure subsystem. */
item('antidote','농축 해독제',2,80,170,'gear',7,'antidote','귀환안심','한 모금이면 충분하다고 적혀 있다. 두 모금은 권하지 않는다.',{poison:18}),
item('stone','귀환석',2,260,520,'insurance',0,'stone','귀환안심','사망·중상 위기에서도 같은 수치로 한 번 더 돌아올 기회가 생긴다.',{escape:0.5}),
/* Takes the retired 마석 보조배터리 catalogue slot, but NOT its non-expiring shelf behaviour:
   it keeps the ordinary Potion-family shelf life. */
item('midpotion','중급 포션',1,110,230,'potion',7,'potionMid','귀환안심','하급은 불안하고 상급은 비쌀 때.',{combat:12,potion:1}),
item('premium','길드 특제 도시락',2,160,340,'food',2,'lunch','길드초이스','뚜껑이 잘 안 닫힌다.',{survival:14,supply:7,loot:0.4}),
item('ion','쿨링 이온음료',2,80,170,'drink',5,'ion','MANA+','얼음컵만큼 시원하진 않지만 오래 간다.',{fire:18,supply:1}),
item('tree','세계수 생환부적',3,600,1200,'insurance',0,'amulet','길드초이스','잎맥이 아직 마르지 않았다.',{revive:1}),
item('coupon','황금 1+1 쿠폰',4,500,1000,'special',0,'coupon','길드초이스','본사 도장이 선명하다. 유효기간은 적혀 있지 않다.',{duplicate:1},1),
/* Epic Family hybrids: one slot answers a Family's pair, always below the dedicated Main
   specialist on each covered Hazard. FIRE keeps one Hazard plus its combat identity rather
   than inventing a second FIRE Hazard, and its 투력 +6 is an explicit catalogue exception. */
item('spiderkit','거미줄 방호세트',3,150,320,'gear',0,'spiderkit','귀환안심','손목을 앞으로 내밀어도 아무것도 나오진 않는다.',{poison:12,bind:12}),
item('slimesuit','연금 방수슈트',3,150,320,'gear',0,'slimesuit','귀환안심','방수 테스트에 쓴 액체는 묻지 않는 게 좋다.',{corrosion:12,mire:12}),
item('cryptlantern','성화 랜턴',3,150,320,'gear',0,'cryptlantern','귀환안심','성당 납품용이었는데 어쩌다 편의점까지 왔다.',{fear:12,dark:12}),
item('snowvisor','백설 방한고글',3,150,320,'gear',0,'snowvisor','귀환안심','김은 안 서린다. 눈썹은 얼 수 있다.',{cold:12,whiteout:12}),
item('magmagear','마그마 냉각장비',3,160,340,'gear',0,'magmagear','귀환안심','설명서 첫 줄: 마그마에 직접 넣지 마시오.',{fire:14,combat:6}),
/* Epic top-end preparation: what one slot can do late in a Run, not a third Bag slot. */
item('battlelunch','영웅 결전 도시락',3,210,440,'food',2,'battlelunch','길드초이스','동쪽 나라의 인심 좋은 어머님이 떠오르는 구성.',{survival:18,supply:9}),
item('herobar','왕도 천연암반수',3,185,390,'drink',5,'herobar','길드초이스','왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.',{survival:20,supply:2}),
item('hyperenergy','초고속 에너지드링크',3,160,340,'drink',5,'hyperenergy','MANA+','마시고 나면 계산대보다 먼저 문을 나선다.',{mobility:18,supply:2}),
item('sageelixir','대현자 허브엘릭서',3,160,340,'drink',5,'sageelixir','길드초이스','한 모금 마시면 괜히 턱을 쓰다듬게 된다.',{spirit:20,supply:2}),
item('toppotion','최상급 포션',3,190,400,'potion',7,'toppotion','길드초이스','병은 작다. 값은 작지 않다.',{combat:24,potion:1})
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
['brave','용감함','mixed',{fear:6,escape:-0.06},{fear:'benefit',escape:'cost'}],
['coward','겁쟁이','mixed',{fear:-6,escape:0.19,loot:-0.15},{fear:'cost',escape:'benefit',loot:'cost'}],
['eater','대식가','mixed',{foodMult:1.3,foodSupplyDelta:-1},{foodMult:'benefit',foodSupplyDelta:'cost'}],
['small','소식가','mixed',{foodMult:0.8,foodSupplyDelta:1},{foodMult:'cost',foodSupplyDelta:'benefit'}],
['careful','신중함','mixed',{injuryRisk:-0.04,loot:-0.10},{injuryRisk:'benefit',loot:'cost'}],
['reckless','무모함','mixed',{combatPercent:0.10,escape:-0.08,injuryRisk:0.035},{combatPercent:'benefit',escape:'cost',injuryRisk:'cost'}],
['greed','탐욕','mixed',{loot:0.3,escape:-0.07},{loot:'benefit',escape:'cost'}],
['frugal','구두쇠','negative',{priceBias:-0.16},{priceBias:'cost'},'비싼 상품일수록 구매를 망설입니다.'],
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
['grit','악바리','mixed',{injuredCombatPercent:0.20,fatigue:1},{injuredCombatPercent:'benefit',fatigue:'cost'},'일반 부상의 투력 페널티를 대체하여 투력이 증가합니다.'],
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
/* BOSS_v2.7 §BOSS IDENTITY TERMINOLOGY OVERRIDE: the inherited v2.5 player-facing name is
   superseded. The internal id is unchanged; only what the player reads moved. */
['GLUTTONY','탐식','탐식의 마왕 글러트니'],
['LUST','색욕','색욕의 마왕 러스트'],
['SLOTH','나태','나태의 마왕 슬로스']
].map(([id,sin,name])=>({id,sin,name})),
facilities:[],
events:[
['logistics','물류대란','길이 막혔다. 물건은 왔다. 평소보다 비쌀 뿐이다.','오늘 매입가 +15%',{price:1.15}],
['oneplus','본사 1+1 행사','본사에서 행사 공문이 내려왔다.','지정 상품 1종 · 발주 수량 2배',{double:1}],
['pilgrimage','게이트 순례주간','순례 행렬이 게이트 구역을 지나간다.','오늘 1~3명의 모험가가 예정된 목적지가 아닌 다른 열린 게이트로 향할 수 있습니다.',{pilgrimage:1}],
['overflow','몬스터 범람','게이트 밖까지 소리가 들린다.','오늘 게이트 요구 전력 +12% · 원정 보상 +30%',{danger:1.12,reward:1.3}],
['potionPrice','포션 가격 폭등','포션 값이 또 올랐다.','오늘 포션 매입가 +35%',{potionPrice:1.35}],
['coldwave','한파','북쪽 바람이 게이트 구역까지 내려왔다.','적용 가능한 게이트에 냉기 위험 추가',{cold:1}],
['shortage','포션 공급 중단','포션 상자가 오지 않았다.','오늘 포션 발주 등장 확률 크게 감소',{potionWeight:0.08}],
['rookie','신입 모험가 시즌','길드 게시판에 새 이름이 늘었다.','오늘 새로운 모험가 1명이 찾아옵니다.',{rookie:1}],
['royal','왕립 기사단 방문','왕립 기사단 마차가 멈췄다.','오늘 고레벨 · 희귀 신규 모험가 합류 기회',{royal:1}],
['blackmarket','암시장 상인','정문으로 들어온 사람은 아니다.','오늘 희귀 이상 특별 발주 1건 · 매입가 +35%',{blackmarket:1}],
['audit','본사 재고 감사','본사에서 장부를 보러 왔다.','누적 폐기 6건부터 1건당 5G 감사 비용 · 최대 100G',{audit:1}],
['festival','왕도 축제','왕도 축제가 시작됐다.','오늘 음식 · 음료 구매 의사 +20%p',{foodDemand:0.2}],
['strike','길드 파업','길드 정문에 현수막이 걸렸다.','오늘 방문객 -1',{visitors:-1}],
['unknown','미확인 게이트','지도에 없던 문이 열렸다.','오늘 고위험 · 고보상 임시 게이트 1개 추가',{unknown:1}],
['tasting','본사 반값 행사','오늘 반값은 본사가 한 번 낸다.','오늘 첫 50% 판매 · 본사 지원 +50G',{tasting:1}],
['poisonfog','독안개','게이트 주변에 누런 안개가 깔렸다.','적용 가능한 게이트에 독 위험 추가',{poison:1}],
['caravan','보급 상단 도착','보급 상단이 하루 일찍 도착했다.','오늘 발주 후보 +2',{offers:2}],
['payday','길드 급여일','오늘은 길드 급여일이다.','오늘 방문 모험가 구매 예산 +20%',{wallet:1.2}],
['clinic','치유소 휴무','치유소 앞에 휴무 팻말이 붙었다.','오늘 의료 상품 구매 의사 +20%p',{medicalDemand:0.2}],
['wastecover','본사 폐기 지원','오늘 폐기비는 본사 부담이다.','오늘 폐기 비용 0G',{wasteFree:1}],
['bard','늙은 음유시인','늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.','오늘 방문객 +2',{visitors:2},.35],
['nightshift','본사 야간 근무 수칙','1. 마감 전 창고를 확인한다.\n2. 폐기 상품은 따로 둔다.\n3. 뒷문은 잠근다.\n5. 새벽 두 시 이후에는 창밖을 보지 않는다.\n4번 규정은 없습니다.','오늘 점포 유지비 0G',{overheadFree:1},.35]
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
   Deep Expeditions still pay 0. 100/200/300 are provisional and re-measured. */
G.DATA.greatSuccess={signalMargin:.26,chanceSlope:.8,chanceCap:.30,
 storeGoldByBand:[{maxDay:10,gold:100},{maxDay:20,gold:200},{maxDay:30,gold:300}]};
G.DATA.deepTuning={powerFactor:1.5,threeOccurrenceChance:.5,
 /* 원정 후원금 = sponsorBase x (1 + rarityStep x rarity) x (1 + levelStep x (Level - 1)),
    rounded to 10G. Who you send is the decision, so the price is the NPC's rarity and current
    Level and nothing else - not the Gate Tier, not the Day, not the Deep Power, not any item
    price, and not a hidden worth score. Stage 9 measurement baseline. */
 sponsorBase:350,sponsorRarityStep:.20,sponsorLevelStep:.05,sponsorRounding:10,
 successExp:40,greatExp:90,successWallet:60,greatWallet:150};

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
 greedShortfallCap:12,          // GREED: the most that a total shortfall can add to Boss Power (v2.7)
 /* GLUTTONY v2.7: the Rare+ threshold is superseded. EVERY positive Core-Stat contribution
    that came from an Item is halved, whatever its Rarity, after the Item-side amplification
    has produced that contribution. No Rarity threshold remains. */
 gluttonyStatFactor:0.50,       // GLUTTONY: positive Item Core-Stat contribution x this
 lustStatFactor:0.95,           // LUST: a non-regular participant's four Stats x this
 slothBossPower:[225,210,190,165] // SLOTH v2.7: effective Boss Power by break count [0,1,2,3]
};
/* easterChance is an approved STARTING VALUE, not a settled one: Stage 9 measures how often a
   Rare Reference identity actually turns up per Run and reports candidates. Do not retune it here. */
/* fireCombat is the §O easing of the fire Family's combat requirement. It is named here rather
   than held as a constant inside shop.js so a balance candidate can be compared against it from
   the harness without editing production. The value is unchanged by that move. */
/* ECONOMY_ORDER_v2.7 §ORDER RARITY PROGRESSION. The inherited fixed all-Run table is
   superseded: the ORDER offer Rarity shifts by Day band, so the catalogue itself communicates
   progression and the new Epic preparation Items need no separate D20 hard unlock. Early Epic
   is deliberately possible but rare; Legendary stays exceptional and never scales past 1%.
   Each row is the exact normalized percentage and sums to 100. */
G.DATA.rarityBands=[
 {maxDay:3, weights:[68,24, 7, 1,0]},
 {maxDay:7, weights:[63,25,11, 1,0]},
 {maxDay:12,weights:[58,27,12, 2,1]},
 {maxDay:19,weights:[53,27,15, 4,1]},
 {maxDay:24,weights:[46,26,17,10,1]},
 {maxDay:29,weights:[39,25,19,16,1]},
 {maxDay:30,weights:[34,24,21,20,1]}];
G.DATA.balance={hubOverheadRate:.10,wallVisitorChance:.10,decorationStartGold:300,operating:60,frugalThreshold:120,tastingSupport:50,bossPower:200,combatNoise:.175,rerollBase:50,easterChance:.01,fireCombat:.90};
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
  intentPivot:.36,intentWeight:.5},half:{label:'50% 할인',mult:.5,intentMult:.5,intent:.18,loyalty:6}};

/* Three shapes of the ordering decision, named here so a balance candidate can be measured
   against them from the harness without a production edit: how many candidates a Day offers,
   how much the store can hold, and what it opens with. v2.5 final: 6 candidates, 18 slots and a
   four-item opening shelf. The five-arm ablation kept six candidates - a five-slot sheet cost
   5-8 points of skilled D30 reach and raised rescue dependence by 7 - and took the 18 slots,
   which produce about one capacity decision per eight order Days at almost no survival cost. */
G.DATA.balance.orderOffers=6;G.DATA.balance.warehouse=18;
G.DATA.openingStock=[['rice',1],['water',1],['herbtea',1],['potion',1]];
G.DATA.itemBy=Object.fromEntries(G.DATA.items.map(x=>[x.id,x]));G.DATA.jobBy=Object.fromEntries(G.DATA.jobs.map(x=>[x.id,x]));G.DATA.traitBy=Object.fromEntries(G.DATA.traits.map(x=>[x.id,x]));G.DATA.dungeonBy=Object.fromEntries(G.DATA.dungeons.map(x=>[x.id,x]));G.DATA.bossBy=Object.fromEntries(G.DATA.bosses.map(x=>[x.id,x]));
})(globalThis);
