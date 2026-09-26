# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline,fresh_init,tutorial_reset,meta_settlement,pre_run_loadout,boss_information_order
DOC_VERSION=2.9.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.3
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/CORE_RUN_v2.8.0-patch.md,history/CORE_RUN_v2.7.0.md,history/CORE_RUN_v2.6.1.md,history/CORE_RUN_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/CORE_RUN.md

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

하루의:
발주
→ 판매
→ 원정 결과
→ 점포 결산

이 누적되어:

- Store Build
- Inventory Strategy
- NPC 성장
- Wallet/Loyalty/Revisit
- Final Expedition 전력

을 만든다.

D30은 별개의 미니게임이 아니라
앞선 29일의 판단을 시험하는 Run 결산이다.

## PRE-RUN FLOW

There is no Start Contract selection in the current pre-Run flow.

    new Run preparation
    -> inspect/equip owned Decoration loadout
    -> confirm Run start
    -> DAY 0 first 점포지원 choice
    -> enter DAY 1 MORNING
    -> D0 first-Morning Boss briefing
    -> ordinary DAY 1 MORNING flow

Decoration loadout is frozen after Run start.
The pre-Run management screen must have a valid return path to new-Run preparation.

The D0 Boss objective is not embedded above/inside the first Store Support decision.
The first Store Support decision resolves first. The Run then enters DAY 1 MORNING, and the D0
briefing is the first presentation step of that Morning before ordinary Morning information or
decisions.

"D0" remains the Boss-information cadence name. It does not mean the briefing is displayed on a
separate playable DAY 0 phase.
## D0 FIRST-MORNING BOSS BRIEFING — EXACT

Purpose:
bridge the opening / first-support setup into the actual 30-Day Run objective before the Player
makes the first ordinary Morning decision.

Trigger:
- only after the first DAY 0 점포지원 choice has resolved;
- only when the Run has entered DAY 1 MORNING;
- before the ordinary DAY 1 Morning Event, Gate detail, ORDER entry or any other ordinary Morning
  information / decision surface.

This is an information beat, not a new gameplay Phase.

Opening the D0 briefing:
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
- closing / escaping the presentation, if the shell technically permits it, does not consume the
  beat;
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

Phase는 턴 기반으로 진행한다.
시간 경과를 요구하는 Real-time Gameplay는 없다.

### MORNING
question=`오늘 어떤 날인가?`

Purpose:
- 오늘 상황 파악
- 방문 예상
- 열린 Gate / 알려진 위험 확인
- Event 확인

Morning은 상황 읽기 단계다.
발주/판매/결산을 한 화면에 섞지 않는다.

### ORDER
question=`무엇을 준비할까?`

Purpose:
- 상품 선택
- 수량 선택
- Gold 배분
- 재고 공간 판단
- Reroll 판단
- 오늘 Gate/Hazard에 맞춘 즉시 준비
- 다음날 Tier 확률을 미래 보조 정보로 활용

Order timing:
- Order is same-day replenishment
- confirmed stock enters Inventory before the current Day SALE
- current-day Gate/Hazard information is already known before Order commitment
- no next-day forecast is shown; today's Gates are the whole planning context (User 2026-09-24, v2.9.0)

Within ORDER, confirming a purchase does **not** advance the phase.
The Player enters SALE only through the separate `영업 시작` action defined by `ECONOMY_ORDER_v2.8.0.md` / `UI_UX_v2.8.0.md`.

Canonical economy/order:
-> ECONOMY_ORDER_v2.8.0.md

### SALE
question=`이 손님에게 무엇을, 얼마에 팔까?`

Purpose:
- 한 명의 NPC를 관찰
- Item 선택
- Price 선택
- 현재 이익 vs NPC 투자 판단

Canonical:
-> SALE_v2.8.0.md

### NIGHT
question=`내 선택이 어떻게 됐을까?`

Purpose:
- NPC별 원정 결과
- 실제 준비 영향
- 성장/부상/사망 확인

Canonical:
-> NIGHT_CLOSING_v2.8.0.md

### CLOSING
question=`오늘 장사는 어땠을까?`

Purpose:
- Revenue
- COGS
- Margin
- Overhead
- Waste
- Relic spend
- Final Gold

Canonical:
-> NIGHT_CLOSING_v2.8.0.md

## START STATE

At new run:

Gold=700G    (User 2026-09-25, v2.9.1 balance; was 1000G)
InventoryCapacity=18

Stock:
```text
삼각김밥 ×1
생수 ×1
진정 허브티 ×1
하급 포션 ×1
```

`bandage` is retired and is not an active Item ID.
No legacy Bandage stock is silently converted into 진정 허브티.

No hidden extra starting resources.

Item identity/prices/effects -> `ITEM_v2.8.0.md`.

## RUN START EFFECT APPLICATION

Active Decoration effects read from the Run's frozen loadout.
Run-start effects come only from the frozen active Decoration loadout; no contract state contributes in parallel.

## INVENTORY

baseCapacity=18

Inventory stores physical stock units.
Shelf-life/expiry behavior is Item/stock data.

When multiple units of same Item exist:
UI may stack them,
but physical stock state remains preservable.

