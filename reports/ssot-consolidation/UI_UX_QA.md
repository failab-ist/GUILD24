# UI_UX_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/UI_UX_QA_v2.8.0.md
CHAIN=design_ssot/UI_UX_QA_v2.8.0.md,design_ssot/history/UI_UX_QA_v2.7.0.md,design_ssot/history/UI_UX_QA_v2.6.1.md,design_ssot/history/UI_UX_QA_v2.5.0.md

Current-spec consolidation of a QA owner. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/UI_UX_QA_v2.8.0-patch.md`; the v2.7.0 / v2.6.1 / v2.5.0 versions stay in `history/`.
Checks were judged against the consolidated `design_ssot/UI_UX_v2.8.0.md` (plus PRESENTATION_POLISH*
for presentation checks, NIGHT_CLOSING for Night, BOSS / FINAL_EXPEDITION / META / CORE_RUN / EVENT /
DUNGEON_HAZARD for the values they assert).

Placement: one `##` topic group per surface (SCOPE, PHASE IDENTITY / VISUAL LANGUAGE, FUNCTIONAL
LAYOUT / MOBILE / ACCESSIBILITY, MORNING, ORDER, SALE — LAYOUT / CUSTOMER, SALE — ITEM / TRANSACTION,
SALE — FORECAST / PREPARATION INFORMATION, DEEP EXPEDITION, NIGHT, CLOSING, RELIC / STORE SUPPORT,
BOSS / FINAL, STORE MANAGEMENT / META, MENU / SETTINGS / DEBUG, TUTORIAL / HELP, AUDIO); every check is
a `###` heading with its original ID (no renumbering); a check's own subsections are `####`. The
unnumbered 2026-09-12 amendment checks (GREAT SUCCESS SIGNAL / NOMINATION UX / GREAT SUCCESS TUTORIAL /
FIRST DEEP TUTORIAL) keep their `###` headings inside the matching topic group.

## LEGACY — inheritance pointers / override scaffolding / patch framing (the chain is now inline)

The v2.7 override list is carried out in the target: the D30-first Family reveal and GLUTTONY Rare+ wording are
dropped under SUPERSEDED below; the GLUTTONY scope and identity sub-bullets are kept (reworded, see REWORD);
the `현재 지점 포기` label is checked by kept UI-Q71 / UI-Q96; the fixed-price no-refusal Final is checked by
kept UI-Q98 / UI-Q100 / UI-Q104; D30 reuse of the known state is checked by kept UI-Q93 / UI-Q-v28-24 / UI-Q-v28-28.

```text
Status values are not stored here. This patch overrides stale Night control and v2.6 SALE/ORDER expectations in the base.
## INHERITANCE
All unchanged v2.7 UI/UX QA remains active.
## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP TUTORIAL / NOMINATION QA
## INHERITED QA OVERRIDES
The following inherited `UI_UX_QA_v2.5.0.md` / `UI_UX_QA_v2.6.1.md` expectations are stale and are explicitly superseded:
- inherited `UI-Q40` / `UI-Q43` D30-first Final Family reveal
  - v2.7 exact Family/Hazard disclosure occurs on D25
  - D30 reuses the already-known persisted state and must not present it as newly generated/revealed
- inherited `UI-Q43` GLUTTONY preview wording based on Rare+ / old raw-Stat scope
- inherited `폭식` player-facing identity/copy is stale
- older v2.5 Copy candidates using `현재 런 포기` wording are superseded
  - v2.7 exact top-level label remains `현재 지점 포기`
- any inherited/current pre-amendment Final UI expectation that keeps 50/100/150 price choice or purchase/refusal RNG on D30
  - current Final preparation shows only the fixed 50% / 매입가 amount and no refusal flow
All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.
v2.7-added UI QA IDs begin at `UI-Q80` so they do not collide with inherited v2.6.1 `UI-Q61~Q74` IDs.
```

## LEGACY — restatement kept elsewhere in the target

The v2.7 SCOPE line `Status values are not stored here. FAIL is valid evidence.` is kept.

```text
Status values are NOT stored here.
```

## LEGACY — hotfix measurement history (UI-Q109 MEASURED BASELINE table)

Documental before/after measurements of the v2.7 phone hotfix. The live acceptance (about half or less /
at least about half, shelf header visible at entry) is kept in UI-Q109, and the Bag-slot-size qualifier
lines that sat under this heading are kept at the end of the UI-Q109 main list.

```text
### MEASURED BASELINE — DOCUMENTAL
Band = counter band + counter edge, as a share of viewport height minus the fixed dock.
| width x 780 | band before | band after | sale surface after | shelf header at entry |
|---|---|---|---|---|
| 360 | 59.9% | 39.2% | 427px | visible |
| 390 | 59.9% | 40.2% | 420px | visible |
| 412 | 59.9% | 40.2% | 420px | visible |
Before the hotfix the shelf header sat 341px below the fold at every phone width.
```

## SUPERSEDED — UI-Q17 `Next / Skip / Skip All`, replaced by exactly `다음` / `전체 건너뛰기`

v2.6.1 header: "This patch overrides stale Night control"; UI_UX_v2.8.0 §NIGHT — EXACT CONTROLS (exactly
`다음` / `전체 건너뛰기`, both easy to reach on mobile). Checked by kept UI-Q70 / UI-Q92 / UI-Q-v28-31.

```text
## UI-Q17 — NIGHT CONTROLS
SETUP:
Night on mobile/desktop.
EXPECT:
Next / Skip / Skip All accessible.
PASS:
Presentation can be advanced quickly.
```

## SUPERSEDED — D30-first Family Pair reveal (UI-Q40 clause), replaced by D25 disclosure / D30 reuse

v2.7 override: "inherited `UI-Q40` / `UI-Q43` D30-first Final Family reveal"; UI_UX_v2.8.0 §FINAL TIMELINE
PRESENTATION (D25 disclosure, D30 reuses D25 state). The rest of UI-Q40 stays; D25 is checked by UI-Q93.

```text
- D30 Family Pair is read before D30 Relic/Sloth choice
```

## SUPERSEDED — GLUTTONY `보급품 raw Stat` preview (UI-Q43 clause), replaced by the ×0.50 all-Item positive Core-Stat scope

v2.7 override; UI_UX_v2.8.0 §FINAL MODIFIER PREVIEW GLUTTONY. The current scope line is kept in its place (REWORD).

```text
- GLUTTONY affected 보급품 raw Stat original -> applied
```

## SUPERSEDED — pre-supply outlook supporting-copy paragraph (UI-Q107 clause)

UI_UX_v2.8.0 §SALE PERMANENT EXPLANATION: "Do not keep a permanent explanatory paragraph under the readout";
kept UI-Q-v28-15 "no permanent forecast explanation paragraph". Header and `실패 시 사망 위험` label checks stay.

```text
- supporting copy is exactly:
아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.
보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.
```

## SUPERSEDED — Great Success signal "updates with preparation", replaced by commit-only refresh

UI_UX_v2.8.0 §GREAT SUCCESS OPPORTUNITY SIGNAL: "No signal change while merely selecting/previewing an Item.
After a successful purchase commits, refresh only the Great Success signal"; checked by kept UI-Q-v28-7 / UI-Q86.

```text
- updates with preparation
```

## SUPERSEDED — Outcome-by-Outcome Night Fatigue values (UI-Q89 clause)

UI_UX_v2.8.0 §FATIGUE SURFACE: "Do not show future Outcome-by-Outcome Fatigue table"; kept UI-Q-v28-8
"no hypothetical Outcome fatigue matrix". The rest of UI-Q89 stays.

```text
- conditional success/great/retreat/injury Night values match owner arithmetic
```

## SUPERSEDED / RETIRED — Franchise Grade, Start Contract, Franchise Achievement checks (META_v2.8.0 retired systems)

UI_UX_v2.8.0 §RETIRED ACTIVE UI forbids exposing Franchise Grade, the Franchise Achievement list/progress/toast,
Start Contract selection and Grade-gated unlock progress; archive policy stays in META_v2.8.0.md. UI-Q42 keeps
its live matrix / Mastery / Distinct Boss / Global-Meta-XP checks; UI-Q108 is dropped whole.

```text
- Franchise Grade derives from Total Job Mastery
- Franchise Grade is presented as prestige/status plus Start Contract availability gate, not a hidden stat boost
- locked non-default Start Contracts communicate their required Franchise Grade
- unlocked Start Contracts are selectable options, not automatically active Grade bonuses
- legacy Day / Run-count / regular-customer / adventurer-level contract gates are absent as current progression truth
## UI-Q108 — FRANCHISE PROGRESS READOUT / COMPLETION CUE
Controlled account at a known Franchise Achievement state, codex 본사 header and 진행도 tab.
PASS:
- the Achievement list is in the existing 도감 location; no Achievement screen, Tree or
  Notification/History subsystem exists
- each of Achievements 1-5 shows its condition and `current / target`
- Achievements 6-10 show their condition and 달성 / 미달성, with no running count
- a completed cumulative Achievement reads at its target and never past it
- rows showing a running count do not carry the 주의 caution styling
- the current and target values come from the same list that judges the Achievement; no screen
  holds its own copy of a threshold
- 다음 해금 progress toward a Grade-gated Start Contract counts Franchise Achievements against
  the Grade requirement table, NOT Total Job Mastery
- at every Achievement count 0-10, every Grade-gated Start Contract reads the same on the board
  as it does at the actual lock judgment
- first completion of an Achievement shows exactly one existing Toast naming it
- when that completion also raised the Franchise Grade, the Grade step is readable in the same
  feedback
- an Achievement already held produces no further cue
FAIL:
- the board reports a Contract as locked or as steps away while the Contract is open
- a threshold appears in the UI as its own literal instead of being read from the judgment source
- the completion cue fires again for an Achievement already held, or fires per crediting site
```

## REWORD — headings: one level scheme (`##` topic group / `###` check / `####` check subsection); ID kept

UI-Q109 `MOBILE SALE HOTFIX` -> `MOBILE SALE PLAYABILITY` (hotfix narration removed, the UI_UX section name);
UI-Q92 `NIGHT v2.7 RESULT TRUTH` -> `NIGHT RESULT TRUTH` (version tag removed).

