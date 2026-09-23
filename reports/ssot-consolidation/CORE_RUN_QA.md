# CORE_RUN_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/CORE_RUN_QA_v2.8.0.md
CHAIN=design_ssot/CORE_RUN_QA_v2.8.0.md,design_ssot/history/CORE_RUN_QA_v2.7.0.md,design_ssot/history/CORE_RUN_QA_v2.6.1.md,design_ssot/history/CORE_RUN_QA_v2.5.0.md

Current-spec consolidation of a QA chain (v2.5 -> v2.6.1 -> v2.7 -> v2.8 patch). The pre-consolidation
owner is kept whole as `design_ssot/history/CORE_RUN_QA_v2.8.0-patch.md`; the older versions stay in
`history/`. Liveness judged against the consolidated `design_ssot/CORE_RUN_v2.8.0.md` (plus
`META_v2.8.0.md`, `SALE_v2.8.0.md`, `RELIC_v2.8.0.md`, `NPC_TRAIT_v2.8.0.md` where a check asserts their rule).

Layout: `##` topic groups, `###` checks with their original IDs (no renumbering). Groups: RUN START /
INITIALIZATION, DAILY PHASE FLOW, DAILY ECONOMY / VISITORS, NPC PERSISTENCE, SALE, SAVE / LOAD
STABILITY, SAVE VERSION / LEGACY SAVE, BOSS / FINAL TIMELINE, D30 FINAL, ABANDON / RESET / TUTORIAL,
RUN-END SETTLEMENT / CROSS-RUN, INTEGRATION / BROWSER LOOP, BALANCE QA (RUN-Q15), then FINAL DETAIL
QA OWNERSHIP. The un-numbered amendment checks keep their `### RUN ABANDON` / `### DEEP SAVE` headings.
Header keys `BASE_DOCUMENT=` / `PATCH_TYPE=` / `CURRENT_ROLE=` are replaced by `CONSOLIDATED_FROM=` /
`CONSOLIDATION_LEDGER=`; OWNER is the v2.7 value unchanged.

## LEGACY — inheritance pointers / override scaffolding (the chain is now inline)

v2.8 inheritance exclusions and the v2.7 INHERITED QA OVERRIDES list. The checks they name are dropped under SUPERSEDED below; the live override bullets (1000G / 18, start-stock owner, overhead, 2-slot Bag) are carried into RUN-Q01 / RUN-Q06 / RUN-Q26 (the 1000G / 18 line verbatim, the others under REWORD). `RUN-Q-v28-5` now carries the D0..D30 information order inline; no inherited D10/D20 clause in this chain conflicts with it.

```text
## INHERITED QA OVERRIDES
The following inherited `CORE_RUN_QA_v2.5.0.md` expectations are stale and are explicitly superseded:
- `RUN-Q01` old `1200G / 24칸 / 삼각김밥×2 / 생수×2 / 붕대×1 / 하급포션×1`
- `RUN-Q06` fixed `60G` base-overhead expectation
- `RUN-Q26` Lv10+ third Consumer Slot expectation
- `RUN-Q32` D30-first Final Family disclosure expectation
- superseded by v2.7 D25 prereveal; D30 reuses the already-persisted state
- any inherited/current pre-amendment Final QA that expects D30 50/100/150 price choice or refusal RNG
- superseded by current fixed 50% / 매입가 Final preparation
- any inherited v7->v8 Account/Meta preservation expectation
- superseded by current pre-release no-compatibility policy: v1~v7 internal-test Account/Meta and Run state are not migrated into v8
All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.
## INHERITANCE
All non-conflicting v2.7 Core Run QA remains active.
Current inheritance exclusions:
- inherited D10/D20 Boss-information timing clauses that conflict with the current cadence are inactive;
`RUN-Q-v28-5` owns the current D0/D5/D10/D15/D20/D25/D30 information order
- Franchise Achievement QA is inactive with the retired Franchise system
```

## LEGACY — duplicate preamble

v2.5 wording of the preamble line kept from v2.6.1 / v2.7.

```text
Status values are NOT stored here.
```

## LEGACY — amendment framing heading

The RUN ABANDON / DEEP SAVE checks it headed are kept (ABANDON / RESET / TUTORIAL and SAVE / LOAD STABILITY groups).

```text
## APPROVED_AMENDMENT_2026_09_12 — RUN ABANDON / DEEP SAVE QA
```

## SUPERSEDED — RUN-Q61 Save v7 exact (replaced by RUN-Q70 Save v8; CORE_RUN_v2.8.0 SAVE v8 — EXACT)

```text
## RUN-Q61 — SAVE V7 EXACT
EXPECT:
- key `guild24.save.v7`
- envelope 7
- export 7
- validation 7
- new Run `run.version=7`
PASS only if all are 7.
```

