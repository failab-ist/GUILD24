# ECONOMY_ORDER_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/ECONOMY_ORDER_QA_v2.8.0.md
CHAIN=design_ssot/ECONOMY_ORDER_QA_v2.8.0.md,design_ssot/history/ECONOMY_ORDER_QA_v2.7.0.md,design_ssot/history/ECONOMY_ORDER_QA_v2.6.1.md,design_ssot/history/ECONOMY_ORDER_QA_v2.5.0.md

Current-spec consolidation of a QA owner. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/ECONOMY_ORDER_QA_v2.8.0-patch.md`; v2.7.0 / v2.6.1 / v2.5.0 stay in `history/`.
Checks are judged live against the consolidated design owner `design_ssot/ECONOMY_ORDER_v2.8.0.md`.

Placement: checks keep their QA IDs and are grouped under one `##` topic level (PRICE MODES / ROUNDING,
PURCHASE / REFUSAL, NPC WALLET, ORDER FLOW, REROLL, ORDER RARITY / PITY, NEXT-DAY FORECAST, GOLD
ACCOUNTING, D30 FINAL PREPARATION, BALANCE QA, RELATED); every check is one `###` heading. The
2026-09-12 amendment is merged: its live Great-Success bullet joins ECO-Q-v28-1, its Deep-sponsorship
bullets join ECO-Q-v28-2, its Stage 9 Wallet measurement and D30 PREP START GOLD KPI join BALANCE QA.
No check was added; no Grade ORDER discount / Franchise / Start Contract check exists in the chain.

## LEGACY — inheritance pointers / patch framing / tuning history

```text
Status values are NOT stored here.
Status values are not stored here. This patch overrides stale Reroll and Wallet expectations in the base.
All unchanged v2.6.1 Wallet / Order / Reroll QA remains inherited.
## INHERITANCE
All non-conflicting v2.7 Economy / Order QA remains active.
This supersedes stale 30/60/120/240 expectations.
Exact overhead curve / economy tuning remains PASS3.
## APPROVED_AMENDMENT_2026_09_12 — WALLET / GREAT SUCCESS GOLD / D30 CASH QA
```


`Status values are NOT stored here.` duplicates the kept v2.7 line `Status values are not stored here. FAIL is valid evidence.`
ORD-Q65 supersession note: the stale curve is dropped below (ORD-Q08). ECO-Q12 PASS3 note: the operating-cost
curve is now exact (ECO-Q-v28-4; ECONOMY_ORDER_v2.8.0 `## BASE OPERATING COST`).

## LEGACY — 2026-09-12 amendment lines restated by kept v2.8 checks

Great Success Store Gold bullets are restated by ECO-Q-v28-1 (ordinary Success 0, ordinary Great Success
Day-band amount, Deep Great Success 0). Wallet variation / Level / carry are restated by ECO-Q-v28-3B
(`Level ×8 + randomInt(0,80)`, `returning NPC keeps persistent Wallet before visit income is added`).
The amendment sub-headings are replaced by the ECO-Q-v28-1 / ECO-Q-v28-2 headings they merge into.

```text
### NORMAL GREAT SUCCESS GOLD
- ordinary Success -> no extra Store Gold
- normal Great Success -> extra Store Gold
- Deep Great Success -> Store Gold 0
### DEEP SPONSORSHIP
- ordinary NPC variation remains
- existing Level / carry behavior remains
```


## SUPERSEDED — ORD-Q08 reroll curve 30/60/120/240 -> 50/100/200/400/800/x2 (ORD-Q65; ECONOMY_ORDER_v2.8.0 `## REROLL`)

```text
## ORD-Q08 — REROLL COST TARGET
SETUP:
Use 4 rerolls on a fresh Day.

EXPECT:
Approved retained v2.5 starting curve:
30→60→120→240G

PASS:
Implementation matches the starting curve; later full-run balance may tune it explicitly.
```


## SUPERSEDED — ORD-Q12 PASS3 later-cost bullet 60 -> 120 -> 240 (RELIC_v2.8.0 `발주 교환권`: 0 -> 100 -> 200 -> 400 -> 800 -> x2)

The rest of ORD-Q12 is kept.

```text
- with the PASS3 starting base curve, later same-Day costs are 60G -> 120G -> 240G ...
```


## SUPERSEDED — ORD-Q11 forecast boundary "only Tier distribution" (replaced by ORD-Q84, which also exposes the next-day Gate-count forecast; ECONOMY_ORDER_v2.8.0 `### INFORMATION BOUNDARY` / `### NEXT-DAY GATE COUNT FORECAST`)

Every hidden item of ORD-Q11 is in the ORD-Q84 FAIL list (Family, exact Gate composition, future customer identity,
future NPC destination, exact success/death probability).

