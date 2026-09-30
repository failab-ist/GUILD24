# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings,typography,visual_material,final_preparation_ui,functional_design,visual,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
DOC_VERSION=2.9.12
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.12
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

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

Strong GUILD24 Sign Green is store-sign / environment material and a beneficial semantic colour; it is not a primary-action
treatment (v2.9.9: no dock Action uses it, `영업 시작` included). Do not use it as the repeated primary treatment for:
- 영업 시작 / 발주 확정
- Relic purchase
- SALE progress/finalize
- NIGHT next
- CLOSING next day
- save/export

Material direction (the dock Actions follow §PRIMARY ACTION GRAMMAR, which owns them):

| Action | Material direction |
|---|---|
| MORNING 문 열기 | Wood shutter |
| 영업 시작 / 발주 확정 | ORDER steel on the paper, frost lit edge (one face) |
| 점포지원 구매 | Metal / Brass |
| SALE 손님 보내기 | Quiet dark counter key |
| NIGHT 다음 | Muted cobalt, flat |
| 첫 점포지원 고르기 / CLOSING 다음 날 / 다음 점포 열기 | BRICK (첫 점포지원 고르기 with its rivets) |
| FINAL gate bar | its own red |
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

게이트 임시 폐쇄가 있는 날(User 2026-09-30): 닫힌 게이트는 열린 게이트 판 뒤에 흐린 판으로 남는다 — 이름에 취소선,
`오늘 폐쇄` 도장 하나, 위험 줄 없음. `위험 보기` 창과 ORDER `오늘` 줄에도 같은 표시가 붙는다(EVENT §52, COPY_AUDIT §13-52 · §4-21).

### DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER)

