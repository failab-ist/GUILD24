# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline,fresh_init,tutorial_reset,meta_settlement,pre_run_loadout,boss_information_order
DOC_VERSION=2.9.14
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.10.2
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## KEY

runLength=30 days
targetPlaytime=30–50 min
turnBased=YES
realTimeGameplay=NO

startGold=700G
inventoryCapacity=18
dailyOverhead=DayAndCoreRosterScaled
baseVisitors/day=3–6
dailyOrderOffers=6

phases=[MORNING,ORDER,SALE,NIGHT,CLOSING]
D30=Final Expedition / Boss

save=localStorage
soundDefault=MUTED
serverRequired=NO
externalAPIRequired=NO

## RUN FANTASY

30일 동안 던전 앞 GUILD24를 운영한다.

하루의 발주 → 판매 → 원정 결과 → 점포 결산이 누적되어 Store Build · Inventory Strategy · NPC 성장 ·
Wallet/Loyalty/Revisit · Final Expedition 전력을 만든다.

D30은 별개의 미니게임이 아니라 앞선 29일의 판단을 시험하는 Run 결산이다.

## PRE-RUN FLOW

The pre-Run flow has no Start Contract selection.

    new Run preparation
    -> inspect/equip owned Decoration loadout
    -> confirm Run start
    -> DAY 0 first 점포지원 choice (pick one free, or defer it: RELIC §ACQUISITION WINDOWS D0)
    -> enter DAY 1 MORNING
    -> D0 first-Morning Boss briefing
    -> ordinary DAY 1 MORNING flow

Decoration loadout is frozen after Run start.
The pre-Run management screen must have a valid return path to new-Run preparation.

The D0 Boss objective is not embedded above/inside the first Store Support decision (→ §D0 FIRST-MORNING BOSS BRIEFING — EXACT).
"D0" is the Boss-information cadence name; it does not mean the briefing is displayed on a separate playable DAY 0 phase.

## D0 FIRST-MORNING BOSS BRIEFING — EXACT

Purpose: bridge the opening / first-support setup into the actual 30-Day Run objective before the Player makes the
first ordinary Morning decision.

Trigger:
- only after the first DAY 0 점포지원 choice has resolved (picked or deferred);
- only when the Run has entered DAY 1 MORNING;
- before the ordinary DAY 1 Morning Event, Gate detail, ORDER entry or any other ordinary Morning
  information / decision surface.

This is an information beat, not a new gameplay Phase. Opening the D0 briefing:
- advances no time;
- consumes no Gameplay RNG;
- spends no Gold / Store Capital;
- changes no Inventory, NPC, Gate, Event, Store Support or Boss state;
- does not itself generate the Boss identity, Trait or Final state.

The briefing owns no Boss reveal beyond the Run objective / investigation cadence.
Exact Player-facing copy -> COPY_AUDIT_APPROVED_v2.8.0.md.
Boss information boundary -> BOSS_v2.8.0.md.
Presentation -> UI_UX_v2.8.0.md.

Acknowledgement:
- one `확인` action completes the beat;
- ordinary DAY 1 Morning flow must not advance past this beat until it is acknowledged;
- closing / escaping the presentation, if the shell technically permits it, does not consume the beat;
- acknowledgement marks the D0 beat seen and persists that state before ordinary Morning resumes.

Save / Load:
- a fresh Run receives this beat exactly once;
- a save made while the DAY 1 beat is still unresolved must still owe the briefing after reload;
- after acknowledgement, reload must not replay it;
- the beat is not implemented as a `day >= 1` catch-up reveal;
- a save already beyond DAY 1 must not receive a retroactive D0 briefing merely because an older
  save lacks the seen marker.

After acknowledgement, the existing Morning owner resumes its normal ordering. D0 does not create a
second Morning Event, second Store Support window or extra decision.

## DAILY PHASE FLOW

Canonical order:

MORNING
→ ORDER
→ SALE
→ NIGHT
→ CLOSING
→ next Day

Phase는 턴 기반으로 진행한다. 시간 경과를 요구하는 Real-time Gameplay는 없다.

### MORNING
question=`오늘 어떤 날인가?`

Purpose: 오늘 상황 파악 · 방문 예상 · 열린 Gate / 알려진 위험 확인 · Event 확인.

Morning은 상황 읽기 단계다. 발주/판매/결산을 한 화면에 섞지 않는다.

### ORDER
question=`무엇을 준비할까?`

Purpose: 상품 선택 · 수량 선택 · Gold 배분 · 재고 공간 판단 · Reroll 판단 · 오늘 Gate/Hazard에 맞춘 즉시 준비 ·
다음날 Tier 확률을 미래 보조 정보로 활용.

Order timing:
- Order is same-day replenishment
- confirmed stock enters Inventory before the current Day SALE
- current-day Gate/Hazard information is already known before Order commitment
- no next-day forecast is shown; today's Gates are the whole planning context

Within ORDER, confirming a purchase does **not** advance the phase.
The Player enters SALE only through the separate `영업 시작` action defined by `ECONOMY_ORDER_v2.8.0.md` / `UI_UX_v2.8.0.md`.

Canonical economy/order -> ECONOMY_ORDER_v2.8.0.md

### SALE
question=`이 손님에게 무엇을, 얼마에 팔까?`

Purpose: 한 명의 NPC를 관찰 · Item 선택 · Price 선택 · 현재 이익 vs NPC 투자 판단.

Canonical -> SALE_v2.8.0.md

### NIGHT
question=`내 선택이 어떻게 됐을까?`

Purpose: NPC별 원정 결과 · 실제 준비 영향 · 성장/부상/사망 확인.

Canonical -> NIGHT_CLOSING_v2.8.0.md

### CLOSING
question=`오늘 장사는 어땠을까?`

