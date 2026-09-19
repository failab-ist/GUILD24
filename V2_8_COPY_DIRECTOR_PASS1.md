# GUILD24 v2.8 COPY — DIRECTOR PASS 1 · REV 3

- **상태**: DIRECTOR PROPOSAL / USER 미승인 / 비Canonical
- **기반**: `V2_8_COPY_FULL_AUDIT.md` + Current Source
- **검토 Source HEAD**: `87a00050f0bffd0fcc14227333395eac7f8d88a5` (P1 live-playtest hotfix merged source)
- **목적**: v2.8 카피 개선 전 1차 Director Audit. Truth / Freshness / 필요성 / UI 배치 / Voice를 함께 검토하고, 실제 모바일 플레이 피드백까지 Source와 대조해 수정 후보를 제안한다.
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


# 19. LIVE PLAYTEST COPY FEEDBACK — SOURCE-VERIFIED REVISION

이 절은 User의 실제 플레이 피드백을 Current Source와 다시 대조한 결과다.
앞 절과 충돌하는 부분이 있으면 **이 절의 보완안이 우선**한다.

---

## 19-1. NPC CARD — `더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.`

### SOURCE CHECK

현재 NPC 상세에는 아래가 남아 있다.

> 더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.

단골도 60+이면:

> 성장 잠재력: 빠른 성장 / 꾸준한 성장 / 착실한 성장

을 노출한다.

하지만 현재 Design Truth는:

```text
Player-facing growth identity
= Job + Level + actual four Core Stats
```

이며 v2.7부터 **Level milestone Trait 획득은 제거**됐다.
따라서 `남은 특성`이라는 미래 슬롯/해금 암시는 명백히 stale하다.

또한 Potential은 실제 성장 계산에는 존재하지만
단골도가 Potential을 높이는 기능은 없다.
현재 Source는 단골도가 60을 넘으면 단지 UI에서 Potential 분류를 보여줄 뿐이다.

### LOYALTY SOURCE TRUTH

단골도는 “재방문만”의 수치도 아니다.

현재 Source에서 실제로:
- 구매 수락 확률에 반영
- 재방문 선택 가중치에 반영
- 일부 점포지원의 30 / 50 / 60 조건에 사용
- Trusted Regular 판정에 사용
- LUST Final logic이 Trusted Regular를 읽을 수 있음

반대로:
- Potential을 올리지 않음
- Trait을 새로 열지 않음
- 숨은 `남은 특성`을 해금하지 않음

### DIRECTOR PROPOSAL

NPC 상세의 아래 두 종류 문구를 **전부 제거**한다.

- `더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.`
- `성장 잠재력: ...`

단골도 숫자와 방문 횟수는 유지한다.

이유:
Potential은 현재 Player-facing growth identity가 아니며,
`남은 특성`은 퇴역 Rule을 암시한다.

ACTION: **P0 FIX / REMOVE**

---

# 20. FATIGUE — SALE COPY REBUILD

User 실기 피드백:

현재 예:

```text
피로 1 → 출발 0 · 보급 회복 -1
남은 보급 5 · 결과 피로를 그만큼 줄인다
밤 피로 · 성공 0 · 퇴각 0 · 부상 1
```

숫자는 맞지만 읽는 순서가 시스템 계산 로그에 가깝다.

### SOURCE TRUTH

실제 순서:

```text
현재 피로
→ 필요 보급 지불
→ 남는 보급으로 출발 전 피로 회복
→ 더 남은 보급은 원정 결과 피로를 상쇄
→ 귀환 후 최종 피로
```

### PROPOSED SALE COPY

예시 값이 위와 같을 때:

```text
출발 피로 0  · 현재 1 / 보급 -1
남는 보급 5  · 귀환 피로 최대 5 감소
귀환 후 피로 · 성공 0 / 퇴각 0 / 부상 1
```

더 짧은 UI가 필요하면:

```text
출발 피로 0  (보급 -1)
귀환 후 피로 · 성공 0 / 퇴각 0 / 부상 1
```

단, 남는 보급이 결과 피로를 실제로 상쇄하는 판단이 중요한 경우에만
중간 한 줄을 노출한다.

### LABEL RULE

REMOVE:
- `밤 피로`
- `결과 피로를 그만큼 줄인다`

USE:
- `출발 피로`
- `귀환 후 피로`
- `남는 보급`

ACTION: **P1 WASH**

---

# 21. FATIGUE — NIGHT RESULT REBUILD

현재 Night는 같은 계산을 네 토큰으로 쪼갠다.

- 보급 회복
- 보급 완화
- 원정 결과
- 최종 피로

각각 Source 내부 단계명에 가까워 Player가 인과를 다시 조립해야 한다.

### PROPOSED

한 묶음으로 합친다.

예:

```text
피로 1 → 1
출발 전 보급 -1 · 부상 +6 · 남는 보급 -5
```

또는 UI가 두 줄 토큰을 못 받으면:

```text
귀환 후 피로 1
현재 1 · 출발 전 -1 · 부상 +6 · 보급 -5
```

### RULE

- `보급 회복` → 내부 용어로만
- `보급 완화` → 내부 용어로만
- Player-facing에는 **언제 줄었는지**를 말한다.
  - 출발 전
  - 원정 결과
  - 귀환 후

ACTION: **P1 MERGE / WASH**

---

# 22. SALE — INTERNAL MARKER `포션` 노출

User가 본:

```text
이 손님에게는 지금 걸리지 않는 효과
포션
```

은 이해할 수 없는 것이 정상이다.

### SOURCE CHECK

`potion: 1`은:
- 포션체질 Trait 적용 판별
- 포션 공급/이벤트 분류

등에 쓰는 **internal marker**다.

그 자체가 Player에게 주는 효과 문장이 아니다.

현재 `Presentation.rows()`가 이 marker를 utility row로 바꿔
generic `그 밖의 효과` 영역에 노출한다.

### DIRECTOR PROPOSAL

