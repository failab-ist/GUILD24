# GUILD24 v2.8 COPY — DIRECTOR FULL AUDIT REV 4

- **상태**: DIRECTOR PROPOSAL / USER 미승인 / 비Canonical
- **Current copy inventory**: `V2_8_COPY_FULL_AUDIT.md`
- **검토 Source**: P1 live-playtest hotfix가 반영된 current `main`
- **목적**: 현재 Player-facing Copy 전체를 Truth / Freshness / 필요성 / Placement / Scan / Voice 기준으로 다시 감사하고, v2.8에 올릴 수정 방향과 제안 Copy를 정리한다.
- **주의**: 이 문서는 Design Proposal이다. Production Source / Canonical은 User 승인 전 변경하지 않는다.

---

# 1. 감사 기준

모든 문구는 아래 순서로 판정한다.

## 1. TRUTH

문장이 실제 Source의 아래를 정확히 설명하는가?

- 조건
- 대상
- 수치
- 발동 시점
- 지속 범위
- Run 간 유지 여부
- 구매 의사 / 원정 성능 / 방문 확률 / 결과 변경의 구분

Flavor도 mechanic을 발명하면 안 된다.

## 2. FRESHNESS

현재 사라졌거나 이름이 바뀐 시스템을 말하지 않는가?

예:
- `유물` → 현재 Player term `점포지원`
- `생존` → 현재 Core Stat `강인함`
- 퇴역한 `무료 보급`
- 퇴역한 Trait/성장 공개 구조
- hard-coded 구버전 표기

Outdated는 FIX 또는 REMOVE.

## 3. DECISION VALUE

이 문구가 지금 이 화면에서 Player 판단을 바꾸는가?

- 판단에 필요 → KEEP
- 파괴적/복구 행동 안전성에 필요 → KEEP
- UI가 이미 말함 → REMOVE
- Lore만 추가하고 Decision Surface를 늘림 → MOVE 또는 REMOVE

문장이 좋은지보다 **여기 있어야 하는지**를 먼저 본다.

## 4. PLACEMENT / DUPLICATION

같은 Truth를 같은 Flow에서 반복하지 않는다.

- ORDER 판단 → ORDER 결정 전
- SALE 판단 → 판매 결정 전
- Outcome cause → NIGHT
- Lore / Flavor → Codex / Reveal
- Reset 위험 → Reset confirm

## 5. SCAN

System Copy는 기본적으로:

```text
조건 · 효과 · 예외
```

를 우선한다.

줄인다:
- 현재 / 해당 / 실제 / 적용 / 확인 / 선택의 반복
- ~합니다 / ~됩니다 / ~할 수 있습니다의 연속
- 한 문단에 Rule 3개 이상
- UI에 이미 보이는 값을 다시 설명
- 내부 계산 단계명을 Player에게 노출

Tutorial만 1~2문장을 허용하고 한 Step에 한 가지 읽는 법만 가르친다.

## 6. VOICE

- **System / Rule**: 짧고 정확
- **GUILD24 / HQ**: 건조한 공지 / 장부 / 표지판
- **NPC**: 사람 말투. UI 대신 전략을 설명하지 않음
- **Flavor**: 세계감. Rule을 대신하지 않음
- **Save / Error**: 세계관보다 정확성과 복구 행동 우선

---

# 2. v2.8 Copy 방향 — LOCK CANDIDATE

이번 Pass의 중심 방향은:

> **설명을 더 친절하게 늘리는 것이 아니라, 내부 계산 용어는 줄이고 Player의 선택 → 실제 변화 → 결과 연결을 더 강하게 보여준다.**

따라서 우선순위는:

```text
Truth 오류 수정
→ Outdated 제거
→ 필요 없는 문구 제거
→ Decision Surface 중복 제거
→ 필요한 Rule만 짧게
→ 선택이 실제 결과를 바꾼 순간은 강하게
→ Flavor는 Function보다 아래 위계
```

---

# 3. 대사 노출량 기준 — Pool 크기를 Run 길이에 맞춘다

## Source 구조

Ordinary SALE은 DAY 1~29.
기본 방문객은 하루 3~6명, 평균 4.5명.

따라서 Modifier가 없다고 가정한 Full Run의 기본 방문량:

```text
29일 × 평균 4.5명
≈ 130.5 방문
```

최소/최대 base roll만 보면:

```text
87 ~ 174 방문
```

현재 anti-farm harness의 engaged policy 평균 도달일은 약 DAY 16.7~19.8이므로,
일반적인 중간 종료 Run에서도 대략:

```text
75 ~ 90명 수준의 방문 기회
```

가 생긴다.

## 한 방문이 만드는 대사

보통 한 방문에서:

1. 도착 대사 1
2. 판매 수락/거절 반응 1~여러 번
3. NIGHT 대사/기록 1

이 발생한다.

Bag은 2칸이므로 성공 판매만 해도 한 손님당 최대 2회 반응이 가능하고,
거절 후 다른 제안을 시도하면 더 늘 수 있다.

따라서 설계 부하를:

### Typical engaged Run
약 **225~360 dialogue beats**

### Full Run
약 **390~520 dialogue beats + refusal retry**

정도로 본다.

이는 실제 평균 대사 수 통계가 아니라
현재 Visitor / Bag 구조에 기반한 **Pool sizing용 보수적 설계량**이다.

## 결론

기존 3~5개 Pool은 너무 작다.

