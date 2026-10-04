# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,store_capital,decoration,cross_run,account_save,inactive_archive
DOC_VERSION=2.10.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.10.3
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## ROLE

META = `Run을 끝낸 뒤 무엇이 계정에 남고, 다음 Run에서 무엇이 열리는가`

Meta가 Run 판단을 대체하는 자동 승리 장치가 되어서는 안 된다.

---

## ACTIVE META — EXACT STRUCTURE

Active long-term progression is:

1. **Store Growth** - Store Capital · permanent Decoration ownership · Decoration loadout
2. **Job Mastery / Boss progression** - successful-clear identity · Job×Boss matrix / distinct-Boss unlock roles

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

There is no Global Meta XP / account-XP reward path. None of these is progression truth: day-based Meta XP farming ·
XP earned merely for advancing Days · XP level as the master unlock gate · grade power bonuses derived from XP.

Day number alone grants `Job Mastery +0` and `Distinct Boss Clear +0`. No diligence/inactivity meter is added.

---

## JOB × BOSS CLEAR MATRIX

Persistent account state stores one boolean clear cell for each `Job ID × Boss ID`:
6 Jobs × 7 Bosses = 42 unique cells.

A cell becomes CLEAR only when:
1. the Run clears the Final Boss
2. at least one Final participant has that Job
3. that Job × Boss cell was not already cleared

- multiple Final participants sharing the same Job: that Job receives at most one matrix cell for the cleared Boss
- multiple distinct Jobs in the Final party: each represented Job may receive its own clear cell for that Boss
- Fail: no Job Mastery clear cell is awarded
- duplicate clear of an already-cleared Job × Boss pair: no additional Mastery, no stacking duplicate reward

---

## JOB MASTERY

Store Capital cannot buy Mastery. Decoration ownership cannot substitute for Boss CLEAR in the Job×Boss matrix.
Its active reward effect is the exact spawn-Level model below.

```text
Job Mastery = number of distinct Boss IDs cleared with that Job represented in the successful Final party   (0..7 per Job)
Total Job Mastery = sum of all six Job Mastery counts = 0..42
```

Job Mastery is Player-readable. The clear matrix is the source of truth; do not maintain an independent drifting counter.

### Successful-clear identity

```text
Job × Boss CLEAR
-> that Job's distinct Boss clear count
-> Job Mastery
```

- 6 Jobs × 7 Bosses = 42 possible Job×Boss clear cells
- Job Mastery is the job-specific successful conquest / permanent growth channel
- no failed Run directly increments Job Mastery

### Gameplay reward boundary

- no hidden generic Final multiplier
- no hidden account-wide combat multiplier
- no separate mastery-only combat Stat
- the Mastery power effect is visible and Job-specific

### Exact spawn-Level model

Job Mastery does **not** multiply Job Base Stats, multiply Job Growth, create a hidden account-wide combat bonus or
change an already-created NPC. It improves the chance that a newly generated NPC of that same Job arrives at a higher
starting Level. Mastery rank is the number of distinct Bosses cleared with that Job, from 0 through 7.

For each newly generated NPC:
1. resolve the ordinary spawn Level = max(1, randomInt(1, 3) + floor((Day − 1) × 0.4)) from DAY 5; randomInt(1, 2) with
   no Day term on DAY 1~4 (the opening roster and the first newcomers); the royal profile adds +3 (EVENT)
2. read Mastery for that NPC's Job
3. make one mutually exclusive Mastery bonus roll
4. add at most one of +1 / +2 / +3 Levels

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

The three columns are mutually exclusive outcomes, not stacking rolls. The Mastery roll belongs only to the NPC's own
Job; a Job's Mastery cannot affect another Job. For deterministic seeded comparison, the spawn path consumes the same
single Mastery roll even at Mastery 0; the row at 0 simply yields no bonus. After the bonus Level is resolved, the NPC is
an ordinary NPC of that final Level and uses the normal Job/Growth rules owned by NPC_TRAIT.

Player-facing meaning:
    해당 직업 숙련도가 높을수록 그 직업의 모험가가 더 높은 레벨로 등장할 수 있다.

Do not expose the exact probability table unless a later approved Meta information rule explicitly does so.

---

## DISTINCT BOSS CLEAR COUNT

