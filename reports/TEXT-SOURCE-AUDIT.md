# 소스와 사용자 노출 텍스트 일치 점검

DATE: 2026-10-10
BASE: `codex/balance-adoption` / `1a981fd87940fde8e86eb04fdee1babf2d104849`
STATUS: 배치1~8 검수·수정·전체 검사 PASS. User 2026-10-10 AFTER 화면 확인 및 커밋·문서 정리·머지 승인.

배치 1 COMMIT: `9057d7f9`. 배치 2 BASE: `9057d7f9`; User가 AFTER 화면 확인·커밋을 승인했다.
배치 2 COMMIT / 배치 3 BASE: `1f3da969`. 배치 3 COMMIT / 배치 4 BASE: `7c0b551e`.

## 배치 상태

| 배치 | 범위 | 상태 |
|---|---|---|
| 1 | 설정·점주 가이드·안내 ON/OFF·한 줄 안내 경계 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 2 | 상품·발주·창고 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 3 | 판매·모험가 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 4 | 게이트·사건·일반 원정 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 5 | 밤·마감·폐점 | 35893f69 커밋 / 관련 검증 PASS / AFTER 캡처 보고 |
| 6 | 점포지원·장식·다음 점포 | a2faca1f 커밋 / 관련 검증 PASS / AFTER 캡처 보고 |
| 7 | 마왕 조사·최종 원정·결말 | 93251c8f 커밋 / 관련 검증 PASS / AFTER 캡처 보고 |
| 8 | 사건55종의 사용자 이해도·전체 용어 전수 검수(최신 추가 요청) | 55/55 적용 / 전체 검사 PASS / User AFTER 화면 확인 완료 |

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

## 배치 6 발견·처리

BASE: `35893f69`. User가 운영비 가산의 구입 당일 적용과 다음 날 문구 삭제, 구급품 진열장의 `(마왕성 제외)` 괄호만 추가, 나머지 초안 적용 및 배치 7 후속 진행을 승인했다. 구현·관련 검증·폰/데스크 AFTER 캡처 보고 완료.

| ID | 변경 전 → 후 | 실제 처리·Canonical 근거 | 분류·검증 |
|---|---|---|---|
| T29 | 운영비 가산이 아침 보유 시설을 기준으로 다음 날부터 적용 → 즉석식품 코너·왕도 프리미엄 인증·지역 거점점 계약은 구입 당일부터 적용. 지역 계약 `다음 날부터 매일` → `매일 아침` | 최신 User 승인. expectedOperatingCost()의 비율 가산은 현재 소유 시설, 운영 효율 매뉴얼의 차감은 기존 아침 시설을 읽음. RELIC §OPERATING COST TIMING / ECONOMY_ORDER §BASE OPERATING COST | 승인된 Design 변경 적용. 실제 구입 직후 예상 운영비와 그날 마감 차감190G 확인. 3종 합산·비복리·10G 반올림·무료 사건 우선·차감 시점·명시적 facilities 인자·Save/Load 회귀 PASS |
| T30 | 구급품 진열장 대상 예외 없음 → 기존 설명 끝에 `(마왕성 제외)`만 추가 | META §display — 구급품 진열장: ordinary expedition only, not Final. 일반 resolve는 보정, Final snapshot은 미적용 | MISSING ADOPTION 해결. 부상·피로·가방 조건·data getter 수치 유지. 폰/데스크 장식 화면 표시 확인 |
| T31 | 지원 교환 쿠폰이 모든 기회에 적용되는 듯한 안내 → `유료 점포지원 구매 기회마다 첫 후보 교환이 무료` | 기존 canRerollRelics()의 D0 제외, RELIC §CANDIDATE REROLL / META §지원 교환 쿠폰함 | MISSING ADOPTION 해결. 실제 교환 판정·비용 유지, 공통 effect getter 재사용 |
| T32 | 후보에서 은퇴한 단골 묶음혜택도 도감 `기본 제공` → `현재 후보로 나오지 않음` | D.relicRetired를 직접 참조. RELIC §RETIRED SUPPORTS | MISSING ADOPTION 해결. 목록 변경 반영 단위 검사, 기존 저장 효과/설명 유지 검사, 도감 클릭 확인 |
| T33 | 숙련 수치만 표시 → 출전 직업별 서로 다른 마왕 토벌로 숙련 증가·그 직업 새 모험가의 등장 레벨 효과 안내 | META §JOB MASTERY / COPY §10-5. 기존 Meta 수치/행렬 유지 | MISSING ADOPTION 해결. 도감 진행도 한 문단, 확률표·숨은 공식 추가 없음. 현재 숙련1/7 표시 유지 확인 |
| T34 | 방문 보너스가 실제 순증가처럼 보임 → 알뜰 금고·첫 방문 쿠폰·프리미엄 멤버십에 `(소지금 상한 적용)` | 기존 Game.arrive()의 방문 보너스 합산 후 상한. META/RELIC 각 owner | MISSING ADOPTION 해결. 기존 보너스 getter·상한 판정 유지. 야간 보상에 일괄 적용하지 않음 |
| T35 | CORE_RUN의 추모 방명록 옛 +2 요약 → 현행 META 장식 owner 참조 | CHANGELOG의 User2026-10-03 승인 +2→+1. git blame: CORE는2c86615cf(09-25), META는d5ff723df(10-03) | MISSING ADOPTION 해결. 본문과 해당 QA의 오래된 요약만 정리, 현재 +1 Source·효과 설명 유지 |

