# SPEC_INDEX

DOC=SPEC_INDEX
OWNER=spec_index,canonical_routing,version_policy,source_access

DOC_VERSION=2.5.0
CANONICAL_SET=GUILD24_CANONICAL_v2.5.0
FREEZE_STATUS=FROZEN
FREEZE_DATE=2026-09-11
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE

## FREEZE / PASS3 POLICY

`FREEZE_STATUS=FROZEN` means all behavior/structure decisions required for the v2.5 Canonical set are frozen.

`PASS3` markers are numeric/presentation tuning work, not permission to redesign a mechanic.

For an existing mechanic with a canonical-compatible Source baseline:
- Source baseline may be retained provisionally where the owning Spec explicitly allows it.

For a newly added v2.5 mechanic whose exact numeric is marked PASS3 and has no prior Source baseline:
- do not invent a hidden replacement subsystem
- keep the mechanic structure exactly as Canonical
- tuning constants must live in the owning system/table
- report the chosen provisional tuning values before final production merge when the owning Spec marks them PASS3

PASS3 does not reopen:
- Boss identity / reveal schedule
- Boss Trait mechanic identity
- Sloth Relic trade-off
- Job × Boss Mastery matrix
- 1/3/6 unlock gates
- Franchise Grade source / no-direct-modifier boundary / Start Contract gate ownership

## VERSION POLICY

canonicalSet=v2.5.0
filenamePattern=`<DOC>_vMAJOR.MINOR.PATCH.md`

MAJOR = Canonical contract/structure change
MINOR = approved rule/content expansion without broad contract break
PATCH = clarification/typo/non-behavioral correction

Rule:
When a Project Source filename version changes,
update this SPEC_INDEX reference in the same Canonical set.

## CANONICAL FILE SET

Current Project Sources must contain only the latest Canonical Set versions of these MD files:

- `SPEC_INDEX_v2.5.0.md`
- `00_GAME_CORE_v2.5.0.md`
- `CORE_RUN_v2.5.0.md`
- `META_v2.5.0.md`
- `ECONOMY_ORDER_v2.5.0.md`
- `NPC_TRAIT_v2.5.0.md`
- `DUNGEON_HAZARD_v2.5.0.md`
- `ITEM_v2.5.0.md`
- `RELIC_v2.5.0.md`
- `SALE_v2.5.0.md`
- `NIGHT_CLOSING_v2.5.0.md`
- `UI_UX_v2.5.0.md`
- `COPY_WORLD_VOICE_v2.5.0.md`
- `EVENT_v2.5.0.md`
- `BOSS_v2.5.0.md`
- `FINAL_EXPEDITION_v2.5.0.md`
- `DECISIONS_v2.5.0.md`
- `CORE_RUN_QA_v2.5.0.md`
- `ECONOMY_ORDER_QA_v2.5.0.md`
- `NPC_TRAIT_QA_v2.5.0.md`
- `DUNGEON_ITEM_QA_v2.5.0.md`
- `RELIC_QA_v2.5.0.md`
- `UI_UX_QA_v2.5.0.md`

Canonical file count=23.
ZIP is backup/transfer only and is not a Canonical Source.

## CORE
GAME/CORE -> 00_GAME_CORE_v2.5.0.md
RUN/PHASE/SAVE -> CORE_RUN_v2.5.0.md

## META
JOB MASTERY / JOB×BOSS CLEAR MATRIX -> META_v2.5.0.md
DISTINCT BOSS CLEAR / UNLOCK -> META_v2.5.0.md
FRANCHISE GRADE / MONSTER KNOWLEDGE -> META_v2.5.0.md
START CONTRACT UNLOCK / FRANCHISE GRADE GATE -> META_v2.5.0.md
JOB BASE/GROWTH MASTERY EFFECT CHANNEL -> NPC_TRAIT_v2.5.0.md

