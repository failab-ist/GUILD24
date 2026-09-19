# GUILD24 v2.8 COPY — DIRECTOR PASS 1

- **상태**: DIRECTOR PROPOSAL / USER 미승인 / 비Canonical
- **기반**: `V2_8_COPY_FULL_AUDIT.md` + Current Source
- **검토 Source HEAD**: `63efa7053715046e1212c23fa324a6f1592a5d13`
- **목적**: v2.8 카피 개선 전 1차 Director Audit. Truth / Freshness / 필요성 / UI 배치 / Voice를 함께 검토하고 실제 수정 후보까지 제안한다.
- **금지**: 이 문서만으로 Production Source 또는 Canonical을 변경하지 않는다. User 승인 후 Canonical → Source 순서로 반영한다.

---

## 1. 이번 감사의 일관 기준

모든 Player-facing Copy를 아래 순서로 본다.

### GATE 1 — TRUTH

문장이 암시하는 아래 항목이 Current Source와 정확히 같은가?

- 조건
- 대상
- 수치
- 발동 시점
- 지속 범위
- 다음 Run 유지 여부
- 구매 의사 / 등장 / 원정 효과처럼 서로 다른 mechanic의 구분

하나라도 다르면 **FIX**.
Flavor라도 mechanic을 발명하면 안 된다.

### GATE 2 — FRESHNESS

현재는 사라졌거나 이름이 바뀐 시스템을 말하지 않는가?

예:
- 퇴역 가격 방식
- 퇴역 Franchise/Contract 문법
- `유물`처럼 현재 Player term과 다른 명칭
- hard-coded 구버전 표기
- 예전 Rule의 일부만 남은 Help

Outdated면 **FIX 또는 REMOVE**.

### GATE 3 — DECISION VALUE

이 문구가 현재 화면에서 Player의 행동을 바꾸는가?

- 바꾸면 남긴다.
- 복구/파괴적 행동에 필요하면 남긴다.
- 단순 중복 설명이면 지운다.
- Flavor가 Decision Surface를 늘리기만 하면 뺀다.

**문장이 좋은가보다, 여기 있어야 하는가를 먼저 본다.**

### GATE 4 — PLACEMENT / DUPLICATION

같은 Truth가 같은 Flow에서 반복되면 가장 먼저 필요한 한 곳만 남긴다.

- ORDER 정보 → ORDER 결정 전
- SALE 정보 → 상품/가격 결정 전
- Meta/Collection Flavor → Codex/Collection
- Save/Reset 위험 → 실행 직전 Confirm

유용한 문구라도 위치가 틀리면 **MOVE**.

### GATE 5 — SCAN

Decision Surface의 기본 문법:

```text
조건 · 효과 · 예외
```

우선 제거:
- “현재 / 해당 / 실제 / 적용 / 확인 / 선택”의 연속
- “~합니다 / ~됩니다 / ~할 수 있습니다”의 반복
- 한 문단에 Rule 3개 이상
- UI에 보이는 값을 다시 풀어쓴 문장
- 원인 → 예외 → 주의 → 부연을 한 문단에서 모두 설명

Tutorial은 예외적으로 1~2문장을 허용하되, 한 Step에 한 가지 읽는 법만 가르친다.

### GATE 6 — VOICE

- **System / Rule**: 짧고 정확
- **GUILD24 / HQ**: 건조한 공지, 장부, 표지판
- **NPC**: 사람 말투. UI 대신 전략을 설명하지 않음
- **Flavor**: 세계감을 만든다. Rule을 대신하지 않음
- **Save / Error / Reset**: 세계관보다 정확성과 복구 행동 우선

### ACTION

- **KEEP**: Truth / 위치 / 길이 모두 문제 없음
- **FIX**: Source와 다르거나 outdated
- **WASH**: Truth는 맞지만 늘어지거나 AI 설명투
- **REMOVE**: 없어도 판단 손실 없음
- **MOVE**: 내용은 필요하지만 현재 Surface가 틀림
- **DEFER**: 현재 Player-facing이 아니거나 우선순위 낮음

