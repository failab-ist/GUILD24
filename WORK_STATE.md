# WORK_STATE

DATE: 2026-09-22
CURRENT_LINE: v2.8 Source adoption in progress; playtest-response batch and dialogue exposure / repeat adoption closed, re-measure / regression pass active
STATE: V2_8_SOURCE_ADOPTION_IN_PROGRESS

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.8.0.md`
- Known current Source mismatch/root-cause map: `design_ssot/SOURCE_ADOPTION_QA_v2.8.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- v2.8 release orientation only: `GUILD24_v2.8_RELEASE_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate settled detailed Rule / Numeric / UX / QA truth here.
Resolve settled behavior through the current owners routed by `SPEC_INDEX_v2.8.0.md`.

A newly approved User decision may be held briefly in `## Approved Queue` only until WORK promotes it
into the owning Canonical + QA during that task. After promotion, collapse it here to an owner/task
reference rather than maintaining a second spec.

## Current State

v2.8 Design has completed project-wide Canonical promotion, final SSOT coverage audit and Copy re-audit.

The v2.8 Director Plan is now orientation-only. It is not a detailed work/spec source.

The Source has completed the first major v2.8 adoption cycles plus several playtest-found UX fixes.
The remaining adoption work is now concentrated in:
- completed playtest-response adoption awaiting final integration merge
- completed dialogue-pool / recent-repeat adoption awaiting final integration merge
- targeted re-measure / regression after the behavior changes
- approved v2.8 Functional + Presentation Polish adoption
- final integrated adoption + functional + runtime QA before v2.8 freeze

`SOURCE_ADOPTION_QA_v2.8.0.md` is a known-defect RECORD, not a live tracker. It is not edited to
mark an item resolved as WORK closes it. `## Completed` below is the current commit-level adoption
record; unlisted SA-Q ids must be checked against routed Canonical + current Source before judgement.

Implementation-blocking Design unresolved = NONE for the currently approved queue.

Balance items explicitly marked measurement-gated are not permission for WORK or QA to tune them.

## Completed (this adoption line, chronological)

Group A — numeric baselines (merge `bdeb06c`):
- SA-Q39 Item numeric rebaseline, SA-Q40 Fresh native-Stat rebaseline,
  SA-Q41 Great Success Store Gold baseline, SA-Q42 Deep Expedition reward baseline

Task A — Store Support v2.8 (RELIC owner; recovered from `bdeb06c`, NOT from the rejected
Antigravity commit `01d654c`, which was reverted and is preserved only as review evidence):
- §11 exact Store Support copy + prices
- core Store Support mechanics closing audit
- D30 eligibility: default-include minus explicit exclusions
- expeditionCert: guaranteed two distinct Counter slots, without consuming the Black Market row

Task B — SA-Q11, SA-Q18, SA-Q19, SA-Q43, SA-Q44, SA-Q45:
- Great Success signal recomputes only after a committed sale (SA-Q11)
- temporary Event purchase budget shown beside the persistent Wallet (SA-Q18)
- Black Market offer row keeps its 암시장 provenance (SA-Q19)
- non-Canonical random 길드 지원 opportunity retired (SA-Q43)
- hidden NPC pity rarity/potential modifier retired (SA-Q44)
- royal newcomer seated in an existing visitor slot, seats counted on the pre-arrival roster so a
  seated newcomer adds no visitor headcount (SA-Q45, incl. the roster-starved regression fix)

Task C — SA-Q01, SA-Q10, SA-Q12, SA-Q13, SA-Q14, SA-Q35, SA-Q36 (+ a reported DESIGN ISSUE: D10/D20
Boss information beats missing, resolved below under Task D):
- pre-Run Store Management returns to new-Run preparation (SA-Q01)
- Boss art capped on phone, SALE queue stated once (SA-Q10, SA-Q12)
- Loyalty meaning/threshold + one 단골 owner at 51, compact SALE state (SA-Q13)
- a moved Core Stat reads as beneficial/harmful, not generic yellow (SA-Q14)
- repro Seed and dev footer removed from the Player surface (SA-Q35)
- Decoration Flavor prose kept off the purchase-decision surface (SA-Q36)

