# archive — 닫힌 버전의 증거 보관소

여기 있는 파일은 **현행 규칙이 아니다.** 현행 Design은 `design_ssot/`(입구 `SPEC_INDEX_v2.8.0.md`)에 있고, 현행 Source는 `dist/`에 있다.
이 폴더는 이미 닫힌 버전의 결정 근거와 측정 기록을 남겨 두는 곳이다. 보관한 파일은 옮기기만 했고 내용은 고치지 않았다.
그래서 문서 안의 경로는 옮기기 전 위치(`reports/…`, `tools/…`)를 가리킨다. 아래 표로 옛 위치와 새 위치를 찾으면 된다.

다음 밸런스 작업에 쓰는 `tools/calibrate-bot-v292.cjs`(User 런 보정)는 현행 도구라 `tools/`에 남겼다. D10 fork 쌍 비교 틀은
`v2.9.2/tools/measure-package-v292.cjs`가 가장 최근 본이다. 그 레버(Gate 수·창고·Level 보정)는 4차 반영으로 이미 Source에 들어가 패치 지점이 없으므로, 새 질문에는 이 파일을 본떠 새 도구를 만든다.

보관한 도구는 여기서 실행하지 않는다. `require('../dist/…')` 같은 상대 경로가 옛 위치 기준이고, 측정 대상 Source도 이미 바뀌었다.
다시 돌려야 하면 해당 커밋을 checkout해서 원래 위치에서 실행한다.

## 목록

| 폴더 | 내용 | 옛 위치 |
|---|---|---|
| `WORK_HISTORY_v2.8.md` | v2.8 작업 이력 | (원래 여기) |
| `inactive/legacy_harness/` | 2026-09-23 정리 때 뺀 일회성·실행 불가 하네스 | `tools/`, `tests/` |
| `inactive/v2_7_franchise/` | 폐기된 v2.7 프랜차이즈 코드 | `dist/systems/` |
| `v2.8/GUILD24_v2.8_RELEASE_VISION.md` | v2.8 방향 문서(비Canonical) | 루트 |
| `v2.8/COPY_DIALOGUE_ADOPTION_AUDIT_v2.8.md` | v2.8 문구·대사 채택 감사 | `reports/` |
| `v2.8/tools/remeasure-v28*` | v2.8 재측정 도구와 결과 | `tools/` |
| `v2.8/tools/qa-presentation-batch1~4, qa-closing-states, qa-end-states, qa-night-outcomes` | v2.8 연출 배치 캡처 도구(연출 기준은 `design_ssot/history/PRESENTATION_*`) | `tools/` |
| `v2.9.1-balance/*.md` | v2.9.0 BALANCE FINDING, v2.9.1 합의값·측정·구현 핸드오프 | `reports/` |
| `v2.9.1-balance/tools/`, `results/` | `remeasure-v29*` 측정 도구와 결과 JSON | `tools/` |
| `v2.9.2/v292-bot-harness.md` 외 `v292-*.json`, `v292-balance-review.md` | v2.9.2 밸런스 1~4차 근거(`reader` 봇, D10 fork 측정, User 런 프로필) | `reports/` |
| `v2.9.2/v292-h6-transitions.md` | H6 장면 전환 캡처 보고 | `reports/` |
| `v2.9.2/tools/` | `measure-arms`, `measure-late-slope`, `measure-late-fork`, `measure-package`, `calibrate-human`, `remeasure-v292` (끝난 질문의 측정 도구) | `tools/` |
| `v2.9.6/dungeon-monster-identity.md` | 도감 몬스터 지식 탭과 함께 화면에서 사라진 던전 몬스터 이름·약점 데이터 | `dist/data/catalog.js` |

## 규칙

- 보관 파일 안의 내용을 현행 기대값으로 쓰지 않는다(AGENTS §10).
- 현행 문서가 보관 파일을 근거로 가리킬 때는 이 폴더의 경로를 쓴다.
- 쓸모없는 생성물(캡처, 재생성 가능한 결과)은 보관하지 않고 지운다. 필요하면 git 기록에서 꺼낸다.
