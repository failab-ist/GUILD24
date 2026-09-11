# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,living_npc_cap,destination,revisit

DOC_VERSION=2.5.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC


## KEY

jobs=[전사,궁수,마법사,사제,도적,광전사]
initialUnlockedJobs=[전사,궁수,마법사,사제]
metaUnlockedJobs=[도적,광전사]
jobUnlockOwnership=META

jobIdentity=BaseStats+Growth
hiddenJobBonus=NO

traits.activePool=30
traits.maxVisiblePerNPC≈3–4

traitDirectionInternal=[POSITIVE,MIXED,NEGATIVE]
playerFacingTraitDirectionLabel=NO
effectSemanticTone=[benefit,cost,neutral]

targetTrustedRegulars/run≈2–4
livingNpcCap=22

destinationDefault=randomAmongOpenGates
autoBestFitRouting=NO

noncanonicalTraitResolutionKeys=[long,thirst,wet,armor,undead]
legacyTraitEffectCarryover=NO

## ROLE

NPC =
Run의 장기적인 감정/경제 자산.

TRAIT =
`이 모험가는 어떤 사람인가`

JOB =
`이 모험가는 기본적으로 무엇을 잘하는가`

NPC 시스템은:
- 반복 방문
- 성장
- 부상/피로
- Loyalty
- Wallet
- 목적지/원정
- Trait
- 생존/사망

이 누적되어 몇몇 NPC를 기억하게 만드는 것이 목표다.

## JOB IDENTITY

Job identity is defined by:
1. Lv1 stat distribution
2. level growth distribution

No hidden Job-ID passive.

Player-facing stats:
- 투력
- 강인함
- 기동
- 정신

Job strength should emerge naturally from Stat/Growth profile.

### 전사
natural=[투력,강인함]
pressure=[기동,정신]

### 궁수
natural=[기동,투력]
pressure=[강인함 일부,정신 일부]

### 마법사
natural=[투력,정신]
pressure=[강인함,기동]

### 사제
natural=[강인함,정신]
pressure=[투력/기동 depending growth]

### 도적
natural=[기동]
secondary=[투력]
pressure=[raw combat/강인함]

### 광전사
natural=[투력]
secondary=[강인함]
pressure=[정신/Condition 관리]

Exact base/growth numbers=PASS3. Initial v2.5 implementation retains the current Design-SSOT-compatible Source Job table, then rebalances after full-run simulation/playtest.


## JOB MASTERY / CROSS-RUN JOB POWER BOUNDARY

Meta progress source -> META

Job Mastery power may affect only the owning Job's visible Base Stats / Growth identity.
It may not create a hidden generic account-wide combat multiplier.

Rules:
- Job × Boss clear matrix and Mastery count are owned by META
- Base/Growth effect channel is owned by NPC_TRAIT
- before unlock, 도적/광전사 are not eligible for normal NPC Job generation
- unlock thresholds are owned by META
- Mastery Base/Growth effect must be Player-readable when the PASS3 table is numerically activated
- exact Mastery Base/Growth adjustment table=PASS3_AFTER_JOB_BASE_GROWTH_REBALANCE
- no hidden Final-only Job Mastery multiplier

## JOB RULES

hiddenJobEffect=NO
hiddenJobPurchaseBias=NO
hiddenJobLootBonus=NO
hiddenJobEscapeBonus=NO
hiddenJobHazardDefense=NO

If future visible Job Passives are ever added:
- all active Jobs receive equivalent design treatment
- player-facing description required
- hidden modifiers prohibited
- requires explicit Director/User approval

Legacy/source special cases are not authoritative exceptions.
Examples that must not survive as hidden rules:
- Job-specific Item amplification
- Job-specific Hazard defense
- Priest-only `undead` defense
- Mage-only Item effect bonus

## JOB × DUNGEON

Each playable Job should have:
- >=2 Families where natural stats provide a meaningful advantage
- >=1 pressure area requiring preparation

Forbidden:
- one Job required for one Family
- one Job naturally solves all 5 Families

Dungeon affinity emerges from:
Stats + Items + visible Traits

Authoritative:
-> DUNGEON_HAZARD

## JOB × ITEM

Each Job should have:
- several naturally strong Item choices
- choices across more than one Product Category
- generic useful Items
- weakness-covering Items
- Insurance/Escape options

