# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast,gate_count_forecast,rarity_progression,final_price,great_success_store_gold,deep_sponsorship
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ECONOMY_ORDER_v2.7.0.md
PATCH_TYPE=V2_8_NUMERIC_COHERENCE_REBALANCE

## INHERITANCE

All unchanged v2.7 Economy / Order / Wallet / pricing / Final-preparation rules inherit
`ECONOMY_ORDER_v2.7.0.md` and its base chain.

## GREAT SUCCESS STORE GOLD — DIRECTOR DOCUMENT BASELINE

Great Success remains a deliberate reward for strong preparation, but its direct Store-Gold reward
is reduced so NPC growth and Store economy do not compound too aggressively in already-strong Runs.

Exact ordinary-expedition bonus:

    D1-10   = +50G
    D11-20  = +100G
    D21-30  = +200G

Rules:
- only an actual ordinary Great Success grants this Store Gold
- ordinary Success grants no Great-Success Store-Gold bonus
- Deep Expedition Store Gold remains 0
- the bonus is direct Store Gold; it is not NPC Wallet and is not sale revenue
- the bonus does not require a same-Day sale
- it is granted exactly once for the resolved expedition

This supersedes the inherited 100 / 200 / 300G band.

Great Success probability and NPC growth reward are not reduced by this economic adjustment.
Those remain owned by DUNGEON_HAZARD_v2.8.0.md and the inherited growth rules.

## DEEP SPONSORSHIP — EXACT RETAINED BASELINE

The inherited sponsorship formula remains current:

    sponsorship
    = 350G
      × (1 + 0.20 × NPC rarity index)
      × (1 + 0.05 × (Level - 1))

Round to the nearest 10G under the existing rule.

No v2.8 sponsorship-cost increase is introduced.

Deep difficulty/occurrence -> DUNGEON_HAZARD_v2.8.0.md.
Deep NPC reward -> NPC_TRAIT_v2.8.0.md.