- generic Item effect list에서 `potion` marker를 **완전히 숨긴다**
- 포션체질이 실제로 작동하면 최종 Stat 변화나 Proven source에서만 결과를 보여준다
- `포션`이라는 빈 effect row는 만들지 않는다

ACTION: **P0 IMPLEMENTATION/COPY BUG**

---

# 23. SALE — `이 손님에게는 지금 걸리지 않는 효과` 자체도 교체

기존 1차안의 `그 밖의 효과` 방향은 유지하되,
모든 internal marker를 제거한 뒤 실제 조건부 효과만 남긴다.

CURRENT:
> 이 손님에게는 지금 걸리지 않는 효과

PROPOSED:
> 조건부 효과

예:
- 사망 판정을 중상으로 변경
- 결과 후 남는 부상 완화
- 현재 Gate에는 대응하지 않는 Hazard Counter

현재 상황에서 정말 아무 의미가 없는 metadata는 표시하지 않는다.

ACTION: **P1 WASH + FILTER**

---

# 24. SALE — 아이템 영향이 Forecast에 안 느껴지는 문제

### DESIGN BOUNDARY

현재 Forecast / 환경 대응 / 실패 시 사망 위험은
**SALE 진입 시점 snapshot으로 고정**되는 것이 Design Truth다.

따라서 Item 판매 후 Forecast 자체를 움직이는 방식은
이번 Copy Pass에서 제안하지 않는다.

하지만 지금은:

- 위 전망은 그대로
- 아래 Stat 숫자만 변함

이라 Player가
“이 Item이 원정에 얼마나 도움 됐는지” 연결하기 어렵다.

### COPY-LEVEL SOLUTION

Item 선택 시 delta 영역 맨 위:

> **전망은 판매 전 기준 · 아래 변화는 실제 원정에 반영**

Section title:

> **판매 후 준비 변화**

Direct Stat은 가능하면 변화량을 같이 읽힌다.

예:

```text
투력 18 → 26  (+8)
강인함 21 → 29  (+8)
부식 대응 +18
```

현재 Source가 이미 계산한 before / after와 Item effect를 재표현하는 것이므로
새 Forecast / 새 확률 / 새 hidden score를 만들지 않는다.

### TUTORIAL 전망 문구도 이 방향으로 맞춤

PROPOSED:

> 전망은 판매 전 상태 기준이다. 판매 효과는 아래 변화에 반영되고, 실제 결과는 원정 후 확인한다.

ACTION: **P1 CLARIFY**

---

# 25. SALE STATUS — `부상 · 부상 1 · 피로 2`

### SOURCE CHECK

현재:

```js
parts=[n.status]
if(n.injury) parts.push('부상 '+n.injury)
if(n.fatigue) parts.push('피로 '+n.fatigue)
```

이라 `n.status === '부상'`일 때:

> 상태 부상 · 부상 1 · 피로 2

가 된다.

`injury=1`은 Player-facing 부상 횟수/단계가 아니다.
ordinary Injury 상태의 internal code다.

### PROPOSED

> 상태 **부상** · 피로 2

- numeric `부상 1` 제거
- `중상`은 기존 status 이름으로 표현
- recovery가 있는 경우에만 `휴식 N일` 유지

ACTION: **P0 UI/COPY BUG**

---

# 26. INJURY TERMINOLOGY — `생존` OUTDATED

현재 두 곳에 Player-facing old stat term이 남아 있다.

NPC Detail:
> 부상 효과: 생존 -20% · 투력 -15%

NIGHT:
> 남은 부상 · 생존 -20% · 투력 -15%

Current Stat term은 **강인함**.

Canonical injury order:

```text
투력 -15%
강인함 -20%
```

### PROPOSED

일반:

> 부상 효과 · 투력 -15% · 강인함 -20%

NIGHT:

> 남은 부상 · 투력 -15% · 강인함 -20%

악바리:

> 부상 효과 · 투력 +20% · 강인함 -20%

ACTION: **P0 OUTDATED TERMINOLOGY**

---

# 27. NIGHT RESULT — OUTCOME / CAUSE를 한 문장으로

User가 본 사망 사례:

> 적을 물리쳤다. 부식 때문에 원정 내내 고전했다.

Source상 가능한 조합이다.
전투에는 성공했지만 환경 사고 때문에 ordinary 성공이 깨지고,
그 실패 경로가 Death까지 이어질 수 있다.

즉 **mechanic contradiction은 아니다.**
하지만 Result Copy가:
- combat fact
- environment fact
- death outcome

을 따로 말해 Player가 인과를 조립해야 한다.

### DIRECTOR RULE

Night의 최상위 문장은 항상:

```text
최종 Outcome
→ 직접 원인
→ 보조 원인
```

순서로 읽혀야 한다.

### PROPOSED EXAMPLES

사망 / 전투 성공 / 부식 사고:

> 전투는 이겼지만, 부식 사고 뒤 돌아오지 못했다.

사망 / 전투 실패:

> 전투에서 밀린 뒤 돌아오지 못했다.

사망 / 전투 실패 + 부식 사고:

> 전투에서 밀린 데다 부식 사고까지 겹쳤다. 끝내 돌아오지 못했다.

부상 / 전투 성공 + 부식 사고:

> 전투는 이겼지만 돌아오는 길에 부식 피해를 입었다.

### IMPLEMENTATION DIRECTION

`nightHappened()`와 `nightWhy()`가 같은 Combat fact를 두 번 나누어 말하지 않게 한다.

특히 사망/중상/부상에서는
generic `적을 물리쳤다.` 한 줄을 별도 Why로 다시 붙이지 않는다.

ACTION: **P1 CAUSAL COPY RECOMPOSITION**

---

# 28. NIGHT — PLAYER ITEM IMPACT를 결과 최상단으로

현재 `supplyNote()`는 아래쪽 한 줄이라
내가 판 Item이 결과에 어떤 영향을 줬는지 약하다.

또 Hazard Item은:
- 실제 사고를 막았을 때
- 위험만 낮췄지만 사고는 났을 때

를 더 명확히 구분해야 한다.

