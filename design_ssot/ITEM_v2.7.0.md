# ITEM

DOC=ITEM
OWNER=item,catalog,category,role,counter,supply,insurance,potion,modifier_composition
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ITEM_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

Unchanged Item interaction, inventory consumption, price-mode ownership, explicit Special interaction, and general visibility rules inherit `ITEM_v2.5.0.md`.

This patch replaces the v2.5 player-facing category set, active catalog values, Potion/Injury line, Hazard counter matrix, and active catalog count.

## PLAYER-FACING CATEGORY — EXACT

```text
Food
Drink
Potion
Field Gear
Insurance
Special
```

`Medical` is removed.
Category follows gameplay use rather than physical object shape.

Contracts:
- Food = high Supply / Fatigue management + small-to-medium secondary Core Stat value
- Drink = lower Supply + sharper Stat/Counter/RiskReward value
- Potion = generic immediate raw-Power specialist
- Field Gear = narrow Hazard specialist or explicit Hazard Hybrid
- Insurance = bad-outcome prevention/mitigation/conversion/aftercare
- Special = explicit utility outside ordinary category contracts

`Special` is not a dumping category for ordinary Stat Items.

## ITEM ROLE BOUNDARY

A normal Item should read primarily as one gameplay purpose with at most one meaningful secondary purpose unless explicitly exceptional.

Do not hide:
- Core Stat value
- Supply value
- Hazard Counter value
- Insurance behavior
- explicit penalty/tradeoff

Do not collapse Hazard Counter into generic Power.

The exact active-catalog table below controls approved multi-effect exceptions; do not remove an explicit listed effect merely to force a role-count heuristic.

## FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION — EXACT

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
= +30% +40% +80%
= base ×2.50

대식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= +30% +40% +80% +25%
= base ×2.75

