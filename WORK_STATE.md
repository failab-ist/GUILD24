# WORK_STATE

DATE: 2026-09-22
STATE: V2_8_SOURCE_ADOPTION_IN_PROGRESS

## Current Active Task

DIRECTOR — Presentation Polish Correction / Canonical cleanup / current-Source mismatch audit.

Scope:
- promote the User's latest Presentation direction into the routed UI/UX Canonical + QA
- promote the four User-approved Tutorial copy lines into the exact Copy owner
- remove duplicated SALE Help exact-copy truth from COPY_WORLD_VOICE when COPY_AUDIT_APPROVED owns it
- inspect only the affected current Source after Canonical cleanup
- report only remaining presentation conflicts, split into implementable vs User-decision-needed

Do not implement Task 3 Source changes in this Director task.
Task 1 is DIRECTOR PASS and is not reopened.
Task 2 functional Tutorial/Boss work is DIRECTOR PASS; only the newer User-approved Presentation direction supersedes its presentation treatment where applicable.

## Branch / Basis

- repository: `failab-ist/GUILD24`
- branch: `claude/guild24-v28-functional-polish-r3vjt9`
- User-provided pushed baseline: `f8a787d534bcb68d8bdced628f3cf977cf922600`
- remote HEAD found at task start: `cf6479578eaf766ca8c7b6d6e8ec36885fbfa129`
- the branch was already 6 commits ahead of the User-provided baseline; those commits are preserved
- implementation truth: current `dist/`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md`

Completed/adoption history: `archive/WORK_HISTORY_v2.8.md`.

## Current Approval / Execution Need

Current User decisions for this correction are approved; no Design re-decision is required before Canonical promotion.

Canonical cleanup and the affected current-Source audit are complete.

Current Director finding:
- remaining issues are implementation/adoption mismatches, not unresolved Design
- no additional Design choice is required for the identified correction set
- stop for User approval before preparing the WORK implementation handoff

The later WORK handoff should route the approved correction through the current UI_UX / UI_UX_QA /
COPY_AUDIT owners rather than duplicating their exact rules here.

## Next Queue

After User approval of the mismatch report:
- write the minimal WORK handoff for the approved Presentation correction only
- then continue to final v2.8 integration / freeze audit when this polish scope is closed

## Blocker

NONE for the approved WORK correction scope.
