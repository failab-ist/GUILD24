# NPC_TRAIT_QA

DOC=NPC_TRAIT_QA
OWNER=qa,npc,trait,roster,living_npc_cap,wallet,destination,condition,growth,revisit,recent_expedition,injury
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/NPC_TRAIT_QA_v2.8.0-patch.md,history/NPC_TRAIT_QA_v2.7.0.md,history/NPC_TRAIT_QA_v2.6.1.md,history/NPC_TRAIT_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/NPC_TRAIT_QA.md

Status values are not stored here.
This file defines acceptance criteria only.

Design owner under test -> NPC_TRAIT_v2.8.0.md

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

## NPC-Q-v28-7 — JOB BASE / GROWTH TABLE EXACT

Expect exactly the six Job rows in NPC_TRAIT_v2.8.0.md.

For a controlled NPC:
- Lv1 Stats equal the Job row
- each Level uses Job Growth × that NPC's existing internal Potential
- no hidden Job passive changes the result
- Job Mastery does not mutate Job Base/Growth

FAIL:
- Mastery directly multiplies this table

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
- no hidden generic account-wide combat/Final multiplier

PASS:
Job identity remains BaseStats+Growth and Mastery does not create a second hidden Job system.

## NPC-Q-v28-9 — JOB MASTERY SPAWN MODEL

For Mastery ranks 0–7, expect mutually exclusive +1/+2/+3 Level probabilities:

| Mastery | +1 | +2 | +3 |
|---:|---:|---:|---:|
| 0 | 0% | 0% | 0% |
| 1 | 5% | 0% | 0% |
| 2 | 10% | 0% | 0% |
| 3 | 15% | 5% | 0% |
| 4 | 20% | 10% | 0% |
| 5 | 25% | 15% | 0% |
| 6 | 30% | 20% | 5% |
| 7 | 35% | 25% | 10% |

PASS:
- ordinary spawn Level resolves before Mastery bonus
- only the generated NPC's own Job Mastery applies
- exactly one Mastery roll is consumed per spawn, including rank 0
- outcomes never stack
- an already-created NPC is never retroactively changed
- no account-wide combat multiplier exists
- Player-facing meaning does not expose the exact table unless separately approved

## QA ID NOTE

This file contains two sections both labeled `NPC-Q09`.
For audit references, distinguish them by section title (`LONG-TERM VALUE` vs `META JOB UNLOCK POOL`) rather than treating the duplicated numeric label as one test identity.
Do not create a runtime rule from this documentation-ID collision.

## NPC-Q70 — LEVEL-UP ONLY GROWS CORE STATS

SETUP: level NPCs across Lv5/Lv10/Lv15 milestones.

PASS:
- Level increments normally
- four Core Stats increase from Job Growth × Potential
- no automatic new Trait is granted by Level milestone
- no milestone Rank/Title progression is presented as a gameplay reward
- no hidden Level passive/equipment reward is created

## NPC-Q71 — NO LEVEL-BASED THIRD BAG SLOT

SETUP: compare NPC below/above Lv10.

PASS:
- ordinary SALE Bag capacity remains exactly 2 for both
- no Job/Rarity/Trait Level path silently restores a third normal slot

Capacity owner -> SALE_v2.8.0.md.

## NPC-Q-v28-1 — NO POTENTIAL / HIDDEN TRAIT PROMISE

FAIL if active player UI exposes:
- 성장 잠재력
- potential-derived growth labels
- 남은 특성
- copy promising Loyalty will reveal hidden Traits

Current Traits remain readable from the start.

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

## NPC-Q61 — ACTIVE TRAIT COUNT

PASS: exact active Trait count = 37.
No lucky/unlucky active entry.
No showoff active entry.

## TRAIT-Q15 — ACTIVE CATALOG FREEZE
SETUP:
Audit all selectable/generated Trait IDs.

EXPECT:
- names/directions/effects match NPC_TRAIT ACTIVE TRAIT CATALOG
- 카페인중독 / 술고래 / 언데드혐오 are not active selectable Traits
- 평정심 is not in the active pool
- no extra source-only Trait leaks into generation

