# RELIC

DOC=RELIC
OWNER=relic,store_build,utility,foundation,hybrid,keystone

DOC_VERSION=2.4.0
CANONICAL_SET=GUILD24_CANONICAL_v2.4.0


## KEY
windows=[D0,D5,D10,D15,D20,D25,D30]
maxOwned/run=7
candidates/window=3

D0:
cost=0
pick<=1
eligible=Foundation

D5+:
currency=G
buy<=1
defer=YES
baseEligible=[Foundation,Hybrid,Utility]
KeystoneEligible=D10+
KeystoneStart=D10
KeystoneSeparateHardRate=NO

pool=30
Foundation=12
Hybrid=8
Keystone=6
Utility=4

buildAxes=[Rotation,VIP,Premium,Expedition,Fresh,Customer]

candidateRerollByReload=NO
ownedNonstackableRepeat=NO
immediateUnboughtRepeat=NO

## ROLE
RELIC =
`이번 Run에서 어떤 편의점을 운영할 것인가`

Relic responsibilities:
- 발주 방식 변화
- 재고 운용 방향 변화
- 고객 가치 판단 변화
- 가격 전략 변화
- 원정 준비 우선순위 변화
- Run별 Store Build 형성

Relic should modify existing core loops rather than create isolated mini-systems.

Division:
JOB=BaseStats+Growth
TRAIT=CharacterVariation
RELIC=StoreBuild
ITEM=ExpeditionPreparation

## ACQUISITION WINDOWS

### D0
timing=before first business
cand=3
pick<=1
cost=0
eligible=Foundation

Goal:
첫 선택부터 Run 방향을 제안.

### D5 / D10 / D15 / D20 / D25
cand=3
buy<=1
currency=G
firstReveal=FOCUSED_ONCE_AT_WINDOW_CREATION
defer=YES

새 Milestone Window가 생성되면
해당 Day의 첫 유효 Management 진입에서 후보 3개를 1회 Focused Reveal한다.

Player may:
- 구매
- 나중에 결정

`나중에 결정`은 기존 Defer다.
후보/가격은 바뀌지 않는다.

### D30
cand=3
buy<=1
currency=G
timing=before final expedition lock
eligible=futureRelevantOnly
firstReveal=FOCUSED_ONCE_AT_WINDOW_CREATION
defer=YES

D30 후보는 Final 준비/원정에 실제 의미가 있어야 한다.
Final lock 전에 해당 Window의 1회 Focused Reveal이 보장되어야 한다.

## WINDOW STATE

At window creation:
generate(candidates,prices) once

persist:
- milestoneDay
- candidateIds
- candidatePrices
- purchased
- expiryDay
- focusedRevealSeen

save/load => same(candidates,prices,state)
reload => no reroll

focusedReveal:
- D5/D10/D15/D20/D25/D30의 새 Window는 1회만 Player에게 명확히 보여준다.
- Save/Reload로 Focused Reveal을 반복 재생하거나 후보를 다시 뽑을 수 없다.
- D0는 영업 전 Relic 선택 자체가 시작 Flow이므로 중복 Reveal을 추가하지 않는다.

defer:
- 구매하지 않고 닫기 가능
- window expiry 전 다시 열기 가능

reopenAllowed:
- Morning
- Order
- Store Management

reopenBlocked:
- Active Sale
- Night Resolution

ownedRelicQuickView:
mode=READ_ONLY
availablePhases=[Morning,Order,Sale]

Rules:
- 이미 보유한 점포지원의 이름/효과/조건은 Morning/Order/Sale에서 빠르게 확인 가능
- Sale에서는 읽기만 가능
- Quick View가 Relic 구매/Defer timing을 우회하지 않는다

expiry:
next relic window begins

Example:
D5 offer valid through D9
D10 => new window

## CANDIDATE RULES

withinWindowDuplicate=NO

owned nonstackable relic:
futureEligible=NO

unbought relic:
futureEligible=YES
immediateNextWindowRepeat=NO

offer diversity:
prefer >=2 distinct Primary Build directions when practical

