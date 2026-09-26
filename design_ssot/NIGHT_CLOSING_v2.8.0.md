# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,closing,causality,fatigue_result,npc_reaction
DOC_VERSION=2.9.7
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.7
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/NIGHT_CLOSING_v2.8.0-patch.md,history/NIGHT_CLOSING_v2.7.0.md,history/NIGHT_CLOSING_v2.6.1.md,history/NIGHT_CLOSING_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/NIGHT_CLOSING.md

## KEY

nightFlow=oneAdventurerAtATime
resolveCanBePrecomputed=YES
controls=[NEXT,SKIP_ALL]

resultStructure=[
WHAT_HAPPENED,
WHY,
WHAT_CHANGED
]

closingFocus=economics
debugLanguage=NO
causalityMustMatchActualResolution=YES

## ROLE

NIGHT =
`내 선택이 어떻게 됐을까?`

CLOSING =
`오늘 장사는 어땠을까?`

둘의 역할을 분리한다.

NIGHT:
NPC 원정 이야기 / 생존 / 성장 / 부상 / 사망

CLOSING:
오늘 시작 Gold / 들어오고 나간 돈 / 오늘 끝 Gold · 창고 재고 · 폐기 개수 (v2.9.7 CASH FLOW RECEIPT)

## NIGHT FLOW

원정 결과는 NPC 1명씩 짧게 보여준다.

Flow:
resolve/precompute
→ adventurer result card
→ NEXT
→ next adventurer

Result presentation이 진행을 오래 막지 않는다.

Presentation density follows importance:
- routine/uneventful success may resolve very compactly
- meaningful level-up / injury / severe injury / death / decisive Item effect / important callback receives stronger emphasis
- do not force every ordinary result to consume equal screen time

Zero-result Night:
softlock=NO
즉시 Closing으로 진행 가능해야 한다.

게이트 순례주간:
- Night header/summary may show `실제 변경 N명`
- affected NPC result shows `예상 목적지 -> 실제 목적지`
- the route-change line (User 2026-09-25, v2.9.0; exact -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-10): `순례 행렬을 따라 {name}{은/는} 예상 목적지 {A} 대신 {B}{으로/로} 향했다.` for a pilgrimage reroute, `거짓말쟁이 {name}{은/는} 말했던 {A} 대신 {B}{으로/로} 향했다.` for the Trait; the retired name 허세 never appears and the particles follow the final consonant
- no separate Event result screen is added

## NIGHT CONTROLS — EXACT

Exactly:
```text
다음
전체 건너뛰기
```

Removed:
- single-result `건너뛰기`
- active `nightSkip` presentation/API path

Skip-all affects presentation only and never changes already-resolved results.

## SKIP CONTRACT

Skip affects presentation only.

Skip All must not change:
- already resolved outcome
- EXP
- Loot
- Injury
- Death
- Item effect
- Wallet/Gold
- RNG result

Skipping must not become a reroll or different-resolution path.

## SAVE / RESUME

If save is allowed during/around Night:
already resolved results must remain stable.

Resume must not:
- recalculate a different outcome
- duplicate rewards
- duplicate injury/death
- duplicate Closing revenue

Canonical save:
-> CORE_RUN_v2.8.0.md

## RESULT STRUCTURE

각 Result는 기본적으로:

1. WHAT_HAPPENED
2. WHY
3. WHAT_CHANGED

순서로 읽힌다.

### WHAT_HAPPENED
Fantasy world에서 실제로 일어난 사건.

Example meaning:
- 원정을 무사히 마침
- 예상보다 좋은 성과
- 퇴각
- 부상
- 중상
- 사망

### WHY
실제로 Outcome에 의미 있게 작용한 원인만 보여준다.

가능:
- 전투에서 밀림
- 독 대응 성공
- 거미줄 대응 부족
- 귀환석으로 탈출
- Trait가 실제 효과 발휘
- 준비한 Item이 실제 Hazard를 줄임

### WHAT_CHANGED
실제 상태 변화.

Possible:
- EXP
- Level
- Stat growth
- Loot
- Injury
- Severe Injury / rest
- Fatigue/Condition
- Death
- Wallet/Loyalty/Revisit-related change if player-relevant
- canonical Event-caused destination delta when it materially changed the expedition

## RESULT INFORMATION HIERARCHY

