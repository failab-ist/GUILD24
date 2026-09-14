# GUILD24 v2.7 — Core Play & Feel Revision Plan

## 0. 목표

v2.7의 목적은 콘텐츠 추가가 아니다.

현재 반복 플레이가 대체로:

> 전투 전망을 접전~우세로 맞춤  
> → Hazard 취약 제거  
> → 자원 부족 시 평범한 NPC 포기  
> → 희귀/고렙/유망 NPC 집중 투자

로 수렴하는 문제를 완화한다.

동시에 현재 SALE의 정적인 `선택 → 클릭 → 결과` 감각을 개선해, 별도 전투/제작 미니게임 없이 **상점 운영 자체가 손으로 플레이되는 느낌**을 만든다.

핵심 목표는 두 가지다.

### Decision Diversity

- 모든 좋은 결과를 동시에 얻을 수 없게 한다.
- 같은 NPC/목적지에서도 Bag 구성이 달라질 이유를 만든다.

### Physical Play Feel

- 판단 이후 별도 미니게임을 붙이는 것이 아니라,
- 판단 행위 자체를 `집기 → 담기 → 가격 → 건네기`라는 Action으로 만든다.

---

# 1. v2.7 우선 작업

## 1-A. Bag Capacity — 항상 2칸 고정

**중요도: CRITICAL**  
**작업량: LOW~MEDIUM**

모든 일반 원정에서 Bag Capacity는 항상 2칸으로 고정한다.

NPC Level, Growth 또는 기타 진행에 따라 Bag Slot이 증가하는 구조가 있다면 제거/대체 검토한다.

### 이유

후반 성장으로 슬롯이 늘어나면:

- 전투
- Hazard
- 피로/보급
- 기타 목적

을 동시에 해결할 수 있게 되어 오히려 후반 Decision이 사라진다.

NPC 성장은:

> 더 많은 물건을 들 수 있음

보다

> 같은 2칸으로 더 다양한 선택이 가능해짐

으로 체감되어야 한다.

### 2.7에서 해야 할 것

- 현재 Slot 증가 경로 전수 Audit
- 항상 2칸으로 통일했을 때 기존 효과/성장요소 영향 확인
- 삭제되는 Slot 증가 효과가 있다면 별도 재배치 필요 여부만 보고

---

## 1-B. Fatigue를 실제 제3의 준비축으로 강화

**중요도: CRITICAL**  
**작업량: MEDIUM**

현재 구조의 핵심 문제는 사실상:

`전투 + Hazard`

두 문제를 2칸 Bag으로 해결한다는 점이다.

Fatigue를 실제 위협으로 만들면:

`전투 / Hazard / 장기 컨디션`

세 가지 요구에 2칸만 사용할 수 있게 된다.

### 목표 체감

예:

NPC 상태:
- 전투 전망 접전
- 냉기 취약
- 피로 8

가능한 선택:

**전투 + 냉기**  
→ 오늘 원정 성과 우선, 피로 누적 감수

**냉기 + Food/Drink**  
→ 생환/장기 컨디션 우선, 전투 성과 포기

**전투 + Food/Drink**  
→ 냉기 위험 감수

즉 Food/Drink가 단순 보너스가 아니라:

> “오늘 성과를 위해 이 NPC의 다음 상태를 희생할 것인가?”

라는 선택이 되어야 한다.

### 2.7에서 해야 할 것

먼저 v2.6 정상 구현 결과를 측정한 뒤 조정한다.

현재 후보인:

- success/great +2
- retreat +3
- injury +4

는 **상향 후보일 뿐 아직 확정하지 않는다.**

목표는 특정 숫자가 아니라:

- 정상 반복 원정에서 Fatigue 10이 실제로 등장
- 계속 관리하지 않으면 20도 현실적인 위협
- Food/Drink 한 칸 사용이 의미 있는 손해/보상을 가짐

이다.

---

## 1-C. Item Role Rebalance

**중요도: CRITICAL**  
**작업량: HIGH**

새 아이템 태그 UI는 추가하지 않는다.

