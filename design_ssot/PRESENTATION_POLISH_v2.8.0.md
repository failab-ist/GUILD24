# PRESENTATION_POLISH

DOC=PRESENTATION_POLISH
OWNER=presentation_later_phase_detail,audio_presentation,functional_presentation
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
PATCH_TYPE=PRESENTATION_DETAILED_LATER_PHASES

## ROUTING

Global construction / asset / ornament / visual-review system:
- PRESENTATION_SYSTEM_v2.8.0.md

Active Batch 1 owner:
- PRESENTATION_POLISH_BATCH1_v2.8.0.md

This file retains detailed v2.8 Presentation contracts for later phases, audio and cross-surface rules.
Batch 1 WORK must not full-read it unless a concrete owner conflict routes here.

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

`GAME-LIKE INTERACTION LANGUAGE` is a materiality and affordance requirement, not permission to add
ornament. It is not satisfied by decoration and it is failed by decoration.

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

The MORNING shutter pull's repeating-stripe gradient
is the same "stripe pattern is not material" defect already corrected on the FINAL gate bar, and
it is removed: the control keeps its structure, size, action and hard press/depth on a flat solid
plane, with no border, bevel, stripe or ornament added in exchange.

Two gradients are FUNCTIONAL layers and are explicitly kept: the register readout's lit-display
glow, and the SALE sticky scrim that keeps content readable under a sticky control. Do not treat
either as the ornament ban's glossy gradient, and do not strip gradient strings mechanically.

#### PIXEL / 2D GAME UI LANGUAGE — DARK PIXEL + CONTROLLED POP

This is the standing Player-facing presentation grammar for the v2.8 Polish pass. Store Support is the first explicit application, but the rule is global: each later
surface touched by Presentation Polish is judged against it.

The target is:

    DARK PIXEL + CONTROLLED POP

The world / store / document layer stays dark, grounded and restrained.
The interaction layer is allowed to become clearer, brighter and more saturated where the Player
must act, confirm, notice a state change or read a major reveal.

"Controlled Pop" does NOT mean turning the whole game into a candy-colour arcade UI.
It means contrast and saturation are spent deliberately on the few things that need immediate
attention.

No exact hex palette, phase hue table or saturation value is Canonical in this section.
Colour is judged relationally at runtime. Literal palette values may be tuned without a Canonical
amendment when the grammar, semantic roles and QA below remain intact.

1. DARK BASE
- background / environmental surfaces stay visually quieter than the decision placed on them
- information panels do not compete with the Primary Action merely by being equally bright
- dark does not mean muddy: neighbouring planes still separate cleanly
- a uniformly desaturated grey / brown / military-dashboard look is a FAIL when it weakens the
  game feel or action hierarchy

2. CONTROLLED POP
Use stronger colour contrast primarily for:
- the currently AVAILABLE / actionable choice
- the Primary Decision Control
- a newly changed state the Player must notice
- important reveal / result emphasis

Keep the rest quieter.
One screen should normally have only the accent energy it needs; do not make every label, border and
card equally loud.

3. PIXEL / 2D CONSTRUCTION
Prefer:
- flat colour planes
- crisp hard edges
- stepped light / dark separation
- hard-offset, pixel-like depth for controls that are actually pressable
- a clear press state produced by collapsing that depth
- compact, deliberate silhouettes rather than browser-default button shapes

Avoid:
- blurred shadow
- soft glow
- glossy gradient
- fake metal
- exaggerated bevel / emboss
- ornamental texture standing in for hierarchy
- repeated decorative G24 seal / stamp / bolt / badge motifs
- the common web-dashboard selected pattern of a coloured left vertical bar / status stripe

4. ACTION HIERARCHY
A Primary Decision Control must look more actionable than the surface around it.

Do not solve this with colour alone. Use a combination of:
- placement
- silhouette / footprint
- contrast
- hard depth
- press feedback
- state-specific treatment

A large full-width rectangle is not automatically wrong, but using the same large rectangular CTA
everywhere without a Phase-native reason is a FAIL.

Utility Controls may stay plain:
- close
- back
- settings
- help
- ordinary navigation

5. STATE GRAMMAR
AVAILABLE
- is the strongest pressable plane in its local decision set
- receives the clearest controlled-pop accent
- carries real press depth / feedback

SELECTED / OWNED
- stays in the same base material family rather than becoming a generic success-colour filled card
- must be distinguishable by more than one channel, such as frame / title emphasis / state control
- its state control may keep the AVAILABLE control's footprint when the card height stays the same,
  but it loses press depth and hover / active affordance
- do not shrink it into a web-style status chip merely because the choice is complete

UNAVAILABLE
- recedes through surface / contrast / depth rather than whole-element opacity
- keeps required information fully legible
- its action plane must not look pressable