## SUPERSEDED — RUN-Q01 v2.5 start values 1200G / 24 / old stock (v2.7 override; CORE_RUN_v2.8.0 START STATE 1000G / 18 / RUN-Q72 stock, `bandage` retired)

```text
- Gold=1200G
- InventoryCapacity=24
- starting stock:
- 삼각김밥×2
- 생수×2
- 붕대×1
- 하급포션×1
```

## SUPERSEDED — RUN-Q26 Lv10+ third Consumer Slot (v2.7 override; SALE_v2.8.0 "No Lv10+ third slot.")

Rest of RUN-Q26 kept; the SETUP still sells to a Lv10+ NPC, now expecting the 2-slot Bag.

```text
- Lv10+ visit purchase cap=3 Items
```

## SUPERSEDED — RUN-Q32 D30-first Final Family disclosure (v2.7 override; CORE_RUN_v2.8.0 FINAL TIMELINE D25 disclose/persist, D30 reuse)

Covered now by RUN-Q73 / RUN-Q74 / RUN-Q-v28-5 D30 and the RUN-Q78 progression (known Final state before the D30 Relic/SLOTH decision).

```text
## RUN-Q32 — D30 INFORMATION ORDER
SETUP:
Enter D30 with a normal Boss and with SLOTH.
EXPECT:
Final Family Pair is disclosed before D30 Relic/Sloth choice and before Final lock.
PASS:
The D30 decision never occurs with intentionally-late information hidden until afterward.
```

## SUPERSEDED — RUN-Q79 Franchise Achievement pacing (v2.8 exclusion; Franchise system retired, META_v2.8.0 RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE)

```text
## RUN-Q79 — FRANCHISE ACHIEVEMENT BASELINE PACING
Use the current `DIRECTOR DOCUMENT BASELINE` thresholds from `META_v2.7.0.md` exactly for the first v2.7 full-run QA pass.
Record at minimum:
- Run index / Day when Achievement 1, 2, 3, 4, 5, 6, 7, 8, 9 first complete
- how many Franchise Achievements are complete at first Boss CLEAR
- how many are complete after representative early, mid, and mature account progression
- whether multiple achievements cluster unintentionally from one narrow repeated behavior
- whether any numeric baseline requires artificial farming rather than normal play
Current numeric baselines under measurement:
A1 = cumulative successful sales 100
A2 = cumulative successful 150% sales 20
A3 = cumulative successful returning-NPC sales 30
A9 = one-Run Gross Sales 10,000G + Boss CLEAR
This is a **balance measurement**, not permission for frozen QA or WORK to rewrite thresholds in-place.
If evidence shows a baseline is materially too trivial, too grindy, or produces unhealthy completion clustering:
report BALANCE FINDING
-> Director/User approves revised threshold
-> update META owner Spec
-> separate implementation/fix cycle
PASS/FAIL must not be manufactured by changing Source/Test/Harness during this QA pass.
```

## SUPERSEDED — RUN-Q06 fixed 60G overhead (v2.7 override; CORE_RUN_v2.8.0 DAILY ECONOMIC BASE Day/Core-Roster formula)

Rest of RUN-Q06 kept; the current-truth line from the v2.7 override is under REWORD.

```text
- v2.5 retained starting baseline daily overhead=60G unless modified by explicit canonical effect
```

## LEGACY — overhead tuning history (PASS3)

PASS3 tuning is history; the live constraint "no silent balance change" stays in RUN-Q06 PASS, and later overhead change rules are owned by CORE_RUN_v2.8.0 DAILY ECONOMIC BASE.

```text
- final post-simulation base overhead may change only through approved PASS3 tuning
Exact overhead tuning:
PASS3 after integrated simulation.
```

## REWORD — version framing removed

`v2.7` / `After v2.7 adoption,` / `v2.7/` removed; rule unchanged.

```text
Fresh v2.7 Run starts with exactly:
- launch current v2.7/v8 build
After v2.7 adoption, real browser progression must still complete:
```

```new
Fresh Run starts with exactly:
- launch current v8 build
Real browser progression must still complete:
```

## REWORD — override bullets carried into their check / pointers name the current owner file

v2.7 override bullets become EXPECT lines of the check they correct (RUN-Q01 start-stock owner, RUN-Q06 overhead truth with the stale-value note trimmed, RUN-Q26 2-slot Bag); v2.5 ownership pointers name v2.8 files.

```text
- v2.7 start stock is owned by `CORE_RUN_v2.7.0.md` / `RUN-Q72`
- current overhead must follow the current `CORE_RUN` / Closing economy truth; QA must not preserve the stale fixed-60 value
- superseded by `SALE_v2.7.0.md`: every ordinary SALE Bag has exactly 2 slots
-> FINAL_EXPEDITION_v2.5.0.md
-> BOSS_v2.5.0.md
-> META_v2.5.0.md
```

