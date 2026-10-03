# ITEM

DOC=ITEM
OWNER=item,catalog,category,role,food,drink,potion,field_gear,insurance,special,counter,supply,modifier_composition,item_role,item_economy
DOC_VERSION=2.10.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.10.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

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

globalPressure=NONE

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

ITEM = `이번 원정에 무엇을 준비시킬 것인가`

Item responsibilities: Stat support, Fatigue recovery (Supply), Hazard response, Condition management, Insurance,
Risk/Reward, Expedition economy.

Division:
JOB=BaseStats+Growth
TRAIT=CharacterVariation
RELIC=StoreBuild
ITEM=ExpeditionPreparation

Item must primarily answer: `무엇에 좋은가?`

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
- Food = large Fatigue recovery (Supply) + lower secondary Core Stat value
- Drink = small Fatigue recovery (Supply) + sharper Stat/Counter/RiskReward value
- Potion = generic immediate raw-Power specialist
- Field Gear = narrow Hazard specialist or explicit Hazard Hybrid
- Insurance = bad-outcome prevention/mitigation/conversion/aftercare
- Special = explicit utility outside ordinary category contracts

`Special` is not a dumping category for ordinary Stat Items.

## ITEM ROLE BOUNDARY

A normal Item reads primarily as one gameplay purpose with at most one meaningful secondary purpose unless explicitly exceptional.

Do not hide: Core Stat value, Supply value (shown as `피로 회복 N`), Hazard Counter value, Insurance behavior, explicit
penalty/tradeoff. Do not collapse Hazard Counter into generic Power.

The exact active-catalog table controls approved multi-effect exceptions; do not remove an explicit listed effect merely to force a role-count heuristic.

## FUNCTIONAL ROLE

### Stat
direct stat/recovery support

### Supply
reduces the customer's Fatigue; shown as `피로 회복 N` (→ §SUPPLY MODEL)

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
mitigates bad outcomes through escape/retreat/death-conversion effects; does not directly guarantee expedition success

### RiskReward
strong benefit + explicit readable cost/penalty

### Economy
loot/supply-adjacent expedition economy value that is explicitly stated

### Utility
explicit special operation that does not fit Stat/Counter/Insurance/Economy

## SUPPLY MODEL

All active Food/Drink Items provide a visible Supply value > 0 (values: §ACTIVE CATALOG, internal notation `Supply N`).
Its only meaning is Fatigue recovery: the Player sees `피로 회복 N`, never `보급 +N`.

Rules:
- Supply reduces current Fatigue first, then this expedition's Fatigue gain; no Gate requires Supply
- Supply is NOT a Hazard Counter
- no thirst/hunger subsystem; no Food+Drink pairing requirement
- leftover Supply is not persisted and gives no extra expedition bonus
- exact Supply -> Fatigue order and formulas -> `DUNGEON_HAZARD_v2.8.0.md` §SUPPLY -> FATIGUE

Fatigue-recovery contract: Food is the main recovery route; a Drink recovers 1~2; no Food recovers more than 6 except
길드 특제 도시락 (Rare, 7) and 영웅 결전 도시락 (Epic, 9), so the worst single outcome gain (+9) is never erased by one
ordinary Item; a Hazard-Counter
Food keeps at least 2 so 대식가's -1 stays a real cost.

Each Food/Drink Item defines: supplyValue, native Stat/recovery effect if any, explicit Hazard Counter if any, explicit RiskReward if any.

No Item may create thirst, cleanse thirst, require Water after spicy Food, create hidden caffeine stacking, or create a
hunger/thirst gauge.

## DIRECT CORE-STAT ITEM VALUE

Rules:
- NPC Level/Growth remains the long-term body of strength
- one appropriate Stat Item still creates a perceptible, decision-relevant change on a mid/late-Run NPC
- no Day/Level percentage-scaling Item system
- use the exact flat values in the active catalog

Fresh / Food-affinity / Potionbody modifiers use their owned composition rules from these base Item values.

## PRICE

Canonical price modes: 50% / 100% / 150%. Full price/economy rules -> `ECONOMY_ORDER_v2.8.0.md`.

Balance considers buy cost, sale price, margin, NPC wallet burden, role, typical day, rarity, Relic/build interaction.

### ITEM PRICE ALIGNMENT

Item price follows actual gameplay breadth/slot value, not Rarity label alone.

Rules:
- narrow Main Hazard specialists of one Rarity stay in comparable practical SALE bands
- Sell = Buy × 2 for every Item, so the Player can predict a price from its cost
- Rarity may justify a modest premium but must not make a simple single-Hazard answer practically unsellable to the customers who need it
- broad multi-role Food / strong Insurance / exceptional Utility may remain materially more expensive
- Epic late-Run Items may command a slot-efficiency premium, but 50% pricing must remain a plausible NPC-investment route rather than becoming fake affordability
- exact Buy/Sell values are the active catalog values

## CATEGORY AFFINITY

Category-based Trait/Relic modifiers only boost the intended category core effect.
Example: Food affinity may boost Supply only where a Trait entry states it (e.g. 소식가 / 대식가 in NPC_TRAIT), and food-native recovery/Stat.

### FOOD / DRINK CORE EFFECT

Fresh-category Relics and category-affinity effects use `native core effect`, not a blanket whole-item multiplier.

Food/Drink nativeCore for Fresh Store Supports and category affinity is positive native Stat only.
Supply stays its own channel; Fresh Store Supports leave Supply unchanged. Wallet-gain effect stays its own loot/economy channel.

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
- only modifiers that explicitly target positive native Core Stat enter this pool (Food affinity on eligible positive native Food Stat; Fresh Store Supports on eligible positive native Food/Drink Stat)
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
원정 도시락 코너 adds no native-Stat bonus (its effects are Fatigue recovery via Supply and flat Hazard defense).

GLUTTONY's Final reduction, when applicable, occurs after the final Item-side positive Core-Stat contribution has been produced, as owned by `BOSS_v2.8.0.md`.

### CATEGORY AFFINITY BOUNDARY

Food/Drink category-affinity or Fresh Relic effects do not automatically multiply Hazard Counter, Insurance,
RiskReward penalty or unrelated special effects.

Exact Trait modifiers -> `NPC_TRAIT_v2.8.0.md`. Exact Fresh Relic effects -> `RELIC_v2.8.0.md`.

## HAZARD COVERAGE CONTRACT

Every Hazard must have:
- 1 Main specialist route
- >=2 meaningful Alternative routes

Alternative may be: secondary Counter Item, Hybrid Item, relevant natural Stat, Stat-support Item, another explicit
preparation route. Insurance does not automatically count as a Hazard-specific Alternative.

Direct = certainty/reliability
Hybrid = flexibility

Rules:
- one Hazard must not require one specific mandatory SKU
- one Item must not solve an entire Family
- Hybrid must not strictly dominate a Direct of the same or a higher Rarity (an Epic hybrid may exceed a Common Main)
- T3 must retain viable <=2 required-prep-slot routes
- proper Main/Direct prep should feel reliable, especially T1/T2

Canonical Dungeon behavior -> `DUNGEON_HAZARD_v2.8.0.md`.

## HAZARD COUNTER BASELINE

`DIRECTOR DOCUMENT BASELINE`

Natural alternative = the one Stat each Hazard presses (3 / 3 / 3, 투력 never; 어둠 -> 기동, 화염 -> 정신) -> `DUNGEON_HAZARD_v2.8.0.md`

