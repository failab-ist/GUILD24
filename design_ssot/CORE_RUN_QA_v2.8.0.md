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

After exact conversion rates are approved, QA must verify:
- eligible Run settles exactly once
- final Gold and remaining stock use the authoritative settlement inputs
- reload cannot double-credit
- manual Run Abandon credits 0

Numeric rate assertions are intentionally pending the integrated balance approval and must not be invented by WORK.
