# v2.9.0 re-measure (I-2 rules + R1 re-tune + R4/R5 + F3 kit / no rest recovery / strain cut + F4 recovery values / shelf life / operating cost / Wallet multipliers + F7 Counter judgement / base need 0.72) — BALANCE FINDING, measurement only

Seeds 400 × 4 policies. CURRENT = HEAD after F7 (F7 = 관련 준비 acceptance floor, accessible-mode base need 0.72, 직접 대응 for multipliers / pity; on top of R5: F3 = 구급키트 lowers the Outcome, no natural Fatigue recovery, 중상 fatigue +9, repeated-strain Death cut +8%p/repeat cap +30%p; F4 = Food recovery 4/2/5/3/2/2/6/9, every Item expires 2~5 days, operating cost 90+5×(Day−1), Wallet multipliers 0.90/0.35/0.20/0.10, 세계수 400/800; User 2026-09-24/25). The buffer-removal decision (7-b) waits on this measurement. BASELINE = 6cb62b4 (before I-2). Reported, not tuned (AGENTS.md §9).

Multi-point reference for the two engaged policies (earlier columns are this file's previous versions on the same seeds):

| policy | metric | baseline (pre-I-2) | +5 / +8 / +10 | +4 / +7 / +9 (R1, commit 2579513) | R4 + R5 (commit bed5a73) | + F3 + F4 (commit cad3c62) | + F7 (now) |
|---|---|---|---|---|---|---|---|
| balanced | clear | 0.075 | 0.030 | 0.063 | 0.077 | 0.003 | 0.007 |
| balanced | reach D30 | 0.130 | 0.072 | 0.120 | 0.122 | 0.003 | 0.007 |
| balanced | death\|fail | 0.552 | 0.625 | 0.593 | 0.532 | 0.510 | 0.565 |
| balanced | avg money | 1419 | 1058 | 1325 | 1358 | 236 | 407 |
| skilled | clear | 0.100 | 0.043 | 0.085 | 0.122 | 0.020 | 0.007 |
| skilled | reach D30 | 0.170 | 0.150 | 0.210 | 0.253 | 0.020 | 0.015 |

## balanced:adaptive:hybrid

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 20 | 15 | -4.760 |
| reach D10 | 0.995 | 0.978 | -0.017 |
| reach D20 | 0.455 | 0.125 | -0.330 |
| reach D25 | 0.228 | 0.037 | -0.190 |
| reach D30 | 0.130 | 0.007 | -0.122 |
| clear | 0.075 | 0.007 | -0.068 |
| deaths/run | 8.748 | 8.785 | +0.037 |
| death|fail | 0.552 | 0.565 | +0.012 |
| great | 0.144 | 0.128 | -0.016 |
| avg money | 1419 | 407 | -1011 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 28% / 22% / 14% / 9% | 27% / 29% / 21% / 13% / 10% |
| D10-19 | 17% / 30% / 24% / 17% / 12% | 14% / 28% / 23% / 16% / 19% |
| D20-24 | 30% / 22% / 23% / 16% / 9% | 32% / 20% / 22% / 10% / 15% |
| D25-29 | 33% / 21% / 24% / 14% / 8% | 43% / 20% / 15% / 10% / 13% |

CURRENT departure Fatigue bands (share): 40 0.8% · 0-9 61.5% · 10-19 21.2% · 20-29 11.6% · 30-39 4.9%
Food/Drink in the Bag by current-Fatigue band: 40 52% (415) · 0-9 69% (14945) · 10-19 58% (6189) · 20-29 55% (3483) · 30-39 55% (1494)
Supply use split: preRecovery 64% · outcome buffer 31% · waste 4%

## greedy:overcharge:premium

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 17 | 14 | -3.002 |
| reach D10 | 0.985 | 0.980 | -0.005 |
| reach D20 | 0.212 | 0.010 | -0.202 |
| reach D25 | 0.020 | 0.000 | -0.020 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 10 | 10 | +0.018 |
| death|fail | 0.998 | 0.963 | -0.035 |
| great | 0.069 | 0.066 | -0.003 |
| avg money | 2284 | 1113 | -1171 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 13% / 32% / 25% / 17% / 13% | 13% / 32% / 24% / 17% / 14% |
| D10-19 | 5% / 31% / 27% / 20% / 17% | 2% / 29% / 24% / 17% / 27% |
| D20-24 | 7% / 27% / 28% / 20% / 17% | 5% / 20% / 35% / 20% / 20% |
| D25-29 | 5% / 30% / 32% / 12% / 22% | — |

CURRENT departure Fatigue bands (share): 40 2.6% · 0-9 50.0% · 10-19 22.0% · 20-29 15.5% · 30-39 9.9%
Food/Drink in the Bag by current-Fatigue band: 40 35% (897) · 0-9 38% (11021) · 10-19 31% (4926) · 20-29 32% (3609) · 30-39 29% (2104)
Supply use split: preRecovery 65% · outcome buffer 32% · waste 3%

## protective:half:vip

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 11 | 9.510 | -1.405 |
| reach D10 | 0.807 | 0.468 | -0.340 |
| reach D20 | 0.000 | 0.000 | +0.000 |
| reach D25 | 0.000 | 0.000 | +0.000 |
| reach D30 | 0.000 | 0.000 | +0.000 |
| clear | 0.000 | 0.000 | +0.000 |
| deaths/run | 4.978 | 4.418 | -0.560 |
| death|fail | 0.030 | 0.018 | -0.012 |
| great | 0.118 | 0.112 | -0.007 |
| avg money | -62 | -74 | -12 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 27% / 29% / 22% / 13% / 9% | 27% / 29% / 22% / 13% / 10% |
| D10-19 | 10% / 30% / 26% / 18% / 17% | 7% / 30% / 24% / 19% / 21% |
| D20-24 | — | — |
| D25-29 | — | — |

CURRENT departure Fatigue bands (share): 40 0.1% · 0-9 77.3% · 10-19 16.8% · 20-29 4.8% · 30-39 1.0%
Food/Drink in the Bag by current-Fatigue band: 40 8% (25) · 0-9 66% (12496) · 10-19 40% (3372) · 20-29 25% (927) · 30-39 11% (176)
Supply use split: preRecovery 47% · outcome buffer 47% · waste 6%

## skilled:adaptive:expedition

| metric | baseline | current | Δ |
|---|---|---|---|
| avg day | 22 | 18 | -4.482 |
| reach D10 | 1.000 | 0.998 | -0.002 |
| reach D20 | 0.650 | 0.265 | -0.385 |
| reach D25 | 0.355 | 0.063 | -0.292 |
| reach D30 | 0.170 | 0.015 | -0.155 |
| clear | 0.100 | 0.007 | -0.092 |
| deaths/run | 9.742 | 10 | +0.297 |
| death|fail | 0.805 | 0.902 | +0.097 |
| great | 0.140 | 0.132 | -0.008 |
| avg money | 2729 | 1254 | -1475 |

Outcome mix by phase (success / retreat / injury / severe / death, share of expeditions):

| phase | baseline | current |
|---|---|---|
| D1-9 | 26% / 29% / 22% / 14% / 9% | 27% / 29% / 21% / 13% / 9% |
| D10-19 | 18% / 30% / 24% / 17% / 11% | 17% / 29% / 22% / 15% / 17% |
| D20-24 | 28% / 25% / 22% / 15% / 9% | 30% / 21% / 21% / 12% / 16% |
| D25-29 | 32% / 22% / 23% / 15% / 9% | 35% / 19% / 22% / 11% / 13% |

CURRENT departure Fatigue bands (share): 40 0.6% · 0-9 62.2% · 10-19 21.3% · 20-29 11.1% · 30-39 4.8%
Food/Drink in the Bag by current-Fatigue band: 40 66% (550) · 0-9 74% (17067) · 10-19 70% (7577) · 20-29 69% (4203) · 30-39 66% (1775)
Supply use split: preRecovery 67% · outcome buffer 29% · waste 4%

