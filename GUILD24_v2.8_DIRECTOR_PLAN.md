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
- help / question-mark explanatory surfaces can become excessively tall on mobile
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

## SALE

Keep the hidden final expedition probability hidden.

Do not add relative Stat-change percentages merely to grade Item choices.

The unresolved Player problem is:

> exact Item effects are visible, but the Player can still fail to feel how meaningful a Stat contribution is to the expedition.

v2.8 must solve this without turning SALE into answer-following.

## NIGHT

Rebuild information hierarchy around the resolved truth.

Priority:

```text
Outcome
→ proven effect of what the Player sold
→ Level / Stat change
→ Fatigue result
→ EXP / NPC Wallet / other changes
```

Do not praise an Item merely because it was carried.
Strong causal feedback requires a proven resolved contribution.

Living adventurer reaction may use dialogue.
Death uses narration / report treatment rather than speech.

---

# 4. P1 — FATIGUE READABILITY

Fatigue is an existing core axis and must become easier to notice when it matters.

Do not add a second fatigue-reduction subsystem merely for Item identity.
Existing excess Supply already reduces Fatigue through the canonical Supply/Fatigue flow.

Remove internal or unclear player-facing terms such as:

- 밤 피로
- 보급 회복
- 보급 완화
- 원정 결과 +N when the value is actually Fatigue gain

Player-facing presentation should make the sequence readable using current truth:

```text
current Fatigue
→ departure Fatigue after excess Supply
→ expedition Fatigue gain
→ final Fatigue
```

Exact compact mobile presentation remains a v2.8 design item.

---

# 5. P1 — STORE SUPPORT BUILD FEEDBACK

The playtest reported that Store Support effects can feel less influential than expected.

Do not immediately solve this by buffing all values.

First make existing effects attributable when they actually occur.

Examples of source-truth feedback channels:

- added Order offers
- reduced operating cost
- commission / HQ support paid
- visitor-count change
- reroll benefit
- guaranteed Counter role

The Player should be able to understand:

> this happened because my Store Build has this support.

Existing owned Store Supports must also be readable while choosing a new Store Support so the Player is not required to remember the current build from memory.

If a support remains weak after truthful attribution, report a BALANCE FINDING and tune separately.

---

# 6. P1 — BOSS PRESENCE / FIVE-DAY INFORMATION LOOP

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

# 7. P1 — MOBILE SALE DENSITY

On mobile only, remove duplicated queue information before adding new panels.

Review:

- whether the decorative next-customer card is needed
- whether queue count should live in only one compact location
- whether the top area can lose redundant queue information
- whether current-customer state / Loyalty / decision information can use the recovered space

Desktop may retain richer simultaneous information where space is available.

---

# 8. P1 — EVENT / ITEM / SUPPORT FUNCTION CLARITY

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

# 9. P1 — MEASUREMENT / BALANCE FINDINGS

One Run is valid evidence for comprehension and UX failures.
It is not enough by itself to settle frequency / economy / balance.

v2.8 measurement items:

- remaining-Gold / economy pressure
- Great Success occurrence and signal usefulness
- Store Support pick usefulness
- 운영 효율 매뉴얼 timing/value
- Item-role overlap, including 핫바 vs Potion
- Gate / Family / Hazard appearance frequency
- fire-family “appears often” perception vs actual frequency / difficulty

No frozen QA may auto-tune these.

---

# 10. CURRENT UNRESOLVED DESIGN ITEMS

The following are intentionally unresolved and require User/Director decision before implementation.

## U1 — 핫바 role

Confirmed:
- do not add a separate direct Fatigue-reduction mechanic
- excess Supply already performs Fatigue reduction
- Hotbar should remain aligned with Food
- Hotbar must not read as a cheaper Potion replacement
- Hotbar should not simply become a substitute for 삼각김밥 / 생수

Unresolved:
- exact existing-channel effect mix and numeric values

Prefer rebalancing existing channels before inventing a new Item mechanic.

## U2 — SALE “Stat contribution meaning” feedback

Confirmed:
- no relative Stat-change percentage solution
- no public hidden final success probability
- frozen forecast must not become a live answer grader merely because an Item is focused

Unresolved:
- exact UX treatment that lets the Player feel the importance of `투력 +N` / other Stat contributions

## U3 — Great Success signal timing

Current Source snapshots the signal at SALE entry together with the pre-supply outlook.

Observed issue:
- an Item can make preparation meaningfully stronger without the signal reflecting that choice

Unresolved:
- retain frozen signal
- remove the signal
- or allow a truthful post-commit signal without turning Item browsing into answer-following

## U4 — Fatigue compact decision surface

Confirmed:
- Fatigue must become more visible when relevant
- internal arithmetic language should be reduced
- do not add qualitative fatigue tiers

Unresolved:
- exact mobile compact layout / emphasis rule

## U5 — 운영 효율 매뉴얼

Observed:
- current fixed operating-cost reduction can have weak late acquisition value

Unresolved:
- numeric rebalance
- role repurpose using an existing Store Support channel
- or another minimal existing-system fix

Requires balance measurement before exact change.

## U6 — NIGHT result layout

Confirmed hierarchy is defined in this plan.

Unresolved:
- exact compact layout and spacing, especially on mobile

## U7 — Loyalty placement

Observed:
- Loyalty is not sufficiently available on active SALE/NIGHT decision surfaces

Unresolved:
- exact compact placement without increasing mobile vertical pressure

## U8 — economy / Great Success balance

Observed from one Run:
- Gold remained relatively comfortable
- Great Success occurred frequently

Status:
- evidence insufficient for tuning
- measure across multiple Runs / seeds before deciding whether there is a real balance issue

---

# 11. v2.8 EXIT CONDITION

v2.8 is ready to close when:

- current mobile/runtime correctness findings are fixed
- stale/internal copy is removed
- the Player can read choice → actual effect → result more clearly
- Fatigue and Store Build effects are visible at meaningful moments
- the Boss is re-established every five Days through the approved information cadence
- unresolved P1 balance items have either been approved and adopted or explicitly deferred
- no P2 expansion has been pulled forward merely because it is attractive

Structural expansion after this point belongs to v2.9+.
