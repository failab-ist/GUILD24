# PRESENTATION POLISH — BATCH 1

DOC=PRESENTATION_POLISH_BATCH1
OWNER=presentation_batch1,opening,pre_run,store_management,morning
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
PARENT=PRESENTATION_SYSTEM_v2.8.0.md
PATCH_TYPE=ACTIVE_PRESENTATION_BATCH

## READ BOUNDARY

Read only:
1. AGENTS.md
2. SPEC_INDEX_v2.8.0.md
3. PRESENTATION_SYSTEM_v2.8.0.md
4. this file
5. relevant Source: dist/ui/app.js, dist/ui/ui.css, dist/ui/director-review.css, and only directly required dependencies

Do NOT full-read PRESENTATION_POLISH_v2.8.0.md.
Do NOT open unrelated Phase owners without a concrete conflict.
No Gameplay / Rule / Copy change.

## REQUIRED VISUAL PROCESS

Before editing:
- run npm run qa:presentation:batch1:before
- inspect opening / store / morning at 360 / 390 / 412 / 1024 / 1280
- retain screenshots as BEFORE

During implementation:
- one surface at a time
- use npm run qa:presentation:batch1:fast for 390 / 1280
- do not move on while the surface still reads as a CSS cleanup rather than authored game UI

After all three:
- run npm run qa:presentation:batch1:after
- evaluator reviews screenshots before Source
- compare BEFORE / AFTER / current FINAL-BOSS quality reference / external target reference when available
- narrow fixes only
- stop for Director approval

If the strongest change is only colour, darker shadow, more border, one outline or tighter padding,
the Batch is not finished.

Surface order is OPENING / PRE-RUN -> STORE MANAGEMENT -> MORNING, sequential.
EXECUTION MODEL, EVIDENCE RULES and NON-PRESENTATION REGRESSION PROOF in PRESENTATION_SYSTEM apply
to this Batch and are not restated here.

The User-provided current-vs-target pair for this Batch is
reports/reference/quality-pair-current.jpg and reports/reference/quality-pair-target.png.
Batch 1 surfaces are MEDIUM budget. They take the pair's construction method first.
A motif from the pair is neither required nor automatically banned: it is accepted only when it belongs to the
specific Phase/object and produces a clear runtime upgrade under PRESENTATION_SYSTEM's Asset / SVG and Visual Delta gates.

## BATCH 1 VISUAL DELTA REQUIREMENT

This Batch must not close on micro-polish alone.

OPENING / PRE-RUN:
- at least one MESO improvement must be obvious in the title/preparation object or Primary Action
- if the stage still reads as "empty dark background + web sheet", use a stronger owned stage treatment or production asset
  without changing composition

STORE MANAGEMENT:
- at least one MESO improvement must make the Slot / option object read as a workbench/ledger object rather than a web row

MORNING:
- micro changes to board shadow, rail baseline, slip inset, till alignment or shutter label do not close the surface by themselves
- if a production MORNING environment or board asset is available, it must be runtime-evaluated before the surface can PASS
- the existing room composition remains locked; the asset is integrated behind/around the current live HTML content

## OPENING / PRE-RUN

Keep:
- current title card
- preparation modal
- current content order
- four Decoration Slot rows
- Store Management entry
- Primary start Action

Do not create fullscreen or two-column redesign, move the action, or add new information.

Source handles include:
.opening, .opening-title, .opening-branch, .modal.narrow, .welcome-title, .welcome-band,
.deco-jump and modal [data-action="start"].

### Title / branch
Make store identity authored rather than plain centred text.
Use stronger vertical seating and a restrained sign/plate relationship. One supporting rule or small
local graphic is allowed if it improves the screenshot. Do not wrap the title in a giant new card.

Asset budget LOW-to-MEDIUM. A bespoke SVG/local sign detail is allowed only when it clearly beats
CSS-only treatment. Demon/jewel motifs are not default here.

### Preparation sheet
Keep the same modal, but header/body/footer must read as one built object:
- 2–4px-class outer object edge
- one meaningful inner seam
- footer separated by material/value, not a second nested frame
- no blur
- one shared edge grammar

### Welcome band
Keep copy/order. Treat as read-only in-world strip/inset: flat, one seam/accent, no press depth.

### Decoration rows
Rows are installation/readout controls, not SaaS list buttons:
- exact repeated inset
- clear label/value baseline
- one local surface edge
- subtle click affordance
- lower depth/contrast than Primary
- empty remains neutral
No four ornate frames, giant cards or filler icons.

### Store Management entry
Keep Secondary and visibly below the preparation state and Primary Action.

### Primary start Action
Strongest physical control:
- optical centring
- 3–6px hard depth
- 2–4px press collapse/travel
- BRICK family silhouette
- no glossy gradient
- no giant ornamental frame
One integrated graphic accent is allowed only if screenshot-proven.

