# EVENT

DOC=EVENT
OWNER=event,daily_event,event_catalog,event_hazard,event_purchase_budget,event_order_source
DOC_VERSION=2.9.12
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.13
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## NON-NEGOTIABLE

EVENT는 매일 랜덤한 일을 보여주기 위한 시스템이 아니다.
평소의 발주 · 재고 · 가격 · NPC · Item · Gate · Hazard · 원정 판단을 가끔 다른 각도에서 보게 만드는 **Day Modifier**다.

EVENT가 너무 자주 발생해 플레이어가

> 내가 운영한다.

보다

> 오늘 RNG가 뭘 던질까.

라고 느끼면 실패다.

Event를 위해 새 Gameplay System을 만들지 않는다. 기존 Morning · Order Offer · Visitor · NPC · Wallet · Purchase Intent ·
Gate · Hazard · Waste · Closing · Relic 시스템을 재사용한다.

Canonical Event 55종은 모두 **자동 적용형 Day Event**다. Event 선택지를 만들지 않는다.

---

## EVENT TIMING / FREQUENCY

### Normal Event가 발생하지 않는 날

Normal Daily Event는 D0 · D1 · D2 · D5 · D10 · D15 · D20 · D25 · D30, 그리고 실제 `심층원정` 발생일
(D7 / D14 / D21 / D28 중 해당 Run에 배정된 날)에 발생하지 않는다.

- D5 / D10 / D15 / D20 / D25는 Relic Window Day이므로 Event를 겹치지 않는다.
- D30은 Final Day다. Boss reveal은 Normal Event가 아니며 `BOSS_v2.8.0.md`가 소유한다.

### Eligible Day

D3–D29 중 Relic Window Day가 아니며, 해당 Run의 실제 심층원정 발생일도 아닌 날.
22일에서 심층원정 발생일 2–3일을 제외한 **19–20일**.

### 발생 확률

```text
dailyEventChance = 40%
```

목표 평균:

```text
19–20 × 0.40 ≈ 7.6–8.0 Events / Run
```

실제 분포는 전체 런 밸런스 측정에서 측정한다. 측정 결과를 이유로 `dailyEventChance`를 자동으로 바꾸지 않는다
(심층원정 제외를 보상하려고 올리지도 않는다). 이후 확률 재조정은 승인이 필요하다.

### Deep Expedition Day exclusion

If Deep Expedition is scheduled to occur today:
**Normal Daily Event does not occur that Day, regardless of whether the Player later nominates an NPC.**
Deep Expedition is not a Normal Daily Event and is not selected from the Event catalog.

For D7 / D14 / D21 / D28:
1. read this Run's persisted Deep Expedition schedule
2. if Deep Expedition is active today: skip Normal Event roll; do not select/apply Normal Event
3. otherwise: use ordinary EVENT eligibility / 40% roll

On Deep Expedition Days there is no Normal Event Focused Reveal; the Deep notice / first-use Tutorial may be the special
Morning beat under `UI_UX_v2.8.0.md`.

Because Normal Event is suppressed, Event-added 한파/독안개 cannot coexist with Deep Expedition on the same Day.
No special Event-Hazard merge rule is added.

---

## EVENT SELECTION

하루에 Event는 최대 1개다. Event를 Stack하지 않는다.

1. 오늘 Gate / Roster / 누적 상태 등 필요한 Day State를 준비한다.
2. 오늘 조건상 발생할 수 없는 Event를 Pool에서 제외한다.
3. Event Eligible Day라면 40% 발생 Roll을 한다.
4. 성공 시 Eligible Pool에서 Weight 기반으로 1종을 선택한다. **이번 Run에 이미 나온 Event는 Pool에서 빠진다**
   (한 Run에 같은 Event는 한 번만. 발생 기록은 Run에 저장된다).
5. 선택된 Event 하나만 적용한다.
6. Event가 있다면 Event Reveal을 먼저 보여준다.
7. 이후 Morning Situation을 보여준다.

### Selection Weight

```text
일반 Event:            weight = 1.0
Rare Easter Egg Event: weight = 0.35
```

Rare Easter Egg(21. 늙은 음유시인 · 22. 본사 야간 근무 수칙)는 일반 Event보다 확실히 드물게 나온다.
Easter Egg가 한 Run에 하나도 나오지 않아도 정상이다.

---

## MORNING EVENT REVEAL

별도의 EVENT Phase를 만들지 않는다. Event는 **MORNING의 Opening Beat**다.

```text
DAY START
↓
Event 판정 / 적용
↓
Event가 있으면 Focused Reveal
↓
Morning Situation
↓
Order
↓
Sale
```

Event가 없으면 Focused Reveal 없이 Morning Situation으로 간다.

### Event를 Gate 정보보다 먼저 보여준다

Event가 발생한 날에는 플레이어가 Gate Detail을 읽기 전에 Event Reveal을 먼저 본다.
Event는 오늘의 Gate / Hazard / Order / Visitor / Price 판단을 바꾸는 조건이기 때문이다.

Event가 적용된 뒤 Morning은 최종 상태의 열린 Gate · Known Hazard · 방문 예상 · 기타 오늘 상황을 보여준다.

---

## EVENT PRESENTATION

Event는 일반 정보 Card 사이에 묻지 않는다. 발생 시 Focused Overlay · Modal · 중앙 Highlight 등 현재 UI 구조에 맞는
**Focused Reveal**로 보여준다. 새 Phase는 만들지 않는다.

기본 구성:

