# 소스와 사용자 노출 텍스트 일치 점검

DATE: 2026-10-09
BASE: `codex/balance-adoption` / `1a981fd87940fde8e86eb04fdee1babf2d104849`
STATUS: 배치 1~4 커밋 완료. 배치 5 구현·관련 검증·AFTER 캡처 보고 완료, 최신 User 후속 지시에 따라 커밋 후 배치 6 진행. 전체 점검 미완료.

배치 1 COMMIT: `9057d7f9`. 배치 2 BASE: `9057d7f9`; User가 AFTER 화면 확인·커밋을 승인했다.
배치 2 COMMIT / 배치 3 BASE: `1f3da969`. 배치 3 COMMIT / 배치 4 BASE: `7c0b551e`.

## 배치 상태

| 배치 | 범위 | 상태 |
|---|---|---|
| 1 | 설정·점주 가이드·안내 ON/OFF·한 줄 안내 경계 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 2 | 상품·발주·창고 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 3 | 판매·모험가 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 4 | 게이트·사건·일반 원정 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 5 | 밤·마감·폐점 | 수정·관련 검증 PASS / AFTER 캡처 보고 완료 |
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

## 배치 2 발견·처리

User가 2026-10-09 초안을 승인하여 아래 세 항목을 적용했다. 변경 전후·수정 이유와 AFTER 캡처를 보고했으며, User가 화면 확인·커밋을 승인했다.

| ID | 변경 전 → 후 | 실제 처리·Canonical 근거 | 분류·검증 |
|---|---|---|---|
| T08 | 임박 특가 날 로프 발주서 `유통기한 5일` → `유통기한 1일` | 입고 재고는 실제로 1일. EVENT §54 / ECONOMY_ORDER §ORDER DECISION INFORMATION. 재고 생성과 표시가 `Game.stockLife()`를 공유 | IMPLEMENTATION BUG — 표시 불일치. 일반 기한·냉장고·임박 특가 우선순위·FINAL 입고·비발주 입고 확인 |
| T09 | 교환 코치 `누를 때마다 값이 두 배` → `이번 교환 비용은 버튼에 표시된다.` | 교환권 사용 시 0→50→100G. 기존 `rerollPrice()`와 실제 버튼을 기준으로 안내. COPY §3-14 / ECONOMY_ORDER §REROLL / RELIC §발주 교환권 | MISSING ADOPTION — 무료 교환 예외. 실제 클릭으로 무료 뒤 50G·유료 뒤 100G 표시 확인 |
| T10 | 도감 `해금 완료` → `해금 완료 · 각 점포 DAY {N}부터 발주 후보` | 계정 해금 뒤에도 각 점포 DAY 10/14 이전 출현 불가. META §D10 / D14 PRODUCT UNLOCK — EXACT. 계정 해금·후보 판정·도감·자동 자료집이 `Meta.ITEM_UNLOCK_DAY`를 공유 | MISSING ADOPTION — 계정 표시는 맞으나 출현 조건 누락. 미해금·날짜 전후·격리된 날짜 변경 검사 |

- 확인한 가격·수량 제한·창고 칸·재고 정리 금액 표시는 기존 계산 함수를 읽는다. 도감 효과 목록과 발주·창고 효과 행은 `Presentation.rows()`를 재사용한다.
- 발주서의 `수익`은 정가와 표시 매입가의 기본 차액이며 1+1·조합 할인으로 확정한 실제 손익은 아니다. 현재 승인된 기준을 유지했고 이번 배치에서 수익 계산·표현을 변경하지 않았다.
- 유통기한·해금 날짜의 기존 판정·밸런스·저장 형식은 유지. 기한 계산에 RNG나 별도 저장 필드를 추가하지 않았다.
- 수정 함수에 걸린 기존 소스 검사에서 `stock` 문자열만으로 창고가 발주서 안에 있다고 오탐하던 부분을 실제 창고 렌더 호출 검사로 좁혔다. 브라우저에서도 발주서 내부에 창고 DOM이 없는지 확인했다.

### 배치 2 검증