High-frequency Pool은 16~20개 이상,
중간 빈도는 8~12개,
Trait처럼 분산되는 Pool은 6개 이상을 기본으로 한다.

---

# 4. Dialogue Cooldown Rule

User 결정:
- Global 전체 Run에서 한 문장을 다시 못 쓰게 하는 강한 Ban은 필요 없음.
- 대신 가까운 시점의 반복은 막는다.

## DIRECTOR PROPOSAL

세 Surface를 따로 본다.

- ARRIVAL
- SALE
- NIGHT

각 Surface에서:

```text
동일 exact line
→ 최근 3개 visible dialogue beat 안에서는 재선택 금지
```

추가:
- 같은 NPC가 같은 Pool에서 바로 직전 사용한 문장 재사용 금지
- 전체 Run 재사용 자체는 허용
- Gameplay RNG draw 추가 금지
- Save/Load 후 문장이 바뀌면 안 됨

구현은 기존 persisted ordinal을 최대한 재사용하고,
정말 필요할 때만 최소 Copy cooldown state를 둔다.

---

# 5. Flavor / Function 시각 위계

Flavor가 Function과 같은 크기/색/강조로 보이면
Player는 Flavor를 Rule로 읽는다.

## Global hierarchy

### Function / Effect
- 14~15px
- 600
- normal
- 높은 대비
- 수치/조건은 여기만

### Secondary factual
- 13px
- 400
- dim
- 예외/부가 상태

### Flavor — Decision Surface에 남겨야 할 때만
- **12~13px**
- 400
- Function보다 낮은 대비
- italic 허용
- 최대 1~2줄 권장
- 수치/조건 금지

### Lore / Codex Flavor
- 13px
- 400
- dim
- italic 허용
- Decision Surface보다 긴 문장 허용

### NPC Dialogue
- 14~15px
- 400
- 말풍선
- Flavor text hierarchy와 별개

### Death Narration
- 13~14px
- 400
- dim
- 따옴표/말풍선 금지

## 현재 위계 문제

### Event modal

현재:
- Flavor 15px
- Effect 14px

즉 **Flavor가 기능보다 큼**.

수정:
- Flavor 13px / 400 / dim
- `오늘 효과` label 11~12px
- Effect 15px / 600 / primary

### Morning Event Slip

현재 Flavor/Effect 모두 13px 수준.

수정:
- Flavor 12px
- Effect 13px / 600

### Decoration

점포 관리에서는 Flavor 자체를 REMOVE.
Decision Surface에서 이름 / 효과 / 가격 / 장착 상태만 남긴다.

### Codex Item Flavor

현재 `.unlock .tale` 13px / italic / dim은 위계가 맞다.
KEEP.

### Boss D5

D5 Flavor는 Rule 아래의 장식 문구가 아니라
보스 정체성을 보여주는 해당 Reveal의 Primary content다.
따라서 일반 Flavor 축소 Rule을 기계적으로 적용하지 않는다.

---

# 6. NON-COPY DESIGN FINDING — SALE Stat 영향 체감

User 확인:

- 전망이 보급 전 기준이라는 설명은 이미 있음.
- 판매 후 Stat before/after도 이미 보임.
- 문제는 `투력 +8`이 그래서 **전망에 얼마나 중요한 변화인지** 감이 안 오는 것.

## 이번 Copy Pass에서 하지 않는 것

- `전망은 판매 전 기준` 설명 추가 반복 금지
- 상대 변화량 `+44%` 추가 금지
- 문장을 더 붙여 해결하려 하지 않음

## 판정

**COPY로 해결하기 어려운 UX/DESIGN ISSUE.**

Stat 상세에 각 Stat의 역할 설명을 넣는 것은 보조적으로 가능하지만,
그것만으로 “전망에 얼마나 도움인가”는 해결되지 않는다.

따라서 별도 v2.8 UX Design Finding으로 분리한다.

이번 Copy Audit에서는 더 확정하지 않는다.

---

# 7. P0 — Source Truth / Outdated

## 7-1. NPC 상세의 성장 잠재력 / 남은 특성

CURRENT:
> 더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.

Trusted 상태:
> 성장 잠재력: 빠른 성장 / 꾸준한 성장 / 착실한 성장

문제:
- v2.7에서 Level milestone Trait 획득 제거
- `남은 특성`은 stale
- Potential은 내부 성장 계산에는 존재하지만 현재 Player-facing 성장 identity가 아님
- 단골도가 Potential을 높이거나 Trait을 해금하지 않음

REMOVE:
- 위 두 Potential 관련 문구 전체

단골도 숫자/방문 횟수는 유지.

### 단골도의 실제 역할

Source 기준:
- 구매 수락 확률
- 재방문 가중치
- 일부 점포지원 조건
- Trusted Regular 판정
- LUST Final 조건

에 쓰인다.

“방문도에만 영향”은 아니다.

---

## 7-2. 부상 상태 중복

CURRENT:
> 상태 부상 · 부상 1 · 피로 2

`injury=1`은 Player-facing 단계가 아니라 internal state.

PROPOSED:
> 상태 부상 · 피로 2

`중상`도 숫자 없이 상태명으로만 표시.

---

## 7-3. `생존` stale term

CURRENT:
> 부상 효과: 생존 -20% · 투력 -15%

CURRENT NIGHT:
> 남은 부상 · 생존 -20% · 투력 -15%

