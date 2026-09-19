# WORK_STATE

DATE: 2026-09-19
CURRENT_LINE: v2.7 + scoped Decoration Package
STATE: RELEASE_CANDIDATE_READY_MAIN_MERGE

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.7.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve current owners and adopted balance through `SPEC_INDEX_v2.7.0.md`.

## Current State

The v2.7 line, scoped Decoration Package, and current Store Capital basis are adopted in Source.

Final integration regression, acquisition reproduction, anti-farm validation, browser QA and
Pages static-path QA are complete. The small known acquisition-timing variance is accepted for
the current cycle without further tuning.

The Pages workflow is prepared with Production deployment restricted to `main`.

## Next

1. Merge the release-candidate branch to `main`.
2. Ensure Repository Settings -> Pages -> Source is set to GitHub Actions.
3. Confirm the main Pages workflow passes and the deployed site loads at the project Pages URL.
4. Start any later balance/design work as a separate cycle.
