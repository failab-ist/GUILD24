# UI_UX

DOC=UI_UX
OWNER=ui,ux,mobile,tutorial,functional_design,visual,decoration_ui,store_growth_ui,sale_density,semantic_delta,popover,night_result
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=UI_UX_v2.7.0.md
PATCH_TYPE=PROJECT_WIDE_CORE_READABILITY

## INHERITANCE

All unchanged v2.7 ORDER/SALE/NIGHT/Final/mobile/typography/tutorial/visual rules inherit
UI_UX_v2.7.0.md.

The Decoration/Store-Capital rules previously frozen in this file remain active.

## RETIRED ACTIVE UI

Do not expose:
- Franchise Grade
- Franchise Achievement list/progress/toast
- Grade ORDER discount
- Start Contract selection
- Grade-gated Start Contract unlock progress

Historical archive policy -> META_v2.8.0.md.

## STORE MANAGEMENT / DECORATION

Reuse the existing Codex/management space.

Show:
- current Store Capital
- four fixed Slots
- owned/unowned
- purchase cost
- exact current effect
- equipped Decoration

Purchase requires explicit confirmation and spends once.
Loadout is editable only outside an active Run and frozen after Run start.

On a pre-Run/foundation store-management screen, an explicit way back to the new-Run preparation
screen must exist. Mobile system/back navigation must not strand the Player on a blank state.

Live store renders equipped Decorations at fixed store locations.
No free-placement editor / levels / rarity ladder / random Decoration shop is added.

## MOBILE SALE DENSITY

Mobile:
- remove the decorative waiting/next-customer card/fan
- keep queue progress/count in the bottom Dock only
- use recovered space for current-customer state and decision information

Desktop may retain richer simultaneous queue presentation.

Do not remove the actual queue count.

## CURRENT CUSTOMER STATE

Compact SALE state includes:
- Injury state, without 부상 1 style numeric duplication
- Fatigue
- Loyalty

Example:
    부상 · 피로 8 · 단골도 37

Trusted Regular:
- show 단골 when owner threshold is reached
- no large Loyalty progress bar is required

Normal SALE shows the Loyalty value/state without a separate `?` or Loyalty popover trigger.
Its contextual explanation is taught by the tutorial/coach.
The global compact Help remains a separate reference surface under its current owner.

Equipment text is omitted from this compact SALE header/state region.
Equipment remains available in NPC detail and as proven Stat-source attribution.

## SALE BAG COMPACT LAYOUT — EXACT

The normal customer Bag remains exactly two slots.

On compact/mobile SALE:
- the two slot boxes are always horizontal
- if room is insufficient beside other customer-state elements, the whole Bag block wraps to the next row
- the two slot boxes themselves never stack vertically
- wrapping must not create horizontal overflow

Reference shape:
    가방 0 / 2   □ □

Presentation only; Bag capacity/mechanics do not change.

## SHARED SEMANTIC CHANGE LANGUAGE

For a value compared with its baseline:

    unchanged = default
    beneficial = green
    harmful = red

Meaning, not numeric sign, controls color.

Examples:
- operating cost 140 -> 110 = beneficial / green
- Fatigue 8 -> 12 = harmful / red
- Stat 32 -> 40 = beneficial / green
- Death risk 12% -> 8% = beneficial / green

Replace the generic yellow moved treatment for Stats.

Color is not the only cue; changed values that have a provable source also expose an interaction
affordance.

## SHARED ANCHORED POPOVER

Use one lightweight anchored popover language for:
- Stat source
- Fatigue arithmetic
- deterministic Store Support/Event source
- short help for forecast/readiness/death risk

Behavior:
- no layout-height change
- no background lock
- no confirmation button
- one open at a time
- desktop: hover or keyboard focus; click remains valid
- mobile: tap toggle
- outside tap / Escape closes
- beginning mobile scroll should close where practical
- place above/below according to available viewport room
- normally 2 lines, 3 only where needed