PHONE keeps one vertical read.
DESKTOP keeps composition and gains presence through width, scale, material and stage treatment, not new columns.

## STORE MANAGEMENT

Keep Codex/management ownership, four Slot sections, option order, two-track option row,
buy/equip/unequip flow, inline confirmation and return path.

Source handles include:
.decoration-panel, .slot, .slot-option, .slot-option.on, .slot-option.locked,
.slot-option > button, .deco-confirm.

### Slot heading
Workbench-location heading, not web subsection label.
Use one short plate/ruled treatment, stable baseline, one seam. Do not badge every heading.

### Option row
One built object with information face + integrated Action face:
- 2–4px outer separation
- clear seam between reading and Action
- sibling rows share exact seam/depth logic
- stable effect inset/baseline
The Action must feel physically part of the row.

### Purchase
YELLOW is local controlled pop only. Do not flood the screen.

### Equipped / unequipped
Use multiple channels: frame/row state + title/state wording + Action construction.
No left status stripe.

### Unavailable
Current whole-card opacity is insufficient if it weakens copy.
Keep information legible; remove press depth from Action; recede by plane/value/depth; do not rely on whole-element opacity.

### Inline confirmation
Keep same inline replacement; it should look like the row entering confirmation state, not a mini-modal.

Asset budget LOW-to-MEDIUM.
Default CSS/existing texture. A reusable slot/workbench SVG is allowed only if it improves all four
Slot groups coherently. No decorative gems/demon motifs.

## MORNING

Keep room composition, DAY sign, notice board, paper slips, wall/counter/till and shutter Action position.
No new room frame, information order or decorative-prop wave.

Source handles include:
.p-morning, .store, .band.ceiling, .daysign, .board, .board-rail, .pinned, .slip,
.band.wall, .band.counter, .till, .pull.

### Room separation
Read as one store with distinct ceiling/wall, board, paper, counter/floor and dock.
Improve value separation before adding ornament. Wide-screen presence comes from existing art/crop/planes.

### Notice board
Major physical object:
- one dark-wood outer frame
- one lighter inner wood seam
- cork clearly inset
- one hard cast depth
- no decorative frame outside it
An outer 4–8px visual band, inner 2–4px seam and 3–6px hard drop are acceptable because the board IS the object.
Keep only shadow/inset layers that visibly contribute at screenshot scale.

### Board rail
Must feel attached to board, not a web toolbar:
- refine vertical seating
- left/right inset
- label/count baseline
- one object-specific seam
- no generic count badges

### Paper slips
- crisp paper edge
- restrained 1px seam if needed
- 3–4px hard drop
- existing paper texture
- consistent inset
- no rounded corners
- no second frame
Pin stays an attachment point, not ornament quota.

### Slip internals
Refine pin-title spacing, crest-title alignment, hazard baseline, Function-before-Flavor hierarchy and factual footer spacing.
No copy changes.

### Till
Keep true display treatment; improve label/number baseline, optical centring and display contrast.
Functional display glow remains allowed.

### Shutter / open
Keep flat no-stripe rule:
- warm wood/brown plane
- strong simple hard depth
- clear press collapse
- optically centred label
- no border stack / shine / repeating stripe
It should feel like opening a store, not submitting a form.

Asset budget MEDIUM and material-native.
Allowed when screenshot-proven: authored DAY/sign detail, better board-frame join/corner graphic,
restrained fixture detail already belonging to the object.
Not default: gothic frame, demon crest, jewels, generic fantasy corners, extra signs/bolts/brackets.
If a board-frame SVG is attempted, keep it only if it clearly beats the CSS-only frame.

## MORNING ASSET INTEGRATION CORRECTION — DIRECTOR REVIEW

Current runtime review after HEAD a4a86de:

- the store environment asset is an authored room, but the current integration crops it into the WALL band;
- the asset's authored ceiling is therefore discarded while the older procedural ceiling remains above it;
- the result reads as old ceiling + pasted new middle wall, so the asset's architectural value is not being used;
- the board-frame adoption creates more visible empty interior around the live notice and is less complete than BEFORE.

Therefore:

### Store environment
The MORNING environment asset must be re-evaluated as a room/stage asset, not as a wall texture.

Required:
- preserve the asset's authored ceiling in the runtime composition;
- choose an owner high enough in the existing MORNING structure to show the room coherently;
- keep DAY / board content / till / shutter as live HTML overlays;
- suppress duplicated procedural room art only where the production asset now owns the same physical architecture;
- do not alter information order or gameplay structure.

The exact CSS owner may be `.store` or another existing common parent if runtime geometry proves it fits better.
The design requirement is the coherent full-room read, not a prescribed selector.

