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
  0~40 in five bands (정상 / 지침 / 과로 / 소진 / 탈진), outcome gain +5 / +8 / +10, Severe-Injury rest
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

## v2.8.0 — closed 2026-09-24

Core Readability / Playtest Response release. Owners consolidated 2026-09-23 (reports/ssot-consolidation/).
Deployed from main 8226c4c.
