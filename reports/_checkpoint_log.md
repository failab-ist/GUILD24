# v2.4 FULL ADOPTION — CHECKPOINT LOG

Cross-session continuity record. One short entry per completed chunk.
No diffs, no full logs.

Authority order: `canonical/**` > `reports/V2_4_EXECUTION_PLAN.md` > this file.

PASS3 numeric change gate: `reports/V2_4_EXECUTION_PLAN.md` §10
(operating procedure for `SPEC_INDEX_v2.4.0.md` §FREEZE / PASS3 POLICY).

---

## CHUNK 0 — PLAN ARTIFACT
start HEAD:          8620d84  (origin/main, canonical v2.4.0 freeze)
end/commit:          <this commit>
files changed:       reports/V2_4_EXECUTION_PLAN.md (new), reports/_checkpoint_log.md (new)
KEEP/PATCH/REPLACE:  n/a — no Source touched
tests run:           npm test @ 8620d84 -> PASS (core + 23 revision + 14 DELTA + canonical D0-D30)
implementation note: `dist/` is the hand-written source, not a build output. Zero
                     dependencies, no node_modules, no build step. Branch
                     claude/v2.4-full-adoption created from origin/main per User approval.
design proposal:     NONE
balance observation: NONE
remaining issue:     NONE
next chunk:          A — Data Vocabulary + Item / Dungeon / Supply

## CHUNK A — DATA VOCABULARY + ITEM / DUNGEON / SUPPLY
start HEAD:          48cbee4
end/commit:          da4a889
files changed:       dist/data/{catalog,relics}.js; dist/systems/{dungeon,shop,relics,save,simulation}.js;
                     dist/ui/{presentation,app}.js; package.json; tests/{core,revision,delta}.cjs; tests/vocabulary.cjs (new)
KEEP/PATCH/REPLACE:  REPLACE hazard vocabulary (mire in, slow/supply/armor/undead/fatigue/long/wet out) and
                     Supply Burden model. PATCH item catalog to canonical 30, Return Stone .50, combatNoise
                     .175, FIRE second axis, tier bands, save v4->v5. KEEP phase machine, RNG, relic pool.
tests run:           npm test -> PASS (core + 23 revision + 14 DELTA + 9 vocabulary + canonical D0-D30)
implementation note: `food` effect key is merged into `supply` — one Supply number per Food/Drink, as
                     ITEM SUPPLY MODEL requires. Functional roles are now declared in D.itemRoles
                     (dist/data/relics.js) instead of inferred from effect shape. `burden(tier)` in shop.js
                     always draws once so RNG consumption stays tier-independent. dungeon.js still carries
                     inert caffeineMult/alcoholMult accumulators; the Traits that feed them are retired in
                     Chunk D. D.unlocks.fire12 is now orphaned (its item was retired) and is intentionally
                     left as an inert progress counter — do not invent a new gate for it.
stale tests updated: 5 — save version (CORE_RUN permits invalidation), thirst additivity, item fatigue
                     recovery via 생수, familyTiers slime `slow`, and supplyPressure 0..2. All were rewritten
                     as canonical assertions, none weakened or deleted.
design proposal:     NONE
balance observation: 30-seed balanced/adaptive/hybrid vs pre-adoption: deaths/run 4.60 -> 5.33,
                     Final clear 0.13 -> 0.00, avg Gold 3642 -> 3766, reach 1.00 unchanged. Consistent with
                     combatNoise .135->.175 plus the real Supply deficit penalty. Final clear is not
                     meaningful until Chunk E replaces D30. Small sample; no PASS3 numeric changed (per
                     V2_4_EXECUTION_PLAN.md §10).
remaining issue:     NONE
next chunk:          B — Event

## CHUNK B — EVENT
start HEAD:          c3ee771
end/commit:          (this commit)
files changed:       dist/data/catalog.js; dist/systems/shop.js; dist/ui/app.js; package.json;
                     tests/events.cjs (new)
KEEP/PATCH/REPLACE:  REPLACE event selection (74% uniform pick -> 35% weighted draw from an
                     eligibility-filtered pool) and the catalog (15 -> canonical 22).
                     PATCH morning() ordering, Night route causality, 1+1 fulfilment, wallet handling.
                     KEEP the existing destination/claimedDestination split, Purchase Intent path,
                     visitor-count modifier and Night presentation - 순례주간 and the new Events
                     reuse them rather than adding systems.
tests run:           npm test -> PASS (core + 23 revision + 14 DELTA + 9 vocabulary + 12 events +
                     canonical D0-D30)
