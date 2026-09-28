# WORK_STATE

DATE: 2026-09-28
STATE: V2_9_8_MERGED(PR #19, `621d007`) · V2_9_9_MERGED(PR #20, User 컨펌 2026-09-27) · V2_9_9_QUICK_PATCH(PR #21, User 컨펌 2026-09-28) · V2_9_10_MERGED(PR #22, `8c1d4ae`, User 컨펌 2026-09-28) · V2_9_10_QUICK_PATCH(PR #24, User 컨펌 2026-09-28) — v2.9.2~v2.9.8 태그는 User가 걸어야 함

## Current

- repository: `failab-ist/GUILD24`. main = v2.9.10 + 퀵패치(PR #22, PR #24, Pages 배포). 배포 빌드는 첫 화면 왼쪽 위와 영업 설정 맨 아래 `v{버전} · 커밋`으로 확인한다.
- 버전별 내용과 근거: `design_ssot/CHANGELOG.md`(v2.9.1 ~ v2.9.10). 닫힌 버전의 보고서·측정 도구는 `archive/`.
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- v2.9.8(머지됨): 대응 사다리(초반 대응 / 초반 하이브리드 / 중반 대응 / 후반 하이브리드), 신규 대응 상품 3종 + 방한 두건, id 정리, 세이브 v9.
  근거 `reports/hazard-coverage-v297.md`, `reports/counter-ladder-v297.md`.

## v2.9.10 퀵패치 2차 (머지됨, PR #24) (User 2026-09-28, v2.9.10 플레이 뒤)

- `b9d89e4` 효과 줄 순서 통일(대응 → 피로 회복 → 능력치 → 기타), 본사 1+1 행사 발주 행에 빨간 `1+1` 딱지. CHANGELOG §v2.9.10 quick patch.
- `52de75c` `qa:visual` 코치 확인 간헐 실패 수정(점검 도구만). 빌드 표시는 2.9.10 그대로.
- 같은 PR에 v3.0 준비 문서(`reports/v3.0-prep.md` §3-2 사운드, §6 상업 출시, §7 폴리싱; 채널 = 구글 플레이 먼저 + 웹 체험판, 유료 판매 잠정).
- 다음: User가 직접 플레이로 폴리싱 점검(§7-2). 지적을 받아 배치로 나눈다.

## v2.9.10 퀵패치 (머지됨, PR #22) (User 2026-09-27~28, v2.9.9 플레이 뒤)

브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`(main `8acc8dc`에서 다시 시작, v2.9.9 퀵패치 main을 머지해 둠). 내용과 근거는
`design_ssot/CHANGELOG.md` §v2.9.10. 빌드 표시 2.9.10.

| 커밋 | 내용 | 검사 |
|---|---|---|
| `bcb97ea` | 모든 상품에 카테고리, 희귀도 색 하나로, 유통기한을 `폐기까지 N일`·`내일까지`·`오늘까지`로 | UI-Q-v29-20, ui-guard |
| `aa8c4eb` | 손님 카드가 걸어 들어옴(초상화 대기 실루엣), 마왕 조사창 200ms·올라오기, 발주 `품절` 도장, 그림·폰트 미리 받기 | UI-Q-v29-35, ui-guard |
| `f09e7cd` | Rare Reference 손님 3명(요화니우스·상혀크·진호르) 전용 대사 | COPY_AUDIT §25, copy |
| `f111ab1` | 일반 방문·밤 결과 대사 54줄 추가 | COPY_AUDIT §16/§19, copy |
| `a0c97e3` | 보험: 귀환석 = 성공 못 하면 퇴각 확률 +20%p로 한 번 더, 세계수 = 사망·중상 → 무사 퇴각, 구급키트 문구, `퇴각 확률` 라벨, 위트 대사 3줄 | ITEM-Q11/Q13/Q76, night, copy |
| `49dc19a` | main(v2.9.9 퀵패치) 머지: CHANGELOG는 §v2.9.10 아래 §v2.9.9 quick patch, 원장은 양쪽 보존 | ssot 21/21 |

closeout(2026-09-28): npm test, ssot 21/21, audit, qa:runtime 13/13, qa:visual 126장 통과. 보험 측정은 `reader` 3000런 반사실(CHANGELOG 표). User 컨펌으로 PR #22 머지, Pages 배포 성공.

## v2.9.9 퀵패치 (머지됨, PR #21) (User 2026-09-28, 프레쉬런 D23 검수에서 나옴)

브랜치 `claude/guild24-balance-review-0zo2o5`. 근거 `reports/fresh-run-d23-review-v299.md`, 내용 `design_ssot/CHANGELOG.md` §v2.9.9 quick patch.
- 실패 보상 배율 퇴각 0.40 · 부상 0.25 · 중상 0.15 (`395de5f`). 측정 `tools/measure-wallet-v299.cjs`.
- SALE 폰 플로팅 줄에 `연속 부상 출발 {n}회` (조건·문구는 판독 줄과 같음). 360/390 캡처 User 확인.
- 남은 BALANCE FINDING 후보(결정 안 됨): D11~20 준비도 절벽, 부상 → 가난 → 회복이 느린 고리(부상은 성공 또는 퇴각 회복 25~100%로 풀림). 보고서 §2. 퀵패치 후 첫 런(D16) 검수: 보고서 §5.

## v2.9.9 화면 개선 (머지됨) (User 2026-09-27, 레퍼런스 리뷰에서 나온 배치)

내용 요약은 `design_ssot/CHANGELOG.md` §v2.9.9(화면별로 정리됨). 브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`에서 PR #20으로 머지됨(User 컨펌 2026-09-27).

| 커밋 | 내용 | 검사 |
|---|---|---|
| `25ecfaf` | 장식 배치: 그림 위아래가 잘리는 폰에서도 제자리, 진열대·계산대 장식은 등록기 옆 바닥선 | UI-Q-v29-40, `qa-deco-seating` |
| `41afa58` | 장식 테두리: 바깥선 반 픽셀·55%, 서 있는 장식 발밑은 불투명 | ui-guard |
| `27492fa` | 첫 화면 로고(User 제공, 점 받침 ㅁ 수정) | UI-Q-v29-41 |
| `939ae49` | 새 점포 준비 = 가게 장면(패널 없음), `결과 다시 보기` | UI-Q-v29-42, `qa-prep-scene` |
| `d93186d` | SALE 폰: 전망·능력치 판 하나(진열대 +46px) | UI-Q-v29-43 |
| `a97eabd` | 주 버튼 누름 문법 통일(대각 그림자, 2단 크기, 3단 깊이), 가려지던 그림자 7개 복구 | UI-Q-v29-44, `qa-primary-grammar` |
| `f57b372` | 버튼 계열별 색 통일(ORDER 2개, 벽돌 3개), 새 소리 `begin`·`newstore` | UI-Q-v29-44 |
| `4c1ca31` | 태블릿: 계산대 띠가 그림 계산대를 따라감, 가로 태블릿은 가로 그림 | UI-Q-v29-40 |
| `e13244b` | 새 점포 준비 낮은/큰 화면: 지점명은 타이틀 아래, 게시판 촘촘, 꼬리표·명판 360x640 비중 | UI-Q-v29-41/42 |
| `c36b9e1` | SALE 선반 턱(2px), 진열대 머리 낮춤(진열대 +12px) | UI-Q-v29-45 |
| `a68d463` | closeout 리뷰: 새로고침 회귀 검사, 패킷 정리, Strong Green 문서를 v2.9.9 버튼 문법으로 | `qa-prep-scene`, ssot |
| `6db1607` | 가로로 눕힌 폰도 가로 그림(보드·계산대가 화면 밖으로 나가던 회귀) | ui-guard, `qa-deco-seating` |
| `56fb8bd` `e46f3b2` | FINAL 교전 장면(H7): 보급 → 돌진·반격 → 판정(바닥 근처 멈칫). 판정 결과 재생만, 탭 건너뛰기 | UI-Q-v29-46, `qa-final-clash` |
| `e6c0553` | 빌드 표시 2.9.9 | UI-Q-v29-36 |

시도했다가 뺀 것(User 결정): SALE 목적지 종이 쪽지(혼자 튐), 모험가 카드 합치기, SALE 손님 확대(폰에 자리 없음).
3.0+로 넘긴 것과 미결: `reports/v3.0-prep.md` §2-4.

closeout 완료(2026-09-27): npm test, ssot 21/21, audit, qa:runtime 13/13, qa:visual 126장 통과. User 컨펌으로 PR #20 머지.

## UX 재확인 — 닫힘 (User 2026-09-26, v2.9.3)

2026-09-25에 User 부재 중 추천안으로 들어간 6건을 현재 구현대로 확정했다. SALE 트레이 접기(UI-Q-v29-28), 발주 플로팅 오늘 줄(UI-Q-v29-29),
게이트 방문 최소 1명(NPC_TRAIT destinationCoverage), D30 흐름(FINAL_EXPEDITION §D30 PLAYER FLOW, COPY_AUDIT §14-9), 진열대 요약 문구,
H5 봉인 세부. owner의 "to reconfirm" 표기는 확정 표기로 바꿨다(CHANGELOG §v2.9.3).

## Next

**User 규칙 (2026-09-26~27):**
- PR 머지는 User가 명시적으로 컨펌했을 때만 한다. 의견이 필요한 건 결정 항목과 의견을 먼저 정리해서 묻는다.
- 이름·수치·문구는 실행 전에 보고한다. 화면 작업은 캡처를 보여주고 확인받은 뒤 커밋한다.

다음 작업: v3.0 준비(`reports/v3.0-prep.md`). 연출 작업 전에 아래 함정 목록을 먼저 읽는다.

### User 할 일

1. 태그: `v2.9.2` → `d6fcfbd`, `v2.9.3` → `229df97`, `v2.9.4` → `630b6d0`, `v2.9.8` → `621d007` (GitHub Releases에서 새 태그로 만들면 된다). v2.9.9는 머지 커밋에.

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
- D0 마왕 브리핑 모달(`bossRevealDue()`)은 Day 1에 자동으로 뜨고 실제 DOM 클릭을 막는다(모션을 켠 캡처에서는 MORNING 진입 뒤 420ms 늦게 뜨고, 그동안 `#app`이 inert라 클릭이 안 먹는다 — `boss-seen`이 보일 때까지 기다린 뒤 닫는다; STEP 스크립트 자체는 직접 메서드 호출이라 안 막히지만, 캡처 도구의 실제 클릭은 막힌다). 캡처 전에 `[data-action="boss-seen"]`을 반복 닫는다.
- CSS의 "끝 상태" 문구(예: 이익 금색)는 실제 색상값을 대조해서 확인한다 — 설명과 실제 hex가 다를 수 있다(H4: `.print .profit b`가 오래전부터 초록이었다). 캡처 이미지만 보고 "그럴듯하니 통과"로 넘기지 않는다.
- 캡처 도구가 `Date.now` 래퍼만 걸고 `window.__live=true`를 세션 내내 한 번도 안 켜면(모션 프레임을 안 쓰는 캡처라서), 그 눌림이 트리거한 진입 애니메이션 자체가 `Date.now`를 쓰는 anime 엔진 시계상 영원히 멈춰서(실제로 `anime.umd.min.js`는 `Date.now`를 씀) `opacity:0`에서 안 움직인다 — 실제 wait를 아무리 늘려도 안 풀린다(H6 최초 구현에서 발생, 카드가 통째로 안 보이는 가짜 결함으로 나타났다). 모션이 필요 없는 캡처라도 페이지 로드 직후 `window.__live=true`를 한 번 켜 둔다.
- N일치 시뮬레이션에서 파산 방지용 골드 보정은 STEP 호출 **전에** 건다. STEP의 `closing` 분기 자체가 `liquidate` 후 `closeDay()`(파산 처리 포함)까지 한 번에 하므로, 보정을 STEP 호출 뒤에 걸면 이미 늦다.
- STEP 스크립트는 게임 상태만 직접 메서드로 바꾸고 DOM은 절대 안 건드린다. 여러 날을 빠르게 감고 나서 진짜 클릭을 하기 전에 `Guild24.render()`를 한 번 직접 불러 화면을 최신 상태로 맞춰야 한다 — 안 그러면 클릭 대상이 화면에 없어 타임아웃난다.
- FINAL `원정대 확정`은 팀이 3명 미만이면 바로 커밋되지 않고 `나중에 결정`류 확인 모달(`final-commit-go`)이 먼저 뜬다. D30 시드의 로스터가 3명이 안 될 수 있으니 이 모달도 조건부로 닫아준다.
- 컷(즉시 화면 전환) 캡처에서 "누른 직후"만 찍으면(30ms 등) 이미 있는 진입 모션이 다 나오기 전이라 실제보다 더 "날것 컷"처럼 보인다(User가 잡아낸 실제 사례: H6 CLOSING/END/DAY0 첫 캡처). 컷 자체를 보여줄 즉시 프레임과, 그 화면 자체 모션이 다 끝난 정착 프레임을 같이 찍는다.

### v2.9.9에서 확인된 함정

- 새 점포 준비는 모달이 아니라 장면이다. QA 도구가 `game.start(seed)`로 영업을 강제로 열면 바로 DAY 0 점포지원 화면이 된다. 시작 버튼은
  화면에 있을 때만 누르고, 없으면 `Guild24.render()`로 다시 그려 DAY 0 코치를 정리한다(16개 도구에 반영됨).
- 새 점포 준비 분기처럼 `render()`에서 일찍 `return`하는 화면은 끝의 `showCoach`를 건너뛴다. 이전 화면의 안내 말풍선이 남지 않게 직접 부른다.
- CSS는 모바일 우선: `@media(max-width…)`를 새로 쓰면 ui-guard가 막는다. 폰 규칙을 기본으로 두고 데스크는 `min-width:1024px`에서 되돌린다.
- FINAL 교전 장면은 WAAPI(`el.animate`, fill `both`)를 쓴다. 채워진 애니메이션의 끝 상태는 인라인 스타일을 이긴다. 같은 속성을 나중에 인라인으로 바꾸면 무시되니, 값도 애니메이션 키프레임으로 준다(흰 표식 버그의 원인).
- 런타임 검사 중 스크린샷을 찍으면 그 순간 rAF 프레임이 밀린다. 프레임 단위 측정을 하는 검사에서는 장면 도중에 캡처하지 않는다.
- `director-review.css`는 `ui.css` 뒤에 로드된다. 같은 명시도면 뒤 파일이 이긴다 — `.p-morning.p-prep …`처럼 명시도를 올린다.
- 원장 수정 도구(`$S/ledgerfix.py`)를 다시 돌리기 전에 원장 파일을 `git checkout`으로 되돌리면 이번 배치의 앞선 선언까지 지워진다. 되돌릴 땐 한 번에 전부 다시 선언한다.
- 장식·로고 캡처 도구는 scratch에 있다(`deco-audit.cjs`, `prep-cap.cjs`, `prep-end-cap.cjs`, `sale-measure.cjs`).
- 노치(clip-path)가 있는 요소는 `filter:drop-shadow`도 잘린다(필터가 clip보다 먼저 그려짐). 그림자를 보이려면 clip 도형을 그림자 크기만큼
  넓힌다(`--nd`, UI_UX §PRIMARY ACTION GRAMMAR). CSS 값만 읽는 검사는 이걸 못 잡는다 — 화면 픽셀로 확인한다(`qa-primary-grammar`).
- CSS 변수 안의 `var()`는 **선언한 요소에서** 풀린다. 자식에만 있는 변수를 부모에서 참조하면 값 전체가 무효가 된다(`--band-top` 사례).
- 데스크 게임 영역(`.store`)은 가로 1120px로 제한된다. `cqw` 기준 크기와 "화면 안" 검사는 창이 아니라 이 영역을 기준으로 한다.
- 픽셀 글꼴(Mulmaru)은 12px 격자(12/24/36, 2배 화면에서는 18도)에서만 또렷하다. 명판 글자는 연속으로 키우지 말고 단계로 키운다.
- 한 명령 안에서 `pgrep -f "qa-visual.cjs"`로 기다리면 그 명령줄 자신이 걸려서 끝나지 않는다. 기다리기는 상태 파일로 한다.
- 전체 QA가 도는 중에 파일을 고치면 그 결과는 무효다. 끝난 뒤 고치고 다시 돌린다. 하네스를 따로 돌릴 때는 `QA_PORT`를 바꾼다.
- 그림에 그려진 물체(천장 조명 등)와의 겹침은 DOM 검사로 안 잡힌다. 캡처에서 좌표를 재서 확인한다.

### qa:visual (2026-09-26 해결)

- `npm run qa:visual` 전부 통과(126 캡처, `visual QA clean`). 원인과 수정은 `2e1a045`(하네스: 런 유지, D25 대기, 글자 박스 기준 충돌, 장식 행 예외)와
  `daf83b9`(ORDER 코치 id 버그, 대기 해제). 앞으로 배치마다 qa:runtime과 함께 돌린다.

### 2단계 지침(하네스 엄격)

- 배치마다 전부: `npm test` 전체, `npm run ssot:check`(21/21), `npm run qa:runtime` 12/12, `npm run qa:visual`(clean), 390·1280 BEFORE/AFTER + 모션 프레임 + reduced-motion, 별도 검수 에이전트 판정 → NARROW FIX → 재캡처. 일부만 돌리고 PASS라 하지 않는다. 명령을 `;`로 이어 테스트 실패 뒤 커밋하지 않는다(`&&`).
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
