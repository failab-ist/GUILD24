# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline,fresh_init,tutorial_reset,meta_settlement,pre_run_loadout,boss_information_order
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=CORE_RUN_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_V2_8

## INHERITANCE

Save v8 behavior, D0-D30 Final timeline, tutorial reset, start stock, D25 persisted Final state,
D30 preparation flow and unchanged Run rules inherit CORE_RUN_v2.7.0.md.

## PRE-RUN FLOW

There is no Start Contract selection in the current pre-Run flow.

    new Run preparation
    -> inspect/equip owned Decoration loadout
    -> confirm Run start
    -> DAY 0 first 점포지원 choice
    -> separate DAY 0 Boss-information beat
    -> ordinary DAY 1 flow

Decoration loadout is frozen after Run start.
The pre-Run management screen must have a valid return path to new-Run preparation.

The DAY 0 Boss objective is not embedded above/inside the first Store Support decision.
The first Store Support decision completes first; then the existing Boss-information shell owns the
D0 objective beat before ordinary DAY 1 play.

## RUN START EFFECT APPLICATION

Active Decoration effects read from the Run's frozen loadout.
Run-start effects come only from the frozen active Decoration loadout; no contract state contributes in parallel.

## RUN-END STORE CAPITAL SETTLEMENT

Normal Run end settles Store Capital exactly once from:
- accumulated actual Gross Sales
- reached-Day band

Exact formula/rates -> META_v2.8.0.md.

Bankruptcy, Death-limit closure, Final failure and Boss CLEAR are eligible normal endings.
Manual Run Abandon yields 0 Store Capital.

Ending Gold / remaining Inventory are not Store Capital inputs.

## BOSS INFORMATION TIMELINE

Run presentation order includes:

    D0  first 점포지원 choice -> objective / investigation starts
    D5  identity report
    D10 second investigation start
    D15 exact Trait report
    D20 final reconnaissance start
    D25 exact Final Family/Hazard report
    D30 no new report

D0:
- first Store Support choice resolves first
- then the D0 Boss objective/investigation appears as its own information beat
- only after acknowledgement does ordinary DAY 1 flow continue

On D5/D10/D15/D20/D25:
Boss information occurs before the same-Day Store Support decision.

D10/D20 each persist a consumed/seen state so reload cannot replay them.
D0 likewise must not replay after consumption.

Exact content -> BOSS_v2.8.0.md / COPY_WORLD_VOICE_v2.8.0.md.

## SAVE BOUNDARY

Current internal save generation remains v8 unless Source adoption discovers a real incompatible
schema need.

The v2.8 meal/water identity pass reuses existing Item IDs and does not itself require a migration
or schema bump.

Existing saved IDs resolve to current active identities.

Do not choose a new save generation merely because player-facing names/effects changed.

## RELATED

Meta -> META_v2.8.0.md
Boss cadence -> BOSS_v2.8.0.md
Decoration UI -> UI_UX_v2.8.0.md
