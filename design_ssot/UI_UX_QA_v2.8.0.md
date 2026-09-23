# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,event_reveal,mobile,menu_settings,runtime_continuity,sale_handling,tutorial,typography,visual_material,final_preparation_ui
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=DESIGN_QA_SPEC
CONSOLIDATED_FROM=history/UI_UX_QA_v2.8.0-patch.md,history/UI_UX_QA_v2.7.0.md,history/UI_UX_QA_v2.6.1.md,history/UI_UX_QA_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/UI_UX_QA.md

## SCOPE

Status values are not stored here. FAIL is valid evidence.
This file defines acceptance criteria only.

Design owner under test -> UI_UX_v2.8.0.md; presentation checks -> PRESENTATION_PRINCIPLES_v2.8.0.md.

## PHASE IDENTITY / VISUAL LANGUAGE

### UI-Q01 — PHASE IDENTITY
SETUP:
Review Morning/Order/Sale/Night/Closing side by side.

EXPECT:
Each has distinct primary purpose/composition.

PASS:
They do not look like the same dashboard template with different text.

### UI-Q02 — DASHBOARD SLOP CHECK
SETUP:
Inspect major screens.

EXPECT:
No excessive:
- nested cards
- chips/badges
- same-radius containers
- thin-border boxes
- full-screen brand green

PASS:
Gameplay object/action hierarchy is stronger than container decoration.

### UI-Q27 — COPY COMPACTNESS
SETUP:
Review all primary screens.

EXPECT:
Short concrete state-based text.

PASS:
No repeated explanatory paragraphs that compete with gameplay.

### UI-Q28 — DESKTOP/MOBILE PRIORITY
SETUP:
Compare wide and narrow layouts.

EXPECT:
Same information priority, different composition where needed.

PASS:
Mobile is not just shrunken desktop.

### UI-Q95 — STRONG GREEN SEMANTIC

PASS:
Strong Sign Green is reserved for `영업 시작`.
Other routine primary actions use their material direction rather than generic green CTA repetition.

### UI-Q97 — TYPOGRAPHY EXACT

PASS:
- Atmosphere = Mulmaru
- Information = Wanted Sans
- no active Galmuri/Pretendard player UI dependency after adoption
- no third font family/theme system
- no runtime network font request
- license notice retained

### UI-Q98 — TYPOGRAPHY RESPONSIVE QA

Verify at minimum:
- mobile 360~390
- mobile 412
- desktop 1024
- desktop 1280+

PASS:
- no ORDER/SALE/Settings wrap overflow
- price/%/Stat digits readable
- ordinary SALE 50/100/150 quickly distinguishable
- Final preparation shows only its single fixed 50% / 매입가 price presentation and does not leak ordinary 100/150 controls
- no missing Korean/player-facing glyph

### UI-Q99 — ANTI-GENERIC MATERIAL PASS

PASS direction:
- existing store/paper/wood/metal/slate/receipt language remains recognizable
- no round-all-card/dashboard proliferation
- no unnecessary gradient/shadow/icon-every-row pattern
- touch targets are not sacrificed for visual styling

### UI-Q-v28-30 — PHASE VISUAL LANGUAGE / TRANSIENT SPEECH

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

### UI-Q-v28-31 — DARK PIXEL + CONTROLLED POP / GAME-LIKE INTERACTION

Runtime UX QA, not literal palette inspection.

Audit every Player-facing surface touched by Presentation Polish on phone (360 / 390 / 412) and
desktop (1024 / 1280-class). Store Support must additionally be driven through AVAILABLE /
SELECTED / UNAVAILABLE and both disabled causes.

GLOBAL PASS:
- the screen reads as one GUILD24 2D / pixel game surface, not a web dashboard with a game skin
- the environmental / information base is visually quieter than the current decision
- the few things that need immediate action or attention receive stronger controlled-pop contrast
- action / state hierarchy remains understandable without colour alone
- crisp hard edges / hard depth / flat planes carry the pixel-2D construction
- a pressable Primary Decision Control has clear physical depth / press feedback
- Utility Controls remain subordinate and need not become game objects
- Phase identity comes from material, hierarchy, placement and handling as well as any accent
- gameplay, Save, RNG, information boundary and decision structure are unchanged

GLOBAL FAIL:
- the whole UI is uniformly muted / muddy / military-dashboard-like and the decision no longer pops
- the whole UI becomes candy-colour / arcade-toy loud
- only the hue changed while the underlying interaction is still the same SaaS CTA
- every Phase is the same rectangular CTA with a different colour
- blurred shadow, soft glow, glossy gradient, fake metal or exaggerated bevel is used as the main
  source of game feel
- ornament was added instead of making the action / state clearer
- G24 / 길드24 seal, bolt, badge, frame or decorative mark repeats without functional meaning
- a coloured left vertical bar / status stripe is used as the selected-state shortcut
- visible outlines are added to every button/key by default even when plane + hard depth already separates the control
- border / inset frame / bevel / hard drop are stacked together on ordinary controls without a functional reason
- whole-element opacity is used to communicate unavailable state
- a new theme / skin framework is introduced
- touch target, legibility or accessible naming regresses

COLOUR QA:
- there are no literal Canonical hex values to match
- exact hue / saturation may change without a Design amendment when semantic roles, state hierarchy,
  contrast and this QA remain true
- do not enforce a palette by source guards that merely compare hard-coded colour literals
- semantic benefit / harm colour remains authoritative over decorative accent

PRIMARY DECISION / PHASE HANDLING PASS:
- committing a main choice feels like the Phase's own action rather than a generic web submit
- the Primary Action has presence without outranking the information it acts on
- Boss / FINAL do not collapse back to `image + information card + generic confirm button`
- nested panel hierarchy is reduced where the report / record / gate itself can own the information

PER-PHASE APPLICATION PASS:
- ORDER quantity controls read as one cluster with one recessed numeric readout; peer keys do not
  need decorative outlines, and the commit is the form's strongest physical action
- ORDER quantity hierarchy is item information > readout / stepper > `1 / 3 / 최대`; the quick set
  carries no box, pixel key plane or hard shadow, `- / +` show a face smaller than a full square
  game button, and both keep the mobile minimum touch target
- NIGHT prints the Outcome above the NPC name inside the identity block, one step stronger than
  the name, with no full-width headline row, no record-spanning underline and no vertical space
  of its own
- NIGHT prints the proven rescue Outcome as exactly `생환`
- NIGHT prints no fight verdict line at any hierarchy
- NIGHT shows the Death line in the living-line position at the same visual weight, as a neutral
  status message: no quotation marks, no speech tail, no bubble ground
- NIGHT aftermath figures use the ordinary UI type family, not the pixel / LED display face, read
  as GROWTH -> AFTERMATH -> REWARD separated by spacing or one minimal divider, keep label and
  value on one line except where phone width forces a wrap, and never look pressable
- NIGHT's last result advances with `마감으로`; intermediate results with `다음`
- ORDER's `1 / 3 / 최대` carries the subtle dotted underline when available, sharpens its
  underline / ink on hover and focus, and goes dim and non-interactive when disabled, with no
  whole-element opacity fade; `- / +` keep a 44px touch target and maxQuantity behaviour is
  unchanged (`-` at q=0, `+` at q>=max, `1 / 3` above max, `최대` a q=max shortcut)
