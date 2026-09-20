> **SUPERSEDED / NON-CANONICAL (2026-09-20)**
> Approved v2.8 decisions are now owned by design_ssot/SPEC_INDEX_v2.8.0.md and its routed owner Specs.
> Keep this file only as planning/audit history. WORK must not use it as current Design Truth.

# GUILD24 v2.8 COPY FULL AUDIT — CURRENT SOURCE INVENTORY / REVIEW WORKING DOC

- **상태**: v2.8 COPY REVIEW WORKING DOC — 비Canonical
- **기반 Source**: `87a00050f0bffd0fcc14227333395eac7f8d88a5` (`main`, 2026-09-19)
- **목적**: v2.6 시절 Copy Audit을 현재 Production Source 기준으로 교체하고, v2.8 카피 워싱의 단일 작업 목록으로 사용
- **금지**: 이 문서의 제안/평가는 User 승인 전 Design Truth가 아니다. 실제 Rule/Numeric/UX는 Current Canonical owner를 따른다.
- **Source of Truth for current wording**: `dist/`
- **Target canonical owner when approved**: `design_ssot/COPY_WORLD_VOICE_v2.7.0.md` 또는 v2.8 승격 시 그 후속 owner

---

## 0. v2.6 AUDIT에서 가져갈 것 / 버릴 것

v2.6 Full Audit은 268개 항목을 추출했지만 당시 Source를 기준으로 하므로 현재 상태와 크게 다르다.

현재는 특히 다음이 달라졌다.

- 시작 계약 / 가맹등급 / Franchise Achievement 계층은 active progression에서 퇴역
- 시작 자금 / 창고는 1,000G / 18칸 기준
- Store Capital / Decoration / pre-Run loadout 추가
- ordinary SALE의 pre-supply 전망 / 사망 위험 / post-commit source truth 추가
- FINAL 준비 / D25 disclosure / v2.7 Boss copy 추가
- 모바일 SALE / transient speech / 새 Tutorial coach copy 추가
- 설정에 BGM / SFX mixer 존재

따라서 v2.6 항목 ID를 유지하며 부분 수정하지 않는다.
이 문서를 현재 Source의 새 기준 목록으로 삼고, 기존 v2.6 Copy Audit 파일은 제거한다.

### v2.6에서 아직 살아 있는 핵심 Finding

아래 3건은 당시 `MISLEADING_PURCHASE_INTENT`였고 **현재 Source에도 그대로 남아 있다.**

1. `겁쟁이` — “귀환석 있습니까?”
   - 겁쟁이가 귀환석 자체를 선호/구매하는 mechanic은 없음.
2. `대식가` — “많이 든 걸로 주세요.” / “먹을 게 제일 급해요.”
   - 대식가는 음식 효과 modifier이지 음식 구매 의사 Trait가 아님.
3. `탐욕` — “비싼 게 좋은 거 아닌가요?” / “이왕이면 좋은 걸로 봅시다.”
   - 탐욕은 원정 loot/escape Trait이고, 희귀·고가 구매 선호는 수집가 쪽 mechanic.

이 세 건은 v2.8 카피 워싱의 **TRUTH P0**로 유지한다.

---

## 1. v2.8 COPY REVIEW PRINCIPLE

### A. 먼저 Truth

카피가 다음 중 하나를 암시하면 실제 mechanic과 일치해야 한다.

- 무엇을 사고 싶어 하는가
- 어떤 상품이 더 잘 맞는가
- 어떤 선택이 유리한가
- 어떤 결과가 발생할 것인가
- 무엇이 다음 Run에 남는가

Flavor가 mechanic을 발명하면 안 된다.

### B. 설명은 짧게, 판단은 Player에게

현재 Canonical의 방향을 유지한다.

- 시스템 읽는 법은 알려준다.
- 정답 Item은 말하지 않는다.
- 산수는 보여줄 수 있다.
- 추천 / 최적 / 오늘 정답은 만들지 않는다.

### C. "AI 설명투" 판정 기준

다음 패턴은 우선 REVIEW 대상으로 둔다.

- 한 문단에 규칙이 3개 이상 연속 나열됨
- `~합니다 / ~됩니다 / ~할 수 있습니다`가 도움말 전반에서 반복됨
- UI에 이미 보이는 값을 다시 문장으로 설명함
- `현재 / 해당 / 실제 / 적용 / 확인 / 선택` 같은 시스템 문서어가 연속됨
- 원인 → 예외 → 주의 → 추가 설명을 한 문단에서 모두 처리함
- 세계 안의 말이 아니라 QA 문서/앱 온보딩처럼 읽힘
- 버튼/제목만으로 충분한데 보조문장이 다시 같은 뜻을 말함

### D. Voice 구분

- **System / Rule**: 짧고 정확하게
- **GUILD24 / HQ**: 건조한 사내 공지·장부·표지판
- **NPC**: 사람 말투. mechanic을 직접 설명하지 않음
- **Flavor**: 세계감/웃음/기억점. Rule을 대신하지 않음

---

## 2. CURRENT COPY — START / PRE-RUN / SYSTEM

### 현재 주요 화면 카피

| Surface | Current |
|---|---|
| 첫 화면 | `GUILD24` / `오늘도 문을 연다.` / `초기 자금 1,000G · 창고 18칸 · 30일 영업` |
| 첫 CTA | `첫 영업 준비` |
| 새 점포 Eyebrow | `길드리테일 가맹점` |
| 새 점포 기본 정보 | `시작 자금 {start}G · 창고 18칸 · 마왕성 개방까지 30일.` |
| 시작 재고/장식 안내 | `시작 재고는 창고에 있다. 이번 영업에 적용될 장식은 아래와 같다.` |
| 장식 Header | `이번 영업의 장식` |
| 장식 없음 | `아직 보유한 장식이 없습니다. 영업을 마치면 점포 자본이 쌓입니다.` |
| 장식 보유 | `영업이 시작되면 이번 영업에는 고정됩니다.` |
| 점포 관리 | `점포 관리 · 자본 {N}` |
| Seed | `재현용 Seed 지정` / `비워 두면 새로운 Seed로 시작합니다.` |
| Run abandon warning | `지금 진행 상황을 모두 포기하고 새로운 점포를 시작합니다. 점포 자본을 포함해 보상은 전혀 없습니다.` |
| Meta retention | `본사 기록은 그대로 남습니다. 도감 · 점포 자본 · 보유 장식은 지워지지 않습니다.` |

### REVIEW

- **P1 WORLD BREAK**: `재현용 Seed 지정`은 개발/QA 언어가 그대로 Player UI에 있음. v3 공개 경계 전 제거/Debug 이관 후보.
- **P1 TONE**: `아직 보유한 장식이 없습니다. 영업을 마치면...`처럼 설명문 톤이 pre-Run 화면에서 길어짐.
- `오늘도 문을 연다.`는 KEEP 후보. 짧고 게임 정체성이 분명함.

