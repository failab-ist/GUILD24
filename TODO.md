# Work queue

**v2.4 is closed.** The adoption is complete, verified and merged; nothing below is a v2.4
task. Design documents (`canonical/`) are frozen at v2.4.0 and were never changed.
Start from `reports/V2_4_FINAL_REPORT.md`.

**No v2.5 design is pre-implemented in this source.** The v2.5 section is a record of
intended direction only — none of it is canonical yet, and none of it may be built before
its Canonical exists.

---

## v2.4 — OPEN, NON-BLOCKING

Carried past the v2.4 close deliberately. None of these blocks release.

| ID | Item |
| --- | --- |
| B01 | The report generator behind `npm run audit` references an item retired in Chunk A and aborts, leaving `reports/COVERAGE.md` and `reports/TRAITS.md` at v2.1 content. The shipped game is unaffected and the generator is not part of `npm test`. |
| D01 | `README.md` is current; `WORK_STATE.md` is current; the head section of `reports/AUDIT.md` still describes the pre-v2.4 era (it reads as a dated record, not as current state). |
| R01 | Wording / flavour review of the 114 NPC lines — `reports/COPY_REVIEW.md`. Taste only; the lines that made unfounded causal claims were corrected before the v2.4 close. |
| C01 | Split `dist/ui/app.js` (61KB, 29% of the source). Deliberately not done at the v2.4 close — the file is inside an IIFE, so 69 shared bindings would have to be rehomed, and density has to be unpicked first or the split buys nothing. Do it as a standalone task when v2.5 next touches that file. See `reports/CODE_REVIEW_v2.4.md` §3. |
| C02 | The font-subset check scans every character in `dist`, comments included, so Korean comments grow the shipped font (+2.4% this pass). Excluding comments from the scan is more correct but needs care not to strip `//` inside strings. |
| C03 | No remote CI. The pre-commit hook (`npm run hooks`) is a local line of defence only. |

## v2.4 — USER DECISIONS, DEFERRED TO v2.5

Measured, recorded, and **not applied**. Both are absorbed by v2.5 work below.

| ID | Item |
| --- | --- |
| U01 | Final difficulty / Boss Power baseline account state — fresh account clears 3.3%, a progressed one 15.9%. Superseded by the v2.5 Final redesign. |
| U02 | Global Meta XP minimal-engagement farming — a low-interaction run is ~2.6x more XP-efficient per player action, ~1.7x when repeated, while unlocks stay shut. **Not carried as a standalone balance task**: v2.5 redesigns Global Meta Progression around Job Mastery, so this is superseded / absorbed by that work. |

---

## v2.5 — PLANNED / CANONICAL PENDING

Direction of travel only. Each needs its Canonical before any implementation.

### Final / Boss
- 7 Boss / Final redesign
- Boss reveal timing / Final information UX
- Boss / Final balance tuning

### Meta progression
- Job Mastery meta progression — **absorbs U02**, the Global Meta XP farming problem
- Franchise Grade redesign
- Franchise Grade based Start Contract unlock
- Start Contract merit / demerit review
- Percentage-based operating-cost demerit

### Balance
- Job base / growth rebalance
- Economy / daily operating-cost rebalance
- D30 prior-stock economy tuning

### Content / identity
- 203 character name / content adoption
- Fixed Character ID ↔ Name ↔ Portrait adoption
- Production NPC asset adoption
- v2.5 Voice / Wit / COPY polish

### Tooling / documentation
- Audit / report generator repair (**B01**)
- Stale README / TODO / WORK_STATE cleanup (**D01**)
- `app.js` split, once density is unpicked (**C01**)
- Font subset should ignore comments (**C02**)
- Remote CI (**C03**)

### Verification
- Deeper verification — per-relic causal ROI, per-hazard pity counters, full-unlock-state
  strategy comparison, revisit payback timing
- Human playtest — sale rhythm, night pacing, event frequency, learning curve, NPC
  attachment, whether preparation feels like judgement, real-device handling

---

Completed chunk records live in `reports/_checkpoint_log.md`.
