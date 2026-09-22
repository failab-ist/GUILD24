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

WORK correction required:
- remove the duplicate legacy `.relic-plate .stamp[disabled]` rule so one current Store Support state rule remains
- update stale Source comments that still describe the retired bolted-brass / art-after-facts presentation
- regenerate the committed font subset after the new exact copy and rerun the real full `npm test`; `tests/assets.cjs` is part of `npm test` and cannot be reported as PASS while it fails

No new Design decision is required.

## Next Queue

- WORK performs only the small correction above
- DIRECTOR re-reviews the resulting diff / full test result
- if PASS, close this Presentation correction and continue to final v2.8 integration / freeze audit

## Blocker

WORK CORRECTION REQUIRED — current build has an asset-test failure and stale/duplicate Source residue.