---

## 3. CURRENT COPY — TUTORIAL / COACH

아래는 **현재 Source 그대로**다.

```js
const coachSteps={
 /* UI_UX §FIRST-EVER DEEP EXPEDITION TUTORIAL. It is keyed to the notice, so it appears the
    first time a Deep Expedition actually occurs and never before the feature exists. Completion
    is account-scoped like every other coach mark: a Run abandon keeps it, a full data reset
    clears it and the next first occurrence teaches it again. No new persistence was added. */
 morning:[['visitors','#visitor-count','오늘 올 손님 수. 점포지원·장식·사건에 따라 달라진다.'],['gates','.slip.gate','열린 게이트의 위험을 보고 오늘 필요한 상품을 준비한다.'],['deep','.slip.deep','같은 게이트의 더 깊은 원정이다. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 더 성장한다. 점포 매출에는 영향이 없다.']],
 order:[['gold','#order-register','보유 골드와 현재 발주 후 잔액을 확인한다.'],['quantity','.dial','발주할 수량을 고른다.'],['reroll','.rubber','후보 전체를 교환한다. 같은 날 반복하면 비용이 오른다.'],['confirm','[data-action="confirm-order"]','카트의 상품만 발주한다. 확정 후에도 추가 발주·후보 교환이 가능하고, 준비가 끝나면 영업 시작을 누른다.']],
 sell:[['npc','.who','손님을 누르면 특성과 지난 원정 기록을 볼 수 있다.','npc'],['great','.great-signal','준비가 충분하면 대성공 가능성이 생긴다. 보급을 더 챙기면 가능성이 커질 수 있다.'],['destination','.dest-plate','이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.'],
 /* UI_UX_v2.7 §TUTORIAL — READ THE SYSTEM, DO NOT GIVE THE ANSWER. It teaches what the two
    columns MEAN and where readiness comes from. It never names an Item for a Hazard: no
    `독이면 X를 사세요`, because that is the decision the player is here to make. */
 ['hazard','.dest-plate .hazards','위험은 특정 능력을 압박한다. 환경 대응은 손님 능력과 보급을 함께 반영한다.'],
 ['forecast','.readout','상품을 팔아도 이 전망은 갱신되지 않는다. 성공·실패 결과는 미리 알 수 없고, 실제 결과는 원정 후 확인한다.'],
 /* The Supply/Fatigue order, in the order it actually resolves. The hidden Supply-deficit
    formula is not taught - only that a shortfall costs one penalty across the preparation. */
 ['supply','.ingredients','필요 보급을 못 채우면 원정 준비에 공통 페널티가 걸려 투력·강인함·기동·정신이 낮아진다. 남는 보급은 현재 피로와 이번 원정에서 쌓일 피로를 줄인다.'],['inventory','.good','고른 상품은 이 손님이 오늘 원정에서 한 번 사용한다. 모든 상품은 1회용이며 다음 원정으로 가져가지 않는다.'],['pricing','.tills','50%는 투자, 100%는 기본, 150%는 수익 우선이다.']],
 night:[['result','.beat','한 명씩 원정 결과와 변화를 확인한다. 전체 건너뛰기로 바로 정산할 수 있다.']],
 closing:[['receipt','.tape','오늘 영업 손익을 확인한다. 발주·점포지원 지출은 따로 표시된다.']]
};
```

### REVIEW

- 최근 playtest hotfix로 장문은 크게 줄었음.
- 다만 일부는 아직 문서형 표현이 남음:
  - `원정 준비에 공통 페널티가 걸려...`
  - `이 전망은 갱신되지 않는다`
- v2.8에서는 Tutorial을 다시 늘리지 않고, **짧게 유지한 채 문장만 자연어화**하는 방향이 우선.

---

## 4. CURRENT COPY — MORNING / ORDER

### Morning

주요 현재 표현:

- `오늘의 원정`
- `손님 {N}`
- `게이트 {N}`
- `보유 골드`
- `문 열기`
- `길드 심층원정 공고`
- `같은 게이트의 더 깊은 구역이다. 위험 특성은 그대로이고, 요구 전투력만 올라간다.`
- `후원금은 돌려받지 않는다. 이 원정으로 가게가 버는 돈은 없다.`

### ORDER

- `발주서`
- `운영비(예상)`
- `창고 잔여 칸`
- `보유 골드`
- `발주 금액`
- `발주 후`
- `오늘`
- `내일`
- `마왕성`
- `창고 {used} / {cap}칸`
- `발주 {N}G · 확정`
- `영업 시작`
- `후보 전체 교환 · {N}G`
- Item row economy:
  - `매입 {N}G`
  - `수익 +{N}G`
  - `재고 {N}`
  - `공급 {N}`
  - `유통기한 {N}일 / 없음`

### REVIEW

- ORDER의 숫자 라벨은 대체로 KEEP.
- `운영비(예상)`, `발주 후`처럼 짧은 장부 말투는 게임 재질과 맞음.
- 심층원정 설명은 정보가 많아 **Rule / Flavor 분리 워싱 후보**.

---

## 5. CURRENT COPY — SALE

### 핵심 Decision copy

- `예상 목적지`
- `보급 전 원정 전망`
- `전투 전망`
- `환경 대응`
- `실패 시 사망 위험`
- `소지 {N}G`
- `가방 {N} / 2`
- `진열대`
- `점포지원 {N} / 7`
- `보유 골드 {N}G`
- `손님 {current} / {total}`
- `손님 보내기 / 영업 종료`

### Item 선택 후

- `{NPC}에게 판매`
- `보급 후 변화`
- `이 상품이 직접`
- `보급이 상태에 미치는 영향`
- `이 손님에게는 지금 걸리지 않는 효과`
- `유통기한 없음 / 폐기까지 N일`
- `가장 먼저 폐기될 재고부터 나간다`
- 가격: `50% / 100% / 150%`
- disabled reason:
  - `손님 소지금 부족`
  - `더 싼 값을 거절함`
  - `오늘 거절됨`
  - `가방 가득`

### REVIEW

**P1 AI-EXPLANATION 후보**

- `보급 후 변화`
- `이 상품이 직접`
- `보급이 상태에 미치는 영향`
- `이 손님에게는 지금 걸리지 않는 효과`

기능상 Truth는 유용하지만, 연속해서 읽으면 분석 리포트처럼 보인다.
v2.8에서는 **정보량을 줄이는 게 아니라 label voice를 짧고 게임답게 바꾸는 것**이 우선.

---

## 6. CURRENT COPY — NIGHT / CLOSING

