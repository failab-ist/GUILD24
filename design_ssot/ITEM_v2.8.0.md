# ITEM

DOC=ITEM
OWNER=item,catalog,category,role,food,drink,potion,field_gear,insurance,special,counter,supply,modifier_composition,item_role,item_economy
DOC_VERSION=2.9.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/ITEM_v2.8.0-patch.md,history/ITEM_v2.7.0.md,history/ITEM_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/ITEM.md

## KEY

functionalRole=[
Stat,
Supply,
DirectCounter,
HybridCounter,
Condition,
Insurance,
RiskReward,
Economy,
Utility
]

metaLockedItems=[황금 1+1 쿠폰]
metaUnlockOwnership=META
newItemRule=REWORK_EXISTING_BEFORE_ADD

canonicalHazards=[poison,bind,corrosion,mire,fire,fear,dark,cold,whiteout]

globalPressure=NONE (User 2026-09-24, v2.9.0)

hiddenCombo=NO
jobIdItemModifier=NO
categoryAffinityScope=coreEffectOnly

thirstSystem=NO
caffeineStackSystem=NO
hungerGauge=NO
wetHazard=NO
armorHazard=NO
undeadHazard=NO
longHazard=NO

## ROLE

ITEM =
`이번 원정에 무엇을 준비시킬 것인가`

Item responsibilities:
- Stat support
- Fatigue recovery (Supply) (User 2026-09-24, v2.9.0)
- Hazard response
- Condition management
- Insurance
- Risk/Reward
- Expedition economy

Division:
JOB=BaseStats+Growth
TRAIT=CharacterVariation
RELIC=StoreBuild
ITEM=ExpeditionPreparation

Item must primarily answer:
`무엇에 좋은가?`

Do not create a new micro-system merely to give one Item flavor.

## PLAYER-FACING CATEGORY — EXACT

```text
Food
Drink
Potion
Field Gear
Insurance
Special
```

Category follows gameplay use rather than physical object shape.

Category = 상품 정체성/상점 분류
Functional Role = 실제 Gameplay 기능

Contracts:
- Food = large Fatigue recovery (Supply) + lower secondary Core Stat value (User 2026-09-24, v2.9.0)
- Drink = small Fatigue recovery (Supply) + sharper Stat/Counter/RiskReward value
- Potion = generic immediate raw-Power specialist
- Field Gear = narrow Hazard specialist or explicit Hazard Hybrid
- Insurance = bad-outcome prevention/mitigation/conversion/aftercare
- Special = explicit utility outside ordinary category contracts

`Special` is not a dumping category for ordinary Stat Items.

## ITEM ROLE BOUNDARY

A normal Item should read primarily as one gameplay purpose with at most one meaningful secondary purpose unless explicitly exceptional.

Do not hide:
- Core Stat value
- Supply value (shown as `피로 회복 N`) (User 2026-09-24, v2.9.0)
- Hazard Counter value
- Insurance behavior
- explicit penalty/tradeoff

Do not collapse Hazard Counter into generic Power.

The exact active-catalog table below controls approved multi-effect exceptions; do not remove an explicit listed effect merely to force a role-count heuristic.

## FUNCTIONAL ROLE

### Stat
direct stat/recovery support

### Supply
reduces the customer's Fatigue; shown as `피로 회복 N` (User 2026-09-24, v2.9.0)

Rules:
- Supply reduces current Fatigue first, then this expedition's Fatigue gain; no Gate requires Supply
- Supply is NOT a Hazard Counter
- no thirst/hunger subsystem
- no Food+Drink pairing requirement
- leftover Supply is not persisted and gives no extra expedition bonus

Exact Supply -> Fatigue order and formulas:
-> `DUNGEON_HAZARD_v2.8.0.md` §SUPPLY -> FATIGUE

### DirectCounter
single-hazard specialist

rule:
strength=high
coverage=narrow
reliability=high

### HybridCounter
multi-purpose or multi-hazard flexible option

rule:
strengthPerHazard<specializedDirect
value=flexibility

### Condition
persistent condition management

### Insurance
mitigates bad outcomes through escape/retreat/death-conversion effects
does not directly guarantee expedition success

### RiskReward
strong benefit + explicit readable cost/penalty

### Economy
loot/supply-adjacent expedition economy value that is explicitly stated

### Utility
explicit special operation that does not fit Stat/Counter/Insurance/Economy

## SUPPLY MODEL

All active Food/Drink Items provide a visible Supply value unless explicitly defined otherwise.
Its only meaning is Fatigue recovery: the Player sees the value as `피로 회복 N`, never `보급 +N` (User 2026-09-24, v2.9.0)
Catalog tables below keep the internal notation `Supply N`.

Fatigue-recovery contract (User 2026-09-24/25, v2.9.0): Food is the main recovery route; a Drink recovers 1~2; no Food
recovers more than 6 except 영웅 결전 도시락 (Epic, 9), so the worst single outcome gain (+9) is never
erased by one ordinary Item; a Hazard-Counter Food keeps at least 2 so 대식가's -1 stays a real cost.
The redistributed values are the ACTIVE CATALOG rows (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 ·
집중 사탕 2 · 불룡볶음면 2 · 길드 특제 도시락 6 · 영웅 결전 도시락 9; Drinks unchanged).

Each Food/Drink Item defines:
- supplyValue
- native Stat/recovery effect if any
- explicit Hazard Counter if any
- explicit RiskReward if any