- `node tests/ui-guard.cjs`: PASS, 118개 그룹. 유통기한 표시와 입고 결과 비교, 계정 해금·각 점포 출현·도감의 공통 날짜 변경 반영 검사 추가.
- `node tests/copy.cjs` / `node tests/events.cjs` / `node tests/relic-order.cjs` / `node tests/integration.cjs` / `node tests/regression.cjs` / `node tests/canonical.cjs`: PASS.
- `node tools/qa-order-text.cjs <out-dir>`: PASS, 32개 검사. 390×880 / 1280×880에서 실제 발주 클릭·창고 기한·교환 클릭·도감·출현 날짜 경계·버튼 잘림·가로 넘침·런타임 오류 확인.
- `npm run audit`: PASS. 자료집 등장 날짜도 공통 규칙에서 읽도록 연결. 생성 보고서의 내용 변화는 `BALANCE-CATALOG.md` 소스 서명뿐이며 가격·날짜·밸런스 수치는 동일.
- BEFORE/AFTER 캡처·결과는 기존 캡처 폴더의 `batch2-before-*` / `batch2-after-*`에 있다. BEFORE에서는 390/1280 모두 5일 표시와 실제 1일, 교환권 0/50/100G와 두 배 코치, DAY 4 미출현과 계정 해금 완료 표시를 확인했다.
- 전체 `npm test` / `qa:runtime` / `qa:visual`은 실행하지 않았다. 전체 작업 마지막 검증은 남아 있다.

## 배치 3 발견·처리

User 결정(2026-10-09): 피로 경계·단골도 설명 수정 승인. 상세는 `현재 피로 (상품 사용 전)`만 쓰며 별도 능력치 설명 문장은 거절했다. SALE 상단의 단일 피로 숫자는 현재 확정 가방을 반영한 원정 판정 기준으로 바꾸는 안을 승인했다. 저장 값·원정 처리 순서는 유지한다. 변경 전후·AFTER 화면을 보고했으며 User가 커밋을 승인했다. CSS·섹션 크기·배치는 변경하지 않았다.

| ID | 변경 전 → 후 | 실제 처리·Canonical 근거 | 분류·검증 |
|---|---|---|---|
| T11 | 피로 안내 `10을 넘으면` → 실제 단계의 `{N} 이상이면` | 실제 피로 페널티는 10부터. DUNGEON_HAZARD §FATIGUE STAT PENALTY / COPY §26-2. 안내·발견 조건은 `Dungeon.fatiguePenaltyFrom()` 공유 | MISSING ADOPTION — 경계 문구 불일치. 9/10 기준 및 격리된 안내 기준 변경 검사 |
| T12 | 상세 `현재 피로` → `현재 피로 (상품 사용 전)` | 저장 피로 10은 유지되지만 위 능력치는 이미 가방의 회복을 반영. SALE §NPC DETAIL / COPY §4-14 | DESIGN ISSUE — 기준 혼동을 줄이는 승인된 명확화. 추가 설명 문장은 넣지 않음 |
| T13 | 삼각김밥 판매 후 SALE 피로 `10` 유지 → `5` 표시 | 단일 상태 숫자는 `Dungeon.prepare().effects.fatigueBeforeExpedition`을 읽어 능력치 기준과 일치. SALE §CURRENT CUSTOMER COMPACT STATE / POST-COMMIT CURRENT STATE | 승인된 표시 기준 변경. 선택만으로 이동하지 않음, 판매 후 10→5·기동/정신 17→20, 완전 회복 시 0 표시 |
| T14 | 판매 단골도 기본 수치를 실제 변화량처럼 단정 → `기본 단골도`로 명시 | 기본 가격별 +4/+1/-4에 특성·점포지원·한도 적용. 스탬프 사례에서는 정가 +2 영수증이 이미 정확. NPC_TRAIT §ORDINARY PAID-PURCHASE LOYALTY DELTAS / COPY §8 | MISSING ADOPTION — 기본·보정 기준 누락. 실제 영수증 +2와 가이드의 보정 설명 확인 |
| T15 | 구매 후 떠날 때 +1·바가지 거절 -2 설명 누락 → 가이드에 추가. 단골 코치는 역할 설명으로 축약 | NPC_TRAIT §Non-purchase Loyalty / 바가지 거절 규칙. `paidVisitLoyalty`를 출발 처리·문구가 공유, 현행 +1 유지 | MISSING ADOPTION. 출발 +1 및 격리된 공유 값 변경 검사 |
| T16 | 이전 저장 수첩의 `learn-fatigue` 문구는 옛 문구 유지 → 현행 규칙 문구 표시 | 일반 학습 규칙은 `learn-*` ID로 `Copy.learned`를 읽음. 원정 고유 사건·결과의 저장 문구는 유지. COPY §26-2 | MISSING ADOPTION — 저장된 일반 규칙 문구가 최신 값과 어긋날 수 있음. 이전 문구 갱신·고유 결과 원문 유지 검사 |