```text
## ORD-Q11 — FORECAST INFORMATION BOUNDARY
SETUP:
Inspect Order forecast.

EXPECT:
Hidden:
- next-day Family
- actual Gate result
- visitor identity
- NPC destination
- expedition success/death %

PASS:
Only Tier distribution and permitted market information are exposed.
```


## SUPERSEDED — ECO-Q61 / ECO-Q62 Wallet 150 + Level×8 + random(0,60) -> ECO-Q-v28-3B 180 + Level ×8 + randomInt(0,80) (ECONOMY_ORDER_v2.8.0 `### Ordinary NPC Wallet on visit — exact`)

Carry 100% and cap 2000 stay checked by ECO-Q-v28-3B (`returning NPC keeps persistent Wallet before visit income is added`, `cap 2000 remains`).

```text
## ECO-Q61 — FIRST VISIT WALLET BASELINE

For a known Level and controlled RNG:
Persistent Wallet = 150 + Level×8 + random(0,60)

PASS:
- fixed base is 150G, not 100G
- ordinary random/Level variation remains

## ECO-Q62 — REVISIT WALLET

EXPECT:
`previous Persistent Wallet + Level×8 + random(0,60)`

PASS:
- no repeated +150 base
- carry is 100%
- final permanent wallet cap 2000
```


## SUPERSEDED — 2026-09-12 amendment comparative / replaced expectations

`global Wallet baseline is higher from D1` is a comparison with the retired 150 base (exact baseline: ECO-Q-v28-3B).
`purchase-intent parameters unchanged` is replaced by the v2.8 acceptance (Bag-slot penalty retired, 정가 burden
bonus; ECO-Q-v28-3; ECONOMY_ORDER_v2.8.0 `## ORDINARY SALE PURCHASE ACCEPTANCE`).
`bonus follows Gate/Tier scale` is replaced by the Day-band amount (ECO-Q-v28-1; ECONOMY_ORDER_v2.8.0 `## GREAT SUCCESS STORE GOLD`).

```text
- global Wallet baseline is higher from D1
- purchase-intent parameters unchanged
- bonus follows Gate/Tier scale
```


## REWORD — ORD-Q14 PASS: dead clause "tomorrow contributes only the allowed Tier probability forecast" trimmed (the next-day Gate-count forecast is also allowed; forecast boundary is ORD-Q84)

```text
Today's Gate/Hazard is the primary preparation context, while tomorrow contributes only the allowed Tier probability forecast.
```

```new
```


## REWORD — ORD-Q87 pointer to the current Item owner, version framing "new" removed

```text
Using the 10 new Epic preparation Items from `ITEM_v2.7.0.md`:
```

```new
Using the 10 Epic preparation Items from `ITEM_v2.8.0.md`:
```


## REWORD — RELATED pointers to current v2.8.0 owners

```text
Generation owner -> `DUNGEON_HAZARD_v2.7.0.md`
Rarity progression / Final price owner -> `ECONOMY_ORDER_v2.7.0.md`
Item catalog -> `ITEM_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Boss/GREED -> `BOSS_v2.7.0.md`
Presentation QA -> `UI_UX_QA_v2.7.0.md`
```

```new
Generation owner -> `DUNGEON_HAZARD_v2.8.0.md`
Rarity progression / Final price owner -> `ECONOMY_ORDER_v2.8.0.md`
Item catalog -> `ITEM_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Boss/GREED -> `BOSS_v2.8.0.md`
Presentation QA -> `UI_UX_QA_v2.8.0.md`
```


## REWORD — check headings one level down (`##` -> `###`) under the topic groups