NIGHT reads in this order:

    Outcome
    -> proven effect of what the Player sold
    -> Level / Stat change
    -> Fatigue result
    -> EXP / NPC Wallet / other change

An Item being present in the Bag is not enough to receive Hero feedback.

## RESULT OUTCOMES

Supported narrative outcomes may include:

- Great Success / 대성공
- Success / 성공
- Retreat / 퇴각
- Injury / 부상
- Severe Injury / 중상
- Death / 사망

Exact thresholds/formulas:
HIDDEN / resolution system owned elsewhere.

Outcome label and narrative must describe the same actual state.

## OUTCOME SENTENCE VS PLAYER CAUSE — EXACT

The Outcome sentence states what happened.
The Hero Item line states why the Player's sold Item mattered.

Do not make the Outcome sentence consume the Item-causality role.

For an avoided-death return:

Outcome sentence:
    사망 위기를 넘기고 살아 돌아왔다.

Then, only when proven:
    {Item} 덕분에 살아 돌아왔다.

Do not use the generic Outcome sentence:
    보급이 마지막 순간의 사망을 막았다.

when a separate proven Item line follows.

## HERO ITEM FEEDBACK

Use strong Item feedback only when DUNGEON_HAZARD_v2.8.0.md proves a resolved Outcome/state
difference.

Preferred short grammar:

    {Item} 덕분에 살아 돌아왔다.
    {Item} 덕분에 중상을 피했다.
    {Item} 덕분에 부상을 피했다.
    {Item} 덕분에 원정을 성공했다.
    {Item} 덕분에 대성공했다.

Two necessary Items:
    {Item A}·{Item B} 덕분에 부상을 피했다.

Only the combination is provable:
    챙긴 보급 덕분에 부상을 피했다.

Do not use vague Hero claims such as:
- 부식 위험 감소
- 환경을 철저한 준비로 극복했다

A hidden risk decrease without a proven resolved difference is not Hero feedback.

Display order (User 2026-09-25, v2.9.2 H1): when the Hero Item line is present it is the after-motion
of the NIGHT verdict stamp - it settles once after the stamp lands and the figures do not count up; the
cause outranks the money. Wording and proof are unchanged. Timing -> UI_UX_v2.8.0.md §NIGHT LAYOUT —
VERDICT STAMP.

## ITEM / TRAIT IMPACT

Do not dump every modifier used in calculation.

Show only effects that were meaningfully relevant to the actual result.

Good:
- 핫팩 → 냉기 대응
- 대식가 → Food core effect 강화

Avoid:
- long modifier ledger
- invisible coefficient list
- effects unrelated to the actual expedition outcome

Impact summary is explanatory, not a combat log.

## CAUSALITY RULE

Player-facing explanation must be honest.

If Hazard was successfully blocked:
do not name that Hazard as the cause of an unrelated injury.

If injury came from:
- combat
- another Hazard
- generic expedition accident

say that.

If exact cause cannot be cleanly attributed:
use a truthful broad narrative.

Example:
`원정 중 예상치 못한 사고로 부상을 입었습니다.`

Do not manufacture false precision.

### RUNTIME CAUSALITY

A Player-facing Item/Trait/Event cause may appear only when the resolved report contains proof that the effect actually:
- prevented
- reduced
- converted
- or otherwise changed the relevant resolved risk/outcome

Forbidden evidence:
- Item merely existed in Bag
- compatibility alone
- generic Event flavor text alone

If exact cause is not provable, use truthful broad narration instead of invented precision.

Player-facing cause text requires runtime proof that an Item/Trait/Event actually changed the resolved risk/outcome/state.

Provable contribution types also include:
- Food/Drink Fatigue recovery before departure (`preRecovery`)
- Food/Drink outcome Fatigue buffer (`outcomeBufferUsed`)
- First Aid Kit Aftercare
- persistent Injury retained/cleared state

Do not add system-authored failure diagnosis such as `전투 부족`, `독 대응 부족`, or `부상 때문에 사망` when exact causality is not proven.

## INSURANCE CAUSALITY

Insurance wording must match actual causal effect.

