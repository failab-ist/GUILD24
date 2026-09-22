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
- D5/D15 art max-height baseline 240px
- D25 art max-height baseline 200px
- D10/D20 compact identity portrait baseline 64px
- D5/D15/D25 major-beat Boss art is a clear centered visual anchor
- no small-Boss + wide-empty-space composition on the major beats
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


## UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT

This is runtime UX QA, not Source/CSS inspection alone.

Review the current Player flow on real/equivalent browser viewports at minimum:
- phone: 360, 390 and 412 class widths
- desktop: the 1024 breakpoint and a representative 1280-class width

Traverse:
- opening / pre-Run / Store Management
- MORNING
- ORDER
- SALE
- NIGHT
- CLOSING
- Boss-information beats
- Final preparation / FINAL / ending
- Help / Settings / Event / Store Support and other active modal/overlay surfaces

For every reviewed surface, record PASS/FAIL for:
- current information priority is visually obvious
- required comparison information appears before the decision that uses it
- primary action is visible/reachable without unrelated content dominating the path
- no horizontal overflow
- no fixed header/dock/modal covers decision information
- no avoidable blank/dead region caused by grid/flex track stretching or oversized wrappers
- no duplicated label/count/explanation competes with the same fact elsewhere on the surface
- transient content does not reserve permanent empty height after it disappears
- responsive reordering preserves the intended information -> comparison -> action sequence
- desktop does not become a stretched phone layout with excessive empty width/height
- compact mobile presentation does not hide required information merely to fit

A visual defect that materially weakens the current decision is a FAIL even when every DOM node is
technically present.

Do not fix a FAIL by deleting information owned as required by another current Spec.
Escalate any required-rule conflict to the owning Design document.

## UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT

Audit every current coach step, including optional/contextual steps, on the responsive layout where
it can appear.

For each step capture:
- tutorial text
- runtime target selector / actual visible matched element
- spotlight bounds
- coach-copy placement
- next actionable control

PASS:
- highlighted UI is exactly the fact/action the text teaches
- target is visible, not the hidden duplicate for another breakpoint
- spotlight includes the complete meaningful target without swallowing unrelated neighboring UI
- copy and spotlight remain readable together after any automatic scroll
- coach UI does not cover the target or next required control
- a relationship lesson highlights the smallest useful shared region or uses sequential steps
- contextual missing targets skip cleanly and do not block later lessons
- the lesson explains how to read the system, not which gameplay answer to choose
- the same step remains semantically correct at phone and desktop layouts

FAIL examples:
- text explains Hazard readiness while only an unrelated destination heading is highlighted
- one button is discussed while the entire card/column is spotlighted without need
- only part of a tall meaningful target is cut out
- automatic scroll places the target behind a dock/header
- coach text describes data that is not inside or meaningfully related to its highlight
- spotlight is enlarged merely to mask a target/copy mismatch

If the runtime target is wrong, fix targeting/layout.
If the Copy is wrong, route the Copy correction through the current Copy owner.

## UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION

Run controlled D0 / D5 / D10 / D15 / D20 / D25 / D30 states on phone and desktop.

For each beat verify both information impact and layout economy.

PASS:
- D0 objective/investigation start is unmistakable without becoming an oversized empty reveal
- D5 identity has enough visual presence to register as the Boss reveal
- D10 combat-question beat is clearly a new investigation but remains compact
- D15 exact Trait is visually stronger than a routine notice and remains readable
- D20 route/environment beat is clearly new but remains compact
- D25 Final Family/Hazard disclosure is prominent and readable before the same-Day decision flow
- D30 creates Final-entry emphasis without presenting a new information payload
- acknowledgement/action control remains visible/reachable
- no horizontal overflow
- no avoidable vertical overflow created by art/decorative framing
- no large unused modal area around short content
- no required information is reduced to unreadable scale merely to avoid scrolling

The current 64px / 240px / 200px phone presentation measurements remain exact until the UI_UX
owner is amended. For D5/D15/D25, PASS also requires the Boss to read as a centered visual anchor,
with the owned information directly below/around it rather than a small character floating beside
unused space. If runtime evidence shows an exact value itself causes a functional failure, report
the evidence as a Functional Design finding and patch Canonical first; do not silently tune Source.

## UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY

Across ORDER / SALE / NIGHT / CLOSING / Store Management / FINAL and active modals:

PASS:
- primary, secondary and destructive actions have correct relative emphasis
- selected / disabled / completed states are distinguishable without color alone
- touch targets remain usable on phone
- keyboard focus order follows the visible interaction order
- modal close returns focus to a meaningful origin
- redraw after quantity/selection/price/detail interaction preserves useful scroll/focus context
- action feedback appears near the action/result it explains
- the same concept uses consistent visual semantics across phases
- no new panel/modal is introduced when an existing surface can express the same information

This QA is specifically allowed to catch functional layout defects discovered during the
Presentation Polish pass even when they were not listed in an earlier SA-Q item.


## UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH

Run representative MORNING / ORDER / SALE / NIGHT / CLOSING / FINAL screens and Store Support on
phone and desktop.

PASS:
- generic green is not the default primary-action treatment across phases
- green remains readable as beneficial semantic color and may remain as store-sign/environment
  material without becoming the universal CTA
- MORNING reads warm store / wood / gold
- ORDER reads paper / steel / cool frost-blue
- SALE reads register / gold-amber while existing price-mode colors keep their own meaning
- NIGHT reads dark / dusk
- CLOSING reads receipt / paper / ink with restrained neutral/gold emphasis
- FINAL keeps the existing blood / ember-red gate language
- phase differences remain accents inside one GUILD24 component language, not separate skins
- phase-bound overlays remain visually contextual; global management/help/settings remain neutral
- Store Support choice/acquisition does not fall back to generic green CTA as its identity
- semantic benefit/harm colors are unchanged
- action hierarchy remains understandable without color alone

Phone SALE speech:
- still auto-dismisses around 3 seconds and is tap-dismissible
- reserves no permanent height
- does not cover the primary action
- where it overlaps the compact customer-state strip, speech text stays fully opaque while only the
  bubble background is approximately 88% opaque
- underlying customer state remains visually recognizable
- whole-element opacity is not used to make the dialogue itself faint

FAIL:
- every phase still reads as the same green-button UI
- a new theme/skin framework is introduced for this polish
- phase accent changes semantic benefit/harm meaning
- transient speech is made faint by lowering the whole element opacity
- speech becomes a persistent blocker for required SALE information


## UI-Q-v28-31 — GAME-LIKE INTERACTION LANGUAGE

Runtime UX QA, not Source/CSS inspection. Drive the Primary Decision Control of every reviewed
Phase on phone (360 / 390 / 412) and desktop (1024 / 1280-class).

PASS:
- committing a main choice feels like handling that Phase's own object
- each Phase's handling feels different while still reading as one GUILD24 UI DNA
- Utility UI (close / back / settings / help / navigation) and gameplay decision UI are
  distinguishable in rank
- the repeated generic green rectangular CTA is gone
- Boss / FINAL no longer read as `image + information card + green confirm button`
- nested panel / card hierarchy on those surfaces is reduced, with the information folded into
  the report / record / gate itself
- the Primary Action has presence without outranking the information it acts on
- gameplay, Save, RNG and decision structure are unchanged

FAIL:
- only the colour changed and the structure is still the same SaaS CTA
- ornament was added instead of making the Phase action clearer
- everything became an exaggerated game control and the screen got busier
- a separate skin / theme system was introduced per Phase
- decoration cost information legibility or phone operability
- a touch target fell below the phone minimum, or a decorative control lost its accessible name

ORNAMENT RESTRAINT (UI_UX §ORNAMENT RESTRAINT). Audit the complete Player-facing UI. Additionally
FAIL when:
- G24 / 길드24 logo, seal or stamp marks repeat without functional/state meaning
- bolt, rivet, corner-bracket, badge or frame motifs repeat around content without need
- a control used to commit a decision is tilted or skewed
- glossy / brass / fake-metal gradient or a repeating stripe stands in for material
- Store Support uses shiny-metal / heavy-bevel ornament as its game-like identity
- the object treatment was achieved by added marks instead of flat material, hierarchy and press

Boss report sizing: at phone width the sheet claims most of the viewport and the art is at the
amended baselines, with no beat scrolling its own body at any audited width.

PIXEL / 2D GAME UI LANGUAGE (UI_UX §PIXEL / 2D GAME UI LANGUAGE). Judge the adopted selection /
commit surfaces at runtime, at the audited phone and desktop widths.

PASS:
- the selection / commit control reads as a pixel-2D game's own selection control
- surfaces are flat colour planes with crisp edges and pixel-like border / shadow / inset
- accent colour appears in small units, not as a flooded plane
- SELECTED sits on the base slate / charcoal surface and is carried by a small green accent, a
  state label and an emphasised edge
- AVAILABLE is the most legible neutral / slate surface with an amber-family action, and reads
  immediately as the open choice
- UNAVAILABLE is darker and flatter, visibly receded, and its text is still fully legible
- the register stays GUILD24's restrained colour and material

FAIL:
- glossy gradient, fake metal, or exaggerated bevel / emboss
- a large rectangular SaaS-style CTA on a selection surface
- SELECTED expressed by painting the whole card generic green
- whole-element opacity fade used for UNAVAILABLE or for a disabled action
- a disabled action that sinks into the card it sits on, or reads as pressable
- pop / candy palette or an arcade-toy register copied from a pixel reference
- the grammar applied indiscriminately, including to Utility Controls, so the screen got busier
- decoration or the pixel treatment cost information hierarchy, legibility or phone operability

Surfaces are adopted by the Polish Task that owns them; a Task closes only the surfaces it
touched, and the remainder is carried forward explicitly.
