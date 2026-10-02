# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast,gate_count_forecast,rarity_progression,final_price,great_success_store_gold,deep_sponsorship
DOC_VERSION=2.9.7
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.13
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## ROLE

ECONOMY / ORDER =
`제한된 Gold로 오늘과 미래 사이에서 무엇을 준비할 것인가`

핵심 긴장: 현재 재고 확보 · 현금 보유 · NPC 투자 · Relic 투자 · 발주 RNG 대응 · 미래 난이도 대비

Gold는 단순 구매 자원이 아니라 현재/미래 의사결정의 공통 자원이다.

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
rerollAdvancesPity=NO (Rare pity); YES for the Known-Hazard Counter pity (User 2026-10-02)

nextDayTierForecast=NONE (→ §NEXT-DAY FORECAST — RETIRED)
nextDayFamilyForecast=HIDDEN

economyGoal:
currentCash vs NPCInvestment vs StoreInvestment

## PRICE MODES

정상 판매 옵션:

50% = 정가×0.5
100% = 정가×1.0
150% = 정가×1.5

### 50%
identity=NPC investment — 현재 Margin 감소 · 구매 허들 완화 · 장기 고객가치 투자

### 100%
identity=stable trade — 기본 안정 거래 · 기준 가격

### 150%
identity=current profit / risk — 높은 현재 Gold · 높은 거절 Risk · 관계/구매저항 부담 가능

Rule: 어느 가격도 항상 정답이면 안 된다.

## GOLD ROUNDING

Gold values=Integer

```text
roundingRule = nearest integer, half-up for nonnegative Gold
implementationReference = Math.round
```

The same rounded integer is used for UI display, affordability check, actual payment, history and settlement / Closing.
Examples: 37.4G -> 37G; 37.5G -> 38G.

No subsystem may use a different floor/ceil rule for the same Gold amount.

## SPECIAL ZERO-PRICE ACTION

Free/service는 정상 판매 Price Mode가 아니다.

Zero-price transfer is allowed only when another Canonical Event/Final rule explicitly defines it.
Normal Sale does not expose an implicit Free button.
An explicit zero-price action must not become repeatable Loyalty farming.

## ITEM ECONOMY

Item별 경제 역할은 다를 수 있다: low-cost high-turnover · stable margin · expensive high-margin · NPC investment item ·
insurance item · build-dependent item.

Rule: listPrice≈buyCost×2 를 모든 Item에 강제하지 않는다.

Item balance considers buy cost, sale price 50/100/150, margin, rarity, effect role, expected usable day,
NPC wallet burden and Relic synergy.

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

Closing/economy reporting distinguishes revenue, COGS, gross margin, overhead, waste, Relic spend and final Gold.

Canonical presentation -> `NIGHT_CLOSING_v2.8.0.md`

## NPC WALLET

Early/midgame customers should not frequently face `현실적으로 살 수 있는 상품이 하나도 없음`.
Target: most normal customers have >=1 plausible low-cost option.

150%:
- not universally affordable
- must still be a real option from early game for some low-price items / richer NPCs
- should not be a dead button for the first third of the run

Wallet growth should support long-term NPC value, so that from early game the default 2 purchase slots more often
support a real decision between enough preparation, extra preparation to chase Great Success, and conserving stock/cash.
Do not add a new Day-based Wallet inflation system or a separate Wallet-growth subsystem - the one exception is the Away
Wallet below (User 2026-10-02).

### Ordinary NPC Wallet on visit — exact

When a selected NPC arrives for an ordinary visit:

Fresh NPC:
    Wallet = min(2000, round(180 + Level × 8 + randomInt(0, 80)))

Returning NPC:
    Wallet = min(2000, round(existing Wallet + Level × 8 + randomInt(0, 80)))

Rules:
- random range is inclusive 0..80 under the existing integer RNG convention
- persistent Wallet carries between visits
- explicit Trait / Event / Store Support Wallet effects stay separate under their owners
- successful purchases reduce Persistent Wallet normally
- every permanent increase path clamps final Persistent Wallet to **2000G**
- re-measure the failure -> low Wallet -> under-supplied -> failure loop before further reward tuning; further Wallet tuning is a separate balance finding and must not be auto-applied during QA

### Away Wallet — exact (User 2026-10-02)

A long gap between visits left a returning adventurer behind the Gates and short of money to buy preparation. An introduced,
living adventurer who was available (not on recovery Days) and was not among the Day's visitors banks one Away Day, at most
**3**; the next ordinary visit adds, on top of the visit income above,

    banked Days × (Level × 4 + 20)