### 배치 3 검증

- `node tests/ui-guard.cjs`: PASS, 119개 그룹. 준비 피로와 능력치의 일치, 저장 값 불변, 완전 회복 시 0, 정상 입장 시 기존 피로 생략 포함.
- `node tests/copy.cjs`: PASS, 30개 그룹. 경계·단골도 숫자 공유·이전 저장 학습 문구 검증 포함.
- `node tests/traits.cjs` / `node tests/delta.cjs` / `node tests/regression.cjs` / `node tests/night.cjs` / `node tests/integration.cjs` / `node tests/canonical.cjs`: PASS.
- `node tools/qa-sale-copy.cjs <out-dir>`: PASS, 48개 검사, 390×880 / 1280×880. 실제 판매·선택·가방 2칸·완전 회복·영수증·구매 후 출발·가이드·단골 코치·상세·기존 저장 문구·가로 넘침·런타임 오류 확인.
- 저장 피로 10을 판매 시 소비하지 않으며 원정 처리의 회복/증가 순서를 바꾸지 않았다. 준비 능력치와 같은 기존 함수를 조회한다. 전투 전망·환경 대응·실패 시 사망 위험의 입장 스냅샷도 유지(대성공 신호는 기존 판정대로 갱신 가능).
- `npm run audit`: PASS. 생성 보고서의 변경은 BALANCE-CATALOG 소스 서명뿐. 가격·기한·밸런스 수치 변경 없음.
- 캡처: 기존 폴더의 `batch3-before-*` / `batch3-after-*`. 예시 단계의 `batch3-detail-draft-*`에는 거절된 추가 설명 문장이 있어 최종 화면으로 쓰지 않는다.
- 전체 `npm test` / `qa:runtime` / `qa:visual`은 실행하지 않았다. 전체 작업 마지막 검증은 남아 있다.

## 배치 4 발견·처리

BASE: `7c0b551e`. User가 문구 초안을 수정·승인했고 코칭 강조 영역 어긋남 수정도 승인했다. 구현·관련 검증 완료, User가 AFTER 화면 확인·커밋 및 배치 5 착수를 승인했다(2026-10-09).

| ID | 노출 위치·변경 전 → 후 | 실제 처리·Canonical 근거 | 분류·검증 |
|---|---|---|---|
| T17 | 일반 II 코치 `위험이 두 가지` → `기본 위험이 두 가지… 사건으로 위험이 추가될 수 있다.` | `Dungeon` 기본 crypt II 공포/어둠에 `Game.morningEvent()` 한파가 냉기를 추가. DUNGEON_HAZARD §Family T2 / EVENT §한파 / COPY §3-10 | MISSING ADOPTION — 사건 예외 누락. 기본 2개·한파 3개와 실제 게시판 비교 |
| T18 | 화염 코치 `위험이 하나뿐… 요구 전력이 더 높다.` → `II 이후에도 기본 위험이 하나… 사건으로 위험이 추가될 수 있다.`. I부터 발생 → 첫 II·III부터 발생 | 화염 기본 1개에 독안개가 독 추가. DUNGEON_HAZARD §FIRE second axis / EVENT §독안개 / UI_UX §GATE TIER / FIRE GATE TUTORIAL / COPY §3-10 | MISSING ADOPTION + 승인된 코칭 시점 변경. I에 사건이 있어도 억제, II·III 최초 안내 및 완료 저장/재로드 확인 |
| T19 | 전망 코치 `손님이 들어올 때 정해져 바뀌지 않는다.` → `상품 판매로는 바뀌지 않는다.` | `Game.nominateDeep()`은 후원 확정 시 전망 재계산. SALE 입장 전망은 판매로 변화 없음. SALE §입장 스냅샷 / DUNGEON_HAZARD §DEEP / COPY §3-4 | MISSING ADOPTION — 불변 범위가 너무 넓음. 접전→후원 후 불리→실제 포션 판매 후 불리. User 지시대로 코치에 심층 설명은 넣지 않음 |
| T20 | 코칭 강조 영역이 스크롤 뒤 타깃과 어긋남 → 보이는 타깃 경계로 갱신 | `paintCoach()`은 전체 DOM 경계만 읽고 `settleCoach()`은 첫 안정 이후 추적 중단. PRESENTATION §Tutorial / coach target truth / UI_UX §TUTORIAL / UI-Q-v28-27 | RUNTIME UX BUG. 공통 코치에서 스크롤 잘림·게시판 고정 제목을 제외하고 스크롤 이벤트로 재배치. 안내 버튼 키보드 포커스 유지. CSS·섹션 크기 변경 없음 |

