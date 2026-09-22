# UI_UX

DOC=UI_UX
OWNER=ui,ux,mobile,tutorial,functional_design,visual,audio,presentation_polish,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
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

Normal SALE shows the Loyalty value/state without a separate `?` or Loyalty popover trigger.
Its contextual explanation is taught by the tutorial/coach.
The global compact Help remains a separate reference surface under its current owner.

Equipment text is omitted from this compact SALE header/state region.
Equipment remains available in NPC detail and as proven Stat-source attribution.

## SALE BAG COMPACT LAYOUT — EXACT

The normal customer Bag remains exactly two slots.

On compact/mobile SALE:
- the two slot boxes are always horizontal
- if room is insufficient beside other customer-state elements, the whole Bag block wraps to the next row
- the two slot boxes themselves never stack vertically
- wrapping must not create horizontal overflow

Reference shape:
    가방 0 / 2   □ □

Presentation only; Bag capacity/mechanics do not change.

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

For these major reveal / preparation beats:
- Boss art is the clear centered visual anchor, not a small side thumbnail beside unused space
- Boss identity must register immediately before the Player reads the owned report information
- owned information sits directly below or around the Boss visual in the same report composition
- art scale may be strong, but it must not push required information or acknowledgement into
  avoidable scrolling

D10/D20 use the same shell as a compact one-tap report:
- Boss name
- compact identity art
- 1-2 short report lines
- no new decision panel

DIRECTOR DOCUMENT BASELINE — EXACT:
- D10/D20 portrait: 64px
- mobile D5/D15 Boss art max-height: 240px
- mobile D25 Boss art max-height: 200px
- desktop D5/D15 Boss art max-height: 300px
- desktop D25 Boss art max-height: 260px

USER AMENDMENT, 2026-09-22, superseding the old "art must stay small" reading: the report was
reviewed on a real handset and read too weak. The Boss beat is a takeover with the screen dimmed
behind it, so the sheet may claim most of the viewport and the major-beat art may grow until it
would cause overflow. The constraint below is what bounds the values.

At 360x800, core information and acknowledgement control must not be pushed below the first
viewport solely by Boss art.

The Boss report sheet is a takeover, not a drawer peeking from the bottom: at phone width it
claims most of the viewport rather than hugging its content.

Avoid both failure modes:
- tiny Boss art floating inside a wide / empty report
- oversized art that buries the report information or creates unnecessary scroll

Information truth remains primary; Boss presence is a co-equal presentation requirement at the
major reveal / preparation beats.

## v2.8 PRESENTATION POLISH — EXACT BOUNDARY

This is a focused presentation pass over existing gameplay state.

It may strengthen:
- visual hierarchy / motion / scene dressing
- SFX feedback
- phase BGM / ambience identity
- existing art scale / crop / icon readability

It must not add:
- a gameplay rule, reward, probability or decision
- a new required Save field
- a new Gameplay RNG draw
- a hidden-information leak
- a second result system
- a large cutscene/cinematic framework

Prefer the current Sound / animation / scene systems before adding a new presentation framework.

### FUNCTIONAL DESIGN AUDIT — FULL SURFACE

The v2.8 polish pass is also a functional-design audit of the current game, not only an art/audio
pass.

Audit every current Player surface:
- opening / pre-Run / Store Management
- MORNING
- ORDER
- SALE
- NIGHT
- CLOSING
- Boss-information beats
- Final preparation / FINAL / ending
- tutorial / coach marks
- Help / Settings / Event / Store Support / other modals and overlays

For every surface, judge the complete interaction rather than isolated CSS values.

Required questions:
1. **What is the Player deciding / learning now?**
2. **Is that information visually primary enough to notice without hunting?**
3. **Does the highlighted / enlarged / animated region actually match the fact or action being
   explained?**
4. **Is the next meaningful action visible and spatially associated with the information it uses?**
5. **Is any duplicate, decorative, empty or stale region consuming space needed by the decision?**
6. **Does the same concept use consistent placement, wording and visual language across phases?**
7. **After the action, is the changed state visible without forcing the Player to reconstruct it?**

REMOVE / REUSE / MERGE before adding another box, panel, label or modal.

