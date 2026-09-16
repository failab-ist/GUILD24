# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=V2_7_IMPLEMENTATION_BASELINE
FREEZE_DATE=2026-09-15
LAST_APPROVED_AMENDMENT=2026-09-17
SSOT_AUDIT_STATUS=FINAL_CONFLICT_SWEEP_COMPLETE
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
NON_BLOCKING_PLAYER_COPY_UNRESOLVED=NONE
BALANCE_STATUS=DIRECTOR_BASELINES_PENDING_FULL_RUN_VALIDATION
SOURCE_ADOPTION_STATUS=NOT_YET_ADOPTED
V2_7_SOURCE_EDIT_GATE=BLOCKED_UNTIL_V2_6_1_ADOPTION_RECOVERY_CLOSE

## AUTHORITY

Authority order:

```text
1. User's newest approved decision
2. current GUILD24 Design SSOT
3. current Source
4. older chat / proposal / report / historical spec
```

DESIGN TRUTH = Design SSOT
IMPLEMENTATION TRUTH = Source

If current Source still matches v2.6/v2.6.1 rather than this v2.7 SSOT, classify the difference as missing adoption / implementation difference. Do not reinterpret this SSOT to match Source.

## v2.7 VERSION POLICY

v2.7.0 is a new Core Play / Design revision.

Rules:
- only owner Specs/QA whose authoritative content changed receive `_v2.7.0`
- unchanged owners keep their latest earlier version
- v2.7 patch-style owner files may declare `BASE_DOCUMENT`; unchanged sections inherit that exact base chain
- detailed numeric/UX/QA truth belongs only in its owner file
- do not copy this Index into runtime/source as a second design authority

`DIRECTOR DOCUMENT BASELINE` means an approved implementation starting value that is intentionally pending simulation/full-run validation. It is not permission for WORK or frozen QA to auto-tune Production values.

## PATCH / INHERITANCE RESOLUTION RULE

For every routed patch-style v2.7 owner/QA document:

```text
current routed owner patch
> its declared BASE_DOCUMENT
> older base chain
```

Therefore:
- an explicit current patch override supersedes conflicting base prose/QA even if the base remains physically present
- inherited content is live only when it does not conflict with the current patch or another current routed owner
- versioned cross-spec filenames written inside an older inherited base are historical references, not routing authority
- cross-owner lookup always resolves through this current SPEC_INDEX
- current QA overrides conflicting inherited QA; old test IDs/examples do not create a second Design Truth

Do not edit historical base files merely to erase superseded text when an explicit current override is sufficient.

## IMPLEMENTATION ENTRY GATE

Design SSOT is promoted to v2.7 now.

**Current phase is SSOT-only for v2.7. Do not edit v2.7 Source yet.**

Source implementation follows this dependency gate exactly:

```text
finish and close the existing v2.6.1 Adoption Recovery acceptance
-> User/Director confirms recovery close
-> begin v2.7 source adoption
```

Until that close:
- v2.7 owner Specs/QA may be audited/amended
- Current Source remains the v2.6.1 recovery implementation target
- do not mix v2.7 runtime changes into unfinished v2.6.1 recovery work
- do not use uncommitted/partial v2.6.1 work as a v2.7 adoption base

The prerequisite recovery execution document remains:
`GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`

That document is an execution prerequisite, not v2.7 Design Truth.

## CURRENT DESIGN SSOT FILE SET

Current file set = 22 files:

- `SPEC_INDEX_v2.7.0.md`
- `00_GAME_CORE_v2.5.0.md`
- `CORE_RUN_v2.7.0.md`
- `META_v2.7.0.md`
- `ECONOMY_ORDER_v2.7.0.md`
- `NPC_TRAIT_v2.7.0.md`
- `DUNGEON_HAZARD_v2.7.0.md`
- `ITEM_v2.7.0.md`
- `RELIC_v2.7.0.md`
- `SALE_v2.7.0.md`
- `NIGHT_CLOSING_v2.7.0.md`
- `UI_UX_v2.7.0.md`
- `COPY_WORLD_VOICE_v2.7.0.md`
- `EVENT_v2.7.0.md`
- `BOSS_v2.7.0.md`
- `FINAL_EXPEDITION_v2.7.0.md`
- `CORE_RUN_QA_v2.7.0.md`
- `ECONOMY_ORDER_QA_v2.7.0.md`
- `NPC_TRAIT_QA_v2.7.0.md`
- `DUNGEON_ITEM_QA_v2.7.0.md`
- `RELIC_QA_v2.7.0.md`
- `UI_UX_QA_v2.7.0.md`

`DECISIONS_v2.5.0.md` is historical only and is intentionally excluded from the current v2.7 SSOT set because it contains duplicated/superseded values that now belong only to current owner Specs.

## ROUTING

