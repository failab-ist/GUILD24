# PRESENTATION_PRINCIPLES

DOC=PRESENTATION_PRINCIPLES
OWNER=presentation_system,presentation_principles,visual_construction,asset_quality,ornament_budget,audio_presentation,visual_review
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/PRESENTATION_SYSTEM_v2.8.0.md,history/PRESENTATION_POLISH_v2.8.0.md,history/PRESENTATION_POLISH_BATCH1_v2.8.0.md,history/PRESENTATION_POLISH_BATCH2_v2.8.0.md,history/PRESENTATION_POLISH_BATCH3_v2.8.0.md,history/PRESENTATION_POLISH_BATCH4_v2.8.0.md,history/PRESENTATION_POLISH_BATCH5_v2.8.0.md

## ROLE

This owner holds the durable presentation PRINCIPLES that guide any presentation work.
It holds no per-screen layout, pixel value or per-surface component spec.

- implemented per-surface presentation detail lives in Current Source
- exact Player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md
- UI / UX / mobile / tutorial / layout rules -> UI_UX_v2.8.0.md; acceptance -> UI_UX_QA_v2.8.0.md
- mechanics and information cadence -> their routed owners (SPEC_INDEX_v2.8.0.md)

Read path for presentation work: SPEC_INDEX -> this file -> the relevant current owners -> only the
relevant Source.

## PRESENTATION BOUNDARY

Presentation is a pass over existing gameplay state. It may strengthen visual hierarchy / motion /
scene dressing, SFX feedback, phase BGM / ambience identity, and existing art scale / crop / icon
readability.

It must not add a gameplay rule, reward, probability or decision; a new required Save field; a new
Gameplay RNG draw; a hidden-information leak; a second result system; or a large cutscene/cinematic
framework.

Presentation may only strengthen the existing resolved state. Do not rewrite outcome truth.
Presentation work must not move, duplicate, pre-reveal or hide any owned information truth.
It may not change the gameplay rule or hide required decision information merely to make a screen
cleaner.

Prefer the current Sound / animation / scene systems before adding a new presentation framework.
Do not create a theme / skin framework.

## GOAL / IDENTITY

    KEEP THE APPROVED COMPOSITION
    -> UPGRADE THE DETAILING / FINISH
    -> USE REAL GRAPHIC CRAFT WHEN IT EARNS ITS PLACE
    -> DO NOT REDESIGN THE SCREEN JUST TO MAKE IT FEEL NEW

The standing Player-facing grammar is:

    DARK PIXEL + CONTROLLED POP

The world / store / document layer stays dark, grounded and restrained.
The interaction layer is allowed to become clearer, brighter and more saturated where the Player
must act, confirm, notice a state change or read a major reveal.

"Controlled Pop" does NOT mean turning the whole game into a candy-colour arcade UI.
It means contrast and saturation are spent deliberately on the few things that need immediate
attention.

The final result must still sound and look like GUILD24: a dark convenience-store / guild world
whose decisions are unusually clear and tactile.

Keep one GUILD24 visual language. Typography, spacing, interaction semantics and the global
DARK PIXEL + CONTROLLED POP grammar remain shared.

### Quality references

The current FINAL / BOSS-CONFIRM family and the User-provided current-vs-target pair
(reports/reference/, review input only - not a shipped asset, not a skin, not a motif library) are
QUALITY-BAR references. They are not a universal skin.

Take from the quality references: authored frame construction rather than browser-default boxes;
deliberate outer edge / inner seam / depth relationships; tactile pixel controls with a visible
pressed state; exact alignment and optical spacing; material-specific finish; dense but intentional
micro-detail; local hierarchy in which one object clearly owns the screen; the sense that every
visible edge was designed, not inherited from CSS defaults.

Other surfaces inherit the references' CONSTRUCTION METHOD - frame build, edge grammar, control
solidity, material finish - and never their motif set. Do not copy a motif merely because it exists
in the reference.

