# RELIC

DOC=RELIC
OWNER=relic,store_support,run_store_build,utility,foundation,hybrid,keystone,sloth_window
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/RELIC_v2.8.0-patch.md,history/RELIC_v2.7.0.md,history/RELIC_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/RELIC.md

## PLAYER-FACING SYSTEM NAME

Player-facing active system name:
    점포지원

Internal source IDs/files may retain relic where changing them adds unnecessary migration/refactor risk.

The Decoration named 프리미엄 쇼케이스 remains unchanged.
Thus 쇼케이스 is no longer reused by these active Store Supports.

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
slothSealChoiceUsesRelicWindow=YES
slothSealBreakGoldCost=0
slothSealBreakConsumesWindowAcquisition=YES

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

## RELIC POWER / BUILD HIERARCHY

Use the project influence hierarchy as:

```text
NPC Base / Level / Growth / Equipment
> Sold Item
> single Store Support
> Event
> Trait
```

Therefore one Relic's same-moment direct expedition contribution should be smaller than one appropriate Item's own contribution.

But Relic is a Run-wide Store Build system. A coherent multi-Relic build may and should exceed one Item through repeated economy/access/growth/item-value effects.

## ACQUISITION WINDOWS

### D0
timing=before first business
cand=3
pick<=1
cost=0
eligible=Foundation

Goal:
첫 선택부터 Run 방향을 제안.

At Run start, the first Store Support choice is the first DAY 0 decision.

The Store Support takeover contains only the support decision and its own compact copy.
It does not carry the D0 Boss objective above the candidate cards.

After one first support is chosen:
- the support commits under existing foundation rules
- the separate D0 Boss-information beat is shown
- ordinary DAY 1 begins only after acknowledgement

Exact first-support copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
Exact flow/order -> CORE_RUN_v2.8.0.md / BOSS_v2.8.0.md.

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
firstReveal=FOCUSED_ONCE_AT_WINDOW_CREATION
defer=YES

Final lock 전에 해당 Window의 1회 Focused Reveal이 보장되어야 한다.

D30 Boss/Final ordering:
- exact Final Family Pair/Hazard Pool is generated and revealed on D25 by `FINAL_EXPEDITION_v2.8.0.md`
- D30 reuses that persisted state
- D30 Relic focused reveal/decision occurs with the already-known persisted Final state
- if Boss=SLOTH, the D30 Seal choice still shares the same D30 Relic window and remains mutually exclusive with Relic acquisition
- Final lock occurs only after the D30 Relic/Seal choice opportunity has been handled

No D30 Family reroll/reveal generation occurs.

### D30 CANDIDATE ELIGIBILITY — DEFAULT INCLUDE / EXPLICIT EXCLUDE

D30 rule:
    every otherwise-eligible Store Support is included by default.

A Store Support is excluded from D30 only when, after acquisition on D30 and before Final Lock,
there is no legal action/state through which that support can change:
- D30 ORDER / Reroll / inventory preparation
- Final participant preparation
- Final participant power / Hazard readiness
- Final result-relevant state

Implementation must therefore use an explicit D30 no-effect exclusion set, not a positive
final-useful inclusion list.

Current explicit D30 no-effect exclusions:
- 단골 스탬프 기계 (stamp)
- 회원 관리대장 (member)
- 길드 보증 진열대 (guarantee)
- 대형 냉장고 (fridge)
- 길드 전광판 (board)
- 신입 모집 게시판 (rookieBoard)
- 공동구매 전단 (groupFlyer)
- 단골 묶음혜택 (memberBundle)
- 프리미엄 멤버십 (premiumMember)
- 귀환 적립제 (returnPoints)
- 길드 납품 인증 (supplyCert)
- 평생 단골제 (lifetime)
- 왕도 프리미엄 인증 (royalCert)
- 지역 거점점 계약 (hub)
- 운영 효율 매뉴얼 (efficiency)

