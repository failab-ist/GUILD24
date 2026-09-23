# DUNGEON_ITEM_QA

DOC=DUNGEON_ITEM_QA
OWNER=qa,dungeon,item,hazard,preparation,fatigue,supply,injury,death_risk
DOC_VERSION=2.7.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=DUNGEON_ITEM_QA_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here.

## INHERITED QA OVERRIDES

The following inherited v2.5 expectations are stale and explicitly superseded:

- `DUN-Q07` third Lv10+ slot as insurance/flex/luxury
  - v2.7 ordinary Bag is exactly 2 slots at every Level
- `ITEM-Q01` category set containing `Medical`
  - v2.7 exact set is Food / Drink / Potion / Field Gear / Insurance / Special
- `ITEM-Q06` Bandage/First-Aid injury-insurance line
  - 붕대 is retired; 구급키트 is Aftercare Insurance; Potion is a separate raw-Power category
- `ITEM-Q07` 불룡볶음면 Combat identity
  - current exact effect is 강인함 +8 / 냉기 +6 / Supply 4
- `ITEM-Q08` 마석 보조배터리 active Spirit/Special identity
  - retired; its catalog slot is 중급 포션
- `ITEM-Q18` generic Fresh core boost to Supply/native recovery
  - current Fresh Relics use the exact scopes in `RELIC_v2.7.0.md`; generic Supply amplification/native-recovery blanket behavior is not inherited
- any v2.5 active-catalog numeric bundle that conflicts with `ITEM_v2.7.0.md`
- any earlier v2.7 draft Item Stat/price bundle that conflicts with the current active catalog in `ITEM_v2.7.0.md`
- any v2.5 Fatigue/Supply/Death-risk value that conflicts with `DUNGEON_HAZARD_v2.7.0.md`

All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.

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
- drawing one exact Epic SKU is never required for a viable T3 route

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
- `preparedSupply`, `preRecovery`, `remainingSupplyBuffer`, `outcomeBufferUsed`, `actualOutcomeFatigueGain`, `finalFatigue` match the current owner arithmetic
- no duplicate `postOutcomeFatigueGain` truth is used for the same result
- no excess-Supply Power/success/Loot/Hazard bonus
- no next-expedition buffer persistence
- Severe/Death raw outcome Fatigue remains 0

## DUN-Q76 — SUPPLY DEFICIT BOUNDARY

PASS:
- inherited T1/T2/T3 Supply-Burden eligibility/requirements remain intact unless separately changed
- exact hidden deficit formula remains hidden from player UI
- public required/prepared/deficit quantities are correct

## DUN-Q77 — ORDINARY FAILURE DEATH BASELINE

Controlled prepared states with known Combat and Hazard deficits.

EXPECT:

```text
CombatDeficit
= clamp((requiredCombatPower - effectivePreparedPower) / requiredCombatPower, 0, 1)

CombatDeathContribution
= CombatDeficit * 0.18

HazardDeficit_i
= clamp((HazardThreat_i - HazardDefense_i) / HazardThreat_i, 0, 1)

EnvironmentDeficit
= average(HazardDeficit_i)

EnvironmentDeathContribution
= EnvironmentDeficit * 0.12

healthyFailureDeathChance
= clamp(
    CombatDeathContribution + EnvironmentDeathContribution,
    0.00,
    0.30
)
```

If no canonical Hazard is present:
```text
EnvironmentDeficit = 0
```

PASS:
- Combat contribution uses the same current prepared-combat truth as Forecast/Resolve before hidden combat variance
- Environment contribution uses the same current Hazard Threat/Defense truth as readiness
- healthy minimum may reach exactly 0%
- healthy conditional cap is exactly 30%
- an expedition that resolves as `성공 / 대성공` performs zero Death rolls
- an expedition that enters the ordinary failure path performs exactly one Death roll
- that failure Death roll is not additionally gated behind a separate failed-escape requirement
- no second Death roll survives inside escape/injury/severe handling
- a 0% `실패 시 사망 위험` does not imply guaranteed Success
- the displayed percentage is not treated as unconditional whole-expedition Death probability

## DUN-Q78 — INJURED RE-EXPEDITION RISK / PRE-SUPPLY DISCLOSURE

Controlled identical NPC/Gate state except departure Injury state.

EXPECT when departure `injury=1`:
- ordinary visible Injury Stat penalty remains 투력 -15% / 강인함 -20%
- failure Death chance adds +10%p to the healthy conditional formula and caps at 40%
- Severe Injury transition chance adds +15%p at the existing Severe-vs-Injury branch
- no extra independent Death/Severe roll is created
- `성공 / 대성공` still performs no Death roll