PROPOSED:
> 부상 효과 · 투력 -15% · 강인함 -20%

NIGHT:
> 남은 부상 · 투력 -15% · 강인함 -20%

악바리:
> 부상 효과 · 투력 +20% · 강인함 -20%

현재 Core Stat 표시 순서에 맞춰 투력 → 강인함.

---

## 7-4. `포션` internal marker 노출

CURRENT Item effect:
> 이 손님에게는 지금 걸리지 않는 효과
> 포션

Source에서 `potion:1`은 포션체질/이벤트 판별용 marker다.
그 자체가 Player effect가 아니다.

FIX:
- generic effect list에서 `potion` 완전 제외
- 포션체질이 실제 작동하면 최종 Stat/Proven contribution에서만 보여줌

---

## 7-5. SLOTH `유물`

CURRENT:
> 유물을 받는 대신 봉인 하나를 풀 수 있다.

PROPOSED:
> 점포지원을 받는 대신 봉인 하나를 풀 수 있다.

---

## 7-6. 단골 스탬프 기계의 `무료 보급`

CURRENT:
> 유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.

Ordinary 무료 판매 방식은 퇴역.

PROPOSED:
> 판매로 얻는 단골도 +50% · 생환 보너스 제외

---

## 7-7. 점포 자본에 G

CURRENT:
> 점포 자본 {N}G

점포 자본은 Gold가 아니다.

PROPOSED:
> 점포 자본 {N}

---

## 7-8. Help 거절 Rule

CURRENT:
> 같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.

실제 Source:
거절 시 같은 SKU의 그 가격과 더 비싼 가격이 닫힌다.

PROPOSED:
> 거절된 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

---

## 7-9. Full Data Reset

현재 `폐업 결재`는 Run abandon처럼 읽힌다.

실제:
Account / Meta / Tutorial / Codex 포함 browser save 전체 삭제.

PROPOSED:

Button:
> 모든 데이터 초기화

Title:
> 모든 데이터 초기화

Body:
> 현재 영업과 본사 기록을 포함한 이 브라우저의 GUILD24 저장을 전부 지운다. 되돌릴 수 없다. 남기려면 먼저 저장을 내보낸다.

Actions:
> 저장 내보내기 / 취소 / 전부 지우기

Success:
> 게임 데이터를 초기화했습니다.

---

## 7-10. 장식 프리미엄 쇼케이스

CURRENT:
> 희귀한 모험가가 더 자주 찾아온다

실제:
신규 NPC 생성 희귀도 분포가 좋아진다.
기존 희귀 NPC 재방문 가중치를 올리지 않는다.

PROPOSED:
> 새로 만나는 모험가의 희귀도 증가

---

## 7-11. 같은 이름의 프리미엄 쇼케이스

현재:
- 점포지원 `프리미엄 쇼케이스`
- 장식 `프리미엄 쇼케이스`

효과는 완전히 다름.

PROPOSED:
- 장식명 KEEP
- 점포지원 → `희귀상품 쇼케이스`

User 승인 필요.

---

# 8. START / PRE-RUN

## KEEP

- `오늘도 문을 연다.`
- 시작 자금 / 창고 / 30일
- 이번 영업 장식
- 현재 지점 포기
- 본사 기록 유지 경계

## REMOVE / MOVE

### Seed

`재현용 Seed 지정`은 QA utility.

일반 Player pre-Run에서는 제거하고 Debug/internal로 MOVE.

### 장식 없음 설명

CURRENT:
> 아직 보유한 장식이 없습니다. 영업을 마치면 점포 자본이 쌓입니다.

PROPOSED:
> 보유 장식 없음

점포 자본 설명은 Run end / 점포 관리에서 충분.

---

# 9. TUTORIAL

Hotfix 후 대부분 KEEP.

## WASH

### 심층원정

CURRENT:
> 같은 게이트의 더 깊은 원정이다. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 더 성장한다. 점포 매출에는 영향이 없다.

PROPOSED:
> 같은 게이트의 더 깊은 원정. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 성장한다. 점포 매출은 없다.

### 보급

CURRENT:
> 필요 보급을 못 채우면 원정 준비에 공통 페널티가 걸려 투력·강인함·기동·정신이 낮아진다. 남는 보급은 현재 피로와 이번 원정에서 쌓일 피로를 줄인다.

PROPOSED:
> 필요 보급이 모자라면 투력·강인함·기동·정신이 모두 낮아진다. 남는 보급은 피로를 줄인다.

### 진열대

PROPOSED:
> 고른 상품은 오늘 원정에서 한 번 쓰고 사라진다. 다음 원정으로 가져가지 않는다.

## Forecast Tutorial

새 설명 추가 금지.
현재 pre-supply/frozen truth만 유지.

Stat 영향 체감은 §6 별도 UX Finding.

---

# 10. MORNING / ORDER

## KEEP

- 방문 예정
- Gate / Hazard
- 보유 Gold
- 발주 금액 / 발주 후
- 재고 / 공급 / 유통기한
- 후보 교환
- 발주 확정
- 영업 시작

장부형 Label은 현재 톤과 맞다.

## Special Guild Action

CURRENT:
> 원하지 않으면 선택하지 않아도 됩니다. 오늘 영업 준비가 끝나면 기회가 지나갑니다.

첫 문장은 UI상 Optional이라 중복.

PROPOSED:
> 오늘 영업 준비가 끝나면 기회 종료.

---

# 11. SALE