Reuse the existing out-of-flow tip/popover presentation rather than create a second modal system.

## PROBABILITY ATTRIBUTION LIMIT

Do not create a new UI to claim why a random Rare Item/NPC appeared.

Weight/probability effects remain readable in owned support descriptions.

Deterministic source attribution is allowed.

Existing special Event offer presentation, such as an 암시장 special Order row, may name its
Event origin.

## FATIGUE SURFACE

SALE main:
- current Fatigue always compactly readable
- if a penalty is active, harmful semantic emphasis
- committed Supply may show 피로 N -> 출발 N
- show Prepared/Required/excess Supply compactly

Do not show future Outcome-by-Outcome Fatigue table.

NIGHT main:
    귀환 후 피로 N

Detailed resolved arithmetic opens through the shared popover.

## GREAT SUCCESS SIGNAL

No signal change while merely selecting/previewing an Item.

After a successful purchase commits, refresh only the Great Success signal from the committed Bag.
No exact probability.

## NIGHT LAYOUT

Information order:
    Outcome
    -> proven sold-Item impact
    -> Level/Stat changes
    -> Fatigue
    -> EXP/Wallet/other

Living Flavor:
- reuse SALE temporary bubble behavior
- around 3 seconds
- may overlap character art
- never cover Outcome / primary result
- result remains after bubble disappears

The Outcome belongs to the returning
adventurer's identity block, not to a title bar over the screen:

    [character art]   [Outcome]
                      [NPC name]
                      [dungeon · Lv]

- the Outcome sits directly above the NPC name and reads one step stronger than it
- it does not become a separate full-width row and takes no vertical space of its own
- no long underline / rule spanning the record
- it is important, but it is not the page's headline

Death has no speech bubble, but it is not moved out
of the message position either: the death line uses the same place beside the character and the
same visual weight as a living adventurer's line, presented as a neutral status / system message.

- no quotation marks, no speech tail, no bubble ground, no utterance styling
- no left accent bar / status stripe, no decorative border, no added icon or badge
- no glow and no blur
- It carries a small status
  container - text-hugging width, modest padding - and nothing else from the bans above. A
  container is not a bubble: what makes it an utterance is the tail, the paper ground and the
  quotation, and none of those return.
- AMENDED, 2026-09-22: the translucent dark plate sat so close to the NIGHT background that it
  read as bare text again. The plate is a COOL SLATE / BLUE-BLACK surface clearly one step
  brighter than the NIGHT background, and it carries its own surface colour as a flat plane
  rather than a black veil laid over whatever is behind it. Its edge must register at once, over
  the character art as well. The text stays a neutral light colour, and no paper / parchment
  speech treatment is used.
  Acceptance is the runtime screenshot: if the plate's plane is not clearly separable from the
  background at 360 / 390 / 412, it FAILS. A background value present in the DOM is not a PASS.
- the existing Death narration copy is reused; no new Death copy is authored
- it is never dropped into a separate narration line under the report body

    LIVING = speech bubble
    DEATH  = neutral floating message

Same position and same information hierarchy; never the appearance of a dead NPC speaking.

The record begins under the return rail and
runs downward. It is not vertically centred in the remaining viewport: a short result - a death,
a quiet return - must not float in the middle of the screen. No spacer is added in exchange, and
no excess dead space is created above the record.

Every Outcome label is the same size:

    36px var(--f-sign)

성공 / 대성공 / 퇴각 / 부상 / 중상 / 사망 / 생환 share it. Per-outcome and per-rank size
overrides are removed, and the NPC name and the Outcome summary keep one size regardless of
which Outcome was resolved. Outcomes differ by copy and tone/colour only.

A death is a closed result, so the player-facing
record shows only:

    death status message, character art, `사망`, NPC name, Dungeon · Lv, Outcome summary

