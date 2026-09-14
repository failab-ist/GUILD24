# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,event_reveal,mobile,menu_settings,runtime_continuity
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=UI_UX_QA_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

Status values are not stored here. This patch overrides stale Night control and v2.6 SALE/ORDER expectations in the base.

## UI-Q61 — ORDER ACTION SPLIT

EXPECT:
- sticky/obvious `발주 확정` when cart exists
- after confirm, ORDER remains
- separate `영업 시작` action exists

PASS: one button/action is not responsible for both purchase and phase transition.

## UI-Q62 — ORDER REROLL WITH SELECTION

EXPECT:
- Reroll enabled with unconfirmed selected quantity when affordable
- clear indication that whole Offer set is replaced
- no instruction requiring quantity reset to zero

## UI-Q63 — ORDER DECISION INFO

EXPECT readable before commitment:
- shelf life
- current Gold
- selected spend
- after-order Gold
- today expected operating cost
- warehouse usage/remaining
- current Reroll cost

## UI-Q64 — ORDER SCROLL / FOCUS

Mobile + desktop interaction:
- +/-
- 0 return
- confirm
- Reroll
- re-confirm

PASS: current offer location does not jump to top; practical focus preserved where possible.

## UI-Q65 — SALE DESKTOP HIERARCHY

EXPECT:
- Character / Portrait left
- enlarged Bag
- upper-right Core Decision area contains Forecast + Expected Destination
- NPC Wallet visible in Core Decision hierarchy
- no duplicate lower destination/forecast panel

## UI-Q66 — SALE MOBILE HIERARCHY

EXPECT:
- compact Character/status footprint without artwork crop
- enlarged Bag with no overlap/overflow
- compact destination
- core environment visible without tap
- Forecast in decision flow
- no duplicated environment/forecast information

## UI-Q67 — NPC WALLET VISIBILITY

Before choosing a price, Player can see NPC current wallet and compare it to the selected sale price.
PASS: affordability can be judged without opening a secondary modal.

## UI-Q68 — SALE SCROLL / FOCUS

Within same Customer test:
- item select
- price panel open/close
- purchase success
- refusal + reselection
- detail/accordion open/close

PASS: current viewed position stays stable.
New Customer may intentionally reset to top.

## UI-Q69 — STAT SOURCE

PASS:
- changed stat highlighted
- only actual applied source names shown
- helpful/harmful semantic treatment correct
- inactive source absent
- Wallet/purchase intent/revisit not shown as Stat sources
- tap detail matches actual calculation

## UI-Q70 — NIGHT CONTROLS

EXPECT exactly:
- 다음
- 전체 건너뛰기

PASS:
- no single `건너뛰기`
- no active `nightSkip` UI reference

## UI-Q71 — MENU EXACT

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

## UI-Q72 — SETTINGS EXACT

Settings contains:
- 저장 내보내기
- 저장 가져오기
- Sound
- BGM
- SFX
- Full Data Reset

PASS:
- 현재 지점 포기 absent from Settings.

## UI-Q73 — FULL RESET TUTORIAL

After Full Data Reset, start fresh.
PASS: Tutorial can appear again and no stale completion state survives.

## UI-Q74 — NEXT PORTRAIT PRELOAD

On real mobile transition to next Customer:
PASS: next portrait is preloaded using a minimal browser preload path and no visible blank/loading regression is introduced.
