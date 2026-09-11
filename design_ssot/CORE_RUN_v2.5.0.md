# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow

DOC_VERSION=2.5.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC


## KEY

runLength=30 days
targetPlaytime=30–50 min
turnBased=YES
realTimeGameplay=NO

startGold=1200G
inventoryCapacity=24
dailyOverheadStarting=60G
dailyOverheadExactStatus=PASS3_AFTER_MINIMAL_ENGAGEMENT_SIM
baseVisitors/day=3–6
dailyOrderOffers=6

startStock:
- 삼각김밥×2
- 생수×2
- 붕대×1
- 하급포션×1

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
- next-day Tier probabilities are only a secondary future-planning signal

Canonical economy/order:
-> ECONOMY_ORDER

### SALE
question=`이 손님에게 무엇을, 얼마에 팔까?`

Purpose:
- 한 명의 NPC를 관찰
- Item 선택
- Price 선택
- 현재 이익 vs NPC 투자 판단

Canonical:
-> SALE

### NIGHT
question=`내 선택이 어떻게 됐을까?`

Purpose:
- NPC별 원정 결과
- 실제 준비 영향
- 성장/부상/사망 확인

Canonical:
-> NIGHT_CLOSING

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
-> NIGHT_CLOSING

## START STATE

At new run:

Gold=1200G
InventoryCapacity=24

Stock:
- 삼각김밥×2
- 생수×2
- 붕대×1
- 하급포션×1

No hidden extra starting resources unless explicitly defined by selected Start Contract.

Start Contract availability / unlock ownership:
-> META

A selected Start Contract may modify Run start only through that contract's explicit effect.
Franchise Grade itself does not directly grant the selected contract effect.

## INVENTORY

baseCapacity=24

Inventory stores physical stock units.
Shelf-life/expiry behavior is Item/stock data.

When multiple units of same Item exist:
UI may stack them,
but physical stock state remains preservable.

Sale depletion:
nearest-expiry unit first

Canonical:
-> ITEM
-> SALE

Capacity modifiers may come from explicit Relic/contract effects.

## DAILY ECONOMIC BASE

dailyOverheadStarting=60G
dailyOverheadExactStatus=PASS3_AFTER_MINIMAL_ENGAGEMENT_SIM

60G is the v2.5 retained implementation starting baseline,
not a final post-simulation freeze.

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
- contracts
- Events
- Living NPC Cap

Visitor modifiers must respect Living NPC Cap rules.

Canonical:
-> ECONOMY_ORDER
-> NPC_TRAIT
-> RELIC

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
-> NPC_TRAIT

CORE_RUN does not redefine the NPC cap or visitor-pool algorithm.

## GATE / DUNGEON STATE

Dungeon generation follows:
-> DUNGEON_HAZARD

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
-> RELIC

D0 relic choice occurs before first normal business flow.

D30 relic purchase closes before Final Expedition lock.

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

-> FINAL_EXPEDITION

Boss identity / Boss Trait / Sloth Seal state:
-> BOSS

D30 order constraint:
Boss/Final Family disclosure -> D30 Relic or Sloth decision -> Final preparation -> Final lock.
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
-> NPC_TRAIT

## META / CROSS-RUN BOUNDARY

Core Run identity resets each Run.

Cross-run progression / Knowledge / unlock truth is owned by:
-> META

v2.5 removes legacy Global Meta XP.
Run Day advancement itself grants no Job Mastery or Boss-clear progress.

Explicit exception to the old blanket power ban:
- visible Job Mastery adjustment may affect that Job's Base Stats / Growth only when defined by NPC_TRAIT / META
- no hidden account-wide combat multiplier is allowed

Boss-generated run state is Run state and must be persisted without reroll.
Boss identity / reveal / trait / Sloth state ownership:
-> BOSS

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

## APPROVED_AMENDMENT_2026_09_12 — RUN ABANDON / DEEP SAVE

### CURRENT RUN ABANDON

Player-facing identity=`현재 런 포기`.

Starting a new Run while another Run is active means:
**abandon the current Run with no settlement and start a fresh Run.**

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
- already-earned unlocks
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

## QA

Acceptance criteria -> CORE_RUN_QA_v2.5.0.md

## RELATED

game philosophy -> 00_GAME_CORE
economy/order -> ECONOMY_ORDER
npc persistence/growth -> NPC_TRAIT
dungeon generation -> DUNGEON_HAZARD
item/stock -> ITEM
relic/windows -> RELIC
sale -> SALE
night/closing -> NIGHT_CLOSING
presentation/mobile -> UI_UX
event/day modifier -> EVENT
final expedition -> FINAL_EXPEDITION
boss identity/trait -> BOSS
meta/mastery/knowledge -> META
player-facing copy -> COPY_WORLD_VOICE
