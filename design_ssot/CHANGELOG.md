# GUILD24 DESIGN SSOT — CHANGELOG

Version policy: SPEC_INDEX §VERSION POLICY. Filenames are lineage names; the version lives here, in
the owner headers and in the git tag.

## v2.9.7 — decorations and Rarity (User 2026-09-26)

After the decoration and Rarity review (reports/deco-balance-v296.md §1~7; `tools/deco-impact.cjs`, `tools/rarity-value.cjs`,
reader 800 runs per arm):
- Rarity growth step 0.06 -> 0.10 (NPC_TRAIT §NPC RARITY now writes the generation values down; the step lived only in Source).
  At 0.06 Rarity's benefit and its operating-cost price roughly cancelled; at 0.10 the benefit is clear (clear +3.7%p vs cost
  -0.2%p) and a fresh account sits at D30 9.8% / clear 6.8%. The unused `traitSlots` field is removed (User: the per-Level Trait slot
  was dropped earlier).
- 원정 지원금 간판 (sign economy, id dawnSign, remakes 새벽배송 안내판): each visiting adventurer gets an extra purchase budget of 25%
  of their purse, that visit only - the Event 추가 구매 channel, cleared every night, so nothing compounds (the ×purse variant was
  rejected for that). Measured D30 +19.6 / clear +10.7 / Store Capital per Run +481, beside 훈련소 제휴 간판 (+22.0 / +16.6 / +369).
- wall and display economy Decorations swap Slots, names and art following the Slot: 길드 추천 매대 (display 500, 30% visitor +1
  unchanged) and 명예 모험가 액자 (wall 1000, rarity weights [35, 30, 22, 9, 4], above 평범 65%). Ids kept; an Account holding one on
  the Slot it left has that Slot empty, ownership kept.
