# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui

DOC_VERSION=2.6.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC



## v2.6.0 UPDATE: UI & UX

### SALE LAYOUT
- **Desktop**: 캐릭터 우측 상단 활용. 왼쪽 가방 크기 대폭 확대. 그 아래에 '전투 전망', 그 아래 '예상 목적지' 배치. 하단 기존 패널 삭제.
- **Mobile**: 캐릭터/상태 세로 길이 축소 (Artwork crop 없이). 가방 확대. 가방 아래 '예상 목적지 작게'. 지난 원정 정보 아래 '전투 전망'. 하단 기존 패널 삭제.

### SALE STAT SOURCE UX
- Stat 하단에 실제 적용된 **Source 이름만** 작게 표시 (유리: 초록, 불리: 빨강). 미적용 표시 안함.
- Stat 터치 시: Source / 실제 적용값 / 계산 과정 모달 표출.
- NPC Detail 창: 실제 부상 효과, 현재 피로/적용 penalty, 남은 휴식일, 회복 방법 표시.

### NIGHT UI
- 건너뛰기 삭제. 다음 / 전체 건너뛰기 2-button 체제.
- Result 정보: 원정 fatigue gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, **NPC 소지금 획득**.

### MENU / SETTINGS
- Menu Top-level: 설정 · 저장 → 설정. Sound Toggle 및 Full Data Reset은 Settings 내부로 이동.
- Settings 내부 '현재 지점 포기' 제거.

### COPY
- 폭식 → 탐식
- 전리품 → NPC 소지금 획득

## KEY

visualGoal=gameUI, not dashboard
brandAccent=GUILD24 green
fullScreenGreenDashboard=NO

phaseIdentity:
MORNING=situation
ORDER=management
SALE=store+customer
NIGHT=result
CLOSING=economics

mobile:
verticalStack=YES
tinyFontFix=NO
repeatTouchTarget≈44px

tutorial=coachMark/spotlight
inFlowTutorialBox=NO

forecast:
combat=[우세,접전,불리]
hazard=[취약,불안,대응,충분]
masterSafetyScore=NO
expeditionExactProbability=NO
nextDayTierProbability=EXACT
eventReveal=MORNING_FOCUSED_OPENING
orderReroll=FULL_OFFER

## ROLE

UI/UX =
Player가 매 Phase의 핵심 질문에
빠르게 집중하고 판단하게 만드는 Presentation Layer.

UI는 정보를 많이 보여주는 것이 목적이 아니다.

우선순위:
1. 현재 해야 할 판단
2. 판단에 필요한 정보
3. 결과/피드백
4. Secondary reference

## VISUAL DIRECTION

GUILD24의 브랜드 Green은 유지 가능하지만
전체 화면을 Green Card Dashboard처럼 만들지 않는다.

Avoid:
- SaaS dashboard composition
- rounded card inside rounded card
- 모든 영역의 동일한 초록색 톤
- 과도한 thin border
- 반복 badge/chip/header
- 긴 stacked report page
- 설명문이 Gameplay보다 더 눈에 띄는 구조

Target:
- 게임 HUD/게임 오브젝트 중심
- 명확한 Primary Action
- Phase별 다른 정보 위계
- 여백과 큰 덩어리 중심의 Composition
- Store/NPC/Item 같은 게임 대상이 Container보다 우선

Reference를 사용할 때:
asset/color를 복사하는 것이 아니라
information hierarchy / HUD / object focus / space usage를 참고한다.

Perfect commercial art는 Prototype 필수 조건이 아니다.
구조/위계가 AI-generated dashboard처럼 보이지 않는 것이 우선.

## PHASE IDENTITY

각 Phase는 다른 질문을 가진다.

### MORNING
question=`오늘 어떤 날인가?`

Primary content:
- 방문 예상
- 열린 Gate
- Known Hazard
- Event

Morning은 상황 읽기 화면.

Event가 발생한 날:
1. Event Focused Reveal을 Gate Detail보다 먼저 보여준다.
2. 확인 후 Event가 반영된 Morning Situation을 보여준다.
3. 별도의 EVENT Phase는 만들지 않는다.

Authoritative Event timing/effect:
-> EVENT

Do not:
- Order controls 대량 노출
- Sale controls 노출
- Closing 숫자 반복

Store scene은 사용할 수 있으나
상황 정보보다 방해되지 않게 한다.

### ORDER
question=`무엇을 준비할까?`

Order는 관리 화면.

Store scene:
REMOVE from Order main composition.

