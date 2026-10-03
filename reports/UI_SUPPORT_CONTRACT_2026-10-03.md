# 점포지원 계약서·작은 표찰 구현 제안 — 2026-10-03

User가 승인한 계약서 방향의 실제 구현 BEFORE/AFTER다. 회색 후보 창·전폭 노란 버튼·갈색 하단 패널·주황 보류 버튼을
무지 계약서와 작은 표찰로 교체했다. **구현·동작 검증 PASS이며 최종 시각 컨펌은 별도다.** PDF는 만들지 않았다.

## 실제 화면

| 검토 | PNG |
|---|---|
| 첫 지원: 무료 / 선택 | [모바일 BEFORE/AFTER](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/01-mobile-free-before-after.png) |
| 이후 지원: 실제 가격 / 구매 | [유료 BEFORE/AFTER](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/02-mobile-paid-before-after.png) |
| PC 3개 후보 | [PC BEFORE/AFTER](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/03-pc-before-after.png) |
| 짧은 모바일 375×548 | [BEFORE/AFTER](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/04-short-phone-before-after.png) |
| 확대용 원본 | [모바일 무료](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/05-mobile-free.png), [모바일 유료](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/06-mobile-paid.png), [PC](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/07-pc.png) |
| 짧은 모바일 튜토리얼 | [실제 코치 화면](UI_SUPPORT_CONTRACT_IMAGES_2026-10-03/08-short-phone-coach.png) |

BEFORE는 `79f7d4c9367ffe2b9185f1d3f53e85d3cad8d5e1`의 CSS를 사용한 실제 브라우저 캡처다. 보존 CSS의 SHA-256은
`a32199e7f7e728df04890228724035fa203804be8ca7c969fa4dc27ee4212d11`이며 해당 커밋 파일과 일치한다.
AFTER는 아래 고정 커밋의 실제 캡처다. 같은 `qa-support-design` 시드·D0 보류→새로고침→D5 창 상태·후보·화면 크기를
사용했다. 비교 PNG는 캡처를 나란히 배치한 검토판이며, 실제 화면의 글자나 배치를 합성 수정하지 않았다.

## 구현

- 작은 금속 집게와 크림 종이로 후보를 표현했다. 제목 22px, 전체 조건·효과 14px를 유지하고 어두운 잉크로 대비를 확보했다.
  PC 제목의 시작 위치를 맞추고, 설명은 남는 공간을 사용하며 가격과 행동은 같은 하단 행에 정렬했다.
- 132×48px 선택/구매 표찰을 우하단에 놓았다. 가격 칸과 분리해 서로 침범하지 않는다. 활성 키에는 눌림 이동이 있다.
  보유 중·선택 종료·골드 부족은 같은 타깃 크기를 유지하면서 구매 재질과 눌림을 제거한다.
- 하단을 감싸던 갈색 패널과 전폭 보류 막대를 없앴다. 짧은 안내와 목재 표찰만 남겼다.
  후보 목록만 스크롤하고 하단은 고정한다. 이후 창의 후보 전체 교환·보류는 기존 동급 행동으로 남는다.
- **무료를 이미지에 넣지 않았다.** 기존 `candidatePrices`가 0이면 `무료`, 유료면 기존 `fmt(price)+'G'`를 라이브 텍스트로
  그린다. 예시 D5 화면의 199G·229G도 해당 후보 데이터의 실제 값이다. 가격 글꼴을 정보용 18px로 바꿔 G가 숫자처럼
  보이는 문제를 줄였다. 선택/구매 및 모든 다른 라벨도 텍스트다.
- 계약서·금색 표찰·목재 표찰 PNG는 모두 무지다. 생성 원본을 변환 없이 복사했다.
  [에셋 출처](ASSETS.md)와 [크기·원본 일치·SHA-256](references/store-support-2026-10-03/contract-assets.json)을 기록했다.
  User 제공 창고 배경 JPEG 3종은 원본 해시를 유지한다.
- UI_UX §RELIC VISUAL과 기존 가드의 회색 패널/전폭 버튼 기대를 최신 User 승인에 맞춰 갱신한 뒤 검증했다.
  게임 JS·후보 개수·효과·가격 계산·획득 시점·저장 규칙은 변경하지 않았다.

## 고정 QA

소스·테스트·브라우저 드라이버 고정 커밋: `542c888e9c2a562bf03f3b067d4b19728298d8f5`.
대상 검증 후 커밋하고 깨끗한 트리에서 QA를 시작했다. QA 중 Source/Tests/Harness/Fixtures/Expected는 수정하지 않았다.

| 검증 | 결과 |
|---|---|
| `PATH=/workspace/.venvs/guild24/bin:$PATH npm test` | 전체 PASS, 종료 0 |
| `qa-store-support.cjs`, reduced motion, 6개 화면 | 231 checks PASS |
| 같은 드라이버, 일반 모션, 짧은 폰·390 폰·PC | 117 checks PASS |
| `qa-d0-flow.cjs` | 12 checks PASS |
| `qa-boss-hold.cjs`, 다른 브라우저 작업 종료 후 단독 실행 | 22 checks PASS |

6개 화면: 360×640, 375×548, 390×780, 430×780, 1280×700, 1280×880.
일반 모션: 375×548, 390×780, 1280×880. Chromium `/usr/bin/chromium`을 사용했다.

전체 32개 지원의 이름·조건·가격을 빠짐없이 순회했다. 글자 잘림·가로 넘침·설명/가격/키 겹침·페이지 런타임 오류 없음.
각 후보를 스크롤하면 48px 키가 하단 위에 온전히 도달한다. 무료 및 유료 가격이 후보 데이터와 일치하고, 교환 후 가격도
갱신된다. 보류/교환/새로고침의 후보·가격 보존, 실제 유료 구매의 정확한 지출과 저장 유지, 보유/자금 부족,
SLOTH 봉인 접기/재개, 짧은 폰 코치와 제목/하단 비겹침, 첫 선택→DAY 1→브리핑 전환을 확인했다.
브라우저 결과 원본은 `reports/ui/support-contract/{after,motion}/results.json`에 있다(로컬 QA 산출물).
재현 가능한 결과 요약은 [QA 기록](UI_SUPPORT_CONTRACT_QA_2026-10-03.json)에 보존했다.

main 병합·공개 배포·밸런스 변경 없음. 이 배치의 시각 승인은 완료로 처리하지 않는다.