## BOSS
BOSS IDENTITY / ROSTER / TRAIT -> BOSS_v2.5.0.md
BOSS REVEAL TIMING -> BOSS_v2.5.0.md
SLOTH SEAL OPPORTUNITY / DIFFICULTY STATE -> BOSS_v2.5.0.md

## FINAL
D30 FINAL PARTY / FINAL POWER / CLEAR -> FINAL_EXPEDITION_v2.5.0.md
FINAL FAMILY DISCLOSURE / FINAL HAZARD POOL -> FINAL_EXPEDITION_v2.5.0.md
FINAL BALANCE / QA CONTRACT -> FINAL_EXPEDITION_v2.5.0.md

## ECONOMY / ORDER
PRICE/GOLD/WALLET/MARGIN -> ECONOMY_ORDER_v2.5.0.md
ORDER/OFFER/FULL-OFFER REROLL -> ECONOMY_ORDER_v2.5.0.md
NEXT-DAY TIER FORECAST -> ECONOMY_ORDER_v2.5.0.md
CUMULATIVE GROSS SALES -> ECONOMY_ORDER_v2.5.0.md

## NPC / TRAIT
JOB/GROWTH -> NPC_TRAIT_v2.5.0.md
TRAIT/LOYALTY/WALLET/REVISIT -> NPC_TRAIT_v2.5.0.md
ROSTER/LIVING NPC CAP/DESTINATION/PRE-REVEAL -> NPC_TRAIT_v2.5.0.md

## DUNGEON
FAMILY/TIER/HAZARD/SUPPLY BURDEN -> DUNGEON_HAZARD_v2.5.0.md
COUNTER/FORECAST/COMBAT VARIANCE -> DUNGEON_HAZARD_v2.5.0.md

## ITEM
CATEGORY/ROLE/SUPPLY/COUNTER -> ITEM_v2.5.0.md
INSURANCE/ITEM INTERACTION -> ITEM_v2.5.0.md
ACTIVE 30-ITEM CATALOG/RARITY -> ITEM_v2.5.0.md
황금 1+1 쿠폰 EFFECT -> ITEM_v2.5.0.md
황금 1+1 쿠폰 UNLOCK -> META_v2.5.0.md

## RELIC
WINDOW/OFFER/PRICE/SAVE -> RELIC_v2.5.0.md
BUILD/BLUEPRINT/UTILITY -> RELIC_v2.5.0.md
SLOTH RELIC-WINDOW TRADE-OFF EXECUTION -> RELIC_v2.5.0.md

## EVENT
TIMING/FREQUENCY/ELIGIBILITY -> EVENT_v2.5.0.md
22-EVENT CATALOG/EFFECT -> EVENT_v2.5.0.md
EVENT HAZARD/RARE EASTER EGG -> EVENT_v2.5.0.md

## SALE
CUSTOMER FLOW/ITEM/PRICE/REFUSAL -> SALE_v2.5.0.md
CONSUMER SLOT/DESTINATION REVEAL -> SALE_v2.5.0.md
COMMITTED SALE REVENUE -> SALE_v2.5.0.md

## NIGHT / CLOSING
NORMAL EXPEDITION RESULT/CAUSALITY -> NIGHT_CLOSING_v2.5.0.md
INJURY/DEATH/GROWTH RESULT -> NIGHT_CLOSING_v2.5.0.md
ECONOMIC SETTLEMENT -> NIGHT_CLOSING_v2.5.0.md

## UI / UX
PHASE UI/MOBILE -> UI_UX_v2.5.0.md
TUTORIAL/COACH MARK -> UI_UX_v2.5.0.md
EVENT REVEAL/FORECAST UI -> UI_UX_v2.5.0.md
BOSS/RELIC REVEAL ORDER UI -> UI_UX_v2.5.0.md
META PROGRESSION UI -> UI_UX_v2.5.0.md

## COPY / WORLD VOICE
PLAYER COPY/TERMINOLOGY/DATA-FUNCTION-FLAVOR -> COPY_WORLD_VOICE_v2.5.0.md
NPC DIALOGUE/RESULT VARIATION/CALLBACK COPY -> COPY_WORLD_VOICE_v2.5.0.md
CULTURE/RARE NPC REFERENCE VOICE -> COPY_WORLD_VOICE_v2.5.0.md
BOSS/META COPY EXPRESSION -> COPY_WORLD_VOICE_v2.5.0.md

