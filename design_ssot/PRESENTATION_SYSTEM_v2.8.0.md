# PRESENTATION_SYSTEM

DOC=PRESENTATION_SYSTEM
OWNER=presentation_system,visual_construction,asset_quality,ornament_budget,visual_review
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
PATCH_TYPE=PRESENTATION_CONSTRUCTION_SYSTEM

## PURPOSE

This is the small global construction system for v2.8 Presentation Upgrade.

For active work, read:
1. SPEC_INDEX_v2.8.0.md
2. this file
3. the active PRESENTATION_POLISH_BATCH*_v2.8.0.md
4. only the Source touched by that Batch

Do NOT full-read PRESENTATION_POLISH_v2.8.0.md for Batch 1.
That file retains detailed later-phase / audio contracts and is opened only when the active Batch routes to them.

The active User direction is:

    KEEP THE APPROVED COMPOSITION
    -> UPGRADE THE DETAILING / FINISH
    -> USE REAL GRAPHIC CRAFT WHEN IT EARNS ITS PLACE
    -> DO NOT REDESIGN THE SCREEN JUST TO MAKE IT FEEL NEW

The current FINAL / BOSS-CONFIRM family and the User-provided current-vs-target reference pair are
QUALITY-BAR references. They are not a universal skin.

## REFERENCE INTERPRETATION

Take from the quality references:
- authored frame construction rather than browser-default boxes
- deliberate outer edge / inner seam / depth relationships
- tactile pixel controls with a visible pressed state
- exact alignment and optical spacing
- material-specific finish
- dense but intentional micro-detail
- local hierarchy in which one object clearly owns the screen
- the sense that every visible edge was designed, not inherited from CSS defaults

Do not copy a motif merely because it exists in the reference.

Demon / gothic / jewel / heraldic / ornamental motifs are NOT globally banned.
They may be used actively when the owning Phase / Boss / object genuinely supports them and the
runtime result is visibly stronger than a CSS-only treatment. FINAL / major Boss surfaces have the
highest permission for this. MORNING, Store Management and utility surfaces do not inherit those
motifs by default.

Rule:
    PHASE-APPROPRIATE ORNAMENT = ALLOWED
    GENERIC ORNAMENT = REJECT
    REPEATED ORNAMENT WITHOUT FUNCTION = REJECT

### CURRENT-VS-TARGET PAIR (User-provided, v2.8)

The pair is stored as a permanent review input:

```text
reports/reference/quality-pair-current.jpg    CURRENT runtime
reports/reference/quality-pair-target.png     TARGET quality
```

Review input only. Not a shipped asset, not a skin, not a motif library.

What changes between CURRENT and TARGET while composition stays identical:

```text
FRAME       browser-default box          -> outer edge + inner seam, aligned corner detail
MATERIAL    flat single fill             -> tiled surface texture with local light
CONTROL     rounded gradient web button  -> angular face, hard depth, inner bevel, symmetric accent
TITLE       centred text                 -> seated plate / banner with one supporting rule
ROWS        plain text lines             -> exact repeated inset, label / value baseline
STAGE       empty black                  -> owned background plane
COHERENCE   ad hoc per-element edges     -> one shared edge grammar across every object
```

What does not change:

```text
block order, information items, Primary / Secondary relationship, modal ownership,
single vertical read on PHONE
```

The pair is a HIGH-budget surface. Other surfaces inherit its CONSTRUCTION METHOD
- frame build, edge grammar, control solidity, material finish -
and never its motif set.

Demon / rose / candle / gothic ornament applied to a MEDIUM or LOW surface is generic ornament and
is rejected regardless of execution quality.

## COMPOSITION LOCK

Presentation Upgrade does not mean re-layout by default.

If current information order / major object placement / Action placement is already Canonical and
functionally sound, keep:
- major composition
- information order
- interaction structure
- modal / stage ownership
- Primary / Secondary relationship
- required Player-visible information

Do not turn one-column into two-column, modal into fullscreen, rows into cards, cards into tabs, or
reorder a screen merely because another layout is possible.

Composition change requires:
- an existing Canonical requirement, or
- runtime evidence that current composition fails owned UX / responsive QA, or
- explicit User approval.

Target:
    SAME SCREEN
    + BETTER CRAFT
    + BETTER MATERIAL
    + BETTER EDGES
    + BETTER CONTROL FEEL
    + BETTER TYPOGRAPHY / SPACING
    + SELECTIVE HIGH-VALUE GRAPHICS
    = PRESENTATION UPGRADE

## DETAILING ORDER

Work in this order:
1. hierarchy / contrast
2. object silhouette
3. edge construction
4. material separation
5. control depth / press
6. typography placement
7. micro-spacing / alignment
8. asset / SVG / ornament only where the surface still needs authored graphic detail