---

# 2. 1차 결론

## P0 — TRUTH / OUTDATED / DESTRUCTIVE SAFETY

### P0-01. SLOTH가 현재 용어가 아닌 `유물`을 말함

CURRENT:
> 15일·20일·25일 중 두 차례와 30일에, 유물을 받는 대신 봉인 하나를 풀 수 있다.

Current system term은 `점포지원`.

PROPOSED:
> 15·20·25일 중 두 번, 그리고 30일에 점포지원 대신 봉인 하나를 풀 기회가 생긴다.
>
> 봉인을 풀면 그날 점포지원은 포기한다. 풀수록 슬로스가 약해진다.

ACTION: **FIX**

---

### P0-02. 단골 스탬프 기계가 퇴역한 `무료 보급`을 설명함

CURRENT:
> 유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.

현재 ordinary SALE에는 무료 제공 가격 방식이 없다.

실제 Source는 “판매로 얻는 positive loyalty를 1.5배, 생환 loyalty는 제외”에 가깝다.

PROPOSED:
> 판매로 얻는 단골도 +50% · 생환 보너스 제외

ACTION: **FIX**

---

### P0-03. Codex에서 점포 자본에 Gold 단위 `G`를 붙임

CURRENT:
> 점포 자본 {N}G · 보유 장식 {N}/4

다른 현재 Surface:
- 점포 관리: `점포 자본 {N}`
- Run End: `얻은 점포 자본 +N`
- 장식 구매: `N 자본`

점포 자본은 Gold가 아니다.

PROPOSED:
> 점포 자본 {N} · 보유 장식 {N}/4

ACTION: **FIX**

---

### P0-04. Help의 거절 Rule이 현재 Price Ceiling을 덜 설명함

CURRENT:
> 같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.

Current Source:
한 SKU가 실제 거절되면 **그 가격과 더 비싼 가격**이 그 방문 동안 닫힌다.
더 싼 가격은 남을 수 있다.

PROPOSED:
> 거절된 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

ACTION: **FIX**

---

### P0-05. Full Data Reset이 Run 폐점처럼 보임

CURRENT UI:
- Settings button: `Full Data Reset`
- Confirm title: `폐업 결재`
- Body: `현재의 모든 진행 상황을 포기하고 새로운 상회로 다시 시작합니다. 동의하십니까?`
- Confirm button: `폐업 결재`

실제 기능:
현재 Run만이 아니라 Account / Meta / Tutorial / Codex 등 저장 전체 삭제.

Run Abandon과 의미가 충분히 분리되지 않아 destructive action copy로 부적합.

PROPOSED:

Settings button:
> 모든 데이터 초기화

Confirm title:
> 모든 데이터 초기화

Body:
> 현재 영업과 본사 기록을 포함한 이 브라우저의 GUILD24 저장을 전부 지운다.
> 되돌릴 수 없다. 남기려면 먼저 저장을 내보낸다.

Buttons:
> 저장 내보내기 / 취소 / 전부 지우기

Success toast:
> 게임 데이터를 초기화했습니다.

ACTION: **FIX**

---

## P1 — TRUTH CLARITY / NOMENCLATURE

### P1-01. `프리미엄 쇼케이스`가 서로 다른 두 시스템에 중복

현재:
- 점포지원 `프리미엄 쇼케이스`: 희귀 이상 발주 가중치 +70% / 운영비 +10G
- 장식 `프리미엄 쇼케이스`: 신규 NPC 희귀도 분포 개선

같은 이름, 다른 System, 다른 Effect.

PROPOSED:
- 장식명은 유지
- 점포지원명을 **`희귀상품 쇼케이스`**로 변경

이유:
점포지원 쪽 Effect가 “희귀 상품 발주”라 이름과 mechanic이 직접 연결됨.

ACTION: **FIX / User 승인 필요**

---

### P1-02. 장식 `프리미엄 쇼케이스` Effect 문장이 실제 동작보다 넓게 들림

