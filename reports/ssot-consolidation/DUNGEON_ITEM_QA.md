# DUNGEON_ITEM_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/DUNGEON_ITEM_QA_v2.8.0.md
CHAIN=design_ssot/DUNGEON_ITEM_QA_v2.8.0.md,design_ssot/history/DUNGEON_ITEM_QA_v2.7.0.md,design_ssot/history/DUNGEON_ITEM_QA_v2.5.0.md

Current-spec consolidation of a QA owner. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/DUNGEON_ITEM_QA_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.
Checks are judged against the current design owners `DUNGEON_HAZARD_v2.8.0.md` and `ITEM_v2.8.0.md`
(plus `NPC_TRAIT_v2.8.0.md`, `EVENT_v2.8.0.md`, `META_v2.8.0.md` where a check points there).

Layout: one `##` topic group, one `###` per check. QA IDs are unchanged (including the
`DUN-Q-v27-GATE-SLOPE` and `DI-Q-v28-*` IDs, which are IDs, not version tags). The v2.5 Great Success /
Deep amendment sub-checks keep their `###` headings inside GREAT SUCCESS / DEEP EXPEDITION. Rule
lines are copied verbatim by script from the baseline chain.

## LEGACY — inheritance / override scaffolding (the chain is now inline)

Every stale check the v2.7 override list names is dropped or trimmed under SUPERSEDED / REWORD below
(DUN-Q07 PASS line, ITEM-Q01, ITEM-Q06, ITEM-Q07 Combat clause, ITEM-Q08, ITEM-Q18 Supply/native line,
v2.5 / early-v2.7 numeric bundles in ITEM-Q77 / ITEM-Q81 / ITEM-Q84 / ITEM-Q19).

```text
## INHERITED QA OVERRIDES
The following inherited v2.5 expectations are stale and explicitly superseded:
- `DUN-Q07` third Lv10+ slot as insurance/flex/luxury
  - v2.7 ordinary Bag is exactly 2 slots at every Level
- `ITEM-Q01` category set containing `Medical`
  - v2.7 exact set is Food / Drink / Potion / Field Gear / Insurance / Special
- `ITEM-Q06` Bandage/First-Aid injury-insurance line
  - 붕대 is retired; 구급키트 is Aftercare Insurance; Potion is a separate raw-Power category
- `ITEM-Q07` 불룡볶음면 Combat identity
  - current exact effect is 강인함 +8 / 냉기 +6 / Supply 4
- `ITEM-Q08` 마석 보조배터리 active Spirit/Special identity
  - retired; its catalog slot is 중급 포션
- `ITEM-Q18` generic Fresh core boost to Supply/native recovery
  - current Fresh Relics use the exact scopes in `RELIC_v2.7.0.md`; generic Supply amplification/native-recovery blanket behavior is not inherited
- any v2.5 active-catalog numeric bundle that conflicts with `ITEM_v2.7.0.md`
- any earlier v2.7 draft Item Stat/price bundle that conflicts with the current active catalog in `ITEM_v2.7.0.md`
- any v2.5 Fatigue/Supply/Death-risk value that conflicts with `DUNGEON_HAZARD_v2.7.0.md`
All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.
## INHERITANCE
All non-conflicting v2.7 Dungeon/Item QA remains active.
```

## LEGACY — duplicate header line

Kept once as `Status values are not stored here.`

```text
Status values are NOT stored here.
```

## LEGACY — amendment heading

Its sub-checks (GREAT SUCCESS / DEEP SCHEDULE / DEEP GATE / EVENT EXCLUSION) are kept under `## GREAT SUCCESS / DEEP EXPEDITION`.

```text
## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION QA
```

## SUPERSEDED — ITEM-Q01 category set with Medical

Replaced by ITEM-Q70 (Food / Drink / Potion / Field Gear / Insurance / Special; ITEM_v2.8.0.md PLAYER-FACING CATEGORY — EXACT).

```text
## ITEM-Q01 — PRODUCT CATEGORY
SETUP:
Inspect all canonical items.
EXPECT:
Each maps clearly to:
Food/Drink/Medical/FieldGear/Insurance/Special
PASS:
No ambiguous player-facing classification.
```

## SUPERSEDED — ITEM-Q06 Potion vs Bandage/First Aid

붕대 is retired and Potion is raw-Power only (ITEM_v2.8.0.md BANDAGE RETIREMENT, POTION LINE: Insurance = 0); 구급키트 Aftercare is ITEM-Q75, Potion Insurance 0 is ITEM-Q72.

```text
## ITEM-Q06 — POTION / INJURY ROLE
SETUP:
Compare upper potion vs Bandage/First Aid.
EXPECT:
Potion owns general recovery/stat.
Bandage/First Aid owns injury insurance.
PASS:
Upper potion does not also dominate injury protection.
```

## SUPERSEDED — ITEM-Q08 마석 보조배터리

Retired; its slot is 중급 포션 (ITEM_v2.8.0.md POTION LINE, ITEM-Q71 / ITEM-Q72). No live check replaces the generic Job-invariance clause: see TEST GAP in the report.

```text
## ITEM-Q08 — MANA BATTERY
SETUP:
Use on different Jobs.
EXPECT:
Same base Spirit/Special effect regardless of Job.
PASS:
No Job-specific hidden modifier changes the Item effect.
```

## SUPERSEDED — DUN-Q07 third Lv10+ slot

Ordinary Bag is exactly 2 slots (SALE_v2.8.0.md); `no viable route requires a third normal Bag slot` is DUN-Q72. The live EXPECT line (<=2 meaningful required prep slots, DUNGEON_HAZARD_v2.8.0.md TIER CONTRACT T3) is kept.

```text
PASS:
Third Lv10+ slot remains insurance/flex/luxury.
```

## SUPERSEDED — ITEM-Q18 generic Supply/native-recovery boost line

Named stale by the v2.7 override list (Fresh Relics use exact RELIC_v2.8.0.md scopes); the live Counter/Insurance/RiskReward non-scaling line and the no-blanket-multiplier PASS are kept (ITEM_v2.8.0.md CATEGORY AFFINITY BOUNDARY).

```text
Generic core boost affects Supply/native Stat/native recovery only.
```

## SUPERSEDED — ITEM-Q19 30-item count