Pixel-game references are references to contrast discipline, hard outlines / hard depth, clear colour
blocks, instant state recognition and compact game-control silhouettes. They are NOT instructions to
copy a primary-RGB palette, candy colours everywhere, arcade-toy decoration or generic game icons.

If an external reference is unavailable later, do not reconstruct it from memory.

## COMPOSITION LOCK

Presentation Upgrade does not mean re-layout by default.

If current information order / major object placement / Action placement is already Canonical and
functionally sound, keep the major composition, information order, interaction structure, modal /
stage ownership, Primary / Secondary relationship and required Player-visible information.

Do not turn one-column into two-column, modal into fullscreen, rows into cards, cards into tabs, or
reorder a screen merely because another layout is possible.

Composition change requires an existing Canonical requirement, runtime evidence that current
composition fails owned UX / responsive QA, or explicit User approval.

User-approved composition change (User 2026-09-24, v2.9.0): the SALE product area — the per-row price panel becomes a
fixed counter tray above the dock (UI_UX_v2.8.0.md §SALE — COUNTER TRAY).

    SAME SCREEN
    + BETTER CRAFT / MATERIAL / EDGES / CONTROL FEEL / TYPOGRAPHY / SPACING
    + SELECTIVE HIGH-VALUE GRAPHICS
    = PRESENTATION UPGRADE

## FUNCTIONAL DESIGN AUDIT

Presentation is also a functional-design audit. For every surface, judge the complete interaction
rather than isolated CSS values:
1. What is the Player deciding / learning now?
2. Is that information visually primary enough to notice without hunting?
3. Does the highlighted / enlarged / animated region actually match the fact or action being
   explained?
4. Is the next meaningful action visible and spatially associated with the information it uses?
5. Is any duplicate, decorative, empty or stale region consuming space needed by the decision?
6. Does the same concept use consistent placement, wording and visual language across phases?
7. After the action, is the changed state visible without forcing the Player to reconstruct it?

REMOVE / REUSE / MERGE before adding another box, panel, label or modal.

### Information / action fit

A screen must allocate space according to decision importance, not component age.
- no horizontal overflow; fixed docks/headers do not cover current information or actions
- the primary decision and its immediate input information should be reachable without unnecessary
  scroll
- long content may scroll, but the scroll order follows information -> comparison -> action
- transient speech/toasts/coach marks do not reserve permanent empty height
- a short message must not be presented in an oversized empty modal solely because the shell is
  shared
- a dense message must not be shrunk into unreadable type merely to avoid scrolling
- repeated headings, duplicated counts and decorative blocks are removed before required
  information is compressed
- a transient overlay may never become permission for persistent overlays to cover required
  information

### Tutorial / coach target truth

Every tutorial/coach step is checked as a pair: spoken tutorial fact <-> exact visible UI region
highlighted by that step. The highlight is the smallest useful region that actually contains the
explained fact or action, is the visible target for the current responsive layout, and is not covered
by the coach bubble / mask. The tutorial teaches how to read a decision and never points to a
system-authored answer.
If the copy is correct but the target is wrong, fix the target/layout. Do not enlarge the spotlight
merely to hide a target/copy mismatch.

## VISUAL HIERARCHY

DARK BASE: background / environmental surfaces stay visually quieter than the decision placed on
them; information panels do not compete with the Primary Action merely by being equally bright; dark
does not mean muddy: neighbouring planes still separate cleanly.

CONTROLLED POP is spent primarily on the currently AVAILABLE / actionable choice, the Primary Decision
Control, a newly changed state the Player must notice, and important reveal / result emphasis.

Keep the rest quieter. Do not make every label, border and card equally loud.
The Primary Action may gain presence, but never more presence than the information it acts on.

### Action hierarchy

A Primary Decision Control must look more actionable than the surface around it, and must read as the
Phase's own action, not as a generic web CTA. Do not solve this with colour alone. Use a combination
of placement, silhouette / footprint, contrast, hard depth, press feedback and state-specific
treatment.