### PROPOSED PLACEMENT

Night Result에서:

```text
결과
NPC
[내 보급 영향]
상황 설명
변화
대사
```

순서.

`내 보급 영향`은 **실제 sold Item contribution이 있을 때만** 나온다.

### PROPOSED COPY

Hazard prevented:

> 부식 방지 코팅제 → **부식 사고 방지**

Hazard reduction only:

> 부식 방지 코팅제 → **부식 위험 감소**

같은 Hazard 사고가 실제 발생:

> 부식 방지 코팅제 → **부식 위험은 낮췄지만 사고 발생**

Escape:

> 귀환석 → **사망 위기에서 생환**

Revive:

> 세계수 생환부적 → **사망을 중상으로 변경**

Aftercare:

> 구급키트 → **남은 부상 완화**

### RULE

`도움이 됐다`처럼 vague하게 칭찬하지 않는다.

- 판정을 실제 바꿈 → **사고 방지 / 생환 / 결과 변경**
- 확률/위험만 낮춤 → **위험 감소**
- 낮췄지만 사고 발생 → 그 사실까지 함께 명시

이렇게 해야 성공/부상 어느 결과에서도
Player가 자기 선택의 실제 기여를 과장 없이 읽을 수 있다.

ACTION: **P1 FEEDBACK PRIORITY**

---

# 29. NIGHT FLAVOR — 대사는 대사처럼 보여야 한다

현재 Night의 NPC line은 `blockquote`로만 붙고,
routine result에서는 `weighty` 조건 때문에 아예 숨겨질 수 있다.

User 피드백상 NPC 대사는 플레이 감성을 크게 만든다.

### DIRECTOR PROPOSAL

#### 살아 돌아온 NPC

- 성공 / 대성공 / 퇴각 / 부상 / 중상 / 생환 모두
- `Copy.night()`의 한 줄을 **항상 1개 표시**
- 캐릭터 쪽에 붙는 작은 말풍선 형태
- SALE처럼 자동 소멸시킬 필요는 없음
- `다음`을 누를 때까지 읽을 수 있게 유지

즉 `weighty`는 설명 블록의 크기를 결정할 수는 있어도
NPC Flavor 대사 자체를 숨기지 않는다.

#### 사망

사망 pool은 NPC가 말하는 대사가 아니라 narration이다.

따라서 말풍선 금지.

작은 상황 기록 / narration strip으로 표시:

예:
> 마지막 영수증만 카운터에 남았다.

UI label을 굳이 붙인다면:
> 기록

정도만 사용.

ACTION: **P1 COPY + PRESENTATION**

---

# 30. DIALOGUE VARIATION — POOL 확대 + 반복 방지

현재 Pool 크기:

- 방문 generic: 대부분 3~5
- Sale full / half / 150%: 각 4
- Refusal reason: 각 4
- Night outcome: 대부분 3~4

현재 `pick(pool,key)`는 hash modulo라
다른 Day/key에서도 같은 index가 다시 나올 수 있다.

따라서 “문구 수만 늘리기”만으로는 체감 반복을 완전히 막지 못한다.

### DIRECTOR TARGET

#### High-frequency

- Sale full: 8
- Sale half: 8
- Sale 150%: 8
- Refuse price / need / choice: 각 8
- Visit back / regular: 각 6+
- Night success / retreat / hurt / severe / rescued: 각 6+

#### Medium-frequency

- first / helped: 각 5+
- Trait line: 각 4~5
- death narration: 각 상태 4~5

### NO-REPEAT RULE

Gameplay RNG를 쓰지 않는다.

기존 persisted count를 ordinal로 사용해 deterministic cycle을 만든다.

예:
- 방문: visits
- 구매: purchase history count
- 거절: refusal count
- Night: records count

한 NPC가 같은 Pool을 연속 사용할 때:
- 바로 직전 문장 반복 금지
- Pool을 한 바퀴 돌기 전 같은 문장 재사용 금지

새 Copy-only RNG / Balance draw 금지.
가능하면 별도 Save schema도 만들지 않는다.

ACTION: **P1 COPY SYSTEM**

---

# 31. DIALOGUE EXPANSION — 1차 VOICE EXAMPLES

최종 전체 Pool 작성 전 Voice anchor로 사용한다.

## SALE 100%

기존:
> “이걸로 주세요.”

추가 방향:
> “이 정도면 괜찮네요.”
>
> “그걸로 하나 주세요.”
>
> “네. 이 가격이면 됐습니다.”
>
> “이건 챙겨 갈게요.”

## SALE 50%

> “이 가격이면 하나 더 생각나겠는데요.”
>
> “이렇게 받아도 되는 거예요?”
>
> “다음에도 이 가격이면 좋겠네요.”
>
> “오늘은 덕 좀 보네요.”

## SALE 150%

> “비싸긴 한데, 지금은 필요하네요.”
>
> “하… 이건 사야겠네요.”
>
> “오늘만 이 가격인 거죠?”
>
> “급한 사람이 지는 거죠, 뭐.”

## REFUSE — NEED

> “지금 가는 데엔 필요 없겠네요.”
>
> “오늘은 다른 걸 챙겨야 해서요.”
>
> “그건 이번 원정엔 안 쓸 것 같아요.”
>
> “가방 자리를 쓰긴 아깝네요.”

## NIGHT — SUCCESS

> “다녀왔습니다. 오늘은 괜찮았어요.”
>
> “준비한 만큼은 했네요.”
>
> “생각보다 수월했습니다.”
>
> “내일도 이 정도면 좋겠네요.”

이 문장들은 Voice 방향 제안이다.
전체 Pool은 User 승인 후 한 번에 정리한다.

---

# 32. CLOSING FOOTER — PLAYER FEEDBACK CONFIRM

User가 직접:

> 미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

를 불필요하게 느꼈다.

기존 1차 Director 판정과 동일하다.

### FINAL PROPOSAL

전체 삭제.

`미판매 재고는 다음 날로 이월`도
현재 Closing에서 반드시 필요한 판단이 아니므로 **기본은 넣지 않는다.**

