# GUILD24 v2.8 SSOT AUDIT

DOC=SSOT_AUDIT
OWNER=ssot_audit,legacy_cleanup,canonical_coherence
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=CANONICAL_AUDIT_RECORD
AUDIT_STATUS=COMPLETE
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
NONBLOCKING_CANONICAL_DETAIL_GAPS=NONE

## PURPOSE

This file records the completed project-wide v2.8 Canonical audit.

It is audit evidence, not a second Design owner.
Current mechanics, numbers, exact copy, UX contracts and QA acceptance live only in the routed
owners listed by SPEC_INDEX_v2.8.0.md.

## FINAL AUDIT RESULT

The project-wide inheritance chain was reviewed and the v2.8 Canonical routing was closed with:
- no implementation-blocking Design unresolved item
- no remaining Canonical detail gap identified by the audit
- current Source-adoption defects routed to SOURCE_ADOPTION_QA_v2.8.0.md
- current exact truth routed to the owning Spec / QA rather than duplicated here

The audit covered:
- Core / Run / Meta
- Economy / NPC / Dungeon / Item / Store Support
- SALE / NIGHT / CLOSING
- Boss / Final ownership boundaries
- UI / mobile / tutorial / functional presentation / audio
- Copy / terminology / exact Player-facing text
- Event truth
- Source-adoption defect routing
- inherited legacy clauses and historical/base-file boundaries

## CLOSED LEGACY / ROUTING FINDINGS

The audit confirmed that stale inherited/current-chain clauses must not be used as live truth where a
current owner overrides them.

Closed areas included:
- retired Franchise / Start Contract systems
- retired random route / Trait-add / Trait-remove path
- obsolete Item identities and copy after save-safe ID reuse
- obsolete Store Support names/functions/values
- obsolete NIGHT/Fatigue presentation labels
- obsolete supplied-Item speech selection
- obsolete Boss-presence/consumer assumptions
- former Source-only / inherited-PASS3 gaps now owned by current v2.8 Specs
- historical scoped-decoration meaning of the early v2.8 routing/index

Exact replacement truth is intentionally not restated here.

## CURRENT OWNER COVERAGE

Current routed owners cover the audited design areas:

- Core identity / information boundaries -> 00_GAME_CORE_v2.8.0.md
- Run / phase / save / pre-Run / settlement order -> CORE_RUN_v2.8.0.md
- Meta / Job Mastery / Store Capital / Decoration -> META_v2.8.0.md
- Economy / Wallet / purchase acceptance / ORDER -> ECONOMY_ORDER_v2.8.0.md
- NPC / Trait / Loyalty / revisit -> NPC_TRAIT_v2.8.0.md
- Dungeon / Hazard / Supply / Fatigue / result proof -> DUNGEON_HAZARD_v2.8.0.md
- Item catalog / roles / identities -> ITEM_v2.8.0.md
- Store Support -> RELIC_v2.8.0.md
- SALE -> SALE_v2.8.0.md
- NIGHT / CLOSING / result causality -> NIGHT_CLOSING_v2.8.0.md
- UI / UX / responsive / tutorial / presentation / audio -> UI_UX_v2.8.0.md
- Copy-system rules / terminology -> COPY_WORLD_VOICE_v2.8.0.md
- exact Player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md
- Event -> EVENT_v2.8.0.md
- Boss -> BOSS_v2.8.0.md
- Final formula / party / transfer / D25 Final state -> FINAL_EXPEDITION_v2.8.0.md

Current QA owners are routed by SPEC_INDEX_v2.8.0.md.

## HISTORICAL FILES

Historical versioned files are retained only where needed as inherited/base evidence.
They are not parallel current authority.

Examples include v2.5, v2.6 / v2.6.1 and v2.7 owner documents inherited by current v2.8 patches.

Current authority comes only from SPEC_INDEX_v2.8.0.md and its routed owners.

## RELEASE VISION BOUNDARY

archive/v2.8/GUILD24_v2.8_RELEASE_VISION.md is retained as non-Canonical orientation only.

It may explain:
- why v2.8 exists
- large product goals
- desired end-state

It must not carry:
- exact mechanics
- numbers
- exact copy
- Source locations
- QA cases
- implementation instructions

If Vision and SSOT differ, the routed SSOT wins.

