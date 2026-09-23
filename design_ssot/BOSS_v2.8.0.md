# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_information_cadence,sloth,lust
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/BOSS_v2.8.0-patch.md,history/BOSS_v2.7.0.md,history/BOSS_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/BOSS.md

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

Final resolution ownership -> FINAL_EXPEDITION_v2.8.0.md

---

## KEY

bossPool=[WRATH,PRIDE,ENVY,GREED,GLUTTONY,LUST,SLOTH]
bossCount=7
bossSelection=pureSeededRNGOnePerRun
bossSelectionFixedWithinRun=YES
bossRerollBySaveLoad=NO


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
- GLUTTONY = 모험가 자체를 성장시키기보다 보급품의 능력치 증가에 의존했는가?
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
| GLUTTONY | 탐식 | 탐식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
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

## FIVE-DAY INFORMATION LOOP — EXACT

Purpose:
normal shop play must not make the Player forget that the Run is building toward a specific Boss.

Cadence:

    D0  first-Morning briefing / investigation begins / D30 objective established
    D5  Boss identity revealed
    D10 second investigation begins: combat anomaly
    D15 exact Boss Trait revealed
    D20 final reconnaissance begins: route/environment
    D25 exact Final Family + Hazard state revealed
    D30 no new reveal

Information question:
- D0 -> D5: WHO is the target?
- D10 -> D15: HOW does this Boss fight?
- D20 -> D25: WHERE / WHAT does the Final expedition face?

Each beat must seek new information.
Do not repeat generic 조사 중 copy without a new question.

## SAME-DAY ORDERING

D0 is the deliberate exception to later milestone ordering:

    first Store Support choice
    -> enter DAY 1 MORNING
    -> D0 first-Morning Boss briefing
    -> ordinary DAY 1 MORNING flow

The D0 objective is not printed inside the first Store Support decision surface.
It is the first presentation step of DAY 1 MORNING and must resolve before the ordinary Morning
Event / Gate / ORDER sequence continues.

Exact trigger, acknowledgement and Save/Load contract -> CORE_RUN_v2.8.0.md
§D0 FIRST-MORNING BOSS BRIEFING — EXACT.

On D5/D10/D15/D20/D25, the Boss information beat occurs before the same-Day Store Support
decision so the information can matter to the Player.

D30 reuses all already-known information.

## D0 INFORMATION BOUNDARY — EXACT

D0 teaches the Run objective and investigation cadence only.

It may state:
- the Guild investigation has begun;
- the target will be identified on DAY 5;
- investigation information continues at five-Day intervals;
- on DAY 30 the Player sends 3 grown adventurers to the Demon Castle for the Final subjugation;
- the Player must use the investigation information to prepare that party while keeping the Store
  operating through DAY 30.

D0 must not reveal or depict:
- Boss identity / name;
- Boss character art or silhouette;
- Boss Trait;
- Final Family / Hazard state;
- the per-Boss FINAL domain backdrop.

Exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
D5 remains the first Boss identity / art reveal.

## REVEAL ORDER

### D5

Before the D5 Relic focused reveal / decision:
1. reveal Boss Identity
2. show Boss fixed name / D5-D15 BASE visual identity
3. show short Boss-specific Flavor that may hint at the Trait
4. do NOT reveal the exact Boss Trait yet
5. then continue to the D5 Relic window

Presentation -> UI_UX_v2.8.0.md
Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md

### D15

Before the D15 Relic focused reveal / decision:
1. show the same D5/D15 BASE identity visual
2. reveal the exact Boss Trait
3. expose the actual material Player-facing effect
4. if SLOTH and D15 is one of the selected Seal opportunities, expose the Seal choice at this Relic window
5. then resolve the D15 Relic-window choice

Do not replace exact Function with strategy advice.
Do not expose exact Final success probability.

Presentation -> UI_UX_v2.8.0.md
Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md

### D20 / D25

If SLOTH and this Day is a selected Seal opportunity, expose the Seal choice with that Day's Relic window.

- exact Final Family Pair + Hazard Pool is generated/revealed/persisted on D25 by `FINAL_EXPEDITION_v2.8.0.md`

Two Families do NOT imply exactly two Hazard keys.
Use the actual T2 Hazard set owned by `DUNGEON_HAZARD_v2.8.0.md`.

### D30

- D30 reuses that exact persisted state
- no D30 Family reroll

