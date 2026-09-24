# DUNGEON_ITEM_QA

DOC=DUNGEON_ITEM_QA
OWNER=qa,dungeon,item,hazard,preparation,naked_run,fatigue,supply,injury,death_risk,great_success,deep_expedition,result_proof
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/DUNGEON_ITEM_QA_v2.8.0-patch.md,history/DUNGEON_ITEM_QA_v2.7.0.md,history/DUNGEON_ITEM_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/DUNGEON_ITEM_QA.md

Status values are not stored here.
This file defines acceptance criteria only.

Design owners under test: `DUNGEON_HAZARD_v2.8.0.md`, `ITEM_v2.8.0.md`.

## FAMILY / HAZARD IDENTITY

### DUN-Q01 — FAMILY IDENTITIES

SETUP:
Inspect all 5 Families.

EXPECT:
SPIDER=poison+bind
SLIME=corrosion+mire
FIRE=fire+highCombatPower
CRYPT=fear+dark
SNOW=cold+whiteout

PASS:
Each Family is mechanically distinct.

### DUN-Q02 — STAT MAPPING

SETUP:
Inspect hazard contributions.

EXPECT (User 2026-09-24, v2.9.0):
- poison -> 강인함
- bind -> 기동
- corrosion -> 강인함
- mire -> 기동
- fire -> 기동
- fear -> 정신
- dark -> 정신
- cold -> 강인함
- whiteout -> 정신

PASS:
Player-facing stat roles match actual resolution.

### DUN-Q03 — SPIRIT RELEVANCE

SETUP:
Play Crypt and Snow content.

EXPECT:
정신 matters meaningfully in both.

PASS:
Spirit is not a one-Family stat.

### DUN-Q04 — FAMILY HAZARD BOUNDARIES

SETUP:
Inspect Family data.

EXPECT:
- canonical hazards are exactly poison/bind/corrosion/mire/fire/fear/dark/cold/whiteout
- wet is not an independent Slime hazard
- slow, if retained internally, is only an implementation alias of mire
- armor is not a Fire-family hazard
- undead is a Family Tag, not direct hazard
- long is not a Hazard
- thirst is not a Condition/Hazard/resource system
- fatigue is NPC condition
- no Supply Burden Gate modifier or required Supply exists; Food/Drink Supply is Fatigue recovery only (User 2026-09-24, v2.9.0)
- Fire second axis is higher Dungeon Combat Power, not a separate Hazard

PASS:
No contradictory extra hazard layer or dead key affects resolution.

### DUN-Q19 — NONCANONICAL KEY ISOLATION

SETUP:
Search runtime resolution paths for wet/armor/undead/long/thirst and Job-specific hazard keys.

EXPECT:
None changes expedition resolution as an independent Hazard or hidden Job solution.

PASS:
Only canonical Hazard systems and Supply -> Fatigue recovery affect gameplay (User 2026-09-24, v2.9.0).

### DUN-Q21 — HAZARD EXPLANATION CONSISTENCY

SETUP:
Inspect all 9 canonical Hazards in Gate/preparation UI on desktop and touch/mobile.

EXPECT (User 2026-09-24, v2.9.0):
Every Hazard exposes the numbered short row, the same on every surface:
- MORNING plate, SALE destination plate, D25 scouting report and FINAL rows read `<Hazard> · 대응 <N> 필요 · <Stat> 10마다 대응 <k>` with N = ceil(Hazard Threat) of that Gate (the Final: Day 30 / T2 -> 29) and k = 3 (강인함: poison / corrosion / cold) / 4 (기동: bind / mire / fire · 정신: fear / dark / whiteout)
- Gate detail alone uses the full sentence `<Hazard> — 대응 <N> 필요 · <Stat> 10마다 대응 <k> · <Hazard> 대응 상품이 막는다`
- no `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` label row and no destination-plate `?` help survive (User 2026-09-24 revision 2, v2.9.0)
- no `강인함 압박` / `기동 압박` / `정신 압박` / `정신 중심 + 기동 보조 압박` label survives anywhere, including the D25 scouting report

Desktop:
hover/focus access works where tooltip is used.

Mobile:
tap or inline access provides the same information.

PASS:
- no canonical Hazard is name-only while another receives a detailed effect line
- no hover-only information
- `slow` is not presented as a separate canonical Hazard
- exact hidden formula remains hidden

### DUN-Q-v29-2 — ONE NON-투력 STAT PER HAZARD (3 / 3 / 3)

(User 2026-09-24, v2.9.0)

Controlled prepared states: vary one Core Stat at a time and read each Hazard's Defense.

EXPECT:
- 독 / 냉기 / 부식 Defense moves only with 강인함 (×0.30)
- 속박 / 진창 / 화염 Defense moves only with 기동 (×0.40)
- 공포 / 어둠 / 화이트아웃 Defense moves only with 정신 (×0.40)
- no Hazard Defense moves with 투력
- no Hazard reads a second Core Stat (no 정신 + 기동 split for 어둠 / 화이트아웃, no 강인함 for 화염)

PASS:
- exactly three Hazards per pressed Stat, 투력 never pressed
- Counter keys, Item Counter values, readiness labels 충분 / 대응 / 불안 / 취약 and thresholds are unchanged
- pressure label shown per Hazard matches the Stat that actually moves its Defense

### DUN-Q16 — FINAL FAMILY DATA OWNERSHIP

SETUP:
Use a Final Expedition that selects canonical Dungeon Families.

EXPECT:
Final reads each selected Family's existing T2 Hazard definition from `DUNGEON_HAZARD_v2.8.0.md`.
No alternate/duplicated Final-only Family Hazard table exists here.

