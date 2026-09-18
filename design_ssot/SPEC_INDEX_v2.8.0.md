# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=V2_8_META_STRUCTURE_PROMOTED
FREEZE_DATE=2026-09-19
LAST_APPROVED_AMENDMENT=2026-09-19
SSOT_AUDIT_STATUS=V2_8_STRUCTURE_SYNCED_BALANCE_PENDING
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=STORE_CAPITAL_RATES,DECORATION_PRICES,INTEGRATED_CORE_BALANCE_BUNDLE
SOURCE_ADOPTION_STATUS=V2_8_NOT_YET_ADOPTED
V2_8_SOURCE_EDIT_GATE=INTEGRATED_BALANCE_BUNDLE_APPROVAL_REQUIRED
EXTERNAL_PUBLIC_RELEASE_TARGET=v3.0.0

## AUTHORITY

```text
1. User's newest approved decision
2. current GUILD24 Design SSOT
3. current Source
4. older chat / proposal / report / historical spec
```

DESIGN TRUTH = Design SSOT  
IMPLEMENTATION TRUTH = Source

Current Source remains v2.7 implementation truth until the approved v2.8 Source Adoption cycle lands.

## v2.8 PURPOSE

v2.8 simplifies cross-run progression before the external v3.0 target.

Active change:

```text
REMOVE active Franchise Grade / Franchise Achievement / Start Contract layer
-> REUSE its proven positive operating channels
-> MERGE cross-run economy into Store Capital + Decoration collection/loadout
-> keep Job Mastery as the separate Boss-clear growth axis
```

The retired v2.7 Franchise implementation is preserved as an inactive archive and is not deleted.

v2.8 also requires one integrated balance pass before Production adoption so Decoration effects are measured together with the already-observed late-run Gate / Wallet / Hazard-Counter findings.

## CURRENT DESIGN SSOT FILE SET

Current file set = 22 files:

- `SPEC_INDEX_v2.8.0.md`
- `00_GAME_CORE_v2.8.0.md`
- `CORE_RUN_v2.8.0.md`
- `META_v2.8.0.md`
- `ECONOMY_ORDER_v2.7.0.md`
- `NPC_TRAIT_v2.7.0.md`
- `DUNGEON_HAZARD_v2.7.0.md`
- `ITEM_v2.7.0.md`
- `RELIC_v2.7.0.md`
- `SALE_v2.7.0.md`
- `NIGHT_CLOSING_v2.7.0.md`
- `UI_UX_v2.8.0.md`
- `COPY_WORLD_VOICE_v2.7.0.md`
- `EVENT_v2.7.0.md`
- `BOSS_v2.7.0.md`
- `FINAL_EXPEDITION_v2.7.0.md`
- `CORE_RUN_QA_v2.8.0.md`
- `ECONOMY_ORDER_QA_v2.7.0.md`
- `NPC_TRAIT_QA_v2.7.0.md`
- `DUNGEON_ITEM_QA_v2.7.0.md`
- `RELIC_QA_v2.7.0.md`
- `UI_UX_QA_v2.8.0.md`

## ROUTING

GAME/CORE/CROSS-RUN IDENTITY -> `00_GAME_CORE_v2.8.0.md`  
RUN/PHASE/SAVE/FRESH-INIT/FINAL-TIMELINE/PRE-RUN-LOADOUT/META-SETTLEMENT -> `CORE_RUN_v2.8.0.md`  
META/JOB-MASTERY/BOSS-MATRIX/STORE-CAPITAL/DECORATION/INACTIVE-FRANCHISE-ARCHIVE -> `META_v2.8.0.md`  
PRICE/GOLD/WALLET/ORDER/REROLL/RARITY/FINAL-PRICE -> `ECONOMY_ORDER_v2.7.0.md`  
NPC/JOB/TRAIT/GROWTH/REVISIT -> `NPC_TRAIT_v2.7.0.md`  
DUNGEON/FAMILY/HAZARD/PREPARED-POWER/SUPPLY/FATIGUE/DEATH/GATE-GENERATION -> `DUNGEON_HAZARD_v2.7.0.md`  
ITEM/CATALOG/COUNTER/POTION/INSURANCE -> `ITEM_v2.7.0.md`  
RELIC/RUN-STORE-BUILD -> `RELIC_v2.7.0.md`  
SALE -> `SALE_v2.7.0.md`  
NIGHT/CLOSING -> `NIGHT_CLOSING_v2.7.0.md`  
UI/UX/MOBILE/DECORATION-UI/STORE-GROWTH-UI -> `UI_UX_v2.8.0.md`  
COPY -> `COPY_WORLD_VOICE_v2.7.0.md`  
EVENT -> `EVENT_v2.7.0.md`  
BOSS -> `BOSS_v2.7.0.md`  
FINAL -> `FINAL_EXPEDITION_v2.7.0.md`

CORE RUN QA -> `CORE_RUN_QA_v2.8.0.md`  
ORDER/ECONOMY QA -> `ECONOMY_ORDER_QA_v2.7.0.md`  
NPC/TRAIT QA -> `NPC_TRAIT_QA_v2.7.0.md`  
DUNGEON/ITEM QA -> `DUNGEON_ITEM_QA_v2.7.0.md`  
RELIC QA -> `RELIC_QA_v2.7.0.md`  
UI/UX QA -> `UI_UX_QA_v2.8.0.md`

## v2.8 PROMOTED STRUCTURE

### Active
- Store Capital = persistent store-growth currency
- permanent Decoration ownership
- four fixed active Slots: sign / wall / counter / display
- max one active Decoration per Slot
- pre-Run loadout, frozen during Run
- initial four Decoration effects reuse former Contract positive channels
- Job Mastery remains unchanged and separate

### Retired from active gameplay
- Franchise Grade
- Franchise Achievement track
- Grade ORDER discount
- Start Contract selection / Grade gating

### Must be preserved
Final v2.7 Franchise/Contract Source and Design are retained under the inactive-archive policy in `META_v2.8.0.md`.
They are historical assets, not active Runtime.

## BALANCE APPROVAL GATE

The structure above is approved Design.

The following exact numerics are not yet approved for Production:
- Store Capital Day-band conversion rates
- initial Decoration prices
- late Gate Power candidate
- NPC Wallet candidate
- Hazard Counter Item candidate / price alignment if needed

WORK may measure and recommend candidates but may not choose Production truth.

Required integrated proposal evaluates these together, including Decoration ownership states, rather than tuning the core first and rebalancing again after Meta is added.

Until User/Director approves the integrated bundle:

```text
NO v2.8 Production balance adoption
```

## SOURCE ARCHIVE REQUIREMENT

During v2.8 Source adoption, before removing active Franchise paths:

1. capture the final v2.7 Franchise/Contract implementation
2. place it under `archive/inactive/v2_7_franchise/`
3. add an archive README with inactive/runtime-forbidden/historical status
4. verify active runtime imports none of it
5. only then remove retired active call paths

Do not delete the archived implementation merely because current gameplay no longer uses it.

## SOURCE ACCESS

```text
SPEC_INDEX_v2.8.0
-> exact routed owner
-> only needed base document
-> related current QA
-> Current Source
```

If the routed source cannot be accessed after explicit lookup, report `PROJECT SOURCE ACCESS/INDEX ISSUE`.

## QA / BALANCE RULE

Frozen QA detects mismatch; it does not tune Production.

```text
BALANCE FINDING
-> candidate measurement
-> User/Director approval
-> owner numeric update
-> separate Source Adoption / Fix cycle
```

No candidate measurement may silently become Production truth.
