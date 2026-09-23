# PRESENTATION POLISH — BATCH 4

DOC=PRESENTATION_POLISH_BATCH4
OWNER=presentation_batch4,boss_report
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_EXECUTION_SPEC
STATUS=ACTIVE_BATCH_4

## SCOPE

Batch 4 covers the Boss information cadence / presentation work:

- D0 — first-Morning objective / investigation briefing
- D5 — Boss identity reveal
- D10 — combat-question investigation
- D15 — exact Trait reveal
- D20 — route/environment investigation
- D25 — exact Final Family + Hazard disclosure

D0 is an active implementation / review item in this Batch.
D30 FINAL entry is NOT part of Batch 4.

D30 presentation, including the per-Boss authored domain backdrop, belongs to the later FINAL
presentation pass.

## READ BOUNDARY

Always read:
1. AGENTS.md
2. SPEC_INDEX_v2.8.0.md
3. PRESENTATION_SYSTEM_v2.8.0.md
4. this file

Then SMALL READ only as needed:
- CORE_RUN_v2.8.0.md — D0 FIRST-MORNING BOSS BRIEFING only
- COPY_AUDIT_APPROVED_v2.8.0.md — BOSS REPORT exact copy only
- PRESENTATION_POLISH_v2.8.0.md — BOSS / MILESTONE FUNCTIONAL HIERARCHY and BOSS / FINAL
  PRESENTATION PAYOFF
- BOSS_v2.8.0.md — information cadence / D0 boundary / GLUTTONY scope only
- UI_UX_v2.8.0.md — BOSS INFORMATION PRESENTATION only
- UI_UX_QA_v2.8.0.md — UI-Q-v28-10 / 24 / 28
- current Boss-report Source only

Do not full-read unrelated FINAL mechanics, SALE, NIGHT, CLOSING or END owners.

## CANONICAL TRUTH

Boss information cadence is unchanged.

D0:
- first Store Support resolves first
- the Run enters DAY 1 MORNING
- D0 is the first Morning presentation step
- the Player acknowledges the 30-Day objective / investigation cadence before ordinary Morning
- no Boss identity/art/Trait/Final state is revealed

D5:
- identity is revealed

D10:
- compact combat-question investigation
- no new Boss fact beyond its owned question

D15:
- exact Trait is revealed

D20:
- compact route/environment investigation
- no new Final Family/Hazard fact

D25:
- exact persisted Final Family Pair + Hazard state is revealed before same-Day decisions

D30:
- adds no new Boss information

Presentation work must not move, duplicate, pre-reveal or hide any of these truths.

## FINAL-ONLY DOMAIN BACKDROP REFERENCE

Exact asset-role Canonical:
PRESENTATION_POLISH_v2.8.0.md
§ BOSS / FINAL PRESENTATION PAYOFF
§ BOSS DOMAIN BACKDROP ASSET ROLE

Batch 4 does not ingest or display the user's per-Boss throne-room / wall / domain backdrop assets.

Do not use those full backdrop images in:
- D5 / D10 / D15 / D20 / D25 reports
- Codex
- Boss cards / reference panels

Do not crop pieces from those backdrop images as report decoration.

The Boss Report may use only already-owned Boss art, Boss palette and restrained report-appropriate
motif language.

The full authored environment payoff is reserved for D30 FINAL entry.

## CORE PRESENTATION LANGUAGE

The Boss Report is a GUILD INVESTIGATION RECORD.

It is not:
- a utility modal
- a fantasy card
- a Final throne-room preview
- a generic boss splash screen
- a stack of bordered web cards

The report itself is the authored object.

Preferred language:
- paper / dossier / filing record
- ink / restrained stamped-file detail
- one coherent paper hierarchy
- Boss art as the visual subject where the beat owns major presence
- information directly attached to that subject

Do not add:
- decorative seals with no information role
- bolts / rivets merely for game feel
- frame-inside-frame
- glossy fantasy ornament
- repeated cards around every fact

## SOURCE HANDLES

Primary current Source:
- `bossRevealStage()`
- `bossReveal()`
- `bossFiled()`
- `renderModal()` when `modal==='boss'`
- `BOSS_BEATS`
- `BOSS_MAJOR`

Primary presentation handles:
- `.doc-dossier`
- `.boss-reveal`
- `.filed`
- `.lede`
- `.boss-name`
- `.boss-art`
- `.boss-id`
- `.trait-name`
- `.trait-body`
- `.next-report`
- `.fams`
- `.fam-card`
- `.approve`

