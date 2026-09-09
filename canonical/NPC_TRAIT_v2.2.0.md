# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,living_npc_cap,destination,revisit

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


## KEY

jobs=[전사,궁수,마법사,사제,도적,광전사]

jobIdentity=BaseStats+Growth
hiddenJobBonus=NO

traits.targetPool≈28–30
traits.maxVisiblePerNPC≈3–4

traitDirection:
GREEN=Positive
YELLOW=Mixed
RED=Negative

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

Exact base/growth numbers=PASS3/current canonical data table when finalized.

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

Legacy/source special cases are not canonical exceptions.
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

Canonical:
-> DUNGEON_HAZARD

## JOB × ITEM

Each Job should have:
- several naturally strong Item choices
- choices across more than one Product Category
- generic useful Items
- weakness-covering Items
- Insurance/Escape options

Item effect does not change secretly because of Job ID.

Canonical:
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

GREEN:
pure positive

YELLOW:
mixed / situational / benefit+cost

RED:
pure negative

UI:
color + icon/label
colorOnly=NO

Recommended semantics:
▲ GREEN
◆ YELLOW
▼ RED

Trait color means effect direction, not rarity.

NPC rarity != trait quality

Epic NPC may have negative Traits.
Common NPC may have excellent Trait combinations.

Soft spawn guard may prevent extreme unusable negative bundles.

## TRAIT COUNT

poolTarget≈28–30

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

Canonical item scope:
-> ITEM

## LEGACY / REMOVED SYSTEM REFERENCES

Trait logic must use current canonical systems only.

Forbidden active Trait resolution keys:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

Rules:
- `long` is not a Hazard. Long-expedition preparation is owned by `SUPPLY_BURDEN` in DUNGEON_HAZARD.
- `thirst` is not a canonical Condition/penalty system.
- `wet` is flavor only.
- `armor` and `undead` are not canonical Hazards.
- old source Trait modifiers that reference these keys must not be preserved automatically.

If an existing Trait concept still needs a Supply-related identity,
it must be redefined through the visible canonical Supply/Supply Burden system
and explicitly approved before implementation.

`대식가` / `소식가` remain a canonical mutual-exclusion pair,
but this patch does not canonize an old `long` modifier as their effect.
Exact affected Trait effects remain subject to Trait catalog finalization.


## TRAIT MODIFICATION

Persistent Trait editing is rare.

Rare Event:
- choose one NPC
- remove one RED Trait

Epic Event:
- choose one NPC
- choose 1 of 3 positive Trait options

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
- do not change introduced/fresh selection weighting unless another Canonical rule explicitly says so

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
Player solves preparation around the assigned destination.

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

Canonical sale reveal:
-> SALE

## WALLET / LOYALTY / REVISIT

These systems support long-term customer value.

Goals:
- saved/invested NPC becomes more economically valuable over time
- loyalty increases revisit value
- wallet growth creates future premium-sale opportunities

Exact formulas:
-> ECONOMY_ORDER / PASS3

Relics may modify these systems,
but Character identity remains owned by NPC/Trait system.

## TRAIT CATALOG STATUS

Target pool structure is canonical.
Exact final 28–30 Trait IDs/effects/numeric values are not fully finalized here.

traitCatalogStatus=PENDING_CANONICAL_FINALIZATION

Source audit requirement:
- any Trait using removed/noncanonical keys must be REWORK or REMOVE before acceptance
- do not translate legacy values 1:1 into Supply or another current system without explicit approval

Do not invent large numbers of new Trait effects.

Confirmed canonical entries/rules include:
- 구두쇠 naming
- 탐욕 independent from 구두쇠
- mutual exclusion pairs above
- 허세(YELLOW): 여러 Gate에서 보고 목적지를 과장/오보할 수 있음; 실제 목적지는 바뀌지 않으며 별도 가격/Item 선호 보너스 없음
- GREEN/YELLOW/RED direction model

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