(User 2026-09-25, v2.9.1 balance.) The Run's cumulative Death count and the current segment limit
(`CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED) are always on screen at MORNING and ORDER, in the top status line —
not only in the 도감.
- one compact item: count / current limit / the Day the segment ends; exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23
- warning color when one more Death ends the Run (count = limit − 1)
- one exception (User 2026-09-29, v2.9.11 quick patch): on ORDER the player may fold the floating box, Death line included,
  to a `요약` chip (ORDER — FLOATING TODAY LINE); the count is back with one tap
- the limit shown already includes 추모 방명록 and 위령제
- no extra popover, badge or explanation text; the same line on both screens
- exact placement is settled by the screenshot review of the implementing batch (PRESENTATION_PRINCIPLES)
- ORDER — FLOATING TODAY LINE (User 2026-09-25; confirmed as built, User 2026-09-26, v2.9.3): the Death line floats at the top of the scrolled 발주서; once the `오늘` block (visitors and the per-Gate count) has gone under it, the same `오늘` line joins that floating box under a thin rule with its own small `오늘` label, so it reads as a second fact, not part of the Death count. While the block itself is on screen the box carries the Death line only. No new copy; the line is the block's own text without the `위험 보기` button. v2.9.11 quick patch (User 2026-09-29): the ledger's `발주 후` joins the box the same way, last (under `오늘`), once the ledger line has gone under it - the same value, moving with every quantity tap, in the ledger's short color when below zero; the Death line stays first. Each copy appears only while its own source is under the rail. The box has one type ladder (User 2026-09-29): every line is a small label - `사망`, `오늘`, `발주 후` - in one shared column, and its value in one face and size (the Death line's own words, split into label and value); tight padding and a hairline between lines. Fold (User 2026-09-29): a key at the box's top-right folds the whole box - the Death line too - to a small `요약` chip on its right and back; folded is an account-level presentation choice kept across Days and reloads until the player opens it again; on a phone the key and the chip keep clear of the menu pin

### ORDER — WAREHOUSE PANEL (User 2026-09-29, v2.9.11 quick patch)

The warehouse is off the 발주서 and held apart, like a game's storage, so it can be read against the offer rows while
ordering. It is a steel rack of 칸 with an orange beam, apart from the floating Death box's brown and the 발주서's paper:
one cell per slot the store has, each held unit in its own cell (its icon and days left, 1 day or less in the warning
color), grouped by Item; the empty cells are the room left. The icon is the one the offer rows show; the Item's name is the
cell's reader label (nothing is hover-only).
- Desk (1024 px and wider): the 발주서 is set left and the warehouse is a large rack on its right,
  always open, following the scroll, below the menu pin.
- Phone: a slim `창고 N / M칸 · K종` handle on top of the dock, always there. It is a row of the dock, so it never covers an
  offer row. It opens the rack as a sheet rising from the dock, at most 45% of the screen, with its own scroll.
  - The sheet does not dim or lock the form: the rows above it still scroll and take taps, and the rows under it can be
    scrolled above it. Only the handle (`열기` / `닫기`) or Escape closes it; a quantity tap keeps it open.
  - Open or folded follows ORDER — WAREHOUSE DISCLOSURE: folded on a fresh account, then as the player last left it.
- The header: small `창고` label, `N / M칸`, `K종` - the floating Death box's label / value ladder. No new copy.
- ORDER CONFIRM's crates drop into the new cells of the rack on screen (the desk column or the open sheet); with the sheet
  folded, the handle's figures move on the last landing.

### MORNING — DAY SIGN FLIP (User 2026-09-29, v2.9.11)

Arriving at a new Day's MORNING within the session, the ceiling DAY sign's number rolls once: yesterday's number rises
out as today's rises in.
- One easing curve for both numbers, so they stay one line apart and never overlap.
- 300 ms, inside the number's own box, no sound (the MORNING shutter already sounds). It keeps PRESENTATION §GAME FEEL
  BEAT's general contract: at most 320 ms, inside its panel, never blocks input.
- A reload or a redraw of the same MORNING shows the still sign; reduced motion never starts it.
- When it lands, the number is plain text again (the DOM ends as it began).
- Presentation only: it reads the Day and writes nothing.
- The full-screen DAY transition stays unadopted (it would need a GAME FEEL contract exception).

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
4. offer list + quantity (base=6; authoritative modifiers may increase count)
5. Full-offer reroll + current cost/state
6. sticky confirm

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
   - one small line under the Item name: `{category} · {rarity}` — the category word (`음식 / 음료 / 포션 / 야외장비 / 보험 / 특수`,
     the words the Events and Store Supports already use; User 2026-09-27, v2.9.10) and the rarity name (`일반 / 고급 / 희귀 / 영웅 /
     전설`) in its rarity colour, a paper-legible shade of the shelf tile's hue — identity facts, not a role chip (User 2026-09-24,
     v2.9.0)
2. exact actual effect, in the ITEM §PRESENTATION ORDER — EXACT order (Hazard Counter → 피로 회복 → Core Stat → the rest;
   User 2026-09-28, v2.9.10 quick patch); an explicit penalty keeps its place in that order and its cost colour
3. economy / stock metadata
   - the 본사 1+1 행사 offer (EVENT §02) wears a small red `1+1` sticker on the corner of its `매입` tag, as a store marks a 1+1 shelf
     (User 2026-09-28, v2.9.10 quick patch); the
     metadata line carries no `1+1`
   - the price tag reads `매입 {N}G` - the offer's actual buy price today, what 발주 spends - and a smaller, muted tag under it reads `판매 {N}G`; the metadata line keeps `수익 +{N}G · 재고 · 공급 · 유통기한` and loses its `매입 {N}G` (User 2026-09-26, v2.9.6: the unlabelled tag showed the sale price on the screen that spends the buy price)
4. quantity interaction
   - a `+ / 1 / 3 / 최대` blocked by store Gold or warehouse space stays dim but answers a tap with the reason toast; an offer whose whole supply for today is already in the cart answers `오늘 공급 최대 수량입니다.` (exact lines COPY_AUDIT §3-9; User 2026-09-24, v2.9.0; supply line User 2026-09-25)
   - an offer whose whole supply for today has already been ordered reads as sold out (User 2026-09-27, v2.9.10): the paper a
     shade worked and a quiet `품절` stamp under its metadata line instead of the quantity controls - name, effects and prices stay
     readable, nothing is greyed

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
Since the v2.9.11 quick patch the summary and the list live in the ORDER — WAREHOUSE PANEL (the phone's handle and sheet, the
desk's column), not on the 발주서; the collapse rule above is the phone sheet's.
- the collapsed summary line still states the held-stock summary
- used/remaining capacity is never hidden inside the collapsed detail
- ORDER CONFIRM (User 2026-09-25, v2.9.2 H3; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H3;
  acceptance -> UI_UX §QA UI-Q-v29-32): on 발주 확정 one crate per ordered SKU - its warehouse row's icon - falls onto its row
  (the NIGHT stamp's 90 ms fall) in a cascade whose step is at most 70 ms and shrinks so the last landing is within 320 ms;
  each row's count goes from its prior value straight to the resolved one on its crate's landing (never a unit at a time), and
  a SKU new to the warehouse brings its row in with its crate. v2.9.11 quick patch (User 2026-09-29, §ORDER — WAREHOUSE
  PANEL): the warehouse is a rack of 칸, so the SKU's new cells - the ones past its prior count - drop in together on its one
  landing; the beat per SKU, its step and its budget are unchanged. The warehouse figures - the summary `N / M칸` and `N종` and the
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
- the outlook (`전투 전망` / `환경 대응`) and the four Core Stats are ONE recessed plate with one seam between them, not two
  stacked boxes; the space that frame and gap took goes to the shelf, which must never get less room than before (User
  2026-09-27, v2.9.9; acceptance -> UI_UX §QA UI-Q-v29-43). The desk layout is unchanged

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

### SALE — SHELF LIP (v2.9.9)

(User 2026-09-27; acceptance -> UI_UX §QA UI-Q-v29-45.) On SALE each shelf row ends on the thin edge of a board of the display
case (a lit line over its shadow, 2 px inside the row's own padding), so the goods stand on a shelf. The row's dark face,
type and height are unchanged, so the shelf shows as many rows as before; the open row keeps its board under its recess.
The whole row is not turned to wood (legibility of the price and stock first).

### SALE — SHELF HEAD (v2.9.9)

(User 2026-09-27; acceptance -> UI_UX §QA UI-Q-v29-45.) The `진열대 {N}종 · {M}개` head is one step lower (5 px above and below)
and its `점포지원 {n} / {m}` plate compact (24 px), so the shelf gets that height back. The plate keeps its own frame so it
still reads as a control to press, and its touch target stays about 44 px through an invisible margin around it.

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
- `연속 부상 출발 {n}회` — one thin, small line directly under the readout `.top` (under 전투 전망), only when the customer departs injured and `{n}` ≥ 1 (the first injured departure adds nothing to the failure Death chance); `{n}` is the NPC detail row's number, the chain of injured departures behind this one; words only — no %, no verdict, no `?`, no new color (User 2026-09-26, v2.9.5)

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

### SALE — CUSTOMER ARRIVAL (v2.9.10)

(User 2026-09-28.) The customer's card walks up to the counter - a few steps in from the side (~0.56 s) - instead of sliding
in. A newcomer's portrait is fetched only when they arrive (they do not exist before SALE opens), so until it is decoded the
card holds a plain silhouette (head and shoulders, no art) and the portrait rises into it when ready, at most 1.5 s later;
every other customer of the Day is fetched the moment SALE opens, so theirs is ready. No loading screen, no copy. Under
reduced motion the card is simply there.

### SALE — COUNTER TRAY

User-approved composition change (User 2026-09-24, v2.9.0): the per-row price panel is replaced by one counter tray.

- the counter tray is a fixed band directly above the dock, outside the scrolled column, at every width
- tapping a shelf row puts that Item on the tray; the row is only highlighted, the shelf rows never change height
- §SALE — SHELF ORDER (User 2026-09-26, v2.9.7): rows are ordered by kind - 대응 장비 (gear), 음식, 음료, 포션, 보험, 특수 - then days left before discard, nearest first, then higher Rarity, ties in the existing order, the same for every customer. The discard day a row sorts by is the one it showed when that Day's shelf first appeared, so no sale moves a row within the Day (a row only leaves when it sells out; the next Day sorts afresh); each row's price column carries the stock's shelf life - `폐기까지 N일`, then `내일까지` / `오늘까지` on its last two days (User 2026-09-27/28, v2.9.10;
  the tray and the 재고 정리 list read the same) - emphasized (the warehouse list's `.soon` color) on its last day; no Item is non-expiring, so no `유통기한 없음` state survives on the tray, the ORDER row or the warehouse
- every shelf row and the tray name the Item's category in the same small tag after its name (`음식 / 음료 / 포션 / 야외장비 /
  보험 / 특수`, User 2026-09-27, v2.9.10); the icon tile's bottom edge is the Item's rarity colour on the shelf row and on the
  tray alike
- tray contents, top to bottom: one header line (Item icon · name · kind · sell price · stock · shelf life, and `{손님}에게 · 소지 {N}G` at the right), the `판매 후 변화` delta list (§SALE SELECTED-ITEM INFORMATION; may be one wrapping line), the `특수 효과` line when any, then the three price keys (§SALE — PRICE ROLE WORDS)
- empty tray: on DAY 1~3 of a Run while the account tutorial is not skipped, one line (the exact prompt -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23); otherwise the empty tray has no height (User 2026-09-24, v2.9.0)
- the price keys therefore always sit in the same place; a successful sale clears the tray (the Item went into the Bag) and shows the transaction result stub (§SALE — TRANSACTION RESULT STUB); a refusal keeps the Item on the tray with the refused key locked
- the hand-over (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1) starts from the tray icon
- height budget at 360: empty tray ≤ 48px, filled tray ≤ 200px, and at least three shelf rows stay visible with the tray filled; shelf rows are compact (one name line + one effect line)
- COUNTER TRAY FOLD (User 2026-09-25; the User's own suggestion; confirmed as built, User 2026-09-26, v2.9.3): on a phone a filled tray folds to its header line (Item, customer, wallet, a small ▲) when the player scrolls the shelf past 32px or taps outside the tray, a shelf row, the dock or an overlay; tapping the folded strip or any shelf row (the one already on the tray included) opens it again. The selected Item never changes by folding, nothing is saved, and a desk (≥1024) never folds
- the shelf row's effect line states every effect of the Item in the ITEM §PRESENTATION ORDER order (it stopped at two before); a longer line steps its type down (14 → 13 → 12 → 11px) to stay one line at 360 rather than wrap or be cut; 구급키트 and 황금 1+1 쿠폰 read their core on the shelf only (`중상 → 부상 · 부상 → 무사`, `다음 소모품 효과 2회`) while the tray's `특수 효과` and the codex keep the full line (User 2026-09-25)
- on a desk (≥1024) the tray lies in the middle area on the counter, between the customer's ledger and the shelf, and never covers the shelf (§SALE — DESK LAYOUT; User 2026-09-30)
- COUNTER FEEL (User 2026-09-25, v2.9.2 H2; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H2;
  acceptance -> UI_UX §QA UI-Q-v29-31): the pressed price key travels down 3px in 60 ms and returns in 60 ms (일반 intensity,
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
- the strain line rides along (User 2026-09-28, v2.9.9 quick patch): when the readout carries `연속 부상 출발 {n}회` (§SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT), the pin carries the same line under its two readings — the same condition, words, number and small muted type; the pin grows by that line and still reserves no layout height; the folded chip stays `전망`

### SALE — DESK LAYOUT

(User 2026-09-30, "PC판 전용으로 분리"; supersedes the two-area desk of 2026-09-25.) A desk (≥1024) draws its own SALE - not
the phone's column re-flowed - from the same pieces, so every text, key and action is the phone's:
- above the counter: the customer stands large behind the counter (the card as tall as the band allows over a lower area
  of at least 300 px), with the state and Bag, the outlook and the destination beside them and the waiting line at the far end
- the counter top: one band, a hard edge and one cast shadow (PRESENTATION §Edge / material)
- under it, the player's side, three areas: the customer's ledger (the last expedition, the four stats, the Traits), the
  counter tray in the middle on the counter (an empty counter is the bare counter), and the shelf
- the ledger and the shelf each scroll on their own; a redraw of the same customer keeps both positions, a new customer
  starts both at the top; the tray never covers the shelf, and a desk never folds it
- the phone's second readout in the column and its forecast pin are phone pieces and are not drawn on a desk
- crossing 1024 while SALE is open draws the other layout
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
- on 게이트 순례 주간, Night may show one compact Event summary line with actual changed count; affected NPC cards show expected -> actual destination

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
PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX §QA UI-Q-v29-27.)

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

Primary (v2.9.7, User 2026-09-26): the cash-flow receipt - opening Gold, the Gold that moved in and out, closing Gold with the
Day's change, then stock / waste counts and tomorrow's operating estimate (rule and rows -> NIGHT_CLOSING §CLOSING — CASH FLOW
RECEIPT — EXACT).

Expedition story belongs to Night.

Remove redundant accounting-explanation footer from the primary receipt.
The figures themselves remain.

### CLOSING — RECEIPT STAMP (v2.9.2 H4)

(User 2026-09-25, v2.9.2 H4; principle, contract and impact budget -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT;
acceptance -> UI_UX §QA UI-Q-v29-33.)

The receipt body (every row of both figure blocks) prints as one pass - the whole body settles within 200 ms behind
one printer tick, never a tick per row, because this screen repeats every Day for 30 Days. Only the closing `보유 자금` figure (the Day's end Gold, in the box that also holds `영업 손익`)
lands as a stamp (중요 weight, the NIGHT stamp's own fall reused): a 100 ms hold, the 90 ms fall, the receipt tape
gives 4 px and settles. The figure stays cream; only the `영업 손익` figure beneath it is coloured - green up, red down,
gold at exactly 0 (User 2026-09-26) - each colour stated in CSS so reduced motion matches it exactly. No `어제보다 +N` line (stays deferred in the v3.0+ router).

The END tape's `점포 자본 정산` block (META_v2.8.0.md §STORE CAPITAL Run-end settlement structure; the v2.9.1 rates
1 / 2 / 3 / 4 / 5% are unchanged) counts its `현재 점포 자본` row up from the account's prior total to the resolved one
in 320 ms; a quiet `ui` cue marks each Decoration price (500 / 750 / 1000 / 1250, META_v2.8.0.md §DECORATION) the
count passes on the way, read from the same price list rather than a second copy of the numbers. 일반 intensity: no
hold. Under reduced motion the receipt prints and stamps at once and the settlement figure resolves at once.

### END — THIS RUN BLOCK (v2.9.12)

(User 2026-09-30, A안; acceptance -> UI_UX §QA UI-Q-v29-54; review `reports/v3.0-prep.md` §9-7 F1 / F2, §9-8-1-A.) GAME_VISION
Design Pillar: when a Run ends, "이번 판은 이런 가게였다" has to stay. The END tape carries one block for it, `이 점포의 기록`,
between the `지금까지 연 점포` block and `점포 자본 정산` - read as the story, then the settlement, then 본사 해금, then the
replay line.
- five rows, in this order: `버틴 날` (`DAY {N}`), `손님` (the customers who visited · `단골 {N}`, the regulars the Run
  made), `돌아오지 못한 사람` (the Run's Deaths, 0 printed as 0 - a Run that lost no one is a fact of this Run), `가장
  성장한 손님` (`{이름} Lv.{N}`, the highest Level among the customers who visited, the dead included; a tie goes to the
  higher Loyalty), `원정` (`{N}건 · 대성공 {N}`, every expedition record of the Run's customers)
- a Run with no expedition (a DAY 1 bankruptcy) prints no `원정` row; names of the lost are not listed (the notebook's
  `돌아오지 못한 사람` list holds them)
- read from what the Run already holds - no new save field; the settlement block (META §Run-end settlement structure)
  and the replay line (§END — REPLAY NUDGE) are unchanged
- exact copy -> COPY_AUDIT §10-4

### END — REPLAY NUDGE (v2.9.4)

(User 2026-09-26; acceptance -> UI_UX §QA UI-Q-v29-37.) Show, never assign: the END tape tells what this Run left behind,
so the next store reads as a little closer - no task, checklist, progress bar, remaining-count, mission or reward.

- the `본사 해금` row lists every product / Job this Run opened: the distinct-Boss unlocks it already listed, and the D10 /
  D14 first-reach products (META §D10 / D14 PRODUCT UNLOCK), which the Run records when they open; their Day toast stays as it is
- when the Run opened nothing, one line may sit at the foot of the tape, above `도감에서 보기` and in bold (User 2026-09-30) - the first that applies:
  1. this settlement carried Store Capital across the price of a Decoration the account did not own at that settlement
     (before < price <= after; judged once, so a purchase made from the ending does not change the receipt): `점포 자본으로 새 장식을 들일 수 있다.` - never a Decoration's name (each Slot offers two)
  2. the Run beat the account's best Day (META §BEST DAY): `지금까지 가장 오래 버틴 점포다 · DAY {N}`
  3. the Run beat the account's best 총매출 (META §BEST DAY; User 2026-09-30): `지금까지 가장 많이 판 점포다 · 총매출 {N}G` -
     N is the settlement's `총매출` row as the tape prints it
  4. otherwise nothing
- no new motion or sound: the line prints with the receipt body; exact copy -> COPY_AUDIT §10-3

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

(User 2026-09-26, the DAY 0 -> DAY 1 overlap reported by the H6 capture; acceptance -> UI_UX §QA UI-Q-v29-35.)

A Boss reveal that is due when MORNING is entered opens once MORNING's own entry has landed: a 200 ms hold after the screen
appears (v2.9.10, User 2026-09-28),
then the dossier arrives - the shade at once, the sheet rising 18 px into place in 260 ms with the Boss's art on it (no
separate, later settle of the art). It applies to every reveal stage (the D0 briefing
and D5 ~ D25), because they share one mechanism; the reveal order is unchanged, and no Event or Relic window opens during the
hold. MORNING is shown but takes no input during the hold - the reveal is already owed, and the Day does not advance past it
before it is acknowledged (CORE_RUN §D0 FIRST-MORNING BOSS BRIEFING); a second tap on the 구매 that cut to MORNING does
nothing. The hold belongs to the MORNING it started on: if the Day leaves MORNING or the reveal is no longer owed (only a scripted
path can do either), it ends at once. No new sound or copy. Under reduced motion the reveal opens at once, as before.
After the hold the dossier also waits for the Boss's art to be fetched and decoded, never more than 1.2 s longer, so it does
not open empty and reflow when its art arrives on a phone network (User 2026-09-27, v2.9.10); today's Boss art is fetched
ahead anyway, so on a warm cache there is no extra wait. The page fetches its four fonts with itself, so no screen's digits
wait for their face.

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
- the seal choice and the seal count carry no violet edge bar (User 2026-09-28, v2.9.10 quick patch); the seal choice is its own
  dark violet plate, set apart from the candidate list
- a small `접기 ▼` key at the seal plate's top right says it folds (User 2026-09-28); that key, or a tap on the seal plate anywhere but its `봉인 해제` key, folds it to a chip `봉인 해제 {N} / 3 ▲` (so the last candidate is not
  hidden on a phone); the chip unfolds it; a window opens unfolded and a tap on the candidates never folds it (User 2026-09-28,
  v2.9.10 quick patch)
- `봉인 해제` spends the window as 구매 does and closes it as 구매 does; a window already spent (bought or a seal broken) shows
  `닫기`, never `나중에 결정` (User 2026-09-28, v2.9.10 quick patch - RUNTIME UX BUG: it redrew in place under a decision made)
- the owned Store Support list (the `점포지원 N / 7` chip's sheet) opens, on a SLOTH Run whose seals are revealed (D15 Trait),
  with one line `슬로스 봉인 해제 {N} / 3`; the chip itself does not change (User 2026-09-28, v2.9.10 quick patch)
- Boss reveal is not a new permanent Phase
- reveal Seen state is stable across Save/Reload
- Boss art must not push required decision information excessively below the fold on mobile

### FINAL — BOSS REVEAL ENTRY (v2.9.2 H6)

(User 2026-09-25, v2.9.2 H6; principle, contract and impact budget -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT;
acceptance -> UI_UX §QA UI-Q-v29-34.)

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
- (User 2026-09-30) the last order carries `원정대 후보 보기` beside `원정대 선택`, the same bar: a read-only sheet of the
  same candidates, each opening the notebook with no pick (FINAL_EXPEDITION §D30 PLAYER FLOW); on a phone both bars share
  one row at a smaller face, on a desk they keep the full face
- (User 2026-09-30) FINAL 준비 carries `자세히 보기` under the supplied member's Stat grid - a quiet text control that
  opens that member's notebook read only

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
acceptance -> UI_UX §QA UI-Q-v29-30.)

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

### FINAL — CLASH SCENE (v2.9.9 H7)

(User 2026-09-27, v2.9.9; the exception to the per-beat contract -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT H7;
acceptance -> UI_UX §QA UI-Q-v29-46.)

After `마왕성으로 출발` the result the Final has already
resolved is played out as a card fight over the FINAL stage, then the ending follows as before (§FINAL RESULT — SEAL
STAMP). Nothing is decided by the scene.
- cast: the Boss card above (the Boss's art and name, one health bar) and the party's cards below in one row (portrait,
  name, Lv and job, and a bag of the member's slots under it), one or two members centred; the Boss's own room stays
  behind them. No damage figure, no party bar, no new copy
- entry (~2.1 s, unhurried - User 2026-09-27): the stage darkens, the Boss card drops and lands heavily and holds a moment,
  the party's cards rise one after another, then a held stillness
- supply: each item a member carried to the castle (the resolved Final's own record of their bags) comes up from the
  bottom of the scene into that member's bag, one at a time and a fixed time each (~0.3 s), so a full party takes longer
  rather than faster; an empty-handed member's slots stay empty
- exchanges, one per member in party order: the member's card crouches and lunges to the Boss card's lower edge
  (~0.7 s); the impact only says it landed - the Boss's art glints and the card and its bar jolt; no amount is marked. The
  Boss counters (~0.55 s): its card strikes down and that member's card shakes and flashes red. After the counter the red
  drops by that member's share - on every exchange but the last, whose share is held for the verdict. The Boss counters
  after the last member too, so a clear and a failure run the same way up to the verdict
- verdict (~2.7 s): a stillness (~0.9 s), then the red runs down and slows (~0.85 s) and hesitates near the bottom
  (~0.5 s) - a clear at 5%, a failure where the roll left it - then a clear breaks to empty and the Boss card cracks
  (stepped pixel lines inside its art) and collapses, and a failure stays: the Boss card rises and shakes once and the
  party's cards are pushed back and dimmed. Then the ending with its seal
- the bar is the resolved Final: it loses min(1, rolled Party Power / effective Boss Power) in all, in equal shares per
  member; it only ever falls; a clear ends empty and a failure ends where the roll left it (never visibly empty: at
  least 3% stays). A close clear and a close failure look alike until the hesitation ends; a wide failure stops high, as
  it should
- length: no ceiling (User 2026-09-27) - it follows the party and what they carry (about 7 s for one member, about 10.5 s
  for three carrying six items), and a tap always skips it
- sound: one cue per landing - a low `rumble` on the Boss card's landing, `supply` on each item, `clash` on each impact,
  `counter` on each counter, `collapse` on a clear; the departure's `final` cue and the ending's seal cue are unchanged
- a tap anywhere skips to the ending at once, with the same end state; under reduced motion there is no scene. The Final is
  resolved and saved when `마왕성으로 출발` is pressed, so a reload during the scene opens the ending; the scene keeps no
  Save field

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
Each step of buying or fitting a Decoration (구매, 구매 확정, 취소, 적용, 해제) keeps the pressed row where it was on
screen: the panel never jumps back to its top, so the row just bought is the row the player is looking at (User 2026-09-29).
Loadout is editable only outside an active Run and frozen after Run start.

On a pre-Run/foundation store-management screen, an explicit way back to the new-Run preparation
screen must exist. Mobile system/back navigation must not strand the Player on a blank state.

Live store renders equipped Decorations at fixed store locations.
No free-placement editor / levels / rarity ladder / random Decoration shop is added.

### LIVE STORE DECORATION SEATING

(User 2026-09-27, v2.9.9; acceptance -> UI_UX §QA UI-Q-v29-40.) The store painting is `cover` on the stage: cropped at the
sides on a stage narrower than the file, at the top and bottom on one wider than it (a phone browser with its bars showing).
- 간판 and 벽면 pieces hang on the painted ceiling / wall, so each is placed at its own point of the painting under either
  crop and never on the DAY sign or the board; the 간판 hangs from the same ceiling as the DAY sign and moves left of its
  point only as far as keeps the gap below from the DAY sign
- 진열대 and 계산대 pieces stand on the counter top with the till housing: 진열대 to its left, 계산대 to its right, their feet
  on the housing's base line, sized by the same counter mount as the housing
- each keeps its painted spot while there is room; where that spot would bring it closer to the housing than a fixed gap
  (6 px phone, 10 px desk) it stands at the gap instead - it never overlaps the housing, its label, another piece, or leaves
  the screen
- the pieces are added to a painted room, so their outer outline is light: half an art pixel thick at 55% opacity, the
  room showing through it (User 2026-09-27); a piece that stands on the counter keeps its bottom line (and legs) whole and
  opaque, so its feet stay on the surface; a line another part of the drawing sits on (a trophy's stem, a sign's hangers)
  is outline along its whole length and stays whole where that part touches it, so nothing floats. Interior lines of the
  drawing are unchanged
- the till housing stands on the painted counter top under any crop (User 2026-09-27, v2.9.9 tablet batch): the counter
  band is sized by the drawn painting and moved down by the height the crop takes off its top, so on a portrait tablet the
  housing never floats above the counter; with no crop the band keeps its stage percentage
- a landscape stage 768 px wide or more (a landscape tablet, and a phone turned sideways at any height) takes the desk's
  wide framing of the room and its points: the tall file cropped to a landscape stage shows no counter at all (User
  2026-09-27 closeout: at 844x390 / 932x430 the board, till and plate had left the screen). Below about 500 px high the
  Decoration pieces and the preparation scene still crowd the board and the dock there - an open v3.0 finding, not a rule
- where the crop takes the painted ceiling off the top of the stage, the 간판 hangs the gap below the stage's top edge
- the branch plate keeps its spot on the counter front while it clears the dock Action; where the painted counter runs
  down behind the dock (a portrait tablet, a short desk) it rises to just above the Action instead; it takes its larger
  desk size only on a stage 760 px high or more, so on a 700-high stage it still clears the counter pieces above it
- covered: phone 360~430 at the heights a browser leaves (640~932), and the iPhone SE stage 375x548 (§SHORT PHONE), portrait
  tablet 768~912, landscape tablet 900~1023 and desk 1024~1920

### NEW STORE PREPARATION — STORE SCENE (v2.9.9)

(User 2026-09-27, the reference review of 2026-09-27; acceptance -> UI_UX §QA UI-Q-v29-42.) 새 점포 준비 is not a panel over a
backdrop: it is the store about to open, the same painted room as MORNING (same framing per breakpoint, same bands, same
Decoration seating -> §LIVE STORE DECORATION SEATING), shown whenever there is no Run and, from the ending, after
`다음 점포 열기`.
- the ceiling carries the title logo where MORNING hangs the DAY sign (§OPENING TITLE LOGO), and right under it, centred,
  the branch plate - MORNING's own plate, as the store's name under its title (User 2026-09-27, v2.9.9); the counter
  front carries only the Capital plate (the Slot tags hang at the counter's two ends). On the wide framing the title hangs
  at the 간판's height, so the 간판 keeps the gap from the title as it does from MORNING's DAY sign
- the Slot tags, the branch plate and the Capital plate keep the share of the stage they have on a 360x640 phone (User
  2026-09-27): the tags' type grows with the stage's height past 640 px and, on a wide desk, with its width (never below
  its own size, at most 20 px); the two plates are in the pixel face, crisp only on its 12 px grid, so they step - the
  branch plate 12 -> 18 px on a stage 800 high or 1000 wide and 24 px on one 1000 by 1000, the Capital plate 17 -> 24 px on
  the first step. An empty plaque's tag hangs from the top of its spot, so a grown tag never reaches up into the board; on
  the wide framing the 간판's tag, which runs left from it toward the stage's edge under the painted ceiling fixture,
  stacks its two lines, sits level with the sign's plate rather than its hangers and grows only with the stage's height, at
  most to 15 / 16 px, so it stays inside the stage (a desk caps the stage at 1440 px wide, §RESPONSIVE RULE — DESK STAGE WIDTH) and clear of the fixture
- the board is titled `새 점포 준비` and carries the three lines of the game as one pinned note, then one status line
  (`보유 장식 없음` / `영업이 시작되면 이번 영업에는 고정됩니다.`); a save error, when there is one, is pinned above the note.
  It ends at least 6 px above the Slot places under it: on the wide framing under 800 px high (a laptop browser, a
  landscape tablet) it is one step tighter - the same type, less air (User 2026-09-27, v2.9.9)
- each Decoration Slot is its place in the room: an equipped Decoration is drawn there with a small tag naming the Slot and
  the Decoration; an empty Slot draws nothing and its tag (`{Slot} · 비움`) stands on the spot. Each place is a control
  (§Pre-Run Decoration empty-slot interaction) with at least a 44 px target; a tag is anchored to its piece's edge facing
  the middle of the room and never leaves the screen or covers the logo, the branch plate, the board, the Capital plate,
  the Action or another place. The loadout shown is the Account's planned one
- the Store Capital is a small plate on the counter where the till will stand (`점포 자본 {N}`), not the till: before a
  Run there is no float
- the Action `첫 점포지원 고르기` sits in the dock where MORNING's `문 열기` does. From the ending a secondary
  `결과 다시 보기` sits beside it and returns to the ending; with no Run there is no way back (the choice starts the Run)
- 점포 장식 opened from a place returns to this scene (`새 점포 준비로 돌아가기` / 닫기)
- nothing about the ended Run changes until `첫 점포지원 고르기`

### Pre-Run Decoration empty-slot interaction

A Decoration Slot with no equipped Decoration is a neutral state, not a warning.

Required:
- remove the inherited "주의 ·" treatment from "비움"
- each Slot row, including "비움", is actionable before a Run (v2.9.9: each Slot's place in the store scene, §NEW STORE
  PREPARATION — STORE SCENE)
- tapping a Slot row opens 점포 장식 (the codex tab; User 2026-09-24, v2.9.0) focused/scrolled to that exact Slot
- REUSE the existing store-management panel; do not create a second Decoration selector
- during an active Run, keep the existing read-only/frozen-loadout rule
- a Slot row whose Slot holds a Decoration the account does not own and can afford now carries a small `들일 수 있음` mark at its
  end (a current state, not a "new" flag; no Decoration named); exact copy -> COPY_AUDIT §1-8 (User 2026-09-26, v2.9.4)

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

Do not present legacy Global Meta XP as current progression.

Monster Knowledge has no player-facing surface: the codex `몬스터 지식` tab is retired (User 2026-09-26, v2.9.6; every Gate's Hazards are public from MORNING, so a tab that unlocked them by returns had nothing left to teach). The account record stays, unshown (META §MONSTER KNOWLEDGE).

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

### OPENING TITLE LOGO (v2.9.9)

(User 2026-09-27; acceptance -> UI_UX §QA UI-Q-v29-41; asset record -> reports/ASSETS.md §Title logo.) The opening screen's
`던전 앞 편의점` title is the User-supplied drawn logo, not set type; since the store scene (§NEW STORE PREPARATION — STORE
SCENE) it hangs from the room's ceiling.
- one image, the name as its alt text inside the same `h1`; no extra shadow or frame (the logo carries its own outline and
  extrusion)
- not larger than it needs to be (User 2026-09-27): phone at most 210 px wide or 58% of the width, clear of the build marker
  and the menu, the title block starting 21 px from the top; desk 320 px, starting 14 px from the top; the file is cut to the drawn letters
- the branch name stays visible and not emphasised: in the store scene it is MORNING's plate hanging right under the logo
  (§NEW STORE PREPARATION — STORE SCENE)
- the shipped file is a display derivative (960 px wide, cut to the letters) of the supplied logo, whose 점 받침 was
  corrected to read as ㅁ

### PRIMARY ACTION GRAMMAR (v2.9.9)

(User 2026-09-27; acceptance -> UI_UX §QA UI-Q-v29-44.) Each Phase's one flow Action in the dock - `첫 점포지원 고르기`,
`문 열기`, `영업 시작` (and `발주 확정` in its place), `손님 보내기`, NIGHT's `다음`, `다음 날`, `다음 점포 열기` and the FINAL gate bar -
presses the same way; what differs by Phase is its material, colour, silhouette and place (unify where the hand learns
it, vary where the Phase is recognised).
- same for all: one hard depth cast down-right at 45 degrees, visible on screen (a notched control's cut takes its cast in
  rather than cutting it away); the press moves the face into it diagonally by the depth less 1 px, leaving a 1 px cast;
  label weight 600
- two sizes by consequence: a step inside the Day (`문 열기`, `영업 시작`, `손님 보내기`, `다음`) is 56 px tall on a phone and 60 px on a
  desk (label 18 / 20 px; ORDER's two labels may step down to 16 px on the narrowest phones so the commit's Gold figure never
  wraps); a step across a Day or Run boundary (`다음 날`, `다음 점포 열기`, the FINAL gate bar) is 64 / 72 px (label 20 / 22 px;
  the gate bar keeps its sign face at 21 px); `첫 점포지원 고르기` is 64 px / 20 px at every width, because the counter-front
  plates of the preparation scene sit directly above the dock
- (User 2026-09-30) the one pair: on D30's last order the gate bar `원정대 선택` shares the dock with `원정대 후보 보기`, the same
  bar (a view, not a second flow Action); on a phone both step down to a 16 px face on one row, the desk keeps 21 px
- depth: 5 px across a boundary, 4 px inside the Day; `손님 보내기` 3 px, below the price keys it must not outrank
  (§SALE — COUNTER TRAY); ORDER's `발주 확정` and `영업 시작` are never enabled together and share the 4 px
- edges in two tiers, like the sizes: a step inside the Day is its face, a 3 px lit edge at the top and a 4 px deep edge at the
  foot, with no outline (ORDER's cool frost is the lit edge of both its Actions), and its label sits on a 2 px drop in that deep edge's ink;
  NIGHT's `다음` stays a flat plane (UI_UX §QA: no bevel on that control) and seats its label the same way; a step across a
  boundary keeps its heavier built bevel
- one colour per family (User 2026-09-27): `발주 확정` and `영업 시작` are one steel face with one frost edge, told apart by
  their labels; `첫 점포지원 고르기`, `다음 날` and `다음 점포 열기` are one BRICK build (outline, bevel, cast, press, a label on a
  2 px drop), `첫 점포지원 고르기` keeping only its four rivets; the FINAL gate bar stays its own red
- kept per Phase: MORNING's wood shutter (square, no cut), ORDER's steel on the paper, SALE's quiet counter key, NIGHT's
  muted cobalt with its own deep cobalt cast, the BRICK of `다음 날` / `다음 점포 열기` / `첫 점포지원 고르기` (and its rivets), the
  FINAL gate bar with a cast in its own deep red, a step darker than its foot so the two do not merge (a black cast is lost
  on its black dock); each keeps its place in the dock

### BUILD MARKER (v2.9.3)

(User 2026-09-26; acceptance -> UI_UX §QA UI-Q-v29-36.) A QA marker so a play report can name the build it was played on.

- the opening screen (no Run: 새 점포 준비, v2.9.9 the store scene) shows `v{version} · {commit}` in its top-left
  corner, small (10 px) and muted, above the room so it stays readable; it is not a control, takes no space
  from the title
- 영업 설정 (점포 메뉴 -> 설정) ends with the same `v{version} · {commit}` line, centred, small (11 px) and muted, so the build can
  be read mid-Run (User 2026-09-26, v2.9.7); no other screen shows it
- `{version}` is the current project version (the CHANGELOG head); `{commit}` is the deployed commit's first 7 hex characters, written into `build.js`
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

(User 2026-09-30, v2.9.12, §TUTORIAL — COACH DIET.) The first ORDER keeps one mark, `confirm` (발주 확정). `gates`, `stock`,
`offer`, `quantity` and `reroll` are retired: the 오늘 brief line and `위험 보기`, the 창고 head (on DAY 1 it reads
`창고 · 본사 기본 상품 N종`), each offer row's effect line, the `최대` key and the priced 후보 교환 key say them. The
`gold` mark stays retired (the register reads itself).
Exact strings -> COPY_AUDIT_APPROVED_v2.8.0.md §3-7.

### TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER

Hazard tutorial teaches:
- each Hazard pressures a Core Stat
- natural Stat and Item Counter both contribute
- readiness is summarized by 취약/불안/대응/충분

Supply/Fatigue tutorial teaches one fact, on the counter tray's `피로 회복` row the first time a Food/Drink is chosen for a fatigued customer (User 2026-09-25; it sat on the retired `피로 A → 출발 B` row):
- Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신

First SALE (User 2026-09-30, v2.9.12, §TUTORIAL — COACH DIET): two marks — destination and Stats (the customer's own
능력치: they differ by Job / rarity / Level, 투력 drives combat, the other three answer the Hazards; COPY_AUDIT §3-7 STATS).
The Hazard, outlook and price marks are retired: the Hazard rows say what answers them, the readout title reads
`도착 시 전투 전망`, and price is taught after the fact (§SALE PRICE LESSONS). The Bag mark stays contextual after the first
sale, and the returning-customer mark stays contextual on the first returning customer (no screen says that tapping the
customer opens the notebook).

Do not teach `독이면 X 아이템을 사세요` or equivalent solution scripts.

### TUTORIAL — COACH DIET (v2.9.12)

(User 2026-09-30; acceptance -> UI_UX §QA UI-Q-v29-53; review `reports/v3.0-prep.md` §9-6.) One rule is taught in one
place. A mark stays only where the rule has to be known before the decision and no screen says it; a mark the screen
already says is retired; a rule that can be named after it acts is taught then.
- kept before the fact: DAY 0 `점포지원` (what a Store Support is); MORNING Deep (§FIRST-EVER DEEP EXPEDITION TUTORIAL) and
  the II / FIRE Gate marks (§GATE TIER / FIRE GATE TUTORIAL); ORDER `발주 확정`; SALE destination and Stats; SALE Bag (after
  the first sale) and returning customer (the tap to the notebook); FINAL `토벌 전망`; CLOSING `영업 전 자금과 보유 자금을 비교한다.` (its first clause only - the warehouse
  clause is dropped and the receipt gains no row)
- retired, the screen says it: MORNING 방문객 and 게이트; DAY 0 card and key; ORDER gates, stock, offer, quantity, 후보 교환;
  SALE Hazard, outlook; NIGHT `한 명씩 …` (the `전체 건너뛰기` key says it)
- two words added so a retired mark is not missed: the DAY 1 창고 head `창고 · 본사 기본 상품 N종` while it holds only the
  opening stock, and the SALE readout title `도착 시 전투 전망`
- taught after the fact: price (§SALE PRICE LESSONS), beside the NIGHT discovery marks (NIGHT_CLOSING §DISCOVERY LINE)

### SALE PRICE LESSONS (v2.9.12)

(User 2026-09-30.) Two contextual SALE marks replace the pre-sale price mark, each once per account, persisted and reset
with the other marks:
- the first 150% (바가지) refusal: on the refused key (`오늘 거절됨`)
- the first 50% sale: on that sale's change line (`단골도 +N · 소지금 A → B`), which stays up while the mark is open
- words only; exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md §26-3

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

(User 2026-09-30, v2.9.11.) No coach mark before the fact: the first normal-expedition 대성공 that pays the Store its
Gold bonus names it on its NIGHT record (`NIGHT_CLOSING_v2.8.0.md` §DISCOVERY LINE) - extra preparation raises its
chance, and it leaves the Store an additional Gold bonus. The SALE signal carries no mark.

Player should understand why another useful Item can matter even when ordinary
Success already looks likely.

### 만반의 준비 TUTORIAL

(User 2026-09-30, v2.9.11.) No coach mark before the fact: the first time 만반의 준비 (`DUNGEON_HAZARD_v2.8.0.md`
§Preparation / Level Death reduction) turns away a Death, that NIGHT record names the condition and the effect in words
only (`NIGHT_CLOSING_v2.8.0.md` §DISCOVERY LINE). The same holds for Fatigue (the SUPPLY mark is retired too): the
SALE counter carries no anchor for either.

### FIRST STORE SUPPORT TUTORIAL (DAY 0)

User decision 2026-09-24. The first screen of a new store is the DAY 0 Store Support takeover, so
the tutorial begins there. One mark reads the takeover - what a Store Support is (User 2026-09-30, v2.9.12: the card and
key marks are retired; each card prints its effect and price, and the key, the later windows and `점포지원 N / 7` say
the rest) - and never names a pick. It is the one exception to "no mark over a modal", shown over the takeover itself, on
DAY 0 only, and persisted per account like every other mark. Exact copy: COPY_WORLD_VOICE_v2.8.0.md §TUTORIAL COACH COPY.

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

### GATE TIER / FIRE GATE TUTORIAL

(User 2026-09-30, v2.9.12; acceptance -> UI_UX §QA UI-Q-v29-52.) Two contextual MORNING marks, like the Deep mark: each shows
the first time the board holds such a Gate, once per account, persisted and reset with the other marks.
- a two-Hazard Gate (tier II and III; `DUNGEON_HAZARD_v2.8.0.md` §Family T2): II Gates carry two Hazards, and each Hazard
  presses its own Stat
- a FIRE Gate: one Hazard only, but a higher required Combat Power (`DUNGEON_HAZARD` §FIRE second axis)
- anchor: that Gate's plate on the MORNING board; the rule only, never which Item answers it (§READ THE SYSTEM)
- exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3-10

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

### DESK STAGE WIDTH (User 2026-09-30)

On a desk the stage is at most 1440 px wide, and never wider than 1.65 times its own height - the widest shape
the painted rooms were checked at - so a 1366 x 680 laptop browser keeps a 1120 stage. Two painted rooms keep a 1120
width because they are drawn at the width they are given:
- FINAL's Boss room stays 1120 wide: wider, it grew taller and pushed the hazards and the last order under the fold
- NIGHT's window band stays 1120 wide, centred on the wider stage, its sides the band's own edge colour

### SHORT PHONE (User 2026-09-29)

The shortest supported phone stage is an iPhone SE with Safari's bars showing: 375x548 (the User's call: "SE까지 지원").
It runs in the visual gate beside the 780-high widths, with the User's Galaxy stage (360x597, bars showing). On a portrait stage under 640 high:
- MORNING: the board may run down to 8 px above the till's label, over the painted wall, so the day's Event (its effect line
  included) reads whole and the first Gate plate shows under it. The till, the branch plate and the Decoration pieces stay
  where §LIVE STORE DECORATION SEATING puts them; a 벽면 piece hanging there is behind the board on a day the board fills
  it - the situation reads before the room (§MORNING; User 2026-09-29)
- 새 점포 준비: the note takes the tighter step of the short desk (same type, less air), so the status line stays on the
  board, and the 간판 keeps the gap from the title as it does on the wide framing (the cropped ceiling brings the title
  down onto its painted spot). The title is a step smaller there (180 px at most) and an empty 간판's tag - wider than
  the piece once it carries `들일 수 있음` - runs from the piece's edge nearest the title toward the screen's edge and
  hangs from the top of its spot, under the build mark: it never covers the title (User 2026-09-29, a Galaxy at 360x597)
- SALE keeps its sale-first order (§MOBILE SALE PLAYABILITY). On a portrait stage under 700 high the filled counter tray
  takes one tighter step - the same lines, keys and order, less air, a smaller icon, keys still 44 px or more - so it
  leaves 3 / 2 / 1 shelf rows above it at 640 / 597 / 548 (User 2026-09-30, `reports/v3-prep-measure-v2911.md`
  §4). The three-row floor of UI-Q-v29-18 holds from 640 up; below it the tray folds on a scroll, as everywhere

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

iPhone Safari (User 2026-09-29):
- a quick second tap on a control (quantity +, a repeated price step) never zooms the page; pinch zoom stays available
- a long press on a portrait or a painting opens no save-image menu

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
- AI-generated music the User made for this project is allowed under PRESENTATION §AUDIO PRESENTATION (User 2026-09-29)

### PHASE BGM (v3.0, User 2026-09-29)

Every phase plays a recorded track (`dist/ui/assets/bgm/`, provenance in `reports/ASSETS.md`):

| screen | track |
| --- | --- |
| no Run · 첫 점포지원 · the store about to open (NEW STORE PREPARATION) | TITLE |
| MORNING | MORNING |
| ORDER | ORDER |
| SALE | SALE |
| NIGHT | NIGHT |
| CLOSING | CLOSE |
| FINAL | BOSS |
| the ending of a cleared Run | SUCC |
| the ending of any failed Run (bankruptcy, the death limit, a failed Final) | FAIL |

The ending track never tells the result before the screen does (User 2026-09-29): arriving at the ending, the music of the
screen it came from (BOSS through the Final and its clash, CLOSE after a bankruptcy, NIGHT after the Death limit) plays on
until the result lands - the Final seal's landing frame, or one short beat on an ending with no seal - and only then does
SUCC / FAIL come in, with the ending cue (§ENDING CUE). A reload of the ending plays SUCC / FAIL at once.

Loop rule: a loop keeps the whole track. It is never a section taken from the middle.
- Start stays at the first sound, and moves only past a short, clearly different intro (at most 15 s).
- End stays near the original end (within its last 25 s; BOSS 40 s) and drops only the ending chord, tail or fade.
- Both cuts sit on a beat.
- The chosen points per track and how they were found are in `reports/bgm-loops.md`; the live values are in
  `dist/ui/audio.js`.

Join: a short fade only (at most 60 ms). BOSS alone joins with a 1 s crossfade (User 2026-09-29). A long crossfade is
never the default fix for a join that does not fit.

Playback:
- Every track plays at the same loudness, except NIGHT, which plays 3 dB under the rest: it is the densest track and read
  as the loudest in play (User 2026-09-29).
- BGM stays under the decision and result cues, and the existing ducking applies: the music at -30 LUFS and every cue at
  its §SFX LEVELS tier (User 2026-09-29; measurement `archive/v2.9.11/bgm-sfx-mix-v2911.md`).
- A phase change fades the old track out (1 s). The next track starts only after it, never over it, and rises over 1.5 s,
  so a phase never starts on a hard downbeat (User 2026-09-29).
- Mute or a hidden page stops the music, and coming back resumes it.
- Coming back from a call or another app resumes the sound without waiting for a tap where the browser allows it
  (iOS Safari leaves the audio suspended); otherwise the next tap resumes it (User 2026-09-29).
- The iPhone silent switch keeps Safari's default: while it is on, the game is silent, and it never stops another app's
  music (User 2026-09-29).
- A track that cannot load falls back to the synthesised bed; a phase is never silent because of a load failure.
- The web build ships 128 kb/s copies and fetches the next phase's file ahead, so a phase change does not wait on the
  network; the app ships the originals (User 2026-09-29).
- Playback changes no gameplay state and consumes no Gameplay RNG.

### SFX LEVELS (User 2026-09-29)

The cues were authored 24 dB apart; each now has its own level so a tier sounds as one loudness and every tier sits where
PRESENTATION §Mix puts it. Measured as a phone speaker plays the cue (User 2026-09-29, round 4): its loudest 100 ms window
with nothing under 300 Hz counted (the BS.1770 shelf and a 300 Hz high-pass); audibility as its best 1/3-octave band from
280 Hz up over the music it is heard with (that music's loud 90th percentile, less the cue's own ducking). The music plays
at -30 LUFS (NIGHT -33).

| tier | cues | level | clears its music by |
| --- | --- | --- | --- |
| result | the NIGHT outcomes, the seal and ending cues, the Boss beats, `final`, `collapse` | -19 | 8 dB |
| decision | ORDER / SALE commits (`order`, the price modes, `refusal`), purchases, open / close, `begin` / `newstore`, `rescue` | -21 | 8 dB |
| action | `depart` / `return`, Gold, the ORDER crate, the receipt, `heal`, `fixture`, the clash beats, `supply` | -25 | 5 dB |
| utility | `button`, `ui` | -29 | 3 dB |
| rapid repeat | `quantity`, `quantset` | -31 | 3 dB |

- each cue lands from 1.5 dB under its level to 3 dB over it (a cue may be lifted up to 3 dB to be heard over its music)
- a cue lifted to that ceiling and still masked is its sound, not its level: it is reported for a User decision, never
  lifted further past its tier
- no cue is mostly bass a phone cannot play: its full-range (K-weighted) loudness stays within 6 dB over its level. A low
  cue is heard on a phone through its own overtones at the same pitch and loses what is under its own low cut; the
  effects bus drops everything under 120 Hz (User 2026-09-29: the round-3 fit raised the low cues until they tore)
- the output has a limiter at -3 dBFS, transparent under it; no cue alone peaks over -4.5 dBFS, and the worst moments of
  cues landing together (a sale and its Gold, quantity taps into the ORDER commit, NIGHT outcomes in a row, the clash
  scene, the seal into the ending cue) stay under -1 dBFS over their phase's music at full sliders
- the fitted levels live in `dist/ui/audio.js` (`LEVEL`); the measurement is `tools/qa-sfx-mix.cjs` (in `npm run qa:runtime`)

### DISTINCT CUES (User 2026-09-29)

Cues that mean different things do not sound alike; a shared sound is kept only where sharing is the point.
- apart: the Decoration `fixture` (a wooden double knock) from the FINAL `clash` and from the Store Support `support`; the
  SLOTH seal-break `boss` (shattering glass over a low thud) from the Boss information motif and from the Boss's `counter`;
  the CLOSING `receipt` (one short printer pass) from the ORDER `crate`; the `ui` click (a two-note blip) from the
  `quantity` tick (a bright noise tick)
- shared on purpose: the three SALE price modes (PRESENTATION §TRANSACTION BEAT A5), the quantity stepper and its quick-set
  (one act, the quick-set one step down), the Boss information motif across its strengths
- `ui` and the quantity ticks are synthesised, bright and short, so they are heard over the music at their utility level
  (the recorded ones were masked); the retired files are listed in `reports/ASSETS.md`
- measured by `tools/qa-sfx-mix.cjs` (spectrum shape x loudness contour): every `apart` pair below 0.6; the shared families
  are reported

### ENDING CUE (User 2026-09-29)

Every ending carries its own result cue as the result lands, clearer than the music alone:
- `endwin` - a cleared Run: a rising line to a held major chord
- `endfail` - every failed ending (a failed Final, bankruptcy, the Death limit): a falling minor line onto a low held root
- on the Final ending it follows the seal's own landing cue by 150 ms; reduced motion plays it at once
- it ducks the music under it; it is presentation only and consumes no Gameplay RNG

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
- `첫 점포지원 고르기` (`begin`, a knock and a rising ringing G-D-G) and `다음 점포 열기` (`newstore`, a latch and a short rising
  pair): each its own synthesised cue, because a Run's opening was silent and the way to the next store sounded like a
  tab click (User 2026-09-27, v2.9.9)
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

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### SCOPE

Status values are not stored here. FAIL is valid evidence.
This file defines acceptance criteria only.

Design owner under test -> UI_UX_v2.8.0.md; presentation checks -> PRESENTATION_PRINCIPLES_v2.8.0.md.

### PHASE IDENTITY / VISUAL LANGUAGE

#### UI-Q01 — PHASE IDENTITY
SETUP:
Review Morning/Order/Sale/Night/Closing side by side.

EXPECT:
Each has distinct primary purpose/composition.

PASS:
They do not look like the same dashboard template with different text.

#### UI-Q02 — DASHBOARD SLOP CHECK
SETUP:
Inspect major screens.

EXPECT:
No excessive:
- nested cards
- chips/badges
- same-radius containers
- thin-border boxes
- full-screen brand green

PASS:
Gameplay object/action hierarchy is stronger than container decoration.

#### UI-Q27 — COPY COMPACTNESS
SETUP:
Review all primary screens.

EXPECT:
Short concrete state-based text.

PASS:
No repeated explanatory paragraphs that compete with gameplay.

#### UI-Q28 — DESKTOP/MOBILE PRIORITY
SETUP:
Compare wide and narrow layouts.

EXPECT:
Same information priority, different composition where needed.

PASS:
Mobile is not just shrunken desktop.

#### UI-Q95 — STRONG GREEN SEMANTIC

PASS:
No dock Action uses Strong Sign Green as its face - `영업 시작` / `발주 확정` are the ORDER steel with the frost edge (UI-Q-v29-44);
green stays store-sign / environment material and beneficial semantic colour. Every routine primary action uses its material
direction (UI_UX §STRONG GREEN SEMANTIC table) rather than a generic green CTA.

#### UI-Q97 — TYPOGRAPHY EXACT

PASS:
- Atmosphere = Mulmaru
- Information = Wanted Sans
- no active Galmuri/Pretendard player UI dependency after adoption
- no third font family/theme system
- no runtime network font request
- license notice retained

#### UI-Q98 — TYPOGRAPHY RESPONSIVE QA

Verify at minimum:
- mobile 360~390
- mobile 412
- desktop 1024
- desktop 1280+

PASS:
- no ORDER/SALE/Settings wrap overflow
- price/%/Stat digits readable
- ordinary SALE 50/100/150 quickly distinguishable
- Final preparation shows only its single fixed 50% / 매입가 price presentation and does not leak ordinary 100/150 controls
- no missing Korean/player-facing glyph

#### UI-Q99 — ANTI-GENERIC MATERIAL PASS

PASS direction:
- existing store/paper/wood/metal/slate/receipt language remains recognizable
- no round-all-card/dashboard proliferation
- no unnecessary gradient/shadow/icon-every-row pattern
- touch targets are not sacrificed for visual styling

#### UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH

Run representative MORNING / ORDER / SALE / NIGHT / CLOSING / FINAL screens and Store Support on
phone and desktop.

PASS:
- generic green is not the default primary-action treatment across phases
- green remains readable as beneficial semantic color and may remain as store-sign/environment
  material without becoming the universal CTA
- MORNING reads warm store / wood / gold
- ORDER reads paper / steel / cool frost-blue
- SALE reads register / gold-amber while existing price-mode colors keep their own meaning
- NIGHT reads dark / dusk
- CLOSING reads receipt / paper / ink with restrained neutral/gold emphasis
- FINAL keeps the existing blood / ember-red gate language
- phase differences remain accents inside one GUILD24 component language, not separate skins
- phase-bound overlays remain visually contextual; global management/help/settings remain neutral
- Store Support choice/acquisition does not fall back to generic green CTA as its identity
- semantic benefit/harm colors are unchanged
- action hierarchy remains understandable without color alone

Phone SALE speech:
- the greeting still auto-dismisses around 3 seconds (a purchase / refusal reply line after 5 seconds) and is tap-dismissible (User 2026-09-24, v2.9.0)
- reserves no permanent height
- does not cover the primary action
- where it overlaps the compact customer-state strip, speech text stays fully opaque while only the
  bubble background is approximately 88% opaque
- underlying customer state remains visually recognizable
- whole-element opacity is not used to make the dialogue itself faint

FAIL:
- every phase still reads as the same green-button UI
- a new theme/skin framework is introduced for this polish
- phase accent changes semantic benefit/harm meaning
- transient speech is made faint by lowering the whole element opacity
- speech becomes a persistent blocker for required SALE information

#### UI-Q-v28-31 — DARK PIXEL + CONTROLLED POP / GAME-LIKE INTERACTION

Runtime UX QA, not literal palette inspection.

Audit every Player-facing surface touched by Presentation Polish on phone (360 / 390 / 412) and
desktop (1024 / 1280-class). Store Support must additionally be driven through AVAILABLE /
SELECTED / UNAVAILABLE and both disabled causes.

GLOBAL PASS:
- the screen reads as one GUILD24 2D / pixel game surface, not a web dashboard with a game skin
- the environmental / information base is visually quieter than the current decision
- the few things that need immediate action or attention receive stronger controlled-pop contrast
- action / state hierarchy remains understandable without colour alone
- crisp hard edges / hard depth / flat planes carry the pixel-2D construction
- a pressable Primary Decision Control has clear physical depth / press feedback
- Utility Controls remain subordinate and need not become game objects
- Phase identity comes from material, hierarchy, placement and handling as well as any accent
- gameplay, Save, RNG, information boundary and decision structure are unchanged

GLOBAL FAIL:
- the whole UI is uniformly muted / muddy / military-dashboard-like and the decision no longer pops
- the whole UI becomes candy-colour / arcade-toy loud
- only the hue changed while the underlying interaction is still the same SaaS CTA
- every Phase is the same rectangular CTA with a different colour
- blurred shadow, soft glow, glossy gradient, fake metal or exaggerated bevel is used as the main
  source of game feel
- ornament was added instead of making the action / state clearer
- G24 / 길드24 seal, bolt, badge, frame or decorative mark repeats without functional meaning
- a coloured left vertical bar / status stripe is used as the selected-state shortcut
- visible outlines are added to every button/key by default even when plane + hard depth already separates the control
- border / inset frame / bevel / hard drop are stacked together on ordinary controls without a functional reason
- whole-element opacity is used to communicate unavailable state
- a new theme / skin framework is introduced
- touch target, legibility or accessible naming regresses

COLOUR QA:
- there are no literal Canonical hex values to match
- exact hue / saturation may change without a Design amendment when semantic roles, state hierarchy,
  contrast and this QA remain true
- do not enforce a palette by source guards that merely compare hard-coded colour literals
- semantic benefit / harm colour remains authoritative over decorative accent

PRIMARY DECISION / PHASE HANDLING PASS:
- committing a main choice feels like the Phase's own action rather than a generic web submit
- the Primary Action has presence without outranking the information it acts on
- Boss / FINAL do not collapse back to `image + information card + generic confirm button`
- nested panel hierarchy is reduced where the report / record / gate itself can own the information

PER-PHASE APPLICATION PASS:
- ORDER quantity controls read as one cluster with one recessed numeric readout; peer keys do not
  need decorative outlines, and the commit is the form's strongest physical action
- ORDER quantity hierarchy is item information > readout / stepper > `1 / 3 / 최대`; the quick set
  carries no box, pixel key plane or hard shadow, `- / +` show a face smaller than a full square
  game button, and both keep the mobile minimum touch target
- NIGHT prints the Outcome above the NPC name inside the identity block, one step stronger than
  the name, with no full-width headline row, no record-spanning underline and no vertical space
  of its own
- NIGHT prints the proven rescue Outcome as exactly `생환`
- NIGHT prints no fight verdict line at any hierarchy
- NIGHT shows the Death line in the living-line position at the same visual weight, as a neutral
  status message: no quotation marks, no speech tail, no bubble ground
- NIGHT aftermath figures use the ordinary UI type family, not the pixel / LED display face, read
  as GROWTH -> AFTERMATH -> REWARD separated by spacing or one minimal divider, keep label and
  value on one line except where phone width forces a wrap, and never look pressable
- NIGHT's last result advances with `마감으로`; intermediate results with `다음`
- ORDER's `1 / 3 / 최대` carries the subtle dotted underline when available, sharpens its
  underline / ink on hover and focus, and goes dim and non-interactive when disabled, with no
  whole-element opacity fade; `- / +` keep a 44px touch target and maxQuantity behaviour is
  unchanged (`-` at q=0, `+` at q>=max, `1 / 3` above max, `최대` a q=max shortcut); a control blocked by Gold or
  warehouse space (not by the offer's supply) stays dim but answers a tap with the §3-9 reason toast, and `최대` at 0
  does the same (User 2026-09-24, v2.9.0)
- every NIGHT Outcome label measures 36px `var(--f-sign)` on phone (desktop may scale, one size for all Outcomes), and the NPC name and Outcome summary
  measure the same whichever Outcome resolved
- a NIGHT Death renders zero result-data rows and leaves no divider or reserved space where that
  region would be, and no route change, Deep tag, Item / supply cause or incident line either -
  it ends on its Outcome summary
- the NIGHT Death message sits in the living line's position in a small text-hugging status
  container whose COOL SLATE / BLUE-BLACK plane is clearly one step brighter than the NIGHT
  background and separable from it in the runtime screenshot at 360 / 390 / 412, including over
  the character art: no quotation marks, no tail, no left accent bar / status stripe, no
  decorative border or outline, no icon, no glow or blur, no paper / parchment treatment. A
  background value present in the DOM is not a PASS on its own.
- a NIGHT record starts under the return rail and is not vertically centred: a short result does
  not float in the middle of the viewport, and no spacer or excess dead space replaces the
  centring
- the NIGHT closing-handover control reads immediately as the ACTIVE Primary Action, visibly
  above `전체 건너뛰기` and clearly separated from the NIGHT surface; a flat grey dead-button
  impression FAILS, as do purple / lavender, green, a heavy outline, an inset frame and any
  glossy or bevelled treatment
- that control's plane is a moonlit cold blue / muted cobalt, brighter and more saturated than
  the NIGHT dock and background, with an unmistakably blue hue that has not drifted to
  cyan / teal or gone neon, an ivory / near-white label, and exactly one hard bottom/right depth
  the press collapses. Amber, gold, mustard, brown, purple / lavender, green and a grey
  disabled-like plane all FAIL
- an equipment Stat bonus reads `투력 +N`, never `전투 +N`, with the equipment identity visually
  separated from the Stat effect
- the MORNING shutter pull carries no repeating-stripe gradient, while the register readout glow
  and the SALE sticky scrim remain as functional layers
- FINAL roster header owns the selection count (`선택 N명 · 최대 M명`); the disabled dock remains `원정대 확정` and does not duplicate that count
- SALE price modes read as peer register keys; no key is promoted by a stronger frame, refused keys
  lose depth, and the send-customer action stays Secondary
- NIGHT Outcome is the visual anchor and different outcomes do not read as one identical card with
  only the label changed
- CLOSING remains a receipt / settlement record rather than a grid of KPI cards
- D5 / D15 / D25 Boss art has central presence without displacing required information; D10 / D20
  stay compact
- FINAL reads as one final decision surface; its commit is heavy but not an ornamental giant button

PER-PHASE APPLICATION FAIL:
- ORDER / SALE game feel is created by outlining every key
- SALE semantic mode colour is moved onto three decorative borders when the key labels already carry
  the distinction
- NIGHT / CLOSING are still generic cards with only copy changed
- Boss presence is solved by either tiny art in dead space or oversized art that hides the reveal
- FINAL is still an ordinary page with a differently coloured submit button

STORE SUPPORT PASS:
- AVAILABLE / SELECTED / UNAVAILABLE are distinguishable at a glance by more than colour alone
- no green UI accent is used for Store Support selection / ownership / action / success state
- AVAILABLE owns the strongest controlled-pop action and is the only state that looks pressable
- SELECTED stays in the same base material family, with multiple completion cues and no generic
  success-colour flood
- when card height is unchanged, `보유 중` keeps the AVAILABLE control's footprint but loses
  press depth and hover / active affordance
- UNAVAILABLE recedes while all required copy remains readable
- `선택 종료` / `골드 부족` or the current approved equivalent names the disabled cause rather
  than leaving a dead `구매`
- no vertical selected strip, decorative seal, shiny metal, gradient, blurred glow or heavy bevel

STORE SUPPORT FAIL:
- selected / owned is represented by green
- state distinction rests on one border alone
- `보유 중` shrinks into a web-style status chip while the card itself keeps its full height
- unavailable action still looks pressable
- the card/action palette is so uniformly dull that the screen reads as an admin tool rather than
  a game decision
- exact implementation colour values are promoted back into Canonical without a new User decision

#### UI-Q-v28-25 — TARGETED GRAPHIC POLISH

For each art/icon/crop/scale asset changed under the polish pass:

PASS:
- the object still reads as its current canonical identity
- two distinct gameplay objects are not made visually identical
- no crop hides decision-relevant information
- no decorative layer creates a false mechanic/state implication
- mobile and desktop render without overflow or obscuring the primary action

This QA does not authorize a new Item wave, portrait wave, environment set or theme system.

### FUNCTIONAL LAYOUT / MOBILE / ACCESSIBILITY

#### UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT

This is runtime UX QA, not Source/CSS inspection alone.

Review the current Player flow on real/equivalent browser viewports at minimum:
- phone: 360, 390 and 412 class widths
- desktop: the 1024 breakpoint and a representative 1280-class width

Traverse:
- opening / pre-Run / Store Management
- MORNING
- ORDER
- SALE
- NIGHT
- CLOSING
- Boss-information beats
- Final preparation / FINAL / ending
- Help / Settings / Event / Store Support and other active modal/overlay surfaces

For every reviewed surface, record PASS/FAIL for:
- current information priority is visually obvious
- required comparison information appears before the decision that uses it
- primary action is visible/reachable without unrelated content dominating the path
- no horizontal overflow
- no fixed header/dock/modal covers decision information
- no avoidable blank/dead region caused by grid/flex track stretching or oversized wrappers
- no duplicated label/count/explanation competes with the same fact elsewhere on the surface
- transient content does not reserve permanent empty height after it disappears
- responsive reordering preserves the intended information -> comparison -> action sequence
- desktop does not become a stretched phone layout with excessive empty width/height
- compact mobile presentation does not hide required information merely to fit

A visual defect that materially weakens the current decision is a FAIL even when every DOM node is
technically present.

Do not fix a FAIL by deleting information owned as required by another current Spec.
Escalate any required-rule conflict to the owning Design document.

#### UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY

Across ORDER / SALE / NIGHT / CLOSING / Store Management / FINAL and active modals:

PASS:
- primary, secondary and destructive actions have correct relative emphasis
- selected / disabled / completed states are distinguishable without color alone
- touch targets remain usable on phone
- keyboard focus order follows the visible interaction order
- modal close returns focus to a meaningful origin
- redraw after quantity/selection/price/detail interaction preserves useful scroll/focus context
- action feedback appears near the action/result it explains
- the same concept uses consistent visual semantics across phases
- no new panel/modal is introduced when an existing surface can express the same information

This QA may catch functional layout defects even when they are not covered by another current QA item.

#### UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
SETUP:
Capture actual browser screenshots at 360px, 390px, 430px for:
- Morning
- Order
- Sale
- Night
- Closing
- Relic reveal
- Final prep

EXPECT:
- core text readable without zoom
- unnecessary side gutter minimized
- current decision/action is clear in first viewport
- game art/object does not push necessary decision information excessively downward
- layout is recomposed, not merely shrunken desktop
- sticky action/safe area remains reachable

PASS:
All three widths are practically playable and do not feel like a tiny desktop page.

#### UI-Q22 — TOUCH TARGETS
SETUP:
Inspect repeated mobile actions.

EXPECT:
Practical ~44px-class targets for:
- +/-
- price
- confirm
- next
- reroll
- item/customer selection

PASS:
No dense tiny tap zones.

#### UI-Q23 — SAFE AREA
SETUP:
Test mobile browser with top/bottom chrome and safe-area devices.

EXPECT:
No clipped:
- header
- sticky footer
- primary action

PASS:
Controls remain reachable.

#### UI-Q24 — COLOR-INDEPENDENT SIGNAL

SETUP:
Inspect Trait effect lines, preparedness, selected, disabled states.

EXPECT:
- Trait benefit/cost meaning is not inferred from color alone
- effect wording remains clear without color
- preparedness/selected/disabled states also have text/icon/shape reinforcement

PASS:
Meaning is not color-only and Trait header color is not used as a hidden quality grade.

### MORNING

#### UI-Q03 — MORNING HIERARCHY
SETUP:
Open Morning on both Event and non-Event Days.

EXPECT:
Non-Event Day:
- visitor forecast / Gate / known Hazard are quickly readable

Event Day:
- Event receives a focused opening reveal before Gate detail
- Event title and actual effect are understandable immediately
- after confirmation, the normal Morning Situation shows the Event-modified state
- no separate EVENT Phase is created

PASS:
Today's situation is understandable and a meaningful Event is not buried among ordinary cards.

#### UI-Q101 / UI-Q09 — NEXT-DAY FORECAST — RETIRED

(User 2026-09-24, v2.9.0) No next-day Gate-count or Tier forecast is shown at MORNING or ORDER; FAIL if any next-day block, percentage or count appears. The individual-customer boundary (name, Job, Trait, Wallet, destination hidden; per-Gate visitor count public) is checked by UI-Q-v29-14 / ORD-Q84.

#### UI-Q-v29-20 — ORDER ROW RARITY LINE / BLOCKED-QUANTITY REASON

(User 2026-09-24, v2.9.0)

PASS:
- every offer row shows `{category} · {rarity}` in one small line under the Item name, the rarity word in its rarity colour
  (v2.9.10), no horizontal overflow at 360
- every SALE shelf row and the tray carry the category tag; the tray tile's edge is the same rarity colour as its shelf row
  (v2.9.10)
- an offer whose whole supply was already ordered today shows the `품절` stamp under its metadata line and no quantity controls;
  its name, effects and prices are not greyed (v2.9.10)
- tapping a `+ / 1 / 3 / 최대` blocked by Gold shows `발주 자금이 부족합니다. {N}G 부족.`; blocked by warehouse space shows `창고 칸이 부족합니다.`; an offer whose whole supply for today is already in the cart shows `오늘 공급 최대 수량입니다.` (COPY_AUDIT §3-9)
- the dim look of a blocked control is unchanged; a supply-exhausted control stays non-interactive except for that toast
- no `내일` block on ORDER

### ORDER

#### UI-Q04 — ORDER SCENE
SETUP:
Open Order.

EXPECT:
No unnecessary convenience-store scene dominating the page.

PASS:
Management information is primary.

#### UI-Q05 — ORDER FUNDS
SETUP:
Change order quantities.

EXPECT:
Persistent:
- current Gold
- selected spend
- Gold after order

PASS:
Values remain visible and correct.

#### UI-Q06 — ORDER OFFERS
SETUP:
Open mobile/desktop Order with base offer count, then with any authoritative offer-count modifier.

EXPECT:
Base count=6. Modified counts may exceed 6. In both cases the offer list remains compact and scannable.

PASS:
UI supports the actual offer count without excessive card height or unnecessary scrolling.

#### UI-Q07 — ORDER PRIMARY ACTION
SETUP:
Select order items.

EXPECT:
Confirm action is obvious and sticky/accessible.

PASS:
Player does not need to scroll back to find final action.

#### UI-Q08 — REROLL VISIBILITY
SETUP:
Open Order with and without `발주 교환권`, then use Reroll repeatedly.

EXPECT:
- control clearly means Full-offer Reroll
- current cost is easy to find before use
- with `발주 교환권`, first daily cost is visibly 0G
- after use, the next same-Day cost updates to the next normal step

PASS:
No hidden/ambiguous Reroll scope, free-use state, or current cost.

#### UI-Q61 — ORDER ACTION SPLIT

EXPECT:
- sticky/obvious `발주 확정` when cart exists
- after confirm, ORDER remains
- separate `영업 시작` action exists

PASS: one button/action is not responsible for both purchase and phase transition.

#### UI-Q62 — ORDER REROLL WITH SELECTION

EXPECT:
- Reroll enabled with unconfirmed selected quantity when affordable
- clear indication that whole Offer set is replaced
- no instruction requiring quantity reset to zero

#### UI-Q63 — ORDER DECISION INFO

EXPECT readable before commitment:
- shelf life
- current Gold
- selected spend
- after-order Gold
- today expected operating cost
- warehouse usage/remaining
- current Reroll cost

#### UI-Q64 — ORDER SCROLL / FOCUS

Mobile + desktop interaction:
- +/-
- 0 return
- confirm
- Reroll
- re-confirm

PASS: current offer location does not jump to top; practical focus preserved where possible.

#### UI-Q81 — ORDER ITEM HIERARCHY

(User 2026-09-24, v2.9.0)

Inspect desktop/mobile offers.

PASS:
- Item identity and exact effect read before economy metadata
- exact Stat/Counter/`피로 회복 N`/penalty values are readable
- no redundant role chip such as `속박 전문` above `속박 대응 +16`
- no today-fit/recommended badge or verdict word, and no emphasized effect text (UI-Q-v29-12 retired; (User 2026-09-24, v2.9.0))
- no automatic best-fit ranking

#### UI-Q82 — ORDER WAREHOUSE COLLAPSE

Mobile:
- capacity summary remains always visible
- individual stock list can collapse/expand
- used/remaining capacity is not hidden by collapse
- current ORDER-session open/closed state remains stable through ordinary rerenders

### SALE — LAYOUT / CUSTOMER

#### UI-Q10 — SALE STORE PRIORITY
SETUP:
Open Sale.

EXPECT:
Store/customer is visual focus.

PASS:
Secondary cards do not overpower NPC decision.

#### UI-Q11 — SALE NPC MOBILE STACK
SETUP:
Open narrow mobile viewport.

EXPECT:
NPC info stacks vertically:
identity/job
destination
stats
traits
condition
bag

PASS:
No tiny compressed multi-column block.

#### UI-Q65 — SALE DESKTOP HIERARCHY

EXPECT:
- Character / Portrait left
- enlarged Bag
- upper-right Core Decision area contains Forecast + Expected Destination
- NPC Wallet visible in Core Decision hierarchy
- no duplicate lower destination/forecast panel

#### UI-Q66 — SALE MOBILE HIERARCHY

EXPECT:
- compact Character/status footprint without artwork crop
- enlarged Bag with no overlap/overflow
- compact destination
- core environment visible without tap
- Forecast in decision flow
- no duplicated environment/forecast information

#### UI-Q109 — MOBILE SALE PLAYABILITY

Verify a real browser at 360 / 390 / 412 phone widths.

PASS:
- upper customer/decision summary occupies about half or less of usable SALE height
- Item / price / transaction surface receives at least about half
- shelf heading and at least one selectable Item row are visible at initial SALE entry without a scroll
- character art is contained, not cropped or stretched
- character and right-side information align without fixed-height overflow
- Bag is exactly two slots in the upper-right and each is ~44px touch class or larger
- no required SALE decision information disappears to achieve the compact layout
- fixed bottom dock remains reachable and does not cover the sale surface

FAIL:
- product selection remains pushed below an oversized character presentation
- a short phone clips/overlaps the upper block
- any desktop-only duplicate becomes the visible tutorial target on phone

Bag slot size is a documental baseline, not a fixed requirement: ~44px is the current shipped
value and may move with the layout provided the slots stay a real touch target.

##### CONFIRMED PLACEMENT — ENVIRONMENT READINESS

The destination block stays in the counter band and keeps what is
true of the place: the Gate, its Hazards, and the ability each Hazard presses on.

This customer's readiness against it reads in the forecast instead, labelled `환경 대응`, beside
`전투 전망` (the readout's only two cells; User 2026-09-24, v2.9.0). It is the same canonical ladder off the same frozen
SALE-entry snapshot; the environment is still stated exactly once on the screen, and the help
that explains pressure and readiness moves with it.

PASS:
- the destination block states Hazard pressure only
- `환경 대응` is on screen at most once at a time: in the forecast, or — only while the forecast is scrolled out of view on a phone — in the forecast pin that mirrors it (UI-Q-v29-24; User 2026-09-25, v2.9.0)
- per-Hazard readiness no longer wraps the destination rows or pulls a row for its own help

#### UI-Q-v28-3 — MOBILE SALE QUEUE

At mobile width:
- decorative waiting-line/fan/next-customer card is absent
- bottom Dock retains one queue progress/count
- desktop may still show richer queue presentation
- no duplicate queue count consumes vertical space

#### UI-Q-v28-4 — CURRENT CUSTOMER STATE

Mobile SALE exposes compact:
- Injury without duplicate numeric 부상 1
- Fatigue
- Loyalty

Trusted Regular state appears at 51.

PASS:
- no separate Loyalty `?` / popover trigger in normal SALE
- Loyalty contextual meaning is taught by tutorial/coach
- Equipment text is absent from the compact SALE top state
- Equipment remains reachable through NPC detail / proven Stat source where applicable
- Bag remains exactly 2 slots
- both Bag slots remain horizontal at mobile width
- the whole Bag block may wrap down; the slots themselves do not stack vertically
- no horizontal overflow

#### UI-Q110 — TRANSIENT CUSTOMER SPEECH

PASS:
- speech is overlay/presentation and reserves no permanent layout height
- new line appears
- a greeting auto-hides after 3 seconds; a purchase / refusal reply line after 5 seconds (User 2026-09-24, v2.9.0)
- tapping it hides immediately
- a new line restarts its own display
- same unchanged line does not reappear merely because SALE rerendered
- no Save/account schema is added for speech visibility

#### UI-Q67 — NPC WALLET VISIBILITY

Before choosing a price, Player can see NPC current wallet and compare it to the selected sale price.
PASS: affordability can be judged without opening a secondary modal.

#### UI-Q-v28-11 — LOYALTY HELP

Normal SALE:
- shows compact Loyalty value/state
- does not show a dedicated Loyalty `?` / anchored popover trigger

Tutorial/coach:
- explains purchase-intent and revisit meaning
- says 51 = 단골
- does not leak unrevealed Boss-specific information

Global compact Help remains under its existing copy owner; it is not a second contextual SALE tooltip.

#### UI-Q-v28-12 — EVENT TEMP BUDGET

On 길드 급여일:
- persistent Wallet and temporary purchase budget are distinguishable
- affordability uses both
- UI does not imply temporary budget persists

#### UI-Q29 — RETURNING NPC DELTA VISIBILITY
SETUP:
Revisit an NPC after meaningful growth/injury/recovery/expedition history change.

EXPECT:
Relevant since-last-visit change/history is immediately noticeable while full current profile remains accessible.

PASS:
Player does not need to reread the entire unchanged profile to understand what changed.

#### UI-Q90 — RETURNING NPC LAST BAG

Returning customer with snapshot:
PASS:
- compact `지난 원정 · DAY X · 결과 · [item] [item]` on a desk; not shown on phone, where the NPC detail 원정 기록 holds it (User 2026-09-24, v2.9.0)
- exact actually accepted items only
- empty slot preserved
- mobile Wallet/Destination/Forecast hierarchy not displaced
- expanded causal text only from proven tokens

#### UI-Q91 — QUEUE UNCERTAINTY

PASS:
future customer Job/Level/individual Destination/preparation need/importance is not newly revealed; the per-Gate visitor count of the ORDER 오늘 line (UI-Q-v29-13) is not a reveal (User 2026-09-24, v2.9.0).
Existing authorized queue-count info may remain.

#### UI-Q68 — SALE SCROLL / FOCUS

Within same Customer test:
- item select
- price panel open/close
- purchase success
- refusal + reselection
- detail/accordion open/close

PASS: current viewed position stays stable.
New Customer may intentionally reset to top.

#### UI-Q74 — NEXT PORTRAIT PRELOAD

On real mobile transition to next Customer:
PASS: next portrait is preloaded using a minimal browser preload path and no visible blank/loading regression is introduced.

#### UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE

PASS:
- ORDER exposes compact access to currently owned 점포지원 before commitment
- SALE exposes compact access to currently owned 점포지원 before commitment
- both reuse the existing owned-Relic truth/detail surface
- no duplicate Relic-effect store is introduced
- controls do not crowd the primary phone decision surface

### SALE — ITEM / TRANSACTION

#### UI-Q12 — INVENTORY REACHABILITY
SETUP:
Sale with many items.

EXPECT:
All sellable inventory can be reached/compared.

PASS:
No hidden items due to consumer-slot UI.

#### UI-Q13 — PRICE BUTTONS
SETUP:
Sale on mobile.

EXPECT:
The three price buttons `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G` are visually distinct, large enough, and easy to switch (User 2026-09-24, v2.9.0).

PASS:
No mis-tap-prone tiny buttons.

#### UI-Q25 — ITEM DECISION INFO
SETUP:
Order/Sale item comparison.

EXPECT:
Player can see key:
- effect
- relevant Counter
- explicit penalty
- price

PASS:
Basic choice does not require encyclopedia hopping.

#### UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
SETUP:
Process a Customer through multiple Consumer Slots including a purchase/refusal that can change the next-slot choice.

EXPECT:
Inspect -> Item -> price -> result -> remaining-slot decision is continuous with no unnecessary modal/page round trip or redundant routine confirmation.

PASS:
Interaction cost is reduced without batching away the sequential decision.

#### UI-Q87 — TWO-SLOT HANDLING

All ordinary NPC levels:
PASS:
- exactly two visible Bag slots
- the slots stay in the customer-state strip beside the status line (User 2026-09-24, v2.9.0)
- each mobile target ~44px class
- focus/replace/remove state clear
- tap-only completion works
- drag not required
- no third ghost slot

#### UI-Q88 — SEQUENTIAL TRANSACTION

Within one ordinary customer:
- first slot transaction resolves purchase/refusal
- state updates
- remaining slot remains a new decision

FAIL:
- two-slot cart checkout
- both items committed atomically as one bundle

#### UI-Q100 — SALE REFUSAL PRICE CEILING

Controlled same ordinary customer + same SKU visit.

Case A:
- refuse at 50%

PASS:
- 100% and 150% controls become disabled and non-interactive for that SKU
- reason is readable
- lower-price refusal does not trigger a new higher-price acceptance roll

Case B:
- refuse at 100%

PASS:
- 150% disabled
- 50% may remain usable

Case C:
- refuse at 150%

PASS:
- 100% / 50% may remain usable

Isolation PASS:
- unrelated SKU price controls remain unaffected
- new customer visit does not inherit the previous visit lock unless another owner explicitly defines it
- Final preparation does not show this refusal-price ceiling UI because Final has no refusal roll and no 100/150 modes

#### UI-Q102 — SALE NON-DECISION DETAIL REMOVAL

PASS:
- `이 손님에게 안 걸리는 효과` is absent from the SALE customer decision surface
- flavor-only `상품 설명` disclosure is absent from SALE
- exact actionable Item effects remain readable
- no replacement accordion/modal is added solely to preserve the removed flavor

FAIL:
- a disclosure control remains that visually implies strategic information but opens only flavor text

#### UI-Q-v28-15 — SALE COPY DENSITY

Selected Item:
- one heading \`판매 후 변화\`
- no \`이 상품이 직접\`
- no \`보급이 상태에 미치는 영향\`
- no \`이 손님에게는 지금 걸리지 않는 효과\`
- conditional non-delta Item truth may appear under \`특수 효과\`
- no permanent forecast explanation paragraph

Exact forecast help is available through anchored popover.

#### UI-Q-v29-3 — TRANSACTION BEAT

(User 2026-09-24, v2.9.0)

SETUP:
One ordinary SALE customer at 390 and 1280: one successful price commit, one refusal, one `손님 보내기`; repeat the same flow under `prefers-reduced-motion`.

EXPECT:
Every beat is presentation only, each ≤ 320 ms, one sale's beats total < 600 ms, input is never blocked, and the scroll position stays on the same customer.

PASS:
- frame captures at 0 / 150 / 300 / 600 ms of the sale show the Item icon travelling from the counter tray to the customer's Bag slot in the customer-state strip (260~320 ms), the slot settling (scale 1.05 -> 1, 240 ms), the dock Gold counting to its new value, and the changed Stat cells pulsing once (300 ms) and keeping the new value; the `판매 후 변화` rows do not vanish
- purchase: the customer figure nods (translateY 4px, 180 ms x 2); refusal: it shakes its head (translateX ±4px, the existing bubble-shake timing) and the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text
- the reply line (buy / refuse) stays 5 seconds; the greeting keeps 3 seconds
- `손님 보내기`: the current customer exits left (240 ms), the next arrives with the existing entry (240~340 ms), and `depart` plays a recorded utility cue (door / step family); entry may still start the view at the top
- 50% / 100% / 150% share one register sound family and differ only by coin ticks (1 / 2 / 3); no mode sounds like the correct answer
- under reduced motion the same flow completes instantly with an identical end state (Gold, Bag, Stat values, lock state, reply line)
- no beat adds information the resolved state does not already hold; no Save field, no Gameplay RNG draw

FAIL:
- input is blocked during a beat, or one sale's beats total 600 ms or more
- the view scrolls away from the current customer during a beat

#### UI-Q-v29-4 — BAG IN THE STRIP

(User 2026-09-24, v2.9.0)

SETUP:
SALE at 360, 390 and 1280, before and after one sale.

PASS:
- the two Bag slots stay in the customer-state strip beside the status line at every width (the v2.8 place), labelled `가방 {n} / {slots}`
- each slot is at least 34px and the Bag reads as the heaviest element of the strip; the hand-over ghost lands on the slot it fills
- the slots remain the handling surface: focus / replace / remove and tap-only completion work as in UI-Q87; no third ghost slot
- no horizontal overflow

#### UI-Q-v29-5 — STAT GRID PRESSURE TAG

(User 2026-09-24, v2.9.0)

SETUP:
Customers whose Gate presses one Stat through one Hazard, one Stat through two Hazards, and a Stat the Gate does not press.

PASS:
- under a pressed Stat cell a small tag shows the pressing Hazard icon + name only (e.g. `냉기`; two Hazards joined as `독 · 속박`)
- the tag sits under the Stat that Hazard actually presses (강인함 / 기동 / 정신 per `DUNGEON_HAZARD_v2.8.0.md`)
- 투력 never carries a tag
- an unpressed Stat carries no tag
- the tag carries no number and no verdict word

#### UI-Q-v29-6 — MATCHING-EFFECT EMPHASIS — RETIRED

Retired (User 2026-09-24, v2.9.0): see UI-Q-v29-22. PASS is now: no effect text on any SALE row carries an emphasis style, whatever the customer's Gate. The setup below is kept as the negative case.

SETUP:
SALE shelf holding an Item that counters one of the customer's Gate Hazards, an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.

PASS:
- only the effect text that is a Counter for one of the Gate's Hazards, or the Core Stat one of its Hazards presses, is set in the emphasis style (bold, ink colour)
- every other effect text keeps the default style
- no badge, no verdict word, no row reorder
- ORDER offer rows follow the same rule against today's Gate once the D-4 batch adopts it

#### UI-Q-v29-7 — ONE DELTA LIST

(User 2026-09-24, v2.9.0)

SETUP:
Select a Food/Drink that releases a Fatigue band for a fatigued customer; then an Item that changes a Stat only; then commit one of them; the same Items in the till and in FINAL preparation.

PASS:
- `판매 후 변화` lists only the Item's own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`); no `피로 완화` row and no `피로 {A} → 출발 {B}` line anywhere (User 2026-09-25)
- no outlook delta row (no `전투 전망 A → B`, no `환경 대응 A → B`) for a selected or a committed Item
- the frozen SALE-entry outlook is not repainted inside the till and never changes for a selected Item (UI-Q86)
- `특수 효과` and the shelf-life line stay

