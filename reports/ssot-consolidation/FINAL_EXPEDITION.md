# FINAL_EXPEDITION consolidation ledger

BASELINE=9e9c9d1
TARGET=design_ssot/FINAL_EXPEDITION_v2.8.0.md
CHAIN=design_ssot/FINAL_EXPEDITION_v2.8.0.md,design_ssot/history/FINAL_EXPEDITION_v2.5.0.md

Current-spec consolidation. The pre-consolidation owner is kept whole as
`design_ssot/history/FINAL_EXPEDITION_v2.8.0-patch.md`; the v2.5 base stays in `history/`.

Layout: one `##` section per topic, `###` for subsections, no numbered headings. Order: ROLE, FINAL
TARGET, D25 generation, D30 reuse, FAMILY DISCLOSURE, D30 PLAYER FLOW (party selection -> Final
preparation transfer -> forecast -> accounting -> Item boundary -> Result), FINAL PREP / LOCK / STOCK,
NPC PREPARATION (`prepare` stat calculation, headed so it is not confused with the Final preparation
transfer step), calculation order, Hazard threat / aggregation, Individual / Party Power, Final Roll,
Boss Clear, Run Clear / Failure, Insurance, Family-Pair audit, BALANCE QA, CURRENT FINAL ACCEPTANCE,
guardrail, cross-spec ownership, RELATED. The v2.5 `# 0.`..`# 10.` headings sit in the v2.5 header
region (before its first `##`), which the check does not count; their `##` forms here are declared
new. Header keys `BASE_DOCUMENT=` / `PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` /
`CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance / routing pointers (the base is now inline; every pointer names a v2.8 file)

```text
## INHERITANCE
All unchanged Final party size, survivor fallback, no class synergy, Final Roll, Boss-state input, one-resolution structure, and stock/lock boundaries inherit `FINAL_EXPEDITION_v2.5.0.md`.
Although this owner remains versioned v2.7, SPEC_INDEX_v2.8.0.md routes it as the current Final owner.
Any cross-system ownership reference below resolves to the current routed v2.8 owner unless this file
explicitly freezes a Final-specific v2.7 rule.
When this v2.7 owner is inherited by the current project SSOT, use the rules below only together with current routed overrides from `SPEC_INDEX_v2.8.0.md`.
Inherited cross-spec references to older versioned filenames are not routing authority.
```

## LEGACY — patch narration and exclusions from the inherited chain

Each exclusion is stated as a current rule in its section: `No D30 generation path may produce a
different Pair/Pool` (D30 — REUSE D25 STATE); `No standalone scale=4.6 path` (FINAL HAZARD THREAT,
FINAL-Q71); `No 환경피해 ×0.35 path contributes in parallel` (FINAL-Q72); the exact
`출전 NPC 선택 -> FINAL 준비 -> 결과` flow; `100% / 150% price choices are unavailable` / `no
purchase/refusal probability roll occurs` (Final preparation).

```text
This patch moves Family/Hazard disclosure to D25, replaces Final Hazard aggregation/power penalty, and makes D30 preparation reuse the familiar two-slot shop handling while overriding ordinary end-of-Run price negotiation/refusal.
Current Final exclusions from the inherited base chain:
- no D30 generation / first disclosure of the Final Family Pair
- no standalone `Final Hazard Scale = 4.6` formula
- no Individual Final Power path using `환경피해 × 0.35`
- no Final-preparation flow that skips the current preparation step
- no ordinary 50/100/150 Final price choice or Final refusal RNG
```

## LEGACY — version framing / provenance lines

The Final Roll value is kept as `Final Roll = 0.88 ~ 1.12`; the bare `0.88 ~ 1.12` block duplicated it.

```text
Current v2.8 override to the inherited party-size rule:
This supersedes the inherited `survivors >= 3 -> exactly 3` requirement.
`DIRECTOR DOCUMENT BASELINE`
`DIRECTOR DOCUMENT BASELINE` for the changed Hazard term; Core-Stat weights match the v2.7 Prepared-Power baseline.
Keep the inherited Final Roll:
0.88 ~ 1.12
기존 Final Roll을 유지한다.
```

## LEGACY — duplicate "Final Power stays internal" statements

Kept once, in INDIVIDUAL FINAL POWER: `Final Power remains internal; do not expose it as a new Player Stat.`

```text
Final Power remains internal and is not introduced as a Player-facing Stat.
- Final Power는 내부 계산값이며 별도 Player Stat으로 추가하지 않는다.
```

## LEGACY — v2.5 playtest / tuning status notes

The numbers are now fixed (mean-gap 1.70, Final Roll with `Do not retune it merely...`, Boss Power in
`BOSS_v2.8.0.md`); the check questions themselves are kept under BALANCE QA.

```text
Roll 범위는 현재 구조의 시작값이며
Full Run Playtest에서 체감 검증한다.
구조는 위 규칙으로 고정한다.
아래 항목의 Exact Numeric은 Full Run Playtest로 검증한다.
```

## SUPERSEDED — v2.5 D30 random Family selection / reveal

Replaced by D25 FINAL STATE GENERATION (select, read T2 Hazard keys, merge, persist, reveal on D25) and
D30 — REUSE D25 STATE (D30 generates / reveals nothing; Relic / SLOTH window resolves under the known state).

```text
Final 시작 시:
1. 서로 다른 기존 Dungeon Family 2개를 랜덤 선택한다.
2. 선택된 두 Family를 플레이어에게 공개한다.
3. Family 공개는 D30 Relic decision / Sloth Seal decision보다 먼저 이루어진다.
4. 공개 이후 Final 파티 선택 및 최종 준비가 가능하다.
5. 각 Family의 기존 T2 Hazard를 가져온다.
6. 두 Family의 T2 Hazard를 하나의 Final Hazard Pool로 합쳐 사용한다.
7. 선택된 Family 조합은 생성된 Final state이며 Save/Load로 다시 뽑히지 않는다.
```

## SUPERSEDED — v2.5 standalone Final Hazard Scale 4.6

Replaced by FINAL HAZARD THREAT (current Hazard Threat / defense / gap truth at Day 30 / T2, owned by
`DUNGEON_HAZARD_v2.8.0.md`; no standalone `scale=4.6` path). The ownership-list item goes with it.

```text
Final Hazard Pool의 Hazard severity는 D30의 기존 T2 산식에 따른다.
기존 산식:
scale = 1 + day × 0.10 + (tier - 1) × 0.6
D30 / T2:
1 + 30 × 0.10 + (2 - 1) × 0.6
= 4.6
따라서:
Final Hazard Scale = 4.6
- Final Hazard Scale 4.6
```

## SUPERSEDED — v2.5 survivor-count party table and its restated modifier lists

Replaced by `eligible >= 1 -> 1..min(3, eligible)` / `eligible == 0 -> Run Fail` (Final party
selection). The no-underfill-bonus / no-multiplier / no-forced-3 / no-auto-fill rules and the
"natural cost is lower summed Power" line are stated once in the v2.8 list there (the BALANCE QA
`우선 추가하지 않는 것` list repeated them). `maxParticipants = 3` is kept. The v2.5 `생존 NPC 0명`
Run Fail line is replaced by the single `eligible == 0 -> Run Fail` statement.

```text
Final 출전 인원 최대값:
생존 NPC 수에 따라:
survivors >= 3
→ 플레이어가 직접 정확히 3명 선택
survivors == 2
→ 2명으로 출전
survivors == 1
→ 1명으로 출전
survivors == 0
→ Run Fail
1~2인 출전에 별도의 보정이나 인원수 패널티를 추가하지 않는다.
적은 인원으로 인해 합산 Power가 낮아지는 것 자체가 자연스러운 불리함이다.
Final 전용:
- Underfill Bonus
- Person-count Multiplier
- 강제 최소 3인
- 부족 인원 자동 NPC 보충
을 추가하지 않는다.
생존 NPC 0명으로 Final에 진입하면 즉시 Run Fail이다.
우선 추가하지 않는 것:
- 인원수 전용 Bonus
- 인원수 전용 Penalty
- 강제 인원 보정 System
```

## SUPERSEDED — v2.5 `환경피해 × 0.35` Final Power term

Replaced by `- FinalMeanHazardGap × 1.70` (FINAL HAZARD AGGREGATION, INDIVIDUAL FINAL POWER,
FINAL-Q72 / Q73). The Core-Stat lines are kept via the current formula. The Prepare `환경피해` input,
its note, the playtest question and the guardrail "reuse existing Final Power Formula" item describe
the replaced formula.

```text
각 출전 NPC의 Final Power는 기존 v1 Final 공식을 재사용한다.
투력 × 0.50
- 환경피해 × 0.35
- `환경피해`는 Prepare가 Final Hazard Pool을 기준으로 계산한 값이다.
- Final Hazard Pool에 대한 환경피해 (`hazard`)
- `환경피해 × 0.35`가 실제로 두 T2 Family를 고려하게 만드는가?
- 기존 Final Power Formula
```

## SUPERSEDED — effective Boss Power left open for tuning

`BOSS_v2.8.0.md` now owns the values (WRATH effective Boss Power = 200 and the per-Boss modifiers).

```text
Full Run Balance 결과를 보고 조정한다.
effective Boss Power는 Full Run 결과를 보고 최종 튜닝한다.
```

## REWORD — Boss Power value pointer

```text
effective Boss Power exact numeric value는 현재 구조 확정값이 아니다.
```

```new
effective Boss Power exact numeric value -> `BOSS_v2.8.0.md`.
```

## REWORD — version tags removed

```text
v2.5 Boss Identity / Boss Trait / Sloth Seal state is owned by BOSS.
Therefore the following v2.7 Insurance Items have no Final effect:
```

```new
Boss Identity / Boss Trait / Sloth Seal state is owned by BOSS.
Therefore the following Insurance Items have no Final effect:
```

## REWORD — dead D30 disclosure anchor trimmed from the pre-Lock management window

Family disclosure is now D25, so "after D30 Family disclosure" is dead; the rest of the sentence and
the `포함:` list (incl. D30 Relic decision and other Final-relevant management choices, cf. RELIC D30
ORDER / Reroll / inventory preparation before Final Lock) are kept verbatim.

```text
D30 Family disclosure와 필요한 Boss/Sloth reveal 이후, Final lock 전에는 기존 Design SSOT가 허용하는 Final-relevant 준비를 완료할 수 있다.
```

```new
필요한 Boss/Sloth reveal 이후, Final lock 전에는 기존 Design SSOT가 허용하는 Final-relevant 준비를 완료할 수 있다.
```

## REWORD — headings: version tags / numbering removed, one level scheme

```text
### 1. Final party selection
### 2. Final preparation — fixed 50% / 매입가 transfer
### 2.1 Final subjugation forecast — party-wide
### 3. Final-specific Item boundary
### 4. Result
## FINAL HAZARD AGGREGATION — v2.7 BASELINE
## INDIVIDUAL FINAL POWER — v2.7
## FINAL ROLL — UNCHANGED
## v2.7 BALANCE QA
## A. HAZARD PRESSURE
## B. BOSS POWER
## C. 1~2인 PARTY
## D. FINAL ROLL 0.88~1.12
## E. TWO-FAMILY COMBINATION
## F. FINAL STATE / SAVE STABILITY
## G. FINAL PREP / STOCK TIMING
# 12. IMPLEMENTATION GUARDRAIL
# 13. CROSS-SPEC OWNERSHIP
# 14. FINAL TARGET
```

The v2.5 header-region headings (`# 0. ROLE / NON-NEGOTIABLE`, `# 3. FAMILY DISCLOSURE`,
`# 4.1 FINAL PREP / LOCK / STOCK`, `# 5. NPC PREPARATION`, `# 5.1 FINAL CALCULATION ORDER`,
`# 7. PARTY POWER`, `# 9. BOSS CLEAR`, `# 10. RUN CLEAR / FAILURE`) are uncounted by the check; their
new forms are listed here. `NPC PREPARATION` gains "`prepare` stat calculation" to separate it from
the Final preparation transfer step.

