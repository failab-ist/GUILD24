# GUILD24 v2.8 — Director Plan / Core Readability & Playtest Response

> Project: 《던전 앞 편의점 / GUILD24》
> Document role: **v2.8 DIRECTOR PLANNING / SCOPE ROUTER**
> Status: **PLANNING — NOT DESIGN SSOT**
> Authority: User's newest confirmed decision > Current Canonical Project Sources > Current Source > this plan
>
> v2.8 is limited to the current game's P0/P1 problems.
> P2 and later expansion work is routed to `GUILD24_v2.9_PLUS_DEFERRED_DETAILED.md`.

---

# 0. v2.8 PURPOSE

v2.8 does not broaden GUILD24 first.

It closes the remaining problems exposed by v2.7 play and makes the existing core loop easier to read:

```text
observe
→ infer
→ choose
→ see the actual change
→ see the result
→ remember it for the next decision
```

Default order:

```text
REMOVE
→ REUSE
→ MERGE / CLARIFY / REBALANCE
→ ADD only if still required
```

No P2 structural/content expansion is part of v2.8.

---

# 1. P0 — CORRECTNESS / RUNTIME UX

Close current correctness and mobile-runtime issues before broader design work.

Current playtest findings:

- mobile Decoration back-navigation can return to a blank state
- stale NPC detail copy still references hidden growth potential / remaining Traits
- internal Potion marker can surface as player-facing information
- stale `생존` terminology remains where `강인함` is current truth
- `부상 · 부상1`-style duplicate state presentation must be removed
- NIGHT fatigue/result labels use internal or unclear terms
- mobile Boss reveal art can crowd the information and force unnecessary scrolling

These are not future-feature opportunities.
They are current correctness / information-trust fixes.

---

# 2. P1 — COPY / INFORMATION TRUST AUDIT

v2.8 includes a full Current-Source copy audit.

Audit order:

```text
TRUTH
→ FRESHNESS
→ DECISION VALUE
→ PLACEMENT / DUPLICATION
→ SCAN
→ VOICE
```

The goal is not to explain more.

The goal is:

> reduce internal calculation language and strengthen the visible connection between the Player's choice, the actual system change, and the resulting expedition/store outcome.

Required audit surfaces include:

- SALE
- NIGHT
- CLOSING
- Item function copy
- Store Support copy
- Event Flavor / Function
- Boss information beats
- Deep Expedition
- Help / tutorial copy
- stale NPC state copy

Broad world-flavor expansion and broad Dialogue Pool expansion are not v2.8 scope.

---

# 3. P1 — SALE / NIGHT CAUSAL FEEDBACK

## 3.1 SALE INFORMATION BOUNDARY

Keep the hidden final expedition probability hidden.

Do not add:
- relative Stat-change percentages
- a new contribution score
- a live post-Item Combat Forecast / Hazard Readiness answer
- hover/focus previews that act as an answer grader

The pre-supply Combat Forecast / Hazard Readiness / failure-conditioned Death risk remain frozen as the current canonical boundary requires.

The SALE screen may still show exact Item effects and deterministic Supply/Fatigue arithmetic.

### Great Success signal — approved v2.8 direction

The Great Success signal is an exception to the frozen forecast only **after an actual purchase commits**.

Rules:
- selecting or previewing an Item does not change the signal
- a completed purchase may recompute the signal from the committed Bag
- exact Great Success probability remains hidden
- Combat Forecast / Hazard Readiness / failure-conditioned Death risk remain frozen
- the signal is feedback on an already-committed choice, not a pre-purchase answer

---

## 3.2 NIGHT RESULT HIERARCHY

Use this information order:

```text
Outcome
→ proven effect of what the Player sold
→ Level / Stat change
→ Fatigue result
→ EXP / NPC Wallet / other changes
```

Do not praise an Item merely because it was carried.

Strong causal feedback requires a proven resolved contribution.

---

## 3.3 PROVEN ITEM CAUSALITY — COUNTERFACTUAL PROOF

