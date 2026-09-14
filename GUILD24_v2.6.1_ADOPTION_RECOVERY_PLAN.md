# GUILD24 v2.6.1 — Adoption Recovery Plan

> **기반 소스**: GUILD24 v2.6.0 현재 Production
> **설계 기준**: v2.6에서 최종 승인된 Canonical + 구현/QA 과정에서 확정된 최신 결정
> **작업 성격**: v2.6.0에서 누락·회귀·불완전 구현된 Adoption을 복구하는 **PATCH IMPLEMENTATION PLAN**
> **버전 의미**: 새로운 v2.7 기능을 추가하지 않는다. v2.6 Design을 실제 Source에 완성시키는 corrective patch다.
> **QA 원칙**: PASS가 목적이 아니다. Canonical과 Source의 불일치를 검출하는 것이 목적이다. Test 약화/삭제로 PASS를 만들지 않는다.

---

# 0. VERSION RULE

## v2.6.0
초기 v2.6 Adoption 구현본. QA 이후에도 일부 Canonical 누락/회귀가 실제 플레이에서 발견된 상태.

## v2.6.1
v2.6.0의 기능 범위를 유지하면서 아래를 복구하는 Patch:
- 누락된 v2.6 구현
- QA 중 발견된 Implementation Bug
- v2.6 진행 중 User가 최종 확정한 수치/UX 변경
- 실제 모바일 Runtime에서 드러난 v2.6 UX Regression

**새 Core Feature를 추가하지 않는다.**

## v2.7.0
별도 Core Play Revision:
- 고정 2칸 Bag
- Counter Handling / Action Layer
- Item Role Rebalance
- Final D-Day / Recon 재구성
- 기타 v2.7 문서 범위

즉:

> **v2.6.1 = v2.6을 제대로 완성하는 Patch**
>
> **v2.7.0 = 다음 구조 개편**

---


# 0-A. CURRENT RECOVERY / FORENSIC STATUS

현재 v2.6.0 main은 **완전한 v2.6 Adoption 완료본으로 간주하지 않는다.**

실제 모바일 플레이와 Source 대조에서 이미 확인된 Known Regression / Missing Adoption:

```text
CRITICAL
- SALE 종료 후 NIGHT 진입 시 `ReferenceError: game is not defined` 가능
  - dist/ui/presentation.js의 nightChanges()가 module scope에 없는 `game`을 참조
  - injury result 렌더 경로에서 Runtime crash 가능

CONFIRMED MISMATCH
- MENU / SETTINGS exact composition 미반영
- ORDER confirm / reroll / separate 영업 시작 Flow 미완성
- Save envelope는 v7이나 새 Run의 run.version이 6인 경로 존재
- Major Injury recovery가 2→1로 내려가는 경로 존재
- 일부 v2.6 SALE/Mobile UX가 Canonical대로 구현되지 않음

RUNTIME UX BUG
- ORDER 수량 조작 후 scroll position이 위로 튀는 현상
- SALE 상품 선택/가격 Interaction 후 scroll position이 위로 튀는 현상
```

## Git Forensic Rule

기존 Stage 8.5 Director UI layer 자체는 현재 Repo에 남아 있으며
`dist/ui/director-review.css`도 로드되고 있다.

따라서 현재 문제를
“예전 UI 전체가 하나의 Commit에서 통째로 롤백되었다”
고 단정하지 않는다.

확인 가능한 History:

```text
520e7db  copy audit create / v2.5-side baseline
↓
[commit되지 않은 v2.6 작업 및 recovery incident]
↓
914d15d  checkpoint: v2.6 recovery-blocked state
↓
443d4f1  canonical source corrections
...
221364e  QA 과정에서 app.js Production 변경
```

- `game is not defined` dependency는 `520e7db`에는 없고 `914d15d`에는 이미 존재한다.
- 따라서 이 오류는 **520e7db ~ 914d15d 사이의 uncommitted v2.6 작업/recovery 구간에서 유입**된 것으로 확인된다.
- exact pre-recovery snapshot이 없으므로 더 세부적인 최초 유입 시점은 추측하지 않는다.
- `221364e`에서는 Menu/Reset 관련 Production UI가 다시 변경되었으므로 해당 부분은 별도 Regression Audit 대상이다.
- 과거 Commit을 통째로 checkout하여 복원하지 않는다.
- 최신 Canonical + 현재 Source + 증명 가능한 과거 UI Commit을 비교하여 **필요한 변경만 재구현**한다.

