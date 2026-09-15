# WORK_STATE

DATE: 2026-09-15
VERSION: v2.7 Design Promoted / v2.6.1 Recovery Gate
STATE: DESIGN_SSOT_V2_7_PROMOTED / SOURCE_V2_6_1_RECOVERY_PENDING

## Truth

- Current Design SSOT: `design_ssot/SPEC_INDEX_v2.7.0.md`
- Implementation truth: `dist/`
- Current Source has **not** adopted v2.7 yet.
- v2.7 source adoption is gated behind closure of the existing v2.6.1 Adoption Recovery acceptance.

## Active Implementation Gate

Before any v2.7 Source implementation:

```text
complete v2.6.1 Adoption Recovery
-> freeze / run its acceptance QA
-> close the recovery gate
-> begin v2.7 adoption from SPEC_INDEX_v2.7.0.md
```

Prerequisite recovery execution document:
`GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`

For that prerequisite recovery cycle only, its frozen acceptance target remains the routed v2.6.1 owner Specs/QA under:
`design_ssot/SPEC_INDEX_v2.6.1.md`

This is an explicit implementation prerequisite target, not the current forward Design SSOT.
Do not introduce v2.7 changes early while closing the recovery cycle.

## Current Recovery Status

v2.6.1 acceptance is not closed until its frozen recovery scope is adopted into Source and runtime smoke passes.

Known recovery blocker from the current recovery state:
- Night presentation can hit `ReferenceError: game is not defined` during the SALE -> NIGHT injury/report path.

Do not mix that recovery fix cycle with v2.7 implementation.

## v2.7 Design Status

v2.7 Owner Specs / QA are now promoted.
Entry point:
`design_ssot/SPEC_INDEX_v2.7.0.md`

Important:
- Director baseline balance values are implementation starting values pending full-run validation.
- frozen QA reports balance findings; it does not auto-tune them.
- `GUILD24_v2.7_PLUS_VISION.md` is now planning/history reference only, not parallel Design Truth.
- v2.8+ deferred ideas are outside v2.7 adoption.

## Next

1. Close the current v2.6.1 Adoption Recovery cycle without adding v2.7 behavior.
2. Freeze/record the recovered Source baseline.
3. Start v2.7 adoption by reading `SPEC_INDEX_v2.7.0.md` and only the routed changed owners/QA needed for each task.