PASS:
Dungeon Family data has one owner.
Detailed Final combination/power/clear QA -> `FINAL_EXPEDITION_v2.8.0.md`.

## GATE COUNT / TIER GENERATION

### DUN-Q12 — FAMILY INTRODUCTION

SETUP:
Run multiple seeds.

EXPECT:
Start with ~3/5 Families.
Additional Families enter within canonical early/mid windows.

PASS:
Early mix varies across runs without late impossible surprise.

### DUN-Q13 — TIER DAY PROGRESSION

SETUP:
Sample generated days across bands.

EXPECT:
Higher Tier availability/weight rises over Run.

PASS:
No impossible early T3 and no flat same-difficulty run.

### DUN-Q14 — INTRA-BAND CURVE

SETUP:
Compare early vs late days inside same band.

EXPECT:
Higher-tier weight gradually increases.

PASS:
Day13 and Day18 are not necessarily identical distributions.

### DUN-Q15 — MULTI-GATE VARIETY

SETUP:
Generate multi-Gate days.

EXPECT:
Distinct Families preferred where practical.

PASS:
Repeated identical prep demand is not dominant unless intentional.

### DI-Q-v28-12 — GATE COUNT / TIER DISTRIBUTION EXACT

Gate count PASS:
- D1–3 exactly 1
- D4–7 1/2 at 50% / 50%
- D8–18 exactly 2
- D19–29 2/3 at 50% / 50%
- D30 does not run ordinary Gate-count generation

Tier PASS:
- exact anchor rows equal DUNGEON_HAZARD_v2.8.0.md
- all in-between Days use linear interpolation between surrounding anchors
- D30 does not run ordinary Tier generation
- next-Day forecast reads the same function as generation

FAIL:
- a forecast-only probability table
- a different Save/Load forecast roll
- any alternate approximate band percentages acting as exact truth

## PREPARED POWER / GATE POWER / HAZARD THREAT / FORECAST

### DUN-Q70 — PREPARED POWER WEIGHTS

Controlled Stats with no other modifiers.

EXPECT ordinary expedition prepared ability:
```text
투력 .50 + 강인함 .34 + 기동 .27 + 정신 .20
```

PASS:
- Forecast uses these weights
- Resolve uses these weights
- Great Success prepared margin/signal uses the same weights
- no stale `.58/.32/.24/.16` ordinary path remains

### DUN-Q-v27-GATE-SLOPE — LATE-DAY GATE POWER

Owner rule: `DUNGEON_HAZARD_v2.8.0.md` §GATE POWER — LATE-DAY SLOPE.

PASS:
- the Day term is `min(Day, 9) × 1.70 + max(0, Day - 9) × 0.40`
- D1 through D9 Gate Power is identical to the pre-change value for the same Family, Tier and Day
- the base constant, Tier term, Family adjustment and Family Combat multiplier are unchanged
- D12 T1 ordinary Family reads 16.50 on the Day term, D24 reads 21.30

FAIL:
- a single slope applied across all Days
- an early-Day Gate Power that moved
- the slope implemented as a post-hoc multiplier on the finished Gate Power rather than on the
  Day term

### DUN-Q71 — HAZARD THREAT CURVE

EXPECT:
```text
Threat = 12 + Day*.35 + (Tier-1)*6
```

Exact anchors:
- D1 T1 = 12.35
- D12 T1 = 16.20
- D18 T2 = 24.30
- D24 T2 = 26.40
- D29 T3 = 34.15
- D30 T2 = 28.50

PASS: runtime threat matches.

### DI-Q-v28-13 — FORECAST / HAZARD LABEL BOUNDARIES

Combat ratio:
- >1.20 -> 우세
- >=0.80 -> 접전
- otherwise -> 불리

Hazard readiness ratio:
- >=1.00 -> 충분
- >=0.75 -> 대응
- >=0.40 -> 불안
- otherwise -> 취약

PASS:
- Hazard Defense uses the exact Core-Stat coefficients in DUNGEON_HAZARD_v2.8.0.md
- displayed label and actual underlying preparation state read the same calculation
- exact hidden formula is not exposed merely because QA knows it

## TIER PREPARATION / COUNTER ROUTES

### DUN-Q05 — T1 LEARNING / GROWTH OVERRIDE

SETUP:
Test T1 with:
- a well-grown suitable NPC without exact Counter
- the same/similar case with basic Direct Counter

EXPECT:
- strong growth can often make T1 viable even without exact Counter
- basic correct prep materially increases reliability
- T1 does not behave like a mandatory Item tax

PASS:
Growth matters and correct prep still feels useful.

### DUN-Q06 — T2 JUDGMENT ROUTE

SETUP:
Test T2 across grown NPCs with:
- primary Direct Counter
- Hybrid/Insurance/flex alternatives
- strong relevant Stats with lighter prep

EXPECT:
- Counter/Item coverage is materially valuable
- at least one normal route exists without two dedicated Direct Counters
- some strong-NPC cases create a real `cover it or trust growth?` decision
- T2 is not balanced as an automatic hard-counter tax in every case

PASS:
Preparation matters without eliminating judgment.

### DUN-Q07 — T3 SLOT CONTRACT

SETUP:
Test all Family T3 variants with appropriately grown NPCs.

EXPECT:
Viable clear route exists within <=2 meaningful required prep slots.

### DUN-Q72 — TIER PREPARATION TARGET