- every NIGHT Outcome label measures 36px `var(--f-sign)` on phone (desktop may scale, one size for all Outcomes), and the NPC name and Outcome summary
  measure the same whichever Outcome resolved
- a NIGHT Death renders zero result-data rows and leaves no divider or reserved space where that
  region would be, and no route change, Deep tag, Item / supply cause or incident line either -
  it ends on its Outcome summary
- the NIGHT Death message sits in the living line's position in a small text-hugging status
  container whose COOL SLATE / BLUE-BLACK plane is clearly one step brighter than the NIGHT
  background and separable from it in the runtime screenshot at 360 / 390 / 412, including over
  the character art: no quotation marks, no tail, no left accent bar / status stripe, no
  decorative border or outline, no icon, no glow or blur, no paper / parchment treatment. A
  background value present in the DOM is not a PASS on its own.
- a NIGHT record starts under the return rail and is not vertically centred: a short result does
  not float in the middle of the viewport, and no spacer or excess dead space replaces the
  centring
- the NIGHT closing-handover control reads immediately as the ACTIVE Primary Action, visibly
  above `전체 건너뛰기` and clearly separated from the NIGHT surface; a flat grey dead-button
  impression FAILS, as do purple / lavender, green, a heavy outline, an inset frame and any
  glossy or bevelled treatment
- that control's plane is a moonlit cold blue / muted cobalt, brighter and more saturated than
  the NIGHT dock and background, with an unmistakably blue hue that has not drifted to
  cyan / teal or gone neon, an ivory / near-white label, and exactly one hard bottom/right depth
  the press collapses. Amber, gold, mustard, brown, purple / lavender, green and a grey
  disabled-like plane all FAIL
- an equipment Stat bonus reads `투력 +N`, never `전투 +N`, with the equipment identity visually
  separated from the Stat effect
- the MORNING shutter pull carries no repeating-stripe gradient, while the register readout glow
  and the SALE sticky scrim remain as functional layers
- FINAL roster header owns the selection count (`선택 N명 · 최대 M명`); the disabled dock remains `원정대 확정` and does not duplicate that count
- SALE price modes read as peer register keys; no key is promoted by a stronger frame, refused keys
  lose depth, and the send-customer action stays Secondary
- NIGHT Outcome is the visual anchor and different outcomes do not read as one identical card with
  only the label changed
- CLOSING remains a receipt / settlement record rather than a grid of KPI cards
- D5 / D15 / D25 Boss art has central presence without displacing required information; D10 / D20
  stay compact
- FINAL reads as one final decision surface; its commit is heavy but not an ornamental giant button

PER-PHASE APPLICATION FAIL:
- ORDER / SALE game feel is created by outlining every key
- SALE semantic mode colour is moved onto three decorative borders when the key labels already carry
  the distinction
- NIGHT / CLOSING are still generic cards with only copy changed
- Boss presence is solved by either tiny art in dead space or oversized art that hides the reveal
- FINAL is still an ordinary page with a differently coloured submit button

STORE SUPPORT PASS:
- AVAILABLE / SELECTED / UNAVAILABLE are distinguishable at a glance by more than colour alone
- no green UI accent is used for Store Support selection / ownership / action / success state
- AVAILABLE owns the strongest controlled-pop action and is the only state that looks pressable
- SELECTED stays in the same base material family, with multiple completion cues and no generic
  success-colour flood
- when card height is unchanged, `보유 중` keeps the AVAILABLE control's footprint but loses
  press depth and hover / active affordance
- UNAVAILABLE recedes while all required copy remains readable
- `선택 종료` / `골드 부족` or the current approved equivalent names the disabled cause rather
  than leaving a dead `구매`
- no vertical selected strip, decorative seal, shiny metal, gradient, blurred glow or heavy bevel

STORE SUPPORT FAIL:
- selected / owned is represented by green
- state distinction rests on one border alone
- `보유 중` shrinks into a web-style status chip while the card itself keeps its full height
- unavailable action still looks pressable
- the card/action palette is so uniformly dull that the screen reads as an admin tool rather than
  a game decision
- exact implementation colour values are promoted back into Canonical without a new User decision

### UI-Q-v28-25 — TARGETED GRAPHIC POLISH

For each art/icon/crop/scale asset changed under the polish pass:

PASS:
- the object still reads as its current canonical identity
- two distinct gameplay objects are not made visually identical
- no crop hides decision-relevant information
- no decorative layer creates a false mechanic/state implication
- mobile and desktop render without overflow or obscuring the primary action

This QA does not authorize a new Item wave, portrait wave, environment set or theme system.

## FUNCTIONAL LAYOUT / MOBILE / ACCESSIBILITY

### UI-Q-v28-26 — FULL FUNCTIONAL DESIGN AUDIT

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

### UI-Q-v28-29 — CONTROL / FEEDBACK / LAYOUT CONTINUITY

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

This QA may catch functional layout defects even when they are not covered by another current QA item.

### UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
SETUP:
Capture actual browser screenshots at 360px, 390px, 430px for:
- Morning
- Order
- Sale
- Night
- Closing
- Relic reveal
- Final prep

EXPECT:
- core text readable without zoom
- unnecessary side gutter minimized
- current decision/action is clear in first viewport
- game art/object does not push necessary decision information excessively downward
- layout is recomposed, not merely shrunken desktop
- sticky action/safe area remains reachable

PASS:
All three widths are practically playable and do not feel like a tiny desktop page.

### UI-Q22 — TOUCH TARGETS
SETUP:
Inspect repeated mobile actions.

EXPECT:
Practical ~44px-class targets for:
- +/-
- price
- confirm
- next
- reroll
- item/customer selection

PASS:
No dense tiny tap zones.

### UI-Q23 — SAFE AREA
SETUP:
Test mobile browser with top/bottom chrome and safe-area devices.

EXPECT:
No clipped:
- header
- sticky footer
- primary action

PASS:
Controls remain reachable.

### UI-Q24 — COLOR-INDEPENDENT SIGNAL

SETUP:
Inspect Trait effect lines, preparedness, selected, disabled states.

EXPECT:
- Trait benefit/cost meaning is not inferred from color alone
- effect wording remains clear without color
- preparedness/selected/disabled states also have text/icon/shape reinforcement

PASS:
Meaning is not color-only and Trait header color is not used as a hidden quality grade.

## MORNING

### UI-Q03 — MORNING HIERARCHY
SETUP:
Open Morning on both Event and non-Event Days.

EXPECT:
Non-Event Day:
- visitor forecast / Gate / known Hazard are quickly readable

Event Day:
- Event receives a focused opening reveal before Gate detail
- Event title and actual effect are understandable immediately
- after confirmation, the normal Morning Situation shows the Event-modified state
- no separate EVENT Phase is created

PASS:
Today's situation is understandable and a meaningful Event is not buried among ordinary cards.

### UI-Q80 — MORNING REQUIRED SUPPLY

PASS:
- Morning keeps current compact Gate/Hazard structure
- required Supply is shown as exact `필요 보급 N`
- no added recommendation paragraph / easy-medium-hard Supply label