All other current supports are D30-eligible when they satisfy ordinary acquisition eligibility.

Future Store Supports are also D30-eligible by default.
A future support is removed from D30 only by adding it to the explicit no-effect exclusion set after
its actual D30-to-Final usefulness is reviewed.

### SLOTH SEAL-BREAK WINDOW

Canonical Boss rule -> BOSS_v2.8.0.md

When Boss=SLOTH:
- exactly 2 of [D15,D20,D25] are selected as Seal opportunities
- D30 is always a Seal opportunity
- D10 is never a Seal opportunity

At a selected opportunity, this Relic window offers one mutually exclusive acquisition outcome:

A. acquire <=1 normal Relic under the ordinary window rules
B. break 1 Sloth Seal for 0G

Seal Break:
- grants no Relic
- consumes this window's acquisition opportunity
- committed state persists
- cannot be duplicated/reversed by Save/Load

Defer remains the ordinary window behavior until window expiry / Final lock.
If the Player has not committed either branch, no free Seal Break is auto-awarded.

Persist additional state when applicable:
- slothSealOpportunity=YES/NO
- consumedBySealBreak=YES/NO
- sealBreakCommitted=YES/NO

Relic owns only the mutually exclusive window lifecycle:
```text
Relic acquisition OR Seal Break
```

Boss Power by committed break count is owned by `BOSS_v2.8.0.md`.
Do not duplicate SLOTH Boss Power numbers here.

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
- D5 Boss Identity / D15 Boss Trait처럼 같은 날 선행 공개가 있으면 그 공개가 먼저 끝난 뒤 Relic Focused Reveal을 연다.
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

Target feel:

```text
1 Piece = direction visible; small immediate effect
2 Pieces = operation meaningfully changes
3 Pieces = Build Engine; cumulative Run value clearly exceeds one Item
4 Pieces = strong completed Build; Order/Sale/Inventory/NPC investment changes visibly
5+ Pieces = rare high-roll; do not normalize automatically
```

For build effects that can be meaningfully expressed as Final Party Power, a coherent 3~4 Piece build may create roughly +10~20 Party-equivalent direct/indirect difference as a `DIRECTOR DOCUMENT BASELINE` measurement target.

Do not implement this by adding generic Power to every Relic.
Economy/visitor/order builds should express value through their actual channels.

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

Exact Player-facing wording remains owned by COPY_AUDIT_APPROVED_v2.8.0.md.

The following Store Support Functions are exact:

### ROTATION — Foundation
1. 묶음발주 계약
tag=Rotation
- 묶음발주 계약: same SKU 3+ order -> 3rd and later units purchase price -15%
purpose=reward inventory-risk-taking

2. 회전 진열대
tag=Rotation
purpose=sales->order->sales loop

`DIRECTOR DOCUMENT BASELINE`

회전 진열대:
    Price = 240G
    trigger = previous Day sales >= 6
    effect = next generated ORDER offers for Common / Uncommon Items get supply quantity +1

Purpose:
    high sales -> more available units -> bulk-order threshold becomes reachable more often
    -> Rotation discounts can actually be exercised -> more stock can support the next sales cycle

Boundaries:
- Rare+ offer quantity is unchanged by this support
- it does not add ORDER offer slots
- it does not lower Item price by itself
- the existing 묶음발주 계약 / 공동구매 전단 / 새벽 공동배송 discounts remain separate
- if previous Day sales < 6, this support adds no quantity

### VIP — Foundation
3. 단골 스탬프 기계
tag=VIP
- 단골 스탬프 기계: paid-purchase Loyalty gain +50%; survival Loyalty is excluded

4. 회원 관리대장
tag=VIP
- 회원 관리대장: from next Day, returning-adventurer revisit weight +40%
identityPreReveal=NO

### PREMIUM — Foundation
5. 희귀상품 입고 계약
tag=Premium
- 희귀상품 입고 계약: Rare+ ORDER offer weight +70%; from next Day operating cost +10G

