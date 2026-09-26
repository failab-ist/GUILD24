# ITEM consolidation ledger

BASELINE=3c5cbcd
TARGET=design_ssot/ITEM_v2.8.0.md
CHAIN=design_ssot/ITEM_v2.8.0.md,design_ssot/history/ITEM_v2.7.0.md,design_ssot/history/ITEM_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/ITEM_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.

Layout: one `##` section per topic, `###` for subsections. Order: KEY, ROLE, PLAYER-FACING CATEGORY
(v2.7 list + contracts, v2.5 Category / Functional Role split), ITEM ROLE BOUNDARY, FUNCTIONAL ROLE,
SUPPLY MODEL, DIRECT CORE-STAT ITEM VALUE, PRICE (v2.5 price modes + v2.7 alignment), CATEGORY AFFINITY
(v2.5 affinity + v2.5 native core effect + v2.7 composition + v2.8 Fresh / Food affinity + v2.7
boundary), HAZARD COVERAGE CONTRACT, HAZARD COUNTER BASELINE (v2.7 table + v2.5 matrix rules), ITEM
INTERACTION, PENALTY RULE, POTION LINE, BANDAGE RETIREMENT, MEAL / WATER LINE (the v2.8 patch topics
as subsections), EPIC LATE-RUN VALUE LAYER, INSURANCE HIERARCHY (v2.5 + v2.7 per Item, then the v2.7
resolution order), ACTIVE CATALOG (v2.8 meal / water table + Balance Status, then the v2.7 table minus
the six rows the v2.8 table replaces, retired identities, v2.8 Rarity distribution), ITEM ROLE NOTES
(the still-true v2.5 per-Item role / identity / rule fields; numbering follows the catalog `#`),
CATALOG BUILD SUPPORT, RARITY / UPGRADE, JOB INTERACTION, INFORMATION (v2.5 + v2.7 lists), SALE /
INVENTORY, BALANCE QA (v2.5 PASS3 metrics / reject list), RELATED. ITEM has no acceptance list of its
own; the Item acceptance checks live in `DUNGEON_ITEM_QA_v2.8.0.md`. Header keys `BASE_DOCUMENT=` /
`PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`.

ID mapping used for the v2.8 replacements (confirmed by the v2.8 Rarity distribution C11 / U12 / R5 /
E11 / L1, which only holds with this mapping): `rice` = v2.7 #1 삼각김밥, `water` = #2 생수, `bar` =
#4 핫바, `premium` = #27 길드 프리미엄 도시락, `battlelunch` = #36 결전 특선 도시락, `herobar` = #37
용사 특식 핫바.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

```text
## INHERITANCE
All unchanged v2.7 Item category, Counter, Potion, Insurance, Fresh-composition and information rules
inherit ITEM_v2.7.0.md.
This patch changes the active meal/water identity line and its first v2.8 balance baseline.
Unchanged Item interaction, inventory consumption, price-mode ownership, explicit Special interaction, and general visibility rules inherit `ITEM_v2.5.0.md`.
This patch replaces the v2.5 player-facing category set, active catalog values, Potion/Injury line, Hazard counter matrix, and active catalog count.
```

## LEGACY — version headings / change narration (sections merged into their topic)

v2.8 patch headings become `###` subsections of MEAL / WATER LINE, CATEGORY AFFINITY or ACTIVE CATALOG
(declared under REWORD — headings). `## CATEGORY AFFINITY BOUNDARY`, `## FOOD / FRESH POSITIVE
NATIVE-STAT COMPOSITION — EXACT` and `## FOOD / DRINK CORE EFFECT` become `###` subsections of the one
CATEGORY AFFINITY section. The v2.7 Insurance / Active Catalog headings merge into the v2.5 headings of
the same name. `Medical` removal is stated by the current category list itself.

```text
## ROLE SPLIT — EXACT
## ACTIVE REPLACEMENT IDS
## CURRENT ITEM ART IDENTITY — EXACT
## DIRECTOR DOCUMENT BASELINE — EXACT
## ACTIVE RARITY DISTRIBUTION — EXACT
## NPC WALLET GAIN — EXACT SCOPE
## FRESH / FOOD AFFINITY
## REPLACEMENT ID BOUNDARY
## BALANCE STATUS
## REPLACEMENT ITEM FLAVOR — EXACT
## FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION — EXACT
## DIRECT CORE-STAT ITEM VALUE — APPROVED v2.7 REBALANCE
## ITEM PRICE ALIGNMENT — APPROVED v2.7 REBALANCE
## EPIC LATE-RUN VALUE LAYER — EXACT v2.7
## INSURANCE HIERARCHY — v2.7
## ACTIVE CATALOG — v2.7 EXACT BASELINE
## CATEGORY AFFINITY BOUNDARY
## PRODUCT CATEGORY
## FOOD / DRINK CORE EFFECT
## HAZARD ITEM MATRIX
## PASS3 METRICS
`Medical` is removed.
```

## LEGACY — tuning / playtest history and version-relative provenance

The Direct Core-Stat rules themselves are kept (label reworded, see REWORD). The v2.7 catalog marker's
`where values changed/new` qualifier was relative to the v2.5 values; the plain `DIRECTOR DOCUMENT
BASELINE` marker is kept on OTHER ACTIVE ITEMS, as on the Hazard, Potion and 구급키트 blocks, and the
meal / water Balance Status is kept. The v2.5 PASS3 / playtest tuning
permissions are replaced by the exact v2.7 / v2.8 values (ACTIVE CATALOG; `Any later change requires a
new approved ITEM amendment; QA does not auto-tune it.`). The 귀환석 `escapeBonus=+50%p` value is kept.

```text
Flat native Core-Stat Item values are intentionally higher than the prior v2.7 draft baseline.
`DIRECTOR DOCUMENT BASELINE` where values changed/new.
exactNumericTuning=PASS3
- numeric strength=PASS3
- exact secondary values=PASS3
approved v2.5 retained starting value:
The +50%p bonus is implementation-fixed for the v2.5 retained full-run baseline and may be rebalanced after simulation/playtest.
Exact numeric values/prices/shelf life=PASS3 unless separately canonicalized. Initial v2.5 implementation retains current canonical-compatible Source values; approved Supply/Insurance starting values in this document override them.
```

## LEGACY — restatements of rules kept elsewhere in the target

- v2.5 `It does NOT automatically include:` list = v2.7 CATEGORY AFFINITY BOUNDARY (`Food/Drink
  category-affinity or Fresh Relic effects do not automatically multiply: - Hazard Counter - Insurance -
  RiskReward penalty - unrelated special effects`), kept.
- v2.5 `It does not automatically multiply unrelated attached:` Cold / Fire / Poison counter / penalty
  magnitude = the same boundary list (`- Hazard Counter`, `- RiskReward penalty`).
- `Canonical Trait behavior:` / `-> NPC_TRAIT` in CATEGORY AFFINITY = `Exact Trait modifiers ->
  NPC_TRAIT_v2.8.0.md.` (kept, reworded pointer); JOB INTERACTION keeps `Canonical:` with the reworded
  `-> NPC_TRAIT_v2.8.0.md`.
