# SALE

DOC=SALE
OWNER=sale,customer,price,bag,sale_decision_ux,great_signal,fatigue_surface,loyalty_surface
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=SALE_v2.7.0.md
PATCH_TYPE=CORE_READABILITY

## INHERITANCE

All unchanged v2.7 transaction, two-slot Bag, pricing/refusal, Wallet, destination, frozen outlook,
post-commit delta-source and Final override rules inherit SALE_v2.7.0.md.

## NO RELATIVE ANSWER GRADER

Do not add:
- relative Stat-contribution percent
- a contribution score
- a new live post-Item Combat/Hazard/Death answer
- qualitative best/worse Item labels

The Player sees exact ingredients and learns the final contribution from resolved NIGHT evidence.

## FROZEN OUTLOOK

For the whole customer visit, keep the SALE-entry snapshot frozen for:
- Combat Forecast
- Hazard Readiness
- failure-conditioned Death risk %

Selecting or previewing an Item never changes those answers.

Actual expedition Resolve still uses the final committed Bag.

## GREAT SUCCESS SIGNAL — POST-COMMIT EXCEPTION

The Great Success signal is the one approved exception to the frozen displayed outlook.

Rules:
- uncommitted selection/preview does not change the signal
- after every successful committed purchase, recompute the signal from the current committed Bag
- false -> true and true -> false are both allowed
- exact Great Success probability remains hidden
- Combat Forecast / Hazard Readiness / failure-conditioned Death risk remain frozen
- refusal changes nothing

This is feedback on an already committed choice, not a pre-purchase answer.

## FATIGUE AS CURRENT CUSTOMER STATE

Fatigue is visible in the compact current-customer state during SALE.

Normal example:
    피로 2

If a committed purchase reduces departure Fatigue:
    피로 12 -> 출발 8

The decision surface may also show:
    보급 5 / 필요 3 · 여유 2

Do not show:
    성공 N · 퇴각 N · 부상 N

Detailed deterministic arithmetic belongs in the shared anchored explanation popover.

## CURRENT CUSTOMER COMPACT STATE

Mobile current-customer state includes:
- Injury state without numeric duplication
- Fatigue
- Loyalty

Example:
    부상 · 피로 8 · 단골도 37

If Loyalty >= 51, show the existing 단골 state/badge.

Normal SALE does not place a separate Loyalty `?` / popover trigger beside this value.
The contextual meaning of Loyalty is taught by the tutorial/coach.
The global compact Help may retain its separately owned reference text.

Equipment text is not part of the compact SALE top strip.
Equipment remains readable in NPC detail and may appear as a proven Core-Stat source.

Bag remains exactly two slots under the inherited rule.
Exact compact/mobile layout -> UI_UX_v2.8.0.md.

## EVENT PURCHASE BUDGET

When an Event grants temporary purchase budget without changing persistent NPC Wallet, affordability
must remain truthful.

Do not present n.money alone as if it were the whole spendable amount.

The UI may state, for example:
    소지 100G · 급여일 예산 +20G

Unused temporary Event budget is not persistent NPC Wallet.


## REFUSAL RETRY TRUTH — EXACT

If a customer refuses a given Item at price mode P during the current visit:

- that same Item at P becomes unavailable
- every more expensive price mode for that same Item also becomes unavailable
- cheaper price modes remain eligible unless separately refused/blocked
- other Item IDs are unaffected

Player help copy:

    한 가격을 거절하면 같은 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

Do not describe the rule as only \`같은 상품·같은 가격\`.

## PURCHASE-ACCESSIBILITY ROUTING — PLAYTEST RESPONSE

Exact hidden purchase acceptance, NPC Wallet income and Deep sponsorship are owned by
`ECONOMY_ORDER_v2.8.0.md`.

SALE does not duplicate those numbers and does not expose exact purchase probability.

The two-slot Bag is a capacity decision, not an additional hidden acceptance penalty.
