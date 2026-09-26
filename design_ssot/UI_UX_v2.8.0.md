# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings,typography,visual_material,final_preparation_ui,functional_design,visual,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
DOC_VERSION=2.9.3
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/UI_UX_v2.8.0-patch.md,history/UI_UX_v2.7.0.md,history/UI_UX_v2.6.1.md,history/UI_UX_v2.6.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/UI_UX.md

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

## CORE UI PRINCIPLE

```text
산수는 대신할 수 있다.
판단은 대신하지 않는다.
```

UI may calculate deterministic public arithmetic.
UI may not turn uncertain preparation into a system-authored answer.

Do not add:
- recommended Item badge
- `오늘 강함` / fit score
- automatic best-fit Item ordering
- future-customer importance hint
- uncommitted-Item derived Forecast answer
- system-authored failure diagnosis without proven runtime causality

## RETIRED ACTIVE UI

Do not expose:
- Franchise Grade
- Franchise Achievement list/progress/toast
- Grade ORDER discount
- Start Contract selection
- Grade-gated Start Contract unlock progress

Historical archive policy -> META_v2.8.0.md.

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

## VISUAL MATERIAL — ANTI-GENERIC UI PASS

Goal: preserve existing GUILD24 world/material strengths while removing generic SaaS/AI-template grammar.

Keep/reinforce:
- Morning store/board/room
- Order paper/form material
- Sale character-centered asymmetry
- Night slate/dark material
- Closing receipt/till-roll
- wood / paper / metal / brass

Do not create a new UI framework.

## STRONG GREEN SEMANTIC

Strong GUILD24 Sign Green is reserved for:

```text
영업 시작
```

Do not use Strong Green as the repeated primary treatment for:
- 발주 확정
- Relic purchase
- SALE progress/finalize
- NIGHT next
- CLOSING next day
- save/export

Material direction:

| Action | Material direction |
|---|---|
| 영업 시작 | Strong Sign Green |
| 발주 확정 | Brass / Paper Transaction |
| 점포지원 구매 | Metal / Brass |
| SALE 진행 | Dark Wood |
| NIGHT 다음 | Slate / Dark Steel |
| CLOSING 다음 날 | Dark Register / Steel + restrained Brass |
| Utility | Steel |
| Destructive | Muted Red |

## TYPOGRAPHY — EXACT PAIR

```text
ATMOSPHERE = Mulmaru / 물마루
INFORMATION = Wanted Sans
```

Do not add a third font family, icon font, or theme-font system.

### Mulmaru
Use for:
- DAY / world signage
- short phase/display headings
- atmospheric labels
- fixed-width diegetic/numeric role where Mulmaru Mono is actually needed

Do not use for long body copy.
Prefer size/spacing/material hierarchy over fake bold.

### Wanted Sans
Use for:
- body
- prices
- Stats / Item effects
- Wallet / Gold / counts
- utility text
- buttons
- long Korean information

Vendor only required weights.

## PRESENTATION POLISH ROUTING

Presentation principles (construction / asset / ornament / audio / visual review):
- PRESENTATION_PRINCIPLES_v2.8.0.md

UI_UX_v2.8.0.md remains authoritative for surrounding UI / UX / mobile / tutorial / semantic delta /
popover / Store Management / NIGHT layout rules that remain in this file.

## PHASE IDENTITY

각 Phase는 다른 질문을 가진다.

## MORNING

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
-> EVENT_v2.8.0.md

Do not:
- Order controls 대량 노출
- Sale controls 노출
- Closing 숫자 반복

Store scene은 사용할 수 있으나
상황 정보보다 방해되지 않게 한다.

### DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER)

