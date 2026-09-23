# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_information_cadence,sloth,lust
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # pre-consolidation v2.8 patch; current owner is design_ssot/BOSS_v2.8.0.md
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

    D0  first-Morning briefing / investigation begins / D30 objective established
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
    -> enter DAY 1 MORNING
    -> D0 first-Morning Boss briefing
    -> ordinary DAY 1 MORNING flow

The D0 objective is not printed inside the first Store Support decision surface.
It is the first presentation step of DAY 1 MORNING and must resolve before the ordinary Morning
Event / Gate / ORDER sequence continues.

Exact trigger, acknowledgement and Save/Load contract -> CORE_RUN_v2.8.0.md
§D0 FIRST-MORNING BOSS BRIEFING — EXACT.

On D5/D10/D15/D20/D25, the Boss information beat occurs before the same-Day Store Support
decision so the information can matter to the Player.

D30 reuses all already-known information.


## D0 INFORMATION BOUNDARY — EXACT

D0 teaches the Run objective and investigation cadence only.

It may state:
- the Guild investigation has begun;
- the target will be identified on DAY 5;
- investigation information continues at five-Day intervals;
- on DAY 30 the Player sends 3 grown adventurers to the Demon Castle for the Final subjugation;
- the Player must use the investigation information to prepare that party while keeping the Store
  operating through DAY 30.

D0 must not reveal or depict:
- Boss identity / name;
- Boss character art or silhouette;
- Boss Trait;
- Final Family / Hazard state;
- the per-Boss FINAL domain backdrop.

Exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
D5 remains the first Boss identity / art reveal.

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

D0/D5/D15/D25 keep their persisted seen-state behavior.

D10 and D20 each require a persisted one-time seen marker.
After the Player dismisses that report, save/reload must not replay it.

No new RNG is consumed by merely showing a report.

## GLUTTONY ITEM-STAT SCOPE — EXACT

GLUTTONY reduces only positive Item-sourced Core-Stat increases in the Final.

Affected:
- 투력
- 강인함
- 기동
- 정신

Each positive Item contribution to those Stats is applied at 50%.

Not reduced by GLUTTONY:
- 환경 대응
- 보급
- 보험
- other non-Stat Item effects

Item rarity / price is not a boundary for this Boss effect.
D5 may hint at the abnormal result but does not reveal the exact 50% value.
D15 owns the exact Function disclosure.

## META CLEAR SIGNAL CLEANUP

Boss CLEAR continues to feed:
- Job x Boss matrix / Job Mastery
- distinct-Boss unlock progression

## SLOTH TERMINOLOGY

Player-facing SLOTH text uses:
    점포지원

Do not use 유물 for the active Store Support system.
Internal source identifiers may remain relic where renaming code would add unnecessary migration risk.
