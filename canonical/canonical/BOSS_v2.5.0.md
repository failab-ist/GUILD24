# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_reveal,sloth_seal,boss_meta_clear

DOC_VERSION=2.5.0
CANONICAL_SET=GUILD24_CANONICAL_v2.5.0
FREEZE_STATUS=FROZEN
NUMERIC_STATUS=PASS3_WHERE_MARKED

## ROLE

BOSS =
`30일 Run의 최종 상대가 누구이며, 그 상대 때문에 Final 판단이 어떻게 달라지는가`

Boss는 Final을 별도 전투게임으로 바꾸지 않는다.
기존 Final / NPC / Item / Hazard / Relic / Loyalty / Economy 값을 재사용해
마지막 판단의 우선순위를 Boss별로 다르게 만든다.

Boss-specific mechanic 때문에 새로 만들지 않는다:
- 전용 Combat System
- 전용 Resource
- 전용 Item Category
- 특정 Boss 전용 필수 Item
- 전용 Class Synergy
- QTE / Real-time action
- 별도 Final 생존 판정

Final resolution ownership -> FINAL_EXPEDITION

---

## KEY

bossPool=[WRATH,PRIDE,ENVY,GREED,GLUTTONY,LUST,SLOTH]
bossCount=7
bossSelection=pureSeededRNGOnePerRun
bossSelectionFixedWithinRun=YES
bossRerollBySaveLoad=NO

reveal:
- D5=Boss Identity
- D15=Boss Trait
- D30=Final Family Pair

revealBeforeSameDayRelicDecision=YES

familyPair:
- count=2
- distinct=YES
- source=canonical Dungeon Families
- independentFromBossIdentity=YES
- fixedBossFamilyPair=NO

finalOutcome=[CLEAR,FAIL]
postClearBossSurvivalRewardLayer=NO

---

## BOSS ROSTER / PLAYER-FACING IDENTITY

| Boss ID | Sin | Player-facing Name | Base Visual | D30 Visual |
|---|---|---|---|---|
| WRATH | 분노 | 분노의 마왕 래스 | D5/D15 BASE | D30 BATTLE |
| PRIDE | 오만 | 오만의 마왕 프라이드 | D5/D15 BASE | D30 BATTLE |
| ENVY | 질투 | 질투의 마왕 엔비 | D5/D15 BASE | D30 BATTLE |
| GREED | 탐욕 | 탐욕의 마왕 그리드 | D5/D15 BASE | D30 BATTLE |
| GLUTTONY | 폭식 | 폭식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
| LUST | 색욕 | 색욕의 마왕 러스트 | D5/D15 BASE | D30 BATTLE |
| SLOTH | 나태 | 나태의 마왕 슬로스 | D5/D15 BASE | D30 state by Seal Break count |

Normal NPC Name Pool is not owned by BOSS.
Boss fixed identity names above are Canonical Boss IDs/names.
Portrait filenames / sprite-atlas coordinates belong to production catalog data, not this gameplay rule document.

---

## GENERATION / SAVE CONTRACT

Boss ID is rolled once from the 7-Boss pool with Run RNG and is persisted before its reveal.

Required state:
- bossId
- identityRevealSeen
- traitRevealSeen
- Boss-specific persistent state
- Sloth opportunity Days when bossId=SLOTH
- Sloth chosen Seal Break count

Save/Load must not:
- reroll Boss ID
- reroll Sloth opportunity Days
- replay a consumed Boss reveal for reward/exploit
- undo a committed Seal Break

The Boss may be internally generated before D5 while remaining hidden from the Player until D5.

---

## REVEAL ORDER

### D5

Before the D5 Relic focused reveal / decision:
1. reveal Boss Identity
2. show Boss fixed name / visual identity
3. do NOT reveal the exact Boss Trait yet
4. then continue to the D5 Relic window

Question created:
`이번 Run의 최종 상대는 누구인가?`

### D15

Before the D15 Relic focused reveal / decision:
1. reveal the exact Boss Trait
2. if SLOTH and D15 is one of the selected Seal opportunities, expose the Seal choice at this Relic window
3. then resolve the D15 Relic-window choice

Question created:
`이 마왕 때문에 무엇을 다르게 준비할 것인가?`

### D20 / D25

No new general Boss reveal.
If SLOTH and this Day is a selected Seal opportunity, expose the Seal choice with that Day's Relic window.

### D30

Before the D30 Relic focused reveal / decision and before Final party lock:
1. reveal the two random Final Families
2. show their canonical Final threat information
3. if SLOTH, expose the mandatory D30 Seal opportunity with the D30 Relic window
4. resolve D30 Relic / Seal choice
5. complete Final-relevant preparation
6. Final lock

