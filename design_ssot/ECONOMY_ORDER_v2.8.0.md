# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast,gate_count_forecast,rarity_progression,final_price,great_success_store_gold,deep_sponsorship
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/ECONOMY_ORDER_v2.8.0-patch.md,history/ECONOMY_ORDER_v2.7.0.md,history/ECONOMY_ORDER_v2.6.1.md,history/ECONOMY_ORDER_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/ECONOMY_ORDER.md

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

Canonical rule:

```text
roundingRule = nearest integer, half-up for nonnegative Gold
implementationReference = Math.round
```

The same rounded integer must be used for:
- UI display
- affordability check
- actual payment
- history
- settlement / Closing

Examples:
- 37.4G -> 37G
- 37.5G -> 38G

No subsystem may use a different floor/ceil rule for the same Gold amount.

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

Canonical item role -> `ITEM_v2.8.0.md`

## GOLDEN 1+1

Exact economy:
```text
buy 500
sell 1000
```

## CUMULATIVE GROSS SALES METRIC

Canonical gross sales for any cross-system read (including GREED) is:
```text
Cumulative Gross Sales
= sum of actual rounded sale prices from committed sales before the read point
```

Use the same rounded sale value used for payment/history/Closing.
Do not maintain a second hidden Boss-only revenue counter.

Boss consumer -> `BOSS_v2.8.0.md`

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

Canonical presentation -> `NIGHT_CLOSING_v2.8.0.md`

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

Do not add a new Day-based Wallet inflation system or a separate Wallet-growth subsystem.

Purpose:
from early game, the default 2 purchase slots should more often support a real
decision between enough preparation, extra preparation to chase Great Success,
and conserving stock/cash.

### Ordinary NPC Wallet on visit — exact

When a selected NPC arrives for an ordinary visit:

Fresh NPC:
    Wallet = min(2000, round(180 + Level × 8 + randomInt(0, 80)))

Returning NPC:
    Wallet = min(2000, round(existing Wallet + Level × 8 + randomInt(0, 80)))

Rules:
- random range is inclusive 0..80 under the existing integer RNG convention
- Level ×8 remains
- persistent Wallet carries between visits
- 2000 cap remains
- explicit Trait / Event / Store Support Wallet effects remain separate under their owners
- re-measure the failure -> low Wallet -> under-supplied -> failure loop before further reward tuning
- successful purchases reduce Persistent Wallet normally
- every permanent increase path clamps final Persistent Wallet to **2000G**

`rich` remains separate:
- actual visit +50G exactly once
- first/revisit both
- applied on actual arrival, not Morning formula
- cap 2000 after application

- **Event temporary purchase budget**: Persistent Wallet과 완전 분리(Cap 미포함, 이월 안됨).

Further Wallet tuning is a separate balance finding and must not be auto-applied during QA.

Related:
-> `NPC_TRAIT_v2.8.0.md`

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