### UI-Q101 — MORNING NEXT-DAY GATE FORECAST

Before ORDER on controlled next-Day states:

PASS:
- MORNING shows next-day Gate-count forecast
- randomized count shows exact probability per possible count
- deterministic count shows fixed count rather than fake split
- MORNING shows exact next-day T1/T2/T3 probability forecast
- values match `DUNGEON_HAZARD_v2.8.0.md` / `ECONOMY_ORDER_v2.8.0.md`
- current-day Gate/Hazard remains more prominent as today's preparation context
- next-day Family / exact Gate composition / Hazard set remain hidden
- future customer identity/destination remains hidden
- no recommended Item/category/quantity is added

If ORDER repeats the forecast:
PASS only when the values exactly match MORNING and are not regenerated independently.

### UI-Q09 — TIER FORECAST VISIBILITY
SETUP:
Open Morning/Order before spend.

EXPECT:
T1/T2/T3 next-day percentages visible and compact.

PASS:
Player can act on them before order commitment.

## ORDER

### UI-Q04 — ORDER SCENE
SETUP:
Open Order.

EXPECT:
No unnecessary convenience-store scene dominating the page.

PASS:
Management information is primary.

### UI-Q05 — ORDER FUNDS
SETUP:
Change order quantities.

EXPECT:
Persistent:
- current Gold
- selected spend
- Gold after order

PASS:
Values remain visible and correct.

### UI-Q06 — ORDER OFFERS
SETUP:
Open mobile/desktop Order with base offer count, then with any authoritative offer-count modifier.

EXPECT:
Base count=6. Modified counts may exceed 6. In both cases the offer list remains compact and scannable.

PASS:
UI supports the actual offer count without excessive card height or unnecessary scrolling.

### UI-Q07 — ORDER PRIMARY ACTION
SETUP:
Select order items.

EXPECT:
Confirm action is obvious and sticky/accessible.

PASS:
Player does not need to scroll back to find final action.

### UI-Q08 — REROLL VISIBILITY
SETUP:
Open Order with and without `발주 교환권`, then use Reroll repeatedly.

EXPECT:
- control clearly means Full-offer Reroll
- current cost is easy to find before use
- with `발주 교환권`, first daily cost is visibly 0G
- after use, the next same-Day cost updates to the next normal step

PASS:
No hidden/ambiguous Reroll scope, free-use state, or current cost.

### UI-Q61 — ORDER ACTION SPLIT

EXPECT:
- sticky/obvious `발주 확정` when cart exists
- after confirm, ORDER remains
- separate `영업 시작` action exists

PASS: one button/action is not responsible for both purchase and phase transition.

### UI-Q62 — ORDER REROLL WITH SELECTION

EXPECT:
- Reroll enabled with unconfirmed selected quantity when affordable
- clear indication that whole Offer set is replaced
- no instruction requiring quantity reset to zero

### UI-Q63 — ORDER DECISION INFO

EXPECT readable before commitment:
- shelf life
- current Gold
- selected spend
- after-order Gold
- today expected operating cost
- warehouse usage/remaining
- current Reroll cost

### UI-Q64 — ORDER SCROLL / FOCUS

Mobile + desktop interaction:
- +/-
- 0 return
- confirm
- Reroll
- re-confirm

PASS: current offer location does not jump to top; practical focus preserved where possible.

### UI-Q81 — ORDER ITEM HIERARCHY

Inspect desktop/mobile offers.

PASS:
- Item identity and exact effect read before economy metadata
- exact Stat/Counter/Supply/penalty values are readable
- no redundant role chip such as `속박 전문` above `속박 대응 +16`
- no today-fit/recommended badge
- no automatic best-fit ranking

### UI-Q82 — ORDER WAREHOUSE COLLAPSE

Mobile:
- capacity summary remains always visible
- individual stock list can collapse/expand
- used/remaining capacity is not hidden by collapse
- current ORDER-session open/closed state remains stable through ordinary rerenders

## SALE — LAYOUT / CUSTOMER

### UI-Q10 — SALE STORE PRIORITY
SETUP:
Open Sale.

EXPECT:
Store/customer is visual focus.

PASS:
Secondary cards do not overpower NPC decision.

### UI-Q11 — SALE NPC MOBILE STACK
SETUP:
Open narrow mobile viewport.

EXPECT:
NPC info stacks vertically:
identity/job
destination
stats
traits
condition
bag

PASS:
No tiny compressed multi-column block.

### UI-Q65 — SALE DESKTOP HIERARCHY

EXPECT:
- Character / Portrait left
- enlarged Bag
- upper-right Core Decision area contains Forecast + Expected Destination
- NPC Wallet visible in Core Decision hierarchy
- no duplicate lower destination/forecast panel

### UI-Q66 — SALE MOBILE HIERARCHY

EXPECT:
- compact Character/status footprint without artwork crop
- enlarged Bag with no overlap/overflow
- compact destination
- core environment visible without tap
- Forecast in decision flow
- no duplicated environment/forecast information

### UI-Q109 — MOBILE SALE PLAYABILITY

Verify a real browser at 360 / 390 / 412 phone widths.

PASS:
- upper customer/decision summary occupies about half or less of usable SALE height
- Item / price / transaction surface receives at least about half
- shelf heading and at least one selectable Item row are visible at initial SALE entry without a scroll
- character art is contained, not cropped or stretched
- character and right-side information align without fixed-height overflow
- Bag is exactly two slots in the upper-right and each is ~44px touch class or larger
- no required SALE decision information disappears to achieve the compact layout
- fixed bottom dock remains reachable and does not cover the sale surface

FAIL:
- product selection remains pushed below an oversized character presentation
- a short phone clips/overlaps the upper block
- any desktop-only duplicate becomes the visible tutorial target on phone

Bag slot size is a documental baseline, not a fixed requirement: ~44px is the current shipped
value and may move with the layout provided the slots stay a real touch target.

#### CONFIRMED PLACEMENT — ENVIRONMENT READINESS

The destination block stays in the counter band and keeps what is
true of the place: the Gate, its Hazards, and the ability each Hazard presses on.

This customer's readiness against it reads in the forecast instead, labelled `환경 대응`, beside
`전투 전망` and `실패 시 사망 위험`. It is the same canonical ladder off the same frozen
SALE-entry snapshot; the environment is still stated exactly once on the screen, and the help
that explains pressure and readiness moves with it.

PASS:
- the destination block states Hazard pressure only
- `환경 대응` is rendered in exactly one place, in the forecast
- per-Hazard readiness no longer wraps the destination rows or pulls a row for its own help

### UI-Q-v28-3 — MOBILE SALE QUEUE

At mobile width:
- decorative waiting-line/fan/next-customer card is absent
- bottom Dock retains one queue progress/count
- desktop may still show richer queue presentation
- no duplicate queue count consumes vertical space

### UI-Q-v28-4 — CURRENT CUSTOMER STATE

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

### UI-Q110 — TRANSIENT CUSTOMER SPEECH

PASS:
- speech is overlay/presentation and reserves no permanent layout height
- new line appears
- it auto-hides after 3 seconds
- tapping it hides immediately
- a new line restarts the 3-second display
- same unchanged line does not reappear merely because SALE rerendered
- no Save/account schema is added for speech visibility