Supply values are listed in ACTIVE CATALOG.
Supply > 0 is preserved for every active Food/Drink.

No Item may:
- create thirst
- cleanse thirst
- require Water after spicy Food
- create hidden caffeine stacking
- create hunger/thirst gauge

## DIRECT CORE-STAT ITEM VALUE

Rules:
- NPC Level/Growth remains the long-term body of strength
- but one appropriate Stat Item must still create a perceptible, decision-relevant change on a mid/late-Run NPC
- do not add a new Day/Level percentage-scaling Item system merely to create late-game relevance
- use the exact flat values in the active catalog below

Fresh / Food-affinity / Potionbody modifiers use their existing owned composition rules from these base Item values.

## PRICE

Canonical price modes:
50% / 100% / 150%

Full price/economy rules:
-> `ECONOMY_ORDER_v2.8.0.md`

Balance considers:
- buy cost
- sale price
- margin
- NPC wallet burden
- role
- typical day
- rarity
- Relic/build interaction

### ITEM PRICE ALIGNMENT

Item price should follow actual gameplay breadth/slot value, not Rarity label alone.

Rules:
- narrow Main Hazard specialists of one Rarity should remain in comparable practical SALE bands
- Sell = Buy × 2 for every Item, so the Player can predict a price from its cost (User 2026-09-25, v2.9.1 balance)
- Common prices hold (the early low margin is the D1~10 operating-cost pressure); an Uncommon / Rare whose effect rose at the
  v2.9.1 balance costs +15% (+20% when the effect rose 30%+), an Epic whose effect rose +10%, Insurance holds
  (User 2026-09-25, v2.9.1 balance)
- Rarity may justify a modest premium but must not make a simple single-Hazard answer practically unsellable to the customers who need it
- broad multi-role Food / strong Insurance / exceptional Utility may remain materially more expensive
- Epic late-Run Items may command a slot-efficiency premium, but 50% pricing must remain a plausible NPC-investment route rather than becoming fake affordability
- exact Buy/Sell values are the active catalog values below

## CATEGORY AFFINITY

Category-based Trait/Relic modifiers only boost the intended category core effect.

Example:
Food affinity may boost:
- Supply, only where a Trait entry states it (e.g. 소식가 / 대식가 in NPC_TRAIT)
- food-native recovery/Stat

### FOOD / DRINK CORE EFFECT

Fresh-category Relics and category-affinity effects use `native core effect`, not a blanket whole-item multiplier.

Food/Drink nativeCore for Fresh Store Supports and category affinity is positive native Stat only.
Supply stays its own channel; Fresh Store Supports leave Supply unchanged.

genericWholeItemMultiplier=NO

Explicit Relic text may separately strengthen a Food/Drink Hazard Counter.

### FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION — EXACT

When multiple approved Trait/Relic effects modify the same Food/Drink **positive native Core-Stat contribution**, they use one base-additive modifier pool.

```text
resolved positive native Core Stat
= base Item positive native Core Stat
× (1 + sum of applicable native-Stat percentage modifiers)
```

Rules:
- each percentage reads the Item table's base positive native Core Stat
- Food Trait affinity and Fresh Relic native-Stat bonuses add from the same base; do not multiply Trait and Relic layers sequentially
- do not round each modifier layer separately; use the existing final Core-Stat arithmetic/rounding convention after the combined modifier is resolved
- only modifiers that explicitly target positive native Core Stat enter this pool
- Hazard Counter / Supply / Insurance / Loot / Utility / harmful RiskReward penalties remain separate channels

Examples of modifier totals:

```text
대식가 + 즉석식품 코너 + 24시간 신선체계
= +30% +25% +50%
= base ×2.05

소식가 + 즉석식품 코너 + 24시간 신선체계
= -20% +25% +50%
= base ×1.55
```

Drink has no Food-affinity Trait modifier, so the two Fresh native-Stat bonuses alone give base ×1.75.
원정 도시락 코너 no longer adds a native-Stat bonus (its effects are Fatigue recovery via Supply and flat Hazard defense). (User 2026-09-24, v2.9.0)

GLUTTONY's Final reduction, when applicable, occurs after the final Item-side positive Core-Stat contribution has been produced, as owned by `BOSS_v2.8.0.md`.

The Food/Drink positive Core-Stat values use the existing base-additive composition rules.

No new exception is created:
- Food affinity may modify eligible positive native Food Stat
- Fresh Store Supports may modify eligible positive native Food/Drink Stat
- Supply remains its own channel
- Wallet-gain effect remains its own loot/economy channel

### CATEGORY AFFINITY BOUNDARY

Food/Drink category-affinity or Fresh Relic effects do not automatically multiply:
- Hazard Counter
- Insurance
- RiskReward penalty
- unrelated special effects

Exact Trait modifiers -> `NPC_TRAIT_v2.8.0.md`.
Exact Fresh Relic effects -> `RELIC_v2.8.0.md`.

## HAZARD COVERAGE CONTRACT

Canonical rule:
Every Hazard must have:
- 1 Main specialist route
- >=2 meaningful Alternative routes

Alternative may be:
- secondary Counter Item
- Hybrid Item
- relevant natural Stat
- Stat-support Item
- another explicit preparation route

Insurance does not automatically count as a Hazard-specific Alternative.