(User 2026-09-25, v2.9.1 balance.) The Run's cumulative Death count and the current segment limit
(`CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED) are always on screen at MORNING and ORDER, in the top status line —
not only in the 도감.
- one compact item: count / current limit / the Day the segment ends; exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23
- warning color when one more Death ends the Run (count = limit − 1)
- the limit shown already includes 추모 방명록 and 위령제
- no extra popover, badge or explanation text; the same line on both screens
- exact placement is settled by the screenshot review of the implementing batch (PRESENTATION_PRINCIPLES)
- ORDER — FLOATING TODAY LINE (User 2026-09-25; recommended form taken while the User is away - to reconfirm): the Death line floats at the top of the scrolled 발주서; once the `오늘` block (visitors and the per-Gate count) has gone under it, the same `오늘` line joins that floating box under a thin rule with its own small `오늘` label, so it reads as a second fact, not part of the Death count. While the block itself is on screen the box carries the Death line only. No new copy; the line is the block's own text without the `위험 보기` button

### MORNING — NEXT-DAY GATE FORECAST — RETIRED

(User 2026-09-24, v2.9.0) No next-day Gate-count or Tier forecast is shown anywhere, MORNING or ORDER. Today's open Gates, their numbered Hazard rows and the visitor count per open Gate are the whole preparation context; the Gate-count / Tier generation rules in `DUNGEON_HAZARD_v2.8.0.md` are unchanged and stay internal.

Still hidden:
- next-day Family / exact Gate composition / Hazard set
- do not reveal an individual future customer's identity / individual destination; the visitor count per open Gate of the current day is public at MORNING and ORDER (User 2026-09-24, v2.9.0)
- do not add recommended Item/category/quantity prose

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

## ORDER

question=`무엇을 준비할까?`

Order는 관리 화면.

Store scene:
REMOVE from Order main composition.

Recommended hierarchy:
1. `DAY X · 본사 발주`
2. persistent funds summary (the top status line also carries the Death count / limit, §DEATH LIMIT — ALWAYS VISIBLE)
3. compact current-day Gate / known Hazard reference
4. (retired, User 2026-09-24, v2.9.0) no next-day forecast block
5. offer list + quantity (base=6; authoritative modifiers may increase count)
6. Full-offer reroll + current cost/state
7. sticky confirm

Funds summary example:
`보유 1,200G | 선택 280G | 발주 후 920G`

오늘 brief line (User 2026-09-24, v2.9.0):
- one open Gate: `{N}명 · {Gate}`
- two or more open Gates: `{N}명 · {Gate A} {a} · {Gate B} {b}` — the visitor count per open Gate, counted by the destination each customer claims (a liar's or a pilgrimage-rerouted customer's true Gate stays hidden)
- the counts sum to the visitor count; no name, Job, Trait or Wallet
Exact line -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

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

ORDER decision information must be readable before commitment:
- current Gold
- selected order spend
- Gold after order
- **today expected operating cost**
- warehouse used / remaining capacity
- Item shelf life / expiry information
- current-day Gate / known Hazard context
- current Reroll cost/state

Flow is visibly separated:
1. select quantity
2. `발주 확정`
3. Inventory updates, cart clears, ORDER remains
4. optional Reroll / re-order
5. separate `영업 시작`
6. SALE

The dock may not collapse `발주 확정` and `영업 시작` into one contextual button whose same action both commits and advances.

### ORDER Reroll UX

Reroll remains available with an unconfirmed cart.
Using it:
- clears only the unconfirmed cart
- replaces the whole offer set
- charges the current Reroll cost once
- preserves already confirmed Inventory

The UI must not require quantity reset to zero before Reroll.

### ORDER Runtime continuity

On mobile and desktop, preserve the current viewed product area and practical focus after:
- quantity + / -
- quantity returns to 0
- order confirm
- Reroll
- re-confirm

D30 Final ORDER follows the same continuity contract.

### ORDER — ITEM INFORMATION HIERARCHY

Do not add redundant role chips.
Within an offer/item card, visual priority is:

1. Item identity
   - the rarity name (`일반 / 고급 / 희귀 / 영웅 / 전설`) as one small line under the Item name — an identity fact, not a role chip (User 2026-09-24, v2.9.0)
2. exact actual effect
   - Core Stat
   - Hazard Counter
   - 피로 회복 N (User 2026-09-24, v2.9.0)
   - explicit penalty
3. economy / stock metadata
4. quantity interaction
   - a `+ / 1 / 3 / 최대` blocked by store Gold or warehouse space stays dim but answers a tap with the reason toast; an offer whose whole supply for today is already in the cart answers `오늘 공급 최대 수량입니다.` (exact lines COPY_AUDIT §3-9; User 2026-09-24, v2.9.0; supply line User 2026-09-25)

Examples such as `속박 대응 +16` already communicate function; do not add a second `속박 전문` chip.
No today-fit / recommended badge, no verdict word, no reorder, no recommended row (User 2026-09-24, v2.9.0).
No emphasis of any effect text against today's Gates either: the earlier typographic today-fit emphasis is retired, every effect text keeps the default style, and the row's effects stand in the fixed per-category order (`ITEM_v2.8.0.md` §PRESENTATION ORDER) (User 2026-09-24, v2.9.0).

### ORDER — WAREHOUSE DISCLOSURE

Always-visible summary must keep capacity readable.
Example:

```text
창고 4 / 18 · 4종
```

The individual held-stock list is collapsible at every width and starts collapsed; opening it is an account-level presentation choice that persists across Days and reloads until the player folds it again (User 2026-09-24, v2.9.0).
- the collapsed summary line still states the held-stock summary
- used/remaining capacity is never hidden inside the collapsed detail
- ORDER CONFIRM (User 2026-09-25, v2.9.2 H3; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H3;
  acceptance -> UI_UX_QA UI-Q-v29-32): on 발주 확정 one crate per ordered SKU - its warehouse row's icon - falls onto its row
  (the NIGHT stamp's 90 ms fall) in a cascade whose step is at most 70 ms and shrinks so the last landing is within 320 ms;
  each row's count goes from its prior value straight to the resolved one on its crate's landing (never a unit at a time), and
  a SKU new to the warehouse brings its row in with its crate. The warehouse figures - the summary `N / M칸` and `N종` and the
  register's 창고 잔여 칸 - move together on the last landing (a folded list shows only those). At most three landings are audible (the `order` stamp, then the short `crate` of the same family); the rest
  are silent. The till's 보유 골드 counts down to the resolved value in 220 ms. The `발주 완료.` line is unchanged. 일반
  intensity: no hold. Under reduced motion the `order` stamp plays once and every value is resolved at once

## SALE

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

NPC detail also carries `실패 시 사망 위험 {N}%` (the frozen SALE-entry value) (User 2026-09-24, v2.9.0), and the information row `연속 부상 출발 {n}회` — the unbroken run of this adventurer's most recent expeditions begun injured (the chain the v2.9.1 strain cut reads; 0 after a healthy departure), no verdict (User 2026-09-25, v2.9.1; replaces `무리한 출발 {n}회`).

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
the chosen Item goes on the counter tray; the shelf rows never change height (§SALE — COUNTER TRAY; (User 2026-09-24, v2.9.0))

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
- SALE transaction beats (hand-over, customer reaction, counter, exit / entry, price sound family, refusal) -> PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT (User 2026-09-24, v2.9.0)

### SALE — DESKTOP AUTHORITY

- Character / Portrait left
- upper-right = Core Decision area
- Bag visually/touch-wise enlarged
- Forecast + Expected Destination in upper-right Core Decision area
- NPC Wallet visible in the same decision hierarchy
- duplicated lower destination / forecast removed
- the two Bag slots stay in the customer-state strip beside the status line and are the landing point of the hand-over (User 2026-09-24, v2.9.0)

Bag size change is presentation only; capacity does not change.

### SALE — MOBILE AUTHORITY

- compact Character/status top footprint
- no artwork crop
- enlarged Bag with no overlap/overflow
- compact Expected Destination
- Forecast in the current-decision flow (the `지난 원정` quick surface is desk-only; on phone the NPC detail holds it) (User 2026-09-24, v2.9.0)
- core environment signal visible without tap
- no duplicate environment/forecast blocks
- ~44px-class repeat touch targets
- the Bag stays in the customer-state strip at every width, one step larger than v2.8, never overflowing (User 2026-09-24, v2.9.0)

Same-Customer rerenders preserve scroll/focus.
New-Customer transition may intentionally start at the top.
`손님 보내기`: the current customer exits left, then the next arrives with the existing entry (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A4; User 2026-09-24, v2.9.0).

### CURRENT CUSTOMER STATE

Compact SALE state includes:
- Injury state, without 부상 1 style numeric duplication
- Fatigue
- Loyalty

Example:
    부상 · 피로 8 · 단골도 37

Trusted Regular:
- show 단골 when owner threshold is reached
- no large Loyalty progress bar is required

Normal SALE shows the Loyalty value/state without a separate `?` or Loyalty popover trigger.
Its contextual explanation is taught by the tutorial/coach.
The global compact Help remains a separate reference surface under its current owner.

Equipment text is omitted from this compact SALE header/state region.
Equipment remains available in NPC detail and as proven Stat-source attribution.

### SALE STAT SOURCE UX

- Stat 하단에 실제 적용된 **Source 이름만** 작게 표시 (유리: 초록, 불리: 빨강). 미적용 표시 안함.
- NPC Detail 창: 실제 부상 효과, 현재 피로/적용 penalty, 남은 휴식일, 회복 방법 표시.

### SALE — FOUR CORE STATS REMAIN PRIMARY INFORMATION

Do not move 투력 / 강인함 / 기동 / 정신 behind a detail accordion merely to simplify the screen.
Visible Stat growth is part of NPC progression feedback.

When an actual source changes a Stat, keep the small actual source treatment.
Calculation breakdown belongs in touch/click detail.

### SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT

The expedition outlook shown on the ordinary SALE decision surface is a **pre-supply snapshot**.

Snapshot timing:

```text
customer SALE decision begins
-> before any new Item is committed for this visit
-> capture Combat Forecast / Hazard Readiness / 실패 시 사망 위험
```

Show:
- qualitative Combat Forecast
- qualitative Hazard Readiness for the known current Hazard state
- exact 실패 시 사망 위험 % — not as a readout cell: the readout `.top` shows 전투 전망 and 환경 대응 only; the value is the second line of the 전투 전망 `?` help (`실패 시 사망 위험 {N}%`, same frozen value) and a line of the NPC detail (User 2026-09-24, v2.9.0)
- existing Injury/Condition state that is already part of that snapshot

Do not show:
- exact expedition Success probability
- exact hidden Hazard readiness thresholds (0.75 / 0.40) and Defense formula — the Gate-level `대응 {N} 필요` and `{능력치} {n}당 대응 1 제공` are public Gate facts (§HAZARD NUDGE; User 2026-09-24 revision, v2.9.0)
- exact Great Success probability

The displayed 실패 시 사망 위험 % follows the exact pre-supply calculation owned by `DUNGEON_HAZARD_v2.8.0.md`. It means the chance that an ordinary failed expedition escalates to Death; it is not the unconditional probability of Death across all expedition attempts.

After any Item purchase commits during the same customer visit:
- displayed Combat Forecast remains the original pre-supply snapshot
- displayed Hazard Readiness remains the original pre-supply snapshot
- displayed 실패 시 사망 위험 % remains the original pre-supply snapshot
- do not replace them with post-commit `접전 -> 우세`, `불안 -> 충분`, or `12% -> 5%` answer feedback

The underlying runtime preparation **does** change.
Actual expedition Resolve uses the final committed Items / Fatigue / Condition state (User 2026-09-24, v2.9.0).

Post-commit feedback should instead explain exact actual changes and their sources:
- direct Item Stat / Counter / 피로 회복 N
- proven Fatigue recovery / penalty-band change
- another explicitly owned Trait / Relic / Boss effect

This keeps the UI informative without grading the Player's Item choice before the remaining-slot decision.

#### Exact player-facing copy

Header:

```text
보급 전 원정 전망
```

전투 전망 `?` help is two lines; the second is `실패 시 사망 위험 {N}%`. `실패 시 사망 위험` as a readout cell label with its own `?` is retired (User 2026-09-24, v2.9.0).

Exact copy ownership -> `COPY_WORLD_VOICE_v2.8.0.md` §PRE-SUPPLY EXPEDITION OUTLOOK — EXACT COPY; help lines -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-1.

### SALE — GATE VS ITEM INFORMATION

Gate-side shows qualitative readiness:

```text
Hazard name
Stat pressure
충분 / 대응 / 불안 / 취약
```

Item-side shows exact ingredient values:

```text
Core Stat +N
Hazard Counter +N
피로 회복 N
explicit penalty
```

The Gate's 충분 Counter requirement (`대응 {N} 필요`) and the Core-Stat conversion (`{능력치} {n}당 대응 1 제공`) are Gate-level facts shown on every Hazard row, the SALE destination plate included (`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`); the plate has no `?` help; no per-customer remaining need is shown and readiness stays 충분 / 대응 / 불안 / 취약 (User 2026-09-24 revision 2, v2.9.0).

### SALE — DECISION-ONLY ITEM DETAIL

The SALE customer decision surface does not show expandable sections that look strategically meaningful but only contain non-actionable flavor.

Remove from SALE:

```text
이 손님에게 안 걸리는 효과
상품 설명
```

when `상품 설명` is flavor-only.

Keep directly readable:
- exact Core Stat effect
- exact Hazard Counter
- exact 피로 회복 N (User 2026-09-24, v2.9.0)
- explicit penalty
- Insurance behavior when relevant
- price / stock / affordability

Flavor text may remain in Item data or another already-existing non-decision context.
This rule does not require a new encyclopedia/detail screen.

### SALE — MATCHING-EFFECT EMPHASIS — RETIRED

Retired (User 2026-09-24, v2.9.0): no effect text is emphasized against the customer's Gate; every effect text keeps the default style. No badge, no verdict word, no reorder. The row's effects stand in the fixed per-category order (`ITEM_v2.8.0.md` §PRESENTATION ORDER), the same for every customer.

### SALE — TRANSACTION RESULT STUB

(User 2026-09-24, v2.9.0): on each successful sale a receipt stub (`.receipt-stub`, paper texture, a stamp-in motion) appears over the counter band above the dock for about 2.5 seconds and reads `단골도 {±N} · 소지금 {A} → {B}` (COPY_AUDIT §4-24). It reserves no height (the tray keeps its own rules), never blocks input, is replaced by the next stub, and under `prefers-reduced-motion` appears and disappears without motion. On a refusal the customer's reply line (drawn from the engine's reason pool) is the result surface; no stub.
ORDER offer rows follow the same rule against today's open Gates (§ORDER — ITEM INFORMATION HIERARCHY; User 2026-09-24, v2.9.0).

### SALE — COUNTER TRAY

User-approved composition change (User 2026-09-24, v2.9.0): the per-row price panel is replaced by one counter tray.

- the counter tray is a fixed band directly above the dock, outside the scrolled column, at every width
- tapping a shelf row puts that Item on the tray; the row is only highlighted, the shelf rows never change height
- §SALE — SHELF ORDER (User 2026-09-25, v2.9.0): rows are ordered by days left before discard, nearest first, ties in the existing order, the same for every customer; each row's price column carries the chip `폐기 N일`, emphasized (the warehouse list's `.soon` color) at 1 day or less; no Item is non-expiring, so no `유통기한 없음` state survives on the tray, the ORDER row or the warehouse
- tray contents, top to bottom: one header line (Item icon · name · kind · sell price · stock · shelf life, and `{손님}에게 · 소지 {N}G` at the right), the `판매 후 변화` delta list (§SALE SELECTED-ITEM INFORMATION; may be one wrapping line), the `특수 효과` line when any, then the three price keys (§SALE — PRICE ROLE WORDS)
- empty tray: on DAY 1~3 of a Run while the account tutorial is not skipped, one line (the exact prompt -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23); otherwise the empty tray has no height (User 2026-09-24, v2.9.0)
- the price keys therefore always sit in the same place; a successful sale clears the tray (the Item went into the Bag) and shows the transaction result stub (§SALE — TRANSACTION RESULT STUB); a refusal keeps the Item on the tray with the refused key locked
- the hand-over (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1) starts from the tray icon
- height budget at 360: empty tray ≤ 48px, filled tray ≤ 200px, and at least three shelf rows stay visible with the tray filled; shelf rows are compact (one name line + one effect line)
- COUNTER TRAY FOLD (User 2026-09-25; the User's own suggestion, recommended form taken while the User is away - to reconfirm): on a phone a filled tray folds to its header line (Item, customer, wallet, a small ▲) when the player scrolls the shelf past 32px or taps outside the tray, a shelf row, the dock or an overlay; tapping the folded strip or any shelf row (the one already on the tray included) opens it again. The selected Item never changes by folding, nothing is saved, and a desk (≥1024) never folds
- the shelf row's effect line states every effect of the Item in the ITEM §PRESENTATION ORDER order (it stopped at two before); a longer line steps its type down (14 → 13 → 12 → 11px) to stay one line at 360 rather than wrap or be cut; 구급키트 and 황금 1+1 쿠폰 read their core on the shelf only (`중상 → 부상 · 부상 → 무사`, `다음 소비품 효과 2회`) while the tray's `특수 효과` and the codex keep the full line (User 2026-09-25)
- on a desk (≥1024) the tray sits under the shelf column only, above the dock; the dossier column runs down beside it (§SALE — DESK LAYOUT; User 2026-09-25, v2.9.0)
- COUNTER FEEL (User 2026-09-25, v2.9.2 H2; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H2;
  acceptance -> UI_UX_QA UI-Q-v29-31): the pressed price key travels down 3px in 60 ms and returns in 60 ms (일반 intensity,
  no hold). On a successful sale the tray that was pressed stays in place, inert, for that press only (its Item icon hidden:
  the Item travels as the A1 hand-over), then the counter draws without it; the A8 stub stamps in (1.12 → 1, 200 ms) from the
  key's landing frame instead of the draw. A refused key is pressed the same way while A6 shakes it. The register's first
  coin tick is the impact (×1.3); 바가지's tick run starts 40 ms later on a lower first tick (×0.75), the 1 / 2 / 3 count and
  its 70 ms spacing unchanged. No counter-band bump, no faster second sale, no sale-count overtone, no combo or streak UI.
  Under reduced motion there is no press or held tray and the stub appears at once; the end state is identical
- the FINAL preparation screen keeps its per-row panel (FINAL_EXPEDITION_v2.8.0.md §3)
- tap-only; no drag, no minigame, no new Save field

### SALE — FORECAST PIN

(User 2026-09-25, v2.9.0) On a phone the readout scrolls away with the dossier while the Player works the shelf.

- while the readout is outside the scrolled column's view, one floating line shows the same two readings at the top of the scrolled column, where the readout sat: `전투 전망 {우세|접전|불리}` and `환경 대응 {충분|대응|불안|취약}` — the same frozen SALE-entry values and colours, never a second source
- while the readout is on screen the pin is not shown; on a desk (≥1024) it is never shown (the readout sits beside the portrait there)
- one tap folds it to a `전망` chip and back; the fold lasts only until the readout is on screen again — the next time the readout scrolls away the pin opens unfolded; no Save or account field
- it floats over the top of the scrolled column and reserves no layout height; a row it covers is read by folding it; the touch target is at least 44px

### SALE — DESK LAYOUT

(User 2026-09-25, v2.9.0) On a desk (≥1024) the SALE area below the counter band is two areas, not one scrolled column.

- the dossier column (Stat grid, Traits) is its own area on the wood, running down to the dock
- the shelf column holds the shelf on the wood and, under it, the counter tray: the tray takes only the shelf column's width, and the wood above it stays clearly apart from the tray's dark band
- each column scrolls on its own; scrolling the shelf never moves or empties the dossier column
- a redraw of the same customer keeps both columns' scroll positions; a new customer starts both at the top
- phones keep the single scrolled column and the full-width tray (§SALE — FORECAST PIN covers the readout there)

### SALE SELECTED-ITEM INFORMATION

The selected-Item surface (the counter tray, §SALE — COUNTER TRAY) uses one primary heading:

    판매 후 변화

Direct Item changes and deterministic derived changes are rows under that heading.
Do not stack analytical subgroup headings that increase height.

One delta list after choosing an Item (User 2026-09-24, v2.9.0):
- `판매 후 변화` lists only what the Item itself changes — its own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`, `원정 소지금 획득 0%p → 40%p`); no `피로 완화` row and no `피로 {A} → 출발 {B}` line, on the counter tray, the till and FINAL preparation (User 2026-09-25)
- the frozen four-cell outlook is not repainted inside the till and never changes for a selected Item
- `특수 효과` and the shelf-life line stay
- on the counter tray the delta list may be set on one wrapping line, rows joined by ` · ` (User 2026-09-24, v2.9.0)

