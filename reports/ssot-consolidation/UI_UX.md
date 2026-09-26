# UI_UX consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/UI_UX_v2.8.0.md
CHAIN=design_ssot/UI_UX_v2.8.0.md,design_ssot/history/UI_UX_v2.7.0.md,design_ssot/history/UI_UX_v2.6.1.md,design_ssot/history/UI_UX_v2.6.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/UI_UX_v2.8.0-patch.md`; the v2.7.0 / v2.6.1 / v2.6.0 versions stay in `history/`.
UI_UX_QA_v2.8.0.md and the PRESENTATION_SYSTEM / PRESENTATION_POLISH* owners are separate owners and
were not merged; the target points to them (PRESENTATION POLISH ROUTING, AUDIO FEEDBACK, QA, RELATED).

Placement: ROLE / KEY / CORE UI PRINCIPLE / RETIRED ACTIVE UI, then the visual-language sections
(v2.6 VISUAL DIRECTION, v2.7 VISUAL MATERIAL / STRONG GREEN / TYPOGRAPHY, v2.8 presentation routing).
The v2.6 PHASE IDENTITY subsections become the MORNING / ORDER / SALE / NIGHT / CLOSING sections and
every later phase rule joins its phase: v2.7 Morning supply delta / next-day forecast and the
Deep Expedition Morning under MORNING; v2.6.1 ORDER flow / Reroll / continuity and v2.7 Item
hierarchy / warehouse under ORDER; v2.6.1 SALE authority, v2.8 customer state, v2.7 SALE rules, v2.8
selected-Item / permanent-explanation rules, Great Success signal (2026-09-12 amendment + v2.8
refresh rule), Deep SALE UI and Event budget under SALE; the v2.7 phone hotfix, v2.8 Bag compact
layout, v2.8 density and v2.7 Bag presentation under MOBILE SALE PLAYABILITY; v2.6.1 controls, v2.7
arithmetic and the v2.8 NIGHT LAYOUT under NIGHT. The v2.6 Boss / Final reveal UI, v2.7 Final
timeline and v2.8 Boss information presentation form one BOSS / FINAL REVEAL UI section (the v2.6
D30 recon report now the D25 disclosure beat, per v2.7). Final party (v2.8) and Final preparation
(v2.7) form one D30 section. Tutorial rules (v2.6 base, v2.7, 2026-09-12 amendment) are one
TUTORIAL section. There is one QA pointer (UI_UX_QA_v2.8.0.md) plus the kept v2.6 RESPONSIVE /
AI-SLOP and v2.7 FONT / VISUAL QA BOUNDARY checks.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

The v2.7 exact Run-abandon label `현재 지점 포기` is restated in the kept MENU / SETTINGS lines (`- 현재 지점 포기` top-level item and the kept v2.7 `uses exact label `현재 지점 포기`` sentence).

```text
## INHERITANCE
All unchanged v2.7 ORDER/SALE/NIGHT/Final/mobile/typography/tutorial/visual rules inherit
UI_UX_v2.7.0.md.
The Decoration/Store-Capital rules previously frozen in this file remain active.
## INHERITANCE
All unchanged v2.6.1 SALE desktop/mobile hierarchy, Menu/Settings functional composition, Night controls, touch-target requirements, scroll/focus continuity, portrait preload, and Order phase flow inherit `UI_UX_v2.6.1.md`.
This patch adds v2.7 information-boundary, handling, pre-supply expedition outlook, Final-timeline, Final-preparation, tutorial fresh-init, and visual-language changes.
The Menu keeps the same Run-abandon action in the same functional location.
Exact v2.7 label:
현재 지점 포기
## INHERITANCE
All unchanged UI/UX rules inherit `UI_UX_v2.6.0.md`.
This patch overrides conflicting stale SALE layout, NIGHT control, Menu/Settings, ORDER interaction, and runtime continuity text.
Functional composition remains exactly inherited from v2.6.1.
```


## LEGACY — version / change narration and playtest history

The rule each line frames is kept: the D25 reuse of the recon-report framing is kept as the v2.7 sentence under `### D25 — 최종 정찰 보고`; the font pair and "no third font family" rule are kept; the NIGHT death-plate rule is kept (its reworded first line is under REWORD); the Audio requirements are kept whole.

```text
Director resolution for v2.6.1:
This overrides the older v2.6.0 wording that placed these elements differently.
The inherited v2.6 wording that frames Final Family discovery as a new D30 `최종 정찰 보고` is superseded in timing.
For GLUTTONY specifically, the inherited Rare+/raw-Stat preview scope is stale.
The current build already has separate BGM/SFX buses and semantic cues, but the playtest still reports BGM as materially too quiet and the feedback layer remains incomplete.
v2.7 replaces Galmuri + Pretendard.
- AMENDED, 2026-09-22: the translucent dark plate sat so close to the NIGHT background that it
## v2.6.0 UPDATE: UI & UX
```


## LEGACY — restatements of rules kept verbatim elsewhere in the target

v2.6.0 top block (the "v2.6.0 UPDATE" summary): Night two-button controls are restated by the kept v2.6.1 NIGHT — EXACT CONTROLS; Menu / Settings moves are restated by the kept v2.6.1 MENU / SETTINGS — EXACT COMPOSITION (`설정`, Settings contents, `Settings does **not** contain: 현재 지점 포기`); 폭식 -> 탐식 and 전리품 -> NPC 소지금 획득 are restated in the kept v2.6.1 terminology list. v2.6.1 `Core question: 무엇을 준비할까?` restates the kept v2.6 `question=`무엇을 준비할까?``. v2.6.1 `Rename: 설정 · 저장 -> 설정` is carried by the kept top-level list (`- 설정`) and the kept terminology line `- 설정 · 저장 -> 설정`. v2.7 `The two Bag slots remain exactly two.` restates the kept v2.8 `The normal customer Bag remains exactly two slots.` v2.7 "Keep the inherited rule ... original -> applied" restates the kept v2.6 FINAL MODIFIER PREVIEW (`Before Final Lock, whenever a Boss changes a Player-visible value, show: original → applied`).

```text
### NIGHT UI
- 건너뛰기 삭제. 다음 / 전체 건너뛰기 2-button 체제.
### MENU / SETTINGS
- Menu Top-level: 설정 · 저장 → 설정. Sound Toggle 및 Full Data Reset은 Settings 내부로 이동.
- Settings 내부 '현재 지점 포기' 제거.
### COPY
- 폭식 → 탐식
- 전리품 → NPC 소지금 획득
## ORDER — v2.6.1
Core question:
`무엇을 준비할까?`
Rename:
- `설정 · 저장` -> `설정`
The two Bag slots remain exactly two.
Keep the inherited rule that a Boss-caused change to a Player-visible value is shown as actual `original -> applied` data before Final lock.
```


## SUPERSEDED — v2.6.0 SALE layout wording, replaced by v2.6.1 SALE DESKTOP / MOBILE AUTHORITY

v2.6.1 states: "This overrides the older v2.6.0 wording that placed these elements differently." The kept v2.6.1 bullets are the current layout.

```text
### SALE LAYOUT
- **Desktop**: 캐릭터 우측 상단 활용. 왼쪽 가방 크기 대폭 확대. 그 아래에 '전투 전망', 그 아래 '예상 목적지' 배치. 하단 기존 패널 삭제.
- **Mobile**: 캐릭터/상태 세로 길이 축소 (Artwork crop 없이). 가방 확대. 가방 아래 '예상 목적지 작게'. 지난 원정 정보 아래 '전투 전망'. 하단 기존 패널 삭제.
```


## SUPERSEDED — Stat-source modal, replaced by the v2.8 shared anchored popover

v2.8: "Use one lightweight anchored popover language for: Stat source ..." / "Reuse the existing out-of-flow tip/popover presentation rather than create a second modal system" / HELP "Per-value/context explanations use anchored popovers, not a modal/accordion". The breakdown content stays reachable: v2.7 "Calculation breakdown belongs in touch/click detail." is kept.

```text
- Stat 터치 시: Source / 실제 적용값 / 계산 과정 모달 표출.
```


## SUPERSEDED — v2.6 NIGHT `Next / Skip / Skip All` controls, replaced by exactly `다음` / `전체 건너뛰기` (v2.6.1)

```text
Controls:
Next / Skip / Skip All
```


## SUPERSEDED — `Do not show: exact death %`, replaced by the exact conditional 실패 시 사망 위험 % (v2.7)

The v2.7 SALE pre-supply outlook shows "exact 실패 시 사망 위험 %" and defines it as the chance an ordinary failed expedition escalates to Death, not the unconditional Death probability. The newer qualified rule replaces the older unqualified one. `exact success %` and `fake precision` bans stay.

```text
- exact death %
```


## SUPERSEDED — Great Success signal "update when preparation changes", replaced by commit-only refresh (v2.7 / v2.8)

v2.7 UNCOMMITTED PREVIEW forbids a "Great Success signal change" on an uncommitted Item; v2.8 GREAT SUCCESS SIGNAL: "No signal change while merely selecting/previewing an Item. After a successful purchase commits, refresh only the Great Success signal from the committed Bag." Both are kept.

```text
- update when preparation changes
```


## SUPERSEDED — GLUTTONY Rare+/raw-Stat preview scope, replaced by the ×0.50 all-Item positive Core-Stat scope (v2.7)

v2.7: "the inherited Rare+/raw-Stat preview scope is stale." The kept v2.7 bullets (no Rarity threshold, Counter / Supply / Insurance / Utility / penalty not shown reduced) sit under GLUTTONY.

