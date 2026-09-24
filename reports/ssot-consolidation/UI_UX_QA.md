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
### UI-Q101 — MORNING NEXT-DAY GATE FORECAST
### UI-Q09 — TIER FORECAST VISIBILITY
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
### UI-Q39 — MONSTER KNOWLEDGE PROGRESS COPY
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
- values match `DUNGEON_HAZARD_v2.8.0.md` / `ECONOMY_ORDER_v2.8.0.md`
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
UI matches META_v2.8.0.md and does not resurrect legacy progression truth.
Test all current fresh-init paths owned by `CORE_RUN_v2.8.0.md`.
```

## REWORD — UI-Q109 Bag: dead `stacked vertically` clause trimmed (UI_UX_v2.8.0 §Bag: the two slot boxes never stack vertically; kept UI-Q-v28-4)

```text
- Bag is exactly two slots, stacked vertically in the upper-right and each is ~44px touch class or larger
```

```new
- Bag is exactly two slots on the counter beside the customer and each is ~44px touch class or larger (User 2026-09-24, v2.9.0)
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
- current/departure Fatigue readable as `피로 A -> 출발 B`; no `보급 X / 필요 Y` cell
- main label is 귀환 후 피로, with ` · {band}` from Fatigue 20 up
- detailed path available on demand; the recovery row is `음식·음료로 -N`, never `남은 보급으로`
- actual Food/Drink preRecovery/outcome buffer use can be read when relevant
- Counter / 피로 회복 / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
Tutorial explains Stat pressure / Counter contribution / readiness and one Supply/Fatigue fact: Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신.
```

## AMENDMENT — v2.9.0 transaction beat / SALE at a glance (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the SALE readout shows two cells (전투 전망 / 환경 대응) with two `?`, and the exact `실패 시 사망 위험 {N}%` moves into the second line of the 전투 전망 help and the NPC detail; the price buttons carry the role words (`할인 50%` / `정가` / `바가지 150%` with `이익 {N}G`); the Bag slots sit on the counter beside the customer; the purchase / refusal reply line stays 5 seconds while the greeting keeps 3; the transaction beats, Stat grid pressure tag, matching-effect emphasis and one delta list (no outlook delta rows; C3 corrected) get UI-Q-v29-3 … UI-Q-v29-9. UI-Q13 / Q87 / Q107 / Q109 / Q110 / Q-v28-7 / Q-v28-30 expectations are rewritten under the same ids. Declared-new line edited in place above: the UI-Q109 Bag line (now `on the counter beside the customer`).

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
- the slots sit on the counter beside the customer (User 2026-09-24, v2.9.0)
### UI-Q-v29-3 — TRANSACTION BEAT
One ordinary SALE customer at 390 and 1280: one successful price commit, one refusal, one `손님 보내기`; repeat the same flow under `prefers-reduced-motion`.
Every beat is presentation only, each ≤ 320 ms, one sale's beats total < 600 ms, input is never blocked, and the scroll position stays on the same customer.
- frame captures at 0 / 150 / 300 / 600 ms of the sale show the Item icon travelling from its shelf row to the customer's Bag slot on the counter (260~320 ms), the slot settling (scale 1.05 -> 1, 240 ms), the dock Gold counting to its new value, and the changed Stat cells pulsing once (300 ms) and keeping the new value; the `판매 후 변화` rows do not vanish
- purchase: the customer figure nods (translateY 4px, 180 ms x 2); refusal: it shakes its head (translateX ±4px, the existing bubble-shake timing) and the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text
- the reply line (buy / refuse) stays 5 seconds; the greeting keeps 3 seconds
- `손님 보내기`: the current customer exits left (240 ms), the next arrives with the existing entry (240~340 ms), and `depart` plays a recorded utility cue (door / step family); entry may still start the view at the top
- 50% / 100% / 150% share one register sound family and differ only by coin ticks (1 / 2 / 3); no mode sounds like the correct answer
- under reduced motion the same flow completes instantly with an identical end state (Gold, Bag, Stat values, lock state, reply line)
- no beat adds information the resolved state does not already hold; no Save field, no Gameplay RNG draw
- input is blocked during a beat, or one sale's beats total 600 ms or more
- the view scrolls away from the current customer during a beat
### UI-Q-v29-4 — BAG ON THE COUNTER
SALE at 390 and 1280, before and after one sale.
- a thin counter band sits under the customer on every width
- the two Bag slots sit on the counter beside the customer, not under the status line
- the slots remain the handling surface: focus / replace / remove and tap-only completion work as in UI-Q87; no third ghost slot
### UI-Q-v29-5 — STAT GRID PRESSURE TAG
Customers whose Gate presses one Stat through one Hazard, one Stat through two Hazards, and a Stat the Gate does not press.
- under a pressed Stat cell a small tag shows the pressing Hazard icon + name only (e.g. `냉기`; two Hazards joined as `독 · 속박`)
- the tag sits under the Stat that Hazard actually presses (강인함 / 기동 / 정신 per `DUNGEON_HAZARD_v2.8.0.md`)
- 투력 never carries a tag
- an unpressed Stat carries no tag
- the tag carries no number and no verdict word
### UI-Q-v29-6 — MATCHING-EFFECT EMPHASIS
SALE shelf holding an Item that counters one of the customer's Gate Hazards, an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.
- only the effect text that is a Counter for one of the Gate's Hazards, or the Core Stat one of its Hazards presses, is set in the emphasis style (bold, ink colour)
- every other effect text keeps the default style
- no badge, no verdict word, no row reorder
- ORDER offer rows follow the same rule against today's Gate once the D-4 batch adopts it
### UI-Q-v29-7 — ONE DELTA LIST
Select an Item that changes a Stat and releases a Fatigue band; then an Item that changes a Stat only; then commit one of them.
- `판매 후 변화` is one list of what changes: direct Stat rows (`강인함 17 → 23`), derived rows (`피로 완화`) and the §4-17 line `피로 {A} → 출발 {B}`
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
- future customer individual identity / individual destination remains hidden; the per-Gate visitor count is public at MORNING and ORDER (User 2026-09-24, v2.9.0)
- no today-fit/recommended badge or verdict word; the UI-Q-v29-12 typographic emphasis of existing effect text is not a badge (User 2026-09-24, v2.9.0)
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
- `gates` highlights the ORDER 오늘 brief block and reads `오늘 열린 게이트와 위험. 위험 보기를 누르면 무엇으로 막는지 나온다.`
- `offer` highlights the first offer row and reads `후보 상품의 효과. 오늘 위험에 맞는 효과는 굵게 보인다.`
- `quantity` / `confirm` / `reroll` keep their approved lines (COPY_AUDIT §3-7 QUANTITY / §3-2 / COPY_WORLD_VOICE §TUTORIAL COACH COPY); `reroll` is last
- no `gold` mark: `#order-register` carries no coach step
- every step passes UI-Q-v28-27 target truth
- a step reads 보유 골드, or the register is the first target
### UI-Q-v29-12 — ORDER TODAY-FIT EMPHASIS
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
- the briefing shows header `마왕 조사 개시`, the unchanged lead line, exactly `DAY 5에 첫 조사 보고로 토벌 대상이 공개된다. 이후 5일마다 이어진다.` / `DAY 30에 성장한 모험가 최대 3명을 마왕성으로 보내 최종 토벌에 나선다.`, and the unchanged button
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