Peer choices share geometry, depth language, type treatment and target size. No peer becomes visually
recommended through accidental brighter fill, thicker outline or deeper shadow.

Secondary / back / defer keep the same game language but reduce footprint, contrast, depth and
isolation. They must not read as another Primary.

Not every button becomes an object. Utility Controls (close / back / settings / help / ordinary
navigation) may stay plain. Object treatment is prioritised for the Primary Action that commits a
choice, an important Reveal acknowledgement, and an action that is a turning point of the Run.

### State grammar

AVAILABLE is the strongest pressable plane in its local decision set and carries real press depth /
feedback.
SELECTED / OWNED stays in the same base material family rather than becoming a generic success-colour
filled card, and is distinguishable by more than one channel; it loses press depth and hover / active
affordance.
UNAVAILABLE recedes through surface / contrast / depth rather than whole-element opacity, keeps
required information fully legible, and its action plane must not look pressable.

Do not use a coloured left vertical bar / status stripe as the selected-state shortcut.
Disabled / selected / completed state must be distinguishable without relying only on color.

### Phase identity / colour

Phase identity is not a fixed hue chart. A Phase reads differently through the smallest useful
combination of material / surface language, information hierarchy and contrast, placement and
silhouette of the Primary Decision Control, press / release feedback, and a local accent where it
strengthens recognition. Do not solve the phases by recolouring the same web-style button.

No exact hex palette, phase hue table or saturation value is Canonical here. Colour is judged
relationally at runtime and may be tuned when the Phase stays distinguishable by more than colour,
the Primary / secondary / destructive hierarchy stays readable without colour, colour does not become
a generic universal success/selected treatment, and contrast / accessibility stay acceptable.

Semantic colour is authoritative over decorative phase colour.
Global Help / Settings / management surfaces may stay visually neutral.

### Control / feedback hygiene

- primary / secondary / destructive actions read with the correct relative emphasis
- tap/click targets remain comfortably usable at phone width
- focus order follows visual/action order; modal open/close returns focus to a meaningful origin
- actions that redraw the surface preserve useful scroll/focus context where the decision continues
- success/refusal/error feedback appears near the action it explains and does not masquerade as a
  new mechanic

## CONSTRUCTION

### Detailing order

hierarchy / contrast -> object silhouette -> edge construction -> material separation -> control
depth / press -> typography placement -> micro-spacing / alignment -> asset / SVG / ornament only
where the surface still needs authored graphic detail.

If a surface still looks like web UI, first check: every object is the same rectangle; every edge has
the same weight; pressable and read-only planes share depth; text floats instead of sitting on
material; adjacent materials merge in value; local spacing drifts; the Primary Action lacks stronger
silhouette / depth.

### Component roles

MAJOR OBJECT - where the object IS the surface (board, receipt, order form, report, gate, major
sheet): a deliberate outer edge, a meaningful inner seam, hard cast depth where raised, no blur, no
second decorative frame around a complete frame. Upgrade the object rather than wrapping it in another
panel.

INFORMATION PLANE - flat face, one separation edge/rule, little or no cast depth, no press affordance.
Read-only values must not look like disabled buttons.

PRIMARY DECISION CONTROL - flat face, exactly one dominant hard-depth system, press state changes
shape / position, not colour only; a control the Player commits a decision with is square to the
layout, never skewed.

TITLE / PLATE - sign / plate typography only for short object identity. Do not turn every heading
into a framed badge.

SECTION RULE - use a seam/rule before adding another box. It groups content and must not compete with
the outer object.

### Edge / material

- ordinary information surface: one clear outer separation, one meaningful seam if needed
- no border + inset border + bevel + drop-shadow stack
- crisp pixel-like edges and hard-offset / pixel-like shadow; never blurred depth or soft glow
- pressable: flat face, hard depth, visible press collapse; read-only: flatter / recessed, no press
  depth

A crisp pixel edge does NOT mean every button receives a visible outline. Use an explicit outline only
when it carries real information: selected state, insufficient contrast, focus/accessibility, or an
object identity that genuinely depends on a frame.

    flat plane
    -> hard depth / press
    -> explicit border only if still needed