Source/cause belongs in the existing anchored source popover.

Conditional intrinsic Item functions that do not appear as an immediate numeric delta remain readable under
\`특수 효과\`; do not call them \`이 손님에게는 지금 걸리지 않는 효과\`.

Internal marker rows are never displayed.

### SALE PERMANENT EXPLANATION

The forecast/readiness/death explanation is on demand through the shared anchored popover.
Do not keep a permanent explanatory paragraph under the readout.

### SALE — UNCOMMITTED PREVIEW

Follow `SALE_v2.8.0.md`.

For an uncommitted selected Item, UI may show:
- Item exact effect
- selected price / affordability
- deterministic Fatigue arithmetic (`피로 A -> 출발 B`) (User 2026-09-24, v2.9.0)

Do not show hypothetical derived answer changes such as:
- `접전 -> 우세`
- `불안 -> 충분`
- Great Success signal change

After an actual purchase commits, the displayed pre-supply Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot does not update. Exact proven value/effect changes may still be shown through the post-commit source-truth treatment below.

### SALE — POST-COMMIT DELTA SOURCE TRUTH

Do not update the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 after a committed purchase.
Instead, show exact actual changed values/effects with truthful source attribution where useful.
Do not make a derived preparation change look like a hidden direct Item effect.

If delta text is shown:
- every changed line must be an actual runtime change
- each changed line must expose a readable source class when the cause is not the Item's direct listed effect
- an Item directly changes only the channels listed in `ITEM_v2.8.0.md`
- Food/Drink 피로 회복 that lowers current Fatigue may restore the effective Stats a Fatigue band pressed when the band changes; that recovery is never shown as the Item's own Stat and `판매 후 변화` does not list it (User 2026-09-25; the v2.9.0 `피로 완화` row is retired)

Current `집중 사탕` is the canonical clarity example:

```text
직접 효과 = 공포 대응 +10 / 피로 회복 3
```

Therefore:
- without a Fatigue penalty-band change, it must not show a Core-Stat increase
- if its 피로 회복 releases a Fatigue band, the Stats that band pressed may recover; `판매 후 변화` still lists only its own 공포 대응 / 피로 회복 (User 2026-09-25)

A generic `판매 후 변화` block is acceptable only when direct Item effects and derived system effects are clearly separated.
If that distinction is not immediately readable, remove the synthetic block.
The frozen outlook is not repainted inside the till (§SALE SELECTED-ITEM INFORMATION; User 2026-09-24, v2.9.0).
Do not use post-commit value feedback to replace the frozen pre-supply Forecast / Hazard Readiness / 실패 시 사망 위험 with a newly scored answer.

### SALE — PRICE ROLE WORDS

The three price buttons read `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`, with the small line `이익 {N}G` (or the existing disabled reason) under each (User 2026-09-24, v2.9.0).
Three modes, no extra depth.
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`; price roles -> `SALE_v2.8.0.md` §PRICE ROLE.

### SALE — REFUSAL PRICE CEILING UI

Follow `SALE_v2.8.0.md`.

For the same ordinary customer + same SKU + current visit:
- after 50% refusal, 100% and 150% controls are disabled
- after 100% refusal, 150% is disabled
- after 150% refusal, lower-price controls may remain usable

Requirements:
- disabled higher-price states are visually distinct and non-interactive
- the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A6; User 2026-09-24, v2.9.0)
- Player can read why the option is blocked; exact short copy may be implementation/localization-owned unless separately frozen
- do not disable unrelated SKUs
- do not carry the same-SKU visit lock into a later visit unless another owner explicitly defines persistence
- this refusal-price UI does not appear in Final preparation because Final has no refusal roll and no 100/150 price modes

The ordinary SALE UI must not invite a higher-price reroll after a lower-price refusal.

### GREAT SUCCESS OPPORTUNITY SIGNAL

When the authoritative Great Success opportunity condition is met, show:

`대성공을 노려볼 만합니다.`

The word `대성공` is mandatory.

Exact placement is Work implementation choice, but it must:
- appear before departure
- appear while Player can still change that NPC's preparation
- hide exact Great Success %
- hide internal Combat margin/formula
- not become a master safety score

No signal change while merely selecting/previewing an Item.

After a successful purchase commits, refresh only the Great Success signal from the committed Bag.
No exact probability.

### RETURNING NPC QUICK SURFACE

Use the latest snapshot owned by NPC_TRAIT/SALE.
Preferred compact form:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

On phone the quick surface is not shown: the customer's status strip and the NPC detail 원정 기록 hold the last expedition; on a desk (≥1024) it stays (User 2026-09-24, v2.9.0).
Expanded detail may show actual destination, Item names, and only proven contribution text.

### QUEUE

Do not expose new future-customer Job/Level/Destination/preparation-need hints.
Existing authorized queue-count presentation remains sufficient.

### DEEP SALE UI

While nomination is legal, show `심층원정에 추천`.

After nomination:
- sponsorship payment clear
- changed destination clear
- updated forecast clear
- ordinary Sale continues

### EVENT TEMPORARY BUDGET

When Event purchase budget exists, show persistent Wallet and temporary budget separately enough
to explain affordability.

Do not relabel temporary Event budget as permanent 소지금.

## MOBILE SALE PLAYABILITY

This section is phone-first. Desktop SALE is regression-protected.

At 360 / 390 / 412-class phone widths, ordinary SALE must prioritize the transaction surface over customer presentation.

### Vertical hierarchy

Within the usable SALE viewport above the fixed bottom dock:
- customer / expedition summary occupies about half or less
- Item selection / price / sale interaction receives at least about half
- this is a responsive proportion target, not a fixed-pixel split
- do not crop character art or force equal fixed heights that break on shorter phones
- at first entry, the sale surface must already show the shelf heading and at least one selectable Item row without requiring a scroll
- the counter tray is part of the Item / price surface: empty ≤ 48px, filled ≤ 200px at 360, and at least three shelf rows stay visible with the tray filled (User 2026-09-24, v2.9.0)

Compact the upper area by reducing presentation footprint, not by hiding required decision information.

### Customer speech

Customer speech is a transient overlay and must not reserve permanent layout height.

Exact behavior:
- a new customer/reaction line overlays the upper customer area
- a greeting line auto-hides after 3 seconds; a reply line (buy / refuse) stays 5 seconds (User 2026-09-24, v2.9.0)
- tapping the bubble hides it immediately
- a newly emitted line starts a fresh display of its own duration
- hiding speech is presentation-only; do not add Save/account persistence
- rerendering the same unchanged line must not resurrect an already auto-hidden bubble

### Character / status / destination

On phone:
- move the character block upward into the space no longer reserved by speech
- reduce its footprint enough to return meaningful height to the sale surface
- align it softly with the adjacent status / destination area
- use responsive flow/flex/grid, not forced equal fixed height
- preserve full portrait containment; no crop/stretch
- smaller phones may relax exact alignment rather than overflow
- the Bag slots stay in the customer-state strip beside the status lines (User 2026-09-24, v2.9.0)

