# NPC_TRAIT consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/NPC_TRAIT_v2.8.0.md
CHAIN=design_ssot/NPC_TRAIT_v2.8.0.md,design_ssot/history/NPC_TRAIT_v2.7.0.md,design_ssot/history/NPC_TRAIT_v2.6.1.md,design_ssot/history/NPC_TRAIT_v2.6.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/NPC_TRAIT_v2.8.0-patch.md`; v2.7.0 / v2.6.1 / v2.6.0 stay in `history/`.

Placement: v2.6.0 section order is the skeleton (KEY, ROLE, Job, Trait, Rarity, Growth, Roster, Death,
Destination, Pre-reveal, Wallet/Loyalty/Revisit, Deep, Catalog). v2.8 Job Lv1 table joins JOB IDENTITY;
v2.7 LEVEL-UP / v2.8 PLAYER-FACING GROWTH TRUTH / NORMAL BAG follow the Job sections; the Trait catalog
follows the Trait rule sections, with v2.6.1 HONEST / RICH as catalog subsections and v2.7 FOOD AFFINITY /
POTIONBODY / FATIGUE scope right after; v2.6.1 + v2.7 Injury rules form one INJURY / SEVERE INJURY section;
v2.6.1 LIAR is a DESTINATION subsection; v2.8 Loyalty / Trusted Regular / purchase deltas / non-purchase
Loyalty / intent / revisit / player meaning are subsections of WALLET / LOYALTY / REVISIT; v2.6.0 and v2.8
Deep reward sections are one DEEP EXPEDITION NPC REWARD section. NPC_TRAIT_QA_v2.8.0.md is a separate owner
and is not merged. Header keys `BASE_DOCUMENT=` / `PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` /
`CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

```text
## INHERITANCE
All unchanged v2.7 NPC, Job, Trait, Injury, Fatigue-trait, Food-affinity, Potionbody and recent
expedition rules inherit NPC_TRAIT_v2.7.0.md.
## INHERITANCE
All NPC/Job/Trait/Roster rules not changed below inherit `NPC_TRAIT_v2.6.1.md` and its declared base.
## INHERITANCE
All unchanged NPC/Job/Growth rules inherit `NPC_TRAIT_v2.6.0.md`.
This patch removes stale pool/destination wording and fixes condition recovery ownership.
```

## LEGACY — version narration / approval metadata / merged section headings

Each heading below is merged into the named current section; the approval date is history.

```text
## RETIRED INHERITED SPECIAL SYSTEM — EXACT
The inherited Deep reward structure is now numerically closed for v2.8.
## FULL-CHAIN NUMERIC CLOSURE — JOB / LOYALTY / REVISIT
USER_APPROVAL_DATE=2026-09-20
## ACTIVE TRAIT POOL — EXACT
## MUTUAL EXCLUSION
## ORDINARY INJURY — v2.7 PERSISTENCE / RE-EXPEDITION RISK
## SEVERE INJURY — UNCHANGED RECOVERY IDENTITY
## FATIGUE TRAITS
## LOYALTY / TRUSTED REGULAR
## APPROVED_AMENDMENT_2026_09_12 — DEEP EXPEDITION NPC REWARD
```

## LEGACY — notes about removed / retired rules (the exact 37-Trait catalog and 16 pairs are the current truth)

The v2.8 retirement list names the old clauses; the binding guard lines (no hidden/random route /
Trait-removal / Trait-mentor system; no reintroduction without approved Design change) are kept in
TRAIT MODIFICATION and DESTINATION.

```text
The older base-chain clauses that allowed a random Rare/Special NPC opportunity to:
- reassign one not-yet-finalized NPC to another Gate
- remove a permanent NEGATIVE Trait
- add one of several permanent POSITIVE Traits
are retired in v2.8 and are not active Design Truth.
Any stale `poolSize=30` declaration in the base is superseded.
Removed active concepts:
- lucky
- unlucky
`showoff` is not active; the current Trait is `liar`.
No lucky/unlucky exclusion pair exists.
Thus the stale description "liar only changes what is reported while actual destination stays" is superseded.
The inherited `native Stat/recovery` wording for `eater / 대식가` and `small / 소식가` is superseded.
Removed source concepts from active v2.5 Trait pool:
- 카페인중독, 술고래, 언데드혐오, 행운아, 불운아
```

## LEGACY — catalog version labels / v2.6 tuning status

Catalog numbering 1-37 is kept as one list; the retained-baseline / playtest-rebalance lines are
version and tuning history (numeric change requires an approved owner-spec update).

```text
numericStatus=APPROVED_V2.6_RETAINED_STARTING_VALUES
- numeric values below are the retained implementation baseline for v2.6
- full-run simulation/playtest may rebalance values after adoption
### Reworked / Retained 28
### New 9 (Total 37)
```

