# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,forecast,counter,prepared_power,supply,fatigue,death,death_risk,great_success,result_proof,counterfactual
DOC_VERSION=2.10.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.10.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## KEY
families=[SPIDER,SLIME,FIRE,CRYPT,SNOW]
tiers=[I,II,III]

stats:
combat=투력
survival=강인함
mobility=기동
spirit=정신

structure=Family×Tier
canonicalHazards=[poison,bind,corrosion,mire,fire,fear,dark,cold,whiteout]
exactSuccessProb=HIDDEN
exactHazardFormula=HIDDEN
mandatoryJob=NO
T3.requiredPrepSlots<=2

Tier decision intent:
T1=well-grown suitable NPC can often overcome without an exact Counter; basic prep increases reliability
T2=Counter/Item coverage is materially valuable but should still create a `들려 말어?` judgment rather than an automatic tax
T3=strong dedicated-prep pressure; still must preserve the <=2 meaningful required-prep-slot clear-route contract

## FAMILY

### SPIDER — 독거미
theme=[poison,bind]
poison -> 강인함
bind -> 기동

T1=poison
T2=poison+bind
T3=strong(poison)+strong(bind)

### SLIME — 슬라임
theme=[corrosion,mire]
corrosion -> 강인함
mire -> 기동
slow=implementationAliasOfMireOnly

T1=primary pressure
T2=corrosion+mire
T3=strong(corrosion)+strong(mire)

wet=flavorOnly

### FIRE — 화염 골렘
theme=[fire,highCombatPower]
hazards=[fire]

fire -> 정신
secondAxis=higher Dungeon Combat Power
secondAxisIsHazard=NO

T1=fire
T2=fire + increasedCombatPower
T3=strong(fire) + highCombatPower

Gate required Combat Power carries a Family factor `golemCombat=0.90` (화염 골렘 광산, Family id `golem`).
Fire has no special occurrence weighting: Families are drawn uniformly.

armorHazard=NO

### CRYPT — 망자역
theme=[fear,dark]
familyTag=undead

fear -> 정신
dark -> 기동

T1=fear
T2=fear+dark
T3=strong(fear)+strong(dark)

undeadHazard=NO
jobKeySolution=NO

canonicalHazardKeysOnly=YES

### SNOW — 설원
theme=[cold,whiteout]

cold -> 강인함
whiteout -> 정신

T1=cold
T2=cold+whiteout
T3=strong(cold)+strong(whiteout)

## HAZARD PLAYER-FACING PRESSURE

Every canonical Hazard exposes a consistent short explanation of what core Stat/readiness it pressures.

