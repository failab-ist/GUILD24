# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,hazard,prepared_power,supply,fatigue,death,great_success,result_proof,counterfactual
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=DUNGEON_HAZARD_v2.7.0.md
PATCH_TYPE=RESULT_PROOF_AND_READABILITY

## INHERITANCE

All unchanged v2.7 Gate Power, Hazard threat, Prepared Power, death-risk, Supply, Fatigue and
actual expedition resolution rules inherit DUNGEON_HAZARD_v2.7.0.md.

This patch closes the previously measurement-gated Great Success and Deep exact numeric baselines.

v2.8 does not change Fire-family occurrence weighting.

## FATIGUE INFORMATION BOUNDARY — SUPERSEDES v2.7 DISPLAY CLAUSE

Keep the exact v2.7 Supply/Fatigue arithmetic.

Do not show the Player a branch table of hypothetical final Fatigue for 성공 / 퇴각 / 부상.

SALE may expose:
- current Fatigue
- departure Fatigue after committed preRecovery
- Prepared Supply / Required Supply / excess
- actual deterministic current arithmetic

NIGHT exposes the one resolved final Fatigue path.

The hidden deficit formula remains hidden.

## RESULT-PROOF COUNTERFACTUAL — PURPOSE

NIGHT may make a strong Item-causality statement only when the actual resolved expedition evidence
proves that removing the Item would have produced a meaningfully worse result/state.

This is proof/presentation logic.
It does not change the actual expedition outcome.

## ACTUAL RESOLUTION FIRST

The real expedition resolves exactly once under ordinary canonical rules.

Do not:
- reorder gameplay so Field Gear resolves before Food
- give one category narrative priority
- reroll the expedition for attribution
- consume extra gameplay RNG for proof
- mutate NPC/Run/economy state in a proof comparison

## RANDOM EVIDENCE

The actual resolve records the semantic random evidence it really used, including the existing
combat/environment/escape/injury/death/Great-Success decisions and any optional branch roll that
was actually drawn.

A shadow comparison may reuse only actual recorded evidence.

If removing an Item causes a counterfactual path to require a random decision that the actual
expedition never drew, that comparison is:

    UNPROVEN

No replacement roll is invented.
No same-seed full rerun is used because branch-dependent RNG consumption is not guaranteed to be
the same path.

Under-reporting is preferred to false causality.

## SHADOW SET — NORMAL BAG

For actual Bag A+B, evaluate only what is needed:

    actual A+B
    without A
    without B
    without A and B, only when needed to distinguish shared/redundant contribution

Special 황금 1+1 쿠폰 participates in the same proof boundary when its duplication changed the
resolved preparation.

## OUTCOME ORDER FOR PROOF

For attribution comparison only:

    대성공 > 성공 > 퇴각 > 부상 > 중상 > 사망

If removal moves the result downward in this order, that is a proven Outcome contribution.

Persistent Injury Aftercare and existing Insurance conversions may also be proven state
contributions even when the text Outcome itself is unchanged, exactly as their Item owner defines.

Fatigue-only or Wallet-only changes are not promoted to Hero Item Outcome feedback.
They remain visible in their own result rows.

## OVERLAP ATTRIBUTION

If removing A worsens the result and removing B does not:
- credit A

If removing either A or B independently worsens the same meaningful result:
- credit A and B together

If neither individual removal worsens the result but removing both does:
- do not invent individual ownership
- use generic committed-preparation attribution

If proven changes differ in severity:
- show the strongest single Hero feedback line rather than stacking several heroic claims

No automatic Field Gear > Food priority exists.

## GREAT SUCCESS — DIRECTOR DOCUMENT BASELINE

Keep the existing margin formula:

    marginRatio
    = (prepared Combat ability - Gate required Power)
      / Gate required Power

Exact v2.8 values:

    signalMargin = 0.26
    chanceSlope  = 0.80
    chanceCap    = 0.30

Thus:

    Great Success chance
    = min(0.30, max(0, marginRatio × 0.80))

The signal threshold does not gate the roll.
It only controls when the Player sees the qualitative signal.

The intended positive loop remains:
    stronger prepared NPC
    -> larger positive margin
    -> higher Great Success chance
    -> faster NPC growth

Do not lower this probability merely because a skilled Run produces repeated Great Success.
Economic reinforcement is controlled separately by ECONOMY_ORDER_v2.8.0.md.

SALE owns when the signal is recomputed.
The signal remains qualitative; exact probability stays hidden.

## DEEP EXPEDITION — DIRECTOR DOCUMENT BASELINE

Keep the inherited occurrence windows:
    D7 / D14 / D21 / D28

Each Run still has exactly 2 or 3 Deep occurrences, with:
    probability of 3 occurrences = 50%
    probability of 2 occurrences = 50%

Difficulty:
    deepRequiredPower = baseGateRequiredPower × 1.50

No Hazard magnitude/count inflation is added.

Sponsorship cost remains owned by the Economy owner.
NPC bonus reward remains owned by NPC_TRAIT_v2.8.0.md.

## FULL-CHAIN NUMERIC CLOSURE — GATE / FORECAST / ORDINARY RESOLVE

USER_APPROVAL_DATE=2026-09-20

These values are the required v2.8 baseline. Later tuning requires measured evidence and a new
approved owner amendment.

### Gate-count generation — exact

For ordinary Days:

| Day | Gate count |
|---|---|
| D1–3 | exactly 1 |
| D4–7 | 1 or 2, exactly 50% / 50% |
| D8–18 | exactly 2 |
| D19–29 | 2 or 3, exactly 50% / 50% |
| D30 | ordinary Gate-count generation does not run; Final owner applies |

The next-Day Gate-count forecast must read this same rule. It may not maintain a second probability
table.

### Tier generation — exact

Use the following exact anchor rows for ordinary Days:

| Day anchor | T1 | T2 | T3 |
|---|---:|---:|---:|
| D1 | 100% | 0% | 0% |
| D5 | 100% | 0% | 0% |
| D7 | 85% | 15% | 0% |
| D8 | 70% | 30% | 0% |
| D12 | 65% | 35% | 0% |
| D13 | 55% | 42% | 3% |
| D18 | 30% | 60% | 10% |
| D19 | 26% | 60% | 14% |
| D24 | 10% | 60% | 30% |
| D25 | 5% | 50% | 45% |
| D29 | 0% | 45% | 55% |

For Days between two anchors, linearly interpolate each Tier weight between the surrounding rows.
D30 does not use ordinary Tier generation.

The next-Day T1/T2/T3 forecast uses this exact same function. Save/Load must not create a separate
forecast roll or a second approximation table.

### Combat Forecast label boundary — exact, hidden formula

Let:

    combatRatio = Prepared Power / Gate required Power

Player label:

    combatRatio > 1.20  -> 우세
    combatRatio >= 0.80 -> 접전
    otherwise           -> 불리

The exact ratio/formula remains non-player-facing unless another current information rule explicitly
exposes an ingredient.

### Hazard Defense / Readiness — exact, hidden formula

For each Hazard:

    Hazard Defense
    = explicit Item/Trait Counter contribution
      + mapped Core-Stat contribution

Mapped Core-Stat coefficients:

| Hazard | Core-Stat contribution |
|---|---|
| 독 | 강인함 ×0.30 |
| 화염 | 강인함 ×0.32 |
| 냉기 | 강인함 ×0.30 |
| 부식 | 강인함 ×0.30 |
| 속박 | 기동 ×0.40 |
| 진창 | 기동 ×0.40 |
| 공포 | 정신 ×0.40 |
| 어둠 | 정신 ×0.30 + 기동 ×0.12 |
| 화이트아웃 | 정신 ×0.30 + 기동 ×0.12 |

Let:

    readinessRatio = Hazard Defense / Hazard Threat

Player label:

    readinessRatio >= 1.00 -> 충분
    readinessRatio >= 0.75 -> 대응
    readinessRatio >= 0.40 -> 불안
    otherwise              -> 취약

These thresholds are Design Truth but remain hidden calculation detail.

### Supply-deficit penalty — exact

If Required Supply is not met:

    deficit = max(0, requiredSupply - preparedSupply)
    sharedPenalty = min(0.30, deficit × 0.06)

Apply the same percentage reduction to the prepared four Core Stats before ordinary combat/Hazard
resolution. This remains one shared Supply system, not four independent penalties.

### Ordinary non-Death resolution — exact baseline

After preparation:

    combatNoise
    = uniform multiplier within ±17.5%
      plus any explicit Trait variance modifier

    combatSuccess
    = Prepared Power × combatNoise >= Gate required Power

Environment incident probability:

    hazardAggregate
    = sum(Hazard gap) / max(1, sqrt(number of Hazards))

    environmentIncidentChance
    = clamp(
        0.06
        + hazardAggregate × 0.012
        - prepared 강인함 × 0.001,
        0.02,
        0.48
      )

When combat fails:

    escapeChance
    = clamp(
        0.48
        + prepared 기동 × 0.005
        + explicit escape modifier
        - Gate scale × 0.024,
        0.15,
        0.94
      )

    escape succeeds -> 퇴각
    escape fails    -> 부상 branch

On the failed-combat Injury branch:

    Severe chance
    = clamp(
        0.42
        + injuryRisk
        - injuryGuard × 0.25
        + injured-departure escalation,
        0,
        1
      )

On an environment/other Injury branch:

    Severe chance
    = clamp(
        0.13
        - injuryGuard × 0.12
        + injured-departure escalation,
        0,
        1
      )

The injured-departure escalation remains +15%p under the current v2.7 rule.
The single failure-conditioned Death rule, Insurance conversions, Aftercare and Great Success keep
their current owner ordering and are not redefined here.

### Ordinary EXP / expedition-Wallet / equipment reward — exact baseline

For a living adventurer:

    baseEXP = 22 + Day × 4.6

Outcome multiplier:

    대성공 = 1.40
    퇴각   = 0.38
    combat-success path = 1.00
    other surviving non-retreat path = 0.50

Then:

    EXP
    = round(baseEXP × outcomeMultiplier × explicit XP modifiers)

Ordinary expedition Wallet reward:

    baseWalletReward = 35 + Day × 8

Outcome multiplier:

    퇴각 = 0.08
    combat-success path = 1.00
    other surviving path = 0.18

Then:

    expeditionWalletReward
    = round(
        baseWalletReward
        × outcomeMultiplier
        × (1 + explicit loot modifiers)
        × Gate reward multiplier
      )

This is the ordinary NPC expedition-Wallet channel consumed by current Item/Trait/Deep rules.

Equipment gain:
- only a living combat-success path is eligible
- base chance = 20% plus explicit rare-loot modifier
- on hit, Equipment tier +1
- Equipment 투력 gain = seeded integer 2–5 inclusive

These values are the v2.8 Source-adoption baseline, not player-facing exact probability disclosure.