```text
## UI-Q01 — PHASE IDENTITY
## UI-Q02 — DASHBOARD SLOP CHECK
## UI-Q27 — COPY COMPACTNESS
## UI-Q28 — DESKTOP/MOBILE PRIORITY
## UI-Q95 — STRONG GREEN SEMANTIC
## UI-Q97 — TYPOGRAPHY EXACT
## UI-Q98 — TYPOGRAPHY RESPONSIVE QA
## UI-Q99 — ANTI-GENERIC MATERIAL PASS
## UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH
## UI-Q-v28-31 — DARK PIXEL + CONTROLLED POP / GAME-LIKE INTERACTION
## UI-Q-v28-25 — TARGETED GRAPHIC POLISH
## UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT
## UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY
## UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
## UI-Q22 — TOUCH TARGETS
## UI-Q23 — SAFE AREA
## UI-Q24 — COLOR-INDEPENDENT SIGNAL
## UI-Q03 — MORNING HIERARCHY
## UI-Q80 — MORNING REQUIRED SUPPLY
## UI-Q101 — MORNING NEXT-DAY GATE FORECAST
## UI-Q09 — TIER FORECAST VISIBILITY
## UI-Q04 — ORDER SCENE
## UI-Q05 — ORDER FUNDS
## UI-Q06 — ORDER OFFERS
## UI-Q07 — ORDER PRIMARY ACTION
## UI-Q08 — REROLL VISIBILITY
## UI-Q61 — ORDER ACTION SPLIT
## UI-Q62 — ORDER REROLL WITH SELECTION
## UI-Q63 — ORDER DECISION INFO
## UI-Q64 — ORDER SCROLL / FOCUS
## UI-Q81 — ORDER ITEM HIERARCHY
## UI-Q82 — ORDER WAREHOUSE COLLAPSE
## UI-Q10 — SALE STORE PRIORITY
## UI-Q11 — SALE NPC MOBILE STACK
## UI-Q65 — SALE DESKTOP HIERARCHY
## UI-Q66 — SALE MOBILE HIERARCHY
## UI-Q109 — MOBILE SALE HOTFIX
### CONFIRMED PLACEMENT — ENVIRONMENT READINESS
## UI-Q-v28-3 — MOBILE SALE QUEUE
## UI-Q-v28-4 — CURRENT CUSTOMER STATE
## UI-Q110 — TRANSIENT CUSTOMER SPEECH
## UI-Q67 — NPC WALLET VISIBILITY
## UI-Q-v28-11 — LOYALTY HELP
## UI-Q-v28-12 — EVENT TEMP BUDGET
## UI-Q29 — RETURNING NPC DELTA VISIBILITY
## UI-Q90 — RETURNING NPC LAST BAG
## UI-Q91 — QUEUE UNCERTAINTY
## UI-Q68 — SALE SCROLL / FOCUS
## UI-Q74 — NEXT PORTRAIT PRELOAD
## UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE
## UI-Q12 — INVENTORY REACHABILITY
## UI-Q13 — PRICE BUTTONS
## UI-Q25 — ITEM DECISION INFO
## UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
## UI-Q87 — TWO-SLOT HANDLING
## UI-Q88 — SEQUENTIAL TRANSACTION
## UI-Q100 — SALE REFUSAL PRICE CEILING
## UI-Q102 — SALE NON-DECISION DETAIL REMOVAL
## UI-Q-v28-15 — SALE COPY DENSITY
## UI-Q14 — FORECAST LANGUAGE
## UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK
## UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK
## UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH
### Case A — no active Supply Deficit change, no Fatigue penalty-band change
### Case B — its Supply reduces an active Supply Deficit
### Case C — excess Supply crosses a Fatigue penalty band
## UI-Q-v28-7 — GREAT SUCCESS SIGNAL
## UI-Q84 — FOUR CORE STATS REMAIN VISIBLE
## UI-Q69 — STAT SOURCE
## UI-Q-v28-5 — SEMANTIC DELTA
## UI-Q-v28-6 — SHARED POPOVER
## UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY
## UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER
## UI-Q26 — HAZARD NUDGE
## UI-Q35 — HAZARD EFFECT ACCESS
## UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC
## UI-Q-v28-8 — FATIGUE
## UI-Q32 — PLAYER STAT TERMINOLOGY
## UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
## UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
## UI-Q-v28-16 — DEEP REPEAT COPY
## UI-Q16 — NIGHT RESULT
## UI-Q31 — NIGHT IMPORTANCE WEIGHTING
## UI-Q70 — NIGHT CONTROLS
## UI-Q92 — NIGHT v2.7 RESULT TRUTH
## UI-Q-v28-9 — NIGHT REACTION
## UI-Q-v28-23 — NIGHT RESULT PRESENTATION
## UI-Q18 — CLOSING ECONOMICS
## UI-Q-v28-13 — CLOSING FOOTER
## UI-Q-v28-17 — CLOSING ECONOMICS ONLY
## UI-Q36 — RELIC VISIBILITY / QUICK VIEW
## UI-Q37 — RELIC MILESTONE REVEAL
## UI-Q93 — FINAL TIMELINE
## UI-Q40 — BOSS / RELIC REVEAL ORDER
## UI-Q41 — SLOTH WINDOW CHOICE CLARITY
## UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
## UI-Q-v28-10 — BOSS MOBILE DENSITY
## UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF
## UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION
## UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT
## UI-Q-v28-32 — FINAL PARTY / PREPARATION
## UI-Q-v28-1 — STORE MANAGEMENT
## UI-Q-v28-2 — PRE-RUN RETURN PATH
## UI-Q112 — PRE-RUN DECORATION EMPTY SLOT
## UI-Q-v28-20 — DECORATION DECISION SURFACE
## UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES
## UI-Q-v28-18 — STORE CAPITAL CURRENCY
## UI-Q-v28-14 — DECORATION ART / SETTLEMENT
## UI-Q42 — META PROGRESSION PRESENTATION
## UI-Q39 — MONSTER KNOWLEDGE PROGRESS COPY
## UI-Q71 — MENU EXACT
## UI-Q72 — SETTINGS EXACT
## UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR
## UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY
## UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH
## UI-Q19 — TUTORIAL OVERLAY
## UI-Q20 — TUTORIAL RESPONSIVE POSITION
## UI-Q21 — TUTORIAL PERSISTENCE
## UI-Q15 — FORECAST TUTORIAL
## UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT
## UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL
## UI-Q73 — FULL RESET TUTORIAL
## UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER
## UI-Q113 — TUTORIAL COACH COPY / TARGETING
## UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT
## UI-Q114 — AUDIO AUDIBILITY / COVERAGE
## UI-Q-v28-22 — DECISION / PHASE AUDIO
```

```new
### UI-Q01 — PHASE IDENTITY
### UI-Q02 — DASHBOARD SLOP CHECK
### UI-Q27 — COPY COMPACTNESS
### UI-Q28 — DESKTOP/MOBILE PRIORITY
### UI-Q95 — STRONG GREEN SEMANTIC
### UI-Q97 — TYPOGRAPHY EXACT
### UI-Q98 — TYPOGRAPHY RESPONSIVE QA
### UI-Q99 — ANTI-GENERIC MATERIAL PASS
### UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH
### UI-Q-v28-31 — DARK PIXEL + CONTROLLED POP / GAME-LIKE INTERACTION
### UI-Q-v28-25 — TARGETED GRAPHIC POLISH
### UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT
### UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY
### UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
### UI-Q22 — TOUCH TARGETS
### UI-Q23 — SAFE AREA
### UI-Q24 — COLOR-INDEPENDENT SIGNAL
### UI-Q03 — MORNING HIERARCHY
### UI-Q04 — ORDER SCENE
### UI-Q05 — ORDER FUNDS
### UI-Q06 — ORDER OFFERS
### UI-Q07 — ORDER PRIMARY ACTION
### UI-Q08 — REROLL VISIBILITY
### UI-Q61 — ORDER ACTION SPLIT
### UI-Q62 — ORDER REROLL WITH SELECTION
### UI-Q63 — ORDER DECISION INFO
### UI-Q64 — ORDER SCROLL / FOCUS
### UI-Q81 — ORDER ITEM HIERARCHY
### UI-Q82 — ORDER WAREHOUSE COLLAPSE
### UI-Q10 — SALE STORE PRIORITY
### UI-Q11 — SALE NPC MOBILE STACK
### UI-Q65 — SALE DESKTOP HIERARCHY
### UI-Q66 — SALE MOBILE HIERARCHY
### UI-Q109 — MOBILE SALE PLAYABILITY
#### CONFIRMED PLACEMENT — ENVIRONMENT READINESS
### UI-Q-v28-3 — MOBILE SALE QUEUE
### UI-Q-v28-4 — CURRENT CUSTOMER STATE
### UI-Q110 — TRANSIENT CUSTOMER SPEECH
### UI-Q67 — NPC WALLET VISIBILITY
### UI-Q-v28-11 — LOYALTY HELP
### UI-Q-v28-12 — EVENT TEMP BUDGET
### UI-Q29 — RETURNING NPC DELTA VISIBILITY
### UI-Q90 — RETURNING NPC LAST BAG
### UI-Q91 — QUEUE UNCERTAINTY
### UI-Q68 — SALE SCROLL / FOCUS
### UI-Q74 — NEXT PORTRAIT PRELOAD
### UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE
### UI-Q12 — INVENTORY REACHABILITY
### UI-Q13 — PRICE BUTTONS
### UI-Q25 — ITEM DECISION INFO
### UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
### UI-Q87 — TWO-SLOT HANDLING
### UI-Q88 — SEQUENTIAL TRANSACTION
### UI-Q100 — SALE REFUSAL PRICE CEILING
### UI-Q102 — SALE NON-DECISION DETAIL REMOVAL
### UI-Q-v28-15 — SALE COPY DENSITY
### UI-Q14 — FORECAST LANGUAGE
### UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK
### UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK
### UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH
#### Case A — no Fatigue band change
#### Case B — its 피로 회복 releases a Fatigue band
### UI-Q-v28-7 — GREAT SUCCESS SIGNAL
### UI-Q84 — FOUR CORE STATS REMAIN VISIBLE
### UI-Q69 — STAT SOURCE
### UI-Q-v28-5 — SEMANTIC DELTA
### UI-Q-v28-6 — SHARED POPOVER
### UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY
### UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER
### UI-Q26 — HAZARD NUDGE
### UI-Q35 — HAZARD EFFECT ACCESS
### UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC
### UI-Q-v28-8 — FATIGUE
### UI-Q32 — PLAYER STAT TERMINOLOGY
### UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
### UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
### UI-Q-v28-16 — DEEP REPEAT COPY
### UI-Q16 — NIGHT RESULT
### UI-Q31 — NIGHT IMPORTANCE WEIGHTING
### UI-Q70 — NIGHT CONTROLS
### UI-Q92 — NIGHT RESULT TRUTH
### UI-Q-v28-9 — NIGHT REACTION
### UI-Q-v28-23 — NIGHT RESULT PRESENTATION
### UI-Q18 — CLOSING ECONOMICS
### UI-Q-v28-13 — CLOSING FOOTER
### UI-Q-v28-17 — CLOSING ECONOMICS ONLY
### UI-Q36 — RELIC VISIBILITY / QUICK VIEW
### UI-Q37 — RELIC MILESTONE REVEAL
### UI-Q93 — FINAL TIMELINE
### UI-Q40 — BOSS / RELIC REVEAL ORDER
### UI-Q41 — SLOTH WINDOW CHOICE CLARITY
### UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
### UI-Q-v28-10 — BOSS MOBILE DENSITY
### UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF
### UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION
### UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT
### UI-Q-v28-32 — FINAL PARTY / PREPARATION
### UI-Q-v28-1 — STORE MANAGEMENT
### UI-Q-v28-2 — PRE-RUN RETURN PATH
### UI-Q112 — PRE-RUN DECORATION EMPTY SLOT
### UI-Q-v28-20 — DECORATION DECISION SURFACE
### UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES
### UI-Q-v28-18 — STORE CAPITAL CURRENCY
### UI-Q-v28-14 — DECORATION ART / SETTLEMENT
### UI-Q42 — META PROGRESSION PRESENTATION
### UI-Q39 — MONSTER KNOWLEDGE — RETIRED FROM THE CODEX
### UI-Q71 — MENU EXACT
### UI-Q72 — SETTINGS EXACT
### UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR
### UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY
### UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH
### UI-Q19 — TUTORIAL OVERLAY
### UI-Q20 — TUTORIAL RESPONSIVE POSITION
### UI-Q21 — TUTORIAL PERSISTENCE
### UI-Q15 — FORECAST TUTORIAL
### UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT
### UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL
### UI-Q73 — FULL RESET TUTORIAL
### UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER
### UI-Q113 — TUTORIAL COACH COPY / TARGETING
### UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT
### UI-Q114 — AUDIO AUDIBILITY / COVERAGE
### UI-Q-v28-22 — DECISION / PHASE AUDIO
```