These are implementation handles, not new semantics.

## EXECUTION ORDER

Work in two review cycles.

### BATCH 4A — D0 + MAJOR-BEAT CLOSEOUT
- implement / verify the D0 first-Morning system and presentation
- apply the approved narrow fixes to D5 / D15 / D25
- verify the approved GLUTTONY D5 copy

Stop for DIRECTOR / User screenshot review.

### BATCH 4B — CONCISE INVESTIGATION BEATS
- D10
- D20

Only start after 4A review.

D10/D20 use the established full Boss-art family. Their lower importance comes from shorter content
and quieter information hierarchy, not a smaller Boss portrait.

## BATCH 4A — D0 FIRST-MORNING BRIEFING

System owner:
CORE_RUN_v2.8.0.md §D0 FIRST-MORNING BOSS BRIEFING — EXACT.

Required runtime order:

    first DAY 0 Store Support resolves
    -> enter DAY 1 MORNING
    -> D0 briefing opens first
    -> 확인 persists consumed/seen state
    -> ordinary DAY 1 MORNING resumes

D0 is not a permanent Phase and does not advance time / RNG / economy.

Presentation:
- basic dossier information only;
- no Boss art / silhouette / unknown portrait / domain backdrop;
- no decorative timeline-card system;
- DAY 5 and DAY 30 may be simple typographic anchors;
- exact copy is owned by COPY_AUDIT_APPROVED_v2.8.0.md §14-1;
- one `확인` acknowledgement.

Required Save/Load evidence:
- unresolved D0 reloads as still due;
- acknowledged D0 does not replay;
- a save beyond DAY 1 does not receive a retroactive D0.

## BATCH 4A — D5 IDENTITY

Purpose:
the first real Boss reveal.

The Player should read:
    BOSS IDENTITY
    -> Boss presence / art
    -> one owned flavor/report line
    -> acknowledge

Requirements:
- Boss name registers immediately;
- centered Boss art is a clear visual anchor;
- the report still reads as one dossier, not a portrait card inside a modal;
- no artificial grey / ink floor line remains under Boss art;
- Flavor is plain report text with no non-semantic left accent bar or tinted box;
- GLUTTONY uses the exact D5 Flavor owned by COPY_AUDIT_APPROVED_v2.8.0.md;
- the art and name must not push acknowledgement out of the usable phone viewport;
- do not add the Boss's FINAL domain backdrop.

Exact current art limits remain Canonical:
- phone max-height 240px
- desktop max-height 300px

Do not silently exceed these.
If the exact limit itself makes the beat functionally weak, report the screenshot evidence and stop
for a Canonical amendment.

## BATCH 4A — D15 TRAIT

Purpose:
the strongest mid-Run information reveal.

The Player should read:
    BOSS IDENTITY
    -> Boss art
    -> EXACT TRAIT
    -> exact Trait explanation
    -> acknowledge

Requirements:
- Trait is the payload, not decorative flavor;
- Trait name must be unmistakably stronger than ordinary body copy;
- explanatory lines remain attached to the Trait rather than becoming separate cards;
- no coloured side accent bar;
- no replacement text box / tinted panel / bordered card;
- hierarchy is carried by the small `특성` label -> Trait name -> explanation;
- no artificial floor/divider line remains under Boss art;
- Boss art remains co-equal presence, but cannot bury the Trait below unnecessary scroll;
- D15 should feel stronger than D10/D20 without inventing a new screen architecture;
- do not add the Boss's FINAL domain backdrop.

Exact art limits:
- phone max-height 240px
- desktop max-height 300px

## BATCH 4A — D25 FINAL STATE

Purpose:
the major preparation disclosure before the Player's same-Day decisions.

The Player should read:
    FINAL STATE DISCLOSURE
    -> Boss presence
    -> exact Family 1 + Hazards
    -> exact Family 2 + Hazards
    -> acknowledge
    -> return to the decisions this information informs

Requirements:
- D25 is information-first preparation, not a Final-room preview;
- exact persisted Family/Hazard state must be the main payload;
- Boss art may be strong but must not dominate the Family/Hazard disclosure;
- no artificial floor/divider line remains under Boss art;
- the two Families are peers;
- each Family's semantic left colour rule is retained;
- the extra black horizontal rule above the Family section is removed;
- Hazard pressure remains readable;
- do not turn each Hazard into a decorative card;
- if current `.fam-card` presentation reads as web cards, MERGE / flatten within the same dossier
  before adding decoration;