6. 길드 보증 진열대
tag=Premium
- 길드 보증 진열대: once per Day, first sale of a list-price >=200G Item -> HQ covers 20% of list
  price for the customer while the Player receives the full chosen sale price
150AutoSuccess=NO
playerReceivesChosenPrice=YES

### EXPEDITION — Foundation
7. 원정 위험 게시판
tag=Expedition
- 원정 위험 게시판: known active-Hazard matching Item offer weight +80%; this is not a guarantee
unknownHazardReveal=NO
specificItemGuarantee=NO

8. 긴급보급 선반
tag=Expedition
- 긴급보급 선반: Potion / Field Gear / Insurance offer weight +60% and matching offer quantity +1

### FRESH — Foundation
9. 대형 냉장고
tag=Fresh

`DIRECTOR DOCUMENT BASELINE`

`대형 냉장고`:

```text
base Price = 200G
Food/Drink shelf life +1 day
existing eligible non-expired stock extends once on acquisition
future eligible stock enters with the extension
```

No Stat/Supply multiplier is added to this Relic.
No repeated daily extension.
dailyRepeatedExtension=NO
infinitePreservation=NO

10. 즉석식품 코너
tag=Fresh

`DIRECTOR DOCUMENT BASELINE`

`즉석식품 코너`:

```text
Food/Drink positive native Core-Stat contribution +30%
Supply unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
```

notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect]
newCombatSystem=NO

### CUSTOMER — Foundation
11. 길드 전광판
tag=Customer
livingNpcCapIgnored=NO

`DIRECTOR DOCUMENT BASELINE`

Role: raise the floor of a bad Morning.

It applies to the **base visitor roll only**, before any other modifier:

```text
base 3 -> 4
base 4 -> 4
base 5 -> 5
base 6 -> 6
```

Rules:
- this is a floor of 4 on the base roll, not a floor of 4 on the final visitor count
- no separate chance roll is made
- other modifiers (Relic, Decoration, Event) apply afterward as they already do
- the available-adventurer limit still caps the actual seating

12. 신입 모집 게시판
tag=Customer
lateRookieMustRemainViable=YES

`DIRECTOR DOCUMENT BASELINE`

신입 모집 게시판 exact rule:
- when a new adventurer is generated on a Day, that new adventurer occupies one of today's
  existing visitor slots
- total visitor count does not increase because of this rule
- if there is no new adventurer generated, the support adds no visitor
- available-adventurer cap and ordinary queue length remain
- use the existing deterministic seating pattern already used by the rookie Event where possible

Purpose:
make the support's identity observable without false probability attribution or extra customer workload.

### HYBRID
13. 공동구매 전단
tags=[Rotation,Customer]
- 공동구매 전단: if today's visitor count >=6, same SKU 3+ bulk order purchase price -10%

14. 단골 묶음혜택
tags=[Rotation,VIP]
- 단골 묶음혜택: returning customer's second paid purchase that Day -> Loyalty +2
consumerSlotRule=UNCHANGED

15. 프리미엄 멤버십
tags=[VIP,Premium]
- 프리미엄 멤버십: Loyalty >=50 customer's Rare+ Item purchase intent +10%p
150AutoSuccess=NO

16. 귀환 적립제
tags=[VIP,Expedition]
effect=paid returning customer survives expedition -> long-term customer value up
channel=prefer existing loyalty/wallet/revisit systems

`DIRECTOR DOCUMENT BASELINE`

귀환 적립제:
    Price = 400G
    Loyalty +2
    NPC Wallet +30G

17. 원정 도시락 코너
tags=[Fresh,Expedition]
effect=Food/Drink expedition-relevant effect strengthened when it matches current known need
matchingNeed=[explicitHazardCounter,activeSupplyBurden]
HazardCounterBoostOnlyIfMatching=YES
universalHazardSolution=NO

