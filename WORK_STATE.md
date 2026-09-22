# WORK_STATE

DATE: 2026-09-22
STATE: V2_8_SOURCE_ADOPTION_IN_PROGRESS

## Current Active Task

DIRECTOR REVIEW — v2.8 Presentation Polish Correction implementation.

Review target:
- WORK commit `b7eaea1845b165b4d394352875a2870308415784`
- Store Support / ornament / phase primary actions / Boss major-beat composition
- exact Tutorial §3-7 and SALE Help §4-1..§4-3 adoption
- affected tests / asset completeness

Task 1 remains DIRECTOR PASS.
Task 3 remains unopened.

## Branch / Basis

- repository: `failab-ist/GUILD24`
- branch: `claude/guild24-v28-functional-polish-r3vjt9`
- review HEAD: `b7eaea1845b165b4d394352875a2870308415784`
- implementation truth: current `dist/`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md`

Completed/adoption history: `archive/WORK_HISTORY_v2.8.md`.

## Current Approval / Execution Need

DIRECTOR review found the intended presentation/copy adoption substantially correct, but the correction is not closed.

WORK correction required now:
- remove the duplicate legacy `.relic-plate .stamp[disabled]` rule so one current Store Support state rule remains

Deferred to final v2.8 adoption integration / freeze:
- regenerate the committed font subset after all Player-facing copy adoption is complete
- then run the full `npm test`, including `tests/assets.cjs`

Stale explanatory Source comments are not a runtime blocker and do not justify expanding this closeout patch; clean them only when their touched code is next edited or during final integration hygiene.

No new Design decision is required.

## Next Queue

- WORK performs only the duplicate Store Support state-rule correction
- DIRECTOR re-reviews that narrow diff / targeted verification
- if PASS, close this Presentation correction
- regenerate assets + run full npm test once after remaining v2.8 adoption is complete, during final integration / freeze

## Blocker

WORK CORRECTION REQUIRED — one duplicate Store Support state rule remains. Asset regeneration is intentionally deferred to final integration / freeze.