Recommended hierarchy:
1. `DAY X · 본사 발주`
2. persistent funds summary
3. compact current-day Gate / known Hazard reference
4. compact next-day Tier forecast (secondary)
5. offer list + quantity (base=6; authoritative modifiers may increase count)
6. Full-offer reroll + current cost/state
7. sticky confirm

Funds summary example:
`보유 1,200G | 선택 280G | 발주 후 920G`

Offer card:
compact
avoid excessive height

Quantity controls:
repeat action touch targets≈44px

Primary action:
sticky bottom `발주 XXXG · 발주 확정`

Avoid:
Morning 정보의 불필요한 대량 반복
오늘 Gate/Hazard 정보를 다시 확인하려고 다른 Phase로 왕복하게 만드는 Flow
next-day forecast를 오늘 준비 정보보다 더 강하게 보이게 하는 구성
상하 스크롤 왕복을 요구하는 구매 Flow

### SALE
question=`이 손님에게 무엇을, 얼마에 팔까?`

Store scene:
high visual priority

Customer:
one at a time

NPC detail mobile order:
1. portrait/name/job
2. destination
3. 2×2 stats
4. traits
5. condition/status
6. bag/equipment
7. locked/secondary info

NPC inspection entry:
portrait/sprite/name/card tap all acceptable

Returning NPC:
show a compact `since last visit` change/history layer before or alongside unchanged detail.
Useful changes include when actually relevant:
- level/stat growth
- injury/recovery/condition change
- notable previous expedition outcome
- prior meaningful Item/callback history

Full authoritative profile remains accessible.
Do not hide important current Stats/Traits behind history.

Item selection:
all sellable inventory visible
compact compare
selected effect preview clear

Price:
50 / 100 / 150
visually explicit and easy to switch

Primary focus:
NPC + selected Item + price decision

High-frequency Sale flow:
- keep inspect -> Item -> price -> purchase/refusal -> remaining-slot decision visually continuous
- avoid unnecessary modal/page round trips
- avoid redundant confirmation for routine actions
- do not batch away sequential decisions merely to reduce clicks

### NIGHT
question=`내 선택이 어떻게 됐을까?`

One adventurer result at a time.

Hierarchy:
1. what happened
2. why
3. what changed

Controls:
Next / Skip / Skip All

Importance hierarchy:
- routine success=compact
- meaningful growth/injury/death/decisive Item/callback=stronger visual emphasis
- on 게이트 순례주간, Night may show one compact Event summary line with actual changed count; affected NPC cards show expected -> actual destination

Avoid:
- debug log layout
- giant modifier ledger
- long mandatory animation
- giving every result identical presentation weight

### CLOSING
question=`오늘 장사는 어땠을까?`

Economics-first.

Primary:
- revenue
- COGS
- margin
- overhead
- waste
- Relic spend
- final Gold

Expedition story belongs to Night.
Closing may show only compact actual-supply-impact summary.

## INFORMATION DENSITY

Do not solve desktop density by shrinking text.

Mobile:
- vertical stacking
- clear hierarchy
- collapsible/secondary detail when needed
- no narrow multi-column compression

PC:
can use wider layout,
but information priority should remain same as mobile.

## TOUCH / INTERACTION

Repeated or primary actions:
target≈44px class

Examples:
- quantity +/-
- price buttons
- next
- confirm
- reroll
- customer/item selection

Avoid:
- tiny icon-only controls
- tightly packed adjacent taps
- controls hidden behind browser safe area

Mobile QA must include:
- browser top/bottom chrome
- safe area
- sticky footer overlap
- clipped header/action bar

## TUTORIAL

Tutorial UX:
Coach Mark / Spotlight / FTUE Overlay

Structure:
- current game screen remains visible
- dim background
- spotlight target
- small anchored bubble
- `다음`
- `건너뛰기`

Action tutorial:
target-only interaction may be allowed
successful action may auto-advance

Rules:
- tutorial does not add page height
- tutorial does not push layout
- bubble repositions responsively
- target may scroll into view
- one concept per step
- contextual first-use preferred
- completion persisted
- reload does not restart completed tutorial

Do not use:
large green instructional cards inserted into normal flow.

## FORECAST UI

Combat:
- 우세
- 접전
- 불리

Hazard:
- 취약
- 불안
- 대응
- 충분

Do not show:
- exact success %
- exact death %
- combined master safety score
- fake precision

Forecast should be clearly labeled as estimate.

First forecast tutorial explains:
actual expedition may differ from prediction.

Destination reliability tutorial explains the system-level rule, not one specific Trait:
`특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.`

Do not center the tutorial around 허세.

Authoritative logic:
-> DUNGEON_HAZARD

## STAT PRESENTATION

Player-facing core stats:
- 투력
- 강인함
- 기동
- 정신

