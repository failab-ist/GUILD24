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
- Gate-count probability/fixed-count truth follows `DUNGEON_HAZARD_v2.8.0.md`
- Tier probability truth follows `DUNGEON_HAZARD_v2.8.0.md`
The displayed 실패 시 사망 위험 % follows the exact pre-supply calculation owned by `DUNGEON_HAZARD_v2.8.0.md`. It means the chance that an ordinary failed expedition escalates to Death; it is not the unconditional probability of Death across all expedition attempts.
Exact copy ownership -> `COPY_WORLD_VOICE_v2.8.0.md` §PRE-SUPPLY EXPEDITION OUTLOOK — EXACT COPY.
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
### MORNING — SUPPLY DELTA
### MORNING — NEXT-DAY GATE FORECAST — REQUIRED
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
