# WORK_STATE

DATE: 2026-09-19
CURRENT_LINE: v2.7 + scoped Decoration Package
STATE: LIVE_DEPLOYED_PLAYTEST

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.7.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve current owners and adopted balance through `SPEC_INDEX_v2.7.0.md`.

## Current State

The v2.7 line, scoped Decoration Package, and current Store Capital basis are adopted in Source.

Final integration regression, acquisition reproduction, anti-farm validation, browser QA, Pages
static-path QA, main merge, and GitHub Pages deployment are complete.

The current Store Capital rate table remains the approved current-cycle
`DIRECTOR DOCUMENT BASELINE`. Its small known acquisition-timing variance is accepted without
further tuning in this cycle.

Production Pages deployment is restricted to `main`.

## Next

The next cycle is player-playtest validation, not another automatic balance pass.

Prioritize:
1. whether the core decision loop is understandable and genuinely difficult rather than obscure,
2. whether ORDER / SALE choices avoid obvious dominant answers,
3. whether NIGHT / CLOSING make the consequences of those choices legible,
4. whether bankruptcy feels tense and fair rather than arbitrary,
5. whether cross-run Store Growth feels earned and motivating without becoming mandatory grind,
6. whether mobile pacing, readability, and repeated-run friction hold up in real play.

Convert observed issues into separate Design Finding / Implementation Bug / UX Finding cycles.
Do not tune production numerics directly from isolated anecdotal feedback.