### UI-Q67 — NPC WALLET VISIBILITY

Before choosing a price, Player can see NPC current wallet and compare it to the selected sale price.
PASS: affordability can be judged without opening a secondary modal.

### UI-Q-v28-11 — LOYALTY HELP

Normal SALE:
- shows compact Loyalty value/state
- does not show a dedicated Loyalty `?` / anchored popover trigger

Tutorial/coach:
- explains purchase-intent and revisit meaning
- says 51 = 단골
- does not leak unrevealed Boss-specific information

Global compact Help remains under its existing copy owner; it is not a second contextual SALE tooltip.

### UI-Q-v28-12 — EVENT TEMP BUDGET

On 길드 급여일:
- persistent Wallet and temporary purchase budget are distinguishable
- affordability uses both
- UI does not imply temporary budget persists

### UI-Q29 — RETURNING NPC DELTA VISIBILITY
SETUP:
Revisit an NPC after meaningful growth/injury/recovery/expedition history change.

EXPECT:
Relevant since-last-visit change/history is immediately noticeable while full current profile remains accessible.

PASS:
Player does not need to reread the entire unchanged profile to understand what changed.

### UI-Q90 — RETURNING NPC LAST BAG

Returning customer with snapshot:
PASS:
- compact `지난 원정 · DAY X · 결과 · [item] [item]`
- exact actually accepted items only
- empty slot preserved
- mobile Wallet/Destination/Forecast hierarchy not displaced
- expanded causal text only from proven tokens

### UI-Q91 — QUEUE UNCERTAINTY

PASS:
future customer Job/Level/Destination/preparation need/importance is not newly revealed.
Existing authorized queue-count info may remain.

### UI-Q68 — SALE SCROLL / FOCUS

Within same Customer test:
- item select
- price panel open/close
- purchase success
- refusal + reselection
- detail/accordion open/close

PASS: current viewed position stays stable.
New Customer may intentionally reset to top.

### UI-Q74 — NEXT PORTRAIT PRELOAD

On real mobile transition to next Customer:
PASS: next portrait is preloaded using a minimal browser preload path and no visible blank/loading regression is introduced.

### UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE

PASS:
- ORDER exposes compact access to currently owned 점포지원 before commitment
- SALE exposes compact access to currently owned 점포지원 before commitment
- both reuse the existing owned-Relic truth/detail surface
- no duplicate Relic-effect store is introduced
- controls do not crowd the primary phone decision surface

## SALE — ITEM / TRANSACTION

### UI-Q12 — INVENTORY REACHABILITY
SETUP:
Sale with many items.

EXPECT:
All sellable inventory can be reached/compared.

PASS:
No hidden items due to consumer-slot UI.

### UI-Q13 — PRICE BUTTONS
SETUP:
Sale on mobile.

EXPECT:
50/100/150 are visually distinct, large enough, and easy to switch.

PASS:
No mis-tap-prone tiny buttons.

### UI-Q25 — ITEM DECISION INFO
SETUP:
Order/Sale item comparison.

EXPECT:
Player can see key:
- effect
- relevant Counter
- explicit penalty
- price

PASS:
Basic choice does not require encyclopedia hopping.

### UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
SETUP:
Process a Customer through multiple Consumer Slots including a purchase/refusal that can change the next-slot choice.

EXPECT:
Inspect -> Item -> price -> result -> remaining-slot decision is continuous with no unnecessary modal/page round trip or redundant routine confirmation.

PASS:
Interaction cost is reduced without batching away the sequential decision.

### UI-Q87 — TWO-SLOT HANDLING

All ordinary NPC levels:
PASS:
- exactly two visible Bag slots
- each mobile target ~44px class
- focus/replace/remove state clear
- tap-only completion works
- drag not required
- no third ghost slot

### UI-Q88 — SEQUENTIAL TRANSACTION

Within one ordinary customer:
- first slot transaction resolves purchase/refusal
- state updates
- remaining slot remains a new decision

FAIL:
- two-slot cart checkout
- both items committed atomically as one bundle

### UI-Q100 — SALE REFUSAL PRICE CEILING

Controlled same ordinary customer + same SKU visit.

Case A:
- refuse at 50%

PASS:
- 100% and 150% controls become disabled and non-interactive for that SKU
- reason is readable
- lower-price refusal does not trigger a new higher-price acceptance roll

Case B:
- refuse at 100%

PASS:
- 150% disabled
- 50% may remain usable

Case C:
- refuse at 150%

PASS:
- 100% / 50% may remain usable

Isolation PASS:
- unrelated SKU price controls remain unaffected
- new customer visit does not inherit the previous visit lock unless another owner explicitly defines it
- Final preparation does not show this refusal-price ceiling UI because Final has no refusal roll and no 100/150 modes

### UI-Q102 — SALE NON-DECISION DETAIL REMOVAL

PASS:
- `이 손님에게 안 걸리는 효과` is absent from the SALE customer decision surface
- flavor-only `상품 설명` disclosure is absent from SALE
- exact actionable Item effects remain readable
- no replacement accordion/modal is added solely to preserve the removed flavor

FAIL:
- a disclosure control remains that visually implies strategic information but opens only flavor text

### UI-Q-v28-15 — SALE COPY DENSITY

