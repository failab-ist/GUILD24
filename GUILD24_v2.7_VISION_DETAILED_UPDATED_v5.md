# GUILD24 v2.7 — Core Play, Feel & Product Legitimacy Vision v5

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **CURRENT v2.7 DIRECTOR VISION AMENDMENT / RELEASE INTENT / SCOPE CONTEXT**  
> Runtime semantic version target when adopted: **v2.7.0**  
> Current Design SSOT entry: `design_ssot/SPEC_INDEX_v2.7.0.md`  
> Base Vision: `GUILD24_v2.7_VISION_DETAILED_UPDATED_v4.md`  
> Source status: **v2.7 NOT YET ADOPTED**  
> Source gate: **v2.6.1 Adoption Recovery close first**  
> Current external public release target: **v3.0.0**
>
> This v5 document inherits all unchanged Vision intent from v4 and records the newest User-approved direction discussed after v4.
> Exact Rule / Numeric / UX / QA truth still belongs to the current routed Owner Specs and QA under `SPEC_INDEX_v2.7.0.md`.

---

# 0. AUTHORITY / INHERITANCE

Authority remains:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. Older chat / proposal / history

For Vision context:

```text
v5 explicit amendment
> v4 unchanged Vision sections
```

This Vision is not a second detailed Design SSOT.
Owner Specs remain the routed implementation truth after they are synchronized with approved decisions.

No v2.7 Source change is authorized before the existing v2.6.1 Adoption Recovery gate closes.

Current release context:

```text
v2.x = internal development / test line
v3.0.0 = current target for first external public release
```

Therefore current v2.7 prefers clean current-state implementation over compatibility shims for older internal test saves.

---

# 1. META DIRECTION — FRANCHISE GRADE IS SEPARATED FROM JOB MASTERY

The previous shape where Franchise Grade effectively followed Total Job Mastery is no longer the intended player-facing progression direction.

The two systems now have different jobs:

```text
Job Mastery
= Job × Boss CLEAR progression
= successful conquest / job-specific permanent growth

Franchise Grade
= dedicated franchise-achievement completion count
= broader store-operation / expedition / long-term play progression
= Start Contract availability progression
```

Purpose:

- a player who has not yet cleared every Boss can still make visible account progression
- repeated intentional failure must not be the efficient progression answer
- Franchise Grade must not become a generic permanent combat-stat currency
- Job Mastery remains meaningful because CLEAR still owns job-specific mastery growth

No new generic fail currency is added.
No account-wide hidden combat multiplier is added.

---

# 2. FRANCHISE ACHIEVEMENT STRUCTURE — EXACT HIGH-LEVEL SHAPE

Use exactly **10 dedicated Franchise Achievements**.

Each completed achievement counts as exactly one completion toward Franchise Grade.

Franchise Grade advances every two completed achievements:

```text
0 / 10 = base grade
2 / 10 = next grade
4 / 10 = next grade
6 / 10 = next grade
8 / 10 = next grade
10 / 10 = final grade: 전설의 편의점
```

The system should avoid creating achievements merely to inflate count.
Do not create chains of lower/upper versions of the same task solely to feed Franchise Grade.

The ten approved achievement directions are:

| # | Franchise Achievement | Represents |
|---:|---|---|
| 1 | 누적 판매 100회 | 기본 영업 |
| 2 | 150% 판매 누적 20회 성공 | 가격 판단 |
| 3 | 재방문 NPC에게 누적 30회 판매 성공 | 단골 / 장기 관계 |
| 4 | 유물 누적 30개 구매 | 점포 성장 |
| 5 | 5개 Dungeon Family 모두에서 보급 생환 달성 | 던전 대응 경험 |
| 6 | 한 Run에서 만료 폐기 0개로 Final 도달 | 발주 / 재고 관리 |
| 7 | 한 Run에서 사망자 0명으로 Final 도달 | 원정 운영 |
| 8 | Final 출전 NPC 전원에게 실제 보급을 완료한 뒤 Boss CLEAR | Final 준비 |
| 9 | 한 Run에서 Gross Sales 10,000G 이상 달성 + Boss CLEAR | 종합 경영 |
| 10 | 6 Job × 7 Boss = Job×Boss Matrix 42 / 42 CLEAR | 완전 정복 |