### Bag

The normal customer Bag remains exactly two slots.

On phone:
- place them in the available upper-right area
- each slot remains at least ~44px touch class
- keep "가방 used / 2" readable without a tall horizontal strip

On compact/mobile SALE:
- the two slot boxes are always horizontal
- if room is insufficient beside other customer-state elements, the whole Bag block wraps to the next row
- the two slot boxes themselves never stack vertically
- wrapping must not create horizontal overflow

Reference shape:
    가방 0 / 2   □ □

Presentation only; Bag capacity/mechanics do not change.

### MOBILE SALE DENSITY

Mobile:
- remove the decorative waiting/next-customer card/fan
- keep queue progress/count in the bottom Dock only
- use recovered space for current-customer state and decision information

Desktop may retain richer simultaneous queue presentation.

Do not remove the actual queue count.

### BAG PRESENTATION

Do not add a separate `최종 준비 결과` dashboard to the Bag.
The two slots are the handling surface.
At every width the two slots stay in the customer-state strip beside the status line; they remain the handling surface and the hand-over (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1) lands on them (User 2026-09-24, v2.9.0).

Show:
- contents
- focused slot
- replace/remove state
- sequential transaction state

Interaction mechanics -> `SALE_v2.8.0.md`.

## SUPPLY / FATIGUE PREVIEW

Display public deterministic arithmetic from `DUNGEON_HAZARD_v2.8.0.md`.

Example:

```text
피로 9 -> 출발 7
```

This is conditional arithmetic, not Outcome prediction.

Player-facing Fatigue remains numeric (0~40; User 2026-09-24, v2.9.0).
Do not add new `양호/주의/위험` fatigue tiers.
Band names (정상 / 지침 / 과로 / 소진 / 탈진) and their effects are owned by DUNGEON_HAZARD; the band is named from 20 up.

When actual penalty is active:
- 10+ (지침) must have readable Stat-source feedback
- 20+ (과로 / 소진 / 탈진, ceiling 40) must receive strong danger treatment

### FATIGUE SURFACE

SALE main:
- current Fatigue always compactly readable
- if a penalty is active, harmful semantic emphasis
- committed Food/Drink may show 피로 N -> 출발 N (User 2026-09-24, v2.9.0)
- SALE carries no always-on Fatigue line: current Fatigue is the status strip's `피로 N`, the tray shows `피로 A -> 출발 B` only for a chosen Food/Drink that moves it, and the expedition's Fatigue is NIGHT's answer (User 2026-09-24 revision, v2.9.0)

Do not show future Outcome-by-Outcome Fatigue table.

NIGHT main:
    귀환 후 피로 N
    귀환 후 피로 N · {band}

The band is named from 20 up; exact copy and the B5 next-decision line -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6.

Detailed resolved arithmetic opens through the shared popover.

## DANGER DETAIL BOUNDARY

Detailed risk view may show:
- Hazard name
- pressured Core Stat label (User 2026-09-24, v2.9.0)
- system-level meaning of readiness signal

Do not show:
- recommended SKU
- recommended Item category
- optimal combination
- exact hidden Hazard readiness thresholds / Defense formula (the Gate-level requirement number itself is a public Gate fact; User 2026-09-24 revision, v2.9.0)

Tutorial teaches how to read the system, not what to buy.

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
- combined master safety score
- fake precision

Forecast should be clearly labeled as estimate.

First forecast tutorial explains:
actual expedition may differ from prediction.

Destination reliability tutorial explains the system-level rule, not one specific Trait:
`이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.` (exact copy: COPY_WORLD_VOICE_v2.8.0.md tutorial coach)

Do not center the tutorial around 허세.

Authoritative logic:
-> DUNGEON_HAZARD_v2.8.0.md

## STAT PRESENTATION

Player-facing core stats:
- 투력
- 강인함
- 기동
- 정신

Use clear 2×2 presentation where appropriate.

Stat grid pressure tag (User 2026-09-24, v2.9.0):
- beside the Stat name, on the same line (`강인함  독`), when the customer's Gate presses that Stat, a small tag with the pressing Hazard name(s) (e.g. `냉기`, or `독 · 속박` for two); the tag never adds a line or horizontal overflow — it is clipped with an ellipsis before the value would move (User 2026-09-25, v2.9.0)
- the Stat value is one step smaller than before but still larger than the Stat name (User 2026-09-25, v2.9.0)
- 투력 never carries a tag
- no number, no verdict
- the tag is the one place the Stat grid links to the Gate

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
-> NPC_TRAIT_v2.8.0.md

## HAZARD NUDGE

System should help the player notice relevant risk
without solving the puzzle.

Every known authoritative Hazard provides:
- Hazard name
- short Stat/readiness pressure explanation from DUNGEON_HAZARD

Examples (User 2026-09-24 revision 2, v2.9.0; every Hazard row — MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL — the number first):
- 냉기 · 대응 15 필요 · 강인함 3당 대응 1 제공
- 화이트아웃 · 대응 21 필요 · 정신 2당 대응 1 제공
- 부식 · 대응 13 필요 · 강인함 3당 대응 1 제공
- 진창 · 대응 21 필요 · 기동 2당 대응 1 제공
(no `{위험} · {label}` row survives; the SALE destination plate has no `?` help)

Gate detail shows the full Hazard sentence, e.g. `냉기 — 대응 15 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다`;
the sentence forms -> COPY_AUDIT_APPROVED_v2.8.0.md §4-16.

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
-> DUNGEON_HAZARD_v2.8.0.md

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

## SHARED SEMANTIC CHANGE LANGUAGE

For a value compared with its baseline:

    unchanged = default
    beneficial = green
    harmful = red

Meaning, not numeric sign, controls color.

Examples:
- operating cost 140 -> 110 = beneficial / green
- Fatigue 8 -> 12 = harmful / red
- Stat 32 -> 40 = beneficial / green
- Death risk 12% -> 8% = beneficial / green

Replace the generic yellow moved treatment for Stats.

Color is not the only cue; changed values that have a provable source also expose an interaction
affordance.

## SHARED ANCHORED POPOVER

Use one lightweight anchored popover language for:
- Stat source
- Fatigue arithmetic
- deterministic Store Support/Event source
- short help for forecast/readiness/death risk

Behavior:
- no layout-height change
- no background lock
- no confirmation button
- one open at a time
- desktop: hover or keyboard focus; click remains valid
- mobile: tap toggle
- outside tap / Escape closes
- beginning mobile scroll should close where practical
- place above/below according to available viewport room
- normally 2 lines, 3 only where needed

Reuse the existing out-of-flow tip/popover presentation rather than create a second modal system.

## PROBABILITY ATTRIBUTION LIMIT

Do not create a new UI to claim why a random Rare Item/NPC appeared.

Weight/probability effects remain readable in owned support descriptions.

Deterministic source attribution is allowed.

Existing special Event offer presentation, such as an 암시장 special Order row, may name its
Event origin.

## HELP

Per-value/context explanations use anchored popovers, not a modal/accordion that pushes gameplay.

The global 점주 가이드 may remain as reference, but must be shortened to current rules and must
not duplicate detailed internal arithmetic.

Exact help copy -> COPY_WORLD_VOICE_v2.8.0.md.

### GLOBAL HELP

The global 점주 가이드 uses the exact compact Copy owner text.
Do not retain the old long-form rules manual in parallel.

The 점주 가이드 opens with a first block `처음 3일` of exactly five lines (one per phase: 아침 / 발주 / 판매 / 밤 / 마감), followed by one category-grammar line (COPY_AUDIT §8-0, taught once, an explanation of the vocabulary and never a recommendation; (User 2026-09-24, v2.9.0)), then keeps the existing eight sections under a `자세히` disclosure, collapsed by default (User 2026-09-24, v2.9.0).
This disclosure sits inside the help modal, not on a gameplay screen; the anchored-popover rule above is unaffected.
Exact five lines -> COPY_AUDIT_APPROVED_v2.8.0.md §8.

## NIGHT

question=`내 선택이 어떻게 됐을까?`

One adventurer result at a time.

Hierarchy:
1. what happened
2. why
3. what changed

- Result 정보: 원정 fatigue gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, **원정 소지금 획득**.

Importance hierarchy:
- routine success=compact
- meaningful growth/injury/death/decisive Item/callback=stronger visual emphasis
- on 게이트 순례주간, Night may show one compact Event summary line with actual changed count; affected NPC cards show expected -> actual destination

Avoid:
- debug log layout
- giant modifier ledger
- long mandatory animation
- giving every result identical presentation weight

### NIGHT — EXACT CONTROLS

Exactly two Player controls:
- `다음` (on the last result it reads `마감으로`)
- `전체 건너뛰기`

Removed:
- single-result `건너뛰기`
- active `nightSkip` control/API dependency

Both controls remain easy to reach on mobile and neither is visually demoted into a hidden secondary action.

### NIGHT — ACTUAL ARITHMETIC

Keep `다음 / 전체 건너뛰기` controls and proven-causality rule.

Add readable actual arithmetic when relevant:

```text
출발 0
원정에서 +5
음식·음료로 -3
→ 귀환 후 2
```

Exact copy (User 2026-09-24, v2.9.0) -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6.

If First Aid Kit Aftercare actually changed persistent Injury state, that proven contribution may be shown.
Do not add speculative failure-cause diagnosis.

### NIGHT LAYOUT

Information order:
    Outcome
    -> proven sold-Item impact
    -> Level/Stat changes
    -> Fatigue
    -> EXP/Wallet/other

Living Flavor:
- reuse SALE temporary bubble behavior
- around 3 seconds
- may overlap character art
- never cover Outcome / primary result
- result remains after bubble disappears

The Outcome belongs to the returning
adventurer's identity block, not to a title bar over the screen:

    [character art]   [Outcome]
                      [NPC name]
                      [dungeon · Lv]

- the Outcome sits directly above the NPC name and reads one step stronger than it
- it does not become a separate full-width row and takes no vertical space of its own
- no long underline / rule spanning the record
- it is important, but it is not the page's headline

Death has no speech bubble, but it is not moved out
of the message position either: the death line uses the same place beside the character and the
same visual weight as a living adventurer's line, presented as a neutral status / system message.