Display order (User 2026-09-25, v2.9.2 H1): on a result carrying `rescued` / `avoidedDeath` the verdict
first prints the Outcome the Insurance turned away (`사망` when `avoidedDeath`, otherwise `중상`) and the
resolved label `생환` overstamps it; the proof lines that name the Insurance appear on that overstamp.
Only a turned-away Death reverses (User 2026-09-25): those two result flags, and a Death 만반의 준비 turned into 부상 / 중상
(its `prepared` event); 강골 / 구급키트 never do. The wording, the proof and the resolved Outcome are unchanged.
Timing -> UI_UX_v2.8.0.md §NIGHT LAYOUT — VERDICT STAMP.

### RETURN STONE
When it actually changes escape/retreat outcome:
show it as meaningful escape support.

Do not claim:
`귀환석이 죽음을 막았다`
unless the actual resolution supports that causal claim.

### WORLD TREE INSURANCE
When Death is actually converted to Severe Injury:
strong causal wording is allowed.

Example meaning:
`세계수의 생환 효과가 치명적인 결과를 중상으로 바꿨다.`

No false hero attribution.

### FIRST AID KIT AFTERCARE — RESULT TRUTH

`구급키트` lowers the expedition Outcome one step (User 2026-09-25, v2.9.0): a would-be `중상` resolves as `부상` (injury=1, recovery=0, the 부상 XP/Loot/Fatigue), a would-be `부상` resolves as `부상` with no lasting injury. The NIGHT verdict reads the lowered Outcome; the report exposes the proven contribution.

Examples of valid proof:
- would-be `부상` -> `부상`, persistent injury 0 (`구급키트가 남을 부상을 없앴다.`)
- would-be `중상` -> `부상`, injury=1 / recovery=0 (`구급키트가 중상을 부상으로 낮췄다.`)

Do not display:
- `구급키트가 퇴각시켰다`
- `구급키트가 원정을 성공시켰다`
- generic contribution merely because the Item was carried

Insurance resolution order/effect -> `ITEM_v2.8.0.md`.

## RETREAT

Retreat is not normal success.

Direction:
- EXP reduced but >0
- Loot very low / nearly none
- NPC survives

Retreat can still be followed by legitimate injury
if actual resolution says so.

If both occur:
narrative must explain the sequence coherently.

Example meaning:
`도망치는 데는 성공했지만 탈출 과정에서 부상을 입었다.`

Canonical Insurance:
-> ITEM_v2.8.0.md

## INJURY / SEVERE INJURY

Injury must produce a real persistent consequence
through the NPC condition system.

Severe Injury:
- stronger consequence than normal Injury
- may require multi-day rest according to canonical condition data

Recovery/availability must be consistent across:
- Night result
- next-day NPC state
- Notebook
- visitor eligibility

Canonical NPC state:
-> NPC_TRAIT_v2.8.0.md

### INJURY RESULT

Show actual current injury consequence only.

`injury=2`:
- no Stat penalty
- show remaining recovery duration
- recovery completion goes directly to healthy (`2 -> 0`)

### ORDINARY INJURY RESULT CONTINUITY

Natural ordinary-Injury recovery is owned by `NPC_TRAIT_v2.8.0.md`.
Night/result truth must preserve it exactly.

If the NPC began the expedition at `injury=1`:

```text
actual Outcome 성공 / 대성공
-> persistent ordinary Injury clears naturally

actual Outcome 퇴각
-> persistent ordinary Injury remains

actual Outcome 부상
-> persistent ordinary Injury remains
```

Do not display Retreat as natural Injury recovery.
Do not clear ordinary Injury merely because the result was not a fresh `부상` token.

If an already-injured NPC resolves to Severe Injury or Death, report the actual final outcome/state only.
The exact pre-supply 실패 시 사망 위험 may already have been shown during SALE, but Night must not invent or expose a separate post-supply/final probability after resolution.

Player-facing result may truthfully state that the NPC departed already injured when that state materially affected the expedition, but must not fabricate an exact cause such as `부상 때문에 죽었다` unless the runtime proves that counterfactual claim.

## DEATH

Death is permanent within the Run.

Result must make permanence clear
without debug/system wording.

Dead NPC:
- no future visits
- does not consume Living NPC Cap
- retained only where needed for history/notebook/result record

Canonical:
-> CORE_RUN_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md

## FATIGUE RESULT

(User 2026-09-24, v2.9.0)

Main NIGHT surface shows one settled value:

    귀환 후 피로 11

From Fatigue 20 up the main line also names the band (`정상` / `지침` are not named):

    귀환 후 피로 22 · 과로