The Player-facing rule is simple:

> if the sold preparation provably changed the resolved expedition result, say what changed.
> if it cannot be proven, say nothing.

This applies equally to:
- Food
- Drink
- Potion
- Field Gear
- Insurance

Do not give Field Gear automatic narrative priority over Food/Drink.
A survival Food may affect Combat preparation, Hazard defense and survival, while a Field Gear Item may affect the same final Outcome through a narrower Counter channel.

### Resolution order

The real expedition resolves exactly once under the ordinary canonical rules.

Do **not** reorder gameplay calculation so that:
- Hazard Items resolve first
- Food resolves later
- one category owns credit by convention

After the actual Outcome is settled, run a **proof-only shadow comparison**.

Normal Bag capacity is 2, so compare only the actual committed Bag and its minimal removals:

```text
actual Bag: A + B
shadow:     without A
shadow:     without B
shadow:     without A and B, only when needed to distinguish shared/redundant contribution
```

The shadow comparison:
- does not mutate NPC / Run state
- does not pay or remove Gold
- does not grant XP / Loot / Loyalty
- does not consume gameplay RNG
- does not reroll the expedition
- uses the actual expedition's already-resolved random evidence only

If the alternate path would require a random decision that the actual expedition never drew, that comparison is `UNPROVEN`.
Do not invent a replacement roll merely to produce attribution.

This intentionally prefers under-reporting over false causality.

### Overlap attribution

If removing only A worsens the proven result and removing only B does not:
- credit A

If removing either A or B independently worsens the result to the same meaningful degree:
- credit both in one line

If neither individual removal worsens the result but removing both does:
- do not invent individual credit
- use generic committed-preparation attribution

If both contribute but one has a strictly larger proven Outcome difference:
- show the stronger single Hero Feedback line rather than stacking multiple explanations

### Hero Feedback copy

Keep the line short and result-first.

Preferred grammar:

```text
{Item} 덕분에 살아 돌아왔다.
{Item} 덕분에 중상을 피했다.
{Item} 덕분에 부상을 피했다.
{Item} 덕분에 원정을 성공했다.
{Item} 덕분에 대성공했다.
```

When two Items are both individually necessary:

```text
{Item A}·{Item B} 덕분에 부상을 피했다.
```

When only the combination is provable:

```text
챙긴 보급 덕분에 부상을 피했다.
```

Remove vague Hero Feedback such as:
- `부식 위험 감소`
- `환경을 철저한 준비로 극복했다`

A mere reduction in hidden risk is not enough for NIGHT Hero Feedback.
The resolved result/state must be provably different.

Insurance keeps its already-provable direct conversion/aftercare feedback.

---

## 3.4 NIGHT NPC REACTION

For a living adventurer, reuse the existing SALE speech-bubble behavior rather than keeping Flavor as a permanent block below the result.

Rules:
- the reaction appears around the returning character
- it may overlap the character artwork
- it must not cover the Outcome word or other primary result information
- use the existing temporary-bubble behavior: about 3 seconds, tap to dismiss
- result information remains after the Flavor bubble disappears
- a death has no speech bubble; use narration/report treatment only

On mobile, Outcome typography may be reduced modestly where needed so a large label such as `대성공` and the temporary speech bubble do not collide.

---

# 4. P1 — FATIGUE READABILITY

Fatigue is an existing core axis and must become easier to notice when it matters.

Do not add a second fatigue-reduction subsystem merely for Item identity.
Existing excess Supply already reduces Fatigue through the canonical Supply/Fatigue flow.

Remove player-facing hypothetical branch tables such as:

```text
성공 N · 퇴각 N · 부상 N
```

Do not add qualitative `양호 / 주의 / 위험` Fatigue tiers.

## 4.1 FATIGUE AS AN ACTIVE NPC STATE

Fatigue must be visible as a compact current-customer state during SALE.

Default:
```text
피로 2
```

If an actual penalty is active:
- Fatigue receives negative semantic emphasis
- affected Stats also receive negative semantic emphasis

