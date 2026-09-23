# DUNGEON_ITEM_QA

DOC=DUNGEON_ITEM_QA
OWNER=qa,dungeon,item,hazard,preparation,naked_run

DOC_VERSION=2.5.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=DESIGN_QA_SPEC


Status values are NOT stored here.
This file defines acceptance criteria only.

## DUN-Q01 — FAMILY IDENTITIES
SETUP:
Inspect all 5 Families.

EXPECT:
SPIDER=poison+bind
SLIME=corrosion+mire
FIRE=fire+highCombatPower
CRYPT=fear+dark
SNOW=cold+whiteout

PASS:
Each Family is mechanically distinct.

## DUN-Q02 — STAT MAPPING
SETUP:
Inspect hazard contributions.

EXPECT:
- poison -> 강인함
- bind -> 기동
- corrosion -> 강인함
- mire -> 기동
- fire -> 강인함
- fear -> 정신
- dark -> 정신 primary + 기동 secondary
- cold -> 강인함
- whiteout -> 정신 primary + 기동 secondary

PASS:
Player-facing stat roles match actual resolution.

## DUN-Q03 — SPIRIT RELEVANCE
SETUP:
Play Crypt and Snow content.

EXPECT:
정신 matters meaningfully in both.

PASS:
Spirit is not a one-Family stat.

## DUN-Q04 — FAMILY HAZARD BOUNDARIES
SETUP:
Inspect Family data.

EXPECT:
- canonical hazards are exactly poison/bind/corrosion/mire/fire/fear/dark/cold/whiteout
- wet is not an independent Slime hazard
- slow, if retained internally, is only an implementation alias of mire
- armor is not a Fire-family hazard
- undead is a Family Tag, not direct hazard
- long is not a Hazard
- thirst is not a Condition/Hazard/resource system
- fatigue is NPC condition
- 보급 부담 is global Gate modifier
- Fire second axis is higher Dungeon Combat Power, not a separate Hazard

PASS:
No contradictory extra hazard layer or dead key affects resolution.

## DUN-Q05 — T1 LEARNING / GROWTH OVERRIDE
SETUP:
Test T1 with:
- a well-grown suitable NPC without exact Counter
- the same/similar case with basic Direct Counter

EXPECT:
- strong growth can often make T1 viable even without exact Counter
- basic correct prep materially increases reliability
- T1 does not behave like a mandatory Item tax

PASS:
Growth matters and correct prep still feels useful.

## DUN-Q06 — T2 JUDGMENT ROUTE
SETUP:
Test T2 across grown NPCs with:
- primary Direct Counter
- Hybrid/Insurance/flex alternatives
- strong relevant Stats with lighter prep

EXPECT:
- Counter/Item coverage is materially valuable
- at least one normal route exists without two dedicated Direct Counters
- some strong-NPC cases create a real `cover it or trust growth?` decision
- T2 is not balanced as an automatic hard-counter tax in every case

PASS:
Preparation matters without eliminating judgment.

## DUN-Q07 — T3 SLOT CONTRACT
SETUP:
Test all Family T3 variants with appropriately grown NPCs.

EXPECT:
Viable clear route exists within <=2 meaningful required prep slots.

PASS:
Third Lv10+ slot remains insurance/flex/luxury.

## DUN-Q08 — DIRECT VS HYBRID
SETUP:
Compare specialist Direct vs multi-hazard Hybrid.

EXPECT:
Direct is more reliable on its specific target.
Hybrid is more flexible across uncertainty.

PASS:
Hybrid is not strict superior specialist.

## DUN-Q09 — NO SINGLE ITEM FAMILY DELETE
SETUP:
Test strongest relevant item in each Family.

EXPECT:
One item cannot erase entire Family challenge.

PASS:
Stats/secondary pressure/insurance decisions remain relevant.

## DUN-Q10 — RESIDUAL RISK
SETUP:
Use proper Direct Counter repeatedly.

EXPECT:
- T1/T2 very reliable
- T3 may retain small residual risk
- no item-specific hidden defect RNG

PASS:
Risk comes from canonical expedition resolution.

## DUN-Q11 — CAUSALITY
SETUP:
Block one hazard but fail due to another/combat.

EXPECT:
Result copy names actual cause.

PASS:
Blocked hazard is not falsely blamed.

## DUN-Q12 — FAMILY INTRODUCTION
SETUP:
Run multiple seeds.

