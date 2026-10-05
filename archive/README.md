# archive — 닫힌 버전의 증거 보관소

여기 있는 파일은 **현행 규칙이 아니다.** 현행 Design은 `design_ssot/`(입구 `SPEC_INDEX_v2.8.0.md`)에 있고, 현행 Source는 `dist/`에 있다.
이 폴더는 이미 닫힌 버전의 결정 근거와 측정 기록을 남겨 두는 곳이다. 보관한 파일은 옮기기만 했고 내용은 고치지 않았다.
그래서 문서 안의 경로는 옮기기 전 위치(`reports/…`, `tools/…`)를 가리킨다. 아래 표로 옛 위치와 새 위치를 찾으면 된다.

현행 측정 도구는 `tools/`에 있다: 기준 밸런스 측정 `tools/measure-v2100.cjs`(AGENTS §9-B), 세이브 점검 `tools/save-check.cjs`,
봇 보정 `tools/calibrate-bot-v292.cjs`(User 런 보정), UI_UX 코치 QA가 쓰는 `tools/measure-first-sale-v30.cjs`, 한 레버만 보는
`deco-single` · `deco-trajectory` · `relic-contribution` · `rarity-value`. 그 밖의 측정 도구는 2026-10-04에 이 폴더로 옮겼다(User).
D10 fork 쌍 비교 틀은 `v2.9.2/tools/measure-package-v292.cjs`가 가장 최근 본이다.

보관한 도구는 여기서 실행하지 않는다. `require('../dist/…')` 같은 상대 경로가 옛 위치 기준이고, 측정 대상 Source도 이미 바뀌었다.
다시 돌려야 하면 해당 커밋을 checkout해서 원래 위치에서 실행한다.

## 목록

2026-09-30 정리(User): 판단 근거와 인사이트가 있는 문서, 현행 문서·테스트가 가리키는 파일만 남겼다. 원시 측정 결과 JSON,
실행 못 하는 옛 도구, 옛 하네스, 끝난 핸드오프, 반영이 끝난 점검 목록은 지웠다(필요하면 git 기록에서 꺼낸다 — 지운 커밋은 CHANGELOG
위생 항목).