implementation note: morning() had to be reordered - Gates and expectedVisitors are now built BEFORE
                     the Event draw, because 한파/독안개/순례주간 eligibility is judged against today's
                     actual Gate hazards and visitor count. Event Gate effects are applied before
                     generateOffers() so Known Hazard / pity / coverage logic sees them (EVENT 8-1).
                     Event data gained `reveal` (flavour) and `weight`; `s.eventSeen` is persisted but
                     not yet consumed - the focused reveal composition is Chunk F.
                     n.eventBudget is a today-only pot spent before n.money; the persistent Wallet is
                     never touched, so 길드 급여일 cannot compound through walletCarry.
                     Canonical 02 says one promo SKU is designated, so the common-item preference now
                     falls back to any offer rather than leaving the Event inert.
stale tests updated: none - the existing suite passed unchanged.
design proposal:     NONE
balance observation: 80 playing runs: observed event rate 0.360 against eligible days reached
                     (canonical 0.35), 7.92 events per full run vs the 7.7 target, 80/80 reached D30,
                     all 22 events observed. No PASS3 numeric changed (V2_4_EXECUTION_PLAN.md §10).
remaining issue:     NONE
next chunk:          C — Order / Reroll + Relic

## CHUNK C — ORDER / REROLL + RELIC
start HEAD:          803b9f0
end/commit:          b498fe5
files changed:       dist/systems/{run,relics,save,dungeon,simulation}.js; dist/ui/app.js; package.json;
                     tests/delta.cjs; tests/relic-order.cjs (new)
KEEP/PATCH/REPLACE:  KEEP the base reroll curve, pity integrity, relic pool/windows/Keystone gate and the
                     existing next-day forecast UI. PATCH the 발주 교환권 step (real bug), relic window
                     state, taxonomy leak, coldcase eligibility, expeditionMeal gating, liquidation
                     rounding. REMOVE the dead `upgrade` phase.
tests run:           npm test -> PASS (core + 23 revision + 14 DELTA + 9 vocabulary + 12 events +
                     10 relic/order + canonical D0-D30)
implementation note: REAL BUG FOUND by verifying instead of assuming — `발주 교환권` subtracted a step, so
                     the free use did NOT consume the first daily step (0/30/60 instead of the canonical
                     0/60/120/240). The plan had this subsystem marked MATCH; the base curve did match,
                     the Relic interaction did not.
                     CORRECTION to the plan: the next-day Tier forecast already existed in the Order
                     screen (app.js nextForecast). It was reclassified from ADD to KEEP + verify, and now
                     reads a single engine value (P.tierForecast) so UI and engine cannot drift.
                     tierForecast returns null for D30 — no normal Tier progression exists there.
                     REL-Q39 is guarded by a source scan of dist/ui/app.js, since the render path needs a
                     DOM to exercise directly.
stale tests updated: 1 — the DELTA reroll group asserted the buggy 0->30 relic step; corrected to 0->60.
design proposal:     NONE
balance observation: 40 playing runs: reach 1.00, deaths/run 4.95, avg Gold 4334, relic spend 2690/run.
                     No PASS3 numeric changed (V2_4_EXECUTION_PLAN.md §10).
remaining issue:     NONE
next chunk:          D — NPC / Trait / Sale

## CHUNK D — NPC / TRAIT / SALE
start HEAD:          5d50aed
end/commit:          d429076
files changed:       dist/data/{catalog,relics}.js; dist/systems/{adventurer,dungeon,shop}.js;
                     dist/ui/{presentation,app}.js; package.json; tests/delta.cjs; tests/traits.cjs (new)
KEEP/PATCH/REPLACE:  REPLACE the Trait catalog (20 -> frozen 30), the semantic-tone model and the NPC
                     name pool. PATCH exclusions (6 -> 9), 대식가/소식가 axes, trait visibility, Sale
                     purchase bias, visitor revisit weight, recovery duration, terminology.
                     KEEP prepare/resolve structure, Purchase Intent, visitor selection and the rare
                     Trait events — the 13 new Traits reuse them, no new subsystem.
tests run:           npm test -> PASS (core + 23 revision + 14 DELTA + 9 vocabulary + 12 events +
                     10 relic/order + 11 traits + canonical D0-D30)
implementation note: Trait effects now split into resolution keys and behaviour keys. prepare() skips the
                     behaviour set (priceBias/buyBias/rareBias/commonBias/shyBias/revisitMult/
                     recoveryDelta/foodSupplyDelta/supplyPerItem/injuredCombat) and the owning system
                     reads them instead — keeps one source of truth per effect.
                     Food native core and Supply are now separate axes: trait foodMult touches native
                     Stat/recovery only, while kitchen/fresh24 still cover Supply + native per RELIC
                     boostScope. This is why 대식가 can raise survival and lower Supply at once.
                     HONESTY BUG FIXED: Presentation.traits() hid Traits below loyalty 21 while
                     prepare() resolved all of them, so invisible Traits changed expedition outcomes.
                     tones live in the catalog per effect; Presentation.rows(e,tones) keeps the old
                     sign-based fallback for Item effects only, which state their own costs.
