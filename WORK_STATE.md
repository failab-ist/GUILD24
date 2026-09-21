# WORK_STATE

DATE: 2026-09-21
CURRENT_LINE: v2.8 Source adoption in progress, first ordered cycles merged to main
STATE: V2_8_SOURCE_ADOPTION_IN_PROGRESS

## Truth

- Design entry point: `design_ssot/SPEC_INDEX_v2.8.0.md`
- Known current Source mismatch/root-cause map: `design_ssot/SOURCE_ADOPTION_QA_v2.8.0.md`
- Implementation truth: `dist/`
- Product direction: `GAME_VISION.md`
- v2.8 release orientation only: `GUILD24_v2.8_RELEASE_VISION.md`
- Contributor workflow: `AGENTS.md`

Do not duplicate detailed Rule / Numeric / UX / QA truth here.
Resolve exact behavior through the current owners routed by `SPEC_INDEX_v2.8.0.md`.

## Current State

v2.8 Design has completed project-wide Canonical promotion, final SSOT coverage audit and Copy re-audit.

The v2.8 Director Plan is now orientation-only. It is not a detailed work/spec source.

The Source has begun v2.8 project-wide adoption. Several ordered task cycles (see `## Completed`)
are merged to `main`, each with targeted verify, `npm test` PASS and a real-browser runtime smoke
where the change touched the main run loop or a player-facing surface.

`SOURCE_ADOPTION_QA_v2.8.0.md` is a known-defect RECORD, not a live tracker - it is not edited to
mark an item resolved as WORK closes it. The list below is the only current record of which items
have an adoption commit; every SA-Q id in that file not listed below has NOT been verified against
current Source in this line of work and must not be assumed either fixed or still open.

Implementation-blocking Design unresolved = NONE.

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

Merge to main (`main` fast-forwarded from `8faa994`'s ancestor through the adoption branch):
- Antigravity commit `01d654c` reverted on a local branch, reverted tree verified equal to
  baseline `bdeb06c`, adoption branch merged, no rejected behavior survives
- Pages unblocked (regenerated the three source-derived reports only)
- final integrated browser smoke (mobile 390x800 + desktop 1280x880), 0 console errors

Opening screen:
- opening copy replaced with the three approved axes
- opening branch branding: title card `던전 앞 편의점` + branch name, memoized pre-Run seed,
  `길드리테일 가맹점` eyebrow removed, branch name pool expanded to 30

SALE quick patch + Core Stat source UX (`4b5f184`):
- 정가 price-burden term made a bonus-only term:
  `burdenIntentBonus = intentWeight * max(0, intentPivot - burden)` (ECONOMY_ORDER_v2.8.0 +
  ECONOMY_ORDER_QA_v2.8.0 updated to match)
- Core Stat rows: removed the separate 유리/불리 chip and the separate `?`; a changed Stat with a
  provable source is now the trigger itself, opening the existing shared anchored tip

Follow-up UX patch (`bd4371e`):
- the shared anchored tip (Stat cell included) now opens on desktop hover and on keyboard focus,
  not only on tap/click (UI-Q-v28-6)
- corrected a stale Source comment on the 정가 burden term (comment only, no logic change)

## Next

No further task is currently approved/queued.

`SOURCE_ADOPTION_QA_v2.8.0.md` still records SA-Q ids with no adoption commit above them
(among others: SA-Q02-09, SA-Q15/15B-17, SA-Q20-34 except those listed done, SA-Q37-38). Their
current Source status is UNVERIFIED in this line of work - do not treat them as either fixed or
still open without re-reading the routed owner and the current Source.

When further v2.8 adoption is approved, continue the same cycle:
- read the routed owner + relevant QA + named Source path
- make the smallest patch
- targeted verify
- commit
- append the completed item to `## Completed` above
- continue to the next task

After a future implementation freeze:
- run current Canonical adoption audit
- run functional QA
- run real mobile + desktop runtime UX smoke
- report remaining Balance Findings separately

Do not pull v2.9+ deferred features into v2.8 adoption.
