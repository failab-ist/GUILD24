# 던전 앞 편의점 · 길드24

브라우저에서 실행되는 모바일 우선 싱글플레이 상점 운영 게임.

## Project

- Product / design direction: `GAME_VISION.md`
- Contributor / agent workflow: `AGENTS.md`
- Current work state: `WORK_STATE.md`
- Version history: `design_ssot/CHANGELOG.md`; closed-version evidence (old reports, measurement tools): `archive/` (`archive/README.md`)

## Current Design Truth

Design SSOT entry point:

- `design_ssot/SPEC_INDEX_v2.8.0.md`

Use only the current owner Spec / QA routed by that index.
Older planning / Vision amendments are history unless the current index or owner explicitly references them.

Detailed Rule / Numeric / UX / QA truth is intentionally not duplicated in this README.

## Runtime Source

- `dist/`
- root `index.html` redirects to `dist/index.html`
- no build step is required for runtime
- deploy: a push to `main` runs `.github/workflows/pages.yml` (npm test + audit gate), stamps the commit into `dist/build.js`,
  then publishes `dist/` to GitHub Pages; the opening screen shows `v{version} · {commit}` and the console prints it

## Development

Use the scripts currently defined in `package.json`:

- `npm test` - the suite (also the deploy gate)
- `npm run ssot:check` - SSOT ledger line accounting (`reports/ssot-consolidation/`)
- `npm run audit` - regenerates the Source-derived reports (`reports/COVERAGE.md`, `ITEM-PRICES.md`, `TRAITS.md`)
- `npm run qa:runtime` - pass/fail browser harnesses
- `npm run qa:visual` - the full visual / mobile gate (captures to `reports/ui/`, ignored)
- `npm run dev` - local preview server
- `npm run balance` / `longitudinal` / `mastery` - measurement harnesses (write `tests/*-results-v5.json`, ignored)
- `npm run assets` / `npm run hooks` - vendor assets / install the git hooks

`npm run qa:runtime` runs the pass/fail browser harnesses (D0 flow, D30 FINAL prep / BOSS CONFIRM / FINAL->END /
Boss backdrops, full-reset seed, Boss-reveal hold) and exits non-zero on any failure. The other `tools/qa-*.cjs` are
capture tools for visual review. Measurement tools write nothing Canonical; a closed question's tools move to `archive/`.

## Assets

- `GUILD24_NPC_PRODUCTION/` is the current character production pipeline/reference source.
- Runtime assets live under `dist/ui/assets/`.