Selected Item:
- one heading \`판매 후 변화\`
- no \`이 상품이 직접\`
- no \`보급이 상태에 미치는 영향\`
- no \`이 손님에게는 지금 걸리지 않는 효과\`
- conditional non-delta Item truth may appear under \`특수 효과\`
- no permanent forecast explanation paragraph

Exact forecast help is available through anchored popover.

## SALE — FORECAST / PREPARATION INFORMATION

### UI-Q14 — FORECAST LANGUAGE
SETUP:
Inspect Sale forecast.

EXPECT:
Combat:
우세/접전/불리

Hazard:
취약/불안/대응/충분

PASS:
No exact probability or master score.

### UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK

Controlled ordinary SALE customer before any Item transaction.

PASS:
- heading is exactly `보급 전 원정 전망`
- qualitative Combat Forecast is shown from the SALE-entry state
- qualitative Hazard Readiness is shown from the SALE-entry state
- the exact risk label is `실패 시 사망 위험`
- exact pre-supply 실패 시 사망 위험 % is shown from the same state
- the percentage is clearly conditional on the expedition entering a failure path, not presented as unconditional whole-expedition Death probability
- exact expedition Success probability remains hidden
- after first and second committed Item transactions, the three outlook values remain unchanged on screen
- post-commit exact Item/effect/source deltas may still update
- actual expedition Resolve uses the final prepared state, not the frozen display snapshot
- a healthy fully prepared controlled state may show 0% 실패 시 사망 위험 when the current formula produces 0
- injured pre-supply 실패 시 사망 위험 includes the canonical +10%p modifier and respects the 40% cap

### UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK

Select/focus an uncommitted Item.

May show:
- exact Item effect
- price/affordability
- deterministic Supply/Fatigue arithmetic

Must not show hypothetical post-Item answers:
- `접전 -> 우세`
- `불안 -> 충분`
- 실패 시 사망 위험 `% -> %` change
- Great Success signal change
- exact expedition Success probability

The already-visible exact 실패 시 사망 위험 % is allowed only as the fixed pre-supply snapshot.

After actual purchase commit, PASS only if:
- displayed Combat Forecast remains the original pre-supply snapshot
- displayed Hazard Readiness remains the original pre-supply snapshot
- displayed 실패 시 사망 위험 % remains the original pre-supply snapshot
- exact Item/direct-effect and proven source-attributed numeric changes may update
- no post-commit derived expedition answer is substituted before the remaining-slot decision.

### UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH

Use current `집중 사탕` (`공포 +10 / Supply 3`) in three controlled setups.

#### Case A — no active Supply Deficit change, no Fatigue penalty-band change

PASS:
- direct effect shows 공포 Counter / Supply only
- 투력/강인함/기동/정신 do not rise
- no hidden direct Core-Stat effect is attributed to 집중 사탕

#### Case B — its Supply reduces an active Supply Deficit

PASS:
- effective 투력/강인함/기동/정신 and underlying Hazard preparation may improve if the canonical unified Supply Deficit system actually changes them
- any displayed Core-Stat delta is attributed to `보급 부족 완화` or equivalent system source
- displayed pre-supply Hazard Readiness remains frozen rather than being replaced by a new readiness label
- displayed pre-supply 실패 시 사망 위험 remains frozen rather than being replaced by a new percentage
- UI does not imply that 집중 사탕 directly grants those Stats
- exact hidden deficit formula remains undisclosed

#### Case C — excess Supply crosses a Fatigue penalty band

PASS:
- effective 기동/정신 may rise according to the current Fatigue owner
- displayed delta is attributed to `피로 완화` / Condition source
- direct Item effect remains separately readable

All cases:
- exact post-commit Item/effect/delta rows match runtime preparation truth
- direct Item effect and derived system effects are not conflated
- the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot remains clearly identified as pre-supply and is not replaced by post-commit derived answers
- a generic `판매 후 변화` block is allowed only if those source classes are immediately distinguishable
- otherwise the synthetic block is removed rather than turning the outlook into a post-commit answer dashboard

### UI-Q-v28-7 — GREAT SUCCESS SIGNAL

During one customer visit:
- focusing an Item does not change signal
- successful committed purchase recomputes signal
- signal may appear or disappear
- Combat/Hazard/Death readouts remain frozen
- exact probability is not exposed

### GREAT SUCCESS SIGNAL
PASS:
- exact copy `대성공을 노려볼 만합니다.`
- visible while preparation can still change
- exact % / margin / formula hidden

### UI-Q84 — FOUR CORE STATS REMAIN VISIBLE

SALE primary decision surface keeps:
- 투력
- 강인함
- 기동
- 정신

PASS:
- not moved behind accordion/detail
- actual applied source labels remain truthful
- calculation breakdown is drill-down detail

### UI-Q69 — STAT SOURCE

PASS:
- changed stat highlighted
- only actual applied source names shown
- helpful/harmful semantic treatment correct
- inactive source absent
- Wallet/purchase intent/revisit not shown as Stat sources
- tap detail matches actual calculation

### UI-Q-v28-5 — SEMANTIC DELTA

For changed Stats/Fatigue/economy values:
- benefit = green
- harm = red
- unchanged = default
- generic yellow moved-only treatment is not used as meaning

Color is not the only source cue.

### UI-Q-v28-6 — SHARED POPOVER

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

### UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY

PASS:
- Item shows exact Stat/Counter/Supply
- Gate shows qualitative readiness
- exact Gate Counter threshold stays hidden

### UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER

PASS detail may show:
- Hazard
- pressured Stat
- required Supply
- readiness meaning

FAIL if it exposes:
- recommended SKU/category
- optimal combination
- exact hidden Hazard requirement/formula

### UI-Q26 — HAZARD NUDGE
SETUP:
Inspect known hazard presentation.

EXPECT:
Hazard relevance is clear.

PASS:
UI does not directly prescribe exact optimal Item.

### UI-Q35 — HAZARD EFFECT ACCESS
SETUP:
Inspect all authoritative Hazards on PC and mobile.

EXPECT:
- each Hazard provides its short Stat-pressure explanation
- PC hover/focus works where tooltip is used
- mobile tap/inline gives equivalent information
- current Gate summary can surface the explanation without encyclopedia hopping

PASS:
No hover-only or inconsistent Hazard explanation.

### UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC

Controlled setup with known Fatigue/Supply/Trait.

PASS:
- Required/Prepared/Deficit values match runtime
- departure Fatigue matches runtime
- no single Outcome is predicted as guaranteed

### UI-Q-v28-8 — FATIGUE

SALE:
- no hypothetical Outcome fatigue matrix
- current/departure Fatigue and compact Supply arithmetic readable

NIGHT:
- main label is 귀환 후 피로
- detailed path available on demand
- 보급 회복 / 보급 완화 / 밤 피로 are absent as primary labels

### UI-Q32 — PLAYER STAT TERMINOLOGY
SETUP:
Inspect NPC profile, Item previews, growth/result displays, and any stat labels.

EXPECT:
Player-facing core stats are consistently:
- 투력
- 강인함
- 기동
- 정신

Actual battle/fight wording may still use `전투`.
Internal Power/Party Power is not exposed as another player stat.

PASS:
No player stat remains mislabeled as `전투`.

### UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
SETUP:
Open NPCs with positive, mixed, and negative internal Traits.

EXPECT:
- no Player-facing `이점/양면/약점`
- no ▲/◆/▼ Trait quality label
- each effect line follows authoritative semantic tone metadata
- mixed Trait can visibly contain both helpful and harmful lines

PASS:
Player reads effects and makes the judgment.

### UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
SETUP:
Trigger the destination reliability tutorial, 허세, and 게이트 순례주간.

EXPECT:
- Tutorial says: `이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.`
- Tutorial does not frame 허세 as the whole destination system
- Sale label uses 예상 목적지 where uncertainty is possible
- 게이트 순례주간 Morning reveal states 1–3 affected range
- actual N / affected identity / changed Gate remain hidden until Night
- Night shows actual changed count and expected -> actual destination on affected NPC results

PASS:
Information is uncertain but not unfairly opaque, and no extra Event-result phase is created.

## DEEP EXPEDITION

### NOMINATION UX
PASS:
- one NPC maximum
- current visitor only
- before first committed transaction
- sponsorship exactly once
- destination + forecast update
- no cancel/swap
- skip has no cost/penalty
- future visitor identity remains hidden

Mobile follows existing touch/hierarchy rules.

### UI-Q-v28-16 — DEEP REPEAT COPY

After first tutorial:
- Morning uses the exact two-line repeat copy
- SALE nomination uses the exact two-line cost/reward copy
- no duplicate long tutorial paragraph appears in both places

## NIGHT

### UI-Q16 — NIGHT RESULT
SETUP:
Open Night.

EXPECT:
One NPC result at a time with hierarchy:
what happened
why
what changed

PASS:
Not a debug log or modifier ledger.

### UI-Q31 — NIGHT IMPORTANCE WEIGHTING
SETUP:
Compare routine success with meaningful level-up/injury/death/decisive-Item/callback results.

EXPECT:
Routine result is compact; meaningful result receives stronger visual emphasis.

PASS:
Night does not force every NPC result to consume equal presentation time.

### UI-Q70 — NIGHT CONTROLS

EXPECT exactly:
- 다음
- 전체 건너뛰기

PASS:
- no single `건너뛰기`
- no active `nightSkip` UI reference

### UI-Q92 — NIGHT RESULT TRUTH

PASS:
- actual Supply preRecovery/outcome buffer use can be read when relevant
- final Fatigue matches runtime
- First Aid Aftercare shown only if it actually changed persistent Injury state
- no invented `전투 부족` / `독 대응 부족` diagnosis
- `다음 / 전체 건너뛰기` controls remain exact

### UI-Q-v28-9 — NIGHT REACTION

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

### UI-Q-v28-23 — NIGHT RESULT PRESENTATION

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

## CLOSING

### UI-Q18 — CLOSING ECONOMICS
SETUP:
Open Closing.

EXPECT:
Economic result is visually primary:
revenue/COGS/margin/overhead/waste/relic/final Gold

PASS:
Night story is not duplicated as dominant content.

### UI-Q-v28-13 — CLOSING FOOTER

The redundant internal-accounting footnote is absent from the primary receipt.

### UI-Q-v28-17 — CLOSING ECONOMICS ONLY

Primary Closing receipt has no \`오늘의 보급 영향\` block and no internal-accounting footer.

NIGHT remains the result/causality owner.

## RELIC / STORE SUPPORT

### UI-Q36 — RELIC VISIBILITY / QUICK VIEW
SETUP:
Own Relics and move through Morning -> Order -> Sale.

EXPECT:
Owned Relic effects remain quickly accessible in all three phases.
Sale view is read-only.

PASS:
Player can recall store-build effects while making decisions without violating purchase timing.

### UI-Q37 — RELIC MILESTONE REVEAL
SETUP:
Reach D5/D10/D15/D20/D25/D30.

EXPECT:
New candidate window receives one focused reveal.
Buy / `나중에 결정` are clear.

PASS:
D10/D15 etc. never feel like the Relic choice simply failed to appear.

## BOSS / FINAL

### UI-Q93 — FINAL TIMELINE

PASS:
- D0 objective notice
- D10 FINAL20
- D20 FINAL10 + Recon beat
- D25 FINAL5 + exact persisted Family/Hazard disclosure
- D30 reuses known state
- no permanent new Final dashboard required

### UI-Q40 — BOSS / RELIC REVEAL ORDER
SETUP:
Reach D5, D15, D30 with relevant Boss state.

EXPECT:
- D5 Identity is read before D5 Relic choice
- D15 exact Trait is read before D15 Relic choice
- Save/Reload does not reorder or replay reveals as an exploit

PASS:
The Player receives information before the decision it is intended to affect.

### UI-Q41 — SLOTH WINDOW CHOICE CLARITY
SETUP:
Open a selected SLOTH opportunity window.

EXPECT:
Player can distinguish the mutually exclusive outcomes:
- acquire normal Relic
- break one Sloth Seal for 0G

PASS:
No UI implies both can be obtained from the same window.

### UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
SETUP:
Reach D5 and D15 for multiple Bosses, then enter Final with:
- PRIDE
- ENVY
- GREED
- GLUTTONY
- LUST
- one non-SLOTH ordinary Boss
- SLOTH at Seal Break 0 and at 1/2/3 where practical

EXPECT:

D5:
- in-world `길드 토벌 공고` framing
- correct D5/D15 BASE art
- correct fixed Boss name
  - GLUTTONY identity follows `BOSS_v2.8.0.md`: `탐식의 마왕 글러트니`
- correct Boss-specific Flavor
- exact Trait remains hidden

D15:
- `길드 정보 보고` framing
- same BASE identity art
- exact Trait Function visible
- no strategy advice replacing Function
- no internal design terminology in Player-facing copy

D25:
- `최종 정찰 보고` framing
- exactly two Families
- each Family's actual T2 Hazard set
- authoritative Hazard pressure wording
- Family count is not mistaken for a fixed Hazard-key count

Final preview:
- PRIDE participant 투력 original -> applied
- ENVY target 4 Stats original -> applied
- GLUTTONY preview follows `BOSS_v2.8.0.md`: all positive Core-Stat contribution originating from Items is reduced to 50%; no Rarity threshold
  - Counter / Supply / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
- LUST affected non-regular participant 4 Stats original -> applied
- GREED display matches actual applied strengthening
- SLOTH displayed state matches Seal state

Final art:
- ordinary Boss uses D30 BATTLE
- SLOTH SB0 reuses BASE
- SLOTH SB1/SB2/SB3 uses matching D30 state
- Final confrontation is not text/name-only

PASS:
Boss art, exact information timing, and previewed applied values match the actual Final resolution without creating a new permanent Phase or exposing exact success probability.

### UI-Q-v28-10 — BOSS MOBILE DENSITY

At 360x800:
- D0 has no Boss art and presents the objective/cadence as basic dossier information
- D5/D10/D15/D20 Boss art max-height baseline 240px
- D25 Boss art max-height baseline 200px
- D5/D10/D15/D20 reuse the same centered Boss-art family
- D10/D20 are compact because their report payload is shorter, not because the Boss becomes a
  64px icon
- no small-Boss + wide-empty-space composition
- core information and acknowledgement are not pushed off first viewport solely by art

### UI-Q-v28-24 — BOSS / FINAL PRESENTATION PAYOFF

Verify the current presentation around D0 / D5 / D10 / D15 / D20 / D25 / D30.

PASS:
- each cue/art treatment reveals no information earlier than its owning beat
- after the first DAY 0 Store Support choice, D0 is the first presentation step of DAY 1 MORNING
- D0 blocks ordinary Morning progression until acknowledged but consumes no time / RNG / resource
- D0 has no Boss identity, art, silhouette, Trait, Final state or FINAL domain backdrop
- a pre-acknowledgement save still owes D0 after reload; a post-acknowledgement save does not replay it
- a save already beyond DAY 1 does not receive D0 retroactively
- D25 presentation may reflect the exact Final state only after that state is revealed
- D30 may intensify FINAL entry but adds no new Boss-information beat or fact
- Boss/Final presentation does not consume Gameplay RNG
- existing seen-state / Save-Load behavior remains unchanged
- at mobile width, information and acknowledgement remain usable

### UI-Q-v28-28 — BOSS / MILESTONE FUNCTIONAL PRESENTATION

Run controlled D0 / D5 / D10 / D15 / D20 / D25 / D30 states on phone and desktop.

For each beat verify both information impact and layout economy.

PASS:
- D0 first-Morning objective / investigation start is unmistakable without Boss art or an oversized empty reveal
- D5 identity has enough visual presence to register as the Boss reveal
- D10 combat-question beat is clearly a new investigation and remains concise while retaining the full Boss-art family
- D15 exact Trait is visually stronger than a routine notice and remains readable
- D20 route/environment beat is clearly new and remains concise while retaining the full Boss-art family
- D25 Final Family/Hazard disclosure is prominent and readable before the same-Day decision flow
- D30 creates Final-entry emphasis without presenting a new information payload
- acknowledgement/action control remains visible/reachable
- no horizontal overflow
- no avoidable vertical overflow created by art/decorative framing
- no large unused modal area around short content
- no required information is reduced to unreadable scale merely to avoid scrolling

Boss report detail PASS:
- no artificial floor/divider line remains under D5/D15/D25 Boss art
- D5 Flavor has no non-semantic left accent bar
- D15 Trait uses typography/spacing only: no left accent bar and no replacement text box
- D25 keeps semantic Family colour rules but has no extra black top rule above the Family section

The current 240px / 200px phone presentation measurements remain exact until the UI_UX
owner is amended. For D5/D10/D15/D20/D25, PASS also requires the Boss to read as a centered visual anchor,
with the owned information directly below/around it rather than a small character floating beside
unused space. If runtime evidence shows an exact value itself causes a functional failure, report
the evidence as a Functional Design finding and patch Canonical first; do not silently tune Source.

### UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT

Controlled D30 Final with eligible participants.

PASS order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- participant selection is confirmed before Final preparation begins
- selected participants are handled one at a time using the familiar two-slot Item interaction
- each participant has exactly two visible Item slots
- selected Item shows exactly one fixed Final price: ordinary 50% / 매입가 amount
- 100% / 150% controls are absent
- purchase/refusal chance and refusal-result UI are absent
- same-SKU refusal-price lock UI is absent
- Wallet / affordability / inventory state remain readable
- unaffordable transfer is visibly non-committable with readable reason
- committed transfer updates stock and NPC Wallet before the remaining-slot decision
- Player Gold increases by the same fixed amount
- Gross Sales increases by the same fixed amount exactly once
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.8.0.md`
- Boss-caused visible Item changes use the current Final truth
- there is no separate attack/QTE/combat-control layer
- there is no second free-equip screen after Final preparation
- after all participant preparation interactions finish, the UI advances to the one Final result

