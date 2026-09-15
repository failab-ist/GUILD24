# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,run,phase,save,abandon,runtime_progression,final_timeline
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=CORE_RUN_QA_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here. FAIL is valid evidence.

## RUN-Q70 — SAVE V8 EXACT

EXPECT:
- key `guild24.save.v8`
- envelope 8
- export 8
- validation 8
- new Run `run.version=8`

PASS only if all are 8.

## RUN-Q71 — LEGACY V1~V7 SAFETY

SETUP: leave v1~v7 save bytes with no valid v8 current save.

EXPECT:
- old Player Run cannot continue as v2.7
- clear fresh-start guidance
- legacy bytes not silently deleted merely because they are incompatible
- no Bandage-to-Herb-Tea migration

PASS: fresh v8 start is explicit and legacy Player Run data is not misrepresented as migrated.

## RUN-Q72 — START STOCK

Fresh v2.7 Run starts with exactly:
- 삼각김밥 ×1
- 생수 ×1
- 진정 허브티 ×1
- 하급 포션 ×1

PASS:
- no active 붕대 in start stock
- same four-unit start count

## RUN-Q73 — FINAL TIMELINE

Across a normal Run:
- D0 Final objective notice exists
- D10 FINAL20 signal
- D20 FINAL10 + Recon beat
- D25 exact Final Family Pair/Hazard Pool is generated/revealed/persisted
- D30 reuses that exact state

PASS: no separate permanent Final dashboard/phase is required.

## RUN-Q74 — D25 SAVE/LOAD STABILITY

Record D25 Final Family Pair/Hazard Pool, save/reload, reach D30.

PASS:
- exact same Pair/Pool remains
- no reroll on reload
- no D30 regeneration

## RUN-Q75 — D25 NO FREE ANSWER

PASS:
D25 prereveal does not itself grant:
- guaranteed Counter stock
- free Final Item
- special Final shop

Remaining preparation uses ordinary management systems.

## RUN-Q76 — MAIN LOOP SMOKE

After v2.7 adoption, real browser progression must still complete:

```text
START -> MORNING -> ORDER -> SALE -> NIGHT -> CLOSING -> next Day
```

and a D25->D30 persistence path.

PASS:
- Console runtime error = 0
- no phase blocker
- no save-version/reference error