and the bank empties. Counted after the Day's visitor draw - no RNG draw. Half an ordinary visit's average income per Day,
so not coming never pays better than coming (a visit also brings the expedition's Wallet reward, EXP and Loyalty): the Store's
way to the money is still a regular who comes often. Clamped by the 2000 cap like every other increase.

`rich` is separate (`NPC_TRAIT_v2.8.0.md` §RICH): actual visit +50G exactly once, first/revisit both, applied on
actual arrival, not Morning formula; cap 2000 after application.

- **Event temporary purchase budget**: Persistent Wallet과 완전 분리(Cap 미포함, 이월 안됨).

## PURCHASE / REFUSAL LOGIC

Refusal must reflect actual reason. Canonical reasons:
- insufficient wallet
- price too high
- item not wanted/needed
- other explicit system reason if visible and real

Logical retry behavior:
- if 50% fails because unaffordable, 100/150 same Item are not meaningful retries
- if 150% fails because price is too high, 100/50 may remain valid
- if the Item itself is unwanted, lower price does not guarantee purchase

Refusal state must not incorrectly lock/unlock unrelated price choices.

Player-facing refusal UX -> `SALE_v2.8.0.md`; exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`

## ORDINARY SALE PURCHASE ACCEPTANCE

For an offered Item:

Accessible modes:
    50% 할인 / 정가

Accessible-mode base need:
    need = 0.72

For 바가지:

    fit
    = sum, over this customer's actual Gate Hazards, of the Item's positive direct Counter value
      plus its positive value of the Core Stat that Hazard presses (관련 준비)

    need
    = 0.53 + min(0.29, fit × 0.012)

Mode values:

| Mode | charged multiplier | intent multiplier | flat intent |
|---|---:|---:|---:|
| 50% 할인 | 0.50 | 0.50 | +0.18 |
| 정가 | 1.00 | 0.65 | 0 |
| 바가지 | 1.50 | 1.50 | -0.16 |

정가 is judged below what it charges. This is a threshold, not an acceptance rate - 정가 is not fixed at 65%.

For every mode:

    judgedPrice
    = round(Item list sell price × mode intent multiplier)

This judgedPrice is the same hidden comparison value used by the owned price-sensitive Trait logic.
It does not change the charged amount.

Apply current owned modifiers:
- injured customer + Insurance: +0.25
- Trait buyBias
- Trait priceBias when judgedPrice > 120G
- Trait Rare/Common bias by Item Rarity
- Trait overcharge bias on 150%
- applicable Store Support modifier
- applicable Event demand modifier

Bag occupancy applies no purchase modifier; the two-slot Bag is the capacity decision by itself.

Loyalty:
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

For affordable 50% 할인 / 정가, if the Item is 관련 준비 for this customer's actual Gate (RELIC
§COUNTER JUDGEMENT: a direct Counter for one of its Hazards, or a positive value of the Core Stat one of
them presses):

    purchaseChance = 0.97

This final Counter floor/cap applies even when a negative purchase Trait would otherwise lower rawChance.

For non-Counter 50% 할인 / 정가:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

For 바가지:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

바가지 has no Counter floor.

Reuse the one owner (RELIC §COUNTER JUDGEMENT); do not maintain a second purchase-only definition.
기동 on 속박/진창 Gates is 관련 준비, not a Counter.

정가 final scale: the FINAL 정가 purchaseChance above — the 0.97 관련 준비 case included — is multiplied by 0.90
(a ~10% relative cut, not percentage points). 50% 할인 and 바가지 carry no scale, and the shared accessible-mode
base need is not lowered for it:

    정가 purchaseChance = (the 0.97 floor or the clamped rawChance) × 0.90

Exact acceptance probability remains hidden from the Player.

## ORDER ARRIVAL / DAY INFORMATION

Order is same-day replenishment:
Morning reveals current-day Gate/Hazard information → player places Order → confirmed stock is added immediately
→ same-day Sale can sell that stock.

- confirmed Order stock becomes usable before the current Day SALE begins
- Order is NOT next-day delivery
- inventory capacity is checked against the stock state created by that same-day arrival

Current Day: actual open Gate information is known before Order commitment; known Hazard information is the primary preparation context.
Next Day: nothing is shown; Family / actual Gate result remain hidden.

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

`confirmOrder` semantics: purchase commit only; never advances to SALE.

`영업 시작` semantics:
- phase advance only
- must not auto-confirm the cart internally
- if unconfirmed cart remains, Player must explicitly resolve it before start or receive a clear blocking state; it must not be silently purchased

- 오늘 확정 발주 내역/누적 금액 유지. Reroll 누적 비용 익일 Reset.

## ORDER OFFERS

Base daily offer count: 6

Each Offer follows current Day eligibility, unlock rules, rarity rules and coverage rules.
Offer system should create uncertainty without making preparation pure blind luck.

## ORDER RARITY PROGRESSION

ORDER offer Rarity shifts by Day band so the catalog itself communicates progression, with no separate D20 hard-unlock rule for the Epic preparation Items.

Exact normalized weights:

| Day | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| D1–3 | 76% | 20% | 4% | 0% | 0% |
| D4–7 | 68% | 24% | 8% | 0% | 0% |
| D8–12 | 58% | 27% | 12% | 2% | 1% |
| D13–19 | 53% | 27% | 15% | 4% | 1% |
| D20–24 | 46% | 26% | 17% | 10% | 1% |
| D25–29 | 39% | 25% | 19% | 16% | 1% |
| D30 | 34% | 24% | 21% | 20% | 1% |

Rules:
- every row sums to exactly 100%
- Epic preparation Items use the ordinary Epic pool; they do **not** receive a separate D20 hard unlock
- D1–7 lean on Common and offer no Epic (User 2026-10-02): a T1 Day's customer (a new Lv1 Wallet about 188~268G) cannot
  pay for an Epic (sell 270G+) and a Rare takes the whole Wallet; Epic is possible but rare from D8
- D20+ is where Epic becomes a normal late-Run preparation consideration because the shared Epic weight rises materially
- Legendary remains exceptional and does not scale with late-Run danger beyond the exact 1% rows above
- existing unlock/meta eligibility still applies before Rarity selection where another current owner explicitly requires it

## ORDER OFFER VARIETY

(User 2026-10-02.) One ORDER sheet holds an Item on at most `offerSameItemMax` = 2 slots: a slot already supplies 2~4 units
(Common / Uncommon), so a third copy only hides another Item. It holds for the Day's sheet, every Reroll and the extra Event /
Store Support slots; each rolled slot draws from the Items still under the cap (Rarity first, as above), and the Counter
guarantee picks a Counter still under it when one exists. Only when no Item is left under the cap does the cap yield, rather
than leave a slot empty.
- Reroll uses the same current-Day Rarity band; it does not bypass Day progression
- pity/guarantee systems operate on top of this Day-band table; no fixed all-Run Rarity table is used

Design intent:

```text
초반 = Common/Uncommon 중심
중반 = Rare가 정상 선택지
후반 = Rare/Epic 혼합
Final = 고급 준비물이 자주 보이지만 Legendary는 여전히 예외
```

Epic is not mandatory; late-Run high-slot-efficiency preparation should appear often enough to become a decision.

### ORDER OFFER QUANTITY

The most one ORDER offer lets the store stock, rolled when the offer is made:

| Rarity | Units |
|---|---|
| Common · Uncommon | 2~4 |
| Rare | 1~3 (the mid-Run Hazard Counters sit here) |
| Epic · Legendary | 1 |

Store Support that adds supply quantity (`RELIC_v2.8.0.md`) adds on top, unchanged.

### ORDER Rare+ pity — exact

Pity counts canonical offer-set generations that contain no Rare+ Item.

After 5 consecutive qualifying offer sets without Rare+:

    Rare Rarity weight +3

for the next qualifying offer generation. If that set contains Rare+, Rare pity resets to 0; otherwise pity continues.

This modifier sits on top of the current Day-band Rarity table; it does not replace or renormalize the table into a second progression system.

Canonical Full-offer Reroll does not advance pity, cannot be used to farm pity, and retains the same current-Day eligibility/Rarity rules.

### Known-Hazard Counter pity — exact

Track each currently known Hazard independently.

For every offer-set generation - the Day's first sheet and each Reroll alike (User 2026-10-02: the guarantee counts sheets drawn,
however they were drawn):
- if at least one offered Item directly Counters that Hazard (직접 대응, RELIC §COUNTER JUDGEMENT) -> its missing count resets
- otherwise -> its missing count +1

When any known Hazard reaches 3 consecutive missing sets:
- replace one ordinary offer slot with one legal/unlocked Item that validly Counters a currently
  missing known Hazard
- preserve total offer count
- do not reveal an unknown Hazard
- reset covered missing state through the same resulting offer truth

A Reroll is a drawn sheet here: three sheets in a row without a direct Counter for a known Hazard bring one on the third, by
the Day's first sheets, by Rerolls, or both. A Reroll that throws away a guaranteed Counter starts a new count.

No Store Support adds a further Counter-offer guarantee (RELIC).

## ORDER QUANTITY

Player decides which offered SKU, quantity, total spend and remaining cash.
Order decision must make inventory risk + cash reserve both visible/meaningful.

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
- each open Gate's Hazard requirement number `대응 {N} 필요` and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` (Gate detail)
- visitor count per open Gate, only when two or more Gates are open or an Event closed one (→ §VISITOR FORECAST)
- current Reroll cost/state
- each offer's rarity name under the Item name
- the reason when a quantity cannot be ordered — store Gold, warehouse space, or supply used up — as the COPY_AUDIT §3-9 toast on tap

Today-fit emphasis: in offer rows the effect text that answers today's open Gates (a Counter for one of today's Hazards, or the Core Stat one of them presses) is set in the emphasis style; no badge, no verdict word, no reorder, no recommended row -> `UI_UX_v2.8.0.md` §ORDER — ITEM INFORMATION HIERARCHY.