Representative neutral-fit NPCs:
- T1 lower/basic response can reach 충분; hybrid commonly slightly short
- T2 upper/main specialist can reach 충분; lower remains useful but commonly short
- T3 upper alone commonly 대응/slightly short; upper + secondary/natural/trait/hybrid can reach 충분

PASS:
- strong natural Stat/growth can reduce Item needs
- weak-fit NPC may need more
- no viable route requires a third normal Bag slot
- drawing one exact Epic SKU is never required for a viable T3 route

### DUN-Q08 — DIRECT VS HYBRID

SETUP:
Compare specialist Direct vs multi-hazard Hybrid.

EXPECT:
Direct is more reliable on its specific target.
Hybrid is more flexible across uncertainty.

PASS:
Hybrid is not strict superior specialist.

### DUN-Q09 — NO SINGLE ITEM FAMILY DELETE

SETUP:
Test strongest relevant item in each Family.

EXPECT:
One item cannot erase entire Family challenge.

PASS:
Stats/secondary pressure/insurance decisions remain relevant.

### DUN-Q10 — RESIDUAL RISK

SETUP:
Use proper Direct Counter repeatedly.

EXPECT:
- T1/T2 very reliable
- T3 may retain small residual risk
- no item-specific hidden defect RNG

PASS:
Risk comes from canonical expedition resolution.

### DUN-Q18 — HAZARD ROUTE COVERAGE

SETUP:
Audit all 9 canonical Hazards against ITEM matrix.

EXPECT:
Each Hazard has:
- 1 Main specialist route
- >=2 meaningful Alternative routes

Alternative routes may use Hybrid/secondary Counter/relevant Stat/Stat-support Item.
Insurance does not automatically count.

PASS:
No canonical Hazard depends on one mandatory SKU and alternatives are not duplicate copies.

### DUN-Q20 — PREPARATION NECESSITY / NAKED RUN

SETUP:
- representative multi-seed runs
- normal NPC progression
- no deliberate exploit
- compare:
  - A. repeated minimal/no preparation
  - B. reasonable Hazard-aware preparation

EXPECT:
- early game tolerates weak preparation
- preparation value increases with progression
- prepared play produces clearly better expedition outcomes
- naked/minimal-prep play must not remain a stable strategy into mid/late game

PASS:
- D1–3: weak/no prep usually survivable
- D4–7: repeated no-prep begins producing visible injury/retreat/failure cost
- D8–12: no-prep is materially worse than appropriate preparation
- D13–18: repeated naked play is not a reliable progression strategy
- D19+: reliable naked progression is exceptional, not normal
- T3 requires grown NPC + meaningful preparation for reliable outcomes

FAIL:
- player can routinely progress to mid/late game while ignoring Order/Item preparation
- NPC stat growth alone makes Hazard preparation largely irrelevant
- prepared vs unprepared outcome difference is too small to affect player decisions

NOTE:
Do not solve by adding arbitrary naked-run punishment.
Tune Dungeon pressure / Stat-route efficiency / growth / Item counter value so preparation naturally matters.

## SUPPLY / FATIGUE

### DUN-Q73 — FATIGUE OUTCOME TABLE

EXPECT base result Fatigue (User 2026-09-24, v2.9.0):
```text
성공 +4
대성공 +4
퇴각 +7
부상 +9
중상 0
사망 0
```

PASS: exact table before Trait/Supply modifications.

### DUN-Q74 — FATIGUE PENALTY

EXPECT five bands on the 0~40 scale (User 2026-09-24, v2.9.0):
```text
0~9   정상 none
10~19 지침 mobility/spirit -15%
20~29 과로 mobility/spirit -40%
30~39 소진 mobility/spirit -40% + combat/survival -20%
40    탈진 all four Core Stats -40% + failure-conditioned Death risk +10%p
```

PASS:
- applies to NPC Base+Equipment-side Stats
- Item Stat contribution is not multiplied by this NPC-side percentage
- the band is judged on `fatigueBeforeExpedition`
- Fatigue never exceeds 40; no stale 20 cap or -25% value survives
- Fatigue 40 adds the +10%p failure-Death term exactly like an injured departure (cap raised the same way)

### DUN-Q75 — SUPPLY ORDER / OUTCOME BUFFER

Controlled cases must verify exact order (User 2026-09-24, v2.9.0):
1. Supply reduces current Fatigue 1:1 before departure (`preRecovery`)
2. remaining Supply then reduces actual outcome Fatigue 1:1
3. unused remainder is discarded
4. Severe-Injury recovery days reduce Fatigue 5 per rest day at that morning, floor 0

PASS:
- `preparedSupply`, `preRecovery`, `fatigueBeforeExpedition`, `remainingSupplyBuffer`, `rawOutcomeFatigueGain`, `outcomeBufferUsed`, `actualOutcomeFatigueGain`, `finalFatigue`, `netFatigueDelta` match the current owner arithmetic
- no `requiredSupply` / `excessSupply` field or Supply payment step exists
- no duplicate `postOutcomeFatigueGain` truth is used for the same result
- no Supply Power/success/Loot/Hazard bonus
- no next-expedition buffer persistence
- no morning natural recovery
- Severe/Death raw outcome Fatigue remains 0

### DUN-Q-v29-1 — FATIGUE BANDS / REST RECOVERY

(User 2026-09-24, v2.9.0)

Controlled NPCs at departure Fatigue 9 / 10 / 19 / 20 / 29 / 30 / 39 / 40, then a Severe-Injury recovery period.