## Critical Runtime Fix Rule

`Presentation` module은 app-local variable인 `game`을 암묵적으로 참조하지 않는다.

Night injury 표시에서 NPC Trait/상태가 필요하면:
1. 이미 resolve report가 보유한 확정 Runtime data를 우선 사용하고,
2. 부족하면 호출자가 필요한 snapshot/data를 명시적으로 전달한다.

`global game` 추가 같은 우회 금지.

최소 수정 후 반드시 실제 Browser Runtime으로:

```text
ORDER
→ SALE 전체 손님 처리
→ NIGHT 진입
→ injury / non-injury result 렌더
→ 다음 / 전체 건너뛰기
→ CLOSING
→ 다음 Day
```

를 통과하고 Console Runtime Error = 0인지 확인한다.

---

# 1. CORE RULES

## 1.1 Injury / Major Injury

### injury = 1
- combat -15%
- survival -20%

계산 대상:
```text
NPC Base + Equipment
```

Sold Item Stat에는 위 %를 적용하지 않는다.

### grit / 악바리
injury=1일 때:
- 일반 combat -15%를 적용하지 않는다.
- 대신 combat +20%.
- survival -20%는 유지.

공식:
```text
(Base Combat + Equipment Combat) × 1.20
+ Sold Item Combat
```

### injury = 2 / 중상
- Stat penalty 없음.
- recovery 중 일반 방문 불가.
- recovery 완료 시 **injury=0 건강 직행**.
- `2 → 1` 경유 금지.

### injuryRisk
- 부상 / 중상 확률에만 적용.
- Death chance에 직접 더하지 않는다.
- `careful`, `reckless` 등 injuryRisk Trait이 사망 굴림을 직접 바꾸는 경로는 없어야 한다.

---

# 2. FATIGUE

## 2.1 Outcome Gain — 최종 확정

```text
성공      +2
대성공    +2
퇴각      +3
부상      +4
중상       0
사망       0
```

- Morning 자연 회복 없음.
- 사망은 Trait modifier를 포함해 항상 fatigue gain = 0.
- 중상은 baseline 0이며 non-death Trait fatigue modifier는 정상 적용.
- 중상이라고 fatigue=20을 강제하지 않는다.

## 2.2 Fatigue Penalty

```text
0~9     penalty 없음
10~19   mobility -10%, spirit -10%
20      mobility -25%, spirit -25%
```

NPC-side % modifier이므로 Sold Item Stat에는 적용하지 않는다.

## 2.3 Food / Drink Recovery

```text
fatigueRecovery
= max(0, finalFoodDrinkSupply - requiredSupply)

effectiveFatigue
= max(0, currentFatigue - fatigueRecovery)
```

원칙:
- requiredSupply를 먼저 소비.
- 남은 **실제 final Food/Drink Supply**만 fatigue recovery에 사용.
- T1 `requiredSupply=0`이면 실제 Food/Drink final supply 전부 회복 가능.
- 무료 회복 보너스 없음.
- Raw `item.effects.supply`를 별도 중복 계산하지 않고 실제 최종 per-item contribution 재사용.

## 2.4 Commit / Preview

SALE Preview:
- effectiveFatigue를 계산할 수 있음.
- 예상 fatigue tier / mobility / spirit / 전망을 재계산.
- persistent `n.fatigue` 변경 금지.

Resolve:
```text
effectiveFatigue
+ actualOutcomeFatigueGain
+ applicable Trait fatigue modifier
→ clamp 0~20
```

최종 fatigue는 `resolve()`에서 1회만 Commit.

Runtime / Night / QA는 아래를 분리:
```text
beforeFatigue
fatigueRecovery
effectiveFatigue
actualOutcomeFatigueGain
finalFatigue
netFatigueDelta
```

**Net Delta를 Outcome Gain으로 보고하지 않는다.**

---

# 3. CORE STAT TRAIT / HAZARD TRAIT

## 3.1 Core Stat %

- reckless: combat +10%
- frail: survival -10%
- coward: 기존 combat -3 삭제
- grit: injury combat -15%를 +20%로 대체

공식:
```text
(NPC Base + Equipment)
× NPC-side Trait / Condition modifier
+ Sold Item Stat
```

## 3.2 Hidden Luck

- lucky 삭제
- unlucky 삭제
- active hidden luck axis 제거
- prepare / resolve / escape / combat noise 등에 hidden luck reference = 0