Player-facing refusal UX -> `SALE_v2.8.0.md`; exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`

## ORDINARY SALE PURCHASE ACCEPTANCE

For an offered Item:

Accessible modes:
    50% 할인 / 정가

Accessible-mode base need:
    need = 0.80

For 바가지:

    fit
    = sum of positive Item Counter values for this customer's actual Gate Hazards

    need
    = 0.53 + min(0.29, fit × 0.012)

Mode values remain:

| Mode | charged multiplier | intent multiplier | flat intent |
|---|---:|---:|---:|
| 50% 할인 | 0.50 | 0.50 | +0.18 |
| 정가 | 1.00 | 0.65 | 0 |
| 바가지 | 1.50 | 1.50 | -0.16 |

정가 is judged below what it charges so a properly prepared product at list price stops failing
on intent alone. This is a threshold, not an acceptance rate - 정가 is not fixed at 65%.

For every mode:

    judgedPrice
    = round(Item list sell price × mode intent multiplier)

This judgedPrice is the same existing hidden comparison value used by the owned price-sensitive
Trait logic. It does not change the charged amount.

Apply current owned modifiers:
- injured customer + Insurance: +0.25
- Trait buyBias
- Trait priceBias when judgedPrice > 120G
- Trait Rare/Common bias by Item Rarity
- Trait overcharge bias on 150%
- applicable Store Support modifier
- applicable Event demand modifier

The former one-Bag-slot-filled -0.10 purchase modifier is retired.
The two-slot Bag is the capacity decision by itself.

Loyalty remains:
    +0.002 purchase chance per current Loyalty point

Affordability:

    effectiveWallet
    = Persistent NPC Wallet + current temporary Event budget

    actualDebit
    = max(0, chargedPrice - applicable owned guarantee support)

If effectiveWallet < actualDebit:
    purchaseChance = 0

Otherwise:

For 정가 only:

    burden
    = max(0, judgedPrice - applicable owned guarantee support)
      / max(1, effectiveWallet)

    burdenIntentBonus
    = 0.50 × max(0, 0.36 - burden)

For 50% 할인 and 바가지:
    burdenIntentBonus = 0

For every affordable mode:

    rawChance
    = need
      + Loyalty × 0.002
      + mode flat intent
      + burdenIntentBonus
      + applicable current modifiers

For affordable 50% 할인 / 정가, if the Item validly Counters at least one Hazard of this customer's
actual Gate under the game's canonical Counter semantics:

    purchaseChance = 0.97

This final Counter floor/cap applies even when a negative purchase Trait would otherwise lower
rawChance.

For non-Counter 50% 할인 / 정가:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

For 바가지:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

No new Counter floor is added to 바가지.

Reuse canonical Counter truth; do not maintain a second narrower purchase-only definition.
Existing mobility-based answers for bind/mire remain valid wherever the canonical Counter predicate
recognizes them.

Exact acceptance probability remains hidden from the Player.

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
- next-day Family / actual Gate result remain hidden

The next-day forecast supplements today's preparation decision;
it does not replace the current-day Gate/Hazard context.

Canonical Gate generation/reveal -> `DUNGEON_HAZARD_v2.8.0.md`
Canonical phase flow -> `CORE_RUN_v2.8.0.md`

## ORDER FLOW

```text
quantity selection
-> confirm order
-> committed Inventory increases
-> unconfirmed cart clears
-> remain in ORDER

optional:
-> Reroll
-> clear unconfirmed cart only
-> charge Reroll once
-> replace entire Offer set
-> preserve committed Inventory
-> order again

