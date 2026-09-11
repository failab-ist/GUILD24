# GUILD24 Canonical v2.5.0 — Cross-Spec Audit Report

STATUS=PASS
DATE=2026-09-11
TARGET=GUILD24_CANONICAL_v2.5.0
CANONICAL_FILES=23
AUTOMATED_CHECKS=172 PASS / 0 WARN / 0 FAIL
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE

## 1. AUDIT SCOPE

v2.4.0의 21-file Canonical을 baseline으로 두고, v2.5에서 확정된 BOSS / META 구조를 전체 owning Spec과 QA에 전파한 뒤 cross-spec consistency를 검사했다.

v2.5 Canonical Set은 기존 21개 문서 전체를 v2.5.0으로 올리고 아래 dedicated owner를 추가한다.

- `BOSS_v2.5.0.md`
- `META_v2.5.0.md`

최종 Canonical file count=23.

## 2. CROSS-SPEC COLLISIONS FOUND / RESOLVED

### A. CORE_RUN 영구 전투력 blanket prohibition ↔ Job Mastery

기존 blanket `permanent combat power progression=NO`는 v2.5 Job Mastery와 충돌했다.

Resolved:
- hidden account-wide power=NO
- hidden Final-only Mastery multiplier=NO
- Job Mastery power는 Job의 visible `Base Stats + Growth` channel만 사용
- Matrix/Mastery truth=META
- Base/Growth effect ownership=NPC_TRAIT
- exact Mastery Base/Growth table=PASS3

### B. Global Meta XP ↔ Job Mastery progression

Resolved:
- legacy Global Meta XP / XP Level progression 제거
- Day advancement 자체는 Job Mastery / Distinct Boss Clear를 주지 않음
- Cross-run truth=META
- CORE_RUN은 Run flow/save만 소유

### C. 기존 minimal-engagement rule의 Meta-XP wording

Global Meta XP 제거 후 `Meta reward weighting`, `economy/meta pressure` 같은 표현이 stale conflict가 되므로 정리했다.

Resolved:
- anti-coasting outcome 자체는 유지
- zero-engagement가 late Day까지 경제적으로 효율적인 전략이 되는 것은 허용하지 않음
- correction은 기존 Economy / Dungeon / NPC long-term pressure를 재사용
- 새 inactivity punishment subsystem=NO
- exact overhead tuning=PASS3
- high-value boundary는 `DECISIONS RUN-002`로 유지

### D. FINAL_EXPEDITION의 Boss ownership overlap

Resolved:
- BOSS = Boss ID / Trait / reveal / Sloth / Boss-side modifier
- FINAL_EXPEDITION = Final Family pair / Hazard pool / party / formula / roll / clear

### E. D30 Family reveal ↔ Relic decision order

Resolved order:

`Final Family Pair reveal -> D30 Relic-window decision -> Final preparation -> Final lock`

SLOTH인 경우 D30 Relic-window decision 자체가 `Relic 획득 vs 봉인 해제`의 mutually exclusive choice다.

BOSS / FINAL_EXPEDITION / CORE_RUN / RELIC / UI_UX / QA wording을 같은 의미로 맞췄다.

### F. Sloth Seal Break ↔ Relic acquisition

Resolved:
- [D15,D20,D25] 중 exactly 2 distinct opportunity windows
- D30 always opportunity
- D10 never opportunity
- Relic OR Seal Break
- Seal Break=0G
- Seal Break consumes that window acquisition
- no Relic on Seal Break branch
- committed result persists; reload double-dip=NO

### G. Legacy Grade unlock / power ↔ new Meta

Resolved:
- 1 distinct Boss -> 황금 1+1 쿠폰
- 3 distinct Bosses -> 도적
- 6 distinct Bosses -> 광전사
- Franchise Grade derives from Total Job Mastery
- Franchise Grade direct gameplay effect=NONE
- Grade is not the 1/3/6 unlock gate
- old Grade gameplay gates/bonuses do not survive unless another owning Canonical explicitly reintroduces them

### H. Item catalog 30 ↔ Golden Coupon locked start

Resolved:
- Canonical Item IDs remain 30
- fresh-account eligible catalog=29
- Item 30 `황금 1+1 쿠폰` exists but is unavailable before 1 distinct Boss clear
- effect ownership=ITEM
- unlock ownership=META

### I. Six Job catalog ↔ Rogue/Berserker unlock

Resolved:
- Canonical Jobs remain six
- fresh normal generation pool=[전사,궁수,마법사,사제]
- 도적 unlock=3 distinct Bosses
- 광전사 unlock=6 distinct Bosses
- Base/Growth ownership=NPC_TRAIT

