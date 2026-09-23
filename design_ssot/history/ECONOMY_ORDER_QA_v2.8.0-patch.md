# ECONOMY / ORDER QA

DOC=ECONOMY_ORDER_QA
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # pre-consolidation v2.8 patch; current owner is design_ssot/ECONOMY_ORDER_QA_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=ECONOMY_ORDER_QA_v2.7.0.md
PATCH_TYPE=V2_8_NUMERIC_COHERENCE_QA

## INHERITANCE

All non-conflicting v2.7 Economy / Order QA remains active.

## ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD

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

## ECO-Q-v28-2 — DEEP SPONSORSHIP

Expected:

    base 200G
    rarity step 0.20
    level step 0.05
    rounding 10G

PASS:
- rarity/Level scaling and rounding use the exact values above
- no compensating Deep reward/difficulty rebalance

## ECO-Q-v28-3 — ORDINARY PURCHASE ACCEPTANCE BASELINE

Controlled states reproduce ECONOMY_ORDER_v2.8.0 exactly.

PASS:
- mode charged / intent multipliers remain:
  - 50% = 0.50 / 0.50
  - 100% = 1.00 / 0.65
  - 150% = 1.50 / 1.50
- judgedPrice uses the mode intent multiplier and never changes the actual charged amount
- 50% / 100% base need = 0.80
- 150% uses the owner-defined fit-based need calculation
- flat mode intent remains +0.18 / 0 / -0.16
- one occupied Bag slot applies no purchase penalty
- Loyalty remains +0.002 per point
- current Trait / Store Support / Event modifiers remain active
- only 100% keeps pivot 0.36 / weight 0.50 burden bonus, never a penalty
- effective Wallet includes temporary Event purchase budget
- unaffordable debit -> chance 0
- affordable 50% / 100% canonical Counter -> final chance 0.97
- canonical Counter semantics are reused, including mobility answers for bind/mire
- non-Counter 50% / 100% and all 150% use normal 0.08–0.97 clamp
- 150% receives no new Counter floor

FAIL:
- Bag occupancy subtracts from purchase intent
- a purchase-only Counter test disagrees with canonical Counter truth
- accessibility rebalance silently boosts 150%
- exact probability appears in Player UI
- another surface uses a second acceptance formula

## ECO-Q-v28-3B — ORDINARY NPC WALLET ON VISIT

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

## ECO-Q-v28-4 — BASE OPERATING COST EXACT

Core Roster:
- alive only
- top 6 by Level then Rarity
- recovering alive NPCs count
- fewer than 6 -> all alive NPCs

Expected:

    dayBase = 90 + 2×(Day-1)
    base = dayBase × (1 + .02×(avgLevel-1)) × (1 + .06×avgRarity)

Then apply only current owned modifiers and round final daily operating cost to nearest 10G under
the current rounding convention.

PASS:
- explicit zero-operating-cost Event produces 0G
- Store Support modifiers do not silently redefine the base formula

## ECO-Q-v28-5 — ORDER PITY EXACT

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
