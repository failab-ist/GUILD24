# SALE

DOC=SALE
OWNER=sale,customer,price,refusal,purchase_flow,sale_decision_ux,bag_handling,revisit_surface
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=SALE_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged one-customer-at-a-time flow, 50/100/150 pricing, Wallet/affordability, refusal/no-sale, inventory visibility, purchase atomicity, destination truth, desktop/mobile core layout, and runtime continuity inherit `SALE_v2.6.1.md`.

This patch replaces the inherited Lv10+ third-slot rule and adds the v2.7 Bag handling / preview / revisit interaction boundary.

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

The SALE decision should feel like handling two items, not submitting a two-item form.

Canonical sequence per customer:

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
- current qualitative Combat Forecast
- current qualitative Hazard Readiness
- exact Item Stat / Counter / Supply / explicit penalty

When the Player focuses/selects an **uncommitted** Item, UI may additionally show:
- that Item's exact effects
- selected price / affordability
- deterministic Supply/Fatigue arithmetic owned by `DUNGEON_HAZARD_v2.7.0.md`

Before actual purchase commitment, do **not** show a derived answer such as:
- `접전 -> 우세`
- `불안 -> 충분`
- Great Success signal change
- exact success/death chance
- system-recommended/best Item

This boundary prevents the UI from turning the decision into answer-following.

## POST-COMMIT CURRENT STATE

Once an Item is actually purchased and committed into the NPC's Bag, it is no longer a hypothetical preview.

Before the Player judges the remaining slot, current decision information may update from the newly committed state, including:
- current Core Stat values where applicable
- current qualitative Combat Forecast
- current qualitative Hazard Readiness
- current Supply/Fatigue arithmetic

A refusal does not grant the Item effect.

## SAME-ITEM REFUSAL PRICE CEILING — EXACT

For the same customer + same SKU + same visit, an actual refusal creates a price ceiling for the remainder of that visit.

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
- this lock applies only to the same customer + same SKU + current visit
- it must not lock unrelated SKUs
- a new customer visit begins from that visit's normal pricing state unless another owner explicitly defines persistence
- higher-price controls blocked by this rule must be visibly disabled
- the reason for the disabled state must be readable in UI
- do not reroll purchase acceptance at a higher price after the same customer already refused the lower price for that SKU

Purpose:
prevent retry/RNG fishing where a lower-price refusal can paradoxically be followed by a higher-price purchase of the same item.

This is a coherence rule for the existing 50/100/150 pricing system, not a new Loyalty or negotiation subsystem.

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

## FINAL ITEM USABILITY

If `FINAL_EXPEDITION_v2.7.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
Normal SALE behavior for the same Item remains unchanged.

## RELATED

NPC growth/recent snapshot -> `NPC_TRAIT_v2.7.0.md`
Hazard/Fatigue preview -> `DUNGEON_HAZARD_v2.7.0.md`
Item effects -> `ITEM_v2.7.0.md`
Night proof -> `NIGHT_CLOSING_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