One non-투력 Stat per Hazard, 3 / 3 / 3:
- 강인함: 독 · 냉기 · 부식
- 기동: 속박 · 진창 · 어둠
- 정신: 공포 · 화이트아웃 · 화염
- 투력 is never a Hazard-pressured Stat (it already carries the largest combat coefficient).
- Gate constraint: within one Gate (a Family's Tier Hazard set) no two Hazards press the same Stat, so one Stat never answers a whole Gate (망자역 지하묘지 = 정신 + 기동). The Final's merged two-Family pool may repeat a Stat.

No pressure label row anywhere: `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and `강인함 압박` / `기동 압박` / `정신 압박` / `정신 중심 + 기동 보조 압박` never appear. Every player-facing Hazard row is the numbered row below.

Full Hazard sentence (Gate detail only; the Gate-level requirement number first):
- `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다` — N = the Counter that alone reaches 충분 on that Gate that Day (`ceil(Hazard Threat)`); n = 3 for every Stat (×1/3)
- e.g. `독 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 독 대응 상품이 막는다` (DAY 1 T1)
- e.g. `냉기 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다` (DAY 1 T1)
- e.g. `부식 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 부식 대응 상품이 막는다` (DAY 1 T1)
- e.g. `속박 — 대응 13 필요 · 기동 3당 대응 1 제공 · 속박 대응 상품이 막는다` (DAY 1 T1)
- e.g. `진창 — 대응 13 필요 · 기동 3당 대응 1 제공 · 진창 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화염 — 대응 13 필요 · 정신 3당 대응 1 제공 · 화염 대응 상품이 막는다` (DAY 1 T1)
- e.g. `공포 — 대응 13 필요 · 정신 3당 대응 1 제공 · 공포 대응 상품이 막는다` (DAY 1 T1)
- e.g. `어둠 — 대응 13 필요 · 기동 3당 대응 1 제공 · 어둠 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화이트아웃 — 대응 13 필요 · 정신 3당 대응 1 제공 · 화이트아웃 대응 상품이 막는다` (DAY 1 T1)

Short row (every other Hazard row — MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL 확인된 위협; the number first): `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`. N is that Gate's own Day / Tier (the Final: Day 30 / T2 -> 29). No label row and no per-customer remaining need. The short row renders as two lines on a phone — `대응 {N} 필요` (body size) over the smaller sub-line `{능력치} {n}당 대응 1 제공` — and as one ` · ` line where the width allows (900px+).

The destination plate has no help (`?`): the numbered row carries the detail itself.

Rules:
- explanatory information only; exact success formula stays hidden
- all 9 canonical Hazards follow the same presentation contract
- `slow` is not shown as a separate Hazard
- SLIME secondary player-facing Hazard is `진창`
- do not explain only some Hazards while leaving others name-only

Interaction ownership -> `UI_UX_v2.8.0.md`

## GLOBAL PRESSURES

### FATIGUE
type=persistentNPCCondition
familyHazard=NO

sources may include: repeated expedition, event, injury/condition effects.

recovery:
- Food/Drink Supply: each point reduces Fatigue by 1 -> §SUPPLY -> FATIGUE
- nothing else: no morning natural recovery, and a Severe-Injury recovery day does not change Fatigue

## FATIGUE OUTCOME BASELINE

```text
성공      +4
대성공    +4
퇴각      +7
부상      +9
중상       0
사망       0
```

Trait result modifiers and their outcome scope -> `NPC_TRAIT_v2.8.0.md`.

Severe Injury and Death are final result-Fatigue gain 0 and a Trait may not raise them; a Severe Injury already costs the adventurer rest days, and its rest day recovers no Fatigue.

## FATIGUE STAT PENALTY

Fatigue scale 0~40 (max / clamp 40), five bands:

```text
0~9    : 정상 — no Stat penalty
10~19  : 지침 — 기동 / 정신 -15%
20~29  : 과로 — 기동 / 정신 -40%
30~39  : 소진 — 기동 / 정신 -40% + 투력 / 강인함 -20%
40     : 탈진 — 투력 / 강인함 / 기동 / 정신 -40% + failure-conditioned Death risk +10%p
```

The band is judged on `fatigueBeforeExpedition`.
The Fatigue-40 Death term is the same additive +10%p term as re-sending an injured NPC, and raises the cap the same way -> §ORDINARY EXPEDITION FAILURE DEATH RISK.

Apply this to NPC Base+Equipment-side Stats in the same preparation layer where current NPC-side Fatigue modifiers are applied.
Sold Item Stat contribution is not multiplied by this NPC-side percentage unless another owner explicitly says so.

Fatigue 40 (탈진) is an explicit overuse state, not a mild top band.
NIGHT main line shows the band name from 20 up: `귀환 후 피로 22 · 과로` (`정상` / `지침` are not named).

## SUPPLY -> FATIGUE

For this calculation:

```text
preparedSupply = final Food/Drink Supply after all valid Item/Trait/Relic adjustments
```

This is the same `preparedSupply` field exposed by `NIGHT_CLOSING_v2.8.0.md`.
All active Food/Drink have Supply > 0 according to `ITEM_v2.8.0.md`.

longHazard=NO
thirstSystem=NO
hungerGauge=NO
foodDrinkHiddenCombo=NO

Food/Drink Supply is processed as:

```text
preRecovery
= min(currentFatigue, preparedSupply)

fatigueBeforeExpedition
= currentFatigue - preRecovery

remainingSupplyBuffer
= preparedSupply - preRecovery

rawOutcomeFatigueGain
= outcome baseline + applicable Fatigue Trait modifier

Severe Injury / Death:
rawOutcomeFatigueGain = 0

actualOutcomeFatigueGain
= max(0, rawOutcomeFatigueGain - remainingSupplyBuffer)

outcomeBufferUsed
= rawOutcomeFatigueGain - actualOutcomeFatigueGain

finalFatigue
= clamp(fatigueBeforeExpedition + actualOutcomeFatigueGain, 0, 40)

netFatigueDelta
= finalFatigue - beforeFatigue

restRecovery
= 0
```

Meaning:
1. No Gate has a required Supply; there is no Supply Deficit and no excess Supply. Every Supply point is Fatigue recovery.
2. Supply reduces current Fatigue first (1:1, before departure).
3. Any still-remaining Supply buffers this expedition's resulting Fatigue gain 1:1.
4. Leftover Supply does not become Power, success chance, Loot, Hazard defense, or a persisted next-expedition buffer.
5. The Item value is shown as `피로 회복 N` (never `보급 +N`). One-sentence rule: `음식·음료는 피로를 줄인다.`
6. No natural recovery of any kind: neither a morning nor a Severe-Injury rest day changes Fatigue; only Food/Drink lower it.

Result fields (named as in `NIGHT_CLOSING_v2.8.0.md`): beforeFatigue, preparedSupply, preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer, rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue, netFatigueDelta.
No requiredSupply / excessSupply field, and no second live `postOutcomeFatigueGain` field name for the same value.

## PREPARATION SEQUENCE

```text
A. NPC Base + Equipment
B. evaluate Bag Item Stat / Counter / preparedSupply
C. calculate preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer
D. apply NPC-side Trait / Injury / Fatigue-band modifiers using fatigueBeforeExpedition
E. add Sold Item Core Stat contribution
F. apply existing Hazard calculations
G. after the actual Outcome is known, calculate rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue
```

Do not consume the outcome buffer before the actual Outcome exists.

## PLAYER-FACING INFORMATION BOUNDARY

Expose exact decision ingredients:
- Prepared Supply
- current Fatigue
- current Fatigue band name from 20 up
- existing Injury state and its visible Stat penalties
- that sending an injured NPC again increases Severe / failure-Death risk
- that departing at Fatigue 40 (탈진) increases failure-Death risk
- exact pre-supply `실패 시 사망 위험` % at SALE entry, owned by this failure-conditioned Death-risk model, shown in the 전투 전망 help and the NPC detail rather than as an always-on readout cell

Do not expose:
- exact expedition success probability
- post-supply/final actual Death probability during the SALE decision
- the readiness ratio thresholds 대응 / 불안 / 취약 (0.75 / 0.40) and the Hazard Defense formula; the Gate's 충분 requirement `대응 {N} 필요` (N = ceil(Hazard Threat)) and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` are public Gate-level facts on every Hazard row (MORNING, ORDER Gate detail, SALE destination plate, D25 scouting report, FINAL) — never a per-customer remaining need

Do not show the Player a branch table of hypothetical final Fatigue for 성공 / 퇴각 / 부상.

SALE exposes current Fatigue (the customer's status strip `피로 N`) and actual deterministic current arithmetic.
Departure Fatigue after committed preRecovery is not a SALE line: the counter tray lists a Food/Drink's own `피로 회복`
only and NIGHT answers the rest; no `피로 A → 출발 B` line and no always-on Fatigue line under the outlook.

NIGHT exposes the one resolved final Fatigue path.

## PREPARED POWER

For ordinary expedition Forecast, Resolve, and Great-Success prepared margin:

```text
Prepared Power
= 투력 × 0.50
+ 강인함 × 0.34
+ 기동 × 0.27
+ 정신 × 0.20
```

Rules:
- 투력 remains the strongest single direct lever.
- Do not create a Player-facing aggregate Power Stat.
- Forecast and actual Resolve must use the same four weights.
- Great Success margin/signal must read the same prepared ability truth before hidden combat noise.
- A stale ordinary-expedition `.58/.32/.24/.16` path is invalid.

## GATE POWER — LATE-DAY SLOPE

Gate required Power keeps its current generation inputs. The Day term runs DAY 1~9 at 1.45 per Day, DAY 10 at 0.80,
DAY 11~20 at 1.10 and DAY 21+ at 1.10, DAY 21+ keeping the offset accumulated by D20. The late slope keeps the Gates
level with a grown roster (a D30 party grows about 1.9 prepared Power a Day in D21~29); DAY 10 keeps its own 0.80 step:

```text
Day term
= min(Day, 9) × 1.45 + max(0, min(Day, 10) - 9) × 0.80 + max(0, min(Day, 20) - 10) × 1.10 + max(0, Day - 20) × 1.10
```

Full required Power (Source-exact):

```text
Gate Power
= (21 + Day term + (Tier - 1) × 5 + FireTerm + (familyBase - 2) × 1.3) × FamilyCombat × SuccessEase
× Event danger multiplier

FireTerm = 6 + (Tier - 1) × 8 for golem, else 0
FamilyCombat = golemCombat 0.90 for golem, else 1
SuccessEase = 1.00 on DAY 1~7, 0.90 on DAY 8~21, 0.95 from DAY 22 (ordinary Gates; the Final's Boss Power is its own owner)
familyBase: spider 2 · slime 2 · golem 3 · crypt 3 · snow 4

Gate scale = 1 + Day × 0.10 + (Tier - 1) × 0.6   (Final: 4.6)
Gate reward multiplier = familyReward × (1 + (Tier - 1) × 0.12) × Event reward multiplier
familyReward: spider 1 · slime 1 · golem 1.15 · crypt 1.10 · snow 1.25 · Final 2
```

Day-term reference anchors:

```text
D9  = 13.05
D10 = 13.85
D12 = 16.05
D18 = 22.65
D20 = 24.85
D24 = 29.25
D29 = 34.75
```

## HAZARD THREAT

For each canonical Hazard:

```text
Hazard Threat
= 12 + Day × 0.35 + LateTerm + (Tier - 1) × 6
LateTerm = max(0, Day − 7) × 0.45 on ordinary Gates; 0 for the Final (마왕성 keeps Day 30 / T2 = 28.50)
```

Every Hazard reads the same Threat whatever Stat it presses: every Core Stat converts to Defense at ÷3, and an average
adventurer's own share is about the same in 강인함, 기동 and 정신, so no Stat group needs its own factor. The ÷3 conversion keeps
a Core Stat - an adventurer's own or a Food / Drink's - from standing in for a Counter (`ITEM_v2.8.0.md` §COUNTER LADDER).
The late term (from DAY 8) keeps one Counter from
holding 충분 for the whole Run: past the opening week a single Counter reaches 충분 only on its own rung's Gates, and the
late Tier 3 Gates ask for two slots of Counters or an adventurer strong in the pressed Stat.

Reference anchors:

```text
D1  T1 = 12.35
D7  T1 = 14.45
D12 T1 = 18.45
D18 T2 = 29.25
D24 T2 = 34.05
D29 T3 = 44.05
D30 T2 = 38.85 (ordinary formula; the Final reads 28.50)
```

## TIER CONTRACT

### T1
goal=learn primary family pressure

- primary Hazard 중심
- basic Direct Counter + suitable Stat => very reliable
- remaining slot should stay flexible
- proper basic preparation should feel trustworthy

### T2
goal=primary+secondary pressure

- Direct(primary)+suitable Stat => viable
- two Direct Counters not mandatory
- Hybrid/Stat/Insurance alternatives remain meaningful

### T3
goal=completed family pressure

- stronger primary + meaningful secondary
- grown NPC + good counter matter
- viable route within <=2 meaningful required prep slots

Tier scaling must not rely only on raw numeric inflation.

### NEUTRAL-FIT PREPARATION INTENT

Neutral-fit target:

```text
T1
- lower/basic response can reach 충분
- hybrid alone is commonly a little short

T2
- upper/main specialist can reach 충분
- lower response remains useful but is commonly short of 충분

T3
- upper/main specialist alone is commonly 대응 / slightly short
- upper + secondary/natural/trait/hybrid support can reach 충분
```

On a Gate's first Hazard the 초반 하이브리드 sits under the 초반 대응 (`ITEM_v2.8.0.md` §COUNTER LADDER), so 초반 대응 stays the
Tier 1 answer through the late Days a Tier 1 Gate still appears (D15~20) and the hybrid's worth arrives with the second
Hazard at Tier 2.

A naturally strong, invested NPC may need fewer Item resources; a weak-fit NPC may need more.
No canonical route may require a third normal Bag slot.

The Epic layer in `ITEM_v2.8.0.md` improves late-Run slot efficiency but is not a mandatory T3 key.
A valid T3 route must still exist without drawing one exact Epic SKU.

## COUNTER MODEL

### DIRECT
role=certainty/reliability
coverage=narrow
strength=high

feel:
T1=very reliable
T2=high reliability
T3=high reliability with small residual risk allowed

### HYBRID
role=flexibility
coverage=multiple
strengthPerHazard<Direct

feel:
T1=practical
T2=useful but less certain
T3=normally not sufficient alone

Hybrid value comes from: multiple possible Gates, destination uncertainty, order uncertainty, multi-hazard coverage.

## RESIDUAL RISK

Preparation should create confidence, not certainty.

itemSpecificHiddenFailureRNG=NO

Residual risk comes from normal hazard/environment resolution, combat uncertainty and visible trait/condition effects.

Narrative must match actual cause. A blocked Hazard must not be falsely blamed for an unrelated injury.

T1/T2 proper preparation should not repeatedly feel invalidated.

T3 prepared-Hazard incident target: ≈5–10% feel is an initial simulation target, not a fixed player-facing probability.

## HAZARD SOLUTION COVERAGE

Every canonical Hazard requires:

MAIN_ROUTE=1
ALTERNATIVE_ROUTE>=2

MAIN: specialist response; narrow coverage; highest reliability for that Hazard; immediately understandable.

ALTERNATIVE ROUTE may be: weaker Direct Counter, Hybrid Counter, relevant natural Stat route, Stat-support Item, other
explicit preparation trade-off.

Insurance/Escape is a common downstream safety layer and does NOT automatically count as one of the two Hazard-specific alternatives.

Rules:
- no mandatory single SKU
- Order RNG must not make reasonable preparation impossible
- alternatives must be meaningfully different, not three copies of the same Counter
- one Item must not solve an entire Family
- no Job is mandatory

Canonical item matrix -> `ITEM_v2.8.0.md`

## FAMILY COVERAGE

Every Family must remain solvable through combinations of Hazard Main/Alternative routes, Base Stats, flexible Item
choice and optional Insurance/Escape.

Affinity should emerge from stats + visible Item/Trait effects.

Related: item -> `ITEM_v2.8.0.md` · job -> `NPC_TRAIT_v2.8.0.md`

## FAMILY INTRODUCTION

runStart.starterFamilies=3/5

Family knowledge should emerge through supplied expeditions and successful return, not zero-supply scouting.
Exact Monster Knowledge gain contract -> `CORE_RUN_v2.8.0.md`.

family4.eligible≈D4–7
family5.eligible≈D8–12

Exact introduction day=seed/balance dependent

Goal: early Family mix differs across runs.

## INTRA-BAND CURVE

Day bands: D1–3 · D4–7 · D8–12 · D13–18 · D19–24 · D25–29 · D30.

Within each Day band, higher-tier weight rises gradually with Day.

Avoid identical Tier weights every Day in a band and abrupt one-day difficulty cliffs.

## CONTROLLED RANDOM

Seed-randomized within Day constraints: Family, Tier, Gate count.

Forbidden: D2 TierIII; fixed same Dungeon on same Day every run.

Multi-Gate: prefer distinct Families when practical.
Avoid multiple Gates demanding nearly identical preparation unless intentional.

## CURRENT-DAY GATE INFORMATION

Before Order commitment, the current Day Gate state is already generated and fixed.

Expose current-day preparation context:
- open Gate(s)
- actual current-day Family/Tier as defined by the Gate presentation
- known Hazard information

This is the information the player primarily orders against.

## NEXT-DAY GATE FORECAST — RETIRED

No player-facing next-day forecast exists (no next-Day Gate-count or Tier forecast). The Gate-count and Tier generation
rules below are the engine's alone; nothing derived from them is shown before the next Day opens.

## EXPEDITION FORECAST

Combat: [우세,접전,불리]
Hazard preparation: [취약,불안,대응,충분]

No master safety score. No exact success/death probability.
Player gets ingredients, not formula.

## COMBAT VARIANCE

baseNoise=±17.5%
baseNoiseCoefficient=0.175

Goal:
- border cases can swing
- weak `우세` is not absolute safety
- grown NPC advantage remains trustworthy
- RNG must not erase long-term growth

Any change to this value requires rechecking variance-related balance; no Trait may expose or require knowledge of the hidden exact noise percentage.

### HIDDEN LUCK REMOVAL
Hidden luck reference is strictly 0: no luck term in any combat noise or escapeChance formula.

## FULL-CHAIN NUMERIC CLOSURE — GATE / FORECAST / ORDINARY RESOLVE

These values are the required baseline. Later tuning requires measured evidence and a new approved owner amendment.

### Gate-count generation — exact

For ordinary Days:

| Day | Gate count |
|---|---|
| D1–3 | exactly 1 |
| D4–7 | 1 or 2, exactly 50% / 50% |
| D8–18 | exactly 2 |
| D19–24 | 3 at 70%, otherwise 2 |
| D25–29 | exactly 3, no draw |
| D30 | ordinary Gate-count generation does not run; Final owner applies |

### Tier generation — exact

Use the following exact anchor rows for ordinary Days:

| Day anchor | T1 | T2 | T3 |
|---|---:|---:|---:|
| D1 | 100% | 0% | 0% |
| D5 | 100% | 0% | 0% |
| D7 | 85% | 15% | 0% |
| D8 | 70% | 30% | 0% |
| D12 | 65% | 35% | 0% |
| D13 | 55% | 42% | 3% |
| D18 | 30% | 60% | 10% |
| D19 | 26% | 60% | 14% |
| D24 | 10% | 60% | 30% |
| D25 | 5% | 50% | 45% |
| D29 | 0% | 45% | 55% |

For Days between two anchors, linearly interpolate each Tier weight between the surrounding rows.
D30 does not use ordinary Tier generation.

Late T3 pressure: after the interpolation, DAY 21~29 move 0.10 of the T2 weight to T3 (never more than T2 holds); T1
and every other Day keep the anchor values. Examples: D24 10 / 50 / 40 · D25 5 / 40 / 55 · D29 0 / 35 / 65.

### Combat Forecast label boundary — exact, hidden formula

Let:

    combatRatio = Prepared Power / Gate required Power

Player label:

    combatRatio > 1.20  -> 우세
    combatRatio >= 0.80 -> 접전
    otherwise           -> 불리

The exact ratio/formula remains non-player-facing unless another current information rule explicitly
exposes an ingredient.

### Hazard Defense / Readiness — exact, hidden formula

For each Hazard:

    Hazard Defense
    = explicit Item/Trait Counter contribution
      + mapped Core-Stat contribution

Mapped Core-Stat coefficients (one non-투력 Stat per Hazard, 3 / 3 / 3, no Gate sharing a Stat; 투력 is never a Hazard-pressured Stat):

| Hazard | Core-Stat contribution |
|---|---|
| 독 | 강인함 ×1/3 |
| 냉기 | 강인함 ×1/3 |
| 부식 | 강인함 ×1/3 |
| 속박 | 기동 ×1/3 |
| 진창 | 기동 ×1/3 |
| 화염 | 정신 ×1/3 |
| 공포 | 정신 ×1/3 |
| 어둠 | 기동 ×1/3 |
| 화이트아웃 | 정신 ×1/3 |

Let:

    readinessRatio = Hazard Defense / Hazard Threat

Player label:

    readinessRatio >= 1.00 -> 충분
    readinessRatio >= 0.75 -> 대응
    readinessRatio >= 0.40 -> 불안
    otherwise              -> 취약

The 0.75 / 0.40 thresholds remain hidden calculation detail; the 충분 requirement and the Core-Stat conversion are shown per Gate (→ §PLAYER-FACING INFORMATION BOUNDARY).

### Ordinary non-Death resolution — exact baseline

After preparation:

    combatNoise
    = uniform multiplier within ±17.5%
      plus any explicit Trait variance modifier

    combatSuccess
    = Prepared Power × combatNoise >= Gate required Power

Environment incident probability:

    hazardAggregate
    = sum(Hazard gap) / max(1, sqrt(number of Hazards))

    environmentIncidentChance
    = clamp(
        0.08
        + hazardAggregate × 0.020
        - prepared 강인함 × 0.001,
        0.02,
        0.60
      )

When combat fails:

    escapeChance
    = clamp(
        0.48
        + prepared 기동 × 0.005
        + explicit escape modifier (Traits only; 귀환석's bonus is not read here)
        - Gate scale × 0.024,
        0.15,
        0.94
      )

    escape succeeds -> 퇴각
    escape fails    -> 부상 branch

귀환석 second retreat roll (the Item rule is owned by `ITEM_v2.8.0.md` §귀환석): an expedition whose Outcome is
부상 / 중상 / 사망 and whose Bag holds 귀환석 rolls once more, at the same escapeChance with the stone's bonus added
(`escapeChance + 귀환석 escapeBonus`, same 0.15~0.94 clamp); a hit makes the Outcome 퇴각.

On the failed-combat Injury branch:

    Severe chance
    = clamp(
        0.36
        + injuryRisk
        - injuryGuard × 0.25
        + injured-departure escalation,
        0,
        1
      )

On an environment/other Injury branch:

    Severe chance
    = clamp(
        0.11
        - injuryGuard × 0.12
        + injured-departure escalation,
        0,
        1
      )

The injured-departure escalation is +15%p under INJURED RE-EXPEDITION SEVERE ESCALATION.
The single failure-conditioned Death rule, Insurance conversions, Aftercare and Great Success keep
their current owner ordering and are not redefined here.

### Ordinary EXP / expedition-Wallet / equipment reward — exact baseline

For a living adventurer:

    baseEXP = 26.4 + Day × 5.52

Outcome multiplier:

    대성공 = 1.00
    퇴각   = 0.38
    combat-success path = 0.90   (성공, or a won fight that came home hurt)
    other surviving non-retreat path = 0.50

Then:

    EXP
    = round(baseEXP × outcomeMultiplier × explicit XP modifiers)

Ordinary expedition Wallet reward:

    baseWalletReward = 35 + Day × 8

Outcome multiplier (keyed on the resolved Outcome, ordered 중상 < 부상 < 퇴각 < 성공):

    대성공 / 성공 = 1.50
    퇴각 = 0.40
    부상 = 0.25
    중상 = 0.15
    사망 = 0

Then:

    expeditionWalletReward
    = round(
        baseWalletReward
        × outcomeMultiplier
        × (1 + explicit loot modifiers)
        × Gate reward multiplier
      )

This is the ordinary NPC expedition-Wallet channel consumed by current Item/Trait/Deep rules.

Equipment gain:
- only a living combat-success path is eligible
- base chance = 20% plus explicit rare-loot modifier
- on hit, Equipment tier +1
- Equipment 투력 gain = seeded integer 2–5 inclusive

These values are the Source-adoption baseline, not player-facing exact probability disclosure.

## ORDINARY EXPEDITION FAILURE DEATH RISK

Death risk is a **failure-conditional escalation risk** produced by the Player's actual preparation state.

Player-facing meaning:

```text
실패 시 사망 위험
= 이 원정이 성공 / 대성공으로 끝나지 못했을 때,
  그 실패가 사망까지 이어질 조건부 위험
```

It is **not** the unconditional probability that the NPC dies across every expedition attempt.

It combines exactly three preparation inputs:

```text
Combat preparation deficit
+ Environment / Hazard preparation deficit
+ departure ordinary-Injury risk
```

Death is not gated behind the specific chain:

```text
combat failure
-> escape failure
-> separate Death branch
```

But Death is also **not** rolled before the game knows whether the expedition succeeded.

There is exactly one ordinary-expedition Death roll, and it occurs only when the expedition enters the ordinary **failure path** instead of ending as `성공 / 대성공`.

### Combat contribution

Use the same current prepared-combat truth that drives ordinary Forecast/Resolve, before hidden combat variance:

```text
CombatDeficit
= clamp(
    (requiredCombatPower - effectivePreparedPower)
    / requiredCombatPower,
    0,
    1
)

CombatDeathContribution
= CombatDeficit × 0.40
```

`effectivePreparedPower` means the actual prepared state for the snapshot being calculated, including all already-applicable NPC-side modifiers and Item/Supply effects for that snapshot.
Do not use a separate Death-only combat score.

### Environment contribution

For each current canonical Hazard:

```text
HazardDeficit_i
= clamp(
    (HazardThreat_i - HazardDefense_i)
    / HazardThreat_i,
    0,
    1
)
```

Then:

```text
EnvironmentDeficit
= average(HazardDeficit_i)

EnvironmentDeathContribution
= EnvironmentDeficit × 0.20
```

If the expedition has no canonical Hazard entries, `EnvironmentDeficit = 0`.

Use the same current Hazard Threat / Hazard Defense truth as ordinary readiness.
Do not create a second Death-only Hazard table or hidden environment score.

### Healthy / injured failure Death chance

Healthy departure:

```text
healthyFailureDeathChance
= clamp(
    CombatDeathContribution
  + EnvironmentDeathContribution,
  0.00,
  0.50
)
```

If the NPC **began the expedition with ordinary Injury (`injury=1`)**:

```text
failureDeathChance
= clamp(
    healthyFailureDeathChance + 0.10,
    0.00,
    0.60
)
```

Otherwise:

```text
failureDeathChance = healthyFailureDeathChance
```

Fatigue 40 departure: if `fatigueBeforeExpedition = 40` (탈진), the same additive term applies, and the cap is raised the same way:

```text
injuryEscalation  = 0.10 if injury=1, else 0
fatigueEscalation = 0.10 if fatigueBeforeExpedition = 40, else 0
strainEscalation  = min(0.30, 0.08 × max(0, consecutiveInjuredDepartures − 1))
  consecutiveInjuredDepartures = this departure, if begun at injury=1, plus the unbroken run of this adventurer's
    immediately preceding expeditions also begun at injury=1; 0 when this departure is healthy
  (only CONSECUTIVE injured departures count — a healthy departure, including the
   return after a Severe-Injury rest, resets the chain; the first injured departure is free, every further one adds 8%p,
   up to 30%p; Fatigue does not feed this term)

failureDeathChance
= clamp(
    healthyFailureDeathChance + injuryEscalation + fatigueEscalation + strainEscalation,
    0.00,
    0.50 + injuryEscalation + fatigueEscalation + strainEscalation
)
```

Meaning:
- complete combat/environment preparation may reduce `실패 시 사망 위험` to 0%
- 0% does **not** mean guaranteed expedition Success; it means an ordinary failure does not escalate to Death through this roll
- weak combat preparation raises the conditional failure Death risk
- weak Hazard preparation independently raises the conditional failure Death risk
- repeating expeditions with an already-injured NPC adds a visible material risk
- departing at Fatigue 40 (탈진) adds the same visible material risk
- sending an adventurer out injured again and again escalates further: +8%p per consecutive injured departure after the first, up to +30%p, and the cap rises with it; one healthy departure resets it
- healthy conditional cap is 50%
- injured conditional cap is 60%
- Fatigue-40 conditional cap is 60%; injured and Fatigue-40 together 70%

These caps are conditional failure-risk caps, not unconditional whole-expedition Death probabilities.

### Preparation / Level Death reduction

Level does not lower the Death roll. The failure Death roll uses

```text
rolledDeathChance = failureDeathChance × preparedFactor

preparedFactor (만반의 준비) = 0.80 when ALL hold, else 1:
  - departed without Injury (injury=0)
  - fatigueBeforeExpedition < 20
  - 2 or more Items in the Bag
preparedFactor = 0.60 instead of 0.80 while the Decoration 구급품 진열장 is worn (META §display — 구급품 진열장)
```

- a Death roll inside `failureDeathChance` but outside `rolledDeathChance` does not become 사망: the Outcome becomes
  중상 with a flat 0.36 chance, otherwise 부상 — one extra draw, no second Death roll
- the SALE `실패 시 사망 위험` snapshot is the raw `failureDeathChance` and never includes `preparedFactor`
  (it depends on the Bag, which the snapshot excludes)
- the Night report names a 만반의 준비 save with one line; exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`

### Resolution order

After the final preparation state for the expedition is fixed:

1. calculate the final actual `failureDeathChance` from that prepared state
2. resolve the ordinary combat/environment path far enough to determine whether the expedition remains on a Success path or enters a failure path
3. if the expedition ends as `성공 / 대성공`, perform **no Death roll**
4. if the expedition enters the failure path, perform exactly **one** Death roll using `failureDeathChance`
5. if that roll hits `rolledDeathChance`, the ordinary Outcome becomes `사망`; if it hits only the removed band, the Outcome becomes 중상 / 부상 (§Preparation / Level Death reduction)
6. if it misses, continue/retain the existing non-Death failure resolution into `퇴각 / 부상 / 중상` as applicable
7. do not perform another Death roll inside escape/injury/severe handling

The failure Death roll is **not** additionally gated behind a separate failed-escape requirement.
A failed expedition can become fatal once; a successful expedition does not receive a separate fatality lottery.

Existing Insurance conversion / Aftercare ordering remains owned by `ITEM_v2.8.0.md` and is not duplicated here.

### Pre-supply player-facing failure Death risk

SALE exposes one exact pre-supply **`실패 시 사망 위험` %** snapshot before any new Item transaction for that customer.

That displayed value:
- uses the NPC/Gate/Condition state at SALE entry
- includes existing departure Injury if present
- uses no newly committed Item from the current customer visit
- is shown together with the pre-supply qualitative Combat Forecast / Hazard Readiness
- means the conditional chance that an ordinary failed expedition escalates to Death
- is **not** presented as the unconditional chance that this expedition ends in Death
- remains frozen after the Player commits Item purchases

The actual expedition still recalculates `failureDeathChance` internally from the final prepared state after committed Items/Supply/Fatigue effects.
Do not update the displayed `실패 시 사망 위험` to reveal the post-supply answer.

Exact presentation/copy -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md` / `COPY_AUDIT_APPROVED_v2.8.0.md`.

## INJURED RE-EXPEDITION SEVERE ESCALATION

When an NPC **began** the expedition at `injury=1`, the existing non-Death Severe-vs-Injury branch, whenever that branch is reached on a surviving failure path, receives:

```text
Severe Injury transition chance +15%p
```

Rules:
- apply to the same Severe-vs-ordinary Injury decision point already used by the ordinary resolution
- do not create a second independent Severe roll
- apply the +15%p before the normal clamp used by that branch
- the ordinary Injury Stat penalty itself is owned by `NPC_TRAIT_v2.8.0.md`

This modifier is about the danger of sending an already-wounded adventurer back out, not about making the four visible Stats secretly lower than their listed Injury penalty.

## RETREAT HEALING

An adventurer who began the expedition at `injury=1` and whose Outcome is `퇴각` is healed (injury → 0) with chance

```text
healChance = min(1, 0.25 × (1 + k))        → 25% · 50% · 75% · 100%
k = the unbroken run of this adventurer's immediately preceding expeditions that also began at injury=1 and ended 퇴각
```

- any other preceding expedition ends the run — in practice a `부상` / `중상` result resets it to 0 (an injured departure that
  succeeds is already healed by the ordinary Injury step)
- independent of 구급키트; one draw, only on this path
- the Night report says the adventurer recovered with one line; the chance is never shown; exact copy ->
  `COPY_AUDIT_APPROVED_v2.8.0.md`

## BAD-LUCK PREPARATION ASSIST (hidden)

A hidden correction kept minimal. Within one Night's ordinary expeditions, in resolution order:

- count only expeditions that carried 1+ Item; a bare-handed expedition neither counts nor breaks the chain
- a carried expedition that ends anything but `성공` / `대성공` adds 1 to the chain; a `성공` / `대성공` resets it to 0
- when the chain is 3 or more, the next carried expedition resolves with a preparation assist
  `assist = 0.10 + 0.05 × (chain − 3)`: prepared ability × (1 + assist) for the combat check and
  environmentIncidentChance × (1 − assist)
- Deep expeditions and the Final are excluded (neither counted nor assisted)
- never shown to the Player; no forecast, SALE or Night surface reads it

## GREAT SUCCESS / DEEP EXPEDITION

### GREAT SUCCESS — OVER-PREPARATION

Great Success is an upper result the Player can intentionally chase by stronger preparation.

Resolution:
1. resolve the ordinary expedition first **without assigning Great Success**
2. complete the existing combat/environment/injury/escape resolution
3. only a final ordinary outcome of `성공` is eligible to upgrade to `대성공`
4. Great Success chance uses the margin between:
   - the NPC's prepared Combat ability before hidden combat-variance/noise
   - Gate required Combat Power
5. larger positive preparation margin -> higher Great Success chance
6. make a separate Great Success roll only for an eligible ordinary Success
7. Great Success remains probabilistic and no preparation state guarantees it

This means `대성공` does not coexist with `부상/중상/퇴각/사망`.
A lucky combat-noise roll by itself must not be treated as extra preparation.

Do not create: Great-Success-only Stat, master readiness score, new hidden Hazard aggregate, second expedition-resolution system.

Hazard / Supply / Insurance / Trait rules remain in their existing systems.
Great Success uses Combat-Power margin after ordinary Success qualification.

When the Player-facing Great Success opportunity threshold is met, presentation must explicitly signal the opportunity.
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`. Presentation -> `UI_UX_v2.8.0.md`.
Signal threshold must match the actual calculation.

Margin formula:

    marginRatio
    = (prepared Combat ability - Gate required Power)
      / Gate required Power

Exact values:

    signalMargin = 0.26
    chanceSlope  = 0.80
    chanceCap    = 0.30

Thus:

    Great Success chance
    = min(0.30, max(0, marginRatio × 0.80))

The signal threshold does not gate the roll; it only controls when the Player sees the qualitative signal.

The intended positive loop:
    stronger prepared NPC
    -> larger positive margin
    -> higher Great Success chance
    -> faster NPC growth

Do not lower this probability merely because a skilled Run produces repeated Great Success.
Economic reinforcement is controlled separately by ECONOMY_ORDER_v2.8.0.md.

SALE owns when the signal is recomputed.
The signal remains qualitative; exact probability stays hidden.

### DEEP EXPEDITION / 심층원정

Identity: redirect one actual visiting NPC into a deeper version of one of today's existing Gates.

Not: new Phase, second expedition, new Family, T4, two-roll expedition, separate combat subsystem.

Occurrence windows: D7 / D14 / D21 / D28.

Each Run:
- exactly 2 or 3 occurrences: probability of 3 occurrences = 50%, probability of 2 occurrences = 50%
- at least 1 from D7/D14
- at least 1 from D21/D28
- Run-seeded / persisted
- no Save/Load reroll
- future occurrence dates hidden

On an actual Deep Expedition Day, Normal Daily Event does not occur.
Event exclusion owner -> `EVENT_v2.8.0.md`.

Base Gate:
1. use today's already-generated actual Gates
2. find highest Tier present
3. choose one of those highest-Tier Gates
4. ties use deterministic Run-seeded selection

Keep: Family, Tier, Hazard set, ordinary Item / Supply / Trait interaction.

Only difficulty-axis change:
**required Combat Power increases through a multiplier on the selected base Gate Power.**

Difficulty:
    deepRequiredPower = baseGateRequiredPower × 1.50

Do not use a separate additive curve or Day/Tier-specific Deep formula.
Do not inflate Hazard magnitude/count to manufacture difficulty.

Forecast uses the raised Deep Combat requirement but does not expose exact hidden Power, exact Success %, exact Great
Success % or the internal margin formula.

Before Order commitment, Player can identify:
- Deep Expedition exists today
- base Gate / Family / Tier / known Hazard
- exact sponsorship Gold cost
- success benefits NPC Growth / Wallet
- participation is optional

NPC nomination flow -> `SALE_v2.8.0.md`.

The nominated NPC undertakes exactly one expedition.
Deep Expedition replaces that NPC's ordinary destination for the Day.
No second segment / second roll / second result.

Deep Expedition Store Gold reward is always 0.
NPC bonus reward remains owned by NPC_TRAIT_v2.8.0.md.
Sponsorship cost -> `ECONOMY_ORDER_v2.8.0.md`.
Normal Great Success Store Gold -> `ECONOMY_ORDER_v2.8.0.md`.

## RESULT-PROOF COUNTERFACTUAL — PURPOSE

NIGHT may make a strong Item-causality statement only when the actual resolved expedition evidence
proves that removing the Item would have produced a meaningfully worse result/state.

This is proof/presentation logic. It does not change the actual expedition outcome.

## ACTUAL RESOLUTION FIRST

The real expedition resolves exactly once under ordinary canonical rules.

Do not:
- reorder gameplay so Field Gear resolves before Food
- give one category narrative priority
- reroll the expedition for attribution
- consume extra gameplay RNG for proof
- mutate NPC/Run/economy state in a proof comparison

## RANDOM EVIDENCE

The actual resolve records the semantic random evidence it really used, including the existing
combat/environment/escape/injury/death/Great-Success decisions and any optional branch roll that
was actually drawn.

A shadow comparison may reuse only actual recorded evidence.

If removing an Item causes a counterfactual path to require a random decision that the actual
expedition never drew, that comparison is:

    UNPROVEN

No replacement roll is invented.
No same-seed full rerun is used because branch-dependent RNG consumption is not guaranteed to be
the same path.

Under-reporting is preferred to false causality.

## SHADOW SET — NORMAL BAG

For actual Bag A+B, evaluate only what is needed:

    actual A+B
    without A
    without B
    without A and B, only when needed to distinguish shared/redundant contribution

Special 황금 1+1 쿠폰 participates in the same proof boundary when its duplication changed the
resolved preparation.

## OUTCOME ORDER FOR PROOF

For attribution comparison only:

    대성공 > 성공 > 퇴각 > 부상 > 중상 > 사망

If removal moves the result downward in this order, that is a proven Outcome contribution.

Persistent Injury Aftercare and existing Insurance conversions may also be proven state
contributions even when the text Outcome itself is unchanged, exactly as their Item owner defines.

Fatigue-only or Wallet-only changes are not promoted to Hero Item Outcome feedback.
They remain visible in their own result rows.

## OVERLAP ATTRIBUTION

If removing A worsens the result and removing B does not:
- credit A

If removing either A or B independently worsens the same meaningful result:
- credit A and B together

If neither individual removal worsens the result but removing both does:
- do not invent individual ownership
- use generic committed-preparation attribution

If proven changes differ in severity:
- show the strongest single Hero feedback line rather than stacking several heroic claims

No automatic Field Gear > Food priority exists.

## BALANCE TARGET

By Day band track: Family appearance, Tier, Gate count, Hazard incidents, Counter availability, Item usage, success,
retreat, injury, death.

Reject outcomes where:
- one Family is always easiest/hardest
- one mandatory Item dominates a Family
- one Job acts as a key
- T3 requires 3 mandatory prep slots
- proper Counter feels meaningless
- RNG erases NPC growth

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### FAMILY / HAZARD IDENTITY

#### DUN-Q01 — FAMILY IDENTITIES

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

#### DUN-Q02 — STAT MAPPING

SETUP:
Inspect hazard contributions.

EXPECT:
- poison -> 강인함
- bind -> 기동
- corrosion -> 강인함
- mire -> 기동
- fire -> 정신
- fear -> 정신
- dark -> 기동
- cold -> 강인함
- whiteout -> 정신

PASS:
Player-facing stat roles match actual resolution.

#### DUN-Q03 — SPIRIT RELEVANCE

SETUP:
Play Crypt and Snow content.

EXPECT:
정신 matters meaningfully in both.

PASS:
Spirit is not a one-Family stat.

#### DUN-Q04 — FAMILY HAZARD BOUNDARIES

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
- no Supply Burden Gate modifier or required Supply exists; Food/Drink Supply is Fatigue recovery only
- Fire second axis is higher Dungeon Combat Power, not a separate Hazard

PASS:
No contradictory extra hazard layer or dead key affects resolution.

#### DUN-Q19 — NONCANONICAL KEY ISOLATION

SETUP:
Search runtime resolution paths for wet/armor/undead/long/thirst and Job-specific hazard keys.

EXPECT:
None changes expedition resolution as an independent Hazard or hidden Job solution.

PASS:
Only canonical Hazard systems and Supply -> Fatigue recovery affect gameplay.

#### DUN-Q21 — HAZARD EXPLANATION CONSISTENCY

SETUP:
Inspect all 9 canonical Hazards in Gate/preparation UI on desktop and touch/mobile.

EXPECT:
Every Hazard exposes the numbered short row, the same on every surface:
- MORNING plate, SALE destination plate, D25 scouting report and FINAL rows read `<Hazard> · 대응 <N> 필요 · <Stat> <n>당 대응 1 제공` with N = ceil(Hazard Threat) of that Gate (the Final: Day 30 / T2 -> 29) and n = 3 (강인함: poison / corrosion / cold · 기동: bind / mire / dark · 정신: fear / whiteout / fire)
- Gate detail alone uses the full sentence `<Hazard> — 대응 <N> 필요 · <Stat> <n>당 대응 1 제공 · <Hazard> 대응 상품이 막는다`
- no `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` label row and no destination-plate `?` help survive
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

#### DUN-Q-v29-2 — ONE NON-투력 STAT PER HAZARD (3 / 3 / 3, NO GATE SHARES A STAT)

Controlled prepared states: vary one Core Stat at a time and read each Hazard's Defense.

EXPECT:
- 독 / 냉기 / 부식 Defense moves only with 강인함 (×1/4)
- 속박 / 진창 / 어둠 Defense moves only with 기동 (×1/3)
- 공포 / 화이트아웃 / 화염 Defense moves only with 정신 (×1/3)
- no Hazard Defense moves with 투력
- no Hazard reads a second Core Stat (no 정신 + 기동 split for 어둠 / 화이트아웃, no 강인함 for 화염)
- every Family Tier Hazard set presses two different Stats (독거미 강인함 + 기동, 슬라임 강인함 + 기동, 설원 강인함 + 정신, 지하묘지 정신 + 기동), so no Gate is answered by one Stat

PASS:
- 강인함 3 · 기동 3 · 정신 3 Hazards, 투력 never pressed, no Gate's Hazard set sharing a Stat
- Counter keys, Item Counter values, readiness labels 충분 / 대응 / 불안 / 취약 and thresholds are unchanged
- pressure label shown per Hazard matches the Stat that actually moves its Defense

#### DUN-Q16 — FINAL FAMILY DATA OWNERSHIP

SETUP:
Use a Final Expedition that selects canonical Dungeon Families.

EXPECT:
Final reads each selected Family's existing T2 Hazard definition from `DUNGEON_HAZARD_v2.8.0.md`.
No alternate/duplicated Final-only Family Hazard table exists here.

PASS:
Dungeon Family data has one owner.
Detailed Final combination/power/clear QA -> `FINAL_EXPEDITION_v2.8.0.md`.

### GATE COUNT / TIER GENERATION

#### DUN-Q12 — FAMILY INTRODUCTION

SETUP:
Run multiple seeds.

EXPECT:
Start with ~3/5 Families.
Additional Families enter within canonical early/mid windows.

PASS:
Early mix varies across runs without late impossible surprise.

#### DUN-Q13 — TIER DAY PROGRESSION

SETUP:
Sample generated days across bands.

EXPECT:
Higher Tier availability/weight rises over Run.

PASS:
No impossible early T3 and no flat same-difficulty run.

#### DUN-Q14 — INTRA-BAND CURVE

SETUP:
Compare early vs late days inside same band.

EXPECT:
Higher-tier weight gradually increases.

PASS:
Day13 and Day18 are not necessarily identical distributions.

#### DUN-Q15 — MULTI-GATE VARIETY

SETUP:
Generate multi-Gate days.

EXPECT:
Distinct Families preferred where practical.

PASS:
Repeated identical prep demand is not dominant unless intentional.

#### DI-Q-v28-12 — GATE COUNT / TIER DISTRIBUTION EXACT

Gate count PASS:
- D1–3 exactly 1
- D4–7 1/2 at 50% / 50%
- D8–18 exactly 2
- D19–24 3 at 70%, otherwise 2
- D25–29 exactly 3, no draw
- D30 does not run ordinary Gate-count generation

Tier PASS:
- exact anchor rows equal DUNGEON_HAZARD_v2.8.0.md
- all in-between Days use linear interpolation between surrounding anchors
- DAY 21~29 then move 0.10 of T2 to T3 (D24 10 / 50 / 40 · D29 0 / 35 / 65); no other Day shifts
- D30 does not run ordinary Tier generation
- no player-facing next-Day forecast exists

FAIL:
- a forecast-only probability table
- a different Save/Load forecast roll
- any alternate approximate band percentages acting as exact truth

### PREPARED POWER / GATE POWER / HAZARD THREAT / FORECAST

#### DUN-Q70 — PREPARED POWER WEIGHTS

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

#### DUN-Q-v27-GATE-SLOPE — LATE-DAY GATE POWER

Owner rule: §GATE POWER — LATE-DAY SLOPE.

PASS:
- the Day term is `min(Day, 9) × 1.45 + max(0, min(Day, 10) - 9) × 0.80 + max(0, min(Day, 20) - 10) × 1.10 + max(0, Day - 20) × 1.10`
- the base constant, Tier term, Family adjustment and Family Combat multiplier are unchanged
- the Day term reads D9 13.05, D10 13.85, D12 16.05, D18 22.65, D20 24.85, D24 29.25, D29 34.75
- SuccessEase multiplies the whole ordinary Gate Power once: 1.00 on DAY 1~7, 0.90 on DAY 8~21, 0.95 from DAY 22

FAIL:
- a single slope applied across all Days
- an early-Day Gate Power that moved
- the slope implemented as a post-hoc multiplier on the finished Gate Power rather than on the
  Day term

#### DUN-Q71 — HAZARD THREAT CURVE

EXPECT:
```text
Threat = 12 + Day*.35 + LateTerm + (Tier-1)*6, LateTerm = max(0, Day-7)*.45 (ordinary Gates; 0 for the Final); no Stat-group factor
```

Exact anchors (every Hazard):
- D1 T1 = 12.35
- D7 T1 = 14.45
- D12 T1 = 18.45
- D18 T2 = 29.25
- D24 T2 = 34.05
- D29 T3 = 44.05
- D30 T2 = 38.85 (ordinary formula); the Final (Day 30 / T2) = 28.50

PASS: runtime threat matches.

#### DI-Q-v28-13 — FORECAST / HAZARD LABEL BOUNDARIES

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

### TIER PREPARATION / COUNTER ROUTES

#### DUN-Q05 — T1 LEARNING / GROWTH OVERRIDE

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

#### DUN-Q06 — T2 JUDGMENT ROUTE

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

#### DUN-Q07 — T3 SLOT CONTRACT

SETUP:
Test all Family T3 variants with appropriately grown NPCs.

EXPECT:
Viable clear route exists within <=2 meaningful required prep slots.

#### DUN-Q72 — TIER PREPARATION TARGET

Representative neutral-fit NPCs:
- T1 lower/basic response can reach 충분; hybrid commonly slightly short
- T2 upper/main specialist can reach 충분; lower remains useful but commonly short
- T3 upper alone commonly 대응/slightly short; upper + secondary/natural/trait/hybrid can reach 충분

PASS:
- strong natural Stat/growth can reduce Item needs
- weak-fit NPC may need more
- no viable route requires a third normal Bag slot
- drawing one exact Epic SKU is never required for a viable T3 route

#### DUN-Q08 — DIRECT VS HYBRID

SETUP:
Compare specialist Direct vs multi-hazard Hybrid.

EXPECT:
Direct is more reliable on its specific target.
Hybrid is more flexible across uncertainty.

PASS:
Hybrid is not strict superior to a specialist of the same or a higher Rarity (an Epic hybrid may
exceed a Common Main — 속박 / 어둠 +18 over 경량 로프 / 랜턴 건전지 +16).

#### DUN-Q09 — NO SINGLE ITEM FAMILY DELETE

SETUP:
Test strongest relevant item in each Family.

EXPECT:
One item cannot erase entire Family challenge.

PASS:
Stats/secondary pressure/insurance decisions remain relevant.

#### DUN-Q10 — RESIDUAL RISK

SETUP:
Use proper Direct Counter repeatedly.

EXPECT:
- T1/T2 very reliable
- T3 may retain small residual risk
- no item-specific hidden defect RNG

PASS:
Risk comes from canonical expedition resolution.

#### DUN-Q18 — HAZARD ROUTE COVERAGE

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

#### DUN-Q20 — PREPARATION NECESSITY / NAKED RUN

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

### SUPPLY / FATIGUE

#### DUN-Q73 — FATIGUE OUTCOME TABLE

EXPECT base result Fatigue:
```text
성공 +4
대성공 +4
퇴각 +7
부상 +9
중상 0
사망 0
```

PASS: exact table before Trait/Supply modifications.

#### DUN-Q74 — FATIGUE PENALTY

EXPECT five bands on the 0~40 scale:
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

#### DUN-Q75 — SUPPLY ORDER / OUTCOME BUFFER

Controlled cases must verify exact order:
1. Supply reduces current Fatigue 1:1 before departure (`preRecovery`)
2. remaining Supply then reduces actual outcome Fatigue 1:1
3. unused remainder is discarded
4. no morning changes Fatigue, a Severe-Injury rest day included

PASS:
- `preparedSupply`, `preRecovery`, `fatigueBeforeExpedition`, `remainingSupplyBuffer`, `rawOutcomeFatigueGain`, `outcomeBufferUsed`, `actualOutcomeFatigueGain`, `finalFatigue`, `netFatigueDelta` match the current owner arithmetic
- no `requiredSupply` / `excessSupply` field or Supply payment step exists
- no duplicate `postOutcomeFatigueGain` truth is used for the same result
- no Supply Power/success/Loot/Hazard bonus
- no next-expedition buffer persistence
- no morning natural recovery
- 중상 and Death raw outcome Fatigue remain 0 (§FATIGUE OUTCOME BASELINE)

#### DUN-Q-v29-1 — FATIGUE BANDS / NO REST RECOVERY

Controlled NPCs at departure Fatigue 9 / 10 / 19 / 20 / 29 / 30 / 39 / 40, then a Severe-Injury recovery period.

EXPECT:
- 9 -> 정상, no penalty; 10 and 19 -> 지침 -15% 기동/정신; 20 and 29 -> 과로 -40% 기동/정신
- 30 and 39 -> 소진 -40% 기동/정신 and -20% 투력/강인함
- 40 -> 탈진 -40% on all four Core Stats and `실패 시 사망 위험` +10%p over the same state at 39
- a 성공 at 36 with no Supply ends at 40, not 41 (clamp)
- Supply 3 at current Fatigue 22 departs at 19 (지침), not 22 (과로): the band is judged after preRecovery
- no morning changes Fatigue, a Severe-Injury rest day included
- NIGHT main line names the band from 20 up (`귀환 후 피로 22 · 과로`); 정상 / 지침 are not named

PASS:
- five bands, 0~40, applied to NPC Base+Equipment-side Stats only
- no rest recovery exists; Fatigue falls only through Food/Drink

#### DUN-Q-v29-3 — REPEATED-STRAIN DEATH ESCALATION

Controlled adventurer records: 1 / 2 / 3 / 5 consecutive expeditions begun at injury=1 ending in this injured departure, the same
chain broken once by a healthy departure, and a Fatigue 20+ departure chain.

EXPECT:
- the first injured departure adds nothing beyond the existing injured term
- every further CONSECUTIVE injured departure adds +8%p to the conditional failure Death chance and to its cap, capped at +30%p
- one healthy departure resets the chain; Fatigue 20+ departures add nothing to this term
- the count comes from the adventurer's own records (this departure included); no new NPC field
- NPC detail shows `연속 부상 출발 {n}회` (the current chain of consecutive injured departures; 0 after a healthy one) as an information row, no verdict

PASS:
- strainEscalation equals min(0.30, 0.08·max(0,c−1)) exactly, c = consecutive injured departures (0 when healthy)

#### DI-Q-v28-4 — NO HYPOTHETICAL FATIGUE MATRIX

SALE must not display separate 성공/퇴각/부상 future Fatigue rows.
SALE shows no Fatigue arithmetic line: the counter tray lists a Food/Drink's own `피로 회복` row only; no `피로 {A} → 출발 {B}`, no always-on Fatigue line and no `보급 회복` / `보급 부족` / `남은 보급` tail.

Supply/Fatigue runtime arithmetic follows the current owner truth.

### ORDINARY RESOLVE / DEATH / INJURY / CAUSALITY

#### DI-Q-v28-14 — ORDINARY RESOLVE / REWARD BASELINE

Controlled seeded cases must verify (no Supply-deficit row):
- environment incident chance uses the exact closure formula and 2%–60% clamp
- escape chance uses the exact closure formula and 15%–94% clamp
- failed-combat Severe branch uses 36% base before current modifiers
- environment/other Severe branch uses 11% base before current modifiers
- injured departure adds the existing +15%p Severe escalation exactly once
- failure-conditioned Death still follows the separate current Death owner formula exactly once

Reward PASS:
- EXP base = 26.4 + Day×5.52
- EXP outcome multipliers are Great 1.00 / Retreat 0.38 / combat-success 0.90 / other living 0.50
- Wallet base = 35 + Day×8
- Wallet outcome multipliers are 대성공 / 성공 1.50 / 퇴각 0.40 / 부상 0.25 / 중상 0.15 / 사망 0
- explicit XP/Loot/Gate reward modifiers compose once
- living combat-success equipment chance starts at 20% plus explicit rare-loot modifier
- equipment gain on hit is seeded integer +2 through +5

FAIL:
- a second alternative ordinary-resolve formula survives
- QA retunes any value to improve pass rate

#### DUN-Q-v29-BC1 — 만반의 준비 / LEVEL DEATH REDUCTION

Owner rule: §Preparation / Level Death reduction.

Controlled failed expeditions at Lv1 / Lv2 / Lv10 / Lv20, each with and without 만반의 준비 (healthy, Fatigue < 20, 2+ Items),
and the three near misses (injured / Fatigue 20 / one Item).

PASS:
- rolledDeathChance = failureDeathChance × preparedFactor exactly; preparedFactor 0.80 (0.60 with 구급품 진열장) only when all three hold
- Level never changes the Death roll or the SALE snapshot: Lv1 / Lv2 / Lv10 / Lv20 read the same chance
- a roll in the removed band ends 중상 (flat 0.36) or 부상, never 사망; still exactly one Death roll
- the SALE `실패 시 사망 위험` never includes preparedFactor
- the Night report shows the 만반의 준비 save line once, only when the band was hit

#### DUN-Q-v29-BC2 — RETREAT HEALING

Owner rule: §RETREAT HEALING.

PASS:
- only an injured departure ending 퇴각 can heal; chance 25% / 50% / 75% / 100% for 0 / 1 / 2 / 3+ preceding consecutive injured 퇴각
- a 부상 / 중상 result resets the chain; 구급키트 does not change the chance
- one extra draw only on this path; the Night line appears only on a heal and never shows the chance

#### DUN-Q-v29-BC3 — HIDDEN BAD-LUCK ASSIST

Owner rule: §BAD-LUCK PREPARATION ASSIST (hidden).

Controlled Night queues: 3 / 4 / 5 carried failures in a row, a bare-handed expedition inside the chain, a success inside the
chain, a Deep expedition inside the chain.

PASS:
- no assist before the chain reaches 3; then assist 0.10 and +0.05 per further failure
- the assist multiplies prepared ability for the combat check by (1 + assist) and environmentIncidentChance by (1 − assist)
- bare-handed expeditions neither count nor reset; a success resets; Deep and Final are neither counted nor assisted
- no screen, forecast or report shows it

#### DUN-Q77 — ORDINARY FAILURE DEATH BASELINE

Controlled prepared states with known Combat and Hazard deficits.

EXPECT:

```text
CombatDeficit
= clamp((requiredCombatPower - effectivePreparedPower) / requiredCombatPower, 0, 1)

CombatDeathContribution
= CombatDeficit * 0.40

HazardDeficit_i
= clamp((HazardThreat_i - HazardDefense_i) / HazardThreat_i, 0, 1)

EnvironmentDeficit
= average(HazardDeficit_i)

EnvironmentDeathContribution
= EnvironmentDeficit * 0.20

healthyFailureDeathChance
= clamp(
    CombatDeathContribution + EnvironmentDeathContribution,
    0.00,
    0.50
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
- healthy conditional cap is exactly 50%
- an expedition that resolves as `성공 / 대성공` performs zero Death rolls
- an expedition that enters the ordinary failure path performs exactly one Death roll
- that failure Death roll is not additionally gated behind a separate failed-escape requirement
- no second Death roll survives inside escape/injury/severe handling
- a 0% `실패 시 사망 위험` does not imply guaranteed Success
- the displayed percentage is not treated as unconditional whole-expedition Death probability

#### DUN-Q78 — INJURED RE-EXPEDITION RISK / PRE-SUPPLY DISCLOSURE

Controlled identical NPC/Gate state except departure Injury state.

EXPECT when departure `injury=1`:
- ordinary visible Injury Stat penalty remains 투력 -15% / 강인함 -20%
- failure Death chance adds +10%p to the healthy conditional formula and caps at 60%
- Severe Injury transition chance adds +15%p at the existing Severe-vs-Injury branch
- departure at Fatigue 40 (탈진, judged on `fatigueBeforeExpedition`) adds the same +10%p failure-Death term and raises the cap the same way; injured and Fatigue-40 together cap at 70%
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
- healthy conditional cap is 50%
- injured conditional cap is 60%
- exact pre-supply `실패 시 사망 위험` is player-visible while the post-supply actual conditional probability remains hidden

#### DUN-Q79 — ORDINARY INJURY NATURAL RECOVERY

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

#### DUN-Q11 — CAUSALITY

SETUP:
Block one hazard but fail due to another/combat.

EXPECT:
Result copy names actual cause.

PASS:
Blocked hazard is not falsely blamed.

### GREAT SUCCESS / DEEP EXPEDITION

#### GREAT SUCCESS
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

#### DI-Q-v28-10 — GREAT SUCCESS NUMERIC BASELINE

Expected:
    signal margin 0.26
    chance slope 0.80
    chance cap 0.30

PASS:
- small positive margin may produce Great Success even below the signal threshold
- signal threshold only controls presentation
- probability never exceeds 30%
- repeated Great Success by a well-grown NPC is not itself a failure

#### DEEP SCHEDULE
PASS:
- only D7/D14/D21/D28 candidate windows
- exactly 2 or 3 actual occurrences
- at least one D7/D14
- at least one D21/D28
- Save/Load does not reroll

#### DI-Q-v28-11 — DEEP OCCURRENCE / DIFFICULTY BASELINE

Expected:
- occurrence windows remain D7 / D14 / D21 / D28
- each Run has exactly 2 or 3 occurrences
- P(3 occurrences) = 50%
- P(2 occurrences) = 50%
- Deep required Combat Power = selected base Gate Power ×1.50
- no Deep Hazard inflation is added

#### DEEP GATE
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

#### EVENT EXCLUSION
PASS:
- actual Deep Day produces no Normal Event
- Deep is not selected from Event catalog
- no automatic 35% chance compensation

### SIMULATION / BALANCE QA

#### SIM-Q01 — COMBAT VARIANCE

SETUP:
Run full-run simulations/playtests with canonical baseNoise ±17.5%.

EXPECT:
Borderline outcomes can swing.
Strong invested NPC remains trustworthy.
The hidden exact variance is not exposed to the Player or encoded as a knowledge-check Trait.

PASS:
±17.5% is used as the baseline and any later retune is supported by outcome evidence.

#### SIM-Q02 — ROLE USAGE

SETUP:
Full-run simulation/playtest.

EXPECT:
Supply, Direct, Hybrid, Stat, Insurance, RiskReward and explicit Utility all receive meaningful use where applicable.

PASS:
No role is effectively dead or always mandatory.

#### SIM-Q70 — THREE PREPARATION AXES

Full-run simulation/playtest must demonstrate that common rational Bag decisions can trade among:
- direct combat/stat preparation
- Hazard response
- Fatigue/Condition management

PASS direction:
no one axis is universally ignorable or universally mandatory.

#### SIM-Q71 — ITEM / GROWTH HIERARCHY

Track Item direct contribution against NPC Level/Growth/Equipment.

PASS direction:
- NPC growth remains the main long-term body of strength
- one appropriate Item can change an expedition decision
- late-game Stat Items are not decorative dead picks
- generic Potion is not the universal best answer over Counter/Food choices
- Epic improves slot efficiency but does not become mandatory for T3 viability

#### SIM-Q72 — REQUIRED METRICS

Record at minimum:
- Job × Level × Family × Tier outcomes
- four-Stat/equipment distribution
- departure Fatigue distribution and time at 10+/20+/30+/40
- Food/Drink pick rate by current Fatigue
- Supply use split: preRecovery / outcomeBuffer / waste
- Potion tier offer/order/sale/use
- Counter lower/upper/hybrid use
- Epic offer/order/sale/use by Day band and category
- healthy vs injured re-expedition outcome distribution
- healthy vs injured expedition Death/Severe rates by CombatDeficit and EnvironmentDeficit band
- Item dead-pick / universal-best rates

## RELATED

item counters -> `ITEM_v2.8.0.md`
job/stat coverage -> `NPC_TRAIT_v2.8.0.md`
order/tier forecast -> `ECONOMY_ORDER_v2.8.0.md`
forecast UI -> `UI_UX_v2.8.0.md`
night causality -> `NIGHT_CLOSING_v2.8.0.md`
final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
boss modifier -> `BOSS_v2.8.0.md`
Item Supply/Counter/Epic preparation -> `ITEM_v2.8.0.md`
Injury persistence/re-expedition state -> `NPC_TRAIT_v2.8.0.md`
Fatigue Trait -> `NPC_TRAIT_v2.8.0.md`
Sale preview -> `SALE_v2.8.0.md`
Night resolved fields -> `NIGHT_CLOSING_v2.8.0.md`
Next-day forecast presentation -> `ECONOMY_ORDER_v2.8.0.md`
Final Hazard aggregation -> `FINAL_EXPEDITION_v2.8.0.md`
