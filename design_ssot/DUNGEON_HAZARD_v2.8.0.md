# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,forecast,counter,prepared_power,supply,fatigue,death,death_risk,great_success,result_proof,counterfactual
DOC_VERSION=2.9.3
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/DUNGEON_HAZARD_v2.8.0-patch.md,history/DUNGEON_HAZARD_v2.7.0.md,history/DUNGEON_HAZARD_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/DUNGEON_HAZARD.md

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

fire -> 기동 (User 2026-09-24, v2.9.0)
secondAxis=higher Dungeon Combat Power
secondAxisIsHazard=NO

T1=fire
T2=fire + increasedCombatPower
T3=strong(fire) + highCombatPower

Gate required Combat Power carries a Family factor `fireCombat=0.90`.
Fire has no special occurrence weighting: Families are drawn uniformly.

armorHazard=NO

### CRYPT — 망자역
theme=[fear,dark]
familyTag=undead

fear -> 정신
dark -> 정신 (User 2026-09-24, v2.9.0)

T1=fear
T2=fear+dark
T3=strong(fear)+strong(dark)

undeadHazard=NO
jobKeySolution=NO

canonicalHazardKeysOnly=YES

### SNOW — 설원
theme=[cold,whiteout]

cold -> 강인함
whiteout -> 정신 (User 2026-09-24, v2.9.0)

T1=cold
T2=cold+whiteout
T3=strong(cold)+strong(whiteout)

## HAZARD PLAYER-FACING PRESSURE

Every canonical Hazard exposes a consistent short explanation
of what core Stat/readiness it pressures.

