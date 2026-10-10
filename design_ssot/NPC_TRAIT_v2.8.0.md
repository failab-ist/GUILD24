# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,loyalty,trusted_regular,revisit,recent_expedition,living_npc_cap,destination
DOC_VERSION=2.11.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.12.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

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
destinationCoverage=EVERY_OPEN_GATE_EXPECTED_DESTINATION (→ §DESTINATION)
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

NPC 시스템은 반복 방문 · 성장 · 부상/피로 · Loyalty · Wallet · 목적지/원정 · Trait · 생존/사망이
누적되어 몇몇 NPC를 기억하게 만드는 것이 목표다.

## JOB IDENTITY

Job identity is defined only by (1) Lv1 stat distribution and (2) level growth distribution.
No hidden Job-ID passive; Job strength emerges from the Stat/Growth profile.

Player-facing stats: 투력 / 강인함 / 기동 / 정신

### 전사
natural=[투력,강인함]
pressure=[기동,정신]

### 궁수
natural=[기동]
pressure=[투력 준비,강인함 일부,정신 일부]

### 마법사
natural=[투력,정신]
pressure=[강인함,기동]

### 사제
natural=[강인함,정신]
pressure=[투력/기동 depending growth]

### 도적
natural=[투력,기동]
pressure=[강인함,정신]

### 광전사
natural=[투력]
secondary=[강인함]
pressure=[정신/Condition 관리]

### Job Lv1 Stats / Growth — exact

Stat order:

    투력 / 강인함 / 기동 / 정신

| Job | Lv1 Stats | per-Level Growth |
|---|---|---|
| 전사 | 17 / 18 / 9 / 10 | 2.8 / 3.0 / 1.5 / 1.6 |
| 궁수 | 13 / 12 / 21 / 10 | 2.3 / 2.1 / 3.4 / 1.6 |
| 마법사 | 18 / 9 / 10 / 17 | 3.1 / 1.6 / 1.8 / 2.7 |
| 사제 | 10 / 16 / 9 / 20 | 2.2 / 2.7 / 1.6 / 3.0 |
| 도적 | 17 / 10 / 19 / 9 | 3.0 / 1.8 / 3.0 / 1.5 |
| 광전사 | 21 / 15 / 13 / 7 | 3.6 / 2.5 / 2.0 / 1.3 |

    Core Stat gain per Level
    = Job Growth × that NPC's internal Potential

Potential is an internal growth input, never exposed as a relationship reward (→ §PLAYER-FACING GROWTH TRUTH).
Job Mastery does not alter this table; current Job Mastery effect -> META_v2.8.0.md.

### Job contribution — internal comparison

At Potential 1, no Equipment, Items, Traits or Condition modifiers:
Power contribution = 투력 × 0.50 + (강인함 + 기동 + 정신) × 0.27.
Environment contribution = 강인함 + 기동 + 정신 (exclude 투력).
Per-Level contribution applies the same formulas to per-Level Growth.
These are comparison metrics, not a player-facing aggregate Stat or a shared Hazard defense.
Each Hazard still uses its own 강인함 / 기동 / 정신 counter at Stat / 3 (DUNGEON_HAZARD).

| Job | Lv1 Power contribution | Power contribution / Level | Lv1 Environment contribution | Environment contribution / Level |
|---|---:|---:|---:|---:|
| 전사 | 18.490 | 3.047 | 37 | 6.1 |
| 궁수 | 18.110 | 3.067 | 43 | 7.1 |
| 마법사 | 18.720 | 3.197 | 36 | 6.1 |
| 사제 | 17.150 | 3.071 | 45 | 7.3 |
| 도적 | 18.760 | 3.201 | 38 | 6.3 |
| 광전사 | 19.950 | 3.366 | 35 | 5.8 |

At Level L, contribution = Lv1 contribution + (L − 1) × per-Level contribution.

## JOB MASTERY / CROSS-RUN JOB POWER BOUNDARY

Meta progress source -> META_v2.8.0.md

- Job × Boss clear matrix, Mastery count and unlock thresholds are owned by META
- before unlock, 도적/광전사 are not eligible for normal NPC Job generation
- Job Mastery may not create a hidden generic account-wide combat multiplier or a hidden Final-only Job Mastery multiplier

## JOB RULES

hiddenJobEffect=NO
hiddenJobPurchaseBias=NO
hiddenJobLootBonus=NO
hiddenJobEscapeBonus=NO
hiddenJobHazardDefense=NO

Any future visible Job Passive requires explicit Director/User approval, equivalent design treatment for all
active Jobs, a player-facing description, and no hidden modifiers.

Legacy/source special cases are not authoritative exceptions. Must not survive as hidden rules:
- Job-specific Item amplification
- Job-specific Hazard defense
- Priest-only `undead` defense
- Mage-only Item effect bonus

## JOB × DUNGEON

Each playable Job should have >=2 Families where natural stats provide a meaningful advantage and
>=1 pressure area requiring preparation.

Forbidden: one Job required for one Family; one Job naturally solves all 5 Families.

Dungeon affinity emerges from Stats + Items + visible Traits. Authoritative -> DUNGEON_HAZARD_v2.8.0.md

## JOB × ITEM

Each Job should have several naturally strong Item choices across more than one Product Category, generic
useful Items, weakness-covering Items and Insurance/Escape options.

Item effect does not change secretly because of Job ID. Authoritative -> ITEM_v2.8.0.md

## LEVEL-UP REWARD — EXACT

Level Up grants only visible Job Growth through the four Core Stats.

```text
Level Up
-> Job Growth × Potential
-> 투력 / 강인함 / 기동 / 정신 increase
```

No Level milestone rewards:
- no Lv10+ third normal Bag slot
- no automatic Trait acquisition at 5-Level milestones
- no Level-milestone Rank/Title progression
- no hidden Level passive
- no Level-only Equipment grant
- no separate Level combat multiplier

Equipment growth from expedition loot/results is not a Level-up reward and stays owned by its existing system.

Existing `rank/ranks` data is not Design Truth. If Source has an unexpected active dependency, classify/report it rather than preserving milestone gameplay silently.

## EXPERIENCE CURVE / LAGGING ADVENTURER EXPERIENCE