Everything else is absent: no route change, no Deep tag,
no Item / supply cause line, no incident / fact line, no Level / Stat / equipment change, no
injury / rest, no Fatigue, no EXP, no Wallet, no reward or other numeric change row, and no
divider or reserved spacing where any of those regions would be.

A death ends on its summary. The resolution data itself is unchanged; only the NIGHT render
hides it.

The player-facing Stat name is `투력`, so an
equipment Stat bonus reads `투력 +N`, never `전투 +N`. Ordinary prose such as `전투에서 …` is not
affected. Equipment identity and its Stat effect are visually separated - a middle dot or spacing -
and never merged into one run of words. Internal fields and stored strings are not renamed; only
the player-facing output is unified.

The player-facing NIGHT record does not print the
fight verdict line (`적을 물리쳤다.` / `적을 물리치지 못했다.`). It duplicates the Outcome and its
summary. Keeping it at a lower hierarchy is equally disallowed. The resolution data it was
rendered from is unchanged and stays available to the resolver, Closing and QA.

Level / Stat / Injury / Fatigue / EXP /
Wallet and the other aftermath figures are an information region, not display. They use the
ordinary UI type family; the pixel / LED display face is reserved for true display roles such as
the Outcome label. Reading groups, in the owned information order:

    GROWTH     Level, Stat changes
    AFTERMATH  Injury / remaining injury / rest, Fatigue
    REWARD     EXP, NPC Wallet, other settled results

Groups are told apart by spacing and at most one minimal divider. A compact cell is allowed for
Level / Stat, but the region as a whole must not read as a collection of metal badges, and a
read-only figure must never be presented as if it were pressable. A label and its value on one
line is the default; wrapping happens only where the real phone width requires it.


### NIGHT LAYOUT — UNLOCK NOTICE

A NIGHT reward notice that announces a newly unlocked product uses a stable two-line composition:

    새 상품 해금
    {상품명}

The label and the unlocked product name are separate display lines.
Do not rely on incidental width wrapping to split `새 상품 해금 · {상품명}`, and do not allow the
product name to wrap into an awkward fragment merely because the notice width changed.

This is presentation only. It does not change unlock timing, unlock state or reward truth.


### NIGHT LAYOUT — DESKTOP ADAPTATION

The phone composition remains the mobile baseline. Desktop must not render the same phone-sized
record unchanged in a large viewport.

At desktop widths, use the available space for one restrained responsive step across the NIGHT
record:
- returning NPC art may be larger;
- speech / status treatment, Outcome / identity / summary and aftermath typography may scale up
  coherently;
- spacing and the Primary / Secondary controls may scale up to desktop-appropriate presence;
- the record may use a wider desktop measure so it does not read as a small phone panel pinned to
  the upper-left of an otherwise empty screen.

This is responsive scaling of the SAME information architecture, not a desktop redesign.
Do not add new columns, duplicate information or enlarge any one element enough to change the
hierarchy.

The exact 36px Outcome rule is the PHONE baseline. On desktop the Outcome may scale with the rest
of the record, but every Outcome still uses exactly the same size at a given breakpoint.

Likewise, "one NPC size" means one size for all Outcomes at the same breakpoint. It does NOT forbid
one shared desktop responsive size. QA must reject Outcome-specific portrait sizing, not a single
desktop override shared by every Outcome.

## BOSS INFORMATION PRESENTATION

All Boss-information beats use the existing Guild investigation dossier family.

### D0 — FIRST MORNING BRIEFING

D0 is basic objective information, not a reveal spectacle.

It appears as the first presentation step of DAY 1 MORNING after the first Store Support choice.
Exact process / persistence -> CORE_RUN_v2.8.0.md.
Exact copy -> COPY_AUDIT_APPROVED_v2.8.0.md.