- no quotation marks, no speech tail, no bubble ground, no utterance styling
- no left accent bar / status stripe, no decorative border, no added icon or badge
- no glow and no blur
- It carries a small status
  container - text-hugging width, modest padding - and nothing else from the bans above. A
  container is not a bubble: what makes it an utterance is the tail, the paper ground and the
  quotation, and none of those return.
- The plate is a COOL SLATE / BLUE-BLACK surface clearly one step
  brighter than the NIGHT background, and it carries its own surface colour as a flat plane
  rather than a black veil laid over whatever is behind it. Its edge must register at once, over
  the character art as well. The text stays a neutral light colour, and no paper / parchment
  speech treatment is used.
  Acceptance is the runtime screenshot: if the plate's plane is not clearly separable from the
  background at 360 / 390 / 412, it FAILS. A background value present in the DOM is not a PASS.
- the existing Death narration copy is reused; no new Death copy is authored
- it is never dropped into a separate narration line under the report body

    LIVING = speech bubble
    DEATH  = neutral floating message

Same position and same information hierarchy; never the appearance of a dead NPC speaking.

The record begins under the return rail and
runs downward. It is not vertically centred in the remaining viewport: a short result - a death,
a quiet return - must not float in the middle of the screen. No spacer is added in exchange, and
no excess dead space is created above the record.

Every Outcome label is the same size:

    36px var(--f-sign)

성공 / 대성공 / 퇴각 / 부상 / 중상 / 사망 / 생환 share it. Per-outcome and per-rank size
overrides are removed, and the NPC name and the Outcome summary keep one size regardless of
which Outcome was resolved. Outcomes differ by copy and tone/colour only.

A death is a closed result, so the player-facing
record shows only:

    death status message, character art, `사망`, NPC name, Dungeon · Lv, Outcome summary

Everything else is absent: no route change, no Deep tag,
no Item / supply cause line, no incident / fact line, no Level / Stat / equipment change, no
injury / rest, no Fatigue, no EXP, no Wallet, no reward or other numeric change row, and no
divider or reserved spacing where any of those regions would be.

A death ends on its summary. The resolution data itself is unchanged; only the NIGHT render
hides it.

The player-facing Stat name is `투력`, so an
equipment Stat bonus reads `투력 +N`, never `전투 +N`. Ordinary prose such as `전투에서 …` is not
affected. Equipment identity and its Stat effect are visually separated - a middle dot or spacing -
and never merged into one run of words. Internal fields and stored strings are not renamed; only
the player-facing output is unified.

The player-facing NIGHT record does not print the
fight verdict line (`적을 물리쳤다.` / `적을 물리치지 못했다.`). It duplicates the Outcome and its
summary. Keeping it at a lower hierarchy is equally disallowed. The resolution data it was
rendered from is unchanged and stays available to the resolver, Closing and QA.

Level / Stat / Injury / Fatigue / EXP /
Wallet and the other aftermath figures are an information region, not display. They use the
ordinary UI type family; the pixel / LED display face is reserved for true display roles such as
the Outcome label. Reading groups, in the owned information order:

    GROWTH     Level, Stat changes
    AFTERMATH  Injury / remaining injury / rest, Fatigue
    REWARD     EXP, NPC Wallet, other settled results

Groups are told apart by spacing and at most one minimal divider. A compact cell is allowed for
Level / Stat, but the region as a whole must not read as a collection of metal badges, and a
read-only figure must never be presented as if it were pressable. A label and its value on one
line is the default; wrapping happens only where the real phone width requires it.

### NIGHT LAYOUT — UNLOCK NOTICE

A NIGHT reward notice that announces a newly unlocked product uses a stable two-line composition:

    새 상품 해금
    {상품명}

The label and the unlocked product name are separate display lines.
Do not rely on incidental width wrapping to split `새 상품 해금 · {상품명}`, and do not allow the
product name to wrap into an awkward fragment merely because the notice width changed.

This is presentation only. It does not change unlock timing, unlock state or reward truth.

### NIGHT LAYOUT — DESKTOP ADAPTATION

The phone composition remains the mobile baseline. Desktop must not render the same phone-sized
record unchanged in a large viewport.

At desktop widths, use the available space for one restrained responsive step across the NIGHT
record:
- returning NPC art may be larger;
- speech / status treatment, Outcome / identity / summary and aftermath typography may scale up
  coherently;
- spacing and the Primary / Secondary controls may scale up to desktop-appropriate presence;
- the record may use a wider desktop measure so it does not read as a small phone panel pinned to
  the upper-left of an otherwise empty screen.

This is responsive scaling of the SAME information architecture, not a desktop redesign.
Do not add new columns, duplicate information or enlarge any one element enough to change the
hierarchy.

The exact 36px Outcome rule is the PHONE baseline. On desktop the Outcome may scale with the rest
of the record, but every Outcome still uses exactly the same size at a given breakpoint.

Likewise, "one NPC size" means one size for all Outcomes at the same breakpoint. It does NOT forbid
one shared desktop responsive size. QA must reject Outcome-specific portrait sizing, not a single
desktop override shared by every Outcome.

### NIGHT LAYOUT — VERDICT STAMP (v2.9.2 H1)

(User 2026-09-25, v2.9.2 H1; the principle, contract and impact budget ->
PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX_QA UI-Q-v29-27.)

The Outcome tag is stamped onto the record after the card stands, instead of sliding in with it.
Presentation only: the tag, words, order and end layout are the ones above; every figure below is
motion-on timing measured from the moment the result comes on screen, and under reduced motion
none of it runs and the record appears in its end state at once.

Weight and timing per Outcome (entry = the card's own arrival; hold = stillness before the stamp;
the stamp itself falls from 1.6 × to 1 × in 90 ms and lands on the last frame):

    성공    일반       entry 200 · no hold · stamp lands 290 · card dips 4 px
    퇴각    일반       entry 240 · no hold · shallow stamp (1.3 × → 1) lands 330 · card dips 2 px
    대성공  중요       entry 220 · hold 100 · one gold stamp lands 410 · card dips 4 px
    부상    중요       entry 240 · hold 120 · stamp lands 450 with red ink spread from the word · dips 4 px
    중상    중요       entry 280 · hold 160 · stamp lands 530 slightly misaligned (−2.5°, 2 px) · dips 4 px
    생환    클라이맥스  entry 240 · the resolved-away Outcome prints (180 ms) · `생환` overstamps it at 510 · dips 4 px
    사망    클라이맥스  entry 240 · hold 60 · no stamp: a black tape lays across under the word (440 ms, ends 740)

- the dip is the stamp's only companion motion: 4 px down in 40 ms and back in 150 ms, inside the
  card; no ring, flash, shake or particle
- the ink spread (부상), the misalignment (중상) and the tape (사망) stay in the end state; they are
  tone, like the tag's cut and colour, and never change the Outcome type size (one size for every
  Outcome, above)
- 생환 (a result carrying `rescued` / `avoidedDeath`): the tag first prints the Outcome the
  Insurance turned away — `사망` when `avoidedDeath`, otherwise `중상` — faint and in that Outcome's
  own tag, then `생환` lands over it and the faint print is gone within 120 ms; nothing of the first
  print remains in the end state. The proof lines under the summary (the Hero Item line and the
  incident line that name the Insurance) cut in on the overstamp frame with no motion of their own;
  that cut-in is the landing's cause response
- 만반의 준비 (User 2026-09-25: a reversal only when a death was turned away): a result whose Death 만반의 준비 turned into
  부상 / 중상 prints `사망` first the same way and its own Outcome overstamps it; the Outcome cue plays on the overstamp and
  there is no `rescue` accent. 강골 and 구급키트 only lower an injury and never reverse
- after-motion has one owner. With a Hero Item line (NIGHT_CLOSING §HERO ITEM FEEDBACK) and no
  reversal, that line settles into place once (160 ms, 4 px, from the landing frame) and the figures
  simply stand at their values. Without one, the REWARD group's figures (경험치, 원정 소지금 획득,
  대성공 본사 보상, the Deep reward) count up from 0 to their values in 220 ms from the landing frame.
  GROWTH and AFTERMATH figures never count. A death has no after-motion
- the whole run fits the time today's entry took (340~760 ms): the last motion ends by 770 ms
- sound: the Outcome cue keeps its notes and its first note plays on the landing frame, with a sharper
  attack and one step louder; 사망 keeps its restrained attack and starts with the tape; on a
  reversal the Outcome cue starts with the first print and `rescue` lands on the overstamp frame.
  The sharper first note is the cue's own shape at every setting; under reduced motion the cues keep
  today's timing (Outcome at once, `rescue` 0.42 s behind it)
- one landing emphasises at most one visual (the stamp), one sound (the Outcome cue's first note, or
  `rescue` on a reversal) and one cause / number response (the Hero line settle, the count-up or the
  reversal cut-in)
- 다음 and 전체 건너뛰기 stay live throughout; pressing 다음 mid-stamp shows the next result's own
  stamp, 전체 건너뛰기 leaves the list without waiting, and a cue still waiting for its landing frame
  is dropped rather than heard over the next screen

## CLOSING

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

Remove redundant accounting-explanation footer from the primary receipt.
The figures themselves remain.

### CLOSING — RECEIPT STAMP (v2.9.2 H4)

(User 2026-09-25, v2.9.2 H4; principle, contract and impact budget -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT;
acceptance -> UI_UX_QA UI-Q-v29-33.)

The receipt body (every row of both figure blocks) prints as one pass - the whole body settles within 200 ms behind
one printer tick, never a tick per row, because this screen repeats every Day for 30 Days. Only the closing `영업 손익`
row lands as a stamp (중요 weight, the NIGHT stamp's own fall reused): a 100 ms hold, the 90 ms fall, the receipt tape
gives 4 px and settles: gold for a profit, red for a loss, the end colour stated in CSS so reduced motion matches it
exactly. No `어제보다 +N` line (stays deferred in the v3.0+ router).

The END tape's `점포 자본 정산` block (META_v2.8.0.md §STORE CAPITAL Run-end settlement structure; the v2.9.1 rates
1 / 2 / 3 / 4 / 5% are unchanged) counts its `현재 점포 자본` row up from the account's prior total to the resolved one
in 320 ms; a quiet `ui` cue marks each Decoration price (500 / 750 / 1000 / 1250, META_v2.8.0.md §DECORATION) the
count passes on the way, read from the same price list rather than a second copy of the numbers. 일반 intensity: no
hold. Under reduced motion the receipt prints and stamps at once and the settlement figure resolves at once.

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
- for a condition-type support only, one runtime status line under them (RELIC §QUICK VIEW STATUS LINE; exact lines COPY_AUDIT §11-32); no HUD, no badge, no verdict word (User 2026-09-24, v2.9.0)
- does not allow purchase/defer/change timing during Sale

