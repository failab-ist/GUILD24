# WORK HISTORY — v2.8

DATE_ARCHIVED: 2026-09-22
SOURCE: `WORK_STATE.md`
ROLE: historical implementation/adoption record only
CANONICAL_DESIGN_TRUTH: NONE

This file preserves completed v2.8 implementation/adoption history moved out of `WORK_STATE.md`.
For current work, use `WORK_STATE.md`. For Design Truth, use `design_ssot/SPEC_INDEX_v2.8.0.md`.

## Completed (this adoption line, chronological)

Group A — numeric baselines (merge `bdeb06c`):
- SA-Q39 Item numeric rebaseline, SA-Q40 Fresh native-Stat rebaseline,
  SA-Q41 Great Success Store Gold baseline, SA-Q42 Deep Expedition reward baseline

Task A — Store Support v2.8 (RELIC owner; recovered from `bdeb06c`, NOT from the rejected
Antigravity commit `01d654c`, which was reverted and is preserved only as review evidence):
- §11 exact Store Support copy + prices
- core Store Support mechanics closing audit
- D30 eligibility: default-include minus explicit exclusions
- expeditionCert: guaranteed two distinct Counter slots, without consuming the Black Market row

Task B — SA-Q11, SA-Q18, SA-Q19, SA-Q43, SA-Q44, SA-Q45:
- Great Success signal recomputes only after a committed sale (SA-Q11)
- temporary Event purchase budget shown beside the persistent Wallet (SA-Q18)
- Black Market offer row keeps its 암시장 provenance (SA-Q19)
- non-Canonical random 길드 지원 opportunity retired (SA-Q43)
- hidden NPC pity rarity/potential modifier retired (SA-Q44)
- royal newcomer seated in an existing visitor slot, seats counted on the pre-arrival roster so a
  seated newcomer adds no visitor headcount (SA-Q45, incl. the roster-starved regression fix)

Task C — SA-Q01, SA-Q10, SA-Q12, SA-Q13, SA-Q14, SA-Q35, SA-Q36 (+ a reported DESIGN ISSUE: D10/D20
Boss information beats missing, resolved below under Task D):
- pre-Run Store Management returns to new-Run preparation (SA-Q01)
- Boss art capped on phone, SALE queue stated once (SA-Q10, SA-Q12)
- Loyalty meaning/threshold + one 단골 owner at 51, compact SALE state (SA-Q13)
- a moved Core Stat reads as beneficial/harmful, not generic yellow (SA-Q14)
- repro Seed and dev footer removed from the Player surface (SA-Q35)
- Decoration Flavor prose kept off the purchase-decision surface (SA-Q36)

Task D — Boss cadence + copy adoption (8 commits):
- D0 / D10 / D20 Boss information beats adopted
- approved §8-4 Loyalty popover wording
- approved pre-Run / reset / store-management microcopy, coach marks, two SALE lines
- NPC surfaces state only what is true; arrival lines no longer imply mechanics the game lacks
- global guide replaced by the approved compact Help
- Store Capital vs Gold distinguished; Deep surfaces stop teaching
- approved Flavor + Function adopted for all 22 Events
- font subsets regenerated for the new copy glyphs

Merge to main (adoption branch through `8faa994`):
- Antigravity commit `01d654c` reverted before merge; no rejected behavior survives
- source-derived reports regenerated only to unblock Pages
- integrated browser smoke passed on mobile + desktop with 0 console errors

Opening screen:
- opening copy replaced with the three approved axes
- opening branch branding: title card `던전 앞 편의점` + branch name, memoized pre-Run seed,
  `길드리테일 가맹점` eyebrow removed, branch name pool expanded to 30

SALE quick patch + Core Stat source UX (`4b5f184`):
- 정가 price-burden term made bonus-only:
  `burdenIntentBonus = intentWeight * max(0, intentPivot - burden)`
- owning ECONOMY_ORDER Canonical + QA updated
- Core Stat rows: visible 유리/불리 and separate `?` removed
- changed Stat cell itself opens its existing proven source list

