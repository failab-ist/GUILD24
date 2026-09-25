# v2.9.1 BALANCE — Source adoption handoff (2026-09-25)

Read `AGENTS.md` first and follow it. This file is an execution map, not Design Truth: when it and an owner disagree,
the owner wins and the difference is reported, not resolved here.

- Design Truth: the v2.9.1 owner amendments (`design_ssot/CHANGELOG.md` §v2.9.1 lists every owner and commit).
- Decided values in one place (Korean): `reports/v29-balance-agreements.md`.
- Measurements and the gaps the User accepted: `reports/v29-balance-ideal.md` (§종결 측정 is the final state).
- Base: branch `claude/sleepy-volta-ywkjeu` at or after `5e9ccb3` (owners amended, Source untouched, `npm test` PASS).
- Stop boundary: batches 1–6 below, one commit each; then §7 close-out. No open design decision remains. Do not tune any value to make a
  test or a measurement pass (AGENTS §5 / §9).

---

## 0. Before you start

Environment (cloud container):

```text
git fetch --unshallow                      # ssot:check reads old commits
pip install fonttools brotli               # tests/assets.cjs needs them
NODE_PATH=/opt/node22/lib/node_modules     # qa:runtime / qa:visual use the global playwright; Chromium at /opt/pw-browsers/chromium
```

Baseline check on the base commit: `npm test` PASS, `npm run ssot:check` 21 × PASS. If either fails before you change
anything, stop and report.

Reference implementation: every rule below was measured through in-memory text patches in
`tools/remeasure-v29-variants-worker.cjs` (option names in brackets). Those patches are the exact behaviour the User
approved, but they are harness code (`globalThis.__*` counters, string splices): re-implement them as normal Source with
comments in the file's style, never copy the globals.

Test rule: a test that pins an old value is updated **to the owner value listed here**, never to whatever the new code
prints. If a test fails for a reason not listed, stop and report it.

---

## 1. Batch 1 — DUNGEON_HAZARD rules (`dist/systems/dungeon.js`, `dist/systems/shop.js`)

Owner: `DUNGEON_HAZARD_v2.8.0.md` §FATIGUE OUTCOME BASELINE, §Ordinary resolve (Severe chance), §Healthy / injured
failure Death chance (strainEscalation), §Preparation / Level Death reduction, §RETREAT HEALING,
§BAD-LUCK PREPARATION ASSIST (hidden), §Ordinary EXP / expedition-Wallet, §GATE POWER — LATE-DAY SLOPE.
QA: `DUNGEON_ITEM_QA_v2.8.0.md` DUN-Q73, DUN-Q-v29-3, DI-Q-v28-14, DUN-Q-v29-BC1 / BC2 / BC3, DUN-Q-v27-GATE-SLOPE.

