# WORK_STATE

DATE: 2026-10-01
STATE: V2_9_8_MERGED(PR #19, `621d007`) · V2_9_9_MERGED(PR #20, User 컨펌 2026-09-27) · V2_9_9_QUICK_PATCH(PR #21, User 컨펌 2026-09-28) · V2_9_10_MERGED(PR #22, `8c1d4ae`, User 컨펌 2026-09-28) · V2_9_10_QUICK_PATCH(PR #24, User 컨펌 2026-09-28) · V2_9_11_MERGED(PR #28 · #29 · #30, User 컨펌 2026-09-29) · V2_9_12_MERGED(PR #31 · #32, `f02eb8d`, User 컨펌 2026-09-30) · V2_9_13_MERGED(PR #34, User 컨펌 2026-10-01) — v2.9.2~v2.9.13 태그는 User가 걸어야 함

## Current

- repository: `failab-ist/GUILD24`. main = v2.9.12(PR #31 · #32, `f02eb8d`, Pages 배포). 배포 빌드는 첫 화면 왼쪽 위와 영업 설정 맨 아래 `v{버전} · 커밋`으로 확인한다.
- 버전별 내용과 근거: `design_ssot/CHANGELOG.md`(v2.9.12 ~ v2.9.13, 그 전은 `archive/changelog/`). 닫힌 버전의 보고서·측정 도구는 `archive/`(목록 `archive/README.md`).
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- v2.9.8(머지됨): 대응 사다리(초반 대응 / 초반 하이브리드 / 중반 대응 / 후반 하이브리드), 신규 대응 상품 3종 + 방한 두건, id 정리, 세이브 v9.
  근거 `archive/v2.9.7/hazard-coverage-v297.md`, `archive/v2.9.7/counter-ladder-v297.md`.

## v2.9.13 퀵패치 (User 2026-10-01, 버전 2.9.13 유지)

내용은 `design_ssot/CHANGELOG.md` §v2.9.13 quick patch. v2.9.13 머지 뒤 플레이에서 나온 버그·불편 수정이라 버전은 그대로 둔다.

| 묶음 | 내용 |
|---|---|
| SALE | 판독 제목 `전투 전망` 복구(폰에서 두 칸이 한 줄에), 첫 SALE 전망 코치 복구와 문구 수정, PC 손님 카드 높이를 옆 정보 칸에 맞춤 |
| 코치 | 말풍선 폭을 문장에 맞춤(줄 수 최소), NIGHT 부상 코치는 처음 부상·중상으로 돌아온 기록에 |
| ORDER | 창고: 폰은 보유 칸만(줄 수가 재고에 맞게, 늘 때 시트가 자라는 연출), PC는 전체 칸 |
| 상품 | 초코바 기동 +6 · 피로 회복 5, 새 C등급 음식 녹차 양갱(정신 +8 · 피로 회복 5, 30G) — 카탈로그 44종 |

검증(바꾼 부분만): `npm test` · `npm run audit` · `git diff --exit-code`, 바뀐 화면 캡처(SALE 360/390/1280, ORDER 390/1280, 코치 360/390/1280), qa-visual 코치 검사, ORDER 창고 시트 실시간 프레임 측정.

## v2.9.13 — 0930 D30 클리어 세이브 뒤 밸런스 (User 2026-09-30 ~ 10-01)

내용과 근거는 `design_ssot/CHANGELOG.md` §v2.9.13. 빌드 표시 2.9.13. main(PR #33 SSOT 정리)을 받아 규칙 변경을 새 owner 위치에 옮겼다.
검증(패치 버전이라 바꾼 부분만): `npm test` · `npm run audit` · `git diff --exit-code`, 환경 대응 화면 캡처 360 / 390 / 412 / 430 / 1024 / 1280(레이아웃 검사 통과). 전체 `qa:runtime` · `qa:visual`은 돌리지 않았다.

| 묶음 | 내용 | 근거 |
|---|---|---|
| 곡선 | DAY 21+ 게이트 기울기 0.80 → 1.10 | DUNGEON_HAZARD §GATE POWER, `reports/balance-proposal-v2912.md` §1 |
| 위험 | 위험 수치 능력치 계열 배율(강인함 1.0 · 기동 1.1 · 정신 1.2), 대응 수치 같은 배율로 상향, 초반 하이브리드를 초반 대응 아래로, 위험 특성 같은 배율 | DUNGEON_HAZARD §HAZARD THREAT, ITEM §COUNTER LADDER, §7~9 |
| 파이널 | 평균 위험 격차 계수 1.70 → 2.50 | FINAL_EXPEDITION §INDIVIDUAL FINAL POWER |
| 캐피탈 | 비율 1/2/3/3/3%, 훈련소 제휴 간판 40% | META, §4 |
| 상품 | 용사의 곡주 강인함 −3, 세계수 생환부적 300 / 600 | `reports/item-price-v2913/`, `reports/counter-ladder-v2913/` |
| 화면 | T2부터 환경 대응을 위험별로(판독 · 고정 전망), 2줄 유지 | SALE, UI_UX §SALE outlook / UI-Q109 |
| 측정 | 숙련봇 `expert`, 측정 기준 `reader`(하네스 기본값 · 테스트 · 도구) | `reports/expert-bot-calibration-v2912.md`, META |
| 재측정 | reader D30 12.3% · 클리어 7.7%, expert 30.3% · 18.0%, 장식 4종 reader Run 4/5/7/9 | §10 |

## v2.9.12 — 밸런스 리뷰 + v3.0 준비 퀵패치 (머지됨, PR #31 · #32) (User 2026-09-29~30)

내용과 근거는 `design_ssot/CHANGELOG.md` §v2.9.12. 빌드 표시 2.9.12. 머지 전 전체 검증(HEAD `4e226a2`): `npm test` · `audit` · `ssot:check` 21/21 ·
`qa:runtime` 16/16 · `qa:visual` clean.

| 묶음 | 내용 | 근거 |
|---|---|---|
| 밸런스 리뷰(PR #31, 다른 세션) | 첫 판 레슨(DAY 1 대응 상품 · DAY 1~2 사망 없음 · DAY 3 부상 · 보수날 손님), NIGHT 발견 안내, END 다회차 줄 위치 | CORE_RUN §FIRST-RUN LESSONS, NIGHT_CLOSING §DISCOVERY LINE |
| 폰 · 소리 | iPhone Safari · SE · 갤럭시 360×597, BGM/효과음 폰 기준 평탄화 · 리미터, 페이즈 BGM 1초 페이드 뒤 시작 | `archive/v2.9.11/ios-safari-v2911.md`, `archive/v2.9.11/bgm-sfx-mix-v2911.md` |
| 화면 | ORDER 떠 있는 박스 접기 · 창고 패널, 데스크 전용 SALE, 데스크 폭 1440, `오늘 폐쇄` 게이트, 장식 구매 스크롤 유지 | UI_UX 해당 절 |
| END | 최고 총매출 다회차 줄, `이 점포의 기록` 블록 | UI_UX §END — THIS RUN BLOCK / REPLAY NUDGE |
| D30 | 발주 중 `원정대 후보 보기`, 원정대 준비 `자세히 보기` | FINAL_EXPEDITION §D30 PLAYER FLOW |
| 밸런스 | 화염 섞인 마왕전 +18(reader 3,000: 74.3/65.5 → 63.4/64.8%) | `reports/v3-prep-measure-v2911.md` §6, `tools/measure-firepair.cjs` |
| 튜토리얼 | II · 화염 게이트 안내, 코치 정리(12개 은퇴 · 가격 사후 안내, 첫 판매 24 → 12탭) | `reports/v3.0-prep.md` §9-6 |
| 위생 | `fire -> 정신` · `dark -> 기동` 옛 줄 정정, AGENTS 9-A(시뮬레이션은 User 컨펌 뒤), 닫힌 버전 보고서 · 도구 archive 이동 | `archive/README.md` |

## v2.9.11 — v3.0 준비 1차 (머지됨, PR #28) (User 2026-09-28~29)

브랜치 `claude/v3-0-prep-planning-g42z7y`. 내용과 근거는 `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` §v2.9.11. 빌드 표시 2.9.11.

| 묶음 | 내용 |
|---|---|
| 1차 (09-28) | 밤 폐기 · 이름 35개 교체 · Rare Reference 제거 · 원정 점포지원 2장(야전 들것 · 응급 처치대) · 사건 40% · 중복 금지 · 새 사건 32종 |
| 곡선 | 초반 게이트 기울기 1.50 → 1.40 → **1.45**(`9c6bd1c`), 마왕 전력 유지 |
| 점포지원 | 신선체계 매입가 +15% · 도시락 코너 음식 +2 / 음료 +1 / 위험 +2 · 왕도 인증 60% · 물류 본부계약 리메이크(전날 판매 1건당 발주 −3%, 최대 −30%) · 즉석식품 코너 운영비 절 삭제 · 희귀상품 입고 계약 본사 +10% · 평생 단골제 재방문 +100% |
| 장식 | 길드 추천 매대 45% · 명예 모험가 액자 가중치 [25, 30, 26, 13, 6] |
| 화면 · 문구 | 전역 keep-all(단어 중간 줄바꿈 297 → 0) · 문구 교정 1~4배치 · 첫 발주 튜토리얼 `창고` 단계 · 아침 DAY 간판 넘김 · FINAL 균열 NIT |
| 사운드 | 녹음 BGM(페이즈별 · 결말 성공/실패, 원곡 전체 루프, BOSS 1초 크로스페이드) · 웹 128 kb/s + 다음 곡 미리 받기 |

측정 기록: `archive/v2.9.11/remeasure-v2911.md` §1~§14 · v3.0 준비 §8 측정(장식 전부 보유 곡선 · 넛지 공백 · RUN-Q15 · 360 SALE): `reports/v3-prep-measure-v2911.md`
- v2.9.10 대비 전체는 §12
- 마지막 확인은 §14
- 도구: `tools/remeasure-v2911.cjs`(REMEASURE_EARLY / REMEASURE_BALANCE 메모리 시안), `tools/deco-impact.cjs`(약한 장식 팔)

줄바꿈 점검: `tools/qa-text.cjs`, `archive/v2.9.11/text-audit-v2911.md`.

문구 교정: `archive/v2.9.11/copy-proofread-v2911.md`
- 1배치(상품 · 사건) · 2배치(점포지원 · 장식) · 3배치(화면)를 모두 반영했다(`f762b85` · `9d9a4d9` · `5ff4d6e`).
- 4배치(NPC 대사, 14개)도 반영했다. 겁쟁이 유행어 대사는 User 결정으로 유지.

최종 QA (2026-09-29, HEAD `897425c`, PR #28)
- 전체 `npm test` PASS · `tests/revision.cjs` 39 · `ssot:check` 21/21
- `qa:runtime` 15/15(`qa-bgm` 35 · `qa-day-flip` 12 · `qa-final-clash` 222) · `qa:visual` clean(126장)
- 이전 최종 QA(HEAD `5ff4d6e`): `qa:runtime` 13/13
- `tools/qa-text.cjs`: 단어 중간 줄바꿈 0 · 한 글자 줄 0. 넘침 · 잘림은 이전과 같은 오탐 두 항목(SALE 칩, FINAL 이름표)뿐이다.

## v2.9.10 퀵패치 2차 (머지됨, PR #24) (User 2026-09-28, v2.9.10 플레이 뒤)

- `b9d89e4` 효과 줄 순서 통일(대응 → 피로 회복 → 능력치 → 기타), 본사 1+1 행사 발주 행에 빨간 `1+1` 딱지. archive CHANGELOG §v2.9.10 quick patch.
- `52de75c` `qa:visual` 코치 확인 간헐 실패 수정(점검 도구만). 빌드 표시는 2.9.10 그대로.
- 후속 PR(User 컨펌 2026-09-28): `본사 폐기 유예`(오늘 밤 폐기될 상품만 유통기한 +1일, 환급 폐지), 슬로스 봉인 해제 창이 닫힘·`닫기`,
  보유 점포지원 목록의 `슬로스 봉인 해제 N / 3`(D15부터), 봉인 칸 보라 판·`접기`·칩 접기.
- 같은 PR에 v3.0 준비 문서(`reports/v3.0-prep.md` §3-2 사운드, §6 상업 출시, §7 폴리싱; 채널 = 구글 플레이 먼저 + 웹 체험판, 유료 판매 잠정).
- 다음: User가 직접 플레이로 폴리싱 점검(§7-2). 지적을 받아 배치로 나눈다.

## v2.9.10 퀵패치 (머지됨, PR #22) (User 2026-09-27~28, v2.9.9 플레이 뒤)

브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`(main `8acc8dc`에서 다시 시작, v2.9.9 퀵패치 main을 머지해 둠). 내용과 근거는
`archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` §v2.9.10. 빌드 표시 2.9.10.

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

브랜치 `claude/guild24-balance-review-0zo2o5`. 근거 `archive/v2.9.9/fresh-run-d23-review-v299.md`, 내용 `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` §v2.9.9 quick patch.
- 실패 보상 배율 퇴각 0.40 · 부상 0.25 · 중상 0.15 (`395de5f`). 측정 `archive/v2.9.9/tools/measure-wallet-v299.cjs`.
- SALE 폰 플로팅 줄에 `연속 부상 출발 {n}회` (조건·문구는 판독 줄과 같음). 360/390 캡처 User 확인.
- 남은 BALANCE FINDING 후보(결정 안 됨): D11~20 준비도 절벽, 부상 → 가난 → 회복이 느린 고리(부상은 성공 또는 퇴각 회복 25~100%로 풀림). 보고서 §2. 퀵패치 후 첫 런(D16) 검수: 보고서 §5. v2.9.11 클리어 런 검수와 왕도 프리미엄 인증 · 원정 도시락 코너 조정(User 2026-09-29): 보고서 §7~8.

## v2.9.9 화면 개선 (머지됨) (User 2026-09-27, 레퍼런스 리뷰에서 나온 배치)

내용 요약은 `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` §v2.9.9(화면별로 정리됨). 브랜치 `claude/v2-9-2-presentation-game-feel-4if32m`에서 PR #20으로 머지됨(User 컨펌 2026-09-27).

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
H5 봉인 세부. owner의 "to reconfirm" 표기는 확정 표기로 바꿨다(archive CHANGELOG §v2.9.3).

## v3.0 사운드 — 녹음 BGM 연결 (User 2026-09-29)

- 곡: User가 제미나이(Lyria)로 만든 곡이다. 원본은 `assets-src/bgm/`, 배포본은 `dist/ui/assets/bgm/`(바이트 동일, 9곡 33 MB)다. 출처는 `reports/ASSETS.md`에 있다.
- 루프 선택: `reports/bgm-loops.md`(원곡 전체 보존 방식, `tools/bgm-loop.py`)
  - TITLE · SALE · NIGHT · CLOSE = S1E1
  - MORNING = S1E3
  - ORDER = S1E2
  - SUCC · FAIL = S1E2
  - BOSS = BOSS1 S3R2 + 1초 크로스페이드(BOSS만 예외). BOSS2는 미채택.
- 엔진(`dist/ui/audio.js`)
  - 한 번에 한 곡만 32 kHz로 디코드하고, 오디오 시계로 s → e를 반복한다.
  - 페이즈별 곡은 `audioPhase()`로 고른다. 결말은 SUCC / FAIL로 나뉜다.
  - 곡마다 음량을 BGM_LUFS −30으로 맞춘다(NIGHT는 3 dB 더 작게). 효과음은 큐마다 등급 레벨(LEVEL, tools/qa-sfx-mix.cjs, 폰 스피커 기준 · 출력 리미터 −3 dBFS)이다. 페이즈 전환은 1초 페이드아웃 뒤 1.5초 페이드인이다(퀵패치, User 2026-09-29).
  - 로드에 실패하면 신스로 대체한다.
- 문서: PRESENTATION §AUDIO PRESENTATION(AI 음악 조항), UI_UX §AUDIO FEEDBACK — PHASE BGM, UI-Q-v29-47, archive CHANGELOG §v2.9.11
- 최종 QA (2026-09-29, HEAD `4c2704b`)
  - 전체 `npm test` PASS · revision 39 · `ssot:check` 21/21
  - `qa:runtime` 14/14(`qa-bgm` 29/29 새로 추가) · `qa:visual` clean(126장)
- 남은 것(User)
  - 실기기 청취: UI-Q114 · UI-Q-v29-47. 음량 −24 LUFS와 이음새를 확인해야 한다.
- 웹 BGM(User 2026-09-29)
  - 128 kb/s 사본으로 22 MB이고, 다음 페이즈 곡을 미리 받는다.
  - 웹 사본에는 C2PA가 빠지므로, 크레딧과 스토어 설명에 AI 음악 고지가 필수다(출시 작업의 크레딧 항목).
  - 앱은 원본(C2PA 포함)을 쓴다. 앱으로 옮길 때 음량 기준값을 다시 잰다(원본이 약 0.4 dB 크다).

## Next

**User 규칙 (2026-09-26~27):**
- PR 머지는 User가 명시적으로 컨펌했을 때만 한다. 의견이 필요한 건 결정 항목과 의견을 먼저 정리해서 묻는다.
- 이름·수치·문구는 실행 전에 보고한다. 화면 작업은 캡처를 보여주고 확인받은 뒤 커밋한다.

- 검증 범위 (User 2026-10-01): 고친 부분과 꼭 필요한 검사만 돌린다.
  - 바꾼 영역의 테스트, 화면을 바꿨으면 그 화면만 캡처(폰 · 데스크), 흐름을 바꿨으면 그 흐름의 `qa:runtime` 하네스만.
  - 전체 `qa:runtime` · `qa:visual`은 큰 버전 업(x.y.0, 예: v3.0.0)에서만 한다. 패치 버전(v2.9.x)의 PR에는 돌리지 않는다.
  - 보고에는 무엇을 돌렸는지 적고, 일부만 돌린 것을 전체 PASS라고 하지 않는다(AGENTS §5).
- PR 전에 꼭 돌리는 것은 Pages `verify`와 같은 순서의 `npm test` → `npm run audit` → `git diff --exit-code`뿐이다. audit가 Source에서 다시 만드는 보고서(`reports/ITEM-PRICES.md` 등)가 최신이 아니면 배포가 거부된다(v2.9.11 PR #28, 2026-09-29).
- 보고·핸드오프는 한글(AGENTS §11-A). 이름·사건·수치는 초안을 보여주고 컨펌 뒤 적용한다.

다음 작업:
1. v2.9.12는 PR #31 · #32로 머지했다(User 2026-09-30). User 플레이로 확인한다: 코치 정리 뒤 첫 판, 가격 사후 안내, END `이 점포의 기록`, D30 후보 보기, 화염 게이트 안내.
2. 보류 · 결정 대기
   - 지역 거점점 계약 리메이크(수치로는 D30 +1%p를 못 넘음, `archive/v2.9.11/remeasure-v2911.md` §13-2) — User 플레이 뒤 판단(2026-09-29)
   - 마왕별 승률 폭(SLOTH 56.7 ~ LUST 81.8%) — 마왕 전력 유지로 결정, 기록만
   - 생존 · 경제 장식만 모으는 궤적의 낮은 클리어(§12-3-5)
   - 화염 조합 +18: v2.9.13에서 다시 쟀다(reader 3,000, 화염 섞임 38.7 ±7.8% · 그 외 45.1 ±6.2%, 오차 안). 그대로 둔다(`reports/v3-prep-measure-v2911.md` §6).
3. v3.0 준비의 남은 순서(`reports/v3.0-prep.md` §6-7)
   - 세이브 호환성 경계 → 크레딧 · 오류 보고 → 앱 래퍼 → 사운드(BGM 연결 완료, 실기기 청취 남음) → 행정
   - 출시 준비 외 작업은 §8, 1위 루브릭은 §9.
4. 다른 세션: 1위 인터뷰(`reports/interview-1st-place.md`). v2.9.13 밸런스는 이번 병합으로 main에 들어간다.
5. 참고: `tests/simulation.cjs` RUN-Q15의 표본 가정은 v2.9.11에서 TEST GAP으로 고쳤다(`4c6d870`).
6. SSOT 재정리(User 2026-09-30): `design_ssot/` 105개·2.0 MB → 18개·0.89 MB. 내용은 `design_ssot/CHANGELOG.md` §Docs / hygiene after v2.9.12.
   다시 쓰다가 드러난 Canonical 불일치는 User 결정("코드에 맞춰 정정")대로 모두 코드·owner 규칙 절에 맞췄다.
   - ITEM QA: 값 목록 대신 §ACTIVE CATALOG를 가리킨다
   - `피로 A → 출발 B` 줄이 없다는 규칙으로 통일
   - 첫 발주 코치
   - RELIC 카드 문구
   - META Save v9
   - SPEC_INDEX scope C
   - ORD-Q85(방문객 수)
   - UI-Q-v29-55
   - SUPPLY MODEL(길드 특제 도시락 7)
   - Day term 예시값
   - DUN-Q75
7. v2.9.13 병합(User 2026-10-01): main(PR #33)을 받아 `design_ssot` 변경을 새 owner 위치에 현재형으로 옮겼다(QA는 각 owner §QA, 원장 수정은 버림). 원자료 JSON(`reports/counter-ladder-v2913/`, `item-price-v2913/`)은 지우고 결론 README만 남겼다. `reports/expert-bot/`의 두 JSON은 expert 봇과 측정 도구가 읽는 입력이라 남겼다.
   - SNS · 트레일러 문서 브랜치(`ccr-5e99c18d`, `docs/sns-development-story-20260930`)는 `reports/`에 파일만 추가하므로 언제 머지해도 충돌이 없다.
8. 리팩터링(`ccr-4a2ee33b-4r88nj`, "동작은 그대로", User 2026-09-30 ~ 10-01): 머지됨(PR #38, `70e9d39`). `dist/ui/app.js`의 큰 함수를 같은 파일 안 헬퍼로 나눴다: `playPhase` → `phaseMorning` ~ `phaseSell`, `playCue` → `cueSelect` · `cueOrder` · `cueSale` · `cueRefuse`, `render` → `phaseScreen` · `openOwedModal` · `syncWatchers`, `closingScreen` → `closingReceipt` · `closingDock`, `finalScreen` → `finalThreat` · `finalMuster` · `finalDock`, `orderForm` → `orderOffer`, `clashScene` → `clashMarkup`. `tests/ui-guard.cjs`의 소스 가드도 같은 함수를 읽도록 옮겼다(assertion 그대로). 이 구간을 고칠 때는 새 함수 이름으로 찾는다. 하지 않은 것: `saleScreen`, `clashScene` 시간축, `statGrid` · `readout` · `beat` · `till` · `bossReveal`, `systems/*`.
9. 코드 읽기·정리 규칙(User 2026-10-01 "효율적인 방법으로"): `dist/ui/app.js` 글자의 45%가 주석이다. 코드를 읽을 때는 `node tools/fn.cjs <파일> <함수...>`로 주석을 뺀 함수를 먼저 본다(`--keep-comments`로 원문; 자르기·주석 제거는 `tests/ui-guard.cjs`의 `fn()` · `bare()`와 같다). 소스 글자 검사(ui-guard의 `fn()` 슬라이스 281곳 · 파일 전체 검사 342곳)와 긴 주석은 한꺼번에 고치지 않는다. 함수를 고칠 때 그 함수에 걸린 검사만 동작 검사로 바꾸고, 그 함수 주석만 설계 근거(Canonical 섹션 이름)를 남기고 날짜·경위 서술을 줄인다.

연출 작업 전에 아래 함정 목록을 먼저 읽는다.

### User 할 일

1. 태그(User 2026-10-01): v2.9.13부터 버전이 main에 머지된 직후 그 머지 커밋에 붙인다(GitHub Releases, 대상 `main`). `v2.9.13` → `f20f89a`(PR #34). v2.9.12까지는 붙이지 않는다(커밋 기록은 CHANGELOG §RELEASE RECORD).

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
  `daf83b9`(ORDER 코치 id 버그, 대기 해제). 전체 실행은 큰 버전 업에서만 한다(§Next 검증 범위).

### 2단계 지침(하네스 엄격)

- 배치마다: 바꾼 화면의 390·1280 BEFORE/AFTER + 모션 프레임 + reduced-motion, 바꾼 흐름의 `qa:runtime` 하네스, 별도 검수 에이전트 판정 → NARROW FIX → 재캡처. 전체 `qa:runtime` · `qa:visual`은 큰 버전 업에서만(§Next 검증 범위). 일부만 돌리고 전체 PASS라 하지 않는다. 명령을 `;`로 이어 테스트 실패 뒤 커밋하지 않는다(`&&`).
- 새 한글 글자는 폰트 서브셋 검사에 걸린다(코멘트 포함) — 새 카피가 없으면 새 글자도 없어야 한다.
- 핀 누락은 커밋 전에 잡는다. 계약(≤ 320 ms, 임팩트 예산, 카드 안, 금지 목록)을 넘는 제안은 구현하지 않고 보고한다.
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