```text
## ECO-Q01 — NORMAL PRICE MODES
## ECO-Q02 — PRICE ROUNDING CONSISTENCY
## ECO-Q03 — 50% ROLE
## ECO-Q04 — 150% ROLE
## ECO-Q05 — UNAFFORDABLE RETRY LOGIC
## ECO-Q06 — PRICE RESISTANCE RETRY
## ECO-Q07 — ITEM UNWANTED LOGIC
## ECO-Q08 — REFUSAL COPY
## ECO-Q-v28-3 — ORDINARY PURCHASE ACCEPTANCE BASELINE
## ECO-Q-v28-3B — ORDINARY NPC WALLET ON VISIT
## ECO-Q63 — RICH
## ORD-Q01 — BASE OFFER COUNT
## ORD-Q02 — ORDER TOTAL
## ORD-Q03 — INVENTORY CAPACITY
## ORD-Q13 — SAME-DAY ORDER ARRIVAL
## ORD-Q61 — ORDER CONFIRM SEPARATION
## ORD-Q62 — REROLL WITH CART
## ORD-Q63 — RE-ORDER AFTER REROLL
## ORD-Q64 — SEPARATE START SALE
## ORD-Q66 — DECISION INFO
## ORD-Q67 — MOBILE CONTINUITY
## ORD-Q04 — PAID FULL-OFFER REROLL
## ORD-Q05 — REROLL DAILY RESET
## ORD-Q06 — REROLL PITY INTEGRITY
## ORD-Q07 — REROLL ELIGIBILITY
## ORD-Q65 — REROLL COST
## ORD-Q12 — RELIC REROLL INTERACTION
## ORD-Q88 — REROLL RESPECTS CURRENT-DAY RARITY BAND
## ORD-Q86 — DAY-BAND RARITY WEIGHTS EXACT
## ORD-Q87 — EPIC PROGRESSION WITHOUT HARD D20 UNLOCK
## ECO-Q-v28-5 — ORDER PITY EXACT
## ORD-Q09 — TIER FORECAST TIMING
## ORD-Q10 — TIER FORECAST ACCURACY
## ORD-Q14 — TODAY GATE / TOMORROW FORECAST BOUNDARY
## ORD-Q80 — MORNING NEXT-DAY GATE COUNT FORECAST
## ORD-Q81 — FIXED NEXT-DAY GATE COUNT
## ORD-Q82 — NEXT-DAY TIER FORECAST
## ORD-Q83 — FORECAST SAVE/LOAD INTEGRITY
## ORD-Q84 — FORECAST INFORMATION BOUNDARY
## ORD-Q85 — ORDER FORECAST CONTINUITY
## ECO-Q10 — CLOSING ECONOMICS
## ECO-Q META/BOSS — CUMULATIVE GROSS SALES CONSISTENCY
## ECO-Q-v28-4 — BASE OPERATING COST EXACT
## ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD
## ECO-Q-v28-2 — DEEP SPONSORSHIP
## ORD-Q90 — FINAL FIXED 50% / WALLET / GOLD ACCOUNTING
## ECO-Q09 — EARLY WALLET PLAYABILITY
## ECO-Q11 — STRATEGY DIVERSITY
## ECO-Q12 — MINIMAL-ENGAGEMENT ECONOMY
## ORD-Q89 — LATE-RUN OFFER MIX MEASUREMENT
```

```new
### ECO-Q01 — NORMAL PRICE MODES
### ECO-Q02 — PRICE ROUNDING CONSISTENCY
### ECO-Q03 — 50% ROLE
### ECO-Q04 — 150% ROLE
### ECO-Q05 — UNAFFORDABLE RETRY LOGIC
### ECO-Q06 — PRICE RESISTANCE RETRY
### ECO-Q07 — ITEM UNWANTED LOGIC
### ECO-Q08 — REFUSAL COPY
### ECO-Q-v28-3 — ORDINARY PURCHASE ACCEPTANCE BASELINE
### ECO-Q-v28-3B — ORDINARY NPC WALLET ON VISIT
### ECO-Q63 — RICH
### ORD-Q01 — BASE OFFER COUNT
### ORD-Q02 — ORDER TOTAL
### ORD-Q03 — INVENTORY CAPACITY
### ORD-Q13 — SAME-DAY ORDER ARRIVAL
### ORD-Q61 — ORDER CONFIRM SEPARATION
### ORD-Q62 — REROLL WITH CART
### ORD-Q63 — RE-ORDER AFTER REROLL
### ORD-Q64 — SEPARATE START SALE
### ORD-Q66 — DECISION INFO
### ORD-Q67 — MOBILE CONTINUITY
### ORD-Q04 — PAID FULL-OFFER REROLL
### ORD-Q05 — REROLL DAILY RESET
### ORD-Q06 — REROLL PITY INTEGRITY
### ORD-Q07 — REROLL ELIGIBILITY
### ORD-Q65 — REROLL COST
### ORD-Q12 — RELIC REROLL INTERACTION
### ORD-Q88 — REROLL RESPECTS CURRENT-DAY RARITY BAND
### ORD-Q86 — DAY-BAND RARITY WEIGHTS EXACT
### ORD-Q87 — EPIC PROGRESSION WITHOUT HARD D20 UNLOCK
### ECO-Q-v28-5 — ORDER PITY EXACT
### ORD-Q85 — ORDER FORECAST CONTINUITY
### ECO-Q10 — CLOSING ECONOMICS
### ECO-Q META/BOSS — CUMULATIVE GROSS SALES CONSISTENCY
### ECO-Q-v28-4 — BASE OPERATING COST EXACT
### ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD
### ECO-Q-v28-2 — DEEP SPONSORSHIP
### ORD-Q90 — FINAL FIXED 50% / WALLET / GOLD ACCOUNTING
### ECO-Q09 — EARLY WALLET PLAYABILITY
### ECO-Q11 — STRATEGY DIVERSITY
### ECO-Q12 — MINIMAL-ENGAGEMENT ECONOMY
### ORD-Q89 — LATE-RUN OFFER MIX MEASUREMENT
```


