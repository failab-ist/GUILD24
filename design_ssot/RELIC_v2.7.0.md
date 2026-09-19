# RELIC

DOC=RELIC
OWNER=relic,store_build,utility,foundation,hybrid,keystone,sloth_window
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=RELIC_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Relic acquisition windows, candidate generation, defer, save stability, build axes, non-Fresh blueprints, and Sloth window lifecycle inherit `RELIC_v2.5.0.md`.

This patch changes v2.7 build-value interpretation, Fresh values/scope, Expedition category filters, D30 Final-information ordering, and stale Reroll-price examples that no longer match the current Economy owner.

## RELIC POWER / BUILD HIERARCHY

Use the project influence hierarchy as:

```text
NPC Base / Level / Growth / Equipment
> Sold Item
> single Store Support
> Event
> Trait
```

Therefore one Relic's same-moment direct expedition contribution should be smaller than one appropriate Item's own contribution.

But Relic is a Run-wide Store Build system. A coherent multi-Relic build may and should exceed one Item through repeated economy/access/growth/item-value effects.

Target feel:

```text
1 Piece = direction visible; small immediate effect
2 Pieces = operation meaningfully changes
3 Pieces = Build Engine; cumulative Run value clearly exceeds one Item
4 Pieces = strong completed Build; Order/Sale/Inventory/NPC investment changes visibly
5+ Pieces = rare high-roll; do not normalize automatically
```

For build effects that can be meaningfully expressed as Final Party Power, a coherent 3~4 Piece build may create roughly +10~20 Party-equivalent direct/indirect difference as a `DIRECTOR DOCUMENT BASELINE` measurement target.

Do not implement this by adding generic Power to every Relic.
Economy/visitor/order builds should express value through their actual channels.

## REROLL RELIC ECONOMY OVERRIDE

`발주 교환권` keeps its existing functional identity:

```text
each Day's first canonical Full-offer Reroll = 0G
free use consumes the first daily Reroll step
```

All paid Reroll costs after that use the current authoritative curve from `ECONOMY_ORDER_v2.6.1.md`.

With the current curve:

```text
normal: 50 -> 100 -> 200 -> 400 -> 800 -> x2 thereafter
with 발주 교환권: 0 -> 100 -> 200 -> 400 -> 800 -> x2 thereafter
```

The inherited v2.5 example `0 -> 60 -> 120 -> 240 ...` is superseded and is not v2.7 Design Truth.
Reroll still does not advance pity.

## FRESH — LARGE FRIDGE

`대형 냉장고`:

```text
base Price = 200G
Food/Drink shelf life +1 day
existing eligible non-expired stock extends once on acquisition
future eligible stock enters with the extension
```

No Stat/Supply multiplier is added to this Relic.
No repeated daily extension.

## FRESH — INSTANT FOOD CORNER

`DIRECTOR DOCUMENT BASELINE`

`즉석식품 코너`:

```text
Food/Drink positive native Core-Stat contribution +40%
Supply unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
```

Positive native Core Stat means the Item's own positive contribution to 투력/강인함/기동/정신 before unrelated effects.

## FRESH × EXPEDITION — EXPEDITION MEAL CORNER

`DIRECTOR DOCUMENT BASELINE`

`원정 도시락 코너`:

```text
if a Food/Drink explicit Hazard Counter matches the actual current destination Hazard:
  matching Counter +25%

if active Supply Burden exists and that Food/Drink supplies >0:
  positive native Core-Stat contribution +25%

Supply itself unchanged
```

No universal Hazard solution.
No boost merely because the Item is Food/Drink.

## FRESH — CHILLED SHOWCASE / DAWN DELIVERY

`냉장 쇼케이스` keeps its existing identity:
- Uncommon+ Food/Drink offer weight support
- shelf-life relief

`새벽 공동배송` keeps its existing same-SKU Food/Drink bulk-order identity.

Category checks must use v2.7 Food/Drink categories rather than stale legacy `fresh` category aliases.

## FRESH KEYSTONE — 24H FRESH SYSTEM

`DIRECTOR DOCUMENT BASELINE`

