# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,supply_burden,forecast,counter

DOC_VERSION=2.6.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC



## v2.6.0 UPDATE: FATIGUE & PREPARE SEQUENCE

### PREPARE SEQUENCE (A~F)
`
A. NPC Base + Equipment 확보
B. 현재 Bag Item 평가 (Sold Item Stat, final Supply contribution, finalFoodDrinkSupply 산출. NPC Stat 미합산)
C. fatigueRecovery = max(0, finalFoodDrinkSupply - (requiredSupply||0))
   effectiveFatigue = max(0, n.fatigue - fatigueRecovery) 산출
D. Base + Equip 영역에 Trait/Injury/Fatigue 등 NPC-side % modifier 적용
   - Core Stat Trait % (reckless +10%, frail -10%) 적용
   - 부상 % (투력 -15% (악바리 +20%), 강인함 -20%) 적용
   - 피로 % (effectiveFatigue 기준, 기동/정신 10~19: -10%, 20: -25%) 적용
E. Sold Item Stat을 최종 Stat에 합산 (Item Stat에는 NPC-side % 적용 않음)
F. 기존 Supply Burden / Hazard 계산 진행
`

### HIDDEN LUCK REMOVAL
Hidden luck reference is strictly 0. Removed from all combat noise and escapeChance formulas.

### FATIGUE
- 아침 자연 회복(-2/일) 삭제.
- Stat penalty: 0~9 (없음), 10~19 (기동/정신 -10%), 20 (기동/정신 -25%).

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
Lv10+.slot3=insurance/flex/luxury

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

fire -> 강인함
secondAxis=higher Dungeon Combat Power
secondAxisIsHazard=NO

T1=fire
T2=fire + increasedCombatPower
T3=strong(fire) + highCombatPower

Gate required Combat Power carries a Family factor `fireCombat=0.90` (v2.5 final).
FIRE measured as the hardest Family for every Job, which the BALANCE TARGET clause below
rejects; the requirement is eased while the Hazard identity and Stat mapping stay untouched.
FIRE is still the hardest Family after it, and ships that way for v2.5.

armorHazard=NO

### CRYPT — 망자역
theme=[fear,dark]
familyTag=undead

fear -> 정신
dark -> 정신(primary)+기동(secondary)

T1=fear
T2=fear+dark
T3=strong(fear)+strong(dark)

undeadHazard=NO
jobKeySolution=NO

canonicalHazardKeysOnly=YES

### SNOW — 설원
theme=[cold,whiteout]

cold -> 강인함
whiteout -> 정신(primary)+기동(secondary)

T1=cold
T2=cold+whiteout
T3=strong(cold)+strong(whiteout)

## HAZARD PLAYER-FACING PRESSURE

Every canonical Hazard exposes a consistent short explanation
of what core Stat/readiness it pressures.

Canonical pressure labels:
- poison / 독 -> 강인함 압박
- bind / 속박 -> 기동 압박
- corrosion / 부식 -> 강인함 압박
- mire / 진창 -> 기동 압박
- fire / 화염 -> 강인함 압박
- fear / 공포 -> 정신 압박
- dark / 어둠 -> 정신 중심 + 기동 보조 압박
- cold / 냉기 -> 강인함 압박
- whiteout / 화이트아웃 -> 정신 중심 + 기동 보조 압박

Rules:
- explanatory information only; exact success formula stays hidden
- all 9 canonical Hazards follow the same presentation contract
- `slow` is not shown as a separate Hazard
- SLIME secondary player-facing Hazard is `진창`
- do not explain only some Hazards while leaving others name-only

Interaction ownership:
-> UI_UX

## GLOBAL PRESSURES

### FATIGUE
type=persistentNPCCondition
familyHazard=NO

sources may include:
- repeated expedition
- event
- injury/condition effects

recovery may include:
- rest
- explicit Condition items/effects

### SUPPLY_BURDEN
playerLabel=보급 부담
type=globalGateModifier
familyHazard=NO
familyExclusive=NO

longHazard=NO
thirstSystem=NO
hungerGauge=NO
foodDrinkHiddenCombo=NO

Purpose:
장거리/장시간 원정의 준비 압박을 별도 Hazard가 아니라 원정 전체 보급 문제로 표현한다.

Tier eligibility:
- T1 = NO
- T2 = eligible
- T3 = eligible
- D30 Final = no additional random Supply Burden modifier

v2.5 retained starting values:
```text
T2 Supply Burden chance = 35% per generated Gate
T2 requiredSupply = 3

T3 Supply Burden chance = 55% per generated Gate
T3 requiredSupply = 5
```

These are approved retained starting values for v2.5 implementation.
Full-run simulation/playtest may tune frequency/requirement/scaling without changing the one-system contract.

Food/Drink provide visible `Supply` values.
All active Food/Drink have Supply > 0 according to ITEM.

