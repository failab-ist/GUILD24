# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,store_capital,decoration,cross_run,account_save,inactive_archive
DOC_VERSION=2.9.6
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.6
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/META_v2.8.0-patch.md,history/META_v2.7.0.md,history/META_v2.6.1.md,history/META_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/META.md

## ROLE

META =
`Run을 끝낸 뒤 무엇이 계정에 남고, 다음 Run에서 무엇이 열리는가`

Meta가 Run 판단을 대체하는 자동 승리 장치가 되어서는 안 된다.

---

## ACTIVE META — EXACT STRUCTURE

Active long-term progression is:

1. **Store Growth**
   - Store Capital
   - permanent Decoration ownership
   - Decoration loadout

2. **Job Mastery / Boss progression**
   - successful-clear identity
   - Job×Boss matrix / distinct-Boss unlock roles

No third generic fail-to-power currency is added.

---

## KEY

globalMetaXP=REMOVED
legacyXPLeveling=REMOVED

jobs=[전사,궁수,마법사,사제,도적,광전사]
bosses=[WRATH,PRIDE,ENVY,GREED,GLUTTONY,LUST,SLOTH]

jobBossMatrixSize=6x7
maxJobMastery/job=7
maxTotalJobMastery=42

distinctBossClearCount/account=0..7

unlock:
- distinctBossClear>=1 -> 황금 1+1 쿠폰
- distinctBossClear>=3 -> 도적
- distinctBossClear>=6 -> 광전사

---

## GLOBAL META XP REMOVAL

The previous Global Meta XP / account-XP reward path is not part of Canonical.

Remove as progression truth:
- day-based Meta XP farming
- XP earned merely for advancing Days
- XP level as the master unlock gate
- legacy grade power bonuses derived from XP

Day number alone grants:
```text
Job Mastery +0
Distinct Boss Clear +0
```

No replacement diligence/inactivity meter is added.

---

## JOB × BOSS CLEAR MATRIX

Persistent account state stores one boolean clear cell for each:
```text
Job ID × Boss ID
```

Matrix dimensions:
```text
6 Jobs × 7 Bosses = 42 unique cells
```

A cell becomes CLEAR only when:
1. the Run clears the Final Boss
2. at least one Final participant has that Job
3. that Job × Boss cell was not already cleared

If multiple Final participants share the same Job:
- that Job receives at most one matrix cell for the cleared Boss

If the Final party contains multiple distinct Jobs:
- each represented Job may receive its own clear cell for that Boss

Fail:
- no Job Mastery clear cell is awarded

Duplicate clear of an already-cleared Job × Boss pair:
- no additional Mastery
- no stacking duplicate reward

---

## JOB MASTERY

Store Capital cannot buy Mastery.
Decoration ownership cannot substitute for Boss CLEAR in the Job×Boss matrix.

Its active reward effect is the exact spawn-Level model below.

For each Job:
```text
Job Mastery
= number of distinct Boss IDs cleared with that Job represented in the successful Final party
```

Range:
```text
0..7 per Job
```

Total:
```text
Total Job Mastery
= sum of all six Job Mastery counts
= 0..42
```

Job Mastery is Player-readable.
The clear matrix is the source of truth; do not maintain an independent drifting counter.

### Successful-clear identity

Job Mastery successful-clear identity:

```text
Job × Boss CLEAR
-> that Job's distinct Boss clear count
-> Job Mastery
```

Rules:
- 6 Jobs × 7 Bosses = 42 possible Job×Boss clear cells
- Job Mastery is the job-specific successful conquest / permanent growth channel
- no failed Run directly increments Job Mastery

### Gameplay reward boundary

Rules:
- no hidden generic Final multiplier
- no hidden account-wide combat multiplier
- no separate mastery-only combat Stat
- the Mastery power effect is visible and Job-specific

### Exact spawn-Level model

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

---

## DISTINCT BOSS CLEAR COUNT

Separate from the 42-cell Job matrix, track:
```text
Distinct Boss Clear Count
= number of unique Boss IDs cleared at least once on the account
```

Range:
```text
0..7
```

Clearing the same Boss with another Job:
- may add Job Mastery matrix progress
- does NOT increase Distinct Boss Clear Count again

This count owns the three approved content unlock gates.

---

## APPROVED UNLOCKS

### 1 distinct Boss clear
Unlock:
```text
황금 1+1 쿠폰
```

Before unlock:
- Item remains in canonical catalog data
- it is not eligible for normal appearance/acquisition

After unlock:
- it joins its normal canonical Item availability path

Item effect ownership -> ITEM.

### 3 distinct Boss clears
Unlock Job:
```text
도적
```

### 6 distinct Boss clears
Unlock Job:
```text
광전사
```

Before a Job unlock:
- that Job is not eligible for normal NPC Job generation

