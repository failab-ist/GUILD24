# PRESENTATION POLISH — BATCH 2

DOC=PRESENTATION_POLISH_BATCH2
OWNER=presentation_batch2,order_presentation,sale_presentation
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
PARENT=PRESENTATION_SYSTEM_v2.8.0.md
STATUS=CLOSED_BATCH_2

## ACTIVATION / READ BOUNDARY

BATCH 1 and BATCH 2 are closed by User approval.

For this Batch, read only:
1. AGENTS.md
2. SPEC_INDEX_v2.8.0.md
3. PRESENTATION_SYSTEM_v2.8.0.md
4. this file
5. PRESENTATION_POLISH_v2.8.0.md only for the ORDER / SALE clauses routed below
6. UI_UX_v2.8.0.md only for ORDER / SALE layout / density rules when needed
7. ORDER mechanics only from ECONOMY_ORDER_v2.8.0.md when a presentation decision could alter behaviour
8. SALE mechanics only from SALE_v2.8.0.md when a presentation decision could alter behaviour
9. UI_UX_QA_v2.8.0.md UI-Q-v28-30 / UI-Q-v28-31
10. Current Source touched by the Batch

Do not full-read unrelated owners.
Do not alter Gameplay / Rule / Balance / Copy / Save / RNG / hidden-information boundaries.

## BATCH 2 PURPOSE

ORDER and SALE must reach the same authored-game-UI quality bar established by the approved
Presentation work without inheriting OPENING / FINAL ornament as a skin.

ORDER
= supply desk / order form.

SALE
= current customer + counter / register decision.

The quality target is not "more decoration".
It is:
- one clear physical object language per Phase;
- hierarchy visible at screenshot scale;
- live information seated in authored objects;
- tactile decision controls;
- no web-shop / dashboard / card-stack reading;
- no selected-state shortcut made from a coloured left stripe;
- CSS-FIRST, but escalate to SVG / local asset / 9-slice when CSS has plateaued.

## EXECUTION ORDER

Work sequentially:

BATCH 2A — ORDER
→ BEFORE captures
→ Source audit
→ implement ORDER only
→ 390 / 1280 review
→ narrow fix
→ ORDER review checkpoint

Then:

BATCH 2B — SALE
→ BEFORE captures
→ Source audit
→ implement SALE only
→ 390 / 1280 review
→ narrow fix
→ BATCH 2 review packet

Do not modify ORDER and SALE in one undifferentiated CSS pass.

## REQUIRED VISUAL EVIDENCE

Base capture commands:
- npm run qa:presentation:batch2:fast
- npm run qa:presentation:batch2:before
- npm run qa:presentation:batch2:after

The base harness captures the real ORDER and SALE surfaces at deterministic Run state.

Base captures are NOT sufficient by themselves.

ORDER review must additionally show:
- no-cart / leave state
- at least one selected quantity so the ORDER commit is visible
- a row at q=0 and a row with q>0 if available

SALE review must additionally show:
- customer base state
- selected Item with the register drawer / three price keys open
- at least one refused / disabled price key when the deterministic state permits it
- phone transient speech if touched by implementation

These additional states must be reached through current public UI / game actions.
Do not hand-build fake DOM screenshots.

## SHARED BATCH 2 FAILURES

FAIL:
- only background hue / texture changes;
- every row becomes a framed card;
- every key receives a decorative outline;
- selected state is communicated by a coloured left vertical stripe;
- CSS border / inset / shadow layers are stacked because an authored component asset was avoided;
- ornamental seals / stamps / bolts are added without functional meaning;
- desktop becomes a centred phone panel in empty space;
- phone information is compressed until labels / values wrap or controls lose target size.

# BATCH 2A — ORDER

## CANONICAL OWNER / CURRENT SOURCE

Presentation owner:
- PRESENTATION_POLISH_v2.8.0.md §PER-PHASE APPLICATION RULES — ORDER

QA:
- UI_UX_QA_v2.8.0.md UI-Q-v28-30 / UI-Q-v28-31