`DIRECTOR DOCUMENT BASELINE`

`원정 도시락 코너`:

```text
if a Food/Drink explicit Hazard Counter matches the actual current destination Hazard:
  matching Counter +25%

when active Supply Burden exists and the Food/Drink supplies >0:
    positive native Core-Stat contribution +20%

Supply itself unchanged
```

No universal Hazard solution.
No boost merely because the Item is Food/Drink.

18. 냉장 유통 계약
tags=[Fresh,Premium]
eligible=Uncommon+ Food/Drink
singleSkuDependency=NO

냉장 유통 계약:
- Uncommon+ Food/Drink offer weight +80%
- shelf life +1 day
- on acquisition, currently owned non-expired eligible stock extends exactly once
- future eligible stock receives the extension

Eligibility:
    category in [Food, Drink]
    rarity >= Uncommon

Do not use a retired fresh boolean/property.

19. 길드 납품 인증
tags=[Premium,Expedition]
effect=Rare+ expedition-response items gain premium-economy viability

`DIRECTOR DOCUMENT BASELINE`

길드 납품 인증:
    Price = 440G
    HQ commission = 12% of Item list price

Player copy should say:
    현재 알려진 위험에 맞는 희귀 이상 상품 또는 희귀 이상 보험 판매 시
    정가의 12% 본사 수당

20. 새벽 공동배송
tags=[Fresh,Rotation]
- 새벽 공동배송: same Food/Drink SKU 3+ bulk order purchase price -15%
expiryRisk=REMAINS

### KEYSTONE
21. 물류 본부계약
tag=Rotation

`DIRECTOR DOCUMENT BASELINE`

물류 본부계약:
    Price = 720G
    trigger = previous Day sales >= 7
    effect = next Day first bulk order purchase price -25%

22. 평생 단골제
tag=VIP
effect=high-loyalty survival/revisit accelerates wallet/revisit value
snowballCap=required

`DIRECTOR DOCUMENT BASELINE`

평생 단골제:
    Price = 740G
    Loyalty >=60 survival condition
    NPC Wallet +50G
    next-visit weight +50%

This threshold does not redefine Trusted Regular; NPC_TRAIT_v2.8.0.md owns 단골 at 51.

23. 왕도 프리미엄 인증
tag=Premium
effect=successful Rare+ 150% sale -> extra premium commission
refusal/inventoryRisk=REMAINS

`DIRECTOR DOCUMENT BASELINE`

왕도 프리미엄 인증:
    Price = 760G
    HQ commission = 20% of Item list price

24. 길드24 원정전문점 인증
tag=Expedition
specificItemGuarantee=NO
multiHazardChoiceRandomness=REMAINS

`DIRECTOR DOCUMENT BASELINE`

길드24 원정전문점 인증:
    Price = 700G

When current known Hazards contain exactly 1 distinct Hazard:
    ensure at least 1 ORDER offer that Counters that Hazard.

When current known Hazards contain 2 or more distinct Hazards:
    choose 2 distinct known Hazard keys
    and ensure 2 distinct ORDER offer slots,
    one guaranteed against each selected Hazard key.

For guarantee accounting, one offer slot satisfies only one selected Hazard key even if that Item
can Counter multiple Hazards.

The guarantee:
- preserves the ordinary total ORDER offer count; it replaces ordinary slots rather than adding slots
- remains active after a full Reroll
- uses only currently legal/unlocked Item candidates
- does not reveal unknown Hazards

Purpose:
원정 전문 Build의 Keystone은 "Counter가 하나라도 있나"가 아니라
여러 알려진 위험에 대한 최소 대응 폭을 보장한다.

25. 24시간 신선체계
tag=Fresh
notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect]
infiniteShelfLife=NO

`DIRECTOR DOCUMENT BASELINE`

`24시간 신선체계`:

```text
Food/Drink shelf life +2 days
Food/Drink positive native Core-Stat contribution +50%
Supply unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
```

26. 지역 거점점 계약
tag=Customer
livingNpcCapIgnored=NO

`DIRECTOR DOCUMENT BASELINE`

Role: pay overhead to widen the catchment.

지역 거점점 계약:
    Price = 700G

Each applicable Morning, exactly one mutually exclusive visitor result:
    +1 visitor = 45%
    +2 visitors = 15%
    no visitor increase = 40%

Expected visitor delta = +0.75 / applicable Day before ordinary availability caps.

The visitor increase remains subject to the ordinary active/available adventurer cap.

Operating cost:

```text
overheadBase + overheadBase × 0.10 + other flat extras
```

then the existing operating-cost rounding rule.

The 10% applies to `overheadBase` only. It must not be applied again to other Event or Relic
flat modifiers, and it does not compound with them.

### UTILITY
27. 후방 창고 증설
- 후방 창고 증설: inventory capacity +10

28. 본사 추가발주권
- 본사 추가발주권: from the next ORDER-offer generation, offer candidate count +2

29. 발주 교환권
effect=매일 첫 canonical Full-offer Reroll 비용 0G
firstRerollFree=YES
freeUseConsumesFirstRerollStep=YES
dailyReset=YES
singleOfferSwap=NO
requirements:
- applies to canonical full-offer reroll
- after the free first use, same-Day Reroll continues from the next normal cost step
- current eligibility/coverage/rarity rules preserved
- rerollAdvancesPity=NO
- pity farming=NO

```text
each Day's first canonical Full-offer Reroll = 0G
free use consumes the first daily Reroll step
```

All paid Reroll costs after that use the current authoritative curve from `ECONOMY_ORDER_v2.8.0.md`.

With the current curve:

```text
normal: 50 -> 100 -> 200 -> 400 -> 800 -> x2 thereafter
with 발주 교환권: 0 -> 100 -> 200 -> 400 -> 800 -> x2 thereafter
```

30. 운영 효율 매뉴얼
buildDefiningPower=LOW

`DIRECTOR DOCUMENT BASELINE`

운영 효율 매뉴얼:
    Price = 260G
    from next Day, basic operating cost -30G

Late acquisition may rationally be skipped. That alone is not a Balance Finding.
Evaluate this support by whether earlier acquisition can repay its price and create meaningful
remaining-Run economy value.

## FRESH NATIVE-STAT COMPOSITION

Positive native Core Stat means the Item's own positive contribution to 투력/강인함/기동/정신 before unrelated effects.

Fresh native-Stat bonuses stack additively from the Item's base native positive Stat.

Therefore:
    즉석식품 코너 + 24시간 신선체계
    => base positive native Stat ×1.80

With the active-Supply native-Stat condition:
    +30% +50% +20%
    => base positive native Stat ×2.00

Food-affinity Trait percentages that target the same positive native Core-Stat channel join this same base-additive pool under `ITEM_v2.8.0.md`.
Do not multiply a completed Fresh percentage layer by `대식가/소식가` as a second sequential layer.

This high point is an allowed coherent-build reward.

## VISITOR SUPPORT COMPOSITION

The two answer different questions and neither is a strict upgrade of the other.

`board`, `hub` and the `wall` Decoration are independent and may all be held at once.

```text
board = base-roll floor
hub   = probabilistic catchment, paid for in overhead
wall  = 10% Morning proc (Decoration, not a Relic)
```

They share no ownership, no purchase candidacy and no slot. Holding more than one simply applies
each in its own place: the board floor first on the base roll, then the probabilistic additions.

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

Other Expedition Relics that inspect Item functional role continue to use actual Counter/Insurance functionality rather than physical item shape.

Fresh:
- active Food/Drink pool must span multiple prices/rarities/roles
- native core boost means Supply + native Stat/recovery only unless Relic explicitly says otherwise
- specialist FieldGear must remain the more reliable dedicated Counter