buildBias:
soft only

Rule:
현재 보유 Build와 관련된 후보 Weight를 약하게 높일 수 있으나
필수 Piece를 보장하지 않는다.

Keystone:
- D0/D5 eligible=NO
- D10/D15/D20/D25/D30 eligible=YES
- no separate fixed Keystone appearance probability is added
- eligible Keystone competes in the normal candidate pool
- related build pieces may softly raise weight
- guaranteed completion=NO

## POOL ARCHITECTURE

total=30

Foundation=12
- 6 Primary Build × 2
- early direction setters
- D0 eligible

Hybrid=8
- connects 2 Build axes
- pivot/flex value

Keystone=6
- 1 per Primary Build
- build engine/completion piece
- eligible from D10

Utility=4
- general support
- should not erase build identity

## BUILD COMPLETION FEEL

relatedPieces:
1 = direction noticed
2 = operation meaningfully shifts
3 = clear build engine
4 = strong completed build
5+ = rare high-roll run

High-roll synergy is valid roguelite power.
Do not automatically nerf a good seed into average play.

Typical final mix:
mainBuild=3–4
hybridSupport=1–2
utility=1–2

All 7 relics do not need same tag.

## BUILD AXES

### ROTATION
identity=high volume / fast inventory turnover

questions:
- bulk buy?
- cheap stock depth?
- waste risk?
- throughput?

strength:
sales count / rotation / cashflow

cost:
inventory exposure / lower single-sale margin

### VIP
identity=long-term investment in selected returning NPCs

questions:
- who deserves discount/investment?
- who should be kept alive?
- who can become future high-value customer?

strength:
wallet / loyalty / revisit / boss roster

cost:
early cashflow / death opportunity cost

### PREMIUM
identity=high-margin expensive sales

questions:
- stock expensive items?
- who can afford them?
- attempt 150%?

strength:
large margin spikes

cost:
high COGS / refusal / stuck inventory / capital pressure

### EXPEDITION
identity=prepare around current Gate risks

questions:
- which known Hazard matters?
- Counter vs Insurance vs generic stats?

strength:
survival / difficult Gate readiness

cost:
less direct generic economy power

### FRESH
identity=Food/Drink supply / native-stat / flexible-prep operation

questions:
- shelf life?
- Supply burden?
- Food/Drink volume?
- native Stat/recovery value?
- can flexible Food/Drink prep cover enough without replacing specialist gear?

strength:
Supply efficiency / shelf-life control / broad usability / flexible prep

cost:
expiry / weaker specialist reliability / limited Insurance access

Fresh must not become a blanket multiplier that erases FieldGear specialists.

### CUSTOMER
identity=who comes to the store

questions:
- more visitors?
- more new customers?
- more returners?
- customer mix?

strength:
hybridizes with all builds

cost:
little direct Item power / depends on pool state

Pacing/attachment guardrail:
Customer value should come from meaningful traffic/composition tradeoffs,
not merely from forcing the Player through more repetitive customer interactions.
Visitor-count tuning must preserve the normal trusted-regular target and active-cap rules.
If raw visitor volume materially damages Run pacing or NPC attachment in playtest,
rebalance the existing Customer effects rather than adding another workload system.

## RELIC BLUEPRINTS

### ROTATION — Foundation
1. 묶음발주 계약
tag=Rotation
effect=bulk ordering efficiency for same SKU
trigger=quantity threshold
purpose=reward inventory-risk-taking

2. 회전 진열대
tag=Rotation
effect=high sales volume today -> next-day logistics benefit
purpose=sales->order->sales loop

### VIP — Foundation
3. 단골 스탬프 기계
tag=VIP
effect=paidPurchase loyalty gain up
free/event/special supply excluded

4. 회원 관리대장
tag=VIP
effect=returning adventurer visitor weight up
identityPreReveal=NO

### PREMIUM — Foundation
5. 프리미엄 쇼케이스
tag=Premium
effect=Rare+ high-value item offer weight up

6. 길드 보증 진열대
tag=Premium
effect=limited daily affordability/willingness relief for expensive items
150AutoSuccess=NO
playerReceivesChosenPrice=YES