CURRENT:
> 희귀한 모험가가 더 자주 찾아온다

실제:
기존 희귀 NPC의 재방문 빈도를 올리는 것이 아니라,
**새 NPC 생성 시 희귀도 가중치**를 바꾼다.

PROPOSED:
> 새로 만나는 모험가의 희귀도 증가

ACTION: **FIX**

---

# 3. UI에 필요 없는 Copy — REMOVE 우선

## 3-1. 장식 Flavor는 점포 관리에서 제거

현재 `storePanel()`은 각 장식마다:

- 이름
- Effect
- Flavor
- 구매/적용 상태

를 모두 노출한다.

예:
> 새벽마다 본사 물류가 한 줄 더 붙는다.

> 길드 도장이 찍힌 현판. 가끔 이걸 보고 한 명이 더 들른다.

이 Flavor는 나쁘지 않지만 **점포 관리 = 구매/장착 Decision Surface**다.
Effect 바로 아래에 Flavor를 넣으면 카드 높이만 늘고 비교 속도를 떨어뜨린다.

### DIRECTOR PROPOSAL

점포 관리에서는:
- 이름
- Effect
- 가격 / 적용 상태

만 남긴다.

`d.text` 데이터는 당장 삭제하지 않아도 된다.
향후 도감/전시용 Surface가 생길 때 쓸 수 있지만 **현재 구매 UI에서는 렌더하지 않는다.**

ACTION: **REMOVE FROM UI**

### 비교

Item Flavor는 대부분 Codex에서만 보인다.
따라서 Item Flavor는 Decision Surface를 방해하지 않으므로 1차 Pass에서는 유지한다.

---

## 3-2. `비워 둘 수 있습니다.` 제거

Slot이 비어 있으면 이미 `비움`으로 표시되고,
적용/해제 버튼도 존재한다.

CURRENT:
> 비워 둘 수 있습니다.

PROPOSED:
> 제거

ACTION: **REMOVE**

---

## 3-3. CLOSING 회계 구현 설명 제거

CURRENT:
> 미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

뒤 문장은 Player Rule이 아니라 회계 구현 설명에 가깝다.

PROPOSED:
> 미판매 재고는 다음 날로 이월.

ACTION: **WASH + REMOVE**

---

## 3-4. Settings 개발용 Footer 제거

CURRENT:
> 버전 0.4 · 로컬 실행 지원 · 외부 연결 없음

문제:
- `버전 0.4` hard-coded stale
- Pages 배포 중인 Player UI에서 가치 낮음
- Runtime 네트워크 정책은 Player decision과 무관

PROPOSED:
> 전체 제거

실제 Version 표기가 필요해지면 build metadata에서 별도 표기.

ACTION: **REMOVE**

---

## 3-5. Seed UI는 Production Player Surface에서 이동

CURRENT:
> 재현용 Seed 지정
> 비워 두면 새로운 Seed로 시작합니다.

기능은 QA에는 유용하지만 Player Decision이 아니다.

PROPOSED:
- Seed 기능 삭제 X
- 일반 새 점포 준비 UI에서는 제거
- Debug / internal utility로 이동

ACTION: **MOVE**

---

# 4. TUTORIAL — 2.8 DIRECTOR WASH

현재 Hotfix로 길이는 크게 줄었다.
1차 Pass에서는 전면 재작성하지 않고 아래 4개만 수정하는 편이 낫다.

## 심층원정

CURRENT:
> 같은 게이트의 더 깊은 원정이다. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 더 성장한다. 점포 매출에는 영향이 없다.

PROPOSED:
> 같은 게이트의 더 깊은 원정. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 성장한다. 점포 매출은 없다.

WHY:
기능 Truth 유지, 문서형 종결 반복 축소.

---

## 전망

CURRENT:
> 상품을 팔아도 이 전망은 갱신되지 않는다. 성공·실패 결과는 미리 알 수 없고, 실제 결과는 원정 후 확인한다.

