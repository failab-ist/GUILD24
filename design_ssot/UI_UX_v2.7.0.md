# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings,typography,visual_material,final_preparation_ui
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged v2.6.1 SALE desktop/mobile hierarchy, Menu/Settings functional composition, Night controls, touch-target requirements, scroll/focus continuity, portrait preload, and Order phase flow inherit `UI_UX_v2.6.1.md`.

This patch adds v2.7 information-boundary, handling, pre-supply expedition outlook, Final-timeline, Final-preparation, tutorial fresh-init, and visual-language changes.

The Menu keeps the same Run-abandon action in the same functional location.
Exact v2.7 label:

```text
현재 지점 포기
```

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

## MORNING — SUPPLY DELTA

Keep the existing Morning Board structure.
Replace qualitative Supply-burden wording with exact public requirement:

```text
필요 보급 0
필요 보급 3
필요 보급 5
```

Do not add explanatory recommendation prose or new Supply qualitative labels.

## MORNING — NEXT-DAY GATE FORECAST — REQUIRED

Before ORDER, Morning must expose both next-day Gate quantity pressure and Tier difficulty pressure.

Required information:

```text
내일 전망

게이트 수
1개 xx% · 2개 xx% · 3개 xx%

게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

If next-day Gate count is deterministic, show the fixed result instead of a fake distribution:

```text
게이트 수
2개 확정
```

Rules:
- Gate-count probability/fixed-count truth follows `DUNGEON_HAZARD_v2.7.0.md`
- Tier probability truth follows `DUNGEON_HAZARD_v2.7.0.md`
- current-day Gate/Hazard remains the primary preparation information
- next-day forecast is a secondary future signal
- do not reveal next-day Family / exact Gate composition / Hazard set
- do not reveal future customer identity / destination
- do not add recommended Item/category/quantity prose
- ORDER may repeat the same forecast compactly; it must not generate a second value

Design intent:

```text
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
```

## ORDER — ITEM INFORMATION HIERARCHY

Do not add redundant role chips.
Within an offer/item card, visual priority is:

1. Item identity
2. exact actual effect
   - Core Stat
   - Hazard Counter
   - Supply
   - explicit penalty
3. economy / stock metadata
4. quantity interaction

Examples such as `속박 대응 +16` already communicate function; do not add a second `속박 전문` chip.
No today-fit/recommended badge.

## ORDER — WAREHOUSE DISCLOSURE

Always-visible summary must keep capacity readable.
Example:

```text
창고 4 / 18 · 4종
```

On mobile, the individual held-stock list may be collapsible.
- default collapsed is allowed
- open/closed state persists during the current ORDER session
- used/remaining capacity is never hidden inside the collapsed detail

## DANGER DETAIL BOUNDARY

Detailed risk view may show:
- Hazard name
- pressured Core Stat label
- Required Supply
- system-level meaning of readiness signal

Do not show:
- recommended SKU
- recommended Item category
- optimal combination
- exact hidden Hazard requirement/threshold/formula

Tutorial teaches how to read the system, not what to buy.

## SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT

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
- exact 실패 시 사망 위험 %
- existing Injury/Condition state that is already part of that snapshot

Do not show:
- exact expedition Success probability
- exact hidden Hazard threshold/formula
- exact Great Success probability

The displayed 실패 시 사망 위험 % follows the exact pre-supply calculation owned by `DUNGEON_HAZARD_v2.7.0.md`. It means the chance that an ordinary failed expedition escalates to Death; it is not the unconditional probability of Death across all expedition attempts.

After any Item purchase commits during the same customer visit:
- displayed Combat Forecast remains the original pre-supply snapshot
- displayed Hazard Readiness remains the original pre-supply snapshot
- displayed 실패 시 사망 위험 % remains the original pre-supply snapshot
- do not replace them with post-commit `접전 -> 우세`, `불안 -> 충분`, or `12% -> 5%` answer feedback

The underlying runtime preparation **does** change.
Actual expedition Resolve uses the final committed Items / Supply / Fatigue / Condition state.

Post-commit feedback should instead explain exact actual changes and their sources:
- direct Item Stat / Counter / Supply
- proven Supply Deficit relief
- proven Fatigue recovery / penalty-band change
- another explicitly owned Trait / Relic / Boss effect

This keeps the UI informative without grading the Player's Item choice before the remaining-slot decision.

### Exact player-facing copy

Header:

```text
보급 전 원정 전망
```

Failure-risk label:

```text
실패 시 사망 위험
```

Supporting copy:

```text
아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.
보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.
```

Exact copy ownership -> `COPY_WORLD_VOICE_v2.7.0.md`.

## SALE — FOUR CORE STATS REMAIN PRIMARY INFORMATION

Do not move 투력 / 강인함 / 기동 / 정신 behind a detail accordion merely to simplify the screen.
Visible Stat growth is part of NPC progression feedback.

When an actual source changes a Stat, keep the small actual source treatment inherited from v2.6.1.
Calculation breakdown belongs in touch/click detail.

## SALE — GATE VS ITEM INFORMATION

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
Supply +N
explicit penalty
```