```text
- affected 보급품 raw Stat contribution
```


## SUPERSEDED — D30 Final Family Pair reveal, replaced by D25 disclosure / D30 reuse (v2.7 timing)

v2.7 FINAL TIMELINE: "D25 ... exact persisted Final Family/Hazard disclosure" / "D30 reuse D25 state; no new Family reroll reveal". The D30 Relic / Sloth window and Final preparation part is kept (reworded, see REWORD); the recon-report content moves to the D25 heading.

```text
`Final Family Pair` focused reveal -> D30 Relic window decision (`Relic 획득` vs `봉인 해제` for Sloth) -> Final preparation / lock
```


## SUPERSEDED — Outcome-by-Outcome Night Fatigue line and its tutorial bullet (v2.8 FATIGUE SURFACE)

v2.8: "Do not show future Outcome-by-Outcome Fatigue table." (COPY_AUDIT_APPROVED_v2.8.0 §4-11 미래 피로표 -> 삭제). The tutorial bullet taught that removed `밤:` line, so it goes with it. The `보급 5 / 필요 3 · 피로 9 -> 출발 7` example line stays.

```text
밤: 성공/대성공 10 · 퇴각 12 · 부상 13
- conditional Night numbers are exact arithmetic, not predicted Outcome
```


## SUPERSEDED — pre-supply outlook `Supporting copy` paragraph (v2.8 SALE PERMANENT EXPLANATION)

v2.8: "Do not keep a permanent explanatory paragraph under the readout." (also UI_UX_QA_v2.8.0 UI-Q-v28-15, PRESENTATION_POLISH_BATCH2). The explanation is on demand through the shared anchored popover. The header `보급 전 원정 전망` and label `실패 시 사망 위험` stay.

```text
Supporting copy:
아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.
보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.
```


## SUPERSEDED — phone Bag `1 column × 2 rows`, replaced by the v2.8 always-horizontal Bag

v2.8 SALE BAG COMPACT LAYOUT — EXACT: "the two slot boxes are always horizontal" / "the two slot boxes themselves never stack vertically".

```text
- arrange them 1 column × 2 rows
```


## SUPERSEDED — Run-abandon identity / action / confirmation copy `현재 런 포기`, replaced by `현재 지점 포기` (v2.6.1 / v2.7) and the exact COPY_AUDIT_APPROVED confirm copy

v2.7: "uses exact label `현재 지점 포기`"; the exact confirmation title / body are owned by COPY_AUDIT_APPROVED_v2.8.0.md §1-3 (see the reworded pointer line under REWORD).

```text
Identity=`현재 런 포기`.
Preferred action:
`현재 런 포기 · 새 점포 준비`
```


## SUPERSEDED / RETIRED — Franchise Grade, Franchise Achievement, Start Contract UI (META_v2.8.0 retired systems)

The kept v2.8 RETIRED ACTIVE UI forbids exposing Franchise Grade, the Franchise Achievement list/progress/toast, Grade ORDER discount, Start Contract selection and Grade-gated Start Contract unlock progress; archive policy stays in META_v2.8.0.md. `Selected state must not rely on color alone.` (a Contract-card line) is restated by the kept ACCESSIBILITY / SIGNALS rule (`Do not rely on color alone for: ... selected state`).

```text
- Franchise Grade derived from Total Job Mastery
- Start Contract availability gated by Franchise Grade
Franchise Grade itself must not imply hidden gameplay bonuses.
Its progression function is to open selectable Start Contract options.
Start Contract UI:
- default/standard contract is available from a fresh account
- locked non-default contracts communicate their required Franchise Grade
- an unlocked contract is shown as available for selection, not as an automatically active bonus
- do not present legacy Day / Run-count / regular-customer / adventurer-level conditions as current unlock truth
Contract may remain card-like because it is a real parallel choice.
Selected state must not rely on color alone.
## FRANCHISE PROGRESS — EXISTING CODEX PLACEMENT
Franchise Achievement state is read in the place it is already read: the 도감 본사 header and its
진행도 tab. No Achievement screen, Achievement Tree or Notification/History subsystem is created
for this.
The Achievement list states, per row:
- the condition
- for the five cumulative ones, `current / target`
- for the other five, the completion verdict
누적 판매 80회                    41 / 80
150% 판매 20회 성공                7 / 20
재방문 손님에게 20회 판매           20 / 20
점포지원 누적 15개 구매             15 / 15
다섯 게이트 전부에서 보급 생환        2 / 5
폐기 0개로 DAY 25 도달             미달성
A row that shows a running count does not also carry the caution styling the verdict rows use -
the number already states where the account stands, and `주의` next to `41 / 80` contradicts it.
The unlock board's 다음 해금 progress toward a Grade-gated Start Contract counts Franchise
Achievements, the same count the lock itself judges. Both come from the single Grade requirement
truth in `META_v2.7.0.md` §FRANCHISE PROGRESS READOUT.
### COMPLETION CUE
First completion of an Achievement is announced ONCE, through the existing Toast:
가맹 실적 달성 · 점포지원 누적 15개 구매
If that same completion raised the Franchise Grade, the Grade step is readable in the same
feedback rather than requiring the codex to be opened:
가맹 실적 달성 · 점포지원 누적 15개 구매 · 가맹등급 1 → 2
Rules:
- the cue is a before/after of the same state the codex shows, taken once where every crediting
  site arrives - a sale, a Relic purchase, a supplied survival, the DAY 25 morning, the end of a
  Run. Each site does not announce itself separately.
- an Achievement already held never announces again
- the standing view above is where it is read afterwards; the cue does not become a log
Franchise Achievement / Grade truth -> `META_v2.7.0.md`
```


## REWORD — cross-owner pointers name the current owner file

```text
-> EVENT
-> DUNGEON_HAZARD
-> NPC_TRAIT
-> RELIC
Boss gameplay ownership -> BOSS  
Final Family ownership -> FINAL_EXPEDITION  
Exact Player-facing wording -> COPY_WORLD_VOICE
Meta gameplay ownership -> META
-> COPY_WORLD_VOICE
- Gate-count probability/fixed-count truth follows `DUNGEON_HAZARD_v2.7.0.md`
- Tier probability truth follows `DUNGEON_HAZARD_v2.7.0.md`
The displayed 실패 시 사망 위험 % follows the exact pre-supply calculation owned by `DUNGEON_HAZARD_v2.7.0.md`. It means the chance that an ordinary failed expedition escalates to Death; it is not the unconditional probability of Death across all expedition attempts.
Exact copy ownership -> `COPY_WORLD_VOICE_v2.7.0.md`.
Follow `SALE_v2.7.0.md`.
- an Item directly changes only the channels listed in `ITEM_v2.7.0.md`
Display public deterministic arithmetic from `DUNGEON_HAZARD_v2.7.0.md`.
Interaction mechanics -> `SALE_v2.7.0.md`.
Boss reveal timing -> `BOSS_v2.7.0.md`.
Final state -> `FINAL_EXPEDITION_v2.7.0.md`.
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.7.0.md`
Use the current `BOSS_v2.7.0.md` truth:
Exact changed Trait title/prose is owned by `COPY_WORLD_VOICE_v2.7.0.md`.
Follow `CORE_RUN_v2.7.0.md` for the exact fresh-init boundary.
```

```new
-> EVENT_v2.8.0.md
-> DUNGEON_HAZARD_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md
-> RELIC_v2.8.0.md
Boss gameplay ownership -> BOSS_v2.8.0.md
Final Family ownership -> FINAL_EXPEDITION_v2.8.0.md
Exact Player-facing wording -> COPY_AUDIT_APPROVED_v2.8.0.md
Meta gameplay ownership -> META_v2.8.0.md
-> COPY_WORLD_VOICE_v2.8.0.md
The displayed 실패 시 사망 위험 % follows the exact pre-supply calculation owned by `DUNGEON_HAZARD_v2.8.0.md`. It means the chance that an ordinary failed expedition escalates to Death; it is not the unconditional probability of Death across all expedition attempts.
Exact copy ownership -> `COPY_WORLD_VOICE_v2.8.0.md` §PRE-SUPPLY EXPEDITION OUTLOOK — EXACT COPY; help lines -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-1.
Follow `SALE_v2.8.0.md`.
- an Item directly changes only the channels listed in `ITEM_v2.8.0.md`
Display public deterministic arithmetic from `DUNGEON_HAZARD_v2.8.0.md`.
Interaction mechanics -> `SALE_v2.8.0.md`.
Boss reveal timing -> `BOSS_v2.8.0.md`.
Final state -> `FINAL_EXPEDITION_v2.8.0.md`.
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
Use the current `BOSS_v2.8.0.md` truth:
Exact changed Trait title/prose is owned by `COPY_AUDIT_APPROVED_v2.8.0.md`.
Follow `CORE_RUN_v2.8.0.md` for the exact fresh-init boundary.
```


## REWORD — QA pointer names the current UI QA owner

```text
Acceptance criteria -> UI_UX_QA_v2.5.0.md
```

```new
Acceptance criteria -> UI_UX_QA_v2.8.0.md
```


## REWORD — Presentation routing: the Batch pointer follows SPEC_INDEX_v2.8.0 (Batches 1-5 are closed; each owns its surfaces)

```text
Active Presentation Batch 1:
```

New form (superseded; see REWORD — presentation pointers (User decision 2026-09-23)).


## REWORD — version framing / inheritance words removed, rule kept

```text
When an actual source changes a Stat, keep the small actual source treatment inherited from v2.6.1.
Keep inherited `다음 / 전체 건너뛰기` controls and proven-causality rule.
This amendment is phone-first. Desktop SALE is regression-protected but is not redesigned in this cycle.
Store Capital / Decoration management and run-end settlement requirements from the previous v2.8
Decoration package remain active exactly as owned by META_v2.8.0.md and CORE_RUN_v2.8.0.md.
No new Collection screen is added in v2.8 solely to preserve that Flavor.
Existing reveal sequence remains:
Required v2.5 mobile visual QA widths:
```

```new
When an actual source changes a Stat, keep the small actual source treatment.
Keep `다음 / 전체 건너뛰기` controls and proven-causality rule.
This section is phone-first. Desktop SALE is regression-protected.
Store Capital / Decoration management and run-end settlement requirements remain active exactly as owned by META_v2.8.0.md and CORE_RUN_v2.8.0.md.
No new Collection screen is added solely to preserve that Flavor.
Reveal sequence:
Required mobile visual QA widths:
```


## REWORD — post-commit block heading relabelled to the current heading `판매 후 변화` (COPY_AUDIT_APPROVED_v2.8.0 §4-4, UI_UX_QA_v2.8.0 UI-Q-v28-15); direct-vs-derived rule kept

```text
A generic `보급 후 변화` block is acceptable only when direct Item effects and derived system effects are clearly separated.
```

```new
A generic `판매 후 변화` block is acceptable only when direct Item effects and derived system effects are clearly separated.
```


## REWORD — NIGHT death plate: 2026-09-22 amendment narration removed from the first rule line

The dropped narration line is under LEGACY; the rest of the plate rule is kept verbatim.

```text
  read as bare text again. The plate is a COOL SLATE / BLUE-BLACK surface clearly one step
