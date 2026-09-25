# EVENT consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/EVENT_v2.8.0.md
CHAIN=design_ssot/EVENT_v2.8.0.md,design_ssot/history/EVENT_v2.7.0.md,design_ssot/history/EVENT_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/EVENT_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.

Layout: one `##` section per topic, `###` for subsections, no section numbering. v2.5 section order is
the skeleton: NON-NEGOTIABLE, TIMING / FREQUENCY (with the Deep Expedition Day exclusion inline),
SELECTION, MORNING REVEAL, PRESENTATION, PHASE PERSISTENCE, INFORMATION RULE + v2.8 NO FALSE
ATTRIBUTION, DURATION, EVENT-ADDED HAZARD, HAZARD ELIGIBILITY, CATALOG (each v2.8 exact mechanic
merged into its catalog entry; v2.7 Event 05 replaces the 마석 entry), v2.7 CATEGORY AUDIT, MIX,
RANDOMNESS / NPC / IMPLEMENTATION GUARDRAIL, CROSS-SPEC OWNERSHIP, one QA / ACCEPTANCE list (v2.5
full-run review questions, v2.5 HAZARD EVENT QA, the Deep-Day embedded QA, v2.8 numeric acceptance),
FINAL TARGET. Catalog numbers 01-22 stay in the entry headings (they are Event IDs, e.g. Event-05).
The v2.5 `# 0.` / `# 1.` headings sit in the v2.5 header region (before its first `##`), which the
check does not count; their `##` forms are declared new below. Header keys `BASE_DOCUMENT=` /
`PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

The binding v2.8 line "v2.8 audits Function truth so Flavor never implies a different mechanic." is
kept in reworded form (REWORD below). The v2.8 numeric values are exact and non-tunable in the target
through the kept line `QA must not tune these values while validating them.` and the removed PASS3
lines (SUPERSEDED below).

```text
## INHERITANCE
All unchanged event timing/frequency/selection and catalog mechanics inherit EVENT_v2.7.0.md and
its base.
All Event timing, frequency, selection, reveal, Hazard-event, Deep-Day exclusion, and unchanged event-catalog behavior inherits `EVENT_v2.5.0.md`.
This patch changes only stale Item-category references created by the v2.7 catalog migration.
The former Event-05 gameplay identity tied to retired Mana/Special classification is migrated to the v2.7 Potion category.
USER_APPROVAL_DATE=2026-09-20
The following Event mechanics are exact v2.8 Design Truth.
```

## LEGACY — version / patch headings (sections merged into their catalog entry or the QA list)

```text
## TARGETED CURRENT EVENT TRUTH
### 본사 반값 행사
### 길드 급여일
### 치유소 휴무
### 암시장 상인
### 보급 상단 도착
## FULL-CHAIN EVENT NUMERIC CLOSURE
### 몬스터 범람
### 포션 공급 중단
### 신입 모험가 시즌
### 왕립 기사단 방문
### 본사 재고 감사
### 왕도 축제
### 미확인 게이트
## FULL-CHAIN EVENT ACCEPTANCE
## EVENT 05 — POTION PRICE PRESSURE
## APPROVED_AMENDMENT_2026_09_12 — DEEP EXPEDITION DAY EXCLUSION
Embedded EVENT QA:
```

## LEGACY — notes about removed values / pre-Deep baseline

The current eligible-day count (19–20) and chance (35%) are stated in TIMING / FREQUENCY.

```text
기존 74% 발생률은 사용하지 않는다.
Therefore the previous `22 eligible days` is the pre-Deep baseline.
```

## LEGACY — restatements of rules kept elsewhere in the target

v2.7 Event-05 `TYPE:` / `Order / Pressure` / `Weight remains unchanged.` restate the kept v2.5 lines
`TYPE: Order / Pressure` / `WEIGHT: 1.0` of the same entry. v2.7 RELATED restates CROSS-SPEC OWNERSHIP
(Item -> `ITEM_v2.8.0.md`, also the kept CATEGORY AUDIT pointer; Order price -> `ECONOMY_ORDER_v2.8.0.md`)
and the catalog copy pointer (exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`). 암시장 `대신 매입가는
높다.` restates the kept v2.8 `- that offer buy price +35%` (its v2.5 antecedent sentence is superseded).

