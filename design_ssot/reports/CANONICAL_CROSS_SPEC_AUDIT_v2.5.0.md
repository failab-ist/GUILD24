# CANONICAL CROSS-SPEC AUDIT — v2.5.0 CORRECTED FULL

Scope: all 23 Canonical files in this package.

This is a correction of an omitted already-approved Meta progression decision inside the v2.5.0 set.
It does not add a Store Type system and does not restore legacy direct Franchise Grade bonuses.

## Corrected progression truth

```text
Job × Boss Clear Matrix
-> Job Mastery per Job
-> Total Job Mastery
-> Franchise Grade
-> Start Contract availability
```

Separate axis:

```text
Distinct Boss Clear 1 / 3 / 6
-> 황금 1+1 쿠폰 / 도적 / 광전사
```

Franchise Grade itself has no direct combat / NPC / economy / Relic / Item modifier.
An unlocked Start Contract effect applies only when that contract is explicitly selected for the Run.

Exact Franchise Grade thresholds and per-contract unlock mapping remain:
`PASS3_START_CONTRACT_UNLOCK_TUNING`

No threshold or mapping value was invented in this correction.

## Result

- PASS: 101
- WARN: 0
- FAIL: 0

## Canonical files intentionally changed

- `SPEC_INDEX_v2.5.0.md`
- `CORE_RUN_v2.5.0.md`
- `META_v2.5.0.md`
- `DECISIONS_v2.5.0.md`
- `UI_UX_v2.5.0.md`
- `UI_UX_QA_v2.5.0.md`
- `COPY_WORLD_VOICE_v2.5.0.md`

The other 16 Canonical files are byte-identical to the prior full v2.5.0 package.

## Targeted conflict review

- Franchise Grade source remains Total Job Mastery.
- Franchise Grade gates Start Contract availability.
- Franchise Grade itself grants no direct generic gameplay bonus.
- Distinct Boss Clear 1/3/6 remains a separate progression axis.
- `황금 1+1 쿠폰 / 도적 / 광전사` unlocks are unchanged.
- Legacy direct Grade benefits remain removed: starting Gold, generic offer/item count, inventory/warehouse capacity, reroll discount, automatic dungeon information.
- Legacy Start Contract keys `day10 / regular3 / run1 / level15` are explicitly rejected as v2.5 Meta truth.
- `Store Type` was not added.
- UI and Copy now expose the Start Contract gate without implying automatic Grade power.
- Exact contract-by-Grade mapping remains PASS3 tuning and therefore was not guessed.

## Automated checks

