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
