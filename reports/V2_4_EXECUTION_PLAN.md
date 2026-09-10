# GUILD24 v2.4 FULL ADOPTION — EXECUTION PLAN

> **Status: APPROVED.** Saved from the approved Plan-Mode draft as the first action
> of the adoption campaign, before any Source implementation.
> Approved by the User on branch `claude/v2.4-full-adoption`, base `main` @ `8620d84`.
>
> This file is an implementation roadmap. **It is not Canonical.** It may be updated
> only to reflect approved implementation sequencing — never to redefine Design.
> On any conflict, `canonical/**` wins.

---

## CONTEXT

`canonical/` was frozen at **v2.4.0** (commit `8620d84`) but **Source has never been
adopted past v2.1**. Git history shows exactly one source commit (`2b92eb8`
`pre-v2.2-adoption`) followed by three canonical-only commits (v2.2 snapshot,
v2.3 freeze, v2.4 freeze). `README.md` still says "v2.1", and `WORK_STATE.md` /
`TODO.md` still track v2.1.0 documents and pre-freeze design questions.

Consequence: this is not a v2.3→v2.4 delta. It is a **three-generation adoption**
(v2.2 + v2.3 + v2.4) executed in one campaign. The good news, verified by reading
the real files, is that canonical converged toward the source in several areas —
the Relic pool, reroll curve, Keystone gate, living-NPC cap, phase machine and the
Monster-Knowledge earn rule are already canonical-shaped. The conflicts are
concentrated in **Event, Final, Trait catalog, Hazard vocabulary, Supply Burden and
the entire UI layer**.

Goal of this campaign: make `dist/**` satisfy the frozen v2.4 canonical contract,
with tests and simulation evidence, without touching `canonical/**`.

---

## 1. REPOSITORY STATE

| Fact | Value |
|---|---|
| Remote | `https://github.com/failab-ist/GUILD24` |
| Current branch | `claude/guild24-v2.4-adoption-plan-949yht` |
| Other local branch | `main` |
| HEAD | `8620d84` — `canonical: freeze v2.4.0 before source adoption` |
| Working tree | **clean** (verified before and after running tests) |
| Node | v22.22.2 |

### Scripts (verified in `package.json`, not assumed)

```
dev      node tools/preview.cjs                 # static QA server on :5173, serves dist/
test     node tests/core.cjs && tests/regression.cjs && tests/delta.cjs && tests/canonical.cjs
balance  node tests/balance.cjs 300             # 16 strategy cohorts × 300 seeds
audit    node tests/coverage.cjs                # WRITES reports/*.md — not run in Plan Mode
```

**Baseline: `npm test` PASSES at HEAD.** Output: core + 23 revision groups + 14
DELTA groups + natural D0–D30 canonical integration. This is a green pre-adoption
baseline — every later red must be attributed, never absorbed.

### Architecture facts that change how we work

- **`dist/` is not a build output. It is the hand-written source**, loaded as
  plain `<script>` tags from `dist/index.html` onto a `globalThis` namespace
  (`G.DATA`, `G.Game`, `G.Dungeon`, `G.Relics`, `G.Meta`, `G.Save`,
  `G.Presentation`, `G.Debug`). No bundler, no transpile, no import graph.
- **Zero runtime and dev dependencies. No `node_modules`.** Tests are plain
  `node:assert` CommonJS that `require()` the dist files for their side effects.
- Source is written in a **dense one-statement-per-line style** (196 lines /
  46 KB for `dist/ui/app.js`). Match it; do not reformat files while editing them
  or every diff becomes unreviewable.
- Load order in `dist/index.html` is significant and must be maintained when files
  are added.
- Chromium is preinstalled at `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH` set),
  but the **Playwright npm package is not installed** — see §8.

### Source inventory

| Area | Files |
|---|---|
| Data | `dist/data/catalog.js` (11.5 KB), `dist/data/relics.js` (7.7 KB) |
| Systems | `rng.js`, `adventurer.js`, `dungeon.js`, `meta.js`, `save.js`, `shop.js` (19.8 KB), `relics.js`, `run.js`, `simulation.js` |
| UI | `app.js` (45.8 KB), `presentation.js`, `art.js`, `audio.js`, `style.css`, `screens.css`, `revision.css` |
| Tests | `core`, `revision` (23 groups), `delta` (14 groups), `canonical`, `relic-effects`, `coverage`, `balance`, `experiment` |

---

## 2. CANONICAL INTEGRITY

| Check | Result |
|---|---|
| Canonical set | `GUILD24_CANONICAL_v2.4.0` |
| File count | **21** — matches `SPEC_INDEX` CANONICAL FILE SET exactly |
| All files at v2.4.0 | YES (no stray v2.1/v2.2/v2.3 files remain) |
| `FREEZE_STATUS` | `FROZEN` |
| `IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED` | `NONE` |

**Blockers: NONE.** Every catalog needed for adoption is fully specified in
canonical with approved v2.4 starting numerics:

- `NPC_TRAIT` §ACTIVE TRAIT CATALOG — all 30 Traits, with effects and internal directions
- `ITEM` §ACTIVE CATALOG — all 30 Items, with categories, roles, supply values
- `RELIC` §RELIC BLUEPRINTS — all 30 Relics, 12/8/6/4
- `EVENT` §catalog — all 22 Events, with per-event eligibility, effect and reveal copy
- `FINAL_EXPEDITION` — complete replacement spec including formulas

This is a **transcription-and-wiring** campaign, not a design campaign.

`canonical/**` is read-only for the entire campaign. Every chunk ends with a
canonical write guard (§12).

---

## 3. CURRENT SOURCE ASSESSMENT

Legend: **MATCH** already canonical · **KEEP** reusable as-is · **PATCH** targeted
edit · **REPLACE** rewrite the mechanism · **LEGACY_PRESENT** non-canonical residue
that must be removed · **BLOCKED** cannot proceed.

### Already canonical — do not rebuild (verified, contrary to the working hypothesis)

| Subsystem | Verdict | Evidence |
|---|---|---|
| Phase machine MORNING→ORDER→SALE→NIGHT→CLOSING | **MATCH** | `shop.js` `morning/open/night`, `run.js` `beginOrder/finishOrder/finishNight/closeDay`; phase id is `sell` internally |
| Reroll cost curve + pity | **MATCH** | `run.js:rerollPrice` → 30/60/120/240; `generateOffers({advancePity:false})`; `발주 교환권` free use consumes first step — matches `ORDER-001` + `RELIC-003` exactly |
| Relic pool composition | **MATCH** | `data/relics.js` — 30 relics, Foundation 12 / Hybrid 8 / Keystone 6 / Utility 4, names identical to `RELIC` blueprints |
| Relic windows + Keystone gate | **MATCH** | `relics.js:relicWindow` — `[5,10,15,20,25,30]` + D0; `r.kind!=='keystone'\|\|day>=10`; expiry `day+5`; max owned 7 |
| Living NPC cap semantics | **MATCH** | `shop.js:addNPC` counts `alive` only → recovery does not free, death does (`NPC-001`) |
| Monster Knowledge earn rule | **MATCH** | `meta.js:observe` — `report.items.length && outcome!=='사망'` is already `META-002`. Only the **wording** is legacy |
| Final Power formula / roll | **MATCH** | `run.js:boss` — `.58/.32/.24/.16 − hazard×.35`, `support=1` (no job-diversity synergy), roll `.88+next()*.24` = 0.88–1.12 |
| Consumer slots | **MATCH** | `Adventurer.slots` — 2, 3 at Lv10+ |
| Gate count / family introduction | **MATCH** | 3 starter families, `familyIntro=[rng.int(4,7), rng.int(8,12)]` |
| Start state | **MATCH** | 1200G, capacity 24, overhead 60G, 6 offers, 3–6 visitors, correct starting stock |
| Price modes | **MATCH** | `D.pricing` = 50/100/150, no free mode |
| RNG / seeding / save-restore of `rngState` | **KEEP** | `rng.js` sfc-style, state persisted; `tests/canonical.cjs` already proves Gate + Relic window survive save/load |
| Simulation harness | **KEEP** | `Debug.simulate(count,policy,account,pricing,build)` with 7 policies × 5 pricings × 8 builds and deep per-day metrics |

### Conflicts requiring work

