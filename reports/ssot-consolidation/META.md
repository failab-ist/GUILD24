# META consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/META_v2.8.0.md
CHAIN=design_ssot/META_v2.8.0.md,design_ssot/history/META_v2.7.0.md,design_ssot/history/META_v2.6.1.md,design_ssot/history/META_v2.6.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/META_v2.8.0-patch.md`; the v2.7 / v2.6.1 / v2.6.0 versions stay in `history/`.

Layout: ROLE, ACTIVE META structure, KEY, GLOBAL META XP REMOVAL, JOB × BOSS CLEAR MATRIX, one JOB
MASTERY section (v2.8 ownership lines, v2.6 definition, v2.7 successful-clear identity, the live v2.6
reward-boundary bullets, then the v2.8 spawn-Level model as a subsection), DISTINCT BOSS CLEAR COUNT,
APPROVED UNLOCKS, D10 / D14 PRODUCT UNLOCK (v2.6.1), MONSTER KNOWLEDGE, FIRST CLEAR / META POWER
BOUNDARY (v2.7), CROSS-RUN POWER BOUNDARY (v2.6), then the v2.8 Store Growth sections (POWER /
INFLATION BOUNDARY, STORE CAPITAL, DECORATION, PROJECTION, PROGRESSION TARGET, BALANCE GATE), the
RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE policy (kept whole), save sections (v2.7 PRE-RELEASE
COMPATIBILITY POLICY, v2.6 SAVE / ACCOUNT PERSISTENCE with the v2.6.1 `account.unlocks` contract and
the v2.6.0 FULL DATA RESET vs ABANDON lines, v2.7 SAVE RELATIONSHIP), one QA list (META-Q01..Q14
minus retired Q11 / Q15 / Q16) and one RELATED list. Current save generation is v8 per
`CORE_RUN_v2.8.0.md` SAVE BOUNDARY. Header keys `BASE_DOCUMENT=` / `PATCH_TYPE=` are replaced by
`CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

Every inherited topic (matrix, unlocks, Monster Knowledge, Full Reset, Job Mastery identity/count) is now a section of the target.

```text
## CURRENT EXECUTION SCOPE
META_v2.8.0 is the current project-wide Meta owner.
## INHERITANCE
Job×Boss matrix, distinct-Boss Item/Job unlocks, Monster Knowledge, Full Reset, and other unchanged Meta behavior inherit `META_v2.7.0.md` and its base chain.
Job Mastery progression identity/count still inherits, but its active reward model is overridden by the exact spawn-Level model in this v2.8 owner.
## INHERITANCE
All unchanged Meta progression, unlock, Job Mastery, Start Contract, Monster Knowledge, Full Reset, and Run Abandon rules inherit `META_v2.6.1.md` and its declared base.
The inherited Franchise Grade source is superseded by this patch.
This patch aligns Meta with v2.7 Save generation, separates Franchise Grade from Job Mastery, defines the dedicated Franchise Achievement track, and explicitly rejects adding a generic fail-to-power Meta currency merely to lower first-clear difficulty.
Distinct Boss Clear unlocks already owned by the inherited Meta design remain unchanged unless separately amended.
## INHERITANCE
All unchanged Meta progression rules inherit `META_v2.6.0.md`.
```

## LEGACY — status / amendment narration and restatements

"remains unchanged" / "remain approved" / "newest amendment" are status narration; the identity, prices and table stay as rules. `Gross Sales × reached-Day rate` restates the kept Run-end settlement formula. v2.7 `## JOB MASTERY — CLEAR PROGRESSION REMAINS SEPARATE` is merged under the one JOB MASTERY heading as `### Successful-clear identity`. The v2.6.0 `### D10 / D14 UNLOCK` bullets are restated exactly by the kept v2.6.1 D10 / D14 PRODUCT UNLOCK — EXACT section; `presentation -> UI_UX` is replaced by the kept `Decoration UX -> UI_UX_v2.8.0.md` pointer (presentation routing is SPEC_INDEX-owned).

