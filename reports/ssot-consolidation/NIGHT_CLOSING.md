# NIGHT_CLOSING consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/NIGHT_CLOSING_v2.8.0.md
CHAIN=design_ssot/NIGHT_CLOSING_v2.8.0.md,design_ssot/history/NIGHT_CLOSING_v2.7.0.md,design_ssot/history/NIGHT_CLOSING_v2.6.1.md,design_ssot/history/NIGHT_CLOSING_v2.6.0.md

Current-spec consolidation. The pre-consolidation owner is kept whole as
`design_ssot/history/NIGHT_CLOSING_v2.8.0-patch.md`; v2.6.0 / v2.6.1 / v2.7.0 stay in `history/`.

Layout: one `##` section per topic, `###` for subsections. Order: KEY, ROLE, NIGHT FLOW, NIGHT
CONTROLS, SKIP CONTRACT, SAVE / RESUME, RESULT STRUCTURE, RESULT INFORMATION HIERARCHY, RESULT
OUTCOMES, OUTCOME SENTENCE VS PLAYER CAUSE, HERO ITEM FEEDBACK, ITEM / TRAIT IMPACT, CAUSALITY RULE
(+ RUNTIME CAUSALITY), INSURANCE CAUSALITY (+ FIRST AID KIT AFTERCARE), RETREAT, INJURY / SEVERE
INJURY (+ INJURY RESULT, ORDINARY INJURY RESULT CONTINUITY), DEATH, FATIGUE RESULT (+ RESULT FATIGUE
FIELDS), GREAT SUCCESS / DEEP EXPEDITION RESULT, GROWTH PRESENTATION, LOOT (+ NPC WALLET), RECENT
EXPEDITION SNAPSHOT WRITE, LIVING NPC REACTION, RESULT PRESENTATION ROUTING, RARE ACCIDENT COPY, DEBUG
LANGUAGE, COPY TONE, PRESENTATION DATA BOUNDARY, CLOSING (+ ECONOMICS-ONLY), NIGHT vs CLOSING, D30 /
FINAL, ACCEPTANCE (runtime path, Great Success / Deep result checks, QA owner files), RELATED.
The v2.6.0 `KEY` / `ROLE` / ... sections are all `##` already. Header keys `BASE_DOCUMENT=` /
`PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

The v2.7 note that the v2.6.1 Outcome-Fatigue table is superseded goes with the table (see
SUPERSEDED below); numeric Outcome-Fatigue truth is pointed at `DUNGEON_HAZARD_v2.8.0.md` in RESULT
FATIGUE FIELDS (`Exact arithmetic -> ...`) and FATIGUE RESULT.

```text
## INHERITANCE
All unchanged result resolution, Closing economics, Injury/Aftercare truth, recent snapshot and
proof-only causality rules inherit NIGHT_CLOSING_v2.7.0.md.
## INHERITANCE
All unchanged Night controls, result sequencing, Closing, Wallet terminology, result-proof causality boundary, and presentation-data boundary inherit `NIGHT_CLOSING_v2.6.1.md`.
This patch updates v2.7 Fatigue/Supply result truth, Item Aftercare proof, recent-expedition snapshot output, and persistent-Injury continuity.
The v2.6.1 `성공/대성공 +2, 퇴각 +3, 부상 +4` Outcome-Fatigue table is superseded.
Current numeric Outcome-Fatigue truth is owned only by `DUNGEON_HAZARD_v2.7.0.md`.
Do not keep the v2.6.1 table as an alternate live expectation.
## INHERITANCE
All unchanged Night/Closing behavior inherits `NIGHT_CLOSING_v2.6.0.md`.
This patch overrides stale three-control text and tightens Runtime result truth.
```

## LEGACY — v2.6.0 update summary (each item is stated in its own section)

`UI Flow` -> NIGHT CONTROLS — EXACT (`다음` / `전체 건너뛰기`); `Result 표시` -> FATIGUE RESULT (one settled
value, v2.8 surface), INJURY RESULT (`injury=2`: no Stat penalty, remaining recovery duration), NPC
WALLET RESULT TERMINOLOGY (`NPC 소지금 획득`); `Runtime Causality` -> RUNTIME CAUSALITY.

```text
## v2.6.0 UPDATE: NIGHT RESULT
- **UI Flow**: 다음, 전체 건너뛰기 만 유지.
- **Result 표시**: 원정 fatigue gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, NPC 소지금 획득 (구 전리품).
- **Runtime Causality**: Item/Trait이 실제로 결과를 방지/완화/변경한 판정 근거가 있을 때만 원인으로 표시 (단순 보유 여부 표출 금지).
```

## LEGACY — causality version framing

The rule itself is kept verbatim in RUNTIME CAUSALITY: `Player-facing cause text requires runtime proof ...`.

```text
## CAUSALITY — UNCHANGED STANDARD
The v2.6.1 rule remains authoritative:
```

## LEGACY — duplicate net-Fatigue labelling rule

Kept once in its v2.7 form under FATIGUE RESULT: `- actual Outcome Fatigue gain must not be confused
with net Fatigue delta`.

```text
Do not label `netFatigueDelta` as the expedition outcome fatigue gain.
```

## SUPERSEDED — v2.6.0 three-control list (다음 / Skip / Skip All)

Replaced by NIGHT CONTROLS — EXACT (`다음` / `전체 건너뛰기`; single-result `건너뛰기` removed).

```text
Player controls:
- 다음
- Skip
- Skip All
```

## SUPERSEDED — v2.6.1 Fatigue field set, exposure list and Outcome-Fatigue table

Replaced by the v2.7 field set (`preRecovery` / `remainingSupplyBuffer` / `outcomeBufferUsed` ... and
`Do not reuse fatigueRecovery ...`), the v2.8 player surface (`귀환 후 피로 N`, expansion on demand) and
the numeric owner `DUNGEON_HAZARD_v2.8.0.md` (v2.7 explicitly retired the `성공/대성공 +2, 퇴각 +3, 부상
+4` table as an alternate live expectation).

```text
## RESULT FATIGUE FIELDS
Result/runtime/QA must distinguish:
fatigueRecovery
effectiveFatigue
Player-facing result must expose at least:
- fatigueRecovery when nonzero/relevant
- actualOutcomeFatigueGain
- finalFatigue
Outcome baseline:
성공 +2
대성공 +2
퇴각 +3
부상 +4
중상 0
사망 0
```

## SUPERSEDED — v2.7 player-facing Fatigue example and labels

Replaced by FATIGUE RESULT (`귀환 후 피로 11` / on-demand `출발 8 · 원정에서 +5 · 남은 보급으로 -2 -> 귀환
후 11`); the labels `보급 회복` / `보급 완화` / `원정 결과 +N` / `밤 피로` are on its removed-label list. The
v2.7 rules under that heading (`Show the actual resolved path ...`, `omit zero-value subrows ...`, net
delta, Severe Injury / Death gain 0) are kept in FATIGUE RESULT.

```text
## PLAYER-FACING FATIGUE RESULT
피로 2 -> 출발 0 · 보급 회복 -2
원정 결과 +5 · 보급 완화 -3
밤 피로 2
```

## SUPERSEDED — optional Closing `오늘의 보급 영향` summary

Replaced by CLOSING ECONOMICS-ONLY — EXACT (`Remove the current block headed: 오늘의 보급 영향`; NIGHT is
the owner surface for expedition causality).

```text
## CLOSING SUMMARY
Optional compact section:
`오늘의 보급 영향`
Include only actual meaningful causal contributions.
- 해독제 1 → 독 피해 감소에 기여
- 귀환석 1 → 퇴각에 기여
Do not force every sold Item into this summary.
A sale with no meaningful expedition impact may simply be absent.
```

## REWORD — KEY controls: removed single-result SKIP trimmed (v2.6.1 NIGHT CONTROLS — EXACT)

```text
controls=[NEXT,SKIP,SKIP_ALL]
```

```new
controls=[NEXT,SKIP_ALL]
```

## REWORD — SKIP CONTRACT: removed single-result Skip trimmed

```text
Skip/Skip All must not change:
```

```new
Skip All must not change:
```

## REWORD — version framing removed, live rule kept

`it no longer changes` -> `it does not change` (v2.8 narration of the old type-size rule); `v2.7 adds new
provable contribution types for:` -> merged into RUNTIME CAUSALITY after the v2.6.1 proof list; `It does
not add ...` (subject was "v2.7") -> imperative; Severe Injury / Death Fatigue owner named.

```text
copy and tone only. The three-volume rank remains a presentation weight rule, but it no longer
v2.7 adds new provable contribution types for:
It does not add system-authored failure diagnosis such as `전투 부족`, `독 대응 부족`, or `부상 때문에 사망` when exact causality is not proven.
- Severe Injury / Death actual result Fatigue gain is 0 under the v2.7 owner rule
```

```new
copy and tone only. The three-volume rank remains a presentation weight rule, but it does not
Provable contribution types also include:
Do not add system-authored failure diagnosis such as `전투 부족`, `독 대응 부족`, or `부상 때문에 사망` when exact causality is not proven.
- Severe Injury / Death actual result Fatigue gain is 0 under the `DUNGEON_HAZARD_v2.8.0.md` owner rule
```

## REWORD — section headings without version tags / merged into one topic section

`## CLOSING ROLE` and `## CLOSING ECONOMICS-ONLY — EXACT` merge into `## CLOSING`; the v2.6.1 / v2.7 /
v2.6.0-amendment topic headings become subsections of their topic; `## QA` becomes `## ACCEPTANCE`
with the v2.6.1 runtime path, the embedded Great Success / Deep result checks and the QA owner files.