Do not expose the Gate's exact Counter requirement.

## SALE — DECISION-ONLY ITEM DETAIL

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
- exact Supply
- explicit penalty
- Insurance behavior when relevant
- price / stock / affordability

Flavor text may remain in Item data or another already-existing non-decision context.
This rule does not require a new encyclopedia/detail screen.

## SALE — UNCOMMITTED PREVIEW

Follow `SALE_v2.7.0.md`.

For an uncommitted selected Item, UI may show:
- Item exact effect
- selected price / affordability
- deterministic Supply/Fatigue arithmetic

Do not show hypothetical derived answer changes such as:
- `접전 -> 우세`
- `불안 -> 충분`
- Great Success signal change

After an actual purchase commits, the displayed pre-supply Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot does not update. Exact proven value/effect changes may still be shown through the post-commit source-truth treatment below.

## SALE — POST-COMMIT DELTA SOURCE TRUTH

Do not update the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 after a committed purchase.
Instead, show exact actual changed values/effects with truthful source attribution where useful.
Do not make a derived preparation change look like a hidden direct Item effect.

If delta text is shown:
- every changed line must be an actual runtime change
- each changed line must expose a readable source class when the cause is not the Item's direct listed effect
- an Item directly changes only the channels listed in `ITEM_v2.7.0.md`
- reducing an active **Supply Deficit** may legitimately improve effective 투력/강인함/기동/정신 and underlying Hazard preparation through the inherited unified Supply system
- this must read as `보급 부족 완화` or equivalent system-source feedback, not as if the Item itself granted those four Stats or as a newly recalculated Hazard Readiness label
- excess Supply that lowers current Fatigue may restore effective 기동/정신 when a Fatigue penalty band changes; this must read as `피로 완화` / Condition-derived feedback
- do not expose the hidden Supply-deficit formula merely to explain the delta

Current `집중 사탕` is the canonical clarity example:

```text
직접 효과 = 공포 대응 +10 / Supply 3
```

Therefore:
- without a Supply Deficit change or Fatigue penalty-band change, it must not show a Core-Stat increase
- if its Supply reduces an active Supply Deficit, all four effective Core Stats may rise as a **보급 부족 완화** result
- if excess Supply also crosses a Fatigue penalty band, 기동/정신 may additionally recover as a **피로 완화** result

A generic `보급 후 변화` block is acceptable only when direct Item effects and derived system effects are clearly separated.
If that distinction is not immediately readable, remove the synthetic block.
Do not use post-commit value feedback to replace the frozen pre-supply Forecast / Hazard Readiness / 실패 시 사망 위험 with a newly scored answer.

## SALE — REFUSAL PRICE CEILING UI

Follow `SALE_v2.7.0.md`.

For the same ordinary customer + same SKU + current visit:
- after 50% refusal, 100% and 150% controls are disabled
- after 100% refusal, 150% is disabled
- after 150% refusal, lower-price controls may remain usable

Requirements:
- disabled higher-price states are visually distinct and non-interactive
- Player can read why the option is blocked; exact short copy may be implementation/localization-owned unless separately frozen
- do not disable unrelated SKUs
- do not carry the same-SKU visit lock into a later visit unless another owner explicitly defines persistence
- this refusal-price UI does not appear in Final preparation because Final has no refusal roll and no 100/150 price modes

The ordinary SALE UI must not invite a higher-price reroll after a lower-price refusal.

## SUPPLY / FATIGUE PREVIEW

Display public deterministic arithmetic from `DUNGEON_HAZARD_v2.7.0.md`.

Example:

```text
보급 5 / 필요 3 · 피로 9 -> 출발 7
밤: 성공/대성공 10 · 퇴각 12 · 부상 13
```

This is conditional arithmetic, not Outcome prediction.

Player-facing Fatigue remains numeric.
Do not add new `양호/주의/위험` fatigue tiers.

When actual penalty is active:
- 10+ must have readable Stat-source feedback
- 20 must receive strong danger treatment

## BAG PRESENTATION

Do not add a separate `최종 준비 결과` dashboard to the Bag.
The two slots are the handling surface.

Show:
- contents
- focused slot
- replace/remove state
- sequential transaction state

Interaction mechanics -> `SALE_v2.7.0.md`.

## RETURNING NPC QUICK SURFACE

Use the latest snapshot owned by NPC_TRAIT/SALE.
Preferred compact form:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