6. REFERENCE INTERPRETATION
Pixel-game references are references to:
- contrast discipline
- hard outlines / hard depth
- clear colour blocks
- instant state recognition
- compact game-control silhouettes

They are NOT instructions to copy:
- a primary-RGB palette
- candy colours everywhere
- arcade-toy decoration
- stars / hearts / bombs / generic game icons

The final result must still sound and look like GUILD24: a dark convenience-store / guild world
whose decisions are unusually clear and tactile.

This is a presentation contract only. It changes no gameplay rule, balance, Save field, Gameplay RNG
or hidden-information boundary.

Acceptance: UI_UX_QA_v2.8.0.md UI-Q-v28-31.

#### EDGE / BORDER DISCIPLINE

A crisp pixel edge does NOT mean every button receives a visible outline.

Default:
- if a flat plane plus hard offset depth already separates a pressable control from its surface, do
  not add another border
- use an explicit outline only when it carries real information: selected state, insufficient
  contrast against the surrounding surface, focus/accessibility, or a component whose object
  identity genuinely depends on a frame
- do not solve "game-like" by drawing the same 1–2px inset rectangle around every key / button
- peer controls in one cluster should share construction, but that construction may be borderless

FAIL:
- blanket outlines added to every button because "pixel UI needs borders"
- a semantic accent colour moved onto a border merely to decorate the control
- multiple edge systems stacked at once: border + inset frame + bevel + hard drop

The preferred order is:
    flat plane
    -> hard depth / press
    -> explicit border only if still needed

#### PER-PHASE APPLICATION RULES

These clauses make DARK PIXEL + CONTROLLED POP concrete without fixing literal colours.

ORDER
- must read as manipulating an order form, not a web-shop list
- `- / quantity / + / 1 / 3 / MAX` is one control cluster; the numeric readout is the one
  recessed/read-only part
- quantity keys may use flat planes plus hard depth; they do not require a border on every key
- The cluster reviewed as too heavy. Its hierarchy
  is: item information > quantity readout / stepper > `1 / 3 / MAX`.
  `1 / 3 / MAX` returns to the light v2.7-class quick set: a secondary shortcut with no box of
  its own, no pixel key plane and no hard shadow, and always weaker than `- / quantity / +`.
  It carries the v2.7 subtle dotted
  underline: available = dotted underline, hover / focus = the underline and ink sharpen,
  disabled = dim ink and non-interactive. No whole-element opacity fade. Its functional
  behaviour is the current v2.7-equivalent Source and does not change: `-` disabled at q=0,
  `+` at q>=max, `1 / 3` when that value exceeds max, `MAX` a q=max shortcut, and the
  stock / funds / supply conditions behind maxQuantity are untouched.
  `- / +` keep a smaller visible face than a full square game button; the touch target stays at
  the mobile minimum. The readout stays the centred, read-only recessed part.
  Being a pixel UI is not a reason to put a box around every control.
- order commit is the strongest physical action on the form and must read as a deliberate commit
- do not add decorative stamps, seals or extra marks to create the feeling of approval

SALE
- the customer remains the visual anchor; the transaction controls are the interaction anchor
- 50 / 100 / 150 price choices are peer controls in one register-key cluster
- no price key outranks another merely through a lighter fill or stronger frame
- the mode's semantic distinction may live in its label/text or another owned signal; do not add
  outlines to every key just to carry mode colour
- refused / unavailable price keys lose depth and stay fully readable
- `send customer` is Secondary to the price decision and must not carry the screen's strongest pop

NIGHT
- the Outcome is the record's primary reading, not a generic result card title; per the
  §NIGHT LAYOUT rule earns that by placement and weight inside the
  character identity block, never as a full-width headline row over the screen
- success / great success / retreat / injury / severe injury / death must not feel like identical
  cards with one word swapped
- differentiate through result emphasis, contrast, tag/silhouette and transition using the current
  result system; do not add a new cinematic framework
- the sold-Item effect is a sub line of the Outcome summary, never a second result card
- the aftermath region follows §NIGHT LAYOUT RESULT DATA TYPOGRAPHY
- CLOSING HANDOVER CONTROL / NIGHT PRIMARY COLOUR.
  The control that ends the NIGHT record is the screen's ACTIVE Primary Action and must read
  immediately above `전체 건너뛰기`.

  Presentation:
  - MOONLIT COLD BLUE / MUTED COBALT active plane
  - clearly brighter and more saturated than the NIGHT dock/background
  - hue reads unmistakably BLUE; not cyan/teal, not neon
  - ivory / near-white label
  - exactly one bottom/right hard depth
  - press moves the control and collapses that depth
  - no border, inset outline, bevel or gloss
  - no literal hex is Canonical

  FAIL:
  - grey disabled-like plane
  - amber / gold / mustard / brown
  - purple / lavender
  - green

  `전체 건너뛰기` stays the current Secondary bare treatment.