Purpose: Revenue · COGS · Margin · Overhead · Waste · Relic spend · Final Gold.

Canonical -> NIGHT_CLOSING_v2.8.0.md

## START STATE

At new run:

Gold=700G
InventoryCapacity=18

Stock:
```text
삼각김밥 ×1
생수 ×1
진정 허브티 ×1
하급 포션 ×1
```

`bandage` is not an active Item ID. No legacy Bandage stock is silently converted into 진정 허브티.

No hidden extra starting resources.

Item identity/prices/effects -> `ITEM_v2.8.0.md`.

## FIRST-RUN LESSONS

The account's first Run - no Run settled yet (`account.runs` 0) - teaches by play, not by text: the situation leaves one
sensible move, and the Night shows why it worked. Every later Run is the ordinary Run. Nothing here is shown as a
tutorial except the HQ 구급키트 and the DAY 3 payday customer, each told once by a mark (User 2026-10-02), and no lesson adds a draw to the Run's own random stream (an adventurer a lesson keeps alive then takes the
draws a living adventurer takes).

- DAY 1: one Common Item that counters the first Gate's Hazard joins the warehouse after the DAY 0 pick (독 방진마스크 ·
  부식 중화 탄산수 · 냉기 컵라면 · 화염 얼음컵 · 공포 집중 사탕). It is ordinary visible stock, not a hidden resource.
- DAY 2: the Day's Normal Event is `본사 1+1 행사` (EVENT §02), the one Event before DAY 3 (EVENT §EVENT TIMING / FREQUENCY).
  The ordinary Event roll still draws and its result is ignored, and no pick is drawn; it is revealed and logged like any
  Event, so the Run never meets it twice. The first Event slip carries the first Event coach mark (UI_UX §FIRST EVENT
  TUTORIAL).
- DAY 1~2: no one dies. An expedition whose Death roll lands settles as 중상 instead (the ordinary 중상: the adventurer
  sits out and recovers). DAY 3 on is the ordinary Run.
- the first Day, DAY 2 on, that an adventurer with an ordinary Injury can come (User 2026-10-02; once per Run): it comes
  first - one already coming moves to the front, else one takes the last returning visitor's place (its Gate and visit
  income as that visitor's; a new face seated today is never the one replaced) - and one 구급키트 joins the warehouse (HQ's,
  like the opening stock); the injured visitor also brings the kit's 정가 (160G) to spend this visit only (the nightly-cleared
  extra-purchase channel, User 2026-10-02), so it can always pay for it. A Day with no one injured moves nothing and brings no
  구급키트; the lesson waits. When it comes, that Day's ORDER marks it once (UI_UX §TUTORIAL — COACH DIET, COPY_AUDIT §3-12).
- DAY 3: a returning visitor (not the injured one; a healthy one first) comes on payday: +200G to spend this visit
  only (the nightly-cleared extra-purchase channel), its first 150% offer it can pay for taken - once, every later one
  decided as any customer's (User 2026-10-02), its SALE mark on its wallet (COPY_AUDIT §3-13; it does not say the first is
  sure) - and the arrival line
  COPY_AUDIT §26-1. The Day's count of visitors is unchanged.
- measurement harnesses (`reader` and the other bots, the multi-Run trajectory) switch the lessons off, so balance
  measurements stay on the ordinary Run.

## RUN START EFFECT APPLICATION

Active Decoration effects read from the Run's frozen loadout.
Run-start effects come only from the frozen active Decoration loadout; no contract state contributes in parallel.

## INVENTORY

baseCapacity=18

Inventory stores physical stock units. Shelf-life/expiry behavior is Item/stock data.
When multiple units of same Item exist, UI may stack them, but physical stock state remains preservable.

Sale depletion: nearest-expiry unit first.

Capacity modifiers may come from explicit Relic effects.

Canonical -> ITEM_v2.8.0.md / SALE_v2.8.0.md

## DAILY ECONOMIC BASE

dailyOverhead follows the Day AND the roster the Store has actually built:

`overhead = (90 + 5 x (Day - 1)) x (1 + 0.02 x (coreAvgLevel - 1)) x (1 + 0.06 x coreAvgRarity)`
charged rounded to 10G.

Core Roster = the six best living adventurers, by Level then Rarity (all of them if fewer). Do not average the whole
pool (that would pay the Store to hoard Level-1 bodies to dilute the figure).
Nothing is persisted; both averages derive from the roster as it stands.

Any later base-overhead change requires:
- integrated v2.5 multi-seed evidence
- minimal-engagement vs normal-play comparison
- Designer approval

Base order offers: 6/day. Base visitors: 3–6/day.

Visitors may be modified by Relics, Events and Living NPC Cap. Visitor modifiers must respect Living NPC Cap rules.

Canonical -> ECONOMY_ORDER_v2.8.0.md / NPC_TRAIT_v2.8.0.md / RELIC_v2.8.0.md

## PERSISTENT NPC ROSTER

NPCs persist within a Run. Persistent state may include: identity · Job · level/stats · Traits · Wallet · Loyalty ·
injuries · fatigue/conditions · alive/dead state · visit/history state.

Dead NPC remains dead for the Run and does not return as a normal visitor.

Living NPC capacity, recovery/death slot semantics, newcomer/revisit behavior -> NPC_TRAIT_v2.8.0.md.
CORE_RUN does not redefine the NPC cap or visitor-pool algorithm.

## GATE / DUNGEON STATE

Dungeon generation follows -> DUNGEON_HAZARD_v2.8.0.md

Generated Day/Gate state must remain stable for that Day.

Save/Load must not become a Gate reroll, Family reroll, Tier reroll, Relic offer reroll or Order-state exploit.

Random results that are meant to be fixed before player choice must be persisted or deterministically reproducible.

## RELIC WINDOWS

Relic windows:
[D0,D5,D10,D15,D20,D25,D30]