Sale depletion:
nearest-expiry unit first

Canonical:
-> ITEM_v2.8.0.md
-> SALE_v2.8.0.md

Capacity modifiers may come from explicit Relic effects.

## DAILY ECONOMIC BASE

dailyOverhead follows the Day AND the roster the Store has actually built:

`overhead = (90 + 5 x (Day - 1)) x (1 + 0.02 x (coreAvgLevel - 1)) x (1 + 0.06 x coreAvgRarity)` (User 2026-09-24, v2.9.0)
charged rounded to 10G.

Core Roster = the six best living adventurers, by Level then Rarity (all of them if fewer).
Averaging the whole pool would pay the Store to hoard Level-1 bodies to dilute the figure.
Nothing is persisted; both averages derive from the roster as it stands.

A Store that grows good adventurers keeps having to sell well to hold on to them.

Any later base-overhead change requires:
- integrated v2.5 multi-seed evidence
- minimal-engagement vs normal-play comparison
- Designer approval

Base order offers:
6/day

Base visitors:
3–6/day

Visitors may be modified by:
- Relics
- Events
- Living NPC Cap

Visitor modifiers must respect Living NPC Cap rules.

Canonical:
-> ECONOMY_ORDER_v2.8.0.md
-> NPC_TRAIT_v2.8.0.md
-> RELIC_v2.8.0.md

## PERSISTENT NPC ROSTER

NPCs persist within a Run.

Persistent state may include:
- identity
- Job
- level/stats
- Traits
- Wallet
- Loyalty
- injuries
- fatigue/conditions
- alive/dead state
- visit/history state

Dead NPC:
- remains dead for the Run
- does not return as a normal visitor

Living NPC capacity, recovery/death slot semantics, newcomer/revisit behavior:
-> NPC_TRAIT_v2.8.0.md

CORE_RUN does not redefine the NPC cap or visitor-pool algorithm.

## GATE / DUNGEON STATE

Dungeon generation follows:
-> DUNGEON_HAZARD_v2.8.0.md

Generated Day/Gate state must remain stable for that Day.

Save/Load must not become:
- Gate reroll
- Family reroll
- Tier reroll
- Relic offer reroll
- Order-state exploit

Random results that are meant to be fixed before player choice
must be persisted or deterministically reproducible.

## RELIC WINDOWS

Relic windows:
[D0,D5,D10,D15,D20,D25,D30]

Canonical acquisition/state:
-> RELIC_v2.8.0.md

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

D0:
- first Store Support choice resolves first
- the Run enters DAY 1 MORNING
- the D0 Boss briefing is the first Morning presentation step
- only after acknowledgement does the ordinary DAY 1 Morning sequence continue
- D0 is informational and does not become a permanent Phase

On D5/D10/D15/D20/D25:
Boss information occurs before the same-Day Store Support decision.

D10/D20 each persist a consumed/seen state so reload cannot replay them.
D0 likewise must not replay after consumption.

Exact content -> BOSS_v2.8.0.md / COPY_WORLD_VOICE_v2.8.0.md.

## D25 STATE SAFETY

For every normally created valid v8 Run:
- D25 Final generated state is persisted when created.
- Save/Load cannot reroll it.
- D30 reads that exact persisted state.

### Development / controlled-migration repair boundary

If a development fixture, development Save, or explicitly controlled migration/debug state is already represented as a v8 Run at D25+ but lacks the required Final prereveal state:

```text
first valid entry
-> generate the authoritative Final Family Pair / Hazard Pool exactly once
-> persist immediately
-> all later loads reuse that persisted state
```

Rules:
- use the same authoritative seeded/fixed Final-selection principle as ordinary D25 generation
- this is a one-time repair, never a reroll/fishing path
- normal valid v8 Player Saves must already contain the D25 state
- this boundary does not authorize v1~v7 Player Run continuation into v8
- malformed ordinary Player state must not repeatedly regenerate the Final state on entry/reload

## D30 FINAL

D30=Final Expedition / Boss Day.

D30 is the Run culmination and must reuse the systems built during the Run rather than introducing a separate combat minigame.

Detailed Final resolution ownership:
- Final Family selection / disclosure
- Final Hazard Pool
- Final party size / survivor fallback
- Final Power / Roll / clear comparison
- Run Clear / Fail
- Final-specific balance and QA

-> FINAL_EXPEDITION_v2.8.0.md

Boss identity / Boss Trait / Sloth Seal state:
-> BOSS_v2.8.0.md

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

Storage:
localStorage

Save must preserve enough Run state to resume without changing already-generated choices/results.

At minimum preserve:
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

### SAVE v8 — EXACT

```text
KEY = guild24.save.v8
Envelope version = 8
Export version = 8
Validation version = 8
run.version = 8
LEGACY = v1~v7
```

Current release-policy context:

```text
v2.x = internal development / test line
v3.0.0 = current external-public-release target
```