재고가 남는다는 사실은:
- 다음 ORDER 재고
- 창고 화면

에서 충분히 확인 가능하다.

ACTION: **REMOVE**

---

# 33. REVISED CHANGE PRIORITY

## A — 즉시 Truth / Outdated Fix

1. NPC Potential / `남은 특성` 문구 제거
2. `생존 -20%` → `강인함 -20%`, 투력 → 강인함 순서
3. `상태 부상 · 부상 1` 중복 제거
4. internal `포션` marker Player UI 노출 제거
5. SLOTH `유물` → `점포지원`
6. Stamp `무료 보급` stale wording 수정
7. 점포 자본 `G` 제거
8. Help refusal ceiling Truth 정정
9. Full Data Reset destructive wording 수정
10. Decoration Premium effect wording 정정 / duplicated name 검토

## B — Player Understanding

1. SALE Fatigue 3-line rebuild
2. SALE Item impact framing: `전망은 판매 전 / 아래 변화는 실제 반영`
3. NIGHT Fatigue 하나의 정산 묶음으로
4. NIGHT Outcome + cause recomposition
5. NIGHT sold-item contribution top priority

## C — Copy Density / AI Voice

1. Help 전체 교체
2. SALE tooltip / delta labels
3. Decoration Flavor decision surface에서 제거
4. Closing accounting footer 삭제
5. Stock/Rescue modal 압축
6. Deep 중복 설명 제거
7. Store Support description 문법 통일
8. Settings dev footer 제거 / Seed 이동

## D — Play Feel / Voice

1. Living Night quote를 항상 말풍선으로 노출
2. Death는 narration strip
3. Sale / Visit / Night Pool 확대
4. deterministic no-repeat cycle
5. Trait misleading Dialogue 교정
6. Event / Item Flavor 후속 polish

---

# 34. REV 2 DIRECTOR VERDICT

이번 플레이 피드백으로 우선순위가 더 선명해졌다.

가장 큰 문제는 단순히 “문장이 AI 같다”가 아니라 세 가지다.

### 1. 오래된 Rule의 흔적

- 남은 특성
- 생존
- 무료 보급
- 유물

처럼 이미 바뀐 Design이 Copy에 남아 있다.

### 2. 내부 계산 과정을 Player에게 그대로 말함

- 보급 회복
- 보급 완화
- 밤 피로
- 조건부 marker `포션`

이 대표적이다.

Player에게 필요한 것은 계산 단계 이름이 아니라:

> 지금 상태 → 내 선택이 만든 변화 → 최종 결과

다.

### 3. 내 선택과 결과의 연결이 약함

Forecast를 숨기는 Design 자체보다,
판매 후 실제 반영되는 변화와 Night의 Proven contribution을
충분히 Player 언어로 번역하지 못한 문제가 더 크다.

따라서 v2.8 Copy Pass의 핵심은:

```text
내부 계산 설명을 줄이고
Player가 한 선택과 그 결과 사이의 문장을 강화한다.
```

이다.

이 Rev 2 역시 User 승인 전 비Canonical Proposal이다.


# 35. REV 3 — USER CORRECTIONS / SUPERSEDING DECISIONS

이 절은 §24, §27, §28의 일부를 **대체**한다.

---

## 35-1. SALE Forecast 문제 — 설명 부족이 아니라 Stat 영향량의 체감 부족

User 지적:
- 이미 화면에서 전망이 보급 전 기준임을 설명하고 있음
- Stat before/after도 이미 보임
- 문제는 `투력 +N`이 **그래서 원정에서 어느 정도 중요한 변화인지** 직관적으로 와닿지 않는 것

따라서 §24에서 제안했던
`전망은 판매 전 기준 · 아래 변화는 실제 원정에 반영`
같은 추가 설명을 기본 UI에 또 넣지 않는다.

### DIRECTOR PROPOSAL

#### A. 변화량을 절대값 + 상대값으로 읽힌다

예:

```text
투력 18 → 26   +8 · +44%
강인함 20 → 24   +4 · +20%
```

이는 새 Forecast가 아니다.
현재 이미 공개하는 Stat before/after를 더 직관적으로 표현하는 Presentation 변경이다.

#### B. Stat 상세에 “이 Stat이 어디에 쓰이는지” 한 줄만 추가

현재 stat detail modal은 출처만 보여준다.
아래 Role line을 추가한다.

- 투력: `전투 전망에 가장 크게 반영`
- 강인함: `전투 전망 · 독/부식/화염/냉기 대응`
- 기동: `전투 전망 · 속박/진창 대응 · 어둠/화이트아웃 보조`
- 정신: `전투 전망 · 공포 대응 · 어둠/화이트아웃 중심`

Hidden aggregate Power 수치나 최종 확률은 공개하지 않는다.

### WHY

Player가 필요한 것은
“Forecast가 안 바뀐다”는 설명을 한 번 더 듣는 것이 아니라

> +8이 작은 변화인지 큰 변화인지
> 이 Stat이 무엇에 먹히는지

를 빠르게 해석하는 방법이다.

ACTION: **P1 PRESENTATION / COPY**

---

## 35-2. NIGHT 사망 — Combat fact를 쪼개서 말하지 않는다

§27의:

> 전투는 이겼지만, 부식 사고 뒤 돌아오지 못했다.

도 Player mental model에는 여전히 시스템 판정 순서를 강요한다.

User는 원정 결과를:
- 전투 판정
- 환경 판정
- 사망 판정

으로 따로 조립하지 않을 수 있다.

### DIRECTOR RULE

사망 시에는 **사망을 일으킨 Player-readable cause 하나를 우선**한다.

실제 `report.cause`가 Hazard면:

> 부식 피해로 돌아오지 못했다.
> 독 피해로 돌아오지 못했다.
> 화염 피해로 돌아오지 못했다.

Supply 부족이면:

> 보급 부족으로 돌아오지 못했다.

예상치 못한 사고면:

> 원정 중 사고로 돌아오지 못했다.