```text
TYPE:
Order / Pressure
Weight remains unchanged.
## RELATED
Item/category -> `ITEM_v2.7.0.md`
Order price application -> `ECONOMY_ORDER_v2.6.1.md`
Copy truth -> `COPY_WORLD_VOICE_v2.7.0.md`
대신 매입가는 높다.
```

## SUPERSEDED — v2.5 REVEAL COPY blocks: exact Event Function / Flavor copy is owned by COPY_AUDIT_APPROVED

`COPY_WORLD_VOICE_v2.8.0.md` EVENT COPY ROUTING: "Exact approved Event Function / Flavor text ->
COPY_AUDIT_APPROVED_v2.8.0.md"; SPEC_INDEX_v2.8.0 `EXACT PLAYER-FACING COPY -> COPY_AUDIT_APPROVED_v2.8.0.md`.
`COPY_AUDIT_APPROVED_v2.8.0.md` §13 carries different current Function / Flavor lines for all 22 Events,
so the v2.5 reveal copy cannot stay a second live list. The ownership bullet `Event별 Reveal Copy` goes
with it; the catalog now points to COPY_AUDIT_APPROVED (REWORD below). Reveal-copy lines identical to a
kept EFFECT line (e.g. `오늘 방문객 -1`, `오늘 발주 후보 +2`, `오늘 방문객 +2`, `오늘 고위험 · 고보상 임시
Gate 1개 추가`) and to kept INFORMATION RULE examples (`오늘 매입가 +15%`, `오늘 Food / Drink 구매 의사 증가`)
remain in the target in those places. The v2.8 exact 반값 Function line and the v2.8 `보험, not 의료 상품`
line are owner lines and stay. The Easter Egg REFERENCE RULE / 금지 lists stay.

```text
REVEAL COPY:
- Event별 Reveal Copy
> 길이 막혔다. 물건은 왔다. 평소보다 비쌀 뿐이다.
> 본사에서 행사 공문이 내려왔다.
지정 상품 1종 · 발주 수량 2배
> 순례 행렬이 게이트 구역을 지나간다.
오늘 1~3명의 모험가가 예정된 목적지가 아닌 다른 열린 게이트로 향할 수 있습니다.
> 게이트 밖까지 소리가 들린다.
오늘 원정 위험 증가
오늘 원정 보상 증가
> 마석 값이 또 올랐다.
> 북쪽 바람이 게이트 구역까지 내려왔다.
적용 가능한 Gate에 냉기 위험 추가
> 포션 상자가 오지 않았다.
오늘 포션 발주 등장 확률 크게 감소
> 길드 게시판에 새 이름이 늘었다.
오늘 신규 / 견습 모험가 합류 가능성 증가
> 왕립 기사단 마차가 멈췄다.
오늘 고레벨 · 희귀 신규 모험가 합류 기회
> 정문으로 들어온 사람은 아니다.
오늘 희귀 이상 특별 발주
매입가 높음
> 본사에서 장부를 보러 왔다.
누적 폐기 기준 초과 · 감사 비용 발생
> 왕도 축제가 시작됐다.
> 길드 정문에 현수막이 걸렸다.
> 지도에 없던 문이 열렸다.
> 오늘 반값은 본사가 한 번 낸다.
오늘 첫 50% 판매 · 본사 지원 +50G
> 게이트 주변에 누런 안개가 깔렸다.
적용 가능한 Gate에 독 위험 추가
> 보급 상단이 하루 일찍 도착했다.
> 오늘은 길드 급여일이다.
오늘 방문 NPC 구매 가능 예산 +20%
> 치유소 앞에 휴무 팻말이 붙었다.
> 오늘 폐기비는 본사 부담이다.
오늘 폐기 비용 0G
> 늙은 음유시인이 가게 앞에 자리를 잡았다.
>
> "너 누구야?"
> 잠시 뒤,
> "후 알 유?"
> 구경하던 모험가들이 하나둘 모여들었다.
> **본사 야간 근무 수칙**
> 1. 마감 전 창고를 확인한다.
> 2. 폐기 상품은 따로 둔다.
> 3. 뒷문은 잠근다.
> 5. 새벽 두 시 이후에는 창밖을 보지 않는다.
> 4번 규정은 없습니다.
> 오늘 야간 점포 유지비는 본사에서 부담합니다.
오늘 점포 유지비 0G
```