```text
Job Mastery clear-count identity / Job×Boss ownership remains unchanged.
The Decoration structure and initial Decoration identities/prices remain approved. Current non-Meta owners are routed by SPEC_INDEX_v2.8.0.md.
The newest Store Capital amendment changes only the cross-run conversion basis:
Gross Sales × reached-Day rate
## JOB MASTERY — CLEAR PROGRESSION REMAINS SEPARATE
## v2.6.0 UPDATE: META, SAVE v7, AND UNLOCKS
### D10 / D14 UNLOCK
- D10: PremiumLunch (프리미엄 도시락) 계정 영구 해금 + Run D10 gate
- D14: WorldTreeAmulet (세계수 생환부적) 계정 영구 해금 + Run D14 gate
- Offer 생성 전 unlock 처리. Toast 계정 단위 1회 표출. 새 Run에서는 Day 조건 충족 전에 등장 금지.
Thus the old blanket rule `permanentCombatPowerMeta=NO` is replaced by:
presentation -> UI_UX
```

## SUPERSEDED — central progression: Job Mastery only -> Store Growth + Job Mastery (v2.8 ACTIVE META)

Global Meta XP removal itself is kept in GLOBAL META XP REMOVAL.

```text
v2.5는 legacy Global Meta XP를 제거하고
Boss clear 기반 Job Mastery를 중심 Progression으로 사용한다.
```

## SUPERSEDED — Save v7 -> v8 (v2.7 PRE-RELEASE COMPATIBILITY POLICY; CORE_RUN_v2.8.0.md SAVE BOUNDARY)

The v2.6.1 old-bytes line (`Old save bytes are not automatically deleted …`), `Full Data Reset is the explicit deletion action.` and the `account.unlocks` validation contract are kept; the v2.7 `legacy bytes may remain physically present until the existing reset/storage policy removes them` rule relies on them.

```text
## SAVE v7 ACCOUNT CONTRACT
Current save generation is v7 only.
No v1~v6 continuation or migration.
### SAVE v7
- KEY=guild24.save.v7, LEGACY 6 유지.
- Migration 없음. v6 로드 시 새 버전 게임 안내 (이어서 로드 금지).
- ccount.unlocks validation 추가.
```

## SUPERSEDED — v2.5 legacy migration boundary (v2.7 PRE-RELEASE COMPATIBILITY POLICY: no v1~v7 migration, fresh v8 Account/Meta)

The kept v2.7 rules (no migration, no conversion logic for retired / changed-semantics fields, no shim, legacy bytes not imported) replace this pre-v2.5 migration plan.

```text
## LEGACY MIGRATION BOUNDARY
Legacy Global Meta XP / XP Grade / 14-unlock state is not Canonical truth in v2.5.
Migration policy must preserve data safety but must not keep removed gameplay behavior merely for compatibility.
Do not silently map:
- old XP amount -> fake Job Mastery cells
- old Grade -> fake Boss clears
- old `day10` / `regular3` / `run1` / `level15` contract gates -> v2.5 Start Contract unlock truth
If incompatible Meta schema cannot be migrated truthfully:
- preserve old stored bytes as backup where existing save policy supports it
- initialize the new v2.5 progression state according to the implementation migration plan
- do not invent historical Boss clears the Player never achieved
Technical migration detail is Source-owned; progression truth remains this document.
```

## SUPERSEDED — Job Mastery Base/Growth power channel -> exact spawn-Level model (v2.8, User approval 2026-09-20)

v2.8: Job Mastery does not multiply Job Base Stats / Job Growth. The live bullets of the v2.6 reward boundary (no hidden Final / account-wide multiplier, no mastery-only Stat, visible and Job-specific) are kept under `### Gameplay reward boundary`.

```text
- Job Mastery power, when available after clears, stays inside its existing Job Base/Growth channel
Job Mastery permanent Job power, when numerically activated by the PASS3 table, must remain inside the Job identity channel:
JOB = Base Stats + Growth
Ownership -> NPC_TRAIT.
Exact Base/Growth Mastery adjustment table=PASS3_AFTER_JOB_BASE_GROWTH_REBALANCE.
This is numeric tuning; it does not permit a new power subsystem.
- explicit visible Job Mastery Base/Growth adjustment owned by NPC_TRAIT
job base/growth/mastery power channel -> NPC_TRAIT
```

## LEGACY — retired systems: Franchise Grade / Franchise Achievement / Grade ORDER discount / Start Contract (retired per META v2.8 inactive-archive policy)

The current archive / inactive policy is kept whole under `## RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE`; these are the old active rules of those systems (Grade source / ladder / discount, the ten Achievements and their baselines / readout / filter, Start Contract gating, the Franchise KEY / persistence / save-ownership / RELATED lines, META-Q11 / Q15 / Q16 and the Start Contract gate clause of META-Q14, the Franchise bullet of FIRST CLEAR / META POWER BOUNDARY, and the Franchise-baseline IMPLEMENTATION-BLOCKING UNRESOLVED status). `Ordinary sale signals` / `Relic purchase signal` pointers fed only the retired Achievement counters.

