# BOSS consolidation ledger

BASELINE=9e9c9d1
TARGET=design_ssot/BOSS_v2.8.0.md
CHAIN=design_ssot/BOSS_v2.8.0.md,design_ssot/history/BOSS_v2.7.0.md,design_ssot/history/BOSS_v2.5.0.md

Placement: v2.5 sections in their order; each v2.7 section directly after the v2.5 section it amends
(terminology override after the roster table; FINAL FAMILY REVEAL TIMING after REVEAL ORDER, followed
by the v2.8 cadence / ordering / D0 / presentation / persistence sections; v2.7 GLUTTONY before the
surviving v2.5 GLUTTONY lines, then v2.8 GLUTTONY ITEM-STAT SCOPE; v2.8 SLOTH TERMINOLOGY after SLOTH;
v2.8 META CLEAR SIGNAL CLEANUP after META CLEAR SIGNAL); the kept v2.7 BOSS-Q14 supersession bullet
at the end of v2.7 BALANCE QA; identical headings (FINAL MODIFIER ORDER, META CLEAR SIGNAL, RELATED)
merged and their lists joined.

## Inheritance pointers / patch scaffolding — the base is now inline (v2.8, v2.7 INHERITANCE)

v2.8 "No Boss numeric balance changes are introduced here." describes the v2.8 patch only; in the
merged file "here" would also cover the v2.7 numeric changes. The v2.7 BOSS-Q03 / BOSS-Q09 / numeric
bullets point at base text that is dropped below; the BOSS-Q14 bullet carries a live rule and is kept.
```text
## INHERITANCE
All unchanged v2.7 Boss selection, numeric modifiers, Final modifier order, SLOTH opportunity
count/power and D25 persisted Final state inherit BOSS_v2.7.0.md.
No Boss numeric balance changes are introduced here.
```

```text
## INHERITANCE
Boss pool/identity, seeded one-Boss-per-Run generation, save stability, D5 Identity reveal, D15 exact Trait reveal, ENVY targeting, LUST regular protection, meta-clear signal, and all unchanged Boss rules inherit `BOSS_v2.5.0.md`.
This patch changes Final-information timing and the PRIDE/GREED/GLUTTONY/SLOTH v2.7 balance rules, preserves the already-approved player-facing `탐식` terminology, and aligns GREED snapshot timing/accounting with the current fixed-price Final preparation flow.
Inherited base QA applies only where it does not conflict with this patch.
In particular:
- inherited `BOSS-Q09` Rare+ / raw-Stat GLUTTONY expectation is superseded by the v2.7 all-Item-positive-Core-Stat ×0.50 scope
- inherited numeric examples for PRIDE / GREED / SLOTH are superseded by the v2.7 values below
```

## Superseded by v2.7 FINAL FAMILY REVEAL TIMING — v2.7 OVERRIDE / v2.8 FIVE-DAY INFORMATION LOOP (D30 Family reveal)

Family Pair + Hazard state is revealed on D25; D30 reuses it and has no new reveal. v2.8 adds D20/D25
information beats, so "No new general Boss reveal" on D20/D25 is false. BOSS-Q03 is kept in QA with the v2.7
bullet that supersedes only its D30 clause (its D5 / D15 order checks stay live; independent review).

```text
- D30=Final Family Pair
No new general Boss reveal.
1. reveal the two random Final Families
2. show each Family's authoritative T2 Hazard information
```

## Superseded by v2.7 BOSS IDENTITY TERMINOLOGY OVERRIDE (폭식 -> 탐식)

```text
| GLUTTONY | 폭식 | 폭식의 마왕 글러트니 | D5/D15 BASE | D30 BATTLE |
```

## Superseded by v2.7 PRIDE — v2.7 (0.90 -> 0.92)

```text
`prideCombatFactor=0.90` (v2.5 final)
```

## Superseded by v2.7 GREED — v2.7 (cap 15 -> 12)

```text
- shortfallCap=15 (v2.5 final)
```

## Superseded by v2.7 GLUTTONY — v2.7 EFFECT SCOPE / v2.8 GLUTTONY ITEM-STAT SCOPE (Rare+ ×0.80 -> all Items ×0.50, no Rarity threshold)

"High-end" / rarity-bound identity, scope, heading and design question are false once no Rarity
threshold remains. BOSS-Q09 is superseded per v2.7 INHERITANCE (replaced by BOSS-Q73).

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
PASS:
- only eligible high-end 보급품 raw Stat contribution changes
- actual Stat change is visible
- Counter/Supply/Insurance/Utility/special effects remain unchanged
- no extra consumption occurs
```

## Superseded by v2.7 SLOTH — v2.7 BOSS POWER (220/190/175/160 -> 225/210/190/165)

v2.7 1 break = 210, "still above WRATH", so the v2.5 "slightly below WRATH" ordering line is false.

```text
1 break  = slightly below WRATH baseline
Effective Boss Power for [0,1,2,3] breaks=[220,190,175,160] (v2.5 final).
```

## Superseded by v2.7 INHERITANCE BOSS-Q14 bullet (PASS3 tuning permission retired)

v2.7 DIRECTOR DOCUMENT BASELINE values are fixed; frozen QA may not auto-tune them.

```text
Exact numeric values marked PASS3 are tuning values, not permission to redesign the mechanic.
### BOSS-Q14 — NUMERIC PASS3
Tuning may alter only values marked PASS3 without changing each Boss's mechanic identity.
```

## Retired by v2.8 META CLEAR SIGNAL CLEANUP (Franchise system retired, META_v2.8.0 RETIRED v2.7 FRANCHISE SYSTEM)

```text
- Franchise Achievement conditions that explicitly require Boss CLEAR
No second Boss-clear definition is created for the achievement system.
```

## Inheritance pointer — ENVY / LUST values are inline (v2.5 ENVY, LUST)

```text
Use the inherited current owner values/rules rather than duplicating a second table here.
```