Item effect does not change secretly because of Job ID.

Authoritative:
-> ITEM

## TRAIT PURPOSE

Primary purpose:
Character differentiation.

Traits may affect:
- strengths
- weaknesses
- shopping behavior
- risk behavior
- growth/expedition tendencies

Traits should create:
`이번 판 얘랑 잘 맞네`
rather than
`이 Trait 없으면 Build 불가능`

Relic-specific Trait hardcoding=NO

Natural soft synergy through shared systems=YES

## TRAIT DIRECTION

Internal Trait direction exists for:
- generation / soft spawn guard
- Event eligibility
- balance audit

Internal directions:
- POSITIVE = pure positive
- MIXED = situational / benefit+cost
- NEGATIVE = pure negative

Player-facing:
traitLevelDirectionLabel=NO
traitLevelDirectionIcon=NO
traitLevelDirectionColorBand=NO

Do not show:
- 이점 / 양면 / 약점
- ▲ / ◆ / ▼ as Trait quality labels

Player judges the Trait from its actual effects.

Every material player-facing Trait effect has explicit semantic metadata:
- `benefit` = helpful in the stated context
- `cost` = harmful in the stated context
- `neutral` = scope/condition/clarification

semanticToneInferredFromNumericSign=NO

Examples:
- injuryRisk -4%p = benefit
- escape -8%p = cost
- cold 대응 +6 = benefit

A negative number can be helpful.
A positive number can be harmful.

UI may reinforce semantic tone with color,
but color alone must not carry meaning.
Effect text must remain understandable without color.

NPC rarity != trait quality.
Epic NPC may have negative Traits.
Common NPC may have excellent Trait combinations.

Soft spawn guard may prevent extreme unusable negative bundles.

## TRAIT COUNT

poolSize=30

perNPCTarget:
visible/readable <=3–4

Rule:
Pool expansion should increase character variety,
not turn each NPC into a wall of modifiers.

Exact trait acquisition milestones -> CORE_RUN/NPC progression if separately specified.

## MUTUAL EXCLUSION

pairs:
- 용감함 ↔ 겁쟁이
- 대식가 ↔ 소식가
- 신중함 ↔ 무모함
- 구두쇠 ↔ 충동구매
- 강골 ↔ 허약함
- 행운아 ↔ 불운아
- 수집가 ↔ 실속파
- 지구력 ↔ 쉽게 지침
- 사교적인 ↔ 낯가림

탐욕:
independent=YES

구두쇠:
identity=high price resistance / avoids expensive purchases

탐욕:
identity=loot/risk-oriented character tendency

They may coexist.

## CATEGORY AFFINITY

Trait category affinity may strengthen the category's core benefit only.

Example:
대식가 + Food
=> Food/supply or food-native recovery may improve

It must not multiply every attached Item effect.

No automatic multiplier to unrelated:
- Cold counter
- Fire counter
- Poison counter
- penalty magnitude

Authoritative item scope:
-> ITEM

## LEGACY / REMOVED SYSTEM REFERENCES

Trait logic must use current authoritative systems only.

Forbidden active Trait resolution keys:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

Rules:
- `long` is not a Hazard. Long-expedition preparation is owned by `SUPPLY_BURDEN` in DUNGEON_HAZARD.
- `thirst` is not a authoritative Condition/penalty system.
- `wet` is flavor only.
- `armor` and `undead` are not authoritative Hazards.
- old source Trait modifiers that reference these keys must not be preserved automatically.

If an existing Trait concept still needs a Supply-related identity,
it must be redefined through the visible authoritative Supply/Supply Burden system
and explicitly approved before implementation.

`대식가` / `소식가` use only the visible Food native-core/Supply rules defined in the final Trait catalog below.
No legacy `long` value is carried over.


## TRAIT MODIFICATION

Persistent Trait editing is rare.

Rare Event:
- choose one NPC
- remove one internal NEGATIVE Trait

Epic Event:
- choose one NPC
- choose 1 of 3 internal POSITIVE Trait options

Forced random negative Trait onto invested NPC:
generally NO

Negative Trait addition allowed only when:
strongReward + explicitRisk
and player opts in.

Trait modification items in normal order catalog=NO

## NPC RARITY

Rarity may influence:
- stat/potential profile
- other explicitly defined generation values

Rarity must not directly guarantee good Trait quality.

