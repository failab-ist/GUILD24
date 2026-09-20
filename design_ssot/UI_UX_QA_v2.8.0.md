# UI_UX QA

DOC=UI_UX_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=UI_UX_QA_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_CORE_READABILITY_QA

## INHERITANCE

All unchanged v2.7 UI/UX QA remains active.
Retired Franchise / Start Contract expectations are historical only.

## UI-Q-v28-1 — STORE MANAGEMENT

PASS:
- Store Capital visible
- four fixed Slots visible
- owned/unowned/equipped distinguishable
- purchase confirmation spends exactly once
- loadout read-only during active Run

## UI-Q-v28-2 — PRE-RUN RETURN PATH

From the pre-Run/foundation Decoration management screen:

PASS:
- explicit Back/Return reaches new-Run preparation
- repeated management -> return cycles do not produce blank UI
- no Seed/Decoration reroll caused merely by returning
- mobile browser/system back does not strand the Player in an empty stage

Run on a real mobile browser or equivalent mobile runtime, not Source inspection only.

## UI-Q-v28-3 — MOBILE SALE QUEUE

At mobile width:
- decorative waiting-line/fan/next-customer card is absent
- bottom Dock retains one queue progress/count
- desktop may still show richer queue presentation
- no duplicate queue count consumes vertical space

## UI-Q-v28-4 — CURRENT CUSTOMER STATE

Mobile SALE exposes compact:
- Injury without duplicate numeric 부상 1
- Fatigue
- Loyalty

Trusted Regular state appears at 51.

## UI-Q-v28-5 — SEMANTIC DELTA

For changed Stats/Fatigue/economy values:
- benefit = green
- harm = red
- unchanged = default
- generic yellow moved-only treatment is not used as meaning

Color is not the only source cue.

## UI-Q-v28-6 — SHARED POPOVER

Desktop:
- hover/focus works
- click remains usable

Mobile:
- tap toggles

All:
- no layout-height jump
- one open at a time
- outside/Escape closes
- no gameplay pause/background lock
- viewport placement remains readable

## UI-Q-v28-7 — GREAT SUCCESS SIGNAL

During one customer visit:
- focusing an Item does not change signal
- successful committed purchase recomputes signal
- signal may appear or disappear
- Combat/Hazard/Death readouts remain frozen
- exact probability is not exposed

## UI-Q-v28-8 — FATIGUE

SALE:
- no hypothetical Outcome fatigue matrix
- current/departure Fatigue and compact Supply arithmetic readable

NIGHT:
- main label is 귀환 후 피로
- detailed path available on demand
- old 보급 회복 / 보급 완화 / 밤 피로 primary labels absent

## UI-Q-v28-9 — NIGHT REACTION

Living result:
- temporary character speech bubble appears
- auto-dismisses around 3 seconds
- tap dismiss works
- result information remains
- does not cover Outcome

Death:
- no living speech bubble

## UI-Q-v28-10 — BOSS MOBILE DENSITY

At 360x800:
- D5/D15 art max-height baseline 120px
- D25 art max-height baseline 96px
- D10/D20 compact identity portrait baseline 64px
- core information and acknowledgement are not pushed off first viewport solely by art

## UI-Q-v28-11 — LOYALTY HELP

Tap/focus Loyalty:
- explains purchase intent + revisit
- says 51 = 단골
- shows only current applicable Store Support conditions
- LUST appears only after reveal

## UI-Q-v28-12 — EVENT TEMP BUDGET

On 길드 급여일:
- persistent Wallet and temporary purchase budget are distinguishable
- affordability uses both
- UI does not imply temporary budget persists

## UI-Q-v28-13 — CLOSING FOOTER

The redundant internal-accounting footnote is absent from the primary receipt.

## UI-Q-v28-14 — DECORATION ART / SETTLEMENT

All previous v2.8 Decoration-art, Store Capital settlement and retired-Franchise checks remain
active as defined by META_v2.8.0.md and CORE_RUN_v2.8.0.md.