Follow-up UX patch (`bd4371e`):
- shared anchored tip now opens on desktop hover and keyboard focus as required by UI-Q-v28-6
- stale Source comment on the 정가 burden term corrected; no logic change

WORK_STATE refresh (`7ba2688`):
- completed v2.8 adoption cycles and the current main-line state recorded here

Task D — remaining Result UX adoption CLOSED (main through `ce8fad1`):
- SA-Q05 / 06 / 07 / 08 / 09 / 21 / 25 / 30 / 33 / 34 adopted
- Result-Proof corrected to departure-state, semantic-evidence, canonical conditional-Death ordering
- persistent Aftercare + whole-Bag state proof and helped-return proof gate completed
- targeted deterministic/RNG QA + browser run-loop smoke passed

Playtest response batch CLOSED (branch `claude/active-task-implementation-gpe6zh` through `330eec6`,
DIRECTOR review pending merge):
- SA-Q46 SALE compact top: Loyalty `?` popover and Equipment removed from compact top; Bag's two
  slots always horizontal, whole block wraps as a unit
- SA-Q47 D0 Boss-information beat separated from the first Store Support choice; approved
  first-support exact copy adopted
- runtime UX fix (found in review, not a numbered SA-Q): desktop SALE dead-space gap between the
  stat dossier and Trait rows closed; UI-Q109 mobile reading order preserved via CSS flex `order`
- SA-Q48 accessible-mode (50%/정가) purchase need raised to a flat 0.80, Bag penalty retired,
  Counter floor 0.97 added; 바가지 untouched
- SA-Q49 ordinary NPC Wallet on visit raised (fresh base 180, visit income 0..100), then re-measure
  isolated excess purchasing-capacity / Store-Gold expansion; User-approved follow-up narrows visit
  income to 0..80 while keeping fresh base 180 / Level×8 / persistent Wallet / 2000 cap
- SA-Q50 Deep sponsorship base lowered to 200G, no compensating reward/difficulty change
- SA-Q51 `bar`/`herobar` icons replaced (retired Hotbar silhouette -> lunchbox / bottled-water)
- targeted deterministic QA + real-click browser run-loop smoke passed at mobile + desktop widths

Dialogue exposure / repeat adoption CLOSED (branch `claude/active-task-implementation-gpe6zh`
through `ca120f2`, DIRECTOR review PASS; final integration merge deferred until v2.8 close):
- COPY_WORLD_VOICE_v2.8 recent-repeat rule adopted: ARRIVAL/SALE/NIGHT track the last 3 visible
  lines per Surface (cross-NPC) plus each NPC's own immediately previous line, both excluded
  from that Surface's next pick; `Copy.arrive/buy/refuse/night` and `Dungeon.resolve` take `run`
  as a new optional trailing argument, omitting it (every pre-existing direct call) keeps the
  exact old pure hash pick - still no Gameplay RNG read or written
- every ARRIVAL/SALE/NIGHT Pool grown to its named v2.8 minimum size (e.g. visit.back 4->16,
  sale.full/half/overcharge 4->20, night.retreat 4->12; trait-arrival pools to 6 each)
- 대성공 gets its own `night.great` Pool (10 lines) and dispatch branch, first ever - Source used
  to send every non-injury success through `grew`/`plain` with no line naming a Great Success;
  the dead, never-selected `night.supplied`/`night.shaken` Pools are retired into `night.plain`
- targeted deterministic QA (incl. a forced-대성공 resolve check) + real-click browser run-loop
  smoke passed with 0 console errors

Wallet re-measure amendment CLOSED (branch `claude/active-task-implementation-gpe6zh`
through `17b049c`, DIRECTOR review PASS; final integration merge deferred until v2.8 close):
- ordinary NPC visit income narrowed `randomInt(0,100)` -> `randomInt(0,80)`; fresh base 180,
  Level×8, returning persistent Wallet carry, 2000 cap, failed-expedition Loot, SA-Q48 purchase
  acceptance and SA-Q50 Deep sponsorship all left untouched
