# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,injury,death,closing,settlement

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


## KEY

nightFlow=oneAdventurerAtATime
resolveCanBePrecomputed=YES
controls=[NEXT,SKIP,SKIP_ALL]

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
매출 / 비용 / 손익 / 폐기 / Gold 변화

## NIGHT FLOW

원정 결과는 NPC 1명씩 짧게 보여준다.

Flow:
resolve/precompute
→ adventurer result card
→ NEXT
→ next adventurer

Player controls:
- 다음
- Skip
- Skip All

Result presentation이 진행을 오래 막지 않는다.

Presentation density follows importance:
- routine/uneventful success may resolve very compactly
- meaningful level-up / injury / severe injury / death / decisive Item effect / important callback receives stronger emphasis
- do not force every ordinary result to consume equal screen time

Zero-result Night:
softlock=NO
즉시 Closing으로 진행 가능해야 한다.

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
-> ITEM

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
-> NPC_TRAIT

## DEATH

Death is permanent within the Run.

Result must make permanence clear
without debug/system wording.

Dead NPC:
- no future visits
- does not consume Living NPC Cap
- retained only where needed for history/notebook/result record

Canonical:
-> CORE_RUN
-> NPC_TRAIT

## INSURANCE CAUSALITY

Insurance wording must match actual causal effect.

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

## ITEM / TRAIT IMPACT

Do not dump every modifier used in calculation.

Show only effects that were meaningfully relevant to the actual result.

Good:
- 농축해독제 → 독 노출 크게 감소
- 핫팩 → 냉기 대응
- 대식가 → Food core effect 강화
- 귀환석 → 퇴각 가능성 확보

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
-> DUNGEON_HAZARD

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

## CLOSING ROLE

Closing is economics-first.

Show at minimum:
- 총매출
- 매입/COGS
- Margin
- 운영비
- 폐기
- Relic 비용
- 최종 Gold

Exact calculation:
-> ECONOMY_ORDER

Closing should answer:
`오늘 장사는 실제로 남는 장사였나?`

## CLOSING SUMMARY

Optional compact section:
`오늘의 보급 영향`

Include only actual meaningful causal contributions.

Example meaning:
- 해독제 1 → 독 피해 감소에 기여
- 귀환석 1 → 퇴각에 기여

Do not force every sold Item into this summary.
A sale with no meaningful expedition impact may simply be absent.

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
- compact cross-day takeaway

## D30 / FINAL

Normal Night expedition resolution does not own D30 Final resolution.

Final Family / party / Power / Boss clear / post-clear contract:
-> FINAL_EXPEDITION

NIGHT_CLOSING must not add a second ordinary expedition resolve after a successful Final clear.
Final presentation should still preserve honest causality and culmination without becoming a debug log.

## SKIP CONTRACT

Skip affects presentation only.

Skip/Skip All must not change:
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
-> CORE_RUN

## QA

Acceptance criteria:
- CORE_RUN_QA_v2.2.0.md
- DUNGEON_ITEM_QA_v2.2.0.md
- NPC_TRAIT_QA_v2.2.0.md
- ECONOMY_ORDER_QA_v2.2.0.md
- UI_UX_QA_v2.2.0.md

## RELATED

game philosophy -> 00_GAME_CORE
run/save -> CORE_RUN
final expedition -> FINAL_EXPEDITION
npc condition/growth -> NPC_TRAIT
hazard causality -> DUNGEON_HAZARD
item/insurance -> ITEM
economy/settlement -> ECONOMY_ORDER
sale commitments -> SALE
presentation -> UI_UX
