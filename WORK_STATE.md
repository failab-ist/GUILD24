TASK=v2.5 Balance. Source Adoption is closed; what remains is the balance curve. Production numerics change only on approval — the two exceptions already granted are the 정가 intent wiring and the 회생 rules.

HEAD=d551018 (claude/elegant-hawking-hts795). Checkpoints, newest last: ca71263 fireCombat naming (byte-identical) · 308c402 Mastery harness → spawn-Level · 4c57bcd 정가 intent wiring + orderOffers/warehouse/openingStock naming · df06432 회생 rules · d551018 measurement + reports/BALANCE_v2_5.md.

DONE=정가 purchase-intent wiring (judged price now reaches chance; .65 is worth ~10%p, was worth 0) · 회생 rules enforced in the engine (CLOSING + deficit only, stock.cost×50%, stops at zero, 3 per Run, persisted + validated, N/3 in the UI) · spender policy in the harness · four arms baseline/F1/H1/F1+H1 × 3 policies × 300 seeds · 10 inventory-order-reroll combos · counter-ceiling conflict audit · Deep sponsorship A-vs-B decomposition · two of my own measurement defects corrected (warehouse collisions were never 0; contribution() used pre-Stage-10 coefficients).

DOING=Nothing in flight. Waiting on approval of the §9 candidates in reports/BALANCE_v2_5.md.

PENDING=Not yet executed, awaiting a decision: F1 / H1 / F1+H1 adoption · warehouse 18 · opening stock 4 · Offer 5 (Work recommends against 4 — the counter ceiling replaces the last slot, so at 4 slots 71% of days leave three or fewer non-counter choices) · reroll 50/100/200/400 · Deep sponsorship unit price (participation is already 90%, so the sink is small because the price is) · intentPivot/intentWeight final values (.36/.5 provisional; .3 weight damages 할인 least) · SLOTH extra easing (still worst by 12 margin after F1) · 사제 and 광전사 Job decisions · Stage 11 final verification. Unmeasured: beginner reroll behaviour (that policy has no reroll rule).

NEXT=1. Take the approved subset only. 2. Apply as a small patch, one checkpoint per concern. 3. Re-measure the same arms on identical seeds. 4. Report, then stop. Commit and push at every checkpoint — implementation patch, harness change and measurement/report are separate commits, never one batch at the end.