- `The new Epic Items have no separate D20 Item eligibility gate.` / `Their practical late-Run
  frequency...` = EPIC LATE-RUN VALUE LAYER `They are not D20-hard-unlocked.` / `Their late-Run identity
  comes from the Day-band Rarity weights owned by ECONOMY_ORDER_v2.8.0.md.`
- v2.5 per-Item `category=` lines = the Category / Rarity column of ACTIVE CATALOG (Medical ones are
  under SUPERSEDED below). `category=Insurance` stays in INSURANCE HIERARCHY.
- v2.5 per-Item `supplyValue=` lines whose value equals the catalog Supply (컵라면 5, 캔커피 2, 삼각김밥 5,
  길드 특제 도시락 7)
  = the Effect column of ACTIVE CATALOG; the differing ones are under SUPERSEDED below.
- v2.5 `Potion:` `- not primary injury-insurance specialist` = POTION LINE `Insurance = 0`.

```text
It does NOT automatically include:
- explicit Hazard Counter
- Insurance
- RiskReward penalty
- unrelated attached effect
It does not automatically multiply unrelated attached:
- Cold counter
- Fire counter
- Poison counter
- penalty magnitude
Canonical Trait behavior:
-> NPC_TRAIT
The new Epic Items have no separate D20 Item eligibility gate.
Their practical late-Run frequency is controlled by `ECONOMY_ORDER_v2.7.0.md` Day-band Rarity weights.
category=Food
category=Drink
category=FieldGear
category=Special
supplyValue=5
supplyValue=2
supplyValue=7
```

## SUPERSEDED — v2.5 category set / contracts with Medical (v2.7 category set and contracts)

```text
playerCategory=[Food,Drink,Medical,FieldGear,Insurance,Special]
Player-facing:
- Food
- Drink
- Medical
- Field Gear
- Insurance
- Special
Category contract:
Food:
- Supply 중심
- native Stat/recovery 또는 일부 Hybrid 대응 가능
Drink:
- Supply/Stat 중심
- 일부 Direct/Hybrid 대응 가능
Medical:
- recovery / injury / poison 등 치료·보호
FieldGear:
- Hazard specialist 중심
Insurance:
- expedition failure outcome mitigation
Special:
- 일반 Category 규칙 밖의 명시적 Utility/특수 효과
category=Medical
```

## SUPERSEDED — v2.5 catalog size keys (active catalog count is exactly 40)

`initialMetaEligibleCatalogCount=29` was derived from the 30-Item catalog; no replacement value is
written here (the meta lock itself stays: `metaLockedItems=[황금 1+1 쿠폰]`).

```text
activeCatalogCount=30
initialMetaEligibleCatalogCount=29
catalogTarget≈30
catalogSoftCap=32
```

## SUPERSEDED — v2.5 Hazard Item Matrix (v2.7 HAZARD COUNTER BASELINE)

Fire Main moved from 얼음컵 to 쿨링 이온음료; 진창용 원정 장화 is 원정용 장화; the matrix rules are kept.

```text
| Hazard | Main specialist | Alternative 1 | Alternative 2 |
| poison | 농축 해독제 | 방진마스크 | 강인함 route |
| bind | 경량 로프 | 기동 route | 캔커피/에너지드링크 등 기동 Stat support |
| corrosion | 부식 방지 코팅제 | 방수망토 Hybrid | 강인함 route |
| mire | 진창용 원정 장화 | 방수망토 Hybrid | 기동 route |
| fire | 얼음컵 | 쿨링 이온음료 Hybrid | 강인함 route |
| fear | 용사의 곡주 | 집중 사탕 | 정신 route |
| dark | 랜턴 건전지 | 정신 route | 기동 route |
| cold | 핫팩 | 불룡볶음면 Hybrid | 강인함 route |
| whiteout | 설원 고글 | 정신 route | 기동 route |
```

## SUPERSEDED — v2.5 Potion / Injury line and Spirit battery (v2.7 POTION LINE, 붕대 / 마석 보조배터리 retired)

```text
## POTION / INJURY LINE
Potion identity=universal recovery/stat
하급 포션 -> 상급 포션:
clear upgrade hierarchy allowed
Potion:
- strong general recovery/stat
- not primary injury-insurance specialist
붕대/구급키트:
identity=injury insurance specialist
`마석 보조배터리`:
- universal Spirit support
- same base effect regardless of Job
7. 붕대
identity=cheap injury protection
8. 하급 포션
roles=[Stat]
identity=basic universal recovery
```

## SUPERSEDED — six v2.7 catalog rows whose values the v2.8 meal / water table replaces (same save IDs)

Only `bar` (핫바 -> 간단 도시락) and `herobar` (용사 특식 핫바 -> 왕도 천연암반수) change identity; `rice`,
`water`, `premium` and `battlelunch` keep their slot and role and only take new values / names from the
v2.8 table. The v2.7 Epic blocks for 결전 특선 도시락 / 용사 특식 핫바 go with their rows; the current
Epic meal / water rows are in the ACTIVE CATALOG meal / water table (pointer line declared under NEW).
Dropped v2.5 per-Item fields: #1 `roles=[Supply]` (now also 강인함), #2 생수 (now the 강인함 Stat route of
ROLE SPLIT, so its `identity=cheap basic expedition supply` use and Supply 3 go; the same identity line
stays for #1 삼각김밥), #4 핫바 (replaced by `bar`). #27 keeps `roles=[Supply,Economy]`, its identity and
its `must not dominate` rule under the current name (REWORD below); `supplyValue=7` equals the current
row (LEGACY restatements). `roles=[Supply,Stat]` stays for 초코바 / 캔커피 / 에너지드링크.

```text
| 1 | 삼각김밥 | Food C | 35 / 70 | 강인함 +8, Supply 5 | — |
| 2 | 생수 | Drink C | 25 / 55 | 강인함 +6, Supply 3 | — |
| 4 | 핫바 | Food C | 40 / 80 | 투력 +6, Supply 4 | — |
| 27 | 길드 프리미엄 도시락 | Food R | 170 / 360 | 강인함 +10, Supply 7, Loot +20% | — |
| 36 | 결전 특선 도시락 | Food E | 180 / 380 | 강인함 +12, Supply 9 | Top-end survival/supply |
| 37 | 용사 특식 핫바 | Food E | 170 / 360 | 투력 +8, Supply 7 | Top-end Food combat/supply |
결전 특선 도시락
Food / Epic
180 / 380
강인함 +12
Supply 9
용사 특식 핫바
170 / 360
투력 +8
Supply 7
roles=[Supply]
2. 생수
supplyValue=3
4. 핫바
supplyValue=4
identity=basic supply + Combat/expedition support
```

## SUPERSEDED — v2.5 per-Item fields contradicted by the exact v2.7 catalog