One non-투력 Stat per Hazard, 3 / 3 / 3 (User 2026-09-24 revision 5, v2.9.0: 어둠 -> 기동 and 화염 -> 정신, so that no Gate's Hazards share one Stat):
- 강인함: 독 · 냉기 · 부식
- 기동: 속박 · 진창 · 어둠
- 정신: 공포 · 화이트아웃 · 화염
- 투력 is never a Hazard-pressured Stat (it already carries the largest combat coefficient).
- Gate constraint: within one Gate (a Family's Tier Hazard set) no two Hazards press the same Stat, so one Stat never answers a whole Gate (망자역 지하묘지 = 정신 + 기동). The Final's merged two-Family pool may repeat a Stat.

Pressure labels are retired (User 2026-09-24 revision 2, v2.9.0): `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` no longer appear anywhere, and the older `강인함 압박` / `기동 압박` / `정신 압박` / `정신 중심 + 기동 보조 압박` stay retired. Every player-facing Hazard row is the numbered short row below.

Full Hazard sentence (Gate detail only; the Gate-level requirement number first):
- `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다` — N = the Counter that alone reaches 충분 on that Gate that Day (`ceil(Hazard Threat)`); n = 3 for 강인함 (×1/3), 2 for 기동 / 정신 (×1/2) — integer conversions, each rounded in the player's favour from the earlier ×0.30 / ×0.40 (User 2026-09-24 revision 4, v2.9.0)
- e.g. `독 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 독 대응 상품이 막는다` (DAY 1 T1)
- e.g. `냉기 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다` (DAY 1 T1)
- e.g. `부식 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 부식 대응 상품이 막는다` (DAY 1 T1)
- e.g. `속박 — 대응 13 필요 · 기동 2당 대응 1 제공 · 속박 대응 상품이 막는다` (DAY 1 T1)
- e.g. `진창 — 대응 13 필요 · 기동 2당 대응 1 제공 · 진창 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화염 — 대응 13 필요 · 정신 2당 대응 1 제공 · 화염 대응 상품이 막는다` (DAY 1 T1)
- e.g. `공포 — 대응 13 필요 · 정신 2당 대응 1 제공 · 공포 대응 상품이 막는다` (DAY 1 T1)
- e.g. `어둠 — 대응 13 필요 · 기동 2당 대응 1 제공 · 어둠 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화이트아웃 — 대응 13 필요 · 정신 2당 대응 1 제공 · 화이트아웃 대응 상품이 막는다` (DAY 1 T1)
Short row (every other Hazard row — MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL 확인된 위협; the number first): `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`. N is that Gate's own Day / Tier (the Final: Day 30 / T2 -> 29). No label row and no per-customer remaining need survive (User 2026-09-24 revision 2, v2.9.0). The short row renders as two lines on a phone — `대응 {N} 필요` (body size) over the smaller sub-line `{능력치} {n}당 대응 1 제공` — and as one ` · ` line where the width allows (900px+) (User 2026-09-25, v2.9.0).

The destination-plate help (`?`) is retired: the numbered row carries the detail itself (User 2026-09-24 revision 2, v2.9.0).

Rules:
- explanatory information only; exact success formula stays hidden
- all 9 canonical Hazards follow the same presentation contract
- `slow` is not shown as a separate Hazard
- SLIME secondary player-facing Hazard is `진창`
- do not explain only some Hazards while leaving others name-only

Interaction ownership:
-> `UI_UX_v2.8.0.md`

## GLOBAL PRESSURES

### FATIGUE
type=persistentNPCCondition
familyHazard=NO

sources may include:
- repeated expedition
- event
- injury/condition effects

recovery (User 2026-09-24, v2.9.0):
- Food/Drink Supply: each point reduces Fatigue by 1 -> §SUPPLY -> FATIGUE
- no rest recovery: a Severe-Injury recovery day does not change Fatigue (User 2026-09-25, v2.9.0)

- 아침 자연 회복(-2/일) 삭제.

## FATIGUE OUTCOME BASELINE

(User 2026-09-24, v2.9.0)

```text
성공      +4
대성공    +4
퇴각      +7
부상      +9
중상       0
사망       0
```

Re-tuned -1 from the first v2.9.0 table (+5 / +5 / +8 / +10) after the I-2 re-measure (User 2026-09-24, v2.9.0).

Trait result modifiers and their outcome scope -> `NPC_TRAIT_v2.8.0.md`.

Severe Injury and Death are final result-Fatigue gain 0 and a Trait may not raise them; a Severe Injury already costs the adventurer rest days, and its rest day recovers no Fatigue (User 2026-09-25, v2.9.1 balance).

## FATIGUE STAT PENALTY

Fatigue scale 0~40 (max / clamp 40), five bands (User 2026-09-24, v2.9.0):

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

(User 2026-09-24, v2.9.0)

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
= 0 (retired, User 2026-09-25, v2.9.0)
```

Meaning:
1. No Gate has a required Supply; there is no Supply Deficit and no excess Supply. Every Supply point is Fatigue recovery.
2. Supply reduces current Fatigue first (1:1, before departure).
3. Any still-remaining Supply buffers this expedition's resulting Fatigue gain 1:1.
4. Leftover Supply does not become Power, success chance, Loot, Hazard defense, or a persisted next-expedition buffer.
5. The Item value is shown as `피로 회복 N` (never `보급 +N`). One-sentence rule: `음식·음료는 피로를 줄인다.`
6. No natural recovery of any kind: neither a morning nor a Severe-Injury rest day changes Fatigue; only Food/Drink lower it (User 2026-09-25, v2.9.0).

Result fields: beforeFatigue, preparedSupply, preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer, rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue, netFatigueDelta.
Removed: requiredSupply, excessSupply.

Field naming is shared with `NIGHT_CLOSING_v2.8.0.md`.
Do not introduce a second live `postOutcomeFatigueGain` field name for the same value.

## PREPARATION SEQUENCE

(User 2026-09-24, v2.9.0)

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

Expose exact decision ingredients (User 2026-09-24, v2.9.0):
- Prepared Supply
- current Fatigue
- current Fatigue band name from 20 up
- existing Injury state and its visible Stat penalties
- that sending an injured NPC again increases Severe / failure-Death risk
- that departing at Fatigue 40 (탈진) increases failure-Death risk
- exact pre-supply `실패 시 사망 위험` % at SALE entry, owned by this failure-conditioned Death-risk model, shown in the 전투 전망 help and the NPC detail rather than as an always-on readout cell (User 2026-09-24, v2.9.0)

Do not expose:
- exact expedition success probability
- post-supply/final actual Death probability during the SALE decision
- the readiness ratio thresholds 대응 / 불안 / 취약 (0.75 / 0.40) and the Hazard Defense formula; the Gate's 충분 requirement `대응 {N} 필요` (N = ceil(Hazard Threat)) and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` are public Gate-level facts on every Hazard row (MORNING, ORDER Gate detail, SALE destination plate, D25 scouting report, FINAL) — never a per-customer remaining need (User 2026-09-24 revision 2, v2.9.0)

Do not show the Player a branch table of hypothetical final Fatigue for 성공 / 퇴각 / 부상.

SALE may expose:
- current Fatigue (the customer's status strip)
- departure Fatigue after committed preRecovery — not a SALE line: the counter tray lists a Food/Drink's own `피로 회복` only, current Fatigue is the status strip's `피로 N` and NIGHT answers the rest; no always-on Fatigue line under the outlook (User 2026-09-25; the v2.9.0 `피로 A → 출발 B` line is retired)
- actual deterministic current arithmetic

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

Gate required Power keeps its current generation inputs. The Day term is (User 2026-09-25, v2.9.1 balance: early slope 1.70 → 1.20, late slope 0.40 → 0.80 — the early Gates no longer outrun adventurer growth, the D20~30 Tier-3 pressure rises; v2.9.2 balance, User 2026-09-25: early slope 1.20 → 1.50, late 0.80 kept — a fresh first Run cleared the Boss; v2.9.2 third pass, User 2026-09-26: DAY 11~20 climb at 1.10 per Day — the NPC-growth check of GAME_VISION's Run Progression Arc — DAY 1~10 unchanged; DAY 21+ returns to the existing 0.80 slope while keeping the offset accumulated by D20, so its absolute Day term is higher than before):

```text
Day term
= min(Day, 9) × 1.50 + max(0, min(Day, 10) - 9) × 0.80 + max(0, min(Day, 20) - 10) × 1.10 + max(0, Day - 20) × 0.80
```

Full required Power (Source-exact):

```text
Gate Power
= (21 + Day term + (Tier - 1) × 5 + FireTerm + (familyBase - 2) × 1.3) × FamilyCombat
× Event danger multiplier × (1 + (50 - region) × 0.001)

FireTerm = 6 + (Tier - 1) × 8 for fire, else 0
FamilyCombat = fireCombat 0.90 for fire, else 1
familyBase: spider 2 · slime 2 · fire 3 · crypt 3 · snow 4
region: 0..100, starts 50; each Night +2 per win, -4 per death, -1 per other result

Gate scale = 1 + Day × 0.10 + (Tier - 1) × 0.6   (Final: 4.6)
Gate reward multiplier = familyReward × (1 + (Tier - 1) × 0.12) × Event reward multiplier
familyReward: spider 1 · slime 1 · fire 1.15 · crypt 1.10 · snow 1.25 · Final 2
```

Day-term reference anchors:

```text
D9  = 13.50
D10 = 14.30
D12 = 16.50
D18 = 23.10
D20 = 25.30
D24 = 28.50
D29 = 32.50
```

## HAZARD THREAT

For each canonical Hazard:

```text
Hazard Threat
= 12 + Day × 0.35 + (Tier - 1) × 6
```

Reference anchors:

```text
D1  T1 = 12.35
D12 T1 = 16.20
D18 T2 = 24.30
D24 T2 = 26.40
D29 T3 = 34.15
D30 T2 = 28.50
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

A naturally strong, invested NPC may need fewer Item resources.
A weak-fit NPC may need more.
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

Hybrid value comes from:
- multiple possible Gates
- destination uncertainty
- order uncertainty
- multi-hazard coverage

## RESIDUAL RISK

Preparation should create confidence, not certainty.

itemSpecificHiddenFailureRNG=NO

Residual risk comes from normal:
- hazard/environment resolution
- combat uncertainty
- visible trait/condition effects

Narrative must match actual cause.
A blocked Hazard must not be falsely blamed for an unrelated injury.

T1/T2 proper preparation should not repeatedly feel invalidated.

PASS3 T3 prepared-Hazard incident target:
≈5–10% feel is an initial simulation target, not a fixed player-facing probability.

## HAZARD SOLUTION COVERAGE

Every canonical Hazard requires:

MAIN_ROUTE=1
ALTERNATIVE_ROUTE>=2

MAIN:
- specialist response
- narrow coverage
- highest reliability for that Hazard
- immediately understandable

ALTERNATIVE ROUTE may be:
- weaker Direct Counter
- Hybrid Counter
- relevant natural Stat route
- Stat-support Item
- other explicit preparation trade-off

Insurance/Escape is a common downstream safety layer and does NOT automatically count as one of the two Hazard-specific alternatives.

Rules:
- no mandatory single SKU
- Order RNG must not make reasonable preparation impossible
- alternatives must be meaningfully different, not three copies of the same Counter
- one Item must not solve an entire Family
- no Job is mandatory

Canonical item matrix -> `ITEM_v2.8.0.md`

## FAMILY COVERAGE

Every Family must remain solvable through combinations of:
- Hazard Main/Alternative routes
- Base Stats
- flexible Item choice
- optional Insurance/Escape

Affinity should emerge from:
stats + visible Item/Trait effects

Related:
item -> `ITEM_v2.8.0.md`
job -> `NPC_TRAIT_v2.8.0.md`

## FAMILY INTRODUCTION

runStart.starterFamilies=3/5

Family knowledge should emerge through supplied expeditions and successful return, not zero-supply scouting.
Exact Monster Knowledge gain contract -> `CORE_RUN_v2.8.0.md`.

family4.eligible≈D4–7
family5.eligible≈D8–12

Exact introduction day=seed/balance dependent

Goal:
early Family mix differs across runs.

## INTRA-BAND CURVE

D1–3:
D4–7:
D8–12:
D13–18:
D19–24:
D25–29:
D30:

Within each Day band:
higher-tier weight rises gradually with Day.

Avoid:
- identical Tier weights every Day in a band
- abrupt one-day difficulty cliffs

## CONTROLLED RANDOM

Seed-randomized within Day constraints:
- Family
- Tier
- Gate count

Forbidden:
- D2 TierIII
- fixed same Dungeon on same Day every run

Multi-Gate:
prefer distinct Families when practical.

Avoid multiple Gates demanding nearly identical preparation unless intentional.

## CURRENT-DAY GATE INFORMATION

Before Order commitment, the current Day Gate state is already generated and fixed.

Expose current-day preparation context:
- open Gate(s)
- actual current-day Family/Tier as defined by the Gate presentation
- known Hazard information

This is the information the player primarily orders against.

## NEXT-DAY GATE FORECAST — RETIRED

(User 2026-09-24, v2.9.0) No player-facing next-day forecast exists. The Gate-count and Tier generation rules below stay the engine's; nothing derived from them is shown before the next Day opens.

## EXPEDITION FORECAST

Combat:
[우세,접전,불리]

Hazard preparation:
[취약,불안,대응,충분]

No master safety score.
No exact success/death probability.

Player gets ingredients, not formula.

## COMBAT VARIANCE

baseNoise=±17.5%
baseNoiseCoefficient=0.175

Goal:
- border cases can swing
- weak `우세` is not absolute safety
- grown NPC advantage remains trustworthy
- RNG must not erase long-term growth

If the value later changes, variance-related balance must be rechecked; no Trait may expose or require knowledge of the hidden exact noise percentage.

### HIDDEN LUCK REMOVAL
Hidden luck reference is strictly 0. Removed from all combat noise and escapeChance formulas.

## FULL-CHAIN NUMERIC CLOSURE — GATE / FORECAST / ORDINARY RESOLVE

USER_APPROVAL_DATE=2026-09-20

These values are the required baseline. Later tuning requires measured evidence and a new
approved owner amendment.

### Gate-count generation — exact

For ordinary Days:

| Day | Gate count |
|---|---|
| D1–3 | exactly 1 |
| D4–7 | 1 or 2, exactly 50% / 50% |
| D8–18 | exactly 2 |
| D19–24 | 3 at 70%, otherwise 2 (User 2026-09-26, v2.9.2 fourth pass; was 2 or 3 at 50% / 50% through D29) |
| D25–29 | exactly 3, no draw (User 2026-09-26, v2.9.2 fourth pass) |
| D30 | ordinary Gate-count generation does not run; Final owner applies |

No player-facing next-Day Gate-count forecast exists (User 2026-09-24, v2.9.0); the generator alone reads this rule.

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

Late T3 pressure (User 2026-09-26, v2.9.2 third pass): after the interpolation, DAY 21~29 move 0.10 of the T2 weight to T3
(never more than T2 holds); T1 and every other Day keep the anchor values. The late Days lean on Hazard / Item preparation,
not raw Power alone. Examples: D24 10 / 50 / 40 · D25 5 / 40 / 55 · D29 0 / 35 / 65.

No player-facing next-Day Tier forecast exists (User 2026-09-24, v2.9.0); the generator alone reads this function.

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

Mapped Core-Stat coefficients (one non-투력 Stat per Hazard, 3 / 3 / 3, no Gate sharing a Stat; User 2026-09-24 revision 5, v2.9.0):

| Hazard | Core-Stat contribution |
|---|---|
| 독 | 강인함 ×1/3 |
| 냉기 | 강인함 ×1/3 |
| 부식 | 강인함 ×1/3 |
| 속박 | 기동 ×1/2 |
| 진창 | 기동 ×1/2 |
| 화염 | 정신 ×1/2 |
| 공포 | 정신 ×1/2 |
| 어둠 | 기동 ×1/2 |
| 화이트아웃 | 정신 ×1/2 |

투력 is never a Hazard-pressured Stat. Counter keys, Items, readiness labels and thresholds are unchanged.

Let:

    readinessRatio = Hazard Defense / Hazard Threat

Player label:

    readinessRatio >= 1.00 -> 충분
    readinessRatio >= 0.75 -> 대응
    readinessRatio >= 0.40 -> 불안
    otherwise              -> 취약

The 0.75 / 0.40 thresholds remain hidden calculation detail; the 충분 requirement (`대응 {N} 필요`, N = ceil(Hazard Threat)) and the Core-Stat conversion (`{능력치} {n}당 대응 1 제공`) are shown per Gate (User 2026-09-24 revision, v2.9.0).

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
        0.06
        + hazardAggregate × 0.012
        - prepared 강인함 × 0.001,
        0.02,
        0.48
      )

When combat fails:

    escapeChance
    = clamp(
        0.48
        + prepared 기동 × 0.005
        + explicit escape modifier
        - Gate scale × 0.024,
        0.15,
        0.94
      )

    escape succeeds -> 퇴각
    escape fails    -> 부상 branch

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
Base shares 0.36 / 0.11 (User 2026-09-25, v2.9.1 balance; were 0.42 / 0.13).
The single failure-conditioned Death rule, Insurance conversions, Aftercare and Great Success keep
their current owner ordering and are not redefined here.

### Ordinary EXP / expedition-Wallet / equipment reward — exact baseline

For a living adventurer:

    baseEXP = 22 + Day × 4.6

Outcome multiplier:

    대성공 = 1.00   (User 2026-09-26, v2.9.2 balance; was 1.10, 1.40 before — Great Success occurrence, Store Gold and Wallet unchanged)
    퇴각   = 0.38
    combat-success path = 0.90   (User 2026-09-26, v2.9.2 balance; was 1.00 — 성공, or a won fight that came home hurt)
    other surviving non-retreat path = 0.50

Then:

    EXP
    = round(baseEXP × outcomeMultiplier × explicit XP modifiers)

Ordinary expedition Wallet reward:

    baseWalletReward = 35 + Day × 8

Outcome multiplier (User 2026-09-25, v2.9.0; keyed on the resolved Outcome, ordered 중상 < 부상 < 퇴각 < 성공; 대성공 / 성공 back to 1.00 in v2.9.1):

    대성공 / 성공 = 1.00
    퇴각 = 0.35
    부상 = 0.20
    중상 = 0.10
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
= CombatDeficit × 0.18
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
= EnvironmentDeficit × 0.12
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
  0.30
)
```

If the NPC **began the expedition with ordinary Injury (`injury=1`)**:

```text
failureDeathChance
= clamp(
    healthyFailureDeathChance + 0.10,
    0.00,
    0.40
)
```

Otherwise:

```text
failureDeathChance = healthyFailureDeathChance
```

Fatigue 40 departure (User 2026-09-24, v2.9.0): if `fatigueBeforeExpedition = 40` (탈진), the same additive term applies, and the cap is raised the same way:

```text
injuryEscalation  = 0.10 if injury=1, else 0
fatigueEscalation = 0.10 if fatigueBeforeExpedition = 40, else 0
strainEscalation  = min(0.30, 0.08 × max(0, consecutiveInjuredDepartures − 1))
  consecutiveInjuredDepartures = this departure, if begun at injury=1, plus the unbroken run of this adventurer's
    immediately preceding expeditions also begun at injury=1; 0 when this departure is healthy
  (User 2026-09-25, v2.9.1 balance: only CONSECUTIVE injured departures count — a healthy departure, including the
   return after a Severe-Injury rest, resets the chain; the first injured departure is free, every further one adds 8%p,
   up to 30%p; Fatigue no longer feeds this term)

failureDeathChance
= clamp(
    healthyFailureDeathChance + injuryEscalation + fatigueEscalation + strainEscalation,
    0.00,
    0.30 + injuryEscalation + fatigueEscalation + strainEscalation
)
```

Meaning:
- complete combat/environment preparation may reduce `실패 시 사망 위험` to 0%
- 0% does **not** mean guaranteed expedition Success; it means an ordinary failure does not escalate to Death through this roll
- weak combat preparation raises the conditional failure Death risk
- weak Hazard preparation independently raises the conditional failure Death risk
- repeating expeditions with an already-injured NPC adds a visible material risk
- departing at Fatigue 40 (탈진) adds the same visible material risk
- sending an adventurer out injured again and again escalates further: +8%p per consecutive injured departure after the first, up to +30%p, and the cap rises with it; one healthy departure resets it (User 2026-09-25, v2.9.0)
- healthy conditional cap remains 30%
- injured conditional cap remains 40%
- Fatigue-40 conditional cap is 40%; injured and Fatigue-40 together 50%

These caps are conditional failure-risk caps, not unconditional whole-expedition Death probabilities.

### Preparation / Level Death reduction

(User 2026-09-25, v2.9.1 balance; the Level part removed User 2026-09-26, v2.9.2 fourth pass — Level no longer lowers the Death roll.) The failure Death roll uses

```text
rolledDeathChance = failureDeathChance × preparedFactor

preparedFactor (만반의 준비) = 0.80 when ALL hold, else 1:
  - departed without Injury (injury=0)
  - fatigueBeforeExpedition < 20
  - 2 or more Items in the Bag
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

(User 2026-09-25, v2.9.1 balance.) An adventurer who began the expedition at `injury=1` and whose Outcome is
`퇴각` is healed (injury → 0) with chance

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

(User 2026-09-25, v2.9.1 balance; a hidden correction kept minimal.) Within one Night's ordinary expeditions, in
resolution order:

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

Do not create:
- Great-Success-only Stat
- master readiness score
- new hidden Hazard aggregate
- second expedition-resolution system

Hazard / Supply / Insurance / Trait rules remain in their existing systems.
Great Success uses Combat-Power margin after ordinary Success qualification.

When the Player-facing Great Success opportunity threshold is met,
presentation must explicitly signal the opportunity.
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.
Presentation -> `UI_UX_v2.8.0.md`.
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

The signal threshold does not gate the roll.
It only controls when the Player sees the qualitative signal.

The intended positive loop remains:
    stronger prepared NPC
    -> larger positive margin
    -> higher Great Success chance
    -> faster NPC growth

Do not lower this probability merely because a skilled Run produces repeated Great Success.
Economic reinforcement is controlled separately by ECONOMY_ORDER_v2.8.0.md.

SALE owns when the signal is recomputed.
The signal remains qualitative; exact probability stays hidden.

### DEEP EXPEDITION / 심층원정

Identity:
redirect one actual visiting NPC into a deeper version of one of today's existing Gates.

Not:
- new Phase
- second expedition
- new Family
- T4
- two-roll expedition
- separate combat subsystem

Occurrence windows:
D7 / D14 / D21 / D28.

Each Run:
- exactly 2 or 3 occurrences
- at least 1 from D7/D14
- at least 1 from D21/D28
- Run-seeded / persisted
- no Save/Load reroll
- future occurrence dates hidden

Each Run has exactly 2 or 3 Deep occurrences, with:
    probability of 3 occurrences = 50%
    probability of 2 occurrences = 50%

On an actual Deep Expedition Day, Normal Daily Event does not occur.
Event exclusion owner -> `EVENT_v2.8.0.md`.

Base Gate:
1. use today's already-generated actual Gates
2. find highest Tier present
3. choose one of those highest-Tier Gates
4. ties use deterministic Run-seeded selection

Keep:
- Family
- Tier
- Hazard set
- ordinary Item / Supply / Trait interaction

Only difficulty-axis change:
**required Combat Power increases through a multiplier on the selected base Gate Power.**

Difficulty:
    deepRequiredPower = baseGateRequiredPower × 1.50

Do not use a separate additive curve or Day/Tier-specific Deep formula.

Do not inflate Hazard magnitude/count to manufacture difficulty.

Forecast uses the raised Deep Combat requirement but does not expose:
- exact hidden Power
- exact Success %
- exact Great Success %
- internal margin formula

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

This is proof/presentation logic.
It does not change the actual expedition outcome.

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

By Day band track:
- Family appearance
- Tier
- Gate count
- Hazard incidents
- Counter availability
- Item usage
- success
- retreat
- injury
- death

Reject outcomes where:
- one Family is always easiest/hardest
- one mandatory Item dominates a Family
- one Job acts as a key
- T3 requires 3 mandatory prep slots
- proper Counter feels meaningless
- RNG erases NPC growth

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
