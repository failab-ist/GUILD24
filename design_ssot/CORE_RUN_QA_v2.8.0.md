# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,run,phase,save,abandon,runtime_progression,final_timeline,fresh_init,tutorial_reset
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/CORE_RUN_QA_v2.8.0-patch.md,history/CORE_RUN_QA_v2.7.0.md,history/CORE_RUN_QA_v2.6.1.md,history/CORE_RUN_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/CORE_RUN_QA.md

Status values are not stored here. FAIL is valid evidence.
This file defines acceptance criteria only.

## RUN START / INITIALIZATION

### RUN-Q01 — NEW RUN INITIALIZATION
SETUP:
Start a new run.

EXPECT:
- Day=1 normal flow starts after D0 setup
- current Run baseline remains `Gold=700G`, `InventoryCapacity=18` (v2.9.0 balance close, User 2026-09-25)
- start stock is owned by `CORE_RUN_v2.8.0.md` / `RUN-Q72`
- no unintended extra resources

PASS:
All starting values match canonical state.

### RUN-Q-v29-DL — SEGMENTED DEATH LIMIT

(User 2026-09-25, v2.9.0 balance close; owner `CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED.)

Controlled Runs reaching cumulative Deaths 4 / 5 on D10, 5 on D11, 7 / 8 on D20, 10 / 11 on D30; each with and without
추모 방명록, and with a 위령제 on an earlier Day.

PASS:
- the Run ends at Closing exactly when the cumulative count reaches the current segment limit 5 / 8 / 11
- the count never resets at a segment boundary; 5 Deaths by D10 ends the Run, 5 Deaths first reached on D11 does not
- 추모 방명록 adds +2 to every segment; 위령제 adds +1 to every segment from its Day
- MORNING and ORDER always show `사망 {n} / {limit} · D{end}까지` with the limit in force, warning color at one left

### RUN-Q02 — D0 RELIC BEFORE BUSINESS
SETUP:
Start a new run.

EXPECT:
D0 Foundation Relic selection occurs before first normal business loop.

PASS:
Player can resolve D0 Relic choice before D1 Morning/Order flow.

### RUN-Q72 — START STOCK

Fresh Run starts with exactly:
- 삼각김밥 ×1
- 생수 ×1
- 진정 허브티 ×1
- 하급 포션 ×1

PASS:
- no active 붕대 in start stock
- same four-unit start count

### RUN-Q-v28-1 — NO ACTIVE START CONTRACT / FRANCHISE

PASS:
- new Run does not require Start Contract selection
- no Franchise Grade locks Run start
- Run uses frozen Decoration loadout

### RUN-Q-v28-2 — LOADOUT FREEZE

PASS:
- only owned Decorations selectable
- max one active Decoration per Slot
- loadout fixed after Run start
- reload preserves same Run loadout

## DAILY PHASE FLOW

### RUN-Q03 — PHASE ORDER
SETUP:
Play a normal day.

EXPECT:
MORNING
→ ORDER
→ SALE
→ NIGHT
→ CLOSING
→ next Day

PASS:
No phase is skipped/reordered unless explicitly caused by valid zero-content flow.

### RUN-Q04 — ZERO CUSTOMER FLOW
SETUP:
Force/seed a day with zero Sale customers if supported.

EXPECT:
Sale resolves without softlock and proceeds to Night.

PASS:
No blocked progression.

### RUN-Q05 — ZERO NIGHT RESULT FLOW
SETUP:
Enter Night with no expedition result.

EXPECT:
Night proceeds directly to Closing.

PASS:
No blocked progression.

### RUN-Q65 — ORDER TO SALE BOUNDARY

EXPECT:
- order confirmation leaves phase ORDER
- only separate `영업 시작` enters SALE

PASS: no implicit phase advance in confirm path.

### RUN-Q17 — TURN-BASED ONLY
SETUP:
Play all core phases.

EXPECT:
No gameplay decision depends on real-time countdown/reflex input.

PASS:
Entire core loop is turn-based.

## DAILY ECONOMY / VISITORS

### RUN-Q06 — DAILY OVERHEAD
SETUP:
Complete a normal day.

EXPECT:
- current overhead must follow the current `CORE_RUN_v2.8.0.md` / Closing economy truth
- exactly one base overhead charge occurs per completed normal Day

PASS:
Closing and final Gold use the same actual overhead value,
with no duplicate/missing charge and no silent balance change.

### RUN-Q07 — BASE VISITOR RANGE
SETUP:
Generate multiple normal days without visitor-count modifiers.

EXPECT:
Base visitors are within 3–6/day.

PASS:
Observed base generation respects range.

## NPC PERSISTENCE

### RUN-Q08 — NPC PERSISTENCE
SETUP:
Meet an NPC, then continue multiple days.

EXPECT:
Persistent NPC state survives across days:
- identity
- Job
- level/stats
- Traits
- Wallet/Loyalty
- conditions
- alive/dead state

PASS:
No unintended reset between visits.

### RUN-Q09 — DEAD NPC REMOVAL
SETUP:
Cause one NPC to die.

EXPECT:
- death remains permanent for the Run
- NPC does not visit again
- NPC does not consume Living NPC Cap

PASS:
All three conditions hold.

## SALE

### RUN-Q25 — SALE ATOMIC COMMIT
SETUP:
Complete a paid purchase and inspect all affected state immediately.

EXPECT:
Wallet, Player Gold, physical Inventory unit, NPC bag, Consumer Slot, applicable Loyalty/history update together as one committed purchase.

PASS:
No partial purchase state exists.

### RUN-Q26 — CONSUMER SLOT CONTRACT
SETUP:
Sell to normal NPC and Lv10+ NPC.

EXPECT:
- normal visit purchase cap=2 Items
- every ordinary SALE Bag has exactly 2 slots (`SALE_v2.8.0.md`)
- all sellable Inventory remains visible despite remaining-slot count

PASS:
No hidden/infinite extra-slot behavior exists.

### RUN-Q27 — CUSTOMER FINALIZE LOCK
SETUP:
Finalize a Customer after purchases, then attempt normal management changes before Night.

EXPECT:
Committed purchases/destination/expedition preparation cannot be retroactively altered by normal management actions.

PASS:
Finalized Customer state is stable.

### RUN-Q28 — VALID NO-SALE CHOICE
SETUP:
Process a Customer and deliberately sell nothing.

EXPECT:
Customer can be finalized with zero purchases without artificial punishment subsystem or softlock.
Existing downstream preparation/future-value consequences may still occur.

PASS:
No-sale remains a valid strategic action.

## SAVE / LOAD STABILITY

### RUN-Q10 — DAY/GATE STATE STABILITY
SETUP:
Enter a Day with generated Gate state.
Save/Reload before resolving the Day.

EXPECT:
Generated Gate/Family/Tier state remains unchanged.

PASS:
Reload is not a reroll.

### RUN-Q11 — ORDER STATE STABILITY
SETUP:
Generate Order offers.
Save/Reload before confirming order.

EXPECT:
Current offer state remains stable.

PASS:
Reload does not generate better/different offers unless a canonical reroll action was used.

### RUN-Q12 — RELIC STATE STABILITY
SETUP:
Open a Relic window and record candidates/prices.
Save/Reload.

EXPECT:
Same candidates/prices/window state.

PASS:
Reload is not a Relic reroll.

### RUN-Q13 — NIGHT RESOLUTION STABILITY
SETUP:
Resolve a Night outcome, save during/after result presentation, reload.

EXPECT:
No duplicated or changed:
- outcome
- EXP
- Loot
- Injury
- Death
- reward

PASS:
Resolution is stable.

### RUN-Q19 — SAVE/RESUME COMPLETE STATE
SETUP:
Save at multiple phases and reload.

EXPECT:
Resume restores enough state to continue without:
- free reroll
- duplicate reward
- lost committed sale
- lost NPC condition
- changed Gate

PASS:
Run continues consistently.

### RUN-Q31 — BOSS RUN-STATE SAVE
SETUP:
Save/reload before and after D5/D15 and during a SLOTH run.

EXPECT:
Boss ID, reveal-seen flags, selected Sloth opportunity Days, and committed Seal Break count remain stable.

PASS:
Run save cannot reroll or duplicate Boss progression.

### DEEP SAVE
PASS:
- occurrence schedule stable across reload
- selected base Gate stable after generation/reveal
- nomination stable
- sponsorship not duplicated/refunded
- destination replacement stable
- expired/consumed opportunity cannot reopen
- resolved expedition/result cannot reroll

## SAVE VERSION / LEGACY SAVE

### RUN-Q70 — SAVE V8 EXACT

EXPECT:
- key `guild24.save.v8`
- envelope 8
- export 8
- validation 8
- new Run `run.version=8`

PASS only if all are 8.

### RUN-Q62 — LEGACY SAVE SAFETY

SETUP: leave v1~v7 save bytes with no valid v8 current save.
EXPECT:
- cannot continue old run
- clear fresh-start guidance
- legacy source bytes remain untouched

PASS: no migration and no auto-delete.

### RUN-Q71 — LEGACY INTERNAL SAVE REJECTION / FRESH V8

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

### RUN-Q-v28-6 — ITEM ID REUSE / SAVE

Current meal/water identities reuse existing Item IDs.

PASS:
- current internal v8 save loads without requiring a new schema solely for those identity changes
- active references resolve to current v2.8 Item identities
- no second legacy Hotbar Item is created

## BOSS / FINAL TIMELINE

### RUN-Q-v28-5 — BOSS INFORMATION ORDER

D0:
- first Store Support choice is shown and committed before D0 Boss information
- D0 Boss objective is not embedded in the Store Support takeover
- after the support choice, D0 opens as a separate information beat
- acknowledging D0 proceeds to ordinary DAY 1
- reload does not duplicate a consumed D0 beat
- presentation consumes no extra gameplay RNG

For D5/D10/D15/D20/D25:
- due Boss information is shown before same-Day Store Support decision
- D10/D20 dismiss state persists
- reload does not replay a consumed report
- showing a report consumes no gameplay RNG

D30:
- no new Boss reveal
- uses persisted D25 Final state

### RUN-Q73 — FINAL TIMELINE

Across a normal Run:
- D0 Final objective notice exists
- D10 FINAL20 signal
- D20 FINAL10 + Recon beat
- D25 exact Final Family Pair/Hazard Pool is generated/revealed/persisted
- D30 reuses that exact state

PASS: no separate permanent Final dashboard/phase is required.

### RUN-Q74 — D25 SAVE/LOAD STABILITY

Record D25 Final Family Pair/Hazard Pool, save/reload, reach D30.

PASS:
- exact same Pair/Pool remains
- no reroll on reload
- no D30 regeneration

### RUN-Q75 — D25 NO FREE ANSWER

PASS:
D25 prereveal does not itself grant:
- guaranteed Counter stock
- free Final Item
- special Final shop

Remaining preparation uses ordinary management systems.

### RUN-Q77 — D25 CONTROLLED REPAIR IS ONE-TIME

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

## D30 FINAL

### RUN-Q14 — DAY30 FINAL TIMING
SETUP:
Reach D30.

EXPECT:
- final relevant management/preparation occurs before lock
- D30 Relic window is available before final lock
- Final Expedition begins only after lock

PASS:
No post-lock management changes resolved expedition state.

### RUN-Q16 — D30 STOCK TIMING HONESTY
SETUP:
Hold/buy stock near expiry before Final.

EXPECT:
D30 follows canonical stock/expiry rules unless an explicit Canonical override exists.
Player-facing usability is understandable before commitment.

PASS:
Displayed Final usability matches actual stock behavior.

### RUN-Q78 — D30 SELECT -> FINAL PREP -> RESULT

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

## ABANDON / RESET / TUTORIAL

### RUN-Q64 — ABANDON

EXPECT:
- current Run discarded
- no settlement / Meta.finish
- no progression reward
- account Meta / Knowledge / unlock / Tutorial / Settings preserved

PASS: next Run uses ordinary start path without abandoned-run credit.

### RUN ABANDON
PASS:
- abandon active Run and start new Run
- `Meta.finish()` not called
- no Mastery / Boss clear / matrix mutation / unlock / reward
- `runs` / `wins` not increased by abandon
- existing Knowledge / Tutorial / Settings preserved
- Run-scoped state replaced
- no legacy XP/reward copy

### RUN-Q63 — FULL RESET

EXPECT:
- current/backup/legacy game-owned save data cleared
- fresh Account/Meta
- fresh Run state
- Tutorial reset
- D10/D14 unlock/toast reset

PASS: next launch behaves as a first launch and Tutorial can appear again.

### RUN-Q80 — FULL DATA RESET / FRESH TUTORIAL ELIGIBILITY

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
- launch current v8 build

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

## RUN-END SETTLEMENT / CROSS-RUN

### RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT

PASS:
- eligible Run settles exactly once
- actual Gross Sales x reached-Day rate
- Gross Sales 0 -> Capital 0
- bankruptcy / Death-limit / Final failure may still earn from actual business
- Boss CLEAR adds no multiplier
- manual abandon -> 0
- reload cannot double-credit

### RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION

PASS:
- equal Gross Sales + reached Day -> equal Capital despite Ending Gold/Inventory difference
- Final transfers already counted in Gross Sales enter once
- retired net-asset formula is inactive

### RUN-Q18 — CROSS-RUN RESET
SETUP:
Finish/end a Run and start another.

EXPECT:
Run-specific:
- NPC roster
- Store Build
- inventory
- economy state
reset appropriately.

PASS:
No unintended NPC/run state carries over. Only explicit META/NPC_TRAIT Job Mastery cross-run adjustment may affect an unlocked Job; no hidden account-wide power carries over.

### RUN-Q29 — MONSTER KNOWLEDGE REQUIRES SUPPLIED SURVIVAL
SETUP:
For the same Family, resolve:
A. no supplied Item, survives
B. >=1 supplied Item, dies
C. >=1 supplied Item, survives

EXPECT:
- A: Knowledge +0
- B: Knowledge +0
- C: Knowledge +1

Player-facing progress text:
`보급 생환 N회`

PASS:
Zero-cost naked scouting cannot farm Monster Knowledge and old `관찰 N회` progress wording is not used.

### RUN-Q30 — MINIMAL-ENGAGEMENT / DAY-FARMING
SETUP:
Multi-seed compare:
A. normal engaged play
B. repeated zero-sale / zero-order / zero-supply day advancement
C. poverty/minimum-spend play

Track:
- Day reached
- Gold
- NPC growth/value
- Knowledge
- Final viability

EXPECT:
- legacy Global Meta XP is not awarded for Day advancement
- Job Mastery / Distinct Boss progression cannot be earned without a successful Final clear
- no new inactivity punishment subsystem is required

PASS:
Removed Global Meta XP cannot be farmed by minimal Day advancement; remaining run-economy viability is evaluated separately.

## INTEGRATION / BROWSER LOOP

### RUN-Q20 — COMPLETE 30-DAY LOOP
SETUP:
Play/simulate D1–D30.

EXPECT:
The run can complete from new game through Final Expedition and final result.

PASS:
No progression softlock or missing required phase.

### RUN-Q66 — BROWSER LOOP BLOCKER

Real browser path:
`ORDER -> SALE -> NIGHT -> CLOSING -> next Day`

Must include at least one injury result path and one non-injury result path.
PASS:
- progression completes
- Console runtime error count = 0
- no `ReferenceError: game is not defined`

### RUN-Q76 — MAIN LOOP SMOKE

Real browser progression must still complete:

```text
START -> MORNING -> ORDER -> SALE -> NIGHT -> CLOSING -> next Day
```

and a D25->D30 persistence path.

PASS:
- Console runtime error = 0
- no phase blocker
- no save-version/reference error

## BALANCE QA

### RUN-Q15 — FINAL INVESTMENT VALUE
SETUP:
Compare an invested returning NPC and a same-day/random newcomer at D30.

EXPECT:
Normal balance favors long-term invested NPC value on average.

PASS:
Last-day newcomer does not systematically replace the value of 30-day investment.

## FINAL DETAIL QA OWNERSHIP

Detailed Final Family / party / Power / Roll / clear acceptance criteria are owned by:
-> FINAL_EXPEDITION_v2.8.0.md

Boss identity / reveal / Trait / Sloth acceptance criteria are owned by:
-> BOSS_v2.8.0.md

Meta progression acceptance criteria are owned by:
-> META_v2.8.0.md

CORE_RUN_QA retains only Run-flow, D30 timing, stock timing, save/resume, and complete-loop integration checks.