Primary Source handles:
- `.p-order`
- `.clip`
- `.form`
- `.form-head`
- `.ledger`
- `.brief`
- `.stock-brief`
- `.lines`
- `.line`
- `.tag-art`
- `.dial`
- `.dial output`
- `.dial .set`
- `.p-order .dock`
- `.p-order .dock .stamp`
- `.p-order .dock .stamp.leave`

These are implementation handles, not new semantics.

## ORDER COMPOSITION LOCK

Keep:
- one order-form / supply-desk composition;
- current information order;
- form identity / DAY / branch;
- operating-cost / capacity / wallet / order-total / after-order ledger;
- today / tomorrow planning signals;
- stock brief;
- offer order and Item information;
- quantity behaviour;
- `1 / 3 / 최대` behaviour;
- commit / leave behaviour.

Do not:
- turn offers into a card grid;
- introduce tabs;
- hide required economics;
- add a new approval / stamping mechanic;
- change Rarity / quantity / funds / stock logic.

## ORDER VISUAL ANCHOR

The FORM itself is the anchor.

The Player should read:
    FORM IDENTITY
    → TODAY / MONEY / STOCK CONTEXT
    → ITEM LINE
    → QUANTITY
    → COMMIT

It must read as a physical order form on a supply desk, not a shopping website printed on beige.

Material family:
- paper
- dark desk wood
- cool steel
- restrained frost-blue / ink accent

Do not inherit OPENING brass-heavy construction.

## ORDER — MAJOR OBJECT

The current `.form` is already one paper object.
Upgrade the object rather than wrapping it in another panel.

Preferred:
- paper edge / clip / header / ruled structure working as one object;
- a credible supply-desk clip / binder / rail if the screenshot benefits;
- authored header / ledger seating;
- no decorative seal / stamp merely to say "order".

If CSS paper edges remain generic after one focused pass:
- existing repo art;
- bespoke SVG clip / rail / corner;
- scalable transparent frame / 9-slice;
may be used.

The live form body remains HTML.

## ORDER — LEDGER / BRIEF

The ledger must look printed / written into the same form, not like a KPI dashboard.

Do not split:
- 운영비(예상)
- 창고 잔여 칸
- 보유 골드
- 발주 금액
- 발주 후

into separate cards.

Use alignment, rules, paper hierarchy and numeric seating.

Today / tomorrow / final planning signals remain sections of the same document.

## ORDER — OFFER LINES

Each offer is a RULED LINE on the form, not a card.

Current Source risk to verify in BEFORE:
`.line.on` uses a green full-height left inset stripe.

Global Presentation QA forbids a coloured left vertical bar as a selected-state shortcut.

If runtime confirms that reading:
- remove the selected left stripe;
- selection / quantity presence must read through the whole row state, quantity readout / control state,
  and document-native emphasis;
- do not replace it with another coloured status stripe.

Item hierarchy remains:
    ITEM IDENTITY
    → EFFECT / FUNCTION
    → ECONOMICS / STOCK
    → QUANTITY CLUSTER

Do not let quantity chrome outrank Item information.

## ORDER — QUANTITY CLUSTER

Exact canonical hierarchy:
    item information
    > quantity readout / stepper
    > `1 / 3 / 최대`

Keep:
- `-` / `+` 44px touch target;
- their visible face smaller than a full square game button;
- recessed centred numeric output;
- quick set as text shortcut with dotted underline;
- disabled quick set dim but no whole-element opacity.

Do not:
- box `1 / 3 / 최대`;
- give quick set hard depth;
- turn every control into a decorated pixel key.

The stepper / readout should feel integrated into the order line / form.

## ORDER — COMMIT

The order commit is the strongest physical action on the form.

It must feel like committing the form, not a generic submit CTA.

Keep phase language:
- paper / steel / cool frost-blue

Allowed:
- stronger steel face;
- one hard external depth;
- compact authored cap / fixture if it materially improves the screenshot;
- a bespoke SVG detail when it improves the control silhouette.

Do NOT add:
- decorative approval seal;
- stamp graphic;
- giant ornament;
- repeated rivets merely because OPENING used rivets.