stale tests updated: 1 — the DELTA trait group asserted the deleted player-facing quality-label map;
                     replaced with an internal-direction check plus a guard that the map stays deleted.
design proposal:     NONE
balance observation: 120 seeds: all 30 Traits reachable through generation and growth. 40 playing runs:
                     reach 1.00, deaths/run 5.00, avg Gold 4319 — unchanged from Chunk C within noise.
                     No PASS3 numeric changed (V2_4_EXECUTION_PLAN.md §10).
remaining issue:     NONE
next chunk:          E — Final Expedition

## CHUNK E — FINAL EXPEDITION
start HEAD:          593ef46
end/commit:          e0cd448
files changed:       dist/data/catalog.js; dist/systems/{run,shop,save}.js; dist/ui/app.js; package.json;
                     tests/{revision,vocabulary}.cjs; tests/final.cjs (new)
KEEP/PATCH/REPLACE:  REPLACE D30 generation and resolution. KEEP prepare(), the Individual Final Power
                     formula, the 0.88-1.12 roll and support=1 (no Job-diversity synergy) — all three
                     already matched canonical and were left untouched.
tests run:           npm test -> PASS (core + 23 revision + 14 DELTA + 9 vocabulary + 12 events +
                     10 relic/order + 11 traits + 7 final + canonical D0-D30)
implementation note: BIGGEST BUG FIXED — the old boss() re-ran Dungeon.resolve on every member AFTER a
                     successful clear, so individual injury/death judgements could overturn a won Final
                     (FINAL-001 postClearNormalResolve=NO). The Final now resolves once and calls
                     Dungeon.resolve zero times; a test spies on it to keep it that way.
                     Canonical defines no per-NPC outcome for the Final, on clear or on failure, so none
                     was invented: the Final produces one verdict plus a finalReport for presentation.
                     PLACEMENT DECISION: the zero-survivor Run Fail sits at Final entry (boss()), not at
                     D30 dawn, because CORE_RUN/RELIC guarantee the D30 Relic window and FINAL section 3
                     guarantees Family disclosure before Final lock. Ending at dawn would have skipped
                     both. The departure button now enables at exactly finalRequired(), which is 0 when
                     there are no survivors.
                     The Final gate carries power = bossPower/3 for the qualitative per-NPC forecast
                     only; it feeds no resolution path.
stale tests updated: 2 — a revision setup entered D30 with nobody introduced (now a zero-survivor fail),
                     and tests/vocabulary.cjs referenced the retired makeDungeon('boss').
design proposal:     NONE
balance observation: BOSS POWER — needs User approval before any change (V2_4_EXECUTION_PLAN.md §10).
                     159 D30 parties across balanced/adaptive/hybrid and skilled/adaptive/expedition:
                       Raw Party Power  p10 145 | median 165 | p90 201 | max 302
                       bossPower 230; median x best roll 1.12 = 185
                       only 9% of parties could clear even on a top roll
                       observed clear|reach: balanced 0.05, skilled 0.07
                     Candidate for consideration: bossPower in the 165-185 band would put a median party
                     at the threshold and let the roll decide. NOT APPLIED — 230 remains the provisional
                     retained Source baseline, and canonical leaves the exact value unfixed.
                     PRE-EXISTING, NOT A REGRESSION: the `protective`/half/vip simulation cohort reaches
                     D30 0/60 and ends at -34G. Measured at pre-adoption 8620d84 it was already 0/60 at
                     -32G, so this is an existing policy artefact, not caused by A-E. Examine properly in
                     Chunk G alongside the new minimal-engagement and poverty policies.
remaining issue:     NONE
next chunk:          F — UI / UX / Visual Redesign + Copy (fresh Opus xhigh session, per the plan)

## CHUNK F — UI / UX / VISUAL REDESIGN + COPY  *(CLOSED)*
start HEAD:          e0cd448 (branch rebased off claude/v2.4-full-adoption; the designated branch had
                     been pointing at pre-adoption 8620d84)