```text
Franchise Grade no longer derives from Total Job Mastery.
- Franchise Grade no longer reads Total Job Mastery as its progression source
## FRANCHISE GRADE — DEDICATED ACHIEVEMENT SOURCE
Franchise Grade now derives from completion of exactly **10 dedicated Franchise Achievements**.
Each achievement is binary and contributes exactly one completion.
Do not award additional Franchise Grade progress for repeating an already-completed achievement.
Exact grade progression:
0 / 10 = base Franchise Grade
2 / 10 = Franchise Grade +1 step
4 / 10 = Franchise Grade +1 step
6 / 10 = Franchise Grade +1 step
8 / 10 = highest functional Franchise Grade
10 / 10 = final honor grade: 전설의 편의점
The existing Start Contract availability role remains attached to Franchise Grade.
All functional Franchise Grade / Start Contract progression must be available by 8/10.
`전설의 편의점` at 10/10 is a completion/honor grade:
- no new generic combat Stat layer
- no new post-completion permanent combat multiplier
- no requirement to create another functional Start Contract solely because 10/10 exists
## FRANCHISE GRADE — ORDER PURCHASE-PRICE PASSIVE — EXACT
Franchise Grade carries one always-applied passive: a discount on the ORDER purchase price the
Player actually pays.
Grade 1 =   0%
Grade 2 =  -2%
Grade 3 =  -4%
Grade 4 =  -6%
Grade 5 =  -8%
Grade 6 = -10%
Applies to:
- the ORDER offer price the Player actually pays for stock
- applied AFTER the existing Contract / Event / Offer price calculation
- rounding REUSES the existing ORDER price rounding rule; no second rounding convention
- promotional offers are included on the same terms
Does not apply to:
- Relic / 점포지원 purchase
- Deep Expedition sponsorship
- Final NPC transfer price
- any other non-ORDER cost
- no new Passive Tree and no separate progression system is created for this
- the existing Franchise Grade UI shows only the current ORDER discount rate; no new screen
- this is an economy channel through the existing Franchise Grade, not a raw-Stat currency, so
it does not violate the `FIRST CLEAR / META POWER BOUNDARY` prohibition on a generic
account-wide combat multiplier
## FRANCHISE ACHIEVEMENTS — CURRENT APPROVED SET
Use exactly the following ten achievement directions.
Do not add duplicate lower/upper versions of the same task merely to inflate Franchise Grade count.
| # | Franchise Achievement | Represents |
|---:|---|---|
| 1 | 누적 판매 **80회** | 기본 영업 |
| 2 | 150% 판매 누적 **20회 성공** | 가격 판단 |
| 3 | 재방문 NPC에게 누적 **20회 판매 성공** | 단골 / 장기 관계 |
| 4 | 유물 누적 **15개** 구매 | 점포 성장 |
| 5 | 5개 Dungeon Family 모두에서 보급 생환 달성 | 던전 대응 경험 |
| 6 | 한 Run에서 만료 폐기 0개로 **DAY 25 도달** | 발주 / 재고 관리 |
| 7 | 한 Run에서 사망자 0명으로 Final 도달 | 원정 운영 |
| 8 | Final 출전 NPC 전원에게 실제 보급을 완료한 뒤 Boss CLEAR | Final 준비 |
| 9 | 한 Run에서 **Gross Sales 10,000G 이상** 달성 + Boss CLEAR | 종합 경영 |
| 10 | 6 Job × 7 Boss = Job×Boss Matrix 42 / 42 CLEAR | 완전 정복 |
### FRANCHISE ACHIEVEMENT NUMERIC BASELINES
The exact values for the first v2.7 Balance Fix are:
Achievement 1 = cumulative successful sales 80
Achievement 2 = cumulative successful 150% sales 20
Achievement 3 = cumulative successful sales to returning NPCs 20
Achievement 4 = cumulative Relic purchases 15
Achievement 6 = zero expiry waste through DAY 25
Achievement 9 = one-Run Gross Sales 10,000G + Boss CLEAR
Tuning intent for this baseline:
- 1 / 3 / 4 are the cumulative-record layer, reachable within roughly 10 Runs of ordinary
repeated play
- 6 is a stock-management result measured through DAY 25
- 7 is the first achievement that requires surviving to the Final
- 8 / 10 remain the upper Final / Boss / complete-conquest tier
The superseded first-adoption values were 1 = 100, 3 = 30, 4 = 30, and 6 = zero expiry waste
to the Final. They are recorded here only so an older save or report is legible; the values
above are the ones to implement.
These values are intentionally **baseline tuning values**, not permanent untouchable canon.
They must be implemented as written for the first v2.7 adoption / frozen QA pass.
Full-run QA may report a `BALANCE FINDING` when evidence shows that a baseline is materially too trivial, too grindy, or clusters too many Franchise completions into the same narrow play window.
After that finding:
QA evidence
-> Director/User review
-> approved META owner update
-> separate implementation/fix cycle
QA / WORK may not silently auto-tune these numbers merely to make the track feel better or to turn a FAIL into PASS.
Interpretation boundaries:
- cumulative achievements may span Runs because they represent account-level play history
- one-Run achievements must be satisfied within one Run exactly as written
- Achievement 6 settles the moment the Run reaches DAY 25 with cumulative expiry waste of 0,
counting the DAY 25 expiry sweep itself. It is awarded immediately at that point, and later
waste in the same Run never revokes an achievement already earned - the binary,
account-persistent rule is unchanged
- Achievement 5 recognizes actual supplied survival across all five Dungeon Families; it must not require a hidden Relic/build taxonomy
- Achievement 8 requires every selected Final participant to receive at least one actual valid Final-preparation Item transfer before that Boss is cleared
- Achievement 10 is intentionally the hardest long-term requirement and cannot be substituted by another achievement or point source
## FRANCHISE PROGRESS READOUT — SINGLE SOURCE
The five cumulative Achievements (1-5) each carry a running count alongside their target, so a
readout can state how far an account has come rather than only that it has not arrived.
Achievement 1  current / 80
Achievement 2  current / 20
Achievement 3  current / 20
Achievement 4  current / 15
Achievement 5  current / 5
Achievements 6-10 are a Run result rather than a tally. They carry no running count and report
only the completion verdict.
- the current value and the target MUST come from the same list that judges the Achievement.
No screen, harness or report may hold its own copy of a threshold.
- a current value is capped at its own target: a completed Achievement reads `80 / 80`, never
a number past it. Repeating a completed Achievement still adds nothing.
- Franchise Grade requirement has one truth, read from both ends - the count a Grade costs, and
the Grade a count buys:
Grade 1 =  0 / 10
Grade 2 =  2 / 10
Grade 3 =  4 / 10
Grade 4 =  6 / 10
Grade 5 =  8 / 10
Grade 6 = 10 / 10
Any progress shown toward a Grade-gated unlock MUST count Franchise Achievements against this
table. Reading a different counter is a defect even when the displayed step happens to agree:
the pre-v2.7 source measured Start Contracts against Total Job Mastery, so the board could
report a Contract as still locked while the Contract was already open.
Presentation placement, wording and the completion cue -> `UI_UX_v2.7.0.md`.
## FRANCHISE ACHIEVEMENT DESIGN FILTER
Franchise Achievements must recognize normal visible core play rather than manufacture achievement-only behavior.
Use:
normal visible game action / meaningful Run result
> hidden optimization pattern created only for an achievement
Avoid:
- Relic-synergy labels or build-piece taxonomies not represented as an actual player system
- duplicate lower/upper milestones of the same accomplishment
- a chain of trivial Day-reach achievements that one good Run clears at once
- requirements whose only purpose is to make an achievement exist
Cumulative counts are allowed where the counted action is itself a real active game action, such as successful sales or Relic purchases.
Not every achievement is cumulative.
- Franchise Achievement / Grade progress may advance from valid non-clear accomplishments, but this progression acts through the existing Franchise Grade / Start Contract channel rather than a new permanent raw-Stat currency
## IMPLEMENTATION-BLOCKING UNRESOLVED
NONE
The numeric Franchise baselines remain QA-tunable only through the approved `BALANCE FINDING -> User/Director approval -> owner update -> separate fix cycle` process.
They are not implementation-blocking unresolved items.
- Franchise Achievement completion state
- Franchise Grade derivation from achievement completion count
Ordinary sale signals -> `SALE_v2.7.0.md`
Relic purchase signal -> `RELIC_v2.7.0.md`
franchiseGrade=RETAINED
franchiseGradeSource=totalJobMastery
franchiseGradeGameplayEffect=NONE
franchiseGradeContentGate=START_CONTRACT
startContractUnlockMapping=PASS3_START_CONTRACT_UNLOCK_TUNING
Franchise Grade Start Contract unlocks are defined separately below and are not part of the 1/3/6 Boss-clear gates.
## FRANCHISE GRADE
Franchise Grade is retained as account prestige/status and as the cross-run unlock tier for Start Contract availability.
Source:
Progression chain:
Job × Boss Clear Matrix
-> Job Mastery per Job
-> Total Job Mastery
-> Franchise Grade
-> Start Contract availability
- Grade does not directly modify combat
- Grade does not directly modify NPC Stats
- Grade does not directly modify economy
- Grade does not directly modify Relic power
- Grade does not directly modify Item power
- Grade is not the gate for the approved 1/3/6 Boss-clear unlocks
- Grade IS the cross-run gate for non-default Start Contract availability
- the default/standard Start Contract remains available on a fresh account
- unlocking a Start Contract does not automatically apply its effect
- a Start Contract effect applies only when the Player explicitly selects that unlocked contract for a Run
- the selected contract's explicit effect belongs to the contract/Run-start option, not to Franchise Grade itself
Mandatory boundary:
Franchise Grade direct gameplay bonus = NO
Franchise Grade Start Contract availability gate = YES
Legacy direct Grade benefits are removed and must not be restored as implicit rewards, including:
- starting Gold bonus
- generic Item / offer-count bonus
- generic Inventory / warehouse-capacity bonus
- generic Reroll-cost discount
- automatic first-dungeon-information bonus
Existing Source behavior that grants such direct Grade bonuses is legacy and must be removed during v2.5 adoption unless an explicit selected Start Contract itself owns a stated effect.
Legacy Start Contract progression gates are also not v2.5 Meta truth merely because they exist in Source.
The following legacy unlock keys must not remain as the cross-run unlock source:
day10
regular3
run1
level15
Exact display-grade thresholds and the exact mapping from Franchise Grade to each non-default Start Contract:
PASS3_START_CONTRACT_UNLOCK_TUNING
PASS3 may tune those thresholds/mappings only inside this frozen structure:
- Franchise Grade source remains Total Job Mastery
- Franchise Grade remains the Start Contract availability gate
- Grade itself remains free of direct gameplay modifiers
- Distinct Boss Clear 1/3/6 unlocks remain a separate progression axis
- no legacy Day / Run-count / regular-customer / adventurer-level gate is silently restored
- direct Franchise Grade stat/economy bonus ladder
- Franchise Grade prestige/status
- Franchise Grade gating of selectable Start Contracts
- Franchise Grade or sufficient Total Job Mastery to derive it
- Start Contract availability derivable from Franchise Grade
### META-Q11 — FRANCHISE GRADE SOURCE / BOUNDARY
Grade derives from Total Job Mastery.
Grade itself adds no direct combat/NPC/economy/Relic/Item modifier.
Grade gates non-default Start Contract availability.
Legacy `day10` / `regular3` / `run1` / `level15` Start Contract gates are not silently retained as v2.5 Meta truth.
### META-Q15 — FRANCHISE GRADE START CONTRACT GATE
When Total Job Mastery changes Franchise Grade, Start Contract availability follows the canonical Grade unlock table.
An unlocked contract does not become active until the Player explicitly selects it for a Run.
### META-Q16 — SEPARATE PROGRESSION AXES
Distinct Boss Clear 1/3/6 remains independent from Franchise Grade Start Contract availability.
A Boss clear affects Start Contract availability only indirectly when the resulting Job Mastery changes Total Job Mastery enough to change Franchise Grade.
```