Achievement 1 / 2 / 3 / 9 values are current `DIRECTOR DOCUMENT BASELINE` thresholds owned only by `META_v2.7.0.md`.
They are implementation starting values and may be changed only after frozen/full-run QA produces a `BALANCE FINDING`, followed by User/Director approval and an owner-Spec tuning cycle.

Achievement 10 is intentionally the hardest long-term condition.
Because all 10 achievements are required for 10/10, `전설의 편의점` necessarily includes complete 42/42 Job×Boss conquest.

This final grade is primarily a completion / honor destination rather than a reason to add another post-completion combat-power layer.

---

# 3. ACHIEVEMENT DESIGN FILTER

Franchise Achievements should recognize normal core play rather than ask the player to perform invisible or artificial optimization patterns.

Use this filter:

```text
normal visible game action / meaningful run result
> achievement-specific hidden pattern
```

Avoid:

- requiring a Relic synergy taxonomy that is not visibly represented as a player system
- duplicate lower/upper versions of the same accomplishment
- trivial milestone spam that allows one good Run to auto-complete most of the track
- requirements whose only purpose is to make an achievement exist

Cumulative achievements are allowed where the counted action is a real active core action, such as selling or buying Relics.
Not every Franchise Achievement needs to be cumulative.

---

# 4. PRE-RELEASE SAVE / COMPATIBILITY DIRECTION

Current v2.x versions are internal testing builds.
The public release target is v3.0.0.

Therefore v2.7 does not preserve old v1~v7 internal-test Run or Account/Meta progression through migration shims.

Current direction:

```text
legacy v1~v7 internal save
-> do not migrate Run
-> do not migrate Account/Meta
-> create fresh current v8 state
```

Purpose:
- avoid carrying stale semantic assumptions into the new Franchise / Item / Final / Save design
- keep pre-release implementation smaller and easier to validate
- reserve external compatibility commitments for the v3.0.0 release boundary rather than internal test builds

---

# 5. FINAL PREPARATION — KEEP CURRENT STRUCTURE, REMOVE MEANINGLESS FINAL HAGGLING

Final remains the culmination of the existing shop-preparation loop rather than becoming a separate combat game.

Player-facing order remains conceptually:

```text
출전 NPC 선택
→ current Final preparation / Item assignment
→ Final Lock
→ Boss 결과
```

Do not add a separate ordinary-customer `FINAL SALE` phase.
Reuse the current Final preparation / participant-assignment structure.

The selected Final participants still use the familiar two Bag slots and real inventory.

Final preparation cost rule:

```text
Final Item price = 50% price mode / 매입가 기준 고정
100% / 150% price choice is not used
no purchase-refusal roll
```

For a selected Item:

```text
if NPC Wallet can cover the fixed 50% Final price:
  Item can be handed to that NPC
  stock is consumed
  NPC Wallet is reduced by that fixed amount
  Player Gold increases by that fixed amount
  Gross Sales increases by that fixed amount exactly once

if NPC Wallet cannot cover it:
  that Item cannot be committed
```

Intent:

- keep Wallet meaningful
- keep inventory allocation meaningful
- keep the two-slot preparation decision meaningful
- remove the strange fiction of a Boss-bound NPC refusing a needed Item because of purchase RNG
- remove a price-choice layer whose economic consequence has little remaining Run value after Final
- preserve ordinary transaction accounting without recreating a separate normal SALE phase

GREED uses the resulting Gross Sales total at Final Lock after Final preparation.
Final transfers are included exactly once.

This is still not free equipment.
The player must have the stock and the NPC must have enough Wallet for the fixed Final cost.

---

# 6. TUTORIAL MUST SURVIVE REAL FRESH-START TESTING

Current internal testing has observed a practical problem: resetting/fresh-initializing does not reliably make the tutorial appear.

