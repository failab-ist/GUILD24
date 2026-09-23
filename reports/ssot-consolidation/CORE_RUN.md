# CORE_RUN consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/CORE_RUN_v2.8.0.md
CHAIN=design_ssot/CORE_RUN_v2.8.0.md,design_ssot/history/CORE_RUN_v2.7.0.md,design_ssot/history/CORE_RUN_v2.6.1.md,design_ssot/history/CORE_RUN_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/CORE_RUN_v2.8.0-patch.md`; v2.7.0 / v2.6.1 / v2.5.0 stay in `history/`.
`CORE_RUN_QA_v2.8.0.md` is a separate owner and is not merged; the QA section points to it.

Placement: the v2.5 section order is the skeleton. v2.8 PRE-RUN FLOW and D0 FIRST-MORNING BOSS
BRIEFING follow RUN FANTASY (they precede the Day loop). The v2.6.1 ORDER phase-advance rule joins
the ORDER subsection. v2.7 start stock joins START STATE; v2.8 RUN START EFFECT APPLICATION follows it.
v2.7 FINAL TIMELINE, v2.8 BOSS INFORMATION TIMELINE and v2.7 D25 STATE SAFETY sit before D30 FINAL,
which absorbs v2.7 D30 FINAL FLOW. SAVE / LOAD carries v2.7 Save v8, v2.8 SAVE BOUNDARY and the v2.5
Deep Expedition save contract as subsections. CURRENT RUN ABANDON merges the v2.6.1 section with
the v2.5 2026-09-12 amendment. v2.6.1 FULL RESET and v2.7 FRESH INITIALIZATION follow; v2.8 RUN-END
STORE CAPITAL SETTLEMENT precedes the v2.5 tail sections. RELATED is one merged list.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

```text
## INHERITANCE
Save v8 behavior, D0-D30 Final timeline, tutorial reset, start stock, D25 persisted Final state,
D30 preparation flow and unchanged Run rules inherit CORE_RUN_v2.7.0.md.
All unchanged Run/phase/abandon mechanics inherit `CORE_RUN_v2.6.1.md`.
This patch owns v2.7 Run-start inventory, Save generation, legacy-save rejection, fresh-init tutorial reset boundary, and D0~D30 Final timeline changes.
All unchanged Run/phase rules inherit `CORE_RUN_v2.5.0.md`.
```

## LEGACY — version headings / change narration / history rationale

The Save v8 "Reason" paragraph is the v2.7 change rationale (it also names the retired Franchise Grade);
the Save v8 rules themselves are kept. The v2.7 START STOCK framing line narrates the Bandage swap; the
current stock list and the Bandage retirement line are kept in START STATE. The v2.5 amendment heading
is dropped: its abandon rules merge into CURRENT RUN ABANDON and its Deep save contract sits under
SAVE / LOAD. `## D30 FINAL FLOW — EXACT` merges into `## D30 FINAL`.

```text
v2.7 uses a new incompatible internal-test schema.
Reason:
v2.7 changes active Item IDs, normal Bag capacity, Level milestone behavior, Final prereveal state, persistent recent-expedition data, and Franchise Grade derivation. Before the v3.0.0 external-release target, preserving internal-test compatibility is not worth adding migration complexity or semantic ambiguity.
## START STOCK — v2.7
Keep the ordinary start quantity count, but replace the retired Bandage slot.
## APPROVED_AMENDMENT_2026_09_12 — RUN ABANDON / DEEP SAVE
### CURRENT RUN ABANDON
## D30 FINAL FLOW — EXACT
```

## LEGACY — restatements of rules kept verbatim elsewhere in the target

The v2.6.1 phase order restates the kept v2.5 DAILY PHASE FLOW. The v2.7 abandon-label block restates
the kept v2.6.1 `현재 지점 포기` action line and the kept abandon rules. The v2.6.1 abandon bullets
restate the kept v2.5 amendment lists (`Meta.finish()`, Run settlement, Job Mastery / Boss Clear /
reward / progress credit, Run-scoped discard, ordinary fresh-Run start path, `account.matrix` /
derived Meta progression, separate Full game-data reset). The v2.6.1 bullet
`- earned unlocks and unlock-toast state` is kept in place of the narrower v2.5 `- already-earned unlocks`.
The v2.6.1 `- no migration` / `- no continuation` bullets restate the kept v2.7 Save v8 rules (no
Account/Meta migration, v1~v7 Run state cannot continue). The v2.6.1 bullets
`- show old-version/fresh-start guidance` and `- do not automatically delete original legacy bytes` are
kept under SAVE v8: v2.7 defers byte cleanup to "the existing reset/storage policy", which is this rule.