### UI-Q-v28-32 — FINAL PARTY / PREPARATION

Run D30 Final on phone and desktop.

PASS:
- unselected Final roster cards do not use rarity-coloured outer frames that compete with selection
- selected state is immediately distinguishable; rarity remains readable as text
- 1, 2 or 3 participants can be deliberately committed when eligible
- the selection stage shows the approved forecast-after-commitment guidance and no combat forecast
- a sub-3 party receives the approved confirmation before commitment
- after commitment exactly one party-wide `토벌 전망` is shown
- the first activated `토벌 전망` is explained once by the existing Coach
- afterward the same explanation remains reachable through the anchored `?` Help
- no standing forecast-explanation paragraph remains under the readout
- 1/2/3-person forecasts use the actual committed party
- the forecast updates after a committed Final transfer
- no individual `전투 전망` or failure-to-death percentage survives in Final preparation
- no player-facing `Final 효과 없음` copy remains
- no-effect Item uses the approved Demon-Castle copy and cannot be committed
- insufficient Wallet shows exact required/owned Gold inline and transfer remains disabled
- no ordinary SALE purchase/refusal dialogue appears in Final preparation
- an otherwise valid affordable Final transfer is deterministic
- no horizontal overflow at 360/390/412 and desktop 1024/1280
- the sub-3 confirm's two actions share one geometry family; no visible header 닫기 beside `돌아가기`
- Final action labels are one line at 360/390/412; body / Item-effect text may wrap
- a blocked transfer shows its reason outside the disabled action
- the menu pin does not cover the party count, including with the party section scrolled to the top