Rules:
- New Run initializes `run.version=8`.
- v1~v7 **Run state** cannot continue as a current v8 Run.
- v1~v7 **Account/Meta state** is not migrated into v8.
- Do not add compatibility conversion merely to preserve internal-test progression.
- When only legacy v1~v7 data exists, initialize a fresh current v8 Account/Meta + fresh current v8 Run rather than importing legacy progression.
- legacy bytes are not required to be destructively deleted merely to reject migration; storage cleanup remains under the existing reset/storage policy.
- Full Data Reset remains the explicit game-owned current-data deletion action.

Legacy v1~v7:
- show old-version/fresh-start guidance
- do not automatically delete original legacy bytes

### SAVE BOUNDARY

Current internal save generation remains v8 unless Source adoption discovers a real incompatible
schema need.

The meal/water identity pass reuses existing Item IDs and does not itself require a migration
or schema bump.

Existing saved IDs resolve to current active identities.

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

Player-facing action:
`현재 지점 포기`

Confirming `현재 지점 포기` means (User 2026-09-24, v2.9.0):
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

Account-scoped state is preserved:
- `account.matrix`
- derived Meta progression
- Monster Knowledge
- earned unlocks and unlock-toast state
- Tutorial completion
- Settings
- other account-scoped persistent state

Run-scoped state is discarded:
- Day / Phase / Gold / Inventory
- Run NPC roster
- Run Relics / facilities
- Gate / Event / Order state
- Deep Expedition schedule / assignment / sponsorship / result
- Boss / Final state
- all other run-scoped state

The next Run uses the ordinary fresh-Run start path.
Do not add a reset-only initialization path.

Full game-data reset remains a separate action and still deletes account-scoped
progress, Knowledge, unlocks, Tutorial and Settings.

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
- no valid current v8 Account/Run exists and a new v8 state is created
- Full Data Reset is completed and the game creates a new current state
- only legacy v1~v7 internal-test state exists and current policy rejects migration, causing fresh v8 initialization

Exact tutorial boundary:

```text
fresh current Account/Run
-> tutorial completion / dismissal state = not completed
-> tutorial entry must be eligible on the first applicable new-game flow
```

Rules:
- Full Data Reset must clear any game-owned tutorial-complete / tutorial-dismissed flag that would suppress the fresh tutorial
- stale legacy tutorial flags must not suppress tutorial on a fresh v8 initialization
- Run Abandon / ordinary new Run does **not** by itself reset tutorial completion while the same current Account/Meta remains
- do not create a second tutorial system; reuse the existing tutorial implementation if it exists
- implementation adoption must audit the current tutorial trigger/persistence path because current internal testing has observed fresh/reset states where the tutorial did not appear
- if the existing tutorial is present but its reset/trigger path is broken, fix that path rather than replacing the tutorial wholesale

Exact tutorial content/presentation -> `UI_UX_v2.8.0.md`.

## RUN-END STORE CAPITAL SETTLEMENT

Normal Run end settles Store Capital exactly once from:
- accumulated actual Gross Sales
- reached-Day band

Exact formula/rates -> META_v2.8.0.md.

Bankruptcy, Death-limit closure, Final failure and Boss CLEAR are eligible normal endings.
Manual Run Abandon yields 0 Store Capital.

Ending Gold / remaining Inventory are not Store Capital inputs.

## RUN RANDOMNESS

Randomness should create:
- different early Family mixes
- different customer histories
- different Item availability
- different Relic Build opportunities
- different but playable Runs

Randomness should not make:
- one required Build Piece mandatory
- one last-day NPC determine the Run
- correct preparation meaningless
- reload the optimal strategy

Seeded reproduction should be possible for QA/debug if the project supports a seed input.

Seed UI/debug controls are not core player progression.

## DEATH LIMIT — SEGMENTED

(User 2026-09-25, v2.9.1 balance.) A Run ends at Closing when the Run's cumulative Death count reaches the limit of the
segment the current Day is in:

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
- checked at Closing before the money branch, as today; the ending copy is unchanged

## FAILURE / LOSS PRINCIPLE

Weak NPCs may be ignored or lost.
The game does not need a separate punishment subsystem merely to force care.

Their loss should matter through existing long-term systems:
- lost growth
- lost Wallet
- lost Loyalty/Revisit
- lost future sales
- lost Final roster value

Canonical NPC value:
-> NPC_TRAIT_v2.8.0.md

## META / CROSS-RUN BOUNDARY

Core Run identity resets each Run.

Cross-run progression / Knowledge / unlock truth is owned by:
-> META_v2.8.0.md

Legacy Global Meta XP is removed.
Run Day advancement itself grants no Job Mastery or Boss-clear progress.

Explicit exception to the old blanket power ban:
- visible Job Mastery adjustment may affect that Job's Base Stats / Growth only when defined by NPC_TRAIT / META
- no hidden account-wide combat multiplier is allowed

Boss-generated run state is Run state and must be persisted without reroll.
Boss identity / reveal / trait / Sloth state ownership:
-> BOSS_v2.8.0.md

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

Flavor should use existing:
- phase
- event
- dialogue
- item
- trait
- relic
- result

systems where possible.

## QA

Acceptance criteria -> CORE_RUN_QA_v2.8.0.md

## RELATED

Game philosophy -> `00_GAME_CORE_v2.8.0.md`
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