PROPOSED:
> 이 전망은 판매 전 상태 기준이다. 상품을 팔아도 바뀌지 않으며, 결과는 원정 후 확인한다.

WHY:
`갱신`, `실제 결과` 같은 시스템 문서어를 줄이고 기준 시점을 먼저 제시.

---

## 보급

CURRENT:
> 필요 보급을 못 채우면 원정 준비에 공통 페널티가 걸려 투력·강인함·기동·정신이 낮아진다. 남는 보급은 현재 피로와 이번 원정에서 쌓일 피로를 줄인다.

PROPOSED:
> 필요 보급이 모자라면 투력·강인함·기동·정신이 모두 낮아진다. 남는 보급은 피로를 줄인다.

WHY:
Player가 알아야 할 결과만 남기고 내부 분류어 `공통 페널티`, 피로 채널의 장문 구분 제거.

---

## 진열대

CURRENT:
> 고른 상품은 이 손님이 오늘 원정에서 한 번 사용한다. 모든 상품은 1회용이며 다음 원정으로 가져가지 않는다.

PROPOSED:
> 고른 상품은 오늘 원정에서 한 번 쓰고 사라진다. 다음 원정으로 가져가지 않는다.

WHY:
동일 Truth, 더 짧음.

---

## 나머지 Tutorial

KEEP:
- 방문객
- 게이트
- 보유 골드
- 수량
- 후보 교환
- 발주 확정
- 손님
- 대성공
- 목적지
- 환경 대응
- 가격
- NIGHT
- CLOSING

이유:
현재 길이에서 기능을 설명하는 데 필요한 최소 수준.
2.8에서 다시 늘리지 않는다.

---

# 5. SALE — 설명을 줄이고 Label을 고친다

SALE은 반복 노출 Surface라 Tutorial보다 더 짧아야 한다.

## 5-1. Tooltip

CURRENT:
> 게이트 전투 요구 대비 현재 전투 준비 수준

PROPOSED:
> 게이트 요구 전력과 현재 전투 준비의 비교

CURRENT:
> 원정 실패 이후 사망으로 이어질 조건부 위험

PROPOSED:
> 원정에 실패했을 때의 사망 위험

CURRENT:
> 압박: 위험이 요구하는 능력치 · 환경 대응: 이 손님의 보급 전 대응 수준

PROPOSED:
> 압박은 필요한 능력치 · 환경 대응은 판매 전 준비 상태

ACTION: **WASH**

---

## 5-2. 영구 `estimate` 문단 제거

CURRENT:
> 오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다. 게이트 안에서 어떻게 될지까지는 아무도 모른다.

Forecast 자체와 Tooltip, Tutorial이 이미 이 역할을 한다.

PROPOSED:
> 제거

ACTION: **REMOVE**

---

## 5-3. Item 선택 Preview의 Report 말투 축소

CURRENT → PROPOSED:

| Current | Proposed |
|---|---|
| 보급 후 변화 | 판매 시 변화 |
| 이 상품이 직접 | 상품 효과 |
| 보급이 상태에 미치는 영향 | 보급 변화 |
| 이 손님에게는 지금 걸리지 않는 효과 | 그 밖의 효과 |
| 이 손님의 준비는 달라지지 않는다 | 현재 준비 변화 없음 |

주의:
`그 밖의 효과`에는 현재 Stat에 바로 찍히지 않더라도
보험/조건부 효과처럼 실제 Decision에 필요한 Truth가 남는다.
내용은 숨기지 않고 Group label만 줄인다.

ACTION: **WASH**

---

## 5-4. 재고 FIFO 설명 상시 노출 제거

CURRENT:
> 유통기한 없음 / 폐기까지 N일 · 가장 먼저 폐기될 재고부터 나간다

Player가 개별 Stack을 선택할 수 없으므로
`가장 먼저 폐기될 재고부터 나간다`는 매 Item 선택마다 반복할 Decision 정보가 아니다.

PROPOSED:
> 유통기한 없음
또는
> 폐기까지 N일

ACTION: **REMOVE DUPLICATE RULE**

---