### EXPEDITION — Foundation
7. 원정 위험 게시판
tag=Expedition
effect=known active Gate/Hazard-relevant counter-role offer weight up
unknownHazardReveal=NO
specificItemGuarantee=NO

8. 긴급보급 선반
tag=Expedition
effect=Medical/FieldGear/Insurance availability or order quantity up

### FRESH — Foundation
9. 대형 냉장고
tag=Fresh
effect=eligible Food/Drink shelf life up

acquisition:
- existing non-expired eligible stock gets one-time extension
- future eligible stock enters with extended shelf life
dailyRepeatedExtension=NO
infinitePreservation=NO

10. 즉석식품 코너
tag=Fresh
effect=Food/Drink native core effect value up
boostScope=[Supply,nativeStat,nativeRecovery]
notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect]
newCombatSystem=NO

### CUSTOMER — Foundation
11. 길드 전광판
tag=Customer
effect=visitor count up
livingNpcCapIgnored=NO

12. 신입 모집 게시판
tag=Customer
effect=new adventurer visitor weight up
lateRookieMustRemainViable=YES

### HYBRID
13. 공동구매 전단
tags=[Rotation,Customer]
effect=more expected visitors -> better bulk-order economy

14. 단골 묶음혜택
tags=[Rotation,VIP]
effect=returning customer buys multiple paid items -> small extra loyalty
consumerSlotRule=UNCHANGED

15. 프리미엄 멤버십
tags=[VIP,Premium]
effect=high-loyalty customer price resistance on expensive/Rare items softened
150AutoSuccess=NO

16. 귀환 적립제
tags=[VIP,Expedition]
effect=paid returning customer survives expedition -> long-term customer value up
channel=prefer existing loyalty/wallet/revisit systems

17. 원정 도시락 코너
tags=[Fresh,Expedition]
effect=Food/Drink expedition-relevant effect strengthened when it matches current known need
matchingNeed=[explicitHazardCounter,activeSupplyBurden]
HazardCounterBoostOnlyIfMatching=YES
SupplyBoostOnlyIfSupplyBurdenActive=YES
universalHazardSolution=NO

18. 냉장 쇼케이스
tags=[Fresh,Premium]
eligible=Uncommon+ Food/Drink
effect=eligible Food/Drink offer weight up + shelf-life risk relief
singleSkuDependency=NO

19. 길드 납품 인증
tags=[Premium,Expedition]
effect=Rare+ expedition-response items gain premium-economy viability

20. 새벽 공동배송
tags=[Fresh,Rotation]
effect=bulk same-SKU Food/Drink order efficiency up
expiryRisk=REMAINS

### KEYSTONE
21. 물류 본부계약
tag=Rotation
effect=strong previous-day sales -> major next-day bulk-order efficiency

22. 평생 단골제
tag=VIP
effect=high-loyalty survival/revisit accelerates wallet/revisit value
snowballCap=required

23. 왕도 프리미엄 인증
tag=Premium
effect=successful Rare+ 150% sale -> extra premium commission
refusal/inventoryRisk=REMAINS

24. 길드24 원정전문점 인증
tag=Expedition
effect=if known active Gate hazards exist, order offers include >=1 valid Counter role
specificItemGuarantee=NO
multiHazardChoiceRandomness=REMAINS

25. 24시간 신선체계
tag=Fresh
effect=strong Food/Drink shelf-life + native core-effect boost
boostScope=[Supply,nativeStat,nativeRecovery]
notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect]
infiniteShelfLife=NO

26. 지역 거점점 계약
tag=Customer
effect=large visitor increase + increased operating burden
livingNpcCapIgnored=NO

### UTILITY
27. 후방 창고 증설
effect=inventory capacity up

28. 본사 추가발주권
effect=daily order offer count up