Use clear 2×2 presentation where appropriate.

Avoid overwhelming base NPC panel with
every resistance/internal coefficient as equal-priority numbers.

Hazard-specific information should appear
where it is relevant to current destination/preparation.

## TRAIT PRESENTATION

Trait profile/card prioritizes:
1. Trait name
2. actual effects
3. condition/scope when needed

Do not player-face internal Trait direction taxonomy:
- 이점
- 양면
- 약점
- ▲ / ◆ / ▼ quality label

Internal POSITIVE/MIXED/NEGATIVE remains for generation/Event logic.

Each material effect uses authoritative data-driven semantic tone:
- benefit
- cost
- neutral

Meaning must not be inferred from numeric sign.

Example:
`신중함`
- injuryRisk -4%p = benefit
- loot -8% = cost

Semantic color may reinforce the effect line,
but wording itself must remain understandable without color.

Do not turn Trait header/background into a green/yellow/red quality grade.

Authoritative:
-> NPC_TRAIT

## HAZARD NUDGE

System should help the player notice relevant risk
without solving the puzzle.

Every known authoritative Hazard provides:
- Hazard name
- short Stat/readiness pressure explanation from DUNGEON_HAZARD

Examples:
- 냉기 · 강인함 압박
- 화이트아웃 · 정신 중심 / 기동 보조
- 부식 · 강인함 압박
- 진창 · 기동 압박

Interaction:
PC:
- hover and keyboard focus may show tooltip/detail

Mobile/touch:
- tap or inline disclosure provides equivalent information

hoverOnly=NO

Gate summary may show the short pressure line directly when clearer.
Do not explain only some Hazards while leaving others name-only.

Allowed:
- clear Hazard labels
- readable contrast/icon
- preparedness label
- highlighting current relevant information

Avoid:
- blinking alarm that tells exact required Item
- `이 아이템 사세요` solution nudge
- automatic optimal recommendation

Rule:
clarify ingredients, do not provide the answer.

Exact Hazard pressure ownership:
-> DUNGEON_HAZARD

## ITEM INFO

Order/Sale must show enough information to decide without
frequent encyclopedia navigation.

Useful:
- actual effect
- buy/sale price where relevant
- current margin where relevant
- category/role
- explicit penalty
- Counter relevance

Secondary encyclopedia remains optional reference,
not required navigation for basic decisions.


## BOSS / FINAL REVEAL UI

Boss gameplay ownership -> BOSS  
Final Family ownership -> FINAL_EXPEDITION  
Exact Player-facing wording -> COPY_WORLD_VOICE

Existing reveal sequence remains:

D5:
`Boss Identity` focused reveal -> D5 Relic reveal

D15:
`Boss Trait` focused reveal -> D15 Relic window decision (`Relic 획득` vs `봉인 해제` when Sloth opportunity)

D30:
`Final Family Pair` focused reveal -> D30 Relic window decision (`Relic 획득` vs `봉인 해제` for Sloth) -> Final preparation / lock

### D5 — 길드 토벌 공고

Presentation identity:
`in-world 길드 토벌 공고`

Primary hierarchy:
1. Boss D5/D15 BASE illustration
2. fixed Player-facing Boss name
3. short Boss-specific Flavor
4. continuation to existing D5 Relic reveal

The Flavor may hint at the Trait.
The exact Trait Function remains hidden.

Boss art is a primary game object.
Do not reduce it to a tiny icon beside a dashboard card.

### D15 — 길드 정보 보고

Presentation identity:
`길드 정보 보고`

Primary hierarchy:
1. same D5/D15 BASE Boss illustration
2. Boss identity
3. exact Trait name
4. exact material Trait effect
5. relevant current DATA when applicable

Do not replace Function with strategy advice.
The Player receives the rule and decides the response.

Do not expose:
- exact Final success probability
- hidden Final Power
- internal Factor / Modifier terminology

### D30 — 최종 정찰 보고

Presentation identity:
`최종 정찰 보고`

Show:
- exactly two Final Families
- each selected Family's actual authoritative T2 Hazard set
- each Hazard's authoritative Stat-pressure label

Important:
`two Families` does NOT mean exactly two Hazard keys.

Do not expose:
- exact Hazard formula
- exact Final success probability
- internal Final Power

### FINAL MODIFIER PREVIEW

Before Final Lock, whenever a Boss changes a Player-visible value, show:

`original → applied`

Required:

PRIDE:
- each participant's 투력

ENVY:
- targeted participant's 투력 / 강인함 / 기동 / 정신

GLUTTONY:
- affected 보급품 raw Stat contribution

LUST:
- each affected non-regular participant's 투력 / 강인함 / 기동 / 정신

