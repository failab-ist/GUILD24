# GUILD24 v2.7 — Core Play, Feel & Product Legitimacy Vision v5

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **CURRENT v2.7 DIRECTOR VISION AMENDMENT / RELEASE INTENT / SCOPE CONTEXT**  
> Runtime semantic version target when adopted: **v2.7.0**  
> Current Design SSOT entry: `design_ssot/SPEC_INDEX_v2.7.0.md`  
> Base Vision: `GUILD24_v2.7_VISION_DETAILED_UPDATED_v4.md`  
> Source status: **v2.7 NOT YET ADOPTED**  
> Source gate: **v2.6.1 Adoption Recovery close first**
>
> This v5 document inherits all unchanged Vision intent from v4 and records only the newest User-approved direction discussed after v4.
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
| 1 | 누적 판매 N회 | 기본 영업 |
| 2 | 150% 판매 누적 N회 성공 | 가격 판단 |
| 3 | 재방문 NPC에게 누적 N회 판매 성공 | 단골 / 장기 관계 |
| 4 | 유물 누적 30개 구매 | 점포 성장 |
| 5 | 5개 Dungeon Family 모두에서 보급 생환 달성 | 던전 대응 경험 |
| 6 | 한 Run에서 만료 폐기 0개로 Final 도달 | 발주 / 재고 관리 |
| 7 | 한 Run에서 사망자 0명으로 Final 도달 | 원정 운영 |
| 8 | Final 출전 NPC 전원에게 실제 보급을 완료한 뒤 Boss CLEAR | Final 준비 |
| 9 | 한 Run에서 목표 총매출 달성 + Boss CLEAR | 종합 경영 |
| 10 | 6 Job × 7 Boss = Job×Boss Matrix 42 / 42 CLEAR | 완전 정복 |

Achievement 1 / 2 / 3 / 9 now use current `DIRECTOR DOCUMENT BASELINE` thresholds owned only by `META_v2.7.0.md`.
They are no longer design-unresolved.

Those numeric thresholds are intentionally first-adoption tuning values:

```text
initial implementation uses the META baseline exactly
-> full-run QA measures pacing / grind / completion clustering
-> BALANCE FINDING if evidence contradicts intent
-> Director/User approves any threshold revision
-> owner Spec update + separate fix cycle
```

Frozen QA / WORK must not auto-tune them in-place merely to improve the result.

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

# 4. FINAL PREPARATION — KEEP THE TWO-SLOT CHOICE, REMOVE MEANINGLESS FINAL HAGGLING

Final remains the culmination of the existing shop-preparation loop rather than becoming a separate combat game.

Player-facing order remains conceptually:

```text
출전 NPC 선택
→ Final 준비 / Item 지급
→ Final Lock
→ Boss 결과
```

The selected Final participants still use the familiar two Bag slots and real inventory.

However, ordinary SALE price negotiation is not meaningful at the end of the Run.
The newest approved Final preparation direction is therefore:

```text
Final Item price = 50% price mode / 매입가 기준 고정
100% / 150% price choice is not used in Final preparation
no purchase-refusal roll in Final preparation
```

For a selected Item:

```text
if NPC Wallet can cover the fixed 50% Final price:
  Item can be handed to that NPC
  stock is consumed
  NPC Wallet is reduced by that fixed amount

if NPC Wallet cannot cover it:
  that Item cannot be given through the Final preparation transaction
```

Intent:

- keep Wallet meaningful
- keep inventory allocation meaningful
- keep the two-slot preparation decision meaningful
- remove the strange fiction of a Boss-bound NPC refusing a needed Item because of purchase RNG
- remove a price-choice layer whose economic consequence has little remaining Run value after Final

This is still not free equipment.
The player must have the stock and the NPC must have enough Wallet for the fixed Final cost.

The exact accounting relationship between this fixed Final transfer and Player Gold / GREED gross-sales snapshot remains owned by the routed Final/Boss/Economy specs; this Vision does not invent that still-unresolved accounting semantic.

---

# 5. RELATION TO THE v4 FINAL VISION

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

> **Final reuses the inventory / Wallet / two-slot preparation structure, but not ordinary end-of-Run haggling or refusal RNG.**

---

# 6. META / FINAL VALIDATION INTENT

The next full-run validation should additionally prove:

1. Franchise Grade can progress before full Boss mastery without becoming intentional-failure farming.
2. The 10 achievements feel like distinct recognitions of core play, not achievement chores.
3. One exceptional Run does not automatically complete most of the Franchise track.
4. The current Franchise numeric baselines do not feel materially trivial or grindy; if they do, QA reports a balance finding rather than silently retuning them.
5. `전설의 편의점` reads as a genuine long-term completion badge because 42/42 is unavoidable.
6. Final preparation still contains meaningful scarcity through Wallet + stock + two slots even without refusal RNG.
7. Fixed 50% Final pricing removes pointless haggling without turning Final preparation into free equipping.

---

# 7. IMPLEMENTATION / DOCUMENT BOUNDARY

The approved Franchise Achievement direction and numeric baselines are synchronized into `META_v2.7.0.md`.
The QA pacing/tuning contract is synchronized into current QA / Index rules.

The remaining v2.7 implementation-blocking design questions are tracked by `SPEC_INDEX_v2.7.0.md` and must not be guessed by WORK.

Do not modify Source for these v2.7 decisions until the v2.6.1 Adoption Recovery close gate is explicitly cleared.

---

# 8. CURRENT DIRECTOR INTENT ADDENDUM

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
→ lock the prepared party
→ resolve the Boss once
```

The game should reward broader experience without adding a generic grind currency, and the final Boss preparation should preserve the core item-allocation decision without pretending that ordinary retail haggling still matters after Day 30.