PASS:
Trait pool identity is frozen.

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
- 수집가 + 실속파
- 지구력 + 쉽게 지침
- 사교적인 + 낯가림

PASS:
No invalid pair appears.

## NPC-Q62 — EXCLUSION COUNT

PASS: exact mutual exclusion pair count = 16 and includes honest ↔ liar.
No lucky ↔ unlucky pair.

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
- any active Supply-related Trait effect uses the canonical Supply -> Fatigue recovery model (`피로 회복 N`); no Supply requirement or Burden survives (User 2026-09-24, v2.9.0)
- the effect is visible/understandable to the player
- active effects match the frozen NPC_TRAIT catalog; no legacy effect is inferred or invented

PASS:
No hidden legacy long/thirst mechanic survives through Trait code.

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
- 대식가/소식가 modify Food native core + integer Supply (음식의 피로 회복 -1 / +1) as canonicalized, not legacy long/thirst (User 2026-09-24, v2.9.0)
- 준비성 adds +1 Supply (음식·음료의 피로 회복 +1) per Food/Drink
- 악바리 reads current injury state and adds its stated Fatigue cost
- no Trait modifies hidden baseNoise

PASS:
New/reworked Traits are readable, testable, and do not create hidden micro-systems.

## NPC-Q76 — FOOD AFFINITY TRAIT SCOPE

SETUP: use Food Items with positive Core Stat, Supply, Hazard Counter, and/or RiskReward components on `eater` and `small` NPCs.

EXPECT:
- eater: Food positive native Core Stat +30%; each Food Supply (피로 회복) -1, minimum 1 (User 2026-09-24, v2.9.0)
- small: Food positive native Core Stat -20%; each Food Supply (피로 회복) +1

PASS:
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty magnitude unchanged
- no native-recovery multiplier is active
- when Fresh Relics also modify the positive native Core Stat, Food-affinity percentage follows `ITEM_v2.8.0.md` base-additive composition rather than a sequential Trait×Relic multiplier

## NPC-Q73 — POTIONBODY SCOPE

SETUP: use all Potion tiers with `potionbody`.

PASS:
- positive Potion native Core-Stat effect ×1.15
- no Hazard Counter amplification
- no Supply amplification
- no Insurance amplification
- no non-Potion Item amplification

## NPC-Q72 — FATIGUE TRAIT OUTCOME SCOPE

Controlled results with stamina/weary/grit where applicable:

EXPECT:
- success / great success: Trait result-fatigue modifier applies
- retreat: applies
- injury: applies
- severe injury: final result-fatigue gain remains 0, modifier does not apply
- death: final result-fatigue gain remains 0, modifier does not apply

PASS: no stale success-only implementation and no Severe/Death +1 leakage.

## NPC-Q64 — HONEST

EXPECT:
- successful 50%/100% purchase adds loyalty +1
- refusal adds +0
- 150% purchase intent receives -10%p

## NPC-Q65 — RICH

PASS:
- +50 only on actual arrival
- exactly once per visit
- cap 2000

## RETIRED RANDOM NPC SPECIAL SYSTEM

Current exclusions:
- random permanent Trait removal/addition opportunities are inactive
- random player destination-reassignment opportunities are inactive
- no inherited QA may be used to restore that retired random NPC special system

The general protection against forced random permanent negative punishment remains active.

## TRAIT-Q12 — NO FORCED RANDOM NEGATIVE
SETUP:
Play normal events.

EXPECT:
Invested NPC does not receive random permanent negative trait without explicit risk/reward choice.

PASS:
No forced punishment path.

## DEST-Q01 — RANDOM DESTINATION
SETUP:
Generate multi-Gate customer set.

EXPECT:
Default destination is random among currently eligible open Gates.

PASS:
No auto-best-fit routing.

## NPC-Q63 — LIAR

SETUP: Open Gate >=2; controlled branch where liar triggers.
EXPECT:
- claimed destination = original Gate
- actual destination = a different Open Gate
- no extra Power gate

