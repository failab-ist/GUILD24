# SESSION HANDOFF — v2.4 adoption

Operational note for resuming work in a fresh session. **This is not a spec.** It carries
no design rules and no canonical numbers; where it names a rule it names only *where the
rule lives*. Canonical is authoritative for Design; the Source is authoritative for what is
currently implemented.

---

## A. CURRENT SOURCE STATE

| | |
|---|---|
| Integration branch | `claude/v2.4-full-adoption` |
| HEAD | `731d36f72c8d13df2dac3026d97aad653fec11ed` |
| Chunk F branch (kept, same SHA) | `claude/v2-4-chunk-f-ui-3c1t4p` |

**Chunks A–F: COMPLETE.** A data vocabulary / item / dungeon / supply · B event ·
C order / reroll / relic · D NPC / trait / sale · E final expedition ·
F UI / UX / visual redesign + copy. Per-chunk detail: `reports/_checkpoint_log.md`.

Passing at this HEAD:

- `npm test` — core, revision (23), delta (14), vocabulary (9), events (12),
  relic/order (10), traits (11), final (7), **night (6)**, **ui-guard (14)**,
  **assets (3)**, canonical
- `npm run qa:visual` — clean, 21 captures at 360 / 390 / 430 into `reports/ui/`.
  Also swept clean at 11 widths (320–1200) × 5 heights (360–1180) and landscape
- Headless smoke: a full run walks morning → order → sell → night → closing → end,
  save export/import round-trips, and every Night report renders through Presentation
- `git diff -- canonical/` — **0 files**, at every commit in A–F

---

## B. SOURCE ARCHITECTURE — what a new session must know

**Shape.** Hand-written static build under `dist/`; no bundler. `dist/systems/*` is the
game, `dist/ui/*` is presentation, `dist/data/*` is the catalog. One optional build step
exists: `npm run assets` (vendors + subsets fonts, see `reports/ASSETS.md`).

**The line F did not cross.** The phase machine, `render()` → per-phase dispatch,
`action()` dispatch, state, Save and RNG were not touched. F replaced presentation only.

**Presentation layer.**

- `dist/ui/app.js` — one screen builder per phase (`morningScreen`, `orderScreen`,
  `saleScreen`, `nightScreen`, `closingScreen`, `finalScreen`, `relicTakeover`,
  `renderModal`). Each phase has its own composition; none reuses another's shell.
- `dist/ui/presentation.js` — the vocabulary layer, and now the **Night copy source**:
  `nightTone / nightVerdict / nightHappened / nightWhy / nightChanges / nightWeight`
  and `supplyLines / supplyImpact`. All read one resolved report, so the outcome label,
  WHAT_HAPPENED, WHY and WHAT_CHANGED cannot describe different states. Screen code
  renders these; it does not compose outcome copy itself. **Keep it that way** — this is
  what makes the matrix testable without a browser.
- `dist/ui/scene.js` — procedural scene assets and the **asset-slot layer**.
- `dist/ui/ui.css` — the single stylesheet. Mobile-first, no `max-width` queries, zero
  non-zero `border-radius`; depth is hard bevel and offset, never blur.
- `dist/ui/art.js` — pixel sprites and marks. `Art.avatar` is now **fallback only**.

**Shared NPC production-art resolver — read this before touching any NPC portrait.**

```
portrait(n, size, cls)      dist/ui/app.js
  └─ Scene.npcArt(n)        dist/ui/scene.js   → production sticker, or null
       └─ Scene.manifest['npc.<npcId>']  per-NPC override
       └─ Scene.npcPool                  the pool, resolved from ui/assets/npc/
  └─ Art.avatar(n, size)    only when no production asset resolves
```

Every player-facing portrait goes through `portrait()` — Sale, Night, the notebook list
and detail, the Final muster — so one adventurer keeps one face across the whole game.
The box is square and the sticker is `object-fit:contain`: never cropped, stretched or
recoloured, and nothing is baked into the PNG (rarity, name, level and job are DOM
layers). **Adding a new NPC surface means calling `portrait()`, not `Art.avatar`.**
`tests/ui-guard.cjs` fails if a screen calls the legacy avatar directly.

**Sale card geometry** is derived, not drawn to fixed numbers: the card is a flow column
(frame → portrait box sized to the payload → nameplate at its natural height) and the
waiting backs are the same shape scaled. Do not reintroduce fixed pixel heights there.

