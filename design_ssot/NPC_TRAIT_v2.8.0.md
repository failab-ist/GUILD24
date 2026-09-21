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

Exact compact UI/tutorial placement -> UI_UX_v2.8.0.md.
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

## FULL-CHAIN NUMERIC CLOSURE — JOB / LOYALTY / REVISIT

USER_APPROVAL_DATE=2026-09-20

### Job Lv1 Stats / Growth — exact

Stat order:

    투력 / 강인함 / 기동 / 정신

| Job | Lv1 Stats | per-Level Growth |
|---|---|---|
| 전사 | 17 / 18 / 9 / 10 | 2.8 / 2.6 / 1.5 / 1.6 |
| 궁수 | 14 / 11 / 19 / 10 | 2.6 / 2.0 / 3.0 / 1.6 |
| 마법사 | 18 / 9 / 10 / 17 | 3.3 / 1.6 / 1.8 / 2.7 |
| 사제 | 10 / 16 / 9 / 20 | 2.2 / 2.7 / 1.6 / 3.0 |
| 도적 | 15 / 11 / 21 / 9 | 2.8 / 2.0 / 3.4 / 1.5 |
| 광전사 | 21 / 14 / 12 / 7 | 3.6 / 2.4 / 1.9 / 1.3 |

Actual Level growth remains:

    Core Stat gain per Level
    = Job Growth × that NPC's internal Potential

Potential remains an internal growth input and is not exposed as a relationship reward.

These values supersede the inherited `Exact base/growth numbers=PASS3` marker.

Job Mastery does not alter this table.
Current Job Mastery effect -> META_v2.8.0.md.

### Non-purchase Loyalty — exact

Ordinary customer visit:
- when the current customer's visit is finalized/departs -> Loyalty +1

Ordinary expedition:
- if the NPC remains alive after the expedition -> Loyalty +2
- this includes living Retreat / Injury / Severe Injury outcomes
- Death grants no survival Loyalty

These are separate from paid-purchase Loyalty deltas.
Explicit Trait / Store Support modifiers apply only through their own owner rules.

Loyalty remains clamped to the existing 0–100 range.

### Loyalty effect on purchase intent — exact

The ordinary hidden purchase-acceptance formula receives:

    +0.002 purchase chance per current Loyalty point

Full purchase formula -> ECONOMY_ORDER_v2.8.0.md.

### Loyalty effect on revisit weighting — exact

Within the ordinary returning-NPC selection branch, Loyalty multiplies that NPC's revisit weight by:

    1 + Loyalty × 0.025

This combines with explicit current Trait / Store Support revisit modifiers.
It does not guarantee a visit.

The existing introduced-vs-newcomer mixture remains otherwise unchanged by this closure.
Trusted Regular remains exactly Loyalty >= 51.