## 11-1. Forecast prose

CURRENT:
> 오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다. 게이트 안에서 어떻게 될지까지는 아무도 모른다.

REMOVE.

Forecast label/tooltip/Tutorial이 이미 역할을 한다.

---

## 11-2. Tooltip wash

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

---

## 11-3. Item delta labels

CURRENT → PROPOSED:

| Current | Proposed |
|---|---|
| 보급 후 변화 | 판매 시 변화 |
| 이 상품이 직접 | 상품 효과 |
| 보급이 상태에 미치는 영향 | 보급 변화 |
| 이 손님에게는 지금 걸리지 않는 효과 | 조건부 효과 |
| 이 손님의 준비는 달라지지 않는다 | 현재 준비 변화 없음 |

단:
- internal marker는 조건부 효과에도 넣지 않음
- 실제 조건부 Function만 표시

---

## 11-4. FIFO 반복 설명

CURRENT:
> 가장 먼저 폐기될 재고부터 나간다

Player가 Stack을 선택할 수 없다.
매 Item마다 반복할 필요 없음.

REMOVE.

유통기한만 표시:
> 유통기한 없음
또는
> 폐기까지 N일

---

# 12. FATIGUE — SALE

현재 예:

```text
피로 1 → 출발 0 · 보급 회복 -1
남은 보급 5 · 결과 피로를 그만큼 줄인다
밤 피로 · 성공 0 · 퇴각 0 · 부상 1
```

문제:
Player가 내부 계산 단계명을 다시 해석해야 한다.

## Source truth

```text
현재 피로
→ 남는 보급으로 출발 전 피로 감소
→ 더 남은 보급이 Outcome 피로 상쇄
→ 귀환 후 최종 피로
```

## PROPOSED

```text
출발 피로 0 · 현재 1 / 보급 -1
남는 보급 5 · 귀환 피로 최대 5 감소
귀환 후 피로 · 성공 0 / 퇴각 0 / 부상 1
```

UI가 너무 길면:

```text
출발 피로 0 · 보급 -1
귀환 후 피로 · 성공 0 / 퇴각 0 / 부상 1
```

REMOVE term:
- 밤 피로
- 보급 회복
- 보급 완화

USE:
- 출발 피로
- 남는 보급
- 귀환 후 피로

---

# 13. NIGHT — Result / Cause / Player Impact

## 13-1. 사망 Cause

User mental model에 내부 판정 순서를 강요하지 않는다.

사망 시 Combat win/loss를 불필요하게 분해하지 않는다.

Hazard cause:
> 부식 피해로 돌아오지 못했다.
> 독 피해로 돌아오지 못했다.
> 화염 피해로 돌아오지 못했다.

Supply cause:
> 보급 부족으로 돌아오지 못했다.

Accident:
> 원정 중 사고로 돌아오지 못했다.

Hazard/사고 cause가 없고 Combat failure가 핵심이면:
> 전투에서 밀린 뒤 돌아오지 못했다.

REMOVE 조합:
> 적을 물리쳤다. 부식 때문에 원정 내내 고전했다.

---

## 13-2. Player Item Hero Feedback

Player가 판매할 때 이미 알고 있던 “위험 감소”는 Night Hero feedback에서 반복하지 않는다.

**실제로 결과를 바꾼 것이 증명될 때만** 강조.

### Hazard prevented

> 부식 방지 코팅제가 부식 사고를 막았다.

### Return Stone

> 귀환석이 사망 위기에서 귀환시켰다.

### Revive

> 세계수 생환부적이 사망을 중상으로 바꿨다.

### Aftercare

> 구급키트가 원정 후 남을 부상을 없앴다.

또는:
> 구급키트가 중상을 부상까지 낮췄다.

## Hero에서 제외

- 단순 위험 감소
- 아무 Outcome도 바꾸지 않은 Item
- `도움이 됐다` 같은 vague praise
- 판매 시 이미 알고 있던 일반 effect 재설명

Fatigue 상쇄는 Fatigue 정산에서만 보여준다.

---

## 13-3. NIGHT quote selector 구조 문제

현재 `Copy.night()`는:
- growth
- carried Item
- environment hurt
- retreat

순서 때문에
퇴각했는데 Item을 들고 있으면 `supplied` 문장이 먼저 선택될 수 있다.

Outcome보다 “아이템을 들고 갔다”가 대사를 결정하는 것은 잘못된 위계.

### PROPOSED priority

1. 사망 narration
2. avoidedDeath / rescued
3. 중상
4. 부상
5. 퇴각
6. 대성공
7. 성공 + 의미 있는 성장
8. 일반 성공

`supplied`는 Primary quote selector에서 제거.
Item 기여는 §13-2의 Proven result feedback으로 별도 표시.

`shaken`도 Outcome을 덮지 않는다.

---

## 13-4. Night Flavor Presentation

### Living

성공 / 대성공 / 퇴각 / 부상 / 중상 / 생환 모두
NPC line 1개를 항상 표시.

- 작은 말풍선
- 다음을 누를 때까지 유지
- routine result라고 숨기지 않음

### Death

사망 Pool은 Dialogue가 아니라 narration.

- 말풍선 금지
- 따옴표 금지
- 작은 `기록` strip 또는 narration area

---

# 14. NIGHT — Fatigue

현재:
- 보급 회복
- 보급 완화
- 원정 결과
- 최종 피로

를 따로 보여준다.

한 묶음으로 합친다.