Task D — Boss cadence + copy adoption (8 commits):
- D0 / D10 / D20 Boss information beats adopted
- approved §8-4 Loyalty popover wording
- approved pre-Run / reset / store-management microcopy, coach marks, two SALE lines
- NPC surfaces state only what is true; arrival lines no longer imply mechanics the game lacks
- global guide replaced by the approved compact Help
- Store Capital vs Gold distinguished; Deep surfaces stop teaching
- approved Flavor + Function adopted for all 22 Events
- font subsets regenerated for the new copy glyphs

Merge to main (adoption branch through `8faa994`):
- Antigravity commit `01d654c` reverted before merge; no rejected behavior survives
- source-derived reports regenerated only to unblock Pages
- integrated browser smoke passed on mobile + desktop with 0 console errors

Opening screen:
- opening copy replaced with the three approved axes
- opening branch branding: title card `던전 앞 편의점` + branch name, memoized pre-Run seed,
  `길드리테일 가맹점` eyebrow removed, branch name pool expanded to 30

SALE quick patch + Core Stat source UX (`4b5f184`):
- 정가 price-burden term made bonus-only:
  `burdenIntentBonus = intentWeight * max(0, intentPivot - burden)`
- owning ECONOMY_ORDER Canonical + QA updated
- Core Stat rows: visible 유리/불리 and separate `?` removed
- changed Stat cell itself opens its existing proven source list

Follow-up UX patch (`bd4371e`):
- shared anchored tip now opens on desktop hover and keyboard focus as required by UI-Q-v28-6
- stale Source comment on the 정가 burden term corrected; no logic change

WORK_STATE refresh (`7ba2688`):
- completed v2.8 adoption cycles and the current main-line state recorded here

Task D — remaining Result UX adoption CLOSED (main through `ce8fad1`):
- SA-Q05 / 06 / 07 / 08 / 09 / 21 / 25 / 30 / 33 / 34 adopted
- Result-Proof corrected to departure-state, semantic-evidence, canonical conditional-Death ordering
- persistent Aftercare + whole-Bag state proof and helped-return proof gate completed
- targeted deterministic/RNG QA + browser run-loop smoke passed

Playtest response batch CLOSED (branch `claude/active-task-implementation-gpe6zh` through `330eec6`,
DIRECTOR review pending merge):
- SA-Q46 SALE compact top: Loyalty `?` popover and Equipment removed from compact top; Bag's two
  slots always horizontal, whole block wraps as a unit
- SA-Q47 D0 Boss-information beat separated from the first Store Support choice; approved
  first-support exact copy adopted
- runtime UX fix (found in review, not a numbered SA-Q): desktop SALE dead-space gap between the
  stat dossier and Trait rows closed; UI-Q109 mobile reading order preserved via CSS flex `order`
- SA-Q48 accessible-mode (50%/정가) purchase need raised to a flat 0.80, Bag penalty retired,
  Counter floor 0.97 added; 바가지 untouched
- SA-Q49 ordinary NPC Wallet on visit raised (fresh base 180, visit income 0..100), then re-measure
  isolated excess purchasing-capacity / Store-Gold expansion; User-approved follow-up narrows visit
  income to 0..80 while keeping fresh base 180 / Level×8 / persistent Wallet / 2000 cap
- SA-Q50 Deep sponsorship base lowered to 200G, no compensating reward/difficulty change
- SA-Q51 `bar`/`herobar` icons replaced (retired Hotbar silhouette -> lunchbox / bottled-water)
- targeted deterministic QA + real-click browser run-loop smoke passed at mobile + desktop widths

