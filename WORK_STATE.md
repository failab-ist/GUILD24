# WORK_STATE

DATE: 2026-09-19
CURRENT_LINE: v2.7 + scoped Decoration Package
STATE: LIVE_PLAYTEST_HOTFIX_PENDING

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.7.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve exact hotfix behavior through the current owners routed by `SPEC_INDEX_v2.7.0.md`.

## Current State

The gameplay/balance baseline is adopted and live on GitHub Pages.

The first real-phone playtest exposed a playability blocker in ordinary mobile SALE plus smaller
tutorial/reference/Decoration/audio issues. User/Director approved one focused hotfix cycle.

No gameplay/balance numeric is reopened by this cycle.

## Next

Implement the routed hotfix with the smallest UI/audio patch.
Validate real mobile widths first, then desktop regression, then deploy through the existing
main-only Pages workflow.

Do not mix unrelated playtest findings or new features into this hotfix.
