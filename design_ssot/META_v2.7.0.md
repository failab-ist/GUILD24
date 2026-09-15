# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,unlock,monster_knowledge,cross_run,account_save
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Meta progression, unlock, Job Mastery, Franchise Grade, Start Contract, Monster Knowledge, Full Reset, and Run Abandon rules inherit `META_v2.6.1.md` and its declared base.

This patch aligns Meta with v2.7 Save generation and explicitly rejects adding a new fail-to-power Meta progression system merely to lower first-clear difficulty.

## SAVE v8 ACCOUNT CONTRACT

v2.7 current save generation is v8.
Run-state compatibility is owned by `CORE_RUN_v2.7.0.md`.

Exact:
- v1~v7 **Run state** cannot continue as a v2.7 Run
- old save bytes are not silently deleted merely because v8 cannot continue that Run
- Full Data Reset remains the explicit user action that clears game-owned Account/Meta data
- v2.7 does not change the meaning of existing Account/Meta progression fields merely because the Run schema changes

### V7 -> V8 ACCOUNT PRESERVATION — USER DECISION REQUIRED

The current approved text does **not** resolve whether validated v7 Account/Meta progression is carried into a new v8 envelope while the old Run is discarded.

```text
UNRESOLVED — USER APPROVAL REQUIRED
```

Do not guess between:

```text
A. preserve validated v7 Account/Meta progression -> start only a fresh v8 Run
or
B. v8 starts a fresh Account/Meta as well as a fresh Run
```

This is a data-preservation boundary, not a balance-tuning detail.
Until User resolution:
- do not delete or rewrite the existing v7 bytes automatically
- do not claim account migration is supported
- do not claim account reset is intended
- v2.7 Source Save adoption remains blocked on this exact policy

This unresolved does not change ordinary same-version behavior:
- Run Abandon preserves Account/Meta
- Full Data Reset clears Account/Meta

## FIRST CLEAR / META POWER BOUNDARY

WRATH/Boss balance may assume strong player mastery, Run growth, preparation, and Relic build quality.
It may not assume a Job Mastery reward that itself requires a previous Boss clear in order for the first Boss clear to be possible.

Therefore:
- first Boss clear remains possible at Job Mastery 0
- failed Runs do not automatically grant a new permanent Stat/Power currency
- no generic account-wide combat multiplier is added
- existing Monster Knowledge / unlock / player-learning channels remain as currently owned
- Job Mastery power, when available after clears, stays inside its existing Job Base/Growth channel

If first-clear full-run evidence later shows the game is too hard, report a balance finding before inventing new Meta power.

## v2.7 SAVE RELATIONSHIP

`CORE_RUN_v2.7.0.md` owns:
- v8 Run schema
- old Run continuation boundary
- start stock
- D25 persisted Final state

META owns only Account/Meta truth and the account-side preservation decision once User-approved.
Do not duplicate retired Item-ID migration or Final-state repair logic here.

## RELATED

Run/save -> `CORE_RUN_v2.7.0.md`
Job growth/mastery effect channel -> `NPC_TRAIT_v2.7.0.md`
Boss clear signal -> `BOSS_v2.7.0.md`