Material is created by flat plane separation, existing texture / art, edge-value differences, hard
cast depth, object-specific seams / rules and typography seated on the object.
Material is NOT created by generic glossy gradients, fake-metal shine, universal bevel, random noise,
gradient or repeating stripe used as texture, generic fantasy clipart, repeated badges/bolts/seals,
or recolouring the same SaaS card.

Controlled tonal steps inside an authored graphic are allowed when they produce a stronger object.
Functional gradients (a lit display, a readability scrim under a sticky control) are not ornament; do
not strip gradient strings mechanically.

### Typography / spacing

Roles: sign / plate face = short identity / Phase / object heading; UI face = explanatory copy /
effects / conditions / Action labels; LED / display face = actual display role only.

Audit repeated left edges, title baselines, peer-control heights, family inset, label/value
alignment, numeric alignment, accidental small drift and dead space caused by wrapper height.
Use a consistent small local rhythm where geometry permits. Do not make all gaps equal.

## ORNAMENT BUDGET

Budget is permission, not quota.

- LOW: Help / Settings / Menu / ordinary utility Codex / small information overlays - almost no
  bespoke ornament
- MEDIUM: ordinary phase and store surfaces - material-native detailing encouraged; one or a few
  authored accents allowed when they improve object identity
- HIGH: major Boss reveals, FINAL, BOSS CONFIRM and other explicitly major reveal / finale surfaces -
  may use bespoke frames, heraldic/demonic motifs, gems, crests and ornamental SVG when
  phase-appropriate; HIGH still does not mean every edge is ornamented

    PHASE-APPROPRIATE ORNAMENT = ALLOWED
    GENERIC ORNAMENT = REJECT
    REPEATED ORNAMENT WITHOUT FUNCTION = REJECT

Demon / rose / candle / gothic ornament applied to a MEDIUM or LOW surface is generic ornament and is
rejected regardless of execution quality.

Game-like interaction language is a materiality and affordance requirement, not permission to add
ornament. It is not satisfied by decoration and it is failed by decoration. Do not add repeated logo /
seal / stamp marks used only to fill space, repeated bolt / rivet / corner-bracket / badge / frame
motifs, frame-inside-frame, or another decorative layer on top of an established material.

Presence comes from size, weight, contrast, placement and the press, not from added marks.
REMOVE before adding.

## ASSET / SVG QUALITY

CSS-FIRST means reuse-first, not CSS-only.

Escalation: current DOM / CSS / tokens / textures -> pseudo-elements / clip-path / hard planes ->
existing repository art / UI assets -> bespoke SVG / pixel graphic (incl. border-image / 9-slice /
corner-rail-cap pieces for scalable frames) -> licensed external asset vendored locally.
Minimal wrapper/class changes are allowed only where CSS cannot reliably target the semantic object.

Use the cheapest level that actually reaches the quality target. If CSS-only leaves the object generic
after one focused construction pass, escalate: a real graphic asset is preferred to more layers of
mediocre CSS. "CSS can technically draw it" is not a reason to reject an asset. Do not keep adding
border/shadow layers merely to avoid using an asset.

No new UI framework, theme engine, JS presentation framework, large asset wave, or decorative markup
layers that pseudo-elements already solve. Targeted graphic polish corrects existing art where
silhouette, crop, scale or icon identity weakens the current decision; it is not permission for a
large new art wave.

A new SVG is accepted only when the runtime screenshot clearly improves silhouette, material identity,
hierarchy, phase identity or authored micro-detail. SVG should use robust silhouettes, integer-aligned
major geometry and flat fills / stepped tonal planes; remain crisp at actual render size; avoid
hairline filigree, browser-icon / stock-vector / generic-clipart appearance, glossy vector gradients,
and complexity that steals attention from gameplay information. Evaluate the rendered screenshot, not
the SVG source. If SVG looks weaker, cheaper or more synthetic than the CSS-only version, remove it.