## 3.3 Hazard Traits

Single:
- ±6 component

Dual:
- 각 해당 Hazard component에 ±4

예:
```text
antitoxin: poison +6
sensitive: poison -6

sharpeye: dark +4 / whiteout +4
nearsight: dark -4 / whiteout -4

nimble: bind +4 / mire +4
clumsy: bind -4 / mire -4
```

Aggregate Hazard penalty가 비선형 계산으로 ±4/±6과 다른 Delta를 보여도,
Canonical 검증 기준은 **각 component의 정확한 적용값**이다.

---

# 4. TRAIT POOL

Active Trait Pool = **정확히 37종**.

삭제:
```text
lucky
unlucky
```

변경:
```text
showoff → liar
```

신규:
```text
honest
rich
sensitive
nimble
clumsy
maintain
butterfingers
heatproof
nearsight
```

## 4.1 주요 Trait

### liar
- Open Gate >= 2일 때 50%.
- 실제 목적지를 **반드시 다른 Open Gate**로 변경.
- claimed destination은 원래 목적지 유지.
- 별도 Power 조건 추가 금지.

### honest
Direction = MIXED.

- 정가 / 할인 **구매 성공 거래에 한해** loyalty +1.
- 바가지 purchase intent -10%p.

### rich
- actual visit당 Persistent Wallet +50G.
- first/revisit 모두 적용.
- actual arrive path에서 정확히 1회.
- 최종 Persistent Wallet cap 2000.

### stamina
- result fatigue -1.

### weary
- result fatigue +1.

### grit
- injury combat replacement +20%.
- result fatigue +1.

## 4.2 Mutual Exclusion — Exact 16

```text
1. brave ↔ coward
2. eater ↔ small
3. careful ↔ reckless
4. frugal ↔ impulse
5. strong ↔ frail
6. collector ↔ thrifty
7. stamina ↔ weary
8. social ↔ shy
9. frail ↔ mender
10. antitoxin ↔ sensitive
11. nimble ↔ clumsy
12. maintain ↔ butterfingers
13. heatproof ↔ pyrophobia
14. sharpeye ↔ nearsight
15. aloof ↔ coldhand
16. honest ↔ liar
```

lucky/unlucky exclusion pair 없음.

---

# 5. NPC WALLET

## 5.1 Visit Wallet

First Visit:
```text
100G + Level×8 + random(0,60)
```

Revisit:
```text
previous Persistent Wallet 100%
+ Level×8
+ random(0,60)
```

- 100G base는 first visit only.
- 판매 성공 시 Persistent Wallet 감소.
- 모든 permanent increase path 최종 cap = **2000G**.

## 5.2 Expedition Wallet Gain

Baseline:
```text
70 + Day×7
```

기존 Outcome / Dungeon Reward multiplier 유지.

Trait:
```text
greed   +30%
careful -10%
coward  -15%
```

## 5.3 rich / Event Budget

rich +50:
- Morning formula에 넣지 않음.
- actual visit에서 1회.
- +50 후 cap 2000.

Event temporary purchase budget:
- Persistent Wallet과 분리.
- 2000 cap 밖.
- 이월 없음.
- 산출 기준 Persistent Wallet은 rich +50 / cap 처리 이후 값.

---

# 6. PRODUCT UNLOCK / PRICE

## 6.1 Premium Lunch

- Account가 D10에 최초 도달하면 영구 unlock.
- 해당 Run D10 Offer generation 전에 unlock 처리.
- 같은 D10 Offer부터 등장 가능.
- 새 Run에서는 Account unlock 상태라도 다시 D10 전까지 Offer 금지.

Toast:
```text
새 상품 해금 · 길드 프리미엄 도시락
```

## 6.2 World Tree Amulet

- Account가 D14에 최초 도달하면 영구 unlock.
- 해당 Run D14 Offer generation 전에 unlock 처리.
- 같은 D14 Offer부터 등장 가능.
- 새 Run D14 gate 유지.

Toast:
```text
새 상품 해금 · 세계수 생환부적
```

## 6.3 Reset Scope

Full Reset:
- unlock + toast reset

Abandon:
- unlock + toast preserve

## 6.4 Golden 1+1

```text
buy  500
sell 1000
```

---

# 7. ORDER

## 7.1 Canonical Flow

