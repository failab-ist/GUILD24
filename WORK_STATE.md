# WORK_STATE

DATE: 2026-09-21
CURRENT_LINE: v2.8 project-wide Canonical / Source adoption pending
STATE: V2_8_SOURCE_ADOPTION_READY

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.8.0.md`
- Known current Source mismatch/root-cause map: `design_ssot/SOURCE_ADOPTION_QA_v2.8.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- v2.8 release orientation only: `GUILD24_v2.8_RELEASE_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve exact behavior through the current owners routed by `SPEC_INDEX_v2.8.0.md`.

## Current State

v2.8 Design has completed project-wide Canonical promotion, final SSOT coverage audit and Copy re-audit.

The v2.8 Director Plan is now orientation-only. It is not a detailed work/spec source.

The Source is not yet project-wide v2.8 adopted.
Current implementation still contains the v2.7 Core baseline plus the already-adopted Decoration
package and the known mismatches recorded in `SOURCE_ADOPTION_QA_v2.8.0.md`.

Implementation-blocking Design unresolved = NONE.

Balance items explicitly marked measurement-gated are not permission for WORK or QA to tune them.

## Next

Adopt v2.8 in small owner-scoped implementation/fix cycles.

Start from the known defect map instead of rediscovering already-audited issues.
For each logical task:
- read the routed owner + relevant QA + named Source path
- make the smallest patch
- targeted verify
- commit
- continue to the next task

After implementation freeze:
- run current Canonical adoption audit
- run functional QA
- run real mobile + desktop runtime UX smoke
- report remaining Balance Findings separately

Do not pull v2.9+ deferred features into v2.8 adoption.
