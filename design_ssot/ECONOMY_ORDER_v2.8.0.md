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

The approved playtest-response formula is:

    sponsorship
    = 200G
      × (1 + 0.20 × NPC rarity index)
      × (1 + 0.05 × (Level - 1))

Round to nearest 10G under the existing rule.

Only the base changes 350G -> 200G.
Rarity step, Level step and rounding remain unchanged.
No compensating Deep reward/difficulty rebalance is introduced.

Deep difficulty/occurrence -> DUNGEON_HAZARD_v2.8.0.md.
Deep NPC reward -> NPC_TRAIT_v2.8.0.md.

## FULL-CHAIN NUMERIC CLOSURE — SALE ACCEPTANCE / OPERATING COST / ORDER PITY

USER_APPROVAL_DATE=2026-09-20

These rules close inherited PASS3 / Source-only economy behavior as the required v2.8 baseline.
The exact purchase probability remains hidden from the Player.

### Ordinary SALE purchase acceptance — exact hidden calculation

For an offered Item:

Accessible modes:
    50% 할인 / 정가

Accessible-mode base need:
    need = 0.80

For 바가지, preserve the existing pre-amendment need calculation:

    fit
    = sum of positive Item Counter values for this customer's actual Gate Hazards

    need
    = 0.53 + min(0.29, fit × 0.012)

Mode values remain:

| Mode | charged multiplier | intent multiplier | flat intent |
|---|---:|---:|---:|
| 50% 할인 | 0.50 | 0.50 | +0.18 |
| 정가 | 1.00 | 0.65 | 0 |
| 바가지 | 1.50 | 1.50 | -0.16 |

For every mode:

    judgedPrice
    = round(Item list sell price × mode intent multiplier)

This judgedPrice is the same existing hidden comparison value used by the owned price-sensitive
Trait logic. It does not change the charged amount.

Apply current owned modifiers:
- injured customer + Insurance: +0.25
- Trait buyBias
- Trait priceBias when judgedPrice > 120G
- Trait Rare/Common bias by Item Rarity
- Trait overcharge bias on 150%
- applicable Store Support modifier
- applicable Event demand modifier

The former one-Bag-slot-filled -0.10 purchase modifier is retired.
The two-slot Bag is the capacity decision by itself.

Loyalty remains:
    +0.002 purchase chance per current Loyalty point

Affordability:

    effectiveWallet
    = Persistent NPC Wallet + current temporary Event budget

    actualDebit
    = max(0, chargedPrice - applicable owned guarantee support)

If effectiveWallet < actualDebit:
    purchaseChance = 0

Otherwise:

For 정가 only:

    burden
    = max(0, judgedPrice - applicable owned guarantee support)
      / max(1, effectiveWallet)

    burdenIntentBonus
    = 0.50 × max(0, 0.36 - burden)

For 50% 할인 and 바가지:
    burdenIntentBonus = 0

For every affordable mode:

    rawChance
    = need
      + Loyalty × 0.002
      + mode flat intent
      + burdenIntentBonus
      + applicable current modifiers

For affordable 50% 할인 / 정가, if the Item validly Counters at least one Hazard of this customer's
actual Gate under the game's canonical Counter semantics:

    purchaseChance = 0.97

This final Counter floor/cap applies even when a negative purchase Trait would otherwise lower
rawChance.

For non-Counter 50% 할인 / 정가:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

For 바가지:
    purchaseChance = clamp(rawChance, 0.08, 0.97)

No new Counter floor is added to 바가지.

Reuse canonical Counter truth; do not maintain a second narrower purchase-only definition.
Existing mobility-based answers for bind/mire remain valid wherever the canonical Counter predicate
recognizes them.

Exact acceptance probability remains hidden from the Player.

### Ordinary NPC Wallet on visit — exact

When a selected NPC arrives for an ordinary visit:

Fresh NPC:
    Wallet = min(2000, round(180 + Level × 8 + randomInt(0, 100)))

Returning NPC:
    Wallet = min(2000, round(existing Wallet + Level × 8 + randomInt(0, 100)))

Rules:
- random range is inclusive 0..100 under the existing integer RNG convention
- Level ×8 remains
- persistent Wallet carries between visits
- 2000 cap remains
- explicit Trait / Event / Store Support Wallet effects remain separate under their owners
- failed-expedition Loot is unchanged by this amendment
- re-measure the failure -> low Wallet -> under-supplied -> failure loop before further reward tuning

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
