# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=V2_9_0_IMPLEMENTATION_COMPLETE_2026-09-25; RELEASE_OPEN_ON_BALANCE (v2.8 canonical baseline closed 2026-09-24)
SOURCE_ADOPTION_STATUS=V2_8_CLOSED; V2_9_0_ADOPTED (every owner amendment of the 2026-09-24/25 decisions is in Source; npm test / ssot:check / qa:runtime PASS at the close-out commit)
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
NONBLOCKING_CANONICAL_DETAIL_GAPS=NONE
EXTERNAL_PUBLIC_RELEASE_TARGET=v3.0.0

## AUTHORITY

1. User's newest approved decision
2. current GUILD24 Design SSOT routed by this index
3. current Source
4. older chat / proposal / report / historical spec

DESIGN TRUTH = current routed Design SSOT.
IMPLEMENTATION TRUTH = current Source.

## CURRENT v2.9.0 PURPOSE — "쉽게 배우고, 깊게 파는"

User decision 2026-09-24. v2.9.0 answers three playtest findings: "너무 복잡하다", "뭘 어떻게 하는 건지
모르겠다", and "손님에게 직접 파는 게임인데 그것이 보이지 않는다". The goal is easy to learn, hard to
master: the fun axes stay (Hazard Counter, three price modes, Traits, the four Core Stats always
visible); the screens explain themselves; complexity that is not fun is removed; the transaction is
seen. Documents are amended first, Source follows per owner (docs-first).

Scope (owner amendments are the truth; this list is routing):

    A. the transaction is visible — counter tray, hand-over motion into the Bag, customer reaction,
       customer exit/entry, price-mode sound family, refusal beat        -> PRESENTATION_PRINCIPLES / UI_UX / SALE
    B. the screen says what to do — DAY 1~3 task line, first-order coach order, Hazard rows that
       say what resists them, per-Gate visitor counts (counts only; the ORDER today-fit emphasis was retired by F6, User 2026-09-24),
       NIGHT -> next-decision line, shorter D1 briefing / guide              -> UI_UX / ECONOMY_ORDER / NIGHT_CLOSING / COPY
    C. SALE reads at a glance — today's pressure tag on the Stat grid, fixed per-category effect order on
       rows (the matching-effect emphasis was retired by F6), one delta list after a sale, the per-customer receipt stub, price-role words, no always-on Death %, folded last
       expedition below Stats; first-sale coach diet (done)                  -> SALE / UI_UX / COPY
    D. simpler rules — Supply becomes Fatigue recovery only (no required Supply, Fatigue 0~40 with
       five bands), single-Stat Hazard pressure 3/3/3 without 투력 (no Gate shares a Stat), Store Support card copy in two
       clauses, presentation leftovers                                       -> DUNGEON_HAZARD / ITEM / NIGHT_CLOSING / NPC_TRAIT / RELIC

Not in v2.9.0 (User): a "simple view" toggle, hiding zero receipt rows, direct hints such as
`도움 됨 / 무관`, extra price depth, removing Hazard Counter / price modes / Traits.
Every P2+ expansion stays in GUILD24_v3.0_PLUS_DEFERRED_DETAILED.md.

Scope review 2026-09-24 (User: pull forward whatever the current playtest needs, defer whatever it
does not): the v3.0+ router was read against the three findings — nothing is promoted. Drag (§6)
does not choose a price, so the hand-over is shown by motion on the existing tap flow; desktop
redesign (§8), item memory (§3) and art waves (§18) do not answer any finding; customer reaction is
done by motion, not new art. Deferred out of v2.9.0 to v3.0+: moving the folded last-expedition line
below the Stat grid, clause-per-line card (the ORDER next-day forecast itself was retired on 2026-09-24)
wrapping (superseded by the two-clause card copy).

## VERSION POLICY

User decision 2026-09-24: versions are managed the way a maintained project does it, not by renaming
files.
- Owner filenames are stable lineage names (`<OWNER>_v2.8.0.md` stays the file for v2.9.0 and later).
  Ledgers, tests and routing keep their paths.
