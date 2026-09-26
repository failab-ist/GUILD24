# 던전 앞 편의점 · 길드24

브라우저에서 실행되는 모바일 우선 싱글플레이 상점 운영 게임.

## Project

- Product / design direction: `GAME_VISION.md`
- Contributor / agent workflow: `AGENTS.md`
- Current work state: `WORK_STATE.md`

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
- deploy: a push to `main` runs `.github/workflows/pages.yml` (npm test + audit gate), then publishes `dist/` to GitHub Pages

## Development

Use the scripts currently defined in `package.json`:

- `npm test`
- `npm run balance`
- `npm run audit`
- `npm run qa:visual`
- `npm run assets`
- `npm run longitudinal`
- `npm run hooks`
- `npm run mastery`
- `npm run dev`
- `npm run qa:runtime`

`npm run qa:runtime` runs the pass/fail browser harnesses (D0 flow, D30 FINAL prep / BOSS CONFIRM /
FINAL->END / Boss backdrops) and exits non-zero on any failure. The other `tools/qa-*.cjs` are capture
tools for visual review.

## Assets

- `GUILD24_NPC_PRODUCTION/` is the current character production pipeline/reference source.
- Runtime assets live under `dist/ui/assets/`.