- 구급품 진열장: up to ten times per Run an ordinary Injury the expedition would leave is not left (구급키트's 부상 -> 무사 step);
  it no longer turns a Death into 중상 (that overlapped 추모 방명록). A carried 구급키트 settles first.
- Store-panel effect lines break between words (`word-break:keep-all`).
- CLOSING cash-flow receipt (User 2026-09-26, same version): the receipt reads as the Day's cash - 영업 전 자금, the Gold that
  moved (매출 / 발주 / 운영비 always, the rest only when they moved), the 보유 자금 box (stamped) with 영업 손익 ±N (the cash
  change: green up, red down, gold at 0), then 창고 재고 and 오늘 폐기 on their own lines (the expired Items named, ×n from two,
  up to three then 외 N종) and 내일 운영비 예상 (not on DAY 29). 판매 원가 / 판매 마진 / 폐기 원가 are gone: the waste cost
  printed as a loss read as Gold leaving twice. The opening is derived from the Day's flows, so it always adds up
  (checked against every Day of the User's 24-Day save). NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT — EXACT, UI_UX §CLOSING,
  UI_UX_QA UI-Q18 / UI-Q-v29-33, COPY_AUDIT §7-3 / §8-0, COPY_WORLD_VOICE coach line; ledgers; `tomorrowOperatingCost()` reads the
  same operating rule for the next Day; tests ui-guard / integration.
- META §INITIAL FOUR DECORATIONS / §SURVIVAL ALTERNATIVES / §Prices, NPC_TRAIT §NPC RARITY, NPC_TRAIT_QA, RELIC / RELIC_QA (name
  collision lines), COPY_AUDIT §9-3 / §9-5 / §4-24, PRESENTATION_PRINCIPLES (the brink row); ledgers; art dawnSign / guildPlaque /
  premiumCase; font subset regenerated; tests revision / copy / integration; qa-replay-nudge buys the display Decoration.

## v2.9.6 — codex and Item Flavor cleanup (User 2026-09-26)

- Monster Knowledge leaves the codex (User 2026-09-26: every Gate's Hazards are public, so the tab that opened them by
  returns had nothing left to teach): the `몬스터 지식` tab and its `보급 생환 N회` line are gone; the account record stays,
  unshown (save shape unchanged; the measurement harness still reads it). META §MONSTER KNOWLEDGE, UI_UX §META UI,
  UI_UX_QA UI-Q39 (retired to a guard), COPY_WORLD_VOICE; ledgers; tests revision / traits / ui-guard now pin its absence.
  The Gate `monster` / `weakness` fields only that tab read are archived (User 2026-09-26) -> archive/v2.9.6/dungeon-monster-identity.md;
  the Monster Knowledge record itself stays for balance measurement (User 2026-09-26).
- Item Flavor cleanup (User 2026-09-26: "기능설명 같거나 어색하거나 뭔 말인지 모르겠는 것"): ten Flavors that restated the
  effect line, contradicted it (쿨링 이온음료 "less cool than 얼음컵" while its 화염 대응 is larger) or did not read are
  replaced - 컵라면 · 캔커피 · 용사의 곡주 · 경량 로프 · 구급키트 · 방수망토 · 원정용 장화 · 설원 고글 · 귀환석 · 쿨링 이온음료;
  no effect changes. 귀환석's crisis roll was said only in its Flavor, so its escape row now carries it
  (`탈출 확률 +{N}%p (사망·중상 위기에도 한 번 더 판정)`; the shelf keeps the part before the bracket, as the other utility rows do).
  COPY_AUDIT §12-4 / §4-22; font subset regenerated (`npm run assets`); tests copy.
- ORDER price tags (User 2026-09-26: the unlabelled tag showed the sale price on the screen that spends the buy price): `매입 {N}G`
  on the tag, a smaller muted `판매 {N}G` under it, the metadata line starts at `수익 +{N}G`. UI_UX §ORDER — ITEM INFORMATION
  HIERARCHY, UI_UX_QA UI-Q-v29-39, COPY_AUDIT §4-26; ledgers; ui-guard pin.
- Item values (User 2026-09-26, after the item review reports/item-balance-v296.md and the second fresh Run to DAY 24 - judged on
  target, no injury lever): 불룡볶음면 냉기 +6 → +12 / 강인함 +8 → +6 (its Cold read below 컵라면's); 귀환석 260 / 520 → 200 / 400
  (its sale price sat above the p90 customer purse until ~D20); Epic Drink Stat +4 - 초고속 에너지드링크 기동 26, 대현자 허브엘릭서
  정신 28, 왕도 천연암반수 강인함 24. 방수망토 unchanged. 마그마 냉각장비 투력 +6 → +10 (User 2026-09-26, after the merge; the
  only Epic hybrid for a one-Hazard Gate read weaker at its own Gate than 쿨링 이온음료). `reader` 200 runs before → after: reach D20 .17 → .21,
  D30 .05 → .07, clear .025 → .020. ITEM §HAZARD COUNTER BASELINE / §EPIC FOOD / DRINK / POTION / §OTHER ACTIVE ITEMS / ACTIVE
  CATALOG, DUNGEON_ITEM_QA; ledgers; tests vocabulary; reports/ITEM-PRICES.md regenerated.
- Codex cards break between words only (`word-break:keep-all`; separate visual review, RUNTIME UX BUG that predates v2.9.6:
  the narrow 1280 cards split Hangul words mid-word).

## v2.9.5 — SALE strain line (User 2026-09-26)

- SALE strain line (User 2026-09-26, after the v2.9.4 16-day playtest: 실패 시 사망 위험 sat inside the 전투 전망 `?` and did not
  register; 7 of the 8 deaths departed injured): a customer departing injured with an injured-departure chain of {n} >= 1 shows one
  thin line `연속 부상 출발 {n}회` directly under the readout `.top` - the NPC detail row's wording and number, no %, no verdict. The
  % stays the second line of the `?` (v2.9.0 kept). UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT, UI_UX_QA UI-Q-v29-38,
  COPY_AUDIT §4-25; ledgers; build marker 2.9.5; ui-guard pin; runtime tools/qa-strain-line.cjs (in qa:runtime).

## v2.9.4 — replay nudge (User 2026-09-26)

- Replay nudge, "show, never assign" (User 2026-09-26, after the v3.0 prep review with GPT - reports/v3.0-prep.md §3-1): the END
  `본사 해금` row also lists the D10 / D14 products the Run opened (the Run records them; their Day toast is unchanged); when the
  Run opened nothing, one line at the foot of the tape - the settlement crossed an unowned Decoration's price
  (`점포 자본으로 새 장식을 들일 수 있다.`), else a new best Day (`지금까지 가장 오래 버틴 점포다 · DAY {N}`), else nothing; 새 점포
  준비 marks a Slot whose unowned Decoration the capital covers (`들일 수 있음`). One new account record, `bestDay` (natural
  endings only; a manual abandon never reaches it). No task, list, count, reward, motion or sound. META §BEST DAY / §D10 / D14
  PRODUCT UNLOCK / §SAVE, UI_UX §END — REPLAY NUDGE / §Pre-Run Decoration empty-slot interaction, UI_UX_QA UI-Q-v29-37,
  COPY_AUDIT §1-8 / §10-3; ledgers; build marker 2.9.4; tests integration / ui-guard; runtime tools/qa-replay-nudge.cjs (in
  qa:runtime). tests/acquisition.cjs now quotes the META Decoration expectation instead of a stale 2026-09-19 line.

## v2.9.3 — balance fourth pass, two runtime fixes, build marker (User 2026-09-26)

Version routing (User 2026-09-26): v2.9.2 closes at `main` `d6fcfbd` (H1~H6 all adopted, balance through the third pass), where its tag
goes; everything merged after it is v2.9.3. Owner headers now carry the version they last changed in (VERSION POLICY; the v2.9.2
bumps had not been made and are made here with the v2.9.3 ones).
- UX reconfirmations closed (User 2026-09-26): the six items taken on a recommendation while the User was away on 2026-09-25 are
  confirmed as built - SALE tray fold, ORDER floating today line, every open Gate visited, the D30 flow, the shelf summary lines, the
  H5 seal details. UI_UX / FINAL_EXPEDITION / COPY_AUDIT §14-9 lose their "to reconfirm" marks (ledgers edited in place).
- Build marker (User 2026-09-26): the opening screen shows a small `v2.9.3 · {commit}` in its corner and the console prints it on load;
  the Pages deploy stamps the commit. UI_UX §BUILD MARKER, UI_UX_QA UI-Q-v29-36; ledgers; ui-guard pin.
- `npm run qa:visual` harness (2026-09-26, TEST GAP): its crude drive now ends a Run before DAY 5 under the current balance, so the gate
  stopped at `relic`; the till and the Death count are kept afloat during the fast-forward, as the capture tools already do. Harness only.
- ORDER coach `gates` never shown (2026-09-26, IMPLEMENTATION BUG, found once `qa:visual` reached its coach probe again): coach seen
  state is keyed by step id alone and ORDER's `gates` step shared MORNING's id, so the first ORDER coach started at `offer`. ORDER's
  step is now `order-gates` (UI_UX_QA line edited in place); a player who already saw MORNING's lesson gets ORDER's once. ui-guard
  pin: coach ids unique across phases. The Boss-reveal hold also ends at once if the Day leaves the MORNING it belongs to (only a
  scripted path can), so the screen is never left inert (UI_UX §BOSS REVEAL — MORNING LANDS FIRST, edited in place).
- Balance, fourth pass (User 2026-09-26, "PL", after the package measurement — archive/v2.9.2/v292-bot-harness.md §11): Gate count DAY 19~24
  3 at 70% (2 at 30%, one draw), DAY 25~29 exactly 3 (no draw); the Level factor on the failure Death roll is removed (rolledDeathChance =
  failureDeathChance × preparedFactor; the SALE risk snapshot is the raw chance); 후방 창고 증설 +10 → +5 slots (price 130G kept). Measured
  (paired D10 fork): `reader` all-fresh D30 12.4% → 8.9%, CURRENT_SKILLED_D10 .465 → .364; the Warehouse change is not binding for the bot
  (peak stock 14) and rests on the User save (~24 Items before the Final). DUNGEON_HAZARD §Gate-count generation / §Preparation / Level
  Death reduction, DUNGEON_ITEM_QA DI-Q-v28-12 / DUN-Q-v29-BC1, RELIC / RELIC_QA, COPY_AUDIT §11-27; ledgers amended; tests night / delta /
  copy.
- Boss reveal after MORNING lands (User 2026-09-26, the DAY 0 -> DAY 1 overlap the H6 capture reported, RUNTIME UX BUG): a reveal due on
  a fresh MORNING entry waited 0 ms, so the dossier opened in the same frame as the cut. It now waits 420 ms (the shutter) with the screen
  inert - the Day still cannot advance past an owed reveal (CORE_RUN §D0; a double tap on 구매 used to be able to reach 문 열기 once the
  wait existed, caught by the separate review) - and reduced motion opens it at once. Every reveal stage shares the one mechanism. UI_UX
  §BOSS REVEAL — MORNING LANDS FIRST, UI_UX_QA UI-Q-v29-35; ledgers; ui-guard pin; runtime tools/qa-boss-hold.cjs (in qa:runtime).
- Bug fix (2026-09-26, IMPLEMENTATION BUG): a full data reset (`reset-go`) kept the UI's pending Run seed, so a store planned before
  the reset was reopened on the same seed - and the same Boss - after it. The reset now drops the plan with the rest of the Run
  state. No design, RNG, seed-format or save change. Runtime regression tools/qa-reset-seed.cjs (in qa:runtime).

## v2.9.2 — game feel (타격감), H1 / H2 / H3 / H4 / H5 / H6 ADOPTED (User 2026-09-25); CLOSED 2026-09-26 at main `d6fcfbd` (tag `v2.9.2` to be set there by the User - tag pushes are not available to WORK sessions)

H1~H6 are all adopted in Source (entries below, in the order they happened). PRESENTATION_PRINCIPLES §GAME FEEL BEAT registers H1 NIGHT verdict stamp, H2 SALE
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
- H4 CLOSING receipt ADOPTED (User 2026-09-25): UI_UX §CLOSING — RECEIPT STAMP (the receipt body prints as one 200 ms pass
  behind one printer tick, never a tick per row; only the 영업 손익 row's number lands as a stamp - 100 ms hold, the NIGHT
  stamp's 90 ms fall, the tape gives 4 px; profit stamps gold, loss stamps red; the END settlement's 현재 점포 자본 counts up
  in 320 ms with one `ui` click per Decoration price line it passes, read from the live price list); UI_UX_QA UI-Q-v29-33;
  ledgers UI_UX / UI_UX_QA; PRESENTATION H4 row ADOPTED. Source: app.js (CLOSING_STAMP, closingSound, playPhase closing / end
  settlement count-up), audio.js (new synthesised `receipt` cue), ui.css (`.print .profit b` corrected to the actual `--gold`
  token - the pre-existing colour was a dark green, an IMPLEMENTATION BUG the written "gold for profit" contract already
  required fixed; found by the separate visual review, not self-reported). Capture tool tools/qa-closing-beat.cjs.
- H6 장면 전환, capture-and-report phase (User 2026-09-25): all four candidate hard cuts (CLOSING, FINAL, END,
  the DAY 0 screen) captured as real before/after frames, one continuous seeded Run, 390 / 1280
  (`archive/v2.9.2/v292-h6-transitions.md`, capture tool `tools/qa-h6-transitions.cjs`). Finding: CLOSING and END
  already carry content entry from H4 / H5 once settled, and DAY 0 lands on MORNING's pre-existing entry - a
  first pass at 390 only used a 30 ms post-press frame and read as more bare than the settled truth; a
  `-settled` (+600 ms) frame was added and re-verified before reporting. No Source change this phase (AGENTS
  §9 - WORK does not pick the targets).
- H6 FINAL boss reveal entry ADOPTED (User 2026-09-25, after reviewing the capture): FINAL alone chosen (the
  only screen with no `playPhase` branch at all); UI_UX §FINAL — BOSS REVEAL ENTRY (the `.gate-zero` boss
  art/name plate settles in as one movement, translateY 10px -> 0 + opacity 0 -> 1, 220 ms outQuad, 일반
  intensity, no new sound or copy); UI_UX_QA UI-Q-v29-34; ledgers UI_UX / UI_UX_QA; PRESENTATION H6 row
  ADOPTED; SPEC_INDEX updated (v2.9.2 H1-H6 all ADOPTED). Source: app.js (`playPhase` final branch only).
  Capture tool tools/qa-final-reveal-beat.cjs. Separate visual review: PASS, no fix needed. The DAY 0 -> DAY 1
  boss-modal overlap the User also flagged is left UNRESOLVED / DESIGN ISSUE - it is the same immediate,
  no-delay `bossRevealDue()` mechanism shared by D0/D5/D10/D15/D20/D25 with an explicit design-intent comment
  in Source, so changing its timing is a bigger design call than this batch's authorized scope.
- Balance, third pass (User 2026-09-26, "g1 l2 t", after the paired D10-fork arms — archive/v2.9.2/v292-bot-harness.md §9-10): the Gate
  Day term climbs at 1.10 per Day on DAY 11~20 (DAY 1~10 unchanged; DAY 21+ returns to the 0.80 slope carrying the D20 offset; D20 25.3, D29 32.5); levelFactor floor 0.75 → 0.85
  (identical through Lv11); DAY 21~29 move 0.10 of the T2 weight to T3. Measured together (GLT): `reader` all-fresh D30 12.1% →
  8.6%, CURRENT_SKILLED_D10 .558 → .450; the D21~29 slope 0.90 and a Great Success Gold cut were measured and not taken; the
  all-fresh 10% floor is not a real-player measure (User). DUNGEON_HAZARD §GATE POWER / §Tier generation / Level Death reduction,
  DUNGEON_ITEM_QA; ledgers amended; tests night (Gate term, tiers, levelFactor).
- Balance, second pass (User 2026-09-26, after the `reader` harness review — archive/v2.9.2/v292-bot-harness.md §7): 대성공 EXP 1.10 → 1.00,
  combat-success EXP 1.00 → 0.90 (퇴각 0.38 / other living 0.50 unchanged); operating dayBase + 12 × max(0, Day − 15). Measured:
  `reader` clear 14.9% → 7.2%, the D29 cash median ~5,100 → ~3,400; a level-coefficient raise (0.05~0.10) was rejected - it taxed
  D1~15 too and doubled bankruptcies. DUNGEON_HAZARD §Ordinary EXP, DUNGEON_ITEM_QA, ECONOMY_ORDER §BASE OPERATING COST,
  ECONOMY_ORDER_QA; ledgers amended; tests night (EXP) / integration (operating cost).
- Balance, Great Success EXP 1.40 → 1.10 (User 2026-09-25): only the EXP multiplier; Great Success occurrence / probability,
  Store Gold and the expedition NPC Wallet reward unchanged. Purpose: weaken the snowball of a strong NPC growing faster
  through Great Success EXP. DUNGEON_HAZARD §Ordinary EXP, DUNGEON_ITEM_QA; ledgers amended.
- Balance, Gate early slope 1.20 → 1.50 and 정가 final purchase chance × 0.90 (User 2026-09-25, after the relative review in
  archive/v2.9.2/v292-balance-review.md, `human` lens): late slope 0.80 / knee Day 9 kept; the × 0.90 applies to the final 정가 chance
  with the 0.97 관련 준비 case included, 50% / 150% and the shared accessible need unchanged. DUNGEON_HAZARD §GATE POWER,
  DUNGEON_ITEM_QA, ECONOMY_ORDER §PURCHASE INTENT, ECONOMY_ORDER_QA, SOURCE_ADOPTION_QA note; ledgers amended. To be
  checked in User play on the deployed build.

## v2.9.1 — balance (User decisions 2026-09-25); owners amended, Source adopted, CLOSED 2026-09-25 (main `d23d076`, tag `v2.9.1`)

The v2.9.0 BALANCE FINDING is resolved as its own version (User 2026-09-25). Values: `archive/v2.9.1-balance/v29-balance-agreements.md`;
measurements and the gaps the User accepted: `archive/v2.9.1-balance/v29-balance-ideal.md`. Source adoption ran in a separate session
(branch `claude/v291-balance-source-adoption`, batches 1-6, `archive/v2.9.1-balance/v291-implementation-handoff.md`) and is complete.
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
  - 7-b closed: the remaining-Supply buffer stays. Known measured gaps accepted by the User are in `archive/v2.9.1-balance/v29-balance-ideal.md`
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
    `archive/v2.9.1-balance/v29-balance-ideal.md` §종결 측정 is recorded in that report's §네이티브 재측정 (`2f0753d`): several metrics
    exceed the handoff's ±4%p, accepted by the User as sampling-error-range known differences (not tuned).

## v2.9.0 — implementation complete 2026-09-25; the BALANCE FINDING moved to v2.9.1 (User decisions 2026-09-24/25)

Theme: easy to learn, hard to master. Readability, onboarding, a visible transaction, simpler rules.

Docs-first. Each owner amendment is listed when committed.

State 2026-09-25: every batch below is in Source on `claude/ux-simplify-handoff-7oorbc` (npm test, ssot:check and qa:runtime PASS).
The BALANCE FINDING (`archive/v2.9.1-balance/v29-balance-finding-handoff.md`) and 7-b were decided in the balance session and are v2.9.1 (User 2026-09-25).

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
  re-measure vs 6cb62b4 in archive/v2.9.1-balance/remeasure-v29-summary.md (BALANCE FINDING: reported, not tuned).
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
