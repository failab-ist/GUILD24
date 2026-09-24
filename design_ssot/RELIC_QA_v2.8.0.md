# RELIC / STORE SUPPORT QA

DOC=RELIC_QA
OWNER=qa,relic,store_build,fresh,sloth_window
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/RELIC_QA_v2.8.0-patch.md,history/RELIC_QA_v2.7.0.md,history/RELIC_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/RELIC_QA.md

Status values are NOT stored here.
This file defines acceptance criteria only.

Design owner under test: `RELIC_v2.8.0.md`.

Player-facing system term is 점포지원.

## WINDOW SCHEDULE / LIFECYCLE

### REL-Q01 — WINDOW SCHEDULE
SETUP:
Play D0–D30.

EXPECT:
Relic windows appear:
D0,D5,D10,D15,D20,D25,D30

PASS:
No missing/extra normal milestone window.

### REL-Q02 — D0 FOUNDATION
SETUP:
Start new run.

EXPECT:
- 3 candidates
- Foundation only
- choose <=1
- free

PASS:
All conditions hold.

### REL-Q03 — D5+ PURCHASE
SETUP:
Open D5+ window.

EXPECT:
- 3 candidates
- Gold prices
- max 1 purchase/window
- defer allowed

PASS:
All conditions hold.

### REL-Q04 — DEFER REOPEN
SETUP:
Open D5 window, buy nothing, close.

EXPECT:
Reopen possible during valid management phases until next window.

PASS:
Candidates/prices unchanged.

### REL-Q05 — WINDOW EXPIRY
SETUP:
Defer D5 until D10.

EXPECT:
D5 window expires when D10 window begins.

PASS:
Only current window remains active.

### REL-Q06 — NO SALE/NIGHT REOPEN
SETUP:
Have active deferred Relic window.

EXPECT:
Relic reopen unavailable during:
- active Sale
- Night resolution

PASS:
Management timing respected.

### REL-Q07 — SAVE/LOAD PERSISTENCE
SETUP:
Record candidates/prices, Save/Reload.

EXPECT:
Same:
- candidate IDs
- prices
- purchased/deferred state

PASS:
Reload does not reroll.

### REL-Q25 — PRICE STABILITY
SETUP:
Open window, record prices, reload/reopen.

EXPECT:
Price remains fixed for that window.

PASS:
No price fishing.

### REL-Q38 — MILESTONE FOCUSED REVEAL
SETUP:
Reach D5/D10/D15/D20/D25/D30 with a new Relic window.

EXPECT:
- each new milestone window is visibly presented once
- candidate IDs/prices are already fixed
- Player may Buy or choose `나중에 결정`
- defer keeps the same window
- Save/Reload does not replay/reroll the reveal as an exploit

PASS:
A valid Relic window cannot silently exist in the background so the Player misses the milestone choice.

### REL-Q41 — BOSS REVEAL PRECEDES SAME-DAY RELIC
SETUP:
Reach D5, D15 with a fresh milestone window.

EXPECT:
- D5 Boss Identity reveal completes before D5 Relic focused reveal
- D15 Boss Trait reveal completes before D15 Relic focused reveal

PASS:
Relic choice never appears before the information intentionally granted for that Day.

### REL-Q40 — OWNED RELIC QUICK VIEW
SETUP:
Own multiple Relics and inspect Morning, Order, Sale.

EXPECT:
- owned Relics are quickly readable in all three phases
- Sale access is read-only
- purchase/defer timing cannot be bypassed

PASS:
Store-build information needed for decisions is available without enabling illegal Relic actions.

### REL-Q-v28-20 — DAY 0 FIRST SUPPORT SURFACE

PASS:
- DAY 0 first Store Support choice appears before the D0 Boss-information beat
- candidate surface does not contain the D0 Boss objective
- first-support screen uses current exact Copy-owner text
- choosing one support commits exactly once
- separate D0 Boss-information beat follows
- normal DAY 1 does not begin before D0 acknowledgement

## D30 WINDOW

### REL-Q13 — D30 RELEVANCE
SETUP:
Open D30 window.

