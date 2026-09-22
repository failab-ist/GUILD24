# GUILD24 — Presentation Assets

Every third-party asset in the build, with its licence and why it was chosen.
Regenerate the vendored copies with `npm run assets`.

## Adopted

### Wanted Sans 1.0.3 — information UI face
- source: npm `wanted-sans` (https://github.com/wanteddev/wanted-sans), (c) Wanted Lab
- licence: **SIL OFL-1.1** — commercial use YES, embedding YES, modification YES,
  attribution: keep the OFL notice (shipped at `dist/ui/fonts/OFL-WantedSans.txt`).
- why: `design_ssot/UI_UX_v2.8.0.md` routes the current UI/UX truth and inherits the typography baseline that names Wanted Sans as the INFORMATION face, replacing
  Pretendard. Type carries two jobs and they must not be mixed: the atmosphere face takes
  signage, document titles and diegetic readouts; the information face takes every value,
  effect line, price, count and control label, including both primary actions. A system stack
  was rejected: Korean fallbacks differ per platform, so readability could not be guaranteed
  and the QA screenshots would not represent what a player sees.
- how: Regular + SemiBold only - the package ships seven weights and the other five never
  reach dist - subset to the same glyph set by `tools/vendor-assets.py`
  (2.3 MB each -> ~62 KB each). Five faces ship in total.

### Mulmaru 1.1 — atmosphere face
- source: upstream https://github.com/mushsooni/mulmaru, (c) 2025 Mushsooni, Reserved Font
  Name "물마루" / "Mulmaru". Vendored in-repo at `vendor/mulmaru/` with the upstream OFL.
- licence: **SIL OFL-1.1** — commercial use YES, embedding YES, modification YES,
  attribution: keep the OFL notice (shipped at `dist/ui/fonts/OFL.md`).
- acquisition: Mulmaru publishes no npm package and its own repository carries no binaries at
  any ref, so the WOFF2 pair was taken from the `projectnoonnu/2601-4` distribution that
  jsDelivr serves as `@1.1`. That tag and `main` are the same commit (707cc84), and the files
  were verified before use: real WOFF2, family `물마루` / `물마루 Mono`, OFL-1.1 in the name
  table, 11,940 glyphs each. The CDN is an ACQUISITION SOURCE ONLY — the game fetches nothing
  at runtime, which `tests/assets.cjs` asserts against the CSS.
- faces: Mulmaru and Mulmaru Mono only, the two the CSS actually asks for. Mulmaru ships a
  single weight by design, so the @font-face is declared `font-weight:100 900` and a rule
  asking for 700 gets the real face instead of a synthesised bold.
- how: subset to this build's glyph set by `tools/vendor-assets.py` (97 KB -> 11 KB and
  95 KB -> 10 KB).