| # | Rule | Where (current code) | Change | Harness ref |
|---|---|---|---|---|
| 1a | 중상 Fatigue gain 0 | `outcomeBaseline=dead?0:outcome==='퇴각'?7:(outcome==='부상'\|\|outcome==='중상')?9:4` and `rawOutcomeFatigueGain=dead?0:…` (~l.556) | 중상 → 0 and a Trait may not raise it: make both lines treat `중상` like `사망` **for Fatigue only**. Do not change the meaning of `dead` elsewhere (alive, injury, records). Update the comment above | `sev: 0` (the harness shortcut changed `dead`; do not copy that) |
| 1b | Severe shares .36 / .11 | `clamp(.42+…)` ×2 and `clamp(.13-…)` ×4 — lines ~336 / 345 / 350 (RESULT-PROOF shadow) and ~488 / 501 / 506 (real) | `.42 → .36`, `.13 → .11` in **all six**; the shadow must stay identical to the real path | `sevp: [.36,.11]` |
| 1c | Strain cut: consecutive injured only | `STRAIN`, `strainEscalation`, `strainRuns`, `strainFor` (~l.259–264); callers l.284, l.459 | `strain = min(0.30, 0.08 × max(0, c − 1))`, c = this departure (if injury=1) + the unbroken run of immediately preceding records with `departedInjured`; 0 when healthy. Drop the weary term (`STRAIN.weary` stays only if something else reads it — grep). Keep recording `departedWeary` on records. The NPC-detail row changes in Batch 6 (`연속 부상 출발 {n}회`) | `strain: 'consec'` |
| 1d | 만반의 준비 × Level factor | failure branch `deathChance=…; deathRoll=r.next(); if(deathRoll<deathChance){outcome='사망'}` (~l.479–482) | `rolled = deathChance × prepared × level`; `prepared = 0.80` when `n.injury===0` (departed healthy) and `e.fatigueBeforeExpedition < 20` and `n.pack.length >= 2`, else 1; `level = max(0.75, 1 − 0.015 × (n.level − 1))`. `deathRoll < rolled` → 사망. `rolled ≤ deathRoll < deathChance` → one extra draw `bandRoll=r.next()`, outcome `bandRoll < 0.36 ? '중상' : '부상'`, then continue into the insurance / aftercare steps as any 중상 / 부상. Else → existing non-Death branch. Push a report event (e.g. `id:'prepared'`) only when the band was hit **and** `prepared<1`, with the approved line COPY_AUDIT §19-9 `{이름}은(는) 만반의 준비 덕분에 목숨을 건졌다.` (particle by the name's final consonant, as the route-change line already does). Export a pure helper, e.g. `G.Dungeon.fullyPrepared(n, fatigueBeforeExpedition)`, used by 1d and by the tutorial (Batch 5) so the condition lives once | `prep: .8`, `lvl: {slope:.015,cap:.25,from:1}` |
| 1d′ | RESULT-PROOF shadow | `shadowSettle` (~l.300–360) | Mirror 1d with the shadow pack: `sRolled = sDeathChance × sPrepared × level`. Record `ev.bandRoll` in the real run; in the shadow, a death roll in the removed band needs `ev.bandRoll` (return `UNPROVEN` if undefined). A shadow pack with one fewer Item may lose `prepared` — that is correct and is how a sold 2nd Item can be proven to have saved a life | (not in harness — the harness reused `injuryRoll`; do it properly) |
| 1e | SALE `실패 시 사망 위험` | `failureDeathRisk(n,d,facilities)` (l.282), read by `shop.js` l.345 and `simulation.js` l.297 | multiply the returned `chance` by `level` (never by `prepared`) | — |
| 1f | Retreat healing | `n.injury=…outcome==='퇴각'?n.injury:…` (~l.546) | when the NPC departed with injury=1 and the outcome is 퇴각: `k` = unbroken run of immediately preceding records with `departedInjured && outcome==='퇴각'`; one draw `r.next() < min(1, 0.25 × (1+k))` → injury 0, else keep. Records are pushed later (l.591), so `n.records` here holds only previous expeditions. Push a report event (e.g. `id:'retreatHeal'`) on a heal with the approved line COPY_AUDIT §19-9 `{이름}은(는) 물러나 쉬는 동안 부상이 나았다.`; never show the chance. The draw exists only on this path | `retreatHeal: .25` |
| 1g | Wallet 대성공 / 성공 1.00 | `WALLET_MULT` (l.253) | `'대성공':1,'성공':1`; comment | `wallet: 'succ1'` |
| 1h | Gate Day term | `GATE={knee:9,early:1.70,late:0.40}` (l.270) + comment | `early:1.20, late:0.80`; the comment's "D1-D9 is unchanged" is no longer true — rewrite it | `gate: {early:1.2, late:0.8}` |
| 1i | Bad-luck assist (hidden) | `shop.js` `night()` loop (l.463) around `G.Dungeon.resolve(n,d,this.rng,s.facilities,s)`; `dungeon.js` `const ability=preparedPower(e)` and `environment=clamp(.06+…)` | per Night: `chain=0`; before each resolve, `carried = n.pack.length>0 && !d.deep`; `assist = carried && chain>=3 ? 0.10 + 0.05×(chain−3) : 0`; pass `assist` into resolve (a parameter or an options object, not a global); in resolve `ability × (1+assist)` for the combat check and `environment × (1−assist)`; after: if carried → `성공/대성공 ? chain=0 : chain++`. The Final does not go through this loop — confirm. Record `assist` on `ev` so the shadow uses the same value. Nothing on screen | `badluck: {base:.1, step:.05, after:3}` |

Tests to update in this batch (expected values from the owner):
- `tests/night.cjs` ~l.980 `DUN-Q-v29-3`: `Dungeon.STRAIN` / `strainEscalation(i,w)` table → the consecutive form (1 → 0, 2 → .08, 3 → .16, 5 → .30; a healthy departure → 0; weary adds nothing). Rename the test title to v2.9.1.
- Any test asserting `중상 +9` Fatigue, `.42` / `.13`, `WALLET_MULT` `.90`, `GATE` 1.70 / 0.40 or a Day-term anchor (D12 16.50, D24 21.30 → 13.20, 22.80). `grep -n "1.70\|16.50\|21.30\|\.90\|중상.*9" tests/*.cjs`.
- Add tests for BC1 / BC2 / BC3 (controlled seeds or a stubbed RNG, the way `tests/night.cjs` already builds departures).

Verify: `npm test`; `npm run ssot:check` (no doc change expected).

---

## 2. Batch 2 — ITEM catalog (`dist/data/catalog.js`)

Owner: `ITEM_v2.8.0.md` ACTIVE CATALOG tables, §ITEM PRICE ALIGNMENT, counter table. QA: DUNGEON_ITEM_QA ITEM-Q72 / Q73 / Q74 /
Q77 / Q79 / Q81 / Q83 / Q84, DI-Q-v28-1.

Every item: `sell = buy × 2` (all 40, including the unchanged ones — e.g. 생수 40 / 80, 캔커피 40 / 80, 구급키트 80 / 160).
Changed items (`buy` / effects; supply = `피로 회복`):

```text
rice 삼각김밥          35   survival 6, supply 5
ramen 컵라면           45   cold 10, supply 3
bar 간단 도시락        100  survival 12, supply 6, loot .2
lava 불룡볶음면        80   survival 8, cold 6, supply 3
premium 길드 특제 도시락 185 survival 16, supply 7, loot .4
energy 에너지드링크    80   mobility 17
wine 용사의 곡주       70   fear 20, mobility -4
mask 방진마스크        80   poison 24
heat 핫팩              70   cold 24
coating 코팅제         85   corrosion 24
boots 원정용 장화      75   mire 20
snowgoggles 설원 고글  70   whiteout 20
midpotion 중급 포션    125  combat 14
highpotion 상급 포션   175  combat 20
antidote 농축 해독제   95   poison 30
ion 쿨링 이온음료      95   fire 26
spiderkit              165  poison 22, bind 18
slimesuit              165  corrosion 22, mire 18
cryptlantern           165  fear 18, dark 18
snowvisor              165  cold 22, whiteout 18
magmagear              175  fire 18, combat 6
hyperenergy            175  mobility 22
sageelixir             175  spirit 24
toppotion              210  combat 28
```

Unchanged `buy` and effects: everything else (choco supply 3, candy supply 2, battlelunch supply 9 are already current —
check). Shelf lives do not change. Item `description` strings that quote a number must follow the new value (grep the
catalog for the old numbers).

Tests: price / effect tables in `tests/*.cjs` (`grep -n "85\b\|170\b\|320\|/ 3[04]0\|poison:12\|poison:18" tests/*.cjs` and read
each hit). `tests/copy.cjs` may pin effect rows. Expected = the table above.

---

## 3. Batch 3 — operating cost / start Gold (`dist/systems/shop.js`)

Owners: `ECONOMY_ORDER_v2.8.0.md` §BASE OPERATING COST, `CORE_RUN_v2.8.0.md` §KEY / §START STATE. QA: ECONOMY_ORDER_QA
(operating-cost block), CORE_RUN_QA RUN-Q01.

- l.52 `const dayBase=90+5*(this.run.day-1)` → `170+1*(this.run.day-1)`; the Level factor in the same function
  `(1+.02*(avgLevel-1))` → `.03`. Comments cite v2.9.1.
- l.21 `const startGold=1000` → `700`.
- Tests: `tests/integration.cjs` l.1123 / 1125 / 1140 / 1192 (`money,1000`) → 700; l.1300–1306 worked example → D11:
  `dayBase = 170 + 1 × 10 = 180; base = 180 × (1 + .03 × 23/6) × (1 + .06 × 11/6) = 222.777; charged = round(22.2777) × 10 = 220G`
  (recompute the assertion the test makes; do not copy a runtime value). `grep -n "1000\b" tests/*.cjs` for others.

---

## 4. Batch 4 — META / BOSS / Death limit (data + `meta.js` + `adventurer.js`)

Owners: `META_v2.8.0.md` (Decoration effects, prices, Store Capital rates), `CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED,
`BOSS_v2.8.0.md` (WRATH, GREED cap, SLOTH), `EVENT_v2.8.0.md` §23 (위령제 +1). QA: CORE_RUN_QA RUN-Q-v29-DL, BOSS-Q72 / Q74.

| Item | Where | New |
|---|---|---|
| Store Capital rates | `decorations.js` `capitalRates` | `.01 / .02 / .03 / .04 / .05` (maxDay 9 / 19 / 24 / 29 / 30); rewrite the "halved" comment |
| Decoration prices | `decorations.js` `decorations[].price` | sign 1250 · wall 1000 · counter 750 · display 500 (both kinds of a Slot) |
| Decoration effects | `decorationParams` / `D.balance` | `dawnSign.extraOffers 3` · `D.balance.wallVisitorChance .30` (catalog.js l.251) · `thriftSafe.dailyGold 50` · `trainingRack.chance .65` · `infirmaryPlaque.healChance .45` · `firstAidKit.saves 3` · `memorialBoard.deathLimitBonus 2` |
| 프리미엄 쇼케이스 | `adventurer.js` l.66 `opts.premium?[50,30,15,4,1]` | `[45,31.5,17.5,4.75,1.25]` (sum 100; `r.weighted` must accept decimals — check) |
| Decoration effect lines | `decorations.js` `effect:'…'` (8) | exactly COPY_AUDIT §9-5 (추모 방명록 `사망 한도 +2명.`) |
| Boss | `catalog.js` `D.balance.bossPower` 200 → 180; `bossTuning.greedShortfallCap` 12 → 11; `slothBossPower` → `[200,189,171,149]` | PRIDE / ENVY / GLUTTONY / LUST factors unchanged |
| Death limit | `meta.js` l.68 `deathLimit=run=>D.balance.deathLimit+…` | segment by `run.day`: `≤10 → 5`, `≤20 → 8`, else 11; `+ memorialBoard.deathLimitBonus` when worn; `+ (run.riteBonus||0)`. Put the segment table in data (e.g. `D.balance.deathLimitSegments=[{maxDay:10,limit:5},{maxDay:20,limit:8},{maxDay:30,limit:11}]`) and retire `D.balance.deathLimit=10` (relics.js l.101) — grep every reader first (`run.js` l.18, `simulation.js` l.545–550, `ui/app.js` l.1363 / l.1488) and keep them on `Meta.deathLimit(s)` |
| Segment end Day (for the UI) | `meta.js` | export `deathLimitSegmentEnd(run)` → 10 / 20 / 30 so the UI never re-derives it |

`run.js` `closeDay` keeps its order (Death check before money). The count `s.stats.deaths` never resets.

Save: `run.riteBonus` is new run state; a missing value reads as 0 (no save-version bump — confirm with `dist/systems/save.js`
how other optional run fields such as `aidKitSaves` are handled and do the same).

Tests:
- `tests/final.cjs` l.675–679: `bossPower 180`, `greedShortfallCap 11`, `bossPower + cap = 191`, `slothBossPower [200,189,171,149]`
  (the shape asserts l.687–690 still hold: 200 > 180, 189 > 180, 171 < 180, 22 > 18). Update the pinned-message text.
- `tests/integration.cjs` l.1331–1336 추모 방명록: `+2`, per segment (a closing on D5 with 5 Deaths ends a plain Run, not a
  memorial Run; 7 ends it); the other Decoration tests (40G → 50G, twice → three times, 50% / 35% chances, +2 offers) →
  the new values. Add RUN-Q-v29-DL cases (CORE_RUN_QA).
- `tests/acquisition.cjs`, `tests/antifarm.cjs`, `tests/progression.cjs` read `capitalRates` / prices: re-run and read
  every failure; update only expectations that are owner values.

---

## 5. Batch 5 — UI: Death limit line + 만반의 준비 tutorial (`dist/ui/app.js`, `dist/ui/ui.css`)

Owners: `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER), §만반의 준비 TUTORIAL; copy COPY_AUDIT §4-23, §3-7.
QA: UI_UX_QA UI-Q-v29-26. Presentation work is screenshot-driven (AGENTS §2A): capture BEFORE, implement, capture AFTER at
360 / 390 / 412 / 1280, separate visual review, then commit.