| Subsystem | Verdict | What is wrong |
|---|---|---|
| **Hazard vocabulary** | **REPLACE** | `D.hazards` has 15 keys. Canonical has 9. `mire` **missing entirely**; `slow` used in its place (`familyTiers.slime`, `hazardState`, `boots`). `supply/armor/undead/fatigue/long/wet` are non-canonical hazard entries |
| **Thirst / caffeine / alcohol** | **LEGACY_PRESENT** | `dungeon.js` runs `e.survival -= e.thirst`, and `mult.caffeineMult` / `mult.alcoholMult` chains. `ITEM-002`, `DUN-004`, `ITEM` §PENALTY RULE forbid all three |
| **`undead` as hazard** | **LEGACY_PRESENT** | `dungeon.js`: `if(d.tags?.includes('undead') && e.undead) e.combat += e.undead`. `DUN-001`/`ITEM` forbid `undead` as a hazard |
| **Item catalog** | **PATCH** | 30 items present but 3 wrong: `dragon` (용의 숨결 핫바) and `goggles` (탐사 고글) are not in canonical; `boots`/`compass` need rework/rename. Missing: 부식 방지 코팅제, 쿨링 이온음료, 설원 고글. Supply values wrong or absent on most Food/Drink |
| **Return Stone** | **PATCH** | `escape:0.55`; `ITEM-003` says `+50%p` → `0.50` |
| **Supply Burden** | **REPLACE** | `makeDungeon`: `supplyPressure = rng.int(0,2)` for **all tiers including T1**. `DUN-006` requires T1=none, T2 35%/req 3, T3 55%/req 5, and one shared expedition-wide deficit penalty |
| **Combat variance** | **PATCH** | `D.balance.combatNoise = .135`; `DUN-005` approved starting value is `0.175` |
| **FIRE family second axis** | **PATCH** | `familyTiers.fire = [['fire'],['fire'],['fire']]` with a flat `+6` power. Canonical T2/T3 need the non-hazard higher-combat-power axis to actually scale |
| **Tier day-band curve** | **PATCH** | `tierWeights` anchors drift from canonical at D13–24 (source ~20/65/15 and 5/50/45 vs canonical 30/60/10 and 10/60/30). Canonical marks exact % as PASS3, so this is low-priority alignment |
| **Event system** | **REPLACE** | 15 events, **74% daily chance**, uniform `rng.pick`, no eligible-day filter, no per-event eligibility, no rare weighting. Canonical: 22 events, 35%, D3–D29 minus relic days, weight 1.0 / 0.35. Canonical text explicitly states `기존 74% 발생률은 사용하지 않는다` |
| **Event catalog** | **PATCH+ADD** | 14 of 15 map to canonical. `길드 원정주간` is not canonical → remove. 8 missing: 게이트 순례주간, 독안개, 보급 상단 도착, 길드 급여일, 치유소 휴무, 본사 폐기 지원, 늙은 음유시인, 본사 야간 근무 수칙 |
| **Final Expedition** | **REPLACE** | `D.dungeons` contains a `boss` pseudo-gate (마왕 아르카돈, scale 5.5); `run.js:boss()` **re-runs `Dungeon.resolve` on every party member after a successful clear** — directly forbidden by `FINAL-001` `postClearNormalResolve=NO`. No 2-family roll, no disclosure, no 4.6 hazard scale, no survivor fallback |
| **Trait catalog** | **REPLACE** | 20 traits; canonical requires exactly 30. All three explicitly-removed traits (카페인중독 / 술고래 / 언데드혐오) are still active and hard-wired into `dungeon.js` and `shop.js:interest` |
| **Trait exclusions** | **PATCH** | 6 pairs; canonical requires 9 (adds 수집가↔실속파, 지구력↔쉽게 지침, 사교적인↔낯가림) |
| **Trait semantic tone** | **REPLACE** | `presentation.js` derives good/bad **from the numeric sign** (`negative.has(k) ? value>0 : value<0`). `TRAIT-003` states `semanticToneInferredFromNumericSign=NO` |
| **Trait quality labels** | **LEGACY_PRESENT** | `D.traitDirections = {positive:'▲ 이점', mixed:'◆ 양면', negative:'▼ 약점'}` — the exact strings `TRAIT-003` / `UI-Q34` forbid |
| **Trait visibility gate** | **PATCH (honesty bug)** | `Presentation.traits(n)` shows only 2 traits until `loyalty>=21`, but `Dungeon.prepare` resolves **all** traits. Hidden traits change outcomes — violates `SALE` §SALE INFORMATION HONESTY and `ITEM` `Material hidden behavior=NO` |
| **Relic build labels** | **LEGACY_PRESENT** | `D.buildNames` (박리다매/단골 육성/고마진/원정 전문/신선식품/상권) must never reach the player (`RELIC-005`, `REL-Q39`) |
| **Relic focused reveal** | **PATCH** | `relicWindow` state has no `focusedRevealSeen`; `RELIC` §WINDOW STATE and `REL-Q38` require it persisted so reload cannot replay the reveal |
| **Owned-relic quick view** | **PATCH** | Read-only owned-relic view required in Morning/Order/Sale (`RELIC-005`, `REL-Q40`) |
| **냉장 쇼케이스** | **PATCH** | `coldcase` gates on `rarity>=2`; canonical `eligible=Uncommon+` → `rarity>=1` |
| **원정 도시락 코너** | **PATCH** | `expeditionMeal` boosts on any matching hazard key; canonical adds `SupplyBoostOnlyIfSupplyBurdenActive` |
| **Next-day Tier forecast** | **ADD** | `Dungeon.tierWeights` exists but no exact next-day T1/T2/T3 % is exposed before Order. Required by `ECO`/`ORD-Q09–Q11`, `UI-Q09` |
| **Gold rounding** | **PATCH** | `Math.round` almost everywhere, but `run.js:liquidate` uses `Math.floor(buy*.5)`. `ECO-003` requires one rule across UI/affordability/payment/history/closing |
| **Stat terminology** | **PATCH** | `presentation.js labels.combat = '전투'`; `COPY-001` requires `투력` (전투 is reserved for the act of fighting) |
| **Monster Knowledge copy** | **PATCH** | `D.unlocks.knowledge15 = ['몬스터 관찰',15]`; must become `보급 생환 N회` (`META-002`, `UI-Q39`) |
| **NPC name pool** | **REPLACE** | 150 names, heavily 서양/성서 (노아·바엘·카엘·아몬·레온·에단·아벨·가브리엘계) plus `-린/-란/-온` syllable repetition. `COPY-002` / §15 explicitly rejects both patterns and names 요화니우스 / 지오니아 / 민자이 / 고쉬스앵 as tone anchors |
| **Legacy `upgrade` phase** | **LEGACY_PRESENT** | `run.js:upgrade`/`upgradeChoices` and the `simulation.js` `'upgrade'` branch (referencing the excluded facility `potionFridge`) are dead pre-Relic paths. `RELIC` §ACTIVE POOL BOUNDARY names 포션 냉장고 as excluded |
| **Minimal-engagement coverage** | **ADD** | `simulation.js` has no zero-sale / zero-order / zero-supply / poverty policy. `RUN-Q30`, `ECO-Q12`, `DUN-Q20` require the comparison |
| **UI layer** | **REPLACE** (Chunk F) | See §7 |
| **Save schema** | **PATCH** | `guild24.save.v4`, `migrate()` is identity. Item/trait/hazard/event identity all change → v4 saves must be rejected cleanly, not silently mangled |

---

## 4. CHUNK PLAN

Each chunk is a **new session**. The durable handoff is
`reports/V2_4_EXECUTION_PLAN.md` + `reports/_checkpoint_log.md` + git history +
current Source/tests + the owning canonical only.

Universal per-chunk completion criteria (in addition to the per-chunk list):

- `npm test` green, or every red explicitly classified as *stale test updated to
  canonical* vs *real regression* in the checkpoint
- `git diff --name-only <start>..HEAD -- canonical/` returns **zero lines**
- the PASS3 numeric change gate (§10) is satisfied
- checkpoint appended to `reports/_checkpoint_log.md`
- one commit boundary per chunk (sub-commits allowed inside a chunk)

---

### Chunk A — Data Vocabulary + Item / Dungeon / Supply

**Scope.** Establish the canonical 9-hazard vocabulary, the canonical 30-Item
catalog, canonical Supply Burden, and the approved combat-variance value. This is
the foundation every later chunk depends on.

1. **Hazards → exactly 9.** Add `mire`; make `slow` an internal alias of `mire`
   only and remove it from player-facing data; drop `supply/armor/undead/fatigue/long/wet`
   from `D.hazards`. Update `familyTiers.slime` → `mire`. Add the `mire` rule to
   `Dungeon.hazardState` (`mobility`, weight `.4`, i.e. the current `slow` rule).
   Keep `보급 부담` as a **global pressure label**, not a hazard entry.
2. **Delete legacy resolution keys.** Remove `e.survival -= e.thirst`, the
   `caffeineMult`/`alcoholMult` chains, and the `undead` tag combat bonus from
   `dungeon.js:prepare`. Remove `thirst`/`caffeine`/`alcohol` keys from item data.
3. **Item catalog → canonical 30.** Remove `dragon`, `goggles`. Rework `boots` →
   `진창용 원정 장화` (`slow`→`mire`, rarity 1) and `compass` → `설원 고글`
   (rarity 1). Add `부식 방지 코팅제` (corrosion Direct, rarity 1) and
   `쿨링 이온음료` (fire Hybrid, rarity 2, supply 4). Set canonical `supplyValue`
   on every Food/Drink (rice 5, water 3, ramen 5, bar 4, choco 2, coffee 2,
   ice 2, candy 1, lava 5, energy 3, wine 3, premium 7, ion 4). Remove the
   non-RiskReward `fatigue` penalties on 초코바/캔커피/에너지드링크 (`ITEM`
   §PENALTY RULE; 초코바 `hiddenPostFatigue=NO`). Keep 용사의 곡주's explicit
   mobility trade-off (it is a canonical RiskReward).
4. **Return Stone** `escape` `.55` → `.50` (`ITEM-003`).
5. **Supply Burden → canonical contract.** In `makeDungeon`, replace
   `supplyPressure = rng.int(0,2)` with tier-gated generation: T1 never;
   T2 35% chance / `requiredSupply` 3; T3 55% / 5. In `Dungeon.prepare`, replace
   the `supply*7` heuristic with `actualSupply` vs `requiredSupply` producing one
   shared expedition-wide readiness penalty. D30 rolls no Supply Burden.
6. **`combatNoise`** `.135` → `.175` (`DUN-005`).
7. **FIRE second axis.** Scale dungeon combat power at T2/T3 for the FIRE family
   as a non-hazard axis; do not add a `fire` hazard entry per tier.
8. **Tier band alignment** toward canonical D13–18 / D19–24 targets (PASS3-tunable,
   record before/after weights in the checkpoint).
9. **Player categories/roles** aligned to `ITEM`: `[Food, Drink, Medical, FieldGear,
   Insurance, Special]`; role vocabulary per `ITEM` §FUNCTIONAL ROLE.
