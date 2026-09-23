# ECONOMY_ORDER_QA

DOC=ECONOMY_ORDER_QA
OWNER=qa,economy,order,reroll

DOC_VERSION=2.5.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=DESIGN_QA_SPEC


Status values are NOT stored here.
This file defines acceptance criteria only.

## ECO-Q01 — NORMAL PRICE MODES
SETUP:
Open Sale pricing.

EXPECT:
Only:
- 50%
- 100%
- 150%

PASS:
No normal Free/25% mode exists.

## ECO-Q02 — PRICE ROUNDING CONSISTENCY
SETUP:
Use items whose percentage price creates fractional values if applicable.

EXPECT:
UI price, affordability check, payment, history, Closing use canonical nearest-integer half-up (`Math.round` for nonnegative Gold).

PASS:
No 1G mismatch between displayed and charged values; x.5 rounds upward.

## ECO-Q03 — 50% ROLE
SETUP:
Compare 50% vs 100% sale on same valid customer/item.

EXPECT:
50% produces lower current Margin and lower purchase hurdle.

PASS:
It behaves as NPC-investment pricing, not universally optimal free value.

## ECO-Q04 — 150% ROLE
SETUP:
Try 150% across early/mid/late customers.

EXPECT:
- higher Margin when accepted
- meaningful refusal/affordability risk
- not universally accepted
- not universally dead early

PASS:
150% remains a real risk/reward option.

## ECO-Q05 — UNAFFORDABLE RETRY LOGIC
SETUP:
Customer cannot afford same item even at 50%.

EXPECT:
100% and 150% are not presented as meaningful successful retries.

PASS:
Retry state respects Wallet logic.

## ECO-Q06 — PRICE RESISTANCE RETRY
SETUP:
150% rejected specifically for price resistance.

EXPECT:
100%/50% may remain valid.

PASS:
Lower-price retry is possible where logically applicable.

## ECO-Q07 — ITEM UNWANTED LOGIC
SETUP:
Customer does not want/need an item.

EXPECT:
Lowering price does not automatically guarantee purchase.

PASS:
Interest and price remain distinct causes.

## ECO-Q08 — REFUSAL COPY
SETUP:
Trigger each major refusal reason.

EXPECT:
Player-facing copy corresponds to actual cause:
- insufficient wallet
- price too high
- item unwanted/unneeded

PASS:
No misleading generic reason.

## ORD-Q01 — BASE OFFER COUNT
SETUP:
Enter normal Order phase without offer-count modifiers.

EXPECT:
6 offers.

PASS:
Exactly 6.

## ORD-Q02 — ORDER TOTAL
SETUP:
Select quantities across multiple offers.

EXPECT:
UI shows:
- current Gold
- selected spend
- Gold after order

PASS:
Values update correctly before confirmation.

## ORD-Q03 — INVENTORY CAPACITY
SETUP:
Attempt order beyond available inventory capacity.

EXPECT:
Invalid over-capacity purchase is blocked or adjusted clearly.

PASS:
Inventory cannot silently exceed capacity.

## ORD-Q04 — PAID FULL-OFFER REROLL
SETUP:
Use reroll repeatedly same day.

EXPECT:
- each use regenerates the entire current Order offer list
- cost increases each use
- no single-slot-only replacement behavior remains

PASS:
Full-offer regeneration and same-day escalation both work.

## ORD-Q05 — REROLL DAILY RESET
SETUP:
Use reroll, advance to next Day.

EXPECT:
Reroll count/cost returns to daily base.

PASS:
No prior-day escalation remains.

## ORD-Q06 — REROLL PITY INTEGRITY
SETUP:
Reroll repeatedly.

EXPECT:
Reroll itself does not advance rarity pity.

PASS:
No pity farming by spending Gold.

## ORD-Q07 — REROLL ELIGIBILITY
SETUP:
Reroll at several Days/unlock states.

EXPECT:
Rerolled offers still obey:
- Day eligibility
- unlocks
- rarity rules
- coverage rules

PASS:
Reroll cannot bypass progression.

## ORD-Q08 — REROLL COST TARGET
SETUP:
Use 4 rerolls on a fresh Day.

EXPECT:
Approved retained v2.5 starting curve:
30→60→120→240G

PASS:
Implementation matches the starting curve; later full-run balance may tune it explicitly.

## ORD-Q09 — TIER FORECAST TIMING
SETUP:
Enter Morning/Order.

EXPECT:
Next-day T1/T2/T3 probabilities are visible before order commitment.

PASS:
Player can use forecast for purchasing decisions.

## ORD-Q10 — TIER FORECAST ACCURACY
SETUP:
Inspect displayed next-day Tier distribution and generation weights.

EXPECT:
Displayed percentages equal actual next-day Tier distribution.

PASS:
No fake/approximate percentage if UI presents exact numbers.