Functional polish may:
- remove redundant wrappers / duplicated labels / dead spacing
- resize or regroup current content
- change responsive stacking/order
- reduce permanent space reserved for transient content
- merge presentation that teaches the same fact twice
- improve action hierarchy, affordance and state feedback
- tune art/copy container size when the current composition under- or over-emphasizes the owned
  information

It may not change the gameplay rule or hide required decision information merely to make a screen
cleaner.

#### ORNAMENT RESTRAINT

USER AMENDMENT, 2026-09-22. `GAME-LIKE INTERACTION LANGUAGE` is a materiality and affordance
requirement, not permission to add ornament. It is not satisfied by decoration and it is failed by
decoration.

Audit the complete Player-facing UI, not only decision controls.

Do not read it as an instruction to add:
- repeated G24 / 길드24 logo, seal or stamp marks used only to fill space
- repeated bolt, rivet, corner-bracket, badge or frame motifs around content
- a tilt or hand-stamped skew on a control the Player uses to commit a decision
- glossy / brass / fake-metal gradients or stripe patterns standing in for material
- another decorative layer on top of a material that is already visually established

REMOVE before adding.

Material rules, consistent with the existing 2D / pixel-dot contract:
- flatter 2D surfaces and clear solid color planes
- crisp pixel-like edges and hard-offset / pixel-like shadow; never blurred depth
- bevel may be restrained where an existing component already uses it, but must not become a
  glossy or fake-metal treatment
- no gradient or repeating stripe used as texture
- a control the Player commits a decision with is square to the layout, never skewed
- existing art / texture tokens may support material identity; a new decorative mark is not a
  substitute for hierarchy or affordance

Store Support specifically must not use shiny metal / brass-gradient / heavy-bevel treatment as its
game-like identity. Its hierarchy should come from flat 2D material, crisp edge/shadow, clear color
planes and the decision state.

Presence comes from size, weight, contrast, placement and the press, not from added marks.

#### PIXEL / 2D GAME UI LANGUAGE

USER AMENDMENT, 2026-09-22. A standing presentation direction, not a one-surface fix. It applies to
Store Support and its selection UI first, and to every later Presentation Polish surface as that
surface is adopted. It is applied where it earns its place - a blanket restyle of every control is
itself a FAIL.

Current defect: selection UI still reads as a generic state card with a SaaS CTA on it. Selection
state is expressed by filling a whole plane with generic green, and material presence is reached for
with gloss or bevel.

Principle:

    a selection / commit control reads as a 2D pixel game's own selection control,
    not as a web submit button

1. VISUAL LANGUAGE
- flatter 2D surfaces
- crisp edges
- pixel-like border / shadow / inset
- clear separation between colour planes
- accent colour in small units
- state is carried by edge / strip / label / plane difference, not by flooding the whole surface

2. AVOID
- glossy gradient
- fake metal
- exaggerated bevel / emboss of the AI-generated-UI kind
- a large rectangular SaaS-style CTA
- expressing SELECTED by painting the whole surface generic green
- repeated decorative G24 seal / stamp marks

3. REFERENCE INTERPRETATION
A pixel-UI reference is a reference to the grammar, not to its palette. Do not copy pop tones or an
arcade-toy register. The result is more game-like and more pixel-2D, in GUILD24's own restrained
colour and material.

4. STATE HIERARCHY, selection UI
- SELECTED: the base slate / charcoal surface, carrying a small green accent, a state label and an
  emphasised edge. The card does not become a green plane.
- AVAILABLE: the most legible neutral / slate surface with an amber-family action. That this is the
  choice currently open must read immediately.
- UNAVAILABLE: darker and flatter, visibly receded, with its text still fully legible. Whole-element
  opacity fade is forbidden.

5. PRIMARY DECISION CONTROL
The selection control reads as a pixel-2D game's selection / confirm control rather than a web
submit button, without candy colour, without converting Utility Controls into game controls, and
without costing information hierarchy or legibility.

Target: a restrained pixel-2D game selection UI, not a pop mobile-game UI.

This is a presentation contract. It changes no gameplay rule, balance, Save field, Gameplay RNG or
decision structure, and it exposes no hidden information.

Acceptance: UI_UX_QA_v2.8.0.md UI-Q-v28-31.

#### TUTORIAL / COACH TARGET TRUTH

Every tutorial/coach step must be checked as a pair:

    spoken tutorial fact
    <-> exact visible UI region highlighted by that step

PASS only when:
- the highlighted region is the smallest useful region that actually contains the explained fact
  or action
