# SALE 기존 숫자 글꼴·작은 G 분리 — 2026-10-03

User의 최신 지시대로 가격 숫자는 기존 Mulmaru Mono로 복원하고, 통화 단위 `G`만 작은 Wanted Sans로 분리했다.
선행 재고·기한·효과 구분 글자의 대비 개선은 유지했다. 숫자·단위 사이에는 2px 간격을 뒀다.

- 브랜치: `ui/design-trim`
- BEFORE: `ccb793eff4528a00a5aec6018607f4eae8ffb603` (숫자까지 Wanted Sans로 바뀐 선행안)
- 구현 / 고정 QA: `36a56a9026516fcc274b1fc20671a824c2ff0d9c`
- 진열대 숫자/G: 16/10px. 폰 가격 키: 18/11px. PC 가격 키: 22/13px.
- 상태: 구현·대상 검증 PASS / 최종 시각 컨펌 별도.

## 실제 PNG

| 화면 | 이미지 |
|---|---|
| 짧은 폰 BEFORE/AFTER | [375×548 비교](UI_SALE_CURRENCY_IMAGES_2026-10-03/01-short-phone-before-after.png) |
| 쿠폰 BEFORE/AFTER | [390×780 비교](UI_SALE_CURRENCY_IMAGES_2026-10-03/02-coupon-before-after.png) |
| PC BEFORE/AFTER | [1280×880 비교](UI_SALE_CURRENCY_IMAGES_2026-10-03/03-pc-before-after.png) |
| AFTER 원본 | [모바일](UI_SALE_CURRENCY_IMAGES_2026-10-03/04-mobile.png), [PC](UI_SALE_CURRENCY_IMAGES_2026-10-03/05-pc.png) |

동일 seed·고객·상품·화면 크기의 실제 Chromium 캡처다. 기존 44종 전체 재고 UI fixture를 사용했다.
비교판에는 원본 캡처와 라벨만 배치했다. 새 PDF는 만들지 않았다.

## 검증

대상 검증 661 checks / 3개 화면 PASS 후 구현을 커밋했다. 깨끗한 `36a56a9`에서 최종 QA를 시작하고,
Source·Tests·Harness·Fixtures·Expected를 수정하지 않았다. 아래 문서 갱신은 별도다.

| 검증 | 결과 |
|---|---|
| 기존 전체 `npm test` | PASS, 종료 0 |
| 가격 리본·44종·가격 잠금 사유 5종 / 4개 화면 | 896 checks PASS |
| DAY 5/14 비교 공간 / 13개 화면 조건 | 471 checks PASS |
| SALE 코치 9종·희귀도·명판·resize/reload / 3개 화면 | 307 checks PASS |

폰과 PC에서 작은 G의 위치, 가격/리본/이익 글자 잘림, 가로 넘침과 도크 침범을 확인했다.
버튼의 실제 가격과 aria-label, 이익·판매 조건은 유지한다. 최종 보급 가격 markup은 변경하지 않았다.
캐릭터는 고정이며 375×548의 DAY 5/14에서 온전한 상품 2행을 유지한다.
밸런스 변경·main 병합·공개 배포 없음. 점포지원·설정·메뉴의 현 구현도 유지한다.

원본 QA: `reports/ui/sale-currency/{before,after,comparison,coach}`. Chromium `/usr/bin/chromium`.
실기기/Safari·오디오 청취 품질과 판매·설정·메뉴 최종 시각 확인은 선행 검토와 동일하게 남아 있다.
