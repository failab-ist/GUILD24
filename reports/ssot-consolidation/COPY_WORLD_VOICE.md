# COPY_WORLD_VOICE consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/COPY_WORLD_VOICE_v2.8.0.md
CHAIN=design_ssot/COPY_WORLD_VOICE_v2.8.0.md,design_ssot/history/COPY_WORLD_VOICE_v2.7.0.md,design_ssot/history/COPY_WORLD_VOICE_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/COPY_WORLD_VOICE_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.

Placement: v2.5 section order is the skeleton (numbers removed, `#` sections -> `##`, `##` -> `###`).
v2.8 EXACT COPY ROUTING follows ROLE. v2.8 Priority + v2.7 truth-critical list form TRUTH-CRITICAL COPY.
v2.8 LOCKED PLAYER TERMS, the 2026-09-12 amendment terms (Deep / Sponsorship / Great Success / Run abandon)
and v2.7 ITEM CATEGORY TERMINOLOGY join PLAYER-FACING TERMINOLOGY. v2.8 NPC DIALOGUE TRUTH and pool sizes
join NPC DIALOGUE & RESULT VARIATION; the helped callback joins CALLBACK; v2.7 tutorial voice / coach copy
join SYSTEM / TUTORIAL / BUTTON. Surface boundary sections (v2.7 / v2.8) follow IMPLEMENTATION GUARDRAIL.
Boss copy (v2.5 D5 / D15 / D30, v2.7 GLUTTONY and D25 timing, v2.8 routing / SLOTH terminology) is one
BOSS / META COPY BOUNDARY section. QA is one list.

Exact-copy rule: COPY_AUDIT_APPROVED_v2.8.0.md owns exact player-facing copy it states. Lines it states or
deletes are dropped here with a pointer. Lines COPY_AUDIT does not restate but explicitly keeps (`현행 유지`:
six D5 Boss Flavors, D15 Trait names / Functions) and lines it does not cover (remaining coach steps,
Hazard wording, 보급 전 원정 전망, 현재 지점 포기 label, 탐식의 권능) stay verbatim, since this owner is their only
canonical text.

## LEGACY — patch header / inheritance scaffolding

The chain is now inline; the v2.8 Priority line and the v2.7 stale-example rule are kept (the latter reworded below).

```text
## INHERITANCE
All unchanged world voice and non-conflicting v2.7 copy inherit COPY_WORLD_VOICE_v2.7.0.md.
All unchanged DATA / FUNCTION / FLAVOR separation, voice, dialogue, culture, terminology, and owner boundaries inherit `COPY_WORLD_VOICE_v2.5.0.md`.
v2.7 is not a broad dialogue rewrite.
This patch owns only copy that would otherwise teach a stale or nonexistent mechanic.
```

## LEGACY — change narration / notes about removed or stale rules

Narration about what an older version said. The live rule each note framed is kept: 탐식 / Rare+ prohibition, D25 timing, 현재 지점 포기 label, 불룡볶음면 pointer.

```text
## INHERITED EXAMPLE OVERRIDES
The following inherited v2.5 copy/function examples are explicitly superseded where current v2.7 owner truth changed.
### 불룡볶음면
The old copy note that describes it as `투력 support` is stale.
The inherited D15 function text that says `[등급] 이상 보급품` is also stale because v2.7 has no Rarity threshold for this Boss effect.
The inherited `D30 — 최종 정찰 보고` timing is superseded.
The older v2.5 Copy amendment candidate `현재 런 포기 / 현재 런 포기 · 새 점포 준비` is superseded.
### Current Run abandon label
```

## LEGACY — PASS3 tuning history (resolved)

PASS3 values are approved; the pre-approval guard is dead. The DATA rule it served is kept (DATA sections and the GREED DATA block).

```text
PASS3 values are DATA.
Do not invent a numeric value in prose before PASS3 is approved.
```

## LEGACY — retired systems (Franchise Grade / Start Contract, per META_v2.8.0)

Franchise Grade and Start Contract are retired (archive policy owned by META_v2.8.0). `가맹 효과` (발주 횟수 +1 / 매입가 +5%) was the Franchise Grade FUNCTION example.