### 배치 6 검증·한계

- node tests/relic-effects.cjs: PASS, 구입 당일 운영비·차감의 기존 시점·무료 사건·명시적 입력·저장 회귀 추가. node tests/relic-order.cjs: PASS 29개 그룹. node tests/copy.cjs: PASS 30개 그룹. node tests/ui-guard.cjs: PASS 122개 그룹. node tests/canonical.cjs / node tests/integration.cjs(55개 그룹) / node tests/events.cjs(29개 그룹): PASS.
- tools/qa-support-meta-text.cjs --before: 390×880 / 1280×880, 기존 HEAD UI/계산/설명 제공. 56개 기존 흐름 검사·18개 변경 전 노출 사례 기록. 기존 문구를 PASS로 간주하지 않음.
- 수정 후 같은 하네스: PASS 82개 검사. 세 지원 실제 구입·즉시 예상 운영비·당일 마감 차감, 장식·숙련·은퇴 지원 도감·방문 지원 설명, 가로 넘침·런타임 오류 확인.
- npm run audit: PASS. 생성 BALANCE-CATALOG의 소스 서명과 승인한 효과 문구 갱신. 기본 가격·비율·상한·성장·확률 수치는 유지. 이번 User 승인으로 운영비 가산 시점만 변경했다.
- 전체 npm test·qa:runtime·qa:visual은 이번 배치에서 실행하지 않았다. 원정 재현·밸런스 측정·시뮬레이션 없음. 마지막 전체 표준 검증은 배치 7 이후 남음.
- 캡처/결과: 기존 폴더의 batch6-before-* / batch6-after-* / batch6-before-results.json / batch6-after-results.json. 구급품 진열장은 User 요청대로 `(마왕성 제외)`만 붙였다. CSS·섹션 배치·저장 스키마·API 인자 형식 변경 없음.
- 점포지원34종+이전 저장호환1종, 장식12종의 주요 효과·대상·기간·중첩·해금·교환 조건을 기존 owner/Source/관련 검사로 대조했다. 기존 description/effect getter와 Meta 함수를 유지하며 중요한 조건을 범용화로 생략하지 않았다.

## 배치 7 발견·처리

BASE: `a2faca1f`. User가 T36~T41 적용을 승인했다. 구현·관련 검증·폰/데스크 AFTER 캡처 보고 완료. 최신 User 추가 요청에 따라 커밋 후 사건55종의 가독성·전체 용어 전수 검수를 별도 배치8로 진행한다.

| ID | 변경 전 → 후 | 근거·분류 | 검증 |
|---|---|---|---|
| T36 | 과거에 만난 이번 목표는 D4에도 이번 영업·우선 정렬·현재 매출 표시 → 이번 identitySeen 뒤에만 표시 | UI_UX §도감 > 마왕 / BOSS §D0 INFORMATION BOUNDARY. RUNTIME UX BUG 해결 | D4 비공개·과거7마왕 기록 유지, D5 실제 보고 확인 뒤 목표/현재 매출 공개 |
| T37 | 후보 피로 >10 표시 → >=Dungeon.fatiguePenaltyFrom() 표시 | 실제 첫 페널티값10 참조. IMPLEMENTATION BUG 해결 | 대상 NPC를 지정해 피로10·지침 표시 확인 |
| T38 | 확정 대원은 권능 전 능력치 → 기존 finalPreRoll().snapshots의 실제 적용값과 준비→적용 표시 | UI_UX §FINAL MODIFIER PREVIEW / FINAL 계산 순서. IMPLEMENTATION BUG 해결 | 7마왕·4능력치 UI/실제 snapshot 대조. PRIDE100→92, ENVY대상100→92, GLUTTONY110→105, LUST100→95. 실제 포션 보급 후110→101.2·회계70G·재로드 유지. Boss/단골 감사 현수막 원인을 별도 delta로 표시. Source 배열 불변·미확정/SALE 기준 유지 단위 검사 |
| T39 | 글러트니 설명이 보험 유효성을 암시 → `환경 대응·피로 회복은 그대로다.` | 보험은 Final에서 효과 없음·배치 불가. 승인된 문구 명확화 완료 | 공통 Copy 재사용·현재 승인 문구 검사 PASS. 권능/보험 판정 유지 |
| T40 | `출전 불가 · 런 종료` → `출전 불가 · 점포 종료` | GLOSSARY 점포 용어. MISSING ADOPTION 해결 | 무출전 실제 화면 및 기존 무출전 종료 통합 검사. boss action 유지 |
| T41 | D25 UI owner가 요구대응29 복제 → 현행 Final threat owner 참조 | 현재 승인 FINAL/DUNGEON/Source28. MISSING ADOPTION 해결 | 실제 위험 행28 유지. 숫자·판정 변경 없음 |