For dynamic frames / controls: authored corners / rails with fixed corner geometry, stretch or tile
only designated regions; text and gameplay state remain live HTML. Do not bake live values or copy
into an asset.

### Asset hygiene

- external assets: source / author / license / modification status recorded in reports/ASSETS.md;
  vendored locally, no runtime hotlink, compatible with offline use, adapted only within license;
  "free" is not sufficient - the asset must improve the runtime result
- User-authored or project-generated art records that provenance instead of inventing a licence
- shipped presentation graphics live under dist/ui/assets/presentation/<surface>/; reports/reference/
  is review evidence only
- names describe role, not iteration
- a supplied original that a task marks for preservation (e.g. the seven Boss domain backdrops) is stored
  byte-for-byte unchanged (verified by hash); runtime derivatives are separate, reproducible and never
  replace the original
- do not substitute screenshots, previews or regenerated lookalikes for missing source art

### Integration fit

Using an asset is not itself an improvement. An adopted asset must preserve the authored value that
justified making or selecting it.
- do not crop away a meaningful authored zone merely to fit an existing CSS band
- do not keep an older procedural layer that duplicates the same physical architecture
- crop is allowed for responsive framing but must preserve the asset's intended architectural read
- do not keep an asset because it is new when the BEFORE screenshot is more coherent

A frame around dynamic live content must hug the content: interior height stays driven by live
content plus intentional padding, with no purposeless empty cavity. If a frame fails this fit, reject
its runtime adoption and restore the previous better construction.

A strong stage/background does NOT by itself complete a surface. Background art is a stage
improvement; frame / plate / row / control construction is a component improvement. Where the defect
is "web panel over a game background", the major information container AND the Primary Action must
visibly stop reading as generic CSS rectangles.

A Boss domain backdrop is reserved for the D30 Final; do not use it, or crop fragments of it, to
decorate the D5-D25 reports or Codex/card surfaces. Already-owned Boss art may still appear on reports.

### Store-growth traces

The live store may show small deterministic traces of state the Player already owns or has already
been shown. Every visible trace maps to real current state, grants no mechanic, is not a control, and
lets no unrevealed information be inferred. No combinatorial skin/theme system.

## MOTION / RESULT PRESENTATION

- existing outcome truth drives presentation; materially different results must feel different
  through result emphasis, contrast, tag/silhouette and transition using the current result system
- visual/audio emphasis never changes Outcome, rewards, proof or dialogue priority
- information-bearing beats may receive stronger acknowledgement appropriate only to the information
  already owned by that beat; a payoff beat may heighten presentation using only already-revealed
  information and adds no new information
- major beats get meaningful presence; compact beats stay compact through shorter content and quieter
  hierarchy, not by shrinking established art or inflating an empty shell
- art/title/decorative frame must not push the owned information or acknowledgement into unnecessary
  scrolling
- a stronger reveal is not a new screen architecture or a cinematic framework

If runtime evidence shows an existing exact presentation measurement causes a functional failure,
patch the UI_UX owner before Source implementation. Do not let WORK silently redefine the
measurement.

## TRANSACTION BEAT

Purpose: selling an Item to a customer must be seen as an act (User 2026-09-24, v2.9.0).

General contract, every beat:
- presentation-only; no gameplay rule, Save field, Gameplay RNG draw, minigame, required drag or
  cinematic framework
- each beat ≤ 320 ms; one sale's beats total < 600 ms
- never blocks input
- skipped entirely under `prefers-reduced-motion`; state changes still apply instantly and the end
  state is identical
- scroll position kept on the same customer (SALE_v2.8.0.md §SALE RUNTIME CONTINUITY)
- no beat adds information the resolved state does not already hold

