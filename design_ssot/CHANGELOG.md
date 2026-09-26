# GUILD24 DESIGN SSOT — CHANGELOG

Version policy: SPEC_INDEX §VERSION POLICY. Filenames are lineage names; the version lives here, in
the owner headers and in the git tag.

## v2.9.2 — game feel (타격감), H1 / H5 / H2 / H3 ADOPTED, H4 / H6 PLANNED (User 2026-09-25)

H1 and H5 adopted in Source (below); the rest is docs only so far. PRESENTATION_PRINCIPLES §GAME FEEL BEAT registers H1 NIGHT verdict stamp, H2 SALE
counter feel, H3 ORDER confirm, H5 FINAL stamps, H4 CLOSING receipt as PLANNED presentation batches
(execution order H1 → H2 → H3 → H5 → H4; each batch docs-first, Source after User authorization);
SPEC_INDEX §v2.9.1 / v2.9.2 carries the routing. No owner other than PRESENTATION and SPEC_INDEX changed.
- Review against a game-feel talk (User 2026-09-25): intensity by event weight (일반 / 중요 / 클라이맥스)
  added to the contract; H6 phase entry beat for CLOSING / FINAL / END / DAY 0 (hard cuts today) registered
  last in the order; two sequence reviews and a pre-batch audit lens added. Excluded: screen shake, camera,
  particles, haptics. Docs only.
- Second review (User 2026-09-25, outside opinion checked against Canonical / Source): impact budget added to
  the contract; the wind-up hold is 일반-free and ≤ 200 ms otherwise; H1 gains the Hero Item cause beat and
  paper-language injury stamps; H2 loses the streak rhythm (faster second stamp, fifth-sale overtone, band bump);
  H3 cascade capped ≤ 320 ms / ≤ 3 hits; H5 becomes one seal stamp per verdict (the expedition commits 1~3
  members, and a FINAL loss is not a per-member death); H4 body prints as one run; H6 conditional on the
  sequence review. Docs only.
- Order (User 2026-09-25): H1 → H5 → H2 → H3 → H4 → H6 — the two heaviest landings are authored first in one
  hand; the rest reuse their patterns. WORK_STATE splits the session plan into two stages.