Canonical acquisition/state -> RELIC_v2.8.0.md

D0 relic choice occurs before first normal business flow.
D30 relic purchase closes before Final Expedition lock.

## FINAL TIMELINE — EXACT

Reuse existing Morning/management/SALE/Final surfaces; do not add a new permanent Final dashboard or a separate combat-game Phase.

```text
D0  : inform Player that D30 Final is the Run objective
D5  : Boss information flow owned by BOSS
D10 : Boss investigation beat owned by BOSS
D15 : additional Boss information flow owned by BOSS
D20 : Recon dispatch beat
D25 : exact Final Family Pair / Hazard Pool generated, revealed, persisted
D30 : reuse the persisted D25 Final state exactly; resolve Final as 출전 NPC 선택 -> FINAL 준비 -> 결과
```

D20 Recon creates no separate combat/minigame/resource system.
Its gameplay payoff is the D25 exact Final Family/Hazard disclosure owned by `FINAL_EXPEDITION_v2.8.0.md`.

D25 does not grant:
- guaranteed Counter stock
- free Final Item
- special D25 shop
- forced correct preparation

The remaining D25~D29 Order / Stock / NPC growth / preservation decisions are the preparation window.

## BOSS INFORMATION TIMELINE

Run presentation order includes:

    D0  first 점포지원 choice -> objective / investigation starts
    D5  identity report
    D10 second investigation start
    D15 exact Trait report
    D20 final reconnaissance start
    D25 exact Final Family/Hazard report
    D30 no new report

D0: the first Store Support choice resolves first, then the D0 Boss briefing is the first DAY 1 MORNING presentation
step; D0 is informational, does not become a permanent Phase, and does not replay after consumption
(→ §D0 FIRST-MORNING BOSS BRIEFING — EXACT).

On D5/D10/D15/D20/D25: Boss information occurs before the same-Day Store Support decision.
D10/D20 each persist a consumed/seen state so reload cannot replay them.

Exact content -> BOSS_v2.8.0.md / COPY_WORLD_VOICE_v2.8.0.md.

## D25 STATE SAFETY

For every normally created valid v9 Run:
- D25 Final generated state is persisted when created.
- Save/Load cannot reroll it.
- D30 reads that exact persisted state.

### Development / controlled-migration repair boundary

If a development fixture, development Save, or explicitly controlled migration/debug state is already represented as a v9 Run at D25+ but lacks the required Final prereveal state:

```text
first valid entry
-> generate the authoritative Final Family Pair / Hazard Pool exactly once
-> persist immediately
-> all later loads reuse that persisted state
```

Rules:
- use the same authoritative seeded/fixed Final-selection principle as ordinary D25 generation
- this is a one-time repair, never a reroll/fishing path
- normal valid v9 Player Saves must already contain the D25 state
- this boundary does not authorize v1~v8 Player Run continuation into v9
- malformed ordinary Player state must not repeatedly regenerate the Final state on entry/reload

## D30 FINAL

D30=Final Expedition / Boss Day. It is the Run culmination and must reuse the systems built during the Run rather than
introducing a separate combat minigame.

Final Family selection / disclosure · Final Hazard Pool · Final party size / survivor fallback · Final Power / Roll /
clear comparison · Run Clear / Fail · Final-specific balance and QA -> FINAL_EXPEDITION_v2.8.0.md

Boss identity / Boss Trait / Sloth Seal state -> BOSS_v2.8.0.md

After the already-known D25 Final state and the D30 Relic/SLOTH decision are resolved:

```text
Final participant selection
-> Final preparation
-> Final Lock
-> one Final result
```

Rules:
- participant selection is confirmed before Final preparation begins
- Final preparation reuses the familiar two-slot Item handling layer; it is not a new top-level day-loop Phase and not a separate combat minigame
- Final preparation uses the current Final-owner fixed 50% / 매입가 amount, real NPC Wallet affordability, real stock consumption, and no refusal RNG
- 100% / 150% price choices are not used in Final preparation
- each committed Final transfer increases Player Gold by the exact fixed transfer amount
- each committed Final transfer increases ordinary Gross Sales by the exact fixed transfer amount exactly once
- GREED therefore reads those committed Final transfer amounts in its Final-Lock Gross Sales snapshot
- selected participants are processed according to `FINAL_EXPEDITION_v2.8.0.md` / `SALE_v2.8.0.md`
- after committed Final Item transfers begin, Save/Load must not reopen participant selection or erase committed transfer state for fishing
- after all selected participants finish Final preparation, Final Lock snapshots the authoritative Final state and one result resolves
- no second free-equip/preparation step exists after Final preparation

Normal management actions may not retroactively change Final state after lock.

## SAVE / LOAD

Storage: localStorage

Save must preserve enough Run state to resume without changing already-generated choices/results. At minimum preserve:
- Day
- Phase
- Gold
- Inventory units/state
- NPC persistent state
- current Gate state
- current Order state where relevant
- Relic owned/window state
- Events/choices that affect current Run
- Final generated state when applicable
- Boss generated/reveal state when applicable
- Sloth opportunity/Seal state when applicable
- seeded/random state required for deterministic continuation

Save/Load must not intentionally provide free rerolls.

Save schema may invalidate incompatible local saves when schema changes.
Do not maintain compatibility branches solely for unsupported save formats.

### SAVE v9 — EXACT

```text
KEY = guild24.save.v9
Envelope version = 9
Export version = 9
Validation version = 9
run.version = 9
LEGACY = v1~v8
```

Current release-policy context:

```text
v2.x = internal development / test line
v3.0.0 = current external-public-release target
```

