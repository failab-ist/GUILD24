# NPC_TRAIT_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/NPC_TRAIT_QA_v2.8.0.md
CHAIN=design_ssot/NPC_TRAIT_QA_v2.8.0.md,design_ssot/history/NPC_TRAIT_QA_v2.7.0.md,design_ssot/history/NPC_TRAIT_QA_v2.6.1.md,design_ssot/history/NPC_TRAIT_QA_v2.5.0.md

Current-spec consolidation of a QA owner. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/NPC_TRAIT_QA_v2.8.0-patch.md`; the v2.7 / v2.6.1 / v2.5 QA versions stay in
`history/`. Checks are judged against the current design owner `design_ssot/NPC_TRAIT_v2.8.0.md`
(including the 2026-09-23 User decision that 악바리 result fatigue +1 is always on).

Placement: one `##` heading per check, QA IDs unchanged, grouped by topic in this order:
Job identity / unlock / Mastery (NPC-Q01-Q04, v28-7, NPC-Q09 META, NPC-Q10, v28-9, ID note) ->
Level / growth truth (Q70, Q71, v28-1) -> Trait catalog / presentation (TRAIT-Q01, Q02, NPC-Q61,
TRAIT-Q15, TRAIT-Q03, NPC-Q62, TRAIT-Q04-Q07, Q13, Q14) -> Trait effects (TRAIT-Q16, Q17, NPC-Q76,
Q73, Q72, Q64, Q65) -> retired random NPC special system + TRAIT-Q12 -> Destination (DEST-Q01,
NPC-Q63, TRAIT-Q08) -> Injury (Q66, Q67, Q77, Q78, Q79) -> Recent snapshot (Q74, Q75, v28-5) ->
Loyalty (v28-2, v28-2B, v28-8, v28-3) -> Dialogue (v28-4, v28-4B) -> Roster / growth target
(NPC-Q05-Q08, NPC-Q09 LONG-TERM VALUE, v28-10) -> Deep reward (v28-6 with the 2026-09-12 amendment
bullets merged in).

## LEGACY — inheritance / override scaffolding (the chain is now inline)

The v2.7 "Explicitly stale" list and v2.8 exclusions are applied below (SUPERSEDED). The v2.8
exclusion bullets and the general forced-negative protection are binding and kept verbatim under
RETIRED RANDOM NPC SPECIAL SYSTEM. The NPC-Q09 duplicate-ID note is kept (reworded below).

```text
## INHERITANCE
All non-conflicting v2.7 NPC/Trait QA remains active.
## INHERITED QA OVERRIDES
The v2.6.1 QA patch and current v2.7 rules supersede conflicting expectations in the older `NPC_TRAIT_QA_v2.5.0.md` base.
Explicitly stale:
- inherited `TRAIT-Q15` exact active Trait count 30
- current active Trait count remains 37 under `NPC_TRAIT_v2.6.1.md`
- inherited Food-affinity/native-recovery assumptions
- v2.7 uses the exact Food Core-Stat/Supply scope in `NPC_TRAIT_v2.7.0.md`
- inherited Potionbody +30% expectation from the old Trait catalog
- v2.7 exact Potion positive native Core-Stat factor is ×1.15
- any inherited expectation that a Level milestone grants a Trait, Rank/Title reward, or third ordinary Bag slot
- any inherited ordinary-Injury recovery path that clears `injury=1` merely because the next expedition does not resolve to a fresh Injury result
All other inherited QA remains only where it does not conflict with a current owner or current patch.
## APPROVED_AMENDMENT_2026_09_12 — DEEP NPC REWARD QA
```

## LEGACY — restatements of lines kept elsewhere in the target

`Status values are not stored here.` (v2.6.1 / v2.7 form) is kept. The amendment's ordinary-reward
bullet restates the kept NPC-Q-v28-6 `- ordinary resolved reward/consequence still applies`.

```text
Status values are NOT stored here.
- ordinary expedition result rewards/consequences remain
```

## SUPERSEDED — TRAIT-Q15 exact count 30 -> 37 (v2.7 stale list; NPC-Q61; NPC_TRAIT ACTIVE TRAIT CATALOG activeTraitCount=37)

The remaining TRAIT-Q15 checks (names/effects match catalog, retired Traits absent, no leak) are
current and kept; its PASS line is reworded below.

```text
- exactly 30 active canonical Traits
```

## SUPERSEDED — TRAIT-Q03 lucky/unlucky pair (NPC-Q61 / NPC-Q62: no lucky/unlucky entry or pair; NPC_TRAIT MUTUAL EXCLUSION — EXACT 16)

Dead clause trimmed; the other eight TRAIT-Q03 pairs are in the current 16 and kept.

```text
- 행운아 + 불운아
```

## SUPERSEDED — random permanent Trait edit / destination reassignment opportunities (v2.8 exclusions; NPC_TRAIT TRAIT MODIFICATION)

