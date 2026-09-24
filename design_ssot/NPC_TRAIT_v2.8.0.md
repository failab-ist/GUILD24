# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,loyalty,trusted_regular,revisit,recent_expedition,living_npc_cap,destination
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/NPC_TRAIT_v2.8.0-patch.md,history/NPC_TRAIT_v2.7.0.md,history/NPC_TRAIT_v2.6.1.md,history/NPC_TRAIT_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/NPC_TRAIT.md

## KEY

jobs=[전사,궁수,마법사,사제,도적,광전사]
initialUnlockedJobs=[전사,궁수,마법사,사제]
metaUnlockedJobs=[도적,광전사]
jobUnlockOwnership=META

jobIdentity=BaseStats+Growth
hiddenJobBonus=NO

traits.activePool=37
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

### Job Lv1 Stats / Growth — exact

Stat order:

    투력 / 강인함 / 기동 / 정신

| Job | Lv1 Stats | per-Level Growth |
|---|---|---|
| 전사 | 17 / 18 / 9 / 10 | 2.8 / 2.6 / 1.5 / 1.6 |
| 궁수 | 14 / 11 / 19 / 10 | 2.6 / 2.0 / 3.0 / 1.6 |
| 마법사 | 18 / 9 / 10 / 17 | 3.3 / 1.6 / 1.8 / 2.7 |
| 사제 | 10 / 16 / 9 / 20 | 2.2 / 2.7 / 1.6 / 3.0 |
| 도적 | 15 / 11 / 21 / 9 | 2.8 / 2.0 / 3.4 / 1.5 |
| 광전사 | 21 / 14 / 12 / 7 | 3.6 / 2.4 / 1.9 / 1.3 |

Actual Level growth remains:

    Core Stat gain per Level
    = Job Growth × that NPC's internal Potential

Potential remains an internal growth input and is not exposed as a relationship reward.

Job Mastery does not alter this table.
Current Job Mastery effect -> META_v2.8.0.md.

## JOB MASTERY / CROSS-RUN JOB POWER BOUNDARY

Meta progress source -> META_v2.8.0.md

Job Mastery power may not create a hidden generic account-wide combat multiplier.

Rules:
- Job × Boss clear matrix and Mastery count are owned by META
- before unlock, 도적/광전사 are not eligible for normal NPC Job generation
- unlock thresholds are owned by META
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
-> DUNGEON_HAZARD_v2.8.0.md

## JOB × ITEM

Each Job should have:
- several naturally strong Item choices
- choices across more than one Product Category
- generic useful Items
- weakness-covering Items
- Insurance/Escape options

Item effect does not change secretly because of Job ID.

Authoritative:
-> ITEM_v2.8.0.md

## LEVEL-UP REWARD — EXACT

Level Up grants only visible Job Growth through the four Core Stats.

```text
Level Up
-> Job Growth × Potential
-> 투력 / 강인함 / 기동 / 정신 increase
```

Remove Level milestone rewards:
- no Lv10+ third normal Bag slot
- no automatic Trait acquisition at 5-Level milestones
- no Level-milestone Rank/Title progression
- no hidden Level passive
- no Level-only Equipment grant
- no separate Level combat multiplier

Equipment growth from expedition loot/results is not a Level-up reward and remains owned by its existing system.

Existing `rank/ranks` data is not Design Truth. If Source has an unexpected active dependency, classify/report it rather than preserving milestone gameplay silently.

## PLAYER-FACING GROWTH TRUTH

Player-facing NPC growth identity remains:

    Job + Level + actual four Core Stats

Potential is an internal growth input, not a relationship reward display.

Do not expose:
- 성장 잠재력
- 빠른 성장 / 꾸준한 성장 / 착실한 성장 from potential
- 남은 특성
- a promise that higher Loyalty reveals hidden Traits

Current Traits are visible from the start under the current Trait rules.

## NORMAL BAG CAPACITY BOUNDARY