```text
### 가맹 효과
발주 횟수 +1  
매입가 +5%
- Franchise Grade language must not imply direct gameplay power
- Franchise Grade may communicate Start Contract availability unlocked by Grade
- do not present legacy Day / Run-count / regular-customer / adventurer-level Start Contract gates as current Meta progress
```

## LEGACY — restatement (v2.8 GREAT SUCCESS heading; signal line kept verbatim from the locked-terms block)

The signal is kept as the v2.5 `Exact required signal` line and the QA line; the v2.8 Help lines are kept under ### Great Success opportunity.

```text
## GREAT SUCCESS SIGNAL HELP
Signal text remains:
    대성공을 노려볼 만합니다.
```

## SUPERSEDED — exact Boss report copy now owned by COPY_AUDIT_APPROVED_v2.8.0.md §14

D5 Header/Sub/Button (§14-2: 1차 조사 보고 / 토벌 대상 확인 as Label / 확인), D15 Intro/Button (§14-4: 전투 기록에서 변칙이 확인됐다. / 확인), SLOTH 유물 lines (§14-5, 점포지원), v2.7 GLUTTONY D15 Function lines (§14-4, identical text now owned there), D30/D25 report Header/Intro (§14-7). Pointer lines in the target name each section.

```text
Header:
> 길드 토벌 공고
Sub:
> 이번 토벌 대상
Button:
> 토벌 대상 확인
Intro:
> 길드 정보원이 추가 정보를 확보했다.
> 정보 확인
> 최종 정찰 보고
> 마왕군의 최종 전장이 확인됐다.
> 15일·20일·25일 중 두 차례와 30일에, 유물을 받는 대신 봉인 하나를 풀 수 있다.  
> 봉인을 풀면 그때의 유물은 받을 수 없으며, 풀린 봉인이 많을수록 슬로스가 약해진다.
아이템의 투력·강인함·기동·정신 증가량 50% 감소
환경 대응·보급·보험 효과는 유지
```

## SUPERSEDED — GLUTTONY 폭식 / Rare+ copy (탐식 / all Item Core-Stat ×0.50, BOSS_v2.8.0)

Replaced by the #### GLUTTONY / 탐식 block (v2.7) and COPY_AUDIT §14-2 (D5 Flavor) / §14-4 (D15 Function).

```text
### 폭식의 마왕 글러트니
> 최정예 토벌대의 보급품만 유난히 처참한 꼴로 발견됐다.
**특성 — 폭식의 권능**
> 최종전에서 [등급] 이상 보급품의 능력치 증가 효과가 감소한다.  
> 대응·보급·보험·기타 특수 효과는 그대로 적용된다.
```

## SUPERSEDED — D30 Family reveal line (D25 disclosure / D30 reuse, kept in the Boss section)

v2.7 moved the Family/Hazard disclosure to D25 and D30 only reuses it; the D5/D15/D30 split line and the D30 report heading are replaced by ### Final Family / Hazard reveal timing and ### D25 — 최종 정찰 보고.

```text
- D30 = exact Family/Hazard DATA needed for the Final decision
## D30 — 최종 정찰 보고
```

## SUPERSEDED — GLUTTONY 보급품 QA term (User-approved exact copy says 아이템, COPY_AUDIT §14-4)

The approved GLUTTONY Function reads `아이템의 투력·강인함·기동·정신 증가량 50% 감소`, so a check requiring `보급품` would fail the approved copy.

```text
- GLUTTONY Player-facing copy가 `장비`가 아니라 `보급품` 용어를 사용하는가?
```

## SUPERSEDED — tutorial coach steps now owned by COPY_AUDIT_APPROVED_v2.8.0.md §3

심층원정 §3-1, 발주 확정 §3-2, 대성공 §3-3, 전망 §3-4, 보급 §3-5 / §3-7 SUPPLY, 진열대 §3-6, 가격 §3-7 PRICING, 환경 대응 §3-7 HAZARD, 수량 §3-7 QUANTITY. The other eight steps (방문객 / 게이트 / 보유 골드 / 후보 교환 / 손님 / 목적지 / NIGHT / CLOSING) are not in COPY_AUDIT and stay here verbatim.