소식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= -20% +40% +80% +25%
= base ×2.25
```

Drink has no Food-affinity Trait modifier, so the same three Fresh native-Stat bonuses alone remain base ×2.45 when all conditions apply.

GLUTTONY's Final reduction, when applicable, occurs after the final Item-side positive Core-Stat contribution has been produced, as owned by `BOSS_v2.7.0.md`.

## DIRECT CORE-STAT ITEM VALUE — APPROVED v2.7 REBALANCE

Flat native Core-Stat Item values are intentionally higher than the prior v2.7 draft baseline.

Reason:
- NPC Level/Growth remains the long-term body of strength
- but one appropriate Stat Item must still create a perceptible, decision-relevant change on a mid/late-Run NPC
- do not add a new Day/Level percentage-scaling Item system merely to create late-game relevance
- use the exact flat values in the active catalog below

Fresh / Food-affinity / Potionbody modifiers continue to use their existing owned composition rules from these revised base Item values.

## ITEM PRICE ALIGNMENT — APPROVED v2.7 REBALANCE

Item price should follow actual gameplay breadth/slot value, not Rarity label alone.

Rules:
- narrow Main Hazard specialists with similar +16~18 Counter value should remain in comparable practical SALE bands
- Rarity may justify a modest premium but must not make a simple single-Hazard answer practically unsellable to the customers who need it
- broad multi-role Food / strong Insurance / exceptional Utility may remain materially more expensive
- Epic late-Run Items may command a slot-efficiency premium, but 50% pricing must remain a plausible NPC-investment route rather than becoming fake affordability
- exact Buy/Sell values are the active catalog values below

## HAZARD COUNTER BASELINE

`DIRECTOR DOCUMENT BASELINE`

| Hazard | Main / Upper | Lower | Hybrid / Natural alternative |
|---|---|---|---|
| poison | 농축 해독제 +18 | 방진마스크 +12 | 강인함 / 해독가 / 거미줄 방호세트 +12 |
| bind | 경량 로프 +16 | — | 기동 / Stat support / 거미줄 방호세트 +12 |
| corrosion | 부식 방지 코팅제 +18 | — | 방수망토 +6 / 강인함 / 연금 방수슈트 +12 |
| mire | 원정용 장화 +16 | — | 방수망토 +6 / 기동 / 연금 방수슈트 +12 |
| fire | 쿨링 이온음료 +18 | 얼음컵 +10 | 강인함 / 내열성 / 마그마 냉각장비 +14 |
| fear | 용사의 곡주 +18 | 집중 사탕 +10 | 정신 / 성화 랜턴 +12 |
| dark | 랜턴 건전지 +16 | — | 정신+기동 / 눈썰미 / 성화 랜턴 +12 |
| cold | 핫팩 +18 | 컵라면 +10 | 불룡볶음면 +6 / 강인함 / 백설 방한고글 +12 |
| whiteout | 설원 고글 +16 | — | 정신+기동 / 눈썰미 / 백설 방한고글 +12 |

Dedicated single-Hazard Field Gear specialist Items carry no generic positive Core Stat unless an explicit active-catalog exception says otherwise.
Their cost is narrow coverage.

Epic Family Hybrid Field Gear intentionally trades per-Hazard peak strength for one-slot breadth.
It must not become stronger on each covered Hazard than the dedicated Main specialist for that Hazard.

Hazard Threat/readiness -> `DUNGEON_HAZARD_v2.7.0.md`.

## POTION LINE — EXACT BASELINE

`DIRECTOR DOCUMENT BASELINE`

| Item | Rarity | Buy / Sell | Effect |
|---|---:|---:|---|
| 하급 포션 | Common | 70 / 140 | 투력 +8 |
| 중급 포션 | Uncommon | 110 / 230 | 투력 +12 |
| 상급 포션 | Rare | 150 / 300 | 투력 +16 |
| 최상급 포션 | Epic | 190 / 400 | 투력 +24 |

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

Potion Trait interaction -> `NPC_TRAIT_v2.7.0.md`.

## BANDAGE RETIREMENT / SPIRIT STAT ROUTE

`붕대` is removed from the active catalog.
It is not converted into another Item on legacy saves.

The active catalog slot is replaced by:

```text
진정 허브티
Category = Drink
Rarity = Common
Buy / Sell = 40 / 85
Shelf Life = 5
정신 +15
Supply 2
```

It is a generic Spirit Stat route, not a Fear/Dark/Whiteout Counter.
Use a new active Item ID; do not reuse retired `bandage` as the new Drink identity.

Start-stock ownership -> `CORE_RUN_v2.7.0.md`.

## EPIC LATE-RUN VALUE LAYER — EXACT v2.7

v2.7 adds 10 Epic preparation Items.
They are not D20-hard-unlocked.
Their late-Run identity comes from the Day-band Rarity weights owned by `ECONOMY_ORDER_v2.7.0.md`.

Design split:

```text
5 Epic Field Gear
= Family-shaped one-slot Hybrid breadth

5 Epic Food/Drink/Potion
= top-end direct Stat / Supply slot efficiency
```

Purpose:
- D20+ preparation must not feel like the Player is still choosing only the same early/mid SKU power ceiling
- late-Run progression should improve **what one slot can do**, not add a third normal Bag slot
- Epic must remain optional high-efficiency preparation; T3 must still have viable routes without drawing one exact Epic SKU

### EPIC FIELD GEAR — FAMILY HYBRIDS

```text
거미줄 방호세트
Field Gear / Epic
150 / 320
독 +12
속박 +12

연금 방수슈트
Field Gear / Epic
150 / 320
부식 +12
진창 +12

성화 랜턴
Field Gear / Epic
150 / 320
공포 +12
어둠 +12

백설 방한고글
Field Gear / Epic
150 / 320
냉기 +12
화이트아웃 +12

마그마 냉각장비
Field Gear / Epic
160 / 340
화염 +14
투력 +6
```

FIRE uses one Hazard plus its existing higher-combat identity instead of inventing a second FIRE Hazard.
The `투력 +6` on `마그마 냉각장비` is an explicit catalog exception; it is not permission for generic specialist Field Gear to gain Core Stats.

### EPIC FOOD / DRINK / POTION — TOP-END PREPARATION

```text
결전 특선 도시락
Food / Epic
180 / 380
강인함 +12
Supply 9

용사 특식 핫바
Food / Epic
170 / 360
투력 +8
Supply 7

초고속 에너지드링크
Drink / Epic
160 / 340
기동 +18
Supply 2

