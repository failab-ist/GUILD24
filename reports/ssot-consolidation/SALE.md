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
- deterministic Fatigue-recovery arithmetic (`피로 A -> 출발 B`) owned by `DUNGEON_HAZARD_v2.8.0.md`
The exact 실패 시 사망 위험 % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.8.0.md`, not a hypothetical post-Item answer. It is conditional on the expedition entering a failure path and is not the unconditional whole-expedition Death probability.
- an Item directly changes only the exact channels stated by `ITEM_v2.8.0.md`
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

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): Supply is Fatigue recovery only, shown as `피로 회복 N`; the `보급 X / 필요 Y · 여유 Z` decision cell, the Supply Deficit relief channel, the hidden deficit formula and the `보급 부족 완화` derived row are deleted (`피로 완화` stays); the 집중 사탕 example becomes `공포 대응 +10 / 피로 회복 3`; the 냉기 environment example uses the v2.9.0 pressure label `강인함으로 버틴다`. Two lines this ledger had declared new were edited in place above: the uncommitted-preview arithmetic line (reworded) and the hidden Supply-deficit formula line (removed from the target; its v2.7 original stays dropped).

```text
The decision surface may also show:
보급 5 / 필요 3 · 여유 2
- exact Item Stat / Counter / Supply / explicit penalty
- exact proven derived changes from Supply/Fatigue/other owned systems may be shown with their source
- current Supply/Fatigue arithmetic may update where it is deterministic public arithmetic
Current preparation can legitimately change through more than one channel after a Supply Item is committed:
B. Supply Deficit relief
C. current-Fatigue recovery / Fatigue penalty-band change
D. another explicitly owned Trait / Relic / Boss modifier
- post-commit delta rows may show exact Core-Stat / Counter / Supply / Fatigue changes, but must not recalculate or replace the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 display
- the inherited Supply Deficit system may change effective expedition preparation across all four Core Stats / Hazard readiness when Prepared Supply moves toward the Required Supply threshold; this is a **Supply Deficit effect**, not a hidden direct Item Stat
- excess Supply that reduces current Fatigue may restore effective 기동/정신 when a canonical Fatigue penalty band changes; this is a **Fatigue/Condition effect**, not a hidden direct Item Stat
- current `집중 사탕` has `공포 +10 / Supply 3`
- if there is no Supply Deficit change and no Fatigue penalty-band change, selling it must not create a Core-Stat delta
- if its Supply reduces an existing Supply Deficit, effective 투력/강인함/기동/정신 may legitimately rise through the unified Supply Deficit system
- if excess Supply crosses a Fatigue penalty band, effective 기동/정신 may also rise through Fatigue recovery
- those indirect changes must be presented as `보급 부족 완화` / `피로 완화` or equivalent source-readable system effects, never as if 집중 사탕 itself granted those Stats
- do not hide actual Counter / Core Stat / Supply / penalty / Insurance behavior merely to remove flavor
`북부 설원 폐허 I · 냉기 · 강인함 압박`
- 피로 변화
- Supply
```

```new
(User 2026-09-24, v2.9.0)
- Fatigue recovery (Food/Drink)
- do not hide actual Counter / Core Stat / 피로 회복 / penalty / Insurance behavior merely to remove flavor
- exact Item Stat / Counter / `피로 회복 N` / explicit penalty
- 피로 회복 N
- exact proven derived changes from Fatigue/other owned systems may be shown with their source
- current Fatigue-recovery arithmetic (`피로 A -> 출발 B`) may update where it is deterministic public arithmetic
Current preparation can legitimately change through more than one channel after a Food/Drink Item is committed (User 2026-09-24, v2.9.0):
B. current-Fatigue recovery / Fatigue band change
C. another explicitly owned Trait / Relic / Boss modifier
- post-commit delta rows may show exact Core-Stat / Counter / Fatigue changes (`피로 {A} → 출발 {B}`); they must not recalculate, replace or repaint the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 readout, and no outlook delta row exists (User 2026-09-24, v2.9.0)
- Food/Drink Fatigue recovery that reduces current Fatigue may restore effective Core Stats when a canonical Fatigue band changes (bands -> `DUNGEON_HAZARD_v2.8.0.md`); this is a **Fatigue/Condition effect**, not a hidden direct Item Stat
- current `집중 사탕` shows `공포 대응 +10 / 피로 회복 3`
- if there is no Fatigue band change, selling it must not create a Core-Stat delta
- if its 피로 회복 releases a Fatigue band, effective Core Stats may rise through Fatigue recovery
- that indirect change must be presented as `피로 완화` or an equivalent source-readable system effect, never as if 집중 사탕 itself granted those Stats
`북부 설원 폐허 I · 냉기 · 강인함으로 버틴다`
```

## AMENDMENT — v2.9.0 transaction beat / SALE at a glance (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0), D-3 rule sheet: the transaction is shown by presentation-only beats (hand-over, customer reaction, the Bag in its strip, customer exit / entry, refusal button shake) under the contract owned by `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT; SALE reads at a glance (Stat grid pressure tag, matching-effect emphasis, one delta list with outlook delta rows only when they change, price role words with `이익 {N}G`, always-on outlook reduced to 전투 전망 + 환경 대응 with the exact Death risk moved into the 전투 전망 help and the NPC detail). Exact copy stays in `COPY_AUDIT_APPROVED_v2.8.0.md`. One line this ledger had declared new (the post-commit delta-row line of the previous amendment) was edited in place above to its v2.9.0 form. No chain line dropped.

