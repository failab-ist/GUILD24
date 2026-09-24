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
Unlisted implementation-only flavor fields/shelf lives inherit the previous Item where identity remains unchanged, except where this spec states otherwise.
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
Catalog tables below keep the internal notation `Supply N`; the values are unchanged.
| fire | 쿨링 이온음료 +18 | 얼음컵 +10 | 기동 / 내열성 / 마그마 냉각장비 +14 |
| dark | 랜턴 건전지 +16 | — | 정신 / 눈썰미 / 성화 랜턴 +12 |
| whiteout | 설원 고글 +16 | — | 정신 / 눈썰미 / 백설 방한고글 +12 |
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
Buy / Sell = 80 / 170
It carries no Core Stat; its whole function is the Aftercare below, priced as pure Insurance (User 2026-09-24, v2.9.0).
| 16 | 구급키트 | Insurance U | 80 / 170 | Outcome 유지 / persistent Injury 1단계 Aftercare | Aftercare |
```

## AMENDMENT — v2.9.0 revision 3: 어둠 -> 기동, no Gate shares a Stat (User decision 2026-09-24)

어둠 presses 기동 ×0.40 so that 망자역 지하묘지 (공포 + 어둠) is answered by 정신 + 기동, never one Stat; the split is 강인함 3 /
기동 4 / 정신 2. The revision-1/2 declarations this replaces were edited out of the fences above in place.

```new
Natural alternative = the one Stat each Hazard presses (3 / 4 / 2, 투력 never; 어둠 -> 기동 per User 2026-09-24 revision 3) -> `DUNGEON_HAZARD_v2.8.0.md` (User 2026-09-24, v2.9.0)
```
