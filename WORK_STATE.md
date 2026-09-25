# WORK_STATE

DATE: 2026-09-25
STATE: V2_9_0_IMPLEMENTATION_COMPLETE — RELEASE OPEN ON BALANCE

## Current

- repository: `failab-ist/GUILD24`
- `main` = v2.9.0 close-out `3f18ceb` (fast-forward from `claude/ux-simplify-handoff-7oorbc`, User 2026-09-25); Pages deploys main, so the live build is this unbalanced v2.9.0 state (User accepted: no live players yet); no tag yet
- the balance session branches from `main`
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (DOC_VERSION 2.9.0; FREEZE_STATUS / SOURCE_ADOPTION_STATUS in its header)
- v2.9.0 batches D-0 … D-5, I-1 … I-4, K, T, U, R1 … R6, F1 … F7: all adopted in Source (`design_ssot/CHANGELOG.md` §v2.9.0 lists each with commits)
- verification at the close-out commit: `npm test` PASS (tests/copy.cjs whole), `npm run ssot:check` PASS, `npm run qa:runtime` 5/5
- last tagged release: v2.8 (`49a291f`); v2.9.0 is deployed from main but not tagged
- version routing (User 2026-09-25): balance = v2.9.1, game feel (타격감) = v2.9.2; both in separate sessions, branches from `main`
- v2.9.2 game feel batches H1 … H5 are registered as PLANNED (docs only: PRESENTATION §GAME FEEL BEAT, SPEC_INDEX §v2.9.1 / v2.9.2, CHANGELOG); no Source touched
- completed v2.8 history: `archive/WORK_HISTORY_v2.8.md`

## In Progress

- none on this branch

## Next — v2.9.1 밸런스 세션 (핸드오프)

AGENTS.md를 먼저 읽고 따른다.

- 역할 / 기점: 밸런스 WORK, `main`(`3f18ceb` 이후)에서 새 브랜치. 결과는 v2.9.1.
- 활성 태스크: v2.9.0 BALANCE FINDING 해소 — F3 / F4 규칙값이 측정에서 런 생존을 붕괴시켰다
  (균형 정책 D30 도달 0.122 → 0.007, 클리어 0.077 → 0.007, 평균 소지금 1358 → 407). 8개 항목을 결정하고,
  선택한 조합을 재측정하고, 승인된 값을 라우팅된 owner와 Source에 반영한 뒤 7-b를 닫는다.
- 진입점:
  - 발견 + 결정 항목: `reports/v29-balance-finding-handoff.md` (무엇이 바뀌었나, 어디서 떨어졌나, 요인별 단일 되돌림, 메커니즘, 결정 1–8, 참고 패키지 A/B/C)
  - 수치: `reports/remeasure-v29-summary.md` (다지점 표), `tools/remeasure-v29-results.json`
  - 측정: `node tools/remeasure-v29.cjs <seeds> <baselineCommit>` (워커 `tools/remeasure-v29-worker.cjs`; 400 시드 ≈ 10분; 요약표는 스크래치 요약기로 재생성했으므로 JSON에서 다시 만든다)
  - 규칙 owner: DUNGEON_HAZARD (§FATIGUE OUTCOME BASELINE, §strainEscalation, `restRecovery`, §expeditionWalletReward), ITEM (§SUPPLY MODEL contract, §SHELF LIFE — EXACT, 카탈로그 표), ECONOMY_ORDER (§BASE OPERATING COST, §PURCHASE ACCEPTANCE base need), NPC_TRAIT (자연 회복), META (점포 자본 비율)
  - QA owner: DUNGEON_ITEM_QA (DUN-Q-v29-1 … 3, DUN-Q73), ECONOMY_ORDER_QA (ECO-Q-v28-4), UI_UX_QA 아래 SALE_QA 줄
  - Source: `dist/systems/dungeon.js` (WALLET_MULT, STRAIN, outcomeBaseline, kitSettle), `dist/systems/shop.js` (overheadBase, morningReset, interest), `dist/data/catalog.js` (item days / supply / accessibleNeed), `dist/data/decorations.js` (capitalRates)
  - 값을 핀하는 테스트: tests/night.cjs, tests/vocabulary.cjs, tests/integration.cjs, tests/revision.cjs, tests/traits.cjs, tests/relic-effects.cjs
  - 원장: `reports/ssot-consolidation/<OWNER>.md`, `npm run ssot:check`로 검사 (새 줄 / 삭제 줄 전부 선언)
