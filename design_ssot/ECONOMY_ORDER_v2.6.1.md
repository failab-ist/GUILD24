# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ECONOMY_ORDER_v2.6.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged economy/order behavior inherits `ECONOMY_ORDER_v2.6.0.md`.
This patch resolves the D1 Wallet baseline numeric and exact ORDER adoption requirements.

## NPC WALLET — DIRECTOR RESOLUTION

The approved "higher global baseline from D1" is fixed for v2.6.1 as the smallest direct change to the existing model.

First Visit:
```text
150G + Level×8 + random(0,60)
```

Revisit:
```text
previous Persistent Wallet 100%
+ Level×8
+ random(0,60)
```

Rules:
- only the first-visit fixed base changes: **100G -> 150G**
- existing Level contribution remains
- existing random variation remains
- revisit carry remains 100%
- no Day-based Wallet inflation subsystem
- successful purchases reduce Persistent Wallet normally
- every permanent increase path clamps final Persistent Wallet to **2000G**

`rich` remains separate:
- actual visit +50G exactly once
- first/revisit both
- applied on actual arrival, not Morning formula
- cap 2000 after application

Event temporary purchase budget remains separate from Persistent Wallet and outside the 2000 cap.

## ORDER FLOW — EXACT

```text
quantity selection
-> confirm order
-> committed Inventory increases
-> unconfirmed cart clears
-> remain in ORDER

optional:
-> Reroll
-> clear unconfirmed cart only
-> charge Reroll once
-> replace entire Offer set
-> preserve committed Inventory
-> order again

final:
-> separate `영업 시작`
-> SALE
```

`confirmOrder` semantics:
- purchase commit only
- never advances to SALE

`영업 시작` semantics:
- phase advance only
- must not auto-confirm the cart internally
- if unconfirmed cart remains, Player must explicitly resolve it before start or receive a clear blocking state; it must not be silently purchased

## REROLL

Base current curve:
```text
50G -> 100G -> 200G -> 400G -> 800G -> x2 thereafter
```

Daily reset = YES.
Reroll does not advance pity.

With an unconfirmed cart:
- Reroll is still usable
- cart is discarded without purchase
- no need to zero quantities first

Confirmed Inventory is never removed by Reroll.

## ORDER DECISION INFORMATION

Before order commitment show/readably expose:
- Item buy cost
- quantity
- Item shelf life / expiry
- current Gold
- selected spend
- Gold after order
- **today expected operating cost**
- warehouse usage / remaining capacity
- current-day Gate / known Hazard
- next-day Tier forecast
- current Reroll cost/state

Expected operating cost must be derived from the same current-day rules used by Closing.
It is decision information, not a separate charge.

## GOLDEN 1+1

v2.6.1 retained exact economy:
```text
buy 500
sell 1000
```

## BALANCE BOUNDARY

The 150G Wallet base is the only Wallet baseline production numeric authorized by this Director recovery decision.
Further Wallet tuning after Recovery is a separate balance finding and must not be auto-applied during QA.
