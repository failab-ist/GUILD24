# v2.9.0 re-measure (I-2 rules) — BALANCE FINDING, measurement only

Seeds 400 × 4 policies. CURRENT = HEAD after I-2 (Supply → Fatigue recovery only, five Fatigue bands 0~40, Hazard pressure 3/3/3, rest recovery, Fatigue-40 Death term, 구급키트 pure Insurance). BASELINE = 6cb62b4 (before I-2). Reported, not tuned (AGENTS.md §9).

## balanced:adaptive:hybrid

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 20 | 19 | -0.897 |
| reach D10 | 0.995 | 0.988 | -0.007 |
| reach D20 | 0.455 | 0.400 | -0.055 |
| reach D25 | 0.228 | 0.163 | -0.065 |
| reach D30 | 0.130 | 0.072 | -0.058 |
| clear | 0.075 | 0.030 | -0.045 |
| deaths/run | 8.748 | 9.053 | +0.305 |
| death|fail | 0.552 | 0.625 | +0.073 |
| great | 0.144 | 0.126 | -0.018 |
| avg money | 1419 | 1058 | -361 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 28% / 22% / 14% / 9% | 26% / 29% / 21% / 14% / 9% |
| D10-19 | 17% / 30% / 24% / 17% / 12% | 14% / 31% / 25% / 17% / 13% |
| D20-24 | 30% / 22% / 23% / 16% / 9% | 26% / 25% / 22% / 16% / 11% |
| D25-29 | 33% / 21% / 24% / 14% / 8% | 32% / 22% / 24% / 13% / 8% |

CURRENT departure Fatigue bands (share): 40 0.8% · 0-9 69.2% · 10-19 18.0% · 20-29 8.1% · 30-39 3.9%
Food/Drink in the Bag by current-Fatigue band: 40 59% (616) · 0-9 65% (20756) · 10-19 59% (7290) · 20-29 58% (3311) · 30-39 56% (1389)
Supply use split: preRecovery 57% · outcome buffer 32% · waste 11%

## greedy:overcharge:premium

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 17 | 16 | -0.580 |
| reach D10 | 0.985 | 0.980 | -0.005 |
| reach D20 | 0.212 | 0.133 | -0.080 |
| reach D25 | 0.020 | 0.013 | -0.007 |
| reach D30 | 0.000 | 0.003 | +0.003 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 10 | 10 | +0.040 |
| death|fail | 0.998 | 0.993 | -0.005 |
| great | 0.069 | 0.060 | -0.009 |
| avg money | 2284 | 1994 | -290 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 13% / 32% / 25% / 17% / 13% | 12% / 33% / 25% / 17% / 13% |
| D10-19 | 5% / 31% / 27% / 20% / 17% | 2% / 31% / 27% / 21% / 18% |
| D20-24 | 7% / 27% / 28% / 20% / 17% | 4% / 25% / 31% / 20% / 19% |
| D25-29 | 5% / 30% / 32% / 12% / 22% | 11% / 27% / 31% / 19% / 13% |

CURRENT departure Fatigue bands (share): 40 2.9% · 0-9 57.0% · 10-19 22.5% · 20-29 11.6% · 30-39 6.0%
Food/Drink in the Bag by current-Fatigue band: 40 22% (982) · 0-9 33% (14445) · 10-19 27% (6347) · 20-29 26% (3242) · 30-39 24% (1515)
Supply use split: preRecovery 58% · outcome buffer 32% · waste 10%

## protective:half:vip

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 11 | 11 | -0.002 |
| reach D10 | 0.807 | 0.813 | +0.005 |
| reach D20 | 0.000 | 0.000 | +0.000 |
| reach D25 | 0.000 | 0.000 | +0.000 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 4.978 | 5.070 | +0.093 |
| death|fail | 0.030 | 0.025 | -0.005 |
| great | 0.118 | 0.122 | +0.004 |
| avg money | -62 | -65 | -2.605 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 29% / 22% / 13% / 9% | 26% / 29% / 22% / 14% / 9% |
| D10-19 | 10% / 30% / 26% / 18% / 17% | 8% / 31% / 25% / 19% / 17% |
| D20-24 | — | — |
| D25-29 | — | — |

CURRENT departure Fatigue bands (share): 40 0.4% · 0-9 77.3% · 10-19 15.3% · 20-29 5.5% · 30-39 1.5%
Food/Drink in the Bag by current-Fatigue band: 40 10% (93) · 0-9 61% (14058) · 10-19 41% (3712) · 20-29 25% (1203) · 30-39 18% (319)
Supply use split: preRecovery 40% · outcome buffer 45% · waste 15%

## skilled:adaptive:expedition

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 22 | 22 | -0.592 |
| reach D10 | 1.000 | 0.998 | -0.002 |
| reach D20 | 0.650 | 0.630 | -0.020 |
| reach D25 | 0.355 | 0.292 | -0.063 |
| reach D30 | 0.170 | 0.150 | -0.020 |
| clear | 0.100 | 0.043 | -0.058 |
| deaths/run | 9.742 | 9.805 | +0.063 |
| death|fail | 0.805 | 0.823 | +0.017 |
| great | 0.140 | 0.128 | -0.012 |
| avg money | 2729 | 2358 | -371 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 26% / 29% / 22% / 14% / 9% | 26% / 29% / 21% / 14% / 9% |
| D10-19 | 18% / 30% / 24% / 17% / 11% | 16% / 31% / 24% / 17% / 12% |
| D20-24 | 28% / 25% / 22% / 15% / 9% | 24% / 27% / 23% / 15% / 11% |
| D25-29 | 32% / 22% / 23% / 15% / 9% | 27% / 23% / 25% / 16% / 10% |

CURRENT departure Fatigue bands (share): 40 0.6% · 0-9 71.5% · 10-19 17.4% · 20-29 7.2% · 30-39 3.3%
Food/Drink in the Bag by current-Fatigue band: 40 65% (657) · 0-9 71% (23976) · 10-19 67% (8345) · 20-29 67% (3629) · 30-39 64% (1392)
Supply use split: preRecovery 57% · outcome buffer 31% · waste 12%

