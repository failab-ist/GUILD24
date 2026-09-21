# GUILD24 v2.8 — Release Vision

> Project: 《던전 앞 편의점 / GUILD24》
>
> Document role: **v2.8 RELEASE VISION / ORIENTATION**
>
> Status: **NON-CANONICAL**
>
> Detailed Design Truth, numeric baselines, exact copy, UX contracts and QA are owned only by
> \`design_ssot/SPEC_INDEX_v2.8.0.md\` and the owner Specs it routes.

---

## WHY v2.8 EXISTS

GUILD24 already has the core game it needs to be judged.

The main problem exposed by play is not a lack of systems.
It is that the Player can still lose the connection between:

> what they noticed  
> what they decided  
> what actually changed  
> what happened because of it

When that connection is weak, meaningful systems can feel weak.
When old or unclear information remains on screen, the Player cannot trust the decision surface.

v2.8 exists to make the current game read as clearly as it plays.

---

## CORE GOAL

v2.8 should make the existing loop feel like one continuous chain:

> **observe → infer → choose → see the change → see the result → remember**

The Player should not need to understand internal formulas to make a meaningful decision.

The game should reveal the information needed to think,
while still leaving the decision itself to the Player.

---

## WHAT v2.8 MUST IMPROVE

### 1. TRUST

Everything shown to the Player must describe the current game truth.

Old terminology, stale explanations, misleading cause-and-effect, duplicated information and
developer-facing language weaken trust even when the underlying system is correct.

v2.8 removes that friction.

### 2. DECISION READABILITY

Important choices must be easy to compare without turning the UI into an answer sheet.

The Player should understand:
- what state matters now
- what their choice changed
- what information is still uncertain

The game should clarify the decision, not solve it for them.

### 3. CONSEQUENCE

A good choice matters more when the Player can recognize its consequence.

SALE and NIGHT should feel connected.
Store choices should feel connected to daily operation.
NPC state should carry meaning from one visit to the next.

v2.8 strengthens those connections without inventing false causality.

### 4. RUN FOCUS

A Run should keep a clear sense of direction.

Daily store management, NPC decisions and build choices must not bury the larger expedition goal.
The approaching Boss should remain part of the Run's mental context rather than returning only at
the end.

### 5. MOBILE FLOW

The core game must remain readable on the smallest primary play surface.

v2.8 prefers removing duplicate presentation and reusing compact interaction patterns before
adding new panels.

The mobile screen should spend space on the current decision.

### 6. BUILD IDENTITY

Items, Store Supports and persistent Store Growth should have distinct roles the Player can
recognize.

The goal is not to create more systems.
It is to make the systems already present produce clearer choices and a stronger sense that:

> this Run became this kind of store because of what I chose.

### 7. FUNCTIONAL + PRESENTATION PAYOFF

v2.8 also carries a focused functional-design and audiovisual polish pass.

The current interface should first make the right information and action obvious, then make the
existing state produce stronger visible/audible consequence.

Functional polish includes:
- tutorial emphasis that matches the exact fact/action being taught
- decision information and the action that uses it staying spatially coherent
- removing duplicated UI, dead space and avoidable overflow before compressing required information
- responsive layouts that preserve the intended reading/action order
- Boss/milestone notices that are strong enough to register without oversized empty presentation

Presentation polish includes:
- NIGHT outcomes should not all feel equally weighted
- Boss information and Final preparation should gain presence as the Run approaches DAY 30
- Store choices should leave small truthful traces in the shop
- ORDER / SALE / Store-Support decisions should sound materially different from generic UI taps
- phase identity may be strengthened through the current audio/BGM system

This remains refinement, not structural expansion.

Presentation must not invent state, expose hidden information, add a new decision, or require a new
progression system merely to justify an effect.

---

## HOW v2.8 APPROACHES CHANGE

v2.8 is a refinement release.

Default direction:

> **remove before adding  
> reuse before inventing  
> clarify before expanding**

A feature is not progress merely because it adds more content or UI.

Changes should strengthen:
- meaningful Player decisions
- confidence in the information surface
- visible consequence
- the identity of the current Run

Anything that primarily expands structure, content volume or presentation breadth belongs after
this pass unless the current game cannot function correctly without it.

---

## WHAT SUCCESS SHOULD FEEL LIKE

After v2.8, a Player should more often be able to answer:

> Why did I choose this?  
> What changed after I chose it?  
> What happened to this adventurer or store?  
> What should I remember for the next decision?

without the game explicitly telling them which choice is best.

The Player should spend less effort decoding the interface
and more effort deciding how to run the store.

---

## WHAT THIS FILE DOES NOT OWN

This file does not define:
- mechanics
- formulas
- balance numbers
- exact Item or Store Support values
- exact copy
- layout measurements
- Source locations
- implementation steps
- QA pass/fail conditions

For any of those, start from:

> \`design_ssot/SPEC_INDEX_v2.8.0.md\`

If this Vision and the current SSOT ever appear to differ, the SSOT is authoritative.

---

## v2.8 END STATE

v2.8 is complete when the current game is more trustworthy, more readable and more causally legible
without becoming broader for breadth's sake.

At that point, further structural or content expansion can be evaluated as the next version's work
rather than being mixed into the cleanup of the current core.
