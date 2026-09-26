# WORK_STATE

DATE: 2026-09-25
STATE: V2_9_1_CLOSED_TAGGED — main `d23d076`, 태그 `v2.9.1` · V2_9_2_H1_H2_H3_H4_H5_H6_ADOPTED(전체 완료, main 미병합)

## Current

- repository: `failab-ist/GUILD24`
- 태그: `v2.9.0` → `3d0ddc6`, `v2.9.1` → `d23d076`. 둘 다 원격에 있음.
- v2.9.1 밸런스: 완료 · main 병합 · 태그 완료(User 2026-09-25). 결정값 `reports/v29-balance-agreements.md`, 측정 `reports/v29-balance-ideal.md`, owner 변경 `design_ssot/CHANGELOG.md` §v2.9.1.
- v2.9.2 브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`:
  - PR #5로 main에 병합됨(`dd3feb4`, Pages 배포): H1(`8c1c6bd`) + 플레이 리포트 수정 `158d001` / `0510b53` / `61b9734` / `771ba8f`.
  - PR #6으로 main에 병합됨(`9414293`, Pages 배포 성공): 진열대 한 줄 · SALE 트레이 접기 · 게이트 방문 최소 1명 · 발주 플로팅 오늘 줄 · D30 흐름 · H5 봉인 · H1 만반의 준비 반전 · 밸런스(대성공 EXP 1.10, slope 1.50, 정가 ×0.90).
  - PR #7으로 main에 병합됨(`49c853b`, 2026-09-26): H2 SALE 계산대 · H3 ORDER 확정 · 봇 하네스 `reader`와 측정 도구 · 2차 밸런스 · 3차 밸런스(G1 + L2 + T).
  - PR #8(`claude/v2-9-2-h4-closing-j24s8w`)으로 main에 병합됨(`d6fcfbd`): H4 CLOSING 마감 영수증 · H6 캡처와 FINAL 진입 비트 — **v2.9.2 H1~H6 전 배치 완료**.
    DAY0→DAY1 마왕 모달 겹침은 DESIGN ISSUE로 별도 보고(UNRESOLVED).
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- last tagged release: `v2.9.1`; completed v2.8 history: `archive/WORK_HISTORY_v2.8.md`

## In Progress

- v2.9.2 밸런스(User 2026-09-25, 3개 레버만): 대성공 EXP 1.10, GATE SLOPE early 1.50(late 0.80 유지), 정가 최종 구매의사 ×0.90
  (0.97 관련 준비 포함, 50%/150% 불변) 반영 완료. 근거 `reports/v292-balance-review.md`(`human` 주 렌즈).
  배포 후 User 플레이 데이터(가능하면 D30 직후 또는 런 종료 직후 저장)로 재확인할 예정.
- v2.9.2 봇 하네스(User 2026-09-26): `reader` 정책과 User 런 보정 도구 추가(`reports/v292-bot-harness.md`). 그 결과로 2차 밸런스 반영
  (User 2026-09-26 권고안): 대성공 EXP 1.00, 전투 승리 EXP 0.90, 운영비 D15 이후 +12/일. 다음 User 플레이 데이터로 재확인.
  late Gate slope 측정(측정 전용, 2026-09-26): 0.80 / 0.90 / 1.00 비교 결과 `reports/v292-bot-harness.md` §8. Source는 late 0.80 그대로.
  3차 밸런스(User 2026-09-26 "g1 l2 t"): Gate D11~20 1.10/일, levelFactor 하한 0.85, D21~29 T3 +0.10 반영(§9~10 측정 근거).

## User 재확인 필요 (User 2026-09-25 자리 비운 동안 추천안으로 임시 적용 — 이후 확인)

1. SALE 트레이 접기(UI-Q-v29-28): 폰에서만, 진열대 32px 이상 스크롤 또는 트레이·상품·도크·오버레이 밖 탭 → 머리 줄 칩(▲); 칩·아무 상품(같은 상품 포함) 탭 → 펼침.
2. 발주 플로팅 오늘 줄(UI-Q-v29-29): `오늘` 블록이 사라졌을 때만 사망 줄 상자에 구분선 + `오늘` 라벨로 붙임.
3. 게이트 방문 최소 1명(NPC_TRAIT destinationCoverage): 기존 무작위 추첨 뒤, 손님 수 ≥ 게이트 수인데 빈 게이트가 있을 때만 2명 이상 게이트의 손님 1명(무작위, 거짓말쟁이로 이미 바뀐 손님 제외)을 옮김. 빈 게이트가 없는 날은 RNG 흐름 불변.
4. D30 흐름(FINAL_EXPEDITION §D30 PLAYER FLOW): 마지막 발주(펼침, 카트가 남으면 `원정대 선택` 잠금) → 명단 카드가 수첩을 열고 수첩 아래 `원정대 선택` / `원정대에서 빼기`로 편성 → 준비 화면에 보급 대상 스탯 격자. 새 카피: `원정대에서 빼기`, 단계 제목 `마지막 발주`(COPY_AUDIT §14-9).
5. 진열대 요약: 구급키트 `중상 → 부상 · 부상 → 무사`, 황금 1+1 쿠폰 `다음 소비품 효과 2회`(승인 문구에서 잘라낸 핵심; 트레이 특수 효과·도감은 전체 문구).
6. H5 세부: 마왕 이름이 새겨진 봉인 1개(승리 주홍·정면 / 패배 흐리고 비뚤고 일부만), 착지 큐 `sealwin` / `sealfail`.
7. ~~H1 반전 범위~~ → User 확정(2026-09-25): 사망을 면했을 때만 반전. `만반의 준비`가 사망을 막은 밤만 덮어찍기, 강골·구급키트는 반전 없음(`eb30e16`).

## Next — v2.9.2 타격감 완료, main 병합 대기

**v2.9.2 H1~H6 전 배치 ADOPTED.** 정확한 내용·owner·커밋은 `design_ssot/CHANGELOG.md` §v2.9.2 참고(배치별 상세 지시문은 여기서 지움 — 이미 Source·문서·커밋 로그에 그대로 있어 이 파일에 다시 베끼지 않는다).

커밋: H1 `8c1c6bd` · H5(§FINAL RESULT — SEAL STAMP) · H2 `8874e19` · H3 `96375e1` · H4 `97c8f42` · H6 캡처
`38d11bd`/`f4a6133` · H6 FINAL 진입 비트(이 커밋).

### User 결정 대기 (WORK가 판단하지 않음)

1. **DAY0→DAY1 마왕 조사 모달 겹침 (DESIGN ISSUE, UNRESOLVED)**: `render()`의 `bossRevealDue()` 자동 모달 로직이
   D0/D5/D10/D15/D20/D25 여섯 리빌 스테이지 모두에서 지연 없이 즉시 뜨는 공유 메커니즘이고, Source에 그 설계 의도가
   주석으로 명시돼 있다. D0만 따로 지연시키는 건 이 프레젠테이션 배치 권한 밖의 더 큰 설계 결정이라 손대지 않았다.
   원하면 범위(D0만 / 전체 6개 다) 확정 후 별도 배치로.
2. **main 병합 · 태그**: 이 브랜치(`claude/v2-9-2-h4-closing-j24s8w`)를 main에 병합하고 v2.9.2를 닫을지는 User 결정.

### H1~H6에서 확인된 함정 (다음 프레젠테이션 작업에서 반복하지 말 것)

- 모든 `button`에 `transition:transform .08s steps(2)`가 걸려 있다. anime로 버튼을 움직이면 CSS 전환이 매 프레임을 삼킨다. 움직일 버튼은 먼저 `el.style.transition='none'`으로 끈다(`keyPress` 참고).
- 캡처 도구는 페이지 시계를 멈춰 둔다(`Date.now` 래퍼). 누르기 전에 재생돼야 할 애니메이션(선택 트레이 등)이 있으면 `window.__live=true`를 먼저 켠다. 안 그러면 캡처할 때만 흐리게 보이는 가짜 결함이 생긴다.
- 캡처는 anime만 10배 느리게 한다. `setTimeout`(스텁 페이드, 사운드)은 벽시계로 돈다. 늦은 프레임에서 사라지는 요소는 캡처 인공물일 수 있으니 `QA_SLOW=1`로 최종 상태를 확인한다.
- 렌더가 대상 요소를 지우면(판매 성공 뒤 트레이) 모션이 보이지 않는다. 떼어 둔 원래 노드를 `inert`로 잠깐 되돌려 놓는 방식을 쓴다(H2 `held`).
- 시퀀스 값(개수·잔고)은 `setTimeout`이 아니라 anime `onComplete`(필요하면 `A({t:0},{t:1,duration})`)로 바꾼다. 그래야 느린 캡처에서도 타이밍이 맞는다.
- 캡처 픽스처는 조건을 실제로 만족해야 한다(H3: 서로 다른 SKU k개. 같은 품목 중복 금지). 검수 에이전트가 이런 TEST GAP을 잡아낸다.
- 새 한글은 주석까지 폰트 서브셋 검사에 걸린다. 새 카피가 없으면 주석도 영어로 쓴다.
- 캡처 도구 템플릿: `tools/qa-sale-beat.cjs`, `tools/qa-order-beat.cjs`(최종 DOM 비교 `QA_DOM=1` 포함), `tools/qa-closing-beat.cjs`(profit/loss/settlement 픽스처 포함).
- 넓은(전체 폭) flex 행 전체를 `scale`로 도장 찍으면 카드 밖으로 넘친다(H4 최초 구현에서 발생, 자체 스모크에서 발견). 도장은 항상 값(숫자) 요소 하나에만 걸고, 라벨·구분선을 포함한 행 컨테이너는 `opacity`만 쓴다.
- 화면 전환을 만드는 액션 경로가 두 개 이상이면(H4: `전체 건너뛰기` = `case'closing'`, 보통 진행 = `case'night-next'`가 마지막 결과에서 `finishNight()`를 부르는 경로) 새 큐 호출을 양쪽 모두에 건다. 한쪽만 걸면 UI 상으로는 똑같이 화면이 바뀌어 보여서 놓치기 쉽다.
- D0 마왕 브리핑 모달(`bossRevealDue()`)은 Day 1에 자동으로 뜨고 실제 DOM 클릭을 막는다(STEP 스크립트 자체는 직접 메서드 호출이라 안 막히지만, 캡처 도구의 실제 클릭은 막힌다). 캡처 전에 `[data-action="boss-seen"]`을 반복 닫는다.
- CSS의 "끝 상태" 문구(예: 이익 금색)는 실제 색상값을 대조해서 확인한다 — 설명과 실제 hex가 다를 수 있다(H4: `.print .profit b`가 오래전부터 초록이었다). 캡처 이미지만 보고 "그럴듯하니 통과"로 넘기지 않는다.
- 캡처 도구가 `Date.now` 래퍼만 걸고 `window.__live=true`를 세션 내내 한 번도 안 켜면(모션 프레임을 안 쓰는 캡처라서), 그 눌림이 트리거한 진입 애니메이션 자체가 `Date.now`를 쓰는 anime 엔진 시계상 영원히 멈춰서(실제로 `anime.umd.min.js`는 `Date.now`를 씀) `opacity:0`에서 안 움직인다 — 실제 wait를 아무리 늘려도 안 풀린다(H6 최초 구현에서 발생, 카드가 통째로 안 보이는 가짜 결함으로 나타났다). 모션이 필요 없는 캡처라도 페이지 로드 직후 `window.__live=true`를 한 번 켜 둔다.
- N일치 시뮬레이션에서 파산 방지용 골드 보정은 STEP 호출 **전에** 건다. STEP의 `closing` 분기 자체가 `liquidate` 후 `closeDay()`(파산 처리 포함)까지 한 번에 하므로, 보정을 STEP 호출 뒤에 걸면 이미 늦다.
- STEP 스크립트는 게임 상태만 직접 메서드로 바꾸고 DOM은 절대 안 건드린다. 여러 날을 빠르게 감고 나서 진짜 클릭을 하기 전에 `Guild24.render()`를 한 번 직접 불러 화면을 최신 상태로 맞춰야 한다 — 안 그러면 클릭 대상이 화면에 없어 타임아웃난다.
- FINAL `원정대 확정`은 팀이 3명 미만이면 바로 커밋되지 않고 `나중에 결정`류 확인 모달(`final-commit-go`)이 먼저 뜬다. D30 시드의 로스터가 3명이 안 될 수 있으니 이 모달도 조건부로 닫아준다.
- 컷(즉시 화면 전환) 캡처에서 "누른 직후"만 찍으면(30ms 등) 이미 있는 진입 모션이 다 나오기 전이라 실제보다 더 "날것 컷"처럼 보인다(User가 잡아낸 실제 사례: H6 CLOSING/END/DAY0 첫 캡처). 컷 자체를 보여줄 즉시 프레임과, 그 화면 자체 모션이 다 끝난 정착 프레임을 같이 찍는다.

### 별도 FIX 대기 (User 결정 전 손대지 않음)

- `npm run qa:visual`
  - 밸런스 변경 뒤 자동 진행이 D5 전에 죽어 boss10 캡처에서 멈춘다(하네스 문제).
  - H5 봉인과 END 제목 사이에 "text collision" 14건이 뜬다. 390 캡처로는 실제로 겹치지 않아 오탐으로 보이며, ROOT CAUSE UNRESOLVED.
  - 그 밖에 기존(`dd3feb4`)부터 있던 20건.

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