- the copy does not describe information outside that highlight unless the relationship itself is
  what the step is teaching
- a step about one control does not spotlight an entire unrelated card/column
- a step about a relationship may highlight the smallest shared region that makes that
  relationship legible, or split into sequential steps
- the target selected at runtime is the visible target for the current responsive layout, not a
  hidden desktop/mobile duplicate
- scroll-to-target leaves the highlighted subject and the tutorial copy readable together
- the coach bubble / mask does not cover the target, the next control or essential comparison data
- spotlight bounds include the whole meaningful target and do not clip the exact content being
  described
- optional/contextual targets are skipped without blocking later tutorial steps
- the tutorial teaches how to read a decision and never points to a system-authored answer

If the copy is correct but the target is wrong, fix the target/layout.
If the target is correct but the copy describes more/less than it, fix the copy through the current
Copy owner.
Do not enlarge the spotlight merely to hide a target/copy mismatch.

#### INFORMATION / ACTION FIT

A screen must allocate space according to decision importance, not component age.

At primary mobile widths (360 / 390 / 412 class) and representative desktop widths:
- no horizontal overflow
- fixed docks/headers do not cover current information or actions
- the primary decision and its immediate input information should be reachable without unnecessary
  scroll
- long content may scroll, but the scroll order follows information -> comparison -> action
- transient speech/toasts/coach marks do not reserve permanent empty height
- desktop grid/flex tracks do not create artificial dead gaps because a neighboring column is taller
- a short message must not be presented in an oversized empty modal solely because the shell is
  shared
- a dense message must not be shrunk into unreadable type merely to avoid scrolling
- repeated headings, duplicated counts and decorative blocks are removed before required
  information is compressed

#### BOSS / MILESTONE FUNCTIONAL HIERARCHY

Boss-information presentation is audited by function, not only by the existing pixel caps.

The information cadence remains owned by BOSS_v2.8.0.md.

Presentation intent:
- D0: objective / investigation start is unmistakable but compact
- D5: identity reveal has clear visual presence
- D10: combat-question beat is compact but reads as a meaningful new investigation
- D15: exact Trait reveal is visually stronger than a routine notice
- D20: route/environment question is compact but clearly new
- D25: Final Family/Hazard disclosure is a major preparation beat and must be easy to read before
  same-Day decisions
- D30: FINAL entry may be dramatic but adds no new information

Existing D10/D20 64px and D5/D15/D25 mobile art baselines remain the current starting values for
implementation review, not a reason to accept a functionally weak composition.

During the polish audit, FAIL if:
- Boss identity/art is too small or visually weak to establish the intended beat
- art/title/decorative frame consumes enough height to push the owned information or acknowledgement
  into unnecessary scrolling
- a compact D10/D20 beat uses a large empty reveal shell with little actual content
- D25 information is technically present but visually buried
- D30 repeats the full information payload instead of using known information for Final-entry
  emphasis
- any Boss modal overflows horizontally or produces avoidable empty/dead space on mobile/desktop

If runtime evidence shows an existing exact presentation measurement itself causes one of these
failures, treat that as a v2.8 Functional Design finding and patch the UI_UX owner before Source
implementation. Do not let WORK silently redefine the measurement.

#### CONTROL / FEEDBACK HYGIENE

Across current screens:
- primary / secondary / destructive actions must read with the correct relative emphasis
- disabled / selected / completed state must be distinguishable without relying only on color
- tap/click targets remain comfortably usable at phone width
- focus order follows visual/action order
- modal open/close returns focus to a meaningful origin
- actions that redraw the surface preserve useful scroll/focus context where the decision continues
- success/refusal/error feedback appears near the action it explains and does not masquerade as a
  new mechanic

### STORE-GROWTH VISUAL TRACES

The live store may show small deterministic traces of state the Player already owns or has already
been shown.

Eligible sources include:
- equipped Decorations
- owned Store Supports / existing store facilities
- already-established Trusted Regular presence
- D25 Final-preparation state after its reveal

Allowed presentation:
- small props / fixture changes
- pinned Guild notices
- regular-customer traces
- Final-preparation signage
- subtle shelf / counter dressing