```new
`finalizeCustomer -> nextCustomer` carries the customer exit-then-entry beat (the current customer exits, then the next arrives with the existing entry). It is presentation only and changes no state (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT) (User 2026-09-24, v2.9.0).
- the hand/commit step is shown by the transaction beats (presentation only, contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT); the two Bag slots stay in the customer-state strip beside the status line and remain the handling surface (`UI_UX_v2.8.0.md` §BAG PRESENTATION); tap remains sufficient, no drag is required (User 2026-09-24, v2.9.0)
### MATCHING-EFFECT EMPHASIS
In SALE Item rows, the effect text that answers the customer's Gate is set in the emphasis style (bold, ink colour): a Counter for one of the Gate's Hazards, or the Core Stat that one of its Hazards presses. Every other effect keeps the default style. No badge, no verdict word, no reorder (User 2026-09-24, v2.9.0).
After an Item is chosen, `판매 후 변화` is one delta list of what changes only: direct Stat rows (`강인함 17 → 23`), derived rows (`피로 완화`) and `피로 {A} → 출발 {B}`. The outlook (Combat Forecast / Hazard Readiness / Death risk) is never shown moving for an uncommitted Item and the frozen four-cell outlook is not repainted inside the till; `특수 효과` and the shelf-life line stay (heading and row copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`) (User 2026-09-24, v2.9.0).
The always-on outlook is two cells, 전투 전망 + 환경 대응. The exact failure-conditioned Death risk is still exposed at SALE entry, as the second line of the 전투 전망 help (`실패 시 사망 위험 {N}%`) and in the NPC detail, not as an always-on readout cell; it is frozen like the rest (exact help copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`) (User 2026-09-24, v2.9.0).
The exact 실패 시 사망 위험 % sits at that Help level (전투 전망 help, NPC detail), not as an always-on cell (User 2026-09-24, v2.9.0).
The Death risk % is frozen where it is now shown: the 전투 전망 help and the NPC detail (User 2026-09-24, v2.9.0).
### STAT GRID PRESSURE TAG
Under each of the four Stat cells, when the customer's Gate presses that Stat, a small tag names the pressing Hazard(s) (icon + name, e.g. `냉기`, or `독 · 속박` for two). 투력 never carries a tag. No number, no verdict. The tag is the one place the Stat grid links to the Gate (User 2026-09-24, v2.9.0).
Each price button carries its role word with the mode and price (`할인 50%` / `정가` / `바가지 150%`) and the small line `이익 {N}G` (or the existing disabled reason) under it; exact face copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`. Three modes only, no extra depth (User 2026-09-24, v2.9.0).
Presentation only (User 2026-09-24, v2.9.0): the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text, and the refusal reply stays 5 s (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT). The refusal rules below are unchanged.
- transaction beats follow `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT: one sale's beats total < 600 ms, never block input, skipped under `prefers-reduced-motion` with the same end state (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 counter tray (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the chosen Item is shown on the counter tray; §COUNTER HANDLING, §ITEM SELECTION, §SALE LAYOUT — MOBILE and §SALE RUNTIME CONTINUITY name it (the `price panel open/close` continuity line becomes the tray fill / clear line).

```text
- price panel open/close
```

```new
- the chosen Item is shown on the counter tray (fixed above the dock) with its `판매 후 변화` and the three price keys; the shelf rows never change height (`UI_UX_v2.8.0.md` §SALE — COUNTER TRAY; (User 2026-09-24, v2.9.0))
The compared Item's detail lives on the counter tray, so comparing two Items never moves the shelf list (User 2026-09-24, v2.9.0).
- the counter tray sits fixed above the dock; the price keys are always in the same place (User 2026-09-24, v2.9.0)
- counter tray fill / clear (the shelf list never changes height; (User 2026-09-24, v2.9.0))
```
