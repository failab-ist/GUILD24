# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,franchise_achievement,unlock,monster_knowledge,cross_run,account_save
DOC_VERSION=2.7.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Meta progression, unlock, Job Mastery, Start Contract, Monster Knowledge, Full Reset, and Run Abandon rules inherit `META_v2.6.1.md` and its declared base.

The inherited Franchise Grade source is superseded by this patch.
Franchise Grade no longer derives from Total Job Mastery.

This patch aligns Meta with v2.7 Save generation, separates Franchise Grade from Job Mastery, defines the dedicated Franchise Achievement track, and explicitly rejects adding a generic fail-to-power Meta currency merely to lower first-clear difficulty.

## PRE-RELEASE COMPATIBILITY POLICY — EXACT

All current v2.x builds are internal development / test builds.
The current external-public-release target is:

```text
v3.0.0
```

Therefore v2.7 does **not** spend implementation complexity preserving compatibility with older internal test Account/Meta saves whose schema or semantic meaning changed.

For v2.7 Save v8:

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

## JOB MASTERY — CLEAR PROGRESSION REMAINS SEPARATE

Job Mastery keeps its existing successful-clear identity:

```text
Job × Boss CLEAR
-> that Job's distinct Boss clear count
-> Job Mastery
```

Rules:
- 6 Jobs × 7 Bosses = 42 possible Job×Boss clear cells
- Job Mastery remains the job-specific successful conquest / permanent growth channel already owned by the inherited Meta/NPC design
- Franchise Grade no longer reads Total Job Mastery as its progression source
- no failed Run directly increments Job Mastery

Distinct Boss Clear unlocks already owned by the inherited Meta design remain unchanged unless separately amended.

## FRANCHISE GRADE — DEDICATED ACHIEVEMENT SOURCE

Franchise Grade now derives from completion of exactly **10 dedicated Franchise Achievements**.

Each achievement is binary and contributes exactly one completion.
Do not award additional Franchise Grade progress for repeating an already-completed achievement.

Exact grade progression:

```text
0 / 10 = base Franchise Grade
2 / 10 = Franchise Grade +1 step
4 / 10 = Franchise Grade +1 step
6 / 10 = Franchise Grade +1 step
8 / 10 = highest functional Franchise Grade
10 / 10 = final honor grade: 전설의 편의점
```

The existing Start Contract availability role remains attached to Franchise Grade.
All functional Franchise Grade / Start Contract progression must be available by 8/10.

`전설의 편의점` at 10/10 is a completion/honor grade:
- no new generic combat Stat layer
- no new post-completion permanent combat multiplier
- no requirement to create another functional Start Contract solely because 10/10 exists

## FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE — EXACT

`DIRECTOR DOCUMENT BASELINE`

Franchise Grade carries one always-applied passive: a discount on the ORDER purchase price the
Player actually pays.

```text
Grade 1 =   0%
Grade 2 =  -2%
Grade 3 =  -4%
Grade 4 =  -6%
Grade 5 =  -8%
Grade 6 = -10%
```

Applies to:
- the ORDER offer price the Player actually pays for stock
- applied AFTER the existing Contract / Event / Offer price calculation
- rounding REUSES the existing ORDER price rounding rule; no second rounding convention
- promotional offers are included on the same terms

Does not apply to:
- Reroll
- Relic / 점포지원 purchase
- Deep Expedition sponsorship
- Final NPC transfer price
- any other non-ORDER cost

Rules:
- no new Passive Tree and no separate progression system is created for this
- the existing Franchise Grade UI shows only the current ORDER discount rate; no new screen
- this is an economy channel through the existing Franchise Grade, not a raw-Stat currency, so
  it does not violate the `FIRST CLEAR / META POWER BOUNDARY` prohibition on a generic
  account-wide combat multiplier

## FRANCHISE ACHIEVEMENTS — CURRENT APPROVED SET