FAIL:
- an outlook block or outlook delta row appears under the Item
- a row appears for a value that did not change

#### UI-Q-v29-8 — PRICE ROLE WORDS

(User 2026-09-24, v2.9.0)

PASS:
- the three price buttons read `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`
- under each: `이익 {N}G`, or the existing disabled reason
- three modes and no extra depth; no fourth control

#### UI-Q-v29-9 — DEATH % ONLY IN THE 전투 전망 HELP AND NPC DETAIL

(User 2026-09-24, v2.9.0)

PASS:
- the SALE readout `.top` shows exactly two cells, 전투 전망 and 환경 대응, each with its own `?`; no `실패 시 사망 위험` cell and no third `?`
- the 전투 전망 `?` shows two lines: the outlook help and `실패 시 사망 위험 {N}%` with the frozen SALE-entry value
- the NPC detail modal shows `실패 시 사망 위험 {N}%`
- the % appears nowhere else on the SALE surface; Final preparation is unchanged (UI-Q-v28-32)

### SALE — FORECAST / PREPARATION INFORMATION

#### UI-Q14 — FORECAST LANGUAGE
SETUP:
Inspect Sale forecast.

EXPECT:
Combat:
우세/접전/불리

Hazard:
취약/불안/대응/충분

PASS:
No exact probability or master score.

#### UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK

Controlled ordinary SALE customer before any Item transaction.

PASS:
- heading is exactly `보급 전 원정 전망`
- qualitative Combat Forecast is shown from the SALE-entry state
- qualitative Hazard Readiness is shown from the SALE-entry state
- the readout shows exactly two cells, 전투 전망 and 환경 대응; the exact risk label `실패 시 사망 위험` is the second line of the 전투 전망 `?` (`실패 시 사망 위험 {N}%`) and an NPC detail line, not a readout cell (User 2026-09-24, v2.9.0)
- exact pre-supply 실패 시 사망 위험 % in that help line is computed from the same state
- the percentage is clearly conditional on the expedition entering a failure path, not presented as unconditional whole-expedition Death probability
- exact expedition Success probability remains hidden
- after first and second committed Item transactions, the two readout cells and the help-line % remain unchanged on screen
- post-commit exact Item/effect/source deltas may still update
- actual expedition Resolve uses the final prepared state, not the frozen display snapshot
- a healthy fully prepared controlled state may show 0% 실패 시 사망 위험 when the current formula produces 0
- injured pre-supply 실패 시 사망 위험 includes the canonical +10%p modifier and respects the 40% cap

#### UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK

(User 2026-09-24, v2.9.0)

Select/focus an uncommitted Item.