`영업 시작` remains the other act and does not outrank an active order commit.

### ORDER LEAVE CONTROL — USER APPROVED 2026-09-23

The active `영업 시작` control must belong to the same authored ORDER control family as the
rest of the supply-desk form.

It must NOT read as a flat modern / web rectangle sitting beside an authored order commit.

When active:
- use the same cool-steel / paper-desk physical language;
- show a clear face + one hard external depth / press collapse;
- a restrained cut / built silhouette is allowed when it matches the ORDER family;
- remain quieter than an active `발주 N G · 확정` control when both are present.

When disabled because a cart is held:
- preserve the SAME authored steel-control silhouette / cut-corner geometry / four-side edge construction as the active ORDER control family;
- recede by losing active depth / contrast, NOT by reverting to a plain rectangle;
- remain legible;
- do not use whole-element opacity fade;
- do not keep an active-looking hard drop.

USER CLARIFICATION 2026-09-23:
Changing only face colour / border colours is NOT the requested alignment.
The disabled `영업 시작` must not inherit a generic disabled rule that removes the crafted silhouette.
If a shared disabled selector sets `clip-path:none` or otherwise restores rectangular browser-like geometry,
override that on this ORDER control so the same cut / built silhouette remains.

Do not copy OPENING rivets or brass ornaments onto this control merely for decoration.

## ORDER RESPONSIVE

PHONE:
- one vertical document read;
- form uses available width;
- quantity cluster does not wrap into confusing order;
- quick set stays secondary;
- dock actions remain readable and touchable.

DESKTOP:
- expand the supply-desk / form presence;
- do not leave a narrow phone receipt floating in dead space;
- do not invent a new two-column information architecture unless existing Canonical already owns it.

## ORDER ACCEPTANCE

PASS only if:
- first impression is "order form / supply desk";
- the form itself is visibly authored, not merely recoloured;
- selected offer does not use a coloured left stripe;
- Item information still outranks quantity controls;
- quick set remains light;
- commit is the strongest physical action without ornamental stamping;
- 360 / 390 / 412 / 1024 / 1280 remain usable.

# BATCH 2B — SALE

## CANONICAL OWNER / CURRENT SOURCE

Presentation owner:
- PRESENTATION_POLISH_v2.8.0.md §PER-PHASE APPLICATION RULES — SALE

Functional / density owners when needed:
- SALE_v2.8.0.md
- UI_UX_v2.8.0.md

QA:
- UI_UX_QA_v2.8.0.md UI-Q-v28-3 / 15 / 30 / 31

Primary Source handles:
- `.p-sale`
- `.front`
- `.who`
- `.face`
- `.front-side`
- `.counter-edge`
- `.dossier`
- `.kit`
- `.readout`
- `.detail-stats`
- `.dest-plate`
- `.shelf`
- `.shelf-head`
- `.good`
- `.good.open`
- `.tillpanel`
- `.tills`
- `.p-sale .dock`
- `.p-sale .dock .stamp`

## SALE COMPOSITION LOCK

Keep:
- current NPC as visual anchor;
- portrait / identity / rarity relationship;
- current customer compact state;
- current forecast / destination information;
- shelf / Item order;
- selected-Item `판매 후 변화` information;
- price-mode mechanics / semantic colours;
- queue truth;
- `손님 보내기` Secondary hierarchy;
- transient speech behaviour.

Do not:
- create a new two-column decision architecture;
- move equipment into compact top state;
- duplicate queue count on phone;
- add permanent explanation copy;
- change price acceptance / wallet / Bag logic.

## SALE VISUAL ANCHOR

NPC = visual anchor.
REGISTER = interaction anchor.

The screen must read:
    WHO IS HERE
    → WHAT MATTERS FOR THIS CUSTOMER
    → WHAT TO SELL
    → PRICE DECISION

Do not let shelf cards / dossier panels become equally loud competitors.

Material family:
- convenience-store counter
- dark wood
- register / commerce gold-amber
- existing semantic price colours

## SALE — CUSTOMER / DOSSIER