After committed Supply changes current departure Fatigue, the visible state may read:

```text
피로 12 → 출발 8
```

A beneficial change uses positive semantic emphasis.

The decision surface should show current committed Supply compactly:

```text
보급 5 / 필요 3 · 여유 2
```

Do not print the whole future outcome matrix.

## 4.2 FATIGUE EXPLANATION ON DEMAND

The main surface shows the important current state.
Arithmetic lives behind the shared change/explanation popover.

For excess Supply:

```text
필요량을 채우고 남은 보급입니다.
출발 전 현재 피로를 먼저 줄이고, 남으면 귀환 후 쌓이는 피로를 줄입니다.
```

For an actual NIGHT result, the main result shows only the settled value:

```text
귀환 후 피로 11
```

On demand, show the resolved path:

```text
출발 8
원정에서 +5
남은 보급으로 -2
→ 귀환 후 11
```

Remove unclear labels such as:
- 밤 피로
- 보급 회복
- 보급 완화
- 원정 결과 +N when the value is actually Fatigue gain

---

# 5. P1 — SHARED SEMANTIC CHANGE FEEDBACK

Store Support effects, Stats, Fatigue and other changed values should use one visual language.

## 5.1 COLOR MEANING

Color is based on Player meaning, not arithmetic sign:

```text
unchanged = default
beneficial change = green
harmful change = red
```

Examples:
- operating cost 140 → 110 = beneficial / green
- Fatigue 8 → 12 = harmful / red
- Death risk 12% → 8% = beneficial / green
- Stat 32 → 40 = beneficial / green

Replace the current generic yellow `moved` treatment for Stats with this same semantic rule.

Color must not be the only interaction cue.
A changed value that can explain its source also needs a subtle non-color interactive affordance.

## 5.2 CHANGE-SOURCE POPOVER

Do not append source text to every value and increase mobile height.

Instead:
- desktop: hover / keyboard focus, with click also valid
- mobile: tap
- show one anchored source popover
- opening another closes the previous one
- outside tap / Escape closes it
- no layout-height change
- no gameplay pause

Examples:

```text
운영비 110G
→ 운영 효율 매뉴얼
  기본 운영비 -30G
```

```text
오늘 손님 5명
→ 지역 거점점 계약 +1명
```

```text
기동 18
→ 피로 12
  기동 -15%
```

This source-attribution language is shared across current systems rather than creating separate Store-Support-only UI.

Existing owned Store Supports must also remain compactly reachable when choosing a new Store Support.

---

# 6. P1 — STORE SUPPORT BALANCE / ATTRIBUTION

The playtest reported that Store Support effects can feel less influential than expected.

First make existing effects attributable when they actually occur through the shared semantic-change treatment.

Relevant channels include:
- added Order offers
- reduced operating cost
- commission / HQ support paid
- visitor-count change
- reroll benefit
- guaranteed Counter role

The Player should be able to understand:

> this changed because my Store Build has this support.

## 6.1 운영 효율 매뉴얼 — approved first Document Baseline

Keep the operating-cost reduction identity first rather than repurposing the Support.

First v2.8 measurement baseline:

```text
Base Price: 260G
Effect: next day onward, basic operating cost -30G
```

Purpose:
- reduce the current excessively long nominal payback period
- preserve the existing economy channel
- test a stronger value before replacing the Support's role

If late-window picks, especially D25, remain effectively dead after measurement, prefer candidate-window eligibility adjustment or another targeted fix rather than endlessly increasing the flat reduction.

---

# 7. P1 — BOSS PRESENCE / FIVE-DAY INFORMATION LOOP

Purpose:

> normal shop play must not make the Player forget that the Run is building toward a specific Demon King.

Use the existing Final/Boss information structure.
Do not add a new permanent dashboard or combat phase.

Confirmed information cadence:

```text
D0  — first investigation begins / D30 Demon King objective established
D5  — first investigation result: Demon King identity revealed
D10 — second investigation begins: investigate the identified Boss's combat anomaly
D15 — second investigation result: exact Boss Trait revealed
D20 — final reconnaissance begins: investigate route / final battlefield
D25 — final reconnaissance result: exact Final Family + Hazard state revealed
D30 — no new reveal; use the already-known state for Final preparation / resolution
```

Narrative purpose by investigation:

```text
D0→D5   = WHO is the target?
D10→D15 = HOW does this Boss fight?
D20→D25 = WHERE / WHAT will the Final expedition face?
```

All related copy must be re-audited so each investigation clearly asks for new information rather than repeating generic “정보를 캐러 간다” wording.

Mobile rule:
- information is primary
- Boss art is supporting presentation
- the reveal must not require unnecessary scrolling merely because the character image is large

SLOTH-related Store Support / Seal copy must also be audited against this cadence and current `점포지원` terminology.

---

# 8. P1 — MOBILE SALE DENSITY / LOYALTY

On mobile, remove duplicated queue information before adding new panels.

Approved direction:
- remove the decorative next-customer card on mobile
- keep queue count in one compact location
- use recovered space for current-customer state / decision information
- desktop may retain richer simultaneous queue information

Current-customer compact state should include:
- Injury state without duplicate numeric `부상1`
- Fatigue
- Loyalty

Loyalty does not need a large mobile progress bar.
Use compact numeric presentation, and show the existing Trusted Regular / 단골 state when its actual threshold is reached.

---

# 9. P1 — ITEM ROLE / FOOD HIERARCHY

Potion already has a clear visible progression.
Food did not.

v2.8 establishes a readable Food survival/Supply spine and removes the Hotbar identity from the active preparation hierarchy.

## 9.1 FOOD SPINE — approved identity direction

```text
Common   삼각김밥
Uncommon 간단 도시락
Rare     길드 특제 도시락
Epic     영웅 결전 도시락
```

Role:
- Food spine = 강인함 + high Supply
- progression should read as a more complete expedition meal, not as a cheaper Potion line

The exact Core-Stat/Supply numeric adoption belongs in the current Item owner spec / balance pass.
Do not invent a separate Fatigue-reduction effect.

## 9.2 NPC WALLET-GROWTH DIFFERENTIATION

The Uncommon and Rare meal stages also invest in the adventurer's future buying power through expedition Wallet gain.

Approved first Document Baseline:

```text
간단 도시락       → 원정 소지금 획득 +50%
길드 특제 도시락 → 원정 소지금 획득 +100%
영웅 결전 도시락 → no Wallet-gain bonus; top-end immediate survival/Supply efficiency
```

Player-facing wording must say `원정 소지금 획득`.
It must not imply that current Wallet is multiplied.

This intentionally prevents the Epic meal from being a strict upgrade in every channel:
- Rare can be the stronger recurring-NPC investment
- Epic can be the stronger immediate Final/survival preparation

## 9.3 HIGH-SURVIVAL DRINK

Retain the former Epic Hotbar catalog slot but change its identity rather than deleting the slot.

Approved identity:

```text
Common: 생수
Epic:   왕도 천연암반수
```

Role:
- Drink
- high 강인함 contribution
- low Supply relative to the Food spine
- reads as an advanced Water line rather than a Potion or meal substitute

Exact numeric values belong in the Item owner spec / balance adoption.

---

# 10. P1 — EVENT / ITEM / SUPPORT FUNCTION CLARITY

Event layout principle:

```text
Flavor
→ clearly separated “오늘 효과”
→ exact Function
```

Flavor must never ambiguously paraphrase a different mechanic.

Current targeted audit includes:
- 본사 반값 행사
- 암시장 / extra-offer attribution
- all current Event function lines
- 길드 납품 인증 and other difficult Store Support descriptions
- Deep Expedition one-line repeat explanation after tutorial
- 구급키트 compact function copy

For 구급키트, avoid redundant explanatory tail text if the function is already fully communicated by the first sentence.

---