EXPECT:
All candidates can affect Final preparation/outcome.

PASS:
No future-only dead relic.

### REL-Q78 — D25 FINAL INFO / D30 WINDOW

Reach D25 then D30.

PASS:
- exact Final Family/Hazard state is already known/persisted from D25
- D30 Relic window does not generate/reroll a Family Pair
- D30 candidate relevance reads the persisted Final state
- SLOTH D30 Seal option still shares the same mutually exclusive window

### REL-Q-v28-18 — D30 DEFAULT INCLUDE

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

## SLOTH WINDOW

### REL-Q42 — SLOTH OPPORTUNITY SCHEDULE
SETUP:
Run many seeded SLOTH runs.

EXPECT:
- exactly 2 distinct opportunity Days selected from D15/D20/D25
- D30 always opportunity
- D10 never opportunity
- selected Days persist on Save/Load

PASS:
Every SLOTH run has exactly three valid opportunities with no reroll exploit.

### REL-Q43 — SLOTH MUTUAL EXCLUSION
SETUP:
At a SLOTH opportunity window, choose Seal Break.

EXPECT:
- Gold cost=0
- Seal Break count +1
- no Relic is acquired from that window
- acquisition opportunity is consumed
- reload cannot obtain both outcomes

PASS:
One window produces at most one of [Relic, Seal Break].

### REL-Q44 — SLOTH DEFER / EXPIRY
SETUP:
Open a SLOTH opportunity and defer without committing either outcome.

EXPECT:
- ordinary window reopen rules remain valid until expiry / D30 Final lock
- no Seal Break is auto-awarded
- after committing either Relic or Seal Break, the other branch is unavailable

PASS:
Sloth reuses the existing Relic window lifecycle without a duplicate choice path.

### REL-Q79 — SLOTH WINDOW OWNERSHIP

PASS:
- existing exactly-3 opportunity lifecycle remains
- one window yields at most one of [Relic, Seal Break]
- RELIC does not implement/duplicate Boss Power by break count
- Boss Power comes only from `BOSS_v2.8.0.md`

## CANDIDATE RULES

### REL-Q08 — OWNED DUPLICATE
SETUP:
Own a nonstackable Relic and open later windows.

EXPECT:
Owned Relic is excluded.

PASS:
No duplicate ownership offer.

### REL-Q09 — IMMEDIATE REPEAT
SETUP:
Skip an offered Relic.

EXPECT:
It may recur later but not immediately next window.

PASS:
Immediate-repeat protection works.

### REL-Q10 — OFFER DIVERSITY
SETUP:
Sample many windows.

EXPECT:
When practical, candidate set includes >=2 different primary build directions.

PASS:
Windows are not routinely three near-identical choices.

### REL-Q11 — SOFT BUILD BIAS
SETUP:
Own several same-axis Relics and sample offers.

EXPECT:
Related pieces may be somewhat more likely.

PASS:
No guaranteed missing-piece completion.

### REL-Q12 — KEYSTONE TIMING
SETUP:
Inspect D0 and later windows.

EXPECT:
- D0/D5 Keystone=NO
- D10+ Keystone eligible
- no separate fixed Keystone quota/probability is required
- normal candidate pool + soft build bias rules still apply

PASS:
No pre-D10 Keystone leak and no hidden guaranteed Keystone completion path.

## POOL / BLUEPRINTS

### REL-Q14 — POOL SIZE
SETUP:
Inspect canonical pool.

EXPECT:
30 total:
- Foundation 12
- Hybrid 8
- Keystone 6
- Utility 4

PASS:
Counts match.

### REL-Q15 — BUILD AXES
SETUP:
Audit relic catalog.

EXPECT:
Primary axes represented:
Rotation/VIP/Premium/Expedition/Fresh/Customer

PASS:
Each axis has coherent Foundation→later build support.

### REL-Q16 — FOUNDATION BLUEPRINTS
SETUP:
Audit IDs 1–12.

EXPECT:
Effects match canonical identities for:
묶음발주 계약
회전 진열대
단골 스탬프 기계
회원 관리대장
희귀상품 입고 계약
길드 보증 진열대
원정 위험 게시판
야전 정비대
대형 냉장고
즉석식품 코너
길드 전광판
첫 방문 쿠폰