end/commit:          731d36f (18 commits; integrated into claude/v2.4-full-adoption by fast-forward)
key commits:         61f52be typography split + Morning/Order overflow gate
                     350e165 POS readout, printed quick marks, paper approval area
                     0939aca Sale — the customer at the counter, in three layers
                     616dde4 Sale — the deck's face-up card (approved visual baseline)
                     face406 Sale — one deck geometry that holds at every resolution
                     1f3dd60 Night — the shop after closing, and whoever came back
                     c9f39cf Closing, the store-support delivery, Final and the modal layer
                     6750163 NPC art adoption, Night matrix, actual supply attribution
                     9b0d3a4 + 731d36f Night — compact is less copy, one NPC size everywhere
files changed:       dist/ui/{app,ui.css,art,presentation}.js; dist/ui/scene.js (new);
                     dist/ui/fonts/* + dist/ui/vendor/* (vendored, see reports/ASSETS.md);
                     dist/ui/assets/npc/npc-01..05.png (supplied NPC asset examples);
                     tools/{vendor-assets.py,qa-visual.cjs} (new); tests/{ui-guard,assets}.cjs (new);
                     package.json (devDependencies + `assets` / `qa:visual` scripts)
KEEP/PATCH/REPLACE:  REPLACE all presentation source. KEEP the phase machine, render() -> per-phase
                     dispatch, action() dispatch, state, Save and RNG — none of them were touched.
                     Gameplay Design / Rule / Formula / Catalog unchanged; canonical/** unchanged
                     (`git diff --name-only -- canonical/` is empty at every commit).
tests run:           npm test -> PASS (adds 14 ui-guard, 6 night and 3 asset groups)
                     npm run qa:visual -> clean, 21 captures at 360 / 390 / 430 (reports/ui/)
                     swept clean at 11 widths (320-1200) x 5 heights (360-1180), plus landscape
                     reports/ui/sale-npc/ — all 5 supplied NPC assets x 360 / 390 / 430, plus the
                     open-register and last-customer states
implementation note: SALE is built as a presentation architecture, not a card component. The NPC sticker
                     is an immutable payload placed in one square customer slot (object-fit:contain),
                     never cropped, stretched, letterboxed or recoloured; rarity, identity and the reveal
                     are separate DOM layers over the same <img>. Production art swaps in via
                     Scene.npcPool, or per NPC via Scene.manifest['npc.<id>'], with no screen changes.
                     The waiting line is one identical back per customer; only the count is public.
                     FIXED: Scene.npcPool resolved paths against dist/ instead of dist/ui, so no sticker
                     had ever loaded.
environment note:    ENVIRONMENT CONSTRAINT, NOT A DESIGN LIMITATION — this execution environment's
                     egress proxy blocks jsDelivr / unpkg / esm.sh and the CC0 asset hosts
                     (OpenGameArt / Kenney / itch). Presentation dependencies were therefore taken from
                     npm and vendored locally (Galmuri, Pretendard, anime.js — all recorded with licences
                     in reports/ASSETS.md). Nothing about the visual direction was scaled down because of
                     it; a future environment with egress can serve the same files from a CDN unchanged.
gameplay findings:   RECORDED ONLY, NOT FIXED (per the Chunk F brief) — none newly found this pass.
                     The `protective`/half/vip cohort result carried over from Chunk E stands unexamined
                     until Chunk G.
screens done:        Morning, Order, Sale (approved as the Sale visual baseline), Night, Closing,
                     Relic takeover, Final, plus the modal layer. Each phase has its own composition
                     and its own physical object; none reuses another phase's shell:
                       Morning  store interior, cork board, till
                       Order    order form clipped to a board, crates and price tags
                       Sale     the customer deck — face-up card at the counter, display case, register
                       Night    the closed shop, one lamp, the returning adventurer
                       Closing  the till roll the register printed at close
                       Relic    a delivery crate of bolted brass fixtures
                       Final    the mouth of 제0게이트
                     FIXED ON THE WAY: the relic takeover had no base CSS at all and rendered
                     invisibly into the modal root; the whole modal layer was unstyled.
late corrections:    NPC production art was adopted in Sale only; every other surface kept its own
                     Art.avatar call. One resolver, portrait(n,size), now serves Sale, Night, the
                     notebook and the Final muster, with Art.avatar left as the missing-asset fallback.
                     Night's outcome copy was split across four screen-local helpers, which allowed
                     contradictions; label, WHAT_HAPPENED, WHY and WHAT_CHANGED now read one resolved
                     report through Presentation, and tests/night.cjs pins the whole outcome matrix.
                     Closing's supply line had the rejected generic wording baked into the resolver;
                     the event now carries structure only and Presentation names the actual product
                     and the actual adventurer.
remaining issue:     NONE
next chunk:          G — see reports/SESSION_HANDOFF_v2.4.md. Do not redo A-F.