## REWORD — version tag removed, check kept

```text
Other routine primary actions use their v2.7 material direction rather than generic green CTA repetition.
For each art/icon/crop/scale asset changed under the v2.8 polish pass:
```

```new
Other routine primary actions use their material direction rather than generic green CTA repetition.
For each art/icon/crop/scale asset changed under the polish pass:
```

## REWORD — pointers name the current owner file

```text
- values match `DUNGEON_HAZARD_v2.7.0.md` / `ECONOMY_ORDER_v2.7.0.md`
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.7.0.md`
UI matches META_v2.5.0 and does not resurrect legacy progression truth.
Test all current fresh-init paths owned by `CORE_RUN_v2.7.0.md`.
```

```new
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
UI matches META_v2.8.0.md and does not resurrect legacy progression truth.
Test all current fresh-init paths owned by `CORE_RUN_v2.8.0.md`.
```

## REWORD — UI-Q109 Bag: dead `stacked vertically` clause trimmed (UI_UX_v2.8.0 §Bag: the two slot boxes never stack vertically; kept UI-Q-v28-4)

```text
- Bag is exactly two slots, stacked vertically in the upper-right and each is ~44px touch class or larger
```

```new
- Bag is exactly two slots in the upper-right and each is ~44px touch class or larger
```

## REWORD — UI-Q109 CONFIRMED PLACEMENT: approval narration removed from the first rule line

```text
Approved during the hotfix. The destination block stays in the counter band and keeps what is
```

```new
The destination block stays in the counter band and keeps what is
```

## REWORD — UI-Q103: post-commit block relabelled to the current heading `판매 후 변화` (UI_UX_v2.8.0 §SALE SELECTED-ITEM INFORMATION / §POST-COMMIT DELTA SOURCE TRUTH; kept UI-Q-v28-15)

```text
- a generic `보급 후 변화` block is allowed only if those source classes are immediately distinguishable
```

```new
- a generic `판매 후 변화` block is allowed only if those source classes are immediately distinguishable
```

## REWORD — inheritance word removed, check kept

```text
- inherited `다음 / 전체 건너뛰기` controls remain exact
- inherited functional composition unchanged
```

```new
- `다음 / 전체 건너뛰기` controls remain exact
- functional composition unchanged
```

## REWORD — UI-Q43: the Family / Hazard report beat label `D30:` -> `D25:` (v2.7 override "exact Family/Hazard disclosure occurs on D25"; UI_UX_v2.8.0 §D25 — 최종 정찰 보고 carries the same bullets)

```text
D30:
```

```new
D25:
```

## REWORD — UI-Q42 SETUP: retired Franchise Grade clause trimmed

```text
Open Meta/HQ progression on accounts with different matrix states and Franchise Grades.
```

```new
Open Meta/HQ progression on accounts with different matrix states.
```

## REWORD — UI-Q106: `v2.7/` version tag removed; save generation v8 is current (CORE_RUN_v2.8.0 §SAVE v8)

```text
2. enter current v2.7/v8 build
```

```new
2. enter current v8 build
```

## REWORD — v2.7 override sub-bullets kept as UI-Q43 checks (version tag removed, pointer to BOSS_v2.8.0.md, subject named)

Placed under UI-Q43 D5 `correct fixed Boss name` and in Final preview in place of the superseded GLUTTONY line.
The third sub-bullet (`Counter / Supply / ... remain outside that reduction`) is kept verbatim.

```text
- v2.7 follows `BOSS_v2.7.0.md`: all positive Core-Stat contribution originating from Items is reduced to 50%; no Rarity threshold
- identity follows `BOSS_v2.7.0.md`: `탐식의 마왕 글러트니`
```

```new
- GLUTTONY preview follows `BOSS_v2.8.0.md`: all positive Core-Stat contribution originating from Items is reduced to 50%; no Rarity threshold
  - GLUTTONY identity follows `BOSS_v2.8.0.md`: `탐식의 마왕 글러트니`
```

## NEW — topic-group headings and the SCOPE owner pointer

```new
## SCOPE
## PHASE IDENTITY / VISUAL LANGUAGE
## FUNCTIONAL LAYOUT / MOBILE / ACCESSIBILITY
## MORNING
## ORDER
## SALE — LAYOUT / CUSTOMER
## SALE — ITEM / TRANSACTION
## SALE — FORECAST / PREPARATION INFORMATION
## DEEP EXPEDITION
## NIGHT
## CLOSING
## RELIC / STORE SUPPORT
## BOSS / FINAL
## STORE MANAGEMENT / META
## MENU / SETTINGS / DEBUG
## TUTORIAL / HELP
## AUDIO
```

## UNRESOLVED — kept verbatim, reported to the User

1. NIGHT closing-handover label. UI-Q-v28-31: "NIGHT's last result advances with `마감으로`; intermediate
   results with `다음`". UI-Q70: "EXPECT exactly: - 다음 - 전체 건너뛰기", and UI_UX_v2.8.0 §NIGHT — EXACT
   CONTROLS: "Exactly two Player controls: `다음` / `전체 건너뛰기`". `마감으로` is in no current design
   owner (UI_UX / NIGHT_CLOSING / PRESENTATION_POLISH* / COPY_AUDIT_APPROVED). Both checks kept.

2. NIGHT Outcome size scope. UI-Q-v28-31: "every NIGHT Outcome label measures 36px `var(--f-sign)`"
   (unqualified, in a check run on phone and desktop). UI_UX_v2.8.0 §NIGHT LAYOUT — DESKTOP ADAPTATION:
   "The exact 36px Outcome rule is the PHONE baseline. On desktop the Outcome may scale with the rest of
   the record". Kept verbatim; which one bounds the desktop check is not decided here.

## NOTES — checked and compatible (kept verbatim)

1. UI-Q14 "No exact probability or master score." inspects the Combat / Hazard forecast labels; the exact
   conditional 실패 시 사망 위험 % is a separate readout checked by UI-Q107, and exact Success % stays hidden
   (UI_UX_v2.8.0 §FORECAST UI / §SALE — PRE-SUPPLY EXPEDITION OUTLOOK).
2. UI-Q-v28-8 (`보급 회복 / 보급 완화 / 밤 피로` absent as primary NIGHT labels) vs UI_UX §NIGHT — ACTUAL
   ARITHMETIC example rows: primary label vs on-demand detail; compatible.
3. UI-Q38 widths 360 / 390 / 430 vs 412-class in UI-Q98 / UI-Q109 / UI-Q-v28-26: compatible (as in the
   UI_UX ledger).
4. UI-Q109 "Bag slot size is a documental baseline, not a fixed requirement" vs UI_UX §Bag "at least ~44px
   touch class": the qualifier keeps "provided the slots stay a real touch target"; compatible.
5. UI-Q-v28-15 escaped backticks (\`판매 후 변화\`) are the chain text, kept verbatim.

## TEST GAP — current rules with no UI QA check (not added here)

- UI_UX_v2.8.0 §RETIRED ACTIVE UI (Franchise Grade / Achievement / Start Contract not exposed): after UI-Q108
  left, only UI-Q-v28-14's pointer ("Franchise-retirement checks ... as defined by META_v2.8.0.md and
  CORE_RUN_v2.8.0.md") remains.
- UI_UX_v2.8.0 §NIGHT LAYOUT — UNLOCK NOTICE (two-line `새 상품 해금` / `{상품명}`).
- UI_UX_v2.8.0 §NIGHT LAYOUT — DESKTOP ADAPTATION (one shared desktop step for every Outcome).

## REVIEW NOTES (independent review: 0 MUST-FIX)

- UNRESOLVED, reported to the User: UI-Q-v28-31 / Source label the last NIGHT result's primary
  control `마감으로`; no design owner names it (UI_UX: exactly `다음` / `전체 건너뛰기`).
- UNRESOLVED, reported to the User: UI-Q-v28-31 "every NIGHT Outcome label measures 36px" vs the
  newer UI_UX desktop adaptation (36px is the phone baseline; Source uses 46px on desktop).

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A6 tutorial wording; A8 36px is the phone baseline (UI_UX NIGHT desktop adaptation).

```text
- Tutorial says: `특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.`
- every NIGHT Outcome label measures 36px `var(--f-sign)`, and the NPC name and Outcome summary
```

```new
- Tutorial says: `이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.`
- every NIGHT Outcome label measures 36px `var(--f-sign)` on phone (desktop may scale, one size for all Outcomes), and the NPC name and Outcome summary
```


## REWORD — presentation pointers (User decision 2026-09-23)

The seven presentation owners moved to `design_ssot/history/`; the current owner is
PRESENTATION_PRINCIPLES_v2.8.0.md. The SCOPE pointer follows it. The original was a consolidation-new line
(removed from the `new` fence under "NEW — topic-group headings and the SCOPE owner pointer"; not a chain
line, so listed outside a fence):

    Design owner under test -> UI_UX_v2.8.0.md; presentation checks -> PRESENTATION_SYSTEM_v2.8.0.md / PRESENTATION_POLISH*_v2.8.0.md.

```new
Design owner under test -> UI_UX_v2.8.0.md; presentation checks -> PRESENTATION_PRINCIPLES_v2.8.0.md.
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): Supply is Fatigue recovery only (`피로 회복 N`, `피로 A -> 출발 B`, no required Supply / deficit / `보급 부족 완화`), Fatigue bands run 0~40 and NIGHT names the band from 20 up with `음식·음료로 -N` in the expanded path. UI-Q80 is deleted (its whole point was the required-Supply line); UI-Q81 / Q86 / Q103 / Q85 / Q83 / Q89 / Q-v28-8 / Q92 / Q43 / Q94 expectations are rewritten under the same ids. Declared-new lines edited in place above: the `### UI-Q80` heading (removed) and the three UI-Q103 `#### Case` headings (now two: `no Fatigue band change` / `its 피로 회복 releases a Fatigue band`).

```text
- current/departure Fatigue and compact Supply arithmetic readable
- main label is 귀환 후 피로
- detailed path available on demand
- Counter / Supply / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
- Morning keeps current compact Gate/Hazard structure
- required Supply is shown as exact `필요 보급 N`
- no added recommendation paragraph / easy-medium-hard Supply label
- exact Stat/Counter/Supply/penalty values are readable
- required Supply
- Item shows exact Stat/Counter/Supply
- deterministic Supply/Fatigue arithmetic
- Required/Prepared/Deficit values match runtime
- actual Supply preRecovery/outcome buffer use can be read when relevant
Tutorial explains Stat pressure / Counter contribution / readiness and Supply->Fatigue order.
Use current `집중 사탕` (`공포 +10 / Supply 3`) in three controlled setups.
- direct effect shows 공포 Counter / Supply only
- effective 투력/강인함/기동/정신 and underlying Hazard preparation may improve if the canonical unified Supply Deficit system actually changes them
- any displayed Core-Stat delta is attributed to `보급 부족 완화` or equivalent system source
- exact hidden deficit formula remains undisclosed
- effective 기동/정신 may rise according to the current Fatigue owner
```

