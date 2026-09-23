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
- unchanged original-catalog prices remain exactly as listed in `ITEM_v2.8.0.md`
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

```new
Long-expedition preparation is one global Supply decision rather than an extra Hazard/micro-system, and the approved eligibility/values are implemented.
- T1/T2/T3 Supply-Burden eligibility/requirements remain intact
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
### DUN-Q17 — SUPPLY BURDEN
### DUN-Q76 — SUPPLY DEFICIT BOUNDARY
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
### ITEM-Q17 — SUPPLY / NO THIRST
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
