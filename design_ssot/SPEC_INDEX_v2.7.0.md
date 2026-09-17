# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=V2_7_IMPLEMENTATION_BASELINE_WITH_OPEN_APPROVALS
FREEZE_DATE=2026-09-15
LAST_APPROVED_AMENDMENT=2026-09-17
SSOT_AUDIT_STATUS=LATEST_APPROVED_AMENDMENTS_SYNCED_WITH_EXPLICIT_UNRESOLVED
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=FRANCHISE_GRADE_V7_TO_V8_MIGRATION;FINAL_TRANSFER_REVENUE_GREED_ACCOUNTING
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
-> resolve current implementation-blocking v2.7 Design Unresolved items
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
META/UNLOCK/JOB-MASTERY/FRANCHISE-GRADE/FRANCHISE-ACHIEVEMENT/CROSS-RUN -> `META_v2.7.0.md`
PRICE/GOLD/WALLET/ORDER/REROLL/NEXT-DAY-GATE-FORECAST/FINAL-PRICE -> `ECONOMY_ORDER_v2.7.0.md`
NPC/JOB/TRAIT/GROWTH/REVISIT/RECENT-SNAPSHOT -> `NPC_TRAIT_v2.7.0.md`
DUNGEON/FAMILY/HAZARD/PREPARED-POWER/SUPPLY/FATIGUE/GATE-GENERATION -> `DUNGEON_HAZARD_v2.7.0.md`
ITEM/CATALOG/CATEGORY/COUNTER/POTION/INSURANCE/MODIFIER-COMPOSITION -> `ITEM_v2.7.0.md`
RELIC/STORE-BUILD/FRESH/SLOTH-WINDOW -> `RELIC_v2.7.0.md`
SALE/CUSTOMER/PRICE/REFUSAL/PURCHASE-FLOW/DELTA-TRUTH/BAG-HANDLING/FINAL-HANDLING -> `SALE_v2.7.0.md`
NIGHT/INJURY/RESULT/CAUSALITY/FATIGUE-RESULT/CLOSING -> `NIGHT_CLOSING_v2.7.0.md`
UI/UX/MOBILE/TUTORIAL/TYPOGRAPHY/VISUAL/FINAL-PREPARATION-UI -> `UI_UX_v2.7.0.md`
COPY/VOICE/TERMINOLOGY/TRUTH-CRITICAL-COPY -> `COPY_WORLD_VOICE_v2.7.0.md`
EVENT -> `EVENT_v2.7.0.md`
BOSS/SLOTH/BOSS-FINAL-MODIFIER/GREED-SNAPSHOT/BOSS-CLEAR-SIGNAL -> `BOSS_v2.7.0.md`
FINAL/D25-PREREVEAL/FINAL-PARTY/FINAL-PREPARATION/FINAL-HAZARD/FINAL-POWER -> `FINAL_EXPEDITION_v2.7.0.md`

CORE RUN QA -> `CORE_RUN_QA_v2.7.0.md`
ORDER/ECONOMY/FINAL-PRICE QA -> `ECONOMY_ORDER_QA_v2.7.0.md`
NPC/TRAIT QA -> `NPC_TRAIT_QA_v2.7.0.md`
DUNGEON/ITEM QA -> `DUNGEON_ITEM_QA_v2.7.0.md`
RELIC QA -> `RELIC_QA_v2.7.0.md`
UI/UX/FINAL-PREPARATION QA -> `UI_UX_QA_v2.7.0.md`

## v2.7 OWNER CHANGE MAP

Changed owners only:

- CORE_RUN: Save v8, fresh Run boundary, start stock, D0~D30 Final timeline, controlled D25 repair boundary, D30 `출전 NPC 선택 -> FINAL 준비 -> 결과` progression; Final preparation uses fixed 50%/매입가 cost, Wallet/stock commitment, no refusal RNG
- META: preserve unchanged-semantics validated v7 Account/Meta into v8 while discarding legacy Run state; separate Franchise Grade from Job Mastery; define exactly 10 dedicated Franchise Achievements; 2/4/6/8/10 completion grade steps; 10/10 `전설의 편의점`; numeric achievement thresholds are current `DIRECTOR DOCUMENT BASELINE` values pending full-run QA
- ECONOMY_ORDER: inherit v2.6.1 ordinary Wallet/Order/Reroll economy; add required MORNING next-day Gate-count + Tier forecast contract; Day-band Rarity progression; Final fixed price = ordinary 50%/매입가 amount with real Wallet deduction and no 100/150/refusal
- NPC_TRAIT: Level-up simplification, Fatigue Trait outcome scope, Potionbody, Food-affinity scope, latest expedition snapshot; ordinary Injury keeps existing Stat penalty but recovery now requires Success/Great Success, Retreat does not clear Injury, and injured re-expedition carries extra Severe/Death risk
- DUNGEON_HAZARD: prepared-Power weights, Hazard threat, Fatigue/Supply processing, shared result-field naming, next-day Gate-count/Tier forecast generation disclosure contract; higher ordinary expedition death-risk baseline plus explicit injured re-expedition risk
- ITEM: categories, expanded 40-item active catalog, stronger flat native Core-Stat Item baseline, aligned Counter-specialist/premium pricing, Potion line, Counter values, Insurance hierarchy, retired-ID replacement boundary, Food/Fresh positive-native-Stat modifier composition, plus 10 Epic late-Run-value Items (5 Family hybrid Field Gear + 5 top-end Food/Drink/Potion)
- RELIC: build-value boundary, Fresh rebalance, category migration, current Economy Reroll inheritance, D30 known-Final ordering
- EVENT: Potion category price-pressure migration
- SALE: exactly 2 slots, sequential ordinary Counter Handling, preview boundary, truthful post-commit delta/source boundary, removal of non-decision flavor disclosure, revisit quick surface, ordinary same-item refusal price ceiling; Final override uses fixed 50%/매입가, no 100/150, no refusal RNG
- NIGHT_CLOSING: Supply/Fatigue result truth, First Aid Aftercare proof, snapshot write, persistent-Injury continuity across Retreat
- UI_UX: information boundary, conditional arithmetic, D25 presentation, required MORNING next-day Gate-count + Tier forecast, ordinary refusal-price disabled state, decision-only SALE detail, truthful post-commit delta display, Final fixed-price preparation UI, material/typography pass, exact `현재 지점 포기` label
- COPY_WORLD_VOICE: truth-critical copy, stale inherited-copy overrides, v2.7 terminology, Event 05 / GLUTTONY / Run-abandon exact copy
- FINAL_EXPEDITION: D25 persisted Final state, D30 `선택 -> FINAL 준비 -> 결과`, fixed 50%/매입가 affordability transfer with real stock/Wallet and no refusal RNG, mean Hazard-gap penalty, Final Insurance no-op, inherited Final-formula override
- BOSS: GLUTTONY terminology plus PRIDE/GREED/GLUTTONY/SLOTH rebalance; WRATH 200 retained; GREED snapshot timing remains Final Lock after Final preparation; fixed Final transfer Gross-Sales inclusion remains explicitly unresolved

Unchanged global core identity stays in `00_GAME_CORE_v2.5.0.md`.

## IMPLEMENTATION-BLOCKING DESIGN UNRESOLVED — CURRENT EXACT LIST

These are not permission for WORK to choose values.
They must be resolved by User/Director before the affected v2.7 Source adoption step.

### META numeric baselines — RESOLVED / QA-TUNABLE
The Franchise Achievement numeric thresholds are current `DIRECTOR DOCUMENT BASELINE` values owned only by `META_v2.7.0.md`.
They are not implementation-blocking unresolved items.
They must be adopted as written for the initial v2.7 implementation, then may be changed only after frozen/full-run QA reports a `BALANCE FINDING` and User/Director approves a META owner update.

### META migration
- exact v7 -> v8 treatment of previously-earned old-semantics Franchise Grade / Start Contract availability after Franchise Grade source changes from Total Job Mastery to Franchise Achievement count

### FINAL accounting
For a committed fixed-price Final transfer, decide whether the fixed 50%/매입가 amount:
- increases Player Gold
- increases Gross Sales used by GREED

Approved regardless of that unresolved:
- fixed Final price = 50% / 매입가
- 100% / 150% unavailable
- no refusal RNG
- Wallet affordability is real
- committed transfer deducts NPC Wallet and consumes stock
- GREED snapshot timing remains Final Lock after Final preparation

## PROMOTED-VISION / HISTORY STATUS

`GUILD24_v2.7_VISION_DETAILED_UPDATED_v5.md` is the current v2.7 Director Vision context and explicitly inherits unchanged Vision intent from `GUILD24_v2.7_VISION_DETAILED_UPDATED_v4.md`.
Both Vision documents, `DECISIONS_v2.5.0.md`, and discussion/audit reports are planning/history/context references only after SSOT promotion.
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
