# UI_UX

DOC=UI_UX
OWNER=ui,ux,mobile,tutorial,visual,decoration_ui,store_growth_ui
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION

## CURRENT EXECUTION SCOPE

This v2.8-named file is a **scoped Decoration Package design source for the current v2.7 cycle**, not a project-wide v2.8 adoption directive.

Apply only the Decoration/Store-Capital replacement work explicitly owned here.
All unrelated systems and balance owners remain on their current v2.7 routes through `SPEC_INDEX_v2.7.0.md`.

## INHERITANCE

All unchanged SALE, ORDER, NIGHT, Final, mobile, typography, tutorial, and visual rules inherit `UI_UX_v2.7.0.md`.

This patch supersedes the active v2.7 Franchise Achievement / Grade / Start Contract presentation.

## RETIRED ACTIVE UI

Remove from the active v2.7 UI when the Decoration Package is adopted:
- Franchise Grade header
- Franchise Achievement list/progress
- Franchise Achievement toast
- Grade ORDER discount readout
- Start Contract selection cards
- Grade-gated Start Contract unlock progress

Their final v2.7 implementation remains preserved only through the inactive archive rule in `META_v2.8.0.md`.

## STORE GROWTH SURFACE

Reuse the existing Codex/management space rather than add a separate top-level progression app.

The former Start Contract area becomes the **점포** management area.

It must show:
- current Store Capital
- the four fixed Decoration Slots
- owned/unowned state
- purchase cost when unowned
- exact active effect
- current equipped Decoration per Slot
- alternative owned Decorations in that Slot when future content exists

No Decoration Tree is added.

## PURCHASE / EQUIP FLOW

Decoration purchase occurs only outside an active Run.

Purchase:
```text
enough Store Capital
-> confirm purchase
-> Store Capital decreases once
-> Decoration becomes permanently owned
```

The confirmation is a required step, not a courtesy. Precisely:

- the purchase button **asks**; it never spends
- the confirmation states the Decoration, its cost, and the Capital that will remain
- only the explicit Confirm spends Capital, and it spends it exactly once
- Cancel changes nothing: no Capital, no ownership, no loadout
- a repeated press of the purchase button, closing and reopening the management window, or a
  reload must never spend a second time. The pending confirmation is view state: it is never
  written to the Account or the save, so a reload is a cancel
- an unaffordable Decoration cannot reach the confirmation at all

Equip:
```text
choose one owned Decoration in a Slot
-> that Slot's planned next-Run choice changes
```

After Run start:
- loadout is read-only
- no mid-Run swap
- no paid respec
- no free-placement mode

For the initial Decoration-package implementation, each Slot has only one content item.
UI must still be built around `Slot -> owned options -> selected option`, not around four hard-coded booleans.

## STORE VISUAL FEEDBACK

The active Run visually shows the currently equipped Decorations at fixed store locations:

- sign -> sign / entrance area
- wall -> wall area
- counter -> counter area
- display -> display / shelf area

Only the equipped Decoration in each Slot needs to appear in the active store scene, and it is
read from the **Run's frozen loadout**, never from the Account — a Decoration bought mid-Run does
not appear in the Run already running.

Each Decoration appears as **drawn store art**, in the store scene's existing pixel-art language
and palette, on the same grid as the room around it. A name plate, a label or any other caption
standing in for the object is not a shipped visual: it says which Decoration is equipped without
showing it. Requirements:

- one distinct drawing per Decoration — no two share a picture
- rendered unsmoothed, like the rest of the scene
- sized against its band, so 360 / 390 / desktop place it on the same part of the room
- it must not cover what the interface reads: the DAY sign, the till, the window, the price
  board, the branch plate
- no Scene redesign, and no new layout: the Decoration attaches to the room that already exists

The Store management view may show the broader owned collection.

Do not attempt to display every owned Decoration simultaneously in the live shop.

## RUN-END SETTLEMENT FEEDBACK

Normal Run-end summary must make the Store Capital result legible:

```text
Gross Sales
× reached-Day conversion rate
-> Store Capital gained
-> current Store Capital
```

Ending Gold / remaining Inventory may still appear elsewhere as Run-result information, but they
must not be presented as Store Capital calculation inputs.

Do not expose internal formula noise beyond what is needed to understand why the Account gained
that amount.

Manual Run Abandon must not imply that Store Capital will be earned.

## FIRST IMPLEMENTATION CONTENT

Initial content is the four Slots `sign` / `wall` / `counter` / `display`.

Their exact effects are owned by `META_v2.8.0.md` §INITIAL FOUR DECORATIONS and are not restated
here. Repeating a number in two Specs is how the two drift.

The UX requirement is that the screen states each Decoration's **current** effect exactly as the
META owner defines it, including a chance-based effect stated as a chance rather than as a
guarantee. A wording that reads as a guaranteed bonus when the owner defines a probability is a
defect even when the number shown is right.

Exact Store Capital prices are owned by `META_v2.8.0.md` and are not duplicated here.

## COMPLEXITY BOUNDARY

Do not add:
- free-placement editor
- Decoration levels/upgrades
- rarity progression for Decorations
- random Decoration shop
- more active passive Slots merely because more Decoration content exists

Future content expands choice inside Slots first.

## RELATED

Store Capital / Decoration truth -> `META_v2.8.0.md`  
Pre-Run / settlement timing -> `CORE_RUN_v2.8.0.md`