Under the settled value, one next-decision line `피로 {N} · {band} — 다음 원정 {effect}` whenever a
Fatigue band penalty applies (10 and up; nothing at 정상):

    피로 12 · 지침 — 다음 원정 기동·정신 -15%
    피로 22 · 과로 — 다음 원정 기동·정신 -40%

Band names / thresholds / effects (Fatigue 0~40, five bands) -> `DUNGEON_HAZARD_v2.8.0.md`.

On demand, the same result may expand to:

    출발 8
    원정에서 +5
    음식·음료로 -2
    -> 귀환 후 11

Remove player-facing labels:
- 밤 피로
- 보급 회복
- 보급 완화
- 원정 결과 +N when N is actually Fatigue gain
- 최종 피로 as a competing second name

Exact arithmetic/fields remain unchanged internally.

Show the actual resolved path, not every hypothetical branch.

Rules:
- omit zero-value subrows when that improves readability
- actual Outcome Fatigue gain must not be confused with net Fatigue delta
- Severe Injury / Death actual result Fatigue gain is 0 under the `DUNGEON_HAZARD_v2.8.0.md` owner rule

### RESULT FATIGUE FIELDS

Resolved report/runtime must distinguish at least:

```text
beforeFatigue
preparedSupply
preRecovery
fatigueBeforeExpedition
remainingSupplyBuffer
rawOutcomeFatigueGain
outcomeBufferUsed
actualOutcomeFatigueGain
finalFatigue
netFatigueDelta
```

Definitions:
- `preRecovery` = current Fatigue removed before expedition by the prepared Food/Drink Supply (1:1)
- `fatigueBeforeExpedition` = Fatigue after `preRecovery`
- `remainingSupplyBuffer` = Supply left after preRecovery
- `rawOutcomeFatigueGain` = actual Outcome baseline plus eligible Trait modifier before Supply buffer
- `outcomeBufferUsed` = amount of remaining Supply actually consumed to reduce that raw gain
- `actualOutcomeFatigueGain` = final gain after the buffer

Exact arithmetic -> `DUNGEON_HAZARD_v2.8.0.md`.

Do not reuse `fatigueRecovery` as an ambiguous combined field for both pre-expedition recovery and post-outcome buffering.
Legacy compatibility aliases may exist internally during implementation only if Player-facing/report truth remains unambiguous.

## GREAT SUCCESS / DEEP EXPEDITION RESULT

### GREAT SUCCESS

Night explicitly distinguishes ordinary Success from `대성공`.

For Great Success show:
- outcome=`대성공`
- honest causal explanation using existing rules
- actual NPC changes
- for normal expedition only, Store Great Success Gold bonus when earned

Do not expose exact Success %, Great Success %, hidden margin or formula.

### NORMAL GREAT SUCCESS GOLD

Normal Great Success:
- additional Store Gold
- same rounded amount in result/history/Closing
- same-day sale not required

Ordinary Success:
- no extra Store Gold

### DEEP EXPEDITION RESULT

Use existing outcome vocabulary once.

Deep Success / Great Success shows:
- Deep Expedition identity
- NPC bonus EXP/Growth
- NPC Wallet reward
- any actual ordinary injury/death consequence

Deep Expedition Store Gold reward=0.
This includes Deep Great Success.
Normal Great Success Store Gold bonus is suppressed.

Closing shows sponsorship outflow clearly.
Do not show a matching Deep cash payout.

Economic read:
`sponsorship / extra preparation outflow -> NPC future value`

## GROWTH PRESENTATION

Growth must show real change.

Prefer:
- Lv.4 → Lv.5
- 투력 21 → 23
- 강인함 17 → 18
- EXP +N

Avoid:
`장비 보강`
처럼 실제 변화가 보이지 않는 추상 문구만 사용.

Only show stats that actually changed and matter.

## LOOT

Loot/result reward should be readable as actual gained value.

Retreat:
loot≈very low

Success/Great Success:
reward follows canonical expedition balance.

Do not imply loot that was not actually granted.

### NPC WALLET RESULT TERMINOLOGY

Use:
`원정 소지금 획득`

Do not use `전리품` where it can be read as Store/Player Gold.

## RECENT EXPEDITION SNAPSHOT WRITE

