# EVENT

DOC=EVENT
OWNER=event,daily_event,event_catalog,event_hazard,event_purchase_budget,event_order_source
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=EVENT_v2.7.0.md
PATCH_TYPE=FUNCTION_TRUTH_AUDIT

## INHERITANCE

All unchanged event timing/frequency/selection and catalog mechanics inherit EVENT_v2.7.0.md and
its base.

v2.8 audits Function truth so Flavor never implies a different mechanic.

## TARGETED CURRENT EVENT TRUTH

### 본사 반값 행사

Mechanic remains:
- current Event day only
- first successful 50% sale only
- Store receives +50G HQ support
- Player-chosen sale price remains 50%; support is separate Store income

Exact Function line:
    오늘 첫 50% 할인 판매 · 본사 지원 +50G

### 길드 급여일

Mechanic:
- arriving NPC receives temporary purchase budget equal to +20% of that visit's current Wallet
- it increases affordability for the visit
- it does not permanently multiply or add to NPC Wallet
- unused Event budget does not persist as NPC Wallet

UI must distinguish Wallet from Event budget.

### 치유소 휴무

The stale Medical category is not active.

Current function targets:
    Insurance purchase intent +20%p

Player-facing copy must say 보험, not 의료 상품.

### 암시장 상인

Mechanic remains:
- exactly one special Rare+ Order offer
- that offer buy price +35%
- the special offer is an Event-origin slot, not a global Rare weighting

The Order row must be able to identify its source as 암시장.
This is permitted existing special-offer presentation, not a new generic rarity-attribution UI.

### 보급 상단 도착

Mechanic remains:
    today's Order candidates +2

The changed candidate count may name this Event as its source through the shared deterministic
source-attribution UI.

## NO FALSE ATTRIBUTION

Probability/weight Events do not claim that a particular random result happened because of them
unless the runtime has deterministic proof.

Deterministic count/budget/special-slot changes may expose their source.

## FULL-CHAIN EVENT NUMERIC CLOSURE

USER_APPROVAL_DATE=2026-09-20

The following Event mechanics are exact v2.8 Design Truth.

### 몬스터 범람

For every ordinary Gate active that Day:

    Gate required Power ×1.12
    expedition reward multiplier ×1.30

This is the Event's actual risk/reward change.
It does not add a new Hazard.

### 포션 공급 중단

For Potion Items during today's ordinary ORDER Item selection:

    Potion offer selection weight ×0.08

This is a weight reduction, not a fixed displayed appearance probability.
Other Item categories are unchanged.

### 신입 모험가 시즌

If Living NPC Cap has room:
- generate exactly one new ordinary adventurer for the Day
- that newcomer is guaranteed to occupy one of today's already-existing visitor slots
- total visitor count does not increase because of this Event
- the Event does not create a special Level/Rarity band
- if no legal newcomer can be generated because the Living NPC Cap is full, the Event is not eligible

The guaranteed newcomer replaces one ordinary selected visitor when necessary.

### 왕립 기사단 방문

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

### 본사 재고 감사

Eligibility:

    cumulative Run waste count >= 6

On an eligible Event Day:

    auditCost
    = min(100G, cumulative Run waste count × 5G)

The audit cost is added to that Day's operating-cost charge.
It is not a separate persistent debt or second settlement.

### 왕도 축제

For Food / Drink Items during today's ordinary SALE purchase decision:

    purchase intent +20%p

No other Item category receives this Event modifier.

### 미확인 게이트

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

## FULL-CHAIN EVENT ACCEPTANCE

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
