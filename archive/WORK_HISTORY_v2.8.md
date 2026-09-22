# WORK HISTORY — v2.8

DATE_ARCHIVED: 2026-09-22
SOURCE: `WORK_STATE.md`
ROLE: historical implementation/adoption record only
CANONICAL_DESIGN_TRUTH: NONE

This file preserves completed v2.8 implementation/adoption history moved out of `WORK_STATE.md`.
For current work, use `WORK_STATE.md`. For Design Truth, use `design_ssot/SPEC_INDEX_v2.8.0.md`.

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

Wallet re-measure amendment CLOSED (branch `claude/active-task-implementation-gpe6zh`
through `17b049c`, DIRECTOR review PASS; final integration merge deferred until v2.8 close):
- ordinary NPC visit income narrowed `randomInt(0,100)` -> `randomInt(0,80)`; fresh base 180,
  Level×8, returning persistent Wallet carry, 2000 cap, failed-expedition Loot, SA-Q48 purchase
  acceptance and SA-Q50 Deep sponsorship all left untouched
- ECO-Q-v28-3B Wallet endpoint QA updated 0/100 -> 0/80 and re-proved (fresh/returning formula,
  both RNG endpoints, cap, unchanged RNG draw count, failed-expedition Loot independence)
- targeted regression suite passed; no further balance retune performed