On mobile it must not push Wallet / Expected Destination / Forecast out of the primary decision flow.
Expanded detail may show actual destination, Item names, and only proven contribution text.

## QUEUE

Do not expose new future-customer Job/Level/Destination/preparation-need hints.
Existing authorized queue-count presentation remains sufficient.

## NIGHT — v2.7 DELTA

Keep inherited `다음 / 전체 건너뛰기` controls and proven-causality rule.

Add readable actual arithmetic when relevant:

```text
피로 2 -> 출발 0 · 보급 회복 -2
원정 결과 +5 · 보급 완화 -3
밤 피로 2
```

If First Aid Kit Aftercare actually changed persistent Injury state, that proven contribution may be shown.
Do not add speculative failure-cause diagnosis.

## FINAL TIMELINE PRESENTATION

Reuse existing Morning/management/Final surfaces.
Do not add a permanent new Final dashboard.

Required beats:
- D0 Final objective notice
- D10 `FINAL까지 20일`
- D20 `FINAL까지 10일` + Recon dispatch beat
- D25 `FINAL까지 5일` + exact persisted Final Family/Hazard disclosure
- D30 reuse D25 state; no new Family reroll reveal

The inherited v2.6 wording that frames Final Family discovery as a new D30 `최종 정찰 보고` is superseded in timing.
If that existing report framing is reused, it belongs to the D25 disclosure beat.

Boss reveal timing -> `BOSS_v2.7.0.md`.
Final state -> `FINAL_EXPEDITION_v2.7.0.md`.