Hazard/사고 cause가 없고 Combat failure가 중심이면:

> 전투에서 밀린 뒤 돌아오지 못했다.

### REMOVE

사망 결과에서 아래와 같은 분해형 문장 조합을 기본으로 쓰지 않는다.

> 적을 물리쳤다.
> 부식 때문에 고전했다.

Combat 성공 여부는 사망의 Player-facing 핵심 원인이 아닐 때 숨긴다.

ACTION: **P1 CAUSAL COPY**

---

## 35-3. NIGHT Item Impact — “위험 감소”는 Hero Feedback에서 제외

§28의:

> 부식 방지 코팅제 → 부식 위험 감소
> 부식 위험은 낮췄지만 사고 발생

은 Hero feedback에서 제거한다.

이 정보는 Player가 상품을 팔 때 이미 알고 있던 **예상 효과**다.
결과 화면에서 다시 말해도 “내 선택이 결과를 만들었다”는 보상이 약하다.

### HERO FEEDBACK에 넣는 것

Current Source가 Counterfactual contribution을 실제로 증명할 때만 강조한다.

#### Hazard prevented=true

> **부식 방지 코팅제가 부식 사고를 막았다.**

다른 Hazard도 동일 문법.

#### Return stone / escape

> **귀환석이 사망 위기에서 귀환시켰다.**

#### Revive

> **세계수 생환부적이 사망을 중상으로 바꿨다.**

#### Aftercare

> **구급키트가 원정 후 남을 부상을 없앴다.**
또는
> **구급키트가 중상을 부상까지 낮췄다.**

### HERO FEEDBACK에서 빼는 것

- 위험 감소만 한 Hazard counter
- 아무 결과도 바꾸지 않은 Item
- generic `도움이 됐다`
- Player가 판매 시 이미 알고 있던 expected effect의 재설명

Fatigue를 실제로 상쇄한 Supply는 Fatigue 정산에서 보여주고,
Hero feedback 카드로 올리지 않는다.

### 목표 감정

> “내가 맞춰 판 그 Item 때문에 이 결과가 바뀌었다.”

가 **Source가 증명할 수 있을 때만** 강하게 보여준다.

ACTION: **P1 RESULT FEEDBACK**

---

# 36. DIALOGUE SYSTEM — FULL EXPANSION PROPOSAL

Current Audit에는 active dialogue pool 자체는 포함되어 있다.
이번 Rev 3에서는 **확대 카피까지 Director가 직접 작성**한다.

## 36-1. 반복 방지 Rule

단순히 Pool만 늘리지 않는다.

### exact-string rule

Active dialogue pools 전체에서
동일 문장의 중복 등록을 금지한다.

QA에서 exact-string duplicate를 검사한다.

### per-NPC cycle rule

Gameplay RNG는 사용하지 않는다.

```text
stable NPC offset + persisted ordinal
```

로 각 Pool을 순환한다.

권장 ordinal:
- 방문: visits
- 구매: history 내 해당 가격 성공 횟수
- 거절: refusalReasons 내 해당 reason 횟수
- Night: records 수
- Trait greeting: visits

한 NPC가 같은 Pool을 쓸 때:
- 직전 문장 반복 금지
- Pool 한 바퀴 전 동일 문장 재사용 금지

Copy 전용 RNG와 별도 Balance RNG draw를 추가하지 않는다.

---

## 36-2. VISIT — PROPOSED POOLS

### first — 6

```text
“여기가 길드24 맞죠?”
“게이트 바로 앞이라 들렀어요.”
“처음 와봤습니다.”
“문 열었길래 들어왔어요.”
“보급 좀 보고 갈게요.”
“여기서 준비하고 가면 되죠?”
```

### back — 8

```text
“또 왔습니다.”
“오늘도 열었네요.”
“이번에도 좀 보고 갈게요.”
“지나가다 불 켜진 게 보여서요.”
“원정 전엔 여기부터 들르게 되네요.”
“지난번엔 잘 다녀왔어요.”
“오늘 들어온 거 좀 볼게요.”
“잠깐 챙기고 갈게요.”
```

### hurt — 6

```text
“아직 좀 욱신거리네요.”
“오늘은 무리 안 하려고요.”
“괜찮습니다. 움직일 순 있어요.”
“지난번보단 나아요.”
“오늘은 좀 조심해야겠네요.”
“다친 데가 아직 신경 쓰여요.”
```

### regular — 8

```text
“오늘도 왔습니다.”
“이제 여기부터 들르게 되네요.”
“사장님, 저 왔어요.”
“늘 문 열려 있어서 다행이네요.”
“오늘도 잘 부탁합니다.”
“이번에도 좀 챙겨 갈게요.”
“들르지 않으면 허전하더라고요.”
“이 정도면 단골 맞죠?”
```

기존:
> 늘 먹던 걸로 주세요.

는 제거한다.
단골도는 특정 상품 선호를 만들지 않는다.

### helped — 6

```text
“지난번에 챙긴 거, 제대로 도움 됐어요.”
“저번 보급, 값 했습니다.”
“그때 챙긴 게 원정에서 제대로 쓰였어요.”
“지난번에 산 거, 잘 썼습니다.”
“저번에 챙긴 거 덕 좀 봤어요.”
“지난번 보급 기억하고 왔습니다.”
```

---

## 36-3. TRAIT ARRIVAL — PROPOSED POOLS

### frugal — 5

```text
“더 싼 건 없어요?”
“이거 행사 안 해요?”
“가격부터 좀 볼게요.”
“오늘은 지출 좀 줄이려고요.”
“비싼 건 일단 빼고 볼게요.”
```

### thrifty — 5

```text
“싼 것보다 값하는 걸로요.”
“하나 챙겨도 제대로 챙겨야죠.”
“이왕 사는 거 효율 좋은 걸로 보죠.”
“쓸모 있으면 돈은 아깝지 않아요.”
“괜히 비싼 건 말고, 값어치 있는 걸로요.”
```

### coward — 5