final:
-> separate `영업 시작`
-> SALE
```

`confirmOrder` semantics:
- purchase commit only
- never advances to SALE

`영업 시작` semantics:
- phase advance only
- must not auto-confirm the cart internally
- if unconfirmed cart remains, Player must explicitly resolve it before start or receive a clear blocking state; it must not be silently purchased

- 오늘 확정 발주 내역/누적 금액 유지. Reroll 누적 비용 익일 Reset.

## ORDER OFFERS

Base daily offer count:
6

Each Offer follows current:
- Day eligibility
- unlock rules
- rarity rules
- coverage rules

Offer system should create uncertainty without making preparation pure blind luck.

## ORDER RARITY PROGRESSION

ORDER offer Rarity shifts by Day band so the catalog itself communicates progression without a separate D20 hard-unlock rule for the new Epic preparation Items.

Exact normalized weights:

| Day | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| D1–3 | 68% | 24% | 7% | 1% | 0% |
| D4–7 | 63% | 25% | 11% | 1% | 0% |
| D8–12 | 58% | 27% | 12% | 2% | 1% |
| D13–19 | 53% | 27% | 15% | 4% | 1% |
| D20–24 | 46% | 26% | 17% | 10% | 1% |
| D25–29 | 39% | 25% | 19% | 16% | 1% |
| D30 | 34% | 24% | 21% | 20% | 1% |

Rules:
- every row sums to exactly 100%
- new Epic preparation Items use the ordinary Epic pool; they do **not** receive a separate D20 hard unlock
- early Epic appearance is intentionally possible but rare
- D20+ is where Epic becomes a normal late-Run preparation consideration because the shared Epic weight rises materially
- Legendary remains exceptional and does not scale with late-Run danger beyond the exact 1% rows above
- existing unlock/meta eligibility still applies before Rarity selection where another current owner explicitly requires it
- Reroll uses the same current-Day Rarity band; it does not bypass Day progression
- pity/guarantee systems must operate on top of this current Day-band truth rather than restoring the old fixed table

Design intent:

```text
초반 = Common/Uncommon 중심
중반 = Rare가 정상 선택지
후반 = Rare/Epic 혼합
Final = 고급 준비물이 자주 보이지만 Legendary는 여전히 예외
```

The purpose is not to make Epic mandatory.
The purpose is to make late-Run high-slot-efficiency preparation actually appear often enough to become a decision.

### ORDER Rare+ pity — exact

Pity counts canonical offer-set generations that contain no Rare+ Item.

After 5 consecutive qualifying offer sets without Rare+:

    Rare Rarity weight +3

for the next qualifying offer generation.

If that generated set contains Rare+:
- Rare pity resets to 0

Otherwise:
- pity continues

This modifier sits on top of the current Day-band Rarity table.
It does not replace or renormalize the table into a second progression system.

Canonical Full-offer Reroll:
- does not advance pity
- cannot be used to farm pity
- retains the same current-Day eligibility/Rarity rules

### Known-Hazard Counter pity — exact

Track each currently known Hazard independently.

For each qualifying normal offer-set generation:
- if at least one offered Item validly Counters that Hazard -> its missing count resets
- otherwise -> its missing count +1

When any known Hazard reaches 3 consecutive missing sets:
- replace one ordinary offer slot with one legal/unlocked Item that validly Counters a currently
  missing known Hazard
- preserve total offer count
- do not reveal an unknown Hazard
- reset covered missing state through the same resulting offer truth

Reroll does not advance these pity counters.

This base pity is separate from the stronger `길드24 원정전문점 인증` guarantee owned by RELIC.

## ORDER QUANTITY

Player decides:
- which offered SKU
- quantity
- total spend
- remaining cash

Order decision must make:
inventory risk + cash reserve
both visible/meaningful.

Inventory capacity canonical -> `CORE_RUN_v2.8.0.md` / relevant Store rule.

## ORDER DECISION INFORMATION

Before order commitment show/readably expose:
- Item buy cost
- quantity
- Item shelf life / expiry
- current Gold
- selected spend
- Gold after order
- **today expected operating cost**
- warehouse usage / remaining capacity
- current-day Gate / known Hazard
- next-day Tier forecast
- current Reroll cost/state

Expected operating cost must be derived from the same current-day rules used by Closing.
It is decision information, not a separate charge.

Detailed visual layout -> `UI_UX_v2.8.0.md`

## REROLL

Paid Full-offer reroll is a base Order system.

Each use regenerates the entire current Order offer list.
It is not a single-offer swap.

Same-day cost:
escalating

Curve:
50G -> 100G -> 200G -> 400G -> 800G -> x2 thereafter

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

With an unconfirmed cart:
- Reroll is still usable
- cart is discarded without purchase
- no need to zero quantities first

Confirmed Inventory is never removed by Reroll.

### RELIC INTERACTION
`발주 교환권` may modify the base reroll only as defined in RELIC.
Its exact modifier model is owned by RELIC and must not be inferred here.

Canonical Relic rule -> `RELIC_v2.8.0.md`

## NEXT-DAY FORECAST

Before ORDER commitment, MORNING must expose both:

1. next-day Gate-count forecast
2. next-day Tier forecast

The same information may remain available compactly in ORDER so the Player does not need to navigate back to remember it.

Design intent:

```text
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
```

### NEXT-DAY GATE COUNT FORECAST

If the next Day's Gate count is randomized by the current canonical Day/Gate generation rule, expose the exact probability distribution for each possible Gate count.

Example presentation:

```text
게이트 수
2개 65% · 3개 35%
```

If the next Day's Gate count is deterministic, expose the fixed count instead of a fake probability distribution.

Example:

```text
게이트 수
2개 확정
```

Rules:
- forecast probabilities must come from the same current seeded/run generation rules that will actually determine the next Day
- Save/Load must not create an independently rerollable forecast
- forecast may inform stock quantity, cash reserve, reroll willingness, and inventory planning
- do not reveal next-day Family
- do not reveal exact next-day Gate identities/composition
- do not reveal next-day Hazard set

### NEXT-DAY TIER FORECAST

Before Order decision, show exact next-day Tier probability distribution.

Example:
T1 35%
T2 55%
T3 10%

Public:
- T1%
- T2%
- T3%

Exact T1/T2/T3 probability forecast:

```text
게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

