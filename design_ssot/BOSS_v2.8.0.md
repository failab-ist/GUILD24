# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_information_cadence,sloth,lust
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=BOSS_v2.7.0.md
PATCH_TYPE=INFORMATION_CADENCE

## INHERITANCE

All unchanged v2.7 Boss selection, numeric modifiers, Final modifier order, SLOTH opportunity
count/power and D25 persisted Final state inherit BOSS_v2.7.0.md.

No Boss numeric balance changes are introduced here.

## FIVE-DAY INFORMATION LOOP — EXACT

Purpose:
normal shop play must not make the Player forget that the Run is building toward a specific Boss.

Cadence:

    D0  investigation begins / D30 Boss objective established
    D5  Boss identity revealed
    D10 second investigation begins: combat anomaly
    D15 exact Boss Trait revealed
    D20 final reconnaissance begins: route/environment
    D25 exact Final Family + Hazard state revealed
    D30 no new reveal

Information question:
- D0 -> D5: WHO is the target?
- D10 -> D15: HOW does this Boss fight?
- D20 -> D25: WHERE / WHAT does the Final expedition face?

Each beat must seek new information.
Do not repeat generic 조사 중 copy without a new question.

## SAME-DAY ORDERING

D0 is the deliberate exception to later milestone ordering:

    first Store Support choice
    -> separate D0 Boss objective/investigation beat
    -> ordinary DAY 1 flow

The D0 objective is not printed inside the first Store Support decision surface.

On D5/D10/D15/D20/D25, the Boss information beat occurs before the same-Day Store Support
decision so the information can matter to the Player.

D30 reuses all already-known information.

## PRESENTATION PAYOFF — v2.8

Boss-information truth and reveal cadence remain unchanged.

UI_UX_v2.8.0.md may strengthen the visual/audio acknowledgement of:
- D0 investigation start
- D5 identity
- D10 combat-question investigation
- D15 exact Trait
- D20 route/environment investigation
- D25 exact Final Family + Hazard state
- D30 Final entry

D30 presentation is not a new information beat.
It may only heighten the transition into FINAL using information already known by D25.

No presentation cue may leak Boss identity, Trait, Final Family/Hazard state or other information
before the owning reveal beat.

## PERSISTENCE

D5/D15/D25 keep their existing persisted seen-state behavior.

D10 and D20 each require a persisted one-time seen marker.
After the Player dismisses that report, save/reload must not replay it.

No new RNG is consumed by merely showing a report.

## META CLEAR SIGNAL CLEANUP

Boss CLEAR continues to feed:
- Job x Boss matrix / Job Mastery
- distinct-Boss unlock progression

## SLOTH TERMINOLOGY

Player-facing SLOTH text uses:
    점포지원

Do not use 유물 for the active Store Support system.
Internal source identifiers may remain relic where renaming code would add unnecessary migration risk.