If a surface still looks like web UI, first check:
- every object is the same rectangle
- every edge has the same weight
- pressable and read-only planes share depth
- text floats instead of sitting on material
- adjacent materials merge in value
- local spacing drifts
- Primary Action lacks stronger silhouette / depth

## COMPONENT CONSTRUCTION RECIPES

These are construction ranges, not literal palette requirements.

### MAJOR OBJECT FRAME

Use where the object IS the surface: board, receipt, order form, report, gate, major sheet.

Preferred:
- outer object edge: 2–4px class
- meaningful inner seam: 1–3px class
- hard cast depth where raised: 3–6px class
- no blur
- no second decorative frame around a complete frame

A richer frame may use bespoke SVG / asset when it genuinely improves object identity. The asset
should replace or strengthen the frame, not sit on top of an already complete frame.

### INFORMATION PLANE

Preferred:
- flat face
- one separation edge/rule
- little or no cast depth
- no press affordance
- 8 / 12 / 16px-class inset rhythm where geometry permits

Read-only values must not look like disabled buttons.

### PRIMARY DECISION CONTROL

Inspect:
- face height
- label optical centring
- horizontal optical padding
- 3–6px-class hard bottom/right depth
- 2–4px-class press travel / depth collapse
- focus treatment
- disabled treatment
- relationship to the information it commits

Preferred:
- flat face
- deliberate lit edge only where useful
- exactly one dominant hard-depth system
- press state changes shape / position, not colour only

### PEER CONTROLS

Peer choices share geometry, depth language, type treatment and target size.
No peer becomes visually recommended through accidental brighter fill, thicker outline or deeper shadow.

### SECONDARY / BACK / DEFER

Keep the same game language but reduce footprint, contrast, depth and isolation.
It must not read as another Primary.

### TITLE / PLATE

Use sign / plate typography only for short object identity.
A title plate may gain one supporting rule, a stepped end/notch appropriate to its family, or one
small local graphic accent. Do not turn every heading into a framed badge.

### SECTION RULE

Use a seam/rule before adding another box.
Typical strength: 1–2px class.
It groups content and must not compete with the outer object.

## EDGE / MATERIAL RULES

Ordinary information surface:
- one clear outer separation
- one meaningful seam if needed
- no border + inset border + bevel + drop-shadow stack
- no soft shadow / blur

Pressable:
- flat face
- hard depth
- visible press collapse

Read-only:
- flatter / recessed
- no press depth

Material is created by:
- flat plane separation
- existing texture / art
- edge-value differences
- hard cast depth
- object-specific seams / rules
- typography seated on the object

Material is NOT created by generic glossy gradients, fake-metal shine, universal bevel, random noise,
generic fantasy clipart, repeated badges/bolts/seals, or recolouring the same SaaS card.

Controlled tonal steps inside an authored graphic are allowed when they produce a stronger object.

## TYPOGRAPHY / SPACING

Roles:
- sign / plate face = short identity / Phase / object heading
- UI face = explanatory copy / effects / conditions / Action labels
- LED / display face = actual display role only

Audit:
- repeated left edges
- title baselines
- peer-control heights
- family inset
- label/value alignment
- numeric alignment
- accidental 1–3px drift
- dead space caused by wrapper height

When geometry permits, use 4px-class local rhythm. Do not make all gaps equal.

## ORNAMENT BUDGET

Budget is permission, not quota.

LOW:
- Help / Settings / Menu / ordinary utility Codex / small information overlays
- almost no bespoke ornament

MEDIUM:
- Opening / Pre-Run / Store Management / MORNING / ORDER / SALE / NIGHT / CLOSING / ordinary Event / Store Support
- material-native detailing encouraged
- one or a few authored accents allowed when they improve object identity

HIGH:
- D5 / D15 / D25 major Boss reports
- FINAL
- BOSS CONFIRM
- other explicitly major reveal / finale surfaces

HIGH may use bespoke frames, heraldic/demonic motifs, gems, crests and ornamental SVG when
phase-appropriate. HIGH still does not mean every edge is ornamented.

## ASSET / SVG QUALITY GATE

CSS-FIRST means reuse-first, not CSS-only.

Escalation:
1. current DOM / CSS / tokens / textures
2. pseudo-elements / clip-path / hard planes
3. existing repository art / UI assets
4. bespoke SVG / pixel graphic
5. licensed external asset vendored locally

Use the cheapest level that actually reaches the quality target.
If CSS-only leaves the object generic, a real graphic asset is preferred to more layers of mediocre CSS.

A new SVG is accepted only when the runtime screenshot clearly improves at least one:
- silhouette
- material identity
- hierarchy
- phase identity
- authored micro-detail