```text
“오늘은 좀 빨리 돌아오고 싶네요.”
“이쪽, 위험한 데 맞죠?”
“살아서 오면 또 들를게요.”
“괜히 안쪽까지 갈 필요는 없잖아요.”
“오늘은 무사히 다녀오는 게 목표입니다.”
```

### liar — 5

```text
“오늘은 좀 깊게 들어가 볼까 해서요.”
“제가 그쪽은 좀 압니다.”
“어려운 데로 간다고 다들 말리던데요.”
“뭐, 어디로 가는지는 가 보면 알겠죠.”
“길 정도는 제가 알아서 찾습니다.”
```

### eater — 5

```text
“원정 끝나면 밥부터 먹어야겠어요.”
“벌써 배가 고프네요.”
“먹는 건 자신 있습니다.”
“원정만 끝나면 제대로 먹어야죠.”
“배고픈 채로 돌아오는 건 딱 질색입니다.”
```

### greed — 5

```text
“오늘은 빈손으로 돌아올 생각 없습니다.”
“안쪽까지 가면 건질 게 있겠죠.”
“이번엔 전리품 좀 제대로 챙겨와야죠.”
“위험한 만큼 건질 것도 있어야죠.”
“가방이 비어 돌아오면 손해잖아요.”
```

### shy — 5

```text
“…저, 잠깐 볼게요.”
“구경만 해도 되나요?”
“아, 아니에요. 천천히 볼게요.”
“저기… 계산은 이쪽 맞죠?”
“사람 많으면 조금 있다 올게요.”
```

### social — 5

```text
“사장님, 오늘도 바쁘시죠?”
“앞에서 다들 여기 얘기하던데요.”
“오늘 누구 왔다 갔어요?”
“요즘 게이트 앞 분위기 어때요?”
“사장님 얼굴 보니 이제 출발할 맛 나네요.”
```

### collector — 5

```text
“새로 들어온 거 있어요?”
“이런 건 잘 안 보이던데요.”
“흔한 건 이미 웬만큼 봤습니다.”
“처음 보는 물건이면 좀 보여 주세요.”
“희귀한 건 일단 눈이 가네요.”
```

### aloof — 5

```text
“필요한 것만 볼게요.”
“설명은 됐어요.”
“빨리 가야 해서요.”
“계산만 해 주세요.”
“오래 있을 생각은 없습니다.”
```

---

## 36-4. SALE ACCEPT — PROPOSED POOLS

### 100% — 8

```text
“이걸로 주세요.”
“네, 하나 주세요.”
“이 정도면 괜찮네요.”
“그걸로 하겠습니다.”
“이건 챙겨 갈게요.”
“좋습니다. 하나 주세요.”
“가격 괜찮네요.”
“이걸로 결정할게요.”
```

### 50% — 8

```text
“이 가격이면 안 살 이유가 없죠.”
“사장님, 오늘 웬일이에요?”
“이렇게 받아도 되는 거예요?”
“오늘은 덕 좀 보네요.”
“그 가격이면 바로 살게요.”
“다음에도 이러면 좋겠는데요.”
“이건 그냥 챙겨야겠네요.”
“고맙습니다. 잘 쓸게요.”
```

### 150% — 8

```text
“비싸긴 한데, 지금은 필요하네요.”
“하… 급하니까 살게요.”
“오늘만 이 가격인 거죠?”
“이번만입니다.”
“가격이 꽤 세네요.”
“원래 이 정도였나요?”
“필요한 사람이 지는 거죠, 뭐.”
“다음엔 가격 좀 내려 주세요.”
```

---

## 36-5. SALE REFUSE — PROPOSED POOLS

### price — 8

```text
“그 가격에는 못 사겠어요.”
“너무 비싸네요.”
“조금만 싸면 생각해 볼게요.”
“오늘은 그 정도까지 쓰기 어렵네요.”
“그 돈 주고는 못 사겠어요.”
“가격 보고 마음 접었습니다.”
“그 값이면 이번엔 넘길게요.”
“다음에 여유 있을 때 볼게요.”
```

### need — 8

```text
“그건 오늘 필요 없어요.”
“이번 원정엔 안 쓸 것 같아요.”
“오늘은 다른 걸 챙겨야 해서요.”
“가방 자리 쓰긴 아깝네요.”
“지금 필요한 건 그쪽이 아니에요.”
“그건 다음에 볼게요.”
“이번엔 우선순위가 아니네요.”
“오늘은 그걸 챙길 이유가 없네요.”
```

### choice — 8

```text
“이번엔 안 살게요.”
“조금 더 생각해 볼게요.”
“오늘은 여기까지 할게요.”
“음… 이번엔 됐습니다.”
“일단 다른 걸 볼게요.”
“그건 넘길게요.”
“오늘은 안 챙기겠습니다.”
“마음이 안 가네요.”
```

---

## 36-6. NIGHT LIVING — PROPOSED POOLS

### success/plain — 8

```text
“다녀왔습니다. 오늘은 괜찮았어요.”
“생각보다 수월했습니다.”
“무사히 끝냈습니다.”
“오늘은 큰일 없었어요.”
“준비한 만큼은 했네요.”
“이 정도면 잘 다녀온 편이죠.”
“문 닫기 전에 왔네요.”
“내일도 이 정도면 좋겠네요.”
```

### supplied — 6

```text
“챙겨 간 건 잘 쓰고 왔습니다.”
“가방 비워서 돌아왔네요.”
“보급은 남김없이 썼어요.”
“챙길 때는 많아 보였는데 금방 쓰더군요.”
“오늘 가져간 건 전부 제 몫을 했습니다.”
“다 쓰고 나니 가방이 가볍네요.”
```

### retreat — 8

```text
“오늘은 아니다 싶어서 돌아섰어요.”
“무리했으면 큰일 날 뻔했네요.”
“일단 살아서 돌아왔습니다.”
“안쪽은 다음에 다시 보죠.”
“더 갔다간 못 돌아올 것 같았어요.”
“오늘은 여기까지가 한계였습니다.”
“다시 준비해서 가야겠어요.”
“이번엔 물러난 게 맞았습니다.”
```