# 6. HELP / 점주 가이드 — 전체 교체 제안

현재 가장 큰 AI 설명투 Hotspot.

## 원칙

- 화면에 이미 보이는 숫자/기능을 다시 매뉴얼로 쓰지 않는다.
- 복구/영구성/실패처럼 놓치면 큰 정보만 남긴다.
- 문단 대신 짧은 운영 규칙으로 만든다.

## PROPOSED FULL COPY

### 점포지원

> DAY 0 무료 1개. 이후 DAY 5·10·15·20·25·30에 구매 기회가 온다.
> 보류한 후보와 가격은 다음 구매 기회 전날까지 유지된다.

### 발주

> 오늘 손님과 게이트를 보고 수량을 정한다.
> 발주 확정 뒤에도 추가 발주와 후보 교환이 가능하다.

### 판매

> 목적지·능력·특성을 보고 상품과 가격을 정한다.
> 50%는 관계 투자, 100%는 기본, 150%는 수익 우선.
> 거절된 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

### 단골

> 단골도는 구매 의사와 재방문에 영향을 준다. 능력치는 올리지 않는다.

### 원정

> 판매한 상품은 그날 원정에서 한 번 쓰고 사라진다. 가방은 2칸.
> 결과는 NIGHT에서 확인한다.

### 점포 종료

> 적자 마감은 재고 정리로 회생할 수 있다. 한 영업 최대 3회.
> 돌아오지 못한 모험가가 10명이 되면 폐점한다.
> DAY 30 최종 원정이 끝나면 이번 점포 영업도 끝난다.

### 다음 점포

> 남음: 도감·해금·직업 숙련·점포 자본·보유 장식
> 초기화: 모험가·재고·골드·점포지원

### 시간

> 실시간 제한 없음.

### REMOVE FROM HELP

- 기본 방문객 3~6의 재설명
- Gate 1→3 증가 설명
- 모든 Trait이 처음부터 보인다는 설명
- “마감에서 거래와 보급의 작용을 확인”
- 같은 의미의 bankruptcy 문단 반복

이 정보는 현재 각각 Morning / Sale / Roster / Closing에서 읽힌다.

---

# 7. STOCK / RESCUE MODAL

CURRENT:
> 유통기한은 입고일부터 계산합니다. 재고 정리는 운영비가 모자란 마감에만 할 수 있고, 그 재고를 사들인 값의 50%를 회수합니다. 잔고가 0 이상이 되면 그 자리에서 끝납니다. 한 영업에서 N번까지, 지금까지 N번 썼습니다.

이 Surface는 실제 회생 판단 중에 열리므로 Rule은 필요하다.
단 문단은 줄인다.

PROPOSED:
> 적자 마감에만 정리 가능 · 매입가의 50% 회수
> 잔고가 0G가 되면 정리 종료 · 회생 {used}/{limit}

유통기한은 각 Item row에서 이미 보이므로 여기서 다시 정의하지 않는다.

ACTION: **WASH**

---

# 8. DECORATION — COPY / UI 제안

## 점포 관리 Header

CURRENT:
> 장식은 영업 밖에서만 사고 바꿀 수 있습니다.
> 지금은 영업 중이라 확인만 됩니다.

PROPOSED:

영업 밖:
> 별도 설명 제거

영업 중:
> 이번 영업의 장식은 고정됨.

WHY:
구매/적용 버튼이 가능한 행동을 이미 말한다.

---

## 4종 Effect

### 새벽배송 안내판
KEEP:
> 발주 후보 +1

### 길드 제휴 현판
CURRENT:
> 매일 아침 10% 확률로 방문객 +1명

PROPOSED:
> 매일 아침 방문객 +1 · 10%

### 알뜰 금고
KEEP:
> 영업 시작 자금 +300G

### 프리미엄 쇼케이스
CURRENT:
> 희귀한 모험가가 더 자주 찾아온다

PROPOSED:
> 새로 만나는 모험가의 희귀도 증가

---

# 9. NPC DIALOGUE — TRUTH FIX

