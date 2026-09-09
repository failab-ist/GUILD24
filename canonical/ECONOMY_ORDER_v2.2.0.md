# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


## KEY

salePriceModes=[50%,100%,150%]
normalFreeSale=NO
gold=Integer

orderOffers/day=6
orderArrival=SAME_DAY_BEFORE_SALE
currentDayGateContext=KNOWN_BEFORE_ORDER
reroll=paid
rerollScope=fullOffer
rerollSameDayCost=escalating
rerollDailyReset=YES
rerollAdvancesPity=NO

nextDayTierForecast=EXACT_PERCENT
nextDayFamilyForecast=HIDDEN

economyGoal:
currentCash vs NPCInvestment vs StoreInvestment

## ROLE

ECONOMY / ORDER =
`제한된 Gold로 오늘과 미래 사이에서 무엇을 준비할 것인가`

핵심 긴장:
- 현재 재고 확보
- 현금 보유
- NPC 투자
- Relic 투자
- 발주 RNG 대응
- 미래 난이도 대비

Gold는 단순 구매 자원이 아니라
현재/미래 의사결정의 공통 자원이다.

## PRICE MODES

정상 판매 옵션:

50% = 정가×0.5
100% = 정가×1.0
150% = 정가×1.5

역할:

### 50%
identity=NPC investment

- 현재 Margin 감소
- 구매 허들 완화
- 장기 고객가치 투자

### 100%
identity=stable trade

- 기본 안정 거래
- 기준 가격

### 150%
identity=current profit / risk

- 높은 현재 Gold
- 높은 거절 Risk
- 관계/구매저항 부담 가능

Rule:
어느 가격도 항상 정답이면 안 된다.

## GOLD ROUNDING

Gold values=Integer

하나의 동일한 rounding rule을:
- UI 표시
- affordability check
- actual payment
- history
- settlement

에 동일하게 사용한다.

roundingRule=UNRESOLVED_CANONICAL

Requirement:
UI / affordability / payment / history / settlement must use one identical integer rule.

Until finalized, do not invent a new rounding rule to resolve a conflict; report the conflict for canonical decision.

## SPECIAL ZERO-PRICE ACTION

Free/service는 정상 판매 Price Mode가 아니다.

Zero-price transfer is allowed only when another Canonical Event/Final rule explicitly defines it.
Normal Sale does not expose an implicit Free button.

If an explicit zero-price action exists, it must not become repeatable Loyalty farming.

## ITEM ECONOMY

Item별 경제 역할은 다를 수 있다.

Possible identities:
- low-cost high-turnover
- stable margin
- expensive high-margin
- NPC investment item
- insurance item
- build-dependent item

Rule:
listPrice≈buyCost×2 를 모든 Item에 강제하지 않는다.

Item balance considers:
- buy cost
- sale price 50/100/150
- margin
- rarity
- effect role
- expected usable day
- NPC wallet burden
- Relic synergy

Canonical item role -> ITEM

## MARGIN

For each sale:
margin = actualSalePrice - acquisitionCost

Closing/economy reporting should distinguish:
- revenue
- COGS
- gross margin
- overhead
- waste
- Relic spend
- final Gold

Canonical presentation -> NIGHT_CLOSING

## NPC WALLET

Early/midgame customers should not frequently face:
`현실적으로 살 수 있는 상품이 하나도 없음`

Target:
most normal customers have >=1 plausible low-cost option.

150%:
- not universally affordable
- must still be a real option from early game for some low-price items / richer NPCs
- should not be a dead button for the first third of the run

Wallet growth should support long-term NPC value.

Related:
-> NPC_TRAIT

## PURCHASE / REFUSAL LOGIC

Refusal must reflect actual reason.

Canonical reasons:
- insufficient wallet
- price too high
- item not wanted/needed
- other explicit system reason if visible and real

Logical retry behavior:

If 50% fails because unaffordable:
100/150 same Item are not meaningful retries.

If 150% fails because price is too high:
100/50 may remain valid.

If Item itself is unwanted:
lower price does not guarantee purchase.

Refusal state must not incorrectly lock/unlock unrelated price choices.

Player-facing copy -> SALE

## ORDER ARRIVAL / DAY INFORMATION

Order is same-day replenishment.

Flow:
Morning reveals current-day Gate/Hazard information
→ player places Order
→ confirmed stock is added immediately
→ same-day Sale can sell that stock

Rule:
- confirmed Order stock becomes usable before the current Day SALE begins
- Order is NOT next-day delivery
- inventory capacity is checked against the stock state created by that same-day arrival

Information timing:

Current Day:
- actual open Gate information is known before Order commitment
- known Hazard information is available as the primary preparation context

Next Day:
- only T1/T2/T3 probability distribution is exposed as a secondary future signal
- next-day Family / actual Gate result remain hidden