### NIGHT

- `전체 건너뛰기`
- `다음`
- `오늘은 원정에 나선 손님이 없었다.`
- 결과 Data + 아래 NPC/Flavor line
- `왜 이런 결과?`에 해당하는 인과 정보는 Presentation의 proven source만 노출

### CLOSING

- `GUILD24`
- `DAY NN · {branch}`
- `영업 종료`
- `매출`
- `판매 원가`
- `판매 마진`
- `운영비`
- `폐기 원가`
- `발주 교환`
- `본사 지원·수당`
- `대성공 본사 보상`
- `영업 손익`
- `발주 지출`
- `점포지원 투자`
- `재고 정리`
- `보유 자금`
- `오늘의 보급 영향`
- `미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.`

### REVIEW

- 영수증 숫자 label은 KEEP.
- 마지막 `미판매 재고는...` 문장은 **P1 AI/회계 설명투**. 플레이 중 항상 필요한지부터 REMOVE 검토.
- NIGHT Flavor는 dialogue/result pool과 함께 별도 워싱.

---

## 7. CURRENT COPY — MENU / SETTINGS / HELP

### Settings

- `자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.`
- `저장 내보내기`
- `저장 가져오기`
- `Sound On / Sound Off`
- `BGM`
- `SFX`
- `게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.`
- `Full Data Reset`
- `버전 0.4 · 로컬 실행 지원 · 외부 연결 없음`

### Help — 현재 전문 요약

1. **점포지원**
   - DAY 0 무료 1개
   - D5/10/15/20/25/30 구매
   - 보류 가능
   - 판매 중 구매 불가
2. **발주**
   - 방문객 3~6명
   - 점포지원·장식·사건·활동 NPC 영향
   - Gate 1~3 + 임시 Gate
   - 수량 / 확정 / 재고 / 유통기한 / 운영비
3. **판매와 관계**
   - 목적지·능력·특성으로 상품 판단
   - 150 / 50 / 100 가격 의미
   - refusal lock
   - Loyalty 기능
   - Trait 공개 규칙
4. **원정과 마감**
   - 소비품 당일 사용, Bag 2
   - Night / Closing
   - 사망 / 중상
   - D30 Final
   - Run 종료 후 남는 것 / 안 남는 것
   - 적자 회생
5. **점포가 문을 닫을 때**
   - bankruptcy
   - deathLimit
   - D30 fail

### REVIEW — HIGH

현재 `help()`가 가장 큰 **AI 설명투 / 매뉴얼투 hotspot**이다.

문제:
- 한 화면에 거의 모든 규칙을 서술형 문단으로 재복사
- UI에서 이미 보여주는 정보와 중복
- `~합니다 / ~됩니다 / ~할 수 있습니다`가 연속
- player decision보다 규정집 느낌이 강함

v2.8 우선순위:
1. REMOVE — 화면에서 이미 읽히는 설명
2. MERGE — 같은 주제 반복
3. CLARIFY — 실패/Save처럼 반드시 알아야 하는 규칙
4. 남은 문장을 GUILD24 점주 매뉴얼 voice로 워싱

---

## 8. CURRENT COPY — DECORATION

| id | slot | name | price | effect | flavor |
|---|---|---:|---:|---|---|
| dawnSign | sign | 새벽배송 안내판 | 800 | 발주 후보 +1 | 새벽마다 본사 물류가 한 줄 더 붙는다. |
| guildPlaque | wall | 길드 제휴 현판 | 700 | 매일 아침 10% 확률로 방문객 +1명 | 길드 도장이 찍힌 현판. 가끔 이걸 보고 한 명이 더 들른다. |
| thriftSafe | counter | 알뜰 금고 | 650 | 영업 시작 자금 +300G | 카운터 아래 작은 금고. 개점 자금에 여유가 생긴다. |
| premiumCase | display | 프리미엄 쇼케이스 | 550 | 희귀한 모험가가 더 자주 찾아온다 | 유리 너머로 좋은 물건이 보이면, 좋은 손님이 온다. |

### REVIEW

- effect line은 대부분 짧고 KEEP 가능.
- flavor는 현재 4개 모두 세계관 문장으로 기능하며 AI 설명투가 약함.
- `프리미엄 쇼케이스` effect의 `희귀한 모험가가 더 자주 찾아온다`처럼 정확 수치를 숨긴 문구는 current design 의도와 일치하는지 v2.8 owner 승격 시 재확인.

---

## 9. CURRENT COPY — RELIC / STORE SUPPORT (30)