May show:
- exact Item effect
- price/affordability
- deterministic Fatigue-recovery arithmetic (`피로 A -> 출발 B`)

Must not show hypothetical post-Item answers:
- `접전 -> 우세`
- `불안 -> 충분`
- 실패 시 사망 위험 `% -> %` change
- Great Success signal change
- exact expedition Success probability

The already-visible exact 실패 시 사망 위험 % is allowed only as the fixed pre-supply snapshot.

After actual purchase commit, PASS only if:
- displayed Combat Forecast remains the original pre-supply snapshot
- displayed Hazard Readiness remains the original pre-supply snapshot
- displayed 실패 시 사망 위험 % remains the original pre-supply snapshot
- exact Item/direct-effect and proven source-attributed numeric changes may update
- no post-commit derived expedition answer is substituted before the remaining-slot decision.

#### UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH

(User 2026-09-24, v2.9.0)

Use current `집중 사탕` (`공포 대응 +10 / 피로 회복 3`) in two controlled setups.

##### Case A — no Fatigue band change

PASS:
- direct effect shows 공포 Counter / 피로 회복 only
- 투력/강인함/기동/정신 do not rise
- no hidden direct Core-Stat effect is attributed to 집중 사탕
- no `보급 부족 완화` row exists

##### Case B — its 피로 회복 releases a Fatigue band

PASS:
- effective Core Stats may rise according to the current Fatigue owner (`DUNGEON_HAZARD_v2.8.0.md` bands)
- the band recovery is not listed in `판매 후 변화` and is never attributed to the Item (User 2026-09-25)
- displayed pre-supply Hazard Readiness remains frozen rather than being replaced by a new readiness label
- displayed pre-supply 실패 시 사망 위험 remains frozen rather than being replaced by a new percentage
- UI does not imply that 집중 사탕 directly grants those Stats
- direct Item effect remains separately readable

All cases:
- exact post-commit Item/effect/delta rows match runtime preparation truth
- direct Item effect and derived system effects are not conflated
- the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot remains clearly identified as pre-supply and is not replaced by post-commit derived answers
- a generic `판매 후 변화` block is allowed only if those source classes are immediately distinguishable
- otherwise the synthetic block is removed rather than turning the outlook into a post-commit answer dashboard

#### UI-Q-v28-7 — GREAT SUCCESS SIGNAL

During one customer visit:
- focusing an Item does not change signal
- successful committed purchase recomputes signal
- signal may appear or disappear
- Combat/Hazard readout cells and the help-line Death % remain frozen (User 2026-09-24, v2.9.0)
- exact probability is not exposed

#### GREAT SUCCESS SIGNAL
PASS:
- exact copy `대성공을 노려볼 만합니다.`
- visible while preparation can still change
- exact % / margin / formula hidden

#### UI-Q84 — FOUR CORE STATS REMAIN VISIBLE

SALE primary decision surface keeps:
- 투력
- 강인함
- 기동
- 정신

PASS:
- not moved behind accordion/detail
- actual applied source labels remain truthful
- calculation breakdown is drill-down detail

#### UI-Q69 — STAT SOURCE

PASS:
- changed stat highlighted
- only actual applied source names shown
- helpful/harmful semantic treatment correct
- inactive source absent
- Wallet/purchase intent/revisit not shown as Stat sources
- tap detail matches actual calculation

#### UI-Q-v28-5 — SEMANTIC DELTA

For changed Stats/Fatigue/economy values:
- benefit = green
- harm = red
- unchanged = default
- generic yellow moved-only treatment is not used as meaning

Color is not the only source cue.

#### UI-Q-v28-6 — SHARED POPOVER

Desktop:
- hover/focus works
- click remains usable

Mobile:
- tap toggles

All:
- no layout-height jump
- one open at a time
- outside/Escape closes
- no gameplay pause/background lock
- viewport placement remains readable

#### UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY

(User 2026-09-24, v2.9.0)

PASS:
- Item shows exact Stat/Counter/`피로 회복 N`
- Gate shows qualitative readiness
- exact Gate Counter threshold stays hidden

#### UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER

(User 2026-09-24, v2.9.0)

PASS detail may show:
- Hazard
- pressured Stat
- readiness meaning

FAIL if it exposes:
- recommended SKU/category
- optimal combination
- exact hidden Hazard requirement/formula

#### UI-Q26 — HAZARD NUDGE
SETUP:
Inspect known hazard presentation.

EXPECT:
Hazard relevance is clear.

PASS:
UI does not directly prescribe exact optimal Item.

#### UI-Q35 — HAZARD EFFECT ACCESS
SETUP:
Inspect all authoritative Hazards on PC and mobile.

EXPECT:
- each Hazard provides its numbered short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공` (User 2026-09-24, v2.9.0)
- PC hover/focus works where tooltip is used
- mobile tap/inline gives equivalent information
- current Gate summary can surface the explanation without encyclopedia hopping

PASS:
No hover-only or inconsistent Hazard explanation.

#### UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC

(User 2026-09-24, v2.9.0)

Controlled setup with known Fatigue/Supply/Trait.

PASS:
- `피로 A -> 출발 B` matches runtime preRecovery; no required / deficit value is shown
- departure Fatigue matches runtime
- no single Outcome is predicted as guaranteed

#### UI-Q-v28-8 — FATIGUE

(User 2026-09-24, v2.9.0)

SALE:
- no hypothetical Outcome fatigue matrix
- current Fatigue readable in the status strip; `피로 A -> 출발 B` only on the counter tray for a chosen Food/Drink; no always-on Fatigue line, no `보급 X / 필요 Y` cell (User 2026-09-24 revision, v2.9.0)

NIGHT:
- main label is 귀환 후 피로, with ` · {band}` from Fatigue 20 up
- detailed path available on demand; the recovery row is `음식·음료로 -N`, never `남은 보급으로`
- 보급 회복 / 보급 완화 / 밤 피로 are absent as primary labels

#### UI-Q32 — PLAYER STAT TERMINOLOGY
SETUP:
Inspect NPC profile, Item previews, growth/result displays, and any stat labels.

EXPECT:
Player-facing core stats are consistently:
- 투력
- 강인함
- 기동
- 정신

Actual battle/fight wording may still use `전투`.
Internal Power/Party Power is not exposed as another player stat.

PASS:
No player stat remains mislabeled as `전투`.

#### UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
SETUP:
Open NPCs with positive, mixed, and negative internal Traits.

EXPECT:
- no Player-facing `이점/양면/약점`
- no ▲/◆/▼ Trait quality label
- each effect line follows authoritative semantic tone metadata
- mixed Trait can visibly contain both helpful and harmful lines

PASS:
Player reads effects and makes the judgment.

#### UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
SETUP:
Trigger the destination reliability tutorial, 허세, and 게이트 순례 주간.

EXPECT:
- Tutorial says: `이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.`
- Tutorial does not frame 허세 as the whole destination system
- Sale label uses 예상 목적지 where uncertainty is possible
- 게이트 순례 주간 Morning reveal states 1–3 affected range
- actual N / affected identity / changed Gate remain hidden until Night
- Night shows actual changed count and expected -> actual destination on affected NPC results

PASS:
Information is uncertain but not unfairly opaque, and no extra Event-result phase is created.

### DEEP EXPEDITION

#### NOMINATION UX
PASS:
- one NPC maximum
- current visitor only
- before first committed transaction
- sponsorship exactly once
- destination + forecast update
- no cancel/swap
- skip has no cost/penalty
- future visitor identity remains hidden

Mobile follows existing touch/hierarchy rules.

#### UI-Q-v28-16 — DEEP REPEAT COPY

After first tutorial:
- Morning uses the exact two-line repeat copy
- SALE nomination uses the exact two-line cost/reward copy
- no duplicate long tutorial paragraph appears in both places

### NIGHT

#### UI-Q16 — NIGHT RESULT
SETUP:
Open Night.

EXPECT:
One NPC result at a time with hierarchy:
what happened
why
what changed

PASS:
Not a debug log or modifier ledger.

#### UI-Q31 — NIGHT IMPORTANCE WEIGHTING
SETUP:
Compare routine success with meaningful level-up/injury/death/decisive-Item/callback results.

EXPECT:
Routine result is compact; meaningful result receives stronger visual emphasis.

PASS:
Night does not force every NPC result to consume equal presentation time.

#### UI-Q70 — NIGHT CONTROLS

EXPECT exactly:
- 다음
- 전체 건너뛰기

PASS:
- no single `건너뛰기`
- no active `nightSkip` UI reference

#### UI-Q92 — NIGHT RESULT TRUTH

(User 2026-09-24, v2.9.0)

PASS:
- actual Food/Drink preRecovery/outcome buffer use can be read when relevant
- final Fatigue matches runtime
- First Aid Aftercare shown only if it actually changed persistent Injury state
- no invented `전투 부족` / `독 대응 부족` diagnosis
- `다음 / 전체 건너뛰기` controls remain exact

#### UI-Q-v28-9 — NIGHT REACTION

Living result:
- temporary character speech bubble appears
- auto-dismisses around 3 seconds
- tap dismiss works
- result information remains
- does not cover Outcome
- reaction selection priority is:
  avoided death / rescue -> severe injury -> injury -> retreat -> growth -> ordinary return
- Bag / supplied-Item presence alone never selects the reaction category

Death:
- no living speech bubble
- narration/report treatment only

#### UI-Q-v28-23 — NIGHT RESULT PRESENTATION

With controlled NIGHT result fixtures, verify materially different states are visibly/audibly
distinguishable at minimum for:
- ordinary return / success
- Great Success
- retreat
- injury
- severe injury
- Death

Where rescue / avoided-death proof exists, a distinct accent may appear only from that proven state.

PASS:
- presentation reads the already-resolved Outcome
- no presentation branch mutates Outcome, reward, Fatigue, proof, Wallet or Store Gold
- Death still has no living NPC speech bubble
- primary result information remains readable on mobile

#### UI-Q-v29-39 — ORDER PRICE TAGS

(User 2026-09-26, v2.9.6; owner `UI_UX_v2.8.0.md` §ORDER — ITEM INFORMATION HIERARCHY; COPY_AUDIT §4-26.)

PASS:
- every offer row shows two tags at the end of the name row: `매입 {N}G` (the offer's price, including today's Event multiplier) and,
  under it, a smaller muted `판매 {N}G`; at 360 / 390 / 1280 neither clips, overlaps the name or leaves the paper
- the metadata line starts `수익 +{N}G` and carries no `매입`
- the ORDER total, the cart and the purchase are unchanged

- the 본사 1+1 행사 offer carries a red `1+1` sticker on its `매입` tag corner, readable at 360 / 390 / 1280 without covering the
  price; no other offer carries it; the metadata line has no `1+1` (User 2026-09-28, v2.9.10 quick patch)

FAIL:
- an unlabelled price, the sale price in the larger tag, or `매입` still in the metadata line
- the 1+1 offer only told apart by text inside the metadata line

#### UI-Q-v29-38 — SALE STRAIN LINE

(User 2026-09-26, v2.9.5; owner `UI_UX_v2.8.0.md` §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT; COPY_AUDIT §4-25.)

PASS:
- a customer departing injured with an injured-departure chain of {n} >= 1 shows exactly one `연속 부상 출발 {n}회` line directly
  under the readout `.top`, at 390 and 1280, with the same {n} as the NPC detail row
- at 390, with the readout scrolled out of view, the forecast pin shows the same line under its two readings for the chain case and none for the healthy and first-injured cases (User 2026-09-28, v2.9.9 quick patch; UI-Q-v29-24)
- a healthy customer (whatever chain their records hold) and an injured customer with no chain show no line
- the readout `.top` still shows exactly the two cells; the line is small and muted, one line, no `?`
- `node tools/qa-strain-line.cjs` (in qa:runtime)

FAIL:
- a %, a verdict word, a second line, a `?`, or the line on a healthy or first-injured customer

#### UI-Q-v29-37 — REPLAY NUDGE

(User 2026-09-26, v2.9.4; owner `UI_UX_v2.8.0.md` §END — REPLAY NUDGE / §Pre-Run Decoration empty-slot interaction; META §BEST DAY.)

PASS:
- a Run that reached D10 / D14 for the first time on the account lists that product in `본사 해금` on END, beside any
  distinct-Boss unlock; the Day toast still fires once; a later Run that reaches D10 again lists nothing
- with no unlock, a settlement that crosses an unowned Decoration's price prints `점포 자본으로 새 장식을 들일 수 있다.`;
  capital that was already above that price, or an owned Decoration's price, prints nothing
- with neither, a Run that beats the account's best Day prints `지금까지 가장 오래 버틴 점포다 · DAY {N}`; a tie, the
  account's first ending and a manual 현재 지점 포기 print nothing and a manual abandon never moves the best Day
- with none of those, a Run that beats the account's best 총매출 prints `지금까지 가장 많이 판 점포다 · 총매출 {N}G`, N the
  tape's own `총매출` figure; a tie, the account's first ending and a manual abandon print nothing and an abandon never moves
  the record; a Run that beats both records prints the best Day line (User 2026-09-30)
- at most one of the three lines, never beside `본사 해금`; a reload of the ended Run prints the same line
- 새 점포 준비: exactly the Slot places (rows before v2.9.9) with an affordable unowned Decoration carry `들일 수 있음`
- no new motion, sound, screen or button

FAIL:
- a Decoration named, a list of goals, a remaining-count, a second line, a line on an abandoned Run, or a mark on a Slot
  whose unowned Decorations cost more than the capital

#### UI-Q-v29-36 — BUILD MARKER

(User 2026-09-26; owner `UI_UX_v2.8.0.md` §BUILD MARKER.)

PASS:
- the opening screen shows `v{version} · {commit}` (the CHANGELOG head version) small and muted in its top-left corner at 360 / 390 / 1280, clear of the title,
  the menu button and the preparation scene's board
- 영업 설정 ends with the same pair, before and during a Run (v2.9.7); no other screen shows it
- the console prints `GUILD24 v{version} · {commit}` once on load and `Guild24.build` returns the same pair
- the deployed site reads the deployed commit; a local build reads `dev`

FAIL:
- the marker overlapping or pushing the title, taking input, or appearing on a Run screen other than 영업 설정; a deployed build still reading `dev`

#### UI-Q-v29-45 — SALE SHELF LIP AND HEAD

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §SALE — SHELF LIP / §SALE — SHELF HEAD.)

SETUP: a mid-Run SALE (Day 5+, six or more kinds on the shelf) at 360x640, 390x664, 390x844, 412x915 and 1280x880.

PASS:
- every shelf row ends on a thin (2 px) board edge; row height and type unchanged
- the shelf head is lower and its 점포지원 plate compact but still a framed plate with a ~44 px touch target; the room the
  shelf gets above the tray / dock is 12 px more than before (measured: 120 / 133 / 313 / 382 / 323 -> 132 / 145 / 325 /
  394 / 335 px)

FAIL:
- a row turned to wood, a row taller than before, or less shelf room at any size

#### UI-Q-v29-44 — PRIMARY ACTION GRAMMAR

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §PRIMARY ACTION GRAMMAR.)

SETUP: the dock Action of 새 점포 준비, MORNING, ORDER (both `영업 시작` and `발주 확정`), SALE, NIGHT, CLOSING, END and FINAL
(party not yet chosen) at 360x640, 390x844 and 1280x880; each held pressed.

PASS:
- at rest each casts one hard depth with equal right and down offsets: 5 px for 첫 점포지원 고르기 / 다음 날 / 다음 점포 열기 /
  the gate bar, 4 px for 문 열기 / 영업 시작 / 발주 확정 / 다음, 3 px for 손님 보내기 - and it is drawn: in the screenshot the
  pixels just right of and under the face differ from the same spot with the Action hidden, and nothing past the depth does
- held, each moves right and down by its depth less 1 px, and the 1 px cast left is drawn
- heights: 56 px (phone) / 60 px (desk) inside the Day, 64 / 72 px across a boundary, 첫 점포지원 고르기 64 px everywhere; no
  label wraps or is cut at 360 (a four-digit `발주 N G · 확정` included)
- inside the Day: a 3 px lit top edge, a 4 px deep foot and no outline (NIGHT flat), labels seated on a 2 px drop
- each Phase keeps its own face (wood / steel on paper with a frost edge / counter key / muted cobalt / BRICK / gate bar)
- `영업 시작` and `발주 확정` show the same steel face and frost edge; `첫 점포지원 고르기`, `다음 날` and `다음 점포 열기` the same
  BRICK build (only the rivets differ); a disabled `영업 시작` casts nothing
- pressing `첫 점포지원 고르기` plays `begin` and `다음 점포 열기` plays `newstore`, neither the navigation click

FAIL:
- a straight-down cast or press, a cast declared in the style but not on screen, a press that leaves no cast or moves by a
  different amount than the cast, a height or depth off its step, an outline around a step inside the Day, or two Phases
  whose Action looks the same

#### UI-Q-v29-43 — SALE PHONE OUTLOOK PLATE

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §SALE — MOBILE AUTHORITY.)

SETUP: a mid-Run SALE (Day 5+, six or more kinds on the shelf) at 360x640, 390x664, 390x844, 412x915 and 1280x880.

PASS:
- on a phone the outlook line and the four Core Stats sit on one recessed plate with a single seam; every `?` still opens
  its note in place and each Stat row keeps its height
- the shelf's first row starts higher and the room the shelf gets above the tray / dock is not smaller at any phone size
  (measured before v2.9.9: 76 / 89 / 269 / 338 px); the desk layout is unchanged

FAIL:
- a second box around either part, a dropped or reordered line, or less shelf room at any phone size

#### UI-Q-v29-42 — NEW STORE PREPARATION STORE SCENE

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §NEW STORE PREPARATION — STORE SCENE. Runtime check `tools/qa-prep-scene.cjs`,
part of `qa:runtime`.)

SETUP:
no Decoration, and four Decorations owned with two equipped, at 360x640, 360x740, 375x667, 390x664, 390x844, 412x915,
430x740, 768x1024, 900x700, 1023x768, 1024x768, 1280x700, 1280x720, 1366x680, 1280x800, 1280x880 and 1920x1080; the ending
-> `다음 점포 열기`; a place -> 점포 장식 -> back.

PASS:
- no preparation panel: the store room with the logo on its ceiling and the branch plate right under it, centred, the
  `새 점포 준비` board, four Slot places, the Capital plate and `첫 점포지원 고르기`; with no Run no way back; from the ending `결과 다시 보기` returns to the ending
  and the Run is unchanged
- every place is a control of at least 44 px that opens 점포 장식 on its Slot, and the way back returns to the scene
- no tag, place, plate, board, logo, branch plate or Action overlapping another, none off screen; no page error
- the board at least 6 px above the places under it, the Capital plate at least 6 px above the Action
- the Slot tags, the branch plate and the Capital plate the same share of the stage as at 360x640 on a taller or wider
  stage (390x844, 768x1024, 1366x680, 1920x1080), the plates on the pixel face's steps, still overlapping nothing and every
  tag and plate inside the stage (not only the window)

FAIL:
- the old panel, a place that is not a control, a tag cut off or covering something, the Capital shown in the till, or the
  ended Run changed before `첫 점포지원 고르기`

#### UI-Q-v29-41 — OPENING TITLE LOGO

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §OPENING TITLE LOGO.)

PASS:
- the opening screen shows the logo as its title at 360x640 / 360x740 / 375x667 / 390x664 / 390x844 / 1280x880, whole,
  centred, crisp, clear of the build marker and the menu button, on the store scene's ceiling, with the branch plate fully
  visible right under it (UI-Q-v29-42); the `h1` reads
  `던전 앞 편의점` to a screen reader
- the 점 받침 reads as ㅁ at the phone size

FAIL:
- the title rendered as text again, a cropped or stretched logo, the logo covered, or a missing file

#### UI-Q-v29-40 — LIVE STORE DECORATION SEATING

(User 2026-09-27; owner `UI_UX_v2.8.0.md` §LIVE STORE DECORATION SEATING. Runtime harness `tools/qa-deco-seating.cjs`, part of
`qa:runtime`.)

SETUP:
each Decoration set equipped (sponsorSign / honorFrame / thriftSafe / guildShelf, and trainingSign / infirmaryPlaque /
memorialBook / aidCabinet), first MORNING, reduced motion, at 360x640, 360x740, 375x667, 390x664, 390x844, 412x915, 430x740,
768x1024, 820x1180, 900x700, 1023x768, 1024x768, 1280x880 and 1920x1080 (the tall file up to 820 wide, the wide file from
900x700 on).

PASS:
- the till housing's feet on the painted counter top (the file's 74.2~76.2% tall, 82.7~85.5% wide) under the crop that
  size produces
- all four pieces drawn; 간판 and 벽면 within 1 px of their point of the painting under the crop that size produces (the 간판
  left of it only where that keeps the gap from the DAY sign, and then exactly at the gap; never above the gap below the
  stage's top edge)
- 진열대 and 계산대 feet within 1 px of the till housing's base line, at least the gap (6 px phone, 10 px desk) from it
- no piece overlapping the till housing, its label, the DAY sign, the board, the branch plate, the dock or another piece; every
  piece on screen
- the branch plate at least 6 px clear of the dock Action, and at least 6 px under a counter piece it sits below

FAIL:
- a piece on the housing or its label, standing on another line than the housing, or placed off its painted point when the
  painting is cropped at the top and bottom; the 간판 touching the DAY sign; the till housing above or below the painted
  counter; the branch plate on the dock Action

#### UI-Q-v29-35 — BOSS REVEAL AFTER MORNING LANDS

(User 2026-09-26; owner `UI_UX_v2.8.0.md` §BOSS REVEAL — MORNING LANDS FIRST.)

SETUP:
DAY 0 첫 점포지원 -> 구매 -> DAY 1 MORNING at 390 and 1280, motion on and reduced motion; frames at 120 ms and 600 ms after
the press.

PASS:
- motion on: at 120 ms MORNING is on screen with no modal; by 600 ms the `마왕 조사 개시` dossier is open, having risen into
  place with its art on it (v2.9.10: a 200 ms hold; on a cold phone network a reveal carrying the Boss's art may wait up to
  1.2 s more for it)
- reduced motion: the dossier is open at 120 ms
- the dossier, its copy and its `확인` are unchanged; after `확인` the Day continues exactly as before
- no Event or Relic window opens during the hold
- MORNING takes no input during the hold: a tap on `문 열기` (or the menu) in it does nothing, and the Day is still MORNING
  when the dossier opens

FAIL:
- the dossier opening in the same frame as the MORNING cut with motion on, a hold under reduced motion, a lost or repeated
  reveal, a Day that advances during the hold, or any new motion, sound or copy

#### UI-Q-v29-34 — FINAL BOSS REVEAL ENTRY

(User 2026-09-25, v2.9.2 H6; owner `UI_UX_v2.8.0.md` §FINAL — BOSS REVEAL ENTRY.)

SETUP:
D29's CLOSING receipt through to D30's FINAL screen (the real `다음 날` press) at 390 and 1280, motion
on and reduced motion; frames through the entry.

PASS:
- the `.gate-zero` boss art and name plate settle in together as one movement: translateY 10px -> 0,
  opacity 0 -> 1, 220 ms, outQuad
- nothing else on the screen moves (the threat board, the last-order form and the dock are unaffected)
- no new sound and no new copy; the existing entry into FINAL is otherwise unchanged
- under reduced motion the block is present at full opacity with no motion, and the end state matches
  the motion-on settled state exactly

FAIL:
- a staggered or multi-part reveal, any motion outside `.gate-zero`, a hold before the movement starts,
  a new sound or line, or a settled end state that differs between motion and reduced motion

#### UI-Q-v29-33 — CLOSING RECEIPT STAMP

(User 2026-09-25, v2.9.2 H4; owner `UI_UX_v2.8.0.md` §CLOSING — RECEIPT STAMP.)

SETUP:
CLOSING at 390 and 1280, motion on and reduced motion, one Day ending in profit and one in loss; the sequence
`마감으로` -> receipt printing -> `다음 날`; the END settlement (`점포 자본 정산`) on an account whose prior Store
Capital sits below at least one Decoration price and a Run that carries it past one or more; frames through the
stamp landing and through the settlement count.

PASS:
- every receipt row is on screen together within 200 ms behind one printer tick; nothing prints row by row
- only the `보유 자금` figure (the purse box) stamps: 100 ms hold, then the NIGHT stamp's 90 ms fall, the tape gives 4 px and settles
- the `영업 손익` figure is green on a profit, red on a loss, gold at 0, and reduced motion shows the same row, colour and figures at once
- no `어제보다 +N` line anywhere on the receipt
- the END `현재 점포 자본` row counts from the account's prior total to the resolved one in 320 ms, with one `ui`
  click for each Decoration price it passes; a count that crosses no price plays none

FAIL:
- a tick per receipt row, a second stamp anywhere on the receipt, a profit and a loss reading the same colour, a
  click that fires off a hardcoded price rather than the current Decoration price list, or a settlement figure
  that differs between motion and reduced motion

#### UI-Q-v29-29 — ORDER FLOATING TODAY LINE

(User 2026-09-25; owner `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE.)