## SUPERSEDED — Trait pool size 30 -> 37 and milestone Trait acquisition (v2.6.1 / v2.7)

v2.7 LEVEL-UP REWARD removes automatic Trait acquisition at Level milestones.

```text
poolSize=30
Exact trait acquisition milestones -> CORE_RUN/NPC progression if separately specified.
```

## SUPERSEDED — Korean mutual-exclusion list restated by the EXACT 16 list (same pairs)

```text
pairs:
- 용감함 ↔ 겁쟁이
- 대식가 ↔ 소식가
- 신중함 ↔ 무모함
- 구두쇠 ↔ 충동구매
- 강골 ↔ 허약함
- 수집가 ↔ 실속파
- 지구력 ↔ 쉽게 지침
- 사교적인 ↔ 낯가림
- 허약함 ↔ 회복체질
- 해독가 ↔ 민감체질
- 잔재주꾼 ↔ 몸치
- 장비관리 ↔ 서투른
- 내열성 ↔ 화염공포증
- 눈썰미 ↔ 약시
- 냉담한 ↔ 수족냉증
- 정직한 ↔ 거짓말쟁이
```

## SUPERSEDED — Job Base/Growth numbers PASS3 -> exact v2.8 Job table

```text
Exact base/growth numbers=PASS3. Initial v2.5 implementation retains the current Design-SSOT-compatible Source Job table, then rebalances after full-run simulation/playtest.
```

## SUPERSEDED — Job Mastery Base/Growth channel (META_v2.8.0 JOB MASTERY — EXACT SPAWN-LEVEL MODEL; v2.8 "Job Mastery does not alter this table")

Kept: no hidden account-wide multiplier, no Final-only multiplier, META ownership / unlock lines.

```text
Job Mastery power may affect only the owning Job's visible Base Stats / Growth identity.
- Base/Growth effect channel is owned by NPC_TRAIT
- Mastery Base/Growth effect must be Player-readable when the PASS3 table is numerically activated
- exact Mastery Base/Growth adjustment table=PASS3_AFTER_JOB_BASE_GROWTH_REBALANCE
```

## SUPERSEDED — food-native recovery example (v2.7 FOOD AFFINITY: no native-recovery subsystem)

```text
Example:
대식가 + Food
=> Food/supply or food-native recovery may improve
```

## SUPERSEDED — Rare/Epic Trait editing and opt-in negative Trait addition (retired v2.8: no permanent Trait-edit opportunity without a new approved Design change)

```text
Persistent Trait editing is rare.
Rare Event:
- choose one NPC
- remove one internal NEGATIVE Trait
Epic Event:
- choose one NPC
- choose 1 of 3 internal POSITIVE Trait options
Forced random negative Trait onto invested NPC:
generally NO
Negative Trait addition allowed only when:
strongReward + explicitRisk
and player opts in.
```

## SUPERSEDED — 허세 destination rule and player destination reassignment (v2.6.1 LIAR; v2.8 retirement)

```text
허세:
- may make the NPC report a different expected destination
- does not itself change the actual assigned destination
- has no unrelated price/Item preference bonus
### LIMITED PLAYER INTERVENTION
Rare/Special Event may allow:
- one not-yet-finalized NPC
- one destination reassignment
- to another currently open Gate
playerChoosesDestination=YES
autoOptimize=NO
alreadySoldOrLockedNPC=INELIGIBLE
Prototype preferred:
one NPC / one change / one event
```

## SUPERSEDED — Loyalty calculation left to tuning path / Deep values PASS3 (v2.8 exact numeric closure)

```text
Exact ordinary Loyalty / relationship calculation remains in its existing owner/tuning path.
Exact values=PASS3.
```

## LEGACY — restatements of rules kept verbatim elsewhere in the target

v2.6.1 combat / survival Injury lines = v2.7 투력 / 강인함 block (same values); v2.6.1 fatigue list and
Death fatigue line = v2.7 FATIGUE TRAITS — RESULT SCOPE; v2.7 Severe lines = v2.6.1 `injury=2` block;
v2.7 growth identity = v2.8 PLAYER-FACING GROWTH TRUTH.

```text
`injury=1`:
- combat -15% on NPC Base+Equipment unless grit replacement applies
- survival -20% on NPC Base+Equipment
- stamina: result fatigue -1
- weary: result fatigue +1
- grit: result fatigue +1 when applicable by current Trait rule
Death final fatigue gain remains 0 regardless of Trait modifier.
`injury=2` remains unavailable during its recovery period under the inherited rule.
When that recovery completes:
injury 2 -> 0 directly
Player-facing growth identity is:
Job + Level + actual four Core Stats
```

