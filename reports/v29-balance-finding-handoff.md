# v2.9.0 BALANCE FINDING — handoff for the balance session (2026-09-25)

Status: BALANCE FINDING, measurement only. Nothing was tuned (AGENTS.md §9). HEAD at hand-off: 117f27d on `claude/ux-simplify-handoff-7oorbc`.
Numbers: `reports/remeasure-v29-summary.md` (400 seeds × 4 policies, multi-point table) and the scratch attribution below (150 seeds, balanced policy, same harness `Debug.simulate`).

## What changed that touches balance (User decisions 2026-09-24/25)

| batch | change | before → now |
|---|---|---|
| F3-1 | natural Fatigue recovery | Severe-Injury rest day -5 → none, every NPC |
| F3-2 | 중상 result Fatigue | 0 → +9 (same as 부상) |
| F3-3 | repeated-strain Death cut | none → +8%p per repeat of injured / Fatigue-20+ departure from the 2nd, cap +30%p, cap of the chance rises too |
| F3-4 | 구급키트 | persistent state only → lowers the Outcome (중상 → 부상; 부상 → no lasting injury) |
| F4-1 | operating cost dayBase | 90+2×(Day−1) → 90+5×(Day−1) (D10 108→135, D20 128→185, D30 148→235 before level/rarity factors) |
| F4-2 | expedition Wallet multiplier | 성공 1.0 / 퇴각 .08 / 부상·중상 .18 → .90 / .35 / .20 / .10 |
| F4-3 | shelf life | gear/insurance none, drinks 5, potions 7 → every Item 2~5 days |
| F4-4 | Food Fatigue recovery | 삼각김밥 5→4, 컵라면 5→2, 간단 도시락 6→5, 초코바 4→3, 집중 사탕 3→2, 불룡볶음면 4→2 (강인함 8→5), 길드 특제 7→6 |
| F7 | accessible-mode base need | .80 → .72 (관련 준비 floor .97 now also covers the pressed Stat) |

## Where it fell (balanced:adaptive:hybrid, 150 seeds unless noted)

| point | reach D20 | reach D30 | clear | avg money | ended by deaths / bankrupt |
|---|---|---|---|---|---|
| pre-F3 (5e69533) | 0.420 | 0.073 | 0.040 | 1466 | 90 / 49 |
| F3 only (63ea4d2, route line patched) | 0.193 | 0.007 | 0.007 | 765 | 120 / 29 |
| F3 + F4 (4a8dac6) | 0.073 | 0.000 | 0.000 | 273 | 78 / 72 |
| F3 + F4 + F7 (2d32d63, 400 seeds) | 0.125 | 0.007 | 0.007 | 407 | 226 / 171 |

Single reverts on the F3+F4 build (in-memory toggles, 150 seeds):

| reverted | reach D20 | avg money | deaths / bankrupt |
|---|---|---|---|
| nothing | 0.073 | 273 | 78 / 72 |
| operating cost → 90+2× | 0.113 | 558 | 113 / 36 |
| Food recovery values → old | 0.120 | 361 | 74 / 75 |
| strain cut off | 0.093 | 247 | 45 / 104 |
| shelf lives → old | 0.087 | 352 | 92 / 57 |
| Wallet multipliers → old | 0.073 | 135 | 68 / 82 |
| 세계수 → 600/1200 | 0.073 | 294 | 78 / 72 |
| operating cost + Wallet → old | 0.093 | 372 | 110 / 40 |

Departure Fatigue bands (400 seeds, balanced): 0-9 75.3% → 61.5%, 10-19 16.0% → 21.5%, 20-29 6.0% → 11.5%, 30-39 2.3% → 4.7%. Supply use: preRecovery 52% → 63%, waste 15% → 4%.

## Mechanism

1. Fatigue only accumulates: recovery is Food/Drink only, a customer buys 0~2 Items, one failure adds +9 (부상 and now 중상) while one Food recovers 2~5. Departures at 20+ (기동·정신 -40%) doubled, so failures rise and add more Fatigue.
2. The strain cut turns that loop into deaths (conditional death|fail 0.60 → 0.80; the Death limit ends the Run).
3. Removing the strain cut moves the ending from deaths to bankruptcies: weary NPCs keep failing with empty Wallets while operating cost climbs +3G/day more than before.
4. Within F4 the Food recovery cut is the largest single factor, operating cost second. Wallet multipliers are not a cause (the old 퇴각 .08 was harsher). Shelf life and 세계수 are minor.
5. Harness caveat: the simulation AI does not sell Food against Fatigue on purpose; the pre-F3 point used the same AI, so the comparison holds in direction and size.

## Decisions to take (each combination re-measured on request, ~5 min per 400-seed run)

1. Natural Fatigue recovery: keep none / restore the Severe-Injury rest-day -5 / a new daily -2 or -3 for every NPC (contradicts the 2026-09-25 decision, needs explicit approval). Largest lever.
2. 중상 result Fatigue: +9 / 0 / +5.
3. Strain cut: keep +8%p cap 30 / soften +5%p cap 15 / injured repeats only / remove. Alone it shifts deaths to bankruptcies.
4. Operating cost: 90+5× / 90+3× / 90+2×. Alone: D20 0.073 → 0.113.
5. Food recovery values: keep / restore / middle (컵라면 3, 불룡 3, rest as now). Alone: D20 0.073 → 0.120. Paired with decision 1.
6. Shelf life: keep / gear+insurance 7 days / gear+insurance no expiry. Minor alone.
7. Wallet multipliers: keep (reverting measures worse).
8. Base need .72: keep / .80.

Reference packages: A = 1 restore rest-day + 5 restore; B = A + 4 at 90+3× + 3 softened; C = 1 restore + 2 at 0 + 3 removed + 4 restored + 5 restored, F4 rest kept. Baseline to aim at: pre-F3 D20 0.42 / D30 0.073 / clear 0.040.

## Not measured / not done

- 7-b (removal of the remaining-Supply outcome buffer): undecided by the User; its measurement is dominated by the collapse above.
- Decoration acquisition report (`reports/deco-balance`): not regenerated after the Store Capital rate halving; capital is near zero under this state.
- Scratch attribution scripts lived in the session scratchpad; the numbers above are the record.
