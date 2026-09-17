# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,run,phase,save,abandon,runtime_progression,final_timeline
DOC_VERSION=2.7.0
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

All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.

## RUN-Q70 — SAVE V8 EXACT

EXPECT:
- key `guild24.save.v8`
- envelope 8
- export 8
- validation 8
- new Run `run.version=8`

PASS only if all are 8.

## RUN-Q71 — V7 ACCOUNT PRESERVATION / RUN RESET

SETUP:
- no valid current v8 save
- valid current v7 save with known Account/Meta progression and an active legacy Run

EXPECT:
- v7 Run state does not continue as v2.7
- a fresh v8 Run is created
- unchanged-semantics validated v7 Account/Meta progression is carried forward according to `META_v2.7.0.md`
- fields whose Meta meaning changed are not blindly copied as if semantics were unchanged
- legacy v7 bytes are not silently deleted by the import
- retired Run inventory/NPC/Bag/Final state is not copied
- no Bandage-to-Herb-Tea conversion occurs

Also verify:
- once a valid v8 save exists, later loads do not repeatedly re-import v7
- malformed v7 Account/Meta is not partially coerced into progression
- v1~v6 Account/Meta is not automatically imported by this v2.7 rule

PASS: account progression is preserved where current Meta explicitly approves it, while legacy Run continuation remains impossible.

NOTE:
old-semantics Franchise Grade / Start Contract migration remains implementation-blocking unresolved in `META_v2.7.0.md`; QA must not invent that migration rule.

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
- after committed Final transfers begin, Save/Load cannot reopen participant selection or erase committed transfer state for fishing
- no post-preparation free-equip step exists
- one Final Lock occurs after all selected participants finish Final preparation
- exactly one Final result resolves from that locked state

DO NOT PASS/FAIL YET on:
- Player Gold gain from Final transfer
- Gross Sales / GREED inclusion of Final transfer

Those accounting semantics remain explicitly unresolved in current owner specs.
