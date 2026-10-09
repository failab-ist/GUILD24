# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings,typography,visual_material,final_preparation_ui,functional_design,visual,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
DOC_VERSION=2.11.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.11.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

Implementation detail (exact px / ms / selectors) lives in Source (dist/ui/); this owner fixes the player-facing behaviour and the values tests assert.

## ROLE

UI/UX = Player가 매 Phase의 핵심 질문에 빠르게 집중하고 판단하게 만드는 Presentation Layer. 정보량이 목적이 아니다.
우선순위: 1. 현재 해야 할 판단 2. 판단에 필요한 정보 3. 결과/피드백 4. Secondary reference

## KEY

```text
visualGoal=gameUI, not dashboard · brandAccent=GUILD24 green · fullScreenGreenDashboard=NO
phaseIdentity: MORNING=situation ORDER=management SALE=store+customer NIGHT=result CLOSING=economics
mobile: verticalStack=YES tinyFontFix=NO repeatTouchTarget≈44px
tutorial=coachMark/spotlight · inFlowTutorialBox=NO
forecast: combat=[우세,접전,불리] hazard=[취약,불안,대응,충분]
masterSafetyScore=NO · expeditionExactProbability=NO · nextDayTierProbability=EXACT
eventReveal=MORNING_FOCUSED_OPENING · orderReroll=FULL_OFFER
```

## CORE UI PRINCIPLE

```text
산수는 대신할 수 있다.
판단은 대신하지 않는다.
```

UI may calculate deterministic public arithmetic, never turn uncertain preparation into a system-authored answer. No
recommended Item badge, `오늘 강함` / fit score, automatic best-fit ordering, future-customer importance hint,
uncommitted-Item derived Forecast answer, or failure diagnosis without proven runtime causality.

## RETIRED ACTIVE UI

Never expose Franchise Grade, Franchise Achievement list/progress/toast, Grade ORDER discount, Start Contract selection or
its Grade-gated unlock progress. Archive policy -> META_v2.8.0.md.

## VISUAL DIRECTION

GUILD24의 브랜드 Green은 유지 가능하지만 전체 화면을 Green Card Dashboard처럼 만들지 않는다.
Avoid: SaaS dashboard composition · rounded card inside rounded card · 모든 영역의 동일한 초록색 톤 · 과도한 thin border ·
반복 badge/chip/header · 긴 stacked report page · 설명문이 Gameplay보다 더 눈에 띄는 구조.
Target: 게임 HUD/게임 오브젝트 중심 · 명확한 Primary Action · Phase별 다른 정보 위계 · 여백과 큰 덩어리 중심의 Composition ·
Store/NPC/Item이 Container보다 우선. Reference는 hierarchy / HUD / object focus / space usage만 참고한다(asset/color 복사 금지).
상업 수준 아트보다 구조/위계가 AI dashboard처럼 보이지 않는 것이 우선.

## VISUAL MATERIAL — ANTI-GENERIC UI PASS

Keep the world materials, drop SaaS/AI-template grammar: Morning store/board/room · Order paper/form · Sale
character-centered asymmetry · Night slate/dark · Closing receipt/till-roll · wood / paper / metal / brass. No new UI
framework.

## STRONG GREEN SEMANTIC

Strong Sign Green is store-sign / environment material and a beneficial semantic colour, never a primary-action treatment
(no dock Action uses it, `영업 시작` included; nor Relic purchase, SALE progress, NIGHT next, CLOSING next day, save/export).

Material direction (dock Actions → §PRIMARY ACTION GRAMMAR):

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

No third font family, icon font, or theme-font system.

### Mulmaru
DAY / world signage, short phase/display headings, atmospheric labels, and the fixed-width numeric role where Mulmaru Mono
is needed. Not for long body copy; size/spacing/material over fake bold.

### Wanted Sans
Body, prices, Stats / Item effects, Wallet / Gold / counts, utility text, buttons, long Korean information. Vendor only
required weights.

## PRESENTATION POLISH ROUTING

Construction / asset / ornament / audio / visual review -> PRESENTATION_PRINCIPLES_v2.8.0.md. This file owns UI / UX /
mobile / tutorial / semantic delta / popover / Store Management / NIGHT layout.

## PHASE IDENTITY

각 Phase는 다른 질문을 가진다.

## MORNING

question=`오늘 어떤 날인가?` — 상황 읽기: 방문 예상 · 열린 Gate · Known Hazard · Event. No Order controls in bulk, no Sale
controls, no Closing figures; the store scene never gets in the way of the situation.

Event day: the Event Focused Reveal comes before Gate Detail, then the Event-applied Morning Situation; no EVENT Phase.
Timing/effect -> EVENT_v2.8.0.md.

게이트 임시 폐쇄가 있는 날: 닫힌 게이트는 열린 게이트 판 뒤에 흐린 판으로 남는다 — 이름에 취소선, `오늘 폐쇄` 도장 하나,
위험 줄 없음. `위험 보기` 창과 ORDER `오늘` 줄에도 같은 표시(EVENT §52, COPY_AUDIT §13-52 · §4-21).

### DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER)

The Run's Death count and current segment limit (`CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED) are always in the top status
line at MORNING and ORDER, not only in the 도감: one compact item — count / current limit / the Day the segment ends (copy ->
`COPY_AUDIT_APPROVED_v2.8.0.md` §4-23); warning color at count = limit − 1; the limit shown includes 추모 방명록 and 위령제;
no popover, badge or explanation; the same line on both screens.

ORDER — FLOATING TODAY LINE: the Death line floats at the top of the scrolled 발주서. When the `오늘` block (visitors, per-Gate
count) has scrolled under it, that line joins the box under a thin rule with its own small `오늘` label; the ledger's `발주 후`
joins last the same way (same value, moving with every quantity tap, short color below zero). Each copy shows only while its
source is under the rail; no new copy (no `위험 보기` button). One type ladder: small labels `사망` / `오늘` / `발주 후` in one
column, values in one face and size. A key at the box's top-right folds the whole box, Death line included, to a `요약` chip
and back (account-level, kept across Days and reloads); on a phone key and chip keep clear of the menu pin.

### ORDER — WAREHOUSE PANEL (User 2026-09-29, v2.9.11 quick patch)

Contract-origin added rows show a quiet bordered source chip above the purchase-price tag: 새벽 회수 / 포션 계약,
13px / 500 Wanted Sans with readable parchment contrast. Ordinary added rows need no source label.

The warehouse sits apart from the 발주서, like a game's storage, readable against the offer rows: a steel rack of 칸 (orange
beam), each held unit its own cell (icon and days left, ≤ 1 day in the warning color), grouped by Item, in the SALE shelf's order
(§SALE — SHELF ORDER: today's Hazard answers first, User 2026-10-04). The desk rack shows every
store slot, the empty ones as empty cells; the phone sheet draws only held units, so it takes as many rows as the stock needs
(one while it fits) and the room left reads in the header's `N / M칸`; while it is open the 발주서 scrolls up above it by the
sheet's own height, no more (User 2026-10-02: a fixed 45% left an empty stretch under a one-row sheet). Cell icon = offer-row icon; the Item name is the cell's reader label (nothing
hover-only). Header: small `창고` label, `N / M칸`, `K종` (the Death box's ladder); no new copy.
- Cell tip (User 2026-10-02): a held cell is a tip - a tap opens it and a second tap closes it (another cell or a tap elsewhere
  switches or closes it); on desk a hover opens it, and keyboard focus too. It shows the offer row's own lines - name,
  `kind · rarity`, the effects (up to 3) - in one balloon right above its cell (below when there is no room), its point on
  that cell, which is outlined; it may cover the rack and the form, stays inside the screen, and closes on scroll, resize or a redraw.
- Desk (1024 px and wider): 발주서 left, an always-open rack right, following the scroll, below the menu pin.
- Phone (User 2026-10-02): the dock is one slim row - a compact `창고` key (`창고` over `N / M칸`, the arrow in its corner; `K종`
  and `본사 기본 상품` are the desk head's alone, and the open sheet adds no head) left of the Action(s), never covering an offer
  row - and the key opens the rack as a sheet rising from the
  dock, at most 45% of the screen, own scroll. It neither dims nor locks the form (rows above take taps; rows under it can be
  scrolled above it); only the handle (`열기` / `닫기`) or Escape closes it (a quantity tap keeps it open). Open/folded → §ORDER — WAREHOUSE DISCLOSURE.
- ORDER CONFIRM's crates drop into the new cells of the visible rack (an open phone sheet that gains a row grows to its new
  height first, never jumping in one frame); with the sheet folded the handle's figures move on the
  last landing.

### MORNING — DAY SIGN FLIP (User 2026-09-29, v2.9.11)

Entering a new Day's MORNING within the session, the ceiling DAY number rolls once (yesterday's rises out as today's rises
in, one curve, never overlapping): 300 ms inside the number's box, no sound, within PRESENTATION §GAME FEEL BEAT (≤ 320 ms,
never blocks input). Reload / redraw of the same MORNING and reduced motion show the still sign; it ends as plain text and
writes nothing. No full-screen DAY transition.

### MORNING — NEXT-DAY GATE FORECAST — RETIRED

No next-day Gate-count or Tier forecast anywhere. Today's open Gates, their numbered Hazard rows and the per-open-Gate
visitor count (public at MORNING and ORDER) are the whole preparation context; `DUNGEON_HAZARD_v2.8.0.md` generation stays
internal. Hidden: next-day Family / Gate composition / Hazard set; any future customer's identity / destination;
recommended Item/category/quantity prose.

### DEEP EXPEDITION MORNING

On a Deep Expedition Day there is no Normal Event reveal; Deep Expedition is the special Morning beat inside the usual
Morning -> Order flow (no new Phase). Before Order the Player can see: `심층원정` available today · base Gate / Family / Tier /
known Hazard · a sponsorship cost · extra NPC Growth / Wallet on success · participation optional.

## ORDER

question=`무엇을 준비할까?` — 관리 화면; no store scene.

Hierarchy: 1. `DAY X · 본사 발주` 2. funds summary, e.g. `보유 1,200G | 선택 280G | 발주 후 920G` (+ Death line, §DEATH LIMIT
— ALWAYS VISIBLE) 3. compact today Gate / known Hazard 4. offers + quantity (base=6; authoritative modifiers may add) 5.
Full-offer reroll + cost/state 6. sticky `발주 XXXG · 발주 확정`.