```text
수량 선택
→ 발주 확정
→ Inventory 반영
→ cart clear
→ ORDER Phase 유지

필요하면:
미확정 cart가 있는 상태에서도 Reroll
→ 미확정 cart만 clear
→ 비용 1회 차감
→ Offer 전체 교체
→ 이미 확정된 Inventory 유지

다시:
수량 선택
→ 발주 확정

최종:
별도 `영업 시작`
→ SALE
```

### 반드시 분리

`confirmOrder()`:
- purchase commit only.
- ORDER 유지.

`finishOrder()` / 영업 시작:
- SALE 전환 only.
- 내부에서 자동 `confirmOrder()` 호출 금지.

## 7.2 Reroll

- 선택 수량을 0으로 되돌릴 필요 없음.
- 현재 unconfirmed cart가 있어도 즉시 사용 가능.
- unconfirmed cart만 삭제.
- confirmed inventory는 유지.
- 전체 Offer replacement임을 Player가 바로 이해할 수 있는 Copy 사용.
- same-day cumulative cost.
- next-day reset.
- 현재 비용 / 다음 비용 또는 누적 구조가 판단 가능하게 보여야 함.
- 기존 `후보 전체 교환` 같은 표현이 실제 플레이에서 모호하면 **Copy Audit 대상**으로 올린다. 새 문구는 User 승인 없이 임의 확정하지 않는다.

## 7.3 발주 판단 정보

ORDER에서 발주 전에 반드시 확인 가능:

- **상품 유통기한**
- 현재 보유 Gold
- 선택 발주 금액
- 발주 후 예상 Gold
- **오늘 예상 운영비**
- Warehouse 사용량 / 잔여 공간
- Reroll 현재 비용

운영비는 발주 판단의 비용이므로 SALE/Closing에서만 뒤늦게 알게 하면 안 된다.

## 7.4 Scroll / Focus Runtime UX

코드 존재만으로 PASS 금지.

Mobile/Desktop 실제 Runtime에서 아래 조작 후:
- 수량 + / -
- 수량 0 복귀
- 발주 확정
- Reroll
- 재확정

**현재 보던 상품 위치가 화면 위로 튀지 않아야 한다.**

Scroll 위치와 가능한 focus를 유지한다.

D30 Final ORDER도 동일 Flow regression 확인.

---

# 8. SALE

## 8.1 Layout — Desktop

- Character / Portrait left.
- Upper-right empty area 적극 활용.
- Bag은 시각/터치 크기 확대.
- **Bag 확대는 Capacity 증가가 아니다.**
- Forecast + Expected Destination을 upper-right Core Decision area로 이동.
- 기존 하단의 duplicate destination / forecast 제거.

## 8.2 Layout — Mobile

- Character / status top footprint 축소.
- Artwork crop 금지.
- Bag absolute visual/touch size 확대.
- **Bag UI가 status/card 영역 밖으로 overflow하거나 겹치지 않아야 한다.**
- Destination compact.
- Forecast는 지난 원정 정보 직후 배치.
- environment duplication 제거.

Mobile Core Environment Info는 **tap 없이** 보여야 한다.

예:
```text
북부 설원 폐허 I · 냉기 · 정신 압박
```

Tap은 상세보기용이지 핵심 위험을 숨기는 수단이 아니다.

## 8.3 NPC Wallet

SALE Core Decision 정보 안에서 **NPC 현재 보유 Gold를 항상 확인 가능**해야 한다.

가격 선택 전에:
- NPC current wallet
- 판매가
- 구매 가능 여부 판단
이 가능해야 한다.

## 8.4 Environment / Forecast 중복 제거

아래처럼 같은 판단을 여러 번 반복 표시하지 않는다.

```text
환경 전망 취약
부식
강인함 압박
취약
```

환경 전망 / Hazard / pressured stat 정보는 한 계층으로 정리한다.

아래와 같은 장문 설명은 기본 화면에 상시 노출하지 않고 Help/Tooltip/`?` 상세로 이동 가능:
```text
오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다...
```

## 8.5 SALE Scroll / Focus Runtime UX

초기 Handoff에서 확인된 실제 플레이 장애:

- 상품을 선택할 때 화면이 위로 이동
- 가격/상품 UI가 다시 렌더될 때 현재 위치 상실

따라서 ORDER와 동일하게 실제 Runtime에서 검증한다.

아래 Interaction 뒤 현재 보고 있던 위치를 보존:
- 상품 선택
- 가격 panel open/close
- 구매 성공
- 거절 후 재선택
- Accordion/detail open/close