- `DESIGN_SSOT=` in every owner header names the project version the file belongs to.
- `DOC_VERSION=` in an owner header is bumped to the project version in which that owner last changed.
- `design_ssot/CHANGELOG.md` records what each version changed, per owner, with the User decision date.
- A release is closed by a git tag (`v2.9.0`) on the commit where SPEC_INDEX, CHANGELOG, owners and
  Source agree; the tag, not a filename, is the version.
- history/ keeps pre-consolidation files as audit evidence only; a version bump copies nothing there.

## v2.8 PURPOSE (CLOSED 2026-09-24)

v2.8 is the project-wide current Design SSOT for the focused Core Readability / Playtest Response
release.

It improves the current loop:

    observe
    -> infer
    -> choose
    -> see the actual change
    -> see the resolved result
    -> remember it for the next decision

Priority:
- current correctness and runtime UX
- Copy / Information Trust
- SALE -> NIGHT causal readability
- Fatigue salience
- Store Support salience and truth
- Item role clarity
- Boss information cadence
- mobile density
- audiovisual consequence / Run-identity polish using existing state
- full-surface functional-design polish
- evidence-gated balance follow-up

Structural P2+ expansion remains routed to GUILD24_v3.0_PLUS_DEFERRED_DETAILED.md.

## CURRENT CANONICAL FILE SET

Core / Run / Meta:
- 00_GAME_CORE_v2.8.0.md
- CORE_RUN_v2.8.0.md
- META_v2.8.0.md

Economy / NPC / Dungeon / Item / Store Build:
- ECONOMY_ORDER_v2.8.0.md
- NPC_TRAIT_v2.8.0.md
- DUNGEON_HAZARD_v2.8.0.md
- ITEM_v2.8.0.md
- RELIC_v2.8.0.md

Flow / Result / UI / Copy:
- SALE_v2.8.0.md
- NIGHT_CLOSING_v2.8.0.md
- UI_UX_v2.8.0.md
- PRESENTATION_PRINCIPLES_v2.8.0.md
- COPY_WORLD_VOICE_v2.8.0.md
- COPY_AUDIT_APPROVED_v2.8.0.md
- EVENT_v2.8.0.md
- BOSS_v2.8.0.md
- FINAL_EXPEDITION_v2.8.0.md

QA:
- CORE_RUN_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- DUNGEON_ITEM_QA_v2.8.0.md
- RELIC_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md
- SOURCE_ADOPTION_QA_v2.8.0.md

Audit:
- SSOT_AUDIT_v2.8.0.md

## ROUTING

GAME CORE / CROSS-RUN IDENTITY -> 00_GAME_CORE_v2.8.0.md
RUN / PHASE / SAVE / PRE-RUN / META SETTLEMENT / BOSS BRIEFING ORDER -> CORE_RUN_v2.8.0.md
META / JOB MASTERY / STORE CAPITAL / DECORATION -> META_v2.8.0.md
PRICE / GOLD / WALLET / ORDER / REROLL / RARITY -> ECONOMY_ORDER_v2.8.0.md
NPC / JOB / TRAIT / LOYALTY / TRUSTED REGULAR / REVISIT -> NPC_TRAIT_v2.8.0.md
DUNGEON / HAZARD / PREPARED POWER / SUPPLY / FATIGUE / RESULT PROOF -> DUNGEON_HAZARD_v2.8.0.md
ITEM / CATALOG / FOOD / DRINK / POTION / INSURANCE -> ITEM_v2.8.0.md
STORE SUPPORT / RUN BUILD / SLOTH WINDOW -> RELIC_v2.8.0.md
SALE -> SALE_v2.8.0.md
NIGHT / CLOSING / RESULT CAUSALITY -> NIGHT_CLOSING_v2.8.0.md
UI / UX / MOBILE / TUTORIAL / POPOVER / SEMANTIC DELTA / DECORATION -> UI_UX_v2.8.0.md
PRESENTATION PRINCIPLES / VISUAL CONSTRUCTION / ASSET QUALITY / ORNAMENT BUDGET / AUDIO PRESENTATION / VISUAL REVIEW -> PRESENTATION_PRINCIPLES_v2.8.0.md
COPY / PLAYER-FACING TERMS / COPY-SYSTEM RULES -> COPY_WORLD_VOICE_v2.8.0.md
EXACT PLAYER-FACING COPY -> COPY_AUDIT_APPROVED_v2.8.0.md
EVENT -> EVENT_v2.8.0.md
BOSS -> BOSS_v2.8.0.md
FINAL FORMULA / PARTY / FINAL TRANSFER / D25 FINAL STATE -> FINAL_EXPEDITION_v2.8.0.md

