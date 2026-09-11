# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_reveal,sloth_seal,boss_meta_clear

DOC_VERSION=2.5.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
FREEZE_STATUS=FROZEN
NUMERIC_STATUS=PASS3_WHERE_MARKED

## ROLE

BOSS =
`30일 동안의 서로 다른 투자 방식이 Final에서 어떤 약점으로 드러나는가`

Boss는 별도 전투게임을 추가하지 않는다.
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
- D15=exact Boss Trait
- D30=Final Family Pair

revealBeforeSameDayRelicDecision=YES

familyPair:
- count=2
- distinct=YES
- source=authoritative Dungeon Families
- independentFromBossIdentity=YES
- fixedBossFamilyPair=NO

finalOutcome=[CLEAR,FAIL]
postClearBossSurvivalRewardLayer=NO

Boss design question:
- WRATH = 이번 30일 자체를 잘 운영했는가?
- PRIDE = 투력 하나에만 의존했는가?
- ENVY = 한 명에게만 투자를 몰았는가?
- GREED = NPC를 키우느라 가게 경영을 버렸는가?
- GLUTTONY = 고급 보급품의 능력치 숫자에만 의존했는가?
- LUST = 막판 강한 신규 NPC가 아니라 실제 단골을 만들었는가?
- SLOTH = 현재 Build 강화와 Final 안정성 사이에서 무엇을 선택했는가?

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
Boss fixed identity names above are authoritative Boss IDs/names.
Portrait filenames / sprite-atlas coordinates belong to production catalog data, not this gameplay rule document.

---

## GENERATION / SAVE CONTRACT

Boss ID is rolled once from the 7-Boss pool with run RNG and is persisted before its reveal.

Required state:
- bossId
- identityRevealSeen
- traitRevealSeen
- Boss-specific persistent state
- Sloth opportunity Days when bossId=SLOTH
- Sloth chosen Seal Break count

At Final Lock, persist or deterministically restore all Boss-relevant locked state.

Where applicable:
- ENVY target identity
- GREED committed gross-sales snapshot
- LUST trusted-regular state at Final Lock
- SLOTH sealBreakCount

Save/Load must not:
- reroll Boss ID
- reroll Sloth opportunity Days
- replay a consumed Boss reveal for reward/exploit
- undo a committed Seal Break
- retarget ENVY after Final Lock
- reread GREED from a later revenue state after Final Lock
- reevaluate LUST regular status after Final Lock

The Boss may be internally generated before D5 while remaining hidden from the Player until D5.

---

## REVEAL ORDER

### D5

Before the D5 Relic focused reveal / decision:
1. reveal Boss Identity
2. show Boss fixed name / D5-D15 BASE visual identity
3. show short Boss-specific Flavor that may hint at the Trait
4. do NOT reveal the exact Boss Trait yet
5. then continue to the D5 Relic window

Presentation -> UI_UX
Exact Player-facing Copy -> COPY_WORLD_VOICE

### D15

Before the D15 Relic focused reveal / decision:
1. show the same D5/D15 BASE identity visual
2. reveal the exact Boss Trait
3. expose the actual material Player-facing effect
4. if SLOTH and D15 is one of the selected Seal opportunities, expose the Seal choice at this Relic window
5. then resolve the D15 Relic-window choice

Do not replace exact Function with strategy advice.
Do not expose exact Final success probability.

Presentation -> UI_UX
Exact Player-facing Copy -> COPY_WORLD_VOICE

### D20 / D25

No new general Boss reveal.
If SLOTH and this Day is a selected Seal opportunity, expose the Seal choice with that Day's Relic window.

### D30

Before the D30 Relic focused reveal / decision and before Final party lock:
1. reveal the two random Final Families
2. show each Family's authoritative T2 Hazard information
3. if SLOTH, expose the mandatory D30 Seal opportunity with the D30 Relic window
4. resolve D30 Relic / Seal choice
5. complete Final-relevant preparation
6. Final lock

Two Families do NOT imply exactly two Hazard keys.
Use the actual T2 Hazard set owned by DUNGEON_HAZARD.

Family generation / Final Hazard Pool ownership -> FINAL_EXPEDITION
Relic-window ownership -> RELIC
Presentation -> UI_UX
Exact Player-facing Copy -> COPY_WORLD_VOICE

---

## BOSS TRAIT DESIGN CONTRACT

Boss Traits modify existing Final judgment only.

Rules:
- no mandatory Job
- no mandatory single Item
- no hidden new Player Stat
- no Boss-only preparation slot
- material effect is Player-readable at D15
- exact affected values are visible before Final lock when a Player-visible value changes
- Boss Trait state is stable after Final lock
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

## PRIDE — FINAL COMBAT STAT REDUCTION

identity=punishes over-reliance on 투력

At Final Lock, every Final participant receives a Final-only Snapshot modifier:

```text
Final 투력
=
pre-PRIDE Final 투력 × prideCombatFactor
```

Unaffected:
- 강인함
- 기동
- 정신

Rules:
- applies to every Final participant
- modifies the visible Final Snapshot `투력`
- does not permanently mutate the NPC's stored Stat
- modified value is used for Final calculation
- Player sees `original -> applied` before Final commitment
- no hidden contribution-coefficient-only implementation may replace this visible Stat change

`prideCombatFactor=PASS3`

---

## ENVY — TARGET THE ACE

identity=punishes dependence on one highest-contributing Final participant

Target selection:
1. compute each selected participant's standard pre-ENVY Individual Final Power
2. find the single highest contributor
3. tie -> deterministic stable NPC-ID order
4. lock exactly one target
5. apply ENVY modifier
6. recalculate that target's Final Power

Target receives:

```text
투력   × envyStatFactor
강인함 × envyStatFactor
기동   × envyStatFactor
정신   × envyStatFactor
```

Rules:
- exactly one participant
- target does not switch after its own penalty changes its Power
- all four reduced Stats remain reduced for the entire Final resolution
- original persistent NPC Stats are not changed
- no new persistent Condition
- Player sees all affected values as `original -> applied`

`envyStatFactor=PASS3`

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

```text
shortfall
=
max(0, greedRevenueTarget - Cumulative Gross Sales)

GreedBonus
=
min(shortfall × shortfallSlope, shortfallCap)

effectiveBossPower
=
baseBossPower + GreedBonus
```

Therefore:
- large shortfall -> larger strengthening
- small shortfall -> smaller strengthening
- target met -> GreedBonus 0
- exceeding target does not create an unlimited Player bonus

Exact:
- greedRevenueTarget=PASS3
- shortfallSlope=PASS3
- shortfallCap=PASS3

No separate wealth meter.
No hidden Boss-only revenue definition.

Player-readable after D15:
- 목표 매출
- 현재 매출
- 달성률
- 현재 탐욕 강화 %

For display only:

```text
greedDisplayStrengtheningRate
=
GreedBonus / baseBossPower
```

This display value:
- must match the actual applied GreedBonus
- does not create a second calculation
- is not a separately persisted truth when derivable
- does not expose baseBossPower / effectiveBossPower / Final success probability

---

## GLUTTONY — HIGH-END SUPPLY RAW-STAT PRESSURE

identity=reduces the value of solving Final only by stacking high-end raw Stat supplies

Internal affected scope:
- high-end Item raw Stat contribution used by Final participants

Player-facing terminology:
- affected Item presentation uses `보급품`
- do not present `Stat Item` as a Player-facing category

Unaffected scope remains 100%:
- Hazard Counter effect
- Supply effect
- Insurance behavior
- Escape / death-mitigation behavior already owned by Insurance/Special effects
- Utility behavior
- explicit non-Stat special effect

High-end boundary and reduction factor:
- affectedRarityThreshold=PASS3
- gluttonyStatFactor=PASS3

Rules:
- no extra inventory unit is secretly consumed
- no Item is deleted from persistent inventory outside normal use rules
- material reduction is disclosed at D15
- Final preview shows actual changed Stat contribution as `original -> applied`
- Gluttony does not suppress the entire Item effect bundle

Item effect ownership -> ITEM

---

## LUST — TRUSTED REGULAR PROTECTION

identity=tests long-term NPC relationship investment

LUST does not define a new:
- affection meter
- charm meter
- Loyalty threshold
- Boss-specific relationship state

Protection reads the existing NPC `Trusted Regular / 단골` state owned by NPC_TRAIT.

Evaluation timing:
- D15 reveals the rule
- D15 state is NOT frozen
- Player may build relationship after D15
- actual protected/unprotected state is read at Final Lock

At Final Lock:

```text
trusted regular
→ LUST modifier 없음

not trusted regular
→ LUST modifier 적용
```

Every non-regular Final participant receives:

```text
투력   × lustStatFactor
강인함 × lustStatFactor
기동   × lustStatFactor
정신   × lustStatFactor
```

Rules:
- all four Stats use the same Factor
- Job identity does not change the penalty
- trusted regular participants remain ×1.00
- modifier lasts for the entire Final resolution
- original persistent NPC Stats are not changed
- Player sees affected values as `original -> applied`
- LUST must not create its own alternate regular classification

`lustStatFactor=PASS3`

LUST tests relationship investment, not Job composition.

---

## SLOTH — SEAL BREAK RELIC TRADE-OFF

identity=Relic opportunity is traded for weakening the Final Boss

### Opportunity schedule

From [D15,D20,D25]:
- choose exactly 2 distinct Days by seeded RNG
- persist the selected Days

D30:
- always has one opportunity

Total opportunities:
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

Let `sealBreakCount` be committed Seal Break choices by Final Lock.

