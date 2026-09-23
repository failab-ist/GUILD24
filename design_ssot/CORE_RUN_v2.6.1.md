# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=CORE_RUN_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged Run/phase rules inherit `CORE_RUN_v2.5.0.md`.

## DAILY PHASE FLOW

The phase order remains:
```text
MORNING -> ORDER -> SALE -> NIGHT -> CLOSING -> next Day
```

Within ORDER, confirming a purchase does **not** advance the phase.
The Player enters SALE only through the separate `영업 시작` action defined by ECONOMY_ORDER/UI_UX.

## SAVE v7 — EXACT

Current schema contract:
```text
KEY = guild24.save.v7
LEGACY = v1~v6
Envelope version = 7
Export version = 7
Validation version = 7
run.version = 7
```

New Run must initialize `run.version=7`.

Legacy v1~v6:
- no migration
- no continuation
- show old-version/fresh-start guidance
- do not automatically delete original legacy bytes

Full Reset is the explicit action that deletes current/backup/legacy game-owned save data.

## CURRENT RUN ABANDON

Player-facing action:
`현재 지점 포기`

Abandon means:
- discard current Run state only
- no `Meta.finish()`
- no settlement
- no Mastery/Boss clear/reward/progression credit
- start next Run through the ordinary fresh-Run path

Preserve account-scoped:
- matrix / Meta progression
- Monster Knowledge
- earned unlocks and unlock-toast state
- Tutorial completion
- Settings

This action is separate from Full Data Reset.

## FULL RESET

Full Reset returns to the same account state as a true first launch:
- Run fresh
- Account/Meta fresh
- Tutorial fresh
- D10/D14 unlocks fresh
- unlock-toast state fresh

Tutorial must appear again after Full Reset.