PASS:
No material behavior contradicts RELIC spec.

### REL-Q17 — HYBRID BLUEPRINTS
SETUP:
Audit IDs 13–20.

EXPECT:
Each bridges its stated two build axes.

PASS:
No Hybrid acts as unrelated generic stat relic.

### REL-Q18 — KEYSTONE BLUEPRINTS
SETUP:
Audit IDs 21–26.

EXPECT:
Each materially strengthens its own build axis without becoming mandatory.

PASS:
Build engine is strong but optional.

### REL-Q19 — UTILITY BLUEPRINTS
SETUP:
Audit IDs 27–30.

EXPECT:
Utility supports operation without replacing build identity.

PASS:
No Utility is universal auto-pick.

### REL-Q37 — ACTIVE RELIC POOL BOUNDARY
SETUP:
Inspect all loaded/acquirable facility/relic IDs.

EXPECT:
Only the 30 canonical Relic blueprints are active.
`포션 냉장고`, `마석 충전대`, `상권 분석대` do not affect gameplay.

PASS:
No excluded facility is offered, owned, or applied as a hidden modifier.

### REL-Q-v28-1 — NAME COLLISION CLEANUP

Expected:
- showcase -> 희귀상품 입고 계약
- coldcase -> 냉장 유통 계약
- Decoration 프리미엄 쇼케이스 remains unchanged

No active Store Support uses 쇼케이스 in these two names.

### REL-Q-v28-21 — SUPPORT EXACT FUNCTIONS

Verify these exact Store Support functions in RELIC_v2.8.0.md:

- 묶음발주 계약 -> same SKU 3+, 3rd+ units -20%
- 단골 스탬프 기계 -> paid-purchase Loyalty gain +75%; survival Loyalty excluded
- 회원 관리대장 -> returning revisit weight +70% from next Day
- 희귀상품 입고 계약 -> Rare+ ORDER weight +70%; Rare+ sale price +10% in every mode, paid by the customer (no HQ fill); no operating-cost modifier
- 길드 보증 진열대 -> once/Day first sale with a CHARGED price >=200G, HQ customer subsidy = 30% of
  the charged price, Player still receives the full chosen sale price
- 원정 위험 게시판 -> today's Gate Hazard matching offer weight +50%, never a guarantee
- 야전 정비대 -> carried Field Gear Hazard Counter values x1.40; no offer weight / quantity effect
- 즉석식품 코너 -> Food/Drink native Core-Stat +25%; from next Day operating cost + overheadBase × 0.10
- 첫 방문 쿠폰 -> first-ever visit: NPC Wallet +30G on arrival, purchase intent +20%p for that visit
- 단체 주문 창구 -> own 20% Morning roll for +1 visitor; +15G HQ commission per sale from the Day's 5th
- 단골 묶음혜택 -> 단골's second paid purchase that Day: customer pays / is judged on half the charged
  price, store receives the full charged price
- 프리미엄 멤버십 -> 단골 arrival NPC Wallet +40G; 단골 Rare+ purchase intent +15%p
- 원정 도시락 코너 -> per Food/Drink Item: Supply +2 and flat +4 on every Hazard of the actual Gate
- 냉장 유통 계약 -> Uncommon+ Food/Drink offer weight +80%, purchase intent +16%p, shelf life +1
- 새벽 회수 계약 -> expiring Food/Drink recovered at 50% of cost (not waste); +1 Food/Drink offer on
  the Day's first offer generation
- 24시간 신선체계 -> Food/Drink native Core-Stat +50%; Food/Drink ORDER price x1.25; no shelf life
- 후방 창고 증설 -> inventory capacity +10
- 본사 추가발주권 -> next ORDER-offer generation candidate count +2

FAIL if Source omits one of these exact functions or uses a different numeric value.

## PRICE

### REL-Q26 — PRICE BAND
SETUP:
Sample prices.

EXPECT:
Limited random band around approved base.
Starting target around ±15–20%.