Active catalog count is exactly 40 (ITEM_v2.8.0.md ACTIVE CATALOG; ITEM-Q71, DI-Q-v28-1).

```text
- 30 active items
```

## SUPERSEDED — ITEM-Q77 pre-v2.8 meal/water values

삼각김밥 / 생수 / 간단 도시락 / 길드 특제 도시락 values are DI-Q-v28-1 (ITEM_v2.8.0.md MEAL / WATER LINE table). The other eight bullets still match the current catalog and are kept.

```text
- Rice survival +8 / Supply5
- Water survival +6 / Supply3
- Bar combat +6 / Supply4
- Premium Lunch survival +10 / Supply7 / loot20%
```

## SUPERSEDED — ITEM-Q81 길드 프리미엄 도시락 price

Now 길드 특제 도시락 160 / 340 (DI-Q-v28-1; ITEM_v2.8.0.md MEAL / WATER LINE).

```text
길드 프리미엄 도시락 170 / 360
```

## SUPERSEDED — ITEM-Q84 결전 특선 도시락 / 용사 특식 핫바

IDs reused as 영웅 결전 도시락 210/440 강인함 +18 / Supply 9 and 왕도 천연암반수 185/390 강인함 +20 / Supply 2 (DI-Q-v28-1; ITEM_v2.8.0.md ACTIVE REPLACEMENT IDS).

```text
결전 특선 도시락       Food E    180/380  강인함+12 / Supply9
용사 특식 핫바         Food E    170/360  투력+8 / Supply7
```

## REWORD — pointer names the current owner file

```text
Final reads each selected Family's existing T2 Hazard definition from DUNGEON_HAZARD.
Detailed Final combination/power/clear QA -> FINAL_EXPEDITION.
Owner rule: `DUNGEON_HAZARD_v2.7.0.md` §GATE POWER — LATE-DAY SLOPE.
Audit the exact active table in `ITEM_v2.7.0.md`, including:
- unchanged original-catalog prices remain exactly as listed in `ITEM_v2.7.0.md`
- practical late-Run frequency comes only from current `ECONOMY_ORDER_v2.7.0.md` Day-band Rarity progression plus existing general eligibility rules
EXPECT base-additive modifier composition from `ITEM_v2.7.0.md`:
```

```new
Final reads each selected Family's existing T2 Hazard definition from `DUNGEON_HAZARD_v2.8.0.md`.
Detailed Final combination/power/clear QA -> `FINAL_EXPEDITION_v2.8.0.md`.
Owner rule: `DUNGEON_HAZARD_v2.8.0.md` §GATE POWER — LATE-DAY SLOPE.
Audit the exact active table in `ITEM_v2.8.0.md`, including:
- practical late-Run frequency comes only from current `ECONOMY_ORDER_v2.8.0.md` Day-band Rarity progression plus existing general eligibility rules
EXPECT base-additive modifier composition from `ITEM_v2.8.0.md`:
```

## REWORD — version framing

```text
Long-expedition preparation is one global Supply decision rather than an extra Hazard/micro-system, and the approved v2.5 retained starting eligibility/values are implemented.
- inherited T1/T2/T3 Supply-Burden eligibility/requirements remain intact unless separately changed
- environment incident chance uses the exact v2.8 closure formula and 2%–48% clamp
- escape chance uses the exact v2.8 closure formula and 15%–94% clamp
PASS: no stale v2.5 or earlier v2.7 Stat bundle survives.
- its v2.7 gameplay identity is the dedicated Poison Hazard specialist
- all 10 new Epic preparation Items use the ordinary Epic pool
Uses approved v2.5 retained starting escapeBonus +50%p and raises escape/retreat chance without increasing combat success directly.
±17.5% is used as the v2.5 retained baseline and any later retune is supported by outcome evidence.
```

(v2.9.0: the reworded DUN-Q17 PASS line and DUN-Q76 `T1/T2/T3 Supply-Burden eligibility/requirements remain intact` line were deleted with those checks; see the v2.9.0 AMENDMENT below.)

```new
- environment incident chance uses the exact closure formula and 2%–48% clamp
- escape chance uses the exact closure formula and 15%–94% clamp
PASS: no stale Stat bundle survives.
- its gameplay identity is the dedicated Poison Hazard specialist
- all 10 Epic preparation Items use the ordinary Epic pool
Uses approved escapeBonus +50%p and raises escape/retreat chance without increasing combat success directly.
±17.5% is used as the baseline and any later retune is supported by outcome evidence.
```

## REWORD — version framing; pointer names the current owner file

```text
- Severe recovery remains its separate inherited rule
- exactly 10 new Epic preparation Items from current `ITEM_v2.7.0.md` are active
- catalog Supply values match ITEM starting table
```

```new
- Severe recovery remains its separate rule in `NPC_TRAIT_v2.8.0.md`
- exactly 10 Epic preparation Items from `ITEM_v2.8.0.md` are active
- catalog Supply values match the `ITEM_v2.8.0.md` active catalog
```

## REWORD — tuning-pass label (the factor itself, ×1.50, is DI-Q-v28-11)

```text
- required Combat Power = base Gate Power × one PASS3 Deep factor
```

```new
- required Combat Power = base Gate Power × one Deep factor
```

## REWORD — dead 30-item count trimmed (current count 40 is ITEM-Q71 / DI-Q-v28-1)

```text
Audit canonical 30-item catalog by Category/Rarity/Role.
```

```new
Audit canonical active catalog by Category/Rarity/Role.
```

## REWORD — dead clause trimmed: 불룡볶음면 has no Combat effect (ITEM_v2.8.0.md OTHER ACTIVE ITEMS #13: 강인함 +8 / 냉기 +6 / Supply 4)

```text
Lava Noodle retains Food/Combat/Hybrid identity.
```

```new
Lava Noodle retains Food/Hybrid identity.
```

## REWORD — heading level (checks are `###` under one `##` topic group; text unchanged)