```text
The phase order remains:
MORNING -> ORDER -> SALE -> NIGHT -> CLOSING -> next Day
The v2.7 Player-facing Run-abandon label remains:
현재 지점 포기
The abandon function/semantics remain unchanged.
Abandon means:
- discard current Run state only
- no `Meta.finish()`
- no settlement
- no Mastery/Boss clear/reward/progression credit
- start next Run through the ordinary fresh-Run path
Preserve account-scoped:
- matrix / Meta progression
This action is separate from Full Data Reset.
- already-earned unlocks
- no migration
- no continuation
```

## SUPERSEDED — Save v7 schema -> Save v8 (v2.7)

```text
## SAVE v7 — EXACT
Current schema contract:
KEY = guild24.save.v7
LEGACY = v1~v6
Envelope version = 7
Export version = 7
Validation version = 7
run.version = 7
New Run must initialize `run.version=7`.
```

## SUPERSEDED — start stock 붕대 -> 진정 허브티 (v2.7; `bandage` retired)

The v2.5 KEY `startStock` block and the START STATE stock list are replaced by the v2.7 list kept in
START STATE.

```text
startStock:
- 삼각김밥×1
- 생수×1
- 붕대×1
- 하급포션×1
```

## SUPERSEDED — abandon label `현재 런 포기` -> `현재 지점 포기` (v2.6.1 / v2.7)

```text
Player-facing identity=`현재 런 포기`.
```

## SUPERSEDED — D30 Family disclosure order (v2.7: Family/Hazard disclosed and persisted on D25)

The Final Family is disclosed on D25 (kept FINAL TIMELINE / D25 STATE SAFETY); the kept D30 flow starts
"After the already-known D25 Final state and the D30 Relic/SLOTH decision are resolved". The live
after-lock sentence of this block is kept.

```text
D30 order constraint:
Boss/Final Family disclosure -> D30 Relic or Sloth decision -> Final preparation -> Final lock.
```

## LEGACY — retired Start Contract / Franchise Grade (META_v2.8.0 RETIRED v2.7 FRANCHISE SYSTEM)

The kept v2.8 lines state the current rule: "There is no Start Contract selection in the current pre-Run
flow." and "Run-start effects come only from the frozen active Decoration loadout; no contract state
contributes in parallel." The `- contracts` visitor-modifier bullet is dropped for the same reason.

```text
Start Contract availability / unlock ownership:
A selected Start Contract may modify Run start only through that contract's explicit effect.
Franchise Grade itself does not directly grant the selected contract effect.
- contracts
```

## REWORD — dead Start Contract clauses trimmed (retired per META_v2.8.0)

```text
No hidden extra starting resources unless explicitly defined by selected Start Contract.
Capacity modifiers may come from explicit Relic/contract effects.
```

```new
No hidden extra starting resources.
Capacity modifiers may come from explicit Relic effects.
```

## REWORD — version framing removed from current rules

```text
dailyOverhead follows the Day AND the roster the Store has actually built (v2.5 final):
`bandage` is retired and is not an active v2.7 Item ID.
- v1~v7 **Run state** cannot continue as a v2.7 Run.
The v2.8 meal/water identity pass reuses existing Item IDs and does not itself require a migration
v2.5 removes legacy Global Meta XP.
```

```new
dailyOverhead follows the Day AND the roster the Store has actually built:
`bandage` is retired and is not an active Item ID.
- v1~v7 **Run state** cannot continue as a current v8 Run.
The meal/water identity pass reuses existing Item IDs and does not itself require a migration
Legacy Global Meta XP is removed.
```

## REWORD — section headings merged under SAVE / LOAD (level only)

```text
## SAVE v8 — EXACT
## SAVE BOUNDARY
```

```new
### SAVE v8 — EXACT
### SAVE BOUNDARY
```

## REWORD — cross-owner pointers name the current owner file

```text
The Player enters SALE only through the separate `영업 시작` action defined by ECONOMY_ORDER/UI_UX.
Item identity/prices/effects -> `ITEM_v2.7.0.md`.
Its gameplay payoff is the D25 exact Final Family/Hazard disclosure owned by `FINAL_EXPEDITION_v2.7.0.md`.
- selected participants are processed according to `FINAL_EXPEDITION_v2.7.0.md` / `SALE_v2.7.0.md`
Exact tutorial content/presentation -> `UI_UX_v2.7.0.md`.
Acceptance criteria -> CORE_RUN_QA_v2.5.0.md
-> ECONOMY_ORDER
-> SALE
-> NIGHT_CLOSING
-> ITEM
-> NPC_TRAIT
-> RELIC
-> DUNGEON_HAZARD
-> FINAL_EXPEDITION
-> BOSS
-> META
```

