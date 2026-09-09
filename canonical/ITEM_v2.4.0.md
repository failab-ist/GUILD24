# ITEM

DOC=ITEM
OWNER=item,catalog,category,role,counter,supply,insurance

DOC_VERSION=2.4.0
CANONICAL_SET=GUILD24_CANONICAL_v2.4.0


## KEY
playerCategory=[Food,Drink,Medical,FieldGear,Insurance,Special]

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

activeCatalogCount=30
catalogTarget≈30
catalogSoftCap=32
newItemRule=REWORK_EXISTING_BEFORE_ADD

canonicalHazards=[poison,bind,corrosion,mire,fire,fear,dark,cold,whiteout]

globalPressure=[supplyBurden]

hiddenCombo=NO
jobIdItemModifier=NO
categoryAffinityScope=coreEffectOnly
exactNumericTuning=PASS3

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
- Supply preparation
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

## PRODUCT CATEGORY

Player-facing:
- Food
- Drink
- Medical
- Field Gear
- Insurance
- Special

Category = 상품 정체성/상점 분류
Functional Role = 실제 Gameplay 기능

Category contract:

Food:
- Supply 중심
- native Stat/recovery 또는 일부 Hybrid 대응 가능

Drink:
- Supply/Stat 중심
- 일부 Direct/Hybrid 대응 가능

Medical:
- recovery / injury / poison 등 치료·보호

FieldGear:
- Hazard specialist 중심

Insurance:
- expedition failure outcome mitigation

Special:
- 일반 Category 규칙 밖의 명시적 Utility/특수 효과

## FUNCTIONAL ROLE

### Stat
direct stat/recovery support

### Supply
mitigates global Supply Burden

Rules:
- Supply is NOT a Hazard Counter
- no thirst/hunger subsystem
- no Food+Drink pairing requirement
- excess Supply alone gives no extra expedition bonus

Canonical Supply Burden:
-> DUNGEON_HAZARD

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

## FOOD / DRINK CORE EFFECT

Fresh-category Relics and category-affinity effects use `native core effect`, not a blanket whole-item multiplier.

Food/Drink nativeCore may include:
- Supply
- native Stat/recovery

It does NOT automatically include:
- explicit Hazard Counter
- Insurance
- RiskReward penalty
- unrelated attached effect

genericWholeItemMultiplier=NO

Explicit Relic text may separately strengthen a Food/Drink Hazard Counter.

## SUPPLY MODEL

All active Food/Drink Items provide a visible Supply value unless explicitly defined otherwise.

Each Food/Drink Item defines:
- supplyValue
- native Stat/recovery effect if any
- explicit Hazard Counter if any
- explicit RiskReward if any

Supply values are canonical v2.4 starting values listed in ACTIVE CATALOG.
Full-run simulation/playtest may tune the numbers while preserving Supply > 0 for every active Food/Drink.

No Item may:
- create thirst
- cleanse thirst
- require Water after spicy Food
- create hidden caffeine stacking
- create hunger/thirst gauge

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
- Hybrid must not strictly dominate Direct
- T3 must retain viable <=2 required-prep-slot routes
- proper Main/Direct prep should feel reliable, especially T1/T2

Canonical Dungeon behavior:
-> DUNGEON_HAZARD

## HAZARD ITEM MATRIX

| Hazard | Main specialist | Alternative 1 | Alternative 2 |
|---|---|---|---|
| poison | 농축 해독제 | 방진마스크 | 강인함 route |
| bind | 경량 로프 | 기동 route | 캔커피/에너지드링크 등 기동 Stat support |
| corrosion | 부식 방지 코팅제 | 방수망토 Hybrid | 강인함 route |
| mire | 진창용 원정 장화 | 방수망토 Hybrid | 기동 route |
| fire | 얼음컵 | 쿨링 이온음료 Hybrid | 강인함 route |
| fear | 용사의 곡주 | 집중 사탕 | 정신 route |
| dark | 랜턴 건전지 | 정신 route | 기동 route |
| cold | 핫팩 | 불룡볶음면 Hybrid | 강인함 route |
| whiteout | 설원 고글 | 정신 route | 기동 route |