| id | name | tier | current description |
|---|---|---|---|
| bulk | 묶음발주 계약 | foundation | 같은 상품을 한 번에 3개 이상 발주하면 3번째부터 매입가 15% 할인. |
| rotation | 회전 진열대 | foundation | 하루 6건 이상 판매하면 다음 날 첫 대량발주가 10% 저렴해진다. |
| stamp | 단골 스탬프 기계 | foundation | 유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다. |
| member | 회원 관리대장 | foundation | 다음 날부터 이미 만난 손님의 방문 가중치 +40%. |
| showcase | 프리미엄 쇼케이스 | foundation | 희귀 이상 발주 가중치 +70%. 다음 날부터 운영비 +10G. |
| hazardBoard | 원정 위험 게시판 | foundation | 알려진 게이트 위험에 대응하는 상품의 발주 가중치 +80%. |
| medicine | 긴급보급 선반 | foundation | 치료·야외장비·보험 상품 발주 가중치 +60%, 공급 수량 +1. |
| fridge | 대형 냉장고 | foundation | 음식·음료 유통기한 +1일. 보유 중인 해당 재고도 획득 시 한 번 연장. |
| kitchen | 즉석식품 코너 | foundation | 음식·음료가 원래 가진 능력치 효과 +40%. 보급·위험 대응·부작용은 그대로. |
| board | 길드 전광판 | foundation | 다음 날부터 방문객이 최소 4명. 한산한 날의 바닥을 올린다. 활동 가능한 인원 내에서 방문. |
| rookieBoard | 신입 모집 게시판 | foundation | 다음 날부터 신규 손님 선택 가중치 +70%. 후반 신입도 현재 시기에 맞는 레벨로 합류. |
| groupFlyer | 공동구매 전단 | hybrid | 오늘 방문객 6명 이상이면 3개 이상 묶음발주 매입가 10% 할인. |
| memberBundle | 단골 묶음혜택 | hybrid | 재방문 손님의 그날 두 번째 유료 구매에 단골도 +2. |
| premiumMember | 프리미엄 멤버십 | hybrid | 단골도 50 이상 손님의 희귀 상품 구매 의사 +10%p. |
| returnPoints | 귀환 적립제 | hybrid | 오늘 유료 구매한 재방문 손님이 단골도 30 이상으로 생환하면 단골도 +2, 소지금 +12G. |
| expeditionMeal | 원정 도시락 코너 | hybrid | 음식·음료가 원래 가진 위험 대응 효과가 실제 목적지와 맞으면 해당 효과 +25%. 보급 부담이 있는 날 보급을 주는 음식·음료는 능력치 효과 +25%. |
| coldcase | 냉장 쇼케이스 | hybrid | 희귀 신선식품 발주 가중치 +80%, 유통기한 +1일. |
| supplyCert | 길드 납품 인증 | hybrid | 알려진 위험 대응 또는 보험 역할의 희귀 상품 판매 시 정가의 8%를 본사 수당으로 받는다. |
| dawnBulk | 새벽 공동배송 | hybrid | 음식·음료를 같은 상품 3개 이상 묶음발주하면 매입가 15% 할인. |
| logisticsHQ | 물류 본부계약 | keystone | 전날 8건 이상 판매하면 다음 날 첫 대량발주 매입가 25% 할인. |
| lifetime | 평생 단골제 | keystone | 단골도 60 이상 생환 고객에게 하루 한 번 소지금 +25G. 다음 방문 선택 가중치 +50%. |
| royalCert | 왕도 프리미엄 인증 | keystone | 희귀 이상 바가지 판매에 정가의 12% 본사 수당. |
| expeditionCert | 길드24 원정전문점 인증 | keystone | 알려진 위험이 있으면 발주 후보에 해당 위험 대응 역할을 최소 1종 확보. 교환에도 유지. |
| fresh24 | 24시간 신선체계 | keystone | 음식·음료 유통기한 +2일, 원래 가진 능력치 효과 +80%. 보급은 그대로. |
| hub | 지역 거점점 계약 | keystone | 다음 날부터 30% 확률로 방문객 +1명, 5% 확률로 +2명. 운영비 10% 증가. 활동 가능한 인원 내에서 방문. |
| warehouse | 후방 창고 증설 | utility | 창고 용량 +10칸. |
| terminal | 본사 추가발주권 | utility | 다음 발주 후보 생성부터 후보 +2개. |
| delivery | 발주 교환권 | utility | 매일 첫 발주 교환 무료. 이후 50G부터 교환 비용이 두 배씩 증가. |
| efficiency | 운영 효율 매뉴얼 | utility | 다음 날부터 기본 운영비 15G 절감. |

### REVIEW — HIGH

점포지원은 현재 **한 문장에 조건 + 수치 + 예외 + 발동 시점**을 몰아넣은 항목이 많다.
Truth는 좋지만 카피가 데이터 시트처럼 읽힌다.

v2.8 방향:
- effect truth는 손상시키지 않음
- 먼저 중복 조건을 제거
- 한 줄에서 판단에 필요한 핵심만 남김
- 필요하면 기존 detail surface에서만 보조 설명
- Flavor를 새로 늘려 정보량을 더 키우지는 않음

---

## 10. CURRENT COPY — ITEM FLAVOR (40)

| id | name | rarity | category | brand | current flavor |
|---|---|---:|---|---|---|
| rice | 삼각김밥 | R0 | food | 용사픽 | 김 끝을 잡고 천천히. |
| water | 생수 | R0 | drink | 용사픽 | 뚜껑까지 챙겨 돌아오세요. |
| ramen | 컵라면 | R0 | food | 원정한끼 | 뜨거운 국물과 약간의 냉기 저항. |
| bar | 핫바 | R0 | food | 용사픽 | 꼬치는 매장 앞 수거함에. |
| choco | 초코바 | R0 | food | 용사픽 | 주머니에서 녹기 전에 드세요. |
| coffee | 캔커피 | R0 | drink | MANA+ | 발걸음이 조금 가벼워진다. |
| herbtea | 진정 허브티 | R0 | drink | MANA+ | 마시기 전에 심호흡부터 하는 손님이 많다. |
| potion | 하급 포션 | R0 | potion | 귀환안심 | 차갑게 보관하지 않아도 됩니다. |
| ice | 얼음컵 | R0 | drink | 용사픽 | 컵에 얼음만 가득 담아 판다. 녹기 전에 도착하길. |
| battery | 랜턴 건전지 | R0 | gear | 귀환안심 | 흔들면 조금 더 간다. 근거는 없다. |
| rope | 경량 로프 | R0 | gear | 귀환안심 | 매듭을 풀고 감았다. 다시 묶어야 한다. |
| candy | 집중 사탕 | R0 | food | 용사픽 | 시험 전에도 잘 팔린다. |
| lava | 불룡볶음면 | R1 | food | 원정한끼 | 용 그림은 장식이 아니다. |
| energy | 에너지드링크 | R1 | drink | MANA+ | 오늘 쓸 기운을 당겨왔다. |
| wine | 용사의 곡주 | R1 | drink | 원정한끼 | 공포를 잊게 한다. 발걸음은 살짝 꼬인다. |
| kit | 구급키트 | R1 | insurance | 귀환안심 | 열어 본 사람은 대개 그날을 오래 기억한다. |
| mask | 방진마스크 | R1 | gear | 귀환안심 | 쓰고 나면 얼굴 자국이 한참 남는다. |
| heat | 핫팩 | R1 | gear | 귀환안심 | 주머니 안에서 겨울을 버틴다. |
| cloak | 방수망토 | R1 | gear | 귀환안심 | 부식과 진창에 두루 쓴다. 어느 쪽도 전문가만은 못하다. |
| coating | 부식 방지 코팅제 | R1 | gear | 귀환안심 | 장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것. |
| boots | 원정용 장화 | R1 | gear | 귀환안심 | 밑창에 진흙이 잘 붙지 않는다. |
| snowgoggles | 설원 고글 | R1 | gear | 귀환안심 | 눈보라 속에서도 앞이 남는다. |
| highpotion | 상급 포션 | R2 | potion | 길드초이스 | 작은 병에 진하게 담았다. |
| antidote | 농축 해독제 | R2 | gear | 귀환안심 | 한 모금이면 충분하다고 적혀 있다. 두 모금은 권하지 않는다. |
| stone | 귀환석 | R2 | insurance | 귀환안심 | 사망·중상 위기에서도 같은 수치로 한 번 더 돌아올 기회가 생긴다. |
| midpotion | 중급 포션 | R1 | potion | 귀환안심 | 하급은 불안하고 상급은 비쌀 때. |
| premium | 길드 프리미엄 도시락 | R2 | food | 길드초이스 | 뚜껑이 잘 안 닫힌다. |
| ion | 쿨링 이온음료 | R2 | drink | MANA+ | 얼음컵만큼 시원하진 않지만 오래 간다. |
| tree | 세계수 생환부적 | R3 | insurance | 길드초이스 | 잎맥이 아직 마르지 않았다. |
| coupon | 황금 1+1 쿠폰 | R4 | special | 길드초이스 | 본사 도장이 선명하다. 유효기간은 적혀 있지 않다. |
| spiderkit | 거미줄 방호세트 | R3 | gear | 귀환안심 | 손목을 앞으로 내밀어도 아무것도 나오진 않는다. |
| slimesuit | 연금 방수슈트 | R3 | gear | 귀환안심 | 방수 테스트에 쓴 액체는 묻지 않는 게 좋다. |
| cryptlantern | 성화 랜턴 | R3 | gear | 귀환안심 | 성당 납품용이었는데 어쩌다 편의점까지 왔다. |
| snowvisor | 백설 방한고글 | R3 | gear | 귀환안심 | 김은 안 서린다. 눈썹은 얼 수 있다. |
| magmagear | 마그마 냉각장비 | R3 | gear | 귀환안심 | 설명서 첫 줄: 마그마에 직접 넣지 마시오. |
| battlelunch | 결전 특선 도시락 | R3 | food | 길드초이스 | 동쪽 나라의 인심 좋은 어머님이 떠오르는 구성. |
| herobar | 용사 특식 핫바 | R3 | food | 길드초이스 | 일반 핫바를 두 개 사는 것과는 기분이 다르다고 한다. |
| hyperenergy | 초고속 에너지드링크 | R3 | drink | MANA+ | 마시고 나면 계산대보다 먼저 문을 나선다. |
| sageelixir | 대현자 허브엘릭서 | R3 | drink | 길드초이스 | 한 모금 마시면 괜히 턱을 쓰다듬게 된다. |
| toppotion | 최상급 포션 | R3 | potion | 길드초이스 | 병은 작다. 값은 작지 않다. |

