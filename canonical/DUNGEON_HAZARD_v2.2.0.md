# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,supply_burden,forecast,counter

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


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

Gate/Event/Final may define a Supply requirement.
Food/Drink provide visible `Supply` values.

Resolution:
- actualSupply >= requiredSupply => no Supply Deficit
- actualSupply < requiredSupply => Supply Deficit
- Supply Deficit applies one shared expedition-wide penalty across effective Combat/Hazard readiness
- implementation may express the shared penalty through effective 투력/강인함/기동/정신 values, but must remain one unified Supply system
- excess Supply does not create an additional success bonus by itself

Player-facing:
- Supply Burden is visible before Order when active
- Item Supply contribution is visible
- exact deficit formula remains hidden

Exact frequency/requirement/scaling=PASS3

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

Family knowledge should emerge through actual Gate appearances.

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

baseNoise=UNRESOLVED
PASS3.test=[baseline≈±13.5%,±15%,±17.5%]

Goal:
- border cases can swing
- weak `우세` is not absolute safety
- grown NPC advantage remains trustworthy
- RNG must not erase long-term growth

If base variance changes:
rebaseline variance-related Traits.

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
