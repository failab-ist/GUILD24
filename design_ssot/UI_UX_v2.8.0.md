# UI_UX

DOC=UI_UX
OWNER=ui,ux,mobile,tutorial,visual,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_CORE_READABILITY

## INHERITANCE

All unchanged v2.7 ORDER/SALE/NIGHT/Final/mobile/typography/tutorial/visual rules inherit
UI_UX_v2.7.0.md.

The Decoration/Store-Capital rules previously frozen in this file remain active.
The old scoped-decoration-only execution meaning is superseded.

## RETIRED ACTIVE UI

Do not expose:
- Franchise Grade
- Franchise Achievement list/progress/toast
- Grade ORDER discount
- Start Contract selection
- Grade-gated Start Contract unlock progress

Historical archive policy -> META_v2.8.0.md.

## STORE MANAGEMENT / DECORATION

Reuse the existing Codex/management space.

Show:
- current Store Capital
- four fixed Slots
- owned/unowned
- purchase cost
- exact current effect
- equipped Decoration

Purchase requires explicit confirmation and spends once.
Loadout is editable only outside an active Run and frozen after Run start.

On a pre-Run/foundation store-management screen, an explicit way back to the new-Run preparation
screen must exist. Mobile system/back navigation must not strand the Player on a blank state.

Live store renders equipped Decorations at fixed store locations.
No free-placement editor / levels / rarity ladder / random Decoration shop is added.

## MOBILE SALE DENSITY

Mobile:
- remove the decorative waiting/next-customer card/fan
- keep queue progress/count in the bottom Dock only
- use recovered space for current-customer state and decision information

Desktop may retain richer simultaneous queue presentation.

Do not remove the actual queue count.

## CURRENT CUSTOMER STATE

Compact SALE state includes:
- Injury state, without 부상 1 style numeric duplication
- Fatigue
- Loyalty

Example:
    부상 · 피로 8 · 단골도 37

Trusted Regular:
- show 단골 when owner threshold is reached
- no large Loyalty progress bar is required

Loyalty meaning opens through the shared anchored popover.

## SHARED SEMANTIC CHANGE LANGUAGE

For a value compared with its baseline:

    unchanged = default
    beneficial = green
    harmful = red

Meaning, not numeric sign, controls color.

Examples:
- operating cost 140 -> 110 = beneficial / green
- Fatigue 8 -> 12 = harmful / red
- Stat 32 -> 40 = beneficial / green
- Death risk 12% -> 8% = beneficial / green

Replace the generic yellow moved treatment for Stats.

Color is not the only cue; changed values that have a provable source also expose an interaction
affordance.

## SHARED ANCHORED POPOVER

Use one lightweight anchored popover language for:
- Stat source
- Fatigue arithmetic
- Loyalty meaning
- deterministic Store Support/Event source
- short help for forecast/readiness/death risk

Behavior:
- no layout-height change
- no background lock
- no confirmation button
- one open at a time
- desktop: hover or keyboard focus; click remains valid
- mobile: tap toggle
- outside tap / Escape closes
- beginning mobile scroll should close where practical
- place above/below according to available viewport room
- normally 2 lines, 3 only where needed

Reuse the existing out-of-flow tip/popover presentation rather than create a second modal system.

## PROBABILITY ATTRIBUTION LIMIT

Do not create a new UI to claim why a random Rare Item/NPC appeared.

Weight/probability effects remain readable in owned support descriptions.

Deterministic source attribution is allowed.

Existing special Event offer presentation, such as an 암시장 special Order row, may name its
Event origin.

## FATIGUE SURFACE

SALE main:
- current Fatigue always compactly readable
- if a penalty is active, harmful semantic emphasis
- committed Supply may show 피로 N -> 출발 N
- show Prepared/Required/excess Supply compactly

Do not show future Outcome-by-Outcome Fatigue table.

NIGHT main:
    귀환 후 피로 N

Detailed resolved arithmetic opens through the shared popover.

## GREAT SUCCESS SIGNAL

No signal change while merely selecting/previewing an Item.

After a successful purchase commits, refresh only the Great Success signal from the committed Bag.
No exact probability.

## NIGHT LAYOUT

Information order:
    Outcome
    -> proven sold-Item impact
    -> Level/Stat changes
    -> Fatigue
    -> EXP/Wallet/other

Living Flavor:
- reuse SALE temporary bubble behavior
- around 3 seconds
- may overlap character art
- never cover Outcome / primary result
- result remains after bubble disappears

Death has no speech bubble.

Outcome type size may be reduced modestly on mobile where needed to prevent collision.

## BOSS INFORMATION PRESENTATION

D5/D15/D25 use the existing Boss report/reveal shell.

D10/D20 use the same shell as a compact one-tap report:
- Boss name
- small identity art
- 1-2 short report lines
- no new decision panel

Document Baseline:
- D10/D20 portrait: 64px
- mobile D5/D15 Boss art max-height: 120px
- mobile D25 Boss art max-height: 96px

At 360x800, core information and acknowledgement control must not be pushed below the first
viewport solely by Boss art.

Information is primary; art is supporting.

## HELP

Per-value/context explanations use anchored popovers, not a modal/accordion that pushes gameplay.

The global 점주 가이드 may remain as reference, but must be shortened to current rules and must
not duplicate detailed internal arithmetic.

Exact help copy -> COPY_WORLD_VOICE_v2.8.0.md.

## EVENT TEMPORARY BUDGET

When Event purchase budget exists, show persistent Wallet and temporary budget separately enough
to explain affordability.

Do not relabel temporary Event budget as permanent 소지금.

## STORE SUPPORT OWNED REFERENCE

When choosing a Store Support, keep the current owned-support reference reachable through the
existing compact detail/modal.

Do not add a new permanent panel solely for this.

## CLOSING

Remove redundant accounting-explanation footer from the primary receipt.
The figures themselves remain.

## STORE GROWTH SURFACE

Store Capital / Decoration management and run-end settlement requirements from the previous v2.8
Decoration package remain active exactly as owned by META_v2.8.0.md and CORE_RUN_v2.8.0.md.


## COPY-SURFACE RE-AUDIT — EXACT

### SALE SELECTED-ITEM INFORMATION

The selected-Item panel uses one primary heading:

    판매 후 변화

Direct Item changes and deterministic derived changes are rows under that heading.
Do not stack analytical subgroup headings that increase height.

Source/cause belongs in the existing anchored source popover.

Intrinsic Item effects that are not part of the current delta remain readable as ordinary
\`상품 효과\`; do not call them \`이 손님에게는 지금 걸리지 않는 효과\`.

Internal marker rows are never displayed.

### SALE PERMANENT EXPLANATION

The forecast/readiness/death explanation is on demand through the shared anchored popover.
Do not keep a permanent explanatory paragraph under the readout.

### DECORATION DECISION SURFACE

Store-management purchase/equip comparison shows:
- name
- exact effect
- price / ownership
- equipped state

Decoration Flavor prose is not shown on this decision surface.

No new Collection screen is added in v2.8 solely to preserve that Flavor.
Existing Flavor data may remain in data/Codex-ready form.

### GLOBAL HELP

The global 점주 가이드 uses the exact compact Copy owner text.
Do not retain the old long-form rules manual in parallel.

### SETTINGS / DEBUG BOUNDARY

Ordinary Player settings are localized and gameplay-facing.

Developer reproducibility Seed controls do not appear on the ordinary pre-Run screen.
Technical runtime footer copy is removed from ordinary settings.

This does not require adding a new Debug menu.
