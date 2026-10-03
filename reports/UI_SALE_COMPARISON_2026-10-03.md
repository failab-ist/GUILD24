# 모바일 판매 상품 비교 공간 — 검토 후보

- 브랜치: `ui/design-trim`
- 인수 기준: `3ce89d78f7b98b37025159b08b57bf00b1eab423` — bundle 검증, fast-forward 통합, 원격 푸시 확인.
- 구현 후보: `4c40236c6312219258b4dcdb410987b9e8fe9973`
- 실제 BEFORE/AFTER: [이미지 내장 PDF](UI_SALE_COMPARISON_REVIEW_2026-10-03.pdf)
- 상태: **DAY 5 대상 검증 PASS / DAY 14 RUNTIME UX BUG 잔존 / 전체 판매 트림 미완료 / 최종 시각 컨펌 전**

## 변경 범위

모바일 SALE의 고객 카드·상태·목적지·명판 여백, 정보면 사이 간격, 진열대 행과 dock의 여백을 정리했다.
상품 설명 크기, 가격 키, 가방의 44px 칸과 게임 동작은 유지했다. 데스크톱 전용 레이아웃에는 적용하지 않는다.
보존된 `UI_SALE_TRIM_CANDIDATE_2026-10-03.patch`는 적용하지 않았다.

기준 owner: `SPEC_INDEX_v2.8.0.md` → `PRESENTATION_PRINCIPLES_v2.8.0.md` §CONSTRUCTION,
`UI_UX_v2.8.0.md` §MOBILE SALE PLAYABILITY / §SHORT PHONE / UI-Q109 / UI-Q-v29-18,
`SALE_v2.8.0.md` §SALE LAYOUT — MOBILE / §SALE RUNTIME CONTINUITY.

## 실제 화면 결과

동일 seed `qa-sale-compare-d5`, DAY 5, 6종 진열, 첫 상품 선택 직후 펼친 트레이.
온전한 행은 상품 버튼 전체가 스크롤 영역 안에 들어온 경우만 센다. AFTER는 모두 scrollTop=0이다.

| 화면 | BEFORE | AFTER | 기준 |
|---|---:|---:|---:|
|360×640|0|3|3|
|360×597|0|2|2|
|375×548|0|1|1|
|360×780|2|4|3|
|390×780|2|4|3|
|412×780|2|4|3|
|430×780|2|4|3|
|1280×880|6|6|데스크톱 독립 진열대|

- 짧은 화면의 트레이 약 124px, 가격 키 48px 이상, 상품행 약 49px.
- 780px 높이의 트레이 약 165px.
- 데스크톱 선택 상태 BEFORE/AFTER 이미지의 픽셀이 동일함을 확인했다.
- BEFORE 375×548은 첫 상품 클릭 시 브라우저 자동 스크롤 3px가 발생했다.

## 검증 범위

- `PATH=/workspace/.venvs/guild24/bin:$PATH npm test`: PASS, 종료 코드 0.
- `QA_CHROMIUM=/usr/bin/chromium node tools/qa-sale-comparison.cjs`: 8개 화면, 141개 검사 PASS.
- `QA_CHROMIUM=/usr/bin/chromium QA_MOTION=1 node tools/qa-sale-comparison.cjs reports/ui/sale-comparison/motion`:
  390·1280, 33개 검사 PASS.
- 선택 교체 시 행 높이·스크롤 유지, 판매 성공·거절, 거절 가격 잠금, 가방 인계, 트레이 접기·열기,
  터치 영역, 가로 넘침, 페이지 오류를 검증했다.
- 정착 BEFORE/AFTER는 실제 브라우저에서 캡처했다. 생성 시안이나 합성 수정 이미지는 사용하지 않았다.
- 전체 `qa:runtime` / `qa:visual` 결과가 아니다. 모션 검사는 동작·정착 화면 검사이며 타격감 프레임 리뷰가 아니다.
- 구현자 대상 검증은 최종 시각 디자인 승인이나 별도 DIRECTOR 컨펌을 대신하지 않는다.

## 미해결 — RUNTIME UX BUG

같은 seed를 DAY 14까지 진행해 위험 2개와 심층원정 추천이 함께 나오는 실제 상태를 추가 확인했다.

| 화면 | BEFORE | AFTER | 기준 |
|---|---:|---:|---:|
|360×640|0|0|3|
|375×548|0|0|1|

상단 높이는 253/266px → 184px로 줄었지만, 위험 2개 판독과 심층원정 추천을 포함한 정보면이 약 179px를 차지한다.
펼친 트레이 위에 온전한 행을 남기지 못한다. 기존에도 기준 미달이었으며 이번 후보로 해결되지 않았다.
BEFORE는 첫 상품 클릭 시 각각 11/182px 자동 스크롤했고 AFTER는 0px였다. PDF에 그 차이를 명시했다.
스크롤 또는 트레이 접기로 상품에 접근할 수 있어도 비교 공간 기준 PASS로 바꾸지 않는다.

## 다음 배치

현재 후보의 별도 시각 리뷰 후 DAY 14 복합 상태의 비교 공간 부족부터 해결한다.
그 다음 지원 선택 배치 → 판매 정보 가독성 순서로 진행한다.
긴 부상·피로·단골도, 긴 상품·손님 이름, 기한 대비, 위험 2개 조합의 전체 검증은 남아 있다.
설정·메뉴 후보도 최종 시각 컨펌을 완료한 것으로 처리하지 않는다.

`AGENTS.md`의 작은 배치·검증·커밋·보고 후 STOP 경계를 따른다.
밸런스 변경, main 병합, 공개 배포는 수행하지 않았다.