After an expedition result is fully resolved, write the latest snapshot owned by `NPC_TRAIT_v2.8.0.md` using:
- completed Day
- actual destination
- final Outcome
- exact Item IDs actually accepted/purchased in the completed Bag
- only contribution/cause tokens already proven by the resolved report

Do not write a claimed/expected destination in place of actual destination.
Do not invent a cause during snapshot serialization.

## LIVING NPC REACTION

For every living NIGHT result:
- use the existing temporary SALE-style speech-bubble behavior
- around 3 seconds
- tap may dismiss early
- bubble may overlap character art
- bubble must not cover Outcome or primary result information
- permanent result information remains after the bubble disappears

Death:
- no speech bubble
- narration/report treatment only

Dialogue pool size and recent-repeat handling follow COPY_WORLD_VOICE_v2.8.0.md.

## RESULT PRESENTATION ROUTING

NIGHT_CLOSING owns the resolved result category and causal truth.
UI_UX_v2.8.0.md owns the visual/audio presentation of that already-resolved state.

Presentation may distinguish:
- ordinary return / success
- Great Success
- retreat
- injury
- severe injury
- Death
- proven rescue / avoided-death accents

It must not create a new outcome category, change rewards, reorder proof, or imply an Item cause that
the existing result proof does not establish.

Death remains narration/report treatment rather than living NPC speech.

Narration treatment is about VOICE, not about position: the Death
line occupies the same place and the same visual weight as a living adventurer's line and reads
as a neutral status message there - never as an utterance, and never relegated to a separate
narration line beneath the report body. Exact placement/styling -> UI_UX_v2.8.0.md §NIGHT LAYOUT.

The proven rescue reads exactly:

    생환

with the existing approved Outcome summary `사망 위기를 넘기고 살아 돌아왔다.` beneath it.
The fight verdict sentence is not shown on the
player-facing NIGHT record; see UI_UX_v2.8.0.md §NIGHT LAYOUT. The resolved combat state itself
is unchanged.

The Death record carries no follow-up
growth or settlement figures. Its player-facing payload is the death status message, the
character, `사망`, the NPC name, the Dungeon · Lv and the Outcome summary - nothing else.
Level / Stat / equipment / injury / rest / Fatigue / EXP / Wallet / reward rows are not rendered
for a Death, and the region leaves no divider or reserved space behind. The resolution still
records whatever it recorded; this is a render rule. Exact treatment -> UI_UX_v2.8.0.md
§NIGHT LAYOUT — DEATH PAYLOAD.

Every Outcome label is one size; Outcomes differ by
copy and tone only. The three-volume rank remains a presentation weight rule, but it does not
change the Outcome, NPC name or summary type size. Exact size -> UI_UX_v2.8.0.md §NIGHT LAYOUT
— OUTCOME TYPE, EXACT.

## RARE ACCIDENT COPY

Rare incident narration is allowed when it matches resolution.

Examples of flavor:
- 장비가 순간적으로 벗겨짐
- 장비 일부가 손상됨
- 틈으로 위험에 노출됨
- 예상보다 강한 환경에 노출됨

Use sparingly.

T1/T2 proper preparation should not repeatedly produce
copy that makes Counter preparation feel useless.

Canonical hazard reliability:
-> DUNGEON_HAZARD_v2.8.0.md

## DEBUG LANGUAGE

Player-facing main copy must not use engine/process language.

Forbidden style:
- 판정 진행
- 보정 적용
- 상태 판정
- 위험도 계산
- 영구 사망 처리
- RNG
- Threshold
- coefficient
- resolve

Write what happened in the world,
not what the code executed.

## COPY TONE

Tone:
- 담담함
- 명확함
- 가끔 웃김

Avoid:
- AI 분석문
- 지나친 감탄사
- 모든 NPC가 같은 말투
- 시스템을 광고하는 문장
- 장황한 설명

State/context may influence dialogue:
- first visit
- returning
- high Loyalty
- injury comeback
- previous failure
- previous Item actually helped
- price experience
- same Dungeon retry

General lines should remain the majority.
Callbacks/jokes are occasional.

## PRESENTATION DATA BOUNDARY

Presentation must not read an app-local global `game` implicitly.
Night result presentation consumes:
1. the resolved result/report snapshot first
2. explicit parameters/snapshot supplied by the caller only if required

Adding a global `game` escape hatch is forbidden.

## CLOSING