### REVIEW

Item Flavor는 전체적으로 현재 Copy 중 가장 게임다운 편이다.

우선 REVIEW 후보:
- 포장지/설명서 문구처럼 읽히는 존댓말과 서술체가 혼재
- 효과를 실제 mechanic보다 더 강하게 암시하는 문장이 없는지 전수 Truth check
- late Epic 10종의 Flavor가 기존 저등급 상품보다 문체가 과하게 "작가가 설명하는" 쪽으로 튀는지 비교

현재는 wholesale rewrite보다 **개별 Truth/Tone 예외만 수정**하는 쪽을 우선한다.

---

## 11. CURRENT COPY — TRAIT (37)

Trait 이름은 아래 37개가 active Source에 있다.
효과 문구 대부분은 `presentation.js`에서 mechanic data로 생성되며, 별도 소설형 설명을 덧붙이지 않는다.

| id | name | direction | explicit note |
|---|---|---|---|
| brave | 용감함 | mixed | — |
| coward | 겁쟁이 | mixed | — |
| eater | 대식가 | mixed | — |
| small | 소식가 | mixed | — |
| careful | 신중함 | mixed | — |
| reckless | 무모함 | mixed | — |
| greed | 탐욕 | mixed | — |
| frugal | 구두쇠 | negative | 비싼 상품일수록 구매를 망설입니다. |
| impulse | 충동구매 | positive | — |
| liar | 거짓말쟁이 | mixed | 50% 확률로 실제 목적지가 다른 열린 게이트로 바뀝니다. |
| genius | 천재 | positive | — |
| strong | 강골 | positive | — |
| frail | 허약함 | negative | — |
| potionbody | 포션체질 | positive | — |
| pyrophobia | 화염공포증 | negative | — |
| collector | 수집가 | mixed | — |
| thrifty | 실속파 | mixed | — |
| social | 사교적인 | positive | — |
| shy | 낯가림 | negative | — |
| mender | 회복체질 | positive | — |
| stamina | 지구력 | positive | — |
| weary | 쉽게 지침 | negative | — |
| sharpeye | 눈썰미 | positive | — |
| antitoxin | 해독가 | positive | — |
| coldhand | 수족냉증 | negative | — |
| prepared | 준비성 | positive | — |
| grit | 악바리 | mixed | 일반 부상의 투력 페널티를 대체하여 투력이 증가합니다. |
| aloof | 냉담한 | mixed | — |
| honest | 정직한 | mixed | — |
| rich | 금수저 | positive | — |
| sensitive | 민감체질 | negative | — |
| nimble | 잔재주꾼 | positive | — |
| clumsy | 몸치 | negative | — |
| maintain | 장비관리 | positive | — |
| butterfingers | 서투른 | negative | — |
| heatproof | 내열성 | positive | — |
| nearsight | 약시 | negative | — |

### REVIEW

- 이름 자체보다 **NPC Dialogue가 Trait mechanic을 잘못 암시하는지**가 우선.
- 특히 겁쟁이 / 대식가 / 탐욕 3종은 P0 Truth.
- `거짓말쟁이`, `악바리`처럼 explicit note가 있는 Trait은 note가 실제 mechanic과 정확히 맞는지만 검증.

---

## 12. CURRENT COPY — EVENT (22)

