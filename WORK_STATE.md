# WORK_STATE

DATE: 2026-09-23
STATE: V2_8_FINAL_FROZEN

## Current Integration Base

- repository: `failab-ist/GUILD24`
- branch: `claude/guild24-v28-integration`
- documentation-hygiene merge: `4eee6a7fb33ca0d6057f2a35c7d7fd4d49be0085`
- audio-fix merge: `937ef037f7013321035b0b00c16bc07a9769faec`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md`

The completed documentation-hygiene and audio-fix follow-ups are now integrated on the common branch.

Completed/adoption history: `archive/WORK_HISTORY_v2.8.md`.

## Documentation Hygiene — Integrated

- source branch: `claude/guild24-v28-doc-hygiene-next`
- merged source HEAD: `43b145ef3ca9d1c91c202e7a7000c615763e54ae`
- current-owner Spec / QA / Copy / Index / Audit hygiene complete
- historical/base inheritance chain reviewed
- no deletion-eligible `design_ssot` owner/QA file found

## Audio Fix — Integrated

- source branch: `claude/guild24-v28-audio-fix`
- merged source HEAD: `c5942d80491d072f90fd73e72a14c9d924b03bd9`
- NIGHT result cue ownership fix complete
- font-subset glyph issue fixed
- audio regression/runtime verification reported PASS by WORK

## Remaining Adoption Audit — Closed

Completed audit batches:

### UI-Q-v28-21 / 25
- UI-Q-v28-21 — CLOSED / PASS: the implemented live-store trace family is equipped Decoration; controlled acceptance now verifies owning-state add/remove, Save/Load reproduction, presentation-only behavior and frozen Run-loadout ownership
- UI-Q-v28-21 closeout commit: `04c591cecd3220f1adf270f5b7d1254d7d8f5435`
- UI-Q-v28-25 — PASS: targeted Item / NPC / Decoration / Boss graphic identity, crop and scale protections are adopted and guarded; reviewed browser/visual evidence exists for the changed surfaces

### UI-Q-v28-26 / 27
- UI-Q-v28-26 — RUNTIME MATRIX / HARNESS GAP CLOSED by `ea3c87e9787f614d3751e9e9e20af0682714413e`: current qa:visual now covers 360 / 390 / 412 / 430 / 1024 / 1280 and the active Player-facing surface matrix
- UI-Q-v28-26 — DIRECTOR VISUAL REVIEW PENDING: three Canonical acceptance rows remain manual/visual judgments (information priority, comparison-before-decision, compact-mobile required-information retention); the generated captures are gitignored and were not available to DIRECTOR in this review session
- UI-Q-v28-26 — no Source Runtime UX Bug is classified from the automated/runtime measurements reported by WORK
- UI-Q-v28-27 — CLOSED / PASS: contextual Deep / Great Success coach acceptance now verifies shipped copy/selector truth, visible breakpoint target, spotlight bounds, bubble/dock/action non-overlap, automatic-scroll readability, missing-target skip and phone/desktop semantic equivalence
- UI-Q-v28-27 closeout commit: `ea3c87e9787f614d3751e9e9e20af0682714413e`

### UI-Q-v28-28 / 29
- UI-Q-v28-28 — Source implementation PASS: D0 / D5 / D10 / D15 / D20 / D25 cadence, D10/D20 64px identity portraits, D5/D15 240px phone art, D25 200px phone art, centered major-beat anchor, persisted seen state and D30 no-new-reveal reuse are present
- UI-Q-v28-28 — RUNTIME QA GAP: current-build controlled acceptance does not yet exercise every D0 / D5 / D10 / D15 / D20 / D25 / D30 state on both phone and desktop
- UI-Q-v28-29 — FAIL / RUNTIME UX BUG: modal close does not reliably return focus to the control that opened it; `setModal(null)` overwrites the saved opener with the currently focused modal control before the modal DOM is removed
- UI-Q-v28-29 — TEST GAP: existing guards cover same-surface redraw focus, modal-internal redraw focus, ORDER row anchoring and state styling, but no runtime acceptance currently proves modal-close origin restoration

No Design change is required from these batches.

Adoption closeout (2026-09-23, integration `1d8e6a2`; re-verified on current evidence, no new FAIL):
- UI-Q-v28-26 — CLOSED: the three visual rows were reviewed by DIRECTOR / User on the Presentation B1-B5
  screenshots; qa:visual clean across 360 / 390 / 412 / 430 / 1024 / 1280
- UI-Q-v28-28 — CLOSED: runtime D0 (qa-d0-flow 12/12), D5-D25 (qa:visual 30/30 at six widths; B4 harness
  clean), D30 (qa-final-bosses 63/63; B5-1..B5-4 harnesses) on phone and desktop
- UI-Q-v28-29 — CLOSED: setModal() saves the opener only when a sheet first opens and restores it on close;
  guarded by ui-guard; runtime close-by-닫기 / Escape returns focus to the opener (390 / 1280), and the B5
  sheets are covered by qa-boss-confirm / qa-final-prep

### FINAL supply action audio cue ownership
- PASS: `case 'supply'` currently resolves through the SALE register family via the existing default `sound()`
- this is semantically valid because the current Final owner defines committed Final Item transfer as familiar SALE handling at the fixed ordinary 50% / 매입가 amount and as a real paid transaction
- Final transfer reduces NPC Wallet, increases Player Gold and increases Gross Sales exactly once
- current Audio owner requires the heavy distinct FINAL cue at the Final commit, not at each Final Item transfer
- no new cue, asset or Source change is required

Remaining Adoption Audit has no further DIRECTOR review target after the open QA / fix cycles above.

Do not change Design during the audit.
Any implementation finding enters its own fix cycle.

Do not change Design during the audit.
Any implementation finding enters its own fix cycle.

## Execution Boundary

For each next task:

```text
one narrow audit batch
-> inspect current Canonical + relevant Source
-> classify findings
-> report
-> STOP
```

Fix cycles are separate from audit cycles.
Do not combine unrelated fixes or begin Final Freeze inside a Remaining Adoption Audit batch.

## Final Integration / Freeze

FROZEN — 2026-09-23, content HEAD `1362bf2` on `claude/guild24-v28-integration` (tree clean).

- Canonical -> Source adoption audit: CLOSED (see Remaining Adoption Audit)
- targeted regression: PASS - npm test 342; qa-final-prep 136, qa-boss-confirm 80, qa-final-end 64,
  qa-final-bosses 63, qa-d0-flow 12, B4 harness clean
- mobile/desktop runtime UX smoke: PASS - qa:visual 126 captures at 360-1280, byte-identical to the
  pre-integration baseline; B3 END / ENDFAIL identical to the approved B3 captures
- save/load invariants: PASS - npm test SAVE/LOAD, Final Lock reload, legacy Final save, reload
  idempotence of the ended Run (qa-final-end)
- Gameplay RNG invariants: PASS - npm test RNG guards; forecast / preview / confirm draw no RNG;
  one Final Roll per resolution
- remaining Balance Finding report: measurement only, no new BALANCE FINDING asserted - `npm run balance`
  (300 seeds/cohort): D30 reach 0-12% and first-Run clear 0-5.7% across the policy bots; no approved numeric
  target exists for these, they stay measurement-gated (SPEC_INDEX), and the Final Roll / Boss values are not
  retuned to a clear rate (FINAL_EXPEDITION)
- Pages deploy gate reproduced locally: npm test + npm run audit leave no diff

Main merge / Pages deploy: NOT STARTED (pending User approval).

Final Freeze begins only after:
- remaining adoption audit is closed
- resulting fix cycles are closed

Final Freeze includes:
- Canonical -> Source adoption audit
- targeted regression across changed systems
- mobile/desktop runtime UX smoke
- save/load invariants
- Gameplay RNG invariants
- remaining Balance Finding report

## Blocker

No known blocker at this state.


## Presentation Batch 5 — Closed / Integrated

- source branch: `claude/guild24-v28-presentation-b5`
- approved source HEAD: `1f76f7965702f6fa51f327ae8d29f9dbea1a43f0`
- fast-forwarded into `claude/guild24-v28-integration` (from `a6c0b1e5ef6c125e2dee56c8ae94fdc2e1e85ef5`; history preserved)
- Presentation Batch 1 / 2 / 3 / 4 / 5: CLOSED
- post-integration QA: PASS (npm test; B5-2 final-prep, B5-3 boss-confirm, B5-4 final-end; qa:visual unchanged;
  Boss backdrop mapping / SHA unchanged)
- Final Freeze: NOT STARTED
- next Presentation batch: NOT STARTED
