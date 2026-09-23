# NPC_TRAIT_QA

DOC=NPC_TRAIT_QA
OWNER=qa,npc,trait,roster,living_npc_cap

DOC_VERSION=2.5.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=DESIGN_QA_SPEC


Status values are NOT stored here.
This file defines acceptance criteria only.

## NPC-Q01 — PERSISTENT IDENTITY
SETUP:
Meet and revisit same NPC.

EXPECT:
Same:
- identity
- Job
- Traits
- accumulated growth/history

PASS:
NPC does not regenerate as a new character.

## NPC-Q02 — JOB IDENTITY
SETUP:
Inspect all active Jobs.

EXPECT:
Job differences come from:
- base stats
- growth

PASS:
No hidden Job-ID passive is required for identity.

## NPC-Q03 — NO HIDDEN JOB EFFECT
SETUP:
Compare same item/effect on different Jobs with equal relevant stats where possible.

EXPECT:
No secret Job-ID modification to:
- item effect
- hazard defense
- loot
- escape
- purchase interest
- removed/noncanonical family/hazard keys such as `undead`

PASS:
Differences are explainable by stats/visible traits, with no legacy Job-specific exception.

## NPC-Q04 — JOB FAMILY COVERAGE
SETUP:
Evaluate each playable Job across all Dungeon Families.

EXPECT:
Each Job has:
- >=2 meaningful natural stat advantages
- some pressure areas requiring preparation

PASS:
No Job is mandatory for a Family and no Job solves all Families.

## TRAIT-Q01 — EFFECT SEMANTIC PRESENTATION

SETUP:
Inspect POSITIVE/MIXED/NEGATIVE internal Traits including mixed-sign effects.

EXPECT:
- Player does not see `이점/양면/약점` or ▲/◆/▼ Trait quality labels
- internal direction still exists for generation/Event rules
- every material effect uses canonical `benefit/cost/neutral` semantic metadata
- UI does not infer meaning from numeric sign alone
- effect wording remains understandable without color

PASS:
Player judges the Trait from actual effects while implementation retains internal direction safely.

## TRAIT-Q02 — TRAIT COUNT READABILITY
SETUP:
Generate/advance many NPCs.

EXPECT:
Normal visible trait count stays around <=3–4.

PASS:
NPC panel does not become modifier-wall gameplay.

## TRAIT-Q03 — MUTUAL EXCLUSION
SETUP:
Generate large sample.

EXPECT:
Never coexist:
- 용감함 + 겁쟁이
- 대식가 + 소식가
- 신중함 + 무모함
- 구두쇠 + 충동구매
- 강골 + 허약함
- 행운아 + 불운아
- 수집가 + 실속파
- 지구력 + 쉽게 지침
- 사교적인 + 낯가림

PASS:
No invalid pair appears.

## TRAIT-Q04 — GREED/MISER INDEPENDENCE
SETUP:
Generate large sample.

EXPECT:
`탐욕 + 구두쇠` may coexist.

PASS:
No mutual-exclusion rule blocks them.

## TRAIT-Q05 — RARITY INDEPENDENCE
SETUP:
Sample Common/Epic NPCs.

EXPECT:
Trait quality is not directly dictated by NPC rarity.

PASS:
Epic can have negative traits; Common can have strong combinations.

## TRAIT-Q06 — SOFT SPAWN GUARD
SETUP:
Sample many NPC generations.

EXPECT:
Extreme unusable negative bundles are not common enough to erase play value.

PASS:
Guard is soft, not `rarity = good traits`.

## TRAIT-Q07 — CATEGORY AFFINITY SCOPE
SETUP:
Use category-affinity trait on multi-effect item.

EXPECT:
Only intended category core effect is amplified.

PASS:
Unrelated hazard counters/penalties are not multiplied automatically.

## TRAIT-Q08 — INFORMATION RELIABILITY TRAIT
SETUP:
Use any canonical Trait that explicitly makes NPC-reported information unreliable.

