# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,injury,death,closing,settlement,causality
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NIGHT_CLOSING_v2.6.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged Night/Closing behavior inherits `NIGHT_CLOSING_v2.6.0.md`.
This patch overrides stale three-control text and tightens Runtime result truth.

## NIGHT CONTROLS — EXACT

Exactly:
```text
다음
전체 건너뛰기
```

Removed:
- single-result `건너뛰기`
- active `nightSkip` presentation/API path

Skip-all affects presentation only and never changes already-resolved results.

## RESULT FATIGUE FIELDS

Result/runtime/QA must distinguish:
```text
beforeFatigue
fatigueRecovery
effectiveFatigue
actualOutcomeFatigueGain
finalFatigue
netFatigueDelta
```

Player-facing result must expose at least:
- fatigueRecovery when nonzero/relevant
- actualOutcomeFatigueGain
- finalFatigue

Do not label `netFatigueDelta` as the expedition outcome fatigue gain.

Outcome baseline:
```text
성공 +2
대성공 +2
퇴각 +3
부상 +4
중상 0
사망 0
```

## INJURY RESULT

Show actual current injury consequence only.

`injury=2`:
- no Stat penalty
- show remaining recovery duration
- recovery completion goes directly to healthy (`2 -> 0`)

## NPC WALLET RESULT TERMINOLOGY

Use:
`NPC 소지금 획득`

Do not use `전리품` where it can be read as Store/Player Gold.

## RUNTIME CAUSALITY

A Player-facing Item/Trait/Event cause may appear only when the resolved report contains proof that the effect actually:
- prevented
- reduced
- converted
- or otherwise changed the relevant resolved risk/outcome

Forbidden evidence:
- Item merely existed in Bag
- compatibility alone
- generic Event flavor text alone

If exact cause is not provable, use truthful broad narration instead of invented precision.

## PRESENTATION DATA BOUNDARY

Presentation must not read an app-local global `game` implicitly.
Night result presentation consumes:
1. the resolved result/report snapshot first
2. explicit parameters/snapshot supplied by the caller only if required

Adding a global `game` escape hatch is forbidden.

## RUNTIME ACCEPTANCE

Real browser path must complete with Console runtime error = 0:
```text
ORDER
-> SALE all customers
-> NIGHT
-> injury result and non-injury result
-> 다음 / 전체 건너뛰기
-> CLOSING
-> next Day
```
