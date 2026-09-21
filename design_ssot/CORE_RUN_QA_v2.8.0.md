# CORE_RUN QA

DOC=CORE_RUN_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=CORE_RUN_QA_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_V2_8_QA

## INHERITANCE

All non-conflicting v2.7 Core Run QA remains active.

## RUN-Q-v28-1 — NO ACTIVE START CONTRACT / FRANCHISE

PASS:
- new Run does not require Start Contract selection
- no Franchise Grade locks Run start
- Run uses frozen Decoration loadout

## RUN-Q-v28-2 — LOADOUT FREEZE

PASS:
- only owned Decorations selectable
- max one active Decoration per Slot
- loadout fixed after Run start
- reload preserves same Run loadout

## RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT

PASS:
- eligible Run settles exactly once
- actual Gross Sales x reached-Day rate
- Gross Sales 0 -> Capital 0
- bankruptcy / Death-limit / Final failure may still earn from actual business
- Boss CLEAR adds no multiplier
- manual abandon -> 0
- reload cannot double-credit

## RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION

PASS:
- equal Gross Sales + reached Day -> equal Capital despite Ending Gold/Inventory difference
- Final transfers already counted in Gross Sales enter once
- retired net-asset formula is inactive

## RUN-Q-v28-5 — BOSS INFORMATION ORDER

D0:
- first Store Support choice is shown and committed before D0 Boss information
- D0 Boss objective is not embedded in the Store Support takeover
- after the support choice, D0 opens as a separate information beat
- acknowledging D0 proceeds to ordinary DAY 1
- reload does not duplicate a consumed D0 beat
- presentation consumes no extra gameplay RNG

For D5/D10/D15/D20/D25:
- due Boss information is shown before same-Day Store Support decision
- D10/D20 dismiss state persists
- reload does not replay a consumed report
- showing a report consumes no gameplay RNG

D30:
- no new Boss reveal
- uses persisted D25 Final state

## RUN-Q-v28-6 — ITEM ID REUSE / SAVE

v2.8 meal/water replacement reuses existing Item IDs.

PASS:
- current internal v8 save loads without requiring a new schema solely for those identity changes
- active references resolve to current v2.8 Item identities
- no second legacy Hotbar Item is created
