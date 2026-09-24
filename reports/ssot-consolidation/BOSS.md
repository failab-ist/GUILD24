# BOSS consolidation ledger

BASELINE=9e9c9d1
TARGET=design_ssot/BOSS_v2.8.0.md
CHAIN=design_ssot/BOSS_v2.8.0.md,design_ssot/history/BOSS_v2.7.0.md,design_ssot/history/BOSS_v2.5.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/BOSS_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.

Placement: v2.5 section order is the skeleton. The v2.8 information cadence (FIVE-DAY LOOP, SAME-DAY
ORDERING, D0 BOUNDARY) sits before the single REVEAL ORDER section (D5 / D15 / D20-D25 / D30, with the
v2.7 D25 Family/Hazard timing inline), followed by v2.8 PERSISTENCE and PRESENTATION PAYOFF. Each v2.7
Boss section is merged into its v2.5 Boss section (PRIDE / GREED / GLUTTONY / SLOTH, WRATH balance
intent); v2.8 GLUTTONY ITEM-STAT SCOPE heads the one GLUTTONY section; v2.8 SLOTH TERMINOLOGY is a
SLOTH subsection; v2.8 META CLEAR SIGNAL list joins META CLEAR SIGNAL. QA is one list: v2.5 Q01-Q15
(minus Q09 / Q14) then v2.7 Q70-Q74, then BALANCE QA.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

The v2.7 BOSS-Q14 bullet carries a live rule; its reworded form is under REWORD below.

```text
## INHERITANCE
All unchanged v2.7 Boss selection, numeric modifiers, Final modifier order, SLOTH opportunity
count/power and D25 persisted Final state inherit BOSS_v2.7.0.md.
No Boss numeric balance changes are introduced here.
Boss pool/identity, seeded one-Boss-per-Run generation, save stability, D5 Identity reveal, D15 exact Trait reveal, ENVY targeting, LUST regular protection, meta-clear signal, and all unchanged Boss rules inherit `BOSS_v2.5.0.md`.
This patch changes Final-information timing and the PRIDE/GREED/GLUTTONY/SLOTH v2.7 balance rules, preserves the already-approved player-facing `탐식` terminology, and aligns GREED snapshot timing/accounting with the current fixed-price Final preparation flow.
Inherited base QA applies only where it does not conflict with this patch.
In particular:
- inherited `BOSS-Q03` D30-first Family disclosure is superseded by D25 disclosure / D30 reuse
- inherited `BOSS-Q09` Rare+ / raw-Stat GLUTTONY expectation is superseded by the v2.7 all-Item-positive-Core-Stat ×0.50 scope
- inherited numeric examples for PRIDE / GREED / SLOTH are superseded by the v2.7 values below
Use the inherited current owner values/rules rather than duplicating a second table here.
Use the inherited Boss/Final modifier order, with v2.7 Item/Fresh/Final values from their owners.
The inherited Boss acceptance suite remains valid except where replaced here.
```

## LEGACY — version headings / change narration (sections merged into their topic)

```text
## PRESENTATION PAYOFF — v2.8
Boss-information truth and reveal cadence remain unchanged.
## META CLEAR SIGNAL CLEANUP
## SLOTH TERMINOLOGY
## BOSS IDENTITY TERMINOLOGY OVERRIDE
The inherited v2.5 player-facing `폭식 / 폭식의 마왕 글러트니` wording is superseded and is not v2.7 Design Truth.
This terminology override does not change the GLUTTONY mechanic.
The inherited D15 Rare+-based GLUTTONY player prose is also stale.
## WRATH — BASELINE RETAINED
## FINAL FAMILY REVEAL TIMING — v2.7 OVERRIDE
The v2.5 D30 Family-generation/reveal wording is superseded.
v2.7:
## PRIDE — v2.7
This supersedes 0.90.
## GREED — v2.7
Change only the maximum Boss-strengthening cap:
## GLUTTONY — v2.7 EFFECT SCOPE
The prior `Rare+ Item raw Stat ×0.80` rule is superseded.
## ENVY / LUST
No v2.7 numeric change.
## SLOTH — OPPORTUNITY SCHEDULE
## SLOTH — v2.7 BOSS POWER
## v2.7 ACCEPTANCE OVERRIDES
```

