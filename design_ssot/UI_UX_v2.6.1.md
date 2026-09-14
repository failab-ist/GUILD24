# UI_UX

DOC=UI_UX
OWNER=ui,ux,phase_ui,mobile,tutorial,event_reveal,forecast_ui,menu_settings
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.6.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged UI/UX rules inherit `UI_UX_v2.6.0.md`.
This patch overrides conflicting stale SALE layout, NIGHT control, Menu/Settings, ORDER interaction, and runtime continuity text.

## ORDER — v2.6.1

Core question:
`무엇을 준비할까?`

ORDER decision information must be readable before commitment:
- current Gold
- selected order spend
- Gold after order
- **today expected operating cost**
- warehouse used / remaining capacity
- Item shelf life / expiry information
- current-day Gate / known Hazard context
- next-day T1/T2/T3 forecast as secondary information
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

## SALE — DESKTOP AUTHORITY

Director resolution for v2.6.1:
- Character / Portrait left
- upper-right = Core Decision area
- Bag visually/touch-wise enlarged
- Forecast + Expected Destination in upper-right Core Decision area
- NPC Wallet visible in the same decision hierarchy
- duplicated lower destination / forecast removed

This overrides the older v2.6.0 wording that placed these elements differently.
Bag size change is presentation only; capacity does not change.

## SALE — MOBILE AUTHORITY

- compact Character/status top footprint
- no artwork crop
- enlarged Bag with no overlap/overflow
- compact Expected Destination
- Forecast in the current-decision flow after relevant prior-expedition information
- core environment signal visible without tap
- no duplicate environment/forecast blocks
- ~44px-class repeat touch targets

Same-Customer rerenders preserve scroll/focus.
New-Customer transition may intentionally start at the top.

## NIGHT — EXACT CONTROLS

Exactly two Player controls:
- `다음`
- `전체 건너뛰기`

Removed:
- single-result `건너뛰기`
- active `nightSkip` control/API dependency

Both controls remain easy to reach on mobile and neither is visually demoted into a hidden secondary action.

## MENU / SETTINGS — EXACT COMPOSITION

Top-level Menu exactly:
- 모험가 수첩
- 도감
- 점포지원
- 점주 가이드
- 설정
- 현재 지점 포기

Top-level removed:
- Sound Toggle
- Full Data Reset

Rename:
- `설정 · 저장` -> `설정`

Settings contains:
- 저장 내보내기
- 저장 가져오기
- Sound On/Off
- BGM
- SFX
- Full Data Reset

Settings does **not** contain:
- 현재 지점 포기

## COPY / TUTORIAL UX RECOVERY

Already-approved terminology must be used:
- 폭식 -> 탐식
- 전리품 -> NPC 소지금 획득
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
