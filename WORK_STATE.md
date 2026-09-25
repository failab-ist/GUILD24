# WORK_STATE

DATE: 2026-09-25
STATE: V2_9_1_CLOSED_TAGGED — main `d23d076`, 태그 `v2.9.1` · V2_9_2_GAME_FEEL_PLANNED (H1부터 시작 가능)

## Current

- repository: `failab-ist/GUILD24`
- `main` = v2.9.1 `d23d076`(PR #2) + 감사 보고 재생성 `05dac68`(PR #3) + v2.9.2 문서 정리 `0b85a72`(이 브랜치 PR). Pages는 main을 배포한다 — 라이브 빌드가 v2.9.1 밸런스 상태.
- 태그: `v2.9.0` → `3d0ddc6`(마지막 v2.9.0 소스 커밋), `v2.9.1` → `d23d076`. 둘 다 원격에 있음.
- v2.9.1 밸런스: **완료 · main 병합 · 태그 완료**(User 2026-09-25). owner 반영 + 소스 배치 1~6, `npm test` / `ssot:check`(21/21) / `qa:runtime`(5/5) / `qa:visual` PASS, 네이티브 재측정의 ±4%p 초과는 User가 표본오차 범위로 수용.
  - 결정값: `reports/v29-balance-agreements.md` · 측정과 수용한 차이: `reports/v29-balance-ideal.md` · owner 변경 + 커밋: `design_ssot/CHANGELOG.md` §v2.9.1
- v2.9.2 타격감: H1 … H6 PLANNED(문서만, PRESENTATION §GAME FEEL BEAT). 소스 미변경. 4차 검토(`8448f08` 기준) 판정: Design PASS · 핸드오프 PASS · stale 문구 4개 정리로 strict Canonical PASS(이 커밋).
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- last tagged release: `v2.9.1`; completed v2.8 history: `archive/WORK_HISTORY_v2.8.md`

## In Progress

- 없음

## Next — v2.9.2 타격감 세션 (핸드오프)

AGENTS.md를 먼저 읽고 따른다.

- 역할 / 기점: 프레젠테이션 WORK, 세션 시작 시점의 현재 `main`(`d23d076` 이후, v2.9.1 반영 상태)에서 새 브랜치. 결과는 v2.9.2.
- 병렬 금지(User 2026-09-25): v2.9.2는 v2.9.1 종료 뒤에만 진행한다 — 두 세션이 같은 UI owner, 원장, `UI-Q-v29-*` 번호, `app.js` / `ui.css` / `ui-guard.cjs`를 건드렸기 때문. 이 조건은 태그 `v2.9.1`로 충족됐다. 다른 세션이 같은 파일을 동시에 고치고 있으면 BLOCKED로 멈추고 보고한다.
- v2.9.1이 바꾼 것 중 이 세션이 알아야 할 것:
  - 새 QA 번호는 `UI-Q-v29-27`부터(`main`의 최댓값 `UI-Q-v29-26` = 사망 한도 줄). 시작 시 `grep`으로 다시 확인한다.
  - NIGHT에 v2.9.1 줄이 들어왔다: 퇴각 치료, 만반의 준비 줄(COPY_AUDIT §19-9), 구급품 진열장 사망 → 중상 3회, 위령제 이벤트. H1의 결과별 강도와 보험 반전 덮어찍기는 이 현재 줄들 위에서 감사한다(감사 렌즈에 포함). 새 카피는 넣지 않는다.
  - MORNING / ORDER에 `사망 {n} / {limit} · D{end}까지` 줄이 상시 표시된다(UI-Q-v29-26). H3 캡처에 함께 보인다.
  - SALE 계산대 배치·전망 핀(UI-Q-v29-24 / 25)이 반영됐다. H2는 이 배치 위에서 한다.
  - 점포 자본 비율 1 / 2 / 3 / 4 / 5%가 반영됐다. H4의 점포 자본 부분은 더 이상 대기가 아니다.
- 활성 태스크: PLANNED 상태의 타격감 비트를 등록된 순서 H1 → H5 → H2 → H3 → H4 → H6로 한 배치씩 반영한다. H1(NIGHT 판정 도장 + Hero Item 인과 비트 + 보험 반전 덮어찍기)부터 시작. 한 턴에 한 배치, 그리고 STOP.
- 세션 계획(User 2026-09-25) — 두 단계:
  - 1단계 = 상위 모델 · 하이 이펙트 세션: H1, 그다음 H5. 가장 무거운 두 착지를 한 손으로 만든다. 도장·잉크·테이프·큐 어택의 패턴이 여기서 확정된다.
  - 1단계 세션의 마지막 산출물: H5 커밋 뒤, 2단계 세션이 그대로 따라 할 수 있는 작업 지시를 이 §Next에 다시 쓴다. 담을 것 — H1/H5가 커밋한 패턴의 정확한 이름(클래스, 큐 키, 타이밍 상수, `playPhase` / `playCue`의 진입 지점), 각 남은 배치(H2 → H3 → H4 → H6)가 그 패턴 중 무엇을 어디에 재사용하는지, 배치별 owner 줄과 원장 선언, 캡처 시나리오(시드·화면·뷰포트), 그리고 아래 2단계 지침.
  - 2단계 = 하위 모델 · 하이 이펙트 세션: H2 → H3 → H4 → H6를 1단계가 쓴 지시대로 한 배치씩. 새 연출 방식을 발명하지 않는다. H1/H5 패턴을 재사용하고, 지시에 없는 것은 넣지 않고 UNRESOLVED로 보고한다.
  - 2단계 지침(하네스 엄격): 배치마다 전체 하네스를 빠짐없이 돌린다 — `npm test` 전체, `npm run ssot:check`, `npm run qa:runtime` 5/5, 390·1280 before/after 캡처 + reduced-motion, 시각 검수는 캡처를 열어 보고 §VISUAL REVIEW PROCESS 평가 질문에 답한 뒤에만 완료. 일부만 돌리고 PASS라 하지 않는다. 핀·원장 누락은 커밋 전에 잡는다. 계약(≤ 320 ms, 임팩트 예산, 카드 안, 금지 목록)을 넘는 제안은 구현하지 않고 보고한다.
- 이 게임의 타격점: 계산대에서 판 것 → 밤 결과 착지 → "그 물건이 실제로 바꿨다"는 줄. 도장만 세게 찍으면 결과창이 좋아질 뿐이다. 원인 줄이 같이 박혀야 한다(§GAME FEEL BEAT "Where the hit of this game lives").
- 배치 전 감사 렌즈: 배치가 건드리는 사건을 입력 → 예비 → 행동 → 충돌/변화 → 결과 → 정착으로 읽고, 로직은 있는데 표현이 빠진 사건부터 찾는다(PRESENTATION §GAME FEEL BEAT "Audit lens"). BEFORE 캡처 뒤에 돌린다.
- 진입점:
  - 설계 + 상태: `design_ssot/PRESENTATION_PRINCIPLES_v2.8.0.md` §GAME FEEL BEAT (원리 표, 계약, H1~H6 행; 배치가 커밋되면 그 행을 ADOPTED로 바꾼다)
  - 라우팅: `design_ssot/SPEC_INDEX_v2.8.0.md` §v2.9.1 / v2.9.2
  - 배치마다 먼저 고치는 owner: UI_UX (§NIGHT LAYOUT, §SALE — COUNTER TRAY, §ORDER — WAREHOUSE DISCLOSURE, §CLOSING), UI_UX_QA (새 UI-Q-v29 케이스), NIGHT_CLOSING §INSURANCE CAUSALITY / §HERO ITEM FEEDBACK (표시 순서만), FINAL_EXPEDITION §BOSS CLEAR / §RUN CLEAR; H2는 PRESENTATION §TRANSACTION BEAT A5 / A8
  - 원장: UI_UX / UI_UX_QA / NIGHT_CLOSING / FINAL_EXPEDITION은 `reports/ssot-consolidation/<OWNER>.md`에 새 줄 전부 선언; PRESENTATION_PRINCIPLES는 원장 없음
  - Source(프레젠테이션 레이어만): `dist/ui/app.js` — `playPhase` night 블록(beat / 판정 태그 진입), `playCue`(sale / refuse 비트, 영수증 조각), `nightSound` / `nightCue`(Outcome 큐 + `rescue` 악센트); `dist/ui/audio.js` — 큐 음표 표와 합성 파라미터(great / retreat / injury / severe / death / rescue, order, sale 계열); `dist/ui/ui.css` — `.p-night .beat .verdict`, `.receipt-stub`, 계산대 트레이 / dock 도장
  - 핀: `tests/ui-guard.cjs`(Source 문자열 / CSS), `tests/copy.cjs`(새 카피 없음 예상)
  - 캡처: 390·1280에서 before / after, reduced-motion 포함; PRESENTATION §VISUAL REVIEW PROCESS대로 별도 시각 검수
- 모든 배치에서 지킬 계약: 프레젠테이션 전용; 비트당 ≤ 320 ms(사망 테이프 ≤ 500 ms); 입력 차단 없음; reduced-motion에서 무효이고 최종 상태 동일; 카드 안에서만 움직임; 화면 전체 흔들림·카메라·파티클·햅틱·콤보/연속 UI·칭찬 문구·규칙/저장/RNG/증명 변경 금지. 강도는 사건 무게를 따른다(일반 / 중요 / 클라이맥스). 임팩트 예산: 한 착지에 주 시각 1 + 주 음향 1 + 필요 시 숫자/인과 1까지만 동시 강조, 같은 뜻을 겹치는 연출은 넣지 않는다. 정적(예비)은 일반 강도에는 없고 그 외 ≤ 200 ms(§GAME FEEL BEAT 계약).
- 2차 검토 반영(User 2026-09-25): H2는 눌림·첫 동전 틱·조각 타이밍만(연속 판매 가속·5회째 배음·계산대 띠 튐 삭제). H3 캐스케이드 ≤ 320 ms, 가청 타격 ≤ 3회. H5는 승/패 각각 봉인 도장 1개(원정대 1~3명이라 3번 도장은 거짓 피드백; 패배는 개별 사망이 아니므로 사망 테이프 금지). H4 본문은 한 번에 인쇄, 손익 줄만 착지. H6는 조건부 — 배치가 하드 컷 4개를 캡처해 보고하고 User가 대상을 고른다(그때까지 UNRESOLVED, WORK가 정하지 않음).
- 3차 검토 반영(User 2026-09-25): H1은 잉크 링 없음(카드 4px 내려앉음이 유일한 동반 모션), 대성공은 금색 도장 1회(2단계 도장은 클라이맥스 전용), 여운의 주인은 하나 — Hero Item 줄이 있으면 그 줄이 정착하고 숫자는 값만 갱신, 없으면 바뀐 결과 그룹의 숫자가 카운트업. H2에 "price stamp"라는 물건은 없다 — 키 눌림 + 첫 틱이 임팩트, A8 조각이 SALE의 유일한 도장. H3 창고 숫자는 이전 값 → 확정 값으로 직접, 상자는 SKU당 1개(수량을 허위 표현하지 않음).
- 4차 검토 반영(User 2026-09-25, `8448f08` 기준, 문구 정리만 — 설계 재논의 없음): 원리 표의 `SALE price stamp` → `SALE key impact / receipt stub`; `repeated inputs feel like a combo` → `repeated actions remain tactile without escalation`(판매 횟수로 게임이 흥분하지 않음 — "반복 리듬을 살려야 하나?"로 읽지 않는다); SPEC_INDEX H2 `stub after the stamp` → `stub after impact`; 라우팅 소개 `H1~H5` → `H1~H6`. 판정: Design PASS, 핸드오프 PASS, 정리 후 strict Canonical PASS. 4차 설계 리뷰는 다시 돌리지 않고 H1로 들어간다.
- 연속 시퀀스 검수: 마지막 밤 판정 → `마감으로` → 영수증 인쇄 → `다음 날`(H1+H4+H6)과 최종 결과 → 클리어/실패 화면(H5+H6)은 개별 효과가 아니라 한 흐름으로 캡처한다. 시퀀스를 완성하는 배치가 그 캡처를 맡는다.
- 이미 내려졌지만 아직 문서에 반영 안 된 User 결정: 없음. 열린 것: H6 대상 화면만 — 캡처 보고 뒤 User 결정(UNRESOLVED). H1 … H5는 열린 것 없음(H4 점포 자본 대기는 v2.9.1 종료로 해소).
- 정지 경계: 한 배치(문서 → 원장 → Source → `ui-guard` 핀 → `npm test` / `ssot:check` / `qa:runtime` → 390·1280 before/after 캡처 + reduced-motion 검수 → 커밋) → 보고 → STOP. User 승인 없이 다음 H로 넘어가지 않는다. 1단계 세션은 H5 뒤에 2단계 작업 지시를 쓰고 STOP.

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

없음.