```text
## FATIGUE RESULT — SUPERSEDES v2.7 PLAYER LABELS
## RESULT PRESENTATION ROUTING — v2.8 POLISH
## CLOSING ECONOMICS-ONLY — EXACT
## RESULT FATIGUE FIELDS — v2.7
## ORDINARY INJURY RESULT CONTINUITY — v2.7
## FIRST AID KIT AFTERCARE — RESULT TRUTH
## INJURY RESULT
## NPC WALLET RESULT TERMINOLOGY
## RUNTIME CAUSALITY
## RUNTIME ACCEPTANCE
## CLOSING ROLE
## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION RESULT
## QA
```

```new
## FATIGUE RESULT
### RESULT FATIGUE FIELDS
## RESULT PRESENTATION ROUTING
### CLOSING ECONOMICS-ONLY — EXACT
### ORDINARY INJURY RESULT CONTINUITY
### FIRST AID KIT AFTERCARE — RESULT TRUTH
### INJURY RESULT
### NPC WALLET RESULT TERMINOLOGY
### RUNTIME CAUSALITY
### RUNTIME ACCEPTANCE
## GREAT SUCCESS / DEEP EXPEDITION RESULT
## ACCEPTANCE
### RESULT ACCEPTANCE
### QA OWNERS
```

