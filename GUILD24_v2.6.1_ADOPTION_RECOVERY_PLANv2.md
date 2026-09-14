# GUILD24 v2.6.1 — Adoption Recovery Plan

> Base Production: current v2.6.0 Source
> Design Truth: `design_ssot/SPEC_INDEX_v2.6.1.md` and routed current owner Specs
> Work Type: corrective Adoption Recovery patch
> v2.7 features are excluded

## 0. DIRECTOR RESOLUTION — 2026-09-14

This local plan supersedes conflicting numeric/layout lines in the earlier GitHub recovery draft.

### Wallet
First Visit:
`150G + Level×8 + random(0,60)`

Revisit:
`previous Persistent Wallet + Level×8 + random(0,60)`

Reason:
- satisfies the already-approved D1 global baseline increase
- changes the smallest existing variable only
- preserves Level, RNG variation, carry, cap, Trait/Event structure

### SALE Desktop
Current authority:
- Character / Portrait left
- enlarged Bag
- Forecast + Expected Destination in upper-right Core Decision area
- NPC Wallet visible in Core Decision hierarchy
- duplicate lower destination/forecast removed

### SALE owner restoration
`SALE_v2.6.0.md` was absent.
Use `SALE_v2.6.1.md`, based on `SALE_v2.5.0.md` plus the Recovery decisions.

---

## 1. CRITICAL RUNTIME

P0 blocker:
`SALE -> NIGHT` may crash with `ReferenceError: game is not defined` in Night presentation.

Rule:
- Presentation may not implicitly read app-local `game`
- use resolved report snapshot first
- pass explicit snapshot/parameter only if needed
- no global `game` workaround

Browser acceptance:
`ORDER -> SALE -> NIGHT -> CLOSING -> next Day`
with injury and non-injury result paths, Console runtime error = 0.

---

## 2. CORE RULE RECOVERY

### Injury
injury=1:
- combat -15%
- survival -20%
- percent applies to NPC Base + Equipment only
- Sold Item Stat added after NPC-side percent

grit:
- replaces injury combat -15% with +20%
- survival -20% remains

injury=2:
- no Stat penalty
- unavailable during recovery
- completion: 2 -> 0 directly

injuryRisk:
- affects injury/severe injury only
- no direct Death chance modifier

### Fatigue
Outcome baseline:
- 성공 +2
- 대성공 +2
- 퇴각 +3
- 부상 +4
- 중상 0
- 사망 0

No Morning natural recovery.
No severe-injury forced fatigue=20.
Death fatigue gain remains 0 including Trait modifier.

Penalty:
- 0~9 none
- 10~19 mobility/spirit -10%
- 20 mobility/spirit -25%

Food/Drink recovery:
`max(0, finalFoodDrinkSupply - requiredSupply)`
using actual final contributions only.

Resolve commits final fatigue once.
Separate runtime fields:
- beforeFatigue
- fatigueRecovery
- effectiveFatigue
- actualOutcomeFatigueGain
- finalFatigue
- netFatigueDelta

### Traits / Hazard
- active Trait exact 37
- exclusion exact 16
- lucky/unlucky removed
- reckless combat +10%
- frail survival -10%
- coward old flat combat penalty removed
- single Hazard Trait ±6 component
- dual Hazard Trait ±4 each component

liar:
- Open Gate >=2, 50%
- claimed destination stays original
- actual destination changes to a different Open Gate

honest:
- successful 50/100 purchase loyalty +1
- 150 purchase intent -10%p

rich:
- actual visit +50 exactly once
- cap 2000

---

## 3. NPC WALLET

First:
`150 + Level×8 + random(0,60)`

Revisit:
`previous Persistent Wallet + Level×8 + random(0,60)`

- 150 fixed base first visit only
- successful purchase reduces Persistent Wallet
- all permanent increase paths cap 2000
- rich separate actual-arrival +50
- Event temporary budget separate, non-carry, outside cap

Expedition wallet baseline and existing outcome multiplier stay as current approved rules.

---

## 4. PRODUCT UNLOCK / SAVE

D10 Premium Lunch:
- permanent account unlock before D10 Offer generation
- same D10 Offer can include
- new Run still day-gated before D10
- toast once/account

D14 World Tree Amulet: same structure at D14.

Save exact:
- KEY v7
- legacy v1~v6
- envelope 7
- export 7
- validation 7
- run.version 7
- no old-save migration
- no automatic deletion of incompatible old save
- Full Reset performs deletion
- unlock boolean shape validation

---