## REWORD — version framing removed (v2.8 lines)

"unchanged", "v2.7" / "v2.8" and "that remain" are version framing; the version heading becomes a JOB MASTERY subsection. The archive heading drops its version tag (the body keeps "final v2.7 Source/Design implementation" as the archive identity).

```text
- unchanged successful-clear identity
- unchanged Job×Boss matrix / distinct-Boss unlock roles
## RETIRED v2.7 FRANCHISE SYSTEM — INACTIVE ARCHIVE
Requirements that remain:
The active v2.8 Decoration system adds no system for:
This is the exact v2.8 baseline for the existing Premium Start Contract positive spawn-weighting
Its active reward effect is the exact v2.8 spawn-Level model below.
## JOB MASTERY — EXACT SPAWN-LEVEL MODEL
```

```new
- successful-clear identity
- Job×Boss matrix / distinct-Boss unlock roles
## RETIRED FRANCHISE SYSTEM — INACTIVE ARCHIVE
Requirements:
The active Decoration system adds no system for:
Its active reward effect is the exact spawn-Level model below.
### Exact spawn-Level model
```

## REWORD — BALANCE GATE rate-table sentence

"Its" pointed at the dropped "newest Store Capital amendment" line; it now names the Store Capital rate table directly.

```text
Its exact rate table above is the current `DIRECTOR DOCUMENT BASELINE` and must be validated
```