## SUPERSEDED — PASS3 placeholders replaced by exact v2.8 values (FULL-CHAIN EVENT NUMERIC CLOSURE)

몬스터 범람 required Power ×1.12 / reward ×1.30; 포션 공급 중단 weight ×0.08; 본사 재고 감사
min(100G, waste × 5G). Each is inline in its catalog entry.

```text
정확한 Modifier 수치는 PASS3 Balance 대상이다.
정확한 Weight Modifier는 PASS3 Balance 대상이다.
정확한 감사 비용 수치는 PASS3 Balance 대상이다.
```

## SUPERSEDED — Event 05 마석 / Special category -> Potion (v2.7 catalog migration)

The v2.7 entry (`current-day Potion buy price +35%`, targets `Potion` only, does not target
`Special`) replaces the v2.5 Special effect, and the Special examples in PHASE PERSISTENCE / INFORMATION
RULE are stale with it. The entry name follows `COPY_AUDIT_APPROVED_v2.8.0.md` §13-5 (REWORD below).

```text
## 05. 마석 가격 폭등
오늘 Special Category 매입가 +35%
오늘 Special 매입가 +35%
- Special 매입가 +35%
```

## SUPERSEDED — probability wording replaced by v2.8 exact deterministic mechanics

신입 모험가 시즌 / 왕립 기사단 방문: "합류 가능성 증가" -> exactly one generated newcomer seated in an
existing visitor slot; the optional "제외할 수 있다" -> the qualified v2.8 rule "if no legal newcomer can be
generated because the Living NPC Cap is full, the Event is not eligible". 암시장: "등장할 수 있다" ->
"exactly one special Rare+ Order offer". 치유소 휴무: Medical -> v2.8 "The stale Medical category is not
active." / `Insurance purchase intent +20%p`. 왕도 축제's v2.5 unquantified effect block is replaced in the
catalog by v2.8 `purchase intent +20%p` (the same line survives as an INFORMATION RULE example).

```text
오늘 신규 / 견습 모험가 합류 가능성이 증가한다.
오늘 신규 NPC를 받을 유효한 여지가 없다면
이 Event는 Eligible Pool에서 제외할 수 있다.
오늘 고레벨 / 희귀 신규 모험가가 합류할 가능성이 증가한다.
유효한 신규 NPC Slot이 없다면
Event를 Eligible Pool에서 제외할 수 있다.
오늘 Order Offer에 희귀 이상 특별 상품 후보가 등장할 수 있다.
오늘 Medical 구매 의사 증가
```

## REWORD — version framing removed from a binding v2.8 principle

```text
v2.8 audits Function truth so Flavor never implies a different mechanic.
```

```new
Flavor never implies a different mechanic.
```

## REWORD — "remains" / "unchanged" framing removed

```text
Mechanic remains:
At unchanged 35%:
- targets v2.7 `Potion` category only
Any Event filter/copy that still uses `Medical` to mean the v2.7 Potion line is stale.
```

```new
Mechanic:
At 35%:
- targets `Potion` category only
Any Event filter/copy that still uses `Medical` to mean the Potion line is stale.
```

## REWORD — Boss reveal ownership line: stale day list trimmed, current owner file

BOSS_v2.8.0 has a five-day information cadence (D5 / D15 / D20 / D25 / D30) and moved Final Family disclosure
to D25, so the `D5/D15/D30` list is dead; the live rule (Boss reveal is not a Normal Event, owned by BOSS)
stays.

```text
D5/D15/D30 Boss reveal은 Normal Event가 아니며 BOSS가 소유한다.
```

```new
Boss reveal은 Normal Event가 아니며 `BOSS_v2.8.0.md`가 소유한다.
```

## REWORD — Frequency QA: pre-Deep average "7–8" trimmed

22 × 35% ≈ 7.7 is the pre-Deep baseline; the current expectation (6.65–7.0) is stated in TIMING /
FREQUENCY. The live check (Events stay memorable) is kept.

```text
- 평균 약 7–8회의 Event가 충분히 기억되는가?
```

```new
- Event가 충분히 기억되는가?
```

