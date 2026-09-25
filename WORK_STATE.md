# WORK_STATE

DATE: 2026-09-25
STATE: V2_9_1_BALANCE_DECIDED — OWNERS AMENDED, SOURCE ADOPTION PENDING (separate session)

## Current

- repository: `failab-ist/GUILD24`
- `main` = v2.9.0 close-out `3f18ceb`; Pages deploys main (the unbalanced v2.9.0 state, User accepted); no tag yet (tagging v2.9.0 is the User's call)
- the balance work is **v2.9.1** (User 2026-09-25)
- balance branch: `claude/sleepy-volta-ywkjeu` — balance decided with the User, owners amended docs-first
- Design entry: `design_ssot/SPEC_INDEX_v2.8.0.md` (header: FREEZE_STATUS / SOURCE_ADOPTION_STATUS / UNRESOLVED)
- decided values: `reports/v29-balance-agreements.md`; measurements and accepted gaps: `reports/v29-balance-ideal.md`
- owner amendments: `design_ssot/CHANGELOG.md` §v2.9.1 (commit per owner); `npm run ssot:check` PASS
- last tagged release: v2.8 (`49a291f`)
- completed v2.8 history: `archive/WORK_HISTORY_v2.8.md`

## In Progress

- none — the docs-first step is committed; Source adoption has not started

## Next — v2.9.1 SOURCE ADOPTION

Read AGENTS.md first and follow it.

- Active task: adopt the v2.9.1 owner amendments in Source, one owner-sized batch per commit, then re-verify and close the release.
- Batches (owner -> Source entry points):
  1. DUNGEON_HAZARD -> `dist/systems/dungeon.js`: outcome Fatigue (중상 0), Severe shares `.42/.13` (real + shadow paths),
     `STRAIN` / strainFor (consecutive injured only), death roll (preparedFactor × levelFactor, removed band -> 중상 .36 / 부상),
     SALE death-risk estimate (levelFactor), retreat healing in the injury step, `WALLET_MULT` success 1, `GATE` 1.20 / 0.80;
     bad-luck assist in `dist/systems/shop.js` night loop (skip `d.deep`, Final excluded)
  2. ITEM -> `dist/data/catalog.js` items (effects, buy, sell = buy × 2, supply)
  3. ECONOMY_ORDER / CORE_RUN -> `dist/systems/shop.js` dayBase / level factor / `startGold`
  4. META / BOSS -> `dist/data/decorations.js` (capitalRates, prices, decorationParams, effect strings),
     `dist/data/catalog.js` balance (`wallVisitorChance`, `bossPower`, bossTuning `greedShortfallCap` / `slothBossPower`),
     `dist/systems/adventurer.js` premium weights, `dist/systems/meta.js` deathLimit (segments + 추모 방명록 +2)
  5. UI -> MORNING / ORDER status line `사망 {n} / {limit} · D{end}까지` and the 만반의 준비 tutorial (`dist/ui/app.js`), screenshot-driven
  6. 길드 합동 위령제 Event (EVENT §23, COPY_AUDIT §13-23), Night lines for retreat healing and 만반의 준비 (COPY_AUDIT §19-9),
     NPC-detail row `연속 부상 출발 {n}회` (UI_UX)
- Tests that pin old values (update only to the amended owner values): tests/night.cjs, tests/integration.cjs, tests/revision.cjs,
  tests/final.cjs, tests/relic-order.cjs, tests/copy.cjs, tests/ui-guard.cjs, tests/simulation.cjs, tests/progression.cjs,
  tests/acquisition.cjs, tests/antifarm.cjs (and any other the run surfaces)
- Measurement harness: `tools/remeasure-v29-variants.cjs` (+ worker); the closing spec is recorded in
  `tools/remeasure-v29-closing-results.json` — after adoption the native build should reproduce it without patches
- Close-out: `npm test`, `npm run ssot:check`, `npm run qa:runtime`, qa:visual for the UI batch, regenerate `reports/deco-balance`,
  then SPEC_INDEX / CHANGELOG state, tag `v2.9.1` (SPEC_INDEX §v2.9.1 — BALANCE lists the close conditions)
- Decisions still open (User): none
- **Implementer entry point: `reports/v291-implementation-handoff.md`** (batch map, anchors, test expectations, verification)

## Execution Boundary

```text
one owner batch
-> Source + tests for that owner
-> targeted verify
-> commit
-> next batch
```

## Blocker

None.