v2.7 must treat that as an implementation/QA item rather than assuming the tutorial works because tutorial content exists in Source.

Required direction:

```text
true fresh current account
-> tutorial completion/dismissal state cleared
-> tutorial eligible
-> tutorial actually starts on first applicable flow
```

Fresh includes:
- Full Data Reset followed by current-state initialization
- clean first-install-equivalent state
- legacy v1~v7 internal save rejected and replaced by fresh v8

Ordinary Run Abandon / new Run under the same current account does not need to replay a tutorial already completed.

Before implementation is considered complete, Current Source must be audited to prove:
- tutorial trigger still exists and is reachable
- tutorial sequence can progress end-to-end
- tutorial completion persists normally
- Full Data Reset / fresh v8 clears the suppression state needed to make a genuine fresh account see it again

If the current tutorial exists but its trigger/reset persistence is broken, reuse and repair it rather than adding a second tutorial framework.

---

# 7. RELATION TO THE v4 FINAL VISION

The v4 statement that ordinary Final SALE keeps normal price selection and refusal behavior is superseded by this v5 amendment.

What remains unchanged from v4:

- Final is not a QTE or separate battle minigame
- Final participants are chosen before preparation
- Final preparation uses real owned stock
- two Bag slots remain the constraint
- Final-only no-effect Item handling remains necessary
- Final ends in one committed Boss resolution
- D25-known Final information remains preparation context

The new principle is:

> **Final reuses the current inventory / Wallet / two-slot preparation structure, but not an extra ordinary-customer Final SALE phase, end-of-Run haggling, or refusal RNG.**

---

# 8. META / FINAL / TUTORIAL VALIDATION INTENT

The next full-run validation should additionally prove:

1. Franchise Grade can progress before full Boss mastery without becoming intentional-failure farming.
2. The 10 achievements feel like distinct recognitions of core play, not achievement chores.
3. One exceptional Run does not automatically complete most of the Franchise track.
4. The current Franchise numeric baselines do not feel materially trivial or grindy; if they do, QA reports a balance finding rather than silently retuning them.
5. `전설의 편의점` reads as a genuine long-term completion badge because 42/42 is unavoidable.
6. Final preparation still contains meaningful scarcity through Wallet + stock + two slots even without refusal RNG.
7. Every committed Final transfer updates NPC Wallet, Player Gold, Gross Sales, and GREED accounting exactly once.
8. A true fresh/reset current account actually sees the tutorial.
9. The existing tutorial can run end-to-end without runtime/phase failure.
10. Ordinary SALE shows Combat / Hazard / `실패 시 사망 위험` only as a pre-supply baseline and does not grade committed Item choices by refreshing those derived answers.
11. `실패 시 사망 위험` responds materially to both combat preparation and Hazard preparation, while healthy/injured conditional caps remain bounded, an already-injured NPC remains visibly riskier, and `성공 / 대성공` never receives a separate Death roll.
12. Full-run QA confirms there is no dominant fixed cutoff where most NPCs below one pre-supply outlook state are rationally discarded regardless of Item choice.

---

# 9. IMPLEMENTATION / DOCUMENT BOUNDARY

Current Owner Specs / QA own the approved details:

- Franchise Grade / Job Mastery / achievements / pre-release Meta compatibility -> `META_v2.7.0.md`
- Save/fresh-init/tutorial reset boundary -> `CORE_RUN_v2.7.0.md`
- Final fixed-price preparation / Wallet / stock / Gold / Gross Sales -> `FINAL_EXPEDITION_v2.7.0.md` / `ECONOMY_ORDER_v2.7.0.md`
- GREED snapshot/accounting consequence -> `BOSS_v2.7.0.md`
- ordinary failure-conditioned Death-risk model -> `DUNGEON_HAZARD_v2.7.0.md`
- injured re-expedition Death/Severe modifier -> `NPC_TRAIT_v2.7.0.md`
- SALE pre-supply outlook / post-commit information boundary -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
- exact pre-supply outlook copy -> `COPY_WORLD_VOICE_v2.7.0.md`
- tutorial and Final presentation -> `UI_UX_v2.7.0.md`
- validation -> current routed QA