## LEGACY — restatements of rules kept verbatim elsewhere in the target

GLUTTONY identity (탐식 / 탐식의 마왕 글러트니, internal ID GLUTTONY) is carried by the reworded roster row.
WRATH 200 is carried by the reworded v2.5 WRATH line. D5 / D15 reveal is in the FIVE-DAY LOOP and REVEAL
ORDER. PRIDE scope bullets restate the kept v2.5 PRIDE rules. SLOTH schedule restates the kept v2.5
Opportunity schedule; the D30 Seal line restates kept D30 step 1. v2.5 GLUTTONY unaffected bullets
restate the kept v2.7 Unaffected list (the two v2.5 bullets not in it are kept under it). v2.7 Final
formula / Meta signal lines restate the kept v2.5 FINAL MODIFIER ORDER / META CLEAR SIGNAL pointers.

```text
Internal Boss ID remains:
GLUTTONY
Player-facing identity is:
Sin = 탐식
Name = 탐식의 마왕 글러트니
Keep the existing baseline:
WRATH effective Boss Power = 200
Boss reveal remains:
- D5 Boss Identity
- D15 exact Boss Trait
SLOTH D30 Seal opportunity remains part of the D30 Relic window.
Scope otherwise inherits the existing PRIDE rule:
- Final-only participant Snapshot
- 투력 only
- visible original -> applied
Schedule remains inherited:
exactly 2 distinct opportunities from D15/D20/D25
+ D30 always
= 3 total opportunities
Unaffected scope remains 100%:
- Hazard Counter effect
- Supply effect
- Insurance behavior
- Utility behavior
Final formula -> `FINAL_EXPEDITION_v2.7.0.md`.
Boss CLEAR continues to emit the existing authoritative clear signal used by Meta.
reveal:
- D5=Boss Identity
- D15=exact Boss Trait
```

`- persistent NPC Stat unchanged` (v2.7 PRIDE scope bullet) is identical to a kept BOSS-Q06 line, so it
needs no entry.

## SUPERSEDED — D30 Family reveal, replaced by D25 reveal / D30 reuse (v2.7 timing, v2.8 cadence)

v2.8 adds D20 / D25 information beats, so "No new general Boss reveal" on D20/D25 is false. D30 steps 3-6
are kept, renumbered (see REWORD).

```text
- D30=Final Family Pair
No new general Boss reveal.
1. reveal the two random Final Families
2. show each Family's authoritative T2 Hazard information
```

## SUPERSEDED — GLUTTONY player-facing name 폭식 -> 탐식 (v2.7 terminology override)

```text
| GLUTTONY | 폭식 | 폭식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
```

## SUPERSEDED — PRIDE 0.90 -> 0.92, GREED cap 15 -> 12 (v2.7)

```text
`prideCombatFactor=0.90` (v2.5 final)
- shortfallCap=15 (v2.5 final)
```

## SUPERSEDED — GLUTTONY Rare+ ×0.80 -> all positive Item Core-Stat ×0.50, no Rarity threshold (v2.7 / v2.8)

The "high-end" identity, scope, heading and design question are false once no Rarity threshold remains.
BOSS-Q09 is replaced by BOSS-Q73.

```text
- GLUTTONY = 고급 보급품의 능력치 숫자에만 의존했는가?
## GLUTTONY — HIGH-END SUPPLY RAW-STAT PRESSURE
identity=reduces the value of solving Final only by stacking high-end raw Stat supplies
Internal affected scope:
- high-end Item raw Stat contribution used by Final participants
High-end boundary and reduction factor:
- affectedRarityThreshold=2 (v2.5 final)
- gluttonyStatFactor=0.80 (v2.5 final)
### BOSS-Q09 — GLUTTONY EFFECT SPLIT
- only eligible high-end 보급품 raw Stat contribution changes
- actual Stat change is visible
- Counter/Supply/Insurance/Utility/special effects remain unchanged
- no extra consumption occurs
```