Rules:
- use the same canonical next-day Tier generation distribution that will govern the next Day
- this remains a future-risk signal, not an expedition success probability
- do not reveal exact next-day Gate result

Forecast is World/Market information,
not expedition probability.

### FORECAST TIMING

Tier Forecast must be visible before the player commits Order spending.

It should inform:
- cheap/general stock vs premium preparation
- insurance stocking
- reroll willingness
- cash reserve

without revealing exact future solution.

Canonical Tier generation -> `DUNGEON_HAZARD_v2.8.0.md`

### INFORMATION BOUNDARY

Current-day open Gate / known Hazard remains the primary preparation context for today's ORDER.

Next-day Gate Count + Tier Forecast is secondary future information.

Keep hidden:
- next-day Family
- exact next-day Gate composition
- next-day Hazard set
- future visitor identities
- future NPC destination
- expedition success/death probability
- recommended SKU/category/quantity

The forecast informs planning without revealing the future solution.

## MORNING / ORDER PRESENTATION CONTRACT

MORNING exposure is required.

Recommended compact structure:

```text
내일 전망

게이트 수
1개 xx% · 2개 xx% · 3개 xx%

게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

Fixed impossible counts may be omitted from presentation.
Exact visual layout is owned by `UI_UX_v2.8.0.md`.

ORDER may repeat the forecast compactly as decision context.

## VISITOR FORECAST

Before Sale:
show expected visitor count.

Do not reveal before customer appearance:
- name
- Job
- Trait
- Wallet
- destination

Canonical NPC reveal -> `SALE_v2.8.0.md` / `NPC_TRAIT_v2.8.0.md`

## BASE OPERATING COST

Core Roster:
- alive adventurers only
- sort by Level descending, then Rarity descending
- use the top 6
- if fewer than 6 are alive, use all
- recovering adventurers remain alive and therefore remain in the Core Roster

Let:

    avgLevel  = Core Roster average Level, or 1 if empty
    avgRarity = Core Roster average numeric Rarity index, or 0 if empty

    dayBase = 90 + 2 × (Day - 1)

    overheadBase
    = dayBase
      × (1 + 0.02 × (avgLevel - 1))
      × (1 + 0.06 × avgRarity)

Current Store Support/Event flat or percentage modifiers apply only through their own owner rules.

Final daily operating cost:

    round((overheadBase + applicable owned modifiers) / 10) × 10

An Event that explicitly sets operating cost to 0 overrides the final charge for that Day.

The stale standalone fixed `operating=60` data value is not an alternate operating-cost truth.

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

Canonical Relic pricing/window -> `RELIC_v2.8.0.md`

## GREAT SUCCESS STORE GOLD

Great Success remains a deliberate reward for strong preparation, but its direct Store-Gold reward
is reduced so NPC growth and Store economy do not compound too aggressively in already-strong Runs.

Exact ordinary-expedition bonus:

    D1-10   = +50G
    D11-20  = +100G
    D21-30  = +200G

Rules:
- only an actual ordinary Great Success grants this Store Gold
- ordinary Success grants no Great-Success Store-Gold bonus
- the bonus is direct Store Gold; it is not NPC Wallet and is not sale revenue
- the bonus does not require a same-Day sale
- it is granted exactly once for the resolved expedition

Deep Expedition exception:
- Success -> Store Gold 0
- Great Success -> Store Gold 0
- normal Great Success Store Gold bonus is suppressed
- no separate Deep/Guild cash prize

Great Success probability and NPC growth reward are not reduced by this Store-Gold rule.
Those remain owned by DUNGEON_HAZARD_v2.8.0.md and NPC_TRAIT_v2.8.0.md.

## DEEP EXPEDITION SPONSORSHIP COST

The sponsorship is priced by **the adventurer being sent**, not by the trip: a rarer or more
experienced NPC costs more, so choosing who to invest in is the decision.
There are no selectable payment tiers and no Day/Tier multiplier.

The sponsorship formula is:

    sponsorship
    = 200G
      × (1 + 0.20 × NPC rarity index)
      × (1 + 0.05 × (Level - 1))

Round to nearest 10G under the existing rule.

The sponsorship itself grants no Stat, Supply, Counter, Insurance or other expedition effect.
It only commits the Store to the Deep Expedition opportunity.

If the Store cannot afford the sponsorship, nomination cannot be confirmed.
If no NPC is nominated, no sponsorship is charged.

Deep difficulty/occurrence -> DUNGEON_HAZARD_v2.8.0.md.
Deep NPC reward -> NPC_TRAIT_v2.8.0.md.

## D30 FINAL PREPARATION PRICE / WALLET / GOLD

Ordinary SALE keeps the 50% / 100% / 150% price modes and ordinary purchase/refusal behavior.
D30 Final preparation is an explicit exception owned jointly with `FINAL_EXPEDITION_v2.8.0.md`.

For every Item transfer to a selected Final participant:

```text
Final transfer price = ordinary 50% price mode amount
                     = the Item's 매입가 기준 amount