There are no current implementation-blocking Design Unresolved items.

The v2.6.1 Adoption Recovery close gate has been explicitly cleared by the User. v2.7 Source adoption now proceeds only from the current Canonical owner files and the Director-approved implementation handoff.

---

# 10. CURRENT DIRECTOR INTENT ADDENDUM

Cross-run progression should now read as two complementary tracks:

```text
play broadly and operate the store well
→ Franchise Achievements
→ Franchise Grade
→ broader Start Contract access

clear Bosses with each Job
→ Job Mastery
→ job-specific mastery progression
```

The Final should read as:

```text
choose who goes
→ choose what scarce stock each NPC receives
→ pay the fixed Final preparation cost from that NPC's Wallet
→ receive the same amount into Player Gold / Gross Sales
→ lock the prepared party
→ resolve the Boss once
```

The game should reward broader experience without adding a generic grind currency, the final Boss preparation should preserve the core item-allocation decision without pretending ordinary retail haggling still matters after Day 30, and true fresh/reset testing must never silently skip the tutorial.

---

# 11. PRE-SUPPLY OUTLOOK / FAILURE-DEATH-RISK DIRECTION

This section supersedes earlier Vision wording that kept Death inside the old failed-combat / failed-escape chain or treated Death Risk as an unconditional expedition-level probability.

Ordinary SALE should tell the Player enough to decide **whether this NPC is worth supporting**, without turning each Item transaction into an answer-checking tool.

The ordinary decision surface therefore uses one pre-supply expedition outlook captured before any new Item is committed for that customer:

```text
qualitative Combat Forecast
+ qualitative Hazard Readiness
+ exact 실패 시 사망 위험 %
```

Combat and Hazard success probabilities remain hidden.

`실패 시 사망 위험` is intentionally exact because Death is the most severe random consequence and should not feel like an unexplained hidden punishment.
Its meaning is conditional:

```text
if this expedition fails to end as 성공 / 대성공,
how likely is that failure to escalate to 사망?
```

It is not the unconditional probability that the NPC dies on this expedition.

After the Player commits an Item:

```text
show what actually changed and why
!=
re-score the Player's choice
```

Therefore the displayed Combat Forecast, Hazard Readiness, and `실패 시 사망 위험` remain the original **pre-supply** snapshot for the rest of that customer visit.
Post-commit UI may still show exact direct Item effects and proven source-attributed changes such as Stat, Counter, Supply, Supply-deficit relief, or Fatigue recovery.
The actual expedition nevertheless resolves from the final prepared state after all committed Items.

Death now follows this outcome principle:

```text
final preparation
-> ordinary expedition resolves toward success or failure
-> 성공 / 대성공: no Death roll
-> failure path: exactly one Death roll
-> if survived: existing 퇴각 / 부상 / 중상 resolution continues
```

The one failure Death risk is driven by:

```text
combat preparation deficit
+ environment / Hazard preparation deficit
+ departure Injury state
```

The purpose is to make Death feel like a possible escalation of a failed expedition, not a separate fatal lottery layered on top of an otherwise successful run.
It also removes the old multiple-gate feeling of `combat failure -> failed escape -> Death branch` while preserving one severe consequence check when an expedition genuinely goes wrong.

Current Director baseline keeps bounded conditional ceilings:
- healthy failure-Death cap = 30%
- already-injured failure-Death cap = 40%
- fully covered healthy preparation may reach 0% `실패 시 사망 위험`

Exact coefficients and calculation order belong only to `DUNGEON_HAZARD_v2.7.0.md`.
They are `DIRECTOR DOCUMENT BASELINE` values pending full-run validation.

Player-facing presentation remains:

> **보급 전 원정 전망**  
> **실패 시 사망 위험 N%**  
> 아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.  
> 보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.

This direction reinforces the v2.7 UI principle:

```text
산수는 대신할 수 있다.
판단은 대신하지 않는다.
```

