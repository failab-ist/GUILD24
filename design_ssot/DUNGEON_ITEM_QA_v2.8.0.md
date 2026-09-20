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
