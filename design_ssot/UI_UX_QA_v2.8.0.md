# UI_UX QA

DOC=UI_UX_QA
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
BASE_DOCUMENT=UI_UX_QA_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_CORE_READABILITY_QA

## INHERITANCE

All unchanged v2.7 UI/UX QA remains active.
Retired Franchise / Start Contract expectations are historical only.

## UI-Q-v28-1 — STORE MANAGEMENT

PASS:
- Store Capital visible
- four fixed Slots visible
- owned/unowned/equipped distinguishable
- purchase confirmation spends exactly once
- loadout read-only during active Run

## UI-Q-v28-2 — PRE-RUN RETURN PATH

From the pre-Run/foundation Decoration management screen:

PASS:
- explicit Back/Return reaches new-Run preparation
- repeated management -> return cycles do not produce blank UI
- no Seed/Decoration reroll caused merely by returning
- mobile browser/system back does not strand the Player in an empty stage

Run on a real mobile browser or equivalent mobile runtime, not Source inspection only.

## UI-Q-v28-3 — MOBILE SALE QUEUE

At mobile width:
- decorative waiting-line/fan/next-customer card is absent
- bottom Dock retains one queue progress/count
- desktop may still show richer queue presentation
- no duplicate queue count consumes vertical space

## UI-Q-v28-4 — CURRENT CUSTOMER STATE

Mobile SALE exposes compact:
- Injury without duplicate numeric 부상 1
- Fatigue
- Loyalty

Trusted Regular state appears at 51.

PASS:
- no separate Loyalty `?` / popover trigger in normal SALE
- Loyalty contextual meaning is taught by tutorial/coach
- Equipment text is absent from the compact SALE top state
- Equipment remains reachable through NPC detail / proven Stat source where applicable
- Bag remains exactly 2 slots
- both Bag slots remain horizontal at mobile width
- the whole Bag block may wrap down; the slots themselves do not stack vertically
- no horizontal overflow

## UI-Q-v28-5 — SEMANTIC DELTA

For changed Stats/Fatigue/economy values:
- benefit = green
- harm = red
- unchanged = default
- generic yellow moved-only treatment is not used as meaning

Color is not the only source cue.

## UI-Q-v28-6 — SHARED POPOVER

Desktop:
- hover/focus works
- click remains usable

Mobile:
- tap toggles

All:
- no layout-height jump
- one open at a time
- outside/Escape closes
- no gameplay pause/background lock
- viewport placement remains readable

## UI-Q-v28-7 — GREAT SUCCESS SIGNAL

During one customer visit:
- focusing an Item does not change signal
- successful committed purchase recomputes signal
- signal may appear or disappear
- Combat/Hazard/Death readouts remain frozen
- exact probability is not exposed

## UI-Q-v28-8 — FATIGUE

SALE:
- no hypothetical Outcome fatigue matrix
- current/departure Fatigue and compact Supply arithmetic readable

NIGHT:
- main label is 귀환 후 피로
- detailed path available on demand
- old 보급 회복 / 보급 완화 / 밤 피로 primary labels absent

## UI-Q-v28-9 — NIGHT REACTION

Living result:
- temporary character speech bubble appears
- auto-dismisses around 3 seconds
- tap dismiss works
- result information remains
- does not cover Outcome
- reaction selection priority is:
  avoided death / rescue -> severe injury -> injury -> retreat -> growth -> ordinary return
- Bag / supplied-Item presence alone never selects the reaction category

Death:
- no living speech bubble
- narration/report treatment only

## UI-Q-v28-10 — BOSS MOBILE DENSITY

At 360x800:
- D5/D15 art max-height baseline 120px
- D25 art max-height baseline 96px
- D10/D20 compact identity portrait baseline 64px
- core information and acknowledgement are not pushed off first viewport solely by art

## UI-Q-v28-11 — LOYALTY HELP

Normal SALE:
- shows compact Loyalty value/state
- does not show a dedicated Loyalty `?` / anchored popover trigger

Tutorial/coach:
- explains purchase-intent and revisit meaning
- says 51 = 단골
- does not leak unrevealed Boss-specific information

Global compact Help remains under its existing copy owner; it is not a second contextual SALE tooltip.

## UI-Q-v28-12 — EVENT TEMP BUDGET

On 길드 급여일:
- persistent Wallet and temporary purchase budget are distinguishable
- affordability uses both
- UI does not imply temporary budget persists

## UI-Q-v28-13 — CLOSING FOOTER

The redundant internal-accounting footnote is absent from the primary receipt.

## UI-Q-v28-14 — DECORATION ART / SETTLEMENT

All previous v2.8 Decoration-art, Store Capital settlement and retired-Franchise checks remain
active as defined by META_v2.8.0.md and CORE_RUN_v2.8.0.md.


## UI-Q-v28-15 — SALE COPY DENSITY

