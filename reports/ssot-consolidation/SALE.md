# SALE consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/SALE_v2.8.0.md
CHAIN=design_ssot/SALE_v2.8.0.md,design_ssot/history/SALE_v2.7.0.md,design_ssot/history/SALE_v2.6.1.md,design_ssot/history/SALE_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/SALE_v2.8.0-patch.md`; the v2.7, v2.6.1 and v2.5 versions stay in `history/`.

Placement: v2.5 section order is the skeleton (KEY, ROLE, flow, customer info, reveal boundary,
destination, inventory, Bag, Item selection, preview, forecast, price, purchase, refusal, commit,
finalization, no-sale, relationship, honesty, revenue signal, mobile interaction). Each later section
joins its topic: v2.6.1 CORE DECISION CONTRACT after ROLE; v2.7 COUNTER HANDLING after CUSTOMER FLOW;
v2.8 CURRENT CUSTOMER COMPACT STATE / FATIGUE after CUSTOMER INFORMATION; v2.7 QUEUE boundary after
PRE-REVEAL BOUNDARY; v2.6.1 liar destination rule inside DESTINATION; the v2.5 Deep nomination amendment
follows DESTINATION; v2.7 NORMAL CONSUMER BAG absorbs v2.5 CONSUMER SLOT; v2.7 PRE-COMMIT boundary, v2.5
PREVIEW and v2.8 NO RELATIVE ANSWER GRADER sit together; v2.8 FROZEN OUTLOOK precedes v2.7 POST-COMMIT
CURRENT STATE, v2.8 GREAT SUCCESS SIGNAL and v2.7 POST-COMMIT DELTA SOURCE TRUTH; v2.8 purchase-accessibility
routing joins PURCHASE DECISION; v2.7 price ceiling and v2.8 refusal retry truth follow REFUSAL;
v2.6.1 layout / continuity / preload follow v2.5 MOBILE / INTERACTION; v2.7 Final override closes the
rules. QA is one section: current QA file pointers, then the v2.5 embedded Deep nomination acceptance.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

```text
## INHERITANCE
All unchanged v2.7 transaction, two-slot Bag, pricing/refusal, Wallet, destination, frozen outlook,
post-commit delta-source and Final override rules inherit SALE_v2.7.0.md.
All unchanged one-customer-at-a-time flow, ordinary 50/100/150 pricing, Wallet/affordability, refusal/no-sale, inventory visibility, purchase atomicity, destination truth, desktop/mobile core layout, and runtime continuity inherit `SALE_v2.6.1.md`.
This patch replaces the inherited Lv10+ third-slot rule, adds the v2.7 Bag handling / preview / revisit interaction boundary, and defines the Final-specific override boundary owned by `FINAL_EXPEDITION_v2.7.0.md`.
All SALE behavior not explicitly changed below inherits `SALE_v2.5.0.md`, including:
- one-customer-at-a-time flow
- 50 / 100 / 150 price modes
- all-sellable inventory visibility
- refusal logic contract
- no-sale choice
- purchase atomicity
- Deep Expedition nomination amendment
- cumulative gross sales signal
This v2.6.1 file overrides conflicting stale destination, information, and presentation wording in the base.
```

## LEGACY — version headings / change narration (sections merged into their topic)

```text
## DESTINATION — v2.6.1 OVERRIDE
Therefore the stale v2.5 description "reported destination changes while actual assignment stays" is superseded.
## CONSUMER SLOT
## PURCHASE-ACCESSIBILITY ROUTING — PLAYTEST RESPONSE
## v2.7 EXCLUSION
Not part of v2.6.1:
- Item Role large rebalance
- past-Bag / attachment expansion
```

## LEGACY — restatements of rules kept verbatim elsewhere in the target

The v2.5 DESTINATION lines `Player-facing label:` / `` `예상 목적지` `` / `- expected destination = actual
assigned destination` are kept; v2.7 `The actual expedition Resolve still uses the final prepared state
after all committed Items.` (POST-COMMIT CURRENT STATE) is kept.

```text
Player-facing label remains:
- claimed destination = actual assigned destination
Actual expedition Resolve still uses the final committed Bag.
```

## SUPERSEDED — Lv10+ third consumer slot, replaced by exactly 2 slots for every NPC (v2.7 NORMAL CONSUMER BAG)

```text
consumerSlots:
base=2
Lv10+=3
baseSlots=2
Lv10+:
slots=3
- base consumer slots 2, Lv10+ 3
The inherited v2.5 consumer slot rule remains active in v2.6.1:
- base 2
- Lv10+ 3
- fixed 2-slot Bag for every NPC
- Counter Handling action layer
```

## SUPERSEDED — exact Death probability hidden, replaced by the shown exact pre-supply failure-conditioned 실패 시 사망 위험 % (v2.7 PRE-COMMIT INFORMATION BOUNDARY)

The kept v2.7 line states the shown % is not the unconditional whole-expedition Death probability.

```text
exactDeathProb=HIDDEN
```

## SUPERSEDED — liar reports a false destination while actual stays, replaced by liar changing the actual destination (v2.6.1 DESTINATION override)

```text
- an explicitly defined Trait may alter what the NPC reports without changing actual destination
```

## REWORD — version tags removed from headings / labels

```text
## v2.6.1 CORE DECISION CONTRACT
## APPROVED_AMENDMENT_2026_09_12 — DEEP EXPEDITION NOMINATION
Authoritative v2.6.1 composition:
v2.7 does not reveal new future-customer information such as:
```

```new
## CORE DECISION CONTRACT
## DEEP EXPEDITION NOMINATION
Authoritative composition:
Do not reveal new future-customer information such as:
```

## REWORD — dead Death % clause trimmed (v2.7 shows the exact pre-supply 실패 시 사망 위험 %); the other prohibitions stay live

```text
No exact Success %, Death %, hidden Power, or master safety score.
```

```new
No exact Success %, hidden Power, or master safety score.
```

## REWORD — "inherited rule" pointer names the kept section

```text
Bag remains exactly two slots under the inherited rule.
```

```new
Bag remains exactly two slots under the NORMAL CONSUMER BAG rule.
```

## REWORD — cross-owner pointers name the current owner file

```text
-> UI_UX
-> NPC_TRAIT
-> EVENT
-> ITEM
-> CORE_RUN
-> ECONOMY_ORDER
-> 00_GAME_CORE
-> DUNGEON_HAZARD
- destination is random among eligible open Gates according to NPC_TRAIT
Save/Load persistence -> CORE_RUN.
- deterministic Supply/Fatigue arithmetic owned by `DUNGEON_HAZARD_v2.7.0.md`
The exact 실패 시 사망 위험 % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.7.0.md`, not a hypothetical post-Item answer. It is conditional on the expedition entering a failure path and is not the unconditional whole-expedition Death probability.
- an Item directly changes only the exact channels stated by `ITEM_v2.7.0.md`
- exact hidden Supply-deficit formula remains hidden under `DUNGEON_HAZARD_v2.7.0.md`; source attribution does not expose that formula
When a returning NPC has a recent-expedition snapshot owned by `NPC_TRAIT_v2.7.0.md`, show one compact quick surface:
For each committed Final transfer, Player Gold and Gross Sales both increase by the exact fixed 50% / 매입가 amount once, matching `ECONOMY_ORDER_v2.7.0.md` / `FINAL_EXPEDITION_v2.7.0.md` / `BOSS_v2.7.0.md`.
If `FINAL_EXPEDITION_v2.7.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
```

```new
-> UI_UX_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md
-> EVENT_v2.8.0.md
-> ITEM_v2.8.0.md
-> CORE_RUN_v2.8.0.md
-> ECONOMY_ORDER_v2.8.0.md
-> 00_GAME_CORE_v2.8.0.md
-> DUNGEON_HAZARD_v2.8.0.md
- destination is random among eligible open Gates according to `NPC_TRAIT_v2.8.0.md`
Save/Load persistence -> `CORE_RUN_v2.8.0.md`.
- deterministic Supply/Fatigue arithmetic owned by `DUNGEON_HAZARD_v2.8.0.md`
The exact 실패 시 사망 위험 % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.8.0.md`, not a hypothetical post-Item answer. It is conditional on the expedition entering a failure path and is not the unconditional whole-expedition Death probability.
- an Item directly changes only the exact channels stated by `ITEM_v2.8.0.md`
- exact hidden Supply-deficit formula remains hidden under `DUNGEON_HAZARD_v2.8.0.md`; source attribution does not expose that formula
When a returning NPC has a recent-expedition snapshot owned by `NPC_TRAIT_v2.8.0.md`, show one compact quick surface:
For each committed Final transfer, Player Gold and Gross Sales both increase by the exact fixed 50% / 매입가 amount once, matching `ECONOMY_ORDER_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md` / `BOSS_v2.8.0.md`.
If `FINAL_EXPEDITION_v2.8.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
```

## REWORD — QA: v2.5 QA and v2.6.1 QA OWNERSHIP lists merged to the current QA files; embedded Deep acceptance moved under QA

The v2.5 and v2.6.1 lists name the same four owners. `## QA` and `Acceptance criteria:` are kept.

