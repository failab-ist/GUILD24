# 소스와 사용자 노출 텍스트 일치 점검

DATE: 2026-10-09
BASE: `codex/balance-adoption` / `1a981fd87940fde8e86eb04fdee1babf2d104849`
STATUS: 배치 1 구현·관련 검증 PASS, User 화면 확인·커밋 승인 완료(2026-10-09). 전체 점검 미완료.

## 배치 상태

| 배치 | 범위 | 상태 |
|---|---|---|
| 1 | 설정·점주 가이드·안내 ON/OFF·한 줄 안내 경계 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 2 | 상품·발주·창고 | 미점검 |
| 3 | 판매·모험가 | 미점검 |
| 4 | 게이트·사건·일반 원정 | 미점검 |
| 5 | 밤·마감·폐점 | 미점검 |
| 6 | 점포지원·장식·다음 점포 | 미점검 |
| 7 | 마왕 조사·최종 원정·결말 | 미점검 |

규칙별 코치·도감·상세창·오류 및 비활성 사유는 각 시스템 배치에서 의미·수치·예외까지 점검한다.
이 기록은 발견·검증 원장이며 Design SSOT가 아니다. 현재 문구는 COPY owner, 현재 규칙은 SPEC_INDEX가 가리키는 owner를 따른다.

## 배치 1 발견·처리

User가 2026-10-09 승인한 첫 배치 초안을 적용했다. 변경 전후 설명과 AFTER 캡처를 보고했으며, User가 화면 확인·커밋을 승인했다.

| ID | 노출 위치·변경 전 내용 | 실제 처리·근거 | 분류 | 수정·검증 |
|---|---|---|---|---|
| T01 | 설정 OFF: `말풍선과 DAY 1~3 한 줄 안내`, ON: `처음 한 번씩 나오는 말풍선 안내` | `taskLine()`은 DAY 1~3, `showCoach()`는 단계·대상·완료 기록에 따라 이후에도 발생. UI_UX §TUTORIAL — TASK LINE / READ THE SYSTEM | 불일치 없음, 기간 혼동을 줄이는 승인된 명확화 | COPY §2-3의 기간 없는 문구 적용. 기존 기간·트리거 유지 |
| T02 | 가이드 제목 `처음 3일` | 다섯 Phase의 기본 흐름 설명은 이후 영업에도 유효. UI_UX §GLOBAL HELP / COPY §8-0 | 승인된 명확화 | `하루의 흐름` 적용. 다섯 줄과 접힌 `자세히` 구조 유지 |
| T03 | 가이드 상품 설명: 음식은 피로 회복으로만 설명 | ITEM §FOOD / DRINK ROLE MODEL 및 상품 데이터에는 음식의 고유 능력치·직접 위험 대응도 존재 | DESIGN ISSUE — 승인된 설명 개선 | COPY §8-0의 상품별 효과 확인 안내 적용. 상품별 효과를 따로 복제하지 않음 |
| T04 | 가이드 판매: 거절한 가격 및 더 높은 가격만 설명 | `Game.sell()`은 바가지 거절 시 해당 상품의 모든 가격을 잠금. SALE §바가지 refused / SAME-ITEM REFUSAL PRICE CEILING / REFUSAL RETRY TRUTH | MISSING ADOPTION — 가이드·COPY owner의 예외 누락 | COPY §8-3와 가이드에 바가지 거절 예외 추가. 판정 변경 없음 |
| T05 | 가이드 회생 `최대 3회` 하드코딩 | `Game.rescueLimit()`이 `DATA.balance.rescueLimit`을 반환. 현행 3회와 일치 | 불일치 없음, 재발 방지 | COPY §8-6의 `{N}`을 기존 함수에서 읽음. 현재 3회 및 격리 테스트의 7회 반영 검사 |
| T06 | 새 점포 준비 화면에서 안내를 눌러도 버튼·설명이 이전 상태 | 저장 값은 변경되지만 `render()` 준비 화면 분기는 `renderModal()` 전 반환. 영업 전 및 종료 후 준비에서 재현. UI_UX §QA UI-Q-v28-19 | RUNTIME UX BUG | 같은 화면의 소리 스위치처럼 준비 분기에서 설정 패널 갱신. 공개 API·저장 필드 추가 없음 |
| T07 | UI_UX의 가이드 QA 문장이 폐지된 ORDER OFFER 코치와 이전 카테고리 문장도 요구 | UI_UX §TUTORIAL — COACH DIET은 OFFER 코치를 폐지, 최신 승인 COPY §8-0은 상품 효과 확인 안내 | MISSING ADOPTION — 관련 QA 문서의 이전 기대 | 수정한 가이드의 QA 항목만 현재 owner에 맞춤 |

## 검증

- `node tests/ui-guard.cjs`: PASS, 116개 그룹. 가이드 실제 렌더 결과, 회생 한도 변경 반영, 설정 ON/OFF 문구 포함.
- `node tests/copy.cjs`: PASS, 28개 그룹.
- `node tests/vocabulary.cjs`: PASS, 11개 그룹.
- `node tests/regression.cjs`: PASS, 56개 그룹. 기존 바가지 거절·구매 및 저장 회귀 포함.
- `node tests/canonical.cjs`: PASS, 관련 기존 Canonical 검사.
- `tools/qa-guide-settings.cjs --before`: 변경 전 HEAD의 app.js를 브라우저 요청에 제공. 390×880 / 1280×880, 58개 검사 중 8개 FAIL. 영업 전·종료 후 준비의 ON/OFF 버튼 갱신 실패만 재현.
- 수정 후 같은 하네스: PASS, 74/74. 영업 전·영업 중·종료 후 준비의 ON/OFF 즉시 갱신, 코치 기록만 초기화, ON/OFF 새로고침 유지, 가이드 문구·회생 한도, DAY 0/1/3/4/5 한 줄 안내 경계, OFF 시 안내 숨김, 가로 넘침·버튼 잘림, 런타임 오류 없음 확인.
- 캡처·결과: `C:/Users/necro/.codex/visualizations/2026/10/08/01a11c02-d2db-7561-86b7-266e48b625c1/`, `before-*` / `after-*`.
- 이번 범위는 웹 브라우저. Android 네이티브 저장·화면은 미검증.
- 전체 `npm test` / `npm run audit` / `qa:runtime` / `qa:visual`은 이번 배치에서 실행하지 않았다. 전체 PASS 주장 없음. 전체 작업 마지막의 표준 검사와 다음 배치는 남아 있다.

## 다음 경계

User 승인에 따라 배치 1만 논리 커밋·clean 확인하고 STOP. 배치 2~7은 아직 열지 않았다.
후속 보고에는 무엇을 어떻게 바꿨는지 변경 전→후와 이유를 함께 적는다(User 2026-10-09).