Resolution:
- actualSupply >= requiredSupply => no Supply Deficit
- actualSupply < requiredSupply => Supply Deficit
- Supply Deficit applies one shared expedition-wide penalty across effective Combat/Hazard readiness
- implementation may express the shared penalty through effective 투력/강인함/기동/정신 values, but must remain one unified Supply system
- excess Supply does not create an additional success bonus by itself

Player-facing:
- Supply Burden is visible before Order when active
- required Supply is visible
- current prepared Supply is visible where preparation is shown
- Item Supply contribution is visible
- exact deficit formula remains hidden

Slot contract:
Supply Burden must not turn T3 into a forced 3-slot tax.
A normal T2/T3 route with Supply Burden must still respect the canonical <=2 meaningful required-prep-slot contract.

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
- Lv10+ third slot=insurance/stat/loot/premium/safety choice

Tier scaling must not rely only on raw numeric inflation.

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

Canonical item matrix -> ITEM

## FAMILY COVERAGE

Every Family must remain solvable through combinations of:
- Hazard Main/Alternative routes
- Base Stats
- flexible Item choice
- optional Insurance/Escape

Affinity should emerge from:
stats + visible Item/Trait effects

Related:
item -> ITEM
job -> NPC_TRAIT

## FAMILY INTRODUCTION

runStart.starterFamilies=3/5

Family knowledge should emerge through supplied expeditions and successful return, not zero-supply scouting.
Exact Monster Knowledge gain contract -> CORE_RUN.

family4.eligible≈D4–7
family5.eligible≈D8–12

Exact introduction day=seed/balance dependent

Goal:
early Family mix differs across runs.

## DAY / GATE PROGRESSION

D1–3:
gate=1
tier=I only

D4–7:
gate=1–2
tier=I dominant
tierII=very low, late-band only

D8–12:
gate≈2
I≈65–70%
II≈30–35%

D13–18:
gate=2
I≈30%
II≈60%
III≈10%

D19–24:
gate=2–3
I≈10%
II≈60%
III≈30%

D25–29:
gate=2–3
II≈45–50%
III≈50–55%

D30:
normal Gate/Tier progression=NO
Final composition/resolution:
-> FINAL_EXPEDITION
Boss identity/trait:
-> BOSS

Exact percentages=PASS3 tuning targets.

## INTRA-BAND CURVE

Within each Day band:
higher-tier weight rises gradually with Day.

Avoid:
- identical Tier weights every Day in a band
- abrupt one-day difficulty cliffs

Exact curve=PASS3

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

The following NEXT-DAY forecast is supplemental only.
It must not replace or obscure today's Gate/Hazard information.

## NEXT-DAY TIER FORECAST

Before ordering, expose exact next-day Tier distribution:

T1 %
T2 %
T3 %

Do not expose:
- exact next-day Family
- actual Gate result
- visiting NPC identities
- NPC destination
- expedition success/death probability

Design rule:
`난이도의 확률은 알지만, 정확히 무엇이 필요한지는 모른다.`

Canonical presentation -> ECONOMY_ORDER

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
status=APPROVED_V2.4_STARTING_VALUE

Goal:
- border cases can swing
- weak `우세` is not absolute safety
- grown NPC advantage remains trustworthy
- RNG must not erase long-term growth

Full-run simulation/playtest must rebaseline outcome spread after v2.5 adoption.
If the value later changes, variance-related balance must be rechecked; no Trait may expose or require knowledge of the hidden exact noise percentage.

## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION

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

Exact threshold / curve / maximum probability=PASS3.

Do not create:
- Great-Success-only Stat
- master readiness score
- new hidden Hazard aggregate
- second expedition-resolution system

Hazard / Supply / Insurance / Trait rules remain in their existing systems.
Great Success uses Combat-Power margin after ordinary Success qualification.

When the Player-facing Great Success opportunity threshold is met,
presentation must explicitly signal the opportunity.
Exact copy -> COPY_WORLD_VOICE.
Presentation -> UI_UX.
Signal threshold=PASS3 and must match the actual calculation.

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

Exact 2-vs-3 weighting=PASS3.

On an actual Deep Expedition Day, Normal Daily Event does not occur.
Event exclusion owner -> EVENT.

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

`deepRequiredPower = baseGateRequiredPower × deepPowerFactor`

Exact `deepPowerFactor`=PASS3.
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

NPC nomination flow -> SALE.

The nominated NPC undertakes exactly one expedition.
Deep Expedition replaces that NPC's ordinary destination for the Day.
No second segment / second roll / second result.

Deep Expedition Store Gold reward is always 0.
NPC reward -> NPC_TRAIT.
Normal Great Success Store Gold -> ECONOMY_ORDER.

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
item counters -> ITEM
job/stat coverage -> NPC_TRAIT
order/tier forecast -> ECONOMY_ORDER
forecast UI -> UI_UX
night causality -> NIGHT_CLOSING
final expedition -> FINAL_EXPEDITION
boss modifier -> BOSS