```new
The exact Store Capital rate table above is the current `DIRECTOR DOCUMENT BASELINE` and must be validated
```

## REWORD — version framing removed (v2.7 lines)

"v2.7", "keeps its existing", "remains … already owned by the inherited Meta/NPC design" are version / inheritance framing; the merged heading is new. Save v8 is still current (CORE_RUN_v2.8.0.md SAVE BOUNDARY).

```text
Therefore v2.7 does **not** spend implementation complexity preserving compatibility with older internal test Account/Meta saves whose schema or semantic meaning changed.
For v2.7 Save v8:
Job Mastery keeps its existing successful-clear identity:
- Job Mastery remains the job-specific successful conquest / permanent growth channel already owned by the inherited Meta/NPC design
## v2.7 SAVE RELATIONSHIP
```

```new
Therefore current internal v2.x builds do **not** spend implementation complexity preserving compatibility with older internal test Account/Meta saves whose schema or semantic meaning changed.
For Save v8:
Job Mastery successful-clear identity:
### Successful-clear identity
- Job Mastery is the job-specific successful conquest / permanent growth channel
## SAVE RELATIONSHIP
```

## REWORD — version framing removed (v2.6.0 lines)

"v2.5" framing removed. META-Q14 keeps its live XP/Grade hidden-modifier check; its Start Contract gate clause is retired (above), so the heading drops "/ GATES".