EXPECT:
- 9 -> 정상, no penalty; 10 and 19 -> 지침 -15% 기동/정신; 20 and 29 -> 과로 -40% 기동/정신
- 30 and 39 -> 소진 -40% 기동/정신 and -20% 투력/강인함
- 40 -> 탈진 -40% on all four Core Stats and `실패 시 사망 위험` +10%p over the same state at 39
- a 성공 at 36 with no Supply ends at 40, not 41 (clamp)
- Supply 3 at current Fatigue 22 departs at 19 (지침), not 22 (과로): the band is judged after preRecovery
- each Severe-Injury rest day lowers Fatigue by 5, floor 0; no other morning changes Fatigue
- NIGHT main line names the band from 20 up (`귀환 후 피로 22 · 과로`); 정상 / 지침 are not named

PASS:
- five bands, 0~40, applied to NPC Base+Equipment-side Stats only
- rest recovery exists only on Severe-Injury recovery days

### DI-Q-v28-4 — NO HYPOTHETICAL FATIGUE MATRIX

SALE must not display separate 성공/퇴각/부상 future Fatigue rows.
SALE shows the one decision line `피로 {A} → 출발 {B}` only on the counter tray for a chosen Food/Drink; no always-on Fatigue line and no `보급 회복` / `보급 부족` / `남은 보급` tail (User 2026-09-24, v2.9.0).

Supply/Fatigue runtime arithmetic follows the current owner truth.

## ORDINARY RESOLVE / DEATH / INJURY / CAUSALITY

### DI-Q-v28-14 — ORDINARY RESOLVE / REWARD BASELINE

Controlled seeded cases must verify (User 2026-09-24, v2.9.0: no Supply-deficit row):
- environment incident chance uses the exact closure formula and 2%–48% clamp
- escape chance uses the exact closure formula and 15%–94% clamp
- failed-combat Severe branch uses 42% base before current modifiers
- environment/other Severe branch uses 13% base before current modifiers
- injured departure adds the existing +15%p Severe escalation exactly once
- failure-conditioned Death still follows the separate current Death owner formula exactly once

Reward PASS:
- EXP base = 22 + Day×4.6
- EXP outcome multipliers are Great 1.40 / Retreat 0.38 / combat-success 1.00 / other living 0.50
- Wallet base = 35 + Day×8
- Wallet outcome multipliers are Retreat 0.08 / combat-success 1.00 / other living 0.18
- explicit XP/Loot/Gate reward modifiers compose once
- living combat-success equipment chance starts at 20% plus explicit rare-loot modifier
- equipment gain on hit is seeded integer +2 through +5

FAIL:
- a second alternative ordinary-resolve formula survives
- QA retunes any value to improve pass rate

### DUN-Q77 — ORDINARY FAILURE DEATH BASELINE

Controlled prepared states with known Combat and Hazard deficits.

EXPECT:

```text
CombatDeficit
= clamp((requiredCombatPower - effectivePreparedPower) / requiredCombatPower, 0, 1)

CombatDeathContribution
= CombatDeficit * 0.18

HazardDeficit_i
= clamp((HazardThreat_i - HazardDefense_i) / HazardThreat_i, 0, 1)

EnvironmentDeficit
= average(HazardDeficit_i)

EnvironmentDeathContribution
= EnvironmentDeficit * 0.12

healthyFailureDeathChance
= clamp(
    CombatDeathContribution + EnvironmentDeathContribution,
    0.00,
    0.30
)
```

If no canonical Hazard is present:
```text
EnvironmentDeficit = 0
```

PASS:
- Combat contribution uses the same current prepared-combat truth as Forecast/Resolve before hidden combat variance
- Environment contribution uses the same current Hazard Threat/Defense truth as readiness
- healthy minimum may reach exactly 0%
- healthy conditional cap is exactly 30%
- an expedition that resolves as `성공 / 대성공` performs zero Death rolls
- an expedition that enters the ordinary failure path performs exactly one Death roll
- that failure Death roll is not additionally gated behind a separate failed-escape requirement
- no second Death roll survives inside escape/injury/severe handling
- a 0% `실패 시 사망 위험` does not imply guaranteed Success
- the displayed percentage is not treated as unconditional whole-expedition Death probability

### DUN-Q78 — INJURED RE-EXPEDITION RISK / PRE-SUPPLY DISCLOSURE

Controlled identical NPC/Gate state except departure Injury state.

EXPECT when departure `injury=1`:
- ordinary visible Injury Stat penalty remains 투력 -15% / 강인함 -20%
- failure Death chance adds +10%p to the healthy conditional formula and caps at 40%
- Severe Injury transition chance adds +15%p at the existing Severe-vs-Injury branch
- departure at Fatigue 40 (탈진, judged on `fatigueBeforeExpedition`) adds the same +10%p failure-Death term and raises the cap the same way; injured and Fatigue-40 together cap at 50% (User 2026-09-24, v2.9.0)
- no extra independent Death/Severe roll is created
- `성공 / 대성공` still performs no Death roll

Pre-supply SALE check:
- exact `실패 시 사망 위험` % includes the +10%p injured modifier
- qualitative Combat Forecast / Hazard Readiness and exact `실패 시 사망 위험` are captured before any new Item commit
- after purchase commits, those displayed outlook values remain frozen
- actual `failureDeathChance` is recalculated internally from the final prepared state
- post-supply/final actual failure Death % is not exposed during the remaining-slot decision
- UI does not present the conditional percentage as unconditional whole-expedition Death probability

PASS:
- injured departure is materially riskier than healthy departure when an expedition fails
- healthy conditional cap remains 30%
- injured conditional cap remains 40%
- exact pre-supply `실패 시 사망 위험` is player-visible while the post-supply actual conditional probability remains hidden