Relic should look like a meaningful Run-build choice,
not a minor facility settings menu.

Authoritative:
-> RELIC_v2.8.0.md

### STORE SUPPORT OWNED REFERENCE

When choosing a Store Support, keep the current owned-support reference reachable through the
existing compact detail/modal.

Do not add a new permanent panel solely for this.

### Store-support reference during ORDER / SALE

ORDER and SALE each provide a compact, immediately reachable reference to currently owned 점포지원.

Requirements:
- REUSE the existing owned-Relic data and existing Relic detail/modal content
- do not add a second Relic information system
- the control is available before the player commits the relevant ORDER / SALE decision
- keep the control compact enough that it does not compete with the primary decision surface
- at every width, do not retain a second owned-Relic block lower in SALE: the compact control is the one reference there (the FINAL preparation screen keeps its owned-Relic list) (User 2026-09-24, v2.9.0)

### RELIC VISUAL

Relic keeps existing metal fixture/plate language; purchase reads as metal/brass transaction.

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
-> EVENT_v2.8.0.md

## BOSS / FINAL REVEAL UI

Boss gameplay ownership -> BOSS_v2.8.0.md
Final Family ownership -> FINAL_EXPEDITION_v2.8.0.md
Exact Player-facing wording -> COPY_AUDIT_APPROVED_v2.8.0.md

Reveal sequence:

D5:
`Boss Identity` focused reveal -> D5 Relic reveal

D15:
`Boss Trait` focused reveal -> D15 Relic window decision (`Relic 획득` vs `봉인 해제` when Sloth opportunity)

D30:
D30 Relic window decision (`Relic 획득` vs `봉인 해제` for Sloth) -> Final preparation / lock

### FINAL TIMELINE PRESENTATION

Reuse existing Morning/management/Final surfaces.
Do not add a permanent new Final dashboard.

Required beats:
- D0 Final objective notice
- D10 Boss investigation beat
- D20 Recon dispatch beat
- D25 exact persisted Final Family/Hazard disclosure
- D30 reuse D25 state; no new Family reroll reveal

Boss reveal timing -> `BOSS_v2.8.0.md`.
Final state -> `FINAL_EXPEDITION_v2.8.0.md`.

### BOSS INFORMATION PRESENTATION

All Boss-information beats use the existing Guild investigation dossier family.

### BOSS REVEAL — MORNING LANDS FIRST (v2.9.2)

(User 2026-09-26, the DAY 0 -> DAY 1 overlap reported by the H6 capture; acceptance -> UI_UX_QA UI-Q-v29-35.)

A Boss reveal that is due when MORNING is entered opens once MORNING's own entry has landed: a 420 ms hold (the shutter's
length) after the screen appears, then the dossier opens as it always has. It applies to every reveal stage (the D0 briefing
and D5 ~ D25), because they share one mechanism; the reveal order is unchanged, and no Event or Relic window opens during the
hold. MORNING is shown but takes no input during the hold - the reveal is already owed, and the Day does not advance past it
before it is acknowledged (CORE_RUN §D0 FIRST-MORNING BOSS BRIEFING); a second tap on the 구매 that cut to MORNING does
nothing. The hold belongs to the MORNING it started on: if the Day leaves MORNING or the reveal is no longer owed (only a scripted
path can do either), it ends at once. No new motion, sound or copy. Under reduced motion the reveal opens at once, as before.

### D0 — FIRST MORNING BRIEFING

D0 is basic objective information, not a reveal spectacle.

It appears as the first presentation step of DAY 1 MORNING after the first Store Support choice.
Exact process / persistence -> CORE_RUN_v2.8.0.md.
Exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md.

Presentation:
- no Boss character art;
- no Boss silhouette;
- no Boss domain backdrop;
- no fake unknown portrait;
- no decorative timeline cards;
- the DAY 5 / DAY 30 anchors may use simple typographic hierarchy inside the same dossier;
- the body is two entries under the unchanged header `마왕 조사 개시` and lead line: a `DAY 05` label on the record's LED face over its one line, then a `DAY 30` label over its one line; the closing sentence is deleted; button unchanged; exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md §14-1 (User 2026-09-25, v2.9.0);
- one `확인` acknowledgement;
- compact enough to read as onboarding information, but large enough that the Run objective cannot
  be missed.

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

### D5 / D10 / D15 / D20 / D25

D5/D15/D25 are major reveal / preparation beats.
D10/D20 are intentionally shorter information beats, but Boss presence is NOT reduced to a small
thumbnail merely to communicate lower importance.

For D5/D10/D15/D20:
- use the same centered Boss-art family;
- Boss identity remains visually present across the investigation;
- D10/D20 stay compact through fewer lines / weaker information hierarchy / shorter dossier height,
  not through shrinking the Boss to an icon.

D25 remains information-first because the exact Final Family/Hazard disclosure is the payload.

DIRECTOR DOCUMENT BASELINE — EXACT:
- mobile D5/D10/D15/D20 Boss art max-height: 240px
- mobile D25 Boss art max-height: 200px
- desktop D5/D10/D15/D20 Boss art max-height: 300px
- desktop D25 Boss art max-height: 260px

At 360x800, core information and acknowledgement control must not be pushed below the first
viewport solely by Boss art.

The Boss report sheet is a takeover, not a drawer peeking from the bottom: at phone width it
claims enough of the viewport to read as a report rather than hugging its content.

Avoid both failure modes:
- tiny Boss art floating inside a wide / empty report
- oversized art that buries the report information or creates unnecessary scroll

### DOCUMENT DETAIL — USER APPROVED

Boss art:
- sits directly on the report paper;
- no artificial grey / ink floor line or bottom divider under the character.

D5 Flavor:
- ordinary report text;
- no non-semantic coloured left bar;
- no extra tinted / bordered Flavor box.

D15 Trait:
- hierarchy is `특성` label -> Trait name -> explanation;
- no coloured side bar;
- no replacement text box / tinted panel / bordered card;
- typography and spacing carry the emphasis.

D25 Final Family / Hazard:
- each Family may retain its own left colour rule because that colour is semantic identity;
- do not remove that semantic Family colour;
- remove the extra black horizontal rule above the Family section;
- a thin neutral divider between the two peer Families is allowed where needed for scanning;
- do not turn Hazards into decorative cards.

Information truth remains primary; Boss presence is a co-equal presentation requirement except D25,
where Family/Hazard disclosure must not be visually buried by art.

### D25 — 최종 정찰 보고

If that existing report framing is reused, it belongs to the D25 disclosure beat.

Presentation identity:
`최종 정찰 보고`

Show:
- exactly two Final Families
- each selected Family's actual authoritative T2 Hazard set
- each Hazard's numbered short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`, N for 마왕성 (Day 30 / T2 -> 29), the same row as the MORNING plate (User 2026-09-24, v2.9.0)

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
Use the current `BOSS_v2.8.0.md` truth:
- preview the positive Core-Stat contribution originating from Items before -> after the ×0.50 Boss effect
- no Rarity threshold
- do not show Counter / Fatigue recovery / Insurance / Utility / harmful RiskReward penalty as reduced by this effect (User 2026-09-24, v2.9.0)

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

Player-facing identity uses `탐식의 마왕 글러트니`.
Exact changed Trait title/prose is owned by `COPY_AUDIT_APPROVED_v2.8.0.md`.

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

### FINAL — BOSS REVEAL ENTRY (v2.9.2 H6)

(User 2026-09-25, v2.9.2 H6; principle, contract and impact budget -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT;
acceptance -> UI_UX_QA UI-Q-v29-34.)

FINAL was chosen as the only H6 target after the batch that captured all four candidate hard cuts
(CLOSING, FINAL, END, the DAY 0 screen) and reported them: CLOSING and END already carry their own
content entry (H4's receipt print, H5's seal stamp) once settled, and DAY 0 lands on MORNING's
pre-existing entry, so a further beat there would land on top of one that already exists. FINAL alone
had no `playPhase` branch at all - the D29 receipt cuts straight to the boss backdrop with nothing
softening the arrival.

The `.gate-zero` block (the boss art/backdrop and the name plate together) settles in as one movement
on FINAL's own entry: `translateY 10px -> 0` + `opacity 0 -> 1`, 220 ms, outQuad - 일반 intensity, no
hold, reusing exactly the SALE reveal's own settle numbers (§SALE, `who .figure`). No new sound (the
existing entry into FINAL carries none today and gains none), no new copy, no change to the threat
board or the order form beneath it. Under reduced motion the block is present at full opacity with no
motion, identical to the settled end state.

## FINAL PARTY / PREPARATION PRESENTATION — D30

### PARTY SELECTION

The Final roster is a selection surface, not a rarity gallery.

- up to 3 participants may be selected;
- 1 or 2 participants may be committed deliberately even when 3+ are eligible;
- roster count should read as selection capacity, e.g. `선택 1명 · 최대 3명`;
- rarity remains visible as text;
- rarity-coloured outer frames do not compete with selection;
- unselected cards use a neutral edge;
- selected cards alone own the strong selection frame;
- rarity text may gain one restrained size/weight step if needed, but never outranks the NPC name or causes overflow;
- the party count stays fully readable and is never covered by the floating menu pin.

No ordinary expedition `전투 전망` is shown while the party is provisional.
Use the exact selection guidance owned by COPY_AUDIT_APPROVED.

### PARTY COMMITMENT

`원정대 확정` creates the transition from roster selection to preparation.

If fewer than 3 are committed, use the approved confirmation copy before crossing that boundary.
Its two actions (`돌아가기` / `이대로 확정`) are one geometry family (same object, height and type scale;
meaning differs by semantic weight only), and `돌아가기` is the only visible cancel control.

After commitment:
- the full selectable roster no longer remains the main content;
- only the committed party is prepared;
- ordinary participant swapping is unavailable.

### PARTY-WIDE SUBJUGATION FORECAST

After commitment, show one compact party-level `토벌 전망`.

It is not a per-NPC panel and not a second dashboard.

The forecast:
- is hidden before commitment;
- represents the whole committed 1/2/3-person party;
- updates as Final supplies are committed;
- uses qualitative `우세 / 접전 / 불리` only;
- does not expose Final Power, Boss Power, exact probability or Final Roll.

Use the same forecast/help language as ordinary `전투 전망`:
- the first time `토벌 전망` becomes active, teach it once with the existing Coach system;
- keep the explanation available afterward through the same anchored `?` Help pattern;
- do not keep a standing explanation paragraph under the forecast.