## 겁쟁이

문제:
`귀환석 있습니까?`, `가까운 게이트는 없어요?`는
귀환석 구매 선호 / 목적지 선호 mechanic처럼 읽힐 수 있다.

PROPOSED POOL:

> “오늘은 좀 빨리 돌아오고 싶네요.”
>
> “이쪽, 위험한 데 맞죠?”
>
> “살아서 오면 또 들를게요.”
>
> “괜히 안쪽까지 갈 필요는 없잖아요.”

성격은 유지하되 현재 Trait의 생환/회피 성격과 어긋나는 구매 힌트는 제거.

---

## 대식가

문제:
카운터에서 음식 구매 요구처럼 들리지만 purchase-intent Trait은 아니다.

PROPOSED POOL:

> “원정 끝나면 밥부터 먹어야겠어요.”
>
> “배는 벌써 고프네요.”
>
> “먹는 건 자신 있습니다.”

음식과 잘 맞는 성격은 남기되 지금 상품을 사겠다는 약속은 하지 않는다.

---

## 탐욕

문제:
현재 대사는 고가/희귀 상품 선호처럼 읽힘.
실제 Trait은 전리품 증가 / 탈출 불리.

PROPOSED POOL:

> “오늘은 빈손으로 돌아올 생각 없습니다.”
>
> “안쪽까지 가면 건질 게 있겠죠.”
>
> “이번엔 전리품 좀 제대로 챙겨와야죠.”

ACTION: **FIX**

---

# 10. DEEP EXPEDITION — 중복 제거

현재 Morning Slip과 SALE Detail이 같은 Rule을 여러 문장으로 반복한다.

## Morning에서 필요한 것

Morning의 목적:
“오늘 심층원정이 있고 어느 게이트인지”를 ORDER 전에 알리는 것.

PROPOSED DISPLAY:

> 길드 심층원정
> {게이트명}
> 같은 게이트 · 위험 동일 · 요구 전투력 상승
> 손님 1명 후원 가능 · 점포 매출 없음

후원금의 정확한 액수는 손님마다 다르므로 Morning에서 장문으로 설명할 필요 없음.

## SALE에서 필요한 것

손님을 보고 실제 추천할 때:

> 성공 시 해당 손님 성장·소지금 증가
> 후원금 반환 없음 · 점포 매출 없음

Button:
> 심층원정 추천 · 후원금 {N}G

## REMOVE

- `추천하지 않아도 된다.`
- `원하지 않으면...`
- Morning / SALE 양쪽에서 같은 `가게가 버는 돈은 없다` 장문 반복

Optional UI 자체가 이미 선택하지 않아도 진행 가능함을 보여준다.
필요하면 한 곳에만:
> 오늘만 추천 가능

ACTION: **MERGE / REMOVE**

---

# 11. STORE SUPPORT — 설명 문법 통일 제안

점포지원은 구매 판단 자체이므로 Flavor를 추가하지 않는다.
현재 Effect Truth는 유지하면서 “문장”보다 “조건 · 효과”로 정리한다.