EXPECT:
Start with ~3/5 Families.
Additional Families enter within canonical early/mid windows.

PASS:
Early mix varies across runs without late impossible surprise.

## DUN-Q13 — TIER DAY PROGRESSION
SETUP:
Sample generated days across bands.

EXPECT:
Higher Tier availability/weight rises over Run.

PASS:
No impossible early T3 and no flat same-difficulty run.

## DUN-Q14 — INTRA-BAND CURVE
SETUP:
Compare early vs late days inside same band.

EXPECT:
Higher-tier weight gradually increases.

PASS:
Day13 and Day18 are not necessarily identical distributions.

## DUN-Q15 — MULTI-GATE VARIETY
SETUP:
Generate multi-Gate days.

EXPECT:
Distinct Families preferred where practical.

PASS:
Repeated identical prep demand is not dominant unless intentional.


## DUN-Q16 — FINAL FAMILY DATA OWNERSHIP
SETUP:
Use a Final Expedition that selects canonical Dungeon Families.

EXPECT:
Final reads each selected Family's existing T2 Hazard definition from DUNGEON_HAZARD.
No alternate/duplicated Final-only Family Hazard table exists here.

PASS:
Dungeon Family data has one owner.
Detailed Final combination/power/clear QA -> FINAL_EXPEDITION.

## DUN-Q17 — SUPPLY BURDEN
SETUP:
Test expeditions with and without active Supply Burden using different Food/Drink Supply totals.

EXPECT:
- T1 never receives Supply Burden
- T2 starts from 35% Gate chance / required Supply 3
- T3 starts from 55% Gate chance / required Supply 5
- D30 Final receives no extra random Supply Burden
- Supply Burden and required Supply are visible before Order
- Food/Drink contribute visible Supply
- sufficient Supply avoids Supply Deficit
- insufficient Supply creates one shared expedition-wide penalty
- no thirst/hunger/caffeine subsystem is created
- excess Supply alone gives no extra success bonus
- T3 Supply Burden still has a viable <=2 meaningful required-prep-slot route

PASS:
Long-expedition preparation is one global Supply decision rather than an extra Hazard/micro-system, and the approved v2.5 retained starting eligibility/values are implemented.

## DUN-Q18 — HAZARD ROUTE COVERAGE
SETUP:
Audit all 9 canonical Hazards against ITEM matrix.

EXPECT:
Each Hazard has:
- 1 Main specialist route
- >=2 meaningful Alternative routes

Alternative routes may use Hybrid/secondary Counter/relevant Stat/Stat-support Item.
Insurance does not automatically count.

PASS:
No canonical Hazard depends on one mandatory SKU and alternatives are not duplicate copies.

## DUN-Q19 — NONCANONICAL KEY ISOLATION
SETUP:
Search runtime resolution paths for wet/armor/undead/long/thirst and Job-specific hazard keys.

EXPECT:
None changes expedition resolution as an independent Hazard or hidden Job solution.

PASS:
Only canonical Hazard/Supply systems affect gameplay.

## DUN-Q20 — PREPARATION NECESSITY / NAKED RUN

SETUP:
- representative multi-seed runs
- normal NPC progression
- no deliberate exploit
- compare:
  - A. repeated minimal/no preparation
  - B. reasonable Hazard-aware preparation

EXPECT:
- early game tolerates weak preparation
- preparation value increases with progression
- prepared play produces clearly better expedition outcomes
- naked/minimal-prep play must not remain a stable strategy into mid/late game

PASS:
- D1–3: weak/no prep usually survivable
- D4–7: repeated no-prep begins producing visible injury/retreat/failure cost
- D8–12: no-prep is materially worse than appropriate preparation
- D13–18: repeated naked play is not a reliable progression strategy
- D19+: reliable naked progression is exceptional, not normal
- T3 requires grown NPC + meaningful preparation for reliable outcomes

FAIL:
- player can routinely progress to mid/late game while ignoring Order/Item preparation
- NPC stat growth alone makes Hazard preparation largely irrelevant
- prepared vs unprepared outcome difference is too small to affect player decisions

NOTE:
Do not solve by adding arbitrary naked-run punishment.
Tune Dungeon pressure / Stat-route efficiency / growth / Item counter value so preparation naturally matters.

## ITEM-Q01 — PRODUCT CATEGORY
SETUP:
Inspect all canonical items.