SETUP:
ORDER on a Day with two or more Gates at 360 / 390 / 412 and 1280: at the top, then scrolled to the offer rows.

PASS:
- at the top the floating box holds the Death line only; scrolled past the `오늘` block it adds the same `오늘` line under a rule
- the two facts read apart (rule, its own `오늘` label); the counts equal the block's; nothing covers the offer controls
- scrolled past the ledger, `발주 후` joins last, under its own rule and label; it equals the ledger's value, follows every
  quantity tap without the box blinking, and turns the short color below zero (v2.9.11 quick patch, User 2026-09-29)
- no scroll position where a source is hidden under the box without its copy, or shown twice
- one tap on the key folds the whole box, Death line included, to a `요약` chip and back; a quantity tap, the next Day's ORDER
  and a reload keep it folded; the key and the chip clear the menu pin on a phone (User 2026-09-29)
- the three labels share one column and one style, the three values one size; the box stays tight

FAIL:
- the 오늘 line doubled while its block is on screen, merged into the Death sentence, or a count that differs from the block
- `발주 후` in the box differs from the ledger, lags a tap, or sits above the Death line

#### UI-Q-v29-50 — ORDER WAREHOUSE PANEL (User 2026-09-29)

Verify UI_UX §ORDER — WAREHOUSE PANEL at 360 / 390 / 375×548 and 1280, with stock held.

PASS:
- the 발주서 carries no warehouse block at any width
- desk: the form is set left; the warehouse rack is large, open, stays in view while the form scrolls and clears the menu pin
- phone: the `창고` handle sits on top of the dock from the top of the form and covers no offer row; it opens the list rising
  from the dock, at most 45% of the screen; the rows above it scroll and take taps; a quantity tap keeps it open; the handle
  or Escape closes it; a fresh account starts folded and the next Day keeps the player's choice
- handle, sheet and column read as a steel storage rack - material and value apart from the floating box's brown and the
  발주서's paper, with no decorative stripe or stacked frame (PRESENTATION §Edge / material); one cell per slot,
  a held unit per filled cell, the empty cells equal the room left
- the rack equals the warehouse; no console or runtime error

FAIL:
- the handle or sheet covers an offer control that cannot be scrolled clear, the sheet dims or locks the form, or a
  quantity tap closes it
- a second copy of the warehouse on screen

#### UI-Q-v29-51 — D30 CANDIDATES / FINAL 준비 NOTEBOOK (User 2026-09-30)

Verify FINAL_EXPEDITION §D30 PLAYER FLOW and UI_UX §PARTY SELECTION at 360 / 390 and 1280.

PASS:
- the last order's dock carries `원정대 후보 보기` beside `원정대 선택`, the same bar; on a phone both sit on one row,
  neither label wraps
- it opens `원정대 후보`: the muster's candidates (alive, visited), each card opening the notebook; the notebook's footer is
  `원정대 후보 보기`, never `원정대 선택` / `원정대에서 빼기`; nothing about the party changes
- on the muster step the notebook still picks and releases as before
- FINAL 준비: `자세히 보기` under the Stat grid opens the supplied member's notebook with `돌아가기`
- no console or runtime error

FAIL:
- a pick or release possible while ordering, or a second muster on the order step

#### UI-Q-v29-52 — GATE TIER / FIRE GATE TUTORIAL (User 2026-09-30)

Verify UI_UX §GATE TIER / FIRE GATE TUTORIAL on MORNING at 390 and 1280, tutorial on.

PASS:
- the first board with a two-Hazard Gate shows `II 게이트부터는 위험이 두 가지다. 위험마다 버티는 능력치가 다르다.` on that
  plate; the first board with a FIRE Gate shows `화염 게이트는 위험이 하나뿐이지만, 요구 전력이 더 높다.` on that plate
- each once per account; a board without such a Gate shows neither; 건너뛰기 and reset behave as the other marks
- neither names an Item

FAIL:
- the two-Hazard mark on a FIRE II Gate (it holds one Hazard), or either mark on a closed Gate

#### UI-Q-v29-53 — COACH DIET (User 2026-09-30)

Verify UI_UX §TUTORIAL — COACH DIET / §SALE PRICE LESSONS on a fresh account, tutorial on, at 390 and 1280.

PASS:
- DAY 0 shows one mark (`점포지원`); MORNING shows no 방문객 / 게이트 mark (Deep and the II / FIRE Gate marks still show in
  their situation); the first ORDER shows `발주 확정` only; the first SALE shows destination and Stats only, then Bag after
  the first sale and the returning-customer mark on the first returning customer; NIGHT shows no `한 명씩` mark; CLOSING shows the one-clause receipt mark
- DAY 1 창고 head reads `창고 · 본사 기본 상품 N종` while only the opening stock is held; SALE's readout title reads
  `도착 시 전투 전망`
- the first 150% refusal shows §26-3 line 1 on the refused key, the first 50% sale shows line 2 on its change line (the line
  stays until the mark is closed); neither shows a second time on the account
- `node tools/measure-first-sale-v30.cjs`: fewer coach taps than the v2.9.12 baseline (16)

FAIL:
- a retired mark still shows, a mark names an Item, or a price lesson shows before its situation

#### UI-Q-v29-54 — END THIS RUN BLOCK (User 2026-09-30)

Verify UI_UX §END — THIS RUN BLOCK on END (Run Fail, bankruptcy, Final loss / clear) at 390 and 1280.

PASS:
- `이 점포의 기록` sits between `지금까지 연 점포` and `점포 자본 정산`, five rows in order, COPY_AUDIT §10-4 wording
- the figures are the Run's: its Day, visited customers and regulars made, Deaths (0 printed), the highest-Level customer
  (tie -> higher Loyalty, the dead included), all expedition records and their 대성공 count
- a Run with no expedition prints no `원정` row; a reload prints the same block
- the settlement block and the replay line read as before

FAIL:
- a lost adventurer named in the block, a new save field, or the block after the settlement

#### UI-Q-v29-32 — ORDER CONFIRM CASCADE

(User 2026-09-25, v2.9.2 H3; owner `UI_UX_v2.8.0.md` §ORDER — WAREHOUSE DISCLOSURE, ORDER CONFIRM.)

SETUP:
ORDER at 390 and 1280, motion on and reduced motion: 발주 확정 with 1 / 3 / 6 SKUs in the cart, the warehouse list open, and with 3 SKUs folded; frames at 0 / 45 / 90 / 160 / 230 / 320 / 400 ms.

PASS:
- one crate per ordered SKU lands on its own row; the last landing is within 320 ms at every SKU count
- each count moves once, prior -> resolved, on its crate's landing; a new SKU's row arrives with its crate
- the summary `N / M칸` · `N종` and the register's 창고 잔여 칸 move together on the last landing; folded, only they move
- at most three audible hits; 보유 골드 counts down to the resolved value in 220 ms
- under reduced motion the end state (counts, summary, till) is identical

FAIL:
- a crate per unit, a count that ticks up unit by unit, a cascade longer than 320 ms, a fourth audible hit, a changed `발주 완료.` line

#### UI-Q-v29-31 — SALE COUNTER FEEL

(User 2026-09-25, v2.9.2 H2; owner `UI_UX_v2.8.0.md` §SALE — COUNTER TRAY, COUNTER FEEL.)

SETUP:
SALE at 390 and 1280, motion on and reduced motion: one sale each at 50% / 정가 / 150% and one refused 정가, the tray unfolded; frames at 0 / 60 / 120 / 200 / 320 ms.

PASS:
- the pressed key moves 3px down and back within 120 ms; on a sale the pressed tray is visible for that press only and takes no input
- the A8 stub starts at the key landing (60 ms) and is settled by 260 ms; no stub on a refusal
- the refused key is pressed and shakes once where it locks
- the first coin tick is louder; 바가지's ticks start 40 ms later with a lower first tick; the counts stay 1 / 2 / 3
- a fifth sale looks and sounds exactly like the first
- under reduced motion the end state (tray cleared, stub text, Gold, Bag) is identical

FAIL:
- a second press on the 정가 key, a pressed tray that answers a tap, a stub before the key lands, any escalation with the sale count

#### UI-Q-v29-30 — FINAL RESULT SEAL STAMP

(User 2026-09-25, v2.9.2 H5; owner `UI_UX_v2.8.0.md` §FINAL RESULT — SEAL STAMP.)

SETUP:
A Final clear and a Final failure with 1-, 2- and 3-member parties, and a non-Final ending, at 390 and 1280, motion on and reduced motion.

PASS:
- a Final ending shows exactly one seal with the Boss's name at the right of the headline; a non-Final ending shows none
- clear: 200 ms hold, 2 × → 1 × in 90 ms, the tape gives 6 px; failure: 1.6 ×, 3 px, faint, crooked, partly printed
- the headline and reason appear after the landing and never sit under the seal; no word breaks mid-word
- one landing cue (`sealwin` / `sealfail`) on the landing frame; the `final` cue plays once
- under reduced motion the end state (seal, text, ink strength) is identical

FAIL:
- a seal per member, the NIGHT death tape on a failure, a seal covering the headline, or a failure seal as crisp as a clear

#### UI-Q-v29-46 — FINAL CLASH SCENE

(User 2026-09-27, v2.9.9; owner `UI_UX_v2.8.0.md` §FINAL — CLASH SCENE.)

SETUP:
A Final clear and a Final failure (a close one and a wide one) with 1-, 2- and 3-member parties carrying full, partial and
empty bags, at 360x640, 390x844, 1280x880 and 1920x1080, motion on and reduced motion; a tap mid-scene; a reload mid-scene.

PASS:
- each member's bag receives exactly the items that member carried, one at a time, before the first lunge
- the order is member 1 -> Boss counter -> member 2 -> Boss counter ... for every member in party order, the Boss
  countering after the last member too
- an impact marks no amount and never drops the red; the red drops by the member's share after each counter except the
  last, whose share waits for the verdict; the verdict hesitates near the bottom (5% on a clear, the resolved remainder on
  a failure) before it breaks or stays; the bar only ever falls
- the bar ends at 1 - min(1, rolled Party Power / effective Boss Power): empty on a clear, at least 3% on a failure;
  clear: the Boss card cracks and collapses; failure: the party's cards are pushed back and dimmed
- the ending then plays as UI-Q-v29-30
- the scene stays inside the stage and nothing leaves the screen; no damage figure, no party bar, no new copy
- a tap skips to the same ending at once; reduced motion shows no scene; a reload mid-scene opens the ending; one cue per
  landing (`rumble`, `supply`, `clash`, `counter`, `collapse`)

FAIL:
- an item a member did not carry (or one missing), the bar giving the result away before the verdict, the bar rising, a
  clear that does not empty the bar, an empty bar on a failure, a damage number, a skip that does not work, or anything of
  the scene in the Save

#### UI-Q-v29-28 — SALE COUNTER TRAY FOLD

(User 2026-09-25; owner `UI_UX_v2.8.0.md` §SALE — COUNTER TRAY.)

SETUP:
SALE at 360 / 390 / 412 and 1280 with a long shelf: pick a row, scroll the shelf, tap the folded strip, tap the readout, tap the same row, tap another row.

PASS:
- scrolling the shelf past 32px or tapping outside the tray / a row / the dock folds a filled tray to its header line on a phone
- the folded strip, the same row or another row opens it again; the selected Item never changes by folding
- picking a row never folds the tray it just filled; a desk never folds; nothing is saved

FAIL:
- the tray stays full height while the shelf is scrolled on a phone, a fold that clears the selection, or a folded tray that only reopens through the price keys

#### UI-Q-v29-27 — NIGHT VERDICT STAMP / CAUSE BEAT / REVERSAL OVERSTAMP

(User 2026-09-25, v2.9.2 H1; owner `UI_UX_v2.8.0.md` §NIGHT LAYOUT — VERDICT STAMP, principle PRESENTATION_PRINCIPLES §GAME FEEL BEAT.)

SETUP:
NIGHT results reached through 다음 at 390 and 1280, motion on and reduced motion: 성공, 대성공, 퇴각, 부상, 중상, 사망, a
result with a Hero Item line, a 귀환석 reversal (`rescued`) and a Death turned away (`avoidedDeath`); frames through the landing.

PASS:
- the card stands first and the tag lands after it; 성공 / 퇴각 have no hold, 대성공 / 부상 / 중상 / 생환 / 사망 hold ≤ 200 ms
- the stamp falls from 1.6 × (퇴각 1.3 ×) in 90 ms; on the landing the card dips 4 px (퇴각 2 px) and settles, nothing else moves
- 대성공 is one gold landing; 부상 keeps a red ink spread, 중상 a slightly misaligned tag, 사망 a black tape laid in ≤ 500 ms
- a reversal prints the turned-away Outcome (`사망` / `중상`) first, then `생환` overstamps it; the Insurance proof lines appear on that frame; a Death 만반의 준비 turned away prints `사망` and its own 부상 / 중상 overstamps it (User 2026-09-25)
- with a Hero Item line that line settles once and the figures do not count; without one only the REWARD figures count up
- the Outcome cue's first note is heard on the landing; on a reversal `rescue` is heard on the overstamp; one visual, one sound, one cause / number at a landing
- the last motion ends by 770 ms; 다음 / 전체 건너뛰기 answer at any frame and no pending cue plays over the next screen
- under reduced motion the end state is identical: same tag, ink / misalignment / tape, figures at their values, no first print

FAIL:
- a stamp on a death, two stamps on a 대성공, a reversal on 강골 / 구급키트 results, a ring, flash, shake or particle
- a count-up beside a Hero Item line, a count on GROWTH / AFTERMATH figures, a faint first print left in the end state, or a changed Outcome type size

### CLOSING

#### UI-Q18 — CLOSING ECONOMICS
SETUP:
Open Closing.

EXPECT:
Economic result is visually primary (v2.9.7 cash-flow receipt):
영업 전 자금 -> 매출 / 발주 / 운영비 (+ other moved rows) -> 보유 자금 box (stamped) with 영업 손익 ±N (green / red, gold at 0);
창고 재고 and 오늘 폐기 on separate lines, 오늘 폐기 naming up to three Items (×n from two) then 외 N종; 내일 운영비 예상 (not on DAY 29);
no 판매 원가 / 판매 마진 / 폐기 원가 row; 영업 전 자금 + ins - outs = 보유 자금 exactly; no page scroll at 390 x 780

PASS:
Night story is not duplicated as dominant content.

#### UI-Q-v28-13 — CLOSING FOOTER

The redundant internal-accounting footnote is absent from the primary receipt.

#### UI-Q-v28-17 — CLOSING ECONOMICS ONLY

