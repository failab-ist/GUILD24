# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,store_capital,decoration,cross_run,account_save,inactive_archive
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION

## CURRENT EXECUTION SCOPE

This v2.8-named file is a **scoped Decoration Package design source for the current v2.7 cycle**, not a project-wide v2.8 adoption directive.

Apply only the Decoration/Store-Capital replacement work explicitly owned here.
All unrelated systems and balance owners remain on their current v2.7 routes through `SPEC_INDEX_v2.7.0.md`.

## INHERITANCE

Job Mastery, Job×Boss matrix, distinct-Boss Item/Job unlocks, Monster Knowledge, Full Reset, and other unchanged Meta behavior inherit `META_v2.7.0.md` and its base chain.

This patch supersedes v2.7 Franchise Grade / Franchise Achievement / Grade-based Start Contract progression.

## ACTIVE META — EXACT STRUCTURE

Active long-term progression is:

1. **Store Growth**
   - Store Capital
   - permanent Decoration ownership
   - Decoration loadout

2. **Job Mastery / Boss progression**
   - unchanged successful-clear identity
   - unchanged Job×Boss matrix / distinct-Boss unlock roles

No third generic fail-to-power currency is added.

## RETIRED v2.7 FRANCHISE SYSTEM — INACTIVE ARCHIVE

The following are retired from active gameplay by the Decoration Package:

- Franchise Grade
- ten Franchise Achievements
- Grade ORDER discount
- Grade-based Start Contract unlocks
- Start Contract selection

Do **not** delete their final v2.7 Source/Design implementation.

During the current v2.7 Decoration-package Source adoption, preserve the retired implementation under:

```text
archive/inactive/v2_7_franchise/
```

The archive must identify:

```text
STATUS = INACTIVE_ARCHIVE
RUNTIME_IMPORT = FORBIDDEN
DESIGN_AUTHORITY = HISTORICAL_ONLY
```

The preserved archive includes the final v2.7 achievement definitions/baselines, Grade ladder/discount, Start Contract data/effects, progress readout rules, and Achievement toast behavior needed to understand or revive that design later.

Active Runtime must not:
- import the archive
- derive Grade
- apply Grade discount
- increment retired Franchise counters
- emit retired Achievement/Grade UI or toasts
- gate active content through retired Franchise state

Existing account payload fields may remain dormant if data preservation makes that the smaller safe implementation, but dormant fields have zero active effect and receive no new progress.

## STORE CAPITAL

`점포 자본` is one persistent Account resource.

It may be spent only on permanent Decoration purchases.

It may not pay for:
- ordinary ORDER
- Reroll
- Relic / 점포지원
- Deep sponsorship
- NPC purchase
- Final preparation
- any other Run-internal transaction

### Run-end settlement structure

For an eligible completed Run:

```text
Inventory Liquidation Value
= the existing Closing liquidation basis

Settlement Value
= max(0, Ending Gold + Inventory Liquidation Value)

Store Capital Gain
= Settlement Value × Day-reach conversion rate
```

Remaining Inventory uses the **same value basis as the existing Closing liquidation rule**. Do not invent a second inventory valuation system for Meta settlement.

**The clamp is on the sum, and debt is part of it.** A Run that ends owing money still holds stock, and that stock pays the debt down before anything is banked:

```text
Ending Gold = -500G, Inventory Liquidation Value = 800G  ->  Settlement Value = 300G
Ending Gold = -2000G, Inventory Liquidation Value = 800G ->  Settlement Value = 0
```

Clamping the Gold first:

```text
max(0, Ending Gold) + Inventory Liquidation Value      <- FORBIDDEN
```

is not the rule. It would hand a bankrupt store the whole shelf value and make ending in the red cost nothing.

Manual Run Abandon / explicit early retirement grants:

```text
Store Capital Gain = 0
```

Boss CLEAR does not multiply Store Capital settlement.
Boss success progression remains owned by Job Mastery.

### Day-reach conversion rate — EXACT

`DIRECTOR DOCUMENT BASELINE`

```text
D1-9    =  5%
D10-19  = 15%
D20-24  = 30%
D25-29  = 45%
D30     = 60%
```

The band is the Day the Run actually reached. Boss CLEAR does not multiply it.

### Approved progression expectation

Measured under the approved balance, across the ordinary purchase orders:

```text
1st Decoration : around Run 3-4
2nd            : around Run 6
3rd            : around Run 8-9
4th            : around Run 10-11
```

