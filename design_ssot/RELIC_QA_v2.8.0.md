# RELIC / STORE SUPPORT QA

DOC=RELIC_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=RELIC_QA_v2.7.0.md
PATCH_TYPE=STORE_SUPPORT_AUDIT_QA

## INHERITANCE

All non-conflicting v2.7 Store Support QA remains active.

Player-facing system term is 점포지원.

## REL-Q-v28-1 — NAME COLLISION CLEANUP

Expected:
- showcase -> 희귀상품 입고 계약
- coldcase -> 냉장 유통 계약
- Decoration 프리미엄 쇼케이스 remains unchanged

No active Store Support uses 쇼케이스 in these two names.

## REL-Q-v28-2 — LARGE FRIDGE PRICE

Expected:
    대형 냉장고 = 200G

A 260G Source row is FAIL / Implementation Bug.

## REL-Q-v28-3 — ROOKIE BOARD

When a new adventurer is generated on a Day and the support is owned:
- that new adventurer occupies one existing visitor slot
- total visitor count is not increased by this rule
- no separate +70% probability-only selection rule remains active

When no new adventurer is generated:
- no visitor is added

## REL-Q-v28-4 — RETURN POINTS

Expected:
    eligible survival -> Loyalty +2 and NPC Wallet +30G

## REL-Q-v28-5 — SUPPLY CERT

Expected:
    eligible Rare+ sale -> HQ commission = 12% of list price

## REL-Q-v28-6 — LIFETIME

Expected:
    Loyalty >=60 eligible survival -> NPC Wallet +50G
    revisit weight +50% unchanged

Does not redefine Trusted Regular.

## REL-Q-v28-7 — ROYAL PREMIUM

Expected:
    eligible Rare+ overcharge -> HQ commission = 20% of list price

## REL-Q-v28-8 — OPERATING EFFICIENCY

Expected:
    Price 260G
    from next Day basic operating cost -30G

This is a Production baseline, not harness-only.

## REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION

On acquisition:
- existing non-expired U+ Food/Drink stock extends exactly once +1 day

Future eligible stock:
- receives +1 day

FAIL:
- eligibility depends on retired item.fresh property
- Common Food/Drink is extended by coldcase
- eligible existing stock is not extended

## REL-Q-v28-10 — COPY TRUTH

Expected:
- 긴급보급 선반 says Potion / Field Gear / Insurance
- 길드 전광판 explains base 3 -> 4 floor, not final minimum visitors 4
- 발주 교환권 sequence after free use starts at 100
- SLOTH active copy says 점포지원

## REL-Q-v28-11 — FEEL ATTRIBUTION

Deterministic deltas may identify exact Store Support source.

Probability/weight-only effects:
- remain readable in support description
- do not claim a particular random Item/NPC was caused by that support
- do not receive a new rarity-origin UI

Frozen QA reports aggregate-value weakness as BALANCE FINDING; it does not retune.
