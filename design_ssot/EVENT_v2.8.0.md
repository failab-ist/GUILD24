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
