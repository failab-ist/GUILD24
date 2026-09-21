# WORK_STATE

DATE: 2026-09-22
CURRENT_LINE: v2.8 Source adoption in progress; Task D Result UX closed, approved playtest-response adoption active
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
- approved playtest-response adoption
- remaining dialogue-pool / recent-repeat adoption
- targeted re-measure / regression after the behavior changes
- approved v2.8 Presentation Polish adoption
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

## Active Task — Playtest response batch

USER APPROVED / CANONICAL PROMOTED.

Implement the current routed owner truth for SA-Q46–51 only.
Use `SPEC_INDEX_v2.8.0.md` and the owning Canonical + QA; do not duplicate detailed rules here.

Scope references:
- SALE compact top / horizontal two-slot Bag -> SALE_v2.8.0 + UI_UX_v2.8.0
- D0 first-support -> separate Boss beat -> CORE_RUN_v2.8.0 + BOSS_v2.8.0 + RELIC_v2.8.0
- first-support exact text -> COPY_WORLD_VOICE_v2.8.0 + COPY_AUDIT_APPROVED_v2.8.0
- purchase acceptance / NPC Wallet / Deep sponsorship -> ECONOMY_ORDER_v2.8.0
- 간단 도시락 / 왕도 천연암반수 icon identity -> ITEM_v2.8.0
- mismatch/acceptance map -> SOURCE_ADOPTION_QA_v2.8.0 + routed QA

After completion, record its commit(s) in `## Completed`, remove this section, and advance to dialogue exposure / repeat adoption.

## Approved Queue

### 1. Dialogue exposure / repeat adoption

After the playtest-response patch:
- complete the remaining approved dialogue-pool expansion
- adopt the current COPY_WORLD_VOICE recent-repeat rule / cooldown
- do not invent new personality mechanics or purchase preferences
- keep selection deterministic and gameplay-RNG neutral

### 2. Re-measure / regression pass

Because the approved playtest batch changes purchase acceptance, NPC Wallet and Deep access:
- run targeted economy / sale / survival-loop regression measurements
- report observed distribution changes separately
- do not auto-retune measurement-gated values

### 3. Presentation Polish adoption

USER APPROVED / CANONICAL PROMOTED.

After re-measure closes without a blocking Design change:
- adopt the current v2.8 Presentation Polish owned by UI_UX_v2.8.0.md
- use only existing gameplay state / current audio-animation-scene architecture
- cover truthful Store-growth traces, NIGHT result differentiation, Boss/D25-D30 payoff,
  ORDER/SALE/Store-Support decision audio and targeted current-art polish
- add no gameplay rule, balance change, required Save state, Gameplay RNG or hidden-information leak
- use UI_UX_QA_v2.8.0.md for acceptance

Do not pull the remaining large cinematic / large art-world content from the v2.9+ router.

### 4. Final v2.8 integration / freeze audit

After all approved adoption, re-measure and Presentation Polish work:
- current Canonical -> Source adoption audit
- functional QA
- targeted regression QA for all touched systems
- real mobile + desktop runtime UX smoke
- verify save/load + deterministic/RNG invariants on touched paths
- report remaining Balance Findings separately
- keep remaining unapproved v2.9+ structural/content expansion out of v2.8

Then v2.8 can be frozen/closed if no blocking mismatch remains.