### 배치 7 검증·한계

- node tests/ui-guard.cjs: PASS 123개 그룹. 확정/미확정/SALE 표시 기준·권능/장식 source 분리·배열 불변·100→92 동작 검사 추가. node tests/copy.cjs: PASS30개 그룹. node tests/final.cjs: PASS30개 그룹. node tests/integration.cjs: PASS55개 그룹. node tests/vocabulary.cjs: PASS11개 그룹. npm run audit: PASS, 생성 보고서 내용 변화 없음.
- tools/qa-final-text-audit.cjs: BEFORE 16개 기존 검사·20개 증거(기존 HEAD UI/Copy 제공). AFTER PASS116개 검사·20개 증거, 390×880(터치)/1280×880(마우스). 실제 원정대 선택·확정·대원 전환·자료 확인·포션 보급·저장/재로드, 폰 tap/데스크 hover 원인 열람, 7마왕의 네 능력치·환경 기준·공개 경계·가로 넘침·런타임 오류·조회 RNG 불변 확인. 원정/마왕전 resolve는 실행하지 않음.
- 캡처/결과: 기존 폴더의 batch7-before-* / batch7-after-* / batch7-before-results.json / batch7-after-results.json. 코드·게임 판정·밸런스·RNG·저장 형식·CSS 변경 없음(표시 함수·문구만 수정).
- 사건55종의 읽기 쉬운 표현과 전체 용어 검수는 최신 추가 요청의 배치8로 남는다. 앞선 배치4는 값·조건 대조 중심이며, 문구 이해도 전수 개선 완료라고 보고하지 않는다. 마지막 전체 npm test→audit·생성 보고서 반영·clean 확인은 배치8 이후 수행한다.

## 배치 8 사건55종 — 이해도·용어 전수 검수 및 수정

BASE: `93251c8f`. 사건55종 모두 이름·상황 설명·효과 문구를 읽고 EVENT/GLOSSARY/COPY_WORLD_VOICE 및 실제 소비 경로를 대조했다. User 2026-10-10이 전체 문구와 최종 수정안을 확인했다. 이름/상황 문장은55종 모두 유지하고, 효과 설명은 승인한 문구를 적용했다. 본사 발주 제한만 최신 승인에 따라 같은 상품 합산 제한에서 한 칸 공급 최대2개로 판정을 변경했다. 아래55행은 수정 전→후와 실제 effects 및 근거다.