```new
(User 2026-09-24, v2.9.0)
- exact Stat/Counter/`피로 회복 N`/penalty values are readable
- deterministic Fatigue-recovery arithmetic (`피로 A -> 출발 B`)
Use current `집중 사탕` (`공포 대응 +10 / 피로 회복 3`) in two controlled setups.
- direct effect shows 공포 Counter / 피로 회복 only
- no `보급 부족 완화` row exists
- effective Core Stats may rise according to the current Fatigue owner (`DUNGEON_HAZARD_v2.8.0.md` bands)
- Item shows exact Stat/Counter/`피로 회복 N`
- `피로 A -> 출발 B` matches runtime preRecovery; no required / deficit value is shown
- current Fatigue readable in the status strip; `피로 A -> 출발 B` only on the counter tray for a chosen Food/Drink; no always-on Fatigue line, no `보급 X / 필요 Y` cell (User 2026-09-24 revision, v2.9.0)
- main label is 귀환 후 피로, with ` · {band}` from Fatigue 20 up
- detailed path available on demand; the recovery row is `음식·음료로 -N`, never `남은 보급으로`
- actual Food/Drink preRecovery/outcome buffer use can be read when relevant
- Counter / 피로 회복 / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
Tutorial explains Stat pressure / Counter contribution / readiness and one Supply/Fatigue fact: Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신.
```

## AMENDMENT — v2.9.0 transaction beat / SALE at a glance (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the SALE readout shows two cells (전투 전망 / 환경 대응) with two `?`, and the exact `실패 시 사망 위험 {N}%` moves into the second line of the 전투 전망 help and the NPC detail; the price buttons carry the role words (`할인 50%` / `정가` / `바가지 150%` with `이익 {N}G`); the Bag stays in the customer-state strip (User revision 2026-09-24); the purchase / refusal reply line stays 5 seconds while the greeting keeps 3; the transaction beats, Stat grid pressure tag, matching-effect emphasis and one delta list (no outlook delta rows; C3 corrected) get UI-Q-v29-3 … UI-Q-v29-9. UI-Q13 / Q87 / Q107 / Q109 / Q110 / Q-v28-7 / Q-v28-30 expectations are rewritten under the same ids. The UI-Q109 Bag line keeps its earlier declared-new form (`in the upper-right`).

```text
- Combat/Hazard/Death readouts remain frozen
- still auto-dismisses around 3 seconds and is tap-dismissible
- the exact risk label is `실패 시 사망 위험`
- exact pre-supply 실패 시 사망 위험 % is shown from the same state
- after first and second committed Item transactions, the three outlook values remain unchanged on screen
`전투 전망` and `실패 시 사망 위험`. It is the same canonical ladder off the same frozen
- it auto-hides after 3 seconds
- a new line restarts the 3-second display
50/100/150 are visually distinct, large enough, and easy to switch.
```