예:

```text
귀환 후 피로 1
현재 1 · 출발 전 -1 · 부상 +6 · 보급 -5
```

또는:

```text
피로 1 → 1
출발 전 보급 -1 · 부상 +6 · 남는 보급 -5
```

내부 단계명 대신
**언제 / 왜 변했는지**만 보여준다.

---

# 15. CLOSING

## KEEP

- 매출
- 판매 원가
- 판매 마진
- 운영비
- 폐기 원가
- 발주 교환
- 본사 지원·수당
- 영업 손익
- 발주 지출
- 점포지원 투자
- 재고 정리
- 보유 자금

## REMOVE

CURRENT:
> 미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

전체 삭제.

`미판매 재고는 다음 날로 이월` 대체문도 기본 화면에는 넣지 않는다.

---

# 16. HELP / 점주 가이드

현재 가장 큰 AI 설명투 Surface.

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

## REMOVE FROM HELP

- 기본 방문객 3~6 재설명
- Gate 수 증가 장문
- 모든 Trait 공개 설명
- “마감에서 거래와 보급의 작용을 확인”
- Bankruptcy 중복 문단

---

# 17. STOCK / RESCUE

CURRENT 장문을 줄인다.

PROPOSED:

> 적자 마감에만 정리 가능 · 매입가의 50% 회수
> 잔고가 0G가 되면 종료 · 회생 {used}/{limit}

Item row가 유통기한을 이미 표시하므로
유통기한 정의를 Modal 상단에서 반복하지 않는다.

---

# 18. SETTINGS / SAVE

## WASH

CURRENT:
> 자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.

PROPOSED:
> 자동저장은 이 브라우저에 남는다. 다른 기기로 옮기려면 저장 파일을 내보낸다.

CURRENT:
> 게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.

PROPOSED:
> 실시간 제한 없음 · 첫 실행 소리 꺼짐

## LOCALIZE

- Sound On → 소리 켜기
- Sound Off → 소리 끄기
- Full Data Reset → 모든 데이터 초기화

## REMOVE

> 버전 0.4 · 로컬 실행 지원 · 외부 연결 없음

hard-coded stale / Production value 낮음.

---

# 19. DECORATION

## Decision Surface

점포 관리에서는:
- 이름
- 효과
- 가격
- 보유/적용 상태

만 남긴다.

Flavor `d.text`는 렌더하지 않는다.

## REMOVE

> 비워 둘 수 있습니다.

상태/버튼이 이미 말한다.

## Header

영업 밖:
설명 없음.

영업 중:
> 이번 영업의 장식은 고정됨.

## Effects

- 새벽배송 안내판: `발주 후보 +1` KEEP
- 길드 제휴 현판: `매일 아침 방문객 +1 · 10%`
- 알뜰 금고: `영업 시작 자금 +300G` KEEP
- 프리미엄 쇼케이스: `새로 만나는 모험가의 희귀도 증가`

---

# 20. STORE SUPPORT — Effect 문법

Flavor 추가 금지.
구매 판단 Truth만 짧게.

핵심 Fix:

- 단골 스탬프 기계:
  > 판매로 얻는 단골도 +50% · 생환 보너스 제외

- 점포지원 프리미엄 쇼케이스:
  > 희귀 이상 발주 가중치 +70% · 다음 날 운영비 +10G

명칭 변경 Proposal:
> 희귀상품 쇼케이스

나머지 30종은 `V2_8_COPY_FULL_AUDIT.md`의 Source inventory 기준으로
조건 · 효과 · 예외 문법으로 압축한다.

Rule 수치/조건은 삭제하지 않는다.

---

# 21. EVENT — 22종 전체 재감사

## Presentation

현재 Event Reveal에서 Flavor가 Effect보다 크게 보이는 구조를 수정.

### Proposed hierarchy

```text
Event Name

Flavor — 13px / dim

오늘 효과 — 11~12px label
정확한 Effect — 15px / 600
```

Flavor가 Function을 요약하거나 비유해서 설명하지 않는다.

## Event proposals

