# ITEM

DOC=ITEM
OWNER=item,catalog,food,drink,potion,field_gear,insurance,special,item_role,item_economy
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=ITEM_v2.7.0.md
PATCH_TYPE=CORE_READABILITY_REBALANCE

## INHERITANCE

All unchanged v2.7 Item category, Counter, Potion, Insurance, Fresh-composition and information rules
inherit ITEM_v2.7.0.md.

This patch changes the active meal/water identity line and its first v2.8 balance baseline.

## ROLE SPLIT — EXACT

Meal / 도시락 line:
- Supply is the primary identity
- 강인함 is secondary
- higher tiers represent a more complete expedition meal
- no direct Fatigue-reduction effect is created
- U/R may invest in the NPC's future Wallet

Water line:
- Drink identity
- low Supply
- 강인함-focused Stat route
- comparable in structure to mobility/spirit stat Drinks, not to a meal or Potion

Thus:
- meal asks: do I spend a slot on Supply plus broad survival?
- water asks: do I spend a slot on concentrated 강인함 with little Supply?

## ACTIVE REPLACEMENT IDS

Keep active catalog count = 40 and reuse existing IDs:

    rice        -> 삼각김밥
    water       -> 생수
    bar         -> 간단 도시락
    premium     -> 길드 특제 도시락
    battlelunch -> 영웅 결전 도시락
    herobar     -> 왕도 천연암반수

No new catalog slot is added.

For current internal saves, these IDs resolve to the new v2.8 identities.
Only the current v2.8 identities are active for these IDs.

## CURRENT ITEM ART IDENTITY — EXACT

Save-safe internal ID reuse must preserve the current Item's visible identity.

Required icons:
- `bar` / 간단 도시락 -> simple meal/lunchbox icon in the existing Item-art language
- `herobar` / 왕도 천연암반수 -> bottled/mineral-water icon in the existing Item-art language

Do not use a Hotbar / skewered-stick silhouette for either ID.

This is a visual identity correction only.
Category, Rarity, price, effect, shelf life and save ID do not change.

## DIRECTOR DOCUMENT BASELINE — EXACT

| ID | Item | Category/Rarity | Buy / Sell | Effect | Shelf |
|---|---|---|---:|---|---:|
| rice | 삼각김밥 | Food C | 35 / 70 | 강인함 +6, Supply 5 | 2d |
| water | 생수 | Drink C | 40 / 85 | 강인함 +10, Supply 2 | 5d |
| bar | 간단 도시락 | Food U | 85 / 180 | 강인함 +10, Supply 6, 원정 소지금 획득 +20% | 2d |
| premium | 길드 특제 도시락 | Food R | 160 / 340 | 강인함 +14, Supply 7, 원정 소지금 획득 +40% | 2d |
| battlelunch | 영웅 결전 도시락 | Food E | 210 / 440 | 강인함 +18, Supply 9 | 2d |
| herobar | 왕도 천연암반수 | Drink E | 185 / 390 | 강인함 +20, Supply 2 | 5d |

The meal Stat ladder is intentionally readable:

    6 -> 10 -> 14 -> 18

The water route is intentionally more Stat-concentrated than the meal at the same broad stage,
while keeping much lower Supply.

## ACTIVE RARITY DISTRIBUTION — EXACT

The approved `bar` repurpose is Uncommon.

The active 40-Item distribution is therefore:

    Common 11
    Uncommon 12
    Rare 5
    Epic 11
    Legendary 1

Do not move another Item solely to alter these approved Common/Uncommon counts.

## NPC WALLET GAIN — EXACT SCOPE

간단 도시락:
    existing expedition loot modifier +0.20

길드 특제 도시락:
    existing expedition loot modifier +0.40

Composition:
- additive with other modifiers that already use the ordinary expedition loot channel
- no new cap
- two eligible modifiers may add together if the Bag actually contains them

Applies only to the ordinary resolved NPC expedition-Wallet reward.

Does not multiply:
- Deep Expedition bonusWallet
- Store Support direct Wallet grants
- Event purchase budget
- Store Gold / commission / subsidy
- any other non-expedition-loot Wallet source

Player-facing term:
    원정 소지금 획득 +20%
    원정 소지금 획득 +40%

Do not say current 소지금 +20% / +40%.

## FRESH / FOOD AFFINITY

The new Food/Drink positive Core-Stat values use the existing v2.7 base-additive composition rules.

No new exception is created:
- Food affinity may modify eligible positive native Food Stat
- Fresh Store Supports may modify eligible positive native Food/Drink Stat
- Supply remains its own channel
- Wallet-gain effect remains its own loot/economy channel

## REPLACEMENT ID BOUNDARY

For `bar` / `herobar`:
- no direct Fatigue-reduction role is active
- no hidden Hotbar role is active
- no Hotbar name is a Player-facing alias

## BALANCE STATUS

The table above is the approved v2.8 DIRECTOR DOCUMENT BASELINE.

After Source adoption, price/efficiency may be measured.
Any later change requires a new approved ITEM amendment; QA does not auto-tune it.


## REPLACEMENT ITEM FLAVOR — EXACT

ID reuse uses the current replacement Flavor below.

\`bar\` / 간단 도시락:
    반찬은 단출하지만 빈칸은 없다.

\`herobar\` / 왕도 천연암반수:
    왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.

The existing compatible Flavor for 삼각김밥 / 생수 / 길드 특제 도시락 / 영웅 결전 도시락
may remain unless a later approved Copy pass changes it.

Do not preserve Hotbar/skewer wording on the replacement IDs.