NPC Level / Job / Rarity / Trait may not increase ordinary SALE consumer-slot capacity.

Normal Bag capacity is owned by `SALE_v2.8.0.md` and is exactly 2.

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

perNPCTarget:
visible/readable <=3–4

Rule:
Pool expansion should increase character variety,
not turn each NPC into a wall of modifiers.

## MUTUAL EXCLUSION — EXACT 16

1. brave ↔ coward
2. eater ↔ small
3. careful ↔ reckless
4. frugal ↔ impulse
5. strong ↔ frail
6. collector ↔ thrifty
7. stamina ↔ weary
8. social ↔ shy
9. frail ↔ mender
10. antitoxin ↔ sensitive
11. nimble ↔ clumsy
12. maintain ↔ butterfingers
13. heatproof ↔ pyrophobia
14. sharpeye ↔ nearsight
15. aloof ↔ coldhand
16. honest ↔ liar

탐욕:
independent=YES

구두쇠:
identity=high price resistance / avoids expensive purchases

탐욕:
identity=loot/risk-oriented character tendency

They may coexist.

## CATEGORY AFFINITY

Trait category affinity may strengthen the category's core benefit only.

It must not multiply every attached Item effect.

No automatic multiplier to unrelated:
- Cold counter
- Fire counter
- Poison counter
- penalty magnitude

Authoritative item scope:
-> ITEM_v2.8.0.md

## LEGACY / REMOVED SYSTEM REFERENCES

Trait logic must use current authoritative systems only.

Forbidden active Trait resolution keys:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

Rules:
- `long` is not a Hazard and no Gate requires Supply; Food/Drink Supply only reduces Fatigue (`DUNGEON_HAZARD_v2.8.0.md` §SUPPLY -> FATIGUE). (User 2026-09-24, v2.9.0)
- `thirst` is not a authoritative Condition/penalty system.
- `wet` is flavor only.
- `armor` and `undead` are not authoritative Hazards.
- old source Trait modifiers that reference these keys must not be preserved automatically.

If an existing Trait concept still needs a Supply-related identity,
it must be redefined through the visible Supply -> Fatigue recovery rule (`피로 회복 N`)
and explicitly approved before implementation.

`대식가` / `소식가` use only the visible Food native-core/Supply rules defined in the final Trait catalog below.
No legacy `long` value is carried over.

## TRAIT MODIFICATION

Trait modification items in normal order catalog=NO

No hidden/random route / Trait-removal / Trait-mentor system exists in the current Run.

Reintroducing any permanent Trait-edit or player destination-reassignment opportunity requires a
new approved Design change; it must not be recovered from the inherited base chain.

## ACTIVE TRAIT CATALOG

traitCatalogStatus=FROZEN
activeTraitCount=37

Rules:
- no active Trait may read/write long, thirst, wet, armor, undead, caffeine-stack, or hidden Job-ID effects
- every material effect is player-readable
- Traits reuse existing Stats / Hazard / Supply (Fatigue recovery) / Condition / Wallet / Loyalty / Revisit systems; no Trait-only subsystem (User 2026-09-24, v2.9.0)
- internalDirection is not player-facing
- [benefit] / [cost] / [neutral] is semantic presentation metadata
- UI must not infer meaning from numeric sign

1. **용감함**
   - internalDirection=MIXED
   - [benefit] fear 대응 +6
   - [cost] escape -6%p

2. **겁쟁이**
   - internalDirection=MIXED
   - [benefit] escape +19%p
   - [cost] fear 대응 -6
   - [cost] loot -15%

