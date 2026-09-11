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
| C01 | `dist/ui/app.js` is 61KB / 29% of the source and stays one file. **This is a recorded measurement, not a reserved refactor.** The split was examined and turned down on its merits: the file is inside an IIFE, so 69 shared bindings would have to be rehomed, and density has to be unpicked first or the split buys nothing. Editing this file does not oblige anyone to split it, and a v2.5 task happening to touch it is not a reason on its own. Reopen only if the IIFE / shared-binding structure is shown to be obstructing a real v2.5 change — and even then, try local density work first, because that is what makes edits hard here; if the split is still not demonstrably needed, it stays on hold. If it is ever done, it is its own task, never folded into a feature or a bug fix. See `reports/CODE_REVIEW_v2.4.md` §3. |
| C02 | The font-subset check scans every character in `dist`, comments included, so a Korean comment costs shipped font bytes for text no player ever sees. The v2.4 close keeps the fonts at the measured baseline by writing new engine comments in ASCII; that is a convention, not a tool. Teaching the scan to skip comments would be more correct, but it needs a parser that does not mistake `//` inside a string for a comment — deliberately not attempted. |
| C03 | No remote CI. The pre-commit hook (`npm run hooks`) is a local line of defence only. |
| C04 | **NON-BLOCKING IMPLEMENTATION BUG — accessibility. Not a design question, not a user decision, no Canonical involved.** Keyboard focus is lost whenever a redraw happens under an open modal: `renderModal()` rebuilds `#modal-root` wholesale on every redraw, destroying the focused control inside it, so focus falls to `<body>` while the modal is still open and a keyboard user has to tab back from the top of the document. Reached by a real path — open the shop menu, tap sound on/off. Confirmed identical before and after the v2.4 focus work, and it lives in a different owner (`#modal-root`, not `#app`), so it was measured and filed rather than widened into the v2.4 close. Fix it as its own small source patch whenever v2.5 next works in `app.js`; nothing has to be approved first. `npm run qa:visual` reports it as a warning on every run. |

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
- `app.js` split — **not planned** (**C01**). Recorded here only so it is not re-derived from scratch: examined, turned down, and conditional on measured pain rather than on any v2.5 task touching the file
- Font subset should ignore comments (**C02**)
- Remote CI (**C03**)

### Verification
- Deeper verification — per-relic causal ROI, per-hazard pity counters, full-unlock-state
  strategy comparison, revisit payback timing
- Human playtest — sale rhythm, night pacing, event frequency, learning curve, NPC
  attachment, whether preparation feels like judgement, real-device handling

---

Completed chunk records live in `reports/_checkpoint_log.md`.