This supersedes the earlier 1-3 / 4-7 / 8-12 target. Where an older QA clause or line still
states that target, the expectation above is the current one.

Requirements that remain:
- D30 / Boss CLEAR is not required to buy any Decoration
- no Decoration may be a forced first purchase - the growth rate must not collapse when a
  different reasonable order is taken
- early hoarding, inactivity and deliberate short-run farming must not outperform engaged play
  as a Store Capital strategy

## DECORATION COLLECTION / LOADOUT

Decoration ownership and Decoration activation are separate.

- purchase once -> owned permanently
- each Decoration has exactly one fixed `slot`
- each Slot may own multiple Decorations over time
- at most one owned Decoration per Slot is active for a Run
- active loadout is chosen before the Run begins
- loadout is fixed after Run start
- empty Slot = no effect
- unowned Decoration cannot be equipped

Initial active Slot set:

```text
sign
wall
counter
display
```

The initial Decoration-package content contains one Decoration in each Slot, but Account/Save/data/UI structures must not assume one Decoration forever.
Future content may add multiple alternatives to the same Slot.

The current Decoration Package adds no system for:
- Decoration levels
- Decoration upgrades
- Decoration rarity ladder
- random Decoration shop
- free-placement furniture editing

## INITIAL FOUR DECORATIONS — EXACT EFFECT IDENTITY

These reuse existing Start Contract positive implementation channels.

A Decoration is its own system and never shares identity with a 점포지원 Relic. Granting a
Decoration effect must not inject a Relic id into the Run's facilities, mark a Relic as owned,
remove a Relic from a purchase window, or consume one of the Run's Relic slots. A Decoration and
a Relic that touch the same quantity simply both apply.

### sign — 새벽배송 안내판
```text
ORDER offer candidates +1
```

### wall — 길드 제휴 현판
```text
each Morning, 10% chance of visitors +1
```

The roll happens once per Morning, alongside the ordinary visitor generation, and is independent
of every other visitor source. It is a chance, not a guarantee: most Days it adds nothing.

### counter — 알뜰 금고
```text
Run starting Gold +300G
```

### display — 프리미엄 쇼케이스
```text
use the existing Premium Start Contract rare-NPC spawn weighting
```

Do not carry the retired Start Contract negative sides into these Decorations:
- no +5% ORDER purchase penalty
- no +20G / +25G operating-cost penalty
- no rare-ORDER reduction penalty

### Prices — EXACT

`DIRECTOR DOCUMENT BASELINE`

```text
sign    새벽배송 안내판     800 Store Capital
wall    길드 제휴 현판      700 Store Capital
counter 알뜰 금고          650 Store Capital
display 프리미엄 쇼케이스   550 Store Capital
```

The spread is deliberately narrow. The four measured within 1.37x of each other in Run value, so
a wider price spread would let price decide the pick instead of the effect.

## POWER / INFLATION BOUNDARY

Decoration effects operate through store/economy/access channels.

Do not turn the initial system into:
- generic NPC +Power
- generic +all Stats
- direct Death-rate reduction
- direct Boss damage
- unlimited permanent passive stacking

Adding more owned Decorations does not increase the maximum number of active Slots.

## PROGRESSION TARGET

At equal player policy / skill, aggregate Final access should improve from:

```text
Fresh Store
-> Early Store
-> Mid Store
-> Full initial Store
```

Per-Run numbers may fluctuate with RNG.
The required signal is an aggregate cross-run progression trend, not strict monotonicity every Run.

Fresh Store remains capable of first clear.

## JOB MASTERY

Job Mastery is unchanged by this patch.

Store Capital cannot buy Mastery.
Decoration ownership cannot substitute for Boss CLEAR in the Job×Boss matrix.

## BALANCE GATE

Before Decoration-package Production adoption in v2.7, the integrated candidate pass must jointly validate:

- Store Capital conversion rates
- Decoration prices
- Decoration progression curve
- late Gate Power curve
- NPC Wallet curve
- Hazard Counter Item values / prices if required

Do not tune Decoration in isolation and then rebalance the whole game again.

## RELATED

Core identity -> `00_GAME_CORE_v2.8.0.md`  
Run timing -> `CORE_RUN_v2.8.0.md`  
Decoration UX -> `UI_UX_v2.8.0.md`  
Economy / Wallet -> current ECONOMY_ORDER owner  
Gate / Hazard -> current DUNGEON_HAZARD owner  
Item Counter -> current ITEM owner
