# WORK_STATE

DATE: 2026-09-22
STATE: V2_8_SOURCE_ADOPTION_IN_PROGRESS

## Current Common Base

- repository: `failab-ist/GUILD24`
- branch: `claude/guild24-v28-integration`
- integration merge: `23b3441a52ae92a54851460c033434d398f5601e`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md`

This branch combines:
- completed current-owner Canonical hygiene through `5e9ef927`
- completed v2.8 audio implementation / guard work through `bc0d4d8`

Use this integration branch as the base for subsequent documentation and audio follow-up work.
Do not continue work from either pre-integration branch.

Completed/adoption history: `archive/WORK_HISTORY_v2.8.md`.

## DIRECTOR — Documentation Hygiene

Current-owner Spec cleanup is complete.

Next unopened batch:
- current routed QA documents
- remove superseded / dead discussion only
- preserve current approved Design truth and acceptance unchanged

After that, open later document classes only as separate batches.

## WORK — Audio Follow-up

Current audio implementation is integrated.

Next action:
- wait for User listening judgement
- if the User identifies an issue, branch from the current integration base and make only the smallest audio fix required
- do not start Final Integration / Freeze as part of listening fixes

Known pre-existing blocker carried from the audio review:
- `tests/assets.cjs` font-subset glyph failure on the pre-audio base; audio introduced no new glyphs

## Execution Boundary

For each next task:

```text
branch from current integration base
→ one narrow batch
→ inspect diff
→ verify
→ commit
→ report
→ STOP
```

Do not perform unrelated Source cleanup, asset regeneration, Final Integration, or release freeze inside the documentation-hygiene batch.

## Final Integration / Freeze

NOT STARTED.

## Blocker

No integration conflict.
The known font-subset asset failure remains a separate Missing Adoption / fix task before final freeze.