EXPECT:
- the Trait effect is understandable to the player
- reported information may differ only as defined by that Trait
- underlying actual game state remains unchanged unless the Trait explicitly says otherwise
- no unrelated price/item bonus is implied
- tutorial language teaches the broader Trait/Event destination-uncertainty rule rather than presenting 허세 as a central system

PASS:
Information reliability changes without silently changing destination routing or unrelated systems.

## TRAIT-Q09 — TRAIT MODIFICATION RARITY
SETUP:
Play/simulate full runs.

EXPECT:
Permanent Trait editing is rare.

PASS:
It does not function like routine equipment swapping.

## TRAIT-Q10 — RED REMOVAL EVENT
SETUP:
Trigger approved Rare Trait event.

EXPECT:
Player chooses one NPC and one internal NEGATIVE Trait to remove.

PASS:
No automatic random removal from unintended NPC.

## TRAIT-Q11 — POSITIVE ADD EVENT
SETUP:
Trigger approved Epic Trait event.

EXPECT:
Player chooses 1 of 3 positive trait options for one NPC.

PASS:
Choice is explicit.

## TRAIT-Q12 — NO FORCED RANDOM NEGATIVE
SETUP:
Play normal events.

EXPECT:
Invested NPC does not receive random permanent negative trait without explicit risk/reward choice.

PASS:
No forced punishment path.


## TRAIT-Q13 — NO LEGACY RESOLUTION KEYS
SETUP:
Audit all active Trait definitions and expedition-resolution references.

EXPECT:
No active Trait effect reads/writes:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

PASS:
Traits resolve only through current canonical systems.
Old source fields may exist only as inert migration/dead data pending safe cleanup.

## TRAIT-Q14 — SUPPLY MIGRATION SAFETY
SETUP:
Inspect any Trait previously or currently associated with food amount, long expedition, or Supply behavior, including 대식가/소식가.

EXPECT:
- no legacy `long` value is carried over automatically
- any active Supply-related Trait effect uses the canonical Supply/Supply Burden model
- the effect is visible/understandable to the player
- active effects match the frozen NPC_TRAIT catalog; no legacy effect is inferred or invented

PASS:
No hidden legacy long/thirst mechanic survives through Trait code.

## TRAIT-Q15 — ACTIVE CATALOG FREEZE
SETUP:
Audit all selectable/generated Trait IDs.

EXPECT:
- exactly 30 active canonical Traits
- names/directions/effects match NPC_TRAIT ACTIVE TRAIT CATALOG
- 카페인중독 / 술고래 / 언데드혐오 are not active selectable Traits
- 평정심 is not in the active pool
- no extra source-only Trait leaks into generation

PASS:
Trait pool identity is frozen for the v2.5 retained implementation baseline.

## TRAIT-Q16 — SOCIAL / REVISIT DIFFERENTIATION
SETUP:
Compare 사교적인, 낯가림, 냉담한 over repeated visits.

EXPECT:
- 사교적인 changes revisit selection weight only
- 낯가림 creates an early-visit purchase hurdle that expires after 2 visits
- 냉담한 reduces revisit weight but provides the explicit Cold-response benefit
- no Trait secretly creates a new relationship subsystem

PASS:
The three Traits create distinct play consequences rather than duplicate `more regular customer` outcomes.

## TRAIT-Q17 — CONDITION / SUPPLY / HAZARD TRAITS
SETUP:
Exercise 회복체질, 지구력, 쉽게 지침, 눈썰미, 해독가, 수족냉증, 준비성, 악바리, 대식가, 소식가.

EXPECT:
- effects resolve only through existing Recovery/Fatigue/Hazard/Supply/Injury systems
- 대식가/소식가 modify Food native core + integer Supply as canonicalized, not legacy long/thirst
- 준비성 adds +1 Supply per Food/Drink
- 악바리 reads current injury state and adds its stated Fatigue cost
- no Trait modifies hidden baseNoise

PASS:
New/reworked Traits are readable, testable, and do not create hidden micro-systems.