Rules:
- New Run initializes `run.version=9`.
- v1~v8 **Run state** cannot continue as a current v9 Run.
- v1~v8 **Account/Meta state** is not migrated into v9.
- Do not add compatibility conversion merely to preserve internal-test progression.
- When only legacy v1~v8 data exists, show old-version/fresh-start guidance and initialize a fresh current v9 Account/Meta + fresh current v9 Run rather than importing legacy progression.
- Do not automatically delete original legacy bytes; they need not be destructively deleted merely to reject migration. Storage cleanup remains under the existing reset/storage policy.
- Full Data Reset remains the explicit game-owned current-data deletion action.

### SAVE BOUNDARY

Current internal save generation is v9; saved Item, Decoration, Store Support, Event and Family ids are the v9 ids, and
no migration from earlier generations is kept.

Do not choose a new save generation merely because player-facing names/effects changed.

### DEEP EXPEDITION SAVE CONTRACT

Deep Expedition is Run state. Save/Load preserves:
- this Run's D7/D14/D21/D28 occurrence schedule
- today's chosen base Gate once generated/revealed
- unassigned / assigned / expired state
- nominated NPC
- sponsorship-paid state
- replaced destination
- already-generated result

Reload must not:
- reroll the schedule or chosen base Gate
- duplicate/refund sponsorship
- reopen a consumed/expired nomination
- create a second expedition/result

## CURRENT RUN ABANDON

Player-facing action: `현재 지점 포기`

Confirming `현재 지점 포기` means:
**abandon the current Run with no settlement, at once: `run = null`, and return to 새 점포 준비 (no Run).**
No new Run starts by itself. On that screen Decorations can be bought and equipped (META §DECORATION COLLECTION / LOADOUT); the next Run starts only when the player chooses `첫 점포지원 고르기`, on the ordinary fresh-Run start path.

Abandoned Run must NOT trigger:
- `Meta.finish()`
- Run settlement
- Job Mastery
- Boss Clear credit
- Job × Boss matrix mutation
- unlock/reward grant
- Run-completion reward
- `runs` / `wins` progress
- any other benefit derived from the abandoned Run

Account-scoped state is preserved: `account.matrix` · derived Meta progression · Monster Knowledge · earned unlocks and
unlock-toast state · Tutorial completion · Settings · other account-scoped persistent state.

Run-scoped state is discarded: Day / Phase / Gold / Inventory · Run NPC roster · Run Relics / facilities ·
Gate / Event / Order state · Deep Expedition schedule / assignment / sponsorship / result · Boss / Final state ·
all other run-scoped state.

The next Run uses the ordinary fresh-Run start path. Do not add a reset-only initialization path.

Full game-data reset is a separate action and deletes account-scoped progress, Knowledge, unlocks, Tutorial and Settings.

## FULL RESET

Full Reset returns to the same account state as a true first launch:
- Run fresh
- Account/Meta fresh
- Tutorial fresh
- D10/D14 unlocks fresh
- unlock-toast state fresh

Tutorial must appear again after Full Reset.

Full Reset is the explicit action that deletes current/backup/legacy game-owned save data.

## FRESH INITIALIZATION / TUTORIAL RESET — EXACT

A true fresh initialization must be tutorial-eligible.

`Fresh initialization` includes:
- no valid current v9 Account/Run exists and a new v9 state is created
- Full Data Reset is completed and the game creates a new current state
- only legacy v1~v8 internal-test state exists and current policy rejects migration, causing fresh v9 initialization

Exact tutorial boundary:

```text
fresh current Account/Run
-> tutorial completion / dismissal state = not completed
-> tutorial entry must be eligible on the first applicable new-game flow
```

Rules:
- Full Data Reset must clear any game-owned tutorial-complete / tutorial-dismissed flag that would suppress the fresh tutorial
- stale legacy tutorial flags must not suppress tutorial on a fresh v9 initialization
- Run Abandon / ordinary new Run does **not** by itself reset tutorial completion while the same current Account/Meta remains
- do not create a second tutorial system; reuse the existing tutorial implementation if it exists
- implementation adoption must audit the current tutorial trigger/persistence path
- if the existing tutorial is present but its reset/trigger path is broken, fix that path rather than replacing the tutorial wholesale

Exact tutorial content/presentation -> `UI_UX_v2.8.0.md`.

## RUN-END STORE CAPITAL SETTLEMENT

Normal Run end settles Store Capital exactly once from accumulated actual Gross Sales and the reached-Day band.
Exact formula/rates -> META_v2.8.0.md.

Bankruptcy, Death-limit closure, Final failure and Boss CLEAR are eligible normal endings.
Manual Run Abandon yields 0 Store Capital.

Ending Gold / remaining Inventory are not Store Capital inputs.

## RUN RANDOMNESS

Randomness should create different early Family mixes, customer histories, Item availability and Relic Build
opportunities: different but playable Runs.

Randomness should not make:
- one required Build Piece mandatory
- one last-day NPC determine the Run
- correct preparation meaningless
- reload the optimal strategy

Seeded reproduction should be possible for QA/debug if the project supports a seed input.
Seed UI/debug controls are not core player progression.

## DEATH LIMIT — SEGMENTED

A Run ends at Closing when the Run's cumulative Death count reaches the limit of the segment the current Day is in:

```text
D1~D10   5
D11~D20  8
D21~D30  11
```

- the count is cumulative over the whole Run (it never resets at a segment boundary); only the limit steps up
- 추모 방명록 adds +2 to every segment limit (`META_v2.8.0.md`)
- the 위령제 Event adds +1 to every segment limit from the Day it occurs to the end of the Run (`EVENT_v2.8.0.md`)
- the current count and the current segment limit are always visible on MORNING and ORDER (`UI_UX_v2.8.0.md`)
- death management must matter in every phase: no later rule may make the late-Run limit effectively unreachable
- checked at Closing before the money branch; it uses the existing ending copy

## FAILURE / LOSS PRINCIPLE

Weak NPCs may be ignored or lost. The game does not need a separate punishment subsystem merely to force care.