## REWORD — version framing removed, live rule kept

```text
From v2.7, Level Up grants only visible Job Growth through the four Core Stats.
Existing `rank/ranks` data is not v2.7 Design Truth. If Source has an unexpected active dependency, classify/report it rather than preserving milestone gameplay silently.
The inherited ordinary Injury Stat penalty remains unchanged:
The increased cost of Injury in v2.7 comes from persistence and re-expedition risk, not a second simultaneous Stat-penalty buff.
Ordinary Injury no longer disappears merely because the NPC completed another expedition without receiving a fresh Injury result.
The existing introduced-vs-newcomer mixture remains otherwise unchanged by this closure.
```

```new
Level Up grants only visible Job Growth through the four Core Stats.
Existing `rank/ranks` data is not Design Truth. If Source has an unexpected active dependency, classify/report it rather than preserving milestone gameplay silently.
Ordinary Injury Stat penalty:
The increased cost of Injury comes from persistence and re-expedition risk, not a second simultaneous Stat-penalty buff.
Ordinary Injury does not disappear merely because the NPC completed another expedition without receiving a fresh Injury result.
The existing introduced-vs-newcomer mixture remains otherwise unchanged.
```

## REWORD — Job Mastery pronoun names its subject after the superseded Base/Growth-channel sentence was dropped

```text
It may not create a hidden generic account-wide combat multiplier.
```

```new
Job Mastery power may not create a hidden generic account-wide combat multiplier.
```

## REWORD — catalog entries: "( unchanged )" / "Replaced 허세" labels removed

```text
3. **대식가** ( unchanged ... )
4. **소식가** ( unchanged ... )
10. **거짓말쟁이** (liar, Replaced 허세)
8. **구두쇠** ( unchanged )
9. **충동구매** ( unchanged )
11. **천재** ( unchanged )
12. **강골** ( unchanged )
14. **포션체질** ( unchanged )
16. **수집가** ( unchanged )
17. **실속파** ( unchanged )
18. **사교적인** ( unchanged )
19. **낯가림** ( unchanged )
20. **회복체질** ( unchanged )
21. **지구력** ( unchanged )
22. **쉽게 지침** ( unchanged )
26. **준비성** ( unchanged )
28. **냉담한** ( unchanged )
```

```new
3. **대식가**
4. **소식가**
10. **거짓말쟁이** (liar)
8. **구두쇠**
9. **충동구매**
11. **천재**
12. **강골**
14. **포션체질**
16. **수집가**
17. **실속파**
18. **사교적인**
19. **낯가림**
20. **회복체질**
21. **지구력**
22. **쉽게 지침**
26. **준비성**
28. **냉담한**
```

## REWORD — catalog 대식가 / 소식가 / 포션체질 effect lines carry the current v2.7 value (superseded native Stat/recovery wording)

New forms are the exact v2.7 FOOD AFFINITY / POTIONBODY wording kept in those sections.

```text
   - [benefit] Food native Stat/recovery +30%
   - [cost] Food native Stat/recovery -20%
    - [benefit] Potion native Stat/recovery +30%
```

```new
   - [benefit] Food positive native Core-Stat contribution +30%
   - [cost] Food positive native Core-Stat contribution -20%
    - [benefit] Potion positive native Core-Stat effect ×1.15
```

## REWORD — cross-owner pointers name the current owner file

Exact player-facing copy routes to `COPY_AUDIT_APPROVED_v2.8.0.md` per SPEC_INDEX_v2.8.0; the dead
`PASS3` clause is trimmed from the Wallet formula pointer.

