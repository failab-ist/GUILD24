# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,supply_burden,forecast,counter,fatigue,prepared_power
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=DUNGEON_HAZARD_v2.6.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

Family identities, Hazard-to-Stat mappings, readiness labels, Day/Tier generation, combat variance, Deep Expedition structure, and unchanged Supply-Burden eligibility inherit `DUNGEON_HAZARD_v2.6.0.md`.

This patch overrides v2.6 prepared-Power weights, Hazard threat scale, Fatigue values/penalties, excess-Supply processing, and stale third-slot wording.

## PREPARED POWER — v2.7 BASELINE

`DIRECTOR DOCUMENT BASELINE`

For ordinary expedition Forecast, Resolve, and Great-Success prepared margin:

```text
Prepared Power
= 투력 × 0.50
+ 강인함 × 0.34
+ 기동 × 0.27
+ 정신 × 0.20
```

Rules:
- 투력 remains the strongest single direct lever.
- Do not create a Player-facing aggregate Power Stat.
- Forecast and actual Resolve must use the same four weights.
- Great Success margin/signal must read the same prepared ability truth before hidden combat noise.
- A stale ordinary-expedition `.58/.32/.24/.16` path is invalid in v2.7.

## HAZARD THREAT — v2.7 BASELINE

`DIRECTOR DOCUMENT BASELINE`

For each canonical Hazard:

```text
Hazard Threat
= 12 + Day × 0.35 + (Tier - 1) × 6
```

Reference anchors:

```text
D1  T1 = 12.35
D12 T1 = 16.20
D18 T2 = 24.30
D24 T2 = 26.40
D29 T3 = 34.15
D30 T2 = 28.50
```

Hazard defense continues to use the current authoritative Hazard-to-Core-Stat mapping plus explicit Item/Trait Counter contributions.
Readiness labels remain:
```text
충분 / 대응 / 불안 / 취약
```
with their existing owner calculation; no second v2.7 readiness formula is created.

## TIER PREPARATION INTENT — v2.7

Neutral-fit target:

```text
T1
- lower/basic response can reach 충분
- hybrid alone is commonly a little short

T2
- upper/main specialist can reach 충분
- lower response remains useful but is commonly short of 충분

T3
- upper/main specialist alone is commonly 대응 / slightly short
- upper + secondary/natural/trait/hybrid support can reach 충분
```

A naturally strong, invested NPC may need fewer Item resources.
A weak-fit NPC may need more.
No canonical route may require a third normal Bag slot.

## FATIGUE OUTCOME BASELINE

`DIRECTOR DOCUMENT BASELINE`

```text
성공      +3
대성공    +3
퇴각      +5
부상      +6
중상       0
사망       0
```

Trait result modifiers and their outcome scope -> `NPC_TRAIT_v2.7.0.md`.

Severe Injury and Death remain final result-Fatigue gain 0; a Trait may not raise them above 0.

## FATIGUE STAT PENALTY

`DIRECTOR DOCUMENT BASELINE`

```text
0~9    : no Stat penalty
10~19  : 기동 / 정신 -15%
20     : 기동 / 정신 -40%
```

Apply this to NPC Base+Equipment-side Stats in the same preparation layer where current NPC-side Fatigue modifiers are applied.
Sold Item Stat contribution is not multiplied by this NPC-side percentage unless another owner explicitly says so.

Fatigue 20 is an explicit overuse state, not a mild second tier.

## SUPPLY BURDEN INPUT

Unchanged Supply-Burden occurrence/required values remain owned by the base document, including:
- T1 ineligible
- T2 eligible / required Supply 3 baseline
- T3 eligible / required Supply 5 baseline
- D30 Final no additional random Supply Burden

The exact Supply-deficit penalty formula remains hidden and inherits the current owner unless later tuned by approved balance evidence.

## EXCESS SUPPLY -> FATIGUE — EXACT v2.7 ORDER

For this calculation:

```text
preparedSupply = final Food/Drink Supply after all valid Item/Trait/Relic adjustments
```

This is the same `preparedSupply` field exposed by `NIGHT_CLOSING_v2.7.0.md`.

Food/Drink Supply is processed as:

```text
excessSupply
= max(0, preparedSupply - requiredSupply)

preRecovery
= min(currentFatigue, excessSupply)

fatigueBeforeExpedition
= currentFatigue - preRecovery

remainingSupplyBuffer
= excessSupply - preRecovery

rawOutcomeFatigueGain
= outcome baseline + applicable Fatigue Trait modifier

Severe Injury / Death:
rawOutcomeFatigueGain = 0

actualOutcomeFatigueGain
= max(0, rawOutcomeFatigueGain - remainingSupplyBuffer)

outcomeBufferUsed
= rawOutcomeFatigueGain - actualOutcomeFatigueGain

finalFatigue
= clamp(fatigueBeforeExpedition + actualOutcomeFatigueGain, 0, 20)
```

Meaning:
1. Required Supply is paid first.
2. Remaining Supply reduces current Fatigue first.
3. Any still-remaining Supply buffers this expedition's resulting Fatigue gain 1:1.
4. Leftover Supply does not become Power, success chance, Loot, Hazard defense, or a persisted next-expedition buffer.

Field naming is shared with `NIGHT_CLOSING_v2.7.0.md`.
Do not introduce a second live `postOutcomeFatigueGain` field name for the same value.

## PREPARATION SEQUENCE OVERRIDE

The v2.6 prepare sequence is updated only where needed:

```text
A. NPC Base + Equipment
B. evaluate Bag Item Stat / Counter / preparedSupply
C. pay required Supply, calculate preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer
D. apply NPC-side Trait / Injury / Fatigue modifiers using fatigueBeforeExpedition
E. add Sold Item Core Stat contribution
F. apply existing Supply Deficit / Hazard calculations
G. after actual expedition Outcome is known, calculate rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue
```

Do not consume the outcome buffer before the actual Outcome exists.

## PLAYER-FACING INFORMATION BOUNDARY

Expose exact decision ingredients:
- Required Supply
- Prepared Supply
- Supply Deficit amount
- current Fatigue
- departure Fatigue after preRecovery
- remaining Supply buffer
- conditional final Fatigue for each relevant possible Outcome

Do not expose:
- hidden Supply-deficit formula
- exact expedition success/death probability
- exact hidden Hazard threshold/formula

Conditional Fatigue rows are arithmetic, not Outcome prediction.

## RELATED

Item Supply/Counter -> `ITEM_v2.7.0.md`
Fatigue Trait -> `NPC_TRAIT_v2.7.0.md`
Sale preview -> `SALE_v2.7.0.md`
Night resolved fields -> `NIGHT_CLOSING_v2.7.0.md`
Final Hazard aggregation -> `FINAL_EXPEDITION_v2.7.0.md`