| Event | Flavor | 오늘 효과 | 판정 |
|---|---|---|---|
| 물류대란 | 본사 물류차가 평소보다 늦게 도착했다. | 오늘 모든 발주 매입가 +15% | WASH |
| 본사 1+1 행사 | 행사 스티커가 붙은 상자가 하나 섞여 왔다. | 지정 발주 상품 1종 · 1개 발주 시 2개 입고 | CLARIFY |
| 게이트 순례주간 | 순례 행렬이 게이트 구역을 가로질렀다. | 오늘 모험가 1~3명 · 다른 열린 게이트로 목적지 변경 | WASH |
| 몬스터 범람 | 게이트 밖까지 몬스터 울음소리가 번졌다. | 오늘 게이트 요구 전력 +12% · 원정 보상 +30% | WASH |
| 포션 가격 폭등 | 포션 상자에 새 가격표가 붙었다. | 오늘 포션 매입가 +35% | KEEP |
| 한파 | 북쪽 한기가 게이트 구역까지 내려왔다. | 냉기·화염 위험이 없는 게이트 · 냉기 위험 추가 | CLARIFY |
| 포션 공급 중단 | 오늘 포션 상자가 거의 오지 않았다. | 오늘 포션 발주 등장률 대폭 감소 | WASH |
| 신입 모험가 시즌 | 길드 게시판에 처음 보는 이름이 하나 붙었다. | 오늘 신규 모험가 1명 방문 | WASH |
| 왕립 기사단 방문 | 왕립 기사단 마차가 점포 앞에 멈췄다. | 오늘 신규 모험가 1명 방문 · 레벨/희귀도 상향 | **FIX** |
| 암시장 상인 | 정문이 아닌 쪽에서 낯선 상자가 들어왔다. | 희귀 이상 특별 발주 +1 · 매입가 +35% | WASH |
| 본사 재고 감사 | 본사 감사관이 폐기 장부부터 펼쳤다. | 누적 폐기 6건 이상 · 총 폐기 수 ×5G 운영비 추가 · 최대 100G | **FIX** |
| 왕도 축제 | 왕도 축제 인파가 게이트 구역까지 번졌다. | 오늘 음식·음료 구매 의사 +20%p | KEEP |
| 길드 파업 | 길드 정문에 파업 현수막이 걸렸다. | 오늘 방문객 -1 | KEEP |
| 미확인 게이트 | 지도에 없던 게이트가 하나 열렸다. | 임시 게이트 +1 · 요구 전력 +16% · 원정 보상 +50% | CLARIFY |
| 본사 반값 행사 | 본사에서 반값 행사 공문이 내려왔다. | 오늘 첫 50% 판매 · 본사 지원 +50G | **FIX** |
| 독안개 | 게이트 주변에 누런 안개가 깔렸다. | 독 위험이 없는 게이트 · 독 위험 추가 | WASH |
| 보급 상단 도착 | 보급 상단이 예정보다 일찍 도착했다. | 오늘 발주 후보 +2 | KEEP |
| 길드 급여일 | 길드 급여일 알림이 아침부터 울렸다. | 오늘 방문 모험가 구매 여력 +20% | CLARIFY |
| 치유소 휴무 | 치유소 문에 휴무 팻말이 걸렸다. | 오늘 보험 상품 구매 의사 +20%p | **FIX** |
| 본사 폐기 지원 | 폐기 장부에 본사 지원 도장이 찍혔다. | 오늘 폐기 비용 0G | KEEP |
| 늙은 음유시인 | 기존 장문 Flavor 유지 | 오늘 방문객 +2 | KEEP |
| 본사 야간 근무 수칙 | 기존 괴담형 Flavor 유지 | 오늘 운영비 0G | TERM FIX |

## Event-specific Truth

### 본사 반값 행사

CURRENT Flavor:
> 오늘 반값은 본사가 한 번 낸다.

실제는 할인액 대납이 아니라 첫 50% 판매 시 Store +50G.

Flavor:
> 본사에서 반값 행사 공문이 내려왔다.

Effect:
> 오늘 첫 50% 판매 · 본사 지원 +50G

### 왕립 기사단 방문

현재 Source는 royal rarity weight를 올리지만
희귀 이상을 보장하지 않는다.

따라서:
> 희귀 신규 모험가

같은 보장형 문구 금지.

Use:
> 신규 모험가 1명 방문 · 레벨/희귀도 상향

### 치유소 휴무

`medical` category는 stale.
실제 Source는 `insurance`.

Use:
> 오늘 보험 상품 구매 의사 +20%p

### 길드 급여일

persistent 소지금을 20% 올리는 기능이 아니다.
방문 당일 additional eventBudget.

Use:
> 오늘 방문 모험가 구매 여력 +20%

추가 UI Finding:
SALE의 `소지 N G`와 실제 usable budget이 다를 수 있으므로
급여일에는:
> 소지 100G · 급여일 +20G
같이 표시하는 안을 별도 UX Fix로 검토.

### 본사 재고 감사

실제:
폐기 6건 이상이면 **총 누적 폐기 수 ×5G**.

Use:
> 누적 폐기 6건 이상 · 총 폐기 수 ×5G 운영비 추가 · 최대 100G

---

# 22. BOSS / DEEP

## Boss

KEEP:
- D5 identity Flavor
- PRIDE / ENVY / GREED / GLUTTONY / LUST mechanic disclosure
- D25 Final reveal

FIX:
- SLOTH 유물 → 점포지원

## Deep — Morning

PROPOSED:

> 길드 심층원정
> {게이트명}
> 같은 게이트 · 위험 동일 · 요구 전투력 상승
> 손님 1명 후원 가능 · 점포 매출 없음

## Deep — SALE

> 성공 시 해당 손님 성장·소지금 증가
> 후원금 반환 없음 · 점포 매출 없음

Button:
> 심층원정 추천 · 후원금 {N}G

REMOVE:
- 추천하지 않아도 된다
- 원하지 않으면...
- 동일 sink 설명의 중복

---

# 23. ITEM FLAVOR

전체 40종 재확인.

## Verdict

Wholesale rewrite 불필요.

대부분:
- 짧음
- mechanic을 직접 약속하지 않음
- Codex에서만 주로 노출
- 현재 13px tale 위계가 적절

따라서 KEEP.

### 주의 후보

`에너지드링크 — 오늘 쓸 기운을 당겨왔다.`

미래 피로 debt를 실제 mechanic처럼 읽을 가능성이 있으나
직접적인 수치/조건을 약속하지 않아 P2 Tone 후보로만 둔다.

귀환석처럼 실제 기능 문구가 중요한 Item은
Flavor보다 Truth가 우선.

---

# 24. TRAIT

Trait Effect는 Presentation data로 생성되므로
설명문을 더 붙이지 않는다.