`화력 / 생환 / 성장` 같은 한 단어 분류를 Player-facing 정보로 추가하면 기존 Stat/Hazard 정보와 중복되고 오히려 혼란이 생길 수 있다.

대신 **실제 효과 구조를 분화**한다.

### 목표

모든 좋은 아이템이 결국:

> 성공확률 상승

으로 합쳐지지 않게 한다.

기존 상품을 중심으로 내부적으로 다음 가치가 서로 충돌하도록 재검토한다.

- 오늘 전투 성과
- Hazard 대응
- 피로/보급
- NPC 장기 성장
- NPC 경제/전리품
- 고위험 고성과

### 중요한 원칙

전체 가격을 일괄 상승시키지 않는다.

일괄 가격 상승은:

> 돈 부족 → 평범 NPC 버림 → 에이스 몰빵

을 오히려 강화할 가능성이 높다.

가격 역시 상품의 역할과 같이 본다.

### 목표 Decision

에이스에게 비싼 추가 화력을 줄 것인지,

다른 NPC를 위험 상태에서 안정 상태로 올릴 것인지,

반복 방문 NPC의 피로를 관리할 것인지가 경쟁해야 한다.

---

## 1-D. SALE Counter Handling / Action Layer

**중요도: CRITICAL**  
**작업량: MEDIUM~HIGH**

별도 미니게임을 추가하지 않는다.

SALE 자체를 Action으로 만든다.

현재:

`상품 선택 → 가격 선택 → 판매`

를 체감상:

> **집기 → Bag에 담기 → 가격 결정 → 건네기 → 수락/거절**

로 바꾼다.

게임 Rule은 최대한 그대로 유지한다.

### Mobile

Drag 필수 조작 금지.

기본은 **Tap**, Drag는 선택적 조작으로 둔다.

하단에 고정된 Counter 영역을 두고:

- Bag 2칸
- 가격 선택
- 거래 확정

을 엄지 영역에 집중한다.

상품 선택 시 Bottom Sheet 또는 상품 영역에서 Tap:

> 상품 아이콘 → Bag 슬롯으로 짧게 이동

가격 선택:

> Bag/가격표에 선택 가격 반영

거래:

> Bag을 짧게 위로 밀거나 `건네기` Tap

둘 다 지원 가능.

### 수락

- Bag이 손님 방향으로 이동
- NPC Wallet 감소
- Player Gold 증가
- 현재 존재하는 가격별 Reaction 출력

### 거절

- Bag이 다시 Player 쪽으로 돌아옴
- 기존 거절 이유/Reaction 출력

새 표정 Asset은 만들지 않는다.

기존 2D Illustration을 그대로 사용한다.

### Desktop

- Click 기본
- Drag 선택 지원
- Shelf와 Bag을 같은 화면에서 충분히 보여줌

### 핵심

Bag이 단순 정보 패널이 아니라 **SALE의 실제 조작 공간**이 된다.

---

## 1-E. 지난 원정 → 현재 판단 연결 강화

**중요도: HIGH**  
**작업량: LOW**

현재 이미 `지난 원정 / 결과 / 상세 Accordion`이 있으므로 별도 History 시스템을 만들지 않는다.

추가할 가치가 큰 것은 **지난 Bag**이다.

접힌 상태에서도 가능하면 작은 아이콘으로:

`지난 원정 · DAY 2 퇴각 · [아이템][아이템]`

상세에서는:

`지난 판매`  
`[상품 A] [상품 B]`

를 표시.

### 목적

정보량 추가 자체가 아니라:

> “지난번 이 조합으로 갔다가 이런 결과가 났다.”

를 현재 Bag 구성과 즉시 비교하게 한다.

이를 통해 동일 상품이:

`SALE → NIGHT → 다음 방문`

을 관통하게 한다.

---

## 1-F. Item Attachment — 별도 시스템 없이 강화

**중요도: HIGH**  
**작업량: LOW~MEDIUM**

상품 숙련도, 상품 경험치, 별도 애착 시스템 등은 추가하지 않는다.

상품 애착은 **같은 물건을 한 Run 안에서 반복해서 실제로 보게 만드는 것**으로 해결한다.