### Board
The current `board-frame-plank.png` runtime adoption is rejected.

Restore the tighter pre-asset board construction first.
Do not retain the 9-slice merely because it is technically correct.

A board asset may only be retried if:
- it hugs the live notice content,
- adds no purposeless empty cavity,
- and AFTER is visibly more complete than the restored BEFORE construction.

Do not try the alternate board frame merely to force an asset into use.
Evaluate it only if there is a concrete fit hypothesis.

### Surface PASS
MORNING remains FAIL until:
- the environment reads as one authored store rather than mixed old/new architectural bands;
- the board is at least as complete and tight as BEFORE;
- the result is visibly stronger at PHONE and DESKTOP widths.

## MORNING LOWER STAGE / TILL ALIGNMENT — USER APPROVED

Runtime review of the full-room asset integration found one remaining composition-fit issue:

- the authored store image stops visually before the lower Morning Action area, so the room no longer reads as one continuous environment at the bottom;
- the live till / POS housing is not seated exactly on the production asset's counter-top plane.

This is now an exact Batch 1 requirement.

### Responsive MORNING environment variants

If the User provides a dedicated phone/portrait resize of the MORNING store background, use it as an
authored responsive asset rather than forcing the wide source through an aggressive phone crop.

Expected production roles:

```text
dist/ui/assets/presentation/morning/store-bg-wide.png
dist/ui/assets/presentation/morning/store-bg-phone.png
```

If the current wide file is still named `store-bg.png`, preserve the original bytes first, then rename/move only
as part of the asset-integration commit so the two roles are unambiguous.

Rules:
- PHONE uses the phone/portrait variant at the breakpoint where it produces the stronger coherent room;
- DESKTOP / wide viewport uses the wide variant;
- do not distort either image;
- do not use the phone image merely as a zoomed crop of the wide one if the User supplied it as a separately authored resize;
- DAY / board / till / Actions remain the same live HTML layer over both variants;
- counter-top alignment for the till must be tuned against EACH chosen variant's rendered counter-top position;
- the lower environment continuation requirement applies to both variants.

The variants must still read as the same store, not as two different locations.

### Environment continuation

The MORNING production environment must remain visually continuous from its authored ceiling through
its wall / shelves / window / counter top and counter face to the LOWER EDGE of the Morning stage.

The dock may remain the semantic owner of:
- 점포지원
- 문 열기

but it must not create an opaque black bar that visually cuts the production room off above those
controls.

Preferred direction:
- let the production room art continue behind the lower Action zone;
- make the Morning dock a live control overlay / seating plane over that environment;
- use only the minimum local contrast needed to keep controls readable.

Do not:
- stretch the asset;
- invent a second floor / counter below it;
- add another opaque panel simply to seat the controls;
- crop away the authored counter face at the bottom.

The authored lower room / counter face must remain visible enough that the screen reads as ONE store
from ceiling to bottom.

### Till / POS seating

The live till must sit on the production asset's actual counter TOP, not on the counter face and not
floating below / above it.

The asset measurement identifies the counter-top zone approximately at:
- 79–86% of the source image height

This range is a locating aid, not a fixed CSS percentage.

Runtime alignment owns the final placement:
- the bottom / feet of the POS housing visually contact the counter top;
- the display remains readable;
- the POS must look physically supported by the counter;
- responsive crop / scale may change the mapped screen coordinate, so do not hard-code a viewport
  pixel value that only works at 390.

If the legacy `.band.counter` / Scene anchor places the till incorrectly after the production room
takes visual ownership, the live till may be positioned from the existing Morning room / store
coordinate system instead. This is Presentation-only and must not change the information or Action.

### Acceptance evidence

At minimum inspect:
- PHONE 390
- DESKTOP 1280

PASS only if:
1. the production room visibly reaches the bottom Action zone without an opaque cut-off band;
2. counter top and counter face remain legible as parts of the same authored image;
3. the till is seated directly on the counter top;
4. 점포지원 / 문 열기 remain readable and clickable;
5. no gameplay structure or information order changes.

## DIRECTOR ACCEPTANCE

PASS requires:
- AFTER remains recognizably the same composition
- at least one major object per surface has visible craft upgrade
- Primary Action construction is visibly stronger
- no new decoration competes with gameplay information
- no SVG/asset looks cheaper than the current pixel UI
- 360 / 390 / 412 usable
- 1024 / 1280 not tiny-phone-in-empty-space
- no gameplay / copy / RNG / Save change

PASS evidence required with the report:
- BEFORE / AFTER pairs delivered, viewed, at one PHONE and one DESKTOP width per surface
- npm test result
- git diff --stat for the Batch commits
- surfaces implemented sequentially

After PASS, STOP. Do not proceed to Batch 2 without User approval.