Their loss should matter through existing long-term systems: lost growth · lost Wallet · lost Loyalty/Revisit ·
lost future sales · lost Final roster value.

Canonical NPC value -> NPC_TRAIT_v2.8.0.md

## META / CROSS-RUN BOUNDARY

Core Run identity resets each Run.

Cross-run progression / Knowledge / unlock truth is owned by -> META_v2.8.0.md

There is no Global Meta XP. Run Day advancement itself grants no Job Mastery or Boss-clear progress.

No cross-run power carries over, with one explicit exception:
- visible Job Mastery adjustment may affect that Job's Base Stats / Growth only when defined by NPC_TRAIT / META
- no hidden account-wide combat multiplier is allowed

Boss-generated run state is Run state and must be persisted without reroll.
Boss identity / reveal / trait / Sloth state ownership -> BOSS_v2.8.0.md

## PRODUCT / TECH CONSTRAINTS

platform=browser
orientation=PC-first, mobile-supported
architecture=static/local
dataDriven=YES
localAssets=YES
externalAPI=NO
requiredServer=NO
soundDefault=MUTED

No gameplay system should depend on live backend availability.

## OUT-OF-SCOPE CORE SYSTEMS

Do not add as core gameplay:
- real-time combat
- Panic/업무 mode
- Tiny Guild combat module
- flavor-only standalone subsystems

Flavor should use existing phase / event / dialogue / item / trait / relic / result systems where possible.

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### RUN START / INITIALIZATION

#### RUN-Q01 — NEW RUN INITIALIZATION
SETUP:
Start a new run.

EXPECT:
- Day=1 normal flow starts after D0 setup
- current Run baseline is `Gold=700G`, `InventoryCapacity=18`
- start stock is owned by `CORE_RUN_v2.8.0.md` / `RUN-Q72`
- no unintended extra resources

PASS:
All starting values match canonical state.

#### RUN-Q-v29-DL — SEGMENTED DEATH LIMIT

Rule -> §DEATH LIMIT — SEGMENTED.

Controlled Runs reaching cumulative Deaths 4 / 5 on D10, 5 on D11, 7 / 8 on D20, 10 / 11 on D30; each with and without
추모 방명록, and with a 위령제 on an earlier Day.

PASS:
- the Run ends at Closing exactly when the cumulative count reaches the current segment limit 5 / 8 / 11
- the count never resets at a segment boundary; 5 Deaths by D10 ends the Run, 5 Deaths first reached on D11 does not
- 추모 방명록 adds +2 to every segment; 위령제 adds +1 to every segment from its Day
- MORNING and ORDER always show `사망 {n} / {limit} · D{end}까지` with the limit in force, warning color at one left

#### RUN-Q02 — D0 RELIC BEFORE BUSINESS
SETUP:
Start a new run.

EXPECT:
D0 Foundation Relic selection occurs before first normal business loop.

PASS:
Player can resolve D0 Relic choice before D1 Morning/Order flow.

#### RUN-Q72 — START STOCK

Fresh Run starts with exactly:
- 삼각김밥 ×1
- 생수 ×1
- 진정 허브티 ×1
- 하급 포션 ×1

PASS:
- no active 붕대 in start stock
- same four-unit start count

#### RUN-Q-v28-1 — NO ACTIVE START CONTRACT / FRANCHISE

PASS:
- new Run does not require Start Contract selection
- no Franchise Grade locks Run start
- Run uses frozen Decoration loadout

#### RUN-Q-v28-2 — LOADOUT FREEZE

PASS:
- only owned Decorations selectable
- max one active Decoration per Slot
- loadout fixed after Run start
- reload preserves same Run loadout

### DAILY PHASE FLOW

#### RUN-Q03 — PHASE ORDER
SETUP:
Play a normal day.

EXPECT:
MORNING
→ ORDER
→ SALE
→ NIGHT
→ CLOSING
→ next Day

PASS:
No phase is skipped/reordered unless explicitly caused by valid zero-content flow.

#### RUN-Q04 — ZERO CUSTOMER FLOW
SETUP:
Force/seed a day with zero Sale customers if supported.

EXPECT:
Sale resolves without softlock and proceeds to Night.

PASS:
No blocked progression.

#### RUN-Q05 — ZERO NIGHT RESULT FLOW
SETUP:
Enter Night with no expedition result.

EXPECT:
Night proceeds directly to Closing.

PASS:
No blocked progression.

#### RUN-Q65 — ORDER TO SALE BOUNDARY

EXPECT:
- order confirmation leaves phase ORDER
- only separate `영업 시작` enters SALE

PASS: no implicit phase advance in confirm path.

#### RUN-Q17 — TURN-BASED ONLY
SETUP:
Play all core phases.

EXPECT:
No gameplay decision depends on real-time countdown/reflex input.

PASS:
Entire core loop is turn-based.

### DAILY ECONOMY / VISITORS

#### RUN-Q06 — DAILY OVERHEAD
SETUP:
Complete a normal day.

EXPECT:
- current overhead must follow the current `CORE_RUN_v2.8.0.md` / Closing economy truth
- exactly one base overhead charge occurs per completed normal Day

PASS:
Closing and final Gold use the same actual overhead value,
with no duplicate/missing charge and no silent balance change.

#### RUN-Q07 — BASE VISITOR RANGE
SETUP:
Generate multiple normal days without visitor-count modifiers.

EXPECT:
Base visitors are within 3–6/day.

PASS:
Observed base generation respects range.

### NPC PERSISTENCE

#### RUN-Q08 — NPC PERSISTENCE
SETUP:
Meet an NPC, then continue multiple days.

EXPECT:
Persistent NPC state survives across days:
- identity
- Job
- level/stats
- Traits
- Wallet/Loyalty
- conditions
- alive/dead state