### DUN-Q79 — ORDINARY INJURY NATURAL RECOVERY

Start at `injury=1`.

EXPECT:
```text
성공 -> injury 0
대성공 -> injury 0
퇴각 -> injury 1
부상 -> injury 1
```

PASS:
- Retreat does not clear ordinary Injury
- generic completion/non-Injury result does not clear it
- Severe recovery remains its separate rule in `NPC_TRAIT_v2.8.0.md`
- First Aid Aftercare may still override persistent Injury exactly as ITEM owns

### DUN-Q11 — CAUSALITY

SETUP:
Block one hazard but fail due to another/combat.

EXPECT:
Result copy names actual cause.

PASS:
Blocked hazard is not falsely blamed.

## GREAT SUCCESS / DEEP EXPEDITION

### GREAT SUCCESS
PASS:
- failed expedition cannot become Great Success
- ordinary combat/environment/injury/escape resolution occurs first without Great Success
- only final ordinary `성공` may upgrade to `대성공`
- injury/retreat/severe injury/death cannot coexist with Great Success
- margin uses prepared pre-noise Combat ability rather than lucky combat noise
- larger prepared Combat margin never lowers Great Success chance
- Great Success remains below 100% certainty
- signal threshold matches actual Great Success calculation
- no new hidden master-readiness Stat

### DI-Q-v28-10 — GREAT SUCCESS NUMERIC BASELINE

Expected:
    signal margin 0.26
    chance slope 0.80
    chance cap 0.30

PASS:
- small positive margin may produce Great Success even below the signal threshold
- signal threshold only controls presentation
- probability never exceeds 30%
- repeated Great Success by a well-grown NPC is not itself a failure

### DEEP SCHEDULE
PASS:
- only D7/D14/D21/D28 candidate windows
- exactly 2 or 3 actual occurrences
- at least one D7/D14
- at least one D21/D28
- Save/Load does not reroll

### DI-Q-v28-11 — DEEP OCCURRENCE / DIFFICULTY BASELINE

Expected:
- occurrence windows remain D7 / D14 / D21 / D28
- each Run has exactly 2 or 3 occurrences
- P(3 occurrences) = 50%
- P(2 occurrences) = 50%
- Deep required Combat Power = selected base Gate Power ×1.50
- no Deep Hazard inflation is added

### DEEP GATE
PASS:
- base is one of today's highest-Tier actual Gates
- tie is deterministic/seeded
- Family unchanged
- Tier unchanged
- Hazard set unchanged
- required Combat Power = base Gate Power × one Deep factor
- no additive / Day-specific Deep Power curve
- ordinary Item/Supply resolution used once
- one expedition / one result
- no T4 / extra Hazard / second roll

### EVENT EXCLUSION
PASS:
- actual Deep Day produces no Normal Event
- Deep is not selected from Event catalog
- no automatic 35% chance compensation

## ITEM CATEGORY / CATALOG

### ITEM-Q70 — PLAYER CATEGORY EXACT

Every active Item maps to exactly one of:
```text
Food / Drink / Potion / Field Gear / Insurance / Special
```

PASS:
- no active Medical category
- Potion line is not Special
- 농축 해독제 = Field Gear
- 구급키트 = Insurance

### ITEM-Q71 — ACTIVE CATALOG EXACT 40

PASS:
- exactly 40 active Items
- 붕대 inactive/retired
- 마석 보조배터리 inactive/retired
- 진정 허브티 active
- 중급 포션 active
- exactly 10 Epic preparation Items from `ITEM_v2.8.0.md` are active
- no retired ID leaks into Order/Sale generation

### ITEM-Q09 — ACTIVE CATALOG BOUNDARY

SETUP:
Inspect all sellable/generated Item IDs.

EXPECT:
Active sellable catalog matches ITEM canonical catalog exactly.
No extra source-only Item enters Order/Sale/Expedition resolution.

PASS:
Catalog count/identity is stable and no omitted strict-superior item leaks into play.

### ITEM-Q19 — ACTIVE CATALOG STRUCTURE

SETUP:
Audit canonical active catalog by Category/Rarity/Role.

EXPECT:
- each has exactly one player-facing Category
- low-rarity specialists remain meaningful
- new Items fill documented Hazard/build coverage gaps

PASS:
Catalog supports preparation and Relic builds without filler or strict universal upgrades.

### ITEM-Q02 — FUNCTIONAL ROLE

SETUP:
Audit catalog.

EXPECT:
Items have understandable gameplay role:
Stat/Supply (Fatigue recovery, shown `피로 회복 N`)/Direct/Hybrid/Condition/Insurance/RiskReward/Economy/Utility (User 2026-09-24, v2.9.0)

PASS:
No item exists only as unexplained modifier bundle.

### ITEM-Q03 — MATERIAL EFFECT VISIBILITY

SETUP:
Inspect Sale/Order item details.

EXPECT:
Important effect/penalty is player-readable.

PASS:
Material hidden behavior absent.

### ITEM-Q16 — NEW ITEM JUSTIFICATION

SETUP:
Review any newly added catalog item.

EXPECT:
It fills a proven coverage/price/role gap.

PASS:
No addition exists only to increase item count.

### ITEM-Q77 — FOOD/DRINK BASELINE VALUES

Audit the exact active table in `ITEM_v2.8.0.md`, including:
- Choco mobility +8 / Supply4
- Coffee mobility +12 / Supply2
- Herb Tea spirit +15 / Supply2
- Energy mobility +15 / Supply2
- Lava survival +8 / cold6 / Supply4
- Ramen cold10 / Supply5
- Ice fire10 / Supply1
- Candy fear10 / Supply3

