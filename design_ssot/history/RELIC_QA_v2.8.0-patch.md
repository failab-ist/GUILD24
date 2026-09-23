# RELIC / STORE SUPPORT QA

DOC=RELIC_QA
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # pre-consolidation v2.8 patch; current owner is design_ssot/RELIC_QA_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=RELIC_QA_v2.7.0.md
PATCH_TYPE=STORE_SUPPORT_AUDIT_QA

## INHERITANCE

All non-conflicting v2.7 Store Support QA remains active.

Player-facing system term is 점포지원.

## REL-Q-v28-1 — NAME COLLISION CLEANUP

Expected:
- showcase -> 희귀상품 입고 계약
- coldcase -> 냉장 유통 계약
- Decoration 프리미엄 쇼케이스 remains unchanged

No active Store Support uses 쇼케이스 in these two names.

## REL-Q-v28-2 — LARGE FRIDGE PRICE

Expected:
    대형 냉장고 = 200G

PASS only when the active implementation uses 200G.

## REL-Q-v28-3 — ROOKIE BOARD

When a new adventurer is generated on a Day and the support is owned:
- that new adventurer occupies one existing visitor slot
- total visitor count is not increased by this rule
- visitor selection uses only the current owner rule above

When no new adventurer is generated:
- no visitor is added

## REL-Q-v28-4 — RETURN POINTS

Expected:
    eligible survival -> Loyalty +2 and NPC Wallet +30G

## REL-Q-v28-5 — SUPPLY CERT

Expected:
    eligible Rare+ sale -> HQ commission = 12% of list price

## REL-Q-v28-6 — LIFETIME

Expected:
    Loyalty >=60 eligible survival -> NPC Wallet +50G
    revisit weight +50% unchanged

Does not redefine Trusted Regular.

## REL-Q-v28-7 — ROYAL PREMIUM

Expected:
    eligible Rare+ overcharge -> HQ commission = 20% of list price

## REL-Q-v28-8 — OPERATING EFFICIENCY

Expected:
    Price 260G
    from next Day basic operating cost -30G

This is a Production baseline, not harness-only.

## REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION

On acquisition:
- existing non-expired U+ Food/Drink stock extends exactly once +1 day

Future eligible stock:
- receives +1 day

FAIL:
- eligibility depends on retired item.fresh property
- Common Food/Drink is extended by coldcase
- eligible existing stock is not extended

## REL-Q-v28-10 — COPY TRUTH

Expected:
- 긴급보급 선반 says Potion / Field Gear / Insurance
- 길드 전광판 explains base 3 -> 4 floor, not final minimum visitors 4
- 발주 교환권 sequence after free use starts at 100
- SLOTH active copy says 점포지원

## REL-Q-v28-11 — FEEL ATTRIBUTION

Deterministic deltas may identify exact Store Support source.

Probability/weight-only effects:
- remain readable in support description
- do not claim a particular random Item/NPC was caused by that support
- do not receive a new rarity-origin UI

Frozen QA reports aggregate-value weakness as BALANCE FINDING; it does not retune.


## REL-Q-v28-12 — STAMP COPY

Expected:
    유료 구매의 단골도 증가량 +50%. 생환으로 얻는 단골도에는 적용되지 않는다.

FAIL:
- active copy mentions 무료 보급
- mechanic is changed merely to preserve the stale phrase


## REL-Q-v28-13 — FRESH NATIVE-STAT REBASELINE

Expected:
- 즉석식품 코너 native Core-Stat +30%
- 24시간 신선체계 native Core-Stat +50%
- 원정 도시락 코너 active-Supply native Core-Stat +20%
- 원정 도시락 코너 matching explicit Hazard Counter remains +25%

Composition remains base-additive.

Therefore:
- kitchen + fresh24 => ×1.80 native positive Stat
- kitchen + fresh24 + active-Supply expeditionMeal => ×2.00

FAIL:
- any alternate native-Stat percentages are active
- matching Hazard Counter is accidentally reduced from +25%
- Supply itself is multiplied by these native-Stat percentages


## REL-Q-v28-14 — ROTATION DISPLAY SUPPLY ENGINE

Given 회전 진열대 is owned:

If previous Day sales >= 6:
- each newly generated Common / Uncommon ORDER offer gets quantity +1
- Rare+ quantity is unchanged
- total offer-slot count is unchanged

If previous Day sales < 6:
- quantity is unchanged.

FAIL:
- any first-bulk discount effect is active on 회전 진열대
- the support directly discounts Item price
- Rare+ quantity receives the +1

## REL-Q-v28-15 — LOGISTICS HQ TRIGGER

Expected:
    previous Day sales >= 7
    -> next Day first bulk order -25%

