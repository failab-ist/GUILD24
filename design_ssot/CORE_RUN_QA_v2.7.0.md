# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,run,phase,save,abandon,runtime_progression,final_timeline,fresh_init,tutorial_reset
DOC_VERSION=2.7.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=CORE_RUN_QA_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here. FAIL is valid evidence.

## INHERITED QA OVERRIDES

The following inherited `CORE_RUN_QA_v2.5.0.md` expectations are stale and are explicitly superseded:

- `RUN-Q01` old `1200G / 24칸 / 삼각김밥×2 / 생수×2 / 붕대×1 / 하급포션×1`
  - current Run baseline remains `Gold=1000G`, `InventoryCapacity=18`
  - v2.7 start stock is owned by `CORE_RUN_v2.7.0.md` / `RUN-Q72`
- `RUN-Q06` fixed `60G` base-overhead expectation
  - current overhead must follow the current `CORE_RUN` / Closing economy truth; QA must not preserve the stale fixed-60 value
- `RUN-Q26` Lv10+ third Consumer Slot expectation
  - superseded by `SALE_v2.7.0.md`: every ordinary SALE Bag has exactly 2 slots
- `RUN-Q32` D30-first Final Family disclosure expectation
  - superseded by v2.7 D25 prereveal; D30 reuses the already-persisted state
- any inherited/current pre-amendment Final QA that expects D30 50/100/150 price choice or refusal RNG
  - superseded by current fixed 50% / 매입가 Final preparation
- any inherited v7->v8 Account/Meta preservation expectation
  - superseded by current pre-release no-compatibility policy: v1~v7 internal-test Account/Meta and Run state are not migrated into v8

All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.

## RUN-Q70 — SAVE V8 EXACT

EXPECT:
- key `guild24.save.v8`
- envelope 8
- export 8
- validation 8
- new Run `run.version=8`

PASS only if all are 8.

## RUN-Q71 — LEGACY INTERNAL SAVE REJECTION / FRESH V8

SETUP:
- no valid current v8 save
- valid current v7 internal-test save with known Account/Meta progression and active Run

EXPECT:
- v7 Run state does not continue
- v7 Account/Meta progression is not imported into v8
- a fresh current v8 Account/Meta is created
- a fresh current v8 Run is created
- no old Franchise Grade / Start Contract / Job Mastery / Boss matrix / Monster Knowledge conversion shim runs
- legacy bytes need not be destructively deleted merely to reject migration

PASS:
current v8 starts clean without compatibility logic for older internal-test progression.

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

## RUN-Q77 — D25 CONTROLLED REPAIR IS ONE-TIME

SETUP:
Use only a development fixture, development Save, or explicitly controlled migration/debug state that is already represented as v8 at D25+ but lacks the required Final prereveal state.

EXPECT:
- first valid entry generates the authoritative Final Family Pair/Hazard Pool exactly once using the ordinary seeded/fixed selection principle
- generated state persists immediately
- save/reload and later entry reuse the exact same state
- no second generation/reroll path exists

PASS:
- repair cannot be used for Final fishing
- ordinary valid D25+ v8 Player Saves already contain the state
- this repair path does not authorize v1~v7 Player Run continuation

## RUN-Q78 — D30 SELECT -> FINAL PREP -> RESULT

Controlled D30 with at least one eligible Final participant.

PASS exact progression:

```text
D30 known Final state
-> D30 Relic/SLOTH decision when applicable
-> Final participant selection
-> Final preparation
-> Final Lock
-> one Final result
```

PASS:
- Final preparation reuses the familiar two-slot Item handling layer rather than adding a separate combat-game phase
- participant selection is committed before Final preparation starts
- fixed Final price is the ordinary 50% / 매입가 amount
- 100% / 150% price choices are not available
- no purchase/refusal RNG occurs
- NPC Wallet affordability remains real
- valid commit consumes stock and reduces NPC Wallet by the exact fixed amount
- valid commit increases Player Gold by the exact fixed amount
- valid commit increases Gross Sales by the exact fixed amount exactly once
- after committed Final transfers begin, Save/Load cannot reopen participant selection or erase committed transfer state for fishing
- no post-preparation free-equip step exists
- one Final Lock occurs after all selected participants finish Final preparation
- exactly one Final result resolves from that locked state

## RUN-Q79 — FRANCHISE ACHIEVEMENT BASELINE PACING

Use the current `DIRECTOR DOCUMENT BASELINE` thresholds from `META_v2.7.0.md` exactly for the first v2.7 full-run QA pass.

Record at minimum:
- Run index / Day when Achievement 1, 2, 3, 4, 5, 6, 7, 8, 9 first complete
- how many Franchise Achievements are complete at first Boss CLEAR
- how many are complete after representative early, mid, and mature account progression
- whether multiple achievements cluster unintentionally from one narrow repeated behavior
- whether any numeric baseline requires artificial farming rather than normal play

Current numeric baselines under measurement:

```text
A1 = cumulative successful sales 100
A2 = cumulative successful 150% sales 20
A3 = cumulative successful returning-NPC sales 30
A9 = one-Run Gross Sales 10,000G + Boss CLEAR
```

This is a **balance measurement**, not permission for frozen QA or WORK to rewrite thresholds in-place.
If evidence shows a baseline is materially too trivial, too grindy, or produces unhealthy completion clustering:

```text
report BALANCE FINDING
-> Director/User approves revised threshold
-> update META owner Spec
-> separate implementation/fix cycle
```

PASS/FAIL must not be manufactured by changing Source/Test/Harness during this QA pass.

## RUN-Q80 — FULL DATA RESET / FRESH TUTORIAL ELIGIBILITY

SETUP A:
- current account has completed or dismissed tutorial
- perform Full Data Reset
- allow game to initialize a new current v8 state

PASS:
- old tutorial-complete / dismissed state is gone
- the new current account is tutorial-eligible
- tutorial actually begins on the first applicable flow

SETUP B:
- only legacy v1~v7 internal-test save remains
- launch current v2.7/v8 build

PASS:
- legacy state is not migrated
- fresh v8 is created
- stale legacy tutorial flags cannot suppress the current tutorial

SETUP C:
- tutorial is completed on a current v8 account
- ordinary Run Abandon / new Run occurs without Full Data Reset

PASS:
- tutorial completion persists
- tutorial is not forcibly replayed just because the Run restarted

Any true fresh state that enters ordinary gameplay with tutorial suppressed by stale persistence is FAIL.