After unlock:
- it joins the normal Job pool
- its Base/Growth identity is owned by NPC_TRAIT

Initial normal Job pool:
```text
[전사,궁수,마법사,사제]
```

No other legacy XP-based unlock is silently retained.

---

## D10 / D14 PRODUCT UNLOCK — EXACT

D10:
- account permanent unlock: Premium Lunch
- unlock before that Run's D10 Offer generation
- may appear in the same D10 Offer generation
- new Run still blocks appearance before D10
- account toast once
- copy: `새 상품 해금 · 길드 특제 도시락`

D14:
- account permanent unlock: World Tree Amulet
- unlock before that Run's D14 Offer generation
- may appear in the same D14 Offer generation
- new Run still blocks appearance before D14
- account toast once
- copy: `새 상품 해금 · 세계수 생환부적`

Full Reset clears unlock + toast state.
Run Abandon preserves unlock + toast state.
The Run that opens one records it, so its END lists it in `본사 해금` (UI_UX §END — REPLAY NUDGE; User 2026-09-26, v2.9.4).

---

## BEST DAY

(User 2026-09-26, v2.9.4.) One account record: the highest Day a Run has reached, `bestDay` (0 on a fresh account).

- set when a Run ends naturally (Run Fail, bankruptcy, Final): `bestDay = max(bestDay, the Run's Day)`
- a manual 현재 지점 포기 never reaches the ending, so it never moves `bestDay`
- a personal record for the END replay line (UI_UX §END — REPLAY NUDGE) only: no Power, unlock, price or reward reads it
- the Run keeps the value it replaced, so a reload of the ended Run reads the same comparison
- Full Data Reset clears it; a save without it reads 0

---

## MONSTER KNOWLEDGE

Monster/Family Knowledge remains cross-run and retains the supplied-survival rule.

Gain only when:
1. NPC enters the expedition with >=1 supplied Item
2. that expedition returns without `사망`

Then:
```text
that Family Knowledge += 1
```

No supplied Item -> +0
Death -> +0

No screen shows Monster Knowledge (User 2026-09-26, v2.9.6): the codex `몬스터 지식` tab is retired - every Gate's Hazards are public from MORNING, so a tab that opened them by returns had nothing left to teach. The record stays on the account; it unlocks and changes nothing.

Monster Knowledge is separate from Job Mastery and Distinct Boss Clear Count.

---

## FIRST CLEAR / META POWER BOUNDARY

WRATH/Boss balance may assume strong player mastery, Run growth, preparation, and Relic build quality.
It may not assume a Job Mastery reward that itself requires a previous Boss clear in order for the first Boss clear to be possible.

Therefore:
- first Boss clear remains possible at Job Mastery 0
- failed Runs do not automatically grant a new permanent Stat/Power currency
- no generic account-wide combat multiplier is added
- existing Monster Knowledge / unlock / player-learning channels remain as currently owned

If first-clear full-run evidence later shows the game is too hard, report a balance finding before inventing new Meta power.

---

## CROSS-RUN POWER BOUNDARY

Forbidden:
- Hall of Fame dependency
- legendary-adventurer cameo requirement
- hidden account-wide combat multiplier
- hidden Boss-clear damage multiplier
- permanent NPC identity carryover between Runs

Permitted:
- Monster Knowledge
- approved content unlocks
- Job × Boss Mastery matrix

```text
permanentCombatPowerMeta=JOB_MASTERY_ONLY_IF_EXPLICIT_AND_VISIBLE
```

---

## POWER / INFLATION BOUNDARY

Decoration effects operate through store/economy/access channels.

Do not turn the initial system into:
- generic NPC +Power
- generic +all Stats
- direct Death-rate reduction
- direct Boss damage
- unlimited permanent passive stacking

Adding more owned Decorations does not increase the maximum number of active Slots.

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

(User 2026-09-25, v2.9.1 balance): back to 1 / 2 / 3 / 4 / 5% with the cheaper Decoration prices below. Buying a Decoration inside the first Run is still not a goal.

The band is the Day the Run actually reached. Boss CLEAR does not multiply it.

### Approved progression expectation

Measured under the approved balance, across the ordinary purchase orders:

```text
1st Decoration : around Run 4-6     (measured at the v2.9.1 balance; the 2026-09-24 expectation was Run 2-3)
all four Slots : around Run 9
```

(User decision 2026-09-24: the first Decoration comes sooner, the four Slots fill by Run 10-11,
and a Boss clear becomes worth attempting after that. Collecting both Decorations of every Slot
is a longer tail beyond Run 11.)

Requirements:
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

Each Slot now holds two Decorations: an economy Decoration and a survival / combat alternative
(User decision 2026-09-24). A Slot still wears exactly one, so the pick is a choice between
running the store and keeping its people alive. Account/Save/data/UI structures must not assume
two per Slot forever either.