SVG should:
- align major edges to a deliberate pixel/integer grid where practical
- use robust silhouettes at game scale
- use flat fills / stepped tonal planes / hard internal shadows appropriate to GUILD24
- remain crisp at actual render size
- avoid hairline-heavy ornament that turns mushy after rasterization
- avoid browser-icon / stock-vector / generic fantasy-clipart appearance
- avoid smooth glossy vector gradients used merely to look expensive
- avoid decorative complexity that steals attention from gameplay information

If SVG looks weaker, cheaper or more synthetic than the CSS-only version, remove it.

External assets are allowed and should be considered actively for high-value surfaces when they
produce a meaningful upgrade.

Required:
- source / author / license / modification status in reports/ASSETS.md
- vendored locally; no runtime hotlink
- compatible with shipped/offline use
- adapted only within license
- visually consistent with GUILD24 pixel / 2D rendering

"Free" is not sufficient. The asset must improve the runtime result.

## SHIPPED PRESENTATION ASSET PATH

Production Presentation graphics ship under:

```text
dist/ui/assets/presentation/<surface>/
```

Recommended surface folders:
- `morning/`
- `opening/`
- `store/`
- `order/`
- `sale/`
- `night/`
- `closing/`
- `boss/`
- `final/`

Do not place shipped art under `reports/reference/`; that directory is review evidence only.

Format:
- opaque environment / backdrop -> WEBP preferred
- transparency / irregular frame / overlay -> PNG preferred
- SVG only when the graphic is genuinely vector-constructed, crisp at runtime scale, and passes the SVG Quality Gate

CSS references from `dist/ui/ui.css` use paths relative to that file, for example:

```css
background-image:url('assets/presentation/morning/store-bg.webp');
```

Naming should describe role, not iteration:
- `store-bg.webp`
- `board-frame.png`
- `title-sign.png`
- `boss-backdrop.webp`

Do not ship names such as `final-v7-good2.png`.

Every adopted non-code graphic records provenance / licence / modification status in `reports/ASSETS.md`.
User-authored or project-generated art records that provenance instead of inventing a third-party licence.

## ASSET INTEGRATION FIT GATE

Using an asset is not itself a MACRO / MESO improvement.

An adopted asset must preserve the authored value that justified making or selecting it.

Before integration, identify the asset's meaningful authored zones:
- environment architecture / ceiling / wall / floor or counter
- focal lighting / window / fixture
- frame corners / rails / material joins
- intentional negative space

Then choose the Source owner that can display those zones coherently.

Do NOT:
- crop away a meaningful authored zone merely to avoid changing which existing CSS band owns the art;
- keep an older procedural layer on top when it duplicates the same physical architecture and makes the new art read as a pasted middle strip;
- count a background file as a MACRO improvement when the visible crop removes the part that gives the environment its identity;
- keep an asset because it is new when the BEFORE screenshot is more coherent.

When a production environment asset spans multiple existing bands, first prefer:
1. moving visual ownership to their common parent while keeping live HTML controls on top;
2. making duplicated procedural art transparent / inactive only on that Surface;
3. preserving the live semantic overlays (DAY, counts, till, Actions) separately.

Crop is allowed for responsive framing, but must preserve the asset's intended architectural read.
A crop that turns one authored room into an ambiguous texture strip is FAIL.

### Dynamic frame fit

A frame around dynamic live content must hug the content.

PASS:
- frame edge / corners improve object identity;
- interior height remains driven by live content plus intentional padding;
- negative space has a clear physical purpose.

FAIL:
- frame introduces a visibly empty cavity below / around the live content;
- the live content looks undersized inside a large decorative shell;
- the frame's fixed source proportions dictate empty space that the gameplay content does not need;
- the BEFORE object looks more complete or tighter.

If a frame candidate fails this fit test:
- reject its runtime adoption;
- restore the previous better construction;
- keep or remove the candidate asset according to repository hygiene, but do not ship an unreferenced production asset by default.

### Evaluation wording

WORK may not label a change MACRO or MESO from implementation technique alone.

"background image added", "9-slice used", or "new SVG added" are implementation facts.

MACRO / MESO are earned only when the AFTER screenshot:
- improves first impression / object identity,
- preserves the authored asset's strongest zones,
- and is more coherent than BEFORE.

## RESPONSIVE DETAILING

PHONE:
- preserve current vertical narrative
- use width confidently
- keep gutters intentional
- do not shrink controls into desktop miniatures
- avoid nested frames consuming width

DESKTOP:
- do not leave a polished phone surface floating as a tiny centre panel
- first scale existing stage/material/object/spacing/crop within the same composition
- use width for breathing room and owned content
- do not invent a two-column IA merely to fill space

## IMPLEMENTATION BOUNDARY

Default:
    current DOM
    -> current classes / tokens
    -> CSS
    -> grid / flex tuning
    -> pseudo-elements
    -> clip-path
    -> hard shadow / inset planes
    -> existing textures / art
    -> bespoke SVG / local asset only when it beats the CSS result