Focused Item detail may still show that participant's concrete stat/effect delta.

Remove from Final preparation:
- ordinary one-NPC `전투 전망`;
- ordinary expedition failure-to-death risk;
- any one-NPC environment forecast presented as though it were the whole Final party.

### FINAL PREPARATION UI — EXACT

After Final participants are selected, reuse the familiar two-slot Item handling surface but remove ordinary end-of-Run haggling/refusal controls.

For each selected participant:

```text
2 Bag slots
Item selection
fixed price = 50% / 매입가
Wallet affordability
commit transfer
```

Required UI behavior:
- show exactly one deterministic Final transfer price for the selected Item: the ordinary 50% / 매입가 amount
- do not show 100% / 150% price controls in Final preparation
- do not show purchase chance, refusal chance, refusal result, or same-SKU refusal-price lock UI
- Wallet remains visible/readable
- stock remains visible/readable
- if Wallet is insufficient, the transfer action is disabled/non-committable and the affordability reason is readable
- after a valid commit, stock and NPC Wallet update immediately before the remaining-slot decision
- Player Gold increases by the same fixed amount and may update through the existing Gold presentation
- Gross Sales increases by the same fixed amount exactly once
- participant remains limited to two slots
- Player may leave a slot empty
- no second free-equip screen after this surface
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
- Boss-caused visible Item changes use the actual current Final truth

No extra GREED-specific counter panel is required solely for this transfer; use the existing Gross Sales truth and current Boss presentation.

### FINAL ITEM / WALLET FEEDBACK

No-effect Item:
- visibly blocked;
- use the approved Demon-Castle wording;
- do not expose `Final` as a player-facing system term.

Insufficient Wallet:
- show exact required/owned Gold in the current Item/transfer area;
- disable the transfer action;
- use an inline/system status treatment;
- no NPC refusal speech;
- no large alert modal.

Final preparation does not reuse ordinary SALE purchase/refusal chatter.

Blocked transfer (no-effect / insufficient Wallet / Bag full): the reason is a compact inline status in
the Item/transfer area; the disabled transfer action keeps its normal face and does not carry the reason.

Final action labels never wrap by accident on mobile; explanatory body / Item-effect text may wrap normally.

### FINAL RESULT — SEAL STAMP (v2.9.2 H5)

(User 2026-09-25, v2.9.2 H5; principle, contract and impact budget -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT;
acceptance -> UI_UX_QA UI-Q-v29-30.)