```text
## TUTORIAL COACH COPY — PLAYTEST HOTFIX — EXACT
심층원정
같은 게이트의 더 깊은 원정이다. 손님 1명을 후원할 수 있고, 성공하면 그 손님이 더 성장한다. 점포 매출에는 영향이 없다.
수량
발주할 수량을 고른다.
발주 확정
카트의 상품만 발주한다. 확정 후에도 추가 발주·후보 교환이 가능하고, 준비가 끝나면 ‘영업 시작’을 누른다.
대성공
준비가 충분하면 대성공 가능성이 생긴다. 보급을 더 챙기면 가능성이 커질 수 있다.
환경 대응
위험은 특정 능력을 압박한다. 현재 대응은 손님 능력과 보급을 함께 반영한다.
전망
상품을 팔아도 이 전망은 갱신되지 않는다. 성공/실패 결과는 미리 알 수 없고, 실제 결과는 원정 후 확인한다.
보급
필요 보급을 못 채우면 원정 준비에 공통 페널티가 걸려 투력·강인함·기동·정신이 낮아진다. 남는 보급은 현재 피로와 이번 원정에서 쌓일 피로를 줄인다.
진열대
고른 상품은 이 손님이 오늘 원정에서 한 번 사용한다. 모든 상품은 1회용이며 다음 원정으로 가져가지 않는다.
가격
50%는 투자, 100%는 기본, 150%는 수익 우선이다.
```

## SUPERSEDED — Event 05 exact copy now owned by COPY_AUDIT_APPROVED_v2.8.0.md §13-5

COPY_AUDIT §13-5 carries the current Function and a new Flavor; the mechanic-truth bullets stay.

```text
## EVENT 05 — EXACT PLAYER COPY
Exact player-facing copy:
포션 가격 폭등
포션 값이 또 올랐다.
오늘 포션 매입가 +35%
```

## SUPERSEDED — death FLAVOR candidates now owned by COPY_AUDIT_APPROVED_v2.8.0.md §20

The exact DEATH NARRATION pools (traded / known / stranger) are owned by COPY_AUDIT §20; a pointer replaces the candidate list.

```text
**FLAVOR 후보**
> 돌아오지 않았다.
> 오늘은 돌아오지 않았다.
> 예약해 둔 물건은 그대로 남았다.
> 마지막 영수증만 카운터에 남았다.
```

## SUPERSEDED — variant count 3–5 (v2.8 target minimum pool sizes)

v2.8 DIALOGUE EXPOSURE sets per-pool minimums (6–20) for the same ARRIVAL / TRAIT / SALE / refusal situations.

```text
반복 빈도가 높은 기본 상황은 대략 **3–5개의 좋은 Variant**를 우선한다.
```

## SUPERSEDED — 불룡볶음면 function (ITEM_v2.8.0: 강인함 +8, not 투력 support / +5)

ITEM_v2.8.0 row 13 is `강인함 +8, 냉기 +6, Supply 4`; both older statements are stale and the target points at ITEM instead of restating values.

```text
현재 ITEM의 실제 Identity인 Food / Supply / 투력 support / Cold flexibility와 연결되는 방향:
강인함 +5
냉기 Counter +6
Supply 4
```

## SUPERSEDED — Run abandon 현재 런 포기 wording (현재 지점 포기; confirm copy in COPY_AUDIT §1-3)

v2.7 replaced the label with `현재 지점 포기`; the confirmation meaning is replaced by the exact COPY_AUDIT §1-3 title / body / button. `Do not imply XP, settlement, compensation or reward.` stays.

```text
Identity=`현재 런 포기`.
Preferred destructive action:
`현재 런 포기 · 새 점포 준비`
Required confirmation meaning:
`현재 런을 보상 없이 포기하고 새 점포를 시작합니다.`
```

## LEGACY — merged / renumbered headings and labels

Amendment heading and the `Copy QA:` label: the amendment terms joined PLAYER-FACING TERMINOLOGY and its QA bullets joined the one COPY QA list.

