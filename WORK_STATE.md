# WORK_STATE

DATE: 2026-10-07
STATE: V2_11_1 (마이너 UI 피드백 · 첫 마왕성 단계별 코치, User 화면·main 머지·패치 버전 컨펌 2026-10-05). 버전마다 머지 PR · 커밋 · 태그는 `design_ssot/CHANGELOG.md` §RELEASE RECORD.

## Current

- repository: `failab-ist/GUILD24`. 현행 승인 버전은 v2.11.1(마이너 UI 피드백 · 첫 마왕성 단계별 코치, `codex/minor-ui-feedback`의 main 머지 PR). 직전은 v2.11.0(PR #111, 이후 UI PR #112 · #113 포함). 배포 빌드는 첫 화면 왼쪽 위와 영업 설정 맨 아래 `v{버전} · 커밋`으로 확인한다.
- 버전별 내용과 근거: `design_ssot/CHANGELOG.md`(v2.9.12 ~ v2.10.3, 그 전은 `archive/changelog/`). 닫힌 버전의 보고서·측정 도구는 `archive/`(목록 `archive/README.md`).
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- 로컬 후속 작업(User 2026-10-06): 대응 음식·음료 7종 피로 회복만 PR #107 이전으로 복원(`3b09af23`), 가격·직접 대응은 유지. 직업 계측 도구 `eac6111b`로 기준+성장 비용 ×8+후반 전투 1.00/1.05, 60,000런 측정 완료. 후보는 Production 미적용이고 직업·마왕·환경 변경도 미적용. main 머지/배포는 아직 하지 않았다. 결과 `reports/v2100-measure/fresh-candidates-20261006/REPORT.md`.
- 로컬 롤백 밸런스 기준 로그: `reports/v2100-measure/fresh-candidates-20261006/baseline.log`(도구 `eac6111b`, 확정 회복 롤백 기준). 이전 배포 버전 기준은 `reports/v2100-measure/v2103-bots-baseline.log`. 플레이타임 `v2102-playtime-full.log`(측정 방법은 `AGENTS.md` §9-B).
- 후속 결정/읽기(User 2026-10-06): 균형 봇은 기준 평가와 기본 측정에서 제외(`1aa258e0`). 기존 데이터의 프레시 도달/도달 시 클리어·직업 후반 사망/종료 생존은 `reports/v2100-measure/fresh-candidates-20261006/FOLLOWUP.md`. D30 생존 난이도와 도달 후 마왕전 난이도를 분리하는 방향이며 마왕/성장 새 수치는 아직 미적용. 추가 시뮬 없음.
- 보호 ON 새 측정(User 2026-10-06): 기준+A~D+마왕5% 전체 조합 E, 84,000런 완료. 결과 `reports/v2100-measure/protected-combos-20261006/REPORT.md`(도구 `4b5024a7`, 후보 기준 `5b9b5c95`). E의 템 지급 도달 후 클리어 25.5/30.6%, C 마왕10%도 33.3/39.3%로 목표50~60% 미달. 성장/전투/마왕/법사 후보는 Production 미적용. 퇴각 경험치 전역 상향은 거절, 처진 인원만 부스트는 수치 미확정·본 6조건 미포함. 마왕 환경/화염 개별 조정·도적/광전사 수치도 미적용. 광전사 실제 출전 표본0이다.

## 최근 버전 (User 2026-10-02 ~ 10-04)

추가 측정(User 2026-10-07): 마왕5%·화염12·처진 인원XP×1.5를 공통으로 환경 차감2.5/2.0, 28000런 완료. 템 지급 프레시 도달 후 클리어28.1/33.9%와33.0/40.1%, 세이브 수준 레벨 참고 집단은2.0에서45.5/57.1%다. 전체 목표50~60% 미달은 BALANCE FINDING. 결과 `reports/v2100-measure/environment-boost-20261007/REPORT.md`. Production 후보 미적용. 다른 세션 `b22afde7`의 전문 포션 유통 계약은env20 배경에서 추가 칸0/1, 별도28000런을 진행 중이다.

| 버전 | 내용 |
|---|---|
| v2.11.1 (User 2026-10-05 컨펌) | 밤 피로 변화 오버레이 · 실제 원인 기록 · 장식 반영, 바가지 거절 영수증 · 건강 표기 생략, 발주 위험 보기 압축 · 리롤 PNG · DAY 4 안내, 첫 마왕성 단계별 코치 · 개인별 환경 대응 · 소지금 표기. 판정·밸런스 변경 없음 |
| v2.9.14 (PR #50) | 플레이 피드백: 환경 대응을 SALE에 숫자로(선택 상품 미리보기), 미방문 지갑, 대응템 보장이 리롤까지 셈, 야전 정비대 모든 대응 강화, 원정 전문 인증 → 원정 작전실, 무료 점포지원은 `선택` |
| v2.10.0 (PR #52) | 성공 메타: 숨은 평판 제거, 게이트 성공 상향, 대응 따라 사고 증가, 지갑이 결과를 따라감, 준비 부족 실패 비용, 마왕전 보정, 장식 재조정(추모 방명록 +1 · 알뜰 금고 등), 장식 구매 키 축소 |
| 퀵패치 1 (PR #54) | SuccessEase D1~21 0.90 · D22+ 0.95, 위험 위협 후반 가산(D8부터, 최종전 제외), 능력치 → 대응 환산 모두 3당 1(계열 계수 없음), 대응 사다리 · 음식 · 음료 재조정(영웅 음식 · 음료 투력 +5), 능력치 부가 역할(강인함 사고 · 기동 퇴각 · 정신 사망), 레벨 · 지갑 스노우볼 완화, D1~4 신규 Lv1~2 |
| 퀵패치 2 (PR #55) | 방문 지갑 Level × 4 + 30~70, 미방문 지갑 적립 상향, 운영비 기준 170G 유지 |
| v2.11.0 (PR #111) | 점포지원 등급 일반 17 · 희귀 10 · 영웅 7(카드마다 60 / 28 / 12, DAY 0은 일반), 점포지원 효과 조정 · 새 점포지원 3개 · 단골 묶음혜택 은퇴, 운영형 장식 4개, 사건 DAY 1부터(첫 판 DAY 1 제외), 결전 흔들림 0.92~1.08, 장식 그림 규칙(UI_UX §DECORATION ART). 측정 `reports/relic-balance/v2105-after/`. 내용은 CHANGELOG §v2.11.0 |
| v2.10.3 이후 (PR #94 · #95 · #96 · #97) | 버전은 그대로 2.10.3: 밤 결과에 전투 승패만 증명하는 문장(○○ 덕분에 전투에서 이겼다), 능력치 코치 포션 한 문장, 환경 대응 코치 DAY 3 · 가방 코치 DAY 4, 설정 > 안내 스위치(끄기 / 다시 보기). 내용은 CHANGELOG §After v2.10.3 |
| v2.10.3 (PR #92, 측정 봇 PR #93) | 바가지가 거절되면 그 상품은 그 방문에 못 팖(단골도 −2, 판매 −4), 왕도 인증 40%, 첫 판매 가격 키 코치(50% 사후 안내 은퇴), 바가지 거절 대사 6줄, 프롤로그 5장면, 코치 DAY 1~4 분산, ORDER 오늘 줄, iOS 첫 터치 소리 |
| v2.10.2 (PR #75 + 버전 PR, 퀵패치 1 PR #80: 세이브 빌드 정보) | 프레젠테이션만: 로딩 화면, 가방 글씨, 장식 창, 발주 · 판매 스크롤, 판매 화면 폰 여백 · 스탯 변화 색 · 소지금 줄, 모든 문장 블록 문장 단위 줄바꿈(규칙 · 밸런스 변경 없음) |
| v2.10.1 (PR #64 · #66) | 디자인 정리: 판매 화면 폰·PC, 단골 배지, 밤·마감·END 편의점 배경, 나무 시트, 발주서 양피지(규칙 · 밸런스 변경 없음) |
| 퀵패치 3 (PR #56) | 발주 대응템 최대 4칸(추가 칸만큼 상한 증가), 신규 레벨 따라잡기(D5부터 Day 항 ×0.4), 실패 비용 강화(사망 계수 0.40 / 0.25, 퇴각 기본 0.40, 연속 부상 +12%p · 상한 40%p), 리롤 버튼 축소 · 우정렬 |

QP3 측정(프레시 1000판, reader / expert): D30 도달 27.5 / 28.0%, 클리어 8.5 / 8.8%, 좀비 약 10%.
시험 뒤 버린 안: 신규 1티어 우선 배정, SuccessEase 0.85 / 0.90(`archive/v2.10.0/v2100-measure/qp3-bundle.log`, 모든 구간이 쉬워짐), 신규 Day 항 ×0.33(`archive/v2.10.0/v2100-measure/qp3-option1-lv033.log`, D30 도달 16~19%).

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

검증 범위 · PR · 머지 규칙은 `AGENTS.md` §6-A, 밸런스 측정은 §9-B, 보고 · 핸드오프 언어는 §11-A.

다음 작업:
1. v2.10.3을 User 플레이로 확인한다: 바가지 거절 대가(그 상품은 그 방문에 못 팖 · 단골도 거절 −2 / 판매 −4), 첫 판매 가격 키 코치, 왕도 인증 40%. 세이브에 런 시작 빌드가 찍히므로 `node tools/save-check.cjs <세이브>`로 v2.10.3 판인지 바로 가린다.
   - 열린 관찰: Day 항 ×0.4라 D25 이후 신규가 Lv10 안팎으로 나와 기존 핵심 NPC와 비슷해진다. ×0.33은 D30 도달 16~19%로 너무 빡빡해서 버렸다. 플레이 뒤 상한이 필요한지 판단한다.
   - v2.11.0을 플레이로 확인한다(User 2026-10-05): 휴식 바우처 꽂이(피로 −6)는 측정으로는 약하지만(D30 +0.8%p) 뽑으면 플레이 성향이 달라질 수 있어 플레이로 본다. 지원 교환 쿠폰함은 봇이 후보 교환을 쓰지 않아 측정 불가. 측정 근거 `reports/relic-balance/v2105-after/`.
   - 결정(User 2026-10-04): 처진 초반 손님(그날 신규 최저 레벨 아래)은 규칙 · 코치 모두 그대로 둔다. 할인으로 좋은 상품을 쥐여 주면 절반 이상 살릴 수 있어 투자 여부가 플레이어의 선택이다(`reports/v2100-measure/v2103-behind-bags.log`).
2. 보류 · 결정 대기
   - 지역 거점점 계약 리메이크(수치로는 D30 +1%p를 못 넘음, `archive/v2.9.11/remeasure-v2911.md` §13-2) — User 플레이 뒤 판단(2026-09-29)
   - 마왕별 승률 폭(SLOTH 56.7 ~ LUST 81.8%) — 마왕 전력 유지로 결정, 기록만
   - 장식(User 2026-10-04 점검): 4칸은 7~8판째(목표 9판쯤 안). 경제 장식은 10판째 현금/일이 약 3배(240~259G)지만 클리어는 생존 장식과 같은 22~30%라 지금은 그대로 둔다(`reports/v2100-measure/v2103-full.log`).
   - 화염 조합 +18: v2.9.13에서 다시 쟀다(reader 3,000, 화염 섞임 38.7 ±7.8% · 그 외 45.1 ±6.2%, 오차 안). 그대로 둔다(`archive/v3.0-prep/v3-prep-measure-v2911.md` §6).
3. v3.0 준비의 남은 순서(`reports/v3.0-prep.md` §6-7)
   - 세이브 호환성 경계 → 크레딧 · 오류 보고 → 앱 래퍼 → 사운드(BGM 연결 완료, 실기기 청취 남음) → 행정
   - 출시 준비 외 작업은 §8, 1위 루브릭은 §9.
4. 다른 세션: 1위 인터뷰(`reports/interview-1st-place.md`).
5. 남겨 둘 입력: `reports/expert-bot/`의 두 JSON은 expert 봇과 측정 도구가 읽는다. SNS · 트레일러 문서 브랜치(`ccr-5e99c18d`, `docs/sns-development-story-20260930`)는 `reports/`에 파일만 추가하므로 언제 머지해도 충돌이 없다.
6. 리팩터링(`ccr-4a2ee33b-4r88nj`, "동작은 그대로", User 2026-09-30 ~ 10-01): 머지됨(PR #38, `70e9d39`). `dist/ui/app.js`의 큰 함수를 같은 파일 안 헬퍼로 나눴다: `playPhase` → `phaseMorning` ~ `phaseSell`, `playCue` → `cueSelect` · `cueOrder` · `cueSale` · `cueRefuse`, `render` → `phaseScreen` · `openOwedModal` · `syncWatchers`, `closingScreen` → `closingReceipt` · `closingDock`, `finalScreen` → `finalThreat` · `finalMuster` · `finalDock`, `orderForm` → `orderOffer`, `clashScene` → `clashMarkup`. `tests/ui-guard.cjs`의 소스 가드도 같은 함수를 읽도록 옮겼다(assertion 그대로). 이 구간을 고칠 때는 새 함수 이름으로 찾는다. 하지 않은 것: `saleScreen`, `clashScene` 시간축, `statGrid` · `readout` · `beat` · `till` · `bossReveal`, `systems/*`.
7. 코드 읽기·정리 규칙(User 2026-10-01): `AGENTS.md` §2B로 옮겼다(User 2026-10-03).

연출 작업 전에 아래 함정 목록을 먼저 읽는다.

### User 할 일

1. 태그(User 2026-10-01): 새 버전이 main에 머지된 직후 그 머지 커밋에 붙인다(GitHub Releases, 대상 `main`). origin에는 v2.10.1까지 붙어 있고, v2.10.2 · v2.10.3은 아직이다(User가 붙인다). 퀵패치는 버전을 올리지 않으므로 태그도 새로 붙이지 않는다.
2. 실기기 BGM 청취(UI-Q114 · UI-Q-v29-47, §v3.0 사운드).

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