| T21 | 기존 SALE 코칭 QA가 현행 코칭 목록을 읽다 중단 → 의존 상수와 재방문 조건을 명시한 픽스처로 실행 | 코칭 목록의 NIGHT_MARKS 참조 및 재방문 코치의 introduced/newToday/records 조건을 기존 도구가 준비하지 않음. UI_UX §TUTORIAL / Presentation.returning() | TEST GAP. 검사 내용·기대값은 유지하고 필요한 상수와 고정 DAY 4 성공 기록만 제공 |

- 게이트 위험 행·필요 대응·능력치 환산·원정 판정과 환경 대응 미리보기는 기존 계산 함수를 읽는다. 표시 대응은 내림, 필요 대응은 올림하므로 실제 부족 상태가 충족으로 표시되지 않는다. 대응 충족 안내는 해당 위험의 차감을 막는 설명이며 일반 사고 확률까지 0이라고 약속하지 않는다.
- 사건 55종의 효과 문구와 발동·대상·당일 적용은 현행 데이터 및 관련 사건 검사로 대조했다. 심층 후원 조건·비용·보상 표시는 기존 함수·데이터를 재사용하며 이번 배치에서 별도 수치 복제나 숨은 확률 공개를 추가하지 않았다.
- 강조 영역 검사는 브라우저의 IntersectionObserver가 제공하는 실제 교차 영역과 비교한다. 기존 코치 레이어는 배경 입력을 차단하므로 휠로 배경을 움직이는 검사는 잘못된 전제였다. 배경 차단은 유지하고, 브라우저의 자동·네이티브 스크롤 위치 변경에 강조 영역이 따라오는지 검사한다. 정렬 오차 기준은 1px 유지.

### 배치 4 검증

- `node tests/ui-guard.cjs`: PASS, 120개 그룹. 중첩 스크롤 영역·고정 제목·완전 잘림·화면 경계·display:contents 감싸기 요소 제외의 독립 기대값 검사 추가.
- `node tests/copy.cjs`: PASS, 30개 그룹. `tests/events.cjs` / `tests/delta.cjs` / `tests/canonical.cjs`: PASS.
- `node tools/qa-gate-copy.cjs <out-dir>`: PASS, 106개 검사(390×880 / 1280×880). `QA_HEIGHT=640`: PASS, 114개 검사(390×640 / 1280×640). 기본/사건 위험, FIRE I 억제·II/III 발생, 실제 다음 클릭·저장·재로드, 후원/판매 전망, 강조 영역 정렬·스크롤·키보드 포커스·말풍선 비가림·가로 넘침·런타임 오류 확인.
- 공통 코칭 변경 검증 중 데스크의 display:contents 요소에 스크롤 overflow가 남아 강조 영역이 숨겨지는 회귀를 발견·수정했다. 실제 박스가 없는 요소는 경계 계산에서 제외하며, 단위 검사에 동일 조건을 추가했다.
- 공통 코칭 변경의 SALE 회귀 `tools/qa-sale-copy.cjs`: PASS, 48개 검사(390×880 / 1280×880).
- `QA_SIZES=[[390,880],[1280,880]] node tools/qa-sale-details.cjs <out-dir>`: PASS, 203개 검사. 기존 9개 SALE 코칭·재방문 코치 크기 변경·완료 저장·재로드·버튼/말풍선/타깃 비가림·실제 가격 클릭 확인. 의존 상수·재방문 픽스처 누락을 고쳤고 검사 기대값은 유지. 캡처·결과는 `batch4-sale-coach/`.
- `npm run audit`: PASS. 생성 보고서 내용 변화 없음.
- BEFORE/AFTER와 검사 결과는 기존 캡처 폴더의 `batch4-before-*` / `batch4-after-*`, 짧은 화면은 `short/`에 있다. User 화면 확인 완료(2026-10-09).
- 전체 `npm test` / `qa:runtime` / `qa:visual`은 실행하지 않았다. 밸런스·판정·저장 형식·공개 API 변경 및 시뮬레이션 없음.