| id | name | reveal | effect |
|---|---|---|---|
| logistics | 물류대란 | 길이 막혔다. 물건은 왔다. 평소보다 비쌀 뿐이다. | 오늘 매입가 +15% |
| oneplus | 본사 1+1 행사 | 본사에서 행사 공문이 내려왔다. | 지정 상품 1종 · 발주 수량 2배 |
| pilgrimage | 게이트 순례주간 | 순례 행렬이 게이트 구역을 지나간다. | 오늘 1~3명의 모험가가 예정된 목적지가 아닌 다른 열린 게이트로 향할 수 있습니다. |
| overflow | 몬스터 범람 | 게이트 밖까지 소리가 들린다. | 오늘 게이트 요구 전력 +12% · 원정 보상 +30% |
| potionPrice | 포션 가격 폭등 | 포션 값이 또 올랐다. | 오늘 포션 매입가 +35% |
| coldwave | 한파 | 북쪽 바람이 게이트 구역까지 내려왔다. | 적용 가능한 게이트에 냉기 위험 추가 |
| shortage | 포션 공급 중단 | 포션 상자가 오지 않았다. | 오늘 포션 발주 등장 확률 크게 감소 |
| rookie | 신입 모험가 시즌 | 길드 게시판에 새 이름이 늘었다. | 오늘 새로운 모험가 1명이 찾아옵니다. |
| royal | 왕립 기사단 방문 | 왕립 기사단 마차가 멈췄다. | 오늘 고레벨 · 희귀 신규 모험가 합류 기회 |
| blackmarket | 암시장 상인 | 정문으로 들어온 사람은 아니다. | 오늘 희귀 이상 특별 발주 1건 · 매입가 +35% |
| audit | 본사 재고 감사 | 본사에서 장부를 보러 왔다. | 누적 폐기 6건부터 1건당 5G 감사 비용 · 최대 100G |
| festival | 왕도 축제 | 왕도 축제가 시작됐다. | 오늘 음식 · 음료 구매 의사 +20%p |
| strike | 길드 파업 | 길드 정문에 현수막이 걸렸다. | 오늘 방문객 -1 |
| unknown | 미확인 게이트 | 지도에 없던 문이 열렸다. | 오늘 고위험 · 고보상 임시 게이트 1개 추가 |
| tasting | 본사 반값 행사 | 오늘 반값은 본사가 한 번 낸다. | 오늘 첫 50% 판매 · 본사 지원 +50G |
| poisonfog | 독안개 | 게이트 주변에 누런 안개가 깔렸다. | 적용 가능한 게이트에 독 위험 추가 |
| caravan | 보급 상단 도착 | 보급 상단이 하루 일찍 도착했다. | 오늘 발주 후보 +2 |
| payday | 길드 급여일 | 오늘은 길드 급여일이다. | 오늘 방문 모험가 구매 예산 +20% |
| clinic | 치유소 휴무 | 치유소 앞에 휴무 팻말이 붙었다. | 오늘 의료 상품 구매 의사 +20%p |
| wastecover | 본사 폐기 지원 | 오늘 폐기비는 본사 부담이다. | 오늘 폐기 비용 0G |
| bard | 늙은 음유시인 | 늙은 음유시인이 가게 앞에 자리를 잡았다. / “너 누구야?” / 잠시 뒤, / “후 알 유?” / 구경하던 모험가들이 하나둘 모여들었다. | 오늘 방문객 +2 |
| nightshift | 본사 야간 근무 수칙 | 1. 마감 전 창고를 확인한다. / 2. 폐기 상품은 따로 둔다. / 3. 뒷문은 잠근다. / 5. 새벽 두 시 이후에는 창밖을 보지 않는다. / 4번 규정은 없습니다. | 오늘 점포 유지비 0G |

### REVIEW

Event의 `reveal`은 대체로 짧고 세계감이 좋다.
반면 effect line은 두 계열이 섞여 있다.

- 장부식: `오늘 매입가 +15%`
- 설명식: `오늘 새로운 모험가 1명이 찾아옵니다.`

v2.8에서는 같은 기능층(effect)은 **짧은 장부식 문법으로 통일**하는 방향을 우선 검토한다.
`bard`, `nightshift`처럼 Flavor 자체가 보상인 Event는 장문 예외를 허용한다.

---

## 13. CURRENT COPY — NPC DIALOGUE / RESULT POOLS

아래는 현재 `dist/data/copy.js`의 active pool 원문이다.

```js
const visit={
 first:['“여기가 길드24인가요?”','“문 연 지 얼마 안 됐다면서요.”','“게이트 앞에 가게가 있다길래.”','“들어와도 되죠? 잠깐 볼게요.”'],
 back:['“다시 왔어요.”','“오늘도 열었네요.”','“오는 길에 불 켜진 게 여기뿐이더라고요.”','“빈손으로 가긴 좀 그래서요.”'],
 hurt:['“아직 조금 욱신거리네요.”','“괜찮아요. 걷는 데는 지장 없어요.”','“이 정도면 나간 편이죠.”','“오늘은 무리 안 할 거예요.”'],
 regular:['“늘 보던 얼굴이네요.”','“말 안 해도 아시죠?”','“자리 그대로네요, 다행이다.”','“오늘도 부탁 좀 할게요.”','“늘 먹던 걸로 주세요.”'],
 /* §12 Callback — 실제로 남아 있는 History만 쓴다. 없는 과거를 만들지 않는다. */
 helped:['“지난번에 챙긴 거, 도움이 됐어요.”','“저번 거 쓰고 나서 생각이 좀 바뀌었어요.”','“그때 산 거, 값은 했습니다.”'],
 /* Trait 기반. Canonical의 절약 성향 / 겁 많은 성향 예시를 따른다. */
 trait:{
  frugal:['“더 싼 건 없어요?”','“이거 행사 안 해요?”','“지난번엔 이것보다 쌌는데.”','“오늘은 싼 걸로 주세요.”'],
  thrifty:['“그램당으로 치면 이게 낫죠?”','“싼 거 말고, 값하는 걸로요.”','“이거 하나면 오늘은 되겠네요.”'],
  coward:['“귀환석 있습니까?”','“이쪽, 위험한 데 맞죠?”','“살아서 오면 또 들를게요.”','“가까운 게이트는 없어요?”'],
  liar:['“오늘은 좀 깊게 들어가 볼까 해서요.”','“제가 그쪽은 좀 압니다.”','“어려운 데로 간다고 다들 말리던데요.”'],
  eater:['“많이 든 걸로 주세요.”','“이거 하나로 하루 되나요?”','“먹을 게 제일 급해요.”'],
  greed:['“비싼 게 좋은 거 아닌가요?”','“이왕이면 좋은 걸로 봅시다.”','“돈은 나중에 벌면 되죠.”'],
  shy:['“…저, 이거 얼마예요?”','“구경만 해도 되나요?”','“아, 아니에요. 천천히 볼게요.”'],
  social:['“사장님, 요즘 어떠세요?”','“앞에서 다들 여기 얘기하던데요.”','“오늘 누구 왔다 갔어요?”'],
  collector:['“새로 들어온 거 있어요?”','“이런 건 잘 안 보이던데요.”','“종류별로 하나씩은 있어야 하는데.”'],
  aloof:['“필요한 것만 볼게요.”','“설명은 됐어요.”','“빨리 가야 해서요.”']}};

/* §11.1 구매 / 거절 / 가격 반응. */
const sale={
 full:['“이걸로 주세요.”','“네, 담아 주세요.”','“이 정도면 적당하네요.”','“그럼 하나만.”'],
 half:['“다녀와서 또 들를게요.”','“이 가격이면 안 살 이유가 없죠.”','“사장님 손해 아니에요?”','“오늘은 운이 좋네요.”'],
 overcharge:['“가격이 좀 올랐네요.”','“…뭐, 급하니까요.”','“이번만입니다.”','“원래 이 값이었나요?”'],
 refuse:{
  price:['“그 가격에는 못 사겠어요.”','“그건 좀 부담스럽네요.”','“다음에 여유 있을 때 살게요.”','“조금만 더 싸면 좋을 텐데.”'],
  need:['“그건 오늘 필요 없어요.”','“오늘 가는 데선 쓸 일이 없어서요.”','“그건 딱히 안 급해요.”','“그건 다음에 볼게요.”'],
  choice:['“이번엔 안 살게요.”','“조금 더 생각해 볼게요.”','“오늘은 여기까지 할게요.”','“음… 아니요, 괜찮아요.”']}};

/* §11.2 반복되는 중요한 NPC Result.
   사망은 DATA로 명확히 전달되고, 여기 Flavor는 별도다. 사망 Pool에는 살아 있는 사람의
   대사를 넣지 않는다. 영수증 문장은 실제 거래 History가 있을 때만 쓴다(§12). */
const night={
 deathTraded:['마지막 영수증만 카운터에 남았다.','여기서 산 것들은 끝내 다 쓰이지 못했다.','거래는 이미 다 끝나 있었다.'],
 deathKnown:['수첩에 남은 건 지난 원정 기록뿐이다.','다음 줄은 비어 있다.','이름 옆에 아무것도 적히지 않았다.'],
 deathStranger:['문을 열고 들어온 그날이 마지막이었다.','오늘은 돌아오지 않았다.','한 번 왔다 간 손님으로 남았다.'],
 avoided:['“사장님, 이거 없었으면 못 돌아왔어요.”','“오늘은 진짜 아슬아슬했어요.”','“그거 사길 잘했다는 생각만 했어요.”'],
 rescued:['“챙겨 간 보급이 귀환을 도왔어요.”','“가방에 있던 게 마지막에 일했어요.”','“돌아오는 길은 사장님이 열어 준 셈이에요.”'],
 severe:['“며칠만 쉬고 올게요. 제 자리 남겨 둬요.”','“당분간은 못 나갈 것 같아요.”','“다음에 올 때는 멀쩡한 얼굴로 올게요.”'],
 hurt:['“좀 다쳤지만, 살아 돌아왔어요.”','“이 정도는 다친 축에도 안 들어요.”','“내일은 좀 쉬엄쉬엄 갈게요.”','“생각보다 안쪽이 사납더라고요.”'],
 retreat:['“일단 살고 봐야죠. 내일 다시 올게요.”','“오늘은 아니다 싶어서 돌아섰어요.”','“무리했으면 큰일 날 뻔했어요.”','“길만 보고 왔습니다.”'],
 grew:['“조금은 익숙해진 것 같아요.”','“지난번보다 손에 붙네요.”','“이제 어디를 봐야 할지 알겠어요.”'],
 supplied:['“다녀왔습니다.”','“오늘은 별일 없었어요.”','“챙겨 간 건 잘 썼습니다.”'],
 shaken:['“예상하지 못한 일이 있었어요. 잠깐 쉬어야겠어요.”','“오늘은 운이 안 따랐네요.”','“가는 길이 생각보다 사나웠어요.”'],
 plain:['“오늘도 무사히요.”','“내일도 열죠?”','“별일 없었습니다.”']};

/* 선택 키는 전부 저장되는 상태에서만 만든다 — 그래야 불러오기가 문장을 바꾸지 않는다. */
```