```new
- start stock is owned by `CORE_RUN_v2.8.0.md` / `RUN-Q72`
- current overhead must follow the current `CORE_RUN_v2.8.0.md` / Closing economy truth
- every ordinary SALE Bag has exactly 2 slots (`SALE_v2.8.0.md`)
-> FINAL_EXPEDITION_v2.8.0.md
-> BOSS_v2.8.0.md
-> META_v2.8.0.md
```

## REWORD — RUN-Q62 legacy range follows the current save generation

v2.6.1 wrote the check when v7 was current. Current CORE_RUN_v2.8.0 SAVE v8: `LEGACY = v1~v7`, legacy guidance shown, bytes not auto-deleted (same relabel as the CORE_RUN ledger). The check itself (no continue, fresh-start guidance, bytes untouched, no migration / auto-delete) is unchanged.

```text
SETUP: leave v1~v6 save bytes with no valid v7 current save.
```

```new
SETUP: leave v1~v7 save bytes with no valid v8 current save.
```

## REWORD — check headings moved under topic groups (level only)

Every check heading goes from `##` to `###`; text unchanged. Topic group headings are new.

```text
## RUN-Q01 — NEW RUN INITIALIZATION
## RUN-Q02 — D0 RELIC BEFORE BUSINESS
## RUN-Q72 — START STOCK
## RUN-Q-v28-1 — NO ACTIVE START CONTRACT / FRANCHISE
## RUN-Q-v28-2 — LOADOUT FREEZE
## RUN-Q03 — PHASE ORDER
## RUN-Q04 — ZERO CUSTOMER FLOW
## RUN-Q05 — ZERO NIGHT RESULT FLOW
## RUN-Q65 — ORDER TO SALE BOUNDARY
## RUN-Q17 — TURN-BASED ONLY
## RUN-Q06 — DAILY OVERHEAD
## RUN-Q07 — BASE VISITOR RANGE
## RUN-Q08 — NPC PERSISTENCE
## RUN-Q09 — DEAD NPC REMOVAL
## RUN-Q25 — SALE ATOMIC COMMIT
## RUN-Q26 — CONSUMER SLOT CONTRACT
## RUN-Q27 — CUSTOMER FINALIZE LOCK
## RUN-Q28 — VALID NO-SALE CHOICE
## RUN-Q10 — DAY/GATE STATE STABILITY
## RUN-Q11 — ORDER STATE STABILITY
## RUN-Q12 — RELIC STATE STABILITY
## RUN-Q13 — NIGHT RESOLUTION STABILITY
## RUN-Q19 — SAVE/RESUME COMPLETE STATE
## RUN-Q31 — BOSS RUN-STATE SAVE
## RUN-Q70 — SAVE V8 EXACT
## RUN-Q62 — LEGACY SAVE SAFETY
## RUN-Q71 — LEGACY INTERNAL SAVE REJECTION / FRESH V8
## RUN-Q-v28-6 — ITEM ID REUSE / SAVE
## RUN-Q-v28-5 — BOSS INFORMATION ORDER
## RUN-Q73 — FINAL TIMELINE
## RUN-Q74 — D25 SAVE/LOAD STABILITY
## RUN-Q75 — D25 NO FREE ANSWER
## RUN-Q77 — D25 CONTROLLED REPAIR IS ONE-TIME
## RUN-Q14 — DAY30 FINAL TIMING
## RUN-Q16 — D30 STOCK TIMING HONESTY
## RUN-Q78 — D30 SELECT -> FINAL PREP -> RESULT
## RUN-Q64 — ABANDON
## RUN-Q63 — FULL RESET
## RUN-Q80 — FULL DATA RESET / FRESH TUTORIAL ELIGIBILITY
## RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT
## RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION
## RUN-Q18 — CROSS-RUN RESET
## RUN-Q29 — MONSTER KNOWLEDGE REQUIRES SUPPLIED SURVIVAL
## RUN-Q30 — MINIMAL-ENGAGEMENT / DAY-FARMING
## RUN-Q20 — COMPLETE 30-DAY LOOP
## RUN-Q66 — BROWSER LOOP BLOCKER
## RUN-Q76 — MAIN LOOP SMOKE
## RUN-Q15 — FINAL INVESTMENT VALUE
```