Each next Level costs `18 + current Level × 9` EXP. Existing EXP is preserved across saves.

For an alive adventurer below the ordinary new-arrival minimum Level on that Day, ordinary expedition earned EXP
is boosted to ×1.5 (integer Math.round). On a 퇴각 / 부상 / 중상 return the extra bonus is instead the larger of that
×1.5 bonus and 25% of the EXP still needed to reach the minimum (integer Math.round); 성공 / 대성공 keep ×1.5.
The ordinary minimum is 1 on D1~4, then `1 + floor((Day - 1) × 0.4)`.
Mastery, royal and Decoration spawn additions are not part of this reference minimum. There is no revisit-interval condition.
Preserve the full base reward first; cap only the extra bonus at the EXP still needed to reach that minimum.
If the base reward alone reaches/passes the minimum, add no bonus and do not cut the base reward. At/above the minimum,
no bonus applies. Death gives no extra EXP. The modifier changes EXP only, not Job Growth, Potential or stored Stats directly.
The special Deep reward remains its own additional reward; the boost applies to ordinary expedition earned EXP.

## PLAYER-FACING GROWTH TRUTH

Player-facing NPC growth identity:

    Job + Level + actual four Core Stats

Do not expose:
- 성장 잠재력
- 빠른 성장 / 꾸준한 성장 / 착실한 성장 from potential
- 남은 특성
- a promise that higher Loyalty reveals hidden Traits

Current Traits are visible from the start.

## NORMAL BAG CAPACITY BOUNDARY

NPC Level / Job / Rarity / Trait may not increase ordinary SALE consumer-slot capacity.
Normal Bag capacity is owned by `SALE_v2.8.0.md` and is exactly 2.

## TRAIT PURPOSE

Primary purpose: character differentiation. Traits may affect strengths, weaknesses, shopping behavior,
risk behavior and growth/expedition tendencies.

Traits should create `이번 판 얘랑 잘 맞네` rather than `이 Trait 없으면 Build 불가능`.

Relic-specific Trait hardcoding=NO
Natural soft synergy through shared systems=YES

## TRAIT DIRECTION

Internal Trait direction exists for generation / soft spawn guard, Event eligibility and balance audit:
- POSITIVE = pure positive
- MIXED = situational / benefit+cost
- NEGATIVE = pure negative

Player-facing:
traitLevelDirectionLabel=NO
traitLevelDirectionIcon=NO
traitLevelDirectionColorBand=NO

Do not show `이점 / 양면 / 약점`, or ▲ / ◆ / ▼ as Trait quality labels. The Player judges the Trait from its actual effects.

Every material player-facing Trait effect has explicit semantic metadata:
- `benefit` = helpful in the stated context
- `cost` = harmful in the stated context
- `neutral` = scope/condition/clarification

semanticToneInferredFromNumericSign=NO

Examples: injuryRisk -4%p = benefit; escape -8%p = cost; cold 대응 +6 = benefit.
A negative number can be helpful; a positive number can be harmful.

UI may reinforce semantic tone with color, but color alone must not carry meaning; effect text stays understandable without color.

NPC rarity != trait quality: Epic NPC may have negative Traits; Common NPC may have excellent Trait combinations.
Soft spawn guard may prevent extreme unusable negative bundles.

## TRAIT COUNT

perNPCTarget: visible/readable <=3–4

Pool expansion should increase character variety, not turn each NPC into a wall of modifiers.

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

탐욕 is independent (identity=loot/risk-oriented character tendency) and may coexist with
구두쇠 (identity=high price resistance / avoids expensive purchases).

## CATEGORY AFFINITY

Trait category affinity may strengthen the category's core benefit only; it must not multiply every attached
Item effect. No automatic multiplier to unrelated Cold / Fire / Poison counter or penalty magnitude.

Authoritative item scope -> ITEM_v2.8.0.md

## LEGACY / REMOVED SYSTEM REFERENCES

Trait logic uses current authoritative systems only. Forbidden active Trait resolution keys:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

Rules:
- `long` is not a Hazard and no Gate requires Supply; Food/Drink Supply only reduces Fatigue (`DUNGEON_HAZARD_v2.8.0.md` §SUPPLY -> FATIGUE).
- `thirst` is not a authoritative Condition/penalty system.
- `wet` is flavor only.
- `armor` and `undead` are not authoritative Hazards.
- old source Trait modifiers that reference these keys must not be preserved automatically.

A Supply-related Trait identity must be defined through the visible Supply -> Fatigue recovery rule
(`피로 회복 N`) and explicitly approved before implementation.
`대식가` / `소식가` use only the Food native-core/Supply rules in §ACTIVE TRAIT CATALOG; no legacy `long` value is carried over.

## TRAIT MODIFICATION

Trait modification items in normal order catalog=NO

No hidden/random route / Trait-removal / Trait-mentor system exists in the Run.
Any permanent Trait-edit or player destination-reassignment opportunity requires a new approved Design change.

## ACTIVE TRAIT CATALOG

traitCatalogStatus=FROZEN
activeTraitCount=37

Rules:
- no active Trait may read/write long, thirst, wet, armor, undead, caffeine-stack, or hidden Job-ID effects
- every material effect is player-readable
- Traits reuse existing Stats / Hazard / Supply (Fatigue recovery) / Condition / Wallet / Loyalty / Revisit systems; no Trait-only subsystem
- internalDirection and [benefit] / [cost] / [neutral] follow §TRAIT DIRECTION

Entry format: `N. **name** — internalDirection — effects`.