CLOSING
- reads as receipt / end-of-day record, not a KPI dashboard
- keep settlement figures integrated into the receipt/tape language
- do not split figures into a grid of independent metric cards
- only the next meaningful action receives Controlled Pop

BOSS REPORT
- information order is: report identity -> Boss visual -> newly revealed information ->
  acknowledgement
- D5 / D15 / D25 Boss art is a central visual anchor with meaningful presence; do not shrink it
  into a small figure floating in dead space
- D10 / D20 remain compact information beats
- acknowledgement must not become a generic web Confirm CTA and must never outrank the Boss/reveal
- reduce nested card-inside-modal composition before adding any decoration

FINAL
- reads as one final decision surface combining Gate / Boss / team / sortie state, not as a page
  ending in a coloured button
- DISABLED COMMIT CAUSE. The fixed dock states why the sortie cannot
  start, on the control itself: available reads `마왕성으로 출발`, unavailable reads
  `원정대 {current} / {required}`. No separate explanation box is added, and the muster's own
  count stays where it is. This repetition is the disabled Action's immediate cause feedback, not
  a decorative duplicate, and it is the named exception to §INFORMATION / ACTION FIT's
  duplicated-count rule.
- the final commit may carry the heaviest press treatment in the run, but not a giant ornamental
  prop
- use contrast, placement and hard depth; do not add a new interaction or cinematic system

#### STORE SUPPORT — FINAL VISUAL SPEC

Store Support is an application of DARK PIXEL + CONTROLLED POP, not a separate palette system.

No literal colour value is Canonical for this screen.
The exact hue / saturation / brightness may be tuned in implementation as long as the following
state grammar and runtime acceptance remain true.

GREEN BAN — STORE SUPPORT UI STATE.
Do not use green as the Store Support selection / ownership / action / success accent. In
particular, no selected green card, green state border, green left strip, green action button or
generic success-green highlight. This is screen-specific and does not retire semantic benefit green
from the rest of the game.

ORNAMENT BAN.
Do not add:
- a card-left vertical accent bar / status stripe
- G24 / Guild decorative seal or stamp
- decorative bolt / screw / badge
- frame inside frame
- glossy gradient / metal shine
- soft glow / blurred shadow
- heavy bevel used as the screen's game-like identity

STATE HIERARCHY.

AVAILABLE
- uses the clearest / most legible card state
- the Action is the strongest controlled-pop plane on the screen
- the Action has hard pixel-like depth and real press feedback
- it must look immediately actionable without needing a green success convention
- label: `구매`

SELECTED / OWNED
- stays in the same base surface family as AVAILABLE; do not flood the card with a separate
  success colour
- distinguish it through multiple channels: selected frame / stronger title / completed state
  control
- the completed state control keeps the AVAILABLE control's footprint when the card itself keeps
  the same height
- the completed state control has no press depth and no hover / active affordance
- label: `보유 중`

UNAVAILABLE
- is visibly quieter / darker / flatter than AVAILABLE
- required text remains fully legible
- whole-card and whole-button opacity fade are forbidden
- the dead action plane has no press depth and cannot read as an available button
- exact disabled cause is named by the current Copy owner rather than remaining `구매`

TOP STATUS.
`확보 완료 · {점포지원명}` may remain as a plain notification. Do not turn it into another
success-colour panel, badge or decorative seal.

CARD CONTENT.
Keep only the Store Support name, exact Function, price and Action / State unless another owned rule
requires more. Function is the comparison the choice is made on and must remain easy to read.

The screen should feel more game-like because the action and states are clear and tactile, not
because another ornament was added.

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

The current game must not use one generic success/primary colour treatment as the default answer for
every main action.

Phase identity is not a fixed hue chart. Exact accent colours are NOT Canonical here.

A Phase reads differently through the smallest useful combination of:
- material / surface language
- information hierarchy and contrast
- placement and silhouette of the Primary Decision Control
- press / release feedback
- a local accent where it strengthens recognition

The phase accent is supporting identity, not the identity by itself. Do not solve MORNING / ORDER /
SALE / NIGHT / CLOSING / FINAL by recolouring the same web-style button six times.

Keep one GUILD24 visual language. Typography, spacing, interaction semantics and the global
DARK PIXEL + CONTROLLED POP grammar remain shared. Do not create a theme / skin framework.

Exact hue, saturation and brightness may be tuned during Presentation Polish without a new Design
decision when all of the following stay true:
- the Phase remains immediately distinguishable by more than colour alone
- semantic benefit / harm colours keep their owned meaning
- the Primary / secondary / destructive hierarchy remains readable without colour alone
- the colour does not become a generic universal success/selected treatment
- runtime contrast and accessibility remain acceptable