## REWORD — Event 05 entry name and EVENT MIX entry follow the current title (COPY_AUDIT_APPROVED §13-5)

v2.7: "Exact player-facing title/reveal copy -> COPY_WORLD_VOICE"; the current exact title is `포션 가격 폭등`.

```text
- 마석 가격 폭등
```

```new
### 05. 포션 가격 폭등
- 포션 가격 폭등
```

## REWORD — cross-owner pointers name the current owner file

The v2.7 Event-05 copy pointer becomes the catalog-wide copy pointer (COPY_WORLD_VOICE_v2.8.0 routes all
exact Event Function / Flavor text to COPY_AUDIT_APPROVED); the same pointer is added to the not-owned
list in CROSS-SPEC OWNERSHIP.

```text
Exact player-facing title/reveal copy -> `COPY_WORLD_VOICE_v2.7.0.md`.
Use the actual v2.7 Item category/function owned by `ITEM_v2.7.0.md`.
Potion Line은 ITEM Canonical 정의를 따른다.
- Deep notice / first-use Tutorial may be the special Morning beat under UI_UX
→ ITEM
→ NPC_TRAIT
→ DUNGEON_HAZARD
→ ECONOMY_ORDER
→ SALE
→ RELIC
→ NIGHT_CLOSING
→ UI_UX
→ COPY_WORLD_VOICE
```

```new
Exact player-facing title/reveal copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.
Use the actual Item category/function owned by `ITEM_v2.8.0.md`.
Potion Line은 `ITEM_v2.8.0.md` 정의를 따른다.
- Deep notice / first-use Tutorial may be the special Morning beat under `UI_UX_v2.8.0.md`
→ `ITEM_v2.8.0.md`
→ `NPC_TRAIT_v2.8.0.md`
→ `DUNGEON_HAZARD_v2.8.0.md`
→ `ECONOMY_ORDER_v2.8.0.md`
→ `SALE_v2.8.0.md`
→ `RELIC_v2.8.0.md`
→ `NIGHT_CLOSING_v2.8.0.md`
→ `UI_UX_v2.8.0.md`
→ `COPY_WORLD_VOICE_v2.8.0.md`
Exact Event title / Function / Flavor copy
→ `COPY_AUDIT_APPROVED_v2.8.0.md`
```

## REWORD — headings: numbering removed, one level scheme

v2.5 `# N.` section headings become `##`; `## N-N.` subsections, the PHASE PERSISTENCE phase headings,
the EVENT MIX role headings and the EVENT QA topic headings become `###`; catalog entries become `###` under
CANONICAL EVENT CATALOG. The v2.5 header-region headings (`# 0. NON-NEGOTIABLE`, `# 1. EVENT TIMING /
FREQUENCY`) are uncounted by the check; their new forms are in the new fence. New QA subsection headings
hold the v2.5 HAZARD EVENT QA, the Deep-Day embedded QA and the v2.8 numeric acceptance.

```text
## 1-1. Normal Event가 발생하지 않는 날
## 1-2. Eligible Day
## 1-3. 발생 확률
# 2. EVENT SELECTION
## 2-1. Selection Weight
# 3. MORNING EVENT REVEAL
## 3-1. Event를 Gate 정보보다 먼저 보여준다
# 4. EVENT PRESENTATION
# 5. PHASE PERSISTENCE
## MORNING
## ORDER
## SALE
## NIGHT
## CLOSING
# 6. EVENT INFORMATION RULE
# 7. EVENT DURATION
# 8. EVENT-ADDED HAZARD
## 8-1. Event로 공개된 Hazard는 Known Hazard다
## 8-2. Event Hazard는 Counter Item을 자동 지급하지 않는다
# 9. EVENT HAZARD ELIGIBILITY
## 9-1. 한파
## 9-2. 독안개
# 10. HAZARD EVENT QA
# 11. CANONICAL EVENT CATALOG
## 01. 물류대란
## 02. 본사 1+1 행사
## 03. 게이트 순례주간
## 04. 몬스터 범람
## 06. 한파
## 07. 포션 공급 중단
## 08. 신입 모험가 시즌
## 09. 왕립 기사단 방문
## 10. 암시장 상인
## 11. 본사 재고 감사
## 12. 왕도 축제
## 13. 길드 파업
## 14. 미확인 게이트
## 15. 본사 반값 행사
## 16. 독안개
## 17. 보급 상단 도착
## 18. 길드 급여일
## 19. 치유소 휴무
## 20. 본사 폐기 지원
## 21. 늙은 음유시인
## 22. 본사 야간 근무 수칙
# 12. EVENT MIX
## Opportunity
## Pressure
## Mixed / RiskReward
# 13. RANDOMNESS GUARDRAIL
# 14. NPC EVENT GUARDRAIL
# 15. EVENT QA
## Frequency
## Importance
## Decision
## Randomness
## Hazard
## NPC
## Easter Egg
# 16. IMPLEMENTATION GUARDRAIL
# 17. CROSS-SPEC OWNERSHIP
# 18. FINAL TARGET
```