Design intent:
`오늘은 알고 준비하고, 내일은 위험도만 살짝 읽는다.`

The next-day forecast supplements today's preparation decision;
it does not replace the current-day Gate/Hazard context.

Canonical Gate generation/reveal -> DUNGEON_HAZARD
Canonical phase flow -> CORE_RUN

## ORDER OFFERS

Base daily offer count:
6

Each Offer follows current:
- Day eligibility
- unlock rules
- rarity rules
- coverage rules

Exact rarity weights/pity values:
PASS3 / canonical data when finalized

Offer system should create uncertainty without making preparation pure blind luck.

## ORDER QUANTITY

Player decides:
- which offered SKU
- quantity
- total spend
- remaining cash

Order decision must make:
inventory risk + cash reserve
both visible/meaningful.

Inventory capacity canonical -> CORE_RUN / relevant Store rule.

## REROLL

Paid Full-offer reroll is a base Order system.

Each use regenerates the entire current Order offer list.
It is not a single-offer swap.

Same-day cost:
escalating

PASS3 starting curve:
30G -> 60G -> 120G -> 240G

next day:
cost/resetCount=RESET

Reroll preserves:
- current Day eligibility
- unlock rules
- rarity rules
- coverage rules

Reroll:
- does not advance pity
- cannot farm pity
- does not bypass eligibility

Exact cost/scaling=PASS3

### RELIC INTERACTION
`발주 교환권` may modify the base reroll only as defined in RELIC.
Its exact modifier model is owned by RELIC and must not be inferred here.

Canonical Relic rule -> RELIC

## TIER FORECAST

Before Order decision, show exact next-day Tier probability distribution.

Example:
T1 35%
T2 55%
T3 10%

Public:
- T1%
- T2%
- T3%

Hidden:
- actual next-day Family
- actual Gate result
- visitor identities
- NPC destination
- expedition success probability
- death probability

Design rule:
`난이도의 확률은 알지만, 정확히 무엇이 필요한지는 모른다.`

Forecast is World/Market information,
not expedition probability.

## FORECAST TIMING

Tier Forecast must be visible before the player commits Order spending.

Morning/Order can surface it.

It should inform:
- cheap/general stock vs premium preparation
- insurance stocking
- reroll willingness
- cash reserve

without revealing exact future solution.

Canonical Tier generation -> DUNGEON_HAZARD

## VISITOR FORECAST

Before Sale:
show expected visitor count.

Do not reveal before customer appearance:
- name
- Job
- Trait
- Wallet
- destination

Canonical NPC reveal -> SALE / NPC_TRAIT

## RELIC GOLD SINK

D5+ Relics use Gold.

Economic choice:
current inventory
vs
NPC investment through pricing
vs
store investment through Relic

D30:
final Item preparation vs last Relic
must be a meaningful final Gold Sink decision.

Canonical Relic pricing/window -> RELIC

## ECONOMY REBASELINE

PASS3 must jointly balance:

- Item buy cost
- sale prices
- margins
- NPC wallet
- wallet growth
- loot Gold
- purchase intent
- price resistance
- loyalty
- revisit
- overhead
- Relic prices
- Relic ROI
- waste

Do not tune one multiplier in isolation.

## ORDER / ECONOMY INFORMATION

Order screen must make decision inputs directly readable:

- current Gold
- selected spend
- Gold after order
- Item buy cost
- quantity
- inventory impact
- current-day Gate / known Hazard reference
- next-day Tier forecast (secondary future signal)
- reroll cost/state

Detailed visual layout -> UI_UX

## PASS3 METRICS

By Day:
- Gold
- order spend
- revenue
- COGS
- margin
- overhead
- waste
- Relic spend

NPC Wallet:
- mean
- median
- distribution

Price mode:
- conversion
- margin
- refusal reason
- loyalty/revisit effect
- long-term ROI

Reroll:
- use rate
- spend
- resulting offer quality
- pity integrity
- strategy dependence

Relic:
- purchase timing
- opportunity cost vs inventory

## STRATEGY CHECK

Compare:
- low-price investment
- 100% stable
- 150% profit focus
- selective VIP investment
- heavy reroll
- low reroll
- Relic-heavy
- Item-heavy
- adaptive

Reject:
- one price mode always optimal
- 150% effectively dead early
- 50% always superior because future value dominates
- Relic always-buy
- Relic never-buy
- reroll spam as guaranteed solution
- no-reroll pure RNG frustration

## RELATED
item roles -> ITEM
npc wallet/loyalty -> NPC_TRAIT
relic costs/build -> RELIC
tier generation -> DUNGEON_HAZARD
sale/refusal UX -> SALE
closing settlement -> NIGHT_CLOSING
run starting resources/inventory -> CORE_RUN