GAME/CORE -> `00_GAME_CORE_v2.5.0.md`
RUN/PHASE/SAVE/FINAL-TIMELINE -> `CORE_RUN_v2.7.0.md`
META/UNLOCK/JOB-MASTERY/CROSS-RUN -> `META_v2.7.0.md`
PRICE/GOLD/WALLET/ORDER/REROLL/NEXT-DAY-GATE-FORECAST -> `ECONOMY_ORDER_v2.7.0.md`
NPC/JOB/TRAIT/GROWTH/REVISIT/RECENT-SNAPSHOT -> `NPC_TRAIT_v2.7.0.md`
DUNGEON/FAMILY/HAZARD/PREPARED-POWER/SUPPLY/FATIGUE/GATE-GENERATION -> `DUNGEON_HAZARD_v2.7.0.md`
ITEM/CATALOG/CATEGORY/COUNTER/POTION/INSURANCE/MODIFIER-COMPOSITION -> `ITEM_v2.7.0.md`
RELIC/STORE-BUILD/FRESH/SLOTH-WINDOW -> `RELIC_v2.7.0.md`
SALE/CUSTOMER/PRICE/REFUSAL/BAG-HANDLING -> `SALE_v2.7.0.md`
NIGHT/INJURY/RESULT/CAUSALITY/FATIGUE-RESULT/CLOSING -> `NIGHT_CLOSING_v2.7.0.md`
UI/UX/MOBILE/TUTORIAL/TYPOGRAPHY/VISUAL -> `UI_UX_v2.7.0.md`
COPY/VOICE/TERMINOLOGY/TRUTH-CRITICAL-COPY -> `COPY_WORLD_VOICE_v2.7.0.md`
EVENT -> `EVENT_v2.7.0.md`
BOSS/SLOTH -> `BOSS_v2.7.0.md`
FINAL/D25-PREREVEAL/FINAL-HAZARD/FINAL-POWER -> `FINAL_EXPEDITION_v2.7.0.md`

CORE RUN QA -> `CORE_RUN_QA_v2.7.0.md`
ORDER/ECONOMY QA -> `ECONOMY_ORDER_QA_v2.7.0.md`
NPC/TRAIT QA -> `NPC_TRAIT_QA_v2.7.0.md`
DUNGEON/ITEM QA -> `DUNGEON_ITEM_QA_v2.7.0.md`
RELIC QA -> `RELIC_QA_v2.7.0.md`
UI/UX QA -> `UI_UX_QA_v2.7.0.md`

## v2.7 OWNER CHANGE MAP

Changed owners only:

- CORE_RUN: Save v8, fresh Run boundary, start stock, D0~D30 Final timeline, controlled D25 repair boundary
- META: preserve validated current v7 Account/Meta into v8 while discarding legacy Run state; no new fail-to-power Meta system
- ECONOMY_ORDER: inherit v2.6.1 Wallet/Order/Reroll economy; add required MORNING next-day Gate-count + Tier forecast contract and information boundary
- NPC_TRAIT: Level-up simplification, Fatigue Trait outcome scope, Potionbody, Food-affinity scope, latest expedition snapshot
- DUNGEON_HAZARD: prepared-Power weights, Hazard threat, Fatigue/Supply processing, shared result-field naming, next-day Gate-count/Tier forecast generation disclosure contract
- ITEM: categories, 30-item catalog rebalance, Potion line, Counter values, Insurance hierarchy, retired-ID replacement boundary, Food/Fresh positive-native-Stat modifier composition
- RELIC: build-value boundary, Fresh rebalance, category migration, current Economy Reroll inheritance, D30 known-Final ordering
- EVENT: Potion category price-pressure migration
- SALE: exactly 2 slots, sequential Counter Handling, preview boundary, revisit quick surface, same-item refusal price ceiling
- NIGHT_CLOSING: Supply/Fatigue result truth, First Aid Aftercare proof, snapshot write
- UI_UX: information boundary, conditional arithmetic, D25 presentation, required MORNING next-day Gate-count + Tier forecast, refusal-price disabled state, material/typography pass, exact `현재 지점 포기` label
- COPY_WORLD_VOICE: truth-critical copy, stale inherited-copy overrides, v2.7 terminology, Event 05 / GLUTTONY / Run-abandon exact copy
- FINAL_EXPEDITION: D25 persisted Final state, mean Hazard-gap penalty, Final Insurance no-op, inherited Final-formula override
- BOSS: GLUTTONY terminology plus PRIDE/GREED/GLUTTONY/SLOTH rebalance; WRATH 200 retained; inherited Boss-QA overrides

Unchanged global core identity stays in `00_GAME_CORE_v2.5.0.md`.

## PROMOTED-VISION / HISTORY STATUS

The previous `GUILD24_v2.7_PLUS_VISION.md`, `DECISIONS_v2.5.0.md`, and discussion/audit reports are planning/history references only after this promotion.
They are not parallel Design SSOT and must not override the owner files routed above.

v2.8+ deferred concepts are not part of this SSOT and must not be implemented during v2.7 adoption unless the User explicitly promotes them.

## SOURCE ACCESS RULE

Required sequence:

```text
1. open this SPEC_INDEX_v2.7.0.md
2. resolve owner + exact current filename
3. open that owner Spec
4. open declared BASE_DOCUMENT only for inherited sections actually needed
5. open related current QA
6. inspect Current Source only after Design Truth is established
```

If an exact routed file cannot be accessed, report:

```text
PROJECT SOURCE ACCESS/INDEX ISSUE
```

Do not substitute an older owner version, chat memory, or Current Source for missing Design Truth.

## QA / BALANCE RULE

Frozen QA detects mismatch; it does not tune balance.

If full-run data violates a v2.7 Director Baseline target:

```text
report BALANCE FINDING
-> separate Director/User tuning decision
-> owner Spec update
-> separate implementation/fix cycle
```

Never modify Source/Test/Harness mid-frozen-QA to make the result green.
