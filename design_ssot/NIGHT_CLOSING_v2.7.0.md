# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,injury,death,closing,settlement,causality,fatigue_result
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NIGHT_CLOSING_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Night controls, result sequencing, Closing, Wallet terminology, result-proof causality boundary, and presentation-data boundary inherit `NIGHT_CLOSING_v2.6.1.md`.

This patch updates v2.7 Fatigue/Supply result truth, Item Aftercare proof, and recent-expedition snapshot output.

## RESULT FATIGUE FIELDS — v2.7

Resolved report/runtime must distinguish at least:

```text
beforeFatigue
requiredSupply
preparedSupply
excessSupply
preRecovery
fatigueBeforeExpedition
remainingSupplyBuffer
rawOutcomeFatigueGain
outcomeBufferUsed
actualOutcomeFatigueGain
finalFatigue
netFatigueDelta
```

Definitions:
- `preRecovery` = current Fatigue removed before expedition by Supply remaining after required Supply
- `fatigueBeforeExpedition` = Fatigue after `preRecovery`
- `remainingSupplyBuffer` = Supply left after required Supply + preRecovery
- `rawOutcomeFatigueGain` = actual Outcome baseline plus eligible Trait modifier before Supply buffer
- `outcomeBufferUsed` = amount of remaining Supply actually consumed to reduce that raw gain
- `actualOutcomeFatigueGain` = final gain after the buffer

Exact arithmetic -> `DUNGEON_HAZARD_v2.7.0.md`.

Do not reuse `fatigueRecovery` as an ambiguous combined field for both pre-expedition recovery and post-outcome buffering.
Legacy compatibility aliases may exist internally during implementation only if Player-facing/report truth remains unambiguous.

## PLAYER-FACING FATIGUE RESULT

Show the actual resolved path, not every hypothetical branch.

Example:

```text
피로 2 -> 출발 0 · 보급 회복 -2
원정 결과 +5 · 보급 완화 -3
밤 피로 2
```

Rules:
- omit zero-value subrows when that improves readability
- actual Outcome Fatigue gain must not be confused with net Fatigue delta
- Severe Injury / Death actual result Fatigue gain is 0 under the v2.7 owner rule

## FIRST AID KIT AFTERCARE — RESULT TRUTH

`구급키트` does not rewrite the expedition Outcome.
If its Aftercare actually changes persistent Injury state, the report may expose that proven contribution.

Examples of valid proof:
- resolved `부상`, persistent state changed from would-be injury=1 to injury=0
- resolved `중상`, persistent state changed from would-be injury=2 recovery-state to injury=1/recovery=0

Do not display:
- `구급키트가 퇴각시켰다`
- `구급키트가 원정을 성공시켰다`
- generic contribution merely because the Item was carried

Insurance resolution order/effect -> `ITEM_v2.7.0.md`.

## RECENT EXPEDITION SNAPSHOT WRITE

After an expedition result is fully resolved, write the latest snapshot owned by `NPC_TRAIT_v2.7.0.md` using:
- completed Day
- actual destination
- final Outcome
- exact accepted/purchased Bag Item IDs
- only contribution/cause tokens already proven by the resolved report

Do not write a claimed/expected destination in place of actual destination.
Do not invent a cause during snapshot serialization.

## CAUSALITY — UNCHANGED STANDARD

The v2.6.1 rule remains authoritative:
Player-facing cause text requires runtime proof that an Item/Trait/Event actually changed the resolved risk/outcome/state.

v2.7 adds new provable contribution types for:
- Supply preRecovery
- Supply outcome Fatigue buffer
- First Aid Kit Aftercare

It does not add system-authored failure diagnosis such as `전투 부족` or `독 대응 부족` when exact causality is not proven.

## RELATED

Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Insurance/Aftercare -> `ITEM_v2.7.0.md`
Recent snapshot -> `NPC_TRAIT_v2.7.0.md`
Sale revisit display -> `SALE_v2.7.0.md`
UI -> `UI_UX_v2.7.0.md`