Separate from the 42-cell Job matrix: `Distinct Boss Clear Count` = number of unique Boss IDs cleared at least once on
the account (0..7). Clearing the same Boss with another Job may add Job Mastery matrix progress but does NOT increase
Distinct Boss Clear Count again. This count owns the three approved content unlock gates.

---

## APPROVED UNLOCKS

### 1 distinct Boss clear
Unlock: `황금 1+1 쿠폰`

Before unlock the Item remains in canonical catalog data but is not eligible for normal appearance/acquisition; after
unlock it joins its normal canonical Item availability path. Item effect ownership -> ITEM.

### 3 distinct Boss clears
Unlock Job: `도적`

### 6 distinct Boss clears
Unlock Job: `광전사`

Before a Job unlock that Job is not eligible for normal NPC Job generation; after unlock it joins the normal Job pool
(Base/Growth identity owned by NPC_TRAIT).

Initial normal Job pool: `[전사,궁수,마법사,사제]`

No XP-based unlock exists.

---

## D10 / D14 PRODUCT UNLOCK — EXACT

D10:
- account permanent unlock: Premium Lunch
- unlock before that Run's D10 Offer generation; may appear in the same D10 Offer generation
- new Run still blocks appearance before D10
- account toast once; copy: `새 상품 해금 · 길드 특제 도시락`

D14:
- account permanent unlock: World Tree Amulet
- unlock before that Run's D14 Offer generation; may appear in the same D14 Offer generation
- new Run still blocks appearance before D14
- account toast once; copy: `새 상품 해금 · 세계수 생환부적`

Full Reset clears unlock + toast state. Run Abandon preserves unlock + toast state.
The Run that opens one records it, so its END lists it in `본사 해금` (UI_UX §END — REPLAY NUDGE).

---

## BEST DAY

Two account records, personal records for the END replay line (UI_UX §END — REPLAY NUDGE) only: no Power, unlock,
price or reward reads them.