Primary Closing receipt has no \`오늘의 보급 영향\` block and no internal-accounting footer.

NIGHT remains the result/causality owner.

### RELIC / STORE SUPPORT

#### UI-Q36 — RELIC VISIBILITY / QUICK VIEW
SETUP:
Own Relics and move through Morning -> Order -> Sale.

EXPECT:
Owned Relic effects remain quickly accessible in all three phases.
Sale view is read-only.

PASS:
Player can recall store-build effects while making decisions without violating purchase timing.

#### UI-Q37 — RELIC MILESTONE REVEAL
SETUP:
Reach D5/D10/D15/D20/D25/D30.

EXPECT:
New candidate window receives one focused reveal.
Buy / `나중에 결정` are clear.

PASS:
D10/D15 etc. never feel like the Relic choice simply failed to appear.

### BOSS / FINAL

#### UI-Q93 — FINAL TIMELINE

PASS:
- D0 objective notice
- D10 FINAL20
- D20 FINAL10 + Recon beat
- D25 FINAL5 + exact persisted Family/Hazard disclosure
- D30 reuses known state
- no permanent new Final dashboard required

#### UI-Q40 — BOSS / RELIC REVEAL ORDER
SETUP:
Reach D5, D15, D30 with relevant Boss state.

EXPECT:
- D5 Identity is read before D5 Relic choice
- D15 exact Trait is read before D15 Relic choice
- Save/Reload does not reorder or replay reveals as an exploit

PASS:
The Player receives information before the decision it is intended to affect.

#### UI-Q41 — SLOTH WINDOW CHOICE CLARITY
SETUP:
Open a selected SLOTH opportunity window.

EXPECT:
Player can distinguish the mutually exclusive outcomes:
- acquire normal Relic
- break one Sloth Seal for 0G

PASS:
No UI implies both can be obtained from the same window.

#### UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
SETUP:
Reach D5 and D15 for multiple Bosses, then enter Final with:
- PRIDE
- ENVY
- GREED
- GLUTTONY
- LUST
- one non-SLOTH ordinary Boss
- SLOTH at Seal Break 0 and at 1/2/3 where practical

EXPECT:

D5:
- in-world `길드 토벌 공고` framing
- correct D5/D15 BASE art
- correct fixed Boss name
  - GLUTTONY identity follows `BOSS_v2.8.0.md`: `탐식의 마왕 글러트니`
- correct Boss-specific Flavor
- exact Trait remains hidden

D15:
- `길드 정보 보고` framing
- same BASE identity art
- exact Trait Function visible
- no strategy advice replacing Function
- no internal design terminology in Player-facing copy

D25:
- `최종 정찰 보고` framing
- exactly two Families
- each Family's actual T2 Hazard set
- authoritative Hazard pressure wording
- Family count is not mistaken for a fixed Hazard-key count

Final preview:
- PRIDE participant 투력 original -> applied
- ENVY target 4 Stats original -> applied
- GLUTTONY preview follows `BOSS_v2.8.0.md`: all positive Core-Stat contribution originating from Items is reduced to 50%; no Rarity threshold
  - Counter / 피로 회복 / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
- LUST affected non-regular participant 4 Stats original -> applied
- GREED display matches actual applied strengthening
- SLOTH displayed state matches Seal state

Final art:
- ordinary Boss uses D30 BATTLE
- SLOTH SB0 reuses BASE
- SLOTH SB1/SB2/SB3 uses matching D30 state
- Final confrontation is not text/name-only

PASS:
Boss art, exact information timing, and previewed applied values match the actual Final resolution without creating a new permanent Phase or exposing exact success probability.

#### UI-Q-v28-10 — BOSS MOBILE DENSITY

At 360x800:
- D0 has no Boss art and presents the objective/cadence as basic dossier information
- D5/D10/D15/D20 Boss art max-height baseline 240px
- D25 Boss art max-height baseline 200px
- D5/D10/D15/D20 reuse the same centered Boss-art family
- D10/D20 are compact because their report payload is shorter, not because the Boss becomes a
  64px icon
- no small-Boss + wide-empty-space composition
- core information and acknowledgement are not pushed off first viewport solely by art

#### UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF

Verify the current presentation around D0 / D5 / D10 / D15 / D20 / D25 / D30.

PASS:
- each cue/art treatment reveals no information earlier than its owning beat
- after the first DAY 0 Store Support choice, D0 is the first presentation step of DAY 1 MORNING
- D0 blocks ordinary Morning progression until acknowledged but consumes no time / RNG / resource
- D0 has no Boss identity, art, silhouette, Trait, Final state or FINAL domain backdrop
- a pre-acknowledgement save still owes D0 after reload; a post-acknowledgement save does not replay it
- a save already beyond DAY 1 does not receive D0 retroactively
- D25 presentation may reflect the exact Final state only after that state is revealed
- D30 may intensify FINAL entry but adds no new Boss-information beat or fact
- Boss/Final presentation does not consume Gameplay RNG
- existing seen-state / Save-Load behavior remains unchanged
- at mobile width, information and acknowledgement remain usable

#### UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION

Run controlled D0 / D5 / D10 / D15 / D20 / D25 / D30 states on phone and desktop.

For each beat verify both information impact and layout economy.

PASS:
- D0 first-Morning objective / investigation start is unmistakable without Boss art or an oversized empty reveal
- D5 identity has enough visual presence to register as the Boss reveal
- D10 combat-question beat is clearly a new investigation and remains concise while retaining the full Boss-art family
- D15 exact Trait is visually stronger than a routine notice and remains readable
- D20 route/environment beat is clearly new and remains concise while retaining the full Boss-art family
- D25 Final Family/Hazard disclosure is prominent and readable before the same-Day decision flow
- D30 creates Final-entry emphasis without presenting a new information payload
- acknowledgement/action control remains visible/reachable
- no horizontal overflow
- no avoidable vertical overflow created by art/decorative framing
- no large unused modal area around short content
- no required information is reduced to unreadable scale merely to avoid scrolling

Boss report detail PASS:
- no artificial floor/divider line remains under D5/D15/D25 Boss art
- D5 Flavor has no non-semantic left accent bar
- D15 Trait uses typography/spacing only: no left accent bar and no replacement text box
- D25 keeps semantic Family colour rules but has no extra black top rule above the Family section

The current 240px / 200px phone presentation measurements remain exact until the UI_UX
owner is amended. For D5/D10/D15/D20/D25, PASS also requires the Boss to read as a centered visual anchor,
with the owned information directly below/around it rather than a small character floating beside
unused space. If runtime evidence shows an exact value itself causes a functional failure, report
the evidence as a Functional Design finding and patch Canonical first; do not silently tune Source.

#### UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT

Controlled D30 Final with eligible participants.

PASS order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- participant selection is confirmed before Final preparation begins
- selected participants are handled one at a time using the familiar two-slot Item interaction
- each participant has exactly two visible Item slots
- selected Item shows exactly one fixed Final price: ordinary 50% / 매입가 amount
- 100% / 150% controls are absent
- purchase/refusal chance and refusal-result UI are absent
- same-SKU refusal-price lock UI is absent
- Wallet / affordability / inventory state remain readable
- unaffordable transfer is visibly non-committable with readable reason
- committed transfer updates stock and NPC Wallet before the remaining-slot decision
- Player Gold increases by the same fixed amount
- Gross Sales increases by the same fixed amount exactly once
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
- Boss-caused visible Item changes use the current Final truth
- there is no separate attack/QTE/combat-control layer
- there is no second free-equip screen after Final preparation
- after all participant preparation interactions finish, the UI advances to the one Final result

#### UI-Q-v28-32 — FINAL PARTY / PREPARATION

Run D30 Final on phone and desktop.

PASS:
- unselected Final roster cards do not use rarity-coloured outer frames that compete with selection
- selected state is immediately distinguishable; rarity remains readable as text
- 1, 2 or 3 participants can be deliberately committed when eligible
- the selection stage shows the approved forecast-after-commitment guidance and no combat forecast
- a sub-3 party receives the approved confirmation before commitment
- after commitment exactly one party-wide `토벌 전망` is shown
- the first activated `토벌 전망` is explained once by the existing Coach
- afterward the same explanation remains reachable through the anchored `?` Help
- no standing forecast-explanation paragraph remains under the readout
- 1/2/3-person forecasts use the actual committed party
- the forecast updates after a committed Final transfer
- no individual `전투 전망` or failure-to-death percentage survives in Final preparation
- no player-facing `Final 효과 없음` copy remains
- no-effect Item uses the approved Demon-Castle copy and cannot be committed
- insufficient Wallet shows exact required/owned Gold inline and transfer remains disabled
- no ordinary SALE purchase/refusal dialogue appears in Final preparation
- an otherwise valid affordable Final transfer is deterministic
- no horizontal overflow at 360/390/412 and desktop 1024/1280
- the sub-3 confirm's two actions share one geometry family; no visible header 닫기 beside `돌아가기`
- Final action labels are one line at 360/390/412; body / Item-effect text may wrap
- a blocked transfer shows its reason outside the disabled action
- the menu pin does not cover the party count, including with the party section scrolled to the top

### STORE MANAGEMENT / META

#### UI-Q-v28-1 — STORE MANAGEMENT

PASS:
- Store Capital visible
- four fixed Slots visible
- owned/unowned/equipped distinguishable
- purchase confirmation spends exactly once
- loadout read-only during active Run
- scrolled down the panel, 구매 · 구매 확정 · 취소 · 적용 · 해제 each keep the pressed row where it was on screen (User
  2026-09-29); runtime evidence `tools/qa-deco-seating.cjs` (360x597, 1280x880)

#### UI-Q-v28-2 — PRE-RUN RETURN PATH

From the pre-Run/foundation Decoration management screen:

PASS:
- explicit Back/Return reaches new-Run preparation
- repeated management -> return cycles do not produce blank UI
- no Seed/Decoration reroll caused merely by returning
- mobile browser/system back does not strand the Player in an empty stage

Run on a real mobile browser or equivalent mobile runtime, not Source inspection only.

#### UI-Q112 — PRE-RUN DECORATION EMPTY SLOT

PASS:
- `비움` carries no `주의 ·` / error styling
- before a Run, every Slot row including `비움` is actionable
- tapping a Slot row enters the existing 점포 장식 codex tab (label `점포 장식`, (User 2026-09-24, v2.9.0)) focused/scrolled to that Slot
- active-Run loadout remains frozen/read-only

#### UI-Q-v28-20 — DECORATION DECISION SURFACE

Store management shows name/effect/price-or-ownership/equipped state.

Decoration Flavor prose is absent from this management decision surface.
No extra Collection UI is required.

#### UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES

Using controlled states, verify every implemented live-store growth trace is derived from state that
already exists and is already Player-knowable.

At minimum cover each listed trace family that is present in the implementation:
- equipped Decoration
- owned Store Support / facility
- Trusted Regular presence
- D25+ revealed Final-preparation state

PASS:
- adding/removing the owning state adds/removes its trace
- Save/Load reproduces the same trace from the same state
- trace is presentation-only and not an interactive gameplay control
- no hidden Boss / Hazard / NPC information appears early
- multiple traces remain readable without changing gameplay ownership

FAIL:
- a trace exists without its owning state
- visual state requires a second gameplay/progression field
- a decorative prop changes a mechanic

#### UI-Q-v28-18 — STORE CAPITAL CURRENCY

No active Store Capital display appends G.

Gold still uses G.

#### UI-Q-v28-14 — DECORATION ART / SETTLEMENT

Decoration-art, Store Capital settlement and Franchise-retirement checks remain active as defined
by META_v2.8.0.md and CORE_RUN_v2.8.0.md.

#### UI-Q42 — META PROGRESSION PRESENTATION
SETUP:
Open Meta/HQ progression on accounts with different matrix states.

EXPECT:
- no Global Meta XP progress bar is presented as current truth
- Job × Boss clear cells are readable
- per-Job Mastery and Total Mastery derive consistently
- Distinct Boss unlock milestones 1/3/6 are clear

PASS:
UI matches META_v2.8.0.md and does not resurrect legacy progression truth.

#### UI-Q39 — MONSTER KNOWLEDGE — RETIRED FROM THE CODEX
(User 2026-09-26, v2.9.6; owner `UI_UX_v2.8.0.md` §META UI.)

PASS:
- the codex tabs are 진행도 · 상품 · 직업 · 점포지원 · 점포 장식; no `몬스터 지식` tab, and no `보급 생환 N회` / `관찰 N회` progress line on any screen

### MENU / SETTINGS / DEBUG

#### UI-Q71 — MENU EXACT

Top-level exactly:
- 모험가 수첩
- 도감
- 점포지원
- 점주 가이드
- 설정
- 현재 지점 포기

PASS:
- no top-level Sound
- no top-level Full Data Reset
- no `설정 · 저장`

#### UI-Q72 — SETTINGS EXACT

Settings contains:
- 저장 내보내기
- 저장 가져오기
- Sound
- BGM
- SFX
- Full Data Reset

PASS:
- 현재 지점 포기 absent from Settings.

#### UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR

PASS:
- functional composition unchanged
- Run-abandon action remains top-level and separate from Full Data Reset
- exact Run-abandon label is `현재 지점 포기`
- Menu uses one surface + row navigation rather than dashboard-card grid
- Settings uses one utility panel
- destructive action separated
- no new control framework

#### UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY

Ordinary Player surface:
- \`소리 켜기 / 소리 끄기\`
- \`전체 데이터 초기화\`
- no reproducibility Seed control
- no \`로컬 실행 지원 · 외부 연결 없음\` footer

No new Debug menu is required for PASS.

#### UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH

Ordinary Player verification:
- pre-Run has no reproducibility Seed field
- Settings has no visible Debug entry
- ordinary Player flow contains no QA/runtime footer copy

Manual deterministic reproduction:
1. Full Data Reset or import a fixed QA Save.
2. Open browser Developer Tools -> Console.
3. Run:
   `Guild24.game.start('qa-v28-fixed-seed'); Guild24.render();`
4. Confirm:
   `Guild24.game.run.seed === 'qa-v28-fixed-seed'`
5. During the active Run run:
   `Guild24.showDebug()`
6. Confirm the Debug view exposes the existing seed/RNG/offers/NPC/Dungeon/Result/Boss diagnostic payload.
7. Close and repeat from the same controlled Account state with the same seed; deterministic Run state must reproduce according to the existing seeded contracts.

Shortcut coverage:
- `Ctrl+Shift+D` opens the same development Debug view during an active Run.

FAIL:
- deterministic seed reproduction requires restoring a Player-facing Seed field
- Debug becomes ordinary Player navigation
- removal of Player-facing QA copy also removes the development reproduction capability

### TUTORIAL / HELP

#### UI-Q19 — TUTORIAL OVERLAY
SETUP:
Trigger tutorial steps.

EXPECT:
- dim background
- spotlight target
- anchored bubble
- no layout push
- next/skip

PASS:
No in-flow instructional green card.

#### UI-Q20 — TUTORIAL RESPONSIVE POSITION
SETUP:
Trigger tutorial near viewport edges on mobile.

EXPECT:
Bubble repositions and target remains reachable/visible.

PASS:
No clipped or offscreen instruction.

#### UI-Q21 — TUTORIAL PERSISTENCE
SETUP:
Complete tutorial and reload.

EXPECT:
Completed tutorial does not restart.

PASS:
Completion state persists.

#### UI-Q15 — FORECAST TUTORIAL
SETUP:
Trigger first forecast explanation.

EXPECT:
Explains estimate can differ from actual outcome.

PASS:
Does not reveal exact RNG/formula.

#### UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT

Before treating tutorial work as complete, inspect the real current tutorial source and run the existing sequence end-to-end.

PASS only if:
- an actual tutorial sequence is still reachable in current Source
- its first trigger is not dead/unreachable
- each step can advance through its intended interaction
- completion state persists after normal completion
- no runtime exception or phase blocker interrupts the tutorial

If Source contains tutorial data/UI but no reachable trigger, this is an implementation bug, not permission to delete the tutorial.

#### UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL

Test all current fresh-init paths owned by `CORE_RUN_v2.8.0.md`.

Case A — Full Data Reset:
1. complete or dismiss tutorial so its completion flag is set
2. perform Full Data Reset
3. start the newly initialized current account

PASS:
- old tutorial completion/dismissal state is gone
- tutorial is eligible and actually appears/starts on the first applicable flow

Case B — legacy-only internal state:
1. leave only a v1~v7 internal-test state
2. enter current v8 build
3. allow current policy to reject migration and create fresh v8

PASS:
- stale legacy tutorial state cannot suppress current tutorial
- current fresh v8 behaves like a clean first install for tutorial eligibility

Case C — ordinary Run Abandon/new Run under the same account:
PASS:
- tutorial completion remains preserved
- tutorial is not forcibly replayed merely because a Run restarted

FAIL if a true fresh account can enter ordinary gameplay without the tutorial because of a stale completion/reset flag.

#### UI-Q73 — FULL RESET TUTORIAL

After Full Data Reset, start fresh.
PASS: Tutorial can appear again and no stale completion state survives.

#### UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER

(User 2026-09-24, v2.9.0)

PASS:
Tutorial explains Stat pressure / Counter contribution / readiness and one Supply/Fatigue fact: Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신.

FAIL:
Tutorial instructs a specific correct SKU for a Hazard as the solution.

#### UI-Q113 — TUTORIAL COACH COPY / TARGETING

PASS:
- every current coach step uses the exact current COPY owner text
- ORDER confirm explicitly says it commits only the current cart and ORDER remains available
- SALE coach targets a visible mobile element, never the hidden desktop duplicate
- fresh/reset tutorial reachability from UI-Q105/Q106 remains intact

#### UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT

Audit every current coach step, including optional/contextual steps, on the responsive layout where
it can appear.

For each step capture:
- tutorial text
- runtime target selector / actual visible matched element
- spotlight bounds
- coach-copy placement
- next actionable control

PASS:
- highlighted UI is exactly the fact/action the text teaches
- target is visible, not the hidden duplicate for another breakpoint
- spotlight includes the complete meaningful target without swallowing unrelated neighboring UI
- copy and spotlight remain readable together after any automatic scroll
- coach UI does not cover the target or next required control
- a relationship lesson highlights the smallest useful shared region or uses sequential steps
- contextual missing targets skip cleanly and do not block later lessons
- the lesson explains how to read the system, not which gameplay answer to choose
- the same step remains semantically correct at phone and desktop layouts

FAIL examples:
- text explains Hazard readiness while only an unrelated destination heading is highlighted
- one button is discussed while the entire card/column is spotlighted without need
- only part of a tall meaningful target is cut out
- automatic scroll places the target behind a dock/header
- coach text describes data that is not inside or meaningfully related to its highlight
- spotlight is enlarged merely to mask a target/copy mismatch

If the runtime target is wrong, fix targeting/layout.
If the Copy is wrong, route the Copy correction through the current Copy owner.

#### UI-Q-v29-10 — DAY 1~3 TASK LINE

(User 2026-09-24, v2.9.0)

SETUP:
Fresh account with the tutorial not skipped: DAY 1, 2, 3 and 4 of one Run at 360 and 1280, every phase; DAY 0; then an account whose tutorial is skipped (`tutorial.skipped` true) on DAY 1.

EXPECT:
One fixed text line at the top of the phase content (under the menu pin, above the first block): no coach mark, no spotlight, no button.

PASS:
- DAY 1~3 MORNING / ORDER / SALE / NIGHT / CLOSING each show exactly the `COPY_AUDIT_APPROVED_v2.8.0.md` §3-8 string: `오늘 할 일 — 열린 게이트의 위험을 본다` / `오늘 할 일 — 위험에 맞는 능력을 올리는 상품을 발주한다` / `오늘 할 일 — 손님이 갈 게이트를 보고 상품과 가격을 정한다` / `오늘 할 일 — 준비가 어떻게 됐는지 확인한다` / `오늘 할 일 — 오늘 장사를 정리한다`
- the line never wraps to a second line at 360
- DAY 0 has no task line; from DAY 4 the line is gone
- with the account tutorial skipped the line is absent on DAY 1~3
- it reuses the tutorial state, adds no Save field, and adds exactly one line of page height (the User-approved exception to "tutorial does not add page height")

FAIL:
- the line appears on DAY 0, on DAY 4 or later, or with the tutorial skipped
- the line is a coach mark / spotlight / button, or wraps at 360

#### UI-Q-v29-11 — FIRST-ORDER COACH ORDER / TARGETS

(User 2026-09-24, v2.9.0)

SETUP:
Fresh account, first ORDER at 360 and 1280; step through the coach.

EXPECT:
The ORDER coach group runs `gates` → `stock` → `offer` → `quantity` → `confirm` → `reroll`, one concept per step.

PASS:
- the steps appear in exactly that order and nothing else is in the group
- `gates` (step id `order-gates`, apart from MORNING's `gates`, so seeing one never marks the other seen) highlights the ORDER 오늘 brief block and reads `오늘 열린 게이트와 위험. 위험 보기를 누르면 무엇으로 막는지 나온다.`
- `stock` (step id `order-stock`) highlights the ORDER 창고 summary and reads the COPY_AUDIT §3-7 STOCK line (User 2026-09-29, v2.9.11)
- `offer` highlights the first offer row and reads `후보 상품의 효과. 오늘 위험에 맞는 효과는 굵게 보인다.`
- `quantity` / `confirm` / `reroll` keep their approved lines (COPY_AUDIT §3-7 QUANTITY / §3-2 / COPY_WORLD_VOICE §TUTORIAL COACH COPY); `reroll` is last
- no `gold` mark: `#order-register` carries no coach step
- every step passes UI-Q-v28-27 target truth

FAIL:
- a step reads 보유 골드, or the register is the first target

#### UI-Q-v29-12 — ORDER TODAY-FIT EMPHASIS — RETIRED

Retired (User 2026-09-24, v2.9.0): see UI-Q-v29-22. PASS is now: no effect text on any ORDER offer row carries an emphasis style against today's Gates. The setup below is kept as the negative case.

SETUP:
ORDER on a day with known open Gates; offers holding a Counter for one of today's Hazards, an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.

EXPECT:
The same rule and style as UI-Q-v29-6, judged against today's open Gates instead of one customer.

PASS:
- only effect text that is a Counter for one of today's Hazards, or the Core Stat one of them presses, is set in the emphasis style
- every other effect text keeps the default style
- no badge, no `오늘 필요` or other verdict word, no row reorder, no recommended row

FAIL:
- a badge / word / reorder marks the fit, or a non-matching effect is emphasised

#### UI-Q-v29-13 — ORDER PER-GATE VISITOR COUNTS

(User 2026-09-24, v2.9.0)

SETUP:
ORDER on a one-Gate day and on a day with two or more open Gates; compare the counts with the destinations the SALE queue's customers claim; include a 거짓말쟁이 and a 게이트 순례 주간 reroute where available.

EXPECT:
The ORDER 오늘 line follows `COPY_AUDIT_APPROVED_v2.8.0.md` §4-21.

PASS:
- one Gate: the line reads `{N}명 · {Gate}` with no per-Gate count
- two or more Gates: `{N}명 · {Gate A} {a} · {Gate B} {b}`; the per-Gate numbers sum to N
- each count follows the destination the customer claims; a liar's or a rerouted customer's true Gate is not exposed by the count
- no name, Job, Trait, Wallet or individual destination of a future customer is revealed (UI-Q91 / UI-Q101, narrowed to the individual)

FAIL:
- per-Gate counts on a one-Gate day, a count that exposes a true Gate, or any individual identity

#### UI-Q-v29-14 — D0 BRIEFING TWO LINES / GUIDE 처음 3일

(User 2026-09-24, v2.9.0)

SETUP:
Fresh Run: the D0 Boss briefing after the first Store Support choice; then open 점주 가이드 from the menu at 360 and 1280.

EXPECT:
The briefing body is the two `COPY_AUDIT_APPROVED_v2.8.0.md` §14-1 lines; the guide opens on `처음 3일` (§8-0) with the eight sections under `자세히`.