EXPECT:
Each maps clearly to:
Food/Drink/Medical/FieldGear/Insurance/Special

PASS:
No ambiguous player-facing classification.

## ITEM-Q02 — FUNCTIONAL ROLE
SETUP:
Audit catalog.

EXPECT:
Items have understandable gameplay role:
Stat/Supply/Direct/Hybrid/Condition/Insurance/RiskReward/Economy/Utility

PASS:
No item exists only as unexplained modifier bundle.

## ITEM-Q03 — MATERIAL EFFECT VISIBILITY
SETUP:
Inspect Sale/Order item details.

EXPECT:
Important effect/penalty is player-readable.

PASS:
Material hidden behavior absent.

## ITEM-Q04 — NO GENERAL HIDDEN COMBO
SETUP:
Audit item resolution and multi-item use.

EXPECT:
No hidden:
- pair synergy
- threshold combo
- order-dependent combo
- penalty cancellation

PASS:
Only explicit described Special interactions may cross-reference items.

## ITEM-Q05 — EXPLICIT SPECIAL INTERACTION
SETUP:
Use 황금 1+1 coupon or equivalent explicit item.

EXPECT:
Interaction is stated in item description and resolves predictably.

PASS:
No hidden combo knowledge required.

## ITEM-Q06 — POTION / INJURY ROLE
SETUP:
Compare upper potion vs Bandage/First Aid.

EXPECT:
Potion owns general recovery/stat.
Bandage/First Aid owns injury insurance.

PASS:
Upper potion does not also dominate injury protection.

## ITEM-Q07 — HOT PACK VS LAVA NOODLE
SETUP:
Compare pure Cold response.

EXPECT:
Hot Pack > Lava Noodle for Cold specialization.

PASS:
Lava Noodle retains Food/Combat/Hybrid identity.

## ITEM-Q08 — MANA BATTERY
SETUP:
Use on different Jobs.

EXPECT:
Same base Spirit/Special effect regardless of Job.

PASS:
No Job-specific hidden modifier changes the Item effect.

## ITEM-Q09 — ACTIVE CATALOG BOUNDARY
SETUP:
Inspect all sellable/generated Item IDs.

EXPECT:
Active sellable catalog matches ITEM canonical catalog exactly.
No extra source-only Item enters Order/Sale/Expedition resolution.

PASS:
Catalog count/identity is stable and no omitted strict-superior item leaks into play.

## ITEM-Q10 — PREMIUM LUNCH
SETUP:
Compare across multiple contexts.

EXPECT:
Useful premium expedition/economy option.

PASS:
Does not dominate survival+supply+loot+stats simultaneously.

## ITEM-Q11 — RETURN STONE
SETUP:
Use in losing expeditions.

EXPECT:
Uses approved v2.5 retained starting escapeBonus +50%p and raises escape/retreat chance without increasing combat success directly.

PASS:
Acts as probabilistic lower-tier insurance, not a success item or Death->Severe conversion.

## ITEM-Q12 — RETREAT REWARD
SETUP:
Trigger Return Stone retreat.

EXPECT:
EXP reduced but >0.
Loot nearly none.

PASS:
Hierarchy feels distinct from success and death.

## ITEM-Q13 — WORLD TREE INSURANCE
SETUP:
Trigger lethal outcome with Epic World Tree insurance active.

EXPECT:
Death converts once to Severe Injury.

PASS:
Clearly stronger survival tier than Return Stone and not treated as Food.

## ITEM-Q14 — CATEGORY AFFINITY SCOPE
SETUP:
Apply Food affinity to multi-effect Food item.

EXPECT:
Food-native core effect may increase.
Unrelated hazard counter does not auto-scale.

PASS:
Whole-item multiplier absent.

## ITEM-Q15 — HAZARD ITEM MATRIX
SETUP:
Build the 9-Hazard × Item/Stat route matrix.

EXPECT:
For every canonical Hazard:
- 1 Main specialist
- >=2 meaningful Alternatives
- Main remains the most reliable dedicated response

PASS:
No Hazard relies on a single mandatory SKU and Hybrid does not strictly dominate its specialist.

## ITEM-Q16 — NEW ITEM JUSTIFICATION
SETUP:
Review any newly added catalog item.

EXPECT:
It fills a proven coverage/price/role gap.

PASS:
No addition exists only to increase item count.

## ITEM-Q17 — SUPPLY / NO THIRST
SETUP:
Audit all Food/Drink effects and expedition resolution.