## HISTORICAL / SUPERSEDED FILE POLICY

Every owner in CURRENT CANONICAL FILE SET is self-contained: the 2026-09-23 consolidation merged each
owner's former inheritance chain into the owner itself, keeping current rules only (ledgers:
reports/ssot-consolidation/). No current owner inherits from an older file.

design_ssot/history/ holds legacy only: older versions and each owner's pre-consolidation v2.8 patch
(`*_v2.8.0-patch.md`). Do not search or open history/ for current rules; it is audit evidence.

Unreferenced historical navigation/decision snapshots may be removed.
Historical/base files must not be opened as a second current truth.

GUILD24_v2.8_RELEASE_VISION.md is non-Canonical orientation only and carries no detailed mechanics,
numbers, exact UX contract or QA requirement.

Do not delete history files merely because they are old; the consolidation ledgers cite them.

## RETIRED ACTIVE SYSTEMS

The following remain historical only:
- Franchise Grade
- Franchise Achievement track
- Grade ORDER discount
- Start Contract selection / gating

Their inactive archive policy is owned by META_v2.8.0.md.

## DOCUMENT BASELINE POLICY

An approved baseline in a current owner is mandatory Design Truth for Source adoption, not a
recommendation or a value WORK/QA may tune.

Later adjustment requires:

    measurement
    -> BALANCE FINDING
    -> User/Director approval
    -> owner-spec amendment
    -> separate Source change

## MEASUREMENT-GATED, NOT DESIGN-UNRESOLVED

The following remain measurement-gated rather than implementation blockers:
- global economy pressure
- Great Success occurrence / probability
- Great Success economic snowball
- Store Support aggregate value
- Food / Water / Fresh-build value efficiency
- Gate / Family / Hazard frequency and perceived difficulty

Current exact baselines live only in their routed owners.

A single-run perception is not enough to change an approved baseline.

## SOURCE ACCESS

    SPEC_INDEX_v2.8.0
    -> exact routed owner
    -> related current QA
    -> Current Source

SOURCE_ADOPTION_QA_v2.8.0.md is an audit-HEAD defect record. Its `Current Source` descriptions refer
to that file's recorded `AUDIT_SOURCE_HEAD`; resolved findings are not rewritten as a live tracker.

Current resolution status comes from WORK_STATE + current Source + reviewed commits.

If a routed source cannot be accessed after explicit lookup, report PROJECT SOURCE ACCESS/INDEX ISSUE.

## v2.9.0 RELEASE ACCEPTANCE — HIGH LEVEL

