# ECONOMY_ORDER_QA

DOC=ECONOMY_ORDER_QA
OWNER=qa,economy,order,reroll,wallet,gate_count_forecast,tier_forecast,rarity_progression,final_price
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=ECONOMY_ORDER_QA_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here. FAIL is valid evidence.

All unchanged v2.6.1 Wallet / Order / Reroll QA remains inherited.

## ORD-Q80 — MORNING NEXT-DAY GATE COUNT FORECAST

Controlled next-Day generation state with a randomized Gate-count band.

PASS:
- MORNING exposes every possible next-day Gate count with exact probability
- displayed probabilities match the same canonical generation rule used for the next Day
- impossible counts are not presented as possible
- no next-day Family / exact Gate composition / Hazard set is revealed

## ORD-Q81 — FIXED NEXT-DAY GATE COUNT

Controlled next-Day generation state where Gate count is deterministic.

PASS:
- MORNING exposes the fixed count as confirmed/deterministic information
- UI does not fabricate a probability split for a fixed result

## ORD-Q82 — NEXT-DAY TIER FORECAST

PASS:
- MORNING exposes exact T1/T2/T3 probability distribution before ORDER commitment
- values match the canonical next-day Tier-generation distribution
- forecast is not mislabeled as expedition success/death probability

## ORD-Q83 — FORECAST SAVE/LOAD INTEGRITY

For a controlled seeded Run:
- record MORNING next-day Gate-count and Tier forecasts
- save/reload repeatedly without advancing the Day

PASS:
- forecast does not reroll on reload
- the eventual next-Day generation is governed by the same seeded/run generation state represented by the forecast
- no independent forecast-only RNG path exists

## ORD-Q84 — FORECAST INFORMATION BOUNDARY

PASS:
MORNING/ORDER forecast may expose:
- next-day Gate-count distribution/fixed count
- next-day T1/T2/T3 distribution

FAIL if it newly exposes:
- next-day Family
- exact Gate composition
- Hazard set
- future customer identity
- future NPC destination
- exact success/death probability
- recommended SKU/category/quantity

## ORD-Q85 — ORDER FORECAST CONTINUITY

PASS:
- MORNING is the required forecast surface
- ORDER may repeat the same forecast compactly
- repeated ORDER presentation matches MORNING and does not generate a second value

## ORD-Q86 — DAY-BAND RARITY WEIGHTS EXACT

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

## ORD-Q87 — EPIC PROGRESSION WITHOUT HARD D20 UNLOCK

Using the 10 new Epic preparation Items from `ITEM_v2.7.0.md`:

PASS:
- they are eligible through the ordinary Epic pool whenever other general eligibility allows
- no dedicated `day >= 20` gate exists for these 10 Items
- early Epic appearance remains possible but rare through Day-band weights
- D20+ Epic frequency rises because the shared Epic weight rises, not because a hidden second unlock system activates

## ORD-Q88 — REROLL RESPECTS CURRENT-DAY RARITY BAND

PASS:
- rerolled offers use the same Day-band Rarity distribution as the original current-Day offers
- Reroll does not fall back to the old fixed Rarity table
- Reroll does not bypass Item/meta eligibility
- existing pity rules do not create a separate Day-independent base table

## ORD-Q89 — LATE-RUN OFFER MIX MEASUREMENT

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

## ORD-Q90 — FINAL FIXED 50% / WALLET OVERRIDE

Controlled D30 Final preparation with a selected participant and known Item price.

PASS:
- Final transfer price equals the ordinary 50% price-mode amount / 매입가 기준 amount
- 100% and 150% price modes are not available
- no purchase/refusal probability roll occurs
- if Wallet is below the fixed amount, transfer cannot commit
- if Wallet is sufficient and transfer commits, NPC Wallet decreases by exactly the fixed amount
- committed transfer consumes one real inventory stock
- ordinary SALE outside Final still uses its normal 50/100/150 and refusal rules

UNRESOLVED / DO NOT TEST AS PASS YET:
- whether committed Final transfer increases Player Gold
- whether committed Final transfer increases Gross Sales used by GREED

## RELATED

Generation owner -> `DUNGEON_HAZARD_v2.7.0.md`
Rarity progression / Final price owner -> `ECONOMY_ORDER_v2.7.0.md`
Item catalog -> `ITEM_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Boss/GREED -> `BOSS_v2.7.0.md`
Presentation QA -> `UI_UX_QA_v2.7.0.md`