The active Decoration system adds no system for:
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
ORDER offer candidates +3    (User 2026-09-25, v2.9.1 balance; was +2)
```

### wall — 길드 제휴 현판
```text
each Morning, 30% chance of visitors +1    (User 2026-09-25, v2.9.1 balance; was 25%)
```

The roll happens once per Morning, alongside the ordinary visitor generation, and is independent
of every other visitor source. It is a chance, not a guarantee: most Days it adds nothing.

### counter — 알뜰 금고
```text
every morning, store Gold +50G (DAY 1 included), shown on the day's receipt    (User 2026-09-25, v2.9.1 balance; was +40G)
```

### display — 프리미엄 쇼케이스
```text
rare-NPC rarity weights = [45, 31.5, 17.5, 4.75, 1.25]    (User 2026-09-25, v2.9.1 balance; was [50, 30, 15, 4, 1])
rarity order = Common / Uncommon / Rare / Epic / Legendary
```

Every grade above 평범 is lifted (ordinary [60, 27, 10, 2.5, 0.5]): above 평범 40% -> 55%
(User decision 2026-09-24; 55% at the v2.9.1 balance 2026-09-25, each grade's lift × 1.5). This reuses the existing Premium spawn-weighting channel. It changes only the rarity weights used by the ordinary NPC spawn
rarity draw when the Decoration is active. It adds no extra spawn, no extra rarity roll and no new
Gameplay RNG draw.

Do not carry the retired Start Contract negative sides into these Decorations:
- no +5% ORDER purchase penalty
- no +20G / +25G operating-cost penalty
- no rare-ORDER reduction penalty

## SURVIVAL / COMBAT ALTERNATIVES — EXACT EFFECT IDENTITY

User decision 2026-09-24. One per Slot, beside that Slot's economy Decoration.

### sign — 훈련소 제휴 간판 (id trainingRack)
```text
every adventurer created while it is worn: 65% chance of spawn Level +1    (User 2026-09-25, v2.9.1 balance; was 50%)
```

### wall — 의무실 현판
```text
an adventurer who arrives with an ordinary Injury (not 중상) is healed on arrival with 45% chance    (User 2026-09-25, v2.9.1 balance; was 35%)
```

One roll per injured arrival, drawn only while the Decoration is worn. A heal sets Injury 0 and
is shown on the SALE counter and counted in the Day's record (UI_UX owns the presentation).

### counter — 추모 방명록 (id memorialBoard)
```text
every segment Death limit +2 (5 / 8 / 11 -> 7 / 10 / 13; CORE_RUN §DEATH LIMIT — SEGMENTED; User 2026-09-25, v2.9.1 balance)
```

It resolves after 귀환석 / 세계수 생환부적, so carried Insurance is never wasted by it, and the
RESULT-PROOF counterfactual reads the same availability.

Placement (User decision 2026-09-24): the survival alternative with the larger measured effect
sits in the dearer Slot; ids are kept from the first placement, names and art follow the Slot.

### display — 구급품 진열장 (id firstAidKit)
```text
up to three times per Run, a Death that no carried Insurance prevented becomes 중상    (User 2026-09-25, v2.9.1 balance; was twice)
```

### Prices — EXACT

`DIRECTOR DOCUMENT BASELINE` (User decision 2026-09-24; prices 2026-09-25, v2.9.1 balance — cheapest 500, dearest 2.5×, total 3,500)

```text
sign    새벽배송 안내판 / 훈련소 제휴 간판   1250 Store Capital
wall    길드 제휴 현판 / 의무실 현판        1000 Store Capital
counter 알뜰 금고 / 추모 방명록             750 Store Capital
display 프리미엄 쇼케이스 / 구급품 진열장     500 Store Capital
```

Both Decorations of a Slot cost the same, so price never decides between them. The display Slot
is the cheapest so a first Decoration is the earliest within reach.

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

## BALANCE GATE

The exact Store Capital rate table above is the current `DIRECTOR DOCUMENT BASELINE` and must be validated
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

User decision 2026-09-25 (v2.9.1 balance): the rate table (1 / 2 / 3 / 4 / 5%), the prices (500 / 750 / 1000 / 1250) and the Decoration effects were set together with the Run balance and measured (`archive/v2.9.1-balance/v29-balance-ideal.md`); the measured acquisition (first Decoration Run 4-6, four Slots Run 9) is later than the 2026-09-24 expectation (Run 2-3) and is reported, not tuned here.

## RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE

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

## PRE-RELEASE COMPATIBILITY POLICY — EXACT

All current v2.x builds are internal development / test builds.
The current external-public-release target is:

```text
v3.0.0
```

Therefore current internal v2.x builds do **not** spend implementation complexity preserving compatibility with older internal test Account/Meta saves whose schema or semantic meaning changed.

For Save v8:

```text
v1~v7 Run state
-> no migration