## SUPERSEDED — SLOTH power 220/190/175/160 -> 225/210/190/165 (v2.7)

v2.7 1 break = 210, "still above WRATH", so the v2.5 ordering block is false at 1 break; the ordering is
stated by the kept exact table and Design intent.

```text
3 breaks = weakest SLOTH
2 breaks = weak SLOTH
1 break  = slightly below WRATH baseline
0 breaks = strongest SLOTH / hardest-side Boss
Effective Boss Power for [0,1,2,3] breaks=[220,190,175,160] (v2.5 final).
```

## SUPERSEDED — PASS3 tuning permission (v2.7: DIRECTOR DOCUMENT BASELINE values are fixed)

```text
Exact numeric values marked PASS3 are tuning values, not permission to redesign the mechanic.
### BOSS-Q14 — NUMERIC PASS3
Tuning may alter only values marked PASS3 without changing each Boss's mechanic identity.
```

## SUPERSEDED — Franchise Achievement use of the clear signal (META_v2.8.0 RETIRED v2.7 FRANCHISE SYSTEM)

The v2.7 Meta use list is replaced by the kept v2.8 `Boss CLEAR continues to feed:` list.

```text
`META_v2.7.0.md` may use this same signal for:
- Job×Boss matrix progression / Job Mastery
- distinct Boss clear progression
- Franchise Achievement conditions that explicitly require Boss CLEAR
No second Boss-clear definition is created for the achievement system.
```

## REWORD — version tag removed from current values

```text
WRATH effective Boss Power=200 (v2.5 final). It is the unmodified baseline every other Boss is measured against.
`envyStatFactor=0.92` (v2.5 final)
- greedRevenueTarget=18800 (v2.5 final)
`lustStatFactor=0.95` (v2.5 final)
```

```new
WRATH effective Boss Power=200. It is the unmodified baseline every other Boss is measured against.
`envyStatFactor=0.92`
- greedRevenueTarget=18800
`lustStatFactor=0.95`
```

## REWORD — GLUTTONY roster row uses the current player-facing name (v2.7 override)

```text
| GLUTTONY | 폭식 | 폭식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
```

```new
| GLUTTONY | 탐식 | 탐식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
```

## REWORD — BOSS-Q14 supersession bullet: version framing removed, live rule kept

```text
- inherited `BOSS-Q14` PASS3 tuning permission is superseded: v2.7 `DIRECTOR DOCUMENT BASELINE` values are fixed implementation starting values during adoption; frozen QA may report a `BALANCE FINDING` but may not auto-tune them. Any numeric change requires a separate approved owner-spec update.
```

```new
`DIRECTOR DOCUMENT BASELINE` values are fixed implementation starting values during adoption; frozen QA may report a `BALANCE FINDING` but may not auto-tune them. Any numeric change requires a separate approved owner-spec update.
```

## REWORD — BOSS-Q03 dead D30 clause trimmed (D5 / D15 order checks stay live; D25 timing is BOSS-Q70)

```text
D5 Identity precedes D5 Relic reveal; D15 exact Trait precedes D15 Relic reveal; D30 Family disclosure precedes D30 Relic/Sloth decision.
```

```new
D5 Identity precedes D5 Relic reveal; D15 exact Trait precedes D15 Relic reveal.
```

## REWORD — D30 steps renumbered after the superseded steps 1-2 were dropped

```text
3. if SLOTH, expose the mandatory D30 Seal opportunity with the D30 Relic window
4. resolve D30 Relic / Seal choice
5. complete Final-relevant preparation
6. Final lock
```

```new
1. if SLOTH, expose the mandatory D30 Seal opportunity with the D30 Relic window
2. resolve D30 Relic / Seal choice
3. complete Final-relevant preparation
4. Final lock
```

## REWORD — GREED Final transfer line: dead clauses about removed price choice / refusal RNG trimmed

```text
The current Final owner fixes those preparation transfers to 50% / 매입가, removes 100/150 price choice, and removes refusal RNG.
```

```new
The current Final owner fixes those preparation transfers to 50% / 매입가.
```