- 5 초코바 Supply 2 -> 4; 9 얼음컵 Supply 2 -> 1 and Fire Main -> Fire Lower (쿨링 이온음료 is Fire Main),
  so its `mainCounter=fire` / `cheap Fire specialist` go (its `roles=[Supply,DirectCounter]` stays);
  12 집중 사탕 Supply 1 -> 3, no 정신 Stat (`공포 +10, Supply 3`), so its Stat role / Spirit identity go;
  13 불룡볶음면 Supply 5 -> 4, Cold +6 (below 컵라면's "low" +10) with 강인함, not Combat; 14 / 15 Supply
  3 -> 2 / 1; 11 경량 로프 is `속박 +16` only and single-Hazard Field Gear carries no generic Core Stat,
  so its `roles=[DirectCounter,Stat]` / `secondary=mobility` go.
- 28 쿨링 이온음료 is now `화염 +18, Supply 1 | Fire Main`: the Hybrid role, Supply 4, moderate Fire,
  alternative identity and `IceCup remains stronger` rule are reversed. Its whole v2.5 entry goes.
- 23 상급 포션 / 26 마석 보조배터리 v2.5 entries: Potion line / retired battery (above).
- `supplyValue=5` / `supplyValue=2` also appear for Items whose value changed; they are listed once,
  under LEGACY restatements.

```text
supplyValue=1
mainCounter=fire
identity=cheap Fire specialist
roles=[DirectCounter,Stat]
secondary=mobility
roles=[Supply,Stat,HybridCounter]
identity=affordable Spirit/Fear support
counter=cold(moderate)
identity=Combat + Cold flexible Food
23. 상급 포션
identity=strong universal recovery/stat
injuryInsuranceSpecialist=NO
26. 마석 보조배터리
identity=universal Spirit support
jobSpecificEffect=NO
28. 쿨링 이온음료
roles=[Supply,HybridCounter]
supplyValue=4
counter=fire(moderate)
identity=Premium/Fresh-friendly Fire alternative
rule=IceCup remains stronger pure-Fire specialist
```

`roles=[Supply,Stat,HybridCounter]` stays for 13 불룡볶음면 (`강인함 +8, 냉기 +6, Supply 4`) and
`roles=[Supply,HybridCounter]` stays for 3 컵라면; only their 12 / 28 uses are dropped.

## REWORD — version framing removed, rule kept

```text
For current internal saves, these IDs resolve to the new v2.8 identities.
Only the current v2.8 identities are active for these IDs.
The new Food/Drink positive Core-Stat values use the existing v2.7 base-additive composition rules.
The table above is the approved v2.8 DIRECTOR DOCUMENT BASELINE.
Fresh / Food-affinity / Potionbody modifiers continue to use their existing owned composition rules from these revised base Item values.
v2.7 adds 10 Epic preparation Items.
No active Item creates a separate poison Condition/cure subsystem in v2.7.
Unlisted implementation-only flavor fields/shelf lives inherit the previous Item where identity remains unchanged, except where this patch states otherwise.
Inherits the existing Rare Insurance identity:
Inherits the existing Epic death-insurance identity:
```

```new
For current internal saves, these IDs resolve to the current identities.
Only the current identities are active for these IDs.
The Food/Drink positive Core-Stat values use the existing base-additive composition rules.
The table above is the approved DIRECTOR DOCUMENT BASELINE.
Fresh / Food-affinity / Potionbody modifiers use their existing owned composition rules from these base Item values.
There are 10 Epic preparation Items.
No active Item creates a separate poison Condition/cure subsystem.
Rare Insurance identity:
Epic death-insurance identity:
```

The 10 are the 5 Epic Field Gear plus 영웅 결전 도시락, 왕도 천연암반수, 초고속 에너지드링크, 대현자
허브엘릭서, 최상급 포션 (Design split `5 Epic Field Gear` / `5 Epic Food/Drink/Potion`).

## REWORD — Direct Core-Stat label: `Reason:` -> `Rules:` (its first line is tuning history; the bullets are binding)

```text
Reason:
```

`Rules:` is an existing chain line (v2.5 / v2.7), so the new form needs no `new` entry.

## REWORD — Supply tuning line: dead PASS3 / playtest tuning clause trimmed (exact catalog values, no auto-tune), Supply > 0 constraint kept; v2.5 retained-value framing removed

```text
Supply values are canonical v2.5 retained starting values listed in ACTIVE CATALOG.
Full-run simulation/playtest may tune the numbers while preserving Supply > 0 for every active Food/Drink.
```

```new
Supply values are listed in ACTIVE CATALOG.
Supply > 0 is preserved for every active Food/Drink.
```

## REWORD — Catalog Build Support: dead `Medical/` clause trimmed (category removed)

```text
- Expedition must have enough Medical/FieldGear/Insurance/Counter stock to support its Relics
```

```new
- Expedition must have enough FieldGear/Insurance/Counter stock to support its Relics
```

## REWORD — current Item names (v2.7 renamed 진창용 원정 장화 -> 원정용 장화; v2.8 `premium` 길드 프리미엄 도시락 -> 길드 특제 도시락)

```text
21. 진창용 원정 장화
27. 길드 프리미엄 도시락
```

```new
21. 원정용 장화
27. 길드 특제 도시락
```

## REWORD — catalog table header: version tag removed from the Effect column

```text
| # | Item | Category / Rarity | Buy / Sell | v2.7 Effect | Hazard Role |
```

```new
| # | Item | Category / Rarity | Buy / Sell | Effect | Hazard Role |
```

## REWORD — headings: version tags removed, patch topics become subsections

```new
## DIRECT CORE-STAT ITEM VALUE
### ITEM PRICE ALIGNMENT
### FOOD / DRINK CORE EFFECT
### FOOD / FRESH POSITIVE NATIVE-STAT COMPOSITION — EXACT
### CATEGORY AFFINITY BOUNDARY
## MEAL / WATER LINE
### ROLE SPLIT — EXACT
### ACTIVE REPLACEMENT IDS
### REPLACEMENT ID BOUNDARY
### CURRENT ITEM ART IDENTITY — EXACT
### REPLACEMENT ITEM FLAVOR — EXACT
### NPC WALLET GAIN — EXACT SCOPE
## EPIC LATE-RUN VALUE LAYER — EXACT
### MEAL / WATER LINE — DIRECTOR DOCUMENT BASELINE — EXACT
### OTHER ACTIVE ITEMS
### ACTIVE RARITY DISTRIBUTION — EXACT
## ITEM ROLE NOTES
## BALANCE QA
```

## REWORD — cross-owner pointers name the current owner file

```text
-> DUNGEON_HAZARD
-> RELIC
-> SALE
-> ECONOMY_ORDER
GLUTTONY's Final reduction, when applicable, occurs after the final Item-side positive Core-Stat contribution has been produced, as owned by `BOSS_v2.7.0.md`.
Exact Trait modifiers -> `NPC_TRAIT_v2.7.0.md`.
Exact Fresh Relic effects -> `RELIC_v2.7.0.md`.
Hazard Threat/readiness -> `DUNGEON_HAZARD_v2.7.0.md`.
Potion Trait interaction -> `NPC_TRAIT_v2.7.0.md`.
Start-stock ownership -> `CORE_RUN_v2.7.0.md`.
Their late-Run identity comes from the Day-band Rarity weights owned by `ECONOMY_ORDER_v2.7.0.md`.
It does not change the existing natural Severe-Injury recovery rule owned by NPC_TRAIT.
Final-specific usability -> `FINAL_EXPEDITION_v2.7.0.md`.
```

```new
-> `DUNGEON_HAZARD_v2.8.0.md`
-> `NPC_TRAIT_v2.8.0.md`
-> `RELIC_v2.8.0.md`
-> `SALE_v2.8.0.md`
-> `ECONOMY_ORDER_v2.8.0.md`
GLUTTONY's Final reduction, when applicable, occurs after the final Item-side positive Core-Stat contribution has been produced, as owned by `BOSS_v2.8.0.md`.
Exact Trait modifiers -> `NPC_TRAIT_v2.8.0.md`.
Exact Fresh Relic effects -> `RELIC_v2.8.0.md`.
Hazard Threat/readiness -> `DUNGEON_HAZARD_v2.8.0.md`.
Potion Trait interaction -> `NPC_TRAIT_v2.8.0.md`.
Start-stock ownership -> `CORE_RUN_v2.8.0.md`.
Their late-Run identity comes from the Day-band Rarity weights owned by `ECONOMY_ORDER_v2.8.0.md`.
It does not change the existing natural Severe-Injury recovery rule owned by `NPC_TRAIT_v2.8.0.md`.
Final-specific usability -> `FINAL_EXPEDITION_v2.8.0.md`.
```

## REWORD — RELATED: v2.5 and v2.7 lists merged, current owner files

```text
meta unlock -> META
dungeon/hazard/supply -> DUNGEON_HAZARD
job/trait -> NPC_TRAIT
relic/build -> RELIC
order/reroll/pricing -> ECONOMY_ORDER
sale/inventory -> SALE
night causality -> NIGHT_CLOSING
Hazard/Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Trait multipliers -> `NPC_TRAIT_v2.7.0.md`
Relic modifiers -> `RELIC_v2.7.0.md`
Sale handling -> `SALE_v2.7.0.md`
Order Rarity progression -> `ECONOMY_ORDER_v2.7.0.md`
Final usefulness -> `FINAL_EXPEDITION_v2.7.0.md`
```

```new
Hazard / Fatigue / Supply -> Fatigue -> `DUNGEON_HAZARD_v2.8.0.md` (User 2026-09-24, v2.9.0)
Job / Trait multipliers -> `NPC_TRAIT_v2.8.0.md`
Relic / build modifiers -> `RELIC_v2.8.0.md`
Sale handling / inventory -> `SALE_v2.8.0.md`
Order / reroll / pricing / Rarity progression -> `ECONOMY_ORDER_v2.8.0.md`
Final usefulness -> `FINAL_EXPEDITION_v2.8.0.md`
Meta unlock -> `META_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
```

## NEW — in-document pointer (no rule): where the Epic meal / water rows now live

The v2.7 EPIC FOOD / DRINK / POTION blocks listed two of the five Epic Food/Drink/Potion Items that the
v2.8 table replaced; this line points the reader to their current rows.

```new
The Epic meal / water rows (`battlelunch` 영웅 결전 도시락, `herobar` 왕도 천연암반수) are in the ACTIVE CATALOG meal / water table.
```

## NOTE — Food affinity and Supply (not a conflict; both kept)

v2.5 `Food/Drink nativeCore may include: - Supply` / `Food affinity may boost: - Supply` and v2.7 / v2.8
`Hazard Counter / Supply / ... remain separate channels` / `Supply remains its own channel` agree:
Supply is its own adjustable channel, outside the positive native Core-Stat pool (e.g. 소식가 gives Food
Supply +1 per the Trait owner). Independent review 2026-09-23.

## UNRESOLVED — kept verbatim, reported to the User

- 귀환석 `finalEscapeCap≈90–95% tuning band` has no exact value in any chain version. Kept as written.
- `Condition` role (`functionalRole`, `### Condition`, `Condition management`, `Condition effect`): no
  active Item carries a Condition role after Medical / 붕대 were removed and `No active Item creates a
  separate poison Condition/cure subsystem.` Kept, since no version removes the role.

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A2: 귀환석 cap is Source's value. B10: generic Fresh / category-affinity boosts never touch Supply
(Source: Fresh boosts only the native Stat pool); Supply changes only where a Trait states it.

```text
finalEscapeCap≈90–95% tuning band
- Supply
Food/Drink nativeCore may include:
- Supply
- native Stat/recovery
```

```new
finalEscapeCap=0.96 (귀환석 rescue roll clamp; the ordinary retreat roll clamps at 0.94)
- Supply, only where a Trait entry states it (e.g. 소식가 / 대식가 in NPC_TRAIT)
Food/Drink nativeCore for Fresh Store Supports and category affinity is positive native Stat only.
Supply stays its own channel; Fresh Store Supports leave Supply unchanged.
```

## AMENDMENT — Store Support rebalance follow-up 2026-09-23

Stacking examples follow the rebalanced values (즉석식품 +25%, 24시간 신선 +50%, 원정 도시락 has no Stat bonus); the old example numbers were already stale.

```text
= +30% +40% +80%
= base ×2.50
대식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= +30% +40% +80% +25%
= base ×2.75
소식가 + 즉석식품 코너 + 24시간 신선체계 + active 원정 도시락 코너 Stat condition
= -20% +40% +80% +25%
= base ×2.25
Drink has no Food-affinity Trait modifier, so the same three Fresh native-Stat bonuses alone remain base ×2.45 when all conditions apply.
```

```new
= +30% +25% +50%
= base ×2.05
소식가 + 즉석식품 코너 + 24시간 신선체계
= -20% +25% +50%
= base ×1.55
Drink has no Food-affinity Trait modifier, so the two Fresh native-Stat bonuses alone give base ×1.75.
원정 도시락 코너 no longer adds a native-Stat bonus (its effects are Fatigue recovery via Supply and flat Hazard defense). (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

The Supply Burden Gate modifier is removed (no Gate requires Supply, no deficit / excess). Food/Drink keep
their Supply values (1~9, > 0), but the only meaning of Supply is Fatigue recovery, shown to the Player as
`피로 회복 N`; the exact Supply -> Fatigue order is owned by DUNGEON_HAZARD §SUPPLY -> FATIGUE, ITEM points.
The meal / water role split keeps its amount split, and its "no direct Fatigue-reduction" lines are rewritten
because Supply now IS the direct Fatigue recovery. Hazard pressure is one non-투력 Stat per Hazard (3 / 3 / 3):
the HAZARD COUNTER BASELINE natural-alternative column follows 화염 -> 기동, 어둠 / 화이트아웃 -> 정신.
The two earlier `new` declarations this batch rewrote (RELATED pointer, 원정 도시락 코너 note) are edited in place above.

```text
globalPressure=[supplyBurden]
- Supply preparation
- Food = high Supply / Fatigue management + small-to-medium secondary Core Stat value
- Drink = lower Supply + sharper Stat/Counter/RiskReward value
- Supply value
mitigates global Supply Burden
- excess Supply alone gives no extra expedition bonus
Canonical Supply Burden:
| fire | 쿨링 이온음료 +18 | 얼음컵 +10 | 강인함 / 내열성 / 마그마 냉각장비 +14 |
| dark | 랜턴 건전지 +16 | — | 정신+기동 / 눈썰미 / 성화 랜턴 +12 |
| whiteout | 설원 고글 +16 | — | 정신+기동 / 눈썰미 / 백설 방한고글 +12 |
- Supply is the primary identity
- no direct Fatigue-reduction effect is created
- low Supply
- meal asks: do I spend a slot on Supply plus broad survival?
- water asks: do I spend a slot on concentrated 강인함 with little Supply?
- no direct Fatigue-reduction role is active
= top-end direct Stat / Supply slot efficiency
while keeping much lower Supply.
```

```new
globalPressure=NONE (User 2026-09-24, v2.9.0)
- Fatigue recovery (Supply) (User 2026-09-24, v2.9.0)
- Food = large Fatigue recovery (Supply) + lower secondary Core Stat value (User 2026-09-24, v2.9.0)
- Drink = small Fatigue recovery (Supply) + sharper Stat/Counter/RiskReward value
- Supply value (shown as `피로 회복 N`) (User 2026-09-24, v2.9.0)
reduces the customer's Fatigue; shown as `피로 회복 N` (User 2026-09-24, v2.9.0)
- Supply reduces current Fatigue first, then this expedition's Fatigue gain; no Gate requires Supply
- leftover Supply is not persisted and gives no extra expedition bonus
Exact Supply -> Fatigue order and formulas:
-> `DUNGEON_HAZARD_v2.8.0.md` §SUPPLY -> FATIGUE
Its only meaning is Fatigue recovery: the Player sees the value as `피로 회복 N`, never `보급 +N` (User 2026-09-24, v2.9.0)
- Supply (large Fatigue recovery) is the primary identity (User 2026-09-24, v2.9.0)
- Supply is the direct Fatigue recovery; no separate Fatigue effect is created
- low Supply (small Fatigue recovery)
- meal asks: do I spend a slot on large Fatigue recovery plus broad survival?
- water asks: do I spend a slot on concentrated 강인함 with small Fatigue recovery?
- no Fatigue-reduction role beyond the Item's own Supply value is active (User 2026-09-24, v2.9.0)
= top-end direct Stat / Fatigue-recovery (Supply) slot efficiency (User 2026-09-24, v2.9.0)
while keeping much lower Supply (Fatigue recovery). (User 2026-09-24, v2.9.0)
- Supply contribution as `피로 회복 N` (User 2026-09-24, v2.9.0)
- Supply (`피로 회복 N`)
```

## AMENDMENT — v2.9.0 구급키트 / utility lines (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): 구급키트 is pure Insurance — no Core Stat (the catalog `survival:10` was never in this owner), Buy / Sell 100 / 210 → 80 / 170. The BASELINE block and the price table row are rewritten under the same ids.

```text
Buy / Sell = 100 / 210
| 16 | 구급키트 | Insurance U | 100 / 210 | Outcome 유지 / persistent Injury 1단계 Aftercare | Aftercare |
```

```new
It carries no Core Stat; its whole function is the Aftercare below, priced as pure Insurance (User 2026-09-24, v2.9.0).
```

## AMENDMENT — v2.9.0 revision 3: 어둠 -> 기동, no Gate shares a Stat (User decision 2026-09-24)

어둠 presses 기동 ×0.40 so that 망자역 지하묘지 (공포 + 어둠) is answered by 정신 + 기동, never one Stat; the split is 강인함 3 /
기동 4 / 정신 2. The revision-1/2 declarations this replaces were edited out of the fences above in place.

```new
Natural alternative = the one Stat each Hazard presses (3 / 3 / 3, 투력 never; 어둠 -> 기동 and 화염 -> 정신 per User 2026-09-24 revisions 3 / 5) -> `DUNGEON_HAZARD_v2.8.0.md` (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 F3: kit Outcome step / no rest recovery / 중상 +9 / repeated-strain cut (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.0 F3): 구급키트 lowers the resolved Outcome one step (중상 → 부상 with the 부상 XP/Loot/Fatigue/injury 1; 부상 → 부상 with no lasting injury; 사망 excluded); no natural Fatigue recovery of any kind for any adventurer (the Severe-Injury rest-day -5 is retired); 중상 takes the 부상 Fatigue gain (+9) and only 사망 stays 0; repeated injured / weary (Fatigue 20+) departures escalate the failure Death chance (+8%p per repeat of each kind from the second, cap +30%p, from the adventurer's own records) with the NPC-detail row `무리한 출발 {n}회`; the route-change line names 거짓말쟁이 / 순례 with particles by final consonant. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
It does not change the resolved expedition Outcome.
After Outcome resolution and after higher-priority emergency outcome conversions, it changes only the persistent Injury state:
-> Outcome/XP/Loot/Fatigue remain 부상
-> persistent injury=0, recovery=0
-> Outcome/XP/Loot/Fatigue remain 중상
-> persistent injury=1, recovery=0
4. 구급키트 Aftercare applies to the final non-death Injury state
```

```new
It lowers the resolved expedition Outcome one step, after the higher-priority emergency conversions (User 2026-09-25, v2.9.0):
-> Outcome becomes 부상: XP/Loot/Fatigue follow 부상, persistent injury=1, recovery=0
-> Outcome stays 부상: XP/Loot/Fatigue follow 부상, persistent injury=0 (no lasting injury)
4. 구급키트 Aftercare lowers the final non-death Outcome one step (중상 -> 부상; a 부상 keeps its Outcome but leaves no injury); XP/Loot/Fatigue follow the lowered Outcome (User 2026-09-25, v2.9.0)
```

## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```text
Shelf Life = 5
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +10, Supply 5 | Cold Lower |
| 5 | 초코바 | Food C | 30 / 65 | 기동 +8, Supply 4 | — |
| 12 | 집중 사탕 | Food C | 35 / 75 | 공포 +10, Supply 3 | Fear Lower |
| 13 | 불룡볶음면 | Food U | 65 / 135 | 강인함 +8, 냉기 +6, Supply 4 | Cold Hybrid |
| 29 | 세계수 생환부적 | Insurance E | 600 / 1200 | Death -> Severe Injury once | Death Insurance |
| rice | 삼각김밥 | Food C | 35 / 70 | 강인함 +6, Supply 5 | 2d |
| water | 생수 | Drink C | 40 / 85 | 강인함 +10, Supply 2 | 5d |
| bar | 간단 도시락 | Food U | 85 / 180 | 강인함 +10, Supply 6, 원정 소지금 획득 +20% | 2d |
| premium | 길드 특제 도시락 | Food R | 160 / 340 | 강인함 +14, Supply 7, 원정 소지금 획득 +40% | 2d |
| herobar | 왕도 천연암반수 | Drink E | 185 / 390 | 강인함 +20, Supply 2 | 5d |
```

```new
Catalog tables below keep the internal notation `Supply N`.
Fatigue-recovery contract (User 2026-09-24/25, v2.9.0): Food is the main recovery route; a Drink recovers 1~2; no Food
recovers more than 6 except 영웅 결전 도시락 (Epic, 9), so the worst single outcome gain (+9) is never
erased by one ordinary Item; a Hazard-Counter Food keeps at least 2 so 대식가's -1 stays a real cost.
The redistributed values are the ACTIVE CATALOG rows (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 ·
집중 사탕 2 · 불룡볶음면 2 · 길드 특제 도시락 6 · 영웅 결전 도시락 9; Drinks unchanged).
Shelf Life = 2 (§SHELF LIFE — EXACT, v2.9.0)
Buy / Sell = 400 / 800 (User 2026-09-24, v2.9.0; was 600 / 1200)
Unlisted implementation-only flavor fields inherit the previous Item where identity remains unchanged, except where this spec states otherwise; shelf lives are the §SHELF LIFE — EXACT table (v2.9.0).
| 29 | 세계수 생환부적 | Insurance E | 400 / 800 | Death -> Severe Injury once | Death Insurance |
## SHELF LIFE — EXACT
(User 2026-09-24/25, v2.9.0): no active Item is non-expiring; every unit has a shelf life of 2 to 5 days, counted from the
stocking day, and is discarded at the morning it runs out. The rule behind the table:
- Food: 2 days unless it carries a Hazard Counter (컵라면 3, 집중 사탕 4, 불룡볶음면 3); 초코바 is 2
- Drink: 2 days unless Uncommon or above (3) or a Hazard Counter Drink (얼음컵 3, 용사의 곡주 4, 쿨링 이온음료 5)
- Potion: 3 / 4 / 5 / 5 by tier (하급 / 중급 / 상급 / 최상급)
- Field Gear: 3 (Common), 4 (Uncommon), 5 (Rare and above)
- Insurance / Special: 구급키트 4, 귀환석 4, 세계수 생환부적 5, 황금 1+1 쿠폰 5
- 대형 냉장고 and 냉장 유통 계약 extend Food/Drink exactly as `RELIC_v2.8.0.md` states; nothing else moves a shelf life
| ID | Item | Category | Shelf |
|---|---|---|---:|
| rice | 삼각김밥 | Food | 2d |
| ramen | 컵라면 | Food | 3d |
| bar | 간단 도시락 | Food | 2d |
| choco | 초코바 | Food | 2d |
| candy | 집중 사탕 | Food | 4d |
| lava | 불룡볶음면 | Food | 3d |
| premium | 길드 특제 도시락 | Food | 2d |
| battlelunch | 영웅 결전 도시락 | Food | 2d |
| water | 생수 | Drink | 2d |
| coffee | 캔커피 | Drink | 2d |
| herbtea | 진정 허브티 | Drink | 2d |
| ice | 얼음컵 | Drink | 3d |
| energy | 에너지드링크 | Drink | 3d |
| wine | 용사의 곡주 | Drink | 4d |
| ion | 쿨링 이온음료 | Drink | 5d |
| herobar | 왕도 천연암반수 | Drink | 3d |
| hyperenergy | 초고속 에너지드링크 | Drink | 3d |
| sageelixir | 대현자 허브엘릭서 | Drink | 3d |
| potion | 하급 포션 | Potion | 3d |
| midpotion | 중급 포션 | Potion | 4d |
| highpotion | 상급 포션 | Potion | 5d |
| toppotion | 최상급 포션 | Potion | 5d |
| battery | 랜턴 건전지 | Field Gear | 3d |
| rope | 경량 로프 | Field Gear | 3d |
| mask | 방진마스크 | Field Gear | 4d |
| heat | 핫팩 | Field Gear | 4d |
| cloak | 방수망토 | Field Gear | 4d |
| coating | 부식 방지 코팅제 | Field Gear | 4d |
| boots | 원정용 장화 | Field Gear | 4d |
| snowgoggles | 설원 고글 | Field Gear | 4d |
| antidote | 농축 해독제 | Field Gear | 5d |
| spiderkit | 거미줄 방호세트 | Field Gear | 5d |
| slimesuit | 연금 방수슈트 | Field Gear | 5d |
| cryptlantern | 성화 랜턴 | Field Gear | 5d |
| snowvisor | 백설 방한고글 | Field Gear | 5d |
| magmagear | 마그마 냉각장비 | Field Gear | 5d |
| kit | 구급키트 | Insurance | 4d |
| stone | 귀환석 | Insurance | 4d |
| tree | 세계수 생환부적 | Insurance | 5d |
| coupon | 황금 1+1 쿠폰 | Special | 5d |
SALE shelf order: nearest expiry first, ties in the existing order; each row carries `폐기 N일` (exact UI -> `UI_UX_v2.8.0.md` §SALE — SHELF ORDER) (User 2026-09-24/25, v2.9.0)
```

## AMENDMENT — v2.9.0 F6: fit emphasis retired / fixed effect order / category grammar once / transaction result stub (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F6): the matching-effect / today-fit emphasis is retired on SALE and ORDER rows (the judgement is the player's); Item effect lines stand in one fixed per-category order (ITEM §PRESENTATION ORDER); the category grammar is taught once (COPY_AUDIT §8-0 / §3-7 OFFER); each sale shows a per-customer receipt stub `단골도 {±N} · 소지금 {A} → {B}` (~2.5 s, PRESENTATION §TRANSACTION BEAT A8); refusals keep the engine-reason reply pools; PRESENTATION §LEARNING AFTER RESULT. Earlier lines this batch supersedes were removed from the fences above in place.

```new
### PRESENTATION ORDER — EXACT
(User 2026-09-24, v2.9.0): an Item's effect lines are listed in one fixed order by category, the same on the ORDER offer row, the SALE shelf row, the counter tray's `특수 효과` line and the codex, never reordered or emphasized by the Gate or the customer:
Food       : 피로 회복 N first, then the Item's other effects in catalog order
Drink      : Stat / Hazard Counter effects in catalog order first, then 피로 회복 N
Potion     : 투력 +N
Field Gear : Hazard Counter effects in catalog order (a Hybrid keeps both)
Insurance  : its one function line
Special    : its one function line
The order is identity information (what kind of Item this is), not advice.
```

## AMENDMENT — v2.9.0 F7: quick-view status line / purchase notice / Counter judgement split (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F7): the owned Store Support quick view carries a runtime status line for condition-type supports only; the purchase notice drops its second sentence; the Counter judgement is split into 직접 대응 / 관련 준비 with one owner (RELIC §COUNTER JUDGEMENT) — the acceptance floor and 원정 위험 게시판 read 관련 준비, the multipliers, pity and cert rewards read 직접 대응, the 기동-for-속박/진창 exception is retired; the accessible-mode base need is 0.72 (measured, not tuned). Earlier lines this batch supersedes were removed from the fences above in place.

```new
The Natural alternative (the pressed Stat) is 관련 준비, never a Counter: no Counter multiplier, no Counter pity and no Counter-conditioned Store Support reads it; only the purchase acceptance floor and 원정 위험 게시판 do (`RELIC_v2.8.0.md` §COUNTER JUDGEMENT; (User 2026-09-24, v2.9.0)).
```

## AMENDMENT — v2.9.1 balance (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1 balance, `archive/v2.9.1-balance/v29-balance-agreements.md` §5): Counter values by Rarity with the 강인함 +4 rule; Potion 8 / 14 / 20 / 28; 간단 도시락 강인함 12 · 불룡볶음면 강인함 8 · 길드 특제 도시락 강인함 16 · 에너지드링크 기동 17 · Epic drinks 22 / 24; Fatigue recovery 삼각김밥 5 · 컵라면 3 · 간단 도시락 6 · 불룡볶음면 3 · 길드 특제 도시락 7; prices raised with the effect (+15% / +20% / Epic +10%); Sell = Buy × 2 for every Item. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
| battlelunch | 영웅 결전 도시락 | Food E | 210 / 440 | 강인함 +18, Supply 9 | 2d |
- narrow Main Hazard specialists with similar +16~18 Counter value should remain in comparable practical SALE bands
| poison | 농축 해독제 +18 | 방진마스크 +12 | 강인함 / 해독가 / 거미줄 방호세트 +12 |
| bind | 경량 로프 +16 | — | 기동 / Stat support / 거미줄 방호세트 +12 |
| corrosion | 부식 방지 코팅제 +18 | — | 방수망토 +6 / 강인함 / 연금 방수슈트 +12 |
| mire | 원정용 장화 +16 | — | 방수망토 +6 / 기동 / 연금 방수슈트 +12 |
| fear | 용사의 곡주 +18 | 집중 사탕 +10 | 정신 / 성화 랜턴 +12 |
| cold | 핫팩 +18 | 컵라면 +10 | 불룡볶음면 +6 / 강인함 / 백설 방한고글 +12 |
| 중급 포션 | Uncommon | 110 / 230 | 투력 +12 |
| 상급 포션 | Rare | 150 / 300 | 투력 +16 |
| 최상급 포션 | Epic | 190 / 400 | 투력 +24 |
Buy / Sell = 40 / 85
150 / 320
독 +12
속박 +12
부식 +12
진창 +12
공포 +12
어둠 +12
냉기 +12
화이트아웃 +12
160 / 340
화염 +14
기동 +18
정신 +20
190 / 400
투력 +24
| 6 | 캔커피 | Drink C | 40 / 85 | 기동 +12, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 40 / 85 | 정신 +15, Supply 2 | Stat route |
| 9 | 얼음컵 | Drink C | 30 / 65 | 화염 +10, Supply 1 | Fire Lower |
| 10 | 랜턴 건전지 | Field Gear C | 45 / 95 | 어둠 +16 | Dark Main |
| 11 | 경량 로프 | Field Gear C | 50 / 105 | 속박 +16 | Bind Main |
| 14 | 에너지드링크 | Drink U | 70 / 150 | 기동 +15, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink U | 60 / 130 | 공포 +18, 기동 -4, Supply 1 | Fear Main / RiskReward |
| 17 | 방진마스크 | Field Gear U | 65 / 135 | 독 +12 | Poison Lower |
| 18 | 핫팩 | Field Gear U | 60 / 130 | 냉기 +18 | Cold Main |
| 19 | 방수망토 | Field Gear U | 75 / 160 | 부식 +6, 진창 +6 | Dual Hybrid |
| 20 | 부식 방지 코팅제 | Field Gear U | 70 / 150 | 부식 +18 | Corrosion Main |
| 21 | 원정용 장화 | Field Gear U | 65 / 135 | 진창 +16 | Mire Main |
| 22 | 설원 고글 | Field Gear U | 60 / 125 | 화이트아웃 +16 | Whiteout Main |
| 23 | 상급 포션 | Potion R | 150 / 300 | 투력 +16 | — |
| 24 | 농축 해독제 | Field Gear R | 80 / 170 | 독 +18 | Poison Main |
| 26 | 중급 포션 | Potion U | 110 / 230 | 투력 +12 | — |
| 28 | 쿨링 이온음료 | Drink R | 80 / 170 | 화염 +18, Supply 1 | Fire Main |
| 31 | 거미줄 방호세트 | Field Gear E | 150 / 320 | 독 +12, 속박 +12 | Spider Hybrid |
| 32 | 연금 방수슈트 | Field Gear E | 150 / 320 | 부식 +12, 진창 +12 | Slime Hybrid |
| 33 | 성화 랜턴 | Field Gear E | 150 / 320 | 공포 +12, 어둠 +12 | Crypt Hybrid |
| 34 | 백설 방한고글 | Field Gear E | 150 / 320 | 냉기 +12, 화이트아웃 +12 | Snow Hybrid |
| 35 | 마그마 냉각장비 | Field Gear E | 160 / 340 | 화염 +14, 투력 +6 | Fire Hybrid |
| 38 | 초고속 에너지드링크 | Drink E | 160 / 340 | 기동 +18, Supply 2 | Top-end mobility |
| 39 | 대현자 허브엘릭서 | Drink E | 160 / 340 | 정신 +20, Supply 2 | Top-end spirit |
| 40 | 최상급 포션 | Potion E | 190 / 400 | 투력 +24 | Top-end raw Power |
```

```new
- narrow Main Hazard specialists of one Rarity should remain in comparable practical SALE bands
- Sell = Buy × 2 for every Item, so the Player can predict a price from its cost (User 2026-09-25, v2.9.1 balance)
- Common prices hold (the early low margin is the D1~10 operating-cost pressure); an Uncommon / Rare whose effect rose at the
v2.9.1 balance costs +15% (+20% when the effect rose 30%+), an Epic whose effect rose +10%, Insurance holds
(User 2026-09-25, v2.9.1 balance)
| poison | 농축 해독제 +30 | 방진마스크 +24 | 강인함 / 해독가 / 거미줄 방호세트 +22 |
| bind | 경량 로프 +16 | — | 기동 / Stat support / 거미줄 방호세트 +18 |
| corrosion | 부식 방지 코팅제 +24 | — | 방수망토 +6 / 강인함 / 연금 방수슈트 +22 |
| mire | 원정용 장화 +20 | — | 방수망토 +6 / 기동 / 연금 방수슈트 +18 |
| fire | 쿨링 이온음료 +26 | 얼음컵 +10 | 기동 / 내열성 / 마그마 냉각장비 +18 |
| fear | 용사의 곡주 +20 | 집중 사탕 +10 | 정신 / 성화 랜턴 +18 |
| dark | 랜턴 건전지 +16 | — | 정신 / 눈썰미 / 성화 랜턴 +18 |
| cold | 핫팩 +24 | 컵라면 +10 | 불룡볶음면 +12 / 강인함 / 백설 방한고글 +22 |
| whiteout | 설원 고글 +20 | — | 정신 / 눈썰미 / 백설 방한고글 +18 |
Counter values by Rarity (User 2026-09-25, v2.9.1 balance): within one Rarity, `Counter + the pressed Stat's
defense contribution` is equal, so a 강인함-pressed Hazard (독 · 냉기 · 부식, 강인함 ÷3) carries +4 over a 기동- / 정신-pressed
one (÷2). Field Gear and the Main Drink Counters: Common 16 · Uncommon 20 / 24 · Rare 26 / 30 · Epic hybrid 18 / 22
얼음컵, 방수망토) keep their values.
| 중급 포션 | Uncommon | 125 / 250 | 투력 +14 |
| 상급 포션 | Rare | 175 / 350 | 투력 +20 |
| 최상급 포션 | Epic | 210 / 420 | 투력 +28 |
Buy / Sell = 40 / 80
165 / 330
독 +22
속박 +18
부식 +22
진창 +18
공포 +18
어둠 +18
냉기 +22
화이트아웃 +18
175 / 350
화염 +18
기동 +26
정신 +28
210 / 420
투력 +28
Buy / Sell = 80 / 160
| water | 생수 | Drink C | 40 / 80 | 강인함 +10, Supply 2 | 2d |
| bar | 간단 도시락 | Food U | 100 / 200 | 강인함 +12, Supply 6, 원정 소지금 획득 +20% | 2d |
| premium | 길드 특제 도시락 | Food R | 185 / 370 | 강인함 +16, Supply 7, 원정 소지금 획득 +40% | 2d |
| battlelunch | 영웅 결전 도시락 | Food E | 210 / 420 | 강인함 +18, Supply 9 | 2d |
| herobar | 왕도 천연암반수 | Drink E | 185 / 370 | 강인함 +24, Supply 2 | 3d |
| 3 | 컵라면 | Food C | 45 / 90 | 냉기 +10, Supply 3 | Cold Lower |
| 5 | 초코바 | Food C | 30 / 60 | 기동 +8, Supply 3 | — |
| 6 | 캔커피 | Drink C | 40 / 80 | 기동 +12, Supply 2 | Stat route |
| 7 | 진정 허브티 | Drink C | 40 / 80 | 정신 +15, Supply 2 | Stat route |
| 9 | 얼음컵 | Drink C | 30 / 60 | 화염 +10, Supply 1 | Fire Lower |
| 10 | 랜턴 건전지 | Field Gear C | 45 / 90 | 어둠 +16 | Dark Main |
| 11 | 경량 로프 | Field Gear C | 50 / 100 | 속박 +16 | Bind Main |
| 12 | 집중 사탕 | Food C | 35 / 70 | 공포 +10, Supply 2 | Fear Lower |
| 13 | 불룡볶음면 | Food U | 80 / 160 | 강인함 +6, 냉기 +12, Supply 3 | Cold Hybrid |
| 14 | 에너지드링크 | Drink U | 80 / 160 | 기동 +17, Supply 2 | Stat route |
| 15 | 용사의 곡주 | Drink U | 70 / 140 | 공포 +20, 기동 -4, Supply 1 | Fear Main / RiskReward |
| 16 | 구급키트 | Insurance U | 80 / 160 | Outcome 1단계 완화 (중상 → 부상 · 부상 → 무사) Aftercare | Aftercare |
| 17 | 방진마스크 | Field Gear U | 80 / 160 | 독 +24 | Poison Lower |
| 18 | 핫팩 | Field Gear U | 70 / 140 | 냉기 +24 | Cold Main |
| 19 | 방수망토 | Field Gear U | 75 / 150 | 부식 +6, 진창 +6 | Dual Hybrid |
| 20 | 부식 방지 코팅제 | Field Gear U | 85 / 170 | 부식 +24 | Corrosion Main |
| 21 | 원정용 장화 | Field Gear U | 75 / 150 | 진창 +20 | Mire Main |
| 22 | 설원 고글 | Field Gear U | 70 / 140 | 화이트아웃 +20 | Whiteout Main |
| 23 | 상급 포션 | Potion R | 175 / 350 | 투력 +20 | — |
| 24 | 농축 해독제 | Field Gear R | 95 / 190 | 독 +30 | Poison Main |
| 26 | 중급 포션 | Potion U | 125 / 250 | 투력 +14 | — |
| 28 | 쿨링 이온음료 | Drink R | 95 / 190 | 화염 +26, Supply 1 | Fire Main |
| 31 | 거미줄 방호세트 | Field Gear E | 165 / 330 | 독 +22, 속박 +18 | Spider Hybrid |
| 32 | 연금 방수슈트 | Field Gear E | 165 / 330 | 부식 +22, 진창 +18 | Slime Hybrid |
| 33 | 성화 랜턴 | Field Gear E | 165 / 330 | 공포 +18, 어둠 +18 | Crypt Hybrid |
| 34 | 백설 방한고글 | Field Gear E | 165 / 330 | 냉기 +22, 화이트아웃 +18 | Snow Hybrid |
| 35 | 마그마 냉각장비 | Field Gear E | 175 / 350 | 화염 +18, 투력 +10 | Fire Hybrid |
| 38 | 초고속 에너지드링크 | Drink E | 175 / 350 | 기동 +26, Supply 2 | Top-end mobility |
| 39 | 대현자 허브엘릭서 | Drink E | 175 / 350 | 정신 +28, Supply 2 | Top-end spirit |
| 40 | 최상급 포션 | Potion E | 210 / 420 | 투력 +28 | Top-end raw Power |
```

## AMENDMENT — v2.9.1 balance: 위령제 conditions / 만반의 준비 tutorial / hybrid rule (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1): 위령제 follows the ordinary Event conditions (TYPE Run / Opportunity, WEIGHT 1.0, may recur, +1 each time); a contextual 만반의 준비 tutorial the first time both Bag slots of an uninjured customer departing below Fatigue 20 are filled; an Epic hybrid stays below every specialist of the same or a higher Rarity (it may exceed a Common Main). Earlier declarations this batch supersedes were removed from the fences above in place.

```new
(a hybrid stays below every specialist of the same or a higher Rarity for each Hazard it covers; it may exceed a
Common Main such as 경량 로프 / 랜턴 건전지 — User 2026-09-25, v2.9.1). Food / Drink secondary Counters (컵라면, 집중 사탕,
```

## AMENDMENT — v2.9.1 balance: hybrid dominance rule (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1): the no-dominance rule compares a hybrid with Directs of the same or a higher Rarity only.

```text
- Hybrid must not strictly dominate Direct
```

```new
- Hybrid must not strictly dominate a Direct of the same or a higher Rarity (User 2026-09-25, v2.9.1: an Epic hybrid may exceed a Common Main)
```

## AMENDMENT — Item values (User 2026-09-26, v2.9.6)

User 2026-09-26: 불룡볶음면 냉기 +12 / 강인함 +6, 귀환석 200 / 400, Epic Drink Stat +4. Lines declared earlier are edited in place
above; the superseded 귀환석 row below is dropped.

```text
| 25 | 귀환석 | Insurance R | 260 / 520 | Emergency Escape +50%p path | Severe/Death Insurance |
```

```new
불룡볶음면 냉기 +6 → +12 with 강인함 +8 → +6 (User 2026-09-26, v2.9.6): its Cold defense read below 컵라면's; it now sits between the Common Lower (10) and the Uncommon Main (24).
Epic Drink Stat +4 (User 2026-09-26, v2.9.6): 초고속 에너지드링크 기동 22 → 26, 대현자 허브엘릭서 정신 24 → 28, 왕도 천연암반수 강인함 20 → 24 - one Rarity step over the Uncommon Drink was +5 for 2.2× the price.
| 25 | 귀환석 | Insurance R | 200 / 400 | Emergency Escape +50%p path | Severe/Death Insurance |
```

## AMENDMENT — 마그마 냉각장비 투력 +10 (User 2026-09-26, v2.9.6)

User 2026-09-26: 투력 +6 → +10. The superseded lines below are dropped; a line declared earlier is edited in place above.

```text
투력 +6
The `투력 +6` on `마그마 냉각장비` is an explicit catalog exception; it is not permission for generic specialist Field Gear to gain Core Stats.
```

```new
투력 +10
The `투력 +10` on `마그마 냉각장비` is an explicit catalog exception; it is not permission for generic specialist Field Gear to gain Core Stats.
투력 +6 → +10 (User 2026-09-26, v2.9.6): the only Epic hybrid for a one-Hazard Gate read weaker at its own Gate than the Rare 쿨링 이온음료; the combat half is what the Fire Gate's higher Power asks for, and 화염 +18 stays below the Main's +26.
```