### hurt — 8

```text
“좀 다쳤지만, 돌아오긴 했습니다.”
“생각보다 안쪽이 사납더군요.”
“이 정도면 걸어서 온 게 다행이죠.”
“오늘은 좀 아프네요.”
“다음엔 같은 실수 안 할 겁니다.”
“돌아오는 길이 쉽진 않았어요.”
“한동안 욱신거리겠네요.”
“그래도 제 발로 왔습니다.”
```

### severe — 6

```text
“당분간은 못 나갈 것 같아요.”
“며칠은 꼼짝없이 쉬어야겠네요.”
“이번엔 제대로 당했습니다.”
“다음 원정은 좀 미뤄야겠어요.”
“몸부터 추스르고 다시 오겠습니다.”
“이 상태로는 한동안 무리겠네요.”
```

### avoidedDeath — 6

```text
“그거 없었으면 못 돌아왔습니다.”
“마지막 순간에 보급이 살렸어요.”
“정말 끝인 줄 알았습니다.”
“오늘 산 게 아니었으면 큰일 날 뻔했네요.”
“그걸 챙긴 게 신의 한 수였습니다.”
“살아서 여기 서 있는 이유가 있네요.”
```

### rescued — 6

```text
“마지막에 강제로 빠져나왔습니다.”
“더 버텼으면 큰일 났겠네요.”
“귀환할 수 있어서 다행입니다.”
“이번엔 보급 덕에 빠져나왔어요.”
“끝까지 갔다간 못 돌아왔겠네요.”
“오늘은 돌아온 것만으로 됐습니다.”
```

### grew — 6

```text
“조금은 익숙해진 것 같아요.”
“지난번보다 손에 붙네요.”
“이번엔 배운 게 많았습니다.”
“다음엔 더 잘할 수 있겠어요.”
“몸이 좀 따라오기 시작하네요.”
“한 번 더 가면 감이 확실히 올 것 같습니다.”
```

### shaken — 6

```text
“예상 못 한 일이 있었습니다.”
“오늘은 운이 좀 안 따랐네요.”
“가는 길이 생각보다 사나웠어요.”
“계획대로 되는 날만 있는 건 아니네요.”
“조금만 더 꼬였으면 위험했습니다.”
“오늘 일은 좀 오래 기억나겠네요.”
```

---

## 36-7. NIGHT DEATH — NARRATION POOLS

사망은 Dialogue가 아니다.
따옴표 없이 narration strip으로 표시한다.

### traded — 5

```text
마지막 영수증만 카운터에 남았다.
오늘 챙겨 간 물건은 주인 없이 돌아왔다.
마지막 거래 기록이 수첩에 남았다.
계산대 기록은 오늘에서 멈췄다.
다음 방문 기록은 생기지 않았다.
```

주의:
`물건은 주인 없이 돌아왔다`는 실제 Item 반환 mechanic을 암시할 수 있으므로
Source가 Item을 반환하지 않는 현재 Rule에서는 **사용 금지**.
따라서 실제 채택 Pool에서는 이 한 줄을 제외한다.

최종 채택 후보는 4줄.

### known — 5

```text
수첩에 남은 건 지난 원정 기록뿐이다.
다음 줄은 비어 있다.
익숙해진 이름 옆에 마지막 날짜가 남았다.
여러 번 적힌 이름이 오늘에서 멈췄다.
지난 기록들은 남았지만 다음 기록은 없다.
```

### stranger — 5

```text
문을 열고 들어온 그날이 마지막이었다.
오늘은 돌아오지 않았다.
한 번 왔다 간 손님으로 남았다.
첫 방문 기록이 마지막 기록이 됐다.
수첩에는 오늘 날짜 한 줄만 남았다.
```

---

# 37. EVENT COPY — FULL SOURCE AUDIT / PROPOSAL

Current Full Audit에는 Event 22종 목록이 이미 있다.
이번 Rev 3에서는 **전체 Event의 Reveal + Effect를 다시 감사하고 제안본까지 확정**한다.

## 37-1. UI RULE

현재 Event modal은:

```text
Flavor
Effect
```

두 문단이 연속 노출된다.

본사 반값 행사처럼 Flavor가 Effect를 애매하게 요약하면
Player가 Flavor를 Rule로 읽을 수 있다.

### PROPOSED PRESENTATION

```text
[Event Name]
Flavor 1~2줄

오늘 효과
정확한 Effect
```

- `오늘 효과`는 항상 같은 Visual label
- Flavor는 수치/조건을 대신 설명하지 않음
- Function Truth는 Effect 한 곳에서만 말함
- bard / nightshift처럼 Flavor 자체가 보상인 Event는 장문 예외 허용

---

## 37-2. 22 EVENTS — PROPOSED COPY