- Line: `사망 {n} / {limit} · D{end}까지`, `n = s.stats.deaths`, `limit = Meta.deathLimit(s)`, `end = Meta.deathLimitSegmentEnd(s)`.
  Warning class exactly when `n === limit − 1`.
  - MORNING: a third item in the existing rail `<p class="board-rail" id="visitor-count">오늘의 원정<b>손님 …</b><b>게이트 …</b></p>`
    (l.392) is the natural place; ORDER: the top of the 오늘 brief block (`orderForm`, l.1076) beside the funds summary.
    Final placement is decided by the screenshot review.
  - `tests/ui-guard.cjs` counts rail / brief children in places — read its failures; a new guard for UI-Q-v29-26 is expected.
- 도감 line (`rosterList`, l.1487–1490) already reads `Meta.deathLimit(s)`: it now shows the current segment limit; keep the copy.
- Tutorial: the coach system shows a contextual mark the first time its selector is visible (`coachSteps.sell`, l.831ff;
  `showCoach`, l.935). Add a state class on the customer's Bag strip when `G.Dungeon.fullyPrepared(...)` holds for the current
  customer with the committed Bag (the tray's departure Fatigue `출발 B`), and a `sell` step
  `['prepared', '<bag-selector>.prepared', '건강한 손님의 가방을 가득 채웠다. 만반의 준비를 하면 실패해도 살아 돌아올 가능성이 커진다.']`.
  The class carries no visible styling of its own (no new badge). Persistence is the existing `tutorial['coach-prepared']`.
- `tests/copy.cjs` checks coach copy against COPY_AUDIT — add the new line there if it enumerates §3-7.

---

## 6. Batch 6 — 길드 합동 위령제 Event + NPC-detail row

Owner: `EVENT_v2.8.0.md` §23, COPY_AUDIT §13-23.

- Event row in `catalog.js` `events` (same tuple shape as the others, weight 1, not an Easter egg):
  `['rite','길드 합동 위령제','길드가 광장에 위령제 제단을 세웠다. 오늘은 모험가들도 말수가 적다.','남은 영업 동안 사망 한도 +1',{deathLimit:1}]`.
  Ordinary conditions: no special eligibility, may recur. On the Morning the event is rolled (`shop.js` l.224 where `ev` is
  read), `s.riteBonus=(s.riteBonus||0)+ev.deathLimit`. The pool grows from 22 to 23, so seeded Event sequences shift:
  tests that pin a seed's Event must be re-read, not blindly re-pinned; `tests/events.cjs` counts the catalog.
- Night lines: done in Batch 1 (COPY_AUDIT §19-9, approved). Check the Night report renders them where the other
  insurance lines (`구급품 진열장이 사망을 중상으로 바꿨다.`) appear.

---

- NPC-detail row (`app.js` l.1518): `무리한 출발 {n}회` → `연속 부상 출발 {n}회`, n = the unbroken run of this adventurer's most
  recent records with `departedInjured` (0 after a healthy departure) — the same count the strain cut reads; reuse the
  Batch 1 helper. Owner UI_UX l.398, QA DUN-Q-v29-3. Update the comment above it.

## 7. Close-out verification (after batches 1–6)

1. `npm test` PASS; `npm run ssot:check` 21 × PASS; `NODE_PATH=/opt/node22/lib/node_modules npm run qa:runtime` PASS;
   `qa:visual` for the Batch 5 surfaces.
2. Native measurement — the built game should reproduce the User's closing state with **no rule patches**. The worker's
   rule options now fail (their anchors are gone): pass only harness options.

```text
# fresh (A): 500 seeds, human + beginner
echo '{"N":{"seal":"rule"}}' > /tmp/v291-fresh.json
node tools/remeasure-v29-variants.cjs 500 '[["balanced","adaptive","hybrid"],["beginner","adaptive","hybrid"]]' /tmp/v291-fresh.json /tmp/v291-fresh.out.json
# decorations (B) and trajectories (C): copy the loadout / traj / schedule:"human" / seal:"rule" fields of
# tools/remeasure-v29-closing-results.json → spec objects, dropping every rule option
```

   Compare with `tools/remeasure-v29-closing-results.json` (`reports/v29-balance-ideal.md` §종결 측정): human D1~10 dropout
   ≈ 26.6%, D30 ≈ 18%, clear ≈ 11%; mixed-A / mixed-B Decoration clear ≈ 43 / 46%; 10th-Run clear 25–36%. The native build
   also carries 길드 합동 위령제 (absent from the measurement) and the proper RESULT-PROOF / tutorial code, so small upward drift is
   expected. A gap beyond about ±4%p on any of those is a finding: report it, do not tune.
3. Regenerate `reports/deco-balance` (`npm run report` / the tool the report names — read its header).
4. SPEC_INDEX header (`SOURCE_ADOPTION_STATUS` → V2_9_1_ADOPTED), CHANGELOG §v2.9.1 state line with the commits, WORK_STATE.
   The `v2.9.1` tag is the User's call after review.

## 8. Stop and report instead of continuing when

- a test fails for a reason this file does not list;
- an owner and this file disagree;
- a rule needs a value no owner states (e.g. a Night line, a new badge);
- the native measurement misses the closing state beyond the tolerance above.