| 폴더 | 내용 | 옛 위치 |
|---|---|---|
| `WORK_HISTORY_v2.8.md` | v2.8 작업 이력 | (원래 여기) |
| `inactive/v2_7_franchise/` | 폐기된 v2.7 프랜차이즈 코드(`tests/revision.cjs`가 읽고, `dist/systems/meta.js` · META가 가리킨다) | `dist/systems/` |
| `v2.8/GUILD24_v2.8_RELEASE_VISION.md` | v2.8 방향 문서(비Canonical) | 루트 |
| `changelog/CHANGELOG_v2.8.0-v2.9.11.md` | v2.8.0 ~ v2.9.11 버전별 변경 기록(현행 CHANGELOG는 v2.9.12부터와 RELEASE RECORD) | `design_ssot/CHANGELOG.md` |
| `v2.8/SOURCE_ADOPTION_QA_v2.8.0.md` | v2.8 Source 결함 기록(SA-Q, 모두 v2.8 출시 때 채택). Source · 테스트 주석이 SA-Q 번호로 가리킨다 | `design_ssot/` |
| `v2.8/SSOT_AUDIT_v2.8.0.md` | v2.8 Canonical 감사 기록(닫힘). 통합 방법 · 레이아웃 결정의 근거(SPEC_INDEX가 가리킨다) | `design_ssot/` |
| `v2.8/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md` | v2.8 문구·대사 채택 감사(SSOT_AUDIT · `tests/copy.cjs`가 가리킨다) | `reports/` |
| `v2.8/tools/qa-end-states.cjs` | v2.8 END 상태 캡처 도구(`qa-final-end` · `qa-final-prep`가 기준 시드로 가리킨다) | `tools/` |
| `v2.9.1-balance/*.md` | v2.9.0 BALANCE FINDING, v2.9.1 합의값 · 이상안 · 옵션 · 측정 요약 · 구현 핸드오프 | `reports/` |
| `v2.9.1-balance/results/remeasure-v29-closing-results.json` | v2.9.1 마감 측정(`v29-balance-ideal` · 구현 핸드오프가 가리킨다) | `tools/` |
| `v2.9.2/v292-bot-harness.md`, `v292-balance-review.md` | v2.9.2 밸런스 1~4차 근거(`reader` 봇, D10 fork 측정, User 런 프로필) | `reports/` |
| `v2.9.2/v292-h6-transitions.md` | H6 장면 전환 캡처 보고 | `reports/` |
| `v2.9.2/tools/measure-package-v292.cjs` | D10 fork 쌍 비교 틀의 가장 최근 본(새 측정 도구의 본보기) | `tools/` |
| `v2.9.6/dungeon-monster-identity.md` | 도감 몬스터 지식 탭과 함께 화면에서 사라진 던전 몬스터 이름·약점 데이터 | `dist/data/catalog.js` |
| `v2.9.6/deco-balance-v296.md`, `item-balance-v296.md` | v2.9.6 장식 · 상품 밸런스 측정 | `reports/` |
| `v2.9.7/counter-ladder-v297.md`, `hazard-coverage-v297.md` | v2.9.7~8 대응 사다리 · 위험 대응 범위 근거 | `reports/` |
| `v2.9.9/fresh-run-d23-review-v299.md` | v2.9.9 새 계정 D23 리뷰 | `reports/` |
| `v2.9.9/tools/measure-wallet-v299.cjs` | v2.9.9 실패 보상 배율 측정(CHANGELOG가 가리킨다) | `tools/` |
| `v2.9.11/*.md` | v2.9.11 재측정(`remeasure-v2911`), 부상 · 성장, 문구 교정, 줄바꿈 점검, iPhone Safari, BGM · 효과음 믹스, 초안(`v2.9.11-drafts`) | `reports/` |
| `v2.9.11/tools/measure-royalcert-v2911.cjs` | 왕도 프리미엄 인증 측정(CHANGELOG가 가리킨다) | `tools/` |
| `v2.9.6/tools/deco-impact.cjs` | 장식 하나씩 영향(v2.9.6 장식 리뷰, v2.9.11 약한 장식 팔) | `tools/` |
| `v2.9.7/tools/counter-ladder.cjs`, `hazard-coverage.cjs` | 대응 사다리 변형 · 위험 대응 범위 측정 | `tools/` |
| `v2.9.11/tools/remeasure-v2911.cjs` | v2.9.10 대 v2.9.11 곡선 재측정(`reports/v3.0-prep.md` §9-5-3) | `tools/` |
| `v2.9.12/tools/measure-capital-v2912.cjs`, `measure-counter-late-v2912.cjs`, `measure-hazard-refit-v2912.cjs`, `measure-firepair.cjs` | v2.9.12 Capital · 후반 대응 · 위험 재조정 · 화염 조합 측정(`reports/balance-proposal-v2912.md`, `reports/v3-prep-measure-v2911.md` §6) | `tools/` |
| `v2.9.13/tools/check-t3-counters-v2913.cjs`, `measure-counter-ladder-v2913.cjs`, `measure-item-value-v2913.cjs`, `measure-item-value-context-v2913.cjs` | v2.9.13 대응 사다리 · 상품 가치 측정(`reports/counter-ladder-v2913/`, `reports/item-price-v2913/`) | `tools/` |
| `v3.0-prep/tools/measure-discovery-v30.cjs`, `measure-first-day-v30.cjs`, `measure-session-v30.cjs`, `measure-v3prep.cjs` | v3.0 준비 루브릭 측정(`reports/v3.0-prep.md` §9-5, `reports/v3-prep-measure-v2911.md`) | `tools/` |
| `v2.10.0/tools/measure-v2100-grid.cjs` | v2.10.0 2차: 후반 완화 × 실패 사망 격자, 마왕 전력 역산 | `tools/` |
| `v2.9.13/unused-room-art.js` | 더 이상 화면에 안 보이는 옛 그림 코드(아침 · 새 점포 준비의 천장 · 벽 · 계산대 그림, 쓰이지 않던 `Art.scene`). 그림 배경으로 바뀌어 숨겨져 있었다(User 2026-10-01) | `dist/ui/scene.js` · `dist/ui/art.js` |
| `v2.10.1/UI_COMPONENTS.md` | v2.10.1 공통 UI 부품 카탈로그(역할 · 소스 위치 · 적용 상태). 안의 `UI_SALE_*` · `UI_SUPPORT_*` 링크는 지운 작업 일지를 가리킨다(git 기록에 있다) | `reports/` |
| `v2.8/relic-balance/REPORT.md`, `FINAL_PROPOSAL.md` | 점포지원 1차 리밸런스(2026-09-23) 측정 보고서와 User 승인 최종안(가격 ×0.7 근거) | `reports/relic-balance/` |
| `v2.9.1-balance/deco-balance-REPORT.md` | v2.9.1 장식 단독 · 세트 · 연속 플레이 측정 보고서 | `reports/deco-balance/` |
| `v2.9.12/balance-proposal-v2912.md`, `expert-bot-calibration-v2912.md` | v2.9.12 후반 곡선 · 위험 재조정 · Final · Capital 제안 측정, `expert` 봇 보정 근거 | `reports/` |
| `v2.9.13/relic-balance/*.md` | v2.9.13 점포지원 평가표(`EVALUATION.md`, `measure-v2100.cjs`의 구매 순위 근거)와 측정 기록 | `reports/relic-balance/v2913-qp13/` |
| `v2.9.13/counter-ladder-v2913.md`, `item-price-v2913.md` | v2.9.13 대응 사다리 · 상품 가격 기여도 재검수 | `reports/counter-ladder-v2913/`, `reports/item-price-v2913/` |
| `v3.0-prep/v3-prep-measure-v2911.md` | v3.0 준비 §8 측정 · 캡처 검토(곡선, 화염 조합, SALE 트레이 높이) | `reports/` |
| `v2.10.0/v2100-measure/` | v2.10.0 성공 메타 측정 보고(`README.md`)와 그 로그, 버린 안 로그(`qp3-bundle`, `qp3-option1-lv033`) | `reports/v2100-measure/` |

## 규칙

- 보관 파일 안의 내용을 현행 기대값으로 쓰지 않는다(AGENTS §10).
- 현행 문서가 보관 파일을 근거로 가리킬 때는 이 폴더의 경로를 쓴다.
- 쓸모없는 생성물(캡처, 재생성 가능한 결과)은 보관하지 않고 지운다. 필요하면 git 기록에서 꺼낸다.