Supply N is displayed as `피로 회복 N` (User 2026-09-24, v2.9.0).

PASS: no stale Stat bundle survives.

### ITEM-Q81 — REBALANCED PRICE TABLE

PASS exact Buy/Sell for changed original-catalog prices:

```text
캔커피                40 / 85
진정 허브티           40 / 85
얼음컵                30 / 65
랜턴 건전지           45 / 95
구급키트              80 / 170
핫팩                  60 / 130
농축 해독제           80 / 170
쿨링 이온음료         80 / 170
```

PASS:
- unchanged original-catalog prices remain exactly as listed in `ITEM_v2.8.0.md`
- no stale 180/360 antidote or 200/400 ion price survives
- Main Hazard specialist price bands remain practically comparable rather than rarity-only inflated

### ITEM-Q78 — GOLDEN COUPON PRICE

PASS:
`황금 1+1 쿠폰` canonical buy/sell = 500/1000 and existing explicit duplication interaction remains intact.

### ITEM-Q META — GOLDEN 1+1 UNLOCK

SETUP:
Inspect Item offer/acquisition eligibility before and after first distinct Boss clear.

EXPECT:
- 황금 1+1 쿠폰 remains canonical Item ID 30
- before META unlock it does not appear through normal acquisition
- after first distinct Boss clear it becomes eligible under its normal Item rules
- Item effect itself is unchanged by the unlock system

PASS:
META gates availability only; ITEM continues to own the effect.

## MEAL / WATER LINE

### DI-Q-v28-1 — ITEM BASELINE

Expect exactly:

| Item | Rarity | Buy/Sell | 강인함 | Supply (`피로 회복 N`) | Extra |
|---|---|---:|---:|---:|---|
| 삼각김밥 | C | 35/70 | +6 | 5 | — |
| 생수 | C | 40/85 | +10 | 2 | — |
| 간단 도시락 | U | 85/180 | +10 | 6 | expedition Wallet +20% |
| 길드 특제 도시락 | R | 160/340 | +14 | 7 | expedition Wallet +40% |
| 영웅 결전 도시락 | E | 210/440 | +18 | 9 | — |
| 왕도 천연암반수 | E | 185/390 | +20 | 2 | — |

