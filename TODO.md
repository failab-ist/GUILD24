# Work queue

v2.4 Full Adoption is complete through Chunk H on `claude/v2.4-full-adoption` (HEAD `d24c35d`).
Design documents (`canonical/`) are frozen at v2.4.0 and were not changed at any point.
Start from `reports/V2_4_FINAL_REPORT.md`.

**No balance numeric may change without explicit User approval** —
`reports/V2_4_EXECUTION_PLAN.md` §10 is the gate.

| ID | Priority | Status | Item | Where |
| --- | --- | --- | --- | --- |
| U01 | P0 | **USER DECISION** | Final difficulty. Decide whether the baseline is a fresh account (clear 3.3%) or a progressed one (15.8%), then decide whether Boss Power moves at all. Measured, not applied. | FINAL REPORT §10-1 |
| U02 | P0 | **USER DECISION** | Minimal-engagement meta farming. Per run normal play wins on every axis, but per player action a no-sale / meta-farm run is 2.7-3.6x more XP-efficient and still ~1.7x when repeated. Unlocks stay locked without engagement. Decide whether this is a problem and, if so, the direction for the discovery-reward term. | FINAL REPORT §10-2 |
| U03 | P0 | DECISION | Merge `claude/v2.4-full-adoption` to `main` — after U01 and U02. | FINAL REPORT §14 |
| B01 | P1 | BUG — OPEN | Report generator (`npm run audit`) references a retired v2.1 item and aborts partway. `reports/COVERAGE.md` and `reports/TRAITS.md` are stale at v2.1 content as a result. Shipped game unaffected; the generator is not part of `npm test`. | FINAL REPORT §6-C |
| A01 | P1 | BLOCKED — NOT DELIVERED | Approved 203-name package. Approved but not adopted; carries a production gender-tag matching requirement. No partial adoption exists. | FINAL REPORT §11 |
| A02 | P1 | BLOCKED — NOT DELIVERED | Production NPC asset pool. The 5 PNGs currently in the build are layout-test examples, not a content decision. Swapping the pool requires no screen or layout change. | FINAL REPORT §7, §11 |
| P01 | P2 | HUMAN PLAYTEST | Sale rhythm, Night pacing, event frequency feel, new-player learning curve, NPC attachment, whether preparation feels like judgement, real-device handling, and whether the farming efficiency edge actually feels attractive. | FINAL REPORT §10-5 |
| V01 | P2 | TODO | Deeper verification not attempted this pass: per-relic causal ROI, per-hazard independent pity counters, full-unlock-state strategy comparison, revisit payback timing. | FINAL REPORT §13 |

Completed chunk records live in `reports/_checkpoint_log.md`, not here.