## DEFERRED, NOT STALE

Structural/content expansion that remains outside current v2.8 is routed to the v2.9+ deferred
document.

Examples:
- Expedition Purpose structural system
- large Final cutscene/cinematic expansion
- large art/world-content expansion
- drag/minigames/desktop redesign/theme systems
- large Item-content wave
- expanded relationship/meta-power systems

Presentation/audio/functional-design work explicitly present in current v2.8 owners is not deferred.

## SOURCE MISMATCH RECORD

Known Source mismatches are not restated here.

Use SOURCE_ADOPTION_QA_v2.8.0.md for the audit-head defect record.
Use WORK_STATE + current Source + reviewed commits for current resolution status.

## AUDIT CLOSURE

The completed audit established that:
- inherited rules needed by v2.8 have a current owner
- retired clauses are not current authority
- exact copy has a single routed owner
- presentation/audio/functional-design ownership is routed
- measurement-gated balance questions remain findings, not unresolved Design
- no Canonical detail gap remains from this audit

Any later Design change must amend the appropriate routed owner rather than this audit record.

## RELEASE DOCUMENT AUDIT — 2026-09-23

Project-wide pass after the v2.8 release (main `f2fa299`); hygiene only, no Design change.
- historical v2.5-v2.7 files: all 51 still inherited by a current owner (none deletion-eligible); each now
  carries `CURRENT_ROLE=HISTORICAL_BASE` so a directly opened file is not read as current authority
- Presentation Batch 1 / 2 status and the later-phase router no longer read "active"; Batch 2 / 5 owner keys
  scoped to presentation (`order` / `sale` / `final` belong to ECONOMY_ORDER / SALE / FINAL_EXPEDITION)
- SOURCE_ADOPTION_QA records its resolution status (all recorded SA-Q adopted at release)
- the final adoption check found and closed the NPC dialogue-pool MISSING ADOPTION
  (`archive/v2.8/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md`); COPY_AUDIT 5-1 / 6-7 injury order aligned with SA-Q03
- outside the SSOT: WORK_STATE reduced to the current pointer (history moved to
  `archive/WORK_HISTORY_v2.8.md`); README runtime-asset path / deploy / scripts corrected
- left as is: identical exact-copy quotations in QA acceptance / ITEM flavor / NIGHT_CLOSING (no conflict),
  orientation docs (GAME_VISION, v2.8 RELEASE_VISION), the v2.9+ deferred router
- layout (User-approved): the 51 historical files moved unchanged to `design_ssot/history/`; the top level
  holds only the 32 current owners. Full flattening of inheritance chains is deferred to v2.9, per owner.

## CONSOLIDATION — 2026-09-23 (User-approved, pre-v2.9)

- 21 owners that inherited older versions (15 design + 6 QA) are now self-contained current specs;
  the other 11 current files had no chain. Method, per-owner ledgers and `npm run ssot:check`:
  reports/ssot-consolidation/. Every owner passed line accounting plus an independent semantic review.
- Legacy (older versions and each owner's pre-consolidation patch) stays in design_ssot/history/.
- User design decisions taken during the pass: Final `eligible` = Source definition; GREED penalty =
  unmet share of target × cap; GLUTTONY design question / identity; 악바리 fatigue +1 always on.
- Items reported to the User as undecided are listed in each ledger's UNRESOLVED / REVIEW NOTES.

## PRESENTATION PRINCIPLES — 2026-09-23 (User decision)

- The seven presentation owners (PRESENTATION_SYSTEM, PRESENTATION_POLISH, PRESENTATION_POLISH_BATCH1..5;
  Batches 1-5 CLOSED) are replaced by one principles-only owner, PRESENTATION_PRINCIPLES_v2.8.0.md.
  Per-screen layout, pixel values, per-surface component specs, batch scope / stop boundaries, capture
  lists and status history are not carried: implemented detail lives in Source, exact copy in
  COPY_AUDIT_APPROVED_v2.8.0.md.
- The seven files moved unchanged to design_ssot/history/ with `CURRENT_ROLE=HISTORICAL_BASE`; Source /
  test / tool comments that cite them resolve there.
- Pointers updated in SPEC_INDEX, AGENTS.md §2A, UI_UX and UI_UX_QA (ledger REWORD sections;
  `npm run ssot:check` PASS).