```text
The previous Global Meta XP / account-XP reward path is not part of v2.5 Canonical.
Fresh v2.5 account normal NPC Jobs are 전사/궁수/마법사/사제 until unlocks apply.
### META-Q14 — NO LEGACY POWER / GATES
```

```new
The previous Global Meta XP / account-XP reward path is not part of Canonical.
Fresh account normal NPC Jobs are 전사/궁수/마법사/사제 until unlocks apply.
### META-Q14 — NO LEGACY POWER
```

## REWORD — RELATED pointers name current v2.8 owner files

One RELATED list; older versioned or unversioned pointers now name the current files routed by SPEC_INDEX_v2.8.0.md. Duplicates (`boss clear signal -> BOSS`, `run save -> CORE_RUN`) merge into the kept pointer. The Job growth/mastery pointer now routes only Job growth to NPC_TRAIT: the Job Mastery effect is owned here (NPC_TRAIT_v2.8.0.md routes `Current Job Mastery effect -> META_v2.8.0.md`), so the old Base/Growth mastery routing is not revived.

```text
Economy / Wallet -> current ECONOMY_ORDER owner
Gate / Hazard -> current DUNGEON_HAZARD owner
Item Counter -> current ITEM owner
`CORE_RUN_v2.7.0.md` owns:
Run/save -> `CORE_RUN_v2.7.0.md`
Job growth/mastery effect channel -> `NPC_TRAIT_v2.7.0.md`
Boss clear signal -> `BOSS_v2.7.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.7.0.md`
boss clear signal -> BOSS
item unlock/effect -> ITEM
run save -> CORE_RUN
monster family knowledge -> DUNGEON_HAZARD
copy -> COPY_WORLD_VOICE
```

```new
Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
Gate / Hazard -> `DUNGEON_HAZARD_v2.8.0.md`
Item Counter -> `ITEM_v2.8.0.md`
`CORE_RUN_v2.8.0.md` owns:
Run/save -> `CORE_RUN_v2.8.0.md`
Job growth -> `NPC_TRAIT_v2.8.0.md`
Boss clear signal -> `BOSS_v2.8.0.md`
Final preparation/clear -> `FINAL_EXPEDITION_v2.8.0.md`
item unlock/effect -> `ITEM_v2.8.0.md`
monster family knowledge -> `DUNGEON_HAZARD_v2.8.0.md`
copy -> `COPY_WORLD_VOICE_v2.8.0.md`
```

## UNRESOLVED — stale product name in the D10 unlock toast copy