Presentation:
- no Boss character art;
- no Boss silhouette;
- no Boss domain backdrop;
- no fake unknown portrait;
- no decorative timeline cards;
- the DAY 5 / DAY 30 anchors may use simple typographic hierarchy inside the same dossier;
- one `확인` acknowledgement;
- compact enough to read as onboarding information, but large enough that the Run objective cannot
  be missed.

### D5 / D10 / D15 / D20 / D25

D5/D15/D25 are major reveal / preparation beats.
D10/D20 are intentionally shorter information beats, but Boss presence is NOT reduced to a small
thumbnail merely to communicate lower importance.

For D5/D10/D15/D20:
- use the same centered Boss-art family;
- Boss identity remains visually present across the investigation;
- D10/D20 stay compact through fewer lines / weaker information hierarchy / shorter dossier height,
  not through shrinking the Boss to an icon.

D25 remains information-first because the exact Final Family/Hazard disclosure is the payload.

DIRECTOR DOCUMENT BASELINE — EXACT:
- mobile D5/D10/D15/D20 Boss art max-height: 240px
- mobile D25 Boss art max-height: 200px
- desktop D5/D10/D15/D20 Boss art max-height: 300px
- desktop D25 Boss art max-height: 260px

At 360x800, core information and acknowledgement control must not be pushed below the first
viewport solely by Boss art.

The Boss report sheet is a takeover, not a drawer peeking from the bottom: at phone width it
claims enough of the viewport to read as a report rather than hugging its content.

Avoid both failure modes:
- tiny Boss art floating inside a wide / empty report
- oversized art that buries the report information or creates unnecessary scroll

### DOCUMENT DETAIL — USER APPROVED

Boss art:
- sits directly on the report paper;
- no artificial grey / ink floor line or bottom divider under the character.

D5 Flavor:
- ordinary report text;
- no non-semantic coloured left bar;
- no extra tinted / bordered Flavor box.

D15 Trait:
- hierarchy is `특성` label -> Trait name -> explanation;
- no coloured side bar;
- no replacement text box / tinted panel / bordered card;
- typography and spacing carry the emphasis.

D25 Final Family / Hazard:
- each Family may retain its own left colour rule because that colour is semantic identity;
- do not remove that semantic Family colour;
- remove the extra black horizontal rule above the Family section;
- a thin neutral divider between the two peer Families is allowed where needed for scanning;
- do not turn Hazards into decorative cards.

Information truth remains primary; Boss presence is a co-equal presentation requirement except D25,
where Family/Hazard disclosure must not be visually buried by art.

## PRESENTATION POLISH ROUTING

Presentation construction / asset / ornament / visual-review system:
- PRESENTATION_SYSTEM_v2.8.0.md

Active Presentation Batch 1:
- PRESENTATION_POLISH_BATCH1_v2.8.0.md

Detailed later-phase / audio Presentation contracts:
- PRESENTATION_POLISH_v2.8.0.md

UI_UX_v2.8.0.md remains authoritative for surrounding UI / UX / mobile / tutorial / semantic delta /
popover / Store Management / NIGHT layout rules that remain in this file.

## FUNCTION / FLAVOR VISUAL HIERARCHY — EXACT

On Player decision surfaces, Function must read before Flavor.

Function / Effect:
- 14–15px class
- weight 600
- normal/high contrast
- numeric conditions and exact rule effects belong here

Secondary factual:
- 13px class
- weight 400
- dimmer than Function

Flavor on a decision surface:
- 12–13px class
- weight 400
- lower contrast than Function
- 1–2 lines recommended
- no numeric condition/rule payload

Event Reveal:
- Flavor: 13px / 400 / dim
- Effect: 15px / 600 / primary

Morning Event slip:
- Flavor: 12px class
- Effect: 13px / 600

Codex/Lore Flavor may remain 13px / 400 / dim and may use italic presentation.

NPC Dialogue:
- 14–15px class
- normal speech-bubble treatment

Death Narration:
- 13–14px class
- dim/report treatment
- no quotation marks or speech bubble