### COUNTER LADDER

Every Gate family carries the same four rungs; 화염 골렘 광산 has one Hazard, so it has no early hybrid. A Tier 1 Gate
shows only its family's first Hazard (독 / 부식 / 냉기 / 공포 / 화염), so only those need an early Counter; the second
Hazards (속박 / 진창 / 어둠 / 화이트아웃) start at Tier 2. Per Hazard the order is 중반 대응 > 후반 하이브리드 >
초반 대응 > 초반 하이브리드 on a Gate's first Hazard, and 중반 대응 > 후반 하이브리드 > 초반 하이브리드 on its second, so the
hybrid never answers the Tier 1 Hazard better than the rung built for it. Each rung's role, read with the adventurer's own
pressed-Stat share
(`DUNGEON_HAZARD_v2.8.0.md` Hazard defense):

- 초반 대응 (Common, one Hazard): clears a Tier 1 Hazard on its own, through the early Tier 2 days for a sturdy adventurer
- 초반 하이브리드 (Uncommon, both Hazards of a Gate): one under 초반 대응 on the first Hazard, so an average adventurer
  still clears Tier 1 with it; short of Tier 2 (about 5~7 at the Tier 2 opening days, User 2026-10-02: it was 7~9); only a
  well-grown adventurer clears Tier 2 with it from mid-Run
- 중반 대응 (Rare, one Hazard): clears Tier 2 surely; from about D20 an average adventurer clears Tier 3 with it
- 후반 하이브리드 (Epic, both Hazards): clears Tier 2 with one slot for an average adventurer (User 2026-10-02: it was just
  short); short of Tier 3, where a grown adventurer can try it alone late in the Run

Values by the pressed Stat (강인함 ÷3 for 독 · 부식 · 냉기; 기동 ÷2 for 속박 · 진창 · 어둠; 정신 ÷2 for 공포 · 화이트아웃 · 화염):

| Rung | 강인함 | 기동 | 정신 |
|---|---:|---:|---:|
| 초반 대응 | 12 | — | 12 |
| 초반 하이브리드 | 11 | 12 | 11 (first Hazard) · 13 (화이트아웃, second) |
| 후반 하이브리드 | 18 | 18 | 18 |
| 중반 대응 | 23 | 23 | 22 |

The values carry their Hazard's Stat-group Threat factor (강인함 1.0 · 기동 1.1 · 정신 1.2, `DUNGEON_HAZARD_v2.8.0.md` §HAZARD
THREAT). For an average adventurer 초반 대응 reads 충분 on a Tier 1 Gate on D15~20 and 대응 (about 0.8) at Tier 2; 중반 대응
reads about 1.0 at Tier 3. A Counter's points above the gap it meets are wasted, because judgment sums the remaining gaps:
중반 대응 is the answer for the Job weak against that Hazard, a hybrid the broad answer for one who is not.

Prices by rung: 초반 대응 30~45G, 초반 하이브리드 75G, 중반 대응 95G, 후반 하이브리드 135G (마그마 냉각장비 145G, its 투력 +10 included).

A Food / Drink Counter keeps its Supply and reads one step lower where it also raises the pressed Stat: 불룡볶음면 냉기 21
with 강인함 +6 (its own Stat is worth 냉기 +2).

| Gate (Hazards) | 초반 대응 | 초반 하이브리드 | 중반 대응 | 후반 하이브리드 |
|---|---|---|---|---|
| 독거미 동굴 (독 · 속박) | 방진마스크 독 12 | 방독 작업장갑 독 11 · 속박 12 | 농축 해독제 독 23 · 경량 로프 속박 23 | 거미줄 방호세트 18 · 18 |
| 슬라임 하수도 (부식 · 진창) | 중화 탄산수 부식 12 | 방수망토 부식 11 · 진창 12 | 부식 방지 코팅제 23 · 원정용 장화 23 | 연금 방수슈트 18 · 18 |
| 망자역 지하묘지 (공포 · 어둠) | 집중 사탕 공포 12 | 축성 손전등 공포 11 · 어둠 12 | 용사의 곡주 공포 22 · 랜턴 건전지 어둠 23 | 성화 랜턴 공포 18 · 어둠 18 |
| 북부 설원 폐허 (냉기 · 화이트아웃) | 컵라면 냉기 12 | 방한 두건 냉기 11 · 화이트아웃 13 | 불룡볶음면 냉기 21 · 설원 고글 화이트아웃 22 | 백설 방한고글 18 · 18 |
| 화염 골렘 광산 (화염) | 얼음컵 화염 12 | — | 쿨링 이온음료 화염 22 | 마그마 냉각장비 화염 18 · 투력 10 |

The Natural alternative (the pressed Stat) is 관련 준비, never a Counter: no Counter multiplier, no Counter pity and no Counter-conditioned Store Support reads it; only the purchase acceptance floor and 원정 위험 게시판 do (`RELIC_v2.8.0.md` §COUNTER JUDGEMENT).

Dedicated single-Hazard Field Gear specialist Items carry no generic positive Core Stat unless an explicit active-catalog
exception says otherwise; their cost is narrow coverage.

Epic Family Hybrid Field Gear trades per-Hazard peak strength for one-slot breadth; it must not become stronger on each
covered Hazard than the dedicated Main specialist for that Hazard.

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
Explicit Special/Legendary interaction is allowed when it is the Item's stated identity:
`황금 1+1 쿠폰` — explicit next-consumable interaction allowed.

Rule:
explicitInteraction=visibleToPlayer

## PENALTY RULE

ordinaryItemPenalty=NOT_REQUIRED

Penalty is allowed only when:
- the Item's identity is genuinely RiskReward
- the cost is visible before purchase/use
- it does not require a new hidden subsystem

Allowed examples: explicit Mobility decrease, explicit Injury Risk increase, explicit Stat decrease.

Forbidden as Item micro-systems: thirst, caffeine stacking, hidden fatigue chain, hidden pair-dependent penalty.

## POTION LINE — EXACT BASELINE

`DIRECTOR DOCUMENT BASELINE`

하급 / 중급 / 상급 / 최상급 포션 (Common / Uncommon / Rare / Epic; 투력 +10 / +18 / +25 / +35; Buy / Sell -> §ACTIVE CATALOG).

All four:
```text
Category = Potion
Supply = 0
Hazard Counter = 0
Insurance = 0
```

- all Potion tiers use the ordinary Potion-family shelf-life behavior (rows -> §SHELF LIFE — EXACT); `중급 포션` is not non-expiring or tool-like
- `최상급 포션` is the top-end pure raw-Power slot-efficiency option, not a Hazard specialist

Potion Trait interaction -> `NPC_TRAIT_v2.8.0.md`.

## BANDAGE RETIREMENT / SPIRIT STAT ROUTE

`진정 허브티` (Drink, Common; row -> §ACTIVE CATALOG) is a generic Spirit Stat route, not a Fear/Dark/Whiteout Counter.
It has its own active Item ID; retired `bandage` is not reused as its identity, and a legacy `붕대` is not converted into
another Item.

Start-stock ownership -> `CORE_RUN_v2.8.0.md`.

## MEAL / WATER LINE

### ROLE SPLIT — EXACT

