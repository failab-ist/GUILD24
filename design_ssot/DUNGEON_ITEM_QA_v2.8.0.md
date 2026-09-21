# DUNGEON / ITEM QA

DOC=DUNGEON_ITEM_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=DUNGEON_ITEM_QA_v2.7.0.md
PATCH_TYPE=V2_8_ITEM_AND_PROOF_QA

## INHERITANCE

All non-conflicting v2.7 Dungeon/Item QA remains active.

## DI-Q-v28-1 — ITEM BASELINE

Expect exactly:

| Item | Rarity | Buy/Sell | 강인함 | Supply | Extra |
|---|---|---:|---:|---:|---|
| 삼각김밥 | C | 35/70 | +6 | 5 | — |
| 생수 | C | 40/85 | +10 | 2 | — |
| 간단 도시락 | U | 85/180 | +10 | 6 | expedition Wallet +20% |
| 길드 특제 도시락 | R | 160/340 | +14 | 7 | expedition Wallet +40% |
| 영웅 결전 도시락 | E | 210/440 | +18 | 9 | — |
| 왕도 천연암반수 | E | 185/390 | +20 | 2 | — |

PASS:
- active catalog count remains 40
- active Rarity distribution is C11 / U12 / R5 / E11 / L1
- no unrelated Item Rarity is moved merely to restore the old C/U counts
- old Hotbar names are not active player Items
- meal shelf life 2, water shelf life 5
- no replacement creates direct Fatigue reduction

## DI-Q-v28-2 — WALLET GAIN SCOPE

PASS:
- U meal adds +0.20 to ordinary expedition loot modifier
- R meal adds +0.40
- modifiers add with existing ordinary loot modifiers
- Deep bonusWallet is not multiplied
- Store Support/Event/direct Wallet grants are not multiplied
- player copy says 원정 소지금 획득

## DI-Q-v28-3 — MEAL VS WATER IDENTITY

PASS direction:
- meal is materially higher-Supply
- water is materially more Stat-concentrated for its stage
- Water does not become a meal substitute through Supply
- Meal does not become a raw-Stat Potion substitute

This is a design-shape check, not permission to auto-tune numbers.

## DI-Q-v28-3B — CURRENT ITEM ART IDENTITY

PASS:
- `bar` reads visually as 간단 도시락 / meal-lunchbox
- `herobar` reads visually as 왕도 천연암반수 / bottled water
- neither retains the retired Hotbar/skewered-stick silhouette
- icon change does not alter ID, Category, Rarity, price, effect or save compatibility

## DI-Q-v28-4 — NO HYPOTHETICAL FATIGUE MATRIX

SALE must not display separate 성공/퇴각/부상 future Fatigue rows.

Exact Supply/Fatigue runtime arithmetic remains unchanged.

## DI-Q-v28-5 — COUNTERFACTUAL DOES NOT ALTER RESOLVE

For a proof-enabled result:
- actual expedition outcome/state equals ordinary resolve with proof disabled
- gameplay RNG state after the expedition is identical
- no extra Gold/XP/Loot/Loyalty/state mutation occurs from shadow evaluation

## DI-Q-v28-6 — UNPROVEN BRANCH

Construct a case where removing an Item would require a random branch not drawn by the actual
expedition.

PASS:
- comparison is UNPROVEN
- no replacement RNG is drawn
- no Hero Item claim is authored

## DI-Q-v28-7 — OVERLAP ATTRIBUTION

Cover:
- only A necessary -> A credited
- A and B independently necessary -> A+B credited
- only combination provable -> generic committed-preparation credit
- different proven severity -> strongest Hero line only

No category-priority shortcut is allowed.

## DI-Q-v28-8 — SPECIAL DUPLICATION

When 황금 1+1 actually changes a provable resolved result, it participates in attribution.
Its Special category does not exclude it from proof.


## DI-Q-v28-8B — HERO ATTRIBUTION BOUNDARY