Pre-supply SALE check:
- exact `실패 시 사망 위험` % includes the +10%p injured modifier
- qualitative Combat Forecast / Hazard Readiness and exact `실패 시 사망 위험` are captured before any new Item commit
- after purchase commits, those displayed outlook values remain frozen
- actual `failureDeathChance` is recalculated internally from the final prepared state
- post-supply/final actual failure Death % is not exposed during the remaining-slot decision
- UI does not present the conditional percentage as unconditional whole-expedition Death probability

PASS:
- injured departure is materially riskier than healthy departure when an expedition fails
- healthy conditional cap remains 30%
- injured conditional cap remains 40%
- exact pre-supply `실패 시 사망 위험` is player-visible while the post-supply actual conditional probability remains hidden

## DUN-Q79 — ORDINARY INJURY NATURAL RECOVERY

Start at `injury=1`.

EXPECT:
```text
성공 -> injury 0
대성공 -> injury 0
퇴각 -> injury 1
부상 -> injury 1
```

PASS:
- Retreat does not clear ordinary Injury
- generic completion/non-Injury result does not clear it
- Severe recovery remains its separate inherited rule
- First Aid Aftercare may still override persistent Injury exactly as ITEM owns

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

## ITEM-Q71 — ACTIVE CATALOG EXACT 40

PASS:
- exactly 40 active Items
- 붕대 inactive/retired
- 마석 보조배터리 inactive/retired
- 진정 허브티 active
- 중급 포션 active
- exactly 10 new Epic preparation Items from current `ITEM_v2.7.0.md` are active
- no retired ID leaks into Order/Sale generation

## ITEM-Q72 — POTION LADDER

EXPECT:
- 하급: 70/140, 투력 +8
- 중급: 110/230, 투력 +12
- 상급: 150/300, 투력 +16
- 최상급: 190/400, 투력 +24

All:
- Potion category
- Supply 0
- Counter 0
- Insurance 0
- same ordinary Potion-family shelf-life behavior unless explicitly overridden

PASS:
- no hidden generic success bonus beyond Core Stat contribution
- 중급 포션 does not inherit retired 마석 보조배터리의 non-expiring/tool-like shelf behavior merely from slot reuse

## ITEM-Q73 — HAZARD COUNTER VALUES

Exact pre-Epic Main/Lower/Hybrid Item Counter values:
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
- specialist Field Gear does not retain stale generic positive Core Stats except explicit current catalog exceptions
- Hybrid remains weaker per target than dedicated specialist

## ITEM-Q74 — SPIRIT STAT ROUTE

`진정 허브티`:
- Drink Common
- 40/85
- 정신 +15
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
- Rice survival +8 / Supply5
- Water survival +6 / Supply3
- Bar combat +6 / Supply4
- Choco mobility +8 / Supply4
- Coffee mobility +12 / Supply2
- Herb Tea spirit +15 / Supply2
- Energy mobility +15 / Supply2
- Lava survival +8 / cold6 / Supply4
- Premium Lunch survival +10 / Supply7 / loot20%
- Ramen cold10 / Supply5
- Ice fire10 / Supply1
- Candy fear10 / Supply3

PASS: no stale v2.5 or earlier v2.7 Stat bundle survives.

## ITEM-Q78 — GOLDEN COUPON PRICE

PASS:
`황금 1+1 쿠폰` canonical buy/sell = 500/1000 and existing explicit duplication interaction remains intact.

## ITEM-Q79 — ANTIDOTE ROLE BOUNDARY

`농축 해독제`:
- Field Gear Rare
- 80 / 170
- poison Counter +18

PASS:
- no generic positive Core Stat
- no hidden poison Condition/cure subsystem
- its v2.7 gameplay identity is the dedicated Poison Hazard specialist

## ITEM-Q80 — FOOD TRAIT × FRESH STACKING

Use a Food Item with a positive native Core Stat and controlled Trait/Relic state.

EXPECT base-additive modifier composition from `ITEM_v2.7.0.md`:

```text
대식가 + 즉석식품 코너 + 24시간 신선체계
= base ×2.50

대식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= base ×2.75

소식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= base ×2.25
```

PASS:
- Trait and Relic native-Stat percentages are summed from Item base
- no sequential Trait×Relic multiplicative layer
- Counter / Supply / Insurance / Loot / Utility / harmful RiskReward penalty do not enter the native-Stat modifier pool
- GLUTTONY, when present in Final, applies after the Item-side positive Core-Stat contribution is resolved