P0:
- 겁쟁이 / 대식가 / 탐욕 Dialogue의 잘못된 구매 선호 암시 제거

P2:
- `~됩니다` 식 explicit note는 장부식으로 압축 가능
- liar / grit 등은 Truth 유지가 우선

---

# 25. META / CODEX

## KEEP

- 본사 기록
- 직업 숙련
- 마왕 토벌
- 발견 수첩
- 진행도 / 상품 / 직업 / 점포지원 / 몬스터 지식 / 점포 관리

## FIX

- 점포 자본 G 제거
- NPC Potential / 남은 특성 제거

## MONSTER KNOWLEDGE

CURRENT:
> 보급 생환 N회

기능은 “Item을 들고 생환한 expedition”을 누적한다.

더 자연스럽게:
> 생환 기록 N회

단, 보급 필요 조건을 명시해야 한다면:
> 보급 생환 기록 N회

P2 WASH.

---

# 26. ERROR / SAVE / UTILITY

정확성과 복구 행동이 우선.

KEEP:
- 발주 자금 부족
- 창고 가득 참
- 손님 소지금 부족
- 영업 중 장식 변경 불가
- 저장 import/export 실패

Flavor를 추가하지 않는다.

---

# 27. DORMANT COPY

예:
- run.notice
- regionReport
- 일부 generic install notice

현재 Player Surface에서 consumer가 없거나 약함.

이번 Pass에서 문장 polish보다:
1. 실제 consumer 0 확인
2. dead면 Source cleanup
3. 재사용 시 Truth 재작성

DEFER.

---

# 28. DIALOGUE POOL TARGET

Run당 노출량 기준으로 다음 목표를 둔다.

## Arrival

- first: 8
- back: 16
- hurt: 10
- regular: 12
- helped: 8
- Trait arrival 10종: 각 6

## SALE

- 100% accept: 20
- 50% accept: 20
- 150% accept: 20
- refuse price: 12
- refuse need: 12
- refuse choice: 12

## NIGHT

- success: 16
- great success: 10
- retreat: 12
- hurt: 12
- severe: 8
- avoided death / life-saving: 8
- rescued return: 8
- success+growth: 10

## Death narration

- traded: 6
- known: 6
- stranger: 6

`supplied`는 Primary quote Pool에서 제거한다.

---

# 29. DIALOGUE COPY PACK — VOICE ANCHOR

아래는 확대 Pool의 기준 Copy다.
Implementation 때 WORK가 새 문장을 임의 창작하지 않는다.
필요 수량은 DIRECTOR가 이 Voice로 채운다.

## Arrival — back 예시

> “또 왔습니다.”
>
> “오늘도 열었네요.”
>
> “이번에도 좀 보고 갈게요.”
>
> “지나가다 불 켜진 게 보여서요.”
>
> “원정 전엔 여기부터 들르게 되네요.”
>
> “오늘 들어온 거 좀 볼게요.”
>
> “잠깐 챙기고 갈게요.”
>
> “이번에도 여기부터 들렀습니다.”

## Regular 예시

> “오늘도 왔습니다.”
>
> “사장님, 저 왔어요.”
>
> “늘 문 열려 있어서 다행이네요.”
>
> “오늘도 잘 부탁합니다.”
>
> “이번에도 좀 볼게요.”
>
> “들르지 않으면 허전하더라고요.”
>
> “이 정도면 단골 맞죠?”
>
> “오늘도 먼저 여기부터 왔습니다.”

REMOVE:
> 늘 먹던 걸로 주세요.

특정 상품 선호 mechanic을 만들기 때문.

## Coward

> “오늘은 좀 빨리 돌아오고 싶네요.”
>
> “이쪽, 위험한 데 맞죠?”
>
> “살아서 오면 또 들를게요.”
>
> “괜히 안쪽까지 갈 필요는 없잖아요.”
>
> “오늘은 무사히 다녀오는 게 목표입니다.”
>
> “위험하면 바로 돌아설 겁니다.”

## Eater

> “원정 끝나면 밥부터 먹어야겠어요.”
>
> “벌써 배가 고프네요.”
>
> “먹는 건 자신 있습니다.”
>
> “원정만 끝나면 제대로 먹어야죠.”
>
> “배고픈 채로 돌아오는 건 딱 질색입니다.”
>
> “끝나고 뭐 먹을지부터 생각나네요.”

현재 판매 음식 구매 의사를 약속하지 않는다.

## Greed

> “오늘은 빈손으로 돌아올 생각 없습니다.”
>
> “안쪽까지 가면 건질 게 있겠죠.”
>
> “이번엔 전리품 좀 제대로 챙겨와야죠.”
>
> “위험한 만큼 건질 것도 있어야죠.”
>
> “가방이 비어 돌아오면 손해잖아요.”
>
> “갈 거면 뭐라도 들고 나와야죠.”

고가/희귀 상품 구매 선호를 암시하지 않는다.

## SALE 100% — Voice examples

> “이걸로 주세요.”
>
> “네, 하나 주세요.”
>
> “이 정도면 괜찮네요.”
>
> “그걸로 하겠습니다.”
>
> “이건 챙겨 갈게요.”
>
> “좋습니다. 하나 주세요.”
>
> “가격 괜찮네요.”
>
> “이걸로 결정할게요.”

20개까지 같은 톤으로 확장.

## SALE 50%

