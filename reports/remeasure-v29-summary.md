# v2.9.0 re-measure (I-2 rules + R1 re-tune + R4 어둠 -> 기동 + R5 integer coefficients) — BALANCE FINDING, measurement only

Seeds 400 × 4 policies. CURRENT = HEAD after R5 (I-2 rules, Fatigue outcome gain +4 / +7 / +9, 어둠 -> 기동 so no Gate shares a Stat, Hazard Defense coefficients 1/3 for 강인함 and 1/2 for 기동 / 정신; User 2026-09-24). R4 alone was not measured separately. BASELINE = 6cb62b4 (before I-2). Reported, not tuned (AGENTS.md §9).

Three-point reference for the two engaged policies (this file's previous version, commit a8f0e7a, measured the first v2.9.0 gain +5 / +8 / +10 on the same seeds):

| policy | metric | baseline (pre-I-2) | +5 / +8 / +10 | +4 / +7 / +9 (R1, commit 2579513) | + 어둠 -> 기동, coefficients 1/3 · 1/2 (R4 + R5, now) |
|---|---|---|---|---|---|
| balanced | clear | 0.075 | 0.030 | 0.063 | 0.077 |
| balanced | reach D30 | 0.130 | 0.072 | 0.120 | 0.122 |
| balanced | death\|fail | 0.552 | 0.625 | 0.593 | 0.532 |
| balanced | avg money | 1419 | 1058 | 1325 | 1358 |
| skilled | clear | 0.100 | 0.043 | 0.085 | 0.122 |
| skilled | reach D30 | 0.170 | 0.150 | 0.210 | 0.253 |

## balanced:adaptive:hybrid

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 20 | 20 | +0.060 |
| reach D10 | 0.995 | 0.993 | -0.002 |
| reach D20 | 0.455 | 0.440 | -0.015 |
| reach D25 | 0.228 | 0.220 | -0.008 |
| reach D30 | 0.130 | 0.122 | -0.008 |
| clear | 0.075 | 0.077 | +0.003 |
| deaths/run | 8.748 | 8.660 | -0.088 |
| death|fail | 0.552 | 0.532 | -0.020 |
| great | 0.144 | 0.138 | -0.006 |
| avg money | 1419 | 1358 | -61 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 28% / 22% / 14% / 9% | 27% / 29% / 21% / 14% / 8% |
| D10-19 | 17% / 30% / 24% / 17% / 12% | 16% / 31% / 24% / 17% / 12% |
| D20-24 | 30% / 22% / 23% / 16% / 9% | 28% / 25% / 23% / 15% / 9% |
| D25-29 | 33% / 21% / 24% / 14% / 8% | 35% / 21% / 22% / 14% / 8% |

CURRENT departure Fatigue bands (share): 40 0.4% · 0-9 75.3% · 10-19 16.0% · 20-29 6.0% · 30-39 2.3%
Food/Drink in the Bag by current-Fatigue band: 40 57% (354) · 0-9 64% (24327) · 10-19 59% (6822) · 20-29 58% (2771) · 30-39 56% (892)
Supply use split: preRecovery 52% · outcome buffer 33% · waste 15%

## greedy:overcharge:premium

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 17 | 17 | +0.325 |
| reach D10 | 0.985 | 0.990 | +0.005 |
| reach D20 | 0.212 | 0.203 | -0.010 |
| reach D25 | 0.020 | 0.048 | +0.028 |
| reach D30 | 0.000 | 0.007 | +0.007 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 10 | 10 | +0.005 |
| death|fail | 0.998 | 0.990 | -0.008 |
| great | 0.069 | 0.063 | -0.005 |
| avg money | 2284 | 2317 | +34 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 13% / 32% / 25% / 17% / 13% | 13% / 34% / 24% / 17% / 12% |
| D10-19 | 5% / 31% / 27% / 20% / 17% | 4% / 32% / 27% / 20% / 17% |
| D20-24 | 7% / 27% / 28% / 20% / 17% | 6% / 28% / 31% / 20% / 15% |
| D25-29 | 5% / 30% / 32% / 12% / 22% | 6% / 22% / 31% / 22% / 18% |

CURRENT departure Fatigue bands (share): 40 2.0% · 0-9 62.3% · 10-19 20.1% · 20-29 10.6% · 30-39 5.0%
Food/Drink in the Bag by current-Fatigue band: 40 20% (721) · 0-9 32% (17283) · 10-19 27% (5871) · 20-29 25% (3184) · 30-39 22% (1398)
Supply use split: preRecovery 58% · outcome buffer 31% · waste 11%

## protective:half:vip

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 11 | 11 | +0.048 |
| reach D10 | 0.807 | 0.835 | +0.027 |
| reach D20 | 0.000 | 0.000 | +0.000 |
| reach D25 | 0.000 | 0.000 | +0.000 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 4.978 | 4.640 | -0.338 |
| death|fail | 0.030 | 0.013 | -0.017 |
| great | 0.118 | 0.123 | +0.004 |
| avg money | -62 | -66 | -3.480 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 29% / 22% / 13% / 9% | 27% / 30% / 21% / 14% / 8% |
| D10-19 | 10% / 30% / 26% / 18% / 17% | 9% / 31% / 25% / 20% / 15% |
| D20-24 | — | — |
| D25-29 | — | — |

CURRENT departure Fatigue bands (share): 40 0.1% · 0-9 83.8% · 10-19 12.0% · 20-29 3.4% · 30-39 0.7%
Food/Drink in the Bag by current-Fatigue band: 40 9% (22) · 0-9 58% (15756) · 10-19 37% (2863) · 20-29 23% (743) · 30-39 14% (160)
Supply use split: preRecovery 34% · outcome buffer 47% · waste 19%

## skilled:adaptive:expedition

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 22 | 23 | +0.968 |
| reach D10 | 1.000 | 1.000 | +0.000 |
| reach D20 | 0.650 | 0.723 | +0.073 |
| reach D25 | 0.355 | 0.445 | +0.090 |
| reach D30 | 0.170 | 0.253 | +0.082 |
| clear | 0.100 | 0.122 | +0.022 |
| deaths/run | 9.742 | 9.495 | -0.248 |
| death|fail | 0.805 | 0.708 | -0.098 |
| great | 0.140 | 0.137 | -0.003 |
| avg money | 2729 | 2868 | +139 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 26% / 29% / 22% / 14% / 9% | 27% / 30% / 21% / 14% / 8% |
| D10-19 | 18% / 30% / 24% / 17% / 11% | 18% / 32% / 23% / 17% / 11% |
| D20-24 | 28% / 25% / 22% / 15% / 9% | 28% / 27% / 22% / 14% / 9% |
| D25-29 | 32% / 22% / 23% / 15% / 9% | 33% / 23% / 23% / 14% / 8% |

CURRENT departure Fatigue bands (share): 40 0.3% · 0-9 77.8% · 10-19 14.8% · 20-29 5.3% · 30-39 1.9%
Food/Drink in the Bag by current-Fatigue band: 40 66% (311) · 0-9 70% (28899) · 10-19 67% (7831) · 20-29 66% (2951) · 30-39 64% (928)
Supply use split: preRecovery 52% · outcome buffer 33% · waste 16%