## ITEM-Q81 — REBALANCED PRICE TABLE

PASS exact Buy/Sell for changed original-catalog prices:

```text
캔커피                40 / 85
진정 허브티           40 / 85
얼음컵                30 / 65
랜턴 건전지           45 / 95
구급키트             100 / 210
핫팩                  60 / 130
농축 해독제           80 / 170
길드 프리미엄 도시락 170 / 360
쿨링 이온음료         80 / 170
```

PASS:
- unchanged original-catalog prices remain exactly as listed in `ITEM_v2.7.0.md`
- no stale 180/360 antidote or 200/400 ion price survives
- Main Hazard specialist price bands remain practically comparable rather than rarity-only inflated

## ITEM-Q82 — DIRECT STAT ITEM RELEVANCE

Controlled representative mid/late-Run NPCs around a marginal Forecast state.

PASS direction:
- selling one appropriate direct-Stat Item produces a perceptible current Core-Stat change
- representative marginal cases can cross a qualitative Forecast boundary because of one appropriate Item
- NPC long-term Growth remains the main body of strength rather than being replaced by Item scaling
- no Day/Level percentage-scaling Item system exists
- Fresh/Potionbody can increase the owned Item contribution, but Counter/Supply/Insurance channels remain outside that native-Stat amplification

Exact base Item values must match the current active catalog.

## ITEM-Q83 — EPIC FAMILY HYBRIDS

EXPECT exact new Epic Field Gear:

```text
거미줄 방호세트   150/320  독+12 / 속박+12
연금 방수슈트     150/320  부식+12 / 진창+12
성화 랜턴         150/320  공포+12 / 어둠+12
백설 방한고글     150/320  냉기+12 / 화이트아웃+12
마그마 냉각장비   160/340  화염+14 / 투력+6
```

PASS:
- each dual-Hazard value remains below the owning dedicated Main specialist value
- FIRE item does not invent a second FIRE Hazard
- `마그마 냉각장비 투력+6` is an explicit exception only

## ITEM-Q84 — EPIC TOP-END STAT/SUPPLY ITEMS

EXPECT:

```text
결전 특선 도시락       Food E    180/380  강인함+12 / Supply9
용사 특식 핫바         Food E    170/360  투력+8 / Supply7
초고속 에너지드링크    Drink E   160/340  기동+18 / Supply2
대현자 허브엘릭서      Drink E   160/340  정신+20 / Supply2
최상급 포션            Potion E  190/400  투력+24
```

PASS:
- ordinary category modifier rules apply
- no Epic-only hidden multiplier
- these Items improve one-slot late-Run value without adding Bag slots

## ITEM-Q85 — NO D20 HARD UNLOCK FOR NEW EPICS

PASS:
- all 10 new Epic preparation Items use the ordinary Epic pool
- no per-Item `day>=20` hard eligibility gate exists for them
- practical late-Run frequency comes only from current `ECONOMY_ORDER_v2.7.0.md` Day-band Rarity progression plus existing general eligibility rules

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
- Epic improves slot efficiency but does not become mandatory for T3 viability

## SIM-Q72 — REQUIRED METRICS

Record at minimum:
- Job × Level × Family × Tier outcomes
- four-Stat/equipment distribution
- Fatigue distribution and time at 10+/20
- Food/Drink pick rate by current Fatigue
- Supply use split: required / preRecovery / outcomeBuffer / waste
- Potion tier offer/order/sale/use
- Counter lower/upper/hybrid use
- Epic offer/order/sale/use by Day band and category
- healthy vs injured re-expedition outcome distribution
- healthy vs injured expedition Death/Severe rates by CombatDeficit and EnvironmentDeficit band
- Item dead-pick / universal-best rates
## DUN-Q-v27-GATE-SLOPE — LATE-DAY GATE POWER

Owner rule: `DUNGEON_HAZARD_v2.7.0.md` §GATE POWER — LATE-DAY SLOPE.

PASS:
- the Day term is `min(Day, 9) × 1.70 + max(0, Day - 9) × 0.40`
- D1 through D9 Gate Power is identical to the pre-change value for the same Family, Tier and Day
- the base constant, Tier term, Family adjustment and Family Combat multiplier are unchanged
- D12 T1 ordinary Family reads 16.50 on the Day term, D24 reads 21.30

FAIL:
- a single slope applied across all Days
- an early-Day Gate Power that moved
- the slope implemented as a post-hoc multiplier on the finished Gate Power rather than on the
  Day term
