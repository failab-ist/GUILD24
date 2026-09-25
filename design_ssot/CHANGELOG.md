# GUILD24 DESIGN SSOT — CHANGELOG

Version policy: SPEC_INDEX §VERSION POLICY. Filenames are lineage names; the version lives here, in
the owner headers and in the git tag.

## v2.9.0 — in progress (User decisions 2026-09-24)

Theme: easy to learn, hard to master. Readability, onboarding, a visible transaction, simpler rules.

Docs-first. Each owner amendment is listed when committed.

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
- F2-b (User 2026-09-25): the Hazard short row is `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공` (one line at 900px+); the SALE Stat
  grid tag sits beside the Stat name and the value is one step smaller. DUNGEON_HAZARD, COPY_AUDIT §4-16, UI_UX §STAT PRESENTATION, UI_UX_QA.
- Play feedback F2 (User 2026-09-24): the next-day Gate / Tier forecast surface is retired (MORNING and ORDER; generator rules unchanged);
  ORDER rows carry the rarity name under the Item name; a Gold- or space-blocked quantity control answers a tap with the reason toast
  (COPY_AUDIT §3-9); Trait flavor notes removed (거짓말쟁이 keeps its function line as an effect row). UI_UX, UI_UX_QA, ECONOMY_ORDER,
  ECONOMY_ORDER_QA, DUNGEON_HAZARD, DUNGEON_ITEM_QA, CORE_RUN, COPY_WORLD_VOICE, NPC_TRAIT, SPEC_INDEX.

## v2.8.0 — closed 2026-09-24

Core Readability / Playtest Response release. Owners consolidated 2026-09-23 (reports/ssot-consolidation/).
Deployed from main 8226c4c.
