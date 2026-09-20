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

## NPC-Q-v28-3 — LOYALTY MEANING

The on-demand Loyalty explanation states:
- purchase intent
- revisit
- threshold 51

And only when currently applicable/revealed:
- owned Store Support condition
- revealed LUST condition

No Boss leak before reveal.