Family generation / Final Hazard Pool ownership -> FINAL_EXPEDITION
Relic-window ownership -> RELIC
Presentation -> UI_UX

---

## BOSS TRAIT DESIGN CONTRACT

Boss Traits modify existing Final judgment only.

Rules:
- no mandatory Job
- no mandatory single Item
- no hidden new Player Stat
- no Boss-only preparation slot
- material effect is Player-readable at D15
- Boss Trait state is stable after reveal
- Boss and random Family pair may combine, but one specific combination must not become an unavoidable hard lock

Exact numeric values marked PASS3 are tuning values, not permission to redesign the mechanic.

---

## WRATH — VANILLA / RAW POWER

identity=baseline raw-power Boss
specialTrait=NONE

WRATH does not add a separate modifier layer.
Its differentiation is the baseline Boss Power / direct Final check.

Purpose:
- reference point for other Boss difficulty
- strongest expression of ordinary Final fundamentals
- no special counter tax

WRATH effective Boss Power numeric -> PASS3 with FINAL balance.

---

## PRIDE — IRON ARMOR

identity=devalues over-reliance on combat Stat

At Final calculation, only the `투력` contribution inside each participant's Individual Final Power is reduced.

Starting structural expression:
```text
normal combat contribution = 투력 × 0.58
PRIDE combat contribution  = 투력 × 0.58 × prideCombatFactor
```

`prideCombatFactor` starting candidate = 0.80
exact numeric status=PASS3

Other components remain on their normal channels:
- 강인함
- 기동
- 정신
- 환경피해

PRIDE does not apply a blanket reduction to all four Stats.

---

## ENVY — TARGET THE ACE

identity=punishes dependence on one highest-contributing Final participant

Before ENVY's temporary penalty:
1. compute each participant's standard Individual Final Power using the current Final state
2. find the single highest contributor
3. tie -> deterministic stable NPC-ID order

Only that one NPC receives ENVY's temporary Final-only debuff.

Affected Player-facing Stats:
- 투력
- 강인함
- 기동
- 정신

Starting candidate:
```text
envyAceStatFactor = 0.80
```
exact numeric status=PASS3

Rules:
- temporary Final snapshot only
- does not permanently mutate NPC Stats
- effect must be visible before Final lock
- does not create a new persistent Condition

---

## GREED — SALES TARGET

identity=tests whether the Player actually ran a functioning store, not only an NPC-leveling pipeline

Input metric:
```text
Cumulative Gross Sales
= sum of actual rounded sale revenue committed before Final lock
```

Metric ownership -> ECONOMY_ORDER / SALE / NIGHT_CLOSING

Rule:
- if cumulative gross sales >= greedRevenueTarget -> no GREED revenue penalty
- if cumulative gross sales < greedRevenueTarget -> GREED receives additional effective Boss Power
- shortfall penalty scales with the shortfall and has a hard cap
- exceeding the target does not create an unlimited bonus

Exact:
- greedRevenueTarget=PASS3
- shortfallSlope=PASS3
- shortfallCap=PASS3

No separate wealth meter is created.
No hidden alternate revenue definition is created.

---

## GLUTTONY — HIGH-END STAT CONSUMPTION PRESSURE

identity=reduces the value of solving Final only by stacking high-end raw Stat Items

affectedScope:
- high-end Item raw Stat contribution used by Final participants

unaffectedScope remains 100%:
- Hazard Counter effect
- Supply effect
- Insurance behavior
- Utility behavior
- explicit non-Stat special effect

High-end Item boundary and reduction factor are numeric/tuning data:
- affectedRarityThreshold=PASS3
- rawStatRetainedFactor=PASS3

Rules:
- no extra inventory unit is secretly consumed
- no Item is deleted from persistent inventory outside normal use rules
- material reduction is disclosed at D15
- Gluttony does not suppress the entire Item effect bundle

Item effect ownership -> ITEM

---

## LUST — RELATIONSHIP PROTECTION

identity=weak relationship is a Final liability; invested/loyal NPCs resist the charm pressure

For each Final participant:
- evaluate existing Loyalty / trusted-regular state
- protected participant -> no LUST relationship penalty
- unprotected participant -> temporary Final-only charm penalty

Rules:
- reuse existing Loyalty / Regular state
- no new affection/charm meter
- no permanent NPC mutation
- protection condition and penalty are Player-readable before Final lock

Exact:
- protection threshold / trusted-regular mapping=PASS3 in NPC_TRAIT
- charm penalty magnitude=PASS3

LUST must not make one specific Job mandatory.

---

## SLOTH — SEAL BREAK RELIC TRADE-OFF

identity=Relic opportunity is traded for weakening the Final Boss