```

```new
- The plate is a COOL SLATE / BLUE-BLACK surface clearly one step
```


## REWORD — dead clauses trimmed

Phone Bag: "visibly larger than the current tiny pair" compares against a past build. D30 reveal: the `Final Family Pair` focused reveal moved to D25 (see SUPERSEDED); the D30 Relic / Sloth window and Final preparation clause stays. Run abandon: the superseded `현재 런` confirmation copy is replaced by the pointer to the current exact copy owner; `Confirmation must clearly communicate:` is kept.

```text
- each slot remains at least ~44px touch class and should be visibly larger than the current tiny pair
`현재 런을 보상 없이 포기하고 새 점포를 시작합니다.`
```

```new
- each slot remains at least ~44px touch class
D30 Relic window decision (`Relic 획득` vs `봉인 해제` for Sloth) -> Final preparation / lock
exact confirmation copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` (현재 지점 포기 Confirm)
```


## REWORD — RELATED: v2.6.0 and v2.7.0 lists merged, current owner files

The v2.7 `Franchise Achievement / Grade truth` line is dropped under RETIRED above.

```text
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
Sale interaction -> `SALE_v2.7.0.md`
Economy/Order/Final Wallet/Gold -> `ECONOMY_ORDER_v2.7.0.md`
Fatigue/Supply -> `DUNGEON_HAZARD_v2.7.0.md`
Night result -> `NIGHT_CLOSING_v2.7.0.md`
Final timeline / fresh init -> `CORE_RUN_v2.7.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Boss modifier truth -> `BOSS_v2.7.0.md`
Copy -> `COPY_WORLD_VOICE_v2.7.0.md`
```

```new
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
UI acceptance -> UI_UX_QA_v2.8.0.md
```


## REWORD — section headings: version tags removed, one level scheme (## topic / ### subsection)

Phase subsections of v2.6 PHASE IDENTITY are promoted to `##`; later-version `##` sections that now live inside a topic become `###`. Container / amendment headings whose content is distributed are dropped (v2.6.0 `APPROVED_AMENDMENT_2026_09_12`, v2.8 `COPY-SURFACE RE-AUDIT — EXACT`, v2.8 `SALE BAG COMPACT LAYOUT — EXACT` merged into `### Bag`, v2.7 `FINAL MODIFIER PREVIEW — v2.7 DELTA` merged into `### FINAL MODIFIER PREVIEW`, v2.8 `GREAT SUCCESS SIGNAL` merged into `### GREAT SUCCESS OPPORTUNITY SIGNAL`). The v2.6 `### D30 — 최종 정찰 보고` becomes the D25 disclosure heading per v2.7 ("If that existing report framing is reused, it belongs to the D25 disclosure beat.").

```text
### MORNING
### ORDER
### SALE
### NIGHT
### CLOSING
### D30 — 최종 정찰 보고
## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION / RUN ABANDON UX
### RUN ABANDON UX
## SALE — DESKTOP AUTHORITY
## SALE — MOBILE AUTHORITY
## NIGHT — EXACT CONTROLS
## COPY / TUTORIAL UX RECOVERY
## MORNING — SUPPLY DELTA
## MORNING — NEXT-DAY GATE FORECAST — REQUIRED
## ORDER — ITEM INFORMATION HIERARCHY
## ORDER — WAREHOUSE DISCLOSURE
## SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT
### Exact player-facing copy
## SALE — FOUR CORE STATS REMAIN PRIMARY INFORMATION
## SALE — GATE VS ITEM INFORMATION
## SALE — DECISION-ONLY ITEM DETAIL
## SALE — UNCOMMITTED PREVIEW
## SALE — POST-COMMIT DELTA SOURCE TRUTH
## SALE — REFUSAL PRICE CEILING UI
## BAG PRESENTATION
## RETURNING NPC QUICK SURFACE
## QUEUE
## NIGHT — v2.7 DELTA
## FINAL TIMELINE PRESENTATION
## FINAL PREPARATION UI — EXACT
## FINAL MODIFIER PREVIEW — v2.7 DELTA
## PLAYTEST HOTFIX — MOBILE SALE PLAYABILITY
## PLAYTEST HOTFIX — AUDIO FEEDBACK
## TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER
## TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY — REQUIRED
## MENU / SETTINGS VISUAL ONLY
## CONTRACT / RELIC VISUAL
## MOBILE SALE DENSITY
## CURRENT CUSTOMER STATE
## SALE BAG COMPACT LAYOUT — EXACT
## FATIGUE SURFACE
## GREAT SUCCESS SIGNAL
## NIGHT LAYOUT
## BOSS INFORMATION PRESENTATION
## EVENT TEMPORARY BUDGET
## STORE SUPPORT OWNED REFERENCE
## STORE GROWTH SURFACE
## COPY-SURFACE RE-AUDIT — EXACT
```

```new
## MORNING
## ORDER
### ORDER — ITEM INFORMATION HIERARCHY
### ORDER — WAREHOUSE DISCLOSURE
## SALE
### SALE — DESKTOP AUTHORITY
### SALE — MOBILE AUTHORITY
### CURRENT CUSTOMER STATE
### SALE — FOUR CORE STATS REMAIN PRIMARY INFORMATION
### SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT
#### Exact player-facing copy
### SALE — GATE VS ITEM INFORMATION
### SALE — DECISION-ONLY ITEM DETAIL
### SALE — UNCOMMITTED PREVIEW
### SALE — POST-COMMIT DELTA SOURCE TRUTH
### SALE — REFUSAL PRICE CEILING UI
### RETURNING NPC QUICK SURFACE
### QUEUE
### EVENT TEMPORARY BUDGET
## MOBILE SALE PLAYABILITY
### MOBILE SALE DENSITY
### BAG PRESENTATION
### FATIGUE SURFACE
## NIGHT
### NIGHT — EXACT CONTROLS
### NIGHT — ACTUAL ARITHMETIC
### NIGHT LAYOUT
### STORE SUPPORT OWNED REFERENCE
### RELIC VISUAL
### FINAL TIMELINE PRESENTATION
### BOSS INFORMATION PRESENTATION
### D25 — 최종 정찰 보고
### FINAL PREPARATION UI — EXACT
### STORE GROWTH SURFACE
### MENU / SETTINGS VISUAL
## RUN ABANDON UX
### TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER
### TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY — REQUIRED
### COPY / TUTORIAL UX RECOVERY
## AUDIO FEEDBACK
```


## NEW — ownership pointer to the Presentation audio owner (SPEC_INDEX: AUDIO PRESENTATION -> PRESENTATION_POLISH_v2.8.0.md)

Pointer (superseded; see REWORD — presentation pointers (User decision 2026-09-23)).


## UNRESOLVED — none open after review

Items raised during consolidation and closed by the independent review:

- Night-number tutorial bullet and pre-supply `Supporting copy`: superseded (see SUPERSEDED above).

- `보급 후 변화` vs `판매 후 변화`: relabelled (see REWORD above).


## NOTES — checked and compatible (kept verbatim)

1. v2.6 RESPONSIVE RULE widths `360px / 390px / 430px` vs 412-class in v2.7 FONT / VISUAL QA and v2.8 NIGHT: compatible; the visual QA run (qa-visual) covers 360 / 390 / 412 / 430.

2. v2.6 NIGHT `stronger visual emphasis` for meaningful results vs v2.8 same Outcome-label size: different scopes (result-level emphasis vs label size; v2.8 differentiates Outcomes by copy and tone/colour).

3. v2.7 AUDIO FEEDBACK reuse-first rule vs PRESENTATION_POLISH_v2.8.0 audio: SPEC_INDEX routes audio presentation to PRESENTATION_POLISH, which reuses the current audio architecture; the target carries a pointer there.

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A4 term; A6 destination tutorial follows the current coach wording (Source); A7 the last NIGHT result's
primary control reads `마감으로` (Source, USER CONFIRMED 2026-09-22).