- 이미 내려졌지만 아직 문서에 반영 안 된 User 결정: 없음. 열린 결정: 핸드오프 보고서의 8개 항목과 7-b.
- 재생성 안 한 것: `reports/deco-balance` (점포 자본 비율 반감; 현재 상태에서는 자본이 거의 0).
- 정지 경계: BALANCE FINDING → 측정한 조합을 보고하고 값 반영 전에 User 승인을 기다린다(AGENTS §9). 반영 후: `npm test`, `ssot:check`, `qa:runtime`, 재측정을 다시 돌리고 나서 릴리스를 닫을 수 있다(태그 `v2.9.0`, SPEC_INDEX / CHANGELOG 상태, WORK_STATE).

## Next — v2.9.2 타격감 세션 (핸드오프)

AGENTS.md를 먼저 읽고 따른다.

- 역할 / 기점: 프레젠테이션 WORK, `main`(`3d0ddc6` 이후)에서 새 브랜치. 결과는 v2.9.2. H4의 점포 자본 부분을 빼면 밸런스 세션과 독립.
- 활성 태스크: PLANNED 상태의 타격감 비트를 등록된 순서 H1 → H2 → H3 → H5 → H4로 한 배치씩 반영한다. H1(NIGHT 판정 도장 + 보험 반전 덮어찍기)부터 시작. 한 턴에 한 배치, 그리고 STOP.
- 진입점:
  - 설계 + 상태: `design_ssot/PRESENTATION_PRINCIPLES_v2.8.0.md` §GAME FEEL BEAT (원리 표, 계약, H1~H5 행; 배치가 커밋되면 그 행을 ADOPTED로 바꾼다)
  - 라우팅: `design_ssot/SPEC_INDEX_v2.8.0.md` §v2.9.1 / v2.9.2
  - 배치마다 먼저 고치는 owner: UI_UX (§NIGHT LAYOUT, §SALE — COUNTER TRAY, §ORDER — WAREHOUSE DISCLOSURE, §CLOSING), UI_UX_QA (새 UI-Q-v29 케이스), NIGHT_CLOSING §INSURANCE CAUSALITY / §HERO ITEM FEEDBACK (표시 순서만), FINAL_EXPEDITION §BOSS CLEAR / §RUN CLEAR; H2는 PRESENTATION §TRANSACTION BEAT A1 / A5 / A8
  - 원장: UI_UX / UI_UX_QA / NIGHT_CLOSING / FINAL_EXPEDITION은 `reports/ssot-consolidation/<OWNER>.md`에 새 줄 전부 선언; PRESENTATION_PRINCIPLES는 원장 없음
  - Source(프레젠테이션 레이어만): `dist/ui/app.js` — `playPhase` night 블록(beat / 판정 태그 진입), `playCue`(sale / refuse 비트, 영수증 조각), `nightSound` / `nightCue`(Outcome 큐 + `rescue` 악센트); `dist/ui/audio.js` — 큐 음표 표와 합성 파라미터(great / retreat / injury / severe / death / rescue, order, sale 계열); `dist/ui/ui.css` — `.p-night .beat .verdict`, `.receipt-stub`, 계산대 트레이 / dock 도장
  - 핀: `tests/ui-guard.cjs`(Source 문자열 / CSS), `tests/copy.cjs`(새 카피 없음 예상)
  - 캡처: 390·1280에서 before / after, reduced-motion 포함; PRESENTATION §VISUAL REVIEW PROCESS대로 별도 시각 검수
- 모든 배치에서 지킬 계약: 프레젠테이션 전용; 비트당 ≤ 320 ms(사망 테이프 ≤ 500 ms); 입력 차단 없음; reduced-motion에서 무효이고 최종 상태 동일; 카드 안에서만 움직임; 화면 전체 흔들림·콤보/연속 UI·칭찬 문구·규칙/저장/RNG/증명 변경 금지.
- 이미 내려졌지만 아직 문서에 반영 안 된 User 결정: 등록된 행 외에 없음. 열린 것: H1 … H3 / H5 없음; H4의 점포 자본 정산은 v2.9.1 값 확정 뒤.
- 정지 경계: 한 배치(문서 → Source → 핀 → `npm test` / `ssot:check` / `qa:runtime` → 캡처 검수 → 커밋) → 보고 → STOP. User 승인 없이 다음 H로 넘어가지 않는다.

## Execution Boundary

```text
one narrow batch
-> inspect current Canonical + relevant Source
-> measure / classify
-> report
-> STOP
```

Fix cycles are separate from measurement cycles. Do not tune Production values to satisfy a measurement.

## Blocker

None on the implementation side. The release is gated on the balance decisions above.