```new
## NON-NEGOTIABLE
## EVENT TIMING / FREQUENCY
### Normal Event가 발생하지 않는 날
### Eligible Day
### 발생 확률
### Deep Expedition Day exclusion
## EVENT SELECTION
### Selection Weight
## MORNING EVENT REVEAL
### Event를 Gate 정보보다 먼저 보여준다
## EVENT PRESENTATION
## PHASE PERSISTENCE
### MORNING
### ORDER
### SALE
### NIGHT
### CLOSING
## EVENT INFORMATION RULE
## EVENT DURATION
## EVENT-ADDED HAZARD
### Event로 공개된 Hazard는 Known Hazard다
### Event Hazard는 Counter Item을 자동 지급하지 않는다
## EVENT HAZARD ELIGIBILITY
### 한파
### 독안개
## CANONICAL EVENT CATALOG
### 01. 물류대란
### 02. 본사 1+1 행사
### 03. 게이트 순례주간
### 04. 몬스터 범람
### 06. 한파
### 07. 포션 공급 중단
### 08. 신입 모험가 시즌
### 09. 왕립 기사단 방문
### 10. 암시장 상인
### 11. 본사 재고 감사
### 12. 왕도 축제
### 13. 길드 파업
### 14. 미확인 게이트
### 15. 본사 반값 행사
### 16. 독안개
### 17. 보급 상단 도착
### 18. 길드 급여일
### 19. 치유소 휴무
### 20. 본사 폐기 지원
### 21. 늙은 음유시인
### 22. 본사 야간 근무 수칙
## EVENT MIX
### Opportunity
### Pressure
### Mixed / RiskReward
## RANDOMNESS GUARDRAIL
## NPC EVENT GUARDRAIL
## IMPLEMENTATION GUARDRAIL
## CROSS-SPEC OWNERSHIP
## QA / ACCEPTANCE
### Frequency
### Importance
### Decision
### Randomness
### Hazard
### NPC
### Easter Egg
### Hazard Event PASS / FAIL
### Deep Expedition Day
### Event numeric acceptance
## FINAL TARGET
```

## UNRESOLVED — kept verbatim, reported to the User

- 신입 모험가 시즌: v2.8 "The guaranteed newcomer replaces one ordinary selected visitor when necessary."
  sits beside the kept v2.5 금지 bullet "- 기존 단골 Revisit 강제 삭제". Whether the displaced "ordinary
  selected visitor" may be a Trusted Regular's scheduled revisit is not defined. Both kept.
- PHASE PERSISTENCE / SALE example "- 임시 Wallet Modifier" (v2.5) vs 길드 급여일 v2.8 "UI must distinguish
  Wallet from Event budget." / "it does not permanently multiply or add to NPC Wallet": the example still
  calls the Event budget a Wallet modifier. Both kept.

## REVIEW NOTES (independent review: 0 MUST-FIX)

- Reveal copy: COPY_AUDIT §13-1..§13-22 owns current Flavor / Function for all 22 Events.
- Newcomer vs "기존 단골 Revisit 강제 삭제": compatible (the 금지 list is about the roster; the Event
  is ineligible when the Living Cap is full; Loyalty never guarantees a visit). Minor wording gap:
  "ordinary selected visitor" is undefined (Source replaces the last-drawn visitor, regulars included).
- "임시 Wallet Modifier" vs Wallet/Event-budget display: compatible (ECONOMY_ORDER defines purchasing
  power as Wallet + temporary Event budget; display owned by UI_UX / SALE).

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

