# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=CORE_RUN_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Run/phase/abandon mechanics inherit `CORE_RUN_v2.6.1.md`.
This patch owns only v2.7 Run-start inventory, Save generation, and D0~D30 Final timeline changes.

The v2.7 Player-facing Run-abandon label remains:

```text
현재 지점 포기
```

The abandon function/semantics remain unchanged.

## SAVE v8 — EXACT

v2.7 uses a new incompatible Run schema.

```text
KEY = guild24.save.v8
Envelope version = 8
Export version = 8
Validation version = 8
run.version = 8
LEGACY = v1~v7
```

Rules:
- New Run initializes `run.version=8`.
- v1~v7 **Run state** cannot continue as a v2.7 Run.
- Do not migrate v1~v7 Run state into v8.
- When valid v7 Account/Meta progression exists, preserve only that validated Account/Meta state under `META_v2.7.0.md`; this is not Run continuation.
- Show clear fresh-Run guidance when only legacy Run data exists.
- Do not automatically delete legacy bytes merely because their Run cannot continue.
- Full Data Reset remains the explicit game-owned data deletion action.

Reason:
v2.7 changes active Item IDs, normal Bag capacity, Level milestone behavior, Final prereveal state, and persistent recent-expedition data. Partial in-place Run continuation is not an approved migration path.

## START STOCK — v2.7

Keep the ordinary start quantity count, but replace the retired Bandage slot.

```text
삼각김밥 ×1
생수 ×1
진정 허브티 ×1
하급 포션 ×1
```

`bandage` is retired and is not an active v2.7 Item ID.
No legacy Bandage stock is silently converted into 진정 허브티.

Item identity/prices/effects -> `ITEM_v2.7.0.md`.

## FINAL TIMELINE — EXACT

Reuse existing Morning/management/SALE/Final surfaces; do not add a new permanent Final dashboard or a separate combat-game Phase.

```text
D0  : inform Player that D30 Final is the Run objective
D5  : Boss information flow owned by BOSS
D10 : FINAL까지 20일 signal
D15 : additional Boss information flow owned by BOSS
D20 : FINAL까지 10일 signal + Recon dispatch beat
D25 : FINAL까지 5일 signal + exact Final Family Pair / Hazard Pool generated, revealed, persisted
D30 : reuse the persisted D25 Final state exactly; resolve Final as 출전 NPC 선택 -> FINAL 판매 -> 결과
```

D20 Recon creates no separate combat/minigame/resource system.
Its gameplay payoff is the D25 exact Final Family/Hazard disclosure owned by `FINAL_EXPEDITION_v2.7.0.md`.

D25 does not grant:
- guaranteed Counter stock
- free Final Item
- special D25 shop
- forced correct preparation

The remaining D25~D29 Order / Stock / NPC growth / preservation decisions are the preparation window.

## D30 FINAL FLOW — EXACT

After the already-known D25 Final state and the D30 Relic/SLOTH decision are resolved:

```text
Final participant selection
-> Final SALE preparation
-> Final Lock
-> one Final result
```

Rules:
- participant selection is confirmed before Final SALE begins
- Final SALE reuses the ordinary SALE interaction layer; it is not a new top-level day-loop Phase and not a separate combat minigame
- selected participants are processed according to `FINAL_EXPEDITION_v2.7.0.md` / `SALE_v2.7.0.md`
- after committed Final sales begin, Save/Load must not reopen participant selection or erase committed/refused transactions for fishing
- after all selected participants finish Final SALE, Final Lock snapshots the authoritative Final state and one result resolves
- no second free-equip/preparation step exists after Final SALE

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

## RELATED

NPC growth/level -> `NPC_TRAIT_v2.7.0.md`
Item/start-stock identity -> `ITEM_v2.7.0.md`
D25/D30 Final flow -> `FINAL_EXPEDITION_v2.7.0.md`
Final sale interaction -> `SALE_v2.7.0.md`
Boss reveal -> `BOSS_v2.7.0.md`
Account/Meta preservation -> `META_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
Player-facing abandon wording -> `COPY_WORLD_VOICE_v2.7.0.md`