# 11. P1 — HELP / EXPLANATION SURFACE

Use an **anchored popover**, not a Modal and not an expanding accordion that pushes gameplay content down.

Reuse the existing lightweight `?` explanation mechanism where possible.

Rules:
- the popover is anchored to the relevant information block
- main layout height does not change
- background is not locked
- no confirmation button
- one explanation at a time
- mobile: tap toggle
- desktop: hover / keyboard focus, click also valid
- outside tap and Escape close it
- beginning a mobile scroll should close it where practical
- place below or above the anchor according to available room
- explanation is normally 2 lines, 3 only when necessary

Examples:

### 전투 전망

```text
현재 능력과 게이트 전투 요구를 비교한 보급 전 전망입니다.
판매 후에도 이 전망은 갱신되지 않습니다.
```

### 환경 대응

```text
게이트 위험에 대한 현재 대응 수준입니다.
필요한 능력과 보급을 함께 반영합니다.
```

### 실패 시 사망 위험

```text
원정에 실패했을 때 사망까지 이어질 위험입니다.
원정 전체의 사망 확률은 아닙니다.
```

The explanation surface must not interrupt the core SALE interaction.

---

# 12. P1 — MEASUREMENT / BALANCE FINDINGS

One Run is valid evidence for comprehension and UX failures.
It is not enough by itself to settle frequency / economy / balance.

v2.8 measurement items:

- remaining-Gold / economy pressure
- Great Success occurrence and signal usefulness
- Store Support pick usefulness
- 운영 효율 매뉴얼 baseline value after the 260G / -30G candidate is adopted for measurement
- new Food hierarchy slot/value efficiency
- 간단 도시락 / 길드 특제 도시락 Wallet-gain value
- Gate / Family / Hazard appearance frequency
- fire-family perceived frequency vs actual frequency / difficulty

Current Fire-family frequency check:
- no special appearance weighting was found
- do not tune Fire occurrence frequency from the single playtest impression alone

Economy / Great Success tuning remains evidence-gated:
- measure multiple Runs / seeds before changing global economy pressure
- measure Great Success occurrence before tuning its probability curve

No frozen QA may auto-tune these.

---

# 13. RESOLVED v2.8 DESIGN DECISIONS

The previous unresolved list has been closed by User review.

Resolved in this plan:
- Hotbar direct-Fatigue idea rejected
- Food hierarchy / replacement identities defined
- U/R expedition Wallet-gain baselines defined
- Epic Water identity defined
- no relative Stat-change grading UI
- result-based Item causality chosen instead
- proof-only counterfactual attribution defined
- concise Hero Feedback grammar defined
- committed-purchase Great Success signal refresh approved
- Fatigue promoted to an active SALE NPC state
- hypothetical Fatigue branch table removed
- shared beneficial/harmful semantic color language approved
- source attribution moved to compact anchored popovers
- 운영 효율 매뉴얼 first numeric baseline defined
- NIGHT result hierarchy approved
- NIGHT living-NPC Flavor moved to temporary speech-bubble behavior
- mobile queue duplication removal approved
- compact Loyalty placement approved
- lightweight anchored Help popover behavior approved
- Boss five-Day information cadence approved

Remaining open work is implementation adoption, copy completion, QA, and evidence-gated balance measurement.
Do not treat those as permission to redesign the approved structure.

---

# 14. v2.8 EXIT CONDITION

v2.8 is ready to close when:

- current mobile/runtime correctness findings are fixed
- stale/internal copy is removed
- the Player can read choice → actual effect → result more clearly
- proven Item impact is surfaced without false causality
- Fatigue and Store Build effects are visible at meaningful moments
- Store Support / Stat changes share one compact semantic explanation language
- the Food hierarchy is adopted without recreating Potion overlap
- the Boss is re-established every five Days through the approved information cadence
- evidence-gated balance items have either been tuned with measured support or explicitly deferred
- no P2 expansion has been pulled forward merely because it is attractive

Structural expansion after this point belongs to v2.9+.