## REWORD — section headings without version tags

`## v2.7 BALANCE QA` -> `## BALANCE QA`; `## PRESENTATION PAYOFF — v2.8` -> `## PRESENTATION PAYOFF`
(original in LEGACY above); v2.8 `## SLOTH TERMINOLOGY` becomes a SLOTH subsection.

```text
## v2.7 BALANCE QA
```

```new
## BALANCE QA
## PRESENTATION PAYOFF
### Terminology
```

## REWORD — cross-owner pointers name the current owner file

Exact Player-facing Copy routes to `COPY_AUDIT_APPROVED_v2.8.0.md` per SPEC_INDEX_v2.8.0
(`EXACT PLAYER-FACING COPY -> COPY_AUDIT_APPROVED_v2.8.0.md`); the exact GLUTTONY Trait prose is there.

```text
Final resolution ownership -> FINAL_EXPEDITION
Presentation -> UI_UX
Exact Player-facing Copy -> COPY_WORLD_VOICE
- exact Final Family Pair + Hazard Pool is generated/revealed/persisted on D25 by `FINAL_EXPEDITION_v2.7.0.md`
Use the actual T2 Hazard set owned by DUNGEON_HAZARD.
Family generation / Final Hazard Pool ownership -> FINAL_EXPEDITION
Relic-window ownership -> RELIC
Meta progression remains owned by `META_v2.7.0.md`.
Metric ownership -> ECONOMY_ORDER / SALE / NIGHT_CLOSING
Exact Wallet/Gold/fixed-price preparation truth -> `ECONOMY_ORDER_v2.7.0.md` / `FINAL_EXPEDITION_v2.7.0.md`.
Item effect ownership -> ITEM
Exact v2.7 Trait title/prose is owned by `COPY_WORLD_VOICE_v2.7.0.md`.
Protection reads the existing NPC `Trusted Regular / 단골` state owned by NPC_TRAIT.
Relic-window lifecycle -> `RELIC_v2.7.0.md`.
Exact UI ownership -> RELIC / UI_UX.
Final formula / roll / party / clear ownership -> FINAL_EXPEDITION.
Cross-run Job Mastery / distinct-Boss unlock processing is owned by META.
```

```new
Final resolution ownership -> FINAL_EXPEDITION_v2.8.0.md
Presentation -> UI_UX_v2.8.0.md
Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md
- exact Final Family Pair + Hazard Pool is generated/revealed/persisted on D25 by `FINAL_EXPEDITION_v2.8.0.md`
Use the actual T2 Hazard set owned by `DUNGEON_HAZARD_v2.8.0.md`.
Family generation / Final Hazard Pool ownership -> FINAL_EXPEDITION_v2.8.0.md
Relic-window ownership -> RELIC_v2.8.0.md
Meta progression remains owned by `META_v2.8.0.md`.
Metric ownership -> `ECONOMY_ORDER_v2.8.0.md` / `SALE_v2.8.0.md` / `NIGHT_CLOSING_v2.8.0.md`
Exact Wallet/Gold/fixed-price preparation truth -> `ECONOMY_ORDER_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md`.
Item effect ownership -> `ITEM_v2.8.0.md`
Exact Trait title/prose is owned by `COPY_AUDIT_APPROVED_v2.8.0.md`.
Protection reads the existing NPC `Trusted Regular / 단골` state owned by `NPC_TRAIT_v2.8.0.md`.
Relic-window lifecycle -> `RELIC_v2.8.0.md`.
Exact UI ownership -> `RELIC_v2.8.0.md` / `UI_UX_v2.8.0.md`.
Final formula / roll / party / clear ownership -> `FINAL_EXPEDITION_v2.8.0.md`.
Cross-run Job Mastery / distinct-Boss unlock processing is owned by `META_v2.8.0.md`.
```

## REWORD — RELATED: v2.5 and v2.7 lists merged, current owner files

`Exact Player-facing Copy -> COPY_AUDIT_APPROVED_v2.8.0.md` (declared above) is added per SPEC_INDEX routing.

