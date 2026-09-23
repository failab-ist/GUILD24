# Legacy harness (inactive)

Moved out of `tools/` and `tests/` at the 2026-09-23 post-release cleanup. Nothing here is run by
`npm test`, CI, or any current QA; none was referenced by a current owner, report, or script.
Kept only as evidence of earlier measurement work. Do not use as current QA.

| File | Why inactive |
|---|---|
| `final_measurement.cjs`, `reverify.cjs` | load Source from a hard-coded Windows absolute path; cannot run elsewhere |
| `qa-task17-strict.cjs`, `qa-task17-strict-fast.cjs` | one-off Task 17 browser checks; default to a Windows Chrome path |
| `v26_acceptance.cjs` | v2.6 acceptance; fails on superseded v2.6 wallet formulas (current rules: SPEC_INDEX_v2.8.0) |
| `v26_metrics.cjs` | v2.6 metric printout |
| `progression-results-v5-*.json` | output of retired `tests/progression.cjs --arm=` candidate arms (v2.5-v2.7 tuning); the baseline `tests/progression-results-v5.json` stays with the live harness |
