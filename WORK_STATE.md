# WORK_STATE

DATE: 2026-09-19
CURRENT_LINE: v2.7 + scoped Decoration Package
STATE: STORE_CAPITAL_FORMULA_ADOPTION_PENDING_VALIDATION

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.7.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve current owners and current adoption status through `SPEC_INDEX_v2.7.0.md`.

## Current Work

The existing v2.7 + scoped Decoration Package Source baseline is adopted.

The User's newest Store Capital amendment is newer than Current Source and is the only known
pending adoption in the current scoped package:

```text
Store Capital = actual Gross Sales × reached-Day rate
```

Exact formula, rate table, progression target and anti-farm requirements belong to
`design_ssot/META_v2.8.0.md` and its routed QA. Do not copy them here.

## Next

1. Adopt the current Store Capital owner truth with the smallest Source patch.
2. Run targeted QA and the committed cross-run / anti-farm measurements.
3. If a material Balance Finding appears, stop without auto-tuning.
4. If validation passes, prepare the approved GitHub Pages deployment workflow.
5. Director/User reviews the result before production merge/status closure.