Category checks must use Food/Drink categories rather than stale legacy `fresh` category aliases.

Customer/VIP:
- may amplify demand/customer value but must not create hidden Item-Job affinity

Build-filtered Relics must not depend on one single eligible SKU.

Item categories -> `ITEM_v2.8.0.md`.

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

The following 20 Store Support base prices are the approved baseline.

| ID | Store Support | Base Price |
|---|---|---:|
| bulk | 묶음발주 계약 | 260G |
| stamp | 단골 스탬프 기계 | 260G |
| member | 회원 관리대장 | 260G |
| showcase | 희귀상품 입고 계약 | 280G |
| guarantee | 길드 보증 진열대 | 280G |
| hazardBoard | 원정 위험 게시판 | 260G |
| medicine | 긴급보급 선반 | 260G |
| kitchen | 즉석식품 코너 | 280G |
| board | 길드 전광판 | 260G |
| rookieBoard | 신입 모집 게시판 | 240G |
| groupFlyer | 공동구매 전단 | 400G |
| memberBundle | 단골 묶음혜택 | 380G |
| premiumMember | 프리미엄 멤버십 | 420G |
| expeditionMeal | 원정 도시락 코너 | 400G |
| coldcase | 냉장 유통 계약 | 420G |
| dawnBulk | 새벽 공동배송 | 380G |
| fresh24 | 24시간 신선체계 | 740G |
| warehouse | 후방 창고 증설 | 360G |
| terminal | 본사 추가발주권 | 380G |
| delivery | 발주 교환권 | 340G |

The other 10 active support prices are exact in their Store Support entries above.

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
-> ECONOMY_ORDER_v2.8.0.md

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

## FEEL / ATTRIBUTION BOUNDARY

Deterministic visible changes may expose their Store Support source:
- Order offer count +N
- operating cost -N
- HQ commission +N
- deterministic visitor-count delta
- other exact resolved deltas

Probability/weight-only effects do not claim that a particular random result happened because of
the support.

Do not build a new rarity-attribution UI merely to explain weighting.

The Player can always inspect current owned Store Supports through the existing compact owned
support reference.

## COPY TRUTH

단골 스탬프 기계 Player copy:
    유료 구매의 단골도 증가량 +50%. 생환으로 얻는 단골도에는 적용되지 않는다.

Do not mention 무료 보급; the active price system has no free-sale mode.

긴급보급 선반 Player copy uses:
    포션 · 야외장비 · 보험

길드 전광판 must describe the actual base-roll floor:
    기본 방문객이 3명이면 4명으로 올린다.

발주 교환권:
    first canonical full reroll each Day = 0G
    then the current paid curve continues from 100G -> 200G -> 400G ...

SLOTH:
    점포지원, not 유물

## SAVE CONTRACT

Persist at minimum:
- owned relic IDs
- active relic window
- candidates
- prices
- purchased/deferred state
- immediate-repeat cooldown state
- Sloth opportunity / consumedBySealBreak state when applicable

Save/Load must not become an offer reroll method.

## BALANCE

A Store Support is not required to remain equally valuable at every acquisition Day.
Late-Run decline is valid when an early acquisition has enough remaining Run time to create a
meaningful snowball and the Player can rationally choose to skip it later.

Future tuning remains measurement-gated.

### METRICS

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
run/save -> CORE_RUN_v2.8.0.md
final expedition / D25 Final state -> FINAL_EXPEDITION_v2.8.0.md
boss/sloth seal / Sloth Boss value -> BOSS_v2.8.0.md
gold/order/reroll -> ECONOMY_ORDER_v2.8.0.md
sale phase -> SALE_v2.8.0.md
npc value -> NPC_TRAIT_v2.8.0.md
Item/category/composition -> `ITEM_v2.8.0.md`
Order/UI -> `UI_UX_v2.8.0.md`