```text
EVENT TITLE

짧은 상황 / Flavor

오늘 실제 Effect

[오늘 상황 보기]
```

Effect는 Flavor에 묻히지 않는다. Event Reveal 이후에는 같은 긴 설명을 반복하지 않는다.

---

## PHASE PERSISTENCE

모든 Phase에서 Event 설명문 전체를 반복하지 않는다.

### MORNING

Event 전체 Reveal 후, Morning Situation에서 Event가 반영된 최종 상태를 보여준다.

### ORDER

발주 판단에 직접 영향을 주는 Event Effect만 Compact하게 유지한다 (예: 매입가 +15% · 포션 공급 감소 · Event Hazard).

### SALE

Sale에 영향을 주는 Effect만 Compact하게 유지한다 (예: 방문객 Modifier · 구매 의사 Modifier · 임시 Wallet Modifier · 첫 반값 지원).

### NIGHT

원정 결과에 Event가 실제 영향을 줬다면 Causality에 필요할 때만 표시한다.
`게이트 순례 주간`은 예외적으로 실제 변경 인원 N과 affected NPC의 예상->실제 목적지를 Night에서 공개한다.
새 Result Phase를 만들지 않고 기존 Night presentation을 재사용한다.

### CLOSING

Gold / Waste / Overhead 등에 직접 영향을 준 Event만 표시한다.

---

## EVENT INFORMATION RULE

Event Effect는 플레이어가 오늘의 판단을 바꿀 수 있을 만큼 명확하게 공개한다. 숨은 Material Effect를 만들지 않는다.
숫자로 직접 보여줄 수 있는 것은 숫자로 보여준다.

GOOD:

```text
오늘 매입가 +15%
오늘 방문객 +2
오늘 첫 50% 판매 본사 지원 +50G
```

Formula나 내부 확률 계산식까지 노출할 필요는 없다. 구매 성향처럼 정확한 내부 Formula를 공개할 필요가 없는 경우

```text
오늘 Food / Drink 구매 의사 증가
```

처럼 Function을 명확하게 표현할 수 있다.

Flavor never implies a different mechanic.

Voice / Flavor 작성 기준 → `COPY_WORLD_VOICE_v2.8.0.md`

## NO FALSE ATTRIBUTION

Probability/weight Events do not claim that a particular random result happened because of them
unless the runtime has deterministic proof.

Deterministic count/budget/special-slot changes may expose their source.

---

## EVENT DURATION

기본 Event Modifier는 발생한 **당일만** 적용하고 다음 날 제거된다.

예외: Event를 통해 기존 NPC 시스템 안에서 실제 NPC가 새로 합류한 경우, 그 NPC는 이후 NPC Canonical Rule에 따라
Run에 남을 수 있다. Event 자체의 Day Modifier는 다음 날 제거된다.

---

## EVENT-ADDED HAZARD

Event로 새로운 Hazard를 추가하는 Event는 딱 2종(1. 한파 · 2. 독안개)이다. 추가 Hazard Event를 더 만들지 않는다.

Event Hazard는 기존 Hazard System을 재사용한다. 새 Event 전용 Hazard Formula를 만들지 않는다.

### Event로 공개된 Hazard는 Known Hazard다

Event Reveal에서 플레이어에게 명시적으로 공개된 Hazard는 Dungeon Knowledge / Discovery 수준과 관계없이 즉시 Known Hazard다.

```text
Known Hazards
=
기존 Knowledge / Analysis로 알려진 Hazard
+
명시적으로 공개된 Event Hazard
```

다음 기존 시스템은 Event Hazard를 반드시 인식해야 한다: Morning Hazard 표시 · Hazard Forecast · Known Hazard 기반
Order 처리 · 원정 위험 게시판 · 원정 전문 인증 · 기존 Counter coverage / pity logic · 기타 Known Hazard 참조 로직.

Event가 공개한 Hazard가 Monster Knowledge 부족 때문에 Known 목록에서 누락되어서는 안 된다.
Event Hazard를 `hazards` 배열 끝에 추가한 뒤 기존 Knowledge 기반 `slice()`에 의해 잘려 나가는 동작은 Implementation Bug다.

새 Discovery System을 만들지 않는다. 기존 Known Hazard 계산에 공개 Event Hazard를 포함하는 최소 수정만 한다.

### Event Hazard는 Counter Item을 자동 지급하지 않는다

Event Hazard가 공개되었다고 해서 해당 Counter Item을 별도로 강제 출현시키지 않는다.
기본 점포에서는 적절한 Counter Item이 당일 Order Offer에 나오지 않을 수 있다.

플레이어는 미리 준비한 재고 · Direct Counter · Hybrid Counter · NPC Stats · 다른 보급품 · Hazard 관련 Relic ·
실제로 발주에 나온 Item · 위험을 감수하는 선택을 조합해 판단한다.

Event가

```text
문제 발생
→ 정답 Item 자동 지급
```

구조가 되어서는 안 된다.

---

## EVENT HAZARD ELIGIBILITY

Event Hazard 적용 여부는 Family 이름을 하드코딩하지 않고 **현재 Gate가 실제로 가진 Hazard**를 기준으로 판단한다.
Family가 늘어나도 이 규칙은 유지된다.

### 한파

```text
addHazard = cold
```

Gate Eligibility:

```text
if gate.hazards contains cold:
    EXCLUDE

if gate.hazards contains fire:
    EXCLUDE

otherwise:
    cold 추가 가능
```