PASS: actual and claimed differ in this direction only.

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

## NPC-Q66 — MAJOR INJURY RECOVERY

SETUP: NPC injury=2, recovery reaches completion.
PASS:
- injury becomes 0 directly
- status becomes healthy
- no intermediate injury=1 state

## NPC-Q67 — INJURY STAT SOURCE

PASS:
- injury=1 applies combat -15 / survival -20 to NPC Base+Equipment only
- grit replaces combat penalty with +20%
- sold Item stats are not multiplied by injury/grit percentages
- injury=2 itself has no Stat penalty

## NPC-Q77 — ORDINARY INJURY PENALTY UNCHANGED

SETUP: compare healthy vs `injury=1` with no grit.

EXPECT:
```text
투력 -15% on NPC Base+Equipment
강인함 -20% on NPC Base+Equipment
```

PASS:
- persistence/risk changes do not silently raise these visible Stat penalties
- Sold Item contribution remains outside this NPC-side percentage unless another current owner explicitly says otherwise

## NPC-Q78 — ORDINARY INJURY NATURAL RECOVERY

Start at `injury=1` and force each actual outcome.

EXPECT:
```text
성공 -> injury=0
대성공 -> injury=0
퇴각 -> injury=1
부상 -> injury=1
```

PASS:
- Retreat does not cure ordinary Injury
- merely completing another expedition does not cure Injury
- Severe/Death follow their own outcome/state paths
- First Aid Aftercare may still override the persistent state after outcome resolution exactly as ITEM owns

## NPC-Q79 — INJURED RE-EXPEDITION RISK FLAG

SETUP: same NPC/Gate except departure Injury state.

PASS:
- `injury=1` departure activates the +10%p failure-conditioned Death-risk baseline and +15%p Severe-transition baseline owned by `DUNGEON_HAZARD_v2.8.0.md`
- the +10%p modifier is part of the single failure-conditioned Death-risk calculation and does not create a second Death roll
- the modifier applies only because the NPC **began** that expedition injured
- recovery during/after result cannot retroactively erase the risk state used for that expedition
- the exact pre-supply 실패 시 사망 위험 shown during SALE includes the +10%p injured modifier
- after Item commitment, the displayed pre-supply percentage stays frozen while the actual `failureDeathChance` is recalculated internally from final preparation
- an injured expedition that resolves as `성공 / 대성공` performs no Death roll

## NPC-Q74 — LATEST EXPEDITION SNAPSHOT

After one completed expedition, PASS if snapshot records:
- completed Day
- actual destination
- final Outcome
- exact accepted/purchased Bag Item IDs
- only proven contribution/cause tokens

After the next completed expedition for the same NPC:
PASS: previous snapshot is replaced, not appended into an unlimited timeline.

## NPC-Q75 — NO INVENTED CAUSE / CLAIMED DESTINATION

PASS:
- Item presence alone does not create a cause token
- claimed/expected destination is not serialized as actual destination
- liar/destination behavior remains correctly represented by actual result data

## NPC-Q-v28-5 — HELPED CALLBACK REQUIRES ITEM PROOF

Trait-only or generic previous-result events do not unlock a `지난 보급이 도움 됐다` callback.

A previous result with proven sold-Item contribution may unlock it.

No new Gameplay RNG draw is introduced.

## NPC-Q-v28-2 — TRUSTED REGULAR SINGLE THRESHOLD

Expected:
    Loyalty >= 51 -> Trusted Regular / 단골

PASS:
- badge/state/copy uses the owner judgement
- LUST uses the same state
- arrival regular Flavor does not require a separate 60 threshold

Other support-specific thresholds remain their own conditions and do not redefine 단골.

## NPC-Q-v28-2B — ORDINARY PURCHASE LOYALTY

For one successful ordinary paid purchase before explicit modifier effects:

    50% sale  -> Loyalty +4
    100% sale -> Loyalty +1
    150% sale -> Loyalty -3

PASS:
- refusal does not apply the purchase Loyalty delta
- explicit Trait / Store Support modifiers apply only through their owned rules
- UI / Help exact copy matches COPY_AUDIT_APPROVED_v2.8.0.md