## STORE MANAGEMENT / META

### UI-Q-v28-1 — STORE MANAGEMENT

PASS:
- Store Capital visible
- four fixed Slots visible
- owned/unowned/equipped distinguishable
- purchase confirmation spends exactly once
- loadout read-only during active Run

### UI-Q-v28-2 — PRE-RUN RETURN PATH

From the pre-Run/foundation Decoration management screen:

PASS:
- explicit Back/Return reaches new-Run preparation
- repeated management -> return cycles do not produce blank UI
- no Seed/Decoration reroll caused merely by returning
- mobile browser/system back does not strand the Player in an empty stage

Run on a real mobile browser or equivalent mobile runtime, not Source inspection only.

### UI-Q112 — PRE-RUN DECORATION EMPTY SLOT

PASS:
- `비움` carries no `주의 ·` / error styling
- before a Run, every Slot row including `비움` is actionable
- tapping a Slot row enters existing 점포 관리 focused/scrolled to that Slot
- active-Run loadout remains frozen/read-only

### UI-Q-v28-20 — DECORATION DECISION SURFACE

Store management shows name/effect/price-or-ownership/equipped state.

Decoration Flavor prose is absent from this management decision surface.
No extra Collection UI is required.

### UI-Q-v28-21 — STORE-GROWTH VISUAL TRACES

Using controlled states, verify every implemented live-store growth trace is derived from state that
already exists and is already Player-knowable.

At minimum cover each listed trace family that is present in the implementation:
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

### UI-Q-v28-18 — STORE CAPITAL CURRENCY

No active Store Capital display appends G.

Gold still uses G.

### UI-Q-v28-14 — DECORATION ART / SETTLEMENT

Decoration-art, Store Capital settlement and Franchise-retirement checks remain active as defined
by META_v2.8.0.md and CORE_RUN_v2.8.0.md.

### UI-Q42 — META PROGRESSION PRESENTATION
SETUP:
Open Meta/HQ progression on accounts with different matrix states.

EXPECT:
- no Global Meta XP progress bar is presented as current truth
- Job × Boss clear cells are readable
- per-Job Mastery and Total Mastery derive consistently
- Distinct Boss unlock milestones 1/3/6 are clear

PASS:
UI matches META_v2.8.0.md and does not resurrect legacy progression truth.

### UI-Q39 — MONSTER KNOWLEDGE PROGRESS COPY
SETUP:
Open Monster Knowledge/Codex with progress.

EXPECT:
Progress label is:
`보급 생환 N회`

PASS:
Old `관찰 N회` progress wording is absent.

## MENU / SETTINGS / DEBUG

### UI-Q71 — MENU EXACT

Top-level exactly:
- 모험가 수첩
- 도감
- 점포지원
- 점주 가이드
- 설정
- 현재 지점 포기

PASS:
- no top-level Sound
- no top-level Full Data Reset
- no `설정 · 저장`

### UI-Q72 — SETTINGS EXACT

Settings contains:
- 저장 내보내기
- 저장 가져오기
- Sound
- BGM
- SFX
- Full Data Reset

PASS:
- 현재 지점 포기 absent from Settings.

### UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR

PASS:
- functional composition unchanged
- Run-abandon action remains top-level and separate from Full Data Reset
- exact Run-abandon label is `현재 지점 포기`
- Menu uses one surface + row navigation rather than dashboard-card grid
- Settings uses one utility panel
- destructive action separated
- no new control framework

### UI-Q-v28-19 — SETTINGS / DEBUG BOUNDARY