- `bestDay`: the highest Day a Run has reached (0 on a fresh account)
- `bestSales`: the highest 총매출 a Run has ended with (0 on a fresh account) - the END settlement's own `총매출`
  (the Run's Gross Sales); when present it is a whole Gold amount, 0 or more

Both:
- set when a Run ends naturally (Run Fail, bankruptcy, Final): `bestDay = max(bestDay, the Run's Day)`,
  `bestSales = max(bestSales, the Run's 총매출)`
- a manual 현재 지점 포기 never reaches the ending, so it never moves either
- the Run keeps the value it replaced, so a reload of the ended Run reads the same comparison
- Full Data Reset clears them; a save without one reads 0

---

## BOSS LOG

`bossLog` on the account records which Boss facts the Player has been shown, for 도감 > 마왕 (UI_UX §도감 > 마왕) only: no Power, unlock, price or reward reads it.

- `bossLog[bossId] = {identity?, trait?}`, booleans; `identity` is set when the D5 report is acknowledged, `trait` (with `identity`) when the D15 report is
- a Boss with a past clear on any job reads as fully known, with or without a log entry
- a save without `bossLog` reads empty; when present, only known Boss ids with those two boolean keys are valid
- Full Data Reset clears it; a manual 현재 지점 포기 keeps it

---

## MONSTER KNOWLEDGE

Monster/Family Knowledge is cross-run and keeps the supplied-survival rule. Gain only when:
1. NPC enters the expedition with >=1 supplied Item
2. that expedition returns without `사망`

Then `that Family Knowledge += 1`. No supplied Item -> +0. Death -> +0.

No screen shows Monster Knowledge (there is no codex `몬스터 지식` tab; every Gate's Hazards are public from MORNING).
The record stays on the account; it unlocks and changes nothing.

Monster Knowledge is separate from Job Mastery and Distinct Boss Clear Count.

---

## FIRST CLEAR / META POWER BOUNDARY

WRATH/Boss balance may assume strong player mastery, Run growth, preparation, and Relic build quality. It may not assume
a Job Mastery reward that itself requires a previous Boss clear in order for the first Boss clear to be possible.

- first Boss clear remains possible at Job Mastery 0
- failed Runs do not automatically grant a new permanent Stat/Power currency
- no generic account-wide combat multiplier is added
- existing Monster Knowledge / unlock / player-learning channels remain as currently owned

If first-clear full-run evidence shows the game is too hard, report a balance finding before inventing new Meta power.

---

## CROSS-RUN POWER BOUNDARY

Forbidden: Hall of Fame dependency · legendary-adventurer cameo requirement · hidden account-wide combat multiplier ·
hidden Boss-clear damage multiplier · permanent NPC identity carryover between Runs

Permitted: Monster Knowledge · approved content unlocks · Job × Boss Mastery matrix

```text
permanentCombatPowerMeta=JOB_MASTERY_ONLY_IF_EXPLICIT_AND_VISIBLE
```

---

## POWER / INFLATION BOUNDARY

Decoration effects operate through store/economy/access channels. Do not turn the system into generic NPC +Power,
generic +all Stats, direct Death-rate reduction, direct Boss damage or unlimited permanent passive stacking.

Adding more owned Decorations does not increase the maximum number of active Slots.

## STORE CAPITAL

`점포 자본` is one persistent Account resource. It may be spent only on permanent Decoration purchases.

It may not pay for: ordinary ORDER · Reroll · Relic / 점포지원 · Deep sponsorship · NPC purchase · Final preparation ·
any other Run-internal transaction.

### Run-end settlement structure

For an eligible completed Run:

```text
Gross Sales
= the Run's accumulated actual sales revenue

Store Capital Gain
= round(Gross Sales × Day-reach conversion rate)
```

Gross Sales is the existing sales-accounting truth already used by the Run. It includes actual ordinary sales and any
Final fixed-price transfers that count toward Gross Sales, exactly once. Do not create a second Meta-only sales counter.

```text
Gross Sales = how much business the store actually did
Reached Day = how long that business survived
```

A normal Run may earn Store Capital even when it ends in bankruptcy, Death-limit closure, or Final failure. Those remain
real Run failures: Run Gold, Inventory, adventurers and Run-scoped Store Build are still lost; they do not erase the
store-operation progress already demonstrated by actual sales and survival depth.

Ending Gold and remaining Inventory liquidation value are **not Store Capital inputs**: they matter inside the Run
(liquidity, rescue, bankruptcy), but Meta does not reward the same end-state wealth a second time.

- Manual Run Abandon / explicit early retirement grants `Store Capital Gain = 0`
- a Run with `Gross Sales = 0` earns `Store Capital Gain = 0` regardless of reached Day (no inactivity / no-sale farming)
- Boss CLEAR does not multiply Store Capital settlement; Boss success progression is owned by Job Mastery

### Day-reach conversion rate — EXACT

`DIRECTOR DOCUMENT BASELINE`

```text
D1-9    = 1%
D10-19  = 2%
D20-24  = 3%
D25-29  = 3%
D30     = 3%
```

The top of the table is flat: a player who reaches D30 every Run would otherwise fill all four Slots within a few Runs, and
the longer Run still earns more through its larger Gross Sales. The band is the Day the Run actually reached. Boss CLEAR does not multiply it. Buying a Decoration inside the first Run
is not a goal.

### Approved progression expectation

Measured with `reader`, the main bot every progression and balance reading is taken with (`expert`, reader plus the
User's habits on the User's account, is its upper reference); 40 trajectories of 12 Runs, 훈련소 제휴 간판 first then cheapest
first:

```text
1st Decoration : around Run 4
all four Slots : around Run 9

reader : Run 4 / 5 / 7 / 9
expert : Run 4 / 6 / 7 / 9
```

The four Slots fill by Run 10-11 at the latest, and a Boss clear becomes worth attempting after that. Collecting both
Decorations of every Slot is a longer tail beyond Run 11.

Requirements:
- D30 / Boss CLEAR is not required to buy any Decoration
- no Decoration may be a forced first purchase - the growth rate must not collapse when a different reasonable order is taken
- early hoarding, inactivity and deliberate short-run farming must not outperform engaged play as a Store Capital strategy

## DECORATION COLLECTION / LOADOUT

Decoration ownership and Decoration activation are separate.

- purchase once -> owned permanently
- each Decoration has exactly one fixed `slot`
- each Slot may own multiple Decorations over time
- at most one owned Decoration per Slot is active for a Run
- active loadout is chosen before the Run begins and is fixed after Run start
- empty Slot = no effect
- unowned Decoration cannot be equipped
- a loadout entry holding a Decoration on a Slot it does not belong to leaves that Slot empty; ownership is kept

Active Slot set: `sign` · `wall` · `counter` · `display`

Each Slot holds three Decorations: an economy Decoration, a survival / combat alternative and an 운영형 (operation)
Decoration. A Slot wears exactly one, so the pick is a choice between running the store, keeping its people alive and
what 본사 sends. Account/Save/data/UI structures must not assume a fixed count per Slot.

The Decoration system adds no Decoration levels, upgrades, rarity ladder, random Decoration shop or free-placement
furniture editing.

Decoration ids and art files read as the current names: `sponsorSign`, `honorFrame`, `guildShelf`, `thriftSafe`,
`trainingSign`, `infirmaryPlaque`, `memorialBook`, `aidCabinet`, `heroSign`, `cheerBanner`, `voucher`, `rerollCoupon`.

## INITIAL FOUR DECORATIONS — EXACT EFFECT IDENTITY

These reuse existing Start Contract positive implementation channels.

A Decoration is its own system and never shares identity with a 점포지원 Relic. Granting a Decoration effect must not
inject a Relic id into the Run's facilities, mark a Relic as owned, remove a Relic from a purchase window, or consume one
of the Run's Relic slots. A Decoration and a Relic that touch the same quantity simply both apply.

### sign — 원정 지원금 간판 (id sponsorSign)
```text
each visiting adventurer: an extra purchase budget of 50% of their current purse, that visit only
```

It is the Event `추가 구매` channel (the same budget the purse-share Event grants): it is spent before the purse, never
taken from it, and is gone at the end of the Day, so nothing compounds. On a Day whose Event also grants 추가 구매, the
two shares add.

### wall — 명예 모험가 액자 (id honorFrame)
```text
rare-NPC rarity weights = [40, 32, 18, 8, 2]
rarity order = Common / Uncommon / Rare / Epic / Legendary
```

Every grade above 평범 is lifted (ordinary [60, 27, 10, 2.5, 0.5]; above 평범 40% -> 60%), 영웅 and 전설 the most. This
reuses the existing Premium spawn-weighting channel. It changes only the rarity weights used by the ordinary NPC spawn
rarity draw when the Decoration is active; it adds no extra spawn, no extra rarity roll and no new Gameplay RNG draw.

### counter — 알뜰 금고
```text
each Day, the first two customers to reach the counter: Wallet +200G each (cap 2000)
```

Twice a Day, on those customers' arrivals with the other arrival Wallet bonuses; it pays the customer, not the Store, so it
has no receipt row.

### display — 길드 추천 매대 (id guildShelf)
```text
each Morning, 35% chance of visitors +1
```

The roll happens once per Morning, alongside the ordinary visitor generation, and is independent of every other visitor
source. It is a chance, not a guarantee: most Days it adds nothing.

These Decorations carry none of the Start Contract negative sides: no +5% ORDER purchase penalty, no +20G / +25G
operating-cost penalty, no rare-ORDER reduction penalty.

## SURVIVAL / COMBAT ALTERNATIVES — EXACT EFFECT IDENTITY

One per Slot, beside that Slot's economy Decoration. The survival alternative with the larger measured effect sits in
the dearer Slot.

### sign — 훈련소 제휴 간판 (id trainingSign)
```text
every adventurer created while it is worn: 55% chance of spawn Level +1
```

### wall — 의무실 현판
```text
an adventurer who arrives with an ordinary Injury (not 중상) is healed on arrival with 40% chance
```

One roll per injured arrival, drawn only while the Decoration is worn. A heal sets Injury 0 and is shown on the SALE
counter and counted in the Day's record (UI_UX owns the presentation).

### counter — 추모 방명록 (id memorialBook)
```text
every segment Death limit +1 (5 / 8 / 11 -> 6 / 9 / 12; CORE_RUN §DEATH LIMIT — SEGMENTED)
```

It resolves after 귀환석 / 세계수 생환부적, so carried Insurance is never wasted by it, and the RESULT-PROOF
counterfactual reads the same availability.

### display — 구급품 진열장 (id aidCabinet)
```text
while worn, an adventurer who departs 만반의 준비: 투력 × 1.05, and preparedFactor 0.80 -> 0.60
(DUNGEON_HAZARD §Preparation / Level Death reduction)
```

Only an adventurer who departs 만반의 준비 (healthy, Fatigue under 20, 2 Items in the Bag) is helped, on an ordinary
expedition (not the Final): the prepared 투력 is × 1.05 before the combat roll, and the failure Death roll is judged against
failureDeathChance × 0.60. No count, no new roll; the SALE outlook and `실패 시 사망 위험` stay the pre-supply readings. The
RESULT-PROOF counterfactual reads the same two terms.

## OPERATION DECORATIONS — EXACT EFFECT IDENTITY

운영형: each is something 본사 did for the store. One per Slot, beside that Slot's other two. They change how the
점포지원 window is drawn or priced, or reach every adventurer; they never inject a Relic id, mark a Relic as owned or take
a Relic slot (the boundary above holds).

### sign — 본사 특별 지원 간판 (id heroSign)
```text
the DAY 0 free 점포지원 pick is drawn from 영웅 (3 cards) instead of 일반
```

Only the DAY 0 window; every later window draws its grades as RELIC §GRADE says.

### wall — 단골 감사 현수막 (id cheerBanner)
```text
투력 × (1 + floor(단골도 / 10) × 3%)
```

Applied where 구급품 진열장's 투력 bonus is, on every expedition and on the Final party's snapshots. The RESULT-PROOF
counterfactual reads the same term.

### counter — 휴식 바우처 꽂이 (id voucher)
```text
every Night: every living adventurer's Fatigue -3 (visitors or not, 중상 recovery included; floor 0)
```

### display — 지원 교환 쿠폰함 (id rerollCoupon)
```text
each 점포지원 window: the first candidate reroll is free, then 300G, 600G ... (RELIC §CANDIDATE REROLL from its first step)
```

### Prices — EXACT

`DIRECTOR DOCUMENT BASELINE` (cheapest 500, dearest 3×, total 3,750; sign 1250 -> 1500 User 2026-10-03, money gathers faster late)

```text
sign    원정 지원금 간판 / 훈련소 제휴 간판 / 본사 특별 지원 간판   1500 Store Capital
wall    명예 모험가 액자 / 의무실 현판 / 단골 감사 현수막          1000 Store Capital
counter 알뜰 금고 / 추모 방명록 / 휴식 바우처 꽂이               750 Store Capital
display 길드 추천 매대 / 구급품 진열장 / 지원 교환 쿠폰함         500 Store Capital
```

Every Decoration of a Slot costs the same, so price never decides between them. The display Slot is the cheapest so a
first Decoration is the earliest within reach.

## STORE-GROWTH VISUAL PROJECTION — PRESENTATION ONLY

Store-growth presentation may project already-owned/current state into the live store through UI_UX_v2.8.0.md,
including equipped Decorations, alongside run-state traces owned by other current Specs (Store Support, Trusted
Regular, revealed Final-preparation state).

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

Per-Run numbers may fluctuate with RNG; the required signal is an aggregate cross-run progression trend, not strict
monotonicity every Run. Fresh Store remains capable of first clear.

## BALANCE GATE

The Store Capital rate table is the current `DIRECTOR DOCUMENT BASELINE`. The rate table, the Decoration prices and the
Decoration effects are set together with the Run balance (evidence: `archive/v2.9.1-balance/v29-balance-ideal.md`).

Validation must confirm:
- ordinary engaged play produces meaningful Store Capital at the approved cadence
- both reasonable initial purchase orders remain near the approved acquisition expectation
- no-sale / inactivity / deliberate short-run farming remains inefficient
- overcharge-heavy play does not become the dominant Meta strategy merely by inflating Gross Sales
- Run-internal bankruptcy / Death / Final balance does not change as a side effect

If validation produces a Balance Finding, report it and stop. Do not auto-tune the rate table, Decoration prices, or
unrelated Run balance.

## RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE

Retired from active gameplay: Franchise Grade · ten Franchise Achievements · Grade ORDER discount · Grade-based Start
Contract unlocks · Start Contract selection.

Their final v2.7 Source/Design implementation is preserved, not deleted, under:

```text
archive/inactive/v2_7_franchise/
```

The archive identifies:

```text
STATUS = INACTIVE_ARCHIVE
RUNTIME_IMPORT = FORBIDDEN
DESIGN_AUTHORITY = HISTORICAL_ONLY
```

It includes the final v2.7 achievement definitions/baselines, Grade ladder/discount, Start Contract data/effects,
progress readout rules, and Achievement toast behavior needed to understand or revive that design later.

Active Runtime must not:
- import the archive
- derive Grade
- apply Grade discount
- increment retired Franchise counters
- emit retired Achievement/Grade UI or toasts
- gate active content through retired Franchise state

Existing account payload fields may remain dormant if data preservation makes that the smaller safe implementation, but
dormant fields have zero active effect and receive no new progress.

## PRE-RELEASE COMPATIBILITY POLICY — EXACT

All current v2.x builds are internal development / test builds. The external-public-release target is:

```text
v3.0.0
```

Current internal v2.x builds do **not** spend implementation complexity preserving compatibility with older internal
test Account/Meta saves whose schema or semantic meaning changed.

For Save v9 (CORE_RUN §SAVE v9 — EXACT):

```text
v1~v8 Run state
-> no migration

v1~v8 Account/Meta state
-> no migration into v9

v9
-> initialize fresh current Account/Meta + fresh current Run
```

Rules:
- do not preserve old Franchise Grade / Start Contract availability by compatibility shim
- do not preserve old Job Mastery / Boss matrix / Monster Knowledge merely for internal-test continuity
- do not add conversion logic for retired or changed-semantics Meta fields
- legacy bytes may remain physically present until the existing reset/storage policy removes them, but they are not imported into current v9 progression
- once v9 exists, current-version Save behavior follows current v9 owners
- Full Data Reset still clears current game-owned Account/Meta data

Purpose: keep the internal development line simple before the v3.0.0 external-release compatibility boundary.

## SAVE / ACCOUNT PERSISTENCE

Cross-run account persistence must preserve:
- 42 Job × Boss clear cells
- 7 Boss-cleared flags or equivalent derived set
- approved unlock state derivable from Distinct Boss Clear Count
- Monster Knowledge progress
- the best Day and the best 총매출 (§BEST DAY)

Run save and account Meta state may use separate storage structures.

No reload may: duplicate a Boss clear reward · set one matrix cell more than once · inflate Distinct Boss Clear Count
with a duplicate Boss · relock already earned approved content.

Derived values should be derived from source-of-truth sets/matrix where practical.

`account.unlocks`: required current unlock keys are validated as booleans; malformed shape is invalid, not silently coerced.

Old save bytes are not automatically deleted merely because they cannot be continued. Full Data Reset is the explicit
deletion action.

### FULL DATA RESET vs ABANDON
- **Full Data Reset**: Run, Account/Meta, Tutorial, D10/D14 해금/Toast 모두 Fresh 초기화.
- **현재 지점 포기(Abandon)**: Run만 초기화. Account/Meta, Tutorial, 해금 상태는 유지. 포기 직후 영업이 없는 새 점포 준비 화면으로 돌아오며, 거기서 장식 구매·장착이 가능하다.

## SAVE RELATIONSHIP

`CORE_RUN_v2.8.0.md` owns: v9 Run schema · legacy Save rejection / fresh v9 initialization · start stock ·
D25 persisted Final state · fresh-account tutorial reset boundary.

META owns: current v9 Account/Meta truth · Job Mastery / Job×Boss matrix.

No v1~v8 Account/Meta migration path is required for this internal-development version.

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

Core identity -> SPEC_INDEX §GAME CORE
Run timing / Run save -> `CORE_RUN_v2.8.0.md`
Decoration UX -> `UI_UX_v2.8.0.md`
Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
Gate / Hazard / monster family knowledge -> `DUNGEON_HAZARD_v2.8.0.md`
Item Counter / item unlock/effect -> `ITEM_v2.8.0.md`
Job growth -> `NPC_TRAIT_v2.8.0.md`
Boss clear signal -> `BOSS_v2.8.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.8.0.md`
copy -> `COPY_WORLD_VOICE_v2.8.0.md`