29. 발주 교환권
effect=매일 첫 canonical Full-offer Reroll 비용 0G
firstRerollFree=YES
freeUseConsumesFirstRerollStep=YES
dailyReset=YES
singleOfferSwap=NO
requirements:
- applies to canonical full-offer reroll
- after the free first use, same-Day Reroll continues from the next normal cost step
- PASS3 starting sequence with Relic: 0G -> 60G -> 120G -> 240G ...
- current eligibility/coverage/rarity rules preserved
- rerollAdvancesPity=NO
- pity farming=NO

30. 운영 효율 매뉴얼
effect=overhead reduction
buildDefiningPower=LOW

## ITEM / BUILD COMPATIBILITY

Relic build filters must be supported by the active Item catalog, not only by description text.

Rotation:
- low-rarity useful specialists must remain sellable/valuable into late run
- bulk economics should have enough cheap/common SKUs to create real choices

Premium:
- Rare+ pool must contain enough distinct roles/price points to support repeated premium play
- Rare+ must not become universal superiority

Expedition:
- uses canonical 9 Hazard matrix only
- Counter availability must preserve Main vs Alternative-route choice
- Supply Burden is not a Hazard; Food/Drink Supply belongs to Fresh or Fresh+Expedition interaction

Fresh:
- active Food/Drink pool must span multiple prices/rarities/roles
- native core boost means Supply + native Stat/recovery only unless Relic explicitly says otherwise
- specialist FieldGear must remain the more reliable dedicated Counter

Customer/VIP:
- may amplify demand/customer value but must not create hidden Item-Job affinity

Build-filtered Relics must not depend on one single eligible SKU.

## ACTIVE POOL BOUNDARY

activeRelicPool=the 30 canonical blueprints in this document only

nonCanonicalFacilityActive=NO
excludedFacilityNames=[포션 냉장고,마석 충전대,상권 분석대]

No excluded facility effect may modify Order/Item/NPC/Dungeon resolution.

## PRICE

D0=free

D5+:
price=basePrice × limitedRandomBand
randomBand≈±15–20% starting point
priceFixedForWindow=YES

relative direction:
Foundation < Hybrid/Utility < Keystone

Exact base prices=PASS3. Initial v2.4 implementation retains current canonical-compatible Source base prices, then rebalances after full-run simulation/playtest.
Price should follow actual ROI, not label alone.

## GOLD ROLE

Gold tension:
current cash
vs
NPC investment
vs
store investment

price modes:
150%=current Gold focus
100%=stable operation
50%=NPC future-value investment
Relic=store future-value investment

Canonical economy:
-> ECONOMY_ORDER

## INFORMATION

Relic description must make clear:
- what changes
- trigger/condition
- meaningful limit
- price when currently purchasable

Material hidden modifier=NO

Internal design taxonomy:
- Foundation
- Hybrid
- Keystone
- Utility
- Rotation / VIP / Premium / Expedition / Fresh / Customer Build Axis

playerFacingTaxonomy=NO

Do not show Player-facing labels such as:
- `신선식품 · 기반`
- `단골 육성 · 기반`
- `고마진 · 키스톤`

These are Director/implementation organization terms.
Player should discover build synergy from actual effects and combinations.

Exact internal coefficient may stay hidden when not needed,
but effect existence/condition must be player-readable.

## SAVE CONTRACT

Persist at minimum:
- owned relic IDs
- active relic window
- candidates
- prices
- purchased/deferred state
- immediate-repeat cooldown state

Save/Load must not become an offer reroll method.

## PASS3 METRICS

Per Relic:
- offer rate
- pick/purchase rate
- average purchase day
- ROI
- final Gold
- sales mix
- NPC survival
- boss outcome

Per Run:
- build-piece count distribution [0,1,2,3,4,5+]
- candidate tag diversity
- same-relic repeat rate
- utility share
- Keystone timing
- excessive build lock-in
- no-clear-build viability

Reject:
- dead picks
- automatic picks
- universal snowball
- mandatory Relic purchase
- no-Relic always optimal
- one Build always dominates

## RELATED
run/save -> CORE_RUN
final expedition -> FINAL_EXPEDITION
gold/order/reroll -> ECONOMY_ORDER
sale phase -> SALE
npc value -> NPC_TRAIT