```text
Final state/formula/Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Relic/Seal window -> `RELIC_v2.7.0.md`
Meta -> `META_v2.7.0.md`
Item/GLUTTONY contribution -> `ITEM_v2.7.0.md`
Economy/Wallet/Gold -> `ECONOMY_ORDER_v2.7.0.md`
UI reveal -> `UI_UX_v2.7.0.md`
Copy/terminology -> `COPY_WORLD_VOICE_v2.7.0.md`
final formula/family/party/clear -> FINAL_EXPEDITION
relic/sloth opportunity -> RELIC
meta/mastery/unlock -> META
job/loyalty/trusted-regular -> NPC_TRAIT
item effect -> ITEM
economy revenue -> ECONOMY_ORDER
sale revenue commit -> SALE
closing revenue report -> NIGHT_CLOSING
presentation -> UI_UX
copy -> COPY_WORLD_VOICE
```

```new
Final state / formula / family / party / clear / Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Relic / Seal window / Sloth opportunity -> `RELIC_v2.8.0.md`
Meta / mastery / unlock -> `META_v2.8.0.md`
Job / loyalty / trusted-regular -> `NPC_TRAIT_v2.8.0.md`
Item effect / GLUTTONY contribution -> `ITEM_v2.8.0.md`
Economy / Wallet / Gold / revenue -> `ECONOMY_ORDER_v2.8.0.md`
Sale revenue commit -> `SALE_v2.8.0.md`
Closing revenue report -> `NIGHT_CLOSING_v2.8.0.md`
Presentation / UI reveal -> `UI_UX_v2.8.0.md`
Copy / terminology -> `COPY_WORLD_VOICE_v2.8.0.md`
```

## UNRESOLVED — kept verbatim, reported to the User

- GREED `shortfallSlope` has no value in any chain version or current owner, and the formula
  `max(0, greedRevenueTarget - Cumulative Gross Sales)` is an absolute amount while the Exact line says
  "shortfall is measured as a SHARE of the target". Both lines are kept as written.

## AMENDMENT — User decision 2026-09-23: GREED penalty is a share of the target (matches Source)

User: a revenue target; the penalty scales with the unmet share of it; the curve follows the
implemented Source. Source `effectiveBossPower` (dist/systems/run.js): ratio = max(0, (target -
revenue) / target), bonus = min(cap, ratio × cap). This removes the unvalued `shortfallSlope` and
reconciles the absolute formula with the SHARE line (both flagged UNRESOLVED above).

```text
shortfall
max(0, greedRevenueTarget - Cumulative Gross Sales)
min(shortfall × shortfallSlope, shortfallCap)
```

```new
shortfallRatio
max(0, greedRevenueTarget - Cumulative Gross Sales) / greedRevenueTarget
min(shortfallCap, shortfallRatio × shortfallCap)
- the penalty is linear in the unmet share: no sales -> the full cap; target met -> 0
```

## AMENDMENT — User decision 2026-09-23: GLUTTONY design question and identity

The consolidation reported that GLUTTONY had no design question / identity line after the
rarity-bound v2.5 ones were dropped. The User supplied both.

```new
- GLUTTONY = 모험가 자체를 성장시키기보다 보급품의 능력치 증가에 의존했는가?
identity=tests whether Final strength comes from grown NPCs rather than Item-sourced Core-Stat boosts
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): Supply is Fatigue recovery only. GLUTTONY's untouched-effect lists and BOSS-Q73 name Fatigue recovery instead of Supply; the shared Final calculation order names the Food/Drink Fatigue-recovery effect instead of a Supply effect. Numbers and scope are unchanged.

```text
Not reduced by GLUTTONY:
- 보급
- Supply
- Hazard Counter / Supply / Insurance / Utility / harmful RiskReward penalty are unchanged
2. locked Item / Supply / equipment effects
```

```new
Not reduced by GLUTTONY (User 2026-09-24, v2.9.0):
- 피로 회복
- Fatigue recovery (Food/Drink Supply)
2. locked Item / Food·Drink Fatigue recovery / equipment effects
- Hazard Counter / Fatigue recovery / Insurance / Utility / harmful RiskReward penalty are unchanged
```
