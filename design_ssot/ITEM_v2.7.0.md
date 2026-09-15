# ITEM

DOC=ITEM
OWNER=item,catalog,category,role,counter,supply,insurance,potion
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ITEM_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

Unchanged Item interaction, inventory consumption, price-mode ownership, explicit Special interaction, and general visibility rules inherit `ITEM_v2.5.0.md`.

This patch replaces the v2.5 player-facing category set, active catalog values, Potion/Injury line, and Hazard counter matrix.

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
- Food = high Supply / Fatigue management + small secondary value
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

## HAZARD COUNTER BASELINE

`DIRECTOR DOCUMENT BASELINE`

| Hazard | Main / Upper | Lower | Hybrid / Natural alternative |
|---|---|---|---|
| poison | 농축 해독제 +18 | 방진마스크 +12 | 강인함 / 해독가 |
| bind | 경량 로프 +16 | — | 기동 / Stat support |
| corrosion | 부식 방지 코팅제 +18 | — | 방수망토 +6 / 강인함 |
| mire | 원정용 장화 +16 | — | 방수망토 +6 / 기동 |
| fire | 쿨링 이온음료 +18 | 얼음컵 +10 | 강인함 / 내열성 |
| fear | 용사의 곡주 +18 | 집중 사탕 +10 | 정신 |
| dark | 랜턴 건전지 +16 | — | 정신+기동 / 눈썰미 |
| cold | 핫팩 +18 | 컵라면 +10 | 불룡볶음면 +6 / 강인함 |
| whiteout | 설원 고글 +16 | — | 정신+기동 / 눈썰미 |

Dedicated Field Gear specialist Items carry no generic positive Core Stat unless a future explicit Item design changes that.
Their cost is narrow coverage.

Hazard Threat/readiness -> `DUNGEON_HAZARD_v2.7.0.md`.

## POTION LINE — EXACT BASELINE

`DIRECTOR DOCUMENT BASELINE`

| Item | Rarity | Buy / Sell | Effect |
|---|---:|---:|---|
| 하급 포션 | Common | 70 / 140 | 투력 +6 |
| 중급 포션 | Uncommon | 110 / 230 | 투력 +9 |
| 상급 포션 | Rare | 150 / 300 | 투력 +12 |

All three:
```text
Category = Potion
Supply = 0
Hazard Counter = 0
Insurance = 0
```

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
Buy / Sell = 50 / 100
Shelf Life = 5
정신 +10
Supply 2
```

It is a generic Spirit Stat route, not a Fear/Dark/Whiteout Counter.
Use a new active Item ID; do not reuse retired `bandage` as the new Drink identity.

Start-stock ownership -> `CORE_RUN_v2.7.0.md`.

## INSURANCE HIERARCHY — v2.7

### 구급키트

`DIRECTOR DOCUMENT BASELINE`

```text
Category = Insurance
Rarity = Uncommon
Buy / Sell = 120 / 240
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
| 1 | 삼각김밥 | Food C | 35 / 70 | 강인함 +5, Supply 5 | — |
| 2 | 생수 | Drink C | 25 / 55 | 강인함 +4, Supply 3 | — |
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +10, Supply 5 | Cold Lower |
| 4 | 핫바 | Food C | 40 / 80 | 투력 +4, Supply 4 | — |
| 5 | 초코바 | Food C | 30 / 65 | 기동 +5, Supply 4 | — |
| 6 | 캔커피 | Drink C | 35 / 75 | 기동 +8, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 50 / 100 | 정신 +10, Supply 2 | Stat route |
| 8 | 하급 포션 | Potion C | 70 / 140 | 투력 +6 | — |
| 9 | 얼음컵 | Drink C | 25 / 60 | 화염 +10, Supply 1 | Fire Lower |
| 10 | 랜턴 건전지 | Field Gear C | 40 / 85 | 어둠 +16 | Dark Main |
| 11 | 경량 로프 | Field Gear C | 50 / 105 | 속박 +16 | Bind Main |
| 12 | 집중 사탕 | Food C | 35 / 75 | 공포 +10, Supply 3 | Fear Lower |
| 13 | 불룡볶음면 | Food U | 65 / 135 | 강인함 +5, 냉기 +6, Supply 4 | Cold Hybrid |
| 14 | 에너지드링크 | Drink U | 70 / 150 | 기동 +10, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink U | 60 / 130 | 공포 +18, 기동 -4, Supply 1 | Fear Main / RiskReward |
| 16 | 구급키트 | Insurance U | 120 / 240 | Outcome 유지 / persistent Injury 1단계 Aftercare | Aftercare |
| 17 | 방진마스크 | Field Gear U | 65 / 135 | 독 +12 | Poison Lower |
| 18 | 핫팩 | Field Gear U | 55 / 120 | 냉기 +18 | Cold Main |
| 19 | 방수망토 | Field Gear U | 75 / 160 | 부식 +6, 진창 +6 | Dual Hybrid |
| 20 | 부식 방지 코팅제 | Field Gear U | 70 / 150 | 부식 +18 | Corrosion Main |
| 21 | 원정용 장화 | Field Gear U | 65 / 135 | 진창 +16 | Mire Main |
| 22 | 설원 고글 | Field Gear U | 60 / 125 | 화이트아웃 +16 | Whiteout Main |
| 23 | 상급 포션 | Potion R | 150 / 300 | 투력 +12 | — |
| 24 | 농축 해독제 | Field Gear R | 180 / 360 | 독 +18; retain only actually implemented explicit poison-cure utility, no new poison Condition system | Poison Main |
| 25 | 귀환석 | Insurance R | 260 / 520 | Emergency Escape +50%p path | Severe/Death Insurance |
| 26 | 중급 포션 | Potion U | 110 / 230 | 투력 +9 | — |
| 27 | 길드 프리미엄 도시락 | Food R | 280 / 560 | 강인함 +6, Supply 7, Loot +20% | — |
| 28 | 쿨링 이온음료 | Drink R | 200 / 400 | 화염 +18, Supply 1 | Fire Main |
| 29 | 세계수 생환부적 | Insurance E | 600 / 1200 | Death -> Severe Injury once | Death Insurance |
| 30 | 황금 1+1 쿠폰 | Special L | 500 / 1000 | next explicit consumable effect duplication interaction | Utility |

Active catalog count remains exactly 30.
Retired active identities:
```text
붕대
마석 보조배터리
```

## CATEGORY AFFINITY BOUNDARY

Food/Drink category-affinity or Fresh Relic effects do not automatically multiply:
- Hazard Counter
- Insurance
- RiskReward penalty
- unrelated special effects

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
Final usefulness -> `FINAL_EXPEDITION_v2.7.0.md`