Current owner: "No hidden/random route / Trait-removal / Trait-mentor system exists in the current
Run." TRAIT-Q09 assumed a (rare) Trait-edit route exists; TRAIT-Q10 / Q11 / DEST-Q02 test the retired
events. Generic `SETUP:` / `EXPECT:` / `PASS:` labels are kept by other checks.

```text
## TRAIT-Q09 — TRAIT MODIFICATION RARITY
Play/simulate full runs.
Permanent Trait editing is rare.
It does not function like routine equipment swapping.
## TRAIT-Q10 — RED REMOVAL EVENT
Trigger approved Rare Trait event.
Player chooses one NPC and one internal NEGATIVE Trait to remove.
No automatic random removal from unintended NPC.
## TRAIT-Q11 — POSITIVE ADD EVENT
Trigger approved Epic Trait event.
Player chooses 1 of 3 positive trait options for one NPC.
Choice is explicit.
## DEST-Q02 — LIMITED REASSIGN EVENT
Trigger destination-change event.
- one not-yet-finalized NPC
- one change
- player chooses another open Gate
- finalized NPC ineligible
No automatic optimization.
```

## SUPERSEDED — NPC-Q10 Mastery-modifies-Base/Growth clauses (NPC-Q-v28-7 / v28-9; NPC_TRAIT JOB MASTERY; META spawn-Level Mastery model)

Current: "Job Mastery does not mutate Job Base/Growth"; the exact table is the six Job rows in
NPC_TRAIT, not a PASS3 table. The live NPC-Q10 clause (no hidden account-wide multiplier) and PASS
line are kept.

```text
- effect modifies only visible Job Base/Growth channel defined here
- exact values match the approved PASS3 Job table when available
```

## SUPERSEDED — Deep "greater than Success" (qualified by exact 2× values in NPC-Q-v28-6)

```text
- greater bonus EXP than Success
- greater Wallet reward than Success
```

## REWORD — version framing removed

```text
The older base contains two sections both labeled `NPC-Q09`.
For v2.7 audit references, distinguish them by section title (`LONG-TERM VALUE` vs `META JOB UNLOCK POOL`) rather than treating the duplicated numeric label as one test identity.
Trait pool identity is frozen for the v2.5 retained implementation baseline.
SETUP: use all v2.7 Potion tiers with `potionbody`.
- no inherited native-recovery multiplier remains active
- v2.7 persistence/risk changes do not silently raise these visible Stat penalties
Active v2.8 pools must not contain:
Current inheritance exclusions:
```

```new
This file contains two sections both labeled `NPC-Q09`.
For audit references, distinguish them by section title (`LONG-TERM VALUE` vs `META JOB UNLOCK POOL`) rather than treating the duplicated numeric label as one test identity.
Trait pool identity is frozen.
SETUP: use all Potion tiers with `potionbody`.
- no native-recovery multiplier is active
- persistence/risk changes do not silently raise these visible Stat penalties
Active pools must not contain:
Current exclusions:
```

## REWORD — pointers to current owner files

```text
Capacity owner -> SALE.
- when Fresh Relics also modify the positive native Core Stat, Food-affinity percentage follows `ITEM_v2.7.0.md` base-additive composition rather than a sequential Trait×Relic multiplier
- `injury=1` departure activates the +10%p failure-conditioned Death-risk baseline and +15%p Severe-transition baseline owned by `DUNGEON_HAZARD_v2.7.0.md`
PASS uses the exact replacements in COPY_WORLD_VOICE_v2.8.
```

```new
Capacity owner -> SALE_v2.8.0.md.
- when Fresh Relics also modify the positive native Core Stat, Food-affinity percentage follows `ITEM_v2.8.0.md` base-additive composition rather than a sequential Trait×Relic multiplier
- `injury=1` departure activates the +10%p failure-conditioned Death-risk baseline and +15%p Severe-transition baseline owned by `DUNGEON_HAZARD_v2.8.0.md`
PASS uses the exact replacements in COPY_WORLD_VOICE_v2.8.0.md.
```

## NEW — headings / owner pointer

```new
Design owner under test -> NPC_TRAIT_v2.8.0.md
## QA ID NOTE
## RETIRED RANDOM NPC SPECIAL SYSTEM
```

## NOTES FOR REVIEW

- 악바리 (User decision 2026-09-23, fatigue +1 always on): no chain check contradicts it. TRAIT-Q17
  `- 악바리 reads current injury state and adds its stated Fatigue cost` is kept verbatim: the
  "stated" cost is now the always-on +1, and the injury read still drives its combat/survival
  effects. TEST GAP: no check explicitly asserts grit's +1 result fatigue for a healthy NPC
  (NPC-Q72 covers outcome scope only, "where applicable").
- TRAIT-Q08 keeps its 허세 clause: UI_UX_v2.8.0.md still says "Do not center the tutorial around 허세."
- NPC-Q08 FAIL SIGNALS keep "Rookie/Royal newcomer events": rookieBoard (RELIC) and 왕립 기사단 방문
  (EVENT) are current.