오늘 brief line: `{N}명 · {Gate}`, or with two+ open Gates `{N}명 · {Gate A} {a} · {Gate B} {b}` — counted by each customer's
claimed destination (a liar's or pilgrimage-rerouted true Gate stays hidden), summing to the visitor count; no name, Job,
Trait or Wallet. Exact line -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

`위험 보기` shares the row with `점포지원`, directly above the visitor-count column rather than the `오늘` label. Both references use a close dotted underline; the reference row and today's brief keep a compact vertical gap.

The form sits on the torn-parchment sheet shared with Store Support (`presentation/support/order-paper.png`, nine-slice, the
clip above it overlapping the top edge); there are no CSS tear strips or flat paper under it (User 2026-10-03).

Compact offer cards; quantity targets≈44px. Readable before commit: current Gold · selected spend · Gold after · **today
expected operating cost** · warehouse used / remaining · shelf life / expiry · today Gate / Hazard · Reroll cost/state. No
Phase round trip to re-check Gates, no next-day emphasis, no scroll ping-pong to buy.

Flow: select quantity → `발주 확정` (Inventory updates, cart clears, ORDER stays) → optional Reroll / re-order → separate
`영업 시작` → SALE. `발주 확정` and `영업 시작` never collapse into one button that commits and advances.

### ORDER Reroll UX

Available with an unconfirmed cart: clears only that cart, replaces the whole offer set, charges the current cost once, keeps
confirmed Inventory; no reset-to-zero first. The `발주 후보 교환` key at the foot of the sheet is as wide as its words, right-aligned on a
short margin, so it never takes a tap meant for 영업 시작 below it (User 2026-10-03).

### ORDER Runtime continuity

Mobile and desktop keep the viewed product area and focus after + / -, back to 0, confirm, Reroll, re-confirm; D30 Final
ORDER too.

### ORDER — ITEM INFORMATION HIERARCHY

No role chips. Card order:
1. identity — under the name one small `{category} · {rarity}` line: `음식 / 음료 / 포션 / 야외장비 / 보험 / 특수` and
   `일반 / 고급 / 희귀 / 영웅 / 전설` in its rarity colour (paper-legible shade of the shelf tile's hue)
2. exact effects in ITEM §PRESENTATION ORDER — EXACT order (Hazard Counter → 피로 회복 → Core Stat → the rest); a penalty keeps
   its place and cost colour
3. economy / stock — tag `매입 {N}G` (today's buy price) over a smaller muted `판매 {N}G`; metadata
   `수익 +{N}G · 재고 · 공급 · 유통기한`; the 본사 1+1 행사 offer (EVENT §02) wears a small red `1+1` sticker on the `매입` tag corner (not in the metadata)
4. quantity — a `+ / 1 / 3 / 최대` blocked by Gold or space stays dim but answers a tap with the reason toast; a full supply in
   the cart answers `오늘 공급 최대 수량입니다.` (COPY_AUDIT §3-9); a supply already fully ordered reads sold out — paper a shade
   worked, a quiet `품절` stamp in place of the controls, everything else readable, nothing greyed

`속박 대응 +16` already says its function (no `속박 전문` chip). No today-fit / recommended badge, verdict word, reorder,
recommended row or effect emphasis against today's Gates; effects keep the default style in `ITEM_v2.8.0.md` §PRESENTATION
ORDER.

### ORDER — WAREHOUSE DISCLOSURE

The always-visible summary keeps capacity readable:

```text
창고 4 / 18 · 4종
```

It lives in §ORDER — WAREHOUSE PANEL. The held-stock list (phone sheet) starts collapsed; opening it is an account-level
choice kept across Days and reloads. Collapsed, the summary and used/remaining capacity stay visible.

ORDER CONFIRM (contract -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H3; acceptance -> UI_UX §QA UI-Q-v29-32): one crate per
ordered SKU (its row icon) falls in the NIGHT stamp's 90 ms fall, cascading at ≤ 70 ms steps that shrink so the last landing
is within 320 ms; the SKU's new cells drop in on its one landing (a new SKU brings its row), counts jump straight to the
resolved value. `N / M칸`, `N종` and the register's 창고 잔여 칸 move together on the last landing. At most three landings sound
(the `order` stamp, then short `crate`s). The till's 보유 골드 counts down in 220 ms. `발주 완료.` line unchanged; 일반, no hold.
Reduced motion: `order` plays once, values resolve at once.

## SALE

question=`이 손님에게 무엇을, 얼마에 팔까?` — store scene high priority; one customer at a time; focus = NPC + selected
Item + price.

NPC detail mobile order: 1. portrait/name/job 2. destination 3. 2×2 stats 4. traits 5. condition/status 6. bag/equipment 7.
locked/secondary. It also carries `실패 시 사망 위험 {N}%` (frozen SALE-entry value) and the row `연속 부상 출발 {n}회` (the
unbroken run of most recent expeditions begun injured, 0 after a healthy departure; no verdict). Portrait/sprite/name/card
tap all open it.

Returning NPC: a compact `since last visit` layer before or beside the unchanged detail, when relevant — level/stat growth,
injury/recovery/condition change, notable last outcome, meaningful Item/callback history; the full profile stays reachable
and current Stats/Traits are never hidden behind history.

All sellable inventory visible with compact compare; the chosen Item goes on the counter tray and shelf rows never change
height (§SALE — COUNTER TRAY). Price 50 / 100 / 150, explicit and easy to switch. Keep inspect → Item → price →
purchase/refusal → remaining slot continuous: no needless modal/page trips or routine confirmations, no batching away of
sequential decisions. Transaction beats -> PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT.

### SALE — DESKTOP AUTHORITY

Character / Portrait left; upper-right Core Decision area holds Forecast + Expected Destination and the NPC Wallet; no
duplicated lower destination / forecast. The two enlarged Bag slots sit in the customer-state strip beside the status line
and receive the hand-over (size only; capacity unchanged). Composition → §SALE — DESK LAYOUT.

### SALE — MOBILE AUTHORITY

Character width and height on phones remain about 85–90% of the pre-trim `3ce89d7` presentation (User 2026-10-03):
character appeal takes priority over shrinking the portrait to reach a row count. No artwork crop. The enlarged Bag in the customer-state strip at every width, never
overflowing; compact Expected Destination; Forecast in the decision flow (the `지난 원정` quick surface is desk-only — the
phone's NPC detail holds it); core environment signal visible without tap, never duplicated; ~44px repeat targets. The outlook
(`전투 전망` / `환경 대응`) and the four Core Stats are ONE recessed plate with one seam, not two boxes; the shelf keeps the room
(acceptance -> UI_UX §QA UI-Q-v29-43).

The phone nameplate scales with the card: name 14px, rarity 9px with a restrained letter gap, Level/Job 11px with readable
line spacing. Keep every word intact and visually separated; no compressed glyphs, clipping or ellipsis (User 2026-10-03).
Give the nameplate at least 4px of text clearance beyond its rarity accent, 4px top/bottom padding and a 2px line gap.
SALE card/nameplate cast shadows never enter the neighbouring destination or lower decision plane. The phone destination
keeps 5px top/bottom and 8px side padding; outlook labels, values and help keys stay inside their own face (User spacing review).

SALE reuses the unmodified MORNING store room assets: portrait on phones, wide on desks. Information stays on dark,
high-contrast planes so the room light never competes with destination, customer state or product text.

Same-Customer rerenders keep scroll/focus; a new customer may start at the top. `손님 보내기`: the current customer exits left,
then the next enters (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A4).
When a phone tray opens, the list scrolls only when the tray would clip the tapped shelf row, and then only as far as keeps that
row whole; a row that stays whole leaves the list where the Player put it (stats or shelf). The correction is not user shelf
scrolling and does not fold the tray. Swapping an already-open selection preserves the anchor.
If that correction crosses the outlook's heading, clear the whole outlook instead of leaving a cut heading; its existing
forecast pin keeps the combat/environment reading available. The full detail remains reachable by scrolling back up.

### CURRENT CUSTOMER STATE

Compact state: active Injury only (omit `건강`, no `부상 1`-style number), Fatigue, Loyalty — `부상 · 피로 8 · 단골도 37`; 단골 (owner threshold) is the gold
`regular-badge` on the right of the customer card's nameplate, not a word in this line, and the card has no rarity colour bar (the
rarity word and the card frame already say it); no large Loyalty bar, no `?` / Loyalty popover (coach teaches it; global Help stays separate). No equipment text here (NPC
detail and proven Stat-source attribution carry it).

### SALE — SHELF LIP (v2.9.9)

(acceptance -> UI_UX §QA UI-Q-v29-45.) Each shelf row ends on the thin lit edge of a display-case board, so goods stand on a
shelf; the row's dark face, type, height and row count are unchanged (the open row keeps its board under its recess); the row
is not turned to wood (price and stock legibility first).

### SALE — SHELF HEAD (v2.9.9)

(acceptance -> UI_UX §QA UI-Q-v29-45.) The SALE `진열대` head (no `{N}종 · {M}개` count, User 2026-10-03) is one step lower and its `점포지원 {n} / {m}` plate
compact; the plate keeps its frame (a control) and an about-44 px target through an invisible margin.
Title, quantity and support plate align on their vertical centres, rather than mixing the plate and LED font baselines.
The phone title and quantity use a common 20px line box; the support plate retains its 24px visible height.
The head is the wooden plank asset (`presentation/sale/shelf-plank.png`) across the full shelf frame width (User 2026-10-03).
The SALE backdrop is `presentation/sale/sale-bg.webp` without its ceiling, the side shelves at the edges, dimmed; on a desk the status / outlook /
destination column is one width and ends on the card's bottom, with larger type, and the waiting deck is larger. Stats, item effects and
stock / expiry are one step quieter than names and prices.
The three price keys are the supplied key assets (`presentation/sale/till-*.png`: 할인 blue, 정가 gold, 바가지 orange, disabled grey) with a small corner ribbon
drawn in CSS naming the role; the percentage is read by screen readers only. The amount is white and the `이익` line one step quieter, both centred in the key;
pressed, the key moves down 3 px and darkens. On a desk the card's art box is shorter and the nameplate (job / level line, 단골 badge) larger, and the
waiting count sits on its own dark plate.
Desk figures (User 2026-10-03): card art 74% of its former height, nameplate 100px (Job 16px, Level 18px), 단골 badge 56px, Bag slots 68px;
the status column and the card share top and bottom edges; stat values use the shelf price's type (600 16px); price-key ribbon 8px on phones,
100×15px with 10px text on a desk. The 이익 line stays one step quieter; whether it may drop under 4.5:1 contrast is not decided.

### SALE — PRICE / SECONDARY INFORMATION LEGIBILITY (User 2026-10-03)

User clarification: retain the existing Mulmaru Mono numeric display for shelf prices and the three sale amounts.
Separate only the live `G` suffix in smaller Wanted Sans: shelf number/unit 16/10px, phone key 18/11px,
desktop key 22/13px. Keep a small gap and aligned suffix so currency differs from the digits without replacing their font.
On phones, stock/expiry and the tray's effect-category labels retain readable warm-ink contrast on their dark planes.
This finishing pass preserves the fixed character, shelf-row space, ribbon geometry, full effects and purchase rules.

### SALE STAT SOURCE UX

- Stat 하단에 실제 적용된 **Source 이름만** 작게 표시 (유리: 초록, 불리: 빨강). 미적용 표시 안함.
- NPC Detail 창: 실제 부상 효과, 현재 피로/적용 penalty, 남은 휴식일, 회복 방법 표시.

### SALE — FOUR CORE STATS REMAIN PRIMARY INFORMATION

투력 / 강인함 / 기동 / 정신 never move behind an accordion; visible growth is progression feedback. Keep the small actual-source
treatment; calculation breakdown is touch/click detail.

### SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT

The outlook is a **pre-supply snapshot**:

```text
customer SALE decision begins
-> before any new Item is committed for this visit
-> capture Combat Forecast / Hazard Readiness / 실패 시 사망 위험
```

Show qualitative Combat Forecast and Hazard Readiness (known Hazard state), existing Injury/Condition in the snapshot, and the
exact 실패 시 사망 위험 % — not as a readout cell (the readout `.top` shows 전투 전망 and 환경 대응 only) but as the second
line of the 전투 전망 `?` help (`실패 시 사망 위험 {N}%`) and a line of the NPC detail. `연속 부상 출발 {n}회`: inside the 전투 전망 box,
the way the Great Success signal sits (v2.9.14 quick patch, User 2026-10-02) — a small muted-red chip beside the stamped word on a
phone (the line kept for a screen reader; a second chip wraps under the first rather than leaving the box), a small line under the
word on a desk — only when the customer departs injured and `{n}` ≥ 1 (the first injured departure adds nothing to the Death
chance); words only — no %, verdict or `?`.

Hazard Readiness is one label on a one-Hazard Gate. On a two-Hazard Gate (T2 on) it is each Hazard's own state
(`{위험} {충분|대응|불안|취약}`), and the cell stays two lines tall, never a third: where there is room (desk) `환경 대응 ?` on
the first line and the two states side by side on the second; where there is not (phone) the two states as two short rows
beside the `환경 대응` label, the Hazard names right-aligned so the coloured states share one column. The two cells split the
row in halves as the Core Stats under them do; only when the states do not fit half does the 전투 전망 cell give up width (in
the pin too). Below the width that holds both cells on one line the 환경 대응 cell drops to its own line rather than overflow.

Never show exact expedition Success %, the hidden readiness thresholds (0.75 / 0.40) and Defense formula, or exact Great
Success % (`대응 {N} 필요` and `{능력치} {n}당 대응 1 제공` are public Gate facts, §HAZARD NUDGE). The % follows
`DUNGEON_HAZARD_v2.8.0.md`: the chance an ordinary failed expedition escalates to Death, not unconditional Death odds.

After a purchase commits in the visit, the Combat Forecast and the death % stay the snapshot — never `접전 -> 우세`, `12% -> 5%`;
환경 대응 is the live meter instead (§SALE — ENVIRONMENT METER, User 2026-10-02). The
runtime preparation **does** change (Resolve uses the final Items / Fatigue / Condition); feedback shows exact actual changes
and sources (Item Stat / Counter / 피로 회복 N, proven Fatigue band change, an owned Trait / Relic / Boss effect), so the choice
is not graded before the remaining-slot decision.

#### Exact player-facing copy

Header:

```text
보급 전 원정 전망
```

The 전투 전망 `?` help is two lines, the second `실패 시 사망 위험 {N}%`; no `실패 시 사망 위험` readout cell. Copy ->
`COPY_WORLD_VOICE_v2.8.0.md` §PRE-SUPPLY EXPEDITION OUTLOOK — EXACT COPY; help -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-1.

### SALE — ENVIRONMENT METER (User 2026-10-02)

The readout's 환경 대응 cell is a number, not a word: per Hazard of the customer's (claimed) Gate, `{위험} {N}/{필요}` - N the
Counter the expedition is judged on (Dungeon.prepare: the customer's own Stat share and Traits, Store Supports, plus the
committed Bag's Counters; whole, never below 0), 필요 the Gate's public `대응 {N} 필요`. It moves when a sale commits; a selected,
unsold Item previews where it would land, `{위험} {N} → {M}/{필요}` - the resolver's number with that Item in the Bag, Stat-route
shares included, so nothing is left to add up (User 2026-10-02). The number is gold, green only once it reaches the need (a
preview coloured on its own). It sits in its own box (§SALE — OUTLOOK BOXES), apart from the stamped `전투 전망` word, which
stays the SALE-entry snapshot with its death % help and never previews. No readiness word, no breakdown of the number. The phone forecast pin carries the same meter. The tray's Hazard Counter row is
the Item's own share, `{위험} 대응 +N`. Help and coach copy -> COPY_AUDIT §4-2, §3-4. The four readiness words stay the
resolver's and the measurement bots' vocabulary (outlookFor) and are not drawn on SALE.

### SALE — OUTLOOK BOXES (User 2026-10-02)

The readout is two boxes of their own, not one panel: `전투 전망` (its stamped word; the ? with the death % line) and `환경
대응` (the meter, one row per Hazard), each an iron plate with two painted corner rivets, a head line (name, ?) over its value.
They split the row in equal halves while the meter fits half; past that the 환경 대응 box takes what it needs. The Core Stats
below are a box of their own (the stat grid), not part of the readout; every Stat cell is one row height, a tappable
(source) cell included - no extra vertical padding on any cell. The pair plus the Stats keep the old panel's height
(146px at 360 / 390 on a two-Hazard Gate): the head line takes 16px while its ? keeps the 24px target. The phone pin is not
two boxes: one strip, `전투 {word}` | `환경 {meter}` with a thin divider (User 2026-10-02: pin only, two plates read busy), the
meter's Hazards side by side on one line while they fit, wrapping whole only when they do not (one 44px target that folds to
`전망`). The
first SALE's outlook mark is two marks, one per box (COPY_AUDIT §3-4).

### SALE — GATE VS ITEM INFORMATION

```text
Gate: Hazard name / Stat pressure / 충분 / 대응 / 불안 / 취약
Item: Core Stat +N / Hazard Counter +N / 피로 회복 N / explicit penalty
```

Every Hazard row, the SALE destination plate included, states the Gate facts
`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; below 900px the `{능력치} {n}당 대응 1 제공` part of every row reads in the one `?` on the plate and the row keeps `{위험}` and `대응 {N} 필요` (User 2026-10-03); no per-customer remaining need. This customer's own
number is the readout's 환경 대응 meter (§SALE — ENVIRONMENT METER, User 2026-10-02), not the plate.

### SALE — DECISION-ONLY ITEM DETAIL

No expandable flavor-only sections: no `이 손님에게 안 걸리는 효과`, no flavor-only `상품 설명`. Directly readable: Core Stat
effect · Hazard Counter · 피로 회복 N · penalty · Insurance behavior when relevant · price / stock / affordability. Flavor may
stay in data or an existing non-decision context; no new detail screen.

### SALE — MATCHING-EFFECT EMPHASIS — RETIRED

No effect is emphasized against the customer's Gate (or, on ORDER, today's Gates): default style, no badge, verdict word or
reorder; fixed per-category order (`ITEM_v2.8.0.md` §PRESENTATION ORDER) for every customer.

### SALE — TRANSACTION RESULT STUB

Each successful sale stamps a paper receipt stub (`.receipt-stub`) over the counter band for about 2.5 seconds:
`단골도 {±N} · 소지금 {A} → {B}` (COPY_AUDIT §4-24). No reserved height, never blocks input, replaced by the next stub; under
`prefers-reduced-motion` no motion. A refusal shows the customer's reply line (engine reason pool); when Loyalty actually
decreases, the same stub location shows only `단골도 {−N}`, the existing receipt style, with only the negative number in muted red, for about 2.5 seconds, without new motion.

### SALE — CUSTOMER ARRIVAL (v2.9.10)

The customer's card walks a few steps in to the counter (~0.56 s). A newcomer's portrait is fetched on arrival: a plain head-and-
shoulders silhouette holds the card until it decodes, then the portrait rises in, at most 1.5 s later; the Day's other
customers are fetched when SALE opens. No loading screen or copy; reduced motion: the card is simply there.

### SALE — COUNTER TRAY

One counter tray, a fixed band directly above the dock outside the scrolled column at every width (desk → §SALE — DESK
LAYOUT). Tap-only; no drag, minigame or Save field. The FINAL preparation screen keeps its per-row panel
(FINAL_EXPEDITION_v2.8.0.md §3).
- tapping a shelf row puts its Item on the tray; the row is only highlighted; rows never change height
- §SALE — SHELF ORDER (User 2026-10-04): an Item that answers a Hazard of today's open Gates leads, in the Gates' Hazard order (any kind —
  a Food or Drink with a Hazard line counts); the rest follow by kind — 대응 장비 (gear), 음식, 음료, 포션, 보험, 특수 — then days to discard (nearest first), then higher
  Rarity, ties as before; the same for every customer; sorted on the discard day shown when the Day's shelf first appeared,
  so no sale moves a row within the Day (next Day sorts afresh)
- shelf life in each row's price column (on a phone on one line with the stock, `재고 N · 폐기까지 N일`; the phone tray header does not repeat stock or shelf life, User 2026-10-03): `폐기까지 N일`, then `내일까지` / `오늘까지` (tray and 재고 정리 list alike), in the
  warehouse `.soon` color on the last day; every Item expires (no `유통기한 없음` state anywhere)
- row and tray name the category in a small tag after the name (`음식 / 음료 / 포션 / 야외장비 / 보험 / 특수`); the icon
  tile's bottom edge is the rarity colour
  The entire icon stays inside its tile above the uninterrupted 3px rarity edge at every SALE size; the icon never covers
  the edge, name, category or effect line (User 2026-10-03).
  The hand-over travels from the actual tray SVG bounds to the actual Bag SVG bounds, fitting its moving footprint;
  resized outer tiles must not enlarge the icon beyond the Bag slot.
- tray, top to bottom: header (icon · name · kind; desk keeps `{손님}에게 · 소지 {N}G` at right), the
  `판매 후 변화` list (may be one wrapping line), `특수 효과` when any, the three price keys (§SALE — PRICE ROLE WORDS)
- on phones, the header is icon / name-and-kind / stock-and-shelf-life, with 8px gaps. Stock and shelf life occupy two
  11px lines at right; the name stays 14px and wraps intact. Customer/wallet remain on the fixed character area; do not repeat
  them on the tray. The full-price key supplies the base selling price, so do not repeat that price in the phone header.
  Each 13px change/special-effect block keeps the full tray width. When there are no direct changes and the remaining effects
  are exclusively numberless utilities, their full special-effect description replaces the generic no-change row. An unapplied
  numeric effect or an Item with no explanatory effect retains `현재 준비 변화 없음` (COPY §4-8).
  The band keeps 3px row gaps, 6px top and 10px bottom padding. Phone price keys are equal peers with a 48px minimum target:
  role and percentage form a narrow left ribbon inside the key; price and profit occupy two lines at right. A disabled reason
  wraps across the full key below them. Keep 4px inner vertical padding, an 8px peer gap and clearance for their 2px cast depth
  plus 3px press travel, never entering the lower lip/dock. Ribbon labels are 11px, percentage 10px, price 18px, profit/reason 11px.
  No role/percentage, actual price or disabled reason is omitted. Desktop keeps its existing
  header composition. All three price keys remain
  directly reachable. The phone `손님 보내기` target is 44px high; safe-area padding stays outside it (User 2026-10-03).
- empty: one prompt line on DAY 1~3 while the tutorial is not skipped (`COPY_AUDIT_APPROVED_v2.8.0.md` §4-23), otherwise no
  height
- the keys never move; a sale clears the tray (Item into the Bag) and shows the stub; a refusal keeps the Item with the
  refused key locked; the hand-over (§TRANSACTION BEAT A1) starts from the tray icon
- height budget at 360: empty ≤ 48px, filled ≤ 200px, ≥ two shelf rows visible with it filled at 640 / 597 / 548 high in the representative
  comparison check; rows are one name line + one effect block. Long effects wrap intact instead of becoming unreadably small.
- the effect block states every effect in ITEM order at the readable phone SALE step and wraps when needed; 구급키트 and 황금 1+1
  쿠폰 show their core on the shelf only (`중상 → 부상 · 부상 → 무사`, `다음 소모품 효과 2회`), tray `특수 효과` and codex in full
- COUNTER TRAY FOLD (phone): a filled tray folds to its header (Item, kind, ▲) when the shelf scrolls past 32px or
  on a tap outside tray, rows, dock or overlay; the strip or any row (the selected one included) reopens it; the selection
  never changes and nothing is saved; a desk (≥1024) never folds
  The phone Deep control completes its native click before the outside-tap fold: the summary/key must not move out from
  under the pointer between pointerdown and pointerup.
  Reopening the strip resets the scroll baseline and lets its layout settle, as a shelf-row opening does; the expansion
  itself must never refold the tray before a price tap. Subsequent user scrolling still folds it after 32px.
- COUNTER FEEL (contract -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H2; acceptance -> UI_UX §QA UI-Q-v29-31): the pressed key
  goes down 3px in 60 ms and back in 60 ms (일반, no hold). On a sale the pressed tray holds inert for that press (icon hidden:
  the Item travels as A1), then the counter redraws; the A8 stub stamps in from the key's landing frame. A refused key presses
  the same while A6 shakes it. The first coin tick is the impact; 바가지's ticks start 40 ms later on a lower first tick
  (×0.75), 1 / 2 / 3 ticks at 70 ms spacing. No band bump, faster second sale, sale-count overtone, combo or streak UI.
  Reduced motion: no press or held tray, stub at once, same end state

### SALE — FORECAST PIN

Phone only (never on a desk ≥1024): while the readout is scrolled out of view, one floating line at the top of the column
repeats, on one strip split by a thin divider, `전투 {우세|접전|불리}` (the frozen value) and `환경` with the 환경 대응 meter `{위험} {N}/{필요}` per
Hazard, live as the readout reads it (§SALE — OUTLOOK BOXES / ENVIRONMENT METER) — the same values, never a second
source — plus, when the readout carries them, the same chips (`연속 부상 출발 {n}회`, `대성공 기회`) at the bottom right of the strip,
stacked in a small column at the right of the meter when both show - never over the meter, and the strip keeps its height. Hidden while the readout is on screen. One
tap folds it to a `전망` chip and back, lasting until the readout is on screen again; no Save field. No reserved height (fold
to read a covered row); target at least 44px.

### SALE — DESK LAYOUT

A desk (≥1024) draws its own SALE from the phone's pieces (same texts, keys, actions):
- above the counter the customer card stands as tall as the column beside it (state and Bag, outlook and destination), not
  taller; a short desk shrinks it so the player's side keeps its room; the waiting line at the far end; the counter top is one band with a hard edge and one cast shadow (PRESENTATION
  §Edge / material)
- below, the player's side: the customer's ledger (last expedition, four stats, Traits), the tray in the middle on the counter
  (empty = bare counter), the shelf; ledger and shelf scroll separately, kept on a same-customer redraw, reset for a new
  customer; the tray never covers the shelf or folds
- no second readout or forecast pin; crossing 1024 during SALE redraws the other layout; phones keep the single column and
  full-width tray

### SALE SELECTED-ITEM INFORMATION

One heading `판매 후 변화`, rows under it, no stacked analytical subheads. It lists only the Item's own effect rows
(`피로 회복 2 → 9`, `강인함 17 → 23`, `손님 소지금 획득 0%p → 40%p`) — no `피로 완화` row and no `피로 {A} → 출발 {B}` line on
tray, till or FINAL preparation; on the tray rows may join with ` · ` on one wrapping line. The frozen four-cell outlook never
repaints for a selected Item. `특수 효과` and shelf life stay; conditional functions without a numeric delta stay under
\`특수 효과\` (never \`이 손님에게는 지금 걸리지 않는 효과\`). Source/cause goes in the anchored popover; internal marker rows
never show.

### SALE PERMANENT EXPLANATION

Forecast/readiness/death explanation is on demand via the shared anchored popover; no standing paragraph under the readout.

### SALE — UNCOMMITTED PREVIEW

Per `SALE_v2.8.0.md`, an uncommitted Item may show its exact effect and price / affordability (no `피로 {A} → 출발 {B}`
line); never hypothetical answers (`접전 -> 우세`, `불안 -> 충분`, Great Success signal change) - the 환경 대응 meter's numeric preview
(§SALE — ENVIRONMENT METER, User 2026-10-02) is the one exception.

### SALE — POST-COMMIT DELTA SOURCE TRUTH

A committed purchase never updates or re-scores the pre-supply snapshot. Delta text, if shown, lists only actual runtime
changes; a change not from the Item's listed effect names its source class; an Item changes only the channels in
`ITEM_v2.8.0.md`. Food/Drink 피로 회복 that drops a Fatigue band may restore the Stats that band pressed — never shown as the
Item's Stat and not in `판매 후 변화`. Example `집중 사탕`:

```text
직접 효과 = 공포 대응 +12 / 피로 회복 3
```

— no Core-Stat increase unless a band changes, and `판매 후 변화` lists only 공포 대응 / 피로 회복. A combined block is allowed
only if direct and derived effects read clearly apart; otherwise remove it.

### SALE — PRICE ROLE WORDS

`할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`, each with `이익 {N}G` (or the disabled reason) under it;
three modes, no extra depth. Copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`; roles -> `SALE_v2.8.0.md` §PRICE ROLE.

### SALE — REFUSAL PRICE CEILING UI

Per `SALE_v2.8.0.md`, same ordinary customer + SKU + visit: 50% refused → 100% and 150% disabled; 100% refused → 150%
disabled; 150% refused → 100% and 50% disabled too, labelled `바가지를 거절함`. Disabled keys look distinct and take no input; the
refused key shakes once and locks with `오늘 거절됨` / `더 싼 값을 거절함` / `바가지를 거절함` (§TRANSACTION BEAT A6); the reason is readable; other SKUs unaffected; no
carry-over to a later visit unless an owner defines it; absent from Final preparation; never invite a higher-price retry.

### GREAT SUCCESS OPPORTUNITY SIGNAL

When the authoritative condition holds, show `대성공을 노려볼 만합니다.` (`대성공` mandatory) before departure while the
preparation can still change; no Great Success %, Combat margin/formula or master safety score. It does not react to
selection/preview; after a committed purchase only it refreshes from the committed Bag. It sits inside the 전투 전망 box
(§SALE — OUTLOOK BOXES), never on a line of its own under the pair (User 2026-10-02): on a desk (≥1024) the sentence is a line
under the stamped word; on a phone the box keeps its height and shows the short tag `대성공 기회` beside the word - a quiet dark
gold plate, not a bright fill - with the exact sentence kept as the screen-reader text.

### RETURNING NPC QUICK SURFACE

Desk (≥1024) only, from the NPC_TRAIT/SALE snapshot:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

On phone the status strip and NPC detail 원정 기록 hold it. Expanded detail: actual destination, Item names, proven contribution
only.

### QUEUE

No future-customer Job/Level/Destination/need hints; the queue count suffices. The one approved on-demand aggregate exception is owned by §SALE — QUEUE GATE COUNT REFERENCE.

### SALE — QUEUE GATE COUNT REFERENCE (User approved 2026-10-09)

- Anchor: the **existing SALE bottom-Dock `손님` queue/progress surface**, on desktop and mobile. The phone still shows its current `손님` + pips treatment; `{n}/{N}` stays a screen-reader label as before. No visible numeral, `ⓘ`, arrow, underline, separate button or permanent explanation is added. No larger Dock, no reserved height, no shift of `손님 보내기` / `영업 종료`.
- The balloon is a slate panel, not the shelf's brown, so it never reads as one more Item card (User 2026-10-09).
- Desktop: hover over the existing queue area opens an anchored lightweight popover; focus can open it for keyboard access. Phone: tapping **the same visible queue area** opens/toggles it, without adding a visual cue. Use the existing shared popover treatment (§SHARED ANCHORED POPOVER); outside tap / Escape closes it. Opening this information never activates the adjacent phase action.
- Content: an `이번 손님부터` label, then each open Gate in ORDER's chip form (`{Hazard}{Tier} {n}명`, closed Gates as `오늘 폐쇄`) where n counts today's customers from the one at the counter to the last, by the Gate each claims (ORDER's count source, User 2026-10-09: no memorising). No total - the pips say it. Each sale / departure moves the counts; nothing reveals a customer's identity, actual destination, Job, traits or needs.
- Purpose: allow recalling already-known Order-stage demand while assigning today's stock; no recommended Item, correct SKU, best price, outcome prediction or strategic prompt.
- First-use education: one account-scoped contextual **coach spotlight on the existing `손님` queue surface**, using COPY_AUDIT §3-16. The permanent UI has no `tap for details` text. Preserve existing SALE first-day coach priorities; do not introduce an extra compulsory DAY 1 mark or decide a new DAY gate without the User's approval. Once completed/dismissed, persist with ordinary tutorial marks; Full Data Reset clears it.
- Acceptance -> UI_UX §QA UI-Q-SALE-QUEUE-GATE-COUNT. No extra gameplay RNG, Save outcome or new Gate inference.

### DEEP SALE UI

While nomination is legal, show `심층원정에 추천`; afterwards sponsorship payment, new destination and updated forecast are clear
and ordinary Sale continues.

### EVENT TEMPORARY BUDGET

Show persistent Wallet and an Event budget apart enough to explain affordability; never relabel the budget as 소지금.

## MOBILE SALE PLAYABILITY

Phone-first (desktop SALE regression-protected): at 360 / 390 / 412-class widths ordinary SALE puts the transaction surface
before customer presentation.

### Vertical hierarchy

Above the fixed dock, customer / expedition summary takes about half or less and Item / price / sale at least about half — a
responsive proportion, not a fixed split; no art crop or forced equal heights. On entry the shelf heading and at least one
Item row show without scrolling. The tray belongs to the sale surface (budget → §SALE — COUNTER TRAY). Shrink presentation,
never required decision information.

### Customer speech

A transient overlay on the upper customer area reserving no height: greeting auto-hides after 3 seconds, a buy / refuse reply
stays 5 seconds; a tap hides it; each new line gets a fresh duration; no persistence; an unchanged rerender never revives a
hidden bubble.

### Character / status / destination

On phone the character block sits high with a footprint small enough to give the sale surface real height, softly aligned with
status / destination via responsive flow (no forced equal heights); full portrait containment, no crop/stretch; small phones
may relax alignment rather than overflow. Bag slots stay in the customer-state strip.

### Bag

Exactly two slots. On phone, upper-right, each ≥ ~44px touch class, "가방 used / 2" readable without a tall strip; the two
boxes are always side by side — if room is short the whole Bag block wraps to the next row, never stacking or overflowing.

Reference shape:
    가방 0 / 2   □ □

Presentation only; capacity and mechanics unchanged.

### MOBILE SALE DENSITY

Mobile drops the decorative waiting-customer card/fan and keeps the queue count in the Dock only (never removed); the space goes
to current-customer decision information. Desktop may show more queue.
On phones the optional Deep nomination disclosure follows the shelf, before Traits: it stays present and usable before
the first purchase, without consuming the comparison area. A confirmed nomination still updates the destination and forecast;
its payment remains readable in that disclosure. Desktop keeps its existing placement (User-approved SALE composition, 2026-10-03).
The spacing review prioritizes readable planes over compression (User 2026-10-03). One- and two-Hazard representative visits
retain two complete rows at 640 / 597 / 548 after the bounded opening correction. Long content may use the existing shelf scroll,
but must never overflow its information planes or hide a price target. Preserve the character size above instead of shrinking it
to meet a richer-visit row budget.

### BAG PRESENTATION

No `최종 준비 결과` dashboard. The two slots, in the status strip at every width, are the handling surface and the A1 hand-over
target (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1): contents, focused slot, replace/remove state, sequential
transaction state. Mechanics -> `SALE_v2.8.0.md`.

## SUPPLY / FATIGUE PREVIEW

Public deterministic arithmetic from `DUNGEON_HAZARD_v2.8.0.md`, e.g. `피로 9 -> 출발 7` — not an Outcome prediction. Fatigue
stays numeric (0~40), no `양호/주의/위험` tiers; band names (정상 / 지침 / 과로 / 소진 / 탈진) and effects belong to DUNGEON_HAZARD
and the band is named from 20 up. With a penalty active: 10+ (지침) gets readable Stat-source feedback; 20+ (과로 / 소진 / 탈진,
ceiling 40) strong danger treatment.

### FATIGUE SURFACE

SALE: Fatigue is the status strip's `피로 N` (harmful emphasis when penalized); no standing Fatigue line; the tray lists a
Food/Drink's own `피로 회복 N` row only, no `피로 {A} → 출발 {B}` line; no Outcome-by-Outcome table — the expedition's Fatigue is NIGHT's
answer:
    귀환 후 피로 N
    귀환 후 피로 N · {band}

Band from 20 up; copy and the B5 next-decision line -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6. The Fatigue row opens an overlay
of actual daily causes (Function/Effect: 15px / 600), with the five bands in smaller type below (14px / 600, readable contrast). The overlay starts with a compact starting-to-settled row (15px / 600 figures; secondary labels 13px / 400), then lists the actual deltas; rule text keeps at least 4.5:1 contrast on a solid dark plane. NIGHT_CLOSING §FATIGUE RESULT owns the recorded path
and settled value; the inline next-decision line does not repeat the numeric Fatigue.

## DANGER DETAIL BOUNDARY

Risk detail may show Hazard name, pressured Core Stat label, what the readiness signal means. Never recommended SKU or
category, optimal combination, or hidden thresholds / Defense formula (the Gate requirement number is public). Teach reading
the system, not what to buy.

## FORECAST UI

Combat 우세 / 접전 / 불리; Hazard 취약 / 불안 / 대응 / 충분 — labelled as an estimate; no success %, master safety score or fake
precision. The first forecast tutorial says the expedition may differ from the prediction. Destination reliability is taught
as the system rule, not around 허세: `이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.` (COPY_WORLD_VOICE_v2.8.0.md
tutorial coach). Logic -> DUNGEON_HAZARD_v2.8.0.md.

## STAT PRESENTATION

Core stats 투력 / 강인함 / 기동 / 정신 in a clear 2×2. No Stat cell carries a Hazard tag (User 2026-10-03): the readout's 환경 대응
meter and the destination plate state the Gate's pressure; the value stays larger than the name. No wall of
equal-priority internal coefficients; Hazard detail appears where the destination makes it relevant.

## TRAIT PRESENTATION

Trait card: 1. name 2. actual effects 3. condition/scope when needed. Never show 이점 / 양면 / 약점 / ▲ / ◆ / ▼ (internal
POSITIVE/MIXED/NEGATIVE stays for generation/Event logic). Each effect takes its data-driven tone (benefit / cost / neutral),
never from the sign — `신중함`: injuryRisk -4%p = benefit, loot -8% = cost; wording reads without colour; no quality-grade
header/background. Authoritative -> NPC_TRAIT_v2.8.0.md.

## HAZARD NUDGE

Help the player notice risk without solving it. Every known Hazard shows its name and a short pressure line from DUNGEON_HAZARD,
number first, on every row (MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL):
- 냉기 · 대응 15 필요 · 강인함 3당 대응 1 제공
- 화이트아웃 · 대응 21 필요 · 정신 3당 대응 1 제공
- 부식 · 대응 13 필요 · 강인함 3당 대응 1 제공
- 진창 · 대응 21 필요 · 기동 3당 대응 1 제공

(no `{위험} · {label}` row; no `?` on the SALE plate.) Gate detail adds the full sentence, e.g.
`냉기 — 대응 15 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다` (forms -> COPY_AUDIT_APPROVED_v2.8.0.md §4-16). PC hover/focus or touch tap/inline
disclosure give the same information; hoverOnly=NO. Never explain some Hazards and leave others name-only. Allowed: clear
labels, readable contrast/icon, preparedness label, highlighting what is relevant. Never: an alarm naming the required Item,
`이 아이템 사세요`, automatic optimal picks — clarify ingredients, do not provide the answer. Ownership ->
DUNGEON_HAZARD_v2.8.0.md.

## ITEM INFO

Order/Sale carry enough to decide without the encyclopedia: actual effect, buy/sale price and margin where relevant,
category/role, penalty, Counter relevance; the encyclopedia is optional reference.

## SHARED SEMANTIC CHANGE LANGUAGE

    unchanged = default
    beneficial = green
    harmful = red

Meaning, not sign: operating cost 140 -> 110 green; Fatigue 8 -> 12 red; Stat 32 -> 40 green; Death risk 12% -> 8% green (no
yellow "moved" treatment for Stats). A changed value with a provable source also exposes an interaction affordance.

## SHARED ANCHORED POPOVER

One lightweight anchored popover for Stat source, Fatigue arithmetic, deterministic Store Support/Event source and short
forecast/readiness/death help: no layout shift, no background lock, no confirm button, one open at a time; desktop hover /
focus (click valid), mobile tap toggle; outside tap / Escape (and, where practical, a mobile scroll) closes; placed by
available room; normally 2 lines, at most 3. Reuse the existing tip/popover, no second modal system.

## PROBABILITY ATTRIBUTION LIMIT

No UI claiming why a random Rare Item/NPC appeared; weight effects stay in owned support descriptions. Deterministic
attribution is fine, e.g. an 암시장 special Order row naming its Event.

## HELP

Contextual explanations use anchored popovers, never a modal/accordion pushing gameplay. Copy -> COPY_WORLD_VOICE_v2.8.0.md.

### GLOBAL HELP

The 점주 가이드 uses the compact Copy text (current rules only, no internal arithmetic, no parallel long manual): first block
`처음 3일` of exactly five lines (아침 / 발주 / 판매 / 밤 / 마감), one category-grammar line (COPY_AUDIT §8-0, vocabulary only,
never a recommendation), then the eight sections under a collapsed `자세히` disclosure inside the help modal. Five lines ->
COPY_AUDIT_APPROVED_v2.8.0.md §8.

## NIGHT

question=`내 선택이 어떻게 됐을까?` — one adventurer at a time: what happened → why → what changed. Result 정보: 원정 fatigue
gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, **손님 소지금 획득**. Routine success compact; growth / injury /
death / decisive Item / callback stronger. On 게이트 순례 주간 one compact Event line with the actual changed count, and affected
cards show expected -> actual destination. No debug-log layout, modifier ledger, long mandatory animation or uniform weight.

### NIGHT — EXACT CONTROLS

Exactly two controls, both easy to reach on mobile and never demoted: `다음` (`마감으로` on the last result) and
`전체 건너뛰기`. No single-result `건너뛰기`, no `nightSkip` dependency.

### NIGHT — ACTUAL ARITHMETIC

```text
출발 0
원정에서 +5
음식·음료로 -3
→ 귀환 후 2
```

Copy -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6. A First Aid Kit Aftercare that actually changed Injury may show as a proven
contribution; no speculative failure diagnosis.

### NIGHT LAYOUT

Information order:
    Outcome
    -> proven sold-Item impact
    -> Level/Stat changes
    -> Fatigue
    -> EXP/Wallet/other

Living Flavor reuses the SALE bubble (around 3 seconds), may overlap the art, never covers the Outcome; the result stays after
it fades.

The Outcome belongs to the adventurer's identity block, not a title bar:

    [character art]   [Outcome]
                      [NPC name]
                      [dungeon · Lv]

Directly above the name, one step stronger; no own row or vertical space, no long rule — important, not the headline.

Backdrop: the rainy convenience-store night art (`presentation/night/store-night.webp`) fills the top of the screen edge to edge, behind the
menu key and the task line, and ends where the return rail begins, with no empty stretch above or below it. The menu key is the same
brass-edged dark wood as on every phase (§MENU / SETTINGS VISUAL); the task line sits on a dark top fade.

Death has no bubble but keeps the message position and weight beside the character, as a neutral status message: no quotes,
tail, bubble ground, accent bar, border, icon, badge, glow or blur. It carries only a small text-hugging status container (a
container is not a bubble). The plate is a flat COOL SLATE / BLUE-BLACK surface clearly one step brighter than the NIGHT
background (not a black veil), its edge registering at once, over the art too, with neutral light text, no parchment.
Acceptance is the runtime screenshot: a plate not clearly separable at 360 / 390 / 412 FAILS (a DOM background value is not a
PASS). Existing Death narration copy only, never as a separate line under the report.

    LIVING = speech bubble
    DEATH  = neutral floating message

The record starts under the return rail and runs down — never vertically centred (a short result must not float mid-screen),
no spacer, no dead space above.

Every Outcome label is the same size:

    36px var(--f-sign)

성공 / 대성공 / 퇴각 / 부상 / 중상 / 사망 / 생환 share it; NPC name and summary also keep one size; Outcomes differ by copy and
tone/colour only.

A death record shows only:

    death status message, character art, `사망`, NPC name, Dungeon · Lv, Outcome summary

— no route change, Deep tag, Item / cause / incident line, Level / Stat / equipment, injury / rest, Fatigue, EXP, Wallet or
reward rows, and no divider or spacing for them (render only; the resolution data is unchanged).

An equipment bonus reads `투력 +N`, never `전투 +N` (prose like `전투에서 …` unaffected; stored strings unchanged), with
equipment name and effect separated by a dot or space. No fight verdict line (`적을 물리쳤다.` / `적을 물리치지 못했다.`) at
any hierarchy; the data stays for resolver, Closing and QA.

Aftermath figures are an information region in the UI face (the pixel / LED face is for display roles like the Outcome):

    GROWTH     Level, Stat changes
    AFTERMATH  Injury / remaining injury / rest, Fatigue
    REWARD     EXP, NPC Wallet, other settled results

Groups part by spacing and at most one minimal divider; compact Level / Stat cells are fine but never a wall of metal badges,
and read-only figures never look pressable; label and value on one line unless the phone width forces a wrap.

### NIGHT LAYOUT — UNLOCK NOTICE

A new-product notice is a stable two-line composition, never incidental wrapping of `새 상품 해금 · {상품명}`:

    새 상품 해금
    {상품명}

Presentation only; unlock timing, state and reward are unchanged.

### NIGHT LAYOUT — DESKTOP ADAPTATION

Phone composition is the baseline; desktop takes one restrained responsive step of the SAME architecture — larger art, scaled
status / Outcome / summary / aftermath type, desktop-sized spacing and controls, a wider measure (not a phone panel pinned
top-left) — with no new columns, duplicates or hierarchy change. The 36px Outcome is the phone baseline: on desktop it may
scale, but all Outcomes share one size per breakpoint; QA rejects Outcome-specific portrait sizing, not one shared desktop
size.

### NIGHT LAYOUT — VERDICT STAMP (v2.9.2 H1)

(contract -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX §QA UI-Q-v29-27.)

The Outcome tag is stamped on after the card stands; tag, words, order and end layout as above. Timing is from the result's
arrival; reduced motion shows the end state at once. The stamp falls 1.6 × → 1 × in 90 ms, landing on the last frame:

    성공    일반       entry 200 · no hold · stamp lands 290 · card dips 4 px
    퇴각    일반       entry 240 · no hold · shallow stamp (1.3 × → 1) lands 330 · card dips 2 px
    대성공  중요       entry 220 · hold 100 · one gold stamp lands 410 · card dips 4 px
    부상    중요       entry 240 · hold 120 · stamp lands 450 with red ink spread from the word · dips 4 px
    중상    중요       entry 280 · hold 160 · stamp lands 530 slightly misaligned (−2.5°, 2 px) · dips 4 px
    생환    클라이맥스  entry 240 · the resolved-away Outcome prints (180 ms) · `생환` overstamps it at 510 · dips 4 px
    사망    클라이맥스  entry 240 · hold 60 · no stamp: a black tape lays across under the word (440 ms, ends 740)

- the dip (40 ms down, 150 ms back, inside the card) is the only companion motion — no ring, flash, shake or particle; ink,
  tilt and tape stay as end-state tone and never change the label size
- 생환 (`rescued` / `avoidedDeath`): first a faint print of the turned-away Outcome in its own tag (`사망` when `avoidedDeath`,
  else `중상`), then `생환` overstamps it and the print is gone within 120 ms; the Insurance proof lines (Hero Item, incident)
  cut in on that frame as the cause response. 만반의 준비 turning a Death into 부상 / 중상 prints `사망` first the same way and its
  own Outcome overstamps it (cue on the overstamp, no `rescue`); 강골 and 구급키트 only lower an injury and never reverse
- one after-motion: with a Hero Item line (NIGHT_CLOSING §HERO ITEM FEEDBACK) and no reversal it settles once (160 ms) and
  figures stand; otherwise REWARD figures (경험치, 손님 소지금 획득, 대성공 본사 보상, Deep reward) count up from 0 in 220 ms from
  the landing. GROWTH / AFTERMATH never count; a death has none. Everything ends by 770 ms
- sound: the Outcome cue's first note lands on the landing frame (sharper attack, one step louder, at every setting); 사망
  keeps its restrained attack and starts with the tape; on a reversal the cue starts with the first print and `rescue` lands on
  the overstamp. Reduced motion: cue at once, `rescue` 0.42 s after
- one landing = at most one visual (stamp), one sound (cue's first note or `rescue`), one cause / number response
- 다음 and 전체 건너뛰기 stay live: 다음 mid-stamp shows the next result's own stamp, 전체 건너뛰기 leaves at once, and a cue still
  waiting for its frame is dropped

### NIGHT — SAVED BY THE SALE (User 2026-10-09)

The one moment a night shows "내 준비가 살렸다": a result the engine proves the sold Item saved (`heroProof.outcome.worse`
is `사망` or `중상` — the same draws without that Item end worse), or a 만반의 준비 Death turned away. Insurance reversals
(`rescued` / `avoidedDeath`: 귀환석, 생환부적) keep the 생환 overstamp above and never take this beat. At most one per night:
the first `사망` save, else the first `중상` save.

    entry 240   the worse verdict prints in its own tag (`사망` lays the black tape, 350 ms); the portrait greys
    1000        the sold Item flies up from below and shoves the print off (slides down-left, tilts, gone by 1260)
    ~1150       the real Outcome stamps in its usual design (hold 860, fall 1.6 × → 1, dip 4 px); portrait colour returns
    1300-1500   the Item drops beside the `{Item} 덕분에 살아 돌아왔다.` line and stays there (28 px icon)

- the stamp, label and tape keep the VERDICT STAMP design; no caption names the what-if
- reduced motion: the end state at once, the Item icon already beside its line
- 다음 / 전체 건너뛰기 behave as for any stamp

## CLOSING

On a zero-visitor Day, Order settles directly into Closing. The receipt places the no-trading reason after its header,
before the opening-Gold row; it does not show an empty Night report. NIGHT_CLOSING owns settlement and reason copy.

question=`오늘 장사는 어땠을까?` — economics-first; the expedition story is Night's. Primary: the cash-flow receipt — opening
Gold, Gold in and out, closing Gold with the Day's change, stock / waste counts, tomorrow's operating estimate (NIGHT_CLOSING
§CLOSING — CASH FLOW RECEIPT — EXACT); figures without an accounting-explanation footer.

The CLOSING receipt and the END tape stand on the rainy convenience-store art NIGHT uses (`presentation/night/store-rain-phone.jpg` on
phones, `store-rain-wide.jpg` from 1024px), covered and dimmed; the wood texture the receipt had is gone. The `보낸 손님` heading is
lit by its colour and shadow alone and, on phones, indents to the receipt's text line. The END `총매출` figure sets its `G` unit small
(the same rule as SALE prices).

### CLOSING — RECEIPT STAMP (v2.9.2 H4)

(contract -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX §QA UI-Q-v29-33.)

The receipt body prints as one pass within 200 ms behind one printer tick (never per row — it repeats for 30 Days). Only the
closing `보유 골드` figure (its box also holds `영업 손익`) stamps (중요, the NIGHT fall reused): 100 ms hold, 90 ms fall, the
tape gives and settles. It stays cream; `영업 손익` beneath is green up, red down, gold at exactly 0 (each set in CSS so reduced
motion matches). No `어제보다 +N` line (deferred, v3.0+ router).

The END tape's `점포 자본 정산` (META_v2.8.0.md §STORE CAPITAL Run-end settlement structure; rates 1 / 2 / 3 / 3 / 3%) counts
`현재 점포 자본` up from the prior total in 320 ms, a quiet `ui` cue at each Decoration price it passes (500 / 750 / 1000 /
1500, read from META_v2.8.0.md §DECORATION's list, not copied); 일반, no hold. Reduced motion: everything at once.

### END — THIS RUN BLOCK (v2.9.12)

(acceptance -> UI_UX §QA UI-Q-v29-54.) "이번 판은 이런 가게였다" must stay (GAME_VISION). The END tape carries `이 점포의 기록`
between `지금까지 연 점포` and `점포 자본 정산` (story → settlement → 본사 해금 → replay line):
- rows in order: `버틴 날` (`DAY {N}`), `손님` (visitors · `단골 {N}` made this Run), `돌아오지 못한 사람` (Deaths, 0 printed),
  `가장 성장한 손님` (`{이름} Lv.{N}`, highest Level among visitors incl. the dead, tie → higher Loyalty), `원정`
  (`{N}건 · 대성공 {N}`, all expedition records)
- no expedition (DAY 1 bankruptcy) → no `원정` row; no names of the lost (the notebook's `돌아오지 못한 사람` list has them)
- read from existing Run data, no save field; copy -> COPY_AUDIT §10-4

### END — REPLAY NUDGE (v2.9.4)

(acceptance -> UI_UX §QA UI-Q-v29-37.) Show, never assign: the tape says what this Run left behind — no task, checklist,
progress bar, remaining-count, mission or reward.
- `본사 해금` lists every product / Job this Run opened: distinct-Boss unlocks and the D10 / D14 first-reach products (META §D10
  / D14 PRODUCT UNLOCK), recorded when they open (their Day toast unchanged)
- if the Run opened nothing, one bold line may close the tape above `도감에서 보기`, the first that applies:
  1. the settlement crossed the price of a Decoration the account did not own at that settlement (before < price <= after;
     judged once — buying from the ending does not change it): `점포 자본으로 새 장식을 들일 수 있다.` — never naming one (each
     Slot offers two)
  2. new best Day (META §BEST DAY): `지금까지 가장 오래 버틴 점포다 · DAY {N}`
  3. new best 총매출 (META §BEST DAY): `지금까지 가장 많이 판 점포다 · 총매출 {N}G` — N is the tape's `총매출` row
  4. otherwise nothing
- prints with the receipt, no new motion or sound; copy -> COPY_AUDIT §10-3

## RELIC UI

Relic Window: candidates compare at a glance (effect / condition / price), Buy / Defer obvious, window availability visible in
management phases, no purchase reopen during Active Sale/Night. Each D5/D10/D15/D20/D25/D30 Window gets one focused reveal;
Buy or `나중에 결정`; deferring never rerolls candidates/prices; Save/Reload never replays the reveal.

Cards never show internal taxonomy (Foundation / Hybrid / Keystone / Utility; Rotation / VIP / Premium / Expedition / Fresh /
Customer Axis; `신선식품 · 기반`-style labels); synergy is discovered from effects.

The card does show the support's 등급 (RELIC §GRADE, User 2026-10-05): the word `일반` / `희귀` / `영웅` stamped in front of the
name (one place on every card): pixel face in the Item rarity colour's paper shade, a double-ruled frame, a slight tilt, no
divider. The owned list (보유 점포지원) shows the same stamp in front of each name. The title, effect and cost stand well in from
the paper's edge. All three D5 cards still fit at 1280×880.

Owned Relic Quick View — Morning=YES, Order=YES, Sale=YES, readOnly=YES: name + actual effect/condition; a condition-type
support adds one runtime status line (RELIC §QUICK VIEW STATUS LINE; lines COPY_AUDIT §11-32); no HUD, badge or verdict word;
no purchase/defer/timing change during Sale. A Relic reads as a Run-build choice, not a settings menu. Authoritative ->
RELIC_v2.8.0.md.

### STORE SUPPORT OWNED REFERENCE

While choosing a Store Support, the owned list stays reachable through the existing compact detail/modal; no new panel.

### Store-support reference during ORDER / SALE

ORDER and SALE each have one compact, immediately reachable control for owned 점포지원, reusing the owned-Relic data and detail
modal (no second system), available before the commit, never competing with the decision. SALE has no second owned-Relic
block at any width (FINAL preparation keeps its list).

### RELIC VISUAL

User 2026-10-03: replace the gray candidate windows and full-width yellow purchase bars with blank, clipped ivory
contract sheets and compact gold paper choice/purchase tags at the lower right. The name, full effect/condition and
price are live text: zero-priced first-window candidates read `무료`; later candidates show their actual calculated `NG`
price from candidatePrices. Never bake `무료`, any price or any action label into art. The price shares a bottom row with
the action tag, with no overlap. Titles remain 22px, effects 14px with intact wrapping and dark readable ink on cream.
Use real text-free raster materials for the paper/clip and tags. No nested ornamental borders, blur, green state or card fade.
Owned/unavailable tags retain the same footprint, lose purchase art and press affordance, and name their existing cause.
The supplied phone/wide warehouse JPEGs remain byte-identical; viewport framing is CSS only. Keep the wood title plate.
User 2026-10-03 follow-up: desktop stacks three large contracts vertically in one column up to 1000px wide, using a wide
blank paper asset. Desktop titles/effects/prices use 28/18/22px and purchase targets are 184×54px. Cards use at least 200px
height and grow with the available viewport (capped at 270px); shorter windows scroll instead of compressing content.
Keep all three D0 cards substantially visible at 1280×880 and every action scrollable above the dock at shorter heights.
The footer carries no separate guide text: the coach mark owns the first-window explanation (User 2026-10-03). Mobile contract layout stays at the approved size. All purchase targets
remain at least 48px high. Remove the footer's brown enclosing plane and full-width orange defer bar; keep a compact wooden return tag. The footer remains outside the candidate scroll; later windows keep reroll/defer peers.
Candidate count, effects, prices, acquisition timing, unavailable causes and save/reload behavior remain owned by RELIC/COPY.
Acceptance: capture D0 and D5 at 360×640, 375×548, 390×780, 430×780, 1280×700 and 1280×880. Every candidate's button
scrolls clear of the fixed footer, all catalogue names/conditions/prices wrap without clipping, owned/unavailable states keep
their control footprint, and the D0 coach clears its title and footer. Verify defer/reload, the real paid reroll and persisted
candidates, the SLOTH seal fold/reopen, and the D0 selection-to-briefing transition with motion and reduced motion.

## EVENT PRESENTATION

A MORNING opening beat, not a Phase: a focused overlay before Gate/Morning detail with title, short situation and actual effect;
continuing returns to the normal Morning Situation with the Event-modified Gate/Hazard/visitor state in place. Afterwards
Order and Sale keep only their relevant effects; Night/Closing mention it only when it materially changed the result. Never
bury it in stacked cards or repeat it every Phase. Catalog -> EVENT_v2.8.0.md.

## BOSS / FINAL REVEAL UI

Gameplay -> BOSS_v2.8.0.md; Final Family -> FINAL_EXPEDITION_v2.8.0.md; wording -> COPY_AUDIT_APPROVED_v2.8.0.md.
- D5: `Boss Identity` focused reveal -> D5 Relic reveal
- D15: `Boss Trait` focused reveal -> D15 Relic window decision (`Relic 획득` vs `봉인 해제` when Sloth opportunity)
- D30: D30 Relic window decision (`Relic 획득` vs `봉인 해제` for Sloth) -> Final preparation / lock

### FINAL TIMELINE PRESENTATION

Reuse Morning/management/Final surfaces, no Final dashboard. Beats: D0 Final objective notice · D10 Boss investigation · D20
Recon dispatch · D25 exact persisted Final Family/Hazard disclosure · D30 reuses D25 (no Family reroll). Timing ->
`BOSS_v2.8.0.md`; state -> `FINAL_EXPEDITION_v2.8.0.md`.

### BOSS INFORMATION PRESENTATION

All Boss-information beats use the Guild investigation dossier family.

### BOSS REVEAL — MORNING LANDS FIRST (v2.9.2)

(acceptance -> UI_UX §QA UI-Q-v29-35.) A reveal due on entering MORNING (every stage: D0 briefing, D5 ~ D25) opens after
MORNING has landed: a 200 ms hold, then the shade at once and the sheet rising into place in 260 ms with the art already on it.
During the hold MORNING shows but takes no input (the Day cannot pass an owed reveal, CORE_RUN §D0 FIRST-MORNING BOSS
BRIEFING; a second tap on the 구매 that cut to MORNING does nothing) and no Event or Relic window opens; it ends at once if the
Day leaves MORNING or the reveal stops being owed. The dossier also waits for the art to decode, at most 1.2 s more (today's
art is prefetched, so a warm cache adds nothing); the page loads its four fonts with itself. No sound or copy; reduced motion
opens at once.

### D0 — FIRST MORNING BRIEFING

Objective information, not spectacle: the first step of DAY 1 MORNING after the first Store Support choice (process ->
CORE_RUN_v2.8.0.md; copy -> COPY_AUDIT_APPROVED_v2.8.0.md). No Boss art, silhouette, backdrop, fake portrait or timeline
cards. Under the header `마왕 조사 개시` and lead line: a DAY label (the record's LED face) over each of its four lines (DAY 05 / 15 / 25 / 30),
no closing sentence (§14-1); one `확인`. Compact like onboarding, yet the objective cannot be missed.

### D5 — 길드 토벌 공고

`in-world 길드 토벌 공고`: 1. Boss D5/D15 BASE illustration 2. fixed Boss name 3. the next-reveal line (when the Boss Trait is shown and
where to read it again, COPY_AUDIT §14-2) 4. short Flavor under it, readable size (it may hint at the Trait; the Function stays hidden)
5. on to the D5 Relic reveal. The art is a primary game object, never an icon by a card.

### D15 — 길드 정보 보고

`길드 정보 보고`: 1. a one-time 안내 line under the intro (what a 마왕 권능 is, COPY_AUDIT §14-4; spent once per Account, tied to 안내 끄기 / 다시 보기)
2. the same BASE illustration 3. identity 4. exact Trait name 5. exact material effect, figures read from the tuning table 6. relevant current DATA
(GREED: 목표 매출 · 현재 매출 line, then the line saying 도감 > 마왕 shows it again).
The rule, not strategy advice. Never exact Final success %, hidden Final Power, internal Factor / Modifier terms.

### D5 / D10 / D15 / D20 / D25

D5/D15/D25 are major beats; D10/D20 are shorter (fewer lines, lighter hierarchy, shorter dossier) but keep the same centered
Boss art as D5/D15 — never a thumbnail. D25 is information-first (the Family/Hazard disclosure is the payload).

All D5/D10/D15/D20/D25 investigation reports share one art-size rule across every Boss:
- mobile: max-height follows the available viewport height (100dvh minus 560px reserved for report text and controls), bounded between 100px and 240px
- desktop: max-height follows the available viewport height (100dvh minus 510px reserved for report text and controls), bounded between 200px and 300px
- keep the illustration aspect ratio; do not shrink only the overflowing Boss or investigation Day

At 360x800 art alone never pushes core information or the acknowledgement below the first viewport. The sheet is a takeover
that claims enough of a phone screen to read as a report, with neither tiny art in an empty sheet nor art that buries the text.

### DOCUMENT DETAIL — USER APPROVED

- Boss art sits on the paper; no floor line or divider under it
- D5 Flavor: plain report text, aligned to the explanation above it, with one dotted horizontal divider between Function and Flavor; no indentation, non-semantic coloured bar or tinted box
- D15 Trait: `마왕 권능` label (the codex card says just `권능`) -> Trait name -> explanation; no side bar, box, tinted panel or card — type and spacing carry it (the 안내 line and the GREED sales line are the User-approved 2026-10-04 exceptions: a light tinted strip each)
- D25: each Family keeps its semantic left colour rule; no black rule above the Family section; a thin neutral divider
  between the two Families is allowed; Hazards are not decorative cards

Information truth first; Boss presence is co-equal except at D25, where art never buries the disclosure.

### 도감 > 마왕

A codex tab after 점포지원 and before 점포 장식. It lists only the Bosses the Player has met (identity shown at D5, or any past clear); a Boss never
met is absent, an empty tab says COPY_AUDIT §14-11. Order: the Boss order of the roster, except this Run's Boss first once its identity is shown.
Each card: small art, Boss name (this Run's card carries an `이번 영업` mark), then the Trait name and sentences. No Flavor and no Final Hazards
(they change every Run). A Trait not yet shown reads `DAY 15에 마왕 권능이 밝혀진다.` for this Run's Boss and `마왕 권능은 아직 확인하지 못했다.` for a Boss
met in an earlier store. GREED's card adds 목표 매출, plus 현재 매출 on this Run's card. The record lives on the Account (`bossLog`); a save without it reads empty
and a cleared Boss counts as known.

### D25 — 최종 정찰 보고

`최종 정찰 보고` with a one-time 안내 line under the intro (COPY_AUDIT §14-7) (any reused report framing belongs here): exactly two Final Families, each with its actual T2 Hazard set, each
Hazard as the MORNING-plate row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공` with N for 마왕성 (Day 30 / T2 -> 29).
`two Families` does NOT mean two Hazard keys. Never the Hazard formula, Final success % or Final Power.
Hazard names and required Counter values use the Function/Effect information face (14px on phone, 15px on desk, weight 600); conversion explanations use the Secondary factual face (13px, weight 400). Family headings keep the plate face (16px on phone, 17px on desk); do not let their typography inherit into nested Hazard values. Keep at least 4.5:1 contrast for required information.

### FINAL MODIFIER PREVIEW

Final threat views in Order and preparation include a compact 마왕 권능 name and an expandable existing D15 effect
explanation with current tuning values; GREED includes its current sales and SLOTH its broken seals. Hazard Function
rows use 14px / 600 Wanted Sans on phones, 15px on desks; stat conversion lines use 13px / 400.

Before Final Lock, every Boss-changed visible value shows `original → applied`:
- PRIDE: each participant's 투력
- ENVY: targeted participant's 투력 / 강인함 / 기동 / 정신
- GLUTTONY (`BOSS_v2.8.0.md`): the positive Core-Stat contribution from Items before -> after ×0.50; no Rarity threshold;
  Counter / Fatigue recovery / Insurance / Utility / harmful RiskReward penalty are not shown as reduced
- LUST: each affected non-regular participant's 투력 / 강인함 / 기동 / 정신
- GREED: 목표 매출 · 현재 매출 · 달성률 · 현재 탐욕 강화 %
- SLOTH: 봉인 해제 상태 · 현재 위협 단계

No Final success %. Identity `탐식의 마왕 글러트니`; Trait prose -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

### FINAL BOSS ART

Normal six Bosses: `Final prep / confrontation / result -> D30 BATTLE`. SLOTH: SB0 -> BASE reuse; SB1 -> D30 SB1; SB2 -> D30
SB2; SB3 -> D30 SB3. The Final Boss is never name-only when its art exists.
- Boss/Family information never follows the Relic choice
- the Sloth choice reads `Relic 획득` vs `봉인 해제` as exclusive: the seal choice is its own dark violet plate apart from the
  candidates, with no violet edge bar on it or the seal count
- a small `접기 ▼` key at the plate's top right — or a tap on the plate outside its `봉인 해제` key — folds it to a chip
  `봉인 해제 {N} / 3 ▲` (so a phone shows the last candidate); the chip unfolds it; windows open unfolded; candidate taps never fold
- `봉인 해제` spends and closes the window like 구매; a spent window (bought or seal broken) shows `닫기`, never `나중에 결정`
- once a SLOTH Run's seals are revealed (D15 Trait), the owned list (`점포지원 N / 7` chip's sheet) opens with
  `슬로스 봉인 해제 {N} / 3`; the chip itself is unchanged
- no new permanent Phase; Seen state stable across Save/Reload; art never pushes decision information far below the fold

### FINAL — BOSS REVEAL ENTRY (v2.9.2 H6)

(contract -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX §QA UI-Q-v29-34.) FINAL is the only H6 entry
(CLOSING, END and DAY 0 already have entry beats): the `.gate-zero` block (art/backdrop with the name plate) settles once,
`translateY 10px -> 0` + `opacity 0 -> 1`, 220 ms, outQuad, 일반, no hold (the SALE `who .figure` settle). No sound or copy;
threat board and order form untouched; reduced motion shows the settled state.

## FINAL PARTY / PREPARATION PRESENTATION — D30

### FIRST-EVER FINAL EXPEDITION COACH

Each stage teaches its decision once per account, using the existing `tutorial['coach-'+id]` completion state:
- D30 support takeover: the Final process, anchored to `.relic-open`; only the D30 window in the Final phase admits this modal exception, alongside the existing D0 support exception.
- Last order: the fixed half-price transfer and candidate Wallet check on `원정대 후보 보기`, then the no-effect Item boundary on the last-order form heading.
- Roster: Fatigue / Injury / Wallet inspection on a visible candidate card, then the three-member cap and irreversible commitment on `원정대 확정`.
- Committed preparation: every Hazard applies to each participant, anchored to that participant's environment meters. Reuse the existing party-wide `subjugation` Coach ID and forecast target to teach reading the overall forecast with each participant's environment meters and choosing supplies from their own needs. The detailed forecast explanation remains in its anchored `?` Help.

Support, last order, roster and preparation are separate skip groups. `안내 건너뛰기` completes only the current stage;
future stages remain eligible. No new Run / Account flag or migration is required. Completion survives save/load and new
Runs; settings `안내 끄기` suppresses all marks and `안내 다시 보기` clears the existing `coach-*` records.
Ordinary modals and Boss reveal holds still suppress coaches. Exact approved copy -> COPY_AUDIT §14-9.

### PARTY SELECTION

A selection surface, not a rarity gallery: up to 3 participants, 1 or 2 allowed even with 3+ eligible; count reads as capacity
(`선택 1명 · 최대 3명`) and is never under the menu pin. Rarity stays as text (at most one restrained step, never above the name
or overflowing); no rarity-coloured frames; unselected cards neutral, selected cards alone carry the strong frame.
- the last order carries `원정대 후보 보기` beside its form heading: a read-only sheet of the candidates, each opening the
  notebook with no pick (FINAL_EXPEDITION §D30 PLAYER FLOW). The candidate control is a clearly framed secondary
  action next to the title, rather than a small underlined label. The phone dock holds 창고 / 발주 확정 / 원정대 꾸리기;
  the warehouse, form references and folded floating rail reuse ordinary ORDER. The rail shows only the Final Hazard names and required-response numbers
  and post-order Gold, with no Family names, Tiers or ordinary visitor counts. Support purchase/Seal choices remain available through
  the existing D30 arrival and Store menu; support effects keep their form reference.
- FINAL 준비 carries a quiet `자세히 보기` text control under the supplied member's Stat grid, opening that notebook read only
- last-order candidate and party-selection cards show Wallet, active Injury/Severe Injury and Fatigue band above 10,
  omitting the healthy label; the FINAL notebook retains full condition information

No ordinary `전투 전망` while the party is provisional. Guidance copy -> COPY_AUDIT_APPROVED.

Before commitment, the roster dock also carries `발주로 돌아가기` beside `원정대 확정`, with the return affordance
explained in the existing roster guidance block. Returning preserves provisional members and the last-order sheet.

### PARTY COMMITMENT

`원정대 확정` moves to preparation; under 3 members the approved confirmation shows first, its `돌아가기` / `이대로 확정` one
geometry family (meaning by weight only), `돌아가기` the only cancel. Afterwards only the committed party is prepared, the roster
is no longer main content, and no swapping.

### PARTY-WIDE SUBJUGATION FORECAST

After commitment one compact party-level `토벌 전망` (not per-NPC, not a dashboard): hidden before, covers the whole 1/2/3
party, updates as supplies commit, `우세 / 접전 / 불리` only, no Final Power, Boss Power, probability or Final Roll. The first
Coach teaches reading this forecast together with individual environment meters; its anchored `?` keeps the detailed forecast explanation. No standing paragraph. Item detail may still show that
member's concrete delta. Not here: one-NPC `전투 전망`, failure-to-death risk, any one-NPC environment forecast posing as the
party's.

### FINAL PREPARATION UI — EXACT

The two-slot handling surface without haggling/refusal. For each selected participant:

```text
2 Bag slots
Item selection
fixed price = 50% / 매입가
Wallet affordability
commit transfer
```

- one deterministic transfer price (the ordinary 50% / 매입가); no 100% / 150% controls, purchase/refusal chance, refusal
  result or refusal lock UI
- Wallet and stock readable; insufficient Wallet disables the transfer with a readable reason
- a valid commit updates stock and NPC Wallet before the remaining-slot decision; Player Gold and Gross Sales each rise by the
  same fixed amount exactly once
- two slots, may stay empty; no later free-equip screen; no-effect Items blocked/marked per `FINAL_EXPEDITION_v2.8.0.md`;
  Boss-changed Items show current Final truth; no GREED-only counter panel
- each committed member's card shows their own `환경 대응` beside the Bag, one current/required number per disclosed Hazard; Hazards from the same Family share one horizontal row. On phones the Bag uses two compact 36px icon slots to preserve that row; reuse the ordinary meter's required-value rounding and sufficient/insufficient colours
- while the supplied member's card is above the scroll viewport, a folded/expanded brown rail repeats that same card
  with Wallet, Bag and environment readings. It reserves space above the scrolling shelf and clears the menu pin;
  focused unsold Items never change it, a paid transfer updates it, and changing target updates the named participant.
- the shelf/header and fixed-price transfer key reuse current SALE material assets; departure reads 최종 원정 보내기.
- meters use that participant's actual `finalPreRoll().preparations` Hazard result, before participant-side Boss snapshot modifiers; focused unsold goods do not change the committed reading, and a paid transfer refreshes every member's meter

### FINAL ITEM / WALLET FEEDBACK

Keep expiry information on stock rows. The expanded post-supply change panel omits its duplicate expiry line on D30.

No-effect Item: visibly blocked with the Demon-Castle wording (`Final` never player-facing). Insufficient Wallet: exact
required/owned Gold in the Item area, transfer disabled, inline status, no refusal speech or alert modal; no SALE chatter.
Any blocked transfer (no-effect / Wallet / Bag full) shows its reason as compact inline status, while the disabled action keeps
its normal face. Action labels never wrap by accident on mobile; body text may.

### FINAL RESULT — SEAL STAMP (v2.9.2 H5)

(contract -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT; acceptance -> UI_UX §QA UI-Q-v29-30.) A Final ending strikes one
carved seal with the Boss's name at the right of the headline (one seal for 1~3 members; none on non-Final endings):
- clear: vermilion, square, crisp — the heaviest landing: tape still 200 ms, seal 2 × → 1 × in 90 ms, tape gives 6 px and
  settles (170 ms)
- failure: lighter (1.6 ×, tape 3 px), faint, crooked, partly printed — paper language, never the NIGHT death tape
- headline and reason settle in (160 ms) from the landing, clear of the seal, breaking at word boundaries
- one cue on the landing (`sealwin` rises from the Boss motif's root, `sealfail` falls under it); the departure's `final` cue
  plays once
- the seal is aria-hidden (the headline states the result); reduced motion: all at once, same end state

### FINAL — CLASH SCENE (v2.9.9 H7)

(exception -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT H7; acceptance -> UI_UX §QA UI-Q-v29-46.) After `마왕성으로 출발`
the already-resolved result plays as a card fight over the FINAL stage, then the ending (§FINAL RESULT — SEAL STAMP); the scene
decides nothing.
- cast: Boss card above (art, name, one health bar), party cards in a row below (portrait, name, Lv, job, a bag of slots),
  1–2 members centred, the Boss room behind; no damage numbers, party bar or new copy
- entry (~2.1 s): stage darkens, Boss card drops heavily and holds, party cards rise in turn, a held stillness
- supply: each carried item (the resolved Final's bag record) rises into its member's bag one at a time, ~0.3 s each (more
  items take longer); empty hands stay empty
- exchanges in party order: the member lunges to the Boss card's lower edge (~0.7 s), the hit only glints and jolts (no
  amount); the Boss counters (~0.55 s), the member shakes and flashes red; then the bar drops by that member's share — except
  the last, held for the verdict. The Boss counters the last member too, so clear and failure match until the verdict
- verdict (~2.7 s): stillness (~0.9 s), the red runs down and slows (~0.85 s), hesitates near the bottom (~0.5 s) — a clear at
  5%, a failure where the roll left it; a clear empties, the Boss card cracks (stepped pixel lines) and collapses; a failure
  holds, the Boss rises and shakes once and the party is pushed back and dimmed. Then the ending
- the bar loses min(1, rolled Party Power / effective Boss Power) in equal shares per member, only falls, ends empty on a clear
  and never visibly empty on a failure (at least 3% stays); close outcomes look alike until the hesitation ends
- length follows the party (about 7 s for one member, about 10.5 s for three with six items), no ceiling
- sound per landing: low `rumble` (Boss lands), `supply`, `clash`, `counter`, `collapse` (clear); `final` and the seal cue
  unchanged
- a tap anywhere skips to the same end state; reduced motion: no scene. The Final is resolved and saved on `마왕성으로 출발`,
  so a reload opens the ending; no Save field

## STORE MANAGEMENT / DECORATION

In the existing Codex/management space: Store Capital, four fixed Slots, owned/unowned, cost, exact effect, equipped
Decoration. Purchase is explicitly confirmed and spends once; every step (구매, 구매 확정, 취소, 적용, 해제) keeps the pressed
row in place (no jump to the top). Loadout is editable only outside a Run, frozen at Run start. Pre-Run management always has
an explicit way back to new-Run preparation; mobile back never strands on a blank state. The live store draws equipped
Decorations at fixed locations; no free placement, levels, rarity ladder or random shop.

### LIVE STORE DECORATION SEATING

(acceptance -> UI_UX §QA UI-Q-v29-40.) The store painting is `cover`ed on the stage (side crop when narrower, top/bottom crop
when wider). Pieces follow the painting under any crop:
- 간판 and 벽면 hang at their own points on the painted ceiling / wall, never on the DAY sign or the board; the 간판 shares the
  DAY sign's ceiling and shifts left only to keep its gap from it, or hangs that gap below the stage top when the crop removes
  the ceiling
- 진열대 (left) and 계산대 (right) stand on the counter top with the till housing, feet on its base line, sized by its counter
  mount; each keeps its painted spot unless that comes within a fixed gap of the housing, and never overlaps the housing, its
  label, another piece or the screen edge
- outer outline light — half an art pixel at 55% opacity, the room showing through; a standing piece's bottom line and legs
  stay whole and opaque, and a line another part rests on (trophy stem, sign hangers) stays whole, so nothing floats
- the till housing always stands on the painted counter: the counter band follows the drawn painting, shifted by the top crop
  (no floating housing on a portrait tablet)
- a landscape stage 768 px wide or more (landscape tablet, sideways phone) uses the desk's wide framing; below about 500 px
  high pieces and the preparation scene still crowd board and dock — an open v3.0 finding, not a rule
- the branch plate stays on the counter front while it clears the dock Action, otherwise rises just above it; its larger desk
  size needs a stage 760 px high or more
- covered: phone 360~430 at browser heights 640~932, the iPhone SE stage 375x548 (§SHORT PHONE), portrait tablet 768~912,
  landscape tablet 900~1023, desk 1024~1920

### DECORATION ART (User 2026-10-05)

Each Decoration is one pixel-art SVG (`dist/ui/assets/deco/<id>.svg`). The store draws every piece of a Slot at one width, so
a new picture is drawn to match the others of its Slot, not on its own:
- file: `shape-rendering="crispEdges"`, rectangles only (no text, script or external reference); one art pixel is 2 x 2 file
  units, the light outline (§LIVE STORE DECORATION SEATING) is the half-unit ring around the silhouette
- canvas width per Slot, so the art pixel is the same size within the Slot: 간판 80, 벽면 44, 계산대 48 (추모 방명록 56),
  진열대 52; heights stay near the Slot's others (간판 44, 벽면 42, 계산대 34~40, 진열대 50)
- the piece fills its canvas: it spans the width inside the outline, no wide empty margin (a narrow piece reads smaller
  than its neighbours at the same width)
- body colour runs straight to the light outline: no second, dark edge ring inside it. Volume is one lit row / column on top
  and left and one shaded row / column at the bottom and right, in a lighter and a darker tone of the body's own hue
- the near-black `#1b130c` (opaque) only for small inner detail (an icon's outline, a door seam, a slot) and a standing
  piece's foot line and legs; a large area or a frame in it reads as a heavy border
- hanging pieces (간판, 벽면) end with the half outline under them; standing pieces (계산대, 진열대) end with the whole opaque
  foot line on the file's last row
- colours chiefly from the pieces' shared palette: wood `#3f2a1a #6b4a2e #9a7148`, gold `#86652a #c8a35e #e3b23c #ecd59a`, red `#62201c
  #a8322f #dc5d55`, paper `#b9a982 #d9cfb2 #f4efe6 #fbf4e2`, steel `#20272d #3a444c #6f7d87 #8e9aa3`, teal `#4d6f75 #6f9ea6`,
  green `#2f7a4d #7fb069`, purple `#4f3a72 #7c5ea8 #a58bd0`, navy `#1c2840 #283a5c`
- a framed 벽면 piece uses the one gold frame the others use, row for row, and a 간판 hangs on the same two grey rods with its
  board at the same height; what is inside differs
- a piece does not share its body colour with another piece of its Slot (two red signs read as one)
- and no two pieces share an outline: 계산대 and 진열대 are not both a box on two legs with paper on top
- what each piece shows is what the Decoration does (a 지원금 sign with a coin purse, a medical cross, a coupon box ...)

| Slot | economy | survival | operation |
|---|---|---|---|
| 간판 | 원정 지원금 간판: teal board, trophy and coin purse | 훈련소 제휴 간판: red board, crossed swords | 단골 감사 현수막: cream banner board on the signs' two grey rods, red heart between brown thank-you lines, notched ends |
| 벽면 | 명예 모험가 액자: gold frame, an adventurer's portrait | 의무실 현판: gold frame, red cross on paper | 본사 우수 점포 훈장: the wall's gold frame, a gold star medal on a red ribbon on navy |
| 계산대 | 알뜰 금고: steel safe, gold dial | 추모 방명록: open book and candle | 휴식 바우처 꽂이: stepped wooden brochure stand, a voucher in each pocket |
| 진열대 | 길드 추천 매대: wooden shelf of goods, trophy | 구급품 진열장: glass cabinet of red kits | 지원 교환 쿠폰함: tall purple ticket dispenser, swap arrows, a coupon strip |

The four 운영형 pictures are drawn by `tools/deco-art.py` (art-pixel grids, written as the SVG files); `tools/deco-sheet.cjs`
draws all twelve at their Slot widths side by side for review. Test ui-guard checks the file rules; `tools/qa-deco-seating.cjs`
checks the seating.

### PROLOGUE (User 2026-10-04)

Five full-screen scenes before every new store: at start-up when there is no Run (in place of the loading
screen; the art keeps loading behind it, and the loading screen returns only if the prologue ends first) and
after `다음 점포 열기`. A start-up with a Run in progress shows the loading screen as before.

| scene | art | caption | cue |
| --- | --- | --- | --- |
| 1 | the seal breaking over the castle (enlarged from the top: phone 1.15, desk 1.2) | 봉인이 풀린다. / 30일 뒤, 마왕이 깨어난다. | rumble |
| 2 | three adventurers facing the castle | 마왕 앞에 설 수 있는 자는 단 세 명. / 시련도, 전투도 모두 넘어선 자들뿐이다. | final (gate) |
| 3 | black | …뭐, 그건 모험가들이 할 일이고. | none |
| 4 | the store beside the dungeon gate, daylight | 나는 던전 앞에 편의점을 차렸다. | open (shutter) |
| 5 | the store inside with one customer | 오는 모험가마다 팔고, 먹이고, 키운다. / 단골이 되면 또 오고, 또 오면 더 강해진다. | depart (door) |

- Scenes 1~3 keep the caption at the screen's centre; scenes 4~5 under the picture. One sentence per line, no wrap.
- A tap anywhere goes to the next scene, and every scene says so at the bottom: `탭하여 넘기기` on a touch screen,
  `클릭하여 넘기기` with a mouse. `건너뛰기` (top right) ends it. It ends on the store screen.
- Copy owner: `Copy.prologue`. Art: `dist/ui/assets/presentation/prologue/` (phone and wide per scene).

### NEW STORE PREPARATION — STORE SCENE (v2.9.9)

(acceptance -> UI_UX §QA UI-Q-v29-42.) 새 점포 준비 is the store about to open — MORNING's painted room (same framing, bands and
§LIVE STORE DECORATION SEATING) — whenever there is no Run, and after `다음 점포 열기` from the ending.
- the title logo hangs where MORNING's DAY sign does (§OPENING TITLE LOGO), MORNING's branch plate centred under it; the counter
  front carries only the Capital plate, Slot tags at the counter's ends; on the wide framing the title hangs at the 간판's
  height and the 간판 keeps its gap from it
- tags and plates keep their 360x640 share of the stage: tag type grows with height past 640 px (and desk width), capped; the
  pixel-face plates step on their 12 px grid — branch plate 12 -> 18 px on a stage 800 high or 1000 wide and 24 px at 1000 by
  1000, Capital plate 17 -> 24 px on the first step on a stage 400 wide or more (narrower, the 24 px plate is wider than the till
  housing it stands for and crowds the counter pieces; its side padding also narrows with the stage). Grown tags never reach the board; on the wide framing the 간판's tag stacks
  two lines level with the sign's plate and stays inside the stage (§RESPONSIVE RULE — DESK STAGE WIDTH) and clear of the
  ceiling fixture
- the board `새 점포 준비` holds the game's three lines as one pinned note, then `보유 장식 없음` /
  `점포를 열면 이번 점포에는 고정됩니다.`, a save error pinned above when present; it ends above the Slot places (tighter, same type, on wide framings under
  800 px high)
- each Slot is its place in the room: an equipped Decoration drawn with a small Slot + Decoration tag, or an empty spot with
  `{Slot} · 비움`; each place is a control (§Pre-Run Decoration empty-slot interaction) with at least a 44 px target; tags
  anchor to the piece edge facing the room's middle and never leave the screen or cover logo, plate, board, Capital, Action
  or another place; the planned Account loadout is shown
- Store Capital is a small counter plate `점포 자본 {N}` where the till will stand (no float before a Run)
- `첫 점포지원 고르기` sits where MORNING's `문 열기` does; from the ending a secondary `결과 다시 보기` returns there (with no Run,
  no way back — the choice starts the Run); 점포 장식 opened from a place returns here (`새 점포 준비로 돌아가기` / 닫기)
- the ended Run is untouched until `첫 점포지원 고르기`

### Pre-Run Decoration empty-slot interaction

An empty Slot is neutral ("비움" without "주의 ·"). Before a Run every Slot place (§NEW STORE PREPARATION — STORE SCENE), "비움"
included, opens 점포 장식 (codex tab) scrolled to that Slot in the existing panel (no second selector); during a Run the frozen
loadout is read-only. A Slot with an affordable, unowned Decoration ends with a small `들일 수 있음` mark (a state, not a "new"
flag, naming no Decoration; COPY_AUDIT §1-8).

### DECORATION DECISION SURFACE

Name, exact effect, price / ownership, equipped state; no Flavor prose and no Collection screen for it (data may keep it).
The key is short (User 2026-10-03): `구매` over a small `{가격} 자본` (or `적용` / `해제`), beside the name on the card's first
row; the effect line runs the card's full width on the row below, so neither the key nor the name narrows it.

### STORE GROWTH SURFACE

Store Capital / Decoration management and run-end settlement stay as META_v2.8.0.md and CORE_RUN_v2.8.0.md own them.

## META UI

Meta gameplay -> META_v2.8.0.md. Keep distinct: Job × Boss clear matrix · Job Mastery 0..7 per Job · Total Job Mastery ·
Distinct Boss Clear 0..7 · approved 1/3/6 unlock milestones; no legacy Global Meta XP as progression. Monster Knowledge has no
player surface and no codex `몬스터 지식` tab (all Hazards are public from MORNING); the record stays, unshown (META §MONSTER
KNOWLEDGE).

## MENU / SETTINGS — EXACT COMPOSITION

Top-level Menu exactly: 모험가 수첩 · 도감 · 점포지원 · 이번 점포의 장식 · 점주 가이드 · 설정 · 현재 지점 포기.
- 점포지원: an open, purchasable window (RELIC §reopenAllowed, `canBuyRelic`) opens the selection; otherwise the closable owned
  list `보유 점포지원`, never an empty selection
- 이번 점포의 장식: read-only, the frozen four Slots as `{Slot 이름} · {장식 이름} · {효과 한 줄}`, empty `비어 있음` (COPY_AUDIT
  §1-7); 영업 · 점포 vocabulary, never 런
- 현재 지점 포기: COPY_AUDIT §1-3 confirm, then the Run is discarded at once (CORE_RUN §CURRENT RUN ABANDON) and 새 점포 준비
  shows with no Run (Decorations can be bought and equipped); a new Run starts only from `첫 점포지원 고르기`
- the DAY 0 첫 점포지원 surface has no way back (no `장식 구성 다시 보기`, no generic close); its `나중에 결정` defers the free
  pick and opens DAY 1 (RELIC §ACQUISITION WINDOWS D0)
- 점포지원, 이번 점포의 장식 and 현재 지점 포기 appear only while a Run exists

Sound Toggle and Full Data Reset are not top-level. Settings: 저장 내보내기 · 저장 가져오기 · Sound On/Off · BGM · SFX · Full
Data Reset — and **not** 현재 지점 포기.

### MENU / SETTINGS VISUAL

`현재 지점 포기` stays top-level, apart from Full Data Reset. Menu = one surface with rows (no card grid), subtle separators,
destructive row apart in muted red, optional restrained brass marker. Settings = one utility panel of native controls (native
`input[type=range]` may be reskinned, no slider framework). ~44px hit targets on mobile.

User-directed visual target (2026-10-03): retain the existing fantasy-store concept and wood material. Menu / detailed
utility surfaces use dark carved wood, aged brass corner joints, quiet blue steel utility controls and muted crimson
destructive controls. No title icon. Menu rows may use purpose-made PNG icons; detailed settings do not add an icon to
each control. A subdued transparent PNG supply / forest illustration may sit at the foot of a detailed menu, behind the
content, with no pointer events or information role. Do not put that illustration into top-level menu rows. Generated
concept images are visual targets; actual browser captures still require review before accepting the finish.

The sheets the store menu opens (설정, 모험가 수첩, 현재 지점 포기 and the like) share one carved-wood frame and one vertical rhythm.
Their close control is a bare light 44px `✕` with a soft drop shadow: no key, no plate, no brass fill, so it reads against the dark wood
and cannot be mistaken for an action. A Store Support window closes with the same `✕` when it is spent (on a dark plate over its art).
The settings title matches its menu button's name. The menu key (`☰`) is brass-edged dark wood on every phase, over art included.
Sheet text speaks in the plain `~다` voice (COPY_AUDIT §1-3 and the settings / reset / import rows); roster and abandon lines sit on separate lines.

Settings groups its existing controls in this order: `소리` (mute, BGM, SFX), `저장` (local-save explanation, export/import),
`데이터 초기화` (existing reset action). Preserve the exact existing actions, save/audio behaviour, confirmation steps and
build marker. Group boundaries are inset brass seams, not another panel. Native range inputs keep visible numeric values,
a compact brass diamond thumb and an actual ~44px interactive area. Utility controls use hard depth; pressing reduces it,
keyboard focus is visible, disabled controls remain readable, and destructive controls are muted red. Titles use Mulmaru; body and
controls use Wanted Sans, with the existing numeric role where applicable. Gameplay phases retain their own materials.

### SETTINGS / DEBUG BOUNDARY

Ordinary settings are localized and gameplay-facing: no developer Seed controls pre-Run, no technical runtime footer (the build
line, §BUILD MARKER, excepted); no Debug menu needed.

### OPENING TITLE LOGO (v2.9.9)

(acceptance -> UI_UX §QA UI-Q-v29-41; asset -> reports/ASSETS.md §Title logo.) `던전 앞 편의점` is the drawn logo, not type,
hanging from the store scene's ceiling: one image with the name as alt text in the `h1`, no added shadow or frame; no larger
than needed — phone at most 210 px wide or 58% of the width, clear of the build marker and menu; desk 320 px; cut to the
letters (shipped as a 960 px derivative with the 점 받침 reading as ㅁ). The branch name stays visible, unemphasised: MORNING's
plate under the logo.

### PRIMARY ACTION GRAMMAR (v2.9.9)

(acceptance -> UI_UX §QA UI-Q-v29-44.) Each Phase's single dock Action — `첫 점포지원 고르기`, `문 열기`, `영업 시작` (or
`발주 확정`), `손님 보내기`, NIGHT `다음`, `다음 날`, `다음 점포 열기`, the FINAL gate bar — presses the same way; material,
colour, silhouette and place vary by Phase.
- shared: one hard cast down-right at 45 degrees, visible (a notched cut takes the cast in); the press moves the face into it
  by the depth less 1 px, leaving 1 px; label weight 600
- size by consequence: inside the Day (`문 열기`, `영업 시작`, `다음`) 56 px tall on phone / 60 px desk, `손님 보내기` 44 px on phone / 60 px desk; across a
  Day or Run boundary (`다음 날`, `다음 점포 열기`, FINAL gate bar) 64 / 72 px; `첫 점포지원 고르기` 64 px everywhere (the
  preparation plates sit right above the dock); ORDER labels may step down on the narrowest phones so the Gold never wraps
- D30 last order: `원정대 후보 보기` is the secondary action beside the form title; the phone dock holds
  `창고` / `발주 확정` / `원정대 꾸리기`. Before commitment, the roster dock pairs `발주로 돌아가기` with `원정대 확정`.
- depth 5 px across a boundary, 4 px inside the Day, `손님 보내기` 3 px (under the price keys, §SALE — COUNTER TRAY);
  `발주 확정` and `영업 시작` are never enabled together and share the 4 px - on a phone ORDER's slim dock row (User 2026-10-02)
  sets both, and the `창고` key, at 48 px (Android's touch target) with a 3 px cast, a 2 px lit top and a 3 px foot, labels 15 px
- edges: inside-the-Day Actions are a face with a lit top edge and a deep foot edge, no outline, the label dropped in that
  edge's ink (ORDER's frost is the lit edge of both its Actions); NIGHT `다음` is a flat plane (no bevel); boundary Actions keep
  their heavier bevel
- one colour per family: `발주 확정` / `영업 시작` one steel face with one frost edge, told apart by label; `첫 점포지원 고르기`,
  `다음 날`, `다음 점포 열기` one BRICK build, only `첫 점포지원 고르기` with four rivets; the gate bar its own red
- per-Phase material → §STRONG GREEN SEMANTIC table (MORNING's shutter square, no cut); NIGHT's cast is deep cobalt, the FINAL
  red bar's cast a step darker than its foot (black is lost on its dock); each keeps its dock place

### BUILD MARKER (v2.9.3)

(acceptance -> UI_UX §QA UI-Q-v29-36.) So a play report can name its build, `v{version} · {commit}` shows small (10 px) and muted in
the top-left of the opening screen (no Run: 새 점포 준비) above the room — not a control, taking no title space — and centred at the
end of 설정 (점포 메뉴 -> 설정) for mid-Run reading; nowhere else. `{version}` = CHANGELOG head; `{commit}` = first 7 hex of
the deployed commit, written into `build.js` by the Pages deploy (`dev` when unstamped). The console prints
`GUILD24 v{version} · {commit}` on load; `Guild24.build` returns `{version, commit}`. Every save the game writes (autosave and
`저장 내보내기`) carries the same pair as `build: {version, commit}` beside the save `version`, and a new Run keeps the build it
started on as `run.startBuild` (a Run can outlive a deploy); both are read-only metadata, never validated, and a save without
them still loads.

## RUN ABANDON UX

Confirmation copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` (현재 지점 포기 Confirm); no legacy XP / settlement / reward promise.

## QA / DEBUG REPRODUCTION ACCESS — EXACT

No Seed input or visible Debug menu for players; deterministic QA access stays:
1. controlled Account state: Full Data Reset, or import the test's exact Save fixture
2. browser Developer Tools -> Console
3. `Guild24.game.start('<seed>'); Guild24.render();`
4. during a Run, `Guild24.showDebug()` or `Ctrl+Shift+D`
5. the Debug payload: seed · RNG state / last RNG · ORDER offers · current NPC · current Dungeons · resolved Results with debug
   evidence · Boss debug state

Development / QA only, never player navigation. Removing a player-facing QA control requires verifying both its absence and
that this path still reaches the capability.

## TUTORIAL

Coach Mark / Spotlight / FTUE Overlay: the screen stays visible, dimmed, a spotlight target, a small anchored bubble, `다음`,
`건너뛰기`. Action steps may allow only the target and auto-advance on success.
- no added page height (sole exception: the DAY 1~3 task line, §TUTORIAL — TASK LINE) and no pushed layout
- responsive bubble: as wide as its words need, up to the screen (560 px on a desk), so it takes only the lines its copy
  needs; target may scroll into view; one concept per step; contextual first use preferred
- `건너뛰기` skips the current screen's marks only
- completion persists; reload never restarts a finished tutorial
- no large green instruction cards in the flow

### TUTORIAL — TASK LINE, DAY 1~3

On DAY 1, 2 and 3 while `tutorial.skipped` is false, one fixed text line tops the phase content (under the menu pin, above the
first block) on MORNING, ORDER, SALE, NIGHT and CLOSING: none from DAY 4 or on DAY 0, hidden when skipped; not a coach mark
(no spotlight or button); never two lines at 360; tutorial state only, no Save field. Strings (`오늘 할 일 — …`) ->
COPY_AUDIT_APPROVED_v2.8.0.md §3.

### TUTORIAL — FIRST-ORDER COACH ORDER

(§TUTORIAL — COACH DIET.) The first ORDER has one mark, `confirm` (발주 확정); no `gates`, `stock`, `offer`, `quantity`
or `gold` marks — the 오늘 line and `위험 보기`, the 창고 head (DAY 1: `창고 · 본사 기본 상품 N종`), the effect lines, `최대` and the
register say them. The `reroll` mark is the DAY 4 ORDER's, even when another ORDER coach appears that day: the key keeps the name `발주 후보 교환` and gains a transparent local raster refresh icon with an open arc and a distinct attached triangular arrowhead. The mark says each press doubles the price. Strings -> COPY_AUDIT_APPROVED_v2.8.0.md §3-7 / §3-14.

### TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER

Hazards: each pressures a Core Stat; natural Stat and Item Counter both count; readiness is 취약/불안/대응/충분. Fatigue is one
fact on the tray's `피로 회복` row the first time a Food/Drink is chosen for a fatigued customer: Food/Drink reduce Fatigue;
Fatigue 10+ lowers 기동/정신.

First SALE (§TUTORIAL — COACH DIET): DAY 1 has two marks (User 2026-10-09), destination and
the price keys the first time they show (a refused 바가지 closes the Item, so it must be known before the choice; COPY_AUDIT §3-14). The two outlook marks (전투 전망, 환경 대응; the readout `.top` is the SALE-entry snapshot and
does not move with a sale; COPY_AUDIT §3-4) start on DAY 2 (전투 전망, after `flow` - how an expedition is decided, win the fight and no Hazard incident, rule only) and DAY 3 (환경 대응, after the Stats mark - 투력 drives combat, the other three answer Hazards; COPY_AUDIT §3-7 STATS), the Bag mark (after the first sale) on DAY 4 and the returning-customer mark (tap opens the notebook; it also says what 단골도 does -
visits and buying) on DAY 4: a step carries the first DAY it may show, so no DAY is buried (DAY 2: `flow`, 전투 전망; DAY 3: the payday customer, Stats, 환경 대응; DAY 4: 발주 후보 교환, the Bag, the returning customer). The kit mark belongs to the day the kit actually arrives.
No Hazard marks (Hazard rows say what answers them). Never `독이면 X 아이템을 사세요`-style scripts.

### TUTORIAL — COACH DIET (v2.9.12)

(acceptance -> UI_UX §QA UI-Q-v29-53.) One rule, one place: a mark only where the rule must be known before the decision and no
screen says it; otherwise none, or taught after the fact.
- before: DAY 0 `점포지원`; MORNING Deep (§FIRST-EVER DEEP EXPEDITION TUTORIAL), the first Event (§FIRST EVENT TUTORIAL) and II / FIRE
  Gate marks (§GATE TIER / FIRE GATE TUTORIAL); ORDER `발주 확정` and, on the Day the first Run's HQ 구급키트 comes, that kit (its cell on
  desk, the `창고` handle on a phone; COPY_AUDIT §3-12 - the one mark that names an Item, a gift already given); SALE the
  first Run's DAY 3 payday customer (its wallet, COPY_AUDIT §3-13); destination, Stats and the two outlook boxes (전투 전망, 환경
  대응 - one mark each, User 2026-10-02); SALE price keys (the first time they show, COPY_AUDIT §3-14); SALE Bag (after the first
  sale) and returning customer; FINAL staged support / last order / roster / preparation marks (§FIRST-EVER FINAL EXPEDITION COACH),
  including the existing `토벌 전망`; CLOSING `영업 시작 골드와 보유 골드를 비교한다.` (first clause only; the receipt gains no row)
- no mark (the screen says it): MORNING 방문객, 게이트; DAY 0 card, key; ORDER gates, stock, offer, quantity; SALE
  Hazard; NIGHT `한 명씩 …` (`전체 건너뛰기` says it)
- one label carries the rest: DAY 1 창고 head `창고 · 본사 기본 상품 N종` (opening stock only; the desk head - the phone key is
  `창고 N / M칸` alone). The readout title is `전투 전망`, short enough to share the row with `환경 대응` on a phone; the outlook mark carries when the reading is taken
- after the fact: the first refused 바가지 (§SALE PRICE LESSONS), beside NIGHT discovery marks (NIGHT_CLOSING §DISCOVERY LINE) and the Wallet gain row (`손님 소지금 획득`); a NIGHT tells one mark, the most serious rule first

### SALE PRICE LESSONS (v2.9.12)

One contextual mark, once per account, persisted and reset with the rest: the first 150% (바가지) refusal, on the refused key
(`오늘 거절됨`). The price keys themselves carry the §TUTORIAL — COACH DIET mark before it. Words only; copy ->
COPY_AUDIT_APPROVED_v2.8.0.md §26-3.

### TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY — REQUIRED

A truly fresh account sees the tutorial again (boundary -> `CORE_RUN_v2.8.0.md`): Full Data Reset clears completion/dismissal;
the first applicable flow starts the existing sequence; stale v1~v7 flags never suppress it after fresh v8 init; rejecting
legacy test state and creating fresh v8 equals a clean install; Run Abandon / new Run need not replay a finished tutorial.
Audit and reuse the existing sequence, fixing trigger/persistence/reset, never replacing it.

### GREAT SUCCESS TUTORIAL

No mark before the fact: the first normal-expedition 대성공 paying the Store its Gold bonus is named on its NIGHT record
(`NIGHT_CLOSING_v2.8.0.md` §DISCOVERY LINE) — preparation raises its chance and it leaves an additional Gold bonus — so the
Player sees why another useful Item matters even when Success looks likely. The SALE signal has no mark.

### 만반의 준비 TUTORIAL

No mark before the fact: the first time 만반의 준비 (`DUNGEON_HAZARD_v2.8.0.md` §Preparation / Level Death reduction) turns away a
Death, that NIGHT record names condition and effect in words (`NIGHT_CLOSING_v2.8.0.md` §DISCOVERY LINE). Fatigue likewise has
no SUPPLY mark; the SALE counter anchors neither.

### FIRST STORE SUPPORT TUTORIAL (DAY 0)

The tutorial starts on the DAY 0 Store Support takeover with one mark saying what a Store Support is, that the free pick may
wait until DAY 4 and where it reopens, and that new candidates come every 5 days - never naming a pick (cards print effect and
price; the key and `점포지원 N / 7` say the rest). It is the one mark over a modal, DAY 0 only,
persisted per account. Copy: COPY_WORLD_VOICE_v2.8.0.md §TUTORIAL COACH COPY.

### FIRST-EVER DEEP EXPEDITION TUTORIAL

Trigger: the account's **first actual Deep Expedition occurrence during play** — never per Run or in advance. Account-scoped
via existing Tutorial persistence: survives Run abandon and new Runs; a full reset deletes it and the next occurrence shows it
again. It teaches: 1. `심층원정` exists 2. optional 3. higher required Combat Power than the ordinary Gate 4. one visiting NPC
can be nominated 5. nomination costs Store sponsorship Gold 6. Success gives extra NPC EXP/Growth + Wallet 7. unlike a normal
Great Success, Store Gold return is 0 even on Great Success. Shown before the first nomination decision; dismissing it leaves
no Morning/Order information hidden.

### FIRST EVENT TUTORIAL

(acceptance -> UI_UX §QA UI-Q-v29-56.) One contextual MORNING mark, like the Gate marks: the first time an Event slip (`.slip.event`)
is on the board, after the Event reveal is closed, once per account, persisted and reset with the rest. On a fresh account it
lands on the first Run's DAY 2 (`CORE_RUN_v2.8.0.md` §FIRST-RUN LESSONS). It says that an Event may come any morning and changes
that one Day; it never names an Event or what to do about it. Copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3-11.

### GATE TIER / FIRE GATE TUTORIAL

(acceptance -> UI_UX §QA UI-Q-v29-52.) Two contextual MORNING marks, like Deep: first time such a Gate is on the board, once per
account, persisted and reset with the rest, anchored on that Gate's plate, rule only, never the answering Item (§READ THE
SYSTEM):
- the first tier II Gate that is not FIRE (`DUNGEON_HAZARD_v2.8.0.md` §Family T2): II Gates carry two Hazards, each pressing its
  own Stat. Keyed on the tier, not the Hazard count (User 2026-10-02): a tier I Gate an Event (한파 · 독안개) gave a second
  Hazard, and a tier III Gate, never draw it
- a FIRE Gate: one Hazard, higher required Combat Power (`DUNGEON_HAZARD` §FIRE second axis)
- copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3-10

## COPY HIERARCHY

Short, concrete, state-based; no marketing language, repeated paragraphs, the same fact in several cards, or AI-style headings
everywhere. Show important state once, where the decision is made. Terminology / DATA-FUNCTION-FLAVOR / Voice ->
COPY_WORLD_VOICE_v2.8.0.md.

### COPY / TUTORIAL UX RECOVERY

Approved terms (never the old ones): 탐식 (not 폭식) · 손님 소지금 획득 (not 전리품) · 탈출 확률 (not 탈출 보정) · 부상 확률 (not
부상 위험) · 1000G / 18칸 (not 1200G / 24칸) · 교환권 50G (not 30G) · 설정 (not 설정 · 저장). Tutorial/Help cover injury / Severe
Injury, fatigue / recovery, ORDER confirm / Reroll / 영업 시작 separation, D10/D14 unlock, current Save/Reset; no Night
single-skip instructions.

## FUNCTION / FLAVOR VISUAL HIERARCHY — EXACT

On decision surfaces Function reads before Flavor.

| role | size class / weight | treatment |
|---|---|---|
| Function / Effect | 14–15px class / 600 | normal/high contrast; numeric conditions and exact rule effects |
| Secondary factual | 13px class / 400 | dimmer than Function |
| Flavor on a decision surface | 12–13px class / 400 | lower contrast; 1–2 lines recommended; no numeric/rule payload |
| Event Reveal | Flavor 13px / 400 / dim · Effect 15px / 600 / primary | |
| Morning Event slip | Flavor 12px class · Effect 13px / 600 | |
| Codex/Lore Flavor | 13px / 400 / dim | may be italic |
| NPC Dialogue | 14–15px class | speech bubble |
| Death Narration | 13–14px class | dim/report; no quotation marks or bubble |

Exception: Boss D5 Flavor is primary reveal content and is not demoted.
Phone SALE exception (User 2026-10-03): the stamped combat word and environment numbers may use a smaller,
readable scale (about 16–18px and 14–15px); shelf titles use a crisp 12px plate step, Item names/effects 14px/13px.
This is a local density correction, not a global type reduction. Keep exact effects and risk information, high contrast,
full words, and the touch targets; verify readability and overflow in actual short-phone captures, including two Hazards.

## NAVIGATION

The primary Phase action stays obvious; secondary navigation (Notebook, Reference/Knowledge, HQ/catalog/help) never competes
with it. The Store is the home-space anchor outside pure management screens.

## INFORMATION DENSITY

Avoid indiscriminate text shrinking; the approved phone SALE exception above requires actual readability and overflow review.
Mobile: vertical stacking, clear hierarchy, collapsible secondary detail, no narrow
multi-column compression. PC may be wider with the same priority.

## RESPONSIVE RULE

PC-first, mobile-supported; desktop composition is not sacred. Narrow widths stack, simplify, move secondary detail, keep
primary actions large, trim side gutters, keep the decision/action in the first viewport, and never let art push required
information far below the fold; never shrink all fonts/controls to fit desktop columns.

Required mobile visual QA widths: 360px · 390px · 430px — by real browser screenshot/inspection: no zoom needed for core text,
the phase question/action obvious, not a scaled-down desktop, no clipped sticky action / safe-area overlap, the scene useful
rather than a poster above the decision.

### DESK STAGE WIDTH (User 2026-09-30)

A desk stage is at most 1440 px wide and never wider than 1.65 × its height (a 1366 x 680 laptop browser keeps 1120). Two
painted rooms stay 1120 wide because they are drawn at the given width: FINAL's Boss room (wider, it grows taller and pushes
the hazards and last order below the fold) and NIGHT's window band (centred, sides in the band's own edge colour).

### SHORT PHONE (User 2026-09-29)

The shortest supported stage is an iPhone SE with Safari's bars: 375x548, run in the visual gate beside the 780-high widths and
the Galaxy stage (360x597). On a portrait stage under 640 high:
- MORNING: the board may extend over the wall to just above the till's label so the Event (with its effect line) and the
  first Gate plate read whole; till, plate and pieces stay put (§LIVE STORE DECORATION SEATING) and a 벽면 piece there goes
  behind the board — the situation reads before the room (§MORNING)
- 새 점포 준비: the note takes the short-desk tighter step so the status line stays on the board; the 간판 keeps its gap from
  the title; the title is at most 180 px; an empty 간판's tag (wider once it carries `들일 수 있음`) runs from the piece edge
  nearest the title toward the screen edge, hanging under the build mark, never covering the title
- SALE stays sale-first (§MOBILE SALE PLAYABILITY): preserve the character scale (§SALE — MOBILE AUTHORITY), use the local
  readable type ladder and lower-right stock metadata, keys still 44 px or more. Representative one-/two-Hazard visits keep
  two complete shelf rows at 640 / 597 / 548 with the tray expanded and opening correction applied. Longer product effects wrap intact and may scroll;
  the Bag, price keys and dock remain reachable. Below 700 high the tray folds on scroll.

## TOUCH / INTERACTION

Repeated or primary actions (quantity +/-, price buttons, next, confirm, reroll, customer/item selection): target≈44px class.
No tiny icon-only controls, cramped adjacent taps or controls under the safe area. Mobile QA covers browser chrome, safe area,
sticky footer overlap, clipped header/action bar. iPhone Safari: a quick second tap on a control never zooms (pinch zoom
stays); long-pressing a portrait or painting opens no save-image menu.

## ACCESSIBILITY / SIGNALS

Never colour alone for Trait benefit/cost, danger/preparedness, selected or disabled state — reinforce with icon / label /
shape / text; but never bring back `이점/양면/약점` or ▲/◆/▼ for it (the effect sentence carries meaning). Contrast stays readable
on dark backgrounds and brand accents.

## AUDIO FEEDBACK

Audio principles (voice / hierarchy / phase BGM identity) -> PRESENTATION_PRINCIPLES_v2.8.0.md.

### BGM audibility

At BGM 100% / SFX 100% on a real phone speaker the BGM is continuously audible and routine SFX still read above it — never by
globally lowering SFX; player BGM/SFX sliders and master mute stay. Calibrate the existing source/bus first; local free assets
may replace a loop too thin at a correct level. External audio: development-time download, no CDN/network playback, vendored
files, CC0/public-domain preferred or a license explicitly allowing modification and redistribution in a game, no NC /
unclear license, attribution kept in the repo, reasonable size and mobile cost, day / night / boss moods kept apart.
AI-generated music made for this project is allowed (PRESENTATION §AUDIO PRESENTATION).

### PHASE BGM (v3.0, User 2026-09-29)

Every phase plays a recorded track (`dist/ui/assets/bgm/`, provenance in `reports/ASSETS.md`):

| screen | track |
| --- | --- |
| PROLOGUE scenes 1~2 | BOSS |
| PROLOGUE scene 3 | none (silence) |
| PROLOGUE scenes 4~5 | TITLE, running on into the store screen |
| no Run · 첫 점포지원 · the store about to open (NEW STORE PREPARATION) | TITLE |
| MORNING | MORNING |
| ORDER | ORDER |
| SALE | SALE |
| NIGHT | NIGHT |
| CLOSING | CLOSE |
| FINAL | BOSS |
| the ending of a cleared Run | SUCC |
| the ending of any failed Run (bankruptcy, the death limit, a failed Final) | FAIL |

The ending track never tells the result first: the previous screen's music (BOSS through the Final and clash, CLOSE after
bankruptcy, NIGHT after the Death limit) plays on until the result lands — the seal's landing frame, or one short beat without
a seal — then SUCC / FAIL enters with the ending cue (§ENDING CUE); a reload of the ending plays SUCC / FAIL at once.

Loop rule: the whole track, never a middle section. Start at the first sound, moving only past a short distinct intro (at most
15 s); end near the original end (within its last 25 s; BOSS 40 s), dropping only the final chord, tail or fade; both cuts on a
beat. Points and method -> `reports/bgm-loops.md`; live values -> `dist/ui/audio.js`. Join: a short fade (at most 60 ms); BOSS
alone a 1 s crossfade; a long crossfade is never the default fix.

Playback:
- equal loudness for all tracks except NIGHT, 3 dB under (densest, heard as loudest)
- BGM sits under decision and result cues with the existing ducking: music at -30 LUFS, each cue at its §SFX LEVELS tier
- a phase change fades the old track out (1 s), then the next rises over 1.5 s — never overlapping, never a hard downbeat
- mute or a hidden page stops the music; returning resumes it — after a call or app switch without a tap where the browser
  allows (iOS Safari keeps it suspended), else on the next tap
- the iPhone silent switch keeps Safari's default (silent while on; never stops another app's music)
- a track that fails to load falls back to the synthesised bed; no phase goes silent
- the web build ships 128 kb/s copies and prefetches the next phase's file; the app ships the originals
- playback changes no gameplay state and consumes no Gameplay RNG

### SFX LEVELS (User 2026-09-29)

Per-cue levels make each tier one loudness, placed per PRESENTATION §Mix. Measured as a phone speaker plays it: loudest 100 ms
window ignoring content under 300 Hz (BS.1770 shelf + 300 Hz high-pass); audibility = best 1/3-octave band from 280 Hz up over
its music (that music's loud 90th percentile, less the cue's ducking). Music at -30 LUFS (NIGHT -33).

| tier | cues | level | clears its music by |
| --- | --- | --- | --- |
| result | the NIGHT outcomes, the seal and ending cues, the Boss beats, `final`, `collapse` | -19 | 8 dB |
| decision | ORDER / SALE commits (`order`, the price modes, `refusal`), purchases, open / close, `begin` / `newstore`, `rescue` | -21 | 8 dB |
| action | `depart` / `return`, Gold, the ORDER crate, the receipt, `heal`, `fixture`, the clash beats, `supply` | -25 | 5 dB |
| utility | `button`, `ui` | -29 | 3 dB |
| rapid repeat | `quantity`, `quantset` | -31 | 3 dB |

- each cue lands from 1.5 dB under to 3 dB over its level (lift up to 3 dB to clear its music); still masked at that ceiling =
  a sound problem, reported for a User decision, never lifted past its tier
- no bass a phone cannot play: full-range (K-weighted) loudness within 6 dB over the level; low cues carry through overtones at
  the same pitch; the effects bus drops everything under 120 Hz
- an output limiter at -3 dBFS, transparent below; no single cue peaks over -4.5 dBFS; worst coincidences (sale + Gold,
  quantity taps into the ORDER commit, NIGHT outcomes in a row, the clash, seal into ending cue) stay under -1 dBFS over the
  phase music at full sliders
- levels: `dist/ui/audio.js` (`LEVEL`); measurement: `tools/qa-sfx-mix.cjs` (in `npm run qa:runtime`)

### DISTINCT CUES (User 2026-09-29)

Different meanings, different sounds; sharing only where it is the point.
- apart: Decoration `fixture` (wooden double knock) vs FINAL `clash` and Store Support `support`; SLOTH seal-break `boss`
  (shattering glass over a low thud) vs the Boss information motif and the Boss's `counter`; CLOSING `receipt` (one short
  printer pass) vs ORDER `crate`; `ui` click (two-note blip) vs `quantity` tick (bright noise tick)
- shared on purpose: the three SALE price modes (PRESENTATION §TRANSACTION BEAT A5), the quantity stepper and its quick-set
  (one step down), the Boss information motif across strengths
- `ui` and the quantity ticks are synthesised, bright and short to clear the music at utility level (retired files listed in
  `reports/ASSETS.md`)
- `tools/qa-sfx-mix.cjs` (spectrum shape x loudness contour): every `apart` pair below 0.6; shared families reported

### ENDING CUE (User 2026-09-29)

Each ending sounds its result cue as the result lands: `endwin` (cleared Run: rising line to a held major chord), `endfail`
(failed Final, bankruptcy, Death limit: falling minor line onto a low held root). On the Final ending it follows the seal cue by
150 ms; reduced motion plays it at once; it ducks the music; presentation only, no Gameplay RNG.

### SFX coverage

No unique sound per click: REUSE fitting cues, add one only where reuse would make two different actions sound misleadingly
alike. Required coverage: soft navigation/select feedback where silence feels dead · quantity change · ORDER confirm ·
store/open transition · Item select · 50% / 100% / 150% sale as one register family with 1 / 2 / 3 coin ticks, none sounding
correct (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A5) · `손님 보내기` exit (`depart`, recorded door / step utility cue)
· `첫 점포지원 고르기` (`begin`, a knock and a rising ringing G-D-G) and `다음 점포 열기` (`newstore`, a latch and a short rising
pair), each synthesised · refusal · Gold gain vs spend · Relic purchase · Decoration purchase and equip/unequip · special Guild
action · reroll · liquidation/rescue · depart / return / day close · Night outcome severity · Boss reveal / seal / Final
departure · unlock/discovery reward.

## AI-SLOP CHECK

Before accepting a major UI revision: mostly nested cards? badges/chips doing hierarchy's work? same radius/border everywhere?
brand Green as the whole language? a SaaS admin look? Primary Action weaker than explanatory containers? phases as one template
with different text? If YES, restructure composition before polishing color/shadow/radius.

## FONT / VISUAL QA BOUNDARY

Verify: mobile 360~390 and 412-class, desktop 1024 and 1280+; no ORDER/SALE/Settings wrap overflow; price/%/Stat legibility;
SALE 50/100/150 scannable at once; Final fixed price without 100/150 controls; no runtime network font request; no glyph loss;
font license notice kept. Avoid literal-object button proliferation, icons on every row, round-all-cards, needless
gradient/shadow, touch-target sacrifice, desktop card proliferation, new nested modals.

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### SCOPE

Design owner under test -> UI_UX_v2.8.0.md; presentation checks -> PRESENTATION_PRINCIPLES_v2.8.0.md.
Rule text lives in the body; a QA item points there with `→ UI_UX §SECTION` and keeps only what it checks.

### PHASE IDENTITY / VISUAL LANGUAGE

#### UI-Q01 — PHASE IDENTITY
Review Morning/Order/Sale/Night/Closing side by side.
PASS: each has a distinct primary purpose/composition; they do not look like the same dashboard template with different text.

#### UI-Q02 — DASHBOARD SLOP CHECK
Inspect major screens.
PASS: gameplay object/action hierarchy is stronger than container decoration — no excessive nested cards, chips/badges,
same-radius containers, thin-border boxes or full-screen brand green.

#### UI-Q27 — COPY COMPACTNESS
PASS (all primary screens): short concrete state-based text; no repeated explanatory paragraphs that compete with gameplay.

#### UI-Q28 — DESKTOP/MOBILE PRIORITY
PASS: wide and narrow layouts keep the same information priority with different composition where needed; mobile is not
just shrunken desktop.

#### UI-Q95 — STRONG GREEN SEMANTIC
PASS: no dock Action uses Strong Sign Green as its face - `영업 시작` / `발주 확정` are the ORDER steel with the frost edge
(UI-Q-v29-44); green stays store-sign / environment material and beneficial semantic colour; every routine primary action uses
its material direction (UI_UX §STRONG GREEN SEMANTIC table), not a generic green CTA.

#### UI-Q97 — TYPOGRAPHY EXACT
PASS: Atmosphere = Mulmaru; Information = Wanted Sans; no Galmuri/Pretendard player UI dependency; no third font family/theme
system; no runtime network font request; license notice retained.

#### UI-Q98 — TYPOGRAPHY RESPONSIVE QA
Verify at minimum: mobile 360~390, mobile 412, desktop 1024, desktop 1280+.
PASS:
- no ORDER/SALE/Settings wrap overflow; price/%/Stat digits readable; no missing Korean/player-facing glyph
- ordinary SALE 50/100/150 quickly distinguishable
- Final preparation shows only its single fixed 50% / 매입가 price presentation and does not leak ordinary 100/150 controls

#### UI-Q99 — ANTI-GENERIC MATERIAL PASS
PASS: store/paper/wood/metal/slate/receipt language stays recognizable; no round-all-card/dashboard proliferation; no
unnecessary gradient/shadow/icon-every-row pattern; touch targets are not sacrificed for visual styling.

#### UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH

Run representative MORNING / ORDER / SALE / NIGHT / CLOSING / FINAL screens and Store Support on phone and desktop.

PASS:
- generic green is not the default primary-action treatment; green stays readable as beneficial semantic colour and may stay
  as store-sign/environment material without becoming the universal CTA
- MORNING warm store / wood / gold; ORDER paper / steel / cool frost-blue; SALE register / gold-amber with price-mode colours
  keeping their own meaning; NIGHT dark / dusk; CLOSING receipt / paper / ink with restrained neutral/gold emphasis; FINAL keeps
  the blood / ember-red gate language
- phase differences are accents inside one GUILD24 component language, not separate skins; phase-bound overlays stay
  contextual; global management/help/settings stay neutral
- Store Support choice/acquisition does not fall back to a generic green CTA as its identity
- semantic benefit/harm colours unchanged; action hierarchy understandable without colour alone

Phone SALE speech (→ UI_UX §MOBILE SALE PLAYABILITY, Customer speech):
- the greeting auto-dismisses around 3 seconds (a purchase / refusal reply line after 5 seconds) and is tap-dismissible
- reserves no permanent height and does not cover the primary action
- over the compact customer-state strip the text stays fully opaque while only the bubble background is approximately 88%
  opaque; the customer state underneath stays recognizable; whole-element opacity is not used to make the dialogue faint

FAIL:
- every phase still reads as the same green-button UI
- a new theme/skin framework is introduced for this polish
- phase accent changes semantic benefit/harm meaning
- transient speech is made faint by lowering the whole element opacity
- speech becomes a persistent blocker for required SALE information

#### UI-Q-v28-31 — DARK PIXEL + CONTROLLED POP / GAME-LIKE INTERACTION

Runtime UX QA, not literal palette inspection. Audit every Player-facing surface touched by Presentation Polish on phone
(360 / 390 / 412) and desktop (1024 / 1280-class). Drive Store Support through AVAILABLE / SELECTED / UNAVAILABLE and both
disabled causes.

GLOBAL PASS:
- one GUILD24 2D / pixel game surface, not a web dashboard with a game skin
- the environmental / information base is quieter than the current decision; the few things that need action get stronger
  controlled-pop contrast; action / state hierarchy is understandable without colour alone
- crisp hard edges / hard depth / flat planes carry the pixel-2D construction
- a pressable Primary Decision Control has clear physical depth / press feedback; Utility Controls stay subordinate and need
  not become game objects
- Phase identity comes from material, hierarchy, placement and handling as well as any accent
- gameplay, Save, RNG, information boundary and decision structure are unchanged

GLOBAL FAIL:
- the whole UI is uniformly muted / muddy / military-dashboard-like and the decision no longer pops; or candy-colour /
  arcade-toy loud
- only the hue changed while the interaction is still the same SaaS CTA; every Phase is the same rectangular CTA in a
  different colour
- blurred shadow, soft glow, glossy gradient, fake metal or exaggerated bevel is the main source of game feel; ornament was
  added instead of making the action / state clearer
- G24 / 길드24 seal, bolt, badge, frame or decorative mark repeats without functional meaning
- a coloured left vertical bar / status stripe is the selected-state shortcut
- visible outlines on every button/key by default even when plane + hard depth already separates the control; border /
  inset frame / bevel / hard drop stacked on ordinary controls without a functional reason
- whole-element opacity communicates unavailable state
- a new theme / skin framework is introduced
- touch target, legibility or accessible naming regresses

COLOUR QA:
- there are no literal Canonical hex values to match; exact hue / saturation may change without a Design amendment when
  semantic roles, state hierarchy, contrast and this QA remain true
- do not enforce a palette by source guards that merely compare hard-coded colour literals
- semantic benefit / harm colour stays authoritative over decorative accent

PRIMARY DECISION / PHASE HANDLING PASS:
- committing a main choice feels like the Phase's own action, not a generic web submit; the Primary Action has presence
  without outranking the information it acts on
- Boss / FINAL do not collapse back to `image + information card + generic confirm button`
- nested panel hierarchy is reduced where the report / record / gate itself can own the information

PER-PHASE APPLICATION PASS:
- ORDER quantity (→ UI_UX §ORDER): one cluster with one recessed numeric readout; peer keys need no decorative outlines; the
  commit is the form's strongest physical action; hierarchy is item information > readout / stepper > `1 / 3 / 최대`; the
  quick set carries no box, pixel key plane or hard shadow; `- / +` show a face smaller than a full square game button and
  keep a 44px touch target
- ORDER `1 / 3 / 최대`: subtle dotted underline when available, sharper underline / ink on hover and focus, dim and
  non-interactive when disabled with no whole-element opacity fade; maxQuantity behaviour unchanged (`-` at q=0, `+` at
  q>=max, `1 / 3` above max, `최대` a q=max shortcut); a control blocked by Gold or warehouse space (not by the offer's supply)
  stays dim but answers a tap with the §3-9 reason toast, and `최대` at 0 does the same
- NIGHT record and Death per → UI_UX §NIGHT LAYOUT: Outcome inside the identity block one step above the name (no headline row,
  record-spanning underline or own space); rescue Outcome exactly `생환`; no fight verdict line at any hierarchy; every Outcome
  label 36px `var(--f-sign)` on phone (one size for all; name and summary unchanged by Outcome); aftermath figures in the ordinary
  UI family as GROWTH -> AFTERMATH -> REWARD, never pressable; Outcome is the anchor and outcomes do not read as one card with a
  changed label; the record starts under the return rail, not centred, with no spacer / dead space; a Death renders zero
  result-data rows and no reserved space and ends on its summary; its message plate is separable from the background in the
  runtime screenshot at 360 / 390 / 412, including over the character art (a background value present in the DOM is not a PASS on
  its own), with none of the owner's banned treatments (quotation marks, tail, bubble ground, accent bar / stripe, border, icon,
  glow / blur, paper)
- NIGHT dock: the last result advances with `마감으로`, intermediate results with `다음`; the closing-handover control reads
  immediately as the ACTIVE Primary Action, visibly above `전체 건너뛰기` and separated from the NIGHT surface - a moonlit cold
  blue / muted cobalt plane brighter and more saturated than the NIGHT dock and background, unmistakably blue (not cyan /
  teal, not neon), ivory / near-white label, exactly one hard bottom/right depth the press collapses. FAIL: flat grey
  dead-button impression, grey disabled-like plane, purple / lavender, green, amber, gold, mustard, brown, heavy outline,
  inset frame, glossy or bevelled treatment
- an equipment Stat bonus reads `투력 +N`, never `전투 +N`, with the equipment identity visually separated from the Stat effect
- the MORNING shutter pull carries no repeating-stripe gradient; the register readout glow and the SALE sticky scrim stay as
  functional layers
- FINAL roster header owns the selection count (`선택 N명 · 최대 M명`); the disabled dock stays `원정대 확정` and does not
  duplicate that count
- SALE price modes read as peer register keys; no key is promoted by a stronger frame; refused keys lose depth; the
  send-customer action stays Secondary
- CLOSING stays a receipt / settlement record, not a grid of KPI cards
- D5 / D15 / D25 Boss art has central presence without displacing required information; D10 / D20 stay compact
- FINAL reads as one final decision surface; its commit is heavy but not an ornamental giant button

PER-PHASE APPLICATION FAIL:
- ORDER / SALE game feel is created by outlining every key
- SALE semantic mode colour is moved onto three decorative borders when the key labels already carry the distinction
- NIGHT / CLOSING are still generic cards with only copy changed
- Boss presence is solved by tiny art in dead space or oversized art that hides the reveal
- FINAL is still an ordinary page with a differently coloured submit button

STORE SUPPORT PASS:
- AVAILABLE / SELECTED / UNAVAILABLE are distinguishable at a glance by more than colour alone; no green UI accent for Store
  Support selection / ownership / action / success state
- AVAILABLE owns the strongest controlled-pop action and is the only state that looks pressable
- SELECTED stays in the same base material family with multiple completion cues and no generic success-colour flood; when card
  height is unchanged, `보유 중` keeps the AVAILABLE control's footprint but loses press depth and hover / active affordance
- UNAVAILABLE recedes while all required copy stays readable; `선택 종료` / `골드 부족` or the current approved equivalent names
  the disabled cause rather than leaving a dead `구매`
- no vertical selected strip, decorative seal, shiny metal, gradient, blurred glow or heavy bevel

STORE SUPPORT FAIL:
- selected / owned is represented by green; state distinction rests on one border alone
- `보유 중` shrinks into a web-style status chip while the card keeps its full height
- unavailable action still looks pressable
- the card/action palette is so uniformly dull that the screen reads as an admin tool rather than a game decision
- exact implementation colour values are promoted back into Canonical without a new User decision

#### UI-Q-v28-25 — TARGETED GRAPHIC POLISH

For each art/icon/crop/scale asset changed under the polish pass, PASS: the object still reads as its canonical identity; two
distinct gameplay objects are not made visually identical; no crop hides decision-relevant information; no decorative layer
implies a false mechanic/state; mobile and desktop render without overflow or obscuring the primary action.
This QA does not authorize a new Item wave, portrait wave, environment set or theme system.

### FUNCTIONAL LAYOUT / MOBILE / ACCESSIBILITY

#### UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT

Runtime UX QA, not Source/CSS inspection alone. Viewports at minimum: phone 360, 390 and 412 class widths; desktop the 1024
breakpoint and a representative 1280-class width.
Traverse: opening / pre-Run / Store Management, MORNING, ORDER, SALE, NIGHT, CLOSING, Boss-information beats, Final
preparation / FINAL / ending, Help / Settings / Event / Store Support and other active modal/overlay surfaces.

Record PASS/FAIL per surface:
- current information priority is visually obvious; required comparison information appears before the decision that uses it
- primary action is visible/reachable without unrelated content dominating the path
- no horizontal overflow; no fixed header/dock/modal covers decision information
- no avoidable blank/dead region from grid/flex track stretching or oversized wrappers
- no duplicated label/count/explanation competes with the same fact elsewhere on the surface
- transient content does not reserve permanent empty height after it disappears
- responsive reordering preserves the information -> comparison -> action sequence
- desktop is not a stretched phone layout with excessive empty width/height; compact mobile does not hide required
  information merely to fit

A visual defect that materially weakens the current decision is a FAIL even when every DOM node is present.
Do not fix a FAIL by deleting information another current Spec requires; escalate a required-rule conflict to the owning
Design document.

#### UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY

Across ORDER / SALE / NIGHT / CLOSING / Store Management / FINAL and active modals, PASS:
- primary, secondary and destructive actions have correct relative emphasis
- selected / disabled / completed states are distinguishable without color alone; touch targets stay usable on phone
- keyboard focus order follows the visible interaction order; modal close returns focus to a meaningful origin
- redraw after quantity/selection/price/detail interaction preserves useful scroll/focus context
- action feedback appears near the action/result it explains
- the same concept uses consistent visual semantics across phases
- no new panel/modal is introduced when an existing surface can express the same information

This QA may catch functional layout defects not covered by another QA item.

#### UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
Capture actual browser screenshots at 360px, 390px, 430px for Morning, Order, Sale, Night, Closing, Relic reveal, Final prep.
EXPECT: core text readable without zoom; unnecessary side gutter minimized; current decision/action clear in the first
viewport; game art/object does not push decision information excessively downward; layout recomposed, not shrunken desktop;
sticky action/safe area reachable.
PASS: all three widths are practically playable and do not feel like a tiny desktop page.

#### UI-Q22 — TOUCH TARGETS
PASS: practical ~44px-class targets on mobile for +/-, price, confirm, next, reroll, item/customer selection; no dense tiny tap
zones.

#### UI-Q23 — SAFE AREA
Mobile browser with top/bottom chrome and safe-area devices.
PASS: header, sticky footer and primary action are not clipped; controls stay reachable.

#### UI-Q24 — COLOR-INDEPENDENT SIGNAL
Inspect Trait effect lines, preparedness, selected, disabled states.
PASS: Trait benefit/cost meaning is not inferred from color alone and the wording stays clear without color;
preparedness/selected/disabled also have text/icon/shape reinforcement; Trait header color is not a hidden quality grade.

### MORNING

#### UI-Q03 — MORNING HIERARCHY
Open Morning on Event and non-Event Days.
EXPECT: non-Event Day - visitor forecast / Gate / known Hazard quickly readable. Event Day - the Event gets a focused opening
reveal before Gate detail; title and actual effect understandable immediately; after confirmation the normal Morning Situation
shows the Event-modified state; no separate EVENT Phase.
PASS: today's situation is understandable and a meaningful Event is not buried among ordinary cards.

#### UI-Q101 / UI-Q09 — NEXT-DAY FORECAST — RETIRED

No next-day Gate-count or Tier forecast at MORNING or ORDER; FAIL if any next-day block, percentage or count appears. The
individual-customer boundary (name, Job, Trait, Wallet, destination hidden; per-Gate visitor count public) is checked by
UI-Q-v29-14 / ORD-Q84.

#### UI-Q-v29-20 — ORDER ROW RARITY LINE / BLOCKED-QUANTITY REASON

PASS:
- every offer row shows `{category} · {rarity}` in one small line under the Item name, the rarity word in its rarity colour,
  no horizontal overflow at 360
- every SALE shelf row and the tray carry the category tag; the tray tile's edge is the same rarity colour as its shelf row
- an offer whose whole supply was already ordered today shows the `품절` stamp under its metadata line and no quantity controls;
  its name, effects and prices are not greyed
- tapping a `+ / 1 / 3 / 최대` blocked by Gold shows `발주 자금이 부족합니다. {N}G 부족.`; blocked by warehouse space
  `창고 칸이 부족합니다.`; an offer whose whole supply for today is already in the cart `오늘 공급 최대 수량입니다.` (COPY_AUDIT §3-9)
- the dim look of a blocked control is unchanged; a supply-exhausted control stays non-interactive except for that toast
- no `내일` block on ORDER

### ORDER

#### UI-Q04 — ORDER SCENE
PASS: no convenience-store scene dominates Order; management information is primary.

#### UI-Q05 — ORDER FUNDS
Change order quantities. PASS: current Gold, selected spend and Gold after order stay persistent, visible and correct.

#### UI-Q06 — ORDER OFFERS
Mobile/desktop Order with the base offer count, then with any authoritative offer-count modifier.
EXPECT: base count=6; modified counts may exceed 6; the list stays compact and scannable.
PASS: UI supports the actual offer count without excessive card height or unnecessary scrolling.

#### UI-Q07 — ORDER PRIMARY ACTION
Select order items. PASS: the confirm action is obvious and sticky/accessible; the Player does not scroll back to find it.

#### UI-Q08 — REROLL VISIBILITY
Order with and without `발주 교환권`; Reroll repeatedly.
EXPECT: the control clearly means Full-offer Reroll; the current cost is easy to find before use; with `발주 교환권` the first
daily cost is visibly 0G; after use the next same-Day cost updates to the next normal step.
PASS: no hidden/ambiguous Reroll scope, free-use state or current cost.

#### UI-Q61 — ORDER ACTION SPLIT
EXPECT: sticky/obvious `발주 확정` when a cart exists; after confirm ORDER remains; a separate `영업 시작` action exists.
PASS: one button/action is not responsible for both purchase and phase transition.

#### UI-Q62 — ORDER REROLL WITH SELECTION
EXPECT: Reroll enabled with unconfirmed selected quantity when affordable; clear indication that the whole Offer set is
replaced; no instruction requiring a quantity reset to zero.

#### UI-Q63 — ORDER DECISION INFO
EXPECT readable before commitment: shelf life, current Gold, selected spend, after-order Gold, today expected operating cost,
warehouse usage/remaining, current Reroll cost.

#### UI-Q64 — ORDER SCROLL / FOCUS
Mobile + desktop: +/-, 0 return, confirm, Reroll, re-confirm.
PASS: the current offer location does not jump to top; practical focus preserved where possible.

#### UI-Q81 — ORDER ITEM HIERARCHY
Desktop/mobile offers. PASS:
- Item identity and exact effect read before economy metadata; exact Stat/Counter/`피로 회복 N`/penalty values readable
- no redundant role chip such as `속박 전문` above `속박 대응 +16`
- no today-fit/recommended badge or verdict word, no emphasized effect text, no automatic best-fit ranking

#### UI-Q82 — ORDER WAREHOUSE COLLAPSE
Mobile: the capacity summary stays visible; the individual stock list can collapse/expand; used/remaining capacity is not
hidden by collapse; the ORDER-session open/closed state stays stable through ordinary rerenders.

### SALE — LAYOUT / CUSTOMER

#### UI-Q10 — SALE STORE PRIORITY
PASS: in Sale the store/customer is the visual focus; secondary cards do not overpower the NPC decision.

#### UI-Q11 — SALE NPC MOBILE STACK
Narrow mobile viewport. EXPECT: NPC info stacks vertically - identity/job, destination, stats, traits, condition, bag.
PASS: no tiny compressed multi-column block.

#### UI-Q65 — SALE DESKTOP HIERARCHY
EXPECT: Character / Portrait left; enlarged Bag; upper-right Core Decision area holds Forecast + Expected Destination; NPC
Wallet visible in the Core Decision hierarchy; no duplicate lower destination/forecast panel.

#### UI-Q66 — SALE MOBILE HIERARCHY
EXPECT: compact Character/status footprint without artwork crop; enlarged Bag with no overlap/overflow; compact destination;
core environment visible without tap; Forecast in the decision flow; no duplicated environment/forecast information.

#### UI-Q109 — MOBILE SALE PLAYABILITY

Real browser at 360 / 390 / 412 phone widths (→ UI_UX §MOBILE SALE PLAYABILITY).

PASS:
- upper customer/decision summary occupies about half or less of usable SALE height
- Item / price / transaction surface receives at least about half
- shelf heading and at least one selectable Item row are visible at initial SALE entry without a scroll
- character art is contained, not cropped or stretched
- character and right-side information align without fixed-height overflow
- Bag is exactly two slots in the upper-right, each ~44px touch class or larger
- no required SALE decision information disappears to achieve the compact layout
- fixed bottom dock stays reachable and does not cover the sale surface

FAIL:
- product selection stays pushed below an oversized character presentation
- a short phone clips/overlaps the upper block
- any desktop-only duplicate becomes the visible tutorial target on phone

Bag slot size is a documental baseline: ~44px is the shipped value and may move with the layout while the slots stay a real
touch target.

##### CONFIRMED PLACEMENT — ENVIRONMENT READINESS

The destination block in the counter band keeps what is true of the place: the Gate, its Hazards and the ability each Hazard
presses on. This customer's readiness against it reads in the forecast as `환경 대응` beside `전투 전망` (the readout's only two
cells), off the same frozen SALE-entry snapshot; the environment is stated once, and its help sits with it.

PASS:
- the destination block states Hazard pressure only
- `환경 대응` is on screen at most once at a time: in the forecast, or — only while the forecast is scrolled out of view on a
  phone — in the forecast pin that mirrors it (UI-Q-v29-24)
- per-Hazard readiness does not wrap the destination rows or pull a row for its own help
- on a two-Hazard Gate (T2 on) `환경 대응` names each Hazard with its own frozen state, in the readout and in the forecast pin; a
  one-Hazard Gate reads one label; the readout `.top` and the pin stay two lines tall with the label on one line, and no row
  overflows or collides at 360 / 390 / 412 / 1024 / 1280

#### UI-Q-SALE-QUEUE-GATE-COUNT — ON-DEMAND ORDER GATE COUNTS (User approved 2026-10-09)

- In SALE on desktop, hover/focus the existing bottom `손님` queue area: a floating popover shows, per open Gate, the customers left counting the one at the counter (ORDER's claimed-Gate source; the first customer's figures sum to ORDER's total). Mobile: tapping the same existing queue/pips area opens/closes it; outside tap / Escape dismisses; no new UI cue, height, permanent text, scroll jump or dock/button overlap at 360/390/430 or short-phone widths.
- Sending a customer lowers their claimed Gate's count by one. No future-NPC Job, wallet, needs or actual reroute is disclosed beyond what the remaining claimed-Gate counts imply. Popover and coach never make a recommendation.
- Account first-use coach spotlights the actual queue target, can be completed/skipped, stays complete across new Runs, and returns after Full Data Reset; existing first-day SALE mandatory coach sequence is not silently extended. No changes to next-customer progression, purchase, balance, Save/RNG or keyboard navigation.

#### UI-Q-v28-3 — MOBILE SALE QUEUE
At mobile width: no decorative waiting-line/fan/next-customer card; the bottom Dock keeps one queue progress: the label `손님` beside the pips, the count `{n} / {N}` as the pips' screen-reader label only (User 2026-10-03); no
duplicate queue count consumes vertical space. Desktop may show a richer queue presentation.

#### UI-Q-v28-4 — CURRENT CUSTOMER STATE
Mobile SALE exposes compact Injury (without a duplicate numeric 부상 1), Fatigue and Loyalty; Trusted Regular state appears at 51.
PASS:
- no separate Loyalty `?` / popover trigger in normal SALE; Loyalty meaning is taught by tutorial/coach
- Equipment text is absent from the compact top state and reachable through NPC detail / proven Stat source where applicable
- Bag stays exactly 2 slots, horizontal at mobile width (the whole Bag block may wrap down; the slots do not stack vertically)
- no horizontal overflow

#### UI-Q110 — TRANSIENT CUSTOMER SPEECH
PASS:
- speech is overlay/presentation and reserves no permanent layout height
- a new line appears; a greeting auto-hides after 3 seconds, a purchase / refusal reply line after 5 seconds; tapping hides
  it immediately; a new line restarts its own display
- the same unchanged line does not reappear merely because SALE rerendered
- no Save/account schema is added for speech visibility

#### UI-Q67 — NPC WALLET VISIBILITY
Before choosing a price the Player sees the NPC's current wallet beside the selected sale price.
PASS: affordability can be judged without opening a secondary modal.

#### UI-Q-v28-11 — LOYALTY HELP
Normal SALE shows a compact Loyalty value/state and no dedicated Loyalty `?` / anchored popover trigger. Tutorial/coach explains
purchase-intent and revisit meaning, says 51 = 단골, and leaks no unrevealed Boss-specific information. Global compact Help
stays under its copy owner; it is not a second contextual SALE tooltip.

#### UI-Q-v28-12 — EVENT TEMP BUDGET
On 길드 급여일: persistent Wallet and temporary purchase budget are distinguishable; affordability uses both; the UI does not
imply the temporary budget persists.

#### UI-Q29 — RETURNING NPC DELTA VISIBILITY
Revisit an NPC after meaningful growth/injury/recovery/expedition history change.
EXPECT: the since-last-visit change is immediately noticeable while the full current profile stays accessible.
PASS: the Player does not reread the entire unchanged profile to understand what changed.

#### UI-Q90 — RETURNING NPC LAST BAG
Returning customer with snapshot. PASS:
- compact `지난 원정 · DAY X · 결과 · [item] [item]` on a desk; not shown on phone, where the NPC detail 원정 기록 holds it
- exact actually accepted items only; empty slot preserved
- mobile Wallet/Destination/Forecast hierarchy not displaced
- expanded causal text only from proven tokens

#### UI-Q91 — QUEUE UNCERTAINTY
PASS: future customer Job/Level/individual Destination/preparation need/importance is not newly revealed; the per-Gate visitor
count of the ORDER 오늘 line (UI-Q-v29-13) is not a reveal. Existing authorized queue-count info may remain.

#### UI-Q68 — SALE SCROLL / FOCUS
Within one Customer: item select, price panel open/close, purchase success, refusal + reselection, detail/accordion open/close.
PASS: the viewed position stays stable. A new Customer may intentionally reset to top.

#### UI-Q74 — NEXT PORTRAIT PRELOAD
Real mobile transition to the next Customer. PASS: the next portrait is preloaded through a minimal browser preload path; no
visible blank/loading regression.

#### UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE
PASS: ORDER and SALE each expose compact access to currently owned 점포지원 before commitment; both reuse the existing
owned-Relic truth/detail surface; no duplicate Relic-effect store; the controls do not crowd the primary phone decision surface.

### SALE — ITEM / TRANSACTION

#### UI-Q12 — INVENTORY REACHABILITY
Sale with many items. PASS: all sellable inventory can be reached/compared; no item is hidden by the consumer-slot UI.

#### UI-Q13 — PRICE BUTTONS
Sale on mobile. EXPECT: the three price buttons `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G` are visually
distinct, large enough and easy to switch. PASS: no mis-tap-prone tiny buttons.

#### UI-Q25 — ITEM DECISION INFO
Order/Sale item comparison. EXPECT: effect, relevant Counter, explicit penalty and price are visible.
PASS: a basic choice does not require encyclopedia hopping.

#### UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
Process a Customer through multiple Consumer Slots including a purchase/refusal that can change the next-slot choice.
EXPECT: Inspect -> Item -> price -> result -> remaining-slot decision is continuous, with no unnecessary modal/page round trip or
redundant routine confirmation.
PASS: interaction cost is reduced without batching away the sequential decision.

#### UI-Q87 — TWO-SLOT HANDLING
All ordinary NPC levels. PASS: exactly two visible Bag slots, in the customer-state strip beside the status line; each mobile
target ~44px class; focus/replace/remove state clear; tap-only completion works; drag not required; no third ghost slot.

#### UI-Q88 — SEQUENTIAL TRANSACTION
Within one ordinary customer the first slot transaction resolves purchase/refusal, state updates, and the remaining slot stays
a new decision.
FAIL: two-slot cart checkout; both items committed atomically as one bundle.

#### UI-Q100 — SALE REFUSAL PRICE CEILING

Controlled same ordinary customer + same SKU visit (→ UI_UX §SALE — REFUSAL PRICE CEILING UI).
- Case A, refuse at 50% - PASS: 100% and 150% controls become disabled and non-interactive for that SKU; the reason is readable;
  a lower-price refusal does not trigger a new higher-price acceptance roll
- Case B, refuse at 100% - PASS: 150% disabled; 50% may stay usable
- Case C, refuse at 150% - PASS: 100% / 50% may stay usable

Isolation PASS: unrelated SKU price controls are unaffected; a new customer visit does not inherit the previous visit lock unless
another owner defines it; Final preparation shows no refusal-price ceiling UI (no refusal roll, no 100/150 modes).

#### UI-Q102 — SALE NON-DECISION DETAIL REMOVAL
PASS: `이 손님에게 안 걸리는 효과` and the flavor-only `상품 설명` disclosure are absent from the SALE decision surface; exact
actionable Item effects stay readable; no replacement accordion/modal is added for the removed flavor.
FAIL: a disclosure control visually implies strategic information but opens only flavor text.

#### UI-Q-v28-15 — SALE COPY DENSITY
Selected Item: one heading \`판매 후 변화\`; no \`이 상품이 직접\`; no \`보급이 상태에 미치는 영향\`;
no \`이 손님에게는 지금 걸리지 않는 효과\`; conditional non-delta Item truth may appear under \`특수 효과\`;
no permanent forecast explanation paragraph. Exact forecast help is available through the anchored popover.

#### UI-Q-v29-3 — TRANSACTION BEAT

One ordinary SALE customer at 390 and 1280: one successful price commit, one refusal, one `손님 보내기`; repeat under
`prefers-reduced-motion` (→ UI_UX §SALE — TRANSACTION RESULT STUB, PRESENTATION beat contract).
EXPECT: every beat is presentation only, each ≤ 320 ms, one sale's beats total < 600 ms, input is never blocked, the scroll
position stays on the same customer.

PASS:
- frame captures at 0 / 150 / 300 / 600 ms show the Item icon travelling from the counter tray to the customer's Bag slot in the
  customer-state strip (260~320 ms), the slot settling (scale 1.05 -> 1, 240 ms), the dock Gold counting to its new value, and
  the changed Stat cells pulsing once (300 ms) and keeping the new value; the `판매 후 변화` rows do not vanish
- purchase: the figure nods (translateY 4px, 180 ms x 2); refusal: it shakes its head (translateX ±4px, the bubble-shake timing)
  and the refused price button shakes once and locks with the `오늘 거절됨` / `더 싼 값을 거절함` / `바가지를 거절함` text
- the reply line (buy / refuse) stays 5 seconds; the greeting 3 seconds
- `손님 보내기`: the current customer exits left (240 ms), the next arrives with the entry (240~340 ms), `depart` plays a recorded
  utility cue (door / step family); entry may start the view at the top
- 50% / 100% / 150% share one register sound family and differ only by coin ticks (1 / 2 / 3); no mode sounds like the correct
  answer
- under reduced motion the same flow completes instantly with an identical end state (Gold, Bag, Stat values, lock state, reply
  line)
- no beat adds information the resolved state does not hold; no Save field, no Gameplay RNG draw

FAIL: input is blocked during a beat, or one sale's beats total 600 ms or more; the view scrolls away from the current customer
during a beat.

#### UI-Q-v29-4 — BAG IN THE STRIP
SALE at 360, 390 and 1280, before and after one sale. PASS:
- the two Bag slots stay in the customer-state strip beside the status line at every width, labelled `가방 {n} / {slots}`
- each slot is at least 34px and the Bag reads as the heaviest element of the strip; the hand-over ghost lands on the slot it
  fills
- the slots stay the handling surface: focus / replace / remove and tap-only completion work as in UI-Q87; no third ghost slot
- no horizontal overflow

#### UI-Q-v29-5 — STAT GRID PRESSURE TAG
Customers whose Gate presses one Stat through one Hazard, one Stat through two Hazards, and a Stat the Gate does not press.
PASS:
- no Stat cell carries a Hazard tag, pressed or not

#### UI-Q-v29-6 — MATCHING-EFFECT EMPHASIS — RETIRED

Checked by UI-Q-v29-22. Negative case: a SALE shelf holding an Item that counters one of the customer's Gate Hazards, an Item
that raises a Core Stat one of those Hazards presses, and an Item that does neither.
PASS: no effect text on any SALE row carries an emphasis style, whatever the customer's Gate; no badge, no verdict word, no row
reorder.

#### UI-Q-v29-7 — ONE DELTA LIST
Select a Food/Drink that releases a Fatigue band for a fatigued customer; then an Item that changes a Stat only; commit one of
them; the same Items in the till and in FINAL preparation.
PASS:
- `판매 후 변화` lists only the Item's own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`); no `피로 완화` row and no
  `피로 {A} → 출발 {B}` line anywhere
- no outlook delta row (no `전투 전망 A → B`, no `환경 대응 A → B`) for a selected or a committed Item
- the frozen SALE-entry outlook is not repainted inside the till and never changes for a selected Item (UI-Q86)
- `특수 효과` and the shelf-life line stay
FAIL: an outlook block or outlook delta row appears under the Item; a row appears for a value that did not change.

#### UI-Q-v29-8 — PRICE ROLE WORDS
PASS: the three price buttons read `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`; under each `이익 {N}G`
or the disabled reason; three modes, no extra depth, no fourth control.

#### UI-Q-v29-9 — DEATH % ONLY IN THE 전투 전망 HELP AND NPC DETAIL
PASS:
- the SALE readout `.top` shows exactly two cells, 전투 전망 and 환경 대응, each with its own `?`; no `실패 시 사망 위험` cell and
  no third `?`
- the 전투 전망 `?` shows two lines: the outlook help and `실패 시 사망 위험 {N}%` with the frozen SALE-entry value
- the NPC detail modal shows `실패 시 사망 위험 {N}%`
- the % appears nowhere else on the SALE surface; Final preparation is unchanged (UI-Q-v28-32)

### SALE — FORECAST / PREPARATION INFORMATION

#### UI-Q14 — FORECAST LANGUAGE
EXPECT: Sale forecast Combat 우세/접전/불리; Hazard 취약/불안/대응/충분.
PASS: no exact probability or master score.

#### UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK

Controlled ordinary SALE customer before any Item transaction (→ UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT).

PASS:
- heading is exactly `보급 전 원정 전망`
- qualitative Combat Forecast and Hazard Readiness are shown from the SALE-entry state
- the readout shows exactly two cells, 전투 전망 and 환경 대응; the exact risk label `실패 시 사망 위험` is the second line of the
  전투 전망 `?` (`실패 시 사망 위험 {N}%`) and an NPC detail line, not a readout cell
- the exact pre-supply 실패 시 사망 위험 % in that help line is computed from the same state, clearly conditional on the
  expedition entering a failure path, not an unconditional whole-expedition Death probability
- exact expedition Success probability stays hidden
- after the first and second committed Item transactions the two readout cells and the help-line % stay unchanged on screen;
  post-commit exact Item/effect/source deltas may still update
- actual expedition Resolve uses the final prepared state, not the frozen display snapshot
- a healthy fully prepared controlled state may show 0% 실패 시 사망 위험 when the current formula produces 0
- injured pre-supply 실패 시 사망 위험 includes the canonical +10%p modifier and respects the 40% cap

#### UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK

Select/focus an uncommitted Item.
May show: exact Item effect (a Food/Drink's own `피로 회복 N` row); price/affordability. No `피로 {A} → 출발 {B}` line.
Must not show hypothetical post-Item answers: `접전 -> 우세`, `불안 -> 충분`, 실패 시 사망 위험 `% -> %` change, Great Success
signal change, exact expedition Success probability. The visible exact 실패 시 사망 위험 % is allowed only as the fixed
pre-supply snapshot.

After actual purchase commit, PASS only if:
- displayed Combat Forecast, Hazard Readiness and 실패 시 사망 위험 % stay the original pre-supply snapshot
- exact Item/direct-effect and proven source-attributed numeric changes may update
- no post-commit derived expedition answer is substituted before the remaining-slot decision

#### UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH

Use current `집중 사탕` (`공포 대응 +10 / 피로 회복 2`) in two controlled setups.

##### Case A — no Fatigue band change

PASS: direct effect shows 공포 Counter / 피로 회복 only; 투력/강인함/기동/정신 do not rise; no hidden direct Core-Stat effect is
attributed to 집중 사탕; no `보급 부족 완화` row.

##### Case B — its 피로 회복 releases a Fatigue band

PASS:
- effective Core Stats may rise per the current Fatigue owner (`DUNGEON_HAZARD_v2.8.0.md` bands)
- the band recovery is not listed in `판매 후 변화` and is never attributed to the Item; the UI does not imply 집중 사탕 directly
  grants those Stats; the direct Item effect stays separately readable
- displayed pre-supply Hazard Readiness and 실패 시 사망 위험 stay frozen, not replaced by a new label / percentage

All cases:
- exact post-commit Item/effect/delta rows match runtime preparation truth; direct Item effect and derived system effects are
  not conflated
- the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot stays identified as pre-supply and is not
  replaced by post-commit derived answers
- a generic `판매 후 변화` block is allowed only if those source classes are immediately distinguishable; otherwise the synthetic
  block is removed rather than turning the outlook into a post-commit answer dashboard

#### UI-Q-v28-7 — GREAT SUCCESS SIGNAL
During one customer visit: focusing an Item does not change the signal; a successful committed purchase recomputes it (it may
appear or disappear); the Combat/Hazard readout cells and the help-line Death % stay frozen; exact probability is not exposed.

#### GREAT SUCCESS SIGNAL
PASS: exact copy `대성공을 노려볼 만합니다.` (desk line; phone screen-reader text beside the visible `대성공 기회` tag); visible while
preparation can still change; exact % / margin / formula hidden.

#### UI-Q84 — FOUR CORE STATS REMAIN VISIBLE
The SALE primary decision surface keeps 투력, 강인함, 기동, 정신.
PASS: not moved behind accordion/detail; actual applied source labels stay truthful; calculation breakdown is drill-down detail.

#### UI-Q69 — STAT SOURCE
PASS: changed stat highlighted; only actually applied source names shown; helpful/harmful semantic treatment correct; inactive
source absent; Wallet/purchase intent/revisit not shown as Stat sources; tap detail matches the actual calculation.

#### UI-Q-v28-5 — SEMANTIC DELTA
For changed Stats/Fatigue/economy values: benefit = green, harm = red, unchanged = default; no generic yellow moved-only treatment
as meaning. Color is not the only source cue.

#### UI-Q-v28-6 — SHARED POPOVER
Desktop: hover/focus works and click stays usable. Mobile: tap toggles. All: no layout-height jump; one open at a time;
outside/Escape closes; no gameplay pause/background lock; viewport placement stays readable.

#### UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY
PASS: Item shows exact Stat/Counter/`피로 회복 N` (the tray's Counter row as the Item's own `+N`); the Gate states its public
`대응 {N} 필요`; the readout's 환경 대응 meter shows this customer's committed number against it (User 2026-10-02); the hidden
readiness thresholds (0.75 / 0.40) are never shown.

#### UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER
PASS: detail may show Hazard, pressured Stat, readiness meaning.
FAIL if it exposes a recommended SKU/category, an optimal combination, or an exact hidden Hazard requirement/formula.

#### UI-Q26 — HAZARD NUDGE
Known hazard presentation. EXPECT: Hazard relevance is clear. PASS: the UI does not directly prescribe the exact optimal Item.

#### UI-Q35 — HAZARD EFFECT ACCESS
All authoritative Hazards on PC and mobile.
EXPECT: each Hazard gives its numbered short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; PC hover/focus works where a
tooltip is used; mobile tap/inline gives equivalent information; the current Gate summary surfaces the explanation without
encyclopedia hopping.
PASS: no hover-only or inconsistent Hazard explanation.

#### UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC
Controlled setup with known Fatigue/Supply/Trait.
PASS: the tray's `피로 회복 N` matches the Item's Supply and NIGHT's `출발 {N}` matches runtime fatigueBeforeExpedition; no `피로 {A} → 출발 {B}` line, no required / deficit value is shown; departure Fatigue matches runtime; no
single Outcome is predicted as guaranteed.

#### UI-Q-v28-8 — FATIGUE
SALE: no hypothetical Outcome fatigue matrix; current Fatigue readable in the status strip; a chosen Food/Drink lists its own
`피로 회복 N` row on the counter tray and no `피로 {A} → 출발 {B}` line; no always-on Fatigue line, no `보급 X / 필요 Y` cell.
NIGHT: main label 귀환 후 피로, with ` · {band}` from Fatigue 20 up; detailed path on demand; the recovery rows identify `음식·음료` before departure and after the Outcome,
never `남은 보급으로`; 보급 회복 / 보급 완화 / 밤 피로 absent as primary labels. The daily overlay separates pre-departure recovery, outcome buffer, actual Event/Trait/Decoration causes and clamps, with smaller five-band reference below.

#### UI-Q32 — PLAYER STAT TERMINOLOGY
NPC profile, Item previews, growth/result displays and any stat labels.
EXPECT: Player-facing core stats are consistently 투력, 강인함, 기동, 정신; actual battle/fight wording may still use `전투`;
internal Power/Party Power is not exposed as another player stat.
PASS: no player stat is mislabeled as `전투`.

#### UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
NPCs with positive, mixed and negative internal Traits.
EXPECT: no Player-facing `이점/양면/약점`; no ▲/◆/▼ Trait quality label; each effect line follows authoritative semantic tone
metadata; a mixed Trait can visibly hold both helpful and harmful lines.
PASS: the Player reads effects and makes the judgment.

#### UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
Trigger the destination reliability tutorial, 허세, and 게이트 순례 주간.
EXPECT:
- Tutorial says `이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.` and does not frame 허세 as the whole destination system
- Sale label uses 예상 목적지 where uncertainty is possible
- 게이트 순례 주간 Morning reveal states the 1–3 affected range; actual N / affected identity / changed Gate stay hidden until Night
- Night shows the actual changed count and expected -> actual destination on affected NPC results
PASS: information is uncertain but not unfairly opaque; no extra Event-result phase.

### DEEP EXPEDITION

#### NOMINATION UX
PASS: one NPC maximum; current visitor only; before the first committed transaction; sponsorship exactly once; destination +
forecast update; no cancel/swap; skip has no cost/penalty; future visitor identity stays hidden. Mobile follows the touch /
hierarchy rules.

#### UI-Q-v28-16 — DEEP REPEAT COPY
After the first tutorial: Morning uses the exact two-line repeat copy; SALE nomination uses the exact two-line cost/reward copy;
no duplicate long tutorial paragraph in both places.

### NIGHT

#### UI-Q16 — NIGHT RESULT
EXPECT: one NPC result at a time with the hierarchy what happened -> why -> what changed.
PASS: not a debug log or modifier ledger.

#### UI-Q31 — NIGHT IMPORTANCE WEIGHTING
Compare routine success with meaningful level-up/injury/death/decisive-Item/callback results.
PASS: a routine result is compact, a meaningful result gets stronger emphasis; Night does not force every NPC result to consume
equal presentation time.

#### UI-Q70 — NIGHT CONTROLS
EXPECT exactly `다음` and `전체 건너뛰기`. PASS: no single `건너뛰기`; no active `nightSkip` UI reference.

#### UI-Q92 — NIGHT RESULT TRUTH
PASS: actual Food/Drink preRecovery/outcome buffer use can be read when relevant; final Fatigue matches runtime; First Aid
Aftercare shown only if it actually changed persistent Injury state; no invented `전투 부족` / `독 대응 부족` diagnosis;
`다음 / 전체 건너뛰기` controls exact.

#### UI-Q-v28-9 — NIGHT REACTION
Living result: a temporary character speech bubble appears, auto-dismisses around 3 seconds, tap dismiss works, the result
information stays, the bubble does not cover the Outcome; reaction priority is avoided death / rescue -> severe injury -> injury
-> retreat -> growth -> ordinary return; Bag / supplied-Item presence alone never selects the reaction category.
Death: no living speech bubble; narration/report treatment only.

#### UI-Q-v28-23 — NIGHT RESULT PRESENTATION
With controlled NIGHT result fixtures, materially different states are visibly/audibly distinguishable at minimum for ordinary
return / success, Great Success, retreat, injury, severe injury, Death. A distinct rescue / avoided-death accent may appear only
from that proven state.
PASS: presentation reads the already-resolved Outcome; no presentation branch mutates Outcome, reward, Fatigue, proof, Wallet or
Store Gold; Death has no living NPC speech bubble; primary result information stays readable on mobile.

#### UI-Q-v29-39 — ORDER PRICE TAGS

→ UI_UX §ORDER — ITEM INFORMATION HIERARCHY; COPY_AUDIT §4-26.

PASS:
- every offer row shows two tags at the end of the name row: `매입 {N}G` (the offer's price, including today's Event multiplier)
  and, under it, a smaller muted `판매 {N}G`; at 360 / 390 / 1280 neither clips, overlaps the name or leaves the paper
- the metadata line starts `수익 +{N}G` and carries no `매입`; the ORDER total, the cart and the purchase are unchanged
- the 본사 1+1 행사 offer carries a red `1+1` sticker on its `매입` tag corner, readable at 360 / 390 / 1280 without covering the
  price; no other offer carries it; the metadata line has no `1+1`

FAIL: an unlabelled price, the sale price in the larger tag, or `매입` still in the metadata line; the 1+1 offer told apart only
by text inside the metadata line.

#### UI-Q-v29-38 — SALE STRAIN LINE

→ UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT; COPY_AUDIT §4-25. Runtime: `node tools/qa-strain-line.cjs` (in qa:runtime).

PASS:
- a customer departing injured with an injured-departure chain of {n} >= 1 shows `연속 부상 출발 {n}회` once inside the 전투 전망
  box (390: chip beside the word; 1280: line under it), with the same {n} as the NPC detail row
- at 390, with the readout scrolled out of view, the forecast pin shows the same words at the bottom right of its strip for the chain case
  and none for the healthy and first-injured cases (UI-Q-v29-24)
- a healthy customer (whatever chain their records hold) and an injured customer with no chain show no line
- the readout `.top` still shows exactly the two cells; the line is small and muted, one line, no `?`

FAIL: a %, a verdict word, a second line, a `?`, or the line on a healthy or first-injured customer.

#### UI-Q-v29-37 — REPLAY NUDGE

→ UI_UX §END — REPLAY NUDGE / §Pre-Run Decoration empty-slot interaction; META §BEST DAY.
PASS, in priority order, at most one line, never beside `본사 해금`, the same line after a reload of the ended Run:
- a first-on-account D10 / D14 product unlock is listed in `본사 해금` beside any distinct-Boss unlock; the Day toast still fires
  once; a later Run reaching D10 again lists nothing
- else a settlement crossing an unowned Decoration's price prints `점포 자본으로 새 장식을 들일 수 있다.` (nothing if capital was
  already above it or the Decoration is owned)
- else beating the account's best Day prints `지금까지 가장 오래 버틴 점포다 · DAY {N}`
- else beating the best 총매출 prints `지금까지 가장 많이 판 점포다 · 총매출 {N}G`, N the tape's own `총매출`; beating both prints
  the best Day line
- a tie, the account's first ending and a manual 현재 지점 포기 print no record line, and an abandon never moves either record
- 새 점포 준비: exactly the Slot places with an affordable unowned Decoration carry `들일 수 있음`
- no new motion, sound, screen or button
FAIL: a Decoration named, a list of goals, a remaining-count, a second line, a line on an abandoned Run, or a mark on a Slot whose
unowned Decorations cost more than the capital.

#### UI-Q-v29-36 — BUILD MARKER

PASS (→ UI_UX §BUILD MARKER): the opening screen shows `v{version} · {commit}` small and muted top-left at 360 / 390 / 1280, clear
of the title, the menu button and the preparation board; 설정 ends with the same pair before and during a Run, no other screen
shows it; the console prints `GUILD24 v{version} · {commit}` once on load and `Guild24.build` returns the same pair; the deployed
site reads the deployed commit, a local build `dev`; an exported save carries `build` with the same pair and loads with or
without it.
FAIL: the marker overlapping or pushing the title, taking input, or appearing on a Run screen other than 설정; a deployed
build reading `dev`.

#### UI-Q-v29-45 — SALE SHELF LIP AND HEAD

SETUP: a mid-Run SALE (Day 5+, six or more kinds on the shelf) at 360x640, 390x664, 390x844, 412x915 and 1280x880.
PASS: shelf rows and head match → UI_UX §SALE — SHELF LIP / §SALE — SHELF HEAD (thin (2 px) board edge, row height and type unchanged;
compact framed 점포지원 plate with a ~44 px touch target); the room the shelf gets above the tray / dock is at least 132 / 145 /
325 / 394 / 335 px at those five sizes.
FAIL: a row turned to wood, a taller row, or less shelf room at any size.

#### UI-Q-v29-44 — PRIMARY ACTION GRAMMAR

SETUP: the dock Action of 새 점포 준비, MORNING, ORDER (both `영업 시작` and `발주 확정`), SALE, NIGHT, CLOSING, END and FINAL
(party not yet chosen) at 360x640, 390x844 and 1280x880; each held pressed.

PASS:
- per → UI_UX §PRIMARY ACTION GRAMMAR: equal right and down depth - 5 px for 첫 점포지원 고르기 / 다음 날 / 다음 점포 열기 / the
  gate bar, 4 px for 문 열기 / 영업 시작 / 발주 확정 / 다음 (3 px for ORDER's phone row), 3 px for 손님 보내기; heights 56 px (phone) /
  60 px (desk) inside the Day (ORDER's phone row 48 px, SALE 손님 보내기 44 px on a phone), 64 / 72 px across a boundary, 첫 점포지원 고르기 64 px everywhere; inside the Day a 3 px lit top edge, a 4 px deep foot and
  no outline (NIGHT flat), labels on a 2 px drop; each Phase keeps its own face (wood / steel on paper with a frost edge / counter
  key / muted cobalt / BRICK / gate bar); `영업 시작` and `발주 확정` share the steel face and frost edge; `첫 점포지원 고르기`,
  `다음 날` and `다음 점포 열기` the same BRICK build (only the rivets differ)
- the cast is drawn: in the screenshot the pixels just right of and under the face differ from the same spot with the Action
  hidden, and nothing past the depth does; held, the face moves right and down by its depth less 1 px and the 1 px cast left is
  drawn; a disabled `영업 시작` casts nothing
- no label wraps or is cut at 360 (a four-digit `발주 N G · 확정` included)
- pressing `첫 점포지원 고르기` plays `begin` and `다음 점포 열기` plays `newstore`, neither the navigation click

FAIL: a straight-down cast or press, a cast declared in the style but not on screen, a press that leaves no cast or moves by a
different amount than the cast, a height or depth off its step, an outline around a step inside the Day, or two Phases whose
Action looks the same.

#### UI-Q-v29-43 — SALE PHONE OUTLOOK PLATE

SETUP: a mid-Run SALE (Day 5+, six or more kinds on the shelf) at 360x640, 390x664, 390x844, 412x915 and 1280x880.
PASS: on a phone the outlook line and the four Core Stats share one recessed plate (→ UI_UX §SALE — MOBILE AUTHORITY); every `?`
still opens its note in place and each Stat row keeps its height; the shelf room above the tray / dock is at least 76 / 89 / 269 /
338 px at the four phone sizes; the desk layout is unchanged.
FAIL: a second box around either part, a dropped or reordered line, or less shelf room at any phone size.

#### UI-Q-v29-42 — NEW STORE PREPARATION STORE SCENE

SETUP: no Decoration, and four Decorations owned with two equipped, at 360x640, 360x740, 375x667, 390x664, 390x844, 412x915,
430x740, 768x1024, 900x700, 1023x768, 1024x768, 1280x700, 1280x720, 1366x680, 1280x800, 1280x880 and 1920x1080; the ending ->
`다음 점포 열기`; a place -> 점포 장식 -> back. Runtime check `tools/qa-prep-scene.cjs`, part of `qa:runtime`.

PASS:
- the scene matches → UI_UX §NEW STORE PREPARATION — STORE SCENE (no preparation panel: the store room, logo, branch plate, the
  `새 점포 준비` board, four Slot places, the Capital plate and `첫 점포지원 고르기`; with no Run no way back; from the ending
  `결과 다시 보기` returns to the ending with the Run unchanged)
- every place is a control of at least 44 px that opens 점포 장식 on its Slot, and the way back returns to the scene
- nothing overlaps another element or leaves the stage (not only the window); no page error; the board at least 6 px above the
  places, the Capital plate at least 6 px above the Action; on a taller or wider stage (390x844, 768x1024, 1366x680, 1920x1080)
  tags and plates keep their 360x640 share of the stage

FAIL: a preparation panel, a place that is not a control, a tag cut off or covering something, the Capital shown in the till, or
the ended Run changed before `첫 점포지원 고르기`.

#### UI-Q-v29-41 — OPENING TITLE LOGO

PASS: at 360x640 / 360x740 / 375x667 / 390x664 / 390x844 / 1280x880 the logo title matches → UI_UX §OPENING TITLE LOGO - whole,
centred, crisp, clear of the build marker and the menu button, the branch plate fully visible under it (UI-Q-v29-42); the `h1`
reads `던전 앞 편의점` to a screen reader; the 점 받침 reads as ㅁ at the phone size.
FAIL: the title rendered as text, a cropped or stretched logo, the logo covered, or a missing file.

#### UI-Q-v29-40 — LIVE STORE DECORATION SEATING

SETUP: each Decoration set equipped (sponsorSign / honorFrame / thriftSafe / guildShelf, and trainingSign / infirmaryPlaque /
memorialBook / aidCabinet), first MORNING, reduced motion, at 360x640, 360x740, 375x667, 390x664, 390x844, 412x915, 430x740,
768x1024, 820x1180, 900x700, 1023x768, 1024x768, 1280x880 and 1920x1080 (the tall file up to 820 wide, the wide file from
900x700 on). Runtime harness `tools/qa-deco-seating.cjs`, part of `qa:runtime`.

PASS (→ UI_UX §LIVE STORE DECORATION SEATING), under the crop each size produces:
- the till housing's feet on the painted counter top (the file's 74.2~76.2% tall, 82.7~85.5% wide)
- all four pieces drawn; 간판 and 벽면 within 1 px of their painted point (the 간판 shift rule as the owner states); 진열대 and
  계산대 feet within 1 px of the till housing's base line, at least the gap (6 px phone, 10 px desk) from it
- no piece overlapping the till housing, its label, the DAY sign, the board, the branch plate, the dock or another piece; every
  piece on screen; the branch plate at least 6 px clear of the dock Action and under a counter piece it sits below

FAIL: a piece on the housing or its label, standing on another line than the housing, or placed off its painted point when the
painting is cropped at the top and bottom; the 간판 touching the DAY sign; the till housing above or below the painted counter;
the branch plate on the dock Action.

#### UI-Q-v29-35 — BOSS REVEAL AFTER MORNING LANDS

SETUP: DAY 0 첫 점포지원 -> 구매 -> DAY 1 MORNING at 390 and 1280, motion on and reduced motion; frames at 120 ms and 600 ms
after the press (→ UI_UX §BOSS REVEAL — MORNING LANDS FIRST).
PASS:
- motion on: at 120 ms MORNING is on screen with no modal; by 600 ms the `마왕 조사 개시` dossier is open, risen into place with its
  art after a 200 ms hold (on a cold phone network a reveal carrying the Boss's art may wait up to 1.2 s more); reduced motion: the dossier is open at 120 ms
- the dossier, its copy and its `확인` are unchanged; after `확인` the Day continues as usual; no Event or Relic window opens during
  the hold; MORNING takes no input during the hold (a tap on `문 열기` or the menu does nothing; still MORNING when it opens)
FAIL: the dossier opening in the same frame as the MORNING cut with motion on, a hold under reduced motion, a lost or repeated
reveal, a Day that advances during the hold, or any new motion, sound or copy.

#### UI-Q-v29-34 — FINAL BOSS REVEAL ENTRY

SETUP: D29's CLOSING receipt through to D30's FINAL screen (the real `다음 날` press) at 390 and 1280, motion on and reduced motion;
frames through the entry.
PASS: the `.gate-zero` boss art and name plate settle in together as one movement (→ UI_UX §FINAL — BOSS REVEAL ENTRY): translateY 10px -> 0, opacity 0 -> 1, 220 ms, outQuad;
nothing else moves (threat board, last-order form, dock); no new sound or copy; under reduced motion the block is present at full
opacity with no motion and the end state matches the motion-on settled state exactly.
FAIL: a staggered or multi-part reveal, any motion outside `.gate-zero`, a hold before the movement starts, a new sound or line,
or a settled end state that differs between motion and reduced motion.

#### UI-Q-v29-33 — CLOSING RECEIPT STAMP

SETUP: CLOSING at 390 and 1280, motion on and reduced motion, one Day ending in profit and one in loss; `마감으로` -> receipt
printing -> `다음 날`; the END settlement (`점포 자본 정산`) on an account whose prior Store Capital sits below at least one
Decoration price and a Run that carries it past one or more; frames through the stamp landing and the settlement count.
PASS (→ UI_UX §CLOSING — RECEIPT STAMP): all receipt rows are on screen together within 200 ms behind one printer tick, nothing row by
row; only the `보유 골드` figure (the purse box) stamps - 100 ms hold, the NIGHT stamp's 90 ms fall, the tape gives 4 px and settles; `영업 손익` green on a profit, red on a loss, gold at 0, and reduced motion shows the same row, colour and
figures at once; no `어제보다 +N` line; the END `현재 점포 자본` row counts from the prior total to the resolved one in 320 ms with one `ui` click per Decoration price it passes and none
when it crosses no price.
FAIL: a tick per receipt row, a second stamp anywhere on the receipt, a profit and a loss in the same colour, a click fired off a
hardcoded price rather than the current Decoration price list, or a settlement figure that differs between motion and reduced
motion.

#### UI-Q-v29-29 — ORDER FLOATING TODAY LINE

SETUP: ORDER on a Day with two or more Gates at 360 / 390 / 412 and 1280: at the top, then scrolled to the offer rows.
PASS (→ UI_UX §DEATH LIMIT — ALWAYS VISIBLE): the floating box holds the Death line at the top, adds the `오늘` line once its block
is scrolled past and `발주 후` last once the ledger is; each fact under its own rule and label, counts and value equal to their
source, `발주 후` following every quantity tap without the box blinking and in the short color below zero; no scroll position
hides a source without its copy or shows it twice; nothing covers the offer controls; the key folds the whole box to a `요약`
chip and back, kept through a quantity tap, the next Day's ORDER and a reload; key and chip clear the menu pin on a phone; one
label column and style, one value size, a tight box.
FAIL: the 오늘 line doubled while its block is on screen, merged into the Death sentence, or a count that differs from the block;
`발주 후` in the box differs from the ledger, lags a tap, or sits above the Death line.

#### UI-Q-v29-50 — ORDER WAREHOUSE PANEL (User 2026-09-29)

Verify UI_UX §ORDER — WAREHOUSE PANEL at 360 / 390 / 375×548 and 1280, with stock held.
PASS: the 발주서 carries no warehouse block at any width; desk: the form set left, the rack large, open, in view while the form
scrolls, clear of the menu pin; phone: the `창고` handle on the dock covers no offer row, the sheet rises from the dock to at most
45% of the screen, the rows above scroll and take taps, a quantity tap keeps it open, the handle or Escape closes it, a fresh
account starts folded and the next Day keeps the choice; handle, sheet and column read as one steel rack apart from the floating
box and the paper, no decorative stripe or stacked frame (PRESENTATION §Edge / material); desk: one cell per slot, empty cells equal the room
left; phone: a cell per held unit, no empty cells, the sheet's rows only what the stock needs; the rack equals the warehouse; a cell's
tip points at that cell, inside the screen with no page overflow, and a second tap closes it; phone: the dock is one row (the
`창고` key and the Action(s), 48 px), the open sheet has no head line; no console or runtime error.
FAIL: the handle or sheet covers an offer control that cannot be scrolled clear, the sheet dims or locks the form, or a quantity
tap closes it; a second copy of the warehouse on screen.

#### UI-Q-v29-51 — D30 CANDIDATES / FINAL 준비 NOTEBOOK (User 2026-09-30)

Verify FINAL_EXPEDITION §D30 PLAYER FLOW and UI_UX §PARTY SELECTION at 360 / 390 and 1280.
PASS: `원정대 후보 보기` is a framed secondary action beside the last-order form title, with no label wrapping; it
opens `원정대 후보` (the muster's alive, visited candidates), each card opening the notebook whose footer is `원정대 후보 보기`,
never `원정대 선택` / `원정대에서 빼기`, with nothing about the party changing; on the muster step the notebook picks and releases;
FINAL 준비: `자세히 보기` under the Stat grid opens the supplied member's notebook with `돌아가기`; no console or runtime error.
PASS: before commitment `발주로 돌아가기` restores the same order sheet with provisional members retained; additional order confirmation
then `원정대 꾸리기` preserves those members. After commitment the return action is absent.
FAIL: a pick or release possible while ordering, a second muster on the order step, or lost members/order state when returning.

#### UI-Q-v29-52 — GATE TIER / FIRE GATE TUTORIAL (User 2026-09-30)

Verify UI_UX §GATE TIER / FIRE GATE TUTORIAL on MORNING at 390 and 1280, tutorial on.

PASS:
- the first board with a tier II Gate that is not FIRE shows `II 게이트부터는 위험이 두 가지다.`
  on that plate; the first board with a FIRE Gate shows `화염 게이트는 위험이 하나뿐이지만, 요구 전력이 더 높다.` on that plate
- each once per account; a board without such a Gate shows neither; 건너뛰기 and reset behave as the other marks; neither names
  an Item

FAIL: the II mark on a FIRE II Gate (it holds one Hazard), on a tier I Gate an Event gave a second Hazard, or on a tier III Gate
before any tier II Gate; either mark on a closed Gate.

#### UI-Q-v29-53 — COACH DIET (User 2026-09-30)

Verify UI_UX §TUTORIAL — COACH DIET / §SALE PRICE LESSONS on a fresh account, tutorial on, at 390 and 1280.
PASS:
- the marks shown are exactly the owner's list: DAY 0 one mark (`점포지원`); no MORNING 방문객 / 게이트 mark (Deep and the II / FIRE
  Gate marks still show in their situation); first ORDER `발주 확정` only; first SALE destination, Stats and outlook, the price keys
  (§3-14) when they first show, then Bag after the first sale and the returning-customer mark on the first returning customer; no NIGHT `한 명씩` mark; CLOSING the one-clause
  receipt mark
- DAY 1 창고 head reads `창고 · 본사 기본 상품 N종` while only the opening stock is held; SALE's readout title reads
  `전투 전망`
- the first 150% refusal shows §26-3 on the refused key; no 50% sale mark; neither price mark shows a second time on the account
- `node tools/measure-first-sale-v30.cjs`: fewer coach taps than the baseline (16)
FAIL: a retired mark still shows, a mark names an Item, or a price lesson shows before its situation.

#### UI-Q-v29-56 — FIRST EVENT TUTORIAL (User 2026-10-01)

Verify UI_UX §FIRST EVENT TUTORIAL on a fresh account, tutorial on, at 390 and 1280.

PASS:
- the first Run's DAY 2 opens the 본사 1+1 행사 reveal; after `오늘 상황 보기` the board's Event slip carries COPY_AUDIT §3-11
- once per account; a later Event shows no mark; 건너뛰기 and reset behave as the other marks; the mark names no Event or Item

FAIL: the mark over the open reveal, on a board without an Event, or a second time.

#### UI-Q-v29-54 — END THIS RUN BLOCK (User 2026-09-30)

Verify UI_UX §END — THIS RUN BLOCK on END (Run Fail, bankruptcy, Final loss / clear) at 390 and 1280.
PASS: `이 점포의 기록` sits between `지금까지 연 점포` and `점포 자본 정산`, five rows in order, COPY_AUDIT §10-4 wording; the figures
are the Run's (Day, visited customers and regulars made, Deaths with 0 printed, the highest-Level customer - tie -> higher Loyalty,
the dead included - all expedition records and their 대성공 count); no `원정` row without an expedition; a reload prints the same
block; the settlement block and the replay line are unchanged.
FAIL: a lost adventurer named in the block, a new save field, or the block after the settlement.

#### UI-Q-v29-32 — ORDER CONFIRM CASCADE

SETUP: ORDER at 390 and 1280, motion on and reduced motion: 발주 확정 with 1 / 3 / 6 SKUs in the cart, the warehouse list open,
and with 3 SKUs folded; frames at 0 / 45 / 90 / 160 / 230 / 320 / 400 ms.
PASS (→ UI_UX §ORDER — WAREHOUSE DISCLOSURE, ORDER CONFIRM): one crate per ordered SKU on its own row, the last landing within
320 ms at every SKU count; each count moves once, prior -> resolved, on its crate's landing, a new SKU's row arriving with its
crate; the summary `N / M칸` · `N종` and the register's 창고 잔여 칸 move together on the last landing (folded, only they move); at
most three audible hits; 보유 골드 counts down to the resolved value in 220 ms; reduced motion ends identical (counts, summary, till).
FAIL: a crate per unit, a count that ticks up unit by unit, a cascade longer than 320 ms, a fourth audible hit, a changed
`발주 완료.` line.

#### UI-Q-v29-31 — SALE COUNTER FEEL

SETUP: SALE at 390 and 1280, motion on and reduced motion: one sale each at 50% / 정가 / 150% and one refused 정가, the tray
unfolded; frames at 0 / 60 / 120 / 200 / 320 ms.
PASS (→ UI_UX §SALE — COUNTER TRAY, COUNTER FEEL): the pressed key moves 3px down and back within 120 ms (60 ms each way); on a sale the pressed tray
shows for that press only and takes no input; the result stub (A8) starts at the key landing and is settled by 260 ms, none on a
ordinary refusal (a Loyalty loss shows only its quiet delta); the refused key is pressed and shakes once where it locks; the first coin tick is louder; 바가지's ticks start 40 ms later with
a lower first tick; the counts stay 1 / 2 / 3; a fifth sale looks and sounds exactly like the first; reduced motion ends identical (tray
cleared, stub text, Gold, Bag).
FAIL: a second press on the 정가 key, a pressed tray that answers a tap, a stub before the key lands, any escalation with the sale
count.

#### UI-Q-v29-30 — FINAL RESULT SEAL STAMP

SETUP: a Final clear and a Final failure with 1-, 2- and 3-member parties, and a non-Final ending, at 390 and 1280, motion on and
reduced motion.
PASS (→ UI_UX §FINAL RESULT — SEAL STAMP): a Final ending shows exactly one seal with the Boss's name right of the headline, a
non-Final ending none; clear: 200 ms hold, 2 × → 1 × in 90 ms, the tape gives 6 px; failure: 1.6 ×, 3 px, faint, crooked, partly printed; headline and
reason appear after the landing, never under the seal, no mid-word break; one landing cue (`sealwin` / `sealfail`) on the landing
frame; the `final` cue plays once; reduced motion ends identical (seal, text, ink strength).
FAIL: a seal per member, the NIGHT death tape on a failure, a seal covering the headline, or a failure seal as crisp as a clear.

#### UI-Q-v29-46 — FINAL CLASH SCENE

SETUP: a Final clear and a Final failure (a close one and a wide one) with 1-, 2- and 3-member parties carrying full, partial and
empty bags, at 360x640, 390x844, 1280x880 and 1920x1080, motion on and reduced motion; a tap mid-scene; a reload mid-scene.
PASS (→ UI_UX §FINAL — CLASH SCENE):
- each member's bag receives exactly the items that member carried, one at a time, before the first lunge; then member 1 -> Boss
  counter -> member 2 -> Boss counter ... in party order, the Boss countering after the last member too
- the red bar follows the owner: impacts mark no amount, shares drop after counters, the last share waits for the verdict, which
  hesitates near the bottom (5% on a clear, the resolved remainder on a failure); it only ever falls and ends at 1 - min(1, rolled Party Power / effective Boss Power): empty on a
  clear, at least 3% on a failure; clear: the Boss card cracks and collapses; failure: the party's cards are pushed back and dimmed
- the ending then plays as UI-Q-v29-30; the scene stays inside the stage; no damage figure, party bar or new copy
- a tap skips to the same ending at once; reduced motion shows no scene; a reload mid-scene opens the ending; one cue per landing
  (`rumble`, `supply`, `clash`, `counter`, `collapse`)
FAIL: an item a member did not carry (or one missing), the bar giving the result away before the verdict, the bar rising, a clear
that does not empty the bar, an empty bar on a failure, a damage number, a skip that does not work, or anything of the scene in
the Save.

#### UI-Q-v29-28 — SALE COUNTER TRAY FOLD

SETUP: SALE at 360 / 390 / 412 and 1280 with a long shelf: pick a row, scroll the shelf, tap the folded strip, tap the readout,
tap the same row, tap another row.
PASS (→ UI_UX §SALE — COUNTER TRAY): on a phone a shelf scroll past 32px or a tap outside the tray / a row / the
dock folds a filled tray to its header line; the folded strip, the same row or another row reopens it; folding never changes the
selected Item; picking a row never folds the tray it just filled; a desk never folds; nothing is saved.
FAIL: the tray stays full height while the shelf is scrolled on a phone, a fold that clears the selection, or a folded tray that
only reopens through the price keys.

#### UI-Q-v29-27 — NIGHT VERDICT STAMP / CAUSE BEAT / REVERSAL OVERSTAMP

SETUP: NIGHT results reached through 다음 at 390 and 1280, motion on and reduced motion: 성공, 대성공, 퇴각, 부상, 중상, 사망, a
result with a Hero Item line, a 귀환석 reversal (`rescued`) and a Death turned away (`avoidedDeath`); frames through the landing.
PASS (→ UI_UX §NIGHT LAYOUT — VERDICT STAMP; PRESENTATION_PRINCIPLES §GAME FEEL BEAT):
- the card stands first and the tag lands after it; 성공 / 퇴각 have no hold, 대성공 / 부상 / 중상 / 생환 / 사망 hold ≤ 200 ms; the
  stamp falls from 1.6 × (퇴각 1.3 ×) in 90 ms; on the landing the card dips 4 px (퇴각 2 px) and settles, nothing else moves; 대성공 one gold landing; 부상 / 중상 / 사망 keep their ink spread / misaligned tag / black tape (laid
  in ≤ 500 ms)
- a reversal prints the turned-away Outcome (`사망` / `중상`) first, then `생환` overstamps it with the Insurance proof lines on
  that frame; a Death 만반의 준비 turned away prints `사망` and its own 부상 / 중상 overstamps it
- with a Hero Item line that line settles once and the figures do not count; without one only the REWARD figures count up
- the Outcome cue's first note on the landing, `rescue` on a reversal's overstamp; one visual, one sound, one cause / number at a
  landing
- the last motion ends by 770 ms; 다음 / 전체 건너뛰기 answer at any frame; no pending cue plays over the next screen
- reduced motion ends identical: same tag, ink / misalignment / tape, figures at their values, no first print
FAIL: a stamp on a death, two stamps on a 대성공, a reversal on 강골 / 구급키트 results, a ring, flash, shake or particle; a
count-up beside a Hero Item line, a count on GROWTH / AFTERMATH figures, a faint first print left in the end state, or a changed
Outcome type size.

### CLOSING

#### UI-Q18 — CLOSING ECONOMICS
EXPECT: the economic result is visually primary (→ UI_UX §CLOSING): 영업 시작 골드 -> 매출 / 발주 / 운영비 (+ other moved rows) ->
보유 골드 box (stamped) with 영업 손익 ±N (green / red, gold at 0); 창고 재고 and 오늘 폐기 on separate lines, 오늘 폐기 naming up
to three Items (×n from two) then 외 N종; 내일 운영비 예상 (not on DAY 29); no 판매 원가 / 판매 마진 / 폐기 원가 row;
영업 시작 골드 + ins - outs = 보유 골드 exactly; no page scroll at 390 x 780.
PASS: the Night story is not duplicated as dominant content.

#### UI-Q-v28-13 — CLOSING FOOTER
The redundant internal-accounting footnote is absent from the primary receipt.

#### UI-Q-v28-17 — CLOSING ECONOMICS ONLY
The primary Closing receipt has no \`오늘의 보급 영향\` block and no internal-accounting footer. NIGHT stays the
result/causality owner.

### RELIC / STORE SUPPORT

#### UI-Q36 — RELIC VISIBILITY / QUICK VIEW
Own Relics and move through Morning -> Order -> Sale.
EXPECT: owned Relic effects stay quickly accessible in all three phases; the Sale view is read-only.
PASS: the Player recalls store-build effects while deciding, without violating purchase timing.

#### UI-Q37 — RELIC MILESTONE REVEAL
Reach D5/D10/D15/D20/D25/D30. EXPECT: a new candidate window gets one focused reveal; Buy / `나중에 결정` are clear.
PASS: D10/D15 etc. never feel like the Relic choice simply failed to appear.

### BOSS / FINAL

#### UI-Q93 — FINAL TIMELINE
PASS: D0 objective notice; D10 FINAL20; D20 FINAL10 + Recon beat; D25 FINAL5 + exact persisted Family/Hazard disclosure; D30
reuses known state; no permanent new Final dashboard required.

#### UI-Q40 — BOSS / RELIC REVEAL ORDER
Reach D5, D15, D30 with relevant Boss state.
EXPECT: D5 Identity is read before the D5 Relic choice; D15 exact Trait before the D15 Relic choice; Save/Reload does not reorder
or replay reveals as an exploit.
PASS: the Player receives information before the decision it is meant to affect.

#### UI-Q41 — SLOTH WINDOW CHOICE CLARITY
A selected SLOTH opportunity window. EXPECT: the mutually exclusive outcomes - acquire a normal Relic / break one Sloth Seal for
0G - are distinguishable. PASS: no UI implies both can be obtained from the same window.

#### UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
Reach D5 and D15 for multiple Bosses, then enter Final with PRIDE, ENVY, GREED, GLUTTONY, LUST, one non-SLOTH ordinary Boss, and
SLOTH at Seal Break 0 and at 1/2/3 where practical (→ UI_UX §BOSS INFORMATION PRESENTATION; `BOSS_v2.8.0.md`).

EXPECT:
- D5: in-world `길드 토벌 공고` framing; correct D5/D15 BASE art; correct fixed Boss name (GLUTTONY per `BOSS_v2.8.0.md`:
  `탐식의 마왕 글러트니`); correct Boss-specific Flavor; exact Trait hidden
- D15: `길드 정보 보고` framing; same BASE identity art; exact Trait Function visible; no strategy advice replacing Function; no
  internal design terminology in Player-facing copy
- D25: `최종 정찰 보고` framing; exactly two Families; each Family's actual T2 Hazard set; authoritative Hazard pressure wording;
  Family count is not mistaken for a fixed Hazard-key count
- Final preview: PRIDE participant 투력 original -> applied; ENVY target 4 Stats original -> applied; GLUTTONY per
  `BOSS_v2.8.0.md` - all positive Core-Stat contribution originating from Items is reduced to 50%, no Rarity threshold, with
  Counter / 피로 회복 / Insurance / Utility / harmful RiskReward penalty outside that reduction; LUST affected non-regular
  participant 4 Stats original -> applied; GREED display matches actual applied strengthening; SLOTH displayed state matches
  Seal state
- Final art: ordinary Boss uses D30 BATTLE; SLOTH SB0 reuses BASE; SLOTH SB1/SB2/SB3 uses the matching D30 state; the Final
  confrontation is not text/name-only

PASS: Boss art, information timing and previewed applied values match the actual Final resolution without a new permanent Phase
or exposing exact success probability.

#### UI-Q-v28-10 — BOSS MOBILE DENSITY
At 360x800:
- D0 has no Boss art and presents the objective/cadence as basic dossier information
- D5/D10/D15/D20/D25 reuse the same centered Boss-art family and the common viewport-bounded mobile cap in §D5 / D10 / D15 / D20 / D25
- D10/D20 are compact because their report payload is shorter, not because the Boss becomes a 64px icon
- no small-Boss + wide-empty-space composition; core information and acknowledgement are not pushed off the first viewport solely
  by art
- reduce image size and empty spacing before body type; without first-time guidance, every Boss report fits without body scrolling at 360x640 and 390x780; first-time guidance may add scrolling without shrinking the illustration further
- D5 explanation and Flavor share the same left text edge, separated by a dotted line

#### UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF
Around D0 / D5 / D10 / D15 / D20 / D25 / D30, PASS:
- each cue/art treatment reveals no information earlier than its owning beat
- after the first DAY 0 Store Support choice, D0 is the first presentation step of DAY 1 MORNING; it blocks ordinary Morning
  progression until acknowledged but consumes no time / RNG / resource; it has no Boss identity, art, silhouette, Trait, Final
  state or FINAL domain backdrop
- a pre-acknowledgement save still owes D0 after reload; a post-acknowledgement save does not replay it; a save already beyond
  DAY 1 does not receive D0 retroactively
- D25 presentation may reflect the exact Final state only after that state is revealed
- D30 may intensify FINAL entry but adds no new Boss-information beat or fact
- Boss/Final presentation consumes no Gameplay RNG; seen-state / Save-Load behavior unchanged
- at mobile width, information and acknowledgement stay usable

#### UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION
Controlled D0 / D5 / D10 / D15 / D20 / D25 / D30 states on phone and desktop; per beat check information impact and layout
economy (→ UI_UX §D5 / D10 / D15 / D20 / D25, §DOCUMENT DETAIL — USER APPROVED).

PASS:
- D0 objective / investigation start unmistakable without Boss art or an oversized empty reveal; D5 identity registers as the Boss
  reveal; D10 / D20 beats clearly new, concise, keeping the full Boss-art family; D15 exact Trait stronger than a routine notice
  and readable; D25 Family/Hazard disclosure prominent and readable before the same-Day decision flow; D30 Final-entry emphasis
  without a new information payload
- acknowledgement/action control visible/reachable; no horizontal overflow; no avoidable vertical overflow from art/decorative
  framing; no large unused modal area around short content; no required information shrunk to unreadable scale to avoid scrolling
- Boss report detail per the owner: no artificial floor/divider under D5/D15/D25 art; no non-semantic left accent bar on D5
  Flavor or D15 Trait (typography/spacing only, no replacement text box); D25 has no extra black top rule above the Family section
- the 240px / 200px phone values are exact; for D5/D10/D15/D20/D25 the Boss reads as a centered visual anchor with the owned
  information directly below/around it, not a small character floating beside unused space

If runtime evidence shows an exact value itself causes a functional failure, report it as a Functional Design finding and patch
Canonical first; do not silently tune Source.

#### UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT

Controlled D30 Final with eligible participants. PASS order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- participant selection is confirmed before Final preparation begins
- selected participants are handled one at a time with the familiar two-slot Item interaction; each has exactly two visible Item
  slots
- the selected Item shows exactly one fixed Final price: ordinary 50% / 매입가 amount; 100% / 150% controls, purchase/refusal
  chance, refusal-result UI and same-SKU refusal-price lock UI are absent
- Wallet / affordability / inventory state stay readable; an unaffordable transfer is visibly non-committable with a readable
  reason
- a committed transfer updates stock and NPC Wallet before the remaining-slot decision; Player Gold increases by the same fixed
  amount; Gross Sales increases by the same fixed amount exactly once
- Final no-effect Items are blocked/clearly marked per `FINAL_EXPEDITION_v2.8.0.md`; Boss-caused visible Item changes use the
  current Final truth
- no separate attack/QTE/combat-control layer; no second free-equip screen after Final preparation
- after all participant preparation interactions finish, the UI advances to the one Final result

#### UI-Q-v28-32 — FINAL PARTY / PREPARATION
D30 Final on phone and desktop (→ UI_UX §FINAL PARTY / PREPARATION PRESENTATION — D30). PASS:
- unselected roster cards use no rarity-coloured outer frames competing with selection; selected state is immediately
  distinguishable; rarity stays readable as text
- 1, 2 or 3 participants can be deliberately committed when eligible; a sub-3 party gets the approved confirmation before
  commitment; its two actions share one geometry family; no visible header 닫기 beside `돌아가기`
- the selection stage shows the approved forecast-after-commitment guidance and no combat forecast
- after commitment exactly one party-wide `토벌 전망` is shown, using the actual committed party (1/2/3-person) and updating after a
  committed Final transfer; the first activated `토벌 전망` is explained once by the Coach, afterward through the anchored `?`
  Help; no standing forecast-explanation paragraph under the readout
- no individual `전투 전망` or failure-to-death percentage in Final preparation; no player-facing `Final 효과 없음` copy
- a no-effect Item uses the approved Demon-Castle copy and cannot be committed
- insufficient Wallet shows exact required/owned Gold inline and the transfer stays disabled; a blocked transfer shows its reason
  outside the disabled action
- no ordinary SALE purchase/refusal dialogue in Final preparation; an otherwise valid affordable transfer is deterministic
- no horizontal overflow at 360/390/412 and desktop 1024/1280; Final action labels one line at 360/390/412 (body / Item-effect
  text may wrap)
- the menu pin does not cover the party count, including with the party section scrolled to the top

### STORE MANAGEMENT / META

#### UI-Q-v28-1 — STORE MANAGEMENT
PASS: Store Capital visible; four fixed Slots visible; owned/unowned/equipped distinguishable; purchase confirmation spends
exactly once; loadout read-only during an active Run; scrolled down the panel, 구매 · 구매 확정 · 취소 · 적용 · 해제 each keep the
pressed row where it was on screen (runtime evidence `tools/qa-deco-seating.cjs`, 360x597, 1280x880).

#### UI-Q-v28-2 — PRE-RUN RETURN PATH
From the pre-Run/foundation Decoration management screen, on a real mobile browser or equivalent mobile runtime (not Source
inspection only), PASS: explicit Back/Return reaches new-Run preparation; repeated management -> return cycles produce no blank
UI; no Seed/Decoration reroll caused merely by returning; mobile browser/system back does not strand the Player in an empty stage.

#### UI-Q112 — PRE-RUN DECORATION EMPTY SLOT
PASS: `비움` carries no `주의 ·` / error styling; before a Run every Slot row including `비움` is actionable; tapping a Slot row
enters the 점포 장식 codex tab (label `점포 장식`) focused/scrolled to that Slot; the active-Run loadout stays frozen/read-only.

#### UI-Q-v28-20 — DECORATION DECISION SURFACE
Store management shows name/effect/price-or-ownership/equipped state. Decoration Flavor prose is absent from this decision
surface. No extra Collection UI is required.

#### UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES
With controlled states, every implemented live-store growth trace derives from state that already exists and is Player-knowable.
Cover each trace family present in the implementation: equipped Decoration; owned Store Support / facility; Trusted Regular
presence; D25+ revealed Final-preparation state.
PASS: adding/removing the owning state adds/removes its trace; Save/Load reproduces the same trace from the same state; a trace is
presentation-only, not an interactive gameplay control; no hidden Boss / Hazard / NPC information appears early; multiple traces
stay readable without changing gameplay ownership.
FAIL: a trace exists without its owning state; visual state requires a second gameplay/progression field; a decorative prop
changes a mechanic.

#### UI-Q-v28-18 — STORE CAPITAL CURRENCY
No active Store Capital display appends G. Gold still uses G.

#### UI-Q-v28-14 — DECORATION ART / SETTLEMENT
Decoration-art, Store Capital settlement and Franchise-retirement checks stay active as defined by META_v2.8.0.md and
CORE_RUN_v2.8.0.md.

#### UI-Q42 — META PROGRESSION PRESENTATION
Meta/HQ progression on accounts with different matrix states.
EXPECT: no Global Meta XP progress bar as current truth; Job × Boss clear cells readable; per-Job Mastery and Total Mastery derive
consistently; Distinct Boss unlock milestones 1/3/6 clear.
PASS: the UI matches META_v2.8.0.md and does not resurrect legacy progression truth.

#### UI-Q39 — MONSTER KNOWLEDGE — RETIRED FROM THE CODEX
→ UI_UX §META UI.
PASS: the codex tabs are 진행도 · 상품 · 직업 · 점포지원 · 마왕 · 점포 장식; no `몬스터 지식` tab, and no `보급 생환 N회` / `관찰 N회`
progress line on any screen.

### MENU / SETTINGS / DEBUG

#### UI-Q71 — MENU EXACT
Top-level exactly: 모험가 수첩, 도감, 점포지원, 점주 가이드, 설정, 현재 지점 포기.
PASS: no top-level Sound; no top-level Full Data Reset; no `설정 · 저장`.

#### UI-Q72 — SETTINGS EXACT
Settings contains 저장 내보내기, 저장 가져오기, Sound, BGM, SFX, Full Data Reset.
PASS: 현재 지점 포기 absent from Settings.

#### UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR
PASS: functional composition unchanged; the Run-abandon action stays top-level and separate from Full Data Reset, labelled exactly
`현재 지점 포기`; Menu uses one surface + row navigation, not a dashboard-card grid; Settings uses one utility panel; destructive
action separated; no new control framework.

#### UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY
Ordinary Player surface: \`소리 켜기 / 소리 끄기\`; \`전체 데이터 초기화\`; no reproducibility Seed control;
no \`로컬 실행 지원 · 외부 연결 없음\` footer. No new Debug menu is required for PASS.
Settings carries one `안내` switch (`안내 끄기` / `안내 다시 보기`) on the existing `tutorial.skipped`; turning it back on clears every `coach-*` mark so the coaches show again. No new Save field.

#### UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH

Ordinary Player verification: pre-Run has no reproducibility Seed field; Settings has no visible Debug entry; the ordinary Player
flow has no QA/runtime footer copy.

Manual deterministic reproduction:
1. Full Data Reset or import a fixed QA Save.
2. Open browser Developer Tools -> Console.
3. Run:
   `Guild24.game.start('qa-v28-fixed-seed'); Guild24.render();`
4. Confirm:
   `Guild24.game.run.seed === 'qa-v28-fixed-seed'`
5. During the active Run run:
   `Guild24.showDebug()`
6. Confirm the Debug view exposes the seed/RNG/offers/NPC/Dungeon/Result/Boss diagnostic payload.
7. Close and repeat from the same controlled Account state with the same seed; the Run state reproduces per the seeded contracts.

Shortcut: `Ctrl+Shift+D` opens the same development Debug view during an active Run.

FAIL: deterministic seed reproduction requires restoring a Player-facing Seed field; Debug becomes ordinary Player navigation;
removing Player-facing QA copy also removes the development reproduction capability.

### TUTORIAL / HELP

#### UI-Q19 — TUTORIAL OVERLAY
EXPECT on tutorial steps: dim background, spotlight target, anchored bubble, no layout push, next/skip.
PASS: no in-flow instructional green card.

#### UI-Q20 — TUTORIAL RESPONSIVE POSITION
Tutorial near viewport edges on mobile. PASS: the bubble repositions and the target stays reachable/visible; no clipped or
offscreen instruction.

#### UI-Q21 — TUTORIAL PERSISTENCE
Complete the tutorial and reload. PASS: completion state persists; the completed tutorial does not restart.

#### UI-Q15 — FORECAST TUTORIAL
First forecast explanation. EXPECT: it explains the estimate can differ from the actual outcome. PASS: no exact RNG/formula.

#### UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT
Before treating tutorial work as complete, inspect the real tutorial source and run the sequence end-to-end.
PASS only if: a tutorial sequence is reachable in current Source; its first trigger is not dead/unreachable; each step advances
through its intended interaction; completion state persists after normal completion; no runtime exception or phase blocker
interrupts it.
Tutorial data/UI in Source with no reachable trigger is an implementation bug, not permission to delete the tutorial.

#### UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL

Test all fresh-init paths owned by `CORE_RUN_v2.8.0.md`.
- Case A — Full Data Reset: set the completion flag (complete or dismiss), Full Data Reset, start the new account.
  PASS: old completion/dismissal state is gone; the tutorial is eligible and actually starts on the first applicable flow.
- Case B — legacy-only internal state: leave only a v1~v7 internal-test state, enter the v8 build, let policy reject migration
  and create fresh v8. PASS: stale legacy tutorial state cannot suppress the tutorial; fresh v8 behaves like a clean first
  install for tutorial eligibility.
- Case C — ordinary Run Abandon/new Run under the same account. PASS: tutorial completion stays preserved; the tutorial is not
  forcibly replayed merely because a Run restarted.

FAIL if a true fresh account can enter ordinary gameplay without the tutorial because of a stale completion/reset flag.

#### UI-Q73 — FULL RESET TUTORIAL
After Full Data Reset, start fresh. PASS: the tutorial can appear again; no stale completion state survives.

#### UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER
PASS: the tutorial explains Stat pressure / Counter contribution / readiness and one Supply/Fatigue fact: Food/Drink reduce
Fatigue; Fatigue 10+ lowers 기동/정신.
FAIL: the tutorial instructs a specific correct SKU for a Hazard as the solution.

#### UI-Q113 — TUTORIAL COACH COPY / TARGETING
PASS:
- every coach step uses the exact current COPY owner text
- ORDER confirm says it commits only the current cart and ORDER stays available
- SALE coach targets a visible mobile element, never the hidden desktop duplicate
- fresh/reset tutorial reachability from UI-Q105/Q106 stays intact

#### UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT

Audit every coach step, including optional/contextual steps, on the responsive layout where it can appear. Capture per step:
tutorial text; runtime target selector / actual visible matched element; spotlight bounds; coach-copy placement; next actionable
control.

PASS:
- highlighted UI is exactly the fact/action the text teaches; the target is visible, not the hidden duplicate for another
  breakpoint
- spotlight includes the complete meaningful target without swallowing unrelated neighbouring UI
- copy and spotlight stay readable together after any automatic scroll; coach UI does not cover the target or the next required
  control
- a relationship lesson highlights the smallest useful shared region or uses sequential steps
- contextual missing targets skip cleanly and do not block later lessons
- the lesson explains how to read the system, not which gameplay answer to choose
- the same step stays semantically correct at phone and desktop layouts
- SALE's nine first/contextual marks fit the resized live target with at most a 4px surround: destination, Stats, combat,
  environment, payday wallet, returning card, filled Bag slot, refused price and discount receipt. Use the actual phone or
  desk scroller for automatic positioning, never the desk's zero-size `display:contents` wrapper. Copy, target and dock
  remain separate after scroll, resize and phase-entry motion (User 2026-10-03).

FAIL examples: text explains Hazard readiness while only an unrelated destination heading is highlighted; one button is discussed
while the whole card/column is spotlighted without need; only part of a tall meaningful target is cut out; automatic scroll puts
the target behind a dock/header; coach text describes data not inside or meaningfully related to its highlight; spotlight is
enlarged merely to mask a target/copy mismatch.

A wrong runtime target is fixed in targeting/layout; wrong Copy is routed through the current Copy owner.

#### UI-Q-v29-10 — DAY 1~3 TASK LINE

SETUP: fresh account with the tutorial not skipped: DAY 1, 2, 3 and 4 of one Run at 360 and 1280, every phase; DAY 0; then an
account whose tutorial is skipped (`tutorial.skipped` true) on DAY 1 (→ UI_UX §TUTORIAL — TASK LINE, DAY 1~3).
PASS:
- DAY 1~3 MORNING / ORDER / SALE / NIGHT / CLOSING each show one fixed line at the top of the phase content (under the menu pin,
  above the first block; no coach mark, spotlight or button), exactly the `COPY_AUDIT_APPROVED_v2.8.0.md` §3-8 string:
  `오늘 할 일 — 열린 게이트의 위험을 본다` / `오늘 할 일 — 위험에 맞는 능력을 올리는 상품을 발주한다` / `오늘 할 일 — 손님이 갈 게이트를 보고 상품과 가격을 정한다` / `오늘 할 일 — 준비가 어떻게 됐는지 확인한다` / `오늘 할 일 — 오늘 장사를 정리한다`
- never wraps at 360; absent on DAY 0, from DAY 4, and with the tutorial skipped
- reuses the tutorial state, adds no Save field, adds exactly one line of page height (the approved exception to "tutorial does
  not add page height")
FAIL: the line on DAY 0, on DAY 4 or later, or with the tutorial skipped; the line is a coach mark / spotlight / button, or wraps
at 360.

#### UI-Q-v29-11 — FIRST-ORDER COACH ORDER / TARGETS

SETUP: fresh account, first ORDER at 360 and 1280; step through the coach.
EXPECT: the ORDER coach group is one mark, `confirm` on `발주 확정` with the COPY_AUDIT §3-2 line (→ UI_UX §TUTORIAL — COACH DIET).

PASS:
- `confirm` is the only ORDER step; no `gates` / `stock` / `offer` / `quantity` / `reroll` mark
- no `gold` mark: `#order-register` carries no coach step
- the step passes UI-Q-v28-27 target truth

FAIL: a retired ORDER mark shows, a step reads 보유 골드, or the register is a target.

#### UI-Q-v29-12 — ORDER TODAY-FIT EMPHASIS — RETIRED

Checked by UI-Q-v29-22. Negative case: ORDER on a day with known open Gates; offers holding a Counter for one of today's Hazards,
an Item that raises a Core Stat one of those Hazards presses, and an Item that does neither.
PASS: no effect text on any ORDER offer row carries an emphasis style against today's Gates; no badge, no `오늘 필요` or other
verdict word, no row reorder, no recommended row.
FAIL: a badge / word / reorder marks the fit, or any effect is emphasised.

#### UI-Q-v29-13 — ORDER PER-GATE VISITOR COUNTS

SETUP: ORDER on a one-Gate day and on a day with two or more open Gates; compare the counts with the destinations the SALE queue's
customers claim; include a 거짓말쟁이 and a 게이트 순례 주간 reroute where available.
PASS: the ORDER 오늘 line follows `COPY_AUDIT_APPROVED_v2.8.0.md` §4-21 - one Gate `전체 {N}명 {Hazard}{Tier}` with no count; two or
more `전체 {N}명 {Hazard}{Tier} {a}명 …` (a Tier II-III Gate lists both Hazards with its one count); an Event-closed Gate beside one open Gate
`전체 {N}명 {Hazard}{Tier} {n}명 {닫힌 Gate의 Hazard}{Tier} 오늘 폐쇄`; each count follows the claimed destination, never exposing a liar's or
rerouted customer's true Gate; no name, Job, Trait, Wallet or individual destination of a future customer (UI-Q91 / UI-Q101,
narrowed to the individual).
FAIL: per-Gate counts on a one-Gate day with no closed Gate, no count on the open Gate beside a closed one, a count that exposes a
true Gate, or any individual identity.

#### UI-Q-v29-14 — D0 BRIEFING TWO LINES / GUIDE 처음 3일

SETUP: fresh Run: the D0 Boss briefing after the first Store Support choice; then 점주 가이드 from the menu at 360 and 1280
(→ UI_UX §D0 — FIRST MORNING BRIEFING, §GLOBAL HELP; copy COPY_AUDIT §14-1 / §8-0).
PASS:
- the briefing: header `마왕 조사 개시`, the lead line, then a DAY label over each of its four lines (DAY 05 / 15 / 25 / 30, exact text COPY_AUDIT §14-1), and the button;
  `조사 정보를 확인하며 토벌대를 준비하고, DAY 30까지 점포를 운영해야 한다.` is absent
- the labels read on the record's LED face (16px; 17px on a desk), the lines in the record's body weight (15px ink; 16px on a
  desk), never the secondary tone
- 점주 가이드 opens on `처음 3일` with exactly the five §8-0 lines in order; the eight sections (§8-1 … §8-8) sit under a `자세히`
  disclosure, collapsed by default, open on tap; no gameplay screen gains a disclosure
FAIL: the `DAY 5` / `DAY 30` paragraph body or the closing sentence remains; `처음 3일` is missing; `자세히` is open by default.

#### UI-Q-v29-15 — STORE SUPPORT CARD COPY, TWO CLAUSES

SETUP: the DAY 0 Store Support takeover and the owned-Relic modal on a Run that owns several Store Supports, at 360 and 1280.
PASS: all thirty card bodies match `COPY_AUDIT_APPROVED_v2.8.0.md` §11-1 … §11-30 verbatim (effect first, condition after ` · `,
no HQ-accounting clause); values and effects match RELIC_v2.8.0.md.
FAIL: a body that is not the §11 line.

#### UI-Q-v29-16 — NO SECOND OWNED-RELIC BLOCK IN SALE

SETUP: SALE with owned Store Supports at 360, 390, 412, 1024 and 1280; then the FINAL preparation screen.
PASS: SALE shows the compact owned-Relic control in the shelf heading and no owned-Relic block lower at any width; FINAL
preparation still lists owned Store Supports.
FAIL: a `보유 점포지원` block under the Trait rows on desktop, or the FINAL list gone.

#### UI-Q-v29-17 — WAREHOUSE LIST STARTS COLLAPSED

SETUP: fresh account, first ORDER at 360 and 1280; open the list; reload; next Day's ORDER.
PASS: the held-stock list starts collapsed with the summary line (used / total slots, kinds) visible; at 360 the first offer row
is reachable without scrolling past an open list (the phone list is the warehouse sheet, UI-Q-v29-50); an opened list stays open
across the reload and the next Day until the player folds it.
FAIL: the list starts open on a fresh account, or the summary line hides inside the collapsed detail.

#### UI-Q-v29-18 — COUNTER TRAY

SETUP: SALE at 360x640, 360x597, 375x548, 390x780 and 1280x880: DAY 5 and DAY 14 (two Hazards and Deep nomination),
entry, tap one shelf row, tap a second row, one successful sale, one refusal. Include the longest production customer name,
long product names/effects, same-day expiry and special effects; review actual screenshots for readability.
PASS (→ UI_UX §SALE — COUNTER TRAY, §SHORT PHONE, §SALE — DESK LAYOUT):
- at entry the tray is empty: on DAY 1~3 with the tutorial active one line (`상품을 누르면 계산대에 올라온다.`, ≤ 48px at 360),
  otherwise no height; the shelf heading plus at least one row visible without a scroll
- a tapped row fills the tray with the owner's contents; opening scrolls only as specified above (the tapped row, only when the tray would clip it). No shelf row changes height; an already-open second-row swap preserves the scroll/anchor.
- the filled tray is ≤ 200px at 360; representative one-/two-Hazard visits keep two complete shelf rows at 640 / 597 / 548.
  Long effects wrap intact; no ellipsis, clipped payload or forced font shrinking to reach the row count.
- the phone character is 85–90% of the pre-trim presentation in width and height; both 44px Bag slots are visible, hittable
  and clear of the menu. Shelf names/effects are 14px/13px, outlook word 16–18px, environment number 14–15px, title 12px;
  full information stays readable on dark planes. The 48px customer-send target and all price keys stay inside the viewport.
- phone changes/special effects use the full width; the tray header repeats no stock/expiry, customer/wallet or base
  price (stock/expiry live on the shelf row, User 2026-10-03). The shelf title/count/support centres align. Nameplate/destination padding and price-key depth clearance meet the above contract. Long names and
  metadata wrap without overlapping the icon, neighbouring text or price keys. Deep nomination is reachable after the shelf
  before purchase; a confirmed nominee's destination and payment stay visible.
- role and percentage remain together on each phone key's internal left ribbon, with price/profit in two right-hand lines;
  disabled causes wrap intact across the key. Test every catalogue Item and all five closed-key causes. Numberless utilities
  retain their complete conditions without the redundant no-change row; an unapplied numeric effect retains its warning.
- the price keys sit at the same place for every Item; the hand-over icon goes from the tray icon to the Bag slot; a successful
  sale clears the tray; a refusal keeps the Item with the refused key locked (`오늘 거절됨` / `더 싼 값을 거절함` / `바가지를 거절함`)
- on 1280 the tray lies in the middle area on the counter, between the ledger and the shelf
- FINAL keeps its per-row panel (UI-Q-v28 FINAL ids unchanged)
FAIL: shelf rows change height or an already-open swap changes scrollTop; the representative comparison misses its 2 / 1 / 1 floor; text,
Bag slots or actions clip/overlap; the tray needs a drag, a scroll or a second tap to reach the price keys.

#### UI-Q-v29-19 — GATE HAZARD REQUIREMENT NUMBER

SETUP: MORNING Gate plates and the ORDER 위험 보기 modal on a T1, a T2 and a T3 day; the SALE destination plate of a customer
going to one of them; the D25 최종 정찰 보고 and the FINAL 확인된 위협 rows.

PASS:
- every Hazard row states the Gate-level requirement first: MORNING plate, SALE destination plate, D25 report and FINAL rows read
  `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; Gate detail alone reads the full sentence
  `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다`
- on a phone the short row is two lines, `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공`; on the SALE destination
  plate `{위험}` and `대응 {N} 필요` share the first line (`대응 {N} 필요` one type step smaller there) and the conversion line
  starts under the Hazard name, so no Hazard takes a third line and nothing overflows at 360 / 390 / 412; at 900px+ one ` · `
  line; the SALE Stat grid shows the pressing Hazard tag beside the Stat name on one line with no overflow, the value is smaller
  than before yet larger than the name
- N equals ceil(Hazard Threat) of that Gate on that Day (DUNGEON_HAZARD §HAZARD THREAT), so it rises with Day and Tier; n is 3 for
  강인함 and 2 for 기동 / 정신 (Stat n당 대응 1)
- no `{위험} · {label}` row and no destination-plate `?` help; D25 / FINAL show N = 29 (Day 30 / T2); no per-customer remaining
  need, no readiness number, no 0.75 / 0.40 threshold anywhere
- no Item name and no verdict word

FAIL: a per-customer "더 필요" number, a readiness ratio, or a requirement number that does not match ceil(Hazard Threat).

#### UI-Q-v29-55 — SHELF EXPIRY ORDER

SETUP: SALE with a shelf holding units stocked on different days (some at 1 day left), at 360 and 1280; the same shelf for two
customers going to different Gates.
PASS (→ UI_UX §SALE — COUNTER TRAY / §SALE):
- rows ordered by kind (대응 장비 -> 음식 -> 음료 -> 포션 -> 보험 -> 특수), then days left before discard, nearest first, then higher
  Rarity; ties keep the existing order; identical for both customers
- selling units, including the last unit of an Item's oldest batch, moves no other row within the Day; a sold-out row leaves; the
  next Day sorts afresh
- every row, the tray and the 재고 정리 list carry the shelf life (`폐기까지 N일`, then `내일까지` / `오늘까지`); a last-day row in the
  warehouse `.soon` color
- no `유통기한 없음` / `기한 없음` state on the tray, the ORDER row or the warehouse list (every Item expires, 2~5 days)
- one name line + one effect line per row; no overflow at 360
FAIL: an order that changes with the customer's Gate, or a recommendation word.

#### UI-Q-v29-21 — MENU ROUTING / THIS RUN'S DECORATIONS / ABANDON FLOW

SETUP: a Run on DAY 0 (first choice pending), a Run on a Day whose Store Support window is spent or closed, and a Run at SALE; the
menu on each (→ UI_UX §MENU / SETTINGS — EXACT COMPOSITION, §RUN ABANDON UX).
PASS:
- menu rows exactly 모험가 수첩 / 도감 / 점포지원 / 이번 점포의 장식 / 점주 가이드 / 설정 / 현재 지점 포기
- 점포지원 opens the selection surface only while `canBuyRelic` holds, otherwise the owned list `보유 점포지원` with a close
- 이번 점포의 장식 lists the four Slots with the frozen loadout and effect line, an empty Slot `비어 있음`, nothing editable
- DAY 0 첫 점포지원 has no `장식 구성 다시 보기` button and no close
- 현재 지점 포기 → confirm (§1-3) → the Run is gone (`run = null`) on 새 점포 준비 with no Run, where a Decoration can be bought and
  equipped and no new Run has started until `첫 점포지원 고르기`; every other Run end (bankruptcy, death limit, 폐점, FINAL end)
  reaches 다음 점포 열기 -> the same 새 점포 준비
- the codex tab reads `점포 장식`
FAIL: abandon starting a new Run by itself, or a Decoration purchase refused with no Run.

#### UI-Q-v29-22 — FIXED EFFECT ORDER / NO FIT EMPHASIS / TRANSACTION RESULT STUB

SETUP: ORDER with offers of every category; SALE with a shelf of every category for two customers going to different Gates; one
50% sale, one 정가 sale, one 150% sale and one refusal on the same customer; the 점주 가이드; reduced-motion on and off, at 360 and
1280 (→ UI_UX §ORDER — ITEM INFORMATION HIERARCHY, §SALE — TRANSACTION RESULT STUB).
PASS:
- no effect text on any ORDER offer row or SALE shelf row is emphasized; rows read the same for both customers
- effects in the fixed per-category order (Food 피로 회복 first, Drink Stat / Counter then 피로 회복, Potion 투력, Field Gear its
  Counters, Insurance its one line), the same on the tray's 특수 효과 line and in the codex
- the first ORDER OFFER coach and the 점주 가이드 line under 처음 3일 read the exact category-grammar sentence (COPY_AUDIT §3-7
  OFFER / §8-0)
- each successful sale shows one receipt stub over the counter band for about 2.5 s, `단골도 {±N} · 소지금 {A} → {B}` with that
  customer's real values; a second sale to the same customer replaces it; nothing reserves height, input never blocked
- a refusal shows only its actual Loyalty loss at the stub location, if any; no Wallet row, no new motion; the reply line comes from the engine's reason pool (가격 / 필요도 / 일반 선택) and stays 5 s
- reduced motion: the stub appears and disappears without motion, numbers identical
FAIL: any fit emphasis, any recommendation word, a stub at the end of the day instead of per customer, or a stub whose numbers
differ from the customer's record.

#### UI-Q-v29-23 — OWNED STORE SUPPORT STATUS LINE / PURCHASE NOTICE

SETUP: a Run owning 회전 진열대, 길드 보증 진열대, 단체 주문 창구, 발주 교환권, 묶음발주 계약, 단골 묶음혜택 and 야전 정비대; the
owned list from the menu at MORNING, ORDER and SALE, before and after the condition changes (a guarantee used, the free reroll
used, three of one SKU in the cart, a 단골 customer's second purchase).
PASS: each conditional support shows exactly the COPY_AUDIT §11-32 line for the current runtime state, changing with it and never
saying 추천 / 필요 / any verdict; 야전 정비대 (always on) shows no line; 묶음발주 계약 only at ORDER, 단골 묶음혜택 only at SALE for
the current customer; the purchase notice reads `{점포지원명} 확보.` and nothing about 다음 날부터.
FAIL: a status line on an always-on support, a chance-based support written as inactive, or a new Save field behind any line.

#### UI-Q-v29-24 — SALE FORECAST PIN

SETUP: SALE with a customer at 360 / 390 / 412 and at 1280; pick a shelf row with the column at the top, then scroll until the
readout leaves the view and pick a lower row; tap the pin twice; scroll back to the top.
PASS (→ UI_UX §SALE — FORECAST PIN): no pin with the readout in view; out of view the pin reads the readout's two words in its
colours at the top of the scrolled column; one tap folds to the `전망` chip, a second restores the line; back at the top the pin
hides, and after a fold scrolling away shows the full line again; a `연속 부상 출발 {n}회` line on the readout repeats under the
pin's readings (none without it; the chip reads `전망` only); no pin at 1280 in any scroll state; no layout row moves when the pin
appears; no runtime error.
FAIL: a pin while the readout is visible, a pin on a desk, values that differ from the readout, a pin that pushes the layout, or a
Save / account field for the fold.

#### UI-Q-v29-25 — SALE DESK LAYOUT

SETUP: SALE with a customer at 1024×768, 1280 and 1920×1080 with a shelf taller than its area; scroll the shelf to its end with
the wheel over it, pick a row, sell; then narrow the window to 1023 and widen it back.
PASS (→ UI_UX §SALE — DESK LAYOUT): the owner's desk arrangement, the tray never covering a shelf row; the shelf scrolls alone,
the ledger stays, the shelf keeps its scroll position after the pick (a redraw), the next customer starts at the top; 1023 draws
the phone SALE and 1024 the desk SALE again without error; 360 / 390 / 412 unchanged.
FAIL: the tray over the shelf, the ledger scrolling with the shelf, a shelf that jumps to the top after a pick, the phone's
forecast pin or second readout on a desk, or a layout that stays the other one after crossing 1024.

#### UI-Q-v29-26 — DEATH LIMIT ALWAYS VISIBLE

SETUP: MORNING and ORDER at 360 / 390 / 412 and 1280 with 0 Deaths, with 4 Deaths on D10 (one left), on D11 after the segment
step, and with 추모 방명록 worn.
PASS (→ UI_UX §DEATH LIMIT — ALWAYS VISIBLE; copy COPY_AUDIT §4-23): both screens show `사망 {n} / {limit} · D{end}까지` in the top
status line without scrolling, every Day; limit and end Day follow the current segment (5 · D10 / 8 · D20 / 11 · D30) and include
추모 방명록 / 위령제; warning color exactly when count = limit − 1; no popover, badge or extra text; never wraps mid-token or pushes
the ORDER confirm off the phone screen.
FAIL: the count only in the 도감, a stale segment limit, or a limit that ignores 추모 방명록 / 위령제.

#### GREAT SUCCESS TUTORIAL
PASS:
- no SALE coach mark on the signal
- the first store-bonus 대성공 names it on its NIGHT record, once per account (NIGHT_CLOSING §DISCOVERY LINE): extra preparation
  can raise its chance, and it leaves the Store an additional Gold bonus

#### FIRST DEEP TUTORIAL
PASS: not shown before the actual first Deep occurrence; shown on the account's first actual occurrence; not repeated next Run;
survives current Run abandon; full reset clears it and it appears again on the next first occurrence; teaches optionality, harder
Combat, nomination, sponsorship, NPC EXP/Wallet reward, Store Gold return=0.

### AUDIO

#### UI-Q114 — AUDIO AUDIBILITY / COVERAGE

Real-browser mobile audio check with Sound enabled.

PASS:
- at BGM 100% / SFX 100%, BGM stays clearly audible during ordinary play; SFX stay distinguishable above BGM; global SFX
  attenuation is not used merely to fake louder music
- BGM/SFX sliders and master mute work and persist; day / night / boss music states stay distinguishable
- no runtime network request is required for audio playback; any external asset has repository-local source/license evidence and
  a redistribution-compatible license
- the semantic SFX matrix is covered, including Decoration purchase/equip/unequip and other identified silent state-changing
  actions; every UI-requested cue resolves to an actual cue (no typo silently falls back to generic click)
- page hide / backgrounding stops or suspends audio without duplicate playback after resume

FAIL: 100% BGM still perceived as nearly absent on the real phone test; important state-changing actions silent without
deliberate rationale; every click given an intrusive unique sound; external audio hotlinked or with unclear/NC licensing.

#### UI-Q-v28-22 — DECISION / PHASE AUDIO

Verify the audio presentation contract reusing the owned audio architecture; acceptance does not depend on a particular asset
implementation. Listen on a real phone/browser to at least: repeated ORDER quantity changes; ORDER confirmation; SALE price
selection / success / refusal; Store Support acquisition; MORNING opening; NIGHT success / Great Success / retreat / injury /
severe injury / Death / rescue; CLOSING; Boss D5 / D10 / D15 / D20 / D25; FINAL commit.

PASS:
- meaningful decisions are semantically distinguishable by sound; Utility cues stay below Decision cues
- repeated quantity input stays short and non-fatiguing without harsh stacking
- ORDER confirmation reads as an order commit, not a generic click
- SALE success / refusal are clearly different without making one price mode sound correct
- Store Support acquisition is distinct from ordinary purchase and Relic acquisition
- NIGHT outcomes share a family but materially different results do not collapse to one pitch-shift cue; Death is restrained
  rather than celebratory / cinematic; rescue reads as recovery, not normal success
- Boss-information cues follow one motif/family; D10 / D20 stay smaller than D5 / D15 / D25; D30 adds no new-information audio
  signal; Final commit is heavy and clear without a cinematic framework
- DAY / NIGHT / BOSS-FINAL ambience identities are distinguishable enough to support phase mood; BGM / ambience stays below
  decision/result cues
- mute disables presentation audio; BGM and SFX settings keep control of their owned channels
- background / foreground transitions do not leak, duplicate or restart one-shot cues incorrectly
- audio playback changes no gameplay state and consumes no Gameplay RNG
- mobile and desktop run without audio-related console/runtime errors

External/new asset PASS: every shipped third-party audio asset has a recorded source, author, license and modification status;
third-party audio is vendored locally (no runtime hotlinking; offline runtime works); no shipped asset has unclear rights or a
license incompatible with the intended distribution.

FAIL:
- most actions still read as the same generic synth beep; utility navigation as loud or important as material decisions
- repeated input creates harsh overlapping sound; BGM masks copy / decisions / result cues
- one full new music track is treated as mandatory for every phase
- a parallel audio framework is introduced without need
- audio presentation changes gameplay truth or uses Gameplay RNG

#### UI-Q-v29-47 — PHASE BGM (v3.0, User 2026-09-29)

Verify UI_UX §AUDIO FEEDBACK — PHASE BGM / §SFX LEVELS / §DISTINCT CUES / §ENDING CUE on a real phone and on desktop. Listen to at
least: the store about to open → 첫 점포지원 → MORNING → ORDER → SALE → NIGHT → CLOSING; FINAL through at least one loop join; a
cleared ending and a failed ending.
PASS:
- each screen plays the track the mapping names (a cleared Run ends on SUCC, any failed Run on FAIL); a loop join is not heard as
  a cut, click or gap (BOSS: its 1 s crossfade); a phase change fades the old track out before the next rises, never two at once
- the Final and its clash play BOSS to the end; the ending track and cue (`endwin` / `endfail`) come in only as the result lands,
  also after a bankruptcy (CLOSE until then) and the Death limit (NIGHT until then)
- the tracks sound equally loud; at BGM 100% / SFX 100% the music is clearly audible while decision and result cues (a sale, a
  refusal, a NIGHT outcome, the Boss seal) read above it (UI-Q114); NIGHT does not feel louder than the other phases
- cues of one tier sound as one loudness (none jumps out or disappears; runtime evidence `tools/qa-sfx-mix.cjs`); on a phone
  speaker (Galaxy) the low cues (사망, the Boss beats, the clash scene, the FAIL ending) are heard at their tier and no cue buzzes,
  tears or crackles, alone or landing together
- cues that mean different things are told apart by ear: a Decoration fitted is not a FINAL hit, a SLOTH seal breaking is not a
  Boss reveal, the CLOSING receipt is not an ORDER crate, a menu click is not a quantity tick
- mute, the BGM slider, a hidden page and coming back behave as UI-Q-v28-22 requires; no audio-related console or runtime error;
  runtime evidence `tools/qa-bgm.cjs` (in `npm run qa:runtime`)
FAIL: a loop that plays an excerpt from the middle of a track instead of the track; an audible click, gap or double-play at a
join or a phase change; a phase that goes silent because a file failed to load; music that masks a decision or result cue; a cue
that tears or buzzes on a phone speaker, or clips when cues land together.

#### UI-Q-v29-48 — MORNING DAY SIGN FLIP (User 2026-09-29, v2.9.11)

Verify UI_UX §MORNING — DAY SIGN FLIP at 390 and 1280.
PASS: pressing `다음 날` and arriving at the next MORNING rolls the sign once, from yesterday's number to today's; the two numbers
never overlap mid-roll and nothing moves outside the sign; the sign lands on the plain number; a redraw of the same MORNING, a
reload and reduced motion show the still sign; no console or runtime error; runtime evidence: `tools/qa-day-flip.cjs` (in
`npm run qa:runtime`).
FAIL: the roll plays on every redraw or on a reload; the numbers overlap, or the sign's size jumps; the roll runs longer than
320 ms or plays a sound of its own.

#### UI-Q-v29-49 — IPHONE SAFARI (User 2026-09-29)

Verify UI_UX §TOUCH / INTERACTION (iPhone Safari) and §AUDIO FEEDBACK — PHASE BGM on a real iPhone (iOS 16 or later).

PASS:
- tapping quantity + quickly several times changes the quantity and never zooms the page; pinch zoom still works
- a long press on a customer portrait or the FINAL Boss opens no save-image menu
- `소리 켜기` starts the sound on the first tap
- after a phone call or another app, the music comes back on return or at the latest on the next tap
- with the silent switch on, the game is silent and music from another app keeps playing
- on an iPhone SE and a Galaxy with its bars (UI_UX §SHORT PHONE): 새 점포 준비 shows the title clear of the 간판 and its tag -
  `들일 수 있음` included - and the status line on the board; MORNING shows the Event whole (its effect line included) and the top
  of the first Gate without scrolling
- no console or runtime error
- runtime evidence (Chromium): `tools/qa-bgm.cjs` resumes a suspended context on return; `tests/ui-guard.cjs` UI-Q-v29-49;
  `tools/qa-visual.cjs` runs every screen at 375x548 and 360x597

FAIL: the page zooms on a quick double tap; the save-image menu opens on art; the sound stays off after coming back and tapping;
the game stops another app's music; on an iPhone SE, a tag or a line over the title or off the board, or the Event's effect line
cut on MORNING.

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
