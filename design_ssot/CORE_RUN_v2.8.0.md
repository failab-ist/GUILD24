# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline,fresh_init,tutorial_reset,meta_settlement,pre_run_loadout
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=CORE_RUN_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION

## CURRENT EXECUTION SCOPE

This v2.8-named file is a **scoped Decoration Package design source for the current v2.7 cycle**, not a project-wide v2.8 adoption directive.

Apply only the Decoration/Store-Capital replacement work explicitly owned here.
All unrelated systems and balance owners remain on their current v2.7 routes through `SPEC_INDEX_v2.7.0.md`.

## INHERITANCE

Save v8 behavior, D0~D30 Final timeline, tutorial reset, start stock, D25 persisted Final state, D30 preparation flow, and all unchanged Run rules inherit `CORE_RUN_v2.7.0.md`.

This patch changes pre-Run Meta selection and Run-end Meta settlement.

## PRE-RUN FLOW

v2.7 Start Contract selection is retired.

Active v2.8 pre-Run sequence:

```text
new Run
-> choose/evaluate owned Decoration loadout
-> confirm loadout
-> DAY 0 first Relic / 점포지원 flow
-> ordinary Run
```

There is no active Franchise Grade check and no Start Contract card selection.

The initial Decoration-package content has only one Decoration per Slot, so a Slot with exactly one owned option may be auto-selected by UI.
The underlying state still stores a Slot-based loadout so later same-Slot alternatives do not require a schema redesign.

Once the Run begins, Decoration loadout is frozen for that Run.

## RUN START EFFECT APPLICATION

Active Decoration effects are read once through the current Run's fixed loadout and then applied through their existing gameplay channels.

The initial four effects are owned by `META_v2.8.0.md`.

Do not keep the retired `contract` choice as a hidden second source of the same effects.

## RUN-END STORE CAPITAL SETTLEMENT

A normal Run end computes Store Capital settlement exactly once.

Inputs:
- final current Gold
- remaining Inventory valued by the existing liquidation value basis
- reached Day band

Manual Run Abandon / explicit retirement yields 0 Store Capital.

Exact conversion rates remain unresolved until the integrated v2.8 balance proposal is approved.

Save/reload must not:
- double-credit Store Capital
- reroll settlement
- reopen an already-settled Run for another payout

## SAVE BOUNDARY

Do not choose a new Save generation number merely from this document.

The v2.8 implementation plan must inspect the actual v8 schema impact of:
- persistent Store Capital
- owned Decoration IDs
- pre-Run/Run-frozen Decoration loadout
- retired Franchise fields

and propose the smallest safe current-internal-build approach before Source adoption.

The archived v2.7 Franchise implementation is historical code, not a migration source.

## RELATED

Meta ownership -> `META_v2.8.0.md`  
Decoration presentation -> `UI_UX_v2.8.0.md`