Goal:
NPC value comes from combination of:
- stats
- growth
- traits
- history
- current condition
- relationship
- dungeon fit

not rarity label alone.

## GROWTH TARGET

Newcomer near current Day:

noItem forecast:
≈ 접전~불리

with good preparation:
≈ 접전~우세

Returning / invested NPC near same Day:

noItem:
≈ 접전~우세

with appropriate Item:
= reliable ace

Rare high-roll newcomer:
allowed

But replacement-newcomer strategy should not average above long-term investment.

## ROSTER FEEL

Normal mid/late Run target:
trustedRegulars≈2–4

Living NPC Cap=22 must support this target while preserving
some newcomer/replacement flow.
The game should not become either:
- endless unfamiliar customers that dilute attachment
- the exact same tiny roster every day

Reasons to maintain multiple core NPCs:
- Dungeon stat fit
- injury
- fatigue
- visit availability
- destination
- Trait
- growth differences

Single-NPC funnel should not always dominate.

D30:
long-term invested NPCs should matter more than last-day random arrivals.

## LIVING NPC CAP

livingNpcCap=22

Cap count:
- alive NPC counts toward the cap
- temporary Recovery does not free a cap slot
- Death frees a cap slot

Visitor-count modifiers:
- change only today's visitor count
- do not increase Living NPC Cap
- do not force-create new NPCs
- do not change introduced/fresh selection weighting unless another Design SSOT rule explicitly says so

Newcomer generation follows existing NPC/Event generation rules and cannot exceed the cap.

Design reason:
- temporary injury must not create roster inflation
- Death should reopen future newcomer/replacement capacity
- the cap must coexist with the normal target of roughly 2–4 memorable trusted regulars

Exact daily introduced/fresh selection weighting remains implementation/balance behavior unless separately canonicalized.

## LONG-TERM VALUE LOOP

investment
→ survival
→ level/growth
→ loot
→ wallet
→ loyalty
→ revisit
→ higher-value future purchase
→ late-game revenue
→ final-team value

Player should feel:
`얘 살려놓길 잘했다.`

Returning NPC presentation should make relevant history/change easy to notice
without requiring the Player to reread the full unchanged profile every visit.
Exact presentation ownership:
-> UI_UX

Ignoring weak NPCs is allowed,
but has opportunity cost through lost future customer/roster value.

No separate punishment system is required solely to force attachment.

## DEATH / INJURY

Death:
permanent within run

Injury/Fatigue:
should affect availability/value through existing condition systems.

Dead NPCs:
must not consume Living NPC Cap.

Narrative/result details:
-> NIGHT_CLOSING

## DESTINATION

default:
random among currently open eligible Gates

System must not auto-route based on:
- Job
- stats
- traits
- best counter fit

Purpose:
Player solves preparation around the assigned destination while accepting limited, explicitly signaled information uncertainty.

Player-facing destination is generally presented as `예상 목적지`.
By default it matches the actual assigned destination.
Only an explicitly authoritative Trait/Event may make expected/reported destination differ from actual destination.

허세:
- may make the NPC report a different expected destination
- does not itself change the actual assigned destination
- has no unrelated price/Item preference bonus

게이트 순례주간:
- EVENT may change the actual destination of 1–3 visitors after their expected destination exists
- affected identity/new destination remain hidden until Night as defined in EVENT

### LIMITED PLAYER INTERVENTION

Rare/Special Event may allow:
- one not-yet-finalized NPC
- one destination reassignment
- to another currently open Gate

playerChoosesDestination=YES
autoOptimize=NO
alreadySoldOrLockedNPC=INELIGIBLE

Prototype preferred:
one NPC / one change / one event

## PRE-REVEAL

Before actual customer appears:

Order/Morning may reveal:
- expected visitor count

Do not reveal:
- name
- Job
- Trait
- Wallet
- destination

On actual appearance:
NPC becomes introduced/notebook-visible.

Design SSOT sale reveal:
-> SALE

## WALLET / LOYALTY / REVISIT

### TRUSTED REGULAR STATE OWNERSHIP

`Trusted Regular / 단골` is an ordinary NPC relationship classification owned by NPC_TRAIT.

Rules:
- it remains the same relationship state used outside Boss logic
- BOSS may read this state at Final Lock
- BOSS must not define a separate Loyalty threshold or alternate regular classification
- LUST does not freeze the D15 relationship state; the Final Lock state is authoritative for that Final