PASS:
- Fatigue-only differences do not produce Hero Item feedback
- Wallet-only differences do not produce Hero Item feedback
- a hidden risk reduction without a proven resolved Outcome/state difference does not produce Hero feedback
- avoided-death WHAT_HAPPENED uses the non-causal outcome sentence
- a named Item WHY line appears only when sold-Item proof exists
- proof ordering never creates more than the strongest allowed Hero line

## DI-Q-v28-9 — REPLACEMENT FLAVOR

Expected:
- 간단 도시락 -> \`반찬은 단출하지만 빈칸은 없다.\`
- 왕도 천연암반수 -> \`왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.\`

FAIL:
- skewer/Hotbar Flavor survives on either replacement ID


## DI-Q-v28-10 — GREAT SUCCESS NUMERIC BASELINE

Expected:
    signal margin 0.26
    chance slope 0.80
    chance cap 0.30

PASS:
- small positive margin may produce Great Success even below the signal threshold
- signal threshold only controls presentation
- probability never exceeds 30%
- repeated Great Success by a well-grown NPC is not itself a failure

## DI-Q-v28-11 — DEEP OCCURRENCE / DIFFICULTY BASELINE

Expected:
- occurrence windows remain D7 / D14 / D21 / D28
- each Run has exactly 2 or 3 occurrences
- P(3 occurrences) = 50%
- P(2 occurrences) = 50%
- Deep required Combat Power = selected base Gate Power ×1.50
- no Deep Hazard inflation is added

## DI-Q-v28-12 — GATE COUNT / TIER DISTRIBUTION EXACT

Gate count PASS:
- D1–3 exactly 1
- D4–7 1/2 at 50% / 50%
- D8–18 exactly 2
- D19–29 2/3 at 50% / 50%
- D30 does not run ordinary Gate-count generation

Tier PASS:
- exact anchor rows equal DUNGEON_HAZARD_v2.8.0.md
- all in-between Days use linear interpolation between surrounding anchors
- D30 does not run ordinary Tier generation
- next-Day forecast reads the same function as generation

FAIL:
- a forecast-only probability table
- a different Save/Load forecast roll
- old approximate band percentages acting as exact truth

## DI-Q-v28-13 — FORECAST / HAZARD LABEL BOUNDARIES

Combat ratio:
- >1.20 -> 우세
- >=0.80 -> 접전
- otherwise -> 불리

Hazard readiness ratio:
- >=1.00 -> 충분
- >=0.75 -> 대응
- >=0.40 -> 불안
- otherwise -> 취약

PASS:
- Hazard Defense uses the exact Core-Stat coefficients in DUNGEON_HAZARD_v2.8.0.md
- displayed label and actual underlying preparation state read the same calculation
- exact hidden formula is not exposed merely because QA knows it

## DI-Q-v28-14 — ORDINARY RESOLVE / REWARD BASELINE

Controlled seeded cases must verify:
- Supply deficit = 6% per missing Supply, cap 30%
- environment incident chance uses the exact v2.8 closure formula and 2%–48% clamp
- escape chance uses the exact v2.8 closure formula and 15%–94% clamp
- failed-combat Severe branch uses 42% base before current modifiers
- environment/other Severe branch uses 13% base before current modifiers
- injured departure adds the existing +15%p Severe escalation exactly once
- failure-conditioned Death still follows the separate current Death owner formula exactly once

Reward PASS:
- EXP base = 22 + Day×4.6
- EXP outcome multipliers are Great 1.40 / Retreat 0.38 / combat-success 1.00 / other living 0.50
- Wallet base = 35 + Day×8
- Wallet outcome multipliers are Retreat 0.08 / combat-success 1.00 / other living 0.18
- explicit XP/Loot/Gate reward modifiers compose once
- living combat-success equipment chance starts at 20% plus explicit rare-loot modifier
- equipment gain on hit is seeded integer +2 through +5

FAIL:
- a second alternative ordinary-resolve formula survives
- QA retunes any value to improve pass rate