```text
## APPROVED_AMENDMENT_2026_09_12 — LOCKED PLAYER-FACING TERMS
Copy QA:
```

## LEGACY — numbered / version headings (sections renumbered or merged into their topic)

```text
## LOCKED PLAYER TERMS
## BOSS INFORMATION COPY ROUTING
## SLOTH TERMINOLOGY
## NPC DIALOGUE TRUTH
## DIALOGUE EXPOSURE / RECENT REPEAT — EXACT
### ARRIVAL
### SALE
### NIGHT
### DEATH NARRATION
## RETURN-VISIT HELPED CALLBACK
## TRUTH-CRITICAL COPY — v2.7
## ITEM CATEGORY TERMINOLOGY
### GLUTTONY / 탐식
## TUTORIAL VOICE
## RELATED
## 0.1 Copy는 세 역할로 분리한다
## 0.2 기본 Voice
## 0.3 Copy 때문에 새 시스템을 만들지 않는다
# 1. OWNERSHIP / CROSS-SPEC BOUNDARY
## 1.1 Item boundary
## 1.2 NPC boundary
# 2. PLAYER COPY MATRIX
# 3. PLAYER-FACING TERMINOLOGY
# 4. DATA — 사실은 표시한다
## GOOD
## BAD
# 5. FUNCTION — 기능은 정확하게 쓴다
### Trait Effect
### Item Effect
# 6. FLAVOR — 설명이 아니라 기억
## 6.1 Flavor 우선순위
## 6.2 Trait Flavor
## 6.3 Item Flavor
# 7. VOICE — 실제 작성 기준
## 7.1 정상 문장이 대부분이다
## 7.2 Joke를 설명하지 않는다
## 7.3 문장 Rhythm을 균일하게 만들지 않는다
## 7.4 NPC Character는 말끝보다 "무엇을 말하는가"로 만든다
## 7.5 AI식 Copy 금지
## 7.6 SaaS / App 문체 금지
# 8. WIT / CULTURE PLAYBOOK
## 8.1 LEVEL 1 — 편의점 생활문화
## 8.2 LEVEL 2 — 현실 상품 패러디
### 생수 계열
### 가성비 도시락 계열
### ITEM의 `불룡볶음면`
### 크림빵 계열
## 8.3 LEVEL 3 — Game / eSports / Internet Easter Egg
# 9. RARE REFERENCE NPC
# 10. CULTURAL REFERENCE CONTEXT CHECK
# 11. NPC DIALOGUE & RESULT VARIATION
## 11.1 NPC Dialogue Variation
## 11.2 NPC Result Variation
## 11.3 VARIATION HARNESS
# 12. CALLBACK
# 13. SYSTEM / TUTORIAL / BUTTON
## 13.1 System Message
## 13.2 Tutorial
## 13.3 Button
# 14. IMPORTANT RESULT
# 15. NPC NAME VOICE
## 15.1 MAIN VOICE — 한국식 + 판타지 + 유쾌한 비틀기
## 15.2 READABILITY
# 16. GLOBAL COPY SCOPE
# 17. IMPLEMENTATION GUARDRAIL
# 18. COPY QA
# 18.5 BOSS / META COPY BOUNDARY
## D5 — 길드 토벌 공고
### 분노의 마왕 래스
### 오만의 마왕 프라이드
### 질투의 마왕 엔비
### 탐욕의 마왕 그리드
### 색욕의 마왕 러스트
### 나태의 마왕 슬로스
## D15 — 길드 정보 보고
# 19. FINAL COPY FILTER
## Q1. 반드시 알아야 하는 정보인가?
## Q2. 없어도 Rule 이해에는 문제가 없는가?
## Q3. 세계 / Character / 사건을 실제로 더 기억하게 만드는가?
## Q4. 기존 Function을 다른 말로 다시 설명하는가?
## Q5. 웃기려고 애쓰는 문장처럼 보이는가?
## Q6. 반복 NPC 상황에서 항상 같은 한 줄만 나오게 되는가?
# 20. FINAL GOAL
```