- Third review (User 2026-09-25): H1 drops the ink ring and the double 대성공 stamp (one gold landing; the two-step
  stamp stays 클라이맥스-only) and gives the after-motion one owner (the Hero Item line when present, else the
  numbers); H2 names no "price stamp" (the A8 stub is SALE's only stamp); H3 counts go prior → resolved, never
  a unit per crate; H6 targets are the User's decision after the capture, not WORK's. Docs only.
- Fourth review, wording only (User 2026-09-25, checked at `8448f08`): the principles table names SALE's beat as key
  impact / receipt stub (no "price stamp") and the repeated-input row as tactile without escalation (no combo);
  SPEC_INDEX H2 reads "stub after impact" and the routing names H1~H6. v2.9.2 starts after v2.9.1 closed (User
  2026-09-25, no parallel run); H4's Store Capital part is unblocked. Docs only.
- H1 NIGHT verdict stamp ADOPTED (User 2026-09-25): UI_UX §NIGHT LAYOUT — VERDICT STAMP (per-Outcome timing table, ink /
  misalignment / tape end states, one after-motion owner, reversal first print + overstamp, cue on the landing frame);
  NIGHT_CLOSING §HERO ITEM FEEDBACK / §INSURANCE CAUSALITY display-order notes; UI_UX_QA UI-Q-v29-27; ledgers UI_UX /
  UI_UX_QA / NIGHT_CLOSING; PRESENTATION H1 row ADOPTED. Source: app.js (NIGHT_STAMP, playPhase night, nightSound),
  ui.css (stamp end states), audio.js (`hit` on the NIGHT Outcome cues). No copy, rule, Save, RNG or proof change.
- H5 FINAL seal ADOPTED (User 2026-09-25): UI_UX §FINAL RESULT — SEAL STAMP (one seal bearing the Boss's name on the ending
  tape; clear = 200 ms hold, 2 × fall, 6 px give, vermilion; failure = 1.6 ×, 3 px, faint, crooked, partly printed; the
  headline and reason follow the landing; `sealwin` / `sealfail` cues on the landing frame); FINAL_EXPEDITION §RUN CLEAR /
  FAILURE display order; UI_UX_QA UI-Q-v29-30; ledgers; PRESENTATION H5 row ADOPTED. Capture tool tools/qa-final-seal.cjs.
- Play-report fixes (User 2026-09-25, phone captures; outside the H batches, one commit each): the SALE forecast `?`
  balloon laid out 24px wide on a phone (RUNTIME UX BUG, Source only — `158d001`); MORNING printed every Gate after the
  first as the Gate-detail sentence (IMPLEMENTATION BUG, Source only — `0510b53`); the SALE destination plate's Hazard row
  took three lines on a phone — `{위험}` and `대응 {N} 필요` now share the first line and the conversion line sits under
  the name (User decision; COPY_AUDIT §4-16 render note, UI_UX_QA F2-b line).
- `판매 후 변화` lists the Item's own effects only (User 2026-09-25, phone capture of 길드 특제 도시락): the derived `피로 완화`
  row and the `피로 {A} → 출발 {B}` line are retired on the counter tray, the till and FINAL preparation; the SUPPLY lesson
  moves to the tray's `피로 회복` row for a fatigued customer (User choice). SALE, UI_UX, UI_UX_QA UI-Q-v29-7, DUNGEON_HAZARD,
  DUNGEON_ITEM_QA, SOURCE_ADOPTION_QA, COPY_AUDIT §3-5 / §3-7 / §4-17 (retired); ledgers edited in place.
- H3 ORDER confirm ADOPTED (User 2026-09-25): UI_UX §ORDER — WAREHOUSE DISCLOSURE, ORDER CONFIRM (one crate per ordered SKU falls onto its
  warehouse row with the NIGHT stamp's fall, a cascade capped at 320 ms with a step of at most 70 ms; each count prior -> resolved on
  its landing; the warehouse figures (`N / M칸` · `N종` · 창고 잔여 칸) move together on the last landing; at most three audible hits - `order`, then the new synthesised `crate`; the till
  counts down in 220 ms); UI_UX_QA UI-Q-v29-32; ledgers UI_UX / UI_UX_QA; PRESENTATION H3 ADOPTED. Source: app.js (ORDER_BEAT,
  playCue order, stockBrief rows carry data-item), audio.js (`crate`). Capture tool tools/qa-order-beat.cjs.
- H2 SALE counter feel ADOPTED (User 2026-09-25): UI_UX §SALE — COUNTER TRAY, COUNTER FEEL (the pressed price key 3 px / 60 + 60 ms;
  on a sale the pressed tray held inert for that press only; the A8 stub from the key landing, its ink in 40 ms; a refused key
  pressed while A6 shakes it; the first coin tick ×1.3, 바가지's tick run +40 ms on a ×0.75 first tick, counts 1 / 2 / 3 kept);
  UI_UX_QA UI-Q-v29-31; ledgers UI_UX / UI_UX_QA; PRESENTATION H2 row ADOPTED. Source: app.js (KEY_PRESS, keyPress, playCue
  sale / refuse), ui.css (`.counter-tray.held`), audio.js (tickLate / tickLow). Also fixes a RUNTIME UX BUG found on the way:
  the global button `transition:transform .08s steps(2)` swallowed every scripted key motion, so A6's refusal shake was never
  visible; a pressed key now drops that transition. Capture tool tools/qa-sale-beat.cjs.
- Bug fix (2026-09-26, IMPLEMENTATION BUG): a full data reset (`reset-go`) kept the UI's pending Run seed, so a store planned before
  the reset was reopened on the same seed - and the same Boss - after it. The reset now drops the plan with the rest of the Run
  state. No design, RNG, seed-format or save change. Runtime regression tools/qa-reset-seed.cjs (in qa:runtime).
- Balance, third pass (User 2026-09-26, "g1 l2 t", after the paired D10-fork arms — reports/v292-bot-harness.md §9-10): the Gate
  Day term climbs at 1.10 per Day on DAY 11~20 (DAY 1~10 unchanged; DAY 21+ returns to the 0.80 slope carrying the D20 offset; D20 25.3, D29 32.5); levelFactor floor 0.75 → 0.85
  (identical through Lv11); DAY 21~29 move 0.10 of the T2 weight to T3. Measured together (GLT): `reader` all-fresh D30 12.1% →
  8.6%, CURRENT_SKILLED_D10 .558 → .450; the D21~29 slope 0.90 and a Great Success Gold cut were measured and not taken; the
  all-fresh 10% floor is not a real-player measure (User). DUNGEON_HAZARD §GATE POWER / §Tier generation / Level Death reduction,
  DUNGEON_ITEM_QA; ledgers amended; tests night (Gate term, tiers, levelFactor).
- Balance, second pass (User 2026-09-26, after the `reader` harness review — reports/v292-bot-harness.md §7): 대성공 EXP 1.10 → 1.00,
  combat-success EXP 1.00 → 0.90 (퇴각 0.38 / other living 0.50 unchanged); operating dayBase + 12 × max(0, Day − 15). Measured:
  `reader` clear 14.9% → 7.2%, the D29 cash median ~5,100 → ~3,400; a level-coefficient raise (0.05~0.10) was rejected - it taxed
  D1~15 too and doubled bankruptcies. DUNGEON_HAZARD §Ordinary EXP, DUNGEON_ITEM_QA, ECONOMY_ORDER §BASE OPERATING COST,
  ECONOMY_ORDER_QA; ledgers amended; tests night (EXP) / integration (operating cost).
- Balance, Great Success EXP 1.40 → 1.10 (User 2026-09-25): only the EXP multiplier; Great Success occurrence / probability,
  Store Gold and the expedition NPC Wallet reward unchanged. Purpose: weaken the snowball of a strong NPC growing faster
  through Great Success EXP. DUNGEON_HAZARD §Ordinary EXP, DUNGEON_ITEM_QA; ledgers amended.
- Balance, Gate early slope 1.20 → 1.50 and 정가 final purchase chance × 0.90 (User 2026-09-25, after the relative review in
  reports/v292-balance-review.md, `human` lens): late slope 0.80 / knee Day 9 kept; the × 0.90 applies to the final 정가 chance
  with the 0.97 관련 준비 case included, 50% / 150% and the shared accessible need unchanged. DUNGEON_HAZARD §GATE POWER,
  DUNGEON_ITEM_QA, ECONOMY_ORDER §PURCHASE INTENT, ECONOMY_ORDER_QA, SOURCE_ADOPTION_QA note; ledgers amended. To be
  checked in User play on the deployed build.

## v2.9.1 — balance (User decisions 2026-09-25); owners amended, Source adopted, CLOSED 2026-09-25 (main `d23d076`, tag `v2.9.1`)

The v2.9.0 BALANCE FINDING is resolved as its own version (User 2026-09-25). Values: `reports/v29-balance-agreements.md`;
measurements and the gaps the User accepted: `reports/v29-balance-ideal.md`. Source adoption ran in a separate session
(branch `claude/v291-balance-source-adoption`, batches 1-6, `reports/v291-implementation-handoff.md`) and is complete.
Each owner amendment is listed with its commit.

  - DUNGEON_HAZARD (8854c89): 중상 Fatigue 0; Severe shares .36 / .11; repeated-strain cut on consecutive injured departures
    only; 만반의 준비 ×0.80 and Level factor on the failure Death roll; retreat healing 25 → 100%; hidden bad-luck
    preparation assist; expedition Wallet 대성공 / 성공 1.00; Gate Day term 1.20 / 0.80.
  - ITEM (ec2a90f): Counter values by Rarity (강인함-pressed +4); Potion 8 / 14 / 20 / 28; stat Food / Drink raises; Fatigue
    recovery 삼각김밥 5 · 컵라면 3 · 간단 도시락 6 · 불룡볶음면 3 · 길드 특제 도시락 7; prices raised with the effect; Sell = Buy × 2.
  - ECONOMY_ORDER (f702580): operating cost dayBase 170 + 1 × (Day − 1), Level factor .03.
  - CORE_RUN / META (2c86615): start Gold 700G; Death limit by segment 5 / 8 / 11 (추모 방명록 +2, 위령제 +1); Store
    Capital 1 / 2 / 3 / 4 / 5%; Decoration prices 500 / 750 / 1000 / 1250; Decoration effects +3 offers · 30% · 50G ·
    55% · 65% · 45% · three saves.
  - BOSS (2c900c7): WRATH 180, GREED cap 11, SLOTH 200 / 189 / 171 / 149.
  - EVENT (c03d205, then the conditions below): 23. 위령제.
  - UI_UX / COPY_AUDIT (c862a7c): `사망 {n} / {limit} · D{end}까지` always on MORNING and ORDER.
  - QA (5a9a645, 06a2de9): DUNGEON_ITEM_QA, ECONOMY_ORDER_QA, CORE_RUN_QA (RUN-Q-v29-DL), UI_UX_QA (UI-Q-v29-26).
  - 7-b closed: the remaining-Supply buffer stays. Known measured gaps accepted by the User are in `reports/v29-balance-ideal.md`
    §종결 측정.
  - Follow-up decisions (User 2026-09-25): 위령제 uses the ordinary Event conditions (TYPE Run / Opportunity, WEIGHT 1.0, may
    recur, +1 each time); a contextual 만반의 준비 tutorial (UI_UX §만반의 준비 TUTORIAL); an Epic hybrid stays below every
    specialist of the same or a higher Rarity (ITEM, DUNGEON_ITEM_QA ITEM-Q73 / Q83 / Q15).
  - Copy (User 2026-09-25): 23. 길드 합동 위령제 (COPY_AUDIT §13-23), the 만반의 준비 tutorial line (§3-7), the Decoration effect
    lines (§9-5, 추모 방명록 `사망 한도 +2명.`), the Night lines for retreat healing and 만반의 준비 (§19-9); the NPC-detail row
    becomes `연속 부상 출발 {n}회` (UI_UX, DUNGEON_ITEM_QA DUN-Q-v29-3).
  - **Source adoption** (2026-09-25, branch `claude/v291-balance-source-adoption`, 배치 1~6): DUNGEON_HAZARD / shop.js
    (`09e65fd`; pre-existing pilgrimage/claimedDestination bugfix surfaced and fixed, `2d06b9d`), ITEM catalog (`a7b3cca`),
    ECONOMY_ORDER (`2b29c97`), META / CORE_RUN / BOSS / decorations (`5df9448`), UI_UX 사망 한도 줄 + 만반의 준비 튜토리얼
    (`5f68bda`), EVENT 위령제 + NPC `연속 부상 출발` 줄 (`dd0fba0`). `npm test` / `npm run ssot:check`(21/21) /
    `npm run qa:runtime`(5/5) / `npm run qa:visual` all PASS (`781ce5f` fixes a v2.9.1-only qa fixture seed that hit the
    new D1-10 Death limit before D6). Native remeasurement — the shipped Source itself, no rule patches — against
    `reports/v29-balance-ideal.md` §종결 측정 is recorded in that report's §네이티브 재측정 (`2f0753d`): several metrics
    exceed the handoff's ±4%p, accepted by the User as sampling-error-range known differences (not tuned).

## v2.9.0 — implementation complete 2026-09-25; the BALANCE FINDING moved to v2.9.1 (User decisions 2026-09-24/25)

Theme: easy to learn, hard to master. Readability, onboarding, a visible transaction, simpler rules.

Docs-first. Each owner amendment is listed when committed.

State 2026-09-25: every batch below is in Source on `claude/ux-simplify-handoff-7oorbc` (npm test, ssot:check and qa:runtime PASS).
The BALANCE FINDING (`reports/v29-balance-finding-handoff.md`) and 7-b were decided in the balance session and are v2.9.1 (User 2026-09-25).

- Quick fix (User 2026-09-25): SALE desk layout — on a desk the dossier column is its own area down to the dock, the counter
  tray sits under the shelf column only, and the two columns scroll separately; a redraw keeps both positions
  (UI_UX §SALE — DESK LAYOUT, UI-Q-v29-25).

- Quick fix (User 2026-09-25): SALE forecast pin — on a phone, while the readout is scrolled out of view, its two readings
  float at the top of the scrolled column, where the readout sat; one tap folds them to a `전망` chip until the readout is on screen again; no Save field (UI_UX §SALE — FORECAST PIN, UI-Q-v29-24).

- Quick fix (User 2026-09-25): the ORDER supply-cap toast reads `오늘 공급 최대 수량입니다.` (COPY_AUDIT §3-9, UI_UX, UI_UX_QA) — the
  old `오늘 공급이 끝났습니다.` read as if nothing could be ordered at all.

- Fix (2026-09-25, RUNTIME UX BUG from I-3): the D0 briefing's two body lines had no style rule and fell to the secondary tone.
  User 2026-09-25: the `DAY 05` / `DAY 30` anchors come back as an LED label over each line (COPY_AUDIT §14-1, UI_UX §BOSS D0, UI-Q-v29-14).
- Close-out (2026-09-25): EVENT §08 — on a morning with no existing slot the newcomer is the Day's only visitor (User);
  평생 단골제 card drops `(하루 1회)`; SPEC_INDEX status / acceptance updated; WORK_STATE carries the balance handoff.

- SPEC_INDEX: v2.9.0 purpose / scope, VERSION POLICY, v2.9.0 release acceptance; v2.8 sections kept as
  closed record. Deferred router renamed to GUILD24_v3.0_PLUS_DEFERRED_DETAILED.md (content unchanged).
- Scope review against the playtest: nothing promoted from v3.0+; three small presentation items
  deferred to v3.0+ (SPEC_INDEX §CURRENT v2.9.0 PURPOSE, router §REVIEWED).
- Rules batch (D-2, commits 74df6b9 / 19e3ba3 / 4b00b79 / this): Supply is Fatigue recovery only —
  no Supply Burden, no required Supply, no deficit penalty; Item value shown as `피로 회복 N`; Fatigue
  0~40 in five bands (정상 / 지침 / 과로 / 소진 / 탈진), outcome gain +4 / +7 / +9 (re-tuned -1 from +5 / +8 / +10 after the I-2 re-measure), Severe-Injury rest
  -5 per day, Fatigue-40 Death term +10%p; Hazard pressure one non-투력 Stat per Hazard 3/3/3
  (화염 -> 기동, 어둠 / 화이트아웃 -> 정신) with the labels `강인함으로 버틴다` / `기동으로 피한다` /
  `정신으로 견딘다` and nine exact Hazard sentences; NIGHT band name from 20 and a next-decision line
  from 10. Owners: DUNGEON_HAZARD, ITEM, NIGHT_CLOSING, NPC_TRAIT, RELIC, BOSS, FINAL_EXPEDITION, SALE,
  UI_UX, ECONOMY_ORDER, COPY_AUDIT_APPROVED, COPY_WORLD_VOICE + QA owners. Source follows (tests/copy.cjs
  is expected to fail until then).
- SALE / transaction batch (D-3, commits cbc7e16 / f9a06f1 / 068df2d): PRESENTATION_PRINCIPLES
  §TRANSACTION BEAT (hand-over into the Bag, customer reaction, customer exit/entry, price-mode
  sound family, refusal beat; presentation-only, ≤320 ms, reduced-motion no-op); UI_UX / SALE: the Bag
  stays in the customer-state strip (User revision 2026-09-24, I-1c: A3 "Bag on the counter" reversed;
  v2.8 place, one step larger, the hand-over lands there), reply lines 5 s, Stat grid pressure tag, matching-effect
  emphasis, `판매 후 변화` as one delta list with the frozen outlook not repainted (no outlook delta
  rows), readout = 전투 전망 + 환경 대응 with the Death % in the 전투 전망 help and NPC detail, price role
  words; COPY_AUDIT §3-7 / §4-1 / §4-3 / §4-19 / §4-20 / §5-7; UI_UX_QA UI-Q-v29-3 … -9.
- Onboarding / ORDER batch (D-4, commits c156f33 / this): DAY 1~3 task line (`오늘 할 일 — …`, one per
  phase, hidden when the tutorial is skipped); first-ORDER coach order gates → offer → quantity → confirm →
  reroll (gold mark retired); ORDER today-fit typographic emphasis (no badge / verdict word); per-Gate
  visitor counts on the ORDER 오늘 line when two or more Gates are open (reveal boundary narrowed to
  individual identity / destination); D0 briefing body two lines; 점주 가이드 opens with 처음 3일 and folds
  the eight sections under 자세히. Owners: UI_UX, ECONOMY_ORDER (+QA), COPY_AUDIT §3-7 / §3-8 / §4-21 /
  §8-0 / §14-1, COPY_WORLD_VOICE, UI_UX_QA UI-Q-v29-10 … -14.
- Card copy / leftovers batch (D-5): COPY_AUDIT §11-1 … §11-30 rewritten in two clauses (effect · condition,
  no accounting clause, values unchanged; RELIC citations follow); UI_UX: no second owned-Relic block in
  SALE at any width, ORDER held-stock list starts collapsed with a persisted open choice; UI_UX_QA
  UI-Q-v29-15 … -17. Documents-first work is complete; Source batches follow (I-1 … I-4).
- COPY_AUDIT_APPROVED §3 / §4, COPY_WORLD_VOICE §TUTORIAL COACH COPY, UI_UX §TUTORIAL: first-sale coach
  diet — four marks (destination, Hazard, outlook, price), contextual Supply / 대성공 / 재방문 / 가방,
  concept popovers (commit 66f37e4; Source e0d0c44).
- 구급키트 / utility copy (K): 구급키트 is pure Insurance (no Core Stat; the catalog `강인함 +10` was a
  leftover never owned by ITEM), Buy / Sell 80 / 170 (ITEM, DUNGEON_ITEM_QA ITEM-Q81); the three
  numberless utility lines are compact (COPY_AUDIT §4-22, COPY_WORLD_VOICE §FIRST AID KIT); the unused
  `curePoison` effect key is deleted (no Item ever carried it).
- Counter tray (T / I-1d): the SALE per-row price panel becomes one fixed counter tray above the dock —
  the chosen Item, its `판매 후 변화`, `특수 효과` and the three price keys always sit in the same place and
  the shelf list never moves (User-approved composition change; PRESENTATION_PRINCIPLES §COMPOSITION LOCK,
  UI_UX §SALE — COUNTER TRAY, SALE, COPY_AUDIT §4-23 / §4-24, UI_UX_QA UI-Q-v29-18).
- Trims (U, User 2026-09-24): the `지난 원정` quick surface is desk-only (phone: NPC detail 원정 기록), the empty
  counter tray shows its prompt on DAY 1~3 with the tutorial only (otherwise no height), the PRICING coach
  drops the hand-over clause (A7 retired), the RETURNING coach anchors on the customer's card.
- Fatigue line (I-2a, User 2026-09-24): SALE carries no always-on Fatigue line; `피로 A → 출발 B` lives only on
  the counter tray for a chosen Food/Drink, the SUPPLY coach anchors there (COPY_AUDIT §3-5 / §3-7 / §4-17 / §6-6
  band examples, UI_UX, DUNGEON_HAZARD boundary, DUNGEON_ITEM_QA, UI_UX_QA).
- Rules adoption in Source (I-2, commits 67e63c3 / 22c288c / 840fbfe): engine, presentation and copy follow the D-2 rules;
  re-measure vs 6cb62b4 in reports/remeasure-v29-summary.md (BALANCE FINDING: reported, not tuned).
- Onboarding / ORDER in Source (I-3): DAY 1~3 task line on every phase, first-ORDER coach gates -> offer -> quantity ->
  confirm -> reroll, Gate detail full Hazard sentences + destination-plate ?, ORDER today-fit emphasis and per-Gate
  visitor counts, D0 briefing two lines, 점주 가이드 처음 3일 + 자세히.
- Gate Hazard requirement number (User 2026-09-24 revision): the Gate-level 충분 requirement `대응 {N} 필요` (ceil(Hazard
  Threat)) and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` are public at MORNING / ORDER Gate detail and in the
  SALE plate ?, the number first; no per-customer remaining need. DUNGEON_HAZARD boundary, UI_UX §GATE VS ITEM /
  §HAZARD NUDGE, ECONOMY_ORDER, COPY_AUDIT §4-16, DUNGEON_ITEM_QA DUN-Q21, UI_UX_QA UI-Q-v29-19.
- Revision 2 (User 2026-09-24): the pressure labels `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and the
  SALE destination-plate ? help are retired; every Hazard row (SALE plate, D25 scouting report, FINAL 확인된 위협 included)
  reads the numbered short row, the Final / D25 with N = 29 (Day 30 / T2). DUNGEON_HAZARD, UI_UX, UI_UX_QA, COPY_AUDIT §4-15 /
  §4-16 / §14-7, COPY_WORLD_VOICE §D25, DUNGEON_ITEM_QA DUN-Q21, SALE, FINAL_EXPEDITION.
- Fatigue outcome gain re-tuned -1 to +4 / +7 / +9 after the I-2 re-measure (R1); phone SALE balloon 2px / 14px (R2, CSS only).
- Revision 3 (User 2026-09-24): 어둠 -> 기동 ×0.40 so no Gate's Hazards share one Stat (망자역 지하묘지 = 정신 + 기동); the split
  is 강인함 3 / 기동 4 / 정신 2. DUNGEON_HAZARD, DUNGEON_ITEM_QA DUN-Q21 / DUN-Q-v29-2, ITEM, SPEC_INDEX, COPY_WORLD_VOICE §D25.
- Revision 4 (User 2026-09-24): the Core-Stat conversion is an integer, read `{능력치} n당 1` — 강인함 ×1/3 (3당 1), 기동 / 정신
  ×1/2 (2당 1), each rounded in the player's favour from ×0.30 / ×0.40. Every Hazard row and sentence, DUNGEON_HAZARD coefficient
  table, DUNGEON_ITEM_QA, COPY_AUDIT §4-16, COPY_WORLD_VOICE §D25, UI_UX, UI_UX_QA, SALE, ECONOMY_ORDER, FINAL_EXPEDITION.
- First-SALE coach gains a STATS mark on the 능력치 grid, after HAZARD (User 2026-09-24): five marks; exact line COPY_AUDIT §3-7 STATS,
  UI_UX §TUTORIAL, COPY_WORLD_VOICE §TUTORIAL COACH COPY list.
- Revision 5 (User 2026-09-24, play feedback F1): 화염 -> 정신 ×1/2 restores 3 / 3 / 3 (강인함 독·냉기·부식 / 기동 속박·진창·어둠 / 정신
  공포·화이트아웃·화염) with no Gate sharing a Stat; the STATS coach line reads `능력치는 직업·희귀도·레벨마다 다르다. 투력은 전투에 가장
  영향력이 크며, 강인함·기동·정신은 각 위험에 대응한다.` DUNGEON_HAZARD, DUNGEON_ITEM_QA, ITEM, SPEC_INDEX, COPY_WORLD_VOICE §D25, COPY_AUDIT §3-7.
- F3 (User 2026-09-25, play feedback): 구급키트 lowers the Outcome one step (중상 → 부상, 부상 → 무사); no natural Fatigue recovery of any kind
  (rest days included); 중상 takes the 부상 Fatigue gain (+9); repeated-strain Death escalation (+8%p per repeated injured / Fatigue-20+
  departure, cap +30%p) with the NPC detail row `무리한 출발 {n}회`; the route-change line names 거짓말쟁이 with correct particles.
  ITEM, NIGHT_CLOSING, DUNGEON_HAZARD, DUNGEON_ITEM_QA, UI_UX, COPY_AUDIT §4-22 / §14-10, COPY_WORLD_VOICE.
- I-4 (User 2026-09-25): the 30 Store Support card texts read condition first (`조건 · 효과`, COPY_AUDIT §11-1 … §11-30 exact, adopted in
  relics.js so tests/copy.cjs passes whole); SALE keeps no second owned-Relic block on desktop (UI-Q-v29-16); the ORDER warehouse list starts
  collapsed (UI-Q-v29-17). COPY_AUDIT.
- F7 (User 2026-09-24): owned Store Support quick view carries a runtime status line for condition-type supports (RELIC §QUICK VIEW STATUS LINE,
  COPY_AUDIT §11-32); purchase notice `{점포지원명} 확보.` (§11-33); Counter judgement split into 직접 대응 / 관련 준비 (RELIC §COUNTER JUDGEMENT) —
  acceptance floor and 원정 위험 게시판 read 관련 준비, the multipliers / pity / cert rewards read 직접 대응, the 기동-for-속박/진창 exception retired;
  accessible-mode base need 0.72 (measured). RELIC, RELIC_QA, ECONOMY_ORDER, ECONOMY_ORDER_QA, SALE, ITEM, UI_UX, UI_UX_QA, COPY_AUDIT.
- F6 (User 2026-09-24): the matching-effect / today-fit emphasis is retired (SALE, ORDER); Item effect lines stand in one fixed per-category
  order (ITEM §PRESENTATION ORDER); the category grammar is taught once (COPY_AUDIT §8-0 line under 처음 3일, the first ORDER OFFER coach);
  each sale shows a per-customer receipt stub `단골도 {±N} · 소지금 {A} → {B}` (~2.5 s, PRESENTATION §TRANSACTION BEAT A8, COPY_AUDIT §4-24);
  refusals keep the engine-reason reply pools; PRESENTATION §LEARNING AFTER RESULT. SALE, UI_UX, UI_UX_QA (UI-Q-v29-22), PRESENTATION_PRINCIPLES, ITEM, COPY_AUDIT.
- F5 (User 2026-09-24): menu row 점포지원 opens the owned list when no window is purchasable; new menu row 이번 영업의 장식 (read-only
  loadout, empty Slot `비어 있음`); DAY 0 `장식 구성 다시 보기` retired; codex tab 점포 관리 → 점포 장식; 현재 지점 포기 discards the Run at once
  and returns to 새 점포 준비 (no Run) where Decorations can be bought; Store Capital Day-reach rates halved (0.5 / 1 / 1.5 / 2 / 2.5%).
  UI_UX, UI_UX_QA, RELIC, CORE_RUN, META, COPY_AUDIT §1-7 / §9.
- F4 (User 2026-09-24/25): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 ·
  불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT,
  2~5 days); SALE shelf ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet
  multipliers 대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10; 세계수 생환부적 400 / 800. ITEM, ECONOMY_ORDER, ECONOMY_ORDER_QA,
  CORE_RUN, DUNGEON_HAZARD, DUNGEON_ITEM_QA, SALE, UI_UX, UI_UX_QA.
- F2-b (User 2026-09-25): the Hazard short row is `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공` (one line at 900px+); the SALE Stat
  grid tag sits beside the Stat name and the value is one step smaller. DUNGEON_HAZARD, COPY_AUDIT §4-16, UI_UX §STAT PRESENTATION, UI_UX_QA.
- Play feedback F2 (User 2026-09-24): the next-day Gate / Tier forecast surface is retired (MORNING and ORDER; generator rules unchanged);
  ORDER rows carry the rarity name under the Item name; a Gold- or space-blocked quantity control answers a tap with the reason toast
  (COPY_AUDIT §3-9); Trait flavor notes removed (거짓말쟁이 keeps its function line as an effect row). UI_UX, UI_UX_QA, ECONOMY_ORDER,
  ECONOMY_ORDER_QA, DUNGEON_HAZARD, DUNGEON_ITEM_QA, CORE_RUN, COPY_WORLD_VOICE, NPC_TRAIT, SPEC_INDEX.

## v2.8.0 — closed 2026-09-24

Core Readability / Playtest Response release. Owners consolidated 2026-09-23 (reports/ssot-consolidation/).
Deployed from main 8226c4c.