Direct = certainty/reliability
Hybrid = flexibility

Rules:
- one Hazard must not require one specific mandatory SKU
- one Item must not solve an entire Family
- Hybrid must not strictly dominate a Direct of the same or a higher Rarity (User 2026-09-25, v2.9.1: an Epic hybrid may exceed a Common Main)
- T3 must retain viable <=2 required-prep-slot routes
- proper Main/Direct prep should feel reliable, especially T1/T2

Canonical Dungeon behavior:
-> `DUNGEON_HAZARD_v2.8.0.md`

## HAZARD COUNTER BASELINE

`DIRECTOR DOCUMENT BASELINE`

Natural alternative = the one Stat each Hazard presses (3 / 3 / 3, 투력 never; 어둠 -> 기동 and 화염 -> 정신 per User 2026-09-24 revisions 3 / 5) -> `DUNGEON_HAZARD_v2.8.0.md` (User 2026-09-24, v2.9.0)

| Hazard | Main / Upper | Lower | Hybrid / Natural alternative |
|---|---|---|---|
| poison | 농축 해독제 +30 | 방진마스크 +24 | 강인함 / 해독가 / 거미줄 방호세트 +22 |
| bind | 경량 로프 +16 | — | 기동 / Stat support / 거미줄 방호세트 +18 |
| corrosion | 부식 방지 코팅제 +24 | — | 방수망토 +6 / 강인함 / 연금 방수슈트 +22 |
| mire | 원정용 장화 +20 | — | 방수망토 +6 / 기동 / 연금 방수슈트 +18 |
| fire | 쿨링 이온음료 +26 | 얼음컵 +10 | 기동 / 내열성 / 마그마 냉각장비 +18 |
| fear | 용사의 곡주 +20 | 집중 사탕 +10 | 정신 / 성화 랜턴 +18 |
| dark | 랜턴 건전지 +16 | — | 정신 / 눈썰미 / 성화 랜턴 +18 |
| cold | 핫팩 +24 | 컵라면 +10 | 불룡볶음면 +6 / 강인함 / 백설 방한고글 +22 |
| whiteout | 설원 고글 +20 | — | 정신 / 눈썰미 / 백설 방한고글 +18 |

Counter values by Rarity (User 2026-09-25, v2.9.1 balance): within one Rarity, `Counter + the pressed Stat's
defense contribution` is equal, so a 강인함-pressed Hazard (독 · 냉기 · 부식, 강인함 ÷3) carries +4 over a 기동- / 정신-pressed
one (÷2). Field Gear and the Main Drink Counters: Common 16 · Uncommon 20 / 24 · Rare 26 / 30 · Epic hybrid 18 / 22
(a hybrid stays below every specialist of the same or a higher Rarity for each Hazard it covers; it may exceed a
Common Main such as 경량 로프 / 랜턴 건전지 — User 2026-09-25, v2.9.1). Food / Drink secondary Counters (컵라면, 집중 사탕,
얼음컵, 불룡볶음면 냉기, 방수망토) keep their values.

The Natural alternative (the pressed Stat) is 관련 준비, never a Counter: no Counter multiplier, no Counter pity and no Counter-conditioned Store Support reads it; only the purchase acceptance floor and 원정 위험 게시판 do (`RELIC_v2.8.0.md` §COUNTER JUDGEMENT; (User 2026-09-24, v2.9.0)).

Dedicated single-Hazard Field Gear specialist Items carry no generic positive Core Stat unless an explicit active-catalog exception says otherwise.
Their cost is narrow coverage.

Epic Family Hybrid Field Gear intentionally trades per-Hazard peak strength for one-slot breadth.
It must not become stronger on each covered Hazard than the dedicated Main specialist for that Hazard.

Matrix rule:
- Main specialist remains the most reliable single-Hazard answer
- Alternative routes must remain viable without becoming identical substitutes

Hazard Threat/readiness -> `DUNGEON_HAZARD_v2.8.0.md`.

## ITEM INTERACTION

Materially important Item interactions must be explicit in the Item description.

hiddenPairSynergy=NO
hiddenThresholdCombo=NO
hiddenOrderDependentEffect=NO
hiddenPenaltyCancel=NO

Normal effects may stack according to stated values.

Explicit Special/Legendary interaction is allowed when it is the Item's stated identity.

`황금 1+1 쿠폰`:
explicit next-consumable interaction allowed

Rule:
explicitInteraction=visibleToPlayer

## PENALTY RULE

ordinaryItemPenalty=NOT_REQUIRED

Penalty is allowed only when:
- the Item's identity is genuinely RiskReward
- the cost is visible before purchase/use
- it does not require a new hidden subsystem

Allowed examples:
- explicit Mobility decrease
- explicit Injury Risk increase
- explicit Stat decrease

Forbidden as Item micro-systems:
- thirst
- caffeine stacking
- hidden fatigue chain
- hidden pair-dependent penalty

## POTION LINE — EXACT BASELINE

`DIRECTOR DOCUMENT BASELINE`

| Item | Rarity | Buy / Sell | Effect |
|---|---:|---:|---|
| 하급 포션 | Common | 70 / 140 | 투력 +8 |
| 중급 포션 | Uncommon | 125 / 250 | 투력 +14 |
| 상급 포션 | Rare | 175 / 350 | 투력 +20 |
| 최상급 포션 | Epic | 210 / 420 | 투력 +28 |