```text
- Result 정보: 원정 fatigue gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, **NPC 소지금 획득**.
- 전리품 -> NPC 소지금 획득
`특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.`
- `다음`
```

```new
- Result 정보: 원정 fatigue gain, 최종 fatigue, 현재 injury penalty, severe 남은 기간, **원정 소지금 획득**.
- 전리품 -> 원정 소지금 획득
`이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.` (exact copy: COPY_WORLD_VOICE_v2.8.0.md tutorial coach)
- `다음` (on the last result it reads `마감으로`)
```


## REWORD — presentation pointers (User decision 2026-09-23)

The seven presentation owners (PRESENTATION_SYSTEM / PRESENTATION_POLISH / PRESENTATION_POLISH_BATCH1..5)
moved to `design_ssot/history/`; the current owner is PRESENTATION_PRINCIPLES_v2.8.0.md (principles only;
implemented surface detail lives in Source). Pointers follow it; the Batch / later-phase lists are dropped.

Chain originals:

```text
Presentation construction / asset / ornament / visual-review system:
- PRESENTATION_SYSTEM_v2.8.0.md
- PRESENTATION_POLISH_BATCH1_v2.8.0.md
Detailed later-phase / audio Presentation contracts:
- PRESENTATION_POLISH_v2.8.0.md
```

Earlier consolidation-new lines replaced here (removed from their `new` fences above; not chain lines, so
listed outside a fence):

    Closed Presentation Batches (surface detail, routed by SPEC_INDEX_v2.8.0.md):
    - PRESENTATION_POLISH_BATCH2_v2.8.0.md
    - PRESENTATION_POLISH_BATCH3_v2.8.0.md
    - PRESENTATION_POLISH_BATCH4_v2.8.0.md
    - PRESENTATION_POLISH_BATCH5_v2.8.0.md
    Audio presentation detail (voice / hierarchy / phase BGM identity) -> PRESENTATION_POLISH_v2.8.0.md.
    presentation system / batches / audio -> PRESENTATION_SYSTEM_v2.8.0.md, PRESENTATION_POLISH_BATCH1..5_v2.8.0.md, PRESENTATION_POLISH_v2.8.0.md

```new
Presentation principles (construction / asset / ornament / audio / visual review):
- PRESENTATION_PRINCIPLES_v2.8.0.md
Audio presentation principles (voice / hierarchy / phase BGM identity) -> PRESENTATION_PRINCIPLES_v2.8.0.md.
presentation principles / audio -> PRESENTATION_PRINCIPLES_v2.8.0.md
```

## AMENDMENT — User decision 2026-09-23: no FINAL countdown signal

User decision: no `FINAL까지 N일` countdown signal (the five-day Boss beats carry the pacing).

```text
- D10 `FINAL까지 20일`
- D20 `FINAL까지 10일` + Recon dispatch beat
- D25 `FINAL까지 5일` + exact persisted Final Family/Hazard disclosure
```

```new
- D10 Boss investigation beat
- D20 Recon dispatch beat
- D25 exact persisted Final Family/Hazard disclosure
```


## AMENDMENT — DAY 0 Store Support tutorial (User decision 2026-09-24)

```new
- `건너뛰기` skips the current screen's marks only; later screens still teach their own (User 2026-09-24)
### FIRST STORE SUPPORT TUTORIAL (DAY 0)
User decision 2026-09-24. The first screen of a new store is the DAY 0 Store Support takeover, so
the tutorial begins there: three marks read the takeover (what a Store Support is, how a card
reads, what the key does and when more candidates arrive) and never name a pick. They are the one
exception to "no mark over a modal", shown over the takeover itself, on DAY 0 only, and persisted
per account like every other mark. Exact copy: COPY_WORLD_VOICE_v2.8.0.md §TUTORIAL COACH COPY.
```


## AMENDMENT — first-sale coach diet (User decision 2026-09-24)

The Supply/Fatigue lesson teaches two facts; the first SALE shows four marks and the rest are contextual.

```text
Supply/Fatigue tutorial teaches:
- required Supply is paid first
- a Supply Deficit applies one expedition-wide preparation penalty through the existing unified Supply system
- remaining Supply beyond the requirement reduces current Fatigue
- further remaining Supply reduces that expedition's Fatigue gain
```

```new
Supply/Fatigue tutorial teaches one fact, on the counter tray's `피로 회복` row the first time a Food/Drink is chosen for a fatigued customer (User 2026-09-25; it sat on the retired `피로 A → 출발 B` row):
- Food/Drink reduce Fatigue; Fatigue 10+ lowers 기동/정신
First SALE (User 2026-09-24): five marks only — destination, Hazard, Stats (the customer's own 능력치: they differ by Job / rarity / Level, 투력 drives combat, the other three answer the Hazards; COPY_AUDIT §3-7 STATS), outlook, price. Great Success, Supply,
returning customer and Bag marks are contextual and appear the first time their situation exists.
```


## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