```text
## QA OWNERSHIP
Acceptance ->
- `ECONOMY_ORDER_QA_v2.6.1.md`
- `NPC_TRAIT_QA_v2.6.1.md`
- `UI_UX_QA_v2.6.1.md`
- `CORE_RUN_QA_v2.6.1.md`
- CORE_RUN_QA_v2.5.0.md
- ECONOMY_ORDER_QA_v2.5.0.md
- NPC_TRAIT_QA_v2.5.0.md
- UI_UX_QA_v2.5.0.md
Embedded SALE acceptance:
```

```new
- CORE_RUN_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md
Deep Expedition nomination acceptance:
```

## REWORD — RELATED: v2.5 and v2.7 lists merged, current owner files

```text
game philosophy -> 00_GAME_CORE
npc/trait/destination -> NPC_TRAIT
item/inventory -> ITEM
price/wallet -> ECONOMY_ORDER
dungeon forecast -> DUNGEON_HAZARD
run/phase -> CORE_RUN
night result -> NIGHT_CLOSING
presentation -> UI_UX
NPC growth/recent snapshot -> `NPC_TRAIT_v2.7.0.md`
Hazard/Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Item effects -> `ITEM_v2.7.0.md`
Night proof -> `NIGHT_CLOSING_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Economy/Wallet -> `ECONOMY_ORDER_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
```