```new
### RUN-Q01 — NEW RUN INITIALIZATION
### RUN-Q02 — D0 RELIC BEFORE BUSINESS
### RUN-Q72 — START STOCK
### RUN-Q-v28-1 — NO ACTIVE START CONTRACT / FRANCHISE
### RUN-Q-v28-2 — LOADOUT FREEZE
### RUN-Q03 — PHASE ORDER
### RUN-Q04 — ZERO CUSTOMER FLOW
### RUN-Q05 — ZERO NIGHT RESULT FLOW
### RUN-Q65 — ORDER TO SALE BOUNDARY
### RUN-Q17 — TURN-BASED ONLY
### RUN-Q06 — DAILY OVERHEAD
### RUN-Q07 — BASE VISITOR RANGE
### RUN-Q08 — NPC PERSISTENCE
### RUN-Q09 — DEAD NPC REMOVAL
### RUN-Q25 — SALE ATOMIC COMMIT
### RUN-Q26 — CONSUMER SLOT CONTRACT
### RUN-Q27 — CUSTOMER FINALIZE LOCK
### RUN-Q28 — VALID NO-SALE CHOICE
### RUN-Q10 — DAY/GATE STATE STABILITY
### RUN-Q11 — ORDER STATE STABILITY
### RUN-Q12 — RELIC STATE STABILITY
### RUN-Q13 — NIGHT RESOLUTION STABILITY
### RUN-Q19 — SAVE/RESUME COMPLETE STATE
### RUN-Q31 — BOSS RUN-STATE SAVE
### RUN-Q70 — SAVE V8 EXACT
### RUN-Q62 — LEGACY SAVE SAFETY
### RUN-Q71 — LEGACY INTERNAL SAVE REJECTION / FRESH V8
### RUN-Q-v28-6 — ITEM ID REUSE / SAVE
### RUN-Q-v28-5 — BOSS INFORMATION ORDER
### RUN-Q73 — FINAL TIMELINE
### RUN-Q74 — D25 SAVE/LOAD STABILITY
### RUN-Q75 — D25 NO FREE ANSWER
### RUN-Q77 — D25 CONTROLLED REPAIR IS ONE-TIME
### RUN-Q14 — DAY30 FINAL TIMING
### RUN-Q16 — D30 STOCK TIMING HONESTY
### RUN-Q78 — D30 SELECT -> FINAL PREP -> RESULT
### RUN-Q64 — ABANDON
### RUN-Q63 — FULL RESET
### RUN-Q80 — FULL DATA RESET / FRESH TUTORIAL ELIGIBILITY
### RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT
### RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION
### RUN-Q18 — CROSS-RUN RESET
### RUN-Q29 — MONSTER KNOWLEDGE REQUIRES SUPPLIED SURVIVAL
### RUN-Q30 — MINIMAL-ENGAGEMENT / DAY-FARMING
### RUN-Q20 — COMPLETE 30-DAY LOOP
### RUN-Q66 — BROWSER LOOP BLOCKER
### RUN-Q76 — MAIN LOOP SMOKE
### RUN-Q15 — FINAL INVESTMENT VALUE
```

## NEW — topic group headings

```new
## RUN START / INITIALIZATION
## DAILY PHASE FLOW
## DAILY ECONOMY / VISITORS
## NPC PERSISTENCE
## SALE
## SAVE / LOAD STABILITY
## SAVE VERSION / LEGACY SAVE
## BOSS / FINAL TIMELINE
## D30 FINAL
## ABANDON / RESET / TUTORIAL
## RUN-END SETTLEMENT / CROSS-RUN
## INTEGRATION / BROWSER LOOP
## BALANCE QA
```
## NOTES — reviewed, kept verbatim, not unresolved

- `RUN-Q-v28-5` D0 bullets ("after the support choice, D0 opens as a separate information beat",
  "acknowledging D0 proceeds to ordinary DAY 1") predate the CORE_RUN_v2.8.0 D0 FIRST-MORNING BOSS
  BRIEFING wording (briefing is the first step of DAY 1 MORNING, not a DAY 0 phase). Read as
  compatible (separate from the Store Support takeover; ordinary DAY 1 Morning follows), so kept.
- `FINAL DETAIL QA OWNERSHIP` scope line ("CORE_RUN_QA retains only Run-flow, ...") is v2.5 text kept
  verbatim although the file also carries SALE / Knowledge / settlement checks.
- `RUN-Q01` carries the v2.7 override line "current Run baseline remains `Gold=1000G`,
  `InventoryCapacity=18`" verbatim as its EXPECT value line (matches CORE_RUN_v2.8.0 KEY / START STATE).

## TEST GAPS (current CORE_RUN_v2.8.0 rules with no check here; no check added)

- D0 briefing save/load edges: save before acknowledgement still owes it; escape does not consume it;
  no retroactive D0 on saves already beyond DAY 1.
- RUN-Q73 lists no D25 `FINAL까지 5일` signal (FINAL TIMELINE — EXACT has it).
- Core-Roster overhead formula value itself (RUN-Q06 checks only consistency / single charge).
