# DUNGEON_HAZARD

DOC=DUNGEON_HAZARD
OWNER=dungeon,hazard,prepared_power,supply,fatigue,death,great_success,result_proof,counterfactual
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=DUNGEON_HAZARD_v2.7.0.md
PATCH_TYPE=RESULT_PROOF_AND_READABILITY

## INHERITANCE

All unchanged v2.7 Gate Power, Hazard threat, Prepared Power, death-risk, Supply, Fatigue, Great
Success probability and actual expedition resolution rules inherit DUNGEON_HAZARD_v2.7.0.md.

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

## GREAT SUCCESS SIGNAL

Great Success probability formula and signal threshold remain unchanged here.

SALE owns when the signal is recomputed.
The signal remains qualitative; exact probability stays hidden.