### J. GREED revenue metric duplication

Resolved:
- GREED reads Canonical `Cumulative Gross Sales`
- value is sum of actual rounded committed sale revenue before read point
- same value used by payment/history/Closing
- Boss-only wealth/revenue counter=NO

### K. v2.4 textual baseline residue after version-up

Non-behavioral baseline labels left by the mechanical version bump were normalized to v2.5 retained-baseline wording. No `_v2.4.0.md` reference or old Canonical-set token remains.

## 3. BOSS STRUCTURE VERIFIED

Roster exactly seven:
- WRATH / 분노의 마왕 래스
- PRIDE / 오만의 마왕 프라이드
- ENVY / 질투의 마왕 엔비
- GREED / 탐욕의 마왕 그리드
- GLUTTONY / 폭식의 마왕 글러트니
- LUST / 색욕의 마왕 러스트
- SLOTH / 나태의 마왕 슬로스

Verified:
- one pure seeded-RNG Boss per Run
- persisted / no Save-Load reroll
- Boss identity independent from D30 two-Family pair
- D5 Identity -> same-day Relic
- D15 Trait -> same-day Relic/Sloth decision
- D30 Family Pair -> D30 Relic/Sloth decision -> prep -> lock
- seven Boss mechanic identities present
- Final remains one CLEAR/FAIL resolution; no second post-clear ordinary resolve

## 4. META STRUCTURE VERIFIED

Verified:
- Global Meta XP=REMOVED
- 6×7 Job×Boss matrix=42 cells
- max Job Mastery=7/job
- max Total Job Mastery=42
- duplicate Job×Boss clear gives no duplicate progress
- failure gives no Mastery
- Distinct Boss count=0..7 and duplicate Boss does not increment it
- 1/3/6 unlock gates agree across META / ITEM / NPC_TRAIT / DECISIONS / UI
- Franchise Grade prestige/status only
- Monster Knowledge remains `보급 생환 N회`
- Job Mastery power boundary is visible Job Base/Growth only

## 5. PASS3 — NOT A STRUCTURAL DESIGN GAP

The following remain explicit owning-spec tuning work:
- Boss Power balance
- PRIDE combat factor
- ENVY ace penalty factor
- GREED revenue target / shortfall slope / cap
- GLUTTONY affected-rarity threshold / raw-Stat retained factor
- LUST protection threshold / charm penalty
- SLOTH 0/1/2/3-break Boss Power values
- Job Mastery Base/Growth numeric adjustment table
- Franchise Grade display thresholds
- existing Job / economy / Final numeric PASS3 items retained by owning Specs

These markers do not reopen the mechanic structures above.

## 6. NOT PROMOTED INTO CANONICAL

Deliberately excluded from this Canonical build:
- normal NPC full Name Pool entries
- Character ID ↔ Name ↔ Portrait production catalog
- portrait filenames / sprite-atlas coordinates
- production-art prompts / image-generation harnesses
- unapproved Start Contract / Store Type expansion

Boss fixed names are different: they are stable Boss identity and are Canonical in BOSS.

## 7. AUTOMATED INTEGRITY RESULTS

Automated audit result: **172 PASS / 0 WARN / 0 FAIL**.

Checked:
- SPEC_INDEX lists exactly 23 files
- physical Canonical directory exactly matches indexed set
- every document `DOC_VERSION=2.5.0`
- every document `CANONICAL_SET=GUILD24_CANONICAL_v2.5.0`
- every explicit v2.5 Canonical filename reference resolves
- no stale pre-v2.5 versioned Canonical filename references
- no stale v2.4 Canonical-set token
- no stale v2.4 baseline label
- BOSS/META routing and freeze status
- seven fixed Boss identities/names
- Boss selection/save stability
- reveal ordering across owners
- Sloth opportunity/mutual-exclusion consistency
- all seven Boss mechanic sections
- Greed revenue source ownership
- Global XP removal signatures
- 6×7 matrix and 1/3/6 unlock consistency
- Golden Coupon and Job unlock gating
- Franchise Grade no-gameplay-effect boundary
- Job Mastery power-channel consistency
- required v2.5 QA coverage
- Markdown fenced-code structural parity

## 8. RESULT

Canonical Set=`GUILD24_CANONICAL_v2.5.0`

Status=`FROZEN`

Implementation-blocking Design unresolved=`NONE`

PASS3 numeric tuning=`EXISTS ONLY WHERE EXPLICITLY MARKED`

For v2.5 Source adoption, treat this Canonical package as read-only. Source differences are Adoption Gap / Implementation Bug unless an exact-owner read reveals a genuine Design contradiction.