## REWORD 1 — version framing removed ("inherited v2.5 example" / "current v2.7 owner"); the rule still binds every example in this owner

```text
Where an inherited v2.5 example names a Rule/value that changed in a current v2.7 owner, the current owner wins and the stale example is not Design Truth.
```

```new
Where an example in this owner names a Rule/value that changed in its current owner, the current owner wins and the stale example is not Design Truth.
```

## REWORD 2 — dead clause trimmed: Franchise Grade is retired (META_v2.8.0)

```text
- Job Mastery / Franchise Grade / Meta unlock / Monster Knowledge rule
```

```new
- Job Mastery / Meta unlock / Monster Knowledge rule
```

## REWORD 3 — pointers updated to current owner files

```text
Item truth -> `ITEM_v2.7.0.md`
Boss identity/trait function -> `BOSS_v2.7.0.md`
Final reveal timing -> `CORE_RUN_v2.7.0.md` / `FINAL_EXPEDITION_v2.7.0.md`
Run abandon function/UI -> `CORE_RUN_v2.7.0.md` / `UI_UX_v2.7.0.md`
Event function -> `EVENT_v2.7.0.md`
Sale/UI -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
Night causality -> `NIGHT_CLOSING_v2.7.0.md`
```

```new
Item truth -> `ITEM_v2.8.0.md`
Boss identity/trait function -> `BOSS_v2.8.0.md`
Final reveal timing -> `CORE_RUN_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md`
Run abandon function/UI -> `CORE_RUN_v2.8.0.md` / `UI_UX_v2.8.0.md`
Event function -> `EVENT_v2.8.0.md`
Sale/UI -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
```

## REWORD 4 — version framing removed ("v2.7")

```text
Exact v2.7 Player-facing action label:
```

```new
Exact Player-facing action label:
```

## REWORD 5 — pointer updated to current owner file

```text
Authoritative player-facing category identities are owned by `ITEM_v2.7.0.md`:
```

```new
Authoritative player-facing category identities are owned by `ITEM_v2.8.0.md`:
```

## REWORD 6 — version framing removed

```text
`Medical` is not an active v2.7 category.
```

```new
`Medical` is not an active category.
```

## REWORD 7 — patch framing removed

```text
This patch does not create a second localized-category taxonomy.
```

```new
This owner does not create a second localized-category taxonomy.
```

## REWORD 8 — pointer updated to current owner file; the ITEM values it introduced are dropped (see SUPERSEDED)

```text
Current function truth is owned by `ITEM_v2.7.0.md`:
```

```new
Current function truth is owned by `ITEM_v2.8.0.md`.
```

## REWORD 9 — pointer updated to current owner file

```text
Mechanic ownership -> `EVENT_v2.7.0.md`.
```

```new
Mechanic ownership -> `EVENT_v2.8.0.md`.
```

## REWORD 10 — pointer updated to current owner file

```text
Player-facing identity follows `BOSS_v2.7.0.md`:
```

```new
Player-facing identity follows `BOSS_v2.8.0.md`:
```

## REWORD 11 — "inherited" framing removed; the prohibition stays

```text
All inherited `폭식 / 폭식의 마왕 글러트니 / 폭식의 권능` wording is stale.
```

```new
All `폭식 / 폭식의 마왕 글러트니 / 폭식의 권능` wording is stale.
```

## REWORD 12 — version framing removed; the exact D15 Function lines moved to COPY_AUDIT §14-4 (pointer above)

```text
Exact v2.7 D15 player-facing copy:
```

```new
Exact D15 Trait name:
```

## REWORD 13 — dead D30 timing clause replaced by the report name: the 최종 정찰 보고 is the D25 disclosure beat (v2.7 timing, kept above)

```text
- D30이 실제 두 Family의 T2 Hazard pressure를 그대로 보여주며 별도 공략문을 덧붙이지 않는가?
```

```new
- 최종 정찰 보고가 실제 두 Family의 T2 Hazard pressure를 그대로 보여주며 별도 공략문을 덧붙이지 않는가?
```

## NEW — restructured headings

