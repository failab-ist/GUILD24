# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,franchise_achievement,unlock,monster_knowledge,cross_run,account_save
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Meta progression, unlock, Job Mastery, Start Contract, Monster Knowledge, Full Reset, and Run Abandon rules inherit `META_v2.6.1.md` and its declared base.

The inherited Franchise Grade source is superseded by this patch.
Franchise Grade no longer derives from Total Job Mastery.

This patch aligns Meta with v2.7 Save generation, separates Franchise Grade from Job Mastery, defines the dedicated Franchise Achievement track, and explicitly rejects adding a generic fail-to-power Meta currency merely to lower first-clear difficulty.

## SAVE v8 ACCOUNT CONTRACT

v2.7 current save generation is v8.
Run-state compatibility is owned by `CORE_RUN_v2.7.0.md`.

Exact:
- v1~v7 **Run state** cannot continue as a v2.7 Run
- old save bytes are not silently deleted merely because v8 cannot continue that Run
- Full Data Reset remains the explicit user action that clears game-owned Account/Meta data
- v2.7 does not silently reinterpret an old Account/Meta field when its design meaning changed

### V7 -> V8 ACCOUNT PRESERVATION — EXACT WHERE SEMANTICS ARE UNCHANGED

When no valid current v8 save exists and a valid current v7 save is available:

```text
validated v7 Account/Meta state with unchanged v2.7 meaning
-> carry forward into v8 Account/Meta

v7 Run state
-> do not migrate
-> start a fresh v8 Run
```

Preserve validated Account/Meta progression whose meaning remains unchanged, including current:
- Job × Boss clear matrix / derived Job Mastery
- distinct Boss clear progression
- Monster Knowledge
- approved unlock state whose semantic requirement is unchanged
- other currently validated Account/Meta flags required by unchanged systems

Do **not** blindly preserve the old Franchise Grade value as the new v2.7 Franchise Grade, because its source changes from Total Job Mastery to dedicated Franchise Achievement completion count.
The exact v7 -> v8 treatment for already-earned Franchise Grade / Start Contract availability is listed under `IMPLEMENTATION-BLOCKING UNRESOLVED` below and must be approved before v2.7 Source adoption.

Rules:
- this is Account/Meta preservation only, not v7 Run continuation
- retired v7 Run inventory/NPC/Bag/Final state is not copied into v8
- do not partially coerce malformed v7 Account/Meta fields into valid progression
- if the v7 Account/Meta payload does not pass its current validation, do not claim that progression was migrated
- legacy v7 bytes are not silently deleted by the import
- once a valid v8 save exists, normal loading uses v8 and does not repeatedly re-import v7
- no automatic v1~v6 Account/Meta import is added by this v2.7 rule

Ordinary same-version behavior remains:
- Run Abandon preserves Account/Meta
- Full Data Reset clears Account/Meta

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

## FRANCHISE ACHIEVEMENTS — CURRENT APPROVED SET

Use exactly the following ten achievement directions.
Do not add duplicate lower/upper versions of the same task merely to inflate Franchise Grade count.

| # | Franchise Achievement | Represents |
|---:|---|---|
| 1 | 누적 판매 N회 | 기본 영업 |
| 2 | 150% 판매 누적 N회 성공 | 가격 판단 |
| 3 | 재방문 NPC에게 누적 N회 판매 성공 | 단골 / 장기 관계 |
| 4 | 유물 누적 30개 구매 | 점포 성장 |
| 5 | 5개 Dungeon Family 모두에서 보급 생환 달성 | 던전 대응 경험 |
| 6 | 한 Run에서 만료 폐기 0개로 Final 도달 | 발주 / 재고 관리 |
| 7 | 한 Run에서 사망자 0명으로 Final 도달 | 원정 운영 |
| 8 | Final 출전 NPC 전원에게 실제 보급을 완료한 뒤 Boss CLEAR | Final 준비 |
| 9 | 한 Run에서 목표 총매출 달성 + Boss CLEAR | 종합 경영 |
| 10 | 6 Job × 7 Boss = Job×Boss Matrix 42 / 42 CLEAR | 완전 정복 |

Interpretation boundaries:
- cumulative achievements may span Runs because they represent account-level play history
- one-Run achievements must be satisfied within one Run exactly as written
- Achievement 5 recognizes actual supplied survival across all five Dungeon Families; it must not require a hidden Relic/build taxonomy
- Achievement 8 requires every selected Final participant to receive at least one actual valid Final-preparation Item transfer before that Boss is cleared
- Achievement 10 is intentionally the hardest long-term requirement and cannot be substituted by another achievement or point source

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

The following values/semantics are intentionally **not invented** and require User approval before v2.7 Source adoption of this Meta change:

1. Achievement 1 `누적 판매 N회` exact N
2. Achievement 2 `150% 판매 누적 N회 성공` exact N
3. Achievement 3 `재방문 NPC에게 누적 N회 판매 성공` exact N
4. Achievement 9 `한 Run 목표 총매출` exact Gold threshold
5. v7 -> v8 handling of previously-earned old-semantics Franchise Grade / Start Contract availability after Franchise Grade source changes to Achievement count

Until resolved, WORK must not guess these values or migration semantics.

## v2.7 SAVE RELATIONSHIP

`CORE_RUN_v2.7.0.md` owns:
- v8 Run schema
- old Run continuation boundary
- start stock
- D25 persisted Final state

META owns:
- Account/Meta truth
- Job Mastery / Job×Boss matrix
- Franchise Achievement completion state
- Franchise Grade derivation from achievement completion count
- v7 -> v8 Account/Meta preservation policy

Do not duplicate retired Item-ID migration or Final-state repair logic here.

## RELATED

Run/save -> `CORE_RUN_v2.7.0.md`
Job growth/mastery effect channel -> `NPC_TRAIT_v2.7.0.md`
Boss clear signal -> `BOSS_v2.7.0.md`
Ordinary sale signals -> `SALE_v2.7.0.md`
Relic purchase signal -> `RELIC_v2.7.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.7.0.md`
