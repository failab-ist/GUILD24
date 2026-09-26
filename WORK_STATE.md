# WORK_STATE

DATE: 2026-09-25
STATE: V2_9_1_CLOSED_TAGGED — main `d23d076`, 태그 `v2.9.1` · V2_9_2_H1_H5_H2_ADOPTED · 2단계 H3 → H4 → H6 대기

## Current

- repository: `failab-ist/GUILD24`
- 태그: `v2.9.0` → `3d0ddc6`, `v2.9.1` → `d23d076`. 둘 다 원격에 있음.
- v2.9.1 밸런스: 완료 · main 병합 · 태그 완료(User 2026-09-25). 결정값 `reports/v29-balance-agreements.md`, 측정 `reports/v29-balance-ideal.md`, owner 변경 `design_ssot/CHANGELOG.md` §v2.9.1.
- v2.9.2 브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`:
  - PR #5로 main에 병합됨(`dd3feb4`, Pages 배포): H1(`8c1c6bd`) + 플레이 리포트 수정 `158d001` / `0510b53` / `61b9734` / `771ba8f`.
  - PR #6으로 main에 병합됨(`9414293`, Pages 배포 성공): 진열대 한 줄 · SALE 트레이 접기 · 게이트 방문 최소 1명 · 발주 플로팅 오늘 줄 · D30 흐름 · H5 봉인 · H1 만반의 준비 반전 · 밸런스(대성공 EXP 1.10, slope 1.50, 정가 ×0.90).
  - 그 뒤: H2 SALE 계산대(이 브랜치).
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- last tagged release: `v2.9.1`; completed v2.8 history: `archive/WORK_HISTORY_v2.8.md`

## In Progress

- v2.9.2 밸런스(User 2026-09-25, 3개 레버만): 대성공 EXP 1.10, GATE SLOPE early 1.50(late 0.80 유지), 정가 최종 구매의사 ×0.90
  (0.97 관련 준비 포함, 50%/150% 불변) 반영 완료. 근거 `reports/v292-balance-review.md`(`human` 주 렌즈).
  배포 후 User 플레이 데이터(가능하면 D30 직후 또는 런 종료 직후 저장)로 재확인할 예정.

## User 재확인 필요 (User 2026-09-25 자리 비운 동안 추천안으로 임시 적용 — 이후 확인)

1. SALE 트레이 접기(UI-Q-v29-28): 폰에서만, 진열대 32px 이상 스크롤 또는 트레이·상품·도크·오버레이 밖 탭 → 머리 줄 칩(▲); 칩·아무 상품(같은 상품 포함) 탭 → 펼침.
2. 발주 플로팅 오늘 줄(UI-Q-v29-29): `오늘` 블록이 사라졌을 때만 사망 줄 상자에 구분선 + `오늘` 라벨로 붙임.
3. 게이트 방문 최소 1명(NPC_TRAIT destinationCoverage): 기존 무작위 추첨 뒤, 손님 수 ≥ 게이트 수인데 빈 게이트가 있을 때만 2명 이상 게이트의 손님 1명(무작위, 거짓말쟁이로 이미 바뀐 손님 제외)을 옮김. 빈 게이트가 없는 날은 RNG 흐름 불변.
4. D30 흐름(FINAL_EXPEDITION §D30 PLAYER FLOW): 마지막 발주(펼침, 카트가 남으면 `원정대 선택` 잠금) → 명단 카드가 수첩을 열고 수첩 아래 `원정대 선택` / `원정대에서 빼기`로 편성 → 준비 화면에 보급 대상 스탯 격자. 새 카피: `원정대에서 빼기`, 단계 제목 `마지막 발주`(COPY_AUDIT §14-9).
5. 진열대 요약: 구급키트 `중상 → 부상 · 부상 → 무사`, 황금 1+1 쿠폰 `다음 소비품 효과 2회`(승인 문구에서 잘라낸 핵심; 트레이 특수 효과·도감은 전체 문구).
6. H5 세부: 마왕 이름이 새겨진 봉인 1개(승리 주홍·정면 / 패배 흐리고 비뚤고 일부만), 착지 큐 `sealwin` / `sealfail`.
7. ~~H1 반전 범위~~ → User 확정(2026-09-25): 사망을 면했을 때만 반전. `만반의 준비`가 사망을 막은 밤만 덮어찍기, 강골·구급키트는 반전 없음(`eb30e16`).

## Next — v2.9.2 타격감 2단계 (H2 → H3 → H4 → H6) 작업 지시

AGENTS.md를 먼저 읽고 따른다. 역할: 프레젠테이션 WORK(2단계 — 하위 모델 · 하이 이펙트). 기점: 이 브랜치의 최신 커밋(또는 병합된 main). 병렬 금지(같은 UI owner / 원장 / `app.js` / `ui.css` / `ui-guard.cjs`를 고치는 다른 세션이 있으면 BLOCKED).

새 연출 방식을 발명하지 않는다. 아래 H1 / H5 패턴만 재사용하고, 지시에 없는 것은 넣지 않고 UNRESOLVED로 보고한다. 한 배치 → 커밋 → 보고 → STOP(User 승인 없이 다음 H로 넘어가지 않는다).

### 1단계가 확정한 패턴 (정확한 이름)

- 타이밍 표 하나를 모션과 큐가 같이 읽는다: `dist/ui/app.js`의 `STAMP_FALL=90`(도장 낙하 90 ms), `NIGHT_STAMP`(톤별 `entry` / `hold` / `from` / `dip` / `y`·`x`·`scale` / `print` / `tape`), `stampLand(st)=entry+hold+STAMP_FALL`, `FINAL_SEAL={hold:200,won:{from:2,dip:6},lost:{from:1.6,dip:3}}`.
- 도장 착지(`playPhase` 안에서만, `motionOK()` 뒤): 대상 `scale:{from:X,to:1,duration:STAMP_FALL,delay:at,ease:'in(3)'}` + `opacity:{from:0,to:<CSS 끝값>,duration:40,delay:at,ease:'linear'}`; 받침(카드/테이프) `translateY` 키프레임 `[{from:0,to:0,duration:land},{to:dip,duration:40,ease:'in(2)'},{to:0,duration:150~170,ease:'outQuad'}]`.
- 끝 상태는 CSS에 전량: 기울기는 개별 속성 `rotate` / `translate`(anime의 `transform`과 충돌하지 않음), 번짐·테이프는 CSS 변수 기본값 1(`--ink` / `--tape`)을 anime가 0→1로 들여옴, 불투명도 목표는 `getComputedStyle(el).opacity`. 그래야 reduced-motion 끝 상태가 같다(캡처로 픽셀 비교).
- 임시 요소(반전 첫 인쇄 `p.verdict.ghost`)는 `playPhase`가 만들고 `onComplete`에서 제거 — 렌더에 넣지 않는다.
- 여운 주인 하나: 원인 줄 정착(`opacity`+`translateY -4→0`, 160 ms, `delay:land`) 또는 숫자 카운트업(`box={v:0}`, `onUpdate`로 `textContent` 교체, `onComplete`에서 원문 복원, 220 ms) 중 하나만.
- 큐: 착지 프레임에 `setTimeout`으로 재생하고 다음 화면·다음 결과에서 `clearTimeout`(`nightSound` / `nightCueAt`, `sealSound` / `sealCueAt`). reduced-motion은 즉시 재생. `dist/ui/audio.js` shape의 `hit:1` = 첫 음 attack .002 · ×1.3, 음표 불변.
- 금지 재확인: 화면 흔들림·파티클·링·플래시·콤보·칭찬 문구·규칙/저장/RNG 변경, 카드 밖 모션. 비트당 ≤ 320 ms, 정적(hold)은 일반 강도에 없음, 그 외 ≤ 200 ms.
- 캡처: `QA_FRAMES=... node tools/qa-night-outcomes.cjs <out> <seeds> [states.json]`(NIGHT), `QA_FRAMES=... node tools/qa-final-seal.cjs <out> [widths] [BOSS]`(END). 모션 프레임은 anime 엔진 10배 감속 + 고정 시계 래퍼(`Date.now=()=>window.__live?real():t`). 새 화면은 `tools/qa-final-seal.cjs` 구조를 복사해 `tools/qa-<surface>-beat.cjs`를 만든다(캡처 전용, qa:runtime에 넣지 않음).
- 시각 검수: 390·1280 BEFORE/AFTER + 모션 프레임 + reduced-motion 정착 캡처를 시트로 묶어 **별도 에이전트(읽기 전용)** 에 PRESENTATION §VISUAL REVIEW PROCESS 질문으로 검수시키고, NARROW FIX → 재캡처 → 모션 끝 = reduced-motion 끝을 픽셀 비교.

### 배치별 지시

- **H2 SALE 계산대** (PRESENTATION H2 행 + §TRANSACTION BEAT A5 / A8; owner 줄: PRESENTATION A5/A8, UI_UX §SALE — COUNTER TRAY, UI_UX_QA 새 `UI-Q-v29-31`, 원장 UI_UX / UI_UX_QA):
  - 누른 가격 키: `case'sell'`에서 누른 버튼을 `translateY` 3 px 60 ms 내려갔다 복귀(기존 `stampPress`와 같은 자리에서, 카드 밖 모션 없음).
  - A5: `audio.js`의 `sale` / `half` / `overcharge` 코인 틱 루프(`if(sh.ticks)`)에서 첫 틱만 `hit` 방식으로 세게; `overcharge`(바가지)의 첫 틱은 40 ms 늦고 낮은 음. 틱 수 1 / 2 / 3 불변.
  - A8 영수증 조각(`showStub()` / `.receipt-stub`): 렌더 시점이 아니라 키 눌림의 착지(60 ms) 뒤에 기존 1.12→1 ≤ 200 ms로 찍힘.
  - 없는 것: 계산대 띠 튐, 빨라지는 두 번째 도장, 다섯 번째 판매 배음, 콤보/연속 UI(2차 검토).
  - 캡처: 390·1280, 판매 50/100/150%와 거절 각 1회, 모션 프레임 0/60/120/200/320 ms. SALE 트레이 접기(UI-Q-v29-28)는 펼친 상태에서만 판매한다.
- **H3 ORDER 확정** (owner: UI_UX §ORDER — WAREHOUSE DISCLOSURE, UI_UX_QA `UI-Q-v29-32`, 원장):
  - `case'confirm-order'` 뒤 `playCue`에 1회성 표식 `'order'`를 두고 창고 칸(`stockBrief()`의 행; 접혀 있으면 요약 `N / M칸` 숫자만)에 SKU당 상자 1개가 계단식 착지, 전체 ≤ 320 ms(간격 = min(70, 320 / SKU 수)), 들리는 `order` 계열 타격 최대 3회(나머지 무음), 각 창고 숫자는 이전 값 → 확정 값으로 바로(수량만큼 반복 금지), 잔고(`#order-register`의 보유 골드 / 발주 후)는 H1 카운트업 패턴의 역방향 카운트다운 220 ms. `발주 완료.` 줄 불변.