Expected operating cost is derived from the same current-day rules used by Closing.
It is decision information, not a separate charge.

Detailed visual layout -> `UI_UX_v2.8.0.md`

## REROLL

Paid Full-offer reroll is a base Order system. Each use regenerates the entire current Order offer list; it is not a single-offer swap.

Same-day cost curve (escalating):
50G -> 100G -> 200G -> 400G -> 800G -> x2 thereafter

next day:
cost/resetCount=RESET

Reroll preserves current Day eligibility, unlock rules, rarity rules and coverage rules.
Reroll does not advance Rare pity, cannot farm it and does not bypass eligibility; it does count toward the Known-Hazard Counter
pity (§Known-Hazard Counter pity, User 2026-10-02).

With an unconfirmed cart:
- Reroll is still usable
- cart is discarded without purchase
- no need to zero quantities first

Confirmed Inventory is never removed by Reroll.

### RELIC INTERACTION
`발주 교환권` may modify the base reroll only as defined in RELIC.
Its exact modifier model is owned by RELIC and must not be inferred here.

Canonical Relic rule -> `RELIC_v2.8.0.md`

## NEXT-DAY FORECAST — RETIRED

No next-day Gate-count or Tier forecast is shown at MORNING or ORDER. The seeded generation rules (`DUNGEON_HAZARD_v2.8.0.md`) remain internal; no forecast is drawn at all, so Save/Load cannot create a forecast-only RNG path.

