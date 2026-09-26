# ECONOMY / ORDER QA

DOC=ECONOMY_ORDER_QA
OWNER=qa,economy,order,reroll,wallet,gate_count_forecast,tier_forecast,rarity_progression,final_price
DOC_VERSION=2.9.2
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/ECONOMY_ORDER_QA_v2.8.0-patch.md,history/ECONOMY_ORDER_QA_v2.7.0.md,history/ECONOMY_ORDER_QA_v2.6.1.md,history/ECONOMY_ORDER_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/ECONOMY_ORDER_QA.md

Status values are not stored here. FAIL is valid evidence.
This file defines acceptance criteria only.

## PRICE MODES / ROUNDING

### ECO-Q01 — NORMAL PRICE MODES
SETUP:
Open Sale pricing.

EXPECT:
Only:
- 50%
- 100%
- 150%

PASS:
No normal Free/25% mode exists.

### ECO-Q02 — PRICE ROUNDING CONSISTENCY
SETUP:
Use items whose percentage price creates fractional values if applicable.

EXPECT:
UI price, affordability check, payment, history, Closing use canonical nearest-integer half-up (`Math.round` for nonnegative Gold).

PASS:
No 1G mismatch between displayed and charged values; x.5 rounds upward.

### ECO-Q03 — 50% ROLE
SETUP:
Compare 50% vs 100% sale on same valid customer/item.

EXPECT:
50% produces lower current Margin and lower purchase hurdle.

PASS:
It behaves as NPC-investment pricing, not universally optimal free value.

### ECO-Q04 — 150% ROLE
SETUP:
Try 150% across early/mid/late customers.

EXPECT:
- higher Margin when accepted
- meaningful refusal/affordability risk
- not universally accepted
- not universally dead early

PASS:
150% remains a real risk/reward option.

## PURCHASE / REFUSAL

### ECO-Q05 — UNAFFORDABLE RETRY LOGIC
SETUP:
Customer cannot afford same item even at 50%.

EXPECT:
100% and 150% are not presented as meaningful successful retries.

PASS:
Retry state respects Wallet logic.

### ECO-Q06 — PRICE RESISTANCE RETRY
SETUP:
150% rejected specifically for price resistance.

EXPECT:
100%/50% may remain valid.

PASS:
Lower-price retry is possible where logically applicable.

### ECO-Q07 — ITEM UNWANTED LOGIC
SETUP:
Customer does not want/need an item.

EXPECT:
Lowering price does not automatically guarantee purchase.

PASS:
Interest and price remain distinct causes.

### ECO-Q08 — REFUSAL COPY
SETUP:
Trigger each major refusal reason.

EXPECT:
Player-facing copy corresponds to actual cause:
- insufficient wallet
- price too high
- item unwanted/unneeded

PASS:
No misleading generic reason.

### ECO-Q-v28-3 — ORDINARY PURCHASE ACCEPTANCE BASELINE

Controlled states reproduce ECONOMY_ORDER_v2.8.0 exactly.

PASS:
- mode charged / intent multipliers remain:
  - 50% = 0.50 / 0.50
  - 100% = 1.00 / 0.65
  - 150% = 1.50 / 1.50
- judgedPrice uses the mode intent multiplier and never changes the actual charged amount
- 50% / 100% base need = 0.72 (User 2026-09-24, v2.9.0; was 0.80)
- 150% uses the owner-defined fit-based need calculation
- flat mode intent remains +0.18 / 0 / -0.16
- one occupied Bag slot applies no purchase penalty
- Loyalty remains +0.002 per point
- current Trait / Store Support / Event modifiers remain active
- only 100% keeps pivot 0.36 / weight 0.50 burden bonus, never a penalty
- effective Wallet includes temporary Event purchase budget
- unaffordable debit -> chance 0
- affordable 50% / 100% 관련 준비 (direct Counter or the pressed Stat, RELIC §COUNTER JUDGEMENT) -> final chance 0.97
- no separate purchase-only Counter definition; the legacy 기동-for-속박/진창 Counter exception is gone (User 2026-09-24, v2.9.0)
- non-Counter 50% / 100% and all 150% use normal 0.08–0.97 clamp
- 150% receives no new Counter floor
- 100% only: the final chance above (0.97 관련 준비 included) is × 0.90 (User 2026-09-25, v2.9.2); 50% / 150% carry no scale;
  accessible base need 0.72 is not lowered for it

FAIL:
- Bag occupancy subtracts from purchase intent
- a purchase-only Counter test disagrees with canonical Counter truth
- accessibility rebalance silently boosts 150%
- exact probability appears in Player UI
- another surface uses a second acceptance formula

## NPC WALLET

### ECO-Q-v28-3B — ORDINARY NPC WALLET ON VISIT

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

### ECO-Q63 — RICH

EXPECT:
- actual arrival +50G exactly once per actual visit
- first/revisit
- clamp at 2000

PASS: no Morning double-application.

## ORDER FLOW