All four:
```text
Category = Potion
Supply = 0
Hazard Counter = 0
Insurance = 0
```

Shelf-life contract:
- all Potion tiers use the same ordinary Potion-family shelf-life behavior unless an explicit row later says otherwise
- `중급 포션` does **not** inherit the retired `마석 보조배터리` non-expiring/tool-like shelf behavior merely because it reuses that catalog slot
- `최상급 포션` is the top-end pure raw-Power slot-efficiency option, not a Hazard specialist

The former player-facing `마석 보조배터리` catalog entry is retired and its active catalog slot becomes `중급 포션`.
Do not keep a second active Spirit-battery SKU under Special.

Potion Trait interaction -> `NPC_TRAIT_v2.8.0.md`.

## BANDAGE RETIREMENT / SPIRIT STAT ROUTE

`붕대` is removed from the active catalog.
It is not converted into another Item on legacy saves.

The active catalog slot is replaced by:

```text
진정 허브티
Category = Drink
Rarity = Common
Buy / Sell = 40 / 80
Shelf Life = 2 (§SHELF LIFE — EXACT, v2.9.0)
정신 +15
Supply 2
```

It is a generic Spirit Stat route, not a Fear/Dark/Whiteout Counter.
Use a new active Item ID; do not reuse retired `bandage` as the new Drink identity.

Start-stock ownership -> `CORE_RUN_v2.8.0.md`.

## MEAL / WATER LINE

### ROLE SPLIT — EXACT

Meal / 도시락 line:
- Supply (large Fatigue recovery) is the primary identity (User 2026-09-24, v2.9.0)
- 강인함 is secondary
- higher tiers represent a more complete expedition meal
- Supply is the direct Fatigue recovery; no separate Fatigue effect is created
- U/R may invest in the NPC's future Wallet

Water line:
- Drink identity
- low Supply (small Fatigue recovery)
- 강인함-focused Stat route
- comparable in structure to mobility/spirit stat Drinks, not to a meal or Potion

Thus:
- meal asks: do I spend a slot on large Fatigue recovery plus broad survival?
- water asks: do I spend a slot on concentrated 강인함 with small Fatigue recovery?

### ACTIVE REPLACEMENT IDS

Keep active catalog count = 40 and reuse existing IDs:

    rice        -> 삼각김밥
    water       -> 생수
    bar         -> 간단 도시락
    premium     -> 길드 특제 도시락
    battlelunch -> 영웅 결전 도시락
    herobar     -> 왕도 천연암반수

No new catalog slot is added.

For current internal saves, these IDs resolve to the current identities.
Only the current identities are active for these IDs.

### REPLACEMENT ID BOUNDARY

For `bar` / `herobar`:
- no Fatigue-reduction role beyond the Item's own Supply value is active (User 2026-09-24, v2.9.0)
- no hidden Hotbar role is active
- no Hotbar name is a Player-facing alias

### CURRENT ITEM ART IDENTITY — EXACT

Save-safe internal ID reuse must preserve the current Item's visible identity.

Required icons:
- `bar` / 간단 도시락 -> simple meal/lunchbox icon in the existing Item-art language
- `herobar` / 왕도 천연암반수 -> bottled/mineral-water icon in the existing Item-art language

Do not use a Hotbar / skewered-stick silhouette for either ID.

This is a visual identity correction only.
Category, Rarity, price, effect, shelf life and save ID do not change.

### REPLACEMENT ITEM FLAVOR — EXACT

ID reuse uses the current replacement Flavor below.

\`bar\` / 간단 도시락:
    반찬은 단출하지만 빈칸은 없다.

\`herobar\` / 왕도 천연암반수:
    왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.

The existing compatible Flavor for 삼각김밥 / 생수 / 길드 특제 도시락 / 영웅 결전 도시락
may remain unless a later approved Copy pass changes it.

Do not preserve Hotbar/skewer wording on the replacement IDs.

### NPC WALLET GAIN — EXACT SCOPE

간단 도시락:
    existing expedition loot modifier +0.20

길드 특제 도시락:
    existing expedition loot modifier +0.40

Composition:
- additive with other modifiers that already use the ordinary expedition loot channel
- no new cap
- two eligible modifiers may add together if the Bag actually contains them

Applies only to the ordinary resolved NPC expedition-Wallet reward.

Does not multiply:
- Deep Expedition bonusWallet
- Store Support direct Wallet grants
- Event purchase budget
- Store Gold / commission / subsidy
- any other non-expedition-loot Wallet source

Player-facing term:
    원정 소지금 획득 +20%
    원정 소지금 획득 +40%

Do not say current 소지금 +20% / +40%.

## EPIC LATE-RUN VALUE LAYER — EXACT

There are 10 Epic preparation Items.
They are not D20-hard-unlocked.
Their late-Run identity comes from the Day-band Rarity weights owned by `ECONOMY_ORDER_v2.8.0.md`.

Design split:

```text
5 Epic Field Gear
= Family-shaped one-slot Hybrid breadth

5 Epic Food/Drink/Potion
= top-end direct Stat / Fatigue-recovery (Supply) slot efficiency (User 2026-09-24, v2.9.0)
```

Purpose:
- D20+ preparation must not feel like the Player is still choosing only the same early/mid SKU power ceiling
- late-Run progression should improve **what one slot can do**, not add a third normal Bag slot
- Epic must remain optional high-efficiency preparation; T3 must still have viable routes without drawing one exact Epic SKU

### EPIC FIELD GEAR — FAMILY HYBRIDS

```text
거미줄 방호세트
Field Gear / Epic
165 / 330
독 +22
속박 +18