## ORD-Q11 — FORECAST INFORMATION BOUNDARY
SETUP:
Inspect Order forecast.

EXPECT:
Hidden:
- next-day Family
- actual Gate result
- visitor identity
- NPC destination
- expedition success/death %

PASS:
Only Tier distribution and permitted market information are exposed.

## ORD-Q12 — RELIC REROLL INTERACTION
SETUP:
Own `발주 교환권`, begin a fresh Day, and use the canonical Full-offer Reroll repeatedly.

EXPECT:
- first Full-offer Reroll costs 0G
- the free use consumes the first daily Reroll step
- with the PASS3 starting base curve, later same-Day costs are 60G -> 120G -> 240G ...
- next Day restores the first-Reroll-free benefit
- eligibility / coverage / rarity rules remain intact
- Reroll does not advance pity

PASS:
`발주 교환권` waives the first canonical Reroll cost rather than adding a single-slot swap or an extra hidden pity path.

## ECO-Q09 — EARLY WALLET PLAYABILITY
SETUP:
Sample early/mid customers.

EXPECT:
Most normal customers have at least one plausible affordable option.

PASS:
Frequent `nothing affordable at all` states do not dominate normal play.

## ECO-Q10 — CLOSING ECONOMICS
SETUP:
Complete day with purchases/sales/overhead/waste/relic spend.

EXPECT:
Closing distinguishes:
- revenue
- COGS
- margin
- overhead
- waste
- Relic spend
- final Gold

PASS:
Final Gold reconciles.

## ECO-Q11 — STRATEGY DIVERSITY
SETUP:
Simulation/playtest multiple pricing/order strategies.

EXPECT:
No single strategy dominates all contexts:
- 50% spam
- 100% only
- 150% only
- reroll spam
- never reroll
- always buy Relic
- never buy Relic

PASS:
At least several adaptive strategies remain viable.

## ORD-Q13 — SAME-DAY ORDER ARRIVAL
SETUP:
Enter Order with an Item not currently in Inventory, purchase it, then proceed directly to the same Day Sale.

EXPECT:
- confirmed Order stock is added immediately
- the purchased Item is available in the current Day Sale
- capacity/Gold state reflects the confirmed same-day arrival

PASS:
Order does not behave as next-day delivery and no extra day advance is required before use.

## ORD-Q14 — TODAY GATE / TOMORROW FORECAST BOUNDARY
SETUP:
Enter Morning then Order on a normal Day.

EXPECT:
Before Order commitment, Player can use:
- current-day open Gate information
- current-day known Hazard information
- exact next-day T1/T2/T3 probabilities

Next-day hidden:
- Family
- actual Gate result
- visitor identity
- NPC destination

PASS:
Today's Gate/Hazard is the primary preparation context, while tomorrow contributes only the allowed Tier probability forecast.

## ECO-Q12 — MINIMAL-ENGAGEMENT ECONOMY
SETUP:
Simulate repeated:
- zero sale
- zero order
- zero expedition supply
and compare against normal engaged/adaptive play.

EXPECT:
- zero-engagement route steadily loses economic position through existing costs/opportunity cost
- it is not a reliable late-run economy strategy
- normal engaged play produces materially better cash/future value
- no standalone inactivity tax/meter is added

PASS:
A player cannot efficiently reach late Day bands simply by spending almost nothing and advancing turns.

Exact overhead curve / economy tuning remains PASS3.


## ECO-Q META/BOSS — CUMULATIVE GROSS SALES CONSISTENCY
SETUP:
Create a known sequence of rounded committed sales and inspect Closing plus GREED input metric.

EXPECT:
Cumulative Gross Sales equals the sum of the exact same actual rounded sale values used by payment/history/Closing.

PASS:
GREED does not read a duplicate or differently rounded revenue counter.

## APPROVED_AMENDMENT_2026_09_12 — WALLET / GREAT SUCCESS GOLD / D30 CASH QA

### WALLET
PASS:
- global Wallet baseline is higher from D1
- ordinary NPC variation remains
- existing Level / carry behavior remains
- purchase-intent parameters unchanged
- Stage 9 measures 2-slot affordability/use

### NORMAL GREAT SUCCESS GOLD
PASS:
- ordinary Success -> no extra Store Gold
- normal Great Success -> extra Store Gold
- same-day sale not required
- bonus follows Gate/Tier scale
- Deep Great Success -> Store Gold 0

### DEEP SPONSORSHIP
PASS:
- sponsorship is priced from the nominated NPC's rarity and current Level
- no payment tiers / Day/Tier scaling
- no Stat/Supply effect from sponsorship
- unaffordable sponsorship cannot be confirmed
- skip charges 0

### D30 PREP START GOLD
Stage 9 reports P10/P25/median/P75/P90.
Target center for normal engaged play:
`median ≈ 1,500G`.

Report Gold In / Out by channel and explain target miss causes.