Keep hidden:
- next-day Family
- exact next-day Gate composition
- next-day Hazard set
- individual future visitor identities
- individual future NPC destination (the current day's visitor count per open Gate is public → §VISITOR FORECAST)
- expedition success/death probability
- recommended SKU/category/quantity

## MORNING / ORDER PRESENTATION CONTRACT

MORNING shows today's Gates and Hazards; ORDER repeats today's Gate / Hazard context, the per-Gate visitor count and the offer rows. No next-day block.
Exact visual layout is owned by `UI_UX_v2.8.0.md`.

## VISITOR FORECAST

Before Sale (MORNING and ORDER): show expected visitor count.
With two or more open Gates - or on a day an Event closed a Gate (User 2026-10-02), so the one left open is not read as the
whole list - also the count per open Gate, by the destination each customer claims.

Do not reveal before customer appearance:
- name
- Job
- Trait
- Wallet
- individual destination (a liar's or a pilgrimage-rerouted customer's true Gate stays hidden)

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

    dayBase = 170 + 1 × (Day - 1) + 12 × max(0, Day - 15)

    overheadBase
    = dayBase
      × (1 + 0.03 × (avgLevel - 1))
      × (1 + 0.06 × avgRarity)

Current Store Support/Event flat or percentage modifiers apply only through their own owner rules.

Final daily operating cost:

    round((overheadBase + applicable owned modifiers) / 10) × 10

An Event that explicitly sets operating cost to 0 overrides the final charge for that Day.

A standalone fixed `operating=60` data value is not an alternate operating-cost truth.

## RELIC GOLD SINK

D5+ Relics use Gold.

Economic choice: current inventory vs NPC investment through pricing vs store investment through Relic.

D30: final Item preparation vs last Relic must be a meaningful final Gold Sink decision.

Canonical Relic pricing/window -> `RELIC_v2.8.0.md`

## GREAT SUCCESS STORE GOLD

Great Success is a deliberate reward for strong preparation; its direct Store-Gold reward stays small so NPC growth
and Store economy do not compound too aggressively in already-strong Runs.

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

Great Success probability and NPC growth reward are not reduced by this Store-Gold rule;
they are owned by DUNGEON_HAZARD_v2.8.0.md and NPC_TRAIT_v2.8.0.md.

## DEEP EXPEDITION SPONSORSHIP COST

The sponsorship is priced by **the adventurer being sent**, not by the trip: a rarer or more
experienced NPC costs more, so choosing who to invest in is the decision.
There are no selectable payment tiers and no Day/Tier multiplier.

    sponsorship
    = 200G
      × (1 + 0.20 × NPC rarity index)
      × (1 + 0.05 × (Level - 1))

Round to nearest 10G under the existing rule.

The sponsorship itself grants no Stat, Fatigue recovery, Counter, Insurance or other expedition effect;
it only commits the Store to the Deep Expedition opportunity.

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
- actual inventory stock decreases by one for the committed Item
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

Economy rebalancing must jointly balance Item buy cost, sale prices, margins, NPC wallet, wallet growth, loot Gold,
purchase intent, price resistance, loyalty, revisit, overhead, Relic prices, Relic ROI and waste.

Do not tune one multiplier in isolation.

## D29 CLOSING -> D30 PREP START GOLD KPI

Primary economy KPI:
`D29 Closing End Gold = D30 Prep Start Gold`

Definition: Gold after D29 settlement/overhead and before any D30 Relic, Order, reroll, or other D30 preparation spend.

Normal engaged-play target center:
`median ≈ 1,500G`

The primary target cohort uses the existing normal/adaptive engaged strategy set.
Naked/minimal-engagement, deliberate hoarding and other stress strategies are reported
separately and do not define the 1,500G center.

This is a balance center, not a forced per-Run value.

Full-run balance measurement reports at minimum P10 / P25 / median / P75 / P90 plus Gold In / Gold Out decomposition.

Do not default to Day-based Item price inflation, broad inflation, arbitrary taxes or excessive overhead escalation to hit the target.

First tune the active economy through:
- Wallet baseline
- increased sale/reorder activity
- extra preparation to chase Great Success
- Deep Expedition sponsorship
- existing Relic/reroll/overhead/waste spending

## ECONOMY METRICS

- By Day: Gold, order spend, revenue, COGS, margin, overhead, waste, Relic spend
- NPC Wallet: mean, median, distribution
- Price mode: conversion, margin, refusal reason, loyalty/revisit effect, long-term ROI
- Reroll: use rate, spend, resulting offer quality, pity integrity, strategy dependence
- Relic: purchase timing, opportunity cost vs inventory

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

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### PRICE MODES / ROUNDING

#### ECO-Q01 — NORMAL PRICE MODES
SETUP: Open Sale pricing.

EXPECT: Only:
- 50%
- 100%
- 150%

PASS: No normal Free/25% mode exists.

#### ECO-Q02 — PRICE ROUNDING CONSISTENCY
SETUP: Use items whose percentage price creates fractional values if applicable.

EXPECT: UI price, affordability check, payment, history, Closing use canonical nearest-integer half-up (`Math.round` for nonnegative Gold).

PASS: No 1G mismatch between displayed and charged values; x.5 rounds upward.

#### ECO-Q03 — 50% ROLE
SETUP: Compare 50% vs 100% sale on same valid customer/item.

EXPECT: 50% produces lower current Margin and lower purchase hurdle.

PASS: It behaves as NPC-investment pricing, not universally optimal free value.

#### ECO-Q04 — 150% ROLE
SETUP: Try 150% across early/mid/late customers.

EXPECT:
- higher Margin when accepted
- meaningful refusal/affordability risk
- not universally accepted
- not universally dead early

PASS: 150% remains a real risk/reward option.

### PURCHASE / REFUSAL

#### ECO-Q05 — UNAFFORDABLE RETRY LOGIC
SETUP: Customer cannot afford same item even at 50%.

EXPECT: 100% and 150% are not presented as meaningful successful retries.

PASS: Retry state respects Wallet logic.

#### ECO-Q06 — PRICE RESISTANCE RETRY
SETUP: 150% rejected specifically for price resistance.

EXPECT: 100%/50% may remain valid.

PASS: Lower-price retry is possible where logically applicable.

#### ECO-Q07 — ITEM UNWANTED LOGIC
SETUP: Customer does not want/need an item.

EXPECT: Lowering price does not automatically guarantee purchase.

PASS: Interest and price remain distinct causes.

#### ECO-Q08 — REFUSAL COPY
SETUP: Trigger each major refusal reason.

EXPECT: Player-facing copy corresponds to actual cause:
- insufficient wallet
- price too high
- item unwanted/unneeded

PASS: No misleading generic reason.

#### ECO-Q-v28-3 — ORDINARY PURCHASE ACCEPTANCE BASELINE

Controlled states reproduce ECONOMY_ORDER_v2.8.0 exactly.

PASS:
- mode charged / intent multipliers remain:
  - 50% = 0.50 / 0.50
  - 100% = 1.00 / 0.65
  - 150% = 1.50 / 1.50
- judgedPrice uses the mode intent multiplier and never changes the actual charged amount
- 50% / 100% base need = 0.72
- 150% uses the owner-defined fit-based need calculation
- flat mode intent remains +0.18 / 0 / -0.16
- one occupied Bag slot applies no purchase penalty
- Loyalty remains +0.002 per point
- current Trait / Store Support / Event modifiers remain active
- only 100% keeps pivot 0.36 / weight 0.50 burden bonus, never a penalty
- effective Wallet includes temporary Event purchase budget
- unaffordable debit -> chance 0
- affordable 50% / 100% 관련 준비 (direct Counter or the pressed Stat, RELIC §COUNTER JUDGEMENT) -> final chance 0.97
- no separate purchase-only Counter definition; 기동 on 속박/진창 is 관련 준비, not a Counter
- non-Counter 50% / 100% and all 150% use normal 0.08–0.97 clamp
- 150% receives no new Counter floor
- 100% only: the final chance above (0.97 관련 준비 included) is × 0.90; 50% / 150% carry no scale;
  accessible base need 0.72 is not lowered for it

FAIL:
- Bag occupancy subtracts from purchase intent
- a purchase-only Counter test disagrees with canonical Counter truth
- accessibility rebalance silently boosts 150%
- exact probability appears in Player UI
- another surface uses a second acceptance formula

### NPC WALLET

#### ECO-Q-v28-3B — ORDINARY NPC WALLET ON VISIT

Fresh:
    min(2000, 180 + Level ×8 + randomInt(0,80))

Returning:
    min(2000, existing Wallet + Level ×8 + randomInt(0,80))

PASS:
- 0 and 80 endpoints are reachable under existing integer RNG convention
- returning NPC keeps persistent Wallet before visit income is added
- cap 2000 remains
- failed-expedition Loot is unchanged
- no extra RNG draw beyond the existing visit-income draw

#### ECO-Q63 — RICH

EXPECT:
- actual arrival +50G exactly once per actual visit
- first/revisit
- clamp at 2000

PASS: no Morning double-application.

### ORDER FLOW

#### ORD-Q01 — BASE OFFER COUNT
SETUP: Enter normal Order phase without offer-count modifiers.

EXPECT: 6 offers.

PASS: Exactly 6.

#### ORD-Q02 — ORDER TOTAL
SETUP: Select quantities across multiple offers.

EXPECT: UI shows:
- current Gold
- selected spend
- Gold after order

PASS: Values update correctly before confirmation.

#### ORD-Q03 — INVENTORY CAPACITY
SETUP: Attempt order beyond available inventory capacity.

EXPECT: Invalid over-capacity purchase is blocked or adjusted clearly.

PASS: Inventory cannot silently exceed capacity.

#### ORD-Q13 — SAME-DAY ORDER ARRIVAL
SETUP: Enter Order with an Item not currently in Inventory, purchase it, then proceed directly to the same Day Sale.

EXPECT:
- confirmed Order stock is added immediately
- the purchased Item is available in the current Day Sale
- capacity/Gold state reflects the confirmed same-day arrival

PASS: Order does not behave as next-day delivery and no extra day advance is required before use.

#### ORD-Q61 — ORDER CONFIRM SEPARATION

Select a nonzero cart and confirm.
EXPECT:
- Gold charged once
- Inventory increases
- cart clears
- phase remains ORDER

PASS: SALE does not open.

#### ORD-Q62 — REROLL WITH CART

With a nonzero unconfirmed cart, use Reroll.
EXPECT:
- Reroll is available
- unconfirmed cart clears without purchase
- current cost charged once
- entire Offer list changes
- already confirmed Inventory unchanged

PASS: Player never needs to manually zero quantities first.

#### ORD-Q63 — RE-ORDER AFTER REROLL

Confirm once -> Reroll -> select new quantities -> confirm again.
PASS:
- both confirmed purchases remain in Inventory
- second confirmation succeeds
- no first-order rollback.

#### ORD-Q64 — SEPARATE START SALE

After one or more order confirmations with cart clear, press `영업 시작`.
PASS:
- only phase changes to SALE
- no hidden confirm is called.

#### ORD-Q66 — DECISION INFO

Before confirmation, Player can read:
- shelf life
- current Gold
- selected spend
- Gold after order
- today expected operating cost
- warehouse used/remaining
- current Reroll cost

PASS: no basic decision requires waiting for Closing.

#### ORD-Q67 — MOBILE CONTINUITY

Interact with quantity, confirm, Reroll, and re-confirm on mobile.
PASS:
- current viewed offer region does not jump to top
- practical focus is restored when possible
- D30 Final ORDER does not regress.

### REROLL

#### ORD-Q04 — PAID FULL-OFFER REROLL
SETUP: Use reroll repeatedly same day.

EXPECT:
- each use regenerates the entire current Order offer list
- cost increases each use
- no single-slot-only replacement behavior remains

PASS: Full-offer regeneration and same-day escalation both work.

#### ORD-Q05 — REROLL DAILY RESET
SETUP: Use reroll, advance to next Day.

EXPECT: Reroll count/cost returns to daily base.

PASS: No prior-day escalation remains.

#### ORD-Q06 — REROLL PITY INTEGRITY
SETUP: Reroll repeatedly.

EXPECT: Reroll itself does not advance rarity pity; it counts as a drawn sheet for the Known-Hazard Counter pity.

PASS: No pity farming by spending Gold.

#### ORD-Q07 — REROLL ELIGIBILITY
SETUP: Reroll at several Days/unlock states.

EXPECT: Rerolled offers still obey:
- Day eligibility
- unlocks
- rarity rules
- coverage rules

PASS: Reroll cannot bypass progression.

#### ORD-Q65 — REROLL COST

Fresh Day repeated uses:
```text
50 -> 100 -> 200 -> 400 -> 800 -> x2 ...
```

PASS:
- same-Day escalation exact
- next Day resets
- Reroll itself does not advance pity

#### ORD-Q12 — RELIC REROLL INTERACTION
SETUP: Own `발주 교환권`, begin a fresh Day, and use the canonical Full-offer Reroll repeatedly.

EXPECT:
- first Full-offer Reroll costs 0G
- after the free use, paid Rerolls follow the ordinary curve from its first step (50 -> 100 -> 200 ...)
- next Day restores the first-Reroll-free benefit
- eligibility / coverage / rarity rules remain intact
- Reroll does not advance pity

PASS: `발주 교환권` waives the first canonical Reroll cost rather than adding a single-slot swap or an extra hidden pity path.

#### ORD-Q88 — REROLL RESPECTS CURRENT-DAY RARITY BAND

PASS:
- rerolled offers use the same Day-band Rarity distribution as the original current-Day offers
- Reroll does not fall back to the old fixed Rarity table
- Reroll does not bypass Item/meta eligibility
- existing pity rules do not create a separate Day-independent base table

### ORDER RARITY / PITY

#### ORD-Q86 — DAY-BAND RARITY WEIGHTS EXACT

For ordinary ORDER Rarity selection, EXPECT exact normalized rows:

| Day | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| D1–3 | 76 | 20 | 4 | 0 | 0 |
| D4–7 | 68 | 24 | 8 | 0 | 0 |
| D8–12 | 58 | 27 | 12 | 2 | 1 |
| D13–19 | 53 | 27 | 15 | 4 | 1 |
| D20–24 | 46 | 26 | 17 | 10 | 1 |
| D25–29 | 39 | 25 | 19 | 16 | 1 |
| D30 | 34 | 24 | 21 | 20 | 1 |

PASS:
- each row sums to exactly 100
- correct row is selected from current Run Day
- no stale all-Run `55/27/12/5/1` table remains as the live normal path

#### ORD-Q88 — OFFER VARIETY CAP

Generate Day sheets and Rerolls across Day bands.
PASS: no Item appears on more than 2 slots of one sheet (extra Event / Store Support slots and the Counter guarantee included).

#### ORD-Q87 — EPIC PROGRESSION WITHOUT HARD D20 UNLOCK

Using the 10 Epic preparation Items from `ITEM_v2.8.0.md`:

PASS:
- they are eligible through the ordinary Epic pool whenever other general eligibility allows
- no dedicated `day >= 20` gate exists for these 10 Items
- no Epic in D1–7; from D8 Epic appearance is possible but rare through Day-band weights
- D20+ Epic frequency rises because the shared Epic weight rises, not because a hidden second unlock system activates

#### ECO-Q-v28-5 — ORDER PITY EXACT

Rare+:
- after 5 consecutive qualifying offer sets without Rare+, next qualifying generation receives Rare weight +3
- Rare+ hit resets the counter
- the modifier layers over the current Day-band Rarity table

Known-Hazard Counter:
- track each known Hazard independently
- third consecutive qualifying missing set forces one legal/unlocked matching Counter into one ordinary offer slot
- total offer count remains unchanged
- unknown Hazards are never revealed

Reroll:
- advances neither pity counter
- cannot farm pity
- uses current Day eligibility/Rarity truth

The stronger Store Support guarantee remains owned separately by RELIC.

### NEXT-DAY FORECAST

#### ORD-Q09 / Q10 / Q14 / Q80 / Q81 / Q82 / Q83 — NEXT-DAY FORECAST — RETIRED

No next-day forecast surface exists (→ §NEXT-DAY FORECAST — RETIRED); the generation rules are covered by DUNGEON_HAZARD / ITEM §QA. FAIL anywhere on MORNING / ORDER if it newly exposes next-day Family, exact Gate composition, Hazard set, an individual future customer's identity or destination, exact success/death probability, or a recommended SKU/category/quantity.

#### ORD-Q84 — PER-GATE VISITOR COUNTS

PASS:
- with two or more open Gates, MORNING / ORDER show the current-day visitor count per open Gate
- the per-Gate counts sum to the expected visitor count
- each count follows the destination the customer claims; a liar's or a pilgrimage-rerouted customer's true Gate is not revealed
- with one open Gate no per-Gate breakdown appears
- no name / Job / Trait / Wallet is revealed with the counts

#### ORD-Q85 — ORDER FORECAST CONTINUITY

PASS:
- MORNING is where today's per-Gate visitor counts first appear (→ §VISITOR FORECAST)
- ORDER repeats the same counts compactly
- the ORDER counts match MORNING's and are not generated a second time; no next-day value appears on either

### GOLD ACCOUNTING

#### ECO-Q10 — CLOSING ECONOMICS
SETUP: Complete day with purchases/sales/overhead/waste/relic spend.

EXPECT: Closing distinguishes:
- revenue
- COGS
- margin
- overhead
- waste
- Relic spend
- final Gold

PASS: Final Gold reconciles.

#### ECO-Q META/BOSS — CUMULATIVE GROSS SALES CONSISTENCY
SETUP: Create a known sequence of rounded committed sales and inspect Closing plus GREED input metric.

EXPECT: Cumulative Gross Sales equals the sum of the exact same actual rounded sale values used by payment/history/Closing.

PASS: GREED does not read a duplicate or differently rounded revenue counter.

#### ECO-Q-v28-4 — BASE OPERATING COST EXACT

Core Roster:
- alive only
- top 6 by Level then Rarity
- recovering alive NPCs count
- fewer than 6 -> all alive NPCs

Expected:

    dayBase = 170 + 1×(Day-1) + 12×max(0, Day-15)
    base = dayBase × (1 + .03×(avgLevel-1)) × (1 + .06×avgRarity)

Then apply only current owned modifiers and round final daily operating cost to nearest 10G under
the current rounding convention.

PASS:
- explicit zero-operating-cost Event produces 0G
- Store Support modifiers do not silently redefine the base formula

#### ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD

Expected ordinary Great Success Store-Gold bonus:

    D1-10   50G
    D11-20  100G
    D21-30  200G

PASS:
- ordinary Success adds 0 Great-Success Store Gold
- ordinary Great Success adds the exact Day-band amount once
- Deep Great Success adds 0 Store Gold
- the bonus does not mutate NPC Wallet
- the bonus is not counted as sale revenue
- the same Great Success cannot pay twice
- same-day sale not required

#### ECO-Q-v28-2 — DEEP SPONSORSHIP

Expected:

    base 200G
    rarity step 0.20
    level step 0.05
    rounding 10G

PASS:
- rarity/Level scaling and rounding use the exact values above
- no compensating Deep reward/difficulty rebalance
- sponsorship is priced from the nominated NPC's rarity and current Level
- no payment tiers / Day/Tier scaling
- no Stat / Fatigue-recovery effect from sponsorship
- unaffordable sponsorship cannot be confirmed
- skip charges 0

### D30 FINAL PREPARATION

#### ORD-Q90 — FINAL FIXED 50% / WALLET / GOLD ACCOUNTING

Controlled D30 Final preparation with a selected participant and known Item price.

PASS:
- Final transfer price equals the ordinary 50% price-mode amount / 매입가 기준 amount
- 100% and 150% price modes are not available
- no purchase/refusal probability roll occurs
- if Wallet is below the fixed amount, transfer cannot commit
- if Wallet is sufficient and transfer commits, NPC Wallet decreases by exactly the fixed amount
- committed transfer consumes one real inventory stock
- Player Gold increases by exactly the fixed amount
- Gross Sales increases by exactly the fixed amount exactly once
- GREED's Final-Lock snapshot reads that updated Gross Sales
- ordinary SALE outside Final still uses its normal 50/100/150 and refusal rules

### BALANCE QA

#### ECO-Q09 — EARLY WALLET PLAYABILITY
SETUP: Sample early/mid customers.

EXPECT: Most normal customers have at least one plausible affordable option.

PASS: Frequent `nothing affordable at all` states do not dominate normal play.

#### ECO-Q11 — STRATEGY DIVERSITY
SETUP: Simulation/playtest multiple pricing/order strategies.

EXPECT: No single strategy dominates all contexts:
- 50% spam
- 100% only
- 150% only
- reroll spam
- never reroll
- always buy Relic
- never buy Relic

PASS: At least several adaptive strategies remain viable.

#### ECO-Q12 — MINIMAL-ENGAGEMENT ECONOMY
SETUP: Simulate repeated:
- zero sale
- zero order
- zero expedition supply
and compare against normal engaged/adaptive play.

EXPECT:
- zero-engagement route steadily loses economic position through existing costs/opportunity cost
- it is not a reliable late-run economy strategy
- normal engaged play produces materially better cash/future value
- no standalone inactivity tax/meter is added

PASS: A player cannot efficiently reach late Day bands simply by spending almost nothing and advancing turns.

#### ORD-Q89 — LATE-RUN OFFER MIX MEASUREMENT

Simulation/measurement across D20–D30 must record at minimum:
- Epic offers per Day
- Epic offers by category
- Rare/Epic share of total offers
- reroll contribution to Epic exposure
- Legendary exposure

BALANCE PASS direction:
- late Run visibly shifts toward Rare/Epic preparation choices
- Epic does not become so common that Common/Uncommon stock decisions disappear
- Legendary remains exceptional

Do not auto-tune weights during frozen QA; report a balance finding if measured play contradicts the intended progression.

#### WALLET
PASS:
- Full-run balance measurement measures 2-slot affordability/use

#### D30 PREP START GOLD
Full-run balance measurement reports P10/P25/median/P75/P90.
Target center for normal engaged play:
`median ≈ 1,500G`.

Report Gold In / Out by channel and explain target miss causes.

## RELATED

Gate-count / Tier generation -> `DUNGEON_HAZARD_v2.8.0.md`
Morning / Order presentation -> `UI_UX_v2.8.0.md`
Item catalog / Rarity identities / item roles -> `ITEM_v2.8.0.md`
Ordinary Sale / sale/refusal UX -> `SALE_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Boss/GREED accounting -> `BOSS_v2.8.0.md`
npc wallet/loyalty -> `NPC_TRAIT_v2.8.0.md`
relic costs/build -> `RELIC_v2.8.0.md`
closing settlement -> `NIGHT_CLOSING_v2.8.0.md`
run starting resources/inventory -> `CORE_RUN_v2.8.0.md`