```new
game philosophy -> `00_GAME_CORE_v2.8.0.md`
NPC / Trait / destination / growth / recent snapshot -> `NPC_TRAIT_v2.8.0.md`
Item / inventory / Item effects -> `ITEM_v2.8.0.md`
price / Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
dungeon forecast / Hazard / Fatigue / Supply -> `DUNGEON_HAZARD_v2.8.0.md`
run / phase -> `CORE_RUN_v2.8.0.md`
night result / Night proof -> `NIGHT_CLOSING_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
presentation -> `UI_UX_v2.8.0.md`
```

## UNRESOLVED — kept verbatim, reported to the User

- DEEP EXPEDITION NOMINATION step `5. recalculate forecast` (v2.5) vs FROZEN OUTLOOK `For the whole
  customer visit, keep the SALE-entry snapshot frozen` (v2.8) / POST-COMMIT CURRENT STATE `the
  decision-surface expedition outlook remains the **SALE-entry / pre-supply snapshot** for the entire
  customer visit` (v2.7). Nomination replaces the destination mid-visit (before the first committed
  transaction); no chain version says whether the frozen snapshot is re-taken for the Deep destination.
  Both kept as written.

## REVIEW NOTE — Deep nomination forecast (UNRESOLVED, reported to the User)

Independent review: real conflict, not scoped by the text. `5. recalculate forecast` (Deep
nomination, before the first committed transaction) vs the SALE-entry snapshot frozen for the whole
visit. DUNGEON_HAZARD also points both ways ("Forecast uses the raised Deep Combat requirement" vs
the displayed snapshot "uses the NPC/Gate/Condition state at SALE entry"). Source does not
recalculate: `nominateDeep()` changes the destination but keeps `n.outlook` from `arrive()`.

## REWORD — post-commit heading label follows COPY_AUDIT §4-4 (UI_UX review follow-up)

```text
A generic heading such as `보급 후 변화` is acceptable only if the rows clearly distinguish direct Item effects from derived system changes.
```

```new
A generic heading such as `판매 후 변화` is acceptable only if the rows clearly distinguish direct Item effects from derived system changes.
```

## AMENDMENT — User decision 2026-09-23: Deep nomination re-takes the outlook (resolves the note above)

User: the forecast is recalculated for the Deep destination; the Player cannot cancel the
nomination. Nomination precedes any committed transaction, so the re-take is still the pre-supply
snapshot. Source now does this in `nominateDeep()` (tests/integration.cjs covers it).

```new
One exception: confirming a Deep Expedition nomination (allowed only before the first committed
transaction) re-takes this pre-supply snapshot once, against the Deep Gate. The nomination cannot be
cancelled.
```