GREED shows:
- 목표 매출
- 현재 매출
- 달성률
- 현재 탐욕 강화 %

SLOTH shows:
- 봉인 해제 상태
- 현재 위협 단계

Do not expose exact Final success probability.

### FINAL BOSS ART

Normal six Bosses:

`Final prep / confrontation / result -> D30 BATTLE`

SLOTH:

- SB0 -> BASE reuse
- SB1 -> D30 SB1
- SB2 -> D30 SB2
- SB3 -> D30 SB3

The Final Boss is a primary game object.
Do not present the Final confrontation as text/name-only when the authoritative Boss illustration is available.

Rules:
- do not show Relic choice first and reveal relevant Boss/Family information afterward
- Sloth choice must visually communicate `Relic 획득` vs `봉인 해제` as mutually exclusive
- Boss reveal is not a new permanent Phase
- reveal Seen state is stable across Save/Reload
- Boss art must not push required decision information excessively below the fold on mobile


## RELIC UI

Relic Window:
- candidate comparison must be immediate
- each candidate shows effect/condition/price clearly
- Buy / Defer obvious
- active window availability visible in management phases
- no purchase-window reopen during Active Sale/Night

Milestone reveal:
- D5/D10/D15/D20/D25/D30 new Window receives one focused reveal
- Player can Buy or choose `나중에 결정`
- dismiss/defer does not reroll candidates/prices
- Save/Reload does not replay the reveal as an exploit

Candidate cards must NOT expose internal design taxonomy:
- Foundation / Hybrid / Keystone / Utility
- Rotation / VIP / Premium / Expedition / Fresh / Customer Axis
- `신선식품 · 기반` style labels

Player discovers synergy from effects.

Owned Relic Quick View:
- Morning=YES
- Order=YES
- Sale=YES
- readOnly=YES
- shows owned Relic name + actual effect/condition
- does not allow purchase/defer/change timing during Sale

Relic should look like a meaningful Run-build choice,
not a minor facility settings menu.

Authoritative:
-> RELIC

## EVENT PRESENTATION

Event is a MORNING opening beat, not a separate Phase.

When an Event occurs:
- show a focused overlay/modal/highlight before Gate/Morning detail
- show Event title, short situation/flavor, and actual gameplay effect
- primary continuation returns to the normal Morning Situation
- Event-modified Gate/Hazard/visitor state is then shown in its normal place

After the initial reveal:
- Order keeps only Event effects relevant to Order
- Sale keeps only Event effects relevant to Sale
- Night/Closing mention the Event only when it materially affected that result

Do not:
- bury a meaningful Event inside ordinary stacked cards
- repeat the full Event explanation in every Phase
- create a separate EVENT Phase solely for presentation

Authoritative Event rule/catalog:
-> EVENT


## META UI

Meta gameplay ownership -> META

Player-facing Meta presentation must make these source-of-truth concepts distinct:
- Job × Boss clear matrix
- Job Mastery 0..7 per Job
- Total Job Mastery
- Distinct Boss Clear 0..7
- approved 1/3/6 unlock milestones
- Franchise Grade derived from Total Job Mastery
- Start Contract availability gated by Franchise Grade
- Monster Knowledge `보급 생환 N회`

Do not present legacy Global Meta XP as current progression.

Franchise Grade itself must not imply hidden gameplay bonuses.
Its progression function is to open selectable Start Contract options.

Start Contract UI:
- default/standard contract is available from a fresh account
- locked non-default contracts communicate their required Franchise Grade
- an unlocked contract is shown as available for selection, not as an automatically active bonus
- do not present legacy Day / Run-count / regular-customer / adventurer-level conditions as current unlock truth


## NAVIGATION

Primary Phase action stays obvious.

Secondary navigation may include:
- Notebook
- Reference/Knowledge
- HQ/catalog/help

Monster Knowledge progress wording:
`보급 생환 N회`

Do not use:
`관찰 N회`

Secondary navigation must not compete visually
with current Phase objective.

Store remains the emotional/home-space anchor,
especially outside pure management screens.

## COPY HIERARCHY

UI text should be:
- short
- concrete
- state-based

Avoid:
- system marketing language
- repeated explanatory paragraphs
- same information in multiple cards
- AI-style headings everywhere

Important state should be shown once,
in the place where the decision is made.

Detailed player-facing terminology / DATA-FUNCTION-FLAVOR / Voice:
-> COPY_WORLD_VOICE

## RESPONSIVE RULE

PC-first, mobile-supported.

Do not preserve desktop composition at all costs.