연금 방수슈트
Field Gear / Epic
165 / 330
부식 +22
진창 +18

성화 랜턴
Field Gear / Epic
165 / 330
공포 +18
어둠 +18

백설 방한고글
Field Gear / Epic
165 / 330
냉기 +22
화이트아웃 +18

마그마 냉각장비
Field Gear / Epic
175 / 350
화염 +18
투력 +6
```

FIRE uses one Hazard plus its existing higher-combat identity instead of inventing a second FIRE Hazard.
The `투력 +6` on `마그마 냉각장비` is an explicit catalog exception; it is not permission for generic specialist Field Gear to gain Core Stats.

### EPIC FOOD / DRINK / POTION — TOP-END PREPARATION

```text
초고속 에너지드링크
Drink / Epic
175 / 350
기동 +22
Supply 2

대현자 허브엘릭서
Drink / Epic
175 / 350
정신 +24
Supply 2

최상급 포션
Potion / Epic
210 / 420
투력 +28
```

The Epic meal / water rows (`battlelunch` 영웅 결전 도시락, `herobar` 왕도 천연암반수) are in the ACTIVE CATALOG meal / water table.

Fresh/Food-affinity/Potionbody rules apply normally by category.
No separate Epic-only amplifier is created.

## INSURANCE HIERARCHY

### 구급키트

`DIRECTOR DOCUMENT BASELINE`

```text
Category = Insurance
Rarity = Uncommon
Buy / Sell = 80 / 160
```

It carries no Core Stat; its whole function is the Aftercare below, priced as pure Insurance (User 2026-09-24, v2.9.0).

It lowers the resolved expedition Outcome one step, after the higher-priority emergency conversions (User 2026-09-25, v2.9.0):

```text
중상 Outcome
-> Outcome becomes 부상: XP/Loot/Fatigue follow 부상, persistent injury=1, recovery=0

부상 Outcome
-> Outcome stays 부상: XP/Loot/Fatigue follow 부상, persistent injury=0 (no lasting injury)