PASS:
Exact final values match `RELIC_v2.8.0.md` §PRICE.

### REL-Q-v28-22 — SUPPORT BASE PRICES

Expect exactly these approved base prices for these rows:

    bulk 130
    stamp 130
    member 130
    showcase 140
    guarantee 140
    hazardBoard 60
    medicine 80
    kitchen 170
    board 110
    rookieBoard 110
    groupFlyer 200
    memberBundle 190
    premiumMember 200
    expeditionMeal 200
    coldcase 180
    dawnBulk 190
    fresh24 360
    warehouse 130
    terminal 130
    delivery 120

FAIL if implementation uses a different base price without a new approved owner amendment.

## ROTATION SUPPORTS

### REL-Q-v28-14 — ROTATION DISPLAY SUPPLY ENGINE

Given 회전 진열대 is owned:

If previous Day sales >= 4:
- each newly generated ORDER offer, of every rarity, gets quantity +1
- total offer-slot count is unchanged

If previous Day sales < 4:
- quantity is unchanged.

FAIL:
- any first-bulk discount effect is active on 회전 진열대
- the support directly discounts Item price

### REL-Q-v28-15 — LOGISTICS HQ TRIGGER

Expected:
    previous Day sales >= 6
    -> today every same-SKU 3+ order -25%

Price 300G.

FAIL:
- trigger differs from previous Day sales >= 6
- only the first bulk order of the Day is discounted

### REL-Q35 — ROTATION LOW-RARITY VIABILITY
SETUP:
Run Rotation-heavy build into late game using Common/Uncommon specialist stock.

EXPECT:
Useful low-rarity specialists still have valid demand/value when their Hazard appears.

PASS:
Rotation/low-cost build is not invalidated by universal Rare+ upgrades.

## VIP SUPPORTS

### REL-Q-v28-4 — RETURN POINTS

Expected:
    paid returning customer survives (no Loyalty threshold) -> Loyalty +5 and NPC Wallet +25G

### REL-Q-v28-6 — LIFETIME

Expected:
    단골 (Loyalty >= 51, Trusted Regular owner) survival -> NPC Wallet +50G
    revisit weight +50% unchanged

Reads the Trusted Regular owner judgement; no second threshold.

## PREMIUM SUPPORTS

### REL-Q22 — PREMIUM 150%
SETUP:
Use Premium build effects.

EXPECT:
150% may become more viable.

PASS:
No relic turns 150% into automatic acceptance.

### REL-Q-v28-5 — SUPPLY CERT

Expected:
    eligible Rare+ sale -> HQ commission = 20% of list price, buyer NPC Wallet +30G

### REL-Q-v28-7 — ROYAL PREMIUM

Expected:
    150% sale of any rarity -> HQ commission = 40% of the charged sale price
    the flat 150% purchase-intent penalty (-0.16) is lifted for the owner
    the 1.5x price burden and Loyalty -3 are unchanged

### REL-Q36 — PREMIUM POOL SUPPORT
SETUP:
Simulate Premium build with canonical Item catalog.

EXPECT:
Rare+ offers contain multiple roles/price points and generate repeated meaningful premium-sale decisions.

PASS:
Premium does not depend on a single SKU and Rare+ is not universally superior.

## EXPEDITION SUPPORTS

### REL-Q21 — EXPEDITION CERTIFICATION
SETUP:
Own `원정 전문 인증`; sell Counter and non-Counter Items for the customer's own Gate.

EXPECT:
- an Item that Counters a Hazard of the adventurer's Gate: Hazard Counter values x1.60
- with `야전 정비대` on Field Gear: x1.40 x1.60
- the flat `원정 도시락 코너` +4 is not multiplied
- the buyer gets NPC Wallet +50G on the next living visit, once per purchase Day

PASS:
No ORDER offer guarantee and no unknown hazard reveal.

### REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
SETUP:
Use 원정 위험 게시판 / 원정 도시락 코너 / 원정 전문 인증 across all Families.

EXPECT:
- only the 9 canonical Hazards drive Hazard-counter filtering
- Main/Alternative Item routes remain possible
- Supply Burden is handled through Food/Drink Supply, not treated as a Hazard key