새 NPC로 넘어갈 때만 의도된 상단 이동을 허용한다.

## 8.6 Stat Source UX

- changed stat number yellow highlight 유지.
- always-on numeric % / delta 추가 금지.
- 실제 적용 Source name만 stat 아래:
  - beneficial green
  - detrimental red
- 미적용 Source 표시 금지.

grit:
```text
combat   yellow + 악바리(green) only
survival yellow + 부상(red)
```

fatigue:
```text
mobility yellow + 피로(red)
spirit   yellow + 피로(red)
```

Stat source에서 제외:
```text
Wallet
Purchase intent
Revisit
```

Stat touch/click:
- actual source
- actual applied value
- calculation breakdown

## 8.7 NPC Detail

표시:
- actual injury effect
- current fatigue
- current fatigue tier / active penalty
- major injury remaining rest days
- fatigue recovery method

## 8.8 Portrait Loading

- 현재 SALE portrait 정상 표시.
- **다음 손님 Portrait만 미리 preload**:
  `new Image().src = ...`
- 복잡한 cache framework 추가 금지.
- 실제 모바일에서 다음 NPC 전환 시 portrait blank/loading 체감이 감소하는지 Runtime 확인.

---

# 9. NIGHT / RESULT

## 9.1 Controls

정확히:
```text
다음
전체 건너뛰기
```

삭제:
```text
단독 건너뛰기
active nightSkip reference/API
```

두 버튼의 위계가 지나치게 달라지지 않도록 한다.

## 9.2 Result Information

표시:
- fatigueRecovery
- actualOutcomeFatigueGain
- finalFatigue
- actual injury effect
- major injury remaining duration
- **NPC 소지금 획득**

`전리품`처럼 Player Gold로 오해할 표현 금지.

## 9.3 Runtime Causality

Item / Trait / Event가 **실제로 판정 결과를 방지·완화·변경한 Runtime proof가 있을 때만** 원인으로 표시.

금지:
- Bag에 있었기 때문에 원인으로 표시
- compatibility만 맞아서 원인으로 표시
- generic Event text만 보고 원인으로 표시

예:
```text
불룡볶음면 → 냉기 위험 감소
```
처럼 모호한 소유/상성 설명만 남기지 말고,
실제로 판정에 영향을 줬다면 무엇을 방지/완화/변경했는지 보여준다.

Runtime proof가 없으면 원인으로 단정하지 않는다.

---

# 10. MENU / SETTINGS / RESET

## 10.1 Top-level Menu

정확히:
```text
모험가 수첩
도감
점포지원
점주 가이드
설정
현재 지점 포기
```

제거:
```text
Top-level Sound Toggle
Top-level Full Data Reset
```

Rename:
```text
설정 · 저장 → 설정
```

## 10.2 Settings

내부:
```text
저장 내보내기
저장 가져오기
Sound On/Off
BGM
SFX
Full Data Reset
```

Settings 내부:
```text
현재 지점 포기 금지
```

## 10.3 Full Reset

Fresh 초기화:
- Run
- Account / Meta
- Tutorial
- D10/D14 unlock
- unlock toast
- 해당 계정 진행

**Full Reset 후 Tutorial이 다시 등장해야 한다.**

## 10.4 Abandon

초기화:
- current Run only

보존:
- Account / Meta
- Tutorial
- unlocks
- unlock toast
- meta progression

---

# 11. SAVE v7

정확히:
```text
KEY = guild24.save.v7
LEGACY = v1~v6
Envelope version = 7
Export version = 7
Validation version = 7
run.version = 7
```

- v6 Migration 없음.
- v6 이어하기 금지.
- old-version / fresh-start 안내.
- incompatible save 자동 삭제 금지.
- Full Reset에서만 실제 삭제.
- `account.unlocks` 필요한 key들의 boolean shape validation.

---

# 12. COPY AUDIT

## 12.1 목적

초기 Handoff에서 가장 큰 UX 문제로 지적된 것은
**Player-facing Copy가 설명문/AI 문체처럼 느껴지는 문제**였다.

예:
```text
하나는 무료다. 고르면 영업이 시작된다.
위험 대응과 부작용은 그대로.
```

이 문제는 v2.6.1에서 누락 여부를 반드시 Audit한다.

## 12.2 방법

