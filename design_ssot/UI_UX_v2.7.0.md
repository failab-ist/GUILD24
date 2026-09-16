# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings,typography,visual_material
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged v2.6.1 SALE desktop/mobile hierarchy, Menu/Settings functional composition, Night controls, touch-target requirements, scroll/focus continuity, portrait preload, and Order phase flow inherit `UI_UX_v2.6.1.md`.

This patch adds only v2.7 information-boundary, handling, Final-timeline, and visual-language changes.

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

After an actual purchase commits, current Forecast/readiness may update because the current state has actually changed.

## SALE — REFUSAL PRICE CEILING UI

Follow `SALE_v2.7.0.md`.

For the same customer + same SKU + current visit:
- after 50% refusal, 100% and 150% controls are disabled
- after 100% refusal, 150% is disabled
- after 150% refusal, lower-price controls may remain usable

Requirements:
- disabled higher-price states are visually distinct and non-interactive
- Player can read why the option is blocked; exact short copy may be implementation/localization-owned unless separately frozen
- do not disable unrelated SKUs
- do not carry the same-SKU visit lock into a later visit unless another owner explicitly defines persistence

The UI must not invite a higher-price reroll after a lower-price refusal.

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

## FINAL MODIFIER PREVIEW — v2.7 DELTA

Keep the inherited rule that a Boss-caused change to a Player-visible value is shown as actual `original -> applied` data before Final lock.

For GLUTTONY specifically, the inherited Rare+/raw-Stat preview scope is stale.
Use the current `BOSS_v2.7.0.md` truth:
- preview the positive Core-Stat contribution originating from Items before -> after the ×0.50 Boss effect
- no Rarity threshold
- do not show Counter / Supply / Insurance / Utility / harmful RiskReward penalty as reduced by this effect

Player-facing identity uses `탐식의 마왕 글러트니`.
Exact changed Trait title/prose is owned by `COPY_WORLD_VOICE_v2.7.0.md`.

## TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER

Hazard tutorial teaches:
- each Hazard pressures a Core Stat
- natural Stat and Item Counter both contribute
- readiness is summarized by 취약/불안/대응/충분

Supply/Fatigue tutorial teaches:
- required Supply is paid first
- remaining Supply reduces current Fatigue
- further remaining Supply reduces that expedition's Fatigue gain
- conditional Night numbers are exact arithmetic, not predicted Outcome

Do not teach `독이면 X 아이템을 사세요` or equivalent solution scripts.

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
- 50/100/150 immediate scanability
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

## RELATED

Sale interaction -> `SALE_v2.7.0.md`
Economy/Order forecast -> `ECONOMY_ORDER_v2.7.0.md`
Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Night result -> `NIGHT_CLOSING_v2.7.0.md`
Final timeline -> `CORE_RUN_v2.7.0.md`
Boss modifier truth -> `BOSS_v2.7.0.md`
Copy -> `COPY_WORLD_VOICE_v2.7.0.md`