Overlays:
- a Phase-bound overlay may inherit its surrounding material / accent language where useful
- global Help / Settings / management surfaces may stay visually neutral
- Store Support follows its dedicated application rule below

Semantic colour is authoritative over decorative phase colour.

### GAME-LIKE INTERACTION LANGUAGE

Phase accent alone does not close the Presentation Polish.

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

The current audio ARCHITECTURE is reused where it already solves playback, routing, settings and
phase ownership. This does NOT require reuse of the current audio assets. Existing synthesized
cues / loops may be replaced when they are weaker than the target presentation.

New audio may come from:
- newly authored / synthesized / edited sound
- layered or transformed current sound
- external free assets whose license permits the shipped use

External assets must have their source / author / license / modification status recorded outside
Canonical. Third-party files may be vendored locally in the repository and remain fully compatible
with offline runtime; runtime hotlinking to a network source is forbidden. Do not use an asset with
unclear rights or a license that forbids the intended shipped use.

#### AUDIO VOICE

GUILD24 audio is:

    late-night convenience-store tactility
    + restrained guild / fantasy signals

Prefer:
- short, dry, readable transients
- mechanical / paper / register / fixture material
- modest retro / 2D-game character
- restrained tonal fantasy accents

Avoid:
- one generic synth beep for every action
- sci-fi UI beeps
- corporate-app clicks
- chiptune / arcade effects everywhere
- mobile-RPG fanfare
- cinematic whoosh / boom as the default
- long reverb tails
- overly cute / pop cartoon SFX

#### AUDIO HIERARCHY

Three presentation layers:
1. Ambience / BGM — phase / space identity
2. Decision SFX — meaningful commit / result
3. Utility SFX — navigation / light manipulation

Decision SFX outrank Utility SFX.
BGM / ambience must sit below information and decision cues.

Utility controls such as menu / help / settings / tabs / coach navigation use a quiet, short,
low-importance family.

#### MATERIAL DECISION CUES

ORDER
- quantity changes use a tiny repeat-safe tactile tick
- quick-set shortcuts do not outrank the main stepper
- order confirmation sounds like committing an order: paper / stamp / short mechanical register
  language, not a generic click

SALE
- price choices are peer register/till keys; no price mode is made to sound like the correct answer
- successful sale gets a short register / scan / till / coin confirmation
- refusal is clearly different but restrained, not a loud failure buzzer
- price-mode variants, if any, stay within one SALE family

STORE SUPPORT
- acquisition is heavier than an ordinary purchase and reads as installing / securing store support
- it is not the same cue as Relic acquisition

MORNING
- store opening may use shutter / latch / door / restrained opening-chime material
- avoid bright commercial-jingle treatment

CLOSING
- closure uses a short receipt / cash-drawer / ledger / page-settle family
- it reads as settling the day, not earning a reward fanfare

#### NIGHT OUTCOME AUDIO

NIGHT outcomes share one family but must not collapse to one cue with only a pitch change.

- success: resolved / returned
- Great Success: one step brighter / more complete than success
- retreat: resolved but depleted
- injury: short low / worn return
- severe injury: heavier and lower than injury, without horror exaggeration
- Death: restrained low drop / cut / sting; no fanfare or melodramatic boom
- rescue / avoided death: recovery / life-saving accent distinct from normal success

Audio emphasis must never change or overstate the resolved Outcome or proof.

#### BOSS / FINAL AUDIO

Boss-information beats use a shared Boss motif / report family rather than unrelated fanfares.

- D5 / D15 / D25 may carry stronger acknowledgement
- D10 / D20 stay compact
- D30 adds no new-information cue; it may transition into Final tension only from already revealed
  information

FINAL ambience / BGM is more tense than NIGHT and may connect to the Boss motif.
The Final commit may use one of the run's heaviest short action cues: gate / lock / departure /
heavy mechanical close. Do not add a cinematic audio framework.

#### BGM / AMBIENCE

A unique full track for every phase is not required.

Preferred identity:
- DAY bed: MORNING / ORDER / SALE may share a foundation; local actions carry phase identity
- NIGHT bed: quieter / colder store atmosphere, leaving space for results
- BOSS / FINAL bed: restrained low tension, optionally tied to the Boss motif

A more suitable new loop / ambience asset may replace the current synthesized bed.

#### MIX / RUNTIME

Existing mute / BGM / SFX ownership remains authoritative.

Required:
- critical decision / result cues > ordinary action cues > utility cues
- BGM / ambience below those cues
- rapid-repeat controls must not build into harsh overlapping sound
- background / visibility transitions must not leak or duplicate playback
- audio changes do not mutate gameplay state and consume no Gameplay RNG

Presentation-only variation, if used, is isolated from Gameplay RNG.

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