| ID | Proposed |
|---|---|
| bulk | 같은 상품 3개 이상 발주 · 3번째부터 매입가 -15% |
| rotation | 전날 6건 이상 판매 · 다음 날 첫 대량발주 -10% |
| stamp | 판매로 얻는 단골도 +50% · 생환 보너스 제외 |
| member | 다음 날부터 재방문 손님 선택 가중치 +40% |
| showcase | 희귀 이상 발주 가중치 +70% · 다음 날 운영비 +10G |
| guarantee | 하루 1회 · 정가 200G 이상 상품 판매 시 본사 20% 부담 · 점주는 판매가 전액 수령 |
| hazardBoard | 알려진 게이트 위험 대응 상품 · 발주 가중치 +80% |
| medicine | 치료·야외장비·보험 · 발주 가중치 +60% · 공급 +1 |
| fridge | 음식·음료 유통기한 +1일 · 설치 시 보유 재고도 1회 연장 |
| kitchen | 음식·음료 능력치 효과 +40% · 보급/위험 대응/부작용 제외 |
| board | 다음 날부터 기본 방문객 최소 4명 · 활동 가능한 인원 한도 |
| rookieBoard | 다음 날부터 신규 손님 선택 가중치 +70% · 후반 신입은 현재 시기 레벨로 합류 |
| groupFlyer | 방문객 6명 이상인 날 · 같은 상품 3개 이상 발주 -10% |
| memberBundle | 재방문 손님의 그날 두 번째 유료 구매 · 단골도 +2 |
| premiumMember | 단골도 50+ 손님 · 희귀 상품 구매 의사 +10%p |
| returnPoints | 재방문·단골도 30+ · 오늘 유료 구매 후 생환 시 단골도 +2 / 소지금 +12G |
| expeditionMeal | 음식·음료의 맞는 위험 대응 효과 +25% · 보급 부담이 있으면 능력치 효과 +25% |
| coldcase | 희귀 신선식품 발주 가중치 +80% · 유통기한 +1일 |
| supplyCert | 위험 대응/보험 희귀 상품 판매 · 정가의 8% 본사 수당 |
| dawnBulk | 음식·음료 같은 상품 3개 이상 발주 · 매입가 -15% |
| logisticsHQ | 전날 8건 이상 판매 · 다음 날 첫 대량발주 -25% |
| lifetime | 단골도 60+ 생환 고객 · 소지금 +25G · 다음 방문 가중치 +50% |
| royalCert | 희귀 이상 바가지 판매 · 정가의 12% 본사 수당 |
| expeditionCert | 알려진 위험이 있으면 대응 역할 발주 후보 최소 1종 · 후보 교환에도 유지 |
| fresh24 | 음식·음료 유통기한 +2일 · 능력치 효과 +80% · 보급 제외 |
| hub | 다음 날부터 방문객 +1(30%) / +2(5%) · 운영비 +10% · 활동 가능 인원 한도 |
| warehouse | 창고 +10칸 |
| terminal | 다음 발주 후보 생성부터 +2개 |
| delivery | 매일 첫 후보 교환 무료 · 이후 50G부터 2배씩 증가 |
| efficiency | 다음 날부터 기본 운영비 -15G |

### Name collision proposal

`showcase` 점포지원:
> 프리미엄 쇼케이스

→
> 희귀상품 쇼케이스

장식명 `프리미엄 쇼케이스`는 유지.

---

# 12. EVENT — 1차 판정

### Reveal

대부분 KEEP.

이유:
- 짧음
- 세계감이 있음
- Rule을 대신 설명하지 않음

특히 KEEP:
- 물류대란
- 왕립 기사단 방문
- 암시장 상인
- 늙은 음유시인
- 본사 야간 근무 수칙

### Effect line

Truth는 대체로 맞지만 문법이 혼재한다.

예:
- `오늘 매입가 +15%`
- `오늘 새로운 모험가 1명이 찾아옵니다.`

2차 Pass에서 Effect만 장부식으로 통일 권장.

예:
> 오늘 신규 모험가 +1

다만 Event 22종은 현재 AI 설명투의 핵심 원인이 아니므로 P2.

---

# 13. ITEM FLAVOR — 1차 판정

## KEEP

현재 Item Flavor는 주로 Codex에서 보이고,
SALE Decision Surface에서는 실제 Effect가 중심이다.

따라서 “Flavor가 있다는 이유”만으로 줄이지 않는다.

1차에서는:
- mechanic을 거짓으로 약속하는 문장만 Truth check
- 문체 편차만 P2로 보류

Decoration Flavor와 다르게 판단하는 이유는 **UI Placement**다.

---

# 14. BOSS — 1차 판정

## KEEP

- D5 Flavor
- PRIDE / ENVY / GREED / GLUTTONY / LUST mechanic disclosure
- Final reveal

정확성이 중요한 Surface라 과도한 워싱을 우선하지 않는다.

## FIX

SLOTH의 `유물` → `점포지원`.

