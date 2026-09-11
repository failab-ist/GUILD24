# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,unlock,monster_knowledge,cross_run

DOC_VERSION=2.5.0
CANONICAL_SET=GUILD24_CANONICAL_v2.5.0
FREEZE_STATUS=FROZEN
NUMERIC_STATUS=PASS3_WHERE_MARKED

## ROLE

META =
`Run을 끝낸 뒤 무엇이 계정에 남고, 다음 Run에서 무엇이 열리는가`

v2.5는 legacy Global Meta XP를 제거하고
Boss clear 기반 Job Mastery를 중심 Progression으로 사용한다.

Meta가 Run 판단을 대체하는 자동 승리 장치가 되어서는 안 된다.

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

franchiseGrade=RETAINED
franchiseGradeSource=totalJobMastery
franchiseGradeGameplayEffect=NONE

---

## GLOBAL META XP REMOVAL

The previous Global Meta XP / account-XP reward path is not part of v2.5 Canonical.

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

### Gameplay reward boundary

Job Mastery permanent Job power, when numerically activated by the PASS3 table, must remain inside the Job identity channel:
```text
JOB = Base Stats + Growth
```

Ownership -> NPC_TRAIT.

Rules:
- no hidden generic Final multiplier
- no hidden account-wide combat multiplier
- no separate mastery-only combat Stat
- the Mastery power effect is visible and Job-specific

Exact Base/Growth Mastery adjustment table=PASS3_AFTER_JOB_BASE_GROWTH_REBALANCE.
This is numeric tuning; it does not permit a new power subsystem.

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

No other legacy XP/Grade unlock is silently retained.

---

## FRANCHISE GRADE

Franchise Grade is retained as account prestige/status.

Source:
```text
Total Job Mastery
```

Rules:
- Grade does not directly modify combat
- Grade does not directly modify NPC Stats
- Grade does not directly modify economy
- Grade does not directly modify Relic power
- Grade does not directly modify Item power
- Grade is not the gate for the approved 1/3/6 Boss-clear unlocks

Existing Source behavior that gives Grade direct gameplay bonuses is legacy and must be removed/reassigned only when another owning Canonical explicitly says so.

Exact display-grade thresholds=PASS3_PRESENTATION_TUNING.
Changing display thresholds must not change the 1/3/6 unlock rules.

Start Contract / Store Type sidegrade expansion is not added by implication here.
Until separately approved in an owning Canonical, legacy Grade-gated contract/store-type gameplay is not Canonical v2.5 behavior.

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

Player-facing progress term:
```text
보급 생환 N회
```

Do not use:
```text
관찰 N회
```

Monster Knowledge is separate from Job Mastery and Distinct Boss Clear Count.

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
- explicit visible Job Mastery Base/Growth adjustment owned by NPC_TRAIT
- Franchise Grade prestige/status

Thus the old blanket rule `permanentCombatPowerMeta=NO` is replaced by:
```text
permanentCombatPowerMeta=JOB_MASTERY_ONLY_IF_EXPLICIT_AND_VISIBLE
```

---

## SAVE / ACCOUNT PERSISTENCE

Cross-run account persistence must preserve:
- 42 Job × Boss clear cells
- 7 Boss-cleared flags or equivalent derived set
- approved unlock state derivable from Distinct Boss Clear Count
- Franchise Grade or sufficient Total Job Mastery to derive it
- Monster Knowledge progress

Run save and account Meta state may use separate storage structures.

No reload may:
- duplicate a Boss clear reward
- set one matrix cell more than once
- inflate Distinct Boss Clear Count with a duplicate Boss
- relock already earned approved content

Derived values should be derived from source-of-truth sets/matrix where practical.

---

## LEGACY MIGRATION BOUNDARY

Legacy Global Meta XP / XP Grade / 14-unlock state is not Canonical truth in v2.5.

Migration policy must preserve data safety but must not keep removed gameplay behavior merely for compatibility.

Do not silently map:
- old XP amount -> fake Job Mastery cells
- old Grade -> fake Boss clears

If incompatible Meta schema cannot be migrated truthfully:
- preserve old stored bytes as backup where existing save policy supports it
- initialize the new v2.5 progression state according to the implementation migration plan
- do not invent historical Boss clears the Player never achieved

Technical migration detail is Source-owned; progression truth remains this document.

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
Fresh v2.5 account normal NPC Jobs are 전사/궁수/마법사/사제 until unlocks apply.

### META-Q11 — FRANCHISE GRADE
Grade derives from Total Job Mastery and has no direct gameplay modifier.

### META-Q12 — MONSTER KNOWLEDGE
Supplied-survival Knowledge behavior remains unchanged and separate from Mastery.

### META-Q13 — SAVE/RELOAD
Reload cannot duplicate matrix progress or Boss unlock count.

### META-Q14 — NO LEGACY POWER
Removed XP/Grade bonuses do not remain as hidden modifiers.

---

## RELATED

boss clear signal -> BOSS
job base/growth/mastery power channel -> NPC_TRAIT
item unlock/effect -> ITEM
run save -> CORE_RUN
monster family knowledge -> DUNGEON_HAZARD
presentation -> UI_UX
copy -> COPY_WORLD_VOICE