사망
-> no effect
```

This is Item Aftercare, not natural recovery.
It does not change the existing natural Severe-Injury recovery rule owned by `NPC_TRAIT_v2.8.0.md`.
It has no hidden injury-risk percentage.

### 귀환석
rarity=Rare
category=Insurance
role=Insurance
subrole=EscapeInsurance

identity:
`큰 실패를 퇴각으로 바꿀 가능성을 높이는 확률형 보험`

Rules:
- does not increase combat success directly
- retreat XP > 0
- retreat loot ≈ almost none
- does not own Death -> Severe conversion

Rare Insurance identity:
- emergency escape
- +50%p escape contribution under its current resolution path
- may convert eligible Severe/Death crisis to Retreat

escapeBonus=+50%p
finalEscapeCap=0.96 (귀환석 rescue roll clamp; the ordinary retreat roll clamps at 0.94)

### 세계수 생환부적
rarity=Epic
category=Insurance
role=Insurance
subrole=DeathInsurance
Buy / Sell = 400 / 800 (User 2026-09-24, v2.9.0; was 600 / 1200)

core:
Death -> Severe Injury
uses=1

Rules:
- clearly above Return Stone in survival hierarchy
- not Food/Drink
- Fresh-category effect does not apply

Epic death-insurance identity:
- one use
- remaining Death -> Severe Injury

### Insurance resolution order

Where multiple effects are present:

```text
1. resolve ordinary expedition outcome
2. 귀환석 emergency-escape conversion when eligible
3. if Death remains, 세계수 생환부적 Death -> Severe Injury
4. 구급키트 Aftercare lowers the final non-death Outcome one step (중상 -> 부상; a 부상 keeps its Outcome but leaves no injury); XP/Loot/Fatigue follow the lowered Outcome (User 2026-09-25, v2.9.0)
```

Do not rerun the whole outcome-resolution chain after Aftercare.

Final-specific usability -> `FINAL_EXPEDITION_v2.8.0.md`.

## ACTIVE CATALOG

Unlisted implementation-only flavor fields inherit the previous Item where identity remains unchanged, except where this spec states otherwise; shelf lives are the §SHELF LIFE — EXACT table (v2.9.0).

### MEAL / WATER LINE — DIRECTOR DOCUMENT BASELINE — EXACT

| ID | Item | Category/Rarity | Buy / Sell | Effect | Shelf |
|---|---|---|---:|---|---:|
| rice | 삼각김밥 | Food C | 35 / 70 | 강인함 +6, Supply 5 | 2d |
| water | 생수 | Drink C | 40 / 80 | 강인함 +10, Supply 2 | 2d |
| bar | 간단 도시락 | Food U | 100 / 200 | 강인함 +12, Supply 6, 원정 소지금 획득 +20% | 2d |
| premium | 길드 특제 도시락 | Food R | 185 / 370 | 강인함 +16, Supply 7, 원정 소지금 획득 +40% | 2d |
| battlelunch | 영웅 결전 도시락 | Food E | 210 / 420 | 강인함 +18, Supply 9 | 2d |
| herobar | 왕도 천연암반수 | Drink E | 185 / 370 | 강인함 +20, Supply 2 | 3d |

The meal Stat ladder is intentionally readable:

    6 -> 10 -> 14 -> 18

The water route is intentionally more Stat-concentrated than the meal at the same broad stage,
while keeping much lower Supply (Fatigue recovery). (User 2026-09-24, v2.9.0)

The table above is the approved DIRECTOR DOCUMENT BASELINE.

After Source adoption, price/efficiency may be measured.
Any later change requires a new approved ITEM amendment; QA does not auto-tune it.

### OTHER ACTIVE ITEMS

`DIRECTOR DOCUMENT BASELINE`

| # | Item | Category / Rarity | Buy / Sell | Effect | Hazard Role |
|---:|---|---|---:|---|---|
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +10, Supply 3 | Cold Lower |
| 5 | 초코바 | Food C | 30 / 60 | 기동 +8, Supply 3 | — |
| 6 | 캔커피 | Drink C | 40 / 80 | 기동 +12, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 40 / 80 | 정신 +15, Supply 2 | Stat route |
| 8 | 하급 포션 | Potion C | 70 / 140 | 투력 +8 | — |
| 9 | 얼음컵 | Drink C | 30 / 60 | 화염 +10, Supply 1 | Fire Lower |
| 10 | 랜턴 건전지 | Field Gear C | 45 / 90 | 어둠 +16 | Dark Main |
| 11 | 경량 로프 | Field Gear C | 50 / 100 | 속박 +16 | Bind Main |
| 12 | 집중 사탕 | Food C | 35 / 70 | 공포 +10, Supply 2 | Fear Lower |
| 13 | 불룡볶음면 | Food U | 80 / 160 | 강인함 +8, 냉기 +6, Supply 3 | Cold Hybrid |
| 14 | 에너지드링크 | Drink U | 80 / 160 | 기동 +17, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink U | 70 / 140 | 공포 +20, 기동 -4, Supply 1 | Fear Main / RiskReward |
| 16 | 구급키트 | Insurance U | 80 / 160 | Outcome 1단계 완화 (중상 → 부상 · 부상 → 무사) Aftercare | Aftercare |
| 17 | 방진마스크 | Field Gear U | 80 / 160 | 독 +24 | Poison Lower |
| 18 | 핫팩 | Field Gear U | 70 / 140 | 냉기 +24 | Cold Main |
| 19 | 방수망토 | Field Gear U | 75 / 150 | 부식 +6, 진창 +6 | Dual Hybrid |
| 20 | 부식 방지 코팅제 | Field Gear U | 85 / 170 | 부식 +24 | Corrosion Main |
| 21 | 원정용 장화 | Field Gear U | 75 / 150 | 진창 +20 | Mire Main |
| 22 | 설원 고글 | Field Gear U | 70 / 140 | 화이트아웃 +20 | Whiteout Main |
| 23 | 상급 포션 | Potion R | 175 / 350 | 투력 +20 | — |
| 24 | 농축 해독제 | Field Gear R | 95 / 190 | 독 +30 | Poison Main |
| 25 | 귀환석 | Insurance R | 260 / 520 | Emergency Escape +50%p path | Severe/Death Insurance |
| 26 | 중급 포션 | Potion U | 125 / 250 | 투력 +14 | — |
| 28 | 쿨링 이온음료 | Drink R | 95 / 190 | 화염 +26, Supply 1 | Fire Main |
| 29 | 세계수 생환부적 | Insurance E | 400 / 800 | Death -> Severe Injury once | Death Insurance |
| 30 | 황금 1+1 쿠폰 | Special L | 500 / 1000 | next explicit consumable effect duplication interaction | Utility |
| 31 | 거미줄 방호세트 | Field Gear E | 165 / 330 | 독 +22, 속박 +18 | Spider Hybrid |
| 32 | 연금 방수슈트 | Field Gear E | 165 / 330 | 부식 +22, 진창 +18 | Slime Hybrid |
| 33 | 성화 랜턴 | Field Gear E | 165 / 330 | 공포 +18, 어둠 +18 | Crypt Hybrid |
| 34 | 백설 방한고글 | Field Gear E | 165 / 330 | 냉기 +22, 화이트아웃 +18 | Snow Hybrid |
| 35 | 마그마 냉각장비 | Field Gear E | 175 / 350 | 화염 +18, 투력 +6 | Fire Hybrid |
| 38 | 초고속 에너지드링크 | Drink E | 175 / 350 | 기동 +22, Supply 2 | Top-end mobility |
| 39 | 대현자 허브엘릭서 | Drink E | 175 / 350 | 정신 +24, Supply 2 | Top-end spirit |
| 40 | 최상급 포션 | Potion E | 210 / 420 | 투력 +28 | Top-end raw Power |

Active catalog count is exactly 40.
Retired active identities:
```text
붕대
마석 보조배터리
```

No active Item creates a separate poison Condition/cure subsystem.

### ACTIVE RARITY DISTRIBUTION — EXACT

The approved `bar` repurpose is Uncommon.

The active 40-Item distribution is therefore:

    Common 11
    Uncommon 12
    Rare 5
    Epic 11
    Legendary 1

Do not move another Item solely to alter these approved Common/Uncommon counts.

## SHELF LIFE — EXACT

(User 2026-09-24/25, v2.9.0): no active Item is non-expiring; every unit has a shelf life of 2 to 5 days, counted from the
stocking day, and is discarded at the morning it runs out. The rule behind the table:

- Food: 2 days unless it carries a Hazard Counter (컵라면 3, 집중 사탕 4, 불룡볶음면 3); 초코바 is 2
- Drink: 2 days unless Uncommon or above (3) or a Hazard Counter Drink (얼음컵 3, 용사의 곡주 4, 쿨링 이온음료 5)
- Potion: 3 / 4 / 5 / 5 by tier (하급 / 중급 / 상급 / 최상급)
- Field Gear: 3 (Common), 4 (Uncommon), 5 (Rare and above)
- Insurance / Special: 구급키트 4, 귀환석 4, 세계수 생환부적 5, 황금 1+1 쿠폰 5
- 대형 냉장고 and 냉장 유통 계약 extend Food/Drink exactly as `RELIC_v2.8.0.md` states; nothing else moves a shelf life

| ID | Item | Category | Shelf |
|---|---|---|---:|
| rice | 삼각김밥 | Food | 2d |
| ramen | 컵라면 | Food | 3d |
| bar | 간단 도시락 | Food | 2d |
| choco | 초코바 | Food | 2d |
| candy | 집중 사탕 | Food | 4d |
| lava | 불룡볶음면 | Food | 3d |
| premium | 길드 특제 도시락 | Food | 2d |
| battlelunch | 영웅 결전 도시락 | Food | 2d |
| water | 생수 | Drink | 2d |
| coffee | 캔커피 | Drink | 2d |
| herbtea | 진정 허브티 | Drink | 2d |
| ice | 얼음컵 | Drink | 3d |
| energy | 에너지드링크 | Drink | 3d |
| wine | 용사의 곡주 | Drink | 4d |
| ion | 쿨링 이온음료 | Drink | 5d |
| herobar | 왕도 천연암반수 | Drink | 3d |
| hyperenergy | 초고속 에너지드링크 | Drink | 3d |
| sageelixir | 대현자 허브엘릭서 | Drink | 3d |
| potion | 하급 포션 | Potion | 3d |
| midpotion | 중급 포션 | Potion | 4d |
| highpotion | 상급 포션 | Potion | 5d |
| toppotion | 최상급 포션 | Potion | 5d |
| battery | 랜턴 건전지 | Field Gear | 3d |
| rope | 경량 로프 | Field Gear | 3d |
| mask | 방진마스크 | Field Gear | 4d |
| heat | 핫팩 | Field Gear | 4d |
| cloak | 방수망토 | Field Gear | 4d |
| coating | 부식 방지 코팅제 | Field Gear | 4d |
| boots | 원정용 장화 | Field Gear | 4d |
| snowgoggles | 설원 고글 | Field Gear | 4d |
| antidote | 농축 해독제 | Field Gear | 5d |
| spiderkit | 거미줄 방호세트 | Field Gear | 5d |
| slimesuit | 연금 방수슈트 | Field Gear | 5d |
| cryptlantern | 성화 랜턴 | Field Gear | 5d |
| snowvisor | 백설 방한고글 | Field Gear | 5d |
| magmagear | 마그마 냉각장비 | Field Gear | 5d |
| kit | 구급키트 | Insurance | 4d |
| stone | 귀환석 | Insurance | 4d |
| tree | 세계수 생환부적 | Insurance | 5d |
| coupon | 황금 1+1 쿠폰 | Special | 5d |

## ITEM ROLE NOTES

### Common / Rarity 0

1. 삼각김밥
identity=cheap basic expedition supply

3. 컵라면
roles=[Supply,HybridCounter]
counter=cold(low)
identity=cheap supply with light Cold flexibility

5. 초코바
roles=[Supply,Stat]
identity=cheap quick Stat support
hiddenPostFatigue=NO

6. 캔커피
roles=[Supply,Stat]
identity=Mobility support
caffeineStack=NO

9. 얼음컵
roles=[Supply,DirectCounter]

10. 랜턴 건전지
roles=[DirectCounter]
mainCounter=dark
identity=Dark specialist

11. 경량 로프
mainCounter=bind
identity=Bind specialist

12. 집중 사탕
counter=fear(low)

### Uncommon / Rarity 1

13. 불룡볶음면
roles=[Supply,Stat,HybridCounter]
rule=HotPack remains stronger pure-Cold specialist

14. 에너지드링크
roles=[Supply,Stat]
identity=strong Mobility support
caffeineStack=NO

15. 용사의 곡주
roles=[Supply,DirectCounter,RiskReward]
mainCounter=fear
identity=Fear specialist with explicit Mobility trade-off

16. 구급키트
roles=[Insurance]
subrole=InjuryInsurance
identity=strong injury protection

17. 방진마스크
roles=[DirectCounter]
counter=poison
identity=affordable secondary Poison response

18. 핫팩
roles=[DirectCounter]
mainCounter=cold
identity=affordable efficient Cold specialist

19. 방수망토
roles=[HybridCounter]
counters=[corrosion,mire]
identity=flexible Slime-family gear
rule=must not outperform either dedicated Main on its own Hazard

20. 부식 방지 코팅제
roles=[DirectCounter]
mainCounter=corrosion
identity=Corrosion specialist

21. 원정용 장화
roles=[DirectCounter]
mainCounter=mire
identity=Mire specialist

22. 설원 고글
roles=[DirectCounter]
mainCounter=whiteout
identity=Whiteout specialist

### Rare / Rarity 2

24. 농축 해독제
roles=[DirectCounter]
mainCounter=poison
identity=strong Poison specialist

25. 귀환석
roles=[Insurance]
subrole=EscapeInsurance

27. 길드 특제 도시락
roles=[Supply,Economy]
identity=Premium Food / expedition economy
rule=must not dominate survival+supply+loot+general stats simultaneously

### Epic / Rarity 3

29. 세계수 생환부적
roles=[Insurance]
subrole=DeathInsurance
core=Death -> Severe Injury once

### Legendary / Rarity 4

30. 황금 1+1 쿠폰
roles=[Utility]
identity=explicit next-consumable duplication interaction
slotCost=1
metaUnlock=distinctBossClear>=1
beforeUnlockOfferEligible=NO
unlockOwnership=META

## CATALOG BUILD SUPPORT

Catalog size is not a goal by itself.

Rules:
- do not add Items merely to hit a round number
- low-rarity specialist Items remain valuable in late run when their Hazard appears
- Premium must have a meaningful Rare+ pool without making Rare+ universally superior
- Expedition must have enough FieldGear/Insurance/Counter stock to support its Relics
- Fresh must have broad Food/Drink access across price/rarity and must not erase specialist FieldGear advantage
- Rotation/low-cost play must remain viable through cheap useful SKUs and bulk ordering

Build-filtered Relics must not depend on one single eligible SKU.

Canonical Relic interaction:
-> `RELIC_v2.8.0.md`

## RARITY / UPGRADE

Higher rarity may be:
- stronger
- broader
- more reliable
- stronger Risk/Reward
- premium economy-oriented

Not every upgrade must be a sidegrade.

But:
rarity != universal dominance

A specialized lower-rarity Direct Counter may remain best for its specific Hazard.

## JOB INTERACTION

Item value must not secretly change by Job ID.

jobIdEffectModifier=NO
jobIdPurchaseBias=NO
jobIdCounterModifier=NO

Job affinity should emerge from:
BaseStats + Growth + visible Traits

Canonical:
-> `NPC_TRAIT_v2.8.0.md`

## INFORMATION

Player can see:
- Category
- relevant Functional Role
- Supply contribution as `피로 회복 N` (User 2026-09-24, v2.9.0)
- actual Stat effect
- Counter effect
- Condition effect
- Insurance behavior
- explicit penalty/tradeoff

Player can see exact Item-side values for:
- Core Stat
- Hazard Counter
- Supply (`피로 회복 N`)
- explicit penalty
- Insurance behavior

Do not expose:
- exact expedition success %
- hidden internal formula

Do not expose hidden Gate requirement/formula or exact success probability through the Item panel.

### PRESENTATION ORDER — EXACT

(User 2026-09-24, v2.9.0): an Item's effect lines are listed in one fixed order by category, the same on the ORDER offer row, the SALE shelf row, the counter tray's `특수 효과` line and the codex, never reordered or emphasized by the Gate or the customer:

```text
Food       : 피로 회복 N first, then the Item's other effects in catalog order
Drink      : Stat / Hazard Counter effects in catalog order first, then 피로 회복 N
Potion     : 투력 +N
Field Gear : Hazard Counter effects in catalog order (a Hybrid keeps both)
Insurance  : its one function line
Special    : its one function line
```

The order is identity information (what kind of Item this is), not advice.

Principle:
`재료는 공개, 공식은 숨김`

Material hidden behavior=NO

## SALE / INVENTORY

Sale shows all currently sellable inventory.

Same Item may be stacked in UI.

Player chooses:
item type

Consumed physical unit:
nearest expiry first

SALE shelf order: nearest expiry first, ties in the existing order; each row carries `폐기 N일` (exact UI -> `UI_UX_v2.8.0.md` §SALE — SHELF ORDER) (User 2026-09-24/25, v2.9.0)

Consumer slot limit is separate from inventory visibility.

Canonical:
-> `SALE_v2.8.0.md`

## BALANCE QA

Per Item track:
- offer rate
- order rate
- sale rate
- use rate
- avg purchase day
- margin
- affordability 50/100/150
- Supply contribution
- expedition contribution
- survival contribution
- dead-pick rate
- universal-best rate

By role:
- Supply usage
- Direct usage
- Hybrid usage
- Stat usage
- Insurance usage
- RiskReward usage

By build filter:
- eligible SKU count by Day/rarity
- offer frequency under relevant Relics
- dead-filter rate

Reject:
- mandatory single Item
- never-picked Item
- strict superior Item
- too-cheap universal counter
- insurance always-buy / never-buy
- Hybrid with no flexibility value
- Fresh Relic making specialist Counter obsolete
- build Relic with too few usable SKUs

## RELATED

Hazard / Fatigue / Supply -> Fatigue -> `DUNGEON_HAZARD_v2.8.0.md` (User 2026-09-24, v2.9.0)
Job / Trait multipliers -> `NPC_TRAIT_v2.8.0.md`
Relic / build modifiers -> `RELIC_v2.8.0.md`
Sale handling / inventory -> `SALE_v2.8.0.md`
Order / reroll / pricing / Rarity progression -> `ECONOMY_ORDER_v2.8.0.md`
Final usefulness -> `FINAL_EXPEDITION_v2.8.0.md`
Meta unlock -> `META_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
