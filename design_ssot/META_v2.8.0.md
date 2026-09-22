# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,store_capital,decoration,cross_run,account_save,inactive_archive
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION

## CURRENT EXECUTION SCOPE

META_v2.8.0 is the current project-wide Meta owner.

## INHERITANCE

Job×Boss matrix, distinct-Boss Item/Job unlocks, Monster Knowledge, Full Reset, and other unchanged Meta behavior inherit `META_v2.7.0.md` and its base chain.
Job Mastery progression identity/count still inherits, but its active reward model is overridden by the exact spawn-Level model in this v2.8 owner.


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

During v2.8 Source adoption, preserve the retired implementation under:

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
Gross Sales
= the Run's accumulated actual sales revenue

Store Capital Gain
= round(Gross Sales × Day-reach conversion rate)
```

Gross Sales is the existing sales-accounting truth already used by the Run. It includes actual
ordinary sales and any Final fixed-price transfers that count toward Gross Sales, exactly once.
Do not create a second Meta-only sales counter.

The two terms deliberately represent the two things Store Growth rewards:

```text
Gross Sales = how much business the store actually did
Reached Day = how long that business survived
```

A normal Run may therefore earn Store Capital even when it ends in bankruptcy, Death-limit
closure, or Final failure. Those remain real Run failures: Run Gold, Inventory, adventurers and
Run-scoped Store Build are still lost. They simply do not erase the store-operation progress
already demonstrated by actual sales and survival depth.

Ending Gold and remaining Inventory liquidation value are **not Store Capital inputs**.
They remain important inside the Run because they determine liquidity, rescue and bankruptcy,
but Meta does not reward the same end-state wealth a second time.

Manual Run Abandon / explicit early retirement grants:

```text
Store Capital Gain = 0
```

Boss CLEAR does not multiply Store Capital settlement.
Boss success progression remains owned by Job Mastery.

A Run with:

```text
Gross Sales = 0
```

earns:

```text
Store Capital Gain = 0
```

regardless of reached Day. This keeps inactivity / no-sale farming from becoming a progression
answer.

### Day-reach conversion rate — EXACT

`DIRECTOR DOCUMENT BASELINE`

```text
D1-9    = 1%
D10-19  = 2%
D20-24  = 3%
D25-29  = 4%
D30     = 5%
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

The active v2.8 Decoration system adds no system for:
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
rare-NPC rarity weights = [51, 30, 14, 4, 1]
rarity order = Common / Uncommon / Rare / Epic / Legendary
```

This is the exact v2.8 baseline for the existing Premium Start Contract positive spawn-weighting
channel reused by this Decoration. It changes only the rarity weights used by the ordinary NPC spawn
rarity draw when the Decoration is active. It adds no extra spawn, no extra rarity roll and no new
Gameplay RNG draw.

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

## STORE-GROWTH VISUAL PROJECTION — PRESENTATION ONLY

Store-growth presentation may project already-owned/current state into the live store through
UI_UX_v2.8.0.md.

This includes equipped Decorations and may coexist with run-state traces owned by other current
Specs, such as Store Support, Trusted Regular and revealed Final-preparation state.

The projection:
- creates no new Meta resource or unlock
- grants no passive effect beyond the actual owned mechanic
- requires no new persistent progression field
- does not change Decoration Slot count or loadout rules
- must remain truthful after Save/Load because it is derived from existing state

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

Job Mastery clear-count identity / Job×Boss ownership remains unchanged.
Its active reward effect is the exact v2.8 spawn-Level model below.

Store Capital cannot buy Mastery.
Decoration ownership cannot substitute for Boss CLEAR in the Job×Boss matrix.

## BALANCE GATE

The Decoration structure and initial Decoration identities/prices remain approved. Current non-Meta owners are routed by SPEC_INDEX_v2.8.0.md.

The newest Store Capital amendment changes only the cross-run conversion basis:

```text
Gross Sales × reached-Day rate
```

Its exact rate table above is the current `DIRECTOR DOCUMENT BASELINE` and must be validated
against the approved acquisition expectation and anti-farm conditions before the Source cycle is
closed.

Validation must confirm:
- ordinary engaged play produces meaningful Store Capital at the approved cadence
- both reasonable initial purchase orders remain near the approved acquisition expectation
- no-sale / inactivity / deliberate short-run farming remains inefficient
- overcharge-heavy play does not become the dominant Meta strategy merely by inflating Gross Sales
- Run-internal bankruptcy / Death / Final balance does not change as a side effect

If validation produces a Balance Finding, report it and stop. Do not auto-tune the rate table,
Decoration prices, or unrelated Run balance.

## RELATED

Core identity -> `00_GAME_CORE_v2.8.0.md`  
Run timing -> `CORE_RUN_v2.8.0.md`  
Decoration UX -> `UI_UX_v2.8.0.md`  
Economy / Wallet -> current ECONOMY_ORDER owner  
Gate / Hazard -> current DUNGEON_HAZARD owner  
Item Counter -> current ITEM owner

## JOB MASTERY — EXACT SPAWN-LEVEL MODEL

USER_APPROVAL_DATE=2026-09-20

Job Mastery does **not**:
- multiply Job Base Stats
- multiply Job Growth
- create a hidden account-wide combat bonus
- change an already-created NPC

Instead, it improves the chance that a newly generated NPC of that same Job arrives at a higher
starting Level.

Mastery rank remains the number of distinct Bosses cleared with that Job, from 0 through 7.

For each newly generated NPC:
1. resolve the ordinary spawn Level
2. read Mastery for that NPC's Job
3. make one mutually exclusive Mastery bonus roll
4. add at most one of +1 / +2 / +3 Levels

Exact probabilities:

| Mastery | +1 Lv | +2 Lv | +3 Lv |
|---:|---:|---:|---:|
| 0 | 0% | 0% | 0% |
| 1 | 5% | 0% | 0% |
| 2 | 10% | 0% | 0% |
| 3 | 15% | 5% | 0% |
| 4 | 20% | 10% | 0% |
| 5 | 25% | 15% | 0% |
| 6 | 30% | 20% | 5% |
| 7 | 35% | 25% | 10% |

The three columns are mutually exclusive outcomes, not stacking rolls.

The Mastery roll belongs only to the NPC's own Job.
A Job's Mastery cannot affect another Job.

For deterministic seeded comparison, the spawn path consumes the same single Mastery roll even at
Mastery 0; the probability row at 0 simply yields no bonus.

After the bonus Level is resolved, the NPC is an ordinary NPC of that final Level and uses the
normal Job/Growth rules owned by NPC_TRAIT.

Player-facing meaning:
    해당 직업 숙련도가 높을수록 그 직업의 모험가가 더 높은 레벨로 등장할 수 있다.

Do not expose the exact probability table unless a later approved Meta information rule explicitly
does so.
