# DIRECTOR UI REVIEW — 2026-09-12

STATUS=APPLIED_TO_SOURCE
ROLE=DIRECTOR REVIEW
SCOPE=Stage 8.5 presentation / responsive UI only
DESIGN_SSOT_CHANGED=NO
GAMEPLAY_CHANGED=NO

## User-approved review input

1. ORDER warehouse summary was useful but occupied too much vertical space.
   - Keep it as an accordion.
   - First use starts open.
   - After the player folds it, preserve that preference across later Days/reloads until they open it again.
   - Desktop uses width to reduce height; mobile gets its own compact adaptation.

2. END/Final-party result view wasted desktop width.
   - Use horizontal space for the three expedition members on desktop.
   - Mobile remains a readable narrow layout rather than shrinking desktop.

3. SALE composition itself remains.
   - Purchase controls must not cover/float over the combat forecast.
   - Move the bag into the otherwise idle upper customer-side space.
   - Remove the old lower duplicate use of that space.
   - Where a player-useful item subtype actually exists, give it a hierarchy distinct from both name and stats. Do not revive internal category/role taxonomy.

4. Returning-expedition history is useful but secondary.
   - Keep the one-line summary immediately readable.
   - Fold the detailed changes to reduce vertical length.

## Applied Source

### `dist/ui/app.js`

- `stockBrief()` reads `account.settings.stockBriefOpen`; missing value means open.
- `render()` persists native `<details>` toggle state with the account settings, so the choice survives Day changes and reloads without adding progression state.
- `returningSummary()` is a compact native disclosure instead of a permanently expanded block.
- SALE moves `kitLine()` from the lower dossier to a new `front-side` beside the active NPC, sharing that otherwise idle area with the waiting deck.
- Item subtype marker is emitted only from actual item data (`effects.potion`) and currently labels potion-effect items as `포션`; internal `D.categories` / `D.roles` remain hidden.

### `dist/ui/director-review.css`

- ORDER warehouse contents: 2 compact columns on phones / 3 on wider screens, reduced padding and vertical occupation.
- SALE upper-right `front-side`: bag/status/equipment and waiting deck use the idle scene space.
- SALE price buttons are no longer sticky, so purchase controls cannot float over forecast content.
- Item subtype marker has a secondary visual hierarchy distinct from name and effect values.
- Returning history disclosure keeps the summary visible while details start folded.
- END sent-off members use a 3-column desktop layout; mobile remains single-column.
- Narrow-phone and wide-SALE adjustments are separate rather than desktop scaling.

### `dist/index.html`

- Loads the Director-review presentation overrides after the existing UI stylesheet.

## Director classification

- ORDER density: PRESENTATION / RESPONSIVE
- END empty desktop space: PRESENTATION / RESPONSIVE
- SALE purchase-vs-forecast overlap: PRESENTATION BUG
- Bag placement: PRESENTATION / HIERARCHY
- Player-useful item subtype: PRESENTATION; internal taxonomy remains prohibited
- Returning history folding: PRESENTATION / SECONDARY REFERENCE

No gameplay rule, numeric balance, item effect, wallet, forecast calculation, NPC state, sale result, or SSOT file was changed.

## Verification status

STATIC_REVIEW=PASS
RUNTIME_SUITE=NOT_RUN_IN_DIRECTOR_CONNECTOR
VISUAL_QA=REQUIRED_ON_WORK_RUNTIME

Required existing gates before this review patch is called final:
- `npm test`
- `npm run qa:visual` at 360 / 390 / 430 / 1280
- verify warehouse fold survives render / next Day / reload and opening it again persists the inverse state
- verify selected-item price controls never cover the combat/environment forecast
- verify bag remains readable without clipping at 360/390/430 and uses the idle upper scene space
- verify END three-member layout is horizontal at desktop and remains readable on mobile

This log records the Director-approved UI correction. It is not a new Design SSOT document and does not supersede the owner specs.