Kept verbatim in D10 / D14 PRODUCT UNLOCK — EXACT: the D10 copy line `새 상품 해금 · 길드 프리미엄 도시락`. The current ITEM_v2.8.0.md name is `길드 특제 도시락`; Source already shows `특제` in the toast; COPY_AUDIT_APPROVED_v2.8.0.md has no entry for this line. Needs a User decision; not changed here. (`세계수 생환부적` is current: ITEM id `tree`.)

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A1: the unlock toast names the current item (ITEM `premium` = 길드 특제 도시락), as Source does.

```text
- copy: `새 상품 해금 · 길드 프리미엄 도시락`
```

```new
- copy: `새 상품 해금 · 길드 특제 도시락`
```


## AMENDMENT — Decoration survival alternatives and prices (User decision 2026-09-24)

Each Slot gains a survival / combat alternative at the same price; prices x1.8 (display 800G);
acquisition target: first Decoration around Run 2-3, all four Slots around Run 10-11.

```text
1st Decoration : around Run 3-4
2nd            : around Run 6
3rd            : around Run 8-9
4th            : around Run 10-11
The initial Decoration-package content contains one Decoration in each Slot, but Account/Save/data/UI structures must not assume one Decoration forever.
Future content may add multiple alternatives to the same Slot.
sign    새벽배송 안내판     800 Store Capital
wall    길드 제휴 현판      700 Store Capital
counter 알뜰 금고          650 Store Capital
display 프리미엄 쇼케이스   550 Store Capital
The spread is deliberately narrow. The four measured within 1.37x of each other in Run value, so
a wider price spread would let price decide the pick instead of the effect.
```

```new
(User decision 2026-09-24: the first Decoration comes sooner, the four Slots fill by Run 10-11,
and a Boss clear becomes worth attempting after that. Collecting both Decorations of every Slot
is a longer tail beyond Run 11.)
Each Slot now holds two Decorations: an economy Decoration and a survival / combat alternative
(User decision 2026-09-24). A Slot still wears exactly one, so the pick is a choice between
running the store and keeping its people alive. Account/Save/data/UI structures must not assume
two per Slot forever either.
## SURVIVAL / COMBAT ALTERNATIVES — EXACT EFFECT IDENTITY
User decision 2026-09-24. One per Slot, beside that Slot's economy Decoration.
### wall — 의무실 현판
One roll per injured arrival, drawn only while the Decoration is worn. A heal sets Injury 0 and
is shown on the SALE counter and counted in the Day's record (UI_UX owns the presentation).
It resolves after 귀환석 / 세계수 생환부적, so carried Insurance is never wasted by it, and the
RESULT-PROOF counterfactual reads the same availability.
Both Decorations of a Slot cost the same, so price never decides between them. The display Slot
```


## AMENDMENT — Decoration placement by effect, 알뜰 금고 / 제휴 현판 / 쇼케이스 (User decision 2026-09-24)

Survival alternatives re-seated so the stronger effect is in the dearer Slot (new names), 구급품 진열장
saves twice, 제휴 현판 20%, 알뜰 금고 +500G, 프리미엄 쇼케이스 lifts Rare+ only. Superseded lines of the
previous amendment were removed from its new block above.

```text
each Morning, 10% chance of visitors +1
Run starting Gold +300G
rare-NPC rarity weights = [51, 30, 14, 4, 1]
channel reused by this Decoration. It changes only the rarity weights used by the ordinary NPC spawn
```

```new
### sign — 훈련소 제휴 간판 (id trainingRack)
### counter — 추모 방명록 (id memorialBoard)
Placement (User decision 2026-09-24): the survival alternative with the larger measured effect
sits in the dearer Slot; ids are kept from the first placement, names and art follow the Slot.
### display — 구급품 진열장 (id firstAidKit)
```


## AMENDMENT — economy Decorations strengthened, 훈련소 제휴 간판 50% (User decision 2026-09-24)

새벽배송 안내판 +2 offers, 길드 제휴 현판 25%, 알뜰 금고 40G every morning, 프리미엄 쇼케이스 lifts every
grade above 평범, 훈련소 제휴 간판 Level +1 at 50%. Superseded lines were removed from earlier new blocks.

```text
ORDER offer candidates +1
```