v1~v7 Account/Meta state
-> no migration into v8

v8
-> initialize fresh current Account/Meta + fresh current Run
```

Rules:
- do not preserve old Franchise Grade / Start Contract availability by compatibility shim
- do not preserve old Job Mastery / Boss matrix / Monster Knowledge merely for internal-test continuity
- do not add conversion logic for retired or changed-semantics Meta fields
- legacy bytes may remain physically present until the existing reset/storage policy removes them, but they are not imported into current v8 progression
- once v8 exists, current-version Save behavior follows current v8 owners
- Full Data Reset still clears current game-owned Account/Meta data

Purpose:
keep the internal development line simple before the v3.0.0 external-release compatibility boundary is established.

## SAVE / ACCOUNT PERSISTENCE

Cross-run account persistence must preserve:
- 42 Job × Boss clear cells
- 7 Boss-cleared flags or equivalent derived set
- approved unlock state derivable from Distinct Boss Clear Count
- Monster Knowledge progress
- the best Day (§BEST DAY)

Run save and account Meta state may use separate storage structures.

No reload may:
- duplicate a Boss clear reward
- set one matrix cell more than once
- inflate Distinct Boss Clear Count with a duplicate Boss
- relock already earned approved content

Derived values should be derived from source-of-truth sets/matrix where practical.

`account.unlocks`:
- required current unlock keys are validated as booleans
- malformed shape is invalid, not silently coerced

Old save bytes are not automatically deleted merely because they cannot be continued.
Full Data Reset is the explicit deletion action.

### FULL DATA RESET vs ABANDON
- **Full Data Reset**: Run, Account/Meta, Tutorial, D10/D14 해금/Toast 모두 Fresh 초기화.
- **현재 지점 포기(Abandon)**: Run만 초기화. Account/Meta, Tutorial, 해금 상태는 유지. 포기 직후 영업이 없는 새 점포 준비 화면으로 돌아오며, 거기서 장식 구매·장착이 가능하다 (User 2026-09-24, v2.9.0).

## SAVE RELATIONSHIP

`CORE_RUN_v2.8.0.md` owns:
- v8 Run schema
- legacy Save rejection / fresh v8 initialization
- start stock
- D25 persisted Final state
- fresh-account tutorial reset boundary

META owns:
- current v8 Account/Meta truth
- Job Mastery / Job×Boss matrix

No v1~v7 Account/Meta migration path is required for this internal-development version.

---

## QA / ACCEPTANCE

### META-Q01 — NO GLOBAL XP
Completing/advancing Days does not award legacy Meta XP.

### META-Q02 — MATRIX CREDIT
Successful Final credits exactly the distinct Jobs represented in that Final party for the cleared Boss.

### META-Q03 — DUPLICATE PAIR
Repeating the same Job × Boss clear does not increase that Job's Mastery again.

### META-Q04 — MULTI-JOB PARTY
A successful party with three distinct Jobs may create up to three new matrix cells for that Boss.

### META-Q05 — FAIL
Boss failure creates no new matrix clear.

### META-Q06 — DISTINCT BOSS COUNT
Same Boss cleared with different Jobs still counts once toward the 0..7 Distinct Boss count.

### META-Q07 — UNLOCK 1
First distinct Boss clear unlocks 황금 1+1 쿠폰 and no earlier state exposes it.

### META-Q08 — UNLOCK 3
Third distinct Boss clear unlocks 도적.

### META-Q09 — UNLOCK 6
Sixth distinct Boss clear unlocks 광전사.

### META-Q10 — INITIAL JOB POOL
Fresh account normal NPC Jobs are 전사/궁수/마법사/사제 until unlocks apply.

### META-Q12 — MONSTER KNOWLEDGE
Supplied-survival Knowledge behavior remains unchanged and separate from Mastery.

### META-Q13 — SAVE/RELOAD
Reload cannot duplicate matrix progress or Boss unlock count.

### META-Q14 — NO LEGACY POWER
Removed XP/Grade direct bonuses do not remain as hidden modifiers.

---

## RELATED

Core identity -> `00_GAME_CORE_v2.8.0.md`
Run timing -> `CORE_RUN_v2.8.0.md`
Run/save -> `CORE_RUN_v2.8.0.md`
Decoration UX -> `UI_UX_v2.8.0.md`
Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
Gate / Hazard -> `DUNGEON_HAZARD_v2.8.0.md`
monster family knowledge -> `DUNGEON_HAZARD_v2.8.0.md`
Item Counter -> `ITEM_v2.8.0.md`
item unlock/effect -> `ITEM_v2.8.0.md`
Job growth -> `NPC_TRAIT_v2.8.0.md`
Boss clear signal -> `BOSS_v2.8.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.8.0.md`
copy -> `COPY_WORLD_VOICE_v2.8.0.md`
