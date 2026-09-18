# UI_UX QA

DOC=UI_UX_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=UI_UX_QA_v2.7.0.md
PATCH_TYPE=META_SIMPLIFICATION_QA

## INHERITANCE

All unchanged v2.7 UI/UX QA remains active.

The v2.7 Franchise progress / Grade / Start Contract QA is historical for v2.8 and must not force those retired systems back into active UI.

## UI-Q-v28-1 — STORE MANAGEMENT

PASS:
- current Store Capital is visible
- four fixed Slots are visible
- owned/unowned and active state are distinguishable
- effect text is readable
- an unowned Decoration cannot be equipped
- one Slot cannot activate two Decorations

Initial content having only one Decoration per Slot does not permit hard-coding the UI to one permanent boolean per Slot.

## UI-Q-v28-2 — PRE-RUN LOADOUT

PASS:
- player can understand the planned active Decoration in each Slot before starting
- active loadout becomes read-only after Run start
- no Start Contract selector remains in the active flow

## UI-Q-v28-3 — LIVE STORE VISUAL

PASS:
- equipped Decorations appear at their fixed store location
- inactive alternatives do not visually stack into the same Slot
- adding owned alternatives later does not require more live passive Slots

## UI-Q-v28-4 — SETTLEMENT

After numeric rates are approved:
- normal Run end shows settlement inputs, conversion, gained Store Capital, and new balance
- manual Run Abandon shows no Store Capital reward
- mobile layout remains readable without horizontal scroll

## UI-Q-v28-5 — RETIRED FRANCHISE

FAIL if active v2.8 UI still exposes:
- Franchise Grade
- Franchise Achievement progress/toast
- Grade ORDER discount
- Grade-gated Start Contract progress