PASS:
Expedition Relics match the current Dungeon×Item model.

### REL-Q77 — FIELD MAINTENANCE (야전 정비대)

`야전 정비대` multiplies the Hazard Counter values of carried Field Gear by 1.40.

PASS:
- Potion / Food / Drink / Insurance Counter values are unchanged
- no ORDER offer weight or offer quantity effect

## FRESH SUPPORTS

### REL-Q20 — LARGE FRIDGE
SETUP:
Acquire with existing eligible stock.

EXPECT:
- current non-expired stock extends once
- future stock gets extended shelf life
- no daily repeated extension
- no infinite preservation

PASS:
Shelf-life logic stable.

### REL-Q72 — LARGE FRIDGE

EXPECT:
- base price 60G
- Food/Drink shelf life +2
- existing non-expired eligible stock extends once on acquisition
- future stock receives extension
- no Stat/Supply multiplier
- no repeated daily extension

### REL-Q-v28-2 — LARGE FRIDGE PRICE

Expected:
    대형 냉장고 = 120G

PASS only when the active implementation uses 120G.

### REL-Q73 — INSTANT FOOD CORNER

PASS:
- native Core-Stat +25%
- from next Day operating cost + overheadBase × 0.10, never compounded
- Supply unchanged
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty unchanged

### REL-Q74 — EXPEDITION MEAL CORNER

Per Food/Drink Item in the Bag:
- Supply +2
- flat +4 on every Hazard of the Gate the adventurer actually enters

PASS:
- no native Core-Stat bonus
- no matching-Counter multiplier
- a non-Food/Drink Item takes nothing

### REL-Q75 — 24H FRESH SYSTEM

EXPECT:
- no shelf-life effect and no operating-cost effect
- Food/Drink ORDER price x1.25
- Supply unchanged
- Counter unchanged

Fresh-to-Fresh stacking uses base-additive bonuses.

When a Food-affinity Trait also applies, its native-Stat percentage joins the same base-additive pool under `ITEM_v2.8.0.md`.

PASS:
- no multiplicative drift between Fresh pieces
- no sequential Trait×Fresh multiplication

### REL-Q-v28-13 — FRESH NATIVE-STAT REBASELINE

Expected:
- 즉석식품 코너 native Core-Stat +25%
- 24시간 신선체계 native Core-Stat +50%
- 원정 도시락 코너 adds no native Core-Stat bonus

Composition remains base-additive.

Therefore:
- kitchen + fresh24 => ×1.75 native positive Stat

FAIL:
- any alternate native-Stat percentages are active
- Supply itself is multiplied by these native-Stat percentages

### REL-Q31 — FRESH CORE-EFFECT SCOPE
SETUP:
Use 즉석식품 코너 / 24시간 신선체계 with multi-role Food/Drink Items.

EXPECT:
Generic Fresh core boost applies only to:
- native Stat/recovery

It does not automatically boost:
- Hazard Counter
- Insurance
- RiskReward penalty
- unrelated attached effects

PASS:
Fresh does not become a blanket whole-item multiplier.

### REL-Q33 — COLD DISTRIBUTION ELIGIBILITY
SETUP:
Own 냉장 유통 계약 and generate Order offers repeatedly.

EXPECT:
Eligibility targets Uncommon+ Food/Drink, purchase intent +16%p and shelf-life relief as defined in RELIC.

PASS:
Effect has a meaningful multi-SKU pool and is not dependent on one or two Rare items.

### REL-Q76 — COLD DISTRIBUTION / DAWN RECOVERY CATEGORY

PASS:
- eligibility uses Food/Drink categories
- no stale legacy `fresh` category dependency
- their offer/shelf/recovery identities remain intact

### REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION

On acquisition:
- existing non-expired U+ Food/Drink stock extends exactly once +1 day

Future eligible stock:
- receives +1 day

FAIL:
- eligibility depends on retired item.fresh property
- Common Food/Drink is extended by coldcase
- eligible existing stock is not extended

### REL-Q32 — FRESH BUILD ITEM SUPPORT
SETUP:
Simulate Fresh-heavy runs across early/mid/late Item availability.