GLUTTONY exact wording은 현재 확정 mechanic과 일치하므로 유지.

---

# 15. SETTINGS / SAVE / UTILITY

## KEEP

- 저장 내보내기
- 저장 가져오기
- 자동저장 실패 / import 실패 error
- BGM / SFX
- 현재 지점 포기

## WASH

CURRENT:
> 자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.

PROPOSED:
> 자동저장은 이 브라우저에 남는다. 다른 기기로 옮기려면 저장 파일을 내보낸다.

CURRENT:
> 게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.

PROPOSED:
> 실시간 제한 없음 · 첫 실행 소리 꺼짐

## LOCALIZATION

`Sound On / Sound Off`
→
`소리 켜기 / 소리 끄기`

`Full Data Reset`
→
`모든 데이터 초기화`

---

# 16. DORMANT / NON-PLAYER COPY

Current Source에는 아래처럼 저장되지만 현재 `app.js`에서 직접 렌더하지 않는 Copy가 있다.

예:
- `run.notice`
- `regionReport`
- 일부 generic install notice

대표:
> 제7게이트의 첫 아침. 오늘 갈 던전을 보고 발주해 보세요.

> {점포지원} 설치. 방문객·운영비 효과는 다음 날부터 적용됩니다.

두 번째 문장은 실제 모든 점포지원의 Effect를 대표하지도 않는다.

하지만 **현재 Player-facing이 아니므로 이번 1차 Voice Pass에서 Production 문구 개선 우선순위로 잡지 않는다.**

후속 Source cleanup 시:
- consumer가 정말 0인지 확인
- dead copy면 제거
- 다시 노출할 계획이면 그때 Truth 기준 재작성

ACTION: **DEFER**

---

# 17. 1차 CHANGE PACKAGE 제안

User 승인 시 한 번에 전부 Source에 넣지 않고 아래 순서가 좋다.

## Batch A — Truth / Outdated

1. SLOTH `유물` → `점포지원`
2. Stamp의 `무료 보급` 제거
3. Codex 점포 자본의 `G` 제거
4. Help refusal price ceiling 정정
5. Full Data Reset copy 명확화
6. Decoration Premium copy 정정
7. `프리미엄 쇼케이스` 중복명 해소

## Batch B — REMOVE / UI Density

1. Decoration Flavor를 점포 관리에서 숨김
2. `비워 둘 수 있습니다.` 제거
3. SALE permanent estimate 제거
4. SALE FIFO 반복 설명 제거
5. Closing accounting implementation sentence 제거
6. Settings version/footer 제거
7. Seed를 normal Player UI에서 Debug로 이동

## Batch C — AI Explanation Wash

1. Help 전체
2. Tutorial 4개 Step
3. SALE tooltip / Preview label
4. Stock/Rescue modal
5. Deep Morning/Sale 중복
6. Store Support 30종 effect 문법

## Batch D — Flavor Polish

1. NPC 3 Trait pool
2. Event effect style
3. Item Flavor 개별 tone
4. 기타 empty-state / toast

---

# 18. DIRECTOR 1차 VERDICT

현재 카피의 문제는 “전부 AI가 쓴 것 같다”가 아니다.

오히려:
- Item Flavor
- Event Reveal
- Night Result Flavor
- Closing receipt labels
- 짧은 HQ/Store 표지 문구

는 현재 게임의 톤을 이미 잘 만든다.

AI 설명투가 강해지는 곳은 공통점이 있다.

> **Rule이 많은 Surface에서, 이미 UI가 보여주는 내용을 문단으로 다시 설명할 때**

따라서 v2.8 Copy 방향은 새 문구를 많이 추가하는 것이 아니라:

```text
Truth 오류 수정
→ 오래된 문구 제거
→ Decision Surface의 중복 삭제
→ 필요한 Rule만 짧게
→ Flavor는 Lore Surface에만
```

가 맞다.

이 Pass는 제안본이다.
User 승인 전 Canonical / Source에는 반영하지 않는다.
