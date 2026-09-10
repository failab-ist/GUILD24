# GUILD24 — Chunk F presentation assets

Every third-party asset in the build, with its licence and why it was chosen.
Regenerate the vendored copies with `npm run assets`.

## Adopted

### Galmuri 2.40.3 — bitmap pixel font family
- source: npm `galmuri` (https://github.com/quiple/galmuri), (c) Lee Minseo
- licence: **SIL OFL-1.1** (SIL Open Font License 1.1) — commercial use YES, embedding YES, modification YES,
  attribution: keep the OFL notice (shipped at `dist/ui/fonts/OFL.md`), the font may not
  be sold on its own.
- why: the single highest-impact change available. A real Korean bitmap face designed for
  12-15px turns the whole interface from "web page in a game palette" into game type.
  Nothing else reachable covers Hangul at pixel sizes.
- how: subset to the 702 glyphs this build can render and re-encoded to woff2 by
  `tools/vendor-assets.py`. 4 faces, 1.7 MB -> 63 KB total. Vendored, not CDN: a local
  subset is faster than any CDN here, has no FOUT, and keeps the game playable offline.
- faces / design sizes (bitmap, so only integer multiples are crisp):
  Galmuri14 15px (body) · Galmuri11 12px (labels) · Galmuri11 Bold 12/24px (display) ·
  GalmuriMono11 12px (numerals).

### anime.js 4.5.0 — animation runtime
- source: npm `animejs` (https://animejs.com), (c) Julian Garnier
- licence: **MIT** (SPDX: MIT) — commercial use YES, modification YES, attribution: keep the notice
  (shipped at `dist/ui/vendor/anime.LICENSE.md`).
- why: game feel. Shutter lift, stamp impact, price-tag swing, coin count-up and the Night
  result beat are timing problems, not CSS problems.
- how: the UMD build is vendored to `dist/ui/vendor/`. Presentation only: no system under
  `dist/systems/` or `dist/data/` references it, and the UI checks `typeof anime` so the
  game runs correctly if it is absent. Asserted by `tests/assets.cjs`.

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
