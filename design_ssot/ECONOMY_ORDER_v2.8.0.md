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

## FULL-CHAIN NUMERIC CLOSURE — SALE ACCEPTANCE / OPERATING COST / ORDER PITY

USER_APPROVAL_DATE=2026-09-20

These rules close inherited PASS3 / Source-only economy behavior as the required v2.8 baseline.
The exact purchase probability remains hidden from the Player.

### Ordinary SALE purchase acceptance — exact hidden calculation

For an offered Item:

    judgedPrice
    = round(Item list sell price × mode intent multiplier)

Mode intent values:

| Mode | charged multiplier | intent multiplier | flat intent |
|---|---:|---:|---:|
| 50% 할인 | 0.50 | 0.50 | +0.18 |
| 정가 | 1.00 | 0.65 | 0 |
| 바가지 | 1.50 | 1.50 | -0.16 |

Base need:

    fit
    = sum of positive Item Counter values for this customer's actual Gate Hazards

    need
    = 0.53 + min(0.29, fit × 0.012)

Then apply only current owned modifiers:
- injured customer + Insurance: +0.25
- one Bag slot already filled: -0.10
- Trait buyBias
- Trait priceBias when judgedPrice > 120G
- Trait Rare/Common bias by Item Rarity
- Trait overcharge bias on 150%
- applicable Store Support modifier
- applicable Event demand modifier

Affordability:

    effectiveWallet
    = Persistent NPC Wallet + current temporary Event budget

    actualDebit
    = max(0, chargedPrice - applicable owned guarantee support)

    burden
    = max(0, judgedPrice - applicable owned guarantee support)
      / max(1, effectiveWallet)

If effectiveWallet < actualDebit:

    purchaseChance = 0

Otherwise:

    purchaseChance
    = clamp(
        need
        + Loyalty × 0.002
        + mode flat intent
        + burdenIntentBonus,
        0.08,
        0.97
      )

Where:

    burdenIntentBonus
    = modeIntentWeight × max(0, modeIntentPivot - burden)

The term is a bonus only. A burden at or above the pivot contributes 0; it never subtracts.
Affordability is already decided by the effectiveWallet < actualDebit gate above.

Only 정가 has the burden term:

    modeIntentPivot = 0.36
    modeIntentWeight = 0.50

50% 할인 and 바가지는:

    modeIntentWeight = 0

This probability is internal Design Truth.
Player-facing information remains governed by SALE/UI information-boundary rules and must not show
the exact acceptance chance.

### Base operating cost — exact

Core Roster:
- alive adventurers only
- sort by Level descending, then Rarity descending
- use the top 6
- if fewer than 6 are alive, use all
- recovering adventurers remain alive and therefore remain in the Core Roster

Let:

    avgLevel  = Core Roster average Level, or 1 if empty
    avgRarity = Core Roster average numeric Rarity index, or 0 if empty

    dayBase = 90 + 2 × (Day - 1)

    overheadBase
    = dayBase
      × (1 + 0.02 × (avgLevel - 1))
      × (1 + 0.06 × avgRarity)

Current Store Support/Event flat or percentage modifiers apply only through their own owner rules.

Final daily operating cost:

    round((overheadBase + applicable owned modifiers) / 10) × 10

An Event that explicitly sets operating cost to 0 overrides the final charge for that Day.

The stale standalone fixed `operating=60` data value is not an alternate operating-cost truth.

### ORDER Rare+ pity — exact

Pity counts canonical offer-set generations that contain no Rare+ Item.

After 5 consecutive qualifying offer sets without Rare+:

    Rare Rarity weight +3

for the next qualifying offer generation.

If that generated set contains Rare+:
- Rare pity resets to 0

Otherwise:
- pity continues

This modifier sits on top of the current Day-band Rarity table.
It does not replace or renormalize the table into a second progression system.

Canonical Full-offer Reroll:
- does not advance pity
- cannot be used to farm pity
- retains the same current-Day eligibility/Rarity rules

### Known-Hazard Counter pity — exact

Track each currently known Hazard independently.

For each qualifying normal offer-set generation:
- if at least one offered Item validly Counters that Hazard -> its missing count resets
- otherwise -> its missing count +1

When any known Hazard reaches 3 consecutive missing sets:
- replace one ordinary offer slot with one legal/unlocked Item that validly Counters a currently
  missing known Hazard
- preserve total offer count
- do not reveal an unknown Hazard
- reset covered missing state through the same resulting offer truth

Reroll does not advance these pity counters.

This base pity is separate from the stronger `길드24 원정전문점 인증` guarantee owned by RELIC.