Exact ordinary Loyalty / relationship calculation remains in its existing owner/tuning path.


These systems support long-term customer value.

Goals:
- saved/invested NPC becomes more economically valuable over time
- loyalty increases revisit value
- wallet growth creates future premium-sale opportunities

Exact formulas:
-> ECONOMY_ORDER / PASS3

Relics may modify these systems,
but Character identity remains owned by NPC/Trait system.

## APPROVED_AMENDMENT_2026_09_12 — DEEP EXPEDITION NPC REWARD

Deep Expedition reward identity:
**spend Store Gold now to increase one NPC's future value.**

Deep Success:
- keep the ordinary expedition's existing NPC-side result rewards/consequences
- add additional EXP through the existing EXP/Growth system
- add additional NPC Wallet

Deep Great Success:
- keep the ordinary Great Success NPC-side reward behavior
- add a larger additional EXP/Growth bonus than Deep Success
- add a larger NPC Wallet bonus than Deep Success

Exact values=PASS3.

Deep bonus structure has only two bonus bands: Success and Great Success.
Do not add a separate Day/Tier multiplier to the Deep bonus; the ordinary expedition
reward already carries its existing Day/Tier value.

NPC Wallet reward uses the existing persisted NPC Wallet/money channel.
Do not create `deepWallet` or another stored Wallet pool; later visits continue to use
the ordinary Wallet/carry rules.

Do not grant automatic `Level +1`.
Use the existing EXP/Growth curve; Level Up may occur naturally.

Do not directly grant:
- Loyalty
- Trusted Regular
- automatic revisit
- relationship rank

Do not add:
- Deep permanent Stat
- Deep currency
- Deep equipment progression
- Deep Mastery
- permanent Deep buff

Retreat / Injury / Severe Injury / Death:
- no **special Deep** bonus EXP
- no **special Deep** Wallet reward
- existing ordinary outcome rewards/consequences remain unchanged

Intended return:
sponsorship / extra preparation
-> NPC success
-> extra EXP/Growth + higher Wallet
-> future customer/roster value
-> stronger late-run value.

## ACTIVE TRAIT CATALOG

traitCatalogStatus=FROZEN
activeTraitCount=30
numericStatus=APPROVED_V2.5_RETAINED_STARTING_VALUES

Rules:
- numeric values below are the retained implementation baseline for v2.5
- full-run simulation/playtest may rebalance values after adoption
- no active Trait may read/write `long`, `thirst`, `wet`, `armor`, `undead`, caffeine-stack, or hidden Job-ID effects
- every material effect is player-readable
- Traits reuse existing Stats / Hazard / Supply / Condition / Wallet / Loyalty / Revisit systems; no Trait-only subsystem
- `internalDirection` is not player-facing
- `[benefit] / [cost] / [neutral]` is semantic presentation metadata
- UI must not infer meaning from numeric sign

### Existing / reworked 17

1. **용감함**
   - internalDirection=MIXED
   - [benefit] fear 대응 +9
   - [cost] escape -6%p

2. **겁쟁이**
   - internalDirection=MIXED
   - [cost] 투력 -3
   - [benefit] escape +19%p
   - [cost] loot -12%

