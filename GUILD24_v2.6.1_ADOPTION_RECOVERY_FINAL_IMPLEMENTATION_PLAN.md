# v2.6.1 Adoption Recovery — 최종 구현 계획

이번 작업은 v2.6 Design의 누락·회귀를 Current Source에 복구하는 corrective patch다.
v2.7 기능은 구현하지 않는다.


==================================================
1. 시작 전 필수 확인
==================================================

Repository 파일 중 가장 먼저:

1. AGENTS.md

그 다음:

2. 이 구현 계획
3. design_ssot/SPEC_INDEX_v2.6.1.md
4. 각 Task의 Current Owner Spec + Current QA
5. 해당 Task가 inherited 영역을 건드릴 때만 BASE_DOCUMENT의 관련 부분
6. GUILD24_v2.6.1_ADOPTION_RECOVERY_PLAN.md
7. 필요한 Current Source / Target Test

순서로 확인한다.

Design Truth:
SPEC_INDEX_v2.6.1
→ Current Owner Spec / QA

Recovery Plan은 실행/복구 참고 문서이며 Design authority가 아니다.
충돌 시 Current Owner Spec을 따른다.

Current Owner:

- CORE_RUN_v2.6.1.md
- META_v2.6.1.md
- ECONOMY_ORDER_v2.6.1.md
- NPC_TRAIT_v2.6.1.md
- SALE_v2.6.1.md
- NIGHT_CLOSING_v2.6.1.md
- UI_UX_v2.6.1.md

Current QA:

- CORE_RUN_QA_v2.6.1.md
- ECONOMY_ORDER_QA_v2.6.1.md
- NPC_TRAIT_QA_v2.6.1.md
- UI_UX_QA_v2.6.1.md

필요 시:
- DUNGEON_ITEM_QA_v2.5.0.md
- RELIC_QA_v2.5.0.md

실행/test 명령은 package.json을 확인한다.

구현 직전:

git rev-parse HEAD
git status

Expected baseline:
18dbbedc

더 최신의 정상적인 User-approved commit이 있으면 과거 HEAD로 되돌리지 말고
현재 clean HEAD를 baseline으로 기록한다.

설명되지 않는 dirty tree에서는 시작하지 않는다.

AGENTS.md 기준으로:

- 한 logical task = 한 commit
- commit 전 git diff
- targeted verification 후 commit
- unrelated refactor 금지
- PASS를 위해 Source/Test/Harness 약화 금지
- 새 Player-facing copy 임의 작성 금지
- v2.7 선제 구현 금지


==================================================
2. 구현 순서
==================================================

0. Test Harness
--------------------------------------------------

Commit:
fix: test harness non-zero exit on FAIL

Target:
tests/v26_acceptance.cjs

현재 assertion FAIL이 발생해도 exit 0이 될 수 있는 문제를 수정한다.

검증:
FAIL 발생 시 process exit ≠ 0.


1. NIGHT ReferenceError
--------------------------------------------------

Commit:
fix: resolve nightChanges ReferenceError

Issue:
presentation.js의 nightChanges()가 존재하지 않는 module-scope game을 참조.

Rule:
resolved report/snapshot을 우선 사용하고,
필요한 데이터는 caller가 명시적으로 전달한다.
global game 추가 금지.

검증:
Browser에서

ORDER → SALE 전체 → NIGHT
→ injury + non-injury
→ 다음 / 전체 건너뛰기
→ CLOSING → NEXT DAY

Console Error = 0.


2. Major Injury Recovery
--------------------------------------------------

Commit:
fix: major injury recovery 2 to 0

Issue:
injury 2 → 1 → 0

Current Design:
recovery 완료 시 2 → 0 직행.

검증:
NPC-Q66 관련 case.


3. Save v7 Exact
--------------------------------------------------

Commit:
fix: save v7 run version and validation

Expected files:
shop.js
save.js
meta.js
관련 tests

Requirements:

- new Run run.version = 7
- Save.valid() rejects run.version != 7
- required account.unlocks keys boolean validation
- malformed unlock shape reject
- Meta.fresh()도 current required unlock keys를 false boolean으로 초기화
- fresh account save/load 정상
- legacy v1~v6 migration 금지

기존 unlocks:{}를 살리기 위해 validation을 느슨하게 만들지 않는다.


4. Injury / Grit UI
--------------------------------------------------

Commit:
fix: grit UI trait id and injury display

Fix:

- stubborn → grit
- injury=1:
  combat -15%
  survival -20%
- injury=1 + grit:
  combat +20%
  survival -20%
- injury=2:
  Stat penalty 없음

UI와 실제 계산이 일치해야 한다.


5. Liar Adoption
--------------------------------------------------

Commit:
fix: liar destination and stale showoff

Expected files:
shop.js
catalog.js
copy.js
관련 liar tests/fixtures

Fix:

- Open Gate >= 2에서 50%
- claimed destination = original Gate
- actual destination = 다른 Open Gate
- showoff stale key → liar
- dead showoffLie:.6 제거
- liar stale 설명 수정