SLOTH uses Seal Break opportunities instead of a normal numeric Trait penalty.

### Opportunity schedule

From [D15,D20,D25]:
- choose exactly 2 distinct Days by seeded RNG
- persist the selected Days

D30:
- always has one opportunity

Total opportunities/run when Boss=SLOTH:
```text
3
```

D10 is not a Sloth opportunity.
The D15 Trait reveal occurs before any D15 Sloth choice.

### Window choice

At a Sloth opportunity Relic window, Player may choose one of:

A. normal Relic acquisition path
B. break one Sloth Seal

Seal Break:
- Gold cost=0
- consumes that Relic window's acquisition opportunity
- does not grant the Relic
- committed choice persists
- Save/Load cannot duplicate or reverse it

Existing Relic candidate generation / Defer lifecycle is reused.
Exact UI ownership -> RELIC / UI_UX.

### Final difficulty ordering

Let `sealBreakCount` be the number of committed Seal Break choices by Final lock.

Difficulty order:
```text
3 breaks = weakest SLOTH
2 breaks = weak SLOTH
1 break  = slightly below WRATH baseline
0 breaks = strongest SLOTH / hardest-side Boss
```

Exact Boss Power values/factors for [0,1,2,3] breaks=PASS3.

Seal Break count is not a new permanent Meta resource.
It resets each Run.

---

## FINAL POWER / CLEAR INTERACTION

BOSS does not redefine the standard Final formula.

Pipeline:
1. standard Final state / Family Hazard preparation
2. apply Boss-specific Final modifier where applicable
3. calculate modified Raw Party Power and/or effective Boss Power
4. apply standard Final Roll
5. compare against effective Boss Power
6. produce one CLEAR / FAIL result

Final formula / roll / party / clear ownership -> FINAL_EXPEDITION

Boss Clear does not add a second post-clear survival/death gate.

---

## META CLEAR SIGNAL

On successful Boss clear, emit one stable result containing:
- bossId
- participating distinct Job IDs
- clear=YES

Cross-run Job Mastery / distinct-Boss unlock processing is owned by META.
BOSS does not duplicate Meta progression state.

---

## QA / ACCEPTANCE

### BOSS-Q01 — ONE BOSS PER RUN
Across seeds, exactly one of 7 Boss IDs is generated and remains fixed.

### BOSS-Q02 — SAVE/LOAD STABILITY
Reload cannot change Boss ID, revealed Trait, Sloth opportunity Days, or committed Seal Break count.

### BOSS-Q03 — REVEAL ORDER
D5 Identity precedes D5 Relic reveal; D15 Trait precedes D15 Relic reveal; D30 Family disclosure precedes D30 Relic/Sloth decision.

### BOSS-Q04 — FAMILY INDEPENDENCE
The same Boss can occur with different valid two-Family Final pairs; no Boss has a fixed Family pair.

### BOSS-Q05 — WRATH BASELINE
WRATH applies no hidden Trait modifier.

### BOSS-Q06 — PRIDE SCOPE
Only the combat contribution channel changes; other Final components remain ordinary.

### BOSS-Q07 — ENVY ACE TARGET
Exactly one pre-penalty highest contributor is targeted; ties are deterministic; permanent NPC Stats do not change.

### BOSS-Q08 — GREED METRIC
GREED reads the same actual committed sale revenue used by economy reporting; no duplicate hidden sales counter.

### BOSS-Q09 — GLUTTONY EFFECT SPLIT
Only the approved high-end raw Stat contribution is reduced; Counter/Supply/Insurance/Utility remain intact.

### BOSS-Q10 — LUST RELATIONSHIP
Existing Loyalty/regular state controls protection; no new charm meter exists.

### BOSS-Q11 — SLOTH OPPORTUNITY COUNT
Exactly 2 of D15/D20/D25 plus D30 opportunity; D10 never selected.

### BOSS-Q12 — SLOTH EXCLUSIVITY
A committed Seal Break and a Relic acquisition cannot both be obtained from the same opportunity window.

### BOSS-Q13 — NO SECOND FINAL RESOLVE
Boss clear remains one Final CLEAR; no ordinary expedition resolve is run afterward.

### BOSS-Q14 — NUMERIC PASS3
Tuning may alter only values marked PASS3 without changing each Boss's mechanic identity.

---

## RELATED

final formula/family/party/clear -> FINAL_EXPEDITION
relic/sloth opportunity -> RELIC
meta/mastery/unlock -> META
job/loyalty -> NPC_TRAIT
item effect -> ITEM
economy revenue -> ECONOMY_ORDER
sale revenue commit -> SALE
closing revenue report -> NIGHT_CLOSING
presentation -> UI_UX
copy -> COPY_WORLD_VOICE