## DEST-Q01 — RANDOM DESTINATION
SETUP:
Generate multi-Gate customer set.

EXPECT:
Default destination is random among currently eligible open Gates.

PASS:
No auto-best-fit routing.

## DEST-Q02 — LIMITED REASSIGN EVENT
SETUP:
Trigger destination-change event.

EXPECT:
- one not-yet-finalized NPC
- one change
- player chooses another open Gate
- finalized NPC ineligible

PASS:
No automatic optimization.

## NPC-Q05 — NEWCOMER CURVE
SETUP:
Sample newcomer near current Day.

EXPECT:
No-item forecast usually ≈ 접전~불리.
Good preparation can reach ≈ 접전~우세.

PASS:
Newcomers are usable but not free aces.

## NPC-Q06 — INVESTED NPC CURVE
SETUP:
Sample returning invested NPC near same Day.

EXPECT:
No-item ≈ 접전~우세.
Good preparation can create reliable ace.

PASS:
Long-term investment has visible power.

## NPC-Q07 — HIGH-ROLL NEWCOMER
SETUP:
Sample many newcomers.

EXPECT:
Rare strong newcomer can exist.

PASS:
Exception exists without becoming average replacement strategy.

## NPC-Q08 — TRUSTED REGULAR / ROSTER FEEL TARGET
SETUP:
Normal full-run playtests across several seeds / Customer-build states.

EXPECT:
- mid/late run naturally produces around 2–4 trusted regulars
- some newcomer/replacement flow remains visible
- living NPC count never exceeds 22
- temporary Recovery does not create a free cap slot
- Death creates future capacity for normal newcomer generation
- the roster does not flood the Player with endless unfamiliar NPCs
- the roster does not collapse into the exact same tiny set every day

PASS:
Living NPC Cap=22 supports a memorable small core without one-NPC monopoly, roster inflation, or attachment dilution.

FAIL SIGNALS:
- Cap 22 is reached so early/often that Rookie/Royal newcomer events routinely become unusable
- fresh NPC flow consistently dilutes the 2–4 trusted-regular target
- the same tiny roster monopolizes visits across the run

## NPC-Q09 — LONG-TERM VALUE
SETUP:
Compare selective investment vs repeatedly discarding weak NPCs.

EXPECT:
Investment creates future value through existing:
growth/wallet/loyalty/revisit/final-roster channels.

PASS:
No separate punishment system is needed to make care matter.


## NPC-Q09 — META JOB UNLOCK POOL
SETUP:
Inspect fresh account, after 3 distinct Boss clears, after 6 distinct Boss clears.

EXPECT:
- fresh normal Job pool=[전사,궁수,마법사,사제]
- 도적 joins only after META 3-Boss unlock
- 광전사 joins only after META 6-Boss unlock

PASS:
Locked Jobs do not leak into normal NPC generation.

## NPC-Q10 — JOB MASTERY EFFECT OWNERSHIP
SETUP:
Inspect any implemented Job Mastery power adjustment.

EXPECT:
- effect modifies only visible Job Base/Growth channel defined here
- no hidden generic account-wide combat/Final multiplier
- exact values match the approved PASS3 Job table when available

PASS:
Job identity remains BaseStats+Growth and Mastery does not create a second hidden Job system.

## APPROVED_AMENDMENT_2026_09_12 — DEEP NPC REWARD QA

Deep Success:
- ordinary expedition result rewards/consequences remain
- bonus EXP uses existing Growth system
- bonus uses existing NPC Wallet/money channel

Deep Great Success:
- greater bonus EXP than Success
- greater Wallet reward than Success

FAIL if:
- separate `deepWallet` pool is added
- Day/Tier multiplier is added to the special Deep bonus without approval
- automatic Level +1 is used instead of EXP
- direct Loyalty / Trusted Regular granted
- new Deep currency / permanent Stat / buff / Mastery added
- failure outcome receives Deep bonus EXP/Wallet