### REVIEW — HIGH

P0 Truth:
- coward / eater / greed의 구매 선호 암시 제거 또는 mechanic과 일치하는 성격 대사로 교체

P1 Voice:
- 일부 NPC가 편의점 손님이라기보다 시스템 정보를 대신 말함
- 반복 방문 / 단골 / 부상 / 거절에서 화자 개성이 약하고 상황 template가 먼저 느껴지는 줄이 있음
- 반대로 `death*` pool은 짧고 감정 과잉이 적어 현재 방향이 좋음

원칙:
- NPC는 Player에게 전략 힌트를 주는 UI가 아니다.
- 성격은 보여주되 구매 AI를 발명하지 않는다.
- 짧은 말풍선에 맞는 구어체를 유지한다.

---

## 14. CURRENT COPY — BOSS / DEEP

현재 active source:

```js
Copy.boss={
 d5:{header:'길드 토벌 공고',sub:'이번 토벌 대상',button:'토벌 대상 확인',
  flavor:{
   WRATH:'공성추도 없이 성문이 안쪽으로 무너졌다.',
   PRIDE:'검은 갑주에는 아직 흠집 하나 남지 않았다.',
   ENVY:'승전 보고서마다 가장 빛나던 이름 하나가 붉게 지워져 있었다.',
   GREED:'금고가 빈 마을일수록, 놈의 군세는 이상할 만큼 강했다.',
   GLUTTONY:'최정예 토벌대의 보급품만 유난히 처참한 꼴로 발견됐다.',
   LUST:'오래 손발을 맞춘 자들만 서로의 이름을 잊지 않았다고 한다.',
   SLOTH:'놈은 움직이지 않았다. 몸을 얽은 봉인만이 낮게 울리고 있었다.'}},
 d15:{intro:'길드 정보원이 추가 정보를 확보했다.',button:'정보 확인',
  trait:{
   WRATH:['특수 효과 없음',['별도의 변칙은 확인되지 않았다.','래스는 순수한 전력으로 맞선다.']],
   PRIDE:['오만의 갑주',['최종전에서 모든 출전자의 투력이 감소한다.','강인함·기동·정신은 그대로 적용된다.']],
   ENVY:['질투의 시선',['최종전에서 가장 크게 기여하는 모험가 한 명이 표적이 된다.','표적의 투력·강인함·기동·정신은 최종전 동안 감소한다.']],
   GREED:['탐욕의 장부',['최종전까지 누적 총매출이 목표에 미달하면, 부족한 만큼 그리드가 강해진다.','강화에는 한도가 있으며, 목표를 넘겨도 추가 이득은 없다.']],
   /* COPY_WORLD_VOICE_v2.7 §GLUTTONY: verbatim. v2.7 has no Rarity threshold for this Boss,
      so the inherited sentence claimed a Rarity boundary the mechanic does not have - every
      positive Core-Stat contribution from an Item is halved, whatever the Item cost. */
   GLUTTONY:['탐식의 권능',['아이템의 투력·강인함·기동·정신 증가량 50% 감소','환경 대응·보급·보험 효과는 유지']],
   LUST:['매혹의 권능',['단골이 아닌 출전자는 최종전에서 투력·강인함·기동·정신이 모두 감소한다.','단골은 영향을 받지 않는다.']],
   SLOTH:['나태의 봉인',['슬로스에게는 세 개의 봉인이 남아 있다.','15일·20일·25일 중 두 차례와 30일에, 유물을 받는 대신 봉인 하나를 풀 수 있다.','봉인을 풀면 그때의 유물은 받을 수 없으며, 풀린 봉인이 많을수록 슬로스가 약해진다.']]}},
 /* The scouting report is the D25 disclosure now, so its button acknowledges the report
    rather than announcing a preparation that is still five days away. */
 final:{header:'최종 정찰 보고',intro:'마왕군의 최종 전장이 확인됐다.',button:'확인'}
};

/* COPY_WORLD_VOICE §LOCKED PLAYER-FACING TERMS, 2026-09-12. Two of these are exact: the Great
   Success signal must contain 대성공 and read word for word, and 심층원정 is not to be renamed
   to 긴급의뢰 / 특별원정 / 고난도 의뢰. The sponsorship is a Store Gold sink, never a deposit,
   so nothing here may promise it back. The Deep voice says what the Store gets - the
   adventurer's growth - and never a cash payout, 대성공 included. */
Copy.great={signal:'대성공을 노려볼 만합니다.'};
Copy.deep={
 term:'심층원정',sponsor:'원정 후원금',
 header:'길드 심층원정 공고',
 intro:'오늘 하루, 길드가 더 깊은 구역의 정찰을 의뢰했다.',
 gate:'대상 게이트',
 note:'같은 게이트의 더 깊은 구역이다. 위험 특성은 그대로이고, 요구 전투력만 올라간다.',
 cost:'후원금은 추천하는 모험가에 따라 달라진다. 희귀하고 노련한 모험가일수록 비싸다.',
 gain:'성공하면 그 모험가의 성장과 소지금이 늘어난다.',
 sink:'후원금은 돌려받지 않는다. 이 원정으로 가게가 버는 돈은 없다.',
 optional:'추천하지 않아도 된다. 오늘 안에 추천하지 않으면 기회는 지나간다.',
 action:'심층원정에 추천',
 done:'심층원정에 나선다',
 paid:'원정 후원금 지급',
 blocked:'이미 배치를 조정한 손님은 추천할 수 없다.',
 poor:'후원금이 모자란다.',
 result:'심층원정',
 reward:'심층원정 보상'
};
```