```new
## ROLE / NON-NEGOTIABLE
## FINAL TARGET
## FAMILY DISCLOSURE
### Final party selection
### Final preparation — fixed 50% / 매입가 transfer
### Final subjugation forecast — party-wide
### Final-specific Item boundary
### Result
## FINAL PREP / LOCK / STOCK
## NPC PREPARATION — `prepare` stat calculation
## FINAL CALCULATION ORDER
## FINAL HAZARD AGGREGATION
## INDIVIDUAL FINAL POWER
## PARTY POWER
## FINAL ROLL
## BOSS CLEAR
## RUN CLEAR / FAILURE
## BALANCE QA
### HAZARD PRESSURE
### BOSS POWER
### 1~2인 PARTY
### FINAL ROLL 0.88~1.12
### TWO-FAMILY COMBINATION
### FINAL STATE / SAVE STABILITY
### FINAL PREP / STOCK TIMING
## IMPLEMENTATION GUARDRAIL
## CROSS-SPEC OWNERSHIP
```

## UNRESOLVED (reported, not decided here)

- `eligible` is never defined in the chain (`eligible >= 1 -> Player may choose 1..min(3, eligible)`;
  FINAL-Q75 `0 eligible still fails`). Source counts alive + introduced + not in recovery; no definition
  is invented here. DESIGN ISSUE.
- `기존 Design SSOT` / bare owner names (`→ DUNGEON_HAZARD`, `-> ITEM`, ...) in v2.5 text are kept
  verbatim; they resolve through SPEC_INDEX_v2.8.0.md.

## AMENDMENT — User decision 2026-09-23: `eligible` defined, matching Source

The User resolved the DESIGN ISSUE above: `eligible` follows the current Source
(`finalEligible()`: alive && introduced && !recovery; `recovery` is set only by 중상).

```new
eligible
= alive
+ introduced (has visited the store at least once)
+ not in 중상 recovery (recovery Days remaining = 0)
```