10. **Save version bump `4` → `5`.** `Save.valid` rejects v4 cleanly with the
    existing `읽지 못했습니다` path; no migration branch (`CORE_RUN` §SAVE/LOAD
    explicitly permits invalidation).

**Expected files.** `dist/data/catalog.js`, `dist/data/relics.js`,
`dist/systems/dungeon.js`, `dist/systems/shop.js` (`makeDungeon`, `tierWeights`
call site), `dist/systems/save.js`, `dist/ui/presentation.js` (label map only),
`tests/delta.cjs`, `tests/revision.cjs`, new `tests/vocabulary.cjs`.

**Out of scope.** Event selection, Relic behavior, Trait catalog, Final, any UI
composition work, NPC naming.

**Dependencies.** None — this is the root chunk.

**Tests.** New `tests/vocabulary.cjs`: exactly 9 hazard keys; zero occurrences of
`thirst/caffeine/alcohol/long/wet/armor/undead` in resolution paths (`DUN-Q19`,
`ITEM-Q17`, `TRAIT-Q13`); item count 30 and identity match; every active Food/Drink
`supply > 0`; Return Stone `escape === .50`. Extend `delta.cjs` for Supply Burden
tier eligibility and the shared-penalty contract (`DUN-Q17`). Update the existing
`food traits/relics enhance nutrition...` group for the new nativeCore scope.

**Save/RNG risk. HIGH.** Adding a conditional `supplyPressure` roll changes the
number of `rng.next()` calls per `makeDungeon`, so every downstream draw shifts.
All seeded balance baselines are invalidated from this chunk onward — this is
expected, not a regression. `tests/balance-results-v3/v4.json` become historical.

**Commit boundary.** One commit: `feat(data): adopt v2.4 hazard vocabulary, item
catalog and supply burden`.

**Completion criteria.** `npm test` green; `tests/vocabulary.cjs` green; a full
`Debug.simulate(30,'balanced')` run reaches D30 without stalling; zero canonical
diff.

---

### Chunk B — Event

**Scope.** Replace the Event engine and complete the 22-event catalog.

1. **Eligibility.** Eligible days = D3–D29 minus `[5,10,15,20,25]`. No event on
   D0/D1/D2/D30. (Canonical counts 22 eligible days.)
2. **Frequency.** `dailyEventChance = 0.35`, max 1/day, no stacking. Delete the
   `.74` literal.
3. **Weighted selection.** Normal weight 1.0, rare easter egg 0.35
   (늙은 음유시인, 본사 야간 근무 수칙) via `rng.weighted`.
4. **Per-event eligibility filter** applied before selection, e.g.
   게이트 순례주간 requires ≥2 open Gates **and** expected visitors ≥3;
   독안개 excludes Gates that already carry `poison`; 한파 excludes existing
   `cold` and fire fields (`EVENT-002`).