Supply is no longer a Gate requirement or a Player-facing effect label: the MORNING — SUPPLY DELTA section (`필요 보급 0/3/5`) is deleted, Item effect rows read `피로 회복 N`, the post-commit delta loses Supply Deficit / `보급 부족 완화` / the hidden formula, the Fatigue preview reads `피로 9 -> 출발 7` on the 0~40 scale with DUNGEON_HAZARD band names, NIGHT arithmetic follows COPY_AUDIT_APPROVED §6-6, the Hazard nudge rows use the per-Stat pressure labels, and the Supply/Fatigue tutorial teaches one fact (its earlier ```new declaration in this ledger is edited in place; the `### MORNING — SUPPLY DELTA` heading declaration is removed in place).

```text
- committed Supply may show 피로 N -> 출발 N
- show Prepared/Required/excess Supply compactly
Keep the existing Morning Board structure.
Replace qualitative Supply-burden wording with exact public requirement:
필요 보급 0
필요 보급 3
필요 보급 5
Do not add explanatory recommendation prose or new Supply qualitative labels.
- Supply
- pressured Core Stat label
- Required Supply
Actual expedition Resolve uses the final committed Items / Supply / Fatigue / Condition state.
- direct Item Stat / Counter / Supply
- proven Supply Deficit relief
Supply +N
- exact Supply
- deterministic Supply/Fatigue arithmetic
- reducing an active **Supply Deficit** may legitimately improve effective 투력/강인함/기동/정신 and underlying Hazard preparation through the inherited unified Supply system
- this must read as `보급 부족 완화` or equivalent system-source feedback, not as if the Item itself granted those four Stats or as a newly recalculated Hazard Readiness label
- excess Supply that lowers current Fatigue may restore effective 기동/정신 when a Fatigue penalty band changes; this must read as `피로 완화` / Condition-derived feedback
- do not expose the hidden Supply-deficit formula merely to explain the delta
직접 효과 = 공포 대응 +10 / Supply 3
- without a Supply Deficit change or Fatigue penalty-band change, it must not show a Core-Stat increase
- if its Supply reduces an active Supply Deficit, all four effective Core Stats may rise as a **보급 부족 완화** result
- if excess Supply also crosses a Fatigue penalty band, 기동/정신 may additionally recover as a **피로 완화** result
보급 5 / 필요 3 · 피로 9 -> 출발 7
Player-facing Fatigue remains numeric.
- 10+ must have readable Stat-source feedback
- 20 must receive strong danger treatment
피로 2 -> 출발 0 · 보급 회복 -2
원정 결과 +5 · 보급 완화 -3
밤 피로 2
- do not show Counter / Supply / Insurance / Utility / harmful RiskReward penalty as reduced by this effect
Do not teach the hidden Supply-deficit formula.
Closing may show only compact actual-supply-impact summary.
- 냉기 · 강인함 압박
- 화이트아웃 · 정신 중심 / 기동 보조
- 부식 · 강인함 압박
- 진창 · 기동 압박
```

```new
- 피로 회복 N (User 2026-09-24, v2.9.0)
Actual expedition Resolve uses the final committed Items / Fatigue / Condition state (User 2026-09-24, v2.9.0).
- direct Item Stat / Counter / 피로 회복 N
피로 회복 N
- exact 피로 회복 N (User 2026-09-24, v2.9.0)
- deterministic Fatigue arithmetic (`피로 A -> 출발 B`) (User 2026-09-24, v2.9.0)
- Food/Drink 피로 회복 that lowers current Fatigue may restore the effective Stats a Fatigue band pressed when the band changes; that recovery is never shown as the Item's own Stat and `판매 후 변화` does not list it (User 2026-09-25; the v2.9.0 `피로 완화` row is retired)
직접 효과 = 공포 대응 +10 / 피로 회복 3
- without a Fatigue penalty-band change, it must not show a Core-Stat increase
- if its 피로 회복 releases a Fatigue band, the Stats that band pressed may recover; `판매 후 변화` still lists only its own 공포 대응 / 피로 회복 (User 2026-09-25)
피로 9 -> 출발 7
Player-facing Fatigue remains numeric (0~40; User 2026-09-24, v2.9.0).
Band names (정상 / 지침 / 과로 / 소진 / 탈진) and their effects are owned by DUNGEON_HAZARD; the band is named from 20 up.
- 10+ (지침) must have readable Stat-source feedback
- 20+ (과로 / 소진 / 탈진, ceiling 40) must receive strong danger treatment
- committed Food/Drink may show 피로 N -> 출발 N (User 2026-09-24, v2.9.0)
귀환 후 피로 N · {band}
The band is named from 20 up; exact copy and the B5 next-decision line -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6.
- pressured Core Stat label (User 2026-09-24, v2.9.0)
- 냉기 · 대응 15 필요 · 강인함 3당 대응 1 제공
- 화이트아웃 · 대응 21 필요 · 정신 2당 대응 1 제공
- 부식 · 대응 13 필요 · 강인함 3당 대응 1 제공
- 진창 · 대응 21 필요 · 기동 2당 대응 1 제공
Gate detail shows the full Hazard sentence, e.g. `냉기 — 대응 15 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다`;
출발 0
원정에서 +5
음식·음료로 -3
→ 귀환 후 2
Exact copy (User 2026-09-24, v2.9.0) -> COPY_AUDIT_APPROVED_v2.8.0.md §6-6.
- do not show Counter / Fatigue recovery / Insurance / Utility / harmful RiskReward penalty as reduced by this effect (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 transaction beat / SALE at a glance (User decision 2026-09-24)

The sale is shown as an act and SALE reads at a glance: the Bag keeps its v2.8 place in the customer-state strip (User revision 2026-09-24: not moved, one step larger; the hand-over lands there), the greeting keeps 3 seconds while buy / refuse reply lines stay 5 seconds, the readout `.top` shows 전투 전망 and 환경 대응 only (the `실패 시 사망 위험` cell label and its own `?` are retired; the value moves to the second line of the 전투 전망 help and the NPC detail), the one `판매 후 변화` list holds direct Stat rows, derived rows and `피로 {A} → 출발 {B}` only (the frozen outlook is never repainted inside the till), the price buttons carry role words with an `이익 {N}G` sub-line, the Stat grid gains the Hazard pressure tag, Item rows emphasise the effect that answers the Gate, and the 50 / 100 / 150 sale sounds become one register family with coin ticks. Transaction beat timings live in PRESENTATION_PRINCIPLES §TRANSACTION BEAT; this owner points to them. The earlier ```new declaration of the COPY_WORLD_VOICE exact-copy pointer is edited in place.

```text
- exact 실패 시 사망 위험 %
Failure-risk label:
실패 시 사망 위험
- it auto-hides after 3 seconds
- a newly emitted line starts a fresh 3-second display
- ordinary 50% / 100% / 150% sale distinctions
```

```new
- SALE transaction beats (hand-over, customer reaction, counter, exit / entry, price sound family, refusal) -> PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT (User 2026-09-24, v2.9.0)
- the two Bag slots stay in the customer-state strip beside the status line and are the landing point of the hand-over (User 2026-09-24, v2.9.0)
- the Bag stays in the customer-state strip at every width, one step larger than v2.8, never overflowing (User 2026-09-24, v2.9.0)
`손님 보내기`: the current customer exits left, then the next arrives with the existing entry (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A4; User 2026-09-24, v2.9.0).
- exact 실패 시 사망 위험 % — not as a readout cell: the readout `.top` shows 전투 전망 and 환경 대응 only; the value is the second line of the 전투 전망 `?` help (`실패 시 사망 위험 {N}%`, same frozen value) and a line of the NPC detail (User 2026-09-24, v2.9.0)
전투 전망 `?` help is two lines; the second is `실패 시 사망 위험 {N}%`. `실패 시 사망 위험` as a readout cell label with its own `?` is retired (User 2026-09-24, v2.9.0).
ORDER offer rows follow the same rule against today's open Gates (§ORDER — ITEM INFORMATION HIERARCHY; User 2026-09-24, v2.9.0).
One delta list after choosing an Item (User 2026-09-24, v2.9.0):
- `판매 후 변화` lists only what the Item itself changes — its own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`, `원정 소지금 획득 0%p → 40%p`); no `피로 완화` row and no `피로 {A} → 출발 {B}` line, on the counter tray, the till and FINAL preparation (User 2026-09-25)
- the frozen four-cell outlook is not repainted inside the till and never changes for a selected Item
- `특수 효과` and the shelf-life line stay
The frozen outlook is not repainted inside the till (§SALE SELECTED-ITEM INFORMATION; User 2026-09-24, v2.9.0).
### SALE — PRICE ROLE WORDS
The three price buttons read `할인 50% · {price}G` / `정가 · {price}G` / `바가지 150% · {price}G`, with the small line `이익 {N}G` (or the existing disabled reason) under each (User 2026-09-24, v2.9.0).
Three modes, no extra depth.
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`; price roles -> `SALE_v2.8.0.md` §PRICE ROLE.
- the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A6; User 2026-09-24, v2.9.0)
- a greeting line auto-hides after 3 seconds; a reply line (buy / refuse) stays 5 seconds (User 2026-09-24, v2.9.0)
- a newly emitted line starts a fresh display of its own duration
- the Bag slots stay in the customer-state strip beside the status lines (User 2026-09-24, v2.9.0)
At every width the two slots stay in the customer-state strip beside the status line; they remain the handling surface and the hand-over (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1) lands on them (User 2026-09-24, v2.9.0).
Stat grid pressure tag (User 2026-09-24, v2.9.0):
- 투력 never carries a tag
- no number, no verdict
- the tag is the one place the Stat grid links to the Gate
- ordinary 50% / 100% / 150% sale distinctions: one register family, 1 / 2 / 3 coin ticks; no mode sounds like the correct answer (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A5; User 2026-09-24, v2.9.0)
- `손님 보내기` customer exit (`depart`): recorded utility cue, door / step family (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 onboarding / ORDER (User decision 2026-09-24)

The screen says what to do: a DAY 1~3 task line (the one exception to "tutorial does not add page height"), the first-ORDER coach order `gates → offer → quantity → confirm → reroll` with `gold` retired, ORDER today-fit typographic emphasis (the "No today-fit/recommended badge" line is narrowed: emphasis of existing effect text is allowed, a badge / verdict word / reorder is not), the per-Gate visitor-count line on the ORDER 오늘 brief, the individual-only reveal boundary (counts per open Gate are public at MORNING and ORDER), the 점주 가이드 `처음 3일` block with a `자세히` disclosure inside the help modal, and the two-line D0 briefing body. The earlier ```new declaration of the SALE emphasis pointer to ORDER is edited in place.

```text
- do not reveal future customer identity / destination
No today-fit/recommended badge.
- tutorial does not add page height
```

```new
- do not reveal an individual future customer's identity / individual destination; the visitor count per open Gate of the current day is public at MORNING and ORDER (User 2026-09-24, v2.9.0)
오늘 brief line (User 2026-09-24, v2.9.0):
- one open Gate: `{N}명 · {Gate}`
- two or more open Gates: `{N}명 · {Gate A} {a} · {Gate B} {b}` — the visitor count per open Gate, counted by the destination each customer claims (a liar's or a pilgrimage-rerouted customer's true Gate stays hidden)
- the counts sum to the visitor count; no name, Job, Trait or Wallet
Exact line -> `COPY_AUDIT_APPROVED_v2.8.0.md`.
No today-fit / recommended badge, no verdict word, no reorder, no recommended row (User 2026-09-24, v2.9.0).
This disclosure sits inside the help modal, not on a gameplay screen; the anchored-popover rule above is unaffected.
Exact five lines -> COPY_AUDIT_APPROVED_v2.8.0.md §8.
- tutorial does not add page height (sole exception: the DAY 1~3 task line, exactly one line; §TUTORIAL — TASK LINE; User 2026-09-24, v2.9.0)
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
```

## AMENDMENT — v2.9.0 presentation leftovers (User decision 2026-09-24)

No second owned-Relic block in SALE at any width; the ORDER held-stock list starts collapsed with a persisted open choice.

```text
- on mobile, avoid retaining a second redundant owned-Relic block lower in SALE if the compact control already exposes the same information
On mobile, the individual held-stock list may be collapsible.
- default collapsed is allowed
- open/closed state persists during the current ORDER session
```

```new
- at every width, do not retain a second owned-Relic block lower in SALE: the compact control is the one reference there (the FINAL preparation screen keeps its owned-Relic list) (User 2026-09-24, v2.9.0)
The individual held-stock list is collapsible at every width and starts collapsed; opening it is an account-level presentation choice that persists across Days and reloads until the player folds it again (User 2026-09-24, v2.9.0).
- the collapsed summary line still states the held-stock summary
```

## AMENDMENT — v2.9.0 counter tray (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0), approved composition change: the SALE per-row price panel becomes a fixed counter tray above the dock; §SALE — COUNTER TRAY is added, the Item selection list, §SALE SELECTED-ITEM INFORMATION and §Vertical hierarchy point to it.

```text
The selected-Item panel uses one primary heading:
```