흐름:

`ORDER에서 구매`  
→ `재고/선반에 존재`  
→ `SALE에서 직접 Bag에 넣음`  
→ `NIGHT에서 사용/기여 확인`  
→ `지난 Bag에서 다시 확인`

### 추가 가능

NIGHT에서 Runtime이 실제 인과를 증명할 수 있는 경우에만 해당 상품을 다시 강조한다.

단순히 Bag에 있었다는 이유로:

> “이 아이템 때문에 성공했다”

라고 표현하는 것은 금지.

---

## 1-G. FINAL D-Day / Recon Narrative

**중요도: HIGH**  
**작업량: LOW~MEDIUM**

30일 전체 Run의 목적을 처음부터 명확하게 만든다.

### 권장 Timeline

**D0**
- D30 최종 원정 목표 명시
- 길드가 마왕 정보를 구하기 위한 최초 조사에 나갔다는 이벤트

**D5**
- 기존 마왕 관련 정보 이벤트

**D10**
- `FINAL까지 20일`
- 현재 조사 진행 상황 전달

**D15**
- 기존 추가 마왕 정보 이벤트

**D20**
- `FINAL까지 10일`
- Final 전투 환경을 확인하기 위한 추가 정찰대 출발

**D25**
- `FINAL까지 5일`
- **D30 Final에 실제 사용될 2개 Hazard 확정 공개**

**D30**
- 공개된 Hazard 그대로 Final 적용

### D25 Hazard 공개 목적

현재처럼 D30에서 갑자기 랜덤 Encounter를 받는 것이 아니라:

> 정보를 받음  
> → 남은 5일 동안 ORDER / Warehouse / Reroll / NPC를 이용해 준비

하도록 만든다.

Counter Item을 강제로 지급하거나 Offer에 보장하지 않는다.

**준비 자체가 플레이**여야 한다.

---

# 2. v2.7에서 우선 하지 않는 것

## 2-A. Expedition Purpose / 원정 목적

**중요도: POTENTIALLY HIGH**  
**작업량: HIGH**  
**분류: LONG-TAIL / v2.7 결과 후 판단**

아이디어 자체는 강하다.

각 방문마다 NPC가 그 원정에서 원하는 목적을 하나 가짐.

예:

- 토벌
- 채집
- 수련

NPC 고정 Personality가 아니라 **이번 Expedition Context**로 생성.

같은 NPC도 방문마다 다른 목적을 가질 수 있다.

### 단, 현재 바로 추가하지 않는 이유

새로운 Decision Axis 하나를 추가하는 기능이다.

우선:

- 2 Slot 고정
- Fatigue 실제 위협화
- Item Role 분화

만으로 현재의 전략 수렴이 충분히 깨질 가능성이 있다.

프로젝트 원칙상:

**REBALANCE / CLARIFY → 그래도 부족할 때 ADD**

순서가 맞다.

### 추가하게 된다면 반드시 지킬 원칙

원정 목적은 Combat/Survival 자체를 직접 Buff하지 않는다.

예:

`토벌 → Combat +20%`

금지.

목적은 **무엇을 성공으로 볼 것인지 / 어떤 결과 채널을 가치 있게 만들 것인지**를 바꿔야 한다.

또:

`대성공하면 모든 목적 보상도 같이 증가`

하는 구조는 피한다.

그렇게 되면 결국 다시:

> 무조건 대성공 Build

로 수렴하기 때문이다.

### 향후 검토 예

**토벌**
- 전투 성과 중심

**채집**
- Loot/NPC Wallet 중심

**수련**
- XP/Growth 중심

단, 정확한 보상 구조는 추후 별도 설계.

---

## 2-B. 매장 성장 Visual Overlay

**중요도: MEDIUM**  
**작업량: MEDIUM~HIGH / ART 포함**  
**분류: LONG-TAIL**

목표는 좋다.

D3와 D27 화면이:

> 같은 장소지만 이 Run이 오래 진행됐다는 것

을 보여주는 것.

후보:

- Relic 오브젝트
- 상품 해금 흔적
- Regular 메모
- 길드 공지
- Final 준비 흔적

하지만 현재 Core Decision 개선보다 우선순위는 낮다.

특히 AI Art Asset 관리 비용까지 생기므로 2.7 Core Scope에서는 제외하는 것이 좋다.

추후에는 전체 배경 교체보다 **작은 Overlay Asset** 우선.

---

## 2-C. 추가 NPC Dialogue / 표정 Variant

**중요도: LOW~MEDIUM**  
**작업량: HIGH 특히 Art**  
**분류: LONG-TAIL / 기본적으로 비추천**

현재 가격별 Reaction은 이미 존재한다.

대규모 추가 Dialogue는 핵심 문제를 해결하지 않는다.

표정 Variant 역시 AI 생성 2D Illustration의 일관성/제작비 문제가 커서 우선 제외.

현재 Reaction을 Counter Handling과 더 잘 연결하는 것으로 먼저 해결한다.

---

## 2-D. 상품별 Run 기록 / 통계

예:

`이번 Run 판매 8회`  
`최근 구매자 윤비노`

같은 상품 History.

**중요도: LOW**  
**작업량: LOW~MEDIUM**  
**분류: LONG-TAIL**

상품 애착이 여전히 부족하다는 실제 Playtest 결과가 있을 때만 검토한다.

현재는 B/F 구조로 먼저 해결한다.

---

# 3. v2.7 개편 후 목표 플레이 경험

현재:

> 전투 전망 올림  
> Hazard 취약 제거  
> 에이스에게 몰아줌

에서,

목표:

> **오늘 성과를 올릴까**  
> **Hazard를 완전히 막을까**  
> **이 NPC 컨디션을 관리할까**  
> **다른 NPC에게 자원을 나눌까**

중 일부를 포기해야 한다.

그리고 그 선택을 단순 버튼 클릭이 아니라:

> **내가 직접 상품 두 개를 골라 Bag에 넣고 손님에게 건넨다.**

라는 행위로 체감한다.

---

# 4. v2.7 작업 우선순위

| 우선 | 항목 | 중요도 | 작업량 |
|---|---|---:|---:|
| **P0** | 항상 Bag 2칸 | Critical | Low~Medium |
| **P0** | Fatigue를 실제 Decision 축으로 | Critical | Medium |
| **P0** | Item Role Rebalance | Critical | High |
| **P0** | Counter Handling / SALE Action | Critical | Medium~High |
| **P1** | D0~D30 Final / Recon / D-Day | High | Low~Medium |
| **P1** | D25 Final Hazard 2종 사전 공개 | High | Low~Medium |
| **P1** | 지난 Bag 노출 | High | Low |
| **P1** | 상품을 SALE→NIGHT→재방문까지 연결 | High | Low~Medium |
| **Later** | Expedition Purpose | Potentially High | High |
| **Later** | 매장 성장 Overlay | Medium | Medium~High |
| **Later** | 상품별 Run History | Low | Low~Medium |
| **Later** | 추가 대사/표정 Asset | Low~Medium | High |

---

# 5. v2.7에서 가장 중요한 검증 질문

v2.7이 성공했는지는 기능 개수가 아니라 아래로 판단한다.

- 같은 상황에서 합리적인 Bag 조합이 둘 이상 존재하는가?
- 고렙/희귀 NPC 몰빵이 항상 정답인가?
- Food/Drink를 Bag 한 칸에 넣는 것이 실제 고민이 되는가?
- 후반 NPC도 Bag 2칸 때문에 무엇인가 포기해야 하는가?
- D25 Final Hazard 공개 후 남은 5일의 발주/비축 전략이 달라지는가?
- SALE이 단순 카드 클릭이 아니라 실제 물건을 거래하는 느낌이 나는가?

이 질문들이 살아나면 **Expedition Purpose는 굳이 추가할 필요가 없다.**

반대로 2.7 이후에도 결국:

`전투 + Hazard` 또는 `에이스 몰빵`

하나로 다시 수렴하면, 그때 **원정 목적을 다음 구조 변경 카드로 검토한다.**