Use exactly the following ten achievement directions.
Do not add duplicate lower/upper versions of the same task merely to inflate Franchise Grade count.

| # | Franchise Achievement | Represents |
|---:|---|---|
| 1 | 누적 판매 **80회** | 기본 영업 |
| 2 | 150% 판매 누적 **20회 성공** | 가격 판단 |
| 3 | 재방문 NPC에게 누적 **20회 판매 성공** | 단골 / 장기 관계 |
| 4 | 유물 누적 **15개** 구매 | 점포 성장 |
| 5 | 5개 Dungeon Family 모두에서 보급 생환 달성 | 던전 대응 경험 |
| 6 | 한 Run에서 만료 폐기 0개로 **DAY 25 도달** | 발주 / 재고 관리 |
| 7 | 한 Run에서 사망자 0명으로 Final 도달 | 원정 운영 |
| 8 | Final 출전 NPC 전원에게 실제 보급을 완료한 뒤 Boss CLEAR | Final 준비 |
| 9 | 한 Run에서 **Gross Sales 10,000G 이상** 달성 + Boss CLEAR | 종합 경영 |
| 10 | 6 Job × 7 Boss = Job×Boss Matrix 42 / 42 CLEAR | 완전 정복 |

### FRANCHISE ACHIEVEMENT NUMERIC BASELINES

`DIRECTOR DOCUMENT BASELINE`

The exact values for the first v2.7 Balance Fix are:

```text
Achievement 1 = cumulative successful sales 80
Achievement 2 = cumulative successful 150% sales 20
Achievement 3 = cumulative successful sales to returning NPCs 20
Achievement 4 = cumulative Relic purchases 15
Achievement 6 = zero expiry waste through DAY 25
Achievement 9 = one-Run Gross Sales 10,000G + Boss CLEAR
```

Tuning intent for this baseline:

- 1 / 3 / 4 are the cumulative-record layer, reachable within roughly 10 Runs of ordinary
  repeated play
- 6 is a stock-management result measured through DAY 25
- 7 is the first achievement that requires surviving to the Final
- 8 / 10 remain the upper Final / Boss / complete-conquest tier

The superseded first-adoption values were 1 = 100, 3 = 30, 4 = 30, and 6 = zero expiry waste
to the Final. They are recorded here only so an older save or report is legible; the values
above are the ones to implement.

These values are intentionally **baseline tuning values**, not permanent untouchable canon.
They must be implemented as written for the first v2.7 adoption / frozen QA pass.

Full-run QA may report a `BALANCE FINDING` when evidence shows that a baseline is materially too trivial, too grindy, or clusters too many Franchise completions into the same narrow play window.
After that finding:

```text
QA evidence
-> Director/User review
-> approved META owner update
-> separate implementation/fix cycle
```

QA / WORK may not silently auto-tune these numbers merely to make the track feel better or to turn a FAIL into PASS.

Interpretation boundaries:
- cumulative achievements may span Runs because they represent account-level play history
- one-Run achievements must be satisfied within one Run exactly as written
- Achievement 6 settles the moment the Run reaches DAY 25 with cumulative expiry waste of 0,
  counting the DAY 25 expiry sweep itself. It is awarded immediately at that point, and later
  waste in the same Run never revokes an achievement already earned - the binary,
  account-persistent rule is unchanged
- Achievement 5 recognizes actual supplied survival across all five Dungeon Families; it must not require a hidden Relic/build taxonomy
- Achievement 8 requires every selected Final participant to receive at least one actual valid Final-preparation Item transfer before that Boss is cleared
- Achievement 10 is intentionally the hardest long-term requirement and cannot be substituted by another achievement or point source

## FRANCHISE PROGRESS READOUT — SINGLE SOURCE

The five cumulative Achievements (1-5) each carry a running count alongside their target, so a
readout can state how far an account has come rather than only that it has not arrived.