### ORD-Q01 — BASE OFFER COUNT
SETUP:
Enter normal Order phase without offer-count modifiers.

EXPECT:
6 offers.

PASS:
Exactly 6.

### ORD-Q02 — ORDER TOTAL
SETUP:
Select quantities across multiple offers.

EXPECT:
UI shows:
- current Gold
- selected spend
- Gold after order

PASS:
Values update correctly before confirmation.

### ORD-Q03 — INVENTORY CAPACITY
SETUP:
Attempt order beyond available inventory capacity.

EXPECT:
Invalid over-capacity purchase is blocked or adjusted clearly.

PASS:
Inventory cannot silently exceed capacity.

### ORD-Q13 — SAME-DAY ORDER ARRIVAL
SETUP:
Enter Order with an Item not currently in Inventory, purchase it, then proceed directly to the same Day Sale.

EXPECT:
- confirmed Order stock is added immediately
- the purchased Item is available in the current Day Sale
- capacity/Gold state reflects the confirmed same-day arrival

PASS:
Order does not behave as next-day delivery and no extra day advance is required before use.

### ORD-Q61 — ORDER CONFIRM SEPARATION

Select a nonzero cart and confirm.
EXPECT:
- Gold charged once
- Inventory increases
- cart clears
- phase remains ORDER

PASS: SALE does not open.

### ORD-Q62 — REROLL WITH CART

With a nonzero unconfirmed cart, use Reroll.
EXPECT:
- Reroll is available
- unconfirmed cart clears without purchase
- current cost charged once
- entire Offer list changes
- already confirmed Inventory unchanged

PASS: Player never needs to manually zero quantities first.

### ORD-Q63 — RE-ORDER AFTER REROLL

Confirm once -> Reroll -> select new quantities -> confirm again.
PASS:
- both confirmed purchases remain in Inventory
- second confirmation succeeds
- no first-order rollback.

### ORD-Q64 — SEPARATE START SALE

After one or more order confirmations with cart clear, press `영업 시작`.
PASS:
- only phase changes to SALE
- no hidden confirm is called.

### ORD-Q66 — DECISION INFO

Before confirmation, Player can read:
- shelf life
- current Gold
- selected spend
- Gold after order
- today expected operating cost
- warehouse used/remaining
- current Reroll cost

PASS: no basic decision requires waiting for Closing.

### ORD-Q67 — MOBILE CONTINUITY

Interact with quantity, confirm, Reroll, and re-confirm on mobile.
PASS:
- current viewed offer region does not jump to top
- practical focus is restored when possible
- D30 Final ORDER does not regress.

## REROLL

### ORD-Q04 — PAID FULL-OFFER REROLL
SETUP:
Use reroll repeatedly same day.

EXPECT:
- each use regenerates the entire current Order offer list
- cost increases each use
- no single-slot-only replacement behavior remains

PASS:
Full-offer regeneration and same-day escalation both work.

### ORD-Q05 — REROLL DAILY RESET
SETUP:
Use reroll, advance to next Day.

EXPECT:
Reroll count/cost returns to daily base.

PASS:
No prior-day escalation remains.

### ORD-Q06 — REROLL PITY INTEGRITY
SETUP:
Reroll repeatedly.

EXPECT:
Reroll itself does not advance rarity pity.

PASS:
No pity farming by spending Gold.

### ORD-Q07 — REROLL ELIGIBILITY
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

### ORD-Q65 — REROLL COST

Fresh Day repeated uses:
```text
50 -> 100 -> 200 -> 400 -> 800 -> x2 ...
```

PASS:
- same-Day escalation exact
- next Day resets
- Reroll itself does not advance pity

### ORD-Q12 — RELIC REROLL INTERACTION
SETUP:
Own `발주 교환권`, begin a fresh Day, and use the canonical Full-offer Reroll repeatedly.

EXPECT:
- first Full-offer Reroll costs 0G
- after the free use, paid Rerolls follow the ordinary curve from its first step (50 -> 100 -> 200 ...)
- next Day restores the first-Reroll-free benefit
- eligibility / coverage / rarity rules remain intact
- Reroll does not advance pity

PASS:
`발주 교환권` waives the first canonical Reroll cost rather than adding a single-slot swap or an extra hidden pity path.

### ORD-Q88 — REROLL RESPECTS CURRENT-DAY RARITY BAND

PASS:
- rerolled offers use the same Day-band Rarity distribution as the original current-Day offers
- Reroll does not fall back to the old fixed Rarity table
- Reroll does not bypass Item/meta eligibility
- existing pity rules do not create a separate Day-independent base table

## ORDER RARITY / PITY

### ORD-Q86 — DAY-BAND RARITY WEIGHTS EXACT

For ordinary ORDER Rarity selection, EXPECT exact normalized rows:

| Day | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| D1–3 | 68 | 24 | 7 | 1 | 0 |
| D4–7 | 63 | 25 | 11 | 1 | 0 |
| D8–12 | 58 | 27 | 12 | 2 | 1 |
| D13–19 | 53 | 27 | 15 | 4 | 1 |
| D20–24 | 46 | 26 | 17 | 10 | 1 |
| D25–29 | 39 | 25 | 19 | 16 | 1 |
| D30 | 34 | 24 | 21 | 20 | 1 |