- acknowledgement remains visible/reachable;
- do not add the Boss's FINAL domain backdrop.

Exact art limits:
- phone max-height 200px
- desktop max-height 260px

## BATCH 4B — D10 / D20 CONCISE REPORTS

D10 and D20 are intentionally lower-information beats.

They must feel like meaningful new investigation steps without pretending to reveal a major new
Boss fact.

Keep:
- Boss name / identity context
- the same full Boss-art family established by D5/D15
- one short owned investigation line
- next-report line
- one acknowledgement

Exact art limits:
- phone max-height 240px
- desktop max-height 300px

Do not:
- reduce the Boss to an icon / 64px thumbnail to signal lower importance;
- use large empty dossier shells;
- create a new decision panel;
- add a Final backdrop;
- add ornamental filler merely because the content is short.

The beat stays concise through fewer lines, quieter type hierarchy and naturally shorter report
height. Boss presence remains continuous across the investigation cadence.

## DOCUMENT OBJECT / ACKNOWLEDGEMENT

Boss reports use the dossier document variant.

The acknowledgement control `.approve` is a filing/acknowledgement action, not a BRICK CTA and
not a ceremonial seal.

Requirements:
- clearly actionable;
- subordinate to the report payload;
- no full-width generic SaaS submit bar;
- no wax-seal / guild-seal ornament unless another Canonical owner explicitly requires it;
- press / focus state remains clear;
- D5/D15/D25 may carry the stronger existing Boss acknowledgement cue;
- D10/D20 stay compact.

## RESPONSIVE

PHONE:
- report claims enough of the viewport to feel like a takeover;
- no tiny Boss floating in empty paper;
- no required information pushed below the first viewport solely by art;
- acknowledgement remains reachable.

DESKTOP:
- do not leave a phone-sized dossier stranded in a large viewport;
- major beats may use the current desktop Boss-art limits and a broader document measure;
- do not create a new two-column information architecture merely to fill space;
- compact beats stay compact and should not inflate into empty desktop posters.

## REMOVE / REUSE / MERGE / ADD

Before adding anything:
1. REMOVE unnecessary frame/card chrome.
2. REUSE the existing dossier, Boss art and report hierarchy.
3. MERGE isolated web-card blocks into the report where needed.
4. ADD only if the screenshot still lacks a clear physical/report construction.

CSS-FIRST does not mean CSS-only.
If a report-specific object detail materially improves the authored dossier, a small bespoke SVG
or local graphic is allowed.

Do not use the FINAL domain backdrop asset as that graphic.

## BEFORE / AFTER EVIDENCE

Harness:
- npm run qa:presentation:batch4:fast
- npm run qa:presentation:batch4:before
- npm run qa:presentation:batch4:after

BEFORE and AFTER must include:

PHONE 390:
- D0
- D5
- D10
- D15
- D20
- D25

DESKTOP 1280:
- D0
- D5
- D10
- D15
- D20
- D25

Regression:
- 360
- 412
- 1024

Also verify:
- D0 still reveals no Boss identity/art early;
- D25 appears before the same-Day decision it is meant to inform;
- D30 has no new Boss-information beat;
- seen-state / Save-Load behavior is unchanged.

## REVIEW QUESTIONS

D0:
- Does the first Morning briefing appear before ordinary DAY 1 information / decisions?
- Is the 30-Day objective clear without Boss art or premature information?

D5:
- Does the Boss reveal actually register as a reveal?
- Is the Boss the visual anchor without becoming a splash screen?

D10:
- Does it read as a deliberate compact investigation beat rather than an empty modal?

D15:
- Is the exact Trait the strongest informational payload after identity/art?

D20:
- Is it clearly a new investigation question while remaining compact?

D25:
- Are both Families and Hazards immediately readable before the Player returns to decisions?
- Does the screen avoid previewing the FINAL throne-room backdrop?

GLOBAL:
- Does the whole cadence feel like one investigation dossier evolving over time?
- Are major and compact beats meaningfully differentiated?
- Is information truth stronger than ornament?
- Is there no early leakage from FINAL-only domain art?

## STOP CONDITIONS

Batch 4A:
Implement / verify D0 and apply the approved D5 / D15 / D25 closeout fixes.
Deliver screenshots.
STOP for review.

Do not proceed to D10/D20 until review.

Batch 4B:
Implement D10 / D20 only after approval.
Deliver screenshots.
STOP.

Do not proceed to FINAL / D30.
Do not ingest the Boss domain backdrop assets in Batch 4.
Do not self-declare Batch 4 PASS.