| id | beat | exact behaviour |
|---|---|---|
| A1 | 건네기 hand-over | on a price commit that succeeds, the Item icon travels from the counter tray to the customer's Bag slot in the customer-state strip (260~320 ms) and the slot settles (scale 1.05→1, 240 ms); the dock Gold counts to its new value (same count-up the Morning till uses); the `판매 후 변화` rows do not vanish — the Stat cells that changed pulse once (300 ms) and keep the new value |
| A2 | 손님 반응 customer reaction | purchase: the customer figure nods (translateY 4 px, 180 ms × 2); refusal: it shakes its head (translateX ±4 px, the existing bubble-shake timing). The reply line (Copy.buy / Copy.refuse) stays 5 seconds; the greeting keeps the 3-second rule |
| A3 | 계산대 counter | the Bag keeps its place in the customer-state strip beside the status line at every width, one step larger than v2.8 and never overflowing (UI_UX §BAG PRESENTATION); the counter edge under the front is unchanged; the hand-over (A1) lands on that Bag slot. §COMPOSITION LOCK holds (User 2026-09-24 revision, v2.9.0) |
| A4 | 손님 교대 customer exit / entry | `손님 보내기`: the current customer exits left (240 ms), then the next arrives with the existing entry (240~340 ms); `depart` gets a recorded utility cue (door / step family). Entry may still start the view at the top (UI_UX §SALE — MOBILE AUTHORITY) |
| A5 | 가격 소리 계열 price-mode sound family | 50% / 100% / 150% share the register family and differ by coin ticks (1 / 2 / 3); no mode sounds like the correct answer (§AUDIO PRESENTATION "peer choices") |
| A6 | 거절 refusal | the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text; refusal reply stays 5 s (A2) |
| A7 | first-sale price coach | the PRICING coach gains one closing clause; exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md §3-7 PRICING |

Exact surface / layout -> UI_UX_v2.8.0.md §SALE; acceptance -> UI_UX_QA_v2.8.0.md.

## AUDIO PRESENTATION

The current audio ARCHITECTURE is reused where it already solves playback, routing, settings and
phase ownership. This does NOT require reuse of the current audio assets. Existing synthesized
cues / loops may be replaced when they are weaker than the target presentation.

New audio may be newly authored / synthesized / edited, layered or transformed current sound, or an
external free asset whose license permits the shipped use (provenance recorded outside Canonical,
vendored locally, no runtime hotlinking, no unclear rights).

### Voice

    late-night convenience-store tactility
    + restrained guild / fantasy signals

Prefer short, dry, readable transients; mechanical / paper / register / fixture material; modest
retro / 2D-game character; restrained tonal fantasy accents.
Avoid one generic synth beep for every action, sci-fi UI beeps, corporate-app clicks, chiptune /
arcade effects everywhere, mobile-RPG fanfare, cinematic whoosh / boom as the default, long reverb
tails, overly cute / pop cartoon SFX.

### Hierarchy

Ambience / BGM = phase / space identity; Decision SFX = meaningful commit / result; Utility SFX =
navigation / light manipulation.

Decision SFX outrank Utility SFX. BGM / ambience sits below information and decision cues.
Utility controls use a quiet, short, low-importance family.
A decision cue sounds like the act it commits, not a generic click. Peer choices do not sound like the
correct answer.
SALE price modes 50% / 100% / 150% share one register family and differ only by coin ticks (1 / 2 / 3);
no mode sounds like the correct answer (§TRANSACTION BEAT A5; User 2026-09-24, v2.9.0).

Outcomes that share a family must not collapse to one cue with only a pitch change.
Audio emphasis must never change or overstate the resolved Outcome or proof.
Information beats share a motif / report family rather than unrelated fanfares.
A unique full track for every phase is not required.

### Mix / runtime

Existing mute / BGM / SFX ownership remains authoritative.
- critical decision / result cues > ordinary action cues > utility cues > BGM / ambience
- rapid-repeat controls must not build into harsh overlapping sound
- background / visibility transitions must not leak or duplicate playback
- audio changes do not mutate gameplay state and consume no Gameplay RNG

Presentation-only variation, if used, is isolated from Gameplay RNG. Do not add a cinematic audio
framework.

## RESPONSIVE ADAPTATION

