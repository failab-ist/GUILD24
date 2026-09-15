# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,unlock,monster_knowledge,cross_run
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All Meta progression, unlock, Job Mastery, Monster Knowledge, Franchise Grade, and Start Contract rules inherit `META_v2.6.1.md` unchanged.

v2.7 changes only the Save generation used to carry Account/Run state.

## SAVE v8 ACCOUNT CONTRACT

Current v2.7 save generation is v8 only.

```text
guild24.save.v8
```

v1~v7 Run continuation/migration is unsupported under `CORE_RUN_v2.7.0.md`.

Account-scoped progression truth remains:
- Job × Boss clear matrix
- distinct Boss clears
- Job Mastery
- Franchise Grade / Start Contract availability
- Monster Knowledge
- approved unlocks

No new automatic permanent Stat gain is awarded merely for failing or completing Runs.
The first Boss clear must remain possible at Mastery 0 through Run growth, preparation, build quality, and player mastery; Job Mastery remains a reward that exists only after actual Boss clears.

Full Reset clears Account/Meta as already defined.
Run Abandon preserves Account/Meta as already defined.

## RELATED

Save/run schema -> `CORE_RUN_v2.7.0.md`
NPC Job/Level growth -> `NPC_TRAIT_v2.7.0.md`
Boss clear signal -> `BOSS_v2.7.0.md`
