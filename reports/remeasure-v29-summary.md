# v2.9.0 re-measure (I-2 rules + R1 re-tune) — BALANCE FINDING, measurement only

Seeds 400 × 4 policies. CURRENT = HEAD after R1 (I-2 rules with the Fatigue outcome gain re-tuned to +4 / +7 / +9, User 2026-09-24). BASELINE = 6cb62b4 (before I-2). Reported, not tuned (AGENTS.md §9).

Three-point reference for the two engaged policies (this file's previous version, commit a8f0e7a, measured the first v2.9.0 gain +5 / +8 / +10 on the same seeds):

| policy | metric | baseline (pre-I-2) | +5 / +8 / +10 | +4 / +7 / +9 (now) |
|---|---|---|---|---|
| balanced | clear | 0.075 | 0.030 | 0.063 |
| balanced | reach D30 | 0.130 | 0.072 | 0.120 |
| balanced | death\|fail | 0.552 | 0.625 | 0.593 |
| balanced | avg money | 1419 | 1058 | 1325 |
| skilled | clear | 0.100 | 0.043 | 0.085 |
| skilled | reach D30 | 0.170 | 0.150 | 0.210 |

## balanced:adaptive:hybrid

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 20 | 19 | -0.400 |
| reach D10 | 0.995 | 0.988 | -0.007 |
| reach D20 | 0.455 | 0.410 | -0.045 |
| reach D25 | 0.228 | 0.182 | -0.045 |
| reach D30 | 0.130 | 0.120 | -0.010 |
| clear | 0.075 | 0.063 | -0.012 |
| deaths/run | 8.748 | 9.002 | +0.255 |
| death|fail | 0.552 | 0.593 | +0.040 |
| great | 0.144 | 0.136 | -0.008 |
| avg money | 1419 | 1325 | -94 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 28% / 22% / 14% / 9% | 27% / 29% / 22% / 14% / 9% |
| D10-19 | 17% / 30% / 24% / 17% / 12% | 16% / 30% / 24% / 17% / 13% |
| D20-24 | 30% / 22% / 23% / 16% / 9% | 29% / 24% / 22% / 15% / 10% |
| D25-29 | 33% / 21% / 24% / 14% / 8% | 36% / 20% / 22% / 14% / 8% |

CURRENT departure Fatigue bands (share): 40 0.4% · 0-9 76.3% · 10-19 15.6% · 20-29 5.7% · 30-39 2.1%
Food/Drink in the Bag by current-Fatigue band: 40 54% (290) · 0-9 65% (23998) · 10-19 60% (6556) · 20-29 59% (2549) · 30-39 58% (825)
Supply use split: preRecovery 52% · outcome buffer 33% · waste 15%

## greedy:overcharge:premium

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 17 | 16 | -0.157 |
| reach D10 | 0.985 | 0.980 | -0.005 |
| reach D20 | 0.212 | 0.177 | -0.035 |
| reach D25 | 0.020 | 0.028 | +0.007 |
| reach D30 | 0.000 | 0.005 | +0.005 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 10 | 10 | +0.013 |
| death|fail | 0.998 | 0.990 | -0.008 |
| great | 0.069 | 0.063 | -0.005 |
| avg money | 2284 | 2182 | -102 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 13% / 32% / 25% / 17% / 13% | 12% / 33% / 25% / 17% / 13% |
| D10-19 | 5% / 31% / 27% / 20% / 17% | 3% / 31% / 27% / 21% / 18% |
| D20-24 | 7% / 27% / 28% / 20% / 17% | 6% / 28% / 29% / 19% / 18% |
| D25-29 | 5% / 30% / 32% / 12% / 22% | 6% / 21% / 34% / 24% / 14% |

CURRENT departure Fatigue bands (share): 40 1.7% · 0-9 63.3% · 10-19 20.0% · 20-29 10.4% · 30-39 4.7%
Food/Drink in the Bag by current-Fatigue band: 40 23% (592) · 0-9 32% (16887) · 10-19 28% (5656) · 20-29 24% (2972) · 30-39 25% (1261)
Supply use split: preRecovery 57% · outcome buffer 31% · waste 11%

## protective:half:vip

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 11 | 11 | -0.005 |
| reach D10 | 0.807 | 0.810 | +0.003 |
| reach D20 | 0.000 | 0.000 | +0.000 |
| reach D25 | 0.000 | 0.000 | +0.000 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 4.978 | 4.923 | -0.055 |
| death|fail | 0.030 | 0.018 | -0.012 |
| great | 0.118 | 0.121 | +0.003 |
| avg money | -62 | -64 | -1.617 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 29% / 22% / 13% / 9% | 26% / 29% / 22% / 14% / 9% |
| D10-19 | 10% / 30% / 26% / 18% / 17% | 8% / 31% / 25% / 19% / 16% |
| D20-24 | — | — |
| D25-29 | — | — |

CURRENT departure Fatigue bands (share): 40 0.1% · 0-9 83.8% · 10-19 11.9% · 20-29 3.5% · 30-39 0.7%
Food/Drink in the Bag by current-Fatigue band: 40 5% (21) · 0-9 59% (15626) · 10-19 36% (2834) · 20-29 23% (767) · 30-39 13% (151)
Supply use split: preRecovery 35% · outcome buffer 46% · waste 19%

## skilled:adaptive:expedition

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 22 | 23 | +0.378 |
| reach D10 | 1.000 | 1.000 | +0.000 |
| reach D20 | 0.650 | 0.670 | +0.020 |
| reach D25 | 0.355 | 0.412 | +0.057 |
| reach D30 | 0.170 | 0.210 | +0.040 |
| clear | 0.100 | 0.085 | -0.015 |
| deaths/run | 9.742 | 9.665 | -0.078 |
| death|fail | 0.805 | 0.762 | -0.043 |
| great | 0.140 | 0.139 | -0.001 |
| avg money | 2729 | 2856 | +127 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 26% / 29% / 22% / 14% / 9% | 26% / 29% / 21% / 14% / 9% |
| D10-19 | 18% / 30% / 24% / 17% / 11% | 18% / 31% / 23% / 17% / 11% |
| D20-24 | 28% / 25% / 22% / 15% / 9% | 27% / 26% / 23% / 15% / 9% |
| D25-29 | 32% / 22% / 23% / 15% / 9% | 33% / 22% / 24% / 13% / 8% |

CURRENT departure Fatigue bands (share): 40 0.2% · 0-9 78.4% · 10-19 14.5% · 20-29 5.0% · 30-39 1.9%
Food/Drink in the Bag by current-Fatigue band: 40 71% (309) · 0-9 70% (28475) · 10-19 67% (7433) · 20-29 67% (2742) · 30-39 67% (873)
Supply use split: preRecovery 51% · outcome buffer 33% · waste 16%

