# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,run,phase,save,abandon,runtime_progression
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=CORE_RUN_QA_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

Status values are not stored here. FAIL is valid evidence.

## RUN-Q61 — SAVE V7 EXACT

EXPECT:
- key `guild24.save.v7`
- envelope 7
- export 7
- validation 7
- new Run `run.version=7`

PASS only if all are 7.

## RUN-Q62 — LEGACY SAVE SAFETY

SETUP: leave v1~v6 save bytes with no valid v7 current save.
EXPECT:
- cannot continue old run
- clear fresh-start guidance
- legacy source bytes remain untouched

PASS: no migration and no auto-delete.

## RUN-Q63 — FULL RESET

EXPECT:
- current/backup/legacy game-owned save data cleared
- fresh Account/Meta
- fresh Run state
- Tutorial reset
- D10/D14 unlock/toast reset

PASS: next launch behaves as a first launch and Tutorial can appear again.

## RUN-Q64 — ABANDON

EXPECT:
- current Run discarded
- no settlement / Meta.finish
- no progression reward
- account Meta / Knowledge / unlock / Tutorial / Settings preserved

PASS: next Run uses ordinary start path without abandoned-run credit.

## RUN-Q65 — ORDER TO SALE BOUNDARY

EXPECT:
- order confirmation leaves phase ORDER
- only separate `영업 시작` enters SALE

PASS: no implicit phase advance in confirm path.

## RUN-Q66 — BROWSER LOOP BLOCKER

Real browser path:
`ORDER -> SALE -> NIGHT -> CLOSING -> next Day`

Must include at least one injury result path and one non-injury result path.
PASS:
- progression completes
- Console runtime error count = 0
- no `ReferenceError: game is not defined`