EXPECT:
- Food/Drink pool spans multiple prices/rarities/roles
- Fresh effects have repeated meaningful targets
- specialist FieldGear remains more reliable for dedicated Hazard response

PASS:
Fresh is a real build without deleting Expedition specialist identity.

### REL-Q80 — FRESH DOES NOT DELETE SPECIALISTS

Full-run/targeted comparison:
PASS direction:
- completed Fresh build materially changes Food/Drink choices
- dedicated Field Gear remains stronger/reliable on its narrow Hazard target unless the actual combined build tradeoff justifies the Food/Drink alternative
- Fresh is powerful through coherent build accumulation, not one universal Food item

## CUSTOMER / VISITOR SUPPORTS

### REL-Q23 — VISITOR CAP
SETUP:
Stack Customer visitor effects.

EXPECT:
Visitor increases still respect Living NPC Cap rules.

PASS:
No invalid roster overflow.

### REL-Q30 — CUSTOMER BUILD PACING / ATTACHMENT
SETUP:
Play/simulate Customer-heavy builds including visitor-count and newcomer-weight effects.

EXPECT:
- Customer effects create meaningful traffic/composition value
- visitor increases still respect Living NPC Cap
- normal 2–4 trusted-regular feel remains achievable
- extra visitors do not make repetitive interaction burden the primary reward/cost of the build

PASS:
Customer remains a store-build choice rather than a pure workload multiplier.

### REL-Q-v28-3 — FIRST VISIT COUPON

On an adventurer's first-ever visit, with `첫 방문 쿠폰` owned:
- NPC Wallet +30G on arrival
- purchase intent +20%p during that visit
- no visitor is added and no slot is seated

A returning adventurer receives nothing.

### RELIC-Q-v27-VISITOR — BOARD / HUB

Owner rule: `RELIC_v2.8.0.md` §RELIC BLUEPRINTS 11 (길드 전광판) / 26 (지역 거점점 계약), §VISITOR SUPPORT COMPOSITION.

#### board

PASS:
- the effect applies to the base visitor roll only, before any other modifier
- base 3 becomes 4; base 4, 5 and 6 are unchanged
- no separate chance roll is made for board
- with board held, a Day whose other modifiers would subtract or whose available adventurers
  are fewer than 4 still seats fewer than 4 — the floor is on the base roll, not on the final
  visitor count

FAIL:
- a final visitor count clamped to a minimum of 4
- board raising a base roll of 5 or 6
- board consuming a chance roll from the Run stream

#### hub

PASS:
- the three outcomes never combine on one Morning
- operating cost is `overheadBase + overheadBase × 0.10 + other flat extras`, then the existing
  rounding rule
- the 10% is taken on `overheadBase` alone

FAIL:
- +1 and +2 both applying on the same Morning
- the 10% applied to Event or Relic flat modifiers as well
- the 10% compounding with another percentage overhead modifier

#### composition

PASS:
- board, hub, 단체 주문 창구 and the `wall` Decoration may all be held at once and each applies in its own place
- 단체 주문 창구 makes its own 20% Morning roll for +1 visitor
- holding the `wall` Decoration does not mark board owned, remove it from a purchase window,
  or consume a Relic slot
- the board floor resolves on the base roll before the probabilistic additions

### REL-Q-v28-17 — REGION HUB

On each applicable Morning exactly one outcome occurs:
- +1 visitor: 45%
- +2 visitors: 15%
- +0 visitors: 40%

Expected mean before ordinary availability caps:
    +0.75 visitor / applicable Day

Also:
- Price 340G
- operating modifier remains overheadBase +10%
- outcomes are mutually exclusive

## UTILITY SUPPORTS

### REL-Q24 — REROLL RELIC
SETUP:
Own `발주 교환권`, start a fresh Day, and use the canonical Full-offer Reroll multiple times.

EXPECT:
- first Full-offer Reroll costs 0G
- next same-Day Reroll uses the first normal cost step
- next Day restores the free first Reroll
- regenerated offers preserve eligibility / coverage / rarity rules
- Reroll does not advance pity

