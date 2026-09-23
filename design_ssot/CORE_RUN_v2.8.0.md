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
    -> enter DAY 1 MORNING
    -> D0 first-Morning Boss briefing
    -> ordinary DAY 1 MORNING flow

Decoration loadout is frozen after Run start.
The pre-Run management screen must have a valid return path to new-Run preparation.

The D0 Boss objective is not embedded above/inside the first Store Support decision.
The first Store Support decision resolves first. The Run then enters DAY 1 MORNING, and the D0
briefing is the first presentation step of that Morning before ordinary Morning information or
decisions.

"D0" remains the Boss-information cadence name. It does not mean the briefing is displayed on a
separate playable DAY 0 phase.


## D0 FIRST-MORNING BOSS BRIEFING — EXACT

Purpose:
bridge the opening / first-support setup into the actual 30-Day Run objective before the Player
makes the first ordinary Morning decision.

Trigger:
- only after the first DAY 0 점포지원 choice has resolved;
- only when the Run has entered DAY 1 MORNING;
- before the ordinary DAY 1 Morning Event, Gate detail, ORDER entry or any other ordinary Morning
  information / decision surface.

This is an information beat, not a new gameplay Phase.

Opening the D0 briefing:
- advances no time;
- consumes no Gameplay RNG;
- spends no Gold / Store Capital;
- changes no Inventory, NPC, Gate, Event, Store Support or Boss state;
- does not itself generate the Boss identity, Trait or Final state.

The briefing owns no Boss reveal beyond the Run objective / investigation cadence.
Exact Player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
Boss information boundary -> BOSS_v2.8.0.md.
Presentation -> UI_UX_v2.8.0.md.

Acknowledgement:
- one `확인` action completes the beat;
- ordinary DAY 1 Morning flow must not advance past this beat until it is acknowledged;
- closing / escaping the presentation, if the shell technically permits it, does not consume the
  beat;
- acknowledgement marks the D0 beat seen and persists that state before ordinary Morning resumes.

Save / Load:
- a fresh Run receives this beat exactly once;
- a save made while the DAY 1 beat is still unresolved must still owe the briefing after reload;
- after acknowledgement, reload must not replay it;
- the beat is not implemented as a `day >= 1` catch-up reveal;
- a save already beyond DAY 1 must not receive a retroactive D0 briefing merely because an older
  save lacks the seen marker.

After acknowledgement, the existing Morning owner resumes its normal ordering. D0 does not create a
second Morning Event, second Store Support window or extra decision.

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
- the Run enters DAY 1 MORNING
- the D0 Boss briefing is the first Morning presentation step
- only after acknowledgement does the ordinary DAY 1 Morning sequence continue
- D0 is informational and does not become a permanent Phase

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
