# SALE

DOC=SALE
OWNER=sale,customer,price,refusal,purchase_flow,sale_decision_ux,bag_handling,revisit_surface,final_sale_override
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=SALE_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged one-customer-at-a-time flow, ordinary 50/100/150 pricing, Wallet/affordability, refusal/no-sale, inventory visibility, purchase atomicity, destination truth, desktop/mobile core layout, and runtime continuity inherit `SALE_v2.6.1.md`.

This patch replaces the inherited Lv10+ third-slot rule, adds the v2.7 Bag handling / preview / revisit interaction boundary, and defines the Final-specific override boundary owned by `FINAL_EXPEDITION_v2.7.0.md`.

## NORMAL CONSUMER BAG — EXACT

Every normal SALE expedition Bag has exactly:

```text
2 slots
```

For all NPCs regardless of:
- Level
- Job
- Rarity
- Trait

No Lv10+ third slot.
No disabled/ghost third slot.
No hidden extra normal slot.

Special Final ownership may define its own party/preparation surface but must not silently restore the removed normal Lv10+ slot rule.

## COUNTER HANDLING / ACTION LAYER

The ordinary SALE decision should feel like handling two items, not submitting a two-item form.

Canonical sequence per ordinary customer:

```text
choose/focus a Bag slot
-> choose an Item for that slot
-> choose price
-> hand/commit transaction
-> purchase or refusal resolves
-> current state updates
-> judge remaining slot
```

Rules:
- first purchase/refusal resolves before the second slot decision is finished
- do not merge both slots into one cart checkout
- no separate handling minigame/resource/QTE
- Item tap is sufficient for the full flow; drag is optional enhancement only

## MOBILE BAG INTERACTION

- both Bag slots remain visibly present even when empty
- each is a practical ~44px-class touch target
- first empty slot may receive default focus
- tapping an occupied slot changes focus
- tapping an Item places/replaces it in the focused uncommitted slot
- after filling one uncommitted slot, another empty slot may receive focus
- explicit remove/return action exists
- destructive gesture is not required

Bag enlargement is presentation only and never changes capacity.

## PRE-COMMIT INFORMATION BOUNDARY

Always readable ingredients remain:
- NPC identity / Job / Level
- four Core Stats
- active Trait / Condition
- NPC Wallet / affordability
- current committed Bag / remaining slots
- Expected Destination
- known current environment/Hazard
- pre-supply qualitative Combat Forecast
- pre-supply qualitative Hazard Readiness
- exact pre-supply Death Risk %
- exact Item Stat / Counter / Supply / explicit penalty

When the Player focuses/selects an **uncommitted** Item, UI may additionally show:
- that Item's exact effects
- selected price / affordability
- deterministic Supply/Fatigue arithmetic owned by `DUNGEON_HAZARD_v2.7.0.md`

Before actual purchase commitment, do **not** show a hypothetical post-Item derived answer such as:
- `접전 -> 우세`
- `불안 -> 충분`
- Death Risk `% -> %` change
- Great Success signal change
- exact expedition success chance
- system-recommended/best Item

The exact Death Risk % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.7.0.md`, not a hypothetical post-Item answer.

This boundary prevents the UI from turning the decision into answer-following.

## POST-COMMIT CURRENT STATE

Once an Item is actually purchased and committed into the NPC's Bag, it is no longer hypothetical.

However, the decision-surface expedition outlook remains the **SALE-entry / pre-supply snapshot** for the entire customer visit.

After a purchase commits:
- pre-supply Combat Forecast does **not** update
- pre-supply Hazard Readiness does **not** update
- pre-supply Death Risk % does **not** update
- exact Item/direct-effect changes may be shown
- exact proven derived changes from Supply/Fatigue/other owned systems may be shown with their source
- current Supply/Fatigue arithmetic may update where it is deterministic public arithmetic

A refusal does not grant the Item effect.

Purpose:
- the Player receives a clear baseline before deciding whether this NPC is worth supporting
- the UI does not grade the Player's first Item choice before the remaining-slot decision
- post-commit feedback explains **what actually changed and why**, without converting that change into a new Forecast/Readiness/Death answer

The actual expedition Resolve still uses the final prepared state after all committed Items.
Freezing the displayed outlook does not freeze the runtime preparation state.

## POST-COMMIT DELTA SOURCE TRUTH — EXACT

Do not present a generic aggregate panel that makes every changed value look like a direct Item Stat effect.

Current preparation can legitimately change through more than one channel after a Supply Item is committed:

```text
A. direct Item effect
B. Supply Deficit relief
C. current-Fatigue recovery / Fatigue penalty-band change
D. another explicitly owned Trait / Relic / Boss modifier
```

Rules:
- an Item directly changes only the exact channels stated by `ITEM_v2.7.0.md`
- if a post-commit delta is shown, the changed value must be actual and its source must be provable
- post-commit delta rows may show exact Core-Stat / Counter / Supply / Fatigue changes, but must not recalculate or replace the pre-supply Combat Forecast / Hazard Readiness / Death Risk display
- ordinary SALE must keep the pre-supply Forecast/Readiness/Death Risk snapshot frozen; post-commit feedback should instead show exact changed values/effects with readable source attribution rather than a new derived expedition answer
- the inherited Supply Deficit system may change effective expedition preparation across all four Core Stats / Hazard readiness when Prepared Supply moves toward the Required Supply threshold; this is a **Supply Deficit effect**, not a hidden direct Item Stat
- excess Supply that reduces current Fatigue may restore effective 기동/정신 when a canonical Fatigue penalty band changes; this is a **Fatigue/Condition effect**, not a hidden direct Item Stat
- exact hidden Supply-deficit formula remains hidden under `DUNGEON_HAZARD_v2.7.0.md`; source attribution does not expose that formula
- Trait/Relic/Boss modifiers may change an Item contribution only within their exact owned scope

Example boundary:
- current `집중 사탕` has `공포 +10 / Supply 3`
- it has no direct positive four-Core-Stat contribution
- if there is no Supply Deficit change and no Fatigue penalty-band change, selling it must not create a Core-Stat delta
- if its Supply reduces an existing Supply Deficit, effective 투력/강인함/기동/정신 may legitimately rise through the unified Supply Deficit system
- if excess Supply crosses a Fatigue penalty band, effective 기동/정신 may also rise through Fatigue recovery
- those indirect changes must be presented as `보급 부족 완화` / `피로 완화` or equivalent source-readable system effects, never as if 집중 사탕 itself granted those Stats

A generic heading such as `보급 후 변화` is acceptable only if the rows clearly distinguish direct Item effects from derived system changes.
If that distinction is not readable, remove the synthetic delta block rather than replacing the pre-supply outlook with post-commit Forecast/Readiness/Death answers.

## SALE DECISION-ONLY DETAIL — REMOVE NON-DECISION DISCLOSURES

Remove the following SALE-only expandable/detail treatments from the customer decision surface:

```text
이 손님에게 안 걸리는 효과
상품 설명
```

when `상품 설명` contains only flavor text rather than a current decision effect.

Rules:
- SALE shows the exact Item effects that can actually matter to the current transaction/expedition
- do not create a disclosure control that looks strategically important but opens only flavor prose
- flavor text may continue to exist in Item data or another existing non-decision context; this rule does not require adding a new catalog/detail screen
- do not hide actual Counter / Core Stat / Supply / penalty / Insurance behavior merely to remove flavor

Purpose:
reduce false information weight on the decision screen and keep SALE focused on actionable truth.

## SAME-ITEM REFUSAL PRICE CEILING — EXACT

For the same ordinary customer + same SKU + same visit, an actual refusal creates a price ceiling for the remainder of that visit.

Rule:

```text
if a price mode is refused for the same SKU
-> every higher price mode for that same SKU is disabled for that customer visit
-> lower price modes may still be attempted
```

Exact cases:

```text
50% refused
-> 100% disabled
-> 150% disabled

