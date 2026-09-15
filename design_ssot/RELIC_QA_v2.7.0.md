# RELIC_QA

DOC=RELIC_QA
OWNER=qa,relic,store_build,fresh,sloth_window
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=RELIC_QA_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here.

## REL-Q70 — SINGLE RELIC VS BUILD VALUE

PASS direction:
- one Relic's same-moment direct expedition contribution does not exceed an appropriate Item merely by being a Relic
- coherent 3+ Piece builds can create cumulative Run value clearly larger than one Item
- no generic hidden Power is added to every Relic to force this result

Track value through actual channels: Gold, Item access/quality, waste, visits, NPC growth, Final Party Power.

## REL-Q71 — BUILD ENGINE TARGET

Across seeded builds:
- 1 Piece = direction visible
- 2 Pieces = operation meaningfully shifts
- 3 Pieces = build engine
- 4 Pieces = strong completed build
- 5+ Piece high-roll may remain unusually strong

For directly power-observable coherent builds, +10~20 Party-equivalent direct/indirect difference at 3~4 Pieces is an initial measurement target, not a hidden runtime bonus.

FAIL:
Relic build choice changes labels but not actual Order/Sale/Inventory/NPC investment behavior.

## REL-Q72 — LARGE FRIDGE

EXPECT:
- base price 200G
- Food/Drink shelf life +1
- existing non-expired eligible stock extends once on acquisition
- future stock receives extension
- no Stat/Supply multiplier
- no repeated daily extension

## REL-Q73 — INSTANT FOOD CORNER

EXPECT:
Food/Drink positive native Core Stat +40%.

PASS:
- Supply unchanged
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty unchanged

## REL-Q74 — EXPEDITION MEAL CORNER

When Food/Drink explicit Counter matches actual current destination Hazard:
- matching Counter +25%

When active Supply Burden exists and Item supplies >0:
- positive native Core Stat +25%

PASS:
- Supply itself unchanged
- no bonus when conditions are false
- no universal Counter solution

## REL-Q75 — 24H FRESH SYSTEM

EXPECT:
- Food/Drink shelf life +2
- positive native Core Stat +80%
- Supply unchanged
- Counter unchanged

Stacking with Instant Food Corner uses base-additive bonuses:
```text
+40% +80% => base ×2.20
```

With active Expedition Meal stat condition:
```text
+40% +80% +25% => base ×2.45
```

PASS: no multiplicative drift.

## REL-Q76 — CHILLED SHOWCASE / DAWN DELIVERY CATEGORY

PASS:
- eligibility uses v2.7 Food/Drink categories
- no stale legacy `fresh` category dependency
- their unchanged offer/shelf/bulk identities remain intact

## REL-Q77 — EXPEDITION SHELF CATEGORY MIGRATION

`긴급보급 선반` targets exactly:
```text
Potion / Field Gear / Insurance
```

PASS:
- no Medical category dependency
- no retired Mana/Special proxy for Potion

## REL-Q78 — D25 FINAL INFO / D30 WINDOW

Reach D25 then D30.

PASS:
- exact Final Family/Hazard state is already known/persisted from D25
- D30 Relic window does not generate/reroll a Family Pair
- D30 candidate relevance reads the persisted Final state
- SLOTH D30 Seal option still shares the same mutually exclusive window

## REL-Q79 — SLOTH WINDOW OWNERSHIP

PASS:
- existing exactly-3 opportunity lifecycle remains
- one window yields at most one of [Relic, Seal Break]
- RELIC does not implement/duplicate Boss Power by break count
- Boss Power comes only from `BOSS_v2.7.0.md`

## REL-Q80 — FRESH DOES NOT DELETE SPECIALISTS

Full-run/targeted comparison:
PASS direction:
- completed Fresh build materially changes Food/Drink choices
- dedicated Field Gear remains stronger/reliable on its narrow Hazard target unless the actual combined build tradeoff justifies the Food/Drink alternative
- Fresh is powerful through coherent build accumulation, not one universal Food item