PASS:
- active catalog count remains 40
- active Rarity distribution is C11 / U12 / R5 / E11 / L1
- no unrelated Item Rarity is moved from the approved active distribution
- Hotbar names are not active player Items
- meal shelf life 2, water shelf life 5
- Supply is the direct Fatigue reduction (`피로 회복 N`, current Fatigue first, remainder buffers this expedition's gain); no replacement carries any other Fatigue effect (User 2026-09-24, v2.9.0)

### DI-Q-v28-2 — WALLET GAIN SCOPE

PASS:
- U meal adds +0.20 to ordinary expedition loot modifier
- R meal adds +0.40
- modifiers add with existing ordinary loot modifiers
- Deep bonusWallet is not multiplied
- Store Support/Event/direct Wallet grants are not multiplied
- player copy says 원정 소지금 획득

### DI-Q-v28-3 — MEAL VS WATER IDENTITY

PASS direction (User 2026-09-24, v2.9.0):
- meal is materially higher Fatigue recovery (Supply): Food = large recovery + lower Core Stat
- water is materially more Stat-concentrated for its stage: Drink = small recovery + sharper Stat/Counter
- Water does not become a meal substitute through Fatigue recovery
- Meal does not become a raw-Stat Potion substitute

This is a design-shape check, not permission to auto-tune numbers.

### DI-Q-v28-3B — CURRENT ITEM ART IDENTITY

PASS:
- `bar` reads visually as 간단 도시락 / meal-lunchbox
- `herobar` reads visually as 왕도 천연암반수 / bottled water
- neither retains the retired Hotbar/skewered-stick silhouette
- icon change does not alter ID, Category, Rarity, price, effect or save compatibility

### DI-Q-v28-9 — REPLACEMENT FLAVOR

Expected:
- 간단 도시락 -> \`반찬은 단출하지만 빈칸은 없다.\`
- 왕도 천연암반수 -> \`왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.\`

FAIL:
- skewer/Hotbar Flavor survives on either replacement ID

### ITEM-Q10 — PREMIUM LUNCH (`premium` / 길드 특제 도시락)

SETUP:
Compare across multiple contexts.

EXPECT:
Useful premium expedition/economy option.

PASS:
Does not dominate survival+Fatigue recovery+loot+stats simultaneously (User 2026-09-24, v2.9.0).

## POTION / STAT ITEMS

### ITEM-Q72 — POTION LADDER

EXPECT:
- 하급: 70/140, 투력 +8
- 중급: 110/230, 투력 +12
- 상급: 150/300, 투력 +16
- 최상급: 190/400, 투력 +24

All:
- Potion category
- Supply 0 (no `피로 회복` row; User 2026-09-24, v2.9.0)
- Counter 0
- Insurance 0
- same ordinary Potion-family shelf-life behavior unless explicitly overridden

PASS:
- no hidden generic success bonus beyond Core Stat contribution
- 중급 포션 does not inherit retired 마석 보조배터리의 non-expiring/tool-like shelf behavior merely from slot reuse

### ITEM-Q74 — SPIRIT STAT ROUTE

`진정 허브티`:
- Drink Common
- 40/85
- 정신 +15
- Supply 2, displayed `피로 회복 2` (User 2026-09-24, v2.9.0)
- no explicit fear/dark/whiteout Counter

PASS: it is a natural-Stat alternative, not a hidden multi-Hazard specialist.

### ITEM-Q82 — DIRECT STAT ITEM RELEVANCE

Controlled representative mid/late-Run NPCs around a marginal Forecast state.

PASS direction:
- selling one appropriate direct-Stat Item produces a perceptible current Core-Stat change
- representative marginal cases can cross a qualitative Forecast boundary because of one appropriate Item
- NPC long-term Growth remains the main body of strength rather than being replaced by Item scaling
- no Day/Level percentage-scaling Item system exists
- Fresh/Potionbody can increase the owned Item contribution, but Counter/Supply/Insurance channels remain outside that native-Stat amplification

Exact base Item values must match the current active catalog; Supply is displayed `피로 회복 N` (User 2026-09-24, v2.9.0).

## HAZARD COUNTER ITEMS

### ITEM-Q73 — HAZARD COUNTER VALUES

Exact pre-Epic Main/Lower/Hybrid Item Counter values:
- antidote poison +18
- mask poison +12
- rope bind +16
- coating corrosion +18
- cloak corrosion +6 / mire +6
- boots mire +16
- ion fire +18
- ice fire +10
- wine fear +18
- candy fear +10
- battery dark +16
- heat cold +18
- ramen cold +10
- lava cold +6
- goggles whiteout +16

PASS:
- specialist Field Gear does not retain stale generic positive Core Stats except explicit current catalog exceptions
- Hybrid remains weaker per target than dedicated specialist

### ITEM-Q15 — HAZARD ITEM MATRIX

SETUP:
Build the 9-Hazard × Item/Stat route matrix.

EXPECT:
For every canonical Hazard:
- 1 Main specialist
- >=2 meaningful Alternatives
- Main remains the most reliable dedicated response

PASS:
No Hazard relies on a single mandatory SKU and Hybrid does not strictly dominate its specialist.

### ITEM-Q07 — HOT PACK VS LAVA NOODLE

SETUP:
Compare pure Cold response.

EXPECT:
Hot Pack > Lava Noodle for Cold specialization.

PASS:
Lava Noodle retains Food/Hybrid identity.

### ITEM-Q79 — ANTIDOTE ROLE BOUNDARY

`농축 해독제`:
- Field Gear Rare
- 80 / 170
- poison Counter +18

PASS:
- no generic positive Core Stat
- no hidden poison Condition/cure subsystem
- its gameplay identity is the dedicated Poison Hazard specialist

## EPIC PREPARATION ITEMS

### ITEM-Q83 — EPIC FAMILY HYBRIDS

EXPECT exact new Epic Field Gear:

```text
거미줄 방호세트   150/320  독+12 / 속박+12
연금 방수슈트     150/320  부식+12 / 진창+12
성화 랜턴         150/320  공포+12 / 어둠+12
백설 방한고글     150/320  냉기+12 / 화이트아웃+12
마그마 냉각장비   160/340  화염+14 / 투력+6
```

PASS:
- each dual-Hazard value remains below the owning dedicated Main specialist value
- FIRE item does not invent a second FIRE Hazard
- `마그마 냉각장비 투력+6` is an explicit exception only

### ITEM-Q84 — EPIC TOP-END STAT/SUPPLY ITEMS

EXPECT:

```text
초고속 에너지드링크    Drink E   160/340  기동+18 / Supply2
대현자 허브엘릭서      Drink E   160/340  정신+20 / Supply2
최상급 포션            Potion E  190/400  투력+24
```

Supply2 is displayed `피로 회복 2` (User 2026-09-24, v2.9.0).

PASS:
- ordinary category modifier rules apply
- no Epic-only hidden multiplier
- these Items improve one-slot late-Run value without adding Bag slots

### ITEM-Q85 — NO D20 HARD UNLOCK FOR NEW EPICS

PASS:
- all 10 Epic preparation Items use the ordinary Epic pool
- no per-Item `day>=20` hard eligibility gate exists for them
- practical late-Run frequency comes only from current `ECONOMY_ORDER_v2.8.0.md` Day-band Rarity progression plus existing general eligibility rules

## ITEM INTERACTION / MODIFIER SCOPE

### ITEM-Q04 — NO GENERAL HIDDEN COMBO

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

### ITEM-Q05 — EXPLICIT SPECIAL INTERACTION

SETUP:
Use 황금 1+1 coupon or equivalent explicit item.

EXPECT:
Interaction is stated in item description and resolves predictably.

PASS:
No hidden combo knowledge required.

### ITEM-Q14 — CATEGORY AFFINITY SCOPE

SETUP:
Apply Food affinity to multi-effect Food item.

EXPECT:
Food-native core effect may increase.
Unrelated hazard counter does not auto-scale.

PASS:
Whole-item multiplier absent.

### ITEM-Q18 — FRESH CORE-EFFECT SCOPE

SETUP:
Apply generic Food/Drink category boosts to multi-role Items.

EXPECT:
Hazard Counter/Insurance/RiskReward penalty does not auto-scale unless explicitly stated by the Relic/effect.

PASS:
Fresh-category multipliers do not become blanket whole-item multipliers.

### ITEM-Q80 — FOOD TRAIT × FRESH STACKING

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
- the Supply value (`피로 회복 N`) is unchanged by Fresh / Relic native-Stat percentages (User 2026-09-24, v2.9.0)
- GLUTTONY, when present in Final, applies after the Item-side positive Core-Stat contribution is resolved

### ITEM-Q17 — SUPPLY = FATIGUE RECOVERY / NO THIRST

(User 2026-09-24, v2.9.0)

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

## INSURANCE

### ITEM-Q11 — RETURN STONE

SETUP:
Use in losing expeditions.

EXPECT:
Uses approved escapeBonus +50%p and raises escape/retreat chance without increasing combat success directly.

PASS:
Acts as probabilistic lower-tier insurance, not a success item or Death->Severe conversion.

### ITEM-Q12 — RETREAT REWARD

SETUP:
Trigger Return Stone retreat.

EXPECT:
EXP reduced but >0.
Loot nearly none.

PASS:
Hierarchy feels distinct from success and death.

### ITEM-Q13 — WORLD TREE INSURANCE

SETUP:
Trigger lethal outcome with Epic World Tree insurance active.

EXPECT:
Death converts once to Severe Injury.

PASS:
Clearly stronger survival tier than Return Stone and not treated as Food.

### ITEM-Q75 — FIRST AID AFTERCARE

Controlled final ordinary outcomes:

부상 + 구급키트:
- Outcome remains 부상
- XP/Loot/Fatigue follow 부상
- persistent injury=0/recovery=0

중상 + 구급키트:
- Outcome remains 중상
- XP/Loot/Fatigue follow 중상
- persistent injury=1/recovery=0

사망:
- kit no effect

PASS:
- no hidden injury-risk %
- no Retreat conversion
- natural Severe-Injury recovery rule itself is unchanged

### ITEM-Q76 — INSURANCE ORDER

With overlapping Insurance, PASS only if:
1. ordinary outcome resolves
2. Return Stone emergency escape may convert eligible crisis
3. remaining Death may be converted by World Tree
4. First Aid Aftercare applies to final non-death Injury state

No second full resolve after Aftercare.

## RESULT PROOF / ATTRIBUTION

### DI-Q-v28-5 — COUNTERFACTUAL DOES NOT ALTER RESOLVE

For a proof-enabled result:
- actual expedition outcome/state equals ordinary resolve with proof disabled
- gameplay RNG state after the expedition is identical
- no extra Gold/XP/Loot/Loyalty/state mutation occurs from shadow evaluation

### DI-Q-v28-6 — UNPROVEN BRANCH

Construct a case where removing an Item would require a random branch not drawn by the actual
expedition.

PASS:
- comparison is UNPROVEN
- no replacement RNG is drawn
- no Hero Item claim is authored

### DI-Q-v28-7 — OVERLAP ATTRIBUTION

Cover:
- only A necessary -> A credited
- A and B independently necessary -> A+B credited
- only combination provable -> generic committed-preparation credit
- different proven severity -> strongest Hero line only

No category-priority shortcut is allowed.

### DI-Q-v28-8 — SPECIAL DUPLICATION

When 황금 1+1 actually changes a provable resolved result, it participates in attribution.
Its Special category does not exclude it from proof.

### DI-Q-v28-8B — HERO ATTRIBUTION BOUNDARY

PASS:
- Fatigue-only differences do not produce Hero Item feedback
- Wallet-only differences do not produce Hero Item feedback
- a hidden risk reduction without a proven resolved Outcome/state difference does not produce Hero feedback
- avoided-death WHAT_HAPPENED uses the non-causal outcome sentence
- a named Item WHY line appears only when sold-Item proof exists
- proof ordering never creates more than the strongest allowed Hero line

## SIMULATION / BALANCE QA

### SIM-Q01 — COMBAT VARIANCE

SETUP:
Run full-run simulations/playtests with canonical baseNoise ±17.5%.

EXPECT:
Borderline outcomes can swing.
Strong invested NPC remains trustworthy.
The hidden exact variance is not exposed to the Player or encoded as a knowledge-check Trait.

PASS:
±17.5% is used as the baseline and any later retune is supported by outcome evidence.

### SIM-Q02 — ROLE USAGE

SETUP:
Full-run simulation/playtest.

EXPECT:
Supply, Direct, Hybrid, Stat, Insurance, RiskReward and explicit Utility all receive meaningful use where applicable.

PASS:
No role is effectively dead or always mandatory.

### SIM-Q70 — THREE PREPARATION AXES

Full-run simulation/playtest must demonstrate that common rational Bag decisions can trade among:
- direct combat/stat preparation
- Hazard response
- Fatigue/Condition management

PASS direction:
no one axis is universally ignorable or universally mandatory.

### SIM-Q71 — ITEM / GROWTH HIERARCHY

Track Item direct contribution against NPC Level/Growth/Equipment.

PASS direction:
- NPC growth remains the main long-term body of strength
- one appropriate Item can change an expedition decision
- late-game Stat Items are not decorative dead picks
- generic Potion is not the universal best answer over Counter/Food choices
- Epic improves slot efficiency but does not become mandatory for T3 viability

### SIM-Q72 — REQUIRED METRICS

Record at minimum:
- Job × Level × Family × Tier outcomes
- four-Stat/equipment distribution
- departure Fatigue distribution and time at 10+/20+/30+/40 (User 2026-09-24, v2.9.0)
- Food/Drink pick rate by current Fatigue
- Supply use split: preRecovery / outcomeBuffer / waste
- Potion tier offer/order/sale/use
- Counter lower/upper/hybrid use
- Epic offer/order/sale/use by Day band and category
- healthy vs injured re-expedition outcome distribution
- healthy vs injured expedition Death/Severe rates by CombatDeficit and EnvironmentDeficit band
- Item dead-pick / universal-best rates