PASS:
- the briefing shows header `마왕 조사 개시`, the unchanged lead line, then a `DAY 05` label over exactly `첫 조사 보고로 토벌 대상이 공개된다. 이후 5일마다 이어진다.` and a `DAY 30` label over exactly `성장한 모험가 최대 3명을 마왕성으로 보내 최종 토벌에 나선다.` (User 2026-09-25), and the unchanged button
- `조사 정보를 확인하며 토벌대를 준비하고, DAY 30까지 점포를 운영해야 한다.` is absent
- the two labels read on the record's LED face (16px; 17px on a desk) and the two lines in the record's body weight (15px ink; 16px on a desk), never the secondary tone (RUNTIME UX BUG found on the live build 2026-09-25: the two-line body had no style rule)
- 점주 가이드 opens on a first block `처음 3일` with exactly the five §8-0 lines in order
- the existing eight sections (§8-1 … §8-8) sit under a `자세히` disclosure, collapsed by default, and open on tap
- the disclosure exists only inside the help modal; no gameplay screen gains one

FAIL:
- the `DAY 5` / `DAY 30` paragraph body or the closing sentence remains; `처음 3일` is missing; `자세히` is open by default

#### UI-Q-v29-15 — STORE SUPPORT CARD COPY, TWO CLAUSES

(User 2026-09-24, v2.9.0)

SETUP:
Open the DAY 0 Store Support takeover and the owned-Relic modal on a Run that owns several Store Supports, at 360 and 1280.

EXPECT:
Every card body is the exact `COPY_AUDIT_APPROVED_v2.8.0.md` §11 line for that Store Support.

PASS:
- all thirty card bodies match §11-1 … §11-30 verbatim; effect first, condition after ` · `; no HQ-accounting clause
- values and effects match RELIC_v2.8.0.md (copy changed, rules did not)

FAIL:
- a card shows the pre-v2.9.0 wording, or a body that is not the §11 line

#### UI-Q-v29-16 — NO SECOND OWNED-RELIC BLOCK IN SALE

(User 2026-09-24, v2.9.0)

SETUP:
SALE with owned Store Supports at 360, 390, 412, 1024 and 1280; then the FINAL preparation screen.

PASS:
- SALE shows the compact owned-Relic control in the shelf heading and no owned-Relic block lower in the column at any width
- the FINAL preparation screen still lists owned Store Supports

FAIL:
- a `보유 점포지원` block appears under the Trait rows on desktop, or the FINAL list is gone

#### UI-Q-v29-17 — WAREHOUSE LIST STARTS COLLAPSED

(User 2026-09-24, v2.9.0)

SETUP:
Fresh account, first ORDER at 360 and 1280; open the list; reload; next Day's ORDER.

PASS:
- the held-stock list is collapsed on first ORDER and the summary line (used / total slots, kinds) is visible
- at 360 the first offer row is reachable without scrolling past an open list (v2.9.11 quick patch: the list is the phone's
  warehouse sheet, which never pushes the rows - UI-Q-v29-50)
- opening it persists across the reload and the next Day until the player folds it

FAIL:
- the list starts open on a fresh account, or the summary line hides inside the collapsed detail

#### UI-Q-v29-18 — COUNTER TRAY

(User 2026-09-24, v2.9.0)

SETUP:
SALE at 360, 390 and 1280: entry, tap one shelf row, tap a second row, one successful sale, one refusal.

PASS:
- at entry the tray is empty: on DAY 1~3 with the tutorial active one line (`상품을 누르면 계산대에 올라온다.`, ≤ 48px at 360), otherwise no height; the shelf heading plus at least one row are visible without a scroll
- tapping a row fills the tray (header line, `판매 후 변화`, `특수 효과` when any, three price keys) and the shelf list does not move: no row changes height, scrollTop is unchanged
- tapping a second row swaps the tray contents; both rows stay where they were
- the filled tray is ≤ 200px at 360 and at least three shelf rows remain visible above it
- on a portrait stage under 700 high the filled tray is the tighter step (about 124px at 360) and at least three shelf
  rows remain above it from 640 high up (UI_UX §SHORT PHONE, User 2026-09-30)
- the price keys are at the same place for every Item; the hand-over icon starts from the tray icon and lands on the Bag slot; a successful sale clears the tray
- a refusal keeps the Item on the tray with the refused key locked (`오늘 거절됨` / `더 싼 값을 거절함`)
- on 1280 the tray lies in the middle area on the counter, between the ledger and the shelf (User 2026-09-30)
- FINAL keeps its per-row panel (UI-Q-v28 FINAL ids unchanged)

FAIL:
- the shelf list moves or changes height when a row is tapped
- the filled tray hides all but two shelf rows at 360
- the tray needs a drag, a scroll or a second tap to reach the price keys

#### UI-Q-v29-19 — GATE HAZARD REQUIREMENT NUMBER

(User 2026-09-24 revision, v2.9.0)

SETUP:
MORNING Gate plates and the ORDER 위험 보기 modal on a T1, a T2 and a T3 day; the SALE destination plate of a customer going to one of them; the D25 최종 정찰 보고 and the FINAL 확인된 위협 rows.

PASS:
- every Hazard row states the Gate-level requirement first: MORNING plate, SALE destination plate, D25 report and FINAL rows read `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; Gate detail alone reads the full sentence `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다`
- on a phone the short row is two lines, `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공`; on the SALE destination plate `{위험}` and `대응 {N} 필요` share the first line and the conversion line starts under the Hazard name, so no Hazard takes a third line and nothing overflows at 360 / 390 / 412 (`대응 {N} 필요` one type step smaller there; User 2026-09-25); at 900px+ one ` · ` line; the SALE Stat grid shows the pressing Hazard tag beside the Stat name on one line with no overflow, and the value is smaller than before yet larger than the name (User 2026-09-25)
- N equals ceil(Hazard Threat) of that Gate on that Day (DUNGEON_HAZARD §HAZARD THREAT), so it rises with Day and Tier; n is 3 for 강인함 and 2 for 기동 / 정신 (Stat n당 대응 1)
- no `{위험} · {label}` row and no destination-plate `?` help survive; D25 / FINAL show N = 29 (Day 30 / T2); no per-customer remaining need, no readiness number, no 0.75 / 0.40 threshold appears anywhere (User 2026-09-24 revision 2)
- no Item name and no verdict word

FAIL:
- a per-customer "더 필요" number, a readiness ratio, or a requirement number that does not match ceil(Hazard Threat)

#### UI-Q-v29-20 — SHELF EXPIRY ORDER

(User 2026-09-25, v2.9.0)

SETUP:
SALE with a shelf holding units stocked on different days (some at 1 day left), at 360 and 1280; the same shelf for two customers going to different Gates.

PASS:
- the shelf rows are ordered by kind (대응 장비 -> 음식 -> 음료 -> 포션 -> 보험 -> 특수), then days left before discard, nearest first, then higher Rarity; ties keep the existing order; the order is identical for both customers (v2.9.7)
- selling units, including the last unit of an Item's oldest batch, moves no other row within the Day; a sold-out row leaves; the next Day sorts afresh (v2.9.7)
- every row carries its shelf life (`폐기까지 N일`, then `내일까지` / `오늘까지`, v2.9.10), the tray and the 재고 정리 list the same;
  a row on its last day is emphasized in the warehouse `.soon` color
- no `유통기한 없음` / `기한 없음` state appears on the tray, the ORDER row or the warehouse list (every Item expires, 2~5 days)
- rows keep one name line + one effect line; no overflow at 360

FAIL:
- an order that changes with the customer's Gate, or a recommendation word

#### UI-Q-v29-21 — MENU ROUTING / THIS RUN'S DECORATIONS / ABANDON FLOW

(User 2026-09-24, v2.9.0)

SETUP:
A Run on DAY 0 (first choice pending), a Run on a Day whose Store Support window is spent or closed, and a Run at SALE; the menu on each.

PASS:
- menu rows exactly 모험가 수첩 / 도감 / 점포지원 / 이번 영업의 장식 / 점주 가이드 / 설정 / 현재 지점 포기
- 점포지원 opens the selection surface only while `canBuyRelic` holds; otherwise the owned list `보유 점포지원` with a close
- 이번 영업의 장식 lists the four Slots with the Run's frozen loadout and effect line; an empty Slot reads `비어 있음`; nothing is editable
- DAY 0 첫 점포지원 has no `장식 구성 다시 보기` button and no close
- 현재 지점 포기 → confirm (§1-3) → the Run is gone (`run = null`), the screen is 새 점포 준비 with no Run, a Decoration can be bought and equipped there, and no new Run has started; `첫 점포지원 고르기` starts it
- every other Run end (bankruptcy, death limit, 폐점, FINAL end) reaches a screen from which 다음 점포 열기 leads to the same 새 점포 준비 where Decorations can be bought
- the codex tab reads `점포 장식`

FAIL:
- abandon starting a new Run by itself, or a Decoration purchase refused with no Run

#### UI-Q-v29-22 — FIXED EFFECT ORDER / NO FIT EMPHASIS / TRANSACTION RESULT STUB

(User 2026-09-24, v2.9.0)

SETUP:
ORDER with offers of every category; SALE with a shelf of every category for two customers going to different Gates; one 50% sale, one 정가 sale, one 150% sale and one refusal on the same customer; the 점주 가이드; reduced-motion on and off, at 360 and 1280.

PASS:
- no effect text on any ORDER offer row or SALE shelf row is emphasized; the rows read the same for both customers
- every row lists its effects in the fixed per-category order: Food 피로 회복 first, Drink Stat / Counter first then 피로 회복, Potion 투력, Field Gear its Counters, Insurance its one line; the same order on the tray's 특수 효과 line and in the codex
- the first ORDER OFFER coach and the 점주 가이드 line under 처음 3일 read the exact category-grammar sentence (COPY_AUDIT §3-7 OFFER / §8-0)
- each successful sale shows one receipt stub over the counter band for about 2.5 s reading `단골도 {±N} · 소지금 {A} → {B}` with that customer's real Loyalty change and Wallet before → after; a second sale to the same customer replaces it; nothing reserves height and input is never blocked
- a refusal shows no stub; the reply line comes from the engine's reason pool (가격 / 필요도 / 일반 선택) and stays 5 s
- under reduced motion the stub appears and disappears without motion; the numbers are identical

FAIL:
- any fit emphasis, any recommendation word, a stub at the end of the day instead of per customer, or a stub whose numbers differ from the customer's record

#### UI-Q-v29-23 — OWNED STORE SUPPORT STATUS LINE / PURCHASE NOTICE

(User 2026-09-24, v2.9.0)

SETUP:
A Run owning 회전 진열대, 길드 보증 진열대, 단체 주문 창구, 발주 교환권, 묶음발주 계약, 단골 묶음혜택 and 야전 정비대; the owned list opened from the menu at MORNING, ORDER and SALE, before and after the condition changes (a guarantee used, the free reroll used, three of one SKU in the cart, a 단골 customer's second purchase).

PASS:
- each conditional support shows exactly the COPY_AUDIT §11-32 line for the current runtime state; 야전 정비대 (always on) shows no line
- the line changes when the state changes and never says 추천 / 필요 / any verdict
- 묶음발주 계약 shows its line only at ORDER, 단골 묶음혜택 only at SALE for the current customer
- the purchase notice reads `{점포지원명} 확보.` and nothing about 다음 날부터

FAIL:
- a status line on an always-on support, a chance-based support written as inactive, or a new Save field behind any line

#### UI-Q-v29-24 — SALE FORECAST PIN

(User 2026-09-25, v2.9.0)

SETUP:
SALE with a customer at 360 / 390 / 412 and at 1280; pick a shelf row with the column at the top, then scroll the column until the readout leaves the view and pick a lower row; tap the pin twice; scroll back to the top.

PASS:
- with the readout in view no pin is shown; with it out of view the pin reads the readout's two words in the readout's colours, at the top of the scrolled column
- one tap shows only the `전망` chip; a second tap restores the line; scrolling back to the top hides the pin again, and after a fold, scrolling away again shows the full line, not the chip
- at 1280 no pin is shown in any scroll state; no layout row moves when the pin appears; no runtime error
- a customer with a `연속 부상 출발 {n}회` line on the readout carries the same line under the pin's two readings; one without it carries none; the folded chip reads `전망` only (User 2026-09-28, v2.9.9 quick patch)

FAIL:
- a pin while the readout is visible, a pin on a desk, values that differ from the readout, a pin that pushes the layout, or a Save / account field for the fold

#### UI-Q-v29-25 — SALE DESK LAYOUT

(User 2026-09-25, v2.9.0; the desk's own SALE, User 2026-09-30.)

SETUP:
SALE with a customer at 1024×768, 1280 and 1920×1080 with a shelf taller than its area; scroll the shelf to its end with the
wheel over it, pick a row, sell; then narrow the window to 1023 and widen it back.

PASS:
- the customer stands large behind the counter, the state / outlook / destination beside them, the waiting line at the end
- under the counter: the ledger, the tray in the middle on the counter, the shelf; the tray never covers a shelf row
- the shelf scrolls alone and the ledger does not move; after the pick (a redraw) the shelf keeps its scroll position; the
  next customer starts at the top
- at 1023 the phone SALE is drawn, at 1024 the desk SALE again, with no error
- at 360 / 390 / 412 the single scrolled column and the full-width tray are unchanged

FAIL:
- the tray over the shelf, the ledger scrolling with the shelf, a shelf that jumps to the top after a pick, the phone's
  forecast pin or second readout on a desk, or a layout that stays the other one after crossing 1024

#### UI-Q-v29-26 — DEATH LIMIT ALWAYS VISIBLE

(User 2026-09-25, v2.9.1 balance; owner `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE, copy COPY_AUDIT §4-23.)

SETUP:
MORNING and ORDER at 360 / 390 / 412 and 1280 with 0 Deaths, with 4 Deaths on D10 (one left), on D11 after the segment
step, and with 추모 방명록 worn.

PASS:
- both screens show `사망 {n} / {limit} · D{end}까지` in the top status line without scrolling, on every Day
- the limit and end Day follow the current segment (5 · D10 / 8 · D20 / 11 · D30) and include 추모 방명록 / 위령제
- warning color exactly when count = limit − 1; no popover, badge or extra text
- the line never wraps mid-token and does not push the ORDER confirm off the phone screen

FAIL:
- the count only in the 도감, a stale segment limit, or a limit that ignores 추모 방명록 / 위령제

#### GREAT SUCCESS TUTORIAL
PASS:
- no SALE coach mark on the signal (User 2026-09-30, v2.9.11)
- the first store-bonus 대성공 names it on its NIGHT record, once per account (NIGHT_CLOSING §DISCOVERY LINE):
  extra preparation can raise its chance, and it leaves the Store an additional Gold bonus

#### FIRST DEEP TUTORIAL
PASS:
- not shown before actual first Deep occurrence
- shown on account's first actual occurrence
- not repeated next Run
- survives current Run abandon
- full reset clears it
- after full reset, appears again on next first occurrence
- teaches optionality, harder Combat, nomination, sponsorship,
  NPC EXP/Wallet reward, Store Gold return=0

### AUDIO

#### UI-Q114 — AUDIO AUDIBILITY / COVERAGE

Real-browser mobile audio check with Sound enabled.

PASS:
- at BGM 100% / SFX 100%, BGM remains clearly audible during ordinary play
- SFX remain distinguishable above BGM; global SFX attenuation is not used merely to fake louder music
- BGM/SFX sliders and master mute still work and persist
- day / night / boss music states remain distinguishable
- no runtime network request is required for audio playback
- any external asset has repository-local source/license evidence and a redistribution-compatible license
- current semantic SFX matrix is covered, including Decoration purchase/equip/unequip and other identified silent state-changing actions
- every UI-requested cue resolves to an actual cue; no typo silently falls back to generic click
- page hide / backgrounding stops or suspends audio without duplicate playback after resume

FAIL:
- 100% BGM is still perceived as nearly absent on the real phone test
- important state-changing actions remain silent without deliberate rationale
- every click is given an intrusive unique sound
- external audio is hotlinked or has unclear/NC licensing

#### UI-Q-v28-22 — DECISION / PHASE AUDIO

Verify the current audio presentation contract while reusing the owned audio architecture.
Acceptance does not depend on a particular asset implementation.

Listen on a real phone/browser to at least:
- repeated ORDER quantity changes
- ORDER confirmation
- SALE price selection / success / refusal
- Store Support acquisition
- MORNING opening
- NIGHT success / Great Success / retreat / injury / severe injury / Death / rescue
- CLOSING
- Boss D5 / D10 / D15 / D20 / D25
- FINAL commit

PASS:
- meaningful decisions are semantically distinguishable by sound
- Utility cues stay below Decision cues
- repeated quantity input remains short and non-fatiguing without harsh stacking
- ORDER confirmation reads as an order commit, not a generic click
- SALE success / refusal are clearly different without making one price mode sound correct
- Store Support acquisition is distinct from ordinary purchase and Relic acquisition
- NIGHT outcomes share a family but materially different results do not collapse to one pitch-shift
  cue
- Death is restrained rather than celebratory / cinematic; rescue reads as recovery, not normal
  success
- Boss-information cues follow one motif/family; D10 / D20 remain smaller than D5 / D15 / D25
- D30 adds no new-information audio signal
- Final commit is heavy and clear without a cinematic framework
- DAY / NIGHT / BOSS-FINAL ambience identities are distinguishable enough to support phase mood
- BGM / ambience stays below decision/result cues
- mute disables presentation audio
- BGM and SFX settings keep control of their owned channels
- background / foreground transitions do not leak, duplicate or restart one-shot cues incorrectly
- audio playback changes no gameplay state and consumes no Gameplay RNG
- mobile and desktop run without audio-related console/runtime errors

External/new asset PASS:
- every shipped third-party audio asset has a recorded source, author, license and modification
  status
- third-party audio is vendored locally; runtime hotlinking is absent and offline runtime still works
- no shipped asset has unclear rights or a license incompatible with the intended distribution

FAIL:
- most actions still read as the same generic synth beep
- utility navigation is as loud or important as material decisions
- repeated input creates harsh overlapping sound
- BGM masks copy / decisions / result cues
- one full new music track is treated as mandatory for every phase
- a parallel audio framework is introduced without need
- audio presentation changes gameplay truth or uses Gameplay RNG

#### UI-Q-v29-47 — PHASE BGM (v3.0, User 2026-09-29)

Verify UI_UX §AUDIO FEEDBACK — PHASE BGM on a real phone and on desktop.

Listen to at least:
- the store about to open → 첫 점포지원 → MORNING → ORDER → SALE → NIGHT → CLOSING
- FINAL through at least one loop join
- a cleared ending and a failed ending

PASS:
- each screen plays the track the mapping names; a cleared Run ends on SUCC and any failed Run ends on FAIL
- a loop join is not heard as a cut, click or gap (BOSS: its 1 s crossfade)
- the tracks sound equally loud, and at BGM 100% / SFX 100% the music is clearly audible while decision cues still read above
  it (UI-Q114)
- a phase change does not overlap two tracks: the old one fades out, then the next one rises without a hard start
- the Final and its clash play BOSS to the end; the ending track and the ending cue (`endwin` / `endfail`) come in only as
  the result lands - also after a bankruptcy (CLOSE until then) and the Death limit (NIGHT until then)
- decision and result cues (a sale, a refusal, a NIGHT outcome, the Boss seal) read clearly above the music; NIGHT does not
  feel louder than the other phases
- cues of one tier sound as one loudness (§SFX LEVELS) - none jumps out, none disappears; runtime evidence
  `tools/qa-sfx-mix.cjs`
- on a phone speaker (User 2026-09-29, Galaxy): the low cues (사망, the Boss beats, the clash scene, the FAIL ending) are
  heard at their tier, and no cue buzzes, tears or crackles - alone or landing together
- cues that mean different things are told apart by ear (§DISTINCT CUES): a Decoration fitted is not a FINAL hit, a SLOTH
  seal breaking is not a Boss reveal, the CLOSING receipt is not an ORDER crate, a menu click is not a quantity tick
- mute, the BGM slider, a hidden page and coming back behave as UI-Q-v28-22 requires
- no audio-related console or runtime error
- runtime evidence: `tools/qa-bgm.cjs` (in `npm run qa:runtime`)

FAIL:
- a loop that plays an excerpt from the middle of a track instead of the track
- an audible click, gap or double-play at a join or a phase change
- a phase that goes silent because a file failed to load
- music that masks a decision or result cue
- a cue that tears or buzzes on a phone speaker, or clips when cues land together

#### UI-Q-v29-48 — MORNING DAY SIGN FLIP (User 2026-09-29, v2.9.11)

Verify UI_UX §MORNING — DAY SIGN FLIP at 390 and 1280.

PASS:
- pressing `다음 날` and arriving at the next MORNING rolls the sign once, from yesterday's number to today's
- the two numbers never overlap mid-roll, and nothing moves outside the sign
- the sign lands on the plain number
- a redraw of the same MORNING and a reload show the still sign
- reduced motion shows the still sign
- no console or runtime error
- runtime evidence: `tools/qa-day-flip.cjs` (in `npm run qa:runtime`)

FAIL:
- the roll plays on every redraw or on a reload
- the numbers overlap, or the sign's size jumps
- the roll runs longer than 320 ms or plays a sound of its own

#### UI-Q-v29-49 — IPHONE SAFARI (User 2026-09-29)

Verify UI_UX §TOUCH / INTERACTION (iPhone Safari) and §AUDIO FEEDBACK — PHASE BGM on a real iPhone (iOS 16 or later).

PASS:
- tapping quantity + quickly several times changes the quantity and never zooms the page; pinch zoom still works
- a long press on a customer portrait or the FINAL Boss opens no save-image menu
- `소리 켜기` starts the sound on the first tap
- after a phone call or another app, the music comes back on return or at the latest on the next tap
- with the silent switch on, the game is silent and music from another app keeps playing
- on an iPhone SE and a Galaxy with its bars (UI_UX §SHORT PHONE): 새 점포 준비 shows the title clear of the 간판 and its
  tag - `들일 수 있음` included - and the status line on the board; MORNING shows the Event whole (its effect line included) and the top of the first Gate without scrolling
- no console or runtime error
- runtime evidence (Chromium): `tools/qa-bgm.cjs` resumes a suspended context on return; `tests/ui-guard.cjs` UI-Q-v29-49;
  `tools/qa-visual.cjs` runs every screen at 375x548 and 360x597

FAIL:
- the page zooms on a quick double tap
- the save-image menu opens on art
- the sound stays off after coming back and tapping
- the game stops another app's music
- on an iPhone SE, a tag or a line over the title or off the board, or the Event's effect line cut on MORNING

## RELATED

game philosophy -> SPEC_INDEX §GAME CORE
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