**전체 Copy를 임의로 전면 Rewrite하지 않는다.**

먼저 Source에서 Player-facing 문자열을 추출해 검수 리스트를 만든다.

우선순위:
```text
P0  시작 / Tutorial / System notice / Menu / Settings
P0  Relic / Store Support 설명
P0  Trait name / effect / note
P0  ORDER / Reroll / Operating Cost / Unlock
P0  SALE / Forecast / Refusal / Wallet
P0  NIGHT / Result / Injury / Fatigue / Causality
P1  Item 설명
P1  Event
P1  Codex / Help
P2  Low-frequency flavor
```

검수 기준:
- 불필요하게 설명문처럼 길지 않은가
- 플레이어에게 이미 보이는 사실을 다시 설명하지 않는가
- `~그대로`, `~한다`, `~이다` 식 시스템 문서 어조가 과도하지 않은가
- 모호하거나 AI식 대구 표현이 없는가
- 동일 개념의 용어가 화면마다 다르지 않은가

### 이미 확정된 targeted copy

```text
폭식 → 탐식
전리품 → NPC 소지금 획득
탈출 보정 → 탈출 확률
부상 위험 → 부상 확률
1200G / 24칸 → 1000G / 18칸
교환권 30G → 50G
liar copy → 50%
설정 · 저장 → 설정
```

그 외 Copy는 Audit list로 보고 후 User 승인 없이 대규모 문구 변경하지 않는다.

---

# 13. TUTORIAL / HELP

최신 v2.6 규칙 반영:
- Injury
- Major Injury
- Fatigue
- Fatigue recovery
- ORDER confirm / reroll / 영업 시작 separation
- D10/D14 unlock

금지:
- stale Bag slot 증가 설명
- stale Wallet / warehouse 숫자
- stale Night skip 설명
- stale save/reset 설명

Full Reset 이후 Tutorial state fresh 확인.

---

# 14. QA / ACCEPTANCE

## 14.1 QA Philosophy

QA는 PASS 생산 단계가 아니다.

- Canonical mismatch → FAIL / Implementation Bug.
- Test assertion 삭제/완화로 PASS 금지.
- Runtime actual value를 Expected로 복사하여 PASS 금지.
- 기능이 코드에 “존재”한다는 것과 실제 Mobile Runtime에서 “동작”한다는 것을 구분.
- Functional test만으로 UX Runtime bug를 PASS 처리하지 않는다.
- Source/Test/Harness freeze 후 마지막 Run.
- Balance Finding 자동 수정 금지.

## 14.2 Functional Acceptance

1. Active Trait Pool exact 37.
2. Mutual Exclusion exact 16.
3. honest↔liar 동시 생성 불가.
4. honest MIXED.
5. lucky/unlucky active ref 0.
6. reckless +10%, frail -10% exact formula.
7. Core Stat Flat trait 잔존 없음.
8. injury=1 -15/-20.
9. grit combat +20 replacement.
10. injury=2 stat penalty 없음.
11. major recovery 2→0.
12. injuryRisk death 직접 적용 없음.
13. Stat formula order exact.
14. Sold Item stat NPC-side % 재적용 없음.
15. Fatigue baseline exact 2/2/3/4/0/0.
16. Death fatigue strict 0.
17. Major baseline0 + trait modifier.
18. Morning natural fatigue recovery 없음.
19. Fatigue 10/20 mobility/spirit penalty.
20. requiredSupply0 recovery.
21. actual final Food/Drink excess recovery.
22. Preview persistent fatigue mutation 없음.
23. rich actual visit +50 once.
24. Wallet cap2000 all persistent gain paths.
25. Event temp budget separate/non-carry.
26. first/revisit wallet formula.
27. economy traits.
28. liar 50% different Gate / claimed preserved.
29. honest transaction effects.
30. D10/D14 unlock before Offer.
31. exact toast once/account.
32. new Run day gate.
33. ORDER confirm → inventory + cart clear + phase ORDER.
34. Reroll unconfirmed cart without zeroing.
35. Reroll confirmed Inventory preserve.
36. second actual confirm works.
37. separate 영업 시작 only opens SALE.
38. Reroll cumulative same day / reset next day.
39. ORDER shelf-life shown.
40. ORDER expected operating cost shown.
41. ORDER gold / after-order gold shown.
42. ORDER Runtime scroll/focus stable on mobile.
43. D30 Final ORDER regression 없음.
44. SALE Desktop hierarchy.
45. SALE Mobile hierarchy.
46. Mobile Bag no overflow.
47. NPC Wallet visible.
48. Core environment visible without tap.
49. duplicate environment/forecast removed.
50. SALE Runtime scroll/focus stable on item/price interaction.
51. Stat Source actual names only.
52. Stat breakdown actual calculation.
53. NPC Detail injury/fatigue/major/recovery.
54. next portrait preload runtime works.
55. Night exact 2 controls.
56. active nightSkip=0.
57. Night fatigue fields separated.
58. injury effect explicit.
59. NPC 소지금 획득 terminology.
60. Runtime causality only with proof.
61. Menu exact composition.
62. Settings exact composition.
63. Full Reset scope.
64. **Full Reset after Tutorial reappears.**
65. Abandon preservation scope.
66. Save all v7 including `run.version`.
67. v6 no migration / no auto delete.
68. account unlock validation.
69. targeted copy exact.
70. Player-facing Copy inventory extracted and reviewed.
71. Tutorial/Help stale rules absent.
72. Boss Final modifier scope/order unchanged.
73. SALE 종료 → NIGHT 실제 Browser transition에서 `ReferenceError` 포함 Console error = 0.
74. injury result를 포함한 `Presentation.nightChanges()` Runtime path 정상 렌더.
75. NIGHT → CLOSING → 다음 Day 실제 Browser progression 정상.
76. UX Recovery Audit에서 Stage 8.5 retained layer와 v2.6-specific missing UX를 구분하고, 과거 Commit 통째 복원 없이 Canonical 기준 최소 복구.