```new
## ROLE
## MUST READ FIRST — NON-NEGOTIABLE
### Copy는 세 역할로 분리한다
### 기본 Voice
### Copy 때문에 새 시스템을 만들지 않는다
## TRUTH-CRITICAL COPY
## OWNERSHIP / CROSS-SPEC BOUNDARY
### Item boundary
### NPC boundary
### RELATED
## PLAYER COPY MATRIX
## PLAYER-FACING TERMINOLOGY
### LOCKED PLAYER TERMS
### ITEM CATEGORY TERMINOLOGY
## DATA — 사실은 표시한다
### GOOD
### BAD
## FUNCTION — 기능은 정확하게 쓴다
#### Trait Effect
#### Item Effect
## FLAVOR — 설명이 아니라 기억
### Flavor 우선순위
### Trait Flavor
### Item Flavor
## VOICE — 실제 작성 기준
### 정상 문장이 대부분이다
### Joke를 설명하지 않는다
### 문장 Rhythm을 균일하게 만들지 않는다
### NPC Character는 말끝보다 "무엇을 말하는가"로 만든다
### AI식 Copy 금지
### SaaS / App 문체 금지
## WIT / CULTURE PLAYBOOK
### LEVEL 1 — 편의점 생활문화
### LEVEL 2 — 현실 상품 패러디
#### 생수 계열
#### 가성비 도시락 계열
#### ITEM의 `불룡볶음면`
#### 크림빵 계열
### LEVEL 3 — Game / eSports / Internet Easter Egg
## RARE REFERENCE NPC
## CULTURAL REFERENCE CONTEXT CHECK
## NPC DIALOGUE & RESULT VARIATION
### NPC Dialogue Variation
### NPC Result Variation
### VARIATION HARNESS
### NPC DIALOGUE TRUTH
### DIALOGUE EXPOSURE / RECENT REPEAT — EXACT
#### ARRIVAL
#### SALE
#### NIGHT
#### DEATH NARRATION
## CALLBACK
### RETURN-VISIT HELPED CALLBACK
## SYSTEM / TUTORIAL / BUTTON
### System Message
### Tutorial
### Button
### TUTORIAL VOICE
### TUTORIAL COACH COPY
## IMPORTANT RESULT
## NPC NAME VOICE
### MAIN VOICE — 한국식 + 판타지 + 유쾌한 비틀기
### READABILITY
## GLOBAL COPY SCOPE
## IMPLEMENTATION GUARDRAIL
### EVENT 05
## BOSS / META COPY BOUNDARY
### BOSS INFORMATION COPY ROUTING
### D5
#### 분노의 마왕 래스
#### 오만의 마왕 프라이드
#### 질투의 마왕 엔비
#### 탐욕의 마왕 그리드
#### 색욕의 마왕 러스트
#### 나태의 마왕 슬로스
### D15
#### GLUTTONY / 탐식
### D25 — 최종 정찰 보고
### Meta copy
## COPY QA
## FINAL COPY FILTER
### Q1. 반드시 알아야 하는 정보인가?
### Q2. 없어도 Rule 이해에는 문제가 없는가?
### Q3. 세계 / Character / 사건을 실제로 더 기억하게 만드는가?
### Q4. 기존 Function을 다른 말로 다시 설명하는가?
### Q5. 웃기려고 애쓰는 문장처럼 보이는가?
### Q6. 반복 NPC 상황에서 항상 같은 한 줄만 나오게 되는가?
## FINAL GOAL
```

## NEW — routing pointers to COPY_AUDIT_APPROVED_v2.8.0.md for dropped exact copy

```new
Confirm title / body / button -> `COPY_AUDIT_APPROVED_v2.8.0.md` §1-3.
**FLAVOR** -> exact DEATH NARRATION pools: `COPY_AUDIT_APPROVED_v2.8.0.md`
Exact copy for the 심층원정 / 수량 / 발주 확정 / 대성공 / 환경 대응 (HAZARD) / 전망 / 보급 / 재방문 손님 / 가방 (상품 사용) / 가격 (PRICING) steps -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3.
Exact player-facing Function / Flavor -> `COPY_AUDIT_APPROVED_v2.8.0.md` §13-5.
Retained current copy (`COPY_AUDIT_APPROVED_v2.8.0.md` §14-2 / §14-4 / §23): the six non-GLUTTONY D5 Flavor lines and the D15 Trait names / Function lines below.
Header / Label / Button and GLUTTONY Flavor -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-2.
Header / Intro / Button and GLUTTONY exact Function -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-4.
Opportunity / Seal lines -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-5.
Header / Intro -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-7.
```