PASS:
The Relic provides a clear daily Utility benefit without single-slot swap behavior or pity farming.

### REL-Q81 — REROLL RELIC USES CURRENT ECONOMY CURVE

With `발주 교환권`:
- first canonical Full-offer Reroll of the Day = 0G
- next same-Day Reroll uses the first current `ECONOMY_ORDER` step
- under the current economy this means `0 -> 50 -> 100 -> 200 ...`
- next Day restores the free first use
- pity is not advanced by Reroll

PASS:
No stale `0 -> 60 -> 120` curve survives.

### REL-Q-v28-8 — OPERATING EFFICIENCY

Expected:
    Price 130G
    from next Day basic operating cost -30G

This is a Production baseline, not harness-only.

## INFORMATION / COPY

### REL-Q39 — INTERNAL TAXONOMY IS NOT PLAYER-FACING
SETUP:
Inspect candidate and owned-Relic UI.

EXPECT:
Player does not see:
- Foundation / Hybrid / Keystone / Utility
- Build Axis names as quality/category coaching
- labels such as `신선식품 · 기반`

Player does see:
- name
- effect
- condition/limit
- price when relevant

PASS:
Build discovery comes from effects, not Director taxonomy labels.

### REL-Q-v28-10 — COPY TRUTH

Expected:
- 길드 전광판 explains base 3 -> 4 floor, not final minimum visitors 4
- 발주 교환권 sequence after free use starts at 50
- SLOTH active copy says 점포지원

### REL-Q-v28-12 — STAMP COPY

Expected:
    유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도 제외.

FAIL:
- active copy mentions 무료 보급
- mechanic is changed merely to preserve the stale phrase

### REL-Q-v28-11 — FEEL ATTRIBUTION

Deterministic deltas may identify exact Store Support source.

Probability/weight-only effects:
- remain readable in support description
- do not claim a particular random Item/NPC was caused by that support
- do not receive a new rarity-origin UI

Frozen QA reports aggregate-value weakness as BALANCE FINDING; it does not retune.

## BUILD VALUE / BALANCE

### REL-Q70 — SINGLE RELIC VS BUILD VALUE

PASS direction:
- one Relic's same-moment direct expedition contribution does not exceed an appropriate Item merely by being a Relic
- coherent 3+ Piece builds can create cumulative Run value clearly larger than one Item
- no generic hidden Power is added to every Relic to force this result

Track value through actual channels: Gold, Item access/quality, waste, visits, NPC growth, Final Party Power.

### REL-Q71 — BUILD ENGINE TARGET

Across seeded builds:
- 1 Piece = direction visible
- 2 Pieces = operation meaningfully shifts
- 3 Pieces = build engine
- 4 Pieces = strong completed build
- 5+ Piece high-roll may remain unusually strong

For directly power-observable coherent builds, +10~20 Party-equivalent direct/indirect difference at 3~4 Pieces is an initial measurement target, not a hidden runtime bonus.

FAIL:
Relic build choice changes labels but not actual Order/Sale/Inventory/NPC investment behavior.

### REL-Q27 — BUILD HIGH-ROLL
SETUP:
Seed a strong synergistic run.

EXPECT:
Strong 4–5+ piece synergy is allowed to feel powerful.

PASS:
System does not forcibly normalize good seed into average.

### REL-Q28 — NO-RELIC VIABILITY
SETUP:
Play/simulate low-Relic investment route.

EXPECT:
Run remains playable though economically/build-wise different.

PASS:
Relic purchase is meaningful, not hard mandatory.

### REL-Q29 — BUILD DIVERSITY
SETUP:
Simulate all six build directions.

EXPECT:
No one build consistently dominates:
Gold/survival/final success across all contexts.

PASS:
Multiple build identities viable.

### REL-Q-v28-19 — TIMING VALUE PRINCIPLE

Do not FAIL a support merely because late acquisition is rationally skipped.

Balance review should instead verify:
- early acquisition can create meaningful remaining-Run value/snowball
- the support is not an automatic pick at every timing/state
- the support is not a dead pick across all reasonable timing/state combinations