Rules:
- every visible trace must map to real current state
- a trace grants no mechanic and is not a control
- no whole-background replacement is required
- no combinatorial skin/theme system
- no unrevealed Boss / Hazard / NPC information may be inferred from the trace
- when several traces compete for space, deterministic presentation may show a readable subset;
  gameplay ownership is never reduced

### PHASE VISUAL LANGUAGE / PRIMARY ACTION ACCENT

The current game must not use the same generic green treatment as the default answer for every
primary action.

Green has an existing semantic job:
- beneficial state / delta
- current store-sign material where it is part of the environment

A button must not become green merely because it is the primary action.

Keep one GUILD24 visual language and reuse the current material / token vocabulary. Do not create a
new theme or skin framework.

Phase presentation uses restrained existing accents:

- MORNING: warm store / wood / gold emphasis; environmental sign-green may remain as scenery, not as
  the universal CTA language
- ORDER: paper / steel with the existing cool frost-blue family for action emphasis
- SALE: register / commerce gold-amber family; price-mode colors keep their existing distinct meaning
- NIGHT: dark room with the existing dusk family for continuation / phase emphasis
- CLOSING: receipt / paper / ink first, with restrained gold-neutral emphasis rather than generic
  green
- FINAL: existing blood / ember-red gate language remains authoritative

Phase identity is an accent and hierarchy difference, not a complete reskin. Typography, component
construction, spacing language and interaction semantics remain shared.

Overlays:
- a phase-bound overlay may inherit the surrounding phase accent where that strengthens context
- global Help / Settings / management surfaces remain neutral
- Store Support acquisition/choice uses the existing slate/steel/gold family rather than the
  universal green CTA treatment

Primary / secondary / destructive states remain distinguishable by structure and contrast, not color
alone.

Semantic beneficial/harmful green/red remains authoritative and must not be weakened by phase color.

### GAME-LIKE INTERACTION LANGUAGE

USER APPROVED, 2026-09-22. Phase accent alone does not close the Presentation Polish.

Current defect: parts of the game read as a web app rather than as the shop it is -
information inside a plain rectangular card, an ordinary rectangular CTA along the bottom, and
a generic 확인 / 구매 / 진행 button.

Principle:

    a Primary Decision Control must read as the Phase's own action,
    not as a generic web CTA.

Reuse the current components / CSS / art / tokens. Do not build a new UI framework or a theme
or skin system.

The solution is not color-only and not ornament. Use the smallest phase-native combination of
surface, silhouette/placement, state and press feedback that makes the action legible inside the
existing 2D / pixel game language.

Phase direction:
- ORDER: the order form / paper-steel surface and a firm commit press; no decorative stamp icon is
  required
- SALE: register / price-tag / receipt language and the feel of a transaction
- Store Support: contract / support-certificate structure expressed with flat 2D material and clear
  selection/commit state; no added seal/logo is required
- Boss Report: not a set of cards inside an ordinary modal - the guild investigation report or the
  record itself is the screen
- NIGHT: the return record, the result tag, the trace a report leaves
- FINAL: not an ordinary CTA - the physical feel of the final commitment / gate opening without
  turning the control into an ornamental prop

Not every button becomes an object. These Utility Controls may stay plain UI:
- close
- back
- settings
- help
- ordinary navigation

Priority for the object treatment:
- the Primary Action by which the Player commits a choice
- an important Reveal acknowledgement
- an action that is a turning point of the Run

Boss / FINAL specifically:
- avoid the `image + information card + green confirm button` shape
- reduce nested SaaS-style panel / card hierarchy
- fold the existing information into the report / record / gate UI itself rather than placing
  it in a panel on top of one
- the Primary Action may gain presence, but never more presence than the information it acts on

This is a presentation contract. It changes no gameplay rule, balance, Save field, Gameplay RNG
or decision structure, and it exposes no hidden information.

Acceptance: UI_UX_QA_v2.8.0.md UI-Q-v28-31.

#### TRANSIENT SALE SPEECH OVERLAP

SALE dialogue remains a transient overlay:
- around 3 seconds
- tap-dismissible
- reserves no permanent layout height
- never covers the primary SALE action

At phone width it may briefly overlap the compact customer-state strip when avoiding that overlap
would require permanent empty height or compression of required decision information.

For that case:
- the speech text itself remains fully opaque
- the speech-bubble background uses approximately 88% opacity
- do not lower opacity on the whole speech element
- the underlying state must remain visually recognizable enough that the overlap does not read as a
  permanent loss of information

