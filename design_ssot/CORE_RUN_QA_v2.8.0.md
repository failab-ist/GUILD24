# CORE_RUN QA

DOC=CORE_RUN_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=CORE_RUN_QA_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION_QA

## INHERITANCE

All v2.7 Core Run QA remains active except where this patch explicitly overrides Start Contract / Franchise behavior.

## RUN-Q-v28-1 — NO ACTIVE START CONTRACT

PASS:
- new Run does not require a Start Contract selection
- no retired Franchise Grade can lock Run start
- Run uses the confirmed/frozen Decoration loadout

FAIL:
- retired contract selection remains an active prerequisite
- hidden contract state still changes active effects

## RUN-Q-v28-2 — LOADOUT FREEZE

PASS:
- only owned Decorations can be selected
- at most one active Decoration per Slot
- loadout is fixed after Run start
- reload preserves the same Run loadout

## RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT

Owner rule: `META_v2.8.0.md` §STORE CAPITAL.

PASS:
- an eligible Run settles exactly once
- Store Capital Gain is the Run's actual Gross Sales multiplied by the reached-Day rate
- every approved Day band uses the exact owner rate
- Gross Sales 0 produces Store Capital 0
- bankruptcy / Death-limit / Final failure may still earn Store Capital from actual Gross Sales
- Boss CLEAR adds no extra Store Capital multiplier
- reload cannot double-credit
- manual Run Abandon / explicit retirement credits 0

FAIL:
- Ending Gold changes Store Capital when Gross Sales and reached Day are held equal
- remaining Inventory changes Store Capital when Gross Sales and reached Day are held equal
- Store Capital is derived from a second Meta-only sales counter
- a failed Run is forced to 0 solely because it failed

## RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION

PASS:
- two Runs with equal Gross Sales and equal reached Day receive equal Store Capital even if their
  Ending Gold / remaining Inventory differ
- existing Closing liquidation, rescue and bankruptcy behavior remains unchanged inside the Run
- ordinary and Final sales that already count toward Gross Sales enter the Meta calculation once

FAIL:
- the retired net-asset formula `max(0, Ending Gold + Inventory Liquidation Value)` remains an
  active Store Capital input
- Final sales are omitted from Gross Sales or counted twice