기존 Player-facing Night 문구
'허세를 부린 ...'은 exact 승인 문구가 없으면 수정하지 않고 Copy Audit finding으로 남긴다.


6. Wallet First Visit
--------------------------------------------------

Commit:
fix: NPC wallet first visit baseline 150G

Current:

First Visit:
150 + Level×8 + random(0,60)

Revisit:
previous Persistent Wallet
+ Level×8
+ random(0,60)

Cap:
2000

관련 stale test expectation도 같은 commit에서 150 기준으로 수정한다.


7. Rich / Event Budget
--------------------------------------------------

Commit:
fix: event budget timing after rich arrival

Order:

actual arrival
→ rich +50
→ Persistent Wallet cap 2000
→ eventBudget 계산

rich는 실제 방문당 정확히 1회.


8. SALE Scroll Continuity
--------------------------------------------------

Commit:
fix: SALE scroll selector

현재 잘못된 .sale-product.open selector를 실제 구조에 맞게 수정한다.

검증:
Desktop + Mobile Browser에서 같은 손님의 상품 선택/가격 Interaction 후
화면이 위로 튀지 않아야 한다.


9. D10 / D14 Unlock
--------------------------------------------------

Commit:
feat: D10 D14 unlock activation and toast

Expected files:
meta.js
shop.js
app.js
관련 tests

Premium Lunch:

- Account 최초 D10 도달 시 unlock
- D10 Offer generation 전에 activation
- D10부터 candidate 가능
- 새 Run D1~D9에서는 다시 차단

World Tree Amulet:

- Account 최초 D14 도달 시 unlock
- D14 Offer generation 전에 activation
- D14부터 candidate 가능
- 새 Run D1~D13에서는 차단

Toast exact:

새 상품 해금 · 길드 프리미엄 도시락
새 상품 해금 · 세계수 생환부적

Abandon:
unlock/toast state 보존

Full Reset:
초기화

검증은 itemUnlocked() 단독으로 끝내지 않는다.

Controlled actual Offer path에서:

- D9 Premium 제외
- D10 Premium candidate 가능
- D13 Tree 제외
- D14 Tree candidate 가능

을 확인한다.

Browser에서는 toast / reload 중복 / Abandon / Full Reset 확인.


10. Menu / Settings
--------------------------------------------------

Commit:
fix: menu exact composition and label

Top Menu exact 6:

- 모험가 수첩
- 도감
- 점포지원
- 점주 가이드
- 설정
- 현재 지점 포기

Top-level에서 제거:

- Sound
- Full Reset

설정 · 저장
→ 설정

Sound / BGM / SFX / Save Import·Export / Full Reset은 Settings 내부.


11. ORDER Confirm / 영업 시작 분리
--------------------------------------------------

Commit:
feat: ORDER confirm and start sale separation

Flow:

수량 선택
→ 발주 확정
→ Inventory 반영
→ cart clear
→ ORDER 유지
→ 별도 영업 시작
→ SALE

발주 확정이 SALE을 시작하면 안 된다.
영업 시작이 미확정 cart를 몰래 확정해서도 안 된다.

Browser 검증 필수.


12. ORDER Reroll
--------------------------------------------------

Commit:
feat: ORDER reroll with active cart

Requirements:

미확정 cart가 있어도 Reroll 가능.

Reroll:

- cart만 clear
- confirmed inventory 유지
- 비용 1회 차감
- Offer 전체 교체
- manual 수량 0 요구 없음

Desktop + Mobile에서 scroll/focus도 확인.


13. ORDER Decision Info
--------------------------------------------------

Commit:
feat: ORDER shelf life and operating cost info

Expected files:
app.js
필요 시 관련 UI file
relics.js

표시:

- 발주 후보 shelf life
- 현재 Gold
- 선택 발주 금액
- 발주 후 Gold
- 오늘 예상 운영비
- 창고 사용/잔여
- 현재 Reroll cost

운영비는 Closing과 동일한 기존 계산 truth를 재사용한다.
별도 계산식 생성 금지.

확정 stale copy:

발주 교환권
"이후 30G부터"
→
"이후 50G부터"


14. SALE Wallet
--------------------------------------------------

Commit:
feat: SALE NPC wallet display

가격 결정 전에
NPC Current Persistent Wallet이 Core Decision 영역에서 보여야 한다.


15. SALE Environment / Layout
--------------------------------------------------

Commit:
feat: SALE environment hierarchy and responsive layout

Expected files:
app.js
current owning stylesheet

Fix:

- Forecast / Destination 중복 제거
- Desktop: upper-right Core Decision area
- Mobile: 핵심 환경 정보 tap 없이 표시
- Bag overlap/overflow 금지
- 지나친 압축 multi-column 금지

Desktop + Mobile Browser 검증 필수.


16. SALE Stat Source
--------------------------------------------------

Commit:
feat: SALE stat source and trait effect labels

Expected files:
app.js
presentation.js
관련 stylesheet/tests