PASS:
No unintended reset between visits.

#### RUN-Q09 — DEAD NPC REMOVAL
SETUP:
Cause one NPC to die.

EXPECT:
- death remains permanent for the Run
- NPC does not visit again
- NPC does not consume Living NPC Cap

PASS:
All three conditions hold.

### SALE

#### RUN-Q25 — SALE ATOMIC COMMIT
SETUP:
Complete a paid purchase and inspect all affected state immediately.

EXPECT:
Wallet, Player Gold, physical Inventory unit, NPC bag, Consumer Slot, applicable Loyalty/history update together as one committed purchase.

PASS:
No partial purchase state exists.

#### RUN-Q26 — CONSUMER SLOT CONTRACT
SETUP:
Sell to normal NPC and Lv10+ NPC.

EXPECT:
- normal visit purchase cap=2 Items
- every ordinary SALE Bag has exactly 2 slots (`SALE_v2.8.0.md`)
- all sellable Inventory remains visible despite remaining-slot count

PASS:
No hidden/infinite extra-slot behavior exists.

#### RUN-Q27 — CUSTOMER FINALIZE LOCK
SETUP:
Finalize a Customer after purchases, then attempt normal management changes before Night.

EXPECT:
Committed purchases/destination/expedition preparation cannot be retroactively altered by normal management actions.

PASS:
Finalized Customer state is stable.

#### RUN-Q28 — VALID NO-SALE CHOICE
SETUP:
Process a Customer and deliberately sell nothing.

EXPECT:
Customer can be finalized with zero purchases without artificial punishment subsystem or softlock.
Existing downstream preparation/future-value consequences may still occur.

PASS:
No-sale remains a valid strategic action.

### SAVE / LOAD STABILITY

#### RUN-Q10 — DAY/GATE STATE STABILITY
SETUP:
Enter a Day with generated Gate state.
Save/Reload before resolving the Day.

EXPECT:
Generated Gate/Family/Tier state remains unchanged.

PASS:
Reload is not a reroll.

#### RUN-Q11 — ORDER STATE STABILITY
SETUP:
Generate Order offers.
Save/Reload before confirming order.

EXPECT:
Current offer state remains stable.

PASS:
Reload does not generate better/different offers unless a canonical reroll action was used.

#### RUN-Q12 — RELIC STATE STABILITY
SETUP:
Open a Relic window and record candidates/prices.
Save/Reload.

EXPECT:
Same candidates/prices/window state.

PASS:
Reload is not a Relic reroll.

#### RUN-Q13 — NIGHT RESOLUTION STABILITY
SETUP:
Resolve a Night outcome, save during/after result presentation, reload.

EXPECT:
No duplicated or changed:
- outcome
- EXP
- Loot
- Injury
- Death
- reward

PASS:
Resolution is stable.

#### RUN-Q19 — SAVE/RESUME COMPLETE STATE
SETUP:
Save at multiple phases and reload.

EXPECT:
Resume restores enough state to continue without:
- free reroll
- duplicate reward
- lost committed sale
- lost NPC condition
- changed Gate

PASS:
Run continues consistently.

#### RUN-Q31 — BOSS RUN-STATE SAVE
SETUP:
Save/reload before and after D5/D15 and during a SLOTH run.

EXPECT:
Boss ID, reveal-seen flags, selected Sloth opportunity Days, and committed Seal Break count remain stable.

PASS:
Run save cannot reroll or duplicate Boss progression.

#### DEEP SAVE
PASS:
- occurrence schedule stable across reload
- selected base Gate stable after generation/reveal
- nomination stable
- sponsorship not duplicated/refunded
- destination replacement stable
- expired/consumed opportunity cannot reopen
- resolved expedition/result cannot reroll

### SAVE VERSION / LEGACY SAVE

#### RUN-Q70 — SAVE V9 EXACT

EXPECT:
- key `guild24.save.v9`
- envelope 9
- export 9
- validation 9
- new Run `run.version=9`

PASS only if all are 9.

#### RUN-Q62 — LEGACY SAVE SAFETY

SETUP: leave v1~v8 save bytes with no valid v9 current save.
EXPECT:
- cannot continue old run
- clear fresh-start guidance
- legacy source bytes remain untouched

PASS: no migration and no auto-delete.

#### RUN-Q71 — LEGACY INTERNAL SAVE REJECTION / FRESH V8

SETUP:
- no valid current v9 save
- valid v8 internal-test save with known Account/Meta progression and active Run

EXPECT:
- v8 Run state does not continue
- v8 Account/Meta progression is not imported into v9
- a fresh current v9 Account/Meta is created
- a fresh current v9 Run is created
- no old Franchise Grade / Start Contract / Job Mastery / Boss matrix / Monster Knowledge conversion shim runs
- legacy bytes need not be destructively deleted merely to reject migration

PASS:
current v9 starts clean without compatibility logic for older internal-test progression.

#### RUN-Q-v28-6 — ITEM ID REUSE / SAVE

The meal / water ids are `lunchbox` / `kingwater`; no reused id remains to test.

PASS:
- no active Item carries a v2.8-reused id (`bar`, `herobar`)
- no second legacy Hotbar Item is created

### BOSS / FINAL TIMELINE

#### RUN-Q-v28-5 — BOSS INFORMATION ORDER

D0:
- first Store Support choice is shown and committed (picked or deferred) before D0 Boss information
- D0 Boss objective is not embedded in the Store Support takeover
- after the support choice, D0 opens as a separate information beat
- acknowledging D0 proceeds to ordinary DAY 1
- reload does not duplicate a consumed D0 beat
- presentation consumes no extra gameplay RNG

For D5/D10/D15/D20/D25:
- due Boss information is shown before same-Day Store Support decision
- D10/D20 dismiss state persists
- reload does not replay a consumed report
- showing a report consumes no gameplay RNG