## NEW — topic group headings

```new
## PRICE MODES / ROUNDING
## PURCHASE / REFUSAL
## NPC WALLET
## ORDER FLOW
## REROLL
## ORDER RARITY / PITY
## NEXT-DAY FORECAST
## GOLD ACCOUNTING
## D30 FINAL PREPARATION
## BALANCE QA
```

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

C: old stage label renamed.

```text
- Stage 9 measures 2-slot affordability/use
Stage 9 reports P10/P25/median/P75/P90.
```

```new
- Full-run balance measurement measures 2-slot affordability/use
Full-run balance measurement reports P10/P25/median/P75/P90.
```

## AMENDMENT — User decision 2026-09-23: Store Support rebalance

ORD-Q12: 발주 교환권 no longer consumes the first paid step; after the free Reroll the ordinary curve starts at 50G (reports/relic-balance/FINAL_PROPOSAL.md).

```text
- the free use consumes the first daily Reroll step
```

```new
- after the free use, paid Rerolls follow the ordinary curve from its first step (50 -> 100 -> 200 ...)
```


## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

Supply is no longer a Player-facing expedition effect; ECO-Q-v28-2 names Fatigue recovery instead.

```text
- no Stat/Supply effect from sponsorship
```

```new
- no Stat / Fatigue-recovery effect from sponsorship (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 onboarding / ORDER (User decision 2026-09-24)

ORD-Q84 reveal boundary narrowed to individual identity / individual destination; per-Gate visitor-count expectation added (only with two or more open Gates, sums to the visitor count, no identity).

```text
- future customer identity
- future NPC destination
```

```new
PASS (per-Gate visitor counts; User 2026-09-24, v2.9.0):
- with two or more open Gates, MORNING / ORDER show the current-day visitor count per open Gate
- the per-Gate counts sum to the expected visitor count
- each count follows the destination the customer claims; a liar's or a pilgrimage-rerouted customer's true Gate is not revealed
- with one open Gate no per-Gate breakdown appears
- no name / Job / Trait / Wallet is revealed with the counts
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
Controlled next-Day generation state with a randomized Gate-count band.
- MORNING exposes every possible next-day Gate count with exact probability
- displayed probabilities match the same canonical generation rule used for the next Day
- impossible counts are not presented as possible
- no next-day Family / exact Gate composition / Hazard set is revealed
Controlled next-Day generation state where Gate count is deterministic.
- MORNING exposes the fixed count as confirmed/deterministic information
- UI does not fabricate a probability split for a fixed result
- MORNING exposes exact T1/T2/T3 probability distribution before ORDER commitment
- values match the canonical next-day Tier-generation distribution
- forecast is not mislabeled as expedition success/death probability
For a controlled seeded Run:
- record MORNING next-day Gate-count and Tier forecasts
- save/reload repeatedly without advancing the Day
- forecast does not reroll on reload
- the eventual next-Day generation is governed by the same seeded/run generation state represented by the forecast
- no independent forecast-only RNG path exists
MORNING/ORDER forecast may expose:
- next-day Gate-count distribution/fixed count
- next-day T1/T2/T3 distribution
FAIL if it newly exposes:
- exact Gate composition
- Hazard set
- exact success/death probability
- recommended SKU/category/quantity
Enter Morning/Order.
Next-day T1/T2/T3 probabilities are visible before order commitment.
Player can use forecast for purchasing decisions.
Inspect displayed next-day Tier distribution and generation weights.
Displayed percentages equal actual next-day Tier distribution.
No fake/approximate percentage if UI presents exact numbers.
Enter Morning then Order on a normal Day.
Before Order commitment, Player can use:
- current-day open Gate information
- current-day known Hazard information
- exact next-day T1/T2/T3 probabilities
Next-day hidden:
- Family
```

```new
### ORD-Q09 / Q10 / Q14 / Q80 / Q81 / Q82 / Q83 — NEXT-DAY FORECAST — RETIRED
(User 2026-09-24, v2.9.0) The next-day forecast surface is gone: nothing to time, display or keep consistent. The generation rules themselves are covered by DUNGEON_ITEM_QA. Still FAIL anywhere on MORNING / ORDER if it newly exposes next-day Family, exact Gate composition, Hazard set, an individual future customer's identity or destination, exact success/death probability, or a recommended SKU/category/quantity.
### ORD-Q84 — PER-GATE VISITOR COUNTS
```

## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```text
dayBase = 90 + 2×(Day-1)
```

```new
dayBase = 90 + 5×(Day-1)    (v2.9.0)
```