The customer must remain the dominant figure.

Customer state / forecast / destination should feel like one dossier / counter information surface,
not a stack of independent web cards.

Use:
- rails / engraved lines / recessed information planes / counter fixtures;
- spacing and material separation before new boxes.

Do not:
- frame every stat;
- add icons to every label;
- cover the portrait with decorative chrome.

## SALE — SHELF / GOODS

The shelf is a physical display / counter inventory surface.

Each `.good` remains a row / product slot, not a card.

Current Source risk to verify in BEFORE:
`.good.open` uses a left gold inset stripe.

Global Presentation QA forbids a coloured left status stripe as the selected-state shortcut.

If runtime confirms that reading:
- remove the left stripe;
- selected product should read through whole-row plane / recess, connection to the opened register drawer,
  and information hierarchy;
- do not replace it with another decorative stripe.

Product hierarchy remains:
    NAME
    → FUNCTION / EFFECT
    → PRICE / STOCK
    → SELECTED DECISION PANEL

## SALE — REGISTER DRAWER

`.tillpanel` is the selected product's register drawer.

It must feel physically attached to the selected product / counter decision, not like another dark card.

Preferred:
- one recessed register well / drawer;
- one local header rail;
- three peer keys seated in the same register housing;
- live `판매 후 변화` information remains readable above the keys.

If CSS remains generic after one focused pass:
- bespoke register-rail SVG;
- key cap / housing asset;
- local 9-slice / pixel graphic;
may be used.

Do not bake price / copy into the asset.

## SALE — PRICE KEYS

50 / 100 / 150 price modes are PEERS.

Keep:
- same geometry;
- same physical depth;
- same type hierarchy;
- semantic mode colour remains an owned signal;
- refused / unavailable keys lose depth and remain legible.

Do not:
- promote one key by stronger frame / silhouette;
- outline every key;
- turn semantic colour into three decorative borders;
- use whole-element opacity for disabled state.

The cluster must feel like a register, not three SaaS buttons.

## SALE — SECONDARY ACTION

`손님 보내기` / `영업 종료` remains Secondary to the active price decision.

It may be tactile, but must not become the screen's strongest pop.

The queue / on-hand gold strip remains information support, not another panel.

## SALE — MOBILE DENSITY

Phone:
- decorative waiting-line / fan is absent per Canonical;
- queue count remains in Dock;
- Bag remains exactly two horizontal slots;
- selected Item / price decision stays reachable without permanent explanatory height;
- transient speech reserves no permanent height and does not cover the Primary decision.

Do not regain game feel by making the top band taller.

## SALE RESPONSIVE

PHONE:
- visual → customer state → shelf → selected Item / register decision;
- keep the current customer unmistakable;
- avoid nested frames consuming width.

DESKTOP:
- use width to give NPC and decision surfaces presence;
- preserve the current owned parallel presentation where Source already uses it;
- do not shrink the whole experience into a narrow phone column.

## SALE ACCEPTANCE

PASS only if:
- NPC is still the visual anchor;
- register / price cluster is the interaction anchor;
- dossier / shelf / register read as one store-counter system rather than card stack;
- selected product does not use a coloured left stripe;
- three price keys are unmistakably peers;
- disabled price key loses depth without opacity fade;
- send-customer stays Secondary;
- 360 / 390 / 412 / 1024 / 1280 remain usable.

## BATCH 2 FINAL REVIEW PACKET

Deliver:
- ORDER 390 BEFORE / AFTER
- ORDER 1280 BEFORE / AFTER
- ORDER active-cart / commit screenshot
- SALE 390 BEFORE / AFTER
- SALE 1280 BEFORE / AFTER
- SALE selected-product / register drawer screenshot
- SALE disabled / refused key screenshot when reachable
- changed files
- CSS / SVG / PNG / external asset inventory
- discarded experiments
- npm test
- targeted visual QA
- confirmation that Gameplay / Rule / Copy / Save / RNG did not change

Do not self-declare BATCH 2 PASS.
Stop for DIRECTOR / User review.
