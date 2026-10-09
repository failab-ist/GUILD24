# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,closing,causality,fatigue_result,npc_reaction
DOC_VERSION=2.11.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.11.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

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

NIGHT = `내 선택이 어떻게 됐을까?` — NPC 원정 이야기 / 생존 / 성장 / 부상 / 사망

CLOSING = `오늘 장사는 어땠을까?` — 영업 시작 골드 / 들어오고 나간 돈 / 보유 골드 · 영업 손익 / 창고 재고 / 오늘 폐기 (→ §CLOSING)

둘의 역할을 분리한다.

## NIGHT FLOW

A Day with no visitors skips the empty Night report after Order and settles directly into Closing.
Rest, expiry and operating costs still settle exactly once. The receipt states the no-trading reason;
when every living adventurer is recovering from Severe Injury: `모두 중상이라 방문할 손님이 없어서 영업을 못했다.`

원정 결과는 NPC 1명씩 짧게 보여준다:
resolve/precompute → adventurer result card → NEXT → next adventurer.

Result presentation이 진행을 오래 막지 않는다. Presentation density follows importance:
- routine/uneventful success may resolve very compactly
- meaningful level-up / injury / severe injury / death / decisive Item effect / important callback receives stronger emphasis
- do not force every ordinary result to consume equal screen time

Zero-result Night: softlock=NO; 즉시 Closing으로 진행 가능해야 한다.

게이트 순례 주간:
- Night header/summary may show `실제 변경 N명`
- affected NPC result shows `예상 목적지 -> 실제 목적지`
- the route-change line (pilgrimage reroute / 거짓말쟁이 Trait) is exact in `COPY_AUDIT_APPROVED_v2.8.0.md` §14-10; the name 허세 never appears and the particles follow the final consonant
- no separate Event result screen is added

## NIGHT CONTROLS — EXACT

Exactly:
```text
다음
전체 건너뛰기
```

No single-result `건너뛰기` and no active `nightSkip` presentation/API path.

## SKIP CONTRACT

Skip (전체 건너뛰기) affects presentation only. It must not change the already resolved outcome, EXP, Loot, Injury,
Death, Item effect, Wallet/Gold or RNG result, and must not become a reroll or different-resolution path.

## SAVE / RESUME

If save is allowed during/around Night, already resolved results remain stable. Resume must not recalculate a
different outcome or duplicate rewards, injury/death or Closing revenue.

Canonical save -> CORE_RUN_v2.8.0.md

## RESULT STRUCTURE

각 Result는 기본적으로 1. WHAT_HAPPENED 2. WHY 3. WHAT_CHANGED 순서로 읽힌다.

### WHAT_HAPPENED
Fantasy world에서 실제로 일어난 사건. Example meaning: 원정을 무사히 마침 / 예상보다 좋은 성과 / 퇴각 / 부상 / 중상 / 사망.

### WHY
실제로 Outcome에 의미 있게 작용한 원인만 보여준다.
가능: 전투에서 밀림 / 독 대응 성공 / 거미줄 대응 부족 / 귀환석으로 탈출 / Trait가 실제 효과 발휘 / 준비한 Item이 실제 Hazard를 줄임.

### WHAT_CHANGED
실제 상태 변화. Possible: EXP, Level, Stat growth, Loot, Injury, Severe Injury / rest, Fatigue/Condition, Death,
Wallet/Loyalty/Revisit-related change if player-relevant, canonical Event-caused destination delta when it materially
changed the expedition.

## RESULT INFORMATION HIERARCHY

NIGHT reads in this order:

    Outcome
    -> proven effect of what the Player sold
    -> Level / Stat change
    -> Fatigue result
    -> EXP / NPC Wallet / other change

An Item being present in the Bag is not enough to receive Hero feedback.

## RESULT OUTCOMES

Supported narrative outcomes: Great Success / 대성공, Success / 성공, Retreat / 퇴각, Injury / 부상,
Severe Injury / 중상, Death / 사망.

Exact thresholds/formulas: HIDDEN / resolution system owned elsewhere.
Outcome label and narrative must describe the same actual state.

## OUTCOME SENTENCE VS PLAYER CAUSE — EXACT

The Outcome sentence states what happened; the Hero Item line states why the Player's sold Item mattered.
The Outcome sentence does not consume the Item-causality role.

For an avoided-death return:

Outcome sentence:
    사망 위기를 넘기고 살아 돌아왔다.

Then, only when proven:
    {Item} 덕분에 살아 돌아왔다.

Do not use the generic Outcome sentence:
    보급이 마지막 순간의 사망을 막았다.

when a separate proven Item line follows.

## HERO ITEM FEEDBACK

Use strong Item feedback only when DUNGEON_HAZARD_v2.8.0.md proves a resolved Outcome/state difference.

Preferred short grammar:

    {Item} 덕분에 살아 돌아왔다.
    {Item} 덕분에 중상을 피했다.
    {Item} 덕분에 부상을 피했다.
    {Item} 덕분에 원정을 성공했다.
    {Item} 덕분에 대성공했다.

Two necessary Items:
    {Item A}·{Item B} 덕분에 부상을 피했다.

Each of the two Items would have been enough alone (no single removal changes the result, removing both does - the Bag is
two slots, so this is what a whole-Bag proof means; User 2026-10-02): both are named, never `챙긴 보급`:
    {Item A}·{Item B} 덕분에 부상을 피했다.
    {Item} 2개 덕분에 부상을 피했다.        (the same Item twice)

The fight alone (User 2026-10-04; DUNGEON_HAZARD_v2.8.0.md §COMBAT PROOF): when no worse Outcome is proven but removing an Item would have
lost the combat check, and only then:
    {Item} 덕분에 전투에서 이겼다.

Do not use vague Hero claims such as `부식 위험 감소` / `환경을 철저한 준비로 극복했다`.
A hidden risk decrease without a proven resolved difference is not Hero feedback.

Display order: when present, the Hero Item line is the after-motion of the NIGHT verdict stamp - it settles once after
the stamp lands and the figures do not count up; the cause outranks the money. Timing -> UI_UX_v2.8.0.md §NIGHT LAYOUT —
VERDICT STAMP.

## DISCOVERY LINE