---

# 15. BALANCE / MICRO MEASUREMENT

Production 수치 자동 변경 금지.

## Wallet
D1/D10/D20:
- reach rate
- sample count
- mean / median
- P10 / P25 / P75 / P90
- cap hit count/rate

D30:
- Final reach rate.
- 일반 SALE visitor Wallet = **N/A**.

## Economy Trait
- baseline expedition wallet gain
- greed
- coward
- careful
- rich
- honest overcharge -10%p

## Fatigue
- total expedition
- fatigue >=10 rate
- fatigue ==20 rate
- recovery count/rate
- recovery amount distribution
- outcome actual gain count/mean/min/max

분리:
```text
recovery
outcome gain
final fatigue
net delta
```

## Hazard
Same State + Same RNG.
- Single ±6 component.
- Dual each ±4 component.

## Core Trait / Death
- reckless
- frail
- grit
- injuryRisk direct Death influence = 0.

## Influence Hierarchy

Target:
```text
NPC Base / Level / Growth / Equipment
>
Sold Item
>
Store Support
>
Event
>
Trait
```

- compatible state.
- ceiling/floor 회피.
- Level / Growth / Equipment / Item / Support / Event / Trait 모두 측정.
- Growth가 Level을 동반하면 단독 Growth로 오인 금지.
- 위계 위반은 Balance Finding으로 보고.
- PASS 만들기 위한 자동 tuning 금지.

---

# 16. DESIGN SSOT / DOCUMENT VERSIONING

v2.6.1은 **v2.6 Design의 corrective patch release**다.

권장:
```text
SPEC_INDEX_v2.6.0
→ 역사적 v2.6.0 manifest로 보존

SPEC_INDEX_v2.6.1
→ v2.6.1 Current Manifest
```

단:
- 실제 Canonical 내용이 변경되거나 수정된 Owner Spec / QA만 `_v2.6.1`.
- 내용이 변하지 않은 문서는 기존 v2.5/v2.6 문서를 그대로 참조.
- 전체 문서를 기계적으로 v2.6.1 복사 금지.
- Adoption Recovery Plan 자체는 `v2.6.1` 실행 문서로 둔다.

---

# 17. v2.7 SCOPE EXCLUSION

아래는 v2.6.1에 선제 구현하지 않는다.

```text
- 모든 Bag 항상 2칸 고정
- Fatigue를 제3 Decision Axis로 추가 강화
- Item Role 대규모 Rebalance
- SALE Counter Handling / Action Layer
- 지난 Bag / Item Attachment 확장
- D0/D10/D20/D25 Final D-Day / Recon 개편
- D25 Final Hazard 사전 공개
- Expedition Purpose
- 매장 성장 Visual Overlay
```

v2.6.1은 **v2.6에 이미 승인된 기능을 Source에 완전히 복구하는 Patch**다.
