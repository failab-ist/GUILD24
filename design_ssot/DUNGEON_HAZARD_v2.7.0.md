# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,family,hazard,supply_burden,forecast,counter,fatigue,prepared_power,death_risk
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=DUNGEON_HAZARD_v2.6.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

Family identities, Hazard-to-Stat mappings, readiness labels, Day/Tier generation, combat variance, Deep Expedition structure, and unchanged Supply-Burden eligibility inherit `DUNGEON_HAZARD_v2.6.0.md`.

This patch overrides v2.6 prepared-Power weights, Hazard threat scale, Fatigue values/penalties, excess-Supply processing, ordinary expedition Death risk, stale third-slot wording, and the next-day Gate forecast disclosure contract.

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

The new Epic layer in `ITEM_v2.7.0.md` improves late-Run slot efficiency but is not a mandatory T3 key.
A valid T3 route must still exist without drawing one exact Epic SKU.

## ORDINARY EXPEDITION DEATH RISK — v2.7 BASELINE

`DIRECTOR DOCUMENT BASELINE`

v2.7 Death risk is an expedition-level risk produced by the Player's actual preparation state.

It combines exactly three inputs:

```text
Combat preparation deficit
+ Environment / Hazard preparation deficit
+ departure ordinary-Injury risk
```

Death is no longer gated behind:

```text
combat failure
-> escape failure
-> separate Death branch
```

Do not roll Death once inside combat/escape and then again in a later result branch.
There is exactly one ordinary-expedition Death roll.

### Combat contribution

Use the same current prepared-combat truth that drives ordinary Forecast/Resolve, before hidden combat variance:

```text
CombatDeficit
= clamp(
    (requiredCombatPower - effectivePreparedPower)
    / requiredCombatPower,
    0,
    1
)

CombatDeathContribution
= CombatDeficit × 0.18
```

`effectivePreparedPower` means the actual prepared state for the snapshot being calculated, including all already-applicable NPC-side modifiers and Item/Supply effects for that snapshot.
Do not use a separate Death-only combat score.

### Environment contribution

For each current canonical Hazard:

```text
HazardDeficit_i
= clamp(
    (HazardThreat_i - HazardDefense_i)
    / HazardThreat_i,
    0,
    1
)
```

Then:

```text
EnvironmentDeficit
= average(HazardDeficit_i)

EnvironmentDeathContribution
= EnvironmentDeficit × 0.12
```

If the expedition has no canonical Hazard entries, `EnvironmentDeficit = 0`.

Use the same current Hazard Threat / Hazard Defense truth as ordinary readiness.
Do not create a second Death-only Hazard table or hidden environment score.

### Healthy / injured Death chance

Healthy departure:

```text
healthyDeathChance
= clamp(
    CombatDeathContribution
  + EnvironmentDeathContribution,
  0.00,
  0.30
)
```

If the NPC **began the expedition with ordinary Injury (`injury=1`)**:

```text
deathChance
= clamp(
    healthyDeathChance + 0.10,
    0.00,
    0.40
)
```

Otherwise:

```text
deathChance = healthyDeathChance
```

Meaning:
- complete combat/environment preparation may reduce ordinary Death risk to 0%
- 0% Death does not mean guaranteed expedition Success; combat/environment outcome variance still exists
- weak combat preparation raises Death risk
- weak Hazard preparation independently raises Death risk
- repeating expeditions with an already-injured NPC adds a visible material risk
- healthy Death cap remains 30%
- injured Death cap remains 40%

### Resolution order

After the final preparation state for the expedition is fixed:

1. calculate the final actual `deathChance`
2. perform exactly one Death roll for that ordinary expedition
3. if the Death roll hits, final ordinary Outcome is `사망`
4. if it does not hit, resolve the remaining ordinary non-Death combat/environment/escape/injury/severe structure without another Death branch

This replaces the previous failed-combat + failed-escape gated Death roll.
Do not add a second instant-Death subsystem on top of this calculation.

### Pre-supply player-facing Death Risk

SALE exposes one exact **pre-supply Death Risk %** snapshot before any new Item transaction for that customer.

That displayed value:
- uses the NPC/Gate/Condition state at SALE entry
- includes existing departure Injury if present
- uses no newly committed Item from the current customer visit
- is shown together with the pre-supply qualitative Combat Forecast / Hazard Readiness
- remains frozen after the Player commits Item purchases

The actual expedition still recalculates `deathChance` internally from the final prepared state after committed Items/Supply/Fatigue effects.
Do not update the displayed Death Risk to reveal the post-supply answer.

Exact presentation/copy -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md` / `COPY_WORLD_VOICE_v2.7.0.md`.

## INJURED RE-EXPEDITION SEVERE ESCALATION

When an NPC **began** the expedition at `injury=1`, the existing non-death branch after failed combat/escape receives:

```text
Severe Injury transition chance +15%p
```

Rules:
- apply to the same Severe-vs-ordinary Injury decision point already used by the ordinary resolution
- do not create a second independent Severe roll
- apply the +15%p before the normal clamp used by that branch
- the ordinary Injury Stat penalty itself remains unchanged under `NPC_TRAIT_v2.7.0.md`

This modifier is about the danger of sending an already-wounded adventurer back out, not about making the four visible Stats secretly lower than their listed Injury penalty.

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
- existing Injury state and its visible Stat penalties
- that sending an injured NPC again increases Severe/Death risk
- exact pre-supply Death Risk % at SALE entry, owned by this Death-risk model

Do not expose:
- hidden Supply-deficit formula
- exact expedition success probability
- post-supply/final actual Death probability during the SALE decision
- exact hidden Hazard threshold/formula

Conditional Fatigue rows are arithmetic, not Outcome prediction.

## NEXT-DAY GATE FORECAST — v2.7 DISCLOSURE

The inherited Day/Gate progression and controlled-random generation remain authoritative.
This patch changes what the Player is told before ORDER.

Before ORDER commitment, expose both:

1. next-day Gate-count forecast
2. next-day Tier forecast

### Gate-count forecast

When the inherited next-Day Gate count is randomized, expose the exact probability distribution across the possible counts for that next Day.

When the inherited next-Day Gate count is deterministic, expose the fixed count as confirmed information.

Rules:
- derive the forecast from the same canonical seeded/current-run generation rules that govern the actual next Day
- do not create a second forecast-only RNG path
- Save/Load must not reroll the forecast independently from the actual next-Day generation state
- do not reveal next-day Family
- do not reveal exact next-day Gate identities/composition
- do not reveal next-day Hazard set

### Tier forecast

Retain exact next-day T1/T2/T3 probability disclosure.

### Design boundary

Current-day open Gate / known Hazard remains the primary preparation truth.
The next-day forecast is a secondary planning signal.

Design intent:

```text
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
```

Presentation owner -> `ECONOMY_ORDER_v2.7.0.md` / `UI_UX_v2.7.0.md`.

## RELATED

Item Supply/Counter/Epic preparation -> `ITEM_v2.7.0.md`
Injury persistence/re-expedition state -> `NPC_TRAIT_v2.7.0.md`
Fatigue Trait -> `NPC_TRAIT_v2.7.0.md`
Sale preview -> `SALE_v2.7.0.md`
Night resolved fields -> `NIGHT_CLOSING_v2.7.0.md`
Next-day forecast presentation -> `ECONOMY_ORDER_v2.7.0.md`
Final Hazard aggregation -> `FINAL_EXPEDITION_v2.7.0.md`