`24시간 신선체계`:

```text
Food/Drink shelf life +2 days
Food/Drink positive native Core-Stat contribution +80%
Supply unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
```

Fresh native-Stat bonuses stack additively from the Item's base native positive Stat.

Examples:

```text
즉석식품 코너 +40%
24시간 신선체계 +80%
=> base positive native Stat ×2.20
```

When `원정 도시락 코너`'s active-Supply condition also applies:

```text
+40% +80% +25%
=> base positive native Stat ×2.45
```

Food-affinity Trait percentages that target the same positive native Core-Stat channel join this same base-additive pool under `ITEM_v2.7.0.md`.
Do not multiply a completed Fresh percentage layer by `대식가/소식가` as a second sequential layer.

This high point is an allowed coherent-build reward.

## VISITOR RELICS — v2.7 EXPLICIT OVERRIDE

`DIRECTOR DOCUMENT BASELINE`

These two Relics are redefined here. This section **supersedes** any earlier visitor effect for
them in the base chain; where the inherited document still describes a flat visitor bonus, this
override is the current truth.

The two answer different questions and neither is a strict upgrade of the other.

### board — 길드 전광판

Role: raise the floor of a bad Morning.

It applies to the **base visitor roll only**, before any other modifier:

```text
base 3 -> 4
base 4 -> 4
base 5 -> 5
base 6 -> 6
```

Rules:
- this is a floor of 4 on the base roll, not a floor of 4 on the final visitor count
- no separate chance roll is made
- other modifiers (Relic, Decoration, Event, Contract) apply afterward as they already do
- the available-adventurer limit still caps the actual seating

### hub — 지역 거점점 계약

Role: pay overhead to widen the catchment.

One roll each Morning, three mutually exclusive outcomes:

```text
30%  visitors +1
 5%  visitors +2
65%  no addition
```

Operating cost:

```text
overheadBase + overheadBase × 0.10 + other flat extras
```

then the existing operating-cost rounding rule.

The 10% applies to `overheadBase` only. It must not be applied again to other Event or Relic
flat modifiers, and it does not compound with them.

### COMPOSITION

`board`, `hub` and the `wall` Decoration are independent and may all be held at once.

```text
board = base-roll floor
hub   = probabilistic catchment, paid for in overhead
wall  = 10% Morning proc (Decoration, not a Relic)
```

They share no ownership, no purchase candidacy and no slot. Holding more than one simply applies
each in its own place: the board floor first on the base roll, then the probabilistic additions.

## EXPEDITION RELIC CATEGORY MIGRATION

`긴급보급 선반` category filter becomes:

```text
Potion / Field Gear / Insurance
```

The stale `Medical` category no longer exists.

Other Expedition Relics that inspect Item functional role continue to use actual Counter/Insurance functionality rather than physical item shape.

Item categories -> `ITEM_v2.7.0.md`.

## D30 INFORMATION ORDER

The v2.5 wording that reveals Final Families on D30 is superseded.

v2.7:
- exact Final Family Pair/Hazard Pool is generated and revealed on D25 by `FINAL_EXPEDITION_v2.7.0.md`
- D30 reuses that persisted state
- D30 Relic focused reveal/decision occurs with the already-known persisted Final state
- if Boss=SLOTH, the D30 Seal choice still shares the same D30 Relic window and remains mutually exclusive with Relic acquisition

No D30 Family reroll/reveal generation occurs.

## SLOTH WINDOW VALUE BOUNDARY

Relic owns only the mutually exclusive window lifecycle:
```text
Relic acquisition OR Seal Break
```

Boss Power by committed break count is owned by `BOSS_v2.7.0.md`.
Do not duplicate SLOTH Boss Power numbers here.

## RELATED

Item/category/composition -> `ITEM_v2.7.0.md`
Economy/Reroll -> `ECONOMY_ORDER_v2.6.1.md`
Order/UI -> `UI_UX_v2.7.0.md`
D25 Final state -> `FINAL_EXPEDITION_v2.7.0.md`
Sloth Boss value -> `BOSS_v2.7.0.md`