Matrix rule:
- Main specialist remains the most reliable single-Hazard answer
- Alternative routes must remain viable without becoming identical substitutes
- numeric strength=PASS3

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

## POTION / INJURY LINE

Potion identity=universal recovery/stat

하급 포션 -> 상급 포션:
clear upgrade hierarchy allowed

Potion:
- strong general recovery/stat
- not primary injury-insurance specialist

붕대/구급키트:
identity=injury insurance specialist

## INSURANCE HIERARCHY

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

approved v2.4 starting value:
escapeBonus=+50%p
finalEscapeCap≈90–95% tuning band

The +50%p bonus is implementation-fixed for the initial v2.4 full-run baseline and may be rebalanced after simulation/playtest.

### 세계수 생환부적
rarity=Epic
category=Insurance
role=Insurance
subrole=DeathInsurance

core:
Death -> Severe Injury
uses=1

Rules:
- clearly above Return Stone in survival hierarchy
- not Food/Drink
- Fresh-category effect does not apply
- exact secondary values=PASS3

## CATEGORY AFFINITY

Category-based Trait/Relic modifiers only boost the intended category core effect.

Example:
Food affinity may boost:
- Supply
- food-native recovery/Stat

It does not automatically multiply unrelated attached:
- Cold counter
- Fire counter
- Poison counter
- penalty magnitude

Canonical Trait behavior:
-> NPC_TRAIT

## JOB INTERACTION

Item value must not secretly change by Job ID.

jobIdEffectModifier=NO
jobIdPurchaseBias=NO
jobIdCounterModifier=NO

Job affinity should emerge from:
BaseStats + Growth + visible Traits

`마석 보조배터리`:
- universal Spirit support
- same base effect regardless of Job

Canonical:
-> NPC_TRAIT

## ACTIVE CATALOG

Exact numeric values/prices/shelf life=PASS3 unless separately canonicalized. Initial v2.4 implementation retains current canonical-compatible Source values; approved Supply/Insurance starting values in this document override them.

### Common / Rarity 0

1. 삼각김밥
category=Food
roles=[Supply]
supplyValue=5
identity=cheap basic expedition supply

2. 생수
category=Drink
roles=[Supply]
supplyValue=3
identity=cheap basic expedition supply

3. 컵라면
category=Food
roles=[Supply,HybridCounter]
supplyValue=5
counter=cold(low)
identity=cheap supply with light Cold flexibility

4. 핫바
category=Food
roles=[Supply,Stat]
supplyValue=4
identity=basic supply + Combat/expedition support

5. 초코바
category=Food
roles=[Supply,Stat]
supplyValue=2
identity=cheap quick Stat support
hiddenPostFatigue=NO

6. 캔커피
category=Drink
roles=[Supply,Stat]
supplyValue=2
identity=Mobility support
caffeineStack=NO

7. 붕대
category=Medical
roles=[Insurance]
subrole=InjuryInsurance
identity=cheap injury protection

8. 하급 포션
category=Medical
roles=[Stat]
identity=basic universal recovery

9. 얼음컵
category=Drink
roles=[Supply,DirectCounter]
supplyValue=2
mainCounter=fire
identity=cheap Fire specialist

10. 랜턴 건전지
category=FieldGear
roles=[DirectCounter]
mainCounter=dark
identity=Dark specialist

11. 경량 로프
category=FieldGear
roles=[DirectCounter,Stat]
mainCounter=bind
secondary=mobility
identity=Bind specialist

12. 집중 사탕
category=Food
roles=[Supply,Stat,HybridCounter]
supplyValue=1
counter=fear(low)
identity=affordable Spirit/Fear support

### Uncommon / Rarity 1

13. 불룡볶음면
category=Food
roles=[Supply,Stat,HybridCounter]
supplyValue=5
counter=cold(moderate)
identity=Combat + Cold flexible Food
rule=HotPack remains stronger pure-Cold specialist

14. 에너지드링크
category=Drink
roles=[Supply,Stat]
supplyValue=3
identity=strong Mobility support
caffeineStack=NO