## FINAL PREPARATION UI — EXACT

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
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.7.0.md`
- Boss-caused visible Item changes use the actual current Final truth

No extra GREED-specific counter panel is required solely for this transfer; use the existing Gross Sales truth and current Boss presentation.

## FINAL MODIFIER PREVIEW — v2.7 DELTA

Keep the inherited rule that a Boss-caused change to a Player-visible value is shown as actual `original -> applied` data before Final lock.

For GLUTTONY specifically, the inherited Rare+/raw-Stat preview scope is stale.
Use the current `BOSS_v2.7.0.md` truth:
- preview the positive Core-Stat contribution originating from Items before -> after the ×0.50 Boss effect
- no Rarity threshold
- do not show Counter / Supply / Insurance / Utility / harmful RiskReward penalty as reduced by this effect

Player-facing identity uses `탐식의 마왕 글러트니`.
Exact changed Trait title/prose is owned by `COPY_WORLD_VOICE_v2.7.0.md`.

## PLAYTEST HOTFIX — MOBILE SALE PLAYABILITY

This amendment is phone-first. Desktop SALE is regression-protected but is not redesigned in this cycle.

At 360 / 390 / 412-class phone widths, ordinary SALE must prioritize the transaction surface over customer presentation.

### Vertical hierarchy

Within the usable SALE viewport above the fixed bottom dock:
- customer / expedition summary occupies about half or less
- Item selection / price / sale interaction receives at least about half
- this is a responsive proportion target, not a fixed-pixel split
- do not crop character art or force equal fixed heights that break on shorter phones
- at first entry, the sale surface must already show the shelf heading and at least one selectable Item row without requiring a scroll

Compact the upper area by reducing presentation footprint, not by hiding required decision information.

### Customer speech

Customer speech is a transient overlay and must not reserve permanent layout height.

Exact behavior:
- a new customer/reaction line overlays the upper customer area
- it auto-hides after 3 seconds
- tapping the bubble hides it immediately
- a newly emitted line starts a fresh 3-second display
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

### Bag

The two Bag slots remain exactly two.

On phone:
- place them in the available upper-right area
- arrange them 1 column × 2 rows
- each slot remains at least ~44px touch class and should be visibly larger than the current tiny pair
- keep "가방 used / 2" readable without a tall horizontal strip

### Store-support reference during ORDER / SALE

ORDER and SALE each provide a compact, immediately reachable reference to currently owned 점포지원.

Requirements:
- REUSE the existing owned-Relic data and existing Relic detail/modal content
- do not add a second Relic information system
- the control is available before the player commits the relevant ORDER / SALE decision
- keep the control compact enough that it does not compete with the primary decision surface
- on mobile, avoid retaining a second redundant owned-Relic block lower in SALE if the compact control already exposes the same information

### Pre-Run Decoration empty-slot interaction

A Decoration Slot with no equipped Decoration is a neutral state, not a warning.

Required:
- remove the inherited "주의 ·" treatment from "비움"
- each Slot row, including "비움", is actionable before a Run
- tapping a Slot row opens 점포 관리 focused/scrolled to that exact Slot
- REUSE the existing store-management panel; do not create a second Decoration selector
- during an active Run, keep the existing read-only/frozen-loadout rule

## PLAYTEST HOTFIX — AUDIO FEEDBACK

The current build already has separate BGM/SFX buses and semantic cues, but the playtest still reports BGM as materially too quiet and the feedback layer remains incomplete.

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
- ordinary 50% / 100% / 150% sale distinctions
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

## TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER

Hazard tutorial teaches:
- each Hazard pressures a Core Stat
- natural Stat and Item Counter both contribute
- readiness is summarized by 취약/불안/대응/충분

Supply/Fatigue tutorial teaches:
- required Supply is paid first
- a Supply Deficit applies one expedition-wide preparation penalty through the existing unified Supply system
- remaining Supply beyond the requirement reduces current Fatigue
- further remaining Supply reduces that expedition's Fatigue gain
- conditional Night numbers are exact arithmetic, not predicted Outcome

Do not teach the hidden Supply-deficit formula.
Do not teach `독이면 X 아이템을 사세요` or equivalent solution scripts.

## TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY — REQUIRED

A true fresh current account must actually see the tutorial entry again.

Follow `CORE_RUN_v2.7.0.md` for the exact fresh-init boundary.

Required:
- after Full Data Reset, tutorial completion/dismissal state is cleared
- on the first applicable flow of the newly initialized current account, the tutorial appears / starts according to the existing tutorial sequence
- stale v1~v7 tutorial flags must not suppress the tutorial after fresh v8 initialization
- deleting/rejecting legacy internal-test state and creating fresh v8 must produce the same tutorial-eligible state as a clean first install
- ordinary Run Abandon / new Run under the same current account does not need to replay the tutorial if the tutorial was already completed

Implementation must first audit whether the existing tutorial sequence still functions end-to-end.
If the tutorial already exists, reuse it and fix its trigger/persistence/reset path rather than creating a replacement tutorial system.

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

## MENU / SETTINGS VISUAL ONLY

Functional composition remains exactly inherited from v2.6.1.
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

## CONTRACT / RELIC VISUAL

Contract may remain card-like because it is a real parallel choice.
Selected state must not rely on color alone.
Relic keeps existing metal fixture/plate language; purchase reads as metal/brass transaction.

## TYPOGRAPHY — EXACT PAIR

```text
ATMOSPHERE = Mulmaru / 물마루
INFORMATION = Wanted Sans
```

v2.7 replaces Galmuri + Pretendard.
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

## FRANCHISE PROGRESS — EXISTING CODEX PLACEMENT

Franchise Achievement state is read in the place it is already read: the 도감 본사 header and its
진행도 tab. No Achievement screen, Achievement Tree or Notification/History subsystem is created
for this.

The Achievement list states, per row:

- the condition
- for the five cumulative ones, `current / target`
- for the other five, the completion verdict

```text
누적 판매 80회                    41 / 80
150% 판매 20회 성공                7 / 20
재방문 손님에게 20회 판매           20 / 20
점포지원 누적 15개 구매             15 / 15
다섯 게이트 전부에서 보급 생환        2 / 5
폐기 0개로 DAY 25 도달             미달성
```

A row that shows a running count does not also carry the caution styling the verdict rows use -
the number already states where the account stands, and `주의` next to `41 / 80` contradicts it.

The unlock board's 다음 해금 progress toward a Grade-gated Start Contract counts Franchise
Achievements, the same count the lock itself judges. Both come from the single Grade requirement
truth in `META_v2.7.0.md` §FRANCHISE PROGRESS READOUT.

### COMPLETION CUE

First completion of an Achievement is announced ONCE, through the existing Toast:

```text
가맹 실적 달성 · 점포지원 누적 15개 구매
```

If that same completion raised the Franchise Grade, the Grade step is readable in the same
feedback rather than requiring the codex to be opened:

```text
가맹 실적 달성 · 점포지원 누적 15개 구매 · 가맹등급 1 → 2
```

Rules:
- the cue is a before/after of the same state the codex shows, taken once where every crediting
  site arrives - a sale, a Relic purchase, a supplied survival, the DAY 25 morning, the end of a
  Run. Each site does not announce itself separately.
- an Achievement already held never announces again
- the standing view above is where it is read afterwards; the cue does not become a log

## RELATED

Sale interaction -> `SALE_v2.7.0.md`
Economy/Order/Final Wallet/Gold -> `ECONOMY_ORDER_v2.7.0.md`
Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Night result -> `NIGHT_CLOSING_v2.7.0.md`
Final timeline / fresh init -> `CORE_RUN_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Boss modifier truth -> `BOSS_v2.7.0.md`
Franchise Achievement / Grade truth -> `META_v2.7.0.md`
Copy -> `COPY_WORLD_VOICE_v2.7.0.md`