```text
## DUN-Q01 — FAMILY IDENTITIES
## DUN-Q02 — STAT MAPPING
## DUN-Q03 — SPIRIT RELEVANCE
## DUN-Q04 — FAMILY HAZARD BOUNDARIES
## DUN-Q19 — NONCANONICAL KEY ISOLATION
## DUN-Q21 — HAZARD EXPLANATION CONSISTENCY
## DUN-Q16 — FINAL FAMILY DATA OWNERSHIP
## DUN-Q12 — FAMILY INTRODUCTION
## DUN-Q13 — TIER DAY PROGRESSION
## DUN-Q14 — INTRA-BAND CURVE
## DUN-Q15 — MULTI-GATE VARIETY
## DI-Q-v28-12 — GATE COUNT / TIER DISTRIBUTION EXACT
## DUN-Q70 — PREPARED POWER WEIGHTS
## DUN-Q-v27-GATE-SLOPE — LATE-DAY GATE POWER
## DUN-Q71 — HAZARD THREAT CURVE
## DI-Q-v28-13 — FORECAST / HAZARD LABEL BOUNDARIES
## DUN-Q05 — T1 LEARNING / GROWTH OVERRIDE
## DUN-Q06 — T2 JUDGMENT ROUTE
## DUN-Q07 — T3 SLOT CONTRACT
## DUN-Q72 — TIER PREPARATION TARGET
## DUN-Q08 — DIRECT VS HYBRID
## DUN-Q09 — NO SINGLE ITEM FAMILY DELETE
## DUN-Q10 — RESIDUAL RISK
## DUN-Q18 — HAZARD ROUTE COVERAGE
## DUN-Q20 — PREPARATION NECESSITY / NAKED RUN
## DUN-Q17 — SUPPLY BURDEN
## DUN-Q76 — SUPPLY DEFICIT BOUNDARY
## DUN-Q73 — FATIGUE OUTCOME TABLE
## DUN-Q74 — FATIGUE PENALTY
## DUN-Q75 — SUPPLY ORDER / OUTCOME BUFFER
## DI-Q-v28-4 — NO HYPOTHETICAL FATIGUE MATRIX
## DI-Q-v28-14 — ORDINARY RESOLVE / REWARD BASELINE
## DUN-Q77 — ORDINARY FAILURE DEATH BASELINE
## DUN-Q78 — INJURED RE-EXPEDITION RISK / PRE-SUPPLY DISCLOSURE
## DUN-Q79 — ORDINARY INJURY NATURAL RECOVERY
## DUN-Q11 — CAUSALITY
## DI-Q-v28-10 — GREAT SUCCESS NUMERIC BASELINE
## DI-Q-v28-11 — DEEP OCCURRENCE / DIFFICULTY BASELINE
## ITEM-Q70 — PLAYER CATEGORY EXACT
## ITEM-Q71 — ACTIVE CATALOG EXACT 40
## ITEM-Q09 — ACTIVE CATALOG BOUNDARY
## ITEM-Q19 — ACTIVE CATALOG STRUCTURE
## ITEM-Q02 — FUNCTIONAL ROLE
## ITEM-Q03 — MATERIAL EFFECT VISIBILITY
## ITEM-Q16 — NEW ITEM JUSTIFICATION
## ITEM-Q77 — FOOD/DRINK BASELINE VALUES
## ITEM-Q81 — REBALANCED PRICE TABLE
## ITEM-Q78 — GOLDEN COUPON PRICE
## ITEM-Q META — GOLDEN 1+1 UNLOCK
## DI-Q-v28-1 — ITEM BASELINE
## DI-Q-v28-2 — WALLET GAIN SCOPE
## DI-Q-v28-3 — MEAL VS WATER IDENTITY
## DI-Q-v28-3B — CURRENT ITEM ART IDENTITY
## DI-Q-v28-9 — REPLACEMENT FLAVOR
## ITEM-Q10 — PREMIUM LUNCH
## ITEM-Q72 — POTION LADDER
## ITEM-Q74 — SPIRIT STAT ROUTE
## ITEM-Q82 — DIRECT STAT ITEM RELEVANCE
## ITEM-Q73 — HAZARD COUNTER VALUES
## ITEM-Q15 — HAZARD ITEM MATRIX
## ITEM-Q07 — HOT PACK VS LAVA NOODLE
## ITEM-Q79 — ANTIDOTE ROLE BOUNDARY
## ITEM-Q83 — EPIC FAMILY HYBRIDS
## ITEM-Q84 — EPIC TOP-END STAT/SUPPLY ITEMS
## ITEM-Q85 — NO D20 HARD UNLOCK FOR NEW EPICS
## ITEM-Q04 — NO GENERAL HIDDEN COMBO
## ITEM-Q05 — EXPLICIT SPECIAL INTERACTION
## ITEM-Q14 — CATEGORY AFFINITY SCOPE
## ITEM-Q18 — FRESH CORE-EFFECT SCOPE
## ITEM-Q80 — FOOD TRAIT × FRESH STACKING
## ITEM-Q17 — SUPPLY / NO THIRST
## ITEM-Q11 — RETURN STONE
## ITEM-Q12 — RETREAT REWARD
## ITEM-Q13 — WORLD TREE INSURANCE
## ITEM-Q75 — FIRST AID AFTERCARE
## ITEM-Q76 — INSURANCE ORDER
## DI-Q-v28-5 — COUNTERFACTUAL DOES NOT ALTER RESOLVE
## DI-Q-v28-6 — UNPROVEN BRANCH
## DI-Q-v28-7 — OVERLAP ATTRIBUTION
## DI-Q-v28-8 — SPECIAL DUPLICATION
## DI-Q-v28-8B — HERO ATTRIBUTION BOUNDARY
## SIM-Q01 — COMBAT VARIANCE
## SIM-Q02 — ROLE USAGE
## SIM-Q70 — THREE PREPARATION AXES
## SIM-Q71 — ITEM / GROWTH HIERARCHY
## SIM-Q72 — REQUIRED METRICS
```