A rule is named once per account, on the NIGHT record of the first expedition it acted on - taught after it happened,
not before. It is shown like the tutorial: a `점주 안내` coach mark over that record, one per rule, after the NIGHT result
mark, persisted and skipped with the other coach marks; the record itself gains no line. One mark a night (User 2026-10-04): the first that applies in the order death, Severe, Injury, Hazard counter, 만반의 준비, Fatigue, 대성공, Wallet gain (a 성공 / 대성공 record only)
(User 2026-10-10: survival, then what the sold Item did, then what changes the next decision, then the rewards); a rule that waits is told the next night it acts (the 발견 수첩 entry is kept either way). `손님 소지금 획득`: the first Wallet gain row from DAY 2 on, a mark on that row (COPY_AUDIT §26-2). The mark lights what its rule is
about (User 2026-10-02): the Fatigue rule the record's `귀환 후 피로` row, every other rule the record's Outcome block. Each rule is also kept in the
발견 수첩 the first time. Triggers (proof, not presence): came back with an Injury (the first 부상 record, never a healthy return); came back with a
Severe Injury (the first 중상 record - its own rule, User 2026-10-02: it rests unseen, then returns healthy); departed at Fatigue 10 or more;
a Hazard Item lowered a Hazard (the `hazard` resolution event) and the result proof credits that Item, so the record names it
(User 2026-10-10: a pressure merely lowered leaves the record silent about the Item, often under a Potion's line); 만반의 준비 turned away a Death; a 대성공 that paid
the store bonus. On a Death record only the Death-limit rule - the one exception to its closed payload (§RESULT
PRESENTATION ROUTING). Exact copy -> COPY_AUDIT §26-2.

## ITEM / TRAIT IMPACT

Show only effects that were meaningfully relevant to the actual result; do not dump every modifier used in calculation.

Good: 방한 두건 → 냉기 대응 · 대식가 → Food core effect 강화
Avoid: long modifier ledger, invisible coefficient list, effects unrelated to the actual expedition outcome.

Impact summary is explanatory, not a combat log.

## CAUSALITY RULE

Player-facing explanation must be honest.

If a Hazard was successfully blocked, do not name it as the cause of an unrelated injury. If injury came from combat,
another Hazard or a generic expedition accident, say that. If the exact cause cannot be cleanly attributed, use a
truthful broad narrative, e.g. `원정 중 예상치 못한 사고로 부상을 입었습니다.` Do not manufacture false precision.

### RUNTIME CAUSALITY

A Player-facing Item/Trait/Event cause requires runtime proof in the resolved report that the effect actually
prevented, reduced, converted or otherwise changed the relevant resolved risk/outcome/state.

Forbidden evidence: Item merely existed in Bag · compatibility alone · generic Event flavor text alone.

Provable contribution types also include:
- Food/Drink Fatigue recovery before departure (`preRecovery`)
- Food/Drink outcome Fatigue buffer (`outcomeBufferUsed`)
- First Aid Kit Aftercare
- persistent Injury retained/cleared state

Do not add system-authored failure diagnosis such as `전투 부족`, `독 대응 부족`, or `부상 때문에 사망` when exact causality is not proven.

## INSURANCE CAUSALITY

Insurance wording must match actual causal effect.

Display order: on a result carrying `rescued` / `avoidedDeath` the verdict first prints the Outcome the Insurance turned
away (`사망` when `avoidedDeath`, otherwise the Outcome its event names - 귀환석 `from` 중상 / 부상, 생환부적 `from`
중상; User 2026-10-09) and the resolved label `생환` overstamps it; the proof lines that name
the Insurance appear on that overstamp. Only a turned-away Death reverses: those two result flags, and a Death 만반의 준비
turned into 부상 / 중상 (its `prepared` event); 강골 / 구급키트 never do. The wording, the proof and the resolved Outcome
are unchanged by this order. Timing -> UI_UX_v2.8.0.md §NIGHT LAYOUT — VERDICT STAMP.

A sale the engine proves saved the adventurer (the Hero Item proof, `heroProof.outcome.worse` 사망 / 중상) may show the
proven worse verdict first and be pushed off by that Item: a Death kept away, or a Severe Injury turned into 성공 /
대성공 (User 2026-10-09). The wording and the
resolved Outcome are unchanged. Timing -> UI_UX_v2.8.0.md §NIGHT — SAVED BY THE SALE.

### RETURN STONE
When it actually changes the escape/retreat outcome (a 부상 / 중상 / 사망 turned into 퇴각): show it as meaningful escape
support (event `귀환석이 실패한 원정에서 퇴각을 도왔다.`).

Do not claim `귀환석이 죽음을 막았다` unless the actual resolution supports that causal claim.

### WORLD TREE INSURANCE
When Death or Severe Injury is actually converted to 퇴각 (rule -> ITEM §세계수 생환부적): strong causal wording is allowed.

Example meaning:
`세계수 생환부적이 사망을 무사 퇴각으로 바꿨다.` / `세계수 생환부적이 중상을 무사 퇴각으로 바꿨다.` (proof cause chip
`사망을 무사 퇴각으로` / `중상을 무사 퇴각으로`; only the Death one is a turned-away Death)

No false hero attribution.

### FIRST AID KIT AFTERCARE — RESULT TRUTH

`구급키트` lowers the expedition Outcome one step: a would-be `중상` resolves as `부상` (injury=1, recovery=0, the 부상 XP/Loot/Fatigue), a would-be `부상` resolves as `부상` with no lasting injury. The NIGHT verdict reads the lowered Outcome; the report exposes the proven contribution.

Examples of valid proof:
- would-be `부상` -> `부상`, persistent injury 0 (`구급키트가 남을 부상을 없앴다.`)
- would-be `중상` -> `부상`, injury=1 / recovery=0 (`구급키트가 중상을 부상으로 낮췄다.`)

Do not display `구급키트가 퇴각시켰다`, `구급키트가 원정을 성공시켰다`, or a generic contribution merely because the Item was carried.

Insurance resolution order/effect -> `ITEM_v2.8.0.md`.

## RETREAT

Retreat is not normal success. Direction: EXP reduced but >0; Loot very low / nearly none; NPC survives.

Retreat can still be followed by legitimate injury if actual resolution says so; the narrative then explains the
sequence coherently, e.g. `도망치는 데는 성공했지만 탈출 과정에서 부상을 입었다.`

Canonical Insurance -> ITEM_v2.8.0.md

## INJURY / SEVERE INJURY

Injury produces a real persistent consequence through the NPC condition system. Severe Injury is a stronger
consequence than normal Injury and may require multi-day rest according to canonical condition data.

Recovery/availability is consistent across Night result, next-day NPC state, Notebook and visitor eligibility.

Canonical NPC state -> NPC_TRAIT_v2.8.0.md

### INJURY RESULT

Show actual current injury consequence only. `injury=2`: no Stat penalty; show remaining recovery duration; recovery
completion goes directly to healthy (`2 -> 0`).

### ORDINARY INJURY RESULT CONTINUITY

Natural ordinary-Injury recovery is owned by `NPC_TRAIT_v2.8.0.md`; Night/result truth preserves it exactly.

If the NPC began the expedition at `injury=1`:

```text
actual Outcome 성공 / 대성공
-> persistent ordinary Injury clears naturally

actual Outcome 퇴각
-> persistent ordinary Injury remains unless DUNGEON_HAZARD §RETREAT HEALING actually heals it

actual Outcome 부상
-> persistent ordinary Injury remains
```

Do not display Retreat as automatic Injury recovery; a proven §RETREAT HEALING result may show recovery.
Do not clear ordinary Injury merely because the result was not a fresh `부상` token.

If an already-injured NPC resolves to Severe Injury or Death, report the actual final outcome/state only.
The exact pre-supply 실패 시 사망 위험 may already have been shown during SALE, but Night must not invent or expose a separate post-supply/final probability after resolution.

Player-facing result may truthfully state that the NPC departed already injured when that state materially affected the expedition, but must not fabricate an exact cause such as `부상 때문에 죽었다` unless the runtime proves that counterfactual claim.

## DEATH

Death is permanent within the Run. Result makes permanence clear without debug/system wording.

Dead NPC: no future visits; does not consume Living NPC Cap; retained only where needed for history/notebook/result record.

Canonical -> CORE_RUN_v2.8.0.md / NPC_TRAIT_v2.8.0.md

## FATIGUE RESULT

Main NIGHT surface shows one settled value:

    귀환 후 피로 11

From Fatigue 10 up the main line also names the band (`정상` is not named):

    귀환 후 피로 22 · 과로

Under the settled value, one next-decision line `다음 원정 {effect}` (the band name is on the main line, not repeated) whenever a
Fatigue band penalty applies (10 and up; nothing at 정상):

    다음 원정 기동·정신 -15%
    다음 원정 기동·정신 -40%

Band names / thresholds / effects (Fatigue 0~40, five bands) -> `DUNGEON_HAZARD_v2.8.0.md`.

Tapping the settled Fatigue row opens an overlay: today's starting value, actual source-labelled
changes (arrival Event, Food/Drink before departure, Outcome, Trait, result Event, Food/Drink buffer,
clamp and overnight Decoration where applicable), then the settled value. Each recovery is counted
once and uses the actual amount removed, including the zero floor. The main value and next-decision
band include any overnight Decoration recovery. `finalFatigue` remains the expedition result;
`settledFatigue` and `fatigueLedger` record the subsequent Night settlement without changing rules.
Below the daily changes, smaller type explains all five canonical bands and penalties. Both surfaces
read the one DUNGEON_HAZARD band definition. Old saves without the daily ledger show only their
recorded expedition chain; missing causes are never reconstructed from current state.

Player-facing labels not used: 밤 피로 · 보급 회복 · 보급 완화 · 원정 결과 +N when N is actually Fatigue gain ·
최종 피로 as a competing second name. Exact arithmetic/fields are unchanged internally.

Show the actual resolved path, not every hypothetical branch.
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
Internal compatibility aliases are allowed only if Player-facing/report truth remains unambiguous.

## GREAT SUCCESS / DEEP EXPEDITION RESULT

### GREAT SUCCESS

Night explicitly distinguishes ordinary Success from `대성공`. For Great Success show: outcome=`대성공`; honest causal
explanation using existing rules; actual NPC changes; for normal expedition only, Store Great Success Gold bonus when earned.

Do not expose exact Success %, Great Success %, hidden margin or formula.

### NORMAL GREAT SUCCESS GOLD

Normal Great Success: additional Store Gold; same rounded amount in result/history/Closing; same-day sale not required.
Ordinary Success: no extra Store Gold.

### DEEP EXPEDITION RESULT

Use existing outcome vocabulary once.

Deep Success / Great Success shows: Deep Expedition identity; NPC bonus EXP/Growth; NPC Wallet reward; any actual
ordinary injury/death consequence.

Deep Expedition Store Gold reward=0, including Deep Great Success; the normal Great Success Store Gold bonus is suppressed.

Closing shows sponsorship outflow clearly and no matching Deep cash payout.
Economic read: `sponsorship / extra preparation outflow -> NPC future value`

## GROWTH PRESENTATION

Growth shows real change. Prefer: Lv.4 → Lv.5 · 투력 21 → 23 · 강인함 17 → 18 · EXP +N.
Avoid abstract lines with no visible change such as `장비 보강`. Only show stats that actually changed and matter.

## LOOT

Loot/result reward is readable as actual gained value. Retreat: loot≈very low. Success/Great Success: reward follows
canonical expedition balance. Do not imply loot that was not actually granted.

### NPC WALLET RESULT TERMINOLOGY

Use `손님 소지금 획득`. Do not use `전리품` where it can be read as Store/Player Gold.

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

Death: no speech bubble; narration/report treatment only.

Dialogue pool size and recent-repeat handling follow COPY_WORLD_VOICE_v2.8.0.md.

## RESULT PRESENTATION ROUTING

NIGHT_CLOSING owns the resolved result category and causal truth.
UI_UX_v2.8.0.md owns the visual/audio presentation of that already-resolved state.

Presentation may distinguish: ordinary return / success, Great Success, retreat, injury, severe injury, Death, proven
rescue / avoided-death accents. It must not create a new outcome category, change rewards, reorder proof, or imply an
Item cause that the existing result proof does not establish.

Death remains narration/report treatment rather than living NPC speech. Narration treatment is about VOICE, not about
position: the Death line occupies the same place and the same visual weight as a living adventurer's line and reads as a
neutral status message there - never as an utterance, and never relegated to a separate narration line beneath the
report body. Exact placement/styling -> UI_UX_v2.8.0.md §NIGHT LAYOUT.

The proven rescue reads exactly:

    생환

with the existing approved Outcome summary `사망 위기를 넘기고 살아 돌아왔다.` beneath it.
The fight verdict sentence is not shown on the player-facing NIGHT record (see UI_UX_v2.8.0.md §NIGHT LAYOUT); the
resolved combat state itself is unchanged.

The Death record carries no follow-up growth or settlement figures. Its player-facing payload is the death status
message, the character, `사망`, the NPC name, the Dungeon · Lv and the Outcome summary - nothing else.
Level / Stat / equipment / injury / rest / Fatigue / EXP / Wallet / reward rows are not rendered for a Death, and the
region leaves no divider or reserved space behind. The resolution still records whatever it recorded; this is a render
rule. Exact treatment -> UI_UX_v2.8.0.md §NIGHT LAYOUT — DEATH PAYLOAD.
Exception: a Death record may carry the §DISCOVERY LINE coach mark for the Death limit.

Every Outcome label is one size; Outcomes differ by copy and tone only. The three-volume rank remains a presentation
weight rule, but it does not change the Outcome, NPC name or summary type size. Exact size -> UI_UX_v2.8.0.md §NIGHT
LAYOUT — OUTCOME TYPE, EXACT.

## RARE ACCIDENT COPY

Rare incident narration is allowed when it matches resolution; use sparingly.
Examples of flavor: 장비가 순간적으로 벗겨짐 / 장비 일부가 손상됨 / 틈으로 위험에 노출됨 / 예상보다 강한 환경에 노출됨.

T1/T2 proper preparation should not repeatedly produce copy that makes Counter preparation feel useless.

Canonical hazard reliability -> DUNGEON_HAZARD_v2.8.0.md

## DEBUG LANGUAGE

Player-facing main copy must not use engine/process language. Forbidden style: 판정 진행 / 보정 적용 / 상태 판정 /
위험도 계산 / 영구 사망 처리 / RNG / Threshold / coefficient / resolve.

Write what happened in the world, not what the code executed.

## COPY TONE

Tone: 담담함 / 명확함 / 가끔 웃김.
Avoid: AI 분석문 / 지나친 감탄사 / 모든 NPC가 같은 말투 / 시스템을 광고하는 문장 / 장황한 설명.

State/context may influence dialogue: first visit, returning, high Loyalty, injury comeback, previous failure,
previous Item actually helped, price experience, same Dungeon retry.

General lines remain the majority; callbacks/jokes are occasional.

## PRESENTATION DATA BOUNDARY

Presentation must not read an app-local global `game` implicitly. Night result presentation consumes:
1. the resolved result/report snapshot first
2. explicit parameters/snapshot supplied by the caller only if required

Adding a global `game` escape hatch is forbidden.

## CLOSING

Closing is economics-first and economics-only.

### CLOSING — CASH FLOW RECEIPT — EXACT

The receipt is the Day's cash, not an income statement: the Day is read by what the store started with and what it
ends with, and by what moved in between - not by cost of goods sold, margin or an accounting profit.

1. `영업 시작 골드 {N}G` in a light filled box (the pair of the 보유 골드 box, quieter than it; both boxes keep the receipt's dotted leader and the stamp keys' stepped pixel corner) - the Day's opening Gold: the end Gold less today's inflows plus today's outflows (exact; not stored)
2. the Gold that moved today, inflows then outflows; 매출 / 발주 / 운영비 always print, every other row only when it moved:
   in - 매출, 본사 지원·수당, 대성공 본사 보상, 재고 정리; out - 발주, 발주 후보 교환, 점포지원 투자, 원정 후원, 운영비
3. the `보유 골드 {N}G` box - the Day's end Gold, the receipt's largest figure and its stamp (UI_UX §CLOSING — RECEIPT
   STAMP) - with `영업 손익 ±{N}G` inside it: the end Gold less the opening. Only the 영업 손익 figure is coloured: green
   above 0, red below 0, gold at exactly 0
4. `창고 재고 {n}개` on its own line, and `오늘 폐기 {n}개` on the next line when any - never Gold: an expired Item was
   paid for when it was ordered. `오늘 폐기` is the stock whose last sale Day was today and that was still unsold when
   SALE closed; it left tonight and is not in `창고 재고` (ITEM §SHELF LIFE). After the count come the expired Items'
   names, most first, `×{n}` only when two or more of one Item expired, at most three names then `외 {n}종`
5. `내일 운영비 예상 {N}G` - tomorrow's base operating cost with today's Store Support and roster, no Event; not on DAY 29
   (the Final Day has no operating cost)

No 판매 원가 / 판매 마진 / 폐기 원가 row; 영업 손익 is the cash change, not an accounting profit. Exact calculation of each flow -> ECONOMY_ORDER_v2.8.0.md.

Closing answers: `오늘 돈이 얼마 남았고, 내일 괜찮은가?`

No explanatory footer prose that teaches internal accounting when the receipt already shows the actual figures; in
particular
    미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.
does not belong on the primary Closing receipt.

### CLOSING ECONOMICS-ONLY — EXACT

The primary Closing receipt does not repeat NIGHT expedition-impact content: no block headed

    오늘의 보급 영향

Closing keeps only the cash-flow receipt above. The NIGHT result is the owner surface for expedition causality and
adventurer-state change.

## NIGHT vs CLOSING

Do not duplicate the same information in both.
NIGHT owns: individual NPC story, outcome, cause, growth/injury/death.
CLOSING owns: store economics, aggregate business result.

## D30 / FINAL

Normal Night expedition resolution does not own D30 Final resolution.
Boss identity/trait/Sloth state is owned by `BOSS_v2.8.0.md`; Closing does not mutate it.

Final Family / party / Power / Boss clear / post-clear contract -> FINAL_EXPEDITION_v2.8.0.md

NIGHT_CLOSING must not add a second ordinary expedition resolve after a successful Final clear.
Final presentation still preserves honest causality and culmination without becoming a debug log.

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

- `대성공` cannot coexist with Injury/Severe Injury/Retreat/Death
- normal Great Success Store bonus is applied exactly once
- Deep Great Success Store bonus remains 0
- Deep bonus EXP/Wallet is reported as NPC change, not Store income

### QA OWNERS

Acceptance criteria: CORE_RUN §QA · DUNGEON_HAZARD / ITEM §QA · NPC_TRAIT §QA · ECONOMY_ORDER §QA · UI_UX §QA

## RELATED

game philosophy -> SPEC_INDEX §GAME CORE
run/save -> `CORE_RUN_v2.8.0.md`
final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
npc condition/growth, Injury natural recovery/re-expedition state, recent snapshot -> `NPC_TRAIT_v2.8.0.md`
hazard causality, Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
item/insurance/Aftercare -> `ITEM_v2.8.0.md`
economy/settlement -> `ECONOMY_ORDER_v2.8.0.md`
sale commitments, Sale revisit display -> `SALE_v2.8.0.md`
presentation / UI -> `UI_UX_v2.8.0.md`