대현자 허브엘릭서
Drink / Epic
160 / 340
정신 +20
Supply 2

최상급 포션
Potion / Epic
190 / 400
투력 +24
```

Fresh/Food-affinity/Potionbody rules apply normally by category.
No separate Epic-only amplifier is created.

## INSURANCE HIERARCHY — v2.7

### 구급키트

`DIRECTOR DOCUMENT BASELINE`

```text
Category = Insurance
Rarity = Uncommon
Buy / Sell = 100 / 210
```

It does not change the resolved expedition Outcome.
After Outcome resolution and after higher-priority emergency outcome conversions, it changes only the persistent Injury state:

```text
부상 Outcome
-> Outcome/XP/Loot/Fatigue remain 부상
-> persistent injury=0, recovery=0

중상 Outcome
-> Outcome/XP/Loot/Fatigue remain 중상
-> persistent injury=1, recovery=0

사망
-> no effect
```

This is Item Aftercare, not natural recovery.
It does not change the existing natural Severe-Injury recovery rule owned by NPC_TRAIT.
It has no hidden injury-risk percentage.

### 귀환석

Inherits the existing Rare Insurance identity:
- emergency escape
- +50%p escape contribution under its current resolution path
- may convert eligible Severe/Death crisis to Retreat
- does not increase combat success directly

### 세계수 생환부적

Inherits the existing Epic death-insurance identity:
- one use
- remaining Death -> Severe Injury

### Insurance resolution order

Where multiple effects are present:

```text
1. resolve ordinary expedition outcome
2. 귀환석 emergency-escape conversion when eligible
3. if Death remains, 세계수 생환부적 Death -> Severe Injury
4. 구급키트 Aftercare applies to the final non-death Injury state
```

Do not rerun the whole outcome-resolution chain after Aftercare.

Final-specific usability -> `FINAL_EXPEDITION_v2.7.0.md`.

## ACTIVE CATALOG — v2.7 EXACT BASELINE

`DIRECTOR DOCUMENT BASELINE` where values changed/new.
Unlisted implementation-only flavor fields/shelf lives inherit the previous Item where identity remains unchanged, except where this patch states otherwise.

| # | Item | Category / Rarity | Buy / Sell | v2.7 Effect | Hazard Role |
|---:|---|---|---:|---|---|
| 1 | 삼각김밥 | Food C | 35 / 70 | 강인함 +8, Supply 5 | — |
| 2 | 생수 | Drink C | 25 / 55 | 강인함 +6, Supply 3 | — |
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +10, Supply 5 | Cold Lower |
| 4 | 핫바 | Food C | 40 / 80 | 투력 +6, Supply 4 | — |
| 5 | 초코바 | Food C | 30 / 65 | 기동 +8, Supply 4 | — |
| 6 | 캔커피 | Drink C | 40 / 85 | 기동 +12, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 40 / 85 | 정신 +15, Supply 2 | Stat route |
| 8 | 하급 포션 | Potion C | 70 / 140 | 투력 +8 | — |
| 9 | 얼음컵 | Drink C | 30 / 65 | 화염 +10, Supply 1 | Fire Lower |
| 10 | 랜턴 건전지 | Field Gear C | 45 / 95 | 어둠 +16 | Dark Main |
| 11 | 경량 로프 | Field Gear C | 50 / 105 | 속박 +16 | Bind Main |
| 12 | 집중 사탕 | Food C | 35 / 75 | 공포 +10, Supply 3 | Fear Lower |
| 13 | 불룡볶음면 | Food U | 65 / 135 | 강인함 +8, 냉기 +6, Supply 4 | Cold Hybrid |
| 14 | 에너지드링크 | Drink U | 70 / 150 | 기동 +15, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink U | 60 / 130 | 공포 +18, 기동 -4, Supply 1 | Fear Main / RiskReward |
| 16 | 구급키트 | Insurance U | 100 / 210 | Outcome 유지 / persistent Injury 1단계 Aftercare | Aftercare |
| 17 | 방진마스크 | Field Gear U | 65 / 135 | 독 +12 | Poison Lower |
| 18 | 핫팩 | Field Gear U | 60 / 130 | 냉기 +18 | Cold Main |
| 19 | 방수망토 | Field Gear U | 75 / 160 | 부식 +6, 진창 +6 | Dual Hybrid |
| 20 | 부식 방지 코팅제 | Field Gear U | 70 / 150 | 부식 +18 | Corrosion Main |
| 21 | 원정용 장화 | Field Gear U | 65 / 135 | 진창 +16 | Mire Main |
| 22 | 설원 고글 | Field Gear U | 60 / 125 | 화이트아웃 +16 | Whiteout Main |
| 23 | 상급 포션 | Potion R | 150 / 300 | 투력 +16 | — |
| 24 | 농축 해독제 | Field Gear R | 80 / 170 | 독 +18 | Poison Main |
| 25 | 귀환석 | Insurance R | 260 / 520 | Emergency Escape +50%p path | Severe/Death Insurance |
| 26 | 중급 포션 | Potion U | 110 / 230 | 투력 +12 | — |
| 27 | 길드 프리미엄 도시락 | Food R | 170 / 360 | 강인함 +10, Supply 7, Loot +20% | — |
| 28 | 쿨링 이온음료 | Drink R | 80 / 170 | 화염 +18, Supply 1 | Fire Main |
| 29 | 세계수 생환부적 | Insurance E | 600 / 1200 | Death -> Severe Injury once | Death Insurance |
| 30 | 황금 1+1 쿠폰 | Special L | 500 / 1000 | next explicit consumable effect duplication interaction | Utility |
| 31 | 거미줄 방호세트 | Field Gear E | 150 / 320 | 독 +12, 속박 +12 | Spider Hybrid |
| 32 | 연금 방수슈트 | Field Gear E | 150 / 320 | 부식 +12, 진창 +12 | Slime Hybrid |
| 33 | 성화 랜턴 | Field Gear E | 150 / 320 | 공포 +12, 어둠 +12 | Crypt Hybrid |
| 34 | 백설 방한고글 | Field Gear E | 150 / 320 | 냉기 +12, 화이트아웃 +12 | Snow Hybrid |
| 35 | 마그마 냉각장비 | Field Gear E | 160 / 340 | 화염 +14, 투력 +6 | Fire Hybrid |
| 36 | 결전 특선 도시락 | Food E | 180 / 380 | 강인함 +12, Supply 9 | Top-end survival/supply |
| 37 | 용사 특식 핫바 | Food E | 170 / 360 | 투력 +8, Supply 7 | Top-end Food combat/supply |
| 38 | 초고속 에너지드링크 | Drink E | 160 / 340 | 기동 +18, Supply 2 | Top-end mobility |
| 39 | 대현자 허브엘릭서 | Drink E | 160 / 340 | 정신 +20, Supply 2 | Top-end spirit |
| 40 | 최상급 포션 | Potion E | 190 / 400 | 투력 +24 | Top-end raw Power |

Active catalog count is exactly 40.
Retired active identities:
```text
붕대
마석 보조배터리
```

No active Item creates a separate poison Condition/cure subsystem in v2.7.

The new Epic Items have no separate D20 Item eligibility gate.
Their practical late-Run frequency is controlled by `ECONOMY_ORDER_v2.7.0.md` Day-band Rarity weights.

## CATEGORY AFFINITY BOUNDARY

Food/Drink category-affinity or Fresh Relic effects do not automatically multiply:
- Hazard Counter
- Insurance
- RiskReward penalty
- unrelated special effects

Exact Trait modifiers -> `NPC_TRAIT_v2.7.0.md`.
Exact Fresh Relic effects -> `RELIC_v2.7.0.md`.

## INFORMATION

Player can see exact Item-side values for:
- Core Stat
- Hazard Counter
- Supply
- explicit penalty
- Insurance behavior

Do not expose hidden Gate requirement/formula or exact success probability through the Item panel.

## RELATED

Hazard/Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Trait multipliers -> `NPC_TRAIT_v2.7.0.md`
Relic modifiers -> `RELIC_v2.7.0.md`
Sale handling -> `SALE_v2.7.0.md`
Order Rarity progression -> `ECONOMY_ORDER_v2.7.0.md`
Final usefulness -> `FINAL_EXPEDITION_v2.7.0.md`