**Where tests live.**

| Path | Covers |
|---|---|
| `tests/core.cjs` `regression.cjs` `delta.cjs` `revision.cjs` | engine and adoption deltas |
| `tests/vocabulary.cjs` `events.cjs` `relic-order.cjs` `traits.cjs` `final.cjs` | chunks A–E |
| `tests/night.cjs` | the Night outcome matrix — drives the real resolver over 900 seeded expeditions and asserts label / story / cause / change / quote / next NPC state all describe one resolved result; contradictions found in QA are pinned as fixtures |
| `tests/ui-guard.cjs` | UI contracts, the §8.1 Playwright boundary, the art resolver, the Night copy source, Closing attribution |
| `tests/assets.cjs` | vendored fonts and licences |
| `tests/canonical.cjs` | canonical conformance |
| `tools/qa-visual.cjs` | the visual gate. `QA_WIDTHS` / `QA_HEIGHT` / `QA_SCREENS` sweep beyond the standard three widths |

Chromium is preinstalled at `/opt/pw-browsers`. **Never run `playwright install`.**
Playwright is a devDependency; nothing under `dist/**` may reference it and `npm test`
must not require it.

---

## C. NEXT WORK

**Chunk G — Save / full integration / tests / simulation.** Scope is defined in
`reports/V2_4_EXECUTION_PLAN.md` §"Chunk G": the final Save contract, determinism and
save→load→continue equivalence, the Night skip contract, the added simulation policies and
extended metric set, a multi-seed balance run and a fresh `reports/BALANCE.md`, and the
implementation-bug vs balance-observation classification discipline. **G measures and
reports; it does not tune.**

**Chunk H — documentation only.** README / WORK_STATE / TODO reset to v2.4, regenerated
audit reports, final adoption report. No code change; if H finds a code problem it files it.

**Do not redo A–F.** They are complete and integrated. Do not re-audit, re-fix or
re-litigate their implementations. If G or H finds a genuine defect in A–F work, file it
and fix only that defect — no reworking of settled decisions, and no unrelated refactor.

---

## D. CANONICAL ACCESS

1. Start from `canonical/SPEC_INDEX_v2.4.0.md`.
2. Open only the owning Spec plus its QA doc for the task in hand. Do not pre-read the set.
3. **Canonical is authoritative for Design. Source is authoritative for the current
   implementation.** Where they disagree, that is a finding, not a licence to edit either.
4. `canonical/**` is **read-only**. Every chunk so far ends with `git diff -- canonical/`
   empty; keep it that way.
5. **Do not reconstruct Canonical from this handoff.** Nothing here restates a rule,
   threshold, formula or catalog value, and nothing here may be cited as one.

---

## E. NOT-YET-ADOPTED PACKAGES — status only, do not implement now

- **Approved 203-name package.** Approved but not adopted into the source. When it is
  adopted it carries a **production gender-tag matching requirement** — names must line up
  with the character asset's gender tag. Not implemented; no partial adoption has been made.
- **Full production NPC character asset pool.** Pending. Not delivered, not adopted.
- **The five NPC PNGs currently in `dist/ui/assets/npc/`** were supplied as **layout-test
  assets** to validate the presentation architecture. They are **not the final pool** and
  are not a content decision. The resolver in §B is what the real pool drops into:
  extend `Scene.npcPool`, or map per NPC through `Scene.manifest['npc.<npcId>']`. No screen,
  layout or per-NPC rule should need to change.

---

## F. NON-CANONICAL FUTURE DESIGN — DO NOT IMPLEMENT

- **Multi-boss / four-boss identity concept.** Discussed as a future direction only.
  **NOT CANONICAL. DO NOT IMPLEMENT** unless the User later promotes it into Canonical.
  Do not design around it, do not leave hooks for it, do not reference it as a constraint.

---

## G. TUNING GUARD

- **PASS3 balance tuning remains blocked pending explicit User approval.**
- Observed candidates — including any boss-power candidate recorded in
  `reports/_checkpoint_log.md` — are **evidence, not instructions**. Do not apply them
  automatically, and do not apply them as a side effect of "making a test pass".
- A measured-but-unapplied candidate is the correct outcome. Report the number, change
  nothing, and let the User decide.