### REVIEW

- D5 Flavor는 대부분 KEEP 후보.
- D15는 mechanic disclosure라 어느 정도 기술적일 수밖에 없음.
- 다만 `최종전에서...`, `감소한다`, `적용된다` 반복은 v2.8에서 **정확성 유지 + 문장 압축** 대상으로 본다.
- Deep은 현재 정보가 중복되는 줄이 많아 Morning notice와 modal 사이 중복 REMOVE가 우선.

---

## 15. CURRENT COPY — META / CODEX / DECORATION MANAGEMENT

주요 현재 표현:

- `본사 기록`
- `점포 자본 {N} · 보유 장식 {N}/4`
- `직업 숙련 {N}/42 · 서로 다른 마왕 토벌 {N}/7`
- `{runs}회 영업 · {wins}회 마왕 토벌`
- `발견 수첩`
- Tabs: `진행도 / 상품 / 직업 / 점포지원 / 몬스터 지식 / 점포 관리`
- `해금 완료 / 다음 해금`
- `아직 본사에서 내려온 것이 없다.`
- `본사가 내줄 것은 다 내줬다. 남은 것은 아직 잡지 못한 마왕뿐이다.`
- 점포 관리:
  - `점포 자본 {N}`
  - `장식은 영업 밖에서만 사고 바꿀 수 있습니다.`
  - `지금은 영업 중이라 확인만 됩니다.`
  - `이번 영업에 적용 중 / 미적용`
  - `비워 둘 수 있습니다.`
  - `구매 확정 / 취소 / 적용 / 해제`

### REVIEW

- Header / 탭 / 숫자 상태는 KEEP.
- 점포 관리 설명은 **P1 AI app-help tone**. 버튼 상태 자체로 설명 가능한 문장은 REMOVE 후보.
- `본사가 내줄 것은 다 내줬다...`처럼 world voice가 들어간 empty state는 KEEP 후보.

---

## 16. CURRENT COPY — ERROR / SAVE / UTILITY

현재 대표 copy:

- `자동저장 불가 — 저장 내보내기로 진행을 보관하세요.`
- `규칙 개편으로 이전 영업은 이어갈 수 없습니다. 새 점포를 열어 주세요. 이전 저장 원본은 보관됩니다.`
- `저장된 진행을 읽지 못했습니다. 원본 저장은 보존됩니다. 설정에서 저장 파일을 가져올 수 있습니다.`
- `저장 삭제에 실패했습니다. 브라우저 저장소를 확인해 주세요.`
- `발주 자금이 부족합니다.`
- `창고가 가득 찼습니다.`
- `손님의 소지금이 부족합니다.`
- `영업 중에는 장식을 바꿀 수 없습니다.`

### REVIEW

Utility / error는 세계관보다 **정확성 / 복구 행동** 우선.
여기서는 억지 Flavor를 넣지 않는다.

다만 같은 오류에서:
- 무엇이 실패했는지
- Player가 다음에 무엇을 할 수 있는지

두 개가 이미 UI로 명확하면 문장을 더 늘리지 않는다.

---

## 17. v2.8 COPY WASH PRIORITY

### P0 — TRUTH

1. 겁쟁이 Dialogue의 귀환석 구매 암시
2. 대식가 Dialogue의 음식 구매 의사 암시
3. 탐욕 Dialogue의 고가/희귀 구매 선호 암시
4. Flavor / Event / Item 중 mechanic을 실제보다 강하게 약속하는 문장 전수 확인

### P1 — AI EXPLANATION TONE

1. `help()` 전체
2. SALE post-commit label 묶음
3. 점포지원 30종 description
4. 점포 관리 설명
5. CLOSING 마지막 회계 설명
6. Deep 반복 설명
7. Boss D15 기능문 압축
8. Event effect 문법 통일

### P2 — POLISH

1. NPC repeat pool 개성
2. Item Flavor 개별 편차
3. empty state / toast / modal voice 통일
4. Settings의 영어 개발용 label
5. 공개 버전 전 Seed / Debug성 wording 정리

---

## 18. REVIEW WORKFLOW

각 카피는 아래 순서로 처리한다.

```text
REMOVE
→ REUSE
→ MERGE / CLARIFY
→ WASH
→ 필요한 경우에만 ADD
```

각 변경안은 최소한 다음을 기록한다.

- CURRENT
- TRUTH
- PROBLEM
- PROPOSED
- WHY
- User decision: APPROVE / REJECT / REVISE

한 번에 전체 문구를 Production Source에 덮어쓰지 않는다.
Truth-sensitive copy부터 묶음 단위로 User 승인 후 Canonical → Source 순서로 반영한다.

---

## 19. FIRST REVIEW BATCH

첫 v2.8 카피 리뷰는 아래 4개 묶음부터 시작한다.

1. **Help / Guide**
2. **SALE 설명 label**
3. **NPC misleading Trait dialogue**
4. **점포지원 description**

이 네 묶음이 현재 "AI가 설명하는 게임" 인상을 가장 크게 만든다.

Item Flavor / Event Flavor / Boss D5는 그 다음이다.
