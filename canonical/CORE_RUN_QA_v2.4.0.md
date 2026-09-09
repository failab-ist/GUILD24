# CORE_RUN_QA

DOC=CORE_RUN_QA
OWNER=qa,core_run,run_flow

DOC_VERSION=2.4.0
CANONICAL_SET=GUILD24_CANONICAL_v2.4.0


Status values are NOT stored here.
This file defines acceptance criteria only.

## RUN-Q01 — NEW RUN INITIALIZATION
SETUP:
Start a new run.

EXPECT:
- Day=1 normal flow starts after D0 setup
- Gold=1200G
- InventoryCapacity=24
- starting stock:
  - 삼각김밥×2
  - 생수×2
  - 붕대×1
  - 하급포션×1
- no unintended extra resources

PASS:
All starting values match canonical state.

## RUN-Q02 — D0 RELIC BEFORE BUSINESS
SETUP:
Start a new run.

EXPECT:
D0 Foundation Relic selection occurs before first normal business loop.

PASS:
Player can resolve D0 Relic choice before D1 Morning/Order flow.

## RUN-Q03 — PHASE ORDER
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

## RUN-Q04 — ZERO CUSTOMER FLOW
SETUP:
Force/seed a day with zero Sale customers if supported.

EXPECT:
Sale resolves without softlock and proceeds to Night.

PASS:
No blocked progression.

## RUN-Q05 — ZERO NIGHT RESULT FLOW
SETUP:
Enter Night with no expedition result.

EXPECT:
Night proceeds directly to Closing.

PASS:
No blocked progression.

## RUN-Q06 — DAILY OVERHEAD
SETUP:
Complete a normal day.

EXPECT:
- v2.4 starting baseline daily overhead=60G unless modified by explicit canonical effect
- exactly one base overhead charge occurs per completed normal Day
- final post-simulation base overhead may change only through approved PASS3 tuning

PASS:
Closing and final Gold use the same actual overhead value,
with no duplicate/missing charge and no silent balance change.

## RUN-Q07 — BASE VISITOR RANGE
SETUP:
Generate multiple normal days without visitor-count modifiers.

EXPECT:
Base visitors are within 3–6/day.

PASS:
Observed base generation respects range.

## RUN-Q08 — NPC PERSISTENCE
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

## RUN-Q09 — DEAD NPC REMOVAL
SETUP:
Cause one NPC to die.

EXPECT:
- death remains permanent for the Run
- NPC does not visit again
- NPC does not consume Living NPC Cap

PASS:
All three conditions hold.

## RUN-Q10 — DAY/GATE STATE STABILITY
SETUP:
Enter a Day with generated Gate state.
Save/Reload before resolving the Day.

EXPECT:
Generated Gate/Family/Tier state remains unchanged.

PASS:
Reload is not a reroll.

## RUN-Q11 — ORDER STATE STABILITY
SETUP:
Generate Order offers.
Save/Reload before confirming order.

EXPECT:
Current offer state remains stable.

PASS:
Reload does not generate better/different offers unless a canonical reroll action was used.

## RUN-Q12 — RELIC STATE STABILITY
SETUP:
Open a Relic window and record candidates/prices.
Save/Reload.

EXPECT:
Same candidates/prices/window state.

PASS:
Reload is not a Relic reroll.

## RUN-Q13 — NIGHT RESOLUTION STABILITY
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

## RUN-Q14 — DAY30 FINAL TIMING
SETUP:
Reach D30.

EXPECT:
- final relevant management/preparation occurs before lock
- D30 Relic window is available before final lock
- Final Expedition begins only after lock

PASS:
No post-lock management changes resolved expedition state.

## RUN-Q15 — FINAL INVESTMENT VALUE
SETUP:
Compare an invested returning NPC and a same-day/random newcomer at D30.

EXPECT:
Normal balance favors long-term invested NPC value on average.

PASS:
Last-day newcomer does not systematically replace the value of 30-day investment.

## RUN-Q16 — D30 STOCK TIMING HONESTY
SETUP:
Hold/buy stock near expiry before Final.

EXPECT:
D30 follows canonical stock/expiry rules unless an explicit Canonical override exists.
Player-facing usability is understandable before commitment.

PASS:
Displayed Final usability matches actual stock behavior.

## RUN-Q17 — TURN-BASED ONLY
SETUP:
Play all core phases.

EXPECT:
No gameplay decision depends on real-time countdown/reflex input.

PASS:
Entire core loop is turn-based.

## RUN-Q18 — CROSS-RUN RESET
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
No unintended permanent combat/NPC power carries over.

## RUN-Q19 — SAVE/RESUME COMPLETE STATE
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

## RUN-Q20 — COMPLETE 30-DAY LOOP
SETUP:
Play/simulate D1–D30.

EXPECT:
The run can complete from new game through Final Expedition and final result.

PASS:
No progression softlock or missing required phase.

## FINAL DETAIL QA OWNERSHIP

Detailed Final Family / party / Power / Roll / clear acceptance criteria are owned by:
-> FINAL_EXPEDITION_v2.4.0.md

CORE_RUN_QA retains only Run-flow, D30 timing, stock timing, save/resume, and complete-loop integration checks.

## RUN-Q25 — SALE ATOMIC COMMIT
SETUP:
Complete a paid purchase and inspect all affected state immediately.

EXPECT:
Wallet, Player Gold, physical Inventory unit, NPC bag, Consumer Slot, applicable Loyalty/history update together as one committed purchase.

PASS:
No partial purchase state exists.

## RUN-Q26 — CONSUMER SLOT CONTRACT
SETUP:
Sell to normal NPC and Lv10+ NPC.

EXPECT:
- normal visit purchase cap=2 Items
- Lv10+ visit purchase cap=3 Items
- all sellable Inventory remains visible despite remaining-slot count

PASS:
No hidden/infinite extra-slot behavior exists.

## RUN-Q27 — CUSTOMER FINALIZE LOCK
SETUP:
Finalize a Customer after purchases, then attempt normal management changes before Night.

EXPECT:
Committed purchases/destination/expedition preparation cannot be retroactively altered by normal management actions.

PASS:
Finalized Customer state is stable.

## RUN-Q28 — VALID NO-SALE CHOICE
SETUP:
Process a Customer and deliberately sell nothing.

EXPECT:
Customer can be finalized with zero purchases without artificial punishment subsystem or softlock.
Existing downstream preparation/future-value consequences may still occur.

PASS:
No-sale remains a valid strategic action.

## RUN-Q29 — MONSTER KNOWLEDGE REQUIRES SUPPLIED SURVIVAL
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

## RUN-Q30 — MINIMAL-ENGAGEMENT / DAY-FARMING
SETUP:
Multi-seed compare:
A. normal engaged play
B. repeated zero-sale / zero-order / zero-supply day advancement
C. poverty/minimum-spend play

Track:
- Day reached
- Gold
- Meta XP/unlocks
- NPC growth/value
- Knowledge
- Final viability

EXPECT:
- normal engaged play is clearly superior in economy/meta/progression
- Day number alone is not an efficient permanent-reward farm
- B does not routinely coast into D20+ / D25+ while remaining economically or Meta-efficient
- no new inactivity punishment subsystem is required

PASS:
Existing economy/dungeon/NPC/meta systems create the opportunity cost naturally.

Exact reward/overhead tuning:
PASS3 after integrated v2.4 simulation.