Price remains 720G.

FAIL:
- trigger differs from previous Day sales >= 7
- discount applies more than once that Day

## REL-Q-v28-16 — EXPEDITION CERT COVERAGE

With exactly 1 distinct known Hazard:
- at least 1 generated ORDER offer Counters it.

With 2+ distinct known Hazards:
- exactly 2 distinct known Hazard keys are selected for the guarantee
- 2 distinct offer slots are guaranteed, one against each selected key
- one multi-Counter Item slot cannot satisfy both guarantee slots
- ordinary total offer count is preserved
- full Reroll preserves the guarantee
- no unknown Hazard is revealed

## REL-Q-v28-17 — REGION HUB

On each applicable Morning exactly one outcome occurs:
- +1 visitor: 45%
- +2 visitors: 15%
- +0 visitors: 40%

Expected mean before ordinary availability caps:
    +0.75 visitor / applicable Day

Also:
- Price remains 700G
- operating modifier remains overheadBase +10%
- outcomes are mutually exclusive

## REL-Q-v28-18 — D30 DEFAULT INCLUDE

D30 candidate generation must be:
    ordinary eligible pool
    minus explicit D30 no-effect exclusions

It must NOT be implemented as a positive finalUseful/futureRelevant allowlist.

Current explicit exclusions:
    stamp
    member
    guarantee
    fridge
    board
    rookieBoard
    groupFlyer
    memberBundle
    premiumMember
    returnPoints
    supplyCert
    lifetime
    royalCert
    hub
    efficiency

PASS:
- every other current support can enter D30 under ordinary eligibility
- a newly added future Store Support enters D30 by default
- a future support is excluded only after being explicitly added to the no-effect set
- a support that requires a legal D30 Reroll/ORDER action to realize value is still eligible

## REL-Q-v28-19 — TIMING VALUE PRINCIPLE

Do not FAIL a support merely because late acquisition is rationally skipped.

Balance review should instead verify:
- early acquisition can create meaningful remaining-Run value/snowball
- the support is not an automatic pick at every timing/state
- the support is not a dead pick across all reasonable timing/state combinations

## REL-Q-v28-20 — DAY 0 FIRST SUPPORT SURFACE

PASS:
- DAY 0 first Store Support choice appears before the D0 Boss-information beat
- candidate surface does not contain the D0 Boss objective
- first-support screen uses current exact Copy-owner text
- choosing one support commits exactly once
- separate D0 Boss-information beat follows
- normal DAY 1 does not begin before D0 acknowledgement


## REL-Q-v28-21 — INHERITED SUPPORT EXACT FUNCTION CLOSURE

Verify the exact inherited-support functions closed in RELIC_v2.8.0.md:

- 묶음발주 계약 -> same SKU 3+, 3rd+ units -15%
- 단골 스탬프 기계 -> paid-purchase Loyalty gain +50%; survival Loyalty excluded
- 회원 관리대장 -> returning revisit weight +40% from next Day
- 희귀상품 입고 계약 -> Rare+ ORDER weight +70%; operating cost +10G from next Day
- 길드 보증 진열대 -> once/Day first list-price >=200G sale, HQ customer subsidy = 20% of list price,
  Player still receives the full chosen sale price
- 원정 위험 게시판 -> known-Hazard matching offer weight +80%, never a guarantee
- 긴급보급 선반 -> Potion / Field Gear / Insurance offer weight +60% and quantity +1
- 공동구매 전단 -> visitor count >=6 and same SKU 3+ -> bulk purchase price -10%
- 단골 묶음혜택 -> returning customer's second paid purchase that Day -> Loyalty +2
- 프리미엄 멤버십 -> Loyalty >=50 + Rare+ Item -> purchase intent +10%p
- 새벽 공동배송 -> same Food/Drink SKU 3+ -> bulk purchase price -15%
- 후방 창고 증설 -> inventory capacity +10
- 본사 추가발주권 -> next ORDER-offer generation candidate count +2

FAIL if Source omits one of these exact functions or uses a different numeric value.


## REL-Q-v28-22 — INHERITED SUPPORT BASE PRICES

Expect exactly these approved v2.8 base prices for the inherited rows:

    bulk 260
    stamp 260
    member 260
    showcase 280
    guarantee 280
    hazardBoard 260
    medicine 260
    kitchen 280
    board 260
    rookieBoard 240
    groupFlyer 400
    memberBundle 380
    premiumMember 420
    expeditionMeal 400
    coldcase 420
    dawnBulk 380
    fresh24 740
    warehouse 360
    terminal 380
    delivery 340

FAIL if implementation uses a different base price without a new approved owner amendment.