## 5. ORDER RECOVERY

Flow:
`수량 선택 -> 발주 확정 -> Inventory 반영 -> cart clear -> ORDER 유지`

Optional:
`Reroll -> unconfirmed cart only clear -> cost -> full Offer replacement -> confirmed Inventory preserved -> re-order`

Final:
separate `영업 시작 -> SALE`

Reroll works with nonzero unconfirmed cart.
No manual zero-reset requirement.

Current base curve:
`50 -> 100 -> 200 -> 400 -> 800 -> x2`
next-day reset, no pity advance.

Before commit show:
- shelf life
- current Gold
- selected spend
- after-order Gold
- today expected operating cost
- warehouse used/remaining
- current Reroll cost
- current Gate/Hazard
- next-day Tier forecast

Mobile/Desktop Runtime:
quantity/confirm/reroll/re-confirm does not jump to top; preserve practical focus.
D30 Final ORDER included.

---

## 6. SALE RECOVERY

Desktop:
- Character left
- Bag larger
- Forecast + Expected Destination upper-right
- Wallet visible
- no duplicate lower blocks

Mobile:
- compact Character/status top
- no crop
- Bag larger without overlap/overflow
- destination compact
- Forecast in decision flow
- core environment visible without tap
- no duplicate environment/forecast

Wallet:
visible before price decision.

Stat Source:
- changed number highlight
- actual active sources only
- beneficial/detrimental semantic treatment
- no always-on ledger
- Wallet/purchase intent/revisit excluded

NPC Detail:
- actual injury effect
- fatigue/tier/penalty
- severe recovery remaining
- fatigue recovery method

Scroll/focus preserve within same Customer after item/price/purchase/refusal/detail interactions.
Only new Customer may reset to top.

Preload only next portrait with minimal browser preload.

---

## 7. NIGHT / RESULT

Exactly two controls:
- 다음
- 전체 건너뛰기

Remove single skip / active nightSkip path.

Show separated fatigue truth, actual injury effect, severe duration, `NPC 소지금 획득`.

Causality only from actual resolved proof.
Mere ownership/compatibility is insufficient.

---

## 8. MENU / SETTINGS / RESET

Top-level exactly:
- 모험가 수첩
- 도감
- 점포지원
- 점주 가이드
- 설정
- 현재 지점 포기

Remove top-level Sound and Full Reset.
Rename `설정 · 저장` -> `설정`.

Settings:
- 저장 내보내기
- 저장 가져오기
- Sound
- BGM
- SFX
- Full Data Reset

No current-run abandon inside Settings.

Full Reset:
- Run/Account/Meta/Tutorial/unlocks/toasts fresh
- Tutorial appears again

Abandon:
- current Run only
- Account/Meta/Tutorial/unlocks/toasts preserved
- no settlement/reward

---

## 9. COPY AUDIT

Reuse the existing full extraction as baseline; re-extract delta from current Source after Recovery.
Do not rewrite all copy automatically.

Priority:
P0 start/tutorial/system/menu/settings/relic/trait/order/sale/night
P1 item/event/help
P2 low-frequency flavor

Already approved targeted terms:
- 폭식 -> 탐식
- 전리품 -> NPC 소지금 획득
- 탈출 보정 -> 탈출 확률
- 부상 위험 -> 부상 확률
- 1200G / 24칸 -> 1000G / 18칸
- 교환권 30G -> 50G
- liar text -> 50%
- 설정 · 저장 -> 설정

Other copy changes require User approval.

---

## 10. QA POLICY

QA purpose:
- Canonical mismatch detection
- Regression detection
- Runtime failure detection
- Missing Adoption detection
- stale Test detection

Forbidden to manufacture PASS by:
- Source modification during frozen QA
- Test weakening/removal
- changing Expected to Runtime actual
- Harness manipulation
- favorable Seed selection

Finding flow:
QA STOP -> Finding -> separate Fix Cycle -> minimal Fix -> Commit -> Freeze -> QA again.

Primary acceptance is defined by current v2.6.1 QA owner files.

---

## 11. v2.7 EXCLUSION

Do not implement in v2.6.1:
- fixed 2-slot Bag for all NPCs
- Counter Handling / Action Layer
- Item Role major rebalance
- stronger third-axis Fatigue redesign
- past Bag / Item attachment expansion
- D-Day / Recon restructure
- D25 Final Hazard pre-disclosure
- Expedition Purpose
- store-growth visual expansion

v2.6.1 finishes v2.6. It does not pre-build v2.7.
