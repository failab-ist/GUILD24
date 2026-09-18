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

Only the equipped Decoration in each Slot needs to appear in the active store scene.

The Store management view may show the broader owned collection.

Do not attempt to display every owned Decoration simultaneously in the live shop.

## RUN-END SETTLEMENT FEEDBACK

Normal Run-end summary must make the Store Capital result legible:

```text
Ending Gold
+ remaining stock settlement value
-> Settlement Value
× reached-Day conversion
-> Store Capital gained
-> current Store Capital
```

Exact conversion-rate copy is filled only after the balance values are approved.

Manual Run Abandon must not imply that Store Capital will be earned.

## FIRST IMPLEMENTATION CONTENT

Initial content:

- sign / 새벽배송 안내판 / ORDER candidates +1
- wall / 길드 제휴 현판 / visitors +1
- counter / 알뜰 금고 / starting Gold +250G
- display / 프리미엄 쇼케이스 / existing premium rare-NPC weighting

Exact Store Capital prices are pending integrated balance approval.

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