This is a presentation compromise for transient dialogue, not permission for persistent overlays to
cover required information.

### DECISION / PHASE AUDIO

The current audio architecture is reused.

Material decisions should not all sound like the same generic UI click.

Distinct feedback classes are required for:
- ORDER confirmation
- successful SALE
- SALE refusal
- Store Support acquisition

Phase identity may be strengthened for:
- MORNING
- ORDER
- SALE
- NIGHT
- FINAL

This may use current BGM/ambience transition, layering or targeted cues.
A unique new full track per phase is not required.

Muted state and existing BGM/SFX settings remain authoritative.

### NIGHT RESULT PRESENTATION

Existing NIGHT outcome truth drives presentation.

Presentation must make materially different results feel different, including at minimum:
- ordinary return / success
- Great Success
- retreat
- injury
- severe injury
- Death

Rescue / avoided-death evidence may receive a distinct recovery/life-saving accent where already
proven by the result state.

Visual/audio emphasis never changes Outcome, rewards, proof or dialogue priority.

### BOSS / FINAL PRESENTATION PAYOFF

Existing Boss-information beats may receive stronger visual/audio acknowledgement.

D0 / D5 / D10 / D15 / D20 / D25 may each use presentation appropriate to the information already
owned by that beat.

D25 may strengthen Final-preparation presentation after the exact Final state is revealed.

D30 may strengthen FINAL-entry tension using only information already revealed by D25.
D30 still adds no new Boss-information beat.

Presentation must not push the owned information/acknowledgement control out of the usable mobile
viewport.

### TARGETED GRAPHIC POLISH

Existing Item / NPC / Boss / UI art may be corrected where silhouette, crop, scale or icon identity
makes two different current objects read as the same thing or weakens the current decision.

This is polish of current content, not permission for a large new Item wave, portrait wave,
environment set or theme system.

## FUNCTION / FLAVOR VISUAL HIERARCHY — EXACT

On Player decision surfaces, Function must read before Flavor.

Function / Effect:
- 14–15px class
- weight 600
- normal/high contrast
- numeric conditions and exact rule effects belong here

Secondary factual:
- 13px class
- weight 400
- dimmer than Function

Flavor on a decision surface:
- 12–13px class
- weight 400
- lower contrast than Function
- 1–2 lines recommended
- no numeric condition/rule payload

Event Reveal:
- Flavor: 13px / 400 / dim
- Effect: 15px / 600 / primary

Morning Event slip:
- Flavor: 12px class
- Effect: 13px / 600

Codex/Lore Flavor may remain 13px / 400 / dim and may use italic presentation.

NPC Dialogue:
- 14–15px class
- normal speech-bubble treatment

Death Narration:
- 13–14px class
- dim/report treatment
- no quotation marks or speech bubble

Boss D5 is an exception:
its Boss-specific Flavor is primary reveal content and must not be mechanically demoted by the
ordinary decision-surface Flavor rule.

## QA / DEBUG REPRODUCTION ACCESS — EXACT

Ordinary Player UI does not expose reproducibility Seed input or a visible Debug menu.

Removing those Player-facing controls must not remove deterministic QA access.

Supported manual QA path:

1. Start from a controlled Account state:
   - Full Data Reset, or
   - import the exact Save fixture required by the test.
2. Open browser Developer Tools -> Console.
3. Start a deterministic Run with:
   `Guild24.game.start('<seed>'); Guild24.render();`
4. During an active Run, inspect the persisted gameplay state through either:
   - `Guild24.showDebug()`, or
   - keyboard shortcut `Ctrl+Shift+D`.
5. The Debug surface exposes the existing debug payload including:
   - seed
   - RNG state / last RNG
   - ORDER offers
   - current NPC
   - current Dungeons
   - resolved Results with debug evidence
   - Boss debug state

The Console / Debug path is development and QA access only.
It must never be promoted into ordinary Player navigation merely to preserve reproducibility.

When a Player-facing QA/debug control is removed, QA must verify both:
- the control/copy is absent from the ordinary Player surface
- the equivalent deterministic QA capability remains reachable through the development path above

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

Conditional intrinsic Item functions that do not appear as an immediate numeric delta remain readable under
\`특수 효과\`; do not call them \`이 손님에게는 지금 걸리지 않는 효과\`.

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