Meal / 도시락 line:
- Supply (large Fatigue recovery) is the primary identity; Supply is the direct Fatigue recovery and no separate Fatigue effect exists
- 강인함 is secondary
- higher tiers represent a more complete expedition meal
- U/R may invest in the NPC's future Wallet

Water line:
- Drink identity
- low Supply (small Fatigue recovery)
- 강인함-focused Stat route
- comparable in structure to mobility/spirit stat Drinks, not to a meal or Potion

Thus:
- meal asks: do I spend a slot on large Fatigue recovery plus broad survival?
- water asks: do I spend a slot on concentrated 강인함 with small Fatigue recovery?

### REPLACEMENT ID BOUNDARY

For `lunchbox` / `kingwater`:
- no Fatigue-reduction role beyond the Item's own Supply value is active
- no hidden Hotbar role is active
- no Hotbar name is a Player-facing alias

### CURRENT ITEM ART IDENTITY — EXACT

Required icons:
- `lunchbox` / 간단 도시락 -> simple meal/lunchbox icon in the existing Item-art language
- `kingwater` / 왕도 천연암반수 -> bottled/mineral-water icon in the existing Item-art language

Do not use a Hotbar / skewered-stick silhouette for either ID.
This is visual identity only; Category, Rarity, price, effect, shelf life and save ID are as the catalog states.

### REPLACEMENT ITEM FLAVOR — EXACT

\`lunchbox\` / 간단 도시락:
    반찬은 단출하지만 빈칸은 없다.

\`kingwater\` / 왕도 천연암반수:
    왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.

삼각김밥 / 생수 / 길드 특제 도시락 / 영웅 결전 도시락 keep their existing compatible Flavor.
No Hotbar/skewer wording on these IDs.

### NPC WALLET GAIN — EXACT SCOPE

간단 도시락:
    existing expedition loot modifier +0.20

길드 특제 도시락:
    existing expedition loot modifier +0.40

Composition:
- additive with other modifiers that already use the ordinary expedition loot channel
- no new cap
- two eligible modifiers may add together if the Bag actually contains them

Applies only to the ordinary resolved NPC expedition-Wallet reward. Does not multiply Deep Expedition bonusWallet,
Store Support direct Wallet grants, Event purchase budget, Store Gold / commission / subsidy, or any other
non-expedition-loot Wallet source.

Player-facing term:
    원정 소지금 획득 +20%
    원정 소지금 획득 +40%

Do not say current 소지금 +20% / +40%.

## EPIC LATE-RUN VALUE LAYER — EXACT

There are 10 Epic preparation Items. They are not D20-hard-unlocked; their late-Run identity comes from the Day-band
Rarity weights owned by `ECONOMY_ORDER_v2.8.0.md`.

```text
5 Epic Field Gear
= Family-shaped one-slot Hybrid breadth

5 Epic Food/Drink/Potion
= top-end direct Stat / Fatigue-recovery (Supply) slot efficiency
```

Constraints:
- D20+ preparation must not feel like the Player is still choosing only the same early/mid SKU power ceiling
- late-Run progression improves **what one slot can do**, not a third normal Bag slot
- Epic remains optional high-efficiency preparation; T3 must still have viable routes without drawing one exact Epic SKU

### EPIC FIELD GEAR — FAMILY HYBRIDS

거미줄 방호세트 / 연금 방수슈트 / 성화 랜턴 / 백설 방한고글 / 마그마 냉각장비 (rows -> §ACTIVE CATALOG, rungs -> §COUNTER LADDER).

FIRE uses one Hazard plus its higher-combat identity instead of a second FIRE Hazard.
The `투력 +10` on `마그마 냉각장비` is an explicit catalog exception; it is not permission for generic specialist Field Gear to gain Core Stats.

### EPIC FOOD / DRINK / POTION — TOP-END PREPARATION

초고속 에너지드링크 / 대현자 허브엘릭서 / 최상급 포션 (rows -> §ACTIVE CATALOG) and the Epic meal / water rows
(`battlelunch` 영웅 결전 도시락, `kingwater` 왕도 천연암반수) in the ACTIVE CATALOG meal / water table.

Fresh/Food-affinity/Potionbody rules apply normally by category. No separate Epic-only amplifier exists.

## INSURANCE HIERARCHY

### 구급키트

`DIRECTOR DOCUMENT BASELINE`

```text
Category = Insurance
Rarity = Uncommon
Buy / Sell = 80 / 160
```

It carries no Core Stat; its whole function is the Aftercare below, priced as pure Insurance.

It lowers the resolved expedition Outcome one step, after the higher-priority emergency conversions:

```text
중상 Outcome
-> Outcome becomes 부상: XP/Loot/Fatigue follow 부상, persistent injury=1, recovery=0

부상 Outcome
-> Outcome stays 부상: XP/Loot/Fatigue follow 부상, persistent injury=0 (no lasting injury)