## QA
CORE RUN -> CORE_RUN_QA_v2.5.0.md
ECONOMY/ORDER -> ECONOMY_ORDER_QA_v2.5.0.md
NPC/TRAIT -> NPC_TRAIT_QA_v2.5.0.md
DUNGEON/ITEM -> DUNGEON_ITEM_QA_v2.5.0.md
RELIC -> RELIC_QA_v2.5.0.md
UI/UX -> UI_UX_QA_v2.5.0.md
BOSS -> BOSS_v2.5.0.md (embedded Boss QA)
META -> META_v2.5.0.md (embedded Meta QA)
FINAL -> FINAL_EXPEDITION_v2.5.0.md (embedded Final QA contract)
EVENT -> EVENT_v2.5.0.md (embedded Event QA)
COPY -> COPY_WORLD_VOICE_v2.5.0.md (embedded Copy QA)

## WORK STATE
IMPORTANT DESIGN DECISIONS -> DECISIONS_v2.5.0.md

Runtime work files (NOT Project Sources):
CURRENT TASK QUEUE -> TODO.md
CURRENT CHECKPOINT -> WORK_STATE.md

## SEARCH ROUTING

```text
core/game/philosophy                     -> 00_GAME_CORE_v2.5.0.md
run/phase/save                           -> CORE_RUN_v2.5.0.md
meta/mastery/unlock/grade/knowledge      -> META_v2.5.0.md
boss/sin/trait/reveal/sloth-seal         -> BOSS_v2.5.0.md
price/gold/wallet/order/offer/reroll     -> ECONOMY_ORDER_v2.5.0.md
npc/job/trait/roster/cap/revisit         -> NPC_TRAIT_v2.5.0.md
dungeon/family/hazard/supply/forecast    -> DUNGEON_HAZARD_v2.5.0.md
item/catalog/category/counter/supply     -> ITEM_v2.5.0.md
relic/build/facility/store-support       -> RELIC_v2.5.0.md
sale/customer/price/refusal              -> SALE_v2.5.0.md
night/injury/death/closing/settlement    -> NIGHT_CLOSING_v2.5.0.md
ui/ux/tutorial/mobile/event-reveal       -> UI_UX_v2.5.0.md
copy/voice/flavor/dialogue/terminology   -> COPY_WORLD_VOICE_v2.5.0.md
event/daily-event/easter-egg             -> EVENT_v2.5.0.md
final/D30/final-party/family/clear        -> FINAL_EXPEDITION_v2.5.0.md

core-run QA                              -> CORE_RUN_QA_v2.5.0.md
order/economy QA                         -> ECONOMY_ORDER_QA_v2.5.0.md
npc/trait QA                             -> NPC_TRAIT_QA_v2.5.0.md
dungeon/item/preparation QA              -> DUNGEON_ITEM_QA_v2.5.0.md
relic/build/sloth-window QA               -> RELIC_QA_v2.5.0.md
ui/ux/reveal-order QA                     -> UI_UX_QA_v2.5.0.md
```

## PROJECT SOURCE ACCESS RULE

Do not classify a Canonical file as MISSING merely because it is absent from initial session context.

Required sequence:
1. Open `SPEC_INDEX_v2.5.0.md`.
2. Resolve the owning document and exact filename.
3. Explicitly Search/Open that exact filename in Project Sources.
4. Read only the needed section first; expand only if required.
5. If the exact file still cannot be accessed, report `PROJECT SOURCE ACCESS/INDEX ISSUE`.
6. Do not substitute an old-version file.

## READING RULE

Task
-> WORK_STATE
-> this index
-> exact indexed filename Search/Open
-> owning Spec
-> related QA
-> Source Search
-> needed Code only
-> Target Test