```new
### DUN-Q01 — FAMILY IDENTITIES
### DUN-Q02 — STAT MAPPING
### DUN-Q03 — SPIRIT RELEVANCE
### DUN-Q04 — FAMILY HAZARD BOUNDARIES
### DUN-Q19 — NONCANONICAL KEY ISOLATION
### DUN-Q21 — HAZARD EXPLANATION CONSISTENCY
### DUN-Q16 — FINAL FAMILY DATA OWNERSHIP
### DUN-Q12 — FAMILY INTRODUCTION
### DUN-Q13 — TIER DAY PROGRESSION
### DUN-Q14 — INTRA-BAND CURVE
### DUN-Q15 — MULTI-GATE VARIETY
### DI-Q-v28-12 — GATE COUNT / TIER DISTRIBUTION EXACT
### DUN-Q70 — PREPARED POWER WEIGHTS
### DUN-Q-v27-GATE-SLOPE — LATE-DAY GATE POWER
### DUN-Q71 — HAZARD THREAT CURVE
### DI-Q-v28-13 — FORECAST / HAZARD LABEL BOUNDARIES
### DUN-Q05 — T1 LEARNING / GROWTH OVERRIDE
### DUN-Q06 — T2 JUDGMENT ROUTE
### DUN-Q07 — T3 SLOT CONTRACT
### DUN-Q72 — TIER PREPARATION TARGET
### DUN-Q08 — DIRECT VS HYBRID
### DUN-Q09 — NO SINGLE ITEM FAMILY DELETE
### DUN-Q10 — RESIDUAL RISK
### DUN-Q18 — HAZARD ROUTE COVERAGE
### DUN-Q20 — PREPARATION NECESSITY / NAKED RUN
### DUN-Q73 — FATIGUE OUTCOME TABLE
### DUN-Q74 — FATIGUE PENALTY
### DUN-Q75 — SUPPLY ORDER / OUTCOME BUFFER
### DI-Q-v28-4 — NO HYPOTHETICAL FATIGUE MATRIX
### DI-Q-v28-14 — ORDINARY RESOLVE / REWARD BASELINE
### DUN-Q77 — ORDINARY FAILURE DEATH BASELINE
### DUN-Q78 — INJURED RE-EXPEDITION RISK / PRE-SUPPLY DISCLOSURE
### DUN-Q79 — ORDINARY INJURY NATURAL RECOVERY
### DUN-Q11 — CAUSALITY
### DI-Q-v28-10 — GREAT SUCCESS NUMERIC BASELINE
### DI-Q-v28-11 — DEEP OCCURRENCE / DIFFICULTY BASELINE
### ITEM-Q70 — PLAYER CATEGORY EXACT
### ITEM-Q71 — ACTIVE CATALOG EXACT 40
### ITEM-Q09 — ACTIVE CATALOG BOUNDARY
### ITEM-Q19 — ACTIVE CATALOG STRUCTURE
### ITEM-Q02 — FUNCTIONAL ROLE
### ITEM-Q03 — MATERIAL EFFECT VISIBILITY
### ITEM-Q16 — NEW ITEM JUSTIFICATION
### ITEM-Q77 — FOOD/DRINK BASELINE VALUES
### ITEM-Q81 — REBALANCED PRICE TABLE
### ITEM-Q78 — GOLDEN COUPON PRICE
### ITEM-Q META — GOLDEN 1+1 UNLOCK
### DI-Q-v28-1 — ITEM BASELINE
### DI-Q-v28-2 — WALLET GAIN SCOPE
### DI-Q-v28-3 — MEAL VS WATER IDENTITY
### DI-Q-v28-3B — CURRENT ITEM ART IDENTITY
### DI-Q-v28-9 — REPLACEMENT FLAVOR
### ITEM-Q10 — PREMIUM LUNCH (`premium` / 길드 특제 도시락)
### ITEM-Q72 — POTION LADDER
### ITEM-Q74 — SPIRIT STAT ROUTE
### ITEM-Q82 — DIRECT STAT ITEM RELEVANCE
### ITEM-Q73 — HAZARD COUNTER VALUES
### ITEM-Q15 — HAZARD ITEM MATRIX
### ITEM-Q07 — HOT PACK VS LAVA NOODLE
### ITEM-Q79 — ANTIDOTE ROLE BOUNDARY
### ITEM-Q83 — EPIC FAMILY HYBRIDS
### ITEM-Q84 — EPIC TOP-END STAT/SUPPLY ITEMS
### ITEM-Q85 — NO D20 HARD UNLOCK FOR NEW EPICS
### ITEM-Q04 — NO GENERAL HIDDEN COMBO
### ITEM-Q05 — EXPLICIT SPECIAL INTERACTION
### ITEM-Q14 — CATEGORY AFFINITY SCOPE
### ITEM-Q18 — FRESH CORE-EFFECT SCOPE
### ITEM-Q80 — FOOD TRAIT × FRESH STACKING
### ITEM-Q17 — SUPPLY = FATIGUE RECOVERY / NO THIRST
### ITEM-Q11 — RETURN STONE
### ITEM-Q12 — RETREAT REWARD
### ITEM-Q13 — WORLD TREE INSURANCE
### ITEM-Q75 — FIRST AID AFTERCARE
### ITEM-Q76 — INSURANCE ORDER
### DI-Q-v28-5 — COUNTERFACTUAL DOES NOT ALTER RESOLVE
### DI-Q-v28-6 — UNPROVEN BRANCH
### DI-Q-v28-7 — OVERLAP ATTRIBUTION
### DI-Q-v28-8 — SPECIAL DUPLICATION
### DI-Q-v28-8B — HERO ATTRIBUTION BOUNDARY
### SIM-Q01 — COMBAT VARIANCE
### SIM-Q02 — ROLE USAGE
### SIM-Q70 — THREE PREPARATION AXES
### SIM-Q71 — ITEM / GROWTH HIERARCHY
### SIM-Q72 — REQUIRED METRICS
```

## NEW — topic group headings and owner pointer

```new
## FAMILY / HAZARD IDENTITY
## GATE COUNT / TIER GENERATION
## PREPARED POWER / GATE POWER / HAZARD THREAT / FORECAST
## TIER PREPARATION / COUNTER ROUTES
## SUPPLY / FATIGUE
## ORDINARY RESOLVE / DEATH / INJURY / CAUSALITY
## GREAT SUCCESS / DEEP EXPEDITION
## ITEM CATEGORY / CATALOG
## MEAL / WATER LINE
## POTION / STAT ITEMS
## HAZARD COUNTER ITEMS
## EPIC PREPARATION ITEMS
## ITEM INTERACTION / MODIFIER SCOPE
## INSURANCE
## RESULT PROOF / ATTRIBUTION
## SIMULATION / BALANCE QA
Design owners under test: `DUNGEON_HAZARD_v2.8.0.md`, `ITEM_v2.8.0.md`.
```