사망
-> no effect
```

This is Item Aftercare, not natural recovery. It does not change the natural Severe-Injury recovery rule owned by
`NPC_TRAIT_v2.8.0.md`. It has no hidden injury-risk percentage.

### 귀환석
rarity=Rare
category=Insurance
role=Insurance
subrole=EscapeInsurance

identity:
`성공하지 못한 원정을 퇴각으로 돌릴 가능성을 높이는 확률형 보험`

Rules:
- does not increase combat success directly
- retreat XP > 0
- retreat loot ≈ almost none
- does not own Death -> Severe conversion
- an expedition that ends in neither 성공 nor 대성공 (부상 / 중상 / 사망) rolls once more for a retreat
- that roll's chance = the adventurer's own retreat chance (`DUNGEON_HAZARD_v2.8.0.md` escapeChance: 기동, Traits,
  Gate scale) + escapeBonus, clamped 0.15~0.94 as the retreat chance is
- a hit makes the Outcome 퇴각
- the stone adds nothing to the combat-failure retreat roll itself (that roll reads the Traits only)

escapeBonus=+20%p
player line: `성공하지 못하면 퇴각 확률 +{N}%p` (`COPY_AUDIT_APPROVED_v2.8.0.md` §4-22)

Outcome-share evidence: `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` (v2.9.10, Insurance).

### 세계수 생환부적
rarity=Epic
category=Insurance
role=Insurance
subrole=DeathInsurance
Buy / Sell = 300 / 600

core:
Death or Severe Injury -> 퇴각 (무사 퇴각; no injury)
uses=1

Rules:
- clearly above Return Stone in survival hierarchy: the remaining Death or Severe Injury is stopped outright, where 귀환석 only makes it less likely
- a 부상 stays 부상 - the broad, probabilistic cover is 귀환석's, the one-step cover 구급키트's
- not Food/Drink; Fresh-category effect does not apply
- player line: `사망·중상 → 무사 퇴각 1회` (`COPY_AUDIT_APPROVED_v2.8.0.md` §4-22)

### Insurance resolution order

Where multiple effects are present:

```text
1. resolve ordinary expedition outcome
2. 귀환석 second retreat roll on 부상 / 중상 / 사망
3. if Death or Severe Injury remains, 세계수 생환부적 -> 퇴각
4. 구급키트 Aftercare lowers the final non-death Outcome one step (중상 -> 부상; a 부상 keeps its Outcome but leaves no injury); XP/Loot/Fatigue follow the lowered Outcome
```

Do not rerun the whole outcome-resolution chain after Aftercare.

Final-specific usability -> `FINAL_EXPEDITION_v2.8.0.md`.

## ACTIVE CATALOG

Unlisted implementation-only flavor fields inherit the previous Item where identity remains unchanged, except where this spec states otherwise; shelf lives are the §SHELF LIFE — EXACT table.

### MEAL / WATER LINE — DIRECTOR DOCUMENT BASELINE — EXACT

| ID | Item | Category/Rarity | Buy / Sell | Effect | Shelf |
|---|---|---|---:|---|---:|
| rice | 삼각김밥 | Food C | 35 / 70 | 강인함 +6, Supply 5 | 2d |
| water | 생수 | Drink C | 40 / 80 | 강인함 +10, Supply 2 | 2d |
| lunchbox | 간단 도시락 | Food U | 100 / 200 | 강인함 +12, Supply 6, 원정 소지금 획득 +20% | 2d |
| guildlunch | 길드 특제 도시락 | Food R | 185 / 370 | 강인함 +16, Supply 7, 원정 소지금 획득 +40% | 2d |
| battlelunch | 영웅 결전 도시락 | Food E | 210 / 420 | 강인함 +18, Supply 9 | 2d |
| kingwater | 왕도 천연암반수 | Drink E | 185 / 370 | 강인함 +24, Supply 2 | 3d |

The meal 강인함 ladder rises readably by tier; the water route is more Stat-concentrated than the meal at the same broad
stage, with much lower Supply (Fatigue recovery).

This table is the approved DIRECTOR DOCUMENT BASELINE. Price/efficiency may be measured; any change requires a new
approved ITEM amendment; QA does not auto-tune it.

### OTHER ACTIVE ITEMS

`DIRECTOR DOCUMENT BASELINE`

| # | Item | Category / Rarity | Buy / Sell | Effect | Hazard Role |
|---:|---|---|---:|---|---|
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +12, Supply 3 | Cold 초반 대응 |
| 5 | 초코바 | Food C | 30 / 60 | 기동 +6, Supply 5 | — |
| 44 | 녹차 양갱 | Food C | 30 / 60 | 정신 +8, Supply 5 | — |
| 6 | 캔커피 | Drink C | 40 / 80 | 기동 +12, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 40 / 80 | 정신 +15, Supply 2 | Stat route |
| 8 | 하급 포션 | Potion C | 70 / 140 | 투력 +10 | — |
| 9 | 얼음컵 | Drink C | 30 / 60 | 화염 +12, Supply 1 | Fire 초반 대응 |
| 41 | 중화 탄산수 | Drink C | 35 / 70 | 부식 +12, Supply 1 | Corrosion 초반 대응 |
| 10 | 랜턴 건전지 | Field Gear R | 95 / 190 | 어둠 +23 | Dark 중반 대응 |
| 11 | 경량 로프 | Field Gear R | 95 / 190 | 속박 +23 | Bind 중반 대응 |
| 12 | 집중 사탕 | Food C | 35 / 70 | 공포 +12, Supply 2 | Fear 초반 대응 |
| 13 | 불룡볶음면 | Food R | 95 / 190 | 강인함 +6, 냉기 +21, Supply 3 | Cold 중반 대응 |
| 14 | 에너지드링크 | Drink U | 80 / 160 | 기동 +17, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink R | 95 / 190 | 공포 +22, 강인함 -3, Supply 1 | Fear 중반 대응 / RiskReward |
| 16 | 구급키트 | Insurance U | 80 / 160 | Outcome 1단계 완화 (중상 → 부상 · 부상 → 무사) Aftercare | Aftercare |
| 17 | 방진마스크 | Field Gear C | 45 / 90 | 독 +12 | Poison 초반 대응 |
| 18 | 방한 두건 | Field Gear U | 75 / 150 | 냉기 +11, 화이트아웃 +13 | Snow 초반 하이브리드 |
| 42 | 방독 작업장갑 | Field Gear U | 75 / 150 | 독 +11, 속박 +12 | Spider 초반 하이브리드 |
| 43 | 축성 손전등 | Field Gear U | 75 / 150 | 공포 +11, 어둠 +12 | Crypt 초반 하이브리드 |
| 19 | 방수망토 | Field Gear U | 75 / 150 | 부식 +11, 진창 +12 | Slime 초반 하이브리드 |
| 20 | 부식 방지 코팅제 | Field Gear R | 95 / 190 | 부식 +23 | Corrosion 중반 대응 |
| 21 | 원정용 장화 | Field Gear R | 95 / 190 | 진창 +23 | Mire 중반 대응 |
| 22 | 설원 고글 | Field Gear R | 95 / 190 | 화이트아웃 +22 | Whiteout 중반 대응 |
| 23 | 상급 포션 | Potion R | 195 / 390 | 투력 +25 | — |
| 24 | 농축 해독제 | Field Gear R | 95 / 190 | 독 +23 | Poison 중반 대응 |
| 25 | 귀환석 | Insurance R | 200 / 400 | 부상·중상·사망 -> one more retreat roll at own retreat chance +20%p | Failure Insurance |
| 26 | 중급 포션 | Potion U | 125 / 250 | 투력 +18 | — |
| 28 | 쿨링 이온음료 | Drink R | 95 / 190 | 화염 +22, Supply 1 | Fire 중반 대응 |
| 29 | 세계수 생환부적 | Insurance E | 300 / 600 | Death / Severe Injury -> 퇴각 once | Death Insurance |
| 30 | 황금 1+1 쿠폰 | Special L | 500 / 1000 | next explicit consumable effect duplication interaction | Utility |
| 31 | 거미줄 방호세트 | Field Gear E | 135 / 270 | 독 +18, 속박 +18 | Spider 후반 하이브리드 |
| 32 | 연금 방수슈트 | Field Gear E | 135 / 270 | 부식 +18, 진창 +18 | Slime 후반 하이브리드 |
| 33 | 성화 랜턴 | Field Gear E | 135 / 270 | 공포 +18, 어둠 +18 | Crypt 후반 하이브리드 |
| 34 | 백설 방한고글 | Field Gear E | 135 / 270 | 냉기 +18, 화이트아웃 +18 | Snow 후반 하이브리드 |
| 35 | 마그마 냉각장비 | Field Gear E | 145 / 290 | 화염 +18, 투력 +10 | Fire 후반 하이브리드 |
| 38 | 초고속 에너지드링크 | Drink E | 175 / 350 | 기동 +26, Supply 2 | Top-end mobility |
| 39 | 대현자 허브엘릭서 | Drink E | 175 / 350 | 정신 +28, Supply 2 | Top-end spirit |
| 40 | 최상급 포션 | Potion E | 235 / 470 | 투력 +35 | Top-end raw Power |

Active catalog count is exactly 44. No active Item creates a separate poison Condition/cure subsystem.

Retired — do not bring back:
- 붕대 (`bandage`): not active, not converted on legacy saves
- 마석 보조배터리: not active; no Spirit-battery SKU under Special; its non-expiring/tool-like shelf behavior does not carry to 중급 포션
- 핫팩: 방한 두건 holds its catalog slot
- pre-rename ids `heat` `lava` `bar` `premium` `herobar` `tree` `potion`: not read back (save schema v9)

### ITEM IDS

Each id reads as its current Item (the ID columns above and §SHELF LIFE — EXACT); the D10 / D14 unlock keys are
`guildlunch` / `worldcharm`. Art keys (`icon`) name a drawing and may be shared; they are not ids.

### ACTIVE RARITY DISTRIBUTION — EXACT

`lunchbox` is Uncommon. The active 44-Item distribution is:

    Common 12
    Uncommon 8
    Rare 12
    Epic 11
    Legendary 1

Do not move another Item solely to alter these approved Common/Uncommon counts.

## SHELF LIFE — EXACT

No active Item is non-expiring; every unit has a shelf life of 2 to 5 days, counted from the stocking day. A unit that
is still unsold when SALE closes on its last sale Day (the shelf's `오늘까지`) is discarded that Night and counts as that
Day's waste (`오늘 폐기` on its CLOSING receipt). The rule behind the table:

- Food: 2 days unless it carries a Hazard Counter (컵라면 3, 집중 사탕 4, 불룡볶음면 3); 초코바 and 녹차 양갱 are 2
- Drink: 2 days unless Uncommon or above (3) or a Hazard Counter Drink (얼음컵 3, 중화 탄산수 3, 용사의 곡주 4, 쿨링 이온음료 5)
- Potion: 3 / 4 / 5 / 5 by tier (하급 / 중급 / 상급 / 최상급)
- Field Gear: 3 (Common), 4 (Uncommon), 5 (Rare and above)
- Insurance / Special: 구급키트 4, 귀환석 4, 세계수 생환부적 5, 황금 1+1 쿠폰 5
- 대형 냉장고 and 냉장 유통 계약 extend Food/Drink exactly as `RELIC_v2.8.0.md` states; nothing else moves a shelf life

| ID | Item | Category | Shelf |
|---|---|---|---:|
| rice | 삼각김밥 | Food | 2d |
| ramen | 컵라면 | Food | 3d |
| lunchbox | 간단 도시락 | Food | 2d |
| choco | 초코바 | Food | 2d |
| yanggaeng | 녹차 양갱 | Food | 2d |
| candy | 집중 사탕 | Food | 4d |
| dragonramen | 불룡볶음면 | Food | 3d |
| guildlunch | 길드 특제 도시락 | Food | 2d |
| battlelunch | 영웅 결전 도시락 | Food | 2d |
| water | 생수 | Drink | 2d |
| coffee | 캔커피 | Drink | 2d |
| herbtea | 진정 허브티 | Drink | 2d |
| ice | 얼음컵 | Drink | 3d |
| soda | 중화 탄산수 | Drink | 3d |
| energy | 에너지드링크 | Drink | 3d |
| wine | 용사의 곡주 | Drink | 4d |
| ion | 쿨링 이온음료 | Drink | 5d |
| kingwater | 왕도 천연암반수 | Drink | 3d |
| hyperenergy | 초고속 에너지드링크 | Drink | 3d |
| sageelixir | 대현자 허브엘릭서 | Drink | 3d |
| lowpotion | 하급 포션 | Potion | 3d |
| midpotion | 중급 포션 | Potion | 4d |
| highpotion | 상급 포션 | Potion | 5d |
| toppotion | 최상급 포션 | Potion | 5d |
| battery | 랜턴 건전지 | Field Gear | 5d |
| rope | 경량 로프 | Field Gear | 5d |
| mask | 방진마스크 | Field Gear | 3d |
| hood | 방한 두건 | Field Gear | 4d |
| webgloves | 방독 작업장갑 | Field Gear | 4d |
| holylight | 축성 손전등 | Field Gear | 4d |
| cloak | 방수망토 | Field Gear | 4d |
| coating | 부식 방지 코팅제 | Field Gear | 5d |
| boots | 원정용 장화 | Field Gear | 5d |
| snowgoggles | 설원 고글 | Field Gear | 5d |
| antidote | 농축 해독제 | Field Gear | 5d |
| spiderkit | 거미줄 방호세트 | Field Gear | 5d |
| slimesuit | 연금 방수슈트 | Field Gear | 5d |
| cryptlantern | 성화 랜턴 | Field Gear | 5d |
| snowvisor | 백설 방한고글 | Field Gear | 5d |
| magmagear | 마그마 냉각장비 | Field Gear | 5d |
| kit | 구급키트 | Insurance | 4d |
| stone | 귀환석 | Insurance | 4d |
| worldcharm | 세계수 생환부적 | Insurance | 5d |
| coupon | 황금 1+1 쿠폰 | Special | 5d |

## ITEM ROLE NOTES

### Common / Rarity 0

1. 삼각김밥 — identity=cheap basic expedition supply
3. 컵라면 — roles=[Supply,DirectCounter] counter=cold identity=Cold 초반 대응 with Supply
5. 초코바 — roles=[Supply,Stat] identity=cheap snack that keeps going (more Supply, less 기동 than 캔커피, as 삼각김밥 against 생수) hiddenPostFatigue=NO
44. 녹차 양갱 — roles=[Supply,Stat] identity=the 정신 snack that keeps going (more Supply, less 정신 than 진정 허브티, as 초코바 against 캔커피)
6. 캔커피 — roles=[Supply,Stat] identity=Mobility support caffeineStack=NO
9. 얼음컵 — roles=[Supply,DirectCounter] counter=fire identity=Fire 초반 대응 with Supply
41. 중화 탄산수 — roles=[Supply,DirectCounter] counter=corrosion identity=Corrosion 초반 대응 with Supply
12. 집중 사탕 — roles=[Supply,DirectCounter] counter=fear identity=Fear 초반 대응 with Supply
17. 방진마스크 — roles=[DirectCounter] counter=poison identity=Poison 초반 대응

### Uncommon / Rarity 1

14. 에너지드링크 — roles=[Supply,Stat] identity=strong Mobility support caffeineStack=NO
16. 구급키트 — roles=[Insurance] subrole=InjuryInsurance identity=strong injury protection
18. 방한 두건 — roles=[HybridCounter] counters=[cold,whiteout] identity=Snow 초반 하이브리드
42. 방독 작업장갑 — roles=[HybridCounter] counters=[poison,bind] identity=Spider 초반 하이브리드
43. 축성 손전등 — roles=[HybridCounter] counters=[fear,dark] identity=Crypt 초반 하이브리드
19. 방수망토 — roles=[HybridCounter] counters=[corrosion,mire] identity=Slime 초반 하이브리드
rule=stays under the Slime 후반 하이브리드 and each 중반 대응 on its own Hazard (§COUNTER LADDER)

### Rare / Rarity 2

24. 농축 해독제 · 20. 부식 방지 코팅제 · 11. 경량 로프 · 21. 원정용 장화 · 10. 랜턴 건전지 · 22. 설원 고글
roles=[DirectCounter] identity=중반 대응 of its Hazard (§COUNTER LADDER)

13. 불룡볶음면 — roles=[Supply,Stat,DirectCounter] counter=cold
identity=Cold 중반 대응; one step under the 강인함 rung because its 강인함 +6 also defends Cold

15. 용사의 곡주 — roles=[Supply,DirectCounter,RiskReward] counter=fear identity=Fear 중반 대응 with an explicit 강인함 trade-off (강인함 presses neither Hazard of its own Gate)
28. 쿨링 이온음료 — roles=[Supply,DirectCounter] counter=fire identity=Fire 중반 대응 with Supply
25. 귀환석 — roles=[Insurance] subrole=EscapeInsurance

27. 길드 특제 도시락 — roles=[Supply,Economy] identity=Premium Food / expedition economy
rule=must not dominate survival+supply+loot+general stats simultaneously

### Epic / Rarity 3

29. 세계수 생환부적 — roles=[Insurance] subrole=DeathInsurance core=Death / Severe Injury -> 퇴각 once (§INSURANCE HIERARCHY)

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

Build-filtered Relics must not depend on one single eligible SKU. Canonical Relic interaction -> `RELIC_v2.8.0.md`.

## RARITY / UPGRADE

Higher rarity may be stronger, broader, more reliable, stronger Risk/Reward, or premium economy-oriented.
Not every upgrade must be a sidegrade. But:
rarity != universal dominance

A specialized lower-rarity Direct Counter may remain best for its specific Hazard.

## JOB INTERACTION

Item value must not secretly change by Job ID.

jobIdEffectModifier=NO
jobIdPurchaseBias=NO
jobIdCounterModifier=NO

Job affinity emerges from BaseStats + Growth + visible Traits. Canonical -> `NPC_TRAIT_v2.8.0.md`.

## INFORMATION

Player can see Category, relevant Functional Role, and exact Item-side values for Core Stat, Hazard Counter, Supply
(`피로 회복 N`), Condition effect, Insurance behavior and explicit penalty/tradeoff.

Do not expose exact expedition success %, hidden internal formula, or a hidden Gate requirement/formula through the Item panel.

### PRESENTATION ORDER — EXACT

An Item's effect lines are listed in **one order for every Item**, the same on the ORDER offer row, the SALE shelf row,
the counter tray's `특수 효과` line and the codex, never reordered or emphasized by the Gate or the customer. The order
reads the shelf's own kind order (대응 장비 → 음식·음료 → 포션) as effects:

```text
1. Hazard Counter  (catalog order)
2. 피로 회복 N
3. Core Stat       (투력 · 강인함 · 기동 · 정신 — the stat panel's order)
4. anything else   (e.g. 원정 소지금 획득; catalog order)
Insurance / Special: its one function line
```

e.g. `냉기 대응 +21 · 피로 회복 3 · 강인함 +6`, `공포 대응 +22 · 피로 회복 1 · 강인함 -3`, `피로 회복 2 · 기동 +17`,
`화염 대응 +18 · 투력 +10`.

The order is identity information (what kind of Item this is), not advice.

Principle:
`재료는 공개, 공식은 숨김`

Material hidden behavior=NO

## SALE / INVENTORY

Inventory view, stacking, nearest-expiry consumption and the consumer-slot limit -> `SALE_v2.8.0.md` §INVENTORY VIEW;
shelf order and shelf-life line -> `SALE_v2.8.0.md` §ITEM SELECTION (exact UI -> `UI_UX_v2.8.0.md` §SALE — SHELF ORDER).

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

By role: Supply / Direct / Hybrid / Stat / Insurance / RiskReward usage.

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

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### ITEM CATEGORY / CATALOG

#### ITEM-Q70 — PLAYER CATEGORY EXACT

Every active Item maps to exactly one of:
```text
Food / Drink / Potion / Field Gear / Insurance / Special
```

PASS:
- no active Medical category
- Potion line is not Special
- 농축 해독제 = Field Gear
- 구급키트 = Insurance

#### ITEM-Q71 — ACTIVE CATALOG EXACT 43

PASS:
- exactly 43 active Items
- 붕대 inactive/retired
- 마석 보조배터리 inactive/retired
- 진정 허브티 active
- 중급 포션 active
- exactly 10 Epic preparation Items from `ITEM_v2.8.0.md` are active
- no retired ID leaks into Order/Sale generation

#### ITEM-Q09 — ACTIVE CATALOG BOUNDARY

SETUP:
Inspect all sellable/generated Item IDs.

EXPECT:
Active sellable catalog matches ITEM canonical catalog exactly.
No extra source-only Item enters Order/Sale/Expedition resolution.

PASS:
Catalog count/identity is stable and no omitted strict-superior item leaks into play.

#### ITEM-Q19 — ACTIVE CATALOG STRUCTURE

SETUP:
Audit canonical active catalog by Category/Rarity/Role.

EXPECT:
- each has exactly one player-facing Category
- low-rarity specialists remain meaningful
- new Items fill documented Hazard/build coverage gaps

PASS:
Catalog supports preparation and Relic builds without filler or strict universal upgrades.

#### ITEM-Q02 — FUNCTIONAL ROLE

SETUP:
Audit catalog.

EXPECT:
Items have understandable gameplay role:
Stat/Supply (Fatigue recovery, shown `피로 회복 N`)/Direct/Hybrid/Condition/Insurance/RiskReward/Economy/Utility

PASS:
No item exists only as unexplained modifier bundle.

#### ITEM-Q03 — MATERIAL EFFECT VISIBILITY

SETUP:
Inspect Sale/Order item details.

EXPECT:
Important effect/penalty is player-readable.

PASS:
Material hidden behavior absent.

#### ITEM-Q16 — NEW ITEM JUSTIFICATION

SETUP:
Review any newly added catalog item.

EXPECT:
It fills a proven coverage/price/role gap.

PASS:
No addition exists only to increase item count.

#### ITEM-Q77 — FOOD/DRINK BASELINE VALUES

EXPECT: every Food / Drink row equals §ACTIVE CATALOG (Stat, Counter and Supply values; the table is the one source).

Supply N is displayed as `피로 회복 N`.

PASS: no stale Stat bundle survives.

#### ITEM-Q81 — REBALANCED PRICE TABLE

PASS:
- every Item's Sell = Buy × 2 exactly
- Buy matches the `ITEM_v2.8.0.md` active catalog; the raised ones:

```text
간단 도시락 100 · 에너지드링크 80 · 중급 포션 125 · 길드 특제 도시락 185 · 초고속 에너지드링크 175 · 대현자 허브엘릭서 175
방진마스크 45 · 중화 탄산수 35 · 방수망토 / 방독 작업장갑 / 축성 손전등 / 방한 두건 75
농축 해독제 / 부식 방지 코팅제 / 경량 로프 / 원정용 장화 / 랜턴 건전지 / 설원 고글 / 불룡볶음면 / 용사의 곡주 / 쿨링 이온음료 95
거미줄 방호세트 / 연금 방수슈트 / 성화 랜턴 / 백설 방한고글 135 · 마그마 냉각장비 145 · 상급 포션 195 · 최상급 포션 235
```

PASS:
- no stale pre-close price or a Sell other than Buy × 2 survives
- Main Hazard specialist price bands remain practically comparable rather than rarity-only inflated

#### ITEM-Q78 — GOLDEN COUPON PRICE

PASS:
`황금 1+1 쿠폰` canonical buy/sell = 500/1000 and existing explicit duplication interaction remains intact.

#### ITEM-Q META — GOLDEN 1+1 UNLOCK

SETUP:
Inspect Item offer/acquisition eligibility before and after first distinct Boss clear.

EXPECT:
- 황금 1+1 쿠폰 remains canonical Item ID 30
- before META unlock it does not appear through normal acquisition
- after first distinct Boss clear it becomes eligible under its normal Item rules
- Item effect itself is unchanged by the unlock system

PASS:
META gates availability only; ITEM continues to own the effect.

### MEAL / WATER LINE

#### DI-Q-v28-1 — ITEM BASELINE

Expect exactly:

| Item | Rarity | Buy/Sell | 강인함 | Supply (`피로 회복 N`) | Extra |
|---|---|---:|---:|---:|---|
| 삼각김밥 | C | 35/70 | +6 | 5 | — |
| 생수 | C | 40/80 | +10 | 2 | — |
| 간단 도시락 | U | 100/200 | +12 | 6 | expedition Wallet +20% |
| 길드 특제 도시락 | R | 185/370 | +16 | 7 | expedition Wallet +40% |
| 영웅 결전 도시락 | E | 210/420 | +18 | 9 | — |
| 왕도 천연암반수 | E | 185/370 | +24 | 2 | — |

PASS:
- active catalog count is 43
- active Rarity distribution is C11 / U8 / R12 / E11 / L1
- no unrelated Item Rarity is moved from the approved active distribution
- Hotbar names are not active player Items
- meal shelf life 2; 생수 2, 왕도 천연암반수 3
- Supply is the direct Fatigue reduction (`피로 회복 N`, current Fatigue first, remainder buffers this expedition's gain); no replacement carries any other Fatigue effect

#### DI-Q-v28-2 — WALLET GAIN SCOPE

PASS:
- U meal adds +0.20 to ordinary expedition loot modifier
- R meal adds +0.40
- modifiers add with existing ordinary loot modifiers
- Deep bonusWallet is not multiplied
- Store Support/Event/direct Wallet grants are not multiplied
- player copy says 원정 소지금 획득

#### DI-Q-v28-3 — MEAL VS WATER IDENTITY

PASS direction:
- meal is materially higher Fatigue recovery (Supply): Food = large recovery + lower Core Stat
- water is materially more Stat-concentrated for its stage: Drink = small recovery + sharper Stat/Counter
- Water does not become a meal substitute through Fatigue recovery
- Meal does not become a raw-Stat Potion substitute

This is a design-shape check, not permission to auto-tune numbers.

#### DI-Q-v28-3B — CURRENT ITEM ART IDENTITY

PASS:
- `lunchbox` reads visually as 간단 도시락 / meal-lunchbox
- `kingwater` reads visually as 왕도 천연암반수 / bottled water
- neither retains the retired Hotbar/skewered-stick silhouette
- icon change does not alter ID, Category, Rarity, price, effect or save compatibility

#### DI-Q-v28-9 — REPLACEMENT FLAVOR

Expected:
- 간단 도시락 -> \`반찬은 단출하지만 빈칸은 없다.\`
- 왕도 천연암반수 -> \`왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.\`

FAIL:
- skewer/Hotbar Flavor survives on either replacement ID

#### ITEM-Q10 — PREMIUM LUNCH (`guildlunch` / 길드 특제 도시락)

SETUP:
Compare across multiple contexts.

EXPECT:
Useful premium expedition/economy option.

PASS:
Does not dominate survival+Fatigue recovery+loot+stats simultaneously.

### POTION / STAT ITEMS

#### ITEM-Q72 — POTION LADDER

EXPECT: the four Potions (하급 / 중급 / 상급 / 최상급) equal §ACTIVE CATALOG prices and 투력, rising with each step.

All:
- Potion category
- Supply 0 (no `피로 회복` row)
- Counter 0
- Insurance 0
- same ordinary Potion-family shelf-life behavior unless explicitly overridden

PASS:
- no hidden generic success bonus beyond Core Stat contribution
- 중급 포션 does not inherit retired 마석 보조배터리의 non-expiring/tool-like shelf behavior merely from slot reuse

#### ITEM-Q74 — SPIRIT STAT ROUTE

`진정 허브티`:
- Drink Common
- 40/80
- 정신 +15
- Supply 2, displayed `피로 회복 2`
- no explicit fear/dark/whiteout Counter

PASS: it is a natural-Stat alternative, not a hidden multi-Hazard specialist.

#### ITEM-Q82 — DIRECT STAT ITEM RELEVANCE

Controlled representative mid/late-Run NPCs around a marginal Forecast state.

PASS direction:
- selling one appropriate direct-Stat Item produces a perceptible current Core-Stat change
- representative marginal cases can cross a qualitative Forecast boundary because of one appropriate Item
- NPC long-term Growth remains the main body of strength rather than being replaced by Item scaling
- no Day/Level percentage-scaling Item system exists
- Fresh/Potionbody can increase the owned Item contribution, but Counter/Supply/Insurance channels remain outside that native-Stat amplification

Exact base Item values must match the current active catalog; Supply is displayed `피로 회복 N`.

### HAZARD COUNTER ITEMS

#### ITEM-Q73 — HAZARD COUNTER VALUES

EXPECT: every pre-Epic Counter value (Common Lower, Uncommon hybrid, Rare Main) equals §ACTIVE CATALOG, on the
§COUNTER LADDER rungs.

PASS:
- specialist Field Gear does not retain stale generic positive Core Stats except explicit current catalog exceptions
- Hybrid remains weaker per target than any dedicated specialist of the same or a higher Rarity (User 2026-09-25, v2.9.1)

#### ITEM-Q15 — HAZARD ITEM MATRIX

SETUP:
Build the 9-Hazard × Item/Stat route matrix.

EXPECT:
For every canonical Hazard:
- 1 Main specialist
- >=2 meaningful Alternatives
- Main remains the most reliable dedicated response

PASS:
No Hazard relies on a single mandatory SKU and Hybrid does not strictly dominate a specialist of the same or a higher Rarity.

#### ITEM-Q07 — HOT PACK VS LAVA NOODLE

SETUP:
Compare pure Cold response.

EXPECT:
불룡볶음면 (Rare, cold +21) > 방한 두건 (Uncommon hybrid, cold +11 / whiteout +13) for Cold specialization (`tests/delta.cjs`).

PASS:
불룡볶음면 keeps its Food identity (Supply 3, survival +6); 방한 두건 stays the Snow 초반 하이브리드.

#### ITEM-Q79 — ANTIDOTE ROLE BOUNDARY

`농축 해독제`:
- Field Gear Rare
- 95 / 190
- poison Counter +23

PASS:
- no generic positive Core Stat
- no hidden poison Condition/cure subsystem
- its gameplay identity is the dedicated Poison Hazard specialist

### EPIC PREPARATION ITEMS

#### ITEM-Q83 — EPIC FAMILY HYBRIDS

EXPECT: the five Epic Field Gear (거미줄 방호세트, 연금 방수슈트, 성화 랜턴, 백설 방한고글, 마그마 냉각장비) equal §ACTIVE CATALOG.

PASS:
- each dual-Hazard value stays below the Rare dedicated specialist for that Hazard
- FIRE item does not invent a second FIRE Hazard
- `마그마 냉각장비 투력+10` is an explicit exception only

#### ITEM-Q84 — EPIC TOP-END STAT/SUPPLY ITEMS

EXPECT: 초고속 에너지드링크, 대현자 허브엘릭서 (Drink E) and 최상급 포션 (Potion E) equal §ACTIVE CATALOG.

Supply is displayed `피로 회복 N`.

PASS:
- ordinary category modifier rules apply
- no Epic-only hidden multiplier
- these Items improve one-slot late-Run value without adding Bag slots

#### ITEM-Q85 — NO D20 HARD UNLOCK FOR NEW EPICS

PASS:
- all 10 Epic preparation Items use the ordinary Epic pool
- no per-Item `day>=20` hard eligibility gate exists for them
- practical late-Run frequency comes only from current `ECONOMY_ORDER_v2.8.0.md` Day-band Rarity progression plus existing general eligibility rules

### ITEM INTERACTION / MODIFIER SCOPE

#### ITEM-Q04 — NO GENERAL HIDDEN COMBO

SETUP:
Audit item resolution and multi-item use.

EXPECT:
No hidden:
- pair synergy
- threshold combo
- order-dependent combo
- penalty cancellation

PASS:
Only explicit described Special interactions may cross-reference items.

#### ITEM-Q05 — EXPLICIT SPECIAL INTERACTION

SETUP:
Use 황금 1+1 coupon or equivalent explicit item.

EXPECT:
Interaction is stated in item description and resolves predictably.

PASS:
No hidden combo knowledge required.

#### ITEM-Q14 — CATEGORY AFFINITY SCOPE

SETUP:
Apply Food affinity to multi-effect Food item.

EXPECT:
Food-native core effect may increase.
Unrelated hazard counter does not auto-scale.

PASS:
Whole-item multiplier absent.

#### ITEM-Q18 — FRESH CORE-EFFECT SCOPE

SETUP:
Apply generic Food/Drink category boosts to multi-role Items.

EXPECT:
Hazard Counter/Insurance/RiskReward penalty does not auto-scale unless explicitly stated by the Relic/effect.

PASS:
Fresh-category multipliers do not become blanket whole-item multipliers.

#### ITEM-Q80 — FOOD TRAIT × FRESH STACKING

Use a Food Item with a positive native Core Stat and controlled Trait/Relic state.

EXPECT base-additive modifier composition from `ITEM_v2.8.0.md`:

```text
대식가 + 즉석식품 코너 + 24시간 신선체계
= base ×2.05

소식가 + 즉석식품 코너 + 24시간 신선체계
= base ×1.55
```

PASS:
- Trait and Relic native-Stat percentages are summed from Item base
- no sequential Trait×Relic multiplicative layer
- Counter / Supply / Insurance / Loot / Utility / harmful RiskReward penalty do not enter the native-Stat modifier pool
- the Supply value (`피로 회복 N`) is unchanged by Fresh / Relic native-Stat percentages
- GLUTTONY, when present in Final, applies after the Item-side positive Core-Stat contribution is resolved

#### ITEM-Q17 — SUPPLY = FATIGUE RECOVERY / NO THIRST

SETUP:
Audit all Food/Drink effects and expedition resolution.

EXPECT:
- every active Food/Drink has visible Supply > 0, shown as `피로 회복 N` (never `보급 +N`)
- catalog Supply values match the `ITEM_v2.8.0.md` active catalog
- Supply reduces the customer's Fatigue only: current Fatigue first, remainder against this expedition's gain, leftover discarded
- no Gate requires Supply; no Supply Deficit, deficit penalty or excess-Supply concept exists
- no Item creates/cleanses thirst
- no hidden Food+Drink pairing
- no caffeine stacking
- no hunger/thirst gauge

PASS:
`음식·음료는 피로를 줄인다.` is the whole Supply rule; no long-expedition requirement resource exists.

### INSURANCE

#### ITEM-Q11 — RETURN STONE

SETUP:
Use in losing expeditions.

EXPECT:
Uses approved escapeBonus +20%p: a 부상 / 중상 / 사망 Outcome rolls once more for 퇴각 at
the adventurer's own escapeChance + 20%p (clamp 0.15~0.94); the combat-failure retreat roll itself carries no stone
bonus; combat success is not increased.

PASS:
Acts as probabilistic lower-tier insurance, not a success item or Death->Severe conversion.

#### ITEM-Q12 — RETREAT REWARD

SETUP:
Trigger Return Stone retreat.

EXPECT:
EXP reduced but >0.
Loot nearly none.

PASS:
Hierarchy feels distinct from success and death.

#### ITEM-Q13 — WORLD TREE INSURANCE

SETUP:
Trigger lethal outcome with Epic World Tree insurance active.

EXPECT:
Death or Severe Injury converts to 퇴각 with no injury; a 부상 stays 부상.

PASS:
Clearly stronger survival tier than Return Stone and not treated as Food.

#### ITEM-Q75 — FIRST AID AFTERCARE

Controlled final ordinary outcomes:

부상 + 구급키트:
- Outcome stays 부상
- XP/Loot/Fatigue follow 부상
- persistent injury=0/recovery=0

중상 + 구급키트:
- Outcome becomes 부상 (NIGHT verdict 부상, event `구급키트가 중상을 부상으로 낮췄다.`)
- XP/Loot/Fatigue follow 부상
- persistent injury=1/recovery=0

사망:
- kit no effect

PASS:
- no hidden injury-risk %
- no Retreat conversion
- natural Severe-Injury recovery rule itself is unchanged

#### ITEM-Q76 — INSURANCE ORDER

With overlapping Insurance, PASS only if:
1. ordinary outcome resolves
2. Return Stone second retreat roll may convert a 부상 / 중상 / 사망
3. remaining Death or Severe Injury may be converted to 퇴각 by World Tree
4. First Aid Aftercare applies to final non-death Injury state

No second full resolve after Aftercare.

### RESULT PROOF / ATTRIBUTION

#### DI-Q-v28-5 — COUNTERFACTUAL DOES NOT ALTER RESOLVE

For a proof-enabled result:
- actual expedition outcome/state equals ordinary resolve with proof disabled
- gameplay RNG state after the expedition is identical
- no extra Gold/XP/Loot/Loyalty/state mutation occurs from shadow evaluation

#### DI-Q-v28-6 — UNPROVEN BRANCH

Construct a case where removing an Item would require a random branch not drawn by the actual
expedition.

PASS:
- comparison is UNPROVEN
- no replacement RNG is drawn
- no Hero Item claim is authored

#### DI-Q-v28-7 — OVERLAP ATTRIBUTION

Cover:
- only A necessary -> A credited
- A and B independently necessary -> A+B credited
- only combination provable -> generic committed-preparation credit
- different proven severity -> strongest Hero line only

No category-priority shortcut is allowed.

#### DI-Q-v28-8 — SPECIAL DUPLICATION

When 황금 1+1 actually changes a provable resolved result, it participates in attribution.
Its Special category does not exclude it from proof.

#### DI-Q-v28-8B — HERO ATTRIBUTION BOUNDARY

PASS:
- Fatigue-only differences do not produce Hero Item feedback
- Wallet-only differences do not produce Hero Item feedback
- a hidden risk reduction without a proven resolved Outcome/state difference does not produce Hero feedback
- avoided-death WHAT_HAPPENED uses the non-causal outcome sentence
- a named Item WHY line appears only when sold-Item proof exists
- proof ordering never creates more than the strongest allowed Hero line

## RELATED

Hazard / Fatigue / Supply -> Fatigue -> `DUNGEON_HAZARD_v2.8.0.md`
Job / Trait multipliers -> `NPC_TRAIT_v2.8.0.md`
Relic / build modifiers -> `RELIC_v2.8.0.md`
Sale handling / inventory -> `SALE_v2.8.0.md`
Order / reroll / pricing / Rarity progression -> `ECONOMY_ORDER_v2.8.0.md`
Final usefulness -> `FINAL_EXPEDITION_v2.8.0.md`
Meta unlock -> `META_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