## REWORD — cross-owner pointers name the current owner file

```text
Exact arithmetic -> `DUNGEON_HAZARD_v2.7.0.md`.
Natural ordinary-Injury recovery is owned by `NPC_TRAIT_v2.7.0.md`.
Insurance resolution order/effect -> `ITEM_v2.7.0.md`.
After an expedition result is fully resolved, write the latest snapshot owned by `NPC_TRAIT_v2.7.0.md` using:
-> ITEM
-> NPC_TRAIT
-> CORE_RUN
-> NPC_TRAIT
-> DUNGEON_HAZARD
-> ECONOMY_ORDER
Boss identity/trait/Sloth state is owned by BOSS; Closing does not mutate it.
-> FINAL_EXPEDITION
```

```new
Exact arithmetic -> `DUNGEON_HAZARD_v2.8.0.md`.
Natural ordinary-Injury recovery is owned by `NPC_TRAIT_v2.8.0.md`.
Insurance resolution order/effect -> `ITEM_v2.8.0.md`.
After an expedition result is fully resolved, write the latest snapshot owned by `NPC_TRAIT_v2.8.0.md` using:
-> ITEM_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md
-> CORE_RUN_v2.8.0.md
-> DUNGEON_HAZARD_v2.8.0.md
-> ECONOMY_ORDER_v2.8.0.md
Boss identity/trait/Sloth state is owned by `BOSS_v2.8.0.md`; Closing does not mutate it.
-> FINAL_EXPEDITION_v2.8.0.md
```

## REWORD — QA owner files: v2.5 names -> current v2.8 QA files