| 번호 / 사건 | 수정 전 효과 문구 | 수정 후 문구 | 실제 처리·예외·근거 | 검수 상태 |
|---|---|---|---|---|
| 01 물류대란 | 오늘 모든 발주 매입가 +15% | 오늘 모든 상품의 발주 매입가가 15% 오른다. | EVENT §01 / 발주 / {"price":1.15} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 02 본사 1+1 행사 | 오늘 지정 발주 상품 1종 · 1개 발주 시 2개 입고 | 오늘 1+1 표시가 붙은 발주 상품 1종은 1개를 주문하면 2개가 입고된다. | EVENT §02 / 발주 / {"double":1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 03 게이트 순례 주간 | 오늘 방문객 중 1~3명의 목적지가 다른 열린 게이트로 바뀔 수 있음 | 오늘 손님 중 1~3명이 예상 목적지와 다른 열린 게이트로 갈 수 있다. 실제 경로는 밤에 확인한다. | EVENT §03 / 아침·점포 / {"pilgrimage":1}<br>예상 목적지/실제 목적지 구분, 정확한 대상은 밤까지 비공개 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 04 몬스터 범람 | 오늘 게이트 요구 전력 +12% · 원정 보상 +30% | 오늘 게이트 요구 전력이 12% 오르고, 원정 결과의 손님 소지금 획득이 30% 늘어난다. | EVENT §04 / 원정·보상 / {"danger":1.12,"reward":1.3} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 05 포션 가격 폭등 | 오늘 포션 매입가 +35% | 오늘 포션의 발주 매입가가 35% 오른다. | EVENT §05 / 발주 / {"potionPrice":1.35} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 06 한파 | 오늘 적용 가능한 게이트에 냉기 위험 추가 | 오늘 냉기·화염 위험이 없는 게이트에 냉기 위험이 추가된다. | EVENT §06 / 아침·점포 / {"cold":1}<br>이미 냉기 또는 화염이 있는 게이트 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 07 포션 공급 중단 | 오늘 포션 발주 등장률 대폭 감소 | 오늘 포션은 발주 후보에 매우 드물게 나온다. | EVENT §07 / 발주 / {"potionWeight":0.08}<br>입고 확률 자체가 아니라 포션 후보 가중치 .08. 새 숨은 수치는 표시하지 않음 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 08 신입 모험가 시즌 | 오늘 신규 모험가 1명 방문 | 오늘 손님 중 1명이 새 모험가로 방문한다. | EVENT §08 / 아침·점포 / {"rookie":1}<br>기존 방문 슬롯에 1명 배치. 기존 방문 가능 인원이 없으면 그날 유일한 손님 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 09 왕립 기사단 방문 | 오늘 신규 모험가 1명 방문 · 레벨·희귀도 상향 | 오늘 손님 중 1명이 새 모험가로 방문한다. 보통의 새 모험가보다 시작 레벨이 높고, 높은 등급으로 올 가능성이 커진다. | EVENT §09 / 아침·점포 / {"royal":1}<br>기존 방문 슬롯에 새 모험가 배치. Royal profile이 honorFrame 등급 프로필보다 우선, 시작 레벨 보정은 별도 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 10 암시장 상인 | 오늘 희귀 이상 특별 발주 1건 · 매입가 +35% | 오늘 희귀 이상 상품 전용 발주 칸이 1개 추가된다. 그 칸의 매입가는 35% 높다. | EVENT §10 / 발주 / {"blackmarket":1}<br>희귀 이상 전용 칸 1개에만 가격 가산. 일반 칸 전체/등장 가중치 아님 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 11 본사 재고 감사 | 오늘 누적 폐기 6건 이상이면 운영비 +폐기 수 ×5G · 최대 100G | 이번 점포의 누적 폐기가 6개 이상이면, 오늘 운영비 계산에 누적 폐기 개수 ×5G를 더한다(최대 100G). | EVENT §11 / 아침·점포 / {"audit":1}<br>이번 점포 누적 폐기, 개수 단위. 전체 운영비 반올림 전 더하는 비용 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 12 왕도 축제 | 오늘 음식·음료 구매 의사 +20%p | 오늘 손님의 음식·음료 구매 의사 +20%p | EVENT §12 / 손님·판매 / {"foodDemand":0.2}<br>foodDemand는 음식·음료 구매 의사 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 13 길드 파업 | 오늘 방문객 -1 | 오늘 손님 수 -1명. | EVENT §13 / 아침·점포 / {"visitors":-1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 14 고위험 게이트 발견 | 오늘 고위험·고보상 임시 게이트 +1 | 오늘 요구 전력과 손님 소지금 획득이 더 큰 임시 게이트가 1곳 열린다. | EVENT §14 / 아침·점포 / {"unknown":1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 15 본사 반값 행사 | 오늘 첫 50% 할인 판매 · 본사 지원 +50G | 오늘 처음으로 상품을 50% 할인해 팔면, 본사가 보유 골드 50G를 지원한다. | EVENT §15 / 손님·판매 / {"halfPrice":1}<br>첫 half 판매의 DATA.balance.halfPriceSupport, 가게 보유 골드 지급 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 16 독안개 | 오늘 적용 가능한 게이트에 독 위험 추가 | 오늘 독 위험이 없는 게이트에 독 위험이 추가된다. | EVENT §16 / 아침·점포 / {"poison":1}<br>이미 독이 있는 게이트 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 17 보급 상단 도착 | 오늘 발주 후보 +2 | 오늘 발주 후보가 2칸 늘어난다. | EVENT §17 / 발주 / {"offers":2} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 18 길드 급여일 | 오늘 방문 모험가 · 현재 소지금의 20%만큼 추가 구매 가능 | 오늘 방문한 손님은 손님 소지금의 20%만큼 상품을 더 살 수 있다(오늘만 쓰는 추가 구매 금액). | EVENT §18 / 손님·판매 / {"wallet":1.2}<br>실제 소지금 증가/다음 방문 적립이 아닌 당일 eventBudget | 이름/상황 유지 · 문구 적용/대조 PASS |
| 19 치유소 휴무 | 오늘 보험 상품 구매 의사 +20%p | 오늘 손님의 보험 상품 구매 의사 +20%p | EVENT §19 / 손님·판매 / {"medicalDemand":0.2}<br>medicalDemand는 보험 구매 의사. 발주 등장/보험 효과 강화/실제 구매 확률 +20%p가 아님 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 20 본사 폐기 유예 | 오늘 밤 폐기될 상품 유통기한 +1일 | 오늘 아침 보유 재고 중 오늘까지 팔 수 있던 상품의 유통기한이 1일 늘어난다. | EVENT §20 / 아침·점포 / {"wasteDelay":1}<br>사건 발생 아침에 이미 보유한 오늘까지 재고만, 이후 발주 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 21 늙은 음유시인 | 오늘 방문객 +2 | 오늘 손님 수 +2명. | EVENT §21 / 아침·점포 / {"visitors":2} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 22 본사 야간 근무 수칙 | 오늘 운영비 0G | 오늘 운영비는 0G다. | EVENT §22 / 아침·점포 / {"overheadFree":1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 23 길드 합동 위령제 | 남은 영업 동안 사망 한도 +1 | 이번 점포가 끝날 때까지 사망 한도가 1명 늘어난다. | EVENT §23 / 아침·점포 / {"deathLimit":1}<br>당일 한정 예외: 오늘부터 이번 점포 끝까지 riteBonus | 이름/상황 유지 · 문구 적용/대조 PASS |
| 24 길드 의료단 순회 | 오늘 방문 부상 모험가 · 부상 회복 | 오늘 부상인 손님이 가게에 오면 부상이 낫는다(중상 제외). | EVENT §24 / 손님·판매 / {"healVisitors":1}<br>방문시 ordinary injury=1만 제거, 중상 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 25 길드 의무관 당직 | 오늘 밤 원정 결과 부상 최대 2회 · 무사로 | 오늘 밤 부상으로 돌아온 모험가의 남는 부상을 최대 2명까지 없앤다(중상·사망 제외). | EVENT §25 / 원정·보상 / {"nightSaves":2}<br>outcome 부상은 유지, persistent injury 제거. EVENT owner의 무사 표현은 현행 상태/결과 구분으로 명확화 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 26 길드 위로금 | 오늘 방문 부상 모험가 · 60G 추가 구매 가능 | 오늘 방문 때 부상이 남아 있는 손님은 상품을 60G 더 살 수 있다(오늘만 쓰는 추가 구매 금액). | EVENT §26 / 손님·판매 / {"injuredBudget":60}<br>방문 처리 후에도 남은 injury=1만 추가 구매 금액, 의무실/처치대로 회복되면 미적용 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 27 길드 특별 수당 | 오늘 방문 모험가 · 40G 추가 구매 가능 | 오늘 방문한 손님은 상품을 40G 더 살 수 있다(오늘만 쓰는 추가 구매 금액). | EVENT §27 / 손님·판매 / {"flatBudget":40}<br>당일 eventBudget, 손님 실제 소지금/보유 골드 지급 아님 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 28 본사 물류 지원 | 오늘 모든 발주 매입가 -15% | 오늘 모든 상품의 발주 매입가가 15% 낮아진다. | EVENT §28 / 발주 / {"price":0.85} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 29 보험 공동 구매 | 오늘 보험 매입가 -30% | 오늘 보험 상품의 발주 매입가가 30% 낮아진다. | EVENT §29 / 발주 / {"categoryPrice":{"insurance":0.7}} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 30 본사 원정용품 지원 | 오늘 야외장비 매입가 -30% | 오늘 야외장비 상품의 발주 매입가가 30% 낮아진다. | EVENT §30 / 발주 / {"categoryPrice":{"gear":0.7}} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 31 길드 연회 | 오늘 음식의 피로 회복 ×2 | 오늘 원정에 쓰는 음식의 피로 회복이 2배가 된다(음료는 그대로). | EVENT §31 / 아침·점포 / {"feast":2}<br>음식 Supply만 배수, 음료 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 32 원정 교대 근무 | 오늘 원정으로 쌓이는 피로 절반 | 오늘 원정 결과의 피로 증가량이 50% 줄어든다 | EVENT §32 / 원정·보상 / {"outcomeFatigue":0.5}<br>기본 결과/특성 피로 계산 후 ceil, 회복·음식 완화는 별도 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 33 길드 휴양일 | 오늘 방문 모험가 · 피로 -8 | 오늘 방문하는 모든 손님의 피로가 8 줄어든다. | EVENT §33 / 손님·판매 / {"arrivalFatigue":8}<br>도착 피로 회복, 0 하한 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 34 단골의 날 | 오늘 단골 1명 추가 방문 | 오늘 아직 방문 예정이 아닌 단골이 있으면 1명이 추가로 온다. | EVENT §34 / 아침·점포 / {"regularVisit":1}<br>아직 selected에 없는 방문 가능 단골이 있을 때만 추가 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 35 길드 현상금 | 오늘 원정 보상 +20% | 오늘 원정 결과의 손님 소지금 획득이 20% 늘어난다. | EVENT §35 / 원정·보상 / {"reward":1.2} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 36 마왕의 징조 | 오늘 게이트 요구 전력 +8% | 오늘 게이트 요구 전력이 8% 오른다. | EVENT §36 / 아침·점포 / {"danger":1.08} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 37 입고 지연 | 오늘 발주 후보 -2 | 오늘 발주 후보가 2칸 줄어든다. | EVENT §37 / 발주 / {"offers":-2} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 38 가뭄 | 오늘 음료 매입가 +30% | 오늘 음료의 발주 매입가가 30% 오른다. | EVENT §38 / 발주 / {"categoryPrice":{"drink":1.3}} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 39 길드 세금 징수 | 오늘 운영비 +50G | 오늘 운영비에 50G가 더해진다. | EVENT §39 / 아침·점포 / {"overheadAdd":50} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 40 장맛비 | 오늘 음식·음료 구매 의사 -15%p | 오늘 손님의 음식·음료 구매 의사 -15%p | EVENT §40 / 손님·판매 / {"foodDemand":-0.15}<br>foodDemand 음수, 음식·음료 구매 의사 감소 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 41 본사 발주 제한 | 오늘 같은 상품 발주 최대 2개 | 오늘은 발주 후보 한 칸에서 최대 2개까지 주문할 수 있다. | EVENT §41 / 발주 / {"orderCap":2}<br>User 승인 변경: 각 칸 공급 최대2개, 같은 상품 여러 칸은 각각 주문. 발주 후보 교환·이전 저장에도 적용 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 42 포스기 먹통 | 오늘 발주 후보 교환 불가 | 오늘 발주 후보 교환을 할 수 없다(무료 교환도 포함). | EVENT §42 / 발주 / {"noReroll":1}<br>가격 0의 발주 교환권도 금지 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 43 가격 단속 | 오늘 바가지(150%) 판매 불가 | 오늘은 상품을 바가지(150%)로 팔 수 없다. | EVENT §43 / 아침·점포 / {"noOvercharge":1}<br>가격 모드 overcharge 제한, 일반 정가/할인은 유지 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 44 퇴각로 붕괴 | 오늘 원정 퇴각 확률 -10%p | 오늘 원정의 기본 퇴각 확률이 10%p 줄어든다(귀환석의 추가 퇴각 효과는 그대로). | EVENT §44 / 원정·보상 / {"escapeCut":0.1}<br>기본 escapeCut만, 귀환석 별도 효과에 미적용 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 45 길드 소집령 | 오늘 방문 예정이었던 최고 레벨 모험가 대신 다른 모험가 방문 | 오늘 방문할 수 있는 모험가 중 레벨이 가장 높은 1명은 가게에 오지 않는다. | EVENT §45 / 아침·점포 / {"summons":1}<br>선정 전 available 중 최고 레벨 제외, 방문 예정 손님 중 최고와 다름 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 46 냉장고 고장 | 오늘 음식·음료 재고 유통기한 -1일 | 오늘 아침 가진 음식·음료 재고의 유통기한이 1일 줄어든다(최소 오늘까지). | EVENT §46 / 아침·점포 / {"shelfCut":1}<br>사건 발생 아침의 보유 음식·음료 재고만, 이후 입고 제외 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 47 야시장 | 오늘 방문객 +3 · 운영비 +60G | 오늘 손님 수 +3명. 운영비에 60G가 더해진다. | EVENT §47 / 아침·점포 / {"visitors":3,"overheadAdd":60} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 48 원정 징발령 | 오늘 원정 보상 +40% · 방문객 -1 | 오늘 원정 결과의 손님 소지금 획득이 40% 늘어난다. 손님 수 -1명. | EVENT §48 / 원정·보상 / {"reward":1.4,"visitors":-1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 49 본사 재고 떨이 | 오늘 모든 발주 매입가 -25% · 발주 후보 -3 | 오늘 모든 상품의 발주 매입가가 25% 낮아진다. 발주 후보는 3칸 줄어든다. | EVENT §49 / 발주 / {"price":0.75,"offers":-3} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 50 정예 토벌령 | 오늘 게이트 요구 전력 +15% · 원정 경험치 +50% | 오늘 게이트 요구 전력이 15% 오르고, 원정 경험치가 50% 늘어난다. | EVENT §50 / 원정·보상 / {"danger":1.15,"xpMult":1.5} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 51 폭염 | 오늘 음료 구매 의사 +25%p · 음료 매입가 +35% | 오늘 손님의 음료 구매 의사 +25%p. 음료의 발주 매입가는 35% 오른다. | EVENT §51 / 발주 / {"drinkDemand":0.25,"categoryPrice":{"drink":1.35}}<br>drinkDemand와 음료 매입가를 별개로 명시 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 52 게이트 임시 폐쇄 | 오늘 열린 게이트 1곳 폐쇄 | 오늘 열린 게이트 중 1곳이 폐쇄된다. | EVENT §52 / 아침·점포 / {"closeGate":1} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 53 길드 훈련 주간 | 오늘 원정 경험치 +50% · 원정 보상 -30% | 오늘 원정 경험치가 50% 늘고, 원정 결과의 손님 소지금 획득은 30% 줄어든다. | EVENT §53 / 원정·보상 / {"xpMult":1.5,"reward":0.7} | 이름/상황 유지 · 문구 적용/대조 PASS |
| 54 유통기한 임박 특가 | 오늘 모든 발주 매입가 -40% · 오늘 들어온 재고는 오늘까지 | 오늘 모든 상품의 발주 매입가가 40% 낮아진다. 오늘 발주로 입고한 상품은 오늘까지만 팔 수 있다. | EVENT §54 / 발주 / {"price":0.6,"sameDayStock":1}<br>sameDayStock은 order/final 입고에 적용. 아침 무료 지원 재고까지 모두 당일로 바꾸는 효과 아님 | 이름/상황 유지 · 문구 적용/대조 PASS |
| 55 게이트 안정화 작업 | 오늘 모든 게이트 1단계 · 원정 보상 -40% | 오늘 모든 게이트가 티어 I로 열린다. 원정 결과의 손님 소지금 획득은 40% 줄어든다. | EVENT §55 / 원정·보상 / {"tierOne":1,"reward":0.6}<br>게이트 티어 I, 보상은 손님 소지금 획득 | 이름/상황 유지 · 문구 적용/대조 PASS |

### 승인된 변경·처리 근거

| ID | 수정 전 → 후 | 분류·근거·검증 |
|---|---|---|
| T42 | 사건 효과의 축약 표현 → 승인한55종 설명. 보험은 구매 의사, 원정 보상은 손님 소지금 획득, 발주는 매입가/칸을 구분 | 승인된 문구 개선 및 MISSING ADOPTION. EVENT §01~55 / COPY §13 / GLOSSARY. 이름·상황·효과값·가중치는 유지. exact55행 대조 PASS |
| T43 | 설명에 복사된 숫자 → 실제 effects와 공통 규칙값으로 생성 | 표시값 괴리 방지. 기존 description getter 패턴 재사용. 감사 비용·암시장 가격·순례 인원·1+1 배수는 기존 판정과 작은 규칙값 공유. 테스트에서 효과값37종·공통값·지원금 변경 시 표시가 따라옴을 확인. Canonical 실제 수치 검사는 별도 유지 |
| T44 | 저장된 옛 event.description 직접 표시 → 알려진 사건 ID의 현행 설명을 실제 저장 effects로 생성 | RUNTIME UX BUG 경로 수정. 게시판/상세창 공통 Presentation.eventDescription(). 알 수 없는 ID는 저장 문구 유지. 표시가 저장 본문/효과를 변경하지 않으며 새 저장 필드 없음. 실제 보험 구매 의사35%p 저장·재로드 표시 PASS. User의 과거 문구 발생 원인은 실제 세이브 미제공으로 ROOT CAUSE UNRESOLVED |
| T45 | 같은 상품을 모든 칸에서 합산해 발주2개 제한 → 발주 후보 한 칸 공급 최대2개, 같은 상품 두 칸이면2+2 가능. 추가 입고 괄호 삭제 | 최신 User 승인 Design 변경 / EVENT §41 및 COPY §13-41 갱신. offerFor()는 지원 수량 보너스를 포함한 공급량을 제한하고 validateCart()는 칸별 검사. quantityLimit()/초과 버튼 설명도 동일 범위. 이전 저장의 현재 발주서 남은 공급량도 제한하며 구매 완료 재고는 유지. 실제 클릭으로 두 칸4개 입고·140G 차감·품절·저장 유지·교환 이후 공급≤2 PASS |
| T46 | 냉장고 고장 유통기한-1일 → 오늘 아침 보유 음식·음료에 적용, 최소 오늘까지 명시 | 효과/판매/폐기는 유지. morningEvent() 하한은 오늘, 남은 재고는 nightDiscard()에서 오늘 밤 폐기. 최소1일이라고 잘못 쓰지 않음. 일반-1일·야외장비 제외·오늘 하한·밤 폐기 회귀 PASS |
| T47 | 사건 코치가 모든 사건을 오늘 하루로 단정 → 사건마다 영향과 기간이 다름을 안내 | MISSING ADOPTION. 위령제는 점포 종료까지 지속. EVENT DURATION은 기존 §23 예외를 참조. 의무관의 무사 표현도 결과 부상 유지/이후 부상 상태 제거로 명확화. 실제 판정 유지 |

### 검증·화면

- npm test: 전체 PASS. events29그룹(칸별 제한·공급 보너스 상한·이전 저장·기한 하한 회귀 포함), copy31그룹(55종 승인 원문·실제값 변경 반영·이전 저장), ui-guard123그룹 및 나머지 정규 테스트 모두 완료.
- 첫 전체 검사에서 글꼴에 앤/튼이 빠진 실패를 발견했다. 기존 생성기로 폰트4개와 coverage를 갱신한 뒤 전체 npm test를 다시 실행해 PASS. 새 글꼴/스타일/레이아웃은 도입하지 않았다.
- npm run audit: PASS. Source에서 다시 만든 reports/BALANCE-CATALOG.md 데이터 서명 갱신 포함. 관련 테스트를 Runtime 값에 맞춰 약화하지 않았다.
- tools/qa-event-text-audit.cjs: 390×880(모바일 터치)·1280×880에서 AFTER462검사 PASS. 사건55종의 게시판·실제 클릭한 상세창 원문·효과 글자 가로 잘림·닫기, 이전 저장35%p 설명/재로드, 같은 상품2칸 발주·초과 안내·4개 입고·저장·교환, 런타임 오류 없음 확인.
- BEFORE는 BASE93251c8f의4개 관련 JS를 읽기 전용으로 제공해 재현한다. AFTER 화면은 최신 Source/폰트로 캡처. 왕립 기사단·보험·본사 발주 제한·냉장고 고장·긴 야간 수칙 및 같은 상품 두 칸 발주를 폰/데스크로 기록했다. 산출물: 기존 시각화 폴더의 batch8-before-* / batch8-after-* / results.json 및 전체 검사 로그.
- 공개 API의 기존 입력/출력·저장 형식·RNG 추첨 수는 유지. 요청한 발주 제한 외 실제 효과값 변경 없음. 실물 폰 테스트·전체 qa:runtime/qa:visual·새 밸런스 측정·배포·머지는 실행하지 않았다.
- 배치1~8 검수/수정 영역은 모두 처리했다. 미점검 배치는 없으며, 실제 User 과거 저장 문구의 출처는 위 조건부 ROOT CAUSE UNRESOLVED로 표시한다. User가 AFTER 화면을 확인했다. 최종 문서 정리·통합 검사·머지 후 clean 확인을 남긴다.

## 다음 경계

배치8 COMMIT: 738c74a. User 화면 확인·커밋·문서 정리·머지 승인. 최신 main e3de85dc 통합 후 현재 기준 문서 정리·최종 검사·머지·clean 확인으로 마무리한다.
후속 보고에는 무엇을 어떻게 바꿨는지 변경 전→후와 이유를 함께 적는다(User 2026-10-09).

## 최종 정리

- 배치1~8 핵심 요약은 CHANGELOG의 소스/문구 점검 표로 모았다. WORK_STATE Current는 실제 채택 상태와 현재 owner/자료집만 남겨 과거 미적용 후보와 현재 상태를 혼동하지 않게 정리했다.
- main e3de85dc의 최신 직업/절반 게이트·SALE 팝오버·도움말 연동·NIGHT 연출을 보존했다. 도움말 버튼 이름은 최신 main 승인 명칭을 따르고 기간 없는 안내 문구·새 점포 즉시 갱신은 유지한다. 최신 main에서 제거한 탐식의 허기 둘째 줄과 상세의 피로 회복 중복 줄은 다시 넣지 않았다. 상품 사용 전 피로 기준과 실제 Final 적용값 표시는 유지한다.
- 수정 영역의 오래된 미승인/측정 대기 주석과 잘못된 사건 번호를 현재 owner 참조로 정리했다. 규칙/가격/확률을 새로 결정하지 않았다.
- 통합 후 npm test 전체 PASS, npm run audit PASS. 폰/데스크 관련 화면: 사건462·게이트106·설정74·최종 원정116검사 PASS. 설정 하네스의 이전 회생 단위 기대값은 현행 Canonical의 마감 횟수로 갱신했다(TEST GAP); Source의 회생 규칙은 유지했다. 생성 보고서도 통합된 Source로 갱신했다. 원격 검증 후 승인된 PR 머지로 마무리한다.