```text
Meta progress source -> META
-> DUNGEON_HAZARD
-> ITEM
Normal Bag capacity is owned by `SALE_v2.7.0.md` and is exactly 2.
- `long` is not a Hazard. Long-expedition preparation is owned by `SUPPLY_BURDEN` in DUNGEON_HAZARD.
Cross-system native-Stat composition -> `ITEM_v2.7.0.md`.
Food/Drink Item truth -> `ITEM_v2.7.0.md`.
Potion catalog/effects -> `ITEM_v2.7.0.md`.
Base outcome Fatigue and Supply buffering -> `DUNGEON_HAZARD_v2.7.0.md`.
-> UI_UX
-> NIGHT_CLOSING
Item Aftercare may still remove/lower persistent Injury exactly as owned by `ITEM_v2.7.0.md`; this is separate from natural recovery.
Exact ordinary Death formula/caps -> `DUNGEON_HAZARD_v2.7.0.md`.
- affected identity/new destination remain hidden until Night as defined in EVENT
-> SALE
Presentation -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
Result proof -> `NIGHT_CLOSING_v2.7.0.md`
-> ECONOMY_ORDER / PASS3
Exact player copy -> COPY_WORLD_VOICE_v2.8.0.md.
Bag/transaction -> `SALE_v2.7.0.md`
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.7.0.md`
Item/Potion/Food/Aftercare -> `ITEM_v2.7.0.md`
Night causality -> `NIGHT_CLOSING_v2.7.0.md`
```

```new
Meta progress source -> META_v2.8.0.md
-> DUNGEON_HAZARD_v2.8.0.md
-> ITEM_v2.8.0.md
Normal Bag capacity is owned by `SALE_v2.8.0.md` and is exactly 2.
- `long` is not a Hazard. Long-expedition preparation is owned by `SUPPLY_BURDEN` in `DUNGEON_HAZARD_v2.8.0.md`.
Cross-system native-Stat composition -> `ITEM_v2.8.0.md`.
Food/Drink Item truth -> `ITEM_v2.8.0.md`.
Potion catalog/effects -> `ITEM_v2.8.0.md`.
Base outcome Fatigue and Supply buffering -> `DUNGEON_HAZARD_v2.8.0.md`.
-> UI_UX_v2.8.0.md
-> NIGHT_CLOSING_v2.8.0.md
Item Aftercare may still remove/lower persistent Injury exactly as owned by `ITEM_v2.8.0.md`; this is separate from natural recovery.
Exact ordinary Death formula/caps -> `DUNGEON_HAZARD_v2.8.0.md`.
- affected identity/new destination remain hidden until Night as defined in `EVENT_v2.8.0.md`
-> SALE_v2.8.0.md
Presentation -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md`
Result proof -> `NIGHT_CLOSING_v2.8.0.md`
-> ECONOMY_ORDER_v2.8.0.md
Exact player copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
Bag/transaction -> `SALE_v2.8.0.md`
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.8.0.md`
Item/Potion/Food/Aftercare -> `ITEM_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`
```

## REWORD — section headings without version tags / merged as subsections

```text
## HONEST
## RICH
## LIAR — DESTINATION OVERRIDE
## FOOD AFFINITY TRAIT SCOPE — v2.7
## POTIONBODY — v2.7
## ORDINARY PAID-PURCHASE LOYALTY DELTAS
## LOYALTY PLAYER MEANING
## DEEP EXPEDITION NPC REWARD — DIRECTOR DOCUMENT BASELINE
```

```new
### HONEST
### RICH
### LIAR — DESTINATION OVERRIDE
## FOOD AFFINITY TRAIT SCOPE
## POTIONBODY
### ORDINARY PAID-PURCHASE LOYALTY DELTAS
### LOYALTY PLAYER MEANING
## DEEP EXPEDITION NPC REWARD
### Severe Injury
### Exact values
```

## UNRESOLVED — kept verbatim, reported to the User

1. ACTIVE TRAIT CATALOG rule line carries control characters from the v2.6.0 source: `long, <TAB>hirst, wet,
   <BEL>rmor, undead, ...` (evidently `thirst` / `armor` mangled by `\t` / `\a` escapes). Kept byte-for-byte;
   the intended keys are stated cleanly in KEY `noncanonicalTraitResolutionKeys` and LEGACY / REMOVED SYSTEM
   REFERENCES. A text fix needs approval.
2. 악바리 catalog entry says "while currently Injured/Severely Injured: ... survival -20%, fatigue gain +1",
   while the v2.6.1 rule scopes grit to "`grit` while injury=1" and says "`injury=2`: - no Stat penalty".
   Severely Injured NPCs are unavailable, so the difference is likely moot; both kept.
3. The v2.8 header `OWNER=` drops `living_npc_cap` and `destination` (present in v2.6.0-v2.7.0), yet the
   LIVING NPC CAP and DESTINATION rules still live only in this owner and no other v2.8 owner declares them.
   Rules kept; the v2.8 `OWNER=` value is kept unchanged.

## REWORD — control-character corruption repaired (independent review)

The chain line carried a TAB and a BEL where `\thirst` / `\armor` went through an escape
processor (bytes present since ce8fad1); the same file names the clean keys `thirst` / `armor`.

```text
- no active Trait may read/write long, 	hirst, wet, rmor, undead, caffeine-stack, or hidden Job-ID effects
```

```new
- no active Trait may read/write long, thirst, wet, armor, undead, caffeine-stack, or hidden Job-ID effects
```

## REVIEW NOTES (independent review)

- UNRESOLVED, reported to the User: `OWNER=` does not declare `living_npc_cap` / `destination`
  though those rules live only here (CORE_RUN routes living capacity to this owner).
- Reported separately as a possible IMPLEMENTATION BUG: Source gives 악바리 (grit) `fatigue:+1`
  unconditionally, while this owner scopes that cost to "while currently Injured".