3. **대식가**
   - internalDirection=MIXED
   - [benefit] Food native Stat/recovery +30%
   - [cost] each Food Item Supply -1, minimum 1
   - [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified

4. **소식가**
   - internalDirection=MIXED
   - [cost] Food native Stat/recovery -20%
   - [benefit] each Food Item Supply +1
   - [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified

5. **신중함**
   - internalDirection=MIXED
   - [benefit] injuryRisk -4%p
   - [cost] loot -8%

6. **무모함**
   - internalDirection=MIXED
   - [benefit] 투력 +7
   - [cost] escape -8%p
   - [cost] injuryRisk +3.5%p

7. **탐욕**
   - internalDirection=MIXED
   - [benefit] loot +30%
   - [cost] escape -7%p

8. **구두쇠**
   - internalDirection=NEGATIVE
   - [cost] expensive-price resistance as defined by Sale/Economy threshold
   - [cost] starting priceBias -16%p above the authoritative expensive threshold

9. **충동구매**
   - internalDirection=POSITIVE
   - [benefit] buyBias +12%p

10. **허세**
    - internalDirection=MIXED
    - [cost] when multiple Gates exist, reported/expected destination may be wrong
    - [neutral] actual assigned destination is not changed by this Trait
    - [neutral] no price/Item preference bonus

11. **천재**
    - internalDirection=POSITIVE
    - [benefit] EXP gain +25%

12. **강골**
    - internalDirection=POSITIVE
    - [benefit] injuryGuard +23%p

13. **허약함**
    - internalDirection=NEGATIVE
    - [cost] 강인함 -5
    - [cost] Severe Injury recovery duration +1 day

14. **포션체질**
    - internalDirection=POSITIVE
    - [benefit] Potion native Stat/recovery +30%
    - [neutral] no automatic Counter/Insurance amplification

15. **화염공포증**
    - internalDirection=NEGATIVE
    - [cost] fire 대응 -9

16. **행운아**
    - internalDirection=POSITIVE
    - [benefit] luck +4.5%p
    - [benefit] loot +7%

17. **불운아**
    - internalDirection=NEGATIVE
    - [cost] luck -4.5%p
    - [cost] loot -7%
    - [neutral] does not modify hidden combat variance

### New 13

18. **수집가**
    - internalDirection=MIXED
    - [benefit] Rare+ purchase interest +12%p
    - [cost] Common/Uncommon purchase interest -5%p

19. **실속파**
    - internalDirection=MIXED
    - [benefit] Common/Uncommon purchase interest +10%p
    - [cost] Rare+ purchase interest -10%p

20. **사교적인**
    - internalDirection=POSITIVE
    - [benefit] revisit selection weight ×1.25

21. **낯가림**
    - internalDirection=NEGATIVE
    - [cost] first 2 visits: buyBias -10%p
    - [neutral] from 3rd visit onward: this penalty no longer applies

22. **회복체질**
    - internalDirection=POSITIVE
    - [benefit] Severe Injury recovery duration -1 day, minimum 1 day

23. **지구력**
    - internalDirection=POSITIVE
    - [benefit] expedition Fatigue gain -1

24. **쉽게 지침**
    - internalDirection=NEGATIVE
    - [cost] expedition Fatigue gain +1

25. **눈썰미**
    - internalDirection=POSITIVE
    - [benefit] dark 대응 +6
    - [benefit] whiteout 대응 +6

26. **해독가**
    - internalDirection=POSITIVE
    - [benefit] poison 대응 +8

27. **수족냉증**
    - internalDirection=NEGATIVE
    - [cost] cold 대응 -9

28. **준비성**
    - internalDirection=POSITIVE
    - [benefit] each Food/Drink Item Supply +1

29. **악바리**
    - internalDirection=MIXED
    - [benefit] while currently Injured/Severely Injured: 투력 +6 for expedition preparation
    - [cost] expedition Fatigue gain +1

30. **냉담한**
    - internalDirection=MIXED
    - [cost] revisit selection weight ×0.80
    - [benefit] cold 대응 +6
    - [neutral] Cold bonus is intentional character flavor, not hidden wordplay

Removed source concepts from active v2.5 Trait pool:
- 카페인중독
- 술고래
- 언데드혐오

Reason:
Their old active identities depend on removed/legacy effect paths or over-specific hidden Item/family behavior.
Do not preserve them as inert selectable Traits.

## PASS3 METRICS

Track:
- NPC level by Day
- newcomer level
- returning level
- living NPC count / available visitor-pool size
- newcomer share / returner share
- visits per trusted regular
- top invested NPC level
- wallet
- loyalty
- revisit rate
- injury/fatigue downtime
- death
- high-value sale contribution
- boss/final participation

Compare strategies:
- ignore weak NPCs
- normal-price focus
- broad discounting
- selective VIP investment
- 150% focus
- adaptive play

Target:
long-term selective investment should create visible future value
without becoming mandatory one-NPC snowball.

## RELATED
dungeon/stat fit -> DUNGEON_HAZARD
item affinity -> ITEM
economy/wallet/loyalty -> ECONOMY_ORDER
sale reveal/pricing -> SALE
night result/death/injury -> NIGHT_CLOSING
run flow -> CORE_RUN
final participation -> FINAL_EXPEDITION
relic VIP/customer builds -> RELIC
