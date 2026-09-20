# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,loyalty,trusted_regular,revisit,recent_expedition
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NPC_TRAIT_v2.7.0.md
PATCH_TYPE=INFORMATION_TRUST

## INHERITANCE

All unchanged v2.7 NPC, Job, Trait, Injury, Fatigue-trait, Food-affinity, Potionbody and recent
expedition rules inherit NPC_TRAIT_v2.7.0.md.

## PLAYER-FACING GROWTH TRUTH

Player-facing NPC growth identity remains:

    Job + Level + actual four Core Stats

Potential is an internal growth input, not a relationship reward display.

Do not expose:
- 성장 잠재력
- 빠른 성장 / 꾸준한 성장 / 착실한 성장 from potential
- 남은 특성
- a promise that higher Loyalty reveals hidden Traits

Current Traits are visible from the start under the current Trait rules.

## LOYALTY / TRUSTED REGULAR

Trusted Regular threshold remains exactly:

    Loyalty >= 51

Use the single owner judgement for:
- 단골 badge/state
- relationship copy
- Boss LUST protection
- any other rule that requires Trusted Regular

Do not create a second UI-only threshold such as 60 for the word 단골.

Other Store Supports may still own additional thresholds such as 30 / 50 / 60 for their own
effects; those do not redefine Trusted Regular.

## ORDINARY PAID-PURCHASE LOYALTY DELTAS

Base Loyalty change on a successful ordinary paid purchase:

    50% sale  -> +6
    100% sale -> +1
    150% sale -> -3

These are the base transaction deltas before any explicitly owned Trait / Store Support modifier.

Refusal grants no purchase Loyalty change.
Other visit/survival Loyalty changes remain separate and unchanged.

## LOYALTY PLAYER MEANING

The Player must be able to learn that Loyalty:
- increases ordinary purchase intent
- increases revisit weighting
- can satisfy Store Support conditions
- becomes Trusted Regular at 51
- can matter to LUST once that Boss rule has been revealed

Loyalty does not directly increase the four Core Stats.

Boss-specific information must not leak before its reveal.

Exact compact UI/popover -> UI_UX_v2.8.0.md.
Exact player copy -> COPY_WORLD_VOICE_v2.8.0.md.


## DEEP EXPEDITION NPC REWARD — DIRECTOR DOCUMENT BASELINE

The inherited Deep reward structure is now numerically closed for v2.8.

Deep Success:
    additional EXP +40
    additional NPC Wallet +60G

Deep Great Success:
    additional EXP +80
    additional NPC Wallet +120G

Rules:
- these bonuses are added on top of the ordinary resolved expedition rewards/consequences
- only Success / Great Success receive the special Deep bonus
- Retreat / Injury / Severe Injury / Death receive no special Deep EXP/Wallet bonus
- no automatic Level +1
- EXP uses the ordinary Growth system
- Wallet uses the ordinary persistent NPC Wallet channel
- no extra Day/Tier multiplier
- no direct Loyalty, revisit guarantee, permanent Deep Stat, Deep currency or Deep Mastery

The Great-Success Deep bonus is exactly 2× the Success bonus on both channels.