Before the D30 Relic focused reveal / decision and before Final party lock:
1. if SLOTH, expose the mandatory D30 Seal opportunity with the D30 Relic window
2. resolve D30 Relic / Seal choice
3. complete Final-relevant preparation
4. Final lock

Family generation / Final Hazard Pool ownership -> FINAL_EXPEDITION_v2.8.0.md
Relic-window ownership -> RELIC_v2.8.0.md
Presentation -> UI_UX_v2.8.0.md
Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md

## PERSISTENCE

D0/D5/D15/D25 keep their persisted seen-state behavior.

D10 and D20 each require a persisted one-time seen marker.
After the Player dismisses that report, save/reload must not replay it.

No new RNG is consumed by merely showing a report.

## PRESENTATION PAYOFF

UI_UX_v2.8.0.md may strengthen the visual/audio acknowledgement of:
- D0 investigation start
- D5 identity
- D10 combat-question investigation
- D15 exact Trait
- D20 route/environment investigation
- D25 exact Final Family + Hazard state
- D30 Final entry

D30 presentation is not a new information beat.
It may only heighten the transition into FINAL using information already known by D25.

No presentation cue may leak Boss identity, Trait, Final Family/Hazard state or other information
before the owning reveal beat.

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

`DIRECTOR DOCUMENT BASELINE` values are fixed implementation starting values during adoption; frozen QA may report a `BALANCE FINDING` but may not auto-tune them. Any numeric change requires a separate approved owner-spec update.

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

WRATH effective Boss Power=200. It is the unmodified baseline every other Boss is measured against.

WRATH adds no special modifier.

Balance intent:
- do not lower WRATH merely so an average first Run clears
- first clear must still be possible at Job Mastery 0 through strong Run growth/preparation/build/player mastery
- no new permanent power is granted merely for failing Runs

Meta progression remains owned by `META_v2.8.0.md`.

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

`DIRECTOR DOCUMENT BASELINE`

```text
prideCombatFactor = 0.92
```

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

`envyStatFactor=0.92`

---

## GREED — SALES TARGET

identity=tests whether the Player actually ran a functioning store, not only an NPC-leveling pipeline

Input metric:

```text
Cumulative Gross Sales
= sum of actual rounded sale revenue committed before Final lock
```

Metric ownership -> `ECONOMY_ORDER_v2.8.0.md` / `SALE_v2.8.0.md` / `NIGHT_CLOSING_v2.8.0.md`

Rule:

```text
shortfallRatio
=
max(0, greedRevenueTarget - Cumulative Gross Sales) / greedRevenueTarget

GreedBonus
=
min(shortfallCap, shortfallRatio × shortfallCap)

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
- greedRevenueTarget=18800
- shortfall is measured as a SHARE of the target, so the penalty means the same thing whatever the target is
- the penalty is linear in the unmet share: no sales -> the full cap; target met -> 0

Keep the existing Gross-Sales metric and revenue target unless separately rebalanced by approved economy evidence.

`DIRECTOR DOCUMENT BASELINE`

```text
shortfallCap = 12 Boss Power
```

Thus with WRATH base 200:
- target met -> effective Boss Power 200
- maximum shortfall penalty -> effective Boss Power 212

Displayed strengthening must still derive from the actual applied Greed bonus.

### GREED snapshot timing under current Final preparation

D30 Final now resolves through:

```text
출전 NPC 선택 -> FINAL 준비 -> Final Lock -> 결과
```

The committed GREED gross-sales snapshot is taken at **Final Lock after Final preparation has completed**.
Do not snapshot before the selected Final participants have finished their preparation interactions.

The current Final owner fixes those preparation transfers to 50% / 매입가.

### FINAL TRANSFER GROSS-SALES INCLUSION — EXACT

Each committed fixed-price Final transfer is real economy revenue for GREED accounting.

For every committed Final transfer:

```text
Gross Sales += fixed Final transfer price exactly once
```

Therefore:
- Final transfers are included in GREED's Gross Sales metric
- the committed GREED snapshot at Final Lock includes all successful Final preparation transfers completed before that lock
- do not exclude them merely because there is no ordinary Final SALE phase
- do not count them a second time during Final resolution

Exact Wallet/Gold/fixed-price preparation truth -> `ECONOMY_ORDER_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md`.

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

## GLUTTONY ITEM-STAT SCOPE — EXACT

identity=tests whether Final strength comes from grown NPCs rather than Item-sourced Core-Stat boosts

GLUTTONY reduces only positive Item-sourced Core-Stat increases in the Final.

Affected:
- 투력
- 강인함
- 기동
- 정신

Each positive Item contribution to those Stats is applied at 50%.

Not reduced by GLUTTONY:
- 환경 대응
- 보급
- 보험
- other non-Stat Item effects

Item rarity / price is not a boundary for this Boss effect.
D5 may hint at the abnormal result but does not reveal the exact 50% value.
D15 owns the exact Function disclosure.

`DIRECTOR DOCUMENT BASELINE`

For every Final participant:

```text
all positive Core-Stat contribution originating from Items ×0.50
```

Affected:
- positive Item contribution to 투력 / 강인함 / 기동 / 정신
- after Item-side Food/Drink/Potion Trait/Relic amplification has produced the final positive Item Stat contribution

Unaffected:
- NPC natural/base/growth/equipment Stats
- Hazard Counter
- Supply
- Insurance
- Utility
- Loot/economy effects
- explicit RiskReward harmful penalty
- Escape / death-mitigation behavior already owned by Insurance/Special effects
- explicit non-Stat special effect

No Rarity threshold remains.
No extra Item is consumed.

Player-facing Final preview must show the actual changed Item Stat contribution without exposing internal Final success probability.

Player-facing terminology:
- affected Item presentation uses `보급품`
- do not present `Stat Item` as a Player-facing category

Rules:
- no extra inventory unit is secretly consumed
- no Item is deleted from persistent inventory outside normal use rules
- material reduction is disclosed at D15
- Final preview shows actual changed Stat contribution as `original -> applied`
- Gluttony does not suppress the entire Item effect bundle

Item effect ownership -> `ITEM_v2.8.0.md`
Exact Trait title/prose is owned by `COPY_AUDIT_APPROVED_v2.8.0.md`.

---

## LUST — TRUSTED REGULAR PROTECTION

identity=tests long-term NPC relationship investment

LUST does not define a new:
- affection meter
- charm meter
- Loyalty threshold
- Boss-specific relationship state

Protection reads the existing NPC `Trusted Regular / 단골` state owned by `NPC_TRAIT_v2.8.0.md`.

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

`lustStatFactor=0.95`


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

Each opportunity remains mutually exclusive:

```text
normal Relic acquisition
OR
break one Sloth Seal for 0G
```

Existing Relic candidate generation / Defer lifecycle is reused.
Relic-window lifecycle -> `RELIC_v2.8.0.md`.
Exact UI ownership -> `RELIC_v2.8.0.md` / `UI_UX_v2.8.0.md`.

### Final difficulty ordering

Let `sealBreakCount` be committed Seal Break choices by Final Lock.

`DIRECTOR DOCUMENT BASELINE`

Effective Boss Power by committed `sealBreakCount`:

```text
0 breaks = 225
1 break  = 210
2 breaks = 190
3 breaks = 165
```

Design intent:
- 0 Break: keep the full Relic build, face a Boss clearly harder than WRATH
- 1 Break: meaningful relief, still above WRATH
- 2 Break: after sacrificing a mid-Run build opportunity, Boss becomes below WRATH
- 3 Break: sacrifice both selected mid-Run Relic opportunities plus D30 Relic opportunity for very high Final stability

Gold saved by not buying a Relic is only a partial offset.
It does not erase the opportunity cost of a Relic's remaining-Run economy/access/growth/build synergy.

Simulation target for sacrificed potential value:

```text
D30 Relic opportunity        ≈ Party-equivalent 3~6
D15~D25 Relic opportunity    ≈ Party-equivalent 6~10 each
3-break total potential cost ≈ 15~26
```

These are measurement targets, not hidden runtime conversion formulas.
Do not literally subtract Party Power from the Player when a Seal is broken.

Acceptance direction:
- 3 Break must create a materially larger Final-stability return than 2 Break
- 3 Break is allowed to make a sufficiently mature/well-prepared party near-certain
- weak Run + 3 Break is not guaranteed clear by rule

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

### Terminology

Player-facing SLOTH text uses:
    점포지원

Do not use 유물 for the active Store Support system.
Internal source identifiers may remain relic where renaming code would add unnecessary migration risk.

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

GLUTTONY's Item-stat reduction occurs after Item-side positive Stat amplification and before Individual Final Power is computed.

Final formula / roll / party / clear ownership -> `FINAL_EXPEDITION_v2.8.0.md`.

Boss Clear does not add a second post-clear survival/death gate.

---

## META CLEAR SIGNAL

On successful Boss clear, emit one stable result containing:
- bossId
- participating distinct Job IDs
- clear=YES

Boss CLEAR continues to feed:
- Job x Boss matrix / Job Mastery
- distinct-Boss unlock progression

Cross-run Job Mastery / distinct-Boss unlock processing is owned by `META_v2.8.0.md`.
BOSS does not duplicate Meta progression state.

---

## QA / ACCEPTANCE

### BOSS-Q01 — ONE BOSS PER RUN
Across seeds, exactly one of 7 Boss IDs is generated and remains fixed.

### BOSS-Q02 — SAVE/LOAD STABILITY
Reload cannot change Boss ID, revealed Trait, Sloth opportunity Days, committed Seal Break count, or Final-locked Boss state.

### BOSS-Q03 — REVEAL ORDER
D5 Identity precedes D5 Relic reveal; D15 exact Trait precedes D15 Relic reveal.

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

### BOSS-Q15 — VISUAL STATE
D5/D15 use BASE.
Final uses D30 BATTLE for six ordinary Bosses.
SLOTH uses BASE for SB0 and matching D30 SB1/SB2/SB3 for 1/2/3 breaks.
No separate SLOTH D30 SB0 asset is required.

### BOSS-Q70 — FINAL INFO TIMING
PASS:
- D5 Boss Identity reveal remains
- D15 exact Trait reveal remains
- exact Final Family/Hazard state is revealed on D25
- D30 does not regenerate or newly reveal a different Family/Hazard state
- D30 Relic/SLOTH choice reads the already-known persisted state

### BOSS-Q71 — PRIDE NUMERIC
PASS:
- Final-only 투력 factor is exactly 0.92
- other three Core Stats remain unchanged by PRIDE
- preview and Final resolution use the same applied value

### BOSS-Q72 — GREED CAP / SNAPSHOT / FINAL TRANSFER ACCOUNTING
PASS:
- existing revenue metric/target path is reused
- applied shortfall strengthening caps at +12 Boss Power
- target met returns to 200 baseline
- maximum shortfall cannot exceed 212 through GREED alone
- every committed Final transfer contributes its exact fixed 50% / 매입가 amount to Gross Sales exactly once
- committed Gross Sales snapshot occurs at Final Lock after Final preparation completes
- no committed Final transfer is excluded or double-counted

### BOSS-Q73 — GLUTTONY SCOPE
PASS:
- every positive Core-Stat contribution originating from Items is multiplied by 0.50
- no Rarity threshold remains
- NPC natural/base/growth/equipment Stats are unchanged
- Hazard Counter / Supply / Insurance / Utility / harmful RiskReward penalty are unchanged
- previewed changed Item Stat matches actual Final resolution

### BOSS-Q74 — SLOTH POWER BY BREAK COUNT
PASS exact:
```text
0 = 225
1 = 210
2 = 190
3 = 165
```

Also PASS:
- exactly 3 opportunity windows remain
- each window is Relic OR Seal, never both
- 3 Break produces a materially larger stability return than 2 Break in balance measurement

## BALANCE QA

Measure separately:
- Mastery-0 early/first-clear attempts
- partially progressed Meta runs
- mature runs
- Boss clear rate by Boss
- Final Party Raw Power distribution
- SLOTH break count 0/1/2/3
- Relic IDs/pieces sacrificed by SLOTH
- Gold saved/spent after Seal choices
- Final Item quality

Do not auto-tune Boss values during frozen QA.
Report `BALANCE FINDING` and run a separate approved tuning cycle.

## RELATED

Final state / formula / family / party / clear / Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Relic / Seal window / Sloth opportunity -> `RELIC_v2.8.0.md`
Meta / mastery / unlock -> `META_v2.8.0.md`
Job / loyalty / trusted-regular -> `NPC_TRAIT_v2.8.0.md`
Item effect / GLUTTONY contribution -> `ITEM_v2.8.0.md`
Economy / Wallet / Gold / revenue -> `ECONOMY_ORDER_v2.8.0.md`
Sale revenue commit -> `SALE_v2.8.0.md`
Closing revenue report -> `NIGHT_CLOSING_v2.8.0.md`
Presentation / UI reveal -> `UI_UX_v2.8.0.md`
Copy / terminology -> `COPY_WORLD_VOICE_v2.8.0.md`
Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md