즉 이미 추위가 있는 Field(Cold를 중복 적용하지 않는다)와 불 / 용암 환경의 Field(한파가 동시에 들어가 세계관 개연성을
깨지 않는다)에는 적용하지 않는다.

오늘 열린 Gate 중 하나라도 적용 가능 Gate가 있으면 한파 Event는 Eligible하다. Event 발생 시 적용 가능한 Gate에만
Cold를 추가한다. 오늘 열린 Gate가 전부 제외 대상이면 한파는 오늘 Event Pool에서 제외한다.

### 독안개

```text
addHazard = poison
```

Gate Eligibility:

```text
if gate.hazards contains poison:
    EXCLUDE

otherwise:
    poison 추가 가능
```

Poison이 이미 있는 Field에는 중복 적용하지 않는다. Fire · Cold · Darkness · Fear · 기타 Hazard와 Poison이 함께
존재하는 것은 허용한다. 독거미 계열은 기본 Poison Hazard가 있으므로 자동 제외된다.

오늘 열린 Gate 중 하나라도 적용 가능 Gate가 있으면 독안개 Event는 Eligible하다. Event 발생 시 적용 가능한 Gate에만
Poison을 추가한다. 오늘 열린 Gate가 전부 Poison을 가지고 있다면 독안개는 오늘 Event Pool에서 제외한다.

---

## CANONICAL EVENT CATALOG

총 55종.
eventCatalogStatus=FROZEN

Work는 임의로 Event를 추가하거나 Effect / Trigger / Role을 재설계하지 않는다.

모든 Event는 한 Run에 한 번(§EVENT SELECTION), 당일만(§EVENT DURATION) 적용된다.
WEIGHT는 따로 적지 않으면 1.0이다(§Selection Weight).

Exact player-facing title/reveal copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §13-N (N = Event 번호).

### 01. 물류대란

TYPE: Order / Pressure

EFFECT:

```text
오늘 모든 상품 매입가 +15%
```

발주 후보 수는 줄이지 않는다.

DESIGN INTENT: 선택지를 없애는 것이 아니라 비싼 상황에서 무엇을 살지 판단하게 만든다.

### 02. 본사 1+1 행사

TYPE: Order / Opportunity

EFFECT: 오늘 발주 후보 중 행사 상품 1종을 지정한다. 해당 상품을 발주하면 주문한 수량만큼 추가 입고된다.
추가 입고분의 매입 비용은 0G다.

행사 상품은 그날 첫 발주 후보에서만 지정한다. 발주 교환을 하면 행사가 끝나고, 새 후보에는 1+1이 없다.

행사 대상 Item은 Order에서 명확하게 표시한다: 그 발주 행의 `매입` 가격표 모서리에 빨간 `1+1` 딱지
(모양 -> `UI_UX_v2.8.0.md` §ORDER — ITEM INFORMATION HIERARCHY).

### 03. 게이트 순례 주간

TYPE: Destination / Uncertainty + Preparation

ELIGIBILITY:
- today has >=2 open Gates
- expected visitor count >=3

If either condition fails, exclude this Event from today's eligible pool.

EFFECT:
- internally roll affectedCount uniformly from 1,2,3
- select that many visiting NPCs using seeded Run RNG
- each selected NPC keeps the expected/reported destination shown to the Player
- each selected NPC's actual destination changes to a different currently open Gate
- do not reveal affectedCount, affected NPC identity, or changed destination during Morning/Order/Sale
- no auto-best-fit routing; the replacement Gate is random among other eligible open Gates
- this Event does not alter Trait, Wallet, Loyalty, purchase preference, or Living NPC Cap

NIGHT RESULT:
- Night displays `게이트 순례 주간 · 실제 변경 N명`
- each affected NPC result identifies `예상 목적지 -> 실제 목적지`
- unaffected NPCs do not need extra Event copy
- this uses the existing Night result presentation; no separate Event-result phase/screen

DESIGN INTENT:
The Player knows the day's uncertainty range before preparation, but only learns who actually wandered and where after
the expedition. This creates value for Hybrid/flexible preparation without turning destination information into
arbitrary hidden punishment.

### 04. 몬스터 범람

TYPE: Dungeon / RiskReward

EFFECT: 오늘 일반 Gate의 위험 증가 + 원정 보상 증가. 위험만 올리고 보상을 그대로 두지 않는다.

For every ordinary Gate active that Day:

    Gate required Power ×1.12
    expedition reward multiplier ×1.30

It does not add a new Hazard.

### 05. 포션 가격 폭등

TYPE: Order / Pressure

Effect:
```text
current-day Potion buy price +35%
```

Rules:
- applies through the normal current-day Order buy-price modifier path
- targets `Potion` category only
- does not target `Special`
- does not target Field Gear / Insurance
- does not create a new magic-item category

Player에게 정의되지 않은 숨은 `마법 상품` 분류는 사용하지 않는다.

### 06. 한파

TYPE: Dungeon / Hazard

EFFECT: 적용 가능한 오늘 Gate에

```text
cold Hazard 추가
```

EXCLUDE: 이미 cold가 있는 Gate · fire가 있는 Gate (→ §EVENT HAZARD ELIGIBILITY).

추가된 Cold는 즉시 Known Hazard다. Counter Item 별도 보장은 없다.

### 07. 포션 공급 중단

TYPE: Order / Pressure

EFFECT: 오늘 Potion Line의 Order Offer 등장 가능성이 크게 감소한다. Potion Line은 `ITEM_v2.8.0.md` 정의를 따른다.
완전 출현 금지는 아니다.

