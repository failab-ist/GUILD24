# ECONOMY_ORDER_QA

DOC=ECONOMY_ORDER_QA
OWNER=qa,economy,order,reroll,wallet
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=ECONOMY_ORDER_QA_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

Status values are not stored here. This patch overrides stale Reroll and Wallet expectations in the base.

## ECO-Q61 — FIRST VISIT WALLET BASELINE

For a known Level and controlled RNG:
```text
Persistent Wallet = 150 + Level×8 + random(0,60)
```

PASS:
- fixed base is 150G, not 100G
- ordinary random/Level variation remains

## ECO-Q62 — REVISIT WALLET

EXPECT:
`previous Persistent Wallet + Level×8 + random(0,60)`

PASS:
- no repeated +150 base
- carry is 100%
- final permanent wallet cap 2000

## ECO-Q63 — RICH

EXPECT:
- actual arrival +50G exactly once per actual visit
- first/revisit
- clamp at 2000

PASS: no Morning double-application.

## ORD-Q61 — ORDER CONFIRM SEPARATION

Select a nonzero cart and confirm.
EXPECT:
- Gold charged once
- Inventory increases
- cart clears
- phase remains ORDER

PASS: SALE does not open.

## ORD-Q62 — REROLL WITH CART

With a nonzero unconfirmed cart, use Reroll.
EXPECT:
- Reroll is available
- unconfirmed cart clears without purchase
- current cost charged once
- entire Offer list changes
- already confirmed Inventory unchanged

PASS: Player never needs to manually zero quantities first.

## ORD-Q63 — RE-ORDER AFTER REROLL

Confirm once -> Reroll -> select new quantities -> confirm again.
PASS:
- both confirmed purchases remain in Inventory
- second confirmation succeeds
- no first-order rollback.

## ORD-Q64 — SEPARATE START SALE

After one or more order confirmations with cart clear, press `영업 시작`.
PASS:
- only phase changes to SALE
- no hidden confirm is called.

## ORD-Q65 — REROLL COST

Fresh Day repeated uses:
```text
50 -> 100 -> 200 -> 400 -> 800 -> x2 ...
```

PASS:
- same-Day escalation exact
- next Day resets
- Reroll itself does not advance pity

This supersedes stale 30/60/120/240 expectations.

## ORD-Q66 — DECISION INFO

Before confirmation, Player can read:
- shelf life
- current Gold
- selected spend
- Gold after order
- today expected operating cost
- warehouse used/remaining
- current Reroll cost

PASS: no basic decision requires waiting for Closing.

## ORD-Q67 — MOBILE CONTINUITY

Interact with quantity, confirm, Reroll, and re-confirm on mobile.
PASS:
- current viewed offer region does not jump to top
- practical focus is restored when possible
- D30 Final ORDER does not regress.