PASS:
- each row sums to exactly 100
- correct row is selected from current Run Day
- no stale all-Run `55/27/12/5/1` table remains as the live normal path

### ORD-Q87 — EPIC PROGRESSION WITHOUT HARD D20 UNLOCK

Using the 10 Epic preparation Items from `ITEM_v2.8.0.md`:

PASS:
- they are eligible through the ordinary Epic pool whenever other general eligibility allows
- no dedicated `day >= 20` gate exists for these 10 Items
- early Epic appearance remains possible but rare through Day-band weights
- D20+ Epic frequency rises because the shared Epic weight rises, not because a hidden second unlock system activates

### ECO-Q-v28-5 — ORDER PITY EXACT

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

## NEXT-DAY FORECAST

### ORD-Q09 / Q10 / Q14 / Q80 / Q81 / Q82 / Q83 — NEXT-DAY FORECAST — RETIRED

(User 2026-09-24, v2.9.0) The next-day forecast surface is gone: nothing to time, display or keep consistent. The generation rules themselves are covered by DUNGEON_ITEM_QA. Still FAIL anywhere on MORNING / ORDER if it newly exposes next-day Family, exact Gate composition, Hazard set, an individual future customer's identity or destination, exact success/death probability, or a recommended SKU/category/quantity.

### ORD-Q84 — PER-GATE VISITOR COUNTS

PASS (per-Gate visitor counts; User 2026-09-24, v2.9.0):
- with two or more open Gates, MORNING / ORDER show the current-day visitor count per open Gate
- the per-Gate counts sum to the expected visitor count
- each count follows the destination the customer claims; a liar's or a pilgrimage-rerouted customer's true Gate is not revealed
- with one open Gate no per-Gate breakdown appears
- no name / Job / Trait / Wallet is revealed with the counts

### ORD-Q85 — ORDER FORECAST CONTINUITY

PASS:
- MORNING is the required forecast surface
- ORDER may repeat the same forecast compactly
- repeated ORDER presentation matches MORNING and does not generate a second value

## GOLD ACCOUNTING

### ECO-Q10 — CLOSING ECONOMICS
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

### ECO-Q META/BOSS — CUMULATIVE GROSS SALES CONSISTENCY
SETUP:
Create a known sequence of rounded committed sales and inspect Closing plus GREED input metric.

EXPECT:
Cumulative Gross Sales equals the sum of the exact same actual rounded sale values used by payment/history/Closing.

PASS:
GREED does not read a duplicate or differently rounded revenue counter.

### ECO-Q-v28-4 — BASE OPERATING COST EXACT

Core Roster:
- alive only
- top 6 by Level then Rarity
- recovering alive NPCs count
- fewer than 6 -> all alive NPCs

Expected:

    dayBase = 170 + 1×(Day-1) + 12×max(0, Day-15)    (v2.9.1 balance, User 2026-09-25; late term v2.9.2, User 2026-09-26)
    base = dayBase × (1 + .03×(avgLevel-1)) × (1 + .06×avgRarity)

Then apply only current owned modifiers and round final daily operating cost to nearest 10G under
the current rounding convention.

PASS:
- explicit zero-operating-cost Event produces 0G
- Store Support modifiers do not silently redefine the base formula

### ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD

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

### ECO-Q-v28-2 — DEEP SPONSORSHIP

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
- no Stat / Fatigue-recovery effect from sponsorship (User 2026-09-24, v2.9.0)
- unaffordable sponsorship cannot be confirmed
- skip charges 0

## D30 FINAL PREPARATION

### ORD-Q90 — FINAL FIXED 50% / WALLET / GOLD ACCOUNTING

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

## BALANCE QA

### ECO-Q09 — EARLY WALLET PLAYABILITY
SETUP:
Sample early/mid customers.

EXPECT:
Most normal customers have at least one plausible affordable option.

PASS:
Frequent `nothing affordable at all` states do not dominate normal play.

### ECO-Q11 — STRATEGY DIVERSITY
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

### ECO-Q12 — MINIMAL-ENGAGEMENT ECONOMY
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

### ORD-Q89 — LATE-RUN OFFER MIX MEASUREMENT

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

### WALLET
PASS:
- Full-run balance measurement measures 2-slot affordability/use

### D30 PREP START GOLD
Full-run balance measurement reports P10/P25/median/P75/P90.
Target center for normal engaged play:
`median ≈ 1,500G`.

Report Gold In / Out by channel and explain target miss causes.

## RELATED

Generation owner -> `DUNGEON_HAZARD_v2.8.0.md`
Rarity progression / Final price owner -> `ECONOMY_ORDER_v2.8.0.md`
Item catalog -> `ITEM_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Boss/GREED -> `BOSS_v2.8.0.md`
Presentation QA -> `UI_UX_QA_v2.8.0.md`