PHONE:
- preserve current vertical narrative
- use width confidently; keep gutters intentional
- do not shrink controls into desktop miniatures; touch targets stay at the mobile minimum
- avoid nested frames consuming width
- do not regain game feel by making a fixed band taller

DESKTOP:
- do not leave a polished phone surface floating as a tiny centre panel
- first scale existing stage/material/object/spacing/crop within the same composition
- use width for breathing room and owned content
- do not invent a two-column IA merely to fill space
- compact beats stay compact and do not inflate into empty desktop posters

Responsive asset variants (e.g. `<role>-wide` / `<role>-phone`) are authored framings of the SAME
environment, not a different layout: no stretching, no extreme crop of the wide asset on phone, the
same live semantic layer on both, and no visible jump in environmental identity between breakpoints.
Preserve source aspect ratio; crop the display, never the source original.

## VISUAL REVIEW PROCESS

Presentation is not accepted from Source inspection or the implementer's self-report.
Generator and visual evaluator are separate roles.

    BEFORE CAPTURE
    -> IMPLEMENT (one small surface)
    -> AFTER CAPTURE
    -> SEPARATE VISUAL EVALUATION
    -> NARROW FIX
    -> RE-CAPTURE
    -> DIRECTOR APPROVAL

Existing Playwright visual QA is the capture engine. Additional states a surface owns are reached
through current public UI / game actions, fixtures or supported harness mechanisms; do not fake DOM
text or invent state.

### Execution

Implement one surface at a time, sequentially. Do not parallelise surface implementation across
concurrent workers (shared Source files; divergent frame / seam / depth grammar). Parallelism is
allowed for read-only evaluation only. Stop at each review boundary; do not self-declare PASS.

A construction checklist extracted from the owned clauses is a floor, not an acceptance condition.
Meeting every number while the runtime screenshot still reads as web UI is still a FAIL.

### Visual delta

Acceptance is based on visible delta, not CSS activity.
- MICRO: baseline / optical centring, small spacing, shadow / seam weight, minor colour value,
  hover / press tuning
- MESO: component silhouette, object frame, control face / depth, material treatment, a real plate /
  sign / board / ledger object replacing a generic box
- MACRO: owned stage / environment art, backdrop, major visual anchor art

MICRO work is necessary craft, but MICRO-only never closes a surface. A touched surface needs at least
one screenshot-visible MESO improvement; an "empty / generic stage" defect needs a MACRO lever or an
approved reason not to. Technique is not quality: "used SVG / border-image / asset / backdrop" are
implementation facts; MESO / MACRO are earned only when the AFTER screenshot is more coherent than
BEFORE. If BEFORE / AFTER need a written explanation to notice the upgrade, the delta is insufficient.
If the viewer's first summary is "the background changed", the UI detailing target has NOT been met.
Do not compensate for insufficient delta with more borders, badges, ornaments or shadows.
An available production asset is evaluated in runtime before deciding CSS-only is sufficient;
rejecting it requires screenshot evidence.

### Evaluator questions

Same approved composition? Visibly more authored than BEFORE? Strongest improvement visible at
screenshot scale? Coherent frame / seam / depth weights? New ornament competing with gameplay?
Primary visibly pressable? SVG/asset a real upgrade or just extra vector decoration? Phone width
preserved? Desktop gains presence rather than empty space?

### Evidence

Capturing a screenshot is not evaluation. Before calling a surface done, open and actually view the
AFTER capture, compare it against BEFORE at the same width, and answer the evaluator questions against
what is visible. Deliver BEFORE / AFTER pairs (at least one PHONE and one DESKTOP pair per surface) in
the review channel; a repository path alone is not delivery. Captures generated but neither viewed nor
delivered are BLOCKED, never PASS.

"Presentation only" is an evidence claim, not a declaration. Every presentation report carries the
npm test result, npm run qa:visual when shared Source is touched, git diff --stat, and explicit
confirmation that no Gameplay / Rule / Balance / Copy / Save / RNG behaviour changed. Never report an
unrun check as passing.
