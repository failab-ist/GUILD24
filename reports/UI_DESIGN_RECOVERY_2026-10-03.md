# 디자인 작업 복구 인계 — 2026-10-03

> 작업 상태 기록 / 새로운 디자인 규칙 문서가 아님.
> AGENTS.md를 먼저 읽고 따른다.

## 기준과 보존 범위

- 저장소: `failab-ist/GUILD24`
- 작업 브랜치: `ui/design-trim`
- 이 기록 작성 직전 원격 HEAD: `189a76fdecc0e1ac9478ba32f7ee46e198d48f06` (원격 compare로 확인).
- 설정 구현 후보: `d485fd1a6d94d7063ade42641d57219377c0f14e`.
- 컴포넌트 검토 카탈로그: `reports/UI_COMPONENTS.md`, 커밋 `189a76f`.
- 코드·PNG·문서는 위 커밋에 보존돼 있다. 설정의 최종 디자인 승인과 실제 모바일 AFTER 검증은 미완료다.
- 로컬 checkout의 마지막 확인 HEAD는 `d485fd1`, 당시 clean이었다. 이후 로컬 명령이 응답하지 않아 현재 상태는 미확인이고 원격 문서 커밋을 로컬로 동기화하지 못했다. clean / frozen으로 간주하지 않는다.

## 현재 작업과 정확한 진입점

| 작업 | 상태 | 진입점 |
|---|---|---|
| 설정 디자인 | 목재·금속 PNG를 사용한 구현 후보가 커밋됨. 실제 화면 검증 필요 | `dist/ui/app.js`의 `mixer()`, settings / resetConfirm / importConfirm; `dist/ui/ui.css`의 `.settings-wood` / `.settings-panel` |
| 설정 부품 4종 | 원격 커밋에 보존됨 | `dist/ui/assets/presentation/settings/`: wood-panel.png, blue-key.png, red-key.png, supply-backdrop.png; 출처는 `reports/ASSETS.md` |
| 공통 컴포넌트 | 검토 카탈로그 업로드 완료. 전역 확정 규격이나 최종 승인 문서가 아님 | `reports/UI_COMPONENTS.md` |
| 점포 메뉴 | 서브에이전트 소스 검토 완료. 행별 PNG 아이콘 제작·적용은 미완료 | `app.js`의 menu 분기와 기존 `btn()` 호출; `ui.css`의 `.menu-list`; 카탈로그 §6 |
| 게임플레이 트림 | 서브에이전트 소스 검토 완료. 코드·아트 변경은 미완료 | `saleScreen()`, `saleDesk()`; `.face`, `.kit`, `.stage-scroll`, `.counter-tray`; 지원 선택의 scroll / footer |
| 사용자 검토 문서 | HTML은 저장됐지만 열기 실패. PDF/PPT/Word는 아직 생성되지 않음 | 파일명 `GUILD24-settings-implementation-review.html`; 기존 대화의 참고 이미지 / BEFORE / PNG 부품 |

원본 규칙 읽기 순서: `design_ssot/SPEC_INDEX_v2.8.0.md` → `design_ssot/PRESENTATION_PRINCIPLES_v2.8.0.md` → `design_ssot/UI_UX_v2.8.0.md`의 MENU / SETTINGS와 해당 모바일 판매·지원 부분 → 관련 Source.
승인된 비주얼 방향과 설정 묶음은 UI_UX의 MENU / SETTINGS VISUAL에 이미 반영돼 있다. 이 인계 문서에 복제하지 않는다.

## 아직 원본 문서에 없는 최신 실행 요청

- 사용자 검토 결과물은 외부 URL을 클릭해야 하는 HTML 대신, 이미지가 파일 안에 들어간 PDF / PPT / Word 등으로 전달한다.
- 사용자에게 실제 AFTER를 보여주기 전 최종 디자인 승인이나 구현 완료를 주장하지 않는다. PNG 부품 원본과 생성 시안은 실제 게임 캡처가 아니다.
- 메뉴 디자인과 게임플레이 트림은 서브에이전트로 병행하도록 사용자가 명시적으로 요청했다. 독립된 영역에서 준비하고 root가 변경을 통합한다.

## 다음 실행 순서

1. 먼저 `pwd`, `git status`가 실제로 응답하는지 확인한다. 계속 무응답이면 구현과 파일 변환을 시작하지 않는다.
2. 로컬 변경을 보존하고 원격 최신 상태를 확인한다. 현재 브랜치를 덮어쓰거나 위 커밋으로 강제 reset하지 않는다.
3. 설정의 BEFORE와 AFTER를 같은 조건에서 확보한다. 360 / 390 / 412 / 430px와 필요한 데스크톱 폭에서 프레임, 글자·버튼 잘림, 스크롤, focus, 음량 조작과 기존 확인 흐름을 검증한다.
4. 실제 캡처를 이미지 내장 문서로 만들어 사용자에게 제시한다. 메뉴·게임플레이 검토 내용도 실제 캡처가 확보된 범위만 사용한다.
5. 메뉴 담당은 기존 동작을 유지하며 행별 PNG와 배치를 준비한다. 메뉴에 settings-wood를 붙여 모든 행을 파란 조작 버튼으로 바꾸지 않는다.
6. 게임플레이 담당은 모바일 판매의 상품 비교 공간·판단 정보 대비, 지원 선택의 후보와 다음 행동 배치를 먼저 다룬다. 실제 화면을 본 뒤 좁은 변경으로 진행한다.

## 병행 검토에서 남은 확인 사항

- 메뉴 아이콘 소재와 40–48px 표시 크기는 카탈로그의 제작 검토안이다. 완성 에셋이나 승인된 치수가 아니다.
- 판매 공간은 상단 인물·상태 영역과 하단 가격 영역의 여백부터 검토한다. 필요한 글자와 클릭 영역을 먼저 축소하는 방식은 확정하지 않았다.
- 메뉴 QA의 오래된 항목 목록과 최신 본문의 차이, 전망 / Stat 패널의 오래된 설명과 최신 사용자 지시의 차이가 발견됐다. 해당 owner의 최신 지시를 확인하고 과거 배치로 되돌리지 않는다.
- 서브에이전트가 완료한 것은 소스 검토다. 새 PNG, 게임플레이 패치, 새 AFTER 캡처는 만들지 않았다.

## 검증과 중단 상태

- 이전 설정 후보 보고에서 ui-guard 114, copy 24, assets 3, canonical 2 및 문법 / diff 검사가 PASS로 기록됐다. 복구 인계 작성 중에는 재실행하지 않았다.
- 실제 AFTER 검증: BLOCKED. 디자인 최종 승인: 미완료.
- 실행 환경: 단순 명령, 파일 쓰기, 로컬 이미지 읽기가 응답하지 않음. 정확한 원인: ROOT CAUSE UNRESOLVED.
- GitHub 전용 파일 읽기 / 문서 업로드는 응답하므로 원격에 확인된 커밋과 이 인계 기록을 보존한다.
- HTML 클릭 무반응 및 `Cross-site file URL requests are not allowed`는 별도 전달 문제다. 외부 요청 없이 이미지가 포함된 정적 문서로 다시 전달해야 한다.
- 원래 사용자 참고 이미지 `16647.jpg` / `16648.jpg`는 기존 대화 첨부다. 저장소에 원본이 보존됐다는 확인은 없다. 다음 작업자가 접근할 수 없다면 시각 확인 전에 원본을 확보한다.
- 밸런스 작업은 다른 세션에서 진행 중이다. main 병합과 공개 배포는 이번 작업에 포함하지 않는다.
