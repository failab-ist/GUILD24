# WORK_STATE

DATE: 2026-09-14
VERSION: v2.6.1 Adoption Recovery
STATE: DESIGN_SSOT_FROZEN / SOURCE_RECOVERY_PENDING

## Truth

- Design SSOT: `design_ssot/SPEC_INDEX_v2.6.1.md`
- Execution plan: `GUILD24_v2.6.1_ADOPTION_RECOVERY_PLAN.md`
- Implementation truth: `dist/`
- Future v2.7 plan is excluded from current recovery.

## Current Gate

v2.5 PASS / measurement history is historical evidence only.
v2.6.1 acceptance is not closed until current Owner Specs / QA are adopted into Source and runtime smoke passes.

Known recovery blocker before source patch:

- Night presentation can hit `ReferenceError: game is not defined` during the SALE → NIGHT injury/report path.

## Repository Hygiene

Superseded SSOT versions and stale generated/historical artifacts are removed from the current working tree in the hygiene pass.
Do not use deleted old SPEC_INDEX / package manifests as current Design Truth.

## Next

Run v2.6.1 Adoption Recovery against the current Owner Specs / QA, then frozen QA / browser smoke.
Anything outside current Owner Specs is a separate finding; do not silently change Design.