```new
The Player enters SALE only through the separate `영업 시작` action defined by `ECONOMY_ORDER_v2.8.0.md` / `UI_UX_v2.8.0.md`.
Item identity/prices/effects -> `ITEM_v2.8.0.md`.
Its gameplay payoff is the D25 exact Final Family/Hazard disclosure owned by `FINAL_EXPEDITION_v2.8.0.md`.
- selected participants are processed according to `FINAL_EXPEDITION_v2.8.0.md` / `SALE_v2.8.0.md`
Exact tutorial content/presentation -> `UI_UX_v2.8.0.md`.
Acceptance criteria -> CORE_RUN_QA_v2.8.0.md
-> ECONOMY_ORDER_v2.8.0.md
-> SALE_v2.8.0.md
-> NIGHT_CLOSING_v2.8.0.md
-> ITEM_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md
-> RELIC_v2.8.0.md
-> DUNGEON_HAZARD_v2.8.0.md
-> FINAL_EXPEDITION_v2.8.0.md
-> BOSS_v2.8.0.md
-> META_v2.8.0.md
```

## REWORD — RELATED: v2.5, v2.7 and v2.8 lists merged, current owner files

`Exact player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md` is added per SPEC_INDEX_v2.8.0 routing
(`EXACT PLAYER-FACING COPY`); the kept D0 section already routes exact copy there.

```text
game philosophy -> 00_GAME_CORE
economy/order -> ECONOMY_ORDER
npc persistence/growth -> NPC_TRAIT
dungeon generation -> DUNGEON_HAZARD
item/stock -> ITEM
relic/windows -> RELIC
sale -> SALE
night/closing -> NIGHT_CLOSING
presentation/mobile -> UI_UX
event/day modifier -> EVENT
final expedition -> FINAL_EXPEDITION
boss identity/trait -> BOSS
meta/mastery/knowledge -> META
player-facing copy -> COPY_WORLD_VOICE
NPC growth/level -> `NPC_TRAIT_v2.7.0.md`
Item/start-stock identity -> `ITEM_v2.7.0.md`
D25/D30 Final flow -> `FINAL_EXPEDITION_v2.7.0.md`
Final Item handling -> `SALE_v2.7.0.md`
Final fixed price/Wallet/Gold -> `ECONOMY_ORDER_v2.7.0.md`
Boss reveal/GREED -> `BOSS_v2.7.0.md`
Account/Meta -> `META_v2.7.0.md`
Tutorial presentation -> `UI_UX_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
Player-facing abandon wording -> `COPY_WORLD_VOICE_v2.7.0.md`
Meta -> META_v2.8.0.md
Boss cadence -> BOSS_v2.8.0.md
Decoration UI -> UI_UX_v2.8.0.md
```

```new
Game philosophy -> `00_GAME_CORE_v2.8.0.md`
Economy / order / Final fixed price / Wallet / Gold -> `ECONOMY_ORDER_v2.8.0.md`
NPC persistence / growth / level -> `NPC_TRAIT_v2.8.0.md`
Dungeon generation -> `DUNGEON_HAZARD_v2.8.0.md`
Item / stock / start-stock identity -> `ITEM_v2.8.0.md`
Relic / windows -> `RELIC_v2.8.0.md`
Sale / Final Item handling -> `SALE_v2.8.0.md`
Night / closing -> `NIGHT_CLOSING_v2.8.0.md`
Event / day modifier -> `EVENT_v2.8.0.md`
D25/D30 Final flow / Final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
Boss identity / trait / reveal / cadence / GREED -> `BOSS_v2.8.0.md`
Meta / mastery / knowledge / Account -> `META_v2.8.0.md`
Presentation / mobile / tutorial presentation / Decoration UI -> `UI_UX_v2.8.0.md`
Player-facing copy / abandon wording -> `COPY_WORLD_VOICE_v2.8.0.md`
Exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`
```

## REWORD — legacy-save label uses the current legacy range (v2.7 SAVE v8 `LEGACY = v1~v7`)

```text
Legacy v1~v6:
```

```new
Legacy v1~v7:
```

## NOTES — reviewed, kept verbatim, not unresolved

- Overhead change control (`Any later base-overhead change requires:` / `- integrated v2.5 multi-seed
  evidence`) is a live gate; only the words "v2.5" are version framing, and the line is left verbatim.
- Full Reset `- D10/D14 unlocks fresh` is live (META D10/D14 product unlock).