When width is narrow:
- stack
- simplify
- move secondary detail
- keep primary actions large
- reduce unnecessary side gutter
- current decision/action must be obvious in the first viewport
- decorative/game-object art must not push required decision information excessively below the fold

Do not:
shrink all fonts/control sizes to fit desktop columns.

Required v2.5 mobile visual QA widths:
- 360px
- 390px
- 430px

At each width verify with actual browser screenshot/manual inspection:
- no zoom required for core text
- current phase question/action is obvious
- no desktop composition merely scaled down
- no clipped sticky action / safe-area overlap
- game scene remains useful, not a space-consuming poster above the decision

## ACCESSIBILITY / SIGNALS

Do not rely on color alone for:
- Trait effect benefit/cost semantics
- danger/preparedness
- selected state
- disabled state

Use:
icon / label / shape / text reinforcement.

Trait exception:
do not reintroduce `이점/양면/약점` or ▲/◆/▼ as quality labels merely for accessibility.
The effect sentence itself carries the meaning;
semantic color/icon is reinforcement only.

Contrast must remain readable
across dark backgrounds and brand accents.

## AI-SLOP CHECK

Before accepting a major UI revision, ask:

- Is the page mostly nested cards?
- Are badges/chips doing work that hierarchy could do?
- Is every section using same radius/border?
- Is brand Green being used as entire visual language?
- Does it look like a SaaS admin screen?
- Is the Primary Action visually weaker than explanatory containers?
- Do phases feel like the same template with different text?

If YES:
restructure composition before polishing color/shadow/radius.

## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION / RUN ABANDON UX

### GREAT SUCCESS OPPORTUNITY SIGNAL

When the authoritative Great Success opportunity condition is met, show:

`대성공을 노려볼 만합니다.`

The word `대성공` is mandatory.

Exact placement is Work implementation choice, but it must:
- appear before departure
- appear while Player can still change that NPC's preparation
- update when preparation changes
- hide exact Great Success %
- hide internal Combat margin/formula
- not become a master safety score

### GREAT SUCCESS TUTORIAL

Contextual Tutorial explicitly teaches:
- `대성공` exists
- it is above ordinary Success
- extra preparation can raise its chance
- Great Success has an additional reward
- on a **normal expedition**, Great Success gives the Store an additional Gold bonus

Player should understand why another useful Item can matter even when ordinary
Success already looks likely.

### DEEP EXPEDITION MORNING

Actual Deep Expedition Day:
- no Normal Event reveal
- Deep Expedition is the special Morning operational beat
- existing Morning -> Order flow remains
- no new permanent Phase

Before Order, Player can identify:
- `심층원정` available today
- base Gate / Family / Tier / known Hazard
- sponsorship cost exists
- NPC gets additional Growth / Wallet on success
- participation optional

### FIRST-EVER DEEP EXPEDITION TUTORIAL

Trigger:
the account's **first actual Deep Expedition occurrence during play**.

Not once per Run and not shown before the feature actually occurs.

Completion is account-scoped:
- current Run abandon -> preserved
- new Run -> preserved
- full game-data reset -> deleted
- after full reset, next first actual occurrence shows it again

Reuse existing Tutorial persistence.

Tutorial must clearly teach:
1. `심층원정` exists
2. it is optional
3. required Combat Power is higher than the ordinary Gate version
4. one actual visiting NPC can be nominated
5. nomination costs Store sponsorship Gold
6. Success gives extra NPC EXP/Growth + Wallet
7. unlike a normal Great Success, Deep Expedition Store Gold return is 0 even on Great Success

Tutorial appears before the first nomination decision and must not leave
actionable Morning/Order information obscured after dismissal.

### DEEP SALE UI

While nomination is legal, show `심층원정에 추천`.

After nomination:
- sponsorship payment clear
- changed destination clear
- updated forecast clear
- ordinary Sale continues

### RUN ABANDON UX

Identity=`현재 런 포기`.

Preferred action:
`현재 런 포기 · 새 점포 준비`

Confirmation must clearly communicate:
`현재 런을 보상 없이 포기하고 새 점포를 시작합니다.`

Legacy XP / settlement / reward promise must not appear.

## QA

Acceptance criteria -> UI_UX_QA_v2.5.0.md

## RELATED

game philosophy -> 00_GAME_CORE
run phases -> CORE_RUN
order -> ECONOMY_ORDER
sale -> SALE
night/closing -> NIGHT_CLOSING
npc presentation -> NPC_TRAIT
item info -> ITEM
relic choice -> RELIC
forecast -> DUNGEON_HAZARD
event reveal -> EVENT
final expedition -> FINAL_EXPEDITION
copy/voice -> COPY_WORLD_VOICE
