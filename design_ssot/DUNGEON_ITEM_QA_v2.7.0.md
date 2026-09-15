# DUNGEON_ITEM_QA

DOC=DUNGEON_ITEM_QA
OWNER=qa,dungeon,item,hazard,preparation,fatigue,supply
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=DUNGEON_ITEM_QA_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here. This patch supersedes stale v2.5 expectations for third-slot, Medical category, Potion/Injury line, Item catalog, and Fatigue/Supply values.

## DUN-Q70 — PREPARED POWER WEIGHTS

Controlled Stats with no other modifiers.

EXPECT ordinary expedition prepared ability:
```text
투력 .50 + 강인함 .34 + 기동 .27 + 정신 .20
```

PASS:
- Forecast uses these weights
- Resolve uses these weights
- Great Success prepared margin/signal uses the same weights
- no stale `.58/.32/.24/.16` ordinary path remains

## DUN-Q71 — HAZARD THREAT CURVE

EXPECT:
```text
Threat = 12 + Day*.35 + (Tier-1)*6
```

Exact anchors:
- D1 T1 = 12.35
- D12 T1 = 16.20
- D18 T2 = 24.30
- D24 T2 = 26.40
- D29 T3 = 34.15
- D30 T2 = 28.50

PASS: runtime threat matches.

## DUN-Q72 — TIER PREPARATION TARGET

Representative neutral-fit NPCs:
- T1 lower/basic response can reach 충분; hybrid commonly slightly short
- T2 upper/main specialist can reach 충분; lower remains useful but commonly short
- T3 upper alone commonly 대응/slightly short; upper + secondary/natural/trait/hybrid can reach 충분

PASS:
- strong natural Stat/growth can reduce Item needs
- weak-fit NPC may need more
- no viable route requires a third normal Bag slot

## DUN-Q73 — FATIGUE OUTCOME TABLE

EXPECT base result Fatigue:
```text
성공 +3
대성공 +3
퇴각 +5
부상 +6
중상 0
사망 0
```

PASS: exact table before Trait/Supply modifications.

## DUN-Q74 — FATIGUE PENALTY

EXPECT:
```text
0~9   none
10~19 mobility/spirit -15%
20    mobility/spirit -40%
```

PASS:
- applies to NPC Base+Equipment-side Stats
- Item Stat contribution is not multiplied by this NPC-side percentage
- Fatigue 20 uses -40%, not stale -25%

## DUN-Q75 — SUPPLY ORDER / OUTCOME BUFFER

Controlled cases must verify exact order:
1. pay required Supply
2. remaining Supply reduces current Fatigue
3. remaining Supply then reduces actual outcome Fatigue 1:1
4. unused remainder is discarded

PASS:
- no excess-Supply Power/success/Loot/Hazard bonus
- no next-expedition buffer persistence
- Severe/Death raw outcome Fatigue remains 0

## DUN-Q76 — SUPPLY DEFICIT BOUNDARY

PASS:
- inherited T1/T2/T3 Supply-Burden eligibility/requirements remain intact unless separately changed
- exact hidden deficit formula remains hidden from player UI
- public required/prepared/deficit quantities are correct

## ITEM-Q70 — PLAYER CATEGORY EXACT

Every active Item maps to exactly one of:
```text
Food / Drink / Potion / Field Gear / Insurance / Special
```

PASS:
- no active Medical category
- Potion line is not Special
- 농축 해독제 = Field Gear
- 구급키트 = Insurance

## ITEM-Q71 — ACTIVE CATALOG EXACT 30

PASS:
- exactly 30 active Items
- 붕대 inactive/retired
- 마석 보조배터리 inactive/retired
- 진정 허브티 active
- 중급 포션 active
- no retired ID leaks into Order/Sale generation

## ITEM-Q72 — POTION LADDER

EXPECT:
- 하급: 70/140, 투력 +6
- 중급: 110/230, 투력 +9
- 상급: 150/300, 투력 +12

All:
- Potion category
- Supply 0
- Counter 0
- Insurance 0

PASS: no hidden generic success bonus beyond Core Stat contribution.

## ITEM-Q73 — HAZARD COUNTER VALUES

Exact Item Counter values:
- antidote poison +18
- mask poison +12
- rope bind +16
- coating corrosion +18
- cloak corrosion +6 / mire +6
- boots mire +16
- ion fire +18
- ice fire +10
- wine fear +18
- candy fear +10
- battery dark +16
- heat cold +18
- ramen cold +10
- lava cold +6
- goggles whiteout +16

PASS:
- specialist Field Gear does not retain stale generic positive Core Stats
- Hybrid remains weaker per target than dedicated specialist

## ITEM-Q74 — SPIRIT STAT ROUTE

`진정 허브티`:
- Drink Common
- 50/100
- 정신 +10
- Supply 2
- no explicit fear/dark/whiteout Counter

PASS: it is a natural-Stat alternative, not a hidden multi-Hazard specialist.

## ITEM-Q75 — FIRST AID AFTERCARE

Controlled final ordinary outcomes:

부상 + 구급키트:
- Outcome remains 부상
- XP/Loot/Fatigue follow 부상
- persistent injury=0/recovery=0

중상 + 구급키트:
- Outcome remains 중상
- XP/Loot/Fatigue follow 중상
- persistent injury=1/recovery=0

사망:
- kit no effect

PASS:
- no hidden injury-risk %
- no Retreat conversion
- natural Severe-Injury recovery rule itself is unchanged

## ITEM-Q76 — INSURANCE ORDER

With overlapping Insurance, PASS only if:
1. ordinary outcome resolves
2. Return Stone emergency escape may convert eligible crisis
3. remaining Death may be converted by World Tree
4. First Aid Aftercare applies to final non-death Injury state

No second full resolve after Aftercare.

## ITEM-Q77 — FOOD/DRINK BASELINE VALUES

Audit the exact active table in `ITEM_v2.7.0.md`, including:
- Rice survival +5 / Supply5
- Water survival +4 / Supply3
- Bar combat +4 / Supply4
- Choco mobility +5 / Supply4
- Coffee mobility +8 / Supply2
- Energy mobility +10 / Supply2
- Lava survival +5 / cold6 / Supply4
- Premium Lunch survival +6 / Supply7 / loot20%
- Ramen cold10 / Supply5
- Ice fire10 / Supply1
- Candy fear10 / Supply3

PASS: no stale v2.5 Stat bundles survive.

## ITEM-Q78 — GOLDEN COUPON PRICE

PASS:
`황금 1+1 쿠폰` canonical buy/sell = 500/1000 and existing explicit duplication interaction remains intact.

## SIM-Q70 — THREE PREPARATION AXES

Full-run simulation/playtest must demonstrate that common rational Bag decisions can trade among:
- direct combat/stat preparation
- Hazard response
- Fatigue/Condition management

PASS direction:
no one axis is universally ignorable or universally mandatory.

## SIM-Q71 — ITEM / GROWTH HIERARCHY

Track Item direct contribution against NPC Level/Growth/Equipment.

PASS direction:
- NPC growth remains the main long-term body of strength
- one appropriate Item can change an expedition decision
- late-game Stat Items are not decorative dead picks
- generic Potion is not the universal best answer over Counter/Food choices

## SIM-Q72 — REQUIRED METRICS

Record at minimum:
- Job × Level × Family × Tier outcomes
- four-Stat/equipment distribution
- Fatigue distribution and time at 10+/20
- Food/Drink pick rate by current Fatigue
- Supply use split: required / preRecovery / outcomeBuffer / waste
- Potion tier offer/order/sale/use
- Counter lower/upper/hybrid use
- Item dead-pick / universal-best rates