```text
Achievement 1  current / 80
Achievement 2  current / 20
Achievement 3  current / 20
Achievement 4  current / 15
Achievement 5  current / 5
```

Achievements 6-10 are a Run result rather than a tally. They carry no running count and report
only the completion verdict.

Rules:
- the current value and the target MUST come from the same list that judges the Achievement.
  No screen, harness or report may hold its own copy of a threshold.
- a current value is capped at its own target: a completed Achievement reads `80 / 80`, never
  a number past it. Repeating a completed Achievement still adds nothing.
- Franchise Grade requirement has one truth, read from both ends - the count a Grade costs, and
  the Grade a count buys:

```text
Grade 1 =  0 / 10
Grade 2 =  2 / 10
Grade 3 =  4 / 10
Grade 4 =  6 / 10
Grade 5 =  8 / 10
Grade 6 = 10 / 10
```

  Any progress shown toward a Grade-gated unlock MUST count Franchise Achievements against this
  table. Reading a different counter is a defect even when the displayed step happens to agree:
  the pre-v2.7 source measured Start Contracts against Total Job Mastery, so the board could
  report a Contract as still locked while the Contract was already open.

Presentation placement, wording and the completion cue -> `UI_UX_v2.7.0.md`.

## FRANCHISE ACHIEVEMENT DESIGN FILTER

Franchise Achievements must recognize normal visible core play rather than manufacture achievement-only behavior.

Use:

```text
normal visible game action / meaningful Run result
> hidden optimization pattern created only for an achievement
```

Avoid:
- Relic-synergy labels or build-piece taxonomies not represented as an actual player system
- duplicate lower/upper milestones of the same accomplishment
- a chain of trivial Day-reach achievements that one good Run clears at once
- requirements whose only purpose is to make an achievement exist

Cumulative counts are allowed where the counted action is itself a real active game action, such as successful sales or Relic purchases.
Not every achievement is cumulative.

## FIRST CLEAR / META POWER BOUNDARY

WRATH/Boss balance may assume strong player mastery, Run growth, preparation, and Relic build quality.
It may not assume a Job Mastery reward that itself requires a previous Boss clear in order for the first Boss clear to be possible.

Therefore:
- first Boss clear remains possible at Job Mastery 0
- failed Runs do not automatically grant a new permanent Stat/Power currency
- no generic account-wide combat multiplier is added
- Franchise Achievement / Grade progress may advance from valid non-clear accomplishments, but this progression acts through the existing Franchise Grade / Start Contract channel rather than a new permanent raw-Stat currency
- existing Monster Knowledge / unlock / player-learning channels remain as currently owned
- Job Mastery power, when available after clears, stays inside its existing Job Base/Growth channel

If first-clear full-run evidence later shows the game is too hard, report a balance finding before inventing new Meta power.

## IMPLEMENTATION-BLOCKING UNRESOLVED

```text
NONE
```

The numeric Franchise baselines remain QA-tunable only through the approved `BALANCE FINDING -> User/Director approval -> owner update -> separate fix cycle` process.
They are not implementation-blocking unresolved items.

## v2.7 SAVE RELATIONSHIP

`CORE_RUN_v2.7.0.md` owns:
- v8 Run schema
- legacy Save rejection / fresh v8 initialization
- start stock
- D25 persisted Final state
- fresh-account tutorial reset boundary

META owns:
- current v8 Account/Meta truth
- Job Mastery / Job×Boss matrix
- Franchise Achievement completion state
- Franchise Grade derivation from achievement completion count

No v1~v7 Account/Meta migration path is required for this internal-development version.

## RELATED

Run/save -> `CORE_RUN_v2.7.0.md`
Job growth/mastery effect channel -> `NPC_TRAIT_v2.7.0.md`
Boss clear signal -> `BOSS_v2.7.0.md`
Ordinary sale signals -> `SALE_v2.7.0.md`
Relic purchase signal -> `RELIC_v2.7.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.7.0.md`