100% refused
-> 150% disabled
-> 50% may still be attempted

150% refused
-> 100% / 50% may still be attempted
```

Rules:
- this lock applies only to the same customer + same SKU + current ordinary visit
- it must not lock unrelated SKUs
- a new customer visit begins from that visit's normal pricing state unless another owner explicitly defines persistence
- higher-price controls blocked by this rule must be visibly disabled
- the reason for the disabled state must be readable in UI
- do not reroll purchase acceptance at a higher price after the same customer already refused the lower price for that SKU

Purpose:
prevent retry/RNG fishing where a lower-price refusal can paradoxically be followed by a higher-price purchase of the same item.

This is a coherence rule for the existing ordinary 50/100/150 pricing system, not a new Loyalty or negotiation subsystem.

## RETURNING NPC — LAST EXPEDITION QUICK SURFACE

When a returning NPC has a recent-expedition snapshot owned by `NPC_TRAIT_v2.7.0.md`, show one compact quick surface:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

Rules:
- only actually accepted/purchased Item IDs from that expedition
- empty slot remains empty
- no causal claim from Item presence alone
- mobile presentation must not push Wallet / Expected Destination / Forecast below the primary decision flow
- detail may expand actual destination, Outcome, Item names, and only proven contribution tokens

No Product XP / Favorite Meter / Familiarity Bonus is created.

## QUEUE INFORMATION BOUNDARY

v2.7 does not reveal new future-customer information such as:
- future Job
- Level
- Destination
- Preparation Need
- importance score

Existing currently-authorized queue-count information remains unchanged.
The uncertainty of who comes next is part of inventory allocation judgment.

## FINAL PREPARATION OVERRIDE — EXACT WHERE APPROVED

Final preparation reuses the familiar two-slot Item handling and real inventory, but it does **not** reuse ordinary end-of-Run haggling/refusal behavior.

For each selected Final participant:

```text
2 visible Bag slots
-> choose/focus slot
-> choose Item
-> fixed 50% / 매입가 amount is shown
-> affordability check
-> commit transfer
-> stock and NPC Wallet update
-> judge remaining slot
```

Rules:
- no 100% or 150% price selection in Final preparation
- no purchase/refusal RNG in Final preparation
- same-SKU refusal price ceiling does not apply because there is no Final refusal roll
- exactly two Item slots remain
- actual inventory stock is consumed on committed transfer
- NPC Wallet must cover the fixed 50%/매입가 amount
- committed transfer reduces NPC Wallet by that exact amount
- if unaffordable, the Item cannot be committed to that NPC
- Player may leave a slot empty
- sequential slot handling remains; do not create a bundle/cart checkout
- Save/Load must not erase committed Final transfers or reopen committed participant selection for fishing

Ordinary SALE outside Final remains unchanged.

For each committed Final transfer, Player Gold and Gross Sales both increase by the exact fixed 50% / 매입가 amount once, matching `ECONOMY_ORDER_v2.7.0.md` / `FINAL_EXPEDITION_v2.7.0.md` / `BOSS_v2.7.0.md`.
Do not double-count the transfer.

## FINAL ITEM USABILITY

If `FINAL_EXPEDITION_v2.7.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
Normal SALE behavior for the same Item remains unchanged.

## RELATED

NPC growth/recent snapshot -> `NPC_TRAIT_v2.7.0.md`
Hazard/Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Item effects -> `ITEM_v2.7.0.md`
Night proof -> `NIGHT_CLOSING_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Economy/Wallet -> `ECONOMY_ORDER_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
