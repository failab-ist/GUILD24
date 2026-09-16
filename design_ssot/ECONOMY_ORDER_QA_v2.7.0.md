# ECONOMY_ORDER_QA

DOC=ECONOMY_ORDER_QA
OWNER=qa,economy,order,reroll,wallet,gate_count_forecast,tier_forecast
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

## RELATED

Generation owner -> `DUNGEON_HAZARD_v2.7.0.md`
Presentation QA -> `UI_UX_QA_v2.7.0.md`
