# 던전 앞 편의점 · 길드24

브라우저에서 실행되는 모바일 우선 싱글플레이 상점 운영 게임.

## Project

- Product / design direction: `GAME_VISION.md`
- Contributor / agent workflow: `AGENTS.md`
- Current work state: `WORK_STATE.md`

## Current Design Truth

Design SSOT entry point:

- `design_ssot/SPEC_INDEX_v2.6.1.md`

Use the owner Spec / QA routed by that index.
Old versioned specs are historical unless the current owner explicitly declares them as `BASE_DOCUMENT`.

Current corrective execution document:

- `GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`

Future v2.7+ planning vision (not part of v2.6.1 recovery):

- `GUILD24_v2.7_PLUS_VISION.md`

`v2.7+` is a planning/roadmap label. The runtime semantic version targeted by that vision is v2.7.0 when formally adopted into owner Specs / QA.

Copy extraction baseline:

- `V2_6_COPY_FULL_AUDIT.md`
  - reference/extraction only; not Design Truth

## Runtime Source

- `dist/`
- root `index.html` redirects to `dist/index.html`
- no build step is required for runtime

## Development

Use the scripts defined in `package.json`.

Primary commands:

- `npm test`
- `npm run test:revision`
- `npm run test:coverage`
- `npm run test:regression`
- `npm run test:relic`
- `npm run test:night`
- `npm run test:refusal`
- `npm run measure`
- `npm run longitudinal`
- `npm run mastery`
- `npm run report`
- `npm run traits`
- `npm run autoplay`
- `npm run preview`
- `npm run ui:test`

## Assets

- `GUILD24_NPC_PRODUCTION/` is the current character production pipeline/reference source.
- Runtime assets live under `dist/assets/`.