```new
the chosen Item goes on the counter tray; the shelf rows never change height (§SALE — COUNTER TRAY; (User 2026-09-24, v2.9.0))
### SALE — COUNTER TRAY
User-approved composition change (User 2026-09-24, v2.9.0): the per-row price panel is replaced by one counter tray.
- the counter tray is a fixed band directly above the dock, outside the scrolled column, at every width
- tapping a shelf row puts that Item on the tray; the row is only highlighted, the shelf rows never change height
- tray contents, top to bottom: one header line (Item icon · name · kind · sell price · stock · shelf life, and `{손님}에게 · 소지 {N}G` at the right), the `판매 후 변화` delta list (§SALE SELECTED-ITEM INFORMATION; may be one wrapping line), the `특수 효과` line when any, then the three price keys (§SALE — PRICE ROLE WORDS)
- empty tray: on DAY 1~3 of a Run while the account tutorial is not skipped, one line (the exact prompt -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23); otherwise the empty tray has no height (User 2026-09-24, v2.9.0)
- the hand-over (PRESENTATION_PRINCIPLES_v2.8.0.md §TRANSACTION BEAT A1) starts from the tray icon
- height budget at 360: empty tray ≤ 48px, filled tray ≤ 200px, and at least three shelf rows stay visible with the tray filled; shelf rows are compact (one name line + one effect line)
- on a desk (≥1024) the tray sits under the shelf column only, above the dock; the dossier column runs down beside it (§SALE — DESK LAYOUT; User 2026-09-25, v2.9.0)
- the FINAL preparation screen keeps its per-row panel (FINAL_EXPEDITION_v2.8.0.md §3)
- tap-only; no drag, no minigame, no new Save field
The selected-Item surface (the counter tray, §SALE — COUNTER TRAY) uses one primary heading:
- on the counter tray the delta list may be set on one wrapping line, rows joined by ` · ` (User 2026-09-24, v2.9.0)
- the counter tray is part of the Item / price surface: empty ≤ 48px, filled ≤ 200px at 360, and at least three shelf rows stay visible with the tray filled (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 trims: returning surface / empty tray / coach (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the returning-customer quick surface is desk-only, the empty counter tray prompt is DAY 1~3 / tutorial only (the T amendment's empty-tray line is edited in place above).

```text
- Forecast in the current-decision flow after relevant prior-expedition information
On mobile it must not push Wallet / Expected Destination / Forecast out of the primary decision flow.
```

```new
- Forecast in the current-decision flow (the `지난 원정` quick surface is desk-only; on phone the NPC detail holds it) (User 2026-09-24, v2.9.0)
On phone the quick surface is not shown: the customer's status strip and the NPC detail 원정 기록 hold the last expedition; on a desk (≥1024) it stays (User 2026-09-24, v2.9.0).
```

## AMENDMENT — v2.9.0 no always-on SALE Fatigue line (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): SALE has no always-on Fatigue line; the tutorial anchor moves to the tray row (edited in place above when it was a declared-new line).

```text