## REVIEW NOTES (independent review: 0 MUST-FIX)

- Correction to the ITEM-Q08 entry above: the generic Job-invariance rule IS tested by
  NPC_TRAIT_QA NPC-Q03 "NO HIDDEN JOB EFFECT"; no TEST GAP.
- UNRESOLVED (in ITEM, reported to the User): whether generic Fresh / Food-affinity boosts may touch
  Supply ("Food affinity may boost: Supply" vs "Supply remains its own channel").

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

C: label names the current item.

(The heading was already a declared new line; its declaration above now carries the new label.)

## AMENDMENT — Store Support rebalance follow-up 2026-09-23

Expected stacking values follow ITEM after the Store Support rebalance.

```text
= base ×2.50
대식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= base ×2.75
소식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= base ×2.25
```

```new
= base ×2.05
소식가 + 즉석식품 코너 + 24시간 신선체계
= base ×1.55
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

Checks follow the amended `DUNGEON_HAZARD` owner: DUN-Q17 and DUN-Q76 (Supply Burden / deficit) are deleted, the
DI-Q-v28-14 deficit row is deleted, DUN-Q73 / DUN-Q74 / DUN-Q75 / DUN-Q02 / DUN-Q21 / DUN-Q04 / DUN-Q19 / DUN-Q78 /
DI-Q-v28-1 / DI-Q-v28-3 / DI-Q-v28-4 / ITEM-Q02 / ITEM-Q10 / ITEM-Q17 / ITEM-Q72 / ITEM-Q74 / ITEM-Q77 / ITEM-Q80 /
ITEM-Q82 / ITEM-Q84 / SIM-Q72 keep their ids with the new expectation (Supply = `피로 회복 N` Fatigue recovery, five
Fatigue bands 0~40, 3 / 3 / 3 Hazard pressure), and DUN-Q-v29-1 / DUN-Q-v29-2 are added. The DUN-Q17 / DUN-Q76 heading
declarations and their two reworded lines are retired in place above; the ITEM-Q17 heading declaration now carries its
new title.

```text
| Item | Rarity | Buy/Sell | 강인함 | Supply | Extra |
- no replacement creates direct Fatigue reduction
- meal is materially higher-Supply
- water is materially more Stat-concentrated for its stage
- Water does not become a meal substitute through Supply
Controlled seeded cases must verify:
- Supply deficit = 6% per missing Supply, cap 30%
EXPECT base result Fatigue:
성공 +3
대성공 +3
퇴각 +5
부상 +6
0~9   none
10~19 mobility/spirit -15%
20    mobility/spirit -40%
- Fatigue 20 uses -40%, not stale -25%
Controlled cases must verify exact order:
1. pay required Supply
2. remaining Supply reduces current Fatigue
3. remaining Supply then reduces actual outcome Fatigue 1:1
4. unused remainder is discarded
- `preparedSupply`, `preRecovery`, `remainingSupplyBuffer`, `outcomeBufferUsed`, `actualOutcomeFatigueGain`, `finalFatigue` match the current owner arithmetic
- no excess-Supply Power/success/Loot/Hazard bonus
- exact hidden deficit formula remains hidden from player UI
- public required/prepared/deficit quantities are correct
- Supply 0
- Supply 2
Exact base Item values must match the current active catalog.
- Fatigue distribution and time at 10+/20
- Supply use split: required / preRecovery / outcomeBuffer / waste
- fire -> 강인함
- dark -> 정신 primary + 기동 secondary
- whiteout -> 정신 primary + 기동 secondary
- 보급 부담 is global Gate modifier
Test expeditions with and without active Supply Burden using different Food/Drink Supply totals.
- T1 never receives Supply Burden
- T2 starts from 35% Gate chance / required Supply 3
- T3 starts from 55% Gate chance / required Supply 5
- D30 Final receives no extra random Supply Burden
- Supply Burden and required Supply are visible before Order
- Food/Drink contribute visible Supply
- sufficient Supply avoids Supply Deficit
- insufficient Supply creates one shared expedition-wide penalty
- no thirst/hunger/caffeine subsystem is created
- excess Supply alone gives no extra success bonus
- T3 Supply Burden still has a viable <=2 meaningful required-prep-slot route
Only canonical Hazard/Supply systems affect gameplay.
Stat/Supply/Direct/Hybrid/Condition/Insurance/RiskReward/Economy/Utility
Does not dominate survival+supply+loot+stats simultaneously.
- every active Food/Drink has visible Supply > 0
Supply is the only canonical generic long-expedition preparation resource.
Every Hazard exposes the canonical short pressure explanation:
- poison / corrosion / fire / cold -> 강인함
- bind / mire -> 기동
- dark / whiteout -> 정신 중심 + 기동 보조
```

```new
EXPECT (User 2026-09-24, v2.9.0):
- fire -> 기동
- dark -> 정신
- whiteout -> 정신
- no Supply Burden Gate modifier or required Supply exists; Food/Drink Supply is Fatigue recovery only (User 2026-09-24, v2.9.0)
Only canonical Hazard systems and Supply -> Fatigue recovery affect gameplay (User 2026-09-24, v2.9.0).
- no `강인함 압박` / `기동 압박` / `정신 압박` / `정신 중심 + 기동 보조 압박` label survives anywhere, including the D25 scouting report
(User 2026-09-24, v2.9.0)
Controlled prepared states: vary one Core Stat at a time and read each Hazard's Defense.
- 독 / 냉기 / 부식 Defense moves only with 강인함 (×1/3)
- no Hazard Defense moves with 투력
- no Hazard reads a second Core Stat (no 정신 + 기동 split for 어둠 / 화이트아웃, no 강인함 for 화염)
- Counter keys, Item Counter values, readiness labels 충분 / 대응 / 불안 / 취약 and thresholds are unchanged
- pressure label shown per Hazard matches the Stat that actually moves its Defense
EXPECT base result Fatigue (User 2026-09-24, v2.9.0):
성공 +4
대성공 +4
퇴각 +7
부상 +9
EXPECT five bands on the 0~40 scale (User 2026-09-24, v2.9.0):
0~9   정상 none
10~19 지침 mobility/spirit -15%
20~29 과로 mobility/spirit -40%
30~39 소진 mobility/spirit -40% + combat/survival -20%
40    탈진 all four Core Stats -40% + failure-conditioned Death risk +10%p
- the band is judged on `fatigueBeforeExpedition`
- Fatigue never exceeds 40; no stale 20 cap or -25% value survives
- Fatigue 40 adds the +10%p failure-Death term exactly like an injured departure (cap raised the same way)
Controlled cases must verify exact order (User 2026-09-24, v2.9.0):
1. Supply reduces current Fatigue 1:1 before departure (`preRecovery`)
2. remaining Supply then reduces actual outcome Fatigue 1:1
3. unused remainder is discarded
- `preparedSupply`, `preRecovery`, `fatigueBeforeExpedition`, `remainingSupplyBuffer`, `rawOutcomeFatigueGain`, `outcomeBufferUsed`, `actualOutcomeFatigueGain`, `finalFatigue`, `netFatigueDelta` match the current owner arithmetic
- no `requiredSupply` / `excessSupply` field or Supply payment step exists
- no Supply Power/success/Loot/Hazard bonus
- no morning natural recovery
Controlled NPCs at departure Fatigue 9 / 10 / 19 / 20 / 29 / 30 / 39 / 40, then a Severe-Injury recovery period.
- 9 -> 정상, no penalty; 10 and 19 -> 지침 -15% 기동/정신; 20 and 29 -> 과로 -40% 기동/정신
- 30 and 39 -> 소진 -40% 기동/정신 and -20% 투력/강인함
- 40 -> 탈진 -40% on all four Core Stats and `실패 시 사망 위험` +10%p over the same state at 39
- a 성공 at 36 with no Supply ends at 40, not 41 (clamp)
- Supply 3 at current Fatigue 22 departs at 19 (지침), not 22 (과로): the band is judged after preRecovery
- NIGHT main line names the band from 20 up (`귀환 후 피로 22 · 과로`); 정상 / 지침 are not named
- five bands, 0~40, applied to NPC Base+Equipment-side Stats only
SALE shows the one decision line `피로 {A} → 출발 {B}` only on the counter tray for a chosen Food/Drink; no always-on Fatigue line and no `보급 회복` / `보급 부족` / `남은 보급` tail (User 2026-09-24, v2.9.0).
Controlled seeded cases must verify (User 2026-09-24, v2.9.0: no Supply-deficit row):
- departure at Fatigue 40 (탈진, judged on `fatigueBeforeExpedition`) adds the same +10%p failure-Death term and raises the cap the same way; injured and Fatigue-40 together cap at 50% (User 2026-09-24, v2.9.0)
Stat/Supply (Fatigue recovery, shown `피로 회복 N`)/Direct/Hybrid/Condition/Insurance/RiskReward/Economy/Utility (User 2026-09-24, v2.9.0)
Supply N is displayed as `피로 회복 N` (User 2026-09-24, v2.9.0).
| Item | Rarity | Buy/Sell | 강인함 | Supply (`피로 회복 N`) | Extra |
- Supply is the direct Fatigue reduction (`피로 회복 N`, current Fatigue first, remainder buffers this expedition's gain); no replacement carries any other Fatigue effect (User 2026-09-24, v2.9.0)
PASS direction (User 2026-09-24, v2.9.0):
- meal is materially higher Fatigue recovery (Supply): Food = large recovery + lower Core Stat
- water is materially more Stat-concentrated for its stage: Drink = small recovery + sharper Stat/Counter
- Water does not become a meal substitute through Fatigue recovery
Does not dominate survival+Fatigue recovery+loot+stats simultaneously (User 2026-09-24, v2.9.0).
- Supply 0 (no `피로 회복` row; User 2026-09-24, v2.9.0)
- Supply 2, displayed `피로 회복 2` (User 2026-09-24, v2.9.0)
Exact base Item values must match the current active catalog; Supply is displayed `피로 회복 N` (User 2026-09-24, v2.9.0).
Supply2 is displayed `피로 회복 2` (User 2026-09-24, v2.9.0).
- the Supply value (`피로 회복 N`) is unchanged by Fresh / Relic native-Stat percentages (User 2026-09-24, v2.9.0)
- every active Food/Drink has visible Supply > 0, shown as `피로 회복 N` (never `보급 +N`)
- Supply reduces the customer's Fatigue only: current Fatigue first, remainder against this expedition's gain, leftover discarded
- no Gate requires Supply; no Supply Deficit, deficit penalty or excess-Supply concept exists
`음식·음료는 피로를 줄인다.` is the whole Supply rule; no long-expedition requirement resource exists.
- departure Fatigue distribution and time at 10+/20+/30+/40 (User 2026-09-24, v2.9.0)
- Supply use split: preRecovery / outcomeBuffer / waste
```

## AMENDMENT — v2.9.0 구급키트 / utility lines (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): ITEM-Q81 price table row for 구급키트 follows ITEM (80 / 170).

```text
구급키트             100 / 210
```


## AMENDMENT — v2.9.0 revision 2: pressure labels and the destination-plate ? retired (User decision 2026-09-24)

Every player-facing Hazard row (SALE destination plate, D25 scouting report, FINAL 확인된 위협 included) reads the numbered short row
`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; the labels `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and the plate `?` help are
retired. The revision-1 declarations this replaces were edited out of the fences above in place.

```new
Every Hazard exposes the numbered short row, the same on every surface:
- Gate detail alone uses the full sentence `<Hazard> — 대응 <N> 필요 · <Stat> <n>당 대응 1 제공 · <Hazard> 대응 상품이 막는다`
- no `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` label row and no destination-plate `?` help survive (User 2026-09-24 revision 2, v2.9.0)
```

## AMENDMENT — v2.9.0 revision 3: 어둠 -> 기동, no Gate shares a Stat (User decision 2026-09-24)

어둠 presses 기동 ×0.40 so that 망자역 지하묘지 (공포 + 어둠) is answered by 정신 + 기동, never one Stat; the split is 강인함 3 /
기동 4 / 정신 2. The revision-1/2 declarations this replaces were edited out of the fences above in place.

```new
- MORNING plate, SALE destination plate, D25 scouting report and FINAL rows read `<Hazard> · 대응 <N> 필요 · <Stat> <n>당 대응 1 제공` with N = ceil(Hazard Threat) of that Gate (the Final: Day 30 / T2 -> 29) and n = 3 (강인함: poison / corrosion / cold) / 2 (기동: bind / mire / dark · 정신: fear / whiteout / fire)
### DUN-Q-v29-2 — ONE NON-투력 STAT PER HAZARD (3 / 3 / 3, NO GATE SHARES A STAT)
- 속박 / 진창 / 어둠 Defense moves only with 기동 (×1/2)
- 공포 / 화이트아웃 / 화염 Defense moves only with 정신 (×1/2)
- every Family Tier Hazard set presses two different Stats (독거미 강인함 + 기동, 슬라임 강인함 + 기동, 설원 강인함 + 정신, 지하묘지 정신 + 기동), so no Gate is answered by one Stat (User 2026-09-24 revision 3)
- 강인함 3 · 기동 3 · 정신 3 Hazards, 투력 never pressed, no Gate's Hazard set sharing a Stat (User 2026-09-24 revision 5: 화염 -> 정신)
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
- next-Day forecast reads the same function as generation
```

```new
- no player-facing next-Day forecast exists (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 F3: kit Outcome step / no rest recovery / 중상 +9 / repeated-strain cut (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.0 F3): 구급키트 lowers the resolved Outcome one step (중상 → 부상 with the 부상 XP/Loot/Fatigue/injury 1; 부상 → 부상 with no lasting injury; 사망 excluded); no natural Fatigue recovery of any kind for any adventurer (the Severe-Injury rest-day -5 is retired); 중상 takes the 부상 Fatigue gain (+9) and only 사망 stays 0; repeated injured / weary (Fatigue 20+) departures escalate the failure Death chance (+8%p per repeat of each kind from the second, cap +30%p, from the adventurer's own records) with the NPC-detail row `무리한 출발 {n}회`; the route-change line names 거짓말쟁이 / 순례 with particles by final consonant. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
중상 0
- Severe/Death raw outcome Fatigue remains 0
부상 + 구급키트:
- Outcome remains 부상
- Outcome remains 중상
- XP/Loot/Fatigue follow 중상
```

```new
4. no morning changes Fatigue, a Severe-Injury rest day included (User 2026-09-25, v2.9.0)
- Death raw outcome Fatigue remains 0; 중상 takes the 부상 gain (User 2026-09-25, v2.9.0)
### DUN-Q-v29-1 — FATIGUE BANDS / NO REST RECOVERY
- no morning changes Fatigue, a Severe-Injury rest day included (User 2026-09-25, v2.9.0)
- no rest recovery exists; Fatigue falls only through Food/Drink (User 2026-09-25, v2.9.0)
### DUN-Q-v29-3 — REPEATED-STRAIN DEATH ESCALATION
(User 2026-09-25, v2.9.0)
- NPC detail shows `무리한 출발 {n}회` (injured + weary departures so far) as an information row, no verdict
부상 + 구급키트 (User 2026-09-25, v2.9.0):
- Outcome stays 부상
- Outcome becomes 부상 (NIGHT verdict 부상, event `구급키트가 중상을 부상으로 낮췄다.`)
```

## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```text
- Wallet outcome multipliers are Retreat 0.08 / combat-success 1.00 / other living 0.18
```

## AMENDMENT — v2.9.0 balance close (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.0 balance close): QA expectations follow the amended owners — Gate Day term 1.20 / 0.80, 중상 Fatigue 0, consecutive-only strain cut, Severe shares 36% / 11%, Wallet success 1.00, new BC1 (만반의 준비 / Level) · BC2 (retreat healing) · BC3 (bad-luck assist), Item values and prices with Sell = Buy × 2; the Epic-hybrid-vs-Common-Main conflict (속박 / 어둠 18 > 16) is marked UNRESOLVED. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
| 생수 | C | 40/85 | +10 | 2 | — |
| 간단 도시락 | U | 85/180 | +10 | 6 | expedition Wallet +20% |
| 길드 특제 도시락 | R | 160/340 | +14 | 7 | expedition Wallet +40% |
| 영웅 결전 도시락 | E | 210/440 | +18 | 9 | — |
| 왕도 천연암반수 | E | 185/390 | +20 | 2 | — |
- failed-combat Severe branch uses 42% base before current modifiers
- environment/other Severe branch uses 13% base before current modifiers
- 중급: 110/230, 투력 +12
- 상급: 150/300, 투력 +16
- 최상급: 190/400, 투력 +24
- antidote poison +18
- mask poison +12
- coating corrosion +18
- boots mire +16
- ion fire +18
- wine fear +18
- heat cold +18
- goggles whiteout +16
- 40/85
- Choco mobility +8 / Supply4
- Energy mobility +15 / Supply2
- Lava survival +8 / cold6 / Supply4
- Ramen cold10 / Supply5
- Candy fear10 / Supply3
- 80 / 170
- poison Counter +18
PASS exact Buy/Sell for changed original-catalog prices:
캔커피                40 / 85
진정 허브티           40 / 85
얼음컵                30 / 65
랜턴 건전지           45 / 95
핫팩                  60 / 130
농축 해독제           80 / 170
쿨링 이온음료         80 / 170
- no stale 180/360 antidote or 200/400 ion price survives
거미줄 방호세트   150/320  독+12 / 속박+12
연금 방수슈트     150/320  부식+12 / 진창+12
성화 랜턴         150/320  공포+12 / 어둠+12
백설 방한고글     150/320  냉기+12 / 화이트아웃+12
마그마 냉각장비   160/340  화염+14 / 투력+6
초고속 에너지드링크    Drink E   160/340  기동+18 / Supply2
대현자 허브엘릭서      Drink E   160/340  정신+20 / Supply2
최상급 포션            Potion E  190/400  투력+24
- the Day term is `min(Day, 9) × 1.70 + max(0, Day - 9) × 0.40`
- D1 through D9 Gate Power is identical to the pre-change value for the same Family, Tier and Day
- D12 T1 ordinary Family reads 16.50 on the Day term, D24 reads 21.30
```

```new
- the Day term is `min(Day, 9) × 1.20 + max(0, Day - 9) × 0.80` (User 2026-09-25, v2.9.0 balance close)
- the Day term reads D9 10.80, D12 13.20, D18 18.00, D24 22.80, D29 26.80
Controlled adventurer records: 1 / 2 / 3 / 5 consecutive expeditions begun at injury=1 ending in this injured departure, the same
chain broken once by a healthy departure, and a Fatigue 20+ departure chain (User 2026-09-25, v2.9.0 balance close).
- the first injured departure adds nothing beyond the existing injured term
- every further CONSECUTIVE injured departure adds +8%p to the conditional failure Death chance and to its cap, capped at +30%p
- one healthy departure resets the chain; Fatigue 20+ departures add nothing to this term
- the count comes from the adventurer's own records (this departure included); no new NPC field
- strainEscalation equals min(0.30, 0.08·max(0,c−1)) exactly, c = consecutive injured departures (0 when healthy)
- failed-combat Severe branch uses 36% base before current modifiers (User 2026-09-25, v2.9.0 balance close)
- environment/other Severe branch uses 11% base before current modifiers
- Wallet outcome multipliers are 대성공 / 성공 1.00 / 퇴각 0.35 / 부상 0.20 / 중상 0.10 / 사망 0 (User 2026-09-25, v2.9.0 balance close)
### DUN-Q-v29-BC1 — 만반의 준비 / LEVEL DEATH REDUCTION
(User 2026-09-25, v2.9.0 balance close; owner `DUNGEON_HAZARD_v2.8.0.md` §Preparation / Level Death reduction.)
Controlled failed expeditions at Lv1 / Lv2 / Lv10 / Lv20, each with and without 만반의 준비 (healthy, Fatigue < 20, 2+ Items),
and the three near misses (injured / Fatigue 20 / one Item).
- rolledDeathChance = failureDeathChance × preparedFactor × levelFactor exactly; preparedFactor 0.80 only when all three hold
- levelFactor = max(0.75, 1 − 0.015 × (Level − 1)): Lv1 1.00 · Lv2 0.985 · Lv10 0.865 · Lv20 0.75
- a roll in the removed band ends 중상 (flat 0.36) or 부상, never 사망; still exactly one Death roll
- the SALE `실패 시 사망 위험` includes levelFactor and never preparedFactor
- the Night report shows the 만반의 준비 save line once, only when the band was hit
### DUN-Q-v29-BC2 — RETREAT HEALING
(User 2026-09-25, v2.9.0 balance close; owner §RETREAT HEALING.)
- only an injured departure ending 퇴각 can heal; chance 25% / 50% / 75% / 100% for 0 / 1 / 2 / 3+ preceding consecutive injured 퇴각
- a 부상 / 중상 result resets the chain; 구급키트 does not change the chance
- one extra draw only on this path; the Night line appears only on a heal and never shows the chance
### DUN-Q-v29-BC3 — HIDDEN BAD-LUCK ASSIST
(User 2026-09-25, v2.9.0 balance close; owner §BAD-LUCK PREPARATION ASSIST.)
Controlled Night queues: 3 / 4 / 5 carried failures in a row, a bare-handed expedition inside the chain, a success inside the
chain, a Deep expedition inside the chain.
- no assist before the chain reaches 3; then assist 0.10 and +0.05 per further failure
- the assist multiplies prepared ability for the combat check by (1 + assist) and environmentIncidentChance by (1 − assist)
- bare-handed expeditions neither count nor reset; a success resets; Deep and Final are neither counted nor assisted
- no screen, forecast or report shows it
- Choco mobility +8 / Supply3
- Energy mobility +17 / Supply2
- Lava survival +8 / cold6 / Supply3
- Ramen cold10 / Supply3
- Candy fear10 / Supply2
(v2.9.0 balance close values, User 2026-09-25)
PASS (User 2026-09-25, v2.9.0 balance close):
- every Item's Sell = Buy × 2 exactly
- Buy matches the `ITEM_v2.8.0.md` active catalog; the raised ones:
간단 도시락 100 · 불룡볶음면 80 · 에너지드링크 80 · 용사의 곡주 70 · 방진마스크 80 · 핫팩 70 · 부식 방지 코팅제 85
원정용 장화 75 · 설원 고글 70 · 중급 포션 125 · 상급 포션 175 · 농축 해독제 95 · 길드 특제 도시락 185 · 쿨링 이온음료 95
거미줄 방호세트 / 연금 방수슈트 / 성화 랜턴 / 백설 방한고글 165 · 마그마 냉각장비 175 · 초고속 에너지드링크 175
대현자 허브엘릭서 175 · 최상급 포션 210
- no stale pre-close price or a Sell other than Buy × 2 survives
| 생수 | C | 40/80 | +10 | 2 | — |
| 간단 도시락 | U | 100/200 | +12 | 6 | expedition Wallet +20% |
| 길드 특제 도시락 | R | 185/370 | +16 | 7 | expedition Wallet +40% |
| 영웅 결전 도시락 | E | 210/420 | +18 | 9 | — |
| 왕도 천연암반수 | E | 185/370 | +20 | 2 | — |
- 중급: 125/250, 투력 +14
- 상급: 175/350, 투력 +20
- 최상급: 210/420, 투력 +28
- 40/80
- antidote poison +30
- mask poison +24
- coating corrosion +24
- boots mire +20
- ion fire +26
- wine fear +20
- heat cold +24
- goggles whiteout +20
(v2.9.0 balance close values, User 2026-09-25: within a Rarity, Counter + pressed-Stat contribution is equal)
- 95 / 190
- poison Counter +30
거미줄 방호세트   165/330  독+22 / 속박+18
연금 방수슈트     165/330  부식+22 / 진창+18
성화 랜턴         165/330  공포+18 / 어둠+18
백설 방한고글     165/330  냉기+22 / 화이트아웃+18
마그마 냉각장비   175/350  화염+18 / 투력+6
UNRESOLVED (reported 2026-09-25): 속박 +18 and 어둠 +18 exceed their Common Main specialists (경량 로프 / 랜턴 건전지 +16)
under the balance-close values; the User decides which rule holds
초고속 에너지드링크    Drink E   175/350  기동+22 / Supply2
대현자 허브엘릭서      Drink E   175/350  정신+24 / Supply2
최상급 포션            Potion E  210/420  투력+28
```