Selected Item:
- one heading \`판매 후 변화\`
- no \`이 상품이 직접\`
- no \`보급이 상태에 미치는 영향\`
- no \`이 손님에게는 지금 걸리지 않는 효과\`
- conditional non-delta Item truth may appear under \`특수 효과\`
- no permanent forecast explanation paragraph

Exact forecast help is available through anchored popover.

## UI-Q-v28-16 — DEEP REPEAT COPY

After first tutorial:
- Morning uses the exact two-line repeat copy
- SALE nomination uses the exact two-line cost/reward copy
- no duplicate long tutorial paragraph appears in both places

## UI-Q-v28-17 — CLOSING ECONOMICS ONLY

Primary Closing receipt has no \`오늘의 보급 영향\` block and no internal-accounting footer.

NIGHT remains the result/causality owner.

## UI-Q-v28-18 — STORE CAPITAL CURRENCY

No active Store Capital display appends G.

Gold still uses G.

## UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY

Ordinary Player surface:
- \`소리 켜기 / 소리 끄기\`
- \`전체 데이터 초기화\`
- no reproducibility Seed control
- no \`로컬 실행 지원 · 외부 연결 없음\` footer

No new Debug menu is required for PASS.

## UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH

Ordinary Player verification:
- pre-Run has no reproducibility Seed field
- Settings has no visible Debug entry
- ordinary Player flow contains no QA/runtime footer copy

Manual deterministic reproduction:
1. Full Data Reset or import a fixed QA Save.
2. Open browser Developer Tools -> Console.
3. Run:
   `Guild24.game.start('qa-v28-fixed-seed'); Guild24.render();`
4. Confirm:
   `Guild24.game.run.seed === 'qa-v28-fixed-seed'`
5. During the active Run run:
   `Guild24.showDebug()`
6. Confirm the Debug view exposes the existing seed/RNG/offers/NPC/Dungeon/Result/Boss diagnostic payload.
7. Close and repeat from the same controlled Account state with the same seed; deterministic Run state must reproduce according to the existing seeded contracts.

Shortcut coverage:
- `Ctrl+Shift+D` opens the same development Debug view during an active Run.

FAIL:
- deterministic seed reproduction requires restoring a Player-facing Seed field
- Debug becomes ordinary Player navigation
- removal of Player-facing QA copy also removes the development reproduction capability

## UI-Q-v28-20 — DECORATION DECISION SURFACE

Store management shows name/effect/price-or-ownership/equipped state.

Decoration Flavor prose is absent from this management decision surface.
No extra Collection UI is required.


## UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES

Using controlled states, verify every implemented live-store growth trace is derived from state that
already exists and is already Player-knowable.

At minimum cover the promoted trace families that implementation adopts:
- equipped Decoration
- owned Store Support / facility
- Trusted Regular presence
- D25+ revealed Final-preparation state

PASS:
- adding/removing the owning state adds/removes its trace
- Save/Load reproduces the same trace from the same state
- trace is presentation-only and not an interactive gameplay control
- no hidden Boss / Hazard / NPC information appears early
- multiple traces remain readable without changing gameplay ownership

FAIL:
- a trace exists without its owning state
- visual state requires a second gameplay/progression field
- a decorative prop changes a mechanic

## UI-Q-v28-22 — DECISION / PHASE AUDIO

Verify the current audio architecture, not a parallel audio system.

Material action feedback must be semantically distinguishable for:
- ORDER confirmation
- successful SALE
- SALE refusal
- Store Support acquisition

Phase presentation may strengthen MORNING / ORDER / SALE / NIGHT / FINAL identity through the current
BGM/ambience/cue system.

PASS:
- mute disables presentation audio
- BGM and SFX settings continue to control their existing channels
- audio playback changes no gameplay state and consumes no Gameplay RNG
- repeated render alone does not replay one-shot decision cues
- mobile and desktop run without audio-related console/runtime errors

A unique full music track per phase is not required.

## UI-Q-v28-23 — NIGHT RESULT PRESENTATION

With controlled NIGHT result fixtures, verify materially different states are visibly/audibly
distinguishable at minimum for:
- ordinary return / success
- Great Success
- retreat
- injury
- severe injury
- Death

Where rescue / avoided-death proof exists, a distinct accent may appear only from that proven state.

PASS:
- presentation reads the already-resolved Outcome
- no presentation branch mutates Outcome, reward, Fatigue, proof, Wallet or Store Gold
- Death still has no living NPC speech bubble
- primary result information remains readable on mobile

## UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF

Verify the promoted presentation around D0 / D5 / D10 / D15 / D20 / D25 / D30.

PASS:
- each cue/art treatment reveals no information earlier than its owning beat
- D25 presentation may reflect the exact Final state only after that state is revealed
- D30 may intensify FINAL entry but adds no new Boss-information beat or fact
- Boss/Final presentation does not consume Gameplay RNG
- existing seen-state / Save-Load behavior remains unchanged
- at mobile width, information and acknowledgement remain usable

## UI-Q-v28-25 — TARGETED GRAPHIC POLISH

For each art/icon/crop/scale asset changed under the v2.8 polish pass:

PASS:
- the object still reads as its current canonical identity
- two distinct gameplay objects are not made visually identical
- no crop hides decision-relevant information
- no decorative layer creates a false mechanic/state implication
- mobile and desktop render without overflow or obscuring the primary action

This QA does not authorize a new Item wave, portrait wave, environment set or theme system.