```

```new
- SALE carries no always-on Fatigue line: current Fatigue is the status strip's `피로 N`, the tray shows `피로 A -> 출발 B` only for a chosen Food/Drink that moves it, and the expedition's Fatigue is NIGHT's answer (User 2026-09-24 revision, v2.9.0)
```

## AMENDMENT — v2.9.0 Gate Hazard requirement number (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0 revision): the Gate-level Hazard requirement number is public (§HAZARD NUDGE examples and the Gate-detail line, declared new earlier, are edited in place); the three hidden-threshold lines are rewritten.

```text
- exact hidden Hazard threshold/formula
Do not expose the Gate's exact Counter requirement.
- exact hidden Hazard requirement/threshold/formula
```

```new
- exact hidden Hazard readiness thresholds (0.75 / 0.40) and Defense formula — the Gate-level `대응 {N} 필요` and `{능력치} {n}당 대응 1 제공` are public Gate facts (§HAZARD NUDGE; User 2026-09-24 revision, v2.9.0)
- exact hidden Hazard readiness thresholds / Defense formula (the Gate-level requirement number itself is a public Gate fact; User 2026-09-24 revision, v2.9.0)
```

## AMENDMENT — v2.9.0 revision 2: pressure labels and the destination-plate ? retired (User decision 2026-09-24)

Every player-facing Hazard row (SALE destination plate, D25 scouting report, FINAL 확인된 위협 included) reads the numbered short row
`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; the labels `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and the plate `?` help are
retired. The revision-1 declarations this replaces were edited out of the fences above in place.

```text
- each Hazard's authoritative Stat-pressure label
```

```new
The Gate's 충분 Counter requirement (`대응 {N} 필요`) and the Core-Stat conversion (`{능력치} {n}당 대응 1 제공`) are Gate-level facts shown on every Hazard row, the SALE destination plate included (`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`); the plate has no `?` help; no per-customer remaining need is shown and readiness stays 충분 / 대응 / 불안 / 취약 (User 2026-09-24 revision 2, v2.9.0).
Examples (User 2026-09-24 revision 2, v2.9.0; every Hazard row — MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL — the number first):
(no `{위험} · {label}` row survives; the SALE destination plate has no `?` help)
the sentence forms -> COPY_AUDIT_APPROVED_v2.8.0.md §4-16.
- each Hazard's numbered short row `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`, N for 마왕성 (Day 30 / T2 -> 29), the same row as the MORNING plate (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
Before ORDER, Morning must expose both next-day Gate quantity pressure and Tier difficulty pressure.
Required information:
내일 전망
게이트 수
1개 xx% · 2개 xx% · 3개 xx%
게이트 위험도
T1 xx% · T2 xx% · T3 xx%
If next-day Gate count is deterministic, show the fixed result instead of a fake distribution:
게이트 수
2개 확정
- current-day Gate/Hazard remains the primary preparation information
- next-day forecast is a secondary future signal
- do not reveal next-day Family / exact Gate composition / Hazard set
- ORDER may repeat the same forecast compactly; it must not generate a second value
Design intent:
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
- next-day T1/T2/T3 forecast as secondary information
4. compact next-day Tier forecast (secondary)
```

```new
### MORNING — NEXT-DAY GATE FORECAST — RETIRED
(User 2026-09-24, v2.9.0) No next-day Gate-count or Tier forecast is shown anywhere, MORNING or ORDER. Today's open Gates, their numbered Hazard rows and the visitor count per open Gate are the whole preparation context; the Gate-count / Tier generation rules in `DUNGEON_HAZARD_v2.8.0.md` are unchanged and stay internal.
Still hidden:
- next-day Family / exact Gate composition / Hazard set
4. (retired, User 2026-09-24, v2.9.0) no next-day forecast block
- the rarity name (`일반 / 고급 / 희귀 / 영웅 / 전설`) as one small line under the Item name — an identity fact, not a role chip (User 2026-09-24, v2.9.0)
- a `+ / 1 / 3 / 최대` blocked by store Gold or warehouse space stays dim but answers a tap with the reason toast; an offer whose whole supply for today is already in the cart answers `오늘 공급 최대 수량입니다.` (exact lines COPY_AUDIT §3-9; User 2026-09-24, v2.9.0; supply line User 2026-09-25)
```

## AMENDMENT — v2.9.0 F2-b: two-line Hazard short row, inline Stat tag (User decision 2026-09-25)

The Hazard short row reads `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공` (one line at 900px+); the SALE Stat grid tag sits
beside the Stat name and the value is one step smaller. Superseded declarations were edited in place.

```new
- beside the Stat name, on the same line (`강인함  독`), when the customer's Gate presses that Stat, a small tag with the pressing Hazard name(s) (e.g. `냉기`, or `독 · 속박` for two); the tag never adds a line or horizontal overflow — it is clipped with an ellipsis before the value would move (User 2026-09-25, v2.9.0)
- the Stat value is one step smaller than before but still larger than the Stat name (User 2026-09-25, v2.9.0)
```

## AMENDMENT — v2.9.0 F3: kit Outcome step / no rest recovery / 중상 +9 / repeated-strain cut (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.0 F3): 구급키트 lowers the resolved Outcome one step (중상 → 부상 with the 부상 XP/Loot/Fatigue/injury 1; 부상 → 부상 with no lasting injury; 사망 excluded); no natural Fatigue recovery of any kind for any adventurer (the Severe-Injury rest-day -5 is retired); 중상 takes the 부상 Fatigue gain (+9) and only 사망 stays 0; repeated injured / weary (Fatigue 20+) departures escalate the failure Death chance (+8%p per repeat of each kind from the second, cap +30%p, from the adventurer's own records) with the NPC-detail row `무리한 출발 {n}회`; the route-change line names 거짓말쟁이 / 순례 with particles by final consonant. Earlier declarations this batch supersedes were removed from the fences above in place.


## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```new
- §SALE — SHELF ORDER (User 2026-09-25, v2.9.0): rows are ordered by days left before discard, nearest first, ties in the existing order, the same for every customer; each row's price column carries the chip `폐기 N일`, emphasized (the warehouse list's `.soon` color) at 1 day or less; no Item is non-expiring, so no `유통기한 없음` state survives on the tray, the ORDER row or the warehouse
```

## AMENDMENT — v2.9.0 F5: menu routing / 이번 영업의 장식 / abandon flow / 점포 장식 tab / capital rates halved (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F5): the menu 점포지원 row opens the owned list when no Store Support window is purchasable; a read-only menu row 이번 영업의 장식; the DAY 0 `장식 구성 다시 보기` way back is retired; the codex tab 점포 관리 is labelled 점포 장식; 현재 지점 포기 discards the Run at once and returns to 새 점포 준비 with no Run (Decorations purchasable there), no automatic new Run; the Store Capital Day-reach rate table is halved (0.5 / 1 / 1.5 / 2 / 2.5%), prices unchanged. Earlier lines this batch supersedes were removed from the fences above in place.

```text
- tapping a Slot row opens 점포 관리 focused/scrolled to that exact Slot
```

```new
- tapping a Slot row opens 점포 장식 (the codex tab formerly labelled 점포 관리; (User 2026-09-24, v2.9.0)) focused/scrolled to that exact Slot
- 이번 영업의 장식
Menu row behavior (User 2026-09-24, v2.9.0):
- 점포지원: while a Store Support window is open and purchasable (RELIC §reopenAllowed, `canBuyRelic`) it opens the selection surface; otherwise it opens the owned list `보유 점포지원` (a closable modal), never the selection surface with nothing to choose
- 이번 영업의 장식: read-only, the four Slots of this Run's frozen loadout as `{Slot 이름} · {장식 이름} · {효과 한 줄}`; an empty Slot reads `비어 있음` (COPY_AUDIT §1-7); 세계관 vocabulary only (영업 · 점포), never 런
- 현재 지점 포기: the confirm of COPY_AUDIT §1-3; on confirm the Run is discarded at once (CORE_RUN §CURRENT RUN ABANDON) and the screen returns to 새 점포 준비 with no Run, where Decorations can be bought and equipped; a new Run starts only from `첫 점포지원 고르기`
- the DAY 0 첫 점포지원 surface has no way back: the retired `장식 구성 다시 보기` button is gone; the choice is mandatory and the surface has no close
- 점포지원 and 이번 영업의 장식 and 현재 지점 포기 appear only while a Run exists
```

## AMENDMENT — v2.9.0 F6: fit emphasis retired / fixed effect order / category grammar once / transaction result stub (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F6): the matching-effect / today-fit emphasis is retired on SALE and ORDER rows (the judgement is the player's); Item effect lines stand in one fixed per-category order (ITEM §PRESENTATION ORDER); the category grammar is taught once (COPY_AUDIT §8-0 / §3-7 OFFER); each sale shows a per-customer receipt stub `단골도 {±N} · 소지금 {A} → {B}` (~2.5 s, PRESENTATION §TRANSACTION BEAT A8); refusals keep the engine-reason reply pools; PRESENTATION §LEARNING AFTER RESULT. Earlier lines this batch supersedes were removed from the fences above in place.

```new
No emphasis of any effect text against today's Gates either: the earlier typographic today-fit emphasis is retired, every effect text keeps the default style, and the row's effects stand in the fixed per-category order (`ITEM_v2.8.0.md` §PRESENTATION ORDER) (User 2026-09-24, v2.9.0).
### SALE — MATCHING-EFFECT EMPHASIS — RETIRED
Retired (User 2026-09-24, v2.9.0): no effect text is emphasized against the customer's Gate; every effect text keeps the default style. No badge, no verdict word, no reorder. The row's effects stand in the fixed per-category order (`ITEM_v2.8.0.md` §PRESENTATION ORDER), the same for every customer.
### SALE — TRANSACTION RESULT STUB
(User 2026-09-24, v2.9.0): on each successful sale a receipt stub (`.receipt-stub`, paper texture, a stamp-in motion) appears over the counter band above the dock for about 2.5 seconds and reads `단골도 {±N} · 소지금 {A} → {B}` (COPY_AUDIT §4-24). It reserves no height (the tray keeps its own rules), never blocks input, is replaced by the next stub, and under `prefers-reduced-motion` appears and disappears without motion. On a refusal the customer's reply line (drawn from the engine's reason pool) is the result surface; no stub.
- the price keys therefore always sit in the same place; a successful sale clears the tray (the Item went into the Bag) and shows the transaction result stub (§SALE — TRANSACTION RESULT STUB); a refusal keeps the Item on the tray with the refused key locked
The 점주 가이드 opens with a first block `처음 3일` of exactly five lines (one per phase: 아침 / 발주 / 판매 / 밤 / 마감), followed by one category-grammar line (COPY_AUDIT §8-0, taught once, an explanation of the vocabulary and never a recommendation; (User 2026-09-24, v2.9.0)), then keeps the existing eight sections under a `자세히` disclosure, collapsed by default (User 2026-09-24, v2.9.0).
```

## AMENDMENT — v2.9.0 F7: quick-view status line / purchase notice / Counter judgement split (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F7): the owned Store Support quick view carries a runtime status line for condition-type supports only; the purchase notice drops its second sentence; the Counter judgement is split into 직접 대응 / 관련 준비 with one owner (RELIC §COUNTER JUDGEMENT) — the acceptance floor and 원정 위험 게시판 read 관련 준비, the multipliers, pity and cert rewards read 직접 대응, the 기동-for-속박/진창 exception is retired; the accessible-mode base need is 0.72 (measured, not tuned). Earlier lines this batch supersedes were removed from the fences above in place.

```new
- for a condition-type support only, one runtime status line under them (RELIC §QUICK VIEW STATUS LINE; exact lines COPY_AUDIT §11-32); no HUD, no badge, no verdict word (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 SALE forecast pin (User decision 2026-09-25)

User decision 2026-09-25: on a phone the readout's two readings float above the counter tray while the readout is scrolled out of view; one tap folds them to a chip; no Save field.

```new
### SALE — FORECAST PIN
(User 2026-09-25, v2.9.0) On a phone the readout scrolls away with the dossier while the Player works the shelf.
- while the readout is outside the scrolled column's view, one floating line shows the same two readings at the top of the scrolled column, where the readout sat: `전투 전망 {우세|접전|불리}` and `환경 대응 {충분|대응|불안|취약}` — the same frozen SALE-entry values and colours, never a second source
- while the readout is on screen the pin is not shown; on a desk (≥1024) it is never shown (the readout sits beside the portrait there)
- one tap folds it to a `전망` chip and back; the fold lasts only until the readout is on screen again — the next time the readout scrolls away the pin opens unfolded; no Save or account field
- it floats over the top of the scrolled column and reserves no layout height; a row it covers is read by folding it; the touch target is at least 44px
```

## AMENDMENT — v2.9.0 SALE desk layout (User decision 2026-09-25)

User decision 2026-09-25: on a desk the SALE dossier column is its own area down to the dock, the counter tray sits under the shelf column only, and the two columns scroll separately.

```new
### SALE — DESK LAYOUT
(User 2026-09-25, v2.9.0) On a desk (≥1024) the SALE area below the counter band is two areas, not one scrolled column.
- the dossier column (Stat grid, Traits) is its own area on the wood, running down to the dock
- the shelf column holds the shelf on the wood and, under it, the counter tray: the tray takes only the shelf column's width, and the wood above it stays clearly apart from the tray's dark band
- each column scrolls on its own; scrolling the shelf never moves or empties the dossier column
- a redraw of the same customer keeps both columns' scroll positions; a new customer starts both at the top
- phones keep the single scrolled column and the full-width tray (§SALE — FORECAST PIN covers the readout there)
```

## AMENDMENT — v2.9.1 balance: Death limit always visible (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1 balance, `archive/v2.9.1-balance/v29-balance-agreements.md` §3): the Death count and the current segment limit are always shown on MORNING and ORDER in the top status line, warning color at one Death left; exact copy COPY_AUDIT §4-23.

```text
2. persistent funds summary
```

```new
### DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER)
(User 2026-09-25, v2.9.1 balance.) The Run's cumulative Death count and the current segment limit
(`CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED) are always on screen at MORNING and ORDER, in the top status line —
not only in the 도감.
- one compact item: count / current limit / the Day the segment ends; exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-23
- warning color when one more Death ends the Run (count = limit − 1)
- the limit shown already includes 추모 방명록 and 위령제
- no extra popover, badge or explanation text; the same line on both screens
- exact placement is settled by the screenshot review of the implementing batch (PRESENTATION_PRINCIPLES)
2. persistent funds summary (the top status line also carries the Death count / limit, §DEATH LIMIT — ALWAYS VISIBLE)
```

## AMENDMENT — v2.9.1 balance: 위령제 conditions / 만반의 준비 tutorial / hybrid rule (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1): 위령제 follows the ordinary Event conditions (TYPE Run / Opportunity, WEIGHT 1.0, may recur, +1 each time); a contextual 만반의 준비 tutorial the first time both Bag slots of an uninjured customer departing below Fatigue 20 are filled; an Epic hybrid stays below every specialist of the same or a higher Rarity (it may exceed a Common Main). Earlier declarations this batch supersedes were removed from the fences above in place.

```new
### 만반의 준비 TUTORIAL
(User 2026-09-25, v2.9.1 balance.) Contextual, like the other first-time marks: shown once per account, the first time
the Player fills BOTH Bag slots of a customer who is uninjured and whose departure Fatigue (the tray's `출발 B`) is
below 20 — the moment 만반의 준비 (`DUNGEON_HAZARD_v2.8.0.md` §Preparation / Level Death reduction) is first achieved.
- anchor: the customer's Bag slots on the SALE counter
- teaches the condition and the effect in words only; no number, no percentage
- persisted and reset with the other tutorial marks (§TUTORIAL — FRESH INITIALIZATION / RESET VISIBILITY)
```

## AMENDMENT — v2.9.1: approved copy pointers (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1): the Event is named 길드 합동 위령제; its reveal copy and the 만반의 준비 tutorial line are approved in COPY_AUDIT §13-23 / §3-7. Earlier declarations this batch supersedes were removed from the fences above in place.

```new
- exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3-7 만반의 준비
```

## AMENDMENT — v2.9.1: 연속 부상 출발 row (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1): the NPC-detail row `무리한 출발 {n}회` becomes `연속 부상 출발 {n}회` — the current chain the strain cut reads. Earlier declarations this batch supersedes were removed from the fences above in place.

```new
NPC detail also carries `실패 시 사망 위험 {N}%` (the frozen SALE-entry value) (User 2026-09-24, v2.9.0), and the information row `연속 부상 출발 {n}회` — the unbroken run of this adventurer's most recent expeditions begun injured (the chain the v2.9.1 strain cut reads; 0 after a healthy departure), no verdict (User 2026-09-25, v2.9.1; replaces `무리한 출발 {n}회`).
```

## AMENDMENT — v2.9.0: D0 briefing DAY labels (User decision 2026-09-25)

User 2026-09-25: the D0 briefing's DAY 05 / DAY 30 anchors return as an LED label over each of the two approved lines (COPY_AUDIT §14-1); the closing sentence stays deleted. The earlier plain-two-line wording this supersedes was removed from the fences above in place.

```new
- the body is two entries under the unchanged header `마왕 조사 개시` and lead line: a `DAY 05` label on the record's LED face over its one line, then a `DAY 30` label over its one line; the closing sentence is deleted; button unchanged; exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md §14-1 (User 2026-09-25, v2.9.0);
```

## AMENDMENT — v2.9.2 H1: NIGHT verdict stamp (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.2 H1): §NIGHT LAYOUT — VERDICT STAMP adds the verdict stamp, per-Outcome weight, the Hero Item after-motion and the reversal overstamp (presentation only).

```new
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
```

## AMENDMENT — v2.9.2: SALE shelf row states every effect (User decision 2026-09-25)

User 2026-09-25 (phone capture of 불룡볶음면): the shelf row stopped at two effects; it now states all of them on one line.

```new
- the shelf row's effect line states every effect of the Item in the ITEM §PRESENTATION ORDER order (it stopped at two before); a longer line steps its type down (14 → 13 → 12 → 11px) to stay one line at 360 rather than wrap or be cut; 구급키트 and 황금 1+1 쿠폰 read their core on the shelf only (`중상 → 부상 · 부상 → 무사`, `다음 소비품 효과 2회`) while the tray's `특수 효과` and the codex keep the full line (User 2026-09-25)
```

## AMENDMENT — v2.9.2: SALE counter tray fold (User decision 2026-09-25)

User 2026-09-25: the filled SALE tray folds to its header while the shelf is read on a phone.

```new
- COUNTER TRAY FOLD (User 2026-09-25; the User's own suggestion; confirmed as built, User 2026-09-26, v2.9.3): on a phone a filled tray folds to its header line (Item, customer, wallet, a small ▲) when the player scrolls the shelf past 32px or taps outside the tray, a shelf row, the dock or an overlay; tapping the folded strip or any shelf row (the one already on the tray included) opens it again. The selected Item never changes by folding, nothing is saved, and a desk (≥1024) never folds
```

## AMENDMENT — v2.9.2: ORDER floating today line (User decision 2026-09-25)

User 2026-09-25: the 오늘 line joins the floating Death box while its block is out of view.

```new
- ORDER — FLOATING TODAY LINE (User 2026-09-25; confirmed as built, User 2026-09-26, v2.9.3): the Death line floats at the top of the scrolled 발주서; once the `오늘` block (visitors and the per-Gate count) has gone under it, the same `오늘` line joins that floating box under a thin rule with its own small `오늘` label, so it reads as a second fact, not part of the Death count. While the block itself is on screen the box carries the Death line only. No new copy; the line is the block's own text without the `위험 보기` button
```

## AMENDMENT — v2.9.2 H5: FINAL result seal stamp (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.2 H5): one seal bearing the Boss's name on a Final ending tape; the result sentence follows it.

```new
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
```

## AMENDMENT — v2.9.2 H1: only a turned-away Death reverses (User decision 2026-09-25)

User 2026-09-25: the reversal overstamp also covers a Death 만반의 준비 turned away; 강골 / 구급키트 never reverse. Superseded declarations were removed in place.

```new
- 만반의 준비 (User 2026-09-25: a reversal only when a death was turned away): a result whose Death 만반의 준비 turned into
부상 / 중상 prints `사망` first the same way and its own Outcome overstamps it; the Outcome cue plays on the overstamp and
there is no `rescue` accent. 강골 and 구급키트 only lower an injury and never reverse
```

## AMENDMENT — v2.9.2 H2 SALE counter feel (User 2026-09-25)

User 2026-09-25 (v2.9.2 H2, PRESENTATION §GAME FEEL BEAT H2): §SALE — COUNTER TRAY gains the COUNTER FEEL line. Nothing is dropped.

```new
- COUNTER FEEL (User 2026-09-25, v2.9.2 H2; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H2;
  acceptance -> UI_UX_QA UI-Q-v29-31): the pressed price key travels down 3px in 60 ms and returns in 60 ms (일반 intensity,
  no hold). On a successful sale the tray that was pressed stays in place, inert, for that press only (its Item icon hidden:
  the Item travels as the A1 hand-over), then the counter draws without it; the A8 stub stamps in (1.12 → 1, 200 ms) from the
  key's landing frame instead of the draw. A refused key is pressed the same way while A6 shakes it. The register's first
  coin tick is the impact (×1.3); 바가지's tick run starts 40 ms later on a lower first tick (×0.75), the 1 / 2 / 3 count and
  its 70 ms spacing unchanged. No counter-band bump, no faster second sale, no sale-count overtone, no combo or streak UI.
  Under reduced motion there is no press or held tray and the stub appears at once; the end state is identical
```

## AMENDMENT — v2.9.2 H3 ORDER confirm (User 2026-09-25)

User 2026-09-25 (v2.9.2 H3, PRESENTATION §GAME FEEL BEAT H3): §ORDER — WAREHOUSE DISCLOSURE gains the ORDER CONFIRM line. Nothing is dropped.

```new
- ORDER CONFIRM (User 2026-09-25, v2.9.2 H3; principle, contract and impact budget -> PRESENTATION_PRINCIPLES §GAME FEEL BEAT H3;
  acceptance -> UI_UX_QA UI-Q-v29-32): on 발주 확정 one crate per ordered SKU - its warehouse row's icon - falls onto its row
  (the NIGHT stamp's 90 ms fall) in a cascade whose step is at most 70 ms and shrinks so the last landing is within 320 ms;
  each row's count goes from its prior value straight to the resolved one on its crate's landing (never a unit at a time), and
  a SKU new to the warehouse brings its row in with its crate. The warehouse figures - the summary `N / M칸` and `N종` and the
  register's 창고 잔여 칸 - move together on the last landing (a folded list shows only those). At most three landings are audible (the `order` stamp, then the short `crate` of the same family); the rest
  are silent. The till's 보유 골드 counts down to the resolved value in 220 ms. The `발주 완료.` line is unchanged. 일반
  intensity: no hold. Under reduced motion the `order` stamp plays once and every value is resolved at once
```

## AMENDMENT — v2.9.2 H4 CLOSING receipt stamp (User 2026-09-25)

User 2026-09-25 (v2.9.2 H4, PRESENTATION §GAME FEEL BEAT H4): §CLOSING gains the CLOSING — RECEIPT STAMP subsection. Nothing is dropped.

```new
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
```

## AMENDMENT — v2.9.2 H6 FINAL boss reveal entry (User 2026-09-25)

User 2026-09-25 (v2.9.2 H6, PRESENTATION §GAME FEEL BEAT H6): §FINAL BOSS ART gains the FINAL — BOSS REVEAL ENTRY subsection. Nothing is dropped.

```new
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
```

## AMENDMENT — Boss reveal after MORNING lands (User 2026-09-26)

User 2026-09-26 (the DAY 0 -> DAY 1 overlap the H6 capture reported, fixed on the User's instruction): §BOSS INFORMATION PRESENTATION gains the BOSS REVEAL — MORNING LANDS FIRST subsection. Nothing is dropped.

```new
### BOSS REVEAL — MORNING LANDS FIRST (v2.9.2)

(User 2026-09-26, the DAY 0 -> DAY 1 overlap reported by the H6 capture; acceptance -> UI_UX_QA UI-Q-v29-35.)

A Boss reveal that is due when MORNING is entered opens once MORNING's own entry has landed: a 420 ms hold (the shutter's
length) after the screen appears, then the dossier opens as it always has. It applies to every reveal stage (the D0 briefing
and D5 ~ D25), because they share one mechanism; the reveal order is unchanged, and no Event or Relic window opens during the
hold. MORNING is shown but takes no input during the hold - the reveal is already owed, and the Day does not advance past it
before it is acknowledged (CORE_RUN §D0 FIRST-MORNING BOSS BRIEFING); a second tap on the 구매 that cut to MORNING does
nothing. The hold belongs to the MORNING it started on: if the Day leaves MORNING or the reveal is no longer owed (only a scripted
path can do either), it ends at once. No new motion, sound or copy. Under reduced motion the reveal opens at once, as before.
```

## AMENDMENT — build marker (User 2026-09-26, v2.9.3)

User 2026-09-26: §SETTINGS / DEBUG BOUNDARY is followed by the new BUILD MARKER subsection. Nothing is dropped.

```new
### BUILD MARKER (v2.9.3)

(User 2026-09-26; acceptance -> UI_UX_QA UI-Q-v29-36.) A QA marker so a play report can name the build it was played on.

- the opening screen (no Run: the `던전 앞 편의점` title under the preparation panel) shows `v{version} · {commit}` in its top-left
  corner, small (10 px) and muted, above the preparation panel's shade so it stays readable; it is not a control, takes no space
  from the title and appears on no other screen
- `{version}` is the project version (2.9.3); `{commit}` is the deployed commit's first 7 hex characters, written into `build.js`
  by the Pages deploy step; a local or unstamped build reads `dev`
- the console prints the same on load (`GUILD24 v{version} · {commit}`) and `Guild24.build` returns `{version, commit}`
- the one technical label the opening screen carries (User-approved); ordinary settings still carry no runtime footer
```