> “이 가격이면 안 살 이유가 없죠.”
>
> “사장님, 오늘 웬일이에요?”
>
> “이렇게 받아도 되는 거예요?”
>
> “오늘은 덕 좀 보네요.”
>
> “그 가격이면 바로 살게요.”
>
> “다음에도 이러면 좋겠는데요.”
>
> “이건 그냥 챙겨야겠네요.”
>
> “고맙습니다. 잘 쓸게요.”

20개까지 확장.

## SALE 150%

> “비싸긴 한데, 지금은 필요하네요.”
>
> “하… 급하니까 살게요.”
>
> “오늘만 이 가격인 거죠?”
>
> “이번만입니다.”
>
> “가격이 꽤 세네요.”
>
> “원래 이 정도였나요?”
>
> “필요한 사람이 지는 거죠, 뭐.”
>
> “다음엔 가격 좀 내려 주세요.”

20개까지 확장.

## Refuse — price

> “그 가격에는 못 사겠어요.”
>
> “너무 비싸네요.”
>
> “조금만 싸면 생각해 볼게요.”
>
> “오늘은 그 정도까지 쓰기 어렵네요.”
>
> “그 돈 주고는 못 사겠어요.”
>
> “가격 보고 마음 접었습니다.”

12개까지 확장.

## Refuse — need

> “그건 오늘 필요 없어요.”
>
> “이번 원정엔 안 쓸 것 같아요.”
>
> “오늘은 다른 걸 챙겨야 해서요.”
>
> “가방 자리 쓰긴 아깝네요.”
>
> “지금 필요한 건 그쪽이 아니에요.”
>
> “그건 다음에 볼게요.”

12개까지 확장.

## Night — success

> “다녀왔습니다. 오늘은 괜찮았어요.”
>
> “생각보다 수월했습니다.”
>
> “무사히 끝냈습니다.”
>
> “오늘은 큰일 없었어요.”
>
> “준비한 만큼은 했네요.”
>
> “이 정도면 잘 다녀온 편이죠.”
>
> “문 닫기 전에 왔네요.”
>
> “내일도 이 정도면 좋겠네요.”

16개까지 확장.

## Night — retreat

> “오늘은 아니다 싶어서 돌아섰어요.”
>
> “무리했으면 큰일 날 뻔했네요.”
>
> “일단 살아서 돌아왔습니다.”
>
> “안쪽은 다음에 다시 보죠.”
>
> “더 갔다간 못 돌아올 것 같았어요.”
>
> “오늘은 여기까지가 한계였습니다.”

12개까지 확장.

## Night — hurt

> “좀 다쳤지만, 돌아오긴 했습니다.”
>
> “생각보다 안쪽이 사납더군요.”
>
> “오늘은 좀 아프네요.”
>
> “돌아오는 길이 쉽진 않았어요.”
>
> “한동안 욱신거리겠네요.”
>
> “그래도 제 발로 왔습니다.”

12개까지 확장.

## Death narration

사망은 따옴표 없음.

예:
> 마지막 영수증만 카운터에 남았다.
>
> 마지막 거래 기록이 수첩에 남았다.
>
> 계산대 기록은 오늘에서 멈췄다.
>
> 다음 방문 기록은 생기지 않았다.

금지:
> 오늘 챙겨 간 물건은 주인 없이 돌아왔다.

현재 Item 반환 mechanic을 암시하기 때문.

---

# 30. 1차 IMPLEMENTATION BATCH 제안

User 승인 후:

## Batch A — Truth / stale

- Potential / 남은 특성 제거
- 부상 1 제거
- 생존 → 강인함
- potion marker 제거
- SLOTH 유물 → 점포지원
- stamp 무료 보급 수정
- 점포 자본 G 제거
- Help refusal Truth
- Full Data Reset
- Event stale / misleading terms
- Premium Showcase wording

## Batch B — 이해 / 인과

- Fatigue SALE/NIGHT 문법
- Night cause recomposition
- Item Hero feedback
- Night quote selector priority
- Living speech / death narration presentation

## Batch C — Density / Voice

- Help
- SALE labels/tooltips
- Closing footer
- Stock rescue
- Decoration Flavor 제거
- Deep 중복
- Store Support 30종
- Settings footer / Seed move

## Batch D — Dialogue

- Pool target까지 Copy 확장
- recent-3 surface cooldown
- Night outcome-first selector
- no new Gameplay RNG draw

---

# 31. FINAL DIRECTOR VERDICT

전체 재감사 후 가장 큰 문제는 네 종류다.

## 1. Stale Design residue

- 남은 특성
- 생존
- 유물
- 무료 보급
- 의료 상품

## 2. 내부 계산 단계가 Player 언어로 노출됨

- 밤 피로
- 보급 회복
- 보급 완화
- potion marker

## 3. 내 선택이 결과를 바꾼 순간이 약하게 보임

Hazard Counter를 팔았다는 사실 자체가 아니라,
**그 Item이 실제 사고/사망/부상을 바꿨을 때** 강하게 보여줘야 한다.

## 4. Flavor와 Function의 위계가 섞임

특히 Event modal은 Flavor가 Effect보다 더 큰 상태라
Rule 오독 가능성이 있다.

v2.8 Copy Pass는 새 설명을 더하는 작업이 아니라:

```text
덜 설명하고
더 정확하게 말하고
선택이 실제 결과를 바꾼 순간만 더 강하게 말한다.
```

로 정리한다.