## 배치 5 발견·처리

BASE: `cc24933f`. User가 폐점의 실제 정산 경로를 확인한 뒤 초안에 맞춘 수정 및 다음 배치 진행을 승인했다. 부상 코치는 악바리 이름 대신 괄호로 특성 예외를 쓰도록 승인했다. 구현·관련 검증과 폰/데스크 AFTER 캡처 보고 완료. 최신 진행 지시에 따라 배치 5 논리 단위를 커밋한다.

| ID | 노출 위치·변경 전 → 후 | 실제 처리·Canonical 근거 | 분류·검증 |
|---|---|---|---|
| T22 | 마감 폐점 확인 `현재 지점 포기` / `보상은 없다` → `이 점포를 폐점할까요?` / `점포 자본을 정산한다` / `폐점` | retire-go는 Game.end()/settleStoreCapital(), 메뉴 abandon-go만 무정산. CORE_RUN §CURRENT RUN ABANDON / §RUN-END STORE CAPITAL SETTLEMENT / COPY §7-4 | IMPLEMENTATION BUG 해결. 실제 폐점 클릭: DAY 9 총매출10000의 1%=100 자본 정산·저장/재로드 중복 없음. 메뉴 포기는 정산 없음 |
| T23 | 심층 추가 성장 후에도 밤 Lv·능력치 변화가 추가 보상 이전 값 → 지급 완료 후 실제 최종 값으로 동기화 | Game.night()의 기존 보상 지급 뒤 private syncDeepReport()가 level/statChanges/deep을 보고·기존 NPC 기록에 연결. NPC_TRAIT §DEEP EXPEDITION NPC REWARD / NIGHT_CLOSING §GROWTH PRESENTATION | IMPLEMENTATION BUG 해결. 이미 지급된 고정 입력만으로 보고/기록의 최종 Lv3·능력치 변화·일반/추가 보상 구분 검사. 성장·소지금 재지급 없음·JSON 저장값 보존. 기존 실제 심층 보상/저장 통합 검사 PASS. 별도 g.night probe 미실행 |
| T24 | 부상 코치가 투력·강인함 감소로 단정 → `싸운다(특성에 따라 달라질 수 있다)` | conditionModifiers()는 악바리의 투력 증가를 적용. NPC_TRAIT §INJURY / grit / COPY §26-2 | MISSING ADOPTION 해결. User 요청의 괄호 문구·특성 이름 생략. 폰/데스크 코칭 문구·잘림·완료 클릭 확인 |
| T25 | 사망 한도 마감에도 `다음 날`·재고 정리 → `사망 한도에 도달했다.` / `점포 종료` | closeDay()의 사망 우선 검사를 closingDock()도 같은 Meta.deathLimit(s)에서 읽음. CORE_RUN §DEATH LIMIT — SEGMENTED / COPY §7-5 | RUNTIME UX BUG 해결. 한도 전/도달·한도 함수 변경·양수/음수 잔고 단위 검사. 실제 종료 클릭은 기존 소문 원인·정산 처리로 종료 |
| T26 | 가이드 `최대 N회`·재고 없으면 폐점 → `최대 N번의 마감`·적자 해결 불가 시 폐점 | canRescue()/liquidate()/closeDay()의 기존 조건과 game.rescueLimit(). 재고 정리 창도 마감 단위를 명시 | 승인된 명확화 완료. 입력 한도7 표시 반영 유지. 매입가80 재고 두 개를 정리해 각각40G 회수, 잔고 회복 뒤에도 같은 마감 회생1회 확인 |
| T27 | 대성공 규칙이 가게 보너스를 단정 → `일반 원정의 대성공`으로 범위 명시 | 일반만 점포 보상, 심층은 점포 보상0. 코치 발생은 이미 storeBonus>0. ECONOMY_ORDER §GREAT SUCCESS STORE GOLD / NIGHT_CLOSING §NORMAL GREAT SUCCESS GOLD / COPY §26-2 | MISSING ADOPTION 해결. 트리거·보상 유지, 공통 Copy.learned 및 기존 저장 학습 표시 재사용 |
| T28 | Natural recovery 문단이 퇴각 부상 유지로만 단정, CORE_RUN 마감 Purpose가 COGS/Margin 열거 → 현행 owner 참조로 정리 | DUNGEON_HAZARD §RETREAT HEALING, CHANGELOG v2.9.13 quick patch 2 / NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT | MISSING ADOPTION 해결. 조건부 퇴각 회복 예외와 마감 현금흐름의 기존 승인 규칙만 반영 |