- PASS — physical canonical file count = 23 — 23
- PASS — physical canonical filenames match expected set
- PASS — SPEC_INDEX lists exactly 23 canonical files — 23
- PASS — SPEC_INDEX list matches physical files
- PASS — SPEC_INDEX declared Canonical file count=23
- PASS — implementation-blocking design unresolved remains NONE
- PASS — 00_GAME_CORE_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — 00_GAME_CORE_v2.5.0.md: CANONICAL_SET correct
- PASS — BOSS_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — BOSS_v2.5.0.md: CANONICAL_SET correct
- PASS — COPY_WORLD_VOICE_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — COPY_WORLD_VOICE_v2.5.0.md: CANONICAL_SET correct
- PASS — CORE_RUN_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — CORE_RUN_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — CORE_RUN_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — CORE_RUN_v2.5.0.md: CANONICAL_SET correct
- PASS — DECISIONS_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — DECISIONS_v2.5.0.md: CANONICAL_SET correct
- PASS — DUNGEON_HAZARD_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — DUNGEON_HAZARD_v2.5.0.md: CANONICAL_SET correct
- PASS — DUNGEON_ITEM_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — DUNGEON_ITEM_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — ECONOMY_ORDER_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — ECONOMY_ORDER_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — ECONOMY_ORDER_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — ECONOMY_ORDER_v2.5.0.md: CANONICAL_SET correct
- PASS — EVENT_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — EVENT_v2.5.0.md: CANONICAL_SET correct
- PASS — FINAL_EXPEDITION_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — FINAL_EXPEDITION_v2.5.0.md: CANONICAL_SET correct
- PASS — ITEM_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — ITEM_v2.5.0.md: CANONICAL_SET correct
- PASS — META_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — META_v2.5.0.md: CANONICAL_SET correct
- PASS — NIGHT_CLOSING_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — NIGHT_CLOSING_v2.5.0.md: CANONICAL_SET correct
- PASS — NPC_TRAIT_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — NPC_TRAIT_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — NPC_TRAIT_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — NPC_TRAIT_v2.5.0.md: CANONICAL_SET correct
- PASS — RELIC_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — RELIC_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — RELIC_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — RELIC_v2.5.0.md: CANONICAL_SET correct
- PASS — SALE_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — SALE_v2.5.0.md: CANONICAL_SET correct
- PASS — SPEC_INDEX_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — SPEC_INDEX_v2.5.0.md: CANONICAL_SET correct
- PASS — UI_UX_QA_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — UI_UX_QA_v2.5.0.md: CANONICAL_SET correct
- PASS — UI_UX_v2.5.0.md: DOC_VERSION=2.5.0
- PASS — UI_UX_v2.5.0.md: CANONICAL_SET correct
- PASS — no v2.4.0 canonical cross-reference remains
- PASS — META: Franchise Grade source = Total Job Mastery
- PASS — META: Grade direct gameplay effect = NONE
- PASS — META: Grade content gate = START_CONTRACT
- PASS — META: exact Start Contract mapping remains PASS3 tuning
- PASS — META: progression chain includes Grade -> Start Contract availability
- PASS — META: default Start Contract remains fresh-account available
- PASS — META: unlocked contract does not auto-apply its effect
- PASS — META: legacy direct Grade benefits explicitly removed
- PASS — META: legacy contract gate keys explicitly rejected
- PASS — META: Distinct Boss 1/3/6 unlocks preserved
- PASS — META: 1/3/6 separated from Franchise Grade contract axis
- PASS — META: Store Type was not added
- PASS — old contradictory sidegrade-expansion phrase removed
- PASS — old contradictory legacyGradeGameplayGate=NO removed
- PASS — DECISIONS: Franchise Grade Start Contract gate = YES
- PASS — DECISIONS: Franchise Grade direct gameplay bonus = NO
- PASS — DECISIONS: legacy contract gates removed as Meta truth
- PASS — SPEC_INDEX routes Start Contract unlock/Grade gate to META
- PASS — SPEC_INDEX freezes Grade source/no-direct-modifier/Start Contract gate structure
- PASS — CORE_RUN delegates Start Contract availability to META
- PASS — CORE_RUN separates selected contract effect from Grade itself
- PASS — UI_UX exposes Grade-gated Start Contract availability
- PASS — UI_UX rejects legacy contract gates
- PASS — UI_UX_QA tests Grade -> Start Contract availability
- PASS — COPY matches corrected Grade/contract boundary
- PASS — 00_GAME_CORE_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — BOSS_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — COPY_WORLD_VOICE_v2.5.0.md: intended correction changed file
- PASS — CORE_RUN_QA_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — CORE_RUN_v2.5.0.md: intended correction changed file
- PASS — DECISIONS_v2.5.0.md: intended correction changed file
- PASS — DUNGEON_HAZARD_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — DUNGEON_ITEM_QA_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — ECONOMY_ORDER_QA_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — ECONOMY_ORDER_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — EVENT_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — FINAL_EXPEDITION_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — ITEM_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — META_v2.5.0.md: intended correction changed file
- PASS — NIGHT_CLOSING_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — NPC_TRAIT_QA_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — NPC_TRAIT_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — RELIC_QA_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — RELIC_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — SALE_v2.5.0.md: unrelated Canonical remains byte-identical
- PASS — SPEC_INDEX_v2.5.0.md: intended correction changed file
- PASS — UI_UX_QA_v2.5.0.md: intended correction changed file
- PASS — UI_UX_v2.5.0.md: intended correction changed file
