TASK=v2.5 COMPLETE. Source Adoption, balance adoption, Design SSOT sync, verification and build are done and merged to main. No further v2.5 balance work — everything still open is a playtest observation for v2.5.x.

HEAD=see main. Branch claude/elegant-hawking-hts795 finalised at 32158b6 before merge. Finalisation checkpoints, newest last: 46e44fb economy final values (warehouse 18, opening shelf 4, Offer 6, reroll base 50, sponsorBase 350) · c7cd81b F1 + H1 · 7372539 owner Design SSOT sync · f50e32b playtest follow-up log · 32158b6 QA captures.

DONE=v2.5 final balance in production: start gold 1000 · warehouse 18 · opening shelf rice/water/bandage/potion ×1 · order candidates 6 · reroll 50/100/200/400/800 resetting daily · Deep sponsorBase 350 with the rarity and level steps intact · Final coefficients .50/.34/.27/.20 − .35 · WRATH 200 · PRIDE .90 / ENVY .92 / GLUTTONY .80 at rarity 2 / LUST .95 / GREED target 18,800 cap 15 / SLOTH 220/190/175/160 · fireCombat .90 · 정가 judged at .65 with pivot .36 and weight .5, confined to 정가 · 회생 three per Run at half of stock cost. Design SSOT synced in ECONOMY_ORDER, ECONOMY_ORDER_QA, CORE_RUN, BOSS, DUNGEON_HAZARD and FINAL_EXPEDITION — including replacing the "single fixed sponsorship amount" clause that contradicted the confirmed rarity/level pricing.

DOING=Nothing. v2.5 is shipped.

PENDING=Playtest observations only, in reports/V2_5_PLAYTEST_FOLLOWUP.md: Fresh beginner D30 at 15.3% against a 20-30% target · Fresh Final clear · rescue frequency · whether warehouse 18 reads as a decision · Offer 6 and reroll feel · Deep sponsorship pricing · SLOTH still hardest Boss · FIRE still hardest Family · Priest weak / Berserker strong · 정가 intent feel · counter accessibility · D30 prep gold against the ~1,500G centre. None of these blocked the release; each is a v2.5.x candidate once there is play data.

NEXT=Play v2.5. Bring observations back against the twelve items in the follow-up log, then decide what v2.5.x changes. Commit and push at every checkpoint — implementation patch, harness change and measurement/report are separate commits, never one batch at the end.
