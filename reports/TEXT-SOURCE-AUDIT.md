# 소스와 사용자 노출 텍스트 일치 점검

DATE: 2026-10-09
BASE: `codex/balance-adoption` / `1a981fd87940fde8e86eb04fdee1babf2d104849`
STATUS: 배치 1~3 완료. 관련 검증 PASS, User AFTER 화면 확인·커밋 승인 완료(2026-10-09). 전체 점검 미완료.

배치 1 COMMIT: `9057d7f9`. 배치 2 BASE: `9057d7f9`; User가 AFTER 화면 확인·커밋을 승인했다.
배치 2 COMMIT / 배치 3 BASE: `1f3da969`.

## 배치 상태

| 배치 | 범위 | 상태 |
|---|---|---|
| 1 | 설정·점주 가이드·안내 ON/OFF·한 줄 안내 경계 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 2 | 상품·발주·창고 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
| 3 | 판매·모험가 | 완료 / 관련 검증 PASS / User 화면 확인 완료 |
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

## 다음 경계

User 승인에 따라 배치 3만 커밋·clean 확인하고 STOP. 배치 4~7은 미점검.
후속 보고에는 무엇을 어떻게 바꿨는지 변경 전→후와 이유를 함께 적는다(User 2026-10-09).
