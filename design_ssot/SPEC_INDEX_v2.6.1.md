# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=FROZEN_FOR_ADOPTION_RECOVERY
FREEZE_DATE=2026-09-14
LAST_APPROVED_AMENDMENT=2026-09-15
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE

## AUTHORITY

Authority order:
1. User's newest approved decision
2. current GUILD24 Design SSOT
3. current Source
4. older chat / proposal / report / historical spec

DESIGN TRUTH = Design SSOT
IMPLEMENTATION TRUTH = Source

`Canonical` is a legacy label only. It does not create a second design authority.

## v2.6.1 PATCH POLICY

v2.6.1 is a corrective Adoption Recovery patch, not a new Core Design version.

Rules:
- only owner Specs / QA whose authoritative content changed are versioned to `_v2.6.1`
- unchanged owner documents retain their existing v2.5/v2.6 filenames
- v2.6.1 owner files may declare `BASE_DOCUMENT`; unspecified sections inherit that exact base document
- a v2.6.1 patch file overrides conflicting stale text in its base document
- v2.7 content must not be introduced

## DIRECTOR RESOLUTIONS — 2026-09-14

1. NPC Wallet D1 global baseline:
   - First-visit base: **150G**
   - formula: `150 + Level×8 + random(0,60)`
   - revisit formula remains carry-based: `previous Persistent Wallet + Level×8 + random(0,60)`
   - no new Day inflation subsystem
   - rich remains actual-visit +50G, cap 2000G

2. SALE Desktop layout authority:
   - v2.6.1 Recovery layout is authoritative
   - Character / Portrait left
   - enlarged Bag remains a visual/touch-size change only
   - Forecast + Expected Destination occupy the upper-right Core Decision area
   - duplicated lower destination/forecast blocks are removed

3. `SALE_v2.6.0.md` was absent from Project Sources.
   - current SALE owner is restored as `SALE_v2.6.1.md`
   - base source is `SALE_v2.5.0.md`
   - v2.6.1 patch rules are authoritative over inherited v2.5 text

## CURRENT DESIGN SSOT FILE SET

Current owner file set = 23 files:

- `SPEC_INDEX_v2.6.1.md`
- `00_GAME_CORE_v2.5.0.md`
- `CORE_RUN_v2.6.1.md`
- `META_v2.6.1.md`
- `ECONOMY_ORDER_v2.6.1.md`
- `NPC_TRAIT_v2.6.1.md`
- `DUNGEON_HAZARD_v2.6.0.md`
- `ITEM_v2.5.0.md`
- `RELIC_v2.5.0.md`
- `SALE_v2.6.1.md`
- `NIGHT_CLOSING_v2.6.1.md`
- `UI_UX_v2.6.1.md`
- `COPY_WORLD_VOICE_v2.5.0.md`
- `EVENT_v2.5.0.md`
- `BOSS_v2.5.0.md`
- `FINAL_EXPEDITION_v2.5.0.md`
- `DECISIONS_v2.5.0.md`
- `CORE_RUN_QA_v2.6.1.md`
- `ECONOMY_ORDER_QA_v2.6.1.md`
- `NPC_TRAIT_QA_v2.6.1.md`
- `DUNGEON_ITEM_QA_v2.5.0.md`
- `RELIC_QA_v2.5.0.md`
- `UI_UX_QA_v2.6.1.md`

## ROUTING

GAME/CORE -> `00_GAME_CORE_v2.5.0.md`
RUN/PHASE/SAVE/ABANDON -> `CORE_RUN_v2.6.1.md`
META/UNLOCK/D10/D14 -> `META_v2.6.1.md`
PRICE/GOLD/WALLET/ORDER/REROLL -> `ECONOMY_ORDER_v2.6.1.md`
NPC/JOB/TRAIT/LOYALTY/WALLET-PERSISTENCE -> `NPC_TRAIT_v2.6.1.md`
DUNGEON/FAMILY/HAZARD/SUPPLY/FATIGUE-PREP -> `DUNGEON_HAZARD_v2.6.0.md`
ITEM/CATALOG/COUNTER/SUPPLY -> `ITEM_v2.5.0.md`
RELIC/STORE-SUPPORT -> `RELIC_v2.5.0.md`
SALE/CUSTOMER/PRICE/REFUSAL/SALE-UX -> `SALE_v2.6.1.md`
NIGHT/INJURY/RESULT/CAUSALITY/CLOSING -> `NIGHT_CLOSING_v2.6.1.md`
UI/UX/MOBILE/TUTORIAL/MENU/SETTINGS -> `UI_UX_v2.6.1.md`
COPY/VOICE/TERMINOLOGY -> `COPY_WORLD_VOICE_v2.5.0.md`
EVENT -> `EVENT_v2.5.0.md`
BOSS -> `BOSS_v2.5.0.md`
FINAL -> `FINAL_EXPEDITION_v2.5.0.md`

CORE RUN QA -> `CORE_RUN_QA_v2.6.1.md`
ORDER/ECONOMY QA -> `ECONOMY_ORDER_QA_v2.6.1.md`
NPC/TRAIT QA -> `NPC_TRAIT_QA_v2.6.1.md`
DUNGEON/ITEM QA -> `DUNGEON_ITEM_QA_v2.5.0.md`
RELIC QA -> `RELIC_QA_v2.5.0.md`
UI/UX QA -> `UI_UX_QA_v2.6.1.md`

## RECOVERY EXECUTION DOCUMENT

Current corrective implementation plan:
`GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`

Routing correction — 2026-09-15:
- the stale earlier reference `GUILD24_v2.6.1_ADOPTION_RECOVERY_PLAN.md` is superseded
- the Final Implementation Plan above is the current execution document
- this routing correction changes no v2.6.1 game Design rule, number, UX requirement, or QA expectation

The Recovery Plan is an execution document, not a second Design authority.
If a conflict exists, this Index + owning current Design SSOT controls.

## PROJECT SOURCE ACCESS RULE

Do not classify a Design SSOT as missing from initial context.

Required sequence:
1. Open this `SPEC_INDEX_v2.6.1.md`.
2. Resolve owner and exact current filename.
3. Open the current owner file.
4. If it declares `BASE_DOCUMENT`, open that exact base only as required for unchanged sections.
5. Read only needed sections first.
6. If the exact file cannot be accessed, report `PROJECT SOURCE ACCESS/INDEX ISSUE`.
7. Do not substitute another historical version.

## READING RULE

Task
-> WORK_STATE
-> this Index
-> current owner Spec
-> declared base only if needed
-> related current QA
-> Source Search
-> needed Code only
-> Target Test