```text
3 breaks = weakest SLOTH
2 breaks = weak SLOTH
1 break  = slightly below WRATH baseline
0 breaks = strongest SLOTH / hardest-side Boss
```

Exact Boss Power values/factors for [0,1,2,3] breaks=PASS3.

Seal Break count is not a permanent Meta resource.

### Visual state

```text
D5 / D15
→ BASE

D30 + 0 Seal Break
→ BASE reuse

D30 + 1 Seal Break
→ D30 SB1

D30 + 2 Seal Break
→ D30 SB2

D30 + 3 Seal Break
→ D30 SB3
```

There is no separate D30 / SB0 visual requirement.
Gameplay truth is `bossId + sealBreakCount`, not an asset filename.

---

## FINAL MODIFIER ORDER

BOSS does not redefine the standard Final formula.

Shared order:

```text
1. locked NPC base/growth/current Condition state
2. locked Item / Supply / equipment effects
3. Final Family Hazard preparation result
4. participant-side Boss Final Snapshot modifier
5. Individual Final Power
6. Party sum
7. Boss-side effective Boss modifier
8. Final Roll
9. CLEAR / FAIL
```

Participant-side:
- PRIDE
- ENVY
- GLUTTONY-related Item raw-Stat adjustment
- LUST

Boss-side:
- GREED
- SLOTH

WRATH adds no special modifier.

Final formula / roll / party / clear ownership -> FINAL_EXPEDITION.

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
Reload cannot change Boss ID, revealed Trait, Sloth opportunity Days, committed Seal Break count, or Final-locked Boss state.

### BOSS-Q03 — REVEAL ORDER
D5 Identity precedes D5 Relic reveal; D15 exact Trait precedes D15 Relic reveal; D30 Family disclosure precedes D30 Relic/Sloth decision.

### BOSS-Q04 — FAMILY INDEPENDENCE
The same Boss can occur with different valid two-Family Final pairs; no Boss has a fixed Family pair.

### BOSS-Q05 — WRATH BASELINE
WRATH applies no hidden Trait modifier.

### BOSS-Q06 — PRIDE VISIBLE STAT SCOPE
Only each participant's Final Snapshot 투력 changes.
PASS:
- 투력 shows original -> applied
- 강인함/기동/정신 unchanged
- persistent NPC Stat unchanged

### BOSS-Q07 — ENVY TARGET / DURATION
Exactly one highest pre-ENVY contributor is selected deterministically.
PASS:
- target does not switch after penalty
- all four Stats remain reduced for the entire Final
- original NPC Stats remain intact
- preview matches resolution

### BOSS-Q08 — GREED METRIC / READABILITY
GREED reads the same actual committed sale revenue used by economy reporting.
PASS:
- no duplicate hidden sales counter
- target/current/achievement values are correct
- displayed strengthening matches actual GreedBonus
- internal Boss Power / success probability remains hidden

### BOSS-Q09 — GLUTTONY EFFECT SPLIT
PASS:
- only eligible high-end 보급품 raw Stat contribution changes
- actual Stat change is visible
- Counter/Supply/Insurance/Utility/special effects remain unchanged
- no extra consumption occurs

### BOSS-Q10 — LUST REGULAR PROTECTION
PASS:
- existing Trusted Regular state is read at Final Lock
- no LUST-only relationship threshold exists
- every non-regular participant has all four Final Stats reduced
- regular participant receives no LUST Stat penalty
- persistent NPC Stats remain unchanged

### BOSS-Q11 — SLOTH OPPORTUNITY COUNT
Exactly 2 of D15/D20/D25 plus D30 opportunity; D10 never selected.

### BOSS-Q12 — SLOTH EXCLUSIVITY
A committed Seal Break and a Relic acquisition cannot both be obtained from the same opportunity window.

### BOSS-Q13 — NO SECOND FINAL RESOLVE
Boss clear remains one Final CLEAR; no ordinary expedition resolve is run afterward.

### BOSS-Q14 — NUMERIC PASS3
Tuning may alter only values marked PASS3 without changing each Boss's mechanic identity.

### BOSS-Q15 — VISUAL STATE
D5/D15 use BASE.
Final uses D30 BATTLE for six ordinary Bosses.
SLOTH uses BASE for SB0 and matching D30 SB1/SB2/SB3 for 1/2/3 breaks.
No separate SLOTH D30 SB0 asset is required.

---

## RELATED

final formula/family/party/clear -> FINAL_EXPEDITION
relic/sloth opportunity -> RELIC
meta/mastery/unlock -> META
job/loyalty/trusted-regular -> NPC_TRAIT
item effect -> ITEM
economy revenue -> ECONOMY_ORDER
sale revenue commit -> SALE
closing revenue report -> NIGHT_CLOSING
presentation -> UI_UX
copy -> COPY_WORLD_VOICE