A Final ending carries one seal on its tape: a carved seal bearing the Boss's name, struck at the right of the headline.
- clear: vermilion, square-on, crisp; the heaviest landing in the game - the tape stands still 200 ms, the seal falls from
  2 × to 1 × in 90 ms (the NIGHT stamp's fall) and the tape gives 6 px and settles (170 ms)
- failure: the same seal struck lighter (1.6 ×, the tape gives 3 px), faint, crooked and only partly printed - a run
  verdict in paper language; never the NIGHT death tape
- one seal whatever the party size (1~3); no seal on a non-Final ending
- the existing headline and reason follow the stamp: they settle in (160 ms, 4 px) from the landing frame; while a seal
  is present they keep clear of it and break at word boundaries
- sound: one cue on the landing frame (`sealwin` rings up out of the Boss motif's root, `sealfail` falls under it); the
  departure's own `final` cue is unchanged and plays once
- presentation only: the seal is aria-hidden, the headline states the result; under reduced motion the seal, the text
  and the cue are there at once and the end state is identical

## STORE MANAGEMENT / DECORATION

Reuse the existing Codex/management space.

Show:
- current Store Capital
- four fixed Slots
- owned/unowned
- purchase cost
- exact current effect
- equipped Decoration

Purchase requires explicit confirmation and spends once.
Loadout is editable only outside an active Run and frozen after Run start.

On a pre-Run/foundation store-management screen, an explicit way back to the new-Run preparation
screen must exist. Mobile system/back navigation must not strand the Player on a blank state.

Live store renders equipped Decorations at fixed store locations.
No free-placement editor / levels / rarity ladder / random Decoration shop is added.

### Pre-Run Decoration empty-slot interaction

A Decoration Slot with no equipped Decoration is a neutral state, not a warning.

Required:
- remove the inherited "주의 ·" treatment from "비움"
- each Slot row, including "비움", is actionable before a Run
- tapping a Slot row opens 점포 장식 (the codex tab formerly labelled 점포 관리; (User 2026-09-24, v2.9.0)) focused/scrolled to that exact Slot
- REUSE the existing store-management panel; do not create a second Decoration selector
- during an active Run, keep the existing read-only/frozen-loadout rule

### DECORATION DECISION SURFACE

Store-management purchase/equip comparison shows:
- name
- exact effect
- price / ownership
- equipped state

Decoration Flavor prose is not shown on this decision surface.

No new Collection screen is added solely to preserve that Flavor.
Existing Flavor data may remain in data/Codex-ready form.

### STORE GROWTH SURFACE

Store Capital / Decoration management and run-end settlement requirements remain active exactly as owned by META_v2.8.0.md and CORE_RUN_v2.8.0.md.

## META UI

Meta gameplay ownership -> META_v2.8.0.md

Player-facing Meta presentation must make these source-of-truth concepts distinct:
- Job × Boss clear matrix
- Job Mastery 0..7 per Job
- Total Job Mastery
- Distinct Boss Clear 0..7
- approved 1/3/6 unlock milestones
- Monster Knowledge `보급 생환 N회`

Do not present legacy Global Meta XP as current progression.

## MENU / SETTINGS — EXACT COMPOSITION

Top-level Menu exactly:
- 모험가 수첩
- 도감
- 점포지원
- 이번 영업의 장식
- 점주 가이드
- 설정
- 현재 지점 포기

Menu row behavior (User 2026-09-24, v2.9.0):
- 점포지원: while a Store Support window is open and purchasable (RELIC §reopenAllowed, `canBuyRelic`) it opens the selection surface; otherwise it opens the owned list `보유 점포지원` (a closable modal), never the selection surface with nothing to choose
- 이번 영업의 장식: read-only, the four Slots of this Run's frozen loadout as `{Slot 이름} · {장식 이름} · {효과 한 줄}`; an empty Slot reads `비어 있음` (COPY_AUDIT §1-7); 세계관 vocabulary only (영업 · 점포), never 런
- 현재 지점 포기: the confirm of COPY_AUDIT §1-3; on confirm the Run is discarded at once (CORE_RUN §CURRENT RUN ABANDON) and the screen returns to 새 점포 준비 with no Run, where Decorations can be bought and equipped; a new Run starts only from `첫 점포지원 고르기`
- the DAY 0 첫 점포지원 surface has no way back: the retired `장식 구성 다시 보기` button is gone; the choice is mandatory and the surface has no close
- 점포지원 and 이번 영업의 장식 and 현재 지점 포기 appear only while a Run exists

Top-level removed:
- Sound Toggle
- Full Data Reset

Settings contains:
- 저장 내보내기
- 저장 가져오기
- Sound On/Off
- BGM
- SFX
- Full Data Reset

Settings does **not** contain:
- 현재 지점 포기

### MENU / SETTINGS VISUAL

The Run-abandon action remains top-level, remains separate from Full Data Reset, and uses exact label `현재 지점 포기`.

Visual direction:
- Menu = one surface + row navigation, not dashboard-card grid
- subtle separators
- destructive action separated with muted red
- optional restrained brass marker
- Settings = one utility panel
- preserve native semantic controls
- native `input[type=range]` may be CSS-reskinned, not replaced by a new slider framework
- mobile hit target remains ~44px class

### SETTINGS / DEBUG BOUNDARY

Ordinary Player settings are localized and gameplay-facing.

Developer reproducibility Seed controls do not appear on the ordinary pre-Run screen.
Technical runtime footer copy is removed from ordinary settings.

This does not require adding a new Debug menu.

### BUILD MARKER (v2.9.3)

(User 2026-09-26; acceptance -> UI_UX_QA UI-Q-v29-36.) A QA marker so a play report can name the build it was played on.

- the opening screen (no Run: the `던전 앞 편의점` title under the preparation panel) shows `v{version} · {commit}` in its top-left
  corner, small (10 px) and muted, above the preparation panel's shade so it stays readable; it is not a control, takes no space
  from the title and appears on no other screen
- `{version}` is the project version (2.9.3); `{commit}` is the deployed commit's first 7 hex characters, written into `build.js`
  by the Pages deploy step; a local or unstamped build reads `dev`
- the console prints the same on load (`GUILD24 v{version} · {commit}`) and `Guild24.build` returns `{version, commit}`
- the one technical label the opening screen carries (User-approved); ordinary settings still carry no runtime footer

## RUN ABANDON UX

Confirmation must clearly communicate:
exact confirmation copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` (현재 지점 포기 Confirm)

Legacy XP / settlement / reward promise must not appear.

## QA / DEBUG REPRODUCTION ACCESS — EXACT

Ordinary Player UI does not expose reproducibility Seed input or a visible Debug menu.

Removing those Player-facing controls must not remove deterministic QA access.

Supported manual QA path:

1. Start from a controlled Account state:
   - Full Data Reset, or
   - import the exact Save fixture required by the test.
2. Open browser Developer Tools -> Console.
3. Start a deterministic Run with:
   `Guild24.game.start('<seed>'); Guild24.render();`
4. During an active Run, inspect the persisted gameplay state through either:
   - `Guild24.showDebug()`, or
   - keyboard shortcut `Ctrl+Shift+D`.
5. The Debug surface exposes the existing debug payload including:
   - seed
   - RNG state / last RNG
   - ORDER offers
   - current NPC
   - current Dungeons
   - resolved Results with debug evidence
   - Boss debug state

The Console / Debug path is development and QA access only.
It must never be promoted into ordinary Player navigation merely to preserve reproducibility.

When a Player-facing QA/debug control is removed, QA must verify both:
- the control/copy is absent from the ordinary Player surface
- the equivalent deterministic QA capability remains reachable through the development path above

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
- tutorial does not add page height (sole exception: the DAY 1~3 task line, exactly one line; §TUTORIAL — TASK LINE; User 2026-09-24, v2.9.0)
- tutorial does not push layout
- bubble repositions responsively
- target may scroll into view
- one concept per step
- contextual first-use preferred
- `건너뛰기` skips the current screen's marks only; later screens still teach their own (User 2026-09-24)
- completion persisted
- reload does not restart completed tutorial

Do not use:
large green instructional cards inserted into normal flow.

### TUTORIAL — TASK LINE, DAY 1~3

On DAY 1, 2 and 3 of a Run, while the account tutorial is not skipped (`tutorial.skipped` false), one fixed text line sits at the top of the phase screen content — under the menu pin, above the first block — on MORNING, ORDER, SALE, NIGHT and CLOSING (User 2026-09-24, v2.9.0).
- gone from DAY 4; DAY 0 (Store Support takeover) has none
- hidden when the tutorial is skipped
- not a coach mark: no spotlight, no button; one text line that never wraps to two on 360
- reuses the tutorial state; adds no Save field
- the one User-approved exception to "tutorial does not add page height" (exactly one line)
Exact strings (`오늘 할 일 — …` per phase) -> COPY_AUDIT_APPROVED_v2.8.0.md §3.

### TUTORIAL — FIRST-ORDER COACH ORDER

The first-ORDER coach group is, in this order: `gates` → `offer` → `quantity` → `confirm` → `reroll` (User 2026-09-24, v2.9.0).
- `gates` anchors the ORDER 오늘 brief block; `offer` anchors the first offer row
- `quantity` and `confirm` keep their approved lines; `reroll` keeps its line and is now last
- the `gold` mark is retired (the register reads itself)
- one concept per step still holds
Exact strings -> COPY_AUDIT_APPROVED_v2.8.0.md §3-7.

### TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER

Hazard tutorial teaches:
- each Hazard pressures a Core Stat
- natural Stat and Item Counter both contribute
- readiness is summarized by 취약/불안/대응/충분

Supply/Fatigue tutorial teaches one fact, on the counter tray's `피로 회복` row the first time a Food/Drink is chosen for a fatigued customer (User 2026-09-25; it sat on the retired `피로 A → 출발 B` row):
- Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신

First SALE (User 2026-09-24): five marks only — destination, Hazard, Stats (the customer's own 능력치: they differ by Job / rarity / Level, 투력 drives combat, the other three answer the Hazards; COPY_AUDIT §3-7 STATS), outlook, price. Great Success, Supply,
returning customer and Bag marks are contextual and appear the first time their situation exists.

Do not teach `독이면 X 아이템을 사세요` or equivalent solution scripts.

### TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY — REQUIRED

A true fresh current account must actually see the tutorial entry again.

Follow `CORE_RUN_v2.8.0.md` for the exact fresh-init boundary.

Required:
- after Full Data Reset, tutorial completion/dismissal state is cleared
- on the first applicable flow of the newly initialized current account, the tutorial appears / starts according to the existing tutorial sequence
- stale v1~v7 tutorial flags must not suppress the tutorial after fresh v8 initialization
- deleting/rejecting legacy internal-test state and creating fresh v8 must produce the same tutorial-eligible state as a clean first install
- ordinary Run Abandon / new Run under the same current account does not need to replay the tutorial if the tutorial was already completed

Implementation must first audit whether the existing tutorial sequence still functions end-to-end.
If the tutorial already exists, reuse it and fix its trigger/persistence/reset path rather than creating a replacement tutorial system.

### GREAT SUCCESS TUTORIAL

Contextual Tutorial explicitly teaches:
- `대성공` exists
- it is above ordinary Success
- extra preparation can raise its chance
- Great Success has an additional reward
- on a **normal expedition**, Great Success gives the Store an additional Gold bonus

Player should understand why another useful Item can matter even when ordinary
Success already looks likely.

### 만반의 준비 TUTORIAL

(User 2026-09-25, v2.9.1 balance.) Contextual, like the other first-time marks: shown once per account, the first time
the Player fills BOTH Bag slots of a customer who is uninjured and whose departure Fatigue (the tray's `출발 B`) is
below 20 — the moment 만반의 준비 (`DUNGEON_HAZARD_v2.8.0.md` §Preparation / Level Death reduction) is first achieved.
- anchor: the customer's Bag slots on the SALE counter
- teaches the condition and the effect in words only; no number, no percentage
- persisted and reset with the other tutorial marks (§TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY)
- exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3-7 만반의 준비

### FIRST STORE SUPPORT TUTORIAL (DAY 0)

User decision 2026-09-24. The first screen of a new store is the DAY 0 Store Support takeover, so
the tutorial begins there: three marks read the takeover (what a Store Support is, how a card
reads, what the key does and when more candidates arrive) and never name a pick. They are the one
exception to "no mark over a modal", shown over the takeover itself, on DAY 0 only, and persisted
per account like every other mark. Exact copy: COPY_WORLD_VOICE_v2.8.0.md §TUTORIAL COACH COPY.

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
-> COPY_WORLD_VOICE_v2.8.0.md

### COPY / TUTORIAL UX RECOVERY

Already-approved terminology must be used:
- 폭식 -> 탐식
- 전리품 -> 원정 소지금 획득
- 탈출 보정 -> 탈출 확률
- 부상 위험 -> 부상 확률
- 1200G / 24칸 -> 1000G / 18칸
- 교환권 30G -> 50G
- 설정 · 저장 -> 설정

Tutorial/Help must reflect:
- injury / Severe Injury
- fatigue / fatigue recovery
- ORDER confirm / Reroll / 영업 시작 separation
- D10/D14 unlock
- current Save/Reset behavior

Stale Night single-skip instructions are prohibited.

## FUNCTION / FLAVOR VISUAL HIERARCHY — EXACT

On Player decision surfaces, Function must read before Flavor.

Function / Effect:
- 14–15px class
- weight 600
- normal/high contrast
- numeric conditions and exact rule effects belong here

Secondary factual:
- 13px class
- weight 400
- dimmer than Function

Flavor on a decision surface:
- 12–13px class
- weight 400
- lower contrast than Function
- 1–2 lines recommended
- no numeric condition/rule payload

Event Reveal:
- Flavor: 13px / 400 / dim
- Effect: 15px / 600 / primary

Morning Event slip:
- Flavor: 12px class
- Effect: 13px / 600

Codex/Lore Flavor may remain 13px / 400 / dim and may use italic presentation.

NPC Dialogue:
- 14–15px class
- normal speech-bubble treatment

Death Narration:
- 13–14px class
- dim/report treatment
- no quotation marks or speech bubble

Boss D5 is an exception:
its Boss-specific Flavor is primary reveal content and must not be mechanically demoted by the
ordinary decision-surface Flavor rule.

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

Required mobile visual QA widths:
- 360px
- 390px
- 430px

At each width verify with actual browser screenshot/manual inspection:
- no zoom required for core text
- current phase question/action is obvious
- no desktop composition merely scaled down
- no clipped sticky action / safe-area overlap
- game scene remains useful, not a space-consuming poster above the decision

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

## AUDIO FEEDBACK

Audio presentation principles (voice / hierarchy / phase BGM identity) -> PRESENTATION_PRINCIPLES_v2.8.0.md.

### BGM audibility

At BGM 100% / SFX 100% on a real phone speaker:
- BGM must be continuously and clearly audible during normal play
- routine SFX should still read above it
- do not solve this by globally lowering all SFX
- keep the existing player-owned BGM/SFX sliders and master mute

First REUSE the current audio system and raise/calibrate the BGM source/bus as the smallest fix.
If the synthesized loop remains too thin even at a correct level, replacing the BGM content with local free audio assets is allowed.

External audio, if used:
- development-time download is allowed
- Runtime must not depend on CDN/network playback
- vendor the files into the repository
- prefer CC0/public-domain; otherwise use a license that explicitly permits modification and redistribution in a game
- no NC / unclear-license material
- retain source/license attribution in the repository
- keep file size and mobile load cost reasonable
- preserve day / night / boss mood separation rather than one generic loop

### SFX coverage

Do not add a unique sound to every click.

Required semantic coverage:
- soft UI navigation/select feedback for visible interactive controls where silence currently makes the screen feel dead
- quantity change
- ORDER confirm
- store/open transition
- Item select
- ordinary 50% / 100% / 150% sale distinctions: one register family, 1 / 2 / 3 coin ticks; no mode sounds like the correct answer (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A5; User 2026-09-24, v2.9.0)
- `손님 보내기` customer exit (`depart`): recorded utility cue, door / step family (User 2026-09-24, v2.9.0)
- refusal
- Gold gain vs spend distinction
- Relic purchase
- Decoration purchase and equip/unequip
- special Guild action
- reroll
- liquidation/rescue
- depart / return / day close
- Night outcome severity
- Boss reveal / seal / Final departure
- unlock/discovery reward

REUSE existing cues where their semantic identity already fits.
Only add new cue assets/types where reuse would make two meaningfully different actions sound misleadingly identical.

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

## FONT / VISUAL QA BOUNDARY

Must verify:
- mobile 360~390 and 412-class widths
- desktop 1024 and 1280+
- no ORDER/SALE/Settings wrap overflow
- price/%/Stat number legibility
- ordinary SALE 50/100/150 immediate scanability
- Final fixed-price presentation does not show ordinary 100/150 controls
- no runtime network font request
- no player-facing glyph loss
- required font license notice retained

Avoid:
- literal-object button proliferation
- icon on every row
- round-all-cards
- unnecessary gradient/shadow
- touch-target sacrifice
- desktop dashboard-card proliferation
- new nested modal structures

## QA

Acceptance criteria -> UI_UX_QA_v2.8.0.md

## RELATED

game philosophy -> 00_GAME_CORE_v2.8.0.md
run phases / Final timeline / fresh init -> CORE_RUN_v2.8.0.md
order / Economy / Final Wallet / Gold -> ECONOMY_ORDER_v2.8.0.md
sale -> SALE_v2.8.0.md
night/closing / Night result -> NIGHT_CLOSING_v2.8.0.md
npc presentation -> NPC_TRAIT_v2.8.0.md
item info -> ITEM_v2.8.0.md
relic choice -> RELIC_v2.8.0.md
forecast / Fatigue / Supply -> DUNGEON_HAZARD_v2.8.0.md
event reveal -> EVENT_v2.8.0.md
final expedition / Final preparation -> FINAL_EXPEDITION_v2.8.0.md
Boss modifier truth -> BOSS_v2.8.0.md
Meta / Store Capital / Decoration -> META_v2.8.0.md
copy/voice -> COPY_WORLD_VOICE_v2.8.0.md
exact player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md
presentation principles / audio -> PRESENTATION_PRINCIPLES_v2.8.0.md
UI acceptance -> UI_UX_QA_v2.8.0.md