For Potion Items during today's ordinary ORDER Item selection:

    Potion offer selection weight ×0.08

This is a weight reduction, not a fixed displayed appearance probability.
Other Item categories are unchanged.

### 08. 신입 모험가 시즌

TYPE: NPC / Roster

EFFECT:

If Living NPC Cap has room:
- generate exactly one new ordinary adventurer for the Day
- that newcomer is guaranteed to occupy one of today's already-existing visitor slots
- total visitor count does not increase because of this Event
- the Event does not create a special Level/Rarity band
- if no legal newcomer can be generated because the Living NPC Cap is full, the Event is not eligible
- if the Day has no existing visitor slot to give (every other adventurer dead or on recovery days that morning), the
  newcomer is that Day's only visitor — the one case the Event adds a visitor, on a Day that would otherwise have none
  (the same rule for 왕립 기사단 방문)

The guaranteed newcomer replaces one ordinary selected visitor when necessary.

NPC Roster Rule을 그대로 따른다. 금지: Living NPC Cap 무시 · 강제 Roster Overflow · 기존 단골 Revisit 강제 삭제.

### 09. 왕립 기사단 방문

TYPE: NPC / Rare Opportunity

EFFECT:

If Living NPC Cap has room:
- generate exactly one new royal-profile adventurer
- that newcomer is guaranteed to occupy one of today's already-existing visitor slots
- total visitor count does not increase because of this Event

Royal-profile generation:

    ordinary Day-based spawn Level +3

Rarity distribution:

| Rarity | Weight |
|---|---:|
| Common | 40 |
| Uncommon | 36 |
| Rare | 17 |
| Epic | 6 |
| Legendary | 1 |

Use the ordinary unlocked-Job pool, Traits, Potential and all other normal NPC-generation rules
unless this section explicitly overrides them.

If no legal newcomer can be generated because the Living NPC Cap is full, the Event is not eligible.

기존 NPC Roster Rule을 그대로 따른다. Rare Newcomer는 허용하지만 장기 투자 Regular를 평균적으로 항상 압도해서는 안 된다.

### 10. 암시장 상인

TYPE: Order / Opportunity + Cost

EFFECT:
- exactly one special Rare+ Order offer
- that offer buy price +35%
- the special offer is an Event-origin slot, not a global Rare weighting
- a Reroll keeps the one special slot and draws its Item again

The Order row must be able to identify its source as 암시장.
This is permitted existing special-offer presentation, not a new generic rarity-attribution UI.

새 Shop Mode를 만들지 않는다. 기존 Order Offer List에서 처리한다.

### 11. 본사 재고 감사

TYPE: Conditional / Economy Pressure

ELIGIBILITY:

```text
누적 폐기 >= 6
```

(cumulative Run waste count >= 6.) 조건을 만족하지 않으면 Event Pool에서 제외한다.

EFFECT: 본사 감사 비용 발생.

    auditCost
    = min(100G, cumulative Run waste count × 5G)

The audit cost is added to that Day's operating-cost charge.
It is not a separate persistent debt or second settlement.

DESIGN INTENT: 무관한 Random 벌금이 아니라 플레이어가 누적시킨 폐기에 Random Risk가 생기는 Event다.

### 12. 왕도 축제

TYPE: Sale / Opportunity

EFFECT:

For Food / Drink Items during today's ordinary SALE purchase decision:

    purchase intent +20%p

No other Item category receives this Event modifier.

기존 Purchase Intent 시스템을 재사용한다. 새 Category Bonus System을 만들지 않는다.

### 13. 길드 파업

TYPE: Customer / Pressure

EFFECT:

```text
오늘 방문객 -1
```

최소 방문객: 1. 추가 Loyalty / Growth Penalty는 없다.

### 14. 미확인 게이트

TYPE: Dungeon / RiskReward

EFFECT:

```text
오늘 고위험 · 고보상 임시 Gate 1개 추가
```

`미확인`이라는 이름 때문에 기존 Canonical이 공개하도록 한 정보를 추가로 숨기지 않는다.
Gate / Hazard 정보 공개와 NPC Destination은 일반 Canonical Rule을 따른다.

Add exactly one temporary ordinary Gate for the Day.

Family selection:
- use the currently eligible ordinary Family pool
- prefer a currently unused eligible Family when one exists
- otherwise select from the eligible pool

The temporary Gate uses the normal generated Gate as its base, then:

    required Power ×1.16
    expedition reward ×1.50

It does not create a new permanent Family/Tier/Hazard system.
The temporary Gate disappears with the Day.

### 15. 본사 반값 행사

TYPE: Sale / Opportunity

EFFECT: 오늘 첫 50% 판매 1회에

```text
본사 지원 +50G
```

사용 후 종료. 기존 50% / 100% / 150% Price Rule은 변경하지 않는다.

Mechanic:
- first successful 50% sale only
- Store receives +50G HQ support
- Player-chosen sale price remains 50%; support is separate Store income

Exact Function line:
    오늘 첫 50% 할인 판매 · 본사 지원 +50G

### 16. 독안개

TYPE: Dungeon / Hazard

EFFECT: 적용 가능한 오늘 Gate에

```text
poison Hazard 추가
```

EXCLUDE: 이미 poison이 있는 Gate. Fire / Cold 등 다른 Hazard와 함께 존재하는 것은 허용한다
(→ §EVENT HAZARD ELIGIBILITY).

추가된 Poison은 즉시 Known Hazard다. Counter Item 별도 보장은 없다.