| Event | Proposed Flavor | Proposed Effect | Audit |
|---|---|---|---|
| 물류대란 | 본사 물류차가 평소보다 늦게 도착했다. | 오늘 모든 발주 매입가 +15% | WASH |
| 본사 1+1 행사 | 행사 스티커가 붙은 상자가 하나 섞여 왔다. | 지정 발주 상품 1종 · 1개 발주 시 2개 입고 | CLARIFY |
| 게이트 순례주간 | 순례 행렬이 게이트 구역을 가로질렀다. | 오늘 모험가 1~3명 · 다른 열린 게이트로 목적지 변경 | WASH |
| 몬스터 범람 | 게이트 밖까지 몬스터 울음소리가 번졌다. | 오늘 게이트 요구 전력 +12% · 원정 보상 +30% | KEEP/WASH |
| 포션 가격 폭등 | 포션 상자에 새 가격표가 붙었다. | 오늘 포션 매입가 +35% | KEEP |
| 한파 | 북쪽 한기가 게이트 구역까지 내려왔다. | 냉기·화염 위험이 없는 게이트 · 냉기 위험 추가 | CLARIFY |
| 포션 공급 중단 | 오늘 포션 상자가 거의 오지 않았다. | 오늘 포션 발주 등장률 대폭 감소 | WASH |
| 신입 모험가 시즌 | 길드 게시판에 처음 보는 이름이 하나 붙었다. | 오늘 신규 모험가 1명 방문 | WASH |
| 왕립 기사단 방문 | 왕립 기사단 마차가 점포 앞에 멈췄다. | 오늘 고레벨·희귀 신규 모험가 등장 기회 | KEEP |
| 암시장 상인 | 정문이 아닌 쪽에서 낯선 상자가 들어왔다. | 희귀 이상 특별 발주 +1 · 매입가 +35% | WASH |
| 본사 재고 감사 | 본사 감사관이 폐기 장부부터 펼쳤다. | 누적 폐기 6건 이상 · 총 폐기 수 ×5G 운영비 추가 · 최대 100G | TRUTH CLARIFY |
| 왕도 축제 | 왕도 축제 인파가 게이트 구역까지 번졌다. | 오늘 음식·음료 구매 의사 +20%p | KEEP |
| 길드 파업 | 길드 정문에 파업 현수막이 걸렸다. | 오늘 방문객 -1 | KEEP |
| 미확인 게이트 | 지도에 없던 게이트가 하나 열렸다. | 임시 게이트 +1 · 요구 전력 +16% · 원정 보상 +50% | CLARIFY |
| 본사 반값 행사 | 본사에서 반값 행사 공문이 내려왔다. | 오늘 첫 50% 판매 · 본사 지원 +50G | **FIX — Flavor/Function 혼동 제거** |
| 독안개 | 게이트 주변에 누런 안개가 깔렸다. | 독 위험이 없는 게이트 · 독 위험 추가 | WASH |
| 보급 상단 도착 | 보급 상단이 예정보다 일찍 도착했다. | 오늘 발주 후보 +2 | KEEP |
| 길드 급여일 | 길드 급여일 알림이 아침부터 울렸다. | 오늘 방문 모험가 구매 여력 +20% | CLARIFY |
| 치유소 휴무 | 치유소 문에 휴무 팻말이 걸렸다. | 오늘 보험 상품 구매 의사 +20%p | **FIX — 의료→보험 stale term** |
| 본사 폐기 지원 | 폐기 장부에 본사 지원 도장이 찍혔다. | 오늘 폐기 비용 0G | KEEP/WASH |
| 늙은 음유시인 | 기존 장문 Flavor 유지 | 오늘 방문객 +2 | KEEP |
| 본사 야간 근무 수칙 | 기존 괴담형 수칙 Flavor 유지 | 오늘 운영비 0G | TERM WASH |

---

## 37-3. EVENT-SPECIFIC FINDINGS

### 본사 반값 행사

CURRENT Flavor:
> 오늘 반값은 본사가 한 번 낸다.

실제 Function:
> 첫 50% 판매 시 Store에 고정 +50G

본사가 실제 할인액의 절반을 대신 내는 구조가 아니다.

따라서 Flavor가 mechanic을 비유해서 설명하면 안 된다.

FINAL PROPOSAL:
> 본사에서 반값 행사 공문이 내려왔다.

Effect:
> 오늘 첫 50% 판매 · 본사 지원 +50G

---

### 치유소 휴무

CURRENT:
> 오늘 의료 상품 구매 의사 +20%p

Current Source category는 `medical`이 퇴역했고
실제 condition은:

```js
it.category === 'insurance'
```

FINAL:
> 오늘 보험 상품 구매 의사 +20%p

ACTION: **P0 OUTDATED TERM**

---

### 길드 급여일

실제 Source는 NPC의 persistent money를 +20% 하지 않는다.
방문 당일에만 별도 `eventBudget`을 만들어 구매 가능 금액을 늘린다.

따라서:

> 소지금 +20%

로 표현하면 안 된다.

FINAL:
> 오늘 방문 모험가 구매 여력 +20%

### UI COUPLING FINDING

현재 SALE의 `소지 N G`는 persistent `n.money`만 표시한다.
급여일에는 실제 구매 가능한 금액과 화면 소지금이 달라질 수 있다.

Copy만 바꾸면 완전히 해결되지 않는다.

PROPOSED:
급여일에만:

> 소지 100G · 급여일 +20G

처럼 usable extra budget을 같이 표시.

ACTION: **P1 UI / COPY**

---

### 본사 재고 감사

CURRENT:
> 누적 폐기 6건부터 1건당 5G 감사 비용 · 최대 100G

실제:
폐기 6건 이상이면
`총 누적 폐기 수 × 5G`가 적용된다.

FINAL:
> 누적 폐기 6건 이상 · 총 폐기 수 ×5G 운영비 추가 · 최대 100G

---

### 본사 야간 근무 수칙

Effect는 실제 `expectedOperatingCost() = 0`.

기존:
> 오늘 점포 유지비 0G

다른 UI의 Player term은 `운영비`.

FINAL:
> 오늘 운영비 0G

---

# 38. REV 3 PRIORITY UPDATE

## P0 Truth / stale

추가:
- 치유소 휴무 `의료 상품` → `보험 상품`
- 본사 반값 행사 Flavor/Function 분리
- 급여일 persistent 소지금처럼 읽히지 않게 함

## P1 Player understanding

Forecast:
- pre-supply 설명 추가 X
- Stat 변화에 상대 변화율 추가
- Stat detail에 역할 한 줄

Night:
- 사망은 Hazard/보급/사고 cause 중심
- Combat win/loss를 불필요하게 분해하지 않음
- Hero Item impact는 실제 결과를 바꾼 경우만

## P1 Play Feel

- Dialogue Pool 확대안은 §36을 기준으로 작성
- exact duplicate QA
- deterministic no-repeat cycle
- 살아 있는 Night NPC line 항상 노출
- 사망 narration 분리

## P1 Event readability

- 모든 Event에 `오늘 효과` Visual label
- Flavor는 mechanic을 요약하지 않음
- 22종 Effect Truth 문법 통일