Closing is economics-first.

### CLOSING — CASH FLOW RECEIPT — EXACT (User 2026-09-26, v2.9.7)

The receipt is the Day's cash, not an income statement: a player judges the Day by what the store started with and
what it ends with, and by what moved in between - not by cost of goods sold, margin or an accounting profit (the old
`영업 손익` row read as Gold leaving the store when it counted stock already paid for).

1. `오늘 시작 {N}G` - the Day's opening Gold: the end Gold less today's inflows plus today's outflows (exact; not stored)
2. the Gold that moved today, inflows then outflows; 매출 / 발주 / 운영비 always print, every other row only when it moved:
   in - 매출, 본사 지원·수당, 대성공 본사 보상, 알뜰 금고, 재고 정리; out - 발주, 발주 교환, 점포지원 투자, 원정 후원, 운영비
3. `오늘 끝 {N}G` - the stamped row (UI_UX §CLOSING — RECEIPT STAMP) - and right under it `오늘 변화 ±{N}`, red on a down Day
4. `창고 재고 {n}개`, and `오늘 폐기 {n}개` when any - counts only, never Gold: an expired Item was paid for when it was ordered
5. `내일 운영비 예상 {N}G` - tomorrow's base operating cost with today's Store Support and roster, no Event; not on DAY 29
   (the Final Day has no operating cost)

No 판매 원가 / 판매 마진 / 폐기 원가 / 영업 손익 row. Exact calculation of each flow -> ECONOMY_ORDER_v2.8.0.md.

Closing should answer:
`오늘 돈이 얼마 남았고, 내일 괜찮은가?`

Remove explanatory footer prose that teaches internal accounting when the receipt itself already
shows the actual figures.

In particular the current:
    미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

does not belong on the primary Closing receipt.

Closing remains economics-only.

### CLOSING ECONOMICS-ONLY — EXACT

The primary Closing receipt does not repeat NIGHT expedition-impact content.

Remove the current block headed:

    오늘의 보급 영향

Closing keeps only the cash-flow receipt above (v2.9.7): 오늘 시작, the in / out rows, 오늘 끝 with its change, 창고 재고 ·
오늘 폐기 counts and 내일 운영비 예상.

The NIGHT result is the owner surface for expedition causality and adventurer-state change.

## NIGHT vs CLOSING

Do not duplicate the same information in both.

NIGHT owns:
- individual NPC story
- outcome
- cause
- growth/injury/death

CLOSING owns:
- store economics
- aggregate business result

## D30 / FINAL

Normal Night expedition resolution does not own D30 Final resolution.
Boss identity/trait/Sloth state is owned by `BOSS_v2.8.0.md`; Closing does not mutate it.

Final Family / party / Power / Boss clear / post-clear contract:
-> FINAL_EXPEDITION_v2.8.0.md

NIGHT_CLOSING must not add a second ordinary expedition resolve after a successful Final clear.
Final presentation should still preserve honest causality and culmination without becoming a debug log.

## ACCEPTANCE

### RUNTIME ACCEPTANCE

Real browser path must complete with Console runtime error = 0:
```text
ORDER
-> SALE all customers
-> NIGHT
-> injury result and non-injury result
-> 다음 / 전체 건너뛰기
-> CLOSING
-> next Day
```

### RESULT ACCEPTANCE

Embedded result acceptance:
- `대성공` cannot coexist with Injury/Severe Injury/Retreat/Death
- normal Great Success Store bonus is applied exactly once
- Deep Great Success Store bonus remains 0
- Deep bonus EXP/Wallet is reported as NPC change, not Store income

### QA OWNERS

Acceptance criteria:
- CORE_RUN_QA_v2.8.0.md
- DUNGEON_ITEM_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md

## RELATED

game philosophy -> `00_GAME_CORE_v2.8.0.md`
run/save -> `CORE_RUN_v2.8.0.md`
final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
npc condition/growth, Injury natural recovery/re-expedition state, recent snapshot -> `NPC_TRAIT_v2.8.0.md`
hazard causality, Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
item/insurance/Aftercare -> `ITEM_v2.8.0.md`
economy/settlement -> `ECONOMY_ORDER_v2.8.0.md`
sale commitments, Sale revisit display -> `SALE_v2.8.0.md`
presentation / UI -> `UI_UX_v2.8.0.md`