Fix:

- 변경된 Stat의 실제 helpful/harmful source 표시
- inactive source 표시 금지
- touch/click detail에서 actual applied calculation breakdown
- honest/rich/grit 등 Current Trait effect key의 누락 label 복구

Wallet / purchase intent / revisit weight는 Stat Source로 표시하지 않는다.

Browser + Mobile 검증 필수.


17. Portrait Preload
--------------------------------------------------

Commit:
feat: SALE next portrait preload

현재 손님 다음 1명 portrait만 최소 preload.

별도 cache framework 추가 금지.

Acceptance:
실제 Mobile에서 다음 NPC 전환 시 blank/loading regression 없음.


18. Night Fatigue Reporting
--------------------------------------------------

Commit:
fix: night fatigue reporting fields

Resolved report에서 구분:

- beforeFatigue
- fatigueRecovery
- effectiveFatigue
- actualOutcomeFatigueGain
- finalFatigue
- netFatigueDelta

Player-facing Night 최소 표시:

- relevant fatigueRecovery
- actualOutcomeFatigueGain
- finalFatigue

netFatigueDelta를 Outcome Gain으로 표시 금지.


19. Hidden Luck Cleanup
--------------------------------------------------

Commit:
fix: remove stale hidden luck references

Remove:

- stale luck presentation label/set
- retired hidden Luck axis 관련 test/fixture refs

일반 RNG 자체를 제거하지 않는다.


20. Approved Stale UI Copy
--------------------------------------------------

Commit:
fix: approved stale UI copy

Fix only already-approved stale copy:

- Night Tutorial의 단독 '건너뛰기' 안내 제거
- 기타 Current SSOT에 exact replacement가 있는 항목만 수정

새 문구 임의 작성 금지.


21. Dead Wallet Constants
--------------------------------------------------

Commit:
fix: remove dead wallet balance constants

Target:
relics.js

Before edit exact search:

walletBase
walletLevel
walletCarry

실제 Production 미사용이면 제거.

unexpected active dependency가 있으면 삭제하지 말고 보고한다.


22. Copy Audit
--------------------------------------------------

Task:
chore: extract v2.6.1 player-facing copy audit

- exact 승인 replacement만 적용
- 나머지는 finding으로 보고
- Player-facing 문구 임의 작성 금지
- liar Night stale 문구도 승인 replacement 없으면 report only


==================================================
3. Test 수정 원칙
==================================================

stale test를 마지막에 한 번에 고치지 않는다.

Source rule과 같은 logical task에 속하는 test/fixture라면
같은 commit에서 Current Canonical 기준으로 갱신한다.

예:

- Save → Commit 3
- liar/showoff → Commit 5
- Wallet 100→150 → Commit 6
- lucky/unlucky → Commit 19

FAIL을 없애기 위해 assertion을 약화하거나 삭제하지 않는다.


==================================================
4. 각 Commit 후
==================================================

반드시:

git diff
→ targeted test
→ interaction-sensitive면 Browser verification
→ commit

순서.

관련 없는 전체 test를 매 commit마다 돌릴 필요는 없다.


==================================================
5. Final Frozen QA
==================================================

시작 조건:

- 모든 intended change committed
- git status clean
- frozen HEAD 기록

그 뒤 Source/Test/Harness/Fixture FREEZE.

최소 실행:

npm test
node tests/v26_acceptance.cjs
npm run audit

Current QA:

- CORE_RUN_QA_v2.6.1
- ECONOMY_ORDER_QA_v2.6.1
- NPC_TRAIT_QA_v2.6.1
- UI_UX_QA_v2.6.1

각 QA의 BASE_DOCUMENT inheritance도 적용.

관련 unchanged QA:

- DUNGEON_ITEM_QA_v2.5.0
- RELIC_QA_v2.5.0

Browser:

Desktop + Mobile

최소 full path:

MORNING
→ ORDER
→ 발주 확정
→ 필요 시 Reroll
→ 영업 시작
→ SALE
→ 성공 거래 + 거절
→ NIGHT
→ injury + non-injury
→ 다음 / 전체 건너뛰기
→ CLOSING
→ NEXT DAY

Persistence 변경 범위:
save / reload 확인.

Required:

Console Runtime Error = 0.

Frozen QA FAIL 발생 시:

수정하지 말고 FAIL 그대로 보고.
별도 Fix Cycle
→ 수정
→ commit
→ clean HEAD
→ 다시 Freeze
→ QA 재시작.


==================================================
6. 현재 상태
==================================================

Known remaining User Design Decision:
없음.

WORK는 일반적인 구현 세부사항은
Current SSOT + Current Source 기준으로 최소 변경하여 자율 처리한다.

다음 경우에만 STOP / User 확인:

- Current Canonical 접근 불가
- Current Owner Spec 간 실제 충돌
- 새 Design / Player-facing Copy 결정 필요
- 설명되지 않는 dirty tree
- broad unexpected regression
- undocumented intended state를 추측해야 하는 경우