## NPC-Q-v28-8 — NON-PURCHASE LOYALTY / REVISIT

PASS:
- finalized ordinary visit with a paid purchase that Day -> Loyalty +1
- finalized ordinary visit without a paid purchase -> Loyalty 0
- living expedition result -> Loyalty +1
- Death -> no survival +1
- purchase Loyalty remains separate
- final Loyalty remains clamped 0–100
- ordinary purchase formula receives +0.002 per Loyalty point
- returning-NPC revisit weight includes ×(1 + Loyalty×0.025)
- other explicit Trait/Store Support revisit modifiers compose once
- Loyalty never guarantees a revisit

## NPC-Q-v28-3 — LOYALTY MEANING

Normal SALE:
- compact Loyalty value/state remains visible
- no dedicated Loyalty `?` / on-demand popover is present

Tutorial/coach states:
- higher Loyalty increases purchase intent
- higher Loyalty increases revisit weighting
- threshold 51 = 단골

Boss-specific meaning still obeys reveal timing.
Global compact Help may retain its separately owned reference wording.

FAIL:
- normal SALE restores a separate Loyalty `?` / popover trigger
- tutorial claims Loyalty directly increases Core Stats
- unrevealed Boss-specific information leaks

## NPC-Q-v28-4 — DIALOGUE DOES NOT INVENT PURCHASE PREFERENCE

Active pools must not contain:
- 겁쟁이 -> 귀환석 purchase request
- 대식가 -> Food purchase-intent request
- 탐욕 -> expensive/Rare purchase preference
- 단골 -> favorite-product request

PASS uses the exact replacements in COPY_WORLD_VOICE_v2.8.0.md.

## NPC-Q-v28-4B — DIALOGUE EXPOSURE / RECENT REPEAT

For the active ARRIVAL / SALE / NIGHT / DEATH pools, verify the current minimum pool sizes and
recent-repeat rule in COPY_WORLD_VOICE_v2.8.0.md.

PASS:
- each required Pool meets or exceeds its current minimum size
- ARRIVAL / SALE / NIGHT track recent visible lines separately
- an exact line used within the previous 3 visible beats on that Surface is ineligible
- the same NPC does not immediately repeat its previous line from the same Pool
- later same-Run reuse remains possible after the exclusion window
- selection is deterministic for the same saved state
- dialogue selection consumes no Gameplay RNG
- Save/Load does not change an already-determined visible line
- no pool expansion invents a purchase preference or mechanic absent from the owning Trait/System

DEATH narration pool-size checks apply, but Death does not use the living speech-bubble rule.

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

## NPC-Q-v28-10 — PREMIUM DISPLAY RARITY WEIGHTING

With the `프리미엄 쇼케이스` Decoration active, the ordinary NPC rarity draw uses exactly:

    [51, 30, 14, 4, 1]

for Common / Uncommon / Rare / Epic / Legendary.

PASS:
- the ordinary NPC spawn path is reused
- only the rarity weights change
- no extra NPC is spawned
- no second rarity draw is introduced
- no additional Gameplay RNG draw is consumed

## NPC-Q-v28-6 — DEEP NPC REWARD BASELINE

Deep Success:
    EXP +40
    NPC Wallet +60G

Deep Great Success:
    EXP +80
    NPC Wallet +120G

PASS:
- Great Success bonus is 2× Success on both channels
- ordinary resolved reward/consequence still applies
- failed Deep outcomes receive no special Deep bonus
- no automatic Level +1
- no Day/Tier multiplier
- no Deep-only stored Wallet/currency
- bonus EXP uses existing Growth system
- bonus uses existing NPC Wallet/money channel

FAIL if:
- separate `deepWallet` pool is added
- Day/Tier multiplier is added to the special Deep bonus without approval
- automatic Level +1 is used instead of EXP
- direct Loyalty / Trusted Regular granted
- new Deep currency / permanent Stat / buff / Mastery added
- failure outcome receives Deep bonus EXP/Wallet