- ECO-Q-v28-3B Wallet endpoint QA updated 0/100 -> 0/80 and re-proved (fresh/returning formula,
  both RNG endpoints, cap, unchanged RNG draw count, failed-expedition Loot independence)
- targeted regression suite passed; no further balance retune performed

## v2.8 Closeout — moved from WORK_STATE.md (2026-09-23)

Verbatim record of the integration / adoption-audit / freeze / Presentation B5 sections as they stood when
v2.8 was released (main `f2fa299`, Pages run #157). Superseded status lines inside it are history.

## Current Integration Base

- repository: `failab-ist/GUILD24`
- branch: `claude/guild24-v28-integration`
- documentation-hygiene merge: `4eee6a7fb33ca0d6057f2a35c7d7fd4d49be0085`
- audio-fix merge: `937ef037f7013321035b0b00c16bc07a9769faec`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md`

The completed documentation-hygiene and audio-fix follow-ups are now integrated on the common branch.

Completed/adoption history: `archive/WORK_HISTORY_v2.8.md`.

### Documentation Hygiene — Integrated

- source branch: `claude/guild24-v28-doc-hygiene-next`
- merged source HEAD: `43b145ef3ca9d1c91c202e7a7000c615763e54ae`
- current-owner Spec / QA / Copy / Index / Audit hygiene complete
- historical/base inheritance chain reviewed
- no deletion-eligible `design_ssot` owner/QA file found

### Audio Fix — Integrated

- source branch: `claude/guild24-v28-audio-fix`
- merged source HEAD: `c5942d80491d072f90fd73e72a14c9d924b03bd9`
- NIGHT result cue ownership fix complete
- font-subset glyph issue fixed
- audio regression/runtime verification reported PASS by WORK

### Remaining Adoption Audit — Closed

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

Closed 2026-09-23 after the final adoption check (item below). The three rows re-verified at `1d8e6a2`:
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

Final adoption check:
- NPC dialogue pools — MISSING ADOPTION found (287 of 326 approved COPY_AUDIT §16-§20 lines absent; evidence
  `reports/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md`) and CLOSED by `176a8f8`: all pools verbatim; two approved lines
  replaced on User decision (20-3 truth, 19-7 near-duplicate); tests/copy.cjs now guards pools against COPY_AUDIT.
- Resolved in SSOT: injury display order is 투력 -> 강인함 (User 2026-09-23); COPY_AUDIT 5-1 / 6-7 now match
  SA-Q03 and Source.

Do not change Design during the audit.
Any implementation finding enters its own fix cycle.

### Final Integration / Freeze

FROZEN — 2026-09-23, content HEAD `176a8f8` (tree clean). An earlier freeze at `1362bf2` was withdrawn for the
dialogue-pool finding; after its fix the checks were re-run at `176a8f8`: npm test 343; qa-final-prep 136,
qa-boss-confirm 80, qa-final-end 64, qa-final-bosses 63, qa-d0-flow 12, modal focus 16/16; qa:visual clean, only
SALE / NIGHT captures changed and only in the dialogue line; audit output current.

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

Main merge / Pages deploy: in progress (User go-ahead 2026-09-23).

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

### Presentation Batch 5 — Closed / Integrated

- source branch: `claude/guild24-v28-presentation-b5`
- approved source HEAD: `1f76f7965702f6fa51f327ae8d29f9dbea1a43f0`
- fast-forwarded into `claude/guild24-v28-integration` (from `a6c0b1e5ef6c125e2dee56c8ae94fdc2e1e85ef5`; history preserved)
- Presentation Batch 1 / 2 / 3 / 4 / 5: CLOSED
- post-integration QA: PASS (npm test; B5-2 final-prep, B5-3 boss-confirm, B5-4 final-end; qa:visual unchanged;
  Boss backdrop mapping / SHA unchanged)
- Final Freeze: NOT STARTED
- next Presentation batch: NOT STARTED