D30:
- no new Boss reveal
- uses persisted D25 Final state

#### RUN-Q73 — FINAL TIMELINE

Across a normal Run:
- D0 Final objective notice exists
- D10 FINAL20 signal
- D20 FINAL10 + Recon beat
- D25 exact Final Family Pair/Hazard Pool is generated/revealed/persisted
- D30 reuses that exact state

PASS: no separate permanent Final dashboard/phase is required.

#### RUN-Q74 — D25 SAVE/LOAD STABILITY

Record D25 Final Family Pair/Hazard Pool, save/reload, reach D30.

PASS:
- exact same Pair/Pool remains
- no reroll on reload
- no D30 regeneration

#### RUN-Q75 — D25 NO FREE ANSWER

PASS:
D25 prereveal does not itself grant:
- guaranteed Counter stock
- free Final Item
- special Final shop

Remaining preparation uses ordinary management systems.

#### RUN-Q77 — D25 CONTROLLED REPAIR IS ONE-TIME

SETUP:
Use only a development fixture, development Save, or explicitly controlled migration/debug state that is already represented as v9 at D25+ but lacks the required Final prereveal state.

EXPECT:
- first valid entry generates the authoritative Final Family Pair/Hazard Pool exactly once using the ordinary seeded/fixed selection principle
- generated state persists immediately
- save/reload and later entry reuse the exact same state
- no second generation/reroll path exists

PASS:
- repair cannot be used for Final fishing
- ordinary valid D25+ v9 Player Saves already contain the state
- this repair path does not authorize v1~v8 Player Run continuation

### D30 FINAL

#### RUN-Q14 — DAY30 FINAL TIMING
SETUP:
Reach D30.

EXPECT:
- final relevant management/preparation occurs before lock
- D30 Relic window is available before final lock
- Final Expedition begins only after lock

PASS:
No post-lock management changes resolved expedition state.

#### RUN-Q16 — D30 STOCK TIMING HONESTY
SETUP:
Hold/buy stock near expiry before Final.

EXPECT:
D30 follows canonical stock/expiry rules unless an explicit Canonical override exists.
Player-facing usability is understandable before commitment.

PASS:
Displayed Final usability matches actual stock behavior.

#### RUN-Q78 — D30 SELECT -> FINAL PREP -> RESULT

Controlled D30 with at least one eligible Final participant.

PASS exact progression:

```text
D30 known Final state
-> D30 Relic/SLOTH decision when applicable
-> Final participant selection
-> Final preparation
-> Final Lock
-> one Final result
```

PASS:
- Final preparation reuses the familiar two-slot Item handling layer rather than adding a separate combat-game phase
- participant selection is committed before Final preparation starts
- fixed Final price is the ordinary 50% / 매입가 amount
- 100% / 150% price choices are not available
- no purchase/refusal RNG occurs
- NPC Wallet affordability remains real
- valid commit consumes stock and reduces NPC Wallet by the exact fixed amount
- valid commit increases Player Gold by the exact fixed amount
- valid commit increases Gross Sales by the exact fixed amount exactly once
- after committed Final transfers begin, Save/Load cannot reopen participant selection or erase committed transfer state for fishing
- no post-preparation free-equip step exists
- one Final Lock occurs after all selected participants finish Final preparation
- exactly one Final result resolves from that locked state

### ABANDON / RESET / TUTORIAL

#### RUN-Q64 — ABANDON

EXPECT:
- current Run discarded
- no settlement / Meta.finish
- no progression reward
- account Meta / Knowledge / unlock / Tutorial / Settings preserved

PASS: next Run uses ordinary start path without abandoned-run credit.

#### RUN ABANDON
PASS:
- abandon active Run and start new Run
- `Meta.finish()` not called
- no Mastery / Boss clear / matrix mutation / unlock / reward
- `runs` / `wins` not increased by abandon
- existing Knowledge / Tutorial / Settings preserved
- Run-scoped state replaced
- no legacy XP/reward copy

#### RUN-Q63 — FULL RESET

EXPECT:
- current/backup/legacy game-owned save data cleared
- fresh Account/Meta
- fresh Run state
- Tutorial reset
- D10/D14 unlock/toast reset

PASS: next launch behaves as a first launch and Tutorial can appear again.

#### RUN-Q80 — FULL DATA RESET / FRESH TUTORIAL ELIGIBILITY

SETUP A:
- current account has completed or dismissed tutorial
- perform Full Data Reset
- allow game to initialize a new current v9 state

PASS:
- old tutorial-complete / dismissed state is gone
- the new current account is tutorial-eligible
- tutorial actually begins on the first applicable flow

SETUP B:
- only legacy v1~v8 internal-test save remains
- launch current v9 build

PASS:
- legacy state is not migrated
- fresh v9 is created
- stale legacy tutorial flags cannot suppress the current tutorial

SETUP C:
- tutorial is completed on a current v9 account
- ordinary Run Abandon / new Run occurs without Full Data Reset

PASS:
- tutorial completion persists
- tutorial is not forcibly replayed just because the Run restarted

Any true fresh state that enters ordinary gameplay with tutorial suppressed by stale persistence is FAIL.

### RUN-END SETTLEMENT / CROSS-RUN

#### RUN-Q-v28-3 — STORE CAPITAL SETTLEMENT

PASS:
- eligible Run settles exactly once
- actual Gross Sales x reached-Day rate
- Gross Sales 0 -> Capital 0
- bankruptcy / Death-limit / Final failure may still earn from actual business
- Boss CLEAR adds no multiplier
- manual abandon -> 0
- reload cannot double-credit

#### RUN-Q-v28-4 — STORE CAPITAL INPUT SEPARATION

PASS:
- equal Gross Sales + reached Day -> equal Capital despite Ending Gold/Inventory difference
- Final transfers already counted in Gross Sales enter once
- retired net-asset formula is inactive