Boss D5 is an exception:
its Boss-specific Flavor is primary reveal content and must not be mechanically demoted by the
ordinary decision-surface Flavor rule.

## QA / DEBUG REPRODUCTION ACCESS — EXACT

Ordinary Player UI does not expose reproducibility Seed input or a visible Debug menu.

Removing those Player-facing controls must not remove deterministic QA access.

Supported manual QA path:

1. Start from a controlled Account state:
   - Full Data Reset, or
   - import the exact Save fixture required by the test.
2. Open browser Developer Tools -> Console.
3. Start a deterministic Run with:
   `Guild24.game.start('<seed>'); Guild24.render();`
4. During an active Run, inspect the persisted gameplay state through either:
   - `Guild24.showDebug()`, or
   - keyboard shortcut `Ctrl+Shift+D`.
5. The Debug surface exposes the existing debug payload including:
   - seed
   - RNG state / last RNG
   - ORDER offers
   - current NPC
   - current Dungeons
   - resolved Results with debug evidence
   - Boss debug state

The Console / Debug path is development and QA access only.
It must never be promoted into ordinary Player navigation merely to preserve reproducibility.

When a Player-facing QA/debug control is removed, QA must verify both:
- the control/copy is absent from the ordinary Player surface
- the equivalent deterministic QA capability remains reachable through the development path above

## HELP

Per-value/context explanations use anchored popovers, not a modal/accordion that pushes gameplay.

The global 점주 가이드 may remain as reference, but must be shortened to current rules and must
not duplicate detailed internal arithmetic.

Exact help copy -> COPY_WORLD_VOICE_v2.8.0.md.

## EVENT TEMPORARY BUDGET

When Event purchase budget exists, show persistent Wallet and temporary budget separately enough
to explain affordability.

Do not relabel temporary Event budget as permanent 소지금.

## STORE SUPPORT OWNED REFERENCE

When choosing a Store Support, keep the current owned-support reference reachable through the
existing compact detail/modal.

Do not add a new permanent panel solely for this.

## CLOSING

Remove redundant accounting-explanation footer from the primary receipt.
The figures themselves remain.

## STORE GROWTH SURFACE

Store Capital / Decoration management and run-end settlement requirements from the previous v2.8
Decoration package remain active exactly as owned by META_v2.8.0.md and CORE_RUN_v2.8.0.md.


## COPY-SURFACE RE-AUDIT — EXACT

### SALE SELECTED-ITEM INFORMATION

The selected-Item panel uses one primary heading:

    판매 후 변화

Direct Item changes and deterministic derived changes are rows under that heading.
Do not stack analytical subgroup headings that increase height.

Source/cause belongs in the existing anchored source popover.

Conditional intrinsic Item functions that do not appear as an immediate numeric delta remain readable under
\`특수 효과\`; do not call them \`이 손님에게는 지금 걸리지 않는 효과\`.

Internal marker rows are never displayed.

### SALE PERMANENT EXPLANATION

The forecast/readiness/death explanation is on demand through the shared anchored popover.
Do not keep a permanent explanatory paragraph under the readout.

### DECORATION DECISION SURFACE

Store-management purchase/equip comparison shows:
- name
- exact effect
- price / ownership
- equipped state

Decoration Flavor prose is not shown on this decision surface.

No new Collection screen is added in v2.8 solely to preserve that Flavor.
Existing Flavor data may remain in data/Codex-ready form.

### GLOBAL HELP

The global 점주 가이드 uses the exact compact Copy owner text.
Do not retain the old long-form rules manual in parallel.

### SETTINGS / DEBUG BOUNDARY

Ordinary Player settings are localized and gameplay-facing.

Developer reproducibility Seed controls do not appear on the ordinary pre-Run screen.
Technical runtime footer copy is removed from ordinary settings.

This does not require adding a new Debug menu.
