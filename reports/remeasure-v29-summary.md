# v2.9.0 re-measure (I-2 rules + R1 re-tune + R4/R5 + F3 kit / no rest recovery / strain cut + F4 recovery values / shelf life / operating cost / Wallet multipliers) — BALANCE FINDING, measurement only

Seeds 400 × 4 policies. CURRENT = HEAD after F4 (on top of R5: F3 = 구급키트 lowers the Outcome, no natural Fatigue recovery, 중상 fatigue +9, repeated-strain Death cut +8%p/repeat cap +30%p; F4 = Food recovery 4/2/5/3/2/2/6/9, every Item expires 2~5 days, operating cost 90+5×(Day−1), Wallet multipliers 0.90/0.35/0.20/0.10, 세계수 400/800; User 2026-09-24/25). The buffer-removal decision (7-b) waits on this measurement. BASELINE = 6cb62b4 (before I-2). Reported, not tuned (AGENTS.md §9).

Multi-point reference for the two engaged policies (earlier columns are this file's previous versions on the same seeds):

| policy | metric | baseline (pre-I-2) | +5 / +8 / +10 | +4 / +7 / +9 (R1, commit 2579513) | R4 + R5 (commit bed5a73) | + F3 + F4 (now) |
|---|---|---|---|---|---|---|
| balanced | clear | 0.075 | 0.030 | 0.063 | 0.077 | 0.003 |
| balanced | reach D30 | 0.130 | 0.072 | 0.120 | 0.122 | 0.003 |
| balanced | death\|fail | 0.552 | 0.625 | 0.593 | 0.532 | 0.510 |
| balanced | avg money | 1419 | 1058 | 1325 | 1358 | 236 |
| skilled | clear | 0.100 | 0.043 | 0.085 | 0.122 | 0.020 |
| skilled | reach D30 | 0.170 | 0.150 | 0.210 | 0.253 | 0.020 |

## balanced:adaptive:hybrid

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 20 | 15 | -5.322 |
| reach D10 | 0.995 | 0.973 | -0.022 |
| reach D20 | 0.455 | 0.070 | -0.385 |
| reach D25 | 0.228 | 0.005 | -0.223 |
| reach D30 | 0.130 | 0.003 | -0.128 |
| clear | 0.075 | 0.003 | -0.072 |
| deaths/run | 8.748 | 8.575 | -0.173 |
| death|fail | 0.552 | 0.510 | -0.042 |
| great | 0.144 | 0.120 | -0.024 |
| avg money | 1419 | 236 | -1183 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 28% / 22% / 14% / 9% | 26% / 29% / 21% / 14% / 10% |
| D10-19 | 17% / 30% / 24% / 17% / 12% | 13% / 27% / 24% / 16% / 20% |
| D20-24 | 30% / 22% / 23% / 16% / 9% | 30% / 20% / 20% / 11% / 18% |
| D25-29 | 33% / 21% / 24% / 14% / 8% | 41% / 15% / 30% / 7% / 7% |

CURRENT departure Fatigue bands (share): 40 0.8% · 0-9 61.5% · 10-19 21.5% · 20-29 11.5% · 30-39 4.7%
Food/Drink in the Bag by current-Fatigue band: 40 46% (379) · 0-9 68% (14429) · 10-19 57% (6020) · 20-29 51% (3364) · 30-39 50% (1363)
Supply use split: preRecovery 63% · outcome buffer 33% · waste 4%

## greedy:overcharge:premium

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 17 | 13 | -3.268 |
| reach D10 | 0.985 | 0.988 | +0.003 |
| reach D20 | 0.212 | 0.005 | -0.207 |
| reach D25 | 0.020 | 0.000 | -0.020 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 10 | 10 | +0.030 |
| death|fail | 0.998 | 0.963 | -0.035 |
| great | 0.069 | 0.062 | -0.007 |
| avg money | 2284 | 1118 | -1166 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 13% / 32% / 25% / 17% / 13% | 12% / 33% / 25% / 16% / 14% |
| D10-19 | 5% / 31% / 27% / 20% / 17% | 2% / 29% / 24% / 17% / 29% |
| D20-24 | 7% / 27% / 28% / 20% / 17% | 0% / 23% / 23% / 31% / 23% |
| D25-29 | 5% / 30% / 32% / 12% / 22% | — |

CURRENT departure Fatigue bands (share): 40 2.4% · 0-9 50.2% · 10-19 22.2% · 20-29 15.7% · 30-39 9.5%
Food/Drink in the Bag by current-Fatigue band: 40 32% (799) · 0-9 37% (10884) · 10-19 30% (4900) · 20-29 30% (3574) · 30-39 28% (2027)
Supply use split: preRecovery 66% · outcome buffer 31% · waste 3%

## protective:half:vip

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 11 | 9.527 | -1.387 |
| reach D10 | 0.807 | 0.468 | -0.340 |
| reach D20 | 0.000 | 0.000 | +0.000 |
| reach D25 | 0.000 | 0.000 | +0.000 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 4.978 | 4.490 | -0.487 |
| death|fail | 0.030 | 0.010 | -0.020 |
| great | 0.118 | 0.112 | -0.007 |
| avg money | -62 | -73 | -11 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 29% / 22% / 13% / 9% | 27% / 29% / 21% / 13% / 10% |
| D10-19 | 10% / 30% / 26% / 18% / 17% | 8% / 30% / 25% / 18% / 20% |
| D20-24 | — | — |
| D25-29 | — | — |

CURRENT departure Fatigue bands (share): 40 0.1% · 0-9 77.4% · 10-19 16.5% · 20-29 5.0% · 30-39 1.0%
Food/Drink in the Bag by current-Fatigue band: 40 7% (15) · 0-9 66% (12513) · 10-19 40% (3301) · 20-29 25% (975) · 30-39 15% (175)
Supply use split: preRecovery 47% · outcome buffer 47% · waste 6%

## skilled:adaptive:expedition

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 22 | 18 | -4.775 |
| reach D10 | 1.000 | 0.998 | -0.002 |
| reach D20 | 0.650 | 0.253 | -0.398 |
| reach D25 | 0.355 | 0.052 | -0.302 |
| reach D30 | 0.170 | 0.020 | -0.150 |
| clear | 0.100 | 0.020 | -0.080 |
| deaths/run | 9.742 | 10 | +0.283 |
| death|fail | 0.805 | 0.910 | +0.105 |
| great | 0.140 | 0.126 | -0.014 |
| avg money | 2729 | 1152 | -1577 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 26% / 29% / 22% / 14% / 9% | 27% / 30% / 21% / 13% / 9% |
| D10-19 | 18% / 30% / 24% / 17% / 11% | 16% / 29% / 23% / 15% / 18% |
| D20-24 | 28% / 25% / 22% / 15% / 9% | 28% / 21% / 22% / 12% / 16% |
| D25-29 | 32% / 22% / 23% / 15% / 9% | 45% / 18% / 16% / 12% / 9% |

CURRENT departure Fatigue bands (share): 40 0.7% · 0-9 62.1% · 10-19 21.0% · 20-29 11.3% · 30-39 4.9%
Food/Drink in the Bag by current-Fatigue band: 40 63% (538) · 0-9 74% (16860) · 10-19 69% (7200) · 20-29 67% (4138) · 30-39 67% (1759)
Supply use split: preRecovery 67% · outcome buffer 28% · waste 4%

