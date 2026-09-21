# NPC_TRAIT QA

DOC=NPC_TRAIT_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=NPC_TRAIT_QA_v2.7.0.md
PATCH_TYPE=INFORMATION_TRUST_QA

## INHERITANCE

All non-conflicting v2.7 NPC/Trait QA remains active.

## NPC-Q-v28-1 — NO POTENTIAL / HIDDEN TRAIT PROMISE

FAIL if active player UI exposes:
- 성장 잠재력
- potential-derived growth labels
- 남은 특성
- copy promising Loyalty will reveal hidden Traits

Current Traits remain readable from the start.

## NPC-Q-v28-2 — TRUSTED REGULAR SINGLE THRESHOLD

Expected:
    Loyalty >= 51 -> Trusted Regular / 단골

PASS:
- badge/state/copy uses the owner judgement
- LUST uses the same state
- arrival regular Flavor does not require a separate 60 threshold

Other support-specific thresholds remain their own conditions and do not redefine 단골.

## NPC-Q-v28-2B — ORDINARY PURCHASE LOYALTY

For one successful ordinary paid purchase before explicit modifier effects:

    50% sale  -> Loyalty +6
    100% sale -> Loyalty +1
    150% sale -> Loyalty -3

PASS:
- refusal does not apply the purchase Loyalty delta
- explicit Trait / Store Support modifiers apply only through their owned rules
- UI / Help exact copy matches COPY_AUDIT_APPROVED_v2.8.0.md

## NPC-Q-v28-3 — LOYALTY MEANING

Normal SALE:
- compact Loyalty value/state remains visible
- no dedicated Loyalty `?` / on-demand popover is present

Tutorial/coach states:
- higher Loyalty increases purchase intent
- higher Loyalty increases revisit weighting
- threshold 51 = 단골

Boss-specific meaning still obeys reveal timing.
Global compact Help may retain its separately owned reference wording.

FAIL:
- normal SALE restores a separate Loyalty `?` / popover trigger
- tutorial claims Loyalty directly increases Core Stats
- unrevealed Boss-specific information leaks

## NPC-Q-v28-4 — DIALOGUE DOES NOT INVENT PURCHASE PREFERENCE

Active v2.8 pools must not contain:
- 겁쟁이 -> 귀환석 purchase request
- 대식가 -> Food purchase-intent request
- 탐욕 -> expensive/Rare purchase preference
- 단골 -> favorite-product request

PASS uses the exact replacements in COPY_WORLD_VOICE_v2.8.

## NPC-Q-v28-5 — HELPED CALLBACK REQUIRES ITEM PROOF

Trait-only or generic previous-result events do not unlock a \`지난 보급이 도움 됐다\` callback.

A previous result with proven sold-Item contribution may unlock it.

No new Gameplay RNG draw is introduced.


## NPC-Q-v28-6 — DEEP NPC REWARD BASELINE

Deep Success:
    EXP +40
    NPC Wallet +60G

Deep Great Success:
    EXP +80
    NPC Wallet +120G

PASS:
- Great Success bonus is 2× Success on both channels
- ordinary resolved reward/consequence still applies
- failed Deep outcomes receive no special Deep bonus
- no automatic Level +1
- no Day/Tier multiplier
- no Deep-only stored Wallet/currency

## NPC-Q-v28-7 — JOB BASE / GROWTH TABLE EXACT

Expect exactly the six Job rows in NPC_TRAIT_v2.8.0.md.

For a controlled NPC:
- Lv1 Stats equal the Job row
- each Level uses Job Growth × that NPC's existing internal Potential
- no hidden Job passive changes the result
- Job Mastery does not mutate Job Base/Growth

FAIL:
- inherited PASS3 placeholder table is treated as optional
- Mastery directly multiplies this table

## NPC-Q-v28-8 — NON-PURCHASE LOYALTY / REVISIT

PASS:
- finalized ordinary visit -> Loyalty +1
- living expedition result -> Loyalty +2
- Death -> no survival +2
- purchase Loyalty remains separate
- final Loyalty remains clamped 0–100
- ordinary purchase formula receives +0.002 per Loyalty point
- returning-NPC revisit weight includes ×(1 + Loyalty×0.025)
- other explicit Trait/Store Support revisit modifiers compose once
- Loyalty never guarantees a revisit

## NPC-Q-v28-9 — JOB MASTERY SPAWN MODEL

For Mastery ranks 0–7, expect mutually exclusive +1/+2/+3 Level probabilities:

| Mastery | +1 | +2 | +3 |
|---:|---:|---:|---:|
| 0 | 0% | 0% | 0% |
| 1 | 5% | 0% | 0% |
| 2 | 10% | 0% | 0% |
| 3 | 15% | 5% | 0% |
| 4 | 20% | 10% | 0% |
| 5 | 25% | 15% | 0% |
| 6 | 30% | 20% | 5% |
| 7 | 35% | 25% | 10% |

PASS:
- ordinary spawn Level resolves before Mastery bonus
- only the generated NPC's own Job Mastery applies
- exactly one Mastery roll is consumed per spawn, including rank 0
- outcomes never stack
- an already-created NPC is never retroactively changed
- no account-wide combat multiplier exists
- Player-facing meaning does not expose the exact table unless separately approved
