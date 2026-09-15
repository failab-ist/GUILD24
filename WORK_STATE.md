# WORK_STATE

DATE: 2026-09-15
VERSION: v2.6.1 Adoption Recovery
STATE: DESIGN_SSOT_FROZEN / SOURCE_RECOVERY_PENDING

## Truth

- Design SSOT: `design_ssot/SPEC_INDEX_v2.6.1.md`
- Execution plan: `GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`
- Implementation truth: `dist/`
- Future v2.7+ vision is excluded from current recovery.

## Current Gate

v2.5 PASS / measurement history is historical evidence only.
v2.6.1 acceptance is not closed until current Owner Specs / QA are adopted into Source and runtime smoke passes.

Known recovery blocker before source patch:

- Night presentation can hit `ReferenceError: game is not defined` during the SALE → NIGHT injury/report path.

## Repository Hygiene

Superseded SSOT versions and stale generated/historical artifacts are removed from the current working tree in the hygiene pass.
Do not use deleted old SPEC_INDEX / package manifests as current Design Truth.

## Future Planning

- approved future Director vision: `GUILD24_v2.7_PLUS_VISION.md`
- planning label `v2.7+` does not change the current v2.6.1 implementation scope
- when v2.7 begins, the approved vision must be promoted into the relevant owner Specs / QA before WORK implementation

## Next

Run v2.6.1 Adoption Recovery against the current Owner Specs / QA, then frozen QA / browser smoke.
Anything outside current Owner Specs is a separate finding; do not silently change Design.