## AMENDMENT — v2.9.0 F5: menu routing / 이번 영업의 장식 / abandon flow / 점포 장식 tab / capital rates halved (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F5): the menu 점포지원 row opens the owned list when no Store Support window is purchasable; a read-only menu row 이번 영업의 장식; the DAY 0 `장식 구성 다시 보기` way back is retired; the codex tab 점포 관리 is labelled 점포 장식; 현재 지점 포기 discards the Run at once and returns to 새 점포 준비 with no Run (Decorations purchasable there), no automatic new Run; the Store Capital Day-reach rate table is halved (0.5 / 1 / 1.5 / 2 / 2.5%), prices unchanged. Earlier lines this batch supersedes were removed from the fences above in place.

```text
D1-9    = 1%
D10-19  = 2%
D20-24  = 3%
D25-29  = 4%
D30     = 5%
- **현재 지점 포기(Abandon)**: Run만 초기화. Account/Meta, Tutorial, 해금 상태는 유지.
```

```new
- **현재 지점 포기(Abandon)**: Run만 초기화. Account/Meta, Tutorial, 해금 상태는 유지. 포기 직후 영업이 없는 새 점포 준비 화면으로 돌아오며, 거기서 장식 구매·장착이 가능하다 (User 2026-09-24, v2.9.0).
```

## AMENDMENT — v2.9.1 balance (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1 balance, `reports/v29-balance-agreements.md` §3 / §4 / §6): start Gold 700G; segmented Death limit 5 / 8 / 11 with 추모 방명록 +2 and 위령제 +1 on every later segment; Store Capital rates 1 / 2 / 3 / 4 / 5%; Decoration prices 500 / 750 / 1000 / 1250; Decoration effects (+3 offers · 30% · 50G · 55% above 평범 · 65% · 45% · three saves). Earlier declarations this batch supersedes were removed from the fences above in place.

```new
(User 2026-09-25, v2.9.1 balance): back to 1 / 2 / 3 / 4 / 5% with the cheaper Decoration prices below. Buying a Decoration inside the first Run is still not a goal.
1st Decoration : around Run 4-6     (measured at the v2.9.1 balance; the 2026-09-24 expectation was Run 2-3)
all four Slots : around Run 9
ORDER offer candidates +3    (User 2026-09-25, v2.9.1 balance; was +2)
each Morning, 30% chance of visitors +1    (User 2026-09-25, v2.9.1 balance; was 25%)
every morning, store Gold +50G (DAY 1 included), shown on the day's receipt    (User 2026-09-25, v2.9.1 balance; was +40G)
rare-NPC rarity weights = [45, 31.5, 17.5, 4.75, 1.25]    (User 2026-09-25, v2.9.1 balance; was [50, 30, 15, 4, 1])
Every grade above 평범 is lifted (ordinary [60, 27, 10, 2.5, 0.5]): above 평범 40% -> 55%
(User decision 2026-09-24; 55% at the v2.9.1 balance 2026-09-25, each grade's lift × 1.5). This reuses the existing Premium spawn-weighting channel. It changes only the rarity weights used by the ordinary NPC spawn
every adventurer created while it is worn: 65% chance of spawn Level +1    (User 2026-09-25, v2.9.1 balance; was 50%)
an adventurer who arrives with an ordinary Injury (not 중상) is healed on arrival with 45% chance    (User 2026-09-25, v2.9.1 balance; was 35%)
every segment Death limit +2 (5 / 8 / 11 -> 7 / 10 / 13; CORE_RUN §DEATH LIMIT — SEGMENTED; User 2026-09-25, v2.9.1 balance)
up to three times per Run, a Death that no carried Insurance prevented becomes 중상    (User 2026-09-25, v2.9.1 balance; was twice)
`DIRECTOR DOCUMENT BASELINE` (User decision 2026-09-24; prices 2026-09-25, v2.9.1 balance — cheapest 500, dearest 2.5×, total 3,500)
sign    새벽배송 안내판 / 훈련소 제휴 간판   1250 Store Capital
wall    길드 제휴 현판 / 의무실 현판        1000 Store Capital
counter 알뜰 금고 / 추모 방명록             750 Store Capital
display 프리미엄 쇼케이스 / 구급품 진열장     500 Store Capital
is the cheapest so a first Decoration is the earliest within reach.
User decision 2026-09-25 (v2.9.1 balance): the rate table (1 / 2 / 3 / 4 / 5%), the prices (500 / 750 / 1000 / 1250) and the Decoration effects were set together with the Run balance and measured (`reports/v29-balance-ideal.md`); the measured acquisition (first Decoration Run 4-6, four Slots Run 9) is later than the 2026-09-24 expectation (Run 2-3) and is reported, not tuned here.
```