### 17. 보급 상단 도착

TYPE: Order / Opportunity

EFFECT:

```text
오늘 발주 후보 +2
```

(today's Order candidates +2.) 기존 Order Offer 생성 시스템을 재사용한다. 새 상인 UI를 만들지 않는다.

The changed candidate count may name this Event as its source through the shared deterministic
source-attribution UI.

### 18. 길드 급여일

TYPE: Sale / Opportunity

EFFECT: 오늘 방문 NPC의 구매 가능 예산

```text
+20%
```

오늘 Sale에만 적용하는 Temporary Modifier다. NPC의 Persistent Wallet 자체를 영구 변경하지 않는다.

Mechanic:
- arriving NPC receives temporary purchase budget equal to +20% of that visit's current Wallet
- it increases affordability for the visit
- it does not permanently multiply or add to NPC Wallet
- unused Event budget does not persist as NPC Wallet

UI must distinguish Wallet from Event budget.

### 19. 치유소 휴무

TYPE: Sale / Opportunity

EFFECT: no Medical category is active (→ §CATEGORY AUDIT). Current function targets:

    Insurance purchase intent +20%p

Player-facing copy must say 보험, not 의료 상품.

왕도 축제와 동일한 기존 Purchase Intent 처리 방식을 재사용한다. 새 소비 AI를 만들지 않는다.

### 20. 본사 폐기 유예

TYPE: Inventory / Opportunity

EFFECT:

사건이 뜬 날 아침, 판매 마지막 날이 오늘인 재고(진열대 `오늘까지`, 오늘 밤 폐기될 재고 — ITEM §SHELF LIFE)만 유통기한 +1일.
그날 나중에 들어온 재고와 다른 재고는 그대로다. 유예된 재고도 늘어난 날이 지나면 평소처럼 폐기되고, 그때 폐기 수와
누적 폐기(본사 재고 감사의 조건)에 정상적으로 들어간다. 해당 재고가 없는 날에는 효과가 없다.

### 21. 늙은 음유시인

TYPE: Rare Easter Egg / Positive · WEIGHT: 0.35

EFFECT:

```text
오늘 방문객 +2
```

새 NPC를 Living NPC roster에 추가하는 Effect가 아니다. 기존 Daily Visitor Count Modifier만 사용한다.

REFERENCE RULE: Reference를 모르는 플레이어에게도

> 가게 앞에 이상한 음유시인이 나타나 사람들이 몰린 날

로 상황이 완결되어야 한다. Reference를 아는 플레이어에게만 두 번째 Joke Layer가 열린다.

금지: 전용 NPC 생성 · Dialogue Tree · Quest · 전용 Minigame · Combat · 후속 Event Chain.

### 22. 본사 야간 근무 수칙

TYPE: Rare Easter Egg / Positive · WEIGHT: 0.35

EFFECT: 오늘 Closing

```text
점포 유지비 = 0G
```

기존 Closing Overhead를 0G로 처리한다. 새 비용 항목이나 새 Economy System을 만들지 않는다.

REFERENCE RULE: Reference를 모르는 플레이어에게도

> 본사에서 이상한 야간 근무 수칙이 내려온 날

이라는 GUILD24의 기묘한 회사 문화로 성립해야 한다. 이유를 설명하지 않는다.

금지: 4번 규정의 정체 설명 · 창밖 확인 Gameplay · 뒷문 Gameplay · 창고 검사 Gameplay · Rule 준수 판정 ·
Failure State · 후속 Horror Event Chain.

Flavor와 실제 Gameplay Effect는 분리한다.

### 23. 길드 합동 위령제

TYPE: Run / Opportunity

EFFECT:

```text
이 날부터 Run 끝까지 모든 구간 사망 한도 +1
```

사망 한도 구간과 추모 방명록 -> `CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED.

발생 조건은 다른 일반 Event와 같다: 같은 Eligible Day, 같은 40% 발생 Roll, 같은 Weight 기반 선택.
따로 특별 취급하지 않는다 — 사망 여부로 Eligible을 거르지 않는다. 다른 Event처럼 한 Run에 한 번만 나온다.

### 24. 길드 의료단 순회

TYPE: Opportunity

EFFECT: 방문 순간 부상(1단계, 중상 제외)인 모험가는 부상이 풀린다. SALE 손님 상태에 한 줄로 알린다(COPY_AUDIT §13-24 보조 줄).

ELIGIBILITY: 오늘 올 수 있는 모험가 중 부상자가 있을 때만.

### 25. 길드 의무관 당직

TYPE: Opportunity

EFFECT: 오늘 밤 결과가 `부상`인 원정 최대 2회를 무사로 바꾼다(구급품 진열장과 같은 자리, 그보다 먼저 쓰인다). 사망·중상은 그대로. 밤 결과에 한 줄로 알린다.

### 26. 길드 위로금

TYPE: Opportunity

EFFECT: 방문 순간 부상인 모험가는 오늘 60G를 더 쓸 수 있다(당일 추가 예산, 급여일과 같은 채널).

ELIGIBILITY: 오늘 올 수 있는 모험가 중 부상자가 있을 때만.

### 27. 길드 특별 수당

TYPE: Opportunity

EFFECT: 오늘 방문하는 모든 모험가가 40G를 더 쓸 수 있다(당일 추가 예산).

### 28. 본사 물류 지원

TYPE: Opportunity

EFFECT: 오늘 모든 발주 매입가 ×0.85.

### 29. 보험 공동 구매

TYPE: Opportunity

EFFECT: 오늘 보험 발주 매입가 ×0.70.

### 30. 본사 원정용품 지원

TYPE: Opportunity

EFFECT: 오늘 야외장비 발주 매입가 ×0.70.

### 31. 길드 연회

TYPE: Opportunity

EFFECT: 오늘 방문한 모험가가 들고 가는 음식의 피로 회복이 2배다(음료는 그대로). SALE 준비 표시와 밤 결과가 같은 값을 읽는다.

### 32. 원정 교대 근무

TYPE: Opportunity

EFFECT: 오늘 원정 결과로 쌓이는 피로가 절반(올림)이다: 성공 +4 → +2, 퇴각 +7 → +4, 부상 +9 → +5. 중상·사망은 원래 0.

### 33. 길드 휴양일

TYPE: Opportunity

EFFECT: 방문 순간 피로 -8(0 아래로 내려가지 않음).

### 34. 단골의 날

TYPE: Opportunity

EFFECT: 오늘 오지 않기로 된 신뢰 단골 1명이 방문객에 더해진다.

ELIGIBILITY: 오늘 올 수 있는 신뢰 단골이 있을 때만.

### 35. 길드 현상금

TYPE: Opportunity

EFFECT: 오늘 원정 보상 ×1.20. 요구 전력은 그대로.

### 36. 마왕의 징조

TYPE: Pressure

EFFECT: 오늘 게이트 요구 전력 ×1.08. 보상은 그대로.

### 37. 입고 지연

TYPE: Pressure

EFFECT: 오늘 발주 후보 -2(최소 3개 유지).

### 38. 가뭄

TYPE: Pressure

EFFECT: 오늘 음료 발주 매입가 ×1.30.

### 39. 길드 세금 징수

TYPE: Pressure

EFFECT: 오늘 운영비 +50G.

### 40. 장맛비

TYPE: Pressure

EFFECT: 오늘 음식·음료 구매 의사 -15%p.

### 41. 본사 발주 제한

TYPE: Pressure

EFFECT: 오늘 한 번의 발주에서 같은 상품은 최대 2개까지(1+1 입고분은 따로 세지 않음). 막힌 수량 버튼은 이유를 알린다.

### 42. 포스기 먹통

TYPE: Pressure

EFFECT: 오늘 발주 후보 교환을 할 수 없다. 교환 버튼은 이유를 알린다.

### 43. 가격 단속

TYPE: Pressure

EFFECT: 오늘 바가지(150%) 판매를 할 수 없다. 바가지 가격 버튼은 `오늘 가격 단속`으로 닫힌다.

### 44. 퇴각로 붕괴

TYPE: Pressure

EFFECT: 오늘 원정의 전투 퇴각 확률 -10%p(귀환석의 두 번째 굴림은 그대로). 결과 증명도 같은 값을 읽는다.

### 45. 길드 소집령

TYPE: Pressure

EFFECT: 오늘 올 수 있는 모험가 중 레벨이 가장 높은 1명이 오지 않는다. 방문객 수는 나머지에서 그대로 뽑는다.

ELIGIBILITY: 오늘 올 수 있는 모험가가 2명 이상일 때만.

### 46. 냉장고 고장

TYPE: Pressure

EFFECT: 오늘 아침 음식·음료 재고의 유통기한 -1일. 오늘까지가 된 재고는 오늘 밤 평소처럼 폐기된다.

ELIGIBILITY: 음식·음료 재고가 있을 때만.

### 47. 야시장

TYPE: Mixed

EFFECT: 오늘 방문객 +3, 운영비 +60G.

### 48. 원정 징발령

TYPE: Mixed

EFFECT: 오늘 원정 보상 ×1.40, 방문객 -1.

### 49. 본사 재고 떨이

TYPE: Mixed

EFFECT: 오늘 모든 발주 매입가 ×0.75, 발주 후보 -3(최소 3개 유지).

### 50. 정예 토벌령

TYPE: Mixed

EFFECT: 오늘 게이트 요구 전력 ×1.15, 원정 경험치 ×1.50.

### 51. 폭염

TYPE: Mixed

EFFECT: 오늘 음료 구매 의사 +25%p, 음료 발주 매입가 ×1.35.

### 52. 게이트 임시 폐쇄

TYPE: Mixed

EFFECT: 오늘 아침 열린 게이트(임시 게이트 제외) 1곳이 닫힌다. 방문객 목적지는 남은 게이트에서 정한다. 전날의 게이트 수 예보와 달라지는 유일한 사건이며, 공지가 그 사실을 알린다.

닫힌 게이트는 그날 목록에서 사라지지 않는다: MORNING 게이트 판 · ORDER `오늘` 줄 · `위험 보기` 창에 `오늘 폐쇄`로 남는다. 판은 흐리게, 이름에 취소선, 위험 줄 없이 도장 하나만 둔다. 방문 · 원정 · 발주 계산에는 들어가지 않는다.

ELIGIBILITY: 임시가 아닌 게이트가 2곳 이상일 때만.

### 53. 길드 훈련 주간

TYPE: Mixed

EFFECT: 오늘 원정 경험치 ×1.50, 원정 보상 ×0.70.

### 54. 유통기한 임박 특가

TYPE: Mixed

EFFECT: 오늘 모든 발주 매입가 ×0.60. 오늘 발주로 들어온 재고는 유통기한이 오늘까지다(오늘 밤 팔리지 않으면 폐기).

### 55. 게이트 안정화 작업

TYPE: Mixed

EFFECT: 오늘 아침 모든 게이트(임시 게이트 제외)가 1단계로 다시 열린다(계열 그대로, 위험은 1단계). 원정 보상 ×0.60.

---

## CATEGORY AUDIT

Any Event filter/copy that uses `Medical` to mean the Potion line is stale.
Use the actual Item category/function owned by `ITEM_v2.8.0.md`.

Do not broaden category events to unrelated Items merely to preserve old source keys.

---

## EVENT MIX

55종은 다음 역할을 가진다 (기회 23 · 압박 16 · 혼합 16).

### Opportunity

길드 합동 위령제 · 본사 1+1 행사 · 왕도 축제 · 본사 반값 행사 · 보급 상단 도착 · 길드 급여일 · 치유소 휴무 ·
본사 폐기 유예 · 왕립 기사단 방문 · 늙은 음유시인 · 본사 야간 근무 수칙 · 길드 의료단 순회 · 길드 의무관 당직 ·
길드 위로금 · 길드 특별 수당 · 본사 물류 지원 · 보험 공동 구매 · 본사 원정용품 지원 · 길드 연회 · 원정 교대 근무 ·
길드 휴양일 · 단골의 날 · 길드 현상금

### Pressure

물류대란 · 포션 가격 폭등 · 포션 공급 중단 · 본사 재고 감사 · 길드 파업 · 마왕의 징조 · 입고 지연 · 가뭄 ·
길드 세금 징수 · 장맛비 · 본사 발주 제한 · 포스기 먹통 · 가격 단속 · 퇴각로 붕괴 · 길드 소집령 · 냉장고 고장

### Mixed / RiskReward

게이트 순례 주간 · 몬스터 범람 · 한파 · 독안개 · 신입 모험가 시즌 · 암시장 상인 · 미확인 게이트 · 야시장 ·
원정 징발령 · 본사 재고 떨이 · 정예 토벌령 · 폭염 · 게이트 임시 폐쇄 · 길드 훈련 주간 · 유통기한 임박 특가 ·
게이트 안정화 작업

목표: Event Pool이 억까 Event만으로 느껴지지 않는다. 좋은 날 / 나쁜 날 / 판단이 달라지는 날이 섞인다.
Rare Easter Egg 2종은 둘 다 명확한 Positive Event다.

---

## RANDOMNESS GUARDRAIL

게임에는 Event 외에도 이미 NPC · Destination · Order Offer · Relic Offer · Gate / Tier Randomness가 존재한다.

따라서 Event는 빈도는 낮추고, 발생 시 의미는 분명하게 하고, 오늘의 판단을 실제로 바꾼다.

콘텐츠를 더 자주 보여주기 위해 Event Chance를 올리지 않는다.

Canonical:

```text
dailyEventChance = 40%
normalWeight = 1.0
rareEasterEggWeight = 0.35
```

---

## NPC EVENT GUARDRAIL

신입 모험가 시즌 / 왕립 기사단 방문은 NPC Canonical의 목표

```text
trustedRegulars ≈ 2–4
```

를 해치지 않는다.

FAIL:

- Event 신규 NPC 때문에 낯선 NPC 비중이 계속 커진다.
- 기존 Regular Revisit가 과도하게 밀린다.
- 왕립 기사단 Newcomer가 장기 투자 NPC보다 평균적으로 항상 더 좋다.
- Living NPC Cap을 무시한다.

Rare Easter Egg `늙은 음유시인`은 새 living NPC를 생성하지 않는다.

---

## IMPLEMENTATION GUARDRAIL

Event Canonical 적용 때문에 기존 시스템을 불필요하게 재작성하지 않는다. 필요한 것은 현재 Source와 Canonical 사이의 최소 변경이다.

REUSE: 기존 Event selection · Morning · Order Offer · Purchase Intent · Visitor Modifier · NPC Generation ·
Gate Generation · Hazard · Waste · Wallet · Closing · Relic의 Known Hazard 지원.

만들지 않는다:

- Event Hazard 때문에 새 Hazard System
- Event Reveal 때문에 새 Phase
- Easter Egg 때문에 새 Dialogue System · 새 NPC Type · 새 Quest / History / Save System

---

## CROSS-SPEC OWNERSHIP

EVENT가 소유: Event 발생 Day · Event 발생 확률 · Event Eligibility · Event Selection Weight · 하루 최대 Event 수 ·
55종 Event Catalog · 각 Event의 Effect · Event-added Hazard Rule · Event Reveal Timing · Event-specific QA.

EVENT가 소유하지 않음:

- Item Effect / Counter → `ITEM_v2.8.0.md`
- NPC Roster / Trait / Growth / Revisit → `NPC_TRAIT_v2.8.0.md`
- Gate / Hazard 기본 Formula → `DUNGEON_HAZARD_v2.8.0.md`
- Order 기본 Offer / Price → `ECONOMY_ORDER_v2.8.0.md`
- Sale 기본 Purchase / Price Rule → `SALE_v2.8.0.md`
- Relic Effect → `RELIC_v2.8.0.md`
- Night / Closing 기본 Rule → `NIGHT_CLOSING_v2.8.0.md`
- Presentation Layout → `UI_UX_v2.8.0.md`
- Global Voice / Flavor 작성 기준 → `COPY_WORLD_VOICE_v2.8.0.md`
- Exact Event title / Function / Flavor copy → `COPY_AUDIT_APPROVED_v2.8.0.md`

다른 Spec이 소유한 Rule을 EVENT에서 중복 재정의하지 않는다.

---

## QA / ACCEPTANCE

Full Run에서 확인한다.

### Frequency

- Event가 거의 매일 뜨는 느낌이 아닌가?
- Event가 충분히 기억되는가?
- Relic Day가 별개의 특별한 날로 유지되는가?
- Easter Egg는 일반 Event보다 확실히 드문가?

### Importance

- Event가 Gate 정보에 묻히지 않는가?
- Event가 있으면 Gate Detail보다 먼저 Focused Reveal 되는가?
- 발생 직후 무엇이 달라졌는지 이해되는가?
- Event Reveal이 매번 귀찮은 Pop-up으로 느껴지지 않는가?

### Decision

각 Gameplay Event마다

> 이 Event 때문에 오늘의 판단이 달라지는가?

를 확인한다. NO라면 제거 / 수정 후보.

### Randomness

- RNG가 운영 판단보다 더 강하게 느껴지는가?
- 나쁜 Event가 억까처럼 느껴지는가?
- Opportunity / RiskReward가 충분히 존재하는가?

### Hazard

→ §Hazard Event PASS / FAIL.

### NPC

- Roster Cap을 무시하지 않는가?
- Regular 형성을 해치지 않는가?
- 장기 투자 NPC 가치를 파괴하지 않는가?
- 게이트 순례 주간이 >=2 Gate / >=3 visitor 조건에서만 발생하는가?
- Morning에 1~3명 범위는 공개하되 실제 N/대상/변경 Gate는 숨기는가?
- 실제 affectedCount가 seeded RNG 1~3으로 결정되는가?
- affected NPC는 다른 열린 Gate로만 이동하는가?
- Night에서 실제 N과 affected NPC의 예상->실제 목적지가 정확히 공개되는가?

### Easter Egg

- 모르는 플레이어에게도 상황이 자체적으로 성립하는가?
- Reference를 설명하지 않는가?
- Easter Egg 때문에 새 시스템이 생기지 않았는가?
- 둘 다 Positive Event로 체감되는가?
- 너무 자주 보여 발견물의 느낌이 사라지지 않는가?

### Hazard Event PASS / FAIL

한파 / 독안개는 다음을 만족해야 한다.

PASS:

- Counter Item이 당일 발주에 나오지 않아도 플레이 가능하다.
- 미리 Counter 재고를 준비한 플레이가 분명 보상받는다.
- Direct Counter가 유용하다.
- Hybrid Counter도 의미 있는 대안이다.
- Hazard 관련 Relic Build가 실제 이득을 본다.
- 아무 Counter가 없어도 위험을 감수하는 선택은 남는다.
- 반대로 Event Hazard를 완전히 무시하는 것과 대응하는 것에는 체감 차이가 있다.
- Event Hazard가 즉시 Known으로 표시된다.
- 원정 위험 게시판이 Event Hazard를 인식한다.
- 원정 전문 인증이 Event Hazard를 인식한다.
- 기존 Counter coverage / pity logic이 Event Hazard를 인식한다.
- Forecast가 Event Hazard를 인식한다.

FAIL:

- Counter가 없으면 오늘의 모든 원정이 사실상 금지된다.
- 한파가 Cold Field에 중복 적용된다.
- 한파가 Fire Field에 적용된다.
- 독안개가 Poison Field에 중복 적용된다.
- 공개된 Event Hazard가 Knowledge 부족 때문에 숨겨진다.

FAIL 시 우선순위:

1. 기존 Event / Hazard 강도 조정
2. 그래도 억까라면 Event 자체 제거 검토
3. 새 전용 Mechanic 추가는 마지막 수단

### Deep Expedition Day

- scheduled Deep Day -> no Normal Event roll or Event selection
- no nomination later that Day does not restore an Event
- non-Deep D7/D14/D21/D28 still use ordinary Event rules
- `dailyEventChance` is 40% until a later approved rebalance
- an Event already met this Run never fires again that Run; a save carries the Run's Event log

### Event numeric acceptance

Controlled seeded Event cases PASS only if:
- 몬스터 범람 applies required Power ×1.12 and reward ×1.30 to the Day's ordinary Gates
- 포션 공급 중단 applies Potion ORDER selection weight ×0.08
- 신입 모험가 시즌 seats exactly one generated ordinary newcomer in an existing visitor slot
- 왕립 기사단 방문 seats exactly one generated royal-profile newcomer in an existing visitor slot
- neither newcomer Event increases total visitor count or bypasses Living NPC Cap
- royal profile uses ordinary spawn Level +3 and Rarity weights 40/36/17/6/1
- 본사 재고 감사 is eligible at cumulative waste >=6 and charges min(100G, waste×5G)
- 왕도 축제 applies Food/Drink purchase intent +20%p only
- 미확인 게이트 adds exactly one temporary eligible-Family Gate with required Power ×1.16 and reward ×1.50
- Save/Load does not duplicate an Event effect or create a second Event roll

QA must not tune these values while validating them.

---

## FINAL TARGET

Event가 없는 날도 정상이다.

Event가 뜨면

> 또 랜덤 페널티네.

가 아니라

> 오늘은 평소랑 좀 다르게 운영해야겠네.

가 되어야 한다.

Event는 게임의 주인공이 아니다. 평소의 경영 판단을 가끔 흔드는 날씨와 사건이다.

Rare Easter Egg는 더 드문 발견물이다. 모르면 GUILD24의 이상한 하루고, 알면 한 겹 더 재미있다.