Minimal wrapper/class changes are allowed only where CSS cannot reliably target the semantic object.

No new UI framework, theme engine, JS presentation framework, large asset wave, or decorative markup
layers that pseudo-elements already solve.

## VISUAL DELTA GATE

Presentation acceptance is based on visible delta, not CSS activity.

Classify changes:

MICRO
- baseline / optical centring
- 1-3px spacing correction
- shadow opacity / one seam weight
- minor colour-value correction
- small hover / press tuning

MESO
- major component silhouette
- object frame construction
- control face / depth construction
- material treatment that changes how the object reads
- a real plate / sign / board / ledger object replacing a generic box
- a production asset that changes one owned object's identity

MACRO
- owned stage / environment art
- large backdrop or room treatment
- major visual anchor art
- a composition-preserving background/object asset that changes the screen's first impression

Rules:
- MICRO work is necessary craft, but MICRO-only never closes a Presentation surface.
- Every Batch surface must contain at least one screenshot-visible MESO improvement.
- When the current defect is "empty / generic stage" or "CSS planes cannot create the intended place",
  use a MACRO lever or obtain a DIRECTOR-approved reason not to.
- A surface may keep its composition while still changing strongly at MESO / MACRO level.
- If BEFORE / AFTER need a written explanation to notice the upgrade, the visual delta is insufficient.
- Do not compensate for insufficient delta by adding more borders, badges, ornaments or shadows.

For an available production asset:
- evaluate it in runtime before deciding CSS-only is sufficient;
- asset use is not mandatory if it makes the screen worse;
- rejecting an asset requires screenshot evidence, not preference for fewer files.

## EXECUTION MODEL

Batch surfaces share Source files.

Required:
- implement one surface at a time, sequentially, in the order the active Batch lists
- do not parallelise surface implementation across concurrent workers

Parallel surface implementation is rejected for two reasons:
- concurrent edits to the same Source file
- divergent frame / seam / depth grammar per surface, which is the exact defect this system exists
  to remove

Parallelism is allowed for read-only evaluation only.

Before editing a surface, extract that surface's numeric construction clauses
- outer edge, inner seam, cast depth, press travel, inset rhythm, and stated prohibitions such as
  no blur or no second frame -
into an explicit checklist, then verify the final diff against it.

The checklist is a floor, not an acceptance condition.
Meeting every number while the runtime screenshot still reads as web UI is still a FAIL.

## NON-PRESENTATION REGRESSION PROOF

"Presentation only" is an evidence claim, not a declaration.

Every Presentation Batch report carries:
- npm test result
- npm run qa:visual result when the Batch touches shared Source
- git diff --stat for the Batch commits
- explicit confirmation that no Gameplay / Rule / Balance / Copy / Save / RNG behaviour changed

If a listed check was not run, report it as not run.
Never report an unrun check as passing.

## VISUAL HARNESS CONTRACT

Presentation is not accepted from Source inspection or the implementer's self-report.

Generator and visual evaluator are separate roles.

Required loop:
    BEFORE CAPTURE
    -> IMPLEMENT
    -> AFTER CAPTURE
    -> VISUAL EVALUATION
    -> NARROW FIX
    -> RE-CAPTURE
    -> DIRECTOR APPROVAL

Existing Playwright visual QA is the capture engine.

Batch 1 commands:
- npm run qa:presentation:batch1:fast
- npm run qa:presentation:batch1:before
- npm run qa:presentation:batch1:after

Full project acceptance remains:
- npm run qa:visual

Review inputs:
1. BEFORE runtime screenshot
2. AFTER runtime screenshot
3. permanent in-repo quality reference: current FINAL / BOSS-CONFIRM family
4. User-provided external current-vs-target reference pair when available to the task

If that external pair is unavailable later, do not reconstruct it from memory.

Evaluator asks:
- same approved composition?
- visibly more authored than BEFORE?
- strongest improvement visible at screenshot scale?
- coherent frame / seam / depth weights?
- new ornament competing with gameplay?
- Primary visibly pressable?
- SVG/asset a real upgrade or just extra vector decoration?
- phone width preserved?
- desktop gains presence rather than empty space?

No "looks better" self-verdict from WORK closes a Batch.

### EVIDENCE RULES

Capturing a screenshot is not evaluation.

Required before the implementer calls a surface done:
- open and actually view the AFTER capture, not only its file path
- compare it against the BEFORE capture at the same width
- answer the evaluator questions against what is visible, not against the intended change

Required of the Batch report:
- deliver the BEFORE / AFTER pairs to the DIRECTOR in the review channel
- a repository path alone is not delivery
- at minimum one PHONE pair and one DESKTOP pair per surface

A Batch whose captures were generated but neither viewed nor delivered is not reviewable.
Report it as BLOCKED, never as PASS.
