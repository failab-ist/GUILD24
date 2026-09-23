# PRESENTATION POLISH — BATCH 3

DOC=PRESENTATION_POLISH_BATCH3
OWNER=presentation_batch3_routing
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_EXECUTION_ROUTING
STATUS=ACTIVE_BATCH_3

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
1. NIGHT
2. CLOSING
3. END / ENDFAIL

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

Before implementation:
- identify the exact owner clauses through SPEC_INDEX;
- compare END and ENDFAIL runtime states;
- preserve the resolved ending and settlement truth;
- remove web-page / generic modal presentation only where current Source actually exhibits it.

Do not add a new meta-settlement or cinematic layer.

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