### 배치 5 검증·한계

- node tests/ui-guard.cjs: PASS 121개 그룹. node tests/copy.cjs: PASS 30개 그룹. node tests/night.cjs: PASS, 최종 상태의 기록 동기화 검사 추가. node tests/integration.cjs: PASS 55개 그룹. node tests/regression.cjs: PASS 56개 그룹. node tests/canonical.cjs: PASS.
- tools/qa-night-closing-text.cjs --before: 기존 HEAD app.js/copy.js 제공, 390×880 / 1280×880에서 변경 전 10개 노출 사례 기록·42+4개 기존 흐름 검사. 변경 전 문구는 PASS로 간주하지 않음.
- 수정 후 같은 하네스: PASS 102개 검사. 실제 폐점/사망 한도 종료/무정산 포기/재고 정리/코치 완료 클릭, 재로드 유지, 문구·버튼·말풍선 잘림·가로 넘침·런타임 오류 확인. 심층 표시 사례는 원정 없이 이미 지급된 값의 동기화 함수만 호출.
- npm run audit: PASS. 생성 보고서 내용 변화 없음. 공개 API·저장 스키마 버전·밸런스·판정·RNG 변경 없음. NPC 기록에 결과의 기존 deep 정보를 함께 보관한다.
- 밤 피로·피로 단계·상세 원장은 기존 실제 기록을 읽으며 회복을 중복 차감하지 않는다. 마감 수치·운영비·폐기·후원은 기존 daily 기록/계산 함수와 연결, DAY29 내일 운영비 생략 유지.
- 자동 승인 검토는 별도 단일 g.night 스크래치 재현의 실행 및 준비 파일 작성을 AGENTS §9-A 사전 명시적 승인 부족으로 거절했다. 그 파일·실행은 없음. 대신 원정을 실행하지 않는 기록 동기화 단위 검사와 기존 정해진 검증 절차로 수정 영역을 검증했다. 거절된 재현을 다른 경로로 실행하지 않았다.
- 캡처/결과: 기존 폴더의 batch5-before-* / batch5-after-* / batch5-before-results.json / batch5-after-results.json. 부상·대성공 코칭은 표시 검사용 기록 픽스처, 심층은 이미 지급된 상태 픽스처이며 밸런스 측정 결과가 아니다.
- 전체 npm test·qa:runtime·qa:visual은 실행하지 않았다. 전체 작업 마지막 표준 검증은 남아 있다.

## 다음 경계

배치 4 COMMIT: cc24933f. 최신 User의 수정·후속 진행 승인에 따라 배치 5 커밋·clean 확인 후 배치 6을 점검한다. 배치 7 미점검.
후속 보고에는 무엇을 어떻게 바꿨는지 변경 전→후와 이유를 함께 적는다(User 2026-10-09).