```new
- the greeting still auto-dismisses around 3 seconds (a purchase / refusal reply line after 5 seconds) and is tap-dismissible (User 2026-09-24, v2.9.0)
`전투 전망` (the readout's only two cells; User 2026-09-24, v2.9.0). It is the same canonical ladder off the same frozen
- a greeting auto-hides after 3 seconds; a purchase / refusal reply line after 5 seconds (User 2026-09-24, v2.9.0)
- a new line restarts its own display
The three price buttons `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G` are visually distinct, large enough, and easy to switch (User 2026-09-24, v2.9.0).
- the slots stay in the customer-state strip beside the status line (User 2026-09-24, v2.9.0)
### UI-Q-v29-3 — TRANSACTION BEAT
One ordinary SALE customer at 390 and 1280: one successful price commit, one refusal, one `손님 보내기`; repeat the same flow under `prefers-reduced-motion`.
Every beat is presentation only, each ≤ 320 ms, one sale's beats total < 600 ms, input is never blocked, and the scroll position stays on the same customer.
- frame captures at 0 / 150 / 300 / 600 ms of the sale show the Item icon travelling from the counter tray to the customer's Bag slot in the customer-state strip (260~320 ms), the slot settling (scale 1.05 -> 1, 240 ms), the dock Gold counting to its new value, and the changed Stat cells pulsing once (300 ms) and keeping the new value; the `판매 후 변화` rows do not vanish
- purchase: the customer figure nods (translateY 4px, 180 ms x 2); refusal: it shakes its head (translateX ±4px, the existing bubble-shake timing) and the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text
- the reply line (buy / refuse) stays 5 seconds; the greeting keeps 3 seconds
- `손님 보내기`: the current customer exits left (240 ms), the next arrives with the existing entry (240~340 ms), and `depart` plays a recorded utility cue (door / step family); entry may still start the view at the top
- 50% / 100% / 150% share one register sound family and differ only by coin ticks (1 / 2 / 3); no mode sounds like the correct answer
- under reduced motion the same flow completes instantly with an identical end state (Gold, Bag, Stat values, lock state, reply line)
- no beat adds information the resolved state does not already hold; no Save field, no Gameplay RNG draw
- input is blocked during a beat, or one sale's beats total 600 ms or more
- the view scrolls away from the current customer during a beat
### UI-Q-v29-4 — BAG IN THE STRIP
SALE at 360, 390 and 1280, before and after one sale.
- the two Bag slots stay in the customer-state strip beside the status line at every width (the v2.8 place), labelled `가방 {n} / {slots}`
- each slot is at least 34px and the Bag reads as the heaviest element of the strip; the hand-over ghost lands on the slot it fills
- the slots remain the handling surface: focus / replace / remove and tap-only completion work as in UI-Q87; no third ghost slot
### UI-Q-v29-5 — STAT GRID PRESSURE TAG
Customers whose Gate presses one Stat through one Hazard, one Stat through two Hazards, and a Stat the Gate does not press.
- under a pressed Stat cell a small tag shows the pressing Hazard icon + name only (e.g. `냉기`; two Hazards joined as `독 · 속박`)
- the tag sits under the Stat that Hazard actually presses (강인함 / 기동 / 정신 per `DUNGEON_HAZARD_v2.8.0.md`)
- 투력 never carries a tag
- an unpressed Stat carries no tag
- the tag carries no number and no verdict word
SALE shelf holding an Item that counters one of the customer's Gate Hazards, an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.
- only the effect text that is a Counter for one of the Gate's Hazards, or the Core Stat one of its Hazards presses, is set in the emphasis style (bold, ink colour)
- every other effect text keeps the default style
- no badge, no verdict word, no row reorder
- ORDER offer rows follow the same rule against today's Gate once the D-4 batch adopts it
### UI-Q-v29-7 — ONE DELTA LIST
Select a Food/Drink that releases a Fatigue band for a fatigued customer; then an Item that changes a Stat only; then commit one of them; the same Items in the till and in FINAL preparation.
- `판매 후 변화` lists only the Item's own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`); no `피로 완화` row and no `피로 {A} → 출발 {B}` line anywhere (User 2026-09-25)
- no outlook delta row (no `전투 전망 A → B`, no `환경 대응 A → B`) for a selected or a committed Item
- the frozen SALE-entry outlook is not repainted inside the till and never changes for a selected Item (UI-Q86)
- `특수 효과` and the shelf-life line stay
- an outlook block or outlook delta row appears under the Item
- a row appears for a value that did not change
### UI-Q-v29-8 — PRICE ROLE WORDS
- the three price buttons read `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`
- under each: `이익 {N}G`, or the existing disabled reason
- three modes and no extra depth; no fourth control
### UI-Q-v29-9 — DEATH % ONLY IN THE 전투 전망 HELP AND NPC DETAIL
- the SALE readout `.top` shows exactly two cells, 전투 전망 and 환경 대응, each with its own `?`; no `실패 시 사망 위험` cell and no third `?`
- the 전투 전망 `?` shows two lines: the outlook help and `실패 시 사망 위험 {N}%` with the frozen SALE-entry value
- the NPC detail modal shows `실패 시 사망 위험 {N}%`
- the % appears nowhere else on the SALE surface; Final preparation is unchanged (UI-Q-v28-32)
- the readout shows exactly two cells, 전투 전망 and 환경 대응; the exact risk label `실패 시 사망 위험` is the second line of the 전투 전망 `?` (`실패 시 사망 위험 {N}%`) and an NPC detail line, not a readout cell (User 2026-09-24, v2.9.0)
- exact pre-supply 실패 시 사망 위험 % in that help line is computed from the same state
- after first and second committed Item transactions, the two readout cells and the help-line % remain unchanged on screen
- Combat/Hazard readout cells and the help-line Death % remain frozen (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 onboarding / ORDER (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the DAY 1~3 task line, the first-ORDER coach order (`gates` → `offer` → `quantity` → `confirm` → `reroll`, `gold` retired), the ORDER today-fit emphasis, the per-Gate visitor counts and the two-line D0 briefing / 처음 3일 guide get UI-Q-v29-10 … UI-Q-v29-14. The reveal boundary is narrowed to the individual customer (identity / destination): the UI-Q101 and UI-Q91 lines are rewritten under their ids, and the UI-Q81 badge line names the allowed typographic emphasis. No existing id asserted the old ORDER coach order or the four-paragraph briefing body.

```text
- future customer identity/destination remains hidden
future customer Job/Level/Destination/preparation need/importance is not newly revealed.
- no today-fit/recommended badge
```

```new
future customer Job/Level/individual Destination/preparation need/importance is not newly revealed; the per-Gate visitor count of the ORDER 오늘 line (UI-Q-v29-13) is not a reveal (User 2026-09-24, v2.9.0).
### UI-Q-v29-10 — DAY 1~3 TASK LINE
Fresh account with the tutorial not skipped: DAY 1, 2, 3 and 4 of one Run at 360 and 1280, every phase; DAY 0; then an account whose tutorial is skipped (`tutorial.skipped` true) on DAY 1.
One fixed text line at the top of the phase content (under the menu pin, above the first block): no coach mark, no spotlight, no button.
- DAY 1~3 MORNING / ORDER / SALE / NIGHT / CLOSING each show exactly the `COPY_AUDIT_APPROVED_v2.8.0.md` §3-8 string: `오늘 할 일 — 열린 게이트의 위험을 본다` / `오늘 할 일 — 위험에 맞는 능력을 올리는 상품을 발주한다` / `오늘 할 일 — 손님이 갈 게이트를 보고 상품과 가격을 정한다` / `오늘 할 일 — 준비가 어떻게 됐는지 확인한다` / `오늘 할 일 — 오늘 장사를 정리한다`
- the line never wraps to a second line at 360
- DAY 0 has no task line; from DAY 4 the line is gone
- with the account tutorial skipped the line is absent on DAY 1~3
- it reuses the tutorial state, adds no Save field, and adds exactly one line of page height (the User-approved exception to "tutorial does not add page height")
- the line appears on DAY 0, on DAY 4 or later, or with the tutorial skipped
- the line is a coach mark / spotlight / button, or wraps at 360
### UI-Q-v29-11 — FIRST-ORDER COACH ORDER / TARGETS
Fresh account, first ORDER at 360 and 1280; step through the coach.
The ORDER coach group runs `gates` → `offer` → `quantity` → `confirm` → `reroll`, one concept per step.
- the steps appear in exactly that order and nothing else is in the group
- `gates` (step id `order-gates`, apart from MORNING's `gates`, so seeing one never marks the other seen) highlights the ORDER 오늘 brief block and reads `오늘 열린 게이트와 위험. 위험 보기를 누르면 무엇으로 막는지 나온다.`
- `offer` highlights the first offer row and reads `후보 상품의 효과. 오늘 위험에 맞는 효과는 굵게 보인다.`
- `quantity` / `confirm` / `reroll` keep their approved lines (COPY_AUDIT §3-7 QUANTITY / §3-2 / COPY_WORLD_VOICE §TUTORIAL COACH COPY); `reroll` is last
- no `gold` mark: `#order-register` carries no coach step
- every step passes UI-Q-v28-27 target truth
- a step reads 보유 골드, or the register is the first target
ORDER on a day with known open Gates; offers holding a Counter for one of today's Hazards, an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.
The same rule and style as UI-Q-v29-6, judged against today's open Gates instead of one customer.
- only effect text that is a Counter for one of today's Hazards, or the Core Stat one of them presses, is set in the emphasis style
- no badge, no `오늘 필요` or other verdict word, no row reorder, no recommended row
- a badge / word / reorder marks the fit, or a non-matching effect is emphasised
### UI-Q-v29-13 — ORDER PER-GATE VISITOR COUNTS
ORDER on a one-Gate day and on a day with two or more open Gates; compare the counts with the destinations the SALE queue's customers claim; include a 거짓말쟁이 and a 게이트 순례주간 reroute where available.
The ORDER 오늘 line follows `COPY_AUDIT_APPROVED_v2.8.0.md` §4-21.
- one Gate: the line reads `{N}명 · {Gate}` with no per-Gate count
- two or more Gates: `{N}명 · {Gate A} {a} · {Gate B} {b}`; the per-Gate numbers sum to N
- each count follows the destination the customer claims; a liar's or a rerouted customer's true Gate is not exposed by the count
- no name, Job, Trait, Wallet or individual destination of a future customer is revealed (UI-Q91 / UI-Q101, narrowed to the individual)
- per-Gate counts on a one-Gate day, a count that exposes a true Gate, or any individual identity
### UI-Q-v29-14 — D0 BRIEFING TWO LINES / GUIDE 처음 3일
Fresh Run: the D0 Boss briefing after the first Store Support choice; then open 점주 가이드 from the menu at 360 and 1280.
The briefing body is the two `COPY_AUDIT_APPROVED_v2.8.0.md` §14-1 lines; the guide opens on `처음 3일` (§8-0) with the eight sections under `자세히`.
- `조사 정보를 확인하며 토벌대를 준비하고, DAY 30까지 점포를 운영해야 한다.` is absent
- 점주 가이드 opens on a first block `처음 3일` with exactly the five §8-0 lines in order
- the existing eight sections (§8-1 … §8-8) sit under a `자세히` disclosure, collapsed by default, and open on tap
- the disclosure exists only inside the help modal; no gameplay screen gains one
- the `DAY 5` / `DAY 30` paragraph body or the closing sentence remains; `처음 3일` is missing; `자세히` is open by default
```

## AMENDMENT — v2.9.0 presentation leftovers (User decision 2026-09-24)

Three new ids: card copy in two clauses, no second owned-Relic block in SALE, warehouse list starts collapsed.

```new
### UI-Q-v29-15 — STORE SUPPORT CARD COPY, TWO CLAUSES
(User 2026-09-24, v2.9.0)
SETUP:
Open the DAY 0 Store Support takeover and the owned-Relic modal on a Run that owns several Store Supports, at 360 and 1280.
EXPECT:
Every card body is the exact `COPY_AUDIT_APPROVED_v2.8.0.md` §11 line for that Store Support.
PASS:
- all thirty card bodies match §11-1 … §11-30 verbatim; effect first, condition after ` · `; no HQ-accounting clause
- values and effects match RELIC_v2.8.0.md (copy changed, rules did not)
FAIL:
- a card shows the pre-v2.9.0 wording, or a body that is not the §11 line
### UI-Q-v29-16 — NO SECOND OWNED-RELIC BLOCK IN SALE
(User 2026-09-24, v2.9.0)
SETUP:
SALE with owned Store Supports at 360, 390, 412, 1024 and 1280; then the FINAL preparation screen.
PASS:
- SALE shows the compact owned-Relic control in the shelf heading and no owned-Relic block lower in the column at any width
- the FINAL preparation screen still lists owned Store Supports
FAIL:
- a `보유 점포지원` block appears under the Trait rows on desktop, or the FINAL list is gone
### UI-Q-v29-17 — WAREHOUSE LIST STARTS COLLAPSED
(User 2026-09-24, v2.9.0)
SETUP:
Fresh account, first ORDER at 360 and 1280; open the list; reload; next Day's ORDER.
PASS:
- the held-stock list is collapsed on first ORDER and the summary line (used / total slots, kinds) is visible
- at 360 the first offer row is reachable without scrolling past an open list
- opening it persists across the reload and the next Day until the player folds it
FAIL:
- the list starts open on a fresh account, or the summary line hides inside the collapsed detail
```

## AMENDMENT — v2.9.0 counter tray (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): UI-Q-v29-18 COUNTER TRAY added; the UI-Q-v29-3 hand-over line (declared new in the transaction-beat amendment) is edited in place to start from the tray.

```text

```

```new
### UI-Q-v29-18 — COUNTER TRAY
(User 2026-09-24, v2.9.0)
SETUP:
SALE at 360, 390 and 1280: entry, tap one shelf row, tap a second row, one successful sale, one refusal.
PASS:
- at entry the tray is empty: on DAY 1~3 with the tutorial active one line (`상품을 누르면 계산대에 올라온다.`, ≤ 48px at 360), otherwise no height; the shelf heading plus at least one row are visible without a scroll
- tapping a row fills the tray (header line, `판매 후 변화`, `특수 효과` when any, three price keys) and the shelf list does not move: no row changes height, scrollTop is unchanged
- tapping a second row swaps the tray contents; both rows stay where they were
- the filled tray is ≤ 200px at 360 and at least three shelf rows remain visible above it
- the price keys are at the same place for every Item; the hand-over icon starts from the tray icon and lands on the Bag slot; a successful sale clears the tray
- a refusal keeps the Item on the tray with the refused key locked (`오늘 거절됨` / `더 싼 값을 거절함`)
- on 1280 the tray sits above the dock with its contents aligned under the shelf column
- FINAL keeps its per-row panel (UI-Q-v28 FINAL ids unchanged)
FAIL:
- the shelf list moves or changes height when a row is tapped
- the filled tray hides all but two shelf rows at 360
- the tray needs a drag, a scroll or a second tap to reach the price keys
```

## AMENDMENT — v2.9.0 trims: returning surface / empty tray / coach (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): UI-Q90 quick surface desk-only; UI-Q-v29-18 empty-tray line edited in place above.

```text
- compact `지난 원정 · DAY X · 결과 · [item] [item]`
```

```new
- compact `지난 원정 · DAY X · 결과 · [item] [item]` on a desk; not shown on phone, where the NPC detail 원정 기록 holds it (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 Gate Hazard requirement number (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0 revision): UI-Q-v29-19 GATE HAZARD REQUIREMENT NUMBER added.

```text

```

```new
### UI-Q-v29-19 — GATE HAZARD REQUIREMENT NUMBER
(User 2026-09-24 revision, v2.9.0)
SETUP:
PASS:
- N equals ceil(Hazard Threat) of that Gate on that Day (DUNGEON_HAZARD §HAZARD THREAT), so it rises with Day and Tier; n is 3 for 강인함 and 2 for 기동 / 정신 (Stat n당 대응 1)
- no Item name and no verdict word
FAIL:
- a per-customer "더 필요" number, a readiness ratio, or a requirement number that does not match ceil(Hazard Threat)
```

## AMENDMENT — v2.9.0 revision 2: pressure labels and the destination-plate ? retired (User decision 2026-09-24)

Every player-facing Hazard row (SALE destination plate, D25 scouting report, FINAL 확인된 위협 included) reads the numbered short row
`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; the labels `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and the plate `?` help are
retired. The revision-1 declarations this replaces were edited out of the fences above in place.

```text
- each Hazard provides its short Stat-pressure explanation
```

```new
- each Hazard provides its numbered short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공` (User 2026-09-24, v2.9.0)
MORNING Gate plates and the ORDER 위험 보기 modal on a T1, a T2 and a T3 day; the SALE destination plate of a customer going to one of them; the D25 최종 정찰 보고 and the FINAL 확인된 위협 rows.
- every Hazard row states the Gate-level requirement first: MORNING plate, SALE destination plate, D25 report and FINAL rows read `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; Gate detail alone reads the full sentence `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다`
- no `{위험} · {label}` row and no destination-plate `?` help survive; D25 / FINAL show N = 29 (Day 30 / T2); no per-customer remaining need, no readiness number, no 0.75 / 0.40 threshold appears anywhere (User 2026-09-24 revision 2)
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
unchanged (`-` at q=0, `+` at q>=max, `1 / 3` above max, `최대` a q=max shortcut)
Before ORDER on controlled next-Day states:
- MORNING shows next-day Gate-count forecast
- randomized count shows exact probability per possible count
- deterministic count shows fixed count rather than fake split
- MORNING shows exact next-day T1/T2/T3 probability forecast
- current-day Gate/Hazard remains more prominent as today's preparation context
- next-day Family / exact Gate composition / Hazard set remain hidden
- no recommended Item/category/quantity is added
If ORDER repeats the forecast:
PASS only when the values exactly match MORNING and are not regenerated independently.
Open Morning/Order before spend.
T1/T2/T3 next-day percentages visible and compact.
Player can act on them before order commitment.
```

```new
unchanged (`-` at q=0, `+` at q>=max, `1 / 3` above max, `최대` a q=max shortcut); a control blocked by Gold or
warehouse space (not by the offer's supply) stays dim but answers a tap with the §3-9 reason toast, and `최대` at 0
does the same (User 2026-09-24, v2.9.0)
### UI-Q101 / UI-Q09 — NEXT-DAY FORECAST — RETIRED
(User 2026-09-24, v2.9.0) No next-day Gate-count or Tier forecast is shown at MORNING or ORDER; FAIL if any next-day block, percentage or count appears. The individual-customer boundary (name, Job, Trait, Wallet, destination hidden; per-Gate visitor count public) is checked by UI-Q-v29-14 / ORD-Q84.
### UI-Q-v29-20 — ORDER ROW RARITY LINE / BLOCKED-QUANTITY REASON
- every offer row shows the rarity name in one small line under the Item name, no horizontal overflow at 360
- tapping a `+ / 1 / 3 / 최대` blocked by Gold shows `발주 자금이 부족합니다. {N}G 부족.`; blocked by warehouse space shows `창고 칸이 부족합니다.`; an offer whose whole supply for today is already in the cart shows `오늘 공급 최대 수량입니다.` (COPY_AUDIT §3-9)
- the dim look of a blocked control is unchanged; a supply-exhausted control stays non-interactive except for that toast
- no `내일` block on ORDER
```

## AMENDMENT — v2.9.0 F2-b: two-line Hazard short row, inline Stat tag (User decision 2026-09-25)

The Hazard short row reads `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공` (one line at 900px+); the SALE Stat grid tag sits
beside the Stat name and the value is one step smaller. Superseded declarations were edited in place.
User 2026-09-25 (v2.9.2 play report): on the SALE destination plate `{위험}` and `대응 {N} 필요` share one line and the conversion
line sits under the Hazard name; the phone line in the fence below is edited in place.

```new
- on a phone the short row is two lines, `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공`; on the SALE destination plate `{위험}` and `대응 {N} 필요` share the first line and the conversion line starts under the Hazard name, so no Hazard takes a third line and nothing overflows at 360 / 390 / 412 (`대응 {N} 필요` one type step smaller there; User 2026-09-25); at 900px+ one ` · ` line; the SALE Stat grid shows the pressing Hazard tag beside the Stat name on one line with no overflow, and the value is smaller than before yet larger than the name (User 2026-09-25)
```

## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```new
### UI-Q-v29-20 — SHELF EXPIRY ORDER
(User 2026-09-25, v2.9.0)
SALE with a shelf holding units stocked on different days (some at 1 day left), at 360 and 1280; the same shelf for two customers going to different Gates.
- every row carries `폐기 N일`; a row at 1 day or less is emphasized in the warehouse `.soon` color
- no `유통기한 없음` / `기한 없음` state appears on the tray, the ORDER row or the warehouse list (every Item expires, 2~5 days)
- rows keep one name line + one effect line; no overflow at 360
- an order that changes with the customer's Gate, or a recommendation word
```

## AMENDMENT — v2.9.0 F5: menu routing / 이번 영업의 장식 / abandon flow / 점포 장식 tab / capital rates halved (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F5): the menu 점포지원 row opens the owned list when no Store Support window is purchasable; a read-only menu row 이번 영업의 장식; the DAY 0 `장식 구성 다시 보기` way back is retired; the codex tab 점포 관리 is labelled 점포 장식; 현재 지점 포기 discards the Run at once and returns to 새 점포 준비 with no Run (Decorations purchasable there), no automatic new Run; the Store Capital Day-reach rate table is halved (0.5 / 1 / 1.5 / 2 / 2.5%), prices unchanged. Earlier lines this batch supersedes were removed from the fences above in place.

```text
- tapping a Slot row enters existing 점포 관리 focused/scrolled to that Slot
```

```new
- tapping a Slot row enters the existing 점포 장식 codex tab (label `점포 장식`, (User 2026-09-24, v2.9.0)) focused/scrolled to that Slot
### UI-Q-v29-21 — MENU ROUTING / THIS RUN'S DECORATIONS / ABANDON FLOW
A Run on DAY 0 (first choice pending), a Run on a Day whose Store Support window is spent or closed, and a Run at SALE; the menu on each.
- menu rows exactly 모험가 수첩 / 도감 / 점포지원 / 이번 영업의 장식 / 점주 가이드 / 설정 / 현재 지점 포기
- 점포지원 opens the selection surface only while `canBuyRelic` holds; otherwise the owned list `보유 점포지원` with a close
- 이번 영업의 장식 lists the four Slots with the Run's frozen loadout and effect line; an empty Slot reads `비어 있음`; nothing is editable
- DAY 0 첫 점포지원 has no `장식 구성 다시 보기` button and no close
- 현재 지점 포기 → confirm (§1-3) → the Run is gone (`run = null`), the screen is 새 점포 준비 with no Run, a Decoration can be bought and equipped there, and no new Run has started; `첫 점포지원 고르기` starts it
- every other Run end (bankruptcy, death limit, 폐점, FINAL end) reaches a screen from which 다음 점포 열기 leads to the same 새 점포 준비 where Decorations can be bought
- the codex tab reads `점포 장식`
- abandon starting a new Run by itself, or a Decoration purchase refused with no Run
```

## AMENDMENT — v2.9.0 F6: fit emphasis retired / fixed effect order / category grammar once / transaction result stub (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F6): the matching-effect / today-fit emphasis is retired on SALE and ORDER rows (the judgement is the player's); Item effect lines stand in one fixed per-category order (ITEM §PRESENTATION ORDER); the category grammar is taught once (COPY_AUDIT §8-0 / §3-7 OFFER); each sale shows a per-customer receipt stub `단골도 {±N} · 소지금 {A} → {B}` (~2.5 s, PRESENTATION §TRANSACTION BEAT A8); refusals keep the engine-reason reply pools; PRESENTATION §LEARNING AFTER RESULT. Earlier lines this batch supersedes were removed from the fences above in place.

```new
- no today-fit/recommended badge or verdict word, and no emphasized effect text (UI-Q-v29-12 retired; (User 2026-09-24, v2.9.0))
### UI-Q-v29-6 — MATCHING-EFFECT EMPHASIS — RETIRED
Retired (User 2026-09-24, v2.9.0): see UI-Q-v29-22. PASS is now: no effect text on any SALE row carries an emphasis style, whatever the customer's Gate. The setup below is kept as the negative case.
### UI-Q-v29-12 — ORDER TODAY-FIT EMPHASIS — RETIRED
Retired (User 2026-09-24, v2.9.0): see UI-Q-v29-22. PASS is now: no effect text on any ORDER offer row carries an emphasis style against today's Gates. The setup below is kept as the negative case.
### UI-Q-v29-22 — FIXED EFFECT ORDER / NO FIT EMPHASIS / TRANSACTION RESULT STUB
ORDER with offers of every category; SALE with a shelf of every category for two customers going to different Gates; one 50% sale, one 정가 sale, one 150% sale and one refusal on the same customer; the 점주 가이드; reduced-motion on and off, at 360 and 1280.
- no effect text on any ORDER offer row or SALE shelf row is emphasized; the rows read the same for both customers
- every row lists its effects in the fixed per-category order: Food 피로 회복 first, Drink Stat / Counter first then 피로 회복, Potion 투력, Field Gear its Counters, Insurance its one line; the same order on the tray's 특수 효과 line and in the codex
- the first ORDER OFFER coach and the 점주 가이드 line under 처음 3일 read the exact category-grammar sentence (COPY_AUDIT §3-7 OFFER / §8-0)
- each successful sale shows one receipt stub over the counter band for about 2.5 s reading `단골도 {±N} · 소지금 {A} → {B}` with that customer's real Loyalty change and Wallet before → after; a second sale to the same customer replaces it; nothing reserves height and input is never blocked
- a refusal shows no stub; the reply line comes from the engine's reason pool (가격 / 필요도 / 일반 선택) and stays 5 s
- under reduced motion the stub appears and disappears without motion; the numbers are identical
- any fit emphasis, any recommendation word, a stub at the end of the day instead of per customer, or a stub whose numbers differ from the customer's record
```

## AMENDMENT — v2.9.0 F7: quick-view status line / purchase notice / Counter judgement split (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F7): the owned Store Support quick view carries a runtime status line for condition-type supports only; the purchase notice drops its second sentence; the Counter judgement is split into 직접 대응 / 관련 준비 with one owner (RELIC §COUNTER JUDGEMENT) — the acceptance floor and 원정 위험 게시판 read 관련 준비, the multipliers, pity and cert rewards read 직접 대응, the 기동-for-속박/진창 exception is retired; the accessible-mode base need is 0.72 (measured, not tuned). Earlier lines this batch supersedes were removed from the fences above in place.

```new
### UI-Q-v29-23 — OWNED STORE SUPPORT STATUS LINE / PURCHASE NOTICE
A Run owning 회전 진열대, 길드 보증 진열대, 단체 주문 창구, 발주 교환권, 묶음발주 계약, 단골 묶음혜택 and 야전 정비대; the owned list opened from the menu at MORNING, ORDER and SALE, before and after the condition changes (a guarantee used, the free reroll used, three of one SKU in the cart, a 단골 customer's second purchase).
- each conditional support shows exactly the COPY_AUDIT §11-32 line for the current runtime state; 야전 정비대 (always on) shows no line
- the line changes when the state changes and never says 추천 / 필요 / any verdict
- 묶음발주 계약 shows its line only at ORDER, 단골 묶음혜택 only at SALE for the current customer
- the purchase notice reads `{점포지원명} 확보.` and nothing about 다음 날부터
- a status line on an always-on support, a chance-based support written as inactive, or a new Save field behind any line
```

## AMENDMENT — v2.9.0 SALE forecast pin (User decision 2026-09-25)

User decision 2026-09-25: on a phone the readout's two readings float above the counter tray while the readout is scrolled out of view; one tap folds them to a chip; no Save field.

```new
### UI-Q-v29-24 — SALE FORECAST PIN
(User 2026-09-25, v2.9.0)
SALE with a customer at 360 / 390 / 412 and at 1280; pick a shelf row with the column at the top, then scroll the column until the readout leaves the view and pick a lower row; tap the pin twice; scroll back to the top.
- with the readout in view no pin is shown; with it out of view the pin reads the readout's two words in the readout's colours, at the top of the scrolled column
- one tap shows only the `전망` chip; a second tap restores the line; scrolling back to the top hides the pin again, and after a fold, scrolling away again shows the full line, not the chip
- at 1280 no pin is shown in any scroll state; no layout row moves when the pin appears; no runtime error
- a pin while the readout is visible, a pin on a desk, values that differ from the readout, a pin that pushes the layout, or a Save / account field for the fold
```

### Reworded by the forecast pin (User 2026-09-25): the environment stays at most once on screen, the pin mirrors the forecast only while it is scrolled away

```text
- `환경 대응` is rendered in exactly one place, in the forecast
```

```new
- `환경 대응` is on screen at most once at a time: in the forecast, or — only while the forecast is scrolled out of view on a phone — in the forecast pin that mirrors it (UI-Q-v29-24; User 2026-09-25, v2.9.0)
```

## AMENDMENT — v2.9.0 SALE desk layout (User decision 2026-09-25)

User decision 2026-09-25: on a desk the SALE dossier column is its own area down to the dock, the counter tray sits under the shelf column only, and the two columns scroll separately.

```new
### UI-Q-v29-25 — SALE DESK LAYOUT
(User 2026-09-25, v2.9.0)
SALE with a customer at 1024 and 1280 with a shelf taller than the column; scroll the shelf to its end with the wheel over it, then pick a row.
- the dossier column runs on the wood down to the dock; the counter tray is only as wide as the shelf column and sits under the shelf
- the shelf scrolls alone and the dossier column does not move; after the pick (a redraw) the shelf keeps its scroll position; the next customer starts at the top
- at 360 / 390 / 412 the single scrolled column and the full-width tray are unchanged
- a full-width tray on a desk, the dossier column cut off above the tray, the dossier column scrolling with the shelf, or a shelf that jumps to the top after a pick
```

## AMENDMENT — v2.9.1 balance: UI-Q-v29-26 (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1 balance): UI-Q-v29-26 checks the always-visible Death count / segment limit on MORNING and ORDER.

```new
### UI-Q-v29-26 — DEATH LIMIT ALWAYS VISIBLE
(User 2026-09-25, v2.9.1 balance; owner `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE, copy COPY_AUDIT §4-23.)
MORNING and ORDER at 360 / 390 / 412 and 1280 with 0 Deaths, with 4 Deaths on D10 (one left), on D11 after the segment
step, and with 추모 방명록 worn.
- both screens show `사망 {n} / {limit} · D{end}까지` in the top status line without scrolling, on every Day
- the limit and end Day follow the current segment (5 · D10 / 8 · D20 / 11 · D30) and include 추모 방명록 / 위령제
- warning color exactly when count = limit − 1; no popover, badge or extra text
- the line never wraps mid-token and does not push the ORDER confirm off the phone screen
- the count only in the 도감, a stale segment limit, or a limit that ignores 추모 방명록 / 위령제
```

## AMENDMENT — v2.9.0 fix: D0 briefing body weight (2026-09-25)

UI-Q-v29-14 (2026-09-25): the D0 briefing's two body lines carry the record's body weight; the I-3 two-line markup had no style rule (RUNTIME UX BUG on the live build).

```new
```

## AMENDMENT — v2.9.0: D0 briefing DAY labels (User decision 2026-09-25)

User 2026-09-25: the D0 briefing's DAY 05 / DAY 30 anchors return as an LED label over each of the two approved lines (COPY_AUDIT §14-1); the closing sentence stays deleted. The earlier plain-two-line wording this supersedes was removed from the fences above in place.

```new
- the briefing shows header `마왕 조사 개시`, the unchanged lead line, then a `DAY 05` label over exactly `첫 조사 보고로 토벌 대상이 공개된다. 이후 5일마다 이어진다.` and a `DAY 30` label over exactly `성장한 모험가 최대 3명을 마왕성으로 보내 최종 토벌에 나선다.` (User 2026-09-25), and the unchanged button
- the two labels read on the record's LED face (16px; 17px on a desk) and the two lines in the record's body weight (15px ink; 16px on a desk), never the secondary tone (RUNTIME UX BUG found on the live build 2026-09-25: the two-line body had no style rule)
```

## AMENDMENT — v2.9.2 H1: NIGHT verdict stamp (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.2 H1): UI-Q-v29-27 checks the NIGHT verdict stamp, the cause beat and the reversal overstamp.

```new
### UI-Q-v29-27 — NIGHT VERDICT STAMP / CAUSE BEAT / REVERSAL OVERSTAMP
(User 2026-09-25, v2.9.2 H1; owner `UI_UX_v2.8.0.md` §NIGHT LAYOUT — VERDICT STAMP, principle PRESENTATION_PRINCIPLES §GAME FEEL BEAT.)
NIGHT results reached through 다음 at 390 and 1280, motion on and reduced motion: 성공, 대성공, 퇴각, 부상, 중상, 사망, a
result with a Hero Item line, a 귀환석 reversal (`rescued`) and a Death turned away (`avoidedDeath`); frames through the landing.
- the card stands first and the tag lands after it; 성공 / 퇴각 have no hold, 대성공 / 부상 / 중상 / 생환 / 사망 hold ≤ 200 ms
- the stamp falls from 1.6 × (퇴각 1.3 ×) in 90 ms; on the landing the card dips 4 px (퇴각 2 px) and settles, nothing else moves
- 대성공 is one gold landing; 부상 keeps a red ink spread, 중상 a slightly misaligned tag, 사망 a black tape laid in ≤ 500 ms
- with a Hero Item line that line settles once and the figures do not count; without one only the REWARD figures count up
- the Outcome cue's first note is heard on the landing; on a reversal `rescue` is heard on the overstamp; one visual, one sound, one cause / number at a landing
- the last motion ends by 770 ms; 다음 / 전체 건너뛰기 answer at any frame and no pending cue plays over the next screen
- under reduced motion the end state is identical: same tag, ink / misalignment / tape, figures at their values, no first print
- a count-up beside a Hero Item line, a count on GROWTH / AFTERMATH figures, a faint first print left in the end state, or a changed Outcome type size
```

## AMENDMENT — v2.9.2: `판매 후 변화` lists the Item's own effects only (User decision 2026-09-25)

User decision 2026-09-25: no derived `피로 완화` row and no `피로 {A} → 출발 {B}` line; the inherited line below is superseded.

```text
- displayed delta is attributed to `피로 완화` / Condition source
```

```new
- the band recovery is not listed in `판매 후 변화` and is never attributed to the Item (User 2026-09-25)
```

## AMENDMENT — v2.9.2: UI-Q-v29-28 SALE counter tray fold (User decision 2026-09-25)

User 2026-09-25: the filled SALE tray folds to its header while the shelf is read on a phone.

```new
### UI-Q-v29-28 — SALE COUNTER TRAY FOLD
(User 2026-09-25; owner `UI_UX_v2.8.0.md` §SALE — COUNTER TRAY.)
SALE at 360 / 390 / 412 and 1280 with a long shelf: pick a row, scroll the shelf, tap the folded strip, tap the readout, tap the same row, tap another row.
- scrolling the shelf past 32px or tapping outside the tray / a row / the dock folds a filled tray to its header line on a phone
- the folded strip, the same row or another row opens it again; the selected Item never changes by folding
- picking a row never folds the tray it just filled; a desk never folds; nothing is saved
- the tray stays full height while the shelf is scrolled on a phone, a fold that clears the selection, or a folded tray that only reopens through the price keys
```

## AMENDMENT — v2.9.2: UI-Q-v29-29 ORDER floating today line (User decision 2026-09-25)

User 2026-09-25: the 오늘 line joins the floating Death box while its block is out of view.

```new
### UI-Q-v29-29 — ORDER FLOATING TODAY LINE
(User 2026-09-25; owner `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE.)
ORDER on a Day with two or more Gates at 360 / 390 / 412 and 1280: at the top, then scrolled to the offer rows.
- at the top the floating box holds the Death line only; scrolled past the `오늘` block it adds the same `오늘` line under a rule
- the two facts read apart (rule, its own `오늘` label); the counts equal the block's; nothing covers the offer controls
- the 오늘 line doubled while its block is on screen, merged into the Death sentence, or a count that differs from the block
```

## AMENDMENT — v2.9.2 H5: FINAL result seal stamp (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.2 H5): one seal bearing the Boss's name on a Final ending tape; the result sentence follows it.

```new
### UI-Q-v29-30 — FINAL RESULT SEAL STAMP
(User 2026-09-25, v2.9.2 H5; owner `UI_UX_v2.8.0.md` §FINAL RESULT — SEAL STAMP.)
A Final clear and a Final failure with 1-, 2- and 3-member parties, and a non-Final ending, at 390 and 1280, motion on and reduced motion.
- a Final ending shows exactly one seal with the Boss's name at the right of the headline; a non-Final ending shows none
- clear: 200 ms hold, 2 × → 1 × in 90 ms, the tape gives 6 px; failure: 1.6 ×, 3 px, faint, crooked, partly printed
- the headline and reason appear after the landing and never sit under the seal; no word breaks mid-word
- one landing cue (`sealwin` / `sealfail`) on the landing frame; the `final` cue plays once
- under reduced motion the end state (seal, text, ink strength) is identical
- a seal per member, the NIGHT death tape on a failure, a seal covering the headline, or a failure seal as crisp as a clear
```

## AMENDMENT — v2.9.2 H1: only a turned-away Death reverses (User decision 2026-09-25)

User 2026-09-25: the reversal overstamp also covers a Death 만반의 준비 turned away; 강골 / 구급키트 never reverse. Superseded declarations were removed in place.

```new
- a reversal prints the turned-away Outcome (`사망` / `중상`) first, then `생환` overstamps it; the Insurance proof lines appear on that frame; a Death 만반의 준비 turned away prints `사망` and its own 부상 / 중상 overstamps it (User 2026-09-25)
- a stamp on a death, two stamps on a 대성공, a reversal on 강골 / 구급키트 results, a ring, flash, shake or particle
```

## AMENDMENT — v2.9.2 H2 SALE counter feel (User 2026-09-25)

User 2026-09-25 (v2.9.2 H2, PRESENTATION §GAME FEEL BEAT H2): UI-Q-v29-31 is added. Nothing is dropped.

```new
### UI-Q-v29-31 — SALE COUNTER FEEL

(User 2026-09-25, v2.9.2 H2; owner `UI_UX_v2.8.0.md` §SALE — COUNTER TRAY, COUNTER FEEL.)

SETUP:
SALE at 390 and 1280, motion on and reduced motion: one sale each at 50% / 정가 / 150% and one refused 정가, the tray unfolded; frames at 0 / 60 / 120 / 200 / 320 ms.

PASS:
- the pressed key moves 3px down and back within 120 ms; on a sale the pressed tray is visible for that press only and takes no input
- the A8 stub starts at the key landing (60 ms) and is settled by 260 ms; no stub on a refusal
- the refused key is pressed and shakes once where it locks
- the first coin tick is louder; 바가지's ticks start 40 ms later with a lower first tick; the counts stay 1 / 2 / 3
- a fifth sale looks and sounds exactly like the first
- under reduced motion the end state (tray cleared, stub text, Gold, Bag) is identical

FAIL:
- a second press on the 정가 key, a pressed tray that answers a tap, a stub before the key lands, any escalation with the sale count
```

## AMENDMENT — v2.9.2 H3 ORDER confirm (User 2026-09-25)

User 2026-09-25 (v2.9.2 H3, PRESENTATION §GAME FEEL BEAT H3): UI-Q-v29-32 is added. Nothing is dropped.

```new
### UI-Q-v29-32 — ORDER CONFIRM CASCADE

(User 2026-09-25, v2.9.2 H3; owner `UI_UX_v2.8.0.md` §ORDER — WAREHOUSE DISCLOSURE, ORDER CONFIRM.)

SETUP:
ORDER at 390 and 1280, motion on and reduced motion: 발주 확정 with 1 / 3 / 6 SKUs in the cart, the warehouse list open, and with 3 SKUs folded; frames at 0 / 45 / 90 / 160 / 230 / 320 / 400 ms.

PASS:
- one crate per ordered SKU lands on its own row; the last landing is within 320 ms at every SKU count
- each count moves once, prior -> resolved, on its crate's landing; a new SKU's row arrives with its crate
- the summary `N / M칸` · `N종` and the register's 창고 잔여 칸 move together on the last landing; folded, only they move
- at most three audible hits; 보유 골드 counts down to the resolved value in 220 ms
- under reduced motion the end state (counts, summary, till) is identical

FAIL:
- a crate per unit, a count that ticks up unit by unit, a cascade longer than 320 ms, a fourth audible hit, a changed `발주 완료.` line
```

## AMENDMENT — v2.9.2 H4 CLOSING receipt stamp (User 2026-09-25)

User 2026-09-25 (v2.9.2 H4, PRESENTATION §GAME FEEL BEAT H4): UI-Q-v29-33 is added. Nothing is dropped.

```new
### UI-Q-v29-33 — CLOSING RECEIPT STAMP

(User 2026-09-25, v2.9.2 H4; owner `UI_UX_v2.8.0.md` §CLOSING — RECEIPT STAMP.)

SETUP:
CLOSING at 390 and 1280, motion on and reduced motion, one Day ending in profit and one in loss; the sequence
`마감으로` -> receipt printing -> `다음 날`; the END settlement (`점포 자본 정산`) on an account whose prior Store
Capital sits below at least one Decoration price and a Run that carries it past one or more; frames through the
stamp landing and through the settlement count.

PASS:
- every receipt row is on screen together within 200 ms behind one printer tick; nothing prints row by row
- no `어제보다 +N` line anywhere on the receipt
- the END `현재 점포 자본` row counts from the account's prior total to the resolved one in 320 ms, with one `ui`
  click for each Decoration price it passes; a count that crosses no price plays none

FAIL:
- a tick per receipt row, a second stamp anywhere on the receipt, a profit and a loss reading the same colour, a
  click that fires off a hardcoded price rather than the current Decoration price list, or a settlement figure
  that differs between motion and reduced motion
```

## AMENDMENT — v2.9.2 H6 FINAL boss reveal entry (User 2026-09-25)

User 2026-09-25 (v2.9.2 H6, PRESENTATION §GAME FEEL BEAT H6): UI-Q-v29-34 is added. Nothing is dropped.

```new
### UI-Q-v29-34 — FINAL BOSS REVEAL ENTRY

(User 2026-09-25, v2.9.2 H6; owner `UI_UX_v2.8.0.md` §FINAL — BOSS REVEAL ENTRY.)

SETUP:
D29's CLOSING receipt through to D30's FINAL screen (the real `다음 날` press) at 390 and 1280, motion
on and reduced motion; frames through the entry.

PASS:
- the `.gate-zero` boss art and name plate settle in together as one movement: translateY 10px -> 0,
  opacity 0 -> 1, 220 ms, outQuad
- nothing else on the screen moves (the threat board, the last-order form and the dock are unaffected)
- no new sound and no new copy; the existing entry into FINAL is otherwise unchanged
- under reduced motion the block is present at full opacity with no motion, and the end state matches
  the motion-on settled state exactly

FAIL:
- a staggered or multi-part reveal, any motion outside `.gate-zero`, a hold before the movement starts,
  a new sound or line, or a settled end state that differs between motion and reduced motion
```

## AMENDMENT — Boss reveal after MORNING lands (User 2026-09-26)

User 2026-09-26 (the DAY 0 -> DAY 1 overlap the H6 capture reported, fixed on the User's instruction): UI-Q-v29-35 is new. Nothing is dropped.

```new
### UI-Q-v29-35 — BOSS REVEAL AFTER MORNING LANDS

(User 2026-09-26; owner `UI_UX_v2.8.0.md` §BOSS REVEAL — MORNING LANDS FIRST.)

SETUP:
DAY 0 첫 점포지원 -> 구매 -> DAY 1 MORNING at 390 and 1280, motion on and reduced motion; frames at 120 ms and 600 ms after
the press.

PASS:
- motion on: at 120 ms MORNING is on screen with no modal; by 600 ms the `마왕 조사 개시` dossier is open
- reduced motion: the dossier is open at 120 ms
- the dossier, its copy and its `확인` are unchanged; after `확인` the Day continues exactly as before
- no Event or Relic window opens during the hold
- MORNING takes no input during the hold: a tap on `문 열기` (or the menu) in it does nothing, and the Day is still MORNING
  when the dossier opens

FAIL:
- the dossier opening in the same frame as the MORNING cut with motion on, a hold under reduced motion, a lost or repeated
  reveal, a Day that advances during the hold, or any new motion, sound or copy
```

## AMENDMENT — build marker (User 2026-09-26, v2.9.3)

User 2026-09-26: UI-Q-v29-36 is new. Nothing is dropped.

```new
### UI-Q-v29-36 — BUILD MARKER

(User 2026-09-26; owner `UI_UX_v2.8.0.md` §BUILD MARKER.)

PASS:
- the opening screen shows `v{version} · {commit}` (the CHANGELOG head version) small and muted in its top-left corner at 360 / 390 / 1280, clear of the title,
  the menu button and the preparation panel
- no other screen shows it
- the console prints `GUILD24 v{version} · {commit}` once on load and `Guild24.build` returns the same pair
- the deployed site reads the deployed commit; a local build reads `dev`

FAIL:
- the marker overlapping or pushing the title, taking input, or appearing during a Run; a deployed build still reading `dev`
```

## AMENDMENT — ORDER coach step id (2026-09-26, IMPLEMENTATION BUG fix)

The ORDER `gates` coach line declared above is edited in place to name its own step id. Nothing is dropped.

## AMENDMENT — replay nudge (User 2026-09-26, v2.9.4)

User 2026-09-26: UI-Q-v29-37 is new. Nothing is dropped.

```new
### UI-Q-v29-37 — REPLAY NUDGE
(User 2026-09-26, v2.9.4; owner `UI_UX_v2.8.0.md` §END — REPLAY NUDGE / §Pre-Run Decoration empty-slot interaction; META §BEST DAY.)
- a Run that reached D10 / D14 for the first time on the account lists that product in `본사 해금` on END, beside any
distinct-Boss unlock; the Day toast still fires once; a later Run that reaches D10 again lists nothing
- with no unlock, a settlement that crosses an unowned Decoration's price prints `점포 자본으로 새 장식을 들일 수 있다.`;
capital that was already above that price, or an owned Decoration's price, prints nothing
- with neither, a Run that beats the account's best Day prints `지금까지 가장 오래 버틴 점포다 · DAY {N}`; a tie, the
account's first ending and a manual 현재 지점 포기 print nothing and a manual abandon never moves the best Day
- at most one of the two lines, never beside `본사 해금`; a reload of the ended Run prints the same line
- 새 점포 준비: exactly the Slot rows with an affordable unowned Decoration carry `들일 수 있음`
- no new motion, sound, screen or button
- a Decoration named, a list of goals, a remaining-count, a second line, a line on an abandoned Run, or a mark on a Slot
whose unowned Decorations cost more than the capital
```

## AMENDMENT — SALE strain line (User 2026-09-26, v2.9.5)

User 2026-09-26: UI-Q-v29-38 is new. Nothing is dropped.

```new
### UI-Q-v29-38 — SALE STRAIN LINE
(User 2026-09-26, v2.9.5; owner `UI_UX_v2.8.0.md` §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT; COPY_AUDIT §4-25.)
- a customer departing injured with an injured-departure chain of {n} >= 1 shows exactly one `연속 부상 출발 {n}회` line directly
under the readout `.top`, at 390 and 1280, with the same {n} as the NPC detail row
- a healthy customer (whatever chain their records hold) and an injured customer with no chain show no line
- the readout `.top` still shows exactly the two cells; the line is small and muted, one line, no `?`
- `node tools/qa-strain-line.cjs` (in qa:runtime)
- a %, a verdict word, a second line, a `?`, or the line on a healthy or first-injured customer
```

## AMENDMENT — Monster Knowledge leaves the codex (User 2026-09-26, v2.9.6)

User 2026-09-26: every Gate's Hazards are public, so the codex `몬스터 지식` tab is retired and no screen shows Monster Knowledge; the account record stays. The progress-wording lines below are dropped as superseded.

```text
Open Monster Knowledge/Codex with progress.
Progress label is:
`보급 생환 N회`
Old `관찰 N회` progress wording is absent.
```

```new
(User 2026-09-26, v2.9.6; owner `UI_UX_v2.8.0.md` §META UI.)
- the codex tabs are 진행도 · 상품 · 직업 · 점포지원 · 점포 장식; no `몬스터 지식` tab, and no `보급 생환 N회` / `관찰 N회` progress line on any screen
```

## AMENDMENT — ORDER price tags (User 2026-09-26, v2.9.6)

User 2026-09-26: UI-Q-v29-39 is new. Nothing is dropped.

```new
### UI-Q-v29-39 — ORDER PRICE TAGS
(User 2026-09-26, v2.9.6; owner `UI_UX_v2.8.0.md` §ORDER — ITEM INFORMATION HIERARCHY; COPY_AUDIT §4-26.)
- every offer row shows two tags at the end of the name row: `매입 {N}G` (the offer's price, including today's Event multiplier) and,
under it, a smaller muted `판매 {N}G`; at 360 / 390 / 1280 neither clips, overlaps the name or leaves the paper
- the metadata line starts `수익 +{N}G` and carries no `매입`
- the ORDER total, the cart and the purchase are unchanged
- an unlabelled price, the sale price in the larger tag, or `매입` still in the metadata line
```

## AMENDMENT — closing cash-flow receipt (User 2026-09-26, v2.9.7)

User 2026-09-26: the Closing receipt reads as the Day's cash (opening Gold, the Gold that moved, closing Gold with the change, stock / waste counts, tomorrow's operating estimate) instead of an income statement; the stamped row is 오늘 끝. Lines declared earlier and now superseded are removed from their fences above. The superseded chain lines below are dropped.

```text
Economic result is visually primary:
revenue/COGS/margin/overhead/waste/relic/final Gold
```

```new
Economic result is visually primary (v2.9.7 cash-flow receipt):
```

## AMENDMENT — closing change row (User 2026-09-26, v2.9.7)

The Day's change prints as its own 오늘 변화 row under 오늘 끝. Lines declared earlier and now superseded are removed from their fences above.

```new
```

## AMENDMENT — v2.9.7 CLOSING labels (User 2026-09-26)

User 2026-09-26: the cash-flow receipt's labels become 영업 전 자금 / 보유 자금 / 영업 손익; the stamp sits on 보유 자금, only 영업 손익 is coloured (green / red, gold at 0); 창고 재고 and 오늘 폐기 take separate lines and the waste line names the Items. Lines declared earlier and now superseded are removed from their fences above.

```new
- only the `보유 자금` figure (the purse box; the `영업 손익` row until v2.9.7) stamps: 100 ms hold, then the NIGHT stamp's 90 ms fall, the tape gives 4 px and settles
- the `영업 손익` figure is green on a profit, red on a loss, gold at 0, and reduced motion shows the same row, colour and figures at once
영업 전 자금 -> 매출 / 발주 / 운영비 (+ other moved rows) -> 보유 자금 box (stamped) with 영업 손익 ±N (green / red, gold at 0);
창고 재고 and 오늘 폐기 on separate lines, 오늘 폐기 naming up to three Items (×n from two) then 외 N종; 내일 운영비 예상 (not on DAY 29);
no 판매 원가 / 판매 마진 / 폐기 원가 row; 영업 전 자금 + ins - outs = 보유 자금 exactly; no page scroll at 390 x 780
```

## AMENDMENT — v2.9.7 SALE shelf order by kind (User 2026-09-26)

User 2026-09-26: the SALE shelf sorts by kind (대응 장비, 음식, 음료, 포션, 보험, 특수), then nearest discard, then higher Rarity, held for the Day. Lines declared earlier and now superseded are removed from their fences above.

```new
- the shelf rows are ordered by kind (대응 장비 -> 음식 -> 음료 -> 포션 -> 보험 -> 특수), then days left before discard, nearest first, then higher Rarity; ties keep the existing order; the order is identical for both customers (v2.9.7)
- selling units, including the last unit of an Item's oldest batch, moves no other row within the Day; a sold-out row leaves; the next Day sorts afresh (v2.9.7)
```