Ordinary Player surface:
- \`소리 켜기 / 소리 끄기\`
- \`전체 데이터 초기화\`
- no reproducibility Seed control
- no \`로컬 실행 지원 · 외부 연결 없음\` footer

No new Debug menu is required for PASS.

### UI-Q-v28-19B — DEBUG / SEED REPRODUCTION PATH

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

## TUTORIAL / HELP

### UI-Q19 — TUTORIAL OVERLAY
SETUP:
Trigger tutorial steps.

EXPECT:
- dim background
- spotlight target
- anchored bubble
- no layout push
- next/skip

PASS:
No in-flow instructional green card.

### UI-Q20 — TUTORIAL RESPONSIVE POSITION
SETUP:
Trigger tutorial near viewport edges on mobile.

EXPECT:
Bubble repositions and target remains reachable/visible.

PASS:
No clipped or offscreen instruction.

### UI-Q21 — TUTORIAL PERSISTENCE
SETUP:
Complete tutorial and reload.

EXPECT:
Completed tutorial does not restart.

PASS:
Completion state persists.

### UI-Q15 — FORECAST TUTORIAL
SETUP:
Trigger first forecast explanation.

EXPECT:
Explains estimate can differ from actual outcome.

PASS:
Does not reveal exact RNG/formula.

### UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT

Before treating tutorial work as complete, inspect the real current tutorial source and run the existing sequence end-to-end.

PASS only if:
- an actual tutorial sequence is still reachable in current Source
- its first trigger is not dead/unreachable
- each step can advance through its intended interaction
- completion state persists after normal completion
- no runtime exception or phase blocker interrupts the tutorial

If Source contains tutorial data/UI but no reachable trigger, this is an implementation bug, not permission to delete the tutorial.

### UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL

Test all current fresh-init paths owned by `CORE_RUN_v2.8.0.md`.

Case A — Full Data Reset:
1. complete or dismiss tutorial so its completion flag is set
2. perform Full Data Reset
3. start the newly initialized current account

PASS:
- old tutorial completion/dismissal state is gone
- tutorial is eligible and actually appears/starts on the first applicable flow

Case B — legacy-only internal state:
1. leave only a v1~v7 internal-test state
2. enter current v8 build
3. allow current policy to reject migration and create fresh v8

PASS:
- stale legacy tutorial state cannot suppress current tutorial
- current fresh v8 behaves like a clean first install for tutorial eligibility

Case C — ordinary Run Abandon/new Run under the same account:
PASS:
- tutorial completion remains preserved
- tutorial is not forcibly replayed merely because a Run restarted

FAIL if a true fresh account can enter ordinary gameplay without the tutorial because of a stale completion/reset flag.

### UI-Q73 — FULL RESET TUTORIAL

After Full Data Reset, start fresh.
PASS: Tutorial can appear again and no stale completion state survives.

### UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER

PASS:
Tutorial explains Stat pressure / Counter contribution / readiness and Supply->Fatigue order.

FAIL:
Tutorial instructs a specific correct SKU for a Hazard as the solution.

### UI-Q113 — TUTORIAL COACH COPY / TARGETING

PASS:
- every current coach step uses the exact current COPY owner text
- ORDER confirm explicitly says it commits only the current cart and ORDER remains available
- SALE coach targets a visible mobile element, never the hidden desktop duplicate
- fresh/reset tutorial reachability from UI-Q105/Q106 remains intact

### UI-Q-v28-27 — TUTORIAL / COACH TARGET-TRUTH AUDIT

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

### GREAT SUCCESS TUTORIAL
PASS:
- explicitly teaches Great Success exists
- extra preparation can raise its chance
- Great Success has additional reward

### FIRST DEEP TUTORIAL
PASS:
- not shown before actual first Deep occurrence
- shown on account's first actual occurrence
- not repeated next Run
- survives current Run abandon
- full reset clears it
- after full reset, appears again on next first occurrence
- teaches optionality, harder Combat, nomination, sponsorship,
  NPC EXP/Wallet reward, Store Gold return=0

## AUDIO

### UI-Q114 — AUDIO AUDIBILITY / COVERAGE

Real-browser mobile audio check with Sound enabled.

PASS:
- at BGM 100% / SFX 100%, BGM remains clearly audible during ordinary play
- SFX remain distinguishable above BGM; global SFX attenuation is not used merely to fake louder music
- BGM/SFX sliders and master mute still work and persist
- day / night / boss music states remain distinguishable
- no runtime network request is required for audio playback
- any external asset has repository-local source/license evidence and a redistribution-compatible license
- current semantic SFX matrix is covered, including Decoration purchase/equip/unequip and other identified silent state-changing actions
- every UI-requested cue resolves to an actual cue; no typo silently falls back to generic click
- page hide / backgrounding stops or suspends audio without duplicate playback after resume

FAIL:
- 100% BGM is still perceived as nearly absent on the real phone test
- important state-changing actions remain silent without deliberate rationale
- every click is given an intrusive unique sound
- external audio is hotlinked or has unclear/NC licensing

### UI-Q-v28-22 — DECISION / PHASE AUDIO

Verify the current audio presentation contract while reusing the owned audio architecture.
Acceptance does not depend on a particular asset implementation.

Listen on a real phone/browser to at least:
- repeated ORDER quantity changes
- ORDER confirmation
- SALE price selection / success / refusal
- Store Support acquisition
- MORNING opening
- NIGHT success / Great Success / retreat / injury / severe injury / Death / rescue
- CLOSING
- Boss D5 / D10 / D15 / D20 / D25
- FINAL commit

PASS:
- meaningful decisions are semantically distinguishable by sound
- Utility cues stay below Decision cues
- repeated quantity input remains short and non-fatiguing without harsh stacking
- ORDER confirmation reads as an order commit, not a generic click
- SALE success / refusal are clearly different without making one price mode sound correct
- Store Support acquisition is distinct from ordinary purchase and Relic acquisition
- NIGHT outcomes share a family but materially different results do not collapse to one pitch-shift
  cue
- Death is restrained rather than celebratory / cinematic; rescue reads as recovery, not normal
  success
- Boss-information cues follow one motif/family; D10 / D20 remain smaller than D5 / D15 / D25
- D30 adds no new-information audio signal
- Final commit is heavy and clear without a cinematic framework
- DAY / NIGHT / BOSS-FINAL ambience identities are distinguishable enough to support phase mood
- BGM / ambience stays below decision/result cues
- mute disables presentation audio
- BGM and SFX settings keep control of their owned channels
- background / foreground transitions do not leak, duplicate or restart one-shot cues incorrectly
- audio playback changes no gameplay state and consumes no Gameplay RNG
- mobile and desktop run without audio-related console/runtime errors

External/new asset PASS:
- every shipped third-party audio asset has a recorded source, author, license and modification
  status
- third-party audio is vendored locally; runtime hotlinking is absent and offline runtime still works
- no shipped asset has unclear rights or a license incompatible with the intended distribution

FAIL:
- most actions still read as the same generic synth beep
- utility navigation is as loud or important as material decisions
- repeated input creates harsh overlapping sound
- BGM masks copy / decisions / result cues
- one full new music track is treated as mandatory for every phase
- a parallel audio framework is introduced without need
- audio presentation changes gameplay truth or uses Gameplay RNG
