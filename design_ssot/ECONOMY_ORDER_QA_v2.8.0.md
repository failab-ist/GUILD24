# ECONOMY / ORDER QA

DOC=ECONOMY_ORDER_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=ECONOMY_ORDER_QA_v2.7.0.md
PATCH_TYPE=V2_8_NUMERIC_COHERENCE_QA

## INHERITANCE

All non-conflicting v2.7 Economy / Order QA remains active.

## ECO-Q-v28-1 — GREAT SUCCESS STORE GOLD

Expected ordinary Great Success Store-Gold bonus:

    D1-10   50G
    D11-20  100G
    D21-30  200G

PASS:
- ordinary Success adds 0 Great-Success Store Gold
- ordinary Great Success adds the exact Day-band amount once
- Deep Great Success adds 0 Store Gold
- the bonus does not mutate NPC Wallet
- the bonus is not counted as sale revenue

FAIL:
- inherited 100 / 200 / 300G remains active
- the same Great Success pays twice

## ECO-Q-v28-2 — DEEP SPONSORSHIP RETAINED

Expected:

    base 350G
    rarity step 0.20
    level step 0.05
    rounding 10G

No v2.8 cost increase is applied implicitly.