15. 용사의 곡주
category=Drink
roles=[Supply,DirectCounter,RiskReward]
supplyValue=3
mainCounter=fear
identity=Fear specialist with explicit Mobility trade-off

16. 구급키트
category=Medical
roles=[Insurance]
subrole=InjuryInsurance
identity=strong injury protection

17. 방진마스크
category=FieldGear
roles=[DirectCounter]
counter=poison
identity=affordable secondary Poison response

18. 핫팩
category=FieldGear
roles=[DirectCounter]
mainCounter=cold
identity=affordable efficient Cold specialist

19. 방수망토
category=FieldGear
roles=[HybridCounter]
counters=[corrosion,mire]
identity=flexible Slime-family gear
rule=must not outperform either dedicated Main on its own Hazard

20. 부식 방지 코팅제
category=FieldGear
roles=[DirectCounter]
mainCounter=corrosion
identity=Corrosion specialist

21. 진창용 원정 장화
category=FieldGear
roles=[DirectCounter]
mainCounter=mire
identity=Mire specialist

22. 설원 고글
category=FieldGear
roles=[DirectCounter]
mainCounter=whiteout
identity=Whiteout specialist

### Rare / Rarity 2

23. 상급 포션
category=Medical
roles=[Stat]
identity=strong universal recovery/stat
injuryInsuranceSpecialist=NO

24. 농축 해독제
category=Medical
roles=[DirectCounter]
mainCounter=poison
identity=strong Poison specialist

25. 귀환석
category=Insurance
roles=[Insurance]
subrole=EscapeInsurance

26. 마석 보조배터리
category=Special
roles=[Stat]
identity=universal Spirit support
jobSpecificEffect=NO

27. 길드 프리미엄 도시락
category=Food
roles=[Supply,Economy]
supplyValue=7
identity=Premium Food / expedition economy
rule=must not dominate survival+supply+loot+general stats simultaneously

28. 쿨링 이온음료
category=Drink
roles=[Supply,HybridCounter]
supplyValue=4
counter=fire(moderate)
identity=Premium/Fresh-friendly Fire alternative
rule=IceCup remains stronger pure-Fire specialist

### Epic / Rarity 3

29. 세계수 생환부적
category=Insurance
roles=[Insurance]
subrole=DeathInsurance
core=Death -> Severe Injury once

### Legendary / Rarity 4

30. 황금 1+1 쿠폰
category=Special
roles=[Utility]
identity=explicit next-consumable duplication interaction
slotCost=1

## CATALOG BUILD SUPPORT

Catalog size is not a goal by itself.

Rules:
- do not add Items merely to hit a round number
- low-rarity specialist Items remain valuable in late run when their Hazard appears
- Premium must have a meaningful Rare+ pool without making Rare+ universally superior
- Expedition must have enough Medical/FieldGear/Insurance/Counter stock to support its Relics
- Fresh must have broad Food/Drink access across price/rarity and must not erase specialist FieldGear advantage
- Rotation/low-cost play must remain viable through cheap useful SKUs and bulk ordering

Build-filtered Relics must not depend on one single eligible SKU.

Canonical Relic interaction:
-> RELIC

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

## INFORMATION

Player can see:
- Category
- relevant Functional Role
- Supply contribution
- actual Stat effect
- Counter effect
- Condition effect
- Insurance behavior
- explicit penalty/tradeoff

Do not expose:
- exact expedition success %
- hidden internal formula

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

Consumer slot limit is separate from inventory visibility.

Canonical:
-> SALE

## PRICE

Canonical price modes:
50% / 100% / 150%

Full price/economy rules:
-> ECONOMY_ORDER

Balance considers:
- buy cost
- sale price
- margin
- NPC wallet burden
- role
- typical day
- rarity
- Relic/build interaction

## PASS3 METRICS

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
dungeon/hazard/supply -> DUNGEON_HAZARD
job/trait -> NPC_TRAIT
relic/build -> RELIC
order/reroll/pricing -> ECONOMY_ORDER
sale/inventory -> SALE
night causality -> NIGHT_CLOSING