C: old stage label renamed.

```text
실제 분포는 Stage 9에서 측정하며, 이를 이유로 35%를 자동 상향하지 않는다.
Stage 9 measures actual Event count; any later chance rebalance requires approval.
```

```new
실제 분포는 전체 런 밸런스 측정에서 측정하며, 이를 이유로 35%를 자동 상향하지 않는다.
Full-run balance measurement measures actual Event count; any later chance rebalance requires approval.
```

## AMENDMENT — User decision 2026-09-23: Store Support rebalance

길드24 원정전문점 인증 was remade into 원정 전문 인증 (id expeditionCert kept); its Counter x1.60 reads the adventurer's actual Gate Hazards, Event Hazards included. Name references follow.

```text
- 길드24 원정전문점 인증
- 길드24 원정전문점 인증이 Event Hazard를 인식한다.
- 원정 위험 게시판 / 길드24 원정전문점 인증 / 기존 Counter coverage logic / Forecast가 Event Hazard를 인식하는가?
```

```new
- 원정 전문 인증
- 원정 위험 게시판 / 원정 전문 인증 / 기존 Counter coverage logic / Forecast가 Event Hazard를 인식하는가?
- 원정 전문 인증이 Event Hazard를 인식한다.
```

## AMENDMENT — v2.9.0 F3: newcomer Event needs an existing slot (2026-09-25)

v2.9.0 F3 (2026-09-25): the repeated-strain Death cut surfaced a morning whose whole roster is dead or on recovery days while 신입 모험가 시즌 fires; the guaranteed existing slot cannot exist then, so the eligibility clause is extended in the same spirit as the Living NPC Cap clause (flagged for User confirmation in the F3 report).

```new
- if the Day has no existing visitor slot to give (every other adventurer dead or on recovery days that morning), the newcomer is that Day's only visitor — the one case the Event adds a visitor, on a Day that would otherwise have none (User 2026-09-25, v2.9.0; the same rule for 왕립 기사단 방문)
```

## AMENDMENT — v2.9.1 balance: 23. 위령제 (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1 balance, `reports/v29-balance-agreements.md` §3): the catalog gains 23. 위령제 — every segment Death limit +1 from the Day it occurs. TYPE / WEIGHT / eligibility / once-per-Run / copy are UNRESOLVED and stated so in the owner.

```text
총 22종.
```

```new
(User 2026-09-25, v2.9.1 balance.)
이 날부터 Run 끝까지 모든 구간 사망 한도 +1
사망 한도 구간과 추모 방명록 -> `CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED.
```

## AMENDMENT — v2.9.1 balance: 위령제 conditions / 만반의 준비 tutorial / hybrid rule (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1): 위령제 follows the ordinary Event conditions (TYPE Run / Opportunity, WEIGHT 1.0, may recur, +1 each time); a contextual 만반의 준비 tutorial the first time both Bag slots of an uninjured customer departing below Fatigue 20 are filled; an Epic hybrid stays below every specialist of the same or a higher Rarity (it may exceed a Common Main). Earlier declarations this batch supersedes were removed from the fences above in place.

```text
22종은 다음 역할을 가진다.
```

```new
TYPE: Run / Opportunity
발생 조건은 다른 일반 Event와 같다 (User 2026-09-25): 같은 Eligible Day, 같은 35% 발생 Roll, 같은 Weight 기반 선택.
따로 특별 취급하지 않는다 — 사망 여부로 Eligible을 거르지 않고, 다른 Event처럼 한 Run에 다시 나올 수 있으며
나올 때마다 +1이 더해진다.
23종은 다음 역할을 가진다.
```

## AMENDMENT — v2.9.1: approved copy pointers (User decision 2026-09-25)

User decision 2026-09-25 (v2.9.1): the Event is named 길드 합동 위령제; its reveal copy and the 만반의 준비 tutorial line are approved in COPY_AUDIT §13-23 / §3-7. Earlier declarations this batch supersedes were removed from the fences above in place.

```new
총 23종 (23. 길드 합동 위령제 — User 2026-09-25, v2.9.1 balance).
### 23. 길드 합동 위령제
Exact reveal copy -> `COPY_AUDIT_APPROVED_v2.8.0.md` §13-23.
- 길드 합동 위령제
```