- **H4 CLOSING 마감** (owner: UI_UX §CLOSING, UI_UX_QA `UI-Q-v29-33`, 원장):
  - `playPhase('closing')` 새 분기: 영수증 본문 행을 한 번에 ≤ 200 ms로 인쇄(프린터 틱 1회, 행마다 틱 금지), 마지막 `영업 손익` 줄만 도장(중요: hold 100 ms, `STAMP_FALL`, 테이프 dip 4 px; 이익 금색 / 손실 적색 — 끝 상태 CSS에).
  - 점포 자본 정산(END 테이프의 `점포 자본 정산` 행): 카운트업 중 장식 가격선(500 / 750 / 1000 / 1250)을 넘을 때 클릭(`ui` 큐) — v2.9.1 비율 반영.
  - `어제보다 +N` 줄 없음(v3.0+).
  - 연속 시퀀스 캡처(이 배치가 H1 + H4를 잇는다): 마지막 밤 판정 → `마감으로` → 영수증 인쇄 → `다음 날`을 한 흐름으로.
- **H6 장면 전환** (조건부): CLOSING / FINAL / END / DAY 0 네 하드 컷을 두 연속 시퀀스(밤 → 마감 → 다음 날, FINAL 결과 → END)에서 캡처해 **보고만** 하고 STOP — 대상 화면은 User 결정(UNRESOLVED). 선택된 화면만 같은 계열 진입 비트(≤ 240 ms, 한 동작, 일반 강도).

### 2단계 지침(하네스 엄격)

- 배치마다 전부: `npm test` 전체, `npm run ssot:check`(21/21), `npm run qa:runtime` 5/5, 390·1280 BEFORE/AFTER + 모션 프레임 + reduced-motion, 별도 검수 에이전트 판정 → NARROW FIX → 재캡처. 일부만 돌리고 PASS라 하지 않는다. 명령을 `;`로 이어 테스트 실패 뒤 커밋하지 않는다(`&&`).
- 새 한글 글자는 폰트 서브셋 검사에 걸린다(코멘트 포함) — 새 카피가 없으면 새 글자도 없어야 한다.
- 핀·원장 누락은 커밋 전에 잡는다(`ssot:check`가 UNDECLARED NEW를 보고). 계약(≤ 320 ms, 임팩트 예산, 카드 안, 금지 목록)을 넘는 제안은 구현하지 않고 보고한다.
- 환경: 얕은 클론이면 `git fetch --unshallow`; `pip install fonttools brotli pillow`; `npm install`.

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