#### RUN-Q18 — CROSS-RUN RESET
SETUP:
Finish/end a Run and start another.

EXPECT:
Run-specific:
- NPC roster
- Store Build
- inventory
- economy state
reset appropriately.

PASS:
No unintended NPC/run state carries over. Only explicit META/NPC_TRAIT Job Mastery cross-run adjustment may affect an unlocked Job; no hidden account-wide power carries over.

#### RUN-Q29 — MONSTER KNOWLEDGE REQUIRES SUPPLIED SURVIVAL
SETUP:
For the same Family, resolve:
A. no supplied Item, survives
B. >=1 supplied Item, dies
C. >=1 supplied Item, survives

EXPECT:
- A: Knowledge +0
- B: Knowledge +0
- C: Knowledge +1

Player-facing progress text:
`보급 생환 N회`

PASS:
Zero-cost naked scouting cannot farm Monster Knowledge and old `관찰 N회` progress wording is not used.

#### RUN-Q30 — MINIMAL-ENGAGEMENT / DAY-FARMING
SETUP:
Multi-seed compare:
A. normal engaged play
B. repeated zero-sale / zero-order / zero-supply day advancement
C. poverty/minimum-spend play

Track:
- Day reached
- Gold
- NPC growth/value
- Knowledge
- Final viability

EXPECT:
- legacy Global Meta XP is not awarded for Day advancement
- Job Mastery / Distinct Boss progression cannot be earned without a successful Final clear
- no new inactivity punishment subsystem is required

PASS:
Removed Global Meta XP cannot be farmed by minimal Day advancement; remaining run-economy viability is evaluated separately.

### INTEGRATION / BROWSER LOOP

#### RUN-Q20 — COMPLETE 30-DAY LOOP
SETUP:
Play/simulate D1–D30.

EXPECT:
The run can complete from new game through Final Expedition and final result.

PASS:
No progression softlock or missing required phase.

#### RUN-Q66 — BROWSER LOOP BLOCKER

Real browser path:
`ORDER -> SALE -> NIGHT -> CLOSING -> next Day`

Must include at least one injury result path and one non-injury result path.
PASS:
- progression completes
- Console runtime error count = 0
- no `ReferenceError: game is not defined`

#### RUN-Q76 — MAIN LOOP SMOKE

Real browser progression must still complete:

```text
START -> MORNING -> ORDER -> SALE -> NIGHT -> CLOSING -> next Day
```

and a D25->D30 persistence path.

PASS:
- Console runtime error = 0
- no phase blocker
- no save-version/reference error

#### RUN-Q81 — FIRST-RUN LESSONS

Rule -> §FIRST-RUN LESSONS.

PASS:
- a fresh account's first Run: after the DAY 0 pick the warehouse holds the four opening Items and exactly one Common Item
  that counters the first Gate's Hazard
- an account with a settled Run: the four opening Items only
- DAY 2 of the first Run: the Event is 본사 1+1 행사 (one offer carries the 1+1 promo); a later Run: no Event on DAY 2
- a Death roll on DAY 1 or 2 of the first Run settles as 중상; DAY 3, and any Day of a later Run, settles as 사망
- the first Run's first Day (DAY 2 on) with someone injured: the injured adventurer is the first visitor, one 구급키트
  joined the warehouse, the count of visitors is unchanged, and never again that Run; DAY 3: a returning visitor is the payday customer - +200G this visit, its first
  affordable 150% offer taken and the next one an ordinary one, the §26-1 line; a later Run: none of it
- the same seed gives the same Gates, visitors and stream on both
- the measurement harness (`lessons=false`) plays the ordinary Run
- `tests/revision.cjs`

FAIL:
- the extra Item on a later Run, a non-Common or non-countering Item, a lesson that adds a draw, or a Death on DAY 1~2 of
  the first Run

### BALANCE QA

#### RUN-Q15 — FINAL INVESTMENT VALUE
SETUP:
Compare an invested returning NPC and a same-day/random newcomer at D30.

EXPECT:
Normal balance favors long-term invested NPC value on average.

PASS:
Last-day newcomer does not systematically replace the value of 30-day investment.

### FINAL DETAIL QA OWNERSHIP

Detailed Final Family / party / Power / Roll / clear acceptance criteria are owned by:
-> FINAL_EXPEDITION_v2.8.0.md

Boss identity / reveal / Trait / Sloth acceptance criteria are owned by:
-> BOSS_v2.8.0.md

Meta progression acceptance criteria are owned by:
-> META_v2.8.0.md

CORE_RUN §QA retains only Run-flow, D30 timing, stock timing, save/resume, and complete-loop integration checks.

## RELATED

Game philosophy -> SPEC_INDEX §GAME CORE
Economy / order / Final fixed price / Wallet / Gold -> `ECONOMY_ORDER_v2.8.0.md`
NPC persistence / growth / level -> `NPC_TRAIT_v2.8.0.md`
Dungeon generation -> `DUNGEON_HAZARD_v2.8.0.md`
Item / stock / start-stock identity -> `ITEM_v2.8.0.md`
Relic / windows -> `RELIC_v2.8.0.md`
Sale / Final Item handling -> `SALE_v2.8.0.md`
Night / closing -> `NIGHT_CLOSING_v2.8.0.md`
Event / day modifier -> `EVENT_v2.8.0.md`
D25/D30 Final flow / Final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
Boss identity / trait / reveal / cadence / GREED -> `BOSS_v2.8.0.md`
Meta / mastery / knowledge / Account -> `META_v2.8.0.md`
Presentation / mobile / tutorial presentation / Decoration UI -> `UI_UX_v2.8.0.md`
Player-facing copy / abandon wording -> `COPY_WORLD_VOICE_v2.8.0.md`
Exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`