```

Rules:
- 100% and 150% price modes are not available during Final preparation
- no purchase/refusal probability roll is performed during Final preparation
- NPC Wallet affordability remains real
- if `NPC Wallet < fixed Final transfer price`, that Item cannot be committed to that NPC
- if affordable and committed, NPC Wallet decreases by exactly the fixed Final transfer price
- actual inventory stock decreases by one for the committed Item
- Player Gold increases by exactly the same fixed Final transfer price
- Gross Sales increases by exactly the same fixed Final transfer price once
- this is not free equipment
- ordinary SALE pricing/refusal outside Final is unchanged

The fixed Final amount is a deterministic preparation transaction rather than a negotiated customer-price decision.

### FINAL ACCOUNTING

For each committed Final transfer:

```text
NPC Wallet -= fixed Final transfer price
Player Gold += fixed Final transfer price
Gross Sales += fixed Final transfer price exactly once
```

GREED uses the resulting Gross Sales state at Final Lock after Final preparation.
No separate exclusion or duplicate-count path exists.

## ECONOMY REBASELINE

Economy rebalancing must jointly balance:

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

## D29 CLOSING -> D30 PREP START GOLD KPI

Primary economy KPI:
`D29 Closing End Gold = D30 Prep Start Gold`

Definition:
Gold after D29 settlement/overhead and before any D30 Relic, Order, reroll,
or other D30 preparation spend.

Normal engaged-play target center:
`median ≈ 1,500G`

The primary target cohort uses the existing normal/adaptive engaged strategy set.
Naked/minimal-engagement, deliberate hoarding and other stress strategies are reported
separately and do not define the 1,500G center.

This is a balance center, not a forced per-Run value.

Full-run balance measurement reports at minimum:
P10 / P25 / median / P75 / P90
plus Gold In / Gold Out decomposition.

Do not default to Day-based Item price inflation, broad inflation, arbitrary
taxes or excessive overhead escalation to hit the target.

First tune the active economy through:
- Wallet baseline
- increased sale/reorder activity
- extra preparation to chase Great Success
- Deep Expedition sponsorship
- existing Relic/reroll/overhead/waste spending

## ECONOMY METRICS

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
- naked/minimal-prep
- zero-sale / zero-order / zero-supply minimal-engagement
- poverty/minimum-spend

Reject:
- one price mode always optimal
- 150% effectively dead early
- 50% always superior because future value dominates
- Relic always-buy
- Relic never-buy
- reroll spam as guaranteed solution
- no-reroll pure RNG frustration
- zero-engagement play remaining economically efficient into late Day bands while retaining realistic Final viability

Minimal-engagement correction must reuse existing economy / Dungeon / NPC long-term pressure.
Do not create a standalone punishment subsystem.

## RELATED

Gate-count / Tier generation -> `DUNGEON_HAZARD_v2.8.0.md`
Morning / Order presentation -> `UI_UX_v2.8.0.md`
Item catalog / Rarity identities / item roles -> `ITEM_v2.8.0.md`
Ordinary Sale / sale/refusal UX -> `SALE_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Boss/GREED accounting -> `BOSS_v2.8.0.md`
Economy/Order QA -> `ECONOMY_ORDER_QA_v2.8.0.md`
npc wallet/loyalty -> `NPC_TRAIT_v2.8.0.md`
relic costs/build -> `RELIC_v2.8.0.md`
closing settlement -> `NIGHT_CLOSING_v2.8.0.md`
run starting resources/inventory -> `CORE_RUN_v2.8.0.md`