### anime.js 4.5.0 — animation runtime
- source: npm `animejs` (https://animejs.com), (c) Julian Garnier
- licence: **MIT** (SPDX: MIT) — commercial use YES, modification YES, attribution: keep the notice
  (shipped at `dist/ui/vendor/anime.LICENSE.md`).
- why: game feel. Shutter lift, stamp impact, price-tag swing, coin count-up and the Night
  result beat are timing problems, not CSS problems.
- how: the UMD build is vendored to `dist/ui/vendor/`. Presentation only: no system under
  `dist/systems/` or `dist/data/` references it, and the UI checks `typeof anime` so the
  game runs correctly if it is absent. Asserted by `tests/assets.cjs`.

### uisfx 0.4.0 `mechanical` theme — material Decision SFX
- source: npm `uisfx` (https://www.npmjs.com/package/uisfx), (c) 2026 Yuki Capital.
  The package code is MIT; **the audio under `sounds/` is separately dedicated to the public
  domain**, which the package states in its own `LICENSE-AUDIO`.
- licence: **CC0-1.0** (SPDX: CC0-1.0) — commercial use YES, modification YES, redistribution
  YES, attribution appreciated but **not required**. The upstream dedication ships beside the
  files it releases at `dist/ui/assets/audio/LICENSE-CC0.txt`.
- modification status: **none**. The shipped bytes are the upstream bytes; only the filename
  changes, from the vendor's UI vocabulary to the cue's role in this game. No re-encode, no
  trim, no level change — gain and layering happen live in `dist/ui/audio.js`.
- why: `design_ssot/UI_UX_v2.8.0.md` §AUDIO VOICE asks the material cues for mechanical /
  paper / register / fixture sound, with short, dry, readable transients and no sci-fi or
  arcade character. An oscillator can imply that material; it cannot be it. The `mechanical`
  theme is the one in the package that matches the voice: measured in a browser, every adopted
  file is 87–298 ms long and falls 20 dB within 10–70 ms of its peak.
- scope: the **tonal** families stay synthesised — NIGHT outcomes, the Boss motif and the phase
  beds have to stay in tune with each other, and a sample set cannot be transposed into a
  family. Only the twelve object-sounds below ship; the package carries 1872 files and the rest
  never reach `dist`.
- how: `tools/vendor-assets.py` copies them into `dist/ui/assets/audio/` (32 KB total, mp3 —
  the one container every current mobile browser decodes). Regenerate with `npm run assets`.
  Nothing is fetched from a host at runtime; the loader reads this build's own files, and every
  sampled cue keeps a synthesised fallback so a failed load is thinner, never silent.

| shipped | upstream | cue |
| --- | --- | --- |
| `tick.mp3` | `mechanical/typing` | ORDER quantity stepper, and its quick-set one step quieter |
| `stamp.mp3` | `mechanical/press` | ORDER confirmation, under the synthesised paper layer |
| `register.mp3` | `mechanical/purchase` | SALE commit — shared by every price mode |
| `refuse.mp3` | `mechanical/cancel` | SALE refusal |
| `secure.mp3` | `mechanical/lock` | Store Support acquisition |
| `cart.mp3` | `mechanical/add-to-cart` | ordinary Decoration purchase |
| `unlock.mp3` | `mechanical/unlock` | 본사 해금 |
| `shutter.mp3` | `mechanical/open` | MORNING opening |
| `settle.mp3` | `mechanical/close` | CLOSING |
| `gate.mp3` | `mechanical/blocked` | FINAL commit |
| `soft.mp3` | `mechanical/hover` | utility navigation |
| `key.mp3` | `mechanical/select` | ordinary pick |

## Evaluated and rejected

| Candidate | Verdict |
|---|---|
| OpenGameArt / Kenney / itch.io pixel packs | Unreachable — blocked by this environment's egress proxy. npm carries no commercial-safe pixel store-interior pack (searches for pixel art ui / game ui kit / rpg ui / sprite pack returned chat kits, avatar generators and dice rollers). |
| jsDelivr / unpkg / esm.sh runtime CDN | Unreachable from this environment; and for the font a local subset is strictly better (smaller, no FOUT, offline). |
| `nes.css` (MIT), `rpgui` (Zlib) | Game-flavoured but container-first component frameworks. They impose an NES / RPG-Maker chrome and would fight the store-material language rather than serve it. |
| `@iconify-json/game-icons` (CC BY 3.0), `rpg-awesome` | Smooth vector fantasy icons. They read as vector art sitting on bitmap type, and the nine Hazard pictograms they would cover are already drawn on-grid in `dist/ui/scene.js`. |

## Authored in-project

`dist/ui/art.js` (avatars, item pictograms, gate marks, UI glyphs) and `dist/ui/scene.js`
(store ceiling, shelving wall, counter, corporate seal, stock crate, price tag, nine Hazard
pictograms). Originally authored for this project on its 4px grid, so no third-party
licence applies and the style stays coherent with the existing art.

## NPC customer stickers — `dist/ui/assets/npc/npc-01..05.png`

Supplied by the project as examples of the production NPC asset format, not as finished
cards: a character plus their own lifestyle vignette on a transparent surround, roughly
square (377×358 / 361×365 / 364×367 / 368×362 / 362×370), with 3–10px of transparent
margin and, in one case, content touching the frame edge.

The Sale screen treats them as an immutable payload:
- contained at their own aspect ratio inside one square customer slot — never cropped,
  stretched, letterboxed to a fixed pixel box, or recoloured;
- the transparent surround is preserved, so the silhouette stays organic;
- nothing is baked into the artwork — rarity, name, level, job and the reveal are
  separate DOM layers over the same `<img>`.

Production art replaces these by editing `Scene.npcPool`, or per NPC by registering
`Scene.manifest['npc.<npcId>']`. No screen, layout or per-NPC rule changes.

## Not shipped — review references

These files are review inputs for Presentation work. They are not part of the build,
are never requested at runtime, and no pixel of them is reused in the UI.

### v2.8 current-vs-target quality pair
- files: `reports/reference/quality-pair-current.jpg`, `reports/reference/quality-pair-target.png`
- source: provided by the User on 2026-09-22 for the v2.8 Presentation Upgrade
- why: `PRESENTATION_SYSTEM_v2.8.0.md` §VISUAL HARNESS CONTRACT lists the User-provided
  current-vs-target pair as a review input and forbids reconstructing it from memory once it
  is out of context. It is stored so later Batches review against the same pair.
- how used: construction method first - frame build, edge grammar, control solidity, material
  finish. Motifs are not copied by default; any motif reuse is judged by Phase/object fit and
  runtime visual improvement under the Presentation Asset / Visual Delta gates.

## Batch 1 presentation graphics

No third-party asset is used. The inline graphic is a bespoke 13x9 pixel pip drawn in
`dist/ui/ui.css` as a data URI, on the Opening's supporting rule. One further attempt - a
re-cut bevel on the Opening's Primary - was made and removed: the runtime capture was
flatter than the shared Action geometry it replaced.

### MORNING production art — user-provided, project-generated
- shipped file:
  - `dist/ui/assets/presentation/morning/store-bg.png` — 1672x941, PNG RGB, no alpha, 1.28 MB
- evaluated and removed from the build:
  - `board-frame-panel.png` — 1774x887, PNG RGBA, 419 KB
  - `board-frame-plank.png` — 1774x887, PNG RGBA, 470 KB
- source: provided by the User on 2026-09-22, generated with GPT image generation for this
  project. Not a third-party work: no external licence is claimed and none applies.
- modification: none. Stored byte-identical to the files as received (md5 verified against
  the originals). Any later derivative is recorded separately when it is made.
- role: `store-bg.png` is the MORNING store environment - stage only, no baked text, controls,
  board content or day information. The two `board-frame-*.png` were candidate notice-board
  frames, drawn frame with a fully transparent content region.
- adopted: `store-bg.png`, as the MORNING room. It is owned by `.store`, the bands' common
  parent, in `dist/ui/director-review.css`, so the whole authored room - ceiling included -
  reads as one place; `cover` crops horizontally only at the shipped widths, so no authored
  zone is lost. It is reused by OPENING as the closed, unlit store the preparation sheet
  stands in. The file is not altered in either use.
  An earlier integration cropped it into the wall band to preserve the procedural ceiling.
  That was rejected on runtime review: discarding the art's own ceiling left old ceiling plus
  a pasted middle strip, which is not one room.
- evaluated and REJECTED, both frames, on runtime capture:
  - `board-frame-plank.png` was integrated with `border-image` 9-slice. Technically correct -
    corners unstretched, rails repeating - and still a downgrade: a frame sized to carry its
    corner brackets opens an interior the live notice does not fill, so a quiet day read as a
    small notice inside a large decorative shell. The board's own CSS construction is tighter.
  - `board-frame-panel.png` was captured in the same role first and read flatter and more
    generic against the store's wooden fixtures.
  - reason, both: dynamic content fit - excess interior dead space around live notice content.
  - Neither is referenced, so neither ships: the files are removed from `dist/` rather than
    left in the build as dead weight. They remain recoverable from this repository's history
    (commit `8f5af05`) if a concrete content-fit hypothesis is ever proposed.
- note for review: measured, these read as high-resolution painted art in a pixel idiom rather
  than true pixel art - 159k unique colours in the backdrop, 10-18k in the frames, and 1px
  run lengths where GUILD24's own art uses flat blocks. That is a runtime-crispness and
  house-consistency question, answered by capture, not by the numbers.
