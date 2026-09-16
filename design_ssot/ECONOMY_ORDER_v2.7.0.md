# ECONOMY_ORDER

DOC=ECONOMY_ORDER
OWNER=economy,order,gold,wallet,offer,reroll,tier_forecast,gate_count_forecast,rarity_progression
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ECONOMY_ORDER_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Wallet, Price Mode, Order confirm/start-sale separation, Reroll, Gold, offer, quantity, warehouse, same-day arrival, operating-cost, and other economy/order rules inherit `ECONOMY_ORDER_v2.6.1.md`.

This patch changes:
- next-day preparation forecast contract
- Day-band Item Rarity progression for ORDER offers

## NEXT-DAY FORECAST — EXACT v2.7

Before ORDER commitment, MORNING must expose both:

1. next-day Gate-count forecast
2. next-day Tier forecast

The same information may remain available compactly in ORDER so the Player does not need to navigate back to remember it.

Design intent:

```text
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
```

### NEXT-DAY GATE COUNT FORECAST

If the next Day's Gate count is randomized by the current canonical Day/Gate generation rule, expose the exact probability distribution for each possible Gate count.

Example presentation:

```text
게이트 수
2개 65% · 3개 35%
```

If the next Day's Gate count is deterministic, expose the fixed count instead of a fake probability distribution.

Example:

```text
게이트 수
2개 확정
```

Rules:
- forecast probabilities must come from the same current seeded/run generation rules that will actually determine the next Day
- Save/Load must not create an independently rerollable forecast
- forecast may inform stock quantity, cash reserve, reroll willingness, and inventory planning
- do not reveal next-day Family
- do not reveal exact next-day Gate identities/composition
- do not reveal next-day Hazard set

### NEXT-DAY TIER FORECAST

Retain the existing exact T1/T2/T3 probability forecast:

```text
게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

Rules:
- use the same canonical next-day Tier generation distribution that will govern the next Day
- this remains a future-risk signal, not an expedition success probability
- do not reveal exact next-day Gate result

### INFORMATION BOUNDARY

Current-day open Gate / known Hazard remains the primary preparation context for today's ORDER.

Next-day Gate Count + Tier Forecast is secondary future information.

Keep hidden:
- next-day Family
- exact next-day Gate composition
- next-day Hazard set
- future visitor identities
- future NPC destination
- expedition success/death probability
- recommended SKU/category/quantity

The forecast informs planning without revealing the future solution.

## MORNING / ORDER PRESENTATION CONTRACT

MORNING exposure is required.

Recommended compact structure:

```text
내일 전망

게이트 수
1개 xx% · 2개 xx% · 3개 xx%

게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

Fixed impossible counts may be omitted from presentation.
Exact visual layout is owned by `UI_UX_v2.7.0.md`.

ORDER may repeat the forecast compactly as decision context.

## ORDER RARITY PROGRESSION — EXACT v2.7

The inherited fixed all-Run Rarity weight table is superseded.

ORDER offer Rarity shifts by Day band so the catalog itself communicates progression without a separate D20 hard-unlock rule for the new Epic preparation Items.

Exact normalized weights:

| Day | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| D1–3 | 68% | 24% | 7% | 1% | 0% |
| D4–7 | 63% | 25% | 11% | 1% | 0% |
| D8–12 | 58% | 27% | 12% | 2% | 1% |
| D13–19 | 53% | 27% | 15% | 4% | 1% |
| D20–24 | 46% | 26% | 17% | 10% | 1% |
| D25–29 | 39% | 25% | 19% | 16% | 1% |
| D30 | 34% | 24% | 21% | 20% | 1% |

Rules:
- every row sums to exactly 100%
- new v2.7 Epic preparation Items use the ordinary Epic pool; they do **not** receive a separate D20 hard unlock
- early Epic appearance is intentionally possible but rare
- D20+ is where Epic becomes a normal late-Run preparation consideration because the shared Epic weight rises materially
- Legendary remains exceptional and does not scale with late-Run danger beyond the exact 1% rows above
- existing unlock/meta eligibility still applies before Rarity selection where another current owner explicitly requires it
- Reroll uses the same current-Day Rarity band; it does not bypass Day progression
- pity/guarantee systems, where inherited and still valid, must operate on top of this current Day-band truth rather than restoring the old fixed table

Design intent:

```text
초반 = Common/Uncommon 중심
중반 = Rare가 정상 선택지
후반 = Rare/Epic 혼합
Final = 고급 준비물이 자주 보이지만 Legendary는 여전히 예외
```

The purpose is not to make Epic mandatory.
The purpose is to make late-Run high-slot-efficiency preparation actually appear often enough to become a decision.

## RELATED

Gate-count / Tier generation -> `DUNGEON_HAZARD_v2.7.0.md`
Morning / Order presentation -> `UI_UX_v2.7.0.md`
Item catalog / Rarity identities -> `ITEM_v2.7.0.md`
Economy/Order QA -> `ECONOMY_ORDER_QA_v2.7.0.md`