1. **용감함** — MIXED — [benefit] fear 대응 +6 · [cost] escape -6%p
2. **겁쟁이** — MIXED — [benefit] escape +19%p · [cost] fear 대응 -6 · [cost] loot -15%
3. **대식가** — MIXED — [benefit] Food positive native Core-Stat contribution +30% · [cost] 음식의 피로 회복 -1: each Food Item Supply -1, minimum 1 · [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified
4. **소식가** — MIXED — [cost] Food positive native Core-Stat contribution -20% · [benefit] 음식의 피로 회복 +1: each Food Item Supply +1 · [neutral] Hazard Counter/Insurance/RiskReward magnitude is not amplified
5. **신중함** — MIXED — [benefit] injuryRisk (부상/중상 확률) -4%p · [cost] loot -10%
6. **무모함** — MIXED — [benefit] 투력 +10% · [cost] escape -8%p · [cost] injuryRisk (부상 확률) +3.5%p
7. **탐욕** — MIXED — [benefit] loot +30% · [cost] escape -7%p
8. **구두쇠** — NEGATIVE — [cost] expensive-price resistance as defined by Sale/Economy threshold · [cost] starting priceBias -16%p above the authoritative expensive threshold
9. **충동구매** — POSITIVE — [benefit] buyBias +12%p
10. **거짓말쟁이** (liar) — MIXED — [cost] 50% 확률로 실제 배정 Gate 변경 (claimedDestination 유지). · [neutral] expected destination remains unchanged · player-facing: the function line `50% 확률로 실제 목적지가 다른 열린 게이트로 바뀝니다.` is its effect row; no Trait carries a flavor note
11. **천재** — POSITIVE — [benefit] EXP gain +25%
12. **강골** — POSITIVE — [benefit] injuryGuard +23%p
13. **허약함** — NEGATIVE — [cost] 강인함 -10% · [cost] Severe Injury recovery duration +1 day
14. **포션체질** — POSITIVE — [benefit] Potion positive native Core-Stat effect ×1.15 · [neutral] no automatic Counter/Insurance amplification
15. **화염공포증** — NEGATIVE — [cost] fire 대응 -6
16. **수집가** — MIXED — [benefit] Rare+ purchase interest +12%p · [cost] Common/Uncommon purchase interest -5%p
17. **실속파** — MIXED — [benefit] Common/Uncommon purchase interest +10%p · [cost] Rare+ purchase interest -10%p
18. **사교적인** — POSITIVE — [benefit] revisit selection weight ×1.25
19. **낯가림** — NEGATIVE — [cost] first 2 visits: buyBias -10%p · [neutral] from 3rd visit onward: this penalty does not apply
20. **회복체질** — POSITIVE — [benefit] Severe Injury recovery duration -1 day, minimum 1 day
21. **지구력** — POSITIVE — [benefit] expedition Fatigue gain -1
22. **쉽게 지침** — NEGATIVE — [cost] expedition Fatigue gain +1
23. **눈썰미** — POSITIVE — [benefit] dark 대응 +4 · [benefit] whiteout 대응 +4
24. **해독가** — POSITIVE — [benefit] poison 대응 +6
25. **수족냉증** — NEGATIVE — [cost] cold 대응 -6
26. **준비성** — POSITIVE — [benefit] 음식·음료의 피로 회복 +1: each Food/Drink Item Supply +1
27. **악바리** — MIXED — [benefit] while currently Injured/Severely Injured: 부상 penalty 대체하여 투력 +20% · [cost] while currently Injured/Severely Injured: survival -20% · [cost] always, injured or not: result fatigue gain +1 (chronic cost)
28. **냉담한** — MIXED — [cost] revisit selection weight ×0.80 · [benefit] cold 대응 +6
29. **정직한** (honest) — MIXED — [benefit] 정가/할인 구매 성공 시 loyalty +1 · [cost] 바가지 구매의사 -10%p
30. **금수저** (rich) — POSITIVE — [benefit] 실제 방문 1회당 소지금 +50G (arrive()에서 1회 한정 적용)
31. **민감체질** (sensitive) — NEGATIVE — [cost] poison 대응 -6
32. **잔재주꾼** (nimble) — POSITIVE — [benefit] bind 대응 +4, mire 대응 +4
33. **몸치** (clumsy) — NEGATIVE — [cost] bind 대응 -4, mire 대응 -4
34. **장비관리** (maintain) — POSITIVE — [benefit] corrosion 대응 +6
35. **서투른** (butterfingers) — NEGATIVE — [cost] corrosion 대응 -6
36. **내열성** (heatproof) — POSITIVE — [benefit] fire 대응 +6
37. **약시** (nearsight) — NEGATIVE — [cost] dark 대응 -4, whiteout 대응 -4

Hazard Trait values are one scale for every Hazard (no Stat-group factor, `DUNGEON_HAZARD_v2.8.0.md` §HAZARD THREAT): 6 for a
one-Hazard Trait, 4 per Hazard for a two-Hazard Trait.

### HONEST

- successful 100% / 50% paid purchase -> loyalty +1
- 150% purchase intent -10%p
- no loyalty is granted on refusal

### RICH

- actual visit +50G exactly once, first visit and revisit
- arrival path only
- Persistent Wallet cap 2000

## FOOD AFFINITY TRAIT SCOPE

`eater / 대식가` and `small / 소식가` values -> §ACTIVE TRAIT CATALOG 3 / 4.

Scope for both:
- applies only to the Food Item's own positive Core-Stat contribution and stated Supply (피로 회복) adjustment
- does not amplify/reduce Hazard Counter
- does not amplify/reduce Insurance
- does not amplify/reduce RiskReward penalty magnitude
- does not create or modify a separate native-recovery subsystem
- when Fresh Relics also modify the same Food positive native Core Stat, the Trait percentage joins the same base-additive modifier pool; do not multiply Trait and Relic layers sequentially

Cross-system native-Stat composition and Food/Drink Item truth -> `ITEM_v2.8.0.md`.

## POTIONBODY

`potionbody / 포션체질` (Potion positive native Core-Stat effect ×1.15):
- applies to Potion positive Core-Stat contribution only
- does not amplify Hazard Counter
- does not amplify Supply (피로 회복)
- does not amplify Insurance
- does not amplify unrelated attached effects

Potion catalog/effects -> `ITEM_v2.8.0.md`.

## FATIGUE TRAITS — RESULT SCOPE

Result-fatigue modifiers:
- `stamina / 지구력`: -1
- `weary / 쉽게 지침`: +1
- `grit / 악바리`: +1 always (chronic cost, not limited to Injury)

They apply to `성공` / `대성공` / `퇴각` / `부상`.
They do not apply to `중상` / `사망`: for Severe Injury / Death, final expedition-result Fatigue gain is exactly 0 regardless of those Trait modifiers.

Base outcome Fatigue, the 0~40 Fatigue scale with its five bands, and the Supply -> Fatigue recovery order -> `DUNGEON_HAZARD_v2.8.0.md`.

## NPC RARITY

Rarity may influence the stat/potential profile and other explicitly defined generation values.

Exact generation values:
- growth potential = 1 + 0.10 × Rarity + a uniform 0~0.10 roll; every Level-up adds the Job growth × potential
- Trait count at spawn: 1~2, or 1~3 at 희귀 and above
- no Trait-slot field: Traits are only drawn at spawn
- Rarity's costs stay where they are owned: operating cost (ECONOMY_ORDER, × (1 + 0.06 × core average Rarity)) and Deep sponsorship (+20% a step)

Rarity must not directly guarantee good Trait quality.
NPC value comes from the combination of stats, growth, traits, history, current condition, relationship and dungeon fit — not rarity label alone.

## GROWTH TARGET

| NPC near current Day | noItem forecast | prepared |
|---|---|---|
| Newcomer | ≈ 접전~불리 | good preparation ≈ 접전~우세 |
| Returning / invested | ≈ 접전~우세 | appropriate Item = reliable ace |

Rare high-roll newcomer: allowed, but replacement-newcomer strategy should not average above long-term investment.

## ROSTER FEEL

Normal mid/late Run target: trustedRegulars≈2–4.

Living NPC Cap=22 must support this target while preserving some newcomer/replacement flow. The game should not
become either endless unfamiliar customers that dilute attachment, or the exact same tiny roster every day.

Reasons to maintain multiple core NPCs: Dungeon stat fit, injury, fatigue, visit availability, destination, Trait,
growth differences. Single-NPC funnel should not always dominate.

D30: long-term invested NPCs should matter more than last-day random arrivals.

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
Temporary injury must not create roster inflation.

Exact daily introduced/fresh selection weighting is implementation/balance behavior unless separately canonicalized.

## LONG-TERM VALUE LOOP

investment → survival → level/growth → loot → wallet → loyalty → revisit → higher-value future purchase
→ late-game revenue → final-team value

Player should feel: `얘 살려놓길 잘했다.`

Returning NPC presentation should make relevant history/change easy to notice without requiring the Player to
reread the full unchanged profile every visit. Exact presentation ownership -> UI_UX_v2.8.0.md

Ignoring weak NPCs is allowed, with opportunity cost through lost future customer/roster value.
No separate punishment system is required solely to force attachment.

## DEATH / INJURY

Death: permanent within run; Dead NPCs do not consume Living NPC Cap.
Injury/Fatigue affect availability/value through existing condition systems.

Narrative/result details -> NIGHT_CLOSING_v2.8.0.md

## INJURY / SEVERE INJURY CONDITION

Ordinary Injury Stat penalty:

```text
injury=1
투력 -15% on NPC Base+Equipment unless grit replacement applies
강인함 -20% on NPC Base+Equipment
```

These are the only Injury Stat penalties; Injury's added cost comes from persistence and re-expedition risk,
not a raised Stat penalty.

`grit` while injury=1:
- replaces combat -15% with combat +20%
- survival -20% remains
- fatigue result modifier +1 remains

### Natural recovery

Ordinary Injury does not disappear merely because the NPC completed another expedition without a fresh Injury result.

```text
injury=1 + next actual Outcome 성공
-> injury=0

injury=1 + next actual Outcome 대성공
-> injury=0

injury=1 + next actual Outcome 퇴각
-> injury=1 유지 unless DUNGEON_HAZARD §RETREAT HEALING actually heals it

injury=1 + next actual Outcome 부상
-> injury=1 유지
```

`중상` and `사망` follow their own existing state transitions.

`부상` is a persistent risk decision: `다시 보낼 수는 있지만, 안전하게 돌아와야 회복된다.`

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

### Severe Injury

`injury=2`:
- no Stat penalty
- unavailable during recovery as defined by current visit eligibility
- when recovery completes: **injury 2 -> 0 directly**
- injury 2 -> 1 transition is forbidden

## DESTINATION

Default: random among currently open eligible Gates.

Coverage: every retained open Gate must have at least one expected destination visitor. When visitors are fewer
than generated Gates, remove random ordinary Gates until all remaining Gates can be covered. An Event-created
temporary Gate takes priority and is retained. Removed Gates are absent from the Day, rather than hidden in the UI.
After the ordinary random destination draw, an empty Gate takes one random visitor from a Gate holding two or more.
Apply 거짓말쟁이 and 게이트 순례 주간 actual-destination overrides after expected coverage; actual counts may be zero.
Generate Order offers and designate the Deep Gate against the retained Gate set. When no visitor is available,
no ordinary Gate remains and no Deep Gate is designated. The Player may finish Order and then goes directly to
Closing with the no-trading reason; ordinary rest, expiry and operating-cost settlement still apply.

The system must not auto-route based on Job, stats, traits or best counter fit.
The Player solves preparation around the assigned destination while accepting limited, explicitly signaled information uncertainty.

Player-facing destination is presented as `예상 목적지` and by default matches the actual assigned destination.
Only an explicitly active Trait / Event / Deep rule owned by its routed spec may change the actual destination
or make expected/reported destination differ from it.

게이트 순례 주간:
- EVENT may change the actual destination of 1–3 visitors after their expected destination exists
- affected identity/new destination remain hidden until Night as defined in `EVENT_v2.8.0.md`

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

Before the actual customer appears, Order/Morning may reveal the expected visitor count only.
Do not reveal name, Job, Trait, Wallet or destination.

On actual appearance the NPC becomes introduced/notebook-visible. Sale reveal -> SALE_v2.8.0.md

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

These systems support long-term customer value: a saved/invested NPC becomes more economically valuable over
time, loyalty increases revisit value, wallet growth creates future premium-sale opportunities.

Exact Wallet / purchase formulas -> ECONOMY_ORDER_v2.8.0.md

Relics may modify these systems, but Character identity remains owned by NPC/Trait system.

### TRUSTED REGULAR STATE OWNERSHIP

`Trusted Regular / 단골` is an ordinary NPC relationship classification owned by NPC_TRAIT. Threshold exactly:

    Loyalty >= 51

Rules:
- it is the same relationship state used outside Boss logic
- BOSS may read this state at Final Lock
- BOSS must not define a separate Loyalty threshold or alternate regular classification
- LUST does not freeze the D15 relationship state; the Final Lock state is authoritative for that Final

Use the single owner judgement for 단골 badge/state, relationship copy, Boss LUST protection and any other rule
that requires Trusted Regular. No second UI-only threshold such as 60 for the word 단골.

Other Store Supports may own additional thresholds such as 30 / 50 / 60 for their own effects; those do not redefine Trusted Regular.

### ORDINARY PAID-PURCHASE LOYALTY DELTAS

Base Loyalty change on a successful ordinary paid purchase, before any explicitly owned Trait / Store Support modifier:

    50% sale  -> +4
    100% sale -> +1
    150% sale -> -4

A refusal grants no purchase Loyalty change, except a refused 150%, which costs 2 (§NPC-Q-v28-2B). Other visit/survival Loyalty changes are separate.

### Non-purchase Loyalty — exact

Ordinary customer visit:
- when the current customer's visit is finalized/departs after a paid purchase that Day -> Loyalty +1
- when the visit is finalized/departs without a paid purchase that Day -> Loyalty 0

Ordinary expedition:
- if the NPC remains alive after the expedition -> Loyalty +1
- this includes living Retreat / Injury / Severe Injury outcomes
- Death grants no survival Loyalty

These are separate from paid-purchase Loyalty deltas. Explicit Trait / Store Support modifiers apply only through their own owner rules.

Loyalty is clamped to the 0–100 range.

### Loyalty effect on purchase intent — exact

The ordinary hidden purchase-acceptance formula receives:

    +0.002 purchase chance per current Loyalty point

Full purchase formula -> ECONOMY_ORDER_v2.8.0.md.

### Loyalty effect on revisit weighting — exact

Within the ordinary returning-NPC selection branch, Loyalty multiplies that NPC's revisit weight by:

    1 + Loyalty × 0.03        (User 2026-10-02; was 0.025)

회원 관리대장 doubles the Loyalty term (`1 + Loyalty × 0.06`, RELIC §4). This combines with explicit current Trait revisit
modifiers and does not guarantee a visit.
The introduced-vs-newcomer mixture is otherwise unchanged.

### LOYALTY PLAYER MEANING

The Player must be able to learn that Loyalty:
- increases ordinary purchase intent
- increases revisit weighting
- can satisfy Store Support conditions
- becomes Trusted Regular at 51
- can matter to LUST once that Boss rule has been revealed

Loyalty does not directly increase the four Core Stats.
Boss-specific information must not leak before its reveal.

Exact compact UI/tutorial placement -> UI_UX_v2.8.0.md. Exact player copy -> COPY_AUDIT_APPROVED_v2.8.0.md.

## DEEP EXPEDITION NPC REWARD

Deep Expedition reward identity: **spend Store Gold now to increase one NPC's future value.**

Deep Success / Deep Great Success keep the ordinary expedition's NPC-side result rewards/consequences and add
bonus EXP (through the existing EXP/Growth curve; Level Up may occur naturally) plus bonus NPC Wallet;
Great Success's bonus is larger. Only these two bonus bands exist.

- no separate Day/Tier multiplier on the Deep bonus; the ordinary expedition reward already carries its Day/Tier value
- NPC Wallet reward uses the existing persisted NPC Wallet/money channel; no `deepWallet` or other stored Wallet pool; later visits use the ordinary Wallet/carry rules
- no automatic `Level +1`
- no direct Loyalty, Trusted Regular, automatic revisit or relationship rank
- no Deep permanent Stat, Deep currency, Deep equipment progression, Deep Mastery or permanent Deep buff
- Retreat / Injury / Severe Injury / Death: no **special Deep** bonus EXP or Wallet; ordinary outcome rewards/consequences unchanged

Intended return: sponsorship / extra preparation -> NPC success -> extra EXP/Growth + higher Wallet
-> future customer/roster value -> stronger late-run value.

### Exact values

Deep Success:
    additional EXP +40
    additional NPC Wallet +60G

Deep Great Success:
    additional EXP +80
    additional NPC Wallet +120G

These are added on top of the ordinary resolved expedition rewards/consequences.
The Great-Success Deep bonus is exactly 2× the Success bonus on both channels.

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### NPC-Q01 — PERSISTENT IDENTITY
SETUP: Meet and revisit same NPC.

EXPECT: Same identity, Job, Traits, accumulated growth/history.

PASS: NPC does not regenerate as a new character.

### NPC-Q02 — JOB IDENTITY
SETUP: Inspect all active Jobs.

EXPECT: Job differences come from base stats and growth.

PASS: No hidden Job-ID passive is required for identity.

### NPC-Q03 — NO HIDDEN JOB EFFECT
SETUP: Compare same item/effect on different Jobs with equal relevant stats where possible.

EXPECT: No secret Job-ID modification to:
- item effect
- hazard defense
- loot
- escape
- purchase interest
- removed/noncanonical family/hazard keys such as `undead`

PASS: Differences are explainable by stats/visible traits, with no legacy Job-specific exception.

### NPC-Q04 — JOB FAMILY COVERAGE
SETUP: Evaluate each playable Job across all Dungeon Families.

EXPECT: Each Job has >=2 meaningful natural stat advantages and some pressure areas requiring preparation.

PASS: No Job is mandatory for a Family and no Job solves all Families.

### NPC-Q-v28-7 — JOB BASE / GROWTH TABLE EXACT

Expect exactly the six Job rows in NPC_TRAIT_v2.8.0.md.

For a controlled NPC:
- Lv1 Stats equal the Job row
- each Level uses Job Growth × that NPC's existing internal Potential
- no hidden Job passive changes the result
- Job Mastery does not mutate Job Base/Growth

FAIL:
- Mastery directly multiplies this table

### NPC-Q09 — META JOB UNLOCK POOL
SETUP: Inspect fresh account, after 3 distinct Boss clears, after 6 distinct Boss clears.

EXPECT:
- fresh normal Job pool=[전사,궁수,마법사,사제]
- 도적 joins only after META 3-Boss unlock
- 광전사 joins only after META 6-Boss unlock

PASS: Locked Jobs do not leak into normal NPC generation.

### NPC-Q10 — JOB MASTERY EFFECT OWNERSHIP
SETUP: Inspect any implemented Job Mastery power adjustment.

EXPECT: no hidden generic account-wide combat/Final multiplier.

PASS: Job identity remains BaseStats+Growth and Mastery does not create a second hidden Job system.

### NPC-Q-v28-9 — JOB MASTERY SPAWN MODEL

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

### QA ID NOTE

This file contains two sections both labeled `NPC-Q09`.
For audit references, distinguish them by section title (`LONG-TERM VALUE` vs `META JOB UNLOCK POOL`) rather than treating the duplicated numeric label as one test identity.
Do not create a runtime rule from this documentation-ID collision.

### NPC-Q70 — LEVEL-UP ONLY GROWS CORE STATS

SETUP: level NPCs across Lv5/Lv10/Lv15 milestones.

PASS:
- Level increments normally
- four Core Stats increase from Job Growth × Potential
- no automatic new Trait is granted by Level milestone
- no milestone Rank/Title progression is presented as a gameplay reward
- no hidden Level passive/equipment reward is created

### NPC-Q71 — NO LEVEL-BASED THIRD BAG SLOT

SETUP: compare NPC below/above Lv10.

PASS:
- ordinary SALE Bag capacity remains exactly 2 for both
- no Job/Rarity/Trait Level path silently restores a third normal slot

Capacity owner -> SALE_v2.8.0.md.

### NPC-Q-v28-1 — NO POTENTIAL / HIDDEN TRAIT PROMISE

FAIL if active player UI exposes:
- 성장 잠재력
- potential-derived growth labels
- 남은 특성
- copy promising Loyalty will reveal hidden Traits

Current Traits remain readable from the start.

### TRAIT-Q01 — EFFECT SEMANTIC PRESENTATION

SETUP: Inspect POSITIVE/MIXED/NEGATIVE internal Traits including mixed-sign effects.

EXPECT:
- Player does not see `이점/양면/약점` or ▲/◆/▼ Trait quality labels
- internal direction still exists for generation/Event rules
- every material effect uses canonical `benefit/cost/neutral` semantic metadata
- UI does not infer meaning from numeric sign alone
- effect wording remains understandable without color

PASS: Player judges the Trait from actual effects while implementation retains internal direction safely.

### TRAIT-Q02 — TRAIT COUNT READABILITY
SETUP: Generate/advance many NPCs.

EXPECT: Normal visible trait count stays around <=3–4.

PASS: NPC panel does not become modifier-wall gameplay.

### NPC-Q61 — ACTIVE TRAIT COUNT

PASS: exact active Trait count = 37.
No lucky/unlucky active entry.
No showoff active entry.

### TRAIT-Q15 — ACTIVE CATALOG FREEZE
SETUP: Audit all selectable/generated Trait IDs.

EXPECT:
- names/directions/effects match NPC_TRAIT ACTIVE TRAIT CATALOG
- 카페인중독 / 술고래 / 언데드혐오 are not active selectable Traits
- 평정심 is not in the active pool
- no extra source-only Trait leaks into generation

PASS: Trait pool identity is frozen.

### TRAIT-Q03 — MUTUAL EXCLUSION
SETUP: Generate large sample.

EXPECT: Never coexist:
- 용감함 + 겁쟁이
- 대식가 + 소식가
- 신중함 + 무모함
- 구두쇠 + 충동구매
- 강골 + 허약함
- 수집가 + 실속파
- 지구력 + 쉽게 지침
- 사교적인 + 낯가림

PASS: No invalid pair appears.

### NPC-Q62 — EXCLUSION COUNT

PASS: exact mutual exclusion pair count = 16 and includes honest ↔ liar.
No lucky ↔ unlucky pair.

### TRAIT-Q04 — GREED/MISER INDEPENDENCE
SETUP: Generate large sample.

EXPECT: `탐욕 + 구두쇠` may coexist.

PASS: No mutual-exclusion rule blocks them.

### TRAIT-Q05 — RARITY INDEPENDENCE
SETUP: Sample Common/Epic NPCs.

EXPECT: Trait quality is not directly dictated by NPC rarity.

PASS: Epic can have negative traits; Common can have strong combinations.

### TRAIT-Q06 — SOFT SPAWN GUARD
SETUP: Sample many NPC generations.

EXPECT: Extreme unusable negative bundles are not common enough to erase play value.

PASS: Guard is soft, not `rarity = good traits`.

### TRAIT-Q07 — CATEGORY AFFINITY SCOPE
SETUP: Use category-affinity trait on multi-effect item.

EXPECT: Only intended category core effect is amplified.

PASS: Unrelated hazard counters/penalties are not multiplied automatically.

### TRAIT-Q13 — NO LEGACY RESOLUTION KEYS
SETUP: Audit all active Trait definitions and expedition-resolution references.

EXPECT: No active Trait effect reads/writes:
- `long`
- `thirst`
- `wet` as Hazard
- `armor` as Hazard
- `undead` as Hazard

PASS: Traits resolve only through current canonical systems.
Old source fields may exist only as inert migration/dead data pending safe cleanup.

### TRAIT-Q14 — SUPPLY MIGRATION SAFETY
SETUP: Inspect any Trait associated with food amount, long expedition, or Supply behavior, including 대식가/소식가.

EXPECT:
- no legacy `long` value is carried over automatically
- any active Supply-related Trait effect uses the canonical Supply -> Fatigue recovery model (`피로 회복 N`); no Supply requirement or Burden survives
- the effect is visible/understandable to the player
- active effects match the frozen NPC_TRAIT catalog; no legacy effect is inferred or invented

PASS: No hidden legacy long/thirst mechanic survives through Trait code.

### TRAIT-Q16 — SOCIAL / REVISIT DIFFERENTIATION
SETUP: Compare 사교적인, 낯가림, 냉담한 over repeated visits.

EXPECT:
- 사교적인 changes revisit selection weight only
- 낯가림 creates an early-visit purchase hurdle that expires after 2 visits
- 냉담한 reduces revisit weight but provides the explicit Cold-response benefit
- no Trait secretly creates a new relationship subsystem

PASS: The three Traits create distinct play consequences rather than duplicate `more regular customer` outcomes.

### TRAIT-Q17 — CONDITION / SUPPLY / HAZARD TRAITS
SETUP: Exercise 회복체질, 지구력, 쉽게 지침, 눈썰미, 해독가, 수족냉증, 준비성, 악바리, 대식가, 소식가.

EXPECT:
- effects resolve only through existing Recovery/Fatigue/Hazard/Supply/Injury systems
- 대식가/소식가 modify Food native core + integer Supply (음식의 피로 회복 -1 / +1) as canonicalized, not legacy long/thirst
- 준비성 adds +1 Supply (음식·음료의 피로 회복 +1) per Food/Drink
- 악바리 reads current injury state and adds its stated Fatigue cost
- no Trait modifies hidden baseNoise

PASS: New/reworked Traits are readable, testable, and do not create hidden micro-systems.

### NPC-Q76 — FOOD AFFINITY TRAIT SCOPE

SETUP: use Food Items with positive Core Stat, Supply, Hazard Counter, and/or RiskReward components on `eater` and `small` NPCs.

EXPECT:
- eater: Food positive native Core Stat +30%; each Food Supply (피로 회복) -1, minimum 1
- small: Food positive native Core Stat -20%; each Food Supply (피로 회복) +1

PASS:
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty magnitude unchanged
- no native-recovery multiplier is active
- when Fresh Relics also modify the positive native Core Stat, Food-affinity percentage follows `ITEM_v2.8.0.md` base-additive composition rather than a sequential Trait×Relic multiplier

### NPC-Q73 — POTIONBODY SCOPE

SETUP: use all Potion tiers with `potionbody`.

PASS:
- positive Potion native Core-Stat effect ×1.15
- no Hazard Counter amplification
- no Supply amplification
- no Insurance amplification
- no non-Potion Item amplification

### NPC-Q72 — FATIGUE TRAIT OUTCOME SCOPE

Controlled results with stamina/weary/grit where applicable:

EXPECT:
- success / great success: Trait result-fatigue modifier applies
- retreat: applies
- injury: applies
- severe injury: final result-fatigue gain remains 0, modifier does not apply
- death: final result-fatigue gain remains 0, modifier does not apply

PASS: no stale success-only implementation and no Severe/Death +1 leakage.

### NPC-Q64 — HONEST

EXPECT:
- successful 50%/100% purchase adds loyalty +1
- refusal adds +0
- 150% purchase intent receives -10%p

### NPC-Q65 — RICH

PASS:
- +50 only on actual arrival
- exactly once per visit
- cap 2000

### RETIRED RANDOM NPC SPECIAL SYSTEM

Current exclusions:
- random permanent Trait removal/addition opportunities are inactive
- random player destination-reassignment opportunities are inactive
- no inherited QA may be used to restore that retired random NPC special system

The general protection against forced random permanent negative punishment remains active.

### TRAIT-Q12 — NO FORCED RANDOM NEGATIVE
SETUP: Play normal events.

EXPECT: Invested NPC does not receive random permanent negative trait without explicit risk/reward choice.

PASS: No forced punishment path.

### DEST-Q01 — RANDOM DESTINATION
SETUP: Generate multi-Gate customer set.

EXPECT: Default destination is random among currently eligible open Gates.

PASS: No auto-best-fit routing.

### NPC-Q63 — LIAR

SETUP: Open Gate >=2; controlled branch where liar triggers.
EXPECT:
- claimed destination = original Gate
- actual destination = a different Open Gate
- no extra Power gate

PASS: actual and claimed differ in this direction only.

### TRAIT-Q08 — INFORMATION RELIABILITY TRAIT
SETUP: Use any canonical Trait that explicitly makes NPC-reported information unreliable.

EXPECT:
- the Trait effect is understandable to the player
- reported information may differ only as defined by that Trait
- underlying actual game state remains unchanged unless the Trait explicitly says otherwise
- no unrelated price/item bonus is implied
- tutorial language teaches the broader Trait/Event destination-uncertainty rule rather than presenting 허세 as a central system

PASS: Information reliability changes without silently changing destination routing or unrelated systems.

### NPC-Q66 — MAJOR INJURY RECOVERY

SETUP: NPC injury=2, recovery reaches completion.
PASS:
- injury becomes 0 directly
- status becomes healthy
- no intermediate injury=1 state

### NPC-Q67 — INJURY STAT SOURCE

PASS:
- injury=1 applies combat -15 / survival -20 to NPC Base+Equipment only
- grit replaces combat penalty with +20%
- sold Item stats are not multiplied by injury/grit percentages
- injury=2 itself has no Stat penalty

### NPC-Q77 — ORDINARY INJURY PENALTY UNCHANGED

SETUP: compare healthy vs `injury=1` with no grit.

EXPECT:
```text
투력 -15% on NPC Base+Equipment
강인함 -20% on NPC Base+Equipment
```

PASS:
- persistence/risk changes do not silently raise these visible Stat penalties
- Sold Item contribution remains outside this NPC-side percentage unless another current owner explicitly says otherwise

### NPC-Q78 — ORDINARY INJURY NATURAL RECOVERY

Start at `injury=1` and force each actual outcome.

EXPECT:
```text
성공 -> injury=0
대성공 -> injury=0
퇴각 -> injury=1, or injury=0 when RETREAT HEALING heals it
부상 -> injury=1
```

PASS:
- Retreat cures ordinary Injury only through `DUNGEON_HAZARD_v2.8.0.md` §RETREAT HEALING (its own chance, one draw)
- merely completing another expedition does not cure Injury
- Severe/Death follow their own outcome/state paths
- First Aid Aftercare may still override the persistent state after outcome resolution exactly as ITEM owns

### NPC-Q79 — INJURED RE-EXPEDITION RISK FLAG

SETUP: same NPC/Gate except departure Injury state.

PASS:
- `injury=1` departure activates the +10%p failure-conditioned Death-risk baseline and +15%p Severe-transition baseline owned by `DUNGEON_HAZARD_v2.8.0.md`
- the +10%p modifier is part of the single failure-conditioned Death-risk calculation and does not create a second Death roll
- the modifier applies only because the NPC **began** that expedition injured
- recovery during/after result cannot retroactively erase the risk state used for that expedition
- the exact pre-supply 실패 시 사망 위험 shown during SALE includes the +10%p injured modifier
- after Item commitment, the displayed pre-supply percentage stays frozen while the actual `failureDeathChance` is recalculated internally from final preparation
- an injured expedition that resolves as `성공 / 대성공` performs no Death roll

### NPC-Q74 — LATEST EXPEDITION SNAPSHOT

After one completed expedition, PASS if snapshot records:
- completed Day
- actual destination
- final Outcome
- exact accepted/purchased Bag Item IDs
- only proven contribution/cause tokens

After the next completed expedition for the same NPC:
PASS: previous snapshot is replaced, not appended into an unlimited timeline.

### NPC-Q75 — NO INVENTED CAUSE / CLAIMED DESTINATION

PASS:
- Item presence alone does not create a cause token
- claimed/expected destination is not serialized as actual destination
- liar/destination behavior remains correctly represented by actual result data

### NPC-Q-v28-5 — HELPED CALLBACK REQUIRES ITEM PROOF

Trait-only or generic previous-result events do not unlock a `지난 보급이 도움 됐다` callback.

A previous result with proven sold-Item contribution may unlock it.

No new Gameplay RNG draw is introduced.

### NPC-Q-v28-2 — TRUSTED REGULAR SINGLE THRESHOLD

Expected:
    Loyalty >= 51 -> Trusted Regular / 단골

PASS:
- badge/state/copy uses the owner judgement
- LUST uses the same state
- arrival regular Flavor does not require a separate 60 threshold

Other support-specific thresholds remain their own conditions and do not redefine 단골.

### NPC-Q-v28-2B — ORDINARY PURCHASE LOYALTY

For one successful ordinary paid purchase before explicit modifier effects:

    50% sale  -> Loyalty +4
    100% sale -> Loyalty +1
    150% sale -> Loyalty -4
    150% refused -> Loyalty -2 (the only refusal that moves Loyalty)

PASS:
- a refusal does not apply the purchase Loyalty delta; a refused 150% applies -2
- explicit Trait / Store Support modifiers apply only through their owned rules
- UI / Help exact copy matches COPY_AUDIT_APPROVED_v2.8.0.md

### NPC-Q-v28-8 — NON-PURCHASE LOYALTY / REVISIT

PASS:
- finalized ordinary visit with a paid purchase that Day -> Loyalty +1
- finalized ordinary visit without a paid purchase -> Loyalty 0
- living expedition result -> Loyalty +1
- Death -> no survival +1
- purchase Loyalty remains separate
- final Loyalty remains clamped 0–100
- ordinary purchase formula receives +0.002 per Loyalty point
- returning-NPC revisit weight includes ×(1 + Loyalty×0.03)
- other explicit Trait/Store Support revisit modifiers compose once
- Loyalty never guarantees a revisit

### NPC-Q-v28-3 — LOYALTY MEANING

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

### NPC-Q-v28-4 — DIALOGUE DOES NOT INVENT PURCHASE PREFERENCE

Active pools must not contain:
- 겁쟁이 -> 귀환석 purchase request
- 대식가 -> Food purchase-intent request
- 탐욕 -> expensive/Rare purchase preference
- 단골 -> favorite-product request

PASS uses the exact replacements in COPY_WORLD_VOICE_v2.8.0.md.

### NPC-Q-v28-4B — DIALOGUE EXPOSURE / RECENT REPEAT

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

### NPC-Q05 — NEWCOMER CURVE
SETUP: Sample newcomer near current Day.

EXPECT: No-item forecast usually ≈ 접전~불리. Good preparation can reach ≈ 접전~우세.

PASS: Newcomers are usable but not free aces.

### NPC-Q06 — INVESTED NPC CURVE
SETUP: Sample returning invested NPC near same Day.

EXPECT: No-item ≈ 접전~우세. Good preparation can create reliable ace.

PASS: Long-term investment has visible power.

### NPC-Q07 — HIGH-ROLL NEWCOMER
SETUP: Sample many newcomers.

EXPECT: Rare strong newcomer can exist.

PASS: Exception exists without becoming average replacement strategy.

### NPC-Q08 — TRUSTED REGULAR / ROSTER FEEL TARGET
SETUP: Normal full-run playtests across several seeds / Customer-build states.

EXPECT:
- mid/late run naturally produces around 2–4 trusted regulars
- some newcomer/replacement flow remains visible
- living NPC count never exceeds 22
- temporary Recovery does not create a free cap slot
- Death creates future capacity for normal newcomer generation
- the roster does not flood the Player with endless unfamiliar NPCs
- the roster does not collapse into the exact same tiny set every day

PASS: Living NPC Cap=22 supports a memorable small core without one-NPC monopoly, roster inflation, or attachment dilution.

FAIL SIGNALS:
- Cap 22 is reached so early/often that Rookie/Royal newcomer events routinely become unusable
- fresh NPC flow consistently dilutes the 2–4 trusted-regular target
- the same tiny roster monopolizes visits across the run

### NPC-Q09 — LONG-TERM VALUE
SETUP: Compare selective investment vs repeatedly discarding weak NPCs.

EXPECT: Investment creates future value through existing growth/wallet/loyalty/revisit/final-roster channels.

PASS: No separate punishment system is needed to make care matter.

### NPC-Q-v28-10 — PREMIUM DISPLAY RARITY WEIGHTING

With the `명예 모험가 액자` Decoration (id honorFrame) active, the ordinary NPC rarity draw uses exactly (META §wall — 명예 모험가 액자):

    [25, 30, 26, 13, 6]

for Common / Uncommon / Rare / Epic / Legendary.

PASS:
- the ordinary NPC spawn path is reused
- only the rarity weights change
- no extra NPC is spawned
- no second rarity draw is introduced
- no additional Gameplay RNG draw is consumed

### NPC-Q-v28-6 — DEEP NPC REWARD BASELINE

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

## RELATED

Bag/transaction -> `SALE_v2.8.0.md`
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
Item/Potion/Food/Aftercare -> `ITEM_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