5. **Catalog → 22.** Remove `길드 원정주간`. Add: 게이트 순례주간, 독안개,
   보급 상단 조착 → 보급 상단 도착 (+2 offers), 길드 급여일 (today-only wallet
   +20%, never persisted), 치유소 휴무, 본사 폐기 지원, 늙은 음유시인 (+2 visitors,
   **no roster addition**), 본사 야간 근무 수칙 (today's overhead = 0G).
6. **게이트 순례주간 mechanics.** Roll `affectedCount` uniformly from {1,2,3};
   select that many visiting NPCs with the seeded run RNG; keep each one's
   `claimedDestination` (player-facing 예상 목적지) and change `destination` to a
   different open Gate. Nothing is revealed during Morning/Order/Sale. Night shows
   `게이트 순례주간 · 실제 변경 N명` and per-NPC `예상 목적지 → 실제 목적지`.
   This reuses the existing `destination`/`claimedDestination` split that 허세
   already uses — no new field, no new phase.
7. **Event reveal hook.** Add the data/state needed for a MORNING focused reveal
   (event object + `revealSeen` persisted). Visual treatment lands in Chunk F;
   Chunk B only guarantees the state and ordering exist.

**Expected files.** `dist/data/catalog.js` (events array), `dist/systems/shop.js`
(`morning` event selection + effect application), `dist/systems/run.js`,
`dist/systems/save.js` (event reveal state), `dist/ui/app.js` (minimal reveal
plumbing only), `tests/events.cjs` (new).

**Out of scope.** Event visual design, Relic, Trait, Final.

**Dependencies.** Chunk A (hazard vocabulary — 독안개/한파 add canonical hazards).

**Tests.** New `tests/events.cjs`: no event on D0/D1/D2/D5/D10/D15/D20/D25/D30;
observed rate ≈35% over many seeded days; exactly 22 catalog entries with canonical
names; rare pair appears at measurably lower frequency; 게이트 순례주간 never fires
with <2 Gates or <3 expected visitors; 독안개 never doubles `poison`; 본사 야간 근무
수칙 sets `daily.operating` to 0; 길드 급여일 does not persist wallet into the next
day.

**Save/RNG risk. HIGH.** The event roll moves and changes the per-morning RNG call
count. `revealSeen` is new persisted state — extend `Save.valid`.

**Commit boundary.** One commit: `feat(event): adopt v2.4 event engine and 22-event catalog`.

**Completion criteria.** `npm test` + `tests/events.cjs` green; 300-seed
`Debug.simulate` shows ≈7–8 events/run (canonical target `22 × 0.35 ≈ 7.7`); zero
canonical diff.

---

### Chunk C — Order / Reroll + Relic

**Scope.** Reroll is already canonical — **verify and lock it with tests, do not
rewrite it.** The real work is Relic state, taxonomy leakage, and the missing
next-day Tier forecast.

1. **Reroll: KEEP + test.** Prove 30→60→120→240, daily reset, `발주 교환권`
   0G→60G→120G→240G, pity not advanced and not farmable (`ORD-Q04–Q08`, `ORD-Q12`,
   `REL-Q24`).
2. **`focusedRevealSeen`** added to `relicWindow`, persisted, validated in
   `Save.valid`; reload must not replay the reveal (`REL-Q38`).
3. **Internal taxonomy never reaches the player.** `kind` and `tags` stay internal;
   `D.buildNames` is retained for simulation/balance only and must not be read by
   any player-facing path (`REL-Q39`).
4. **Owned-relic read-only quick view** data API for Morning/Order/Sale; Sale
   access must not permit buy/defer (`REL-Q40`). Rendering lands in F.
5. **`coldcase`** eligibility `rarity>=2` → `rarity>=1` (`REL-Q33`).
6. **`expeditionMeal`** gated on matching need: hazard-counter boost only when the
   effect matches a known Gate hazard, supply boost only when Supply Burden is
   active (`RELIC` blueprint 17).
7. **Next-day Tier forecast.** Expose exact `tierWeights(day+1)` as T1/T2/T3
   percentages before Order commitment. Next-day family/gate/visitors stay hidden
   (`ORD-Q09–Q11`).
8. **Gold rounding audit.** `liquidate` `Math.floor` → `Math.round`; sweep every
   Gold path for a single rule (`ECO-Q02`).
9. **Remove the dead `upgrade` path**: `run.js:upgrade`, `upgradeChoices`, the
   `simulation.js` `'upgrade'` branch and its `potionFridge` reference
   (`REL-Q37` — 포션 냉장고 is an explicitly excluded facility).

**Expected files.** `dist/systems/relics.js`, `dist/systems/run.js`,
`dist/systems/shop.js`, `dist/systems/save.js`, `dist/data/relics.js`,
`dist/systems/simulation.js`, `tests/relic-effects.cjs`, `tests/delta.cjs`,
`tests/canonical.cjs`.

**Out of scope.** Trait, Final, UI composition.

**Dependencies.** Chunk A (item rarities feed `coldcase`/offer weights), Chunk B
(events modify offer counts).

**Tests.** Extend `tests/canonical.cjs` (already covers window/defer/expiry/cooldown/
save stability) with `focusedRevealSeen` non-replay. New assertions for the forecast
boundary, rounding consistency, and taxonomy-string absence.

**Save/RNG risk. MEDIUM.** New persisted field; removing the `upgrade` branch
changes no RNG draws. The forecast is read-only and consumes no RNG.

**Commit boundary.** One commit: `feat(relic,order): focused reveal state, quick
view, tier forecast and rounding`.

**Completion criteria.** All reroll/relic QA assertions green; forecast visible
before order commitment in a scripted run; zero canonical diff.

---

### Chunk D — NPC / Trait / Sale

**Scope.** The largest data replacement plus the semantic-tone rework.

1. **Trait catalog → canonical 30**, transcribed from `NPC_TRAIT` §ACTIVE TRAIT
   CATALOG with `internalDirection` and per-effect `[benefit|cost|neutral]`
   metadata attached at the **effect** level, not the trait level.
2. **Remove 카페인중독 / 술고래 / 언데드혐오** and every hard-wired reference:
   `shop.js:interest` (`caffeine` +20%p, `eater` +12%p food bias) and
   `presentation.js:traitText` (eater/caffeine/drinker appended strings).
3. **Exclusion pairs 6 → 9** (add 수집가↔실속파, 지구력↔쉽게 지침, 사교적인↔낯가림);
   탐욕 and 구두쇠 must remain co-selectable (`TRAIT-Q04`).
4. **대식가 / 소식가 rework.** Not a blanket `foodMult`: Food **native core** stat/
   recovery ±30/20% plus Supply ∓1 per Food item (minimum 1). Hazard counters,
   insurance and RiskReward magnitudes are never amplified (`TRAIT-Q07`, `ITEM-Q14`).
5. **Semantic tone replaces sign inference.** Rewrite `Presentation.rows` so each
   effect line carries canonical tone from data. Delete `D.traitDirections`
   (▲ 이점 / ◆ 양면 / ▼ 약점) and every consumer.
6. **Remove the loyalty-gated trait reveal.** `Presentation.traits(n)` currently
   shows 2 traits below loyalty 21 while `Dungeon.prepare` resolves all of them.
   Show what actually resolves (`SALE` §SALE INFORMATION HONESTY).
7. **Wire the 13 new traits into their owning systems**, reusing what exists —
   no new subsystem:
   - 수집가 / 실속파 → rarity-conditioned purchase interest in `shop.js:interest`
   - 낯가림 → `buyBias` for `visits <= 2`
   - 사교적인 / 냉담한 → visitor selection weight in `morning`
   - 회복체질 / 허약함 → `recovery` duration in `Dungeon.resolve`
   - 지구력 / 쉽게 지침 / 악바리 → expedition `fatigue` gain
   - 준비성 → per Food/Drink Supply
   - 눈썰미 / 해독가 / 수족냉증 → hazard counter values
8. **NPC name pool rework** per `COPY_WORLD_VOICE` §15: 한국식 어감 + 판타지 변형 +
   occasional wordplay, anchored by 요화니우스 / 지오니아 / 민자이 / 고쉬스앵.
   Western high-fantasy names may remain but must not dominate; no `-우스/-엘/-리온`
   monoculture; no syllable soup; not an all-meme list.
9. **Stat label** `전투` → `투력` (`COPY-001`, `UI-Q32`).
10. **Monster Knowledge copy** `몬스터 관찰` → `보급 생환 N회` (`UI-Q39`). The earn
    rule itself is already correct — do not touch `meta.js:observe` logic.

**Expected files.** `dist/data/catalog.js` (traits, names), `dist/data/relics.js`
(exclusions, direction map removal), `dist/systems/adventurer.js`,
`dist/systems/dungeon.js`, `dist/systems/shop.js`, `dist/systems/meta.js` (labels),
`dist/ui/presentation.js`, `tests/traits.cjs` (new), `tests/delta.cjs`.

**Out of scope.** Final, UI composition, event catalog.

**Dependencies.** Chunk A (Supply model for 대식가/소식가/준비성), Chunk B
(게이트 순례주간 destination interaction with 허세).

**Tests.** New `tests/traits.cjs`: exactly 30 active traits with canonical names;
카페인중독/술고래/언데드혐오/평정심 absent (`TRAIT-Q15`); all 9 exclusion pairs
enforced across **both** acquisition paths (`Adventurer.create` and the level-5
milestone in `Adventurer.grow`) and the rare mentor Event; no trait effect reads a
legacy key (`TRAIT-Q13`); every material effect carries an explicit tone
(`TRAIT-Q01`); a negative-numeric benefit (e.g. `injuryRisk -4%p`) renders as
benefit; visible trait set equals resolved trait set.

**Save/RNG risk. HIGH.** Trait IDs change → v4/v5 saves with removed traits must be
rejected. Trait generation consumes RNG via `rng.shuffle(D.traits)` — a 20→30 pool
changes the shuffle and every subsequent draw. Name-pool size change shifts
`rng.pick` too.

**Commit boundary.** One commit: `feat(npc,trait,sale): adopt 30-trait catalog,
semantic tone and canonical name voice`.

**Completion criteria.** `tests/traits.cjs` green; a 100-seed simulation shows all
30 traits reachable and no excluded pair co-occurring; zero canonical diff.

---

### Chunk E — Final Expedition

**Scope.** Full replacement of D30 per `FINAL_EXPEDITION`.

1. **Delete the `boss` pseudo-gate** from `D.dungeons` and the `makeDungeon('boss')`
   branch. No normal Gate generation on D30.
2. **Roll 2 distinct canonical Families** with the seeded run RNG; **persist the
   result** so save/load cannot reroll it (`FINAL-Q F`).
3. **Disclose both Families before** party selection, supply decisions and the D30
   Relic decision.
4. **Final Hazard Pool** = the union of each Family's existing **T2** hazard keys.
   Hazard scale **4.6** (not the v1 `5.5`). FIRE's higher-combat-power axis does
   **not** enter the pool — Boss Power owns the boss's own strength.
5. **Party.** Max 3. Survivor fallback: ≥3 → player picks exactly 3; 2 → 2; 1 → 1;
   0 → immediate Run Fail. No underfill bonus, no headcount multiplier, no
   auto-fill.
6. **Resolution.** Reuse `Dungeon.prepare` unchanged. Individual Final Power
   `투력×.58 + 강인함×.32 + 기동×.24 + 정신×.16 − 환경피해×.35` (already correct);
   sum; × roll `0.88–1.12`; compare to Boss Power.
7. **Remove the post-clear resolve loop.** On clear, the Run is immediately won —
   no per-NPC injury/severe/death/survival pass afterward. This is the single
   largest behavioral bug in the current source.
8. **No extra Supply Burden roll at D30.** Food/Drink still contribute their normal
   effects.
9. **Final lock.** After lock, management actions cannot retroactively alter Final
   state.
10. **Boss Power** stays at the current `230` as a **provisional retained Source
    baseline for the first integrated v2.4 simulation — NOT an approved Canonical
    starting value.** `FINAL_EXPEDITION` §9 explicitly leaves the exact numeric
    unfixed, to be tuned after full-run balance; `SPEC_INDEX` §FREEZE/PASS3 permits
    provisionally carrying the current Source number because the mechanic
    (`bossStrengthAxis=BossPower`) is canonical-compatible. Record in the checkpoint
    that 230 was tuned against the *old* Final structure and is therefore expected to
    be wrong. **Do not tune it in this chunk** — it falls under the §10 PASS3
    numeric change gate.

**Expected files.** `dist/data/catalog.js` (remove boss dungeon),
`dist/systems/run.js` (`boss`, `selectFinal`, `supplyFinal`),
`dist/systems/shop.js` (`morning` D30 branch, `makeDungeon`),
`dist/systems/save.js`, `dist/systems/simulation.js` (final branch),
`tests/final.cjs` (new).

**Out of scope.** Final UI composition (Chunk F).

**Dependencies.** Chunks A (T2 hazards, supply) and D (traits/conditions feed prepare).

**Tests.** New `tests/final.cjs`: two **distinct** families; hazard pool = union of
their T2 keys and nothing else; scale exactly 4.6; families identical across
save→load→save; clear ⇒ run ends immediately with **zero** `Dungeon.resolve` calls
afterward; survivor fallback for 3/2/1/0; no Supply Burden on the Final gate; D30
Relic purchasable before lock and inert after.

**Save/RNG risk. HIGH.** The D30 state shape changes; the family roll adds RNG
draws. `Save.valid`'s dungeon check (`D.dungeonBy[d.id]`) must accept the new Final
gate shape.

**Commit boundary.** One commit: `feat(final): replace D30 with canonical two-family
final expedition`.

**Completion criteria.** `tests/final.cjs` green; 100-seed simulation reaches and
resolves D30 with a non-degenerate clear rate; zero canonical diff.

---

### Chunk F — UI / UX / Visual Redesign + Copy  *(xhigh)*

See §7 for the full redesign plan. Scope summary:

1. Per-phase composition replacing the shared card shell (Morning / Order / Sale /
   Night / Closing / Relic / Final).
2. CSS architecture: consolidate `style.css` + `revision.css` + `screens.css` into a
   token-driven system; mobile-first.
3. Mobile QA at **360 / 390 / 430** with real screenshots (`UI-Q38`).
4. Hazard pressure explanation for **all 9** hazards, tap/focus accessible, never
   hover-only (`UI-005`, `DUN-Q21`, `UI-Q35`).
5. Trait presentation with semantic tone, no ▲/◆/▼, no quality-graded headers
   (`UI-Q34`).
6. Relic: milestone focused reveal, Buy / `나중에 결정`, owned quick view in
   Morning/Order/Sale (read-only in Sale), zero taxonomy labels (`UI-Q36`, `UI-Q37`).
7. Event focused reveal before Gate detail; no separate Event phase (`UI-004`).
8. Next-day Tier forecast as a clearly secondary Order element (`UI-Q09`).
9. Coach-mark/spotlight tutorial replacing in-flow instructional cards (`UI-003`).
10. Copy pass against `COPY_WORLD_VOICE`: terminology, no debug language in Night,
    `보급 생환 N회`.

11. **Visual QA harness** — add `playwright` to `devDependencies` **only**, under the
    §8.1 boundary contract, plus `npm run qa:visual` (separate from `npm test`) and
    a rebuilt `dist/qa-mobile.html` covering 360 / 390 / 430 instead of only 390.

**Out of scope.** Any gameplay rule, formula, catalog or phase-order change. If a
rule looks wrong during F, record it — do not fix it here. Also out of scope: any
broad E2E suite; the Playwright surface stays at the minimum §8.1 allows.

**Dependencies.** A–E all complete (F renders their data).

**Save/RNG risk. LOW** — presentation only. Tutorial-completion state is the one
persisted addition. Adding a `devDependency` carries **no** runtime risk provided
the §8.1 contract holds.

**Commit boundary.** Sub-commits are expected here: (F1) CSS/token foundation +
visual QA harness, (F2) Morning+Order, (F3) Sale, (F4) Night+Closing,
(F5) Relic+Final+Event reveal, (F6) mobile QA fixes + copy pass.

**Completion criteria.** All `UI-Q01`–`UI-Q39` walked; screenshots captured at three
widths for seven screens and stored under `reports/ui/`; `npm test` still runs on a
bare checkout with **no** `npm install`; `grep -r playwright dist/` returns zero
hits; the AI-SLOP checklist in `UI_UX` §AI-SLOP CHECK answered NO on every line.

---

### Chunk G — Save / Full Integration / Tests / Simulation

**Scope.**

1. **Save contract.** Final `Save.valid` covering every v2.4 field (relic window +
   `focusedRevealSeen`, event reveal state, Final state, tutorial state). Confirm
   v4 rejection is clean and non-destructive (backup preserved).
2. **Determinism.** Same seed + same inputs ⇒ identical run. Save→load→continue
   produces the same outcomes as an uninterrupted run (`RUN-Q10`–`Q13`, `Q19`).
3. **Skip contract.** Night Skip/Skip All change presentation only (`SKIP CONTRACT`).
4. **Simulation additions** — this is the chunk that answers §6 of the brief:
   - `zero-sale`, `zero-order`, `zero-supply`, `poverty` policies added to
     `Debug.simulate`
   - metric set extended: Day reached, Gold, Meta XP/unlocks, NPC growth/value,
     Knowledge, Final viability, per-strategy Meta reward efficiency
5. **Multi-seed balance run** (`npm run balance 300`) and a fresh
   `reports/BALANCE.md`, replacing the stale v3/v4 result files.
6. **Classification discipline.** Every finding is filed as **IMPLEMENTATION BUG**
   (canonical value implemented wrong → fix source) or **BALANCE OBSERVATION**
   (canonical starting/PASS3 value implemented correctly but poor outcome → report
   evidence + candidate, change nothing).
7. **The PASS3 numeric change gate (§10) applies to this chunk in full.** G measures
   and reports; it does not tune.

**Expected files.** `dist/systems/save.js`, `dist/systems/simulation.js`,
`tests/*.cjs`, `tests/balance.cjs`, `reports/BALANCE.md`, `reports/AUDIT.md`.

**Dependencies.** A–F.

**Completion criteria.** Full `npm test` green; `npm run balance 300` completes;
`RUN-Q30` / `ECO-Q12` / `DUN-Q20` answered with numbers, not adjectives.

---

### Chunk H — README / WORK_STATE / TODO / Reports  *(Sonnet 5, medium)*

**Scope.** Mechanical documentation only. Rewrite `README.md` (currently says
"v2.1", "상품 27종", "특성 20종"), reset `WORK_STATE.md` and `TODO.md` to the v2.4
state, regenerate `reports/COVERAGE.md` / `ITEM-PRICES.md` / `TRAITS.md` /
`RELICS.md` via `npm run audit`, and write the final v2.4 adoption report.

**Out of scope.** Any code change. If H finds a code problem, it files it — it does
not fix it.

**Completion criteria.** No `dist/**` diff in the chunk; docs match the shipped
build; zero canonical diff.

---

## 5. SESSION / EFFORT PLAN

| Session | Model | Effort | Rationale |
|---|---|---|---|
| Plan | Opus 5 | high | architecture + canonical/source reconciliation |
| A | Opus 5 | high | vocabulary + catalog + supply is the correctness root |
| B | Opus 5 | high | RNG/eligibility/save correctness |
| C | Opus 5 | high | reroll/relic/save interactions; mostly verification |
| D | Opus 5 | high | 30-trait transcription + semantic tone + acquisition paths |
| E | Opus 5 | high | deterministic Final state replacement |
| F | Opus 5 | **xhigh** | visual redesign is the one quality-first exception |
| G | Opus 5 | high | integration, determinism, simulation |
| H | Sonnet 5 | medium | mechanical docs/reports only |

**Deviations from the default table: none.** The table as given fits the work found
in the repo.

Rules carried into every session:

- Do not change model or effort mid-session.
- If HIGH hits a hard blocker, **stop and checkpoint**; start a fresh focused rescue
  session at XHIGH. MAX only if a focused XHIGH still fails.
- ULTRACODE is not the default for this project and is not selected merely because
  it ranks above other options.
- Fable is not used — token efficiency is a project constraint.
- No agent teams / dynamic workflows.

**Possible split points** if a chunk proves too large in the real repo:
- **D** → D1 (catalog + tone + presentation) / D2 (new-trait wiring + naming)
- **F** is already pre-split into F1–F6

**Available options note.** This environment exposes model choice
(`opus`/`sonnet`/`haiku`/`fable`) and effort levels `low / medium / high / xhigh /
max`. The default table maps 1:1 with no substitution needed.

---

## 6. SAVE / RNG RISKS

| Risk | Chunk | Mitigation |
|---|---|---|
| Item/trait/hazard/event IDs change → v4 saves reference dead keys | A, B, D | Bump `guild24.save.v4` → `v5` in **Chunk A**; `Save.valid` rejects v4 through the existing user-facing message; the `.backup` key preserves the original bytes. No migration branch (`CORE_RUN` §SAVE/LOAD permits invalidation) |
| RNG call-order drift invalidates every seeded baseline | A, B, D, E | Accept and declare it. Re-baseline balance once in Chunk G. Treat `tests/balance-results-v3/v4.json` as historical from A onward — never cite them as v2.4 evidence |
| Intra-campaign saves not portable across chunks | A–F | Dev-only concern. Document in each checkpoint; no compatibility shims between adoption chunks |
| Save/Load used as a reroll exploit | C, E, G | `focusedRevealSeen` persisted (`REL-Q38`); Final family pair persisted (`FINAL` §F); `tests/canonical.cjs` already asserts Gate + relic window stability — extend, don't replace |
| `Save.valid` silently rejects a legitimate new run | A–E | Every chunk that adds persisted state adds a matching `Save.valid` clause **and** a round-trip `Save.import(Save.export(...))` assertion in the same chunk |
| Night resume duplicates rewards | G | `RUN-Q13` + `SKIP CONTRACT` assertions: resolved results stable across save/resume; skip changes presentation only |
| New trait pool size changes `rng.shuffle` consumption | D | Expected; covered by the Chunk G re-baseline |

---

## 7. UI REDESIGN PLAN

### 7.1 What the UI actually is today

- **One** `render()` at `app.js:17-26` rewrites `#app.innerHTML` wholesale; a nested
  ternary at `app.js:21` dispatches to per-phase builders. String templates, no
  framework, no components.
- Per-phase builders already exist and already emit **distinct** section classes
  (`.morning-screen`, `.order-screen`, `.sale-screen`, `.night-screen`,
  `.closing-screen`, `.inventory-section` for Final). **Phase identity is partially
  present structurally** — this is a real asset. The problem is the *inside* of each
  screen, not the routing.
- 3 CSS files, ~665 rule blocks, **~170 distinct hex values for a nominally 7-token
  palette**. `style.css` and `revision.css` define **two competing `:root` blocks
  under the same variable names**; `screens.css` — the sheet that actually styles the
  live shell — uses **zero custom properties** and hardcodes 56 hex literals.
  `revision.css` is a pure override sheet that strips `border-radius`,
  `background-image` and `box-shadow` — the residue of an abandoned visual reset.

### 7.2 Current problems, mapped to canonical

| Problem | Evidence | Canonical |
|---|---|---|
| **No hazard explanation anywhere** | Hazards printed as bare nouns at `app.js:38, 52, 94, 97, 111`. Zero tooltip CSS, zero `mouseover/focusin/touchstart` handlers in the whole UI | `UI-005`, `DUN-Q21`, `UI-Q35` — all 9 hazards need a consistent pressure line |
| **The one tooltip that exists is hover-only** | `app.js:7` — the single `title=` attribute in the UI, on a `<span class="tag">` (not focusable, no tap path) | `hoverOnly=NO` |
| **Trait quality labels rendered** | `app.js:93` renders `D.traitDirections` (`▲ 이점 / ◆ 양면 / ▼ 약점`) and uses `direction` as a CSS class | `UI-Q34`, `TRAIT-003` |
| **Relic taxonomy rendered** | `app.js:110` prints `buildNames` joined with `기반/복합/핵심/보조` | `REL-Q39`, `RELIC-005` |
| **Owned Relics practically invisible** | Only a `점포지원 N/7` counter (`app.js:45`) and 9px labels inside a downscaled SVG (`art.js:44`). Order shows nothing; Sale shows nothing; `relicMenu()` lists only the *current window's* candidates | `REL-Q40`, `RELIC-005` `ownedRelicReadOnlyQuickView=[MORNING,ORDER,SALE]` |
| **`관찰 N회`** | `app.js:118` | `UI-Q39`, `META-002` |
| **Dashboard composition** | 4-up KPI tile row `.detail-stats{repeat(4,minmax(0,1fr))}`; `.closing-receipt` label/value ledger; grid containers for every list (`.order-list .sale-products .gate-summary .unlock-grid .upgrade-grid .npc-grid .menu-list`); `.phase-strip` numbered stepper | `UI-002`, `UI-Q02` AI-SLOP check |
| **Desktop-shrunk, not mobile-first** | Every breakpoint is `max-width` (the sole `min-width` query widens at 1450px). Desktop defaults get progressively shrunk downward | `UI` §RESPONSIVE RULE — "Do not solve desktop density by shrinking text" |
| **360px not exercised** | `screens.css:4` `@media(max-width:360px)` has only 6 declarations; `.product-body` keeps a fixed **152px** column from 361–700px; `qa-mobile.html` hardcodes 390 only | `UI-Q38` requires 360 / 390 / 430 |
| **No next-day Tier forecast surface** | `nextForecast()` exists at `app.js:39` but no exact T1/T2/T3 % | `UI-Q09`, `ORD-Q09` |
| **No Event focused reveal** | `.event-line` is an ordinary line in the Morning stack (`app.js:45`) | `UI-004`, `EVENT` §3-1 |
| **No milestone focused reveal** | `relicMenu()` is a passive modal; `foundation` force-opens it but D5–D30 do not | `UI-Q37`, `REL-Q38` |
| **Stat label `전투`** | `presentation.js:3` | `UI-Q32`, `COPY-001` → `투력` |
| **Legacy vocabulary in labels** | `presentation.js:3` — `thirst/undead/long/wet/slow/armor/caffeineMult/alcoholMult`; `catalog.js:52` hazard names `높은 방어/장기 원정/습지/언데드/기동 감소` | `DUN-Q19`, `TRAIT-Q13` |
| **Dead code** | `presentation.js:15` `known(d,g)` ignores `g` and returns all hazards, so the `위험 미확인` / `미확인 위험 있음` branches at `app.js:94` are unreachable | cleanup |

### 7.3 Keep vs replace

**KEEP** — genuinely reusable, do not rebuild:
- The `render()` → per-phase dispatch shape, and the per-phase builder split.
- The single delegated click handler (`action()` at `app.js:140`, delegation at `:191`).
- `presentation.js` as the pure format layer (its *contents* change in Chunk D; its
  role does not).
- `art.js` SVG pixel art — avatars, item icons, store scene. This is the only real
  game-object art in the project and it is the right direction.
- The coach-mark/spotlight system (`coachSteps` `app.js:67-74`, `showCoach()` `:76`)
  — it already matches `UI-003` (spotlight, not in-flow cards) including the JS
  bubble clamp at `app.js:83`.
- `button{min-height:44px;min-width:44px}` — the 44px contract already holds.
- `env(safe-area-inset-*)` usage in `screens.css:2, 3, 10, 12`.
- The `100dvh` non-scrolling shell with a scrollable `.screen-body`.

**REPLACE**:
- CSS architecture. Collapse `style.css` + `revision.css` + `screens.css` into a
  single token-driven sheet with **one** `:root`. Remove the dead legacy selectors
  (`.stage-grid`, `.layout`, `.store-panel`, `.sell-toolbar`, `.statsbar`) that
  `render()` never emits.
- The 4-up `.detail-stats` KPI row → 2×2 (`UI` §STAT PRESENTATION).
- Per-phase interior composition (below).
- The relic candidate card (`app.js:110`) — taxonomy line deleted, effect/condition/
  price promoted.
- `traitRows()` (`app.js:93`) — direction labels deleted, semantic tone lines added.

### 7.4 Phase-by-phase direction

| Phase | Question | Direction |
|---|---|---|
| **MORNING** | `오늘 어떤 날인가?` | Situation-reading. Event **focused reveal first**, before Gate detail, then the event-modified situation. Gate + known hazards **with pressure lines**. Expected visitor count. Owned-relic quick view entry. Store scene present but subordinate to the situation |
| **ORDER** | `무엇을 준비할까?` | Management screen. **Remove the store scene** (`UI` §ORDER: `Store scene: REMOVE from Order main composition`). Hierarchy: `DAY X · 본사 발주` → persistent funds (`보유 1,200G \| 선택 280G \| 발주 후 920G`) → compact today Gate/hazard reference → compact **next-day Tier forecast (secondary)** → offer list + quantity → full-offer reroll + cost → sticky confirm. Kill the 152px fixed product column below 700px |
| **SALE** | `이 손님에게 무엇을, 얼마에 팔까?` | Store scene gets **high** visual priority. One customer at a time. Mobile NPC order: portrait/name/job → 예상 목적지 → 2×2 stats → traits → condition → bag/equipment → secondary. Returning NPC delta layer before/alongside the unchanged profile. All sellable inventory visible; 50/100/150 explicit and easy to switch. Read-only owned-relic quick view. Keep the sequential inspect→item→price→result→next-slot flow — **do not batch it away** |
| **NIGHT** | `내 선택이 어떻게 됐을까?` | One adventurer at a time, WHAT_HAPPENED → WHY → WHAT_CHANGED. Routine success **compact**; growth/injury/death/decisive-item **emphasised**. Next / Skip / Skip All. 게이트 순례주간 summary line + `예상 → 실제` on affected cards. No debug language |
| **CLOSING** | `오늘 장사는 어땠을까?` | Economics-first: revenue, COGS, margin, overhead, waste, relic spend, final Gold. Optional compact `오늘의 보급 영향`. The receipt ledger is *correct* here — it is the one place a ledger belongs |
| **RELIC** | run-build choice | Milestone focused reveal once per window (`focusedRevealSeen`). 3 candidates, immediate comparison, effect/condition/price, obvious Buy / `나중에 결정`. **Zero taxonomy labels.** Must look like a run-defining choice, not a settings menu |
| **FINAL** | climax | Two disclosed Families **before** party selection and supply. Party ≤3 with survivor fallback. D30 relic decision before lock. Culmination framing, not a debug readout |

### 7.5 Mobile strategy

1. **Invert the breakpoint model.** Author the base sheet at 360px; add `min-width`
   queries for tablet/desktop. Stop shrinking a desktop layout down.
2. **Kill fixed columns below 700px.** `.product-body` 164/152px → `1fr`;
   `.detail-stats` 4-up → 2×2.
3. **Rebuild the QA harness.** `dist/qa-mobile.html` currently hardcodes a single
   390×844 iframe. Replace with all three canonical widths side by side.
4. **Capture real screenshots** at 360 / 390 / 430 for Morning, Order, Sale, Night,
   Closing, Relic reveal, Final prep (`UI-Q38`) and store them under `reports/`.
5. **Verify per width**: no zoom needed for core text; the current decision is
   obvious in the first viewport; sticky action + safe area reachable; the store
   scene does not push the decision below the fold; layout is recomposed, not scaled.
6. **Hazard info must have a tap path**, not just hover — this is the single most
   likely mobile failure and it currently has no implementation at all.

---

## 8. DESIGN / FRONTEND SKILLS & TOOLS

### Actually available in this environment

| Tool / Skill | Verdict |
|---|---|
| **Chromium at `/opt/pw-browsers`** (`PLAYWRIGHT_BROWSERS_PATH` set, `chromium` + `chromium_headless_shell`) | **Primary Chunk F tool.** The only way to satisfy `UI-Q38`'s "actual browser screenshot" requirement. Already present — never run `playwright install` |
| **Playwright** (`devDependencies` only) | **APPROVED (dev/QA-only).** See §8.1 for the boundary contract |
| `node tools/preview.cjs` (`npm run dev`) | **Use it.** Zero-dep static server on :5173 serving `dist/` — the screenshot target |
| `ui-ux-pro-max` skill | **Recommended for F only.** UI/UX database (styles, palettes, type pairings, UX guidelines, motion). Use for information-hierarchy and mobile-layout reference. Canonical always wins on conflict |
| `dataviz` skill | **Optional, Chunk G/H only** — if balance reports get charts |
| `run` skill | Useful for launching/driving the app in F |
| `design` skill (canvas artboards) | **Not recommended.** Produces a published Artifact canvas; this project ships a local static build with no external assets |
| `supanova-*` skills (3) | **Explicitly not recommended.** Landing-page / marketing-page engines that mandate Tailwind CDN and conversion-optimised marketing composition. Directly conflicts with `UI-002` (no SaaS/dashboard/marketing composition), `CORE_RUN` `externalAPI=NO / localAssets=YES`, and the zero-dependency architecture |
| `artifact-*` skills | Not applicable — no Artifact deliverable here |
| GitHub MCP (`mcp__github__*`) | Available. Use only where local `git` cannot do the job (PR creation). Local git handles branch/commit/push |
| WebSearch / WebFetch | Not needed. Canonical is complete and local |

### Recommended per chunk

- **A, B, C, D, E, G**: local `git` + file tools + `node` only. **No MCP, no design
  skills, no browser.**
- **F only**: `tools/preview.cjs` + headless Chromium via Playwright (dev-only, §8.1)
  + `ui-ux-pro-max`. Unload after F.
- **H**: file tools + `npm run audit`.

### 8.1 Playwright boundary contract — DECIDED

**Approved: Playwright, dev/QA-only. It must never become a game runtime
dependency.** Binding rules for Chunk F:

1. **`devDependencies` only.** Never `dependencies`. The shipped game must keep
   running from `dist/index.html` opened directly off the filesystem, with no
   install, no server, no `node_modules` — exactly as `CORE_RUN` requires
   (`architecture=static/local`, `externalAPI=NO`, `requiredServer=NO`).
2. **Nothing under `dist/**` may import, reference or require Playwright.** The QA
   harness lives in `tools/` and drives the app from the outside through
   `tools/preview.cjs`. A grep for `playwright` across `dist/` must return zero hits
   — assert this in `tests/`.
3. **`npm test` must not depend on Playwright.** The existing suite stays
   zero-dependency and runnable on a bare checkout. Visual QA gets its own script
   (`npm run qa:visual`) that is not part of `npm test`.
4. **Do not run `playwright install`.** Chromium already exists at
   `/opt/pw-browsers`; `PLAYWRIGHT_BROWSERS_PATH` and
   `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` are already set. If a pinned Playwright
   version disagrees with the installed build, launch with
   `executablePath: '/opt/pw-browsers/chromium'` rather than downloading.
5. **Minimum viable test surface only** — no broad E2E suite:
   - `UI-Q38` screenshot capture: 7 screens × 3 widths (360 / 390 / 430)
   - a small set of UI regression assertions that are genuinely un-assertable in
     Node: sticky action reachable within the viewport, no horizontal overflow at
     360px, hazard explanation reachable by **tap** (not only hover), 44px touch
     targets, safe-area not clipped
   - nothing that duplicates what `tests/*.cjs` already proves about game logic
6. `package-lock.json` and `node_modules/` are added to the repo's ignore/commit
   policy as appropriate; `node_modules/` is never committed.

Nothing was installed during Plan Mode.

---

## 9. TEST PLAN

Existing suites are reusable and stay the backbone: `core` (flow), `revision`
(23 groups), `delta` (14 groups), `canonical` (relic/save integration over a real
D0–D30 run), `relic-effects`, `coverage` (report generator), `balance`.

**Discipline.** When a test goes red, classify it before touching it:

- **stale test** — asserts pre-v2.4 behaviour that canonical has since changed →
  update the test to canonical and say so in the checkpoint
- **real regression** — asserts behaviour canonical still requires → fix the source

**Tests are never weakened to make adoption pass.** No assertion is deleted without
naming the canonical rule that retired it.

### New test files

| File | Chunk | Covers |
|---|---|---|
| `tests/vocabulary.cjs` | A | 9 hazards exactly; no `thirst/caffeine/alcohol/long/wet/armor/undead` in resolution; 30 items with canonical identity; every Food/Drink `supply > 0`; Return Stone `.50`; `combatNoise .175` — `DUN-Q19`, `ITEM-Q09/Q17/Q19`, `SIM-Q01` |
| `tests/events.cjs` | B | eligible-day set; ≈35% rate; 22-entry catalog; rare 0.35 weighting; per-event eligibility (게이트 순례주간, 독안개, 한파); 야간 근무 수칙 overhead 0; 급여일 not persisted — `EVENT-001/002/003` |
| `tests/traits.cjs` | D | 30 traits; the 3 removed absent; 9 exclusion pairs across **both** acquisition paths + mentor Event; no legacy keys; every material effect carries explicit tone; negative-numeric-as-benefit renders as benefit; visible set == resolved set — `TRAIT-Q01/Q03/Q04/Q13/Q14/Q15` |
| `tests/final.cjs` | E | 2 distinct families; hazard pool = union of T2 keys; scale 4.6; family pair stable across save/load; **zero `resolve` after clear**; survivor fallback 3/2/1/0; no D30 Supply Burden — `FINAL-001`, `RUN-Q14/Q16` |

### Extensions to existing files

- `delta.cjs` — Supply Burden tier eligibility + shared penalty (`DUN-Q17`); next-day
  Tier forecast timing/accuracy/boundary (`ORD-Q09–Q11`); Gold rounding consistency
  (`ECO-Q02`); refusal retry logic (`ECO-Q05–Q08`)
- `canonical.cjs` — `focusedRevealSeen` non-replay across save/load (`REL-Q38`);
  owned quick view read-only in Sale (`REL-Q40`); taxonomy strings absent from
  rendered output (`REL-Q39`)
- `relic-effects.cjs` — `coldcase` Uncommon+ (`REL-Q33`); `expeditionMeal` matching-need
  gating (`REL-Q31`); reroll relic step consumption (`REL-Q24`)
- `coverage.cjs` — regenerate role/category matrices against the new catalogs

### Coverage against the required list

| Required area | Where |
|---|---|
| catalog identity/count | `vocabulary.cjs` (items), `traits.cjs` (traits), `canonical.cjs` (relics 30/12/8/6/4) |
| legacy active keys | `vocabulary.cjs`, `traits.cjs` |
| Supply | `vocabulary.cjs`, `delta.cjs` |
| Event eligibility/state | `events.cjs` |
| reroll | `delta.cjs`, `relic-effects.cjs` |
| Relic windows/reveal | `canonical.cjs` |
| owned Relic quick view | `canonical.cjs` + F visual QA |
| Trait catalog/tone/exclusions | `traits.cjs` |
| all Trait acquisition paths | `traits.cjs` — `create`, level-5 milestone in `grow`, mentor Event |
| Monster Knowledge | `delta.cjs` (rule already passes: *"empty provisioning cannot grind knowledge"*) + copy assertion |
| Final | `final.cjs` |
| Save/Load determinism | `core.cjs`, `canonical.cjs`, G |
| RNG continuity | `delta.cjs`, G |
| terminology | `vocabulary.cjs` + `traits.cjs` string scans |
| mobile/visual QA | `npm run qa:visual` (F, Playwright dev-only) — `UI-Q38` screenshots as evidence, plus the few assertions Node cannot make: no horizontal overflow at 360px, sticky action inside the viewport, hazard info reachable by tap, 44px targets, safe area unclipped |
| Playwright containment | a `tests/*.cjs` assertion that `dist/**` contains zero `playwright` references, and that `npm test` runs with no `node_modules` present (§8.1) |

---

## 10. SIMULATION / BALANCE PLAN

`npm run balance` alone is **not** an acceptance signal. The existing harness
(`Debug.simulate`, `simulation.js`) is genuinely reusable: 7 policies × 5 pricing
modes × 8 build filters, with per-day cash/wallet/level/inventory/visitors/waste/
revenue/cogs/operating/loyalty/injury/death/affordability metrics plus
prepared-vs-bare counterfactual resolution (`out.impact`).

### Additions required (Chunk G)

1. **New policies**: `zero-sale`, `zero-order`, `zero-supply`, `poverty`
   (minimum-spend). These do not exist today and are the direct subject of
   `RUN-Q30` / `ECO-Q12` / `DUN-Q20`.
2. **New metrics**: Meta XP and unlocks per strategy, Knowledge gained, NPC
   long-term value, Final viability by strategy, Day-reached distribution.
3. **Re-baseline** every seeded number. `tests/balance-results-v3.json` and
   `-v4.json` are pre-adoption and become historical from Chunk A.

### Metrics to produce

Dungeon Tier/Family outcomes · prepared vs naked/minimal · Direct vs Hybrid counter
usage · Supply burden frequency and deficit rate · Item offer/order/sale/use rates ·
dead and universal items · Trait distribution / exclusion integrity / per-trait value ·
NPC growth, revisit, injury, death · Gold, waste, margin, pricing conversion · Relic
build-piece distribution, Keystone timing, dead offers · Event impact · Final clear
rate · **zero-engagement and poverty strategies** · Meta reward efficiency by strategy.

### Classification rule (non-negotiable)

- **IMPLEMENTATION BUG** — a canonical value implemented wrong → **fix Source**.
- **BALANCE OBSERVATION** — a canonical starting/PASS3 value implemented correctly
  but producing a bad outcome → **report evidence + candidate; change nothing.**

### PASS3 NUMERIC CHANGE GATE — no automatic tuning

> **Authority:** `SPEC_INDEX_v2.4.0.md` §FREEZE / PASS3 POLICY. This section is the
> operating procedure for that policy and is the **single** place in this plan where
> the gate is defined. Everywhere else in this document refers here; nothing
> restates it.

**Any PASS3 numeric — Meta XP weights, daily overhead, Boss Power, reroll curve,
tier weights, trait/item numerics — must not be changed by simulation findings
alone.** The only permitted sequence is:

```
Simulation evidence
→ file as BALANCE OBSERVATION (never as a fix)
→ propose candidate value(s) with the multi-seed evidence behind them
→ USER APPROVAL
→ change
```

No numeric change may land before user approval. A chunk that discovers a PASS3
problem **reports and stops on that number** — it does not "correct" it in passing,
even when the direction seems obvious.

### Pre-classified items

- **`dailyOverhead 60G`** — canonical v2.4 starting baseline
  (`META-003`, `CORE_RUN`). PASS3. Subject to the gate above: report only.
- **`bossPower 230`** — **provisional retained Source baseline for the first
  integrated v2.4 simulation; NOT an approved Canonical starting value.**
  `FINAL_EXPEDITION` §9 states Boss Power's exact numeric is not fixed and is tuned
  after full-run balance. `SPEC_INDEX` §FREEZE/PASS3 permits provisionally retaining
  the current Source numeric because the underlying mechanic (`bossStrengthAxis=
  BossPower`) is canonical-compatible. Note that 230 was tuned against the *old*
  Final structure (scale 5.5, post-clear resolve), so it is expected to be wrong.
  Subject to the gate above: report only.
- **`Meta XP formula`** (`meta.js:finish` — `day*3 + win*100 + discoveries*5 +
  maxLevel*3 + regulars*5`) — the day-count term is the main day-farming vector.
  `META-003` `minimalEngagementDayFarmingEfficient=NO` is a frozen **outcome**
  requirement, but **the exact weights are PASS3 and are covered by the gate above.**
  If simulation shows zero-engagement play is efficient, that is a **BALANCE
  OBSERVATION** with a proposed reweighting candidate — **not** a licence to retune
  the weights in-chunk. Adding a diligence meter / inactivity gauge / naked-run tax
  remains forbidden outright.

---

## 11. MANUAL PLAYTEST — `MANUAL PLAYTEST NEEDED`

Not simulation-appropriate; requires a human at the keyboard:

- **Sale rhythm** — does inspect→item→price→result→next-slot feel continuous, or
  like paperwork?
- **Night pacing** — do routine successes pass quickly while a death actually lands?
- **Event friendliness** — does the focused reveal feel like an opening beat or an
  interruption? Is ~7–8 events/run the right felt frequency?
- **Tutorial comprehension** — can a new player reach D3 without confusion? Does the
  destination-reliability coach mark teach the *system rule*, not 허세?
- **NPC attachment** — do 2–4 trusted regulars actually emerge? Does the new name
  pool read as 한국식 판타지 with a wink, rather than syllable soup or a meme list?
- **Item choice feel** — is preparation a real judgment, or an obvious tax?
- **UI hierarchy** — does each phase feel like a different screen, or one template
  with different text?
- **Mobile usability** — real device at 360/390/430, not just a resized desktop
  window.
- **Does it feel like a game?** — the `UI_UX` §AI-SLOP CHECK questions, answered
  honestly by a person.

---

## 12. GITHUB EXECUTION PLAN

**Base.** Branch from the confirmed latest `main` (which carries canonical v2.4.0).
Verify `git fetch origin main` and that `main` still contains the 21 v2.4.0 files
before branching.

**Branch. DECIDED: `claude/v2.4-full-adoption`.** The user has explicitly authorised
pushing to this branch instead of the session's originally designated
`claude/guild24-v2.4-adoption-plan-949yht`. Create it from the confirmed latest
`main`:

```
git fetch origin main
git checkout -B claude/v2.4-full-adoption origin/main
git push -u origin claude/v2.4-full-adoption
```

The approved plan file and `reports/_checkpoint_log.md` land on this same branch as
its first commit, before any Source work.

**Rules.**
- No direct implementation on `main`
- No force push, no history rewrite
- No merge to `main` without explicit user approval
- **`canonical/**` changed files must remain 0** for the entire campaign

**Per-chunk loop.**

```
IMPLEMENT
→ targeted tests
→ npm test
→ git diff --stat            (review the whole diff)
→ git diff --name-only <start>..HEAD -- canonical/     # MUST be empty
→ commit
→ git push -u origin <branch>   (retry 2s/4s/8s/16s on network failure only)
→ append + commit reports/_checkpoint_log.md
→ end session
```

**Commit boundaries.** One commit per chunk; sub-commits inside a chunk are fine
(Chunk F is pre-split F1–F6). Conventional-commit subjects scoped by chunk.

**Pull request.** Not created unless the user explicitly asks.

---

## 13. REPORT / CHECKPOINT PLAN

### `reports/V2_4_EXECUTION_PLAN.md`

This document, saved verbatim on approval as the **first action** of the next
session, before any Source implementation. It is a roadmap, **not Canonical**. It may
be updated only to reflect approved implementation sequencing — never to redefine
Design.

### `reports/_checkpoint_log.md` (new)

Appended after every completed chunk. Short. No diffs, no full logs:

```
## CHUNK <X> — <name>
start HEAD:        <sha>
end/commit:        <sha>
files changed:     <list>
KEEP/PATCH/REPLACE: <one-line summary>
tests run:         <commands> → <result>
implementation note: <the one thing the next session must know>
design proposal:   NONE | <id + status>
balance observation: NONE | <PASS3 numeric + evidence + candidate>   # per §10
remaining issue:   <or NONE>
next chunk:        <Y>
```

### Final v2.4 reports (Chunk H)

- `reports/BALANCE.md` — regenerated multi-seed, replacing the stale v3/v4 data
- `reports/COVERAGE.md`, `ITEM-PRICES.md`, `TRAITS.md`, `RELICS.md` — via `npm run audit`
- `reports/V2_4_ADOPTION_REPORT.md` — final adoption summary + QA coverage matrix
- `reports/ui/` — the `UI-Q38` screenshots (7 screens × 3 widths)
- `README.md`, `WORK_STATE.md`, `TODO.md` rewritten to the v2.4 state

---

## 14. DESIGN PROPOSAL / USER DECISION REQUIRED

### Design proposals: **NONE**

No genuine Design problem was found. Every conflict between Canonical and Source
resolves as an Implementation Bug or Adoption Gap with an unambiguous canonical
answer. All catalogs (30 Traits, 30 Items, 30 Relics, 22 Events) are fully specified
with approved v2.4 starting numerics, `FREEZE_STATUS=FROZEN`, and
`IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE`. The previously-blocking `TODO.md`
items **F01** (Final aggregation / fewer-than-three fallback) and **D01** (active cap,
rounding, Keystone start, reroll-support model) are all now explicitly resolved in
`DECISIONS_v2.4.0` and `FINAL_EXPEDITION_v2.4.0` — those TODO entries are stale, not
open.

### Non-design decisions — both RESOLVED by the user

1. **Branch: `claude/v2.4-full-adoption`** — explicitly authorised, superseding the
   session's originally designated branch. See §12.
2. **Mobile QA: Playwright, dev/QA-only** — approved as a `devDependency` that is
   never wired into the game runtime, with only the minimum tests needed for
   `UI-Q38` and later UI regression QA. The full boundary contract is §8.1; the
   key constraints are: `dist/**` never references Playwright, `npm test` stays
   zero-dependency, no broad E2E suite, and `playwright install` is never run
   (Chromium is already present).

### Implementation notes flagged for awareness (not approvals)

- **Orphaned unlock.** Removing 용의 숨결 핫바 (Chunk A) leaves `D.unlocks.fire12`
  (`화염 골렘 처치`) gating nothing. Recommendation: leave it as an inert progress
  counter — it is still tracked by `meta.observe` and still displayed as a
  discovery. Do **not** invent a new gate for it.
- **Trait visibility.** Removing the loyalty-gated trait reveal
  (`Presentation.traits`, 2 traits below loyalty 21) makes more information visible
  earlier. This is required by `SALE` §SALE INFORMATION HONESTY — hidden traits
  currently change expedition outcomes while being invisible — but it is a
  noticeable felt change, so it is called out here.

---

## 15. CORRECTIONS TO THIS PROMPT

Repo facts that contradict the brief's assumptions:

1. **Source was never adopted to v2.2 or v2.3.** Git history is one source commit
   (`2b92eb8 pre-v2.2-adoption`) then three canonical-only commits. `README.md`,
   `WORK_STATE.md` and `TODO.md` all still describe **v2.1.0**. This is a
   three-generation adoption, not a v2.3→v2.4 delta.
2. **`dist/` is the source, not a build output.** There is no build step, no
   bundler, no `src/`. `dist/*.js` files are hand-written and loaded directly as
   `<script>` tags.
3. **Zero dependencies, no `node_modules`.** Any tooling added for Chunk F changes
   this property — hence the decision in §14.
4. **The hypothesis "Trait/Sale/Relic are partial" understates Trait and overstates
   Relic.** The **Relic pool is already fully canonical** — 30 relics, 12/8/6/4,
   names matching the blueprints, correct windows and Keystone gate. **Trait is a
   near-total replacement** — 20 → 30 with 3 explicit removals, a new exclusion set,
   and a semantic-tone model that inverts how effects are presented.
5. **"Item-Hazard-Supply vocabulary has legacy residue" is correct but understated.**
   `mire` — a canonical hazard — **does not exist in the source at all**, and
   `thirst` is not merely vocabulary: `dungeon.js:prepare` actively computes
   `e.survival -= e.thirst` in expedition resolution.
6. **Monster Knowledge is already correct.** `meta.js:observe` already requires
   `report.items.length && outcome !== '사망'`. Only the **copy** (`관찰 N회` →
   `보급 생환 N회`) needs changing, and there is already a passing regression test
   (*"empty provisioning cannot grind knowledge"*). No new Knowledge work is needed.
7. **The reroll system is already fully canonical**, including the
   `발주 교환권` free-first-use-consumes-first-step rule. Chunk C verifies it; it
   does not rebuild it.
8. **"UI remains SaaS/web-app-like" is right, but phase identity already exists
   structurally.** Each phase already has its own builder and its own root class.
   The dashboard problem is inside the screens (4-up KPI tiles, ledger rows, grid-of-
   cards) and in the CSS layer (three sheets, two competing `:root` blocks, ~170 hex
   values, `max-width`-only breakpoints).
9. **Hazard explanation is not "hover-only" — it does not exist.** There is exactly
   one `title=` attribute in the entire UI and it is on trait tags, not hazards.
   `DUN-Q21` / `UI-Q35` must be built from nothing.
10. **`npm test` currently passes.** The pre-adoption baseline is green, so any red
    during adoption is attributable.
11. **`npm run audit` writes files** (`reports/*.md`) — it is not a read-only
    command and was deliberately not run during Plan Mode.
12. **`TODO.md` F01/D01 are stale**, not open blockers (see §14).

---

## 16. FINAL RECOMMENDED ORDER

```
0. git fetch origin main
   git checkout -B claude/v2.4-full-adoption origin/main
   Persist this plan → reports/V2_4_EXECUTION_PLAN.md   (first action, before any Source work)
   Create reports/_checkpoint_log.md
   Commit + push -u origin claude/v2.4-full-adoption

A. Data Vocabulary + Item / Dungeon / Supply     Opus 5 · high
B. Event                                          Opus 5 · high
C. Order / Reroll + Relic                         Opus 5 · high
D. NPC / Trait / Sale                             Opus 5 · high
E. Final Expedition                               Opus 5 · high
F. UI / UX / Visual Redesign + Copy               Opus 5 · xhigh   (F1–F6 sub-commits)
G. Save / Full Integration / Tests / Simulation   Opus 5 · high
H. README / WORK_STATE / TODO / Reports           Sonnet 5 · medium
```

**Why this order.** A is the vocabulary root every later chunk resolves against. B
before C because Events modify offer counts and Gate hazards that C's forecast and
relic weighting read. D after A/B because 대식가/소식가/준비성 need the finished
Supply model and 게이트 순례주간 shares the destination split with 허세. E after D
because Final reuses `prepare`, which reads the finished trait set. F after all
gameplay data is final so the UI is built once against real shapes. G integrates and
measures. H documents what actually shipped.

**Stop conditions.** If any chunk hits a hard blocker at `high`, stop and checkpoint
— do not escalate mid-session. Start a fresh focused rescue session at `xhigh`.

**Invariant for every chunk:** `canonical/**` changed files = **0**.