3. **대식가**
   - internalDirection=MIXED
   - [benefit] Food positive native Core-Stat contribution +30%
   - [cost] 음식의 피로 회복 -1: each Food Item Supply -1, minimum 1
   - [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified

4. **소식가**
   - internalDirection=MIXED
   - [cost] Food positive native Core-Stat contribution -20%
   - [benefit] 음식의 피로 회복 +1: each Food Item Supply +1
   - [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified

5. **신중함**
   - internalDirection=MIXED
   - [benefit] injuryRisk (부상/중상 확률) -4%p
   - [cost] loot -10%

6. **무모함**
   - internalDirection=MIXED
   - [benefit] 투력 +10%
   - [cost] escape -8%p
   - [cost] injuryRisk (부상 확률) +3.5%p

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

10. **거짓말쟁이** (liar)
    - internalDirection=MIXED
    - [cost] 50% 확률로 실제 배정 Gate 변경 (claimedDestination 유지).
    - [neutral] expected destination remains unchanged
    - player-facing: the function line `50% 확률로 실제 목적지가 다른 열린 게이트로 바뀝니다.` is its effect row; no Trait carries a flavor note (구두쇠 / 악바리 notes removed, User 2026-09-24, v2.9.0)

11. **천재**
    - internalDirection=POSITIVE
    - [benefit] EXP gain +25%

12. **강골**
    - internalDirection=POSITIVE
    - [benefit] injuryGuard +23%p

13. **허약함**
    - internalDirection=NEGATIVE
    - [cost] 강인함 -10%
    - [cost] Severe Injury recovery duration +1 day

14. **포션체질**
    - internalDirection=POSITIVE
    - [benefit] Potion positive native Core-Stat effect ×1.15
    - [neutral] no automatic Counter/Insurance amplification

15. **화염공포증**
    - internalDirection=NEGATIVE
    - [cost] fire 대응 -6

16. **수집가**
    - internalDirection=MIXED
    - [benefit] Rare+ purchase interest +12%p
    - [cost] Common/Uncommon purchase interest -5%p

17. **실속파**
    - internalDirection=MIXED
    - [benefit] Common/Uncommon purchase interest +10%p
    - [cost] Rare+ purchase interest -10%p

18. **사교적인**
    - internalDirection=POSITIVE
    - [benefit] revisit selection weight ×1.25

19. **낯가림**
    - internalDirection=NEGATIVE
    - [cost] first 2 visits: buyBias -10%p
    - [neutral] from 3rd visit onward: this penalty no longer applies

20. **회복체질**
    - internalDirection=POSITIVE
    - [benefit] Severe Injury recovery duration -1 day, minimum 1 day

21. **지구력**
    - internalDirection=POSITIVE
    - [benefit] expedition Fatigue gain -1

22. **쉽게 지침**
    - internalDirection=NEGATIVE
    - [cost] expedition Fatigue gain +1

23. **눈썰미**
    - internalDirection=POSITIVE
    - [benefit] dark 대응 +4
    - [benefit] whiteout 대응 +4

24. **해독가**
    - internalDirection=POSITIVE
    - [benefit] poison 대응 +6

25. **수족냉증**
    - internalDirection=NEGATIVE
    - [cost] cold 대응 -6

26. **준비성**
    - internalDirection=POSITIVE
    - [benefit] 음식·음료의 피로 회복 +1: each Food/Drink Item Supply +1

27. **악바리**
    - internalDirection=MIXED
    - [benefit] while currently Injured/Severely Injured: 부상 penalty 대체하여 투력 +20%
    - [cost] while currently Injured/Severely Injured: survival -20%
    - [cost] always, injured or not: result fatigue gain +1 (chronic cost)

28. **냉담한**
    - internalDirection=MIXED
    - [cost] revisit selection weight ×0.80
    - [benefit] cold 대응 +6

29. **정직한** (honest)
    - internalDirection=MIXED
    - [benefit] 정가/할인 구매 성공 시 loyalty +1
    - [cost] 바가지 구매의사 -10%p

30. **금수저** (rich)
    - internalDirection=POSITIVE
    - [benefit] 실제 방문 1회당 소지금 +50G (arrive()에서 1회 한정 적용)

31. **민감체질** (sensitive)
    - internalDirection=NEGATIVE
    - [cost] poison 대응 -6

32. **잔재주꾼** (nimble)
    - internalDirection=POSITIVE
    - [benefit] bind 대응 +4, mire 대응 +4

33. **몸치** (clumsy)
    - internalDirection=NEGATIVE
    - [cost] bind 대응 -4, mire 대응 -4

34. **장비관리** (maintain)
    - internalDirection=POSITIVE
    - [benefit] corrosion 대응 +6

35. **서투른** (butterfingers)
    - internalDirection=NEGATIVE
    - [cost] corrosion 대응 -6

36. **내열성** (heatproof)
    - internalDirection=POSITIVE
    - [benefit] fire 대응 +6

37. **약시** (nearsight)
    - internalDirection=NEGATIVE
    - [cost] dark 대응 -4, whiteout 대응 -4

### HONEST

internalDirection=MIXED
- successful 100% / 50% paid purchase -> loyalty +1
- 150% purchase intent -10%p

No loyalty is granted on refusal.

### RICH

- actual visit +50G exactly once
- first and revisit
- arrival path only
- Persistent Wallet cap 2000

## FOOD AFFINITY TRAIT SCOPE

`eater / 대식가`: (User 2026-09-24, v2.9.0)
```text
Food positive native Core-Stat contribution +30%
음식의 피로 회복 -1: each Food Item Supply -1, minimum 1
```

`small / 소식가`:
```text
Food positive native Core-Stat contribution -20%
음식의 피로 회복 +1: each Food Item Supply +1
```

Scope for both:
- applies only to the Food Item's own positive Core-Stat contribution and stated Supply (피로 회복) adjustment
- does not amplify/reduce Hazard Counter
- does not amplify/reduce Insurance
- does not amplify/reduce RiskReward penalty magnitude
- does not create or modify a separate native-recovery subsystem
- when Fresh Relics also modify the same Food positive native Core Stat, the Trait percentage joins the same base-additive modifier pool; do not multiply Trait and Relic layers sequentially

Cross-system native-Stat composition -> `ITEM_v2.8.0.md`.
Food/Drink Item truth -> `ITEM_v2.8.0.md`.

## POTIONBODY

`potionbody / 포션체질`:

```text
Potion positive native Core-Stat effect ×1.15
```

Scope:
- applies to Potion positive Core-Stat contribution only
- does not amplify Hazard Counter
- does not amplify Supply (피로 회복) (User 2026-09-24, v2.9.0)
- does not amplify Insurance
- does not amplify unrelated attached effects

Potion catalog/effects -> `ITEM_v2.8.0.md`.

## FATIGUE TRAITS — RESULT SCOPE

The existing result-fatigue modifiers remain:
- `stamina / 지구력`: -1
- `weary / 쉽게 지침`: +1
- `grit / 악바리`: +1 always (chronic cost, not limited to Injury)

They apply to:
```text
성공
대성공
퇴각
부상
```

They do not apply to:
```text
중상
사망
```

For Severe Injury / Death, final expedition-result Fatigue gain remains exactly 0 regardless of those Trait modifiers.

Base outcome Fatigue, the 0~40 Fatigue scale with its five bands, and the Supply -> Fatigue recovery order -> `DUNGEON_HAZARD_v2.8.0.md`. (User 2026-09-24, v2.9.0)

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
-> UI_UX_v2.8.0.md

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
-> NIGHT_CLOSING_v2.8.0.md

## INJURY / SEVERE INJURY CONDITION

Ordinary Injury Stat penalty:

```text
injury=1
투력 -15% on NPC Base+Equipment unless grit replacement applies
강인함 -20% on NPC Base+Equipment
```

Do **not** raise these Stat penalties merely because Injury now persists more meaningfully.
The increased cost of Injury comes from persistence and re-expedition risk, not a second simultaneous Stat-penalty buff.

`grit` while injury=1:
- replaces combat -15% with combat +20%
- survival -20% remains
- fatigue result modifier +1 remains

### Natural recovery

Ordinary Injury does not disappear merely because the NPC completed another expedition without receiving a fresh Injury result.

Exact natural recovery:

```text
injury=1 + next actual Outcome 성공
-> injury=0

injury=1 + next actual Outcome 대성공
-> injury=0

injury=1 + next actual Outcome 퇴각
-> injury=1 유지

injury=1 + next actual Outcome 부상
-> injury=1 유지
```

`중상` and `사망` follow their own existing state transitions.

This makes `부상` a persistent risk decision:
`다시 보낼 수는 있지만, 안전하게 돌아와야 회복된다.`

Item Aftercare may still remove/lower persistent Injury exactly as owned by `ITEM_v2.8.0.md`; this is separate from natural recovery.

### Injured re-expedition escalation

When an NPC departs while already `injury=1`:
- ordinary Injury Stat penalties above apply
- the expedition's Severe Injury escalation receives an additional **+15%p** baseline
- the failure-conditioned Death chance receives an additional **+10%p** baseline
- the +10%p Death modifier is part of the single failure-conditioned Death-risk calculation; it is not a second Death roll
- the pre-supply 실패 시 사망 위험 % shown at SALE entry includes this +10%p when the NPC begins the expedition injured
- after Item transactions, the displayed pre-supply percentage remains frozen even though the actual `failureDeathChance` is recalculated internally from final preparation
- if the expedition resolves as `성공 / 대성공`, no Death roll occurs even for an injured departure
- these are outcome-risk modifiers, not hidden changes to the four Core Stats
- they apply only while the NPC begins the expedition already injured

Exact ordinary Death formula/caps -> `DUNGEON_HAZARD_v2.8.0.md`.

The intent is not to make an injured NPC unusable.
It is to make repeat deployment a deliberate risk rather than a nearly free one-Day condition clear.

### Severe Injury

`injury=2`:
- no Stat penalty
- unavailable during recovery as defined by current visit eligibility
- when recovery completes: **injury 2 -> 0 directly**
- injury 2 -> 1 transition is forbidden

Do not convert natural Severe recovery into `injury 2 -> 1`.

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

게이트 순례주간:
- EVENT may change the actual destination of 1–3 visitors after their expected destination exists
- affected identity/new destination remain hidden until Night as defined in `EVENT_v2.8.0.md`

Current destination changes come only from explicitly active Trait / Event / Deep rules owned by
their current routed specs.

### LIAR — DESTINATION OVERRIDE

`liar / 거짓말쟁이`:
- Open Gate >=2 only
- 50% chance
- initial assigned destination becomes the **claimed / expected destination**
- actual destination is then replaced by a **different Open Gate**
- claimed destination remains unchanged
- no Power threshold / extra condition

Explicit Event and confirmed Deep Expedition destination rules retain their own precedence.
Confirmed Deep nomination remains final.

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
-> SALE_v2.8.0.md

## RECENT EXPEDITION SNAPSHOT

Each persistent NPC keeps exactly one latest completed-expedition snapshot for revisit memory.

Snapshot fields:
- completed Day
- actual destination
- resolved Outcome
- exact Item IDs actually accepted/purchased in the completed Bag
- only resolved Item/Trait/Event contribution/cause tokens proven by the result report

Rules:
- overwrite with the next completed expedition for that NPC
- Item presence alone is not a cause token
- claimed/expected destination is not substituted for actual destination
- no unlimited timeline is added by this rule
- Product XP / Favorite Meter / Familiarity Bonus are not created

Presentation -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md`
Result proof -> `NIGHT_CLOSING_v2.8.0.md`

## WALLET / LOYALTY / REVISIT

These systems support long-term customer value.

Goals:
- saved/invested NPC becomes more economically valuable over time
- loyalty increases revisit value
- wallet growth creates future premium-sale opportunities

Exact formulas:
-> ECONOMY_ORDER_v2.8.0.md

Relics may modify these systems,
but Character identity remains owned by NPC/Trait system.

### TRUSTED REGULAR STATE OWNERSHIP

`Trusted Regular / 단골` is an ordinary NPC relationship classification owned by NPC_TRAIT.

Rules:
- it remains the same relationship state used outside Boss logic
- BOSS may read this state at Final Lock
- BOSS must not define a separate Loyalty threshold or alternate regular classification
- LUST does not freeze the D15 relationship state; the Final Lock state is authoritative for that Final

Trusted Regular threshold remains exactly:

    Loyalty >= 51

Use the single owner judgement for:
- 단골 badge/state
- relationship copy
- Boss LUST protection
- any other rule that requires Trusted Regular

Do not create a second UI-only threshold such as 60 for the word 단골.

Other Store Supports may still own additional thresholds such as 30 / 50 / 60 for their own
effects; those do not redefine Trusted Regular.

### ORDINARY PAID-PURCHASE LOYALTY DELTAS

Base Loyalty change on a successful ordinary paid purchase:

    50% sale  -> +4
    100% sale -> +1
    150% sale -> -3

These are the base transaction deltas before any explicitly owned Trait / Store Support modifier.

Refusal grants no purchase Loyalty change.
Other visit/survival Loyalty changes remain separate.

### Non-purchase Loyalty — exact

Ordinary customer visit:
- when the current customer's visit is finalized/departs after a paid purchase that Day -> Loyalty +1
- when the visit is finalized/departs without a paid purchase that Day -> Loyalty 0

Ordinary expedition:
- if the NPC remains alive after the expedition -> Loyalty +1
- this includes living Retreat / Injury / Severe Injury outcomes
- Death grants no survival Loyalty

These are separate from paid-purchase Loyalty deltas.
Explicit Trait / Store Support modifiers apply only through their own owner rules.

Loyalty remains clamped to the existing 0–100 range.

### Loyalty effect on purchase intent — exact

The ordinary hidden purchase-acceptance formula receives:

    +0.002 purchase chance per current Loyalty point

Full purchase formula -> ECONOMY_ORDER_v2.8.0.md.

### Loyalty effect on revisit weighting — exact

Within the ordinary returning-NPC selection branch, Loyalty multiplies that NPC's revisit weight by:

    1 + Loyalty × 0.025

This combines with explicit current Trait / Store Support revisit modifiers.
It does not guarantee a visit.

The existing introduced-vs-newcomer mixture remains otherwise unchanged.
Trusted Regular remains exactly Loyalty >= 51.

### LOYALTY PLAYER MEANING

The Player must be able to learn that Loyalty:
- increases ordinary purchase intent
- increases revisit weighting
- can satisfy Store Support conditions
- becomes Trusted Regular at 51
- can matter to LUST once that Boss rule has been revealed

Loyalty does not directly increase the four Core Stats.

Boss-specific information must not leak before its reveal.

Exact compact UI/tutorial placement -> UI_UX_v2.8.0.md.
Exact player copy -> COPY_AUDIT_APPROVED_v2.8.0.md.

## DEEP EXPEDITION NPC REWARD

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

### Exact values

Deep Success:
    additional EXP +40
    additional NPC Wallet +60G

Deep Great Success:
    additional EXP +80
    additional NPC Wallet +120G

Rules:
- these bonuses are added on top of the ordinary resolved expedition rewards/consequences
- only Success / Great Success receive the special Deep bonus
- Retreat / Injury / Severe Injury / Death receive no special Deep EXP/Wallet bonus
- no automatic Level +1
- EXP uses the ordinary Growth system
- Wallet uses the ordinary persistent NPC Wallet channel
- no extra Day/Tier multiplier
- no direct Loyalty, revisit guarantee, permanent Deep Stat, Deep currency or Deep Mastery

The Great-Success Deep bonus is exactly 2× the Success bonus on both channels.

## RELATED

Bag/transaction -> `SALE_v2.8.0.md`
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
Item/Potion/Food/Aftercare -> `ITEM_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
