# PRESENTATION POLISH — BATCH 3

DOC=PRESENTATION_POLISH_BATCH3
OWNER=presentation_batch3_routing
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # detail superseded by PRESENTATION_PRINCIPLES_v2.8.0.md (principles only; implemented detail lives in Source)
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_EXECUTION_ROUTING
STATUS=CLOSED_BATCH_3

## PURPOSE

This file does not redefine NIGHT / CLOSING / END design.
It routes the active Presentation work to the existing canonical owners in small reads.

Batch 3 surfaces:
- NIGHT
- CLOSING
- END
- ENDFAIL

Work sequentially.
Do not polish all four surfaces in one pass.

Execution order:
1. NIGHT — CLOSED by User review
2. CLOSING — CLOSED by User review
3. END / ENDFAIL — ACTIVE

Each surface stops for DIRECTOR / User screenshot review before the next begins.

## READ BOUNDARY

Always read:
1. AGENTS.md
2. SPEC_INDEX_v2.8.0.md
3. PRESENTATION_SYSTEM_v2.8.0.md
4. this file

For NIGHT:
- PRESENTATION_POLISH_v2.8.0.md only NIGHT clauses
- NIGHT_CLOSING_v2.8.0.md only NIGHT / result hierarchy clauses
- UI_UX_v2.8.0.md only NIGHT layout clauses when needed
- UI_UX_QA_v2.8.0.md UI-Q-v28-9 / 23 and relevant global presentation QA
- current NIGHT Source only

For CLOSING:
- PRESENTATION_POLISH_v2.8.0.md only CLOSING clauses
- NIGHT_CLOSING_v2.8.0.md only CLOSING clauses
- UI_UX_v2.8.0.md only CLOSING clauses when needed
- UI_UX_QA_v2.8.0.md UI-Q-v28-13 / 17 and relevant global presentation QA
- current CLOSING Source only

For END / ENDFAIL:
- use SPEC_INDEX to route exact current owner first
- read only the ending / Run-end clauses needed from CORE_RUN / UI_UX / QA
- current END Source only

Do not full-read unrelated owner documents.

## DESIGN BOUNDARY

No new gameplay, reward, probability, Save field, Gameplay RNG, result category or hidden information.

Do not rewrite outcome truth.
Do not invent a new ending system.
Do not add a cinematic framework.

Presentation may only strengthen the existing resolved state.

## NIGHT REVIEW CONTRACT

Canonical truth remains in PRESENTATION_POLISH + NIGHT_CLOSING.

Before implementation, inspect the current runtime at PHONE 390 and DESKTOP 1280.

The NIGHT review must ultimately cover materially different resolved states already owned by the game:
- ordinary return / success
- Great Success
- retreat
- injury
- severe injury
- Death
- proven rescue / avoided-death when reachable

Do not judge NIGHT from one generic result only.

Key review questions:
- Is Outcome the first reading inside the character/result identity rather than a generic full-width result title?
- Do materially different Outcomes feel different without creating different screen architectures?
- Is proven Item causality subordinate to Outcome and only shown when proof exists?
- Is the aftermath hierarchy readable in the canonical order?
- Does Death remove growth/settlement payload and living speech treatment?
- Is the NIGHT handover Primary unmistakably active cold-blue, with `전체 건너뛰기` Secondary?

Do not add ornamental frames merely to differentiate Outcomes.
Use current result truth, typography, contrast, tag/silhouette, motion and existing audio system.

## CLOSING REVIEW CONTRACT

Closing remains an economics-only receipt / tape.

Review:
- one integrated receipt language, not KPI cards;
- no duplicated NIGHT expedition-impact content;
- no internal accounting tutorial prose;
- only the next meaningful action receives Controlled Pop;
- settlement numbers remain easy to scan on phone and desktop.

Do not create a reward-summary dashboard.

## END / ENDFAIL REVIEW CONTRACT

END and ENDFAIL must present the already-resolved Run ending clearly and economically.

This was the final Batch 3 sub-phase (Batch 3 CLOSED).

Canonical ending truth:
- END headline is derived from the already-resolved Run ending;
- the ending ledger reports only what this Run actually moved;
- Store Capital settlement is the recorded settlement truth, not a recomputation;
- ending Gold / remaining Inventory are not Store Capital inputs;
- sent-off Final members and their last carried supply are shown only when the existing Final report owns them.

Before implementation:
- inspect PHONE 390 and DESKTOP 1280 for both current END and ENDFAIL;
- compare at least one Boss-clear END and one Final-failure ENDFAIL through the current harness;
- where reachable through existing fixtures / supported game paths, inspect non-Final normal endings
  such as bankruptcy or death-limit closure for presentation regressions;
- preserve the resolved ending, settlement, unlock and progression truth;
- remove web-page / generic modal presentation only where current Source actually exhibits it.

Presentation hierarchy:
    ENDING STATEMENT
    -> REASON
    -> run-moved progression / Store Capital settlement
    -> Final party / last supply evidence when owned
    -> next-store Action

The ending tape is already the owned object language.
Do not replace it with a hero banner, achievement dashboard, KPI grid or cinematic takeover.

The next-store Action belongs to the ending object and must read as the one remaining action,
but must not overpower the ending statement / settlement.

Desktop may take one restrained responsive step if the current END still reads as a phone-sized
receipt in a large viewport. If scaled, keep the same information architecture and scale the tape,
type and Action coherently. Do not infer CLOSING's exact desktop measure as an automatic END value;
review END on its own screenshot.

Do not add a new meta-settlement or cinematic layer.
Do not add standing progression totals that did not move in this Run.
Do not duplicate unlock / settlement facts in a second notification surface.

Required END evidence:
- END 390 BEFORE / AFTER
- END 1280 BEFORE / AFTER
- ENDFAIL 390 BEFORE / AFTER
- ENDFAIL 1280 BEFORE / AFTER
- one screenshot where Final members / last supply are present, if the clear path owns them
- one screenshot where no such Final-party evidence exists, to verify the region leaves no dead gap

## EVIDENCE

Base harness:
- npm run qa:presentation:batch3:fast
- npm run qa:presentation:batch3:before
- npm run qa:presentation:batch3:after

Base captures:
- NIGHT
- CLOSING
- END
- ENDFAIL

Base capture is only layout evidence.

NIGHT additionally requires controlled runtime evidence for its materially different Outcome states.
Use existing test fixtures / public game state / current supported harness mechanisms.
Do not fake DOM text or invent Outcome state.

Each implementation cycle reports:
- 390 BEFORE / AFTER
- 1280 BEFORE / AFTER
- additional state screenshots required by that surface
- changed files
- asset inventory
- npm test
- targeted visual QA

Do not self-declare PASS.
Stop after each surface for DIRECTOR / User review.