Dialogue exposure / repeat adoption CLOSED (branch `claude/active-task-implementation-gpe6zh`
through `ca120f2`, DIRECTOR review PASS; final integration merge deferred until v2.8 close):
- COPY_WORLD_VOICE_v2.8 recent-repeat rule adopted: ARRIVAL/SALE/NIGHT track the last 3 visible
  lines per Surface (cross-NPC) plus each NPC's own immediately previous line, both excluded
  from that Surface's next pick; `Copy.arrive/buy/refuse/night` and `Dungeon.resolve` take `run`
  as a new optional trailing argument, omitting it (every pre-existing direct call) keeps the
  exact old pure hash pick - still no Gameplay RNG read or written
- every ARRIVAL/SALE/NIGHT Pool grown to its named v2.8 minimum size (e.g. visit.back 4->16,
  sale.full/half/overcharge 4->20, night.retreat 4->12; trait-arrival pools to 6 each)
- 대성공 gets its own `night.great` Pool (10 lines) and dispatch branch, first ever - Source used
  to send every non-injury success through `grew`/`plain` with no line naming a Great Success;
  the dead, never-selected `night.supplied`/`night.shaken` Pools are retired into `night.plain`
- targeted deterministic QA (incl. a forced-대성공 resolve check) + real-click browser run-loop
  smoke passed with 0 console errors

## Active Task — Wallet re-measure amendment implementation

USER APPROVED / CANONICAL PROMOTED.

Implement only the re-measure decision now owned by ECONOMY_ORDER_v2.8.0.md:

    ordinary NPC visit income randomInt(0,100) -> randomInt(0,80)

Keep unchanged:
- Fresh base 180
- Level ×8
- returning persistent Wallet carry
- 2000 cap
- failed-expedition Loot
- SA-Q48 purchase acceptance
- SA-Q50 Deep sponsorship

Update the exact Wallet QA endpoints from 0/100 to 0/80.
Run the narrow deterministic Wallet QA + relevant regression suite.

Do not perform another balance retune unless implementation exposes an actual mismatch.
After DIRECTOR review, advance to Functional + Presentation Polish adoption.

## Approved Queue

### 1. Functional + Presentation Polish adoption

USER APPROVED / CANONICAL PROMOTED.

After re-measure closes without a blocking Design change:
- adopt the current v2.8 Functional + Presentation Polish owned by UI_UX_v2.8.0.md
- first audit the complete active Player flow for information priority, action hierarchy,
  tutorial target/copy alignment, responsive order, dead space, duplication and avoidable overflow
- include controlled D0/D5/D10/D15/D20/D25/D30 Boss/milestone presentation review
- fix functional presentation defects with REMOVE / REUSE / MERGE before adding UI
- use only existing gameplay state / current audio-animation-scene architecture
- cover truthful Store-growth traces, NIGHT result differentiation, Boss/D25-D30 payoff,
  ORDER/SALE/Store-Support decision audio and targeted current-art polish
- add no gameplay rule, balance change, required Save state, Gameplay RNG or hidden-information leak
- if a fix requires changing an exact Canonical layout measurement/copy contract, report evidence
  and patch the owning Canonical before Source; WORK must not silently redefine it
- use UI_UX_QA_v2.8.0.md UI-Q-v28-21 through UI-Q-v28-29 for acceptance

Do not pull the remaining large cinematic / large art-world content from the v2.9+ router.

### 2. Final v2.8 integration / freeze audit

After all approved adoption, re-measure and Functional + Presentation Polish work:
- current Canonical -> Source adoption audit
- functional QA
- targeted regression QA for all touched systems
- real mobile + desktop runtime UX smoke
- verify save/load + deterministic/RNG invariants on touched paths
- report remaining Balance Findings separately
- keep remaining unapproved v2.9+ structural/content expansion out of v2.8

Then v2.8 can be frozen/closed if no blocking mismatch remains.