EXPECT:
- every active Food/Drink has visible Supply > 0
- catalog Supply values match ITEM starting table
- no Item creates/cleanses thirst
- no hidden Food+Drink pairing
- no caffeine stacking
- no hunger/thirst gauge

PASS:
Supply is the only canonical generic long-expedition preparation resource.

## ITEM-Q18 — FRESH CORE-EFFECT SCOPE
SETUP:
Apply generic Food/Drink category boosts to multi-role Items.

EXPECT:
Generic core boost affects Supply/native Stat/native recovery only.
Hazard Counter/Insurance/RiskReward penalty does not auto-scale unless explicitly stated by the Relic/effect.

PASS:
Fresh-category multipliers do not become blanket whole-item multipliers.

## ITEM-Q19 — ACTIVE CATALOG STRUCTURE
SETUP:
Audit canonical 30-item catalog by Category/Rarity/Role.

EXPECT:
- 30 active items
- each has exactly one player-facing Category
- low-rarity specialists remain meaningful
- new Items fill documented Hazard/build coverage gaps

PASS:
Catalog supports preparation and Relic builds without filler or strict universal upgrades.

## SIM-Q01 — COMBAT VARIANCE
SETUP:
Run full-run simulations/playtests with canonical baseNoise ±17.5%.

EXPECT:
Borderline outcomes can swing.
Strong invested NPC remains trustworthy.
The hidden exact variance is not exposed to the Player or encoded as a knowledge-check Trait.

PASS:
±17.5% is used as the v2.5 retained baseline and any later retune is supported by outcome evidence.

## SIM-Q02 — ROLE USAGE
SETUP:
Full-run simulation/playtest.

EXPECT:
Supply, Direct, Hybrid, Stat, Insurance, RiskReward and explicit Utility all receive meaningful use where applicable.

PASS:
No role is effectively dead or always mandatory.

## DUN-Q21 — HAZARD EXPLANATION CONSISTENCY
SETUP:
Inspect all 9 canonical Hazards in Gate/preparation UI on desktop and touch/mobile.

EXPECT:
Every Hazard exposes the canonical short pressure explanation:
- poison / corrosion / fire / cold -> 강인함
- bind / mire -> 기동
- fear -> 정신
- dark / whiteout -> 정신 중심 + 기동 보조

Desktop:
hover/focus access works where tooltip is used.

Mobile:
tap or inline access provides the same information.

PASS:
- no canonical Hazard is name-only while another receives a detailed effect line
- no hover-only information
- `slow` is not presented as a separate canonical Hazard
- exact hidden formula remains hidden


## ITEM-Q META — GOLDEN 1+1 UNLOCK
SETUP:
Inspect Item offer/acquisition eligibility before and after first distinct Boss clear.

EXPECT:
- 황금 1+1 쿠폰 remains canonical Item ID 30
- before META unlock it does not appear through normal acquisition
- after first distinct Boss clear it becomes eligible under its normal Item rules
- Item effect itself is unchanged by the unlock system

PASS:
META gates availability only; ITEM continues to own the effect.

## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION QA

### GREAT SUCCESS
PASS:
- failed expedition cannot become Great Success
- ordinary combat/environment/injury/escape resolution occurs first without Great Success
- only final ordinary `성공` may upgrade to `대성공`
- injury/retreat/severe injury/death cannot coexist with Great Success
- margin uses prepared pre-noise Combat ability rather than lucky combat noise
- larger prepared Combat margin never lowers Great Success chance
- Great Success remains below 100% certainty
- signal threshold matches actual Great Success calculation
- no new hidden master-readiness Stat

### DEEP SCHEDULE
PASS:
- only D7/D14/D21/D28 candidate windows
- exactly 2 or 3 actual occurrences
- at least one D7/D14
- at least one D21/D28
- Save/Load does not reroll

### DEEP GATE
PASS:
- base is one of today's highest-Tier actual Gates
- tie is deterministic/seeded
- Family unchanged
- Tier unchanged
- Hazard set unchanged
- required Combat Power = base Gate Power × one PASS3 Deep factor
- no additive / Day-specific Deep Power curve
- ordinary Item/Supply resolution used once
- one expedition / one result
- no T4 / extra Hazard / second roll

### EVENT EXCLUSION
PASS:
- actual Deep Day produces no Normal Event
- Deep is not selected from Event catalog
- no automatic 35% chance compensation