```text
- CORE_RUN_QA_v2.5.0.md
- DUNGEON_ITEM_QA_v2.5.0.md
- NPC_TRAIT_QA_v2.5.0.md
- ECONOMY_ORDER_QA_v2.5.0.md
- UI_UX_QA_v2.5.0.md
```

```new
- CORE_RUN_QA_v2.8.0.md
- DUNGEON_ITEM_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md
```

## REWORD — RELATED: v2.6.0 and v2.7 lists merged, current owner files

```text
game philosophy -> 00_GAME_CORE
run/save -> CORE_RUN
final expedition -> FINAL_EXPEDITION
npc condition/growth -> NPC_TRAIT
hazard causality -> DUNGEON_HAZARD
item/insurance -> ITEM
economy/settlement -> ECONOMY_ORDER
sale commitments -> SALE
presentation -> UI_UX
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.7.0.md`
Injury natural recovery/re-expedition state -> `NPC_TRAIT_v2.7.0.md`
Insurance/Aftercare -> `ITEM_v2.7.0.md`
Recent snapshot -> `NPC_TRAIT_v2.7.0.md`
Sale revisit display -> `SALE_v2.7.0.md`
UI -> `UI_UX_v2.7.0.md`
```

```new
game philosophy -> `00_GAME_CORE_v2.8.0.md`
run/save -> `CORE_RUN_v2.8.0.md`
final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
npc condition/growth, Injury natural recovery/re-expedition state, recent snapshot -> `NPC_TRAIT_v2.8.0.md`
hazard causality, Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
item/insurance/Aftercare -> `ITEM_v2.8.0.md`
economy/settlement -> `ECONOMY_ORDER_v2.8.0.md`
sale commitments, Sale revisit display -> `SALE_v2.8.0.md`
presentation / UI -> `UI_UX_v2.8.0.md`
```

## UNRESOLVED — kept verbatim, reported to the User

1. ITEM / TRAIT IMPACT `Good:` examples (`농축해독제 → 독 노출 크게 감소`, `귀환석 → 퇴각 가능성 확보`) read as
   risk-decrease claims, while HERO ITEM FEEDBACK bans vague Hero claims (`부식 위험 감소`) and says `A hidden
   risk decrease without a proven resolved difference is not Hero feedback.` The v2.8 rule does not say
   whether the non-Hero impact summary keeps this example style. `농축해독제` also names no Item in any
   current owner file.
2. CLOSING ROLE `Show at minimum:` (`총매출`, `매입/COGS`, `Margin`, `운영비`, `폐기`, `Relic 비용`, `최종 Gold`) and
   CLOSING ECONOMICS-ONLY `Closing keeps only economic/accounting results such as:` (`매출`, `판매 원가 / 마진`,
   ..., `점포지원 투자`, `보유 자금`) use different row names for the same concepts; v2.8 does not say it
   replaces the v2.6.0 minimum. Both kept.
3. NIGHT vs CLOSING `CLOSING owns: ... - compact cross-day takeaway` was written next to the now-removed
   `오늘의 보급 영향` summary; whether it still names a live Closing element is not stated. Kept.

## REWORD — grammar fix in a chain line (independent review)

```text
changes the Outcome, NPC name or summary type size. Exact size -> UI_UX_v2.8.0.md §NIGHT LAYOUT
```

```new
change the Outcome, NPC name or summary type size. Exact size -> UI_UX_v2.8.0.md §NIGHT LAYOUT
```

## REVIEW NOTES (independent review)

- Closing row lists: not a conflict (v2.8 "only … such as" limits the category; every v2.6 minimum
  row maps to a v2.8 row). Both kept.
- UNRESOLVED, reported to the User: ITEM / TRAIT IMPACT `Good:` examples (`독 노출 크게 감소`,
  `귀환석 → 퇴각 가능성 확보`) are unproven risk/potential claims against the v2.8 HERO ITEM
  FEEDBACK rule; no v2.8 text replaces the example list, so kept verbatim.
- UNRESOLVED, reported to the User: `CLOSING owns: … compact cross-day takeaway` has no live
  realisation after `오늘의 보급 영향` was removed.
- UNRESOLVED, reported to the User: ``Use: `NPC 소지금 획득` `` vs COPY_AUDIT §6-8 / ITEM / Source
  `원정 소지금 획득` (carried from the chain).