## UNRESOLVED — kept, reported to the User

1. D25 report button. v2.5 `Button:` / `> 최종 준비` is kept under ### D25 — 최종 정찰 보고, because
   COPY_AUDIT §14-7 gives Header / Intro only. A "final preparation" button on the D25 beat reads as if
   Final preparation starts five days early (Source uses `확인`). Needs a User copy decision.
2. Rare callback count. v2.5 VARIATION HARNESS "희귀 Callback은 1–3개여도 충분하다." is kept; v2.8 sets
   `helped callback: 8`. Kept both: the v2.5 line may cover other rare callbacks; confirm scope.
3. Destination tutorial wording. v2.5 ### Tutorial "Authoritative Function wording" (예상 목적지와 실제
   목적지가 달라질 수 있습니다) and the v2.7 목적지 coach step (특성·당일 상황에 따라 바뀔 수 있다) are both kept;
   unclear whether the coach step replaced the v2.5 wording or they are separate surfaces.
4. Two priority orders. v2.8 `TRUTH -> FRESHNESS -> ... -> VOICE` and v2.7 `Rule Truth -> Terminology Truth
   -> Interaction Flow Truth -> Flavor Polish` are both kept under TRUTH-CRITICAL COPY; they do not
   contradict but their relation is not stated.

## REVIEW NOTES (independent review: 0 MUST-FIX)

- Every "exact copy now owned by COPY_AUDIT" drop is covered there (§1-3, §3, §13-5, §14, §20);
  copy COPY_AUDIT keeps unchanged or does not cover stays here.
- Open, reported to the User: D25 report `Button: 최종 준비` (Source `확인`); v2.5 vs v2.7 destination
  tutorial wording (Source uses v2.7; UI_UX still carries v2.5); two adjacent `Priority:` lists are
  complementary but unlabelled; rare-callback line scope.

## SUPERSEDED — pre-supply "Supporting copy" paragraph (UI_UX review follow-up)

v2.8 UI_UX "Do not keep a permanent explanatory paragraph under the readout", UI-Q-v28-15 and
PRESENTATION_POLISH_BATCH2 forbid it; Source shows no such paragraph. Same drop as in UI_UX.

```text
Supporting copy:
아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.
보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.
```

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A5 D25 report button is `확인` (Source). A6 the older destination wording is replaced by the coach step.

```text
> 최종 준비
Authoritative Function wording:
> 특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.
```

```new
> 확인
Authoritative wording: the 목적지 tutorial coach step below.
```


## AMENDMENT — DAY 0 Store Support tutorial (User decision 2026-09-24)

```new
점포지원 (DAY 0, User 2026-09-24)
점포지원은 이번 영업 내내 적용되는 효과다. 첫 지원은 하나를 무료로 고른다.
점포지원 카드
카드마다 효과와 가격이 적혀 있다. 이번 영업을 어떻게 꾸릴지 떠올리며 고른다.
점포지원 구매
누르면 바로 확보된다. 이후 DAY 5·10·15·20·25·30에 새 후보가 오고, 최대 7개까지 들일 수 있다.
```


## AMENDMENT — first-sale coach diet (User decision 2026-09-24)

The 손님 coach mark is retired (the 목적지 mark stays: COPY_WORLD_VOICE §Tutorial names it the authoritative
wording of the destination rule); the returning-customer and Bag marks are contextual and their
exact copy is owned by COPY_AUDIT_APPROVED_v2.8.0.md §3 (the pointer line, declared new in this ledger, is reworded in place).

```text
손님
손님을 누르면 특성과 지난 원정 기록을 볼 수 있다.
```