v2.9.0 is ready to close when:
- a new player can say what to do on DAY 1 from the screens alone (task line, coach order, Hazard rows)
- selling an Item to a customer is visible as an act (hand-over into the Bag, reaction)
- the first SALE teaches four marks; the rest are contextual
- Supply is one sentence (`음식·음료는 피로를 줄인다`) and Fatigue bands 0~40 are adopted and measured
- every Hazard presses one non-투력 Stat and every non-투력 Stat is pressed by three Hazards
- ORDER shows per-Gate visitor counts without a new badge, hint or fit emphasis (F6 retired the emphasis; the judgement is the player's)
- Store Build effects are understood from the cards; SALE -> NIGHT causality is legible (the former
  v2.9+ entry gate)
- no unapproved 3.0+ structural expansion is pulled into v2.9.0

Close-out state 2026-09-25: every item above is adopted in Source (F2 … F7, I-4; CHANGELOG lists the commits).
The release stays OPEN on one gate: the BALANCE FINDING recorded in `reports/v29-balance-finding-handoff.md`
(F3 / F4 rule values collapsed run survival in measurement; decisions listed there, taken in a separate balance
session). 7-b (remaining-Supply outcome buffer) is undecided until that session. The tag `v2.9.0` waits on both.

## v2.9.1 / v2.9.2 — NEXT VERSIONS (User 2026-09-25, PLANNED)

Version routing (User 2026-09-25): the balance session is **v2.9.1**; the game feel presentation
batches are **v2.9.2**. Both run in separate sessions on branches from `main`; each is docs-first and
touches Source only after the User authorizes that batch.

- v2.9.1 BALANCE: `reports/v29-balance-finding-handoff.md` (decisions 1–8, 7-b), rule owners per
  WORK_STATE §Next — BALANCE SESSION.
- v2.9.2 GAME FEEL (타격감): design and status -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT
  (principles table, contract, H1~H5 rows). Routing per batch, in execution order:

      H1 NIGHT 판정 도장 (verdict stamp, per-Outcome weight, Insurance reversal overstamp)
                                     -> PRESENTATION §GAME FEEL BEAT / UI_UX §NIGHT LAYOUT / NIGHT_CLOSING (display order) / UI_UX_QA
      H2 SALE 계산대 (key press, first coin tick, consecutive-sale rhythm, stub after the stamp)
                                     -> PRESENTATION §TRANSACTION BEAT A1 / A5 / A8 / UI_UX §SALE — COUNTER TRAY / UI_UX_QA
      H3 ORDER 확정 (crates landing per SKU, balance count-down)
                                     -> PRESENTATION §GAME FEEL BEAT / UI_UX §ORDER — WAREHOUSE DISCLOSURE / ECONOMY_ORDER_QA or UI_UX_QA
      H5 FINAL 최종 토벌 (three stamps on a win, tape on a loss)
                                     -> PRESENTATION §GAME FEEL BEAT / FINAL_EXPEDITION §BOSS CLEAR · §RUN CLEAR (display order) / UI_UX_QA
      H4 CLOSING 마감 (rows print one by one, profit stamp; Store Capital part after v2.9.1)
                                     -> PRESENTATION §GAME FEEL BEAT / UI_UX §CLOSING / UI_UX_QA
      H6 장면 전환 (entry beat for CLOSING / FINAL / END / DAY 0, which are hard cuts today)
                                     -> PRESENTATION §GAME FEEL BEAT / UI_UX (the four screens) / UI_UX_QA

  Contract: presentation-only, ≤ 320 ms per beat (사망 tape ≤ 500 ms), no input block, reduced-motion
  no-op, motion inside the card, no full-screen shake, no combo / streak UI, no praise word, no rule /
  Save / RNG / proof change. Intensity by event weight (일반 / 중요 / 클라이맥스) and the two sequence
  reviews (last verdict → CLOSING → next day; FINAL result → clear screen) -> PRESENTATION §GAME FEEL BEAT.
  Not in v2.9.2: the `어제보다 +N` line (v3.0+ router), new copy, haptics (no iOS Safari support).

## v2.8 RELEASE ACCEPTANCE — HIGH LEVEL (CLOSED)

v2.8 is ready to close when:
- known current correctness/runtime UX findings are fixed
- active Player information is current, truthful and non-contradictory
- choice -> actual change -> resolved result is readable
- sold-Item impact is surfaced only where causality is proven
- Fatigue, Loyalty and Store Build effects appear at meaningful decision/result moments
- mobile core-flow density does not duplicate or crowd essential information
- Boss objective/information remains present through the owned cadence
- approved current owner baselines are adopted
- measurement-gated findings are either evidence-supported or explicitly carried forward
- no unapproved v2.9+ structural expansion is pulled into v2.8

Exact mechanics, numbers, copy, UX and pass/fail criteria live in the routed owner Specs / QA.
